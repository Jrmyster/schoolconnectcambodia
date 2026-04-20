import { useMemo, useState } from "react";
import {
  Flame, Sparkles, Calendar, RefreshCcw, Calculator, BookOpenText,
  FlaskConical, Cpu, Briefcase, Lightbulb,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
 * Daily Spark Challenge — បញ្ហាប្រឈមប្រចាំថ្ងៃ
 * A daily-rotating, bilingual flip-card brain teaser shown at the very
 * top of the homepage. The subject changes by day-of-week; the specific
 * question rotates weekly so returning students always see something new.
 * ────────────────────────────────────────────────────────────────────── */

type Subject = {
  id: string;
  labelEn: string; labelKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  glow: string;          // tailwind gradient classes for the glowing ring
  accent: string;        // chip background
  text: string;          // chip text color
  cardFront: string;     // tailwind gradient for card front
  cardBack: string;      // gradient for card back
};

type Challenge = {
  qEn: string; qKh: string;
  aEn: string; aKh: string;          // short answer
  explainEn: string; explainKh: string;
};

const SUBJECTS: Record<number, Subject> = {
  1: {
    id: "math",
    labelEn: "Math & Logic",
    labelKh: "គណិតវិទ្យា & តក្កវិជ្ជា",
    Icon: Calculator,
    glow: "from-sky-400 via-blue-500 to-indigo-600",
    accent: "bg-sky-100", text: "text-sky-900",
    cardFront: "from-sky-50 via-blue-50 to-indigo-100",
    cardBack: "from-indigo-100 via-blue-100 to-sky-50",
  },
  2: {
    id: "vocab",
    labelEn: "English Vocab",
    labelKh: "វាក្យសព្ទអង់គ្លេស",
    Icon: BookOpenText,
    glow: "from-rose-400 via-pink-500 to-fuchsia-600",
    accent: "bg-rose-100", text: "text-rose-900",
    cardFront: "from-rose-50 via-pink-50 to-fuchsia-100",
    cardBack: "from-fuchsia-100 via-pink-100 to-rose-50",
  },
  3: {
    id: "science",
    labelEn: "Science Fact",
    labelKh: "ការពិតវិទ្យាសាស្ត្រ",
    Icon: FlaskConical,
    glow: "from-emerald-400 via-teal-500 to-cyan-600",
    accent: "bg-emerald-100", text: "text-emerald-900",
    cardFront: "from-emerald-50 via-teal-50 to-cyan-100",
    cardBack: "from-cyan-100 via-teal-100 to-emerald-50",
  },
  4: {
    id: "tech",
    labelEn: "Tech & History",
    labelKh: "បច្ចេកវិទ្យា & ប្រវត្តិសាស្ត្រ",
    Icon: Cpu,
    glow: "from-violet-400 via-purple-500 to-indigo-600",
    accent: "bg-violet-100", text: "text-violet-900",
    cardFront: "from-violet-50 via-purple-50 to-indigo-100",
    cardBack: "from-indigo-100 via-purple-100 to-violet-50",
  },
  5: {
    id: "career",
    labelEn: "Career Focus",
    labelKh: "ផ្ដោតលើអាជីព",
    Icon: Briefcase,
    glow: "from-amber-400 via-orange-500 to-red-500",
    accent: "bg-amber-100", text: "text-amber-900",
    cardFront: "from-amber-50 via-orange-50 to-red-100",
    cardBack: "from-red-100 via-orange-100 to-amber-50",
  },
  // Saturday & Sunday share a "weekend" bonus — recycles the most popular
  // subject (math) but keeps the same friendly framing.
  6: {
    id: "weekend",
    labelEn: "Weekend Brain Boost",
    labelKh: "ពង្រឹងខួរក្បាលចុងសប្ដាហ៍",
    Icon: Lightbulb,
    glow: "from-yellow-400 via-amber-500 to-orange-500",
    accent: "bg-yellow-100", text: "text-yellow-900",
    cardFront: "from-yellow-50 via-amber-50 to-orange-100",
    cardBack: "from-orange-100 via-amber-100 to-yellow-50",
  },
  0: {
    id: "weekend",
    labelEn: "Weekend Brain Boost",
    labelKh: "ពង្រឹងខួរក្បាលចុងសប្ដាហ៍",
    Icon: Lightbulb,
    glow: "from-yellow-400 via-amber-500 to-orange-500",
    accent: "bg-yellow-100", text: "text-yellow-900",
    cardFront: "from-yellow-50 via-amber-50 to-orange-100",
    cardBack: "from-orange-100 via-amber-100 to-yellow-50",
  },
};

/* ── Question banks — keyed by subject.id, multiple per day ───────────── */
/* The 20 starter questions below were provided by the project — 4 per   */
/* weekday subject. They rotate weekly via the date-based picker.        */
const BANKS: Record<string, Challenge[]> = {
  math: [
    {
      qEn: "Solve: 2x + 5 = 15",
      qKh: "ដោះស្រាយសមីការ៖ 2x + 5 = 15",
      aEn: "x = 5",
      aKh: "x = 5",
      explainEn: "Subtract 5 from 15 to get 10, then divide by 2.",
      explainKh: "ដក 5 ចេញពី 15 ស្មើ 10 បន្ទាប់មកចែកនឹង 2។",
    },
    {
      qEn: "If a motorbike travels 60 km/h, how far does it go in 2.5 hours?",
      qKh: "បើម៉ូតូធ្វើដំណើរក្នុងល្បឿន 60 km/h តើវានឹងទៅដល់ចម្ងាយប៉ុន្មានក្នុងរយៈពេល 2.5 ម៉ោង?",
      aEn: "150 km",
      aKh: "150 គីឡូម៉ែត្រ",
      explainEn: "Distance = Speed × Time (60 × 2.5 = 150).",
      explainKh: "ចម្ងាយ = ល្បឿន × ពេលវេលា (60 × 2.5 = 150)។",
    },
    {
      qEn: "Calculate: 15% of 200",
      qKh: "គណនា៖ 15% នៃ 200",
      aEn: "30",
      aKh: "30",
      explainEn: "0.15 multiplied by 200 is 30.",
      explainKh: "0.15 គុណនឹង 200 គឺ 30។",
    },
    {
      qEn: "Solve: 3³ (3 cubed)",
      qKh: "ដោះស្រាយ៖ 3 ស្វ័យគុណ 3",
      aEn: "27",
      aKh: "27",
      explainEn: "3 × 3 × 3 = 27.",
      explainKh: "3 គុណ 3 គុណ 3 ស្មើ 27។",
    },
  ],
  vocab: [
    {
      qEn: "What is the missing letter?  P _ O T O N",
      qKh: "តើតួអក្សរមួយណាដែលបាត់? P _ O T O N",
      aEn: "R (PROTON)",
      aKh: "R (PROTON)",
      explainEn: "A proton is a positively charged particle in an atom.",
      explainKh: "ប្រូតុងគឺជាភាគល្អិតដែលមានបន្ទុកវិជ្ជមាននៅក្នុងអាតូម។",
    },
    {
      qEn: "What is the opposite of 'Ancient'?",
      qKh: "តើពាក្យផ្ទុយនឹង 'Ancient' (បុរាណ) គឺជាអ្វី?",
      aEn: "Modern",
      aKh: "សម័យទំនើប (Modern)",
      explainEn: "Ancient means old; modern means current.",
      explainKh: "បុរាណមានន័យថាចាស់ សម័យទំនើបមានន័យថាបច្ចុប្បន្ន។",
    },
    {
      qEn: "Rearrange the letters:  O I L B Y O G",
      qKh: "រៀបអក្សរទាំងនេះឡើងវិញ៖ O I L B Y O G",
      aEn: "BIOLOGY",
      aKh: "ជីវវិទ្យា (BIOLOGY)",
      explainEn: "Biology is the study of life.",
      explainKh: "ជីវវិទ្យាគឺការសិក្សាពីជីវិត។",
    },
    {
      qEn: "Which word connects contrasting ideas:  'And' or 'But'?",
      qKh: "តើពាក្យមួយណាភ្ជាប់គំនិតផ្ទុយគ្នា៖ 'And' ឬ 'But'?",
      aEn: "But",
      aKh: "ប៉ុន្តែ (But)",
      explainEn: "'But' is used to show contrast or exception.",
      explainKh: "'ប៉ុន្តែ' ត្រូវបានប្រើដើម្បីបង្ហាញពីភាពផ្ទុយគ្នា។",
    },
  ],
  science: [
    {
      qEn: "True or False:  Sound travels faster in water than in air.",
      qKh: "ពិត ឬ មិនពិត៖ សំឡេងធ្វើដំណើរក្នុងទឹកលឿនជាងក្នុងខ្យល់។",
      aEn: "TRUE",
      aKh: "ពិត",
      explainEn: "Water molecules are closer together, so sound waves move through them faster.",
      explainKh: "ម៉ូលេគុលទឹកនៅជិតគ្នា ដែលធ្វើឲ្យរលកសំឡេងធ្វើដំណើរបានលឿនជាង។",
    },
    {
      qEn: "What gas do plants absorb during photosynthesis?",
      qKh: "តើរុក្ខជាតិស្រូបយកឧស្ម័នអ្វីក្នុងអំឡុងពេលរស្មីសំយោគ?",
      aEn: "Carbon Dioxide (CO₂)",
      aKh: "ឧស្ម័នកាបូនិក (CO₂)",
      explainEn: "Plants take in CO₂ and release Oxygen.",
      explainKh: "រុក្ខជាតិស្រូបយក CO₂ និងបញ្ចេញអុកស៊ីហ្សែន។",
    },
    {
      qEn: "True or False:  Electrons have a positive charge.",
      qKh: "ពិត ឬ មិនពិត៖ អេឡិចត្រុងមានបន្ទុកវិជ្ជមាន។",
      aEn: "FALSE",
      aKh: "មិនពិត",
      explainEn: "Electrons are negative. Protons are positive.",
      explainKh: "អេឡិចត្រុងអវិជ្ជមាន ចំណែកប្រូតុងវិជ្ជមាន។",
    },
    {
      qEn: "Which plate tectonic movement forms mountains?",
      qKh: "តើចលនាផ្លាកតិចតូនិកមួយណាបង្កើតឲ្យមានភ្នំ?",
      aEn: "Convergent",
      aKh: "ចលនាទង្គិចគ្នា (Convergent)",
      explainEn: "When plates crash together, the land pushes up.",
      explainKh: "នៅពេលផ្លាកបុកទង្គិចគ្នា ដីត្រូវបានរុញឡើង។",
    },
  ],
  tech: [
    {
      qEn: "Which computer part acts as its short-term memory?",
      qKh: "តើផ្នែកមួយណារបស់កុំព្យូទ័រដើរតួជាអង្គចងចាំបណ្តោះអាសន្ន?",
      aEn: "RAM",
      aKh: "អង្គចងចាំ RAM",
      explainEn: "RAM holds data only while the computer is on.",
      explainKh: "RAM រក្សាទុកទិន្នន័យតែពេលកុំព្យូទ័របើកដំណើរការប៉ុណ្ណោះ។",
    },
    {
      qEn: "What does CPU stand for?",
      qKh: "តើ CPU តំណាងឲ្យពាក្យអ្វី?",
      aEn: "Central Processing Unit",
      aKh: "Central Processing Unit",
      explainEn: "It is the 'brain' of the computer that does all the math.",
      explainKh: "វាជាខួរក្បាលរបស់កុំព្យូទ័រដែលធ្វើការគណនាទាំងអស់។",
    },
    {
      qEn: "What was the first manual calculating tool used in ancient times?",
      qKh: "តើឧបករណ៍គណនាដោយដៃដំបូងគេប្រើនៅសម័យបុរាណគឺជាអ្វី?",
      aEn: "The Abacus",
      aKh: "ក្បាច់គិតលេខ (Abacus)",
      explainEn: "The abacus uses sliding beads to perform math.",
      explainKh: "ឧបករណ៍នេះប្រើគ្រាប់អង្កាំរំកិលដើម្បីគិតលេខ។",
    },
    {
      qEn: "Is keeping your battery at 100% all the time good or bad?",
      qKh: "តើការរក្សាថ្មកុំព្យូទ័រនៅ 100% រហូតល្អ ឬ អាក្រក់?",
      aEn: "Bad",
      aKh: "អាក្រក់",
      explainEn: "It puts stress on the battery's chemicals.",
      explainKh: "វាធ្វើឱ្យមានសម្ពាធដល់សារធាតុគីមីរបស់ថ្ម។",
    },
  ],
  career: [
    {
      qEn: "Which career deals with tracking finances:  Accountant or Architect?",
      qKh: "តើការងារមួយណាគ្រប់គ្រងហិរញ្ញវត្ថុ៖ គណនេយ្យករ ឬ ស្ថាបត្យករ?",
      aEn: "Accountant",
      aKh: "គណនេយ្យករ",
      explainEn: "Accountants manage money, while architects design buildings.",
      explainKh: "គណនេយ្យករគ្រប់គ្រងលុយ ចំណែកស្ថាបត្យកររចនាអគារ។",
    },
    {
      qEn: "What professional installs and repairs wiring?",
      qKh: "តើអ្នកជំនាញមួយណាដំឡើងនិងជួសជុលខ្សែភ្លើង?",
      aEn: "Electrician",
      aKh: "ជាងអគ្គិសនី",
      explainEn: "Electricians work with power systems safely.",
      explainKh: "ជាងអគ្គិសនីធ្វើការជាមួយប្រព័ន្ធថាមពលដោយសុវត្ថិភាព។",
    },
    {
      qEn: "Who writes code to build internet sites?",
      qKh: "តើនរណាសរសេរកូដដើម្បីបង្កើតគេហទំព័រ?",
      aEn: "Web Developer",
      aKh: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ",
      explainEn: "Web developers use languages like HTML and JavaScript.",
      explainKh: "ពួកគេប្រើភាសាដូចជា HTML និង JavaScript។",
    },
    {
      qEn: "Which job involves studying rocks and earthquakes?",
      qKh: "តើការងារមួយណាពាក់ព័ន្ធនឹងការសិក្សាថ្ម និងការរញ្ជួយដី?",
      aEn: "Geologist",
      aKh: "អ្នកភូគព្ភវិទ្យា",
      explainEn: "Geologists study the physical structure of the Earth.",
      explainKh: "អ្នកភូគព្ភវិទ្យាសិក្សារចនាសម្ព័ន្ធរូបវិទ្យានៃផែនដី។",
    },
  ],
  weekend: [
    {
      qEn: "Quick brain teaser:  I am full of holes but still hold water. What am I?",
      qKh: "ប្រស្នាខួរក្បាលលឿន៖  ខ្ញុំពេញដោយរន្ធ ប៉ុន្តែនៅតែកាន់ទឹកបាន។ ខ្ញុំជាអ្វី?",
      aEn: "A sponge",
      aKh: "អេប៉ុង (sponge)",
      explainEn: "A sponge has thousands of tiny holes that trap and hold water — perfect for cleaning.",
      explainKh: "អេប៉ុងមានរន្ធតូចៗរាប់ពាន់ដែលចាប់ និងកាន់ទឹក — ល្អឥតខ្ចោះសម្រាប់សម្អាត។",
    },
    {
      qEn: "What has hands but cannot clap?",
      qKh: "អ្វីមានដៃ ប៉ុន្តែមិនអាចទះដៃបាន?",
      aEn: "A clock",
      aKh: "នាឡិកា",
      explainEn: "A clock has hour, minute, and second 'hands' — but they only point at the time.",
      explainKh: "នាឡិកាមាន 'ដៃ' ម៉ោង នាទី និងវិនាទី — ប៉ុន្តែវាគ្រាន់តែចង្អុលប្រាប់ម៉ោង។",
    },
  ],
};

/* Pick today's challenge deterministically — same for everyone, changes daily */
function pickTodayChallenge(): { subject: Subject; challenge: Challenge; dateKey: string } {
  const now = new Date();
  const dow = now.getDay();
  const subject = SUBJECTS[dow];
  const bank = BANKS[subject.id];
  // Days since unix epoch — guarantees a fresh question each calendar day.
  const dayNumber = Math.floor(
    (now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000,
  );
  const challenge = bank[dayNumber % bank.length];
  const dateKey = now.toLocaleDateString(undefined, {
    weekday: "long", month: "short", day: "numeric",
  });
  return { subject, challenge, dateKey };
}

/* ══════════════════════════════════════════════════════════════════════ */
export function DailySparkChallenge() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { subject, challenge, dateKey } = useMemo(pickTodayChallenge, []);
  const [flipped, setFlipped] = useState(false);
  const Icon = subject.Icon;

  return (
    <section
      aria-labelledby="spark-heading"
      className="relative w-full px-4 sm:px-6 pt-6 pb-2 sm:pt-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Animated glowing wrapper ─────────────────── */}
        <div className="relative group">
          {/* Glow halo (animated) */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${subject.glow} opacity-70 blur-xl animate-spark-pulse`}
            aria-hidden
          />
          {/* Solid gradient ring */}
          <div className={`absolute -inset-[3px] rounded-3xl bg-gradient-to-r ${subject.glow}`} aria-hidden />

          <div className="relative rounded-3xl bg-white p-4 sm:p-6 shadow-2xl">
            {/* ── Top bar ────────────────────────────── */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${subject.glow} text-white shadow-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] ${subject.text} ${kh ? "font-khmer normal-case tracking-normal text-xs sm:text-sm" : ""}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {kh ? "បញ្ហាប្រឈមប្រចាំថ្ងៃ" : "Daily Spark Challenge"}
                  </div>
                  <h2
                    id="spark-heading"
                    className={`font-display text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}
                  >
                    {kh ? subject.labelKh : subject.labelEn}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dateKey}</span>
              </div>
            </div>

            {/* ── Flip card ──────────────────────────── */}
            <button
              type="button"
              onClick={() => setFlipped((v) => !v)}
              aria-pressed={flipped}
              aria-label={flipped ? "Hide answer" : "Show answer"}
              className="relative block w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-amber-400 rounded-2xl"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative w-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  minHeight: "220px",
                }}
              >
                {/* FRONT — question */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.cardFront} border-4 border-white shadow-inner p-5 sm:p-7 flex flex-col items-center justify-center text-center`}
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className={`text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    {kh ? "សំណួរថ្ងៃនេះ" : "Today's Question"}
                  </div>
                  <p className={`font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? challenge.qKh : challenge.qEn}
                  </p>
                  <div className={`mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white shadow-md text-slate-700 text-xs sm:text-sm font-bold ${kh ? "font-khmer" : ""}`}>
                    <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    {kh ? "ចុចដើម្បីឃើញចម្លើយ" : "Tap to flip & see the answer"}
                  </div>
                </div>

                {/* BACK — answer */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.cardBack} border-4 border-white shadow-inner p-5 sm:p-7 flex flex-col items-center justify-center text-center`}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className={`text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    {kh ? "ចម្លើយ" : "Answer"}
                  </div>
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                    <span className={`bg-gradient-to-r ${subject.glow} bg-clip-text text-transparent`}>
                      {kh ? challenge.aKh : challenge.aEn}
                    </span>
                  </p>
                  <p className={`text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
                    {kh ? challenge.explainKh : challenge.explainEn}
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-slate-600 text-xs font-bold ${kh ? "font-khmer" : ""}`}>
                    <RefreshCcw className="w-3 h-3" />
                    {kh ? "ចុចដើម្បីត្រឡប់" : "Tap to flip back"}
                  </div>
                </div>
              </div>
            </button>

            {/* ── Streak motivator ───────────────────── */}
            <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-amber-200">
              <div className="relative">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-flame" />
                <span className="sr-only">Streak</span>
              </div>
              <div className={`text-xs sm:text-sm text-amber-900 font-bold ${kh ? "font-khmer text-sm sm:text-base" : ""}`}>
                {kh ? "ជ័យលាភី (Streak) — " : "Streak — "}
                <span className="font-normal opacity-90">
                  {kh ? "ត្រឡប់មកម្ដងទៀតថ្ងៃស្អែកសម្រាប់បញ្ហាប្រឈមថ្មី!" : "Come back tomorrow for a new challenge!"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes — pulsing glow + flickering flame */}
      <style>{`
        @keyframes sparkPulse {
          0%,100% { opacity: 0.55; transform: scale(1); }
          50%     { opacity: 0.85; transform: scale(1.015); }
        }
        @keyframes flame {
          0%,100% { transform: scale(1) rotate(-2deg); }
          50%     { transform: scale(1.15) rotate(2deg); }
        }
        .animate-spark-pulse { animation: sparkPulse 3.5s ease-in-out infinite; }
        .animate-flame       { animation: flame 1.1s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
