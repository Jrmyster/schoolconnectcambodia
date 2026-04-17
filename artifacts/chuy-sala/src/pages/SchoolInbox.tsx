import { useEffect, useState } from "react";
import { Inbox, Mail, MailOpen, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface SchoolMessage {
  id: number;
  fromSchoolId: number;
  toSchoolId: number;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  fromSchoolNameEn: string | null;
  fromSchoolNameKh: string | null;
}

export function SchoolInbox() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { user, isLoading } = useAuth();

  const [messages, setMessages] = useState<SchoolMessage[] | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (!user || user.role !== "school") return;
    fetch(`${BASE}/api/school-messages`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [user]);

  async function toggleOpen(m: SchoolMessage): Promise<void> {
    const next = openId === m.id ? null : m.id;
    setOpenId(next);
    if (next !== null && !m.isRead) {
      setMessages((prev) =>
        (prev ?? []).map((x) => (x.id === m.id ? { ...x, isRead: true } : x)),
      );
      await fetch(`${BASE}/api/school-messages/${m.id}/read`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "school") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className={`text-muted-foreground ${kh ? "font-khmer" : ""}`}>
          {t(
            "This inbox is only available to school accounts.",
            "ប្រអប់សារនេះមានសម្រាប់តែគណនីសាលាប៉ុណ្ណោះ។",
          )}
        </p>
        <Link href="/login" className="mt-4 inline-block text-primary hover:underline text-sm font-bold">
          {t("Sign in", "ចូលគណនី")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header className="flex items-center gap-3">
          <Inbox className="w-7 h-7 text-sky-600" />
          <div>
            <h1 className={`text-2xl font-bold text-sky-900 ${kh ? "font-khmer" : "font-display"}`}>
              {t("School Inbox", "ប្រអប់សារសាលា")}
            </h1>
            <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
              {t(
                "Messages from other schools.",
                "សារពីសាលាដទៃ។",
              )}
            </p>
          </div>
        </header>

        {messages === null ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white animate-pulse border border-sky-100" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sky-100 p-10 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Your inbox is empty.", "ប្រអប់សាររបស់អ្នកទទេ។")}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {messages.map((m) => {
              const senderName = kh
                ? m.fromSchoolNameKh ?? m.fromSchoolNameEn ?? "—"
                : m.fromSchoolNameEn ?? m.fromSchoolNameKh ?? "—";
              const isOpen = openId === m.id;
              return (
                <li
                  key={m.id}
                  className={`bg-white rounded-2xl border shadow-sm transition-all ${
                    m.isRead ? "border-sky-100" : "border-sky-300 ring-1 ring-sky-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => void toggleOpen(m)}
                    className="w-full text-left p-4 flex items-start gap-3"
                  >
                    {m.isRead ? (
                      <MailOpen className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    ) : (
                      <Mail className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`font-bold text-sm text-foreground truncate ${kh ? "font-khmer" : ""}`}>
                          {senderName}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">
                          {new Date(m.createdAt).toLocaleDateString(kh ? "km-KH" : "en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className={`text-sm text-foreground/80 truncate ${kh ? "font-khmer" : ""}`}>
                        {m.subject}
                      </p>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 -mt-1 ml-8 border-t border-sky-50 pt-3">
                      <p className={`text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                        {m.body}
                      </p>
                      <Link
                        href={`/school/${m.fromSchoolId}`}
                        className={`inline-block mt-3 text-xs text-sky-700 hover:text-sky-900 hover:underline font-bold ${kh ? "font-khmer" : ""}`}
                      >
                        {t("View sender's school →", "មើលសាលាអ្នកផ្ញើ →")}
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
