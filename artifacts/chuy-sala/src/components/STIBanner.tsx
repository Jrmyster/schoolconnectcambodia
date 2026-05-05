import { useState } from "react";
import { X, Atom, Rocket, Lightbulb } from "lucide-react";

// ── National STI Day Banner ─────────────────────────────────────────────────
//  Renders only on March 29th (month 2, day 29 in JS Date — month is 0-indexed).
//  Returns null on every other day so it adds zero overhead.
//  Dismissible via the × button; state lives in the component so a page
//  navigation resets it — intentional (banner re-shows on each fresh visit on
//  the day itself, matching typical holiday-banner UX).
// ────────────────────────────────────────────────────────────────────────────

function isSTIDay(): boolean {
  const now = new Date();
  return now.getMonth() === 2 && now.getDate() === 29; // March = 2 (0-indexed)
}

export function STIBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!isSTIDay() || dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="National STI Day"
      style={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(100deg, #0f172a 0%, #1e1b4b 25%, #4c1d95 55%, #7c3aed 80%, #a855f7 100%)",
        borderBottom: "1px solid rgba(167,139,250,0.35)",
        overflow: "hidden",
      }}
    >
      {/* Decorative shimmer stripe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content row */}
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 48px 10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Icons */}
        <span style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <Atom   size={18} color="#c4b5fd" aria-hidden />
          <Rocket size={18} color="#f9a8d4" aria-hidden />
          <Lightbulb size={18} color="#fde68a" aria-hidden />
        </span>

        {/* Text block */}
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, textAlign: "center" }}>
          <span style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "clamp(13px, 2.2vw, 15px)",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}>
            🎉 Happy National STI (Science, Technology &amp; Innovation) Day!
          </span>
          <span style={{
            color: "#e9d5ff",
            fontWeight: 600,
            fontSize: "clamp(12px, 1.8vw, 13.5px)",
            fontFamily: "'Khmer', 'Noto Sans Khmer', sans-serif",
            lineHeight: 1.5,
          }}>
            រីករាយទិវាជាតិ វិទ្យាសាស្ត្រ បច្ចេកវិទ្យា និងនវានុវត្តន៍!
          </span>
        </span>

        {/* Trailing icons (mirror) */}
        <span style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <Lightbulb size={18} color="#fde68a" aria-hidden />
          <Rocket    size={18} color="#f9a8d4" aria-hidden style={{ transform: "scaleX(-1)" }} />
          <Atom      size={18} color="#c4b5fd" aria-hidden />
        </span>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        style={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 6,
          color: "#e9d5ff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          padding: 0,
          flexShrink: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
      >
        <X size={14} />
      </button>
    </div>
  );
}
