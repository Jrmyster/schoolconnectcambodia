import { SymmetryDiagram } from "@/components/diagrams/LearningDiagrams";
import { useEffect, useRef, useState } from "react";

import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  Crosshair,
  FlipHorizontal,
  RefreshCw,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { InlineMath } from "react-katex";

/* ══════════════════════════════════════════════════════════════════════════
 * SymmetrySpinner — interactive 3D demonstrator for the three basic
 * symmetry operations on a Square Planar molecule (1 central atom,
 * 4 identical surrounding atoms in a flat square).
 *
 *   Op A · C₄ rotation     : spin the whole molecule 90° about the y-axis,
 *                             showing a temporary vertical axis line.
 *   Op B · Mirror plane σ  : flash a translucent vertical plane through the
 *                             centre, then physically swap the LEFT/RIGHT
 *                             atoms across that plane.
 *   Op C · Inversion (i)   : send each outer atom on a straight-line path
 *                             through the centre to the opposite vertex.
 *
 * Soft pink/purple aesthetic to match Module 3.
 * ══════════════════════════════════════════════════════════════════════════ */

type Op = "rotate" | "mirror" | "invert" | null;

/* Dynamic bonds that re-align each frame to the live atom positions, so the
   molecule stays visually connected during mirror / inversion animations. */

/* ────────────────────────────────────────────────────────────────────────── */

interface FeedbackMessage {
  en: string;
  kh: string;
}

const FEEDBACK: Record<Exclude<Op, null>, FeedbackMessage> = {
  rotate: {
    en: "Notice how the molecule looks exactly the same as before? That means it has rotational symmetry! The C₄ axis is a true symmetry axis for a square-planar molecule.",
    kh: "តើអ្នកសង្កេតឃើញថាម៉ូលេគុលមើលទៅដូចដើមបេះបិទទេ? នោះមានន័យថាវាមានស៊ីមេទ្រីរង្វិល! អ័ក្ស C₄ គឺជាអ័ក្សស៊ីមេទ្រីពិតប្រាកដសម្រាប់ម៉ូលេគុលការ៉េផ្លាណា។",
  },
  mirror: {
    en: "The left and right atoms swapped — but the molecule still looks identical! That vertical plane through the centre is a real mirror plane (σᵥ).",
    kh: "អាតូមឆ្វេង និងស្តាំបានប្តូរទីតាំងគ្នា — ប៉ុន្តែម៉ូលេគុលនៅតែមើលទៅដូចគ្នាបេះបិទ! ប្លង់បញ្ឈរឆ្លងកាត់ចំណុចកណ្តាលនោះគឺជាប្លង់ឆ្លុះពិត (σᵥ)។",
  },
  invert: {
    en: "Each outer atom flew through the centre to the opposite side — and the molecule is unchanged. Square-planar molecules have a true inversion centre (i).",
    kh: "អាតូមខាងក្រៅនីមួយៗបានហោះឆ្លងកាត់កណ្តាលទៅផ្នែកម្ខាងទៀត — ហើយម៉ូលេគុលមិនផ្លាស់ប្តូរ។ ម៉ូលេគុលការ៉េផ្លាណាមានចំណុចបញ្ច្រាសពិត (i)។",
  },
};

const IDLE_MESSAGE: FeedbackMessage = {
  en: "Drag the molecule to rotate the camera, then press a symmetry button to watch the operation play out in real time.",
  kh: "អូសម៉ូលេគុលដើម្បីបង្វិលកាមេរ៉ា បន្ទាប់មកចុចប៊ូតុងស៊ីមេទ្រីដើម្បីមើលប្រតិបត្តិការដំណើរការក្នុងពេលវេលាជាក់ស្តែង។",
};

export function SymmetrySpinner() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [op, setOp] = useState<Op>(null);
  const [triggerKey, setTriggerKey] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackMessage>(IDLE_MESSAGE);
  const [busy, setBusy] = useState(false);
  // Remounts the SVG molecule diagram to fully reset positions
  const [resetKey, setResetKey] = useState(0);

  // Timer that releases the "busy" state — kept as a ref so we can clear it
  // on unmount or when a new op is triggered.
  const busyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    },
    [],
  );

  function trigger(next: Exclude<Op, null>) {
    if (busy) return;
    setBusy(true);
    setOp(next);
    setTriggerKey((k) => k + 1);
    setFeedback(FEEDBACK[next]);
    // Release "busy" on a fixed timer (animation duration + 250ms breathing
    // room). The controls remain independent of the SVG animation.
    if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    busyTimerRef.current = setTimeout(() => setBusy(false), 1450);
  }

  function handleReset() {
    if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    setOp(null);
    setBusy(false);
    setFeedback(IDLE_MESSAGE);
    setResetKey((k) => k + 1);
  }

  return (
    <section
      data-testid="symmetry-spinner"
      aria-labelledby="symmetry-spinner-title"
      className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50/90 via-white to-purple-50/80 p-5 sm:p-6 shadow-sm"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow ring-2 ring-pink-200"
          aria-hidden="true"
        >
          <Sparkles className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <div className="flex-1 min-w-0">
          <h3
            id="symmetry-spinner-title"
            className={`text-lg sm:text-xl font-bold leading-tight text-pink-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("The Symmetry Spinner", "ម៉ាស៊ីនបង្វិលស៊ីមេទ្រី")}
          </h3>
          <p
            className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Try the three operations on a square-planar molecule",
              "សាកល្បងប្រតិបត្តិការទាំងបីលើម៉ូលេគុលការ៉េផ្លាណា",
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* ── 3D viewport ────────────────────────────────────── */}
        <div
          data-testid="symmetry-spinner-viewport"
          className="lg:col-span-3 relative h-72 sm:h-80 rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-100/70 via-rose-50 to-purple-100/70 overflow-hidden cursor-grab active:cursor-grabbing"
          aria-label={
            kh
              ? "ផ្ទាំងបង្ហាញ ៣ វិមាត្រនៃម៉ូលេគុលការ៉េផ្លាណា · អូសដើម្បីបង្វិលកាមេរ៉ា"
              : "3D viewport of a square-planar molecule · drag to rotate the camera"
          }
        >
          <SymmetryDiagram key={resetKey} operation={op} step={triggerKey} />

          {/* hint badge — only meaningful when 3D is alive */}
        </div>

        {/* ── Control panel ──────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase text-pink-700 opacity-80 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Control Panel", "ផ្ទាំងគ្រប់គ្រង")}
          </span>

          <button
            type="button"
            data-testid="btn-spin-rotate"
            onClick={() => trigger("rotate")}
            disabled={busy}
            aria-label="Rotate 90° (C₄ axis) · បង្វិល ៩០° (អ័ក្ស C₄)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-pink-300 bg-white hover:bg-pink-50 hover:border-pink-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <RotateCw className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-pink-900">
                Rotate 90°{" "}
                <span className="ml-0.5 text-pink-600 font-semibold text-xs">
                  (<InlineMath math={"C_{4}"} /> axis)
                </span>
              </span>
              <span className="block text-sm font-bold text-pink-900 font-khmer leading-loose">
                បង្វិល ៩០°{" "}
                <span className="text-pink-600 font-semibold text-xs">
                  (អ័ក្ស <InlineMath math={"C_{4}"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-mirror"
            onClick={() => trigger("mirror")}
            disabled={busy}
            aria-label="Mirror Plane (σ) · ប្លង់ចំណាំងផ្លាត (σ)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <FlipHorizontal className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-purple-900">
                Mirror Plane{" "}
                <span className="ml-0.5 text-purple-600 font-semibold text-xs">
                  (<InlineMath math={"\\sigma"} />)
                </span>
              </span>
              <span className="block text-sm font-bold text-purple-900 font-khmer leading-loose">
                ប្លង់ចំណាំងផ្លាត{" "}
                <span className="text-purple-600 font-semibold text-xs">
                  (<InlineMath math={"\\sigma"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-invert"
            onClick={() => trigger("invert")}
            disabled={busy}
            aria-label="Inversion Center (i) · មជ្ឈមណ្ឌលបញ្ច្រាស (i)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-fuchsia-300 bg-white hover:bg-fuchsia-50 hover:border-fuchsia-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <Crosshair className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-fuchsia-900">
                Inversion Center{" "}
                <span className="ml-0.5 text-fuchsia-600 font-semibold text-xs">
                  (<InlineMath math={"i"} />)
                </span>
              </span>
              <span className="block text-sm font-bold text-fuchsia-900 font-khmer leading-loose">
                មជ្ឈមណ្ឌលបញ្ច្រាស{" "}
                <span className="text-fuchsia-600 font-semibold text-xs">
                  (<InlineMath math={"i"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-reset"
            onClick={handleReset}
            className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-700 hover:text-pink-900 hover:bg-pink-100 transition-colors self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className={kh ? "font-khmer" : ""}>
              {t("Reset molecule", "កំណត់ម៉ូលេគុលឡើងវិញ")}
            </span>
          </button>
        </div>
      </div>

      {/* ── Feedback box ─────────────────────────────────────── */}
      <div
        data-testid="symmetry-spinner-feedback"
        role="status"
        aria-live="polite"
        className="mt-4 rounded-xl border-2 border-pink-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-start gap-2.5">
          <span
            className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow flex-shrink-0"
            aria-hidden="true"
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
          <div className="flex-1 min-w-0">
            <p
              data-testid="symmetry-spinner-feedback-en"
              className="text-sm leading-relaxed text-foreground/90"
            >
              {feedback.en}
            </p>
            <p
              data-testid="symmetry-spinner-feedback-kh"
              className="mt-1.5 text-sm font-khmer leading-loose text-foreground/80 border-t border-pink-100 pt-1.5"
            >
              {feedback.kh}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
