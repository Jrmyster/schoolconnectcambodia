import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Search,
  KeyRound,
  Users,
  RefreshCw,
  X,
  Trophy,
} from "lucide-react";
import { validatePin } from "@/lib/student-auth";

interface AdminStudent {
  id: number;
  username: string;
  schoolId: number | null;
  expPoints: number;
  createdAt: string;
}

const API = "/api/admin";

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: "include", ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
  return data as T;
}

export function AdminStudentsPage() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { toast } = useToast();

  const [students, setStudents] = useState<AdminStudent[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloading, setReloading] = useState(false);
  const [query, setQuery] = useState("");

  // Reset-PIN modal state
  const [resetTarget, setResetTarget] = useState<AdminStudent | null>(null);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [resetting, setResetting] = useState(false);

  // ── Admin guard ─────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    if (!user.isAdmin) {
      // Not a teacher — bounce to dashboard.
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  // ── Load students ───────────────────────────────────────────────
  const loadStudents = async () => {
    setReloading(true);
    setLoadError(null);
    try {
      const list = await api<AdminStudent[]>(`${API}/students`);
      setStudents(list);
    } catch (e: any) {
      setLoadError(String(e?.message ?? e));
    } finally {
      setReloading(false);
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) return;
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.isAdmin]);

  // ── Filtered list ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!students) return [];
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => s.username.toLowerCase().includes(q));
  }, [students, query]);

  // ── Reset PIN handler ───────────────────────────────────────────
  const onReset = async () => {
    if (!resetTarget) return;

    const r1 = validatePin(newPin);
    if (!r1.ok) {
      toast({
        variant: "destructive",
        title: t("Invalid PIN", "លេខសម្ងាត់មិនត្រឹមត្រូវ"),
        description: kh ? r1.errorKh : r1.errorEn,
      });
      return;
    }
    if (newPin !== confirmPin) {
      toast({
        variant: "destructive",
        title: t("PINs don't match", "លេខសម្ងាត់មិនត្រូវគ្នា"),
      });
      return;
    }

    setResetting(true);
    try {
      await api(`${API}/students/${resetTarget.id}/reset-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: newPin }),
      });
      toast({
        title: t("PIN reset", "បានកំណត់លេខសម្ងាត់ឡើងវិញ"),
        description: t(
          `New PIN saved for ${resetTarget.username}.`,
          `បានរក្សាទុកលេខសម្ងាត់ថ្មីសម្រាប់ ${resetTarget.username}។`,
        ),
      });
      setResetTarget(null);
      setNewPin("");
      setConfirmPin("");
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: t("Reset failed", "ការកំណត់ឡើងវិញបានបរាជ័យ"),
        description: String(e?.message ?? e),
      });
    } finally {
      setResetting(false);
    }
  };

  // ── Render guards ───────────────────────────────────────────────
  if (authLoading || (user && !user.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">
          {t("Loading…", "កំពុងផ្ទុក…")}
        </div>
      </div>
    );
  }
  if (!user) return null; // navigation in flight

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/60 to-background py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-violet-200">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-violet-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Teacher Admin", "ផ្ទាំងគ្រូ")}
              </span>
              <h1
                id="admin-students-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-violet-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t("Student Accounts", "គណនីសិស្ស")}
              </h1>
            </div>
          </div>
          <p
            className={`text-base text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Every student who signed up with a username and 4-digit PIN is listed below. If a student forgets their PIN, click Reset PIN to assign them a new one.",
              "សិស្សគ្រប់រូបដែលបានចុះឈ្មោះដោយឈ្មោះអ្នកប្រើប្រាស់ និងលេខសម្ងាត់ ៤ ខ្ទង់ ត្រូវបានរាយខាងក្រោម។ បើសិស្សភ្លេចលេខសម្ងាត់ ចុច «កំណត់លេខសម្ងាត់ឡើងវិញ» ដើម្បីផ្តល់លេខថ្មីដល់ពួកគេ។",
            )}
          </p>
        </header>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                "Search by username (e.g. sokha)",
                "ស្វែងរកតាមឈ្មោះអ្នកប្រើប្រាស់ (ឧ. sokha)",
              )}
              data-testid="input-search-students"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-border bg-background text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all ${
                kh ? "font-khmer text-base" : ""
              }`}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={loadStudents}
            disabled={reloading}
            data-testid="button-refresh"
            className={`rounded-xl ${kh ? "font-khmer" : ""}`}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${reloading ? "animate-spin" : ""}`}
            />
            {t("Refresh", "ផ្ទុកឡើងវិញ")}
          </Button>
        </div>

        {/* Stat strip */}
        <div className="mb-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-sm">
          <Users className="w-4 h-4" />
          <span className={`font-semibold ${kh ? "font-khmer" : ""}`}>
            {students === null
              ? t("Loading…", "កំពុងផ្ទុក…")
              : t(
                  `${filtered.length} of ${students.length} students`,
                  `${filtered.length} ក្នុងចំណោម ${students.length} សិស្ស`,
                )}
          </span>
        </div>

        {/* List */}
        {loadError && (
          <div
            role="alert"
            className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-4 mb-4 text-sm text-destructive"
          >
            {t("Could not load students:", "មិនអាចផ្ទុកសិស្ស៖")} {loadError}
          </div>
        )}

        {students !== null && filtered.length === 0 && !loadError && (
          <div
            data-testid="empty-state"
            className="rounded-2xl border-2 border-dashed border-border bg-white/60 p-10 text-center"
          >
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p
              className={`text-foreground/80 font-semibold ${
                kh ? "font-khmer" : ""
              }`}
            >
              {students.length === 0
                ? t(
                    "No student-PIN accounts yet.",
                    "មិនទាន់មានគណនីសិស្សដែលប្រើលេខសម្ងាត់ទេ។",
                  )
                : t(
                    "No students match your search.",
                    "មិនមានសិស្សត្រូវនឹងការស្វែងរករបស់អ្នក។",
                  )}
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <div
            data-testid="grid-student-rows"
            role="list"
            className="rounded-2xl border-2 border-border bg-white shadow-sm overflow-hidden"
          >
            {filtered.map((s, i) => (
              <div
                key={s.id}
                role="listitem"
                data-testid={`row-student-${s.username}`}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 ${
                  i !== filtered.length - 1
                    ? "border-b border-border/60"
                    : ""
                } hover:bg-muted/30 transition-colors`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {s.username.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    data-testid={`text-username-${s.username}`}
                    className="font-semibold text-foreground font-mono text-sm sm:text-base truncate"
                  >
                    {s.username}
                  </div>
                  <div
                    className={`text-xs text-muted-foreground flex items-center gap-3 mt-0.5 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {s.expPoints} XP
                    </span>
                    <span className="hidden sm:inline">
                      {t("Joined", "បានចូលរួម")}{" "}
                      {new Date(s.createdAt).toLocaleDateString(
                        kh ? "km-KH" : "en-US",
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setResetTarget(s);
                    setNewPin("");
                    setConfirmPin("");
                  }}
                  data-testid={`button-reset-pin-${s.username}`}
                  className={`flex-shrink-0 rounded-lg ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                  {t("Reset PIN", "កំណត់ឡើងវិញ")}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Reset-PIN modal ───────────────────────────────────────── */}
      {resetTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-pin-title"
          data-testid="modal-reset-pin"
          onClick={(e) => {
            if (e.target === e.currentTarget && !resetting) {
              setResetTarget(null);
            }
          }}
        >
          <div className="w-full max-w-sm bg-card rounded-3xl shadow-2xl border border-border p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="reset-pin-title"
                  className={`font-bold text-lg text-foreground ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Reset PIN", "កំណត់លេខសម្ងាត់ឡើងវិញ")}
                </h2>
                <p
                  className={`text-xs text-muted-foreground mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Set a new 4-digit PIN for", "កំណត់លេខសម្ងាត់ ៤ ខ្ទង់ថ្មីសម្រាប់")}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {resetTarget.username}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => !resetting && setResetTarget(null)}
                aria-label={t("Close", "បិទ")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className={`block font-semibold mb-1.5 text-sm ${
                    kh ? "font-khmer text-base" : ""
                  }`}
                  htmlFor="new-pin"
                >
                  {t("New PIN", "លេខសម្ងាត់ថ្មី")}*
                </label>
                <input
                  id="new-pin"
                  type="password"
                  inputMode="numeric"
                  pattern="\d{4}"
                  maxLength={4}
                  autoComplete="off"
                  autoFocus
                  value={newPin}
                  onChange={(e) =>
                    setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  data-testid="input-new-pin"
                  placeholder="••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-background tracking-[0.5em] text-center text-lg"
                />
              </div>

              <div>
                <label
                  className={`block font-semibold mb-1.5 text-sm ${
                    kh ? "font-khmer text-base" : ""
                  }`}
                  htmlFor="confirm-pin"
                >
                  {t("Confirm PIN", "បញ្ជាក់លេខសម្ងាត់")}*
                </label>
                <input
                  id="confirm-pin"
                  type="password"
                  inputMode="numeric"
                  pattern="\d{4}"
                  maxLength={4}
                  autoComplete="off"
                  value={confirmPin}
                  onChange={(e) =>
                    setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  data-testid="input-confirm-pin"
                  placeholder="••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-background tracking-[0.5em] text-center text-lg"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetTarget(null)}
                  disabled={resetting}
                  className={`flex-1 rounded-xl ${kh ? "font-khmer" : ""}`}
                  data-testid="button-cancel-reset"
                >
                  {t("Cancel", "បោះបង់")}
                </Button>
                <Button
                  type="button"
                  onClick={onReset}
                  disabled={resetting}
                  className={`flex-1 rounded-xl ${kh ? "font-khmer" : ""}`}
                  data-testid="button-confirm-reset"
                >
                  {resetting
                    ? t("Saving…", "កំពុងរក្សាទុក…")
                    : t("Save new PIN", "រក្សាទុកលេខសម្ងាត់ថ្មី")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
