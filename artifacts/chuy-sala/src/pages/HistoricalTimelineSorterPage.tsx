import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
  Hourglass,
  Calendar,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";
import database from "@/data/historical-timeline-sets.json";

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playSound(type: "click" | "swap" | "success" | "fail" | "slide") {
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
    } else if (type === "swap") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (type === "slide") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === "success") {
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
    }
  } catch (e) {}
}

// Simple deterministic array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface EventItem {
  eventEn: string;
  eventKm: string;
  year: number;
  id: string; // unique ID to track item identity during sorting
}

export default function HistoricalTimelineSorterPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Tier filtering
  const [selectedGrade, setSelectedGrade] = useState<string>("Primary School");
  const [activeSets, setActiveSets] = useState<any[]>([]);
  const [activeSetIndex, setActiveSetIndex] = useState<number>(0);

  // Gameplay Board States
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [showDates, setShowDates] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    wrongIndices: number[];
  } | null>(null);

  const activeSet = activeSets[activeSetIndex];

  // Sync available sets when selected grade modifications occur
  useEffect(() => {
    const setsForGrade = database.sets.filter((s) => s.gradeLevel === selectedGrade);
    setActiveSets(setsForGrade);
    setActiveSetIndex(0);
    setSelectedCardIndex(null);
    setShowDates(false);
    setIsLocked(false);
    setValidationResult(null);
  }, [selectedGrade]);

  // Load and shuffle events when active set changes
  useEffect(() => {
    if (activeSet) {
      loadAndShuffleSet(activeSet);
    }
  }, [activeSet]);

  const loadAndShuffleSet = (set: any) => {
    setSelectedCardIndex(null);
    setShowDates(false);
    setIsLocked(false);
    setValidationResult(null);

    // Map events with unique IDs to prevent keys colliding on duplicate text
    const eventsWithIds: EventItem[] = set.events.map((ev: any, idx: number) => ({
      ...ev,
      id: `${set.setId}-ev-${idx}`
    }));

    // Perform shuffle and verify it's not already sorted
    let shuffled = shuffleArray(eventsWithIds);
    const isSortedInitially = shuffled.every(
      (ev, idx) => idx === 0 || ev.year >= shuffled[idx - 1].year
    );
    if (isSortedInitially && shuffled.length > 1) {
      shuffled = [shuffled[1], shuffled[0], ...shuffled.slice(2)];
    }

    setEventsList(shuffled);
  };

  // Card Click Handler
  const handleCardClick = (index: number) => {
    if (isLocked) return;
    playSound("click");

    if (selectedCardIndex === null) {
      // First card select
      setSelectedCardIndex(index);
    } else if (selectedCardIndex === index) {
      // Deselect if clicking the same card
      setSelectedCardIndex(null);
    } else {
      // Swap selected cards
      const updatedList = [...eventsList];
      const temp = updatedList[selectedCardIndex];
      updatedList[selectedCardIndex] = updatedList[index];
      updatedList[index] = temp;

      setEventsList(updatedList);
      setSelectedCardIndex(null);
      playSound("swap");
    }
  };

  // Timeline Order Validator
  const handleLockTimeline = () => {
    if (isLocked || eventsList.length === 0) return;
    setIsLocked(true);

    // Verify visual order against correct sorted years
    const correctSorted = [...eventsList].sort((a, b) => a.year - b.year);
    const wrongIndices: number[] = [];

    eventsList.forEach((item, index) => {
      if (item.id !== correctSorted[index].id) {
        wrongIndices.push(index);
      }
    });

    const isCorrect = wrongIndices.length === 0;

    if (isCorrect) {
      // SUCCESS STATE
      playSound("success");
      setValidationResult({ success: true, wrongIndices: [] });
      setShowDates(true);

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      // FAILURE STATE
      playSound("fail");
      setValidationResult({ success: false, wrongIndices });

      // After 1.5 seconds, auto-slide them into place and reveal years
      setTimeout(() => {
        playSound("slide");
        setEventsList(correctSorted);
        setShowDates(true);
        setValidationResult(null);
      }, 1500);
    }
  };

  const handleNextSet = () => {
    playSound("click");
    if (activeSets.length > 1) {
      setActiveSetIndex((prev) => (prev + 1) % activeSets.length);
    } else {
      // Only 1 set for this grade, just re-shuffle it
      loadAndShuffleSet(activeSet);
    }
  };

  const handleResetTimeline = () => {
    playSound("click");
    if (activeSet) {
      loadAndShuffleSet(activeSet);
    }
  };

  // Format historical year output
  const formatYear = (year: number) => {
    if (year < 0) {
      const absYear = Math.abs(year);
      return isKh ? `${absYear} មុន គ.ស` : `${absYear} BC`;
    }
    return isKh ? `ឆ្នាំ ${year}` : `${year}`;
  };

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
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-rose-400 uppercase text-glow block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("Historical Timeline Sorter", "ល្បែងតម្រៀបកាលប្បវត្តិ")}
            </span>
          </div>

          {/* Complexity Level Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
            <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block px-2 ${isKh ? "font-khmer" : ""}`}>
              {t("Complexity Level", "កម្រិតលំបាក")}
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { value: "Primary School", labelEn: "Primary School", labelKh: "បឋមសិក្សា" },
                { value: "High School", labelEn: "High School", labelKh: "វិទ្យាល័យ" },
                { value: "University", labelEn: "University", labelKh: "សាកលវិទ្យាល័យ" }
              ].map((lvl) => (
                <button
                  key={lvl.value}
                  onClick={() => {
                    playSound("click");
                    setSelectedGrade(lvl.value);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                    selectedGrade === lvl.value
                      ? "bg-orange-600 text-white shadow-md shadow-orange-900/40 scale-105 font-black"
                      : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {isKh ? lvl.labelKh : lvl.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Gameplay Screen */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col items-center justify-center gap-6">
        
        {/* Active Set Theme Title */}
        {activeSet && (
          <section className="text-center flex flex-col items-center gap-1.5 bg-slate-950/40 border border-slate-900 p-5 rounded-[2rem] max-w-2xl w-full shadow-xl">
            <div className="flex items-center gap-2">
              <Hourglass className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                {t(`THEME: ${activeSet.themeEn.toUpperCase()}`, `ប្រធានបទ៖ ${activeSet.themeKh}`)}
              </span>
            </div>
            <h3 className={`text-white font-black tracking-wide ${isKh ? "font-khmer text-xl" : "text-2xl"}`}>
              {isKh ? activeSet.themeKh : activeSet.themeEn}
            </h3>
          </section>
        )}

        {/* Board Play Area: Timeline Cards Stack */}
        {activeSet && eventsList.length > 0 && (
          <section
            className="relative w-full max-w-[800px] flex flex-col items-center justify-center"
            style={{
              height: `${eventsList.length * 104 - 16}px`,
            }}
          >
            {/* Horizontal or Vertical Chronology Axis Highlight */}
            <div className="absolute left-6 md:left-8 top-4 bottom-4 w-1.5 bg-slate-900 rounded-full z-0 flex flex-col justify-between py-6 px-0.5 border border-slate-800">
              <div className="text-[10px] text-slate-600 font-black tracking-widest uppercase rotate-90 translate-x-2">
                {t("EARLIEST", "ចាស់បំផុត")}
              </div>
              <div className="text-[10px] text-slate-600 font-black tracking-widest uppercase rotate-90 translate-x-2">
                {t("LATEST", "ថ្មីបំផុត")}
              </div>
            </div>

            {/* List container for absolutely positioned cards */}
            <div className="relative w-full h-full pl-14 md:pl-16">
              {eventsList.map((item, index) => {
                const isSelected = selectedCardIndex === index;
                const isWrong = validationResult && !validationResult.success && validationResult.wrongIndices.includes(index);
                const isCorrect = validationResult && validationResult.success;

                // Position calculation: each card is 88px tall with a 16px gap
                const topOffset = `${index * 104}px`;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(index)}
                    style={{
                      top: topOffset,
                      height: "88px",
                    }}
                    className={`absolute left-0 right-0 border-4 rounded-2xl flex items-center justify-between px-5 md:px-7 select-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl ${
                      isSelected
                        ? "bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02] z-30"
                        : isCorrect
                        ? "bg-emerald-950/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10"
                        : isWrong
                        ? "bg-rose-950/20 border-rose-500 animate-shake shadow-[0_0_15px_rgba(244,63,94,0.3)] z-10"
                        : "bg-slate-950/90 border-slate-900 hover:border-slate-800 hover:bg-slate-900 z-10 cursor-pointer"
                    }`}
                  >
                    {/* Visual Card Ordering Indicator */}
                    <div className="flex items-center gap-4 flex-1 pr-4">
                      <div
                        className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center border ${
                          isSelected
                            ? "bg-cyan-500 border-cyan-400 text-slate-950"
                            : isCorrect
                            ? "bg-emerald-500 border-emerald-400 text-slate-950"
                            : isWrong
                            ? "bg-rose-500 border-rose-400 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Event description */}
                      <p
                        className={`text-slate-200 font-bold leading-snug line-clamp-2 ${isKh ? "font-khmer" : ""}`}
                        style={{ fontSize: "max(0.95rem, 1.4vw)" }}
                      >
                        {isKh ? item.eventKm : item.eventEn}
                      </p>
                    </div>

                    {/* Date overlay revealed on success or lock settled */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-xs md:text-sm font-black transition-all duration-700 ${
                        showDates
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4 pointer-events-none"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-orange-400">
                        {formatYear(item.year)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Action Controls Section */}
        <section className="flex flex-wrap items-center justify-center gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-[2rem] max-w-3xl w-full shadow-2xl">
          <div className="flex flex-wrap justify-center gap-3">
            {/* Lock Timeline Button */}
            <button
              onClick={handleLockTimeline}
              disabled={isLocked || eventsList.length === 0}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed border border-orange-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-900/25"
            >
              <Lock className="w-5 h-5 text-yellow-300" />
              <span className={isKh ? "font-khmer text-sm" : "text-sm font-bold"}>
                {t("Lock Timeline", "ចាក់សោរបន្ទាត់ពេលវេលា")}
              </span>
            </button>

            {/* Reset / Shuffle current */}
            <button
              onClick={handleResetTimeline}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-full font-bold flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("Reset Set", "កំណត់ឡើងវិញ")}</span>
            </button>

            {/* Next Set */}
            {activeSets.length > 0 && (
              <button
                onClick={handleNextSet}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-full font-bold flex items-center justify-center gap-1.5 cursor-pointer text-sm"
              >
                <span>{t("Next Set", "វគ្គបន្ទាប់")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* Feedback Alert Overlay */}
        {validationResult && (
          <section className="w-full max-w-md bg-slate-950/80 border border-slate-900 p-5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in justify-center">
            {validationResult.success ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span className={`font-black text-sm uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                  {t("CHRONOLOGY CORRECT! CONFETTI!", "ការរៀបចំត្រឹមត្រូវ! ជោគជ័យ!")}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className={`font-black text-sm uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                  {t("OUT OF ORDER! SORTING CHRONOLOGICALLY...", "លំដាប់លំដោយមិនត្រឹមត្រូវ! កំពុងរៀបចំឡើងវិញ...")}
                </span>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

// Injected CSS Styling for custom animations
function styleInjection() {
  return (
    <style>{`
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 3px rgba(249,115,22,0.2); }
        50% { text-shadow: 0 0 15px rgba(249,115,22,0.6); }
      }
      .text-glow {
        animation: textGlow 2.5s infinite ease-in-out;
      }
      .animate-fade-in {
        animation: fadeIn 0.25s ease-out forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Card shake animation on error validation */
      .animate-shake {
        animation: shake 0.5s ease-in-out infinite alternate;
      }
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
        100% { transform: translateX(0); }
      }
    `}</style>
  );
}
