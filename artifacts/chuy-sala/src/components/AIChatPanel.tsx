import { useEffect, useRef, useState, useCallback } from "react";
import { X, Send, Bot, Sparkles, Trash2, ChevronDown } from "lucide-react";
import { useChatStore, type ChatMessage } from "@/store/use-chat";
import { useLanguageStore } from "@/store/use-language";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

function t(en: string, kh: string) {
  return en;
}

async function createConversation(title: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/api/openai/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data.id;
}

export function AIChatPanel() {
  const {
    isOpen,
    reviewerMode,
    conversationId,
    messages,
    pendingPrompt,
    closeChat,
    setConversationId,
    addMessage,
    clearMessages,
    clearPendingPrompt,
  } = useChatStore();

  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [conversationIdLocal, setConversationIdLocal] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasSentPending = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string, currentReviewerMode: boolean) => {
      if (!content.trim() || streaming) return;

      addMessage({ role: "user", content, reviewerMode: currentReviewerMode });
      setStreaming(true);
      setStreamingContent("");

      let convId = conversationIdLocal;
      if (!convId) {
        const title = currentReviewerMode
          ? "Application Letter Review"
          : "Sala AI Chat";
        convId = await createConversation(title);
        setConversationIdLocal(convId);
        setConversationId(convId);
      }

      const res = await fetch(
        `${BASE_URL}/api/openai/conversations/${convId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            reviewerMode: currentReviewerMode,
          }),
        }
      );

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullResponse = "";

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
              fullResponse += parsed.content;
              setStreamingContent(fullResponse);
            }
            if (parsed.done) {
              addMessage({
                role: "assistant",
                content: fullResponse,
                reviewerMode: currentReviewerMode,
              });
              setStreamingContent("");
              setStreaming(false);
            }
            if (parsed.error) {
              addMessage({
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
                reviewerMode: false,
              });
              setStreamingContent("");
              setStreaming(false);
            }
          } catch {
            // skip malformed lines
          }
        }
      }
    },
    [conversationIdLocal, streaming, addMessage, setConversationId]
  );

  useEffect(() => {
    if (isOpen && pendingPrompt && !hasSentPending.current) {
      hasSentPending.current = true;
      clearPendingPrompt();
      setTimeout(() => {
        sendMessage(pendingPrompt, reviewerMode);
      }, 400);
    }
    if (!isOpen) {
      hasSentPending.current = false;
    }
  }, [isOpen, pendingPrompt, reviewerMode, sendMessage, clearPendingPrompt]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const content = input.trim();
    setInput("");
    sendMessage(content, reviewerMode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    clearMessages();
    setConversationIdLocal(null);
    hasSentPending.current = false;
  };

  if (!isOpen) return null;

  const headerBg = reviewerMode
    ? "linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #b8860b 100%)"
    : "linear-gradient(135deg, #1A6EA8 0%, #1a87c8 100%)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "min(420px, calc(100vw - 32px))",
        height: "min(580px, calc(100vh - 80px))",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: reviewerMode
          ? "0 20px 60px rgba(180,134,11,0.35), 0 4px 16px rgba(0,0,0,0.25)"
          : "0 20px 60px rgba(26,110,168,0.35), 0 4px 16px rgba(0,0,0,0.25)",
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: headerBg,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {reviewerMode ? (
            <Sparkles size={18} color="white" />
          ) : (
            <Bot size={18} color="white" />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              color: "white",
              fontSize: "14px",
              lineHeight: 1.2,
            }}
          >
            {reviewerMode
              ? kh
                ? "ការពិនិត្យជំនាញ — Sala AI"
                : "Expert Review — Sala AI"
              : "Sala AI Tutor"}
          </div>
          {reviewerMode && (
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.85)",
                marginTop: "2px",
              }}
            >
              {kh ? "ការវាយតម្លៃលិខិតសម្ងំ" : "Application Letter Reviewer Mode"}
            </div>
          )}
        </div>
        <button
          onClick={handleClear}
          title={kh ? "សម្អាតការសន្ទនា" : "Clear conversation"}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "8px",
            padding: "6px",
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Trash2 size={15} />
        </button>
        <button
          onClick={closeChat}
          title={kh ? "បិទ" : "Close"}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "8px",
            padding: "6px",
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Reviewer Mode Banner */}
      {reviewerMode && (
        <div
          style={{
            background: "#fffbeb",
            borderBottom: "1px solid #fcd34d",
            padding: "8px 14px",
            fontSize: "12px",
            color: "#92400e",
            flexShrink: 0,
          }}
        >
          <strong>📋 {kh ? "ការណែនាំ" : "How to use"}:</strong>{" "}
          {kh
            ? "បិទ​ប្ដូរ​លិខិតពាក្យ​សុំ​ជា​ភាសា​អង់គ្លេស​ ឬ​ខ្មែររបស់​អ្នក​ ហើយ AI នឹង​ពិនិត្យ​វា​ដោយ​ប្រើ​បញ្ជីពិនិត្យ​ជំនាញ​របស់​វា​។"
            : "Paste your draft letter below — AI will review it using its professional checklist."}
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px",
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.length === 0 && !streaming && (
          <div
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "13px",
              marginTop: "32px",
              padding: "0 20px",
            }}
          >
            {reviewerMode ? (
              <>
                <Sparkles
                  size={32}
                  color="#d4a017"
                  style={{ margin: "0 auto 8px" }}
                />
                <p style={{ fontWeight: 600, color: "#b8860b", marginBottom: 4 }}>
                  {kh ? "ត្រូចលើស​ Reviewer Mode" : "Expert Review Mode"}
                </p>
                <p>
                  {kh
                    ? "AI កំពុងរៀបចំពិនិត្យ​លិខិតរបស់​អ្នក​..."
                    : "Getting ready to review your letter…"}
                </p>
              </>
            ) : (
              <>
                <Bot size={32} color="#1A6EA8" style={{ margin: "0 auto 8px" }} />
                <p>
                  {kh
                    ? "សួស្ដី! ខ្ញុំជា Sala AI ។ ខ្ញុំអាចជួយអ្នកក្នុងការ​ស្នើ​សុំ​អាហារូបករណ៍ ការ​ដាក់​ពាក្យ​ចូល​សាកលវិទ្យាល័យ​ ឬ​សំណួរ​ការ​សិក្សា​ណាមួយ​!"
                    : "Hi! I'm Sala AI. Ask me anything about scholarships, university applications, or your studies!"}
                </p>
              </>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} reviewerMode={reviewerMode} />
        ))}

        {streaming && streamingContent && (
          <MessageBubble
            msg={{ role: "assistant", content: streamingContent, reviewerMode }}
            reviewerMode={reviewerMode}
            streaming
          />
        )}

        {streaming && !streamingContent && (
          <div style={{ display: "flex", gap: "6px", alignItems: "center", padding: "8px 12px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: reviewerMode ? "#d4a017" : "#1A6EA8",
                    animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>
              {reviewerMode
                ? kh ? "AI កំពុងពិនិត្យ..." : "Reviewing your letter…"
                : kh ? "AI កំពុងឆ្លើយ..." : "Sala AI is thinking…"}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "12px",
          background: "white",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "8px",
          alignItems: "flex-end",
          flexShrink: 0,
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          placeholder={
            reviewerMode
              ? kh
                ? "បិទ​ប្ដូរ​លិខិតពាក្យ​សុំ​របស់​អ្នក​នៅ​ទីនេះ..."
                : "Paste your application letter here…"
              : kh
              ? "វាយ​សំណួររបស់​អ្នក..."
              : "Type your question…"
          }
          rows={2}
          style={{
            flex: 1,
            resize: "none",
            border: "1.5px solid #e2e8f0",
            borderRadius: "10px",
            padding: "8px 12px",
            fontSize: "13px",
            fontFamily: "inherit",
            outline: "none",
            lineHeight: 1.5,
            maxHeight: "120px",
            overflowY: "auto",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = reviewerMode ? "#d4a017" : "#1A6EA8";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
          }}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background:
              streaming || !input.trim()
                ? "#e2e8f0"
                : reviewerMode
                ? "#d4a017"
                : "#1A6EA8",
            border: "none",
            cursor: streaming || !input.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <Send size={16} color="white" />
        </button>
      </form>

      {/* Dot animation keyframes */}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MessageBubble({
  msg,
  reviewerMode,
  streaming,
}: {
  msg: ChatMessage;
  reviewerMode: boolean;
  streaming?: boolean;
}) {
  const isUser = msg.role === "user";

  const assistantBg = reviewerMode
    ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)"
    : "#ffffff";

  const assistantBorder = reviewerMode ? "1.5px solid #fcd34d" : "1.5px solid #e2e8f0";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        gap: "8px",
        alignItems: "flex-end",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: reviewerMode
              ? "linear-gradient(135deg, #b8860b, #d4a017)"
              : "linear-gradient(135deg, #1A6EA8, #1a87c8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {reviewerMode ? (
            <Sparkles size={13} color="white" />
          ) : (
            <Bot size={13} color="white" />
          )}
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 13px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser
            ? "linear-gradient(135deg, #1A6EA8, #1a87c8)"
            : assistantBg,
          border: isUser ? "none" : assistantBorder,
          color: isUser ? "white" : "#1e293b",
          fontSize: "13px",
          lineHeight: "1.55",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          opacity: streaming ? 0.85 : 1,
        }}
      >
        {reviewerMode && !isUser && (
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#b8860b",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            ✨ Expert Review
          </div>
        )}
        {msg.content}
        {streaming && (
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "13px",
              background: reviewerMode ? "#d4a017" : "#1A6EA8",
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
