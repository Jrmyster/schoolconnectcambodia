import { useState, useEffect, useRef } from "react";
import { Brain, Stethoscope, AlertCircle, Search, Sparkles, ListChecks, X } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type TruthKey = "symptom" | "cause" | "prognosis" | "prescription";

interface Truth {
  key: TruthKey;
  step: string;
  Icon: typeof AlertCircle;
  roleEn: string;
  roleKh: string;
  paliEn: string;     // Pali term (English transliteration)
  paliKh: string;     // Khmer transliteration
  meaningEn: string;
  meaningKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: string; // tailwind gradient classes
}

const TRUTHS: Truth[] = [
  {
    key: "symptom",
    step: "01",
    Icon: AlertCircle,
    roleEn: "The Symptom",
    roleKh: "រោគសញ្ញា",
    paliEn: "Dukkha",
    paliKh: "ទុក្ខ",
    meaningEn: "Suffering / Dissatisfaction",
    meaningKh: "ការឈឺចាប់ / ការមិនពេញចិត្ត",
    bodyEn:
      "Life involves friction. Even good moments end, plans break, bodies age, and the mind keeps wanting more. This low background hum of dissatisfaction is universal — not a personal failure.",
    bodyKh:
      "ជីវិតមានការប៉ះទង្គិច។ សូម្បីតែពេលវេលាល្អៗក៏បញ្ចប់ ផែនការបែក រូបកាយចាស់ ហើយចិត្តបន្តចង់បានបន្ថែមទៀត។ សំឡេងស្រអាប់នៃការមិនពេញចិត្តនេះគឺជាសកល — មិនមែនជាការបរាជ័យផ្ទាល់ខ្លួនទេ។",
    accent: "from-rose-200 to-rose-400",
  },
  {
    key: "cause",
    step: "02",
    Icon: Search,
    roleEn: "The Cause",
    roleKh: "មូលហេតុ",
    paliEn: "Samudaya",
    paliKh: "សមុទយ",
    meaningEn: "Attachment / Craving",
    meaningKh: "តណ្ហា",
    bodyEn:
      "Suffering comes from wanting the world to be exactly how we want it, rather than accepting how it is. We grip pleasant things tightly and push painful ones away — and that grip is what hurts.",
    bodyKh:
      "ការឈឺចាប់កើតចេញពីការចង់ឲ្យពិភពលោកជាដូចអ្វីដែលយើងចង់បាន ជាជាងទទួលយកវាដូចដែលវាជា។ យើងកាន់របស់ល្អៗឲ្យជាប់ ហើយរុញរបស់ឈឺចុកចាប់ចេញ — ហើយការកាន់នោះហើយដែលឈឺចាប់។",
    accent: "from-amber-200 to-amber-400",
  },
  {
    key: "prognosis",
    step: "03",
    Icon: Sparkles,
    roleEn: "The Prognosis",
    roleKh: "ការព្យាករណ៍",
    paliEn: "Nirodha",
    paliKh: "និរោធ",
    meaningEn: "Cessation",
    meaningKh: "ការរំលត់",
    bodyEn:
      "This is the optimistic truth: because we create our own suffering inside the mind, we also have the power to stop it. Freedom is possible — not by changing the world, but by changing our relationship to it.",
    bodyKh:
      "នេះគឺជាការពិតដ៏ល្អប្រសើរ៖ ដោយសារយើងបង្កើតការឈឺចាប់ដោយខ្លួនឯងនៅក្នុងចិត្ត យើងក៏មានអំណាចបញ្ឈប់វាដែរ។ សេរីភាពអាចទៅរួច — មិនមែនដោយការផ្លាស់ប្តូរពិភពលោកទេ ប៉ុន្តែដោយការផ្លាស់ប្តូរទំនាក់ទំនងរបស់យើងជាមួយវា។",
    accent: "from-sky-200 to-sky-400",
  },
  {
    key: "prescription",
    step: "04",
    Icon: ListChecks,
    roleEn: "The Prescription",
    roleKh: "វេជ្ជបញ្ជា",
    paliEn: "Magga",
    paliKh: "មគ្គ",
    meaningEn: "The Eightfold Path",
    meaningKh: "មគ្គមានអង្គប្រាំបី",
    bodyEn:
      "The daily 'medicine' or practice used to cure the mind: right view, right intention, right speech, right action, right livelihood, right effort, right mindfulness, and right concentration. Together they form a routine of mindfulness and ethical living.",
    bodyKh:
      "«ឱសថ» ឬការអនុវត្តប្រចាំថ្ងៃ ដែលប្រើដើម្បីព្យាបាលចិត្ត៖ សម្មាទិដ្ឋិ សម្មាសង្កប្បៈ សម្មាវាចា សម្មាកម្មន្តៈ សម្មាអាជីវៈ សម្មាវាយាមៈ សម្មាសតិ និងសម្មាសមាធិ។ បញ្ចូលគ្នាបង្កើតទម្លាប់នៃការបណ្តុះស្មារតី និងការរស់នៅប្រកបដោយក្រមសីលធម៌។",
    accent: "from-emerald-200 to-emerald-400",
  },
];

export function BuddhistPhilosophy() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [activeKey, setActiveKey] = useState<TruthKey | null>(null);
  const [pauseOpen, setPauseOpen] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  const active = TRUTHS.find((tr) => tr.key === activeKey) ?? null;

  useEffect(() => {
    if (!active || !expandRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    expandRef.current.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
    });
  }, [active]);

  return (
    <section
      aria-labelledby="buddhist-philosophy-title"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <style>{`
        @keyframes bp-fade-up {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bp-petal-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bp-card-in {
          0%   { opacity: 0; transform: translateY(8px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0)   scale(1);     }
        }
        .bp-fade-up { animation: bp-fade-up 0.55s ease-out both; }
        .bp-card-in { animation: bp-card-in 0.42s cubic-bezier(.2,.9,.3,1.05) both; }
        .bp-petal-rotate { animation: bp-petal-spin 60s linear infinite; transform-origin: center; }

        @media (prefers-reduced-motion: reduce) {
          .bp-fade-up, .bp-card-in, .bp-petal-rotate { animation: none !important; }
        }
      `}</style>

      <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50 border border-amber-200/60 p-6 sm:p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] overflow-hidden">
        {/* Subtle decorative lotus watermark */}
        <Lotus className="bp-petal-rotate absolute -top-16 -right-16 w-72 h-72 text-amber-300/15 pointer-events-none" />
        <Lotus className="absolute -bottom-20 -left-20 w-64 h-64 text-slate-400/10 pointer-events-none" />

        {/* Header */}
        <header className="relative text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/5 border border-slate-300 text-slate-700 text-[11px] font-bold tracking-[0.25em] uppercase">
            <Brain className="w-3.5 h-3.5" />
            {t("Philosophy Hub", "មជ្ឈមណ្ឌលទស្សនវិជ្ជា")}
          </div>
          <h2
            id="buddhist-philosophy-title"
            className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 ${kh ? "font-khmer leading-snug" : "font-display"}`}
          >
            {kh ? "ទស្សនវិជ្ជាព្រះពុទ្ធសាសនា" : "Buddhist Philosophy"}
            {!kh && (
              <span className="block text-base sm:text-lg font-medium text-amber-700 mt-2 tracking-wide">
                The Science of the Mind
              </span>
            )}
            {kh && (
              <span className="block text-sm font-sans font-normal text-amber-700 mt-2">
                (Buddhist Philosophy: The Science of the Mind)
              </span>
            )}
          </h2>

          {/* Thin gold rule with center lotus */}
          <div className="mt-5 flex items-center justify-center gap-3 text-amber-500/80">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/70" />
            <Lotus className="w-5 h-5" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/70" />
          </div>
        </header>

        {/* PART 1 — Introduction */}
        <article className="bp-fade-up relative max-w-3xl mx-auto mb-10 text-center">
          <p className={`text-slate-700 leading-relaxed text-base sm:text-lg ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Long before modern psychology existed, the Buddha was already mapping the human mind. Think of him not only as a religious figure, but as an ancient psychologist and philosopher who carefully studied how our thoughts, cravings, and habits create suffering — and how the same mind can be trained to find peace.",
              "មុនពេលចិត្តវិទ្យាសម័យទំនើបកើតមាន ព្រះពុទ្ធបានធ្វើផែនទីនៃចិត្តមនុស្សរួចហើយ។ សូមគិតពីព្រះអង្គមិនត្រឹមតែជាបុគ្គលសាសនាប៉ុណ្ណោះទេ ប៉ុន្តែជាអ្នកចិត្តវិទ្យា និងទស្សនវិទូបុរាណ ដែលបានសិក្សាយ៉ាងម៉ត់ចត់ពីរបៀបដែលគំនិត តណ្ហា និងទម្លាប់របស់យើងបង្កើតការឈឺចាប់ — ហើយរបៀបដែលចិត្តដដែលនោះអាចបណ្តុះបណ្តាលឲ្យរកឃើញសន្តិភាព។"
            )}
          </p>
        </article>

        {/* PART 2 — Diagnostic logic title */}
        <div className="relative text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-200 text-xs font-bold tracking-widest uppercase">
            <Stethoscope className="w-4 h-4" />
            {t("The Four Noble Truths · Diagnostic Logic", "អរិយសច្ចៈ ៤ · តក្កវិទ្យាវិនិច្ឆ័យ")}
          </div>
          <p className={`mt-3 text-sm text-slate-500 max-w-xl mx-auto ${kh ? "font-khmer" : ""}`}>
            {t(
              "Tap each card below to read the Buddha's diagnosis of the mind, presented like a doctor's chart.",
              "ចុចលើកាតនីមួយៗខាងក្រោម ដើម្បីអានការវិនិច្ឆ័យចិត្តរបស់ព្រះពុទ្ធ ដែលបង្ហាញដូចតារាងវេជ្ជបណ្ឌិត។"
            )}
          </p>
        </div>

        {/* The 4 truth cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {TRUTHS.map((tr) => {
            const isActive = tr.key === activeKey;
            return (
              <button
                key={tr.key}
                type="button"
                onClick={() => setActiveKey((cur) => (cur === tr.key ? null : tr.key))}
                aria-pressed={isActive}
                aria-label={`${tr.roleEn} — ${tr.paliEn}: ${tr.meaningEn}`}
                className={`group relative text-left rounded-2xl bg-white border p-5 transition-all
                            ${isActive
                              ? "border-amber-400 shadow-xl ring-2 ring-amber-300/60 -translate-y-0.5"
                              : "border-slate-200 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5"}`}
              >
                {/* Step + accent bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400">
                    {tr.step}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tr.accent} flex items-center justify-center shadow-sm`}>
                    <tr.Icon className="w-5 h-5 text-slate-900" strokeWidth={2.4} />
                  </div>
                </div>

                <div className={`text-[10px] uppercase tracking-[0.2em] font-bold text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? tr.roleKh : tr.roleEn}
                </div>
                <div className={`mt-1 text-xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}>
                  {kh ? tr.paliKh : tr.paliEn}
                </div>
                <div className={`text-xs ${kh ? "text-slate-500" : "font-khmer text-slate-500"}`}>
                  {kh ? tr.paliEn : tr.paliKh}
                </div>
                <p className={`mt-2 text-sm font-medium text-slate-600 ${kh ? "font-khmer" : ""}`}>
                  {kh ? tr.meaningKh : tr.meaningEn}
                </p>

                {/* Hairline accent at the bottom of the card */}
                <div className={`absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r ${tr.accent} opacity-${isActive ? "100" : "70"}`} />
              </button>
            );
          })}
        </div>

        {/* Expanded body */}
        <div ref={expandRef} className="mb-10">
          {active && (
            <article
              key={active.key}
              className="bp-card-in rounded-2xl bg-white border border-slate-200 shadow-md p-5 sm:p-7 relative overflow-hidden"
              aria-live="polite"
            >
              <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${active.accent}`} />
              <div className="flex items-start gap-4 pl-2">
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${active.accent} flex items-center justify-center shadow`}>
                  <active.Icon className="w-6 h-6 text-slate-900" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[10px] uppercase tracking-[0.25em] font-bold text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    {kh ? active.roleKh : active.roleEn} · {active.step}
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                    {kh ? active.paliKh : active.paliEn}
                    <span className="text-amber-700 font-medium text-lg ml-2">
                      — {kh ? active.meaningKh : active.meaningEn}
                    </span>
                  </h3>
                  <p className={`mt-3 text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? active.bodyKh : active.bodyEn}
                  </p>
                </div>
              </div>
            </article>
          )}
          {!active && (
            <p className={`text-center text-sm text-slate-400 italic ${kh ? "font-khmer" : ""}`}>
              {t(
                "Select any card above to read the full diagnosis.",
                "ជ្រើសរើសកាតណាមួយខាងលើ ដើម្បីអានការវិនិច្ឆ័យពេញលេញ។"
              )}
            </p>
          )}
        </div>

        {/* PART 3 — Mindful Pause CTA */}
        <div className="relative text-center">
          <button
            type="button"
            onClick={() => setPauseOpen(true)}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-amber-100 font-bold border-2 border-amber-300/60 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(15,23,42,0.8)] hover:-translate-y-0.5 transition-all"
          >
            <Lotus className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-45" />
            <span className={kh ? "font-khmer" : ""}>
              {t("Take a Mindful Pause", "សម្រាកធ្វើសមាធិ")}
            </span>
          </button>
          <p className={`mt-3 text-xs text-slate-500 max-w-md mx-auto ${kh ? "font-khmer" : "italic"}`}>
            {t(
              "A 30-second guided breath, right here on the page.",
              "ការដកដង្ហើមណែនាំ ៣០ វិនាទី នៅទីនេះលើទំព័រ។"
            )}
          </p>
        </div>
      </div>

      {pauseOpen && <MindfulPauseOverlay onClose={() => setPauseOpen(false)} kh={kh} t={t} />}
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  MINDFUL PAUSE OVERLAY                                         */
/* -------------------------------------------------------------- */

function MindfulPauseOverlay({
  onClose,
  kh,
  t,
}: {
  onClose: () => void;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const phases = [
    { key: "in", labelEn: "Breathe in", labelKh: "ដកដង្ហើមចូល", durationMs: 4000 },
    { key: "hold", labelEn: "Hold", labelKh: "ឈប់", durationMs: 2000 },
    { key: "out", labelEn: "Breathe out", labelKh: "ដកដង្ហើមចេញ", durationMs: 4000 },
  ];

  const TOTAL_BREATHS = 3;
  const [breath, setBreath] = useState(1);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [done, setDone] = useState(false);

  // Allow Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    // Lock background scroll while overlay is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Phase scheduler
  useEffect(() => {
    if (done) return;
    const cur = phases[phaseIdx];
    const id = window.setTimeout(() => {
      const nextPhase = phaseIdx + 1;
      if (nextPhase >= phases.length) {
        // Completed one full breath cycle
        if (breath >= TOTAL_BREATHS) {
          setDone(true);
        } else {
          setBreath((b) => b + 1);
          setPhaseIdx(0);
        }
      } else {
        setPhaseIdx(nextPhase);
      }
    }, cur.durationMs);
    return () => window.clearTimeout(id);
  }, [phaseIdx, breath, done]);

  const phase = phases[phaseIdx];
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Circle scale per phase. We animate scale via inline transition so the duration
  // matches the phase precisely.
  const targetScale = phase.key === "in" ? 1 : phase.key === "hold" ? 1 : 0.5;
  const transitionMs = reduced ? 0 : phase.durationMs;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("Mindful pause", "សម្រាកធ្វើសមាធិ")}
      className="fixed inset-0 z-[80] flex items-center justify-center"
    >
      {/* Dim backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("Close mindful pause", "បិទសម្រាកធ្វើសមាធិ")}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-100 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6">
        {!done && (
          <>
            <div className="text-amber-200/70 text-xs uppercase tracking-[0.4em] font-bold mb-8">
              {t(`Breath ${breath} of ${TOTAL_BREATHS}`, `ដង្ហើមទី ${breath} ក្នុង ${TOTAL_BREATHS}`)}
            </div>

            {/* Expanding/contracting circle */}
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
              {/* Soft outer halo */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/30 via-amber-200/10 to-transparent blur-2xl"
                style={{
                  transform: `scale(${targetScale})`,
                  transition: `transform ${transitionMs}ms cubic-bezier(.45,.05,.55,.95)`,
                }}
              />
              {/* Main breathing circle */}
              <div
                className="relative w-full h-full rounded-full border-2 border-amber-200/50 bg-gradient-to-br from-amber-100/15 via-amber-200/5 to-amber-300/15 shadow-[0_0_60px_rgba(252,211,77,0.25)] flex items-center justify-center"
                style={{
                  transform: `scale(${targetScale})`,
                  transition: `transform ${transitionMs}ms cubic-bezier(.45,.05,.55,.95)`,
                }}
              >
                <Lotus className="w-12 h-12 sm:w-16 sm:h-16 text-amber-200/80" />
              </div>
            </div>

            {/* Phase label */}
            <div className="mt-8 min-h-[3.5rem]">
              <div
                key={`${breath}-${phase.key}`}
                className={`text-3xl sm:text-4xl font-display text-amber-50 transition-opacity ${kh ? "font-khmer" : ""}`}
              >
                {kh ? phase.labelKh : phase.labelEn}
              </div>
              <div className={`mt-1 text-sm ${kh ? "text-amber-200/60" : "font-khmer text-amber-200/60"}`}>
                {kh ? phase.labelEn : phase.labelKh}
              </div>
            </div>
          </>
        )}

        {done && (
          <div className="bp-card-in flex flex-col items-center text-center max-w-md">
            <Lotus className="w-16 h-16 text-amber-200 mb-5" />
            <h3 className={`text-3xl sm:text-4xl font-display text-amber-50 mb-3 ${kh ? "font-khmer" : ""}`}>
              {t("Welcome back.", "សូមស្វាគមន៍ត្រឡប់មកវិញ។")}
            </h3>
            <p className={`text-amber-100/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "That small pause you just took is the practice. The Eightfold Path is built from moments exactly like this one.",
                "ការសម្រាកតូចមួយដែលអ្នកទើបនឹងធ្វើ គឺជាការអនុវត្ត។ មគ្គមានអង្គប្រាំបី ត្រូវបានបង្កើតពីពេលវេលាដូចនេះ។"
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              className={`mt-6 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold transition-colors ${kh ? "font-khmer" : ""}`}
            >
              {t("Return to the page", "ត្រឡប់ទៅទំព័រ")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- */
/*  Lotus motif (clean, minimal SVG — no heavy iconography)        */
/* -------------------------------------------------------------- */

function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Center petal */}
      <path d="M50 20 C 45 40, 45 55, 50 70 C 55 55, 55 40, 50 20 Z" />
      {/* Inner side petals */}
      <path d="M50 70 C 35 60, 30 45, 32 30 C 40 40, 47 55, 50 70 Z" />
      <path d="M50 70 C 65 60, 70 45, 68 30 C 60 40, 53 55, 50 70 Z" />
      {/* Outer side petals */}
      <path d="M50 70 C 28 70, 18 58, 16 42 C 28 50, 42 60, 50 70 Z" />
      <path d="M50 70 C 72 70, 82 58, 84 42 C 72 50, 58 60, 50 70 Z" />
      {/* Water line */}
      <path d="M14 76 Q 32 80 50 76 T 86 76" opacity="0.6" />
    </svg>
  );
}
