import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Cloud,
  Heart,
  Play,
  RotateCw,
  Sparkles,
  Star,
  Sun,
  Volume2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * THE WORD POPPER · ប៉ោងប៉ោងពាក្យ
 *
 * A fast-paced English vocabulary game for kids. A target word in Khmer
 * floats at the top of the sky; colourful balloons rise from below
 * carrying English words. Tap the balloon whose English word matches
 * the Khmer target before it floats off the top.
 *
 * Levels:
 *   1. Animals (សត្វ)
 *   2. Colors  (ពណ៌)
 *   3. Family  (គ្រួសារ)
 *
 * Audio: speakText() reads the popped English word aloud.
 * Aesthetic: pastel sky, sun, drifting clouds, glossy balloons,
 * confetti pop on success, gentle wobble on miss.
 * ────────────────────────────────────────────────────────────────────── */

type LevelId = 1 | 2 | 3;
type Word = { en: string; kh: string };
type Level = {
  id: LevelId;
  titleEn: string;
  titleKh: string;
  emoji: string;
  words: Word[];
};

const LEVELS: Level[] = [
  {
    id: 1,
    titleEn: "Animals",
    titleKh: "សត្វ",
    emoji: "🐾",
    words: [
      { en: "Dog",      kh: "ឆ្កែ" },
      { en: "Cat",      kh: "ឆ្មា" },
      { en: "Bird",     kh: "បក្សី" },
      { en: "Cow",      kh: "គោ" },
      { en: "Fish",     kh: "ត្រី" },
      { en: "Horse",    kh: "សេះ" },
      { en: "Pig",      kh: "ជ្រូក" },
      { en: "Elephant", kh: "ដំរី" },
      { en: "Monkey",   kh: "ស្វា" },
      { en: "Chicken",  kh: "មាន់" },
    ],
  },
  {
    id: 2,
    titleEn: "Colors",
    titleKh: "ពណ៌",
    emoji: "🎨",
    words: [
      { en: "Red",    kh: "ក្រហម" },
      { en: "Blue",   kh: "ខៀវ" },
      { en: "Green",  kh: "បៃតង" },
      { en: "Yellow", kh: "លឿង" },
      { en: "Black",  kh: "ខ្មៅ" },
      { en: "White",  kh: "ស" },
      { en: "Orange", kh: "ទឹកក្រូច" },
      { en: "Purple", kh: "ស្វាយ" },
      { en: "Pink",   kh: "ផ្កាឈូក" },
      { en: "Brown",  kh: "ត្នោត" },
    ],
  },
  {
    id: 3,
    titleEn: "Family",
    titleKh: "គ្រួសារ",
    emoji: "👨‍👩‍👧‍👦",
    words: [
      { en: "Mother",      kh: "ម្តាយ" },
      { en: "Father",      kh: "ឪពុក" },
      { en: "Brother",     kh: "បងប្អូនប្រុស" },
      { en: "Sister",      kh: "បងប្អូនស្រី" },
      { en: "Grandmother", kh: "យាយ" },
      { en: "Grandfather", kh: "តា" },
      { en: "Baby",        kh: "ទារក" },
      { en: "Friend",      kh: "មិត្ត" },
      { en: "Aunt",        kh: "មីង" },
      { en: "Uncle",       kh: "ពូ" },
    ],
  },
];

// Glossy balloon palette — high-contrast against a sky-blue backdrop.
const BALLOON_COLORS = [
  { from: "#ef4444", to: "#7f1d1d" }, // red
  { from: "#f59e0b", to: "#78350f" }, // amber
  { from: "#facc15", to: "#713f12" }, // yellow
  { from: "#22c55e", to: "#14532d" }, // green
  { from: "#06b6d4", to: "#164e63" }, // cyan
  { from: "#8b5cf6", to: "#3b0764" }, // violet
  { from: "#ec4899", to: "#831843" }, // pink
  { from: "#f97316", to: "#7c2d12" }, // orange
];

const BALLOONS_PER_ROUND = 4;
const BALLOON_FLOAT_SECONDS = 9;       // how long a balloon takes to cross the screen
const NEW_ROUND_DELAY_MS = 650;        // pause after a hit before the next round

type Balloon = {
  id: number;
  word: Word;
  isCorrect: boolean;
  leftPct: number;       // horizontal position (5 .. 90)
  color: { from: string; to: string };
  delaySec: number;      // staggered launch
};

type Round = {
  id: number;
  target: Word;
  balloons: Balloon[];
};

type Pop = { id: number; x: number; y: number; color: string };

let _id = 0;
const nextId = () => ++_id;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(level: Level): Round {
  const pool = shuffle(level.words);
  const target = pool[0];
  const distractors = pool.slice(1, BALLOONS_PER_ROUND);
  const words = shuffle([target, ...distractors]);

  // Spread balloons across roughly equal horizontal slots so they don't
  // overlap on launch, then jitter inside each slot for a natural feel.
  const slots = words.length;
  const slotWidth = 80 / slots; // use 5%..85% of the width
  const balloons: Balloon[] = words.map((w, i) => ({
    id: nextId(),
    word: w,
    isCorrect: w.en === target.en,
    leftPct: 5 + slotWidth * i + Math.random() * (slotWidth * 0.55),
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    delaySec: i * 0.35 + Math.random() * 0.4,
  }));

  return { id: nextId(), target, balloons };
}

/* ────────────────────────────────────────────────────────────────────── */

export default function WordPopperPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [levelId, setLevelId] = useState<LevelId>(1);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [round, setRound] = useState<Round | null>(null);
  const [pops, setPops] = useState<Pop[]>([]);

  const level = useMemo(() => LEVELS.find((l) => l.id === levelId)!, [levelId]);
  const audioOnRef = useRef(true);

  // Refs that always hold the LATEST values, so that callbacks scheduled via
  // setTimeout (or fired by framer-motion's onAnimationComplete) never act on
  // stale closures. This prevents two specific bugs:
  //   • A queued nextRound() running after a level change and spawning a
  //     round from the *old* level.
  //   • A balloon's onAnimationComplete firing during AnimatePresence exit
  //     and being mis-counted as a "miss".
  const levelRef = useRef(level);
  useEffect(() => { levelRef.current = level; }, [level]);
  const roundRef = useRef<Round | null>(round);
  useEffect(() => { roundRef.current = round; }, [round]);

  // A single managed timeout for "schedule the next round after a tiny pause".
  // We always cancel any pending one before starting a new game, switching
  // level, restarting, or unmounting — so the wrong round never lands.
  const nextRoundTimer = useRef<number | null>(null);
  const clearPending = useCallback(() => {
    if (nextRoundTimer.current !== null) {
      window.clearTimeout(nextRoundTimer.current);
      nextRoundTimer.current = null;
    }
  }, []);
  const scheduleNextRound = useCallback(() => {
    clearPending();
    nextRoundTimer.current = window.setTimeout(() => {
      nextRoundTimer.current = null;
      setRound(buildRound(levelRef.current));
    }, NEW_ROUND_DELAY_MS);
  }, [clearPending]);
  // Make sure no timer survives unmount.
  useEffect(() => () => clearPending(), [clearPending]);

  // Start / restart the game.
  const startGame = useCallback(() => {
    clearPending();
    setScore(0);
    setMissed(0);
    setRunning(true);
    setRound(buildRound(levelRef.current));
  }, [clearPending]);

  // Handle level switch — if a game is already running, reset cleanly.
  function changeLevel(id: LevelId) {
    setLevelId(id);
    if (running) {
      clearPending();
      setScore(0);
      setMissed(0);
      const newLevel = LEVELS.find((l) => l.id === id)!;
      // Use the new level immediately rather than waiting for the levelRef
      // effect, so the spawned balloons are guaranteed to belong to it.
      levelRef.current = newLevel;
      setRound(buildRound(newLevel));
    }
  }

  // Tap handler from a balloon. Accepts any synthetic event so it can be
  // wired to BOTH `onClick` (desktop / fallback) and `onTouchStart` (instant
  // mobile response, no 300ms click-delay).
  function handleBalloonTap(b: Balloon, e: React.SyntheticEvent) {
    if (!roundRef.current) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const popX = rect.left + rect.width / 2;
    const popY = rect.top + rect.height / 2;

    if (b.isCorrect) {
      setScore((s) => s + 1);
      setPops((p) => [...p, { id: nextId(), x: popX, y: popY, color: b.color.from }]);
      if (audioOnRef.current) speakText(b.word.en);
      // Remove this round (which removes all the balloons) then schedule
      // the next round so the player gets a tiny rhythm pause between rounds.
      setRound(null);
      scheduleNextRound();
    } else {
      // Wrong tap: tiny shake on the balloon, no score change.
      target.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-8px) rotate(-3deg)" },
          { transform: "translateX(8px) rotate(3deg)" },
          { transform: "translateX(0)" },
        ],
        { duration: 320, easing: "ease-in-out" },
      );
    }
  }

  // A balloon's natural upward animation completed (it floated off the top).
  // Gate strictly on the *current* round (via ref) AND on the balloon still
  // being a member of that round — this filters out callbacks fired during
  // AnimatePresence exit when the round was already cleared by a tap.
  function handleBalloonExpire(b: Balloon) {
    const cur = roundRef.current;
    if (!cur) return;
    if (!cur.balloons.some((x) => x.id === b.id)) return;
    if (b.isCorrect) {
      // Player missed the right one — count a miss and move on.
      setMissed((m) => m + 1);
      setRound(null);
      scheduleNextRound();
    } else {
      // A distractor floated away — just drop it from the field.
      setRound((r) =>
        r ? { ...r, balloons: r.balloons.filter((x) => x.id !== b.id) } : r,
      );
    }
  }

  // Speak the target word once at the start of every round (helpful for
  // very young players who can't read Khmer fluently yet).
  useEffect(() => {
    if (!running || !round || !audioOnRef.current) return;
    // (We deliberately speak the *English* target here too, so the player
    // can connect spoken English to the Khmer target on screen.)
    speakText(round.target.en);
  }, [running, round]);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100 text-slate-900 touch-manipulation"
      style={{ touchAction: "manipulation" }}
    >
      {/* Decorative sky */}
      <SkyBackdrop />

      {/*
        ── HUD wrapper: NO stacking context ──────────────────────────────
        We deliberately drop the `z-20` here so this wrapper does NOT form
        its own stacking context. That lets us layer individual children
        relative to the page root: the target card stays low (so balloons
        can rise visually IN FRONT of it) while interactive controls
        (back link, level buttons, score, restart bar) get a high z-index
        and stay reliably tappable above the rising balloon field.
      */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Back link — z-30 so a balloon drifting past can't steal the tap */}
        <Link
          href="/"
          className="relative z-30 inline-flex items-center gap-2 text-sm font-bold text-sky-900/80 hover:text-sky-900 transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "ត្រឡប់ទំព័រដើម" : "Back to Home"}</span>
          <span className={`text-sky-900/40 ${kh ? "" : "font-khmer"}`}>
            · {kh ? "Back to Home" : "ត្រឡប់ទំព័រដើម"}
          </span>
        </Link>

        {/* Hero */}
        <header className="mt-4 sm:mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-sky-200 px-4 py-1.5 text-xs sm:text-sm font-bold text-sky-900 backdrop-blur shadow-sm">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>FOR KIDS · WORD GAME</span>
            <span className="font-khmer text-sky-900/80">· សម្រាប់ក្មេង · ហ្គេមពាក្យ</span>
          </div>

          <h1
            className="mt-3 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
            data-testid="page-title"
          >
            <span className="block">
              The Word{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Popper
              </span>
            </span>
            <span className="block font-khmer text-2xl sm:text-3xl md:text-4xl text-sky-900/85 mt-1 leading-snug">
              ប៉ោងប៉ោងពាក្យ
            </span>
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-sky-950/80">
            {kh
              ? "មើលពាក្យខ្មែរនៅខាងលើ បន្ទាប់មកចុចប៉ោងប៉ោងដែលមានពាក្យអង់គ្លេសត្រឹមត្រូវ មុនពេលវាហោះចេញពីលើមេឃ!"
              : "Look at the Khmer word at the top, then tap the balloon with the correct English word before it floats off the top of the sky!"}
          </p>
          <p className={`mt-1 max-w-2xl mx-auto text-xs text-sky-900/60 ${kh ? "" : "font-khmer leading-loose"}`}>
            {kh
              ? "Look at the Khmer word above, then tap the balloon with the correct English word!"
              : "មើលពាក្យខ្មែរនៅខាងលើ បន្ទាប់មកចុចប៉ោងប៉ោងដែលមានពាក្យអង់គ្លេសត្រឹមត្រូវ!"}
          </p>
        </header>

        {/* HUD: levels + score — z-30 keeps these controls tappable above balloons */}
        <div className="relative z-30 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="group"
            aria-label="Choose level · ជ្រើសកម្រិត"
          >
            {LEVELS.map((l) => {
              const active = l.id === levelId;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => changeLevel(l.id)}
                  aria-pressed={active}
                  data-testid={`btn-level-${l.id}`}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30 ${
                    active
                      ? "bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                      : "bg-white/80 border-sky-200 text-sky-900 hover:border-sky-400/70 hover:bg-white"
                  }`}
                >
                  <span aria-hidden="true">{l.emoji}</span>
                  <span>
                    {kh ? `កម្រិត ${l.id}` : `Level ${l.id}`}: {l.titleEn}
                  </span>
                  <span className={`text-[11px] opacity-80 ${kh ? "" : "font-khmer"}`}>
                    · {l.titleKh}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center gap-3 bg-white/85 border-2 border-sky-200 rounded-2xl px-4 py-2 shadow"
            data-testid="hud-score"
            role="status"
            aria-live="polite"
            aria-label={`Score ${score}, missed ${missed} · ពិន្ទុ ${score} ខកខាន ${missed}`}
          >
            <div className="flex items-center gap-1.5 text-amber-600">
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-600" aria-hidden="true" />
              <span
                className="font-mono font-black text-xl tabular-nums"
                data-testid="text-score"
              >
                {score}
              </span>
              <span className="sr-only">points / ពិន្ទុ</span>
            </div>
            <div className="text-slate-300 text-xl leading-none" aria-hidden="true">·</div>
            <div className="flex items-center gap-1.5 text-rose-500">
              <Heart className="w-5 h-5 fill-rose-300 stroke-rose-500" aria-hidden="true" />
              <span
                className="font-mono font-black text-xl tabular-nums"
                data-testid="text-missed"
              >
                {missed}
              </span>
              <span className="sr-only">missed / ខកខាន</span>
            </div>
          </div>
        </div>

        {/* Target word card (only while running) */}
        <div className="mt-6 flex justify-center min-h-[140px]">
          <AnimatePresence mode="wait">
            {running && round ? (
              <motion.div
                key={round.id}
                initial={{ scale: 0.6, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                // ── pointer-events: none ───────────────────────────────────
                // The target word card sits visually in the center of the
                // screen, but rising balloons can pass right under (or over)
                // it. Disabling pointer events here lets a kid's finger tap
                // straight THROUGH the card and register on the balloon
                // below. The card stays fully visible — it just becomes
                // tap-transparent.
                className="relative pointer-events-none"
                data-testid="target-card"
              >
                <div className="absolute inset-0 -m-2 rounded-3xl bg-gradient-to-br from-rose-300 via-amber-200 to-sky-300 opacity-60 blur-xl" aria-hidden="true" />
                <div className="relative bg-white rounded-3xl border-4 border-sky-300 shadow-2xl px-8 sm:px-12 py-5 sm:py-6 text-center">
                  <p className="text-[11px] sm:text-xs font-black tracking-widest text-sky-700/80 uppercase">
                    {kh ? "រកឃ្លាអង់គ្លេសសម្រាប់" : "Find the English word for"}
                    <span className="block font-khmer text-sky-700/60 mt-0.5 normal-case tracking-normal text-[10px]">
                      {kh ? "Find the English word for" : "រកឃ្លាអង់គ្លេសសម្រាប់"}
                    </span>
                  </p>
                  <p
                    className="font-khmer mt-1 text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-tight"
                    data-testid="text-target-kh"
                  >
                    {round.target.kh}
                  </p>
                </div>
              </motion.div>
            ) : (
              <StartCard kh={kh} level={level} onStart={startGame} />
            )}
          </AnimatePresence>
        </div>

        {/* Game zone hint while running — always bilingual */}
        {running && round && (
          <p className="mt-3 text-center text-xs text-sky-900/70">
            <span className="font-bold">
              {kh
                ? "ចុចប៉ោងប៉ោងដែលត្រឹមត្រូវមុនវាបាត់!"
                : "Tap the right balloon before it disappears!"}
            </span>
            <span className={`ml-2 opacity-70 ${kh ? "" : "font-khmer"}`}>
              ·{" "}
              {kh
                ? "Tap the right balloon before it disappears!"
                : "ចុចប៉ោងប៉ោងដែលត្រឹមត្រូវមុនវាបាត់!"}
            </span>
          </p>
        )}
      </div>

      {/* ── Balloon field ─────────────────────────────────────────────
          A full-screen layer behind the HUD. Each balloon owns its own
          framer-motion animation that rises from below the viewport to
          well above it; on completion we treat it as "missed". */}
      {running && round && (
        // z-20 sits ABOVE the target card (which now has no explicit z and
        // therefore stacks at the page-root baseline) but BELOW the
        // interactive HUD controls (back link / level buttons / score /
        // restart bar — all at z-30). Net effect: balloons render
        // visually in front of the central target word, while the
        // surrounding tappable controls stay reliably tappable even when
        // a balloon happens to drift past them. The pop-confetti overlay
        // below sits at z-50 so the celebration always plays on top.
        <div
          className="pointer-events-none fixed inset-0 z-20 overflow-hidden touch-manipulation"
          style={{ touchAction: "manipulation" }}
          aria-hidden="false"
        >
          <AnimatePresence>
            {round.balloons.map((b) => (
              <BalloonFloater
                key={b.id}
                balloon={b}
                onTap={(e) => handleBalloonTap(b, e)}
                onExpire={() => handleBalloonExpire(b)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pop confetti overlay — z-50 so it sits above the balloon field */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {pops.map((p) => (
            <PopBurst
              key={p.id}
              x={p.x}
              y={p.y}
              color={p.color}
              onDone={() => setPops((arr) => arr.filter((x) => x.id !== p.id))}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom restart bar (only when running) */}
      {running && (
        <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 mt-6 flex justify-center">
          <button
            type="button"
            onClick={startGame}
            data-testid="btn-restart"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white border-2 border-sky-300 text-sky-900 font-bold px-5 py-2.5 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/40"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
            <span>{kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Restart"}</span>
            <span className={`text-xs opacity-70 ${kh ? "" : "font-khmer"}`}>
              · {kh ? "Restart" : "ចាប់ផ្ដើមឡើងវិញ"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Sub-components                                                        */
/* ────────────────────────────────────────────────────────────────────── */

function StartCard({
  kh,
  level,
  onStart,
}: {
  kh: boolean;
  level: Level;
  onStart: () => void;
}) {
  return (
    <motion.div
      key="start"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="bg-white/95 backdrop-blur rounded-3xl border-4 border-sky-300 shadow-2xl p-6 sm:p-8 text-center max-w-md"
      data-testid="card-start"
    >
      <div className="text-5xl mb-2" aria-hidden="true">{level.emoji}</div>
      <p className="text-xs font-black tracking-widest text-sky-700/80 uppercase">
        {kh ? `កម្រិត ${level.id}` : `Level ${level.id}`}
      </p>
      <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
        {level.titleEn}
        <span className="block font-khmer text-lg text-sky-900/80 mt-0.5">
          {level.titleKh}
        </span>
      </h2>
      <button
        type="button"
        onClick={onStart}
        data-testid="btn-start"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white px-6 py-3 font-bold shadow-lg ring-1 ring-rose-300/40 hover:scale-[1.03] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400/50"
      >
        <Play className="w-5 h-5 fill-white" aria-hidden="true" />
        <span>{kh ? "ចាប់ផ្ដើមលេង" : "Start Game"}</span>
        <span className={`text-xs opacity-90 ${kh ? "" : "font-khmer"}`}>
          · {kh ? "Start Game" : "ចាប់ផ្ដើមលេង"}
        </span>
      </button>
      <p className="mt-3 text-xs text-sky-900/70 leading-relaxed">
        <span className="font-bold">
          {kh
            ? "ចុចប៉ោងប៉ោងដែលមានពាក្យអង់គ្លេសត្រឹមត្រូវ។"
            : "Tap the balloon with the correct English word."}
        </span>
        <span className={`block opacity-70 ${kh ? "" : "font-khmer"}`}>
          {kh
            ? "Tap the balloon with the correct English word."
            : "ចុចប៉ោងប៉ោងដែលមានពាក្យអង់គ្លេសត្រឹមត្រូវ។"}
        </span>
      </p>
    </motion.div>
  );
}

function BalloonFloater({
  balloon,
  onTap,
  onExpire,
}: {
  balloon: Balloon;
  // Widened from MouseEvent to SyntheticEvent so we can wire BOTH
  // `onClick` (desktop / fallback) and `onTouchStart` (instant mobile)
  // through the same handler.
  onTap: (e: React.SyntheticEvent) => void;
  onExpire: () => void;
}) {
  // Subtle horizontal sway as the balloon rises.
  const swayPx = useMemo(() => 18 + Math.random() * 18, []);
  const swayDur = useMemo(() => 2.4 + Math.random() * 1.2, []);

  // ── Tap de-duplication ────────────────────────────────────────────────
  // On mobile the browser fires `touchstart` → `touchend` → synthetic
  // `click`. We want INSTANT response on `touchstart` (no 300ms click
  // delay, no chance of the balloon drifting away while the browser
  // waits to see if it was a double-tap), but we must make sure the
  // synthetic click that follows doesn't fire `onTap` a second time —
  // otherwise a wrong-balloon would shake twice. A simple ref-based
  // latch is the safest solution: the first event wins, the second is
  // ignored, no preventDefault gymnastics required.
  const consumedRef = useRef(false);
  const handleTap = (e: React.SyntheticEvent) => {
    if (consumedRef.current) return;
    consumedRef.current = true;
    onTap(e);
  };

  return (
    <motion.div
      initial={{ y: "115vh", opacity: 0 }}
      animate={{ y: "-25vh", opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        y: {
          duration: BALLOON_FLOAT_SECONDS,
          ease: "linear",
          delay: balloon.delaySec,
        },
        opacity: { duration: 0.4, delay: balloon.delaySec },
      }}
      onAnimationComplete={(def) => {
        // framer-motion calls this for both the natural rise AND the
        // AnimatePresence exit. We only want to treat the *rise* as
        // expiry — exits happen when the parent already cleared the
        // round (e.g. after a successful pop) and must NOT count as
        // missed. The rise definition contains a `y` key; the exit
        // definition does not. Combined with the parent's round-
        // membership gate, this is belt-and-suspenders safe.
        if (def && typeof def === "object" && "y" in (def as Record<string, unknown>)) {
          onExpire();
        }
      }}
      style={{ left: `${balloon.leftPct}%`, touchAction: "manipulation" }}
      className="absolute pointer-events-auto select-none touch-manipulation"
    >
      <motion.button
        type="button"
        // ── Hitbox & touch optimisation ───────────────────────────────
        //   • `onTouchStart` fires the millisecond a finger touches the
        //     screen — no 300ms click-delay, no double-tap-zoom wait.
        //   • `onClick` is kept as the desktop / mouse fallback.
        //   • `consumedRef` (above) blocks the duplicate synthetic click
        //     that follows `touchstart` on mobile.
        //   • `touch-action: manipulation` disables the browser's own
        //     double-tap-to-zoom gesture, which otherwise eats rapid
        //     taps during a fast-paced game.
        //   • `p-3` adds 12px of generous padding around the SVG so the
        //     hitbox extends past the balloon's visual edge — easy for
        //     small fingers, even if the kid taps the string or the
        //     glossy highlight near the edge.
        onClick={handleTap}
        onTouchStart={handleTap}
        style={{ touchAction: "manipulation" }}
        data-testid={`balloon-${balloon.word.en.toLowerCase()}`}
        aria-label={`${balloon.word.en} (${balloon.word.kh}) balloon · ប៉ោងប៉ោង`}
        animate={{ x: [0, swayPx, -swayPx, 0] }}
        transition={{
          x: { duration: swayDur, ease: "easeInOut", repeat: Infinity },
        }}
        className="relative block group rounded-full p-3 -m-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300"
      >
        <Balloon color={balloon.color} word={balloon.word.en} />
      </motion.button>
    </motion.div>
  );
}

function Balloon({
  color,
  word,
}: {
  color: { from: string; to: string };
  word: string;
}) {
  return (
    <div className="relative" style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.18))" }}>
      <svg
        viewBox="0 0 120 170"
        width="92"
        height="130"
        className="block group-hover:scale-105 group-active:scale-95 transition-transform duration-150"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`g-${word}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor={color.from} stopOpacity="1" />
            <stop offset="100%" stopColor={color.to} stopOpacity="1" />
          </radialGradient>
        </defs>
        {/* Body */}
        <ellipse cx="60" cy="62" rx="48" ry="56" fill={`url(#g-${word})`} stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
        {/* Highlight */}
        <ellipse cx="42" cy="40" rx="12" ry="18" fill="rgba(255,255,255,0.55)" />
        {/* Knot */}
        <polygon points="55,118 65,118 60,128" fill={color.to} />
        {/* String */}
        <path d="M60 128 C 55 140, 65 150, 60 168" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" fill="none" />
      </svg>
      {/* Word label centered on balloon body */}
      <span
        className="absolute inset-x-0 top-[28%] text-center font-display font-black text-white text-lg sm:text-xl tracking-tight pointer-events-none"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
      >
        {word}
      </span>
    </div>
  );
}

function PopBurst({
  x,
  y,
  color,
  onDone,
}: {
  x: number;
  y: number;
  color: string;
  onDone: () => void;
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 60 + Math.random() * 50;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          rot: Math.random() * 360,
          hue: Math.random() < 0.5 ? color : "#fbbf24",
        };
      }),
    [color],
  );

  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onAnimationComplete={onDone}
    >
      {/* Big POP! text */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-3xl sm:text-4xl"
        style={{ color, textShadow: "0 2px 4px rgba(0,0,0,0.35)" }}
      >
        POP!
      </motion.div>
      {/* +1 score float */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -42, opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute left-1/2 -translate-x-1/2 -top-8 font-display font-black text-amber-500 text-2xl"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
      >
        +1 ⭐
      </motion.div>
      {/* Confetti */}
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, rotate: p.rot }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute left-0 top-0 w-2 h-3 rounded-sm"
          style={{ background: p.hue }}
        />
      ))}
    </motion.div>
  );
}

function SkyBackdrop() {
  // Sun + drifting clouds.
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16">
        <Sun className="w-20 h-20 sm:w-28 sm:h-28 text-amber-300 drop-shadow-[0_0_24px_rgba(251,191,36,0.55)] animate-pulse" />
      </div>
      <DriftCloud className="left-[-10%] top-[14%] w-32 sm:w-48 text-white/80" durationSec={45} />
      <DriftCloud className="left-[-20%] top-[28%] w-24 sm:w-36 text-white/65" durationSec={60} />
      <DriftCloud className="left-[-15%] top-[44%] w-40 sm:w-56 text-white/85" durationSec={55} />
      <DriftCloud className="left-[-25%] top-[60%] w-28 sm:w-40 text-white/70" durationSec={50} />
      {/* Hill silhouettes at the bottom */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-32 sm:h-44 text-emerald-300/70"
      >
        <path
          d="M0 140 C 200 60, 360 180, 560 120 S 900 40, 1100 130 S 1340 80, 1440 140 L1440 200 L0 200 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 text-emerald-400/85"
      >
        <path
          d="M0 170 C 200 110, 360 200, 560 160 S 900 110, 1100 170 S 1340 130, 1440 180 L1440 200 L0 200 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function DriftCloud({
  className = "",
  durationSec = 50,
}: {
  className?: string;
  durationSec?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: 0 }}
      animate={{ x: "130vw" }}
      transition={{ duration: durationSec, repeat: Infinity, ease: "linear" }}
    >
      <Cloud className="w-full h-auto fill-current" aria-hidden="true" />
    </motion.div>
  );
}
