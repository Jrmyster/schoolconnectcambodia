import { Component, useEffect, useRef, type ErrorInfo, type ReactNode } from "react";
import { useLocation } from "wouter";

/**
 * Top-level route error boundary.
 *
 * Two distinct failure modes are handled:
 *
 * 1. **Stale lazy-loaded chunk** — after a redeploy, the old HTML in the
 *    user's browser still references chunk filenames (with old hashes) that
 *    no longer exist on the freshly deployed server. The dynamic `import()`
 *    inside `React.lazy(...)` rejects, Suspense bubbles the rejection up,
 *    React unmounts the entire subtree, and the user sees a blank screen.
 *    Hard refresh works because it re-fetches the new HTML pointing to
 *    the new chunk hashes. We detect this specific error message and
 *    auto-reload exactly once (using sessionStorage to avoid a reload loop
 *    if the error is actually a real bug, not a stale chunk).
 *
 * 2. **Genuine runtime error** in a page component — instead of unmounting
 *    everything to a blank screen, we show a graceful bilingual error
 *    panel with a Retry button (re-mounts the subtree by clearing state)
 *    and a Reload button (full page reload as a last resort).
 */

type Props = { children: ReactNode; resetKey?: string };
type State = { error: Error | null };

const RELOAD_FLAG = "chuy-sala:chunk-reload";
// TTL after which the reload-loop guard expires so the SAME tab can still
// self-heal a future redeploy. 30s is plenty: a real bug reproduces well
// within that window, while a second redeploy is hours/days later.
const RELOAD_FLAG_TTL_MS = 30_000;

const STALE_CHUNK_PATTERNS = [
  /Loading chunk \d+ failed/i,
  /Loading CSS chunk/i,
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
  /Failed to load module script/i,
  /Unable to preload (CSS|module)/i,
  /ChunkLoadError/i,
];

function isStaleChunkError(err: unknown): boolean {
  if (!err) return false;
  const msgs: string[] = [];
  if (err instanceof Error) {
    msgs.push(`${err.name}: ${err.message}`);
    // Some bundlers wrap the real error under `cause` — check that too.
    const cause = (err as { cause?: unknown }).cause;
    if (cause instanceof Error) msgs.push(`${cause.name}: ${cause.message}`);
    else if (typeof cause === "string") msgs.push(cause);
  } else if (typeof err === "string") {
    msgs.push(err);
  }
  return msgs.some((m) => STALE_CHUNK_PATTERNS.some((re) => re.test(m)));
}

function readReloadFlag(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(RELOAD_FLAG);
  if (!raw) return null;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return null;
  // Expire stale flags so the guard doesn't permanently disable self-heal
  // in long-lived tabs.
  if (Date.now() - ts > RELOAD_FLAG_TTL_MS) {
    window.sessionStorage.removeItem(RELOAD_FLAG);
    return null;
  }
  return ts;
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Eslint allows console.error in error boundaries — this is the one
    // place we WANT a loud log so production issues surface in monitoring.
    // eslint-disable-next-line no-console
    console.error("[RouteErrorBoundary] caught:", error, info.componentStack);

    // Stale-chunk recovery: reload once (gated by a TTL'd sessionStorage
    // timestamp so a real crash doesn't trap the user in a reload loop,
    // while still allowing a future redeploy to self-heal the same tab).
    if (isStaleChunkError(error) && typeof window !== "undefined") {
      if (readReloadFlag() === null) {
        window.sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
        window.location.reload();
      }
    }
  }

  componentDidUpdate(prevProps: Props): void {
    // Auto-reset when the route changes so a single broken page doesn't
    // poison subsequent navigations — the user clicks a different nav
    // link and the boundary clears itself.
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(RELOAD_FLAG);
      }
    }
  }

  handleRetry = (): void => {
    // Clear the reload flag so a future stale-chunk error can self-heal.
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(RELOAD_FLAG);
    }
    this.setState({ error: null });
  };

  handleHardReload = (): void => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(RELOAD_FLAG);
      window.location.reload();
    }
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    // While the auto-reload is in-flight for a stale chunk, show a tiny
    // placeholder rather than the full error UI to avoid a flash. (The
    // flag will be set inside componentDidCatch immediately before reload,
    // so by render time we can rely on it being present.)
    if (
      isStaleChunkError(error) &&
      typeof window !== "undefined" &&
      readReloadFlag() !== null
    ) {
      return (
        <div
          className="min-h-[60vh] grid place-items-center text-slate-500 text-sm"
          role="status"
          aria-live="polite"
        >
          <span>
            Updating to the latest version…{" "}
            <span className="font-khmer">កំពុងធ្វើបច្ចុប្បន្នភាព…</span>
          </span>
        </div>
      );
    }

    return (
      <div
        role="alert"
        className="min-h-[60vh] flex items-center justify-center px-6 py-16"
        data-testid="route-error-boundary"
      >
        <div className="max-w-lg w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8 shadow-lg shadow-amber-900/5">
          <div className="text-3xl mb-2" aria-hidden>
            ⚠️
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            Something went wrong loading this module.
          </h1>
          <h2 className="font-khmer text-lg sm:text-xl text-stone-800/90 mt-1 leading-snug">
            មានបញ្ហាក្នុងការផ្ទុកមេរៀននេះ។
          </h2>
          <p className="mt-3 text-sm text-stone-700">
            You can try again, or reload the page. The rest of the app is
            still working — your progress was not lost.
          </p>
          <p className="font-khmer mt-2 text-sm text-stone-700/90">
            អ្នកអាចសាកល្បងម្តងទៀត ឬផ្ទុកទំព័រឡើងវិញ។
          </p>

          {import.meta.env.DEV && (
            <pre className="mt-4 max-h-40 overflow-auto rounded bg-stone-900 text-stone-100 text-[11px] leading-snug p-3 font-mono">
              {error.name}: {error.message}
            </pre>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-bold transition shadow-sm"
              data-testid="button-error-retry"
            >
              Try again / សាកល្បងម្តងទៀត
            </button>
            <button
              type="button"
              onClick={this.handleHardReload}
              className="px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-semibold transition"
              data-testid="button-error-reload"
            >
              Reload page / ផ្ទុកឡើងវិញ
            </button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Convenience wrapper that auto-resets the boundary whenever the wouter
 * route path changes. Use this in App.tsx — most callers want this
 * behaviour, and it keeps the class component pure for testability.
 */
export function RouteScopedErrorBoundary({ children }: { children: ReactNode }) {
  const [pathname] = useLocation();
  // Also clear an expired stale-chunk reload flag once on mount so a fresh
  // tab session always starts clean.
  const cleanedOnceRef = useRef(false);
  useEffect(() => {
    if (cleanedOnceRef.current) return;
    cleanedOnceRef.current = true;
    if (typeof window !== "undefined") {
      readReloadFlag(); // side-effect: removes flag if expired
    }
  }, []);
  return (
    <RouteErrorBoundary resetKey={pathname}>{children}</RouteErrorBoundary>
  );
}

export default RouteErrorBoundary;
