import { Heart, X, QrCode, ExternalLink } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const KHQR_IMAGE_URL =
  "https://raw.githubusercontent.com/Jrmyster/anatomy-assets/main/donation_qr.JPG";

const KOFI_URL = "https://ko-fi.com/chouysala";

interface Props {
  onClose: () => void;
}

export function SupportModal({ onClose }: Props) {
  const t = useTranslation();
  const { language } = useLanguageStore();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-border max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 px-6 pt-8 pb-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="font-display text-xl font-bold leading-tight">
            Support Science Education in Cambodia
          </h2>
          <p className="font-khmer text-base text-white/80 mt-1 leading-snug">
            គាំទ្រការអប់រំវិទ្យាសាស្ត្រនៅកម្ពុជា
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Mission statement */}
          <div className="text-center space-y-2">
            <p className={`text-muted-foreground leading-relaxed ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm"}`}>
              {t(
                "100% of donations go directly toward server hosting and digital learning resources for under-resourced classrooms across rural Cambodia.",
                "ការបរិច្ចាគ ១០០% ទៅដោយផ្ទាល់ដើម្បីជួយថ្លៃម៉ាស៊ីនបម្រើ និងធនធានសិក្សាឌីជីថលសម្រាប់ថ្នាក់រៀនដែលខ្វះខាតនៅជនបទកម្ពុជា។"
              )}
            </p>
            <p className={`text-muted-foreground/80 leading-relaxed ${language === "kh" ? "font-khmer text-sm leading-loose" : "text-xs"}`}>
              {t(
                "Every contribution keeps this platform running and helps more schools reach donors who care.",
                "រាល់ការចូលរួមរក្សាឱ្យប្លាតហ្វមនេះដំណើរការ និងជួយសាលារៀនកាន់តែច្រើនទៀតឈានដល់អ្នកបរិច្ចាគ។"
              )}
            </p>
          </div>

          {/* Divider — Local */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Local Donation", "បរិច្ចាគក្នុងស្រុក")}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* KHQR */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border-2 border-border shadow-sm">
              <img
                src={KHQR_IMAGE_URL}
                alt="KHQR Donation QR Code"
                className="w-[190px] h-[190px] object-contain rounded-lg"
                style={{ maxWidth: "300px", margin: "0 auto" }}
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden w-[190px] h-[190px] flex items-center justify-center bg-muted/30 rounded-lg">
                <QrCode className="w-16 h-16 text-muted-foreground/40" />
              </div>
            </div>
            <p className={`text-xs font-semibold text-muted-foreground text-center ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Scan to donate via KHQR (ABA / ACLEDA)", "ស្កេនដើម្បីបរិច្ចាគតាម KHQR (ABA / ACLEDA)")}
            </p>
          </div>

          {/* Divider — International */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide ${language === "kh" ? "font-khmer" : ""}`}>
              {t("International", "អន្តរជាតិ")}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Ko-fi button */}
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
            style={{ background: "linear-gradient(135deg, #FF5E5B 0%, #ff7f47 100%)" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 2.98.723 4.311zm6.173.478c-.928.116-1.682-.452-1.682-.452V7.3l1.682.252c.638.224 1.11.816 1.11 1.564v2.27c0 .819-.467 1.485-1.11 1.551z" />
            </svg>
            {t("Support via Ko-fi", "គាំទ្រតាម Ko-fi")}
            <ExternalLink className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
          </a>
        </div>

        {/* Close button */}
        <div className="px-6 pb-6 pt-1">
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
          >
            {t("Close", "បិទ")}
          </button>
        </div>
      </div>
    </div>
  );
}
