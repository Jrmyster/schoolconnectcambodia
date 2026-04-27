import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { recordVisit } from "@/lib/learning-progress";
import { trackPageview } from "@/lib/analytics";

/**
 * RouteTracker
 * ────────────
 * Invisible component that watches wouter's location and:
 *
 *   1. Records each meaningful module the student visits, so the Student
 *      Dashboard can surface a "Quick Resume" button and live progress
 *      percentages (existing behaviour).
 *
 *   2. Sends a Google Analytics 4 `page_view` to react-ga4 on every SPA
 *      navigation so the dashboard at analytics.google.com reflects which
 *      pages students are visiting in real time.
 *
 *      The very first invocation is intentionally skipped — the literal
 *      gtag snippet in `index.html` already sent a `page_view` for the
 *      landing URL when the page loaded, and double-firing on the same
 *      path inflates the bounce rate and active-user count.
 *
 * Mounted once near the top of <App />.
 */
export function RouteTracker() {
  const [path] = useLocation();
  const isFirstHit = useRef(true);

  useEffect(() => {
    // Wait one frame so the new page can update document.title before we
    // snapshot it. document.title is the only consistent source of a
    // human-readable module name across the codebase's many pages.
    const timer = window.setTimeout(() => {
      const docTitle = document.title || path;
      // Strip a trailing " | Chouy Sala" or similar branding suffix.
      const cleaned = docTitle.split(/[|·–—]/)[0].trim() || docTitle;

      // (1) Local progress tracking — always runs.
      recordVisit(path, cleaned, cleaned);

      // (2) Google Analytics — skip the very first hit because the HTML
      // gtag config already sent it.
      if (isFirstHit.current) {
        isFirstHit.current = false;
      } else {
        trackPageview(path, cleaned);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [path]);

  return null;
}
