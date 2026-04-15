import { useState } from "react";
import {
  FlaskConical,
  Search,
  Lightbulb,
  ClipboardList,
  BarChart2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Scientific Method Data ──────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    icon: Eye,
    en: { label: "Observe", desc: "Notice something interesting in the world around you and ask a question about it.", example: "Example: 'Why do plants near the window grow faster?'" },
    kh: { label: "សង្កេត", desc: "កត់សំគាល់រឿងគួរឱ្យចាប់អារម្មណ៍នៅជុំវិញខ្លួន ហើយសួរសំណួរអំពីវា។", example: "ឧទាហរណ៍: 'ហេតុអ្វីដំណាំជិតបង្អួចលូតលាស់លឿន?'" },
    color: "#2563eb",
  },
  {
    id: 2,
    icon: HelpCircle,
    en: { label: "Question", desc: "Form a clear, specific question that your experiment will try to answer.", example: "Example: 'Does more sunlight make plants grow taller?'" },
    kh: { label: "សំណួរ", desc: "បង្កើតសំណួរច្បាស់លាស់ ដែលការពិសោធន៍នឹងព្យាយាមឆ្លើយ។", example: "ឧទាហរណ៍: 'តើពន្លឺថ្ងៃច្រើនជួយឱ្យដំណាំលូតលាស់ខ្ពស់ជាង?'" },
    color: "#7c3aed",
  },
  {
    id: 3,
    icon: Lightbulb,
    en: { label: "Hypothesis", desc: "An educated guess. A prediction based on what you already know, written as an 'If…then…' statement.", example: "Example: 'If a plant gets more sunlight, then it will grow taller.'" },
    kh: { label: "សម្មតិកម្ម", desc: "ការសន្មតដោយផ្អែកលើចំណេះដឹង។ ការព្យាករណ៍ដោយផ្អែកលើអ្វីដែលអ្នកដឹង។", example: "ឧទាហរណ៍: 'ប្រសិនបើដំណាំទទួលពន្លឺថ្ងៃច្រើន នោះវានឹងលូតលាស់ខ្ពស់ជាង។'" },
    color: "#d97706",
  },
  {
    id: 4,
    icon: FlaskConical,
    en: { label: "Experiment", desc: "Design and carry out a fair test. Change only ONE variable and keep everything else the same.", example: "Example: Grow two identical plants — one in sunlight, one in shadow." },
    kh: { label: "ពិសោធន៍", desc: "រចនា និងអនុវត្តការសាកល្បងត្រឹមត្រូវ។ ផ្លាស់ប្ដូរតែអថេរ​ MỘT​ ប៉ុណ្ណោះ។", example: "ឧទាហរណ៍: ដាំដំណាំដូចគ្នា​ ២​ ដើម — ម្ដងក្នុងពន្លឺ ម្ដងទៀតក្នុងម្លប់។" },
    color: "#059669",
  },
  {
    id: 5,
    icon: BarChart2,
    en: { label: "Analyse", desc: "Look at your results. Make charts or tables. Find patterns and decide what the data shows.", example: "Example: The sunlit plant grew 12 cm; the shaded plant grew 4 cm." },
    kh: { label: "វិភាគ", desc: "ពិនិត្យលទ្ធផល។ បង្កើតតារាង ឬក្រាហ្វ។ រកគំរូ ហើយសន្និដ្ឋានអំពីទិន្នន័យ។", example: "ឧទាហរណ៍: ដំណាំក្នុងពន្លឺលូតលាស់ ១២ ស.ម; ដំណាំក្នុងម្លប់លូតលាស់ ៤ ស.ម។" },
    color: "#dc2626",
  },
  {
    id: 6,
    icon: ClipboardList,
    en: { label: "Conclude", desc: "Did your results support your hypothesis? Share what you learned and suggest new questions.", example: "Example: 'More sunlight did cause faster growth. Next I will test water amount.'" },
    kh: { label: "សន្និដ្ឋាន", desc: "លទ្ធផលគាំទ្រសម្មតិកម្មរបស់អ្នកទេ? ចែករំលែកអ្វីដែលអ្នករៀនសូត្រ ហើយស្នើសំណួរថ្មី។", example: "ឧទាហរណ៍: 'ពន្លឺថ្ងៃច្រើន​ ជួយឱ្យដំណាំលូតលាស់លឿន។ បន្ទាប់ ខ្ញុំនឹងសាកល្បងជាមួយទឹក។'" },
    color: "#1A6EA8",
  },
];

// ── Fact vs Opinion Data ────────────────────────────────────────────────────

type Category = "fact" | "opinion" | null;

const STATEMENTS = [
  {
    en: "The sun is approximately 150 million km from Earth.",
    kh: "ព្រះអាទិត្យស្ថិតនៅប្រហែល ១៥០ លានគីឡូម៉ែត្រពីផែនដី។",
    correct: "fact" as const,
    explanationEn: "This is a measurable, verified scientific fact.",
    explanationKh: "នេះជាការពិតវិទ្យាសាស្ត្រដែលអាចវាស់បាន ហើយត្រូវបានផ្ទៀងផ្ទាត់។",
  },
  {
    en: "The sun is beautiful.",
    kh: "ព្រះអាទិត្យស្អាត។",
    correct: "opinion" as const,
    explanationEn: "Beauty is a personal feeling — it varies from person to person.",
    explanationKh: "សោភ័ណភាពជាអារម្មណ៍ផ្ទាល់ខ្លួន — ខុសគ្នាពីមនុស្សម្នាក់ទៅម្នាក់។",
  },
  {
    en: "Water boils at 100°C at sea level.",
    kh: "ទឹករំពុះនៅ ១០០°C នៅស្ថានភាពអ្នកទឹកសមុទ្រ។",
    correct: "fact" as const,
    explanationEn: "This is a repeatable, measurable scientific observation.",
    explanationKh: "នេះជាការសង្កេតវិទ្យាសាស្ត្រដែលអាចធ្វើម្ដងទៀត ហើយអាចវាស់បាន។",
  },
  {
    en: "Math is the hardest subject in school.",
    kh: "គណិតវិទ្យាជាមុខវិជ្ជាពិបាកបំផុតក្នុងសាលា។",
    correct: "opinion" as const,
    explanationEn: "This is a personal view — many students find other subjects harder.",
    explanationKh: "នេះជាទស្សនៈផ្ទាល់ខ្លួន — សិស្សជាច្រើនគិតថាមុខវិជ្ជាផ្សេងពិបាកជាង។",
  },
  {
    en: "Cambodia has more than 16 million people.",
    kh: "កម្ពុជាមានប្រជាជនជាង ១៦ លាននាក់។",
    correct: "fact" as const,
    explanationEn: "Population figures are counted and verified by census data.",
    explanationKh: "ចំនួនប្រជាជនត្រូវបានរាប់ ហើយផ្ទៀងផ្ទាត់ដោយទិន្នន័យជំរឿន។",
  },
  {
    en: "Khmer food is the best cuisine in the world.",
    kh: "ម្ហូបខ្មែរជាម្ហូបល្អបំផុតក្នុងលោក។",
    correct: "opinion" as const,
    explanationEn: "Food preference is subjective — it differs by culture and taste.",
    explanationKh: "ការចូលចិត្តម្ហូបជាចំណូលចិត្តផ្ទាល់ — ខុសគ្នាតាមវប្បធម៌ និងរសជាតិ។",
  },
];

// ── Tools Data ──────────────────────────────────────────────────────────────

const TOOLS = [
  {
    number: 1,
    icon: Search,
    color: "#1A6EA8",
    bg: "#e8f2fb",
    en: {
      name: "Source Check",
      question: "Who is saying this?",
      desc: "Find out who created the information. Is it a scientist, a doctor, a government body — or an unknown account? Trustworthy sources show their evidence and identity.",
      tip: "Look for: credentials, organisation name, date published.",
    },
    kh: {
      name: "ពិនិត្យប្រភព",
      question: "តើអ្នកណាជាអ្នកនិយាយ?",
      desc: "ស្វែងយល់ថាអ្នកណាបង្កើតព័ត៌មាននេះ។ តើវាជាអ្នកវិទ្យាសាស្ត្រ វេជ្ជបណ្ឌិត ស្ថាប័នរដ្ឋ — ឬគណនីដែលមិនស្គាល់? ប្រភពដែលអាចទុកចិត្តបានបង្ហាញភស្តុតាង និងអត្តសញ្ញាណ។",
      tip: "ស្វែងរក: សញ្ញាបត្រ ឈ្មោះស្ថាប័ន កាលបរិច្ឆេទផ្សព្វផ្សាយ។",
    },
  },
  {
    number: 2,
    icon: ShieldCheck,
    color: "#059669",
    bg: "#e6f7f1",
    en: {
      name: "Evidence Check",
      question: "What proof is there?",
      desc: "Strong claims need strong evidence. Look for studies, data, or direct sources. If someone makes a big claim but shows no evidence, be very careful.",
      tip: "Ask: Where is the data? Can I find the original study? Does more than one source agree?",
    },
    kh: {
      name: "ពិនិត្យភស្តុតាង",
      question: "តើមានភស្តុតាងអ្វីខ្លះ?",
      desc: "ការអះអាងខ្លាំងត្រូវការភស្តុតាងខ្លាំង។ ស្វែងរកការសិក្សា ទិន្នន័យ ឬប្រភពដើម។ ប្រសិនបើនរណាម្នាក់អះអាងខ្លាំងប៉ុន្តែគ្មានភស្តុតាង សូមប្រុងប្រយ័ត្ន។",
      tip: "សួរ: តើទិន្នន័យនៅឯណា? តើខ្ញុំអាចរកការសិក្សាដើមបានទេ? តើប្រភពច្រើនជាងមួយយល់ព្រមទេ?",
    },
  },
  {
    number: 3,
    icon: AlertTriangle,
    color: "#d97706",
    bg: "#fef3e2",
    en: {
      name: "Bias Check",
      question: "What are they trying to sell me?",
      desc: "Everyone has a point of view. Ask whether the person sharing information benefits from you believing it. Bias does not always mean lying — but it shapes how information is presented.",
      tip: "Watch for: emotional language, missing context, one-sided stories, ads disguised as news.",
    },
    kh: {
      name: "ពិនិត្យឥទ្ធិពល",
      question: "តើពួកគេចង់លក់អ្វីមកឱ្យខ្ញុំ?",
      desc: "មនុស្សគ្រប់រូបមានទស្សនៈ។ សួរថាតើអ្នកចែករំលែកព័ត៌មានទទួលអត្ថប្រយោជន៍ ប្រសិនបើអ្នកជឿ។ ឥទ្ធិពលមិនតែងតែមានន័យថាបោកប្រាស់ — ប៉ុន្តែវាប៉ះពាល់ដល់របៀបផ្ដល់ព័ត៌មាន។",
      tip: "ចំណាំ: ភាសាដែលមានអារម្មណ៍ ខ្លឹមសារដែលខ្វះ ការនិទានរឿងម្ខាងតែប៉ុណ្ណោះ ការផ្សាយពាណិជ្ជកម្មក្លែងធ្វើជាព័ត៌មាន។",
    },
  },
];

// ── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  const t = useTranslation();
  return (
    <div
      style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 0",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3">
          <FlaskConical className="w-4 h-4 flex-shrink-0" style={{ color: "#1A6EA8" }} />
          <div className="flex-1 h-2.5 rounded-full" style={{ background: "#e5e7eb" }}>
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${value}%`, background: "linear-gradient(90deg, #1A6EA8, #059669)" }}
            />
          </div>
          <span className="text-xs font-bold whitespace-nowrap" style={{ color: "#1A6EA8" }}>
            {t("Clear Logic", "តក្កវិជ្ជាច្បាស់")} {Math.round(value)}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Scientific Method Section ───────────────────────────────────────────────

function ScientificMethodSection({ onProgress }: { onProgress: (pts: number) => void }) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  function handleClick(id: number) {
    const newSeen = new Set(seen);
    if (!newSeen.has(id)) {
      newSeen.add(id);
      setSeen(newSeen);
      onProgress(Math.round((newSeen.size / STEPS.length) * 33));
    }
    setActive(active === id ? null : id);
  }

  const activeStep = STEPS.find((s) => s.id === active);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#e8f2fb" }}>
          <FlaskConical className="w-5 h-5" style={{ color: "#1A6EA8" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#1A6EA8" }}>
            {kh ? "វដ្ដនៃវិធីសាស្ត្រវិទ្យាសាស្ត្រ" : "The Scientific Method Cycle"}
          </h2>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            {kh ? "ចុចនៅលើជំហានដើម្បីស្វែងយល់" : "Click each step to explore it"}
          </p>
        </div>
      </div>

      {/* Cycle grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = active === step.id;
          const isSeen = seen.has(step.id);
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleClick(step.id)}
              style={{
                background: isActive ? step.color : "white",
                color: isActive ? "white" : "#111",
                border: `2px solid ${isActive ? step.color : isSeen ? step.color + "60" : "#e5e7eb"}`,
                borderRadius: "14px",
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ background: isActive ? "rgba(255,255,255,0.25)" : step.color + "18" }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? "white" : step.color }} />
              </div>
              <div
                className="text-xs font-bold mb-0.5"
                style={{ color: isActive ? "white" : step.color }}
              >
                {kh ? `ជំហាន ${step.id}` : `Step ${step.id}`}
              </div>
              <div className={`text-sm font-semibold ${kh ? "font-khmer" : ""}`}>
                {kh ? step.kh.label : step.en.label}
              </div>
              {isSeen && !isActive && (
                <CheckCircle2
                  className="w-4 h-4 absolute top-2 right-2"
                  style={{ color: step.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {activeStep && (
        <div
          className="mt-5 rounded-2xl p-5"
          style={{
            background: "white",
            border: `2px solid ${activeStep.color}30`,
            borderLeft: `5px solid ${activeStep.color}`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <activeStep.icon className="w-5 h-5" style={{ color: activeStep.color }} />
            <h3 className={`font-bold text-lg ${kh ? "font-khmer" : ""}`} style={{ color: activeStep.color }}>
              {kh ? activeStep.kh.label : activeStep.en.label}
            </h3>
          </div>
          <p className={`text-sm leading-relaxed mb-3 ${kh ? "font-khmer" : ""}`} style={{ color: "#374151" }}>
            {kh ? activeStep.kh.desc : activeStep.en.desc}
          </p>
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{ background: activeStep.color + "10", color: activeStep.color }}
          >
            <span className={`font-semibold ${kh ? "font-khmer" : ""}`}>
              {kh ? activeStep.kh.example : activeStep.en.example}
            </span>
          </div>
          {/* Bilingual badge */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: activeStep.color + "18", color: activeStep.color }}>
              {activeStep.en.label}
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-semibold font-khmer" style={{ background: activeStep.color + "18", color: activeStep.color }}>
              {activeStep.kh.label}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Fact vs Opinion Section ─────────────────────────────────────────────────

function FactOpinionSection({ onProgress }: { onProgress: (pts: number) => void }) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [answers, setAnswers] = useState<Record<number, Category>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [correct, setCorrect] = useState(0);

  function answer(idx: number, choice: "fact" | "opinion") {
    if (revealed.has(idx)) return;
    const isCorrect = choice === STATEMENTS[idx].correct;
    setAnswers((prev) => ({ ...prev, [idx]: choice }));
    const newRevealed = new Set(revealed);
    newRevealed.add(idx);
    setRevealed(newRevealed);
    const newCorrect = correct + (isCorrect ? 1 : 0);
    setCorrect(newCorrect);
    onProgress(Math.round((newRevealed.size / STATEMENTS.length) * 33));
  }

  function reset() {
    setAnswers({});
    setRevealed(new Set());
    setCorrect(0);
    onProgress(0);
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#fef3e2" }}>
            <Lightbulb className="w-5 h-5" style={{ color: "#d97706" }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#d97706" }}>
              {kh ? "ការពិត ឬ មតិ?" : "Fact or Opinion?"}
            </h2>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              {kh ? "ចុចប៊ូតុងដើម្បីចាត់ប្រភេទ" : "Click a button to categorise each statement"}
            </p>
          </div>
        </div>
        {revealed.size > 0 && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-colors"
            style={{ background: "#fef3e2", color: "#d97706", border: "1px solid #d9770630" }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {kh ? "ចាប់ផ្ដើមម្ដងទៀត" : "Try again"}
          </button>
        )}
      </div>

      {revealed.size === STATEMENTS.length && (
        <div
          className="mb-4 rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2"
          style={{ background: correct >= 5 ? "#e6f7f1" : "#fef3e2", color: correct >= 5 ? "#059669" : "#d97706" }}
        >
          <CheckCircle2 className="w-4 h-4" />
          {kh
            ? `អ្នកទទួលបាន ${correct}/${STATEMENTS.length} ត្រឹមត្រូវ!`
            : `You got ${correct}/${STATEMENTS.length} correct!`}
        </div>
      )}

      <div className="flex flex-col gap-3 mt-4">
        {STATEMENTS.map((stmt, idx) => {
          const chosen = answers[idx];
          const isRevealed = revealed.has(idx);
          const isCorrect = chosen === stmt.correct;

          return (
            <div
              key={idx}
              className="rounded-2xl p-4"
              style={{
                background: isRevealed
                  ? isCorrect
                    ? "#e6f7f1"
                    : "#fef2f2"
                  : "white",
                border: `1.5px solid ${isRevealed ? (isCorrect ? "#059669" : "#dc2626") + "50" : "#e5e7eb"}`,
                transition: "all 0.2s",
              }}
            >
              <p className={`text-sm font-medium mb-3 leading-relaxed ${kh ? "font-khmer" : ""}`} style={{ color: "#111827" }}>
                {kh ? stmt.kh : stmt.en}
              </p>

              {!isRevealed ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => answer(idx, "fact")}
                    className="flex-1 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
                    style={{ background: "#e8f2fb", color: "#1A6EA8", border: "none" }}
                  >
                    {kh ? "ការពិត" : "Fact"}
                  </button>
                  <button
                    type="button"
                    onClick={() => answer(idx, "opinion")}
                    className="flex-1 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
                    style={{ background: "#fef3e2", color: "#d97706", border: "none" }}
                  >
                    {kh ? "មតិ" : "Opinion"}
                  </button>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  {isCorrect
                    ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#059669" }} />
                    : <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#dc2626" }} />}
                  <div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full mr-2"
                      style={{
                        background: stmt.correct === "fact" ? "#e8f2fb" : "#fef3e2",
                        color: stmt.correct === "fact" ? "#1A6EA8" : "#d97706",
                      }}
                    >
                      {stmt.correct === "fact"
                        ? (kh ? "ការពិត" : "Fact")
                        : (kh ? "មតិ" : "Opinion")}
                    </span>
                    <span className={`text-xs leading-relaxed ${kh ? "font-khmer" : ""}`} style={{ color: "#374151" }}>
                      {kh ? stmt.explanationKh : stmt.explanationEn}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Critical Thinking Toolbox ───────────────────────────────────────────────

function ToolboxSection({ onProgress }: { onProgress: (pts: number) => void }) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [open, setOpen] = useState<number | null>(null);
  const [used, setUsed] = useState<Set<number>>(new Set());

  function toggle(n: number) {
    const newUsed = new Set(used);
    if (!newUsed.has(n)) {
      newUsed.add(n);
      setUsed(newUsed);
      onProgress(Math.round((newUsed.size / TOOLS.length) * 34));
    }
    setOpen(open === n ? null : n);
  }

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#e8f2fb" }}>
          <ShieldCheck className="w-5 h-5" style={{ color: "#1A6EA8" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#111827" }}>
            {kh ? "ប្រអប់ឧបករណ៍ «គិតពិចារណាឱ្យច្បាស់»" : "The \"Critical Thinking\" Toolbox"}
          </h2>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            {kh ? "ឧបករណ៍ ៣ ដើម្បីប្រើប្រាស់នៅពេលអ្នកឃើញព័ត៌មានលើអ៊ីនធឺណិត" : "3 tools to use whenever you see news online"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isOpen = open === tool.number;
          const isUsed = used.has(tool.number);
          const data = kh ? tool.kh : tool.en;

          return (
            <div
              key={tool.number}
              className="rounded-2xl overflow-hidden"
              style={{ border: `2px solid ${isOpen ? tool.color + "60" : "#e5e7eb"}`, background: "white", transition: "border-color 0.2s" }}
            >
              <button
                type="button"
                onClick={() => toggle(tool.number)}
                className="w-full flex items-center gap-4 p-4 text-left"
                style={{ background: isOpen ? tool.bg : "white", transition: "background 0.2s" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isOpen ? tool.color : tool.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: isOpen ? "white" : tool.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: tool.color + "18", color: tool.color }}>
                      {kh ? `ឧបករណ៍ ${tool.number}` : `Tool ${tool.number}`}
                    </span>
                    {isUsed && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: tool.color }} />}
                  </div>
                  <p className={`font-bold text-sm mt-0.5 ${kh ? "font-khmer" : ""}`} style={{ color: "#111827" }}>
                    {data.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${kh ? "font-khmer" : ""}`} style={{ color: tool.color, fontStyle: "italic" }}>
                    {data.question}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200"
                  style={{ background: tool.color + "18", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <span style={{ color: tool.color, fontWeight: "bold", fontSize: "14px" }}>›</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2" style={{ borderTop: `1px solid ${tool.color}20` }}>
                  <p className={`text-sm leading-relaxed mb-4 ${kh ? "font-khmer" : ""}`} style={{ color: "#374151" }}>
                    {data.desc}
                  </p>
                  <div
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{ background: tool.bg, border: `1px dashed ${tool.color}50` }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide mr-2" style={{ color: tool.color }}>
                      {kh ? "គន្លឹះ:" : "Tip:"}
                    </span>
                    <span className={`text-sm ${kh ? "font-khmer" : ""}`} style={{ color: "#374151" }}>
                      {data.tip}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────

export function ScientificLiteracyPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [methodPts, setMethodPts] = useState(0);
  const [quizPts, setQuizPts] = useState(0);
  const [toolPts, setToolPts] = useState(0);

  const total = Math.min(100, methodPts + quizPts + toolPts);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <ProgressBar value={total} />

      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background: "linear-gradient(135deg, #1A6EA8 0%, #134f7a 100%)",
          color: "white",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
              <FlaskConical className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                Scientific Literacy: Your Guide to Truth
              </h1>
              <p className={`text-base mt-0.5 opacity-90 font-khmer`}>
                ចំណេះដឹងវិទ្យាសាស្ត្រ៖ ការណែនាំរបស់អ្នកចំពោះការពិត
              </p>
            </div>
          </div>
          <p className={`text-sm sm:text-base leading-relaxed opacity-85 max-w-2xl ${kh ? "font-khmer" : ""}`}>
            {kh
              ? "ទំព័រនេះនឹងជួយអ្នករៀនពីរបៀបគិតដូចអ្នកវិទ្យាសាស្ត្រ — ការបែងចែករវាងការពិតនិងមតិ ការពិនិត្យប្រភព និងការការពារខ្លួនអ្នកប្រឆាំងនឹងព័ត៌មានមិនត្រឹមត្រូវ។"
              : "This page will help you think like a scientist — separating fact from opinion, checking sources, and protecting yourself from misinformation."}
          </p>

          {/* Progress pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { labelEn: "Scientific Method", labelKh: "វិធីសាស្ត្រវិទ្យាសាស្ត្រ", pts: methodPts, max: 33, color: "#60a5fa" },
              { labelEn: "Fact vs Opinion", labelKh: "ការពិត ឬ មតិ", pts: quizPts, max: 33, color: "#86efac" },
              { labelEn: "Thinking Tools", labelKh: "ឧបករណ៍គិតពិចារណា", pts: toolPts, max: 34, color: "#fcd34d" },
            ].map((item) => (
              <div
                key={item.labelEn}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.pts > 0 ? item.color : "rgba(255,255,255,0.4)" }}
                />
                <span className={kh ? "font-khmer" : ""}>{kh ? item.labelKh : item.labelEn}</span>
                {item.pts >= item.max && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: item.color }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ScientificMethodSection onProgress={setMethodPts} />
        <FactOpinionSection onProgress={setQuizPts} />
        <ToolboxSection onProgress={setToolPts} />

        {/* Completion banner */}
        {total >= 90 && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "linear-gradient(135deg, #e6f7f1, #e8f2fb)" }}
          >
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: "#059669" }} />
            <h3 className={`text-lg font-bold mb-1 ${kh ? "font-khmer" : ""}`} style={{ color: "#059669" }}>
              {kh ? "ល្អណាស់! អ្នកបានបញ្ចប់ការណែនាំ!" : "Excellent! You've completed the guide!"}
            </h3>
            <p className={`text-sm ${kh ? "font-khmer" : ""}`} style={{ color: "#374151" }}>
              {kh
                ? "ឥឡូវនេះ អ្នកមានឧបករណ៍ដើម្បីចែកចាយការពិត នៅក្នុងលោកឌីជីថល។"
                : "You now have the tools to navigate truth in the digital world."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
