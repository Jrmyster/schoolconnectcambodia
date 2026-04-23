import { useEffect } from "react";
import { useLocation } from "wouter";
import { recordVisit } from "@/lib/learning-progress";

/**
 * RouteTracker
 * ────────────
 * Invisible component that watches wouter's location and records each
 * meaningful module the student visits, so the Student Dashboard can
 * surface a "Quick Resume" button and live progress percentages.
 *
 * Mounted once near the top of <App />.
 */
export function RouteTracker() {
  const [path] = useLocation();

  useEffect(() => {
    // Wait one frame so the new page can update document.title before
    // we snapshot it. document.title is the only consistent source of
    // a human-readable module name across the codebase's many pages.
    const timer = window.setTimeout(() => {
      const docTitle = document.title || path;
      // Strip a trailing " | Chouy Sala" or similar branding suffix.
      const cleaned = docTitle.split(/[|·–—]/)[0].trim() || docTitle;
      recordVisit(path, cleaned, cleaned);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [path]);

  return null;
}
