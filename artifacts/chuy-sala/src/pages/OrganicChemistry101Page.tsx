import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Hexagon, Atom, Move3d, RotateCw, Pill, Wheat, Recycle, Sparkles, Info,
  FlaskConical, Beaker, TestTube, FlaskRound, Filter, Thermometer, Flame, Droplets, Eye, AlertTriangle,
  Volume2, Replace, Scissors, Zap, Hourglass,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { OrganicArchitecture3DModule } from "@/components/widgets/OrganicArchitecture3DModule";
import { SynthesisEngineModule } from "@/components/widgets/SynthesisEngineModule";

/* ══════════════════════════════════════════════════════════════════════════
 * Organic Chemistry 101 — គីមីសរីរាង្គមូលដ្ឋាន
 * Self-contained module. No new dependencies — the 3D molecule viewer is
 * a custom SVG renderer with pointer-drag rotation.
 * ══════════════════════════════════════════════════════════════════════════ */

const KH_TODO = (placeholder: string) => placeholder;

/* ── Atom palette (CPK-ish) ────────────────────────────────────────────── */
type Element = "C" | "H" | "O" | "N";
const ATOM_STYLE: Record<Element, { fill: string; stroke: string; r: number; label: string }> = {
  C: { fill: "#1f2937", stroke: "#0f172a", r: 18, label: "C" },
  H: { fill: "#f1f5f9", stroke: "#94a3b8", r: 11, label: "H" },
  O: { fill: "#dc2626", stroke: "#7f1d1d", r: 19, label: "O" },
  N: { fill: "#2563eb", stroke: "#1e3a8a", r: 18, label: "N" },
};

/* ══════════════════════════════════════════════════════════════════════════
 * Page
 * ══════════════════════════════════════════════════════════════════════════ */

export function OrganicChemistry101Page() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50/50 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Hexagon watermark background motif */}
      <HexagonBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* Hero */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg mb-4 relative">
            <Hexagon className="w-9 h-9" strokeWidth={2.5} />
            <span className="absolute font-display font-extrabold text-sm">C</span>
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Module 05 · Chemistry Hub", "មុខវិជ្ជា ០៥ · មជ្ឈមណ្ឌលគីមីវិទ្យា")}
          </div>
          <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 ${kh ? "font-khmer leading-snug" : ""}`}>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {t("Organic Chemistry 101", "គីមីសរីរាង្គមូលដ្ឋាន")}
            </span>
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "The chemistry of carbon — the element that builds every living thing, every plastic, every fuel, and every medicine.",
              "គីមីវិទ្យានៃកាបូន — ធាតុដែលស្ថាបនាគ្រប់ជីវិត គ្រប់ប្លាស្ទិក គ្រប់ឥន្ធនៈ និងគ្រប់ឱសថ។",
            )}
          </p>
        </header>

        {/* ── Section 1: Carbon — The Master Builder ───────────── */}
        <CarbonSection />

        {/* ── Section 2: Reaction Mechanisms — The Moving Puzzle ─ */}
        <ReactionMechanismsSection />

        {/* ── Section 3: 3D Molecule Viewer ────────────────────── */}
        <MoleculeViewerSection />

        {/* ── Section 3b: 3D Architecture (Isomers, Stereo, Chirality) ─ */}
        <OrganicArchitecture3DModule />

        {/* ── Section 4: Chemistry in Cambodia ────────────────── */}
        <RealWorldSection />

        {/* ── Section 5: The Organic Lab — Tools & Glassware ──── */}
        <OrganicLabSection />

        {/* ── Section 6: The Synthesis Engine — Reaction Pathways ─ */}
        <SynthesisEngineModule />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Hexagon background motif
 * ══════════════════════════════════════════════════════════════════════════ */
function HexagonBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hexpat" width="56" height="48" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
            <polygon
              points="14,0 42,0 56,24 42,48 14,48 0,24"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexpat)" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 1: Carbon — The Master Builder
 * ══════════════════════════════════════════════════════════════════════════ */
function CarbonSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section className="rounded-3xl border-4 border-emerald-200 bg-white/80 backdrop-blur shadow-md p-5 sm:p-8 mb-8">
      <SectionHeader
        icon={Atom}
        eyebrowEn="Section 1"
        eyebrowKh="ផ្នែកទី ១"
        titleEn="Carbon: The Master Builder"
        titleKh="កាបូន៖ ស្ថាបត្យករចម្បង"
      />

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-6">
        <p className={`text-base sm:text-lg text-slate-700 leading-relaxed ${kh ? "font-khmer text-lg leading-loose" : ""}`}>
          {t(
            "Organic Chemistry is the study of one special element: Carbon (C). Why so important? Because carbon is the only atom that can link to itself in long chains, branches, and rings — building everything from sugar to DNA to the plastic in this screen.",
            "គីមីសរីរាង្គគឺជាការសិក្សាអំពីធាតុពិសេសមួយ៖ កាបូន (C)។ ហេតុអ្វីសំខាន់? ព្រោះកាបូនជាអាតូមតែមួយគត់ដែលអាចភ្ជាប់ខ្លួនវាទៅខ្លួនវាជាខ្សែវែង មានសាខា និងកង់រាងជារង្វង់ — ស្ថាបនាគ្រប់យ៉ាងពីស្ករ ដល់ DNA ដល់ប្លាស្ទិកនៅក្នុងអេក្រង់នេះ។",
          )}
        </p>

        {/* The Rule of 4 visual */}
        <div className="rounded-2xl border-4 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-center relative overflow-hidden">
          <Hexagon className="absolute -right-6 -top-6 w-32 h-32 text-emerald-200" aria-hidden />
          <div className={`text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("THE GOLDEN RULE", "ច្បាប់មាស")}
          </div>
          <div className={`font-display text-2xl sm:text-3xl font-extrabold text-emerald-900 mb-2 ${kh ? "font-khmer" : ""}`}>
            {t("The Rule of 4", "ច្បាប់នៃ ៤")}
          </div>
          {/* Carbon with 4 bonds */}
          <div className="flex items-center justify-center my-4">
            <svg viewBox="0 0 200 160" className="w-44 h-36">
              {/* 4 bonds */}
              <line x1="100" y1="80" x2="40" y2="20" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
              <line x1="100" y1="80" x2="160" y2="20" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
              <line x1="100" y1="80" x2="40" y2="140" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
              <line x1="100" y1="80" x2="160" y2="140" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
              {/* H atoms */}
              {[ [40,20], [160,20], [40,140], [160,140] ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">H</text>
                </g>
              ))}
              {/* C atom */}
              <circle cx="100" cy="80" r="22" fill="#1f2937" stroke="#0f172a" strokeWidth="2" />
              <text x="100" y="86" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">C</text>
            </svg>
          </div>
          <p className={`text-sm sm:text-base text-emerald-900 font-semibold ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {t(
              "Carbon ALWAYS makes exactly 4 bonds. No more, no less.",
              "កាបូនតែងតែបង្កើតចំនួន ៤ ចំណង។ មិនច្រើនជាង មិនតិចជាង។",
            )}
          </p>
        </div>
      </div>

      {/* Alkanes / Alkenes / Alkynes */}
      <div className={`text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-base" : ""}`}>
        {t("Three families of carbon chains", "បីគ្រួសារនៃខ្សែកាបូន")}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <BondCard
          kh={kh}
          tone="emerald"
          familyEn="Alkanes"
          familyKh="អាល់កាន"
          bondEn="Single bonds (C—C)"
          bondKh="ចំណងតែមួយ (C—C)"
          exampleEn="Example: Ethane (C₂H₆)"
          exampleKh="ឧទាហរណ៍៖ អេតាន (C₂H₆)"
          structure={<EthaneSVG />}
        />
        <BondCard
          kh={kh}
          tone="amber"
          familyEn="Alkenes"
          familyKh="អាល់សែន"
          bondEn="Double bonds (C═C)"
          bondKh="ចំណងទ្វេ (C═C)"
          exampleEn="Example: Ethene (C₂H₄)"
          exampleKh="ឧទាហរណ៍៖ អេតែន (C₂H₄)"
          structure={<EtheneSVG />}
        />
        <BondCard
          kh={kh}
          tone="rose"
          familyEn="Alkynes"
          familyKh="អាល់ស៊ីន"
          bondEn="Triple bonds (C≡C)"
          bondKh="ចំណងបី (C≡C)"
          exampleEn="Example: Ethyne (C₂H₂)"
          exampleKh="ឧទាហរណ៍៖ អេតុីន (C₂H₂)"
          structure={<EthyneSVG />}
        />
      </div>
    </section>
  );
}

function BondCard({
  kh, tone, familyEn, familyKh, bondEn, bondKh, exampleEn, exampleKh, structure,
}: {
  kh: boolean;
  tone: "emerald" | "amber" | "rose";
  familyEn: string; familyKh: string;
  bondEn: string; bondKh: string;
  exampleEn: string; exampleKh: string;
  structure: React.ReactNode;
}) {
  const TONE = {
    emerald: "from-emerald-50 to-teal-50 border-emerald-300 text-emerald-900",
    amber: "from-amber-50 to-orange-50 border-amber-300 text-amber-900",
    rose: "from-rose-50 to-pink-50 border-rose-300 text-rose-900",
  }[tone];
  return (
    <div className={`rounded-2xl border-2 bg-gradient-to-br p-4 ${TONE}`}>
      <div className={`font-display font-extrabold text-xl ${kh ? "font-khmer" : ""}`}>
        {kh ? familyKh : familyEn}
      </div>
      <div className={`text-sm font-semibold opacity-90 mb-2 ${kh ? "font-khmer text-base" : ""}`}>
        {kh ? bondKh : bondEn}
      </div>
      <div className="bg-white/80 rounded-xl p-2 mb-2 flex items-center justify-center min-h-[110px]">
        {structure}
      </div>
      <div className={`text-xs italic opacity-80 ${kh ? "font-khmer text-sm" : ""}`}>
        {kh ? exampleKh : exampleEn}
      </div>
    </div>
  );
}

/* Tiny structural-formula SVGs ─────────────────────────────────────────── */
function EthaneSVG() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-24">
      <line x1="60" y1="45" x2="140" y2="45" stroke="#334155" strokeWidth="3" />
      {/* H bonds on each C */}
      {[60, 140].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1="45" x2={cx - 25} y2="20" stroke="#334155" strokeWidth="2" />
          <line x1={cx} y1="45" x2={cx + 25} y2="20" stroke="#334155" strokeWidth="2" />
          <line x1={cx} y1="45" x2={cx} y2="78" stroke="#334155" strokeWidth="2" />
          <text x={cx - 30} y="16" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <text x={cx + 22} y="16" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <text x={cx - 4} y="86" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <circle cx={cx} cy="45" r="10" fill="#1f2937" />
          <text x={cx} y="49" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">C</text>
        </g>
      ))}
    </svg>
  );
}
function EtheneSVG() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-24">
      <line x1="60" y1="40" x2="140" y2="40" stroke="#9a3412" strokeWidth="3" />
      <line x1="60" y1="50" x2="140" y2="50" stroke="#9a3412" strokeWidth="3" />
      {[60, 140].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1="45" x2={cx - 25} y2="20" stroke="#334155" strokeWidth="2" />
          <line x1={cx} y1="45" x2={cx - 25} y2="75" stroke="#334155" strokeWidth="2" />
          <text x={cx - 30} y="16" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <text x={cx - 30} y="84" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <circle cx={cx} cy="45" r="10" fill="#1f2937" />
          <text x={cx} y="49" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">C</text>
        </g>
      ))}
    </svg>
  );
}
function EthyneSVG() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-24">
      <line x1="60" y1="38" x2="140" y2="38" stroke="#9f1239" strokeWidth="3" />
      <line x1="60" y1="45" x2="140" y2="45" stroke="#9f1239" strokeWidth="3" />
      <line x1="60" y1="52" x2="140" y2="52" stroke="#9f1239" strokeWidth="3" />
      {[60, 140].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1="45" x2={cx === 60 ? 25 : 175} y2="45" stroke="#334155" strokeWidth="2" />
          <text x={cx === 60 ? 12 : 178} y="50" fontSize="11" fontWeight="700" fill="#334155">H</text>
          <circle cx={cx} cy="45" r="10" fill="#1f2937" />
          <text x={cx} y="49" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">C</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 2: Interactive 3D Molecule Viewer
 * ══════════════════════════════════════════════════════════════════════════ */

type Atom3D = { el: Element; x: number; y: number; z: number };
type Bond3D = { a: number; b: number; order?: 1 | 2 | 3 };

type Molecule = {
  id: string;
  formula: string;
  nameEn: string;
  nameKh: string;
  contextEn: string;
  contextKh: string;
  atoms: Atom3D[];
  bonds: Bond3D[];
  // Optional richer info-card fields (used by molecules that need a longer
  // formal title plus a science-breakdown / disclaimer block, e.g. TNT).
  cardTitleEn?: string;
  cardTitleKh?: string;
  scienceEn?: string;
  scienceKh?: string;
  disclaimerEn?: string;
  disclaimerKh?: string;
};

/* Build atom positions for our three molecules. Coordinates are in arbitrary
 * units that get scaled in the renderer. Goal: clear, recognizable shapes. */
const MOLECULES: Molecule[] = [
  /* ── Methane CH4 — perfect tetrahedron ─────────────────────────────── */
  (() => {
    const r = 60;
    const v = r / Math.sqrt(3);
    return {
      id: "methane",
      formula: "CH₄",
      nameEn: "Methane",
      nameKh: "មេតាន",
      contextEn: "The biogas your local farm produces from animal waste — a clean cooking fuel.",
      contextKh: "ឧស្ម័នជីវឧស្ម័នដែលកសិដ្ឋានរបស់អ្នកផលិតពីលាមកសត្វ — ឥន្ធនៈចម្អិនអាហារស្អាត។",
      atoms: [
        { el: "C", x: 0, y: 0, z: 0 },
        { el: "H", x:  v, y:  v, z:  v },
        { el: "H", x:  v, y: -v, z: -v },
        { el: "H", x: -v, y:  v, z: -v },
        { el: "H", x: -v, y: -v, z:  v },
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 },
      ],
    };
  })(),

  /* ── Ethanol C2H5OH ─────────────────────────────────────────────────── */
  {
    id: "ethanol",
    formula: "C₂H₅OH",
    nameEn: "Ethanol",
    nameKh: "អេតាណុល",
    contextEn: "The alcohol in hand sanitizer and rice wine — kills germs and powers stoves.",
    contextKh: "ស្រាក្នុងជែលលាងដៃ និងស្រាស្រូវ — សម្លាប់មេរោគ និងផ្ដល់ឥន្ធនៈចង្ក្រាន។",
    atoms: [
      { el: "C", x: -55, y: 0,   z: 0 },   // 0  C1
      { el: "C", x:  10, y: 25,  z: 0 },   // 1  C2
      { el: "O", x:  70, y: -10, z: 20 },  // 2  O
      { el: "H", x: 105, y: 15,  z: 30 },  // 3  H on O
      { el: "H", x: -85, y: 35,  z: 30 },  // 4  H on C1
      { el: "H", x: -85, y: 35,  z: -30 }, // 5  H on C1
      { el: "H", x: -85, y: -35, z: 5 },   // 6  H on C1
      { el: "H", x:  10, y: 60,  z: 30 },  // 7  H on C2
      { el: "H", x:  10, y: 60,  z: -30 }, // 8  H on C2
    ],
    bonds: [
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
      { a: 0, b: 4 }, { a: 0, b: 5 }, { a: 0, b: 6 },
      { a: 1, b: 7 }, { a: 1, b: 8 },
    ],
  },

  /* ── Glucose C6H12O6 — pyranose chair (simplified) ─────────────────── */
  (() => {
    const R = 50;          // ring radius
    const Z = 12;          // chair pucker
    const ringPos: Atom3D[] = [];
    // 6-membered ring: positions 0..5  (index 0 = O, 1..5 = C1..C5)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      ringPos.push({
        el: i === 0 ? "O" : "C",
        x: R * Math.cos(angle),
        y: R * Math.sin(angle),
        z: i % 2 === 0 ? Z : -Z,
      });
    }
    // Pendant: CH2OH on C5 (ring index 5), and OH groups on C1..C4 (indices 1..4)
    const pendants: Atom3D[] = [
      { el: "C", x:  R * Math.cos(-Math.PI/2 + 5*Math.PI/3) - 30, y: R * Math.sin(-Math.PI/2 + 5*Math.PI/3) - 35, z: 30 }, // 6  C6 (CH2OH)
      { el: "O", x:  R * Math.cos(-Math.PI/2 + 5*Math.PI/3) - 60, y: R * Math.sin(-Math.PI/2 + 5*Math.PI/3) - 60, z: 45 }, // 7  O of CH2OH
      { el: "O", x:  R * Math.cos(-Math.PI/2 + Math.PI/3) + 30, y: R * Math.sin(-Math.PI/2 + Math.PI/3) - 25, z: 35 },     // 8  OH on C1
      { el: "O", x:  R * Math.cos(-Math.PI/2 + 2*Math.PI/3) + 35, y: R * Math.sin(-Math.PI/2 + 2*Math.PI/3) + 15, z: -35 },// 9  OH on C2
      { el: "O", x:  R * Math.cos(-Math.PI/2 + Math.PI) - 20, y: R * Math.sin(-Math.PI/2 + Math.PI) + 35, z: 35 },         // 10 OH on C3
      { el: "O", x:  R * Math.cos(-Math.PI/2 + 4*Math.PI/3) - 35, y: R * Math.sin(-Math.PI/2 + 4*Math.PI/3) + 15, z: -35 },// 11 OH on C4
    ];
    const all = [...ringPos, ...pendants];
    const bonds: Bond3D[] = [
      // Ring bonds 0-1-2-3-4-5-0
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
      { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 0 },
      // C5-C6 and C6-O
      { a: 5, b: 6 }, { a: 6, b: 7 },
      // OHs on C1..C4
      { a: 1, b: 8 }, { a: 2, b: 9 }, { a: 3, b: 10 }, { a: 4, b: 11 },
    ];
    return {
      id: "glucose",
      formula: "C₆H₁₂O₆",
      nameEn: "Glucose",
      nameKh: "គ្លុយកូស",
      contextEn: "The sugar your body breaks down for energy — fuel for your brain when you study.",
      contextKh: "ស្ករដែលរាងកាយរបស់អ្នកបំបែកសម្រាប់ថាមពល — ឥន្ធនៈសម្រាប់ខួរក្បាលពេលអ្នកសិក្សា។",
      atoms: all,
      bonds,
    };
  })(),

  /* ── Water H2O — bent 104.5° ────────────────────────────────────────── */
  (() => {
    // Bond length ~50; bend so the O sits at the top of the "V".
    // Half-angle from vertical = 104.5° / 2 ≈ 52.25°.
    const r = 55;
    const half = (104.5 / 2) * (Math.PI / 180);
    const dx = r * Math.sin(half);
    const dy = r * Math.cos(half);
    return {
      id: "water",
      formula: "H₂O",
      nameEn: "Water",
      nameKh: "ទឹក",
      contextEn:
        "The universal solvent. It is technically an 'inorganic' molecule, but it is the absolute foundation of all organic life on Earth.",
      contextKh:
        "សារធាតុរំលាយជាសកល ។ តាមបច្ចេកទេស វាជាម៉ូលេគុល \"អនីសរីរាង្គ\" ប៉ុន្តែវាជាមូលដ្ឋានដាច់ខាតនៃជីវិតសរីរាង្គទាំងអស់នៅលើផែនដី ។",
      atoms: [
        { el: "O", x: 0,    y: -dy / 2, z: 0 }, // 0 — central O
        { el: "H", x: -dx,  y:  dy / 2, z: 0 }, // 1
        { el: "H", x:  dx,  y:  dy / 2, z: 0 }, // 2
      ],
      bonds: [
        { a: 0, b: 1 },
        { a: 0, b: 2 },
      ],
    };
  })(),

  /* ── Carbon Dioxide CO2 — linear 180°, two C=O double bonds ─────────── */
  {
    id: "carbon-dioxide",
    formula: "CO₂",
    nameEn: "Carbon Dioxide",
    nameKh: "កាបូនឌីអុកស៊ីត",
    contextEn:
      "The breath of the forest! This inorganic gas is what trees 'eat' out of the air to build solid organic wood and sugars.",
    contextKh:
      "ដង្ហើមនៃព្រៃឈើ ! ឧស្ម័នអនីសរីរាង្គនេះគឺជាអ្វីដែលដើមឈើ \"ស៊ី\"ពីខ្យល់ ដើម្បីសាងសង់ឈើ និងស្ករសរីរាង្គដ៏រឹង ។",
    atoms: [
      { el: "O", x: -75, y: 0, z: 0 }, // 0
      { el: "C", x:   0, y: 0, z: 0 }, // 1 — central C
      { el: "O", x:  75, y: 0, z: 0 }, // 2
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2, order: 2 },
    ],
  },

  /* ── Polyethylene (C2H4)n — short zigzag CH2 backbone ───────────────── */
  (() => {
    // 7 carbons in a zigzag along the x-axis, alternating ±y.
    // Each carbon bears 2 hydrogens (one in +z, one in −z).
    const N = 7;
    const step = 38;       // x-spacing between consecutive carbons
    const yAmp = 16;       // zigzag amplitude
    const hZ = 28;         // hydrogen out-of-plane offset
    const hY = 18;         // hydrogen y-offset (away from the chain bend)
    const startX = -((N - 1) / 2) * step;

    const atoms: Atom3D[] = [];
    const bonds: Bond3D[] = [];

    // Carbons 0..N-1
    for (let i = 0; i < N; i++) {
      const x = startX + i * step;
      const y = i % 2 === 0 ? -yAmp : yAmp;
      atoms.push({ el: "C", x, y, z: 0 });
      if (i > 0) bonds.push({ a: i - 1, b: i });
    }

    // Two H per C (above and below the page plane). H y nudged opposite
    // to the carbon's zigzag offset so bonds spread cleanly.
    for (let i = 0; i < N; i++) {
      const c = atoms[i];
      const hYDir = c.y > 0 ? 1 : -1; // push H away from chain-side
      const hUp: Atom3D   = { el: "H", x: c.x, y: c.y + hYDir * hY, z:  hZ };
      const hDown: Atom3D = { el: "H", x: c.x, y: c.y + hYDir * hY, z: -hZ };
      const upIdx = atoms.length;
      atoms.push(hUp);
      const downIdx = atoms.length;
      atoms.push(hDown);
      bonds.push({ a: i, b: upIdx });
      bonds.push({ a: i, b: downIdx });
    }

    return {
      id: "polyethylene",
      formula: "(C₂H₄)ₙ",
      nameEn: "Polyethylene",
      nameKh: "ប៉ូលីអេទីឡែន",
      contextEn:
        "The most common plastic in the world. It is a massive, synthetic organic polymer used to make grocery bags, milk jugs, and many drink bottles. Because the carbon bonds are so strong, it takes hundreds of years to break down in nature, making upcycling incredibly important.",
      contextKh:
        "ប្លាស្ទិកដែលប្រើច្រើនបំផុតនៅលើពិភពលោក ។ វាជាប៉ូលីម៊ែរសរីរាង្គសំយោគដ៏ធំ ប្រើសម្រាប់ផលិតថង់ផ្សារ ដបទឹកដោះ និងដបភេសជ្ជៈជាច្រើន ។ ព្រោះតែចំណងកាបូនរឹងមាំខ្លាំង វាត្រូវការរាប់រយឆ្នាំដើម្បីរលាយក្នុងធម្មជាតិ ដូច្នេះការប្រើប្រាស់ឡើងវិញ (upcycling) គឺមានសារៈសំខាន់បំផុត ។",
      atoms,
      bonds,
    };
  })(),

  /* ── 2,4,6-Trinitrotoluene (TNT) C7H5N3O6 ──────────────────────────────
   * Aromatic toluene ring (CH3 at C1) with three NO2 groups at C2, C4, C6.
   * Built procedurally so the ring stays planar, NO2 groups splay outward,
   * and the methyl sits cleanly above C1. Element palette already includes
   * N (blue), O (red), C (dark grey), H (off-white).
   * ──────────────────────────────────────────────────────────────────── */
  (() => {
    const R = 56; // benzene ring radius
    // C1 at the top (90°), then clockwise: C2 (30°), C3 (-30°), C4 (-90°),
    // C5 (-150°), C6 (150°). C1 bears CH3; C2, C4, C6 bear NO2; C3, C5 bear H.
    const ringAnglesDeg = [90, 30, -30, -90, -150, 150];
    const ringAngles = ringAnglesDeg.map((d) => (d * Math.PI) / 180);
    const ringPos: Atom3D[] = ringAngles.map((a) => ({
      el: "C",
      x: R * Math.cos(a),
      y: R * Math.sin(a),
      z: 0,
    }));

    const atoms: Atom3D[] = [...ringPos]; // indices 0..5  (C1..C6)

    // Methyl carbon (C7) above C1, then 3 H's around it (tetrahedral-ish).
    const c1 = ringPos[0];
    const c7: Atom3D = { el: "C", x: c1.x, y: c1.y + 36, z: 0 }; // index 6
    atoms.push(c7);
    atoms.push({ el: "H", x: c7.x,      y: c7.y + 22, z: 0 });   // 7
    atoms.push({ el: "H", x: c7.x - 22, y: c7.y + 8,  z: 16 });  // 8
    atoms.push({ el: "H", x: c7.x + 22, y: c7.y + 8,  z: -16 }); // 9

    // Ring H's pointing radially outward from C3 (idx 2) and C5 (idx 4).
    const dCH = 28;
    const c3 = ringPos[2];
    atoms.push({
      el: "H",
      x: c3.x + dCH * Math.cos(ringAngles[2]),
      y: c3.y + dCH * Math.sin(ringAngles[2]),
      z: 0,
    }); // 10
    const c5 = ringPos[4];
    atoms.push({
      el: "H",
      x: c5.x + dCH * Math.cos(ringAngles[4]),
      y: c5.y + dCH * Math.sin(ringAngles[4]),
      z: 0,
    }); // 11

    // Three NO2 groups on C2 (idx 1), C4 (idx 3), C6 (idx 5).
    // For each: N pointing radially out, then two O's splayed ±36° in plane.
    const nitroIdxStarts: number[] = [];
    const nitroTargets = [1, 3, 5];
    const dCN = 32;
    const dNO = 26;
    const splay = Math.PI / 5; // 36°
    nitroTargets.forEach((ringIdx, t) => {
      const a = ringAngles[ringIdx];
      const cx = ringPos[ringIdx].x;
      const cy = ringPos[ringIdx].y;
      // Subtle alternating z-offset for depth cue while staying near-planar.
      const zN = t === 0 ? 8 : t === 2 ? -8 : 0;
      const nx = cx + dCN * Math.cos(a);
      const ny = cy + dCN * Math.sin(a);
      const nIdx = atoms.length;
      nitroIdxStarts.push(nIdx);
      atoms.push({ el: "N", x: nx, y: ny, z: zN });
      atoms.push({
        el: "O",
        x: nx + dNO * Math.cos(a + splay),
        y: ny + dNO * Math.sin(a + splay),
        z: zN + 6,
      });
      atoms.push({
        el: "O",
        x: nx + dNO * Math.cos(a - splay),
        y: ny + dNO * Math.sin(a - splay),
        z: zN - 6,
      });
    });

    const bonds: Bond3D[] = [
      // Aromatic Kekulé ring: alternating single/double bonds.
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4, order: 2 },
      { a: 4, b: 5 },
      { a: 5, b: 0, order: 2 },
      // Methyl group on C1.
      { a: 0, b: 6 },
      { a: 6, b: 7 }, { a: 6, b: 8 }, { a: 6, b: 9 },
      // Ring hydrogens.
      { a: 2, b: 10 },
      { a: 4, b: 11 },
      // Three NO2 groups: each ring-C → N (single), then N=O (double) and N–O (single).
      { a: 1, b: nitroIdxStarts[0] },
      { a: nitroIdxStarts[0], b: nitroIdxStarts[0] + 1, order: 2 },
      { a: nitroIdxStarts[0], b: nitroIdxStarts[0] + 2 },
      { a: 3, b: nitroIdxStarts[1] },
      { a: nitroIdxStarts[1], b: nitroIdxStarts[1] + 1, order: 2 },
      { a: nitroIdxStarts[1], b: nitroIdxStarts[1] + 2 },
      { a: 5, b: nitroIdxStarts[2] },
      { a: nitroIdxStarts[2], b: nitroIdxStarts[2] + 1, order: 2 },
      { a: nitroIdxStarts[2], b: nitroIdxStarts[2] + 2 },
    ];

    return {
      id: "tnt",
      formula: "C₇H₅N₃O₆",
      nameEn: "TNT",
      nameKh: "TNT",
      cardTitleEn: "2,4,6-Trinitrotoluene (TNT)",
      cardTitleKh: "ត្រីនីត្រូតូលុយអ៊ែន ២,៤,៦ (TNT)",
      contextEn:
        "A classic textbook explosive: a stable yellow solid that releases enormous energy when its rigid bonds suddenly rearrange.",
      contextKh:
        "ឧទាហរណ៍ផ្ទុះបុរាណក្នុងសៀវភៅសិក្សា៖ សារធាតុរឹងពណ៌លឿងស្ថិតស្ថេរ ដែលបញ្ចេញថាមពលដ៏ធំសម្បើមនៅពេលចំណងរឹងរបស់វាប្តូររចនាសម្ព័ន្ធភ្លាមៗ។",
      scienceEn:
        "Notice the red oxygen atoms packed tightly around the edge. This molecule is like a compressed spring. When triggered, the chemical bonds break, and the solid structure instantly recombines into carbon dioxide, water, and nitrogen gas. The sudden expansion of these gases from a solid state is what creates a shockwave.",
      scienceKh:
        "សូមកត់សម្គាល់អាតូមអុកស៊ីសែនពណ៌ក្រហមដែលប្រមូលផ្តុំគ្នាយ៉ាងតឹងណែននៅជុំវិញ។ ម៉ូលេគុលនេះប្រៀបដូចជាទម្រង់ស្ព្រីងដែលត្រូវគេសង្កត់។ នៅពេលមានការឆក់ អេឡិចត្រុងផ្តាច់ចំណងគីមី ហើយរចនាសម្ព័ន្ធរឹងនេះប្រែក្លាយទៅជាឧស្ម័នកាបូនឌីអុកស៊ីត ទឹក និងអាសូតភ្លាមៗ។ ការរីកមាឌយ៉ាងកំហុកនៃឧស្ម័នទាំងនេះពីសភាពរឹង បង្កើតបានជារលកសំពាធយ៉ាងខ្លាំង។",
      disclaimerEn:
        "Note: TNT and Dynamite are chemically different. Dynamite (invented by Alfred Nobel in 1867) is nitroglycerin absorbed into a stabilizer such as sawdust. TNT is a separate compound, far more stable to handle, and has been produced industrially since 1902.",
      disclaimerKh:
        "ចំណាំ៖ TNT និងឌីណាម៉ាយខុសគ្នាខាងគីមី។ ឌីណាម៉ាយ (ច្នៃប្រឌិតដោយលោក Alfred Nobel ឆ្នាំ ១៨៦៧) គឺនីត្រូក្លីសេរីនដែលជ្រាបក្នុងសារធាតុធ្វើឱ្យស្ថិតស្ថេរ ដូចជាកម្ទេចឈើ។ TNT ជាសមាសធាតុដាច់ដោយឡែក ដោះស្រាយបានស្ថិតស្ថេរជាង ហើយផលិតក្នុងឧស្សាហកម្មតាំងពីឆ្នាំ ១៩០២។",
      atoms,
      bonds,
    };
  })(),
];

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 2: Reaction Mechanisms — The Moving Puzzle
 * ប្រតិកម្មគីមី — ល្បែងផ្គុំផ្លាស់ប្តូរ
 * ══════════════════════════════════════════════════════════════════════════ */
function ReactionMechanismsSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section className="rounded-3xl border-4 border-teal-200 bg-white/80 backdrop-blur shadow-md p-5 sm:p-8 mb-8">
      <SectionHeader
        icon={Replace}
        eyebrowEn="Section 2"
        eyebrowKh="ផ្នែកទី ២"
        titleEn="Reaction Mechanisms: The Moving Puzzle"
        titleKh="ប្រតិកម្មគីមី៖ ល្បែងផ្គុំផ្លាស់ប្តូរ"
      />

      <p
        className={`text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-3xl ${
          kh ? "font-khmer text-lg leading-loose" : ""
        }`}
      >
        {t(
          "Carbon molecules are not frozen statues — they react. A 'mechanism' is the story of how a reaction actually happens, atom by atom. Two of the most important stories are Substitution and Elimination, and each comes in two flavors: a one-step crash and a two-step waiting game.",
          "ម៉ូលេគុលកាបូនមិនមែនជារូបចម្លាក់ស្ថិតស្ថេរទេ — ពួកវាប្រតិកម្ម។ 'យន្តការ' (mechanism) គឺជារឿងអំពីរបៀបដែលប្រតិកម្មកើតឡើងពិតប្រាកដ អាតូមម្តងមួយៗ។ រឿងសំខាន់បំផុតពីរគឺ ការជំនួស និង ការបំបាត់ ហើយនីមួយៗមានពីរប្រភេទ៖ ការប៉ះទង្គិចមួយជំហាន និង ល្បែងរង់ចាំពីរជំហាន។",
        )}
      </p>

      {/* ── Card 1: Substitution Reactions ──────────────────────── */}
      <MechanismCard
        kh={kh}
        tone="emerald"
        icon={Replace}
        labelEn="Card 1 · Substitution"
        labelKh="កាត ១ · ការជំនួស"
        titleEn="Substitution Reactions (SN1 vs SN2)"
        titleKh="ប្រតិកម្មជំនួស (SN1 ទល់នឹង SN2)"
        introEn="'Substitution' means swapping one piece of a molecule for another. A new player walks in, kicks the old player off the carbon, and takes its place."
        introKh="'ការជំនួស' មានន័យថា ប្តូរបំណែកមួយនៃម៉ូលេគុលជាមួយបំណែកថ្មីមួយ។ អ្នកលេងថ្មីចូលមក ទាត់អ្នកលេងចាស់ចេញពីកាបូន ហើយចូលកាន់កាប់កន្លែង។"
      >
        <SubMechanismCard
          tone="sky"
          icon={Zap}
          tagEn="ONE-STEP · CRASH"
          tagKh="មួយជំហាន · ប៉ះទង្គិច"
          nameEn="SN2 — The Backside Attack"
          nameKh="SN2 — ការវាយលុកពីខាងក្រោយ"
          bodyEn="A new attacker (Nu⁻) crashes into the carbon from the back, instantly popping the old leaving group (X) off the front. Everything happens in one single, explosive step. Because the attacker needs room to swing, SN2 only works on a 'skinny' (uncrowded) carbon."
          bodyKh="អ្នកវាយលុកថ្មី (Nu⁻) បុកចូលកាបូនពីខាងក្រោយ ហើយធ្វើឲ្យក្រុមចាកចេញចាស់ (X) លោតចេញពីខាងមុខភ្លាមៗ។ អ្វីៗកើតឡើងក្នុងជំហានតែមួយ។ ដោយសារអ្នកវាយលុកត្រូវការកន្លែង SN2 ដំណើរការតែលើកាបូន 'ស្តើង' (មិនច្រើនក្រុម)។"
          diagram="Nu⁻  +  C—X   →   Nu—C   +  X⁻"
          captionEn="One-step: bond forms and bond breaks at the same instant."
          captionKh="មួយជំហាន៖ ចំណងថ្មីកើត និងចំណងចាស់បាក់ ក្នុងពេលតែមួយ។"
          kh={kh}
        />
        <SubMechanismCard
          tone="amber"
          icon={Hourglass}
          tagEn="TWO-STEP · WAITING GAME"
          tagKh="ពីរជំហាន · ល្បែងរង់ចាំ"
          nameEn="SN1 — The Two-Step Waiting Game"
          nameKh="SN1 — ល្បែងរង់ចាំពីរជំហាន"
          bodyEn={
            "First, the old leaving group (X) drops off all by itself, leaving behind a highly unstable Carbocation (a carbon with a +1 charge). Then, in a second step, the new attacker (Nu) walks in and attaches. SN1 needs a 'bulky' carbon (lots of neighbors) to stabilize that nervous carbocation while it waits."
          }
          bodyKh="ដំបូង ក្រុមចាកចេញ (X) ដាច់ចេញដោយខ្លួនឯង ទុកនៅពីក្រោយនូវ កាបូកាត្យុង (Carbocation) ដ៏អស្ថិរភាព (កាបូនមានបន្ទុក +1)។ បន្ទាប់មកក្នុងជំហានទីពីរ អ្នកវាយលុកថ្មី (Nu) ចូលមកភ្ជាប់។ SN1 ត្រូវការកាបូន 'ធំ' (មានអ្នកជិតខាងច្រើន) ដើម្បីធ្វើឲ្យកាបូកាត្យុងស្ថិតស្ថេរក្នុងពេលរង់ចាំ។"
          diagram={
            "Step 1:   C—X         →   C⁺   +  X⁻\n" +
            "Step 2:   C⁺   +  Nu  →   C—Nu"
          }
          captionEn="Two-step: leave first, then attack. The carbocation is the unstable rest stop in the middle."
          captionKh="ពីរជំហាន៖ ចាកចេញមុន រួចទើបវាយលុក។ កាបូកាត្យុងគឺជាកន្លែងសម្រាកអស្ថិរភាពនៅកណ្តាល។"
          kh={kh}
        />
      </MechanismCard>

      {/* ── Card 2: Elimination Reactions ───────────────────────── */}
      <div className="mt-6">
        <MechanismCard
          kh={kh}
          tone="rose"
          icon={Scissors}
          labelEn="Card 2 · Elimination"
          labelKh="កាត ២ · ការបំបាត់"
          titleEn="Elimination Reactions (E1 vs E2)"
          titleKh="ប្រតិកម្មបំបាត់ (E1 ទល់នឹង E2)"
          introEn={
            "'Elimination' means stealing atoms away from the carbon chain to force it to fold into a new Double Bond (C=C). Instead of swapping in a new piece, the molecule loses two pieces and forms a brand-new bond between two carbons."
          }
          introKh="'ការបំបាត់' មានន័យថា លួចអាតូមចេញពីខ្សែកាបូនដើម្បីបង្ខំឲ្យវាបង្កើតជា ចំណងទ្វេ ថ្មី (C=C)។ ជំនួសឲ្យការដាក់បំណែកថ្មីចូល ម៉ូលេគុលបាត់បង់បំណែកពីរ ហើយបង្កើតចំណងថ្មីរវាងកាបូនពីរ។"
        >
          <SubMechanismCard
            tone="sky"
            icon={Zap}
            tagEn="ONE-STEP · STEAL"
            tagKh="មួយជំហាន · លួច"
            nameEn="E2 — The One-Step Steal"
            nameKh="E2 — ការលួចមួយជំហាន"
            bodyEn="A strong base steals a hydrogen atom from one carbon at the exact same instant that the leaving group (X) pops off the next carbon. The freed electrons snap together into a brand-new double bond — all in one synchronized motion."
            bodyKh="បាសខ្លាំងលួចអាតូមអ៊ីដ្រូសែនពីកាបូនមួយ នៅពេលតែមួយដែលក្រុមចាកចេញ (X) លោតចេញពីកាបូនបន្ទាប់។ អេឡិចត្រុងដែលមានសេរីភាពភ្ជាប់គ្នាជាចំណងទ្វេថ្មីក្រាស់ — ក្នុងចលនាសមកាលកម្មតែមួយ។"
            diagram={
              "B⁻  H—C—C—X   →   B—H  +  C=C  +  X⁻\n" +
              "         ↑                ↑\n" +
              "    base steals H    new double bond"
            }
            captionEn="One-step: H leaves, X leaves, and the double bond forms — all together."
            captionKh="មួយជំហាន៖ H ចេញ X ចេញ ហើយចំណងទ្វេកើត — ទាំងអស់ព្រមគ្នា។"
            kh={kh}
          />
          <SubMechanismCard
            tone="amber"
            icon={Hourglass}
            tagEn="TWO-STEP · STEAL"
            tagKh="ពីរជំហាន · លួច"
            nameEn="E1 — The Two-Step Steal"
            nameKh="E1 — ការលួចពីរជំហាន"
            bodyEn="Just like SN1, the leaving group (X) drops off first, creating an unstable Carbocation. In step two, a weak base wanders by and steals a hydrogen from the neighbor carbon, which lets the leftover electrons fall into place as a double bond."
            bodyKh="ដូចគ្នានឹង SN1 ដែរ ក្រុមចាកចេញ (X) ដាច់ចេញមុន បង្កើតកាបូកាត្យុងអស្ថិរភាព។ ក្នុងជំហានទីពីរ បាសខ្សោយដើរកាត់ ហើយលួចអាតូមអ៊ីដ្រូសែនពីកាបូនជិតខាង ដែលអនុញ្ញាតឲ្យអេឡិចត្រុងដែលនៅសល់ធ្លាក់ចូលជាចំណងទ្វេ។"
            diagram={
              "Step 1:   H—C—C—X       →   H—C—C⁺   +  X⁻\n" +
              "Step 2:   H—C—C⁺  +  B  →   C=C      +  B—H"
            }
            captionEn="Two-step: leave first, then steal. Same carbocation pit-stop as SN1."
            captionKh="ពីរជំហាន៖ ចាកចេញមុន រួចទើបលួច។ ឈប់ត្រង់កាបូកាត្យុងដូច SN1 ដែរ។"
            kh={kh}
          />
        </MechanismCard>
      </div>

      {/* Quick-look cheat-sheet */}
      <div className="mt-6 rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-4 sm:p-5">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.25em] text-teal-700 mb-2 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("Quick comparison", "ការប្រៀបធៀបរហ័ស")}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="text-left text-slate-600">
                <th className={`py-2 pr-3 font-semibold ${kh ? "font-khmer" : ""}`}>
                  {t("Mechanism", "យន្តការ")}
                </th>
                <th className={`py-2 pr-3 font-semibold ${kh ? "font-khmer" : ""}`}>
                  {t("Steps", "ជំហាន")}
                </th>
                <th className={`py-2 pr-3 font-semibold ${kh ? "font-khmer" : ""}`}>
                  {t("Likes carbon that is…", "ស្រឡាញ់កាបូនបែប…")}
                </th>
                <th className={`py-2 font-semibold ${kh ? "font-khmer" : ""}`}>
                  {t("Result", "លទ្ធផល")}
                </th>
              </tr>
            </thead>
            <tbody className={`text-slate-700 ${kh ? "font-khmer" : ""}`}>
              <tr className="border-t border-teal-200/70">
                <td className="py-2 pr-3 font-mono font-bold text-emerald-700">SN2</td>
                <td className="py-2 pr-3">{t("1", "១")}</td>
                <td className="py-2 pr-3">{t("skinny", "ស្តើង")}</td>
                <td className="py-2">{t("swap (new piece in)", "ជំនួស (បំណែកថ្មីចូល)")}</td>
              </tr>
              <tr className="border-t border-teal-200/70">
                <td className="py-2 pr-3 font-mono font-bold text-emerald-700">SN1</td>
                <td className="py-2 pr-3">{t("2", "២")}</td>
                <td className="py-2 pr-3">{t("bulky", "ធំ")}</td>
                <td className="py-2">{t("swap (via carbocation)", "ជំនួស (តាមរយៈកាបូកាត្យុង)")}</td>
              </tr>
              <tr className="border-t border-teal-200/70">
                <td className="py-2 pr-3 font-mono font-bold text-rose-700">E2</td>
                <td className="py-2 pr-3">{t("1", "១")}</td>
                <td className="py-2 pr-3">{t("any", "ណាមួយ")}</td>
                <td className="py-2">{t("new double bond C=C", "ចំណងទ្វេថ្មី C=C")}</td>
              </tr>
              <tr className="border-t border-teal-200/70">
                <td className="py-2 pr-3 font-mono font-bold text-rose-700">E1</td>
                <td className="py-2 pr-3">{t("2", "២")}</td>
                <td className="py-2 pr-3">{t("bulky", "ធំ")}</td>
                <td className="py-2">{t("new double bond C=C", "ចំណងទ្វេថ្មី C=C")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── Mechanism outer card (one per family) ─────────────────────────────── */
type MechTone = "emerald" | "rose";
const MECH_TONES: Record<MechTone, { border: string; chip: string; iconBg: string; eyebrow: string }> = {
  emerald: {
    border: "border-emerald-200",
    chip: "bg-emerald-100 text-emerald-800",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    eyebrow: "text-emerald-700",
  },
  rose: {
    border: "border-rose-200",
    chip: "bg-rose-100 text-rose-800",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    eyebrow: "text-rose-700",
  },
};

function MechanismCard({
  kh,
  tone,
  icon: Icon,
  labelEn,
  labelKh,
  titleEn,
  titleKh,
  introEn,
  introKh,
  children,
}: {
  kh: boolean;
  tone: MechTone;
  icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  titleEn: string;
  titleKh: string;
  introEn: string;
  introKh: string;
  children: React.ReactNode;
}) {
  const T = MECH_TONES[tone];
  return (
    <article className={`rounded-2xl border-2 ${T.border} bg-white shadow-sm p-5 sm:p-6`}>
      <header className="flex items-start gap-3 mb-3">
        <div className={`shrink-0 w-11 h-11 rounded-xl ${T.iconBg} text-white shadow flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-bold uppercase tracking-[0.25em] ${T.eyebrow} mb-1 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {kh ? labelKh : labelEn}
          </div>
          <h3 className={`font-display text-xl sm:text-2xl font-extrabold text-slate-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? titleKh : titleEn}
          </h3>
        </div>
      </header>
      <p
        className={`text-sm sm:text-base text-slate-700 leading-relaxed mb-4 ${
          kh ? "font-khmer text-base leading-loose" : ""
        }`}
      >
        {kh ? introKh : introEn}
      </p>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </article>
  );
}

/* ── Sub-mechanism card (SN1 / SN2 / E1 / E2) ──────────────────────────── */
type SubTone = "sky" | "amber";
const SUB_TONES: Record<SubTone, { border: string; bg: string; chip: string; ring: string; tagText: string }> = {
  sky: {
    border: "border-sky-200",
    bg: "bg-gradient-to-br from-sky-50 to-cyan-50",
    chip: "bg-sky-600 text-white",
    ring: "ring-sky-300/60",
    tagText: "text-sky-800 bg-sky-100",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    chip: "bg-amber-600 text-white",
    ring: "ring-amber-300/60",
    tagText: "text-amber-800 bg-amber-100",
  },
};

function SubMechanismCard({
  kh,
  tone,
  icon: Icon,
  tagEn,
  tagKh,
  nameEn,
  nameKh,
  bodyEn,
  bodyKh,
  diagram,
  captionEn,
  captionKh,
}: {
  kh: boolean;
  tone: SubTone;
  icon: React.ComponentType<{ className?: string }>;
  tagEn: string;
  tagKh: string;
  nameEn: string;
  nameKh: string;
  bodyEn: string;
  bodyKh: string;
  diagram: string;
  captionEn: string;
  captionKh: string;
}) {
  const S = SUB_TONES[tone];
  return (
    <div className={`rounded-xl border-2 ${S.border} ${S.bg} p-4 flex flex-col`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${S.chip} shadow-sm ring-1 ${S.ring}`}>
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${S.tagText} ${
            kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
          }`}
        >
          {kh ? tagKh : tagEn}
        </span>
      </div>
      <h4 className={`font-bold text-slate-900 text-base sm:text-lg mb-2 ${kh ? "font-khmer" : ""}`}>
        {kh ? nameKh : nameEn}
      </h4>
      <p className={`text-sm text-slate-700 leading-relaxed mb-3 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
        {kh ? bodyKh : bodyEn}
      </p>
      <pre
        className="rounded-lg bg-slate-900 text-emerald-200 text-[11px] sm:text-xs font-mono p-3 overflow-x-auto whitespace-pre leading-relaxed shadow-inner"
        aria-label={kh ? "ដ្យាក្រាមប្រតិកម្ម" : "Reaction diagram"}
      >
        {diagram}
      </pre>
      <p
        className={`text-[11px] sm:text-xs text-slate-600 italic mt-2 ${
          kh ? "font-khmer not-italic leading-loose" : ""
        }`}
      >
        {kh ? captionKh : captionEn}
      </p>
    </div>
  );
}

function MoleculeViewerSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [activeId, setActiveId] = useState<string>(MOLECULES[0].id);
  const active = MOLECULES.find((m) => m.id === activeId)!;

  return (
    <section className="rounded-3xl border-4 border-cyan-200 bg-white/80 backdrop-blur shadow-md p-5 sm:p-8 mb-8">
      <SectionHeader
        icon={Move3d}
        eyebrowEn="Section 3"
        eyebrowKh="ផ្នែកទី ៣"
        titleEn="Spin a Molecule in 3D"
        titleKh="បង្វិលម៉ូលេគុលក្នុង ៣D"
      />
      <p className={`text-sm sm:text-base text-slate-600 mb-5 max-w-2xl ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
        {t(
          "Click and drag the molecule to rotate it. See how atoms sit in real 3D space — chemistry isn't flat!",
          "ចុច និងអូសម៉ូលេគុលដើម្បីបង្វិល។ មើលថាតើអាតូមនៅក្នុងលំហ ៣D ពិតយ៉ាងណា — គីមីវិទ្យាមិនមែនសំប៉ែតទេ!",
        )}
      </p>

      {/* Molecule selector */}
      <div className="flex flex-wrap gap-2 mb-5" role="tablist">
        {MOLECULES.map((m) => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              role="tab"
              aria-selected={isActive}
              data-testid={`molecule-button-${m.id}`}
              onClick={() => setActiveId(m.id)}
              className={`px-3 sm:px-4 py-2 rounded-xl border-2 font-bold text-sm sm:text-base transition active:scale-95 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-teal-700 shadow-lg"
                  : "bg-white border-slate-300 text-slate-700 hover:border-cyan-400 hover:shadow"
              }`}
            >
              <span className={kh ? "font-khmer" : ""}>{kh ? m.nameKh : m.nameEn}</span>
              <span className="ml-1.5 opacity-70 font-mono text-xs">{m.formula}</span>
            </button>
          );
        })}
      </div>

      {/* Viewer + context */}
      <div className="grid md:grid-cols-2 gap-5 items-stretch">
        <Molecule3DViewer key={active.id} mol={active} />

        {/* Context card */}
        <div
          data-testid="molecule-context-card"
          className="rounded-2xl border-4 border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 p-5 flex flex-col"
        >
          <div className={`text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("In your daily life", "ក្នុងជីវភាពប្រចាំថ្ងៃរបស់អ្នក")}
          </div>
          <h3 className={`font-display text-2xl sm:text-3xl font-extrabold text-emerald-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            <span data-testid="molecule-card-title">
              {kh
                ? (active.cardTitleKh ?? active.nameKh)
                : (active.cardTitleEn ?? active.nameEn)}
            </span>
            <span className="ml-2 text-base sm:text-lg font-mono text-emerald-700/80">{active.formula}</span>
          </h3>
          <p className={`text-base text-emerald-900/90 leading-relaxed ${kh ? "font-khmer text-lg leading-loose" : ""} ${active.scienceEn ? "" : "flex-1"}`}>
            {kh ? active.contextKh : active.contextEn}
          </p>

          {/* Optional Science Breakdown — for molecules that need a deeper bilingual explainer (e.g. TNT). */}
          {active.scienceEn && active.scienceKh && (
            <div
              data-testid="molecule-science-breakdown"
              className="mt-4 rounded-xl border-2 border-amber-300/70 bg-amber-50/80 p-4"
            >
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-800 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Zap className="w-3.5 h-3.5" aria-hidden />
                {t("Science Breakdown", "ការពន្យល់បែបវិទ្យាសាស្ត្រ")}
              </div>
              <p className={`text-sm sm:text-base text-amber-950 leading-relaxed ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
                {kh ? active.scienceKh : active.scienceEn}
              </p>
            </div>
          )}

          {/* Optional disclaimer — used by TNT to clarify TNT ≠ Dynamite. */}
          {active.disclaimerEn && active.disclaimerKh && (
            <div
              data-testid="molecule-disclaimer"
              className="mt-3 flex items-start gap-2 rounded-xl border border-slate-300 bg-white/70 p-3 text-xs sm:text-sm text-slate-700"
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" aria-hidden />
              <span className={kh ? "font-khmer text-sm sm:text-base leading-loose" : "leading-relaxed"}>
                {kh ? active.disclaimerKh : active.disclaimerEn}
              </span>
            </div>
          )}

          <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-slate-600">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-600" aria-hidden />
            <span className={kh ? "font-khmer text-sm sm:text-base" : ""}>
              {t(
                "Color guide: dark gray = carbon (C), light = hydrogen (H), red = oxygen (O), blue = nitrogen (N).",
                "មគ្គុទ្ទេសក៍ពណ៌៖ ប្រផេះខ្មៅ = កាបូន (C), ស = អ៊ីដ្រូសែន (H), ក្រហម = អុកស៊ីសែន (O), ខៀវ = អាសូត (N)។",
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3D viewer: SVG with pointer-drag rotation ─────────────────────────── */
function Molecule3DViewer({ mol }: { mol: Molecule }) {
  const t = useTranslation();
  const [rot, setRot] = useState({ x: -0.3, y: 0.4 });
  const [auto, setAuto] = useState(true);
  const dragging = useRef(false);
  const lastP = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  /* Auto-spin until the user touches it */
  useEffect(() => {
    if (!auto) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRot((r) => ({ ...r, y: r.y + dt * 0.4 }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [auto]);

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastP.current = { x: e.clientX, y: e.clientY };
    setAuto(false);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || !lastP.current) return;
    const dx = e.clientX - lastP.current.x;
    const dy = e.clientY - lastP.current.y;
    lastP.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, r.x + dy * 0.01)),
      y: r.y + dx * 0.01,
    }));
  }
  function onPointerUp() {
    dragging.current = false;
    lastP.current = null;
  }

  /* Project 3D atoms to 2D */
  const projected = useMemo(() => {
    const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
    const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);
    return mol.atoms.map((a, i) => {
      // Rotate around Y axis
      const x1 =  a.x * cosY + a.z * sinY;
      const z1 = -a.x * sinY + a.z * cosY;
      // Rotate around X axis
      const y2 = a.y * cosX - z1 * sinX;
      const z2 = a.y * sinX + z1 * cosX;
      return { i, el: a.el, x: x1, y: y2, z: z2 };
    });
  }, [mol, rot]);

  /* Sort atoms back-to-front so closer ones overlap further ones */
  const drawOrder = useMemo(
    () => [...projected].sort((a, b) => a.z - b.z),
    [projected],
  );

  /* Effective size scale via z (orthographic-with-z-depth shading) */
  const VIEW = 360;
  const SCALE = 1.6;
  const cx = VIEW / 2, cy = VIEW / 2;
  function depthShade(z: number) {
    // z ranges roughly -100..100; map to 0.55..1
    return Math.max(0.55, Math.min(1, 0.78 + z / 400));
  }

  return (
    <div className="rounded-2xl border-4 border-cyan-300 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 shadow-inner overflow-hidden relative">
      {/* Hexagon backdrop inside viewer */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden>
        <defs>
          <pattern id="hex-dark" width="40" height="35" patternUnits="userSpaceOnUse">
            <polygon points="10,0 30,0 40,17 30,35 10,35 0,17" fill="none" stroke="#5eead4" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-dark)" />
      </svg>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative cursor-grab active:cursor-grabbing select-none touch-none"
        style={{ aspectRatio: "1 / 1" }}
        role="img"
        aria-label={`3D model of ${mol.nameEn} — drag to rotate`}
      >
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-full">
          {/* Bonds (drawn by midpoint depth, behind atoms).
              Multi-bonds (order 2 / 3) render as parallel offset lines. */}
          {mol.bonds.map((b, i) => {
            const a = projected[b.a], c = projected[b.b];
            const midZ = (a.z + c.z) / 2;
            const shade = depthShade(midZ);
            const x1 = cx + a.x * SCALE, y1 = cy + a.y * SCALE;
            const x2 = cx + c.x * SCALE, y2 = cy + c.y * SCALE;
            const order = b.order ?? 1;
            const dx = x2 - x1, dy = y2 - y1;
            const len = Math.hypot(dx, dy) || 1;
            const px = -dy / len, py = dx / len;
            const sep = 5;
            const offsets =
              order === 2 ? [-sep / 2, sep / 2]
              : order === 3 ? [-sep, 0, sep]
              : [0];
            return (
              <g key={i}>
                {offsets.map((o, k) => (
                  <line
                    key={k}
                    x1={x1 + px * o} y1={y1 + py * o}
                    x2={x2 + px * o} y2={y2 + py * o}
                    stroke={`rgba(226,232,240,${shade})`}
                    strokeWidth={(order > 1 ? 3.5 : 5) * shade}
                    strokeLinecap="round"
                  />
                ))}
              </g>
            );
          })}

          {/* Atoms — back to front */}
          {drawOrder.map((p) => {
            const style = ATOM_STYLE[p.el];
            const shade = depthShade(p.z);
            const r = style.r * (0.85 + shade * 0.4);
            return (
              <g key={p.i}>
                <circle
                  cx={cx + p.x * SCALE}
                  cy={cy + p.y * SCALE}
                  r={r}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={1.5}
                  opacity={shade}
                />
                {/* Highlight for "spherical" feel */}
                <circle
                  cx={cx + p.x * SCALE - r * 0.35}
                  cy={cy + p.y * SCALE - r * 0.35}
                  r={r * 0.35}
                  fill="rgba(255,255,255,0.45)"
                />
                <text
                  x={cx + p.x * SCALE}
                  y={cy + p.y * SCALE + r * 0.35}
                  textAnchor="middle"
                  fontSize={r * 0.95}
                  fontWeight={800}
                  fill={p.el === "H" ? "#0f172a" : "#fff"}
                  style={{ pointerEvents: "none" }}
                >
                  {style.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hint */}
        {auto && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-cyan-100 text-xs font-bold pointer-events-none">
            <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
            {t("Drag to rotate", "អូសដើម្បីបង្វិល")}
          </div>
        )}
      </div>

      {/* Reset button */}
      <div className="absolute top-2 right-2">
        <button
          type="button"
          onClick={() => { setRot({ x: -0.3, y: 0.4 }); setAuto(true); }}
          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-cyan-100 text-xs font-bold border border-white/20 transition"
          title={t("Reset rotation & resume auto-spin", "កំណត់ឡើងវិញ")}
        >
          <RotateCw className="w-3 h-3 inline -mt-0.5 mr-1" />
          {t("Reset", "កំណត់ឡើងវិញ")}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3: Chemistry in Cambodia
 * ══════════════════════════════════════════════════════════════════════════ */
function RealWorldSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <section className="rounded-3xl border-4 border-amber-200 bg-white/80 backdrop-blur shadow-md p-5 sm:p-8 mb-8">
      <SectionHeader
        icon={Sparkles}
        eyebrowEn="Section 4"
        eyebrowKh="ផ្នែកទី ៤"
        titleEn="Chemistry in Cambodia"
        titleKh="គីមីវិទ្យានៅកម្ពុជា"
      />
      <p className={`text-sm sm:text-base text-slate-600 mb-5 max-w-2xl ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
        {t(
          "Carbon isn't just in textbooks — it's in everything around you. Three real examples:",
          "កាបូនមិនមែនមានតែក្នុងសៀវភៅសិក្សាទេ — វាមាននៅគ្រប់ទីកន្លែងជុំវិញអ្នក។ ឧទាហរណ៍ពិតបី៖",
        )}
      </p>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
        <RealWorldCard
          kh={kh}
          tone="cyan"
          icon={Recycle}
          titleEn="Plastics"
          titleKh="ប្លាស្ទិក"
          tagEn="Polymers · Sustainability"
          tagKh="ប៉ូលីម៊ែរ · និរន្តរភាព"
          bodyEn="Long carbon chains — called polymers — make every plastic water bottle, bag, and pipe. Understanding them helps us recycle and reduce pollution in the Mekong."
          bodyKh="ខ្សែកាបូនវែងៗ — ហៅថាប៉ូលីម៊ែរ — បង្កើតគ្រប់ដបទឹក កាបូប និងបំពង់ប្លាស្ទិក។ ការយល់ដឹងអំពីពួកវាជួយយើងកែច្នៃ និងកាត់បន្ថយការបំពុលនៅទន្លេមេគង្គ។"
          chemistryEn="Polyethylene: ( –CH₂–CH₂– )ₙ"
          chemistryKh="ប៉ូលីអេទីឡែន៖ ( –CH₂–CH₂– )ₙ"
        />
        <RealWorldCard
          kh={kh}
          tone="emerald"
          icon={Wheat}
          titleEn="Agriculture"
          titleKh="កសិកម្ម"
          tagEn="Fertilizers · Pesticides"
          tagKh="ជី · ថ្នាំសម្លាប់សត្វល្អិត"
          bodyEn="Urea fertilizer (CO(NH₂)₂) feeds rice paddies with nitrogen. Pesticides are organic molecules designed to interrupt insect biology — but they must be used carefully to protect the soil."
          bodyKh="ជីអ៊ុយរ៉េ (CO(NH₂)₂) ផ្ដល់អាសូតដល់ស្រែ។ ថ្នាំសម្លាប់សត្វល្អិតគឺម៉ូលេគុលសរីរាង្គដែលបង្កើតឡើងដើម្បីរំខានជីវវិទ្យាសត្វល្អិត — ប៉ុន្តែត្រូវប្រើប្រាស់ដោយប្រុងប្រយ័ត្នដើម្បីការពារដី។"
          chemistryEn="Urea: CO(NH₂)₂"
          chemistryKh="អ៊ុយរ៉េ៖ CO(NH₂)₂"
        />
        <RealWorldCard
          kh={kh}
          tone="rose"
          icon={Pill}
          titleEn="Medicine"
          titleKh="ឱសថ"
          tagEn="Paracetamol · Drug design"
          tagKh="ប៉ារ៉ាសេតាមុល · រចនាថ្នាំ"
          bodyEn="Paracetamol — the painkiller in nearly every Cambodian pharmacy — is just 8 carbons, 9 hydrogens, 1 nitrogen, and 2 oxygens arranged in a precise shape that fits your body's pain receptors."
          bodyKh="ប៉ារ៉ាសេតាមុល — ថ្នាំបំបាត់ការឈឺក្នុងស្ទើរគ្រប់ឱសថស្ថានកម្ពុជា — គឺគ្រាន់តែជាកាបូន ៨ អ៊ីដ្រូសែន ៩ អាសូត ១ និងអុកស៊ីសែន ២ រៀបចំក្នុងរូបរាងជាក់លាក់ដែលត្រូវនឹងអ្នកទទួលការឈឺនៃរាងកាយរបស់អ្នក។"
          chemistryEn="Paracetamol: C₈H₉NO₂"
          chemistryKh="ប៉ារ៉ាសេតាមុល៖ C₈H₉NO₂"
        />
      </div>
    </section>
  );
}

function RealWorldCard({
  kh, tone, icon: Icon, titleEn, titleKh, tagEn, tagKh, bodyEn, bodyKh, chemistryEn, chemistryKh,
}: {
  kh: boolean;
  tone: "cyan" | "emerald" | "rose";
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string; titleKh: string;
  tagEn: string; tagKh: string;
  bodyEn: string; bodyKh: string;
  chemistryEn: string; chemistryKh: string;
}) {
  const TONE = {
    cyan:    { card: "from-cyan-50 to-sky-100 border-cyan-300",    text: "text-cyan-900",    pill: "bg-cyan-200 text-cyan-900",    hex: "text-cyan-200" },
    emerald: { card: "from-emerald-50 to-teal-100 border-emerald-300", text: "text-emerald-900", pill: "bg-emerald-200 text-emerald-900", hex: "text-emerald-200" },
    rose:    { card: "from-rose-50 to-pink-100 border-rose-300",  text: "text-rose-900",    pill: "bg-rose-200 text-rose-900",    hex: "text-rose-200" },
  }[tone];
  return (
    <article className={`relative rounded-2xl border-4 bg-gradient-to-br ${TONE.card} p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition flex flex-col overflow-hidden`}>
      <Hexagon className={`absolute -right-4 -bottom-6 w-32 h-32 ${TONE.hex}`} aria-hidden />
      <div className="relative flex items-center gap-2 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center">
          <Icon className={`w-6 h-6 ${TONE.text}`} />
        </div>
        <div className="min-w-0">
          <h3 className={`font-display font-extrabold text-xl ${TONE.text} leading-tight ${kh ? "font-khmer" : ""}`}>
            {kh ? titleKh : titleEn}
          </h3>
          <div className={`text-[10px] font-bold uppercase tracking-wider opacity-70 ${TONE.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? tagKh : tagEn}
          </div>
        </div>
      </div>
      <p className={`relative text-sm sm:text-base text-slate-700 leading-relaxed flex-1 ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
        {kh ? bodyKh : bodyEn}
      </p>
      <div className={`relative mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${TONE.pill} self-start`}>
        <Hexagon className="w-3.5 h-3.5" />
        <span className={kh ? "font-khmer" : ""}>{kh ? chemistryKh : chemistryEn}</span>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Shared header
 * ══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({
  icon: Icon, eyebrowEn, eyebrowKh, titleEn, titleKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className={`text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? eyebrowKh : eyebrowEn}
        </div>
        <h2 className={`font-display text-2xl sm:text-3xl font-extrabold text-slate-900 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h2>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 4: The Organic Lab — Tools & Glassware / ឧបករណ៍មន្ទីរពិសោធន៍សរីរាង្គ
 * Clean-laboratory aesthetic: light grid, semi-transparent glass, neon green
 * and bright blue liquids.
 * ══════════════════════════════════════════════════════════════════════════ */

const LIQUID_GREEN = "#22c55e";
const LIQUID_BLUE = "#0ea5e9";
const GLASS_OUTLINE = "#94a3b8";
const GLASS_FILL = "rgba(226,232,240,0.45)";

function OrganicLabSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <section className="rounded-3xl border-4 border-sky-200 bg-white/90 backdrop-blur shadow-md p-5 sm:p-8 mb-8">
      <SectionHeader
        icon={FlaskConical}
        eyebrowEn="Module 05 · Section 05 · Lab Manual"
        eyebrowKh="មុខវិជ្ជា ០៥ · ផ្នែក ០៥ · សៀវភៅណែនាំមន្ទីរពិសោធន៍"
        titleEn="The Organic Lab — Tools & Glassware"
        titleKh="ឧបករណ៍មន្ទីរពិសោធន៍សរីរាង្គ"
      />

      <p className={`text-base sm:text-lg text-slate-700 leading-relaxed mb-6 ${kh ? "font-khmer text-lg leading-loose" : ""}`}>
        {t(
          "Every shape in a chemist's lab has a reason. The wide-mouth beaker is built for stirring; the tall narrow cylinder is built for measuring. Learn the form, and the function becomes obvious.",
          "រាល់រូបរាងនៅក្នុងមន្ទីរពិសោធន៍គីមីវិទូមានហេតុផល។ កែវបេស៊ែរមាត់ធំសង់ឡើងសម្រាប់កូរ ស៊ីឡាំងតូចខ្ពស់សង់ឡើងសម្រាប់វាស់។ យល់ដឹងពីទម្រង់ មុខងារនឹងច្បាស់ដោយខ្លួនឯង។",
        )}
      </p>

      <GlasswareCatalog kh={kh} />
      <DistillationDeepDive kh={kh} />
      <PrecisionGoldenRule kh={kh} />
    </section>
  );
}

/* ── 4.1 The Glassware Catalog ───────────────────────────────────────────── */
type GlassItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  nameEn: string;
  nameKh: string;
  formEn: string;
  formKh: string;
  functionEn: string;
  functionKh: string;
  warningEn?: string;
  warningKh?: string;
  liquid: "green" | "blue" | "none";
  Diagram: React.FC<{ kh: boolean }>;
};

const GLASSWARE: GlassItem[] = [
  {
    id: "beaker",
    icon: Beaker,
    nameEn: "Beaker",
    nameKh: "កែវបេស៊ែរ",
    formEn: "Wide mouth, flat bottom, straight cylindrical sides with a small pouring spout.",
    formKh: "មាត់ធំ បាតរាបស្មើ ជញ្ជាំងស៊ីឡាំងត្រង់ មានបបូរមាត់តូចមួយ។",
    functionEn: "Holding, transferring, and rough mixing of liquids. The graduations on the side are for rough estimates only — never trust them for precise measurement.",
    functionKh: "ផ្ទុក ផ្ទេរ និងលាយដុំទឹក។ កំណាត់នៅម្ខាងសម្រាប់តែការប៉ាន់ប្រមាណគួរសម — កុំទុកចិត្តវាសម្រាប់ការវាស់ច្បាស់លាស់ឡើយ។",
    warningEn: "Volume reading is accurate only to about ±5 %.",
    warningKh: "ការអានបរិមាណមានភាពត្រឹមត្រូវត្រឹមតែ ±៥ % ប៉ុណ្ណោះ។",
    liquid: "green",
    Diagram: BeakerSvg,
  },
  {
    id: "erlenmeyer",
    icon: FlaskConical,
    nameEn: "Erlenmeyer Flask",
    nameKh: "កែវរូបសាជី",
    formEn: "Conical body with sloped sides narrowing to a small neck.",
    formKh: "តួរូបសាជី ជញ្ជាំងជម្រាលតូចចូលរកករួមតូច។",
    functionEn: "Designed so you can swirl liquids rapidly without splashing them out — the narrow neck is the splash guard. Perfect for titrations and mixing reactions.",
    functionKh: "រចនាឡើងសម្រាប់ឱ្យអ្នកអាចកូរទឹករហ័សដោយមិនធ្វើឱ្យខ្ចាយចេញ — កតូចជាជញ្ជាំងការពារការខ្ចាយ។ ល្អឥតខ្ចោះសម្រាប់ការវាស់ត្រូត និងការលាយប្រតិកម្ម។",
    liquid: "blue",
    Diagram: ErlenmeyerSvg,
  },
  {
    id: "cylinder",
    icon: TestTube,
    nameEn: "Graduated Cylinder",
    nameKh: "ស៊ីឡាំងវាស់",
    formEn: "Tall, narrow tube with a wide base, marked with finely-spaced volume lines.",
    formKh: "បំពង់ខ្ពស់តូច មានគ្រឹះធំ បានសម្គាល់ដោយខ្សែវាស់បរិមាណល្អិតៗ។",
    functionEn: "Precise volume measurement. The narrow column makes the liquid level rise sharply, so each marked line represents a small, accurate volume change.",
    functionKh: "ការវាស់បរិមាណច្បាស់លាស់។ បំពង់តូចធ្វើឱ្យកម្រិតទឹកឡើងកាត់មុខ ដូច្នេះខ្សែនីមួយៗតំណាងឱ្យការប្រែប្រួលបរិមាណតូច និងត្រឹមត្រូវ។",
    warningEn: "Read the bottom of the meniscus at eye level — see the Golden Rule below.",
    warningKh: "អានផ្នែកខាងក្រោមនៃមេនីស្គុសនៅកម្រិតភ្នែក — សូមមើលច្បាប់មាសខាងក្រោម។",
    liquid: "green",
    Diagram: CylinderSvg,
  },
  {
    id: "funnel",
    icon: Filter,
    nameEn: "Funnel & Filter Paper",
    nameKh: "ចីវឡាវ និងក្រដាសចម្រោះ",
    formEn: "Cone-shaped funnel with a long thin stem; a folded paper cone sits inside.",
    formKh: "ចីវឡាវរូបសាជី មានដងវែងតូច; មានសាជីក្រដាសបត់នៅខាងក្នុង។",
    functionEn: "Gravity filtration — separates an insoluble solid from a liquid. The liquid passes through the paper into the flask below; the solid stays trapped on the paper.",
    functionKh: "ការចម្រោះដោយទំនាញ — បំបែកជាតិរឹងមិនរលាយចេញពីទឹក។ ទឹកឆ្លងកាត់ក្រដាសទៅក្នុងកែវខាងក្រោម; ជាតិរឹងជាប់នៅលើក្រដាស។",
    liquid: "blue",
    Diagram: FunnelSvg,
  },
];

const SPEECH_SUPPORTED =
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

function GlasswareCatalog({ kh }: { kh: boolean }) {
  const [openId, setOpenId] = useState<string>(GLASSWARE[0].id);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  // Monotonic token so that late onend/onerror callbacks from a previous,
  // already-cancelled utterance can never clear the speaking state of a newer one
  // (e.g., when the user rapidly re-clicks the SAME tool button).
  const utteranceToken = useRef(0);
  const open = GLASSWARE.find((g) => g.id === openId) ?? GLASSWARE[0];
  const Diagram = open.Diagram;

  // Speak the English name. Always cancel any in-flight utterance first so
  // rapid clicks across the four selectors never overlap.
  const speak = useCallback((g: GlassItem) => {
    if (!SPEECH_SUPPORTED) return;
    window.speechSynthesis.cancel();
    const myToken = ++utteranceToken.current;
    const utter = new SpeechSynthesisUtterance(g.nameEn);
    utter.lang = "en-US";
    utter.rate = 0.85;
    utter.pitch = 1;
    utter.volume = 1;
    utter.onstart = () => {
      if (utteranceToken.current === myToken) setSpeakingId(g.id);
    };
    utter.onend = () => {
      if (utteranceToken.current === myToken) setSpeakingId(null);
    };
    utter.onerror = () => {
      if (utteranceToken.current === myToken) setSpeakingId(null);
    };
    window.speechSynthesis.speak(utter);
  }, []);

  // Cancel any in-flight speech on unmount.
  useEffect(() => {
    return () => {
      if (SPEECH_SUPPORTED) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSelect = useCallback(
    (g: GlassItem) => {
      setOpenId(g.id);
      speak(g);
    },
    [speak],
  );

  return (
    <div className="mb-8">
      <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-sky-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? "៤.១ · កាតាឡុកកញ្ចក់ — ទម្រង់ទល់នឹងមុខងារ" : "4.1 · The Glassware Catalog — Form vs. Function"}
      </div>

      {/* Tool selector */}
      <div role="group" aria-label={kh ? "ឧបករណ៍កញ្ចក់" : "Glassware items"} className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {GLASSWARE.map((g) => {
          const Icon = g.icon;
          const active = g.id === openId;
          const speaking = speakingId === g.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={active}
              aria-controls={`glass-panel-${g.id}`}
              aria-label={
                SPEECH_SUPPORTED
                  ? kh
                    ? `ស្ដាប់ការបញ្ចេញសំឡេងនៃ ${g.nameEn}`
                    : `Listen to the pronunciation of ${g.nameEn}`
                  : g.nameEn
              }
              data-speaking={speaking || undefined}
              onClick={() => handleSelect(g)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-left transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                speaking
                  ? "bg-gradient-to-br from-sky-50 to-emerald-50 border-sky-500 shadow-lg shadow-sky-300/50 ring-4 ring-sky-300/60 animate-pulse"
                  : active
                    ? "bg-gradient-to-br from-sky-50 to-emerald-50 border-sky-400 shadow-md"
                    : "bg-white/70 border-slate-200 hover:border-sky-300 hover:bg-sky-50/40"
              }`}
            >
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                active ? "bg-sky-500 text-white shadow" : "bg-slate-100 text-slate-600"
              }`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-[10px] font-mono font-bold tracking-widest uppercase ${active ? "text-sky-700" : "text-slate-500"} ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
                  {kh ? "ឧបករណ៍" : "Tool"}
                </span>
                <span className={`flex items-center gap-1.5 text-sm font-bold leading-tight ${active ? "text-slate-900" : "text-slate-700"} ${kh ? "font-khmer text-base" : ""}`}>
                  <span className="truncate">{kh ? g.nameKh : g.nameEn}</span>
                  {SPEECH_SUPPORTED && (
                    <Volume2
                      aria-hidden="true"
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                        speaking ? "text-sky-600" : active ? "text-sky-500" : "text-slate-400"
                      }`}
                    />
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        id={`glass-panel-${open.id}`}
        role="region"
        aria-live="polite"
        aria-label={kh ? `ព័ត៌មានលម្អិត៖ ${open.nameKh}` : `Details: ${open.nameEn}`}
        className="grid md:grid-cols-[280px_minmax(0,1fr)] gap-5 rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/40 to-emerald-50/30 p-5 shadow-inner"
      >
        {/* Diagram tile with light grid */}
        <div className="relative rounded-xl bg-white border border-slate-200 p-3 min-h-[220px] flex items-center justify-center overflow-hidden">
          <LabGridBackdrop />
          <div className="relative w-full">
            <Diagram kh={kh} />
          </div>
        </div>
        {/* Text */}
        <div>
          <h4 className={`font-display text-2xl font-extrabold text-slate-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? open.nameKh : open.nameEn}
          </h4>
          <div className="space-y-3 text-sm sm:text-base">
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-emerald-700 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ទម្រង់" : "Form"}
              </div>
              <p className={`text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? open.formKh : open.formEn}
              </p>
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-sky-700 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "មុខងារ" : "Function"}
              </div>
              <p className={`text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? open.functionKh : open.functionEn}
              </p>
            </div>
            {open.warningEn && (
              <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-2.5 flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className={`text-xs sm:text-sm text-amber-900 leading-relaxed ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                  {kh ? open.warningKh : open.warningEn}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabGridBackdrop() {
  const uid = useId().replace(/:/g, "");
  const patId = `org-lab-grid-${uid}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id={patId} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(14,165,233,0.10)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patId})`} />
    </svg>
  );
}

/* ── Glassware SVGs (clean lab style — semi-transparent glass + bright liquid) ─ */
function GlassDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.95" />
        <stop offset="100%" stopColor={color} stopOpacity="0.65" />
      </linearGradient>
      <filter id={`glow-${id}`}>
        <feGaussianBlur stdDeviation="1.4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

function BeakerSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-auto max-h-[200px] mx-auto" role="img" aria-label={kh ? "កែវបេស៊ែរ" : "Beaker"}>
      <GlassDefs id="bk" color={LIQUID_GREEN} />
      {/* Spout */}
      <path d="M 50 30 L 40 22 L 32 28" fill="none" stroke={GLASS_OUTLINE} strokeWidth="1.6" strokeLinecap="round" />
      {/* Body — straight cylinder with flat bottom */}
      <path d="M 40 30 L 40 170 Q 40 178 48 178 L 172 178 Q 180 178 180 170 L 180 30" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="40" y1="30" x2="180" y2="30" stroke={GLASS_OUTLINE} strokeWidth="1.6" />
      {/* Liquid */}
      <path d="M 42 90 L 42 170 Q 42 176 48 176 L 172 176 Q 178 176 178 170 L 178 90 Z" fill="url(#liq-bk)" filter="url(#glow-bk)" />
      {/* Liquid surface highlight */}
      <ellipse cx="110" cy="90" rx="68" ry="3" fill="rgba(255,255,255,0.6)" />
      {/* Graduation marks — illustrative */}
      {[110, 130, 150].map((y, i) => (
        <g key={y}>
          <line x1="40" y1={y} x2="55" y2={y} stroke={GLASS_OUTLINE} strokeWidth="1" />
          <text x="60" y={y + 3} fontSize="9" fill="#475569" fontFamily="monospace">{`${(3 - i) * 100}`}</text>
        </g>
      ))}
      <text x="110" y="195" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#64748b" textAnchor="middle">
        {kh ? "បបូរមាត់ + បាតរាបស្មើ" : "Spout + flat bottom"}
      </text>
    </svg>
  );
}

function ErlenmeyerSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-auto max-h-[200px] mx-auto" role="img" aria-label={kh ? "កែវរូបសាជី" : "Erlenmeyer flask"}>
      <GlassDefs id="er" color={LIQUID_BLUE} />
      {/* Neck */}
      <rect x="92" y="20" width="36" height="40" rx="2" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.8" />
      {/* Conical body */}
      <path d="M 92 60 L 35 175 Q 32 184 42 184 L 178 184 Q 188 184 185 175 L 128 60 Z" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Liquid */}
      <path d="M 70 120 L 38 180 Q 36 184 42 184 L 178 184 Q 184 184 182 180 L 150 120 Z" fill="url(#liq-er)" filter="url(#glow-er)" />
      {/* Surface */}
      <ellipse cx="110" cy="120" rx="40" ry="3" fill="rgba(255,255,255,0.6)" />
      {/* Swirl arrows hinting at function */}
      <path d="M 80 145 a 30 12 0 1 0 60 0" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#org-arrow)" />
      <defs>
        <marker id="org-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#0ea5e9" />
        </marker>
      </defs>
      <text x="110" y="195" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#64748b" textAnchor="middle">
        {kh ? "ជញ្ជាំងជម្រាល · ល្អសម្រាប់កូរ" : "Sloped sides · safe to swirl"}
      </text>
    </svg>
  );
}

function CylinderSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-auto max-h-[200px] mx-auto" role="img" aria-label={kh ? "ស៊ីឡាំងវាស់" : "Graduated cylinder"}>
      <GlassDefs id="cy" color={LIQUID_GREEN} />
      {/* Spout */}
      <path d="M 92 18 L 88 12 L 84 14" fill="none" stroke={GLASS_OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Tall narrow body */}
      <path d="M 86 18 L 86 168 L 70 178 L 150 178 L 134 168 L 134 18 Z" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Wide base */}
      <ellipse cx="110" cy="178" rx="40" ry="6" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.6" />
      {/* Liquid */}
      <path d="M 86 80 L 86 168 L 70 178 L 150 178 L 134 168 L 134 80 Z" fill="url(#liq-cy)" filter="url(#glow-cy)" />
      {/* Meniscus — concave curve at top */}
      <path d="M 86 80 Q 110 88 134 80" fill="rgba(34,197,94,0.85)" stroke={LIQUID_GREEN} strokeWidth="1" />
      {/* Many fine graduation marks */}
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 30 + i * 10;
        const long = i % 5 === 0;
        return (
          <g key={i}>
            <line x1="134" y1={y} x2={long ? 152 : 144} y2={y} stroke={GLASS_OUTLINE} strokeWidth={long ? 1.2 : 0.8} />
            {long && <text x="156" y={y + 3} fontSize="8" fill="#475569" fontFamily="monospace">{`${(14 - i) * 5}`}</text>}
          </g>
        );
      })}
      {/* Eye-level indicator on meniscus */}
      <line x1="40" y1="84" x2="86" y2="84" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      <text x="38" y="80" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill="#b45309" textAnchor="end">
        {kh ? "ភ្នែក →" : "EYE →"}
      </text>
      <text x="110" y="195" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#64748b" textAnchor="middle">
        {kh ? "តូច + ខ្សែវាស់ច្រើន" : "Narrow + many marks"}
      </text>
    </svg>
  );
}

function FunnelSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-auto max-h-[200px] mx-auto" role="img" aria-label={kh ? "ចីវឡាវនិងក្រដាសចម្រោះ" : "Funnel and filter paper"}>
      <GlassDefs id="fn" color={LIQUID_BLUE} />
      {/* Mixture above */}
      <path d="M 80 20 L 140 20 L 140 38 L 80 38 Z" fill="rgba(14,165,233,0.18)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" />
      {/* Solid particles in mixture */}
      <circle cx="92" cy="32" r="1.6" fill="#475569" />
      <circle cx="100" cy="28" r="1.4" fill="#475569" />
      <circle cx="118" cy="33" r="1.6" fill="#475569" />
      <circle cx="128" cy="30" r="1.3" fill="#475569" />
      {/* Funnel cone */}
      <path d="M 50 50 L 170 50 L 120 110 L 110 110 L 100 110 Z" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Filter paper inside */}
      <path d="M 60 55 L 160 55 L 115 108 Z" fill="rgba(255,255,255,0.85)" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" />
      {/* Solid stays trapped */}
      <circle cx="100" cy="80" r="1.8" fill="#475569" />
      <circle cx="115" cy="86" r="2" fill="#475569" />
      <circle cx="125" cy="78" r="1.5" fill="#475569" />
      {/* Stem */}
      <rect x="105" y="110" width="10" height="40" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.6" />
      {/* Drips */}
      <ellipse cx="110" cy="155" rx="3" ry="4" fill={LIQUID_BLUE} />
      <ellipse cx="110" cy="166" rx="2" ry="3" fill={LIQUID_BLUE} opacity="0.7" />
      {/* Receiving flask (mini erlenmeyer) */}
      <rect x="100" y="172" width="20" height="6" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.4" />
      <path d="M 100 178 L 75 198 L 145 198 L 120 178 Z" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.6" />
      <path d="M 87 188 L 78 196 L 142 196 L 133 188 Z" fill="url(#liq-fn)" />
      <text x="110" y="14" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#64748b" textAnchor="middle">
        {kh ? "ល្បាយ (រឹង + ទឹក)" : "MIXTURE (solid + liquid)"}
      </text>
    </svg>
  );
}

/* ── 4.2 Distillation Deep Dive ──────────────────────────────────────────── */
type DistillPart = {
  id: string;
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
};
const DISTILL_PARTS: DistillPart[] = [
  {
    id: "heat",
    nameEn: "Heat Source / Mantle",
    nameKh: "ប្រភពកំដៅ",
    descEn: "Provides controlled heat. A heating mantle wraps the round flask in cloth-covered wires and warms it evenly — safer than an open flame near volatile organic vapours.",
    descKh: "ផ្តល់កំដៅគ្រប់គ្រងបាន។ ឧបករណ៍កម្តៅរុំកែវមូលដោយខ្សែស្បៃ ហើយកម្តៅវាស្មើៗ — សុវត្ថិភាពជាងភ្លើងបើកចំហនៅក្បែរចំហាយសរីរាង្គ។",
  },
  {
    id: "flask",
    nameEn: "Round-Bottom Flask",
    nameKh: "កែវបាតមូល",
    descEn: "Holds the starting liquid mixture. The round shape spreads heat evenly and handles the stress of vigorous boiling better than a flat-bottom flask, which is more prone to cracking under direct, uneven heating.",
    descKh: "ផ្ទុកល្បាយទឹកដើម។ រូបមូលផ្សព្វផ្សាយកំដៅស្មើៗ និងទ្រាំសម្ពាធពេលរំពុះខ្លាំងបានល្អ — កែវបាតរាបស្មើងាយនឹងបែកជាងពេលកម្តៅផ្ទាល់មិនស្មើ។",
  },
  {
    id: "thermo",
    nameEn: "Thermometer",
    nameKh: "តឺម៉ូម៉ែត្រ",
    descEn: "Placed exactly at the Y-junction where vapour leaves toward the condenser. This is the only spot that reads the boiling point of the substance actually being collected — not the flask, not the bath.",
    descKh: "ដាក់ឱ្យត្រូវនៅចំណុចបំបែក Y ដែលចំហាយចេញទៅឧបករណ៍ត្រជាក់។ នេះជាកន្លែងតែមួយគត់ដែលអានចំណុចរំពុះនៃសារធាតុដែលកំពុងប្រមូលបាន — មិនមែនកែវ មិនមែនអាងទឹកទេ។",
  },
  {
    id: "condenser",
    nameEn: "Condenser (cold water jacket)",
    nameKh: "ឧបករណ៍ត្រជាក់ (ស្រោមទឹកត្រជាក់)",
    descEn: "A glass tube inside a glass tube. Cold water flows through the outer jacket against the direction of vapour, pulling heat out so the vapour collapses back into liquid drops.",
    descKh: "បំពង់កញ្ចក់ក្នុងបំពង់កញ្ចក់។ ទឹកត្រជាក់ហូរកាត់ស្រោមខាងក្រៅប្រឆាំងនឹងទិសចំហាយ ទាញកំដៅចេញដើម្បីឱ្យចំហាយប្រែទៅជាដំណក់ទឹកវិញ។",
  },
  {
    id: "receive",
    nameEn: "Receiving Flask",
    nameKh: "កែវទទួល",
    descEn: "Catches the purified liquid drop by drop. The collected liquid (the 'distillate') is the substance with the lowest boiling point in the original mixture.",
    descKh: "ចាប់យកទឹកដែលបានចម្រាញ់រួចមួយដំណក់ម្តងៗ។ ទឹកដែលបានប្រមូល (ហៅថា 'ដិស្ទីលាត') គឺជាសារធាតុដែលមានចំណុចរំពុះទាបបំផុតក្នុងល្បាយដើម។",
  },
];

function DistillationDeepDive({ kh }: { kh: boolean }) {
  const [activeId, setActiveId] = useState<string>("heat");
  const active = DISTILL_PARTS.find((p) => p.id === activeId) ?? DISTILL_PARTS[0];
  return (
    <div className="mb-8">
      <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-sky-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? "៤.២ · ការសិក្សាស៊ីជម្រៅ — ការចម្រាញ់ (ឧបករណ៍ចម្រាញ់)" : "4.2 · Deep-Dive — Simple Distillation Apparatus"}
      </div>

      <div className="rounded-2xl border-2 border-sky-200 bg-white p-4 sm:p-5 shadow-inner">
        <p className={`text-sm sm:text-base text-slate-700 leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ការចម្រាញ់គឺជាដំណើរការរូបវិទ្យាសំខាន់បំផុតក្នុងគីមីសរីរាង្គ។ វាបំបែកទឹកដែលមានចំណុចរំពុះខុសគ្នា ដោយការរំពុះម្តងមួយ ហើយប្រមូលចំហាយឡើងវិញ។ ចុចលើផ្នែកនៃឧបករណ៍ ដើម្បីដឹងពីមុខងាររបស់វា។"
            : "Distillation is the most important physical process in organic chemistry. It separates liquids of different boiling points by boiling one off and collecting the vapour. Click any part of the apparatus to learn its job."}
        </p>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-5 items-start">
          {/* Apparatus diagram */}
          <div className="relative rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-3 overflow-hidden">
            <LabGridBackdrop />
            <div className="relative">
              <DistillationSvg activeId={activeId} setActiveId={setActiveId} kh={kh} />
            </div>
          </div>
          {/* Parts list + active description */}
          <div>
            <div role="group" aria-label={kh ? "ផ្នែកនៃឧបករណ៍ចម្រាញ់" : "Distillation parts"} className="space-y-1.5 mb-3">
              {DISTILL_PARTS.map((p, i) => {
                const on = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActiveId(p.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border-2 flex items-center gap-2.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                      on ? "border-sky-400 bg-sky-50 shadow" : "border-slate-200 bg-white/80 hover:border-sky-300 hover:bg-sky-50/40"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-bold flex-shrink-0 ${
                      on ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-600"
                    }`}>{i + 1}</span>
                    <span className={`text-sm font-semibold ${on ? "text-slate-900" : "text-slate-700"} ${kh ? "font-khmer text-base" : ""}`}>
                      {kh ? p.nameKh : p.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ផ្នែកដែលបានជ្រើស" : "Selected part"}
              </div>
              <h5 className={`font-display text-base font-extrabold text-emerald-900 mb-1 ${kh ? "font-khmer" : ""}`}>
                {kh ? active.nameKh : active.nameEn}
              </h5>
              <p className={`text-sm text-emerald-900/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? active.descKh : active.descEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DistillationSvg({
  activeId, setActiveId, kh,
}: { activeId: string; setActiveId: (id: string) => void; kh: boolean }) {
  // Highlight helper
  const isOn = (id: string) => activeId === id;
  const hot = (id: string) =>
    isOn(id) ? { stroke: "#f59e0b", strokeWidth: 2.4, filter: "drop-shadow(0 0 4px rgba(245,158,11,0.6))" } : { stroke: GLASS_OUTLINE, strokeWidth: 1.6 };

  // Hotspot maker — invisible button overlay for keyboard/click
  const Hotspot = ({ id, x, y, w, h, labelEn, labelKh }: {
    id: string; x: number; y: number; w: number; h: number; labelEn: string; labelKh: string;
  }) => (
    <g
      role="button"
      tabIndex={0}
      aria-label={kh ? labelKh : labelEn}
      aria-pressed={isOn(id)}
      onClick={() => setActiveId(id)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(id); } }}
      className="organic-lab-hotspot"
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x} y={y} width={w} height={h}
        fill={isOn(id) ? "rgba(245,158,11,0.10)" : "transparent"}
        stroke={isOn(id) ? "#f59e0b" : "transparent"}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        rx="6"
      />
    </g>
  );

  return (
    <svg viewBox="0 0 480 260" className="w-full h-auto" role="group" aria-label={kh ? "ឧបករណ៍ចម្រាញ់ធម្មតា — ចុចលើផ្នែកនីមួយៗ" : "Simple distillation apparatus — click each part"}>
      <style>{`.organic-lab-hotspot:focus-visible > rect { stroke: #2563eb; stroke-width: 2.4; stroke-dasharray: none; fill: rgba(37,99,235,0.10); }`}</style>
      <GlassDefs id="d1" color={LIQUID_BLUE} />
      {/* Heat source */}
      <g style={hot("heat") as React.CSSProperties}>
        <rect x="50" y="200" width="80" height="22" rx="4" fill="#1f2937" {...hot("heat")} />
        {/* flames */}
        <path d="M 70 200 q -4 -10 4 -16 q -2 8 6 0 q -2 12 -10 16 z" fill="#f97316" opacity="0.85" />
        <path d="M 90 200 q -4 -12 6 -18 q -2 10 6 -2 q -2 14 -12 20 z" fill="#facc15" opacity="0.85" />
        <path d="M 110 200 q -4 -10 4 -16 q -2 8 6 0 q -2 12 -10 16 z" fill="#f97316" opacity="0.85" />
      </g>
      <text x="90" y="240" fontSize="9" fill={isOn("heat") ? "#b45309" : "#475569"} fontFamily={kh ? "inherit" : "monospace"} textAnchor="middle">
        {kh ? "ប្រភពកំដៅ" : "HEAT"}
      </text>

      {/* Round-bottom flask */}
      <g>
        <rect x="80" y="135" width="20" height="20" fill={GLASS_FILL} {...hot("flask")} />
        <circle cx="90" cy="180" r="34" fill={GLASS_FILL} {...hot("flask")} />
        {/* Liquid + bubbles */}
        <path d="M 60 188 Q 90 220 120 188 Q 120 210 90 214 Q 60 210 60 188 Z" fill="url(#liq-d1)" />
        <circle cx="80" cy="195" r="2" fill="#fff" opacity="0.7" />
        <circle cx="100" cy="200" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="92" cy="190" r="1.2" fill="#fff" opacity="0.7" />
      </g>

      {/* Vapour rising */}
      <path d="M 90 145 Q 92 120 100 110 L 130 110" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Y-junction with thermometer */}
      <g>
        <rect x="100" y="100" width="40" height="20" rx="3" fill={GLASS_FILL} stroke={GLASS_OUTLINE} strokeWidth="1.6" />
        {/* Thermometer */}
        <g style={hot("thermo") as React.CSSProperties}>
          <line x1="120" y1="40" x2="120" y2="115" {...hot("thermo")} strokeLinecap="round" />
          <circle cx="120" cy="40" r="6" fill="#ef4444" {...hot("thermo")} />
          <circle cx="120" cy="115" r="4" fill="#ef4444" {...hot("thermo")} />
          {/* tick marks */}
          {[50, 60, 70, 80, 90, 100].map((y) => (
            <line key={y} x1="124" y1={y} x2="128" y2={y} stroke={isOn("thermo") ? "#f59e0b" : "#94a3b8"} strokeWidth="1" />
          ))}
        </g>
        <text x="138" y="50" fontSize="9" fill={isOn("thermo") ? "#b45309" : "#475569"} fontFamily={kh ? "inherit" : "monospace"}>
          {kh ? "តឺម៉ូម៉ែត្រ" : "THERMOMETER"}
        </text>
      </g>

      {/* Condenser — angled tube with cold water jacket */}
      <g style={hot("condenser") as React.CSSProperties}>
        {/* Outer jacket */}
        <path d="M 140 110 L 320 175 L 310 195 L 130 130 Z" fill="rgba(14,165,233,0.18)" {...hot("condenser")} />
        {/* Inner tube */}
        <line x1="140" y1="120" x2="318" y2="185" {...hot("condenser")} />
        {/* Cooling water in/out arrows */}
        <path d="M 332 200 L 318 195 L 326 188" fill="none" stroke="#0ea5e9" strokeWidth="1.4" />
        <text x="338" y="200" fontSize="8" fill="#0369a1" fontFamily={kh ? "inherit" : "monospace"}>
          {kh ? "ទឹកត្រជាក់ចូល" : "WATER IN"}
        </text>
        <path d="M 122 113 L 136 118 L 128 124" fill="none" stroke="#0ea5e9" strokeWidth="1.4" />
        <text x="76" y="116" fontSize="8" fill="#0369a1" fontFamily={kh ? "inherit" : "monospace"}>
          {kh ? "ទឹកក្តៅចេញ" : "WATER OUT"}
        </text>
        {/* condensing droplets */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={180 + i * 32} cy={130 + i * 12} r="2" fill={LIQUID_BLUE} opacity="0.8" />
        ))}
      </g>

      {/* Receiving flask */}
      <g>
        <rect x="324" y="180" width="14" height="14" fill={GLASS_FILL} {...hot("receive")} />
        <path d="M 324 194 L 290 248 L 380 248 L 348 194 Z" fill={GLASS_FILL} {...hot("receive")} />
        <path d="M 305 230 L 295 246 L 376 246 L 366 230 Z" fill="url(#liq-d1)" />
      </g>

      {/* Hotspots for click/keyboard */}
      <Hotspot id="heat" x={42} y={196} w={96} h={36} labelEn="Heat source — provides controlled heat" labelKh="ប្រភពកំដៅ — ផ្តល់កំដៅគ្រប់គ្រងបាន" />
      <Hotspot id="flask" x={56} y={140} w={68} h={56} labelEn="Round-bottom flask — holds the mixture" labelKh="កែវបាតមូល — ផ្ទុកល្បាយ" />
      <Hotspot id="thermo" x={108} y={32} w={28} h={88} labelEn="Thermometer at the Y-junction" labelKh="តឺម៉ូម៉ែត្រនៅចំណុច Y" />
      <Hotspot id="condenser" x={140} y={104} w={190} h={100} labelEn="Condenser — cold water jacket" labelKh="ឧបករណ៍ត្រជាក់ — ស្រោមទឹកត្រជាក់" />
      <Hotspot id="receive" x={285} y={188} w={100} h={62} labelEn="Receiving flask — collects the distillate" labelKh="កែវទទួល — ប្រមូលដិស្ទីលាត" />
    </svg>
  );
}

/* ── 4.3 Golden Rule of Precision ────────────────────────────────────────── */
function PrecisionGoldenRule({ kh }: { kh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-5 shadow-md">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center shadow flex-shrink-0">
          <Eye className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "៤.៣ · ច្បាប់មាសនៃភាពច្បាស់លាស់" : "4.3 · The Golden Rule of Precision"}
          </div>
          <h4 className={`font-display text-xl sm:text-2xl font-extrabold text-amber-900 mb-2 ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh
              ? "កុំវាស់បរិមាណច្បាស់លាស់ដោយកែវបេស៊ែរ។ អានផ្នែកខាងក្រោមនៃមេនីស្គុសនៅកម្រិតភ្នែកជានិច្ច។"
              : "Never measure exact volumes with a beaker. Always read the bottom of the meniscus at eye level."}
          </h4>
          <p className={`text-sm sm:text-base text-amber-900/90 leading-relaxed mb-3 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {kh
              ? "ទឹកនៅក្នុងបំពង់តូចបង្កើតផ្ទៃកោងហៅថា មេនីស្គុស។ ការលើកស៊ីឡាំងទៅកម្រិតភ្នែករបស់អ្នក ហើយអានចំណុចទាបនៃការកោងនោះ ផ្តល់ឱ្យអ្នកនូវការឆ្លើយត្រឹមត្រូវ។ ការមើលពីខាងលើនឹងធ្វើឱ្យអ្នកអានច្រើនពេក; ការមើលពីខាងក្រោមនឹងធ្វើឱ្យអ្នកអានតិចពេក។"
              : "Liquid in a narrow tube curves up at the edges, forming a meniscus. Lifting the cylinder to your eye and reading the bottom of that curve gives the correct answer. Looking from above makes you read too high; looking from below makes you read too low."}
          </p>
          <MeniscusDiagram kh={kh} />
        </div>
      </div>
    </div>
  );
}

function MeniscusDiagram({ kh }: { kh: boolean }) {
  const items: { key: "high" | "right" | "low"; eyeY: number; toneEn: string; toneKh: string; verdictEn: string; verdictKh: string; color: string }[] = [
    { key: "high",  eyeY: 26, toneEn: "Eye too HIGH", toneKh: "ភ្នែកខ្ពស់ពេក",  verdictEn: "reads too much", verdictKh: "អានច្រើនពេក", color: "#ef4444" },
    { key: "right", eyeY: 60, toneEn: "Eye AT LEVEL", toneKh: "ភ្នែកសមកម្រិត", verdictEn: "correct ✓",      verdictKh: "ត្រឹមត្រូវ ✓",  color: "#16a34a" },
    { key: "low",   eyeY: 96, toneEn: "Eye too LOW",  toneKh: "ភ្នែកទាបពេក",   verdictEn: "reads too little", verdictKh: "អានតិចពេក",   color: "#ef4444" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map((it) => {
        const correct = it.key === "right";
        return (
          <div
            key={it.key}
            className={`rounded-xl border-2 p-3 bg-white ${correct ? "border-emerald-400 shadow" : "border-slate-200"}`}
          >
            <svg viewBox="0 0 200 130" className="w-full h-auto" role="img" aria-label={kh ? `${it.toneKh} — ${it.verdictKh}` : `${it.toneEn} — ${it.verdictEn}`}>
              {/* Cylinder */}
              <rect x="80" y="10" width="40" height="110" fill="rgba(226,232,240,0.45)" stroke={GLASS_OUTLINE} strokeWidth="1.5" />
              {/* Liquid with meniscus */}
              <rect x="80" y="62" width="40" height="58" fill="rgba(34,197,94,0.6)" />
              <path d="M 80 62 Q 100 70 120 62" fill="rgba(34,197,94,0.85)" stroke={LIQUID_GREEN} strokeWidth="1" />
              {/* Eye */}
              <g>
                <circle cx="40" cy={it.eyeY} r="6" fill={it.color} />
                <circle cx="40" cy={it.eyeY} r="2.5" fill="#fff" />
                <line x1="46" y1={it.eyeY} x2="78" y2={it.eyeY} stroke={it.color} strokeWidth="1.4" strokeDasharray="3 2" />
              </g>
              {/* Reading band shows where this eye perceives the level (approx: parallax) */}
              <line x1="80" y1={it.eyeY === 60 ? 70 : it.eyeY === 26 ? 56 : 78} x2="120" y2={it.eyeY === 60 ? 70 : it.eyeY === 26 ? 56 : 78} stroke={it.color} strokeWidth="1.2" />
              <text x="160" y={it.eyeY === 60 ? 73 : it.eyeY === 26 ? 59 : 81} fontSize="9" fill={it.color} fontFamily="monospace">{kh ? "អាន" : "READS"}</text>
            </svg>
            <div className="mt-1">
              <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-0.5 ${correct ? "text-emerald-700" : "text-slate-600"} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? it.toneKh : it.toneEn}
              </div>
              <div className={`text-sm font-semibold ${correct ? "text-emerald-700" : "text-rose-600"} ${kh ? "font-khmer" : ""}`}>
                {kh ? it.verdictKh : it.verdictEn}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
