import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguageStore } from "@/store/use-language";
import { Compass, Volume2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, X } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
 * Map Definitions
 * ════════════════════════════════════════════════════════════════════════ */

const TILE_GRASS = 0;
const TILE_TREE = 1;
const TILE_PATH = 2;
const TILE_SHRINE = 3;

// 15x10 Grid
const MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 3, 2, 2, 2, 0, 0, 0, 3, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 1, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 2, 2, 2, 3, 0, 1, 0, 1, 1],
  [1, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const COLUMNS = MAP[0].length;
const ROWS = MAP.length;

/* ════════════════════════════════════════════════════════════════════════
 * Puzzles Data
 * ════════════════════════════════════════════════════════════════════════ */

type Puzzle = {
  id: string;
  type: "math" | "chemistry";
  questionEn: string;
  questionKh: string;
  mathAnswer?: string; // For math
  chemEquation?: {
    reactants: string[];
    products: string[];
    correctCoefficients: number[];
  };
};

const PUZZLES: Record<string, Puzzle> = {
  "1,7": {
    id: "1,7", // x=1, y=7
    type: "math",
    questionEn: "Solve for x: 3x - 4 = 11",
    questionKh: "រកតម្លៃ x ៖ 3x - 4 = 11",
    mathAnswer: "5",
  },
  "5,1": {
    id: "5,1",
    type: "chemistry",
    questionEn: "Balance the combustion of Hydrogen to form Water:",
    questionKh: "ថ្លឹងសមីការចំហេះអ៊ីដ្រូសែនដើម្បីបង្កើតទឹក៖",
    chemEquation: {
      reactants: ["H₂", "O₂"],
      products: ["H₂O"],
      correctCoefficients: [2, 1, 2],
    },
  },
  "9,6": {
    id: "9,6",
    type: "math",
    questionEn: "What is 7 × 8?",
    questionKh: "តើ 7 × 8 ស្មើនឹងប៉ុន្មាន?",
    mathAnswer: "56",
  },
  "12,1": {
    id: "12,1",
    type: "chemistry",
    questionEn: "Balance the synthesis of Ammonia (Haber Process):",
    questionKh: "ថ្លឹងសមីការសំយោគអាម៉ូញាក់ (ដំណើរការ Haber)៖",
    chemEquation: {
      reactants: ["N₂", "H₂"],
      products: ["NH₃"],
      correctCoefficients: [1, 3, 2],
    },
  },
};

/* ════════════════════════════════════════════════════════════════════════
 * Audio Fanfare System
 * ════════════════════════════════════════════════════════════════════════ */

function playVictoryFanfare() {
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const notes = [
    { freq: 440.0, duration: 0.12 }, // A4
    { freq: 554.37, duration: 0.12 }, // C#5
    { freq: 659.25, duration: 0.12 }, // E5
    { freq: 880.0, duration: 0.4 }, // A5
  ];

  let startTime = ctx.currentTime;
  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    osc.frequency.value = note.freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.05, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);

    osc.start(startTime);
    osc.stop(startTime + note.duration);

    startTime += note.duration;
  });
}

function playErrorBuzzer() {
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

/* ════════════════════════════════════════════════════════════════════════
 * Main Component
 * ════════════════════════════════════════════════════════════════════════ */

export default function AdventureMapPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [playerPos, setPlayerPos] = useState({ x: 1, y: 8 });
  const [facing, setFacing] = useState<"up" | "down" | "left" | "right">("right");
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);
  const [clearedShrines, setClearedShrines] = useState<Set<string>>(new Set());

  // Move handler
  const move = useCallback(
    (dx: number, dy: number) => {
      if (activePuzzle) return; // Block movement if modal is open

      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      // Update facing direction
      if (dx > 0) setFacing("right");
      if (dx < 0) setFacing("left");
      if (dy > 0) setFacing("down");
      if (dy < 0) setFacing("up");

      // Bounds check
      if (newX < 0 || newX >= COLUMNS || newY < 0 || newY >= ROWS) return;

      // Collision check
      const targetTile = MAP[newY][newX];
      if (targetTile === TILE_TREE) return;

      // Check if Shrine
      if (targetTile === TILE_SHRINE) {
        const shrineId = `${newX},${newY}`;
        if (!clearedShrines.has(shrineId) && PUZZLES[shrineId]) {
          setActivePuzzle(PUZZLES[shrineId]);
        }
      }

      setPlayerPos({ x: newX, y: newY });
    },
    [playerPos, activePuzzle, clearedShrines]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          move(0, -1);
          break;
        case "ArrowDown":
          move(0, 1);
          break;
        case "ArrowLeft":
          move(-1, 0);
          break;
        case "ArrowRight":
          move(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const handlePuzzleComplete = () => {
    if (activePuzzle) {
      setClearedShrines((prev) => new Set(prev).add(activePuzzle.id));
      setActivePuzzle(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Compass className="w-4 h-4" />
          {isKh ? "ដំណើរផ្សងព្រេង 🗺️" : "Adventure Quest 🗺️"}
        </div>
        <h1 className={`font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ស្វែងរកទីសក្ការៈលាក់កំបាំង" : "Find the Hidden Shrines"}
        </h1>
        <p className={`text-slate-600 max-w-lg mx-auto ${isKh ? "font-khmer" : ""}`}>
          {isKh
            ? "ប្រើគ្រាប់ចុចព្រួញ (ឬប៊ូតុងខាងក្រោម) ដើម្បីរុករកផែនទី។ ចូលទៅកាន់ទីសក្ការៈនីមួយៗ ហើយដោះស្រាយល្បែងប្រាជ្ញាគណិតវិទ្យា និងគីមីវិទ្យា ដើម្បីទទួលបានជ័យជម្នះ!"
            : "Use your arrow keys (or the D-Pad below) to explore the map. Walk onto the shrines and solve math and chemistry puzzles to win!"}
        </p>
      </header>

      {/* Game Board */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-slate-200 inline-block">
          <div
            className="grid bg-emerald-100 rounded-lg overflow-hidden border border-emerald-300"
            style={{
              gridTemplateColumns: `repeat(${COLUMNS}, 32px)`,
              gridTemplateRows: `repeat(${ROWS}, 32px)`,
            }}
          >
            {/* Render Map Tiles */}
            {MAP.map((row, y) =>
              row.map((tile, x) => {
                const isClearedShrine = tile === TILE_SHRINE && clearedShrines.has(`${x},${y}`);
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`w-[32px] h-[32px] flex items-center justify-center text-sm
                      ${tile === TILE_GRASS ? "bg-emerald-400" : ""}
                      ${tile === TILE_TREE ? "bg-emerald-800 text-emerald-900" : ""}
                      ${tile === TILE_PATH ? "bg-amber-200" : ""}
                      ${tile === TILE_SHRINE && !isClearedShrine ? "bg-purple-500 animate-pulse" : ""}
                      ${isClearedShrine ? "bg-amber-200" : ""} 
                    `}
                  >
                    {tile === TILE_TREE && "🌲"}
                    {tile === TILE_SHRINE && !isClearedShrine && "⛩️"}
                    {isClearedShrine && "✨"}
                  </div>
                );
              })
            )}

            {/* Render Player */}
            <div
              className="absolute w-[32px] h-[32px] flex items-center justify-center transition-all duration-200 ease-out z-10"
              style={{
                top: `calc(0.75rem + ${playerPos.y * 32}px)`, // 0.75rem is the padding of the parent
                left: `calc(0.75rem + ${playerPos.x * 32}px)`,
              }}
            >
              <div className="bg-blue-500 w-6 h-6 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                {/* Simple directional indicator */}
                <div
                  className="bg-white rounded-full w-1.5 h-1.5"
                  style={{
                    transform:
                      facing === "up"
                        ? "translateY(-3px)"
                        : facing === "down"
                        ? "translateY(3px)"
                        : facing === "left"
                        ? "translateX(-3px)"
                        : "translateX(3px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile D-Pad Controls */}
        <div className="mt-8 grid grid-cols-3 grid-rows-3 gap-2 sm:hidden">
          <div />
          <button
            onClick={() => move(0, -1)}
            className="w-14 h-14 bg-white border border-slate-300 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-100"
          >
            <ArrowUp className="w-6 h-6 text-slate-600" />
          </button>
          <div />
          <button
            onClick={() => move(-1, 0)}
            className="w-14 h-14 bg-white border border-slate-300 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-100"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <button
            onClick={() => move(0, 1)}
            className="w-14 h-14 bg-white border border-slate-300 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-100"
          >
            <ArrowDown className="w-6 h-6 text-slate-600" />
          </button>
          <button
            onClick={() => move(1, 0)}
            className="w-14 h-14 bg-white border border-slate-300 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-100"
          >
            <ArrowRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-sm font-bold text-slate-500">
            {isKh ? "ទីសក្ការៈដែលបានរកឃើញ៖" : "SHRINES CLEARED:"}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  clearedShrines.size >= i ? "bg-purple-500" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Puzzle Modal Overlay */}
      {activePuzzle && (
        <PuzzleModal
          puzzle={activePuzzle}
          isKh={isKh}
          onClose={() => {
            // Push player back slightly if they cancel
            setPlayerPos((prev) => ({
              x: prev.x + (facing === "left" ? 1 : facing === "right" ? -1 : 0),
              y: prev.y + (facing === "up" ? 1 : facing === "down" ? -1 : 0),
            }));
            setActivePuzzle(null);
          }}
          onSuccess={handlePuzzleComplete}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Puzzle Modal Component
 * ════════════════════════════════════════════════════════════════════════ */

function PuzzleModal({
  puzzle,
  isKh,
  onClose,
  onSuccess,
}: {
  puzzle: Puzzle;
  isKh: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mathInput, setMathInput] = useState("");
  const [chemInputs, setChemInputs] = useState<string[]>(
    Array(
      (puzzle.chemEquation?.reactants.length || 0) +
        (puzzle.chemEquation?.products.length || 0)
    ).fill("")
  );
  const [error, setError] = useState(false);

  const checkMath = () => {
    if (mathInput.trim() === puzzle.mathAnswer) {
      playVictoryFanfare();
      onSuccess();
    } else {
      setError(true);
      playErrorBuzzer();
      setTimeout(() => setError(false), 500);
    }
  };

  const checkChem = () => {
    const correct = puzzle.chemEquation?.correctCoefficients;
    if (!correct) return;
    
    // Parse inputs to numbers, empty string implies 1 in chemistry conventionally, 
    // but let's require explicit input or treat "" as wrong for educational strictness.
    const isCorrect = chemInputs.every(
      (val, idx) => parseInt(val, 10) === correct[idx]
    );

    if (isCorrect) {
      playVictoryFanfare();
      onSuccess();
    } else {
      setError(true);
      playErrorBuzzer();
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex justify-between items-center">
          <h3 className={`font-bold text-slate-800 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <Volume2 className="w-4 h-4 text-purple-600" />
            {puzzle.type === "chemistry"
              ? isKh
                ? "បញ្ហាគីមីវិទ្យា"
                : "Chemistry Challenge"
              : isKh
              ? "បញ្ហាគណិតវិទ្យា"
              : "Math Challenge"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-md text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`p-6 ${error ? "animate-[shake_0.2s_ease-in-out_2]" : ""}`}>
          <p className={`text-lg text-slate-700 mb-6 font-medium ${isKh ? "font-khmer" : ""}`}>
            {isKh ? puzzle.questionKh : puzzle.questionEn}
          </p>

          {puzzle.type === "math" && (
            <div className="flex gap-2">
              <input
                type="text"
                value={mathInput}
                onChange={(e) => setMathInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkMath()}
                autoFocus
                className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg px-4 py-2 text-xl focus:outline-none focus:border-purple-500 font-mono"
                placeholder="?"
              />
              <button
                onClick={checkMath}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition"
              >
                {isKh ? "ឆ្លើយ" : "Solve"}
              </button>
            </div>
          )}

          {puzzle.type === "chemistry" && puzzle.chemEquation && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-mono font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {puzzle.chemEquation.reactants.map((reactant, i) => (
                  <div key={`r-${i}`} className="flex items-center gap-1">
                    {i > 0 && <span className="mx-1">+</span>}
                    <input
                      type="number"
                      min="1"
                      className="w-12 h-10 text-center border-2 border-slate-300 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                      value={chemInputs[i]}
                      onChange={(e) => {
                        const newInputs = [...chemInputs];
                        newInputs[i] = e.target.value;
                        setChemInputs(newInputs);
                      }}
                    />
                    <span>{reactant}</span>
                  </div>
                ))}
                <span className="mx-2 text-slate-400">➔</span>
                {puzzle.chemEquation.products.map((product, i) => {
                  const idx = puzzle.chemEquation!.reactants.length + i;
                  return (
                    <div key={`p-${i}`} className="flex items-center gap-1">
                      {i > 0 && <span className="mx-1">+</span>}
                      <input
                        type="number"
                        min="1"
                        className="w-12 h-10 text-center border-2 border-slate-300 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                        value={chemInputs[idx]}
                        onChange={(e) => {
                          const newInputs = [...chemInputs];
                          newInputs[idx] = e.target.value;
                          setChemInputs(newInputs);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && checkChem()}
                      />
                      <span>{product}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={checkChem}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition w-full"
              >
                {isKh ? "ថ្លឹងសមីការ" : "Balance Equation"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
