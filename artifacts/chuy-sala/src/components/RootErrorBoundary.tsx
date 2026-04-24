import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Root-level error boundary — wraps the entire application *outside* every
 * provider, every router and every other component. Its only job is to
 * guarantee that a React render error or a thrown context-provider error
 * NEVER produces a silent white screen of death.
 *
 * Difference vs `RouteScopedErrorBoundary`:
 *  - That one lives INSIDE `<main>` and is scoped to a single page; it can
 *    therefore reset itself when wouter changes route.
 *  - This one wraps `<App />` itself (above QueryClient, AuthProvider,
 *    WouterRouter, Navbar, etc). It is the last line of defence — if this
 *    catches something, the entire React tree below it is unmounted, so
 *    the only safe recovery is a full page reload.
 *
 * In **all** environments (including production) we render the full error
 * `name`, `message`, `stack` and React component stack on screen. The user
 * explicitly requested visible diagnostics so production WSODs can be
 * triaged from a screenshot rather than a console log the rural-school
 * audience cannot easily access.
 */

type Props = { children: ReactNode };
type State = { error: Error | null; componentStack: string | null };

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null, componentStack: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(
      "[RootErrorBoundary] caught at root:",
      error,
      info.componentStack,
    );
    this.setState({ componentStack: info.componentStack ?? null });
  }

  private handleReload = (): void => {
    if (typeof window !== "undefined") {
      // Best-effort cache reset so a poisoned service-worker cache cannot
      // keep re-throwing the same crash on every reload.
      try {
        if ("caches" in window) {
          caches.keys().then((keys) => {
            keys.forEach((k) => {
              caches.delete(k).catch(() => {});
            });
          }).catch(() => {});
        }
      } catch {
        /* ignore — we still want the reload to happen */
      }
      window.location.reload();
    }
  };

  private handleHardReset = async (): Promise<void> => {
    if (typeof window === "undefined") return;
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister().catch(() => false)));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k).catch(() => false)));
      }
    } catch {
      /* ignore — reload regardless */
    }
    window.location.reload();
  };

  render(): ReactNode {
    const { error, componentStack } = this.state;
    if (!error) return this.props.children;

    return (
      <div
        role="alert"
        data-testid="root-error-boundary"
        style={{
          minHeight: "100vh",
          padding: "2rem 1.25rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          background: "#0f172a",
          color: "#f8fafc",
          lineHeight: 1.5,
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 36, marginBottom: 6 }} aria-hidden>
            ⚠️
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
            The app crashed before it could finish loading.
          </h1>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              color: "#cbd5e1",
              fontFamily: "'Hanuman', 'Noto Sans Khmer', serif",
            }}
          >
            កម្មវិធីបានគាំងមុនពេលផ្ទុករួចរាល់។
          </h2>

          <p style={{ marginTop: 16, color: "#e2e8f0", fontSize: 14 }}>
            This screen is intentional — it replaces what would otherwise be a
            blank white page so the exact error is visible. Please try
            reloading. If the problem persists, the &ldquo;Hard reset&rdquo;
            button clears the offline cache and the service worker, which
            usually fixes stale-deploy errors.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={this.handleReload}
              data-testid="button-root-error-reload"
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                background: "#38bdf8",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Reload page / ផ្ទុកឡើងវិញ
            </button>
            <button
              type="button"
              onClick={this.handleHardReset}
              data-testid="button-root-error-hard-reset"
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid #475569",
                background: "transparent",
                color: "#f1f5f9",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Hard reset / លុបឃ្លាំង
            </button>
          </div>

          <section style={{ marginTop: 28 }}>
            <h3
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#fbbf24",
                margin: "0 0 6px",
              }}
            >
              Error
            </h3>
            <pre
              style={{
                margin: 0,
                padding: 14,
                background: "#020617",
                borderRadius: 10,
                border: "1px solid #1e293b",
                color: "#fecaca",
                fontSize: 12,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {error.name}: {error.message}
            </pre>
          </section>

          {error.stack && (
            <section style={{ marginTop: 18 }}>
              <h3
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#fbbf24",
                  margin: "0 0 6px",
                }}
              >
                Stack trace
              </h3>
              <pre
                style={{
                  margin: 0,
                  padding: 14,
                  background: "#020617",
                  borderRadius: 10,
                  border: "1px solid #1e293b",
                  color: "#e2e8f0",
                  fontSize: 11,
                  lineHeight: 1.55,
                  maxHeight: 280,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {error.stack}
              </pre>
            </section>
          )}

          {componentStack && (
            <section style={{ marginTop: 18 }}>
              <h3
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#fbbf24",
                  margin: "0 0 6px",
                }}
              >
                Component stack
              </h3>
              <pre
                style={{
                  margin: 0,
                  padding: 14,
                  background: "#020617",
                  borderRadius: 10,
                  border: "1px solid #1e293b",
                  color: "#cbd5e1",
                  fontSize: 11,
                  lineHeight: 1.55,
                  maxHeight: 220,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {componentStack.trim()}
              </pre>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default RootErrorBoundary;
