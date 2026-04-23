import { Link } from "wouter";
import {
  ArrowLeft,
  Split,
  Copy,
  Shuffle,
  Heart,
  Baby,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-BIO-CELLDIV · Cell Division: Mitosis vs. Meiosis
//                    ការបែងចែកកោសិកា៖ មីតូស និង មេយ៉ូស
//
//  1. Mitosis — The Cloner (growth & healing, 46 → 46+46)
//  2. Meiosis — The Shuffler (reproduction, crossing over, 46 → 23+23+23+23)
//  3. The Comparison Grid (purpose / number / genetics)
//
//  Aesthetic mirrors the CRISPR page: deep emerald/forest greens,
//  clean tech-whites, organic rounded shapes, monospaced eyebrows.
// ════════════════════════════════════════════════════════════════════════════

export default function CellDivisionPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-slate-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#022c1f] via-[#04432f] to-[#066044] text-white border-b-4 border-emerald-300">
        <CellBgPattern />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/biology"
            className={`inline-flex items-center gap-1.5 text-emerald-200 hover:text-emerald-100 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅជីវវិទ្យា" : "Back to Biology"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-emerald-300/15 backdrop-blur border border-emerald-300/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-200">
            <Split className="w-3.5 h-3.5" />
            SCI-BIO-CELLDIV · CELLS · GENETICS
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl drop-shadow ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
          >
            {isKh ? (
              <>
                ការបែងចែកកោសិកា —{" "}
                <span className="text-emerald-300">មីតូស និង មេយ៉ូស</span>
              </>
            ) : (
              <>
                Cell Division —{" "}
                <span className="text-emerald-300">Mitosis vs. Meiosis</span>
              </>
            )}
          </h1>

          <p
            className={`mt-4 max-w-2xl text-emerald-100 text-sm sm:text-base ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "កោសិកានីមួយៗរបស់អ្នកមាន ៤៦ ក្រូម៉ូសូម។ មាន​វិធី​ពីរ​សម្រាប់​បែងចែក​មួយ​ដើម្បី​បង្កើត​ពីរ — មួយ​ធ្វើ​ច្បាប់​ចម្លង​ដូច​ច្បាប់​ដើម​បេះបិទ ហើយ​មួយ​ទៀត​លាយ​ហ្សែន​ដើម្បី​បង្កើត​មនុស្ស​ថ្មី​ដែល​មិន​ដូច​អ្នក​ណា​ឡើយ។"
              : "Every cell in your body carries 46 chromosomes. There are two ways to split one in two — one makes perfect copies, the other shuffles the deck to make brand-new humans no one has ever seen before."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat valueEn="46" labelEn="Chromosomes per human cell" labelKh="ក្រូម៉ូសូម​ក្នុង​កោសិកា​មនុស្ស" isKh={isKh} />
            <Stat valueEn="2" labelEn="Identical clones from mitosis" labelKh="ច្បាប់ចម្លងដូចគ្នាបេះបិទពីមីតូស" isKh={isKh} />
            <Stat valueEn="4" labelEn="Unique cells from meiosis" labelKh="កោសិកាខុសគ្នាពីមេយ៉ូស" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: Mitosis ────────────────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="The Cloner"
        eyebrowKh="អ្នកក្លូន"
        titleEn="Mitosis — Growth and Healing"
        titleKh="មីតូស — ការលូតលាស់ និង​ការ​ព្យាបាល"
        descEn="When you scrape your knee, your skin cells use mitosis to create exact clones to patch the hole. Mitosis is also how a single fertilised egg grows into a 30-trillion-cell adult — every one of those cells is a perfect copy of the one before it."
        descKh="នៅពេលដែលអ្នកដួលហើយខ្ទេចជង្គង់ កោសិកាស្បែករបស់អ្នកប្រើ​មីតូស​ដើម្បី​បង្កើត​ច្បាប់​ចម្លង​ដូច​បេះបិទ​ដើម្បី​បិទ​ស្នាម​នោះ។ មីតូស​ក៏​ជា​របៀប​ដែល​ស៊ុត​មួយ​បាន​បំបែក​រហូត​ដល់​មនុស្ស​ពេញ​វ័យ​មាន ៣០ លាន​លាន​កោសិកា — ហើយ​កោសិកា​ទាំង​អស់​នោះ​សុទ្ធ​តែ​ជា​ច្បាប់​ចម្លង​ដ៏​ល្អ​ឥត​ខ្ចោះ​នៃ​កោសិកា​ពី​មុន។"
        isKh={isKh}
      >
        <PurposeCard
          icon={Heart}
          eyebrowEn="Why we need it"
          eyebrowKh="ហេតុ​អ្វី​យើង​ត្រូវ​ការ​វា"
          titleEn="Growth, repair, replacement"
          titleKh="លូតលាស់ ជួសជុល ​ជំនួស"
          bodyEn="Most of your body uses mitosis every single second. Old skin flakes off — mitosis grows new layers underneath. A bone breaks — mitosis builds it back. A red blood cell wears out — mitosis prints another. Without mitosis, a cut would never close and a child would never grow."
          bodyKh="​រាងកាយ​អ្នក​ភាគ​ច្រើន​ប្រើ​មីតូស​គ្រប់​វិនាទី។ ស្បែក​ចាស់​របក — មីតូស​ដុះ​ស្រទាប់​ថ្មី​ខាង​ក្រោម។ ឆ្អឹង​បាក់ — មីតូស​សាងសង់​វា​ឡើង​វិញ។ កោសិកា​ឈាម​ក្រហម​ខូច — មីតូស​បោះពុម្ព​មួយ​ទៀត។ បើ​គ្មាន​មីតូស ស្នាម​មុត​នឹង​មិន​ជា ហើយ​កុមារ​នឹង​មិន​ធំ​ឡើង​ឡើយ។"
          isKh={isKh}
        />

        <ChromosomeMath
          titleEn="The Math"
          titleKh="គណិតវិទ្យា"
          start={46}
          steps={[
            {
              en: "Start: one cell with 46 chromosomes.",
              kh: "ចាប់ផ្តើម៖ កោសិកា​មួយ ​មាន ៤៦ ក្រូម៉ូសូម។",
              chip: "46",
            },
            {
              en: "Duplicate: every chromosome makes a perfect copy of itself. Now there are 92 strands inside one cell.",
              kh: "ចម្លង៖ ក្រូម៉ូសូម​នីមួយ​ៗ​បង្កើត​ច្បាប់​ចម្លង​ដ៏​ល្អ​ឥត​ខ្ចោះ​នៃ​ខ្លួន​វា។ ឥឡូវ​នេះ​មាន ៩២ ខ្សែ​នៅ​ក្នុង​កោសិកា​មួយ។",
              chip: "92",
            },
            {
              en: "Split: the cell pinches in half. Each half walks away with exactly 46 — same as the parent.",
              kh: "បំបែក៖ កោសិកា​បិត​ខ្លួន​វា​ជា​ពីរ។ ផ្នែក​នីមួយ​ៗ​ដើរ​ចេញ​ជាមួយ​នឹង ៤៦ ច្បាស់​លាស់ — ដូច​ម្តាយ​បេះបិទ។",
              chip: "46 + 46",
            },
          ]}
          resultEn="Two identical daughter cells, each carrying 46 chromosomes — exact clones of the original."
          resultKh="​កោសិកា​កូន​ដូច​គ្នា​បេះបិទ​ពីរ ដែល​នីមួយ​ៗ​មាន ៤៦ ក្រូម៉ូសូម — ជា​ច្បាប់​ចម្លង​ដូច​បេះបិទ​នៃ​កោសិកា​ដើម។"
          tone="emerald"
          icon={Copy}
          isKh={isKh}
        />
      </Section>

      {/* ── Section 2: Meiosis ────────────────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The Shuffler"
        eyebrowKh="អ្នកលាយ"
        titleEn="Meiosis — Building Diversity"
        titleKh="មេយ៉ូស — ការ​បង្កើត​ភាព​ចម្រុះ"
        descEn="Meiosis is the special kind of cell division your body uses only to make sperm and egg cells. Instead of producing perfect clones, it produces unique cells with only half the normal chromosomes — ready to combine with the other half from a partner to create a brand-new person."
        descKh="មេយ៉ូស​គឺ​ជា​ការ​បែងចែក​កោសិកា​ពិសេស​ដែល​រាងកាយ​អ្នក​ប្រើ​សម្រាប់​តែ​ការ​បង្កើត​មេជីវិត​ឈ្មោល និង​ស៊ុត​ប៉ុណ្ណោះ។ ជំនួស​ឱ្យ​ការ​បង្កើត​ច្បាប់​ចម្លង​ដ៏​ល្អ​ឥត​ខ្ចោះ វា​បង្កើត​កោសិកា​ពិសេស​ដែល​មាន​ក្រូម៉ូសូម​តែ​ពាក់​កណ្តាល — ត្រៀម​បញ្ចូល​ជា​មួយ​ពាក់​កណ្តាល​ម្ខាង​ទៀត​ពី​ដៃ​គូ​ដើម្បី​បង្កើត​មនុស្ស​ថ្មី។"
        isKh={isKh}
      >
        <PurposeCard
          icon={Baby}
          eyebrowEn="Why we need it"
          eyebrowKh="ហេតុ​អ្វី​យើង​ត្រូវ​ការ​វា"
          titleEn="Reproduction — sperm and egg"
          titleKh="ការ​បង្កើត​កូន — មេជីវិត​ឈ្មោល និង​ស៊ុត"
          bodyEn="If sperm and egg each carried 46 chromosomes, a baby would inherit 92 — and the next generation 184, then 368, and life would collapse. Meiosis solves this by halving the count: every sperm and every egg carries exactly 23, so when they meet the baby ends up with 23 + 23 = 46. Perfect."
          bodyKh="ប្រសិន​បើ​មេជីវិត​ឈ្មោល និង​ស៊ុត​មាន ៤៦ ​ក្រូម៉ូសូម​នីមួយ​ៗ ទារក​នឹង​ទទួល​បាន ៩២ — ហើយ​ជំនាន់​ក្រោយ ១៨៤ បន្ទាប់​មក ៣៦៨ ហើយ​ជីវិត​នឹង​ដួល​រលំ។ មេយ៉ូស​ដោះស្រាយ​ដោយ​បន្ថយ​ពាក់​កណ្តាល៖ មេជីវិត និង​ស៊ុត​នីមួយ​ៗ​មាន ២៣ ច្បាស់​លាស់ ដូច្នេះ​ពេល​ជួប​គ្នា​ទារក​ទទួល​បាន ២៣ + ២៣ = ៤៦។ ល្អ​ឥត​ខ្ចោះ។"
          isKh={isKh}
        />

        <CrossingOverCard isKh={isKh} />

        <ChromosomeMath
          titleEn="The Math"
          titleKh="គណិតវិទ្យា"
          start={46}
          steps={[
            {
              en: "Start: one cell with 46 chromosomes (23 from mum, 23 from dad).",
              kh: "ចាប់ផ្តើម៖ កោសិកា​មួយ​មាន ៤៦ ក្រូម៉ូសូម (២៣ ពី​ម្តាយ ២៣ ពី​ឪពុក)។",
              chip: "46",
            },
            {
              en: "Crossing-over: the matching pairs swap pieces of DNA. Every cell now carries a one-of-a-kind mix.",
              kh: "ការ​ឆ្លង​កាត់៖ គូ​ដែល​ត្រូវ​គ្នា​ផ្លាស់​ប្តូរ​បំណែក DNA។ ឥឡូវ​នេះ​កោសិកា​នីមួយ​ៗ​មាន​ការ​លាយ​ឯកលក្ខណៈ។",
              chip: "shuffle",
            },
            {
              en: "Split twice: first separates the pairs, second separates the copies. Result: 4 unique cells with 23 each.",
              kh: "បំបែក​ពីរ​ដង៖ ដំបូង​បំបែក​គូ ​ទីពីរ​បំបែក​ច្បាប់​ចម្លង។ លទ្ធផល៖ ៤ កោសិកា​ខុស​គ្នា ដែល​មាន ២៣ នីមួយ​ៗ។",
              chip: "23 × 4",
            },
          ]}
          resultEn="Four genetically unique cells, each with only 23 chromosomes — half of normal — waiting to meet the other half from a partner."
          resultKh="កោសិកា​ខុស​គ្នា​ផ្នែក​ហ្សែន ៤ ដែល​នីមួយ​ៗ​មាន​តែ ២៣ ក្រូម៉ូសូម — ​ពាក់​កណ្តាល​នៃ​ធម្មតា — រង់​ចាំ​ជួប​ពាក់​កណ្តាល​ម្ខាង​ទៀត​ពី​ដៃ​គូ។"
          tone="rose"
          icon={Shuffle}
          isKh={isKh}
        />
      </Section>

      {/* ── Section 3: Comparison Grid ────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="Side by side"
        eyebrowKh="ប្រៀប​ធៀប​ចំ​ៗ"
        titleEn="The Comparison Grid"
        titleKh="តារាង​ប្រៀប​ធៀប"
        descEn="Two processes, two purposes, two completely different outcomes. Read the table below row by row to lock in the difference between mitosis and meiosis."
        descKh="ដំណើរ​ការ​ពីរ គោល​បំណង​ពីរ លទ្ធផល​ខុស​គ្នា​ទាំង​ស្រុង​ពីរ។ អាន​តារាង​ខាង​ក្រោម​ជួរ​ម្តង​ៗ​ដើម្បី​ចង​ចាំ​ភាព​ខុស​គ្នា​រវាង​មីតូស និង​មេយ៉ូស។"
        isKh={isKh}
      >
        <ComparisonGrid isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/biology"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 text-sm ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅជីវវិទ្យា" : "Back to Biology"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell — mirrors the CRISPR page (SEC-XX badge + eyebrow + title).
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-emerald-900 text-emerald-200 rounded-sm px-2.5 py-0.5">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-emerald-700 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-emerald-950 mb-2 ${
          isKh ? "font-khmer leading-snug" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <p
        className={`text-slate-700 text-sm sm:text-base mb-6 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Stat({
  valueEn, labelEn, labelKh, isKh,
}: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur border border-emerald-300/30 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-emerald-300 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-emerald-100 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable cards
// ════════════════════════════════════════════════════════════════════════════

function PurposeCard({
  icon: Icon, eyebrowEn, eyebrowKh, titleEn, titleKh, bodyEn, bodyKh, isKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  isKh: boolean;
}) {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm p-5 sm:p-7 flex flex-col sm:flex-row gap-5 items-start">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <div
          className={`font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </div>
        <h3
          className={`font-display font-bold text-lg text-emerald-950 mb-2 ${
            isKh ? "font-khmer leading-snug" : "leading-tight"
          }`}
        >
          {isKh ? titleKh : titleEn}
        </h3>
        <p
          className={`text-sm text-slate-700 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh ? bodyKh : bodyEn}
        </p>
      </div>
    </div>
  );
}

function ChromosomeMath({
  titleEn, titleKh, steps, resultEn, resultKh, tone, icon: Icon, isKh,
}: {
  titleEn: string; titleKh: string;
  start: number;
  steps: { en: string; kh: string; chip: string }[];
  resultEn: string; resultKh: string;
  tone: "emerald" | "rose";
  icon: React.ComponentType<{ className?: string }>;
  isKh: boolean;
}) {
  const toneClasses =
    tone === "emerald"
      ? {
          chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
          accent: "text-emerald-700",
          stripe: "from-emerald-500 to-emerald-700",
        }
      : {
          chip: "bg-rose-100 text-rose-800 border-rose-200",
          accent: "text-rose-700",
          stripe: "from-rose-500 to-rose-700",
        };

  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-lg bg-gradient-to-br ${toneClasses.stripe} text-white flex items-center justify-center shadow-sm`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div
          className={`font-mono text-[10px] uppercase tracking-widest ${toneClasses.accent} ${
            isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {isKh ? titleKh : titleEn}
        </div>
      </div>

      <ol className="p-5 sm:p-6 space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4 items-start">
            <span
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${toneClasses.chip}`}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm text-slate-800 ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {isKh ? s.kh : s.en}
              </p>
              <span
                className={`mt-1 inline-block font-mono text-xs font-bold px-2 py-0.5 rounded border ${toneClasses.chip}`}
              >
                {s.chip}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="bg-emerald-50 border-t border-emerald-200 px-5 py-4 flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <p
          className={`text-sm text-emerald-900 font-medium ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh ? resultKh : resultEn}
        </p>
      </div>
    </div>
  );
}

function CrossingOverCard({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Visual */}
        <div className="relative bg-gradient-to-br from-emerald-900 via-[#04432f] to-emerald-700 p-6 flex items-center justify-center min-h-[180px]">
          <CellBgPattern muted />
          <CrossingOverSVG />
        </div>

        {/* Explanation */}
        <div className="bg-white p-5 sm:p-6">
          <div
            className={`font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "ការ​ឆ្លង​កាត់" : "Crossing over"}
          </div>
          <h3
            className={`font-display font-bold text-lg text-emerald-950 mb-2 ${
              isKh ? "font-khmer leading-snug" : "leading-tight"
            }`}
          >
            {isKh ? "DNA ផ្លាស់​ប្តូរ​បំណែក​មុន​បំបែក" : "DNA swaps pieces before splitting"}
          </h3>
          <p
            className={`text-sm text-slate-700 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "មុន​ពេល​កោសិកា​បំបែក​ខ្លួន​វា ​ក្រូម៉ូសូម​ដែល​ត្រូវ​គ្នា​ពី​ម្តាយ​អ្នក និង​ឪពុក​អ្នក​ទៅ​ឈរ​ក្បែរ​គ្នា ហើយ​ផ្លាស់​ប្តូរ​បំណែក DNA។ នេះ​បង្កើត​ភាព​ចម្រុះ​ហ្សែន​មិន​ធ្លាប់​មាន — ដូច្នេះ​បង​ប្អូន​បង្កើត​មិន​ដូច​គ្នា​ឡើយ ហើយ​មនុស្ស​ថ្មី​ៗ​អាច​ប្រឈម​នឹង​បរិស្ថាន​ដែល​ផ្លាស់​ប្តូរ​បាន។"
              : "Before the cell splits, the matching chromosomes you got from your mum and your dad line up and swap pieces of DNA with each other. This creates brand-new genetic combinations — which is why no two siblings are exactly alike, and why new humans can face changing environments."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Comparison Grid
// ════════════════════════════════════════════════════════════════════════════

function ComparisonGrid({ isKh }: { isKh: boolean }) {
  const rows: {
    rowEn: string; rowKh: string;
    mitosisEn: string; mitosisKh: string;
    meiosisEn: string; meiosisKh: string;
  }[] = [
    {
      rowEn: "Purpose",
      rowKh: "គោល​បំណង",
      mitosisEn: "Growth, repair, replacement",
      mitosisKh: "ការ​លូតលាស់ ​ការ​ជួសជុល ​ការ​ជំនួស",
      meiosisEn: "Reproduction (sperm & egg)",
      meiosisKh: "ការ​បង្កើត​កូន (មេជីវិត & ស៊ុត)",
    },
    {
      rowEn: "Number of cells created",
      rowKh: "ចំនួន​កោសិកា​ដែល​បង្កើត",
      mitosisEn: "2 daughter cells",
      mitosisKh: "កោសិកា​កូន ២",
      meiosisEn: "4 daughter cells",
      meiosisKh: "កោសិកា​កូន ៤",
    },
    {
      rowEn: "Chromosome count",
      rowKh: "ចំនួន​ក្រូម៉ូសូម",
      mitosisEn: "46 → 46 (full set)",
      mitosisKh: "៤៦ → ៤៦ (សំណុំ​ពេញ)",
      meiosisEn: "46 → 23 (half set)",
      meiosisKh: "៤៦ → ២៣ (ពាក់​កណ្តាល)",
    },
    {
      rowEn: "Genetics",
      rowKh: "ហ្សែន",
      mitosisEn: "Exact clones of the parent",
      mitosisKh: "ច្បាប់​ចម្លង​ដូច​បេះបិទ​នៃ​ម្តាយ",
      meiosisEn: "Completely unique mixes",
      meiosisKh: "ការ​លាយ​ឯកលក្ខណៈ​ទាំង​ស្រុង",
    },
    {
      rowEn: "Number of divisions",
      rowKh: "ចំនួន​ការ​បំបែក",
      mitosisEn: "1 split",
      mitosisKh: "បំបែក ១ ដង",
      meiosisEn: "2 splits",
      meiosisKh: "បំបែក ២ ដង",
    },
    {
      rowEn: "Where it happens",
      rowKh: "ប្រព្រឹត្ត​នៅ​កន្លែង​ណា",
      mitosisEn: "Skin, bone marrow, gut, almost everywhere",
      mitosisKh: "ស្បែក ខួរ​ឆ្អឹង​ ពោះវៀន ស្ទើរ​គ្រប់​ទី​កន្លែង",
      meiosisEn: "Only in ovaries and testes",
      meiosisKh: "តែ​នៅ​អូវែរ និង​ក្រុមពេជ្រ​ប៉ុណ្ណោះ",
    },
  ];

  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="grid grid-cols-3 bg-gradient-to-br from-[#022c1f] via-[#04432f] to-[#066044] text-white">
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <div
            className={`font-mono text-[10px] uppercase tracking-widest text-emerald-300 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "ចំណុច" : "Aspect"}
          </div>
        </div>
        <div className="px-4 py-3 sm:px-5 sm:py-4 border-l border-emerald-700/40 flex items-center gap-2">
          <Copy className="w-4 h-4 text-emerald-300" />
          <div>
            <div className={`font-display font-bold text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "មីតូស" : "Mitosis"}
            </div>
            <div
              className={`font-mono text-[10px] uppercase tracking-widest text-emerald-300 hidden sm:block ${
                isKh ? "font-khmer normal-case tracking-normal" : ""
              }`}
            >
              {isKh ? "អ្នកក្លូន" : "the Cloner"}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-5 sm:py-4 border-l border-emerald-700/40 flex items-center gap-2">
          <Shuffle className="w-4 h-4 text-rose-300" />
          <div>
            <div className={`font-display font-bold text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "មេយ៉ូស" : "Meiosis"}
            </div>
            <div
              className={`font-mono text-[10px] uppercase tracking-widest text-rose-300 hidden sm:block ${
                isKh ? "font-khmer normal-case tracking-normal" : ""
              }`}
            >
              {isKh ? "អ្នកលាយ" : "the Shuffler"}
            </div>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-emerald-100">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 ${i % 2 === 1 ? "bg-emerald-50/50" : "bg-white"}`}
          >
            <div
              className={`px-4 py-3 sm:px-5 sm:py-4 border-r border-emerald-100 font-display font-bold text-emerald-950 text-sm sm:text-base ${
                isKh ? "font-khmer leading-snug" : ""
              }`}
            >
              {isKh ? r.rowKh : r.rowEn}
            </div>
            <div
              className={`px-4 py-3 sm:px-5 sm:py-4 border-r border-emerald-100 text-sm text-slate-800 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh ? r.mitosisKh : r.mitosisEn}
            </div>
            <div
              className={`px-4 py-3 sm:px-5 sm:py-4 text-sm text-slate-800 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh ? r.meiosisKh : r.meiosisEn}
            </div>
          </div>
        ))}
      </div>

      {/* Outcome strip */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-rose-50 px-4 py-4 sm:px-5 sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-emerald-100">
        <OutcomePill
          icon={Copy}
          tone="emerald"
          textEn="2 identical clones · 46 chromosomes each"
          textKh="ច្បាប់​ចម្លង​ដូច​គ្នា ២ · ៤៦ ក្រូម៉ូសូម​នីមួយ​ៗ"
          isKh={isKh}
        />
        <OutcomePill
          icon={Sparkles}
          tone="rose"
          textEn="4 unique cells · 23 chromosomes each"
          textKh="កោសិកា​ខុស​គ្នា ៤ · ២៣ ក្រូម៉ូសូម​នីមួយ​ៗ"
          isKh={isKh}
        />
      </div>
    </div>
  );
}

function OutcomePill({
  icon: Icon, tone, textEn, textKh, isKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "rose";
  textEn: string; textKh: string;
  isKh: boolean;
}) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-900 border-emerald-200"
      : "bg-rose-100 text-rose-900 border-rose-200";
  return (
    <div className={`rounded-xl border ${cls} px-3 py-2 flex items-center gap-2 text-sm font-medium ${isKh ? "font-khmer" : ""}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{isKh ? textKh : textEn}</span>
      <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-50" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative SVG bits — keeps the Biolab aesthetic without third-party assets
// ════════════════════════════════════════════════════════════════════════════

function CellBgPattern({ muted = false }: { muted?: boolean }) {
  const opacity = muted ? "0.06" : "0.12";
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 240"
    >
      {/* Soft cell-like ovals */}
      <g fill={`rgba(255,255,255,${opacity})`}>
        <ellipse cx="80" cy="60" rx="46" ry="36" />
        <ellipse cx="220" cy="140" rx="58" ry="44" />
        <ellipse cx="380" cy="80" rx="42" ry="32" />
        <ellipse cx="510" cy="170" rx="64" ry="48" />
        <ellipse cx="120" cy="200" rx="32" ry="24" />
      </g>
      {/* Splitting line */}
      <path
        d="M0,120 C150,100 300,140 450,110 600,80 600,80 600,120"
        stroke={`rgba(110,231,183,${muted ? "0.2" : "0.35"})`}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

function CrossingOverSVG() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 160"
      className="relative w-full max-w-[260px] drop-shadow-md"
    >
      {/* Two homologous chromosomes that cross over */}
      <defs>
        <linearGradient id="cdMum" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="cdDad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#bbf7d0" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Mum's chromosome (pink, top) */}
      <path
        d="M30,30 C70,30 100,70 110,90 C120,110 150,120 190,120"
        stroke="url(#cdMum)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Dad's chromosome (green, bottom) */}
      <path
        d="M30,120 C70,120 100,80 110,90 C120,100 150,30 190,30"
        stroke="url(#cdDad)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Crossing point */}
      <circle cx="110" cy="90" r="8" fill="white" stroke="#065f46" strokeWidth="2" />

      {/* Labels */}
      <text x="20" y="22" fontSize="11" fill="#fce7f3" fontFamily="ui-monospace, monospace">MUM</text>
      <text x="20" y="148" fontSize="11" fill="#bbf7d0" fontFamily="ui-monospace, monospace">DAD</text>
    </svg>
  );
}
