import { useEffect, useState } from "react";
import { Banknote, CheckCircle2, ExternalLink, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Lesson {
  icon: typeof Wallet;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}

const LESSONS: Lesson[] = [
  {
    icon: Wallet,
    titleEn: "Budgeting basics",
    titleKh: "មូលដ្ឋាននៃការរៀបចំថវិកា",
    bodyEn:
      "A budget is simply a plan for your money. Write down what comes in (income) and what goes out (expenses). The goal is for income to be greater than expenses, so you can save the difference.",
    bodyKh:
      "ថវិកាគឺគ្រាន់តែជាផែនការសម្រាប់លុយរបស់អ្នក។ កត់ចំណូល និងចំណាយ។ គោលដៅគឺឱ្យចំណូលធំជាងចំណាយ ដើម្បីឱ្យអ្នកអាចសន្សំបាននូវចំនួនលើស។",
  },
  {
    icon: PiggyBank,
    titleEn: "Saving early",
    titleKh: "សន្សំទុកតាំងពីដំបូង",
    bodyEn:
      "Save a small amount every week — even 1,000 riel adds up over a year. Keep your savings somewhere safe and separate from your daily-spending money.",
    bodyKh:
      "សន្សំចំនួនតិចតួចជារៀងរាល់សប្តាហ៍ — សូម្បីតែ ១,០០០ រៀល ក៏បានកើនច្រើនក្នុងមួយឆ្នាំដែរ។ រក្សាប្រាក់សន្សំរបស់អ្នកនៅកន្លែងសុវត្ថិភាព និងដាច់ដោយឡែកពីលុយចំណាយប្រចាំថ្ងៃ។",
  },
  {
    icon: TrendingUp,
    titleEn: "Avoiding scams & risky loans",
    titleKh: "ជៀសវាងការបោកប្រាស់ និងប្រាក់កម្ចីប្រឈម",
    bodyEn:
      "If something promises huge returns with no risk, it is almost always a scam. Never borrow at very high interest rates to cover daily costs — it traps you in debt.",
    bodyKh:
      "ប្រសិនបើមានអ្វីសន្យាប្រាក់ចំណេញច្រើនដោយគ្មានហានិភ័យ វាស្ទើរតែតែងតែជាការបោកប្រាស់។ កុំខ្ចីប្រាក់ដែលមានការប្រាក់ខ្ពស់ដើម្បីគ្របដណ្តប់លើចំណាយប្រចាំថ្ងៃ — វានឹងធ្វើឱ្យអ្នកជាប់ក្នុងបំណុល។",
  },
];

export function FinLitIntroPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { user } = useAuth();

  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch(`${BASE}/api/achievements`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: { badgeType: string }[]) => {
        if (rows.some((r) => r.badgeType === "financial-wizard")) {
          setCompleted(true);
        }
      })
      .catch(() => {});
  }, [user]);

  async function markComplete() {
    if (!user) {
      setError(t("Please sign in first.", "សូមចូលគណនីជាមុនសិន។"));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/achievements/award`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ badgeType: "financial-wizard" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to mark complete");
      }
      setCompleted(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Banknote className="w-3.5 h-3.5" />
            {t("Financial Literacy", "ចំណេះដឹងហិរញ្ញវត្ថុ")}
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold text-emerald-900 ${kh ? "font-khmer leading-relaxed" : "font-display"}`}>
            {t("FinLit Intro Module", "មេរៀនណែនាំ FinLit")}
          </h1>
          <p className={`text-muted-foreground max-w-xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "A short introduction to managing money wisely. Read the three lessons below, then mark the module as complete to earn the Financial Wizard badge.",
              "ការណែនាំខ្លីៗស្តីពីការគ្រប់គ្រងលុយប្រកបដោយប្រាជ្ញា។ សូមអានមេរៀនទាំងបីខាងក្រោម រួចសម្គាល់មេរៀននេះថាបានបញ្ចប់ ដើម្បីទទួលបានស្លាកសញ្ញាអ្នកជំនាញហិរញ្ញវត្ថុ។",
            )}
          </p>
        </header>

        <div className="space-y-4">
          {LESSONS.map((lesson, i) => {
            const Icon = lesson.icon;
            return (
              <div key={i} className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-600">
                      {t(`Lesson ${i + 1}`, `មេរៀនទី ${i + 1}`)}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg text-emerald-900 mb-2 ${kh ? "font-khmer" : "font-display"}`}>
                    {kh ? lesson.titleKh : lesson.titleEn}
                  </h3>
                  <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? lesson.bodyKh : lesson.bodyEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6 text-center space-y-4">
          {completed ? (
            <>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className={`font-bold text-lg text-emerald-900 ${kh ? "font-khmer" : "font-display"}`}>
                {t("Module complete!", "មេរៀនបានបញ្ចប់!")}
              </h3>
              <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                {t(
                  "You've earned the Financial Wizard badge. View it on your dashboard.",
                  "អ្នកបានទទួលស្លាកសញ្ញាអ្នកជំនាញហិរញ្ញវត្ថុ។ មើលនៅលើផ្ទាំងគ្រប់គ្រងរបស់អ្នក។",
                )}
              </p>
            </>
          ) : (
            <>
              <p className={`text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                {t(
                  "Finished reading? Mark the module as complete to earn your badge.",
                  "បានអានរួចហើយឬ? សម្គាល់មេរៀននេះថាបានបញ្ចប់ ដើម្បីទទួលបានស្លាកសញ្ញារបស់អ្នក។",
                )}
              </p>
              <button
                type="button"
                onClick={markComplete}
                disabled={submitting || !user}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed ${kh ? "font-khmer text-base" : ""}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {submitting
                  ? t("Saving…", "កំពុងរក្សាទុក…")
                  : t("Mark as Complete", "សម្គាល់ថាបានបញ្ចប់")}
              </button>
              {!user && (
                <p className={`text-xs text-amber-700 ${kh ? "font-khmer" : ""}`}>
                  {t("Please sign in to earn this badge.", "សូមចូលគណនី ដើម្បីទទួលស្លាកសញ្ញានេះ។")}
                </p>
              )}
              {error && <p className="text-xs text-red-600">{error}</p>}
            </>
          )}
          <a
            href="https://finlitkh.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:underline ${kh ? "font-khmer" : ""}`}
          >
            {t("Continue learning at FinLitKH", "បន្តរៀននៅ FinLitKH")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
