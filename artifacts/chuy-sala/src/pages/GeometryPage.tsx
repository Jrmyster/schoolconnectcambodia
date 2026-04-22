import { useState, useEffect, useRef } from "react";
import {
  Compass,
  Triangle as TriIcon,
  Globe2,
  Ruler,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Geometry: Mapping the Physical World — ធរណីមាត្រ៖ ការគូសផែនទីពិភពរូបវន្ត
//
//  Sections:
//    1. The Two Realities — Euclidean (flat) vs Non-Euclidean (curved)
//    2. The Pythagorean Theorem — a² + b² = c² with engineer's wall demo
//    3. The Auditory Shape Dictionary — speechSynthesis pronouncing 8 shapes
//
//  Aesthetic: same Mathematics blueprint grid (light blue graph paper,
//  ink/serif math variables, blue & gold accents). Strictly bilingual.
// ════════════════════════════════════════════════════════════════════════════

export default function GeometryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <ScopedStyles />
      <GraphPaperBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Compass className="w-3.5 h-3.5" />
          {isKh ? "មេរៀន · គណិតវិទ្យា" : "Lesson · Mathematics"}
          <span className="text-slate-400">·</span>
          <span className="font-mono text-[10px] text-slate-500">MTH-GEO</span>
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh ? (
            <>
              ធរណីមាត្រ៖{" "}
              <span className="math-text-ink">ការគូសផែនទីពិភពរូបវន្ត</span>
            </>
          ) : (
            <>
              Geometry:{" "}
              <span className="math-text-ink">Mapping the Physical World</span>
            </>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ធរណីមាត្រគឺជាវេយ្យាករណ៍នៃលំហ — វាបង្រៀនយើងពីរបៀបវាស់ផែនដី គូសផែនទីផ្កាយ និងធ្វើឲ្យជញ្ជាំងផ្ទះត្រង់។ ខាងក្រោមនេះ៖ ភពពីរ (រាបស្មើ និងកោង) ច្បាប់ដ៏ល្បីនៃត្រីកោណកែង និងវចនានុក្រមរូបរាងដែលអាចបញ្ចេញសំឡេងបានដើម្បីហ្វឹកហាត់ការនិយាយ។"
            : "Geometry is the grammar of space — it teaches us how to measure the Earth, chart the stars, and keep a wall straight. Below: two universes (flat and curved), the most famous rule of right triangles, and a talking shape dictionary to practise pronunciation."}
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 text-xs">
          {[
            ["#realities", isKh ? "ភពពីរ" : "Two Realities"],
            ["#pythagoras", isKh ? "ពីតាក័រ" : "Pythagoras"],
            ["#shapes", isKh ? "វចនានុក្រមរូបរាង" : "Shape Dictionary"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-full border border-blue-200 bg-white/80 text-blue-800 hover:bg-blue-50 transition tap-target ${
                isKh ? "font-khmer" : "font-medium"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── 1. THE TWO REALITIES ──────────────────────────────────────── */}
      <section
        id="realities"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ១" : "Section 01"}
          en="The Two Realities"
          kh="ភពពីរនៃធរណីមាត្រ"
          isKh={isKh}
          subEn="Euclidean vs Non-Euclidean — flat paper vs the curved Earth."
          subKh="អឺគ្លីត ទល់នឹង មិនមែនអឺគ្លីត — ក្រដាសរាបស្មើ ទល់នឹង ផែនដីកោង។"
        />

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {/* ── Euclidean ── */}
          <article className="blueprint-card p-5 sm:p-6">
            <CardCorners />
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-4 h-4 text-blue-700" />
              <span className="font-mono text-[10px] tracking-widest text-blue-700">
                E.01 · FLAT
              </span>
            </div>
            <h3
              className={`text-xl font-bold text-slate-900 mb-1 ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh ? "ធរណីមាត្រអឺគ្លីត" : "Euclidean Geometry"}
            </h3>
            <p
              className={`text-sm text-slate-600 mb-4 ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh
                ? "គណិតវិទ្យានៃផ្ទៃរាបស្មើ — ដូចជាក្រដាសសៀវភៅ ឬឥដ្ឋកម្រាល។"
                : "The math of flat surfaces — like a sheet of paper or a tile floor."}
            </p>

            <FlatDiagram isKh={isKh} />

            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span className={isKh ? "font-khmer" : ""}>
                  {isKh
                    ? "បន្ទាត់ស្របគ្នា មិនបន្ទុះគ្នាជារៀងរហូត។"
                    : "Parallel lines NEVER touch."}
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span className={isKh ? "font-khmer" : ""}>
                  {isKh ? (
                    <>
                      មុំទាំងបីនៃត្រីកោណបូកគ្នាស្មើ{" "}
                      <strong className="math-text-ink">១៨០°</strong> ជានិច្ច។
                    </>
                  ) : (
                    <>
                      A triangle's three angles always add up to{" "}
                      <strong className="math-text-ink">180°</strong>.
                    </>
                  )}
                </span>
              </li>
            </ul>
          </article>

          {/* ── Non-Euclidean ── */}
          <article className="blueprint-card p-5 sm:p-6">
            <CardCorners />
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="w-4 h-4 text-amber-700" />
              <span className="font-mono text-[10px] tracking-widest text-amber-700">
                NE.01 · CURVED
              </span>
            </div>
            <h3
              className={`text-xl font-bold text-slate-900 mb-1 ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh ? "ធរណីមាត្រមិនមែនអឺគ្លីត" : "Non-Euclidean Geometry"}
            </h3>
            <p
              className={`text-sm text-slate-600 mb-4 ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh
                ? "គណិតវិទ្យានៃផ្ទៃកោង — ដូចជាផែនដី ឬសាកលលោក។"
                : "The math of curved surfaces — like the Earth or the universe."}
            </p>

            <GlobeDiagram isKh={isKh} />

            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <XCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span className={isKh ? "font-khmer" : ""}>
                  {isKh
                    ? "បន្ទាត់រយៈបណ្ដោយចាប់ផ្ដើមស្របគ្នានៅអេក្វាទ័រ — ប៉ុន្តែបន្ទុះគ្នានៅប៉ូលខាងជើង!"
                    : "Lines of longitude start parallel at the equator — but crash together at the North Pole!"}
                </span>
              </li>
              <li className="flex gap-2">
                <XCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span className={isKh ? "font-khmer" : ""}>
                  {isKh ? (
                    <>
                      មុំទាំងបីនៃត្រីកោណលើគ្រាប់បាល់ អាច{" "}
                      <strong className="math-text-ink">លើស ១៨០°</strong> បាន។
                    </>
                  ) : (
                    <>
                      A triangle on a globe can have angles summing to{" "}
                      <strong className="math-text-ink">more than 180°</strong>.
                    </>
                  )}
                </span>
              </li>
            </ul>
          </article>
        </div>

        <p
          className={`mt-5 text-xs italic text-slate-500 max-w-3xl ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh
            ? "Albert Einstein បានប្រើធរណីមាត្រកោងដើម្បីបង្ហាញថា ទំនាញគឺជាការកោងនៃលំហខ្លួនវា។"
            : "Albert Einstein used curved geometry to show that gravity is the bending of space itself."}
        </p>
      </section>

      {/* ── 2. PYTHAGOREAN THEOREM ────────────────────────────────────── */}
      <section
        id="pythagoras"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ២" : "Section 02"}
          en="The Pythagorean Theorem"
          kh="ទ្រឹស្តីបទពីតាក័រ"
          isKh={isKh}
          subEn="The most famous rule of flat space — how engineers keep walls straight."
          subKh="ច្បាប់ដ៏ល្បីនៃលំហរាបស្មើ — របៀបវិស្វករធ្វើឲ្យជញ្ជាំងត្រង់។"
        />

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <article className="blueprint-card p-5 sm:p-6">
            <CardCorners />
            <PythagorasDiagram />
          </article>

          <article className="blueprint-card p-5 sm:p-6 flex flex-col">
            <CardCorners />
            <div className="flex items-center gap-2 mb-3">
              <TriIcon className="w-4 h-4 text-blue-700" />
              <span className="font-mono text-[10px] tracking-widest text-blue-700">
                THM · PYTHAGORAS
              </span>
            </div>

            <p
              className={`text-sm text-slate-700 mb-4 ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh
                ? "ប្រសិនបើអ្នកដឹងជ្រុងពីរនៃត្រីកោណកែង អ្នកអាចគណនាជ្រុងទីបីបានយ៉ាងពេញលក្ខណៈ។ នេះជាវិធីដែលវិស្វករប្រាកដថាជញ្ជាំងពិតជាបានកាត់កែងគ្នា ៩០°។"
                : "If you know two sides of a right triangle, you can perfectly calculate the third. This is how engineers make sure two walls meet at a true 90° corner."}
            </p>

            <div className="bg-white/80 border border-blue-100 rounded-lg px-4 py-5 my-2 text-center text-2xl">
              <BlockMath math="a^2 + b^2 = c^2" />
            </div>

            <p
              className={`mt-3 text-sm text-slate-700 ${
                isKh ? "font-khmer" : "italic"
              }`}
            >
              {isKh
                ? "« ការ៉េនៃអ៊ីប៉ូតេនុស គឺស្មើនឹងផលបូកនៃការ៉េនៃជ្រុងពីរផ្សេងទៀត។ »"
                : "“The square of the hypotenuse is equal to the sum of the squares of the other two sides.”"}
            </p>
            <p
              className={`mt-1 text-xs text-slate-500 ${
                isKh ? "font-khmer" : "italic"
              }`}
            >
              {isKh
                ? "(ការ៉េនៃអ៊ីប៉ូតេនុសគឺស្មើនឹងផលបូកនៃការ៉េនៃជ្រុងពីរផ្សេងទៀត។)"
                : "(ការ៉េនៃអ៊ីប៉ូតេនុសគឺស្មើនឹងផលបូកនៃការ៉េនៃជ្រុងពីរផ្សេងទៀត។)"}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { lbl: "a", v: "3", c: "text-blue-700" },
                { lbl: "b", v: "4", c: "text-blue-700" },
                { lbl: "c", v: "5", c: "text-amber-700" },
              ].map((s) => (
                <div
                  key={s.lbl}
                  className="bg-white border border-blue-100 rounded px-2 py-2"
                >
                  <div className={`font-serif italic font-bold text-lg ${s.c}`}>
                    {s.lbl}
                  </div>
                  <div className="font-mono text-slate-700">= {s.v}</div>
                </div>
              ))}
            </div>
            <p
              className={`mt-3 text-xs text-slate-600 text-center ${
                isKh ? "font-khmer" : ""
              }`}
            >
              <InlineMath math="3^2 + 4^2 = 9 + 16 = 25 = 5^2" />
            </p>
          </article>
        </div>
      </section>

      {/* ── 3. AUDITORY SHAPE DICTIONARY ──────────────────────────────── */}
      <section
        id="shapes"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ៣" : "Section 03"}
          en="The Auditory Shape Dictionary"
          kh="វចនានុក្រមរូបរាងដែលអាចបញ្ចេញសំឡេងបាន"
          isKh={isKh}
          subEn="Tap the speaker on any shape to hear its English pronunciation."
          subKh="ចុចលើនិមិត្តសញ្ញាសំឡេងលើរូបរាងណាមួយ ដើម្បីស្ដាប់ការបញ្ចេញសំឡេងជាភាសាអង់គ្លេស។"
        />

        <ShapeDictionary isKh={isKh} />

        <p
          className={`mt-6 text-xs italic text-slate-500 max-w-3xl ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh
            ? "ការនិយាយត្រូវប្រើ window.speechSynthesis នៃកម្មវិធីរុករក — អ្នកត្រូវការកម្មវិធីរុករកទំនើបនិងសំឡេងបើកដំណើរការ។"
            : "Pronunciation uses the browser's built-in window.speechSynthesis — works in any modern browser with audio enabled."}
        </p>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Section header
 * ════════════════════════════════════════════════════════════════════════ */
function SectionHeader({
  eyebrow,
  en,
  kh,
  subEn,
  subKh,
  isKh,
}: {
  eyebrow: string;
  en: string;
  kh: string;
  subEn: string;
  subKh: string;
  isKh: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-[10px] tracking-widest text-blue-700 mb-1">
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
 * Diagrams
 * ════════════════════════════════════════════════════════════════════════ */

function FlatDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="bg-white/85 border border-blue-100 rounded-md p-3">
      <svg viewBox="0 0 280 160" className="w-full h-auto">
        {/* graph paper */}
        <defs>
          <pattern id="g-flat" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" fill="none" stroke="#dbeafe" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="280" height="160" fill="url(#g-flat)" />
        {/* parallel lines */}
        <line x1="20" y1="40" x2="260" y2="40" stroke="#1d4ed8" strokeWidth="2" />
        <line x1="20" y1="80" x2="260" y2="80" stroke="#1d4ed8" strokeWidth="2" />
        <text
          x="265"
          y="44"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          fill="#1d4ed8"
          textAnchor="end"
          dy="-2"
        >
          ∥
        </text>
        {/* triangle */}
        <polygon
          points="60,140 200,140 130,100"
          fill="#fde68a"
          fillOpacity="0.55"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        <text
          x="130"
          y="135"
          fontSize="10"
          fontFamily="ui-monospace,monospace"
          fill="#78350f"
          textAnchor="middle"
        >
          Σ = 180°
        </text>
        {/* small angle marks */}
        {[
          [62, 137],
          [198, 137],
          [130, 102],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#b45309" />
        ))}
      </svg>
      <p
        className={`mt-1 text-[11px] text-center text-slate-500 ${
          isKh ? "font-khmer" : ""
        }`}
      >
        {isKh
          ? "បន្ទាត់ស្របមិនជួបគ្នា · ត្រីកោណ Σ = ១៨០°"
          : "Parallels never meet · Triangle Σ = 180°"}
      </p>
    </div>
  );
}

function GlobeDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="bg-white/85 border border-amber-100 rounded-md p-3">
      <svg viewBox="0 0 280 160" className="w-full h-auto">
        <defs>
          <radialGradient id="g-globe" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>
        {/* sphere */}
        <circle cx="140" cy="80" r="60" fill="url(#g-globe)" stroke="#1e3a8a" strokeWidth="1.2" />
        {/* equator */}
        <ellipse
          cx="140"
          cy="80"
          rx="60"
          ry="14"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.2"
          strokeDasharray="3 2"
        />
        {/* longitude lines converging at north pole (top) */}
        {[-50, -25, 0, 25, 50].map((tilt, i) => (
          <ellipse
            key={i}
            cx="140"
            cy="80"
            rx={Math.max(8, 60 - Math.abs(tilt) * 0.8)}
            ry="60"
            fill="none"
            stroke="#fb923c"
            strokeWidth="1.4"
            transform={`rotate(${tilt} 140 80)`}
          />
        ))}
        {/* north pole marker */}
        <circle cx="140" cy="20" r="3" fill="#dc2626" />
        <text
          x="140"
          y="14"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          fill="#dc2626"
          textAnchor="middle"
        >
          N
        </text>
        {/* triangle on globe */}
        <path
          d="M 100 80 Q 140 60 180 80 Q 160 35 140 20 Q 120 35 100 80 Z"
          fill="#fde68a"
          fillOpacity="0.5"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        <text
          x="140"
          y="62"
          fontSize="10"
          fontFamily="ui-monospace,monospace"
          fill="#78350f"
          textAnchor="middle"
        >
          Σ &gt; 180°
        </text>
      </svg>
      <p
        className={`mt-1 text-[11px] text-center text-slate-500 ${
          isKh ? "font-khmer" : ""
        }`}
      >
        {isKh
          ? "បន្ទាត់រយៈបណ្ដោយជួបគ្នានៅប៉ូល · ត្រីកោណ Σ > ១៨០°"
          : "Longitudes meet at the pole · Triangle Σ > 180°"}
      </p>
    </div>
  );
}

function PythagorasDiagram() {
  // 3-4-5 triangle scaled to fit 320×260 viewport with squares on each side
  return (
    <div className="bg-white/85 border border-blue-100 rounded-md p-3">
      <svg viewBox="0 0 320 260" className="w-full h-auto">
        <defs>
          <pattern id="g-pyth" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#dbeafe" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="320" height="260" fill="url(#g-pyth)" />

        {/* Triangle vertices: A(80,180) B(200,180) C(80,90)
            a (vertical) = 90 (=3 units * 30), b (horizontal) = 120 (=4*30), c = 150 (=5*30) */}

        {/* Square on a (left vertical side) — to the LEFT of the triangle */}
        <rect
          x="-10"
          y="90"
          width="90"
          height="90"
          fill="#bfdbfe"
          fillOpacity="0.6"
          stroke="#1d4ed8"
          strokeWidth="1.2"
        />
        <text
          x="35"
          y="140"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
          fill="#1e3a8a"
          textAnchor="middle"
        >
          a²
        </text>
        <text
          x="35"
          y="158"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          fill="#1e3a8a"
          textAnchor="middle"
        >
          = 9
        </text>

        {/* Square on b (bottom horizontal side) — BELOW the triangle */}
        <rect
          x="80"
          y="180"
          width="120"
          height="120"
          fill="#bfdbfe"
          fillOpacity="0.6"
          stroke="#1d4ed8"
          strokeWidth="1.2"
        />
        <text
          x="140"
          y="245"
          fontSize="16"
          fontFamily="serif"
          fontStyle="italic"
          fill="#1e3a8a"
          textAnchor="middle"
        >
          b²
        </text>
        <text
          x="140"
          y="262"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          fill="#1e3a8a"
          textAnchor="middle"
        >
          = 16
        </text>

        {/* Square on c (hypotenuse) — rotated to sit on the slope.
            Hypotenuse runs from (200,180) to (80,90); length 150, angle ≈ -36.87°.
            Square sits on the OUTSIDE (above) the hypotenuse. */}
        <g transform="translate(200 180) rotate(-143.13)">
          {/* The hypotenuse vector points from (200,180) toward (80,90) which
              is at angle 180-36.87 = 143.13° from +x. We draw the square
              in local coords going right (along hypotenuse) then "up" (outward). */}
          <rect
            x="0"
            y="0"
            width="150"
            height="150"
            fill="#fde68a"
            fillOpacity="0.7"
            stroke="#b45309"
            strokeWidth="1.4"
          />
          <text
            x="75"
            y="80"
            fontSize="20"
            fontFamily="serif"
            fontStyle="italic"
            fill="#78350f"
            textAnchor="middle"
            transform="rotate(180 75 75)"
          >
            c²
          </text>
          <text
            x="75"
            y="100"
            fontSize="10"
            fontFamily="ui-monospace,monospace"
            fill="#78350f"
            textAnchor="middle"
            transform="rotate(180 75 75)"
          >
            = 25
          </text>
        </g>

        {/* Triangle itself, drawn last so its border sits on top */}
        <polygon
          points="80,180 200,180 80,90"
          fill="#ffffff"
          fillOpacity="0.85"
          stroke="#0f172a"
          strokeWidth="1.6"
        />
        {/* Right-angle square at C(80,180) */}
        <rect x="80" y="170" width="10" height="10" fill="none" stroke="#0f172a" strokeWidth="1" />

        {/* Side labels */}
        <text
          x="68"
          y="138"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
          fill="#0f172a"
          textAnchor="end"
        >
          a
        </text>
        <text
          x="140"
          y="195"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
          fill="#0f172a"
          textAnchor="middle"
        >
          b
        </text>
        <text
          x="148"
          y="128"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
          fill="#b45309"
          textAnchor="middle"
        >
          c
        </text>
      </svg>
      <p className="mt-1 text-[11px] text-center text-slate-500 font-mono">
        a = 3 · b = 4 · c = 5 → 9 + 16 = 25 ✓
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Auditory Shape Dictionary
 * ════════════════════════════════════════════════════════════════════════ */

type ShapeKey =
  | "circle"
  | "square"
  | "triangle"
  | "rectangle"
  | "sphere"
  | "cube"
  | "cylinder"
  | "pyramid";

const SHAPES: Array<{ key: ShapeKey; en: string; kh: string; dim: "2D" | "3D" }> = [
  { key: "circle",    en: "Circle",    kh: "រង្វង់",       dim: "2D" },
  { key: "square",    en: "Square",    kh: "ការ៉េ",        dim: "2D" },
  { key: "triangle",  en: "Triangle",  kh: "ត្រីកោណ",      dim: "2D" },
  { key: "rectangle", en: "Rectangle", kh: "ចតុកោណកែង",   dim: "2D" },
  { key: "sphere",    en: "Sphere",    kh: "ស្វ៊ែរ",       dim: "3D" },
  { key: "cube",      en: "Cube",      kh: "គូប",          dim: "3D" },
  { key: "cylinder",  en: "Cylinder",  kh: "ស៊ីឡាំង",      dim: "3D" },
  { key: "pyramid",   en: "Pyramid",   kh: "ពីរ៉ាមីត",     dim: "3D" },
];

function ShapeDictionary({ isKh }: { isKh: boolean }) {
  const [supported, setSupported] = useState(true);
  const [activeKey, setActiveKey] = useState<ShapeKey | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speak(name: string, key: ShapeKey) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(name);
    u.lang = "en-US";
    u.rate = 0.85;
    u.pitch = 1;
    u.onend = () => setActiveKey((prev) => (prev === key ? null : prev));
    u.onerror = () => setActiveKey(null);
    utterRef.current = u;
    setActiveKey(key);
    window.speechSynthesis.speak(u);
  }

  return (
    <>
      {!supported && (
        <p className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 inline-block">
          {isKh
            ? "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការនិយាយទេ។"
            : "Your browser doesn't support speech synthesis."}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {SHAPES.map((s) => {
          const active = activeKey === s.key;
          return (
            <article
              key={s.key}
              className={`blueprint-card p-4 transition ${
                active ? "ring-2 ring-amber-400 shadow-md" : ""
              }`}
            >
              <CardCorners />
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] tracking-widest text-blue-700">
                  {s.dim}
                </span>
                <button
                  type="button"
                  onClick={() => speak(s.en, s.key)}
                  disabled={!supported}
                  aria-label={`Pronounce ${s.en}`}
                  className={`tap-target rounded-full border transition ${
                    active
                      ? "bg-amber-500 border-amber-600 text-white animate-pulse"
                      : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-square bg-white/85 border border-blue-100 rounded-md flex items-center justify-center mb-3">
                <ShapeSvg shape={s.key} />
              </div>

              <div className="text-center">
                <div className="text-base font-bold text-slate-900">{s.en}</div>
                <div
                  className={`text-sm text-slate-600 font-khmer`}
                  style={{ lineHeight: 1.85 }}
                >
                  {s.kh}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function ShapeSvg({ shape }: { shape: ShapeKey }) {
  const stroke = "#1e3a8a";
  const fill = "#dbeafe";
  const sw = 1.6;
  const common = { width: "82%", height: "82%", viewBox: "0 0 100 100" };
  switch (shape) {
    case "circle":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="36" fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "square":
      return (
        <svg {...common}>
          <rect x="18" y="18" width="64" height="64" fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <polygon points="50,15 88,82 12,82" fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "rectangle":
      return (
        <svg {...common}>
          <rect x="10" y="30" width="80" height="40" fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "sphere":
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="sphG" cx="38%" cy="34%" r="62%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="52" r="36" fill="url(#sphG)" stroke={stroke} strokeWidth={sw} />
          <ellipse cx="50" cy="52" rx="36" ry="9" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          {/* iso cube */}
          <polygon points="20,38 50,22 80,38 80,72 50,88 20,72" fill={fill} stroke={stroke} strokeWidth={sw} />
          <polyline points="20,38 50,54 80,38" fill="none" stroke={stroke} strokeWidth={sw} />
          <line x1="50" y1="54" x2="50" y2="88" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "cylinder":
      return (
        <svg {...common}>
          <rect x="22" y="22" width="56" height="56" fill={fill} stroke="none" />
          <line x1="22" y1="22" x2="22" y2="78" stroke={stroke} strokeWidth={sw} />
          <line x1="78" y1="22" x2="78" y2="78" stroke={stroke} strokeWidth={sw} />
          <ellipse cx="50" cy="22" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth={sw} />
          <ellipse cx="50" cy="78" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth={sw} />
          <ellipse cx="50" cy="22" rx="28" ry="8" fill="none" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        </svg>
      );
    case "pyramid":
      return (
        <svg {...common}>
          {/* square-based pyramid in iso */}
          <polygon points="50,12 88,72 12,72" fill={fill} stroke={stroke} strokeWidth={sw} />
          <polygon points="12,72 50,88 88,72 50,60" fill="#eff6ff" stroke={stroke} strokeWidth={sw} />
          <line x1="50" y1="12" x2="50" y2="60" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      );
  }
}

/* ════════════════════════════════════════════════════════════════════════
 * Shared chrome (matches MathematicsPage blueprint aesthetic)
 * ════════════════════════════════════════════════════════════════════════ */

function CardCorners() {
  return (
    <>
      <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-blue-400" aria-hidden />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-blue-400" aria-hidden />
      <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-blue-400" aria-hidden />
      <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-blue-400" aria-hidden />
    </>
  );
}

function GraphPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #e0ecfb 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="geo-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="geo-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#geo-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.9" opacity="0.5" />
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
        border: 1px solid rgb(191 219 254);
        border-radius: 0.75rem;
        box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 6px 18px -8px rgba(30,58,138,0.18);
      }
      .math-text-ink {
        color: #1e3a8a;
        font-family: ui-serif, Georgia, "Times New Roman", serif;
        font-style: italic;
      }
    `}</style>
  );
}
