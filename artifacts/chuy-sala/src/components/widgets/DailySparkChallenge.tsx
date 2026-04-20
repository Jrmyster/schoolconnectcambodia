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
const BANKS: Record<string, Challenge[]> = {
  math: [
    {
      qEn: "Solve the equation:  2x + 5 = 15",
      qKh: "ដោះស្រាយសមីការ៖  2x + 5 = 15",
      aEn: "x = 5",
      aKh: "x = 5",
      explainEn: "Subtract 5 from both sides → 2x = 10. Divide by 2 → x = 5.",
      explainKh: "ដក 5 ពីសងខាង → 2x = 10។ ចែកនឹង 2 → x = 5។",
    },
    {
      qEn: "If a triangle has angles 60° and 80°, what is the third angle?",
      qKh: "បើត្រីកោណមានមុំ 60° និង 80° តើមុំទីបីប៉ុន្មាន?",
      aEn: "40°",
      aKh: "40°",
      explainEn: "All triangle angles add to 180°. So 180 − 60 − 80 = 40.",
      explainKh: "មុំទាំងអស់នៃត្រីកោណបូកគ្នាស្មើ 180°។ ដូច្នេះ 180 − 60 − 80 = 40។",
    },
    {
      qEn: "A shop sells 3 mangoes for 6,000 riel. How much for 7 mangoes?",
      qKh: "ហាងលក់ស្វាយ 3 ផ្លែ ៦០០០ រៀល។ ស្វាយ 7 ផ្លែតម្លៃប៉ុន្មាន?",
      aEn: "14,000 riel",
      aKh: "១៤០០០ រៀល",
      explainEn: "1 mango = 2,000 riel. 7 × 2,000 = 14,000 riel.",
      explainKh: "ស្វាយ ១ ផ្លែ = ២០០០ រៀល។ ៧ × ២០០០ = ១៤០០០ រៀល។",
    },
  ],
  vocab: [
    {
      qEn: "What is the missing letter?   P _ O T O N",
      qKh: "តើអក្សរបាត់គឺជាអ្វី?   P _ O T O N",
      aEn: "R  →  PROTON",
      aKh: "R  →  PROTON (ប្រូតុង)",
      explainEn: "A proton is a tiny particle inside the nucleus of an atom — it has a positive charge.",
      explainKh: "ប្រូតុងគឺជាភាគល្អិតតូចនៅខាងក្នុងស្នូលអាតូម — វាមានបន្ទុកវិជ្ជមាន។",
    },
    {
      qEn: "Fill in the blank:   The opposite of 'happy' is ___",
      qKh: "បំពេញចន្លោះ៖   ផ្ទុយពី 'happy' គឺ ___",
      aEn: "sad",
      aKh: "sad (ក្រៀមក្រំ)",
      explainEn: "'Happy' means feeling joy. 'Sad' means feeling unhappy or sorrowful.",
      explainKh: "'Happy' មានន័យថាមានអារម្មណ៍រីករាយ។ 'Sad' មានន័យថាមិនរីករាយ ឬកើតទុក្ខ។",
    },
    {
      qEn: "What is the missing letter?   E L E _ T R I C I T Y",
      qKh: "តើអក្សរបាត់គឺជាអ្វី?   E L E _ T R I C I T Y",
      aEn: "C  →  ELECTRICITY",
      aKh: "C  →  ELECTRICITY (អគ្គិសនី)",
      explainEn: "Electricity is the flow of tiny particles called electrons through a wire.",
      explainKh: "អគ្គិសនីគឺជាលំហូរនៃភាគល្អិតតូចហៅថាអេឡិចត្រុងតាមរយៈខ្សែ។",
    },
  ],
  science: [
    {
      qEn: "True or False:  Sound travels faster in water than in air.",
      qKh: "ពិត ឬមិនពិត៖  សំឡេងធ្វើដំណើរលឿនជាងក្នុងទឹកជាងក្នុងខ្យល់។",
      aEn: "TRUE",
      aKh: "ពិត",
      explainEn: "Sound travels about 4× faster in water (~1,500 m/s) than in air (~340 m/s) because water molecules are packed closer together.",
      explainKh: "សំឡេងធ្វើដំណើរលឿនប្រហែល ៤ ដងក្នុងទឹក (~1,500 m/s) ជាងក្នុងខ្យល់ (~340 m/s) ព្រោះម៉ូលេគុលទឹកនៅជិតគ្នា។",
    },
    {
      qEn: "True or False:  The Sun is a planet.",
      qKh: "ពិត ឬមិនពិត៖  ព្រះអាទិត្យជាភពមួយ។",
      aEn: "FALSE",
      aKh: "មិនពិត",
      explainEn: "The Sun is a star — a giant ball of burning gas. Planets orbit around it.",
      explainKh: "ព្រះអាទិត្យជាផ្កាយមួយ — ជាបាល់ឧស្ម័នដ៏ធំកំពុងឆេះ។ ភពជុំវិញវាគឺជាដៃរបស់វា។",
    },
    {
      qEn: "True or False:  Plants make their own food using sunlight.",
      qKh: "ពិត ឬមិនពិត៖  រុក្ខជាតិបង្កើតអាហារដោយខ្លួនឯងដោយប្រើពន្លឺព្រះអាទិត្យ។",
      aEn: "TRUE",
      aKh: "ពិត",
      explainEn: "It's called photosynthesis. Plants take sunlight + water + CO₂ and make sugar (glucose) and oxygen.",
      explainKh: "វាហៅថាតួនាទីពន្លឺព្រះអាទិត្យ។ រុក្ខជាតិយកពន្លឺ + ទឹក + CO₂ ហើយបង្កើតស្ករ (គ្លុយកូស) និងអុកស៊ីសែន។",
    },
  ],
  tech: [
    {
      qEn: "Which part of a computer acts as its short-term memory?",
      qKh: "តើផ្នែកណានៃកុំព្យូទ័រដើរតួជាការចងចាំរយៈពេលខ្លី?",
      aEn: "RAM (Random Access Memory)",
      aKh: "RAM (ការចងចាំចូលដំណើរការចៃដន្យ)",
      explainEn: "RAM holds the apps and files you're using right now. When you turn the computer off, RAM is cleared — that's why it's 'short-term'.",
      explainKh: "RAM ផ្ទុកកម្មវិធី និងឯកសារដែលអ្នកកំពុងប្រើ។ ពេលអ្នកបិទកុំព្យូទ័រ RAM ត្រូវបានសម្អាត — នោះហើយជាមូលហេតុដែលហៅថា 'រយៈពេលខ្លី'។",
    },
    {
      qEn: "Who invented the World Wide Web in 1989?",
      qKh: "តើនរណាបង្កើតបណ្តាញពិភពលោក (Web) នៅឆ្នាំ ១៩៨៩?",
      aEn: "Tim Berners-Lee",
      aKh: "Tim Berners-Lee (ធីម ប៊ឺណើស-លី)",
      explainEn: "A British scientist working at CERN in Switzerland. He gave the Web away for free so anyone could use it.",
      explainKh: "ជាអ្នកវិទ្យាសាស្ត្រអង់គ្លេសដែលធ្វើការនៅ CERN ក្នុងប្រទេសស្វីស។ គាត់បានផ្ដល់ Web ដោយឥតគិតថ្លៃដើម្បីឱ្យអ្នកគ្រប់គ្នាអាចប្រើបាន។",
    },
    {
      qEn: "What does 'CPU' stand for?",
      qKh: "'CPU' តំណាងឱ្យអ្វី?",
      aEn: "Central Processing Unit",
      aKh: "ឯកតាដំណើរការកណ្តាល",
      explainEn: "The CPU is the 'brain' of the computer — it does all the calculations and decisions.",
      explainKh: "CPU គឺជា 'ខួរក្បាល' របស់កុំព្យូទ័រ — វាធ្វើការគណនា និងការសម្រេចចិត្តទាំងអស់។",
    },
  ],
  career: [
    {
      qEn: "Which career deals with tracking finances:  Accountant or Architect?",
      qKh: "តើអាជីពមួយណាដោះស្រាយការតាមដានហិរញ្ញវត្ថុ៖  គណនេយ្យករ ឬស្ថាបត្យករ?",
      aEn: "Accountant",
      aKh: "គណនេយ្យករ",
      explainEn: "An accountant tracks money — income, spending, taxes. An architect designs buildings.",
      explainKh: "គណនេយ្យករតាមដានប្រាក់ — ចំណូល ការចំណាយ ពន្ធ។ ស្ថាបត្យករឌីហ្សាញអគារ។",
    },
    {
      qEn: "Which career builds bridges and roads:  Engineer or Doctor?",
      qKh: "តើអាជីពមួយណាសាងសង់ស្ពាន និងផ្លូវ៖  វិស្វករ ឬគ្រូពេទ្យ?",
      aEn: "Engineer (Civil Engineer)",
      aKh: "វិស្វករ (វិស្វករសំណង់សុីវិល)",
      explainEn: "Civil engineers design and build roads, bridges, dams, and buildings — vital work for every growing community in Cambodia.",
      explainKh: "វិស្វករសំណង់សុីវិលឌីហ្សាញ និងសាងសង់ផ្លូវ ស្ពាន ទំនប់ និងអគារ — ជាការងារសំខាន់សម្រាប់សហគមន៍កំពុងលូតលាស់នៅកម្ពុជា។",
    },
    {
      qEn: "Which career studies how plants grow to feed villages:  Agronomist or Pilot?",
      qKh: "តើអាជីពមួយណាសិក្សាអំពីរបៀបដែលរុក្ខជាតិលូតលាស់ដើម្បីផ្គត់ផ្គង់ភូមិ៖  អ្នកកសិកម្មវិទ្យា ឬអ្នកបើកយន្តហោះ?",
      aEn: "Agronomist",
      aKh: "អ្នកកសិកម្មវិទ្យា",
      explainEn: "Agronomists study soil, seeds, water, and weather to help farmers grow more rice and vegetables.",
      explainKh: "អ្នកកសិកម្មវិទ្យាសិក្សាដី គ្រាប់ពូជ ទឹក និងធាតុអាកាសដើម្បីជួយកសិករដាំស្រូវ និងបន្លែកាន់តែច្រើន។",
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
