/**
 * PWA helpers: service worker registration + install-prompt store.
 *
 * The store is a tiny pub/sub so React components can subscribe via useSyncExternalStore.
 */

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
};

interface PwaState {
  installEvent: BeforeInstallPromptEvent | null;
  installed: boolean;
  prompting: boolean;
}

const listeners = new Set<() => void>();
let state: PwaState = {
  installEvent: null,
  prompting: false,
  installed:
    typeof window !== "undefined" &&
    (window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS Safari
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true),
};

function setState(next: Partial<PwaState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function getPwaState(): PwaState {
  return state;
}

export function subscribePwa(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function triggerInstallPrompt(): Promise<"accepted" | "dismissed" | "unavailable"> {
  const evt = state.installEvent;
  if (!evt) return "unavailable";
  // Guard against re-entrant clicks while a prompt is already in-flight.
  if (state.prompting) return "unavailable";
  setState({ prompting: true });
  try {
    await evt.prompt();
    const choice = await evt.userChoice;
    // The browser fires `beforeinstallprompt` only once per event — the captured
    // event is single-use, so always clear it regardless of outcome.
    setState({ installEvent: null, prompting: false });
    if (choice.outcome === "accepted") setState({ installed: true });
    return choice.outcome;
  } catch {
    // Clear stale state so the UI doesn't get stuck showing the install button
    // pointing at a dead event reference.
    setState({ installEvent: null, prompting: false });
    return "dismissed";
  }
}

export function initPwa(): void {
  if (typeof window === "undefined") return;

  // Capture the deferred install prompt.
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setState({ installEvent: e as BeforeInstallPromptEvent });
  });

  window.addEventListener("appinstalled", () => {
    setState({ installEvent: null, installed: true });
  });

  // Register the service worker. We respect Vite's BASE_URL so it works under
  // any artifact path prefix in the monorepo deployment.
  if ("serviceWorker" in navigator) {
    const base = import.meta.env.BASE_URL || "/";
    const swUrl = `${base}sw.js`;
    // Wait until the page has loaded so we don't compete for bandwidth on first paint.
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(swUrl, { scope: base })
        .catch((err) => {
          // Non-fatal — the app still works without the SW.
          // eslint-disable-next-line no-console
          console.warn("[PWA] Service worker registration failed:", err);
        });
    });
  }
}
