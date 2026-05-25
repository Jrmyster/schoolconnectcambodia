import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import wordsData from "@/data/spelling-bee-bank.json";
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  Sparkles,
  Star,
  ArrowLeft
} from "lucide-react";
import confetti from "canvas-confetti";

interface WordItem {
  word: string;
  definitionEn: string;
  definitionKm: string;
  origin: string;
  difficulty: string;
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

export default function SpellingBeePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [gameState, setGameState] = useState<"setup" | "playing" | "completed">("setup");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [wordList, setWordList] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [validationState, setValidationState] = useState<"idle" | "success" | "error">("idle");
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input helper
  useEffect(() => {
    if (gameState === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentIndex, validationState]);

  // native SpeechSynthesis voice browser hookup
  const speakWord = useCallback((wordText: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = "en-US";
      utterance.rate = 0.85; // Dictionary pronunciation rate
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const enVoice =
        voices.find(
          (v) =>
            /en[-_]US/i.test(v.lang) &&
            /google|zira|samantha|female/i.test(v.name)
        ) ??
        voices.find((v) => /^en/i.test(v.lang)) ??
        null;

      if (enVoice) {
        utterance.voice = enVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis failed", e);
    }
  }, []);

  const currentWordItem = wordList[currentIndex];

  // Auto-speak word on load
  useEffect(() => {
    if (gameState === "playing" && currentWordItem) {
      speakWord(currentWordItem.word);
    }
  }, [gameState, currentIndex, currentWordItem, speakWord]);

  const handleStartGame = (diff: string) => {
    const filtered = (wordsData as WordItem[]).filter(
      (w) => w.difficulty.toLowerCase() === diff.toLowerCase()
    );
    // Shuffle words for engagement
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setWordList(shuffled);
    setSelectedDifficulty(diff);
    setCurrentIndex(0);
    setUserInput("");
    setValidationState("idle");
    setScore(0);
    setAttempts(0);
    setGameState("playing");
  };

  const handleListen = () => {
    if (currentWordItem) {
      speakWord(currentWordItem.word);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentWordItem || validationState === "success") return;

    const sanitizedInput = userInput.trim().toLowerCase();
    const targetWord = currentWordItem.word.toLowerCase();

    setAttempts((prev) => prev + 1);

    if (sanitizedInput === targetWord) {
      setValidationState("success");
      setScore((prev) => prev + 1);
      playSuccessSound();
      // Single correct word tiny confetti burst
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.6 }
      });
    } else {
      setValidationState("error");
      playErrorSound();
    }
  };

  const handleNextWord = () => {
    if (currentIndex + 1 < wordList.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setValidationState("idle");
    } else {
      // Completed difficulty tier!
      setGameState("completed");
      // Fire massive confetti celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setGameState("setup");
    setSelectedDifficulty(null);
    setWordList([]);
    setCurrentIndex(0);
    setUserInput("");
    setValidationState("idle");
    setScore(0);
    setAttempts(0);
  };

  // ── Render Setup State ────────────────────────────────────────────────────
  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
        {/* Background circuit/obsidian matrix glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-[#050b18] to-black pointer-events-none" />

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <div className="max-w-3xl w-full flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Star className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
            </div>

            <h1
              className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-600 tracking-wider mb-4 leading-tight ${
                isKh ? "font-khmer" : ""
              }`}
              style={{ fontSize: "max(2.5rem, 5vw)" }}
            >
              {t("Spelling Bee Competition", "ការប្រកួតប្រជែង Spelling Bee")}
            </h1>

            <p
              className={`text-slate-400 max-w-xl mb-12 ${
                isKh ? "font-khmer leading-loose" : "text-lg leading-relaxed"
              }`}
              style={{ fontSize: "max(1.1rem, 2vw)" }}
            >
              {t(
                "Test your English spelling skills in an interactive game show. Listen to the word, check the definition and etymology, and type the correct spelling.",
                "សាកល្បងសមត្ថភាពប្រកបពាក្យភាសាអង់គ្លេសរបស់អ្នកក្នុងការប្រកួតអន្តរកម្ម។ ស្តាប់ការបញ្ចេញសំឡេង មើលអត្ថន័យ និងប្រភពពាក្យ រួចសរសេរពាក្យឲ្យបានត្រឹមត្រូវ។"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-[#050b18] to-black pointer-events-none" />

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
                "You have completed the Spelling Bee category!",
                "អ្នកបានបញ្ចប់វិញ្ញាសាប្រកបពាក្យ Spelling Bee នេះហើយ!"
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

  // ── Render Playing Game Stage ─────────────────────────────────────────────
  // Define border color flashes based on verification states
  let borderFlash = "border-slate-800/80 focus-within:border-indigo-500";
  let bgFlash = "bg-slate-900/50";
  let glowColor = "shadow-2xl";

  if (validationState === "success") {
    borderFlash = "border-emerald-500";
    bgFlash = "bg-emerald-500/10";
    glowColor = "shadow-[0_0_40px_rgba(16,185,129,0.3)] border-emerald-500";
  } else if (validationState === "error") {
    borderFlash = "border-rose-500 animate-shake";
    bgFlash = "bg-rose-500/10";
    glowColor = "shadow-[0_0_40px_rgba(244,63,94,0.3)] border-rose-500";
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-[#050b18] to-black pointer-events-none" />

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
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Spelling Bee", "ការប្រកួតប្រជែង Spelling Bee")}
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
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-center items-center gap-8">
        {/* Game Stats & Progress */}
        <div className="w-full flex items-center justify-between px-6 py-3 bg-slate-950/60 border border-slate-900 rounded-2xl">
          <div className="text-slate-400 font-mono text-sm sm:text-base">
            {t("Word:", "ពាក្យទី:")}{" "}
            <span className="font-bold text-white">
              {currentIndex + 1} / {wordList.length}
            </span>
          </div>

          <div className="text-slate-400 font-mono text-sm sm:text-base">
            {t("Correct:", "ត្រឹមត្រូវ:")}{" "}
            <span className="font-bold text-emerald-400">{score}</span>
          </div>
        </div>

        {/* The Main Stage (Typing & Auditory Panel) */}
        <div
          className={`w-full ${bgFlash} border-2 ${borderFlash} rounded-3xl p-8 md:p-12 transition-all duration-300 ${glowColor} flex flex-col items-center gap-8`}
        >
          {/* Audio Pronunciation Trigger Button */}
          <button
            onClick={handleListen}
            className="w-24 h-24 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center hover:scale-[1.08] active:scale-[0.96] transition-all shadow-[0_0_35px_rgba(99,102,241,0.5)] group cursor-pointer"
            title={t("Listen", "ស្តាប់")}
          >
            <Volume2 className="w-12 h-12 group-hover:scale-110 transition-transform" />
          </button>

          <span
            className={`text-slate-400 font-semibold text-center ${
              isKh ? "font-khmer" : "tracking-wider uppercase"
            }`}
            style={{ fontSize: "max(1rem, 2.5vw)" }}
          >
            {t(
              "Click the speaker icon to listen to the word",
              "ចុចលើរូបស្ពីគ័រដើម្បីស្តាប់ការអានពាក្យ"
            )}
          </span>

          {/* Large Centered Viewport-Sized Text Input */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              disabled={validationState === "success"}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (validationState === "error") setValidationState("idle");
              }}
              placeholder={t("Type spelling here...", "វាយបញ្ចូលអក្ខរាវិរុទ្ធនៅទីនេះ...")}
              className="w-full text-center font-black font-mono tracking-widest bg-transparent border-b-4 border-slate-700 focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-800 placeholder:font-sans placeholder:tracking-normal text-white"
              style={{ fontSize: "max(2rem, 6vw)" }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />

            {/* Validation & Feedback Overlay */}
            <div className="mt-8 min-h-[4rem] flex flex-col items-center justify-center">
              {validationState === "idle" && (
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className={`px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed border border-indigo-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.03] ${
                    isKh ? "font-khmer" : "tracking-widest uppercase"
                  }`}
                  style={{ fontSize: "max(1.1rem, 2.2vw)" }}
                >
                  {t("Submit", "ដាក់ស្នើ")}
                </button>
              )}

              {validationState === "success" && (
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-400 text-2xl md:text-3xl font-black">
                    <CheckCircle2 className="w-8 h-8" />
                    <span>{t("CORRECT!", "ត្រឹមត្រូវ!")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextWord}
                    className={`px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-black flex items-center gap-2 hover:scale-[1.03] transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] ${
                      isKh ? "font-khmer" : "tracking-wider uppercase"
                    }`}
                    style={{ fontSize: "max(1.1rem, 2.2vw)" }}
                  >
                    <span>{t("Next Word", "ពាក្យបន្ទាប់")}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {validationState === "error" && (
                <div className="flex flex-col items-center gap-4 animate-in fade-in duration-100">
                  <div className="flex items-center gap-2 text-rose-400 text-2xl md:text-3xl font-black">
                    <AlertCircle className="w-8 h-8" />
                    <span>{t("INCORRECT! TRY AGAIN", "មិនត្រឹមត្រូវទេ! ព្យាយាមម្តងទៀត")}</span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className={`px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold hover:scale-[1.03] transition-all shadow-[0_0_25px_rgba(244,63,94,0.3)] ${
                        isKh ? "font-khmer" : "tracking-wider uppercase"
                      }`}
                      style={{ fontSize: "max(1rem, 1.8vw)" }}
                    >
                      {t("Submit Again", "ដាក់ស្នើឡើងវិញ")}
                    </button>
                    <button
                      type="button"
                      onClick={handleListen}
                      className="px-6 py-3 border border-slate-700 hover:bg-slate-900 text-slate-300 rounded-full font-semibold transition-all"
                      style={{ fontSize: "max(1rem, 1.8vw)" }}
                    >
                      {t("Listen Again", "ស្តាប់ម្តងទៀត")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Information Panels Display (Definition & Origin) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Definition Panel */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-3">
            <h3
              className={`text-slate-400 font-bold ${
                isKh ? "font-khmer" : "tracking-wider uppercase"
              }`}
              style={{ fontSize: "max(0.95rem, 1.8vw)" }}
            >
              {t("Word Definition", "អត្ថន័យពាក្យ")}
            </h3>
            <p
              className={`text-white leading-relaxed ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
              style={{ fontSize: "max(1.1rem, 2.2vw)" }}
            >
              {isKh ? currentWordItem?.definitionKm : currentWordItem?.definitionEn}
            </p>
          </div>

          {/* Origin/Etymology Panel */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-3">
            <h3
              className={`text-slate-400 font-bold ${
                isKh ? "font-khmer" : "tracking-wider uppercase"
              }`}
              style={{ fontSize: "max(0.95rem, 1.8vw)" }}
            >
              {t("Word Origin", "ប្រភពដើមនៃពាក្យ")}
            </h3>
            <p
              className={`text-indigo-300 font-bold ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.25rem, 2.4vw)" }}
            >
              {currentWordItem?.origin}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
