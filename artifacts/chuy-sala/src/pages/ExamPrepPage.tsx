import { useState } from "react";
import { Microscope, ChevronRight, ChevronLeft, RotateCcw, CheckCircle2, XCircle, FlaskConical, Heart, BookOpen, ExternalLink, Dna, Trophy, ArrowRight, Send, Loader2 } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import healthData from "@/data/health_science.json";
import { QuizLeaderboard, PROVINCES } from "@/components/QuizLeaderboard";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Question = {
  id: number;
  questionEn: string;
  questionKh: string;
  options: { textEn: string; textKh: string }[];
  correctIndex: number;
  explanationEn: string;
  explanationKh: string;
};

type Topic = {
  id: string;
  titleEn: string;
  titleKh: string;
  focusEn: string;
  focusKh: string;
  questions: Question[];
};

const TOPICS: Topic[] = healthData.topics as Topic[];

type View = "home" | "topics" | "quiz";

type QuizState = {
  index: number;
  selected: number | null;
  score: number;
  done: boolean;
};

const COMING_SOON = [
  { titleEn: "English Grammar", titleKh: "វេយ្យាករណ៍អង់គ្លេស", icon: BookOpen, color: "from-[#3B82F6] to-[#60A5FA]" },
  { titleEn: "Mathematics", titleKh: "គណិតវិទ្យា", icon: FlaskConical, color: "from-[#8B5CF6] to-[#A78BFA]" },
];

const TOPIC_ICONS = [Dna, Heart, Microscope];

export function ExamPrepPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [view, setView] = useState<View>("home");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [quiz, setQuiz] = useState<QuizState>({ index: 0, selected: null, score: 0, done: false });

  const [submitName, setSubmitName] = useState("");
  const [submitProvince, setSubmitProvince] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function startTopic(topic: Topic) {
    setActiveTopic(topic);
    setQuiz({ index: 0, selected: null, score: 0, done: false });
    setView("quiz");
  }

  function handleSelect(idx: number) {
    if (quiz.selected !== null) return;
    const correct = activeTopic!.questions[quiz.index].correctIndex === idx;
    setQuiz((q) => ({ ...q, selected: idx, score: q.score + (correct ? 1 : 0) }));
  }

  function handleNext() {
    const total = activeTopic!.questions.length;
    if (quiz.index + 1 >= total) {
      setQuiz((q) => ({ ...q, done: true }));
    } else {
      setQuiz((q) => ({ ...q, index: q.index + 1, selected: null }));
    }
  }

  function restartQuiz() {
    setQuiz({ index: 0, selected: null, score: 0, done: false });
    setSubmitted(false);
    setSubmitError(null);
  }

  async function handleSubmitScore() {
    if (!submitName.trim() || !submitProvince) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const expEarned = Math.round((quiz.score / (activeTopic?.questions.length ?? 1)) * 100);
      const res = await fetch(`${API_BASE}/api/quiz/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: submitName.trim(),
          province: submitProvince,
          expEarned,
          subject: "health-science",
          topic: activeTopic?.id ?? "unknown",
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
    } catch {
      setSubmitError(t("Failed to submit. Please try again.", "បរាជ័យក្នុងការដាក់ជូន។ សូមព្យាយាមម្ដងទៀត។"));
    } finally {
      setSubmitting(false);
    }
  }

  const current = activeTopic ? activeTopic.questions[quiz.index] : null;
  const total = activeTopic ? activeTopic.questions.length : 0;
  const isOncology = activeTopic?.id === "oncology";

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-5 py-2 mb-5 text-sm font-semibold backdrop-blur-sm">
            <Microscope className="w-4 h-4" />
            {t("Interactive Study Hub", "មជ្ឈមណ្ឌលសិក្សាអន្តរកម្ម")}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            {t("Exam Prep", "ត្រៀមប្រឡង")}
          </h1>
          <p className={`text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Practice with bilingual quizzes built for Cambodian high school students. Test your knowledge, learn from every answer.",
              "ហាត់ប្រាណជាមួយការសួរ-ឆ្លើយ ២ ភាសា សម្រាប់សិស្សសាលាមធ្យម​សិក្សា​កម្ពុជា។ ធ្វើតេស្ត ហើយរៀនពីចម្លើយទាំងអស់។"
            )}
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ════════════════ HOME VIEW ════════════════ */}
        {view === "home" && (
          <>
            <div className="mb-8">
              <h2 className={`font-display font-bold text-foreground text-2xl mb-1 ${kh ? "font-khmer" : ""}`}>
                {t("Choose a Subject", "ជ្រើសរើសមុខវិជ្ជា")}
              </h2>
              <p className={`text-muted-foreground text-sm ${kh ? "font-khmer" : ""}`}>
                {t("Select a category to begin your practice session.", "ជ្រើសប្រភេទមួយ ដើម្បីចាប់ផ្តើមមេរៀនហ្វឹកហ្វឺន។")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* ── Health & Science (active) ── */}
              <button
                onClick={() => setView("topics")}
                className="group text-left flex flex-col bg-card rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-400 transition-all duration-200 overflow-hidden cursor-pointer"
              >
                <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Microscope className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {t("3 topics", "៣ ប្រធានបទ")}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                      {t("Health & Science", "សុខភាព និងវិទ្យាសាស្ត្រ")}
                    </h3>
                    <p className={`text-muted-foreground text-sm mt-1.5 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t("Cell biology, human health, and oncology basics — bilingual quiz questions for Grade 11–12.", "ជីវវិទ្យាកោសិកា សុខភាពមនុស្ស និងមូលដ្ឋានគ្រឹះមហារីក — ចំណោទ ២ ភាសាសម្រាប់ថ្នាក់ ១១–១២។")}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                    {t("Start Studying", "ចាប់ផ្តើមសិក្សា")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* ── Coming soon cards ── */}
              {COMING_SOON.map((cs) => (
                <div
                  key={cs.titleEn}
                  className="flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden opacity-60 cursor-not-allowed select-none"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cs.color}`} />
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cs.color} flex items-center justify-center shadow-md`}>
                        <cs.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {t("Coming Soon", "ឆាប់ៗ")}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                        {kh ? cs.titleKh : cs.titleEn}
                      </h3>
                      <p className={`text-muted-foreground text-sm mt-1.5 ${kh ? "font-khmer" : ""}`}>
                        {t("More bilingual practice questions coming soon.", "ចំណោទ ២ ភាសាបន្ថែម នឹងមានឆាប់ៗ។")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* External Exam Prep link */}
            <div className="mt-10 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className={`font-bold text-amber-800 dark:text-amber-300 text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Comprehensive Exam Practice & Quiz Generation", "ការហ្វឹកហ្វឺនប្រឡងទូលំទូលាយ និងការបង្កើតកម្រងសំណួរ")}
                </p>
                <p className={`text-amber-700/75 dark:text-amber-400/75 text-xs mt-0.5 ${kh ? "font-khmer" : ""}`}>
                  {t("Access exam guidance and custom quiz generation for any school subject, including English, Science, and Math.", "ការណែនាំអំពីការប្រឡង និងការបង្កើតកម្រងសំណួរសម្រាប់គ្រប់មុខវិជ្ជាសិក្សា រួមទាំងភាសាអង់គ្លេស វិទ្យាសាស្ត្រ និងគណិតវិទ្យា។")}
                </p>
              </div>
              <a
                href="https://khmerenglishexam.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors ${kh ? "font-khmer" : ""}`}
              >
                {t("Khmer English Exam", "ប្រឡងភាសាអង់គ្លេស")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* ── Global Leaderboard ── */}
            <QuizLeaderboard />
          </>
        )}

        {/* ════════════════ TOPICS VIEW ════════════════ */}
        {view === "topics" && (
          <>
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("Back to Subjects", "ត្រឡប់ទៅប្រធានបទ")}
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <h2 className={`font-display font-bold text-foreground text-2xl ${kh ? "font-khmer" : ""}`}>
                  {t("Health & Science", "សុខភាព និងវិទ្យាសាស្ត្រ")}
                </h2>
              </div>
              <p className={`text-muted-foreground text-sm ml-1 ${kh ? "font-khmer" : ""}`}>
                {t("Choose a topic to start your quiz session.", "ជ្រើសប្រធានបទ ដើម្បីចាប់ផ្តើមការធ្វើតេស្ត។")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOPICS.map((topic, i) => {
                const Icon = TOPIC_ICONS[i];
                return (
                  <button
                    key={topic.id}
                    onClick={() => startTopic(topic)}
                    className="group text-left flex flex-col bg-card rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-400 transition-all duration-200 overflow-hidden"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <Icon className="w-5.5 h-5.5 text-emerald-600 w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? topic.titleKh : topic.titleEn}
                        </h3>
                        <p className={`text-emerald-600 text-xs font-semibold mt-1 ${kh ? "font-khmer" : ""}`}>
                          {kh ? topic.focusKh : topic.focusEn}
                        </p>
                      </div>
                      <p className={`text-muted-foreground text-sm ${kh ? "font-khmer leading-loose" : ""}`}>
                        {topic.questions.length} {t("questions • Multiple choice", "ចំណោទ • ជ្រើសចម្លើយ")}
                      </p>
                      <div className="mt-auto flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                        {t("Start Quiz", "ចាប់ផ្តើមតេស្ត")}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ════════════════ QUIZ VIEW ════════════════ */}
        {view === "quiz" && activeTopic && (
          <>
            {/* Breadcrumb */}
            <button
              onClick={() => setView("topics")}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {kh ? activeTopic.titleKh : activeTopic.titleEn}
            </button>

            {/* ── DONE state ── */}
            {quiz.done ? (
              <div className="max-w-lg mx-auto text-center py-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className={`font-display font-bold text-foreground text-2xl mb-2 ${kh ? "font-khmer" : ""}`}>
                  {t("Quiz Complete!", "ការធ្វើតេស្តបានបញ្ចប់!")}
                </h2>
                <p className={`text-muted-foreground text-base mb-6 ${kh ? "font-khmer" : ""}`}>
                  {t("Your score", "ពិន្ទុរបស់អ្នក")}:{" "}
                  <span className="font-bold text-emerald-600 text-xl">
                    {quiz.score} / {total}
                  </span>
                </p>

                {/* Score bar */}
                <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                    style={{ width: `${(quiz.score / total) * 100}%` }}
                  />
                </div>

                <p className={`text-muted-foreground text-sm mb-8 ${kh ? "font-khmer leading-loose" : ""}`}>
                  {quiz.score === total
                    ? t("Perfect score! Outstanding work.", "ពិន្ទុល្អឥតខ្ចោះ! ការងារល្អណាស់។")
                    : quiz.score >= Math.ceil(total / 2)
                    ? t("Good effort! Review the explanations to improve further.", "ការខិតខំប្រឹងប្រែងល្អ! ពិនិត្យឡើងវិញនូវការពន្យល់ ដើម្បីកែលម្អ។")
                    : t("Keep practising — every attempt builds your knowledge.", "បន្តហ្វឹកហ្វឺន — ការប្រឡងរៀងរាល់ដងបង្កើនចំណេះដឹងរបស់អ្នក។")}
                </p>

                {/* ── Score submission ── */}
                <div className="mb-6 p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-left">
                  <h4 className={`font-bold text-teal-800 dark:text-teal-200 text-sm mb-1 ${kh ? "font-khmer" : ""}`}>
                    🏆 {t("Submit your score to the leaderboard", "ដាក់ជូនពិន្ទុទៅតារាងចំណាត់ថ្នាក់")}
                  </h4>
                  <p className={`text-xs text-teal-700/70 dark:text-teal-400/70 mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      `You earned ${Math.round((quiz.score / total) * 100)} EXP. Enter your name and province to appear on the global leaderboard.`,
                      `អ្នកទទួលបាន ${Math.round((quiz.score / total) * 100)} EXP។ បញ្ចូលឈ្មោះ និងខេត្ត ដើម្បីបង្ហាញលើតារាងចំណាត់ថ្នាក់។`
                    )}
                  </p>

                  {submitted ? (
                    <div className={`flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      {t("Score submitted! Check the leaderboard below.", "ពិន្ទុត្រូវបានដាក់ជូន! ពិនិត្យតារាងខាងក្រោម។")}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        maxLength={50}
                        value={submitName}
                        onChange={(e) => setSubmitName(e.target.value)}
                        placeholder={t("Your name", "ឈ្មោះរបស់អ្នក")}
                        className={`flex-1 px-3 py-2.5 rounded-xl border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-card text-sm focus:outline-none focus:border-teal-400 ${kh ? "font-khmer" : ""}`}
                      />
                      <select
                        value={submitProvince}
                        onChange={(e) => setSubmitProvince(e.target.value)}
                        className={`flex-1 px-3 py-2.5 rounded-xl border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-card text-sm focus:outline-none focus:border-teal-400 ${kh ? "font-khmer" : ""}`}
                      >
                        <option value="">{t("Select province…", "ជ្រើសខេត្ត…")}</option>
                        {PROVINCES.map((p) => (
                          <option key={p.en} value={p.en}>
                            {kh ? p.kh : p.en}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleSubmitScore}
                        disabled={submitting || !submitName.trim() || !submitProvince}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {t("Submit", "ដាក់ជូន")}
                      </button>
                    </div>
                  )}

                  {submitError && (
                    <p className={`mt-2 text-xs text-red-500 ${kh ? "font-khmer" : ""}`}>{submitError}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={restartQuiz}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors ${kh ? "font-khmer text-base" : ""}`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t("Try Again", "សាកល្បងម្តងទៀត")}
                  </button>
                  <button
                    onClick={() => setView("topics")}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-border font-bold hover:bg-muted transition-colors ${kh ? "font-khmer text-base" : ""}`}
                  >
                    {t("Choose Another Topic", "ជ្រើសប្រធានបទផ្សេង")}
                  </button>
                </div>

                {/* Oncology cross-link */}
                {isOncology && (
                  <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <p className={`font-bold text-emerald-800 dark:text-emerald-300 text-sm ${kh ? "font-khmer" : ""}`}>
                        {t("Want to learn more about cancer in Cambodia?", "ចង់ស្វែងយល់បន្ថែមអំពីជំងឺមហារីកនៅកម្ពុជា?")}
                      </p>
                    </div>
                    <p className={`text-emerald-700/70 dark:text-emerald-400/70 text-xs mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Khmer Cancer provides trusted Cambodian resources on cancer awareness, prevention, and patient support.",
                        "Khmer Cancer ផ្តល់ធនធានដែលអាចជឿទុកចិត្តបានអំពីការយល់ដឹង ការបង្ការ និងការគាំទ្រអ្នកជំងឺ។"
                      )}
                    </p>
                    <a
                      href="https://khmercancer.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 hover:shadow-md transition-all ${kh ? "font-khmer" : ""}`}
                    >
                      {t("Learn more at Khmer Cancer", "ស្វែងយល់បន្ថែមនៅ Khmer Cancer")}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              /* ── ACTIVE QUIZ ── */
              current && (
                <div className="max-w-2xl mx-auto">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold text-emerald-600 ${kh ? "font-khmer" : ""}`}>
                        {kh ? activeTopic.titleKh : activeTopic.titleEn}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                      {quiz.index + 1} / {total}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${((quiz.index) / total) * 100}%` }}
                    />
                  </div>

                  {/* Question card */}
                  <div className="bg-card rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/40 shadow-md overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="p-6 sm:p-8">
                      <p className={`text-foreground font-bold text-lg leading-snug mb-6 ${kh ? "font-khmer leading-loose" : ""}`}>
                        {kh ? current.questionKh : current.questionEn}
                      </p>

                      {/* Options */}
                      <div className="flex flex-col gap-3">
                        {current.options.map((opt, i) => {
                          const isSelected = quiz.selected === i;
                          const isCorrect = i === current.correctIndex;
                          const revealed = quiz.selected !== null;

                          let cls = "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all duration-150 ";
                          if (!revealed) {
                            cls += "border-border hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer";
                          } else if (isCorrect) {
                            cls += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200";
                          } else if (isSelected) {
                            cls += "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300";
                          } else {
                            cls += "border-border opacity-50";
                          }

                          return (
                            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                              <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold
                                ${revealed && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : ""}
                                ${revealed && isSelected && !isCorrect ? "border-red-400 bg-red-400 text-white" : ""}
                                ${!revealed ? "border-border" : ""}`}>
                                {revealed && isCorrect ? <CheckCircle2 className="w-4 h-4" /> : revealed && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                              </span>
                              <span className={kh ? "font-khmer leading-snug" : ""}>
                                {kh ? opt.textKh : opt.textEn}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {quiz.selected !== null && (
                        <div className={`mt-5 p-4 rounded-xl ${quiz.selected === current.correctIndex ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"}`}>
                          <p className={`text-sm leading-relaxed ${quiz.selected === current.correctIndex ? "text-emerald-800 dark:text-emerald-200" : "text-amber-800 dark:text-amber-200"} ${kh ? "font-khmer leading-loose" : ""}`}>
                            <span className="font-bold">{t("Explanation:", "ការពន្យល់:")} </span>
                            {kh ? current.explanationKh : current.explanationEn}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Next button */}
                    {quiz.selected !== null && (
                      <div className="px-6 sm:px-8 pb-6 pt-0">
                        <button
                          onClick={handleNext}
                          className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all active:scale-95 ${kh ? "font-khmer text-base" : ""}`}
                        >
                          {quiz.index + 1 >= total
                            ? t("See Results", "មើលលទ្ធផល")
                            : t("Next Question", "ចំណោទបន្ទាប់")}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Oncology in-quiz nudge (subtle) */}
                  {isOncology && (
                    <p className="text-center text-xs text-muted-foreground/50 mt-4">
                      {t("Powered by real oncology education — visit ", "ព័ត៌មានអប់រំពីជំងឺមហារីក — ចូលទស្សនា ")}
                      <a href="https://khmercancer.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-semibold">
                        khmercancer.com
                      </a>
                    </p>
                  )}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
