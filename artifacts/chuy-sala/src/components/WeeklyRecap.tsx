import { useState, useEffect, useCallback } from "react";
import {
  CalendarClock, RefreshCw, Sparkles, BookOpen,
  MessageSquare, Clock, CheckCircle2, AlertCircle, Loader2,
} from "lucide-react";

interface Metrics {
  pendingStories: number;
  newStoriesThisWeek: number;
  aiChatSessionsThisWeek: number;
  weekStart: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function MetricTile({
  icon, value, label, accent, alert,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  accent: string;
  alert?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-4 border"
      style={{
        borderColor: alert && Number(value) > 0 ? "#FCA5A5" : "#E2E8F0",
        background: alert && Number(value) > 0 ? "#FFF5F5" : "#F8FAFC",
      }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: accent + "20", color: accent }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-800 leading-none">{value}</p>
        <p className="text-xs text-slate-500 mt-1 leading-snug">{label}</p>
      </div>
      {alert && Number(value) > 0 && (
        <AlertCircle size={14} className="ml-auto flex-shrink-0 mt-0.5 text-red-400" />
      )}
    </div>
  );
}

function renderSummary(text: string) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <p
        key={i}
        className="text-sm text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: bold }}
      />
    );
  });
}

export function WeeklyRecap() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [metricsError, setMetricsError] = useState(false);
  const [metricsLoading, setMetricsLoading] = useState(true);

  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(false);

  const loadMetrics = useCallback(async () => {
    setMetricsLoading(true);
    setMetricsError(false);
    try {
      const res = await fetch(`${BASE}/api/admin/weekly-metrics`);
      if (!res.ok) throw new Error("fetch failed");
      setMetrics(await res.json());
    } catch {
      setMetricsError(true);
    } finally {
      setMetricsLoading(false);
    }
  }, []);

  useEffect(() => { loadMetrics(); }, [loadMetrics]);

  const generateSummary = async () => {
    if (!metrics) return;
    setSummaryLoading(true);
    setSummaryError(false);
    setSummary(null);
    try {
      const res = await fetch(`${BASE}/api/admin/weekly-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics }),
      });
      if (!res.ok) throw new Error("summary failed");
      const { summary: text } = await res.json();
      setSummary(text);
    } catch {
      setSummaryError(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const isSunday = now.getDay() === 0;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#CBD5E1" }}>

      {/* ── Header ── */}
      <div
        className="px-6 py-4 flex items-start justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <CalendarClock size={20} color="white" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-tight">
              Weekly Dashboard Check-In
            </p>
            <p className="text-blue-200 text-xs mt-0.5">
              Every Sunday at 7 PM &mdash; {isSunday ? "📌 Today is Sunday!" : `Next check-in: ${dayName === "Saturday" ? "tomorrow" : "this Sunday"}`}
            </p>
          </div>
        </div>
        <button
          onClick={loadMetrics}
          disabled={metricsLoading}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          title="Refresh metrics"
        >
          <RefreshCw size={14} color="white" className={metricsLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* ── Reminder task card ── */}
      <div
        className="px-6 py-3 border-b flex items-start gap-3"
        style={{ background: "#EFF6FF", borderColor: "#BFDBFE" }}
      >
        <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5 text-blue-600" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Your recurring task:</strong> Check for new Alumni Story submissions and Resume feedback requests, then review engagement from the Interview Simulator.
        </p>
      </div>

      {/* ── Metrics ── */}
      <div className="px-6 py-5 bg-white">
        {metricsLoading ? (
          <div className="flex items-center gap-2 py-6 text-slate-400">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading this week&apos;s metrics…</span>
          </div>
        ) : metricsError ? (
          <div className="flex items-center gap-2 py-4 text-red-500">
            <AlertCircle size={16} />
            <span className="text-sm">Could not load metrics. <button onClick={loadMetrics} className="underline">Retry</button></span>
          </div>
        ) : metrics ? (
          <>
            <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
              <Clock size={11} />
              Week of {formatDate(metrics.weekStart)} &rarr; today
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MetricTile
                icon={<AlertCircle size={18} />}
                value={metrics.pendingStories}
                label="Alumni Stories awaiting review"
                accent="#DC2626"
                alert
              />
              <MetricTile
                icon={<BookOpen size={18} />}
                value={metrics.newStoriesThisWeek}
                label="New story submissions this week"
                accent="#1D4ED8"
              />
              <MetricTile
                icon={<MessageSquare size={18} />}
                value={metrics.aiChatSessionsThisWeek}
                label="AI Tutor sessions this week"
                accent="#0891B2"
              />
            </div>
            <p className="text-xs text-slate-400 mt-3 italic">
              Interview Simulator sessions are real-time and not persisted — check live traffic for those.
            </p>
          </>
        ) : null}
      </div>

      {/* ── AI Summary button ── */}
      <div className="px-6 pb-6 bg-white border-t" style={{ borderColor: "#F1F5F9" }}>
        <button
          onClick={generateSummary}
          disabled={summaryLoading || !metrics}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)", color: "white" }}
        >
          {summaryLoading ? (
            <><Loader2 size={15} className="animate-spin" /> Generating AI summary…</>
          ) : (
            <><Sparkles size={15} /> Generate AI Weekly Summary</>
          )}
        </button>

        {summaryError && (
          <p className="mt-3 text-xs text-red-500 text-center">
            AI summary failed. Please try again in a moment.
          </p>
        )}

        {summary && (
          <div
            className="mt-4 rounded-xl p-4 border space-y-2"
            style={{ borderColor: "#BFDBFE", background: "#EFF6FF" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: "#2563EB" }} />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                AI Weekly Summary
              </span>
            </div>
            <div className="space-y-1.5">{renderSummary(summary)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
