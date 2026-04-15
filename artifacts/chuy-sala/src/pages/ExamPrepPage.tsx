import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Microscope, ChevronRight, ChevronLeft, RotateCcw, CheckCircle2, XCircle, FlaskConical, Heart, BookOpen, ExternalLink, Dna, Trophy, ArrowRight, Brain, Sparkles, Calculator, BarChart2 } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useCareerMatchStore } from "@/store/use-career-match";
import healthData from "@/data/health_science.json";
import grammarData from "@/data/english_grammar.json";
import mathData from "@/data/mathematics.json";

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

type SubjectConfig = {
  id: string;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  icon: React.ComponentType<{ className?: string }>;
  bar: string;
  iconBg: string;
  cardBorder: string;
  hoverBorder: string;
  badge: string;
  link: string;
  topicBorder: string;
  topicHoverBorder: string;
  topicIconBg: string;
  topicIconColor: string;
  topicFocus: string;
  topicLink: string;
  topicBar: string;
  topicProgressBar: string;
  quizBorder: string;
  quizBar: string;
  quizHover: string;
  quizCorrect: string;
  quizCorrectBg: string;
  quizProgress: string;
  btn: string;
  topicIcons: React.ComponentType<{ className?: string }>[];
  topics: Topic[];
  careerScores: { science: number; math: number; lit: number; tech: number; art: number; social: number };
};

const SUBJECTS: SubjectConfig[] = [
  {
    id: "health",
    titleEn: "Health & Science",
    titleKh: "សុខភាព និងវិទ្យាសាស្ត្រ",
    descEn: "Cell biology, human health, and oncology basics — bilingual quiz questions for Grade 11–12.",
    descKh: "ជីវវិទ្យាកោសិកា សុខភាពមនុស្ស និងមូលដ្ឋានគ្រឹះមហារីក — ចំណោទ ២ ភាសាសម្រាប់ថ្នាក់ ១១–១២។",
    icon: Microscope,
    bar: "from-emerald-500 to-teal-500",
    iconBg: "from-emerald-500 to-teal-500",
    cardBorder: "border-emerald-200 dark:border-emerald-800",
    hoverBorder: "hover:border-emerald-400",
    badge: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800",
    link: "text-emerald-600",
    topicBorder: "border-emerald-100 dark:border-emerald-900/40",
    topicHoverBorder: "hover:border-emerald-400",
    topicIconBg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-100",
    topicIconColor: "text-emerald-600",
    topicFocus: "text-emerald-600",
    topicLink: "text-emerald-600",
    topicBar: "from-emerald-500 to-teal-400",
    topicProgressBar: "from-emerald-500 to-teal-400",
    quizBorder: "border-emerald-100 dark:border-emerald-900/40",
    quizBar: "from-emerald-500 to-teal-400",
    quizHover: "hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
    quizCorrect: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200",
    quizCorrectBg: "border-emerald-500 bg-emerald-500",
    quizProgress: "from-emerald-500 to-teal-400",
    btn: "bg-emerald-600 hover:bg-emerald-700",
    topicIcons: [Dna, Heart, Microscope],
    topics: healthData.topics as Topic[],
    careerScores: { science: 5, math: 3, lit: 3, tech: 3, art: 2, social: 2 },
  },
  {
    id: "english",
    titleEn: "English Grammar",
    titleKh: "វេយ្យាករណ៍ភាសាអង់គ្លេស",
    descEn: "Verb tenses, conditionals, and vocabulary — bilingual practice questions for Grade 12.",
    descKh: "កាលនៃកិរិយាសព្ទ លក្ខខណ្ឌ និងវាក្យសព្ទ — សំណួរអនុវត្តទ្វេភាសាសម្រាប់ថ្នាក់ទី ១២។",
    icon: BookOpen,
    bar: "from-blue-500 to-sky-400",
    iconBg: "from-blue-500 to-sky-400",
    cardBorder: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-400",
    badge: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800",
    link: "text-blue-600",
    topicBorder: "border-blue-100 dark:border-blue-900/40",
    topicHoverBorder: "hover:border-blue-400",
    topicIconBg: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 group-hover:bg-blue-100",
    topicIconColor: "text-blue-600",
    topicFocus: "text-blue-600",
    topicLink: "text-blue-600",
    topicBar: "from-blue-500 to-sky-400",
    topicProgressBar: "from-blue-500 to-sky-400",
    quizBorder: "border-blue-100 dark:border-blue-900/40",
    quizBar: "from-blue-500 to-sky-400",
    quizHover: "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30",
    quizCorrect: "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200",
    quizCorrectBg: "border-blue-500 bg-blue-500",
    quizProgress: "from-blue-500 to-sky-400",
    btn: "bg-blue-600 hover:bg-blue-700",
    topicIcons: [BookOpen, Brain, Sparkles],
    topics: grammarData.topics as Topic[],
    careerScores: { science: 2, math: 2, lit: 5, tech: 3, art: 3, social: 4 },
  },
  {
    id: "math",
    titleEn: "Mathematics",
    titleKh: "គណិតវិទ្យា",
    descEn: "Algebra, limits, and statistics — bilingual practice questions for Grade 12.",
    descKh: "ពីជគណិត លីមីត និងស្ថិតិ — សំណួរអនុវត្តទ្វេភាសាសម្រាប់ថ្នាក់ទី ១២។",
    icon: Calculator,
    bar: "from-violet-500 to-purple-400",
    iconBg: "from-violet-500 to-purple-400",
    cardBorder: "border-violet-200 dark:border-violet-800",
    hoverBorder: "hover:border-violet-400",
    badge: "text-violet-600 bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800",
    link: "text-violet-600",
    topicBorder: "border-violet-100 dark:border-violet-900/40",
    topicHoverBorder: "hover:border-violet-400",
    topicIconBg: "bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800 group-hover:bg-violet-100",
    topicIconColor: "text-violet-600",
    topicFocus: "text-violet-600",
    topicLink: "text-violet-600",
    topicBar: "from-violet-500 to-purple-400",
    topicProgressBar: "from-violet-500 to-purple-400",
    quizBorder: "border-violet-100 dark:border-violet-900/40",
    quizBar: "from-violet-500 to-purple-400",
    quizHover: "hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30",
    quizCorrect: "border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-200",
    quizCorrectBg: "border-violet-500 bg-violet-500",
    quizProgress: "from-violet-500 to-purple-400",
    btn: "bg-violet-600 hover:bg-violet-700",
    topicIcons: [FlaskConical, BarChart2, Calculator],
    topics: mathData.topics as Topic[],
    careerScores: { science: 3, math: 5, lit: 2, tech: 4, art: 2, social: 2 },
  },
];

export function ExamPrepPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [, navigate] = useLocation();
  const careerStore = useCareerMatchStore();

  const [view, setView] = useState<View>("home");
  const [selectedSubject, setSelectedSubject] = useState<SubjectConfig>(SUBJECTS[0]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [quiz, setQuiz] = useState<QuizState>({ index: 0, selected: null, score: 0, done: false });
  const [scanning, setScanning] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }

  function handleFindCareerMatch() {
    if (scanning) return;
    const pct = total > 0 ? quiz.score / total : 0.6;
    const boost = Math.max(1, Math.min(5, Math.round(pct * 5)));
    const base = selectedSubject.careerScores;
    careerStore.setPreScores({
      science: Math.max(1, Math.min(5, Math.round(base.science * (0.5 + pct * 0.5)))),
      math:    Math.max(1, Math.min(5, Math.round(base.math    * (0.5 + pct * 0.5)))),
      lit:     Math.max(1, Math.min(5, Math.round(base.lit     * (0.5 + pct * 0.5)))),
      tech:    Math.max(1, Math.min(5, Math.round(base.tech    * (0.5 + pct * 0.5)))),
      art:     Math.max(1, Math.min(5, Math.round(base.art     * (0.5 + pct * 0.5)))),
      social:  Math.max(1, Math.min(5, Math.round(base.social  * (0.5 + pct * 0.5)))),
    });
    void boost;
    careerStore.setAutoTrigger(true);
    setScanning(true);
    scanTimerRef.current = setTimeout(() => {
      setScanning(false);
      navigate("/launchpad");
    }, 2600);
  }

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

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
              {SUBJECTS.map((subj) => {
                const SubjIcon = subj.icon;
                return (
                  <button
                    key={subj.id}
                    onClick={() => { setSelectedSubject(subj); setView("topics"); }}
                    className={`group text-left flex flex-col bg-card rounded-2xl border-2 ${subj.cardBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 ${subj.hoverBorder} transition-all duration-200 overflow-hidden cursor-pointer`}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${subj.bar}`} />
                    <div className="flex flex-col flex-1 p-6 gap-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subj.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <SubjIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${subj.badge}`}>
                          {subj.topics.length} {t("topics", "ប្រធានបទ")}
                        </span>
                      </div>
                      <div>
                        <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? subj.titleKh : subj.titleEn}
                        </h3>
                        <p className={`text-muted-foreground text-sm mt-1.5 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                          {kh ? subj.descKh : subj.descEn}
                        </p>
                      </div>
                      <div className={`mt-auto flex items-center gap-1.5 ${subj.link} text-sm font-bold`}>
                        {t("Start Studying", "ចាប់ផ្តើមសិក្សា")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
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
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedSubject.iconBg} flex items-center justify-center shadow-sm`}>
                  {(() => { const SI = selectedSubject.icon; return <SI className="w-5 h-5 text-white" />; })()}
                </div>
                <h2 className={`font-display font-bold text-foreground text-2xl ${kh ? "font-khmer" : ""}`}>
                  {kh ? selectedSubject.titleKh : selectedSubject.titleEn}
                </h2>
              </div>
              <p className={`text-muted-foreground text-sm ml-1 ${kh ? "font-khmer" : ""}`}>
                {t("Choose a topic to start your quiz session.", "ជ្រើសប្រធានបទ ដើម្បីចាប់ផ្តើមការធ្វើតេស្ត។")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSubject.topics.map((topic, i) => {
                const Icon = selectedSubject.topicIcons[i] ?? selectedSubject.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => startTopic(topic)}
                    className={`group text-left flex flex-col bg-card rounded-2xl border-2 ${selectedSubject.topicBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 ${selectedSubject.topicHoverBorder} transition-all duration-200 overflow-hidden`}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${selectedSubject.topicBar}`} />
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${selectedSubject.topicIconBg}`}>
                        <Icon className={`w-5 h-5 ${selectedSubject.topicIconColor}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? topic.titleKh : topic.titleEn}
                        </h3>
                        <p className={`text-xs font-semibold mt-1 ${selectedSubject.topicFocus} ${kh ? "font-khmer" : ""}`}>
                          {kh ? topic.focusKh : topic.focusEn}
                        </p>
                      </div>
                      <p className={`text-muted-foreground text-sm ${kh ? "font-khmer leading-loose" : ""}`}>
                        {topic.questions.length} {t("questions • Multiple choice", "ចំណោទ • ជ្រើសចម្លើយ")}
                      </p>
                      <div className={`mt-auto flex items-center gap-1.5 ${selectedSubject.topicLink} text-sm font-bold`}>
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
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedSubject.bar} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className={`font-display font-bold text-foreground text-2xl mb-2 ${kh ? "font-khmer" : ""}`}>
                  {t("Quiz Complete!", "ការធ្វើតេស្តបានបញ្ចប់!")}
                </h2>
                <p className={`text-muted-foreground text-base mb-6 ${kh ? "font-khmer" : ""}`}>
                  {t("Your score", "ពិន្ទុរបស់អ្នក")}:{" "}
                  <span className={`font-bold text-xl ${selectedSubject.link}`}>
                    {quiz.score} / {total}
                  </span>
                </p>

                {/* Score bar */}
                <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${selectedSubject.quizProgress} transition-all duration-700`}
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

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={restartQuiz}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl ${selectedSubject.btn} text-white font-bold transition-colors ${kh ? "font-khmer text-base" : ""}`}
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

                {/* ── Neural Scan CTA ── */}
                {scanning ? (
                  <div className="mt-8 rounded-2xl border border-teal-300 dark:border-teal-700 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20 p-6 flex flex-col items-center gap-4">
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 animate-ping opacity-30" />
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className={`font-bold text-teal-800 dark:text-teal-300 text-base ${kh ? "font-khmer leading-loose" : ""}`}>
                        {t("Scanning neural strengths…", "កំពុងស្កេនភាពខ្លាំង…")}
                      </p>
                      <p className={`text-teal-600/70 dark:text-teal-400/70 text-sm mt-1 ${kh ? "font-khmer" : ""}`}>
                        {t("Mapping your score to 76 career pathways", "ប្រៀបធៀបពិន្ទុរបស់អ្នក ជាមួយផ្លូវអាជីព ៧៦")}
                      </p>
                    </div>
                    <div className="w-full max-w-xs h-1.5 rounded-full bg-teal-200 dark:bg-teal-900 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-amber-400 rounded-full animate-[scan-bar_2.6s_ease-in-out_forwards]"
                        style={{ animation: "none", background: "linear-gradient(to right,#2dd4bf,#f59e0b)", width: "100%",
                          maskImage: "linear-gradient(to right, black 0%, black var(--w, 0%))", WebkitMaskImage: "linear-gradient(to right, black 0%, black var(--w, 0%))" }}>
                        <div className="h-full bg-gradient-to-r from-teal-400 to-amber-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-blue-950/20 dark:to-indigo-950/10 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow flex-shrink-0">
                        <Brain className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                      </div>
                      <div>
                        <p className={`font-bold text-foreground text-sm leading-tight ${kh ? "font-khmer" : ""}`}>
                          {t("Find My Career Match", "ស្វែងរកអាជីពដែលសាកសម")}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {kh ? "ស្វែងរកអាជីពដែលសាកសមនឹងខ្ញុំ" : "Find My Career Match (ស្វែងរកអាជីពដែលសាកសម)"}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">AI</span>
                      </div>
                    </div>
                    <p className={`text-xs text-muted-foreground mb-4 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Your quiz score will be used to run a neural scan across 76 career pathways and auto-select the best major for you in the Future Pathways Guide.",
                        "ពិន្ទុធ្វើតេស្តរបស់អ្នក នឹងត្រូវប្រើដើម្បីស្កេនផ្លូវអាជីព ៧៦ ហើយជ្រើសជំនាញដែលល្អបំផុតសម្រាប់អ្នកដោយស្វ័យប្រវត្តិ។"
                      )}
                    </p>
                    <button
                      onClick={handleFindCareerMatch}
                      className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
                    >
                      <Brain className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                      {t("Find My Career Match", "ស្វែងរកអាជីពដែលសាកសម")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

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
                      <span className={`text-sm font-bold ${selectedSubject.link} ${kh ? "font-khmer" : ""}`}>
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
                      className={`h-2 rounded-full bg-gradient-to-r ${selectedSubject.quizProgress} transition-all duration-500`}
                      style={{ width: `${((quiz.index) / total) * 100}%` }}
                    />
                  </div>

                  {/* Question card */}
                  <div className={`bg-card rounded-2xl border-2 ${selectedSubject.quizBorder} shadow-md overflow-hidden`}>
                    <div className={`h-1 bg-gradient-to-r ${selectedSubject.quizBar}`} />
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
                            cls += `border-border ${selectedSubject.quizHover} cursor-pointer`;
                          } else if (isCorrect) {
                            cls += selectedSubject.quizCorrect;
                          } else if (isSelected) {
                            cls += "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300";
                          } else {
                            cls += "border-border opacity-50";
                          }

                          return (
                            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                              <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold
                                ${revealed && isCorrect ? `${selectedSubject.quizCorrectBg} text-white` : ""}
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
