import { useState } from "react";
import { HandHeart, Send, MessageCircle, ShieldCheck, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const TELEGRAM_BLUE = "#0088cc";
const WHATSAPP_GREEN = "#25D366";

interface ConnectToHelpProps {
  schoolNameEn: string;
  schoolNameKh: string;
  needTitleEn: string;
  contactPhone?: string | null;
  telegramUsername?: string | null;
}

type Channel = "telegram" | "whatsapp";

function slugifyHandle(name: string): string {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
}

function normalizePhone(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;
  if (!hasPlus && !digits.startsWith("855") && digits.startsWith("0")) {
    digits = "855" + digits.slice(1);
  } else if (!hasPlus && !digits.startsWith("855") && digits.length <= 9) {
    digits = "855" + digits;
  }
  return digits;
}

function normalizeTelegramHandle(raw?: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^@/, "").replace(/^https?:\/\/t\.me\//i, "");
  return cleaned.length >= 3 ? cleaned : null;
}

export function ConnectToHelp({
  schoolNameEn,
  schoolNameKh,
  needTitleEn,
  contactPhone,
  telegramUsername,
}: ConnectToHelpProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [pending, setPending] = useState<{ channel: Channel; url: string; appName: string } | null>(null);

  const tgHandle =
    normalizeTelegramHandle(telegramUsername) || slugifyHandle(schoolNameEn);
  const waPhone = normalizePhone(contactPhone);

  const message = `Hello, I saw your request on School Connect Cambodia regarding "${needTitleEn}" for ${schoolNameEn}. I would like to help — could we discuss what is still needed?`;

  const telegramUrl = tgHandle ? `https://t.me/${tgHandle}` : null;
  const whatsappUrl = waPhone
    ? `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`
    : null;

  const askLeave = (channel: Channel) => {
    if (channel === "telegram" && telegramUrl) {
      setPending({ channel, url: telegramUrl, appName: "Telegram" });
    } else if (channel === "whatsapp" && whatsappUrl) {
      setPending({ channel, url: whatsappUrl, appName: "WhatsApp" });
    }
  };

  const confirmLeave = () => {
    if (!pending) return;
    window.open(pending.url, "_blank", "noopener,noreferrer");
    setPending(null);
  };

  const tgDisabled = !telegramUrl;
  const waDisabled = !whatsappUrl;

  return (
    <div
      className="mt-4 pt-4 border-t border-dashed border-border/70"
      data-testid="connect-to-help"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center shadow-inner">
          <HandHeart className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-foreground">
            {t("Connect to Help", "ទាក់ទងដើម្បីជួយ")}
          </p>
          {isKh && (
            <p className="font-khmer text-[11px] text-muted-foreground">
              ផ្ញើសាររហ័សទៅសាលា
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {/* Telegram */}
        <button
          type="button"
          onClick={() => askLeave("telegram")}
          disabled={tgDisabled}
          aria-label="Connect on Telegram"
          data-testid="connect-telegram"
          className="group flex items-center justify-center gap-1.5 px-2 py-2 min-h-[44px] rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: TELEGRAM_BLUE,
            // @ts-expect-error css var
            "--tw-ring-color": TELEGRAM_BLUE,
          }}
        >
          <Send className="w-4 h-4 shrink-0 -rotate-12 group-hover:rotate-0 transition-transform" fill="currentColor" />
          <span className="flex flex-col items-center leading-tight min-w-0">
            <span>Telegram</span>
            <span className="font-khmer text-[10px] sm:text-[11px] font-normal opacity-90 truncate max-w-full">
              តេឡេក្រាម
            </span>
          </span>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => askLeave("whatsapp")}
          disabled={waDisabled}
          aria-label="Connect on WhatsApp"
          data-testid="connect-whatsapp"
          className="group flex items-center justify-center gap-1.5 px-2 py-2 min-h-[44px] rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: WHATSAPP_GREEN,
            // @ts-expect-error css var
            "--tw-ring-color": WHATSAPP_GREEN,
          }}
        >
          <MessageCircle className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" />
          <span className="flex flex-col items-center leading-tight min-w-0">
            <span>WhatsApp</span>
            <span className="font-khmer text-[10px] sm:text-[11px] font-normal opacity-90 truncate max-w-full">
              វ៉តស្អាប់
            </span>
          </span>
        </button>
      </div>

      {(tgDisabled || waDisabled) && (
        <p className={`mt-2 text-[11px] text-muted-foreground ${isKh ? "font-khmer" : ""}`}>
          {tgDisabled && waDisabled
            ? t(
                "No direct contact handle on file for this school yet.",
                "មិនទាន់មានព័ត៌មានទំនាក់ទំនងផ្ទាល់សម្រាប់សាលានេះនៅឡើយទេ។",
              )
            : tgDisabled
            ? t("Telegram handle not yet provided.", "មិនទាន់មានឈ្មោះ Telegram។")
            : t("Phone number not yet provided.", "មិនទាន់មានលេខទូរស័ព្ទ។")}
        </p>
      )}

      {/* Leaving-site confirmation modal */}
      <Dialog open={!!pending} onOpenChange={(open) => !open && setPending(null)}>
        <DialogContent className="sm:max-w-md" data-testid="leaving-site-modal">
          <DialogHeader>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 mx-auto"
              style={{
                backgroundColor:
                  pending?.channel === "telegram" ? TELEGRAM_BLUE : WHATSAPP_GREEN,
              }}
            >
              {pending?.channel === "telegram" ? (
                <Send className="w-6 h-6 text-white" fill="currentColor" />
              ) : (
                <MessageCircle className="w-6 h-6 text-white" fill="currentColor" />
              )}
            </div>
            <DialogTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t("Leaving Chouy Sala", "កំពុងចាកចេញពី ជួយសាលា")}
            </DialogTitle>
            <DialogDescription className="text-center pt-2 leading-relaxed">
              <span className="block">
                You are now leaving Chouy Sala to securely connect with the school representative on {pending?.appName ?? ""}.
              </span>
              <span className="block font-khmer leading-loose mt-2">
                អ្នកកំពុងចាកចេញពី ជួយសាលា ដើម្បីទាក់ទងជាមួយតំណាងសាលាតាមរយៈ {pending?.appName ?? ""} ដោយសុវត្ថិភាព។
              </span>
              <span className="block mt-3 text-xs text-muted-foreground">
                <span>Re: {schoolNameEn}</span>
                {schoolNameKh && (
                  <span className="block font-khmer">អំពី៖ {schoolNameKh}</span>
                )}
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPending(null)}
              className="w-full sm:w-auto"
              data-testid="leaving-cancel"
            >
              {t("Stay here", "នៅទីនេះ")}
            </Button>
            <Button
              type="button"
              onClick={confirmLeave}
              className="w-full sm:flex-1 text-white font-bold gap-2"
              style={{
                backgroundColor:
                  pending?.channel === "telegram" ? TELEGRAM_BLUE : WHATSAPP_GREEN,
              }}
              data-testid="leaving-confirm"
            >
              {t(`Continue to ${pending?.appName ?? ""}`, `បន្តទៅ ${pending?.appName ?? ""}`)}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
