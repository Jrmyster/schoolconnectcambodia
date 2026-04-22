import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Hourglass,
  Compass,
  Flame,
  Globe2,
  Sprout,
  Bone,
  Sun,
  Skull,
  Leaf,
  AlertTriangle,
  Ruler,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  GEO-DT · Deep Time: The Birth and Death of Earth
//           ពេលវេលាដ៏ជ្រៅ៖ កំណើត និងទីបញ្ចប់នៃផែនដី
//
//   1. The Hadean Eon         — magma ocean, asteroid bombardment
//   2. The Eras of Life       — Precambrian / Paleozoic / Meso+Ceno
//   3. The Future Extinction  — sun heats → CO₂ collapse → biosphere dies
//
//   Aesthetic: earth tones (magma orange, oceanic blue, barren grey) bleeding
//   into deep-space black. Vertical timeline as the binding spine.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  backgroundImage:
    "radial-gradient(circle at 12% 8%, rgba(234, 88, 12, 0.18), transparent 45%)," +
    "radial-gradient(circle at 88% 92%, rgba(14, 116, 144, 0.20), transparent 50%)," +
    "radial-gradient(circle at 50% 50%, rgba(120, 113, 108, 0.10), transparent 65%)",
};

const STAR_LAYER: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(1px 1px at 14% 22%, #fef3c7 99%, transparent), " +
    "radial-gradient(1px 1px at 33% 71%, #fde68a 99%, transparent), " +
    "radial-gradient(1px 1px at 47% 18%, #fff 99%, transparent), " +
    "radial-gradient(1px 1px at 61% 42%, #fcd34d 99%, transparent), " +
    "radial-gradient(1px 1px at 78% 88%, #fff7ed 99%, transparent), " +
    "radial-gradient(1px 1px at 91% 12%, #fff 99%, transparent), " +
    "radial-gradient(1px 1px at 22% 91%, #fef3c7 99%, transparent), " +
    "radial-gradient(1px 1px at 70% 65%, #fff 99%, transparent)",
  backgroundSize: "100% 100%",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "rgba(20, 14, 10, 0.78)",
  backgroundImage:
    "linear-gradient(rgba(234, 88, 12, 0.05) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(234, 88, 12, 0.05) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  backdropFilter: "blur(2px)",
};

function CornerMarks({ tone = "orange" }: { tone?: "orange" | "cyan" | "stone" | "rose" }) {
  const colors: Record<string, string> = {
    orange: "border-orange-500/70",
    cyan: "border-cyan-400/70",
    stone: "border-stone-400/70",
    rose: "border-rose-500/80",
  };
  const cls = colors[tone];
  return (
    <div className="contents">
      <span aria-hidden className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${cls}`} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function DeepTimePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen text-stone-100 py-10 sm:py-12 px-4 sm:px-6 relative" style={PAGE_BG}>
      {/* faint star layer */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60" style={STAR_LAYER} />

      <div className="max-w-5xl mx-auto relative">
        <Link
          href="/geology"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-stone-100 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Geology", "ត្រឡប់ទៅភូគព្ភវិទ្យា")}
        </Link>

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-9 sm:py-12 mb-12 shadow-2xl border border-orange-500/30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 90%, rgba(234, 88, 12, 0.55), transparent 55%)," +
              "radial-gradient(circle at 80% 12%, rgba(14, 116, 144, 0.40), transparent 55%)," +
              "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #0c0a09 100%)",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/15 border-2 border-orange-400/60 text-orange-300 flex items-center justify-center flex-shrink-0">
              <Hourglass className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-orange-300/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Geology", "ភូគព្ភវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-200">GEO-DT</span>
                <span className="opacity-50">/</span>
                <span className="text-stone-300">4,540,000,000 yr</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-50 ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Deep Time: The Birth and Death of Earth",
                  "ពេលវេលាដ៏ជ្រៅ៖ កំណើត និងទីបញ្ចប់នៃផែនដី"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Step back from a single human lifetime and watch the whole story of our planet — from a glowing ball of molten rock, through 4.5 billion years of life, to the day the Sun grows so hot the plants suffocate.",
                  "ដកថយចេញពីអាយុមនុស្សតែម្នាក់ ហើយមើលរឿងរ៉ាវទាំងមូលនៃភពផែនដីយើង — ចាប់ពីដុំថ្មរលាយដ៏ចាំងព្នឺ ឆ្លងកាត់ ៤,៥ ពាន់លានឆ្នាំនៃជីវិត រហូតដល់ថ្ងៃដែលព្រះអាទិត្យក្ដៅខ្លាំងរហូតរុក្ខជាតិអនកដង្ហើម។"
                )}
              </p>

              {/* Hero metrics strip */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <HeroStat tone="orange" labelEn="Earth born" labelKh="កំណើតផែនដី" value="4.54 BYA" valueKh="៤,៥៤ BYA" kh={kh} />
                <HeroStat tone="cyan" labelEn="First life" labelKh="ជីវិតដំបូង" value="≈ 3.7 BYA" valueKh="≈ ៣,៧ BYA" kh={kh} />
                <HeroStat tone="amber" labelEn="Today" labelKh="សព្វថ្ងៃ" value="0" kh={kh} />
                <HeroStat tone="stone" labelEn="Last plant" labelKh="រុក្ខជាតិចុងក្រោយ" value="+600 MYA" valueKh="+៦០០ MYA" kh={kh} />
              </div>
            </div>
          </div>
        </header>

        {/* ─── Vertical Master Timeline ──────────────────────────────────── */}
        <MasterTimeline kh={kh} t={t} />

        {/* ─── Sections ──────────────────────────────────────────────────── */}
        <HadeanSection kh={kh} t={t} />
        <ErasOfLifeSection kh={kh} t={t} />
        <FutureExtinctionSection kh={kh} t={t} />

        {/* ─── Closing reflection ────────────────────────────────────────── */}
        <div
          className="relative mt-12 rounded-2xl border-2 border-amber-500/50 p-5 sm:p-7 flex items-start gap-4 overflow-hidden"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks tone="orange" />
          <Globe2 className="w-7 h-7 text-amber-300 flex-shrink-0 mt-1" />
          <div>
            <p className={`text-base sm:text-lg italic text-amber-100 ${kh ? "font-khmer leading-loose not-italic" : "leading-relaxed"}`}>
              {t(
                "“If the entire history of Earth were a single day, all of human civilization would last less than the final blink of an eye.”",
                "« បើប្រវត្តិសាស្ត្រទាំងមូលរបស់ផែនដី គឺជាមួយថ្ងៃ នោះអរិយធម៌មនុស្សទាំងមូលនឹងប្រើពេលតិចជាងការបិទភ្នែកមួយដងចុងក្រោយ។ »"
              )}
            </p>
            <p className={`mt-2 text-sm text-stone-300 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Deep time teaches humility — the Earth was here for billions of years before us, and will be here for billions more after.",
                "ពេលវេលាដ៏ជ្រៅបង្រៀនការបន្ទាបខ្លួន — ផែនដីមាននៅទីនេះអស់រាប់ពាន់លានឆ្នាំមុនយើង ហើយនឹងនៅទីនេះរាប់ពាន់លានឆ្នាំបន្ទាប់ផងដែរ។"
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/geology"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold shadow hover:bg-orange-400 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Geology", "ត្រឡប់ទៅភូគព្ភវិទ្យា")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── HeroStat pill
function HeroStat({
  tone, labelEn, labelKh, value, valueKh, kh,
}: {
  tone: "orange" | "cyan" | "amber" | "stone";
  labelEn: string; labelKh: string;
  value: string; valueKh?: string;
  kh: boolean;
}) {
  const map: Record<string, string> = {
    orange: "border-orange-500/40 bg-orange-500/10 text-orange-200",
    cyan:   "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
    amber:  "border-amber-400/50 bg-amber-400/10 text-amber-200",
    stone:  "border-stone-500/50 bg-stone-500/15 text-stone-200",
  };
  return (
    <div className={`rounded-md border px-2.5 py-1.5 ${map[tone]}`}>
      <div className={`text-[9px] font-mono uppercase tracking-widest opacity-80 ${kh ? "font-khmer normal-case tracking-normal text-[10px]" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`text-sm font-bold text-white ${kh && valueKh ? "font-khmer" : "font-mono"}`}>
        {kh && valueKh ? valueKh : value}
      </div>
    </div>
  );
}

// ─── Section header (dark variant)
function SectionHeader({
  spec, en, kh, kh_, tone = "orange",
}: {
  spec: string; en: string; kh: string; kh_: boolean;
  tone?: "orange" | "cyan" | "rose";
}) {
  const map: Record<string, string> = {
    orange: "text-orange-300 bg-orange-500/10 border-orange-500/40",
    cyan:   "text-cyan-300 bg-cyan-500/10 border-cyan-500/40",
    rose:   "text-rose-300 bg-rose-500/10 border-rose-500/50",
  };
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`font-mono text-[10px] tracking-[0.25em] uppercase rounded px-2 py-0.5 border ${map[tone]}`}>
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-stone-50 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-stone-500 ml-1" />
      <div className="flex-1 border-t border-dashed border-stone-700" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Master vertical timeline — anchors the whole page
// ════════════════════════════════════════════════════════════════════════════

function MasterTimeline({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div
      className="relative mb-12 rounded-2xl border-2 border-stone-700 p-5 sm:p-7 overflow-hidden"
      style={CARD_BG}
      data-testid="master-timeline"
    >
      <CornerMarks tone="stone" />
      <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("THE 5.4 BILLION YEAR SPINE · ហ្ស៊ីហ្គា = ១ ពាន់លានឆ្នាំ", "ឆ្អឹងខ្នង ៥,៤ ពាន់លានឆ្នាំ · GA = 1 BILLION YR")}
      </div>
      <DeepTimeBar kh={kh} t={t} />
      <p className={`mt-3 text-xs text-stone-400 text-center ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Birth on the left. Today is a thin red line near the right. The death of life waits beyond it.",
          "កំណើតនៅខាងឆ្វេង។ ថ្ងៃនេះជាបន្ទាត់ក្រហមស្តើងនៅជិតខាងស្ដាំ។ ទីបញ្ចប់នៃជីវិតរង់ចាំនៅហួសពីវា។"
        )}
      </p>
    </div>
  );
}

function DeepTimeBar({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  // Map: total span 0 .. 5400 (Mya equivalent), 0 = Hadean start (4540 Mya ago + 800 future).
  // We'll use a 0..5400 axis where 0 = 4540 Mya (birth), 4540 = present, 5340 = +800 My (death).
  const W = 720, H = 96, pad = 28;
  const total = 5400;
  const x = (myrFromBirth: number) => pad + (myrFromBirth / total) * (W - 2 * pad);

  const eras: Array<{ from: number; to: number; fill: string; en: string; kh: string }> = [
    { from: 0,    to: 3999, fill: "#a16207", en: "Precambrian", kh: "ព្រីខេមប្រៀន" }, // 4540→541 Mya = 0..3999
    { from: 3999, to: 4288, fill: "#0e7490", en: "Paleozoic",   kh: "ប៉ាឡេអូសូអ៊ិក" },   // 541→252 = 3999..4288
    { from: 4288, to: 4474, fill: "#15803d", en: "Mesozoic",    kh: "មេសូសូអ៊ិក" },     // 252→66 = 4288..4474
    { from: 4474, to: 4540, fill: "#86198f", en: "Cenozoic",    kh: "សេណូសូអ៊ិក" },    // 66→0  = 4474..4540
    { from: 4540, to: 5340, fill: "#7f1d1d", en: "Future death zone", kh: "តំបន់នាគត" }, // future
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
      {/* axis baseline */}
      <line x1={pad} y1={56} x2={W - pad} y2={56} stroke="#44403c" strokeWidth="1" />

      {/* era bands */}
      {eras.map((e, i) => (
        <rect
          key={i}
          x={x(e.from)}
          y={36}
          width={x(e.to) - x(e.from)}
          height={20}
          fill={e.fill}
          opacity="0.85"
          stroke="#1c1917"
          strokeWidth="0.6"
        />
      ))}

      {/* TODAY marker (4540) */}
      <line x1={x(4540)} y1={20} x2={x(4540)} y2={70} stroke="#fbbf24" strokeWidth="2" />
      <text x={x(4540)} y={16} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#fbbf24" fontWeight="bold">
        TODAY
      </text>

      {/* Birth marker */}
      <circle cx={x(0)} cy={56} r="3.5" fill="#ea580c" stroke="#fff" strokeWidth="1" />
      <text x={x(0)} y={86} textAnchor="start" fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold">
        4.54 BYA · {t("BIRTH", "កំណើត")}
      </text>

      {/* Death marker */}
      <circle cx={x(5340)} cy={56} r="3.5" fill="#dc2626" stroke="#fff" strokeWidth="1" />
      <text x={x(5340)} y={86} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#fecaca" fontWeight="bold">
        +800 MYA · {t("DEATH", "មរណៈ")}
      </text>

      {/* Era labels — narrow eras get leader lines + staggered labels above */}
      {eras.map((e, i) => {
        const cx = (x(e.from) + x(e.to)) / 2;
        const wpx = x(e.to) - x(e.from);
        const label = kh ? e.kh : e.en;
        if (wpx >= 80) {
          // wide era: label sits inside the band
          return (
            <text key={i} x={cx} y={50} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fff" fontWeight="bold">
              {label}
            </text>
          );
        }
        // narrow era: stagger above with a leader line (3-step staircase)
        const yLabel = [22, 12, 4][i % 3];
        return (
          <g key={i}>
            <line x1={cx} y1={36} x2={cx} y2={yLabel + 4} stroke="#78716c" strokeWidth="0.6" />
            <text x={cx} y={yLabel} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#fde68a" fontWeight="bold">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Hadean Eon (Magma Earth)
// ════════════════════════════════════════════════════════════════════════════

function HadeanSection({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section className="mb-12" data-testid="section-hadean">
      <SectionHeader
        spec="01"
        en="The Hadean Eon — A World on Fire"
        kh="យុគហាដៀន — ពិភពនៃភ្លើង"
        kh_={kh}
        tone="orange"
      />

      <div
        className="relative rounded-2xl border-2 border-orange-500/50 p-5 sm:p-7 shadow-lg overflow-hidden"
        style={CARD_BG}
      >
        <CornerMarks tone="orange" />

        <div className={`mb-4 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-orange-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Flame className="w-3.5 h-3.5" />
          <span>4.54 → 4.0 {t("BILLION YEARS AGO", "ពាន់លានឆ្នាំមុន")}</span>
        </div>

        <h3 className={`text-lg sm:text-xl font-bold text-orange-100 mb-2 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t("Birth in a sea of magma", "កំណើតក្នុងសមុទ្រកម្អែភ្នំភ្លើង")}
        </h3>

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-center">
          <div>
            <p className={`text-stone-200 text-sm sm:text-base mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Roughly ", "ប្រហែល "
              )}
              <strong className="text-orange-300">
                {t("4.54 billion years ago", "៤,៥៤ ពាន់លានឆ្នាំមុន")}
              </strong>
              {t(
                ", a swirling cloud of dust and rock around our young Sun pulled itself together by gravity into a glowing ball — the Earth. There was no blue sky. No green grass. No oceans of water.",
                " ពពកធូលី និងថ្មដែលវិលជុំវិញព្រះអាទិត្យវ័យក្មេងរបស់យើង បានទាញខ្លួនឯងជាមួយគ្នាដោយទំនាញទៅជាដុំចាំងព្នឺមួយ — ផែនដី។ គ្មានមេឃខៀវ។ គ្មានស្មៅបៃតង។ គ្មានមហាសមុទ្រនៃទឹក។"
              )}
            </p>
            <p className={`text-stone-200 text-sm sm:text-base mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "The surface was a ", "ផ្ទៃខាងលើគឺជា "
              )}
              <strong className="text-rose-300">
                {t("toxic, swirling ocean of red-hot magma", "សមុទ្រនៃកម្អែភ្នំភ្លើងក្រហមរោល ពោរពេញដោយជាតិពុល")}
              </strong>
              {t(
                " — temperatures above 1,200 °C — constantly bombarded by ",
                " — សីតុណ្ហភាពលើស ១,២០០ °C — ត្រូវបានវាយប្រហារដោយ "
              )}
              <strong className="text-amber-300">
                {t("massive asteroids", "អាស្តេរ៉ូអ៊ីតដ៏ធំសម្បើម")}
              </strong>
              {t(
                ". One of them, the size of Mars, struck so hard it splashed out the rock that became our Moon.",
                "។ មួយក្នុងចំណោមនោះ ដែលធំស្មើភពអង្គារ បានបុកខ្លាំងរហូតធ្វើឱ្យថ្មខ្ចាយចេញ ដែលបានក្លាយជាព្រះច័ន្ទរបស់យើង។"
              )}
            </p>
            <p className={`text-stone-200 text-sm sm:text-base ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t("The atmosphere was ", "បរិយាកាសគឺជា ")}
              <strong className="text-stone-100">
                {t("unbreathable rock vapor and carbon dioxide", "ចំហាយថ្ម និងកាបូនឌីអុកស៊ីត ដែលមនុស្សមិនអាចដកដង្ហើមបាន")}
              </strong>
              {t(
                ". Any human dropped onto Hadean Earth would die in an instant — burned, crushed, suffocated, all at once.",
                "។ មនុស្សណាដែលធ្លាក់នៅលើផែនដីហាដៀន នឹងស្លាប់ភ្លាមៗ — ឆេះ ត្រូវកម្ទេច ដាច់ខ្យល់ ទាំងអស់ក្នុងពេលតែមួយ។"
              )}
            </p>

            <div className="mt-4 grid sm:grid-cols-3 gap-2">
              <FactChip tone="orange" labelEn="Surface" labelKh="ផ្ទៃខាងលើ" valueEn="1,200 °C magma" valueKh="កម្អែភ្នំភ្លើង ១,២០០ °C" kh={kh} />
              <FactChip tone="amber" labelEn="Sky" labelKh="មេឃ" valueEn="Rock vapor + CO₂" valueKh="ចំហាយថ្ម + CO₂" kh={kh} />
              <FactChip tone="stone" labelEn="Day length" labelKh="ប្រវែងថ្ងៃ" valueEn="≈ 6 hours" valueKh="≈ ៦ ម៉ោង" kh={kh} />
            </div>
          </div>

          {/* Magma Earth diagram */}
          <div className="rounded-xl bg-black/60 border border-orange-500/30 p-3" data-testid="hadean-diagram">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("HADEAN EARTH · MAGMA OCEAN", "ផែនដីហាដៀន · សមុទ្រកម្អែ")}
            </div>
            <HadeanEarthSVG />
            <div className={`mt-2 text-center text-[11px] text-orange-200/80 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
              {t("Asteroid bombardment + molten surface", "ការវាយប្រហារដោយអាស្តេរ៉ូអ៊ីត + ផ្ទៃរលាយ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FactChip({
  tone, labelEn, labelKh, valueEn, valueKh, kh,
}: {
  tone: "orange" | "amber" | "stone" | "cyan";
  labelEn: string; labelKh: string;
  valueEn: string; valueKh: string;
  kh: boolean;
}) {
  const map: Record<string, string> = {
    orange: "border-orange-500/40 bg-orange-500/10",
    amber:  "border-amber-400/40 bg-amber-400/10",
    stone:  "border-stone-500/40 bg-stone-500/10",
    cyan:   "border-cyan-500/40 bg-cyan-500/10",
  };
  return (
    <div className={`rounded-md border px-2.5 py-1.5 ${map[tone]}`}>
      <div className={`text-[9px] font-mono uppercase tracking-widest text-stone-300 ${kh ? "font-khmer normal-case tracking-normal text-[10px]" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`text-xs font-bold text-stone-50 ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? valueKh : valueEn}
      </div>
    </div>
  );
}

function HadeanEarthSVG() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto" aria-hidden>
      <defs>
        <radialGradient id="magma-globe" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="35%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
        <radialGradient id="magma-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* space */}
      <rect width="320" height="200" fill="#000" />
      {[
        [22, 18], [55, 52], [90, 22], [130, 72], [200, 28], [250, 52], [288, 18], [300, 82], [40, 170], [270, 168], [310, 140],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.9" fill="#fff" opacity={0.5 + (i % 3) * 0.15} />
      ))}
      {/* glow halo */}
      <circle cx="160" cy="105" r="80" fill="url(#magma-glow)" />
      {/* Earth */}
      <circle cx="160" cy="105" r="58" fill="url(#magma-globe)" />
      {/* magma cracks */}
      <path d="M 110 95 Q 140 80, 160 100 T 215 110" stroke="#fde047" strokeWidth="1.4" fill="none" opacity="0.85" />
      <path d="M 120 130 Q 150 115, 175 130 T 210 140" stroke="#fb923c" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 130 75 Q 155 90, 175 80" stroke="#fcd34d" strokeWidth="1" fill="none" opacity="0.75" />
      {/* Asteroids streaks */}
      {[
        { x1: 8, y1: 8, x2: 70, y2: 70 },
        { x1: 280, y1: 14, x2: 210, y2: 84 },
        { x1: 312, y1: 100, x2: 240, y2: 130 },
      ].map((s, i) => (
        <g key={i}>
          <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#fbbf24" strokeWidth="1.2" opacity="0.7" />
          <circle cx={s.x2} cy={s.y2} r="3.5" fill="#fef3c7" stroke="#f97316" strokeWidth="0.8" />
        </g>
      ))}
      {/* CO2 vapor labels */}
      <text x="40" y="195" fontSize="9" fontFamily="monospace" fill="#a8a29e">rock vapor · CO₂</text>
      <text x="160" y="195" fontSize="9" fontFamily="monospace" fill="#fbbf24" fontWeight="bold">≈ 1,200 °C</text>
      <text x="285" y="195" fontSize="9" fontFamily="monospace" fill="#fed7aa" textAnchor="end">no oceans</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Eras of Life
// ════════════════════════════════════════════════════════════════════════════

type Era = {
  spec: string;
  nameEn: string;
  nameKh: string;
  spanEn: string;
  spanKh: string;
  iconBg: string;
  border: string;
  text: string;
  Icon: React.ComponentType<{ className?: string }>;
  bodyEn: string;
  bodyKh: string;
};

function ErasOfLifeSection({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  const eras: Era[] = [
    {
      spec: "PC",
      nameEn: "Precambrian",
      nameKh: "ព្រីខេមប្រៀន",
      spanEn: "4.5 BYA → 541 MYA · the longest era",
      spanKh: "៤,៥ BYA → ៥៤១ MYA · យុគដ៏វែងបំផុត",
      iconBg: "bg-amber-700/30",
      border: "border-amber-600/50",
      text: "text-amber-200",
      Icon: Sprout,
      bodyEn:
        "Earth slowly cools. Steam falls as the first rains for millions of years, filling basins to make the first oceans. In those warm, salty seas, the first invisible single-celled life — bacteria — appears. For nearly 4 billion years, that is all the life there is.",
      bodyKh:
        "ផែនដីត្រជាក់យឺតៗ។ ចំហាយធ្លាក់ជាភ្លៀងដំបូងអស់រាប់លានឆ្នាំ បំពេញអាងបង្កើតមហាសមុទ្រដំបូង។ នៅក្នុងសមុទ្រក្ដៅៗ ប្រៃនោះ ជីវិតកោសិកាតែមួយដែលមើលមិនឃើញដំបូង — បាក់តេរី — បានលេចឡើង។ អស់រយៈពេលជិត ៤ ពាន់លានឆ្នាំ វាជាជីវិតតែមួយគត់ដែលមាន។",
    },
    {
      spec: "PZ",
      nameEn: "Paleozoic",
      nameKh: "ប៉ាឡេអូសូអ៊ិក",
      spanEn: "541 → 252 MYA · the Cambrian Explosion",
      spanKh: "៥៤១ → ២៥២ MYA · ការផ្ទុះខេមប្រៀន",
      iconBg: "bg-cyan-700/30",
      border: "border-cyan-500/50",
      text: "text-cyan-200",
      Icon: Leaf,
      bodyEn:
        "In a sudden geological flash — the Cambrian Explosion — complex life with eyes, shells, and limbs erupts in the oceans. Fish appear. Then the first plants and amphibians crawl onto bare land, painting it green for the first time.",
      bodyKh:
        "ក្នុងការផ្ទុះធរណីសាស្ត្រដ៏លឿន — ការផ្ទុះខេមប្រៀន — ជីវិតស្មុគស្មាញដែលមានភ្នែក សំបក និងជើងបានលេចឡើងក្នុងមហាសមុទ្រ។ ត្រីបានលេចឡើង។ បន្ទាប់មក រុក្ខជាតិ និងសត្វលលាដ៏ដំបូងបានឡើងដី ដែលបានគូរពណ៌បៃតងលើដីជាលើកដំបូង។",
    },
    {
      spec: "MZ+CZ",
      nameEn: "Mesozoic & Cenozoic",
      nameKh: "មេសូសូអ៊ិក និងសេណូសូអ៊ិក",
      spanEn: "252 MYA → today · dinosaurs to humans",
      spanKh: "២៥២ MYA → សព្វថ្ងៃ · ដាយណូសូរដល់មនុស្ស",
      iconBg: "bg-fuchsia-700/30",
      border: "border-fuchsia-500/50",
      text: "text-fuchsia-200",
      Icon: Bone,
      bodyEn:
        "The Mesozoic is the age of dinosaurs — they rule land, sea, and sky for 186 million years until an asteroid strike wipes them out. The Cenozoic that follows is the age of mammals: tiny shrew-like survivors evolve into whales, elephants, and finally — in the last 0.005% of Earth's life — humans.",
      bodyKh:
        "មេសូសូអ៊ិកគឺជាយុគនៃដាយណូសូរ — ពួកវាគ្រប់គ្រងលើដី សមុទ្រ និងមេឃអស់ ១៨៦ លានឆ្នាំ រហូតការវាយប្រហាររបស់អាស្តេរ៉ូអ៊ីតបានបំផ្លាញពួកវា។ សេណូសូអ៊ិកដែលតាមមកគឺជាយុគនៃថនិកសត្វ ៖ សត្វតូចៗដែលរស់រានមានជីវិតបានវិវត្តទៅជាត្រីបាឡែន ដំរី ហើយចុងក្រោយ — ក្នុង ០,០០៥% ចុងក្រោយនៃជីវិតផែនដី — មនុស្ស។",
    },
  ];

  return (
    <section className="mb-12" data-testid="section-eras">
      <SectionHeader
        spec="02"
        en="The Eras of Life"
        kh="យុគសម័យនៃជីវិត"
        kh_={kh}
        tone="cyan"
      />

      <div
        className="relative rounded-2xl border-2 border-cyan-500/40 p-5 sm:p-7 mb-5"
        style={CARD_BG}
      >
        <CornerMarks tone="cyan" />
        <p className={`text-stone-200 text-sm sm:text-base ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Once Earth cooled enough for liquid water to stay, life began an unbroken chain — a chain that has survived 5 mass extinctions. Geologists divide this story into three big chapters.",
            "នៅពេលផែនដីត្រជាក់ល្មមឱ្យទឹករាវនៅបាន ជីវិតបានចាប់ផ្ដើមជាខ្សែសង្វាក់មិនដាច់ — ខ្សែសង្វាក់មួយដែលបានរស់រានពីការបាត់បង់ជីវិតធំៗចំនួន ៥ ដង។ អ្នកធរណីសាស្ត្របែងចែករឿងនេះជាជំពូកធំៗ ៣។"
          )}
        </p>
      </div>

      <ol className="relative border-l-2 border-stone-700 pl-6 sm:pl-8 ml-2 space-y-6" data-testid="eras-timeline">
        {eras.map((e) => (
          <li key={e.spec} className="relative">
            {/* dot */}
            <span
              className={`absolute -left-[34px] sm:-left-[42px] top-2 w-6 h-6 rounded-full ${e.iconBg} border-2 ${e.border} flex items-center justify-center`}
              aria-hidden
            >
              <e.Icon className={`w-3 h-3 ${e.text}`} />
            </span>
            <div
              className={`relative rounded-2xl border-2 ${e.border} p-4 sm:p-5 overflow-hidden`}
              style={CARD_BG}
              data-testid={`era-${e.spec.toLowerCase()}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className={`font-mono text-[10px] tracking-[0.25em] uppercase ${e.text} bg-black/40 border ${e.border} rounded px-2 py-0.5`}>
                  ERA · {e.spec}
                </span>
                <h3 className={`text-base sm:text-lg font-bold text-stone-50 ${kh ? "font-khmer" : ""}`}>
                  {kh ? e.nameKh : e.nameEn}
                </h3>
                <span className={`text-[11px] font-mono text-stone-400 ${kh ? "font-khmer normal-case text-xs" : ""}`}>
                  {kh ? e.spanKh : e.spanEn}
                </span>
              </div>
              <p className={`text-sm text-stone-200 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {kh ? e.bodyKh : e.bodyEn}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Future Extinction
// ════════════════════════════════════════════════════════════════════════════

function FutureExtinctionSection({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section className="mb-12" data-testid="section-future">
      <SectionHeader
        spec="03"
        en="The Future Extinction — When Plants Suffocate"
        kh="ទីបញ្ចប់នៃរុក្ខជាតិ និងជីវិត"
        kh_={kh}
        tone="rose"
      />

      <div
        className="relative rounded-2xl border-2 border-rose-500/60 p-5 sm:p-7 shadow-lg overflow-hidden"
        style={CARD_BG}
        data-testid="future-card"
      >
        <CornerMarks tone="rose" />

        <div className={`mb-4 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-rose-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t("+600 → +800 MILLION YEARS FROM TODAY", "+៦០០ → +៨០០ លានឆ្នាំចាប់ពីសព្វថ្ងៃ")}</span>
        </div>

        <h3 className={`text-lg sm:text-xl font-bold text-rose-100 mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "The Sun grows hot, and the planet's lungs stop working",
            "ព្រះអាទិត្យកាន់តែក្ដៅ ហើយសួតរបស់ភពផែនដីឈប់ដំណើរការ"
          )}
        </h3>

        <p className={`text-stone-200 text-sm sm:text-base mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "All stars age. Our Sun is no exception. Slowly — over hundreds of millions of years — it grows hotter and brighter. That extra heat does something quiet but lethal: it speeds up the ",
            "ផ្កាយទាំងអស់ឆ្លងវ័យ។ ព្រះអាទិត្យរបស់យើងក៏មិនមែនជាករណីលើកលែងដែរ។ យឺតៗ — អស់រាប់រយលានឆ្នាំ — វាកាន់តែក្ដៅ និងភ្លឺ។ កំដៅបន្ថែមនោះធ្វើអ្វីមួយយ៉ាងស្ងាត់ៗ ប៉ុន្តែសម្លាប់ ៖ វាបង្កើនល្បឿន "
          )}
          <strong className="text-amber-200">
            {t("weathering of rocks", "ការសឹករបស់ថ្ម")}
          </strong>
          {t(
            ", which acts like a giant sponge soaking ",
            " ដែលដើរតួជាកំប្រាល់ដ៏ធំស្រូប "
          )}
          <strong className="text-cyan-200">CO₂</strong>
          {t(
            " out of the atmosphere.",
            " ចេញពីបរិយាកាស។"
          )}
        </p>

        <p className={`text-stone-200 text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Eventually, CO₂ levels drop below the floor that plants need to perform ",
            "ចុងបញ្ចប់ កម្រិត CO₂ ធ្លាក់ក្រោមកម្រិតអប្បបរមាដែលរុក្ខជាតិត្រូវការដើម្បីធ្វើ "
          )}
          <strong className="text-emerald-200">{t("photosynthesis", "រស្មីសំយោគ")}</strong>
          {t(
            ". The plants suffocate and die — quietly, with no flames. Without plants, the food chain collapses: herbivores starve, then the carnivores that eat them. All animal life will go extinct ",
            "។ រុក្ខជាតិដាច់ខ្យល់ និងស្លាប់ — ស្ងាត់ៗ ដោយគ្មានភ្លើង។ ដោយគ្មានរុក្ខជាតិ ខ្សែសង្វាក់អាហារដួលរលំ ៖ សត្វស៊ីស្មៅអត់អាហារ បន្ទាប់មកសត្វសាហាវដែលស៊ីពួកវា។ ជីវិតសត្វទាំងអស់នឹងផុតពូជ "
          )}
          <em className={`text-rose-200 ${kh ? "font-khmer not-italic" : ""}`}>
            {t("long before", "មុនពេលជាយូរ")}
          </em>
          {t(
            " the oceans finally boil away from the heat.",
            " មហាសមុទ្រនៅទីបំផុតនឹងពុះរលាយដោយសារកំដៅ។"
          )}
        </p>

        {/* Mechanism chain */}
        <div className="rounded-xl border border-rose-500/40 bg-black/50 p-4 mb-5" data-testid="extinction-chain">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("CHAIN OF COLLAPSE", "ខ្សែសង្វាក់នៃការដួលរលំ")}
          </div>
          <div className="grid sm:grid-cols-5 gap-2 items-stretch">
            <ChainStep tone="amber" Icon={Sun} en="Sun gets hotter" kh="ព្រះអាទិត្យក្ដៅឡើង" kh_={kh} />
            <ChainArrow />
            <ChainStep tone="stone" Icon={Globe2} en="Rock weathering speeds up · CO₂ pulled out of air" kh="ការសឹកថ្មលឿនឡើង · CO₂ ត្រូវទាញចេញពីខ្យល់" kh_={kh} />
            <ChainArrow />
            <ChainStep tone="emerald" Icon={Leaf} en="CO₂ too low for photosynthesis" kh="CO₂ ទាបពេកសម្រាប់រស្មីសំយោគ" kh_={kh} />
          </div>
          <div className="grid sm:grid-cols-5 gap-2 items-stretch mt-2">
            <ChainStep tone="emerald" Icon={Sprout} en="Plants suffocate & die" kh="រុក្ខជាតិដាច់ខ្យល់ និងស្លាប់" kh_={kh} />
            <ChainArrow />
            <ChainStep tone="rose" Icon={Skull} en="Food chain collapses · animals extinct" kh="ខ្សែសង្វាក់អាហារដួលរលំ · សត្វផុតពូជ" kh_={kh} />
            <ChainArrow />
            <ChainStep tone="rose" Icon={Flame} en="Oceans finally boil away" kh="មហាសមុទ្រនៅទីបំផុតពុះរលាយ" kh_={kh} />
          </div>
        </div>

        {/* CO2 decline diagram */}
        <CO2DeclineDiagram kh={kh} t={t} />

        {/* Bilingual closing */}
        <div className="mt-5 rounded-xl border-2 border-rose-500/50 bg-gradient-to-br from-stone-950 via-rose-950/40 to-black p-4 text-center">
          <p className="text-base font-display italic text-rose-100">
            “The Earth will not die in fire first — it will die in silence, when the green of the world finally cannot breathe.”
          </p>
          <p className="mt-2 text-base font-khmer font-bold text-rose-100 leading-loose">
            « ផែនដីនឹងមិនស្លាប់ដោយភ្លើងជាមុនទេ — វានឹងស្លាប់ក្នុងភាពស្ងាត់ស្ងៀម នៅពេលពណ៌បៃតងនៃពិភពលោកលែងអាចដកដង្ហើមបាន។ »
          </p>
        </div>
      </div>
    </section>
  );
}

function ChainStep({
  tone, Icon, en, kh, kh_,
}: {
  tone: "amber" | "stone" | "emerald" | "rose";
  Icon: React.ComponentType<{ className?: string }>;
  en: string; kh: string; kh_: boolean;
}) {
  const map: Record<string, string> = {
    amber:   "border-amber-400/50 bg-amber-500/10 text-amber-200",
    stone:   "border-stone-500/50 bg-stone-500/10 text-stone-200",
    emerald: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
    rose:    "border-rose-500/60 bg-rose-500/10 text-rose-200",
  };
  return (
    <div className={`rounded-lg border-2 px-3 py-2 flex items-start gap-2 ${map[tone]}`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <p className={`text-xs font-semibold ${kh_ ? "font-khmer leading-loose" : "leading-snug"}`}>
        {kh_ ? kh : en}
      </p>
    </div>
  );
}

function ChainArrow() {
  return (
    <div className="hidden sm:flex items-center justify-center text-rose-400" aria-hidden>
      <ArrowRight className="w-4 h-4" />
    </div>
  );
}

function CO2DeclineDiagram({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  const W = 620, H = 170;
  const padX = 44, padY = 26;

  // Sample points: (timeMyrFromNow, atmosphericCO2 ppm) — illustrative
  const data: Array<{ x: number; y: number; label?: string }> = [
    { x: 0,    y: 420, label: "Today" },
    { x: 100,  y: 380 },
    { x: 250,  y: 280 },
    { x: 400,  y: 180 },
    { x: 550,  y: 100, label: "C3 floor" },
    { x: 700,  y: 40,  label: "Plants die" },
    { x: 800,  y: 15 },
  ];
  const maxX = 800, maxY = 450;
  const x = (v: number) => padX + (v / maxX) * (W - 2 * padX);
  const y = (v: number) => H - padY - (v / maxY) * (H - 2 * padY);

  const path = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.x).toFixed(1)} ${y(d.y).toFixed(1)}`).join(" ");
  const fill = `${path} L ${x(maxX)} ${H - padY} L ${x(0)} ${H - padY} Z`;

  return (
    <div className="rounded-xl border border-rose-500/40 bg-black/50 p-4" data-testid="co2-decline-diagram">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("ATMOSPHERIC CO₂ · NEXT 800 MILLION YEARS", "CO₂ ក្នុងបរិយាកាស · ៨០០ លានឆ្នាំខាងមុខ")}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
        {/* axes */}
        <line x1={padX} y1={H - padY} x2={W - padX} y2={H - padY} stroke="#57534e" strokeWidth="1" />
        <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="#57534e" strokeWidth="1" />

        {/* C3 photosynthesis floor at 150 ppm */}
        <line x1={padX} y1={y(150)} x2={W - padX} y2={y(150)} stroke="#10b981" strokeDasharray="4 4" strokeWidth="1" opacity="0.7" />
        <text x={W - padX - 4} y={y(150) - 4} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#6ee7b7">
          {t("C3 floor · 150 ppm", "កម្រិត C3 · ១៥០ ppm")}
        </text>

        {/* fill area */}
        <path d={fill} fill="#fb7185" opacity="0.12" />
        {/* line */}
        <path d={path} fill="none" stroke="#fb7185" strokeWidth="2.4" />

        {/* points + labels */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={x(d.x)} cy={y(d.y)} r="3" fill="#fecdd3" stroke="#be123c" strokeWidth="0.8" />
            {d.label && (
              <text x={x(d.x)} y={y(d.y) - 8} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fecaca" fontWeight="bold">
                {d.label === "Today"      ? (kh ? "សព្វថ្ងៃ"        : "Today")
               : d.label === "C3 floor"   ? (kh ? "កម្រិត C3"      : "C3 floor")
               : d.label === "Plants die" ? (kh ? "រុក្ខជាតិស្លាប់" : "Plants die")
               : d.label}
              </text>
            )}
          </g>
        ))}

        {/* x-axis ticks */}
        {[0, 200, 400, 600, 800].map((v, i) => (
          <g key={i}>
            <line x1={x(v)} y1={H - padY} x2={x(v)} y2={H - padY + 4} stroke="#57534e" />
            <text x={x(v)} y={H - padY + 14} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#a8a29e">
              +{v} My
            </text>
          </g>
        ))}

        {/* y-axis */}
        <text x={padX - 6} y={y(420)} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#a8a29e">420</text>
        <text x={padX - 6} y={y(150)} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#a8a29e">150</text>
        <text x={padX - 6} y={H - padY} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#a8a29e">0 ppm</text>
      </svg>
      <div className={`mt-2 text-center text-[11px] text-rose-200 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
        {t(
          "Cross the green line — and photosynthesis ends",
          "ឆ្លងបន្ទាត់បៃតង — ហើយរស្មីសំយោគបញ្ចប់"
        )}
      </div>
    </div>
  );
}
