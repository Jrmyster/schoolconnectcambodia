import { useState } from "react";
import { X, Send, Loader2, AlertOctagon, PackagePlus, GraduationCap, MessageSquare } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Category = "emergency" | "surplus" | "training" | "general";

const CATEGORY_OPTIONS: ReadonlyArray<{
  value: Category;
  en: string;
  kh: string;
  icon: React.ComponentType<{ className?: string }>;
  ring: string;
  text: string;
  bg: string;
}> = [
  {
    value: "general",
    en: "General Message",
    kh: "សារទូទៅ",
    icon: MessageSquare,
    ring: "ring-slate-400 border-slate-400",
    text: "text-slate-700",
    bg: "bg-slate-100",
  },
  {
    value: "emergency",
    en: "Emergency Need",
    kh: "តម្រូវការបន្ទាន់",
    icon: AlertOctagon,
    ring: "ring-red-500 border-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
  },
  {
    value: "surplus",
    en: "Surplus Item",
    kh: "សម្ភារៈលើស",
    icon: PackagePlus,
    ring: "ring-emerald-500 border-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    value: "training",
    en: "Training Opportunity",
    kh: "ឱកាសបណ្តុះបណ្តាល",
    icon: GraduationCap,
    ring: "ring-sky-500 border-sky-500",
    text: "text-sky-700",
    bg: "bg-sky-50",
  },
];

interface Props {
  toSchoolId: number;
  recipientNameEn: string;
  recipientNameKh: string;
  onClose: () => void;
}

export function SendSchoolMessageModal({ toSchoolId, recipientNameEn, recipientNameKh, onClose }: Props) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [category, setCategory] = useState<Category>("general");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE}/api/school-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ toSchoolId, subject: subject.trim(), body: body.trim(), category }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to send");
      }
      setDone(true);
      setTimeout(onClose, 1200);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-100 bg-sky-50/40">
          <div className="min-w-0">
            <h2 className={`font-bold text-lg text-sky-900 ${kh ? "font-khmer" : "font-display"}`}>
              {t("Send Message", "ផ្ញើសារ")}
            </h2>
            <p className={`text-xs text-muted-foreground truncate ${kh ? "font-khmer" : ""}`}>
              {t(`To: ${recipientNameEn}`, `ទៅ៖ ${recipientNameKh}`)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-sky-100 text-muted-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center space-y-2">
            <Send className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className={`font-bold text-emerald-700 ${kh ? "font-khmer" : ""}`}>
              {t("Message sent!", "សារត្រូវបានផ្ញើ!")}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label className={`block text-xs font-bold text-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
                {t("Category", "ប្រភេទ")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORY_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const active = category === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setCategory(opt.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all min-h-[44px] ${
                        active
                          ? `${opt.bg} ${opt.text} ${opt.ring} ring-2`
                          : "bg-white text-muted-foreground border-sky-100 hover:bg-sky-50"
                      } ${kh ? "font-khmer" : ""}`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${active ? opt.text : "text-muted-foreground"}`} />
                      <span className="truncate">{kh ? opt.kh : opt.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className={`block text-xs font-bold text-foreground mb-1 ${kh ? "font-khmer" : ""}`}>
                {t("Subject", "ប្រធានបទ")}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                minLength={2}
                maxLength={200}
                className="w-full px-3 py-2 rounded-xl border border-sky-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-sm"
                placeholder={t("e.g. Question about your surplus desks", "ឧ. សំណួរអំពីតុលើស")}
              />
            </div>
            <div>
              <label className={`block text-xs font-bold text-foreground mb-1 ${kh ? "font-khmer" : ""}`}>
                {t("Message", "សារ")}
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                minLength={5}
                maxLength={4000}
                rows={6}
                className={`w-full px-3 py-2 rounded-xl border border-sky-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-sm resize-y ${kh ? "font-khmer" : ""}`}
                placeholder={t("Write your message…", "សរសេរសាររបស់អ្នក…")}
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted ${kh ? "font-khmer" : ""}`}
              >
                {t("Cancel", "បោះបង់")}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold hover:bg-sky-700 disabled:opacity-50 ${kh ? "font-khmer" : ""}`}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {t("Send", "ផ្ញើ")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
