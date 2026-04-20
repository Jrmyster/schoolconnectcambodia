import { PhilosophyMap } from "@/components/PhilosophyMap";
import { BuddhistPhilosophy } from "@/components/BuddhistPhilosophy";

export function PhilosophyPage() {
  return (
    <div className="pt-8 sm:pt-12">
      <h1 className="sr-only">Philosophy Hub — The Map of Thinking & Buddhist Philosophy</h1>

      <PhilosophyMap />

      {/* Thematic divider between the two sub-sections of the Philosophy Hub.
          Centered, low-contrast, with a small ornament so it reads as a
          deliberate transition rather than a default <hr>. */}
      <div
        role="separator"
        aria-hidden="true"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-16 flex items-center gap-4"
      >
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        <span className="text-amber-600/80 text-xl select-none" aria-hidden="true">✦</span>
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      <BuddhistPhilosophy />
    </div>
  );
}

export default PhilosophyPage;
