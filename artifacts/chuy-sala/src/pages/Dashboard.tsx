import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useListNeeds } from "@workspace/api-client-react";
import { StudentDashboard } from "./StudentDashboard";
import {
  Eye,
  EyeOff,
  Inbox,
  MapPin,
  Package,
  Send,
  Sparkles,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Dashboard dispatcher ────────────────────────────────────────
 * Routed at /dashboard. Login.tsx and the registration flow both
 * navigate here on success. We forward to the role-appropriate view:
 *   - student → personalised Student Dashboard (separate file)
 *   - school  → School Dashboard (defined below)
 * ────────────────────────────────────────────────────────────────── */

export function Dashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const t = useTranslation();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div role="status" className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1A6EA8] border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">{t("Loading…", "កំពុងផ្ទុក…")}</span>
      </div>
    );
  }

  return user.role === "school" ? <SchoolDashboard /> : <StudentDashboard />;
}

/* ─── School Dashboard (The Resource Map) ─────────────────────────── */

function SchoolDashboard() {
  const { user } = useAuth();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const schoolName = user?.school
    ? kh
      ? user.school.nameKh
      : user.school.nameEn
    : "—";

  const { data: needs } = useListNeeds(
    user?.schoolId ? { schoolId: user.schoolId } : undefined,
    { query: { enabled: !!user?.schoolId } },
  );

  const summary = {
    active: needs?.filter((n: any) => n.status === "active").length ?? 0,
    funded: needs?.filter((n: any) => n.status === "funded").length ?? 0,
    completed: needs?.filter((n: any) => n.status === "completed").length ?? 0,
  };

  const [hideFromMap, setHideFromMap] = useState<boolean>(false);
  const [savingVis, setSavingVis] = useState(false);
  const [visError, setVisError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.schoolId) return;
    fetch(`${BASE}/api/schools/${user.schoolId}?includeHidden=true`, {
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (s) setHideFromMap(!!s.hideFromMap);
      })
      .catch(() => {});
  }, [user?.schoolId]);

  async function toggleMapVisibility() {
    if (!user?.schoolId) return;
    setSavingVis(true);
    setVisError(null);
    const next = !hideFromMap;
    try {
      const res = await fetch(`${BASE}/api/schools/${user.schoolId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ hideFromMap: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to update");
      }
      setHideFromMap(next);
    } catch (e: any) {
      setVisError(e.message);
    } finally {
      setSavingVis(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A6EA8]/10 text-[#1A6EA8] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            {t("School Portal", "ច្រកសាលា")}
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-[#0E4870] ${
              kh ? "font-khmer leading-relaxed" : "font-display"
            }`}
          >
            {t("Management Portal:", "ច្រកគ្រប់គ្រង៖")}{" "}
            <span className={kh ? "font-khmer" : ""}>{schoolName}</span>
          </h1>
          {!user?.schoolId && (
            <p
              className={`text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t(
                "Your account isn't linked to a school yet. Ask an administrator to link your account.",
                "គណនីរបស់អ្នកមិនទាន់ភ្ជាប់ជាមួយសាលារៀនទេ។ សូមស្នើសុំអ្នកគ្រប់គ្រងភ្ជាប់គណនីរបស់អ្នក។",
              )}
            </p>
          )}
        </header>

        {/* Active Requests */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1A6EA8]" />
              <h2
                className={`font-bold text-foreground text-lg ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("Active Requests", "សំណើបច្ចុប្បន្ន")}
              </h2>
            </div>
            <Link
              href="/needs"
              className={`text-sm font-bold text-[#1A6EA8] hover:underline ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("View all", "មើលទាំងអស់")}
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <SummaryStat label={t("Pending", "កំពុងរង់ចាំ")} value={summary.active} color="amber" kh={kh} />
            <SummaryStat label={t("Funded", "បានឧបត្ថម្ភ")} value={summary.funded} color="emerald" kh={kh} />
            <SummaryStat label={t("Completed", "បានបញ្ចប់")} value={summary.completed} color="sky" kh={kh} />
          </div>

          {needs && needs.length > 0 && (
            <ul className="space-y-2">
              {needs.slice(0, 4).map((n: any) => (
                <li
                  key={n.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-sky-100 bg-sky-50/40"
                >
                  <span className={`font-medium truncate ${kh ? "font-khmer" : ""}`}>
                    {kh ? n.titleKh : n.titleEn}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                      n.status === "active"
                        ? "bg-amber-100 text-amber-700"
                        : n.status === "funded"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-sky-100 text-sky-700"
                    } ${kh ? "font-khmer" : ""}`}
                  >
                    {n.status === "active"
                      ? t("Pending", "កំពុងរង់ចាំ")
                      : n.status === "funded"
                        ? t("Funded", "បានឧបត្ថម្ភ")
                        : t("Completed", "បានបញ្ចប់")}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <Link
              href={user?.schoolId ? `/school/${user.schoolId}` : "/needs"}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6EA8] text-white font-bold text-sm hover:bg-[#155A8A] transition-colors min-h-[44px] ${
                kh ? "font-khmer text-base" : ""
              }`}
            >
              <Send className="w-4 h-4" />
              {t("Post a New Request", "បង្ហោះសំណើថ្មី")}
            </Link>
          </div>
        </section>

        {/* Messaging Inbox / Quick Links */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Inbox className="w-5 h-5 text-[#1A6EA8]" />
            <h2 className={`font-bold text-foreground text-lg ${kh ? "font-khmer" : "font-display"}`}>
              {t("Messaging Inbox", "ប្រអប់សារ")}
            </h2>
          </div>
          <p className={`text-sm text-muted-foreground mb-4 ${kh ? "font-khmer" : ""}`}>
            {t(
              "Quick links to connect with other school administrators and partners.",
              "តំណភ្ជាប់រហ័សដើម្បីទាក់ទងជាមួយអ្នកគ្រប់គ្រងសាលាដទៃ និងដៃគូ។",
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/school-inbox"
              className="flex items-center gap-3 p-4 rounded-xl border border-sky-100 hover:bg-sky-50 transition-colors min-h-[44px]"
            >
              <Inbox className="w-5 h-5 text-[#1A6EA8] flex-shrink-0" />
              <div className="min-w-0">
                <p className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Open Inbox", "បើកប្រអប់សារ")}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("Read messages from other schools", "អានសារពីសាលាដទៃ")}
                </p>
              </div>
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-3 p-4 rounded-xl border border-sky-100 hover:bg-sky-50 transition-colors min-h-[44px]"
            >
              <MapPin className="w-5 h-5 text-[#1A6EA8] flex-shrink-0" />
              <div className="min-w-0">
                <p className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Other Schools", "សាលាដទៃ")}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("Find peers on the map", "ស្វែងរកសាលាដទៃនៅលើផែនទី")}
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Map Status */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-[#1A6EA8]" />
            <h2 className={`font-bold text-foreground text-lg ${kh ? "font-khmer" : "font-display"}`}>
              {t("Map Status", "ស្ថានភាពផែនទី")}
            </h2>
          </div>
          <p className={`text-sm text-muted-foreground mb-4 ${kh ? "font-khmer" : ""}`}>
            {t(
              "Choose whether your school appears on the public map for donors and visitors.",
              "ជ្រើសរើសថាតើសាលារបស់អ្នកត្រូវបង្ហាញនៅលើផែនទីសាធារណៈ សម្រាប់ម្ចាស់ឧបត្ថម្ភ និងភ្ញៀវឬទេ។",
            )}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-4 rounded-2xl border border-sky-100 bg-sky-50/40">
            <div className="flex items-center gap-3">
              {hideFromMap ? (
                <EyeOff className="w-6 h-6 text-amber-600" />
              ) : (
                <Eye className="w-6 h-6 text-emerald-600" />
              )}
              <div>
                <p className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                  {hideFromMap
                    ? t("Hidden from public map", "បានលាក់ពីផែនទីសាធារណៈ")
                    : t("Visible on public map", "បង្ហាញនៅលើផែនទីសាធារណៈ")}
                </p>
                <p className={`text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                  {hideFromMap
                    ? t("Donors will not see your school marker.", "ម្ចាស់ឧបត្ថម្ភនឹងមិនឃើញសញ្ញាសាលារបស់អ្នកទេ។")
                    : t("Your school is currently shown to all visitors.", "សាលារបស់អ្នកកំពុងបង្ហាញដល់ភ្ញៀវទាំងអស់។")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleMapVisibility}
              disabled={savingVis || !user?.schoolId}
              aria-pressed={!hideFromMap}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm min-h-[44px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                hideFromMap
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              } ${kh ? "font-khmer text-base" : ""}`}
            >
              {savingVis
                ? t("Saving…", "កំពុងរក្សាទុក…")
                : hideFromMap
                  ? t("Show on map", "បង្ហាញលើផែនទី")
                  : t("Hide from map", "លាក់ពីផែនទី")}
            </button>
          </div>
          {visError && <p role="alert" className="text-xs text-red-600 mt-2">{visError}</p>}
        </section>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function SummaryStat({
  label,
  value,
  color,
  kh,
}: {
  label: string;
  value: number;
  color: "amber" | "emerald" | "sky";
  kh: boolean;
}) {
  const palette = {
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    sky: "bg-sky-50 border-sky-200 text-sky-800",
  }[color];
  return (
    <div className={`rounded-2xl border p-3 text-center ${palette}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-xs ${kh ? "font-khmer" : ""}`}>{label}</div>
    </div>
  );
}
