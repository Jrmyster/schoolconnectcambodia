import { useState, useEffect, useCallback } from "react";
import {
  Microscope,
  Search,
  Award,
  CheckSquare,
  Square,
  RotateCcw,
  Loader2,
  Sparkles,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";
import { CHALLENGES, type Challenge } from "./skeptics-data";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const BADGE_THRESHOLD = 3;

type ChecklistKey = "peer_reviewed" | "sample_size" | "conflict";

const CHECKLIST_LABELS = {
  en: {
    peer_reviewed: "Peer Reviewed?",
    sample_size: "Large Sample Size?",
    conflict: "Conflict of Interest?",
  },
  kh: {
    peer_reviewed: "ត្រូវបានពិនិត្យដោយអ្នកជំនាញ?",
    sample_size: "គំរូធំ?",
    conflict: "ផលប្រយោជន៍ប្រឆាំង?",
  },
};

function ChallengeCard({
  challenge,
  lang,
  onComplete,
  alreadyDone,
}: {
  challenge: Challenge;
  lang: "en" | "kh";
  onComplete: (id: string) => void;
  alreadyDone: boolean;
}) {
  const t = lang === "en" ? challenge.en : challenge.kh;
  const labels = CHECKLIST_LABELS[lang];

  const [checks, setChecks] = useState<Record<ChecklistKey, boolean>>({
    peer_reviewed: false,
    sample_size: false,
    conflict: false,
  });
  const [revealed, setRevealed] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [open, setOpen] = useState(false);

  const allChecked =
    checks.peer_reviewed && checks.sample_size && checks.conflict;

  const handleReveal = () => {
    setRevealed(true);
    setShowReveal(true);
    if (!alreadyDone) {
      onComplete(challenge.id);
    }
  };

  const handleReset = () => {
    setChecks({ peer_reviewed: false, sample_size: false, conflict: false });
    setRevealed(false);
    setShowReveal(false);
    setOpen(false);
  };

  const toggleCheck = (key: ChecklistKey) => {
    if (revealed) return;
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistKeys: ChecklistKey[] = ["peer_reviewed", "sample_size", "conflict"];

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden">
      <button
        className="w-full flex items-start justify-between gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
            {challenge.number}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
              {t.title}
            </p>
            <p className="font-semibold text-gray-800 text-base leading-snug">
              {t.claim}
            </p>
          </div>
        </div>
        <span className="shrink-0 mt-1 text-gray-400">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-5">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1 flex items-center gap-1">
              <ShieldAlert size={13} />
              {lang === "en" ? "The Urban Legend" : "រឿងប្រឌិត"}
            </p>
            <p className="text-sm text-amber-900 italic">
              &ldquo;{t.background}&rdquo;
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
              <Search size={13} />
              {lang === "en" ? "Investigate — check all three before revealing:" : "ស៊ើបអង្កេត — ពិនិត្យទាំង ៣ មុនបង្ហាញ:"}
            </p>
            <div className="space-y-2">
              {checklistKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => toggleCheck(key)}
                  disabled={revealed}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors
                    ${checks[key]
                      ? "bg-green-50 border-green-300 text-green-800"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }
                    ${revealed ? "opacity-70 cursor-default" : "cursor-pointer"}
                  `}
                >
                  <span className="shrink-0 mt-0.5 text-green-600">
                    {checks[key] ? <CheckSquare size={18} /> : <Square size={18} className="text-gray-400" />}
                  </span>
                  <span className="text-sm">
                    <span className="font-semibold">{labels[key]}</span>
                    <br />
                    <span className="text-xs opacity-80">{t.checklist[key]}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {!revealed && (
            <button
              onClick={handleReveal}
              disabled={!allChecked}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all
                ${allChecked
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {lang === "en" ? "Reveal the Verdict" : "បង្ហាញការសន្មត"}
            </button>
          )}

          {showReveal && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div
                className="rounded-xl p-4 border-2"
                style={{
                  borderColor: challenge.verdictColor,
                  backgroundColor: challenge.verdictColor + "18",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: challenge.verdictColor }}>
                  {lang === "en" ? "Verdict:" : "ការសន្មត:"}
                  <span className="ml-2 text-base">{challenge.verdict}</span>
                </p>
                <p className="text-sm text-gray-800">{t.verdictDetail}</p>
              </div>

              <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4">
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <FlaskConical size={13} />
                  {lang === "en" ? "The Scientific Reveal" : "ការបង្ហាញវិទ្យាសាស្ត្រ"}
                </p>
                <p className="text-sm text-indigo-900 leading-relaxed">{t.reveal}</p>
              </div>

              {alreadyDone && (
                <p className="text-center text-xs text-gray-400 italic">
                  {lang === "en" ? "Already completed — no new badge points." : "បញ្ចប់រួចហើយ — គ្មានពិន្ទុថ្មី។"}
                </p>
              )}

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={14} />
                {lang === "en" ? "Try Again" : "សាកល្បងម្ដងទៀត"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SkepticsChallenge() {
  const { language } = useLanguageStore();
  const lang = language === "kh" ? "kh" : "en";
  const { user } = useAuth();

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [hasBadge, setHasBadge] = useState(false);
  const [badgeLoading, setBadgeLoading] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);

  const fetchStatus = useCallback(async () => {
    if (!user) { setStatusLoaded(true); return; }
    try {
      const res = await fetch(`${BASE_URL}/api/skeptic/status`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCompletedIds(data.completedIds ?? []);
        setHasBadge(data.hasBadge ?? false);
      }
    } catch {
    } finally {
      setStatusLoaded(true);
    }
  }, [user]);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  const handleComplete = async (id: string) => {
    if (!user) return;
    if (completedIds.includes(id)) return;
    const newCompleted = [...completedIds, id];
    setCompletedIds(newCompleted);

    try {
      await fetch(`${BASE_URL}/api/skeptic/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ challengeId: id }),
      });

      if (!hasBadge && newCompleted.length >= BADGE_THRESHOLD) {
        setBadgeLoading(true);
        const badgeRes = await fetch(`${BASE_URL}/api/skeptic/award-badge`, {
          method: "POST",
          credentials: "include",
        });
        if (badgeRes.ok) setHasBadge(true);
        setBadgeLoading(false);
      }
    } catch {
    }
  };

  const completedCount = completedIds.length;

  return (
    <section className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="text-indigo-600" size={22} />
            <h2 className="text-xl font-bold text-gray-800">
              {lang === "en" ? "Skeptic's Challenge" : "ការប្រឈមមុខអ្នកសង្ស័យ"}
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xl">
            {lang === "en"
              ? "Investigate each urban myth using the scientific checklist before the verdict is revealed."
              : "ស៊ើបអង្កេតរឿងប្រឌិតនីមួយៗដោយប្រើបញ្ជីត្រួតពិនិត្យវិទ្យាសាស្ត្រ មុននឹងបង្ហាញការសន្មត។"}
          </p>
        </div>

        {user && statusLoaded && (
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {lang === "en" ? "Completed" : "បានបញ្ចប់"}
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {completedCount}
                <span className="text-sm font-normal text-gray-400">/{CHALLENGES.length}</span>
              </p>
            </div>
            {hasBadge && (
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <Award size={22} className="text-white" />
                </div>
                <span className="text-xs font-bold text-yellow-600">
                  {lang === "en" ? "Badge!" : " មេដាយ!"}
                </span>
              </div>
            )}
            {badgeLoading && (
              <Loader2 size={20} className="animate-spin text-indigo-400" />
            )}
          </div>
        )}
      </div>

      {!user && (
        <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 px-5 py-4 text-sm text-blue-700 flex items-center gap-2">
          <Sparkles size={16} />
          {lang === "en"
            ? "Log in to track your progress and earn the Truth-Seeker badge."
            : "ចូលប្រើប្រាស់ ដើម្បីតាមដានការរីកចម្រើន និងទទួលបានមេដាយ Truth-Seeker។"}
        </div>
      )}

      {!statusLoaded && user ? (
        <div className="flex justify-center py-10">
          <Loader2 size={28} className="animate-spin text-indigo-400" />
        </div>
      ) : (
        <div className="space-y-4">
          {CHALLENGES.map((ch) => (
            <ChallengeCard
              key={ch.id}
              challenge={ch}
              lang={lang}
              onComplete={handleComplete}
              alreadyDone={completedIds.includes(ch.id)}
            />
          ))}
        </div>
      )}

      {user && hasBadge && (
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 p-5 flex items-center gap-4 shadow-sm">
          <div className="shrink-0 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
            <Award size={32} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-yellow-800 text-lg">
              {lang === "en" ? "Truth-Seeker Badge Earned!" : "ទទួលបានមេដាយ Truth-Seeker!"}
            </p>
            <p className="text-sm text-yellow-700">
              {lang === "en"
                ? "You applied scientific thinking to debunk popular myths. Science wins!"
                : "អ្នកបានប្រើការគិតបែបវិទ្យាសាស្ត្រដើម្បីបដិសេធរឿងប្រឌិត។ វិទ្យាសាស្ត្រឈ្នះ!"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
