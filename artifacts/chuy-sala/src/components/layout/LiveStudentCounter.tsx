import { useEffect, useState } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ────────────────────────────────────────────────────────────────────────────
 *  LIVE STUDENT COUNTER — សិស្សកំពុងរៀន / Active Students
 *
 *  Sits in the top-left of the Navbar, next to the logo + slogan.
 *  Shows a softly-pulsing green dot and a bilingual "Active Students" label
 *  that auto-collapses to "🟢 NN" on small mobile screens.
 *
 *  TODO: Connect to WebSocket/Database for actual concurrent user tracking.
 * ────────────────────────────────────────────────────────────────────────── */

const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// Tunables for the simulation
const BASE = 38;          // realistic baseline of concurrent students
const MIN_VAL = 20;       // floor — never goes below this
const MAX_VAL = 65;       // ceiling — never goes above this
const MIN_DELTA = 1;      // smallest random change
const MAX_DELTA = 3;      // largest random change
const MIN_INTERVAL_MS = 30_000;  // 30 seconds
const MAX_INTERVAL_MS = 90_000;  // 90 seconds

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function LiveStudentCounter() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const [count, setCount] = useState<number>(BASE);

  /**
   * Organic-traffic simulation.
   *
   * Every 30–90 seconds, randomly add OR subtract 1–3 students, clamped to
   * [MIN_VAL, MAX_VAL]. This makes the number feel alive without needing a
   * real backend right now.
   *
   * TODO: Connect to WebSocket/Database for actual concurrent user tracking.
   */
  useEffect(() => {
    let timeoutId: number | undefined;

    const tick = () => {
      setCount((current) => {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const delta = randInt(MIN_DELTA, MAX_DELTA) * direction;
        const next = current + delta;
        // Clamp into a believable range
        if (next < MIN_VAL) return current + Math.abs(delta); // bounce up
        if (next > MAX_VAL) return current - Math.abs(delta); // bounce down
        return next;
      });

      // Schedule next tick at a random interval
      timeoutId = window.setTimeout(tick, randInt(MIN_INTERVAL_MS, MAX_INTERVAL_MS));
    };

    timeoutId = window.setTimeout(tick, randInt(MIN_INTERVAL_MS, MAX_INTERVAL_MS));

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const displayCount = k ? toKhNum(count) : String(count);

  return (
    <div
      className="hidden sm:inline-flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-full border border-emerald-300/60 bg-emerald-50 shadow-sm"
      role="status"
      aria-live="polite"
      aria-label={t(
        `${count} students currently active`,
        `សិស្ស ${count} នាក់កំពុងរៀន`,
      )}
      data-testid="live-student-counter"
    >
      {/* Pulsing green dot */}
      <span className="relative flex w-2.5 h-2.5 flex-shrink-0" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          style={{ animation: "live-counter-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>

      {/* Bilingual label — hidden on small screens (md+ only) */}
      <span className="hidden md:inline-flex items-center gap-1.5 text-xs leading-none">
        <span className="font-khmer text-emerald-800">សិស្សកំពុងរៀន</span>
        <span className="text-emerald-700/70" aria-hidden="true">/</span>
        <span className="font-semibold text-emerald-900">
          {t("Active Students", "Active Students")}:
        </span>
      </span>

      {/* Number — always visible */}
      <span
        className={`font-bold tabular-nums text-emerald-900 leading-none ${
          k ? "font-khmer" : ""
        }`}
        data-testid="live-student-count"
      >
        {displayCount}
      </span>

      {/* Local keyframes for the pulsing dot */}
      <style>{`
        @keyframes live-counter-ping {
          0%   { transform: scale(1);   opacity: 0.75; }
          75%  { transform: scale(2.2); opacity: 0;    }
          100% { transform: scale(2.2); opacity: 0;    }
        }
      `}</style>
    </div>
  );
}

/**
 * Compact mobile variant — just the pulsing dot + number, no labels.
 * Visible only on the smallest screens where the full label would crowd
 * the navbar.
 */
export function LiveStudentCounterCompact() {
  const { language } = useLanguageStore();
  const k = language === "kh";

  const [count, setCount] = useState<number>(BASE);

  // Same organic simulation as the full counter.
  // TODO: Connect to WebSocket/Database for actual concurrent user tracking.
  useEffect(() => {
    let timeoutId: number | undefined;
    const tick = () => {
      setCount((current) => {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const delta = randInt(MIN_DELTA, MAX_DELTA) * direction;
        const next = current + delta;
        if (next < MIN_VAL) return current + Math.abs(delta);
        if (next > MAX_VAL) return current - Math.abs(delta);
        return next;
      });
      timeoutId = window.setTimeout(tick, randInt(MIN_INTERVAL_MS, MAX_INTERVAL_MS));
    };
    timeoutId = window.setTimeout(tick, randInt(MIN_INTERVAL_MS, MAX_INTERVAL_MS));
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const displayCount = k ? toKhNum(count) : String(count);

  return (
    <div
      className="sm:hidden inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-emerald-300/60 bg-emerald-50"
      role="status"
      aria-live="polite"
      aria-label={`${count} students active`}
      data-testid="live-student-counter-compact"
    >
      <span className="relative flex w-2 h-2 flex-shrink-0" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          style={{ animation: "live-counter-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span
        className={`text-xs font-bold tabular-nums text-emerald-900 leading-none ${
          k ? "font-khmer" : ""
        }`}
      >
        {displayCount}
      </span>
    </div>
  );
}
