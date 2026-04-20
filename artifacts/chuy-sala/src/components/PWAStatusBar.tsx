import { useEffect, useState, useSyncExternalStore } from "react";
import { WifiOff, X } from "lucide-react";
import { useTranslation } from "@/store/use-language";
import { getPwaState, subscribePwa } from "@/lib/pwa";

/**
 * A tiny, non-intrusive bar that pins to the top of the screen when the
 * browser reports the device is offline. Auto-hides when connection returns.
 */
export function PWAStatusBar() {
  const t = useTranslation();
  const online = useOnline();
  const [dismissed, setDismissed] = useState(false);
  // Reset dismissal when state flips so the banner reappears on the next outage.
  useEffect(() => {
    if (online) setDismissed(false);
  }, [online]);

  // Don't render at all on print — the Impact Report's @media print already hides it,
  // but bail early as a defense in depth.
  if (online || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="offline-banner"
      className="no-print fixed top-0 inset-x-0 z-[90] flex items-center justify-center gap-3 px-3 py-2 text-sm font-semibold text-white bg-amber-600 shadow-md"
    >
      <WifiOff className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">
        {t("Offline — cached lessons still work.", "ដាច់អ៊ីនធឺណិត — មេរៀនដែលបានរក្សាទុកនៅដំណើរការ។")}
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t("Dismiss offline banner", "បិទរបារដាច់")}
        className="ml-2 p-1 rounded-md hover:bg-white/15 active:bg-white/25 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ----------------------------- helpers ----------------------------- */

export function useOnline(): boolean {
  const [online, setOnline] = useState<boolean>(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);
  return online;
}

export function usePwaState() {
  return useSyncExternalStore(subscribePwa, getPwaState, getPwaState);
}
