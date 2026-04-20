import { useEffect, useState } from "react";
import { useMascotStore, type MascotKey, type CheerEvent } from "@/store/use-mascot";
import { useLanguageStore } from "@/store/use-language";

/**
 * Global mascot overlay. Subscribes to the mascot store and slides a
 * Cambodian national-animal mascot (Kouprey, Giant Ibis, or Royal Turtle)
 * onto the screen with a bilingual speech bubble whenever a learner gets
 * a correct (or wrong) answer in any beginner game.
 *
 * Mounted once at the App root so every page picks it up automatically.
 */
export function MascotCheer() {
  const active = useMascotStore((s) => s.active);
  const dismiss = useMascotStore((s) => s.dismiss);
  const language = useLanguageStore((s) => s.language);
  const [shown, setShown] = useState<CheerEvent | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // Drive enter / exit animations whenever a new cheer fires.
  useEffect(() => {
    if (!active) return;
    setShown(active);
    setPhase("in");
    const id = active.id;
    const exitTimer = setTimeout(() => setPhase("out"), 2000);
    const clearTimer = setTimeout(() => {
      setShown((cur) => (cur && cur.id === id ? null : cur));
      dismiss(id);
    }, 2600);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(clearTimer);
    };
  }, [active, dismiss]);

  if (!shown) return null;

  const phrase = language === "kh" ? shown.kh : shown.en;
  const isWrong = shown.tone === "wrong";

  return (
    <>
      {/* Persistent screen-reader status region — always mounted so polite
          announcements are reliable across screen readers. */}
      <LiveStatusRegion phrase={phrase} />

      <div
        aria-hidden
        className="pointer-events-none fixed bottom-4 left-4 z-[60] sm:bottom-6 sm:left-6"
      >
        <style>{`
          @keyframes mascot-slide-in {
            0%   { transform: translateY(120%) rotate(-8deg); opacity: 0; }
            60%  { transform: translateY(-8%)   rotate(2deg);  opacity: 1; }
            100% { transform: translateY(0)     rotate(0);     opacity: 1; }
          }
          @keyframes mascot-slide-out {
            0%   { transform: translateY(0)     rotate(0);     opacity: 1; }
            100% { transform: translateY(140%)  rotate(-6deg); opacity: 0; }
          }
          @keyframes mascot-bob {
            0%, 100% { transform: translateY(0) rotate(-1deg); }
            50%      { transform: translateY(-4px) rotate(1deg); }
          }
          @keyframes mascot-bubble-pop {
            0%   { transform: scale(0.5); opacity: 0; }
            70%  { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }
          @keyframes mascot-blink {
            0%, 92%, 100% { transform: scaleY(1); }
            95%           { transform: scaleY(0.1); }
          }
          .mascot-stage-in  { animation: mascot-slide-in  0.55s cubic-bezier(.34,1.56,.64,1) both; }
          .mascot-stage-out { animation: mascot-slide-out 0.55s ease-in both; }
          .mascot-body      { animation: mascot-bob 2.2s ease-in-out infinite; transform-origin: center bottom; }
          .mascot-bubble    { animation: mascot-bubble-pop 0.45s cubic-bezier(.34,1.56,.64,1) both; transform-origin: bottom left; }
          .mascot-eye-lid   { animation: mascot-blink 3.6s ease-in-out infinite; transform-origin: center; }

          /* Honor the user's reduced-motion preference: skip slides, bob, blink, pop. */
          @media (prefers-reduced-motion: reduce) {
            .mascot-stage-in,
            .mascot-stage-out,
            .mascot-body,
            .mascot-bubble,
            .mascot-eye-lid {
              animation: none !important;
            }
            .mascot-stage-out { opacity: 0; transition: opacity 0.2s linear; }
          }
        `}</style>

        <div className={phase === "in" ? "mascot-stage-in" : "mascot-stage-out"}>
          <div className="flex items-end gap-2 sm:gap-3">
            {/* The mascot illustration */}
            <div className="mascot-body w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl">
              <MascotSvg mascot={shown.mascot} />
            </div>

            {/* Speech bubble */}
            <div
              className={`mascot-bubble relative max-w-[14rem] sm:max-w-xs mb-3 px-4 py-2.5 rounded-2xl border-[3px] shadow-lg ${
                isWrong
                  ? "bg-amber-50 border-amber-400"
                  : "bg-white border-emerald-400"
              }`}
            >
              <p
                className={`text-sm sm:text-base font-bold leading-snug ${
                  isWrong ? "text-amber-900" : "text-emerald-900"
                } ${language === "kh" ? "font-khmer leading-loose" : ""}`}
              >
                {phrase}
              </p>
              {/* Tail pointing toward the mascot */}
              <span
                aria-hidden
                className={`absolute -left-2 bottom-3 w-0 h-0 border-y-[8px] border-y-transparent border-r-[10px] ${
                  isWrong ? "border-r-amber-400" : "border-r-emerald-400"
                }`}
              />
              <span
                aria-hidden
                className={`absolute -left-[5px] bottom-[14px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] ${
                  isWrong ? "border-r-amber-50" : "border-r-white"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Persistent visually-hidden live region. Mounted once for the lifetime of the
 * app so that screen readers reliably announce the latest cheer phrase whenever
 * its text content changes.
 */
function LiveStatusRegion({ phrase }: { phrase: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {phrase}
    </div>
  );
}

/* ============================================================ */
/*  Mascot SVGs — friendly, bilingual, and built for small kids */
/* ============================================================ */

function MascotSvg({ mascot }: { mascot: MascotKey }) {
  if (mascot === "kouprey") return <KoupreySvg />;
  if (mascot === "ibis") return <IbisSvg />;
  return <TurtleSvg />;
}

/** Friendly eyes — large white + black pupil + tiny highlight, with a blinking lid. */
function FriendlyEye({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#1f2937" strokeWidth="1.4" />
      <circle cx={cx + 0.6} cy={cy + 1.2} r={r * 0.55} fill="#1f2937" />
      <circle cx={cx + 1.8} cy={cy - 0.6} r={r * 0.22} fill="#ffffff" />
      <ellipse
        className="mascot-eye-lid"
        cx={cx}
        cy={cy - r * 0.2}
        rx={r * 1.05}
        ry={r * 1.05}
        fill="#1f2937"
        opacity="0"
      />
    </g>
  );
}

/** Kouprey — the National Mammal: a sturdy wild ox with curved horns. */
function KoupreySvg() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kouprey mascot">
      {/* Body */}
      <ellipse cx="62" cy="86" rx="36" ry="22" fill="#4b3621" stroke="#1f140a" strokeWidth="2" />
      {/* Legs */}
      <rect x="38" y="98" width="8" height="14" rx="2" fill="#3a2a18" />
      <rect x="78" y="98" width="8" height="14" rx="2" fill="#3a2a18" />
      {/* Tail */}
      <path d="M97 84 q12 -2 10 12" stroke="#1f140a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="107" cy="96" r="3" fill="#1f140a" />
      {/* Head */}
      <ellipse cx="40" cy="58" rx="26" ry="22" fill="#5a4129" stroke="#1f140a" strokeWidth="2" />
      {/* Snout */}
      <ellipse cx="22" cy="66" rx="11" ry="8" fill="#caa07a" stroke="#1f140a" strokeWidth="1.5" />
      <circle cx="17" cy="65" r="1.6" fill="#1f140a" />
      <circle cx="20" cy="68" r="1.6" fill="#1f140a" />
      <path d="M18 72 q4 3 8 0" stroke="#1f140a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Horns — the iconic lyre-shape */}
      <path d="M30 40 q-10 -16 -22 -10 q8 4 6 16" fill="none" stroke="#e7d8b6" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 40 q10 -16 22 -10 q-8 4 -6 16" fill="none" stroke="#e7d8b6" strokeWidth="4" strokeLinecap="round" />
      {/* Ears */}
      <ellipse cx="28" cy="48" rx="5" ry="3" fill="#3a2a18" transform="rotate(-30 28 48)" />
      <ellipse cx="55" cy="48" rx="5" ry="3" fill="#3a2a18" transform="rotate(30 55 48)" />
      {/* Eyes */}
      <FriendlyEye cx={36} cy={56} r={6.5} />
      <FriendlyEye cx={52} cy={56} r={6.5} />
      {/* Cheek blush */}
      <circle cx="32" cy="68" r="2.8" fill="#ef4444" opacity="0.35" />
      <circle cx="56" cy="68" r="2.8" fill="#ef4444" opacity="0.35" />
    </svg>
  );
}

/** Giant Ibis — the National Bird: tall, with the iconic long curved beak. */
function IbisSvg() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Giant Ibis mascot">
      {/* Body — pear shape */}
      <ellipse cx="56" cy="78" rx="28" ry="26" fill="#6b7280" stroke="#1f2937" strokeWidth="2" />
      {/* Wing */}
      <path d="M44 70 q18 -6 30 6 q-10 18 -28 14 z" fill="#4b5563" stroke="#1f2937" strokeWidth="1.5" />
      <path d="M50 80 l24 -2 M52 86 l22 -1 M54 92 l18 0" stroke="#374151" strokeWidth="1" fill="none" />
      {/* Legs */}
      <line x1="48" y1="103" x2="46" y2="116" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="103" x2="66" y2="116" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 116 l6 0 l2 3 M60 116 l6 0 l2 3" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <path d="M52 56 q-6 -16 4 -28" stroke="#6b7280" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M52 56 q-6 -16 4 -28" stroke="#1f2937" strokeWidth="2" fill="none" />
      {/* Head */}
      <circle cx="60" cy="26" r="14" fill="#4b5563" stroke="#1f2937" strokeWidth="2" />
      {/* Naked head crown (ibis trait) */}
      <path d="M50 18 q10 -6 20 0" stroke="#1f2937" strokeWidth="1.2" fill="#374151" />
      {/* Beak — long down-curved */}
      <path
        d="M72 28 q22 6 26 28 q-4 2 -8 -2 q-2 -16 -20 -20 z"
        fill="#1f2937"
        stroke="#0b0f15"
        strokeWidth="1.2"
      />
      {/* Eyes */}
      <FriendlyEye cx={56} cy={24} r={5.5} />
      <FriendlyEye cx={66} cy={24} r={5.5} />
      {/* Cheek blush */}
      <circle cx="50" cy="32" r="2.4" fill="#fb7185" opacity="0.4" />
      <circle cx="70" cy="32" r="2.4" fill="#fb7185" opacity="0.4" />
    </svg>
  );
}

/** Royal Turtle — the National Reptile: green shell with hex pattern. */
function TurtleSvg() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Royal Turtle mascot">
      {/* Back legs */}
      <ellipse cx="22" cy="86" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="98" cy="86" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      {/* Front legs */}
      <ellipse cx="30" cy="96" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="90" cy="96" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      {/* Tail */}
      <path d="M104 78 q10 0 8 -8" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Shell — base */}
      <ellipse cx="60" cy="74" rx="42" ry="28" fill="#a16207" stroke="#3f2c0a" strokeWidth="2" />
      {/* Shell — top dome with green tint */}
      <path
        d="M22 74 q0 -28 38 -28 q38 0 38 28 z"
        fill="#15803d"
        stroke="#14532d"
        strokeWidth="2"
      />
      {/* Hex pattern on the shell */}
      <g stroke="#14532d" strokeWidth="1.4" fill="#22c55e">
        <polygon points="60,52 70,57 70,67 60,72 50,67 50,57" />
        <polygon points="40,58 48,62 48,70 40,74 32,70 32,62" />
        <polygon points="80,58 88,62 88,70 80,74 72,70 72,62" />
      </g>
      {/* Head */}
      <circle cx="14" cy="74" r="13" fill="#84cc16" stroke="#365314" strokeWidth="2" />
      {/* Mouth */}
      <path d="M4 78 q5 4 10 0" stroke="#365314" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyes — on head looking up-left, friendly */}
      <FriendlyEye cx={12} cy={70} r={4.5} />
      <FriendlyEye cx={22} cy={70} r={4.5} />
      {/* Cheek blush */}
      <circle cx="10" cy="78" r="2" fill="#ef4444" opacity="0.4" />
      <circle cx="22" cy="78" r="2" fill="#ef4444" opacity="0.4" />
    </svg>
  );
}
