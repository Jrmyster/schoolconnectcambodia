import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Compass,
  Sigma,
  Sliders,
  Zap,
  Mountain,
  Recycle,
  Shuffle,
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  Snowflake,
  Sparkles,
  Battery,
  Lightbulb,
  Calculator,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Shared blueprint surface, with warm tone overlay ──────────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#fffbf5",
  backgroundImage:
    "linear-gradient(rgba(217, 119, 6, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(217, 119, 6, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(217, 119, 6, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(217, 119, 6, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(120, 53, 15, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(120, 53, 15, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-amber-300/70" : "border-amber-400/60";
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
export function PhysicsEnergyPage() {
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
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-8 sm:py-10 mb-8 shadow-lg text-white"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%), " +
              "linear-gradient(rgba(251, 191, 36, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(251, 191, 36, 0.10) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            backgroundColor: "#7c2d12",
          }}
        >
          {/* warm grid overlay on top */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(254, 215, 170, 0.18) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(254, 215, 170, 0.18) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-300/15 border-2 border-amber-300/70 text-amber-200 flex items-center justify-center flex-shrink-0">
              <Flame className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-100">M-03</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Module 3: Energy & Thermodynamics", "ម៉ូឌុលទី៣៖ ថាមពល និងទែម៉ូឌីណាមិច")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-amber-50/90 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Energy is never lost — only transformed. Discover how heat, motion and sound flow through everything around you.",
                  "ថាមពលមិនបាត់បង់ឡើយ — គ្រាន់តែបំលែង។ ស្វែងយល់ពីរបៀបដែលកម្តៅ ចលនា និងសំឡេងហូរកាត់អ្វីៗគ្រប់យ៉ាងជុំវិញអ្នក។",
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. Types of Energy ───────────────────────────────── */}
        <SectionTitle
          en="Types of energy"
          kh="ប្រភេទថាមពល"
          numberLabel="01"
          icon={Sigma}
        />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-10">
          <EnergyTypeCard
            kh={kh}
            t={t}
            tagEn="Energy of motion"
            tagKh="ថាមពលនៃចលនា"
            titleEn="Kinetic Energy"
            titleKh="ថាមពលស៊ីនេទិច"
            descEn="The energy of motion. If it's moving, it has kinetic energy — a moto on the road, a flying bird, a rolling football."
            descKh="ថាមពលនៃចលនា។ បើវាមានចលនា វាមានថាមពលស៊ីនេទិច — ម៉ូតូលើផ្លូវ បក្សីហោះ បាល់ទាត់រមៀល។"
            formulaTopEn="½ m v²"
            formulaSubEn="mass × velocity squared"
            formulaSubKh="ម៉ាស់ × ល្បឿនវ៉ិចទ័រស្ការេ"
            icon={Zap}
            visual={<KineticVisual />}
          />
          <EnergyTypeCard
            kh={kh}
            t={t}
            tagEn="Stored energy"
            tagKh="ថាមពលបានរក្សាទុក"
            titleEn="Potential Energy"
            titleKh="ថាមពលប៉ូតង់ស្យែល"
            descEn="Stored energy waiting to be released. A rock at the top of a hill has the 'potential' to fall."
            descKh="ថាមពលដែលបានរក្សាទុក រង់ចាំការបញ្ចេញ។ ដុំថ្មនៅលើកំពូលភ្នំ មាន 'សក្តានុពល' ដើម្បីធ្លាក់ចុះ។"
            formulaTopEn="m g h"
            formulaSubEn="mass × gravity × height"
            formulaSubKh="ម៉ាស់ × ទំនាញ × កម្ពស់"
            icon={Mountain}
            visual={<PotentialVisual />}
          />
        </div>

        {/* ── 2. First Law: Conservation ───────────────────────── */}
        <SectionTitle
          en="The first law — conservation of energy"
          kh="ច្បាប់ទីមួយ — ច្បាប់រក្សាថាមពល"
          numberLabel="02"
          icon={Recycle}
        />
        <ConservationCard kh={kh} t={t} />

        {/* ── 3. Heat Transfer Simulator ───────────────────────── */}
        <SectionTitle
          en="Interactive: heat transfer (conduction)"
          kh="អន្តរកម្ម៖ ការផ្ទេរកម្តៅ (កុនឌុចស្យុង)"
          numberLabel="03"
          icon={Sliders}
        />
        <HeatTransferSimulator />

        {/* ── 4. Energy Converter ──────────────────────────────── */}
        <SectionTitle
          en="Interactive: energy converter"
          kh="អន្តរកម្ម៖ ឧបករណ៍បំប្លែងថាមពល"
          numberLabel="04"
          icon={Calculator}
        />
        <EnergyConverter />

        {/* ── 5. Second Law: Entropy ───────────────────────────── */}
        <SectionTitle
          en="The second law — entropy"
          kh="ច្បាប់ទីពីរ — អង់ត្រូពី"
          numberLabel="05"
          icon={Shuffle}
        />
        <EntropyCard kh={kh} t={t} />

        {/* Next */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/physics/waves"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-700 text-white text-sm font-bold shadow hover:bg-orange-800 transition-colors"
          >
            <span>{t("Next: Waves, Sound & Light", "បន្ទាប់៖ រលក សំឡេង និងពន្លឺ")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section title bar (warm-toned for energy) ─────────────────────────────
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
      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-orange-950 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ── Energy Type Card (Kinetic / Potential) ────────────────────────────────
function EnergyTypeCard({
  kh,
  t,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  descEn,
  descKh,
  formulaTopEn,
  formulaSubEn,
  formulaSubKh,
  icon: Icon,
  visual,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  formulaTopEn: string;
  formulaSubEn: string;
  formulaSubKh: string;
  icon: React.ComponentType<{ className?: string }>;
  visual: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-orange-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? tagKh : tagEn}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold text-orange-950 leading-tight ${kh ? "font-khmer" : ""}`}>
              {kh ? titleKh : titleEn}
            </h3>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50/60 border border-amber-200 p-3 mb-3 flex items-center justify-center min-h-[110px]">
          {visual}
        </div>

        <p className={`text-sm text-foreground/80 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? descKh : descEn}
        </p>

        <div className="mt-auto pt-3 border-t border-dashed border-amber-200">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-700 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Formula", "រូបមន្ត")}
              </div>
              <div className={`text-sm font-semibold text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? formulaSubKh : formulaSubEn}
              </div>
            </div>
            <span className="font-serif italic text-2xl sm:text-3xl font-bold text-red-700 leading-none">
              {formulaTopEn}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function KineticVisual() {
  // Three trailing motion blobs leading into a moving ball
  return (
    <svg viewBox="0 0 220 90" className="w-full h-20" aria-hidden="true">
      <line x1="10" y1="60" x2="210" y2="60" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="6" fill="#fb923c" opacity="0.25" />
      <circle cx="80" cy="50" r="7" fill="#f97316" opacity="0.45" />
      <circle cx="120" cy="50" r="9" fill="#ea580c" opacity="0.7" />
      <circle cx="170" cy="50" r="11" fill="#dc2626" />
      <line x1="180" y1="40" x2="205" y2="40" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#kin-arr)" />
      <text x="170" y="80" fontSize="9" fill="#9a3412" fontFamily="monospace" textAnchor="middle">v →</text>
      <defs>
        <marker id="kin-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}

function PotentialVisual() {
  // Hill profile with a rock on top, height arrow on right
  return (
    <svg viewBox="0 0 220 90" className="w-full h-20" aria-hidden="true">
      <line x1="10" y1="78" x2="210" y2="78" stroke="#475569" strokeWidth="1.5" />
      <pattern id="pot-ground" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0,6 L6,0" stroke="#94a3b8" strokeWidth="0.6" /></pattern>
      <rect x="10" y="78" width="200" height="10" fill="url(#pot-ground)" />
      {/* hill */}
      <path d="M 10 78 Q 80 78, 120 28 Q 140 12, 160 28 Q 200 78, 210 78 Z" fill="#fde68a" stroke="#a16207" strokeWidth="1.5" />
      {/* rock on top */}
      <rect x="135" y="14" width="14" height="11" rx="2" fill="#78350f" />
      {/* height arrow */}
      <line x1="195" y1="22" x2="195" y2="76" stroke="#dc2626" strokeWidth="2" markerEnd="url(#pot-arr-d)" markerStart="url(#pot-arr-u)" />
      <text x="200" y="50" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="bold">h</text>
      <defs>
        <marker id="pot-arr-d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" /></marker>
        <marker id="pot-arr-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}

// ── Conservation card ─────────────────────────────────────────────────────
function ConservationCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section className="relative rounded-2xl border-2 border-orange-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[1fr_260px] gap-5 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Law of conservation", "ច្បាប់រក្សាថាមពល")}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-orange-950 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("Energy changes form — never disappears", "ថាមពលផ្លាស់ប្តូរទម្រង់ — មិនបាត់ឡើយ")}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ថាមពលមិនអាចបង្កើត ឬបំផ្លាញបានទេ វាគ្រាន់តែផ្លាស់ប្តូរទម្រង់ប៉ុណ្ណោះ។ នៅពេលអ្នកទះដៃ ថាមពលស៊ីនេទិចប្រែទៅជាសំឡេង និងកម្ដៅ។"
              : "Energy cannot be created or destroyed; it only changes form. When you clap your hands, kinetic energy turns into sound and heat."}
          </p>

          {/* transformation chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Chip>{t("Kinetic (clap)", "ស៊ីនេទិច (ទះដៃ)")}</Chip>
            <ArrowRight className="w-4 h-4 text-orange-700" />
            <Chip tone="amber">{t("Sound", "សំឡេង")}</Chip>
            <span className="text-orange-700 font-mono">+</span>
            <Chip tone="red">{t("Heat", "កម្ដៅ")}</Chip>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-amber-200">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Other examples", "ឧទាហរណ៍ផ្សេងទៀត")}
            </div>
            <ul className={`text-sm text-slate-700 space-y-1 list-disc list-inside ${kh ? "font-khmer leading-loose" : ""}`}>
              <li>{t("A solar panel: light energy → electrical energy.", "ផ្ទាំងស្រូបពន្លឺថ្ងៃ៖ ថាមពលពន្លឺ → ថាមពលអគ្គិសនី។")}</li>
              <li>{t("A water turbine: potential energy → kinetic → electrical.", "ទួរប៊ីនទឹក៖ ថាមពលប៉ូតង់ស្យែល → ស៊ីនេទិច → អគ្គិសនី។")}</li>
              <li>{t("Cooking rice: chemical energy in wood → heat → cooked rice.", "ដាំបាយ៖ ថាមពលគីមីក្នុងឧស → កម្ដៅ → បាយដែលឆ្អិន។")}</li>
            </ul>
          </div>
        </div>

        {/* Clap visual */}
        <div className="rounded-xl bg-amber-50/60 border border-amber-200 p-3 flex items-center justify-center min-h-[180px]">
          <ClapVisual />
        </div>
      </div>
    </section>
  );
}

function ClapVisual() {
  return (
    <svg viewBox="0 0 220 180" className="w-full h-44" aria-hidden="true">
      {/* two hands meeting — stylised */}
      <ellipse cx="80" cy="100" rx="28" ry="18" fill="#fdba74" stroke="#9a3412" strokeWidth="1.5" transform="rotate(-15 80 100)" />
      <ellipse cx="140" cy="100" rx="28" ry="18" fill="#fdba74" stroke="#9a3412" strokeWidth="1.5" transform="rotate(15 140 100)" />
      {/* Sparks */}
      <g stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
        <line x1="110" y1="80" x2="110" y2="62" />
        <line x1="100" y1="84" x2="92" y2="68" />
        <line x1="120" y1="84" x2="128" y2="68" />
        <line x1="110" y1="120" x2="110" y2="138" />
        <line x1="100" y1="116" x2="92" y2="132" />
        <line x1="120" y1="116" x2="128" y2="132" />
      </g>
      <circle cx="110" cy="100" r="6" fill="#fde047" />
      {/* Sound waves */}
      <g stroke="#0891b2" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M 175 90 Q 185 100, 175 110" />
        <path d="M 185 80 Q 200 100, 185 120" />
        <path d="M 195 70 Q 215 100, 195 130" />
      </g>
      {/* Heat waves */}
      <g stroke="#ea580c" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M 45 90 Q 35 100, 45 110" />
        <path d="M 35 80 Q 20 100, 35 120" />
        <path d="M 25 70 Q 5 100, 25 130" />
      </g>
      <text x="110" y="32" fontSize="10" fill="#9a3412" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CLAP!</text>
      <text x="200" y="160" fontSize="9" fill="#0e7490" fontFamily="monospace" textAnchor="middle">SOUND</text>
      <text x="20" y="160" fontSize="9" fill="#9a3412" fontFamily="monospace" textAnchor="middle">HEAT</text>
    </svg>
  );
}

function Chip({ children, tone = "orange" }: { children: React.ReactNode; tone?: "orange" | "amber" | "red" }) {
  const colors =
    tone === "amber"
      ? "border-amber-300 text-amber-800 bg-amber-50"
      : tone === "red"
      ? "border-red-300 text-red-800 bg-red-50"
      : "border-orange-300 text-orange-800 bg-orange-50";
  const { language } = useLanguageStore();
  return (
    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded border ${colors} ${language === "kh" ? "font-khmer" : ""}`}>
      {children}
    </span>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Heat Transfer Simulator (animated SVG gradient)
// ────────────────────────────────────────────────────────────────────────────
function HeatTransferSimulator() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // progress: 0 (cold blue) → 1 (fully heated red along the bar)
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
      return;
    }
    const tick = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setProgress((p) => {
        const next = Math.min(1, p + dt * 0.18); // ~5.5s to fully heat
        if (next >= 1) {
          setRunning(false);
          return 1;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setProgress(0);
  };

  const start = () => {
    if (progress >= 1) setProgress(0);
    setRunning(true);
  };

  // Status
  let statusEn = "Bar is cold";
  let statusKh = "ដែកនៅត្រជាក់";
  let StatusIcon: React.ComponentType<{ className?: string }> = Snowflake;
  let statusBg = "bg-sky-100 text-sky-800";
  if (progress > 0 && progress < 1) {
    statusEn = "Heat is travelling along the bar";
    statusKh = "កម្តៅកំពុងធ្វើដំណើរតាមដែក";
    StatusIcon = Sparkles;
    statusBg = "bg-amber-100 text-amber-800";
  } else if (progress >= 1) {
    statusEn = "Bar is fully hot";
    statusKh = "ដែកក្តៅពេញលេញ";
    StatusIcon = Thermometer;
    statusBg = "bg-red-100 text-red-800";
  }

  // Compute approximate temperature reading at the cool end (just for display)
  const coolEndTempC = Math.round(28 + progress * 95); // 28°C → 123°C

  // Bar geometry
  const barX = 70;
  const barY = 95;
  const barW = 460;
  const barH = 50;

  // Gradient stops driven by progress
  // The "hot front" ends at: barX + progress*barW
  const hotEnd = progress; // 0..1
  const transition = Math.min(1, hotEnd + 0.18); // trailing edge of warm

  return (
    <section className="relative rounded-2xl border-2 border-orange-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-4 sm:p-6">
        {/* Status / readouts */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusBg} ${kh ? "font-khmer" : ""}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {kh ? statusKh : statusEn}
          </span>
          <Stat labelEn="Heat source" labelKh="ប្រភពកម្តៅ" value={running || progress > 0 ? "ON" : "OFF"} kh={kh} />
          <Stat labelEn="Hot end" labelKh="ចុងក្តៅ" value="≈ 600 °C" kh={kh} accent="red" />
          <Stat labelEn="Cool end" labelKh="ចុងត្រជាក់" value={`≈ ${coolEndTempC} °C`} kh={kh} accent={progress > 0.5 ? "red" : "blue"} />
          <Stat labelEn="Progress" labelKh="ការវិវត្ត" value={`${Math.round(progress * 100)} %`} kh={kh} />
        </div>

        {/* Conduction bar SVG */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 overflow-hidden">
          <svg viewBox="0 0 600 200" className="w-full h-auto" aria-label={kh ? "ការផ្សាយកម្តៅ" : "Heat conduction visualisation"} role="img">
            <defs>
              <linearGradient id="bar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset={`${(hotEnd * 100).toFixed(2)}%`} stopColor={progress < 0.05 ? "#3b82f6" : "#f97316"} />
                <stop offset={`${(transition * 100).toFixed(2)}%`} stopColor="#fde047" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="bar-shine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
              </linearGradient>
            </defs>

            {/* Stand under bar */}
            <line x1={barX - 10} y1={barY + barH + 6} x2={barX + barW + 10} y2={barY + barH + 6} stroke="#475569" strokeWidth="2" />

            {/* Metal bar */}
            <rect
              x={barX}
              y={barY}
              width={barW}
              height={barH}
              rx={8}
              fill="url(#bar-grad)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <rect x={barX} y={barY} width={barW} height={barH} rx={8} fill="url(#bar-shine)" />

            {/* Atom dots inside bar — illustrating molecular vibration */}
            {Array.from({ length: 24 }).map((_, i) => {
              const ax = barX + 12 + (i / 23) * (barW - 24);
              const localProgress = Math.max(0, Math.min(1, (progress - i / 23 + 0.15) * 2));
              const r = 2.2 + localProgress * 1.6;
              const opacity = 0.35 + localProgress * 0.5;
              return (
                <circle
                  key={i}
                  cx={ax}
                  cy={barY + barH / 2 + (i % 2 === 0 ? -10 : 10)}
                  r={r}
                  fill="#ffffff"
                  opacity={opacity}
                />
              );
            })}

            {/* Flame at left end */}
            <Flame_Svg cx={barX - 30} cy={barY + barH / 2} active={running || progress > 0} />

            {/* Temperature labels */}
            <text x={barX + 10} y={barY - 10} fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              {kh ? "ក្តៅ" : "HOT"}
            </text>
            <text x={barX + barW - 10} y={barY - 10} fontSize="11" fill={progress > 0.6 ? "#dc2626" : "#1d4ed8"} fontFamily="monospace" fontWeight="bold" textAnchor="end">
              {kh ? "ត្រជាក់" : "COOL"}
            </text>

            {/* Position scale */}
            <line x1={barX} y1={barY + barH + 18} x2={barX + barW} y2={barY + barH + 18} stroke="#94a3b8" strokeWidth="1" />
            {[0, 0.25, 0.5, 0.75, 1].map((p) => (
              <g key={p}>
                <line x1={barX + p * barW} y1={barY + barH + 14} x2={barX + p * barW} y2={barY + barH + 22} stroke="#94a3b8" strokeWidth="1" />
                <text x={barX + p * barW} y={barY + barH + 34} fontSize="10" fill="#64748b" fontFamily="monospace" textAnchor="middle">
                  {Math.round(p * 30)} cm
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            type="button"
            onClick={running ? () => setRunning(false) : start}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow ${
              running ? "bg-amber-600 hover:bg-amber-700" : "bg-orange-600 hover:bg-orange-700"
            } transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {running ? t("Pause heating", "ផ្អាកការឱ្យកម្តៅ") : progress >= 1 ? t("Heat again", "ឱ្យកម្តៅម្ដងទៀត") : t("Start heating", "ចាប់ផ្ដើមឱ្យកម្តៅ")}
          </button>
          <button
            type="button"
            onClick={reset}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-orange-300 bg-white text-sm font-bold text-orange-800 hover:bg-orange-50 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <RotateCcw className="w-4 h-4" />
            {t("Reset (cool down)", "កំណត់ឡើងវិញ (ត្រជាក់)")}
          </button>
          <p className={`text-xs sm:text-sm text-slate-600 flex-1 min-w-[260px] ${kh ? "font-khmer leading-loose" : ""}`}>
            <span className={`font-mono font-bold text-[10px] uppercase tracking-widest text-slate-500 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Conduction", "កុនឌុចស្យុង")}
            </span>
            {t(
              "Heat travels through the metal as fast-moving atoms bump into their slower neighbours, passing energy along the bar.",
              "កម្តៅធ្វើដំណើរតាមដែក នៅពេលដែលអាតូមដែលមានចលនាលឿន ប៉ះអាតូមជិតខាងដែលយឺតជាង ហើយផ្ទេរថាមពលតាមដងដែក។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function Flame_Svg({ cx, cy, active }: { cx: number; cy: number; active: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy})`} opacity={active ? 1 : 0.45}>
      {/* outer flame */}
      <path
        d="M 0 -28 C -14 -10, -16 4, -8 14 C -2 22, 4 22, 10 14 C 18 4, 14 -8, 0 -28 Z"
        fill="#f97316"
      >
        {active && (
          <animate
            attributeName="d"
            dur="0.6s"
            repeatCount="indefinite"
            values="
              M 0 -28 C -14 -10, -16 4, -8 14 C -2 22, 4 22, 10 14 C 18 4, 14 -8, 0 -28 Z;
              M 0 -32 C -12 -12, -18 2, -10 16 C -2 24, 4 24, 12 16 C 18 2, 12 -10, 0 -32 Z;
              M 0 -28 C -14 -10, -16 4, -8 14 C -2 22, 4 22, 10 14 C 18 4, 14 -8, 0 -28 Z
            "
          />
        )}
      </path>
      {/* inner flame */}
      <path d="M 0 -18 C -7 -6, -8 4, -3 10 C 1 14, 4 14, 7 10 C 12 4, 8 -8, 0 -18 Z" fill="#fde047" />
      {/* hottest core */}
      <ellipse cx="0" cy="6" rx="3" ry="5" fill="#fff7ed" />
    </g>
  );
}

// ── Entropy card ──────────────────────────────────────────────────────────
function EntropyCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section className="relative rounded-2xl border-2 border-orange-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[1fr_280px] gap-5 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Shuffle className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Entropy", "អង់ត្រូពី")}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-orange-950 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("Heat goes from hot to cold — always", "កម្ដៅធ្វើដំណើរពីក្តៅទៅត្រជាក់ — ជានិច្ច")}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "កម្ដៅតែងតែផ្លាស់ទីពីកន្លែងក្តៅ ទៅកន្លែងត្រជាក់។ ប្រព័ន្ធនានាតែងតែប្រែជាគ្មានសណ្តាប់ធ្នាប់ លើកលែងតែមានការបន្ថែមថាមពល។"
              : "Heat always moves from hot to cold. Systems naturally move toward disorder unless energy is added."}
          </p>

          <div className="rounded-xl bg-amber-50/60 border border-amber-200 p-4">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-700 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Why this matters", "ហេតុអ្វីបានជានេះសំខាន់")}
            </div>
            <ul className={`text-sm text-slate-700 space-y-1.5 list-disc list-inside ${kh ? "font-khmer leading-loose" : ""}`}>
              <li>{t("A hot cup of coffee always cools down to room temperature — never the other way around.", "ពែងកាហ្វេក្តៅតែងតែត្រជាក់ចុះមកសីតុណ្ហភាពបន្ទប់ — មិនធ្លាប់ផ្ទុយវិញឡើយ។")}</li>
              <li>{t("A tidy classroom becomes messy on its own; cleaning it up requires energy.", "ថ្នាក់រៀនដែលរៀបចំស្អាត ប្រែជាគ្មានសណ្តាប់ធ្នាប់ដោយខ្លួនឯង; ការសម្អាតវាត្រូវការថាមពល។")}</li>
              <li>{t("This 'one-way street' is why a perfect engine is impossible — some energy always escapes as waste heat.", "'ផ្លូវមួយទិស' នេះហើយជាមូលហេតុដែលម៉ាស៊ីនល្អឥតខ្ចោះមិនអាចទៅរួច — ថាមពលខ្លះតែងតែគេចចេញជាកម្តៅខ្ជះខ្ជាយ។")}</li>
            </ul>
          </div>
        </div>

        {/* Order vs disorder visual */}
        <div className="rounded-xl bg-amber-50/60 border border-amber-200 p-3 flex items-center justify-center min-h-[180px]">
          <EntropyVisual />
        </div>
      </div>
    </section>
  );
}

function EntropyVisual() {
  // Left: ordered grid of dots (low entropy). Right: scattered dots (high entropy).
  const orderedDots: { x: number; y: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      orderedDots.push({ x: 22 + c * 16, y: 30 + r * 16 });
    }
  }
  const scattered: { x: number; y: number }[] = [
    { x: 145, y: 30 }, { x: 178, y: 38 }, { x: 162, y: 60 }, { x: 198, y: 58 },
    { x: 152, y: 78 }, { x: 188, y: 90 }, { x: 142, y: 96 }, { x: 200, y: 30 },
    { x: 175, y: 70 }, { x: 158, y: 50 }, { x: 195, y: 75 }, { x: 168, y: 92 },
    { x: 148, y: 50 }, { x: 205, y: 95 }, { x: 175, y: 100 }, { x: 192, y: 50 },
  ];
  return (
    <svg viewBox="0 0 240 180" className="w-full h-44" aria-hidden="true">
      {/* left frame */}
      <rect x="14" y="22" width="80" height="80" rx="6" fill="#ffffff" stroke="#a16207" strokeWidth="1.5" />
      {orderedDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill="#0891b2" />
      ))}
      <text x="54" y="118" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        LOW ENTROPY
      </text>
      <text x="54" y="132" fontSize="9" fill="#475569" fontFamily="monospace" textAnchor="middle">
        ORDERED
      </text>

      {/* arrow */}
      <line x1="100" y1="62" x2="135" y2="62" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#ent-arr)" />
      <text x="117" y="56" fontSize="9" fill="#dc2626" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TIME</text>
      <defs>
        <marker id="ent-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626" /></marker>
      </defs>

      {/* right frame */}
      <rect x="138" y="22" width="80" height="80" rx="6" fill="#ffffff" stroke="#a16207" strokeWidth="1.5" />
      {scattered.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill="#dc2626" />
      ))}
      <text x="178" y="118" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        HIGH ENTROPY
      </text>
      <text x="178" y="132" fontSize="9" fill="#475569" fontFamily="monospace" textAnchor="middle">
        DISORDERED
      </text>

      {/* tagline */}
      <text x="120" y="160" fontSize="10" fill="#9a3412" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        HOT → COLD
      </text>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Energy Converter (kcal ↔ Joules) + LED context
// ────────────────────────────────────────────────────────────────────────────
function EnergyConverter() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const KCAL_TO_J = 4184;
  const LED_W = 10;

  const [kcalStr, setKcalStr] = useState("100");
  const [joulesStr, setJoulesStr] = useState((100 * KCAL_TO_J).toString());

  const handleKcal = (v: string) => {
    setKcalStr(v);
    if (v.trim() === "") {
      setJoulesStr("");
      return;
    }
    const n = parseFloat(v);
    if (!isNaN(n) && isFinite(n)) {
      setJoulesStr(Math.round(n * KCAL_TO_J).toString());
    }
  };

  const handleJoules = (v: string) => {
    setJoulesStr(v);
    if (v.trim() === "") {
      setKcalStr("");
      return;
    }
    const n = parseFloat(v);
    if (!isNaN(n) && isFinite(n)) {
      // up to 4 decimals; trim trailing zeros
      const k = n / KCAL_TO_J;
      const rounded = k >= 100 ? k.toFixed(2) : k >= 1 ? k.toFixed(3) : k.toFixed(4);
      setKcalStr(parseFloat(rounded).toString());
    }
  };

  const reset = () => {
    setKcalStr("100");
    setJoulesStr((100 * KCAL_TO_J).toString());
  };

  // Derived: minutes the energy could power a 10W LED
  const joulesNum = Math.max(0, parseFloat(joulesStr) || 0);
  const totalSeconds = joulesNum / LED_W; // J / W = seconds
  const totalMinutes = totalSeconds / 60;
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.round(totalSeconds % 60);

  // Pretty headline number
  const headlineMinutes =
    totalMinutes >= 100 ? Math.round(totalMinutes).toLocaleString() : totalMinutes.toFixed(1);

  // Friendly time string
  const timeStr = (() => {
    if (totalSeconds < 60) return `${secs} ${kh ? "វិនាទី" : "sec"}`;
    if (hours >= 1) {
      return `${hours} ${kh ? "ម៉ោង" : "hr"} ${mins} ${kh ? "នាទី" : "min"}`;
    }
    return `${mins} ${kh ? "នាទី" : "min"} ${secs} ${kh ? "វិនាទី" : "sec"}`;
  })();

  return (
    <section className="relative rounded-2xl border-2 border-orange-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-4 sm:p-6">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Battery className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Calories ↔ Joules", "កាឡូរី ↔ ហ្សូល")}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold text-orange-950 leading-tight ${kh ? "font-khmer" : ""}`}>
              {t("Convert food energy into physics energy", "បំប្លែងថាមពលអាហារទៅជាថាមពលរូបវិទ្យា")}
            </h3>
          </div>
        </div>

        {/* Conversion factor pill */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold mb-4 ${kh ? "font-khmer" : ""}`}>
          <span className="font-mono font-bold">1 kcal = 4,184 J</span>
          <span className="opacity-60">·</span>
          <span>{t("Type in either box", "វាយក្នុងប្រអប់ណាមួយ")}</span>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-end">
          {/* Calories */}
          <div className="rounded-xl border-2 border-orange-300 bg-white px-4 py-3">
            <label htmlFor="kcal-input" className={`block text-[11px] font-mono uppercase tracking-widest text-orange-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Calories (food energy)", "កាឡូរី (ថាមពលអាហារ)")}
            </label>
            <div className="flex items-baseline gap-2">
              <input
                id="kcal-input"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={kcalStr}
                onChange={(e) => handleKcal(e.target.value)}
                placeholder="0"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:ring-0 p-0 font-mono text-2xl sm:text-3xl font-bold text-orange-900"
                aria-label={kh ? "បញ្ចូលកាឡូរី" : "Enter calories"}
              />
              <span className={`text-sm font-bold text-orange-700 ${kh ? "font-khmer" : ""}`}>
                {t("kcal", "កាឡូរី")}
              </span>
            </div>
          </div>

          {/* swap symbol */}
          <div className="flex sm:flex-col items-center justify-center gap-1 text-orange-700">
            <span className="font-mono text-xl sm:text-2xl font-bold leading-none select-none" aria-hidden="true">⇌</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("× 4,184", "× 4,184")}
            </span>
          </div>

          {/* Joules */}
          <div className="rounded-xl border-2 border-red-300 bg-white px-4 py-3">
            <label htmlFor="joules-input" className={`block text-[11px] font-mono uppercase tracking-widest text-red-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Joules (physics energy)", "ហ្សូល (ថាមពលរូបវិទ្យា)")}
            </label>
            <div className="flex items-baseline gap-2">
              <input
                id="joules-input"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={joulesStr}
                onChange={(e) => handleJoules(e.target.value)}
                placeholder="0"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:ring-0 p-0 font-mono text-2xl sm:text-3xl font-bold text-red-900"
                aria-label={kh ? "បញ្ចូលហ្សូល" : "Enter joules"}
              />
              <span className={`text-sm font-bold text-red-700 ${kh ? "font-khmer" : ""}`}>
                {t("J", "J")}
              </span>
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Quick examples", "ឧទាហរណ៍រហ័ស")}
          </span>
          <Preset onClick={() => handleKcal("1")} kh={kh}>{t("1 kcal · sip of soda", "១ កាឡូរី · ស្រាសូដាមួយប៉ប់")}</Preset>
          <Preset onClick={() => handleKcal("100")} kh={kh}>{t("100 kcal · banana", "១០០ កាឡូរី · ចេក")}</Preset>
          <Preset onClick={() => handleKcal("250")} kh={kh}>{t("250 kcal · plate of rice", "២៥០ កាឡូរី · បាយមួយចាន")}</Preset>
          <Preset onClick={() => handleKcal("2000")} kh={kh}>{t("2,000 kcal · daily diet", "២,០០០ កាឡូរី · អាហារប្រចាំថ្ងៃ")}</Preset>
          <button
            type="button"
            onClick={reset}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-orange-300 bg-white text-[11px] font-bold text-orange-800 hover:bg-orange-50 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <RotateCcw className="w-3 h-3" />
            {t("Reset", "កំណត់ឡើងវិញ")}
          </button>
        </div>

        {/* "What does this energy do?" */}
        <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Real-world impact", "ផលប៉ះពាល់ពិតប្រាកដ")}
              </div>
              <h4 className={`text-base sm:text-lg font-bold text-orange-950 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("What does this energy do?", "តើថាមពលនេះធ្វើអ្វីខ្លះ?")}
              </h4>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? (
              <>
                ថាមពលនេះអាចបំភ្លឺអំពូល <span className="font-bold text-red-700">LED ១០ វ៉ាត់</span> បាន​អស់រយៈពេល{" "}
                <span className="font-mono font-bold text-orange-900 text-lg">{headlineMinutes}</span>{" "}
                <span className="font-bold">នាទី</span>។
              </>
            ) : (
              <>
                This much energy could power a <span className="font-bold text-red-700">10 W LED lightbulb</span> for{" "}
                <span className="font-mono font-bold text-orange-900 text-lg">{headlineMinutes}</span>{" "}
                <span className="font-bold">minutes</span>.
              </>
            )}
          </p>

          {/* readout grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <Readout
              labelEn="Energy"
              labelKh="ថាមពល"
              value={`${joulesNum.toLocaleString()} J`}
              kh={kh}
            />
            <Readout
              labelEn="LED power"
              labelKh="អំពូល LED"
              value={`${LED_W} W`}
              kh={kh}
            />
            <Readout
              labelEn="Run time"
              labelKh="រយៈពេលដំណើរការ"
              value={timeStr}
              kh={kh}
              accent
            />
            <Readout
              labelEn="Formula"
              labelKh="រូបមន្ត"
              value="(J ÷ 10) ÷ 60"
              kh={kh}
            />
          </div>

          <p className={`text-xs text-slate-600 mt-3 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <span className={`font-mono font-bold uppercase tracking-widest text-slate-500 mr-1.5 text-[10px] ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Why", "ហេតុអ្វី")}
            </span>
            {t(
              "Power (Watts) = Joules per second. So time in seconds = Joules ÷ Watts. Divide by 60 to get minutes.",
              "កម្លាំង (វ៉ាត់) = ហ្សូលក្នុងមួយវិនាទី។ ដូច្នេះ ពេលវេលាជាវិនាទី = ហ្សូល ÷ វ៉ាត់។ ចែកនឹង ៦០ ដើម្បីបានជានាទី។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function Preset({ children, onClick, kh }: { children: React.ReactNode; onClick: () => void; kh: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-1 rounded-full border border-orange-300 bg-white text-[11px] sm:text-xs font-semibold text-orange-800 hover:bg-orange-50 transition-colors ${kh ? "font-khmer" : ""}`}
    >
      {children}
    </button>
  );
}

function Readout({
  labelEn,
  labelKh,
  value,
  kh,
  accent = false,
}: {
  labelEn: string;
  labelKh: string;
  value: string;
  kh: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-lg px-3 py-2 ${accent ? "bg-orange-600 text-white" : "bg-white border border-orange-200"}`}>
      <div
        className={`text-[10px] font-mono uppercase tracking-widest ${
          accent ? "text-orange-100" : "text-orange-700"
        } ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      >
        {kh ? labelKh : labelEn}
      </div>
      <div
        className={`font-mono text-sm sm:text-base font-bold leading-tight ${
          accent ? "text-white" : "text-orange-950"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

// ── Stat (warm-toned) ─────────────────────────────────────────────────────
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
  accent?: "red" | "blue";
}) {
  const valueColor = accent === "red" ? "text-red-700" : accent === "blue" ? "text-blue-700" : "text-orange-950";
  return (
    <div>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`font-mono text-sm sm:text-base font-bold ${valueColor}`}>{value}</div>
    </div>
  );
}
