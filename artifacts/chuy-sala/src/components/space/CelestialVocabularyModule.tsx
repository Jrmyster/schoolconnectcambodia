import { useEffect, useRef, useState } from "react";
import { Volume2, Sparkles, Headphones } from "lucide-react";
import { speakText, loadVoicesAsync } from "@/lib/speech";

/* ══════════════════════════════════════════════════════════════════════════
 * Celestial Vocabulary Bank — Native TTS pronunciation trainer
 * កម្រងពាក្យ — អ្នកបង្រៀនការបញ្ចេញសំឡេងដោយ TTS ដើម
 *
 * - Sun + 8 planets, English + Khmer always shown together (strict bilingual).
 * - Click a card → window.speechSynthesis speaks the English name (en-US, 0.85).
 * - Speech is cancelled on each new tap, so rapid clicks don't overlap.
 * - Active card glows with a coloured halo until the utterance ends.
 * - Falls back gracefully if the browser has no speech-synthesis API.
 * ══════════════════════════════════════════════════════════════════════════ */

type Body = {
  id: string;
  en: string;
  kh: string;
  /** Visual gradient for the orb */
  orb: string;
  /** Halo glow colour for the active state */
  halo: string;
  /** Optional ring (Saturn) */
  ring?: boolean;
  /** Relative size 0.4 – 1.0 */
  size: number;
};

const BODIES: Body[] = [
  { id: "sun",     en: "Sun",     kh: "ព្រះអាទិត្យ",   orb: "radial-gradient(circle at 35% 35%, #fff7d6 0%, #fcd34d 30%, #f59e0b 65%, #b45309 100%)", halo: "#fbbf24", size: 1.00 },
  { id: "mercury", en: "Mercury", kh: "ភពពុធ",        orb: "radial-gradient(circle at 35% 35%, #f1f5f9 0%, #94a3b8 45%, #475569 100%)",                  halo: "#94a3b8", size: 0.45 },
  { id: "venus",   en: "Venus",   kh: "ភពសុក្រ",       orb: "radial-gradient(circle at 35% 35%, #fde68a 0%, #f59e0b 50%, #92400e 100%)",                  halo: "#fcd34d", size: 0.62 },
  { id: "earth",   en: "Earth",   kh: "ផែនដី",        orb: "radial-gradient(circle at 35% 35%, #bae6fd 0%, #38bdf8 45%, #1d4ed8 100%)",                  halo: "#38bdf8", size: 0.65 },
  { id: "mars",    en: "Mars",    kh: "ភពអង្គារ",     orb: "radial-gradient(circle at 35% 35%, #fecaca 0%, #ef4444 45%, #7f1d1d 100%)",                  halo: "#ef4444", size: 0.55 },
  { id: "jupiter", en: "Jupiter", kh: "ភពព្រហស្បតិ៍",  orb: "radial-gradient(circle at 30% 30%, #fde68a 0%, #f59e0b 35%, #b45309 70%, #78350f 100%)",     halo: "#fbbf24", size: 0.95 },
  { id: "saturn",  en: "Saturn",  kh: "ភពសៅរ៍",        orb: "radial-gradient(circle at 35% 35%, #fef3c7 0%, #facc15 40%, #a16207 100%)",                 halo: "#fde047", size: 0.85, ring: true },
  { id: "uranus",  en: "Uranus",  kh: "ភពអ៊ុយរ៉ានុស",   orb: "radial-gradient(circle at 35% 35%, #cffafe 0%, #67e8f9 45%, #0e7490 100%)",                 halo: "#22d3ee", size: 0.72 },
  { id: "neptune", en: "Neptune", kh: "ភពណិបទូន",      orb: "radial-gradient(circle at 35% 35%, #c7d2fe 0%, #6366f1 40%, #1e3a8a 100%)",                 halo: "#818cf8", size: 0.70 },
];

export function CelestialVocabularyModule() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean>(true);
  /** Track which utterance is current — avoids stale onEnd callbacks clearing
   *  the halo of a *newer* tap that arrived before the old one finished. */
  const tokenRef = useRef(0);
  /** Earliest wall-time we may auto-clear the active state. Guarantees the
   *  user (and headless browsers without TTS voices that fire `error`
   *  immediately) sees the visual click feedback for at least this long. */
  const minClearAtRef = useRef<number>(0);
  const pendingTimerRef = useRef<number | null>(null);
  /** Hard upper bound on how long the active glow can stay before we force
   *  it off. Protects against TTS engines that never fire `end`/`error`
   *  (rare browser bug, headless test environments). 4s comfortably covers
   *  even our longest word ("Mercury") at rate 0.85. */
  const fallbackTimerRef = useRef<number | null>(null);
  const MIN_ACTIVE_MS = 350;
  const FALLBACK_CLEAR_MS = 4000;

  // Probe TTS availability once after mount.
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance === "undefined") {
      setSupported(false);
      return;
    }
    // Voices may load async — we don't strictly need them, but warming the
    // list helps Chrome avoid a silent first-utterance.
    void loadVoicesAsync();
    // Cancel any leftover speech if the user navigates away.
    return () => {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
      if (pendingTimerRef.current !== null) {
        window.clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, []);

  /** Clear the active state, but never sooner than MIN_ACTIVE_MS after the
   *  last click — so the halo is always visible long enough to perceive. */
  function scheduleClear(token: number) {
    if (typeof window === "undefined") return;
    const now = Date.now();
    const delay = Math.max(0, minClearAtRef.current - now);
    if (pendingTimerRef.current !== null) window.clearTimeout(pendingTimerRef.current);
    pendingTimerRef.current = window.setTimeout(() => {
      pendingTimerRef.current = null;
      if (tokenRef.current === token) setActiveId(null);
    }, delay);
  }

  function handleSpeak(body: Body) {
    if (!supported) return;
    const myToken = ++tokenRef.current;
    minClearAtRef.current = Date.now() + MIN_ACTIVE_MS;
    setActiveId(body.id);
    if (pendingTimerRef.current !== null) {
      window.clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    const result = speakText(body.en, "en-US", {
      onEnd: () => scheduleClear(myToken),
      onError: () => scheduleClear(myToken),
    });
    if (!result.ok) {
      scheduleClear(myToken);
    } else {
      // Safety net: if the engine never reports end/error (rare browser bug
      // or stubbed environment), force a clear so the halo cannot get stuck.
      fallbackTimerRef.current = window.setTimeout(() => {
        fallbackTimerRef.current = null;
        scheduleClear(myToken);
      }, FALLBACK_CLEAR_MS);
    }
  }

  return (
    <section
      data-testid="celestial-vocabulary-module"
      aria-label="Celestial Vocabulary Bank — Sun and the eight planets / កម្រងពាក្យអវកាស — ព្រះអាទិត្យ និងភពទាំងប្រាំបី"
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <div
        className="relative rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(56, 189, 248, 0.18), transparent 60%)," +
            "radial-gradient(ellipse at 80% 100%, rgba(168, 85, 247, 0.18), transparent 55%)," +
            "linear-gradient(180deg, #050816 0%, #0b1130 50%, #0a0a1f 100%)",
        }}
      >
        <Starfield />

        {/* Header */}
        <header className="relative px-5 sm:px-7 pt-7 sm:pt-8 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-sky-500/15 ring-2 ring-sky-400/40 text-sky-300 flex items-center justify-center">
              <Headphones className="w-6 h-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-sky-300/80 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>Pronunciation Lab · ESL Vocabulary</span>
                <span aria-hidden className="opacity-50">·</span>
                <span className="font-khmer normal-case tracking-normal text-xs">
                  មន្ទីរពិសោធន៍ការបញ្ចេញសំឡេង · កម្រងពាក្យអង់គ្លេស
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-1 text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #fcd34d 0%, #38bdf8 50%, #a78bfa 100%)" }}>
                Celestial Vocabulary Bank
              </h2>
              <p className="font-khmer text-lg sm:text-xl text-amber-100/90 leading-loose mt-1">
                កម្រងពាក្យចំណុចប្រទាក់ក្រាហ្វិកអវកាស
              </p>
              <div className="mt-3 text-sm sm:text-base text-slate-200/85 max-w-3xl">
                <p>
                  Tap any planet to hear its English name spoken aloud. The voice
                  reads slightly slower than normal so you can catch every syllable
                  — perfect for tricky words like <em>Jupiter</em> and <em>Uranus</em>.
                </p>
                <p className="font-khmer text-base leading-loose text-slate-200/80 mt-1">
                  ចុចលើភពណាមួយដើម្បីស្តាប់ការបញ្ចេញសំឡេងជាភាសាអង់គ្លេស ។
                  សំឡេងនិយាយយឺតជាងធម្មតាបន្តិច ដើម្បីឱ្យអ្នកស្តាប់ឮរាល់ព្យាង្គ —
                  ល្អឥតខ្ចោះសម្រាប់ពាក្យពិបាកដូចជា <em>Jupiter</em> និង <em>Uranus</em> ។
                </p>
              </div>
            </div>
          </div>

          {!supported && (
            <div className="mt-4 rounded-lg border-2 border-amber-400/60 bg-amber-500/10 px-4 py-2.5 text-amber-100 text-sm">
              <BiliInline
                en="This browser does not support text-to-speech."
                kh="កម្មវិធីរុករកនេះមិនគាំទ្រ Text-to-Speech ទេ ។"
              />
            </div>
          )}
        </header>

        {/* Cards — horizontal scroll on small screens, grid on larger screens */}
        <div className="relative px-3 sm:px-5 pb-7">
          <ul
            data-testid="celestial-cards"
            className="
              flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-2 scroll-px-2
              sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none
              md:grid-cols-3 lg:grid-cols-3
            "
            style={{ scrollbarWidth: "thin" }}
          >
            {BODIES.map((b) => (
              <li
                key={b.id}
                className="snap-start flex-shrink-0 w-[180px] sm:w-auto"
              >
                <CelestialCard
                  body={b}
                  active={activeId === b.id}
                  onSpeak={handleSpeak}
                  disabled={!supported}
                />
              </li>
            ))}
          </ul>

          <p className="mt-2 text-center text-[11px] sm:text-xs text-slate-400">
            <BiliInline
              en="Tip: Tap again any time to repeat. Tap another planet to switch instantly."
              kh="គន្លឹះ ៖ ចុចម្តងទៀតដើម្បីស្តាប់ឡើងវិញ ។ ចុចភពផ្សេងដើម្បីប្តូរភ្លាមៗ ។"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Single celestial body card                                               */
/* ──────────────────────────────────────────────────────────────────────── */
function CelestialCard({
  body, active, onSpeak, disabled,
}: {
  body: Body;
  active: boolean;
  onSpeak: (b: Body) => void;
  disabled: boolean;
}) {
  const orbPx = Math.round(64 + body.size * 56); // 64 .. 120 px
  return (
    <button
      type="button"
      data-testid={`planet-${body.id}`}
      data-active={active ? "true" : "false"}
      onClick={() => onSpeak(body)}
      disabled={disabled}
      aria-label={`Pronounce ${body.en} · បញ្ចេញសំឡេង ${body.kh}`}
      aria-pressed={active}
      className={`
        group relative w-full rounded-2xl border-2 px-3 pt-5 pb-3
        flex flex-col items-center gap-3 transition-all duration-200 select-none
        ${active
          ? "border-sky-300 bg-white/10 scale-[1.03]"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Orb with halo */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: orbPx + 24, height: orbPx + 24 }}
      >
        {/* Glowing halo (animated) */}
        <span
          aria-hidden
          data-testid={`halo-${body.id}`}
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            active ? "opacity-100 animate-pulse" : "opacity-0"
          }`}
          style={{
            boxShadow: `0 0 0 3px ${body.halo}88, 0 0 32px 6px ${body.halo}aa, 0 0 64px 16px ${body.halo}55`,
          }}
        />
        {/* The orb itself */}
        <span
          aria-hidden
          className="rounded-full block"
          style={{
            width: orbPx,
            height: orbPx,
            background: body.orb,
            boxShadow: "inset -8px -10px 20px rgba(0,0,0,0.45)",
          }}
        />
        {/* Saturn's ring */}
        {body.ring && (
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full border-[3px] border-amber-200/80"
            style={{
              width: orbPx * 1.7,
              height: orbPx * 0.5,
              transform: "translate(-50%, -50%) rotate(-18deg)",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
            }}
          />
        )}
      </div>

      {/* English name + speaker icon */}
      <div className="flex items-center gap-1.5 text-white">
        <Volume2
          className={`w-4 h-4 transition-colors ${
            active ? "text-sky-300" : "text-sky-400/80 group-hover:text-sky-300"
          }`}
          aria-hidden
        />
        <span className="font-display text-base sm:text-lg font-extrabold tracking-wide">
          {body.en}
        </span>
        <span aria-hidden className="text-base leading-none" role="img">🔊</span>
      </div>

      {/* Khmer translation */}
      <span className="font-khmer text-sm sm:text-base text-amber-100/90 leading-loose -mt-2">
        {body.kh}
      </span>

      {/* Active "now playing" pill — bilingual */}
      <span
        className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide transition-opacity ${
          active ? "opacity-100 bg-sky-400 text-slate-900" : "opacity-0"
        }`}
        aria-hidden={!active}
      >
        <Sparkles className="w-3 h-3" aria-hidden />
        <span className="uppercase">Playing</span>
        <span aria-hidden className="opacity-60">·</span>
        <span className="font-khmer normal-case">កំពុងចាក់</span>
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Inline bilingual helper                                                  */
/* ──────────────────────────────────────────────────────────────────────── */
function BiliInline({ en, kh, className = "" }: { en: string; kh: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0 ${className}`}>
      <span>{en}</span>
      <span aria-hidden className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Decorative starfield                                                     */
/* ──────────────────────────────────────────────────────────────────────── */
function Starfield() {
  // Deterministic star positions so SSR/hydration stays stable.
  const stars = Array.from({ length: 60 }, (_, i) => {
    const x = ((i * 37) % 100);
    const y = ((i * 71) % 100);
    const r = ((i % 5) === 0) ? 1.6 : (i % 3 === 0 ? 1.1 : 0.7);
    const o = 0.35 + ((i * 13) % 100) / 200;
    return { x, y, r, o };
  });
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.18} fill="#ffffff" opacity={s.o} />
      ))}
    </svg>
  );
}
