import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Check, Inbox, AlertOctagon, PackagePlus, GraduationCap, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Category = "emergency" | "surplus" | "training" | "general";

interface NotificationItem {
  id: number;
  type: "new_message" | "surplus_alert";
  category: Category;
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

// ── Category style + label table ────────────────────────────────────────────
// Tailwind palette chosen for AA contrast against white card backgrounds.
const CATEGORY_META: Record<
  Category,
  {
    dot: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    chipActive: string;
    icon: React.ComponentType<{ className?: string }>;
    en: string;
    kh: string;
  }
> = {
  // Active chip backgrounds use the -700 shade for ≥4.5:1 contrast against white
  // text (WCAG AA for small text). Dots/borders keep the -500 shade for visual punch.
  emergency: {
    dot: "bg-red-600",
    border: "border-l-red-600",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    chipActive: "bg-red-700 text-white border-red-700",
    icon: AlertOctagon,
    en: "Emergency",
    kh: "បន្ទាន់",
  },
  surplus: {
    dot: "bg-emerald-600",
    border: "border-l-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    chipActive: "bg-emerald-700 text-white border-emerald-700",
    icon: PackagePlus,
    en: "Surplus",
    kh: "សម្ភារៈលើស",
  },
  training: {
    dot: "bg-sky-600",
    border: "border-l-sky-600",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    chipActive: "bg-sky-700 text-white border-sky-700",
    icon: GraduationCap,
    en: "Training",
    kh: "វគ្គបណ្តុះបណ្តាល",
  },
  general: {
    dot: "bg-slate-400",
    border: "border-l-slate-400",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    chipActive: "bg-slate-700 text-white border-slate-700",
    icon: MessageSquare,
    en: "General",
    kh: "ទូទៅ",
  },
};

const FILTER_ORDER: ReadonlyArray<Category | "all"> = ["all", "emergency", "surplus", "training", "general"];

export function NotificationBell() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [filter, setFilter] = useState<Category | "all">("all");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const visible = !!user && user.role === "school";

  async function fetchNotifications(): Promise<void> {
    try {
      const res = await fetch(`${BASE}/api/notifications`, { credentials: "include" });
      if (!res.ok) return;
      const data: ApiResponse = await res.json();
      // Defensive: backend may omit `category` for older rows or send a value
      // outside our enum (forward-compat). Coerce anything unknown to "general".
      const validCategories: ReadonlyArray<Category> = [
        "emergency",
        "surplus",
        "training",
        "general",
      ];
      setItems(
        (data.items ?? []).map((n) => ({
          ...n,
          category: validCategories.includes(n.category as Category)
            ? (n.category as Category)
            : "general",
        })),
      );
      setUnread(data.unread ?? 0);
    } catch {
      /* swallow — notifications are non-critical */
    }
  }

  useEffect(() => {
    if (!visible) return;
    void fetchNotifications();
    const id = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(id);
  }, [visible]);

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

  const filteredItems = useMemo(
    () => (filter === "all" ? items : items.filter((n) => n.category === filter)),
    [items, filter],
  );

  if (!visible) return null;

  async function markRead(id: number): Promise<void> {
    // Optimistic UI: flip the row read + decrement counter immediately.
    setItems((prev) =>
      prev.map((n) => (n.id === id && !n.isRead ? { ...n, isRead: true } : n)),
    );
    setUnread((u) => Math.max(0, u - 1));
    await fetch(`${BASE}/api/notifications/${id}/read`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    // Re-sync against the server in case the optimistic count drifted.
    void fetchNotifications();
  }

  async function markAllRead(): Promise<void> {
    setItems((prev) => prev.map((n) => (n.isRead ? n : { ...n, isRead: true })));
    setUnread(0);
    await fetch(`${BASE}/api/notifications/read-all`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    void fetchNotifications();
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

  function chipLabel(c: Category | "all"): string {
    if (c === "all") return t("All", "ទាំងអស់");
    return kh ? CATEGORY_META[c].kh : CATEGORY_META[c].en;
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
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[480px] overflow-hidden rounded-2xl bg-white border border-sky-100 shadow-xl z-50 flex flex-col">
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

          {/* Category filter chips */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-sky-50 bg-white overflow-x-auto scrollbar-thin">
            {FILTER_ORDER.map((c) => {
              const isActive = filter === c;
              const baseCls =
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap transition-all";
              if (c === "all") {
                return (
                  <button
                    key="all"
                    type="button"
                    onClick={() => setFilter("all")}
                    className={`${baseCls} ${
                      isActive
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
                    } ${kh ? "font-khmer" : ""}`}
                  >
                    {chipLabel("all")}
                  </button>
                );
              }
              const meta = CATEGORY_META[c];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`${baseCls} ${
                    isActive
                      ? meta.chipActive
                      : `bg-white ${meta.badgeText} border-current/20 hover:${meta.badgeBg}`
                  } ${kh ? "font-khmer" : ""}`}
                  title={chipLabel(c)}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? "bg-white/80" : meta.dot}`} />
                  {chipLabel(c)}
                </button>
              );
            })}
          </div>

          <div className="overflow-y-auto flex-1">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <Inbox className="w-10 h-10 text-muted-foreground/30 mb-2" />
                <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                  {filter === "all"
                    ? t("No notifications yet.", "មិនទាន់មានការជូនដំណឹងទេ។")
                    : t("No notifications in this category.", "មិនមានការជូនដំណឹងក្នុងប្រភេទនេះទេ។")}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-sky-50">
                {filteredItems.map((n) => {
                  const meta = CATEGORY_META[n.category];
                  const Icon = meta.icon;
                  const title = kh ? n.titleKh : n.titleEn;
                  const body = kh ? n.bodyKh : n.bodyEn;
                  const labelText = kh ? meta.kh : meta.en;
                  const inner = (
                    <div
                      className={`flex items-start gap-3 pl-3 pr-4 py-3 border-l-4 ${meta.border} hover:bg-sky-50/50 transition-colors`}
                    >
                      <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
                        <Icon className={`w-4 h-4 ${meta.badgeText}`} />
                        {!n.isRead && (
                          <span className={`mt-1 w-2 h-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${meta.badgeBg} ${meta.badgeText} ${kh ? "font-khmer normal-case tracking-normal" : ""}`}
                          >
                            [{labelText}]
                          </span>
                        </div>
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
