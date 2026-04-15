import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCw, Star } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type Entry = {
  rank: number;
  nickname: string;
  score: number;
  completionTimeMs: number;
  createdAt: string;
};

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = (ms / 1000).toFixed(1);
  return `${s}s`;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl">🥇</span>
        <span className="text-[10px] font-bold text-amber-400 leading-none">1</span>
      </div>
    );
  }
  if (rank <= 3) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl">🥈</span>
        <span className="text-[10px] font-bold text-slate-300 leading-none">{rank}</span>
      </div>
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
    >
      {rank}
    </div>
  );
}

function TitleBadge({ rank, kh }: { rank: number; kh: boolean }) {
  if (rank === 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
        style={{ background: "rgba(234,179,8,0.2)", color: "#fbbf24" }}>
        <Star className="w-2.5 h-2.5" fill="currentColor" />
        {kh ? "総司令官ចក្រវាល" : "Galactic Commander"}
      </span>
    );
  }
  if (rank <= 3) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
        style={{ background: "rgba(148,163,184,0.15)", color: "#94a3b8" }}>
        <Star className="w-2.5 h-2.5" fill="currentColor" />
        {kh ? "អ្នករុករកផ្កាយ" : "Star Navigator"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
      style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8" }}>
      <Star className="w-2.5 h-2.5" />
      {kh ? "អ្នករុករកអវកាស" : "Space Explorer"}
    </span>
  );
}

export function ChiefAstronomerLeaderboard({ refreshTrigger }: { refreshTrigger: number }) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLeaderboard = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch(`${BASE_URL}/api/leaderboard/space`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => setEntries(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard, refreshTrigger]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.3)", color: "#fbbf24" }}>
          <Trophy className="w-3.5 h-3.5" />
        </div>
        <span className={`text-xs font-bold tracking-widest uppercase ${kh ? "font-khmer tracking-normal" : ""}`}
          style={{ color: "#fbbf24" }}>
          {t("Chief Astronomers of Cambodia", "ប្រធានតារាវិទូកម្ពុជា")}
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(234,179,8,0.25), transparent)" }} />
        <button
          onClick={fetchLeaderboard}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          aria-label="Refresh leaderboard"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Board card */}
      <div
        className="rounded-3xl overflow-hidden border"
        style={{
          borderColor: "rgba(234,179,8,0.2)",
          background: "linear-gradient(135deg,rgba(40,30,5,0.85) 0%,rgba(10,8,25,0.90) 100%)",
        }}
      >
        {/* Top decoration */}
        <div className="px-6 sm:px-8 pt-7 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <h2 className={`font-bold text-white text-lg leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>
                {t("Chief Astronomers of Cambodia", "ប្រធានតារាវិទូកម្ពុជា")}
              </h2>
              <p className={`text-xs mt-0.5 ${kh ? "font-khmer" : ""}`} style={{ color: "rgba(255,255,255,0.35)" }}>
                {t("Ranked by correctness · fastest answer wins ties", "ចំណាត់ចំណុចដោយភាពត្រឹមត្រូវ · ល្បឿនក្នុងករណីស្មើ")}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-4 sm:px-6 py-4">
          {loading && (
            <div className="flex items-center justify-center py-12 gap-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              <RefreshCw className="w-5 h-5 animate-spin" style={{ color: "#fbbf24" }} />
              <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
                {t("Loading rankings…", "កំពុងផ្ទុកចំណាត់ថ្នាក់…")}
              </span>
            </div>
          )}

          {error && !loading && (
            <p className={`text-center py-12 text-sm ${kh ? "font-khmer" : ""}`} style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("Unable to load rankings right now.", "មិនអាចផ្ទុកចំណាត់ថ្នាក់ឥឡូវនេះ។")}
            </p>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <span className="text-4xl">🌌</span>
              <p className={`text-sm ${kh ? "font-khmer" : ""}`} style={{ color: "rgba(255,255,255,0.35)" }}>
                {t("No explorers yet — be the first!", "មិនទាន់មានអ្នករុករក — ក្លាយជាអ្នកដំបូង!")}
              </p>
            </div>
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {entries.map((entry, i) => {
                  const isGold = entry.rank === 1;
                  const isSilver = entry.rank <= 3;
                  let rowBg = "rgba(255,255,255,0.03)";
                  let rowBorder = "rgba(255,255,255,0.06)";
                  if (isGold) {
                    rowBg = "rgba(234,179,8,0.08)";
                    rowBorder = "rgba(234,179,8,0.25)";
                  } else if (isSilver) {
                    rowBg = "rgba(148,163,184,0.06)";
                    rowBorder = "rgba(148,163,184,0.15)";
                  }

                  return (
                    <motion.div
                      key={`${entry.nickname}-${entry.createdAt}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="flex items-center gap-3 sm:gap-4 rounded-2xl px-4 py-3 border"
                      style={{ background: rowBg, borderColor: rowBorder }}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 flex justify-center">
                        <RankBadge rank={entry.rank} />
                      </div>

                      {/* Nickname + title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-bold text-sm truncate ${isGold ? "text-amber-300" : isSilver ? "text-slate-200" : "text-white/70"}`}>
                            {entry.nickname}
                          </span>
                          <TitleBadge rank={entry.rank} kh={kh} />
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex-shrink-0 text-right">
                        <div className={`text-sm font-bold ${entry.score === 1 ? "text-emerald-400" : "text-white/30"}`}>
                          {entry.score === 1 ? "✓ 1/1" : "0/1"}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {formatTime(entry.completionTimeMs)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className={`text-xs leading-relaxed text-center ${kh ? "font-khmer leading-loose" : ""}`}
            style={{ color: "rgba(255,255,255,0.3)" }}>
            {kh
              ? "បន្តរុករក! សកលលោកគឺធំធេង ហើយចំណេះដឹងរបស់អ្នកគឺជាសោរដើម្បីបើកវា។"
              : "Keep exploring! The universe is vast, and your knowledge is the key to unlocking it."}
          </p>
        </div>
      </div>
    </section>
  );
}
