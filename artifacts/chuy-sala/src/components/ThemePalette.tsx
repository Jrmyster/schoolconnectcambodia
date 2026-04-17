import { useEffect, useRef, useState } from "react";
import { Palette, RotateCcw, Check } from "lucide-react";
import { useThemeStore, THEMES, getTheme, type ThemeId } from "@/store/use-theme";
import { useLanguageStore } from "@/store/use-language";

export function ThemePalette() {
  const { themeId, setTheme } = useThemeStore();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Apply theme to <body> whenever it changes (and on first mount)
  useEffect(() => {
    const theme = getTheme(themeId);
    const body = document.body;
    body.dataset.theme = themeId;
    if (themeId === "default") {
      body.style.removeProperty("--main-bg-color");
      body.style.removeProperty("--main-text-color");
    } else {
      body.style.setProperty("--main-bg-color", theme.bg);
      body.style.setProperty("--main-text-color", theme.text);
    }
  }, [themeId]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const tooltip = "Change Theme / ផ្លាស់ប្តូរពណ៌ផ្ទៃខាងក្រោយ";
  const current = getTheme(themeId);

  const rainbow = THEMES.filter((t) => t.id !== "default");
  const def = THEMES[0];

  const pickLabel = (t: typeof THEMES[number]) => (kh ? t.labelKh : t.labelEn);

  const handlePick = (id: ThemeId) => {
    setTheme(id);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={tooltip}
        aria-label={tooltip}
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative flex items-center justify-center rounded-full border-2 border-primary/25 bg-white hover:bg-primary/5 hover:border-primary/50 transition-all text-primary shadow-sm active:scale-95 w-10 h-10"
      >
        <Palette className="w-4 h-4" />
        {/* current-color dot */}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white shadow"
          style={{ backgroundColor: current.swatch }}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={kh ? "ជ្រើសរើសពណ៌ផ្ទៃខាងក្រោយ" : "Choose background theme"}
          className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl border border-border/60 bg-white shadow-xl p-3 animate-in fade-in zoom-in-95"
          style={{ zIndex: 60 }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-1 pb-2 mb-2 border-b border-border/40">
            <Palette className="w-4 h-4 text-primary" />
            <div className="flex-1 min-w-0">
              <div className={`font-bold text-sm text-foreground leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                {kh ? "ក្ដារលាយពណ៌ប្រធានបទ" : "Rainbow Theme Palette"}
              </div>
              <div className={`text-[10px] text-muted-foreground leading-tight ${kh ? "font-khmer text-xs" : ""}`}>
                {kh ? "ផ្លាស់ប្ដូរពណ៌ផ្ទៃខាងក្រោយ" : "Change site background"}
              </div>
            </div>
          </div>

          {/* Rainbow swatches */}
          <div className="grid grid-cols-7 gap-2 px-1">
            {rainbow.map((t) => {
              const active = themeId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => handlePick(t.id)}
                  title={pickLabel(t)}
                  aria-label={pickLabel(t)}
                  className={`relative w-7 h-7 rounded-full border-2 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 ${active ? "border-slate-900 shadow-md" : "border-white shadow ring-1 ring-slate-200"}`}
                  style={{ backgroundColor: t.swatch }}
                >
                  {active && (
                    <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-slate-900" strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Current selection label */}
          <div className={`mt-2 px-1 text-[11px] text-muted-foreground ${kh ? "font-khmer text-xs" : ""}`}>
            {(kh ? "បច្ចុប្បន្ន៖ " : "Current: ")}
            <span className={`font-semibold text-foreground ${kh ? "font-khmer" : ""}`}>{pickLabel(current)}</span>
          </div>

          {/* Reset / Default */}
          <button
            type="button"
            role="menuitemradio"
            aria-checked={themeId === "default"}
            onClick={() => handlePick("default")}
            className={`mt-3 w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors border ${themeId === "default" ? "bg-primary text-white border-primary" : "bg-slate-50 text-foreground border-border/60 hover:bg-slate-100"} ${kh ? "font-khmer" : ""}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{kh ? def.labelKh : `Reset · ${def.labelEn}`}</span>
          </button>
        </div>
      )}
    </div>
  );
}
