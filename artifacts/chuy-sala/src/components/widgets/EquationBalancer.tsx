import { Fragment, useMemo, useState } from "react";
import { Scale, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import {
  balanceEquation,
  type BalanceErr,
  type AtomCounts,
} from "@/lib/balance-equation";

/* ── Render a chemical formula with proper subscripts ─────────────── */
function Formula({ text }: { text: string }) {
  // Tokenize: digits → subscript; everything else (letters, parens, +, =, →, spaces) → kept as-is.
  const parts = text.match(/\d+|[^\d]+/g) ?? [];
  return (
    <span className="font-mono whitespace-pre">
      {parts.map((p, i) =>
        /^\d+$/.test(p) ? (
          <sub key={i} className="text-[0.7em]">{p}</sub>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </span>
  );
}

const EXAMPLES = [
  "H2 + O2 = H2O",
  "Fe + O2 = Fe2O3",
  "C3H8 + O2 = CO2 + H2O",
  "Al + HCl = AlCl3 + H2",
  "Ca(OH)2 + HCl = CaCl2 + H2O",
];

/* ── Bilingual error message helper ───────────────────────────────── */
function errorMessage(
  err: BalanceErr,
  t: (en: string, kh: string) => string,
): { title: string; hint: string } {
  switch (err.code) {
    case "EMPTY":
      return {
        title: t("Please enter an equation", "សូមបញ្ចូលសមីការ"),
        hint:  t("Example: H2 + O2 = H2O", "ឧ. H2 + O2 = H2O"),
      };
    case "MISSING_EQUALS":
      return {
        title: t("Missing the equals sign", "បាត់សញ្ញាស្មើ"),
        hint:  t(
          "Use = or → to separate reactants and products.",
          "ប្រើ = ឬ → ដើម្បីបំបែកអង្គប្រតិករនិងផលិតផល។",
        ),
      };
    case "EMPTY_SIDE":
      return {
        title: t("One side is empty", "ជ្រុងមួយទទេ"),
        hint:  t(
          "You need at least one substance on each side.",
          "ត្រូវមានសារធាតុយ៉ាងហោចណាស់មួយនៅសងខាង។",
        ),
      };
    case "PARSE":
      return {
        title: t("Could not read the equation", "សមីការមិនត្រឹមត្រូវ"),
        hint:  t(
          "Use proper symbols like H, O, Na with the count after the element, e.g. H2O.",
          "ប្រើនិមិត្តសញ្ញាត្រឹមត្រូវ ដូចជា H, O, Na ហើយលេខបន្ទាប់ពីធាតុ ឧ. H2O។",
        ),
      };
    case "ELEMENT_MISMATCH":
      return {
        title: t(
          `Element ${err.detail} appears on only one side`,
          `ធាតុ ${err.detail} លេចឡើងតែម្ខាង`,
        ),
        hint:  t(
          "Conservation of mass — every element must appear on both sides.",
          "ច្បាប់នៃការអភិរក្សមាស — រាល់ធាតុដែលចូលរួមត្រូវលេចឡើងនៅទាំងសងខាង។",
        ),
      };
    case "AMBIGUOUS":
      return {
        title: t("Equation is ambiguous", "មានដំណោះស្រាយច្រើនពេក"),
        hint:  t(
          "More than one independent solution exists. Try fewer or more specific species.",
          "សមីការនេះអាចមានមេគុណផ្សេងៗគ្នា។ សាកល្បងបញ្ចូលសារធាតុដែលច្បាស់ជាងនេះ។",
        ),
      };
    case "NO_SOLUTION":
      return {
        title: t("Cannot be balanced", "មិនអាចរក្សាតុល្យភាពបានទេ"),
        hint:  t(
          "Double-check the formulas — usually one is wrong, or a substance is missing.",
          "ពិនិត្យឡើងវិញ — ជារឿយៗមួយក្នុងនោះជារូបមន្តខុស ឬបាត់សារធាតុមួយ។",
        ),
      };
    case "TOO_LARGE":
      return {
        title: t("Coefficients too large", "មេគុណធំពេក"),
        hint:  t(
          "This equation needs unusually large coefficients — please re-check the formulas.",
          "សមីការនេះតម្រូវឱ្យមានមេគុណធំខ្លាំង — សូមពិនិត្យរូបមន្តម្តងទៀត។",
        ),
      };
  }
}

/* ── Atom-count comparison table ──────────────────────────────────── */
function AtomTable({
  reactants,
  products,
  kh,
  t,
}: {
  reactants: AtomCounts;
  products: AtomCounts;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const elements = Array.from(
    new Set([...Object.keys(reactants), ...Object.keys(products)]),
  ).sort();

  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="px-3 sm:px-4 py-2 bg-emerald-50 border-b border-emerald-200">
        <p
          className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-emerald-800 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("Atom Count Check", "ការត្រួតពិនិត្យចំនួនអាតូម")}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            <tr>
              <th className={`px-3 py-2 text-left font-semibold text-slate-700 text-xs uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Element", "ធាតុ")}
              </th>
              <th className={`px-3 py-2 text-right font-semibold text-slate-700 text-xs uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Reactants", "អង្គធាតុប្រតិករ")}
              </th>
              <th className={`px-3 py-2 text-right font-semibold text-slate-700 text-xs uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Products", "អង្គធាតុផលិតផល")}
              </th>
              <th className={`px-3 py-2 text-center font-semibold text-slate-700 text-xs uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Match", "ត្រូវគ្នា")}
              </th>
            </tr>
          </thead>
          <tbody>
            {elements.map((el) => {
              const r = reactants[el] ?? 0;
              const p = products[el] ?? 0;
              const ok = r === p;
              return (
                <tr key={el} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-2 font-mono font-bold text-slate-900">{el}</td>
                  <td className="px-3 py-2 text-right font-mono text-slate-900">{r}</td>
                  <td className="px-3 py-2 text-right font-mono text-slate-900">{p}</td>
                  <td className="px-3 py-2 text-center">
                    {ok ? (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 inline-block"
                        aria-label={t("match", "ត្រូវគ្នា")}
                      />
                    ) : (
                      <AlertCircle
                        className="w-4 h-4 text-rose-600 inline-block"
                        aria-label={t("mismatch", "មិនត្រូវគ្នា")}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-2 bg-emerald-50/60 border-t border-emerald-200">
        <p className={`text-[11px] text-emerald-900 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
          <Sparkles className="inline-block w-3 h-3 mr-1 -mt-0.5" aria-hidden="true" />
          {t(
            "Both sides match — the Law of Conservation of Mass is satisfied.",
            "ទាំងសងខាងស្មើគ្នា — ច្បាប់នៃការអភិរក្សមាសត្រូវបានបំពេញ។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Main widget ──────────────────────────────────────────────────── */
export function EquationBalancer() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";
  const [input, setInput] = useState("H2 + O2 = H2O");
  const [submitted, setSubmitted] = useState("H2 + O2 = H2O");

  const result = useMemo(() => balanceEquation(submitted), [submitted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(input);
  };

  // Build the balanced equation tokens for rendering.
  const balanced = useMemo(() => {
    if (!result.ok) return null;
    const parsed = (() => {
      try {
        // Split using the original equation parser — but we just need formulas.
        const sides = submitted.split(/->|→|=/);
        const splitSide = (s: string) =>
          s
            .split("+")
            .map((x) => x.trim())
            .filter(Boolean)
            .map((tok) => tok.replace(/^\d+\s*/, ""));
        return { reactants: splitSide(sides[0] ?? ""), products: splitSide(sides[1] ?? "") };
      } catch {
        return null;
      }
    })();
    if (!parsed) return null;
    return { ...parsed, coeffs: result.coefficients };
  }, [result, submitted]);

  return (
    <section
      aria-label={t("Chemical Equation Balancer", "ឧបករណ៍រក្សាតុល្យភាពសមីការគីមី")}
      className="rounded-3xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b-2 border-slate-200 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/40 relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Scale className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-emerald-700 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Stoichiometry Tool", "ឧបករណ៍ស្តូកគីអូម៉ែត្រី")}
            </div>
            <h2
              className={`text-base sm:text-lg font-bold text-slate-900 leading-tight ${
                kh ? "font-khmer leading-relaxed" : "font-display"
              }`}
            >
              {t("Chemical Equation Balancer", "ឧបករណ៍រក្សាតុល្យភាពសមីការគីមី")}
            </h2>
            <p
              className={`text-xs sm:text-sm text-slate-600 leading-snug mt-0.5 ${
                kh ? "font-khmer leading-relaxed" : ""
              }`}
            >
              {t(
                "Type a reaction with = or → between sides — we'll find the smallest whole-number coefficients.",
                "វាយប្រតិកម្មដោយប្រើ = ឬ → រវាងសងខាង — យើងនឹងរកមេគុណចំនួនគត់តូចបំផុត។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={onSubmit} className="p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <label htmlFor="equation-input" className="sr-only">
          {t("Chemical equation", "សមីការគីមី")}
        </label>
        <input
          id="equation-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="H2 + O2 = H2O"
          aria-label={t("Chemical equation", "សមីការគីមី")}
          className="flex-1 bg-white rounded-xl border-2 border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-sm sm:text-base text-slate-900 outline-none transition-colors focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1"
        />
        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <Scale className="w-4 h-4" />
          {t("Balance", "រក្សាតុល្យភាព")}
        </button>
      </form>

      {/* Quick-pick examples */}
      <div className="px-4 sm:px-6 -mt-1 pb-3">
        <div
          className={`text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1.5 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("Try one", "សាកល្បងមួយ")}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setInput(ex);
                setSubmitted(ex);
              }}
              className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-mono text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Formula text={ex.replace(/=/g, "→").replace(/->/g, "→")} />
            </button>
          ))}
        </div>
      </div>

      {/* Result area */}
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-3">
        {result.ok && balanced ? (
          <>
            {/* Balanced equation display */}
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 px-4 sm:px-5 py-4 sm:py-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" aria-hidden="true" />
                <span
                  className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-emerald-800 ${
                    kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                  }`}
                >
                  {t("Balanced Equation", "សមីការដែលបានរក្សាតុល្យភាព")}
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl sm:text-2xl text-slate-900 leading-relaxed">
                {balanced.reactants.map((f, i) => {
                  const c = balanced.coeffs[i]!;
                  return (
                    <Fragment key={`r-${i}`}>
                      {i > 0 && <span className="text-slate-500 mx-1">+</span>}
                      {c > 1 && <span className="font-bold">{c}</span>}
                      <Formula text={f} />
                    </Fragment>
                  );
                })}
                <span className="mx-2 text-emerald-700 self-center">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </span>
                {balanced.products.map((f, i) => {
                  const c = balanced.coeffs[balanced.reactants.length + i]!;
                  return (
                    <Fragment key={`p-${i}`}>
                      {i > 0 && <span className="text-slate-500 mx-1">+</span>}
                      {c > 1 && <span className="font-bold">{c}</span>}
                      <Formula text={f} />
                    </Fragment>
                  );
                })}
              </div>
              <div
                className={`text-[11px] sm:text-xs text-emerald-900/80 mt-2 ${kh ? "font-khmer leading-relaxed" : ""}`}
              >
                {t(
                  "Coefficients shown are the smallest positive whole numbers that balance the equation.",
                  "មេគុណដែលបង្ហាញគឺជាចំនួនគត់វិជ្ជមានតូចបំផុតដែលរក្សាតុល្យភាពសមីការ។",
                )}
              </div>
            </div>

            {/* Atom count comparison */}
            <AtomTable
              reactants={result.reactantCounts}
              products={result.productCounts}
              kh={kh}
              t={t}
            />
          </>
        ) : !result.ok ? (
          (() => {
            const m = errorMessage(result, t);
            return (
              <div
                role="alert"
                className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <div className={`text-sm font-semibold text-rose-900 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    {m.title}
                  </div>
                  <div className={`text-xs text-rose-800/80 mt-0.5 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    {m.hint}
                  </div>
                </div>
              </div>
            );
          })()
        ) : null}
      </div>
    </section>
  );
}
