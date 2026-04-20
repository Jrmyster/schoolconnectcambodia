import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Hexagon, Atom, Move3d, RotateCw, Pill, Wheat, Recycle, Sparkles, Info,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

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

        {/* ── Section 2: 3D Molecule Viewer ────────────────────── */}
        <MoleculeViewerSection />

        {/* ── Section 3: Chemistry in Cambodia ────────────────── */}
        <RealWorldSection />
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
];

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
        eyebrowEn="Section 2"
        eyebrowKh="ផ្នែកទី ២"
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
        <div className="rounded-2xl border-4 border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 p-5 flex flex-col">
          <div className={`text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("In your daily life", "ក្នុងជីវភាពប្រចាំថ្ងៃរបស់អ្នក")}
          </div>
          <h3 className={`font-display text-2xl sm:text-3xl font-extrabold text-emerald-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? active.nameKh : active.nameEn}
            <span className="ml-2 text-base sm:text-lg font-mono text-emerald-700/80">{active.formula}</span>
          </h3>
          <p className={`text-base text-emerald-900/90 leading-relaxed flex-1 ${kh ? "font-khmer text-lg leading-loose" : ""}`}>
            {kh ? active.contextKh : active.contextEn}
          </p>
          <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-slate-600">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-600" />
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
          {/* Bonds (drawn by midpoint depth, behind atoms) */}
          {mol.bonds.map((b, i) => {
            const a = projected[b.a], c = projected[b.b];
            const midZ = (a.z + c.z) / 2;
            const shade = depthShade(midZ);
            return (
              <line
                key={i}
                x1={cx + a.x * SCALE} y1={cy + a.y * SCALE}
                x2={cx + c.x * SCALE} y2={cy + c.y * SCALE}
                stroke={`rgba(226,232,240,${shade})`}
                strokeWidth={5 * shade}
                strokeLinecap="round"
              />
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
        eyebrowEn="Section 3"
        eyebrowKh="ផ្នែកទី ៣"
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
