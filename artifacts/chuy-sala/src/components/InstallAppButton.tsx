import { Download, Check } from "lucide-react";
import { useTranslation } from "@/store/use-language";
import { triggerInstallPrompt } from "@/lib/pwa";
import { usePwaState } from "@/components/PWAStatusBar";

interface InstallAppButtonProps {
  variant?: "compact" | "full";
  className?: string;
}

/**
 * Triggers the browser's native install prompt.
 * Hidden when the app is already installed or the browser hasn't fired
 * `beforeinstallprompt` yet (e.g. iOS Safari, which has no programmatic prompt).
 */
export function InstallAppButton({ variant = "compact", className }: InstallAppButtonProps) {
  const t = useTranslation();
  const { installEvent, installed } = usePwaState();

  if (installed) {
    if (variant === "full") {
      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold ${className ?? ""}`}
        >
          <Check className="w-3.5 h-3.5" />
          {t("App installed", "កម្មវិធីបានដំឡើង")}
        </div>
      );
    }
    return null;
  }

  if (!installEvent) {
    // Browser hasn't offered an install prompt — likely iOS or already dismissed.
    return null;
  }

  const handleClick = () => {
    void triggerInstallPrompt();
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        data-testid="button-install-app"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-colors active:scale-[0.98] ${className ?? ""}`}
      >
        <Download className="w-4 h-4" />
        {t("Install App for Offline Use", "ដំឡើងកម្មវិធីសម្រាប់ប្រើដាច់ខ្សែ")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid="button-install-app"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors active:scale-[0.98] ${className ?? ""}`}
      title={t("Install App for Offline Use", "ដំឡើងកម្មវិធីសម្រាប់ប្រើដាច់ខ្សែ")}
    >
      <Download className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{t("Install App", "ដំឡើង")}</span>
    </button>
  );
}
