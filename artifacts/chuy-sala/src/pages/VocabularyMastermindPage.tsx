import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import wordBank from "@/data/vocabulary-mastermind-bank.json";
import {
  ArrowLeft,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Play,
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

interface WordItem {
  word: string;
  hintKm: string;
  gradeLevel: string;
}

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playKeypressSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.start(t);
    osc.stop(t + 0.05);
  } catch (e) {}
}

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

    osc1.type = "triangle";
    osc2.type = "triangle";
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
    gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
    gain.gain.setValueAtTime(0.12, t + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.6);
    osc2.stop(t + 0.6);
  } catch (e) {}
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
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.3);
    osc.start(t);
    osc.stop(t + 0.3);
  } catch (e) {}
}

export default function VocabularyMastermindPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Settings
  const [selectedGrade, setSelectedGrade] = useState<string>("5th");
  const [currentWordItem, setCurrentWordItem] = useState<WordItem | null>(null);

  // Game Play States
  const [guesses, setGuesses] = useState<string[]>(new Array(6).fill(""));
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Keyboard and Grid Colors Status
  // Maps character -> "green" | "yellow" | "gray"
  const [keyboardColors, setKeyboardColors] = useState<Record<string, "green" | "yellow" | "gray">>({});

  // Staggered reveals
  const [revealedRows, setRevealedRows] = useState<boolean[]>(new Array(6).fill(false));

  // Load a new puzzle word
  const selectWord = useCallback((grade: string) => {
    const pool = (wordBank as WordItem[]).filter(
      (w) => w.gradeLevel.toLowerCase() === grade.toLowerCase()
    );
    if (pool.length === 0) return;

    // Pick a random word
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    setCurrentWordItem(randomItem);

    // Reset board states
    setGuesses(new Array(6).fill(""));
    setCurrentAttempt(0);
    setIsGameOver(false);
    setHasWon(false);
    setShowHint(false);
    setErrorMessage("");
    setKeyboardColors({});
    setRevealedRows(new Array(6).fill(false));
  }, []);

  // Initialize
  useEffect(() => {
    selectWord(selectedGrade);
  }, [selectedGrade, selectWord]);

  const targetWord = currentWordItem ? currentWordItem.word.toUpperCase() : "";
  const wordLength = targetWord.length;

  // Handle letter inputs
  const addLetter = useCallback((char: string) => {
    if (isGameOver) return;
    setErrorMessage("");

    setGuesses((prev) => {
      const current = prev[currentAttempt];
      if (current.length >= wordLength) return prev;
      const updated = [...prev];
      updated[currentAttempt] = current + char.toUpperCase();
      playKeypressSound();
      return updated;
    });
  }, [currentAttempt, wordLength, isGameOver]);

  // Handle backspace
  const removeLetter = useCallback(() => {
    if (isGameOver) return;
    setErrorMessage("");

    setGuesses((prev) => {
      const current = prev[currentAttempt];
      if (current.length === 0) return prev;
      const updated = [...prev];
      updated[currentAttempt] = current.slice(0, -1);
      playKeypressSound();
      return updated;
    });
  }, [currentAttempt, isGameOver]);

  // Submit current attempt
  const submitGuess = useCallback(() => {
    if (isGameOver) return;
    setErrorMessage("");

    const currentGuess = guesses[currentAttempt];
    if (currentGuess.length < wordLength) {
      setErrorMessage(
        isKh
          ? `សូមបំពេញអក្សរឱ្យបាន ${wordLength} តួ!`
          : `Please fill in all ${wordLength} letters!`
      );
      playErrorSound();
      return;
    }

    // Trigger row flip animation
    setRevealedRows((prev) => {
      const updated = [...prev];
      updated[currentAttempt] = true;
      return updated;
    });

    // Evaluate colors & update keyboard key colors
    const updatedKeyboard = { ...keyboardColors };
    const targetLetterCounts: Record<string, number> = {};

    // Count letters in target word
    for (let char of targetWord) {
      targetLetterCounts[char] = (targetLetterCounts[char] || 0) + 1;
    }

    // First pass: identify green (exact match)
    for (let i = 0; i < wordLength; i++) {
      const char = currentGuess[i];
      if (char === targetWord[i]) {
        updatedKeyboard[char] = "green";
        targetLetterCounts[char]--;
      }
    }

    // Second pass: identify yellow (partial match) or gray
    for (let i = 0; i < wordLength; i++) {
      const char = currentGuess[i];
      if (char !== targetWord[i]) {
        if (targetLetterCounts[char] && targetLetterCounts[char] > 0) {
          if (updatedKeyboard[char] !== "green") {
            updatedKeyboard[char] = "yellow";
          }
          targetLetterCounts[char]--;
        } else {
          if (updatedKeyboard[char] !== "green" && updatedKeyboard[char] !== "yellow") {
            updatedKeyboard[char] = "gray";
          }
        }
      }
    }

    setKeyboardColors(updatedKeyboard);

    // Win condition
    if (currentGuess === targetWord) {
      setHasWon(true);
      setIsGameOver(true);
      playSuccessSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }

    // Lose condition
    if (currentAttempt >= 5) {
      setIsGameOver(true);
      playErrorSound();
      return;
    }

    // Proceed to next attempt
    setCurrentAttempt((prev) => prev + 1);
  }, [guesses, currentAttempt, wordLength, targetWord, isGameOver, isKh, keyboardColors]);

  // Bind physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACKSPACE") {
        removeLetter();
      } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addLetter, removeLetter, submitGuess]);

  // Keyboard Rows definition
  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
  ];

  // Helper to determine single tile status color
  const getTileStatus = (rowIndex: number, charIndex: number, char: string): "green" | "yellow" | "gray" | "empty" | "typing" => {
    // If not submitted yet
    if (rowIndex >= currentAttempt) {
      return char ? "typing" : "empty";
    }

    const targetChar = targetWord[charIndex];
    if (char === targetChar) return "green";

    // Detailed counts for correct partial mappings
    const guessWord = guesses[rowIndex];
    let exactMatchesCount = 0;
    let occurrencesBeforeIndex = 0;
    let targetCount = 0;

    for (let charTarget of targetWord) {
      if (charTarget === char) targetCount++;
    }

    // Count how many times this letter has exact green matches in the word
    for (let i = 0; i < wordLength; i++) {
      if (guessWord[i] === char && targetWord[i] === char) {
        exactMatchesCount++;
      }
    }

    // Count occurrence of this character in the guess word prior to the current index (excluding exact green matches)
    for (let i = 0; i < charIndex; i++) {
      if (guessWord[i] === char && targetWord[i] !== char) {
        occurrencesBeforeIndex++;
      }
    }

    // If there are still remaining partial spots not claimed by greens or previous yellows
    if (targetCount > exactMatchesCount && occurrencesBeforeIndex < (targetCount - exactMatchesCount)) {
      return "yellow";
    }

    return "gray";
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Star radial Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#050b18] to-black pointer-events-none" />

      {/* CSS flip card keyframes injection */}
      <style>{`
        @keyframes tileFlip {
          0% { transform: rotateX(0deg); }
          45% { transform: rotateX(90deg); background-color: transparent; border-color: #334155; }
          55% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        .tile-animate-flip {
          animation: tileFlip 0.6s ease-in-out forwards;
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 1px rgba(99,102,241,0.2); }
          50% { text-shadow: 0 0 10px rgba(99,102,241,0.8); }
        }
        .glow-text {
          animation: textGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Sticky Header Nav Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/english" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back", "ត្រឡប់ក្រោយ")}
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 uppercase glow-text`}
              style={{ fontSize: "max(1.3rem, 2.5vw)" }}
            >
              {t("Vocabulary Mastermind", "ល្បែងបំបែកពាក្យ")}
            </span>
          </div>

          {/* Grade Level Selector */}
          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl">
            <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block ${isKh ? "font-khmer" : ""}`}>
              {t("Grade Level", "កម្រិតថ្នាក់")}
            </span>
            <div className="flex gap-1.5">
              {["5th", "8th", "12th"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedGrade(lvl)}
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

      {/* Main Game Stage */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-between items-center gap-8">
        
        {/* Active word length and game prompt */}
        <div className="w-full flex items-center justify-between px-6 py-3 bg-slate-950/60 border border-slate-900 rounded-2xl text-xs sm:text-sm font-mono text-slate-400">
          <div>
            {t("Word Length:", "ប្រវែងពាក្យ:")} <span className="font-bold text-white">{wordLength} {t("Letters", "តួអក្សរ")}</span>
          </div>
          <div>
            {t("Attempt:", "ការសាកល្បង:")} <span className="font-bold text-indigo-400">{Math.min(currentAttempt + 1, 6)} / 6</span>
          </div>
        </div>

        {/* ── HINT BOX AREA ──────────────────────────────────────────────── */}
        <div className="min-h-[5rem] flex flex-col items-center justify-center text-center max-w-2xl w-full px-4">
          {showHint && currentWordItem && (
            <div className="bg-indigo-950/30 border border-indigo-500/20 py-4 px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
              <span className="block text-indigo-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                {t("Khmer Hint", "តម្រុយភាសាខ្មែរ")}
              </span>
              <span className="font-khmer text-white font-black leading-relaxed" style={{ fontSize: "max(1.8rem, 3.2vw)" }}>
                {currentWordItem.hintKm}
              </span>
            </div>
          )}
        </div>

        {/* ── GRID GAME BOARD (The Visualizer) ────────────────────────────── */}
        <section className="flex flex-col gap-2.5 select-none w-full max-w-2xl justify-center items-center">
          {guesses.map((guess, rIndex) => {
            const isRowRevealed = revealedRows[rIndex];
            return (
              <div key={`row-${rIndex}`} className="flex gap-2 justify-center w-full">
                {Array.from({ length: wordLength }).map((_, cIndex) => {
                  const char = guess[cIndex] || "";
                  const status = getTileStatus(rIndex, cIndex, char);

                  // Set color mapping classes
                  let colorClass = "bg-slate-950/30 border-slate-800 text-white";
                  if (isRowRevealed) {
                    if (status === "green") colorClass = "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                    else if (status === "yellow") colorClass = "bg-amber-500 border-amber-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]";
                    else if (status === "gray") colorClass = "bg-slate-700 border-slate-650 text-slate-300";
                  } else {
                    if (status === "typing") colorClass = "bg-slate-900 border-indigo-500 text-white scale-105 transition-transform duration-100";
                  }

                  return (
                    <div
                      key={`cell-${rIndex}-${cIndex}`}
                      className={`flex items-center justify-center font-black font-mono border-2 rounded-2xl select-none select-text ${colorClass} ${
                        isRowRevealed ? "tile-animate-flip" : ""
                      }`}
                      style={{
                        width: `max(3.8rem, calc(65vw / ${wordLength}))`,
                        height: `max(3.8rem, calc(65vw / ${wordLength}))`,
                        fontSize: `max(1.8rem, calc(30vw / ${wordLength}))`,
                        animationDelay: isRowRevealed ? `${cIndex * 150}ms` : "0ms"
                      }}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>

        {/* Error Feedback message */}
        <div className="min-h-[2rem] flex items-center justify-center text-rose-400 font-bold text-center text-xs sm:text-sm animate-pulse">
          {errorMessage && (
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </span>
          )}
        </div>

        {/* ── ON-SCREEN KEYBOARD ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-2 w-full max-w-3xl items-center">
          {keyboardRows.map((row, rIndex) => (
            <div key={`k-row-${rIndex}`} className="flex gap-1.5 justify-center w-full">
              {row.map((char) => {
                const status = keyboardColors[char];
                
                // Color mappings
                let colorClass = "bg-slate-900 border-slate-850 hover:border-slate-700 text-slate-200";
                if (status === "green") colorClass = "bg-emerald-600 border-emerald-500 text-white";
                else if (status === "yellow") colorClass = "bg-amber-500 border-amber-400 text-white";
                else if (status === "gray") colorClass = "bg-slate-800 border-slate-800 text-slate-500 opacity-60";

                const isSpecial = char === "ENTER" || char === "BACK";

                return (
                  <button
                    key={`key-${char}`}
                    onClick={() => {
                      if (char === "ENTER") submitGuess();
                      else if (char === "BACK") removeLetter();
                      else addLetter(char);
                    }}
                    className={`flex items-center justify-center font-bold font-mono border rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${colorClass}`}
                    style={{
                      height: "max(3rem, 5.5vh)",
                      minWidth: isSpecial ? "max(3.2rem, 7.5vw)" : "max(1.8rem, 4.5vw)",
                      fontSize: isSpecial ? "max(0.7rem, 1.3vw)" : "max(1.1rem, 2.2vw)",
                      flexGrow: isSpecial ? 2.5 : 1
                    }}
                  >
                    {isSpecial ? (char === "ENTER" ? t("SUBMIT", "យល់ព្រម") : t("DELETE", "លុប")) : char}
                  </button>
                );
              })}
            </div>
          ))}
        </section>

        {/* ── FOOTER CONTROLS ────────────────────────────────────────────── */}
        <footer className="w-full max-w-2xl flex flex-col items-center gap-5 mt-4">
          <div className="flex flex-wrap justify-center gap-4">
            
            {/* Show Hint Toggle */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 border border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              style={{ fontSize: "max(1.1rem, 1.8vw)" }}
            >
              <HelpCircle className="w-5 h-5" />
              {showHint ? t("Hide Hint", "លាក់តម្រុយ") : t("Show Hint", "បង្ហាញតម្រុយ")}
            </button>

            {/* Next Word Button */}
            <button
              onClick={() => selectWord(selectedGrade)}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              style={{ fontSize: "max(1.1rem, 1.8vw)" }}
            >
              <span>{t("Next Word", "ពាក្យបន្ទាប់")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dialog notifications (Win / Lose status) */}
          <div className="min-h-[4rem] flex items-center justify-center">
            {isGameOver && (
              <div className="flex flex-col items-center gap-2 p-5 bg-slate-900 border border-slate-800 rounded-3xl animate-in zoom-in duration-200">
                {hasWon ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-black" style={{ fontSize: "max(1.4rem, 2.5vw)" }}>
                    <Trophy className="w-7 h-7 text-yellow-400 animate-bounce" />
                    <span>{t("EXCELLENT! YOU GUESSED IT!", "អស្ចារ្យណាស់! អ្នកបានទាយត្រូវ!")}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-black animate-pulse" style={{ fontSize: "max(1.4rem, 2.5vw)" }}>
                      <AlertCircle className="w-6 h-6" />
                      <span>{t("GAME OVER!", "ល្បែងត្រូវបានបញ្ចប់!")}</span>
                    </div>
                    <span className="text-slate-400 text-sm font-mono block text-center">
                      {t("Answer was:", "ចម្លើយត្រឹមត្រូវគឺ៖")} <strong className="text-white tracking-widest">{targetWord}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}
