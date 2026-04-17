import { useEffect, useRef, useState } from "react";
import { Bell, Check, Inbox } from "lucide-react";
import { Link } from "wouter";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface NotificationItem {
  id: number;
  type: "new_message" | "surplus_alert";
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

interface ApiResponse {
  items: NotificationItem[];
  unread: number;
}

export function NotificationBell() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Only render the bell for school accounts (per spec).
  const visible = !!user && user.role === "school";

  async function fetchNotifications(): Promise<void> {
    try {
      const res = await fetch(`${BASE}/api/notifications`, { credentials: "include" });
      if (!res.ok) return;
      const data: ApiResponse = await res.json();
      setItems(data.items ?? []);
      setUnread(data.unread ?? 0);
    } catch {
      /* swallow — notifications are non-critical */
    }
  }

  // Initial fetch + 60s poll
  useEffect(() => {
    if (!visible) return;
    void fetchNotifications();
    const id = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(id);
  }, [visible]);

  // Click-outside to close
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!visible) return null;

  async function markRead(id: number): Promise<void> {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    setUnread((u) => Math.max(0, u - 1));
    await fetch(`${BASE}/api/notifications/${id}/read`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }

  async function markAllRead(): Promise<void> {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnread(0);
    await fetch(`${BASE}/api/notifications/read-all`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }

  function formatTime(iso: string): string {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const min = Math.floor(diffMs / 60_000);
    if (min < 1) return t("just now", "ឥឡូវនេះ");
    if (min < 60) return t(`${min}m ago`, `${min} នាទីមុន`);
    const hr = Math.floor(min / 60);
    if (hr < 24) return t(`${hr}h ago`, `${hr} ម៉ោងមុន`);
    const days = Math.floor(hr / 24);
    return t(`${days}d ago`, `${days} ថ្ងៃមុន`);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
        aria-label={t("Notifications", "ការជូនដំណឹង")}
        title={t("Notifications", "ការជូនដំណឹង")}
      >
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-white"
            aria-label={`${unread} unread`}
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[420px] overflow-hidden rounded-2xl bg-white border border-sky-100 shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-sky-100 bg-sky-50/40">
            <span className={`font-bold text-sm text-sky-900 ${kh ? "font-khmer" : ""}`}>
              {t("Notifications", "ការជូនដំណឹង")}
            </span>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className={`flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 hover:underline ${kh ? "font-khmer" : ""}`}
              >
                <Check className="w-3 h-3" />
                {t("Mark all read", "សម្គាល់ថាបានអានទាំងអស់")}
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <Inbox className="w-10 h-10 text-muted-foreground/30 mb-2" />
                <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                  {t("No notifications yet.", "មិនទាន់មានការជូនដំណឹងទេ។")}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-sky-50">
                {items.map((n) => {
                  const title = kh ? n.titleKh : n.titleEn;
                  const body = kh ? n.bodyKh : n.bodyEn;
                  const inner = (
                    <div className="flex items-start gap-3 px-4 py-3 hover:bg-sky-50/50 transition-colors">
                      <span
                        className={`mt-1 inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                          n.isRead ? "bg-transparent" : "bg-red-500"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold text-foreground leading-snug ${kh ? "font-khmer" : ""}`}>
                          {title}
                        </p>
                        <p className={`text-xs text-muted-foreground line-clamp-2 mt-0.5 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                          {body}
                        </p>
                        <p className={`text-[10px] text-muted-foreground/70 mt-1 ${kh ? "font-khmer" : ""}`}>
                          {formatTime(n.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                  if (n.link) {
                    return (
                      <li key={n.id}>
                        <Link
                          href={n.link}
                          onClick={() => {
                            void markRead(n.id);
                            setOpen(false);
                          }}
                          className="block"
                        >
                          {inner}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => void markRead(n.id)}
                        className="block w-full text-left"
                      >
                        {inner}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-sky-100 px-4 py-2 bg-sky-50/40">
            <Link
              href="/school-inbox"
              onClick={() => setOpen(false)}
              className={`block text-center text-xs text-sky-700 hover:text-sky-900 hover:underline font-bold ${kh ? "font-khmer" : ""}`}
            >
              {t("Open inbox →", "បើកប្រអប់សារ →")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
