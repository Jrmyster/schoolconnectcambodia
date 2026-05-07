import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sparkles,
  PlayCircle,
  Compass,
  GraduationCap,
  FileText,
  Mic,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import {
  CATEGORIES,
  getProgress,
  getLastModule,
  type LastModule,
  type CategoryKey,
} from "@/lib/learning-progress";

/* ────────────────────────────────────────────────────────────────────
 * StudentDashboard
 *
 * Personalized landing page shown to a student immediately after a
 * successful sign-in (Login.tsx navigates to /dashboard, which routes
 * here via Dashboard.tsx based on user.role).
 *
 * Three sections:
 *   1. Welcome banner with personalised greeting + Quick Resume.
 *   2. Learning Map — progress bars for the four curriculum hubs.
 *   3. Career & Future Hub — Resume Builder + Interview Simulator.
 *
 * All headings are bilingual (English / Khmer).
 * ──────────────────────────────────────────────────────────────────── */

export function StudentDashboard() {
  const { user } = useAuth();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [progress, setProgress] = useState<Record<CategoryKey, number>>(() =>
    getProgress(),
  );
  const [lastModule, setLastModule] = useState<LastModule | null>(() =>
    getLastModule(),
  );

  // Re-read progress whenever the route tracker emits an update so the
  // dashboard stays live if the student opens it in another tab.
  useEffect(() => {
    const refresh = () => {
      setProgress(getProgress());
      setLastModule(getLastModule());
    };
    window.addEventListener("chuy-sala:progress-updated", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("chuy-sala:progress-updated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  // Friendly first name from email local-part: "sokha.lim@..." → "Sokha"
  const displayName = (() => {
    if (!user?.email) return "";
    const local = user.email.split("@")[0] ?? "";
    const first = local.split(/[._-]/)[0] ?? local;
    return first.charAt(0).toUpperCase() + first.slice(1);
  })();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        <WelcomeBanner
          displayName={displayName}
          lastModule={lastModule}
          kh={kh}
          t={t}
        />

        <LearningMap progress={progress} kh={kh} t={t} />

        <CareerHub kh={kh} t={t} />
      </div>
    </div>
  );
}

/* ─── 1. Welcome Banner ─────────────────────────────────────────── */

interface WelcomeBannerProps {
  displayName: string;
  lastModule: LastModule | null;
  kh: boolean;
  t: (en: string, km: string) => string;
}

function WelcomeBanner({ displayName, lastModule, kh, t }: WelcomeBannerProps) {
  return (
    <section
      data-testid="dashboard-welcome-banner"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A6EA8] via-[#2887C7] to-[#3FA9D5] text-white shadow-xl shadow-sky-200/50"
    >
      {/* Decorative shapes */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/95 text-xs font-bold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span className={kh ? "font-khmer" : ""}>
            {t("Student Dashboard", "ផ្ទាំងគ្រប់គ្រងសិស្ស")}
          </span>
        </div>

        <h1
          data-testid="dashboard-greeting"
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
            kh ? "font-khmer leading-relaxed" : "font-display"
          }`}
        >
          {kh
            ? `សូមស្វាគមន៍ការត្រឡប់មកវិញ ${displayName || "សិស្ស"}!`
            : `Welcome back, ${displayName || "Student"}!`}
        </h1>

        <p
          className={`mt-3 max-w-2xl text-white/90 text-sm sm:text-base ${
            kh ? "font-khmer leading-relaxed" : ""
          }`}
        >
          {t(
            "Pick up where you left off, or explore something new today.",
            "បន្តពីកន្លែងដែលអ្នកបានឈប់ ឬរុករកអ្វីថ្មីនៅថ្ងៃនេះ។",
          )}
        </p>

        {/* Quick Resume */}
        <div className="mt-6">
          {lastModule ? (
            <Link
              href={lastModule.path}
              data-testid="quick-resume-button"
              className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-[#0E4870] font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <PlayCircle className="w-5 h-5 text-[#1A6EA8]" />
              <span className="flex flex-col items-start leading-tight">
                <span
                  className={`text-[10px] uppercase tracking-wider text-[#1A6EA8]/70 font-bold ${
                    kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                  }`}
                >
                  {t("Resume", "បន្ត")}
                </span>
                <span
                  className={`text-sm sm:text-base max-w-[14rem] sm:max-w-xs truncate ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {kh ? lastModule.titleKh : lastModule.titleEn}
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#1A6EA8] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/science"
              data-testid="quick-resume-button"
              className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-[#0E4870] font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className={kh ? "font-khmer" : ""}>
                {t("Start exploring", "ចាប់ផ្តើមរុករក")}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Learning Map ───────────────────────────────────────────── */

interface LearningMapProps {
  progress: Record<CategoryKey, number>;
  kh: boolean;
  t: (en: string, km: string) => string;
}

const CATEGORY_LINKS: Record<CategoryKey, string> = {
  science: "/science",
  technology: "/technology/future-intelligence",
  math: "/mathematics",
  english: "/english-writing",
};

function LearningMap({ progress, kh, t }: LearningMapProps) {
  return (
    <section data-testid="dashboard-learning-map">
      <header className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h2
            className={`text-xl sm:text-2xl font-bold text-[#0E4870] ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t("Learning Map", "ផែនទីសិក្សា")}
          </h2>
          <p
            className={`text-sm text-muted-foreground ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Your progress across the main curriculum hubs.",
              "វឌ្ឍនភាពរបស់អ្នកនៅទូទាំងមជ្ឈមណ្ឌលសិក្សាសំខាន់ៗ។",
            )}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => {
          const pct = progress[cat.key] ?? 0;
          return (
            <Link
              key={cat.key}
              href={CATEGORY_LINKS[cat.key]}
              data-testid={`progress-card-${cat.key}`}
              className="group block bg-white rounded-2xl border border-sky-100 shadow-md shadow-sky-100/50 hover:shadow-lg hover:-translate-y-0.5 transition-all p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3
                  className={`font-bold text-foreground text-base sm:text-lg leading-snug ${
                    kh ? "font-khmer leading-relaxed" : ""
                  }`}
                >
                  {kh ? cat.labelKh : cat.labelEn}
                </h3>
                <span
                  className={`shrink-0 text-2xl font-bold tabular-nums ${cat.accent}`}
                  data-testid={`progress-pct-${cat.key}`}
                >
                  {pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${cat.labelEn} progress`}
              >
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${cat.gradient} transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-xs text-muted-foreground ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {pct >= 100
                    ? t("Hub complete!", "បានបញ្ចប់!")
                    : pct === 0
                      ? t("Not started yet", "មិនទាន់ចាប់ផ្តើម")
                      : t(`${pct}% Complete`, `បានបញ្ចប់ ${pct}%`)}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold text-[#1A6EA8] group-hover:gap-2 transition-all ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Open hub", "បើកមជ្ឈមណ្ឌល")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ─── 3. Career & Future Hub ────────────────────────────────────── */

interface CareerHubProps {
  kh: boolean;
  t: (en: string, km: string) => string;
}

function CareerHub({ kh, t }: CareerHubProps) {
  const cards = [
    {
      key: "resume",
      href: "/career/resume-builder",
      icon: FileText,
      iconWrap: "bg-amber-100 text-amber-700",
      titleEn: "Resume Builder",
      titleKh: "កម្មវិធីបង្កើតប្រវត្តិរូបសង្ខេប",
      descEn: "Draft your CV for your first job.",
      descKh: "តាក់តែងប្រវត្តិរូបរបស់អ្នកសម្រាប់ការងារដំបូង។",
    },
    {
      key: "interview",
      href: "/launchpad?tool=interview",
      icon: Mic,
      iconWrap: "bg-rose-100 text-rose-700",
      titleEn: "Interview Simulator",
      titleKh: "កម្មវិធីក្លែងធ្វើបទសម្ភាសន៍",
      descEn: "Practice answering common employer questions.",
      descKh: "អនុវត្តការឆ្លើយសំណួរបទសម្ភាសន៍ជាញឹកញាប់។",
    },
  ] as const;

  return (
    <section data-testid="dashboard-career-hub">
      <header className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h2
            className={`text-xl sm:text-2xl font-bold text-[#0E4870] ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t("Career & Future Hub", "មជ្ឈមណ្ឌលអាជីព និងអនាគត")}
          </h2>
          <p
            className={`text-sm text-muted-foreground ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Practical tools to prepare you for the workforce.",
              "ឧបករណ៍ជាក់ស្តែងដើម្បីត្រៀមអ្នកសម្រាប់ទីផ្សារការងារ។",
            )}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            data-testid={`career-card-${c.key}`}
            className="group relative block bg-white rounded-2xl border border-amber-100 shadow-md shadow-amber-100/40 hover:shadow-xl hover:-translate-y-0.5 transition-all p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${c.iconWrap}`}
              >
                <c.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-foreground text-base sm:text-lg ${
                    kh ? "font-khmer leading-relaxed" : ""
                  }`}
                >
                  {kh ? c.titleKh : c.titleEn}
                </h3>
                <p
                  className={`mt-1 text-sm text-muted-foreground ${
                    kh ? "font-khmer leading-relaxed" : ""
                  }`}
                >
                  {kh ? c.descKh : c.descEn}
                </p>
                <span
                  className={`inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#1A6EA8] group-hover:gap-2 transition-all ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Open tool", "បើកឧបករណ៍")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
