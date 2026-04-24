import { useState, useEffect, useRef } from "react";
import { Brain, ChevronRight, Sparkles, RotateCcw, ExternalLink, Star } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useCareerMatchStore } from "@/store/use-career-match";
import careersData from "@/data/careers.json";

type Major = { id: string; en: string; kh: string; icon: string; careers: { en: string; kh: string }[] };
const allMajors = careersData as Major[];

/* ── Subject definitions ──────────────────────────────────────────── */
const SUBJECTS = [
  { id: "science", icon: "🔬", en: "Biology & Chemistry", kh: "ជីវវិទ្យា និងគីមី" },
  { id: "math",    icon: "📐", en: "Mathematics & Physics", kh: "គណិតវិទ្យា និងរូបវិទ្យា" },
  { id: "lit",     icon: "📚", en: "Literature & History", kh: "អក្សរសាស្ត្រ និងប្រវត្តិសាស្ត្រ" },
  { id: "tech",    icon: "💻", en: "Computer & Technology", kh: "កុំព្យូទ័រ និងបច្ចេកវិទ្យា" },
  { id: "art",     icon: "🎨", en: "Art, Music & Design", kh: "សិល្បៈ តន្ត្រី និងរចនា" },
  { id: "social",  icon: "🌍", en: "Social Studies & Civics", kh: "សង្គមសិក្សា និងនីតិ" },
] as const;
type SubjectId = (typeof SUBJECTS)[number]["id"];

/* ── Recommendation map ───────────────────────────────────────────── */
interface RecommendationDef {
  majorId: string;
  whyEn: string;
  whyKh: string;
}

const RECS: Record<SubjectId, RecommendationDef[]> = {
  science: [
    { majorId: "biological-sciences",  whyEn: "Your strength in living systems maps directly onto cell biology, genetics, and biomedical research.", whyKh: "ភាពខ្លាំងរបស់អ្នកក្នុងប្រព័ន្ធរស់ ត្រូវនឹងជីវវិទ្យាកោសិកា ហ្សែន និងការស្រាវជ្រាវវេជ្ជសាស្ត្រ។" },
    { majorId: "health-professions",   whyEn: "A high aptitude for science is the first step toward becoming a doctor, nurse, or pharmacist.", whyKh: "ភាពខ្លាំងខាងវិទ្យាសាស្ត្រ គឺជាជំហានដំបូងឆ្ពោះទៅជាគ្រូពេទ្យ គិលានុបដ្ឋាក ឬឱសថការ។" },
    { majorId: "chemistry",            whyEn: "Your love of molecules and reactions is the foundation for materials science, medicine, and industry.", whyKh: "ចំណូលចិត្តរបស់អ្នកចំពោះម៉ូលេគុល និងប្រតិកម្ម គឺជាគ្រឹះសម្រាប់វិទ្យាសាស្ត្រសម្ភារ ឱសថ និងឧស្សាហកម្ម។" },
  ],
  math: [
    { majorId: "engineering",          whyEn: "Analytical thinking and precision in maths are the core tools every engineer uses daily.", whyKh: "ការគិតវិភាគ និងភាពជាក់លាក់ខាងគណិតវិទ្យា គឺជាឧបករណ៍ស្នូលដែលវិស្វករប្រើប្រចាំថ្ងៃ។" },
    { majorId: "mathematics",          whyEn: "If you enjoy solving problems elegantly, pure and applied mathematics will take you to the frontier of knowledge.", whyKh: "ប្រសិនបើអ្នកចូលចិត្តដោះស្រាយបញ្ហាបែបឆ្លាតវៃ គណិតវិទ្យាជូរ និងអនុវត្ត នឹងដឹកនាំអ្នកទៅព្រំដែននៃចំណេះដឹង។" },
    { majorId: "computer-sciences",    whyEn: "Strong mathematical reasoning makes you a natural at algorithms, cryptography, and AI development.", whyKh: "ការវិភាគខាងគណិតវិទ្យាខ្លាំង ធ្វើឲ្យអ្នកស័ក្ដិសមណាស់ក្នុង algorithm, cryptography, និងការអភិវឌ្ឍ AI ។" },
  ],
  lit: [
    { majorId: "english-literature",   whyEn: "Your feel for language, narrative, and critical analysis is exactly what literature and journalism demand.", whyKh: "ការយល់ដឹងខាងភាសា រឿងរ៉ាវ និងការវិភាគ គឺជាអ្វីដែលអក្សរសាស្ត្រ និងសារព័ត៌មានត្រូវការ។" },
    { majorId: "history",              whyEn: "Reading the past to guide the future: your humanities skill set is ideal for archival research and policy.", whyKh: "អានអតីតកាលដើម្បីដឹកនាំអនាគត: ជំនាញមនុស្សសាស្ត្ររបស់អ្នក ល្អណាស់សម្រាប់ការស្រាវជ្រាវ និងគោលនយោបាយ។" },
    { majorId: "legal-professions",    whyEn: "Constructing clear arguments and interpreting complex texts are skills that define great lawyers and judges.", whyKh: "ការបង្កើតប្រជែងច្បាស់លាស់ និងបកស្រាយឯកសារស្មុគ្រស្មាញ គឺជាជំនាញដែលកំណត់មេធាវី និងចៅក្រមដ៏ល្អ។" },
  ],
  tech: [
    { majorId: "computer-sciences",    whyEn: "Your logical thinking and passion for technology are the perfect launchpad for software, AI, and data science.", whyKh: "ការគិតតក្កវិជ្ជា និងចំណូលចិត្តខាងបច្ចេកវិទ្យា គឺជាការចាប់ផ្ដើមមួយដ៏ល្អ សម្រាប់ software, AI, និងវិទ្យាសាស្ត្រទិន្នន័យ។" },
    { majorId: "engineering-technologies", whyEn: "Hands-on tech skills position you perfectly to bridge design and real-world automated manufacturing.", whyKh: "ជំនាញបច្ចេកទេសផ្ទាល់ ធ្វើឲ្យអ្នកស័ក្ដិសមក្នុងការភ្ជាប់ការរចនា ជាមួយការផលិតស្វ័យប្រវត្តិ។" },
    { majorId: "electrical-engineering", whyEn: "Your aptitude for systems and circuits powers the backbone of every modern city and device.", whyKh: "ភាពខ្លាំងខាងប្រព័ន្ធ និងសៀគ្វី ជំរុញឆ្អឹងខ្នងនៃទីក្រុង និងឧបករណ៍ទំនើបគ្រប់ប្រភេទ។" },
  ],
  art: [
    { majorId: "visual-arts",          whyEn: "Creative visual thinkers drive Cambodia's growing digital design, animation, and cultural industries.", whyKh: "អ្នកគិតបែបសិល្បៈ ជំរុញឧស្សាហកម្មរចនា គំនូរជីវចល និងវប្បធម៌ ដែលកំពុងរីកចម្រើនរបស់កម្ពុជា។" },
    { majorId: "architecture",         whyEn: "Merging art and engineering, architecture lets you shape the physical world that every Cambodian will live in.", whyKh: "ការបញ្ចូលសិល្បៈ និងវិស្វកម្ម ស្ថាបត្យកម្មអនុញ្ញាតឲ្យអ្នករូបរាងពិភពលោករូបវន្ត ដែលប្រជាជនខ្មែររស់នៅ។" },
    { majorId: "communications-technologies", whyEn: "Creative communication skills translate directly into broadcast production, media design, and storytelling.", whyKh: "ជំនាញទំនាក់ទំនងច្នៃប្រឌិត ផ្ទេរទៅការផលិត broadcast ការរចនាប្រព័ន្ធ media និងការនិទានរឿង។" },
  ],
  social: [
    { majorId: "area-studies",         whyEn: "Your curiosity about cultures, people, and societies is the foundation for development work, diplomacy, and research.", whyKh: "ការចង់ដឹងរបស់អ្នកស្ដីពីវប្បធម៌ មនុស្ស និងសង្គម គឺជាគ្រឹះសម្រាប់ការងារអភិវឌ្ឍ ការទូត និងការស្រាវជ្រាវ។" },
    { majorId: "legal-professions",    whyEn: "A passion for justice and civic systems is exactly the drive great lawyers and policy makers are built from.", whyKh: "ចំណង់ចំពោះយុត្តិធម៌ និងប្រព័ន្ធពលរដ្ឋ គឺជាការលើកទឹកចិត្ត ដែលបង្កើតមេធាវី និងអ្នកបង្កើតគោលនយោបាយ។" },
    { majorId: "human-services",       whyEn: "Empathy and civic-mindedness are the core strengths that make exceptional social workers and community leaders.", whyKh: "ការយល់ចិត្ត និងវិញ្ញាណពលរដ្ឋ គឺជាភាពខ្លាំងស្នូល ដែលបង្កើតអ្នកសង្គមកិច្ច និងអ្នកដឹកនាំសហគមន៍ ។" },
  ],
};

/* ── Oscilloscope canvas ──────────────────────────────────────────── */
function Oscilloscope({ phase }: { phase: "scanning" | "locked" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#0a0f1e";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(37,99,235,0.12)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += w / 10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += h / 4)  { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      const t = tRef.current;

      if (phase === "scanning") {
        const waves = [
          { amp: 0.28, freq: 2.8, speed: 1.4, color: "#2563EB", alpha: 0.9, lw: 2 },
          { amp: 0.14, freq: 6.5, speed: 2.1, color: "#34d399", alpha: 0.6, lw: 1.5 },
          { amp: 0.09, freq: 11,  speed: 3.2, color: "#f59e0b", alpha: 0.4, lw: 1 },
        ];
        waves.forEach(({ amp, freq, speed, color, alpha, lw }) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = lw;
          for (let px = 0; px < w; px++) {
            const nx = px / w;
            const ny = 0.5 + amp * Math.sin(freq * Math.PI * 2 * nx + t * speed);
            px === 0 ? ctx.moveTo(px, ny * h) : ctx.lineTo(px, ny * h);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        });

        const scanX = ((t * 60) % w);
        const grad = ctx.createLinearGradient(scanX - 40, 0, scanX + 4, 0);
        grad.addColorStop(0, "rgba(99,179,237,0)");
        grad.addColorStop(1, "rgba(99,179,237,0.7)");
        ctx.fillStyle = grad;
        ctx.fillRect(scanX - 40, 0, 44, h);
        ctx.strokeStyle = "rgba(147,210,255,0.9)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, h); ctx.stroke();

      } else {
        const beat = Math.max(0, 1 - ((t * 1.2) % 1) * 3);
        ctx.beginPath();
        ctx.strokeStyle = "#34d399";
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.9;
        for (let px = 0; px < w; px++) {
          const nx = px / w;
          const pulse = beat * 0.35 * Math.exp(-Math.pow((nx - 0.5) * 8, 2));
          const ny = 0.5 + pulse;
          px === 0 ? ctx.moveTo(px, ny * h) : ctx.lineTo(px, ny * h);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      tRef.current += 0.016;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={120}
      className="w-full rounded-xl"
      style={{ height: 100 }}
    />
  );
}

/* ── Compatibility score bar ─────────────────────────────────────── */
function CompatBar({ pct, color }: { pct: number; color: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v = Math.min(pct, v + 2);
      setDisplay(v);
      if (v >= pct) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [pct]);
  return (
    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${display}%`, background: color }}
      />
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
interface CareerMatcherProps {
  onNavigateToMajor: (majorId: string) => void;
  onResetPathways?: () => void;
}

type Phase = "assessment" | "scanning" | "results";

const DEFAULT_SCORES: Record<SubjectId, number> = { science: 3, math: 3, lit: 3, tech: 3, art: 3, social: 3 };

export function CareerMatcher({ onNavigateToMajor, onResetPathways }: CareerMatcherProps) {
  const t  = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const store = useCareerMatchStore();

  const [phase,       setPhase]       = useState<Phase>("assessment");
  const [scores,      setScores]      = useState<Record<SubjectId, number>>(
    store.preScores ?? DEFAULT_SCORES
  );
  const [results,     setResults]     = useState<{ def: RecommendationDef; major: Major; compat: number }[]>([]);
  const [topSubject,  setTopSubject]  = useState<{ en: string; kh: string; score: number } | null>(null);

  // Auto-trigger scan if arriving from ExamPrepPage
  useEffect(() => {
    if (store.autoTrigger && store.preScores) {
      setScores(store.preScores);
      store.clearAutoTrigger();
      const timer = setTimeout(() => runAnalyse(store.preScores!), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setScore(id: SubjectId, val: number) {
    setScores(s => ({ ...s, [id]: val }));
  }

  function runAnalyse(useScores: Record<SubjectId, number>) {
    const sorted = (Object.entries(useScores) as [SubjectId, number][])
      .sort((a, b) => b[1] - a[1]);

    const seen = new Set<string>();
    const picks: { def: RecommendationDef; major: Major; compat: number }[] = [];

    for (const [subId, score] of sorted) {
      if (picks.length >= 3) break;
      for (const def of RECS[subId]) {
        if (seen.has(def.majorId)) continue;
        const major = allMajors.find(m => m.id === def.majorId);
        if (!major || major.careers.length === 0) continue;
        const compat = Math.min(99, Math.round(60 + (score / 5) * 30 + (3 - picks.length) * 3));
        picks.push({ def, major, compat });
        seen.add(def.majorId);
        break;
      }
    }

    // Find top subject label
    const [topSubId, topScore] = sorted[0] ?? ["science", 3];
    const subjectDef = SUBJECTS.find(s => s.id === topSubId)!;
    setTopSubject({ en: subjectDef.en, kh: subjectDef.kh, score: topScore });

    // Save to store for cross-page reference
    if (picks[0]) {
      store.setTopPick({
        majorId: picks[0].major.id,
        subjectLabelEn: subjectDef.en,
        subjectLabelKh: subjectDef.kh,
        scoreRating: topScore,
      });
    }

    setResults(picks);
    setPhase("scanning");
    setTimeout(() => setPhase("results"), 3800);
  }

  function analyse() {
    runAnalyse(scores);
  }

  function reset() {
    setPhase("assessment");
    setScores(DEFAULT_SCORES);
    setResults([]);
    setTopSubject(null);
    store.clearAll();
    onResetPathways?.();
  }

  const accentColors = ["#2563EB", "#059669", "#d97706"];

  return (
    <div className="rounded-3xl border-2 border-blue-200 dark:border-blue-900/50 bg-card overflow-hidden shadow-lg">

      {/* Header */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
      <div className="px-6 py-5 border-b border-border/60 flex items-center gap-3 bg-gradient-to-r from-blue-50/60 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
            {t("Career Matcher", "ឧបករណ៍ស្វែងរកអាជីព")}
            {kh && <span className="ml-2 text-xs font-sans font-normal text-muted-foreground">(Career Matcher)</span>}
          </h3>
          <p className={`text-muted-foreground text-xs mt-0.5 ${kh ? "font-khmer" : ""}`}>
            {t("AI-powered major recommendations based on your strengths", "អនុសាសន៍ជំនាញ ផ្អែកលើភាពខ្លាំងរបស់អ្នក")}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-bold text-blue-700 dark:text-blue-300">AI</span>
        </div>
      </div>

      <div className="p-6">

        {/* ════ ASSESSMENT PHASE ════ */}
        {phase === "assessment" && (
          <>
            <p className={`text-sm text-muted-foreground mb-6 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Rate your performance and interest in each subject from 1 (weakest) to 5 (strongest). The AI will analyse your neural strengths and recommend the best-fit college majors.",
                "វាយតម្លៃការអនុវត្ត និងចំណូលចិត្តរបស់អ្នកនៅក្នុងមុខវិជ្ជានីមួយៗ ពី ១ (ខ្សោយបំផុត) ដល់ ៥ (ខ្លាំងបំផុត)។ AI នឹងវិភាគភាពខ្លាំងរបស់អ្នក ហើយណែនាំជំនាញល្អបំផុតនៅសាកលវិទ្យាល័យ។"
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {SUBJECTS.map((subj) => (
                <div key={subj.id} className="bg-muted/40 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{subj.icon}</span>
                    <span className={`font-semibold text-sm text-foreground ${kh ? "font-khmer" : ""}`}>
                      {kh ? subj.kh : subj.en}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => setScore(subj.id, v)}
                        className="transition-transform hover:scale-110 active:scale-95"
                        aria-label={`${v} star`}
                      >
                        <Star
                          className="w-6 h-6 transition-colors"
                          fill={scores[subj.id] >= v ? "#f59e0b" : "transparent"}
                          stroke={scores[subj.id] >= v ? "#f59e0b" : "#94a3b8"}
                        />
                      </button>
                    ))}
                    <span className="ml-auto text-xs font-bold text-muted-foreground self-center">
                      {scores[subj.id]}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={analyse}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
            >
              <Brain className="w-5 h-5" />
              {t("Analyse My Neural Strengths", "វិភាគភាពខ្លាំងរបស់ខ្ញុំ")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ════ SCANNING PHASE ════ */}
        {phase === "scanning" && (
          <div className="py-4 flex flex-col items-center gap-6">
            <div className="w-full">
              <Oscilloscope phase="scanning" />
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                <span className={`text-xs font-bold text-blue-700 dark:text-blue-300 ${kh ? "font-khmer" : ""}`}>
                  {t("Scanning neural strengths…", "កំពុងស្កេនភាពខ្លាំង…")}
                </span>
              </div>
              <p className={`text-muted-foreground text-sm ${kh ? "font-khmer" : ""}`}>
                {t("Cross-referencing your profile with 76 career pathways", "ប្រៀបធៀបប្រូហ្វាយរបស់អ្នក ជាមួយផ្លូវអាជីព ៧៦")}
              </p>
            </div>

            <div className="w-full grid grid-cols-3 gap-3">
              {["Profile Analysis", "Career Mapping", "Compatibility Score"].map((label, i) => (
                <div key={label} className="rounded-lg bg-slate-800 dark:bg-slate-900 px-3 py-2.5 text-center border border-blue-900/40">
                  <div
                    className="text-[10px] font-mono text-blue-400 mb-1 overflow-hidden whitespace-nowrap"
                    style={{ animation: `pulse 1s ease-in-out ${i * 0.3}s infinite alternate` }}
                  >
                    {label.toUpperCase()}
                  </div>
                  <div className="text-green-400 font-mono text-xs font-bold">
                    {i === 2 ? "…" : "✓ OK"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ RESULTS PHASE ════ */}
        {phase === "results" && results.length > 0 && (
          <>
            <div className="mb-5">
              <Oscilloscope phase="locked" />
            </div>

            {/* Bilingual "Based on your score" context banner */}
            {topSubject && (
              <div className="mb-5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/20 px-4 py-3 flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">🧠</span>
                <div>
                  <p className={`text-sm font-semibold text-teal-800 dark:text-teal-300 leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh
                      ? `ដោយផ្អែកលើពិន្ទុខ្ពស់របស់អ្នក (${topSubject.score}/5) ក្នុង${topSubject.kh} យើងបានកំណត់ ៣ ផ្លូវអាជីពដែលស័ក្ដិសមបំផុតរបស់អ្នក។`
                      : `Based on your high score (${topSubject.score}/5) in ${topSubject.en}, we identified your top 3 compatible career pathways.`
                    }
                  </p>
                  {kh && (
                    <p className="text-xs text-teal-600/60 mt-0.5 italic">
                      Based on your high score ({topSubject.score}/5) in {topSubject.en}, we identified your top 3 compatible career pathways.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50" />
              <span className={`text-xs font-bold text-green-600 dark:text-green-400 px-3 ${kh ? "font-khmer" : ""}`}>
                {t("3 COMPATIBLE PATHWAYS FOUND", "ផ្លូវ ៣ ដែលស័ក្ដិសម")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50" />
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {results.map(({ def, major, compat }, idx) => (
                <div
                  key={major.id}
                  className="rounded-xl border-2 p-4 bg-gradient-to-br from-card to-muted/20 hover:shadow-md transition-shadow"
                  style={{ borderColor: accentColors[idx] + "40" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{major.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ background: accentColors[idx] }}
                          >
                            #{idx + 1}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wide ${kh ? "font-khmer" : ""}`}
                            style={{ color: accentColors[idx] }}>
                            {t("Top Match", "ស័ក្ដិសមបំផុត")}
                          </span>
                        </div>
                        <h4 className={`font-bold text-foreground text-base leading-tight mt-0.5 ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? major.kh : major.en}
                        </h4>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold" style={{ color: accentColors[idx] }}>
                        {compat}%
                      </div>
                      <div className={`text-[10px] text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                        {t("compatible", "ភាពស័ក្ដិសម")}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <CompatBar pct={compat} color={accentColors[idx]} />
                  </div>

                  <div
                    className="rounded-lg p-3 mb-3 border"
                    style={{ borderColor: accentColors[idx] + "30", background: accentColors[idx] + "08" }}
                  >
                    <p className={`text-xs font-semibold mb-1 ${kh ? "font-khmer" : ""}`}
                      style={{ color: accentColors[idx] }}>
                      {t("ហេតុអ្វីជំនាញនេះសាកសមនឹងអ្នក", "Why this fits you")}
                    </p>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {kh ? def.whyKh : def.whyEn}
                    </p>
                  </div>

                  {major.careers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {major.careers.slice(0, 3).map(c => (
                        <span key={c.en} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground font-medium">
                          {kh ? c.kh : c.en}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => onNavigateToMajor(major.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm text-white hover:opacity-90 hover:shadow-sm active:scale-95 transition-all ${kh ? "font-khmer" : ""}`}
                    style={{ background: accentColors[idx] }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t("Auto-select in Future Pathways Guide", "ជ្រើសស្វ័យប្រវត្តិក្នុងមគ្គុទ្ទេសក៍ផ្លូវ")}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border font-bold text-sm hover:bg-muted transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <RotateCcw className="w-4 h-4" />
              {t("Retake Assessment", "ធ្វើការវាស់ស្ទង់ម្ដងទៀត")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
