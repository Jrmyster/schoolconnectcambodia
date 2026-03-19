import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { X, Share2, Heart } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

interface DonationSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function DonationSuccessModal({ open, onClose }: DonationSuccessModalProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      firedRef.current = false;
      return;
    }
    if (firedRef.current) return;
    firedRef.current = true;

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#1A6EA8", "#FFD700", "#E63946"] });
    fire(0.2,  { spread: 60, colors: ["#1A6EA8", "#FFD700", "#E63946"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#FFFFFF", "#1A6EA8", "#FFD700"] });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });
  }, [open]);

  const handleShare = async () => {
    const url = window.location.origin;
    const text = `I just supported a rural school project in Cambodia. Join me in making a difference! ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Chouy Sala – Help School", text, url });
      } catch {
        // user cancelled — ignore
      }
    } else {
      // Fallback: open Telegram share in new tab
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      window.open(telegramUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-8 pt-10 pb-8 text-center text-primary-foreground">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className={`text-2xl font-bold mb-1 ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t(
              "Thank You for Empowering Our Students!",
              "សូមអរគុណសម្រាប់ការផ្តល់អំណាចដល់សិស្សរបស់យើង!"
            )}
          </h2>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5">
          <p className={`text-muted-foreground leading-relaxed text-sm ${language === "kh" ? "font-khmer" : ""}`}>
            {t(
              "Your support directly impacts the education of high school students here in our community. Whether it's a new projector for the meeting room or English textbooks for Grade 12, your contribution makes a tangible difference.",
              "ការគាំទ្ររបស់អ្នកជះឥទ្ធិពលផ្ទាល់ដល់ការអប់រំរបស់សិស្សវិទ្យាល័យនៅក្នុងសហគមន៍របស់យើង។ មិនថាជាម៉ាស៊ីនបញ្ចាំងស្លាយថ្មីសម្រាប់បន្ទប់ប្រជុំ ឬសៀវភៅសិក្សាភាសាអង់គ្លេសសម្រាប់ថ្នាក់ទី ១២ ការរួមចំណែករបស់អ្នកបង្កើតឱ្យមានភាពខុសប្លែកគ្នាយ៉ាងពិតប្រាកដ។"
            )}
          </p>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-bold py-4 px-6 rounded-2xl transition-all text-base shadow-lg shadow-primary/30"
          >
            <Share2 className="w-5 h-5" />
            {t("Share this Project", "ចែករំលែកគម្រោងនេះ")}
          </button>

          {/* Fallback share links */}
          <div className="flex gap-3">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(`I just supported a rural school project in Cambodia. Join me in making a difference! ${window.location.origin}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-border hover:border-primary/40 hover:bg-primary/5 rounded-2xl py-3 text-sm font-semibold text-foreground transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="w-5 h-5" />
              Telegram
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-border hover:border-primary/40 hover:bg-primary/5 rounded-2xl py-3 text-sm font-semibold text-foreground transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5" />
              Facebook
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            {t("Close", "បិទ")}
          </button>
        </div>
      </div>
    </div>
  );
}
