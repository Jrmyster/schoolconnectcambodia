import { useRef, useState, type KeyboardEvent } from "react";
import {
  Stethoscope,
  Heart,
  Quote,
  Sparkles,
  GraduationCap,
  BookOpen,
  Microscope,
  Activity,
  Building2,
  Briefcase,
  Baby,
  Brain,
  Scissors,
  Siren,
  ChevronRight,
  Clock,
  Plus,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Pathway to Medicine — ផ្លូវទៅកាន់វិជ្ជាជីវៈពេទ្យ
//
//  Sections:
//    1. Hero + Osler quote
//    2. The Timeline of a Doctor — 4 phases (vertical stepper)
//    3. Choosing a Specialty — interactive specialty cards
//    4. Closing encouragement
//
//  Aesthetic: clinical white + stethoscope blue (sky-600/700)
//             + emergency cross red (rose-600) accents.
// ════════════════════════════════════════════════════════════════════════════

export default function PathwayToMedicinePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-800 overflow-hidden">
      <ScopedStyles />
      <ClinicalBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-800 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Stethoscope className="w-3.5 h-3.5" />
          {isKh ? "មគ្គុទ្ទេសក៍វិជ្ជាជីវៈ · វេជ្ជសាស្ត្រ" : "Career Guide · Medicine"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>ផ្លូវទៅកាន់ <span className="ptm-text-blue">វិជ្ជាជីវៈពេទ្យ</span></>
          ) : (
            <>The Pathway to <span className="ptm-text-blue">Medicine</span></>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "វិជ្ជាជីវៈពេទ្យគឺជាដំណើរវែងអស់ ១០ ទៅ ១៥ ឆ្នាំ — ប៉ុន្តែវាជាដំណើរដែលអាចគ្រោងទុកបាន។ មគ្គុទ្ទេសក៍នេះបង្ហាញដំណាក់កាលនីមួយៗ និងជួយអ្នកស្គាល់ឯកទេសផ្សេងៗ ដើម្បីស្វែងរកកន្លែងដែលអ្នកអាចបម្រើប្រទេសកម្ពុជាបានល្អបំផុត។"
            : "Becoming a doctor is a 10-to-15-year journey — but it's a journey you can plan for, one phase at a time. This guide walks you through every step and helps you discover the specialty where you can serve Cambodia best."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-sky-300 select-none">
          <Stethoscope className="w-7 h-7 ptm-float" style={{ animationDelay: "0s" }} />
          <Heart className="w-7 h-7 ptm-float" style={{ animationDelay: "0.6s" }} />
          <Plus className="w-7 h-7 ptm-float" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── Osler Quote Card ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <blockquote className="relative bg-gradient-to-r from-sky-50 via-white to-rose-50 border-l-4 border-sky-600 rounded-r-2xl p-5 sm:p-6 shadow-sm">
          <Quote className="absolute top-3 right-4 w-8 h-8 text-sky-200" aria-hidden="true" />
          <p className={`text-base sm:text-lg text-slate-800 italic leading-relaxed ${isKh ? "font-khmer not-italic leading-loose" : "font-serif"}`}>
            {isKh
              ? "“វេជ្ជសាស្ត្រគឺជាវិទ្យាសាស្ត្រនៃភាពមិនច្បាស់លាស់ និងជាសិល្បៈនៃប្រូបាប៊ីលីតេ។”"
              : "“Medicine is a science of uncertainty and an art of probability.”"}
          </p>
          <footer className={`mt-2 text-sm font-bold text-sky-800 ${isKh ? "font-khmer" : ""}`}>
            — William Osler
          </footer>
        </blockquote>
      </div>

      {/* ── Section 1: The Journey ───────────────────────────────────── */}
      <Section
        id="journey"
        eyebrowEn="01 · The Journey"
        eyebrowKh="០១ · ដំណើរ"
        titleEn="The timeline of a doctor"
        titleKh="ពេលវេលានៃវេជ្ជបណ្ឌិត"
        descEn="From the first biology class in high school to your first independent patient, the path has four well-defined phases. Each one builds on the last."
        descKh="ចាប់ពីថ្នាក់ជីវវិទ្យាដំបូងនៅវិទ្យាល័យ ដល់អ្នកជំងឺឯករាជ្យដំបូងរបស់អ្នក ផ្លូវនេះមាន ៤ ដំណាក់កាលច្បាស់លាស់។ ដំណាក់កាលនីមួយៗបង្កើតលើដំណាក់កាលមុន។"
        isKh={isKh}
      >
        <Timeline isKh={isKh} />
      </Section>

      {/* ── Section 2: Specialties ───────────────────────────────────── */}
      <Section
        id="specialties"
        eyebrowEn="02 · The Sorting Hat"
        eyebrowKh="០២ · ការជ្រើសរើសផ្លូវ"
        titleEn="Choosing a specialty"
        titleKh="ការជ្រើសរើសឯកទេស"
        descEn="During your clinical rotations you'll meet every kind of medicine. Tap a card to see what each specialty asks of you — and where rural Cambodia needs them most."
        descKh="ក្នុងវេនព្យាបាលរបស់អ្នក អ្នកនឹងជួបនឹងឯកទេសវេជ្ជសាស្ត្រគ្រប់ប្រភេទ។ ចុចលើកាតមួយដើម្បីមើលនូវអ្វីដែលឯកទេសនីមួយៗទាមទារពីអ្នក — និងកន្លែងដែលជនបទកម្ពុជាត្រូវការពួកគេច្រើនបំផុត។"
        isKh={isKh}
      >
        <SpecialtyDeck isKh={isKh} />
      </Section>

      {/* ── Closing ─────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ជោគជ័យរបស់អ្នកជំងឺម្នាក់ៗ ចាប់ផ្ដើមពីការសម្រេចចិត្តរបស់សិស្សម្នាក់នៅថ្ងៃនេះ។”"
            : "“The recovery of a patient tomorrow begins with the decision of a student today.”"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  id?: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function ClinicalBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #fff5f5 100%)" }} />
      {/* Subtle floating tints */}
      <div className="absolute top-32 -left-20 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="absolute top-[40%] -right-16 w-80 h-80 rounded-full bg-rose-100/40 blur-3xl" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-sky-100/30 blur-3xl" />
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .ptm-text-blue { color: #0369a1; }
      @keyframes ptm-float {
        0%,100% { transform: translateY(0); }
        50%     { transform: translateY(-6px); }
      }
      .ptm-float { animation: ptm-float 3.2s ease-in-out infinite; }
      @keyframes ptm-pulse-cross {
        0%,100% { opacity: 0.85; }
        50%     { opacity: 1; transform: scale(1.06); }
      }
      .ptm-pulse { animation: ptm-pulse-cross 2.4s ease-in-out infinite; }
    `}</style>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Timeline — vertical stepper of 4 phases
// ════════════════════════════════════════════════════════════════════════════

type Phase = {
  key: string;
  numberLabel: string;
  yearsEn: string;
  yearsKh: string;
  icon: typeof GraduationCap;
  tint: "sky" | "indigo" | "violet" | "rose";
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  bodyEn: string;
  bodyKh: string;
  bullets: { en: string; kh: string }[];
};

const PHASES: Phase[] = [
  {
    key: "highschool",
    numberLabel: "01",
    yearsEn: "Years 1–3",
    yearsKh: "ឆ្នាំទី ១–៣",
    icon: BookOpen,
    tint: "sky",
    titleEn: "High School",
    titleKh: "វិទ្យាល័យ",
    subtitleEn: "Building the foundation",
    subtitleKh: "បង្កើតមូលដ្ឋាន",
    bodyEn:
      "Everything starts here. Strong grades in Biology, Chemistry, and Physics open the door — and strong English lets you read the textbooks the rest of the world uses.",
    bodyKh:
      "អ្វីៗទាំងអស់ចាប់ផ្ដើមនៅទីនេះ។ ពិន្ទុល្អក្នុងជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យាបើកទ្វារ — ហើយភាសាអង់គ្លេសល្អ អនុញ្ញាតឱ្យអ្នកអានសៀវភៅសិក្សាដែលពិភពលោកប្រើ។",
    bullets: [
      { en: "Master Biology, Chemistry, Physics", kh: "ឯកទេស ជីវវិទ្យា គីមីវិទ្យា រូបវិទ្យា" },
      { en: "Practice English daily — even 15 min", kh: "ហ្វឹកហាត់ភាសាអង់គ្លេសរាល់ថ្ងៃ — សូម្បីតែ ១៥ នាទី" },
      { en: "Build study habits that last", kh: "បង្កើតទម្លាប់សិក្សាដែលនៅស្ថិតស្ថេរ" },
    ],
  },
  {
    key: "undergrad",
    numberLabel: "02",
    yearsEn: "4 Years",
    yearsKh: "៤ ឆ្នាំ",
    icon: GraduationCap,
    tint: "indigo",
    titleEn: "Undergraduate / Pre-Med",
    titleKh: "បរិញ្ញាបត្រ / មុនវេជ្ជសាស្ត្រ",
    subtitleEn: "University level",
    subtitleKh: "កម្រិតសាកលវិទ្យាល័យ",
    bodyEn:
      "You don't have to major in Biology — many great doctors studied music, history, or economics. What you must do is complete the core pre-med sciences and pass the entrance exams.",
    bodyKh:
      "អ្នកមិនចាំបាច់រៀនជំនាញសំខាន់ជាជីវវិទ្យាទេ — វេជ្ជបណ្ឌិតល្អៗជាច្រើនបានសិក្សាតន្ត្រី ប្រវត្តិសាស្ត្រ ឬសេដ្ឋកិច្ច។ អ្វីដែលអ្នកត្រូវធ្វើគឺបញ្ចប់វិទ្យាសាស្ត្រមូលដ្ឋានមុនវេជ្ជសាស្ត្រ និងប្រឡងចូល។",
    bullets: [
      { en: "Required: Organic Chemistry, Biochemistry, Physics", kh: "តម្រូវ៖ គីមីសរីរាង្គ ជីវគីមី រូបវិទ្យា" },
      { en: "Pass the medical entrance exam", kh: "ប្រឡងចូលសាលាពេទ្យឱ្យជាប់" },
      { en: "Volunteer at a clinic — get a feel for the work", kh: "ស្ម័គ្រចិត្តនៅគ្លីនិក — ដើម្បីស្វែងយល់ការងារ" },
    ],
  },
  {
    key: "medschool",
    numberLabel: "03",
    yearsEn: "4 Years",
    yearsKh: "៤ ឆ្នាំ",
    icon: Microscope,
    tint: "violet",
    titleEn: "Medical School",
    titleKh: "សាលាពេទ្យ",
    subtitleEn: "Pre-clinical + clinical rotations",
    subtitleKh: "មុនព្យាបាល + វេនព្យាបាល",
    bodyEn:
      "Years 1 & 2 are book-learning — Anatomy, Pharmacology, Pathology, Neurology. It's like drinking from a firehose. Years 3 & 4 you're in the hospital: delivering babies, assisting in surgeries, and rotating through every ward to find what you love.",
    bodyKh:
      "ឆ្នាំ ១ & ២ គឺការសិក្សាតាមសៀវភៅ — កាយវិភាគ ឱសថវិទ្យា រោគវិទ្យា ប្រសាទវិទ្យា។ វាដូចជាការផឹកទឹកពីបំពង់ភ្លើង។ ឆ្នាំ ៣ & ៤ អ្នកនៅក្នុងមន្ទីរពេទ្យ៖ ជួយសម្រាលកូន ជំនួយក្នុងការវះកាត់ និងបង្វិលឆ្លងកាត់រាល់ផ្នែកដើម្បីរកអ្វីដែលអ្នកស្រឡាញ់។",
    bullets: [
      { en: "Years 1–2: Anatomy · Pharmacology · Pathology · Neurology", kh: "ឆ្នាំ ១–២៖ កាយវិភាគ · ឱសថវិទ្យា · រោគវិទ្យា · ប្រសាទវិទ្យា" },
      { en: "Years 3–4: Hospital rotations across every ward", kh: "ឆ្នាំ ៣–៤៖ វេនមន្ទីរពេទ្យឆ្លងកាត់គ្រប់ផ្នែក" },
      { en: "Find the specialty that excites you most", kh: "រកឯកទេសដែលធ្វើឲ្យអ្នករំភើបបំផុត" },
    ],
  },
  {
    key: "residency",
    numberLabel: "04",
    yearsEn: "3–7 Years",
    yearsKh: "៣–៧ ឆ្នាំ",
    icon: Building2,
    tint: "rose",
    titleEn: "Residency",
    titleKh: "កម្មសិក្សាឯកទេស",
    subtitleEn: "Training under experts",
    subtitleKh: "ការហ្វឹកហាត់ក្រោមអ្នកជំនាញ",
    bodyEn:
      "You are officially a doctor — but you're not finished. Residency is where you learn your specific job, working long hospital shifts under the eyes of experienced specialists. The hardest years, and the most rewarding.",
    bodyKh:
      "អ្នកគឺជាវេជ្ជបណ្ឌិតផ្លូវការ — ប៉ុន្តែអ្នកមិនទាន់បានបញ្ចប់ទេ។ កម្មសិក្សាឯកទេសគឺជាកន្លែងដែលអ្នករៀននូវការងារជាក់លាក់របស់អ្នក ធ្វើការបន្ថែមម៉ោងវែងនៅមន្ទីរពេទ្យក្រោមការមើលថែរបស់អ្នកឯកទេសដែលមានបទពិសោធន៍។ ឆ្នាំពិបាកបំផុត និងផ្ដល់រង្វាន់បំផុត។",
    bullets: [
      { en: "You ARE the doctor — but still supervised", kh: "អ្នកគឺជាវេជ្ជបណ្ឌិត — ប៉ុន្តែនៅតែស្ថិតក្រោមការត្រួតពិនិត្យ" },
      { en: "Length depends on specialty (3 family / 7 neurosurgery)", kh: "រយៈពេលអាស្រ័យលើឯកទេស (៣ ឆ្នាំសម្រាប់ពេទ្យគ្រួសារ / ៧ ឆ្នាំសម្រាប់វះកាត់ខួរ)" },
      { en: "After this: independent practice", kh: "ក្រោយនេះ៖ ការអនុវត្តដោយឯករាជ្យ" },
    ],
  },
];

const TINT_MAP = {
  sky: {
    ring: "border-sky-300",
    bg: "bg-sky-50",
    icon: "bg-sky-100 text-sky-700",
    bar: "bg-sky-500",
    chip: "bg-sky-100 text-sky-800 border-sky-200",
    rail: "bg-sky-300",
  },
  indigo: {
    ring: "border-indigo-300",
    bg: "bg-indigo-50",
    icon: "bg-indigo-100 text-indigo-700",
    bar: "bg-indigo-500",
    chip: "bg-indigo-100 text-indigo-800 border-indigo-200",
    rail: "bg-indigo-300",
  },
  violet: {
    ring: "border-violet-300",
    bg: "bg-violet-50",
    icon: "bg-violet-100 text-violet-700",
    bar: "bg-violet-500",
    chip: "bg-violet-100 text-violet-800 border-violet-200",
    rail: "bg-violet-300",
  },
  rose: {
    ring: "border-rose-300",
    bg: "bg-rose-50",
    icon: "bg-rose-100 text-rose-700",
    bar: "bg-rose-500",
    chip: "bg-rose-100 text-rose-800 border-rose-200",
    rail: "bg-rose-300",
  },
} as const;

function Timeline({ isKh }: { isKh: boolean }) {
  return (
    <div className="relative">
      {/* Vertical rail (desktop) */}
      <div className="hidden sm:block absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-sky-300 via-violet-300 to-rose-300" aria-hidden="true" />

      <ol className="space-y-6">
        {PHASES.map((p, idx) => {
          const Icon = p.icon;
          const tint = TINT_MAP[p.tint];
          return (
            <li key={p.key} className="relative">
              <div className="flex gap-4 sm:gap-5">
                {/* Marker */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-14 h-14 rounded-full ring-4 ring-white ${tint.icon} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 bg-white rounded-2xl border-2 ${tint.ring} shadow-sm overflow-hidden`}>
                  <div className={`h-1 ${tint.bar}`} />
                  <div className="p-5 sm:p-6">
                    {/* Phase header row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-xs font-mono font-bold tracking-widest text-slate-400`}>
                        {isKh ? `ដំណាក់កាល ${p.numberLabel}` : `PHASE ${p.numberLabel}`}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${tint.chip} ${isKh ? "font-khmer" : ""}`}>
                        <Clock className="inline w-3 h-3 mr-1 -mt-0.5" />
                        {isKh ? p.yearsKh : p.yearsEn}
                      </span>
                    </div>

                    <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {isKh ? p.titleKh : p.titleEn}
                    </h3>
                    <p className={`text-sm text-slate-500 mb-4 ${isKh ? "font-khmer" : ""}`}>
                      {isKh ? p.subtitleKh : p.subtitleEn}
                    </p>

                    <p className={`text-sm text-slate-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                      {isKh ? p.bodyKh : p.bodyEn}
                    </p>

                    <ul className="space-y-2">
                      {p.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 text-sky-600`} />
                          <span className={isKh ? "font-khmer leading-loose" : ""}>
                            {isKh ? b.kh : b.en}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Down-arrow connector (mobile + desktop) */}
              {idx < PHASES.length - 1 && (
                <div className="flex justify-start sm:justify-start ml-[20px] my-1" aria-hidden="true">
                  <div className="w-3.5 h-3.5 rotate-45 border-r-2 border-b-2 border-slate-300" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Specialty Deck — interactive flashcard selector
// ════════════════════════════════════════════════════════════════════════════

type Specialty = {
  key: string;
  icon: typeof Heart;
  tint: "rose" | "sky" | "indigo" | "amber";
  nameEn: string;
  nameKh: string;
  residencyEn: string;
  residencyKh: string;
  forYouEn: string;
  forYouKh: string;
  workdayEn: string;
  workdayKh: string;
  ruralEn: string;
  ruralKh: string;
};

const SPECIALTIES: Specialty[] = [
  {
    key: "family",
    icon: Baby,
    tint: "sky",
    nameEn: "Family Medicine / Pediatrics",
    nameKh: "ពេទ្យគ្រួសារ / កុមារ",
    residencyEn: "3-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣ ឆ្នាំ",
    forYouEn: "You love long-term relationships with patients and preventative care.",
    forYouKh: "អ្នកស្រឡាញ់ទំនាក់ទំនងរយៈពេលវែងជាមួយអ្នកជំងឺ និងការព្យាបាលបង្ការ។",
    workdayEn: "Vaccinating babies, treating fevers, watching kids grow up over 20 years, catching diabetes and high blood pressure early.",
    workdayKh: "ចាក់វ៉ាក់សាំងដល់ទារក ព្យាបាលគ្រុនក្ដៅ មើលកុមារធំឡើងក្នុងរយៈពេល ២០ ឆ្នាំ ស្វែងរកជំងឺទឹកនោមផ្អែម និងសម្ពាធឈាមខ្ពស់ដំបូង។",
    ruralEn: "The most-needed doctor in rural Cambodia. One family doctor can serve thousands.",
    ruralKh: "វេជ្ជបណ្ឌិតដែលត្រូវការច្រើនបំផុតនៅជនបទកម្ពុជា។ វេជ្ជបណ្ឌិតគ្រួសារមួយនាក់អាចបម្រើមនុស្សរាប់ពាន់នាក់។",
  },
  {
    key: "internal",
    icon: Brain,
    tint: "indigo",
    nameEn: "Internal Medicine",
    nameKh: "ពេទ្យផ្ទៃក្នុង",
    residencyEn: "3-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣ ឆ្នាំ",
    forYouEn: "You love solving complex diagnostic puzzles for adults.",
    forYouKh: "អ្នកស្រឡាញ់ដោះស្រាយល្បែងផ្គុំធ្វើរោគវិនិច្ឆ័យស្មុគស្មាញសម្រាប់មនុស្សពេញវ័យ។",
    workdayEn: "Patients arrive with confusing combinations of symptoms — your job is to be the detective who finds the underlying disease.",
    workdayKh: "អ្នកជំងឺមកជាមួយការផ្សំរោគសញ្ញាច្របូកច្របល់ — ការងាររបស់អ្នកគឺជាអ្នកស៊ើបអង្កេតដែលស្វែងរកជំងឺមូលដ្ឋាន។",
    ruralEn: "Provincial hospitals depend on internists to manage stroke, heart disease, and complex infections.",
    ruralKh: "មន្ទីរពេទ្យខេត្តពឹងផ្អែកលើពេទ្យផ្ទៃក្នុងដើម្បីគ្រប់គ្រងជំងឺដាច់សរសៃខួរ ជំងឺបេះដូង និងការឆ្លងស្មុគស្មាញ។",
  },
  {
    key: "surgery",
    icon: Scissors,
    tint: "amber",
    nameEn: "General Surgery",
    nameKh: "វះកាត់ទូទៅ",
    residencyEn: "5-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៥ ឆ្នាំ",
    forYouEn: "You love working with your hands, anatomy, and immediate, physical fixes.",
    forYouKh: "អ្នកស្រឡាញ់ការងារដោយដៃ កាយវិភាគ និងការជួសជុលរូបវន្តភ្លាមៗ។",
    workdayEn: "Appendectomies, gallbladder removals, hernia repairs — taking a problem out and watching the patient walk home a few days later.",
    workdayKh: "ការវះកាត់ពោះវៀនទ្រូ ការដកថង់ទឹកប្រមាត់ ការជួសជុលហ៊ែរនៀ — យកបញ្ហាចេញ ហើយមើលអ្នកជំងឺដើរត្រឡប់ទៅផ្ទះវិញពីរបីថ្ងៃក្រោយ។",
    ruralEn: "Trauma from road accidents and farming injuries makes general surgeons critical outside Phnom Penh.",
    ruralKh: "របួសពីគ្រោះថ្នាក់ផ្លូវ និងការរបួសក្នុងកសិកម្ម ធ្វើឲ្យពេទ្យវះកាត់ទូទៅសំខាន់ខ្លាំងនៅក្រៅទីក្រុងភ្នំពេញ។",
  },
  {
    key: "emergency",
    icon: Siren,
    tint: "rose",
    nameEn: "Emergency Medicine",
    nameKh: "វេជ្ជសាស្ត្របន្ទាន់",
    residencyEn: "3–4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣–៤ ឆ្នាំ",
    forYouEn: "You thrive in chaos, think fast, and want to save lives in critical moments.",
    forYouKh: "អ្នករីកចម្រើនក្នុងភាពច្របូកច្របល់ គិតលឿន និងចង់សង្គ្រោះជីវិតក្នុងពេលវិបត្តិ។",
    workdayEn: "A car-crash patient arrives bleeding. A child with a high fever next. A heart attack after that. You stabilise everyone — then hand them to the right specialist.",
    workdayKh: "អ្នកជំងឺគ្រោះថ្នាក់ឡានមួយមកដល់ដោយហូរឈាម។ កុមារមួយដែលមានគ្រុនក្ដៅខ្ពស់បន្ទាប់។ ការគាំងបេះដូងបន្ទាប់។ អ្នកធ្វើឲ្យអ្នកគ្រប់គ្នាមានស្ថេរភាព — បន្ទាប់មកប្រគល់ពួកគេទៅកាន់អ្នកឯកទេសត្រឹមត្រូវ។",
    ruralEn: "Cambodia's growing road network means every provincial hospital needs an ER team that can act in the first 'golden hour'.",
    ruralKh: "បណ្តាញផ្លូវដែលកំពុងរីកលូតលាស់របស់កម្ពុជា មានន័យថា មន្ទីរពេទ្យខេត្តនីមួយៗត្រូវការក្រុមបន្ទាន់ដែលអាចដំណើរការក្នុង 'ម៉ោងមាស' ដំបូង។",
  },
];

const SPEC_TINT = {
  sky: { border: "border-sky-300", bg: "bg-sky-50", chip: "bg-sky-600 text-white", icon: "bg-sky-600 text-white" },
  indigo: { border: "border-indigo-300", bg: "bg-indigo-50", chip: "bg-indigo-600 text-white", icon: "bg-indigo-600 text-white" },
  amber: { border: "border-amber-300", bg: "bg-amber-50", chip: "bg-amber-600 text-white", icon: "bg-amber-600 text-white" },
  rose: { border: "border-rose-400", bg: "bg-rose-50", chip: "bg-rose-600 text-white", icon: "bg-rose-600 text-white" },
} as const;

function SpecialtyDeck({ isKh }: { isKh: boolean }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const active = SPECIALTIES[selectedIdx];
  const ActiveIcon = active.icon;
  const tint = SPEC_TINT[active.tint];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(idx: number) {
    const next = (idx + SPECIALTIES.length) % SPECIALTIES.length;
    setSelectedIdx(next);
    // focus on the next tick so React commits the new tabIndex first
    requestAnimationFrame(() => tabRefs.current[next]?.focus());
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, idx: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(idx + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(idx - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(SPECIALTIES.length - 1);
        break;
    }
  }

  return (
    <div className="space-y-4">
      {/* Selector chips (acts as flashcard tabs + dropdown on mobile) */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label={isKh ? "ឯកទេសវេជ្ជសាស្ត្រ" : "Medical specialties"}
        className="flex flex-wrap gap-2"
      >
        {SPECIALTIES.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === selectedIdx;
          const t = SPEC_TINT[s.tint];
          return (
            <button
              key={s.key}
              ref={(el) => { tabRefs.current[idx] = el; }}
              id={`ptm-tab-${s.key}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`ptm-tabpanel-${s.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelectedIdx(idx)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                isActive
                  ? `${t.chip} border-transparent shadow-md`
                  : `bg-white text-slate-700 ${t.border} hover:bg-slate-50`
              } ${isKh ? "font-khmer" : ""}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              <span>{isKh ? s.nameKh : s.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active card */}
      <div
        id={`ptm-tabpanel-${active.key}`}
        role="tabpanel"
        aria-labelledby={`ptm-tab-${active.key}`}
        tabIndex={0}
        className={`bg-white rounded-2xl border-2 ${tint.border} overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500`}
      >
        {/* Top stripe with cross icon */}
        <div className={`flex items-center justify-between px-5 py-3 ${tint.bg} border-b ${tint.border}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${tint.icon} flex items-center justify-center shadow-sm`}>
              <ActiveIcon className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className={`font-display font-bold text-lg sm:text-xl text-slate-900 ${isKh ? "font-khmer leading-tight" : ""}`}>
                {isKh ? active.nameKh : active.nameEn}
              </h3>
              <p className={`text-xs font-mono font-bold tracking-wide text-slate-500 ${isKh ? "font-khmer tracking-normal" : ""}`}>
                <Clock className="inline w-3 h-3 mr-1 -mt-0.5" />
                {isKh ? active.residencyKh : active.residencyEn}
              </p>
            </div>
          </div>
          <Plus className="w-7 h-7 text-rose-500 ptm-pulse" aria-hidden="true" />
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 grid md:grid-cols-3 gap-4">
          <Field
            labelEn="If this is for you…"
            labelKh="បើនេះសម្រាប់អ្នក…"
            valueEn={active.forYouEn}
            valueKh={active.forYouKh}
            tint="sky"
            icon={Heart}
            isKh={isKh}
          />
          <Field
            labelEn="A typical workday"
            labelKh="ថ្ងៃធ្វើការធម្មតា"
            valueEn={active.workdayEn}
            valueKh={active.workdayKh}
            tint="indigo"
            icon={Activity}
            isKh={isKh}
          />
          <Field
            labelEn="Why Cambodia needs you"
            labelKh="ហេតុអ្វីកម្ពុជាត្រូវការអ្នក"
            valueEn={active.ruralEn}
            valueKh={active.ruralKh}
            tint="rose"
            icon={Briefcase}
            isKh={isKh}
          />
        </div>
      </div>

      {/* Helper note */}
      <p className={`text-xs text-slate-500 italic text-center ${isKh ? "font-khmer not-italic" : ""}`}>
        {isKh
          ? "ចុចលើឯកទេសខាងលើដើម្បីប្ដូរកាត។ ឯកទេសដែលបានបង្ហាញនៅទីនេះគឺជាកន្លែងចាប់ផ្ដើមតែប៉ុណ្ណោះ — មានឯកទេសច្រើនជាង ៤០ នៅក្នុងវេជ្ជសាស្ត្រ។"
          : "Tap a specialty above to flip the card. The four shown here are just a starting point — there are over 40 specialties in medicine."}
      </p>
    </div>
  );
}

function Field({
  labelEn, labelKh, valueEn, valueKh, tint, icon: Icon, isKh,
}: {
  labelEn: string; labelKh: string;
  valueEn: string; valueKh: string;
  tint: "sky" | "indigo" | "rose";
  icon: typeof Heart;
  isKh: boolean;
}) {
  const colour =
    tint === "sky" ? "text-sky-700" : tint === "indigo" ? "text-indigo-700" : "text-rose-700";
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider ${colour} ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
        {isKh ? labelKh : labelEn}
      </div>
      <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? valueKh : valueEn}
      </p>
    </div>
  );
}
