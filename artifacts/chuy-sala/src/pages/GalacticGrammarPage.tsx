import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Mic,
  MicOff,
  Rocket,
  Radio,
  Volume2,
  VolumeX,
  AlertTriangle,
  Sparkles,
  RefreshCcw,
  CheckCircle2,
  Radar,
  ShieldAlert,
  PlayCircle,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type Speaker = "ship" | "captain";

interface TerminalLine {
  id: string;
  speaker: Speaker;
  text: string;
  correction?: string;
  fluencyTip?: string;
  mistakeMade?: boolean;
  pending?: boolean;
}

interface EvaluateResponse {
  correction: string;
  fluency_tip: string;
  story_continuation: string;
  mistake_made: boolean;
}

type MicPermission = "unknown" | "prompt" | "granted" | "denied" | "unsupported";

// ── Web Speech API typing helpers (browser-vendored, not in lib.dom) ───────────
type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── Bilingual line helper — every UI string is pre-paired EN/KH ──────────────
function BL({ en, kh }: { en: string; kh: string }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span>{en}</span>
      <span className="font-khmer text-cyan-200/85 text-[0.85em]">({kh})</span>
    </span>
  );
}

export default function GalacticGrammarPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";

  const [micPermission, setMicPermission] = useState<MicPermission>("unknown");
  const [permissionError, setPermissionError] = useState<string>("");
  const [recognitionSupported, setRecognitionSupported] = useState<boolean>(true);
  const [synthesisSupported, setSynthesisSupported] = useState<boolean>(true);

  const [gameStarted, setGameStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [aiThinking, setAiThinking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef<string>("");
  const interimTranscriptRef = useRef<string>("");
  const submittedRef = useRef<boolean>(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const speakingTimeoutRef = useRef<number | null>(null);
  const turnIdCounterRef = useRef(0);

  // ── Capability detection on mount ──────────────────────────────────────────
  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setRecognitionSupported(false);
      setMicPermission("unsupported");
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSynthesisSupported(false);
    }
    // Best-effort permission probe — Permissions API isn't on Safari for "microphone"
    if (typeof navigator !== "undefined" && navigator.permissions) {
      const perms = navigator.permissions as Permissions & {
        query: (d: { name: PermissionName | "microphone" }) => Promise<PermissionStatus>;
      };
      perms
        .query({ name: "microphone" as PermissionName })
        .then((res) => {
          setMicPermission(res.state as MicPermission);
          res.onchange = () => setMicPermission(res.state as MicPermission);
        })
        .catch(() => {
          setMicPermission("prompt");
        });
    } else {
      setMicPermission("prompt");
    }
  }, []);

  // ── Auto-scroll terminal to bottom on every new line ───────────────────────
  useEffect(() => {
    const el = terminalRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [lines, interimTranscript, aiThinking]);

  // ── Speech synthesis (TTS) ─────────────────────────────────────────────────
  const speak = useCallback(
    (text: string) => {
      if (!ttsEnabled || !synthesisSupported || typeof window === "undefined") return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.95;
        u.pitch = 1.05;
        // Try to pick an English voice; fall back gracefully.
        const voices = window.speechSynthesis.getVoices();
        const en =
          voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|zira|google/i.test(v.name)) ??
          voices.find((v) => /^en/i.test(v.lang)) ??
          null;
        if (en) u.voice = en;
        window.speechSynthesis.speak(u);
      } catch {
        /* TTS failures are non-fatal — the text is already on screen. */
      }
    },
    [ttsEnabled, synthesisSupported],
  );

  // ── Request mic permission explicitly ──────────────────────────────────────
  const requestMicPermission = useCallback(async () => {
    setPermissionError("");
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicPermission("unsupported");
      setPermissionError(
        isKh
          ? "កម្មវិធីអ៊ីនធឺណិតនេះមិនទ្រទ្រង់ការចូលប្រើម៉ៃក្រូទេ។ សូមប្ដូរទៅ Chrome, Edge ឬ Safari។"
          : "This browser does not support microphone access. Please switch to Chrome, Edge, or Safari.",
      );
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop the tracks — we only needed the permission grant.
      stream.getTracks().forEach((t) => t.stop());
      setMicPermission("granted");
      return true;
    } catch {
      setMicPermission("denied");
      setPermissionError(
        isKh
          ? "ការចូលប្រើម៉ៃក្រូត្រូវបានបដិសេធ។ សូមអនុញ្ញាតវាក្នុងការកំណត់កម្មវិធីអ៊ីនធឺណិតរបស់អ្នក រួចផ្ទុកទំព័រឡើងវិញ។"
          : "Microphone access was denied. Please allow it in your browser settings, then reload the page.",
      );
      return false;
    }
  }, [isKh]);

  // ── Send transcript to backend for evaluation ──────────────────────────────
  const sendToBackend = useCallback(
    async (transcript: string, opts: { startNew?: boolean } = {}) => {
      setAiThinking(true);
      setErrorMsg("");
      try {
        const history = lines
          .filter((l) => !l.pending)
          .map((l) => ({
            role: l.speaker === "ship" ? "ship" : "captain",
            text: l.text,
          }));

        const res = await fetch(`${BASE_URL}/api/galactic-grammar/evaluate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript,
            history,
            startNew: opts.startNew === true,
          }),
        });
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const data = (await res.json()) as EvaluateResponse;

        const turnId = `ship-${++turnIdCounterRef.current}-${genId()}`;
        setLines((prev) => [
          ...prev,
          {
            id: turnId,
            speaker: "ship",
            text: data.story_continuation,
            correction: data.correction || undefined,
            fluencyTip: data.fluency_tip || undefined,
            mistakeMade: data.mistake_made,
          },
        ]);

        // Speak the story continuation only (corrections/tips stay on screen).
        speak(data.story_continuation);
      } catch (err) {
        console.error("Galactic Grammar evaluate failed:", err);
        setErrorMsg(
          isKh
            ? "ការតភ្ជាប់ទៅកាន់កុំព្យូទ័រកប៉ាល់ត្រូវបានរំខាន។ សូមព្យាយាមម្ដងទៀត។"
            : "Connection to the Ship's Computer was disrupted. Please try again.",
        );
      } finally {
        setAiThinking(false);
      }
    },
    [lines, speak, isKh],
  );

  // ── Start the adventure (first AI turn, no user transcript) ────────────────
  const startGame = useCallback(async () => {
    if (gameStarted) return;
    if (recognitionSupported && micPermission !== "granted") {
      const ok = await requestMicPermission();
      if (!ok) return;
    }
    setGameStarted(true);
    setLines([]);
    void sendToBackend("", { startNew: true });
  }, [gameStarted, recognitionSupported, micPermission, requestMicPermission, sendToBackend]);

  // ── Push-to-talk handlers ──────────────────────────────────────────────────
  const startListening = useCallback(() => {
    if (aiThinking || isListening) return;
    if (micPermission !== "granted") {
      void requestMicPermission();
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setRecognitionSupported(false);
      return;
    }

    // Stop any current TTS so the mic doesn't capture the AI's voice.
    if (synthesisSupported && typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }

    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
    submittedRef.current = false;
    setInterimTranscript("");

    rec.onresult = (event) => {
      let interim = "";
      let finalText = "";
      const results = event.results;
      for (let i = 0; i < results.length; i++) {
        const alt = results[i]?.[0];
        if (!alt) continue;
        const isFinal = (results[i] as unknown as { isFinal?: boolean }).isFinal === true;
        if (isFinal) {
          finalText += alt.transcript;
        } else {
          interim += alt.transcript;
        }
      }
      if (finalText) {
        finalTranscriptRef.current += finalText;
      }
      interimTranscriptRef.current = interim;
      setInterimTranscript(interim);
    };

    rec.onerror = (event) => {
      const code = event?.error ?? "unknown";
      if (code === "not-allowed" || code === "service-not-allowed") {
        setMicPermission("denied");
        setPermissionError(
          isKh
            ? "ការចូលប្រើម៉ៃក្រូត្រូវបានបដិសេធ។"
            : "Microphone access was denied.",
        );
      } else if (code !== "aborted" && code !== "no-speech") {
        setErrorMsg(
          isKh
            ? `កំហុសម៉ៃក្រូ៖ ${code}`
            : `Microphone error: ${code}`,
        );
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
      // Read from refs (not stale closure) and guard against double-fire.
      if (submittedRef.current) return;
      submittedRef.current = true;

      const finalText = (
        finalTranscriptRef.current +
        " " +
        interimTranscriptRef.current
      ).trim();
      finalTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      setInterimTranscript("");

      if (finalText) {
        const turnId = `captain-${++turnIdCounterRef.current}-${genId()}`;
        setLines((prev) => [
          ...prev,
          { id: turnId, speaker: "captain", text: finalText },
        ]);
        void sendToBackend(finalText);
      }
    };

    try {
      rec.start();
      recognitionRef.current = rec;
      setIsListening(true);
      setErrorMsg("");
    } catch {
      setIsListening(false);
    }
  }, [
    aiThinking,
    isListening,
    micPermission,
    requestMicPermission,
    isKh,
    sendToBackend,
    synthesisSupported,
  ]);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {
      /* noop */
    }
    recognitionRef.current = null;
  }, []);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        /* noop */
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (speakingTimeoutRef.current) {
        window.clearTimeout(speakingTimeoutRef.current);
      }
    };
  }, []);

  const resetGame = useCallback(() => {
    stopListening();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setLines([]);
    setErrorMsg("");
    setInterimTranscript("");
    setGameStarted(false);
  }, [stopListening]);

  const toggleTts = useCallback(() => {
    setTtsEnabled((v) => {
      const next = !v;
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const showPermissionGate =
    micPermission === "denied" ||
    micPermission === "unsupported" ||
    !recognitionSupported;

  const radarBlips = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        delay: i * 0.6,
        angle: (i * 60) % 360,
      })),
    [],
  );

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-clip"
      data-testid="galactic-grammar-page"
    >
      {/* ── Cosmic background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-black" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "60px 60px, 90px 90px",
            backgroundPosition: "0 0, 30px 45px",
          }}
        />
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="mb-6" data-testid="game-header">
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 max-w-full px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 text-[10px] font-extrabold uppercase tracking-[0.25em] mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>Mission Briefing</span>
            <span className="opacity-60" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">ការបង្ហាញបេសកកម្ម</span>
          </div>
          <h1
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            data-testid="game-title"
          >
            Galactic Grammar:{" "}
            <span className="text-cyan-300">Voice Adventure</span>
          </h1>
          <p
            className="mt-2 font-khmer text-xl sm:text-2xl text-cyan-100/90 leading-snug"
            data-testid="game-title-kh"
          >
            វេយ្យាករណ៍អវកាស៖{" "}
            <span className="text-cyan-300">ដំណើរផ្សងព្រេងតាមសំឡេង</span>
          </p>
          <p className="mt-4 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
            <BL
              en="You are the Captain of the starship Chuy Sala-1. Hold the mic, speak in English, and the Ship's Computer will reply, correct your grammar, and continue the adventure."
              kh="អ្នកគឺជាប្រធានកប៉ាល់អវកាស Chuy Sala-1។ ចុចសង្កត់ម៉ៃក្រូ និយាយជាភាសាអង់គ្លេស ហើយកុំព្យូទ័រកប៉ាល់នឹងឆ្លើយតប កែតម្រូវវេយ្យាករណ៍ និងបន្តដំណើរផ្សងព្រេង។"
            />
          </p>
        </header>

        {/* ── How to play (always visible, bilingual) ──────────────────────── */}
        <section
          className="mb-6 rounded-2xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur p-4 sm:p-5 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
          data-testid="how-to-play"
        >
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-cyan-300 mb-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <Radar className="w-4 h-4" />
            How to Play
            <span className="opacity-60" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">របៀបលេង</span>
          </h2>
          <ol className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              {
                en: "Press 'Begin Mission' and allow microphone access.",
                kh: "ចុច «ចាប់ផ្ដើមបេសកកម្ម» ហើយអនុញ្ញាតការចូលប្រើម៉ៃក្រូ។",
              },
              {
                en: "Hold the glowing mic and speak your reply in English.",
                kh: "ចុចសង្កត់ម៉ៃក្រូដែលភ្លឺ ហើយនិយាយចម្លើយរបស់អ្នកជាភាសាអង់គ្លេស។",
              },
              {
                en: "Release the mic — the Ship's Computer will correct you and continue the story.",
                kh: "លែងម៉ៃក្រូ — កុំព្យូទ័រកប៉ាល់នឹងកែតម្រូវ ហើយបន្តរឿងរ៉ាវ។",
              },
            ].map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-3"
                data-testid={`how-to-play-step-${i + 1}`}
              >
                <div className="text-cyan-300 font-extrabold text-xs mb-1">
                  STEP {i + 1} · <span className="font-khmer">ជំហានទី {i + 1}</span>
                </div>
                <div className="text-slate-200 leading-snug">{step.en}</div>
                <div className="text-cyan-100/80 font-khmer leading-snug mt-1">{step.kh}</div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Permission gate ──────────────────────────────────────────────── */}
        {showPermissionGate && (
          <div
            className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3"
            data-testid="permission-gate"
            role="alert"
          >
            <ShieldAlert className="w-6 h-6 text-amber-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-amber-100 text-sm uppercase tracking-wider">
                <BL
                  en="Microphone Access Required"
                  kh="ត្រូវការការចូលប្រើម៉ៃក្រូ"
                />
              </h3>
              <p className="text-amber-100/90 text-sm mt-1">
                {!recognitionSupported || micPermission === "unsupported" ? (
                  <BL
                    en="Your browser does not support voice recognition. Please use Chrome, Edge, or Safari on a desktop or Android device."
                    kh="កម្មវិធីអ៊ីនធឺណិតរបស់អ្នកមិនទ្រទ្រង់ការសម្គាល់សំឡេងទេ។ សូមប្រើ Chrome, Edge, ឬ Safari នៅលើកុំព្យូទ័រ ឬ Android។"
                  />
                ) : (
                  <BL
                    en="To play this voice game, the Ship's Computer needs to hear you. Please grant microphone permission below."
                    kh="ដើម្បីលេងហ្គេមសំឡេងនេះ កុំព្យូទ័រកប៉ាល់ត្រូវឮសំឡេងរបស់អ្នក។ សូមផ្ដល់សិទ្ធិម៉ៃក្រូខាងក្រោម។"
                  />
                )}
              </p>
              {permissionError && (
                <p className="text-amber-200 text-xs mt-2" data-testid="permission-error">
                  {permissionError}
                </p>
              )}
              {recognitionSupported && micPermission !== "unsupported" && (
                <button
                  type="button"
                  onClick={() => void requestMicPermission()}
                  className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-sm hover:bg-amber-300 transition shadow-lg shadow-amber-500/30"
                  data-testid="request-mic-button"
                >
                  <Mic className="w-4 h-4" />
                  Request Microphone Access
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer">ស្នើសុំសិទ្ធិម៉ៃក្រូ</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Captain's Console ────────────────────────────────────────────── */}
        <section
          className="rounded-3xl border-2 border-cyan-500/40 bg-slate-950/80 backdrop-blur shadow-[0_0_50px_rgba(34,211,238,0.18)] overflow-hidden"
          data-testid="captains-console"
        >
          {/* Console header bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-cyan-500/30 bg-gradient-to-r from-slate-900/80 via-indigo-900/40 to-slate-900/80">
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-300">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  aiThinking
                    ? "bg-amber-400 animate-pulse"
                    : isListening
                      ? "bg-rose-400 animate-pulse"
                      : "bg-emerald-400"
                }`}
                aria-hidden
              />
              <Radio className="w-3.5 h-3.5" />
              <span>
                {aiThinking
                  ? "Receiving"
                  : isListening
                    ? "Transmitting"
                    : "Standby"}
              </span>
              <span className="opacity-60" aria-hidden>·</span>
              <span className="font-khmer normal-case tracking-normal">
                {aiThinking
                  ? "កំពុងទទួលសញ្ញា"
                  : isListening
                    ? "កំពុងបញ្ជូន"
                    : "រង់ចាំ"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTts}
                disabled={!synthesisSupported}
                className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 px-2.5 py-1 rounded-lg border border-cyan-500/40 bg-slate-900/70 text-cyan-200 text-xs font-bold hover:bg-cyan-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="toggle-tts"
                aria-pressed={ttsEnabled}
                title={
                  ttsEnabled
                    ? "Mute AI voice / បិទសំឡេង AI"
                    : "Unmute AI voice / បើកសំឡេង AI"
                }
              >
                {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{ttsEnabled ? "Voice On" : "Voice Off"}</span>
                <span className="hidden sm:inline font-khmer text-cyan-200/80 text-[10px]">
                  {ttsEnabled ? "(សំឡេងបើក)" : "(សំឡេងបិទ)"}
                </span>
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 px-2.5 py-1 rounded-lg border border-slate-600/60 bg-slate-900/70 text-slate-200 text-xs font-bold hover:bg-slate-800 transition"
                data-testid="reset-game"
                title="Reset adventure / ចាប់ផ្ដើមឡើងវិញ"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
                <span className="hidden sm:inline font-khmer text-slate-300/80 text-[10px]">
                  (ចាប់ផ្ដើមឡើងវិញ)
                </span>
              </button>
            </div>
          </div>

          {/* Terminal */}
          <div
            ref={terminalRef}
            className="px-4 sm:px-6 py-5 h-[420px] sm:h-[460px] overflow-y-auto font-mono text-sm bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08),_transparent_60%)]"
            data-testid="terminal"
            aria-live="polite"
          >
            {!gameStarted && lines.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-4">
                {/* Decorative radar */}
                <div className="relative w-32 h-32" aria-hidden>
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />
                  <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
                  <div className="absolute inset-6 rounded-full border border-cyan-500/15" />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(34,211,238,0.45), transparent 35%)",
                      animation: "spin 3s linear infinite",
                    }}
                  />
                  {radarBlips.map((b) => (
                    <div
                      key={b.id}
                      className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]"
                      style={{
                        transform: `translate(${Math.cos((b.angle * Math.PI) / 180) * 40}px, ${
                          Math.sin((b.angle * Math.PI) / 180) * 40
                        }px)`,
                        animation: `pulse 2s ease-in-out ${b.delay}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <p className="font-display font-extrabold text-cyan-200 text-base sm:text-lg">
                  <BL en="Ready for launch?" kh="ត្រៀមសម្រាប់ការបាញ់បង្ហោះ?" />
                </p>
                <button
                  type="button"
                  onClick={() => void startGame()}
                  disabled={!recognitionSupported && micPermission === "unsupported"}
                  className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-950 font-extrabold text-sm sm:text-base hover:brightness-110 transition shadow-[0_0_30px_rgba(34,211,238,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="begin-mission"
                >
                  <PlayCircle className="w-5 h-5" />
                  Begin Mission
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer">ចាប់ផ្ដើមបេសកកម្ម</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {lines.map((line) => (
                  <TerminalEntry key={line.id} line={line} isKh={isKh} />
                ))}
                {isListening && (
                  <div
                    className="rounded-xl border border-rose-400/50 bg-rose-500/10 p-3"
                    data-testid="interim-transcript"
                  >
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-rose-300 mb-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
                      <Mic className="w-3.5 h-3.5" />
                      Captain (Live){" "}
                      <span className="font-khmer normal-case tracking-normal">
                        ប្រធានកប៉ាល់ (ផ្ទាល់)
                      </span>
                    </div>
                    <div className="text-rose-100/90 italic min-h-[1.2em]">
                      {interimTranscript || (isKh ? "កំពុងស្តាប់…" : "Listening…")}
                    </div>
                  </div>
                )}
                {aiThinking && (
                  <div
                    className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 p-3 inline-flex items-center gap-2"
                    data-testid="ai-thinking"
                  >
                    <span className="inline-flex gap-1" aria-hidden>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse [animation-delay:240ms]" />
                    </span>
                    <span className="text-cyan-200 text-xs font-bold uppercase tracking-wider">
                      <BL
                        en="Ship's Computer is processing…"
                        kh="កុំព្យូទ័រកប៉ាល់កំពុងដំណើរការ…"
                      />
                    </span>
                  </div>
                )}
                {errorMsg && (
                  <div
                    className="rounded-xl border border-rose-500/50 bg-rose-500/10 p-3 inline-flex items-start gap-2"
                    data-testid="error-message"
                    role="alert"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-300 mt-0.5" />
                    <span className="text-rose-100 text-sm">{errorMsg}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mic dock */}
          <div
            className="px-4 sm:px-6 py-6 border-t border-cyan-500/30 bg-gradient-to-b from-slate-950/40 to-indigo-950/40 flex flex-col items-center gap-3"
            data-testid="mic-dock"
          >
            <button
              type="button"
              disabled={!gameStarted || aiThinking || showPermissionGate}
              onPointerDown={(e) => {
                e.preventDefault();
                startListening();
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                stopListening();
              }}
              onPointerLeave={() => {
                if (isListening) stopListening();
              }}
              onPointerCancel={() => {
                if (isListening) stopListening();
              }}
              onKeyDown={(e) => {
                if ((e.key === " " || e.key === "Enter") && !isListening) {
                  e.preventDefault();
                  startListening();
                }
              }}
              onKeyUp={(e) => {
                if ((e.key === " " || e.key === "Enter") && isListening) {
                  e.preventDefault();
                  stopListening();
                }
              }}
              className={[
                "relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-200",
                "border-4 select-none touch-none",
                isListening
                  ? "bg-rose-500 border-rose-200 shadow-[0_0_60px_rgba(244,63,94,0.85)] scale-95"
                  : "bg-cyan-500 border-cyan-200 shadow-[0_0_45px_rgba(34,211,238,0.65)] hover:brightness-110 active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
              ].join(" ")}
              aria-label={
                isListening
                  ? "Release to send / លែងដើម្បីផ្ញើ"
                  : "Hold to speak / ចុចសង្កត់ដើម្បីនិយាយ"
              }
              data-testid="mic-button"
              data-listening={isListening ? "true" : "false"}
            >
              {/* Animated rings while listening */}
              {isListening && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-rose-300/70 animate-ping" aria-hidden />
                  <span
                    className="absolute -inset-3 rounded-full border border-rose-300/40 animate-ping"
                    style={{ animationDelay: "0.4s" }}
                    aria-hidden
                  />
                </>
              )}
              {isListening ? (
                <MicOff className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow" />
              ) : (
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow" />
              )}
            </button>

            <div className="text-center" data-testid="mic-label">
              <div className="font-display font-extrabold text-cyan-100 text-sm sm:text-base">
                {isListening ? "Release to Send" : "Hold to Speak"}
              </div>
              <div className="font-khmer text-cyan-200/85 text-xs sm:text-sm">
                {isListening ? "លែងដើម្បីផ្ញើ" : "ចុចសង្កត់ដើម្បីនិយាយ"}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 max-w-md text-center leading-snug">
              <BL
                en="Tip: speak clearly in English, then release the button. The longer you speak, the more the Ship's Computer can help you."
                kh="គន្លឹះ៖ និយាយឱ្យច្បាស់ជាភាសាអង់គ្លេស រួចលែងប៊ូតុង។ ការនិយាយវែងជាង នឹងជួយឱ្យកុំព្យូទ័រកប៉ាល់ជួយអ្នកបានច្រើនជាង។"
              />
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ── Single terminal entry (Captain or Ship) ──────────────────────────────────
function TerminalEntry({ line, isKh }: { line: TerminalLine; isKh: boolean }) {
  if (line.speaker === "captain") {
    return (
      <div
        className="rounded-xl border border-rose-400/40 bg-rose-500/5 p-3"
        data-testid="line-captain"
      >
        <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-rose-300 mb-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
          <Mic className="w-3.5 h-3.5" />
          Captain
          <span className="opacity-60" aria-hidden>·</span>
          <span className="font-khmer normal-case tracking-normal">ប្រធានកប៉ាល់</span>
        </div>
        <div className="text-rose-50 leading-relaxed">{line.text}</div>
      </div>
    );
  }
  return (
    <div
      className="rounded-xl border border-cyan-400/40 bg-cyan-500/5 p-3 space-y-2"
      data-testid="line-ship"
    >
      <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-300 inline-flex flex-wrap gap-x-2 gap-y-0.5">
        <Rocket className="w-3.5 h-3.5" />
        Ship&apos;s Computer
        <span className="opacity-60" aria-hidden>·</span>
        <span className="font-khmer normal-case tracking-normal">កុំព្យូទ័រកប៉ាល់</span>
      </div>
      <div className="text-cyan-50 leading-relaxed">{line.text}</div>
      {line.correction && (
        <div
          className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-2 text-amber-100 text-xs leading-relaxed"
          data-testid="line-correction"
        >
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-300 mb-1">
            <AlertTriangle className="w-3 h-3" />
            Correction
            <span className="opacity-60" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">ការកែតម្រូវ</span>
          </div>
          <div>{line.correction}</div>
        </div>
      )}
      {line.fluencyTip && (
        <div
          className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-2 text-emerald-100 text-xs leading-relaxed"
          data-testid="line-fluency-tip"
        >
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-300 mb-1">
            {line.mistakeMade ? <Sparkles className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            Fluency Tip
            <span className="opacity-60" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">គន្លឹះស្ទាត់ជំនាញ</span>
          </div>
          <div>{line.fluencyTip}</div>
        </div>
      )}
      {/* Reserved for future visual cues; isKh kept for prop parity */}
      <span className="hidden" aria-hidden>{isKh ? "kh" : "en"}</span>
    </div>
  );
}
