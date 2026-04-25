import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
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
  Search,
  X,
  ShieldAlert,
  ShieldCheck,
  Syringe,
  Hand,
  ScanLine,
  Users,
  Dna,
  Atom,
  Flower2,
  Eye,
  Ribbon,
  PersonStanding,
  Smile,
  Zap,
  Droplet,
  MapPin,
  Globe2,
  Trophy,
  Award,
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

      {/* ── Featured Module: MCAT Preparation ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/pathway-to-medicine/mcat"
          className="group block relative overflow-hidden rounded-2xl bg-white border border-emerald-200 shadow-[0_20px_60px_-25px_rgba(22,163,74,0.4)] hover:shadow-[0_25px_70px_-15px_rgba(22,163,74,0.55)] transition-shadow"
          data-testid="link-mcat-module"
        >
          {/* Soft study-blue & focus-green ambient glow */}
          <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-emerald-100/70 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-sky-100/80 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative p-6 sm:p-8 grid sm:grid-cols-[auto,1fr,auto] items-center gap-5">
            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 border border-emerald-300/60 text-emerald-700 shadow-sm">
              <Brain className="w-8 h-8" aria-hidden="true" />
            </div>

            <div>
              <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-emerald-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                {isKh ? "ម៉ូឌុលត្រៀមប្រឡង · MCAT" : "Featured Module · MCAT Preparation"}
              </div>
              <h3 className={`text-slate-900 font-display font-bold text-xl sm:text-2xl mb-1.5 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "ការប្រឡង MCAT៖ ម៉ារ៉ាតុងវេជ្ជសាស្ត្រ" : "The MCAT: The Medical Marathon"}
              </h3>
              <p className={`text-slate-700 text-sm max-w-2xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ការប្រឡងរយៈពេល ៧.៥ ម៉ោងដែលកំណត់ការចូលរៀននៅសាកលវិទ្យាល័យពេទ្យអាមេរិក កាណាដា និងអូស្ត្រាលី — របៀបដែលវាសាងសង់ឡើង វិធីសាស្ត្រសិក្សាដ៏ត្រឹមត្រូវ និងពេលវេលា ៣០០–៥០០ ម៉ោងនៃការត្រៀម។"
                  : "The 7.5-hour exam that decides admission to medical schools in the US, Canada and Australia — how the test is built, the right way to study (active recall), and the 300–500 hour preparation timeline."}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-transform text-sm font-semibold">
              <span className={isKh ? "font-khmer" : ""}>{isKh ? "បើកម៉ូឌុល" : "Open module"}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </Link>
      </section>

      {/* ── Featured Deep-Dive: Radiology ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/pathway-to-medicine/radiology"
          className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 border border-cyan-500/30 shadow-[0_20px_60px_-20px_rgba(34,211,238,0.35)] hover:shadow-[0_25px_70px_-15px_rgba(34,211,238,0.5)] transition-shadow"
          data-testid="link-radiology-module"
        >
          {/* Soft X-ray glow */}
          <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative p-6 sm:p-8 grid sm:grid-cols-[auto,1fr,auto] items-center gap-5">
            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <ScanLine className="w-8 h-8" />
            </div>

            <div>
              <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-cyan-300 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
                <Sparkles className="w-3 h-3" />
                {isKh ? "ម៉ូឌុលឯកទេសដ៏ជ្រៅ · វិទ្យុសាស្ត្រ" : "Featured Deep-Dive · Radiology"}
              </div>
              <h3 className={`text-white font-display font-bold text-xl sm:text-2xl mb-1.5 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "វិទ្យុសកម្មសាស្ត្រ៖ ការមើលឃើញអ្វីដែលមើលមិនឃើញ" : "Radiology: Seeing the Invisible"}
              </h3>
              <p className={`text-slate-300 text-sm max-w-2xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ភ្នែកទាំងបីនៃវេជ្ជសាស្ត្រ — កាំរស្មីអ៊ិច អេកូសាស្ត្រ និងម៉ាស៊ីន MRI/CT — និងរបៀបដែលបញ្ញាសិប្បនិម្មិតកំពុងផ្លាស់ប្ដូរវិស័យនេះ។"
                  : "The three eyes of medicine — X-rays, ultrasound, and MRI/CT — and how AI is changing what radiologists can see."}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-cyan-300 group-hover:text-cyan-200 group-hover:translate-x-1 transition-transform text-sm font-semibold">
              <span className={isKh ? "font-khmer" : ""}>{isKh ? "បើកម៉ូឌុល" : "Open module"}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* ── Section 3: Universities (Global & Local) ─────────────────── */}
      <UniversitiesSection isKh={isKh} />

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
    key: "allergy",
    icon: ShieldAlert,
    tint: "sky",
    nameEn: "Allergy",
    nameKh: "ភាពអាឡែស៊ី",
    residencyEn: "3-year IM or Pediatrics + 2-year fellowship",
    residencyKh: "ពេទ្យផ្ទៃក្នុង ឬកុមារ ៣ ឆ្នាំ + កម្មសិក្សាឯកទេស ២ ឆ្នាំ",
    forYouEn: "You love detective work on the body's reactions to food, dust, and pollen, and want patients to breathe and eat without fear.",
    forYouKh: "អ្នកស្រឡាញ់ការស៊ើបអង្កេតលើប្រតិកម្មរាងកាយចំពោះអាហារ ធូលី និងលំអងផ្កា ហើយចង់ឲ្យអ្នកជំងឺដកដង្ហើម និងហូបបានដោយគ្មានការភ័យខ្លាច។",
    workdayEn: "Skin-prick tests for asthma and food allergies, immunotherapy injections, and managing chronic eczema or severe allergic reactions.",
    workdayKh: "ការធ្វើតេស្តចាក់ស្បែកសម្រាប់ជំងឺហឺត និងអាឡែស៊ីអាហារ ការចាក់ភាពស៊ាំ និងការគ្រប់គ្រងជំងឺស្បែកអុជរ៉ាំរ៉ៃ ឬប្រតិកម្មអាឡែស៊ីធ្ងន់ធ្ងរ។",
    ruralEn: "Asthma and dust allergies are widespread in farming communities — a single allergist serving a province can prevent thousands of ER visits.",
    ruralKh: "ជំងឺហឺត និងអាឡែស៊ីធូលីកើតមានយ៉ាងទូលំទូលាយក្នុងសហគមន៍កសិកម្ម — អ្នកឯកទេសអាឡែស៊ីម្នាក់ដែលបម្រើមួយខេត្តអាចបញ្ចៀសការទៅមន្ទីរពេទ្យបន្ទាន់រាប់ពាន់ដង។",
  },
  {
    key: "anesthesiology",
    icon: Syringe,
    tint: "indigo",
    nameEn: "Anesthesiology",
    nameKh: "ការប្រើថ្នាំស្ពឹក",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You stay calm under pressure, love physiology, and want to be the silent guardian of every operation.",
    forYouKh: "អ្នកនៅស្ងប់ក្នុងពេលមានសម្ពាធ ស្រឡាញ់សរីរវិទ្យា និងចង់ជាអ្នកការពារស្ងាត់ៗនៃការវះកាត់នីមួយៗ។",
    workdayEn: "Putting patients safely to sleep before surgery, monitoring heart rate and oxygen second-by-second, and managing pain after the operation ends.",
    workdayKh: "ធ្វើឲ្យអ្នកជំងឺគេងដោយសុវត្ថិភាពមុនការវះកាត់ ត្រួតពិនិត្យអត្រាបេះដូង និងអុកស៊ីហ្សែនរៀងរាល់វិនាទី និងគ្រប់គ្រងការឈឺចាប់ក្រោយការវះកាត់។",
    ruralEn: "No anesthesiologist means no surgery. Provincial operating theatres in Cambodia are bottlenecked by this single shortage more than any other.",
    ruralKh: "គ្មានពេទ្យឯកទេសប្រើថ្នាំស្ពឹក គឺគ្មានការវះកាត់។ បន្ទប់វះកាត់ខេត្តនៅកម្ពុជាត្រូវបានរារាំងដោយការខ្វះខាតនេះច្រើនជាងគេ។",
  },
  {
    key: "dermatology",
    icon: Hand,
    tint: "amber",
    nameEn: "Dermatology",
    nameKh: "ឯកទេសស្បែក",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You have a sharp visual eye, like clear diagnoses, and want to mix medicine with minor procedures.",
    forYouKh: "អ្នកមានភ្នែកមើលមុតស្រួច ចូលចិត្តរោគវិនិច្ឆ័យច្បាស់លាស់ និងចង់ផ្សំវេជ្ជសាស្ត្រជាមួយនីតិវិធីតូចៗ។",
    workdayEn: "Diagnosing rashes, biopsying suspicious moles for skin cancer, and treating chronic conditions like psoriasis and acne.",
    workdayKh: "ធ្វើរោគវិនិច្ឆ័យជំងឺកន្ទួល ធ្វើបាយ៉ុបស៊ីប្រាល់សង្ស័យសម្រាប់មហារីកស្បែក និងព្យាបាលជំងឺរ៉ាំរ៉ៃដូចជា psoriasis និងមុន។",
    ruralEn: "Tropical sun exposure and farm chemical contact give Cambodia high rates of skin disease — early dermatology saves both lives and livelihoods.",
    ruralKh: "ការប៉ះពាល់ព្រះអាទិត្យត្រូពិច និងគីមីកសិកម្មធ្វើឲ្យកម្ពុជាមានអត្រាជំងឺស្បែកខ្ពស់ — ការមើលថែស្បែកដំបូងសង្គ្រោះទាំងជីវិត និងអាជីព។",
  },
  {
    key: "diagnostic-radiology",
    icon: ScanLine,
    tint: "sky",
    nameEn: "Diagnostic Radiology",
    nameKh: "វិទ្យុសាស្ត្រវិនិច្ឆ័យ",
    residencyEn: "5-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៥ ឆ្នាំ",
    forYouEn: "You love anatomy, pattern recognition, and being the doctor every other doctor relies on for the answer.",
    forYouKh: "អ្នកស្រឡាញ់កាយវិភាគ ការទទួលស្គាល់លំនាំ និងជាពេទ្យដែលពេទ្យឯទៀតពឹងផ្អែកដើម្បីរកចម្លើយ។",
    workdayEn: "Reading X-rays, CT scans, MRIs and ultrasounds — finding the tumour, the fracture, or the bleed that nobody else can see yet.",
    workdayKh: "អានកាំរស្មីអ៊ិច CT scan MRI និងអ៊ុលត្រាសោន — ស្វែងរកដុំសាច់ ការបាក់ឆ្អឹង ឬការហូរឈាមដែលគ្មានអ្នកណាមើលឃើញនៅឡើយ។",
    ruralEn: "Tele-radiology lets one radiologist in Phnom Penh read scans for ten provincial hospitals at once — a force-multiplier for rural care.",
    ruralKh: "តេឡេវិទ្យុសាស្ត្រអនុញ្ញាតឲ្យពេទ្យវិទ្យុសាស្ត្រម្នាក់នៅភ្នំពេញអានស្កែនសម្រាប់មន្ទីរពេទ្យខេត្តដប់ព្រមគ្នា — ជាកម្លាំងគុណសម្រាប់ការមើលថែជនបទ។",
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
  {
    key: "family",
    icon: Users,
    tint: "sky",
    nameEn: "Family Medicine",
    nameKh: "ពេទ្យគ្រួសារ",
    residencyEn: "3-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣ ឆ្នាំ",
    forYouEn: "You love long-term relationships and want to be the doctor for grandparents, parents, and kids in the same family.",
    forYouKh: "អ្នកស្រឡាញ់ទំនាក់ទំនងរយៈពេលវែង និងចង់ជាពេទ្យសម្រាប់ជីដូនជីតា ឪពុកម្ដាយ និងកុមារក្នុងគ្រួសារតែមួយ។",
    workdayEn: "Treating a fever in the morning, managing diabetes after lunch, doing prenatal checks in the afternoon, and home visits for the elderly at sunset.",
    workdayKh: "ព្យាបាលគ្រុនក្ដៅពេលព្រឹក គ្រប់គ្រងជំងឺទឹកនោមផ្អែមក្រោយអាហារថ្ងៃត្រង់ ត្រួតពិនិត្យមុនពេលសម្រាលនៅរសៀល និងទស្សនកិច្ចមនុស្សចាស់នៅផ្ទះពេលថ្ងៃលិច។",
    ruralEn: "The single most-needed doctor in rural Cambodia. One family physician can be the entire health system for a commune of thousands.",
    ruralKh: "ពេទ្យដែលត្រូវការច្រើនបំផុតមួយនៅជនបទកម្ពុជា។ ពេទ្យគ្រួសារម្នាក់អាចជាប្រព័ន្ធសុខាភិបាលទាំងមូលសម្រាប់ឃុំមួយដែលមានមនុស្សរាប់ពាន់នាក់។",
  },
  {
    key: "immunology",
    icon: ShieldCheck,
    tint: "indigo",
    nameEn: "Immunology",
    nameKh: "រោគស៊ាំ",
    residencyEn: "3-year IM or Pediatrics + 2-year fellowship",
    residencyKh: "ពេទ្យផ្ទៃក្នុង ឬកុមារ ៣ ឆ្នាំ + កម្មសិក្សាឯកទេស ២ ឆ្នាំ",
    forYouEn: "You are fascinated by the body's microscopic defence systems and enjoy solving complex diagnostic mysteries involving rare diseases or severe inflammatory responses.",
    forYouKh: "អ្នកចាប់អារម្មណ៍លើប្រព័ន្ធការពាររាងកាយដ៏តូចល្អិត និងស្រឡាញ់ការដោះស្រាយល្បែងផ្គុំរោគវិនិច្ឆ័យស្មុគស្មាញ ដែលពាក់ព័ន្ធនឹងជំងឺកម្រ ឬប្រតិកម្មរលាកធ្ងន់ធ្ងរ។",
    workdayEn: "Diagnosing immunodeficiencies, managing complex autoimmune treatments, and consulting with other specialists on severe, unexplained allergic or immune reactions.",
    workdayKh: "ធ្វើរោគវិនិច្ឆ័យជំងឺខ្វះភាពស៊ាំ គ្រប់គ្រងការព្យាបាលអូតូអ៊ុយមីនស្មុគស្មាញ និងពិគ្រោះជាមួយពេទ្យឯកទេសផ្សេងទៀតលើប្រតិកម្មអាឡែស៊ី ឬប្រតិកម្មស៊ាំធ្ងន់ធ្ងរដែលគ្មានការពន្យល់។",
    ruralEn: "As Cambodia's healthcare system rapidly advances, accurately diagnosing complex autoimmune disorders — and managing specialised immune responses to tropical infectious diseases — is becoming a vital medical frontier.",
    ruralKh: "ខណៈប្រព័ន្ធសុខាភិបាលកម្ពុជាកំពុងវិវត្តរីកចម្រើនយ៉ាងឆាប់រហ័ស សមត្ថភាពធ្វើរោគវិនិច្ឆ័យជំងឺអូតូអ៊ុយមីនស្មុគស្មាញ និងគ្រប់គ្រងប្រតិកម្មស៊ាំឯកទេសចំពោះជំងឺឆ្លងត្រូពិច កំពុងក្លាយជាព្រំដែនវេជ្ជសាស្ត្រដ៏សំខាន់មួយ។",
  },
  {
    key: "internal",
    icon: Stethoscope,
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
    key: "genetics",
    icon: Dna,
    tint: "indigo",
    nameEn: "Medical Genetics",
    nameKh: "ហ្សែនវេជ្ជសាស្ត្រ",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You love deep biology and want to give families answers about inherited conditions.",
    forYouKh: "អ្នកស្រឡាញ់ជីវវិទ្យាស៊ីជម្រៅ និងចង់ផ្ដល់ចម្លើយដល់គ្រួសារអំពីជំងឺហ្សែន។",
    workdayEn: "Counselling parents whose child has an inherited disease, ordering DNA tests, and explaining what a diagnosis means for the next generation.",
    workdayKh: "ពិគ្រោះជាមួយឪពុកម្ដាយដែលកូនមានជំងឺហ្សែន បញ្ជាការធ្វើតេស្ត DNA និងពន្យល់អ្វីដែលរោគវិនិច្ឆ័យមានន័យសម្រាប់ជំនាន់បន្ទាប់។",
    ruralEn: "Thalassemia is widespread in Cambodia. Genetic counselling before marriage and pregnancy can dramatically reduce future suffering.",
    ruralKh: "ជំងឺ Thalassemia មានយ៉ាងទូលំទូលាយនៅកម្ពុជា។ ការពិគ្រោះហ្សែនមុនពេលរៀបការ និងមានផ្ទៃពោះអាចកាត់បន្ថយការរងទុក្ខនាពេលអនាគតយ៉ាងខ្លាំង។",
  },
  {
    key: "neurology",
    icon: Brain,
    tint: "indigo",
    nameEn: "Neurology",
    nameKh: "ឯកទេសសរសៃប្រសាទ",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You love the most intricate organ in the body and want to decode strokes, seizures, and dementia.",
    forYouKh: "អ្នកស្រឡាញ់សរីរាង្គស្មុគស្មាញបំផុតក្នុងរាងកាយ និងចង់ដោះស្រាយជំងឺដាច់សរសៃខួរ ការប្រកាច់ និងជំងឺស្មារតី។",
    workdayEn: "Examining patients after a stroke, adjusting epilepsy medications, and following Parkinson's disease over decades.",
    workdayKh: "ពិនិត្យអ្នកជំងឺក្រោយជំងឺដាច់សរសៃខួរ កែច្នៃថ្នាំជំងឺឆ្កួតជ្រូក និងតាមដានជំងឺ Parkinson អស់ជាច្រើនទសវត្សរ៍។",
    ruralEn: "Stroke is one of the leading causes of death in Cambodia. Even one neurologist per province can save thousands by getting clot-busting drugs in early.",
    ruralKh: "ជំងឺដាច់សរសៃខួរគឺជាមូលហេតុលេខមួយនៃការស្លាប់នៅកម្ពុជា។ សូម្បីពេទ្យសរសៃប្រសាទម្នាក់ក្នុងមួយខេត្តអាចសង្គ្រោះមនុស្សរាប់ពាន់ដោយផ្ដល់ថ្នាំបំបែកកំណកឈាមឲ្យបានទាន់ពេលវេលា។",
  },
  {
    key: "nephrology",
    icon: Droplet,
    tint: "sky",
    nameEn: "Nephrology",
    nameKh: "តម្រងនោម",
    residencyEn: "3-year IM + 2-to-3-year fellowship",
    residencyKh: "ពេទ្យផ្ទៃក្នុង ៣ ឆ្នាំ + កម្មសិក្សាឯកទេស ២–៣ ឆ្នាំ",
    forYouEn: "You love complex physiology, fluid dynamics, and solving intricate electrolyte puzzles, while building long-term, supportive relationships with chronically ill patients.",
    forYouKh: "អ្នកស្រឡាញ់សរីរវិទ្យាស្មុគស្មាញ ការច្រាលនៃសារធាតុរាវ និងការដោះស្រាយល្បែងផ្គុំអេឡិចត្រូលីតដ៏ស្មុគស្មាញ ខណៈពេលដែលកសាងទំនាក់ទំនងគាំទ្ររយៈពេលវែងជាមួយអ្នកជំងឺរ៉ាំរ៉ៃ។",
    workdayEn: "Managing dialysis units, adjusting complex medication regimens, treating acute kidney injury in the ICU, and managing severe cases of hypertension.",
    workdayKh: "គ្រប់គ្រងផ្នែកលាងតម្រងនោម កែច្នៃរបបថ្នាំស្មុគស្មាញ ព្យាបាលការខូចតម្រងនោមស្រួចស្រាវនៅផ្នែកសង្គ្រោះបន្ទាន់ និងគ្រប់គ្រងករណីសម្ពាធឈាមខ្ពស់ធ្ងន់ធ្ងរ។",
    ruralEn: "Rising rates of undiagnosed diabetes and hypertension are driving a surge in Chronic Kidney Disease (CKD) across the country. Provincial access to affordable dialysis and preventative kidney care is critically limited and urgently needs expansion.",
    ruralKh: "អត្រាកើនឡើងនៃជំងឺទឹកនោមផ្អែម និងសម្ពាធឈាមខ្ពស់ដែលមិនបានធ្វើរោគវិនិច្ឆ័យ កំពុងជំរុញឲ្យជំងឺតម្រងនោមរ៉ាំរ៉ៃ (CKD) ផ្ទុះឡើងទូទាំងប្រទេស។ ការប្រើប្រាស់សេវាលាងតម្រងនោមដែលមានតម្លៃសមរម្យ និងការមើលថែបង្ការតម្រងនោមនៅខេត្ត ត្រូវបានកម្រិតយ៉ាងធ្ងន់ធ្ងរ និងត្រូវការការពង្រីកជាបន្ទាន់។",
  },
  {
    key: "nuclear",
    icon: Atom,
    tint: "amber",
    nameEn: "Nuclear Medicine",
    nameKh: "វេជ្ជសាស្ត្រនុយក្លេអ៊ែរ",
    residencyEn: "3–4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣–៤ ឆ្នាំ",
    forYouEn: "You love physics, careful measurement, and being able to see what no other scan can show.",
    forYouKh: "អ្នកស្រឡាញ់រូបវិទ្យា ការវាស់ប្រកបដោយការប្រុងប្រយ័ត្ន និងការមើលឃើញអ្វីដែលស្កែនផ្សេងៗមិនអាចបង្ហាញបាន។",
    workdayEn: "Performing thyroid scans, bone scans for cancer spread, and PET imaging — and using radioactive iodine to treat thyroid disease.",
    workdayKh: "ធ្វើស្កែនក្រពេញទីរ៉ូអ៊ីដ ស្កែនឆ្អឹងរកការរាលដាលនៃមហារីក និងការថត PET — និងប្រើអាយ៉ូដរ៉ាដ្យូអាក់ទីវដើម្បីព្យាបាលជំងឺទីរ៉ូអ៊ីដ។",
    ruralEn: "Thyroid disease and cancer staging both depend on nuclear medicine; even a single national centre lifts the standard for the whole country.",
    ruralKh: "ជំងឺទីរ៉ូអ៊ីដ និងការវាយតម្លៃដំណាក់កាលមហារីកទាំងពីរពឹងផ្អែកលើវេជ្ជសាស្ត្រនុយក្លេអ៊ែរ — សូម្បីមជ្ឈមណ្ឌលជាតិមួយក៏លើកស្ដង់ដារសម្រាប់ប្រទេសទាំងមូល។",
  },
  {
    key: "obgyn",
    icon: Flower2,
    tint: "rose",
    nameEn: "Obstetrics and Gynecology",
    nameKh: "សម្ភព និងរោគស្ត្រី",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You want to deliver babies, run clinics, and operate — all in the same career — and stand beside women through their biggest moments.",
    forYouKh: "អ្នកចង់សម្រាលទារក គ្រប់គ្រងគ្លីនិក និងវះកាត់ — ទាំងអស់ក្នុងវិជ្ជាជីវៈតែមួយ — និងឈរក្បែរស្ត្រីក្នុងពេលសំខាន់បំផុតរបស់ពួកគេ។",
    workdayEn: "Prenatal check-ups, delivering babies at 3 a.m., performing C-sections, and treating cervical and ovarian disease in clinic.",
    workdayKh: "ពិនិត្យមុនពេលសម្រាល សម្រាលទារកនៅម៉ោង ៣ ភ្លឺ ធ្វើការវះកាត់សម្រាល និងព្យាបាលជំងឺមាត់ស្បូន និងអូវែក្នុងគ្លីនិក។",
    ruralEn: "Maternal mortality is still too high in rural Cambodia. Every additional OB-GYN serving outside Phnom Penh saves lives directly.",
    ruralKh: "អត្រាមរណភាពស្ត្រីសម្រាលនៅជនបទកម្ពុជានៅខ្ពស់ពេក។ ពេទ្យសម្ភពម្នាក់បន្ថែមដែលបម្រើនៅក្រៅភ្នំពេញ សង្គ្រោះជីវិតផ្ទាល់។",
  },
  {
    key: "ophthalmology",
    icon: Eye,
    tint: "sky",
    nameEn: "Ophthalmology",
    nameKh: "ឯកទេសភ្នែក",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You love delicate microsurgery and want to literally give people back their sight.",
    forYouKh: "អ្នកស្រឡាញ់ការវះកាត់មីក្រូដ៏ល្អិតល្អន់ និងចង់ប្រគល់ការមើលឃើញត្រឡប់មកវិញដល់មនុស្ស។",
    workdayEn: "Diagnosing cataracts, glaucoma, and diabetic retinopathy — and performing 15-minute cataract surgeries that change a life.",
    workdayKh: "ធ្វើរោគវិនិច្ឆ័យជំងឺភ្នែកឡើងស ជំងឺ glaucoma និង diabetic retinopathy — និងធ្វើការវះកាត់ភ្នែកឡើងសរយៈពេល ១៥ នាទីដែលផ្លាស់ប្ដូរជីវិត។",
    ruralEn: "Treatable cataract blindness is widespread in Cambodia's elderly; one ophthalmologist on a mobile camp restores sight to dozens in a single day.",
    ruralKh: "ការងងឹតភ្នែកដោយជំងឺភ្នែកឡើងសដែលអាចព្យាបាលបានមានយ៉ាងទូលំទូលាយក្នុងចំណោមមនុស្សចាស់នៅកម្ពុជា — ពេទ្យភ្នែកម្នាក់នៅជំរំចល័តស្ដារការមើលឃើញដល់មនុស្សរាប់សិបនាក់ក្នុងមួយថ្ងៃ។",
  },
  {
    key: "oncology",
    icon: Ribbon,
    tint: "rose",
    nameEn: "Oncology",
    nameKh: "ឯកទេសមហារីក",
    residencyEn: "3-year IM + 2–3-year fellowship",
    residencyKh: "ពេទ្យផ្ទៃក្នុង ៣ ឆ្នាំ + កម្មសិក្សាឯកទេស ២–៣ ឆ្នាំ",
    forYouEn: "You combine deep science with deep compassion and want to walk every step of a hard journey with patients.",
    forYouKh: "អ្នកផ្សំវិទ្យាសាស្ត្រស៊ីជម្រៅជាមួយក្ដីមេត្តាស៊ីជម្រៅ និងចង់ដើររាល់ជំហានក្នុងដំណើរលំបាករបស់អ្នកជំងឺ។",
    workdayEn: "Designing chemotherapy regimens, breaking difficult news with honesty and hope, and following patients through years of remission.",
    workdayKh: "រៀបចំផែនការគីមីព្យាបាល បង្ហាញដំណឹងលំបាកដោយសុចរិត និងសង្ឃឹម និងតាមដានអ្នកជំងឺឆ្លងកាត់ការធូរស្បើយរយៈពេលជាច្រើនឆ្នាំ។",
    ruralEn: "Cancer rates in Cambodia are rising fast and most patients still travel hours for treatment; provincial oncology services are urgently needed.",
    ruralKh: "អត្រាមហារីកនៅកម្ពុជាកំពុងកើនឡើងយ៉ាងលឿន ហើយអ្នកជំងឺភាគច្រើននៅតែធ្វើដំណើររាប់ម៉ោងដើម្បីព្យាបាល — សេវាមហារីកនៅខេត្តគឺត្រូវការជាបន្ទាន់។",
  },
  {
    key: "pathology",
    icon: Microscope,
    tint: "indigo",
    nameEn: "Pathology",
    nameKh: "រោគវិទ្យា",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You love the microscope, certainty, and being the doctor whose answer determines the entire treatment plan.",
    forYouKh: "អ្នកស្រឡាញ់មីក្រូទស្សន៍ ភាពច្បាស់លាស់ និងជាពេទ្យដែលចម្លើយរបស់អ្នកកំណត់ផែនការព្យាបាលទាំងមូល។",
    workdayEn: "Examining biopsies under the microscope to diagnose cancer, running blood-bank operations, and overseeing every lab result in the hospital.",
    workdayKh: "ពិនិត្យបាយ៉ុបស៊ីក្រោមមីក្រូទស្សន៍ដើម្បីធ្វើរោគវិនិច្ឆ័យមហារីក គ្រប់គ្រងធនាគារឈាម និងត្រួតពិនិត្យរាល់លទ្ធផលមន្ទីរពិសោធន៍ក្នុងមន្ទីរពេទ្យ។",
    ruralEn: "Without a pathologist, no cancer can be confirmed and no surgery can be planned with certainty. Cambodia urgently needs more.",
    ruralKh: "បើគ្មានពេទ្យរោគវិទ្យា គ្មានមហារីកអាចបញ្ជាក់បាន ហើយគ្មានការវះកាត់អាចរៀបចំដោយប្រាកដ។ កម្ពុជាត្រូវការច្រើនជាបន្ទាន់។",
  },
  {
    key: "pediatrics",
    icon: Baby,
    tint: "rose",
    nameEn: "Pediatrics",
    nameKh: "ពេទ្យកុមារ",
    residencyEn: "3-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣ ឆ្នាំ",
    forYouEn: "You love kids, have endless patience, and want to spend your career making sure children grow up healthy.",
    forYouKh: "អ្នកស្រឡាញ់កុមារ មានការអត់ធ្មត់គ្មានព្រំដែន និងចង់ចំណាយវិជ្ជាជីវៈរបស់អ្នកដើម្បីធានាថាកុមារធំឡើងដោយមានសុខភាពល្អ។",
    workdayEn: "Vaccinating babies, treating diarrhoea and pneumonia, monitoring growth, and supporting parents through every fever and rash.",
    workdayKh: "ចាក់វ៉ាក់សាំងដល់ទារក ព្យាបាលជំងឺរាគ និងរលាកសួត តាមដានការលូតលាស់ និងគាំទ្រឪពុកម្ដាយឆ្លងកាត់រាល់គ្រុនក្ដៅ និងកន្ទួល។",
    ruralEn: "Childhood pneumonia and diarrhoea remain leading killers in rural Cambodia; one pediatrician per district can drive child mortality down sharply.",
    ruralKh: "ជំងឺរលាកសួត និងរាគរបស់កុមារនៅតែជាមូលហេតុនៃការស្លាប់ឈានមុខគេនៅជនបទកម្ពុជា — ពេទ្យកុមារម្នាក់ក្នុងមួយស្រុកអាចបន្ថយមរណភាពកុមារយ៉ាងខ្លាំង។",
  },
  {
    key: "pmr",
    icon: PersonStanding,
    tint: "amber",
    nameEn: "Physical Medicine and Rehabilitation",
    nameKh: "វេជ្ជសាស្ត្ររាងកាយ និងស្ដារនីតិសម្បទា",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You want to help people walk, work, and live again after injury, stroke, or surgery.",
    forYouKh: "អ្នកចង់ជួយឲ្យមនុស្សដើរ ធ្វើការ និងរស់នៅឡើងវិញបន្ទាប់ពីរបួស ជំងឺដាច់សរសៃខួរ ឬការវះកាត់។",
    workdayEn: "Designing rehab programmes for stroke and amputee patients, fitting prosthetics, and leading a team of therapists.",
    workdayKh: "រៀបចំកម្មវិធីស្ដារនីតិសម្បទាសម្រាប់អ្នកជំងឺដាច់សរសៃខួរ និងអ្នកត្រូវកាត់អវយវៈ ការដាក់សរសៃសិប្បនិម្មិត និងដឹកនាំក្រុមអ្នកព្យាបាល។",
    ruralEn: "Cambodia still lives with the legacy of land-mine injuries and a rising stroke burden; rehabilitation specialists turn survival into independence.",
    ruralKh: "កម្ពុជានៅតែរស់នៅជាមួយមរតករបួសមីន និងបន្ទុកជំងឺដាច់សរសៃខួរដែលកំពុងកើនឡើង — ពេទ្យឯកទេសស្ដារនីតិសម្បទាបំលែងការរស់រានមានជីវិតទៅជាឯករាជ្យ។",
  },
  {
    key: "preventive",
    icon: ShieldCheck,
    tint: "sky",
    nameEn: "Preventive Medicine",
    nameKh: "វេជ្ជសាស្ត្របង្ការ",
    residencyEn: "3-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៣ ឆ្នាំ",
    forYouEn: "You think in populations, not just patients, and want to stop diseases before they start.",
    forYouKh: "អ្នកគិតក្នុងលក្ខណៈប្រជាជន មិនមែនត្រឹមតែអ្នកជំងឺ និងចង់បញ្ឈប់ជំងឺមុនពេលវាចាប់ផ្ដើម។",
    workdayEn: "Designing vaccination campaigns, investigating disease outbreaks, advising on water and food safety, and shaping public-health policy.",
    workdayKh: "រៀបចំយុទ្ធនាការចាក់វ៉ាក់សាំង ស៊ើបអង្កេតការផ្ទុះជំងឺ ផ្ដល់ប្រឹក្សាស្ដីពីសុវត្ថិភាពទឹក និងអាហារ និងបង្កើតគោលនយោបាយសុខភាពសាធារណៈ។",
    ruralEn: "Most of Cambodia's biggest health gains have come from prevention — clean water, vaccines, mosquito control. This specialty multiplies every dollar spent.",
    ruralKh: "ការទទួលបានសុខភាពធំៗភាគច្រើនរបស់កម្ពុជាបានមកពីការបង្ការ — ទឹកស្អាត វ៉ាក់សាំង និងការគ្រប់គ្រងមូស។ ឯកទេសនេះគុណរាល់ប្រាក់ដុល្លារដែលចំណាយ។",
  },
  {
    key: "psychiatry",
    icon: Smile,
    tint: "rose",
    nameEn: "Psychiatry",
    nameKh: "ឯកទេសផ្លូវចិត្ត",
    residencyEn: "4-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៤ ឆ្នាំ",
    forYouEn: "You are a careful listener, want to combine biology and human story, and believe mental health deserves the same dignity as physical health.",
    forYouKh: "អ្នកជាអ្នកស្ដាប់ដ៏ប្រុងប្រយ័ត្ន ចង់ផ្សំជីវវិទ្យា និងរឿងរ៉ាវរបស់មនុស្ស និងជឿថាសុខភាពផ្លូវចិត្តសមនឹងសេចក្ដីថ្លៃថ្នូដូចសុខភាពរាងកាយដែរ។",
    workdayEn: "Diagnosing depression, anxiety, and PTSD, prescribing the right medication, and conducting talk-therapy sessions.",
    workdayKh: "ធ្វើរោគវិនិច្ឆ័យជំងឺធ្លាក់ទឹកចិត្ត ការថប់បារម្ភ និង PTSD ការបញ្ជាថ្នាំត្រឹមត្រូវ និងធ្វើវគ្គព្យាបាលដោយការនិយាយ។",
    ruralEn: "Cambodia carries deep generational trauma alongside today's youth-mental-health crisis; psychiatrists are critically scarce nationwide.",
    ruralKh: "កម្ពុជានៅតែដឹករបួសផ្លូវចិត្តពីជំនាន់មុនរួមជាមួយវិបត្តិសុខភាពផ្លូវចិត្តរបស់យុវជនសព្វថ្ងៃ — ការខ្វះខាតពេទ្យឯកទេសផ្លូវចិត្តគឺធ្ងន់ធ្ងរនៅទូទាំងប្រទេស។",
  },
  {
    key: "radiation-oncology",
    icon: Zap,
    tint: "rose",
    nameEn: "Radiation Oncology",
    nameKh: "មហារីកកម្មវិទ្យុ",
    residencyEn: "5-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៥ ឆ្នាំ",
    forYouEn: "You love the marriage of physics and biology, and want to deliver invisible beams that destroy cancer with millimetre precision.",
    forYouKh: "អ្នកស្រឡាញ់ការផ្សំរវាងរូបវិទ្យា និងជីវវិទ្យា និងចង់បញ្ជូនកាំរស្មីដែលមើលមិនឃើញដើម្បីបំផ្លាញមហារីកដោយភាពជាក់លាក់មីលីម៉ែត្រ។",
    workdayEn: "Planning radiation treatments on 3D scans, working closely with medical physicists, and seeing patients through 6-week treatment courses.",
    workdayKh: "រៀបចំផែនការព្យាបាលដោយកាំរស្មីលើស្កែន 3D សហការយ៉ាងជិតស្និទ្ធជាមួយអ្នករូបវិទ្យាវេជ្ជសាស្ត្រ និងតាមដានអ្នកជំងឺឆ្លងកាត់វគ្គព្យាបាល ៦ សប្ដាហ៍។",
    ruralEn: "Cambodia has only a handful of radiation centres for the entire country; building this specialty is essential to make cancer treatment accessible.",
    ruralKh: "កម្ពុជាមានមជ្ឈមណ្ឌលកាំរស្មីតែមួយចំនួនតូចសម្រាប់ប្រទេសទាំងមូល — ការសាងសង់ឯកទេសនេះគឺចាំបាច់ដើម្បីធ្វើឲ្យការព្យាបាលមហារីកអាចទទួលបាន។",
  },
  {
    key: "surgery",
    icon: Scissors,
    tint: "amber",
    nameEn: "Surgery",
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
    key: "urology",
    icon: Droplet,
    tint: "amber",
    nameEn: "Urology",
    nameKh: "ឯកទេសប្រព័ន្ធទឹកនោម",
    residencyEn: "5-year residency",
    residencyKh: "កម្មសិក្សាឯកទេស ៥ ឆ្នាំ",
    forYouEn: "You enjoy a balance of clinic medicine and surgery, focused on kidneys, bladder, and prostate.",
    forYouKh: "អ្នកចូលចិត្តតុល្យភាពរវាងវេជ្ជសាស្ត្រគ្លីនិក និងការវះកាត់ ដោយផ្ដោតលើតម្រងនោម ប្លោកនោម និងក្រពេញប្រូស្តាត។",
    workdayEn: "Treating kidney stones, performing prostate surgery, and managing urinary infections that could otherwise damage the kidneys.",
    workdayKh: "ព្យាបាលគ្រួសតម្រងនោម ធ្វើការវះកាត់ក្រពេញប្រូស្តាត និងគ្រប់គ្រងការឆ្លងផ្លូវទឹកនោមដែលអាចបំផ្លាញតម្រងនោម។",
    ruralEn: "Kidney stones from low water intake and chronic UTIs are common across rural Cambodia; access to a urologist prevents lifelong dialysis.",
    ruralKh: "គ្រួសតម្រងនោមដោយការផឹកទឹកតិច និងការឆ្លងផ្លូវទឹកនោមរ៉ាំរ៉ៃ មាននៅជនបទកម្ពុជា — ការទទួលបានពេទ្យឯកទេសផ្លូវទឹកនោមបញ្ចៀសការច្រោះឈាមពេញមួយជីវិត។",
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
  const [query, setQuery] = useState<string>("");
  const active = SPECIALTIES[selectedIdx];
  const ActiveIcon = active.icon;
  const tint = SPEC_TINT[active.tint];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const searchId = useId();

  // Filter chips by query (matches EN or KH name); preserve original indices.
  // NFC-normalize the Khmer side so input from different keyboards/IMEs matches.
  const filtered = useMemo(() => {
    const raw = query.trim();
    if (!raw) return SPECIALTIES.map((s, idx) => ({ s, idx }));
    const qEn = raw.toLowerCase();
    const qKh = raw.normalize("NFC");
    return SPECIALTIES.map((s, idx) => ({ s, idx })).filter(({ s }) =>
      s.nameEn.toLowerCase().includes(qEn) ||
      s.nameKh.normalize("NFC").includes(qKh)
    );
  }, [query]);

  function focusTabAt(filteredPos: number) {
    if (filtered.length === 0) return;
    const wrapped = (filteredPos + filtered.length) % filtered.length;
    const targetOriginalIdx = filtered[wrapped].idx;
    setSelectedIdx(targetOriginalIdx);
    // focus on the next tick so React commits the new tabIndex first
    requestAnimationFrame(() => tabRefs.current[wrapped]?.focus());
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, filteredPos: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTabAt(filteredPos + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTabAt(filteredPos - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTabAt(0);
        break;
      case "End":
        e.preventDefault();
        focusTabAt(filtered.length - 1);
        break;
    }
  }

  // Index of the active specialty within the filtered list (for tabIndex roving).
  const activeFilteredPos = filtered.findIndex(({ idx }) => idx === selectedIdx);

  return (
    <div className="space-y-4">
      {/* Searchable selector */}
      <div>
        <label htmlFor={searchId} className="sr-only">
          {isKh ? "ស្វែងរកឯកទេស" : "Search specialties"}
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isKh ? "ស្វែងរក ឬជ្រើសរើសឯកទេស..." : "Search or select a specialty..."}
            className={`w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 placeholder-slate-400 ${
              isKh ? "font-khmer" : ""
            }`}
            aria-controls="ptm-specialty-tablist"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={isKh ? "សម្អាតការស្វែងរក" : "Clear search"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className={`mt-1.5 text-[11px] text-slate-500 ${isKh ? "font-khmer" : ""}`}>
          {isKh
            ? `កំពុងបង្ហាញ ${filtered.length} ក្នុងចំណោម ${SPECIALTIES.length} ឯកទេស`
            : `Showing ${filtered.length} of ${SPECIALTIES.length} specialties`}
        </p>
      </div>

      {/*
        Selector chips. Modeled as a radiogroup (single-select chooser driving
        one persistent detail card below) rather than a tablist, since there is
        only ever one detail panel rendered. The radiogroup container is always
        present (even when filtered results are empty) so the search input's
        aria-controls reference always resolves.
      */}
      <div
        id="ptm-specialty-tablist"
        role="radiogroup"
        aria-label={isKh ? "ឯកទេសវេជ្ជសាស្ត្រ" : "Medical specialties"}
      >
        {filtered.length === 0 ? (
          <div
            className={`text-center py-6 px-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh
              ? "គ្មានឯកទេសត្រូវនឹងការស្វែងរករបស់អ្នក។"
              : "No specialties match your search."}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filtered.map(({ s, idx }, filteredPos) => {
              const Icon = s.icon;
              const isActive = idx === selectedIdx;
              const t = SPEC_TINT[s.tint];
              // If the active specialty is filtered out, give the first
              // visible chip the roving tabIndex so the group is still
              // reachable by Tab.
              const isRovingFocusable =
                activeFilteredPos === -1 ? filteredPos === 0 : isActive;
              return (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabRefs.current[filteredPos] = el;
                  }}
                  id={`ptm-tab-${s.key}`}
                  role="radio"
                  type="button"
                  aria-checked={isActive}
                  tabIndex={isRovingFocusable ? 0 : -1}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={(e) => onKeyDown(e, filteredPos)}
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
        )}
      </div>

      {/* Active card */}
      <div
        id={`ptm-tabpanel-${active.key}`}
        role="region"
        aria-label={isKh ? `ព័ត៌មានលម្អិត: ${active.nameKh}` : `Details: ${active.nameEn}`}
        aria-live="polite"
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
          ? "ស្វែងរក ឬចុចលើឯកទេសខាងលើដើម្បីប្ដូរកាត។ ឯកទេសទាំង ២៣ ដែលបានបង្ហាញនៅទីនេះគឺជាមធ្យោបាយអាជីពចម្បង — នៅតែមានឯកទេសរង និងវិជ្ជាជីវៈរងជាច្រើនទៀតក្នុងវេជ្ជសាស្ត្រ។"
          : "Search or tap a specialty above to flip the card. The 23 specialties shown here are the main career paths — many more sub-specialties and fellowships branch from them."}
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

// ════════════════════════════════════════════════════════════════════════════
//  3. Universities — Global & Local side-by-side directory
//     សាកលវិទ្យាល័យវេជ្ជសាស្ត្រ៖ សកលលោក និងក្នុងស្រុក
// ════════════════════════════════════════════════════════════════════════════

type LocalUniversity = {
  en: string;
  kh: string;
  abbr?: string;
  noteEn?: string;
  noteKh?: string;
};

const LOCAL_UNIVERSITIES: LocalUniversity[] = [
  {
    en: "University of Health Sciences",
    kh: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
    abbr: "UHS",
    noteEn: "The oldest state medical school",
    noteKh: "សាកលវិទ្យាល័យពេទ្យរដ្ឋចាស់ជាងគេ",
  },
  {
    en: "International University",
    kh: "សាកលវិទ្យាល័យអន្តរជាតិ",
    abbr: "IU",
  },
  {
    en: "University of Puthisastra",
    kh: "សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ",
    abbr: "UP",
  },
  {
    en: "Norton University",
    kh: "សាកលវិទ្យាល័យន័រតុន",
    noteEn: "Faculty of Health Sciences",
    noteKh: "មហាវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
  },
];

type GlobalUniversity = {
  name: string;
  country: string;
  countryKh: string;
  flag: string;
  abbr?: string;
};

const GLOBAL_UNIVERSITIES: GlobalUniversity[] = [
  { name: "Harvard University",                            country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "University of Oxford",                          country: "UK",        countryKh: "ចក្រភពអង់គ្លេស", flag: "🇬🇧" },
  { name: "Stanford University",                           country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "Johns Hopkins University",                      country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "University of Cambridge",                       country: "UK",        countryKh: "ចក្រភពអង់គ្លេស", flag: "🇬🇧" },
  { name: "University of California, San Francisco",       country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸", abbr: "UCSF" },
  { name: "Imperial College London",                       country: "UK",        countryKh: "ចក្រភពអង់គ្លេស", flag: "🇬🇧" },
  { name: "University College London",                     country: "UK",        countryKh: "ចក្រភពអង់គ្លេស", flag: "🇬🇧", abbr: "UCL" },
  { name: "Karolinska Institutet",                         country: "Sweden",    countryKh: "ស៊ុយអែត",         flag: "🇸🇪" },
  { name: "Yale University",                               country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "Massachusetts Institute of Technology",         country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸", abbr: "MIT" },
  { name: "University of California, Los Angeles",         country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸", abbr: "UCLA" },
  { name: "University of Pennsylvania",                    country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "University of Toronto",                         country: "Canada",    countryKh: "កាណាដា",           flag: "🇨🇦" },
  { name: "King's College London",                         country: "UK",        countryKh: "ចក្រភពអង់គ្លេស", flag: "🇬🇧" },
  { name: "Duke University",                               country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "Columbia University",                           country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "National University of Singapore",              country: "Singapore", countryKh: "សិង្ហបុរី",        flag: "🇸🇬", abbr: "NUS" },
  { name: "University of Michigan-Ann Arbor",              country: "USA",       countryKh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
  { name: "University of Sydney",                          country: "Australia", countryKh: "អូស្ត្រាលី",       flag: "🇦🇺" },
];

function UniversitiesSection({ isKh }: { isKh: boolean }) {
  return (
    <section
      id="universities"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
      data-testid="section-universities"
    >
      {/* eyebrow — bilingual */}
      <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-700 mb-2 flex-wrap">
        <Sparkles className="w-3 h-3" />
        <span>03 · Universities</span>
        <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">
          ០៣ · សាកលវិទ្យាល័យ
        </span>
      </div>

      {/* title — bilingual (always BOTH languages) */}
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 leading-tight">
        <span className={isKh ? "font-khmer leading-loose block" : "block"}>
          {isKh
            ? "សាកលវិទ្យាល័យវេជ្ជសាស្ត្រ៖ សកលលោក និងក្នុងស្រុក"
            : "Medical Universities: Global & Local"}
        </span>
        <span
          className={`block text-base sm:text-lg font-normal mt-1 text-slate-600 ${isKh ? "" : "font-khmer"}`}
        >
          {isKh
            ? "Medical Universities: Global & Local"
            : "សាកលវិទ្យាល័យវេជ្ជសាស្ត្រ៖ សកលលោក និងក្នុងស្រុក"}
        </span>
      </h2>

      <p
        className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh
          ? "ផ្លូវដូចគ្នា ជម្រើសផ្សេងគ្នា។ សាកលវិទ្យាល័យនៅកម្ពុជាបង្រៀនអ្នកឱ្យបម្រើភូមិរបស់អ្នកបានភ្លាមៗ — ខណៈពេលដែលសាកលវិទ្យាល័យកំពូលលើពិភពលោក ផ្ដល់ឱកាសសម្រាប់ការស្រាវជ្រាវ និងការអនុវត្តជាន់ខ្ពស់។ ពីរវិធីពិតប្រាកដទាំងពីរ ដើម្បីក្លាយជាគ្រូពេទ្យដ៏អស្ចារ្យ។"
          : "Same path, different doors. Cambodian medical schools train you to serve your village immediately — while the world's top schools open doors to research and advanced practice. Both are real, honourable ways to become a great doctor."}
      </p>

      {/* The split-screen comparison.
          Mobile  (< md / <768px): single vertical stack.
          Desktop (>= md / 768px): two equal columns side-by-side. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <LocalPanel isKh={isKh} />
        <GlobalPanel isKh={isKh} />
      </div>
    </section>
  );
}

function LocalPanel({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-orange-50 shadow-sm overflow-hidden h-full flex flex-col"
      data-testid="panel-local-universities"
    >
      {/* Panel header */}
      <header className="p-5 sm:p-6 border-b-2 border-amber-200/70 bg-amber-100/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <MapPin className="w-5 h-5 text-amber-700" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-800 mb-1 flex flex-wrap items-baseline gap-x-2">
              <span>Cambodia</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">
                កម្ពុជា
              </span>
            </div>
            <h3 className="leading-tight">
              <span
                className={`font-display font-bold text-xl text-amber-900 ${isKh ? "font-khmer leading-loose" : ""}`}
              >
                {isKh ? "សាកលវិទ្យាល័យក្នុងស្រុក" : "The Local Territory"}
              </span>
              <span
                className={`block text-sm font-normal mt-0.5 text-amber-800/80 ${isKh ? "" : "font-khmer"}`}
              >
                {isKh ? "The Local Territory" : "សាកលវិទ្យាល័យក្នុងស្រុក"}
              </span>
            </h3>
            <p className={`mt-2 text-xs text-amber-900/80 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "សាកលវិទ្យាល័យពេទ្យដែលទទួលស្គាល់ ៤ កន្លែង — ជម្រើសរបស់អ្នកនៅផ្ទះ។"
                : "4 accredited medical schools — your options at home."}
            </p>
          </div>
        </div>
      </header>

      {/* List */}
      <ul className="p-4 sm:p-5 space-y-3 flex-1">
        {LOCAL_UNIVERSITIES.map((u, idx) => (
          <li
            key={u.en}
            className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            data-testid={`local-university-${idx}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-mono font-bold text-sm">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span
                    className={`font-display font-bold text-sm sm:text-base text-slate-900 ${isKh ? "font-khmer leading-loose" : ""}`}
                  >
                    {isKh ? u.kh : u.en}
                  </span>
                  {u.abbr && (
                    <span className="font-mono text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      {u.abbr}
                    </span>
                  )}
                </div>
                <div
                  className={`text-xs text-slate-600 mt-0.5 ${isKh ? "" : "font-khmer"}`}
                >
                  {isKh ? u.en : u.kh}
                </div>
                {(u.noteEn || u.noteKh) && (
                  <div className="mt-1.5 text-xs text-amber-800">
                    {u.noteEn && (
                      <div className="italic">{u.noteEn}</div>
                    )}
                    {u.noteKh && (
                      <div className="font-khmer leading-loose">{u.noteKh}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GlobalPanel({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="rounded-3xl border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-md overflow-hidden h-full flex flex-col"
      data-testid="panel-global-universities"
    >
      {/* Panel header */}
      <header className="p-5 sm:p-6 border-b border-slate-700/80 bg-slate-900/60">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: "#fde68a" }}
          >
            <Trophy className="w-5 h-5" style={{ color: "#92400e" }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 flex flex-wrap items-baseline gap-x-2" style={{ color: "#fde68a" }}>
              <span>Worldwide</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">
                ទូទាំងពិភពលោក
              </span>
            </div>
            <h3 className="leading-tight">
              <span
                className={`font-display font-bold text-xl ${isKh ? "font-khmer leading-loose" : ""}`}
                style={{ color: "#fef3c7" }}
              >
                {isKh ? "កំពូលសាកលវិទ្យាល័យវេជ្ជសាស្ត្រពិភពលោក" : "The Global Horizon"}
              </span>
              <span
                className={`block text-sm font-normal mt-0.5 text-slate-300 ${isKh ? "" : "font-khmer"}`}
              >
                {isKh ? "The Global Horizon" : "កំពូលសាកលវិទ្យាល័យវេជ្ជសាស្ត្រពិភពលោក"}
              </span>
            </h3>
            <p className={`mt-2 text-xs text-slate-300 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "សាកលវិទ្យាល័យវេជ្ជសាស្ត្រកំពូល ២០ លើពិភពលោក — សម្រាប់អាហារូបករណ៍ និងការស្រាវជ្រាវ។"
                : "The world's Top 20 medical schools — for scholarships and research."}
            </p>
          </div>
        </div>
      </header>

      {/* List */}
      <ol className="p-4 sm:p-5 space-y-2 flex-1">
        {GLOBAL_UNIVERSITIES.map((u, idx) => (
          <li
            key={u.name}
            className="rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 transition-colors p-3"
            data-testid={`global-university-${idx}`}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                style={{
                  backgroundColor: idx < 3 ? "#fde68a" : "#1e293b",
                  color: idx < 3 ? "#78350f" : "#fde68a",
                  border: idx < 3 ? "none" : "1px solid #fde68a55",
                }}
              >
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-display font-semibold text-sm text-white truncate">
                    {u.name}
                  </span>
                  {u.abbr && (
                    <span
                      className="font-mono text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "#fde68a", color: "#78350f" }}
                    >
                      {u.abbr}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 inline-flex items-center gap-1.5 text-slate-300">
                <span className="text-base leading-none" aria-hidden="true">{u.flag}</span>
                <div className="text-right leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-wider">
                    {u.country}
                  </div>
                  <div className="font-khmer text-[0.65rem] leading-snug opacity-80">
                    {u.countryKh}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* footer accent */}
      <div className="px-5 py-3 border-t border-slate-700/80 bg-slate-900/60 flex items-center gap-2">
        <Award className="w-4 h-4" style={{ color: "#fde68a" }} />
        <span className={`text-[11px] text-slate-300 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ការដាក់ចំណាត់ថ្នាក់ផ្អែកលើលក្ខណៈសម្បត្តិអាហារូបករណ៍សកល។"
            : "Rankings reflect global academic standing."}
        </span>
      </div>
    </div>
  );
}
