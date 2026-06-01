import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Ship,
  Waves,
  X,
  Check,
  AlertCircle,
  HelpCircle,
  Trophy
} from "lucide-react";
import confetti from "canvas-confetti";
import equationsBank from "@/data/grid-battleship-bank.json";

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playSound(type: "click" | "hit" | "miss" | "fail" | "victory") {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;

    if (type === "click") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, t);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === "hit") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(520, t);
      osc1.frequency.exponentialRampToValueAtTime(1040, t + 0.3);
      osc2.frequency.setValueAtTime(780, t);
      osc2.frequency.exponentialRampToValueAtTime(1560, t + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.45);
      osc2.stop(t + 0.45);
    } else if (type === "miss") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === "fail") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.5);
    } else if (type === "victory") {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.08, t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.4);
        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.4);
      });
    }
  } catch (e) {}
}

// ── Normalize and verify mathematical answers ──────────────────────────────
function checkAnswer(entered: string, correct: string): boolean {
  const normEntered = entered.toLowerCase().replace(/\s+/g, "").replace(/^x=/, "").trim();
  const normCorrect = correct.toLowerCase().replace(/\s+/g, "").replace(/^x=/, "").trim();

  if (normEntered === normCorrect) return true;

  // Try parsing as float for numeric evaluation (e.g. 0.5 vs .5)
  const parsedEntered = parseFloat(normEntered);
  const parsedCorrect = parseFloat(normCorrect);
  if (!isNaN(parsedEntered) && !isNaN(parsedCorrect)) {
    return parsedEntered === parsedCorrect;
  }
  return false;
}

type CellStatus = "hidden" | "hit" | "empty" | "failed";

export default function GridBattleshipPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Settings & Toggles
  const [selectedGrade, setSelectedGrade] = useState<string>("5th");
  const [boardState, setBoardState] = useState<Record<string, CellStatus>>({});
  const [shipLocations, setShipLocations] = useState<Set<string>>(new Set());

  // Scoreboard
  const [totalHits, setTotalHits] = useState<number>(0);
  const [totalGuesses, setTotalGuesses] = useState<number>(0);

  // Modal control
  const [activeCoordinate, setActiveCoordinate] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState<string>("");
  const [lastFeedback, setLastFeedback] = useState<{
    correct: boolean;
    isShip: boolean;
    correctAnswer: string;
  } | null>(null);

  // Rows and Columns definitions
  const rows = ["A", "B", "C", "D", "E"];
  const cols = ["1", "2", "3", "4", "5"];

  // Initialize and Reset Game Board
  const resetGame = useCallback(() => {
    playSound("click");
    
    // Scramble 5 ship locations on the 5x5 grid
    const allCoords: string[] = [];
    rows.forEach((r) => {
      cols.forEach((c) => {
        allCoords.push(`${r}${c}`);
      });
    });

    const shuffled = [...allCoords].sort(() => Math.random() - 0.5);
    const chosenShips = new Set(shuffled.slice(0, 5));
    
    setShipLocations(chosenShips);
    
    // Clear board states
    const initialBoard: Record<string, CellStatus> = {};
    allCoords.forEach((coord) => {
      initialBoard[coord] = "hidden";
    });
    
    setBoardState(initialBoard);
    setTotalHits(0);
    setTotalGuesses(0);
    setActiveCoordinate(null);
    setAnswerInput("");
    setLastFeedback(null);
  }, []);

  // Initialize game on load and when grade level changes
  useEffect(() => {
    resetGame();
  }, [selectedGrade, resetGame]);

  // Handle cell selection
  const handleCellClick = (coord: string) => {
    const currentStatus = boardState[coord];
    if (currentStatus !== "hidden") return; // Allow clicking only hidden cells
    
    playSound("click");
    setActiveCoordinate(coord);
    setAnswerInput("");
    setLastFeedback(null);
  };

  // Handle verify submission
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCoordinate) return;

    // Find the equation details from the JSON bank
    const entry = equationsBank.find((item) => item.coordinate === activeCoordinate);
    if (!entry) return;

    const eqDetails = entry.equations[selectedGrade as "5th" | "8th" | "12th"];
    const isCorrect = checkAnswer(answerInput, eqDetails.answer);
    const hasShip = shipLocations.has(activeCoordinate);

    let nextStatus: CellStatus = "hidden";
    if (isCorrect) {
      if (hasShip) {
        nextStatus = "hit";
        setTotalHits((prev) => {
          const nextHits = prev + 1;
          if (nextHits === 5) {
            playSound("victory");
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.55 },
            });
          } else {
            playSound("hit");
          }
          return nextHits;
        });
      } else {
        nextStatus = "empty";
        playSound("miss");
      }
    } else {
      nextStatus = "failed";
      playSound("fail");
    }

    setBoardState((prev) => ({
      ...prev,
      [activeCoordinate]: nextStatus,
    }));
    
    setTotalGuesses((prev) => prev + 1);

    // Save feedback before closing modal or showing feedback
    setLastFeedback({
      correct: isCorrect,
      isShip: hasShip,
      correctAnswer: eqDetails.answer,
    });

    // Close the modal after a short display delay
    setTimeout(() => {
      setActiveCoordinate(null);
      setAnswerInput("");
      setLastFeedback(null);
    }, 1800);
  };

  // Find equation corresponding to active cell
  const activeEquation = activeCoordinate
    ? equationsBank.find((item) => item.coordinate === activeCoordinate)?.equations[
        selectedGrade as "5th" | "8th" | "12th"
      ]
    : null;

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Starry deep universe grid bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {styleInjection()}

      {/* Header Navigation Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/science"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold"}>
              {t("Back to Mathematics", "ត្រឡប់ទៅគណិតវិទ្យា")}
            </span>
          </Link>

          <div>
            <span
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 uppercase text-glow block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("Grid Battleship: Math Edition", "ល្បែងចម្បាំងលើក្រឡា៖ វគ្គគណិតវិទ្យា")}
            </span>
          </div>

          {/* Grade Toggle Selector */}
          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl">
            <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block ${isKh ? "font-khmer" : ""}`}>
              {t("Grade Level", "កម្រិតថ្នាក់")}
            </span>
            <div className="flex gap-1.5">
              {["5th", "8th", "12th"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    playSound("click");
                    setSelectedGrade(lvl);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-black rounded-lg transition-all ${
                    selectedGrade === lvl
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40 scale-105"
                      : "bg-slate-950 text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col items-center justify-center gap-8">
        
        {/* Top: Scoreboard Stats */}
        <section className="w-full max-w-2xl flex items-center justify-between bg-slate-950/80 border border-slate-900 p-6 rounded-[2rem] shadow-2xl relative">
          <div className="flex flex-col">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">
              {t("Ships Found", "រកឃើញនាវាសត្រូវ")}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-mono text-3xl font-black text-emerald-400">{totalHits}</span>
              <span className="text-slate-500 font-mono">/</span>
              <span className="font-mono text-xl font-bold text-slate-400">5</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
              {t("Remaining", "នៅសល់")}
            </span>
            <span className="font-mono text-xl font-black text-amber-500 mt-1">
              {5 - totalHits}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">
              {t("Guesses", "ការសាកល្បង")}
            </span>
            <span className="font-mono text-3xl font-black text-white mt-1">
              {totalGuesses}
            </span>
          </div>

          <div className="h-full w-px bg-slate-900 mx-4 hidden sm:block" />

          <button
            onClick={resetGame}
            className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">{t("Reset", "កំណត់ឡើងវិញ")}</span>
          </button>
        </section>

        {/* Middle: 5x5 Interactive Board Grid */}
        <section className="flex flex-col items-center justify-center p-6 bg-slate-950/20 border border-slate-900/60 rounded-[3rem] shadow-3xl max-w-4xl w-full">
          <div className="flex flex-col gap-2.5">
            {/* Top X-Axis Headers: 1-5 */}
            <div className="flex gap-2.5 items-center justify-center">
              {/* Corner spacer for row labels alignment */}
              <div className="w-[max(2.5rem,5.5vw)] text-center text-slate-600 font-mono font-bold text-xs uppercase" />
              {cols.map((col) => (
                <div
                  key={`col-header-${col}`}
                  className="flex items-center justify-center text-slate-500 font-mono font-black select-none"
                  style={{
                    width: "max(3.8rem, 8.5vw)",
                    fontSize: "max(1rem, 1.8vw)",
                  }}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Grid Rows */}
            {rows.map((row) => (
              <div key={`row-${row}`} className="flex gap-2.5 items-center justify-center">
                {/* Left Y-Axis Label: A-E */}
                <div
                  className="flex items-center justify-end pr-3 text-slate-500 font-mono font-black select-none"
                  style={{
                    width: "max(2.5rem, 5.5vw)",
                    fontSize: "max(1rem, 1.8vw)",
                  }}
                >
                  {row}
                </div>

                {/* Grid Cells */}
                {cols.map((col) => {
                  const coord = `${row}${col}`;
                  const status = boardState[coord] || "hidden";

                  let cellBg = "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:bg-slate-900 hover:scale-105 cursor-pointer";
                  let cellContent = <span className="font-mono font-bold" style={{ fontSize: "max(1.1rem, 2vw)" }}>{coord}</span>;

                  if (status === "hit") {
                    cellBg = "bg-emerald-600/90 border-emerald-400 text-white animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.4)]";
                    cellContent = <Ship className="w-8 h-8 text-white scale-125 transition-transform duration-300" />;
                  } else if (status === "empty") {
                    cellBg = "bg-blue-950/80 border-blue-800 text-blue-400 opacity-80";
                    cellContent = <Waves className="w-8 h-8 text-blue-500/80 animate-wave" />;
                  } else if (status === "failed") {
                    cellBg = "bg-rose-950/50 border-rose-900 text-rose-500/60";
                    cellContent = <X className="w-8 h-8 text-rose-500/50" />;
                  }

                  return (
                    <button
                      key={`cell-${coord}`}
                      onClick={() => handleCellClick(coord)}
                      disabled={status !== "hidden"}
                      className={`flex items-center justify-center border-4 rounded-3xl transition-all duration-200 select-none relative shadow-xl`}
                      style={{
                        width: "max(3.8rem, 8.5vw)",
                        height: "max(3.8rem, 8.5vw)",
                      }}
                    >
                      {cellContent}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Victory Celebration Overlay ──────────────────────────────────────── */}
      {totalHits === 5 && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in p-6 text-center">
          <div className="bg-slate-950 border-4 border-indigo-500/40 rounded-[3rem] p-12 max-w-xl w-full flex flex-col items-center gap-6 shadow-[0_0_80px_rgba(99,102,241,0.5)]">
            <div className="w-24 h-24 bg-yellow-400/10 border-4 border-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Trophy className="w-12 h-12 text-yellow-400" />
            </div>
            
            <h2
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-indigo-300 to-yellow-500 uppercase leading-tight"
              style={{ fontSize: "max(1.8rem, 3.5vw)" }}
            >
              {t("VICTORY!", "ជោគជ័យ!")}
            </h2>
            
            <p className={`text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
              {t("Outstanding! All 5 hidden battleship locations have been found and cleared by your class!", "អស្ចារ្យណាស់! នាវាចម្បាំងដែលលាក់ខ្លួនទាំង ៥ ត្រូវបានរកឃើញ និងកម្ទេចចោលដោយជោគជ័យ!")}
            </p>

            <div className="flex gap-4 mt-2 font-mono text-sm border-t border-b border-slate-900 py-3 w-full justify-around text-slate-400">
              <div>
                {t("Total Guesses:", "ការសាកល្បងសរុប:")} <span className="font-bold text-white">{totalGuesses}</span>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="mt-4 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer"
              style={{ fontSize: "max(1rem, 1.5vw)" }}
            >
              {t("Play Again", "លេងម្តងទៀត")}
            </button>
          </div>
        </div>
      )}

      {/* ── Math Equation / Verification Modal ───────────────────────────────── */}
      {activeCoordinate && activeEquation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-[#0b1324] border-4 border-indigo-500 rounded-[2.5rem] p-8 max-w-2xl w-full flex flex-col gap-6 relative shadow-[0_0_50px_rgba(99,102,241,0.5)] overflow-hidden animate-zoom-in">
            {/* Corner visual tech highlights */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-[2.5rem]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-indigo-500/30 rounded-br-[2.5rem]" />

            {/* Modal Title */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-indigo-400 animate-pulse" />
                <h3
                  className="font-black text-white"
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t(`Coordinate ${activeCoordinate} Equation`, `សមីការកូអរដោនេ ${activeCoordinate}`)}
                </h3>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveCoordinate(null);
                }}
                disabled={lastFeedback !== null}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large Projected LaTeX Math Block */}
            <div className="py-8 px-4 bg-slate-950/80 border border-slate-900 rounded-3xl flex items-center justify-center shadow-inner">
              <div
                className="font-black text-slate-100 flex items-center justify-center leading-normal"
                style={{ fontSize: "max(1.8rem, 4vw)" }}
              >
                <BlockMath math={activeEquation.latex} />
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block ${isKh ? "font-khmer" : ""}`}>
                  {t("Answer Key Verification", "ផ្ទៀងផ្ទាត់ចម្លើយសមីការ")}
                </label>
                <input
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  disabled={lastFeedback !== null}
                  placeholder={isKh ? "បញ្ចូលចម្លើយនៅទីនេះ..." : "Enter equation answer..."}
                  className="w-full bg-slate-950 border-4 border-slate-800 rounded-2xl text-center text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-700 font-black transition-all shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]"
                  style={{
                    height: "max(3.8rem, 8vh)",
                    fontSize: "max(1.4rem, 2.8vw)",
                    padding: "0 1rem",
                  }}
                  autoFocus
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!answerInput.trim() || lastFeedback !== null}
                  className="flex-grow py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed border border-indigo-500 text-white font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontSize: "max(1rem, 1.6vw)" }}
                >
                  <Check className="w-5 h-5" />
                  <span>{t("Verify", "ផ្ទៀងផ្ទាត់")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setActiveCoordinate(null);
                  }}
                  disabled={lastFeedback !== null}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-bold rounded-2xl transition-all flex items-center justify-center cursor-pointer"
                  style={{ fontSize: "max(0.9rem, 1.4vw)" }}
                >
                  <span>{t("Cancel", "បោះបង់")}</span>
                </button>
              </div>
            </form>

            {/* Instant Verification Feedback Overlay (Dim/Banner) */}
            {lastFeedback && (
              <div className="absolute inset-0 bg-[#0b1324]/90 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                {lastFeedback.correct ? (
                  <div className="flex flex-col items-center gap-4 animate-zoom-in">
                    <div className="w-16 h-16 bg-emerald-500/10 border-4 border-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                      <Check className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div>
                      <h4
                        className="font-black text-emerald-400 uppercase tracking-wider"
                        style={{ fontSize: "max(1.4rem, 2.8vw)" }}
                      >
                        {t("CORRECT ANSWER!", "ចម្លើយត្រឹមត្រូវ!")}
                      </h4>
                      <p
                        className="font-bold text-slate-300 mt-2 flex items-center justify-center gap-2"
                        style={{ fontSize: "max(1.1rem, 2.2vw)" }}
                      >
                        {lastFeedback.isShip ? (
                          <>
                            <Ship className="w-6 h-6 text-yellow-400 animate-pulse" />
                            <span className="text-yellow-400">{t("HIT! Battleship Damaged!", "ក្រឡាត្រូវចំ! នាវាចម្បាំងរងការខូចខាត!")}</span>
                          </>
                        ) : (
                          <>
                            <Waves className="w-6 h-6 text-blue-400" />
                            <span className="text-blue-400">{t("MISS! Only Water Found.", "ក្រឡាទទេ! រកឃើញតែទឹករលក។")}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 animate-zoom-in">
                    <div className="w-16 h-16 bg-rose-500/10 border-4 border-rose-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-10 h-10 text-rose-500" />
                    </div>
                    <div>
                      <h4
                        className="font-black text-rose-500 uppercase tracking-wider"
                        style={{ fontSize: "max(1.4rem, 2.8vw)" }}
                      >
                        {t("INCORRECT ANSWER!", "ចម្លើយមិនត្រឹមត្រូវ!")}
                      </h4>
                      <p className={`text-slate-400 mt-2 ${isKh ? "font-khmer" : ""}`}>
                        {t("Verification failed. The coordinate turns dark gray.", "ការផ្ទៀងផ្ទាត់មិនបានជោគជ័យ។ ក្រឡាកូអរដោនេប្រែជាពណ៌ប្រផេះចាស់។")}
                      </p>
                      <p className="text-slate-500 font-mono text-sm mt-1">
                        {t("Correct Answer Key:", "ចម្លើយត្រឹមត្រូវគឺ៖")} <strong className="text-white font-mono">{lastFeedback.correctAnswer}</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Custom CSS Animations injected dynamically
function styleInjection() {
  return (
    <style>{`
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 4px rgba(99,102,241,0.2); }
        50% { text-shadow: 0 0 16px rgba(99,102,241,0.7); }
      }
      .text-glow {
        animation: textGlow 2.5s infinite ease-in-out;
      }
      @keyframes waveAnimation {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-3px) scale(1.1); }
      }
      .animate-wave {
        animation: waveAnimation 1.8s infinite ease-in-out;
      }
      .animate-fade-in {
        animation: fadeIn 0.25s ease-out forwards;
      }
      .animate-zoom-in {
        animation: zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  );
}
