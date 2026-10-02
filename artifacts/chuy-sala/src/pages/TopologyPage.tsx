import { TopologyDiagram } from "@/components/diagrams/LearningDiagrams";
import { useState } from "react";

import EulersFormula from "@/components/EulersFormula";
import FourColorMap from "@/components/FourColorMap";
import GabrielsHorn from "@/components/GabrielsHorn";
import KleinBottle from "@/components/KleinBottle";
import KnotTheory from "@/components/KnotTheory";
import { useLanguageStore } from "@/store/use-language";
import {
  BoxSelect,
  Fingerprint,
  Map as MapIcon,
  RotateCw,
  Sigma,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
//  Topology: The Mathematics of Shape
// ════════════════════════════════════════════════════════════════════════════

export default function TopologyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <ScopedStyles />
      <GraphPaperBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Sigma className="w-3.5 h-3.5" />
          {isKh ? "មេរៀន · គណិតវិទ្យា" : "Lesson · Mathematics"}
          <span className="text-slate-400">·</span>
          <span className="font-mono text-[10px] text-slate-500">MTH-TOP</span>
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh ? (
            <>
              ថតវិទ្យា៖{" "}
              <span className="math-text-ink text-indigo-800">
                គណិតវិទ្យានៃរូបរាង
              </span>
            </>
          ) : (
            <>
              Topology:{" "}
              <span className="math-text-ink text-indigo-800">
                The Mathematics of Shape
              </span>
            </>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ថតវិទ្យា គឺជា «ធរណីមាត្រសន្លឹកកៅស៊ូ»។ វាសិក្សាអំពីលក្ខណៈសម្បត្តិនៃលំហ ដែលត្រូវបានរក្សាទុកនៅពេលផ្លាស់ប្តូររូបរាងជាបន្តបន្ទាប់។ ច្បាប់តែមួយគត់៖ អ្នកអាចទាញពន្លាត រមួល ឬបត់បាន ប៉ុន្តែអ្នកមិនអាចហែក ឬបិទភ្ជាប់វាឡើយ។"
            : "Topology is “rubber-sheet geometry”. It studies properties of space that are preserved under continuous deformations. The only rule: you can stretch, twist, or bend, but you cannot tear or glue."}
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 text-xs">
          {[
            ["#mobius", isKh ? "បន្ទះ Möbius" : "Möbius Strip"],
            [
              "#homeomorphism",
              isKh ? "ការបំប្លែងពែង-ដូណាត់" : "Torus-Mug Homeomorphism",
            ],
            ["#four-color", isKh ? "ទ្រឹស្តីបទពណ៌ ៤" : "Four Color Theorem"],
            ["#euler", isKh ? "រូបមន្ត Euler" : "Euler's Formula"],
            ["#klein-bottle", isKh ? "ដប Klein" : "Klein Bottle"],
            ["#knot-theory", isKh ? "ទ្រឹស្តីចំណង" : "Knot Theory"],
            [
              "#gabriels-horn",
              isKh ? "ភាពផ្ទុយគ្នាត្រែ Gabriel" : "Gabriel's Horn Paradox",
            ],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-full border border-indigo-200 bg-white/80 text-indigo-800 hover:bg-indigo-50 transition tap-target ${
                isKh ? "font-khmer" : "font-medium"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── 1. MOBIUS STRIP ───────────────────────────────────────────── */}
      <section
        id="mobius"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ១" : "Section 01"}
          en="The Möbius Strip"
          kh="បន្ទះ Möbius"
          isKh={isKh}
          subEn="A surface with only one side and one edge."
          subKh="ផ្ទៃដែលមានតែមួយចំហៀង និងគែមតែមួយ។"
        />

        <div className="grid lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3">
            <article className="blueprint-card h-[400px] w-full relative overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-b from-white to-indigo-50/50 shadow-inner">
              <CardCorners />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                <RotateCw className="w-4 h-4 text-indigo-600 animate-[spin_4s_linear_infinite]" />
                <span
                  className={`text-xs text-indigo-800 ${isKh ? "font-khmer" : "font-medium"}`}
                >
                  {isKh ? "អូសដើម្បីបង្វិល" : "Drag to rotate"}
                </span>
              </div>
              <TopologyDiagram kind="mobius" />
            </article>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <article className="blueprint-card p-6 h-full flex flex-col justify-center">
              <CardCorners />
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="w-5 h-5 text-indigo-700" />
                <span className="font-mono text-[11px] tracking-widest text-indigo-700">
                  TOP-01 · MÖBIUS
                </span>
              </div>
              <h3
                className={`text-2xl font-bold text-slate-900 mb-3 ${isKh ? "font-khmer" : ""}`}
              >
                {isKh ? "សកលលោកមួយចំហៀង" : "A One-Sided Universe"}
              </h3>
              <div
                className={`space-y-4 text-sm text-slate-700 ${isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}`}
              >
                <p>
                  {isKh
                    ? "ប្រសិនបើអ្នកយកបន្ទះក្រដាសមួយ បង្វិលវាពាក់កណ្តាលជុំ រួចបិទចុងទាំងពីរចូលគ្នា អ្នកនឹងទទួលបានបន្ទះ Möbius។"
                    : "If you take a strip of paper, give it a half-twist, and glue the ends together, you get a Möbius strip."}
                </p>
                <p>
                  {isKh
                    ? "វាជារបស់ពិសេស ព្រោះវាមាន «តែមួយចំហៀង» ប៉ុណ្ណោះ។ បើអ្នកយកប៊ិចគូសតាមបណ្តោយបន្ទះនេះ អ្នកនឹងត្រលប់មកកន្លែងដើមវិញដោយបានគូសលើផ្ទៃទាំងមូល ដោយមិនបាច់លើកប៊ិចសោះ!"
                    : "It is mathematically fascinating because it only has one side. If you draw a line along the center, you will eventually cover both 'sides' of the paper and return to your starting point without ever lifting your pen!"}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 2. HOMEOMORPHISM (TORUS TO MUG) ───────────────────────────── */}
      <section
        id="homeomorphism"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ២" : "Section 02"}
          en="Continuous Deformation"
          kh="ការបំប្លែងរូបរាងជាបន្តបន្ទាប់"
          isKh={isKh}
          subEn="Why a coffee mug is mathematically identical to a donut."
          subKh="ហេតុអ្វីបានជាពែងកាហ្វេមានលក្ខណៈគណិតវិទ្យាដូចគ្នាបេះបិទនឹងនំដូណាត់។"
        />

        <div className="grid lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col justify-center">
            <article className="blueprint-card p-6 h-full flex flex-col justify-center">
              <CardCorners />
              <div className="flex items-center gap-2 mb-4">
                <BoxSelect className="w-5 h-5 text-amber-600" />
                <span className="font-mono text-[11px] tracking-widest text-amber-600">
                  TOP-02 · HOMEOMORPHISM
                </span>
              </div>
              <h3
                className={`text-2xl font-bold text-slate-900 mb-3 ${isKh ? "font-khmer" : ""}`}
              >
                {isKh ? "ពែងកាហ្វេ និង នំដូណាត់" : "The Coffee Mug & The Donut"}
              </h3>
              <div
                className={`space-y-4 text-sm text-slate-700 ${isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}`}
              >
                <p>
                  {isKh
                    ? "ក្នុងថតវិទ្យា វត្ថុពីរត្រូវបានចាត់ទុកថា «ដូចគ្នា» (Homeomorphic) ប្រសិនបើអ្នកអាចបំប្លែងវត្ថុមួយទៅជាមួយទៀតដោយការទាញ ឬបត់ ដោយមិនហែក។"
                    : "In topology, two objects are considered the 'same' (homeomorphic) if you can deform one into the other by stretching and bending, without tearing."}
                </p>
                <p>
                  {isKh
                    ? "ពែងកាហ្វេ និងនំដូណាត់ (Torus) គឺជារបស់តែមួយ ព្រោះវាទាំងពីរមានប្រហោងមួយគត់។ ប្រហោងរបស់នំដូណាត់ ក្លាយជាប្រហោងនៃដៃកាន់ពែងកាហ្វេ។"
                    : "A coffee mug and a donut (torus) are topologically identical because they both have exactly one hole. The hole of the donut becomes the hole of the mug's handle."}
                </p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <article className="blueprint-card p-5 w-full relative rounded-xl border border-amber-200 bg-white">
              <CardCorners />
              <div className="h-[360px] w-full rounded-lg overflow-hidden bg-gradient-to-b from-slate-50 to-amber-50/40 relative">
                <TorusMugScene isKh={isKh} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR COLOR THEOREM ─────────────────────────────────────── */}
      <section
        id="four-color"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៣" : "Section 03"}
          en="The Four Color Theorem"
          kh="ទ្រឹស្តីបទពណ៌ ៤"
          isKh={isKh}
          subEn="Color the map of Cambodia without letting adjacent provinces share the same color."
          subKh="ផាត់ពណ៌ផែនទីប្រទេសកម្ពុជា ដោយមិនឱ្យខេត្តដែលនៅជាប់គ្នាមានពណ៌ដូចគ្នាឡើយ។"
        />

        <div className="mt-8 relative z-10">
          <article className="blueprint-card p-6 md:p-10 w-full relative rounded-xl border border-indigo-200 bg-white/50 backdrop-blur-sm">
            <CardCorners />
            <div className="flex items-center gap-2 mb-6 justify-center">
              <MapIcon className="w-5 h-5 text-indigo-600" />
              <span className="font-mono text-[11px] tracking-widest text-indigo-600">
                TOP-03 · FOUR_COLOR_MAP
              </span>
            </div>

            <FourColorMap />
          </article>
        </div>
      </section>

      {/* ── 4. EULER'S FORMULA ─────────────────────────────────────── */}
      <section
        id="euler"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៤" : "Section 04"}
          en="Euler's Polyhedron Formula"
          kh="រូបមន្ត Polyhedron របស់ Euler"
          isKh={isKh}
          subEn="A magical constant that connects the vertices, edges, and faces of 3D shapes."
          subKh="ថេរដ៏អស្ចារ្យដែលភ្ជាប់កំពូល គែម និងផ្ទៃមុខនៃរូបរាង ៣ វិមាត្រ។"
        />

        <div className="mt-8 relative z-10">
          <EulersFormula />
        </div>
      </section>

      {/* ── 5. KLEIN BOTTLE ─────────────────────────────────────── */}
      <section
        id="klein-bottle"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៥" : "Section 05"}
          en="The Klein Bottle"
          kh="ដប Klein"
          isKh={isKh}
          subEn="A shape with no edges and no inside or outside."
          subKh="រូបរាងដែលគ្មានគែម និងគ្មានខាងក្នុង ឬខាងក្រៅ។"
        />

        <div className="mt-8 relative z-10">
          <KleinBottle />
        </div>
      </section>

      {/* ── 6. KNOT THEORY ─────────────────────────────────────── */}
      <section
        id="knot-theory"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៦" : "Section 06"}
          en="Knot Theory"
          kh="ទ្រឹស្តីចំណង"
          isKh={isKh}
          subEn="The mathematical study of closed loops in 3D space."
          subKh="ការសិក្សាគណិតវិទ្យាអំពីរង្វង់បិទជិតនៅក្នុងលំហ ៣ វិមាត្រ។"
        />

        <div className="mt-8 relative z-10">
          <KnotTheory />
        </div>
      </section>

      {/* ── 7. GABRIEL'S HORN PARADOX ─────────────────────────────────────── */}
      <section
        id="gabriels-horn"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៧" : "Section 07"}
          en="Gabriel's Horn Paradox"
          kh="ភាពផ្ទុយគ្នានៃត្រែ Gabriel"
          isKh={isKh}
          subEn="An infinite shape with a finite volume — can you fill it with paint?"
          subKh="រូបរាងអនន្តដែលមានមាឌកំណត់ — តើអ្នកអាចចាក់ថ្នាំលាបបំពេញវាបានទេ?"
        />

        <div className="mt-8 relative z-10">
          <GabrielsHorn />
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Subcomponents
 * ════════════════════════════════════════════════════════════════════════ */

function SectionHeader({ eyebrow, en, kh, subEn, subKh, isKh }: any) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-[10px] tracking-widest text-indigo-600 mb-1">
        {eyebrow}
      </div>
      <h2
        className={`text-2xl sm:text-3xl font-bold text-slate-900 ${
          isKh ? "font-khmer" : ""
        }`}
      >
        {isKh ? kh : en}
      </h2>
      <p
        className={`mt-2 text-sm text-slate-600 ${
          isKh ? "font-khmer" : "leading-relaxed"
        }`}
      >
        {isKh ? subKh : subEn}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 3D Möbius Strip
 * ════════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════════
 * 3D Torus to Mug Homeomorphism
 * ════════════════════════════════════════════════════════════════════════ */

function TorusMugScene({ isKh }: { isKh: boolean }) {
  const [morphValue, setMorphValue] = useState(0);

  return (
    <>
      <div className="absolute inset-0">
        <TopologyDiagram kind="mug" morph={morphValue} />
      </div>

      {/* Interactive UI Overlay */}
      <div className="absolute bottom-4 left-0 right-0 px-6 flex flex-col items-center z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl border border-amber-200 shadow-lg w-full max-w-sm pointer-events-auto">
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-xs font-bold text-amber-700 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "នំដូណាត់ (Torus)" : "Donut (Torus)"}
            </span>
            <span
              className={`text-xs font-bold text-indigo-700 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "ពែងកាហ្វេ (Mug)" : "Coffee Mug"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={morphValue}
            onChange={(e) => setMorphValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="mt-2 text-center text-[10px] text-slate-500 font-mono tracking-wider">
            MORPH: {(morphValue * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Shared Aesthetic Chrome
 * ════════════════════════════════════════════════════════════════════════ */

function CardCorners() {
  return (
    <>
      <span
        className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-indigo-400"
        aria-hidden
      />
      <span
        className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-indigo-400"
        aria-hidden
      />
      <span
        className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-indigo-400"
        aria-hidden
      />
      <span
        className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-indigo-400"
        aria-hidden
      />
    </>
  );
}

function GraphPaperBg() {
  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 60%, #e0e7ff 100%)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="geo-grid-fine"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#c7d2fe"
              strokeWidth="0.5"
              opacity="0.55"
            />
          </pattern>
          <pattern
            id="geo-grid-bold"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#geo-grid-fine)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#a5b4fc"
              strokeWidth="0.9"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo-grid-bold)" />
      </svg>
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .blueprint-card {
        position: relative;
        background: rgba(255,255,255,0.92);
        box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 6px 18px -8px rgba(49,46,129,0.15);
      }
      .math-text-ink {
        font-family: ui-serif, Georgia, "Times New Roman", serif;
        font-style: italic;
      }
    `}</style>
  );
}
