import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Leaf,
  RotateCw,
  Sparkles,
  Trees,
  Waves,
  XCircle,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
 * THE HABITAT SORTER · ផ្ទះសត្វ
 *
 * A drag-and-drop science game for kids. Two big habitat zones —
 * "The River (ទន្លេ)" and "The Jungle (ព្រៃ)" — sit at the top of the
 * screen. A deck of animal cards waits at the bottom. The student
 * drags each animal card into its correct habitat:
 *
 *   • Correct drop → card snaps into the habitat with a happy bounce,
 *                    a +1 floats up at the drop point, a small chime
 *                    plays, and the score ticks up.
 *   • Wrong drop  → the card slides back to the deck, a gentle low
 *                    buzzer plays, and a mistake is recorded.
 *
 * All animal names + habitat names are bilingual (English + ខ្មែរ).
 * ────────────────────────────────────────────────────────────────────── */

type Habitat = "river" | "jungle";

type Animal = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  habitat: Habitat;
};

const ALL_ANIMALS: Animal[] = [
  // River
  { id: "fish",      en: "Fish",      kh: "ត្រី",     emoji: "🐟", habitat: "river" },
  { id: "frog",      en: "Frog",      kh: "កង្កែប",   emoji: "🐸", habitat: "river" },
  { id: "crocodile", en: "Crocodile", kh: "ក្រពើ",    emoji: "🐊", habitat: "river" },
  { id: "duck",      en: "Duck",      kh: "ទា",       emoji: "🦆", habitat: "river" },
  { id: "turtle",    en: "Turtle",    kh: "អណ្ដើក",  emoji: "🐢", habitat: "river" },
  // Jungle
  { id: "tiger",    en: "Tiger",    kh: "ខ្លា",  emoji: "🐅", habitat: "jungle" },
  { id: "monkey",   en: "Monkey",   kh: "ស្វា",  emoji: "🐒", habitat: "jungle" },
  { id: "elephant", en: "Elephant", kh: "ដំរី",  emoji: "🐘", habitat: "jungle" },
  { id: "snake",    en: "Snake",    kh: "ពស់",   emoji: "🐍", habitat: "jungle" },
  { id: "bird",     en: "Bird",     kh: "បក្សី", emoji: "🦜", habitat: "jungle" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Tiny Web Audio helpers (no asset files) ──────────────────────── */

let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (_audioCtx) return _audioCtx;
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    _audioCtx = new Ctor();
  } catch {
    return null;
  }
  return _audioCtx;
}

function playHappyChime(): void {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const now = ctx.currentTime;
  // Two-note ascending sine chime — friendly and short.
  [
    { freq: 660, t: 0 },
    { freq: 990, t: 0.08 },
  ].forEach(({ freq, t }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + t);
    gain.gain.setValueAtTime(0.0001, now + t);
    gain.gain.exponentialRampToValueAtTime(0.18, now + t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.45);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + t);
    osc.stop(now + t + 0.5);
  });
}

function playGentleBuzzer(): void {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  // Soft sawtooth descending from 170 Hz to 95 Hz — clearly "wrong"
  // without being harsh or scary.
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(170, now);
  osc.frequency.exponentialRampToValueAtTime(95, now + 0.28);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.34);
}

/* ────────────────────────────────────────────────────────────────────── */

type Floater = { id: number; x: number; y: number; kind: "good" | "bad" };
let _fid = 0;

export default function HabitatSorterPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [deck, setDeck] = useState<Animal[]>(() => shuffle(ALL_ANIMALS));
  const [river, setRiver] = useState<Animal[]>([]);
  const [jungle, setJungle] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const [flashZone, setFlashZone] = useState<{ zone: Habitat; ok: boolean } | null>(
    null,
  );
  // Click-to-select alternative input mode. When a card is selected
  // (by tap/click/Enter without dragging), tapping a zone places it.
  // This is the keyboard-accessible path AND a tap-only fallback for
  // young children who struggle with drag gestures.
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const riverZoneRef = useRef<HTMLDivElement | null>(null);
  const jungleZoneRef = useRef<HTMLDivElement | null>(null);
  const flashTimer = useRef<number | null>(null);
  // Track all pending floater removal timers so we can cancel them on
  // reset/unmount and avoid stale state updates.
  const floaterTimers = useRef<Set<number>>(new Set());

  // Hit-test pointer position against the two zone bounding boxes.
  // Returns the zone the pointer was over, or null if neither.
  const hitTest = useCallback((clientX: number, clientY: number): Habitat | null => {
    const inside = (r: DOMRect | undefined) =>
      !!r &&
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom;
    if (inside(riverZoneRef.current?.getBoundingClientRect())) return "river";
    if (inside(jungleZoneRef.current?.getBoundingClientRect())) return "jungle";
    return null;
  }, []);

  const flash = useCallback((zone: Habitat, ok: boolean) => {
    if (flashTimer.current !== null) {
      window.clearTimeout(flashTimer.current);
      flashTimer.current = null;
    }
    setFlashZone({ zone, ok });
    flashTimer.current = window.setTimeout(() => {
      setFlashZone(null);
      flashTimer.current = null;
    }, 450);
  }, []);

  useEffect(
    () => () => {
      if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
      // Cancel every pending floater removal timer.
      floaterTimers.current.forEach((id) => window.clearTimeout(id));
      floaterTimers.current.clear();
    },
    [],
  );

  const addFloater = useCallback(
    (x: number, y: number, kind: "good" | "bad") => {
      const id = ++_fid;
      setFloaters((prev) => [...prev, { id, x, y, kind }]);
      const timerId = window.setTimeout(() => {
        floaterTimers.current.delete(timerId);
        setFloaters((prev) => prev.filter((f) => f.id !== id));
      }, 900);
      floaterTimers.current.add(timerId);
    },
    [],
  );

  // The drop result for a single animal card.
  const onCardDropped = useCallback(
    (animal: Animal, dropX: number, dropY: number, dropZone: Habitat | null) => {
      if (dropZone === null) {
        // Released away from any zone — no sound, no penalty, the card
        // just springs back to its origin.
        return;
      }
      if (dropZone === animal.habitat) {
        // Correct!
        playHappyChime();
        setDeck((d) => d.filter((x) => x.id !== animal.id));
        if (animal.habitat === "river") {
          setRiver((r) => [...r, animal]);
        } else {
          setJungle((j) => [...j, animal]);
        }
        setScore((s) => s + 1);
        flash(dropZone, true);
        addFloater(dropX, dropY, "good");
      } else {
        // Wrong zone — buzzer + mistake counter; framer-motion springs
        // the card back to its origin via dragSnapToOrigin.
        playGentleBuzzer();
        setMistakes((m) => m + 1);
        flash(dropZone, false);
        addFloater(dropX, dropY, "bad");
      }
      // Clear any tap-to-place selection after every drop attempt.
      setSelectedAnimalId(null);
    },
    [addFloater, flash],
  );

  // Tap a card (without dragging) to "select" it; tap the same card
  // again to deselect.
  const handleSelectAnimal = useCallback((animal: Animal) => {
    setSelectedAnimalId((cur) => (cur === animal.id ? null : animal.id));
  }, []);

  // Tap a zone to place the currently-selected animal into it.
  const handleZoneActivate = useCallback(
    (zone: Habitat) => {
      if (!selectedAnimalId) return;
      const animal = deck.find((a) => a.id === selectedAnimalId);
      if (!animal) return;
      // Use the zone's centre as the floater anchor.
      const zoneEl =
        zone === "river" ? riverZoneRef.current : jungleZoneRef.current;
      const rect = zoneEl?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      onCardDropped(animal, cx, cy, zone);
    },
    [deck, onCardDropped, selectedAnimalId],
  );

  const resetGame = useCallback(() => {
    setDeck(shuffle(ALL_ANIMALS));
    setRiver([]);
    setJungle([]);
    setScore(0);
    setMistakes(0);
    setFloaters([]);
    setFlashZone(null);
    setSelectedAnimalId(null);
    // Cancel any in-flight floater removal timers so they don't fire
    // after we've already cleared the floater list.
    floaterTimers.current.forEach((id) => window.clearTimeout(id));
    floaterTimers.current.clear();
  }, []);

  const allSorted = deck.length === 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 text-slate-900">
      {/* Soft sun + decorative clouds */}
      <SkyDecor />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-900/80 hover:text-emerald-900 transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "ត្រឡប់ទំព័រដើម" : "Back to Home"}</span>
          <span className={`text-emerald-900/40 ${kh ? "" : "font-khmer"}`}>
            · {kh ? "Back to Home" : "ត្រឡប់ទំព័រដើម"}
          </span>
        </Link>

        {/* Hero */}
        <header className="mt-4 sm:mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-emerald-200 px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-900 backdrop-blur shadow-sm">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>FOR KIDS · SCIENCE GAME</span>
            <span className="font-khmer text-emerald-900/80">
              · សម្រាប់ក្មេង · ហ្គេមវិទ្យាសាស្ត្រ
            </span>
          </div>

          <h1
            className="mt-3 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
            data-testid="page-title"
          >
            <span className="block">
              The Habitat{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                Sorter
              </span>
            </span>
            <span className="block font-khmer text-2xl sm:text-3xl md:text-4xl text-emerald-900/85 mt-1 leading-snug">
              ផ្ទះសត្វ
            </span>
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-emerald-950/85">
            <span className="font-bold">
              {kh
                ? "អូសសត្វនីមួយៗទៅផ្ទះត្រឹមត្រូវរបស់វា — ទន្លេឬព្រៃ!"
                : "Drag each animal to its correct home — the river or the jungle!"}
            </span>
          </p>
          <p className={`mt-1 max-w-2xl mx-auto text-xs text-emerald-900/65 ${kh ? "" : "font-khmer leading-loose"}`}>
            {kh
              ? "Drag each animal to its correct home — the river or the jungle!"
              : "អូសសត្វនីមួយៗទៅផ្ទះត្រឹមត្រូវរបស់វា — ទន្លេឬព្រៃ!"}
          </p>
        </header>

        {/* Score HUD + reset */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div
            className="flex items-center gap-3 bg-white/85 border-2 border-emerald-200 rounded-2xl px-4 py-2 shadow"
            data-testid="hud-score"
            role="status"
            aria-live="polite"
            aria-label={`Sorted ${score} of ${ALL_ANIMALS.length}, mistakes ${mistakes} · បាន ${score} ក្នុង ${ALL_ANIMALS.length} កំហុស ${mistakes}`}
          >
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-5 h-5 fill-emerald-100 stroke-emerald-700" aria-hidden="true" />
              <span className="font-mono font-black text-xl tabular-nums" data-testid="text-score">
                {score}
              </span>
              <span className="text-emerald-900/50 text-sm font-bold">
                / {ALL_ANIMALS.length}
              </span>
              <span className="sr-only">sorted / បាន</span>
            </div>
            <div className="text-slate-300 text-xl leading-none" aria-hidden="true">·</div>
            <div className="flex items-center gap-1.5 text-rose-600">
              <XCircle className="w-5 h-5 fill-rose-100 stroke-rose-600" aria-hidden="true" />
              <span className="font-mono font-black text-xl tabular-nums" data-testid="text-mistakes">
                {mistakes}
              </span>
              <span className="sr-only">mistakes / កំហុស</span>
            </div>
          </div>

          <button
            type="button"
            onClick={resetGame}
            data-testid="btn-reset"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white border-2 border-emerald-300 text-emerald-900 font-bold px-4 py-2 shadow hover:shadow-md transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
            <span>{kh ? "លេងម្ដងទៀត" : "Play Again"}</span>
            <span className={`text-xs opacity-70 ${kh ? "" : "font-khmer"}`}>
              · {kh ? "Play Again" : "លេងម្ដងទៀត"}
            </span>
          </button>
        </div>

        {/* Drop zones */}
        <section
          className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          aria-label={kh ? "ផ្ទះសត្វ — ទន្លេនិងព្រៃ" : "Habitats — river and jungle"}
        >
          <DropZone
            ref={riverZoneRef}
            zone="river"
            titleEn="The River"
            titleKh="ទន្លេ"
            iconEmoji="🌊"
            Icon={Waves}
            placedAnimals={river}
            flash={flashZone?.zone === "river" ? flashZone.ok : null}
            kh={kh}
            armed={selectedAnimalId !== null}
            onActivate={() => handleZoneActivate("river")}
          />
          <DropZone
            ref={jungleZoneRef}
            zone="jungle"
            titleEn="The Jungle"
            titleKh="ព្រៃ"
            iconEmoji="🌳"
            Icon={Trees}
            placedAnimals={jungle}
            flash={flashZone?.zone === "jungle" ? flashZone.ok : null}
            kh={kh}
            armed={selectedAnimalId !== null}
            onActivate={() => handleZoneActivate("jungle")}
          />
        </section>

        {/* Selection hint banner — appears once an animal is tapped/selected */}
        <AnimatePresence>
          {selectedAnimalId && !allSorted && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-3 rounded-2xl border-2 border-amber-300 bg-amber-50/95 px-4 py-2 text-center text-sm font-bold text-amber-900 shadow"
              data-testid="hint-selected"
              role="status"
              aria-live="polite"
            >
              {kh
                ? "ឥឡូវនេះចុចលើ ទន្លេ ឬ ព្រៃ ដើម្បីដាក់សត្វ!"
                : "Now tap River or Jungle to place the animal!"}
              <span className={`ml-2 opacity-70 text-xs ${kh ? "" : "font-khmer"}`}>
                ·{" "}
                {kh
                  ? "Now tap River or Jungle to place the animal!"
                  : "ឥឡូវនេះចុចលើ ទន្លេ ឬ ព្រៃ ដើម្បីដាក់សត្វ!"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conveyor / deck */}
        <section className="mt-6" aria-label={kh ? "សត្វដែលត្រូវរៀបចំ" : "Animals to sort"}>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-sm font-black tracking-widest text-emerald-900/80 uppercase">
              {kh ? "សត្វដែលនៅសល់" : "Animals left to sort"}
              <span className={`ml-2 opacity-70 ${kh ? "" : "font-khmer"} normal-case tracking-normal text-xs`}>
                · {kh ? "Animals left to sort" : "សត្វដែលនៅសល់"}
              </span>
            </h2>
            <span
              className="text-sm font-mono font-black text-emerald-700 tabular-nums"
              data-testid="text-remaining"
            >
              {deck.length}
            </span>
          </div>

          <div
            className="relative bg-white/70 backdrop-blur border-2 border-amber-200 rounded-3xl p-4 shadow-lg min-h-[150px]"
            data-testid="deck"
          >
            {/* Wood-grain conveyor strip */}
            <div
              aria-hidden="true"
              className="absolute inset-x-4 bottom-3 h-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 opacity-60"
            />

            {allSorted ? (
              <WinCard kh={kh} mistakes={mistakes} onPlayAgain={resetGame} />
            ) : (
              <div className="flex flex-wrap gap-3 justify-center items-center">
                <AnimatePresence>
                  {deck.map((animal) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      hitTest={hitTest}
                      onDropped={onCardDropped}
                      onSelect={handleSelectAnimal}
                      selected={selectedAnimalId === animal.id}
                      kh={kh}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Floating "+1" / "–1" overlay */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <AnimatePresence>
          {floaters.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 1, y: -50, scale: 1.1 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute font-display font-black text-2xl sm:text-3xl"
              style={{
                left: f.x,
                top: f.y,
                transform: "translate(-50%, -50%)",
                color: f.kind === "good" ? "#059669" : "#e11d48",
                textShadow: "0 2px 4px rgba(0,0,0,0.25)",
              }}
            >
              {f.kind === "good"
                ? "+1 ⭐"
                : kh
                  ? "សាកល្បងម្ដងទៀត!"
                  : "Try again!"}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Drop zone                                                             */
/* ────────────────────────────────────────────────────────────────────── */

type DropZoneProps = {
  zone: Habitat;
  titleEn: string;
  titleKh: string;
  iconEmoji: string;
  Icon: typeof Waves;
  placedAnimals: Animal[];
  flash: boolean | null; // true = correct, false = wrong, null = no flash
  kh: boolean;
  // Click-to-place support: when an animal is selected, the zone is
  // armed — clicking or pressing Enter/Space invokes onActivate.
  armed: boolean;
  onActivate: () => void;
};

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(function DropZone(
  { zone, titleEn, titleKh, iconEmoji, Icon, placedAnimals, flash, kh, armed, onActivate },
  ref,
) {
  const isRiver = zone === "river";

  // Themed surfaces.
  const baseSurface = isRiver
    ? "bg-gradient-to-br from-sky-300 via-cyan-200 to-blue-300 border-sky-500/70"
    : "bg-gradient-to-br from-lime-300 via-emerald-300 to-emerald-500 border-emerald-700/70";
  const flashSurface =
    flash === true
      ? "ring-8 ring-emerald-400/70 shadow-emerald-500/40"
      : flash === false
        ? "ring-8 ring-rose-400/70 shadow-rose-500/40"
        : "";
  // When armed (an animal is selected), make the zone visibly inviting
  // and keyboard-activatable. We deliberately keep it a <div> so the
  // placed badges inside aren't nested in a button.
  const armedSurface = armed
    ? "ring-4 ring-amber-300 cursor-pointer animate-pulse"
    : "";

  return (
    <div
      ref={ref}
      data-testid={`zone-${zone}`}
      data-zone={zone}
      className={`relative rounded-3xl border-4 ${baseSurface} ${flashSurface} ${armedSurface} shadow-xl transition-all duration-200 min-h-[230px] sm:min-h-[260px] overflow-hidden`}
      aria-label={`${titleEn} (${titleKh}) drop zone${armed ? " — press to place selected animal · ចុចដើម្បីដាក់សត្វ" : ""}`}
      role={armed ? "button" : undefined}
      tabIndex={armed ? 0 : undefined}
      onClick={armed ? onActivate : undefined}
      onKeyDown={
        armed
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
    >
      {/* Decorative pattern: wave glints for river, leafy fronds for jungle */}
      {isRiver ? <RiverDecor /> : <JungleDecor />}

      {/* Header */}
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center gap-3">
        <div className="rounded-2xl bg-white/85 p-2 shadow ring-1 ring-black/5">
          <Icon
            className={`w-7 h-7 ${isRiver ? "text-sky-700" : "text-emerald-800"}`}
            aria-hidden="true"
          />
        </div>
        <div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white drop-shadow-md">
            <span aria-hidden="true" className="mr-1">{iconEmoji}</span>
            {titleEn}
          </h3>
          <p className="font-khmer text-base sm:text-lg text-white/95 drop-shadow leading-tight">
            {titleKh}
          </p>
        </div>
      </div>

      {/* Body — placed animal badges */}
      <div className="relative z-10 px-4 pb-4 pt-2 flex flex-wrap gap-2 items-start">
        {placedAnimals.length === 0 ? (
          <p className="w-full text-center text-white/90 font-bold text-sm py-6 italic drop-shadow">
            {kh ? "ទម្លាក់សត្វនៅទីនេះ" : "Drop animals here"}
            <span className={`block opacity-80 text-xs mt-0.5 ${kh ? "" : "font-khmer"} not-italic`}>
              {kh ? "Drop animals here" : "ទម្លាក់សត្វនៅទីនេះ"}
            </span>
          </p>
        ) : (
          placedAnimals.map((a) => (
            <motion.div
              key={a.id}
              initial={{ scale: 0, rotate: -10, y: 20 }}
              animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
              transition={{
                scale: { type: "spring", stiffness: 380, damping: 14 },
                y: { duration: 0.45, times: [0, 0.5, 1], delay: 0.05 },
              }}
              className="flex items-center gap-1.5 bg-white/95 rounded-2xl px-3 py-2 shadow-md ring-1 ring-black/5"
              data-testid={`placed-${a.id}`}
            >
              <span className="text-2xl" aria-hidden="true">
                {a.emoji}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-black text-slate-900">{a.en}</div>
                <div className="font-khmer text-xs text-slate-700">{a.kh}</div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
});

/* ────────────────────────────────────────────────────────────────────── */
/*  Animal card (draggable)                                               */
/* ────────────────────────────────────────────────────────────────────── */

function AnimalCard({
  animal,
  hitTest,
  onDropped,
  onSelect,
  selected,
  kh,
}: {
  animal: Animal;
  hitTest: (x: number, y: number) => Habitat | null;
  onDropped: (a: Animal, x: number, y: number, zone: Habitat | null) => void;
  onSelect: (a: Animal) => void;
  selected: boolean;
  kh: boolean;
}) {
  // Track drag-end pointer position for the floater overlay placement.
  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
      // Pull viewport-relative coords from the underlying pointer event.
      // (PanInfo.point is in *page* coords; we want *client* coords to
      // match getBoundingClientRect for hitTest and to position the
      // floater on the fixed overlay.)
      let clientX = 0;
      let clientY = 0;
      if ("clientX" in event && typeof event.clientX === "number") {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (
        "changedTouches" in event &&
        event.changedTouches &&
        event.changedTouches.length > 0
      ) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      }
      const zone = hitTest(clientX, clientY);
      onDropped(animal, clientX, clientY, zone);
    },
    [animal, hitTest, onDropped],
  );

  // Tap (no drag) → toggle selection. framer-motion only fires onTap
  // when the gesture stays within a small movement threshold, so a real
  // drag will NOT also fire onTap.
  const handleTap = useCallback(() => {
    onSelect(animal);
  }, [animal, onSelect]);

  const selectedSurface = selected
    ? "border-amber-500 ring-4 ring-amber-300 shadow-xl scale-[1.04]"
    : "border-amber-300";

  return (
    <motion.button
      type="button"
      data-testid={`card-${animal.id}`}
      data-selected={selected ? "true" : "false"}
      aria-label={`${animal.en} (${animal.kh}) — drag or tap to choose, then tap a habitat · អូស ឬ ចុចដើម្បីជ្រើស រួចចុចផ្ទះ`}
      aria-pressed={selected}
      drag
      dragSnapToOrigin
      dragElastic={0.18}
      dragMomentum={false}
      whileDrag={{
        scale: 1.12,
        rotate: 2,
        zIndex: 60,
        cursor: "grabbing",
        boxShadow: "0 18px 30px rgba(0,0,0,0.22)",
      }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -3 }}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      initial={{ scale: 0, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className={`relative touch-none cursor-grab select-none bg-white rounded-2xl border-2 ${selectedSurface} shadow-md hover:shadow-lg p-3 w-[110px] sm:w-[124px] flex flex-col items-center text-center focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 transition-shadow`}
      style={{ touchAction: "none" }}
    >
      <div className="text-5xl sm:text-6xl leading-none" aria-hidden="true">
        {animal.emoji}
      </div>
      <div className="mt-1 text-sm font-black text-slate-900">{animal.en}</div>
      <div className="font-khmer text-xs text-slate-600 leading-tight">
        {animal.kh}
      </div>
      {/* Visual hint: drag, or tap-to-select */}
      <div
        className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-600/90"
        aria-hidden="true"
      >
        <Leaf className="w-3 h-3" />
        {selected
          ? kh
            ? "បានជ្រើស ✓"
            : "Selected ✓"
          : kh
            ? "អូស ឬ ចុច"
            : "Drag or tap"}
      </div>
    </motion.button>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Win card                                                              */
/* ────────────────────────────────────────────────────────────────────── */

function WinCard({
  kh,
  mistakes,
  onPlayAgain,
}: {
  kh: boolean;
  mistakes: number;
  onPlayAgain: () => void;
}) {
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      data-testid="card-win"
      className="text-center py-6"
    >
      <div className="text-5xl mb-2" aria-hidden="true">🎉</div>
      <h2 className="font-display font-black text-2xl sm:text-3xl text-emerald-800">
        {kh ? "អស់ស្រឡះ! សត្វទាំងអស់ស្ថិតនៅផ្ទះត្រឹមត្រូវ!" : "All sorted! Every animal is home!"}
      </h2>
      <p className={`mt-1 text-sm text-emerald-700 ${kh ? "" : "font-khmer"}`}>
        {kh ? "All sorted! Every animal is home!" : "អស់ស្រឡះ! សត្វទាំងអស់ស្ថិតនៅផ្ទះត្រឹមត្រូវ!"}
      </p>
      <div className="mt-3 text-3xl tracking-widest" aria-label={`${stars} stars`}>
        {"⭐".repeat(stars)}
        <span className="opacity-30">{"⭐".repeat(3 - stars)}</span>
      </div>
      <p className="mt-1 text-xs text-emerald-700/80">
        {kh
          ? `កំហុស៖ ${mistakes} · Mistakes: ${mistakes}`
          : `Mistakes: ${mistakes} · កំហុស៖ ${mistakes}`}
      </p>
      <button
        type="button"
        onClick={onPlayAgain}
        data-testid="btn-play-again"
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white px-6 py-3 font-bold shadow-lg ring-1 ring-emerald-300/40 hover:scale-[1.03] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      >
        <RotateCw className="w-5 h-5" aria-hidden="true" />
        <span>{kh ? "លេងម្ដងទៀត" : "Play Again"}</span>
        <span className={`text-xs opacity-90 ${kh ? "" : "font-khmer"}`}>
          · {kh ? "Play Again" : "លេងម្ដងទៀត"}
        </span>
      </button>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Decor                                                                 */
/* ────────────────────────────────────────────────────────────────────── */

function SkyDecor() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-6 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-orange-300 opacity-80 blur-[1px] shadow-[0_0_40px_rgba(251,191,36,0.45)]" />
      <div className="absolute top-12 left-[10%] w-24 h-10 rounded-full bg-white/70 blur-sm" />
      <div className="absolute top-20 left-[40%] w-32 h-12 rounded-full bg-white/55 blur-sm" />
      <div className="absolute top-32 left-[70%] w-28 h-10 rounded-full bg-white/65 blur-sm" />
    </div>
  );
}

function RiverDecor() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    >
      {/* Wave lines */}
      <g stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M0 90 Q50 75, 100 90 T200 90 T300 90 T400 90" />
        <path d="M0 130 Q50 115, 100 130 T200 130 T300 130 T400 130" />
        <path d="M0 170 Q50 155, 100 170 T200 170 T300 170 T400 170" />
        <path d="M0 210 Q50 195, 100 210 T200 210 T300 210 T400 210" />
      </g>
      {/* Bubbles */}
      <g fill="rgba(255,255,255,0.45)">
        <circle cx="60" cy="220" r="6" />
        <circle cx="120" cy="240" r="4" />
        <circle cx="320" cy="225" r="5" />
        <circle cx="360" cy="245" r="3" />
      </g>
    </svg>
  );
}

function JungleDecor() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    >
      {/* Soft fronds at the edges */}
      <g fill="rgba(20,83,45,0.5)">
        <path d="M0 260 C 40 200, 60 180, 30 130 C 20 110, 70 130, 80 170 C 90 210, 70 240, 0 260 Z" />
        <path d="M400 260 C 360 210, 350 190, 380 140 C 390 120, 340 130, 330 170 C 320 215, 350 245, 400 260 Z" />
      </g>
      {/* Sun rays */}
      <g stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M180 30 L 200 70" />
        <path d="M220 30 L 210 75" />
        <path d="M260 30 L 230 80" />
      </g>
      {/* Tiny leaves scattered */}
      <g fill="rgba(255,255,255,0.35)">
        <ellipse cx="120" cy="60" rx="10" ry="4" transform="rotate(-20 120 60)" />
        <ellipse cx="290" cy="120" rx="8" ry="3" transform="rotate(15 290 120)" />
        <ellipse cx="180" cy="200" rx="12" ry="4" transform="rotate(35 180 200)" />
      </g>
    </svg>
  );
}
