import { useId, useMemo, useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  AlertTriangle, Package, Sigma, Telescope, Sparkles, ArrowRight, Hash,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
 * Scientific Notation: Mapping the Massive
 *   ទម្រង់វិទ្យាសាស្ត្រ៖ ការគូសផែនទីចំនួនដ៏ធំសម្បើម
 *
 * Strict bilingual self-contained widget.
 *  1. The Problem with Zeros
 *  2. The Compression Algorithm  (a × 10ⁿ)
 *  3. The Scale of Big Numbers   (table from 10⁶ → 10¹²)
 *
 * Aesthetic: "Cosmic Math" — deep grid-paper blues, stark whites,
 *  glowing highlight on the exponent numbers.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Bilingual helpers ────────────────────────────────────────────────── */
function BiliInline({
  en, kh, className = "",
}: { en: React.ReactNode; kh: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0 ${className}`}>
      <span>{en}</span>
      <span aria-hidden className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}
function BiliPara({
  en, kh, className = "", khmerClass = "",
}: { en: React.ReactNode; kh: React.ReactNode; className?: string; khmerClass?: string }) {
  return (
    <>
      <p className={className}>{en}</p>
      <p className={`font-khmer leading-loose mt-1 ${khmerClass}`}>{kh}</p>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export function ScientificNotationModule() {
  return (
    <section
      data-testid="scientific-notation-module"
      aria-label="Scientific Notation: Mapping the Massive / ទម្រង់វិទ្យាសាស្ត្រ៖ ការគូសផែនទីចំនួនដ៏ធំសម្បើម"
      className="relative mt-2 rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-300/40"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #0c4a6e 0%, #0b1e3f 35%, #050b1f 75%, #02040d 100%)",
      }}
    >
      <CosmicGrid />
      <Starfield />

      <div className="relative px-5 sm:px-8 py-8 sm:py-10">
        <ModuleHeader />
        <ProblemWithZeros />
        <CompressionAlgorithm />
        <ScaleOfBigNumbers />

        {/* Closing card */}
        <div className="mt-8 rounded-2xl border border-cyan-400/40 bg-slate-950/60 backdrop-blur p-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-300" aria-hidden />
          <BiliPara
            en={
              <>
                Scientific notation isn't a trick — it's how astronomers,
                physicists, and engineers <strong>think</strong>. Once the
                zeros are packed away, the only thing that matters is the{" "}
                <strong className="text-cyan-300">exponent</strong>.
              </>
            }
            kh={
              <>
                ទម្រង់វិទ្យាសាស្ត្រមិនមែនជាល្បិចទេ — វាជារបៀបដែលអ្នកតារាសាស្ត្រ
                អ្នករូបវិទ្យា និងវិស្វករ<strong>គិត</strong> ។
                ពេលដែលលេខសូន្យត្រូវបានបង្ហាប់ ការតែមួយដែលសំខាន់គឺ
                <strong className="text-cyan-300">និទស្សន្ត</strong> ។
              </>
            }
            className="text-sm sm:text-base text-slate-100 leading-relaxed"
            khmerClass="text-base text-slate-200"
          />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Header                                                                   */
/* ──────────────────────────────────────────────────────────────────────── */
function ModuleHeader() {
  return (
    <header className="mb-8">
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-300/85 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <Sigma className="w-3.5 h-3.5" aria-hidden />
        <span>Mathematics · Scientific Notation</span>
        <span aria-hidden className="opacity-50">·</span>
        <span className="font-khmer normal-case tracking-normal">
          គណិតវិទ្យា · ទម្រង់វិទ្យាសាស្ត្រ
        </span>
      </div>

      <h2
        className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-2 text-transparent bg-clip-text"
        style={{ backgroundImage: "linear-gradient(90deg, #67e8f9 0%, #ffffff 50%, #a5b4fc 100%)" }}
      >
        Scientific Notation: Mapping the Massive
      </h2>
      <p className="font-khmer text-lg sm:text-xl text-cyan-100 leading-loose mt-1">
        ទម្រង់វិទ្យាសាស្ត្រ៖ ការគូសផែនទីចំនួនដ៏ធំសម្បើម
      </p>

      <div className="mt-3 max-w-3xl text-sm sm:text-base text-slate-200/95">
        <p>
          The universe deals in numbers far too big to write out by hand. This
          is the elegant compression trick scientists use to tame them.
        </p>
        <p className="font-khmer text-base text-slate-200/85 leading-loose mt-1">
          សកលលោកដោះស្រាយជាមួយចំនួនដែលធំពេកមិនអាចសរសេរដោយដៃបានឡើយ ។
          នេះជាល្បិចបង្ហាប់ដ៏ប្រណិតដែលអ្នកវិទ្យាសាស្ត្រប្រើដើម្បីគ្រប់គ្រងពួកវា ។
        </p>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 1 — The Problem with Zeros
 * ══════════════════════════════════════════════════════════════════════════ */
function ProblemWithZeros() {
  // 4 × 10^16 m — distance to Proxima Centauri ≈ 4.2 × 10^16 m
  const fullNumber = "40,000,000,000,000,000";

  return (
    <article
      data-testid="section-problem-with-zeros"
      className="rounded-2xl border border-cyan-400/40 bg-slate-950/55 backdrop-blur p-5 sm:p-6 shadow-lg"
    >
      <SectionHeader
        n={1}
        en="The Problem with Zeros"
        kh="បញ្ហានៃលេខសូន្យ"
        Icon={Telescope}
        accent="cyan"
      />

      <BiliPara
        en={
          <>
            How far away is the nearest star to our Sun? About{" "}
            <strong>forty quadrillion metres</strong>. Written out in full,
            that number looks like this:
          </>
        }
        kh={
          <>
            តើផ្កាយដែលនៅជិតព្រះអាទិត្យបំផុតស្ថិតនៅឆ្ងាយប៉ុណ្ណា ?
            ប្រហែល <strong>សែសិបពាន់លានពាន់លានម៉ែត្រ</strong> ។
            ពេលសរសេរពេញ លេខនេះមើលទៅដូចនេះៈ
          </>
        }
        className="text-sm sm:text-base text-slate-200 leading-relaxed"
        khmerClass="text-base text-slate-200/95"
      />

      {/* The huge number display */}
      <div
        data-testid="huge-number-display"
        className="mt-4 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80 p-4 sm:p-5 overflow-x-auto"
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-1">
          <BiliInline
            en="Distance to nearest star · in metres"
            kh="ចម្ងាយទៅផ្កាយជិតបំផុត · ជាម៉ែត្រ"
          />
        </div>
        <ZeroCounter value={fullNumber} />
        <div className="mt-2 text-xs text-slate-400 font-mono">
          <BiliInline
            en={<>16 zeros · count them</>}
            kh={<>១៦ លេខសូន្យ · សូមរាប់</>}
          />
        </div>
      </div>

      {/* Danger callout */}
      <div
        className="mt-5 rounded-xl border-l-[6px] border-rose-500 bg-rose-950/40 px-4 py-4"
        data-testid="zero-danger-callout"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" aria-hidden />
          <div>
            <div className="font-bold text-rose-100 mb-1">
              <BiliInline
                en="Drop one zero, change the universe"
                kh="ភ្លេចលេខសូន្យមួយ ផ្លាស់ប្ដូរសកលលោកទាំងមូល"
                className="text-sm sm:text-base"
              />
            </div>
            <BiliPara
              en={
                <>
                  Writing and reading this many zeros is{" "}
                  <strong>dangerous</strong>. Miss one zero and the answer
                  shrinks <strong>tenfold</strong> — the calculation no longer
                  describes reality at all.
                </>
              }
              kh={
                <>
                  ការសរសេរ និងការអានលេខសូន្យច្រើនបែបនេះគឺ<strong>គ្រោះថ្នាក់</strong> ។
                  ភ្លេចលេខសូន្យមួយ ចម្លើយតូចទៅ<strong>ដប់ដង</strong> —
                  ការគណនានោះលែងពិពណ៌នាអំពីការពិតទៀតហើយ ។
                </>
              }
              className="text-sm text-rose-50/95 leading-relaxed"
              khmerClass="text-sm text-rose-100/90"
            />

            {/* Mini visual: ×10 vs missing zero */}
            <div className="mt-3 grid sm:grid-cols-2 gap-2 text-center" data-testid="zero-mistake-demo">
              <div className="rounded-lg border border-emerald-400/40 bg-emerald-900/30 px-3 py-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  <BiliInline en="Correct" kh={<span className="font-khmer">ត្រឹមត្រូវ</span>} />
                </div>
                <div className="font-mono text-cyan-100 text-sm sm:text-base">40,000,000,000,000,000 m</div>
              </div>
              <div className="rounded-lg border border-rose-400/50 bg-rose-900/30 px-3 py-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-300">
                  <BiliInline en="One zero missing" kh={<span className="font-khmer">ភ្លេចសូន្យមួយ</span>} />
                </div>
                <div className="font-mono text-rose-100 text-sm sm:text-base line-through decoration-rose-400/70">
                  4,000,000,000,000,000 m
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Renders a long number with each digit slightly spaced; subtly highlights every '0'. */
function ZeroCounter({ value }: { value: string }) {
  const chars = useMemo(() => value.split(""), [value]);
  return (
    <div className="font-mono text-2xl sm:text-3xl md:text-4xl tracking-wider whitespace-nowrap text-white">
      {chars.map((c, i) => {
        if (c === ",") return <span key={i} className="text-slate-500 mx-0.5">,</span>;
        if (c === "0") {
          return (
            <span
              key={i}
              className="text-cyan-200"
              style={{ textShadow: "0 0 8px rgba(103,232,249,0.55)" }}
            >
              0
            </span>
          );
        }
        return <span key={i} className="text-white">{c}</span>;
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 2 — The Compression Algorithm
 * ══════════════════════════════════════════════════════════════════════════ */
function CompressionAlgorithm() {
  return (
    <article
      data-testid="section-compression-algorithm"
      className="mt-8 rounded-2xl border border-indigo-400/40 bg-slate-950/55 backdrop-blur p-5 sm:p-6 shadow-lg"
    >
      <SectionHeader
        n={2}
        en="The Compression Algorithm"
        kh="ក្បួនបង្ហាប់ទិន្នន័យ"
        Icon={Package}
        accent="indigo"
      />

      <BiliPara
        en={
          <>
            Scientific Notation is a way of <strong>packing the zeros into a
            box</strong>. Every massive number can be rewritten in the same
            simple shape:
          </>
        }
        kh={
          <>
            ទម្រង់វិទ្យាសាស្ត្រគឺជារបៀប<strong>បង្ហាប់លេខសូន្យដាក់ចូលក្នុងប្រអប់</strong> ។
            ចំនួនធំសម្បើមនីមួយៗអាចសរសេរឡើងវិញក្នុងទម្រង់សាមញ្ញដូចគ្នាៈ
          </>
        }
        className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4"
        khmerClass="text-base text-slate-200/95"
      />

      {/* Standard format card */}
      <div
        data-testid="standard-format"
        className="rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 px-5 py-6 text-center shadow-inner"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300 mb-3">
          <BiliInline en="Standard format" kh="ទម្រង់ស្តង់ដារ" />
        </div>
        <div className="cosmic-math text-white text-3xl sm:text-4xl md:text-5xl">
          <BlockMath math={String.raw`a \times 10^{n}`} />
        </div>
        <div className="mt-3 grid sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
          <div className="rounded-lg border border-cyan-400/30 bg-slate-900/60 px-3 py-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
              <BiliInline en="The coefficient" kh="មេគុណ" />
            </div>
            <div className="text-sm text-slate-100 mt-0.5">
              <InlineMath math="a" />{" "}
              <span className="text-slate-300">— a number from 1 up to (but not including) 10.</span>
            </div>
            <div className="font-khmer text-sm text-slate-200/90 leading-loose">
              <InlineMath math="a" /> — ចំនួនពី ១ ដល់ (មិនរាប់) ១០ ។
            </div>
          </div>
          <div className="rounded-lg border border-amber-400/40 bg-slate-900/60 px-3 py-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
              <BiliInline en="The tiny exponent" kh="និទស្សន្តតូច" />
            </div>
            <div className="text-sm text-slate-100 mt-0.5">
              <InlineMath math="n" />{" "}
              <span className="text-slate-300">— how many places the decimal moved.</span>
            </div>
            <div className="font-khmer text-sm text-slate-200/90 leading-loose">
              <InlineMath math="n" /> — ចំនួនកន្លែងដែលក្បៀសផ្លាស់ទី ។
            </div>
          </div>
        </div>
      </div>

      {/* The simple rule */}
      <div className="mt-5 rounded-xl border border-amber-300/40 bg-amber-950/25 px-4 py-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" aria-hidden />
          <BiliPara
            en={
              <>
                <strong className="text-amber-200">The simple rule:</strong>{" "}
                count how many times you move the decimal point — that count
                becomes your tiny exponent <InlineMath math="n" />.
              </>
            }
            kh={
              <>
                <strong className="text-amber-200">ច្បាប់សាមញ្ញ ៖</strong>{" "}
                រាប់ចំនួនដងដែលអ្នកផ្លាស់ទីក្បៀស — ចំនួននោះក្លាយជា
                និទស្សន្តតូចរបស់អ្នក <InlineMath math="n" /> ។
              </>
            }
            className="text-sm sm:text-base text-amber-50 leading-relaxed"
            khmerClass="text-base text-amber-100/95"
          />
        </div>
      </div>

      {/* Decimal-walker demo */}
      <DecimalWalker />
    </article>
  );
}

/** Interactive demo: shows the decimal point hopping left across the zeros of a big number. */
function DecimalWalker() {
  // 40,000,000,000,000,000  (16 zeros)
  const digits = "40000000000000000".split("");
  const total = digits.length - 1; // 16 hops to land between the 4 and the first 0
  const [hop, setHop] = useState(0);
  const exponent = hop;

  // Build the current coefficient string that mathematically matches the displayed
  // decimal position: at hop=h, integer part has (digits.length - h) digits and
  // decimal part has h digits — so coefficient × 10^h always equals the original.
  const coefficientText = useMemo(() => {
    const cut = digits.length - hop;
    const intPart = digits.slice(0, cut).join("");
    const decPart = digits.slice(cut).join("");
    return decPart.length ? `${intPart}.${decPart}` : intPart;
  }, [digits, hop]);

  // Build the visual: a digit row with the decimal point inserted before index (digits.length - hop)
  const insertAt = digits.length - hop; // 17 - hop
  const rendered = useMemo(() => {
    const arr: React.ReactNode[] = [];
    digits.forEach((d, i) => {
      if (i === insertAt) {
        arr.push(
          <span
            key={`dot-${i}`}
            className="inline-block text-3xl sm:text-4xl text-amber-300 align-middle px-0.5"
            style={{ textShadow: "0 0 10px rgba(252,211,77,0.85)" }}
          >
            .
          </span>
        );
      }
      const isZero = d === "0";
      arr.push(
        <span
          key={`d-${i}`}
          className={`inline-block ${isZero ? "text-cyan-200" : "text-white"} px-px`}
          style={isZero ? { textShadow: "0 0 6px rgba(103,232,249,0.5)" } : undefined}
        >
          {d}
        </span>
      );
    });
    if (insertAt >= digits.length) {
      arr.push(
        <span
          key="dot-end"
          className="inline-block text-3xl sm:text-4xl text-amber-300 align-middle px-0.5"
          style={{ textShadow: "0 0 10px rgba(252,211,77,0.85)" }}
        >
          .
        </span>
      );
    }
    return arr;
  }, [digits, insertAt]);

  return (
    <div
      data-testid="decimal-walker"
      className="mt-5 rounded-2xl border border-cyan-400/30 bg-slate-950/70 px-4 py-5"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2 flex items-center gap-1.5">
        <ArrowRight className="w-3 h-3" aria-hidden />
        <BiliInline en="Try it: hop the decimal" kh="សាកល្បង ៖ ផ្លាស់ទីក្បៀស" />
      </div>

      <div className="font-mono text-2xl sm:text-3xl tracking-wider whitespace-nowrap overflow-x-auto pb-2">
        {rendered}
      </div>

      {/* Result line — coefficient × 10^hop ALWAYS equals the original number */}
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-slate-300 text-sm">
          <BiliInline en="Equals" kh={<span className="font-khmer">ស្មើ</span>} />:
        </span>
        <span className="cosmic-math text-cyan-100 text-xl sm:text-2xl">
          <InlineMath math={`${coefficientText} \\times 10^{${exponent}}`} />
        </span>
        <span className="text-slate-400 text-xs font-mono">
          {hop === 0 ? (
            <BiliInline en="0 hops yet" kh={<span className="font-khmer">ផ្លាស់ទី ០ ដង</span>} />
          ) : hop < total ? (
            <BiliInline
              en={`${hop} hop${hop > 1 ? "s" : ""} → exponent = ${hop}`}
              kh={<span className="font-khmer">{`ផ្លាស់ទី ${hop} ដង → និទស្សន្ត = ${hop}`}</span>}
            />
          ) : (
            <BiliInline
              en={`Fully packed → 4 × 10^${hop}`}
              kh={<span className="font-khmer">{`បង្ហាប់ពេញលេញ → ៤ × ១០^${hop}`}</span>}
            />
          )}
        </span>
      </div>

      {/* Controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setHop((h) => Math.max(0, h - 1))}
          disabled={hop === 0}
          className="px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-slate-900 text-cyan-100 text-sm font-bold hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ◀ <BiliInline en="Back" kh="ថយ" />
        </button>
        <button
          type="button"
          onClick={() => setHop((h) => Math.min(total, h + 1))}
          disabled={hop >= total}
          className="px-3 py-1.5 rounded-lg border border-amber-300/60 bg-amber-500/20 text-amber-100 text-sm font-bold hover:bg-amber-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
          data-testid="decimal-hop-forward"
        >
          <BiliInline en="Hop ◀" kh="ផ្លាស់ទី ◀" />
        </button>
        <button
          type="button"
          onClick={() => setHop(total)}
          className="px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-slate-900 text-cyan-100 text-sm font-bold hover:bg-slate-800"
        >
          <BiliInline en="Pack all zeros" kh="បង្ហាប់សូន្យទាំងអស់" />
        </button>
        <button
          type="button"
          onClick={() => setHop(0)}
          className="px-3 py-1.5 rounded-lg border border-slate-500/50 bg-slate-900 text-slate-200 text-sm hover:bg-slate-800 ml-auto"
        >
          <BiliInline en="Reset" kh="កំណត់ឡើងវិញ" />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3 — The Scale of Big Numbers
 * ══════════════════════════════════════════════════════════════════════════ */
type ScaleRow = {
  standard: string;
  exponent: number;
  coefficient: number;
  en: string;
  kh: string;
};

const SCALE_ROWS: ScaleRow[] = [
  { standard: "1,000,000",         exponent: 6,  coefficient: 1, en: "One Million",         kh: "មួយលាន" },
  { standard: "10,000,000",        exponent: 7,  coefficient: 1, en: "Ten Million",         kh: "ដប់លាន" },
  { standard: "100,000,000",       exponent: 8,  coefficient: 1, en: "One Hundred Million", kh: "មួយរយលាន" },
  { standard: "1,000,000,000",     exponent: 9,  coefficient: 1, en: "One Billion",         kh: "មួយពាន់លាន" },
  { standard: "10,000,000,000",    exponent: 10, coefficient: 1, en: "Ten Billion",         kh: "ដប់ពាន់លាន" },
  { standard: "100,000,000,000",   exponent: 11, coefficient: 1, en: "One Hundred Billion", kh: "មួយរយពាន់លាន" },
  { standard: "1,000,000,000,000", exponent: 12, coefficient: 1, en: "One Trillion",        kh: "មួយទ្រីលាន" },
];

function ScaleOfBigNumbers() {
  return (
    <article
      data-testid="section-scale-of-big-numbers"
      className="mt-8 rounded-2xl border border-cyan-400/40 bg-slate-950/55 backdrop-blur p-5 sm:p-6 shadow-lg"
    >
      <SectionHeader
        n={3}
        en="The Scale of Big Numbers"
        kh="ទំហំនៃចំនួនធំៗ"
        Icon={Hash}
        accent="cyan"
      />

      <BiliPara
        en="The major milestones, side by side. Notice how the exponent quietly grows by one — and the standard form gains an entire zero."
        kh="ចំណុចសំខាន់ៗ សង្ហារនៅជាប់គ្នា ។ សូមកត់សម្គាល់ថា និទស្សន្តកើនឡើងម្ដងមួយ ហើយទម្រង់ស្តង់ដារទទួលបានលេខសូន្យមួយបន្ថែម ។"
        className="text-sm sm:text-base text-slate-200 leading-relaxed mb-5"
        khmerClass="text-base text-slate-200/95"
      />

      {/* ── Desktop / tablet table ────────────────────────────────────── */}
      <div className="hidden md:block rounded-2xl border border-cyan-400/30 bg-slate-950/70 overflow-x-auto shadow-inner">
        <table data-testid="scale-table" className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 border-b border-cyan-400/30">
              <th className="px-4 py-3">
                <BiliInline en="Standard Form" kh="ទម្រង់ស្តង់ដារ" />
              </th>
              <th className="px-4 py-3">
                <BiliInline en="Scientific Notation" kh="ទម្រង់វិទ្យាសាស្ត្រ" />
              </th>
              <th className="px-4 py-3">
                <BiliInline en="Name (English)" kh="ឈ្មោះ (អង់គ្លេស)" />
              </th>
              <th className="px-4 py-3">
                <BiliInline en="Name (Khmer)" kh="ឈ្មោះ (ខ្មែរ)" />
              </th>
            </tr>
          </thead>
          <tbody>
            {SCALE_ROWS.map((r) => (
              <tr
                key={r.exponent}
                data-testid={`scale-row-10e${r.exponent}`}
                className="border-b border-cyan-400/10 hover:bg-cyan-500/5 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-white whitespace-nowrap">
                  {r.standard}
                </td>
                <td className="px-4 py-3 cosmic-math whitespace-nowrap">
                  <ExponentMath coefficient={r.coefficient} exponent={r.exponent} />
                </td>
                <td className="px-4 py-3 text-slate-100">{r.en}</td>
                <td className="px-4 py-3 font-khmer text-slate-100 leading-loose">{r.kh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list ─────────────────────────────────────────── */}
      <ul data-testid="scale-list" className="md:hidden space-y-3">
        {SCALE_ROWS.map((r) => (
          <li
            key={r.exponent}
            data-testid={`scale-card-10e${r.exponent}`}
            className="rounded-xl border border-cyan-400/30 bg-slate-950/70 p-3 shadow-inner"
          >
            <div className="font-mono text-sm text-white break-all">{r.standard}</div>
            <div className="mt-1 cosmic-math text-cyan-100 text-lg">
              <ExponentMath coefficient={r.coefficient} exponent={r.exponent} />
            </div>
            <div className="mt-1 text-xs text-slate-200">
              <BiliInline
                en={<span className="font-semibold">{r.en}</span>}
                kh={<span className="font-khmer font-semibold">{r.kh}</span>}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Footnote */}
      <p className="mt-4 text-xs text-slate-400 italic">
        <BiliInline
          en={<>Each step climbs by <InlineMath math={String.raw`\times 10`} /> — one extra zero, one bigger exponent.</>}
          kh={<>ជំហាននីមួយៗកើនឡើងដោយ <InlineMath math={String.raw`\times 10`} /> — សូន្យបន្ថែមមួយ និទស្សន្តធំជាងមួយ ។</>}
        />
      </p>
    </article>
  );
}

/** Renders `coefficient × 10^exponent` with a glowing exponent. */
function ExponentMath({ coefficient, exponent }: { coefficient: number; exponent: number }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 text-white text-base sm:text-lg whitespace-nowrap">
      <InlineMath math={`${coefficient} \\times 10`} />
      <sup
        data-testid={`exponent-${exponent}`}
        className="font-mono font-extrabold text-amber-300 -ml-0.5"
        style={{ textShadow: "0 0 10px rgba(251,191,36,0.7), 0 0 18px rgba(251,191,36,0.4)" }}
      >
        {exponent}
      </sup>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Shared section header
 * ══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({
  n, en, kh, Icon, accent,
}: {
  n: number; en: string; kh: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: "cyan" | "indigo";
}) {
  const ring = accent === "cyan" ? "from-cyan-400 to-sky-600" : "from-indigo-400 to-violet-600";
  const text = accent === "cyan" ? "text-cyan-200" : "text-indigo-200";
  return (
    <header className="flex items-start gap-3 mb-4">
      <div
        className={`flex-shrink-0 w-11 h-11 rounded-xl text-white flex items-center justify-center font-display font-extrabold shadow-md bg-gradient-to-br ${ring}`}
      >
        <span className="text-base">{n}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className={`flex items-center gap-2 ${text}`}>
          <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
          <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-white">{en}</h3>
        </div>
        <p className="font-khmer text-base text-cyan-100/90 leading-loose">{kh}</p>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Decorative backdrops
 * ══════════════════════════════════════════════════════════════════════════ */
function CosmicGrid() {
  const id = useId();
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0">
        <defs>
          <pattern id={`g-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.18" />
          </pattern>
          <pattern id={`gb-${id}`} width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill={`url(#g-${id})`} />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#a5f3fc" strokeWidth="0.7" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gb-${id})`} />
      </svg>
    </div>
  );
}

function Starfield() {
  // Deterministic pseudo-random stars
  const stars = useMemo(() => {
    const out: { x: number; y: number; r: number; o: number }[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 60; i++) {
      out.push({ x: rnd() * 100, y: rnd() * 100, r: rnd() * 1.4 + 0.3, o: rnd() * 0.7 + 0.2 });
    }
    return out;
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.15} fill="#e0f2fe" opacity={s.o} />
        ))}
      </svg>
    </div>
  );
}
