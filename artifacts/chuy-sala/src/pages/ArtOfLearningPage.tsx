import { useState, useMemo } from "react";
import {
  BookOpen,
  Brain,
  Sparkles,
  Lightbulb,
  Eye,
  Headphones,
  Hand,
  Repeat,
  GraduationCap,
  Heart,
  Zap,
  Calculator,
  TrendingUp,
  Globe2,
  Rocket,
  Wheat,
  PenLine,
  Factory,
  Smartphone,
  ShieldCheck,
  Info,
  Quote,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Art of Learning — សិល្បៈនៃការរៀនសូត្រ
//
//  Sections:
//    1. Learning styles — Visual / Auditory / Kinesthetic
//    2. How to Learn   — Active Recall, Spaced Repetition, Feynman
//    3. Neurodiversity — Dyslexia, ADHD, Dyscalculia (respectful)
//    4. Civilization   — Timeline + the Great Equalizer
//
//  Aesthetic: calm sage green + warm cream + amber accents.
// ════════════════════════════════════════════════════════════════════════════

export default function ArtOfLearningPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-stone-800 overflow-hidden">
      <ScopedStyles />
      <CalmBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនពិសេស · ត្រៀមប្រឡង" : "Special Lesson · Exam Prep"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-stone-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>សិល្បៈនៃ <span className="aol-text-leaf">ការរៀនសូត្រ</span></>
          ) : (
            <>The Art of <span className="aol-text-leaf">Learning</span></>
          )}
        </h1>
        <p
          className={`text-stone-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ការរៀនសូត្រគឺជាជំនាញ — និងដូចជំនាញទាំងអស់ វាអាចកែលម្អបាន។ ស្គាល់ខួរក្បាលរបស់អ្នក ប្រើវិធីសាស្ត្រដែលវិទ្យាសាស្ត្របានបង្ហាញ ហើយចងចាំ៖ ភាពខុសគ្នានៃរបៀបរៀនសូត្រគឺជារឿងធម្មតា និងស្រស់ស្អាត។"
            : "Learning is a skill — and like every skill, it can be improved. Get to know your brain, use methods that science has proven, and remember: differences in how people learn are normal and beautiful."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-emerald-300 select-none">
          <BookOpen className="w-7 h-7 aol-float" style={{ animationDelay: "0s" }} />
          <Brain className="w-7 h-7 aol-float" style={{ animationDelay: "0.6s" }} />
          <Lightbulb className="w-7 h-7 aol-float" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── 1. Learning Styles ──────────────────────────────────────── */}
      <Section
        eyebrowEn="01 · Know your brain"
        eyebrowKh="០១ · ស្គាល់ខួរក្បាលរបស់អ្នក"
        titleEn="Three ways people learn"
        titleKh="៣ វិធីដែលមនុស្សរៀន"
        descEn="Most of us mix all three, but each person leans a little more toward one. Knowing your favourite channel helps you study smarter — not harder."
        descKh="យើងភាគច្រើនលាយបញ្ចូលគ្នាទាំងបី ប៉ុន្តែមនុស្សម្នាក់ៗតែងតែទោរទន់ទៅរកវិធីមួយច្រើនជាងគេ។ ការដឹងពីប៉ុស្តិ៍ដែលអ្នកចូលចិត្តជួយឲ្យអ្នករៀនបានឆ្លាតវៃជាង — មិនមែនពិបាកជាង។"
        isKh={isKh}
      >
        <LearningStyles isKh={isKh} />
      </Section>

      {/* ── 2. How to Learn ─────────────────────────────────────────── */}
      <Section
        eyebrowEn="02 · Effective study science"
        eyebrowKh="០២ · វិទ្យាសាស្ត្រនៃការរៀនមានប្រសិទ្ធភាព"
        titleEn="How to learn — three proven techniques"
        titleKh="របៀបរៀន — បច្ចេកទេសដែលបញ្ជាក់ដោយវិទ្យាសាស្ត្រ"
        descEn="Decades of research keep pointing at the same handful of methods. They're free, they need no apps, and they work in any classroom — even one with no electricity."
        descKh="ការស្រាវជ្រាវរាប់សិបឆ្នាំបានបង្ហាញវិធីដូចគ្នាមួយចំនួន។ ពួកវាឥតគិតថ្លៃ មិនត្រូវការកម្មវិធី ហើយមានប្រសិទ្ធភាពនៅក្នុងថ្នាក់រៀនណាមួយ — សូម្បីតែគ្មានអគ្គិសនី។"
        isKh={isKh}
      >
        <ActiveRecall isKh={isKh} />
        <SpacedRepetition isKh={isKh} />
        <Feynman isKh={isKh} />
      </Section>

      {/* ── 3. Neurodiversity ───────────────────────────────────────── */}
      <Section
        eyebrowEn="03 · Neurodiversity"
        eyebrowKh="០៣ · ភាពចម្រុះនៃខួរក្បាល"
        titleEn="Understanding learning differences"
        titleKh="ការយល់ដឹងពីភាពខុសគ្នានៃការរៀន"
        descEn="Some students' brains are wired a little differently — not worse, just different. Recognising it early lets us match the strategy to the learner."
        descKh="ខួរក្បាលរបស់សិស្សមួយចំនួនមានការដំណើរការខុសគ្នាបន្តិច — មិនមែនអាក្រក់ជាង គ្រាន់តែខុសគ្នា។ ការស្គាល់វាពីដំបូងជួយឲ្យយើងផ្គូផ្គងវិធីសាស្ត្រទៅនឹងសិស្សម្នាក់ៗ។"
        isKh={isKh}
      >
        <NeurodiversityCards isKh={isKh} />
        <ReassureBanner isKh={isKh} />
      </Section>

      {/* ── 4. Why Education Matters ────────────────────────────────── */}
      <Section
        eyebrowEn="04 · Civilization"
        eyebrowKh="០៤ · អរិយធម៌"
        titleEn="Why education matters"
        titleKh="ហេតុអ្វីបានជាការអប់រំសំខាន់"
        descEn="Every leap forward — from the first written word to the first step on the moon — happened because one generation taught the next. You are now part of that chain."
        descKh="រាល់ការវិវត្តន៍ដ៏ធំ — ចាប់ពីពាក្យដែលត្រូវបានសរសេរដំបូង រហូតដល់ជំហានដំបូងនៅលើព្រះច័ន្ទ — បានកើតឡើងដោយសារជំនាន់មួយបង្រៀនជំនាន់បន្ទាប់។ ឥឡូវអ្នកគឺជាផ្នែកមួយនៃច្រវាក់នោះ។"
        isKh={isKh}
      >
        <CivilizationTimeline isKh={isKh} />
        <GreatEqualizer isKh={isKh} />
      </Section>

      {/* ── Closing ─────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-stone-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ប្រាប់ខ្ញុំ ខ្ញុំនឹងភ្លេច។ បង្រៀនខ្ញុំ ខ្ញុំនឹងចងចាំ។ ចូលរួមជាមួយខ្ញុំ ខ្ញុំនឹងរៀន។” — Benjamin Franklin"
            : "“Tell me and I forget. Teach me and I remember. Involve me and I learn.” — Benjamin Franklin"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-stone-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function PaperCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-[0_2px_24px_-12px_rgba(16,80,60,0.25)] ${className}`}>
      {children}
    </div>
  );
}

function CalmBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #fdfcf7 0%, #f5f3eb 50%, #ecf3ee 100%)" }} />
      {/* Soft floating sage circles */}
      <div className="absolute top-32 -left-20 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute top-[40%] -right-16 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-emerald-100/30 blur-3xl" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Learning Styles
// ════════════════════════════════════════════════════════════════════════════

function LearningStyles({ isKh }: { isKh: boolean }) {
  const styles = [
    {
      key: "visual",
      icon: Eye,
      tint: "emerald",
      titleEn: "Visual",
      titleKh: "ការមើលឃើញ",
      blurbEn: "Learns best from diagrams, colours, mind-maps, and watching demonstrations.",
      blurbKh: "រៀនបានល្អបំផុតពីដ្យាក្រាម ពណ៌ផែនទីគំនិត និងការមើលការបង្ហាញ។",
      tipEn: "Try: redraw the lesson as a sketch on paper.",
      tipKh: "សាកល្បង៖ គូរមេរៀនឡើងវិញជាគំនូរនៅលើក្រដាស។",
    },
    {
      key: "auditory",
      icon: Headphones,
      tint: "amber",
      titleEn: "Auditory",
      titleKh: "ការស្ដាប់",
      blurbEn: "Learns best by listening, talking it through, and explaining out loud.",
      blurbKh: "រៀនបានល្អបំផុតដោយការស្ដាប់ ការនិយាយឆ្លងកាត់ និងការពន្យល់ឲ្យឮ។",
      tipEn: "Try: read your notes aloud or teach a friend.",
      tipKh: "សាកល្បង៖ អានកំណត់ត្រាឲ្យឮ ឬបង្រៀនមិត្ត។",
    },
    {
      key: "kinesthetic",
      icon: Hand,
      tint: "rose",
      titleEn: "Kinesthetic",
      titleKh: "ការធ្វើដោយដៃ",
      blurbEn: "Learns best by doing — building, moving, role-playing, hands-on practice.",
      blurbKh: "រៀនបានល្អបំផុតដោយការធ្វើ — ការសាងសង់ ការផ្លាស់ទី ការសម្ដែងជាតួ ការអនុវត្តដោយដៃ។",
      tipEn: "Try: act out the problem with objects on your desk.",
      tipKh: "សាកល្បង៖ សម្ដែងបញ្ហាជាមួយវត្ថុនៅលើតុរបស់អ្នក។",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {styles.map((s) => {
        const Icon = s.icon;
        const tintClasses = s.tint === "emerald"
          ? { bar: "bg-emerald-500", iconBg: "bg-emerald-100", iconClr: "text-emerald-700", chip: "bg-emerald-50 text-emerald-800 border-emerald-200" }
          : s.tint === "amber"
          ? { bar: "bg-amber-500",   iconBg: "bg-amber-100",   iconClr: "text-amber-700",   chip: "bg-amber-50 text-amber-800 border-amber-200" }
          : { bar: "bg-rose-500",    iconBg: "bg-rose-100",    iconClr: "text-rose-700",    chip: "bg-rose-50 text-rose-800 border-rose-200" };
        return (
          <PaperCard key={s.key} className="p-5 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 ${tintClasses.bar}`} />
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl ${tintClasses.iconBg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${tintClasses.iconClr}`} strokeWidth={1.8} />
              </div>
              <h3 className={`font-display font-bold text-lg text-stone-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? s.titleKh : s.titleEn}
              </h3>
            </div>
            <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? s.blurbKh : s.blurbEn}
            </p>
            <div className={`text-xs px-3 py-2 rounded-lg border ${tintClasses.chip} ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? s.tipKh : s.tipEn}
            </div>
          </PaperCard>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2a. Active Recall
// ════════════════════════════════════════════════════════════════════════════

function ActiveRecall({ isKh }: { isKh: boolean }) {
  const [mode, setMode] = useState<"reread" | "test">("reread");
  const recall = mode === "reread" ? 12 : 80; // % retained after a week (illustrative)

  return (
    <PaperCard className="p-5 sm:p-6">
      <CardHeader
        icon={Repeat}
        tint="emerald"
        titleEn="Active recall — test yourself, don't re-read"
        titleKh="ការប្រមូលឡើងវិញសកម្ម — សាកល្បងខ្លួនឯង កុំអានឡើងវិញ"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ការអានឡើងវិញម្ដងហើយម្ដងទៀត មានអារម្មណ៍ស្រួលប្រសិទ្ធភាព — តែវាជាការបោកប្រាស់។ ការបង្ខំខួរក្បាលរបស់អ្នកឲ្យ ទាញ ព័ត៌មានចេញមកវិញ (ដូចជាការបិទសៀវភៅហើយព្យាយាមនិយាយវាឡើងវិញ) ពង្រឹងផ្លូវសរសៃប្រសាទយ៉ាងខ្លាំង។"
          : "Re-reading the same chapter feels productive — but it's an illusion. Forcing your brain to pull information back out (close the book, then say it from memory) strengthens the neural pathway far more."}
      </p>

      {/* Toggle */}
      <div className="inline-flex bg-stone-100 rounded-full p-1 mb-4" role="group" aria-label="Study method">
        {(["reread", "test"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              mode === m ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
            } ${isKh ? "font-khmer" : ""}`}
          >
            {m === "reread"
              ? (isKh ? "អានឡើងវិញ" : "Re-read passively")
              : (isKh ? "សាកល្បងខ្លួនឯង" : "Self-test (active recall)")}
          </button>
        ))}
      </div>

      {/* Retention bar */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
        <div className="flex items-end justify-between mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider text-stone-500 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "ចងចាំក្រោយ ៧ ថ្ងៃ" : "Remembered after 7 days"}
          </span>
          <span className="font-mono text-2xl font-bold tabular-nums text-stone-900">{recall}%</span>
        </div>
        <div className="h-4 bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${
              mode === "test" ? "bg-emerald-500" : "bg-rose-400"
            }`}
            style={{ width: `${recall}%` }}
          />
        </div>
        <p className={`text-xs text-stone-500 mt-3 italic ${isKh ? "font-khmer not-italic" : ""}`}>
          {isKh
            ? "តួលេខបង្ហាញសម្រាប់រូបភាព — ការសិក្សា (Karpicke & Roediger, 2008) រកឃើញថាការសាកល្បងខ្លួនឯងផ្ដល់ចំណេះដឹងច្រើនជាង ៥–១០ ដងបើប្រៀបធៀបនឹងការអានឡើងវិញដោយសាមញ្ញ។"
            : "Numbers shown for illustration — the classic Karpicke & Roediger (2008) study found self-testing produced 5–10× the long-term retention of passive re-reading."}
        </p>
      </div>

      {/* How-to */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <HowToStep n={1} en="Read a short section." kh="អានផ្នែកខ្លីមួយ។" isKh={isKh} />
        <HowToStep n={2} en="Close the book. Say it back from memory." kh="បិទសៀវភៅ។ និយាយវាឡើងវិញពីការចងចាំ។" isKh={isKh} />
        <HowToStep n={3} en="Open the book. Check what you missed." kh="បើកសៀវភៅ។ ពិនិត្យអ្វីដែលអ្នកខក។" isKh={isKh} />
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2b. Spaced Repetition — forgetting curve
// ════════════════════════════════════════════════════════════════════════════

function SpacedRepetition({ isKh }: { isKh: boolean }) {
  const [reviewing, setReviewing] = useState(false);

  // Plot dimensions
  const W = 560, H = 240;
  const PAD_L = 50, PAD_R = 16, PAD_T = 16, PAD_B = 36;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const DAYS = 14;

  const xOf = (d: number) => PAD_L + (d / DAYS) * plotW;
  const yOf = (pct: number) => PAD_T + (1 - pct / 100) * plotH;

  // Simple Ebbinghaus-style forgetting: r(t) = startStrength * e^(-(t - startDay)/S)
  // Each segment is drawn ONLY from startDay → endDay so segments don't overlap.
  const buildCurve = (startDay: number, endDay: number, startStrength: number, S: number) => {
    const pts: { x: number; y: number }[] = [];
    const span = endDay - startDay;
    for (let i = 0; i <= 100; i++) {
      const d = startDay + (i / 100) * span;
      const r = startStrength * Math.exp(-(d - startDay) / S);
      pts.push({ x: xOf(d), y: yOf(r) });
    }
    return pts;
  };

  const path = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

  // Without review: starts at 100%, decays smoothly across the full 14 days with S = 1.5
  const noReview = useMemo(() => buildCurve(0, DAYS, 100, 1.5), []);
  // With reviews: piecewise. At each review point retention snaps back to 100% and S grows.
  // Segment i runs from review[i-1] → review[i] using strength S_i.
  const reviewMarkers = [1, 3, 7];
  const withReview = useMemo(() => {
    const segments = [
      { from: 0, to: 1,    S: 1.5 },
      { from: 1, to: 3,    S: 3   },
      { from: 3, to: 7,    S: 6   },
      { from: 7, to: DAYS, S: 12  },
    ];
    return segments.map((seg) => buildCurve(seg.from, seg.to, 100, seg.S));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PaperCard className="p-5 sm:p-6">
      <CardHeader
        icon={TrendingUp}
        tint="amber"
        titleEn="Spaced repetition — beat the forgetting curve"
        titleKh="ការសារឡើងវិញដោយចន្លោះ — យកឈ្នះលើខ្សែកោងនៃការភ្លេច"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "នៅឆ្នាំ ១៨៨៥ លោក Hermann Ebbinghaus បានបង្ហាញថាការចងចាំធ្លាក់ចុះយ៉ាងលឿនបន្ទាប់ពីរៀនអ្វីមួយ។ ប៉ុន្តែរាល់ការសារ និងការសង្ខេបឡើងវិញគឺធ្វើឲ្យខ្សែកោងធ្លាក់ចុះយឺតជាងមុន — ហើយចងចាំយូរជាង។"
          : "In 1885, Hermann Ebbinghaus showed that memory drops sharply after we learn something. But each well-timed review makes the curve fall more slowly — and stick around longer."}
      </p>

      <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 mb-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          role="img"
          aria-labelledby="aol-curve-title aol-curve-desc"
        >
          <title id="aol-curve-title">
            {isKh ? "ខ្សែកោងនៃការភ្លេចរបស់ Ebbinghaus" : "Ebbinghaus forgetting curve"}
          </title>
          <desc id="aol-curve-desc">
            {isKh
              ? `ក្រាហ្វិកបង្ហាញការចងចាំ (%) ក្នុងរយៈពេល ១៤ ថ្ងៃ។ ខ្សែក្រហមធ្លាក់ចុះយ៉ាងលឿនពី ១០០% ដល់ប្រហែល ០% ក្នុងរយៈពេលប្រាំពីរថ្ងៃនៅពេលគ្មានការសារ។ នៅពេលបន្ថែមការសារនៅថ្ងៃ ១, ៣ និង ៧ ខ្សែបៃតងលោតត្រឡប់មក ១០០% ហើយធ្លាក់ចុះយឺតៗរាល់ដង — ដោយជួយឲ្យចងចាំយូរ។`
              : "Memory percent over fourteen days. The red curve drops sharply from one hundred percent to near zero within about a week without any review. When reviews are added on days one, three, and seven, the green curve resets to one hundred percent each time and falls more slowly after each review — leading to longer-lasting retention."}
          </desc>
          <defs>
            <pattern id="aol-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e7e5e4" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect x={PAD_L} y={PAD_T} width={plotW} height={plotH} fill="url(#aol-grid)" />

          {/* Axes */}
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#44403c" strokeWidth="1.4" />
          <line x1={PAD_L} y1={PAD_T + plotH} x2={PAD_L + plotW} y2={PAD_T + plotH} stroke="#44403c" strokeWidth="1.4" />

          <text x={PAD_L + plotW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#57534e">
            {isKh ? "ថ្ងៃ" : "days"}
          </text>
          <text x={14} y={PAD_T + plotH / 2} fontSize="11" fill="#57534e" transform={`rotate(-90 14 ${PAD_T + plotH / 2})`} textAnchor="middle">
            {isKh ? "ការចងចាំ %" : "memory %"}
          </text>

          {[0, 2, 4, 6, 8, 10, 12, 14].map((tk) => (
            <g key={`tx-${tk}`}>
              <line x1={xOf(tk)} y1={PAD_T + plotH} x2={xOf(tk)} y2={PAD_T + plotH + 4} stroke="#a8a29e" />
              <text x={xOf(tk)} y={PAD_T + plotH + 16} fontSize="10" fill="#78716c" textAnchor="middle">{tk}</text>
            </g>
          ))}
          {[0, 25, 50, 75, 100].map((pk) => (
            <g key={`dy-${pk}`}>
              <line x1={PAD_L - 4} y1={yOf(pk)} x2={PAD_L} y2={yOf(pk)} stroke="#a8a29e" />
              <text x={PAD_L - 7} y={yOf(pk) + 3} fontSize="10" fill="#78716c" textAnchor="end">{pk}</text>
            </g>
          ))}

          {/* No-review (rose) — always visible */}
          <path d={path(noReview)} fill="none" stroke="#e11d48" strokeWidth="2.5" />
          <text x={xOf(13)} y={yOf(2) - 6} fontSize="10" fill="#9f1239" textAnchor="end" fontStyle="italic">
            {isKh ? "គ្មានការសារ" : "no review"}
          </text>

          {/* With reviews (emerald) — toggleable */}
          {reviewing && withReview.map((seg, i) => (
            <path key={i} d={path(seg)} fill="none" stroke="#059669" strokeWidth="2.5" />
          ))}
          {reviewing && reviewMarkers.map((d) => (
            <g key={`mk-${d}`}>
              <line x1={xOf(d)} y1={yOf(0)} x2={xOf(d)} y2={yOf(100)} stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx={xOf(d)} cy={yOf(100)} r={5} fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x={xOf(d)} y={yOf(100) - 9} fontSize="10" fill="#065f46" textAnchor="middle" fontWeight="700">↻</text>
            </g>
          ))}
          {reviewing && (
            <text x={xOf(13)} y={yOf(85)} fontSize="10" fill="#065f46" textAnchor="end" fontStyle="italic">
              {isKh ? "ជាមួយការសារ" : "with reviews"}
            </text>
          )}
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-stone-600 mt-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-sm bg-rose-600" />
            {isKh ? "ភ្លេចដោយឥតសារ" : "Forgetting without review"}
          </span>
          {reviewing && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-sm bg-emerald-600" />
              {isKh ? "សារនៅថ្ងៃ ១, ៣, ៧" : "Reviewed on days 1, 3, 7"}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setReviewing((r) => !r)}
        aria-pressed={reviewing}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
          reviewing
            ? "bg-emerald-700 hover:bg-emerald-800 text-white"
            : "bg-stone-200 hover:bg-stone-300 text-stone-800"
        } ${isKh ? "font-khmer" : ""}`}
      >
        <Repeat className="w-4 h-4" />
        {reviewing
          ? (isKh ? "លាក់ការសារ" : "Hide reviews")
          : (isKh ? "បន្ថែមការសារនៅថ្ងៃ ១, ៣, ៧" : "Add reviews on day 1, 3, 7")}
      </button>

      <div className={`mt-4 flex items-start gap-2 text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
        <span>
          {isKh
            ? "បច្ចេកទេសសាមញ្ញ៖ បន្ទាប់ពីរៀនមេរៀនថ្មី សារវានៅថ្ងៃបន្ទាប់ បន្ទាប់មក ៣ ថ្ងៃក្រោយ បន្ទាប់មក ១ សប្ដាហ៍ បន្ទាប់មក ២ សប្ដាហ៍។ រាល់ការសារត្រូវការពេលតិចជាង — តែផ្ដល់លទ្ធផលច្រើនជាងការងារ ៣ ម៉ោងនៅយប់មុនពេលប្រឡង។"
            : "A simple recipe: after learning a new lesson, review it the next day, then 3 days later, then 1 week, then 2 weeks. Each review takes less time — and gives more lasting result than a 3-hour cram the night before the exam."}
        </span>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2c. Feynman Technique
// ════════════════════════════════════════════════════════════════════════════

function Feynman({ isKh }: { isKh: boolean }) {
  const steps = [
    {
      n: 1,
      titleEn: "Pick the concept", titleKh: "ជ្រើសរើសគំនិត",
      bodyEn: "Write the topic at the top of a blank page (e.g., 'photosynthesis').",
      bodyKh: "សរសេរប្រធានបទនៅផ្នែកខាងលើនៃក្រដាសទទេ (ឧ. \"រស្មីសំយោគ\")។",
    },
    {
      n: 2,
      titleEn: "Explain it to a child", titleKh: "ពន្យល់វាដល់ក្មេង",
      bodyEn: "Write it out in the simplest words you can — short sentences, no jargon, lots of examples.",
      bodyKh: "សរសេរវាដោយប្រើពាក្យសាមញ្ញបំផុតដែលអ្នកអាច — ប្រយោគខ្លី គ្មានភាសាបច្ចេកទេស និងឧទាហរណ៍ច្រើន។",
    },
    {
      n: 3,
      titleEn: "Find the gaps", titleKh: "រកចន្លោះប្រហោង",
      bodyEn: "Wherever you stumble or fall back on big words, you've found a real gap. Mark it.",
      bodyKh: "កន្លែងដែលអ្នកជាប់គាំង ឬត្រឡប់មកប្រើពាក្យធំៗ — នោះគឺជាចន្លោះពិត។ សម្គាល់វា។",
    },
    {
      n: 4,
      titleEn: "Re-learn & simplify", titleKh: "រៀនឡើងវិញ និងធ្វើឲ្យសាមញ្ញ",
      bodyEn: "Go back to the source, fill the gap, then rewrite the explanation even more simply.",
      bodyKh: "ត្រឡប់ទៅប្រភពវិញ បំពេញចន្លោះ បន្ទាប់មកសរសេរការពន្យល់ឡើងវិញឲ្យសាមញ្ញកាន់តែខ្លាំង។",
    },
  ];

  return (
    <PaperCard className="p-5 sm:p-6">
      <CardHeader
        icon={Lightbulb}
        tint="rose"
        titleEn="The Feynman technique — teach to learn"
        titleKh="វិធីសាស្ត្រ Feynman — បង្រៀនដើម្បីរៀន"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>អ្នកវិទ្យាសាស្ត្រ Richard Feynman បានឈ្នះរង្វាន់ Nobel តែគាត់និយាយថា ប្រសិនបើគាត់មិនអាចពន្យល់រឿងមួយដល់សិស្សថ្នាក់ទី ៣ បាន នោះមានន័យថាគាត់មិនយល់វាពិតៗ។ ការបង្រៀនបង្ខំខួរក្បាលរបស់អ្នកឲ្យ <strong>រៀបចំ</strong> គំនិត — និងបង្ហាញកន្លែងដែលកំពុងបាត់។</>
        ) : (
          <>Physicist Richard Feynman won a Nobel Prize, but he liked to say: if he couldn't explain something to a third-grader, he didn't really understand it. Teaching forces your brain to <strong>organise</strong> the idea — and exposes whatever's still missing.</>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s) => (
          <div key={s.n} className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 flex gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center flex-shrink-0 font-mono">
              {s.n}
            </div>
            <div>
              <h4 className={`font-display font-bold text-stone-900 mb-1 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? s.titleKh : s.titleEn}
              </h4>
              <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? s.bodyKh : s.bodyEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 flex items-start gap-2 text-sm italic text-stone-600 ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
        <Quote className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
        <span>
          {isKh
            ? "“ប្រសិនបើអ្នកមិនអាចពន្យល់វាដោយសាមញ្ញ នោះអ្នកមិនយល់វាបានគ្រប់គ្រាន់ទេ។” — Albert Einstein"
            : "“If you can't explain it simply, you don't understand it well enough.” — Albert Einstein"}
        </span>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Neurodiversity cards
// ════════════════════════════════════════════════════════════════════════════

function NeurodiversityCards({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <DyslexiaCard isKh={isKh} />
      <ADHDCard isKh={isKh} />
      <DyscalculiaCard isKh={isKh} />
    </div>
  );
}

function DyslexiaCard({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />
      <CardHeaderSmall
        icon={BookOpen}
        tint="violet"
        titleEn="Dyslexia"
        titleKh="ពិបាកអាន"
        khTerm="ពិបាកអាន"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ខួរក្បាលដំណើរការអក្សរ និងសំឡេងតាមផ្លូវខុសគ្នា ដែលធ្វើឲ្យការអាន ការសរសេរអក្ខរាវិរុទ្ធ និងការដោះស្រាយពាក្យពិបាក។"
          : "The brain processes letters and sounds along a different route, which makes reading, spelling, and decoding words harder."}
      </p>

      {/* "What it might feel like" demo */}
      <div className="bg-stone-50 rounded-xl border border-stone-200 p-3 mb-3">
        <div className={`text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "អារម្មណ៍ប្រហាក់ប្រហែល៖" : "It might feel like:"}
        </div>
        <div className="text-base text-stone-800 leading-relaxed aol-dyslexia-text">
          The words seem to <span className="aol-jump">jump</span> and <span className="aol-mirror">mirror</span> on the page, and a <span className="aol-blur">blur</span> creeps in.
        </div>
      </div>

      <SymptomList
        isKh={isKh}
        items={[
          { en: "Letters or words appear to swap, jump or blur.", kh: "អក្សរ ឬពាក្យដូចជាប្ដូរ លោត ឬព្រិល។" },
          { en: "Reading is slow and tiring even after lots of practice.", kh: "ការអានយឺត និងធ្វើឲ្យអស់កម្លាំង សូម្បីបន្ទាប់ពីការអនុវត្តច្រើន។" },
          { en: "Spelling is inconsistent — same word written different ways.", kh: "អក្ខរាវិរុទ្ធមិនជាប់លាប់ — ពាក្យតែមួយសរសេរតាមរបៀបផ្សេងៗ។" },
        ]}
      />

      <StrengthChip
        isKh={isKh}
        en="Often paired with strong creativity, big-picture thinking, and visual problem-solving."
        kh="ច្រើនតែភ្ជាប់ជាមួយការច្នៃប្រឌិតខ្លាំង ការគិតរូបភាពធំ និងការដោះស្រាយបញ្ហាតាមរូបភាព។"
      />
    </PaperCard>
  );
}

function ADHDCard({ isKh }: { isKh: boolean }) {
  const [hyperfocus, setHyperfocus] = useState(false);
  return (
    <PaperCard className="p-5 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
      <CardHeaderSmall
        icon={Zap}
        tint="amber"
        titleEn="ADHD"
        titleKh="បញ្ហាការផ្ដោតអារម្មណ៍"
        khTerm="បញ្ហាការផ្ដោតអារម្មណ៍"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "មិនមែនជាការខ្វះការយកចិត្តទុកដាក់ទេ — តែជាការ កំណត់ មិនបានច្បាស់នូវកន្លែងដែលត្រូវផ្ដោតអារម្មណ៍។ កិច្ចការគួរឲ្យធុញធ្លាក់ចេញ ប៉ុន្តែប្រធានបទគួរឲ្យចាប់អារម្មណ៍អាចស្រូបយកអ្នកទាំងស្រុង។"
          : "Not a lack of attention — more like trouble choosing where to point it. Boring tasks slip away, while interesting ones can absorb you completely."}
      </p>

      {/* Focus meter */}
      <div className="bg-stone-50 rounded-xl border border-stone-200 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-stone-500 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "កម្រិតផ្ដោត" : "Focus level"}
          </span>
          <span className="text-xs font-mono font-bold text-stone-800">
            {hyperfocus ? "100%" : "20%"}
          </span>
        </div>
        <div className="h-3 bg-stone-200 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-700 ${hyperfocus ? "bg-emerald-500" : "bg-amber-400"}`}
            style={{ width: hyperfocus ? "100%" : "20%" }}
          />
        </div>
        <button
          onClick={() => setHyperfocus((h) => !h)}
          aria-pressed={hyperfocus}
          className={`w-full text-xs font-bold py-1.5 rounded-full border transition-colors ${
            hyperfocus
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-amber-300 bg-amber-50 text-amber-800"
          } ${isKh ? "font-khmer" : ""}`}
        >
          {hyperfocus
            ? (isKh ? "ប្រធានបទគួរឲ្យចាប់អារម្មណ៍ → Hyperfocus" : "Topic is fascinating → Hyperfocus")
            : (isKh ? "ការងារធុញ → ខួរក្បាលរត់ខ្ចាត់" : "Boring task → mind wanders")}
        </button>
      </div>

      <SymptomList
        isKh={isKh}
        items={[
          { en: "Loses track of time on a fun task; freezes on a boring one.", kh: "ភ្លេចពេលវេលានៅពេលធ្វើកិច្ចការសប្បាយ; ស្ងប់នៅពេលធ្វើកិច្ចការធុញ។" },
          { en: "Difficulty starting tasks even when they matter.", kh: "ពិបាកចាប់ផ្ដើមកិច្ចការ សូម្បីពេលដែលវាសំខាន់។" },
          { en: "Restless — needs to move, fidget, or doodle to think.", kh: "មានចលនាច្រើន — ត្រូវការផ្លាស់ទី ឬគូរលេងដើម្បីគិត។" },
        ]}
      />

      <StrengthChip
        isKh={isKh}
        en="Often paired with energy, originality, and the ability to hyperfocus on what truly matters."
        kh="ច្រើនតែភ្ជាប់ជាមួយថាមពល ភាពច្នៃប្រឌិត និងសមត្ថភាពផ្ដោតអារម្មណ៍ខ្លាំងលើអ្វីដែលសំខាន់ពិតៗ។"
      />
    </PaperCard>
  );
}

function DyscalculiaCard({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
      <CardHeaderSmall
        icon={Calculator}
        tint="sky"
        titleEn="Dyscalculia"
        titleKh="ពិបាកលេខ"
        khTerm="ពិបាកលេខ"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ការដំណើរការនៃលេខ បរិមាណ និងតក្កវិជ្ជាគណិតមានភាពមិនច្បាស់លាស់ — សូម្បីលេខធម្មតាក៏អាចហាក់ដូចជាលើសលប់ ឬស្រស់ស្ថានភាពខុសគ្នា។"
          : "Numbers, quantities, and math logic feel slippery — even ordinary numbers can seem overwhelming or strangely shape-shifting."}
      </p>

      {/* "What it might feel like" — scrambled digits */}
      <div className="bg-stone-50 rounded-xl border border-stone-200 p-3 mb-3 text-center">
        <div className={`text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "អារម្មណ៍ប្រហាក់ប្រហែល៖" : "It might feel like:"}
        </div>
        <div className="font-mono text-2xl font-bold text-stone-800 tracking-wider">
          <span className="aol-jump inline-block">8</span>
          <span className="aol-mirror inline-block mx-1">3</span>
          <span className="aol-blur inline-block">×</span>
          <span className="aol-jump inline-block mx-1">2</span>
          <span className="aol-mirror inline-block">7</span>
          <span className="text-stone-400 ml-2">= ?</span>
        </div>
      </div>

      <SymptomList
        isKh={isKh}
        items={[
          { en: "Trouble telling which number is bigger.", kh: "ពិបាកប្រាប់ថាលេខណាធំជាង។" },
          { en: "Counting with fingers long after others have stopped.", kh: "រាប់នឹងម្រាមដៃយូរក្រោយពេលដែលអ្នកដទៃឈប់រាប់។" },
          { en: "Word-problems feel like a foreign language.", kh: "បញ្ហាលេខពាក្យដូចជាភាសាបរទេស។" },
        ]}
      />

      <StrengthChip
        isKh={isKh}
        en="Often paired with strong language skills, empathy, and intuitive arts ability."
        kh="ច្រើនតែភ្ជាប់ជាមួយជំនាញភាសាខ្លាំង ការយល់ដឹងពីអារម្មណ៍ និងសមត្ថភាពសិល្បៈតាមអារម្មណ៍។"
      />
    </PaperCard>
  );
}

function SymptomList({ isKh, items }: { isKh: boolean; items: { en: string; kh: string }[] }) {
  return (
    <div className="mb-3 flex-1">
      <div className={`text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        {isKh ? "សញ្ញាសាមញ្ញ" : "Common signs"}
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
            <span>{isKh ? it.kh : it.en}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StrengthChip({ isKh, en, kh }: { isKh: boolean; en: string; kh: string }) {
  return (
    <div className={`mt-auto text-xs px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
      <Heart className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 fill-emerald-200 stroke-emerald-700" />
      <span>{isKh ? kh : en}</span>
    </div>
  );
}

function ReassureBanner({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 sm:p-8 shadow-md flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
        <ShieldCheck className="w-6 h-6 text-emerald-100" />
      </div>
      <div>
        <div className={`font-display font-bold text-xl sm:text-2xl mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "នេះមិនមានន័យថាអ្នកមិនឆ្លាតវៃទេ —"
            : "This doesn't mean you aren't smart —"}
        </div>
        <p className={`text-emerald-50 text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "វាគ្រាន់តែមានន័យថាខួរក្បាលរបស់អ្នកត្រូវការវិធីសាស្ត្រខុសគ្នា។ Albert Einstein, Leonardo da Vinci, និង Steven Spielberg សុទ្ធតែមានបញ្ហាការរៀន — ហើយពួកគេបានផ្លាស់ប្ដូរពិភពលោក។ ស្វែងរកវិធីដែលត្រូវនឹងខួរក្បាលរបស់អ្នក សូម្បីវាជាការអានឡើងវិញដោយឮ ការគូររូបភាព ឬការសិក្សាជាមួយមិត្ត។"
            : "It just means your brain needs a different strategy. Einstein, Leonardo da Vinci, and Steven Spielberg all had learning differences — and they reshaped the world. Find the method that fits your brain, whether it's reading aloud, drawing pictures, or studying with a friend."}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. Civilization Timeline + Great Equalizer
// ════════════════════════════════════════════════════════════════════════════

function CivilizationTimeline({ isKh }: { isKh: boolean }) {
  const milestones = [
    {
      icon: Wheat,
      yearsAgo: "10,000",
      titleEn: "Hunter-gatherers settle, learn farming",
      titleKh: "ពួកបរបាញ់រស់នៅជាក្រុម រៀនធ្វើស្រែ",
      bodyEn: "Knowledge of seasons, soil, and seed passed parent to child — the first 'curriculum'.",
      bodyKh: "ចំណេះដឹងពីរដូវកាល ដី និងគ្រាប់ពូជត្រូវបានបញ្ជូនពីឪពុកម្ដាយទៅកូន — \"កម្មវិធីសិក្សា\" ដំបូង។",
      tint: "amber",
    },
    {
      icon: PenLine,
      yearsAgo: "5,000",
      titleEn: "Writing is invented",
      titleKh: "ការសរសេរត្រូវបានបង្កើត",
      bodyEn: "For the first time, a person can teach a stranger they will never meet — across centuries.",
      bodyKh: "ជាលើកដំបូង មនុស្សម្នាក់អាចបង្រៀនអ្នកមិនស្គាល់ដែលគេនឹងមិនជួប — កាត់សតវត្ស។",
      tint: "rose",
    },
    {
      icon: BookOpen,
      yearsAgo: "1,500",
      titleEn: "Schools, universities, libraries",
      titleKh: "សាលា មហាវិទ្យាល័យ បណ្ណាល័យ",
      bodyEn: "Knowledge becomes a public resource. Bologna (1088), Nalanda, Al-Qarawiyyin — places to learn together.",
      bodyKh: "ចំណេះដឹងក្លាយជាធនធានសាធារណៈ។ Bologna (១០៨៨), Nalanda, Al-Qarawiyyin — កន្លែងដើម្បីរៀនជាមួយគ្នា។",
      tint: "violet",
    },
    {
      icon: Factory,
      yearsAgo: "250",
      titleEn: "Industrial Revolution & mass schooling",
      titleKh: "បដិវត្តន៍ឧស្សាហកម្ម និងការអប់រំទូទៅ",
      bodyEn: "Free, universal schooling spreads. Literacy rates jump from 10% to 80% worldwide in two centuries.",
      bodyKh: "ការអប់រំឥតគិតថ្លៃ និងសម្រាប់គ្រប់គ្នាបានរីកសាយ។ អត្រាអក្ខរកម្មកើនពី ១០% ដល់ ៨០% នៅទូទាំងពិភពលោកក្នុងរយៈពេលពីរសតវត្ស។",
      tint: "sky",
    },
    {
      icon: Smartphone,
      yearsAgo: "30",
      titleEn: "The internet — a library in your pocket",
      titleKh: "អ៊ីនធឺណិត — បណ្ណាល័យក្នុងហោប៉ៅរបស់អ្នក",
      bodyEn: "A student in a small Cambodian village can read the same paper as a researcher at MIT — for free.",
      bodyKh: "សិស្សនៅភូមិតូចមួយក្នុងកម្ពុជា អាចអានឯកសារដូចគ្នានឹងអ្នកស្រាវជ្រាវនៅ MIT — ដោយឥតគិតថ្លៃ។",
      tint: "emerald",
    },
    {
      icon: Rocket,
      yearsAgo: isKh ? "ឥឡូវ →" : "now →",
      titleEn: "Space, AI, the next chapter",
      titleKh: "អវកាស AI ជំពូកបន្ទាប់",
      bodyEn: "Each new tool multiplies what an educated young person can build. The next leap is yours to write.",
      bodyKh: "ឧបករណ៍ថ្មីនីមួយៗបង្កើនអ្វីដែលយុវជនដែលបានទទួលការអប់រំអាចបង្កើត។ ការវិវត្តន៍បន្ទាប់គឺសម្រាប់អ្នកសរសេរ។",
      tint: "rose",
    },
  ];

  return (
    <PaperCard className="p-5 sm:p-6">
      <CardHeader
        icon={Globe2}
        tint="emerald"
        titleEn="A short history of how learning shaped us"
        titleKh="ប្រវត្តិសង្ខេបនៃរបៀបដែលការរៀនបានបង្កើតយើង"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-700 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ពេលអ្នកអង្គុយក្នុងថ្នាក់ អ្នកកំពុងបន្តរឿងរ៉ាវ ១០.០០០ ឆ្នាំមក។"
          : "When you sit in a classroom, you're continuing a 10,000-year-old story."}
      </p>

      {/* Vertical timeline — decorative line is a sibling of <ol>, NOT inside it,
          so the list's children remain valid <li> only. */}
      <div className="relative">
        <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-300 via-emerald-300 to-rose-300" aria-hidden="true" />
        <ol className="relative pl-8 sm:pl-10">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const tintBg =
            m.tint === "amber" ? "bg-amber-500"
            : m.tint === "rose" ? "bg-rose-500"
            : m.tint === "violet" ? "bg-violet-500"
            : m.tint === "sky" ? "bg-sky-500"
            :                       "bg-emerald-500";
          return (
            <li key={i} className="relative pb-6 last:pb-0">
              {/* Dot */}
              <div className={`absolute -left-8 sm:-left-10 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${tintBg} flex items-center justify-center ring-4 ring-white shadow-sm`}>
                <Icon className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider text-stone-500 font-mono ${isKh ? "font-khmer tracking-normal" : ""}`}>
                  {isKh ? `${m.yearsAgo} ឆ្នាំមុន` : `${m.yearsAgo} years ago`}
                </span>
              </div>
              <h4 className={`font-display font-bold text-stone-900 mb-1 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? m.titleKh : m.titleEn}
              </h4>
              <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? m.bodyKh : m.bodyEn}
              </p>
            </li>
          );
        })}
        </ol>
      </div>
    </PaperCard>
  );
}

function GreatEqualizer({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 sm:p-6">
      <CardHeader
        icon={GraduationCap}
        tint="emerald"
        titleEn="The Great Equalizer"
        titleKh="អ្នកធ្វើឲ្យស្មើភាព"
        isKh={isKh}
      />
      <p className={`text-base text-stone-800 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>ការអប់រំគឺជារឿងតែមួយគត់ដែលកាត់តាមភាពមាន-ក្រ ព្រំដែន និងថ្នាក់សង្គម។ <strong>សិស្សពូកែម្នាក់នៅខេត្តកំពង់ធំ</strong> ដែលមានសៀវភៅ មិត្ត និងការអនុវត្តគ្រប់គ្រាន់ — អាចចូលរួមដោះស្រាយបញ្ហាដូចគ្នានឹងសិស្សនៅ Tokyo ឬ Stanford ដែរ។</>
        ) : (
          <>Education is the one thing that cuts across wealth, borders, and class. <strong>A motivated student in Kampong Thom</strong> with books, friends, and steady practice — can join the same problems being solved in Tokyo or Stanford.</>
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PromiseChip
          isKh={isKh}
          icon={BookOpen}
          en="Open knowledge"
          kh="ចំណេះដឹងបើកចំហ"
          bodyEn="Khan Academy, Wikipedia, Coursera, free e-books — all in your language."
          bodyKh="Khan Academy, Wikipedia, Coursera, e-book ឥតគិតថ្លៃ — ទាំងអស់ជាភាសារបស់អ្នក។"
        />
        <PromiseChip
          isKh={isKh}
          icon={Heart}
          en="A community of learners"
          kh="សហគមន៍សិស្ស"
          bodyEn="Study together. Teach a younger friend. Ask one good question a day."
          bodyKh="រៀនជាមួយគ្នា។ បង្រៀនមិត្តតូចជាង។ សួរសំណួរល្អមួយរាល់ថ្ងៃ។"
        />
        <PromiseChip
          isKh={isKh}
          icon={Rocket}
          en="A future you choose"
          kh="អនាគតដែលអ្នកជ្រើស"
          bodyEn="Doctor, farmer-engineer, teacher, founder — the door is the same for every brain that practises."
          bodyKh="គ្រូពេទ្យ វិស្វករកសិកម្ម គ្រូ អ្នកបង្កើត — ទ្វារគឺដូចគ្នាសម្រាប់ខួរក្បាលគ្រប់ដែលអនុវត្ត។"
        />
      </div>
    </PaperCard>
  );
}

function PromiseChip({
  isKh, icon: Icon, en, kh, bodyEn, bodyKh,
}: {
  isKh: boolean; icon: typeof BookOpen;
  en: string; kh: string; bodyEn: string; bodyKh: string;
}) {
  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-emerald-700" />
        <h5 className={`font-display font-bold text-stone-900 text-sm ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h5>
      </div>
      <p className={`text-xs text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tiny shared bits
// ════════════════════════════════════════════════════════════════════════════

function CardHeader({
  icon: Icon, tint, titleEn, titleKh, isKh,
}: {
  icon: typeof BookOpen;
  tint: "emerald" | "amber" | "rose";
  titleEn: string; titleKh: string; isKh: boolean;
}) {
  const cls =
    tint === "emerald" ? "bg-emerald-100 text-emerald-700"
    : tint === "amber" ? "bg-amber-100 text-amber-700"
    : "bg-rose-100 text-rose-700";
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg ${cls} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`font-display font-bold text-xl text-stone-900 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h3>
    </div>
  );
}

function CardHeaderSmall({
  icon: Icon, tint, titleEn, titleKh, khTerm, isKh,
}: {
  icon: typeof BookOpen;
  tint: "violet" | "amber" | "sky";
  titleEn: string; titleKh: string; khTerm: string; isKh: boolean;
}) {
  const cls =
    tint === "violet" ? "bg-violet-100 text-violet-700"
    : tint === "amber" ? "bg-amber-100 text-amber-700"
    : "bg-sky-100 text-sky-700";
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg ${cls} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className={`font-display font-bold text-lg text-stone-900 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? titleKh : titleEn}
        </h3>
        {!isKh && (
          <div className="text-xs font-khmer text-stone-500 leading-tight">{khTerm}</div>
        )}
      </div>
    </div>
  );
}

function HowToStep({ n, en, kh, isKh }: { n: number; en: string; kh: string; isKh: boolean }) {
  return (
    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex gap-3">
      <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 font-mono">
        {n}
      </div>
      <p className={`text-sm text-stone-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? kh : en}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  // Pre-flight: no animation when prefers-reduced-motion is on.
  return (
    <style>{`
      .aol-text-leaf {
        background: linear-gradient(180deg, #047857 0%, #065f46 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      @keyframes aol-float-kf {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
      .aol-float { animation: aol-float-kf 3.6s ease-in-out infinite; }

      @keyframes aol-jump-kf {
        0%, 100% { transform: translateY(0) rotate(0); }
        25%      { transform: translateY(-3px) rotate(-3deg); }
        75%      { transform: translateY(2px) rotate(2deg); }
      }
      .aol-jump  { animation: aol-jump-kf 1.6s ease-in-out infinite; display: inline-block; }
      .aol-mirror {
        display: inline-block;
        animation: aol-jump-kf 2.1s ease-in-out infinite;
        transform: scaleX(-1);
      }
      .aol-blur  {
        display: inline-block;
        animation: aol-blur-kf 2.4s ease-in-out infinite;
        filter: blur(0.6px);
      }
      @keyframes aol-blur-kf {
        0%, 100% { filter: blur(0.4px); }
        50%      { filter: blur(1.6px); }
      }

      @media (prefers-reduced-motion: reduce) {
        .aol-float, .aol-jump, .aol-mirror, .aol-blur { animation: none !important; }
        .aol-blur { filter: none !important; }
      }
    `}</style>
  );
}

