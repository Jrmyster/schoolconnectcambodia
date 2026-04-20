import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  durationMs?: number;
  className?: string;
};

export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const target = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
    const from = fromRef.current;
    const start = performance.now();

    if (target === from) {
      setDisplay(target);
      return;
    }

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
        rafRef.current = null;
      }
    };

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, durationMs]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
