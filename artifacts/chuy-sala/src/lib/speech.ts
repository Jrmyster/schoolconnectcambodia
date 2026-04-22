/**
 * Speech utilities for ESL pronunciation across the Study Center.
 * Uses the browser's native Web Speech API — no network required.
 */

export type SpeakLang = "en-US" | "km-KH";

export type SpeakResult = {
  ok: boolean;
  reason?: "no-window" | "no-api" | "no-voice";
};

/**
 * Speak an English word/phrase aloud at a learner-friendly rate.
 * - Forces en-US so cards always pronounce the English word, even when the
 *   user has the UI set to Khmer.
 * - Slowed to 0.85 so beginners can clearly hear consonants.
 * - Cancels any in-flight speech so rapid taps don't talk over each other.
 *
 * Kept for backward compatibility with existing pages that imported it.
 */
export function speakWord(word: string): void {
  speakText(word, "en-US");
}

/**
 * Speak arbitrary text in either English (en-US) or Khmer (km-KH).
 *
 * Returns a SpeakResult so callers can show a graceful UI fallback when:
 *  - the browser has no speech-synthesis API at all (`no-api`)
 *  - the browser has the API but no installed voice for the requested
 *    language (`no-voice`) — most common for Khmer on desktop browsers.
 *
 * In the `no-voice` case we deliberately do NOT speak with a wrong-language
 * voice (e.g. an English voice mangling Khmer script) — instead we let the
 * caller display a "Audio not supported" tooltip.
 */
export type SpeakOptions = {
  /** Called when the utterance finishes playing successfully. */
  onEnd?: () => void;
  /** Called when the utterance fails (synthesis error or interruption). */
  onError?: () => void;
};

export function speakText(
  text: string,
  lang: SpeakLang = "en-US",
  options: SpeakOptions = {}
): SpeakResult {
  if (typeof window === "undefined") return { ok: false, reason: "no-window" };
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance === "undefined") {
    return { ok: false, reason: "no-api" };
  }

  const voices = synth.getVoices();
  const prefix = lang.split("-")[0].toLowerCase(); // "en" or "km"
  const norm = (s: string) => s.replace("_", "-").toLowerCase();
  const exact = voices.find((v) => norm(v.lang) === lang.toLowerCase());
  const prefixMatch =
    exact || voices.find((v) => norm(v.lang).startsWith(prefix));

  // Hard fail for Khmer with no Khmer voice — caller will show a tooltip
  // rather than have an English voice butcher the script.
  if (lang === "km-KH" && !prefixMatch) {
    return { ok: false, reason: "no-voice" };
  }

  // Stop any current/queued speech before speaking the new word.
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = lang === "km-KH" ? 0.8 : 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (lang === "en-US") {
    // Prefer a clear en-US voice, then any English voice.
    const enPreferred =
      voices.find(
        (v) =>
          /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name)
      ) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (enPreferred) utterance.voice = enPreferred;
  } else if (prefixMatch) {
    utterance.voice = prefixMatch;
  }

  // Lifecycle hooks — let callers sync UI state with real playback length
  // instead of relying on a fixed-duration timer.
  if (options.onEnd) {
    utterance.addEventListener("end", () => options.onEnd?.());
  }
  if (options.onError) {
    utterance.addEventListener("error", () => options.onError?.());
  }

  synth.speak(utterance);
  return { ok: true };
}

/**
 * Returns true when a Khmer-language voice is installed on this device.
 *
 * Note: in many browsers `getVoices()` returns an empty list synchronously
 * on first call and only populates after the `voiceschanged` event. Use
 * `loadVoicesAsync()` from a React effect when you need a definitive answer
 * at component mount.
 */
export function isKhmerVoiceAvailable(): boolean {
  if (typeof window === "undefined") return false;
  const synth = window.speechSynthesis;
  if (!synth) return false;
  return synth.getVoices().some((v) => /^km/i.test(v.lang));
}

/**
 * Resolves to the full voice list once it's available. Some browsers
 * (Chrome, Safari) populate voices asynchronously — this helper waits for
 * the `voiceschanged` event with a 1.5s timeout safety net.
 */
export function loadVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve([]);
    const synth = window.speechSynthesis;
    if (!synth) return resolve([]);
    const initial = synth.getVoices();
    if (initial && initial.length) return resolve(initial);

    let settled = false;
    let timeoutId: number | undefined;
    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (settled) return;
      settled = true;
      synth.removeEventListener("voiceschanged", handler);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      resolve(voices);
    };
    const handler = () => finish(synth.getVoices());
    synth.addEventListener("voiceschanged", handler);
    // Safety: some browsers never fire the event — resolve with whatever we
    // have after 1.5 seconds so the UI doesn't hang.
    timeoutId = window.setTimeout(() => finish(synth.getVoices()), 1500);
  });
}
