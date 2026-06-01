import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Calculator,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playKeypressSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
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
  } catch (e) {}
}

function playSuccessSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
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

function playTickSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.start(t);
    osc.stop(t + 0.05);
  } catch (e) {}
}

function playAlarmSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(440, t + 0.8);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.8);
    osc.start(t);
    osc.stop(t + 0.8);
  } catch (e) {}
}

// ── Recursive Descent Mathematical Parser (100% Safe) ────────────────────────
function safeMathEval(str: string): number {
  // Extract safe tokens: numbers, decimals, or standard operations
  const tokens = str.match(/\d+(\.\d+)?|[+\-*/()]/g) || [];
  let position = 0;

  function parsePrimary(): number {
    const token = tokens[position];
    if (token === "(") {
      position++; // consume '('
      const val = parseExpression();
      if (tokens[position] === ")") {
        position++; // consume ')'
      }
      return val;
    }
    if (/^\d+(\.\d+)?$/.test(token)) {
      position++;
      return parseFloat(token);
    }
    return 0;
  }

  function parseMultiplicative(): number {
    let val = parsePrimary();
    while (position < tokens.length) {
      const op = tokens[position];
      if (op === "*" || op === "/") {
        position++;
        const nextVal = parsePrimary();
        if (op === "*") {
          val *= nextVal;
        } else {
          // Avoid division by zero
          val = nextVal === 0 ? 0 : val / nextVal;
        }
      } else {
        break;
      }
    }
    return val;
  }

  function parseExpression(): number {
    let val = parseMultiplicative();
    while (position < tokens.length) {
      const op = tokens[position];
      if (op === "+" || op === "-") {
        position++;
        const nextVal = parseMultiplicative();
        if (op === "+") val += nextVal;
        else val -= nextVal;
      } else {
        break;
      }
    }
    return val;
  }

  try {
    const res = parseExpression();
    return isNaN(res) ? 0 : res;
  } catch (e) {
    return 0;
  }
}

export default function TargetNumberPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Settings
  const [selectedGrade, setSelectedGrade] = useState<string>("5th");
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [baseNumbers, setBaseNumbers] = useState<number[]>([]);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes (120s)
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Verification states
  const [formulaInput, setFormulaInput] = useState<string>("");
  const [evaluatedResult, setEvaluatedResult] = useState<number | null>(null);
  const [difference, setDifference] = useState<number | null>(null);
  const [verificationTriggered, setVerificationTriggered] = useState<boolean>(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Generate game based on difficulty
  const generateNewGame = useCallback((grade: string) => {
    playKeypressSound();
    let target = 0;
    const bases: number[] = [];

    if (grade === "5th") {
      // Target: 20-100. Bases: 6 numbers from 1-10
      target = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      for (let i = 0; i < 6; i++) {
        bases.push(Math.floor(Math.random() * 10) + 1);
      }
    } else if (grade === "8th") {
      // Target: 100-500. Bases: 6 numbers from 1-20
      target = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
      for (let i = 0; i < 6; i++) {
        bases.push(Math.floor(Math.random() * 20) + 1);
      }
    } else {
      // 12th Grade: Target: 250-999. Bases: Mix of 4 small numbers (1-10) and 2 large multipliers (25, 50, 75, 100)
      target = Math.floor(Math.random() * (999 - 250 + 1)) + 250;
      
      // 4 Small numbers
      for (let i = 0; i < 4; i++) {
        bases.push(Math.floor(Math.random() * 10) + 1);
      }
      // 2 Large multipliers
      const largePool = [25, 50, 75, 100];
      for (let i = 0; i < 2; i++) {
        const randIndex = Math.floor(Math.random() * largePool.length);
        bases.push(largePool[randIndex]);
      }
      
      // Shuffle bases so multipliers aren't always at the end
      bases.sort(() => Math.random() - 0.5);
    }

    setTargetNumber(target);
    setBaseNumbers(bases);
    setTimeLeft(120); // Reset timer
    setTimerActive(false);
    setFormulaInput("");
    setEvaluatedResult(null);
    setDifference(null);
    setVerificationTriggered(false);
  }, []);

  // Initialize on load and grade change
  useEffect(() => {
    generateNewGame(selectedGrade);
  }, [selectedGrade, generateNewGame]);

  // Timer interval control
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const nextVal = prev - 1;
          if (nextVal <= 10 && nextVal > 0) {
            playTickSound();
          } else if (nextVal === 0) {
            playAlarmSound();
            setTimerActive(false);
          }
          return nextVal;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerActive, timeLeft]);

  // Format Time Left: MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle equation submit
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaInput.trim()) return;

    playKeypressSound();

    // Remove any illegal chars (keep only formula keys)
    const cleanExpr = formulaInput.replace(/[^0-9+\-*/().\s]/g, "");
    const result = safeMathEval(cleanExpr);
    const diff = Math.abs(targetNumber - result);

    setEvaluatedResult(result);
    setDifference(diff);
    setVerificationTriggered(true);

    if (diff === 0) {
      playSuccessSound();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 }
      });
    } else {
      playAlarmSound();
    }
  };

  // Determine timer text color classes
  let timerColorClass = "text-slate-100";
  if (timeLeft <= 10) {
    timerColorClass = "text-rose-500 animate-pulse font-black";
  } else if (timeLeft <= 30) {
    timerColorClass = "text-amber-400 font-extrabold";
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Star gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {styleInjection()}

      {/* Header Bar */}
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
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-400 uppercase text-glow block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("The Target Number", "ល្បែងស្វែងរកលេខគោលដៅ")}
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

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-center items-center gap-8">
        
        {/* Top: The Target Number Display */}
        <section className="text-center flex flex-col items-center gap-2">
          <span className="text-slate-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
            {t("Target Number", "លេខគោលដៅ")}
          </span>
          <div
            className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-500 drop-shadow-[0_4px_20px_rgba(99,102,241,0.5)] select-all leading-none py-2 px-6 border-b border-indigo-500/20"
            style={{ fontSize: "max(3.8rem, 8vw)" }}
          >
            {targetNumber}
          </div>
        </section>

        {/* Middle: The Base Numbers Grid */}
        <section className="w-full flex flex-col items-center gap-3">
          <span className="text-slate-500 font-mono text-xs tracking-widest uppercase">
            {t("Base Numbers", "លេខមូលដ្ឋានទាំង ៦")}
          </span>
          <div className="flex flex-wrap justify-center gap-4 py-2 w-full max-w-5xl">
            {baseNumbers.map((num, idx) => (
              <div
                key={`base-card-${idx}`}
                className="chunky-card flex items-center justify-center bg-slate-950/80 border-4 border-slate-800 text-white rounded-3xl select-none relative hover:border-indigo-500/50 shadow-2xl hover:scale-105 duration-200"
                style={{
                  width: "max(5.5rem, 9.5vw)",
                  height: "max(5.5rem, 9.5vw)",
                }}
              >
                <div className="absolute top-2 left-3 font-mono text-[10px] text-slate-500 font-bold">
                  #{idx + 1}
                </div>
                <span className="font-mono font-black" style={{ fontSize: "max(2.2rem, 5vw)" }}>
                  {num}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Middle Bottom: The Countdown Timer */}
        <section className="flex flex-col items-center gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-[2rem] w-full max-w-xl shadow-2xl">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-slate-500 font-mono text-xs tracking-widest uppercase">
              {t("Relay Countdown", "នាឡិកាសាកល្បង")}
            </span>
            <div
              className={`font-mono leading-none tracking-wider ${timerColorClass}`}
              style={{ fontSize: "max(3rem, 7vw)" }}
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex gap-3 mt-1">
            <button
              onClick={() => setTimerActive(!timerActive)}
              disabled={timeLeft === 0}
              className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all text-sm sm:text-base ${
                timerActive
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-900/35"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40"
              }`}
            >
              {timerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{timerActive ? t("Pause Timer", "ផ្អាកម៉ោង") : t("Start Timer", "ចាប់ផ្តើមម៉ោង")}</span>
            </button>

            <button
              onClick={() => {
                playKeypressSound();
                setTimeLeft(120);
                setTimerActive(false);
              }}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-full font-bold flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-5" />
              <span>{t("Reset", "កំណត់ឡើងវិញ")}</span>
            </button>
          </div>
        </section>

        {/* Bottom: The Verify Equation Tool */}
        <section className="w-full max-w-4xl bg-slate-950/80 border border-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Tech design highlights */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-indigo-500/20 rounded-tl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-indigo-500/20 rounded-br-[2.5rem]" />

          <h2
            className={`font-black text-white text-center mb-5 ${isKh ? "font-khmer" : "tracking-wider uppercase"}`}
            style={{ fontSize: "max(1.3rem, 2.2vw)" }}
          >
            <Calculator className="inline-block w-6 h-6 mr-2 text-indigo-400" />
            {t("Verify Answer Tool", "ឧបករណ៍ផ្ទៀងផ្ទាត់សមីការ")}
          </h2>

          <form onSubmit={handleVerify} className="flex flex-col items-center gap-6">
            <div className="w-full relative">
              <input
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder={isKh ? "ឧទាហរណ៍៖ (50 * 8) + 25 - 3" : "e.g., (50 * 8) + 25 - 3"}
                className="w-full bg-slate-950 border-4 border-indigo-500/50 rounded-3xl text-center text-white focus:outline-none focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/10 placeholder-slate-700 font-bold transition-all shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]"
                style={{
                  height: "max(4.5rem, 10vh)",
                  fontSize: "max(1.6rem, 3.5vw)",
                  padding: "0 1.5rem"
                }}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!formulaInput.trim()}
                className={`px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed border border-indigo-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer flex items-center gap-2`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <span>{t("Verify", "ផ្ទៀងផ្ទាត់")}</span>
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </button>

              <button
                type="button"
                onClick={() => generateNewGame(selectedGrade)}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <span>{t("Generate New Game", "បង្កើតហ្គេមថ្មី")}</span>
              </button>
            </div>
          </form>

          {/* Results Block */}
          {verificationTriggered && evaluatedResult !== null && difference !== null && (
            <div className="mt-8 flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-slate-900 rounded-3xl animate-in zoom-in-95 duration-200">
              
              {difference === 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2.5 text-emerald-400 font-black animate-pulse" style={{ fontSize: "max(1.6rem, 3vw)" }}>
                    <CheckCircle2 className="w-8 h-8 animate-bounce text-yellow-300" />
                    <span>{t("EXACT MATCH! TARGET REACHED!", "ត្រូវចំឥតខ្ចោះ! សម្រេចគោលដៅ!")}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-sm block">
                    {t("Result equals target:", "លទ្ធផលស្មើនឹងលេខគោលដៅ៖")} <strong className="text-white text-lg font-mono">{evaluatedResult}</strong>
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-black" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                    <AlertCircle className="w-6 h-6 text-indigo-400" />
                    <span>{t("Evaluated Equation", "លទ្ធផលសមីការ")}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-sm sm:text-base border-t border-slate-800/80 pt-3 mt-1 w-full text-center">
                    <div>
                      {t("Formula Result:", "លទ្ធផលសមីការ:")} <span className="font-black text-white text-lg">{evaluatedResult}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-800 hidden sm:block" />
                    <div>
                      {t("Target Number:", "លេខគោលដៅ:")} <span className="font-bold text-slate-300">{targetNumber}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-800 hidden sm:block" />
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300">
                      {t("Difference:", "លំអៀង:")} <span className="font-black">{difference} {t("away", "ពិន្ទុ")}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Inline styling helpers
function styleInjection() {
  return (
    <style>{`
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 3px rgba(129,140,248,0.2); }
        50% { text-shadow: 0 0 15px rgba(129,140,248,0.6); }
      }
      .text-glow {
        animation: textGlow 2.5s infinite ease-in-out;
      }
      @keyframes flashingRed {
        0%, 100% { color: #f43f5e; text-shadow: 0 0 2px rgba(244,63,94,0.1); }
        50% { color: #ef4444; text-shadow: 0 0 18px rgba(239,68,68,0.8); }
      }
      .chunky-card {
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
    `}</style>
  );
}
