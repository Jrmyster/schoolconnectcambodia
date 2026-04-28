import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Dna,
  Microscope,
  Cog,
  Zap,
  FlaskConical,
  Thermometer,
  HeartPulse,
  Flame,
  ArrowUpDown,
  Droplets,
  Coins,
  RefreshCw,
  Brain,
  Wind,
  ChevronRight,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Module 09 · Biochemistry — ជីវគីមីវិទ្យា
 * The chemical code of life. DNA, proteins, enzymes.
 * Self-contained. No new dependencies. Custom SVGs only.
 * ══════════════════════════════════════════════════════════════════════════ */

export function BiochemistryPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-violet-50/40 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden">
      <CellBackdrop />

      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
          data-testid="link-back-to-chemistry"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <header className="text-center mb-10" data-testid="biochem-hero">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-violet-600 text-white shadow-lg mb-4">
            <Dna className="w-9 h-9" strokeWidth={2.25} />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700 mb-1 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Module 09 · Chemistry Hub", "មុខវិជ្ជា ០៩ · មជ្ឈមណ្ឌលគីមីវិទ្យា")}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
          >
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
              {t("Biochemistry", "ជីវគីមីវិទ្យា")}
            </span>
          </h1>
          <p
            className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "The chemical code of life. How lifeless atoms combine to build the DNA, proteins, and molecular machines that power your body and every living thing on Earth.",
              "កូដគីមីនៃជីវិត។ របៀបដែលអាតូមឥតព្រលឹងផ្គុំគ្នាបង្កើត ឌីអិនអេ ប្រូតេអ៊ីន និងម៉ាស៊ីនម៉ូលេគុល ដែលផ្ដល់ថាមពលដល់រាងកាយ និងគ្រប់ជីវិតលើផែនដី។",
            )}
          </p>
        </header>

        <DnaSection />
        <ElectronTransportChainSection />
        <MetabolismSection />
        <ProteinSection />
        <EnzymeSection />

        {/* Wrap-up */}
        <section
          className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm"
          data-testid="biochem-wrapup"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h3
                className={`font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "You are chemistry that learned to read",
                  "អ្នកគឺជាគីមីវិទ្យា ដែលរៀនអាន",
                )}
              </h3>
              <p
                className={`text-slate-700 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Every cell in your body is running a quiet factory: DNA hands out blueprints, proteins do the building, enzymes speed up every reaction — all in warm salt water at body temperature. Biochemistry is the bridge between dead matter and life.",
                  "កោសិកានីមួយៗក្នុងរាងកាយរបស់អ្នកកំពុងដំណើរការរោងចក្រស្ងាត់មួយ៖ ឌីអិនអេចែកប្លង់ ប្រូតេអ៊ីនធ្វើការសាងសង់ អង់ស៊ីមបង្កើនល្បឿនរាល់ប្រតិកម្ម — ទាំងអស់នេះក្នុងទឹកអំបិលក្ដៅៗនៅសីតុណ្ហភាពរាងកាយ។ ជីវគីមីវិទ្យាគឺជាស្ពានរវាងសារធាតុគ្មានជីវិត និងជីវិត។",
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Background motif — subtle cell / molecule grid
 * ══════════════════════════════════════════════════════════════════════════ */
function CellBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="cellpat" width="64" height="64" patternUnits="userSpaceOnUse">
            <circle cx="32" cy="32" r="22" fill="none" stroke="#10b981" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="6" fill="#7c3aed" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cellpat)" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 1 — DNA: The Ultimate Map
 * ══════════════════════════════════════════════════════════════════════════ */
function DnaSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Toggle: show double helix or "ladder unzipped"
  const [view, setView] = useState<"helix" | "ladder">("helix");

  // Sample sequence the user can edit
  const [seq, setSeq] = useState<string>("ATGCCTAGGCTAGCTAA");

  const cleaned = useMemo(
    () => seq.toUpperCase().replace(/[^ATCG]/g, "").slice(0, 24),
    [seq],
  );
  const complement = useMemo(
    () =>
      cleaned
        .split("")
        .map((b) => ({ A: "T", T: "A", C: "G", G: "C" }[b] || ""))
        .join(""),
    [cleaned],
  );

  return (
    <section
      className="rounded-3xl border-4 border-emerald-200 bg-white/85 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      data-testid="dna-section"
    >
      <SectionHeader
        kh={kh}
        eyebrow={t("01 · The Ultimate Map", "០១ · ប្លង់ចុងក្រោយបង្អស់")}
        titleEn="DNA — the four-letter alphabet of life"
        titleKh="ឌីអិនអេ — អក្សរបួនតួនៃជីវិត"
        Icon={Dna}
        accent="emerald"
      />

      <p
        className={`text-slate-700 leading-relaxed mb-6 ${
          kh ? "font-khmer text-lg leading-loose" : "text-base sm:text-lg"
        }`}
      >
        {t(
          "Inside every one of your ~30 trillion cells sits a tightly-coiled molecule called DNA — deoxyribonucleic acid. It is a chemical alphabet with only four letters: A, T, C, and G. The order of those letters is the blueprint for every living thing — your eye colour, the shape of a banana, the spots on a leopard.",
          "នៅខាងក្នុងកោសិកានីមួយៗ ក្នុងចំណោម ៣០ ត្រីលានកោសិការបស់អ្នក មានម៉ូលេគុលមួយដែលរុំជិតៗហៅថា ឌីអិនអេ — អាស៊ីតដេអុកស៊ីរីបូនុយក្លេអ៊ីក។ វាជាអក្សរគីមីដែលមានតួអក្សរត្រឹមតែបួន៖ A, T, C និង G។ លំដាប់នៃតួអក្សរទាំងនោះ គឺជាប្លង់សម្រាប់រាល់ជីវិត — ពណ៌ភ្នែករបស់អ្នក រាងចេក អាចម៌លើតួខ្លាដំបង។",
        )}
      </p>

      {/* Key facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <FactCard
          kh={kh}
          headEn="4 letters"
          headKh="៤ តួអក្សរ"
          bodyEn="A · T · C · G — adenine, thymine, cytosine, guanine."
          bodyKh="A · T · C · G — អាដេនីន ធីមីន ស៊ីតូស៊ីន ហ្គួនីន។"
          tone="emerald"
        />
        <FactCard
          kh={kh}
          headEn="2 m of DNA / cell"
          headKh="ឌីអិនអេ ២ ម៉ែត្រ ក្នុងមួយកោសិកា"
          bodyEn="Coiled inside a nucleus only 0.000006 m across."
          bodyKh="រុំនៅក្នុងស្នូលកោសិកាដែលធំត្រឹមតែ ០.០០០០០៦ ម៉ែត្រ។"
          tone="teal"
        />
        <FactCard
          kh={kh}
          headEn="3.2 billion letters"
          headKh="៣.២ ប៊ីលាន តួអក្សរ"
          bodyEn="The full human genome — written in just A, T, C, G."
          bodyKh="ហ្សែនមនុស្សពេញលេញ — សរសេរដោយ A, T, C, G ប៉ុណ្ណោះ។"
          tone="violet"
        />
      </div>

      {/* Toggle helix / ladder */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t("View:", "មើល៖")}
        </span>
        <button
          onClick={() => setView("helix")}
          data-testid="dna-view-helix"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            view === "helix"
              ? "bg-emerald-600 text-white shadow"
              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          } ${kh ? "font-khmer" : ""}`}
        >
          {t("Double helix", "ខ្សែរុំទ្វេរ")}
        </button>
        <button
          onClick={() => setView("ladder")}
          data-testid="dna-view-ladder"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            view === "ladder"
              ? "bg-violet-600 text-white shadow"
              : "bg-violet-50 text-violet-800 hover:bg-violet-100"
          } ${kh ? "font-khmer" : ""}`}
        >
          {t("Unzipped ladder", "ជណ្តើររំសាយ")}
        </button>
      </div>

      <div
        className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-6"
        data-testid="dna-viewer"
      >
        {view === "helix" ? <DoubleHelixSVG /> : <LadderSVG seq={cleaned} comp={complement} />}
      </div>

      {/* Sequence editor */}
      <div className="mt-6">
        <label
          className={`block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t(
            "Type a DNA sequence (only A, T, C, G):",
            "វាយលំដាប់ ឌីអិនអេ (តែ A, T, C, G ប៉ុណ្ណោះ)៖",
          )}
        </label>
        <input
          value={seq}
          onChange={(e) =>
            setSeq(e.target.value.toUpperCase().replace(/[^ATCG]/g, "").slice(0, 24))
          }
          className="w-full font-mono tracking-[0.3em] text-base sm:text-lg uppercase rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none px-4 py-3 bg-white"
          data-testid="dna-sequence-input"
          maxLength={24}
        />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CodeStrand label={t("Your strand", "ខ្សែរបស់អ្នក")} seq={cleaned} color="emerald" testId="dna-strand-input" />
          <CodeStrand
            label={t("Pairs with (complement)", "ផ្គូផ្គងនឹង (បំពេញ)")}
            seq={complement}
            color="violet"
            testId="dna-strand-complement"
          />
        </div>
        <div
          className={`mt-3 text-xs text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "The pairing rule: A always bonds to T, and C always bonds to G. That's how DNA copies itself perfectly when a cell divides.",
            "ច្បាប់ផ្គូផ្គង៖ A ភ្ជាប់ជាមួយ T ជានិច្ច ហើយ C ភ្ជាប់ជាមួយ G ជានិច្ច។ នេះជាមូលហេតុដែល ឌីអិនអេ ចម្លងខ្លួនវាបានយ៉ាងល្អឥតខ្ចោះ ពេលកោសិកាបែងចែក។",
          )}
        </div>
      </div>
    </section>
  );
}

/* ── DNA helpers ─────────────────────────────────────────────────────────── */
function CodeStrand({
  label,
  seq,
  color,
  testId,
}: {
  label: string;
  seq: string;
  color: "emerald" | "violet";
  testId?: string;
}) {
  const baseColor: Record<string, string> = {
    A: "bg-emerald-500",
    T: "bg-amber-500",
    C: "bg-sky-500",
    G: "bg-rose-500",
  };
  const ring = color === "emerald" ? "ring-emerald-200" : "ring-violet-200";

  return (
    <div className={`rounded-xl bg-white border-2 ${ring} ring-2 p-3`} data-testid={testId}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        {seq.split("").map((b, i) => (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-white font-bold text-sm shadow-sm ${
              baseColor[b] || "bg-slate-400"
            }`}
          >
            {b}
          </span>
        ))}
        {seq.length === 0 && (
          <span className="text-slate-400 text-sm italic">—</span>
        )}
      </div>
    </div>
  );
}

function DoubleHelixSVG() {
  // Static double-helix illustration
  const W = 480;
  const H = 200;
  const turns = 4;
  const samples = 80;
  const amp = 36;
  const yMid = H / 2;
  const path1: string[] = [];
  const path2: string[] = [];
  const rungs: { x: number; y1: number; y2: number; pair: [string, string] }[] = [];
  const pairs: [string, string][] = [
    ["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"],
    ["A", "T"], ["G", "C"], ["T", "A"], ["C", "G"],
  ];

  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * W;
    const phase = (i / samples) * Math.PI * 2 * turns;
    const y1 = yMid + Math.sin(phase) * amp;
    const y2 = yMid + Math.sin(phase + Math.PI) * amp;
    path1.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y1.toFixed(1)}`);
    path2.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y2.toFixed(1)}`);

    if (i % 10 === 0 && i > 0 && i < samples) {
      rungs.push({
        x,
        y1,
        y2,
        pair: pairs[(i / 10) % pairs.length],
      });
    }
  }

  const baseColor: Record<string, string> = {
    A: "#10b981",
    T: "#f59e0b",
    C: "#0ea5e9",
    G: "#f43f5e",
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" data-testid="dna-helix-svg">
      {/* rungs first so strands sit on top */}
      {rungs.map((r, idx) => (
        <g key={idx}>
          <line
            x1={r.x}
            x2={r.x}
            y1={r.y1}
            y2={r.y2}
            stroke="#cbd5e1"
            strokeWidth={2}
          />
          <circle cx={r.x} cy={r.y1} r={9} fill={baseColor[r.pair[0]]} />
          <circle cx={r.x} cy={r.y2} r={9} fill={baseColor[r.pair[1]]} />
          <text
            x={r.x}
            y={r.y1 + 3}
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="white"
            fontFamily="monospace"
          >
            {r.pair[0]}
          </text>
          <text
            x={r.x}
            y={r.y2 + 3}
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="white"
            fontFamily="monospace"
          >
            {r.pair[1]}
          </text>
        </g>
      ))}
      <path d={path1.join(" ")} stroke="#10b981" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={path2.join(" ")} stroke="#7c3aed" strokeWidth={4} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LadderSVG({ seq, comp }: { seq: string; comp: string }) {
  const baseColor: Record<string, string> = {
    A: "#10b981",
    T: "#f59e0b",
    C: "#0ea5e9",
    G: "#f43f5e",
  };
  const len = Math.max(seq.length, 1);
  const W = Math.max(360, len * 28 + 40);
  const H = 130;
  const yTop = 35;
  const yBot = 95;
  const gap = (W - 40) / Math.max(len, 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" data-testid="dna-ladder-svg">
      {/* Backbones */}
      <line x1={20} x2={W - 20} y1={yTop} y2={yTop} stroke="#10b981" strokeWidth={4} strokeLinecap="round" />
      <line x1={20} x2={W - 20} y1={yBot} y2={yBot} stroke="#7c3aed" strokeWidth={4} strokeLinecap="round" />
      {seq.split("").map((b, i) => {
        const cx = 20 + (i + 0.5) * gap;
        const c = comp[i];
        return (
          <g key={i}>
            <line x1={cx} x2={cx} y1={yTop} y2={yBot} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 3" />
            <circle cx={cx} cy={yTop} r={11} fill={baseColor[b] || "#94a3b8"} />
            <text x={cx} y={yTop + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">
              {b}
            </text>
            <circle cx={cx} cy={yBot} r={11} fill={baseColor[c] || "#94a3b8"} />
            <text x={cx} y={yBot + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">
              {c}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 02 — The Cellular Engine: The Electron Transport Chain
 *
 * Sits between DNA (01) and Proteins (now 03). Mirrors the styling of the
 * surrounding sections (rounded-3xl + border-4 + white/85 backdrop) but
 * picks a teal accent so it visually nests between the emerald DNA card
 * and the violet Protein card. Headings + technical sub-headings are
 * paired bilingual (EN above, KH below) per the user's strict rule.
 * ══════════════════════════════════════════════════════════════════════════ */
function ElectronTransportChainSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="rounded-3xl border-4 border-teal-200 bg-white/85 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      data-testid="etc-section"
      aria-labelledby="etc-heading"
    >
      {/* Bilingual paired header (EN + KH simultaneously) */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 text-white flex items-center justify-center shadow">
          <Zap className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-teal-700 mb-0.5">
            <span>02 · The Cellular Engine</span>
            <span className="font-khmer normal-case tracking-normal text-xs text-violet-700 ml-2">
              ០២ · ម៉ាស៊ីនកោសិកា
            </span>
          </div>
          <h2
            id="etc-heading"
            className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug"
          >
            <span className="block">The Electron Transport Chain</span>
            <span className="block font-khmer text-lg sm:text-xl font-bold text-teal-800 mt-1 leading-relaxed">
              ច្រវ៉ាក់ដឹកជញ្ជូនអេឡិចត្រុង
            </span>
          </h2>
        </div>
      </div>

      <p
        className={`text-slate-700 leading-relaxed mb-6 ${
          kh ? "font-khmer text-lg leading-loose" : "text-base sm:text-lg"
        }`}
      >
        {t(
          "Inside every one of your cells is a tiny power station called the mitochondrion. The Electron Transport Chain (ETC) is the engine inside that station — and it is the single reason a chocolate bar can become the energy that lets you run, think, and breathe.",
          "នៅខាងក្នុងកោសិកានីមួយៗរបស់អ្នក មានរោងចក្រថាមពលតូចមួយដែលហៅថា មីតូខុនដ្រី។ ច្រវ៉ាក់ដឹកជញ្ជូនអេឡិចត្រុង (ETC) គឺជាម៉ាស៊ីននៅក្នុងរោងចក្រនោះ — ហើយវាគឺជាមូលហេតុតែមួយគត់ ដែលដុំសូកូឡាមួយ អាចក្លាយជាថាមពលដែលអនុញ្ញាតឱ្យអ្នករត់ គិត និងដកដង្ហើម។",
        )}
      </p>

      {/* ── Sub-section 1: The Microscopic Dam ─────────────────────── */}
      <div
        className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 p-5 sm:p-6 mb-6"
        data-testid="etc-microscopic-dam"
      >
        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">
          <span className="block">The Microscopic Dam</span>
          <span className="block font-khmer text-base font-bold text-emerald-700 mt-1 leading-relaxed">
            ទំនប់វារីអគ្គិសនីមីក្រូទស្សន៍
          </span>
        </h3>
        <p
          className={`text-slate-700 leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Imagine a hydroelectric dam — but shrunk down a billion times and built into the wall of every cell in your body. The ETC takes the energy from the food you eat and uses it to pump tiny positive particles called ",
            "ស្រមៃមើលទំនប់វារីអគ្គិសនីមួយ — ប៉ុន្តែបង្រួញតូចមួយប៊ីលានដង ហើយសាងសង់នៅក្នុងជញ្ជាំងកោសិកានីមួយៗក្នុងរាងកាយរបស់អ្នក។ ETC យកថាមពលពីអាហារដែលអ្នកញ៉ាំ ហើយប្រើវាដើម្បីបូមភាគល្អិតមានបន្ទុកវិជ្ជមានតូចៗដែលហៅថា ",
          )}
          <span className="text-teal-700 font-semibold">
            {t("protons (H+)", "ប្រូតុង (H+)")}
          </span>
          {t(
            " across a thin membrane. As more and more protons pile up on one side, an intense pressure builds — exactly like water rising behind a dam wall.",
            " ឆ្លងកាត់ភ្នាសស្តើងមួយ។ នៅពេលដែលប្រូតុងកាន់តែច្រើនកក្រោលនៅម្ខាង សម្ពាធដ៏ខ្លាំងមួយត្រូវបានកសាងឡើង — ដូចគ្នាបេះបិទនឹងទឹកដែលឡើងនៅពីក្រោយជញ្ជាំងទំនប់។",
          )}
        </p>
      </div>

      {/* ── Sub-section 2: The Steps of Power ──────────────────────── */}
      <div className="mb-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-4 leading-snug">
          <span className="block">The Steps of Power</span>
          <span className="block font-khmer text-base font-bold text-violet-700 mt-1 leading-relaxed">
            ជំហាននៃថាមពល
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <ETCStep
            kh={kh}
            stepEn="Step 1 · The Fuel"
            stepKh="ជំហាន ១ · ឥន្ធនៈ"
            titleEn="Where the energy comes from"
            titleKh="តើថាមពលមកពីណា"
            Icon={Flame}
            tone="emerald"
            testId="etc-step-fuel"
            bodyEn={
              <>
                Molecules made from your food — the most famous one is called{" "}
                <span className="text-emerald-700 font-bold">NADH</span> —
                arrive at the start of the chain and{" "}
                <span className="text-emerald-700 font-semibold">
                  drop off high-energy electrons
                </span>
                . Think of NADH as the delivery truck that pulls up to the
                power plant carrying the day's load of fuel.
              </>
            }
            bodyKh={
              <>
                ម៉ូលេគុលដែលបង្កើតពីអាហាររបស់អ្នក — ដែលល្បីបំផុតគឺ{" "}
                <span className="text-emerald-700 font-bold">NADH</span> —
                មកដល់ដើមច្រវ៉ាក់ ហើយ{" "}
                <span className="text-emerald-700 font-semibold">
                  ទម្លាក់អេឡិចត្រុងថាមពលខ្ពស់
                </span>
                ។ ស្រមៃមើល NADH ជាឡានដឹកទំនិញ ដែលឈប់នៅរោងចក្រថាមពល
                ហើយដឹកបន្ទុកឥន្ធនៈរបស់ថ្ងៃនោះ។
              </>
            }
          />

          <ETCStep
            kh={kh}
            stepEn="Step 2 · The Pumps"
            stepKh="ជំហាន ២ · ម៉ាស៊ីនបូម"
            titleEn="Building the pressure"
            titleKh="ការកសាងសម្ពាធ"
            Icon={ArrowUpDown}
            tone="teal"
            testId="etc-step-pumps"
            bodyEn={
              <>
                As the electrons{" "}
                <span className="text-teal-700 font-semibold">
                  bounce down the chain
                </span>{" "}
                from one protein to the next, their energy is harvested at
                each step and used to{" "}
                <span className="text-teal-700 font-semibold">
                  pump protons across the mitochondrial membrane
                </span>
                . The result: a massive build-up of positive charge stored
                up like the water behind the dam.
              </>
            }
            bodyKh={
              <>
                នៅពេលដែលអេឡិចត្រុង{" "}
                <span className="text-teal-700 font-semibold">
                  លោតចុះតាមច្រវ៉ាក់
                </span>{" "}
                ពីប្រូតេអ៊ីនមួយទៅប្រូតេអ៊ីនមួយទៀត ថាមពលរបស់វា
                ត្រូវបានប្រមូលនៅជំហាននីមួយៗ ហើយប្រើដើម្បី{" "}
                <span className="text-teal-700 font-semibold">
                  បូមប្រូតុងឆ្លងកាត់ភ្នាសមីតូខុនដ្រី
                </span>
                ។ លទ្ធផល៖ ការកក្រោលដ៏ច្រើននៃបន្ទុកវិជ្ជមាន
                ដែលរក្សាទុកដូចទឹកនៅពីក្រោយទំនប់។
              </>
            }
          />

          <ETCStep
            kh={kh}
            stepEn="Step 3 · The Turbine"
            stepKh="ជំហាន ៣ · ទួរប៊ីន"
            titleEn="Generating the battery"
            titleKh="ការបង្កើតថ្មពិល"
            Icon={Cog}
            tone="violet"
            testId="etc-step-turbine"
            bodyEn={
              <>
                The trapped protons can't stay put forever — they{" "}
                <span className="text-violet-700 font-semibold">
                  rush back through a spinning molecular machine
                </span>{" "}
                called{" "}
                <span className="text-violet-700 font-bold">ATP Synthase</span>
                . As it spins, ATP Synthase generates{" "}
                <span className="text-violet-700 font-bold">ATP</span> — the
                tiny rechargeable battery that powers nearly every action
                in the human body, from blinking to lifting weights.
              </>
            }
            bodyKh={
              <>
                ប្រូតុងដែលជាប់ មិនអាចស្ថិតនៅនឹងកន្លែងជារៀងរហូត —
                ពួកវា{" "}
                <span className="text-violet-700 font-semibold">
                  រត់ត្រឡប់មកវិញ ឆ្លងកាត់ម៉ាស៊ីនម៉ូលេគុលដែលវិល
                </span>{" "}
                ដែលហៅថា{" "}
                <span className="text-violet-700 font-bold">
                  ATP Synthase
                </span>
                ។ ខណៈពេលដែលវាវិល ATP Synthase បង្កើត{" "}
                <span className="text-violet-700 font-bold">ATP</span> —
                ថ្មពិលតូចដែលអាចបញ្ចូលថ្មបាន
                ដែលផ្តល់ថាមពលដល់សកម្មភាពស្ទើរតែគ្រប់យ៉ាងក្នុងរាងកាយមនុស្ស
                ចាប់ពីការព្រិចភ្នែករហូតដល់ការលើកទម្ងន់។
              </>
            }
          />

          <ETCStep
            kh={kh}
            stepEn="Step 4 · The Exhaust"
            stepKh="ជំហាន ៤ · សំណល់"
            titleEn="Why we breathe oxygen"
            titleKh="ហេតុអ្វីបានជាយើងដកដង្ហើមអុកស៊ីសែន"
            Icon={Droplets}
            tone="sky"
            testId="etc-step-exhaust"
            bodyEn={
              <>
                At the very end of the chain, the used-up electrons need
                somewhere to go. This is where{" "}
                <span className="text-sky-700 font-bold">oxygen (O₂)</span>{" "}
                steps in: it{" "}
                <span className="text-sky-700 font-semibold">
                  catches the spent electrons
                </span>{" "}
                and combines them with hydrogen to safely form{" "}
                <span className="text-sky-700 font-bold">water (H₂O)</span>.
                <span className="block mt-2 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-amber-900">
                  This is the exact reason human beings need to breathe
                  oxygen — without it, the chain would clog up in seconds
                  and your cells would have no way to make ATP.
                </span>
              </>
            }
            bodyKh={
              <>
                នៅចុងបញ្ចប់នៃច្រវ៉ាក់ អេឡិចត្រុងដែលប្រើរួច
                ត្រូវការកន្លែងណាមួយដើម្បីទៅ។ នេះគឺជាកន្លែងដែល{" "}
                <span className="text-sky-700 font-bold">
                  អុកស៊ីសែន (O₂)
                </span>{" "}
                ចូលរួម៖ វា{" "}
                <span className="text-sky-700 font-semibold">
                  ចាប់យកអេឡិចត្រុងដែលប្រើរួច
                </span>{" "}
                ហើយផ្សំជាមួយអ៊ីដ្រូសែន ដើម្បីបង្កើតជា{" "}
                <span className="text-sky-700 font-bold">ទឹក (H₂O)</span>{" "}
                ដោយសុវត្ថិភាព។
                <span className="block mt-2 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-amber-900 font-khmer leading-loose">
                  នេះគឺជាមូលហេតុពិតប្រាកដ ដែលមនុស្សត្រូវដកដង្ហើមអុកស៊ីសែន
                  — បើគ្មានវាទេ ច្រវ៉ាក់នឹងស្ទះក្នុងពេលពីរបីវិនាទី
                  ហើយកោសិការបស់អ្នកនឹងគ្មានវិធីបង្កើត ATP ឡើយ។
                </span>
              </>
            }
          />
        </div>
      </div>

      {/* Compact ETC schematic */}
      <ETCSchematic kh={kh} />

      {/* Closing one-liner */}
      <div
        className={`mt-5 rounded-xl border-l-4 border-teal-500 bg-teal-50/70 p-4 text-sm text-slate-800 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {t(
          "Every breath you take feeds this dam. Every ATP it makes runs your body. The Electron Transport Chain is the bridge between food, air, and life itself.",
          "រាល់ដង្ហើមដែលអ្នកដក ផ្តល់ឱ្យទំនប់នេះ។ រាល់ ATP ដែលវាបង្កើត ដំណើរការរាងកាយរបស់អ្នក។ ច្រវ៉ាក់ដឹកជញ្ជូនអេឡិចត្រុង គឺជាស្ពានរវាងអាហារ ខ្យល់ និងជីវិតផ្ទាល់។",
        )}
      </div>
    </section>
  );
}

/* ── ETC Step sub-card ─────────────────────────────────────────────────── */
function ETCStep({
  kh,
  stepEn,
  stepKh,
  titleEn,
  titleKh,
  Icon,
  tone,
  bodyEn,
  bodyKh,
  testId,
}: {
  kh: boolean;
  stepEn: string;
  stepKh: string;
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: "emerald" | "teal" | "violet" | "sky";
  bodyEn: React.ReactNode;
  bodyKh: React.ReactNode;
  testId: string;
}) {
  const styles = {
    emerald: {
      border: "border-emerald-200",
      ring: "ring-emerald-100",
      bg: "bg-emerald-50/40",
      icon: "bg-emerald-600",
      step: "text-emerald-700",
      title: "text-emerald-800",
    },
    teal: {
      border: "border-teal-200",
      ring: "ring-teal-100",
      bg: "bg-teal-50/40",
      icon: "bg-teal-600",
      step: "text-teal-700",
      title: "text-teal-800",
    },
    violet: {
      border: "border-violet-200",
      ring: "ring-violet-100",
      bg: "bg-violet-50/40",
      icon: "bg-violet-600",
      step: "text-violet-700",
      title: "text-violet-800",
    },
    sky: {
      border: "border-sky-200",
      ring: "ring-sky-100",
      bg: "bg-sky-50/40",
      icon: "bg-sky-600",
      step: "text-sky-700",
      title: "text-sky-800",
    },
  }[tone];

  return (
    <article
      data-testid={testId}
      className={`rounded-2xl border-2 ${styles.border} ring-1 ${styles.ring} ${styles.bg} bg-white p-4 sm:p-5 shadow-sm`}
    >
      <header className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl ${styles.icon} text-white flex items-center justify-center shadow`}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div className="min-w-0">
          <div
            className={`text-[10px] font-bold uppercase tracking-[0.2em] ${styles.step} mb-0.5`}
          >
            <span>{stepEn}</span>
            <span
              className={`font-khmer normal-case tracking-normal text-xs ml-2 ${styles.step}`}
            >
              {stepKh}
            </span>
          </div>
          <h4 className="font-display font-bold text-slate-900 leading-snug">
            <span className="block text-base">{titleEn}</span>
            <span
              className={`block font-khmer text-sm font-semibold mt-0.5 leading-relaxed ${styles.title}`}
            >
              {titleKh}
            </span>
          </h4>
        </div>
      </header>
      <div
        className={`text-sm text-slate-700 leading-relaxed ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {kh ? bodyKh : bodyEn}
      </div>
    </article>
  );
}

/* ── ETC schematic — minimal SVG of dam → pumps → turbine → exhaust ───── */
function ETCSchematic({ kh }: { kh: boolean }) {
  return (
    <div
      className="rounded-2xl border border-teal-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5"
      data-testid="etc-schematic"
    >
      <p
        className={`text-xs uppercase tracking-widest text-teal-700 font-bold mb-3 ${
          kh ? "font-khmer normal-case tracking-normal" : ""
        }`}
      >
        {kh
          ? "ផែនទីទំនប់ — ដំណើរការដ៏សាមញ្ញ"
          : "Dam Map — the flow at a glance"}
        <span
          className={`ml-2 font-normal text-slate-500 ${
            kh ? "font-display normal-case" : "font-khmer"
          }`}
        >
          {kh ? "Dam Map" : "ផែនទីទំនប់"}
        </span>
      </p>
      <svg
        viewBox="0 0 600 200"
        className="w-full h-auto"
        role="img"
        aria-label={
          kh
            ? "ច្រវ៉ាក់ដឹកជញ្ជូនអេឡិចត្រុង"
            : "Electron Transport Chain schematic"
        }
      >
        <defs>
          <linearGradient id="etc-mem" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Two-layer membrane */}
        <rect x="20" y="86" width="560" height="6" rx="3" fill="url(#etc-mem)" />
        <rect x="20" y="118" width="560" height="6" rx="3" fill="url(#etc-mem)" />
        <text x="20" y="78" fontSize="10" fill="#0f766e" fontWeight="700">
          {kh ? "ខាងក្រៅ (ច្រើនប្រូតុង)" : "Outer side  (lots of H+)"}
        </text>
        <text x="20" y="146" fontSize="10" fill="#6d28d9" fontWeight="700">
          {kh ? "ខាងក្នុង (តិចប្រូតុង)" : "Inner side  (few H+)"}
        </text>

        {/* Pump 1, 2, 3 */}
        {[140, 260, 380].map((cx, i) => (
          <g key={i}>
            <rect x={cx - 22} y="80" width="44" height="48" rx="8" fill="#0d9488" />
            <text x={cx} y="110" textAnchor="middle" fontSize="11" fill="white" fontWeight="700">
              {kh ? "បូម" : "Pump"}
            </text>
            {/* H+ being pushed up */}
            <text x={cx} y="68" textAnchor="middle" fontSize="14" fill="#0f766e" fontWeight="900">
              H⁺ ↑
            </text>
          </g>
        ))}

        {/* ATP Synthase turbine */}
        <g>
          <circle cx="490" cy="104" r="26" fill="#7c3aed" />
          <circle cx="490" cy="104" r="14" fill="#a78bfa" />
          <text x="490" y="64" textAnchor="middle" fontSize="11" fill="#6d28d9" fontWeight="800">
            H⁺ ↓
          </text>
          <text x="490" y="156" textAnchor="middle" fontSize="11" fill="#6d28d9" fontWeight="800">
            ATP ✦
          </text>
        </g>

        {/* Fuel arrow into pump 1 */}
        <g>
          <line x1="40" y1="50" x2="118" y2="80" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="118,80 110,72 110,82" fill="#10b981" />
          <text x="40" y="44" fontSize="11" fill="#047857" fontWeight="800">
            NADH →
          </text>
        </g>

        {/* Exhaust: O2 + e- → H2O on the right side, after turbine */}
        <g>
          <line x1="540" y1="155" x2="568" y2="172" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="568,172 558,168 562,178" fill="#0284c7" />
          <text x="540" y="190" fontSize="11" fill="#075985" fontWeight="800">
            O₂ + e⁻ → H₂O
          </text>
        </g>
      </svg>
      <p
        className={`text-xs text-slate-500 text-center mt-2 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {kh
          ? "ឥន្ធនៈ → ម៉ាស៊ីនបូម (ផ្ទុកសម្ពាធ) → ទួរប៊ីន ATP → សំណល់ទឹក"
          : "Fuel → Pumps build pressure → ATP turbine → water exhaust"}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3 — Metabolism: The Energy Economy
 *   ▸ Glycolysis           (catabolic — green)   "the quick cash"
 *   ▸ The Krebs Cycle      (catabolic — teal)    "the deep harvest"
 *   ▸ Gluconeogenesis      (anabolic  — violet)  "reverse engineering"
 *
 * Aesthetic: clean white cards, soft mint-green borders for catabolic
 * (breaking-down) pathways and soft violet for the anabolic (building-up)
 * pathway. Crisp sans-serif typography. Tiny inline carbon-flow strips
 * instead of giant chemical web diagrams.
 * ══════════════════════════════════════════════════════════════════════════ */
function MetabolismSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="rounded-3xl border-4 border-emerald-200 bg-white/85 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      data-testid="metabolism-section"
      aria-labelledby="metabolism-heading"
    >
      {/* Bilingual paired header (EN + KH simultaneously) */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-violet-600 text-white flex items-center justify-center shadow">
          <Coins className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-0.5">
            <span>03 · The Energy Economy</span>
            <span className="font-khmer normal-case tracking-normal text-xs text-violet-700 ml-2">
              ០៣ · សេដ្ឋកិច្ចថាមពល
            </span>
          </div>
          <h2
            id="metabolism-heading"
            className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug"
          >
            <span className="block">Metabolism — the city of trades inside every cell</span>
            <span className="block font-khmer text-lg sm:text-xl font-bold text-emerald-800 mt-1 leading-relaxed">
              ការរំលាយអាហារ — ទីក្រុងនៃការដោះដូរនៅក្នុងកោសិកានីមួយៗ
            </span>
          </h2>
        </div>
      </div>

      {/* Bilingual intro — paired EN + KH so both are always visible */}
      <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-2">
        Your cells run a tiny economy 24 hours a day. Some pathways{" "}
        <strong className="text-emerald-700">break things down</strong> to harvest
        energy (catabolism). Others <strong className="text-violet-700">build things up</strong>{" "}
        when supplies run low (anabolism). Three pathways do most of the work.
      </p>
      <p className="font-khmer text-slate-700 leading-loose mb-6 border-t border-emerald-100 pt-3">
        កោសិការបស់អ្នកដំណើរការសេដ្ឋកិច្ចតូចមួយ ២៤ ម៉ោងក្នុងមួយថ្ងៃ។ ផ្លូវខ្លះ{" "}
        <strong className="text-emerald-700">បំបែករបស់ចុះ</strong> ដើម្បីប្រមូលថាមពល (Catabolism)។ ផ្លូវខ្លះទៀត{" "}
        <strong className="text-violet-700">សាងសង់របស់ឡើង</strong> នៅពេលដែលផ្គត់ផ្គង់ខ្វះ (Anabolism)។ ផ្លូវចម្បងទាំងបី ធ្វើការងារភាគច្រើន។
      </p>

      <div className="space-y-5">
        <PathwayCard
          tone="emerald"
          mode={{ en: "Catabolic · Breaking Down", kh: "Catabolic · បំបែក" }}
          numberLabel={{ en: "Pathway 01", kh: "ផ្លូវ ០១" }}
          titleEn="Glycolysis — The Quick Cash"
          titleKh="គ្លីកូលីស — សាច់ប្រាក់រហ័ស"
          Icon={Zap}
          paragraphEn={
            <>
              This happens in the cell's <strong>cytoplasm</strong> — the watery
              soup outside the mitochondrion. It takes a single 6-carbon sugar
              molecule called <em className="text-emerald-700 font-semibold">Glucose (គ្លុយកូស)</em> and
              violently <strong>snaps it in half</strong> into two 3-carbon pieces called{" "}
              <em className="text-emerald-700 font-semibold">Pyruvate (ពីរុយវ៉ាត)</em>.
            </>
          }
          paragraphKh={
            <>
              ដំណើរការនេះកើតឡើងនៅក្នុង <strong>ស៊ីតូប្លាស</strong> របស់កោសិកា — ទឹកក្នុងកោសិកានៅខាងក្រៅមីតូខុនដ្រី។ វាយក ម៉ូលេគុលស្ករ ៦-កាបូនមួយ ដែលហៅថា{" "}
              <em className="text-emerald-700 font-semibold">Glucose (គ្លុយកូស)</em> ហើយ{" "}
              <strong>បំបាក់វាជាពីរ</strong> យ៉ាងខ្លាំង ទៅជាពីរបំណែកដែលមាន ៣-កាបូន ហៅថា{" "}
              <em className="text-emerald-700 font-semibold">Pyruvate (ពីរុយវ៉ាត)</em>។
            </>
          }
          flow={
            <CarbonFlow
              tone="emerald"
              steps={[
                { label: "Glucose", sub: "C₆", colorClass: "bg-emerald-600" },
                { label: "split!", sub: "in half", colorClass: "bg-emerald-400 italic" },
                { label: "Pyruvate", sub: "C₃", colorClass: "bg-emerald-500" },
                { label: "Pyruvate", sub: "C₃", colorClass: "bg-emerald-500" },
              ]}
            />
          }
          stats={[
            { en: "Location · Cytoplasm", kh: "ទីតាំង · ស៊ីតូប្លាស" },
            { en: "Speed · Very fast", kh: "ល្បឿន · លឿនបំផុត" },
            { en: "Oxygen · Not needed", kh: "អុកស៊ីហ្សែន · មិនត្រូវការ" },
            { en: "Yield · 2 ATP (small)", kh: "ទិន្នផល · 2 ATP (តិច)" },
          ]}
          footnoteEn="The emergency power system. When you sprint or lift heavy weights, your muscles run on glycolysis."
          footnoteKh="ប្រព័ន្ធថាមពលសង្គ្រោះបន្ទាន់។ នៅពេលអ្នករត់ល្បឿនលឿន ឬលើករបស់ធ្ងន់ សាច់ដុំរបស់អ្នកដំណើរការដោយ Glycolysis។"
          testid="pathway-glycolysis"
        />

        <PathwayCard
          tone="teal"
          mode={{ en: "Catabolic · Deep Harvest", kh: "Catabolic · ការប្រមូលផលជ្រៅ" }}
          numberLabel={{ en: "Pathway 02", kh: "ផ្លូវ ០២" }}
          titleEn="The Krebs Cycle — The Deep Harvest"
          titleKh="វដ្ត Krebs — ការប្រមូលផលជ្រៅ"
          Icon={RefreshCw}
          paragraphEn={
            <>
              Also called the <strong>Citric Acid Cycle</strong>. It happens deep inside
              the <strong>mitochondria</strong>. It takes those broken-in-half sugar pieces
              and <strong>slowly strips away every single high-energy electron</strong> they
              have left, releasing <em className="text-teal-700 font-semibold">Carbon Dioxide (CO₂)</em>{" "}
              as waste — yes, the same CO₂ you breathe out. The harvested electrons are loaded
              onto <em className="text-teal-700 font-semibold">"shuttle buses"</em> called{" "}
              <strong>NADH</strong> and <strong>FADH₂</strong> and dropped off at the Electron
              Transport Chain to be turned into ATP.
            </>
          }
          paragraphKh={
            <>
              ហៅផងដែរថា <strong>វដ្តអាស៊ីតស៊ីទ្រិក</strong>។ វាកើតឡើងនៅជ្រៅក្នុង <strong>មីតូខុនដ្រី</strong>។ វាយកបំណែកស្ករដែលត្រូវបានបំបាក់ ហើយ <strong>ដក​យកអេឡិចត្រុងថាមពលខ្ពស់ទាំងអស់ចេញបន្តិចម្ដងៗ</strong> ដោយបញ្ចេញ{" "}
              <em className="text-teal-700 font-semibold">កាបូនឌីអុកស៊ីត (CO₂)</em>{" "}
              ជាសំណល់ — មែនហើយ វាគឺជា CO₂ ដូចគ្នាដែលអ្នកដកដង្ហើមចេញ។ អេឡិចត្រុងដែលប្រមូលបាន ត្រូវបានដាក់លើ{" "}
              <em className="text-teal-700 font-semibold">"ឡានដឹកអ្នកដំណើរ"</em> ឈ្មោះ{" "}
              <strong>NADH</strong> និង <strong>FADH₂</strong> ហើយដឹកទៅទម្លាក់នៅច្រវ៉ាក់ដឹកជញ្ជូនអេឡិចត្រុង (ETC) ដើម្បីប្ដូរទៅជា ATP។
            </>
          }
          flow={
            <CarbonFlow
              tone="teal"
              steps={[
                { label: "Pyruvate", sub: "C₃", colorClass: "bg-teal-600" },
                { label: "Krebs", sub: "cycle ↻", colorClass: "bg-teal-500" },
                { label: "CO₂", sub: "exhaled", colorClass: "bg-sky-500" },
                { label: "NADH/FADH₂", sub: "→ ETC", colorClass: "bg-violet-600" },
              ]}
            />
          }
          stats={[
            { en: "Location · Mitochondria", kh: "ទីតាំង · មីតូខុនដ្រី" },
            { en: "Waste · CO₂ (you exhale)", kh: "សំណល់ · CO₂ (ដង្ហើមចេញ)" },
            { en: "Carries · NADH, FADH₂", kh: "ដឹកជញ្ជូន · NADH, FADH₂" },
            { en: "Hands off to · the ETC", kh: "ប្រគល់ឱ្យ · ETC" },
          ]}
          footnoteEn="The slow, oxygen-loving harvest. Every breath you exhale is partly CO₂ leaving here."
          footnoteKh="ការប្រមូលផលយឺត ស្រឡាញ់អុកស៊ីហ្សែន។ រាល់ដង្ហើមដែលអ្នកដកចេញ មានផ្នែកនៃ CO₂ ចេញពីទីនេះ។"
          testid="pathway-krebs"
        />

        <PathwayCard
          tone="violet"
          mode={{ en: "Anabolic · Building Up", kh: "Anabolic · សាងសង់ឡើង" }}
          numberLabel={{ en: "Pathway 03", kh: "ផ្លូវ ០៣" }}
          titleEn="Gluconeogenesis — Reverse Engineering"
          titleKh="គ្លុយកូនេអូសេណេស — វិស្វកម្មបញ្ច្រាស"
          Icon={Brain}
          paragraphEn={
            <>
              Your <strong>brain runs almost entirely on sugar</strong>. If you are
              starving, fasting, or sleeping for 12 hours, the{" "}
              <strong className="text-violet-700">liver</strong> performs a chemical miracle.
              It runs glycolysis <strong>in reverse</strong>, taking random spare parts —{" "}
              fat byproducts, lactate from tired muscles, leftover{" "}
              <em className="text-violet-700 font-semibold">amino acids</em> from broken-down protein —
              and <strong>spends ATP</strong> to glue them back together into{" "}
              brand-new <em className="text-violet-700 font-semibold">Glucose (គ្លុយកូស)</em>{" "}
              to keep the brain alive.
            </>
          }
          paragraphKh={
            <>
              <strong>ខួរក្បាលរបស់អ្នកដំណើរការស្ទើរតែទាំងស្រុងលើស្ករ</strong>។ ប្រសិនបើអ្នកអត់អាហារ តមអាហារ ឬដេក ១២ ម៉ោង{" "}
              <strong className="text-violet-700">ថ្លើម</strong> នឹងធ្វើការអព្ភូតហេតុគីមីមួយ។ វាដំណើរការ Glycolysis{" "}
              <strong>បញ្ច្រាស</strong> ដោយយកគ្រឿងបន្ទាប់បន្សំ — សំណល់ជាតិខ្លាញ់ Lactate ពីសាច់ដុំអស់កម្លាំង{" "}
              <em className="text-violet-700 font-semibold">អាស៊ីតអាមីណូ</em> ដែលនៅសល់ពីប្រូតេអ៊ីនដែលត្រូវបំបាក់ —{" "}
              ហើយ <strong>ចំណាយ ATP</strong> ដើម្បីផ្គុំវាឡើងវិញទៅជា{" "}
              <em className="text-violet-700 font-semibold">Glucose (គ្លុយកូស)</em>{" "}
              ថ្មីស្រឡាង ដើម្បីរក្សាខួរក្បាលឱ្យនៅរស់។
            </>
          }
          flow={
            <CarbonFlow
              tone="violet"
              reverse
              steps={[
                { label: "spare parts", sub: "amino + fat", colorClass: "bg-slate-500" },
                { label: "Liver", sub: "ATP spent", colorClass: "bg-violet-600" },
                { label: "Glucose", sub: "C₆ rebuilt", colorClass: "bg-emerald-600" },
                { label: "Brain fed", sub: "ខួរក្បាល", colorClass: "bg-violet-500" },
              ]}
            />
          }
          stats={[
            { en: "Location · Liver", kh: "ទីតាំង · ថ្លើម" },
            { en: "When · Fasting / starving", kh: "ពេលណា · តមអាហារ / អត់ឃ្លាន" },
            { en: "Costs · ATP (uses energy)", kh: "ចំណាយ · ATP (ប្រើថាមពល)" },
            { en: "Saves · the brain", kh: "សង្គ្រោះ · ខួរក្បាល" },
          ]}
          footnoteEn="The body's lifeline for the brain. The opposite direction of glycolysis — and the reason you don't pass out overnight."
          footnoteKh="ខ្សែជីវិតរបស់រាងកាយសម្រាប់ខួរក្បាល។ ទិសផ្ទុយនឹង Glycolysis — ហើយជាមូលហេតុដែលអ្នកមិនសន្លប់នៅពេលយប់។"
          testid="pathway-gluconeogenesis"
        />
      </div>

      {/* Closing economy summary */}
      <div className="mt-6 rounded-2xl border-2 border-dashed border-emerald-300/70 bg-gradient-to-br from-emerald-50/80 via-white to-violet-50/70 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600 text-white flex items-center justify-center shadow">
            <ArrowUpDown className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong className="text-slate-900">The big picture:</strong>{" "}
              <span className="text-emerald-700 font-semibold">Glycolysis</span> +{" "}
              <span className="text-teal-700 font-semibold">Krebs</span> tear glucose apart
              to make <strong>ATP</strong>. When food runs out,{" "}
              <span className="text-violet-700 font-semibold">Gluconeogenesis</span>{" "}
              spends ATP to put glucose back together. Your body is constantly trading
              one currency for the other.
            </p>
            <p className="font-khmer text-sm sm:text-base text-slate-700 leading-loose border-t border-emerald-200/60 pt-2">
              <strong className="text-slate-900">រូបភាពធំ៖</strong>{" "}
              <span className="text-emerald-700 font-semibold">Glycolysis</span> +{" "}
              <span className="text-teal-700 font-semibold">Krebs</span> បំបែក Glucose ដើម្បីបង្កើត <strong>ATP</strong>។ នៅពេលអាហារអស់{" "}
              <span className="text-violet-700 font-semibold">Gluconeogenesis</span>{" "}
              ចំណាយ ATP ដើម្បីដាក់ Glucose ឡើងវិញ។ រាងកាយរបស់អ្នកកំពុងដោះដូររូបិយប័ណ្ណមួយទៅរូបិយប័ណ្ណមួយទៀតឥតឈប់ឈរ។
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pathway card · stacked, full-width, soft pastel border by mode ─────── */
type PathwayTone = "emerald" | "teal" | "violet";
function PathwayCard({
  tone,
  mode,
  numberLabel,
  titleEn,
  titleKh,
  Icon,
  paragraphEn,
  paragraphKh,
  flow,
  stats,
  footnoteEn,
  footnoteKh,
  testid,
}: {
  tone: PathwayTone;
  mode: { en: string; kh: string };
  numberLabel: { en: string; kh: string };
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  paragraphEn: React.ReactNode;
  paragraphKh: React.ReactNode;
  flow: React.ReactNode;
  stats: { en: string; kh: string }[];
  footnoteEn: string;
  footnoteKh: string;
  testid: string;
}) {
  const styles = {
    emerald: {
      ring: "border-emerald-200",
      bg: "bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30",
      chipBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      iconBg: "bg-emerald-600",
      titleColor: "text-emerald-800",
      statBorder: "border-emerald-200 bg-emerald-50/60",
    },
    teal: {
      ring: "border-teal-200",
      bg: "bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/30",
      chipBg: "bg-teal-100 text-teal-800 border-teal-300",
      iconBg: "bg-teal-600",
      titleColor: "text-teal-800",
      statBorder: "border-teal-200 bg-teal-50/60",
    },
    violet: {
      ring: "border-violet-200",
      bg: "bg-gradient-to-br from-violet-50/70 via-white to-violet-50/30",
      chipBg: "bg-violet-100 text-violet-800 border-violet-300",
      iconBg: "bg-violet-600",
      titleColor: "text-violet-800",
      statBorder: "border-violet-200 bg-violet-50/60",
    },
  }[tone];

  return (
    <article
      data-testid={testid}
      className={`rounded-2xl border-2 ${styles.ring} ${styles.bg} p-5 sm:p-6 shadow-sm`}
    >
      {/* Card header — paired bilingual */}
      <header className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl ${styles.iconBg} text-white flex items-center justify-center shadow`}
        >
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {numberLabel.en}
            </span>
            <span className="font-khmer text-[11px] text-slate-500">
              {numberLabel.kh}
            </span>
            <span
              className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${styles.chipBg}`}
            >
              {mode.en}
            </span>
            <span
              className={`font-khmer inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border ${styles.chipBg}`}
            >
              {mode.kh}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            <span className="block">{titleEn}</span>
            <span
              className={`block font-khmer text-base sm:text-lg font-bold mt-1 leading-relaxed ${styles.titleColor}`}
            >
              {titleKh}
            </span>
          </h3>
        </div>
      </header>

      {/* Bilingual explanation */}
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
        {paragraphEn}
      </p>
      <p className="font-khmer text-slate-700 leading-loose border-t border-slate-200/60 mt-3 pt-3">
        {paragraphKh}
      </p>

      {/* Carbon-flow visual strip */}
      <div className="mt-4">{flow}</div>

      {/* Stat row — paired bilingual */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-lg border ${styles.statBorder} px-3 py-2`}
          >
            <div className="text-[11px] font-bold text-slate-700 leading-tight">
              {s.en}
            </div>
            <div className="font-khmer text-[11px] text-slate-600 leading-relaxed mt-0.5">
              {s.kh}
            </div>
          </div>
        ))}
      </div>

      {/* Real-world footnote */}
      <div className="mt-4 rounded-lg bg-white/70 border border-slate-200 px-3 py-2 space-y-1">
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
          {footnoteEn}
        </p>
        <p className="font-khmer text-xs sm:text-sm text-slate-600 italic leading-loose">
          {footnoteKh}
        </p>
      </div>
    </article>
  );
}

/* ── Carbon-flow strip · tiny pill chain showing carbon/energy direction ── */
function CarbonFlow({
  steps,
  tone,
  reverse = false,
}: {
  steps: { label: string; sub: string; colorClass: string }[];
  tone: PathwayTone;
  reverse?: boolean;
}) {
  const arrowColor = {
    emerald: "text-emerald-500",
    teal: "text-teal-500",
    violet: "text-violet-500",
  }[tone];

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white/70 border border-slate-200 px-3 py-3">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-white text-xs font-bold shadow-sm ${s.colorClass}`}
            >
              {s.label}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-mono">
              {s.sub}
            </span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight
              className={`w-4 h-4 ${arrowColor} ${reverse ? "rotate-180" : ""}`}
            />
          )}
        </div>
      ))}
      {/* exhale puff for Krebs */}
      {steps.some((s) => s.label === "CO₂") && (
        <Wind className="w-4 h-4 text-sky-400 ml-1" aria-hidden />
      )}
    </div>
  );
}

function ProteinSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="rounded-3xl border-4 border-violet-200 bg-white/85 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      data-testid="protein-section"
    >
      <SectionHeader
        kh={kh}
        eyebrow={t("03 · The Micro-Machines", "០៣ · ម៉ាស៊ីនមីក្រូ")}
        titleEn="Proteins — folding nano-machines"
        titleKh="ប្រូតេអ៊ីន — ម៉ាស៊ីននាណូដែលបត់"
        Icon={Cog}
        accent="violet"
      />

      <p
        className={`text-slate-700 leading-relaxed mb-6 ${
          kh ? "font-khmer text-lg leading-loose" : "text-base sm:text-lg"
        }`}
      >
        {t(
          "When most people hear \"protein\" they think of food — chicken, beans, eggs. But proteins are not just fuel. They are the actual workers inside every cell. Each one is a long string of amino-acid beads that folds itself into a tiny, perfectly-shaped 3D machine. That shape decides what the machine does.",
          "ពេលមនុស្សភាគច្រើនលឺពាក្យ \"ប្រូតេអ៊ីន\" គេគិតដល់អាហារ — សាច់មាន់ សណ្តែក ស៊ុត។ ប៉ុន្តែប្រូតេអ៊ីនមិនត្រឹមតែជាឥន្ធនៈទេ។ ពួកវាគឺជាកម្មករពិតប្រាកដនៅក្នុងកោសិកានីមួយៗ។ ប្រូតេអ៊ីននីមួយៗគឺជាខ្សែវែងមួយនៃអាស៊ីតអាមីណូ ដែលបត់ខ្លួនវាទៅជាម៉ាស៊ីន ៣D ដែលមានរូបរាងល្អឥតខ្ចោះ។ រូបរាងនោះគឺជាអ្វីដែលសម្រេចថា ម៉ាស៊ីនធ្វើអ្វី។",
        )}
      </p>

      {/* From bead → folded machine */}
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 sm:p-6 mb-6" data-testid="protein-folding">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.25em] text-violet-700 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("From string → to machine", "ពីខ្សែ → ទៅម៉ាស៊ីន")}
        </div>
        <ProteinFoldSVG />
        <p
          className={`mt-4 text-sm text-slate-700 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "20 different amino acids, strung in any order, can fold into millions of different shapes — and shape is everything. A pump shape pumps. A scissor shape cuts. A gate shape opens and closes.",
            "អាស៊ីតអាមីណូ ២០ ប្រភេទ ដែលរៀបតាមលំដាប់ផ្សេងៗ អាចបត់ទៅជារាងផ្សេងៗគ្នារាប់លាន — ហើយរូបរាងគឺសំខាន់បំផុត។ រាងដូចបូម គឺបូម។ រាងដូចកន្ត្រៃ គឺកាត់។ រាងដូចទ្វារ គឺបើកនិងបិទ។",
          )}
        </p>
      </div>

      {/* Job grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ProteinJobCard
          kh={kh}
          icon="🦾"
          jobEn="Move muscles"
          jobKh="ផ្លាស់ទីសាច់ដុំ"
          exampleEn="Actin & myosin pull each other to bend your arm."
          exampleKh="អាក់ទីន និងម៉ីយ៉ូស៊ីន ទាញគ្នាទៅវិញទៅមក ដើម្បីបត់ដៃរបស់អ្នក។"
        />
        <ProteinJobCard
          kh={kh}
          icon="🫁"
          jobEn="Carry oxygen"
          jobKh="ផ្ទុកអុកស៊ីសែន"
          exampleEn="Hemoglobin in your blood grabs O₂ at the lungs and drops it at every cell."
          exampleKh="ហេម៉ូក្លូប៊ីនក្នុងឈាម ចាប់យក O₂ នៅសួត ហើយដាក់នៅរាល់កោសិកា។"
        />
        <ProteinJobCard
          kh={kh}
          icon="🛡️"
          jobEn="Defend you"
          jobKh="ការពារអ្នក"
          exampleEn="Antibodies are Y-shaped proteins that lock onto invading viruses."
          exampleKh="អង់ទីករ គឺជាប្រូតេអ៊ីនរាង Y ដែលចាក់សោររាល់វីរុសឈ្លានពាន។"
        />
        <ProteinJobCard
          kh={kh}
          icon="🍚"
          jobEn="Digest food"
          jobKh="រំលាយអាហារ"
          exampleEn="Amylase in your saliva starts cutting rice starch the moment you chew."
          exampleKh="អាមីឡាស់ ក្នុងទឹកមាត់ ចាប់ផ្តើមកាត់ម្សៅអង្ករភ្លាមៗ ពេលអ្នកទំពារ។"
        />
      </div>

      <div
        className={`rounded-xl border-l-4 border-violet-500 bg-violet-50/70 p-4 text-sm text-slate-800 ${
          kh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {t(
          "DNA holds the recipe. Proteins are the cooks, the waiters, the builders, the security guards. Without proteins, DNA is just a library nobody reads.",
          "ឌីអិនអេ កាន់រូបមន្ត។ ប្រូតេអ៊ីន គឺជាចុងភៅ អ្នកបម្រើ ជាងសំណង់ និងឆ្មាំសន្តិសុខ។ បើគ្មានប្រូតេអ៊ីន ឌីអិនអេគ្រាន់តែជាបណ្ណាល័យដែលគ្មាននរណាអាន។",
        )}
      </div>
    </section>
  );
}

function ProteinFoldSVG() {
  // Three states: linear, partly folded, fully folded
  return (
    <svg viewBox="0 0 540 130" className="w-full h-auto">
      {/* State 1: linear chain */}
      <g transform="translate(10,20)">
        <text x="0" y="-4" fontSize="10" fill="#6b7280" fontFamily="monospace">1. chain</text>
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={i * 12 + 6} cy={50} r={5} fill={["#7c3aed", "#10b981", "#f59e0b", "#0ea5e9"][i % 4]} />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={i * 12 + 6} y1={50} x2={(i + 1) * 12 + 6} y2={50} stroke="#94a3b8" strokeWidth={2} />
        ))}
      </g>
      {/* arrow */}
      <text x="170" y="75" fontSize="20" fill="#94a3b8">→</text>
      {/* State 2: helix-like coil */}
      <g transform="translate(195,15)">
        <text x="0" y="0" fontSize="10" fill="#6b7280" fontFamily="monospace">2. folding</text>
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          const x = t * 90;
          const y = 55 + Math.sin(t * Math.PI * 3) * 20;
          return (
            <circle key={i} cx={x} cy={y} r={5} fill={["#7c3aed", "#10b981", "#f59e0b", "#0ea5e9"][i % 4]} />
          );
        })}
      </g>
      {/* arrow */}
      <text x="320" y="75" fontSize="20" fill="#94a3b8">→</text>
      {/* State 3: globular machine */}
      <g transform="translate(360,15)">
        <text x="0" y="0" fontSize="10" fill="#6b7280" fontFamily="monospace">3. machine</text>
        <ellipse cx="80" cy="60" rx="55" ry="40" fill="url(#globGrad)" stroke="#7c3aed" strokeWidth={2} />
        {/* surface beads */}
        {Array.from({ length: 12 }).map((_, i) => {
          const ang = (i / 12) * Math.PI * 2;
          const x = 80 + Math.cos(ang) * 48;
          const y = 60 + Math.sin(ang) * 33;
          return (
            <circle key={i} cx={x} cy={y} r={4.5} fill={["#7c3aed", "#10b981", "#f59e0b", "#0ea5e9"][i % 4]} />
          );
        })}
        {/* active site */}
        <path d="M 95 50 Q 100 65 90 75" stroke="#dc2626" strokeWidth={2.5} fill="none" />
        <text x="105" y="62" fontSize="9" fill="#dc2626" fontWeight="bold">site</text>
      </g>
      <defs>
        <radialGradient id="globGrad" cx="0.4" cy="0.4">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function ProteinJobCard({
  kh,
  icon,
  jobEn,
  jobKh,
  exampleEn,
  exampleKh,
}: {
  kh: boolean;
  icon: string;
  jobEn: string;
  jobKh: string;
  exampleEn: string;
  exampleKh: string;
}) {
  return (
    <div className="rounded-xl border border-violet-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <span
          className={`font-bold text-violet-900 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {kh ? jobKh : jobEn}
        </span>
      </div>
      <p
        className={`text-sm text-slate-700 ${
          kh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {kh ? exampleKh : exampleEn}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3 — Enzymes: Frugal Catalysts
 * ══════════════════════════════════════════════════════════════════════════ */
function EnzymeSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Comparison: Lab vs Body
  const compareRows: Array<{
    en: { lab: string; body: string };
    kh: { lab: string; body: string };
    icon: typeof Thermometer;
  }> = [
    {
      icon: Thermometer,
      en: { lab: "200–500 °C heat", body: "37 °C body temperature" },
      kh: { lab: "កំដៅ ២០០–៥០០ °C", body: "សីតុណ្ហភាពរាងកាយ ៣៧ °C" },
    },
    {
      icon: Zap,
      en: { lab: "High pressure (50+ atm)", body: "Normal pressure (1 atm)" },
      kh: { lab: "សម្ពាធខ្ពស់ (៥០+ atm)", body: "សម្ពាធធម្មតា (១ atm)" },
    },
    {
      icon: FlaskConical,
      en: { lab: "Toxic acids & metals", body: "Just salt water" },
      kh: { lab: "អាស៊ីត និងលោហៈពុល", body: "តែទឹកអំបិលប៉ុណ្ណោះ" },
    },
    {
      icon: HeartPulse,
      en: { lab: "Hours per reaction", body: "Millions of reactions / second" },
      kh: { lab: "ច្រើនម៉ោងក្នុងមួយប្រតិកម្ម", body: "ប្រតិកម្មរាប់លានក្នុងមួយវិនាទី" },
    },
  ];

  return (
    <section
      className="rounded-3xl border-4 border-amber-200 bg-white/85 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      data-testid="enzyme-section"
    >
      <SectionHeader
        kh={kh}
        eyebrow={t("04 · Frugal Catalysts", "០៤ · កាតាលីករសន្សំសំចៃ")}
        titleEn="Enzymes — chemistry at body temperature"
        titleKh="អង់ស៊ីម — គីមីវិទ្យានៅសីតុណ្ហភាពរាងកាយ"
        Icon={Microscope}
        accent="amber"
      />

      <p
        className={`text-slate-700 leading-relaxed mb-6 ${
          kh ? "font-khmer text-lg leading-loose" : "text-base sm:text-lg"
        }`}
      >
        {t(
          "An enzyme is a special protein with one job: speed up a chemical reaction without being used up itself. The miracle is the conditions. To break starch into sugar, an industrial lab might need boiling acid and metal catalysts. Your saliva does the same thing — at body temperature, in plain water, in seconds. Enzymes are how life does extreme chemistry, gently.",
          "អង់ស៊ីម គឺជាប្រូតេអ៊ីនពិសេសមួយ ដែលមានភារកិច្ចតែមួយ៖ បង្កើនល្បឿនប្រតិកម្មគីមី ដោយខ្លួនឯងមិនត្រូវប្រើអស់។ អព្ភូតហេតុនោះស្ថិតនៅលើលក្ខខណ្ឌ។ ដើម្បីបំបែកម្សៅទៅជាស្ករ មន្ទីរពិសោធន៍ឧស្សាហកម្មអាចត្រូវការអាស៊ីតរំពុះ និងកាតាលីករលោហៈ។ ទឹកមាត់របស់អ្នកធ្វើរឿងដូចគ្នា — នៅសីតុណ្ហភាពរាងកាយ ក្នុងទឹកធម្មតា ក្នុងរយៈពេលពីរបីវិនាទី។ អង់ស៊ីម គឺជារបៀបដែលជីវិតធ្វើគីមីវិទ្យាខ្លាំងក្លា ដោយស្រទន់។",
        )}
      </p>

      {/* Lock & key SVG */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 sm:p-6 mb-6" data-testid="enzyme-lock-key">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("Lock & key — substrate fits enzyme", "សោ និងកូនសោ — សារធាតុ-ផ្គុំ ត្រូវនឹងអង់ស៊ីម")}
        </div>
        <LockAndKeySVG />
        <p
          className={`mt-4 text-sm text-slate-700 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Each enzyme has a pocket whose shape exactly matches one molecule (the substrate). The molecule clicks in, the reaction happens, the product pops out — and the enzyme is ready for the next one.",
            "អង់ស៊ីមនីមួយៗមានរន្ធមួយ ដែលរាងរបស់វាត្រូវនឹងម៉ូលេគុលតែមួយ (សារធាតុ-ផ្គុំ)។ ម៉ូលេគុលចូលក្នុងពីរបីដង ប្រតិកម្មកើតឡើង ផលិតផលចេញមក — ហើយអង់ស៊ីមត្រៀមខ្លួនសម្រាប់ម៉ូលេគុលបន្ទាប់។",
          )}
        </p>
      </div>

      {/* Lab vs body comparison */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-5" data-testid="enzyme-lab-vs-body">
        <div
          className={`text-center font-bold text-amber-900 mb-4 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t("Industrial lab vs. your body", "មន្ទីរពិសោធន៍ឧស្សាហកម្ម ធៀបនឹងរាងកាយរបស់អ្នក")}
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 sm:gap-x-6 gap-y-3 items-center text-sm">
          <div></div>
          <div
            className={`text-center text-xs font-bold uppercase tracking-wider text-rose-700 ${
              kh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {t("Industrial lab", "មន្ទីរពិសោធន៍")}
          </div>
          <div
            className={`text-center text-xs font-bold uppercase tracking-wider text-emerald-700 ${
              kh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {t("Your body (with enzymes)", "រាងកាយរបស់អ្នក (មានអង់ស៊ីម)")}
          </div>
          {compareRows.map((row, i) => {
            const Icon = row.icon;
            return (
              <ComparisonRow
                key={i}
                Icon={Icon}
                lab={kh ? row.kh.lab : row.en.lab}
                body={kh ? row.kh.body : row.en.body}
                kh={kh}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  Icon,
  lab,
  body,
  kh,
}: {
  Icon: typeof Thermometer;
  lab: string;
  body: string;
  kh: boolean;
}) {
  return (
    <div className="contents">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-amber-200 shadow-sm">
        <Icon className="w-4 h-4 text-amber-700" />
      </div>
      <div className={`rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-rose-900 text-center ${kh ? "font-khmer" : ""}`}>
        {lab}
      </div>
      <div className={`rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-emerald-900 text-center ${kh ? "font-khmer" : ""}`}>
        {body}
      </div>
    </div>
  );
}

function LockAndKeySVG() {
  return (
    <svg viewBox="0 0 480 140" className="w-full h-auto" data-testid="lock-key-svg">
      {/* Substrate (left) */}
      <g transform="translate(20,40)">
        <rect x="0" y="0" width="55" height="40" rx="6" fill="#f59e0b" stroke="#b45309" strokeWidth={2} />
        <text x="27" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">
          starch
        </text>
        <text x="27" y="58" textAnchor="middle" fontSize="9" fill="#92400e">substrate</text>
      </g>
      {/* arrow */}
      <text x="92" y="65" fontSize="22" fill="#94a3b8">→</text>
      {/* Enzyme with pocket */}
      <g transform="translate(125,15)">
        <ellipse cx="90" cy="60" rx="80" ry="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth={2.5} />
        {/* Pocket */}
        <path
          d="M 50 60 Q 65 35 90 35 Q 115 35 130 60 Q 115 85 90 85 Q 65 85 50 60 Z"
          fill="#fef3c7"
          stroke="#7c3aed"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <text x="90" y="63" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed" fontFamily="monospace">
          enzyme
        </text>
        <text x="90" y="115" textAnchor="middle" fontSize="9" fill="#5b21b6">amylase</text>
      </g>
      {/* arrow */}
      <text x="318" y="65" fontSize="22" fill="#94a3b8">→</text>
      {/* Products */}
      <g transform="translate(355,40)">
        <circle cx="20" cy="20" r="13" fill="#10b981" stroke="#065f46" strokeWidth={2} />
        <text x="20" y="23" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="monospace">
          glu
        </text>
        <circle cx="55" cy="20" r="13" fill="#10b981" stroke="#065f46" strokeWidth={2} />
        <text x="55" y="23" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="monospace">
          glu
        </text>
        <text x="40" y="58" textAnchor="middle" fontSize="9" fill="#065f46">2 × glucose</text>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Shared header / fact card
 * ══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({
  kh,
  eyebrow,
  titleEn,
  titleKh,
  Icon,
  accent,
}: {
  kh: boolean;
  eyebrow: string;
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: "emerald" | "violet" | "amber";
}) {
  const ring = {
    emerald: "bg-emerald-600",
    violet: "bg-violet-600",
    amber: "bg-amber-600",
  }[accent];
  const text = {
    emerald: "text-emerald-700",
    violet: "text-violet-700",
    amber: "text-amber-700",
  }[accent];

  return (
    <div className="flex items-start gap-3 mb-4">
      <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${ring} text-white flex items-center justify-center shadow`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.25em] ${text} mb-0.5 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {eyebrow}
        </div>
        <h2
          className={`font-display text-xl sm:text-2xl font-extrabold text-slate-900 ${
            kh ? "font-khmer leading-snug" : ""
          }`}
        >
          {kh ? titleKh : titleEn}
        </h2>
      </div>
    </div>
  );
}

function FactCard({
  kh,
  headEn,
  headKh,
  bodyEn,
  bodyKh,
  tone,
}: {
  kh: boolean;
  headEn: string;
  headKh: string;
  bodyEn: string;
  bodyKh: string;
  tone: "emerald" | "teal" | "violet";
}) {
  const styles = {
    emerald: "border-emerald-200 bg-emerald-50/60 text-emerald-900",
    teal: "border-teal-200 bg-teal-50/60 text-teal-900",
    violet: "border-violet-200 bg-violet-50/60 text-violet-900",
  }[tone];

  return (
    <div className={`rounded-xl border ${styles} p-4`}>
      <div className={`font-bold text-sm mb-1 ${kh ? "font-khmer" : ""}`}>
        {kh ? headKh : headEn}
      </div>
      <div className={`text-xs text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {kh ? bodyKh : bodyEn}
      </div>
    </div>
  );
}
