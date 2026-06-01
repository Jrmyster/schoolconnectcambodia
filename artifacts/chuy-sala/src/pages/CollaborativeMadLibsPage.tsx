import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import storiesData from "@/data/collaborative-mad-libs.json";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  Shuffle,
  ChevronRight,
  Eye,
  Languages
} from "lucide-react";
import confetti from "canvas-confetti";

interface StoryItem {
  title: string;
  titleKm: string;
  templateEn: string;
  templateKm: string;
  blanks: string[];
}

// ── Web Audio API Sound Effects Generator ────────────────────────────────────
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
    osc.frequency.setValueAtTime(500, t);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.start(t);
    osc.stop(t + 0.04);
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
    osc1.frequency.setValueAtTime(440, t); // A4
    osc2.frequency.setValueAtTime(554.37, t); // C#5

    osc1.frequency.setValueAtTime(554.37, t + 0.12); // C#5
    osc2.frequency.setValueAtTime(659.25, t + 0.12); // E5

    osc1.frequency.setValueAtTime(880, t + 0.24); // A5
    osc2.frequency.setValueAtTime(1108.73, t + 0.24); // C#6

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
    gain.gain.setValueAtTime(0.12, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.7);
    osc2.stop(t + 0.7);
  } catch (e) {}
}

function playResetSound() {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(600, t + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.25);
    osc.start(t);
    osc.stop(t + 0.25);
  } catch (e) {}
}

// Helper translations for standard parts of speech
const partOfSpeechTranslations: Record<string, string> = {
  "adjective": "គុណនាម",
  "adjective 1": "គុណនាមទី ១",
  "adjective 2": "គុណនាមទី ២",
  "noun": "នាម",
  "noun 1": "នាមទី ១",
  "noun 2": "នាមទី ២",
  "plural noun": "នាមពហុវចនៈ",
  "verb": "កិរិយាស័ព្ទ",
  "animal": "សត្វ",
  "emotion": "អារម្មណ៍",
  "name": "ឈ្មោះមនុស្ស",
  "planet": "ភព",
  "food": "អាហារ",
  "food 1": "អាហារទី ១",
  "food 2": "អាហារទី ២",
  "sound": "សំឡេង",
  "school name": "ឈ្មោះសាលារៀន",
  "color": "ពណ៌",
  "liquid": "វត្ថុរាវ",
  "adverb": "គុណកិរិយា"
};

const translateBlank = (blank: string, isKh: boolean): string => {
  if (!isKh) return blank;
  const key = blank.toLowerCase();
  return partOfSpeechTranslations[key] || blank;
};

const getAOrAn = (word: string): string => {
  const firstLetter = word.trim().toLowerCase()[0];
  if (["a", "e", "i", "o", "u"].includes(firstLetter)) {
    return "an";
  }
  return "a";
};

export default function CollaborativeMadLibsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Story selector & Game states
  const [currentStory, setCurrentStory] = useState<StoryItem>(() => {
    // Default fallback to first story
    return (storiesData as StoryItem[])[0];
  });
  
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [currentBlankIndex, setCurrentBlankIndex] = useState<number>(0);
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
  const [phase, setPhase] = useState<"COLLECT" | "REVEAL">("COLLECT");
  const [showKhmerBase, setShowKhmerBase] = useState<boolean>(isKh);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync default base story language when UI language changes
  useEffect(() => {
    setShowKhmerBase(isKh);
  }, [isKh]);

  // Autofocus the input field during Collection phase
  useEffect(() => {
    if (phase === "COLLECT" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, currentBlankIndex]);

  // Select a new random story
  const handleSelectNewStory = useCallback(() => {
    const pool = storiesData as StoryItem[];
    // Filter out current story to make sure we get a fresh one if possible
    const available = pool.filter((s) => s.title !== currentStory.title);
    const nextStory = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : pool[Math.floor(Math.random() * pool.length)];

    setCurrentStory(nextStory);
    setSubmittedWords([]);
    setCurrentBlankIndex(0);
    setCurrentInputValue("");
    setPhase("COLLECT");
    playResetSound();
  }, [currentStory]);

  // Handle word submission
  const handleWordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedVal = currentInputValue.trim();
    if (!trimmedVal) return;

    playKeypressSound();

    const isLastWord = currentBlankIndex === currentStory.blanks.length - 1;

    setSubmittedWords((prev) => [...prev, trimmedVal]);
    setCurrentInputValue("");

    if (isLastWord) {
      // Transition to Phase 2: Reveal
      setPhase("REVEAL");
      playSuccessSound();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.55 }
      });
    } else {
      // Go to next blank
      setCurrentBlankIndex((prev) => prev + 1);
    }
  };

  // Render the finalized story with highlighted user inputs
  const renderStoryParts = () => {
    const template = showKhmerBase ? currentStory.templateKm : currentStory.templateEn;
    // Regex splits by placeholders: e.g. [Adjective 1]
    const parts = template.split(/(\[[^\]]+\])/g);

    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const placeholderName = part.slice(1, -1);
        
        // Find matching blank index case-insensitively
        const blankIndex = currentStory.blanks.findIndex(
          (b) => b.toLowerCase() === placeholderName.toLowerCase()
        );

        if (blankIndex !== -1 && submittedWords[blankIndex]) {
          return (
            <span
              key={index}
              className="text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.4)] font-black uppercase underline decoration-2 decoration-[#ffff00] underline-offset-4 tracking-wider select-all duration-300"
            >
              {submittedWords[blankIndex]}
            </span>
          );
        }
        return part;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Star radial Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* CSS Glow animations */}
      <style>{`
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 2px rgba(129,140,248,0.2); }
          50% { text-shadow: 0 0 15px rgba(129,140,248,0.7); }
        }
        .glow-title {
          animation: textGlow 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* Sticky Header Nav Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/english"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold"}>
              {t("Back to English", "ត្រឡប់ទៅភាសាអង់គ្លេស")}
            </span>
          </Link>

          <div>
            <span
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-400 uppercase glow-title block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("Collaborative Mad Libs", "ល្បែងបំពេញពាក្យរួមគ្នា")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectNewStory}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-mono"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{t("Reset Game", "កំណត់ហ្គេមឡើងវិញ")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col justify-center items-center">
        
        {/* PHASE 1: WORD COLLECTION */}
        {phase === "COLLECT" && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 py-10">
            {/* Header info */}
            <div className="flex items-center gap-4 px-6 py-2 bg-slate-950/80 border border-slate-900 rounded-full text-xs sm:text-sm font-mono text-slate-400">
              <span className="font-bold text-indigo-400">
                {t("Story:", "រឿង៖")} {isKh && currentStory.titleKm ? currentStory.titleKm : currentStory.title}
              </span>
              <span className="h-4 w-px bg-slate-800" />
              <span>
                {t("Word", "ពាក្យទី")} <strong className="text-white">{currentBlankIndex + 1}</strong> {t("of", "នៃ")} <strong className="text-white">{currentStory.blanks.length}</strong>
              </span>
            </div>

            {/* Prompt block */}
            <div className="text-center mt-4">
              <h2
                className={`font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-wide uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-tight ${
                  isKh ? "font-khmer" : "font-display"
                }`}
                style={{ fontSize: "max(2.2rem, 5.5vw)" }}
              >
                {isKh ? (
                  <>សូមផ្តល់ពាក្យ <span className="text-indigo-400 font-black">{translateBlank(currentStory.blanks[currentBlankIndex], true)}</span> មួយ!</>
                ) : (
                  <>Give me {getAOrAn(currentStory.blanks[currentBlankIndex])} <span className="text-indigo-400 font-black">{currentStory.blanks[currentBlankIndex].toUpperCase()}</span>!</>
                )}
              </h2>
            </div>

            {/* Form input */}
            <form onSubmit={handleWordSubmit} className="w-full flex flex-col items-center gap-6 mt-4">
              <input
                ref={inputRef}
                type="text"
                value={currentInputValue}
                onChange={(e) => setCurrentInputValue(e.target.value)}
                placeholder={isKh ? "វាយបញ្ចូលពាក្យទីនេះ..." : "Type your word here..."}
                className="w-full max-w-2xl bg-slate-950/90 border-4 border-indigo-500/80 rounded-3xl text-center text-white focus:outline-none focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/10 shadow-[0_10px_30px_rgba(99,102,241,0.15)] placeholder-slate-700 font-bold transition-all"
                style={{
                  height: "max(5rem, 12vh)",
                  fontSize: "max(1.8rem, 3.8vw)",
                  padding: "0 1.5rem"
                }}
              />

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={!currentInputValue.trim()}
                className={`px-10 py-4 font-black rounded-full transition-all flex items-center gap-3 cursor-pointer ${
                  currentInputValue.trim()
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40 hover:scale-105 active:scale-95"
                    : "bg-slate-900 text-slate-600 border border-slate-950 cursor-not-allowed opacity-50"
                }`}
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <span>
                  {currentBlankIndex === currentStory.blanks.length - 1
                    ? t("Reveal Story", "បង្ហាញរឿង")
                    : t("Next Word", "ពាក្យបន្ទាប់")}
                </span>
                {currentBlankIndex === currentStory.blanks.length - 1 ? (
                  <Sparkles className="w-6 h-6 animate-pulse text-yellow-300" />
                ) : (
                  <ArrowRight className="w-6 h-6" />
                )}
              </button>
            </form>

            {/* Collected Words List (Teacher's reference) */}
            {submittedWords.length > 0 && (
              <div className="w-full max-w-2xl bg-slate-950/40 border border-slate-900/60 p-5 rounded-3xl mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <span className="block text-slate-500 font-mono text-xs uppercase tracking-widest mb-3">
                  {t("Collected Words So Far:", "ពាក្យដែលបានប្រមូល៖")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {submittedWords.map((word, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <span className="font-mono text-indigo-400 font-bold">{idx + 1}.</span>
                      <span className="font-mono text-slate-500">{currentStory.blanks[idx]}:</span>
                      <strong className="text-white uppercase font-black">{word}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PHASE 2: THE REVEAL */}
        {phase === "REVEAL" && (
          <div className="w-full max-w-6xl flex flex-col items-center gap-8 py-4 animate-in zoom-in-95 duration-500">
            {/* Story Card Container */}
            <div className="w-full bg-slate-950/80 border border-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Corner tech lines */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-indigo-500/40 rounded-tl-[2.5rem]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-indigo-500/40 rounded-br-[2.5rem]" />

              <div className="flex flex-wrap items-center justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
                <div>
                  <span className="block text-indigo-400 font-mono text-xs sm:text-sm uppercase tracking-widest mb-1">
                    {t("Collaborative Masterpiece", "ស្នាដៃរួមគ្នា")}
                  </span>
                  <h1
                    className={`font-black text-white ${isKh ? "font-khmer" : "font-display"}`}
                    style={{ fontSize: "max(1.8rem, 3.5vw)" }}
                  >
                    {showKhmerBase && currentStory.titleKm ? currentStory.titleKm : currentStory.title}
                  </h1>
                </div>

                {/* Show Khmer Base Toggle */}
                <button
                  onClick={() => setShowKhmerBase(!showKhmerBase)}
                  className="px-5 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300 font-bold transition-all flex items-center gap-2.5 cursor-pointer text-sm sm:text-base hover:scale-105 active:scale-95"
                >
                  <Languages className="w-5 h-5 text-indigo-400" />
                  <span>
                    {showKhmerBase ? t("Show English Base", "បង្ហាញជាភាសាអង់គ្លេស") : t("Show Khmer Base", "បង្ហាញជាភាសាខ្មែរ")}
                  </span>
                </button>
              </div>

              {/* Story text container */}
              <div className="px-2 md:px-4 py-2">
                <p
                  className={`text-slate-100 font-bold tracking-wide select-text leading-relaxed text-center ${
                    showKhmerBase ? "font-khmer leading-loose" : "font-sans"
                  }`}
                  style={{
                    fontSize: showKhmerBase ? "max(1.6rem, 3vw)" : "max(1.6rem, 2.8vw)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)"
                  }}
                >
                  {renderStoryParts()}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {/* Show/Hide Language Base helper */}
              <button
                onClick={() => setShowKhmerBase(!showKhmerBase)}
                className="px-8 py-3.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <Eye className="w-5 h-5" />
                <span>
                  {showKhmerBase ? t("Switch to English Story", "ប្តូរទៅរឿងភាសាអង់គ្លេស") : t("Switch to Khmer Story", "ប្តូរទៅរឿងភាសាខ្មែរ")}
                </span>
              </button>

              {/* New Story Button */}
              <button
                onClick={handleSelectNewStory}
                className="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer shadow-lg shadow-indigo-900/40"
                style={{ fontSize: "max(1.1rem, 1.8vw)" }}
              >
                <RotateCcw className="w-5 h-5 animate-spin-slow" />
                <span>{t("New Story", "រឿងថ្មី")}</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
