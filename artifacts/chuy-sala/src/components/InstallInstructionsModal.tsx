import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Plus } from "lucide-react";

interface InstallInstructionsModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Bilingual iOS install instructions modal.
 *
 * iOS Safari does not support `beforeinstallprompt`, so the only way to
 * install a PWA on iPhone / iPad is for the user to tap the Share button
 * and choose "Add to Home Screen". This modal walks them through it.
 */
export function InstallInstructionsModal({
  open,
  onClose,
}: InstallInstructionsModalProps) {
  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
      data-testid="ios-install-modal"
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 pt-10 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close / បិទ"
          data-testid="ios-install-close"
          className="absolute top-3 right-3 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header band */}
        <div className="px-6 pt-6 pb-5 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent border-b border-slate-100">
          <h2
            id="ios-install-title"
            className="text-lg sm:text-xl font-bold text-slate-900 leading-tight"
          >
            Install on iPhone / iPad
          </h2>
          <p className="font-khmer text-sm text-slate-700 mt-1 leading-loose">
            ដំឡើងនៅលើ iPhone / iPad
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Step 1 — Tap Share */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-slate-900">
                  Tap the
                </span>
                <span
                  className="inline-flex items-center justify-center"
                  aria-label="Apple Share icon"
                >
                  <AppleShareIcon />
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  Share icon at the bottom of Safari.
                </span>
              </div>
              <p className="font-khmer text-sm text-slate-700 leading-loose mt-1">
                ចុចរូបតំណាង
                <span className="inline-flex align-middle mx-1">
                  <AppleShareIcon />
                </span>
                ចែករំលែកនៅខាងក្រោម Safari។
              </p>
            </div>
          </div>

          {/* Step 2 — Scroll & Add to Home Screen */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">
                Scroll down and tap{" "}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold">
                  <Plus className="w-3.5 h-3.5" />
                  Add to Home Screen
                </span>
                .
              </div>
              <p className="font-khmer text-sm text-slate-700 leading-loose mt-1">
                អូសចុះក្រោម ហើយចុច{" "}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold">
                  <Plus className="w-3.5 h-3.5" />
                  បន្ថែមទៅអេក្រង់ដើម
                </span>
                ។
              </p>
            </div>
          </div>

          {/* Step 3 — Confirm */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">
                Tap <strong>Add</strong> in the top-right to finish.
              </div>
              <p className="font-khmer text-sm text-slate-700 leading-loose mt-1">
                ចុច <strong>បន្ថែម</strong> នៅខាងស្ដាំខាងលើដើម្បីបញ្ចប់។
              </p>
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed">
            <p className="text-amber-900">
              <strong>Tip:</strong> If you don't see "Add to Home Screen", make
              sure you're using <strong>Safari</strong> — Chrome and Firefox
              on iOS cannot install web apps.
            </p>
            <p className="font-khmer text-amber-900 leading-loose mt-1">
              <strong>គន្លឹះ៖</strong> ប្រសិនបើអ្នកមិនឃើញ "បន្ថែមទៅអេក្រង់ដើម" ត្រូវប្រាកដថាអ្នកកំពុងប្រើ <strong>Safari</strong> — Chrome និង Firefox នៅលើ iOS មិនអាចដំឡើងកម្មវិធីវេបទេ។
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-1">
          <button
            type="button"
            onClick={onClose}
            data-testid="ios-install-got-it"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-colors active:scale-[0.98]"
          >
            Got it
            <span className="font-khmer text-base ml-1">/ យល់ហើយ</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Apple "Share" glyph — a square with an arrow pointing up out of the top.
 * Drawn inline as SVG so it renders identically across browsers regardless
 * of font / emoji support.
 */
function AppleShareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0a66ff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      data-testid="apple-share-icon"
      className="inline-block align-middle"
    >
      {/* Box opens at the top */}
      <path d="M8 12 L4 12 L4 21 L20 21 L20 12 L16 12" />
      {/* Arrow shaft + head pointing up out of the box */}
      <line x1="12" y1="3" x2="12" y2="15" />
      <polyline points="8 7 12 3 16 7" />
    </svg>
  );
}
