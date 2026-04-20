import { create } from "zustand";

export type MascotKey = "kouprey" | "ibis" | "turtle";
export type CheerTone = "correct" | "win" | "wrong";

export interface CheerEvent {
  id: number;
  mascot: MascotKey;
  tone: CheerTone;
  en: string;
  kh: string;
  /** ms since epoch when enqueued — used for coalescing rapid duplicates. */
  at: number;
}

interface MascotState {
  active: CheerEvent | null;
  queue: CheerEvent[];
  cheer: (tone: CheerTone) => void;
  /** Called by the overlay when the active event finishes; promotes the next queued cheer. */
  dismiss: (id: number) => void;
}

// Bilingual cheer banks. "correct" and "win" pick a random mascot + line;
// "wrong" always uses the patient Royal Turtle.
const CORRECT_LINES: { mascot: MascotKey; en: string; kh: string }[] = [
  { mascot: "kouprey", en: "Great job!",                 kh: "អស្ចារ្យណាស់!" },
  { mascot: "kouprey", en: "The Kouprey is proud of you!", kh: "គោព្រៃមានមោទនភាពចំពោះប្អូន!" },
  { mascot: "ibis",    en: "You are so smart!",          kh: "ប្អូនឆ្លាតណាស់!" },
  { mascot: "ibis",    en: "Sharp eyes — well spotted!", kh: "ភ្នែកមុត — សង្កេតបានល្អ!" },
  { mascot: "turtle",  en: "Keep going!",                kh: "បន្តទៀត!" },
  { mascot: "turtle",  en: "Slow and steady wins!",      kh: "យឺតៗតែឈ្នះ!" },
];

const WIN_LINES: { mascot: MascotKey; en: string; kh: string }[] = [
  { mascot: "kouprey", en: "Amazing! You did it!",       kh: "អស្ចារ្យ! ប្អូនធ្វើបានហើយ!" },
  { mascot: "ibis",    en: "Brilliant work!",            kh: "ការងារដ៏ប៉ិនប្រសប់!" },
  { mascot: "turtle",  en: "Wonderful — try the next one!", kh: "ល្អប្រសើរ — សាកល្បងបន្ទាប់!" },
];

const WRONG_LINE = {
  mascot: "turtle" as MascotKey,
  en: "Almost! Let us try again.",
  kh: "ជិតត្រូវហើយ! សាកល្បងម្ដងទៀត។",
};

let nextId = 1;
const COALESCE_WINDOW_MS = 350;
const MAX_QUEUE = 4;

export const useMascotStore = create<MascotState>((set, get) => ({
  active: null,
  queue: [],
  cheer: (tone) => {
    let pick;
    if (tone === "wrong") {
      pick = WRONG_LINE;
    } else if (tone === "win") {
      pick = WIN_LINES[Math.floor(Math.random() * WIN_LINES.length)];
    } else {
      pick = CORRECT_LINES[Math.floor(Math.random() * CORRECT_LINES.length)];
    }

    const now = Date.now();
    const event: CheerEvent = { id: nextId++, mascot: pick.mascot, tone, en: pick.en, kh: pick.kh, at: now };

    const { active, queue } = get();

    // Coalesce: if the most recent event (active or last queued) is the same tone
    // and very recent, skip — prevents the basket-tap spam from drowning the system.
    const recent = queue.length ? queue[queue.length - 1] : active;
    if (recent && recent.tone === tone && now - recent.at < COALESCE_WINDOW_MS) {
      return;
    }

    if (!active) {
      set({ active: event });
      return;
    }

    // Bound the queue so a long key-mashing burst can't grow memory unbounded.
    const next = queue.length >= MAX_QUEUE ? [...queue.slice(1), event] : [...queue, event];
    set({ queue: next });
  },
  dismiss: (id) => {
    const { active, queue } = get();
    if (!active || active.id !== id) return;
    if (queue.length === 0) {
      set({ active: null });
      return;
    }
    const [head, ...rest] = queue;
    set({ active: head, queue: rest });
  },
}));

/** Convenience hook returning just the cheer trigger. */
export function useMascotCheer() {
  return useMascotStore((s) => s.cheer);
}
