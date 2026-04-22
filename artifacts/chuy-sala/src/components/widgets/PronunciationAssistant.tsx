import { useEffect, useRef, useState } from "react";
import { Volume2, Square, Headphones, Globe2 } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ─────────────────────────────────────────────────────────────────────
 * The Pronunciation Assistant · ជំនួយការបញ្ចេញសំឡេង
 * Uses the browser's native Web Speech API to read English text aloud.
 * Forces an English voice (en-US / en-GB) so it never falls back to a
 * Khmer synthesizer when the page UI is in Khmer mode.
 * ───────────────────────────────────────────────────────────────────── */

type Speed = "normal" | "slow";
type Accent = "en-US" | "en-GB";

export function PronunciationAssistant() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [text, setText] = useState("");
  const [speed, setSpeed] = useState<Speed>("normal");
  const [accent, setAccent] = useState<Accent>("en-US");
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  /* Detect support + load voices (voices load asynchronously in Chrome). */
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
    };
  }, []);

  /* Pick the best matching English voice for the chosen accent. */
  const pickEnglishVoice = (lang: Accent): SpeechSynthesisVoice | undefined => {
    if (!voices.length) return undefined;
    const exact = voices.find((v) => v.lang === lang);
    if (exact) return exact;
    const lower = lang.toLowerCase();
    return (
      voices.find((v) => v.lang.toLowerCase() === lower) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en-")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"))
    );
  };

  const handleSpeak = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const trimmed = text.trim();
    if (!trimmed) return;

    // If already speaking, stop instead of queuing another utterance.
    if (synth.speaking || speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const u = new SpeechSynthesisUtterance(trimmed);
    u.lang = accent;                                 // force English locale
    const voice = pickEnglishVoice(accent);
    if (voice) u.voice = voice;                       // prefer a real English voice
    u.rate = speed === "slow" ? 0.55 : 0.95;
    u.pitch = 1;
    u.volume = 1;

    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);

    utteranceRef.current = u;
    synth.cancel(); // clear any stuck queue
    synth.speak(u);
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  /* ─── Render ──────────────────────────────────────────────────── */

  const tBtnSpeak = kh ? "ស្តាប់" : "Listen";
  const tBtnStop  = kh ? "បញ្ឈប់" : "Stop";

  return (
    <section
      data-testid="pronunciation-assistant"
      aria-labelledby="pronunciation-assistant-heading"
      className="relative overflow-hidden rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-[0_10px_40px_-15px_rgba(14,116,144,0.35)] p-6 sm:p-8"
    >
      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-100 border-2 border-sky-300 mb-3 shadow-sm">
            <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-sky-700" />
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ឧបករណ៍សិក្សា" : "Study Tool"}
          </div>
          <h2
            id="pronunciation-assistant-heading"
            className={`font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh ? "ជំនួយការបញ្ចេញសំឡេង" : "The Pronunciation Assistant"}
            {kh && (
              <span className="block sm:inline ml-0 sm:ml-2 text-base text-slate-500 font-sans font-normal">
                (Pronunciation Assistant)
              </span>
            )}
          </h2>
          <p className={`mt-2 max-w-xl mx-auto text-sm sm:text-base text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "វាយពាក្យ ឬប្រយោគភាសាអង់គ្លេស រួចចុច «ស្តាប់» ដើម្បីឮការបញ្ចេញសំឡេងដើមដោយសំឡេងជនជាតិដើម។"
              : "Type any English word or sentence, then tap Listen to hear it spoken in a clear native English voice."}
          </p>
        </div>

        {/* Input */}
        <label htmlFor="pronunciation-input" className="sr-only">
          {kh ? "បញ្ចូលអត្ថបទភាសាអង់គ្លេស" : "English text to pronounce"}
        </label>
        <textarea
          id="pronunciation-input"
          data-testid="input-pronunciation-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={kh
            ? "វាយបញ្ចូលពាក្យ ឬប្រយោគភាសាអង់គ្លេសនៅទីនេះ..."
            : "Type any English word or sentence here..."}
          rows={3}
          maxLength={500}
          className={`w-full text-center text-lg sm:text-2xl font-medium px-5 py-5 sm:py-7 rounded-2xl bg-white border-2 border-sky-200 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200/60 placeholder:text-slate-400 placeholder:text-base shadow-inner transition resize-none ${kh ? "placeholder:font-khmer" : ""}`}
          spellCheck
          autoComplete="off"
          autoCorrect="off"
          lang="en"
        />
        <div className="mt-1 text-right text-xs text-slate-400 pr-2">
          {text.length}/500
        </div>

        {/* Controls row */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          {/* Listen / Stop button */}
          <button
            type="button"
            onClick={handleSpeak}
            disabled={!supported || (!text.trim() && !speaking)}
            data-testid="btn-listen"
            data-speaking={speaking ? "true" : "false"}
            aria-pressed={speaking}
            aria-label={speaking ? tBtnStop : tBtnSpeak}
            className={`group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-9 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-lg transition active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none min-w-[180px] ${
              speaking
                ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/40 animate-pulse"
                : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/40"
            }`}
          >
            {speaking ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                <SoundWave />
                <span className={kh ? "font-khmer" : ""}>{tBtnStop}</span>
              </>
            ) : (
              <>
                <span className="text-2xl leading-none" aria-hidden>🔊</span>
                <Volume2 className="w-5 h-5 -ml-1 hidden sm:block" />
                <span className={kh ? "font-khmer" : ""}>{tBtnSpeak}</span>
              </>
            )}
          </button>

          {/* Speed toggle */}
          <div
            role="radiogroup"
            aria-label={kh ? "ល្បឿន" : "Speed"}
            className="inline-flex items-center bg-white border-2 border-sky-200 rounded-2xl p-1 shadow-sm"
            data-testid="speed-toggle"
          >
            <span className={`px-3 text-xs font-semibold text-slate-500 hidden sm:inline ${kh ? "font-khmer" : ""}`}>
              {kh ? "ល្បឿន" : "Speed"}
            </span>
            <SpeedOption
              active={speed === "normal"}
              onClick={() => setSpeed("normal")}
              labelEn="Normal"
              labelKh="ធម្មតា"
              kh={kh}
              testId="speed-normal"
            />
            <SpeedOption
              active={speed === "slow"}
              onClick={() => setSpeed("slow")}
              labelEn="Slow"
              labelKh="យឺត"
              kh={kh}
              testId="speed-slow"
            />
          </div>
        </div>

        {/* Accent + status row */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-sm">
          <div className="inline-flex items-center gap-2 text-slate-600">
            <Globe2 className="w-4 h-4 text-slate-500" />
            <span className={kh ? "font-khmer" : ""}>
              {kh ? "សំឡេង៖" : "Voice:"}
            </span>
            <div className="inline-flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm" data-testid="accent-toggle">
              <AccentOption
                active={accent === "en-US"}
                onClick={() => setAccent("en-US")}
                label="🇺🇸 US"
                testId="accent-us"
              />
              <AccentOption
                active={accent === "en-GB"}
                onClick={() => setAccent("en-GB")}
                label="🇬🇧 UK"
                testId="accent-uk"
              />
            </div>
          </div>

          {speaking && (
            <span
              data-testid="speaking-indicator"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold text-xs ${kh ? "font-khmer" : ""}`}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              {kh ? "កំពុងនិយាយ..." : "Speaking..."}
            </span>
          )}
        </div>

        {/* Tip / unsupported notice */}
        {!supported ? (
          <p className={`mt-5 text-center text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 ${kh ? "font-khmer" : ""}`} data-testid="unsupported-notice">
            {kh
              ? "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ Web Speech API ទេ។ សូមសាកល្បង Google Chrome ឬ Microsoft Edge។"
              : "Your browser does not support the Web Speech API. Please try Google Chrome or Microsoft Edge."}
          </p>
        ) : (
          <p className={`mt-5 text-center text-xs text-slate-500 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "គន្លឹះ៖ ប្រើមុខងារ «យឺត» ដើម្បីស្តាប់ការបញ្ចេញសំឡេងរបស់ព្យាង្គនីមួយៗឱ្យបានច្បាស់។"
              : "Tip: Use Slow speed to clearly hear every syllable when you're learning a new word."}
          </p>
        )}
      </div>
    </section>
  );
}

/* ─── Subcomponents ──────────────────────────────────────────────── */

function SpeedOption({
  active, onClick, labelEn, labelKh, kh, testId,
}: { active: boolean; onClick: () => void; labelEn: string; labelKh: string; kh: boolean; testId: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={active}
      data-testid={testId}
      data-active={active ? "true" : "false"}
      className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        active
          ? "bg-sky-600 text-white shadow"
          : "text-slate-600 hover:bg-sky-50"
      } ${kh ? "font-khmer" : ""}`}
    >
      {kh ? labelKh : labelEn}
    </button>
  );
}

function AccentOption({
  active, onClick, label, testId,
}: { active: boolean; onClick: () => void; label: string; testId: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      data-active={active ? "true" : "false"}
      aria-pressed={active}
      className={`px-3 py-1.5 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        active ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

/** Animated soundwave bars — shown only while speaking. */
function SoundWave() {
  return (
    <span className="inline-flex items-end gap-[2px] h-5" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] bg-white rounded-full animate-[soundwave_0.9s_ease-in-out_infinite]"
          style={{
            animationDelay: `${i * 0.12}s`,
            height: "100%",
          }}
        />
      ))}
      <style>{`
        @keyframes soundwave {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
      `}</style>
    </span>
  );
}
