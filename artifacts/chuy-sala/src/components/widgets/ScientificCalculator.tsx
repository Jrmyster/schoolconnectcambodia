import { useEffect, useRef, useState } from "react";
import { Calculator, X, ChevronUp } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Op = "+" | "-" | "×" | "÷" | "x^y" | null;

const MAX_DISPLAY = 14;

function formatNumber(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "Error";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-6) {
    // 6 sig digits in mantissa keeps total length ≤ MAX_DISPLAY (e.g. "1.23457e+308")
    return n.toExponential(6).replace(/\.?0+e/, "e");
  }
  // Up to 10 significant digits, trim trailing zeros, hard cap to MAX_DISPLAY
  const s = n.toPrecision(10);
  return parseFloat(s).toString().slice(0, MAX_DISPLAY);
}

export function ScientificCalculator() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [accumulator, setAccumulator] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op>(null);
  const [awaitingOperand, setAwaitingOperand] = useState(true);
  const [error, setError] = useState(false);
  // Track last completed binary op so pressing `=` repeatedly replays it.
  const [lastOp, setLastOp] = useState<Exclude<Op, null> | null>(null);
  const [lastOperand, setLastOperand] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => {
    setDisplay("0");
    setAccumulator(null);
    setPendingOp(null);
    setAwaitingOperand(true);
    setError(false);
    setLastOp(null);
    setLastOperand(null);
  };

  const showError = () => {
    setDisplay("Error");
    setAccumulator(null);
    setPendingOp(null);
    setAwaitingOperand(true);
    setError(true);
    setLastOp(null);
    setLastOperand(null);
  };

  const inputDigit = (d: string) => {
    if (error) reset();
    if (awaitingOperand || display === "0") {
      setDisplay(d === "." ? "0." : d);
      setAwaitingOperand(false);
    } else {
      if (d === "." && display.includes(".")) return;
      if (display.length >= MAX_DISPLAY) return;
      setDisplay(display + d);
    }
  };

  const toggleSign = () => {
    if (error) return;
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const apply = (a: number, b: number, op: Op): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      case "x^y": return Math.pow(a, b);
      default: return b;
    }
  };

  const handleOperator = (op: Exclude<Op, null>) => {
    if (error) return;
    const value = parseFloat(display);
    if (!isFinite(value)) return showError();
    if (accumulator === null || pendingOp === null || awaitingOperand) {
      setAccumulator(awaitingOperand && accumulator !== null ? accumulator : value);
      setPendingOp(op);
      setAwaitingOperand(true);
      // New binary operation starts → clear repeat-equals memory.
      setLastOp(null);
      setLastOperand(null);
      return;
    }
    const result = apply(accumulator, value, pendingOp);
    if (!isFinite(result) || isNaN(result)) return showError();
    setAccumulator(result);
    setDisplay(formatNumber(result));
    setPendingOp(op);
    setAwaitingOperand(true);
    setLastOp(null);
    setLastOperand(null);
  };

  const handleEquals = () => {
    if (error) return;
    // Fresh equals: complete the pending binary op and remember it.
    if (pendingOp !== null && accumulator !== null) {
      const value = parseFloat(display);
      const result = apply(accumulator, value, pendingOp);
      if (!isFinite(result) || isNaN(result)) return showError();
      setDisplay(formatNumber(result));
      setAccumulator(null);
      setLastOp(pendingOp);
      setLastOperand(value);
      setPendingOp(null);
      setAwaitingOperand(true);
      return;
    }
    // Repeated equals: replay the last operator + operand against current display.
    if (lastOp !== null && lastOperand !== null) {
      const value = parseFloat(display);
      if (!isFinite(value)) return showError();
      const result = apply(value, lastOperand, lastOp);
      if (!isFinite(result) || isNaN(result)) return showError();
      setDisplay(formatNumber(result));
      setAwaitingOperand(true);
    }
  };

  // Unary functions operate on the current display value immediately.
  const unary = (fn: (x: number) => number) => {
    if (error) return;
    const value = parseFloat(display);
    if (!isFinite(value)) return showError();
    const result = fn(value);
    if (!isFinite(result) || isNaN(result)) return showError();
    setDisplay(formatNumber(result));
    setAwaitingOperand(true);
  };

  const insertConstant = (n: number) => {
    if (error) reset();
    setDisplay(formatNumber(n));
    setAwaitingOperand(true);
  };

  // Trig functions in DEGREES (more practical for students)
  const sinDeg = (x: number) => {
    const r = Math.sin((x * Math.PI) / 180);
    // Clean tiny floating-point noise (e.g., sin(180) ≈ 1.22e-16)
    return Math.abs(r) < 1e-12 ? 0 : r;
  };
  const cosDeg = (x: number) => {
    const r = Math.cos((x * Math.PI) / 180);
    return Math.abs(r) < 1e-12 ? 0 : r;
  };
  const tanDeg = (x: number) => {
    // tan(90°), tan(270°), etc. are undefined
    const mod = ((x % 180) + 180) % 180;
    if (Math.abs(mod - 90) < 1e-9) return NaN;
    const r = Math.tan((x * Math.PI) / 180);
    return Math.abs(r) < 1e-12 ? 0 : r;
  };

  // ─── Button definitions ────────────────────────────────────────────
  type Btn = {
    key: string;
    label: string;
    onClick: () => void;
    variant?: "num" | "op" | "sci" | "eq" | "danger";
    titleEn?: string;
    titleKh?: string;
    span?: number;
    aria?: string;
  };

  const SCI: Btn[] = [
    {
      key: "sin", label: "sin", variant: "sci",
      onClick: () => unary(sinDeg),
      titleEn: "Sine (degrees)", titleKh: "អនុគមន៍ស៊ីនុស (ដឺក្រេ)",
    },
    {
      key: "cos", label: "cos", variant: "sci",
      onClick: () => unary(cosDeg),
      titleEn: "Cosine (degrees)", titleKh: "អនុគមន៍កូស៊ីនុស (ដឺក្រេ)",
    },
    {
      key: "tan", label: "tan", variant: "sci",
      onClick: () => unary(tanDeg),
      titleEn: "Tangent (degrees)", titleKh: "អនុគមន៍តង់សង់ (ដឺក្រេ)",
    },
    {
      key: "sqrt", label: "√", variant: "sci",
      onClick: () => unary((x) => (x < 0 ? NaN : Math.sqrt(x))),
      titleEn: "Square Root", titleKh: "ឫសការ៉េ",
    },
    {
      key: "pow", label: "xʸ", variant: "sci",
      onClick: () => handleOperator("x^y"),
      titleEn: "Power (x to the y)", titleKh: "ស្វ័យគុណ (x ស្វ័យគុណ y)",
    },
    {
      key: "pi", label: "π", variant: "sci",
      onClick: () => insertConstant(Math.PI),
      titleEn: "Pi (≈ 3.14159)", titleKh: "ប៉ាយ (≈ 3.14159)",
    },
    {
      key: "exp", label: "EXP", variant: "sci",
      onClick: () => unary((x) => Math.pow(10, x)),
      titleEn: "10 to the power of x", titleKh: "ដប់ស្វ័យគុណ x",
    },
    {
      key: "sign", label: "±", variant: "sci",
      onClick: toggleSign,
      titleEn: "Toggle sign", titleKh: "ប្តូរសញ្ញា",
    },
  ];

  const PAD: Btn[] = [
    { key: "c",   label: "C", variant: "danger", onClick: reset, titleEn: "Clear", titleKh: "សម្អាត" },
    { key: "div", label: "÷", variant: "op",     onClick: () => handleOperator("÷"), titleEn: "Divide",  titleKh: "ចែក" },
    { key: "mul", label: "×", variant: "op",     onClick: () => handleOperator("×"), titleEn: "Multiply", titleKh: "គុណ" },
    { key: "sub", label: "−", variant: "op",     onClick: () => handleOperator("-"), titleEn: "Subtract", titleKh: "ដក" },

    { key: "7", label: "7", variant: "num", onClick: () => inputDigit("7") },
    { key: "8", label: "8", variant: "num", onClick: () => inputDigit("8") },
    { key: "9", label: "9", variant: "num", onClick: () => inputDigit("9") },
    { key: "add", label: "+", variant: "op", onClick: () => handleOperator("+"), titleEn: "Add", titleKh: "បូក" },

    { key: "4", label: "4", variant: "num", onClick: () => inputDigit("4") },
    { key: "5", label: "5", variant: "num", onClick: () => inputDigit("5") },
    { key: "6", label: "6", variant: "num", onClick: () => inputDigit("6") },
    { key: "eq", label: "=", variant: "eq", onClick: handleEquals, span: 1, titleEn: "Equals", titleKh: "ស្មើ" },

    { key: "1", label: "1", variant: "num", onClick: () => inputDigit("1") },
    { key: "2", label: "2", variant: "num", onClick: () => inputDigit("2") },
    { key: "3", label: "3", variant: "num", onClick: () => inputDigit("3") },
    { key: "spacer", label: "", variant: "num", onClick: () => {}, span: 1 },

    { key: "0",   label: "0", variant: "num", onClick: () => inputDigit("0"), span: 2 },
    { key: "dot", label: ".", variant: "num", onClick: () => inputDigit(".") },
    { key: "spacer2", label: "", variant: "num", onClick: () => {}, span: 1 },
  ];

  const variantClass = (v: Btn["variant"]) => {
    switch (v) {
      case "op":
        return "bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white shadow-sm";
      case "eq":
        return "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-sm";
      case "danger":
        return "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-sm";
      case "sci":
        return "bg-slate-800 hover:bg-slate-900 active:bg-black text-white shadow-sm";
      case "num":
      default:
        return "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 border-2 border-slate-200";
    }
  };

  const renderButton = (b: Btn) => {
    if (b.key.startsWith("spacer")) {
      return <div key={b.key} aria-hidden="true" />;
    }
    const tip = b.titleEn
      ? kh && b.titleKh
        ? `${b.titleKh} (${b.titleEn})`
        : b.titleEn && b.titleKh
        ? `${b.titleEn} — ${b.titleKh}`
        : b.titleEn
      : undefined;
    return (
      <button
        key={b.key}
        type="button"
        onClick={b.onClick}
        title={tip}
        aria-label={b.aria ?? tip ?? b.label}
        className={`h-12 sm:h-13 rounded-2xl font-semibold text-base sm:text-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 ${variantClass(
          b.variant,
        )} ${b.span === 2 ? "col-span-2" : ""}`}
      >
        {b.label}
      </button>
    );
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("Open scientific calculator", "បើកម៉ាស៊ីនគិតលេខវិទ្យាសាស្ត្រ")}
        aria-expanded={open}
        className={`fixed z-40 bottom-6 right-6 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/30 transition-all ${
          open ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100"
        } ${kh ? "font-khmer" : ""}`}
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">
          {t("Calculator", "ម៉ាស៊ីនគិតលេខ")}
        </span>
      </button>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 sm:bg-transparent sm:pointer-events-none"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Calculator panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label={t("Scientific Calculator", "ម៉ាស៊ីនគិតលេខវិទ្យាសាស្ត្រ")}
        className={`fixed z-50 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-0 right-0 left-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[22rem]`}
      >
        <div className="mx-auto w-full max-w-md sm:max-w-none rounded-t-3xl sm:rounded-3xl border-2 border-slate-200 bg-slate-50 shadow-2xl shadow-slate-900/30 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white">
            <Calculator className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-bold leading-tight ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Scientific Calculator", "ម៉ាស៊ីនគិតលេខវិទ្យាសាស្ត្រ")}
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider opacity-70 ${
                  kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                }`}
              >
                {t("Trig in degrees · hover for help", "ត្រីកោណមាត្រជាដឺក្រេ · ផ្លាស់ទីលើដើម្បីជំនួយ")}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("Close calculator", "បិទម៉ាស៊ីនគិតលេខ")}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <span className="sm:hidden">
                <ChevronUp className="w-4 h-4 rotate-180" />
              </span>
              <span className="hidden sm:inline">
                <X className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Display */}
          <div className="px-4 pt-4 pb-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div
              className="text-right font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums leading-none truncate"
              aria-live="polite"
              aria-atomic="true"
            >
              {error ? (
                <span className="text-rose-400">Error</span>
              ) : (
                display
              )}
            </div>
            <div className="mt-1 flex items-center justify-end gap-2 min-h-[1rem]">
              {accumulator !== null && pendingOp && (
                <span className="text-xs font-mono text-cyan-300/80">
                  {formatNumber(accumulator)} {pendingOp}
                </span>
              )}
            </div>
          </div>

          {/* Scientific row (2 rows × 4 cols) */}
          <div className="px-3 pt-3 grid grid-cols-4 gap-2">
            {SCI.map(renderButton)}
          </div>

          {/* Standard pad (4 cols) */}
          <div className="px-3 pt-2 pb-3 grid grid-cols-4 gap-2">
            {PAD.map(renderButton)}
          </div>

          {/* Footer hint */}
          <div className="px-4 pb-3 -mt-1">
            <p
              className={`text-[10px] sm:text-[11px] text-slate-500 leading-snug text-center ${
                kh ? "font-khmer leading-relaxed text-[11px] sm:text-xs" : ""
              }`}
            >
              {t(
                "Press Esc to close. Errors (e.g., ÷ by 0) show 'Error' — press C to reset.",
                "ចុច Esc ដើម្បីបិទ។ កំហុស (ឧ. ÷ ដោយ 0) បង្ហាញ 'Error' — ចុច C ដើម្បីកំណត់ឡើងវិញ។",
              )}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
