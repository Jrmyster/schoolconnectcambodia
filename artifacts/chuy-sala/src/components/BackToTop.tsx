import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const SHOW_AFTER_PX = 300;

/**
 * Floating "Back to Top" action button. Mounted once at the App root so it
 * appears on every page automatically. Hidden when the user is near the top
 * and fades in once they have scrolled past SHOW_AFTER_PX.
 */
export function BackToTop() {
  const language = useLanguageStore((s) => s.language);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }

  const labelEn = "Back to Top";
  const labelKh = "ត្រឡប់ទៅខាងលើ";
  const ariaLabel = language === "kh" ? labelKh : labelEn;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div
        className="relative flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Bilingual desktop tooltip */}
        <div
          role="tooltip"
          className={`hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 shadow-lg transition-all duration-150 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1 pointer-events-none"
          }`}
        >
          <span>{labelEn}</span>
          <span className="mx-1.5 text-slate-400">/</span>
          <span className="font-khmer">{labelKh}</span>
          {/* Tooltip tail */}
          <span
            aria-hidden
            className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[6px] border-l-slate-900/95"
          />
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label={ariaLabel}
          title={`${labelEn} / ${labelKh}`}
          className="group w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center
                     bg-white/55 hover:bg-white/95 active:scale-95
                     backdrop-blur-md border border-white/60 hover:border-emerald-400
                     shadow-lg hover:shadow-xl
                     text-slate-700 hover:text-emerald-700
                     transition-all duration-200"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
