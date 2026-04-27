import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Triangle as TriangleIcon,
  Square as SquareIcon,
  Lightbulb,
  Ruler,
  Globe2,
  Box,
  PenTool,
  Boxes,
  ExternalLink,
  MonitorCog,
  Cpu,
} from "lucide-react";
import { useState } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  ARC-01 · Architecture: The Strength of Shapes
//           ស្ថាបត្យកម្ម៖ ភាពរឹងមាំនៃរូបរាង
//
//   1. The Battle Against Gravity      — load → frame → ground
//   2. Squares vs. Triangles           — a deformable square vs. an unbreakable triangle
//   3. The Arch and the Dome           — voussoir wedges, rotated arches, geodesic webs
//
//   Aesthetic: blueprint / structural drawing — drafting paper grid, slate
//   navy lines, monospace spec codes, structural nodes drawn as small circles.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-slate-300/70" : "border-cyan-400/60";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function ArchitectureStrengthPage() {
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
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 211, 238, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(34, 211, 238, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-cyan-200">ARC-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Architecture: The Strength of Shapes",
                  "ស្ថាបត្យកម្ម៖ ភាពរឹងមាំនៃរូបរាង"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Why does a wat with a tall pointed roof stand for 800 years, while a brick wall pushed sideways flattens in a second? The answer is not in the bricks — it is in the shape.",
                  "ហេតុអ្វីបានជាវត្ដដែលមានដំបូលខ្ពស់ស្រួចឈរបាន ៨០០ ឆ្នាំ ខណៈពេលដែលជញ្ជាំងឥដ្ឋដែលត្រូវរុញចំហៀងដួលក្នុងមួយវិនាទី? ចម្លើយមិននៅក្នុងឥដ្ឋទេ — វានៅក្នុង ‘រូបរាង’។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <BattleAgainstGravity kh={kh} t={t} />
        <SquaresVsTriangles kh={kh} t={t} />
        <ArchAndDome kh={kh} t={t} />

        {/* ── Bridge from physical architecture → digital architecture ── */}
        <DraftingDivider kh={kh} t={t} />

        {/* New chapter — Digital Blueprints / ប្លង់ឌីជីថល */}
        <DigitalBlueprintsSection kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-slate-300 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <Ruler className="w-6 h-6 text-slate-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Look around: ", "មើលជុំវិញ ៖ ")}</strong>
            {t(
              "every roof truss, every bridge, every Angkor temple lintel — they all use the same three tricks: triangulate, arch, dome. Strong buildings are not made of strong materials; they are made of strong shapes.",
              "រាល់របងដំបូល រាល់ស្ពាន រាល់ធ្នឹមប្រាសាទនៅអង្គរ — សុទ្ធតែប្រើល្បិចបីដូចគ្នា ៖ ត្រីកោណកម្ម កោង និងដូម។ អគាររឹងមាំ មិនមែនបង្កើតពីសម្ភារៈរឹងមាំទេ — វាបង្កើតពីរូបរាងរឹងមាំ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors ${kh ? "font-khmer" : ""}`}
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
//  Section 01 — The Battle Against Gravity
// ════════════════════════════════════════════════════════════════════════════

function BattleAgainstGravity({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-gravity">
      <SectionHeader
        spec="01"
        en="The Battle Against Gravity"
        kh="ការប្រយុទ្ធប្រឆាំងនឹងទំនាញផែនដី"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-cyan-300 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-center">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Every wall, every roof, every floor is in a 24-hour battle. The Earth pulls every brick, every tile, every body inside the building straight down with a force called ",
                "រាល់ជញ្ជាំង រាល់ដំបូល រាល់កម្រាល សុទ្ធតែស្ថិតក្នុងសមរភូមិ ២៤ ម៉ោង។ ផែនដីទាញរាល់ឥដ្ឋ រាល់ក្បឿង រាល់រូបកាយក្នុងអគារ ចុះត្រង់ ដោយកម្លាំងហៅថា "
              )}
              <strong className={`text-rose-700 ${kh ? "font-khmer" : ""}`}>
                {t("gravity", "ទំនាញផែនដី")}
              </strong>
              .
            </p>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "An architect's whole job is to design a path. The heavy weight at the top — the ",
                "ការងារទាំងមូលរបស់ស្ថាបត្យករ គឺការរចនា ‘ផ្លូវ’ មួយ។ ទម្ងន់ធ្ងន់នៅខាងលើ — "
              )}
              <strong className={`text-amber-700 ${kh ? "font-khmer" : ""}`}>
                {t("Load", "បន្ទុក")}
              </strong>
              {t(
                " — must be safely caught by the structure, carried down through the columns and walls, and finally pushed into the ",
                " — ត្រូវតែត្រូវរង្វាស់ទទួលដោយរចនាសម្ព័ន្ធ យកចុះតាមសសរ និងជញ្ជាំង ហើយចុងក្រោយរុញចូលទៅក្នុង "
              )}
              <strong className={`text-emerald-800 ${kh ? "font-khmer" : ""}`}>
                {t("ground", "ដី")}
              </strong>
              .
            </p>

            {/* Vocabulary chips */}
            <div className="flex flex-wrap gap-2 mb-4" data-testid="gravity-vocab">
              <VocabChip color="rose" en="Load" kh="បន្ទុក" k={kh} />
              <VocabChip color="amber" en="Compression" kh="ការសង្កត់" k={kh} />
              <VocabChip color="cyan" en="Tension" kh="ការទាញ" k={kh} />
              <VocabChip color="emerald" en="Foundation" kh="គ្រឹះ" k={kh} />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-amber-50 border-l-4 border-amber-400 p-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-amber-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong>{t("Key idea: ", "គំនិតគន្លឹះ ៖ ")}</strong>
                {t(
                  "Buildings don't lift weight. They hand weight down — like a bucket-line of villagers passing one heavy stone all the way to the ground.",
                  "អគារមិនលើកទម្ងន់ទេ។ វាបញ្ជូនទម្ងន់ចុះក្រោម — ដូចជាខ្សែក្រុមអ្នកស្រុក ដែលបញ្ជូនថ្មធ្ងន់មួយ ពីដៃមួយទៅដៃមួយ រហូតដល់ដី។"
                )}
              </p>
            </div>
          </div>

          {/* Force-flow diagram */}
          <div
            className="rounded-xl bg-slate-900 p-4 text-slate-100"
            data-testid="gravity-diagram"
          >
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("FORCE FLOW · LOAD → GROUND", "លំហូរកម្លាំង · បន្ទុក → ដី")}
            </div>
            <ForceFlowDiagram kh={kh} />
            <div className={`mt-2 text-center text-[11px] text-slate-400 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
              {t(
                "Roof load → walls → foundation → earth",
                "បន្ទុកដំបូល → ជញ្ជាំង → គ្រឹះ → ដី"
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VocabChip({
  color,
  en,
  kh,
  k,
}: {
  color: "rose" | "amber" | "cyan" | "emerald";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    rose: "border-rose-300 text-rose-800 bg-rose-50",
    amber: "border-amber-300 text-amber-800 bg-amber-50",
    cyan: "border-cyan-300 text-cyan-800 bg-cyan-50",
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
//  Section 02 — Squares vs. Triangles
// ════════════════════════════════════════════════════════════════════════════

function SquaresVsTriangles({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // Slider: 0 = upright, 1 = fully sheared
  const [shear, setShear] = useState<number>(0); // 0..10

  return (
    <section className="mb-10" data-testid="section-shapes">
      <SectionHeader
        spec="02"
        en="Squares vs. Triangles"
        kh="ការ៉េ និងត្រីកោណ"
        kh_={kh}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Square card */}
        <article
          className="relative rounded-2xl border-2 border-rose-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="square-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <SquareIcon className="w-5 h-5 text-rose-700" />
            <h3 className={`text-lg font-bold text-rose-900 ${kh ? "font-khmer" : ""}`}>
              {t("The Square — A Weak Shape", "ការ៉េ — រូបរាងខ្សោយ")}
            </h3>
          </div>

          {/* Interactive deformable square */}
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <SquareShearDiagram shear={shear / 10} kh={kh} />
            <label
              className={`mt-2 block text-[11px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("Push the side", "រុញផ្នែកចំហៀង")} ·{" "}
              <span className="text-rose-700 font-bold">
                {Math.round(shear * 10)}%
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={shear}
              onChange={(e) => setShear(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500"
              data-testid="shear-slider"
              aria-label={t("Sideways push on a square", "ការរុញចំហៀងលើការ៉េ")}
            />
          </div>

          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Push one side and the four 90° corners slide. The square flattens into a parallelogram (រាងប្រឡាយ) without breaking a single side. That sliding motion is called ",
              "រុញផ្នែកមួយ ហើយជ្រុង ៩០° ទាំងបួនរអិល។ ការ៉េនឹងផ្ទាល់ទៅជា ‘រាងប្រឡាយ’ ដោយមិនបាក់ផ្នែកណាមួយឡើយ។ ចលនារអិលនោះហៅថា "
            )}
            <strong className={`text-rose-700 ${kh ? "font-khmer" : ""}`}>
              {t("racking", "ការរអិលចំហៀង")}
            </strong>
            {t(
              " — it is the #1 reason wooden houses collapse in earthquakes.",
              " — នេះជាមូលហេតុលេខ ១ ដែលធ្វើឱ្យផ្ទះឈើដួលក្នុងពេលរញ្ជួយដី។"
            )}
          </p>
        </article>

        {/* Triangle card */}
        <article
          className="relative rounded-2xl border-2 border-emerald-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="triangle-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <TriangleIcon className="w-5 h-5 text-emerald-700" />
            <h3 className={`text-lg font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
              {t("The Triangle — A Naturally Rigid 2D Shape", "ត្រីកោណ — រូបរាង ២D ដែលរឹងមាំតាមធម្មជាតិ")}
            </h3>
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <TriangleForceDiagram kh={kh} />
            <p
              className={`mt-2 text-center text-[11px] text-slate-500 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}
            >
              {t(
                "Top force splits down the two legs",
                "កម្លាំងពីលើ បំបែកចុះតាមជើងពីរ"
              )}
            </p>
          </div>

          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Place weight on the top point and the force is split evenly down the two angled sides. To deform a triangle, you must actually break or stretch a side — that takes thousands of times more energy than racking a square. This is why every roof truss, every bicycle frame, every steel bridge is built from triangles.",
              "ដាក់ទម្ងន់នៅចំណុចកំពូល ហើយកម្លាំងនឹងបំបែកស្មើគ្នាចុះតាមជើងផ្អៀងពីរ។ ដើម្បីផ្ទាល់ត្រីកោណ អ្នកត្រូវបាក់ ឬពន្លាតផ្នែកមួយជាក់ស្ដែង — ការនេះត្រូវការថាមពលច្រើនជាងការរុញការ៉េរាប់ពាន់ដង។ នេះហើយជាមូលហេតុដែលរបងដំបូល គ្រោងកង់ និងស្ពានដែកគ្រប់ច្រើន សុទ្ធតែសាងសង់ពីត្រីកោណ។"
            )}
          </p>
        </article>
      </div>

      {/* Comparison takeaway */}
      <div
        className="relative mt-5 rounded-xl border-2 border-dashed border-slate-300 p-4 flex items-start gap-3"
        style={CARD_BG}
        data-testid="shapes-takeaway"
      >
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong>{t("Engineer's rule of thumb: ", "ច្បាប់មេដៃរបស់វិស្វករ ៖ ")}</strong>
          {t(
            "If a square wall feels wobbly, nail one diagonal piece across it. You have just turned one weak square into two strong triangles.",
            "បើជញ្ជាំងការ៉េមួយដួលងាយ ដាំបន្ទះតែមួយតាមអង្កត់ទ្រូង។ អ្នកទើបតែប្ដូរការ៉េខ្សោយមួយ ទៅជាត្រីកោណខ្លាំងពីរហើយ។"
          )}
        </p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Arch and the Dome
// ════════════════════════════════════════════════════════════════════════════

function ArchAndDome({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section data-testid="section-arch-dome">
      <SectionHeader
        spec="03"
        en="The Arch and the Dome"
        kh="រាងកោង និងរាងដូម"
        kh_={kh}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Arch */}
        <article
          className="relative rounded-2xl border-2 border-amber-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="arch-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-amber-800">
              ARC-01.A
            </span>
            <span className="text-slate-300">·</span>
            <h3 className={`text-lg font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}>
              {t("The Arch", "រាងកោង")}
            </h3>
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <ArchDiagram kh={kh} />
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Ancient Roman and Khmer engineers built bridges and gateways from wedge-shaped stones called ",
              "វិស្វករបុរាណរ៉ូម៉ាំង និងខ្មែរ បានសាងសង់ស្ពាន និងទ្វារធំ ពីដុំថ្មកំណល់ដែលហៅថា "
            )}
            <strong className={`text-amber-700 ${kh ? "font-khmer" : ""}`}>
              {t("voussoirs", "វូស្វា")}
            </strong>
            {t(
              ". When weight is pushed down on top, the wedges squeeze sideways into each other. The ",
              "។ ពេលដាក់ទម្ងន់ចុះពីលើ ដុំកំណល់ទាំងនោះច្របាច់ផ្នែកចំហៀងចូលគ្នា។ "
            )}
            <strong className={`text-rose-700 ${kh ? "font-khmer" : ""}`}>
              {t("keystone", "ថ្មគន្លឹះ")}
            </strong>
            {t(
              " at the top locks them in place — under vertical load the wedges press tighter together. The arch also pushes outward at its base, so it must rest on heavy walls, buttresses, or tie-rods that absorb this lateral thrust; without strong abutments, the arch will spread and collapse.",
              " ដែលនៅកំពូល ចាក់សោវាឱ្យនៅនឹង — នៅក្រោមទម្ងន់បញ្ឈរ ដុំកំណល់ច្របាច់គ្នាកាន់តែតឹង។ ប៉ុន្តែរាងកោងក៏រុញចេញខាងក្រៅនៅជើង ដូច្នេះវាត្រូវការសសរ ឬកំពែងធំៗ ដើម្បីទប់កម្លាំងផ្ដេកនេះ។ បើគ្មានជើងទម្រធំ កោងនឹងពន្លាតហើយដួល។"
            )}
          </p>

          <div className={`rounded-md border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-amber-900" : "font-mono uppercase tracking-widest text-amber-800"}`}>
            {t(
              "EXAMPLE · Angkor Wat causeway arches, Roman aqueducts",
              "ឧទាហរណ៍ · កោងស្ពានអង្គរវត្ត, ប្រឡាយទឹករ៉ូម៉ាំង"
            )}
          </div>
        </article>

        {/* Dome */}
        <article
          className="relative rounded-2xl border-2 border-violet-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="dome-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-violet-800">
              ARC-01.B
            </span>
            <span className="text-slate-300">·</span>
            <h3 className={`text-lg font-bold text-violet-900 ${kh ? "font-khmer" : ""}`}>
              {t("The Dome", "រាងដូម")}
            </h3>
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <DomeDiagram kh={kh} />
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "A dome is simply an arch spun 360° around its centre. It is the strongest 3D shape we know: weight on top is shared evenly down infinitely many invisible arches, and finally pushed into a circular ring at the base.",
              "រាងដូមគឺគ្រាន់តែជារាងកោងមួយ ដែលបង្វិលពេញ ៣៦០° ជុំវិញចំណុចកណ្ដាល។ វាជារូបរាង ៣D ខ្លាំងបំផុតដែលយើងស្គាល់ ៖ ទម្ងន់នៅខាងលើ ត្រូវចែកស្មើគ្នា ចុះតាមរាងកោងមើលមិនឃើញគ្មានដែនកំណត់ ហើយចុងក្រោយរុញចូលទៅក្នុងរង្វង់នៅគ្រឹះ។"
            )}
          </p>

          <div className={`rounded-md border border-violet-200 bg-violet-50/70 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-violet-900" : "font-mono uppercase tracking-widest text-violet-800"}`}>
            {t(
              "EXAMPLE · Egg shells, the Pantheon, igloos, the human skull",
              "ឧទាហរណ៍ · សំបកស៊ុត ប៉ានធេអុង ផ្ទះស្ពាន់ទឹកកក លលាដ៍ក្បាលមនុស្ស"
            )}
          </div>
        </article>
      </div>

      {/* Geodesic dome callout */}
      <article
        className="relative mt-5 rounded-2xl border-2 border-emerald-400 p-5 shadow-sm"
        style={CARD_BG}
        data-testid="geodesic-card"
      >
        <CornerMarks subtle />
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5 items-center">
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3">
            <GeodesicDiagram kh={kh} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe2 className="w-5 h-5 text-emerald-700" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-800">
                ARC-01.C
              </span>
              <span className="text-slate-300">·</span>
              <h3 className={`text-lg font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
                {t("The Geodesic Dome", "ដូមជីអូដេស៊ិក")}
              </h3>
            </div>
            <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "In 1949 the American architect ",
                "ក្នុងឆ្នាំ ១៩៤៩ ស្ថាបត្យករអាមេរិកម្នាក់ឈ្មោះ "
              )}
              <strong className="text-emerald-800">Buckminster Fuller</strong>
              {t(
                " combined our two best tricks — triangles and the dome — into one structure: a web of small triangles bent over the surface of a sphere. The result is the ",
                " បានបញ្ចូលល្បិចល្អបំផុតពីរ — ត្រីកោណ និងដូម — ចូលគ្នាក្នុងរចនាសម្ព័ន្ធតែមួយ ៖ បណ្ដាញត្រីកោណតូចៗ បត់លើផ្ទៃនៃរង្វង់មូល។ លទ្ធផលគឺ "
              )}
              <strong className={`text-emerald-800 ${kh ? "font-khmer" : ""}`}>
                {t("geodesic dome", "ដូមជីអូដេស៊ិក")}
              </strong>
              {t(
                " — very strong for its weight, very light, and using far less material than the masonry walls and heavy roof needed to enclose the same volume. It is a striking example of ",
                " — រឹងមាំខ្លាំងបើធៀបនឹងទម្ងន់ស្រាលរបស់វា ហើយប្រើសម្ភារៈតិចជាងជញ្ជាំង និងដំបូលធ្ងន់ៗដែលត្រូវប្រើដើម្បីគ្របទំហំដូចគ្នា។ វាជាគំរូដ៏ឆ្នើមនៃ "
              )}
              <strong className={`text-emerald-800 ${kh ? "font-khmer" : ""}`}>
                {t("frugal architecture", "សន្សំបំផុត")}
              </strong>
              .
            </p>
            <div className={`rounded-md border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-emerald-900" : "font-mono uppercase tracking-widest text-emerald-800"}`}>
              {t(
                "EXAMPLE · Greenhouses, EPCOT sphere, emergency shelters",
                "ឧទាហរណ៍ · ផ្ទះកញ្ចក់ដាំរុក្ខជាតិ, រង្វង់ EPCOT, ជំរកអាសន្ន"
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared section header
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
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5">
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
//  SVG Diagrams — blueprint style
// ════════════════════════════════════════════════════════════════════════════

const STROKE = "#0f172a"; // slate-900
const LIGHT = "#94a3b8"; // slate-400
const ACCENT = "#0e7490"; // cyan-700
const FORCE = "#f43f5e"; // rose-500 — gravity / load
const FLOW = "#10b981"; // emerald-500 — force flow

// ── Force flow diagram (gravity section) ──────────────────────────────────
function ForceFlowDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "គំនូរលំហូរកម្លាំងពីដំបូលចុះទៅដី" : "Diagram showing force flow from roof down to ground"}
    >
      <title>{kh ? "លំហូរបន្ទុក" : "Load flow"}</title>
      {/* ground */}
      <line x1="10" y1="180" x2="270" y2="180" stroke={STROKE} strokeWidth="1.5" />
      {/* hatching to mark earth */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 30}
          y1="180"
          x2={10 + i * 30}
          y2="195"
          stroke={STROKE}
          strokeWidth="0.8"
        />
      ))}
      {/* roof — triangle */}
      <polygon
        points="60,55 220,55 140,15"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      {/* walls */}
      <line x1="70" y1="55" x2="70" y2="180" stroke={ACCENT} strokeWidth="2.2" />
      <line x1="210" y1="55" x2="210" y2="180" stroke={ACCENT} strokeWidth="2.2" />
      {/* foundation */}
      <rect x="55" y="180" width="30" height="6" fill={STROKE} />
      <rect x="195" y="180" width="30" height="6" fill={STROKE} />
      {/* downward weight arrows on roof */}
      {[100, 140, 180].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="2" x2={x} y2="14" stroke={FORCE} strokeWidth="2" />
          <polygon points={`${x},14 ${x - 4},7 ${x + 4},7`} fill={FORCE} />
        </g>
      ))}
      {/* force flow down walls */}
      <line x1="70" y1="60" x2="70" y2="172" stroke={FLOW} strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon points="70,172 66,164 74,164" fill={FLOW} />
      <line x1="210" y1="60" x2="210" y2="172" stroke={FLOW} strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon points="210,172 206,164 214,164" fill={FLOW} />
      {/* labels */}
      <text x="140" y="40" fontSize="10" textAnchor="middle" fill="#fbbf24" fontFamily="monospace">
        {kh ? "បន្ទុក" : "LOAD"}
      </text>
      <text x="40" y="125" fontSize="9" fill={LIGHT} fontFamily="monospace">
        {kh ? "ជញ្ជាំង" : "wall"}
      </text>
      <text x="140" y="195" fontSize="9" textAnchor="middle" fill={LIGHT} fontFamily="monospace">
        {kh ? "ដី" : "ground"}
      </text>
    </svg>
  );
}

// ── Square shear diagram ──────────────────────────────────────────────────
// shear: 0..1 — how far the top has been pushed sideways
function SquareShearDiagram({ shear, kh }: { shear: number; kh: boolean }) {
  const dx = shear * 60; // max 60 px sideways
  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full h-auto"
      role="img"
      aria-label={
        kh
          ? `គំនូរការ៉េដែលត្រូវរុញចំហៀង ${Math.round(shear * 100)}%`
          : `Diagram of a square pushed sideways ${Math.round(shear * 100)}%`
      }
    >
      <title>{kh ? "ការ៉េរអិល" : "Square racking"}</title>
      {/* ground */}
      <line x1="10" y1="140" x2="230" y2="140" stroke={STROKE} strokeWidth="1.5" />
      {/* original (ghost) outline */}
      <polygon
        points="80,140 80,40 180,40 180,140"
        fill="none"
        stroke={LIGHT}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {/* deformed square */}
      <polygon
        points={`80,140 ${80 + dx},40 ${180 + dx},40 180,140`}
        fill="none"
        stroke={shear > 0.05 ? FORCE : ACCENT}
        strokeWidth="2.5"
      />
      {/* corner nodes */}
      {[
        [80, 140],
        [80 + dx, 40],
        [180 + dx, 40],
        [180, 140],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={shear > 0.05 ? FORCE : ACCENT} />
      ))}
      {/* sideways push arrow */}
      <line x1={50} y1={50} x2={75 + dx} y2={50} stroke={FORCE} strokeWidth="2" />
      <polygon points={`${75 + dx},50 ${69 + dx},47 ${69 + dx},53`} fill={FORCE} />
      <text x="40" y="38" fontSize="9" fill={FORCE} fontFamily="monospace" textAnchor="middle">
        {kh ? "រុញ" : "push"}
      </text>
      {/* ground hatch */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={30 + i * 30} y1="140" x2={20 + i * 30} y2="155" stroke={STROKE} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

// ── Triangle force diagram ────────────────────────────────────────────────
function TriangleForceDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "គំនូរត្រីកោណដែលទទួលកម្លាំងពីលើ" : "Diagram of a triangle receiving force from above"}
    >
      <title>{kh ? "ការបែងចែកកម្លាំងលើត្រីកោណ" : "Force split on a triangle"}</title>
      {/* ground */}
      <line x1="10" y1="140" x2="230" y2="140" stroke={STROKE} strokeWidth="1.5" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={30 + i * 30} y1="140" x2={20 + i * 30} y2="155" stroke={STROKE} strokeWidth="0.8" />
      ))}
      {/* triangle */}
      <polygon points="120,30 50,140 190,140" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      {/* nodes */}
      <circle cx="120" cy="30" r="4" fill={ACCENT} />
      <circle cx="50" cy="140" r="4" fill={ACCENT} />
      <circle cx="190" cy="140" r="4" fill={ACCENT} />
      {/* downward weight */}
      <line x1="120" y1="2" x2="120" y2="22" stroke={FORCE} strokeWidth="2.5" />
      <polygon points="120,22 115,14 125,14" fill={FORCE} />
      <text x="120" y="12" fontSize="9" textAnchor="middle" fill={FORCE} fontFamily="monospace">
        {kh ? "បន្ទុក" : "load"}
      </text>
      {/* force splits down two legs */}
      {/* left leg */}
      <line x1="115" y1="40" x2="60" y2="125" stroke={FLOW} strokeWidth="1.8" strokeDasharray="3 3" />
      <polygon points="60,125 67,123 64,131" fill={FLOW} />
      {/* right leg */}
      <line x1="125" y1="40" x2="180" y2="125" stroke={FLOW} strokeWidth="1.8" strokeDasharray="3 3" />
      <polygon points="180,125 173,123 176,131" fill={FLOW} />
    </svg>
  );
}

// ── Arch diagram with voussoirs ───────────────────────────────────────────
function ArchDiagram({ kh }: { kh: boolean }) {
  // Build seven voussoir wedges around a semicircle
  const cx = 120;
  const cy = 130;
  const rOuter = 70;
  const rInner = 45;
  const N = 7;
  const startAngle = 180; // degrees
  const span = 180; // semicircle

  const wedges = Array.from({ length: N }).map((_, i) => {
    const a1 = ((startAngle + (span * i) / N) * Math.PI) / 180;
    const a2 = ((startAngle + (span * (i + 1)) / N) * Math.PI) / 180;
    const p1 = [cx + rOuter * Math.cos(a1), cy + rOuter * Math.sin(a1)];
    const p2 = [cx + rOuter * Math.cos(a2), cy + rOuter * Math.sin(a2)];
    const p3 = [cx + rInner * Math.cos(a2), cy + rInner * Math.sin(a2)];
    const p4 = [cx + rInner * Math.cos(a1), cy + rInner * Math.sin(a1)];
    return { points: `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}`, isKey: i === 3 };
  });

  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "គំនូររាងកោងជាមួយដុំកំណល់ និងថ្មគន្លឹះ" : "Arch diagram showing voussoir wedges and a keystone"}
    >
      <title>{kh ? "កោង និងថ្មគន្លឹះ" : "Arch with keystone"}</title>
      {/* ground */}
      <line x1="10" y1="140" x2="230" y2="140" stroke={STROKE} strokeWidth="1.5" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={30 + i * 30} y1="140" x2={20 + i * 30} y2="155" stroke={STROKE} strokeWidth="0.8" />
      ))}
      {/* voussoirs */}
      {wedges.map((w, i) => (
        <polygon
          key={i}
          points={w.points}
          fill={w.isKey ? "#fde68a" : "none"}
          stroke={w.isKey ? "#b45309" : ACCENT}
          strokeWidth={w.isKey ? "2.5" : "2"}
        />
      ))}
      {/* downward weight on keystone */}
      <line x1="120" y1="20" x2="120" y2="50" stroke={FORCE} strokeWidth="2.5" />
      <polygon points="120,50 115,42 125,42" fill={FORCE} />
      <text x="120" y="14" fontSize="9" textAnchor="middle" fill={FORCE} fontFamily="monospace">
        {kh ? "បន្ទុក" : "load"}
      </text>
      {/* sideways squeeze arrows */}
      <line x1="40" y1="120" x2="55" y2="125" stroke={FLOW} strokeWidth="1.8" />
      <polygon points="55,125 49,121 49,129" fill={FLOW} />
      <line x1="200" y1="120" x2="185" y2="125" stroke={FLOW} strokeWidth="1.8" />
      <polygon points="185,125 191,121 191,129" fill={FLOW} />
      {/* keystone label */}
      <text x="120" y="76" fontSize="8" textAnchor="middle" fill="#b45309" fontFamily="monospace">
        {kh ? "ថ្មគន្លឹះ" : "keystone"}
      </text>
    </svg>
  );
}

// ── Dome diagram (cross-section + 3D hint) ────────────────────────────────
function DomeDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "គំនូររាងដូម ដែលចែកទម្ងន់តាមរង្វង់គ្រឹះ" : "Dome diagram showing weight distributed to a circular base"}
    >
      <title>{kh ? "ដូម" : "Dome"}</title>
      {/* ground */}
      <line x1="10" y1="140" x2="230" y2="140" stroke={STROKE} strokeWidth="1.5" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={30 + i * 30} y1="140" x2={20 + i * 30} y2="155" stroke={STROKE} strokeWidth="0.8" />
      ))}
      {/* dome — semicircle */}
      <path
        d="M 50 140 A 70 70 0 0 1 190 140 Z"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
      />
      {/* perspective base ellipse */}
      <ellipse
        cx="120"
        cy="140"
        rx="70"
        ry="10"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      {/* meridian arcs (rotation hint) */}
      {[-45, 0, 45].map((a, i) => (
        <path
          key={i}
          d={`M ${120 - 70 * Math.cos((a * Math.PI) / 180)} 140 Q 120 ${70 - Math.abs(a)} ${120 + 70 * Math.cos((a * Math.PI) / 180)} 140`}
          fill="none"
          stroke={ACCENT}
          strokeWidth="0.9"
          opacity="0.6"
        />
      ))}
      {/* downward weight */}
      <line x1="120" y1="20" x2="120" y2="55" stroke={FORCE} strokeWidth="2.5" />
      <polygon points="120,55 115,47 125,47" fill={FORCE} />
      <text x="120" y="14" fontSize="9" textAnchor="middle" fill={FORCE} fontFamily="monospace">
        {kh ? "បន្ទុក" : "load"}
      </text>
      {/* radial flow arrows */}
      {[-60, -30, 30, 60].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 120 + 25 * Math.sin(rad);
        const y1 = 105 - 18 * Math.cos(rad);
        const x2 = 120 + 60 * Math.sin(rad);
        const y2 = 135 - 5 * Math.cos(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={FLOW} strokeWidth="1.4" strokeDasharray="3 3" />
        );
      })}
      <text x="120" y="158" fontSize="9" textAnchor="middle" fill={LIGHT} fontFamily="monospace">
        {kh ? "រង្វង់គ្រឹះ" : "circular base"}
      </text>
    </svg>
  );
}

// ── Geodesic dome (web of triangles) ──────────────────────────────────────
function GeodesicDiagram({ kh }: { kh: boolean }) {
  // Hand-laid mesh of triangles approximating a geodesic dome silhouette
  const cx = 120;
  const cy = 130;
  const r = 70;
  // Build a ring of points and a top apex; connect with triangles
  const ring = Array.from({ length: 9 }).map((_, i) => {
    const a = ((180 + (180 * i) / 8) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const midRing = Array.from({ length: 7 }).map((_, i) => {
    const a = ((200 + (140 * i) / 6) * Math.PI) / 180;
    return [cx + (r * 0.65) * Math.cos(a), cy + (r * 0.65) * Math.sin(a)];
  });
  const apex: [number, number] = [cx, cy - r];

  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "គំនូរដូមជីអូដេស៊ិកធ្វើពីបណ្ដាញត្រីកោណ" : "Geodesic dome diagram made of a web of triangles"}
    >
      <title>{kh ? "ដូមជីអូដេស៊ិក" : "Geodesic dome"}</title>
      {/* ground */}
      <line x1="10" y1="140" x2="230" y2="140" stroke={STROKE} strokeWidth="1.5" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={30 + i * 30} y1="140" x2={20 + i * 30} y2="155" stroke={STROKE} strokeWidth="0.8" />
      ))}
      {/* base ellipse hint */}
      <ellipse cx={cx} cy={cy} rx={r} ry={9} fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 3" />
      {/* outer dome curve */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={ACCENT} strokeWidth="2" />

      {/* triangle web: connect ring->mid */}
      {ring.map((p, i) => {
        if (i >= ring.length - 1) return null;
        const m = midRing[Math.min(i, midRing.length - 1)];
        return (
          <g key={`r${i}`}>
            <line x1={p[0]} y1={p[1]} x2={m[0]} y2={m[1]} stroke={ACCENT} strokeWidth="1" />
            <line x1={ring[i + 1][0]} y1={ring[i + 1][1]} x2={m[0]} y2={m[1]} stroke={ACCENT} strokeWidth="1" />
            <line x1={p[0]} y1={p[1]} x2={ring[i + 1][0]} y2={ring[i + 1][1]} stroke={ACCENT} strokeWidth="0.6" opacity="0.5" />
          </g>
        );
      })}
      {/* mid -> apex */}
      {midRing.map((m, i) => (
        <g key={`m${i}`}>
          <line x1={m[0]} y1={m[1]} x2={apex[0]} y2={apex[1]} stroke={ACCENT} strokeWidth="1" />
          {i < midRing.length - 1 && (
            <line x1={m[0]} y1={m[1]} x2={midRing[i + 1][0]} y2={midRing[i + 1][1]} stroke={ACCENT} strokeWidth="0.8" opacity="0.7" />
          )}
        </g>
      ))}

      {/* nodes */}
      {[...ring, ...midRing, apex].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.2" fill={ACCENT} />
      ))}

      <text x={cx} y="156" fontSize="9" textAnchor="middle" fill={LIGHT} fontFamily="monospace">
        {kh ? "បណ្ដាញត្រីកោណ" : "triangle web"}
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Drafting Divider — bridges the physical-architecture chapter to the
//  digital-architecture chapter. Visually a drafting ruler with tick marks
//  and a centred compass medallion stamped with the spec code "→ DIGITAL".
// ════════════════════════════════════════════════════════════════════════════

function DraftingDivider({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <div
      className="my-12 flex items-center gap-3 select-none"
      data-testid="drafting-divider"
      role="separator"
      aria-label={t(
        "Section divider — transitioning from physical architecture to digital engineering software.",
        "បន្ទាត់​បំបែក​ផ្នែក — ការ​ផ្លាស់ប្ដូរ​ពី​ស្ថាបត្យកម្ម​រូបវ័ន្ត​ទៅ​កម្មវិធី​វិស្វកម្ម​ឌីជីថល។"
      )}
    >
      {/* Left ruler */}
      <DraftingRuler align="left" />

      {/* Compass medallion */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-cyan-400/70 shadow-lg flex items-center justify-center">
          <Compass className="w-9 h-9 text-cyan-300" />
          {/* tick marks around the medallion */}
          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const r1 = 36;
              const r2 = i % 6 === 0 ? 30 : 33;
              return (
                <line
                  key={i}
                  x1={40 + r1 * Math.cos(a)}
                  y1={40 + r1 * Math.sin(a)}
                  x2={40 + r2 * Math.cos(a)}
                  y2={40 + r2 * Math.sin(a)}
                  stroke="#22d3ee"
                  strokeWidth={i % 6 === 0 ? "1.4" : "0.8"}
                  opacity={i % 6 === 0 ? "0.9" : "0.55"}
                />
              );
            })}
          </svg>
        </div>
        {/* spec stamp under the medallion */}
        <div
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs px-3" : ""}`}
        >
          {t("→ DIGITAL", "→ ឌីជីថល")}
        </div>
      </div>

      {/* Right ruler */}
      <DraftingRuler align="right" />
    </div>
  );
}

function DraftingRuler({ align }: { align: "left" | "right" }) {
  // Long horizontal drafting ruler with major + minor tick marks.
  return (
    <div className="relative flex-1 h-10">
      <svg
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* ruler body */}
        <rect
          x="0"
          y="14"
          width="400"
          height="14"
          fill="#fde68a"
          stroke="#1e293b"
          strokeWidth="1"
        />
        {/* baseline */}
        <line x1="0" y1="28" x2="400" y2="28" stroke="#0f172a" strokeWidth="1.2" />
        {/* tick marks — every 10 units, with majors every 50 */}
        {Array.from({ length: 41 }).map((_, i) => {
          const x = i * 10;
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1={x}
              y1="28"
              x2={x}
              y2={major ? 14 : 21}
              stroke="#0f172a"
              strokeWidth={major ? "1" : "0.6"}
            />
          );
        })}
        {/* numeric labels every 100 */}
        {[0, 100, 200, 300, 400].map((x) => (
          <text
            key={x}
            x={align === "left" ? x + 2 : 400 - x + 2}
            y="11"
            fontSize="6.5"
            fill="#475569"
            fontFamily="ui-monospace, monospace"
          >
            {x / 10}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — Digital Blueprints: Engineering Software
//                ប្លង់ឌីជីថល៖ កម្មវិធីវិស្វកម្ម
//
//   Three sub-sections:
//   • Testing the Map Before the Territory  — what CAD is and why it matters
//   • The Industry Tools                    — three software profiles
//   • Try it Yourself                       — free, browser-based resources
//
//   Aesthetic continues the blueprint theme: drafting-paper grid, slate
//   navy chrome, cyan accents, monospace spec codes. Each tool card uses
//   a distinct accent colour but the same blueprint card chassis.
// ════════════════════════════════════════════════════════════════════════════

function DigitalBlueprintsSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-digital-blueprints">
      <SectionHeader
        spec="04"
        en="Digital Blueprints: Engineering Software"
        kh="ប្លង់ឌីជីថល៖ កម្មវិធីវិស្វកម្ម"
        kh_={kh}
      />

      {/* Lead-in paragraph for the whole chapter */}
      <p
        data-testid="digital-blueprints-title"
        className={`mb-6 text-sm sm:text-base text-slate-700 max-w-3xl ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "Real bricks are expensive; mistakes cost lives. So today, every serious building, bridge and machine is born twice — once inside a computer, then once on the construction site. These are the tools that let engineers ",
          "ឥដ្ឋ​ពិត​មាន​តម្លៃ​ថ្លៃ ហើយ​កំហុស​អាច​បង់​ជីវិត។ ដូច្នេះ​សព្វ​ថ្ងៃ រាល់​អគារ ស្ពាន និង​ម៉ាស៊ីន​ដ៏​សំខាន់​សុទ្ធតែ​កើត​ឡើង​ពីរ​ដង — មួយ​ជាមុន​នៅ​ខាង​ក្នុង​កុំព្យូទ័រ ហើយ​មួយ​ទៀត​នៅ​លើ​ទីតាំង​សាងសង់​ពិត។ នេះ​ជា​ឧបករណ៍​ដែល​អនុញ្ញាត​ឱ្យ​វិស្វករ "
        )}
        <strong className={`text-cyan-800 ${kh ? "font-khmer" : ""}`}>
          {t(
            "test the map before the territory.",
            "សាកល្បង​ប្លង់​មុន​ពេល​សាងសង់​ពិត។"
          )}
        </strong>
      </p>

      {/* ── Sub-section A — Testing the Map Before the Territory ── */}
      <CADIntroCard kh={kh} t={t} />

      {/* ── Sub-section B — The Industry Tools (3-card grid) ── */}
      <IndustryToolsGrid kh={kh} t={t} />

      {/* ── Sub-section C — Try it Yourself (resource links) ── */}
      <TryItYourselfBox kh={kh} t={t} />
    </section>
  );
}

// ── Sub-section A — CAD intro ────────────────────────────────────────────

function CADIntroCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <article
      className="relative rounded-2xl border-2 border-cyan-300 p-5 sm:p-7 shadow-sm mb-6"
      style={CARD_BG}
      data-testid="cad-intro-card"
    >
      <CornerMarks subtle />
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5">
          SUB-04.A
        </span>
        <MonitorCog className="w-5 h-5 text-cyan-700" />
        <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
          {t(
            "Testing the Map Before the Territory",
            "ការសាកល្បងប្លង់មុនពេលសាងសង់ពិត"
          )}
        </h3>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 items-start">
        <div>
          <p className={`text-sm sm:text-base text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Before a modern architect pours a single drop of concrete, the entire structure is built first inside a computer. Engineers load the model with virtual gravity, push virtual wind against the walls, and stack virtual furniture on every floor. The screen shows them — in seconds — exactly where the building would crack. That practice is called ",
              "មុន​ពេល​ស្ថាបត្យករ​សម័យ​ទំនើប​ចាក់​ស៊ីម៉ងត៍​សូម្បី​តែ​មួយ​ដំណក់ រចនាសម្ព័ន្ធ​ទាំង​មូល​ត្រូវ​បាន​សាងសង់​ជាមុន​នៅ​ខាង​ក្នុង​កុំព្យូទ័រ។ វិស្វករ​ដាក់​ទំនាញ​ផែនដី​និម្មិត​ទៅ​លើ​គំរូ រុញ​ខ្យល់​និម្មិត​ប្រឆាំង​ជញ្ជាំង ហើយ​ដាក់​គ្រឿង​សង្ហារិម​និម្មិត​នៅ​លើ​រាល់​ជាន់។ អេក្រង់​បង្ហាញ​ឱ្យ​ពួកគេ​ឃើញ​—​ក្នុង​រយៈពេល​ប៉ុន្មាន​វិនាទី​—​ច្បាស់​ៗ​ថា​អគារ​នឹង​ប្រេះ​នៅ​ត្រង់​ណា។ ការ​អនុវត្ត​នេះ​ហៅ​ថា "
            )}
            <strong className={`text-cyan-800 ${kh ? "font-khmer" : ""}`}>
              {t(
                "Computer-Aided Design (CAD).",
                "ការ​រចនា​ដោយ​ជំនួយ​កុំព្យូទ័រ (CAD)។"
              )}
            </strong>
          </p>

          <p className={`text-sm sm:text-base text-slate-800 mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The point is not to draw pretty pictures. The point is to find the weak point first — on a screen, where fixing it costs nothing — instead of after the building has cracked, where fixing it might cost lives.",
              "គោលដៅ​មិនមែន​ជា​ការ​គូរ​រូបភាព​ស្អាត​ទេ។ គោលដៅ​គឺ​ការ​រក​ឃើញ​ចំណុច​ខ្សោយ​ជាមុន — នៅ​លើ​អេក្រង់ ដែល​ការ​ជួសជុល​មិន​ត្រូវការ​អ្វី​ឡើយ — ជំនួស​ឱ្យ​ការ​រក​ឃើញ​បន្ទាប់​ពី​អគារ​ប្រេះ​ស្រាប់ ដែល​ការ​ជួសជុល​អាច​នឹង​បង់​ជីវិត។"
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            <VocabChip color="cyan" en="CAD" kh="CAD" k={kh} />
            <VocabChip color="amber" en="Stress Test" kh="ការសាកល្បងសម្ពាធ" k={kh} />
            <VocabChip color="rose" en="Simulation" kh="ការក្លែងធ្វើ" k={kh} />
            <VocabChip color="emerald" en="Digital Twin" kh="កូនភ្លោះឌីជីថល" k={kh} />
          </div>
        </div>

        {/* Mini visual: laptop screen showing a CAD wireframe + heat-map */}
        <div
          className="rounded-xl bg-slate-900 p-4 text-slate-100"
          data-testid="cad-intro-diagram"
        >
          <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("CAD WORKBENCH · STRESS HEATMAP", "បន្ទប់​ការងារ CAD · ផែនទី​សម្ពាធ")}
          </div>
          <CADHeatmapDiagram kh={kh} />
          <div className={`mt-2 text-center text-[11px] text-slate-400 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
            {t(
              "Red = where the model would fail",
              "ក្រហម = ត្រង់​កន្លែង​ដែល​គំរូ​នឹង​បរាជ័យ"
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// SVG: a stylised laptop screen showing a steel-beam wireframe with a
// red "stress hotspot" highlighted at the centre — the exact moment a
// CAD package warns the engineer about a failure point.
function CADHeatmapDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 280 160"
      className="w-full h-auto"
      role="img"
      aria-label={
        kh
          ? "គំនូរ​អេក្រង់ CAD បង្ហាញ​ធ្នឹម​ដែក​ដែល​ជាប់​ការ​សាកល្បង​សម្ពាធ ហើយ​មាន​ចំណុច​ក្រហម​នៅ​កណ្ដាល"
          : "Diagram of a CAD screen showing a steel beam under a stress test, with a red hotspot at the centre"
      }
    >
      <title>{kh ? "CAD · ផែនទី​សម្ពាធ" : "CAD · stress heatmap"}</title>

      {/* Laptop screen frame */}
      <rect x="14" y="10" width="252" height="120" rx="6" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.2" />
      {/* Laptop base */}
      <rect x="6" y="132" width="268" height="6" rx="2" fill="#1e293b" stroke="#22d3ee" strokeWidth="1" />
      <rect x="120" y="138" width="40" height="3" rx="1" fill="#0b1220" />

      {/* Grid background inside screen */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 20}
          y1="14"
          x2={20 + i * 20}
          y2="126"
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="18"
          y1={22 + i * 18}
          x2="262"
          y2={22 + i * 18}
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="0.6"
        />
      ))}

      {/* Beam — a horizontal I-shape supported on two pin supports */}
      <rect x="40" y="62" width="200" height="14" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
      {/* I-beam top + bottom flanges (suggestion only) */}
      <rect x="40" y="58" width="200" height="4" fill="#cbd5e1" />
      <rect x="40" y="76" width="200" height="4" fill="#cbd5e1" />

      {/* Supports — triangles */}
      <polygon points="40,86 30,98 50,98" fill="#cbd5e1" />
      <polygon points="240,86 230,98 250,98" fill="#cbd5e1" />
      {/* hatching under supports */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line
            x1={30 + i * 5}
            y1="98"
            x2={25 + i * 5}
            y2="105"
            stroke="#cbd5e1"
            strokeWidth="0.6"
          />
          <line
            x1={230 + i * 5}
            y1="98"
            x2={225 + i * 5}
            y2="105"
            stroke="#cbd5e1"
            strokeWidth="0.6"
          />
        </g>
      ))}

      {/* Virtual load arrows pressing down on the beam */}
      {[80, 110, 140, 170, 200].map((x) => (
        <g key={x} stroke="#f43f5e" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <line x1={x} y1="32" x2={x} y2="56" />
          <path d={`M ${x - 4} 50 L ${x} 58 L ${x + 4} 50`} />
        </g>
      ))}

      {/* RED STRESS HOTSPOT — glowing radial in the centre of the beam */}
      <defs>
        <radialGradient id="cad-hot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="69" r="22" fill="url(#cad-hot)" />
      <circle cx="140" cy="69" r="3.2" fill="#fff" stroke="#f43f5e" strokeWidth="1.4" />

      {/* Hotspot label */}
      <text
        x="140"
        y="118"
        fontSize="8"
        fill="#fda4af"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
      >
        FAIL · σ_max
      </text>
      <text
        x="140"
        y="127"
        fontSize="7.5"
        fill="#fda4af"
        textAnchor="middle"
        fontFamily="Hanuman, 'Noto Sans Khmer', serif"
      >
        ចំណុចបរាជ័យ
      </text>

      {/* HUD label top-left */}
      <text x="22" y="22" fontSize="7" fill="#22d3ee" fontFamily="ui-monospace, monospace">
        FEA · σ &gt; σ_yield
      </text>
    </svg>
  );
}

// ── Sub-section B — The Industry Tools (3-card grid) ────────────────────

function IndustryToolsGrid({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <div className="mb-6">
      {/* Sub-section header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5">
          SUB-04.B
        </span>
        <Cpu className="w-5 h-5 text-cyan-700" />
        <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
          {t("The Industry Tools", "ឧបករណ៍ក្នុងឧស្សាហកម្ម")}
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <SoftwareCard
          testId="card-cad-software-solidworks"
          spec="SW-01"
          accent="rose"
          icon={Box}
          enName="SolidWorks & AutoCAD"
          khName="សូលីដវើក និង អូតូកាត"
          enTagline="The Industry Standard"
          khTagline="ស្តង់ដារ​ក្នុង​ឧស្សាហកម្ម"
          enUseCase="Heavy engineering — machines, bridges, and steel skyscrapers"
          khUseCase="វិស្វកម្ម​ធុន​ធ្ងន់ — ម៉ាស៊ីន ស្ពាន និង​អគារ​ដែក​ខ្ពស់"
          en={
            <>
              The standard tools used by professional mechanical and civil
              engineers worldwide. Their killer feature is the{" "}
              <strong className="text-rose-700">Stress Test</strong> (formally{" "}
              <em>FEA — Finite Element Analysis</em>): the engineer drops virtual
              weight onto a steel beam, and the screen flashes{" "}
              <strong className="text-rose-700">red</strong> exactly where the
              metal would bend or snap. The bridge gets fixed{" "}
              <em>inside the laptop</em> before a single rivet is bought.
            </>
          }
          kh={
            <>
              ​ឧបករណ៍​ស្តង់ដារ​ដែល​វិស្វករ​មេកានិច និង​សំណង់​អាជីព​នៅ​ទូទាំង​ពិភពលោក​ប្រើ​ប្រាស់។ លក្ខណៈ​ពិសេស​សំខាន់​របស់​វា​គឺ <strong className="text-rose-700">ការ​សាកល្បង​សម្ពាធ</strong> (ឈ្មោះ​ផ្លូវ​ការ <em>FEA — ការ​វិភាគ​ធាតុ​មាន​កំណត់</em>) ៖ វិស្វករ​ដាក់​ទម្ងន់​និម្មិត​ទៅ​លើ​ធ្នឹម​ដែក ហើយ​អេក្រង់​នឹង​ភ្លឺ​ពណ៌ <strong className="text-rose-700">ក្រហម</strong> ​នៅ​ត្រង់​កន្លែង​ដែល​ដែក​នឹង​បត់​ឬ​បាក់។ ស្ពាន​នោះ​ត្រូវ​បាន​ជួសជុល <em>នៅ​ក្នុង​កុំព្យូទ័រ</em> មុន​ពេល​ទិញ​គ្រាប់​ដែក​សូម្បី​តែ​មួយ​ផង។
            </>
          }
          chips={[
            { en: "FEA", kh: "FEA", color: "rose" },
            { en: "CAM", kh: "CAM", color: "amber" },
            { en: "2D + 3D", kh: "2D + 3D", color: "cyan" },
          ]}
          kh_={kh}
        />

        <SoftwareCard
          testId="card-cad-software-sketchup"
          spec="SW-02"
          accent="emerald"
          icon={PenTool}
          enName="SketchUp"
          khName="ស្កេតអាប់"
          enTagline="The Accessible 3D Modeller"
          khTagline="ឧបករណ៍​គំរូ 3D ដែល​ងាយ​ប្រើ"
          enUseCase="Homes, small buildings, interior design, school projects"
          khUseCase="ផ្ទះ អគារ​តូចៗ ការ​រចនា​ខាង​ក្នុង គម្រោង​សិក្សា"
          en={
            <>
              The most accessible 3D modelling tool on the planet — easy enough
              that a student can learn the basics in an afternoon, yet powerful
              enough that real architects use it to design real homes and small
              commercial buildings. Best of all, there is a{" "}
              <strong className="text-emerald-700">free browser version</strong>{" "}
              ({" "}
              <span className="font-mono text-[12px]">SketchUp Free</span> ) that
              runs on any standard school computer — no installation needed.
            </>
          }
          kh={
            <>
              ឧបករណ៍​គំរូ 3D ដែល​ងាយ​យល់​បំផុត​នៅ​លើ​ភព​ផែនដី — ងាយ​ស្រួល​រហូត​ដល់​សិស្ស​អាច​រៀន​មូលដ្ឋាន​បាន​ក្នុង​ពេល​មួយ​រសៀល តែ​មាន​កម្លាំង​គ្រប់គ្រាន់​ដែល​ស្ថាបត្យករ​ពិត​ប្រើ​ដើម្បី​រចនា​ផ្ទះ​ពិតៗ និង​អគារ​ពាណិជ្ជកម្ម​តូចៗ។ ការ​សំខាន់​បំផុត គឺ​មាន <strong className="text-emerald-700">កំណែ​ឥត​គិត​ថ្លៃ​នៅ​លើ​កម្មវិធី​រុករក</strong> ( <span className="font-mono text-[12px]">SketchUp Free</span> ) ដែល​ដំណើរការ​នៅ​លើ​កុំព្យូទ័រ​សាលា​ធម្មតា — ដោយ​មិន​ត្រូវ​ការ​ដំឡើង​អ្វី​ឡើយ។
            </>
          }
          chips={[
            { en: "Free Tier", kh: "ឥតគិតថ្លៃ", color: "emerald" },
            { en: "Browser", kh: "កម្មវិធីរុករក", color: "cyan" },
            { en: "Beginner", kh: "សម្រាប់អ្នកចាប់ផ្ដើម", color: "amber" },
          ]}
          kh_={kh}
        />

        <SoftwareCard
          testId="card-cad-software-revit"
          spec="SW-03"
          accent="cyan"
          icon={Boxes}
          enName="Revit / BIM"
          khName="កម្មវិធីកសាងគំរូព័ត៌មានអគារ"
          enTagline="The Living Digital Twin"
          khTagline="កូន​ភ្លោះ​ឌីជីថល​រស់​រវើក"
          enUseCase="Skyscrapers, hospitals, airports — buildings with thousands of pipes and wires"
          khUseCase="អគារ​ខ្ពស់ មន្ទីរពេទ្យ ព្រលាន​យន្តហោះ — អគារ​ដែល​មាន​បំពង់ និង​ខ្សែ​ភ្លើង​រាប់​ពាន់"
          en={
            <>
              Revit doesn't just draw walls. It builds a{" "}
              <strong className="text-cyan-800">
                Building Information Model (BIM)
              </strong>{" "}
              — a single living digital twin of the whole skyscraper that tracks{" "}
              <em>every</em> electrical wire, plumbing pipe, air-conditioning
              vent, and structural beam. Move a window two metres in the model
              and every drawing, cost estimate, and contractor's worksheet
              updates automatically. Mistakes that used to be discovered on the
              28th floor are now caught before lunch.
            </>
          }
          kh={
            <>
              Revit មិន​គ្រាន់​តែ​គូរ​ជញ្ជាំង​ទេ។ វា​សាងសង់ <strong className="text-cyan-800">គំរូ​ព័ត៌មាន​អគារ (BIM)</strong> — កូន​ភ្លោះ​ឌីជីថល​រស់​រវើក​តែ​មួយ​នៃ​អគារ​ខ្ពស់​ទាំង​មូល ដែល​តាមដាន <em>រាល់</em> ​ខ្សែ​ភ្លើង បំពង់​ទឹក បំពង់​ខ្យល់​ម៉ាស៊ីន​ត្រជាក់ និង​ធ្នឹម​រចនាសម្ព័ន្ធ​នីមួយៗ។ ផ្លាស់ប្ដូរ​បង្អួច​មួយ​ចម្ងាយ ២ ម៉ែត្រ​នៅ​ក្នុង​គំរូ ហើយ​រាល់​គំនូរ ការ​ប៉ាន់​ស្មាន​តម្លៃ និង​សន្លឹក​ការងារ​របស់​អ្នក​ម៉ៅ​ការ​នឹង​ធ្វើ​បច្ចុប្បន្នភាព​ដោយ​ស្វ័យ​ប្រវត្តិ។ កំហុស​ដែល​ពី​មុន​ត្រូវ​ឃើញ​នៅ​ជាន់​ទី ២៨ ឥឡូវ​ត្រូវ​បាន​ចាប់​មុន​ពេល​អាហារ​ថ្ងៃ​ត្រង់។
            </>
          }
          chips={[
            { en: "BIM", kh: "BIM", color: "cyan" },
            { en: "Coordination", kh: "ការសម្របសម្រួល", color: "emerald" },
            { en: "Pro Tier", kh: "កម្រិតអាជីព", color: "rose" },
          ]}
          kh_={kh}
        />
      </div>
    </div>
  );
}

// Generic software profile card — same blueprint chassis, recoloured.
type ChipColor = "rose" | "amber" | "cyan" | "emerald";

function SoftwareCard({
  testId,
  spec,
  accent,
  icon: Icon,
  enName,
  khName,
  enTagline,
  khTagline,
  enUseCase,
  khUseCase,
  en,
  kh,
  chips,
  kh_,
}: {
  testId: string;
  spec: string;
  accent: ChipColor;
  icon: React.ComponentType<{ className?: string }>;
  enName: string;
  khName: string;
  enTagline: string;
  khTagline: string;
  enUseCase: string;
  khUseCase: string;
  en: React.ReactNode;
  kh: React.ReactNode;
  chips: { en: string; kh: string; color: ChipColor }[];
  kh_: boolean;
}) {
  const accentMap: Record<ChipColor, { border: string; titleText: string; iconBg: string; iconText: string; iconBorder: string; specBg: string; specText: string; specBorder: string; useCaseBg: string; useCaseBorder: string; useCaseText: string }> = {
    rose: {
      border: "border-rose-300",
      titleText: "text-rose-900",
      iconBg: "bg-rose-50",
      iconText: "text-rose-700",
      iconBorder: "border-rose-300",
      specBg: "bg-rose-50",
      specText: "text-rose-800",
      specBorder: "border-rose-300",
      useCaseBg: "bg-rose-50/60",
      useCaseBorder: "border-rose-200",
      useCaseText: "text-rose-900",
    },
    amber: {
      border: "border-amber-300",
      titleText: "text-amber-900",
      iconBg: "bg-amber-50",
      iconText: "text-amber-700",
      iconBorder: "border-amber-300",
      specBg: "bg-amber-50",
      specText: "text-amber-800",
      specBorder: "border-amber-300",
      useCaseBg: "bg-amber-50/60",
      useCaseBorder: "border-amber-200",
      useCaseText: "text-amber-900",
    },
    cyan: {
      border: "border-cyan-300",
      titleText: "text-cyan-900",
      iconBg: "bg-cyan-50",
      iconText: "text-cyan-700",
      iconBorder: "border-cyan-300",
      specBg: "bg-cyan-50",
      specText: "text-cyan-800",
      specBorder: "border-cyan-300",
      useCaseBg: "bg-cyan-50/60",
      useCaseBorder: "border-cyan-200",
      useCaseText: "text-cyan-900",
    },
    emerald: {
      border: "border-emerald-300",
      titleText: "text-emerald-900",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-700",
      iconBorder: "border-emerald-300",
      specBg: "bg-emerald-50",
      specText: "text-emerald-800",
      specBorder: "border-emerald-300",
      useCaseBg: "bg-emerald-50/60",
      useCaseBorder: "border-emerald-200",
      useCaseText: "text-emerald-900",
    },
  };
  const c = accentMap[accent];

  return (
    <article
      className={`relative rounded-2xl border-2 ${c.border} p-5 shadow-sm flex flex-col`}
      style={CARD_BG}
      data-testid={testId}
    >
      <CornerMarks subtle />

      {/* Header — icon + spec + BILINGUAL name */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl ${c.iconBg} ${c.iconText} border-2 ${c.iconBorder} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`inline-block self-start font-mono text-[10px] tracking-[0.25em] uppercase ${c.specText} ${c.specBg} border ${c.specBorder} rounded px-2 py-0.5 mb-1`}>
            {spec}
          </span>
          <h4 className={`text-base sm:text-lg font-bold ${c.titleText} leading-tight`}>
            {enName}
          </h4>
          <h4 className={`text-sm sm:text-base font-bold ${c.titleText} leading-snug font-khmer mt-0.5`}>
            {khName}
          </h4>
        </div>
      </div>

      {/* Tagline — BOTH languages */}
      <p className="text-sm font-semibold text-slate-700">{enTagline}</p>
      <p className="text-sm font-semibold text-slate-700 font-khmer leading-loose mb-2">{khTagline}</p>

      {/* Use-case strip — BOTH languages */}
      <div className={`rounded-lg border ${c.useCaseBorder} ${c.useCaseBg} px-3 py-2 mb-3`}>
        <div className={`text-[10px] font-mono uppercase tracking-widest ${c.useCaseText} opacity-70 mb-0.5`}>
          USE CASE · ការប្រើប្រាស់
        </div>
        <div className={`text-xs sm:text-sm ${c.useCaseText} leading-snug`}>{enUseCase}</div>
        <div className={`text-xs sm:text-sm ${c.useCaseText} font-khmer leading-loose`}>{khUseCase}</div>
      </div>

      {/* Body — render BOTH languages, one per <p> */}
      <p className="text-sm text-slate-800 leading-relaxed mb-2">{en}</p>
      <p className="text-sm text-slate-800 font-khmer leading-loose mb-3">{kh}</p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {chips.map((ch, i) => (
          <VocabChip key={i} color={ch.color} en={ch.en} kh={ch.kh} k={kh_} />
        ))}
      </div>
    </article>
  );
}

// ── Sub-section C — Try it Yourself (resource links box) ─────────────────

function TryItYourselfBox({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <div
      className="relative rounded-2xl border-2 border-cyan-400 p-5 sm:p-6 shadow-sm"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34, 211, 238, 0.06) 1px, transparent 1px), " +
          "linear-gradient(90deg, rgba(34, 211, 238, 0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundColor: "#ecfeff",
      }}
      data-testid="resource-links-box"
    >
      <CornerMarks />

      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5">
          SUB-04.C
        </span>
        <Lightbulb className="w-5 h-5 text-cyan-700" />
        <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
          {t("Try it Yourself", "សាកល្បងដោយខ្លួនឯង")}
        </h3>
      </div>

      <p className={`text-sm sm:text-base text-slate-800 mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "You don't need an engineer's licence — or even an installed program — to start designing in 3D today. Open one of these free, browser-based tools on a standard school computer and start building:",
          "អ្នក​មិន​ត្រូវ​ការ​សញ្ញាបត្រ​វិស្វករ — ឬ​សូម្បី​តែ​កម្មវិធី​ដែល​បាន​ដំឡើង — ដើម្បី​ចាប់​ផ្ដើម​រចនា 3D ​ថ្ងៃ​នេះ​ឡើយ។ បើក​ឧបករណ៍​ឥត​គិត​ថ្លៃ​មួយ​ក្នុង​ចំណោម​នេះ ដែល​ដំណើរការ​ក្នុង​កម្មវិធី​រុករក នៅ​លើ​កុំព្យូទ័រ​សាលា​ធម្មតា ហើយ​ចាប់​ផ្ដើម​សាងសង់ ៖"
        )}
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <ResourceLink
          testId="resource-tinkercad"
          href="https://www.tinkercad.com/"
          enName="Tinkercad"
          khName="ធីនខឺខាត"
          enDesc="Drag-and-drop 3D blocks. The friendliest way to learn 3D modelling — perfect for first-time students and classroom projects."
          khDesc="ដាក់​ដុំ 3D ដោយ​អូស​ហើយ​ដាក់។ វិធី​រៀន​គំរូ 3D ដ៏​រួសរាយ​បំផុត — ល្អ​ឥត​ខ្ចោះ​សម្រាប់​សិស្ស​លើក​ទី​មួយ និង​គម្រោង​ក្នុង​ថ្នាក់។"
          kh_={kh}
        />

        <ResourceLink
          testId="resource-sketchup-free"
          href="https://www.sketchup.com/plans-and-pricing/sketchup-free"
          enName="SketchUp Free"
          khName="ស្កេតអាប់ ឥតគិតថ្លៃ"
          enDesc="A trimmed-down browser version of the full SketchUp app. Design a real house, save it to the cloud, and revisit it from any computer."
          khDesc="កំណែ​នៅ​លើ​កម្មវិធី​រុករក​នៃ​កម្មវិធី SketchUp ​ពេញ​លេញ។ រចនា​ផ្ទះ​ពិត​មួយ រក្សា​ទុក​នៅ​លើ Cloud ហើយ​ត្រឡប់​មក​មើល​ឡើង​វិញ​ពី​កុំព្យូទ័រ​ណា​មួយ​ក៏​បាន។"
          kh_={kh}
        />

        <ResourceLink
          testId="resource-onshape"
          href="https://www.onshape.com/en/products/free"
          enName="Onshape (Free for Hobbyists)"
          khName="Onshape (ឥតគិតថ្លៃ​សម្រាប់​អ្នកចំណង់​ចំណូល​ចិត្ត)"
          enDesc="Pro-grade mechanical CAD that runs entirely in the browser. The same kind of tool real engineers use, with a free tier for students."
          khDesc="កម្មវិធី CAD មេកានិច​កម្រិត​អាជីព​ដែល​ដំណើរការ​ទាំង​ស្រុង​ក្នុង​កម្មវិធី​រុករក។ ឧបករណ៍​ប្រភេទ​ដូច​គ្នា​ដែល​វិស្វករ​ពិត​ប្រើ​ប្រាស់ ដោយ​មាន​កម្រិត​ឥត​គិត​ថ្លៃ​សម្រាប់​សិស្ស។"
          kh_={kh}
        />

        <ResourceLink
          testId="resource-autodesk-edu"
          href="https://www.autodesk.com/education/edu-software/overview"
          enName="Autodesk for Education"
          khName="Autodesk សម្រាប់ការសិក្សា"
          enDesc="Full free licences for AutoCAD, Revit, Fusion 360 and more — for any verified student or teacher. Same software the professionals use."
          khDesc="អាជ្ញាបណ្ណ​ឥត​គិត​ថ្លៃ​ពេញ​លេញ​សម្រាប់ AutoCAD, Revit, Fusion 360 និង​ច្រើន​ទៀត — សម្រាប់​សិស្ស​ឬ​គ្រូ​ដែល​បាន​ផ្ទៀង​ផ្ទាត់​ណា​ម្នាក់។ ​កម្មវិធី​ដូច​គ្នា​ដែល​អ្នក​អាជីព​ប្រើ​ប្រាស់។"
          kh_={kh}
        />
      </div>

      {/* Footnote */}
      <p
        className={`mt-4 text-xs text-slate-600 italic ${kh ? "font-khmer leading-loose not-italic" : "leading-relaxed"}`}
      >
        {t(
          "All four links open in a new tab. None require a credit card to begin.",
          "តំណ​ទាំង​បួន​នឹង​បើក​នៅ​ផ្ទាំង​ថ្មី។ គ្មាន​មួយ​ណា​ត្រូវ​ការ​កាត​ឥណទាន​ដើម្បី​ចាប់​ផ្ដើម​ឡើយ។"
        )}
      </p>
    </div>
  );
}

function ResourceLink({
  testId,
  href,
  enName,
  khName,
  enDesc,
  khDesc,
}: {
  testId: string;
  href: string;
  enName: string;
  khName: string;
  enDesc: string;
  khDesc: string;
  kh_?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className="group block rounded-xl border-2 border-slate-300 bg-white p-3 hover:border-cyan-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          {/* Names — BOTH languages stacked */}
          <div className="text-sm font-bold text-slate-900 group-hover:text-cyan-800 leading-tight">
            {enName}
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-cyan-700 font-khmer leading-snug">
            {khName}
          </div>
          {/* Descriptions — BOTH languages stacked */}
          <div className="text-xs text-slate-600 mt-1.5 leading-snug">{enDesc}</div>
          <div className="text-xs text-slate-600 mt-1 font-khmer leading-loose">{khDesc}</div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 flex-shrink-0 mt-0.5" />
      </div>
      <div className="mt-2 truncate text-[10px] font-mono text-cyan-700 opacity-80 group-hover:opacity-100">
        {href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </div>
    </a>
  );
}
