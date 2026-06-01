import React, { useState, useEffect, useCallback } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import wordBank from "@/data/word-jigsaw-bank.json";
import {
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  Sparkles,
  Star,
  ArrowLeft,
  HelpCircle,
  Gamepad2
} from "lucide-react";
import confetti from "canvas-confetti";

interface WordItem {
  word: string;
  hintKm: string;
  difficulty: string;
}

interface Tile {
  id: string; // unique identifier
  char: string;
  originalIndex: number;
}

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playSuccessSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const t = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(523.25, t); // C5
    osc2.frequency.setValueAtTime(659.25, t); // E5

    osc1.frequency.setValueAtTime(659.25, t + 0.1); // E5
    osc2.frequency.setValueAtTime(783.99, t + 0.1); // G5

    osc1.frequency.setValueAtTime(1046.5, t + 0.2); // C6
    osc2.frequency.setValueAtTime(1318.51, t + 0.2); // E6

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
    gain.gain.setValueAtTime(0.15, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.8);
    osc2.stop(t + 0.8);
  } catch (err) {
    console.error("Failed to play audio", err);
  }
}

function playErrorSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(120, t + 0.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.5);

    osc.start(t);
    osc.stop(t + 0.5);
  } catch (err) {
    console.error("Failed to play audio", err);
  }
}

export default function EnglishWordJigsawPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [gameState, setGameState] = useState<"setup" | "playing" | "completed">("setup");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [wordList, setWordList] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Game Board States
  const [poolTiles, setPoolTiles] = useState<Tile[]>([]);
  const [answerSlots, setAnswerSlots] = useState<(Tile | null)[]>([]);
  const [validationState, setValidationState] = useState<"idle" | "success" | "error">("idle");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentWordItem = wordList[currentIndex];

  // Helper: Shuffle items
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Start game for selected difficulty
  const handleStartGame = (diff: string) => {
    const filtered = (wordBank as WordItem[]).filter(
      (w) => w.difficulty.toLowerCase() === diff.toLowerCase()
    );
    const shuffledWords = shuffleArray(filtered);
    setWordList(shuffledWords);
    setSelectedDifficulty(diff);
    setCurrentIndex(0);
    setScore(0);
    setGameState("playing");
    loadWord(shuffledWords[0]);
  };

  // Load a word into the jigsaw board
  const loadWord = (wordItem: WordItem) => {
    if (!wordItem) return;
    const targetWord = wordItem.word.toUpperCase();
    
    // Split target word into individual letters
    const letters = targetWord.split("");
    const tiles: Tile[] = letters.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
      originalIndex: index,
    }));

    // Shuffle the tiles for Scrambled Pool
    let shuffled = shuffleArray(tiles);
    // Safety check: make sure it is actually scrambled (not already matching targetWord)
    while (shuffled.map(t => t.char).join("") === targetWord && targetWord.length > 1) {
      shuffled = shuffleArray(tiles);
    }

    setPoolTiles(shuffled);
    setAnswerSlots(new Array(targetWord.length).fill(null));
    setValidationState("idle");
    setShowHint(false);
  };

  // Move letter from scrambled pool to first empty slot in Answer Zone
  const handlePoolTileClick = (tile: Tile) => {
    if (validationState === "success") return;
    
    // Check if tile is already placed in Answer Zone
    const alreadySelected = answerSlots.some((slot) => slot?.id === tile.id);
    if (alreadySelected) return;

    // Find the next available empty slot in Answer Zone
    const emptyIndex = answerSlots.findIndex((slot) => slot === null);
    if (emptyIndex !== -1) {
      const updatedSlots = [...answerSlots];
      updatedSlots[emptyIndex] = tile;
      setAnswerSlots(updatedSlots);
      
      // Reset error state on new tile input
      if (validationState === "error") {
        setValidationState("idle");
      }
    }
  };

  // Remove letter from Answer Zone and return it to scrambled pool
  const handleAnswerSlotClick = (slotIndex: number) => {
    if (validationState === "success") return;

    const tile = answerSlots[slotIndex];
    if (!tile) return;

    const updatedSlots = [...answerSlots];
    updatedSlots[slotIndex] = null;
    setAnswerSlots(updatedSlots);

    // Reset error state
    if (validationState === "error") {
      setValidationState("idle");
    }
  };

  // Check the spelled word
  const handleCheckAnswer = () => {
    if (!currentWordItem || validationState === "success") return;

    const spelledWord = answerSlots
      .map((slot) => (slot ? slot.char : ""))
      .join("");
    const targetWord = currentWordItem.word.toUpperCase();

    if (spelledWord === targetWord) {
      setValidationState("success");
      setScore((prev) => prev + 1);
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setValidationState("error");
      playErrorSound();
    }
  };

  // Go to next word or complete game
  const handleNextWord = () => {
    if (currentIndex + 1 < wordList.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      loadWord(wordList[nextIdx]);
    } else {
      setGameState("completed");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  // Reset to difficulty selection screen
  const handleReset = () => {
    setGameState("setup");
    setSelectedDifficulty(null);
    setWordList([]);
    setCurrentIndex(0);
    setPoolTiles([]);
    setAnswerSlots([]);
    setValidationState("idle");
    setShowHint(false);
    setScore(0);
  };

  // ── Render Setup State ────────────────────────────────────────────────────
  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050b18] to-black pointer-events-none" />

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <div className="max-w-3xl w-full flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Gamepad2 className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
            </div>

            <h1
              className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-600 tracking-wider mb-4 leading-tight ${
                isKh ? "font-khmer" : ""
              }`}
              style={{ fontSize: "max(2.5rem, 5vw)" }}
            >
              {t("English Word Jigsaw", "ល្បែងផ្គុំពាក្យភាសាអង់គ្លេស")}
            </h1>

            <p
              className={`text-slate-400 max-w-xl mb-12 ${
                isKh ? "font-khmer leading-loose" : "text-lg leading-relaxed"
              }`}
              style={{ fontSize: "max(1.1rem, 2vw)" }}
            >
              {t(
                "Solve scrambled English vocabulary words! Select letters to move them into the slots and build the correct word. Projector-friendly for classrooms.",
                "ដោះស្រាយល្បែងផ្គុំពាក្យវាក្យសព្ទភាសាអង់គ្លេស! ជ្រើសរើសអក្សរដើម្បីបំពេញចន្លោះទទេ និងបង្កើតពាក្យដែលត្រឹមត្រូវ។ ងាយស្រួលមើលតាមម៉ាស៊ីនបញ្ចាំងក្នុងថ្នាក់រៀន។"
              )}
            </p>

            <div className="w-full max-w-xl bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
              <h2
                className={`text-slate-300 font-bold mb-6 ${
                  isKh ? "font-khmer" : "tracking-wider uppercase"
                }`}
                style={{ fontSize: "max(1.2rem, 2.2vw)" }}
              >
                {t("Select Difficulty", "ជ្រើសរើសកម្រិតពិបាក")}
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleStartGame("Easy")}
                  className="w-full py-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 hover:bg-emerald-500/20 hover:border-emerald-400 font-bold transition-all text-emerald-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center gap-2"
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t("Easy", "ងាយស្រួល")}
                </button>

                <button
                  onClick={() => handleStartGame("Medium")}
                  className="w-full py-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400 font-bold transition-all text-amber-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center gap-2"
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t("Medium", "មធ្យម")}
                </button>

                <button
                  onClick={() => handleStartGame("Hard")}
                  className="w-full py-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 hover:bg-rose-500/20 hover:border-rose-400 font-bold transition-all text-rose-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(244,63,94,0.15)] flex items-center justify-center gap-2"
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t("Hard", "ពិបាក")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Render Completed State ────────────────────────────────────────────────
  if (gameState === "completed") {
    return (
      <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050b18] to-black pointer-events-none" />

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <div className="max-w-2xl w-full bg-slate-900/60 border border-slate-800/80 p-12 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
            <Trophy className="w-28 h-28 text-yellow-400 mb-6 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-bounce" />

            <h1
              className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider mb-4 leading-tight ${
                isKh ? "font-khmer" : ""
              }`}
              style={{ fontSize: "max(2.2rem, 5vw)" }}
            >
              {t("Congratulations!", "អបអរសាទរ!")}
            </h1>

            <p
              className={`text-slate-300 mb-8 ${
                isKh ? "font-khmer leading-loose" : "text-lg"
              }`}
              style={{ fontSize: "max(1.2rem, 2.5vw)" }}
            >
              {t(
                "You have completed all English Word Jigsaws in this category!",
                "អ្នកបានបំពេញល្បែងផ្គុំពាក្យអង់គ្លេសទាំងអស់ក្នុងកម្រិតនេះហើយ!"
              )}
            </p>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl py-6 px-12 mb-8 shadow-inner">
              <span
                className={`block text-slate-400 text-sm mb-1 ${
                  isKh ? "font-khmer" : "tracking-widest uppercase"
                }`}
              >
                {t("Final Score", "ពិន្ទុចុងក្រោយ")}
              </span>
              <span className="text-5xl font-black text-white font-mono">
                {score} / {wordList.length}
              </span>
            </div>

            <button
              onClick={handleReset}
              className={`px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_25px_rgba(99,102,241,0.4)] ${
                isKh ? "font-khmer" : "tracking-wider uppercase"
              }`}
              style={{ fontSize: "max(1.1rem, 2vw)" }}
            >
              <RotateCcw className="w-5 h-5" />
              {t("Back to Menu", "ត្រឡប់ទៅម៉ឺនុយ")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render Playing State ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050b18] to-black pointer-events-none" />

      {/* CSS Shake Animation Injector */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      {/* Top Page Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back", "ត្រឡប់ក្រោយ")}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-indigo-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Word Jigsaw", "ល្បែងផ្គុំពាក្យអង់គ្លេស")}
            </span>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl font-mono text-sm sm:text-base">
            <span className="text-slate-400 font-sans text-xs sm:text-sm">
              {t("Difficulty:", "កម្រិតពិបាក:")}
            </span>
            <span
              className={`font-bold ${
                selectedDifficulty === "Easy"
                  ? "text-emerald-400"
                  : selectedDifficulty === "Medium"
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {isKh
                ? selectedDifficulty === "Easy"
                  ? "ងាយ"
                  : selectedDifficulty === "Medium"
                  ? "មធ្យម"
                  : "ពិបាក"
                : selectedDifficulty}
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Stage Container */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-between items-center gap-6">
        {/* Game Stats & Progress */}
        <div className="w-full flex items-center justify-between px-6 py-3 bg-slate-950/60 border border-slate-900 rounded-2xl">
          <div className="text-slate-400 font-mono text-sm sm:text-base">
            {t("Word:", "ពាក្យទី:")}{" "}
            <span className="font-bold text-white">
              {currentIndex + 1} / {wordList.length}
            </span>
          </div>

          <div className="text-slate-400 font-mono text-sm sm:text-base">
            {t("Score:", "ពិន្ទុ:")}{" "}
            <span className="font-bold text-indigo-400">{score}</span>
          </div>
        </div>

        {/* ── ANSWER ZONE (Top Area) ────────────────────────────────────────── */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-slate-400 text-center tracking-wider uppercase font-semibold text-xs sm:text-sm">
            {t("Answer Zone", "តំបន់ចម្លើយ")}
          </div>
          
          <div 
            className={`flex flex-wrap justify-center gap-3 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 w-full max-w-5xl transition-all duration-300 ${
              validationState === "success"
                ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-emerald-950/10"
                : validationState === "error"
                ? "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)] bg-rose-950/10 animate-shake"
                : ""
            }`}
          >
            {answerSlots.map((slot, index) => (
              <button
                key={`answer-slot-${index}`}
                disabled={validationState === "success" || !slot}
                onClick={() => handleAnswerSlotClick(index)}
                className={`relative flex items-center justify-center font-black font-mono select-none rounded-2xl border-2 transition-all duration-150 active:scale-95 ${
                  slot
                    ? "bg-indigo-600 border-indigo-400 text-white shadow-lg cursor-pointer hover:bg-indigo-500"
                    : "bg-slate-950/60 border-dashed border-slate-800 text-slate-700 cursor-default"
                } ${
                  validationState === "success" && slot
                    ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : validationState === "error" && slot
                    ? "bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                    : ""
                }`}
                style={{
                  width: "max(4.5rem, 7vw)",
                  height: "max(4.5rem, 7vw)",
                  fontSize: "max(2.2rem, 3.5vw)",
                }}
              >
                {slot ? slot.char : ""}
              </button>
            ))}
          </div>
        </div>

        {/* ── HINT SYSTEM ────────────────────────────────────────────────── */}
        <div className="min-h-[6.5rem] flex flex-col items-center justify-center w-full max-w-2xl px-4 text-center">
          {showHint && currentWordItem && (
            <div className="bg-indigo-950/30 border border-indigo-500/20 py-4 px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
              <span className="block text-indigo-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                {t("Khmer Hint", "តម្រុយភាសាខ្មែរ")}
              </span>
              <span className="font-khmer text-white font-black leading-relaxed" style={{ fontSize: "max(1.8rem, 3vw)" }}>
                {currentWordItem.hintKm}
              </span>
            </div>
          )}
        </div>

        {/* ── SCRAMBLED POOL (Bottom Area) ────────────────────────────────── */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-slate-400 text-center tracking-wider uppercase font-semibold text-xs sm:text-sm">
            {t("Scrambled Pool", "ពាក្យដែលច្របូកច្របល់")}
          </div>

          <div className="flex flex-wrap justify-center gap-3 p-6 sm:p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 w-full max-w-5xl">
            {poolTiles.map((tile) => {
              const isSelected = answerSlots.some((slot) => slot?.id === tile.id);
              return (
                <button
                  key={`pool-tile-${tile.id}`}
                  disabled={isSelected || validationState === "success"}
                  onClick={() => handlePoolTileClick(tile)}
                  className={`flex items-center justify-center font-black font-mono select-none rounded-2xl border-2 transition-all duration-150 ${
                    isSelected
                      ? "bg-slate-950/20 border-dashed border-slate-900 text-transparent opacity-20 pointer-events-none"
                      : "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700 hover:border-slate-500 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                  }`}
                  style={{
                    width: "max(4.5rem, 7vw)",
                    height: "max(4.5rem, 7vw)",
                    fontSize: "max(2.2rem, 3.5vw)",
                  }}
                >
                  {tile.char}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── VALIDATION & NAVIGATION CONTROLS (Bottom Controls) ──────────── */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-4 mt-4">
          <div className="flex flex-wrap justify-center gap-4">
            {/* Show Hint Button */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 border border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              style={{ fontSize: "max(1.1rem, 1.8vw)" }}
            >
              <HelpCircle className="w-5 h-5" />
              {showHint ? t("Hide Hint", "លាក់តម្រុយ") : t("Show Hint", "បង្ហាញតម្រុយ")}
            </button>

            {/* Check Answer Button */}
            {validationState !== "success" && (
              <button
                onClick={handleCheckAnswer}
                disabled={answerSlots.includes(null)}
                className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed border border-indigo-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer ${
                  isKh ? "font-khmer" : "tracking-wider uppercase"
                }`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <CheckCircle2 className="w-5 h-5" />
                {t("Check Answer", "ពិនិត្យចម្លើយ")}
              </button>
            )}

            {/* Next Word Button */}
            {(validationState === "success" || validationState === "error" || true) && (
              <button
                onClick={handleNextWord}
                className={`px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer ${
                  validationState === "success"
                    ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : ""
                }`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <span>{t("Next Word", "ពាក្យបន្ទាប់")}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Validation Feedback Toast/Alert */}
          <div className="min-h-[3rem] flex items-center justify-center">
            {validationState === "success" && (
              <div className="flex items-center gap-2 text-emerald-400 font-black animate-in fade-in duration-200" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
                <span>{t("CORRECT!", "ត្រឹមត្រូវ!")}</span>
              </div>
            )}
            {validationState === "error" && (
              <div className="flex items-center gap-2 text-rose-400 font-black animate-in fade-in duration-200" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                <AlertCircle className="w-6 h-6 animate-pulse" />
                <span>{t("INCORRECT! TRY AGAIN", "មិនត្រឹមត្រូវទេ! ព្យាយាមម្តងទៀត")}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
