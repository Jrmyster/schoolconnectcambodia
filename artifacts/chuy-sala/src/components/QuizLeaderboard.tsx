import { useState, useEffect, useCallback } from "react";
import { Trophy, Medal, RefreshCw, MapPin, ChevronDown } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const PROVINCES: { en: string; kh: string }[] = [
  { en: "Phnom Penh",       kh: "ភ្នំពេញ" },
  { en: "Banteay Meanchey", kh: "បន្ទាយមានជ័យ" },
  { en: "Battambang",       kh: "បាត់ដំបង" },
  { en: "Kampong Cham",     kh: "កំពង់ចាម" },
  { en: "Kampong Chhnang",  kh: "កំពង់ឆ្នាំង" },
  { en: "Kampong Speu",     kh: "កំពង់ស្ពឺ" },
  { en: "Kampong Thom",     kh: "កំពង់ធំ" },
  { en: "Kampot",           kh: "កំពត" },
  { en: "Kandal",           kh: "កណ្ដាល" },
  { en: "Kep",              kh: "កែប" },
  { en: "Koh Kong",         kh: "កោះកុង" },
  { en: "Kratié",           kh: "ក្រចេះ" },
  { en: "Mondulkiri",       kh: "មណ្ឌលគីរី" },
  { en: "Oddar Meanchey",   kh: "ឧត្ដរមានជ័យ" },
  { en: "Pailin",           kh: "ប៉ៃលិន" },
  { en: "Preah Sihanouk",   kh: "ព្រះសីហនុ" },
  { en: "Preah Vihear",     kh: "ព្រះវិហារ" },
  { en: "Prey Veng",        kh: "ព្រៃវែង" },
  { en: "Pursat",           kh: "ពោធិ៍សាត់" },
  { en: "Ratanakiri",       kh: "រតនគីរី" },
  { en: "Siem Reap",        kh: "សៀមរាប" },
  { en: "Stung Treng",      kh: "ស្ទឹងត្រែង" },
  { en: "Svay Rieng",       kh: "ស្វាយរៀង" },
  { en: "Takéo",            kh: "តាកែវ" },
  { en: "Tboung Khmum",     kh: "ត្បូងឃ្មុំ" },
];

type LeaderboardRow = {
  studentName: string;
  province: string;
  totalExp: number;
};

const MEDAL: Record<number, { icon: string; color: string; bg: string }> = {
  0: { icon: "🥇", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800" },
  1: { icon: "🥈", color: "text-slate-500",  bg: "bg-slate-50  dark:bg-slate-800/30  border-slate-200  dark:border-slate-700"  },
  2: { icon: "🥉", color: "text-amber-600",  bg: "bg-amber-50  dark:bg-amber-950/30  border-amber-200  dark:border-amber-800"  },
};

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function QuizLeaderboard() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = selectedProvince !== "all" ? `?province=${encodeURIComponent(selectedProvince)}` : "";
      const res = await fetch(`${API_BASE}/api/quiz/leaderboard${qs}`);
      if (!res.ok) throw new Error("fetch failed");
      setRows(await res.json());
    } catch {
      setError(t("Could not load leaderboard.", "មិនអាចផ្ទុកតារាងចំណាត់ថ្នាក់បានទេ។"));
    } finally {
      setLoading(false);
    }
  }, [selectedProvince]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  const selectedLabel =
    selectedProvince === "all"
      ? t("All Provinces", "គ្រប់ខេត្ត")
      : PROVINCES.find((p) => p.en === selectedProvince)?.[kh ? "kh" : "en"] ?? selectedProvince;

  return (
    <div className="mt-12 rounded-2xl border border-teal-200 dark:border-teal-800 bg-gradient-to-b from-teal-50/60 to-white dark:from-teal-950/20 dark:to-background overflow-hidden shadow-md">

      {/* ── Header ── */}
      <div className="px-5 py-5 bg-gradient-to-r from-teal-700 to-teal-600 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className={`font-bold text-white text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
              {t("Global Leaderboard", "តារាងចំណាត់ថ្នាក់ជាសកល")}
            </h3>
            <p className={`text-teal-100/80 text-xs ${kh ? "font-khmer" : ""}`}>
              {t("Subject Quiz Master — Total EXP earned", "អ្នកម៉ាស្ទ័រប្រឡង — EXP សរុបបានរង្វាន់")}
            </p>
          </div>
        </div>

        <button
          onClick={fetchLeaderboard}
          className="self-end sm:self-auto flex items-center gap-1.5 text-xs text-teal-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors flex-shrink-0"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          {t("Refresh", "ធ្វើឱ្យស្រស់")}
        </button>
      </div>

      <div className="px-5 py-4">

        {/* ── Province Filter ── */}
        <div className="mb-5 relative">
          <label className={`block text-xs font-bold text-teal-700 dark:text-teal-300 mb-1.5 ${kh ? "font-khmer" : ""}`}>
            <MapPin className="w-3.5 h-3.5 inline mr-1" />
            {t("Filter by Province", "តម្រងតាមខេត្ត")}
          </label>

          {/* Custom dropdown — works great on mobile */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-card text-left text-sm font-semibold text-foreground hover:border-teal-400 focus:outline-none focus:border-teal-500 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <span>{selectedLabel}</span>
              <ChevronDown className={`w-4 h-4 text-teal-600 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-card border border-teal-200 dark:border-teal-700 rounded-xl shadow-xl overflow-y-auto max-h-60">
                {/* All option */}
                <button
                  onClick={() => { setSelectedProvince("all"); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors ${selectedProvince === "all" ? "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30" : "text-foreground"} ${kh ? "font-khmer" : ""}`}
                >
                  {t("🌏 All Provinces", "🌏 គ្រប់ខេត្ត")}
                </button>
                <div className="border-t border-border my-1" />
                {PROVINCES.map((p) => (
                  <button
                    key={p.en}
                    onClick={() => { setSelectedProvince(p.en); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors flex items-center justify-between ${selectedProvince === p.en ? "font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30" : "text-foreground"}`}
                  >
                    <span className={kh ? "font-khmer" : ""}>{kh ? p.kh : p.en}</span>
                    {!kh && <span className="text-xs text-muted-foreground font-khmer ml-2">{p.kh}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="py-12 flex flex-col items-center gap-3 text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin text-teal-500" />
            <p className={`text-sm ${kh ? "font-khmer" : ""}`}>{t("Loading…", "កំពុងផ្ទុក…")}</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className={`text-sm text-red-500 ${kh ? "font-khmer" : ""}`}>{error}</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="py-12 text-center">
            <Trophy className="w-10 h-10 text-teal-200 mx-auto mb-3" />
            <p className={`text-sm text-muted-foreground ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "No scores yet for this province. Be the first to appear here!",
                "មិនទាន់មានពិន្ទុសម្រាប់ខេត្តនេះទេ។ ក្លាយជាអ្នកដំបូង!"
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-2">

            {/* Column headers */}
            <div className="grid grid-cols-[2.5rem_1fr_auto] gap-2 px-3 pb-1">
              <span className={`text-xs font-bold text-teal-600 dark:text-teal-400 ${kh ? "font-khmer" : ""}`}>
                {t("Rank", "ថ្នាក់")}
              </span>
              <span className={`text-xs font-bold text-teal-600 dark:text-teal-400 ${kh ? "font-khmer" : ""}`}>
                {t("Student Name", "ឈ្មោះសិស្ស")}
              </span>
              <span className={`text-xs font-bold text-teal-600 dark:text-teal-400 text-right ${kh ? "font-khmer" : ""}`}>
                {t("Total EXP", "EXP សរុប")}
              </span>
            </div>

            {rows.map((row, i) => {
              const medal = MEDAL[i];
              return (
                <div
                  key={`${row.studentName}-${row.province}-${i}`}
                  className={`grid grid-cols-[2.5rem_1fr_auto] gap-2 items-center px-3 py-3 rounded-xl border transition-all ${
                    medal
                      ? `${medal.bg} shadow-sm`
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center">
                    {medal ? (
                      <span className="text-xl leading-none">{medal.icon}</span>
                    ) : (
                      <span className={`text-sm font-bold text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Name + Province */}
                  <div className="min-w-0">
                    <p className={`font-bold text-sm text-foreground truncate ${kh ? "font-khmer" : ""} ${medal ? medal.color : ""}`}>
                      {row.studentName}
                    </p>
                    <p className={`text-xs text-muted-foreground truncate ${kh ? "font-khmer" : ""}`}>
                      📍 {
                        kh
                          ? (PROVINCES.find((p) => p.en === row.province)?.kh ?? row.province)
                          : row.province
                      }
                    </p>
                  </div>

                  {/* EXP */}
                  <div className="text-right flex-shrink-0">
                    <span className={`font-black text-sm ${medal ? "text-yellow-600 dark:text-yellow-400" : "text-teal-600 dark:text-teal-400"}`}>
                      {row.totalExp.toLocaleString()}
                    </span>
                    <span className={`block text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                      EXP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className={`mt-4 text-center text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
          {t(
            "Complete quizzes and submit your score to climb the rankings.",
            "បញ្ចប់ការធ្វើតេស្ត ហើយដាក់ជូនពិន្ទុ ដើម្បីឡើងលំដាប់ថ្នាក់។"
          )}
        </p>
      </div>
    </div>
  );
}

export { PROVINCES };
