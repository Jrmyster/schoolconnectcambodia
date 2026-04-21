import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Sigma,
  Compass,
  Activity,
  Infinity as InfinityIcon,
  Lightbulb,
  Ruler,
  Zap,
  ScrollText,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  LOG-01 · Logarithms: The Scale of Nature
//           លោការីត៖ រង្វាស់នៃធម្មជាតិ
//
//   1. The Question of "How Many?"  — exponent vs. its inverse
//   2. Taming Infinity              — Richter scale, log scales
//   3. The Natural Log and 'e'      — Euler's number, ln(x), continuous growth
//
//   Aesthetic: clean academic math typography on cream / chalk background,
//   indigo & rose accents, KaTeX for every equation.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#faf7f2", // warm chalk
  backgroundImage:
    "linear-gradient(rgba(30, 27, 75, 0.06) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(30, 27, 75, 0.06) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-indigo-300/60" : "border-indigo-500/70";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="contents">
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function LogarithmsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-indigo-950 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(165, 180, 252, 0.18), transparent 55%)," +
              "linear-gradient(rgba(165, 180, 252, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(165, 180, 252, 0.10) 1px, transparent 1px)",
            backgroundSize: "auto, 32px 32px, 32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-500/15 border-2 border-indigo-300/60 text-indigo-100 flex items-center justify-center flex-shrink-0">
              <Sigma className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Mathematics", "គណិតវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-indigo-100">LOG-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Logarithms: The Scale of Nature",
                  "លោការីត៖ រង្វាស់នៃធម្មជាតិ"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-indigo-100/85 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "From the magnitude of an earthquake to the cooling of a cup of coffee, nature loves to multiply. Logarithms are the tool that lets us read those vast multiplied numbers as small, friendly ones — the scale of nature, written down.",
                  "ចាប់ពីកម្លាំងរញ្ជួយដី រហូតដល់ការត្រជាក់នៃកាហ្វេមួយកែវ ធម្មជាតិចូលចិត្តគុណ។ លោការីតគឺជាឧបករណ៍ដែលអនុញ្ញាតឱ្យយើងអានលេខគុណធំៗ ជាលេខតូចៗងាយយល់ — រង្វាស់នៃធម្មជាតិ ដែលត្រូវបានកត់ត្រាទុក។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <SectionHowMany kh={kh} t={t} />
        <SectionTamingInfinity kh={kh} t={t} />
        <SectionNaturalLog kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-indigo-200 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <ScrollText className="w-6 h-6 text-indigo-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("In one line: ", "ក្នុងមួយបន្ទាត់ ៖ ")}</strong>
            {t(
              "An exponent multiplies a number by itself many times; a logarithm asks how many times that was. With ",
              "អិចស្ប៉ូណង់សយលគុណលេខមួយដោយខ្លួនវាច្រើនដង។ លោការីតសួរថា ‘តើគុណប៉ុន្មានដង?’។ ដោយប្រើ "
            )}
            <span className="font-semibold"><InlineMath math="\log" /></span>
            {t(
              ", we shrink the entire universe of multiplications down to numbers we can write on a single line.",
              " យើងបង្រួមសកលលោកទាំងមូលនៃការគុណ មកជាលេខដែលយើងអាចសរសេរនៅបន្ទាត់តែមួយ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-900 text-white text-sm font-bold shadow hover:bg-indigo-800 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Question of "How Many?"
// ════════════════════════════════════════════════════════════════════════════

function SectionHowMany({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-howmany">
      <SectionHeader
        spec="01"
        en={`The Question of "How Many?"`}
        kh="សំណួរនៃ ‘ចំនួនប៉ុន្មាន?’"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-indigo-200 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A logarithm is simply the ", "លោការីតគឺគ្រាន់តែជា "
              )}
              <strong className="text-indigo-800">{t("inverse — the opposite — of an exponent", "ច្រាស — ផ្ទុយ — នៃអិចស្ប៉ូណង់សយល")}</strong>
              {t(
                ". Exponents and logarithms are two sides of the same question, asked from opposite directions.",
                "។ អិចស្ប៉ូណង់សយល និងលោការីត គឺជាសំណួរតែមួយ ដែលសួរពីទិសផ្ទុយគ្នា។"
              )}
            </p>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 mb-4 space-y-3">
              <div>
                <div className={`text-[11px] font-mono uppercase tracking-widest text-indigo-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {t("EXPONENT — forward question", "អិចស្ប៉ូណង់សយល — សំណួរទៅមុខ")}
                </div>
                <p className={`text-sm text-slate-800 mb-2 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "“What do I get if I multiply 2 by itself 3 times?”",
                    "«តើខ្ញុំទទួលបានអ្វី ប្រសិនបើខ្ញុំគុណ 2 ដោយខ្លួនវា 3 ដង?»"
                  )}
                </p>
                <div className="text-center"><BlockMath math="2^3 = 2 \times 2 \times 2 = 8" /></div>
              </div>

              <div className="border-t border-indigo-200 pt-3">
                <div className={`text-[11px] font-mono uppercase tracking-widest text-rose-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {t("LOGARITHM — reverse question", "លោការីត — សំណួរបញ្ច្រាស")}
                </div>
                <p className={`text-sm text-slate-800 mb-2 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "“How many times do I have to multiply 2 by itself to get 8?”",
                    "«តើខ្ញុំត្រូវគុណ 2 ដោយខ្លួនវាប៉ុន្មានដង ដើម្បីទទួលបាន 8?»"
                  )}
                </p>
                <div className="text-center"><BlockMath math="\log_2(8) = 3" /></div>
              </div>
            </div>

            <p className={`text-foreground text-sm sm:text-base ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "In general, the two definitions are perfect mirrors of each other:",
                "ជាទូទៅ និយមន័យទាំងពីរនេះ គឺឆ្លុះគ្នាយ៉ាងពេញលេញ ៖"
              )}
            </p>
            <div className="my-3 text-center">
              <BlockMath math="b^y = x \quad \Longleftrightarrow \quad \log_b(x) = y" />
            </div>
            <p className={`text-xs text-slate-600 text-center mb-2 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Read aloud: \"b raised to the power y equals x\" is the same statement as \"log base b of x equals y\".",
                "អានឱ្យឮ ៖ «b លើកស្វ័យគុណ y ស្មើ x» គឺជាសេចក្ដីដូចគ្នានឹង «លោការីត គោល b នៃ x ស្មើ y»។"
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2" data-testid="howmany-vocab">
              <VocabChip color="indigo" en="Base"        kh="គោល"            k={kh} />
              <VocabChip color="rose"   en="Exponent"    kh="អិចស្ប៉ូណង់"    k={kh} />
              <VocabChip color="amber"  en="Argument"    kh="អាគុយម៉ង់"      k={kh} />
              <VocabChip color="emerald" en="Inverse"    kh="ច្រាស"          k={kh} />
            </div>
          </div>

          <div className="rounded-xl bg-indigo-950 text-indigo-50 p-5 border border-indigo-700">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-indigo-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("WORKED EXAMPLES", "ឧទាហរណ៍ដោះស្រាយ")}
            </div>
            <div className="space-y-3 text-sm">
              <Example
                question={t("How many 10s multiply to 1,000?", "តើ 10 ប៉ុន្មានគុណគ្នា ដើម្បីបាន 1,000?")}
                eq="\log_{10}(1000) = 3"
                because="10 \times 10 \times 10 = 1{,}000"
                kh={kh}
              />
              <Example
                question={t("How many 2s multiply to 32?", "តើ 2 ប៉ុន្មានគុណគ្នា ដើម្បីបាន 32?")}
                eq="\log_2(32) = 5"
                because="2 \times 2 \times 2 \times 2 \times 2 = 32"
                kh={kh}
              />
              <Example
                question={t("How many 5s multiply to 1?", "តើ 5 ប៉ុន្មានគុណគ្នា ដើម្បីបាន 1?")}
                eq="\log_5(1) = 0"
                because="5^{0} = 1"
                note={t("(any base to the 0 is 1)", "(គោលណាក៏ដោយ លើកស្វ័យគុណ 0 ស្មើ 1)")}
                kh={kh}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Example({
  question,
  eq,
  because,
  note,
  kh,
}: {
  question: string;
  eq: string;
  because: string;
  note?: string;
  kh: boolean;
}) {
  return (
    <div className="rounded-lg bg-indigo-900/50 border border-indigo-700/60 p-3">
      <p className={`text-indigo-100 text-[13px] mb-1 ${kh ? "font-khmer leading-loose" : ""}`}>
        {question}
      </p>
      <div className="text-center my-1"><InlineMath math={eq} /></div>
      <div className={`text-[11px] text-indigo-300/80 text-center ${kh ? "font-khmer" : "font-mono"}`}>
        {kh ? "ព្រោះ ៖ " : "because: "}<InlineMath math={because} />
        {note ? <span className={`ml-1 ${kh ? "font-khmer" : ""}`}>{note}</span> : null}
      </div>
    </div>
  );
}

function VocabChip({
  color,
  en,
  kh,
  k,
}: {
  color: "indigo" | "rose" | "amber" | "emerald";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    indigo:  "border-indigo-300 text-indigo-800 bg-indigo-50",
    rose:    "border-rose-300 text-rose-800 bg-rose-50",
    amber:   "border-amber-300 text-amber-800 bg-amber-50",
    emerald: "border-emerald-300 text-emerald-800 bg-emerald-50",
  };
  return (
    <span
      className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${colours[color]} ${k ? "font-khmer" : ""}`}
    >
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Taming Infinity (Richter scale)
// ════════════════════════════════════════════════════════════════════════════

function SectionTamingInfinity({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-taming">
      <SectionHeader
        spec="02"
        en="Taming Infinity"
        kh="ការគ្រប់គ្រងភាពអនន្ត"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-rose-200 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Some numbers in nature are wildly bigger than others — the energy of a tiny tremor versus the energy of a great earthquake, the loudness of a whisper versus a jet engine, the brightness of a candle versus the Sun. A normal number line cannot hold them all. So we use a ",
                "លេខខ្លះនៅក្នុងធម្មជាតិធំជាងលេខផ្សេងទៀតយ៉ាងខ្លាំង — ថាមពលនៃការរញ្ជួយតូចមួយ ធៀបនឹងថាមពលនៃរញ្ជួយដីដ៏ធំ សំឡេងរបស់សន្ទូចធៀបនឹងម៉ាស៊ីនយន្តហោះ ភាពភ្លឺនៃទៀនមួយធៀបនឹងព្រះអាទិត្យ។ បន្ទាត់លេខធម្មតាមិនអាចផ្ទុកវាបានទាំងអស់នោះទេ។ ដូច្នេះយើងប្រើ "
              )}
              <strong className="text-rose-800">{t("logarithmic scale", "រង្វាស់លោការីត")}</strong>
              {t(
                ": every step on the scale means a fixed multiplication, not a fixed addition.",
                " ៖ រាល់ជំហានលើរង្វាស់ មានន័យថាការគុណថេរមួយ មិនមែនបូកថេរមួយទេ។"
              )}
            </p>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 mb-4">
              <div className={`text-[11px] font-mono uppercase tracking-widest text-rose-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("EXAMPLE · The Richter scale", "ឧទាហរណ៍ · រង្វាស់រីឆ្ទ័រ")}
              </div>
              <p className={`text-sm text-slate-800 mb-2 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "Earthquake magnitude uses base 10 — each whole step is ",
                  "កម្លាំងនៃរញ្ជួយដីប្រើគោល 10 — ជំហានគ្រប់ចំនួនពេញនីមួយៗគឺ "
                )}
                <strong>{t("10× more powerful", "មានកម្លាំងច្រើនជាង 10 ដង")}</strong>{" "}
                {t(
                  "in shaking amplitude than the previous one.",
                  "ក្នុងផលប៉ះពាល់នៃការរញ្ជួយ បើធៀបនឹងជំហានមុន។"
                )}
              </p>
              <div className="text-center">
                <BlockMath
                  math={
                    kh
                      ? "M = \\log_{10}\\!\\left(\\frac{A}{A_0}\\right)"
                      : "\\text{magnitude}\\;M = \\log_{10}\\!\\left(\\frac{A}{A_0}\\right)"
                  }
                />
                {kh ? (
                  <p className="font-khmer text-[11px] text-rose-700 mt-1">
                    M = កម្លាំងនៃរញ្ជួយដី
                  </p>
                ) : null}
              </div>
              <p className={`text-[11px] text-rose-700 text-center mt-1 ${kh ? "font-khmer leading-loose" : "font-mono"}`}>
                {t(
                  "A = measured amplitude · A₀ = reference amplitude",
                  "A = ផលប៉ះពាល់វាស់បាន · A₀ = ផលប៉ះពាល់យោង"
                )}
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-amber-50 border-l-4 border-amber-400 p-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-amber-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong>{t("Key insight: ", "គំនិតគន្លឹះ ៖ ")}</strong>
                {t(
                  "A magnitude 6 quake is not “one bigger” than a magnitude 5 — it shakes the ground 10× more strongly. A magnitude 7 shakes 100× more strongly than a 5. Going from 5 to 9 means 10,000× the shaking.",
                  "រញ្ជួយដីកម្រិត 6 មិនមែន ‘ធំជាងមួយជំហាន’ ជាង 5 ទេ — វារញ្ជួយដីខ្លាំងជាង 10 ដង។ កម្រិត 7 រញ្ជួយខ្លាំងជាង 5 ដល់ 100 ដង។ ពី 5 ទៅ 9 មានន័យថា រញ្ជួយខ្លាំងជាង 10,000 ដង។"
                )}
              </p>
            </div>
          </div>

          {/* Richter ladder */}
          <RichterLadder kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

function RichterLadder({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // Each row: magnitude, multiplier vs M=4, label EN, label KH
  const rows = [
    { m: 4, mult: "1×",       en: "Felt indoors",                kh: "មានអារម្មណ៍ខាងក្នុងផ្ទះ" },
    { m: 5, mult: "10×",      en: "Furniture rattles",           kh: "គ្រឿងសង្ហារឹមរញ្ជួយ" },
    { m: 6, mult: "100×",     en: "Walls crack",                 kh: "ជញ្ជាំងបែកស្រាំ" },
    { m: 7, mult: "1,000×",   en: "Buildings damaged",           kh: "អគារខូចខាត" },
    { m: 8, mult: "10,000×",  en: "Major destruction",           kh: "ការបំផ្លាញធំ" },
    { m: 9, mult: "100,000×", en: "Cataclysmic, rare",           kh: "មហន្តរាយ កម្រកើតមាន" },
  ];
  return (
    <div className="rounded-xl bg-slate-900 text-slate-100 p-4 border border-slate-700" data-testid="richter-ladder">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-300/90 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("RICHTER · LOG SCALE (BASE 10)", "រីឆ្ទ័រ · រង្វាស់លោការីត (គោល 10)")}
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.m}
            className="flex items-center gap-3 rounded-md bg-slate-800/70 px-3 py-2 border border-slate-700/70"
          >
            <span className="font-mono font-bold text-rose-300 w-8 text-center">M{r.m}</span>
            <span className="text-xs text-slate-300 font-mono w-20 text-right tabular-nums">{r.mult}</span>
            <span className={`flex-1 text-xs text-slate-100 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? r.kh : r.en}
            </span>
          </li>
        ))}
      </ul>
      <div className={`mt-3 text-center text-[11px] text-slate-400 ${kh ? "font-khmer leading-loose" : "font-mono"}`}>
        {t(
          "+1 step = ×10 stronger shaking",
          "+1 ជំហាន = ×10 រញ្ជួយខ្លាំងជាង"
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Natural Log and 'e'
// ════════════════════════════════════════════════════════════════════════════

function SectionNaturalLog({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-natural">
      <SectionHeader
        spec="03"
        en="The Natural Log and ‘e’"
        kh="លោការីតធម្មជាតិ និង ‘e’"
        kh_={kh}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* The number e */}
        <article
          className="relative rounded-2xl border-2 border-emerald-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="e-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <InfinityIcon className="w-5 h-5 text-emerald-700" />
            <h3 className={`text-lg font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
              {t("The number e (Euler's number)", "ចំនួន e (ចំនួនអ៊ុយលឺរ)")}
            </h3>
          </div>

          <div className="text-center my-3">
            <BlockMath math="e \approx 2.718281828\ldots" />
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The number ",
              "ចំនួន "
            )}
            <InlineMath math="e" />
            {t(
              " is one of the great constants of mathematics, sitting alongside ",
              " គឺជាចំនួនថេរដ៏សំខាន់មួយក្នុងគណិតវិទ្យា ស្ថិតនៅជាមួយ "
            )}
            <InlineMath math="\pi" />
            {t(
              ". It is the ",
              "។ វាគឺជា "
            )}
            <strong className="text-emerald-800">{t("universal speed limit of continuous, compounding growth", "ដែនកំណត់ល្បឿនសកល នៃកំណើនបន្តដោយផ្គុំគ្នា")}</strong>
            {t(
              ": when something grows on every fraction of a second by a tiny percentage of its current size, the natural rate of that growth is ",
              " ៖ នៅពេលអ្វីៗដុះធំឡើងរាល់ភាគរយវិនាទីដោយភាគរយតូចមួយនៃទំហំបច្ចុប្បន្នរបស់វា អត្រាធម្មជាតិនៃកំណើននោះគឺ "
            )}
            <InlineMath math="e" />
            .
          </p>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-center">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Continuous growth limit", "ដែនកំណត់នៃកំណើនបន្ត")}
            </div>
            <BlockMath math="\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^{n} = e" />
            <p className={`text-[11px] text-emerald-800 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Split a year into n compounding periods; as n → ∞, the year's multiplier locks onto e.",
                "ចែកមួយឆ្នាំជា n ដំណាក់កាលផ្គុំ ពេល n → ∞ មេគុណប្រចាំឆ្នាំ ឈរនឹងលើតម្លៃ e។"
              )}
            </p>
          </div>
        </article>

        {/* Natural log */}
        <article
          className="relative rounded-2xl border-2 border-indigo-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="ln-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-indigo-700" />
            <h3 className={`text-lg font-bold text-indigo-900 ${kh ? "font-khmer" : ""}`}>
              {t("The Natural Logarithm — ln(x)", "លោការីតធម្មជាតិ — ln(x)")}
            </h3>
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The natural logarithm is just an ordinary logarithm whose base is ",
              "លោការីតធម្មជាតិ គឺជាលោការីតធម្មតាមួយ ដែលគោលរបស់វាគឺ "
            )}
            <InlineMath math="e" />
            {t(
              ". It has its own short name and symbol because it appears constantly in nature.",
              "។ វាមានឈ្មោះខ្លី និងនិមិត្តសញ្ញាផ្ទាល់ខ្លួន ព្រោះវាកើតមានជាប្រចាំនៅក្នុងធម្មជាតិ។"
            )}
          </p>

          <div className="text-center my-3">
            <BlockMath math="\ln(x) \;\;=\;\; \log_{e}(x)" />
          </div>

          <p className={`text-sm text-slate-800 mb-2 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Because they undo each other, ln and the exponential ",
              "ដោយសារវាបង្វិលគ្នា ln និងអិចស្ប៉ូណង់ស្យែល "
            )}
            <InlineMath math="e^{x}" />
            {t(
              " are perfect inverses:",
              " គឺជាច្រាសបេះបិទរបស់គ្នាទៅវិញទៅមក ៖"
            )}
          </p>
          <div className="text-center"><BlockMath math="e^{\ln(x)} = x \qquad \ln(e^{x}) = x" /></div>

          <div className="mt-3 rounded-lg bg-indigo-50 border-l-4 border-indigo-400 p-3 flex items-start gap-3">
            <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <p className={`text-sm text-indigo-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("Used by scientists to track: ", "ប្រើដោយអ្នកវិទ្យាសាស្ត្រដើម្បីតាមដាន ៖ ")}</strong>
              {t(
                "how populations of fish or bacteria grow, how a hot cup of coffee cools toward room temperature, and how radioactive elements decay — all of these obey laws written with ln and ",
                "របៀបដែលប្រជាជាតិរបស់ត្រី ឬបាក់តេរីដុះធំ របៀបដែលកាហ្វេក្ដៅមួយកែវត្រជាក់ទៅរកសីតុណ្ហភាពបន្ទប់ និងរបៀបដែលធាតុវិទ្យុសកម្មរលួយ — ទាំងអស់នេះគោរពតាមច្បាប់ដែលសរសេរដោយ ln និង "
              )}
              <InlineMath math="e^{x}" />
              .
            </p>
          </div>
        </article>
      </div>

      {/* Three real-world laws — quick gallery */}
      <div className="grid sm:grid-cols-3 gap-3 mt-5" data-testid="natural-laws">
        <LawCard
          title={t("Population growth", "កំណើនប្រជាជាតិ")}
          eq="N(t) = N_0\, e^{rt}"
          desc={t(
            "Starts at N₀, grows at rate r — fish in a pond, viruses in a cell.",
            "ចាប់ផ្ដើមនៅ N₀ ដុះធំក្នុងអត្រា r — ត្រីក្នុងស្រះ វីរុសក្នុងកោសិកា។"
          )}
          k={kh}
        />
        <LawCard
          title={t("Newton's cooling", "ច្បាប់ត្រជាក់ញូតុន")}
          eq="T(t) = T_s + (T_0 - T_s)\, e^{-kt}"
          desc={t(
            "A hot drink falls toward room temperature on an ln-curve.",
            "ភេសជ្ជៈក្ដៅមួយធ្លាក់ទៅរកសីតុណ្ហភាពបន្ទប់ លើខ្សែកោង ln។"
          )}
          k={kh}
        />
        <LawCard
          title={t("Radioactive decay", "ការរលួយវិទ្យុសកម្ម")}
          eq="N(t) = N_0\, e^{-\lambda t}"
          desc={t(
            "Atoms vanish at rate λ; ln sets the half-life clock.",
            "អាតូមរលាយក្នុងអត្រា λ; ln កំណត់នាឡិកាពាក់កណ្ដាលជីវិត។"
          )}
          k={kh}
        />
      </div>
    </section>
  );
}

function LawCard({
  title,
  eq,
  desc,
  k,
}: {
  title: string;
  eq: string;
  desc: string;
  k: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-3 shadow-sm">
      <div className={`text-sm font-bold text-slate-900 mb-1 ${k ? "font-khmer" : ""}`}>{title}</div>
      <div className="text-center my-2"><InlineMath math={eq} /></div>
      <p className={`text-[12px] text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>{desc}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers — Section header
// ════════════════════════════════════════════════════════════════════════════

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-indigo-700 bg-indigo-50 border border-indigo-300 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-slate-400 ml-1" />
      <div className="flex-1 border-t border-dashed border-slate-300" />
    </div>
  );
}
