/**
 * Speech utilities for ESL pronunciation across the Study Center.
 * Uses the browser's native Web Speech API — no network required.
 */

/**
 * Speak an English word/phrase aloud at a learner-friendly rate.
 * - Forces en-US so cards always pronounce the English word, even when the
 *   user has the UI set to Khmer.
 * - Slowed to 0.85 so beginners can clearly hear consonants.
 * - Cancels any in-flight speech so rapid taps don't talk over each other.
 */
export function speakWord(word: string): void {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance === "undefined") {
    // Graceful fallback for browsers without the API.
    // eslint-disable-next-line no-alert
    alert(`Audio not supported in this browser — ${word}`);
    return;
  }

  // Stop any current/queued speech before speaking the new word.
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Prefer an English voice if the browser exposes them.
  const voices = synth.getVoices();
  if (voices && voices.length) {
    const preferred =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name)) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (preferred) utterance.voice = preferred;
  }

  synth.speak(utterance);
}
