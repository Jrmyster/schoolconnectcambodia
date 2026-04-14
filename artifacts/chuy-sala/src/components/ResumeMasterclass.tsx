import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Download, FileText, CheckCircle2, XCircle, Zap, BookOpen } from "lucide-react";

const t = (en: string, kh: string) => ({ en, kh });

const POWER_VERBS = [
  { en: "Led",          kh: "ដឹកនាំ" },
  { en: "Created",      kh: "បង្កើត" },
  { en: "Analyzed",     kh: "វិភាគ" },
  { en: "Developed",    kh: "អភិវឌ្ឍ" },
  { en: "Managed",      kh: "គ្រប់គ្រង" },
  { en: "Implemented",  kh: "អនុវត្ត" },
  { en: "Achieved",     kh: "សម្រេច" },
  { en: "Coordinated",  kh: "សម្របសម្រួល" },
  { en: "Designed",     kh: "រចនា" },
  { en: "Delivered",    kh: "ផ្ដល់" },
];

const LOCAL_POINTS = [
  t(
    "Include a professional passport-style photo (3×4 cm) in the top-right corner.",
    "ដាក់រូបថតស្ទីលលិខិតឆ្លងដែន (3×4 សង់ទីម៉ែត្រ) នៅជ្រុងខាងស្ដាំខាងលើ។"
  ),
  t(
    "Write your full current address including commune, district, and province.",
    "សរសេរអាសយដ្ឋានពេញលេញ រួមមានភូមិ ឃុំ ស្រុក និងខេត្ត។"
  ),
  t(
    "List marital status and date of birth — HR departments often expect this in Cambodia.",
    "បញ្ចូលស្ថានភាពអាពាហ៍ពិពាហ៍ និងថ្ងៃខែឆ្នាំកំណើត — ស្ថាប័ន HR ជាច្រើននៅកម្ពុជាប្រើទម្លាប់នេះ។"
  ),
  t(
    "Reference letters from teachers or community leaders carry strong weight locally.",
    "លិខិតណែនាំពីគ្រូ ឬអ្នកដឹកនាំសហគមន៍មានឥទ្ធិពលខ្លាំងក្នុងតំបន់។"
  ),
  t(
    "Khmer language first, followed by English translation if applying to bilingual offices.",
    "ភាសាខ្មែរដំបូង បន្ទាប់មកប្រែជាភាសាអង់គ្លេស ប្រសិនបើដាក់ពាក្យស្ថាប័នពីរភាសា។"
  ),
];

const INTL_POINTS = [
  t(
    "Remove photos, age, and personal data — many international employers screen blind to avoid unconscious bias.",
    "លុបរូបថត អាយុ និងព័ត៌មានផ្ទាល់ខ្លួន — ស្ថាប័នអន្តរជាតិជាច្រើនអានDossier ដោយគ្មានទិន្នន័យផ្ទាល់ខ្លួន ដើម្បីជៀសវាងការប្រកាន់ពូជសាសន៍ដោយមិនដឹងខ្លួន។"
  ),
  t(
    "Lead every bullet with a strong action verb (e.g., 'Led a team of 5…', 'Reduced costs by 30%...').",
    "ចាប់ផ្ដើមចំណុចនីមួយៗដោយកិរិយាសកម្មឹម (ឧ. 'ដឹកនាំក្រុម 5 នាក់…', 'កាត់បន្ថយការចំណាយ 30%…')។"
  ),
  t(
    "Quantify your impact: numbers, percentages, and timeframes make achievements concrete.",
    "ជំទង់លទ្ធផលរបស់អ្នកជាលេខ៖ ចំនួន ភាគរយ និងរយៈពេលធ្វើឱ្យជោគជ័យច្បាស់លាស់ជាងមុន។"
  ),
  t(
    "Tailor the 'Skills' section to each job description — use keywords from the posting.",
    "កែសម្រួលផ្នែក 'ជំនាញ' ឱ្យសមស្របការពិពណ៌នាការងារនីមួយៗ — ប្រើពាក្យគន្លឹះពីប្រកាស។"
  ),
  t(
    "One page for under 3 years' experience; two pages maximum for senior applicants.",
    "មួយទំព័រ សម្រាប់អ្នកមានបទពិសោធន៍តិចជាង 3 ឆ្នាំ; អតិបរិមាពីរទំព័រ សម្រាប់ក្រុមចាស់ទំ។"
  ),
];

export function ResumeMasterclass() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const tr = (obj: { en: string; kh: string }) => (kh ? obj.kh : obj.en);

  const doubled = [...POWER_VERBS, ...POWER_VERBS];

  return (
    <section
      className="max-w-4xl mx-auto px-4 sm:px-6 pb-20"
      aria-labelledby="resume-masterclass-title"
    >
      {/* ── Section header ── */}
      <div className="mb-6 flex items-start gap-3">
        <div
          className="mt-0.5 flex-shrink-0 rounded-lg p-2"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
        >
          <BookOpen size={20} color="white" />
        </div>
        <div>
          <h2
            id="resume-masterclass-title"
            className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}
          >
            {kh ? "ថ្នាក់មេ៖ CV និង Resume" : "Resume & CV Masterclass"}
          </h2>
          <p className={`mt-1 text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
            {kh
              ? "ដឹងពីភាពខុសគ្នារវាង Resume ក្នុងស្រុក និងអន្តរជាតិ — ហើយបង្ហាញខ្លួនឯងប្រកបដោយវិជ្ជាជីវៈ។"
              : "Know the difference between a local and international resume — and present yourself with confidence."}
          </p>
        </div>
      </div>

      {/* ── Comparison grid ── */}
      <div
        className="rounded-2xl overflow-hidden border mb-6"
        style={{ borderColor: "#CBD5E1" }}
      >
        {/* Grid header bar */}
        <div className="grid grid-cols-2">
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "#1E3A5F" }}
          >
            <FileText size={15} color="#93C5FD" />
            <span
              className={`font-bold text-sm text-white ${kh ? "font-khmer" : ""}`}
            >
              {kh ? "Resume ក្នុងស្រុក (កម្ពុជា)" : "Local Resume (Cambodia)"}
            </span>
          </div>
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "#2563EB" }}
          >
            <Zap size={15} color="#BFDBFE" />
            <span
              className={`font-bold text-sm text-white ${kh ? "font-khmer" : ""}`}
            >
              {kh ? "CV អន្តរជាតិ (ផ្អែកលើជំនាញ)" : "International CV (Skills-Based)"}
            </span>
          </div>
        </div>

        {/* Grid rows */}
        {LOCAL_POINTS.map((localPt, i) => {
          const intlPt = INTL_POINTS[i];
          const rowBg = i % 2 === 0 ? "#F8FAFC" : "#FFFFFF";
          return (
            <div
              key={i}
              className="grid grid-cols-2 border-t"
              style={{ borderColor: "#E2E8F0", background: rowBg }}
            >
              {/* Local column */}
              <div
                className="px-5 py-4 flex gap-3 border-r"
                style={{ borderColor: "#E2E8F0" }}
              >
                <CheckCircle2
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#1E3A5F" }}
                />
                <p
                  className={`text-sm leading-relaxed text-slate-700 ${kh ? "font-khmer" : ""}`}
                >
                  {tr(localPt)}
                </p>
              </div>
              {/* International column */}
              <div className="px-5 py-4 flex gap-3">
                <CheckCircle2
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#2563EB" }}
                />
                <p
                  className={`text-sm leading-relaxed text-slate-700 ${kh ? "font-khmer" : ""}`}
                >
                  {tr(intlPt)}
                </p>
              </div>
            </div>
          );
        })}

        {/* Key rule row */}
        <div
          className="grid grid-cols-2 border-t"
          style={{ borderColor: "#E2E8F0" }}
        >
          <div
            className="px-5 py-3 flex gap-3 items-start border-r"
            style={{ borderColor: "#E2E8F0", background: "#EFF6FF" }}
          >
            <XCircle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
            <p className={`text-xs text-slate-500 italic ${kh ? "font-khmer" : ""}`}>
              {kh
                ? "ជៀសវាង: ព័ត៌មានមិនពិត ឬការតុបតែងហួសហេតុ"
                : "Avoid: embellishing facts or over-formatting"}
            </p>
          </div>
          <div
            className="px-5 py-3 flex gap-3 items-start"
            style={{ background: "#EFF6FF" }}
          >
            <XCircle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" />
            <p className={`text-xs text-slate-500 italic ${kh ? "font-khmer" : ""}`}>
              {kh
                ? "ជៀសវាង: ប្រើ 'Responsible for…' ដោយគ្មានលេខ ឬលទ្ធផល"
                : "Avoid: 'Responsible for…' without numbers or outcomes"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Power Verbs Marquee ── */}
      <div
        className="rounded-2xl overflow-hidden mb-6 border"
        style={{ borderColor: "#CBD5E1" }}
      >
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{ background: "#1E3A5F", borderColor: "#2D4F7A" }}
        >
          <Zap size={15} color="#BFDBFE" />
          <span className={`font-bold text-sm text-white ${kh ? "font-khmer" : ""}`}>
            {kh ? "កិរិយាសកម្ម ដែលធ្វើឱ្យ Resume ទទួលបានការចាប់អារម្មណ៍" : "Power Verbs — Make Your Resume Stand Out"}
          </span>
        </div>

        <div className="py-5 px-4 bg-white overflow-hidden">
          <div className="marquee-track flex gap-6" aria-hidden="true">
            {doubled.map((verb, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center rounded-xl px-5 py-3 border shadow-sm"
                style={{ borderColor: "#BFDBFE", background: "linear-gradient(160deg,#EFF6FF,#DBEAFE)" }}
              >
                <span className="font-extrabold text-base" style={{ color: "#1E3A5F" }}>
                  {verb.en}
                </span>
                <span className={`text-xs mt-0.5 font-khmer`} style={{ color: "#2563EB" }}>
                  {verb.kh}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-4 bg-white">
          <p className={`text-xs text-slate-400 text-center ${kh ? "font-khmer" : ""}`}>
            {kh
              ? "ប្រើកិរិយាទាំងនេះជំនួស 'Responsible for…' ។  ឧ. 'Led a team of 5…'"
              : "Use these instead of 'Responsible for…'  e.g. 'Led a team of 5 to…'"}
          </p>
        </div>
      </div>

      {/* ── Download buttons ── */}
      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "#CBD5E1", background: "#F8FAFC" }}
      >
        <p className={`font-bold text-slate-700 mb-1 ${kh ? "font-khmer" : ""}`}>
          {kh ? "ទាញយកគំរូ" : "Download Templates"}
        </p>
        <p className={`text-sm text-slate-500 mb-5 ${kh ? "font-khmer" : ""}`}>
          {kh
            ? "គំរូទាំងពីរត្រូវបានរចនាសម្រាប់និស្សិតកម្ពុជា — អ្នកអាចកែប្រែបានភ្លាមៗ។"
            : "Both templates are designed for Cambodian students — edit and personalise immediately."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`${import.meta.env.BASE_URL}templates/local-resume-template.doc`}
            download="Local_Resume_Template_ChouySala.doc"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: "#1E3A5F", color: "white" }}
          >
            <Download size={16} />
            <span className={kh ? "font-khmer" : ""}>
              {kh ? "ទាញយក Resume ក្នុងស្រុក (.doc)" : "Download Local Resume Template (.doc)"}
            </span>
          </a>

          <a
            href={`${import.meta.env.BASE_URL}templates/international-cv-template.doc`}
            download="International_CV_Template_ChouySala.doc"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm transition-opacity hover:opacity-90 active:scale-95"
            style={{
              background: "white",
              color: "#2563EB",
              border: "2px solid #2563EB",
            }}
          >
            <Download size={16} />
            <span className={kh ? "font-khmer" : ""}>
              {kh ? "ទាញយក CV អន្តរជាតិ (.doc)" : "Download International CV Template (.doc)"}
            </span>
          </a>
        </div>

        <p className={`mt-3 text-xs text-slate-400 text-center ${kh ? "font-khmer" : ""}`}>
          {kh
            ? "ឯកសារ .doc ទាំងពីរអាចបើកបានក្នុង Microsoft Word, Google Docs, ឬ LibreOffice"
            : "Both .doc files open in Microsoft Word, Google Docs, or LibreOffice"}
        </p>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
