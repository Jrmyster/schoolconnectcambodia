import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import {
  Users,
  ClipboardList,
  CheckCircle2,
  Printer,
  ArrowLeft,
  Activity,
  GraduationCap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useOnline } from "@/components/PWAStatusBar";
import { OfflineFallback } from "@/components/OfflineFallback";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface ImpactStatsResponse {
  vitalSigns: {
    studentsGuided: number;
    activeNeeds: number;
    projectsCompleted: number;
  };
  learningTrends: Array<{
    key: string;
    labelEn: string;
    labelKh: string;
    count: number;
  }>;
  feed: Array<{
    id: string;
    type: "project" | "quiz";
    timestamp: string;
    en: string;
    kh: string;
  }>;
  generatedAt: string;
}

function formatDate(iso: string, kh: boolean): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(kh ? "km-KH" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export function ImpactReportPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const online = useOnline();

  const [data, setData] = useState<ImpactStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!online) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`${BASE}/api/impact-stats`, { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: ImpactStatsResponse) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? "Failed to load report");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [online]);

  if (!online && !data) {
    return (
      <OfflineFallback
        titleEn="The Impact Report needs internet"
        titleKh="របាយការណ៍ផលប៉ះពាល់ត្រូវការអ៊ីនធឺណិត"
      />
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const chartData =
    data?.learningTrends.map((t) => ({
      name: kh ? t.labelKh : t.labelEn,
      students: t.count,
    })) ?? [];

  const generatedLabel = data
    ? formatDate(data.generatedAt, kh)
    : formatDate(new Date().toISOString(), kh);

  return (
    <div className="impact-report-root min-h-screen bg-slate-50">
      {/* Print-only stylesheet — hides nav, chat, mascot, FABs and tightens layout for A4 */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          html, body { background: #ffffff !important; }
          body * { visibility: hidden !important; }
          .impact-report-root, .impact-report-root * { visibility: visible !important; }
          .impact-report-root { position: absolute; inset: 0; padding: 0 !important; background: #ffffff !important; }
          .no-print { display: none !important; }
          nav, header, footer, [role="navigation"] { display: none !important; }
          .ai-chat-panel, .mascot-fab, .back-to-top, [data-floating], [data-mascot] { display: none !important; }
          .print-card { box-shadow: none !important; border: 1px solid #cbd5e1 !important; break-inside: avoid; }
          .print-grid { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 12px !important; }
          .print-stack { break-inside: avoid; }
          h1 { font-size: 22pt !important; }
          h2 { font-size: 14pt !important; }
          .recharts-wrapper { page-break-inside: avoid; }
        }
      `}</style>

      {/* Top bar (screen only) */}
      <div className="no-print bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-700 ${kh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            data-testid="button-export-report"
            className={`inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <Printer className="w-4 h-4" />
            {t("Export Report for Donors", "ទាញយករបាយការណ៍")}
          </button>
        </div>
      </div>

      {/* Report body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Header / Cover */}
        <header className="print-card bg-white rounded-2xl border border-slate-200 shadow-sm px-6 sm:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-[11px] font-bold tracking-[0.18em] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("Transparency Report", "របាយការណ៍តម្លាភាព")}
              </div>
              <h1
                className={`mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}
              >
                {t("Impact & Transparency Report", "របាយការណ៍ផលប៉ះពាល់ និងតម្លាភាព")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-slate-600 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Prepared for community leaders, donors, and the Ministry of Education.",
                  "រៀបចំសម្រាប់មេដឹកនាំសហគមន៍ ម្ចាស់ជំនួយ និងក្រសួងអប់រំ យុវជន និងកីឡា។"
                )}
              </p>
            </div>
            <div className={`text-right text-xs text-slate-500 ${kh ? "font-khmer" : ""}`}>
              <div className="font-semibold text-slate-700">
                {t("Generated", "បានបង្កើត")}
              </div>
              <div className="mt-0.5">{generatedLabel}</div>
              <div className="mt-2 font-semibold text-slate-700">Chouy Sala</div>
              <div className="font-khmer">ជួយសាលា</div>
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            {t("Could not load report data:", "មិនអាចផ្ទុកទិន្នន័យរបាយការណ៍៖")}{" "}
            {error}
          </div>
        )}

        {/* 1. Vital Signs */}
        <section className="print-stack">
          <SectionHeading
            kh={kh}
            en="Vital Signs"
            khLabel="សញ្ញាសំខាន់ៗ"
            sub={t(
              "Live counters from the Chouy Sala database.",
              "ការរាប់ផ្ទាល់ពីមូលដ្ឋានទិន្នន័យជួយសាលា។"
            )}
          />
          <div className="print-grid grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-5">
            <VitalCard
              kh={kh}
              loading={loading}
              icon={<GraduationCap className="w-6 h-6" />}
              tone="indigo"
              value={data?.vitalSigns.studentsGuided ?? 0}
              labelEn="Total Students Guided"
              labelKh="សិស្សដែលទទួលការណែនាំសរុប"
              hintEn="Learning Path Discovery Quiz completions"
              hintKh="ការបញ្ចប់កម្រងសំណួរស្វែងរកផ្លូវសិក្សា"
            />
            <VitalCard
              kh={kh}
              loading={loading}
              icon={<ClipboardList className="w-6 h-6" />}
              tone="amber"
              value={data?.vitalSigns.activeNeeds ?? 0}
              labelEn="Active School Needs"
              labelKh="សំណើសាលាកំពុងសកម្ម"
              hintEn="Open requests from rural high schools"
              hintKh="សំណើបើកចំហពីសាលាមធ្យមជនបទ"
            />
            <VitalCard
              kh={kh}
              loading={loading}
              icon={<CheckCircle2 className="w-6 h-6" />}
              tone="emerald"
              value={data?.vitalSigns.projectsCompleted ?? 0}
              labelEn="Projects Funded & Completed"
              labelKh="គម្រោងបានឧបត្ថម្ភ និងបញ្ចប់"
              hintEn="Verified outcomes from donors and NGOs"
              hintKh="លទ្ធផលដែលបានផ្ទៀងផ្ទាត់ពីម្ចាស់ជំនួយ និង NGO"
            />
          </div>
        </section>

        {/* 2. Learning Trends Chart */}
        <section className="print-stack">
          <SectionHeading
            kh={kh}
            en="Learning Trends"
            khLabel="និន្នាការសិក្សា"
            sub={t(
              "What learners are choosing to explore on Chouy Sala.",
              "តើសិស្សកំពុងជ្រើសរើសស្វែងយល់អំពីអ្វីខ្លះនៅលើជួយសាលា។"
            )}
          />
          <div className="print-card mt-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
            <h3
              className={`text-lg sm:text-xl font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}
            >
              {t("Most Popular Learning Paths", "ផ្លូវសិក្សាដែលពេញនិយមបំផុត")}
            </h3>
            <p
              className={`mt-1 text-xs sm:text-sm text-slate-500 ${kh ? "font-khmer" : ""}`}
            >
              {t(
                "Distribution of curiosity choices across all completed quizzes.",
                "ការបែងចែកជម្រើសចំណាប់អារម្មណ៍ឆ្លងកាត់ការបញ្ចប់កម្រងសំណួរទាំងអស់។"
              )}
            </p>
            <div className="mt-5 h-72 sm:h-80" data-testid="chart-learning-paths">
              {loading ? (
                <div className="h-full grid place-items-center text-sm text-slate-400">
                  {t("Loading chart…", "កំពុងផ្ទុកគំនូសតាង…")}
                </div>
              ) : chartData.every((d) => d.students === 0) ? (
                <div
                  className={`h-full grid place-items-center text-sm text-slate-400 text-center px-6 ${kh ? "font-khmer" : ""}`}
                >
                  {t(
                    "No quiz completions yet — chart will populate as students discover their path.",
                    "មិនទាន់មានការបញ្ចប់កម្រងសំណួរទេ — គំនូសតាងនឹងបង្ហាញនៅពេលសិស្សស្វែងរកផ្លូវរបស់ពួកគេ។"
                  )}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 8, right: 36, bottom: 8, left: 12 }}
                  >
                    <CartesianGrid stroke="#e2e8f0" horizontal={false} />
                    <XAxis
                      type="number"
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#0f172a"
                      tick={{ fontSize: 13, fontWeight: 600 }}
                      width={170}
                    />
                    <Tooltip
                      cursor={{ fill: "#f1f5f9" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #cbd5e1",
                        fontSize: 13,
                      }}
                      formatter={(v: number) => [
                        `${v} ${kh ? "សិស្ស" : "students"}`,
                        kh ? "ការស្វែងរក" : "Explorations",
                      ]}
                    />
                    <Bar
                      dataKey="students"
                      fill="#0f766e"
                      radius={[0, 6, 6, 0]}
                      barSize={28}
                    >
                      <LabelList
                        dataKey="students"
                        position="right"
                        style={{ fill: "#0f172a", fontSize: 12, fontWeight: 700 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        {/* 3. Live Impact Feed */}
        <section className="print-stack">
          <SectionHeading
            kh={kh}
            en="Live Impact Feed"
            khLabel="ព័ត៌មានផលប៉ះពាល់ផ្ទាល់"
            sub={t(
              "Recent verified successes across the platform.",
              "ភាពជោគជ័យដែលបានផ្ទៀងផ្ទាត់ថ្មីៗឆ្លងកាត់វេទិកា។"
            )}
          />
          <div className="print-card mt-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="px-6 py-10 text-center text-sm text-slate-400">
                {t("Loading feed…", "កំពុងផ្ទុកព័ត៌មាន…")}
              </div>
            ) : !data || data.feed.length === 0 ? (
              <div
                className={`px-6 py-10 text-center text-sm text-slate-400 ${kh ? "font-khmer" : ""}`}
              >
                {t(
                  "No impact entries yet. Stories will appear as projects are completed.",
                  "មិនទាន់មានព័ត៌មានផលប៉ះពាល់ទេ។ រឿងរ៉ាវនឹងបង្ហាញនៅពេលគម្រោងបញ្ចប់។"
                )}
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {data.feed.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50/60 transition-colors"
                    data-testid={`feed-item-${item.type}`}
                  >
                    <div
                      className={`shrink-0 w-9 h-9 rounded-full grid place-items-center ${
                        item.type === "project"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {item.type === "project" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(item.timestamp, kh)}
                        <span className="hidden sm:inline">·</span>
                        <span
                          className={
                            item.type === "project"
                              ? "text-emerald-700"
                              : "text-indigo-700"
                          }
                        >
                          {item.type === "project"
                            ? t("Project Completed", "គម្រោងបានបញ្ចប់")
                            : t("Students Guided", "សិស្សបានទទួលការណែនាំ")}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-sm sm:text-[15px] text-slate-800 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}
                      >
                        {kh ? item.kh : item.en}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Footer block (also visible in print) */}
        <footer
          className={`print-card bg-white rounded-2xl border border-slate-200 shadow-sm px-6 sm:px-10 py-6 text-xs text-slate-500 leading-relaxed ${kh ? "font-khmer" : ""}`}
        >
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Activity className="w-4 h-4 text-emerald-600" />
            {t(
              "About this report",
              "អំពីរបាយការណ៍នេះ"
            )}
          </div>
          <p className="mt-2">
            {t(
              "Figures are pulled directly from the Chouy Sala production database at the time of generation. Quiz completions are recorded anonymously to measure reach. Completed projects are verified by partner schools before publication.",
              "តួលេខទាំងនេះត្រូវបានទាញដោយផ្ទាល់ពីមូលដ្ឋានទិន្នន័យជួយសាលានៅពេលបង្កើត។ ការបញ្ចប់កម្រងសំណួរត្រូវបានកត់ត្រាដោយអនាមិកដើម្បីវាស់ស្ទង់វិសាលភាព។ គម្រោងដែលបានបញ្ចប់ត្រូវបានផ្ទៀងផ្ទាត់ដោយសាលាដៃគូមុនពេលបោះពុម្ពផ្សាយ។"
            )}
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} Chouy Sala (ជួយសាលា).{" "}
            {t("Built with the community, for the community.", "កសាងជាមួយសហគមន៍ ដើម្បីសហគមន៍។")}
          </p>
        </footer>
      </main>
    </div>
  );
}

/* -------------------------------------------------- */

function SectionHeading({
  kh,
  en,
  khLabel,
  sub,
}: {
  kh: boolean;
  en: string;
  khLabel: string;
  sub: string;
}) {
  return (
    <div className="border-l-4 border-emerald-600 pl-4">
      <h2
        className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}
      >
        {kh ? khLabel : en}
      </h2>
      <p
        className={`mt-1 text-xs sm:text-sm text-slate-500 ${kh ? "font-khmer" : ""}`}
      >
        {sub}
      </p>
    </div>
  );
}

const TONE_MAP: Record<string, { ring: string; text: string; chip: string }> = {
  indigo: {
    ring: "ring-indigo-100",
    text: "text-indigo-700",
    chip: "bg-indigo-50 text-indigo-700",
  },
  amber: {
    ring: "ring-amber-100",
    text: "text-amber-700",
    chip: "bg-amber-50 text-amber-700",
  },
  emerald: {
    ring: "ring-emerald-100",
    text: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
  },
};

function VitalCard({
  kh,
  loading,
  icon,
  tone,
  value,
  labelEn,
  labelKh,
  hintEn,
  hintKh,
}: {
  kh: boolean;
  loading: boolean;
  icon: React.ReactNode;
  tone: "indigo" | "amber" | "emerald";
  value: number;
  labelEn: string;
  labelKh: string;
  hintEn: string;
  hintKh: string;
}) {
  const c = TONE_MAP[tone];
  return (
    <div
      className={`print-card bg-white rounded-2xl border border-slate-200 shadow-sm px-5 sm:px-6 py-6 ring-4 ${c.ring}`}
      data-testid={`vital-${tone}`}
    >
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl grid place-items-center ${c.chip}`}>
          {icon}
        </div>
        <span
          className={`text-[10px] font-bold tracking-[0.18em] uppercase ${c.text}`}
        >
          {kh ? "ផ្ទាល់" : "Live"}
        </span>
      </div>
      <div className={`mt-5 text-4xl sm:text-5xl font-extrabold text-slate-900 tabular-nums`}>
        {loading ? "…" : value.toLocaleString(kh ? "km-KH" : "en-US")}
      </div>
      <div
        className={`mt-2 text-sm font-semibold text-slate-800 ${kh ? "font-khmer" : ""}`}
      >
        {kh ? labelKh : labelEn}
      </div>
      <div
        className={`mt-1 text-xs text-slate-500 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}
      >
        {kh ? hintKh : hintEn}
      </div>
    </div>
  );
}

export default ImpactReportPage;
