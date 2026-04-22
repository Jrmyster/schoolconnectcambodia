import { useId } from "react";
import { Atom, Move3d, FlipHorizontal2, Beaker, AlertTriangle, Sparkles, Info } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Organic Chemistry 101 — The 3D Architecture of Molecules
 *   គីមីសរីរាង្គ ១០១៖ ស្ថាបត្យកម្មត្រីមាត្រនៃម៉ូលេគុល
 *
 * Strictly bilingual self-contained widget. Three sub-concepts:
 *   1. Constitutional Isomers (Ethanol vs Dimethyl Ether, both C2H6O)
 *   2. Stereochemistry — flat 2D drawings lie; carbon is a tetrahedron
 *   3. Chirality — the Carvone mirror image (spearmint vs caraway)
 *
 * Aesthetic: Modern Laboratory — sterile whites, carbon-fiber gray weave,
 * neon blue (#22d3ee) and neon red (#f43f5e) accents on key bonds.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Color palette ─────────────────────────────────────────────────────── */
const NEON_BLUE = "#22d3ee";   // cyan-400
const NEON_RED = "#f43f5e";    // rose-500
const CARBON = "#0f172a";      // slate-900
const OXYGEN = "#dc2626";      // red-600
const HYDROGEN = "#cbd5e1";    // slate-300
const BOND = "#475569";        // slate-600

/* ──────────────────────────────────────────────────────────────────────── */
/* Bilingual helpers                                                        */
/* ──────────────────────────────────────────────────────────────────────── */

/** Stacked bilingual label — primary (UI language) above secondary mirror. */
function Bili({
  en, kh, primaryClass = "", secondaryClass = "",
}: { en: string; kh: string; primaryClass?: string; secondaryClass?: string }) {
  const isKh = useLanguageStore((s) => s.language) === "kh";
  const primary = isKh ? kh : en;
  const secondary = isKh ? en : kh;
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={`${primaryClass} ${isKh ? "font-khmer" : ""}`}>{primary}</span>
      <span
        className={`${secondaryClass || "text-xs italic text-slate-500"} ${
          isKh ? "" : "font-khmer not-italic leading-loose"
        }`}
      >
        {secondary}
      </span>
    </span>
  );
}

/** Inline bilingual — `English · ខ្មែរ`. */
function BiliInline({ en, kh, className = "" }: { en: string; kh: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0 ${className}`}>
      <span>{en}</span>
      <span aria-hidden className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Top-level widget
 * ══════════════════════════════════════════════════════════════════════════ */

export function OrganicArchitecture3DModule() {
  const isKh = useLanguageStore((s) => s.language) === "kh";

  return (
    <section
      data-testid="organic-3d-architecture-module"
      aria-label="Organic Chemistry 101: The 3D Architecture of Molecules / គីមីសរីរាង្គ ១០១៖ ស្ថាបត្យកម្មត្រីមាត្រនៃម៉ូលេគុល"
      className="relative mt-12 rounded-3xl border-2 border-slate-300 bg-white shadow-xl overflow-hidden"
    >
      {/* Carbon-fiber weave backdrop */}
      <CarbonFiberBackdrop />

      <div className="relative px-5 sm:px-8 py-8 sm:py-10">
        <ArchHeader />

        {/* Section A — Constitutional Isomers */}
        <ConstitutionalIsomersSection />

        {/* Section B — Stereochemistry */}
        <StereochemistrySection />

        {/* Section C — Chirality */}
        <ChiralitySection />

        {/* Footer recap */}
        <RecapStrip isKh={isKh} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Carbon-fiber weave backdrop (subtle gray diagonals)
 * ══════════════════════════════════════════════════════════════════════════ */
function CarbonFiberBackdrop() {
  const id = useId();
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={`fiber-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0,7 L7,0 M7,14 L14,7" stroke="#0f172a" strokeWidth="1.4" />
            <path d="M0,7 L7,14 M7,0 L14,7" stroke="#475569" strokeWidth="1.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#fiber-${id})`} />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Module header — bilingual eyebrow + bilingual title + bilingual subtitle
 * ══════════════════════════════════════════════════════════════════════════ */
function ArchHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg flex items-center justify-center ring-2 ring-cyan-400/40">
          <Atom className="w-7 h-7" strokeWidth={2} style={{ color: NEON_BLUE }} aria-hidden />
        </div>
        <div className="min-w-0">
          {/* Bilingual eyebrow */}
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-700 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>Module 5b · 3D Architecture</span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="font-khmer normal-case tracking-normal text-xs">មុខវិជ្ជា ៥ខ · ស្ថាបត្យកម្មត្រីមាត្រ</span>
          </div>
          {/* Bilingual main title — both languages always visible */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-1">
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-600 bg-clip-text text-transparent">
              Organic Chemistry 101: The 3D Architecture of Molecules
            </span>
          </h2>
          <p className="font-khmer text-lg sm:text-xl text-slate-600 leading-loose mt-1">
            គីមីសរីរាង្គ ១០១៖ ស្ថាបត្យកម្មត្រីមាត្រនៃម៉ូលេគុល
          </p>
          {/* Bilingual subtitle */}
          <div className="mt-3 text-sm sm:text-base text-slate-700 max-w-3xl">
            <p>
              The same atoms, different structures — and the universe behaves differently.
              Discover how connection order and 3D shape decide whether a molecule is
              a drink, a poison, a perfume, or a cure.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-600 mt-1">
              អាតូមដូចគ្នា តែរចនាសម្ព័ន្ធខុសគ្នា — ហើយសកលលោកមានឥរិយាបទខុសគ្នា ។
              មកស្វែងយល់ថាតើលំដាប់ភ្ជាប់ និងរូបរាង ៣ មាត្រ កំណត់យ៉ាងណាថាម៉ូលេគុលមួយជាភេសជ្ជៈ ពុល ប្រេងក្រអូប ឬឱសថ ។
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION A — Constitutional Isomers
 *   Ethanol vs Dimethyl Ether (both C2H6O, drastically different properties)
 * ══════════════════════════════════════════════════════════════════════════ */

function ConstitutionalIsomersSection() {
  return (
    <article
      data-testid="section-constitutional-isomers"
      className="mt-2 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm"
    >
      {/* Bilingual section header */}
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border-2 border-cyan-300 text-cyan-700 flex items-center justify-center font-display font-extrabold">
          1
        </div>
        <div>
          <Bili
            en="Constitutional Isomers"
            kh="អ៊ីសូមែររចនាសម្ព័ន្ធ"
            primaryClass="font-display text-xl sm:text-2xl font-bold text-slate-900"
            secondaryClass="text-sm text-slate-500 italic"
          />
        </div>
      </header>

      {/* Bilingual concept definition */}
      <div className="rounded-xl border-l-4 border-cyan-400 bg-cyan-50/60 px-4 py-3 mb-5">
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          <strong className="text-cyan-700">Concept:</strong> Molecules with the
          exact same molecular formula (the same ingredients) but connected in
          a completely different order.
        </p>
        <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
          <strong className="text-cyan-700">គោលគំនិត ៖</strong> ម៉ូលេគុលដែលមានរូបមន្តម៉ូលេគុលដូចគ្នាបេះបិទ
          (គ្រឿងផ្សំដូចគ្នា) ប៉ុន្តែភ្ជាប់គ្នាតាមលំដាប់ខុសគ្នាទាំងស្រុង ។
        </p>
      </div>

      {/* Shared formula banner */}
      <div className="flex items-center justify-center mb-5">
        <div className="inline-flex items-center gap-3 rounded-full border-2 border-dashed border-slate-300 bg-white px-4 py-1.5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            <BiliInline en="Same Formula" kh="រូបមន្តដូចគ្នា" />
          </span>
          <span
            className="font-mono text-xl sm:text-2xl font-extrabold"
            style={{ color: NEON_BLUE }}
          >
            C<sub>2</sub>H<sub>6</sub>O
          </span>
        </div>
      </div>

      {/* Side-by-side molecule comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <IsomerCard
          testid="isomer-ethanol"
          accent="emerald"
          nameEn="Ethanol"
          nameKh="អេតាណុល"
          tagEn="Drinking Alcohol · Liquid"
          tagKh="ស្រាសុទ្ធ · រាវ"
          descriptionEn="The alcohol in beer, wine, and hand sanitizer. Boils at 78 °C — a liquid at room temperature."
          descriptionKh="គឺជាស្រាដែលមាននៅក្នុងស្រាបៀរ ស្រាទំពាំងបាយជូរ និងប្រេងលាងដៃ ។ ឆ្អិននៅ ៧៨°C — ជារាវនៅសីតុណ្ហភាពបន្ទប់ ។"
          svg={<EthanolSVG />}
        />
        <IsomerCard
          testid="isomer-dimethyl-ether"
          accent="rose"
          nameEn="Dimethyl Ether"
          nameKh="ឌីមេទីលអេទែរ"
          tagEn="Toxic Lab Gas"
          tagKh="ឧស្ម័នពុលមន្ទីរពិសោធន៍"
          descriptionEn="A flammable, toxic gas used as a laboratory solvent and propellant. Boils at −24 °C — a gas at room temperature."
          descriptionKh="ឧស្ម័នឆេះបានហើយមានជាតិពុល ប្រើជាសារធាតុរំលាយ និងជាសារធាតុបង្ខំក្នុងមន្ទីរពិសោធន៍ ។ ឆ្អិននៅ −២៤°C — ជាឧស្ម័ននៅសីតុណ្ហភាពបន្ទប់ ។"
          svg={<DimethylEtherSVG />}
        />
      </div>

      {/* Key insight */}
      <div className="mt-5 rounded-xl bg-gradient-to-r from-cyan-50 via-white to-rose-50 border border-slate-200 px-4 py-3 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed">
          <p>
            Simply rearranging the same{" "}
            <strong style={{ color: NEON_BLUE }}>"Lego blocks"</strong> turns a
            drinkable <strong className="text-emerald-700">liquid</strong> into a
            toxic <strong style={{ color: NEON_RED }}>gas</strong>!
          </p>
          <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
            ការរៀបចំ <strong style={{ color: NEON_BLUE }}>"ដុំឡេហ្គោ"</strong>ដូចគ្នាឡើងវិញ
            អាចប្រែ<strong className="text-emerald-700">សារធាតុរាវផឹកបាន</strong>
            មួយ ទៅជា<strong style={{ color: NEON_RED }}>ឧស្ម័នពុល</strong>មួយបាន !
          </p>
        </div>
      </div>
    </article>
  );
}

function IsomerCard({
  testid, accent, nameEn, nameKh, tagEn, tagKh, descriptionEn, descriptionKh, svg,
}: {
  testid: string;
  accent: "emerald" | "rose";
  nameEn: string; nameKh: string;
  tagEn: string; tagKh: string;
  descriptionEn: string; descriptionKh: string;
  svg: React.ReactNode;
}) {
  const ring = accent === "emerald" ? "ring-emerald-300/60" : "ring-rose-300/60";
  const headerBg = accent === "emerald" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200";
  const tagColor = accent === "emerald" ? "text-emerald-700 bg-white border-emerald-300" : "text-rose-700 bg-white border-rose-300";
  const Icon = accent === "emerald" ? Beaker : AlertTriangle;
  return (
    <div
      data-testid={testid}
      className={`rounded-2xl border-2 border-slate-200 bg-white shadow-md overflow-hidden ring-4 ${ring} ring-offset-2 ring-offset-white`}
    >
      <div className={`px-4 py-2.5 border-b-2 ${headerBg} flex items-center gap-2`}>
        <Icon className={`w-4 h-4 ${accent === "emerald" ? "text-emerald-700" : "text-rose-700"}`} aria-hidden />
        <Bili
          en={nameEn}
          kh={nameKh}
          primaryClass="font-display text-base sm:text-lg font-extrabold text-slate-900"
          secondaryClass="text-xs italic text-slate-500"
        />
      </div>
      <div className="aspect-[5/4] relative bg-slate-50 border-b border-slate-200">
        {svg}
      </div>
      <div className="px-4 py-3">
        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${tagColor} mb-2`}>
          <BiliInline en={tagEn} kh={tagKh} />
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{descriptionEn}</p>
        <p className="font-khmer text-sm leading-loose text-slate-600 mt-1">{descriptionKh}</p>
      </div>
    </div>
  );
}

/* ── Structural SVGs for the two isomers ───────────────────────────────── */

function StructAtom({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="white" stroke={color} strokeWidth={2.5} />
      <text
        x={x} y={y + 5}
        textAnchor="middle"
        fontSize={15}
        fontWeight={800}
        fontFamily="ui-sans-serif, system-ui"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function StructBond({
  x1, y1, x2, y2, highlight = false,
}: { x1: number; y1: number; x2: number; y2: number; highlight?: boolean }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={highlight ? NEON_BLUE : BOND}
      strokeWidth={highlight ? 4 : 2.5}
      strokeLinecap="round"
    />
  );
}

/** Ethanol: H3C — CH2 — O — H */
function EthanolSVG() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full">
      {/* Bonds (drawn first so atoms cover endpoints) */}
      <StructBond x1={62} y1={120} x2={138} y2={120} />
      <StructBond x1={162} y1={120} x2={222} y2={120} highlight />
      <StructBond x1={246} y1={120} x2={290} y2={120} highlight />
      {/* H's on left CH3 */}
      <StructBond x1={50} y1={108} x2={30} y2={70} />
      <StructBond x1={50} y1={132} x2={30} y2={170} />
      <StructBond x1={62} y1={104} x2={62} y2={50} />
      {/* H's on middle CH2 */}
      <StructBond x1={150} y1={104} x2={150} y2={50} />
      <StructBond x1={150} y1={136} x2={150} y2={190} />
      {/* Atoms */}
      <StructAtom x={50} y={120} label="C" color={CARBON} />
      <StructAtom x={150} y={120} label="C" color={CARBON} />
      <StructAtom x={234} y={120} label="O" color={OXYGEN} />
      <StructAtom x={290} y={120} label="H" color="#64748b" />
      {/* Hydrogens */}
      <StructAtom x={30} y={60} label="H" color="#64748b" />
      <StructAtom x={30} y={180} label="H" color="#64748b" />
      <StructAtom x={62} y={40} label="H" color="#64748b" />
      <StructAtom x={150} y={40} label="H" color="#64748b" />
      <StructAtom x={150} y={200} label="H" color="#64748b" />
      {/* Functional-group highlight label */}
      <text x={262} y={155} textAnchor="middle" fontSize={11} fontWeight={700} fill={NEON_BLUE}>
        −OH
      </text>
    </svg>
  );
}

/** Dimethyl ether: H3C — O — CH3 (oxygen in the middle) */
function DimethylEtherSVG() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full">
      {/* Bonds */}
      <StructBond x1={72} y1={120} x2={144} y2={120} highlight />
      <StructBond x1={176} y1={120} x2={248} y2={120} highlight />
      {/* Left methyl H's */}
      <StructBond x1={60} y1={108} x2={36} y2={70} />
      <StructBond x1={60} y1={132} x2={36} y2={170} />
      <StructBond x1={72} y1={104} x2={72} y2={50} />
      {/* Right methyl H's */}
      <StructBond x1={260} y1={108} x2={284} y2={70} />
      <StructBond x1={260} y1={132} x2={284} y2={170} />
      <StructBond x1={248} y1={104} x2={248} y2={50} />
      {/* Atoms */}
      <StructAtom x={60} y={120} label="C" color={CARBON} />
      <StructAtom x={160} y={120} label="O" color={OXYGEN} />
      <StructAtom x={260} y={120} label="C" color={CARBON} />
      {/* H's */}
      <StructAtom x={36} y={60} label="H" color="#64748b" />
      <StructAtom x={36} y={180} label="H" color="#64748b" />
      <StructAtom x={72} y={40} label="H" color="#64748b" />
      <StructAtom x={284} y={60} label="H" color="#64748b" />
      <StructAtom x={284} y={180} label="H" color="#64748b" />
      <StructAtom x={248} y={40} label="H" color="#64748b" />
      {/* Functional-group highlight label */}
      <text x={160} y={155} textAnchor="middle" fontSize={11} fontWeight={700} fill={NEON_BLUE}>
        C−O−C
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION B — Stereochemistry
 *   Flat 2D drawings lie. Carbon is a tetrahedron in 3D space.
 * ══════════════════════════════════════════════════════════════════════════ */

function StereochemistrySection() {
  return (
    <article
      data-testid="section-stereochemistry"
      className="mt-8 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border-2 border-cyan-300 text-cyan-700 flex items-center justify-center font-display font-extrabold">
          2
        </div>
        <div>
          <Bili
            en="Stereochemistry & Stereoisomers"
            kh="ស្តេរ៉េអូគីមី និងស្តេរ៉េអូអ៊ីសូមែរ"
            primaryClass="font-display text-xl sm:text-2xl font-bold text-slate-900"
            secondaryClass="text-sm text-slate-500 italic"
          />
        </div>
      </header>

      {/* Concept definition */}
      <div className="rounded-xl border-l-4 border-cyan-400 bg-cyan-50/60 px-4 py-3 mb-5">
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          <strong className="text-cyan-700">Concept:</strong> Molecules where the
          atoms are connected in the exact same order, but they point in
          different directions in 3D space.
        </p>
        <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
          <strong className="text-cyan-700">គោលគំនិត ៖</strong> ម៉ូលេគុលដែលអាតូមភ្ជាប់គ្នាតាមលំដាប់ដូចគ្នាបេះបិទ
          ប៉ុន្តែចង្អុលទៅទិសផ្សេងៗគ្នានៅក្នុងលំហ ៣ មាត្រ ។
        </p>
      </div>

      {/* 2D-lies-vs-3D-truth comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 2D flat drawing */}
        <div className="rounded-2xl border-2 border-rose-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-rose-50 border-b-2 border-rose-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-700" aria-hidden />
            <Bili
              en="2D Drawing — A Lie!"
              kh="គំនូរ ២ មាត្រ — ការកុហក!"
              primaryClass="font-display text-base font-extrabold text-rose-800"
              secondaryClass="text-xs italic text-rose-600"
            />
          </div>
          <div className="aspect-[5/4] bg-slate-50 border-b border-slate-200">
            <Flat2DCarbonSVG />
          </div>
          <div className="px-4 py-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>Paper is flat — it pretends carbon's 4 bonds sit at perfect 90° crosses.</p>
            <p className="font-khmer text-sm leading-loose text-slate-600 mt-0.5">
              ក្រដាសរាបស្មើ — វាក្លែងបង្ហាញថាចំណង ៤ របស់កាបូននៅផ្នែក ៩០° ឥតខ្ចោះ ។
            </p>
          </div>
        </div>

        {/* 3D tetrahedron truth */}
        <div className="rounded-2xl border-2 border-cyan-300 bg-white shadow-md overflow-hidden ring-4 ring-cyan-200/60 ring-offset-2 ring-offset-white">
          <div className="px-4 py-2 bg-cyan-50 border-b-2 border-cyan-200 flex items-center gap-2">
            <Move3d className="w-4 h-4 text-cyan-700" aria-hidden />
            <Bili
              en="3D Reality — Tetrahedron"
              kh="ការពិត ៣ មាត្រ — តេត្រាអ៊ែដ្រ"
              primaryClass="font-display text-base font-extrabold text-cyan-800"
              secondaryClass="text-xs italic text-cyan-600"
            />
          </div>
          <div className="aspect-[5/4] bg-gradient-to-br from-slate-50 to-cyan-50/40 border-b border-slate-200">
            <Tetrahedron3DSVG />
          </div>
          <div className="px-4 py-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>In reality, the 4 bonds spread to the corners of a pyramid (tetrahedron) — 109.5° apart.</p>
            <p className="font-khmer text-sm leading-loose text-slate-600 mt-0.5">
              ការពិត ចំណង ៤ បានរីករាលដល់ជ្រុងរបស់ពីរ៉ាមីត (តេត្រាអ៊ែដ្រ) — ឃ្លាតគ្នា ១០៩.៥° ។
            </p>
          </div>
        </div>
      </div>

      {/* Wedge-dash legend */}
      <div className="mt-4 grid sm:grid-cols-3 gap-2 text-xs">
        <LegendChip
          glyph={<svg width="38" height="14"><line x1="2" y1="7" x2="36" y2="7" stroke={BOND} strokeWidth="2.5" /></svg>}
          en="Plain line — in the page"
          kh="ខ្សែសាមញ្ញ — នៅក្នុងផ្ទៃក្រដាស"
        />
        <LegendChip
          glyph={
            <svg width="38" height="14">
              <polygon points="2,7 36,2 36,12" fill={NEON_BLUE} />
            </svg>
          }
          en="Solid wedge — toward you"
          kh="ត្រីកោណពេញ — ទៅរកអ្នក"
        />
        <LegendChip
          glyph={
            <svg width="38" height="14">
              <line x1="4" y1="11" x2="10" y2="9" stroke={NEON_RED} strokeWidth="2.5" />
              <line x1="14" y1="9" x2="20" y2="7" stroke={NEON_RED} strokeWidth="2.5" />
              <line x1="24" y1="7" x2="30" y2="5" stroke={NEON_RED} strokeWidth="2.5" />
            </svg>
          }
          en="Dashed wedge — away from you"
          kh="ត្រីកោណចុចៗ — ឃ្លាតពីអ្នក"
        />
      </div>
    </article>
  );
}

function LegendChip({ glyph, en, kh }: { glyph: React.ReactNode; en: string; kh: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm">
      <span className="flex-shrink-0">{glyph}</span>
      <span className="text-slate-700 leading-tight flex flex-col">
        <span>{en}</span>
        <span className="font-khmer text-xs leading-loose text-slate-500">{kh}</span>
      </span>
    </div>
  );
}

/** Flat-pretend cross with 4 bonds at 90° — the "lie" of 2D paper. */
function Flat2DCarbonSVG() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full">
      <StructBond x1={160} y1={120} x2={60} y2={120} />
      <StructBond x1={160} y1={120} x2={260} y2={120} />
      <StructBond x1={160} y1={120} x2={160} y2={30} />
      <StructBond x1={160} y1={120} x2={160} y2={210} />
      <StructAtom x={160} y={120} label="C" color={CARBON} />
      <StructAtom x={50} y={120} label="A" color="#64748b" />
      <StructAtom x={270} y={120} label="B" color="#64748b" />
      <StructAtom x={160} y={20} label="D" color="#64748b" />
      <StructAtom x={160} y={220} label="E" color="#64748b" />
      <text x={250} y={185} fontSize={10} fill="#9ca3af" fontStyle="italic">90°  90°</text>
    </svg>
  );
}

/** 3D tetrahedron — central C with two in-plane, one wedge, one dash. */
function Tetrahedron3DSVG() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full">
      {/* Tetrahedron faint frame for depth */}
      <polygon
        points="160,40 70,200 250,200"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      {/* In-plane bonds */}
      <StructBond x1={160} y1={120} x2={70} y2={200} />
      <StructBond x1={160} y1={120} x2={250} y2={200} />
      {/* Wedge — comes toward you */}
      <polygon points="160,120 152,40 168,40" fill={NEON_BLUE} />
      {/* Dashed wedge — recedes */}
      <g stroke={NEON_RED} strokeWidth="3" strokeLinecap="round">
        <line x1="160" y1="135" x2="200" y2="148" />
        <line x1="205" y1="151" x2="240" y2="170" />
        <line x1="245" y1="173" x2="278" y2="195" />
      </g>
      {/* Atoms */}
      <StructAtom x={160} y={120} label="C" color={CARBON} />
      <StructAtom x={60} y={208} label="A" color="#64748b" />
      <StructAtom x={260} y={208} label="B" color="#64748b" />
      <StructAtom x={160} y={32} label="D" color={NEON_BLUE} />
      <StructAtom x={285} y={200} label="E" color={NEON_RED} />
      {/* Angle label */}
      <text x={158} y={158} textAnchor="middle" fontSize={11} fill="#0891b2" fontWeight={700}>
        109.5°
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION C — Chirality (the Carvone mirror image)
 * ══════════════════════════════════════════════════════════════════════════ */

function ChiralitySection() {
  return (
    <article
      data-testid="section-chirality"
      className="mt-8 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border-2 border-cyan-300 text-cyan-700 flex items-center justify-center font-display font-extrabold">
          3
        </div>
        <div>
          <Bili
            en="Chirality: The Mirror Image"
            kh="គីរ៉ាល់៖ រូបភាពឆ្លុះកញ្ចក់"
            primaryClass="font-display text-xl sm:text-2xl font-bold text-slate-900"
            secondaryClass="text-sm text-slate-500 italic"
          />
        </div>
      </header>

      {/* Concept definition */}
      <div className="rounded-xl border-l-4 border-cyan-400 bg-cyan-50/60 px-4 py-3 mb-5">
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          <strong className="text-cyan-700">Chirality</strong> is the concept of{" "}
          <strong>"handedness"</strong>. A molecule is chiral if you{" "}
          <em>cannot</em> perfectly overlap it with its mirror image — just like
          your left hand will never fit into a right-handed glove.
        </p>
        <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
          <strong className="text-cyan-700">គីរ៉ាល់</strong> គឺជាគោលគំនិតនៃ
          <strong>"ភាពដៃឆ្វេង-ស្តាំ"</strong> ។ ម៉ូលេគុលមួយជាគីរ៉ាល់ ប្រសិនបើអ្នក
          <em>មិនអាច</em>ដាក់ត្រួតលើរូបឆ្លុះរបស់វាបានត្រឹមត្រូវឡើយ — ដូចជាដៃឆ្វេងរបស់អ្នកនឹងមិនដែលដាក់ចូលស្រោមដៃខាងស្តាំបានឡើយ ។
        </p>
      </div>

      {/* The Carvone mirror experience */}
      <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5 shadow-sm">
        <div className="text-center mb-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            <BiliInline en="Real-World Impact · Carvone" kh="ឥទ្ធិពលក្នុងជីវិតពិត · ខាវ៉ូន" />
          </div>
          <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            <BiliInline
              en="One molecule. Two smells. Same atoms — mirrored."
              kh="ម៉ូលេគុលតែមួយ ។ ក្លិនពីរ ។ អាតូមដូចគ្នា — តែឆ្លុះ ។"
            />
          </h4>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          {/* Left enantiomer — Spearmint */}
          <CarvoneCard
            testid="carvone-spearmint"
            side="left"
            labelEn="(R)-(−)-Carvone"
            labelKh="(អ)-(−)-ខាវ៉ូន"
            smellEn="Smells like fresh Spearmint 🌿"
            smellKh="ក្លិនដូចស្លឹកជីរនាងវង់ស្រស់ 🌿"
            descEn="Fits perfectly into one shape of receptor in your nose."
            descKh="ស៊ីគ្នានឹងរូបរាងមួយនៃតួទទួលនៅច្រមុះរបស់អ្នក ។"
            tone="emerald"
          />

          {/* Mirror divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <FlipHorizontal2 className="w-8 h-8 text-cyan-600" aria-hidden />
            <div className="my-2 w-0.5 flex-1 bg-gradient-to-b from-cyan-400 via-slate-200 to-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 text-center leading-tight">
              <BiliInline en="Mirror" kh="កញ្ចក់" />
            </span>
          </div>

          {/* Right enantiomer — Caraway / Rye bread */}
          <CarvoneCard
            testid="carvone-caraway"
            side="right"
            labelEn="(S)-(+)-Carvone"
            labelKh="(ស)-(+)-ខាវ៉ូន"
            smellEn="Smells like Rye Bread / Caraway 🍞"
            smellKh="ក្លិនដូចនំបុ័ងស្រូវសាលី / គ្រាប់គ្រាវ៉េ 🍞"
            descEn="Fits a different receptor shape — your nose perceives a totally different smell."
            descKh="ស៊ីគ្នានឹងរូបរាងតួទទួលផ្សេង — ច្រមុះអ្នកមានអារម្មណ៍ថាក្លិនខុសគ្នាទាំងស្រុង ។"
            tone="amber"
          />
        </div>

        {/* Body-knows-difference closing */}
        <div className="mt-5 rounded-xl bg-slate-900 text-white px-4 py-3 flex items-start gap-3 shadow-md">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NEON_BLUE }} aria-hidden />
          <div className="text-sm sm:text-base leading-relaxed">
            <p>
              The body <strong style={{ color: NEON_BLUE }}>physically knows</strong> the
              difference between <strong className="text-emerald-300">left</strong> and{" "}
              <strong style={{ color: NEON_RED }}>right</strong> — that is why
              chirality decides whether a drug heals you or harms you.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-200 mt-1">
              រាងកាយ <strong style={{ color: NEON_BLUE }}>ដឹងពីភាពខុសគ្នា</strong>រវាង
              <strong className="text-emerald-300">ឆ្វេង</strong> និង
              <strong style={{ color: NEON_RED }}>ស្តាំ</strong> តាមរូបធាតុ —
              នេះហើយជាមូលហេតុដែលគីរ៉ាល់កំណត់ថាតើឱសថមួយព្យាបាលអ្នក ឬបង្កគ្រោះថ្នាក់ដល់អ្នក ។
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function CarvoneCard({
  testid, side, labelEn, labelKh, smellEn, smellKh, descEn, descKh, tone,
}: {
  testid: string;
  side: "left" | "right";
  labelEn: string; labelKh: string;
  smellEn: string; smellKh: string;
  descEn: string; descKh: string;
  tone: "emerald" | "amber";
}) {
  const tonePalette =
    tone === "emerald"
      ? { ring: "ring-emerald-300/70", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-800" }
      : { ring: "ring-amber-300/70", bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800" };
  return (
    <div
      data-testid={testid}
      className={`rounded-2xl border-2 ${tonePalette.border} ${tonePalette.bg} shadow-sm overflow-hidden ring-4 ${tonePalette.ring} ring-offset-2 ring-offset-white`}
    >
      <div className="px-4 py-2 bg-white/80 border-b border-slate-200">
        <div className="flex items-center justify-between gap-2">
          <span className={`font-mono text-sm font-extrabold ${tonePalette.text}`}>{labelEn}</span>
          <span className="font-khmer text-xs text-slate-500 leading-loose">{labelKh}</span>
        </div>
      </div>
      <div className="aspect-[5/4] bg-white border-b border-slate-200">
        <CarvoneSVG flipped={side === "right"} />
      </div>
      <div className="px-4 py-3">
        <p className={`text-sm font-bold ${tonePalette.text}`}>{smellEn}</p>
        <p className="font-khmer text-sm text-slate-700 leading-loose">{smellKh}</p>
        <p className="text-xs text-slate-600 mt-1.5">{descEn}</p>
        <p className="font-khmer text-xs leading-loose text-slate-500 mt-0.5">{descKh}</p>
      </div>
    </div>
  );
}

/**
 * Stylised Carvone — a six-membered ring with a methyl, an isopropenyl tail,
 * and a ketone (=O). The two enantiomers are rendered as horizontal mirrors.
 * This is a deliberately simplified pedagogical structure, not a precise
 * stereo rendering — the point is the *mirror* relationship.
 */
function CarvoneSVG({ flipped }: { flipped: boolean }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-full"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      {/* Six-membered ring */}
      <polygon
        points="160,50 220,85 220,155 160,190 100,155 100,85"
        fill="none"
        stroke={BOND}
        strokeWidth={2.5}
      />
      {/* Double bond inside the ring (one extra parallel line) */}
      <line x1="155" y1="55" x2="105" y2="88" stroke={BOND} strokeWidth={2.5} />
      <line x1="160" y1="62" x2="112" y2="92" stroke={BOND} strokeWidth={2} />
      {/* Methyl group on left */}
      <line x1="100" y1="155" x2="60" y2="180" stroke={BOND} strokeWidth={2.5} />
      <text x={50} y={195} fontSize={14} fontWeight={700} fill={CARBON}>CH₃</text>
      {/* Isopropenyl tail on right (wedge — comes forward; this is the chiral-relevant group) */}
      <polygon
        points="220,85 264,72 260,84"
        fill={NEON_BLUE}
      />
      <line x1="264" y1="72" x2="288" y2="55" stroke={BOND} strokeWidth={2.5} />
      <line x1="278" y1="60" x2="300" y2="48" stroke={BOND} strokeWidth={2} />
      <text x={290} y={42} fontSize={11} fontWeight={700} fill={CARBON}>=CH₂</text>
      <text x={266} y={92} fontSize={11} fontWeight={700} fill={CARBON}>CH₃</text>
      {/* Ketone =O on top */}
      <line x1="160" y1="50" x2="160" y2="22" stroke={BOND} strokeWidth={2.5} />
      <line x1="166" y1="50" x2="166" y2="22" stroke={BOND} strokeWidth={2} />
      <circle cx="163" cy="14" r="11" fill="white" stroke={OXYGEN} strokeWidth="2.5" />
      <text x={163} y={18} textAnchor="middle" fontSize={12} fontWeight={800} fill={OXYGEN}>O</text>
      {/* Subtle "front side" cue — neon dot on chiral C */}
      <circle cx="220" cy="85" r="6" fill={NEON_RED} opacity="0.85" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Footer recap strip — three quick takeaways, both languages always visible
 * ══════════════════════════════════════════════════════════════════════════ */
function RecapStrip({ isKh }: { isKh: boolean }) {
  void isKh; // labels are dual-rendered regardless
  const items: { en: string; kh: string }[] = [
    {
      en: "Same formula, different connections → different molecules.",
      kh: "រូបមន្តដូចគ្នា ការភ្ជាប់ខុសគ្នា → ម៉ូលេគុលខុសគ្នា ។",
    },
    {
      en: "Same connections, different 3D direction → stereoisomers.",
      kh: "ការភ្ជាប់ដូចគ្នា ទិសដៅ ៣ មាត្រ ខុសគ្នា → ស្តេរ៉េអូអ៊ីសូមែរ ។",
    },
    {
      en: "Mirror images that don't overlap → chiral. Your body notices.",
      kh: "រូបឆ្លុះដែលដាក់ត្រួតគ្នាមិនបាន → គីរ៉ាល់ ។ រាងកាយរបស់អ្នកដឹង ។",
    },
  ];
  return (
    <div className="mt-8 rounded-2xl border-2 border-slate-300 bg-white px-4 sm:px-5 py-4 shadow-sm">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 text-center mb-3">
        <BiliInline en="Quick Recap" kh="សង្ខេបរហ័ស" />
      </div>
      <ol className="grid md:grid-cols-3 gap-3" data-testid="recap-list">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-extrabold text-white flex items-center justify-center"
              style={{ backgroundColor: i === 2 ? NEON_RED : NEON_BLUE }}
            >
              {i + 1}
            </span>
            <span className="text-xs sm:text-sm leading-relaxed text-slate-700">
              <span className="block">{it.en}</span>
              <span className="block font-khmer text-sm leading-loose text-slate-600 mt-0.5">{it.kh}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
