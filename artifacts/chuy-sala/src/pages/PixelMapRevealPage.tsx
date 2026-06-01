import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Eye,
  ChevronRight,
  Map,
  Compass,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";
import roundsData from "@/data/pixel-map-reveal.json";

function getRandomSubset<T>(arr: T[], size: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playSound(type: "click" | "tick" | "fanfare" | "reveal") {
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
    } else if (type === "tick") {
      // Small projector mechanical tick sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, t);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.start(t);
      osc.stop(t + 0.03);
    } else if (type === "reveal") {
      // Modern slide/swoosh reveal sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.start(t);
      osc.stop(t + 0.45);
    } else if (type === "fanfare") {
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

export default function PixelMapRevealPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Round States
  const [activeRounds, setActiveRounds] = useState<typeof roundsData>(() =>
    getRandomSubset(roundsData, 5)
  );
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [revealStage, setRevealStage] = useState<number>(0); // 0 to 10
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentRound = activeRounds[currentRoundIndex];

  // Automated Reveal Loop (Ticks every 5 seconds)
  useEffect(() => {
    if (isPlaying && revealStage < 10) {
      timerRef.current = setInterval(() => {
        setRevealStage((prev) => {
          const next = prev + 1;
          playSound("tick");
          if (next >= 10) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          return next;
        });
      }, 5000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, revealStage]);

  // Handle Play/Pause
  const togglePlay = () => {
    playSound("click");
    setIsPlaying(!isPlaying);
  };

  // Reset current round state
  const resetRound = () => {
    playSound("click");
    setIsPlaying(false);
    setRevealStage(0);
    setShowAnswer(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Progress to next round
  const nextRound = () => {
    playSound("click");
    setIsPlaying(false);
    setRevealStage(0);
    setShowAnswer(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (currentRoundIndex >= activeRounds.length - 1) {
      // Finish last round, generate a new random subset and start a new game
      setActiveRounds(getRandomSubset(roundsData, 5));
      setCurrentRoundIndex(0);
    } else {
      setCurrentRoundIndex((prev) => prev + 1);
    }
  };

  // Instant show answer reveal
  const handleRevealAnswer = () => {
    playSound("fanfare");
    setIsPlaying(false);
    setRevealStage(10);
    setShowAnswer(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Throw small decorative victory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 }
    });
  };

  // Calculate dynamic stylings
  let imageStyle: React.CSSProperties = {};
  if (currentRound) {
    if (showAnswer || revealStage >= 10) {
      // Clear filters on reveal
      imageStyle = {
        filter: "blur(0px)",
        transform: "scale(1)",
        transition: "all 0.5s ease"
      };
    } else {
      if (currentRound.revealMethod === "pixelate") {
        // Dynamic blur transition: stage 0 is 35px, stage 10 is 0px
        const currentBlur = 35 - revealStage * 3.5;
        imageStyle = {
          filter: `blur(${currentBlur}px)`,
          transition: "filter 0.8s ease"
        };
      } else {
        // Dynamic zoom transition: stage 0 is scale(15), stage 10 is scale(1)
        const currentScale = 15 - revealStage * 1.4;
        imageStyle = {
          transform: `scale(${currentScale})`,
          transformOrigin: currentRound.transformOrigin || "50% 50%",
          transition: "transform 0.8s ease"
        };
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Starry space bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {styleInjection()}

      {/* Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/science"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold"}>
              {t("Back to Scientific Literacy", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
            </span>
          </Link>

          <div>
            <span
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 uppercase text-glow block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("Pixel Map Reveal", "ល្បែងស្វែងរកទីតាំងសម្ងាត់")}
            </span>
          </div>

          {/* Stats Round indicator */}
          <div className="bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2.5">
            <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block ${isKh ? "font-khmer" : ""}`}>
              {t("Round", "វគ្គទី")}
            </span>
            <span className="font-mono font-black text-white text-sm">
              {currentRoundIndex + 1} / {activeRounds.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col items-center justify-center gap-6">
        
        {/* Stage Progress Bar (Horizontal visual ticks) */}
        {currentRound && (
          <section className="w-full max-w-3xl flex flex-col gap-1.5 bg-slate-950/40 border border-slate-900 p-4 rounded-2xl">
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
              <span>{t(`Reveal Mode: ${currentRound.revealMethod.toUpperCase()}`, `របៀបបង្ហាញ៖ ${currentRound.revealMethod === "zoom" ? "ពង្រីក" : "ព្រាល"}`)}</span>
              <span>{t(`Reveal Stage: ${revealStage}/10`, `កម្រិតបង្ហាញ៖ ${revealStage}/១០`)}</span>
            </div>
            
            {/* 10 ticks progress bar */}
            <div className="flex gap-1 h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={`progress-tick-${idx}`}
                  className={`h-full flex-grow rounded-full transition-all duration-300 ${
                    idx < revealStage
                      ? revealStage >= 8
                        ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                        : revealStage >= 5
                        ? "bg-amber-500"
                        : "bg-indigo-500"
                      : "bg-slate-900"
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Center: Massive Image reveal container */}
        {currentRound && (
          <section className="relative rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex items-center justify-center"
            style={{
              width: "min(90vw, 800px)",
              height: "min(50vh, 450px)",
            }}
          >
            {/* The actual image */}
            <img
              src={currentRound.imageUrl}
              alt="Reveal landmark"
              style={imageStyle}
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Glowing Corner visual effects */}
            <div className="absolute inset-0 border-2 border-indigo-500/10 pointer-events-none rounded-[2.3rem]" />
            
            {/* Category / Type indicator tag */}
            <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-[10px] text-indigo-400 font-bold uppercase tracking-wider shadow-lg">
              {t(currentRound.type, currentRound.type === "World Landmark" ? "តំបន់ល្បីៗលើពិភពលោក" : "ទីតាំងប្រវត្តិសាស្ត្រខ្មែរ")}
            </div>

            {/* Time Ticking Flash Overlay (during last stage or playing) */}
            {isPlaying && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-widest">{t("Auto-Revealing", "កំពុងដំណើរការ")}</span>
              </div>
            )}
          </section>
        )}

        {/* Classroom reveal controls */}
        <section className="flex flex-wrap items-center justify-center gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-[2rem] max-w-3xl w-full shadow-2xl">
          <div className="flex flex-wrap justify-center gap-3">
            {/* Start / Pause */}
            <button
              onClick={togglePlay}
              disabled={revealStage >= 10}
              className={`px-8 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-900/35"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed"
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? t("Pause Reveal", "ផ្អាកការបង្ហាញ") : t("Start Round", "ចាប់ផ្តើមវគ្គ")}</span>
            </button>

            {/* Show Answer */}
            <button
              onClick={handleRevealAnswer}
              disabled={showAnswer}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed border border-emerald-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/25"
            >
              <Eye className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span>{t("Show Answer", "បង្ហាញចម្លើយ")}</span>
            </button>

            {/* Reset */}
            <button
              onClick={resetRound}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-full font-bold flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("Reset", "កំណត់ឡើងវិញ")}</span>
            </button>

            {/* Next Round */}
            <button
              onClick={nextRound}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-full font-bold flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              {currentRoundIndex >= activeRounds.length - 1 ? (
                <>
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>{t("New Game", "ល្បែងថ្មី")}</span>
                </>
              ) : (
                <>
                  <span>{t("Next Round", "វគ្គបន្ទាប់")}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </section>

        {/* Bottom Area: Large Projected Bilingual Answer */}
        {showAnswer && currentRound && (
          <section className="w-full max-w-3xl bg-slate-950/80 border border-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center animate-fade-in">
            {/* Tech design highlights */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-indigo-500/20 rounded-tl-[2.5rem]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-indigo-500/20 rounded-br-[2.5rem]" />
            
            <div className="flex items-center gap-2 mb-2 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 font-black text-xs sm:text-sm tracking-widest uppercase">
                {t("LOCATION REVEALED", "ទីតាំងសម្ងាត់ត្រូវបានលាតត្រដាង")}
              </span>
            </div>

            <div
              className="font-black text-white font-khmer block leading-normal pt-1.5 pb-2.5 border-b border-slate-900 w-full"
              style={{ fontSize: "max(1.8rem, 3.8vw)" }}
            >
              {currentRound.answerKh}
            </div>

            <div
              className="font-black text-indigo-400 block leading-normal mt-3"
              style={{ fontSize: "max(1.4rem, 2.8vw)" }}
            >
              {currentRound.answerEn}
            </div>
          </section>
        )}

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
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}
