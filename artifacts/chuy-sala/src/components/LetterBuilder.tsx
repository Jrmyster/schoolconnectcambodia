import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Printer, FileText, Eraser } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * University Application Letter Builder
 * កម្មវិធីបង្កើតលិខិតស្នើសុំចូលរៀនសាកលវិទ្យាល័យ
 *
 * - Modal with split layout: form inputs (left/top) + live letter preview (right/bottom).
 * - Live preview is rendered in a classic serif typeface ("Times New Roman").
 * - "Generate PDF" uses window.print() with a scoped print stylesheet that
 *   hides all UI chrome and renders only the letter on A4 with margins.
 * - Bilingual labels (EN · KH); the letter body itself stays in English because
 *   that's the language a university admissions office expects.
 * ────────────────────────────────────────────────────────────────────────────── */

interface LetterFields {
  studentName: string;
  studentAddress: string;
  studentContact: string;
  currentDate: string;
  universityName: string;
  programOfInterest: string;
  highSchoolName: string;
}

const EMPTY_FIELDS: LetterFields = {
  studentName: "",
  studentAddress: "",
  studentContact: "",
  currentDate: "",
  universityName: "",
  programOfInterest: "",
  highSchoolName: "",
};

/** Today's date formatted like "April 22, 2026" — what an admissions officer expects. */
function todayFormatted(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Show user-typed value, or a bracketed placeholder so the template stays readable. */
function placeholder(value: string, fallback: string): string {
  return value.trim() ? value : `[${fallback}]`;
}

export function LetterBuilder({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const reduceMotion = useReducedMotion();

  const [fields, setFields] = useState<LetterFields>(EMPTY_FIELDS);

  // Auto-fill today's date the first time the modal opens, but never overwrite
  // a value the student has already chosen.
  useEffect(() => {
    if (open && !fields.currentDate) {
      setFields((f) => ({ ...f, currentDate: todayFormatted() }));
    }
  }, [open, fields.currentDate]);

  const update = (key: keyof LetterFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const reset = () =>
    setFields({ ...EMPTY_FIELDS, currentDate: todayFormatted() });

  const handlePrint = () => {
    // Why an iframe instead of plain window.print() with @media print rules:
    // a print stylesheet that uses `visibility:hidden` still reserves layout
    // space, so a tall page like Launchpad ends up emitting blank trailing
    // pages. Cloning the letter into a hidden iframe gives us a fresh,
    // self-contained document whose only content is the letter — guaranteeing
    // exactly one page (or however many the letter naturally needs) with no
    // surrounding chrome.
    const letter = document.getElementById("letter-print");
    if (!letter) {
      window.print();
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText =
      "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;
    if (!doc) {
      document.body.removeChild(iframe);
      window.print();
      return;
    }

    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>University Application Letter</title>
<style>
  @page { size: A4; margin: 25mm 22mm; }
  html, body { margin: 0; padding: 0; background: #fff; color: #000; }
  body {
    font-family: "Times New Roman", Times, Garamond, "EB Garamond", Georgia, serif;
    font-size: 12pt;
    line-height: 1.55;
  }
  /* The cloned letter sheet uses Tailwind utility classes for layout. We
     re-declare just the few we depend on so the iframe doesn't need
     Tailwind itself loaded. */
  .h-1  { height: 0.25rem; }
  .h-3  { height: 0.75rem; }
  .h-6  { height: 1.5rem;  }
  .h-12 { height: 3rem;    }
  .whitespace-pre-line { white-space: pre-line; }
  .font-semibold { font-weight: 600; }
  .italic { font-style: italic; color: #555; }
  .text-stone-500 { color: #555; }
  .text-stone-900 { color: #000; }
  strong { font-weight: 700; }
  p { margin: 0; }
</style>
</head>
<body>${letter.innerHTML}</body>
</html>`);
    doc.close();

    const cleanup = () => {
      // Defer removal so the print dialog has a chance to capture the
      // document; some browsers fire load before they're ready to print.
      setTimeout(() => {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1000);
    };

    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        cleanup();
      }
    };
  };

  const preview = useMemo(() => {
    const name = placeholder(fields.studentName, "Student Name");
    const addr = placeholder(fields.studentAddress, "Student Address or High School");
    const contact = placeholder(fields.studentContact, "Student Email / Phone");
    const date = placeholder(fields.currentDate, "Current Date");
    const uni = placeholder(fields.universityName, "University Name");
    const program = placeholder(fields.programOfInterest, "Program of Interest");
    const hs = placeholder(fields.highSchoolName, "High School Name");
    return { name, addr, contact, date, uni, program, hs };
  }, [fields]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Print-only stylesheet. Mounted only while the modal is open so it
                never affects regular page printing. */}
            <style>{`
              @media print {
                /* Hide everything by default… */
                body * { visibility: hidden !important; }
                /* …then reveal only the letter and its descendants. */
                #letter-print, #letter-print * { visibility: visible !important; }
                #letter-print {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #fff !important;
                  color: #000 !important;
                  box-shadow: none !important;
                  border: none !important;
                }
                @page { size: A4; margin: 25mm 22mm; }
              }
            `}</style>

            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 print:hidden"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                data-testid="letter-builder-modal"
                className="fixed inset-0 z-50 grid place-items-center p-2 sm:p-4 pointer-events-none print:p-0"
              >
                <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden print:max-h-none print:rounded-none print:shadow-none print:max-w-none">
                  {/* ── Header (hidden on print) ── */}
                  <div className="flex items-center justify-between gap-3 px-5 py-3 bg-gradient-to-r from-amber-50 to-stone-100 border-b border-stone-200 print:hidden">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-amber-600 grid place-items-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <Dialog.Title asChild>
                          <h2 className={`text-base sm:text-lg font-bold text-stone-900 leading-tight truncate ${kh ? "font-khmer" : "font-display"}`}>
                            {t(
                              "University Application Letter Builder",
                              "កម្មវិធីបង្កើតលិខិតស្នើសុំចូលរៀនសាកលវិទ្យាល័យ",
                            )}
                          </h2>
                        </Dialog.Title>
                        <Dialog.Description asChild>
                          <p className={`text-[11px] sm:text-xs text-stone-600 truncate ${kh ? "font-khmer" : ""}`}>
                            {t(
                              "Fill in your details on the left — the letter updates instantly.",
                              "បំពេញព័ត៌មានរបស់អ្នកនៅខាងឆ្វេង — លិខិតនឹងផ្លាស់ប្តូរភ្លាមៗ។",
                            )}
                          </p>
                        </Dialog.Description>
                      </div>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={t("Close", "បិទ")}
                        data-testid="button-close-letter-builder"
                        className="p-2 rounded-md text-stone-700 hover:bg-stone-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* ── Body: form (left) + preview (right) ── */}
                  <div className="flex-1 overflow-y-auto print:overflow-visible">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                      {/* ── Form pane ── */}
                      <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-stone-200 bg-stone-50/50 p-5 sm:p-6 print:hidden">
                        <h3 className={`text-xs font-bold uppercase tracking-wider text-stone-500 mb-4 ${kh ? "font-khmer" : ""}`}>
                          {t("Your information", "ព័ត៌មានរបស់អ្នក")}
                        </h3>

                        <div className="space-y-3.5">
                          <Field
                            id="lf-name"
                            label={t("Student Name", "ឈ្មោះសិស្ស")}
                            placeholder={t("e.g. Sok Pisey", "ឧទា. សុខ ពិសី")}
                            value={fields.studentName}
                            onChange={update("studentName")}
                            kh={kh}
                          />
                          <Field
                            id="lf-address"
                            label={t("Address or High School", "អាសយដ្ឋាន ឬវិទ្យាល័យ")}
                            placeholder={t("e.g. Hun Sen High School, Phnom Penh", "ឧទា. វិទ្យាល័យហ៊ុនសែន ភ្នំពេញ")}
                            value={fields.studentAddress}
                            onChange={update("studentAddress")}
                            kh={kh}
                          />
                          <Field
                            id="lf-contact"
                            label={t("Email / Phone", "អ៊ីមែល / ទូរស័ព្ទ")}
                            placeholder={t("e.g. pisey@example.com · 012 345 678", "ឧទា. pisey@example.com · 012 345 678")}
                            value={fields.studentContact}
                            onChange={update("studentContact")}
                            kh={kh}
                          />
                          <Field
                            id="lf-date"
                            label={t("Date", "កាលបរិច្ឆេទ")}
                            placeholder={t("e.g. April 22, 2026", "ឧទា. ២២ មេសា ២០២៦")}
                            value={fields.currentDate}
                            onChange={update("currentDate")}
                            kh={kh}
                          />
                          <Field
                            id="lf-university"
                            label={t("University Name", "ឈ្មោះសាកលវិទ្យាល័យ")}
                            placeholder={t("e.g. Australian National University", "ឧទា. Australian National University")}
                            value={fields.universityName}
                            onChange={update("universityName")}
                            kh={kh}
                          />
                          <Field
                            id="lf-program"
                            label={t("Program of Interest", "កម្មវិធីសិក្សាដែលចាប់អារម្មណ៍")}
                            placeholder={t("e.g. Bachelor of Computer Science", "ឧទា. បរិញ្ញាបត្រវិទ្យាសាស្ត្រកុំព្យូទ័រ")}
                            value={fields.programOfInterest}
                            onChange={update("programOfInterest")}
                            kh={kh}
                          />
                          <Field
                            id="lf-highschool"
                            label={t("High School Name", "ឈ្មោះវិទ្យាល័យ")}
                            placeholder={t("e.g. Hun Sen High School", "ឧទា. វិទ្យាល័យហ៊ុនសែន")}
                            value={fields.highSchoolName}
                            onChange={update("highSchoolName")}
                            kh={kh}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={reset}
                          data-testid="button-reset-letter"
                          className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors ${kh ? "font-khmer" : ""}`}
                        >
                          <Eraser className="w-3.5 h-3.5" />
                          {t("Clear all fields", "សម្អាតគ្រប់ប្រអប់")}
                        </button>
                      </div>

                      {/* ── Preview pane ── */}
                      <div className="lg:col-span-3 bg-stone-100/40 p-4 sm:p-6 print:p-0 print:bg-white">
                        <h3 className={`text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 print:hidden ${kh ? "font-khmer" : ""}`}>
                          {t("Live preview", "ការមើលបណ្ដោះអាសន្ន")}
                        </h3>

                        {/* The letter sheet — serif, A4-ish proportions. */}
                        <div
                          id="letter-print"
                          data-testid="letter-preview"
                          className="mx-auto max-w-[680px] bg-white shadow-md ring-1 ring-stone-200 px-8 sm:px-12 py-10 sm:py-14 text-stone-900 leading-relaxed print:shadow-none print:ring-0 print:max-w-none print:px-0 print:py-0"
                          style={{
                            fontFamily:
                              '"Times New Roman", Times, Garamond, "EB Garamond", Georgia, serif',
                            fontSize: "12pt",
                          }}
                        >
                          {/* Sender block */}
                          <div className="whitespace-pre-line">
                            {preview.name}
                            {"\n"}
                            {preview.addr}
                            {"\n"}
                            {preview.contact}
                          </div>

                          <div className="h-6" />
                          <div>{preview.date}</div>

                          <div className="h-6" />
                          <div className="whitespace-pre-line">
                            Admissions Office
                            {"\n"}
                            {preview.uni}
                          </div>

                          <div className="h-6" />
                          <div>Dear Admissions Committee,</div>

                          <div className="h-3" />
                          <p>
                            I am writing to express my strong interest in applying for the{" "}
                            <strong>{preview.program}</strong> program at{" "}
                            <strong>{preview.uni}</strong> for the upcoming academic year.
                          </p>

                          <div className="h-3" />
                          <p>
                            As a student at <strong>{preview.hs}</strong>, I have developed a
                            strong foundation in my studies and a deep passion for continuing
                            my education. I am particularly drawn to your university because
                            of its reputation for academic excellence and the opportunity it
                            provides for students to grow both personally and professionally.
                          </p>

                          <div className="h-3" />
                          <p>
                            During my time in high school, I have worked hard to maintain
                            strong grades and participate in community activities. I believe
                            that my dedication, resilience, and eagerness to learn make me a
                            strong candidate for your program.
                          </p>

                          <div className="h-3" />
                          <p>
                            I have attached my academic transcripts and required documents
                            for your review. Thank you for your time and consideration. I
                            look forward to the opportunity to contribute to{" "}
                            <strong>{preview.uni}</strong>.
                          </p>

                          <div className="h-6" />
                          <div>Sincerely,</div>
                          <div className="h-12" />
                          <div className="text-stone-500 italic">(Signature)</div>
                          <div className="h-1" />
                          <div className="font-semibold">{preview.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Footer (hidden on print) ── */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-3 border-t border-stone-200 bg-stone-50 print:hidden">
                    <p className={`text-[11px] sm:text-xs text-stone-600 max-w-md ${kh ? "font-khmer" : ""}`}>
                      {t(
                        'Tip: in the print dialog, choose "Save as PDF" as the destination.',
                        "ព័ត៌មាន៖ នៅក្នុងប្រអប់បោះពុម្ព សូមជ្រើសរើស «រក្សាទុកជា PDF»។",
                      )}
                    </p>
                    <div className="flex items-center gap-2">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-200 transition-colors ${kh ? "font-khmer" : ""}`}
                        >
                          {t("Cancel", "បោះបង់")}
                        </button>
                      </Dialog.Close>
                      <button
                        type="button"
                        onClick={handlePrint}
                        data-testid="button-generate-pdf"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 ${kh ? "font-khmer" : ""}`}
                      >
                        <Printer className="w-4 h-4" />
                        {t("Generate PDF", "បង្កើតឯកសារ PDF")}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Small labelled text input — keeps the form pane tidy and accessible. */
function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  kh,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  kh: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1 ${kh ? "font-khmer" : ""}`}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={`input-${id}`}
        className={`w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-shadow ${kh ? "font-khmer" : ""}`}
      />
    </div>
  );
}

export default LetterBuilder;
