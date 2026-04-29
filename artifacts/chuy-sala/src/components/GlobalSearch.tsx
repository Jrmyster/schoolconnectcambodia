import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Search, X, ArrowRight, Sparkles, CornerDownLeft } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { searchIndex, POPULAR_ENTRIES, type SearchEntry } from "@/data/searchIndex";

type Variant = "hero" | "compact";

type Props = {
  variant?: Variant;
  className?: string;
  /** Optional: invoked after a result is chosen (e.g. close mobile menu). */
  onNavigate?: () => void;
};

export function GlobalSearch({ variant = "hero", className = "", onNavigate }: Props) {
  const [, navigate] = useLocation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (q.trim().length === 0) return [];
    return searchIndex(q, 8).map((r) => r.entry);
  }, [q]);

  const showPopular = q.trim().length === 0;
  const visible: SearchEntry[] = showPopular ? POPULAR_ENTRIES : results;

  useEffect(() => setActiveIdx(0), [q]);

  // Click-outside to close
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // ESC anywhere closes
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function handleNavigate(href: string) {
    setOpen(false);
    setQ("");
    if (onNavigate) onNavigate();
    inputRef.current?.blur();

    // Extract the in-page anchor (if any) so we can scroll to it after
    // the destination page mounts, with sticky-header offset.
    const hashIdx = href.indexOf("#");
    const hash = hashIdx === -1 ? "" : href.slice(hashIdx + 1);

    requestAnimationFrame(() => {
      // Pass the full href (path + hash) so the URL bar reflects the hash.
      // Destination pages can then read window.location.hash on mount to
      // open conditional sub-sections (e.g. PhilosophyMap's Mind branch).
      navigate(href);
      if (!hash) {
        // Top of page on plain navigation
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      // Wait for the destination page to mount, then scroll to the anchor.
      // We retry briefly because heavy pages may take a moment to render
      // or to expand a conditionally-rendered section that contains the anchor.
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (tries++ < 30) setTimeout(tryScroll, 80);
      };
      setTimeout(tryScroll, 50);
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(i + 1, Math.max(0, visible.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const target = visible[activeIdx];
      if (target) {
        e.preventDefault();
        handleNavigate(target.href);
      }
    }
  }

  const isHero = variant === "hero";

  // ── Styles per variant ────────────────────────────────────
  const wrapper = isHero
    ? "w-full max-w-2xl mx-auto"
    : "w-full max-w-md";

  const shellBase = "relative flex items-center gap-2 transition-all duration-200";
  const shell = isHero
    ? `${shellBase} rounded-2xl bg-white shadow-2xl border-2 px-3 sm:px-4 py-2 sm:py-3 ${
        open ? "border-primary ring-4 ring-primary/20" : "border-white/60"
      }`
    : `${shellBase} rounded-full bg-white/95 border px-3 py-1.5 ${
        open ? "border-primary ring-2 ring-primary/30 shadow-md" : "border-slate-300 hover:border-primary/50 hover:shadow-sm"
      }`;

  const inputCls = isHero
    ? `flex-1 min-w-0 bg-transparent text-base sm:text-lg text-foreground placeholder:text-slate-400 focus:outline-none ${
        kh ? "font-khmer text-base sm:text-lg leading-snug" : ""
      }`
    : `flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-slate-400 focus:outline-none ${
        kh ? "font-khmer" : ""
      }`;

  return (
    <div ref={containerRef} className={`relative ${wrapper} ${className}`}>
      <div className={shell}>
        {/* Magnifier (large tap target) */}
        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
            setOpen(true);
          }}
          aria-label={kh ? "ស្វែងរក" : "Search"}
          className={`flex-shrink-0 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors active:scale-95 ${
            isHero ? "w-11 h-11 sm:w-12 sm:h-12" : "w-8 h-8"
          }`}
        >
          <Search className={isHero ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4"} />
        </button>

        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          inputMode="search"
          enterKeyHint="search"
          aria-label={kh ? "របារស្វែងរកទូទៅ" : "Global search"}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="global-search-listbox"
          placeholder={
            isHero
              ? (kh
                  ? "តើអ្នកចង់រៀនអ្វីនៅថ្ងៃនេះ? / What do you want to learn today?"
                  : "What do you want to learn today? / តើអ្នកចង់រៀនអ្វីនៅថ្ងៃនេះ?")
              // Compact (navbar) variant — single bilingual line so the magnifier
              // bar in the global header reads the same in either language.
              : "Search for anything... (ស្វែងរកអ្វីក៏បាន...)"
          }
          className={inputCls}
        />

        {q.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
            aria-label={kh ? "សម្អាតការស្វែងរក" : "Clear search"}
            className={`flex-shrink-0 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 active:scale-95 ${
              isHero ? "w-9 h-9" : "w-7 h-7"
            }`}
          >
            <X className={isHero ? "w-4 h-4" : "w-3.5 h-3.5"} />
          </button>
        )}

        {isHero && (
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500 mr-1">
            <CornerDownLeft className="w-3 h-3" />
            Enter
          </kbd>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          id="global-search-listbox"
          role="listbox"
          className={`absolute left-0 right-0 ${isHero ? "mt-3" : "mt-2"} z-[60] rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150`}
        >
          {/* Header strip */}
          <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 border-b border-slate-100">
            <div className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {showPopular ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {kh ? "ការស្នើដ៏ពេញនិយម" : "Popular"}
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 text-primary" />
                  {kh
                    ? `លទ្ធផល • ${visible.length}`
                    : `${visible.length} ${visible.length === 1 ? "result" : "results"}`}
                </>
              )}
            </div>
            <span className={`text-[10px] text-slate-400 hidden sm:inline ${kh ? "font-khmer text-xs" : ""}`}>
              {kh ? "↑↓ ដើម្បីជ្រើស • Enter ដើម្បីបើក" : "↑↓ to navigate • Enter to open • Esc to close"}
            </span>
          </div>

          {visible.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">
                {kh ? "រកមិនឃើញលទ្ធផលសម្រាប់" : "No results for"} <span className="text-primary">"{q}"</span>
              </p>
              {/* Single bilingual paired string — exact spec from the brief.
                  Khmer half is wrapped in <span class="font-khmer"> so the
                  Khmer script renders in its proper typeface even when the
                  surrounding paragraph uses the Latin font. */}
              <p className="text-sm mt-2 text-slate-600">
                No results found. Try another keyword! (
                <span className="font-khmer">
                  រកមិនឃើញលទ្ធផលទេ។ សាកល្បងពាក្យគន្លឹះផ្សេងទៀត!
                </span>
                )
              </p>
            </div>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto py-1">
              {visible.map((entry, idx) => (
                <ResultRow
                  key={entry.id}
                  entry={entry}
                  active={idx === activeIdx}
                  query={q}
                  kh={kh}
                  onHover={() => setActiveIdx(idx)}
                  onClick={() => handleNavigate(entry.href)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

function ResultRow({
  entry, active, query, kh, onHover, onClick,
}: {
  entry: SearchEntry;
  active: boolean;
  query: string;
  kh: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const Icon = entry.icon;
  const title = kh ? entry.titleKh : entry.titleEn;
  const desc = kh ? entry.descKh : entry.descEn;
  const cat = kh ? entry.categoryKh : entry.categoryEn;

  return (
    <li role="option" aria-selected={active}>
      <button
        type="button"
        onMouseMove={onHover}
        onClick={onClick}
        className={`w-full text-left flex items-start gap-3 px-3 sm:px-4 py-3 transition-colors ${
          active ? "bg-primary/10" : "hover:bg-slate-50"
        }`}
      >
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          active ? "bg-primary text-white" : "bg-primary/10 text-primary"
        } transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold text-foreground text-sm sm:text-base ${kh ? "font-khmer text-base sm:text-lg" : ""}`}>
              {highlight(title, query)}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-100 text-slate-600 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {cat}
            </span>
          </div>
          <p className={`text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-2 ${kh ? "font-khmer text-sm leading-snug" : ""}`}>
            {desc}
          </p>
        </div>
        <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-3 transition-all ${
          active ? "text-primary translate-x-0.5" : "text-slate-300"
        }`} />
      </button>
    </li>
  );
}

/** Wraps query matches in <mark> for visual highlighting. */
function highlight(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const lq = q.toLowerCase();
  const idx = lower.indexOf(lq);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-200 text-foreground rounded-sm px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
