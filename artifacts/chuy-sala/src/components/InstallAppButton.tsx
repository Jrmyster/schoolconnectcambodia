import { Download, Check } from "lucide-react";
import { useState } from "react";
import { triggerInstallPrompt, isIOS } from "@/lib/pwa";
import { usePwaState } from "@/components/PWAStatusBar";
import { InstallInstructionsModal } from "@/components/InstallInstructionsModal";

interface InstallAppButtonProps {
  variant?: "compact" | "full";
  className?: string;
}

/**
 * Universal "Install App" button.
 *
 *  - On Chrome / Android / desktop: triggers the native `beforeinstallprompt`
 *    flow (when the browser has fired one).
 *  - On iOS Safari (which does NOT support `beforeinstallprompt`): opens a
 *    bilingual instructions modal walking the user through Share → Add to
 *    Home Screen.
 *  - When the app is already installed: collapses to nothing (or a tiny
 *    "App installed" badge in the `full` variant).
 */
export function InstallAppButton({ variant = "compact", className }: InstallAppButtonProps) {
  const { installEvent, installed } = usePwaState();
  const [showIosModal, setShowIosModal] = useState(false);
  const ios = isIOS();

  if (installed) {
    if (variant === "full") {
      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold ${className ?? ""}`}
          data-testid="install-app-installed"
        >
          <Check className="w-3.5 h-3.5" />
          <span>App installed</span>
          <span className="opacity-60">/</span>
          <span className="font-khmer">កម្មវិធីបានដំឡើង</span>
        </div>
      );
    }
    return null;
  }

  // Show on iOS even without `installEvent` so users get manual instructions.
  // On non-iOS browsers we still wait for `beforeinstallprompt` so we don't
  // promise an install we can't deliver.
  const canShow = ios || !!installEvent;
  if (!canShow) return null;

  const handleClick = () => {
    if (ios) {
      setShowIosModal(true);
      return;
    }
    void triggerInstallPrompt();
  };

  const ariaLabel = ios
    ? "Install App / ដំឡើងកម្មវិធី — show iPhone instructions"
    : "Install App / ដំឡើងកម្មវិធី";

  if (variant === "full") {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          data-testid="button-install-app"
          aria-label={ariaLabel}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-colors active:scale-[0.98] flex-wrap ${className ?? ""}`}
        >
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Install App</span>
          <span className="opacity-60">/</span>
          <span className="font-khmer">ដំឡើងកម្មវិធី</span>
        </button>
        <InstallInstructionsModal open={showIosModal} onClose={() => setShowIosModal(false)} />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        data-testid="button-install-app"
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors active:scale-[0.98] ${className ?? ""}`}
        title="Install App / ដំឡើងកម្មវិធី"
      >
        <Download className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="hidden sm:inline">Install</span>
        <span className="hidden sm:inline opacity-60">/</span>
        <span className="hidden sm:inline font-khmer">ដំឡើង</span>
      </button>
      <InstallInstructionsModal open={showIosModal} onClose={() => setShowIosModal(false)} />
    </>
  );
}
