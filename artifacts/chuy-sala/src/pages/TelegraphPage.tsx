import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Radio,
  Clock,
  Sparkles,
  Info,
  Play,
  Square,
  MessageSquare,
  Volume2,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

// Morse Code Dictionary
const MORSE_MAP: Record<string, string> = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",
  F: "..-.",  G: "--.",   H: "....",  I: "..",    J: ".---",
  K: "-.-",   L: ".-..",  M: "--",    N: "-.",    O: "---",
  P: ".--.",  Q: "--.-",  R: ".-.",   S: "...",   T: "-",
  U: "..-",   V: "...-",  W: ".--",   X: "-..-",  Y: "-.--",
  Z: "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
};

export default function TelegraphPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Inputs & Output Translation
  const [message, setMessage] = useState<string>("SOS");
  const [translated, setTranslated] = useState<string>("... --- ...");

  // Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBeeping, setIsBeeping] = useState<boolean>(false);

  // Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Translate in real-time as message changes
  useEffect(() => {
    const cleanText = message.toUpperCase();
    const words = cleanText.split(/\s+/);
    const morseWords = words.map((word) => {
      const chars = word.split("");
      return chars
        .map((char) => MORSE_MAP[char] ?? "")
        .filter((code) => code !== "")
        .join(" ");
    });
    setTranslated(morseWords.filter((w) => w !== "").join("   "));
  }, [message]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // allow only alphanumeric, space
    const val = e.target.value;
    setMessage(val.replace(/[^A-Za-z0-9\s]/g, ""));
    stopAudio();
  };

  const startAudioPlayback = () => {
    stopAudio();
    setIsPlaying(true);

    const DOT = 0.08; // 80ms dot duration
    const DASH = DOT * 3;
    const INTRA_LETTER = DOT;
    const INTER_LETTER = DOT * 3;
    const INTER_WORD = DOT * 7;

    const queue: { type: "beep" | "silence"; duration: number }[] = [];
    const cleanText = message.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
    const words = cleanText.split(/\s+/);

    words.forEach((word, wIdx) => {
      if (word.length === 0) return;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const morse = MORSE_MAP[char];
        if (!morse) continue;

        for (let j = 0; j < morse.length; j++) {
          const sym = morse[j];
          queue.push({
            type: "beep",
            duration: sym === "." ? DOT : DASH,
          });
          if (j < morse.length - 1) {
            queue.push({ type: "silence", duration: INTRA_LETTER });
          }
        }

        if (i < word.length - 1) {
          queue.push({ type: "silence", duration: INTER_LETTER });
        }
      }
      if (wIdx < words.length - 1) {
        queue.push({ type: "silence", duration: INTER_WORD });
      }
    });

    if (queue.length === 0) {
      setIsPlaying(false);
      return;
    }

    // Audio Context Setup
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    oscNodeRef.current = osc;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNodeRef.current = gainNode;

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(0);

    let queueIndex = 0;

    const runQueue = () => {
      if (queueIndex >= queue.length) {
        stopAudio();
        return;
      }

      const item = queue[queueIndex];
      if (item.type === "beep") {
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        setIsBeeping(true);
      } else {
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        setIsBeeping(false);
      }

      timeoutRef.current = setTimeout(() => {
        queueIndex++;
        runQueue();
      }, item.duration * 1000);
    };

    runQueue();
  };

  const stopAudio = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (oscNodeRef.current) {
      try {
        oscNodeRef.current.stop();
      } catch (e) {}
      oscNodeRef.current.disconnect();
      oscNodeRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
    setIsBeeping(false);
  };

  return (
    <div className="min-h-screen relative text-slate-100 bg-[#060914] overflow-x-hidden font-sans">
      <ScopedStyles />
      <TelegraphBg />

      {/* ── Header Navigation ── */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/physics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold text-sm"}>
              {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
            <span
              className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Morse Code & The Telegraph", "កូដម៉ុស និងតេឡេក្រាម")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>TELEGRAPH-STUDY-MODULE</span>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col gap-8">
        
        {/* 1. Hero / Historical Overview */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-4xl font-sans">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/35 text-amber-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase w-fit">
              <Clock className="w-3.5 h-3.5" />
              {t("Communication Revolution", "បដិវត្តន៍នៃការទំនាក់ទំនង")}
            </div>

            <h1
              className={`font-black text-white leading-tight ${
                isKh ? "font-khmer leading-relaxed" : ""
              }`}
              style={{ fontSize: "max(2.2rem, 4.5vw)" }}
            >
              {isKh ? (
                <>
                  កូដម៉ុស៖ <span className="text-amber-400 text-glow-amber">ឧបករណ៍តេឡេក្រាម</span>
                </>
              ) : (
                <>
                  Morse Code: <span className="text-amber-400 text-glow-amber">The Electric Telegraph</span>
                </>
              )}
            </h1>

            <p
              className={`text-slate-300 text-base sm:text-lg ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "Before the internet or telephone, the electric telegraph revolutionized global communication in the 1800s. It converted letters into electrical pulses—dots and dashes—representing International Morse Code. Messages that once took days or weeks of physical travel by horse or ship were transmitted across oceans and continents in mere seconds via cables.",
                "មុនពេលមានអ៊ីនធឺណិត ឬទូរសព្ទ ឧបករណ៍តេឡេក្រាមអគ្គិសនីបានធ្វើបដិវត្តន៍ទំនាក់ទំនងសកលក្នុងទសវត្សរ៍ឆ្នាំ ១៨០០។ វាបានបំប្លែងអក្សរទៅជាពុះពន្លឺអគ្គិសនី— dot (.) និង dash (-) — ដែលតំណាងឱ្យកូដម៉ុសអន្តរជាតិ។ សារដែលធ្លាប់ចំណាយពេលរាប់ថ្ងៃ ឬសប្តាហ៍តាមរយៈការធ្វើដំណើរដោយសេះ ឬកប៉ាល់ ត្រូវបានបញ្ជូនឆ្លងកាត់មហាសមុទ្រ និងទ្វីបនានាក្នុងរយៈពេលត្រឹមតែប៉ុន្មានវិនាទីប៉ុណ្ណោះតាមរយៈខ្សែអគ្គិសនី។"
              )}
            </p>
          </div>
        </section>

        {/* 2. Interactive Telegraph Simulator (The Visualizer) */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase block mb-1">
              {t("REAL-TIME TRANSMITTER LAB", "មន្ទីរពិសោធន៍បញ្ជូនសញ្ញាភ្លាមៗ")}
            </span>
            <h2 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.8rem, 3.2vw)" }}>
              {t("Telegraph Signal Simulator", "ឧបករណ៍ក្លែងធ្វើការបញ្ជូនតេឡេក្រាម")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input Panel (Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between bg-slate-900/30 border border-slate-900 rounded-2xl p-5">
              
              <div className="flex flex-col gap-5">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <h4 className={`text-slate-300 font-bold text-sm uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                    {t("Telegraph Office", "ការិយាល័យតេឡេក្រាម")}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{t("English Input", "បញ្ចូលអក្សរ")}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message-textarea" className={`text-xs font-mono uppercase text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("Type your message (English only)", "វាយបញ្ចូលសាររបស់អ្នក (អក្សរអង់គ្លេស)")}
                  </label>
                  <textarea
                    id="message-textarea"
                    value={message}
                    onChange={handleMessageChange}
                    maxLength={100}
                    rows={4}
                    placeholder="HELLO WORLD"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 font-bold text-base focus:outline-none focus:border-amber-400 resize-none transition-all placeholder:opacity-30"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{t("Only letters, numbers, and spaces.", "អាចវាយបញ្ចូលតែអក្សរ លេខ និងចន្លោះប៉ុណ្ណោះ។")}</span>
                    <span>{message.length} / 100</span>
                  </div>
                </div>
              </div>

              {/* Playback Trigger controls */}
              <div className="flex gap-3">
                {isPlaying ? (
                  <button
                    onClick={stopAudio}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-bold uppercase text-sm border-2 border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/25 active:scale-[0.98] cursor-pointer transition-all"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>{t("Stop Signals", "បញ្ឈប់សញ្ញា")}</span>
                  </button>
                ) : (
                  <button
                    onClick={startAudioPlayback}
                    disabled={translated.length === 0}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-bold uppercase text-sm border-2 border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 hover:border-amber-600 active:scale-[0.98] cursor-pointer transition-all"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>{t("Transmit Audio", "បញ្ជូនសំឡេង")}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Output Panel (Col Span 7 - Displays Morse code in massive font) */}
            <div className="lg:col-span-7 flex flex-col gap-6 bg-slate-900/30 border border-slate-900 rounded-2xl p-5 justify-between relative min-h-[380px]">
              
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center w-full">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 bg-slate-950 border border-slate-900 rounded px-2.5 py-0.5 font-bold">
                  {t("SIGNAL MONITOR", "អេក្រង់ម៉ូនីទ័រសញ្ញា")}
                </span>
                
                {/* Visual Indicator Light Flashes in sync with Beeps */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold ${isBeeping ? "text-amber-400" : "text-slate-600"}`}>
                    {isBeeping ? t("KEY DOWN (ON)", "បញ្ជូន (ON)") : t("KEY UP (OFF)", "រង់ចាំ (OFF)")}
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full border transition-all duration-75 ${
                    isBeeping 
                      ? "bg-amber-400 border-amber-300 shadow-[0_0_15px_#fbbf24]" 
                      : "bg-slate-950 border-slate-800"
                  }`} />
                </div>
              </div>

              {/* Massive Viewport-relative Morse Code Output */}
              <div className="flex-grow flex items-center justify-center py-6 w-full overflow-x-auto select-all max-w-full">
                {translated.length > 0 ? (
                  <p
                    className="font-mono font-black text-center text-amber-400 tracking-widest leading-normal whitespace-pre-wrap select-all text-glow-amber-chunky"
                    style={{ fontSize: "max(1.8rem, 4.2vw)" }}
                  >
                    {translated}
                  </p>
                ) : (
                  <p className="text-slate-600 text-sm font-mono uppercase">{t("[Empty Message]", "[គ្មានសារ]")}</p>
                )}
              </div>

              {/* Description timing note */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-xs text-slate-400">
                <div className="flex gap-2 items-start">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className={isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}>
                    {t(
                      "Audio duration timing rules: Dash (—) is 240ms (3x Dot). Letter spacing is 240ms. Word spacing is 560ms (7x Dot).",
                      "ច្បាប់កំណត់រយៈពេលសំឡេង៖ Dash (—) មានរយៈពេល ២៤០មីក្រូវិនាទី (៣ដងនៃ Dot)។ ចន្លោះអក្សរនីមួយៗគឺ ២៤០មីក្រូវិនាទី។ ចន្លោះពាក្យនីមួយៗគឺ ៥៦០មីក្រូវិនាទី (៧ដងនៃ Dot)។"
                    )}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. International Morse Code Cipher Reference Grid */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase block mb-1">
              {t("CIPHER SHEET REFERENCE", "តារាងកូដយោង")}
            </span>
            <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
              {t("International Morse Code Alphabet & Numbers", "តារាងអក្សរ និងលេខកូដម៉ុសអន្តរជាតិ")}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {Object.entries(MORSE_MAP).map(([char, code]) => (
              <div
                key={char}
                className="bg-slate-900/30 border border-slate-900 rounded-xl p-3 flex flex-col items-center justify-between gap-1 shadow hover:border-amber-500/20 transition-all duration-300"
              >
                <span className="text-sm font-extrabold text-slate-200">{char}</span>
                <span
                  className="font-mono font-black text-amber-400 tracking-wider text-glow-amber-light"
                  style={{ fontSize: "max(0.9rem, 1.3vw)" }}
                >
                  {code}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Navigation */}
      <footer className="max-w-[1600px] mx-auto px-6 py-12 text-center border-t border-slate-900 bg-slate-950/20 mt-12 z-10 relative">
        <Link
          href="/physics"
          className="inline-flex items-center gap-1.5 text-amber-400/80 hover:text-amber-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className={isKh ? "font-khmer text-xs" : "text-xs font-semibold"}>
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </span>
        </Link>
      </footer>
    </div>
  );
}

// ── Scoped Styles ──
function ScopedStyles() {
  return (
    <style>{`
      .text-glow-amber {
        color: #fbbf24;
        text-shadow: 0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.2);
      }
      .text-glow-amber-chunky {
        color: #fbbf24;
        text-shadow: 0 0 30px rgba(251, 191, 36, 0.75), 0 0 60px rgba(251, 191, 36, 0.35);
      }
      .text-glow-amber-light {
        color: #f59e0b;
        text-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
      }
    `}</style>
  );
}

// ── Background Gradients & Grid ──
function TelegraphBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #0f101a 0%, #030408 60%, #000000 100%)",
        }}
      />
      <div className="absolute top-24 -left-20 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="absolute top-[40%] -right-20 w-[450px] h-[450px] rounded-full bg-orange-500/5 blur-[140px]" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-amber-600/5 blur-[100px]" />
      
      {/* Telegraph wire mesh grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
