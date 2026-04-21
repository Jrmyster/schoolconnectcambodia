import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Ruler,
  Microscope,
  Hand,
  Lightbulb,
  AlertTriangle,
  Cpu,
  Zap,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  NANO-01 · Nanotechnology: Building from the Atom Up
//            បច្ចេកវិទ្យាណាណូ៖ ការស្ថាបនាពីអាតូមឡើងលើ
//
//  1. The Scale of "Nano"          — 1 nm = 10⁻⁹ m, paper vs DNA
//  2. The Electron Microscope      — why light fails, how electrons win
//  3. The Atomic Force Microscope  — feel atoms, push atoms, build atoms
//
//  Aesthetic: cleanroom — stark whites, metallic silvers, laser-grid greens.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f4f6f7", // cleanroom white
  backgroundImage:
    "linear-gradient(rgba(16, 185, 129, 0.10) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(16, 185, 129, 0.10) 1px, transparent 1px)," +
    "linear-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.05) 1px, transparent 1px)",
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
};

const SILVER_BORDER = "border-slate-300";
const LASER = "#10b981";

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-emerald-400/60" : "border-emerald-500/80";
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

export function NanotechnologyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-950 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-xl border-2 border-emerald-400/30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.22), transparent 55%)," +
              "linear-gradient(rgba(16, 185, 129, 0.10) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(16, 185, 129, 0.10) 1px, transparent 1px)",
            backgroundSize: "auto, 28px 28px, 28px 28px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-300/60 text-emerald-100 flex items-center justify-center flex-shrink-0">
              <Atom className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Cpu className="w-3.5 h-3.5" />
                <span>{t("Technology", "បច្ចេកវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-emerald-100">NANO-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Nanotechnology: Building from the Atom Up",
                  "បច្ចេកវិទ្យាណាណូ៖ ការស្ថាបនាពីអាតូមឡើងលើ"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-200/85 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Most engineering shapes the world by carving big things into smaller pieces. Nanotechnology does the opposite: it picks up single atoms and stacks them, the way a child stacks bricks — building matter itself, one atom at a time.",
                  "វិស្វកម្មភាគច្រើនកែច្នៃពិភពលោកដោយឆ្លាក់វត្ថុធំៗឱ្យក្លាយជាបំណែកតូចៗ។ បច្ចេកវិទ្យាណាណូធ្វើផ្ទុយ ៖ វាលើកអាតូមតែមួយ ហើយដាក់ត្រួតគ្នា ដូចក្មេងដាក់ឥដ្ឋ — ស្ថាបនាសារធាតុដោយខ្លួនវា មួយអាតូមម្ដងៗ។"
                )}
              </p>
            </div>
          </div>
        </header>

        <SectionScale kh={kh} t={t} />
        <SectionElectronMicroscope kh={kh} t={t} />
        <SectionAFM kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-emerald-400 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <Sparkles className="w-6 h-6 text-emerald-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Why it matters: ", "ហេតុអ្វីសំខាន់ ៖ ")}</strong>
            {t(
              "From cancer-targeting medicines that travel one cell at a time, to solar panels printed atom-by-atom, to batteries that hold ten times more charge — the next century of materials begins at the nanometer.",
              "ចាប់ពីឱសថព្យាបាលជំងឺមហារីកដែលធ្វើដំណើរម្ដងមួយកោសិកា រហូតដល់ផ្ទាំងពន្លឺព្រះអាទិត្យដែលបោះពុម្ពអាតូមម្ដងៗ និងថ្មដែលអាចផ្ទុកថាមពលច្រើនដប់ដង — សតវត្សបន្ទាប់នៃសម្ភារៈចាប់ផ្ដើមនៅណាណូម៉ែត្រ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-emerald-200 text-sm font-bold shadow hover:bg-slate-800 transition-colors ${kh ? "font-khmer" : ""}`}
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
//  Section 01 — The Scale of "Nano"
// ════════════════════════════════════════════════════════════════════════════

function SectionScale({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-scale">
      <SectionHeader spec="01" en={`The Scale of "Nano"`} kh="ទំហំនៃ ‘ណាណូ’" kh_={kh} />

      <div
        className={`relative rounded-2xl border-2 ${SILVER_BORDER} p-5 sm:p-7 shadow-sm`}
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A ", "មួយ "
              )}
              <strong className="text-emerald-800">{t("nanometer (nm)", "ណាណូម៉ែត្រ (nm)")}</strong>
              {t(
                " is one billionth of a metre — written ",
                " គឺមួយលានដងនៃមួយលាន (មួយប៊ីលាន) នៃមួយម៉ែត្រ — សរសេរ "
              )}
              <code className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[12px]">
                1 nm = 0.000 000 001 m = 10⁻⁹ m
              </code>
              {t(
                ". To put that in everyday terms, if a single nanometer were stretched to the size of one of these letters, then a one-metre ruler would stretch all the way around the equator of the Earth.",
                "។ បើនិយាយបែបធម្មតា ៖ ប្រសិនបើមួយណាណូម៉ែត្រត្រូវបានពង្រីកឱ្យធំស្មើនឹងអក្សរមួយតួនៅទីនេះ បន្ទាត់ប្រវែងមួយម៉ែត្រនឹងលាតវែងជុំវិញខ្សែអេក្វាទ័រនៃផែនដី។"
              )}
            </p>

            <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-4">
              <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("PHYSICAL COMPARISON", "ការប្រៀបធៀបរូបវន្ត")}
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    {t(
                      "A single sheet of writing paper is about ",
                      "ក្រដាសសរសេរមួយសន្លឹក មានកម្រាសប្រហែល "
                    )}
                    <strong className="text-emerald-900 font-mono tabular-nums">100,000 nm</strong>
                    {t(" thick.", " ។")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    {t(
                      "A single human hair is about ",
                      "សក់មនុស្សមួយសរសៃ មានទទឹងប្រហែល "
                    )}
                    <strong className="text-emerald-900 font-mono tabular-nums">80,000 nm</strong>
                    {t(" wide.", " ។")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    {t(
                      "A flu virus measures around ",
                      "មេរោគគ្រុនផ្ដាសាយ មានទំហំប្រហែល "
                    )}
                    <strong className="text-emerald-900 font-mono tabular-nums">100 nm</strong>
                    {t(" across.", " ។")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    {t(
                      "A strand of human DNA is only ",
                      "ខ្សែ DNA មនុស្សមួយ មានទទឹងត្រឹមតែ "
                    )}
                    <strong className="text-emerald-900 font-mono tabular-nums">2.5 nm</strong>
                    {t(" wide!", " ប៉ុណ្ណោះ!")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Scale ladder diagram */}
          <ScaleLadder kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

function ScaleLadder({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // log-spaced rows top→bottom, big to small
  const rows = [
    { en: "Tennis ball",  kh: "បាល់តិននីស",        nm: "70,000,000 nm",  cls: "bg-slate-50  border-slate-300" },
    { en: "Paper sheet",  kh: "ក្រដាសមួយសន្លឹក",   nm: "100,000 nm",     cls: "bg-emerald-50/40 border-emerald-300" },
    { en: "Human hair",   kh: "សក់មនុស្ស",         nm: "80,000 nm",      cls: "bg-emerald-50/60 border-emerald-300" },
    { en: "Red blood cell",kh: "កោសិកាឈាមក្រហម",   nm: "7,000 nm",       cls: "bg-emerald-50/80 border-emerald-400" },
    { en: "Flu virus",    kh: "មេរោគគ្រុនផ្ដាសាយ", nm: "100 nm",         cls: "bg-emerald-100  border-emerald-500" },
    { en: "DNA strand",   kh: "ខ្សែ DNA",           nm: "2.5 nm",         cls: "bg-emerald-200  border-emerald-600" },
    { en: "Single atom",  kh: "អាតូមមួយ",          nm: "0.1 nm",         cls: "bg-emerald-300  border-emerald-700" },
  ];
  return (
    <div
      className="rounded-xl bg-slate-950 text-emerald-50 p-4 border-2 border-emerald-400/40"
      role="img"
      aria-label={t(
        "Scale ladder: tennis ball at 70,000,000 nanometres, paper sheet 100,000, human hair 80,000, red blood cell 7,000, flu virus 100, DNA strand 2.5, single atom 0.1 nanometres",
        "ជណ្ដើររង្វាស់ ៖ បាល់តិននីស 70,000,000 ណាណូម៉ែត្រ ក្រដាសសន្លឹក 100,000 សក់មនុស្ស 80,000 កោសិកាឈាមក្រហម 7,000 មេរោគគ្រុនផ្ដាសាយ 100 ខ្សែ DNA 2.5 អាតូមមួយ 0.1 ណាណូម៉ែត្រ"
      )}
      data-testid="scale-ladder"
    >
      <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-300/90 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("SCALE · BIG → SMALL (LOG)", "រង្វាស់ · ធំ → តូច (លោការីត)")}
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.en}
            className={`flex items-center gap-3 rounded-md ${r.cls} text-slate-900 px-3 py-2 border`}
          >
            <span className={`flex-1 text-xs font-semibold ${kh ? "font-khmer" : ""}`}>
              {kh ? r.kh : r.en}
            </span>
            <span className="font-mono text-[11px] tabular-nums text-slate-700">{r.nm}</span>
          </li>
        ))}
      </ul>
      <div className={`mt-3 text-center text-[11px] text-emerald-300/80 ${kh ? "font-khmer leading-loose" : "font-mono"}`}>
        {t(
          "Each step down = roughly ÷10 in size",
          "រាល់ជំហានចុះ = ប្រហែល ÷10 ក្នុងទំហំ"
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Electron Microscope
// ════════════════════════════════════════════════════════════════════════════

function SectionElectronMicroscope({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-em">
      <SectionHeader spec="02" en="The Electron Microscope" kh="មីក្រូទស្សន៍អេឡិចត្រុង" kh_={kh} />

      <div
        className={`relative rounded-2xl border-2 ${SILVER_BORDER} p-5 sm:p-7 shadow-sm`}
        style={CARD_BG}
      >
        <CornerMarks subtle />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-3 mb-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className={`text-sm font-bold text-orange-900 mb-0.5 ${kh ? "font-khmer" : ""}`}>
                  {t("The problem with light", "បញ្ហាជាមួយពន្លឺ")}
                </div>
                <p className={`text-sm text-orange-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "A regular light microscope cannot see atoms because a wave of visible light is itself bigger than the things you are trying to see. Visible light is roughly 400–700 nm long; an atom is about 0.1 nm. Asking light to picture an atom is like trying to feel a single grain of sand using a giant beach ball.",
                    "មីក្រូទស្សន៍ពន្លឺធម្មតាមិនអាចមើលឃើញអាតូមបានទេ ព្រោះរលកនៃពន្លឺមើលឃើញខ្លួនវាធំជាងវត្ថុដែលអ្នកព្យាយាមមើលនោះ។ ពន្លឺមើលឃើញវែងប្រហែល 400–700 nm អាតូមធំប្រហែល 0.1 nm។ ការសុំពន្លឺថតរូបអាតូម គឺដូចជាការព្យាយាមស្ទាបគ្រាប់ខ្សាច់មួយ ដោយប្រើបាល់ឆ្នេរយក្ស។"
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-3 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <div className={`text-sm font-bold text-emerald-900 mb-0.5 ${kh ? "font-khmer" : ""}`}>
                  {t("The solution: electrons", "ដំណោះស្រាយ ៖ អេឡិចត្រុង")}
                </div>
                <p className={`text-sm text-emerald-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "Instead of shooting light, an Electron Microscope shoots a focused beam of tiny electrons at the sample. Because electrons act like waves about 100,000 times shorter than visible light, they can bounce off viral proteins, crystal lattices, and the surfaces of cells. A detector counts the bounces and a computer paints a sharp black-and-white 3D map of the microscopic world.",
                    "ជំនួសឱ្យការបាញ់ពន្លឺ មីក្រូទស្សន៍អេឡិចត្រុងបាញ់ធ្នូផ្ដោតនៃអេឡិចត្រុងតូចៗទៅលើគំរូ។ ដោយសារអេឡិចត្រុងធ្វើអំពើដូចរលកដែលខ្លីជាងពន្លឺមើលឃើញ ប្រហែល 100,000 ដង វាអាចស្ទុះត្រឡប់ពីប្រូតេអ៊ីនមេរោគ ផ្ទៃក្រឡាគ្រីស្តាល់ និងផ្ទៃកោសិកា។ ឧបករណ៍ចាប់រាប់ការស្ទុះ ហើយកុំព្យូទ័រគូរផែនទី 3D ច្បាស់ខ្មៅ-ស ​នៃពិភពមីក្រូទស្សន៍។"
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2" data-testid="em-vocab">
              <VocabChip color="emerald" en="Electron beam" kh="ធ្នូអេឡិចត្រុង" k={kh} />
              <VocabChip color="slate"   en="Wavelength"    kh="ប្រវែងរលក"      k={kh} />
              <VocabChip color="indigo"  en="Detector"      kh="ឧបករណ៍ចាប់"     k={kh} />
              <VocabChip color="amber"   en="Vacuum chamber" kh="បន្ទប់សុញ្ញកាស" k={kh} />
            </div>
          </div>

          {/* SEM diagram */}
          <ElectronMicroscopeDiagram kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

function ElectronMicroscopeDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 360 320"
      className="w-full h-auto rounded-xl bg-slate-950 border-2 border-emerald-400/40"
      role="img"
      aria-label={t(
        "Diagram of an electron microscope: an electron gun at the top fires a beam down through magnetic lenses and a vacuum chamber, hitting a sample; bounced electrons are caught by a detector that feeds an image to a screen.",
        "តារាងមីក្រូទស្សន៍អេឡិចត្រុង ៖ កាំភ្លើងអេឡិចត្រុងនៅផ្នែកខាងលើបាញ់ធ្នូចុះក្រោម តាមរយៈកែវមេដែក និងបន្ទប់សុញ្ញកាស ប៉ះគំរូ អេឡិចត្រុងស្ទុះត្រូវបានចាប់ដោយឧបករណ៍ចាប់ ហើយបញ្ចូនរូបទៅអេក្រង់។"
      )}
      data-testid="em-diagram"
    >
      <title>{t("Electron Microscope schematic", "តារាងមីក្រូទស្សន៍អេឡិចត្រុង")}</title>

      {/* column outline */}
      <rect x="120" y="20" width="80" height="220" fill="none" stroke="#94a3b8" strokeWidth="1.4" rx="4" />
      <text x="160" y="14" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "បន្ទប់សុញ្ញកាស" : "VACUUM COLUMN"}
      </text>

      {/* electron gun */}
      <rect x="140" y="22" width="40" height="22" fill="#1f2937" stroke={LASER} strokeWidth="1.4" rx="3" />
      <text x="160" y="36" fontSize="9" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កាំភ្លើង" : "GUN"}
      </text>
      <text x="218" y="36" fontSize="8" fill="#94a3b8" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "(ប្រភពអេឡិចត្រុង)" : "(electron source)"}
      </text>

      {/* lenses */}
      <ellipse cx="160" cy="80"  rx="26" ry="6" fill="none" stroke="#a7f3d0" strokeWidth="1.4" />
      <ellipse cx="160" cy="120" rx="32" ry="7" fill="none" stroke="#a7f3d0" strokeWidth="1.4" />
      <text x="200" y="84"  fontSize="8" fill="#94a3b8" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "កែវមេដែក 1" : "LENS 1"}
      </text>
      <text x="200" y="124" fontSize="8" fill="#94a3b8" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "កែវមេដែក 2" : "LENS 2"}
      </text>

      {/* electron beam */}
      <line x1="160" y1="44" x2="160" y2="200" stroke={LASER} strokeWidth="2" strokeDasharray="2 3" />
      <circle cx="160" cy="58"  r="2" fill={LASER} />
      <circle cx="160" cy="100" r="2" fill={LASER} />
      <circle cx="160" cy="160" r="2" fill={LASER} />
      <circle cx="160" cy="190" r="2" fill={LASER} />
      <text x="100" y="100" fontSize="9" fill="#a7f3d0" fontFamily="monospace" textAnchor="end" className={kh ? "font-khmer" : ""}>
        {kh ? "ធ្នូអេឡិចត្រុង" : "e⁻ BEAM"}
      </text>

      {/* sample stage */}
      <rect x="130" y="200" width="60" height="6" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="160" cy="198" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
      <text x="200" y="204" fontSize="8" fill="#fcd34d" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "គំរូ" : "SAMPLE"}
      </text>

      {/* bounced electrons */}
      <path d="M160 196 L 110 170" fill="none" stroke={LASER} strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M160 196 L 215 165" fill="none" stroke={LASER} strokeWidth="1.2" strokeDasharray="2 2" />
      <text x="98" y="160" fontSize="8" fill="#a7f3d0" fontFamily="monospace" textAnchor="end" className={kh ? "font-khmer" : ""}>
        {kh ? "ស្ទុះត្រឡប់" : "BOUNCED"}
      </text>

      {/* detector */}
      <rect x="220" y="150" width="34" height="22" fill="#0f172a" stroke={LASER} strokeWidth="1.4" rx="2" />
      <text x="237" y="164" fontSize="8" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឧបករណ៍ចាប់" : "DETECTOR"}
      </text>

      {/* screen */}
      <rect x="40"  y="240" width="280" height="60" fill="#020617" stroke="#94a3b8" strokeWidth="1.4" rx="4" />
      <text x="50"  y="256" fontSize="8" fill="#94a3b8" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "អេក្រង់ ៖ រូបខ្មៅ–ស" : "SCREEN: B&W IMAGE"}
      </text>
      {/* fake B&W image — pixel grid */}
      <g>
        {Array.from({ length: 40 }).map((_, i) => {
          const x = 60 + (i % 20) * 12;
          const y = 268 + Math.floor(i / 20) * 14;
          const v = (i * 37) % 100;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="10"
              height="10"
              fill={`rgb(${v + 80},${v + 80},${v + 80})`}
            />
          );
        })}
      </g>

      {/* arrow detector → screen */}
      <path d="M237 174 Q 237 220 200 244" fill="none" stroke="#a7f3d0" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Atomic Force Microscope (AFM)
// ════════════════════════════════════════════════════════════════════════════

function SectionAFM({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-afm">
      <SectionHeader
        spec="03"
        en="The Atomic Force Microscope (AFM)"
        kh="មីក្រូទស្សន៍កម្លាំងអាតូម (AFM)"
        kh_={kh}
      />

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-5">
        <article
          className={`relative rounded-2xl border-2 ${SILVER_BORDER} p-5 shadow-sm`}
          style={CARD_BG}
          data-testid="afm-feel"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <Hand className="w-5 h-5 text-emerald-700" />
            <h3 className={`text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
              {t("It doesn't see — it FEELS", "វាមិនមើល — វា ស្ទាប")}
            </h3>
          </div>
          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "An AFM uses a microscopic needle on the end of a tiny springboard called a ", "AFM ប្រើម្ជុលមីក្រូទស្សន៍មួយនៅចុងបន្ទះស្ព្រិងតូចមួយ ដែលហៅថា "
            )}
            <strong className="text-emerald-800">{t("cantilever", "ខានទីលីវឺ")}</strong>
            {t(
              ". The very tip of that needle is sharpened down to just a few atoms across — and at the very end, often a single atom. The machine drags this needle across the surface like a record player's stylus across a vinyl groove. Every time it climbs over an atom, the springboard bends a tiny amount. A laser bouncing off the back of the cantilever measures that bending and the computer turns it into a height map showing the bumps of every individual atom.",
              "។ ចុងបំផុតនៃម្ជុលនោះត្រូវបានធ្វើឱ្យស្រួចត្រឹមប៉ុន្មានអាតូមប៉ុណ្ណោះ — ហើយនៅចុងបំផុត ជារឿយៗគឺអាតូមតែមួយ។ ម៉ាស៊ីនអូសម្ជុលនេះកាត់ផ្ទៃ ដូចម្ជុលម៉ាស៊ីនបាស់ឆ្លងកាត់ស្នាមនៅលើថាស vinyl។ រាល់ពេលដែលវាឡើងលើអាតូមមួយ បន្ទះស្ព្រិងបត់បន្តិច។ ឡាស៊ែរស្ទុះត្រឡប់ពីខាងក្រោយខានទីលីវឺ វាស់ការបត់នោះ ហើយកុំព្យូទ័របំលែងវាជាផែនទីកម្ពស់ ដែលបង្ហាញកំពូលនៃអាតូមនីមួយៗ។"
            )}
          </p>

          <AFMDiagram kh={kh} t={t} />
        </article>

        <article
          className="relative rounded-2xl border-2 border-emerald-500 p-5 shadow-sm bg-gradient-to-br from-emerald-50 to-white"
          data-testid="afm-build"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-emerald-700" />
            <h3 className={`text-lg font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
              {t("Atomic Assemblers — push, don't just read", "ឧបករណ៍ផ្គុំអាតូម — រុញ មិនមែនត្រឹមតែអាន")}
            </h3>
          </div>
          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The breakthrough is that scientists do not only read atoms with these needles — they can ", "ការរកឃើញដ៏សំខាន់គឺថា អ្នកវិទ្យាសាស្ត្រមិនត្រឹមតែអានអាតូមដោយម្ជុលទាំងនេះទេ — ពួកគេអាច "
            )}
            <strong className="text-emerald-900">{t("push them around.", "រុញវាបាន។")}</strong>
            {t(
              " By gently lowering an AFM tip — or its close cousin, the Scanning Tunneling Microscope (STM) — onto a single atom and dragging it sideways, a researcher can place that atom exactly where they want it on a surface. Tools like these are the first machines in human history that let us pick up matter and rebuild it ",
              " ដោយចុះម្ជុល AFM យឺតៗ — ឬអ្នកសាច់ញាតិជិតខាងរបស់វា គឺមីក្រូទស្សន៍ឆ្លងកាត់ស្កេន (STM) — ទៅលើអាតូមមួយ ហើយអូសវាទៅចំហៀង អ្នកស្រាវជ្រាវអាចដាក់អាតូមនោះត្រង់កន្លែងដែលគេចង់បាននៅលើផ្ទៃ។ ឧបករណ៍ប្រភេទនេះគឺជាម៉ាស៊ីនដំបូងគេក្នុងប្រវត្តិសាស្ត្រមនុស្ស ដែលអនុញ្ញាតឱ្យយើងលើកសារធាតុ ហើយស្ថាបនាវាឡើងវិញ "
            )}
            <em>{t("one atom at a time.", "មួយអាតូមម្ដងៗ។")}</em>
          </p>

          <div className="rounded-lg bg-white border border-emerald-300 p-3">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("HISTORIC FIRST · IBM, 1989", "ព្រឹត្តិការណ៍ដំបូងក្នុងប្រវត្តិសាស្ត្រ · IBM, 1989")}
            </div>
            <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Researcher Don Eigler at IBM used a Scanning Tunneling Microscope — the AFM's close cousin — to arrange 35 individual xenon atoms into the letters \"I-B-M\" on a nickel surface. It was the first time any human had written a word using single atoms.",
                "អ្នកស្រាវជ្រាវ Don Eigler នៅ IBM បានប្រើមីក្រូទស្សន៍ឆ្លងកាត់ស្កេន — សាច់ញាតិជិតរបស់ AFM — ដើម្បីរៀបចំអាតូម xenon 35 ឱ្យក្លាយជាអក្សរ «I-B-M» លើផ្ទៃនីកែល។ វាជាលើកដំបូងដែលមនុស្សណាម្នាក់បានសរសេរពាក្យដោយប្រើអាតូមតែមួយៗ។"
              )}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Stat label={t("Tip width", "ទទឹងចុង")}    value={t("≈ 1 atom", "≈ 1 អាតូម")} k={kh} />
            <Stat label={t("Resolution", "គុណភាព")}     value="0.1 nm" k={kh} />
            <Stat label={t("Built", "ស្ថាបនា")}         value={t("atom-by-atom", "អាតូម-ម្ដងៗ")} k={kh} />
          </div>
        </article>
      </div>
    </section>
  );
}

function AFMDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 380 200"
      className="w-full h-auto rounded-xl bg-slate-950 border-2 border-emerald-400/40 mt-1"
      role="img"
      aria-label={t(
        "AFM diagram: a laser fires onto the back of a small cantilever; a single-atom tip dangles from the cantilever and rides over a row of atoms on a surface, while a photodetector measures how the laser bounces.",
        "តារាង AFM ៖ ឡាស៊ែរបាញ់លើខាងក្រោយខានទីលីវឺតូចមួយ ចុងម្ជុលមួយអាតូមព្យួរពីខានទីលីវឺ ហើយដើរលើជួរអាតូមនៅលើផ្ទៃ ខណៈឧបករណ៍ចាប់រូបថតវាស់ការស្ទុះរបស់ឡាស៊ែរ។"
      )}
      data-testid="afm-diagram"
    >
      <title>{t("Atomic Force Microscope schematic", "តារាងមីក្រូទស្សន៍កម្លាំងអាតូម")}</title>

      {/* laser */}
      <rect x="20" y="20" width="50" height="20" fill="#1f2937" stroke={LASER} strokeWidth="1.4" rx="2" />
      <text x="45" y="34" fontSize="9" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឡាស៊ែរ" : "LASER"}
      </text>
      <line x1="70" y1="38" x2="180" y2="80" stroke={LASER} strokeWidth="1.4" strokeDasharray="3 2" />
      <line x1="180" y1="80" x2="320" y2="34" stroke={LASER} strokeWidth="1.4" strokeDasharray="3 2" />

      {/* photodetector */}
      <rect x="320" y="18" width="44" height="22" fill="#0f172a" stroke={LASER} strokeWidth="1.4" rx="2" />
      <text x="342" y="32" fontSize="8" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឧបករណ៍ចាប់" : "DETECTOR"}
      </text>

      {/* cantilever */}
      <path d="M150 84 L 220 84 L 230 88 L 220 92 L 150 92 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      <text x="150" y="78" fontSize="8" fill="#cbd5e1" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "ខានទីលីវឺ (ស្ព្រិង)" : "CANTILEVER (spring)"}
      </text>

      {/* tip */}
      <path d="M225 92 L 230 92 L 227.5 130 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.2" />
      <circle cx="227.5" cy="132" r="3" fill="#facc15" stroke="#f59e0b" strokeWidth="1" />
      <text x="245" y="120" fontSize="8" fill="#fde68a" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "ចុង = 1 អាតូម" : "TIP = 1 ATOM"}
      </text>

      {/* surface atoms — bumpy row */}
      <line x1="20" y1="170" x2="360" y2="170" stroke="#475569" strokeWidth="1" />
      {Array.from({ length: 14 }).map((_, i) => {
        const cx = 40 + i * 22;
        return (
          <circle
            key={i}
            cx={cx}
            cy="160"
            r="8"
            fill={i === 9 ? "#fbbf24" : "#64748b"}
            stroke={i === 9 ? "#f59e0b" : "#94a3b8"}
            strokeWidth="1"
          />
        );
      })}
      <text x="40" y="190" fontSize="8" fill="#cbd5e1" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្ទៃរូបធាតុ ៖ ជួរអាតូម" : "SURFACE: ROW OF ATOMS"}
      </text>

      {/* drag arrow */}
      <path d="M70 145 L 240 145" stroke="#a7f3d0" strokeWidth="1.4" markerEnd="url(#arrow)" fill="none" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#a7f3d0" />
        </marker>
      </defs>
      <text x="155" y="140" fontSize="8" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "អូស ➜ ស្ទាបអាតូម" : "DRAG ➜ FEEL ATOMS"}
      </text>
    </svg>
  );
}

function Stat({
  label,
  value,
  k,
}: {
  label: string;
  value: string;
  k: boolean;
}) {
  return (
    <div className="rounded-lg bg-white border border-emerald-300 px-2 py-2">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
        {label}
      </div>
      <div className={`text-sm font-bold text-slate-900 ${k ? "font-khmer" : "font-mono"}`}>
        {value}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════════════════════

function VocabChip({
  color,
  en,
  kh,
  k,
}: {
  color: "emerald" | "slate" | "indigo" | "amber";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    emerald: "border-emerald-300 text-emerald-800 bg-emerald-50",
    slate:   "border-slate-300 text-slate-800 bg-slate-50",
    indigo:  "border-indigo-300 text-indigo-800 bg-indigo-50",
    amber:   "border-amber-300 text-amber-800 bg-amber-50",
  };
  return (
    <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${colours[color]} ${k ? "font-khmer" : ""}`}>
      {k ? kh : en}
    </span>
  );
}

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
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-emerald-700 bg-emerald-50 border border-emerald-300 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Microscope className="w-4 h-4 text-emerald-500 ml-1" aria-hidden="true" />
      <div className="flex-1 border-t border-dashed border-emerald-400/60" />
    </div>
  );
}
