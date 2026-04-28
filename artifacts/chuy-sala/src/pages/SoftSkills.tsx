import { Link } from "wouter";
import {
  ArrowLeft,
  Handshake,
  Wrench,
  Bot,
  Sparkles,
  MessageCircle,
  Users,
  Compass,
  Heart,
  Lightbulb,
  Ear,
  Quote,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Soft Skills: The Invisible Tools · ជំនាញទន់៖ ឧបករណ៍មើលមិនឃើញ
//
//  Warm, human-centric: sunrise yellows + calming blues, rounded soft cards.
//  Two sections:
//    1. Hard vs Soft Skills (side-by-side comparison)
//    2. The Core Four (2x2 grid)
//  Strictly bilingual EN + KH for every term and definition.
// ════════════════════════════════════════════════════════════════════════════

type CoreSkill = {
  id: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  emoji: string;
  // visible accent palette for this card
  palette: {
    border: string;
    glow: string;
    iconBg: string;
    iconText: string;
    chip: string;
    accentText: string;
  };
  titleEn: string;
  titleKh: string;
  taglineEn: string;
  taglineKh: string;
  definitionEn: string;
  definitionKh: string;
  exampleEn: string;
  exampleKh: string;
};

const CORE_FOUR: CoreSkill[] = [
  {
    id: "communication",
    icon: MessageCircle,
    emoji: "🗣️",
    palette: {
      border: "border-sky-300/40",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.18)]",
      iconBg: "bg-sky-500/15",
      iconText: "text-sky-600 dark:text-sky-300",
      chip: "bg-sky-100/80 text-sky-800 border-sky-300 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/40",
      accentText: "text-sky-700 dark:text-sky-300",
    },
    titleEn: "Communication",
    titleKh: "ការប្រាស្រ័យទាក់ទង",
    taglineEn: "Listening to understand — not waiting to speak.",
    taglineKh: "ស្ដាប់ដើម្បីយល់ — មិនមែនរង់ចាំដើម្បីនិយាយ។",
    definitionEn:
      "Communication isn't just talking. The harder half is listening — really listening, with your eyes and your full attention, instead of mentally rehearsing your reply while the other person is still speaking. The best communicators ask one more question before they answer.",
    definitionKh:
      "ការប្រាស្រ័យទាក់ទងមិនមែនគ្រាន់តែជាការនិយាយទេ។ ផ្នែកដែលពិបាកជាងគេគឺការស្ដាប់ — ស្ដាប់យ៉ាងពិតប្រាកដ ដោយប្រើភ្នែក និងការផ្ដោតពេញលេញ ជំនួសឱ្យការហ្វឹកហាត់ចម្លើយក្នុងចិត្ត ខណៈពេលដែលគេនៅនិយាយ។ អ្នកប្រាស្រ័យទាក់ទងល្អបំផុត តែងតែសួរសំណួរមួយបន្ថែមមុនពេលឆ្លើយ។",
    exampleEn:
      "When a friend tells you about a hard day, before you give advice, ask: \"Do you want my opinion, or do you just want me to listen?\" That single question is a soft-skills superpower.",
    exampleKh:
      "នៅពេលមិត្តភក្ដិប្រាប់អ្នកអំពីថ្ងៃលំបាក មុនពេលអ្នកផ្ដល់ដំបូន្មាន សូមសួរថា៖ «តើអ្នកចង់បានយោបល់ខ្ញុំ ឬគ្រាន់តែចង់ឱ្យខ្ញុំស្ដាប់?» សំណួរតែមួយនេះ គឺជាមហាអំណាចនៃជំនាញទន់។",
  },
  {
    id: "teamwork",
    icon: Users,
    emoji: "🤝",
    palette: {
      border: "border-amber-300/50",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.18)]",
      iconBg: "bg-amber-500/15",
      iconText: "text-amber-600 dark:text-amber-300",
      chip: "bg-amber-100/80 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/40",
      accentText: "text-amber-700 dark:text-amber-300",
    },
    titleEn: "Teamwork",
    titleKh: "ការធ្វើការងារជាក្រុម",
    taglineEn: "Sharing the load — and sharing the lead.",
    taglineKh: "ចែករំលែកបន្ទុក — និងចែករំលែកការដឹកនាំ។",
    definitionEn:
      "Teamwork is more than dividing tasks. It's knowing when to step forward and lead, and — just as important — knowing when to step back and let someone else lead. A good teammate makes the people around them look good, not just themselves.",
    definitionKh:
      "ការធ្វើការងារជាក្រុមមានន័យច្រើនជាងការចែកការងារ។ វាគឺជាការដឹងថាពេលណាត្រូវឈានទៅមុខ ហើយដឹកនាំ — ហើយសំខាន់ដូចគ្នា — ការដឹងថាពេលណាត្រូវថយក្រោយ ហើយឱ្យអ្នកដទៃដឹកនាំវិញ។ មិត្តរួមក្រុមដ៏ល្អ ធ្វើឱ្យមនុស្សជុំវិញខ្លួនមើលទៅល្អ មិនមែនត្រឹមតែខ្លួនឯងទេ។",
    exampleEn:
      "In a school project, the strongest writer isn't always the best leader. The best leader is the one who notices the quiet teammate has a brilliant idea and gives them the floor to share it.",
    exampleKh:
      "ក្នុងគម្រោងសាលា អ្នកសរសេរខ្លាំងបំផុតមិនមែនជាអ្នកដឹកនាំល្អបំផុតជានិច្ចទេ។ អ្នកដឹកនាំល្អបំផុតគឺ អ្នកដែលកត់សម្គាល់ឃើញថាមិត្តរួមក្រុមស្ងៀមមានគំនិតដ៏អស្ចារ្យ ហើយផ្ដល់ឱកាសឱ្យគាត់ចែករំលែកវា។",
  },
  {
    id: "adaptability",
    icon: Compass,
    emoji: "🧭",
    palette: {
      border: "border-orange-300/50",
      glow: "shadow-[0_0_30px_rgba(251,146,60,0.18)]",
      iconBg: "bg-orange-500/15",
      iconText: "text-orange-600 dark:text-orange-300",
      chip: "bg-orange-100/80 text-orange-800 border-orange-300 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/40",
      accentText: "text-orange-700 dark:text-orange-300",
    },
    titleEn: "Adaptability",
    titleKh: "ភាពបត់បែន",
    taglineEn: "Stay calm when the map doesn't match the territory.",
    taglineKh: "នៅស្ងប់ស្ងាត់នៅពេលផែនទីមិនត្រូវនឹងទឹកដី។",
    definitionEn:
      "Plans fail all the time. The bus is late. The internet goes down. Your teacher changes the assignment the night before. Adaptability is the ability to take a breath, accept the new reality, and find a new way forward — fast — without panicking. The plan is the servant; the goal is the master.",
    definitionKh:
      "គម្រោងបរាជ័យជានិច្ច។ ឡានក្រុងយឺត។ អ៊ីនធឺណិតដាច់។ លោកគ្រូប្ដូរកិច្ចការនៅយប់មុនថ្ងៃប្រគល់។ ភាពបត់បែន គឺជាសមត្ថភាពដកដង្ហើមធំ ទទួលយកការពិតថ្មី ហើយរកផ្លូវថ្មីទៅមុខ — យ៉ាងលឿន — ដោយមិនភ័យស្លន់ស្លោ។ គម្រោងគឺជាអ្នកបម្រើ។ គោលដៅគឺជាម្ចាស់។",
    exampleEn:
      "Your group practiced a presentation for two weeks. Five minutes before, the projector dies. The adaptable student doesn't freeze — they hand out a paper outline, smile, and present without slides. The audience remembers the calm, not the missing PowerPoint.",
    exampleKh:
      "ក្រុមរបស់អ្នកបានហ្វឹកហាត់ការបង្ហាញរយៈពេលពីរសប្ដាហ៍។ ៥ នាទីមុនចាប់ផ្ដើម គម្រោងបង្ហាញ (projector) ខូច។ សិស្សដែលបត់បែនមិនរឹងស្ទាស់ទេ — គេចែកក្រដាសសង្ខេបចេញ ញញឹម ហើយបង្ហាញដោយគ្មានស្លាយ។ អ្នកស្ដាប់ចងចាំភាពស្ងប់ស្ងាត់ មិនមែនការបាត់ស្លាយ PowerPoint ទេ។",
  },
  {
    id: "emotional-intelligence",
    icon: Heart,
    emoji: "💗",
    palette: {
      border: "border-rose-300/50",
      glow: "shadow-[0_0_30px_rgba(244,114,182,0.18)]",
      iconBg: "bg-rose-500/15",
      iconText: "text-rose-600 dark:text-rose-300",
      chip: "bg-rose-100/80 text-rose-800 border-rose-300 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/40",
      accentText: "text-rose-700 dark:text-rose-300",
    },
    titleEn: "Emotional Intelligence",
    titleKh: "បញ្ញាស្មារតី",
    taglineEn: "Take the breath before you take the action.",
    taglineKh: "ដកដង្ហើមជាមុន មុនពេលធ្វើសកម្មភាព។",
    definitionEn:
      "Emotional intelligence has two halves. First: noticing your own feelings as they happen — recognizing 'I am angry right now' before the words leave your mouth. Second: noticing other people's feelings — seeing that your friend is quiet because they are sad, not because they are bored. The simplest practice in the world: one deep breath before reacting in anger.",
    definitionKh:
      "បញ្ញាស្មារតីមានពីរផ្នែក។ ទីមួយ៖ កត់សម្គាល់អារម្មណ៍ខ្លួនឯងពេលវាកើតឡើង — ទទួលស្គាល់ថា «ខ្ញុំកំពុងខឹងឥឡូវនេះ» មុនពាក្យចេញពីមាត់។ ទីពីរ៖ កត់សម្គាល់អារម្មណ៍អ្នកដទៃ — មើលឃើញថាមិត្តភក្ដិរបស់អ្នកស្ងៀម ដោយព្រោះគេពិបាកចិត្ត មិនមែនព្រោះគេធុញទ្រាន់នោះទេ។ ការអនុវត្តងាយបំផុតលើលោក៖ ដកដង្ហើមធំមួយ មុនពេលឆ្លើយតបក្នុងកំហឹង។",
    exampleEn:
      "Your sibling breaks something of yours. The first emotion is anger. Emotional intelligence is the 3-second pause where you ask: 'Was it on purpose, or was it an accident?' before you raise your voice. That tiny pause has saved a million friendships.",
    exampleKh:
      "បងប្អូនរបស់អ្នកធ្វើខូចរបស់អ្នកមួយ។ អារម្មណ៍ដំបូងគឺកំហឹង។ បញ្ញាស្មារតី គឺជាការផ្អាក ៣ វិនាទី ដែលអ្នកសួរខ្លួនឯងថា៖ «តើគេធ្វើដោយចេតនា ឬជាគ្រោះថ្នាក់?» មុនពេលអ្នកបញ្ចេញសំឡេងខ្លាំង។ ការផ្អាកតូចមួយនោះ បានរក្សាមិត្តភាពរាប់លាន។",
  },
];

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════
export default function SoftSkills() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* ── Back to Home ───────────────────────────────────────────── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className={kh ? "font-khmer" : ""}>
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </span>
        </Link>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="relative rounded-3xl border border-amber-200/60 dark:border-amber-500/20 overflow-hidden mb-10 bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 dark:from-amber-900/30 dark:via-slate-900 dark:to-sky-900/20 p-6 sm:p-10 shadow-sm">
          {/* soft sun watermark */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-500/20 dark:to-orange-500/10 blur-2xl opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full bg-gradient-to-br from-sky-200 to-blue-200 dark:from-sky-500/15 dark:to-blue-500/10 blur-2xl opacity-70"
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.25em] rounded px-2 py-0.5 border bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/40 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {t("Well-being · Human Skills", "សុខុមាលភាព · ជំនាញរបស់មនុស្ស")}
              </span>
              <Handshake
                className="w-5 h-5 text-amber-600 dark:text-amber-300"
                aria-hidden="true"
              />
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-sky-600 dark:from-amber-300 dark:via-orange-300 dark:to-sky-300 bg-clip-text text-transparent ${kh ? "font-khmer leading-snug" : ""}`}
            >
              {t(
                "🤝 Soft Skills: The Invisible Tools",
                "🤝 ជំនាញទន់៖ ឧបករណ៍មើលមិនឃើញ"
              )}
            </h1>
            <p
              className={`mt-2 text-lg sm:text-xl text-slate-700 dark:text-slate-200 ${kh ? "font-khmer" : "font-khmer"}`}
            >
              {kh
                ? "🤝 Soft Skills: The Invisible Tools"
                : "🤝 ជំនាញទន់៖ ឧបករណ៍មើលមិនឃើញ"}
            </p>

            <p
              className={`mt-5 max-w-2xl text-base sm:text-lg text-slate-700 dark:text-slate-300 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "These are the tools nobody can see in your backpack. You won't get a grade for them, you can't put them on a test answer sheet — but they decide whether people want to work with you, learn from you, and trust you. They are quietly the most valuable things you will ever practice.",
                "ទាំងនេះគឺជាឧបករណ៍ដែលគ្មាននរណាម្នាក់មើលឃើញនៅក្នុងកាបូបស្ពាយរបស់អ្នកទេ។ អ្នកនឹងមិនបានពិន្ទុសម្រាប់វា អ្នកមិនអាចដាក់វានៅលើក្រដាសប្រឡងទេ — ប៉ុន្តែវាសម្រេចថាតើមនុស្សចង់ធ្វើការជាមួយអ្នក រៀនពីអ្នក និងជឿទុកចិត្តអ្នកដែរឬទេ។ ដោយស្ងាត់ៗ ពួកវាគឺជារបស់ដ៏មានតម្លៃបំផុតដែលអ្នកនឹងហ្វឹកហាត់នៅក្នុងជីវិត។"
              )}
            </p>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1 · Hard Skills vs Soft Skills
        ════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hard-vs-soft-heading"
          className="mb-12"
          data-testid="section-hard-vs-soft"
        >
          <SectionEyebrow
            number="01"
            labelEn="The Difference"
            labelKh="ភាពខុសគ្នា"
          />
          <h2
            id="hard-vs-soft-heading"
            className={`text-2xl sm:text-3xl font-extrabold mt-2 mb-1 text-slate-900 dark:text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {t(
              "Hard Skills vs. Soft Skills",
              "ជំនាញរឹង និងជំនាញទន់"
            )}
          </h2>
          <p
            className={`text-base text-slate-600 dark:text-slate-400 mb-6 ${kh ? "font-khmer" : "font-khmer"}`}
          >
            {kh
              ? "Hard Skills vs. Soft Skills"
              : "ជំនាញរឹង និងជំនាញទន់"}
          </p>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* HARD SKILLS card */}
            <article
              className="rounded-3xl border-2 border-slate-300/60 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 p-6 sm:p-7 backdrop-blur-sm"
              data-testid="card-hard-skills"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-200/80 dark:bg-slate-700/50 flex items-center justify-center">
                  <Wrench
                    className="w-6 h-6 text-slate-700 dark:text-slate-200"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    {t("Hard Skills", "ជំនាញរឹង")}
                  </div>
                  <h3
                    className={`text-xl font-bold text-slate-900 dark:text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
                  >
                    {t("WHAT you do", "អ្វី ដែលអ្នកធ្វើ")}
                  </h3>
                  <p className={`text-sm text-slate-500 dark:text-slate-400 ${kh ? "" : "font-khmer"}`}>
                    {kh ? "WHAT you do" : "អ្វី ដែលអ្នកធ្វើ"}
                  </p>
                </div>
              </div>

              <p
                className={`text-base text-slate-700 dark:text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Things you can measure on a test or with a stopwatch. They are the technical skills that get the job done.",
                  "របស់ដែលអាចវាស់វែងបានលើការប្រឡង ឬដោយនាឡិកាកំណត់ម៉ោង។ ពួកវាជាជំនាញបច្ចេកទេសដែលបញ្ចប់ការងារ។"
                )}
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["Mathematics", "គណិតវិទ្យា", "🔢"],
                  ["Coding", "ការសរសេរកូដ", "💻"],
                  ["Fixing a car", "ការជួសជុលឡាន", "🔧"],
                  ["Speaking French", "ការនិយាយភាសាបារាំង", "🇫🇷"],
                ].map(([en, khm, emoji]) => (
                  <li
                    key={en}
                    className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <span aria-hidden="true">{emoji}</span>
                    <div>
                      <span>{en}</span>
                      <span className="font-khmer text-slate-500 dark:text-slate-400 ml-2">
                        ({khm})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-3">
                <Bot
                  className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p
                  className={`text-sm text-slate-600 dark:text-slate-300 ${kh ? "font-khmer leading-loose" : ""}`}
                >
                  {t(
                    "A machine can often do these — and it usually does them faster than you.",
                    "ម៉ាស៊ីនជារឿយៗ អាចធ្វើការទាំងនេះបាន — ហើយវាធ្វើបានលឿនជាងអ្នក។"
                  )}
                </p>
              </div>
            </article>

            {/* SOFT SKILLS card */}
            <article
              className="relative rounded-3xl border-2 border-amber-300/70 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-sky-50 dark:from-amber-900/20 dark:to-sky-900/20 p-6 sm:p-7 backdrop-blur-sm shadow-[0_0_40px_rgba(251,191,36,0.15)]"
              data-testid="card-soft-skills"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-200/80 dark:bg-amber-500/20 flex items-center justify-center">
                  <Handshake
                    className="w-6 h-6 text-amber-700 dark:text-amber-300"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">
                    {t("Soft Skills", "ជំនាញទន់")}
                  </div>
                  <h3
                    className={`text-xl font-bold text-slate-900 dark:text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
                  >
                    {t("HOW you do it", "របៀប ដែលអ្នកធ្វើវា")}
                  </h3>
                  <p className={`text-sm text-slate-500 dark:text-slate-400 ${kh ? "" : "font-khmer"}`}>
                    {kh ? "HOW you do it" : "របៀប ដែលអ្នកធ្វើវា"}
                  </p>
                </div>
              </div>

              <p
                className={`text-base text-slate-800 dark:text-slate-200 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "How you talk to people, how you solve a sudden problem, how you stay calm when everything goes wrong. They are about being human.",
                  "របៀបដែលអ្នកនិយាយជាមួយមនុស្ស របៀបដែលអ្នកដោះស្រាយបញ្ហាភ្លាមៗ របៀបដែលអ្នកនៅស្ងប់ស្ងាត់ពេលអ្វីៗចេញខុស។ ពួកវានិយាយអំពីការក្លាយជាមនុស្ស។"
                )}
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["Talking to people", "និយាយជាមួយមនុស្ស", "🗣️"],
                  ["Solving a sudden problem", "ដោះស្រាយបញ្ហាភ្លាមៗ", "💡"],
                  ["Staying calm under pressure", "នៅស្ងប់ក្រោមសម្ពាធ", "🧘"],
                  ["Reading the room", "យល់អារម្មណ៍មនុស្សជុំវិញ", "👀"],
                ].map(([en, khm, emoji]) => (
                  <li
                    key={en}
                    className="flex items-start gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <span aria-hidden="true">{emoji}</span>
                    <div>
                      <span className="font-medium">{en}</span>
                      <span className="font-khmer text-slate-600 dark:text-slate-300 ml-2">
                        ({khm})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-500/15 dark:to-orange-500/15 border border-amber-300/60 dark:border-amber-500/30 p-3">
                <Sparkles
                  className="w-5 h-5 text-amber-700 dark:text-amber-300 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p
                  className={`text-sm font-medium text-amber-900 dark:text-amber-100 ${kh ? "font-khmer leading-loose" : ""}`}
                >
                  {t(
                    "Machines cannot do these. This is your human advantage.",
                    "ម៉ាស៊ីនមិនអាចធ្វើការទាំងនេះបានទេ។ នេះគឺជា គុណសម្បត្តិមនុស្ស របស់អ្នក។"
                  )}
                </p>
              </div>
            </article>
          </div>

          {/* Bottom callout: the human advantage */}
          <div
            className="mt-6 rounded-3xl border border-sky-300/60 dark:border-sky-500/30 bg-gradient-to-r from-sky-50 to-amber-50 dark:from-sky-900/20 dark:to-amber-900/20 p-5 sm:p-6 flex items-start gap-4"
            data-testid="human-advantage-callout"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-sky-200/80 dark:bg-sky-500/20 flex items-center justify-center">
              <Lightbulb
                className="w-6 h-6 text-sky-700 dark:text-sky-300"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed">
                <strong>{t("The point:", "ចំណុចសំខាន់៖")}</strong>{" "}
                {t(
                  "A robot will probably be able to do the math homework one day. A robot will never be able to comfort a friend who is crying, calm down a frightened child, or persuade a room full of people to believe in an idea. THAT is what soft skills protect.",
                  "ថ្ងៃណាមួយ មនុស្សយន្ត ប្រហែលនឹងអាចធ្វើកិច្ចការផ្ទះគណិតវិទ្យាបាន។ ប៉ុន្តែមនុស្សយន្តនឹងមិនអាច លួងលោមមិត្តភក្ដិដែលកំពុងយំ ធ្វើឱ្យកុមារភ័យខ្លាចស្ងប់ស្ងាត់ ឬបញ្ចុះបញ្ចូលបន្ទប់ពេញដោយមនុស្សឱ្យជឿនឹងគំនិតមួយនោះទេ។ នេះហើយ គឺជាអ្វីដែល ជំនាញទន់ការពារ។"
                )}
              </p>
              <p
                className={`font-khmer text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-loose border-t border-sky-200/60 dark:border-sky-500/20 pt-2`}
              >
                <strong>ចំណុចសំខាន់៖</strong>{" "}
                ថ្ងៃណាមួយ មនុស្សយន្តប្រហែលនឹងអាចធ្វើកិច្ចការផ្ទះគណិតវិទ្យាបាន។ ប៉ុន្តែ មនុស្សយន្តនឹងមិនអាចលួងលោមមិត្តភក្ដិដែលកំពុងយំ ធ្វើឱ្យកុមារភ័យខ្លាចស្ងប់ស្ងាត់ ឬបញ្ចុះបញ្ចូលបន្ទប់ពេញដោយមនុស្សឱ្យជឿនឹងគំនិតមួយឡើយ។ នេះហើយ គឺជាអ្វីដែលជំនាញទន់ការពារ។
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 · The Core Four
        ════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="core-four-heading"
          className="mb-12"
          data-testid="section-core-four"
        >
          <SectionEyebrow
            number="02"
            labelEn="The Inner Toolkit"
            labelKh="ឧបករណ៍ខាងក្នុង"
          />
          <h2
            id="core-four-heading"
            className={`text-2xl sm:text-3xl font-extrabold mt-2 mb-1 text-slate-900 dark:text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {t("The Core Four", "ជំនាញគោលទាំងបួន")}
          </h2>
          <p
            className={`text-base text-slate-600 dark:text-slate-400 mb-6 ${kh ? "" : "font-khmer"}`}
          >
            {kh ? "The Core Four" : "ជំនាញគោលទាំងបួន"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {CORE_FOUR.map((skill, idx) => (
              <CoreSkillCard key={skill.id} skill={skill} index={idx} kh={kh} t={t} />
            ))}
          </div>
        </section>

        {/* ── Closing footer ──────────────────────────────────────────── */}
        <footer
          className="rounded-3xl border border-amber-200/70 dark:border-amber-500/20 bg-gradient-to-br from-amber-50 to-sky-50 dark:from-amber-900/15 dark:to-sky-900/15 p-6 sm:p-8 flex items-start gap-4"
          data-testid="closing-footer"
        >
          <Quote
            className="w-8 h-8 text-amber-500 dark:text-amber-300 flex-shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-3">
            <p
              className={`text-base sm:text-lg italic text-slate-800 dark:text-slate-100 leading-relaxed`}
            >
              "Hard skills will get you in the door. Soft skills will decide
              whether you stay in the room — and whether anyone wants you to
              come back tomorrow."
            </p>
            <p
              className={`font-khmer text-base sm:text-lg italic text-slate-800 dark:text-slate-100 leading-loose border-t border-amber-200/50 dark:border-amber-500/20 pt-3`}
            >
              «ជំនាញរឹងនឹងនាំអ្នកចូលទ្វារ។ ជំនាញទន់នឹងសម្រេចថា តើអ្នកនៅក្នុងបន្ទប់បានដែរឬទេ — និងថាតើមាននរណាម្នាក់ចង់ឱ្យអ្នកត្រឡប់មកម្ដងទៀតនៅថ្ងៃស្អែកដែរឬអត់។»
            </p>
            <p
              className={`text-sm text-slate-600 dark:text-slate-400 ${kh ? "font-khmer" : ""}`}
            >
              {t(
                "These tools are invisible — but everyone notices when they are missing. Practice them every day, in small ways. They compound like interest.",
                "ឧបករណ៍ទាំងនេះមើលមិនឃើញ — ប៉ុន្តែគ្រប់គ្នាកត់សម្គាល់នៅពេលវាបាត់។ ហ្វឹកហាត់វារាល់ថ្ងៃ ដោយរបៀបតូចៗ។ ពួកវាបន្ថែមដូចការប្រាក់។"
              )}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
//  Section eyebrow (numbered + bilingual label)
// ────────────────────────────────────────────────────────────────────────
function SectionEyebrow({
  number,
  labelEn,
  labelKh,
}: {
  number: string;
  labelEn: string;
  labelKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 text-white text-sm font-mono font-bold shadow-md">
        {number}
      </span>
      <span
        className={`text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      >
        {kh ? labelKh : labelEn}
      </span>
      <span
        className={`text-[10px] text-slate-400 dark:text-slate-500 ${kh ? "" : "font-khmer"}`}
      >
        · {kh ? labelEn : labelKh}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
//  Core Four card
// ────────────────────────────────────────────────────────────────────────
function CoreSkillCard({
  skill,
  index,
  kh,
  t,
}: {
  skill: CoreSkill;
  index: number;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const Icon = skill.icon;
  return (
    <article
      className={`relative rounded-3xl border-2 ${skill.palette.border} ${skill.palette.glow} bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-5 sm:p-6 transition-shadow hover:shadow-lg`}
      data-testid={`core-${skill.id}`}
    >
      {/* number tag */}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-mono font-bold border ${skill.palette.chip}`}
        >
          0{index + 1}
        </span>
      </div>

      {/* icon + title */}
      <div className="flex items-start gap-4 mb-4 pr-10">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${skill.palette.iconBg}`}
        >
          <Icon
            className={`w-7 h-7 ${skill.palette.iconText}`}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh ? skill.titleKh : skill.titleEn}
          </h3>
          <p
            className={`text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-0.5 ${kh ? "" : "font-khmer"}`}
          >
            {kh ? skill.titleEn : skill.titleKh}
          </p>
        </div>
      </div>

      {/* tagline */}
      <div className={`mb-4 pl-1 border-l-2 ${skill.palette.border} pl-3`}>
        <p
          className={`text-sm sm:text-base italic ${skill.palette.accentText}`}
        >
          {skill.taglineEn}
        </p>
        <p
          className={`text-sm sm:text-base italic font-khmer ${skill.palette.accentText} mt-1`}
        >
          {skill.taglineKh}
        </p>
      </div>

      {/* definition */}
      <div className="space-y-3">
        <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          {skill.definitionEn}
        </p>
        <p className="font-khmer text-base text-slate-700 dark:text-slate-200 leading-loose border-t border-slate-200 dark:border-slate-700/60 pt-3">
          {skill.definitionKh}
        </p>
      </div>

      {/* real-world example */}
      <div
        className={`mt-5 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 p-4`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Ear
            className="w-4 h-4 text-amber-600 dark:text-amber-300"
            aria-hidden="true"
          />
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            {t("In real life", "ក្នុងជីវិតពិត")}
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          {skill.exampleEn}
        </p>
        <p className="text-sm sm:text-base font-khmer text-slate-700 dark:text-slate-200 leading-loose mt-2 border-t border-amber-200/40 dark:border-slate-700/60 pt-2">
          {skill.exampleKh}
        </p>
      </div>
    </article>
  );
}
