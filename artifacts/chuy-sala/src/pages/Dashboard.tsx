import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useListNeeds } from "@workspace/api-client-react";
import { useSavedCareers } from "@/hooks/use-saved-careers";
import {
  Award,
  BookOpen,
  Compass,
  Inbox,
  MapPin,
  MessageSquare,
  Package,
  Send,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Badge {
  id: number;
  challengeId: string;
  earnedAt: string;
}
interface BookEntry {
  id: number;
  title: string;
  author: string;
  recommendedBy: string;
  review: string | null;
  category: string;
  createdAt: string;
  likeCount: number;
  isFeatured?: boolean;
}

export function Dashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1A6EA8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user.role === "school" ? <SchoolDashboard /> : <StudentDashboard />;
}

/* ─── Student Dashboard (The Learner Map) ─────────────────────────── */

function StudentDashboard() {
  const { user } = useAuth();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const displayName = user?.email.split("@")[0] ?? "";

  const [badges, setBadges] = useState<Badge[] | null>(null);
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const { data: savedCareers } = useSavedCareers();

  useEffect(() => {
    fetch(`${BASE}/api/badges`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setBadges)
      .catch(() => setBadges([]));
    fetch(`${BASE}/api/books`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then((b: BookEntry[]) => setBooks(b.slice(0, 3)))
      .catch(() => setBooks([]));
  }, []);

  const lastSaved =
    savedCareers && savedCareers.length > 0
      ? [...savedCareers].sort((a, b) => b.savedAt.localeCompare(a.savedAt))[0]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Greeting */}
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A6EA8]/10 text-[#1A6EA8] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            {t("Learner Dashboard", "ផ្ទាំងគ្រប់គ្រងសិស្ស")}
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-[#0E4870] ${
              kh ? "font-khmer leading-relaxed" : "font-display"
            }`}
          >
            {kh
              ? `សូមស្វាគមន៍ត្រឡប់មកវិញ ${displayName}! ត្រៀមរៀនថ្ងៃនេះហើយឬនៅ?`
              : `Welcome back, ${displayName}! Ready to learn today?`}
          </h1>
        </header>

        {/* Progress: Badges */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h2
                className={`font-bold text-foreground text-lg ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("Your Badges", "ស្លាកសញ្ញារបស់អ្នក")}
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              {t(
                `${badges?.length ?? 0} earned`,
                `ទទួលបាន ${badges?.length ?? 0}`,
              )}
            </span>
          </div>

          {badges === null ? (
            <div className="h-20 animate-pulse bg-sky-50 rounded-xl" />
          ) : badges.length === 0 ? (
            <div className="text-center py-6">
              <p
                className={`text-sm text-muted-foreground mb-3 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "No badges yet — try the Skeptic's Challenge!",
                  "មិនទាន់មានស្លាកសញ្ញាទេ — សាកល្បងបញ្ហាប្រឈមអ្នកគិតវិភាគ!",
                )}
              </p>
              <Link
                href="/safety"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A6EA8] text-white font-bold text-sm hover:bg-[#155A8A] transition-colors ${
                  kh ? "font-khmer text-base" : ""
                }`}
              >
                {t("Take a Challenge", "ចាប់ផ្ដើមបញ្ហាប្រឈម")}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex flex-col items-center justify-center p-3 text-center"
                  title={b.challengeId}
                >
                  <Award className="w-8 h-8 text-amber-600 mb-1" />
                  <span className="text-[10px] font-bold text-amber-900 line-clamp-2 break-words">
                    {b.challengeId}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Last Viewed: Future Pathways */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-[#1A6EA8]" />
            <h2
              className={`font-bold text-foreground text-lg ${
                kh ? "font-khmer" : "font-display"
              }`}
            >
              {t("Future Pathways", "ផ្លូវអនាគត")}
            </h2>
          </div>
          {lastSaved ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div>
                <p
                  className={`text-xs text-muted-foreground ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Last saved career", "មុខរបរដែលរក្សាទុកចុងក្រោយ")}
                </p>
                <p className={`font-bold ${kh ? "font-khmer" : ""}`}>
                  {lastSaved.careerKey.replace(/-/g, " ")}{" "}
                  <span className="text-muted-foreground font-normal text-sm">
                    · {lastSaved.majorKey.replace(/-/g, " ")}
                  </span>
                </p>
              </div>
              <Link
                href="/launchpad"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6EA8] text-white font-bold text-sm hover:bg-[#155A8A] transition-colors min-h-[44px] ${
                  kh ? "font-khmer text-base" : ""
                }`}
              >
                {t("Continue Exploring", "បន្តស្វែងយល់")}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p
                className={`text-sm text-muted-foreground ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "You haven't saved a pathway yet.",
                  "អ្នកមិនទាន់រក្សាទុកផ្លូវអាជីពទេ។",
                )}
              </p>
              <Link
                href="/launchpad"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6EA8] text-white font-bold text-sm hover:bg-[#155A8A] transition-colors min-h-[44px] ${
                  kh ? "font-khmer text-base" : ""
                }`}
              >
                {t("Browse Future Pathways", "មើលផ្លូវអនាគត")}
              </Link>
            </div>
          )}
        </section>

        {/* Community Feed: Reading List */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2
                className={`font-bold text-foreground text-lg ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("Community Reading Feed", "ព័ត៌មានសហគមន៍សៀវភៅ")}
              </h2>
            </div>
            <Link
              href="/reading-list"
              className={`text-sm font-bold text-[#1A6EA8] hover:underline ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("View all", "មើលទាំងអស់")}
            </Link>
          </div>

          {books === null ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-emerald-50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : books.length === 0 ? (
            <p
              className={`text-sm text-muted-foreground text-center py-4 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t(
                "No book recommendations yet — be the first to share one!",
                "មិនទាន់មានសៀវភៅណែនាំទេ — ត្រូវជាអ្នកដំបូងដែលចែករំលែក!",
              )}
            </p>
          ) : (
            <ul className="space-y-3">
              {books.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground truncate">
                      {b.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {b.author} ·{" "}
                      <span className={kh ? "font-khmer" : ""}>
                        {t(
                          `recommended by ${b.recommendedBy}`,
                          `ណែនាំដោយ ${b.recommendedBy}`,
                        )}
                      </span>
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold flex-shrink-0">
                    ♥ {b.likeCount}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
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

  // Map visibility
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
        {/* Greeting */}
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

        {/* Active Requests Summary */}
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
            <SummaryStat
              label={t("Pending", "កំពុងរង់ចាំ")}
              value={summary.active}
              color="amber"
              kh={kh}
            />
            <SummaryStat
              label={t("Funded", "បានឧបត្ថម្ភ")}
              value={summary.funded}
              color="emerald"
              kh={kh}
            />
            <SummaryStat
              label={t("Completed", "បានបញ្ចប់")}
              value={summary.completed}
              color="sky"
              kh={kh}
            />
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
            <h2
              className={`font-bold text-foreground text-lg ${
                kh ? "font-khmer" : "font-display"
              }`}
            >
              {t("Messaging Inbox", "ប្រអប់សារ")}
            </h2>
          </div>
          <p
            className={`text-sm text-muted-foreground mb-4 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Quick links to connect with other school administrators and partners.",
              "តំណភ្ជាប់រហ័សដើម្បីទាក់ទងជាមួយអ្នកគ្រប់គ្រងសាលាដទៃ និងដៃគូ។",
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/charities"
              className="flex items-center gap-3 p-4 rounded-xl border border-sky-100 hover:bg-sky-50 transition-colors min-h-[44px]"
            >
              <MessageSquare className="w-5 h-5 text-[#1A6EA8] flex-shrink-0" />
              <div className="min-w-0">
                <p className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Partner Directory", "បញ្ជីដៃគូ")}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("Browse NGOs & charities", "មើលអង្គការមិនរកប្រាក់ចំណេញ")}
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

        {/* Map Status Toggle */}
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-[#1A6EA8]" />
            <h2
              className={`font-bold text-foreground text-lg ${
                kh ? "font-khmer" : "font-display"
              }`}
            >
              {t("Map Status", "ស្ថានភាពផែនទី")}
            </h2>
          </div>
          <p
            className={`text-sm text-muted-foreground mb-4 ${
              kh ? "font-khmer" : ""
            }`}
          >
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
                <p
                  className={`text-xs text-muted-foreground ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {hideFromMap
                    ? t(
                        "Donors will not see your school marker.",
                        "ម្ចាស់ឧបត្ថម្ភនឹងមិនឃើញសញ្ញាសាលារបស់អ្នកទេ។",
                      )
                    : t(
                        "Your school is currently shown to all visitors.",
                        "សាលារបស់អ្នកកំពុងបង្ហាញដល់ភ្ញៀវទាំងអស់។",
                      )}
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
          {visError && (
            <p className="text-xs text-red-600 mt-2">{visError}</p>
          )}
        </section>
      </div>
    </div>
  );
}

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
