import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Magnet,
  Compass,
  Sigma,
  Sliders,
  Anchor,
  Weight,
  Repeat,
  Apple,
  Footprints,
  Plus,
  Minus,
  Hand,
  RotateCcw,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Shared blueprint surface (same as PhysicsHub / PhysicsMotion) ─────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false, tone = "rose" }: { subtle?: boolean; tone?: "rose" | "cyan" }) {
  const subtleStroke = "border-slate-300/70";
  const accentStroke = tone === "rose" ? "border-rose-400/60" : "border-cyan-400/60";
  const stroke = subtle ? subtleStroke : accentStroke;
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
// Page
// ────────────────────────────────────────────────────────────────────────────
export function PhysicsForcesPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        {/* ── Header ────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-8 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244, 63, 94, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(244, 63, 94, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <CornerMarks tone="rose" />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/10 border-2 border-rose-400/60 text-rose-300 flex items-center justify-center flex-shrink-0">
              <Magnet className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-rose-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-rose-200">M-02</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Module 2: Forces & Newton's Laws", "ម៉ូឌុលទី២៖ កម្លាំង និងច្បាប់ញូតុន")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Discover the invisible pushes and pulls that hold our world together — from a falling mango to a parked tuk-tuk.",
                  "ស្វែងយល់ពីការរុញ និងការទាញដែលមើលមិនឃើញ ដែលរក្សាពិភពលោករបស់យើងឱ្យនៅជាមួយគ្នា — ពីផ្លែស្វាយធ្លាក់ ដល់រ៉ឺមឺកដែលឈប់។",
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. Newton's Three Laws ────────────────────────────── */}
        <SectionTitle
          en="Newton's three laws — the blueprint"
          kh="ច្បាប់ទាំងបីរបស់ញូតុន — ប្លង់មេ"
          numberLabel="01"
          icon={Sigma}
        />
        <div className="space-y-4 sm:space-y-5 mb-10">
          <LawCard
            kh={kh}
            t={t}
            number="01"
            titleEn="Law of Inertia"
            titleKh="ច្បាប់នៃភាពអសកម្ម"
            statementEn="An object stays at rest, or keeps moving in a straight line, unless a force acts on it."
            statementKh="វត្ថុមួយនៅសុខស្ងៀម ឬបន្តធ្វើចលនាជាបន្ទាត់ត្រង់ លុះត្រាតែមានកម្លាំងមួយធ្វើសកម្មភាពលើវា។"
            exampleEn="A bag of rice on a moto's seat slides forward when the driver brakes — the rice 'wants' to keep moving."
            exampleKh="បាវអង្ករនៅលើកៅអីម៉ូតូរអិលទៅមុខ ពេលអ្នកបើកបរហ្វ្រាំង — អង្ករ 'ចង់' បន្តធ្វើចលនា។"
            icon={Anchor}
            visual={<InertiaVisual />}
          />
          <LawCard
            kh={kh}
            t={t}
            number="02"
            titleEn="F = m × a"
            titleKh="F = m × a"
            statementEn="Force equals mass times acceleration. The more mass an object has, the more force is needed to move it."
            statementKh="កម្លាំងស្មើនឹងម៉ាស់គុណនឹងសំទុះ។ ម៉ាស់របស់វត្ថុកាន់តែច្រើន ត្រូវការកម្លាំងកាន់តែខ្លាំងដើម្បីផ្លាស់ទីវា។"
            exampleEn="It is easier to push an empty ox-cart than one fully loaded with rice — same push, less mass, more acceleration."
            exampleKh="ងាយរុញរទេះគោទទេ ជាងរទេះដែលផ្ទុកអង្ករពេញ — រុញដូចគ្នា ម៉ាស់តិចជាង សំទុះច្រើនជាង។"
            icon={Weight}
            visual={<FmaVisual />}
            formula
          />
          <LawCard
            kh={kh}
            t={t}
            number="03"
            titleEn="Action & Reaction"
            titleKh="សកម្មភាព និងប្រតិកម្ម"
            statementEn="For every action, there is an equal and opposite reaction."
            statementKh="ចំពោះរាល់សកម្មភាពនីមួយៗ មានប្រតិកម្មស្មើគ្នា និងផ្ទុយគ្នា។"
            exampleEn="When you jump off a small boat, you go forward and the boat slides backward. Your push on the boat is matched by the boat's push on you."
            exampleKh="ពេលអ្នកលោតចេញពីទូកតូច អ្នកទៅមុខ ហើយទូករអិលទៅក្រោយ។ ការរុញរបស់អ្នកលើទូក ត្រូវបានឆ្លើយតបដោយការរុញរបស់ទូកលើអ្នក។"
            icon={Repeat}
            visual={<ActionReactionVisual />}
          />
        </div>

        {/* ── 2. Tug of War Simulator ─────────────────────────── */}
        <SectionTitle
          en="Interactive: Tug of War — force balance"
          kh="អន្តរកម្ម៖ ទាញព្រ័ត្រ — តុល្យភាពកម្លាំង"
          numberLabel="02"
          icon={Sliders}
        />
        <TugOfWarSimulator />

        {/* ── 3. Gravity & Friction ───────────────────────────── */}
        <SectionTitle
          en="Gravity & friction in everyday life"
          kh="ទំនាញផែនដី និងកម្លាំងកកិតក្នុងជីវភាពប្រចាំថ្ងៃ"
          numberLabel="03"
          icon={Apple}
        />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-10">
          {/* Gravity */}
          <ConceptCard
            kh={kh}
            t={t}
            titleEn="Gravity"
            titleKh="ទំនាញផែនដី"
            icon={Apple}
            descEn="Gravity is the invisible pull that keeps your feet on the ground and pulls a falling mango toward the earth."
            descKh="ទំនាញផែនដី គឺជាការទាញដែលមើលមិនឃើញ ដែលរក្សាជើងរបស់អ្នកនៅលើដី និងទាញផ្លែស្វាយដែលធ្លាក់ឆ្ពោះទៅផែនដី។"
            tagsEn={["g ≈ 9.8 m/s²", "Always pulls down", "Acts on every object"]}
            tagsKh={["g ≈ 9.8 m/s²", "ទាញចុះក្រោមជានិច្ច", "មានសកម្មភាពលើគ្រប់វត្ថុ"]}
            visual={<GravityVisual />}
          />
          {/* Friction */}
          <ConceptCard
            kh={kh}
            t={t}
            titleEn="Friction"
            titleKh="កម្លាំងកកិត"
            icon={Footprints}
            descEn="Friction is the force that resists motion. It's why you have to pedal harder on a muddy road!"
            descKh="កម្លាំងកកិត គឺជាកម្លាំងដែលរារាំងចលនា។ វាជាមូលហេតុដែលអ្នកត្រូវធាក់កង់ខ្លាំងជាងមុន នៅលើផ្លូវភក់!"
            tagsEn={["Resists motion", "Depends on surface", "Creates heat"]}
            tagsKh={["រារាំងចលនា", "អាស្រ័យលើផ្ទៃ", "បង្កើតកម្តៅ"]}
            visual={<FrictionVisual />}
          />
        </div>

        {/* Next */}
        <div className="mt-2 flex justify-center">
          <Link
            href="/physics/energy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors"
          >
            <span>{t("Next: Energy & Thermodynamics", "បន្ទាប់៖ ថាមពល និងទែម៉ូឌីណាមិច")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section title bar (rose-toned for forces) ─────────────────────────────
function SectionTitle({
  en,
  kh,
  numberLabel,
  icon: Icon,
}: {
  en: string;
  kh: string;
  numberLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-rose-700 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ── Newton's Law card ─────────────────────────────────────────────────────
function LawCard({
  kh,
  t,
  number,
  titleEn,
  titleKh,
  statementEn,
  statementKh,
  exampleEn,
  exampleKh,
  icon: Icon,
  visual,
  formula = false,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  number: string;
  titleEn: string;
  titleKh: string;
  statementEn: string;
  statementKh: string;
  exampleEn: string;
  exampleKh: string;
  icon: React.ComponentType<{ className?: string }>;
  visual: React.ReactNode;
  formula?: boolean;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-rose-300 shadow-sm overflow-hidden" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[1fr_220px] gap-5 items-stretch">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-rose-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? `ច្បាប់ ${number}` : `Law ${number}`}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-rose-900 leading-tight ${kh && !formula ? "font-khmer" : ""}`}>
                {kh ? titleKh : titleEn}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? statementKh : statementEn}
          </p>

          <div className="border-t border-dashed border-slate-200 pt-3">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Everyday example", "ឧទាហរណ៍ប្រចាំថ្ងៃ")}
            </div>
            <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? exampleKh : exampleEn}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center min-h-[140px]">
          {visual}
        </div>
      </div>
    </article>
  );
}

// ── Visuals for the three laws ────────────────────────────────────────────
function InertiaVisual() {
  // Stationary block + dashed motion line; "no force = no change"
  return (
    <svg viewBox="0 0 220 130" className="w-full h-32" aria-hidden="true">
      <line x1="10" y1="100" x2="210" y2="100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* anchored block */}
      <rect x="90" y="62" width="40" height="38" rx="4" fill="#fb7185" stroke="#9f1239" strokeWidth="1.5" />
      <text x="110" y="86" fontSize="11" fill="#fff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">m</text>
      {/* "stays put" indicator */}
      <text x="110" y="38" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle">NO FORCE</text>
      <text x="110" y="52" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle">= NO CHANGE</text>
      {/* anchor below */}
      <line x1="110" y1="100" x2="110" y2="115" stroke="#9f1239" strokeWidth="1.5" />
      <path d="M 100 115 L 120 115 M 105 115 Q 105 125, 110 125 Q 115 125, 115 115" stroke="#9f1239" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FmaVisual() {
  // Push arrow + block + acceleration arrow
  return (
    <svg viewBox="0 0 220 130" className="w-full h-32" aria-hidden="true">
      <line x1="10" y1="100" x2="210" y2="100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* push arrow */}
      <line x1="20" y1="80" x2="80" y2="80" stroke="#9f1239" strokeWidth="3" markerEnd="url(#fma-arr-r)" />
      <text x="22" y="68" fontSize="11" fill="#9f1239" fontFamily="monospace" fontWeight="bold">F</text>
      {/* block */}
      <rect x="90" y="62" width="50" height="38" rx="4" fill="#fb7185" stroke="#9f1239" strokeWidth="1.5" />
      <text x="115" y="86" fontSize="11" fill="#fff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">m</text>
      {/* acceleration arrow */}
      <line x1="150" y1="80" x2="205" y2="80" stroke="#0891b2" strokeWidth="2.5" markerEnd="url(#fma-arr-c)" />
      <text x="170" y="68" fontSize="11" fill="#0891b2" fontFamily="monospace" fontWeight="bold">a</text>
      <defs>
        <marker id="fma-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#9f1239" /></marker>
        <marker id="fma-arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0891b2" /></marker>
      </defs>
      {/* equation */}
      <text x="110" y="40" fontSize="13" fill="#0f172a" fontFamily="serif" textAnchor="middle" fontWeight="bold" fontStyle="italic">F = m·a</text>
    </svg>
  );
}

function ActionReactionVisual() {
  // Two figures pushing each other; opposite arrows
  return (
    <svg viewBox="0 0 220 130" className="w-full h-32" aria-hidden="true">
      <line x1="10" y1="100" x2="210" y2="100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* left block */}
      <rect x="40" y="62" width="40" height="38" rx="4" fill="#fb7185" stroke="#9f1239" strokeWidth="1.5" />
      <text x="60" y="86" fontSize="11" fill="#fff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A</text>
      {/* right block */}
      <rect x="140" y="62" width="40" height="38" rx="4" fill="#06b6d4" stroke="#155e75" strokeWidth="1.5" />
      <text x="160" y="86" fontSize="11" fill="#fff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B</text>
      {/* arrows: A pushes right, B pushes left */}
      <line x1="80" y1="74" x2="135" y2="74" stroke="#9f1239" strokeWidth="2.5" markerEnd="url(#ar-arr-r)" />
      <line x1="140" y1="90" x2="85" y2="90" stroke="#155e75" strokeWidth="2.5" markerEnd="url(#ar-arr-l)" />
      <defs>
        <marker id="ar-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#9f1239" /></marker>
        <marker id="ar-arr-l" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#155e75" /></marker>
      </defs>
      <text x="110" y="40" fontSize="11" fill="#475569" fontFamily="monospace" textAnchor="middle">EQUAL · OPPOSITE</text>
    </svg>
  );
}

function GravityVisual() {
  // Tree with apple falling
  return (
    <svg viewBox="0 0 220 110" className="w-full h-24" aria-hidden="true">
      {/* ground */}
      <line x1="10" y1="95" x2="210" y2="95" stroke="#475569" strokeWidth="1.5" />
      <pattern id="ground-hatch" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0,6 L6,0" stroke="#94a3b8" strokeWidth="0.6" /></pattern>
      <rect x="10" y="95" width="200" height="10" fill="url(#ground-hatch)" />
      {/* tree trunk */}
      <rect x="38" y="40" width="12" height="55" fill="#92400e" />
      {/* canopy */}
      <circle cx="44" cy="32" r="22" fill="#16a34a" opacity="0.85" />
      {/* falling apple */}
      <circle cx="120" cy="50" r="8" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      <path d="M120 42 q 2 -3 4 -2" stroke="#16a34a" strokeWidth="1.5" fill="none" />
      {/* gravity arrow */}
      <line x1="150" y1="20" x2="150" y2="85" stroke="#9f1239" strokeWidth="2.5" markerEnd="url(#grav-arr)" />
      <text x="158" y="55" fontSize="11" fill="#9f1239" fontFamily="monospace" fontWeight="bold">g</text>
      <defs>
        <marker id="grav-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#9f1239" /></marker>
      </defs>
    </svg>
  );
}

function FrictionVisual() {
  // Bike on rough ground with friction arrow opposing motion
  return (
    <svg viewBox="0 0 220 110" className="w-full h-24" aria-hidden="true">
      {/* rough ground */}
      <line x1="10" y1="85" x2="210" y2="85" stroke="#475569" strokeWidth="1.5" />
      <pattern id="mud-hatch" patternUnits="userSpaceOnUse" width="5" height="5"><path d="M0,5 L5,0" stroke="#a16207" strokeWidth="0.7" /></pattern>
      <rect x="10" y="85" width="200" height="10" fill="url(#mud-hatch)" />
      {/* simple bike */}
      <circle cx="80" cy="78" r="9" stroke="#0f172a" strokeWidth="1.5" fill="none" />
      <circle cx="125" cy="78" r="9" stroke="#0f172a" strokeWidth="1.5" fill="none" />
      <line x1="80" y1="78" x2="105" y2="55" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="125" y1="78" x2="105" y2="55" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="105" y1="55" x2="115" y2="48" stroke="#0f172a" strokeWidth="1.5" />
      {/* motion arrow (right) */}
      <line x1="145" y1="45" x2="200" y2="45" stroke="#0891b2" strokeWidth="2.5" markerEnd="url(#fric-arr-r)" />
      <text x="148" y="38" fontSize="10" fill="#0891b2" fontFamily="monospace" fontWeight="bold">MOTION</text>
      {/* friction arrow (left) */}
      <line x1="65" y1="68" x2="20" y2="68" stroke="#9f1239" strokeWidth="2.5" markerEnd="url(#fric-arr-l)" />
      <text x="22" y="60" fontSize="10" fill="#9f1239" fontFamily="monospace" fontWeight="bold">FRICTION</text>
      <defs>
        <marker id="fric-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0891b2" /></marker>
        <marker id="fric-arr-l" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#9f1239" /></marker>
      </defs>
    </svg>
  );
}

// ── Concept card (Gravity, Friction) ──────────────────────────────────────
function ConceptCard({
  kh,
  t,
  titleEn,
  titleKh,
  icon: Icon,
  descEn,
  descKh,
  tagsEn,
  tagsKh,
  visual,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  titleEn: string;
  titleKh: string;
  icon: React.ComponentType<{ className?: string }>;
  descEn: string;
  descKh: string;
  tagsEn: string[];
  tagsKh: string[];
  visual: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-rose-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold text-rose-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? titleKh : titleEn}
          </h3>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-3 flex items-center justify-center min-h-[100px]">
          {visual}
        </div>
        <p className={`text-sm text-foreground/80 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? descKh : descEn}
        </p>
        <div className="mt-auto pt-3 border-t border-dashed border-slate-200">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Quick facts", "ការពិតរហ័ស")}
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {(kh ? tagsKh : tagsEn).map((tag, i) => (
              <li key={i} className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border border-rose-300/80 text-rose-800 bg-white/60 ${kh ? "font-khmer" : ""}`}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tug of War simulator
// ────────────────────────────────────────────────────────────────────────────
function TugOfWarSimulator() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const MAX_F = 50; // N per side
  const STEP = 5;
  const MASS = 10; // kg

  const [leftF, setLeftF] = useState(20);
  const [rightF, setRightF] = useState(20);

  const netF = rightF - leftF; // positive = right
  const acceleration = netF / MASS; // m/s²
  const direction: "left" | "right" | "balanced" =
    netF > 0 ? "right" : netF < 0 ? "left" : "balanced";

  // Visual offset: clamp between -80 and +80 px based on netF magnitude
  const offsetPx = Math.max(-80, Math.min(80, netF * 1.6));

  const adjust = (side: "left" | "right", delta: number) => {
    if (side === "left") setLeftF((v) => Math.max(0, Math.min(MAX_F, v + delta)));
    else setRightF((v) => Math.max(0, Math.min(MAX_F, v + delta)));
  };

  const reset = () => {
    setLeftF(20);
    setRightF(20);
  };

  const statusBg =
    direction === "right"
      ? "bg-cyan-100 text-cyan-800"
      : direction === "left"
      ? "bg-rose-100 text-rose-800"
      : "bg-slate-100 text-slate-700";
  const statusEn =
    direction === "right" ? "Block accelerates RIGHT →" : direction === "left" ? "← Block accelerates LEFT" : "Balanced — no acceleration";
  const statusKh =
    direction === "right" ? "ប្លុកមានសំទុះទៅខាងស្តាំ →" : direction === "left" ? "← ប្លុកមានសំទុះទៅខាងឆ្វេង" : "តុល្យភាព — គ្មានសំទុះ";

  return (
    <section className="relative rounded-2xl border-2 border-rose-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-4 sm:p-6">
        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusBg} ${kh ? "font-khmer" : ""}`}>
            <Hand className="w-3.5 h-3.5" />
            {kh ? statusKh : statusEn}
          </span>
          <Stat labelEn="Left force" labelKh="កម្លាំងឆ្វេង" value={`${leftF} N`} kh={kh} accent="rose" />
          <Stat labelEn="Right force" labelKh="កម្លាំងស្តាំ" value={`${rightF} N`} kh={kh} accent="cyan" />
          <Stat labelEn="Net force (F)" labelKh="កម្លាំងសុទ្ធ (F)" value={`${netF >= 0 ? "+" : ""}${netF} N`} kh={kh} />
          <Stat labelEn="Mass (m)" labelKh="ម៉ាស់ (m)" value={`${MASS} kg`} kh={kh} />
          <Stat labelEn="Acceleration (a)" labelKh="សំទុះ (a)" value={`${acceleration.toFixed(1)} m/s²`} kh={kh} />
        </div>

        {/* The arena */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 overflow-hidden">
          <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={kh ? "ឧបករណ៍ជំនួយតុល្យភាពកម្លាំង" : "Force balance simulator visual"} role="img">
            {/* ground */}
            <line x1="20" y1="170" x2="580" y2="170" stroke="#475569" strokeWidth="1.5" />
            <pattern id="tug-ground" patternUnits="userSpaceOnUse" width="8" height="8"><path d="M0,8 L8,0" stroke="#94a3b8" strokeWidth="0.6" /></pattern>
            <rect x="20" y="170" width="560" height="14" fill="url(#tug-ground)" />

            {/* axis tick at center to show original position */}
            <line x1="300" y1="20" x2="300" y2="170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            <text x="300" y="14" fontSize="9" fill="#94a3b8" fontFamily="monospace" textAnchor="middle">START</text>

            {/* Left rope/arrow group — scales with leftF */}
            <ForceGroup
              cx={140 + offsetPx}
              direction="left"
              magnitudeFraction={leftF / MAX_F}
              colorMain="#9f1239"
              labelText={`${leftF} N`}
            />

            {/* Right rope/arrow group — scales with rightF */}
            <ForceGroup
              cx={460 + offsetPx}
              direction="right"
              magnitudeFraction={rightF / MAX_F}
              colorMain="#155e75"
              labelText={`${rightF} N`}
            />

            {/* The block (animated via translate) */}
            <g style={{ transform: `translateX(${offsetPx}px)`, transition: "transform 350ms cubic-bezier(.4,0,.2,1)" }}>
              <rect x="265" y="115" width="70" height="55" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="2" />
              {/* mass crosshatch fill */}
              <pattern id="block-hatch" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0,6 L6,0" stroke="#cbd5e1" strokeWidth="0.7" /></pattern>
              <rect x="265" y="115" width="70" height="55" rx="6" fill="url(#block-hatch)" />
              <text x="300" y="148" fontSize="14" fill="#0f172a" fontFamily="monospace" textAnchor="middle" fontWeight="bold">m</text>
              <text x="300" y="162" fontSize="9" fill="#475569" fontFamily="monospace" textAnchor="middle">{MASS} kg</text>

              {/* Net force indicator on block, only when unbalanced */}
              {netF !== 0 && (
                <>
                  <line
                    x1="300"
                    y1="100"
                    x2={300 + (netF > 0 ? 40 : -40)}
                    y2="100"
                    stroke={netF > 0 ? "#0891b2" : "#9f1239"}
                    strokeWidth="3"
                    markerEnd={netF > 0 ? "url(#net-arr-r)" : "url(#net-arr-l)"}
                  />
                  <text
                    x="300"
                    y="92"
                    fontSize="10"
                    fill="#0f172a"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    F_net = {netF > 0 ? "+" : ""}{netF} N
                  </text>
                </>
              )}
            </g>

            <defs>
              <marker id="net-arr-r" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0891b2" /></marker>
              <marker id="net-arr-l" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9f1239" /></marker>
            </defs>
          </svg>
        </div>

        {/* Force controls — left & right teams */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-5">
          <TeamControls
            side="left"
            label={t("Left team (←)", "ក្រុមឆ្វេង (←)")}
            value={leftF}
            onAdd={() => adjust("left", STEP)}
            onSub={() => adjust("left", -STEP)}
            kh={kh}
          />
          <TeamControls
            side="right"
            label={t("Right team (→)", "ក្រុមស្តាំ (→)")}
            value={rightF}
            onAdd={() => adjust("right", STEP)}
            onSub={() => adjust("right", -STEP)}
            kh={kh}
          />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <p className={`text-xs sm:text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}>
            <span className={`font-mono font-bold text-[10px] uppercase tracking-widest text-slate-500 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Try it", "សាកល្បង")}
            </span>
            {t(
              "Make both sides equal — the block doesn't move. Add 5 N to one side — see it accelerate that way (a = F ÷ m).",
              "ធ្វើឱ្យសងខាងស្មើគ្នា — ប្លុកមិនផ្លាស់ទីទេ។ បន្ថែម ៥ N ម្ខាង — អ្នកនឹងឃើញវាមានសំទុះទៅទិសនោះ (a = F ÷ m)។",
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className={`inline-flex items-center justify-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("Reset", "កំណត់ឡើងវិញ")}
          </button>
        </div>
      </div>
    </section>
  );
}

// Sub-component: pull-arrow group on one side of the block
function ForceGroup({
  cx,
  direction,
  magnitudeFraction,
  colorMain,
  labelText,
}: {
  cx: number;
  direction: "left" | "right";
  magnitudeFraction: number; // 0..1
  colorMain: string;
  labelText: string;
}) {
  // Arrow: from cx outward (left or right), length scales with magnitude
  const minLen = 24;
  const maxLen = 110;
  const len = minLen + (maxLen - minLen) * magnitudeFraction;
  const x1 = cx;
  const x2 = direction === "left" ? cx - len : cx + len;
  const arrowId = direction === "left" ? "tug-arr-l" : "tug-arr-r";
  const labelX = direction === "left" ? cx - len / 2 : cx + len / 2;

  return (
    <>
      <defs>
        <marker id={arrowId} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill={colorMain} />
        </marker>
      </defs>
      {/* outline track behind */}
      <line x1={x1} y1="142" x2={x2} y2="142" stroke={colorMain} strokeOpacity="0.18" strokeWidth="14" strokeLinecap="round" />
      {/* arrow */}
      <line x1={x1} y1="142" x2={x2} y2="142" stroke={colorMain} strokeWidth="4" markerEnd={`url(#${arrowId})`} strokeLinecap="round" />
      {/* label */}
      <text x={labelX} y="122" fontSize="12" fill={colorMain} fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        {labelText}
      </text>
    </>
  );
}

function TeamControls({
  side,
  label,
  value,
  onAdd,
  onSub,
  kh,
}: {
  side: "left" | "right";
  label: string;
  value: number;
  onAdd: () => void;
  onSub: () => void;
  kh: boolean;
}) {
  const accent = side === "left" ? "rose" : "cyan";
  const colors =
    accent === "rose"
      ? { ring: "border-rose-300", text: "text-rose-700", btn: "bg-rose-600 hover:bg-rose-700" }
      : { ring: "border-cyan-300", text: "text-cyan-700", btn: "bg-cyan-600 hover:bg-cyan-700" };

  return (
    <div className={`rounded-xl border-2 ${colors.ring} bg-white px-4 py-3`}>
      <div className={`flex items-center justify-between mb-2 ${kh ? "font-khmer" : ""}`}>
        <span className={`text-sm font-bold ${colors.text}`}>{label}</span>
        <span className={`font-mono text-base font-bold ${colors.text}`}>{value} N</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSub}
          aria-label={kh ? "បន្ថយ ៥ N" : "Decrease by 5 N"}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors`}
        >
          <Minus className="w-4 h-4" />
          5 N
        </button>
        <button
          type="button"
          onClick={onAdd}
          aria-label={kh ? "បន្ថែម ៥ N" : "Add 5 N"}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-md text-white text-sm font-bold ${colors.btn} transition-colors shadow-sm`}
        >
          <Plus className="w-4 h-4" />
          5 N
        </button>
      </div>
    </div>
  );
}

function Stat({
  labelEn,
  labelKh,
  value,
  kh,
  accent,
}: {
  labelEn: string;
  labelKh: string;
  value: string;
  kh: boolean;
  accent?: "rose" | "cyan";
}) {
  const valueColor = accent === "rose" ? "text-rose-700" : accent === "cyan" ? "text-cyan-700" : "text-slate-900";
  return (
    <div>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`font-mono text-sm sm:text-base font-bold ${valueColor}`}>{value}</div>
    </div>
  );
}
