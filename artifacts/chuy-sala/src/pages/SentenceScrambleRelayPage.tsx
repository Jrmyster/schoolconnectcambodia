import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import sentenceBank from "@/data/sentence-scramble-relay-bank.json";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ArrowRight,
  Shuffle,
  Gamepad2
} from "lucide-react";
import confetti from "canvas-confetti";

interface SentenceItem {
  sentence: string;
  hintKm: string;
  gradeLevel: string;
}

interface WordBlock {
  id: string; // unique identifier
  text: string;
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
    osc.frequency.setValueAtTime(550, t);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.04, t);
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
    gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
    gain.gain.setValueAtTime(0.12, t + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.7);
    osc2.stop(t + 0.7);
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

    osc.type = "triangle";
    osc.frequency.setValueAtTime(170, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.45);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.45);

    osc.start(t);
    osc.stop(t + 0.45);
  } catch (e) {}
}

export default function SentenceScrambleRelayPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Settings & Sentences
  const [selectedGrade, setSelectedGrade] = useState<string>("5th");
  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Game Board States
  const [scrambledPool, setScrambledPool] = useState<WordBlock[]>([]);
  const [answerZone, setAnswerZone] = useState<WordBlock[]>([]);
  const [validationState, setValidationState] = useState<"idle" | "success" | "error">("idle");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentSentenceItem = sentences[currentIndex];

  // Helper: Shuffle items
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Helper: Clean sentence (strip punctuation, lowercase, split by space)
  const cleanSentenceWords = useCallback((sentence: string): string[] => {
    return sentence
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0);
  }, []);

  // Load a sentence into the board
  const loadSentence = useCallback((sentenceItem: SentenceItem) => {
    if (!sentenceItem) return;
    
    const targetWords = cleanSentenceWords(sentenceItem.sentence);
    const blocks: WordBlock[] = targetWords.map((word, index) => ({
      id: `${word}-${index}-${Math.random()}`,
      text: word
    }));

    // Shuffle the word blocks
    let shuffled = shuffleArray(blocks);
    // Make sure it doesn't accidentally match the target order
    while (
      shuffled.map((b) => b.text).join(" ") === targetWords.join(" ") &&
      targetWords.length > 1
    ) {
      shuffled = shuffleArray(blocks);
    }

    setScrambledPool(shuffled);
    setAnswerZone([]);
    setValidationState("idle");
    setShowHint(false);
  }, [cleanSentenceWords]);

  // Load active bank by Grade Level
  const initializeGradeLevel = useCallback((grade: string) => {
    const filtered = (sentenceBank as SentenceItem[]).filter(
      (s) => s.gradeLevel.toLowerCase() === grade.toLowerCase()
    );
    const shuffledSentences = shuffleArray(filtered);
    setSentences(shuffledSentences);
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
    
    if (shuffledSentences.length > 0) {
      loadSentence(shuffledSentences[0]);
    }
  }, [loadSentence]);

  // Initialize
  useEffect(() => {
    initializeGradeLevel(selectedGrade);
  }, [selectedGrade, initializeGradeLevel]);

  // Move word from pool to answer zone
  const handlePoolBlockClick = (block: WordBlock) => {
    if (validationState === "success") return;
    playKeypressSound();

    setAnswerZone((prev) => [...prev, block]);
    setScrambledPool((prev) => prev.filter((b) => b.id !== block.id));
    
    if (validationState === "error") {
      setValidationState("idle");
    }
  };

  // Move word from answer zone back to pool
  const handleAnswerBlockClick = (block: WordBlock) => {
    if (validationState === "success") return;
    playKeypressSound();

    setAnswerZone((prev) => prev.filter((b) => b.id !== block.id));
    setScrambledPool((prev) => [...prev, block]);
    
    if (validationState === "error") {
      setValidationState("idle");
    }
  };

  // Check spelled sentence
  const handleCheckSentence = () => {
    if (!currentSentenceItem || validationState === "success") return;

    const targetWords = cleanSentenceWords(currentSentenceItem.sentence);
    const spelledWords = answerZone.map((b) => b.text);

    if (spelledWords.join(" ") === targetWords.join(" ")) {
      setValidationState("success");
      setScore((prev) => prev + 1);
      playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setValidationState("error");
      playErrorSound();
    }
  };

  // Next Sentence or completion
  const handleNextSentence = () => {
    if (currentIndex + 1 < sentences.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      loadSentence(sentences[nextIdx]);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  // Reset category
  const handleReset = () => {
    initializeGradeLevel(selectedGrade);
  };

  // Render Completed screen
  if (isCompleted) {
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
                "You have completed all Sentence Scrambles in this level!",
                "អ្នកបានបំពេញល្បែងតម្រៀបប្រយោគទាំងអស់ក្នុងកម្រិតនេះហើយ!"
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
                {score} / {sentences.length}
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
              {t("Restart", "លេងឡើងវិញ")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      {/* Background radial layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#050b18] to-black pointer-events-none" />

      {/* Shake animations keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.35s ease-in-out;
        }
        @keyframes subtlePulse {
          0%, 100% { border-color: rgba(99,102,241,0.4); }
          50% { border-color: rgba(99,102,241,0.8); }
        }
        .active-slots {
          animation: subtlePulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Sticky Header Nav Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/english"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back", "ត្រឡប់ក្រោយ")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400 uppercase`}
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("Sentence Scramble Relay", "ល្បែងតម្រៀបប្រយោគ")}
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

      {/* Main Board Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-between items-center gap-6">
        
        {/* Game Info Dashboard */}
        <div className="w-full flex items-center justify-between px-6 py-3 bg-slate-950/60 border border-slate-900 rounded-2xl text-xs sm:text-sm font-mono text-slate-400">
          <div>
            {t("Sentence:", "ប្រយោគទី:")} <span className="font-bold text-white">{currentIndex + 1} / {sentences.length}</span>
          </div>
          <div>
            {t("Score:", "ពិន្ទុ:")} <span className="font-bold text-indigo-400">{score}</span>
          </div>
        </div>

        {/* ── ANSWER ZONE (Top Slots) ────────────────────────────────────── */}
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">
            {t("Answer Zone", "តំបន់ចម្លើយ")}
          </span>

          <div
            className={`flex flex-wrap justify-center items-center gap-3 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 w-full min-h-[14vh] transition-all duration-300 active-slots ${
              validationState === "success"
                ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-emerald-950/10"
                : validationState === "error"
                ? "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)] bg-rose-950/10 animate-shake"
                : ""
            }`}
          >
            {answerZone.length === 0 ? (
              <span className="text-slate-600 font-bold italic tracking-wide select-none" style={{ fontSize: "max(1.1rem, 1.8vw)" }}>
                {t("Tap words below to arrange the sentence...", "ប៉ះពាក្យខាងក្រោមដើម្បីរៀបចំប្រយោគ...")}
              </span>
            ) : (
              answerZone.map((block) => (
                <button
                  key={`answer-${block.id}`}
                  disabled={validationState === "success"}
                  onClick={() => handleAnswerBlockClick(block)}
                  className={`font-bold rounded-2xl border-2 shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer select-none leading-none ${
                    validationState === "success"
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : validationState === "error"
                      ? "bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                      : "bg-indigo-600 border-indigo-400 text-white hover:bg-indigo-500"
                  }`}
                  style={{
                    padding: "max(0.8rem, 1.6vh) max(1.4rem, 2.6vw)",
                    fontSize: "max(1.2rem, 2.3vw)",
                  }}
                >
                  {block.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── HINT SYSTEM ────────────────────────────────────────────────── */}
        <div className="min-h-[6.5rem] flex flex-col items-center justify-center w-full max-w-3xl px-4 text-center">
          {showHint && currentSentenceItem && (
            <div className="bg-indigo-950/30 border border-indigo-500/20 py-4 px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
              <span className="block text-indigo-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                {t("Khmer Translation Hint", "តម្រុយប្រែប្រួលជាភាសាខ្មែរ")}
              </span>
              <span className="font-khmer text-white font-black leading-relaxed" style={{ fontSize: "max(1.8rem, 2.8vw)" }}>
                {currentSentenceItem.hintKm}
              </span>
            </div>
          )}
        </div>

        {/* ── SCRAMBLED POOL (Bottom Stack) ──────────────────────────────── */}
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">
            {t("Scrambled Pool", "ពាក្យដែលច្របូកច្របល់")}
          </span>

          <div className="flex flex-wrap justify-center gap-3 p-8 rounded-3xl bg-slate-900/25 border border-slate-800/40 w-full min-h-[14vh]">
            {scrambledPool.map((block) => (
              <button
                key={`pool-${block.id}`}
                disabled={validationState === "success"}
                onClick={() => handlePoolBlockClick(block)}
                className="bg-slate-800 border-slate-650 hover:bg-slate-700 hover:border-slate-500 hover:scale-105 active:scale-95 text-slate-100 font-bold rounded-2xl border-2 shadow-md transition-all duration-150 cursor-pointer select-none leading-none"
                style={{
                  padding: "max(0.8rem, 1.6vh) max(1.4rem, 2.6vw)",
                  fontSize: "max(1.2rem, 2.3vw)",
                }}
              >
                {block.text}
              </button>
            ))}
          </div>
        </div>

        {/* ── VALIDATION & NAVIGATION CONTROLS ───────────────────────────── */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-5 mt-4">
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

            {/* Check Sentence Button */}
            {validationState !== "success" && (
              <button
                onClick={handleCheckSentence}
                disabled={answerZone.length === 0}
                className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed border border-indigo-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer ${
                  isKh ? "font-khmer" : "tracking-wider uppercase"
                }`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <CheckCircle2 className="w-5 h-5" />
                {t("Check Sentence", "ពិនិត្យប្រយោគ")}
              </button>
            )}

            {/* Next Sentence Button */}
            {(validationState === "success" || true) && (
              <button
                onClick={handleNextSentence}
                className={`px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer ${
                  validationState === "success"
                    ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : ""
                }`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <span>{t("Next Sentence", "ប្រយោគបន្ទាប់")}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Validation Feedback Alert */}
          <div className="min-h-[3rem] flex items-center justify-center">
            {validationState === "success" && (
              <div className="flex items-center gap-2 text-emerald-400 font-black animate-in fade-in duration-200" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
                <span>{t("EXCELLENT! CORRECT ORDER!", "អស្ចារ្យណាស់! លំដាប់ត្រឹមត្រូវ!")}</span>
              </div>
            )}
            {validationState === "error" && (
              <div className="flex items-center gap-2 text-rose-400 font-black animate-in fade-in duration-200" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                <AlertCircle className="w-6 h-6 animate-pulse" />
                <span>{t("INCORRECT ORDER! TRY AGAIN", "លំដាប់មិនត្រឹមត្រូវទេ! ព្យាយាមម្តងទៀត")}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
