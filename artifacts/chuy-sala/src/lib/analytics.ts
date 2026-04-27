import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = "G-1RQCE56X41";

/**
 * Google Analytics 4 helpers for the Chuy Sala PWA.
 *
 * Architecture
 * ────────────
 * The literal Google tag snippet in `index.html` does three things on its own,
 * before any React code runs:
 *
 *   1. Loads `gtag.js` asynchronously.
 *   2. Defines `window.dataLayer` and the global `gtag()` function.
 *   3. Calls `gtag('config', GA_MEASUREMENT_ID)` — which automatically sends
 *      one `page_view` event for the URL the visitor landed on.
 *
 * That covers analytics for users who never interact further (a refresh, a
 * direct link, an external referral, etc.). Once React boots, this module
 * takes over so we can also report SPA route changes and custom events:
 *
 *   • `initAnalytics()` – calls `ReactGA.initialize` (so react-ga4 is in a
 *     consistent state) and re-configures gtag with `send_page_view: false`
 *     so future config calls don't double-fire pageviews.
 *
 *   • `trackPageview(path, title)` – called by RouteTracker on every wouter
 *     navigation *after* the first one (the first one is already counted by
 *     the HTML config call).
 *
 *   • `trackEvent({category, action, label})` – called from feature buttons
 *     like "Start Interview" and "Start Print".
 *
 * Implementation note
 * ───────────────────
 * trackPageview / trackEvent reach for `window.gtag` directly rather than
 * routing through `ReactGA.send` / `ReactGA.event`. Both paths ultimately
 * push to the same `window.dataLayer`, but the direct path is one fewer
 * layer of buffering, which makes the events show up in `window.dataLayer`
 * synchronously — easier to verify in DevTools, GA4 DebugView, and our own
 * end-to-end tests. We still call `ReactGA.initialize` so `react-ga4` is
 * available for any future feature that prefers its API.
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

let initialised = false;

export function initAnalytics(): void {
  if (initialised) return;
  if (typeof window === "undefined") return;
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gtagOptions: {
        // Stop gtag from auto-firing a page_view every time `config` is
        // called (the HTML snippet already sent the landing page_view, and
        // we will send subsequent ones explicitly from RouteTracker).
        send_page_view: false,
      },
    });
    initialised = true;
  } catch (err) {
    // Analytics must never crash the app — fail silently.
    if (typeof console !== "undefined") {
      console.warn("[analytics] init failed", err);
    }
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  const fn = window.gtag;
  if (typeof fn !== "function") return;
  try {
    fn(...args);
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn("[analytics] gtag call failed", err);
    }
  }
}

/**
 * Send a manual page_view for SPA navigations. Called from RouteTracker on
 * every wouter location change *after* the first one (the first one is
 * already covered by the HTML gtag snippet's initial config call).
 */
export function trackPageview(path: string, title?: string): void {
  if (typeof window === "undefined") return;
  const pageTitle =
    title || (typeof document !== "undefined" ? document.title : path);
  gtag("event", "page_view", {
    page_path: path,
    page_title: pageTitle,
    page_location:
      typeof window.location !== "undefined"
        ? window.location.origin + path
        : path,
    send_to: GA_MEASUREMENT_ID,
  });
}

export type AnalyticsEvent = {
  /** Logical bucket — e.g. "Engagement", "Navigation". */
  category: string;
  /** Snake-case action / event name — e.g. "start_interview". */
  action: string;
  /** Optional context — e.g. interview type id. */
  label?: string;
  /** Optional numeric value (clicks default to 1). */
  value?: number;
};

export function trackEvent(evt: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  gtag("event", evt.action, {
    event_category: evt.category,
    event_label: evt.label,
    value: evt.value,
    send_to: GA_MEASUREMENT_ID,
  });
}
