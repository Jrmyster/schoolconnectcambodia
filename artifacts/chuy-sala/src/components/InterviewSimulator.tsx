import { useState, useRef, useEffect, useCallback } from "react";
import {
  Briefcase,
  GraduationCap,
  Award,
  Play,
  Square,
  Send,
  RotateCcw,
  ChevronRight,
  User,
  Bot,
  FileText,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type InterviewType = "university_entrance" | "local_job" | "scholarship";
type Stage = "idle" | "selecting" | "interviewing" | "ending" | "ended";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ROLES: {
  id: InterviewType;
  icon: React.ReactNode;
  labelEn: string;
  labelKh: string;
  descEn: string;
  descKh: string;
  accentColor: string;
}[] = [
  {
    id: "university_entrance",
    icon: <GraduationCap size={22} />,
    labelEn: "University Entrance",
    labelKh: "ការចូលរៀនសាកលវិទ្យាល័យ",
    descEn: "Practice for your faculty / programme interview",
    descKh: "ហ្វឹកហាត់សម្ភាសន៍ចូលរៀនសាកលវិទ្យាល័យ",
    accentColor: "#2563EB",
  },
  {
    id: "local_job",
    icon: <Briefcase size={22} />,
    labelEn: "Job at a Local Business",
    labelKh: "ការងារនៅអាជីវកម្មមូលដ្ឋាន",
    descEn: "Simulate a real hiring interview in Cambodia",
    descKh: "ក្លែងធ្វើការសម្ភាសន៍ការងារជាក់ស្ដែងនៅកម្ពុជា",
    accentColor: "#0891B2",
  },
  {
    id: "scholarship",
    icon: <Award size={22} />,
    labelEn: "Scholarship Interview",
    labelKh: "សម្ភាសន៍អាហារូបករណ៍",
    descEn: "Prepare for a prestigious scholarship panel",
    descKh: "ត្រៀមខ្លួនសម្រាប់គណៈកម្មការអាហារូបករណ៍ល្បីឈ្មោះ",
    accentColor: "#7C3AED",
  },
];

const OFFICE_BLUE = {
  bg: "#0F1E3C",
  panel: "#162447",
  border: "#1E3A5F",
  accent: "#2563EB",
  accentLight: "#3B82F6",
  surface: "#1A2D4F",
  text: "#E2E8F0",
  muted: "#94A3B8",
  userBubble: "#1D4ED8",
  aiBubble: "#1A2D4F",
  aiBubbleBorder: "#2563EB",
};

export function InterviewSimulator() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [stage, setStage] = useState<Stage>("idle");
  const [selectedRole, setSelectedRole] = useState<InterviewType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedInputRef = useRef<string>("");

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, streamingContent]);

  useEffect(() => {
    if (stage === "interviewing" && inputRef.current) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    }
  }, [stage]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const toggleSpeech = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognitionCtor =
      (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognitionRef.current = recognition;
    recognition.lang = language === "kh" ? "km-KH" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    savedInputRef.current = input;

    const resetSilenceTimer = () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }, 2000);
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetSilenceTimer();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      resetSilenceTimer();
      let interim = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      const base = savedInputRef.current;
      const combined = (base + finalTranscript + interim).trimStart();
      if (finalTranscript) {
        savedInputRef.current = (base + finalTranscript).trimStart();
      }
      setInput(combined);
    };

    recognition.onerror = () => {
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    recognition.start();
  }, [isListening, language, input, stopListening]);

  const callGemini = useCallback(
    async (
      currentMessages: Message[],
      role: InterviewType,
      generateSummary = false
    ) => {
      setStreaming(true);
      setStreamingContent("");

      const res = await fetch(`${BASE_URL}/api/gemini/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          interviewType: role,
          language: language,
          generateSummary,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      if (!reader) {
        setStreaming(false);
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.content) {
              full += parsed.content;
              setStreamingContent(full);
            }
            if (parsed.done) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: full },
              ]);
              setStreamingContent("");
              setStreaming(false);
              if (!generateSummary) {
                setQuestionCount((n) => n + 1);
                setTimeout(
                  () => inputRef.current?.focus({ preventScroll: true }),
                  50
                );
              }
            }
            if (parsed.error) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: parsed.error },
              ]);
              setStreamingContent("");
              setStreaming(false);
              setTimeout(
                () => inputRef.current?.focus({ preventScroll: true }),
                50
              );
            }
          } catch {
            // skip malformed
          }
        }
      }
    },
    [language]
  );

  const startInterview = async (role: InterviewType) => {
    setSelectedRole(role);
    setMessages([]);
    setQuestionCount(0);
    setStage("interviewing");
    await callGemini([], role, false);
  };

  const sendAnswer = async () => {
    if (!input.trim() || streaming || !selectedRole) return;
    if (isListening) stopListening();
    const answer = input.trim();
    setInput("");
    savedInputRef.current = "";
    const updated: Message[] = [...messages, { role: "user", content: answer }];
    setMessages(updated);
    await callGemini(updated, selectedRole, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  const endInterview = async () => {
    if (!selectedRole || streaming) return;
    setStage("ending");
    await callGemini(messages, selectedRole, true);
    setStage("ended");
  };

  const restart = () => {
    if (isListening) stopListening();
    savedInputRef.current = "";
    setInput("");
    setStage("idle");
    setSelectedRole(null);
    setMessages([]);
    setStreamingContent("");
    setQuestionCount(0);
  };

  const selectedRoleObj = ROLES.find((r) => r.id === selectedRole);

  return (
    <section
      ref={containerRef}
      style={{
        background: isFullscreen ? "#0f172a" : OFFICE_BLUE.bg,
        borderRadius: isFullscreen ? "0" : "20px",
        overflow: isFullscreen ? "auto" : "hidden",
        border: isFullscreen ? "none" : `1px solid ${OFFICE_BLUE.border}`,
        boxShadow: isFullscreen ? "none" : "0 24px 64px rgba(0,0,0,0.4)",
        ...(isFullscreen && {
          display: "flex",
          flexDirection: "column" as const,
          height: "100vh",
          width: "100vw",
        }),
      }}
      className="mt-8"
    >
      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${OFFICE_BLUE.panel} 0%, #1a3560 100%)`,
          borderBottom: `1px solid ${OFFICE_BLUE.border}`,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Briefcase size={22} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontWeight: 800,
              fontSize: "17px",
              color: OFFICE_BLUE.text,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {kh
              ? "Interview Coach: Chrouy Sala"
              : "Interview Coach: Chrouy Sala"}
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: OFFICE_BLUE.muted,
              margin: "3px 0 0",
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
          >
            {kh
              ? "កម្មវិធីហ្វឹកហាត់សម្ភាសន៍ការងារ"
              : "AI-powered mock interview practice for Cambodian students"}
          </p>
        </div>

        {/* Language badge */}
        <div
          style={{
            padding: "4px 10px",
            borderRadius: "20px",
            background: "rgba(37,99,235,0.2)",
            border: "1px solid rgba(37,99,235,0.4)",
            fontSize: "11px",
            fontWeight: 700,
            color: "#93C5FD",
            flexShrink: 0,
          }}
        >
          {kh ? "ភាសាខ្មែរ" : "English Practice"}
        </div>

        {(stage === "interviewing" || stage === "ending" || stage === "ended") && (
          <button
            onClick={restart}
            title={kh ? "ចាប់ផ្ដើមមួយទៀត" : "Start over"}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "7px",
              cursor: "pointer",
              color: OFFICE_BLUE.muted,
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <RotateCcw size={15} />
          </button>
        )}

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          title={
            isFullscreen
              ? kh ? "ចាកចេញពីរបៀបដែលផ្ដោតអារម្មណ៍" : "Exit Immersive Mode"
              : kh ? "ចូលទៅក្នុងរបៀបដែលផ្ដោតអារម្មណ៍" : "Enter Immersive Mode"
          }
          style={{
            background: isFullscreen
              ? "rgba(37,99,235,0.2)"
              : "rgba(255,255,255,0.08)",
            border: isFullscreen
              ? "1px solid rgba(37,99,235,0.5)"
              : "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            padding: "7px",
            cursor: "pointer",
            color: isFullscreen ? "#93C5FD" : OFFICE_BLUE.muted,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            transition: "background 0.15s, border-color 0.15s, color 0.15s",
          }}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* ── IDLE STAGE ── */}
      {stage === "idle" && (
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Play size={28} color="white" style={{ marginLeft: 3 }} />
          </div>
          <h4
            style={{
              color: OFFICE_BLUE.text,
              fontWeight: 700,
              fontSize: "18px",
              margin: "0 0 10px",
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
          >
            {kh
              ? "ត្រៀមខ្លួនសម្រាប់ការសម្ភាសន៍?"
              : "Ready to practice your interview?"}
          </h4>
          <p
            style={{
              color: OFFICE_BLUE.muted,
              fontSize: "14px",
              maxWidth: 380,
              margin: "0 auto 28px",
              lineHeight: 1.6,
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
          >
            {kh
              ? "AI ដើរតួជាអ្នកសម្ភាសន៍ជំនាញ — សួរសំណួរបន្ទាប់ក្រោយ​ ហើយ​ផ្ដល់​មតិ​លើ​ភាសាកាយ​ សម្លេង​ និងខ្លឹមសាររបស់​អ្នក​។"
              : "The AI acts as a professional interviewer — asking questions one at a time and giving you feedback on your body language, tone, and content."}
          </p>
          <button
            onClick={() => setStage("selecting")}
            style={{
              background: `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(37,99,235,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 24px rgba(37,99,235,0.4)";
            }}
          >
            <Play size={18} />
            {kh ? "ចាប់ផ្ដើមការសម្ភាសន៍ក្លែងធ្វើ" : "Start Mock Interview"}
          </button>
        </div>
      )}

      {/* ── ROLE SELECTION STAGE ── */}
      {stage === "selecting" && (
        <div style={{ padding: "28px 24px" }}>
          <h4
            style={{
              color: OFFICE_BLUE.text,
              fontWeight: 700,
              fontSize: "15px",
              margin: "0 0 6px",
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
          >
            {kh ? "ជ្រើសរើសសំណើសម្ភាសន៍" : "Choose your interview path"}
          </h4>
          <p
            style={{
              color: OFFICE_BLUE.muted,
              fontSize: "13px",
              margin: "0 0 20px",
              fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
            }}
          >
            {kh
              ? "ការសម្ភាសន៍នឹងធ្វើឡើង​ ជា" +
                " " +
                "ភាសាខ្មែរ"
              : "The interview will be conducted in English to help you practice professional communication."}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => startInterview(role.id)}
                style={{
                  background: OFFICE_BLUE.surface,
                  border: `1px solid ${OFFICE_BLUE.border}`,
                  borderRadius: "14px",
                  padding: "16px 18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  textAlign: "left",
                  transition: "border-color 0.15s, background 0.15s",
                  color: OFFICE_BLUE.text,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    role.accentColor;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(37,99,235,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    OFFICE_BLUE.border;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    OFFICE_BLUE.surface;
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    background: `${role.accentColor}22`,
                    border: `1px solid ${role.accentColor}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: role.accentColor,
                    flexShrink: 0,
                  }}
                >
                  {role.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: OFFICE_BLUE.text,
                      fontFamily: kh
                        ? "var(--font-khmer, sans-serif)"
                        : "inherit",
                    }}
                  >
                    {kh ? role.labelKh : role.labelEn}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: OFFICE_BLUE.muted,
                      marginTop: "3px",
                      fontFamily: kh
                        ? "var(--font-khmer, sans-serif)"
                        : "inherit",
                    }}
                  >
                    {kh ? role.descKh : role.descEn}
                  </div>
                </div>
                <ChevronRight size={16} color={OFFICE_BLUE.muted} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── INTERVIEWING / ENDING / ENDED STAGE ── */}
      {(stage === "interviewing" ||
        stage === "ending" ||
        stage === "ended") && (
        <>
          {/* Role badge */}
          {selectedRoleObj && (
            <div
              style={{
                padding: "10px 20px",
                borderBottom: `1px solid ${OFFICE_BLUE.border}`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(37,99,235,0.06)",
              }}
            >
              <span
                style={{
                  color: selectedRoleObj.accentColor,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {selectedRoleObj.icon}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: OFFICE_BLUE.muted,
                  fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                }}
              >
                {kh ? selectedRoleObj.labelKh : selectedRoleObj.labelEn}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  color: OFFICE_BLUE.muted,
                  background: "rgba(148,163,184,0.1)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                }}
              >
                {kh
                  ? `សំណួរ ${questionCount}`
                  : `Q${questionCount}`}
              </span>
            </div>
          )}

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            style={{
              height: isFullscreen ? undefined : "360px",
              flex: isFullscreen ? 1 : undefined,
              overflowY: "auto",
              padding: isFullscreen ? "24px 32px" : "16px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: isFullscreen ? "#0f172a" : OFFICE_BLUE.bg,
            }}
          >
            {messages.map((msg, i) => (
              <InterviewBubble key={i} msg={msg} />
            ))}

            {(streaming || stage === "ending") && streamingContent && (
              <InterviewBubble
                msg={{ role: "assistant", content: streamingContent }}
                streaming
              />
            )}

            {(streaming || stage === "ending") && !streamingContent && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={14} color="white" />
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: OFFICE_BLUE.accentLight,
                        animation: `interviewDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {stage === "ended" && messages.length > 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "16px",
                  borderTop: `1px solid ${OFFICE_BLUE.border}`,
                  marginTop: "8px",
                }}
              >
                <button
                  onClick={restart}
                  style={{
                    background: `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 24px",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                  }}
                >
                  <RotateCcw size={14} />
                  {kh ? "ហ្វឹកហាត់ម្ដងទៀត" : "Practice Again"}
                </button>
              </div>
            )}

          </div>

          {/* ── Input bar (only during active interview) ── */}
          {stage === "interviewing" && (
            <div
              style={{
                borderTop: `1px solid ${OFFICE_BLUE.border}`,
                background: OFFICE_BLUE.panel,
                padding: "12px 16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={streaming}
                  placeholder={
                    kh
                      ? "វាយចម្លើយរបស់អ្នកនៅទីនេះ... (Enter ដើម្បីផ្ញើ)"
                      : "Type your answer here… (Enter to send, Shift+Enter for new line)"
                  }
                  rows={2}
                  style={{
                    flex: 1,
                    resize: "none",
                    background: OFFICE_BLUE.surface,
                    border: `1.5px solid ${OFFICE_BLUE.border}`,
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: OFFICE_BLUE.text,
                    outline: "none",
                    lineHeight: 1.5,
                    maxHeight: "120px",
                    overflowY: "auto",
                    fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = OFFICE_BLUE.accent;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = OFFICE_BLUE.border;
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <button
                    onClick={sendAnswer}
                    disabled={streaming || !input.trim()}
                    title={kh ? "ផ្ញើចម្លើយ" : "Send answer"}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background:
                        streaming || !input.trim()
                          ? OFFICE_BLUE.surface
                          : `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
                      border: `1px solid ${streaming || !input.trim() ? OFFICE_BLUE.border : "transparent"}`,
                      cursor:
                        streaming || !input.trim() ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.15s",
                    }}
                  >
                    <Send
                      size={16}
                      color={
                        streaming || !input.trim()
                          ? OFFICE_BLUE.muted
                          : "white"
                      }
                    />
                  </button>
                  <button
                    onClick={toggleSpeech}
                    disabled={streaming}
                    title={
                      isListening
                        ? kh ? "ឈប់ស្ដាប់" : "Stop recording"
                        : kh ? "និយាយចម្លើយ" : "Speak your answer"
                    }
                    className={isListening ? "mic-pulse" : ""}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: isListening
                        ? "rgba(239,68,68,0.2)"
                        : streaming
                        ? OFFICE_BLUE.surface
                        : "rgba(255,255,255,0.06)",
                      border: `1px solid ${
                        isListening
                          ? "rgba(239,68,68,0.6)"
                          : streaming
                          ? OFFICE_BLUE.border
                          : "rgba(255,255,255,0.12)"
                      }`,
                      cursor: streaming ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.15s, border-color 0.15s",
                      position: "relative",
                    }}
                  >
                    {isListening ? (
                      <MicOff size={16} color="#EF4444" />
                    ) : (
                      <Mic size={16} color={streaming ? OFFICE_BLUE.muted : "#93C5FD"} />
                    )}
                  </button>
                  <button
                    onClick={endInterview}
                    disabled={streaming || questionCount < 2}
                    title={kh ? "បញ្ចប់ការសម្ភាសន៍ ហើយទទួលបានសេចក្ដីសង្ខេប" : "End interview & get performance summary"}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background:
                        streaming || questionCount < 2
                          ? OFFICE_BLUE.surface
                          : "rgba(239,68,68,0.15)",
                      border: `1px solid ${streaming || questionCount < 2 ? OFFICE_BLUE.border : "rgba(239,68,68,0.4)"}`,
                      cursor:
                        streaming || questionCount < 2
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.15s",
                    }}
                  >
                    <FileText
                      size={15}
                      color={
                        streaming || questionCount < 2
                          ? OFFICE_BLUE.muted
                          : "#EF4444"
                      }
                    />
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                {isListening ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#EF4444",
                        flexShrink: 0,
                        animation: "mic-dot-blink 0.9s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#FCA5A5",
                        fontWeight: 600,
                        fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                      }}
                    >
                      {kh ? "កំពុងស្ដាប់... (ឈប់និយាយ ២ វិនាទីដើម្បីបញ្ឈប់)" : "Listening… (2 s of silence stops recording)"}
                    </span>
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: "11px",
                      color: OFFICE_BLUE.muted,
                      margin: 0,
                      fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                    }}
                  >
                    {kh
                      ? "ចូរឆ្លើយឲ្យបានច្បាស់ ដូចជានៅក្នុងការសម្ភាសន៍ពិតប្រាកដ"
                      : "Answer as you would in a real interview — be specific and confident"}
                  </p>
                )}
                {questionCount >= 2 && (
                  <button
                    onClick={endInterview}
                    disabled={streaming}
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#EF4444",
                      cursor: streaming ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
                    }}
                  >
                    <Square size={10} />
                    {kh ? "បញ្ចប់ & ទទួលសេចក្ដីសង្ខេប" : "End Interview & Get Summary"}
                  </button>
                )}
              </div>
            </div>
          )}

          {stage === "ending" && (
            <div
              style={{
                borderTop: `1px solid ${OFFICE_BLUE.border}`,
                background: OFFICE_BLUE.panel,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: OFFICE_BLUE.muted,
                fontSize: "13px",
                fontFamily: kh ? "var(--font-khmer, sans-serif)" : "inherit",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#3B82F6",
                  animation: "interviewDot 1.2s ease-in-out infinite",
                }}
              />
              {kh
                ? "AI កំពុងបង្កើតសេចក្ដីសង្ខេបការអនុវត្តន៍..."
                : "Generating your performance summary…"}
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes interviewDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes mic-ring {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
        .mic-pulse {
          animation: mic-ring 1.1s ease-out infinite;
        }
        @keyframes mic-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

function InterviewBubble({
  msg,
  streaming,
}: {
  msg: Message;
  streaming?: boolean;
}) {
  const isUser = msg.role === "user";

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: isUser
            ? "rgba(37,99,235,0.3)"
            : `linear-gradient(135deg, ${OFFICE_BLUE.accent}, #1D4ED8)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {isUser ? (
          <User size={14} color="#93C5FD" />
        ) : (
          <Bot size={14} color="white" />
        )}
      </div>
      <div
        style={{
          maxWidth: "80%",
          padding: "11px 14px",
          borderRadius: isUser
            ? "16px 4px 16px 16px"
            : "4px 16px 16px 16px",
          background: isUser ? OFFICE_BLUE.userBubble : OFFICE_BLUE.aiBubble,
          border: isUser
            ? "none"
            : `1px solid ${OFFICE_BLUE.aiBubbleBorder}30`,
          color: isUser ? "white" : OFFICE_BLUE.text,
          fontSize: "13px",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: isUser
            ? "0 2px 8px rgba(29,78,216,0.3)"
            : "0 2px 8px rgba(0,0,0,0.2)",
          opacity: streaming ? 0.9 : 1,
        }}
      >
        {msg.content}
        {streaming && (
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "13px",
              background: OFFICE_BLUE.accentLight,
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "cursor-blink 0.8s steps(1) infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
