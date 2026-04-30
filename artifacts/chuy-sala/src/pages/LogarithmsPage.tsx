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
  Droplet,
  Volume2,
  Mountain,
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
        <SectionRules kh={kh} t={t} />
        <SectionTamingInfinity kh={kh} t={t} />
        <SectionNaturalLog kh={kh} t={t} />
        <SectionRealWorld kh={kh} t={t} />

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

// ════════════════════════════════════════════════════════════════════════════
//  Section 01b — The 7 Rules of Logarithms
//                វិធានទាំង ៧ នៃលោការីត
//
//  Dark indigo "chalkboard" cards rendering each rule as a color-tinted KaTeX
//  formula (M = indigo, N = rose, k = amber, special results = emerald).
// ════════════════════════════════════════════════════════════════════════════

// KaTeX-friendly hex tints for equation variables.
const RULE_M_COLOR = "#a5b4fc"; // indigo-300 — first number  M
const RULE_N_COLOR = "#fda4af"; // rose-300   — second number N
const RULE_K_COLOR = "#fbbf24"; // amber-400  — exponent / scalar k
const RULE_RES_COLOR = "#86efac"; // emerald-300 — special results (0, 1, k)

const M_ = `\\textcolor{${RULE_M_COLOR}}{M}`;
const N_ = `\\textcolor{${RULE_N_COLOR}}{N}`;
const K_ = `\\textcolor{${RULE_K_COLOR}}{k}`;

function RuleCard({
  n,
  enTitle,
  khTitle,
  eq,
  enHint,
  khHint,
  k,
  featured = false,
}: {
  n: number;
  enTitle: string;
  khTitle: string;
  eq: string;
  enHint: string;
  khHint: string;
  k: boolean;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border ${
        featured
          ? "border-emerald-500/60 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 shadow-lg p-4 sm:p-5"
          : "border-indigo-800/70 bg-indigo-950 p-4"
      }`}
      data-testid={`rule-card-${n}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center justify-center min-w-[2rem] h-6 px-1.5 rounded-md font-mono font-bold text-[11px] ${
            featured
              ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/50"
              : "bg-indigo-500/15 text-indigo-200 border border-indigo-400/50"
          }`}
          aria-hidden="true"
        >
          R{n}
        </span>
        <h3
          className={`text-sm sm:text-[15px] font-bold text-indigo-50 ${k ? "font-khmer" : ""}`}
        >
          {k ? khTitle : enTitle}
        </h3>
      </div>

      <div
        className={`text-center bg-black/30 rounded-md border border-indigo-900/60 my-2 overflow-x-auto ${
          featured ? "py-3 px-2" : "py-2 px-2"
        }`}
      >
        <BlockMath math={eq} />
      </div>

      <p
        className={`text-[11.5px] text-indigo-200/85 mt-2 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
      >
        {k ? khHint : enHint}
      </p>
    </div>
  );
}

function SectionRules({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const rules = [
    {
      n: 1,
      en: "Product Rule",
      kh: "វិធានផលគុណ",
      eq: `\\log_b(${M_} \\cdot ${N_}) = \\log_b ${M_} + \\log_b ${N_}`,
      enHint: "A log of a product splits into a sum of logs.",
      khHint: "លោការីតនៃផលគុណ បំបែកទៅជាផលបូកនៃលោការីត។",
    },
    {
      n: 2,
      en: "Quotient Rule",
      kh: "វិធានផលចែក",
      eq: `\\log_b\\!\\left(\\dfrac{${M_}}{${N_}}\\right) = \\log_b ${M_} - \\log_b ${N_}`,
      enHint: "A log of a quotient splits into a difference of logs.",
      khHint: "លោការីតនៃផលចែក បំបែកទៅជាផលដកនៃលោការីត។",
    },
    {
      n: 3,
      en: "Power Rule",
      kh: "វិធានស្វ័យគុណ",
      eq: `\\log_b\\!\\left(${M_}^{${K_}}\\right) = ${K_} \\cdot \\log_b ${M_}`,
      enHint: "An exponent inside the log slides out in front as a multiplier.",
      khHint: "ស្វ័យគុណនៅខាងក្នុងលោការីត អាចរំកិលចេញមកខាងមុខជាគុណការី។",
    },
    {
      n: 4,
      en: "Zero Rule",
      kh: "វិធានសូន្យ",
      eq: `\\log_b(1) = \\textcolor{${RULE_RES_COLOR}}{0}`,
      enHint: "Any base raised to the 0 power equals 1, so the log of 1 is always 0.",
      khHint: "គោលណាក៏ដោយ លើកស្វ័យគុណ 0 ស្មើ 1 ដូច្នេះលោការីតនៃ 1 តែងតែស្មើ 0។",
    },
    {
      n: 5,
      en: "Identity Rule",
      kh: "វិធានឯកតា",
      eq: `\\log_b(b) = \\textcolor{${RULE_RES_COLOR}}{1}`,
      enHint: "A base raised to the 1st power equals itself, so the log of the base is 1.",
      khHint: "គោលលើកស្វ័យគុណ 1 ស្មើនឹងខ្លួនវា ដូច្នេះលោការីតនៃគោល គឺស្មើ 1។",
    },
    {
      n: 6,
      en: "Power of Base",
      kh: "ស្វ័យគុណនៃគោល",
      eq: `\\log_b\\!\\left(b^{${K_}}\\right) = \\textcolor{${RULE_RES_COLOR}}{${K_}}`,
      enHint: "If the argument is the base raised to a power, the log just hands that power back.",
      khHint: "ប្រសិនបើអាគុយម៉ង់គឺគោលលើកស្វ័យគុណ លោការីតគ្រាន់តែប្រគល់ស្វ័យគុណនោះមកវិញ។",
    },
    {
      n: 7,
      en: "Base to Log Power",
      kh: "គោលស្វ័យគុណលោការីត",
      eq: `b^{\\log_b(${K_})} = \\textcolor{${RULE_RES_COLOR}}{${K_}}`,
      enHint: "Exponent and log are perfect inverses — they cancel each other cleanly, leaving only k.",
      khHint: "អិចស្ប៉ូណង់សយល និងលោការីត ជាច្រាសគ្នាយ៉ាងពេញលេញ — ពួកវាលុបគ្នាចេញយ៉ាងស្អាត ទុកនៅសល់តែ k ប៉ុណ្ណោះ។",
    },
  ];

  return (
    <section className="mb-10" data-testid="section-rules">
      <SectionHeader
        spec="01b"
        en="The 7 Rules of Logarithms"
        kh="វិធានទាំង ៧ នៃលោការីត"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-indigo-200 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />

        {/* Constraints callout */}
        <div
          className="rounded-xl border-2 border-amber-300 bg-amber-50/80 p-4 mb-5 flex items-start gap-3"
          data-testid="rules-constraints"
        >
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div
            className={`text-sm text-amber-900 flex-1 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            <strong className={kh ? "" : "font-bold"}>
              {t("Constraints: ", "លក្ខខណ្ឌ ៖ ")}
            </strong>
            {t(
              "For all rules below, the base ",
              "សម្រាប់រាល់វិធានខាងក្រោម គោល "
            )}
            <InlineMath math="b > 0" />
            {t(" and ", " និង ")}
            <InlineMath math="b \neq 1" />
            {t(". The numbers ", "។ លេខ ")}
            <InlineMath math="M" />
            {t(" and ", " និង ")}
            <InlineMath math="N" />
            {t(
              " must be positive real numbers (",
              " ត្រូវតែជាចំនួនពិតវិជ្ជមាន ("
            )}
            <InlineMath math="M > 0,\ N > 0" />
            {t("), and ", ") ហើយ ")}
            <InlineMath math="k" />
            {t(
              " is any real number — except in Rule 7, where ",
              " គឺជាចំនួនពិតណាមួយ — លើកលែងតែនៅវិធានទី ៧ ដែល "
            )}
            <InlineMath math="k > 0" />
            {t(
              " (since there it sits inside a logarithm).",
              " (ព្រោះនៅកន្លែងនោះ វាស្ថិតនៅខាងក្នុងលោការីត)។"
            )}
          </div>
        </div>

        {/* Rules grid (1 – 6) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          data-testid="rules-grid"
        >
          {rules.slice(0, 6).map((r) => (
            <RuleCard
              key={r.n}
              n={r.n}
              enTitle={r.en}
              khTitle={r.kh}
              eq={r.eq}
              enHint={r.enHint}
              khHint={r.khHint}
              k={kh}
            />
          ))}
        </div>

        {/* Rule 7 — featured (the inverse identity) */}
        <div className="mt-4">
          <RuleCard
            n={rules[6].n}
            enTitle={rules[6].en}
            khTitle={rules[6].kh}
            eq={rules[6].eq}
            enHint={rules[6].enHint}
            khHint={rules[6].khHint}
            k={kh}
            featured
          />
        </div>

        {/* Colour legend */}
        <div
          className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-600 ${kh ? "font-khmer leading-loose" : "font-mono"}`}
          data-testid="rules-legend"
        >
          <span>{t("Colour key: ", "កូដពណ៌ ៖ ")}</span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: RULE_M_COLOR }}
              aria-hidden="true"
            />
            <InlineMath math="M" />
            <span>= {t("first number", "លេខទីមួយ")}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: RULE_N_COLOR }}
              aria-hidden="true"
            />
            <InlineMath math="N" />
            <span>= {t("second number", "លេខទីពីរ")}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: RULE_K_COLOR }}
              aria-hidden="true"
            />
            <InlineMath math="k" />
            <span>= {t("exponent", "ស្វ័យគុណ")}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: RULE_RES_COLOR }}
              aria-hidden="true"
            />
            <span>{t("special result", "លទ្ធផលពិសេស")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — Measuring the Invisible: Logs in the Real World
//                ការវាស់វែងអ្វីដែលមើលមិនឃើញ៖ លោការីតក្នុងពិភពពិត
//
//  Three application cards (pH, Decibel, Richter) showing how base-10
//  logarithms compress nature's enormous numbers into human-friendly scales.
// ════════════════════════════════════════════════════════════════════════════

type AppAccent = "cyan" | "sky" | "amber";

const ACCENT_STYLES: Record<
  AppAccent,
  {
    border: string;
    iconBg: string;
    iconText: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
  }
> = {
  cyan: {
    border: "border-cyan-500/40",
    iconBg: "bg-cyan-500/15 border-cyan-400/50",
    iconText: "text-cyan-200",
    badgeBg: "bg-cyan-500/15 border-cyan-400/50",
    badgeText: "text-cyan-200",
    glow: "shadow-cyan-900/30",
  },
  sky: {
    border: "border-sky-500/40",
    iconBg: "bg-sky-500/15 border-sky-400/50",
    iconText: "text-sky-200",
    badgeBg: "bg-sky-500/15 border-sky-400/50",
    badgeText: "text-sky-200",
    glow: "shadow-sky-900/30",
  },
  amber: {
    border: "border-amber-500/40",
    iconBg: "bg-amber-500/15 border-amber-400/50",
    iconText: "text-amber-200",
    badgeBg: "bg-amber-500/15 border-amber-400/50",
    badgeText: "text-amber-200",
    glow: "shadow-amber-900/30",
  },
};

function AppCard({
  n,
  enTitle,
  khTitle,
  enTag,
  khTag,
  enText,
  khText,
  formula,
  Icon,
  accent,
  k,
}: {
  n: number;
  enTitle: string;
  khTitle: string;
  enTag: string;
  khTag: string;
  enText: string;
  khText: string;
  formula: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: AppAccent;
  k: boolean;
}) {
  const a = ACCENT_STYLES[accent];
  return (
    <div
      className={`relative rounded-xl border ${a.border} bg-indigo-950 p-4 sm:p-5 shadow-lg ${a.glow} flex flex-col`}
      data-testid={`app-card-${n}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg border ${a.iconBg} ${a.iconText} flex items-center justify-center flex-shrink-0`}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-[15px] font-bold text-indigo-50 leading-tight ${k ? "font-khmer" : ""}`}
          >
            {k ? khTitle : enTitle}
          </h3>
          <span
            className={`inline-block mt-1 text-[10.5px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${a.badgeBg} ${a.badgeText} ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
          >
            {k ? khTag : enTag}
          </span>
        </div>
      </div>

      <div
        className="text-center bg-black/30 rounded-md border border-indigo-900/60 my-2 py-3 px-2 overflow-x-auto"
        data-testid={`app-card-${n}-formula`}
      >
        <BlockMath math={formula} />
      </div>

      <p
        className={`text-[12.5px] text-indigo-200/85 mt-2 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {k ? khText : enText}
      </p>
    </div>
  );
}

function SectionRealWorld({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const apps = [
    {
      n: 1,
      enTitle: "The pH Scale",
      khTitle: "កម្រិត pH",
      enTag: "Chemistry",
      khTag: "គីមីសាស្ត្រ",
      enText:
        "Used in chemistry and agriculture to test if soil or water is acidic. A pH of 5 is 10 times more acidic than a pH of 6.",
      khText:
        "ប្រើក្នុងគីមីសាស្ត្រ និងកសិកម្ម ដើម្បីសាកល្បងថាតើដី ឬទឹកមានអាស៊ីតឬអត់។ pH ស្មើ 5 មានអាស៊ីតច្រើនជាង pH ស្មើ 6 ដប់ដង។",
      formula: "pH = -\\log_{10}[H^{+}]",
      Icon: Droplet,
      accent: "cyan" as const,
    },
    {
      n: 2,
      enTitle: "The Decibel Scale",
      khTitle: "រង្វាស់ដេស៊ីបែល",
      enTag: "Sound",
      khTag: "សំឡេង",
      enText:
        "Measures the intensity of sound. A 70 dB sound (a vacuum cleaner) is actually 10 times more powerful than a 60 dB sound (normal conversation).",
      khText:
        "វាស់អាំងតង់ស៊ីតេនៃសំឡេង។ សំឡេង 70 dB (ម៉ាស៊ីនបឺតធូលី) គឺមានកម្លាំងខ្លាំងជាងសំឡេង 60 dB (ការសន្ទនាធម្មតា) ដប់ដង។",
      formula: "L = 10 \\cdot \\log_{10}\\!\\left(\\dfrac{I}{I_0}\\right)",
      Icon: Volume2,
      accent: "sky" as const,
    },
    {
      n: 3,
      enTitle: "The Richter Scale",
      khTitle: "រង្វាស់រិចទ័រ",
      enTag: "Earthquakes",
      khTag: "រញ្ជួយដី",
      enText:
        "Measures the energy of an earthquake. A magnitude 7.0 earthquake is not slightly bigger than a 6.0 — it is 10 times more powerful and releases 31 times more energy.",
      khText:
        "វាស់ថាមពលនៃរញ្ជួយដី។ រញ្ជួយដីខ្នាត 7.0 មិនមែនធំជាងខ្នាត 6.0 បន្តិចបន្តួចទេ — វាមានកម្លាំងខ្លាំងជាង ដប់ដង ហើយបញ្ចេញថាមពលច្រើនជាង ៣១ ដង។",
      formula: "M = \\log_{10}\\!\\left(\\dfrac{A}{A_0}\\right)",
      Icon: Mountain,
      accent: "amber" as const,
    },
  ];

  return (
    <section className="mb-10" data-testid="section-real-world">
      <SectionHeader
        spec="04"
        en="Measuring the Invisible: Logs in the Real World"
        kh="ការវាស់វែងអ្វីដែលមើលមិនឃើញ៖ លោការីតក្នុងពិភពពិត"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-indigo-200 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />

        {/* Introduction */}
        <p
          className={`text-[14px] sm:text-[15px] text-slate-800 mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          data-testid="real-world-intro"
        >
          {t(
            "Nature loves to multiply, which creates numbers that are too massive for the human brain to easily read. We use base-10 logarithms to compress these giant numbers into simple scales from 1 to 14.",
            "ធម្មជាតិចូលចិត្តគុណ ដែលបង្កើតលេខធំធេងពេកសម្រាប់ខួរក្បាលមនុស្សអានបានយ៉ាងងាយ។ យើងប្រើលោការីតគោល 10 ដើម្បីបង្រួមលេខយក្សទាំងនេះ ទៅជារង្វាស់សាមញ្ញពី 1 ដល់ 14។"
          )}
        </p>

        {/* Application cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          data-testid="real-world-grid"
        >
          {apps.map((app) => (
            <AppCard
              key={app.n}
              n={app.n}
              enTitle={app.enTitle}
              khTitle={app.khTitle}
              enTag={app.enTag}
              khTag={app.khTag}
              enText={app.enText}
              khText={app.khText}
              formula={app.formula}
              Icon={app.Icon}
              accent={app.accent}
              k={kh}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
