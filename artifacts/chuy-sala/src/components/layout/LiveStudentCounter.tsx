import { useEffect, useState } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ────────────────────────────────────────────────────────────────────────────
 *  LIVE STUDENT COUNTER — សិស្សកំពុងរៀន / Active Students
 *
 *  Sits in the top-left of the Navbar, next to the logo + slogan.
 *  Shows a softly-pulsing green dot and a bilingual "Active Students" label
 *  that auto-collapses to "🟢 NN" on small mobile screens.
 *
 *  Now powered by a dynamic, time-based algorithm to simulate live connection.
 * ────────────────────────────────────────────────────────────────────────── */

const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInitialStudents() {
  const hour = new Date().getHours();
  const isNight = hour >= 21 || hour < 6;
  return isNight ? randInt(3, 9) : randInt(38, 52);
}

/**
 * Shared hook to manage the time-based organic simulation.
 * 
 * If the time is 9:00 PM or later (hour >= 21) OR before 6:00 AM (hour < 6),
 * the activeStudents count is set to a low number (3-9).
 * Otherwise, it's set to a higher daytime number (38-52).
 * Every 3 minutes, the number fluctuates by 1 or 2 people.
 */
function useActiveStudents() {
  const [activeStudents, setActiveStudents] = useState<number>(getInitialStudents);

  useEffect(() => {
    // Re-evaluate initial bounds on mount (in case client time differs from load)
    setActiveStudents(getInitialStudents());

    const intervalId = window.setInterval(() => {
      const hour = new Date().getHours();
      const isNight = hour >= 21 || hour < 6;
      const min = isNight ? 3 : 38;
      const max = isNight ? 9 : 52;

      setActiveStudents((current) => {
        // If we crossed the day/night threshold, reset into the correct range
        if (current < min || current > max) {
          return randInt(min, max);
        }

        const direction = Math.random() < 0.5 ? -1 : 1;
        const delta = randInt(1, 2) * direction;
        const next = current + delta;
        
        // Clamp into the believable range
        if (next < min) return current + Math.abs(delta); // bounce up
        if (next > max) return current - Math.abs(delta); // bounce down
        return next;
      });
    }, 3 * 60 * 1000); // 3 minutes

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return activeStudents;
}

export function LiveStudentCounter() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const activeStudents = useActiveStudents();
  const displayCount = k ? toKhNum(activeStudents) : String(activeStudents);

  return (
    <div
      className="hidden sm:inline-flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-full border border-emerald-300/60 bg-emerald-50 shadow-sm"
      role="status"
      aria-live="polite"
      aria-label={t(
        `${activeStudents} students currently active`,
        `សិស្ស ${activeStudents} នាក់កំពុងរៀន`,
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

  const activeStudents = useActiveStudents();
  const displayCount = k ? toKhNum(activeStudents) : String(activeStudents);

  return (
    <div
      className="sm:hidden inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-emerald-300/60 bg-emerald-50"
      role="status"
      aria-live="polite"
      aria-label={`${activeStudents} students active`}
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
