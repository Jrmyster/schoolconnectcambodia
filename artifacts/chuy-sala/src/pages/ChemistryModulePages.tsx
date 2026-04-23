import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  FlaskConical,
  Microscope,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Beaker,
  Calculator,
  Puzzle,
  ChefHat,
  Droplets,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Shared layout helpers ──────────────────────────────────────────────────────

function ModuleShell({
  number,
  titleEn,
  titleKh,
  introEn,
  introKh,
  icon: Icon,
  accent,
  children,
}: {
  number: string;
  titleEn: string;
  titleKh: string;
  introEn: string;
  introKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: { iconBg: string; title: string; chip: string; bgFrom: string; bgTo: string };
  children: React.ReactNode;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className={`min-h-screen bg-gradient-to-b ${accent.bgFrom} ${accent.bgTo} py-8 sm:py-10 px-4 sm:px-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl ${accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow`}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase ${accent.title} opacity-70 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(`Module ${number}`, `មុខវិជ្ជា ${number}`)}
              </span>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold ${accent.title} ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {kh ? titleKh : titleEn}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {kh ? introKh : introEn}
          </p>
        </header>

        {/* Body */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}

function Section({
  titleEn,
  titleKh,
  children,
}: {
  titleEn: string;
  titleKh: string;
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <section className="rounded-2xl bg-white border border-border shadow-sm p-5 sm:p-6">
      <h2
        className={`text-xl sm:text-2xl font-bold text-foreground mb-3 ${
          kh ? "font-khmer leading-snug" : ""
        }`}
      >
        {kh ? titleKh : titleEn}
      </h2>
      <div
        className={`text-sm sm:text-base text-foreground/85 leading-relaxed space-y-3 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function Term({
  en,
  kh,
}: {
  en: string;
  kh: string;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return isKh ? (
    <span className="font-khmer font-semibold">
      {kh}{" "}
      <span className="text-muted-foreground font-normal text-[0.85em]">({en})</span>
    </span>
  ) : (
    <span className="font-semibold">
      {en}{" "}
      <span className="text-muted-foreground font-normal font-khmer text-[0.85em]">({kh})</span>
    </span>
  );
}

// Bilingual paragraph helper
function P({ en, kh }: { en: React.ReactNode; kh: React.ReactNode }) {
  const { language } = useLanguageStore();
  return <p>{language === "kh" ? kh : en}</p>;
}

// Bilingual list helper (rendered as bullet list)
function BList({
  itemsEn,
  itemsKh,
}: {
  itemsEn: React.ReactNode[];
  itemsKh: React.ReactNode[];
}) {
  const { language } = useLanguageStore();
  const items = language === "kh" ? itemsKh : itemsEn;
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 1 — Building Blocks
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryBuildingBlocksPage() {
  return (
    <ModuleShell
      number="01"
      titleEn="The Atom"
      titleKh="អាតូម"
      introEn="The building blocks of the universe."
      introKh="ប្លុកសំណង់នៃសកលលោក។"
      icon={Atom}
      accent={{
        iconBg: "bg-sky-600",
        title: "text-sky-900",
        chip: "bg-sky-100 text-sky-800",
        bgFrom: "from-sky-50/40",
        bgTo: "to-background",
      }}
    >
      {/* ── Bohr-model diagram of Lithium ──────────────────────── */}
      <LithiumBohrDiagram />

      {/* ── The four building-block cards ──────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        <BuildingBlockCard
          accent="text-amber-900 bg-amber-50 border-amber-200"
          symbolBg="bg-amber-500"
          symbol="●"
          titleEn="The Nucleus"
          titleKh="ស្នូលអាតូម"
          chargeLabelEn=""
          chargeLabelKh=""
          bodyEn="The heavy, dense center of the atom. It holds almost all of the atom's weight but takes up almost no space!"
          bodyKh="ចំណុចកណ្តាលដ៏ធ្ងន់ និងហាប់ណែននៃអាតូម។ វាផ្ទុកស្ទើរតែទម្ងន់ទាំងអស់របស់អាតូម ប៉ុន្តែមិនសូវស៊ីទំហំធំនោះទេ!"
        />
        <BuildingBlockCard
          accent="text-red-900 bg-red-50 border-red-200"
          symbolBg="bg-red-600"
          symbol="+"
          titleEn="Protons"
          titleKh="ប្រូតុង"
          chargeLabelEn="Positive Charge"
          chargeLabelKh="បន្ទុកវិជ្ជមាន"
          bodyEn="These determine the atom's identity. If you change the number of protons, you change the element."
          bodyKh="ពួកវាកំណត់អត្តសញ្ញាណរបស់អាតូម។ ប្រសិនបើអ្នកផ្លាស់ប្តូរចំនួនប្រូតុង អ្នកផ្លាស់ប្តូរប្រភេទធាតុគីមី។"
        />
        <BuildingBlockCard
          accent="text-slate-800 bg-slate-50 border-slate-200"
          symbolBg="bg-slate-500"
          symbol="0"
          titleEn="Neutrons"
          titleKh="ណឺត្រុង"
          chargeLabelEn="No Charge"
          chargeLabelKh="គ្មានបន្ទុក"
          bodyEn={`The "glue" of the nucleus. They have no charge, but they add weight and keep the protons from pushing each other apart.`}
          bodyKh={`"កាវ" នៃស្នូលអាតូម។ ពួកវាគ្មានបន្ទុកអគ្គិសនីទេ ប៉ុន្តែពួកវាបន្ថែមទម្ងន់ និងរក្សាប្រូតុងមិនឱ្យរុញច្រានគ្នា។`}
        />
        <BuildingBlockCard
          accent="text-blue-900 bg-blue-50 border-blue-200"
          symbolBg="bg-blue-600"
          symbol="−"
          titleEn="Electrons"
          titleKh="អេឡិចត្រុង"
          chargeLabelEn="Negative Charge"
          chargeLabelKh="បន្ទុកអវិជ្ជមាន"
          bodyEn="Tiny, fast-moving particles that orbit the nucleus. They are responsible for electricity and chemical bonding!"
          bodyKh="ភាគល្អិតតូចៗ និងផ្លាស់ទីយ៉ាងលឿនដែលគោចរជុំវិញស្នូល។ ពួកវាទទួលខុសត្រូវចំពោះអគ្គិសនី និងចំណងគីមី!"
        />
      </div>

      <NextModuleLink to="/chemistry/reactions-math" labelEn="Next: Reactions & Math" labelKh="បន្ទាប់៖ ប្រតិកម្ម និងគណិតវិទ្យា" />
    </ModuleShell>
  );
}

// ── Lithium Bohr-model diagram (pure CSS) ─────────────────────────────────
function LithiumBohrDiagram() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <figure
      className="relative overflow-hidden rounded-3xl border border-slate-700 shadow-lg"
      style={{
        background:
          "radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 55%, #020617 100%)",
      }}
      aria-label={
        kh
          ? "ដ្យាក្រាមអាតូមលីច្ចូម តាមគំរូរបស់បូរ៍ — ស្នូល ៣ ប្រូតុង (ក្រហម) ៤ ណឺត្រុង (ប្រផេះ) ហើយ ៣ អេឡិចត្រុង (ខៀវ) គោចរលើគន្លងពីរ"
          : "Bohr-model diagram of a Lithium atom — nucleus with 3 protons (red) and 4 neutrons (gray), with 3 electrons (blue) on two orbital rings"
      }
    >
      {/* Local keyframes — scoped via a class name unique to this component */}
      <style>{`
        @keyframes csa-orbit-spin { to { transform: rotate(360deg); } }
        .csa-orbit-anim { animation: csa-orbit-spin 6s linear infinite; transform-origin: 50% 50%; }
        @media (prefers-reduced-motion: reduce) {
          .csa-orbit-anim { animation: none; }
        }
      `}</style>

      {/* Decorative starfield */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
        {[...Array(40)].map((_, i) => {
          const top = (i * 37) % 100;
          const left = (i * 53) % 100;
          const size = (i % 3) + 1;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.4 + ((i % 5) * 0.1),
              }}
            />
          );
        })}
      </div>

      {/* Diagram stage */}
      <div className="relative h-[360px] sm:h-[420px] flex items-center justify-center">
        {/* Outer orbit ring */}
        <div
          className="absolute rounded-full border border-blue-300/40"
          style={{ width: 320, height: 320 }}
          aria-hidden="true"
        />
        {/* Inner orbit ring */}
        <div
          className="absolute rounded-full border border-blue-300/50"
          style={{ width: 180, height: 180 }}
          aria-hidden="true"
        />

        {/* Nucleus: 3 protons (red) + 4 neutrons (gray), tightly clustered */}
        <div className="relative w-[68px] h-[68px]" aria-hidden="true">
          {/* Soft glow behind nucleus */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(248,113,113,0.45) 0%, rgba(248,113,113,0) 70%)",
              transform: "scale(1.6)",
            }}
          />
          {/* 7 nucleons arranged in a tight cluster */}
          <Nucleon color="bg-red-500"   x={28} y={6}  />
          <Nucleon color="bg-slate-400" x={6}  y={20} />
          <Nucleon color="bg-red-500"   x={50} y={20} />
          <Nucleon color="bg-slate-400" x={28} y={28} />
          <Nucleon color="bg-slate-400" x={6}  y={42} />
          <Nucleon color="bg-red-500"   x={50} y={42} />
          <Nucleon color="bg-slate-400" x={28} y={50} />
        </div>

        {/* Inner orbit electrons — 2 fixed at left & right (180px ring → r=90) */}
        <div className="absolute pointer-events-none" aria-hidden="true">
          <Electron style={{ transform: "translate(-90px, 0)" }} />
          <Electron style={{ transform: "translate( 90px, 0)" }} />
        </div>

        {/* Outer orbit — 1 electron, animated around the ring (320px ring → r=160) */}
        <div
          className="absolute pointer-events-none csa-orbit-anim"
          style={{ width: 320, height: 320 }}
          aria-hidden="true"
        >
          <div
            className="absolute"
            style={{ top: "50%", left: "50%", transform: "translate(160px, -50%)" }}
          >
            <Electron />
          </div>
        </div>

        {/* Element label */}
        <div className="absolute bottom-3 right-4 text-right text-blue-100/80">
          <div className="font-mono text-[11px] tracking-widest uppercase opacity-70">Li</div>
          <div className={`text-xs ${kh ? "font-khmer" : ""}`}>
            {t("Lithium • Atomic # 3", "លីច្ចូម • លេខអាតូមិក ៣")}
          </div>
        </div>
      </div>

      {/* Legend */}
      <figcaption
        className={`relative bg-slate-950/70 backdrop-blur border-t border-slate-700 px-4 py-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-200 ${
          kh ? "font-khmer" : ""
        }`}
      >
        <LegendDot color="bg-red-500" labelEn="Proton" labelKh="ប្រូតុង" />
        <LegendDot color="bg-slate-400" labelEn="Neutron" labelKh="ណឺត្រុង" />
        <LegendDot color="bg-blue-500" labelEn="Electron" labelKh="អេឡិចត្រុង" ring />
      </figcaption>
    </figure>
  );
}

function Nucleon({ color, x, y }: { color: string; x: number; y: number }) {
  return (
    <span
      className={`absolute w-4 h-4 rounded-full ${color} shadow-md ring-1 ring-white/20`}
      style={{ top: y, left: x }}
    />
  );
}

function Electron({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      className="absolute w-3.5 h-3.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.7)] ring-1 ring-blue-200/60"
      style={{ top: "50%", left: "50%", marginLeft: "-7px", marginTop: "-7px", ...style }}
    />
  );
}

function LegendDot({
  color,
  labelEn,
  labelKh,
  ring,
}: {
  color: string;
  labelEn: string;
  labelKh: string;
  ring?: boolean;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-block w-3 h-3 rounded-full ${color} ${
          ring ? "shadow-[0_0_6px_1px_rgba(96,165,250,0.7)]" : ""
        }`}
        aria-hidden="true"
      />
      <span>{kh ? labelKh : labelEn}</span>
    </span>
  );
}

function BuildingBlockCard({
  accent,
  symbolBg,
  symbol,
  titleEn,
  titleKh,
  chargeLabelEn,
  chargeLabelKh,
  bodyEn,
  bodyKh,
}: {
  accent: string;
  symbolBg: string;
  symbol: string;
  titleEn: string;
  titleKh: string;
  chargeLabelEn: string;
  chargeLabelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const hasCharge = chargeLabelEn.length > 0;
  return (
    <article className={`rounded-2xl border-2 ${accent} p-5 shadow-sm`}>
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${symbolBg} text-white font-bold text-lg shadow`}
          aria-hidden="true"
        >
          {symbol}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg sm:text-xl font-bold leading-tight ${kh ? "font-khmer" : ""}`}>
            {kh ? titleKh : titleEn}
          </h3>
          {hasCharge && (
            <p className={`text-xs font-semibold opacity-75 ${kh ? "font-khmer" : ""}`}>
              {kh ? chargeLabelKh : chargeLabelEn}
            </p>
          )}
        </div>
      </div>
      <p className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? bodyKh : bodyEn}
      </p>
    </article>
  );
}

function ParticleCard({
  symbol,
  color,
  nameEn,
  nameKh,
  chargeEn,
  chargeKh,
  descEn,
  descKh,
}: {
  symbol: string;
  color: string;
  nameEn: string;
  nameKh: string;
  chargeEn: string;
  chargeKh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className={`rounded-2xl border-2 ${color} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-base font-bold ${kh ? "font-khmer" : ""}`}>{kh ? nameKh : nameEn}</span>
        <span className="font-mono text-lg font-bold" aria-hidden="true">{symbol}</span>
      </div>
      <div className={`text-xs font-semibold mb-2 opacity-80 ${kh ? "font-khmer" : ""}`}>
        {kh ? chargeKh : chargeEn}
      </div>
      <p className={`text-sm text-foreground/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? descKh : descEn}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 2 — Reactions & Math
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryReactionsPage() {
  return (
    <ModuleShell
      number="02"
      titleEn="Chemical Reactions & Math"
      titleKh="ប្រតិកម្មគីមី និងគណិតវិទ្យា"
      introEn="Why atoms join up, how to balance the books, and how to weigh them — all in one place."
      introKh="ហេតុអ្វីអាតូមភ្ជាប់គ្នា របៀបធ្វើតុល្យភាពសៀវភៅគណនេយ្យ និងរបៀបថ្លឹងពួកវា — ទាំងអស់នៅកន្លែងតែមួយ។"
      icon={FlaskConical}
      accent={{
        iconBg: "bg-emerald-600",
        title: "text-emerald-900",
        chip: "bg-emerald-100 text-emerald-800",
        bgFrom: "from-emerald-50/40",
        bgTo: "to-background",
      }}
    >
      {/* ── 1. The 'Why': Bonding ─────────────────────────────── */}
      <Section titleEn="The 'Why': Bonding" titleKh="មូលហេតុ៖ ចំណងគីមី">
        <div className="flex items-start gap-3 not-prose mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Puzzle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <P
              en={
                <>
                  Atoms are like puzzles. They share or trade electrons to become stable. This is how hydrogen and oxygen become water (
                  <span className="font-mono">H₂O</span>)!
                </>
              }
              kh={
                <>
                  អាតូមប្រៀបដូចជាបំណែកផ្គុំរូប។ ពួកវាចែករំលែក ឬប្តូរអេឡិចត្រុង ដើម្បីឱ្យមានស្ថេរភាព។ នេះជារបៀបដែលអ៊ីដ្រូសែន និងអុកស៊ីសែន ក្លាយជាទឹក (
                  <span className="font-mono">H₂O</span>)!
                </>
              }
            />
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 not-prose flex items-center justify-center">
          <div className="font-mono text-base sm:text-xl text-emerald-900 text-center">
            2 H₂ + O₂ → 2 H₂O
          </div>
        </div>
      </Section>

      {/* ── 2. Stoichiometry: The Recipe ──────────────────────── */}
      <Section titleEn="Stoichiometry: The Recipe" titleKh="រូបមន្ត និងតុល្យភាព">
        <div className="flex items-start gap-3 not-prose">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <ChefHat className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 pt-1 space-y-3">
            <P
              en="Chemistry is like cooking. A chemical equation tells you exactly how much of each ingredient you need. Conservation of Mass means we cannot create or destroy atoms; we only rearrange them."
              kh="គីមីវិទ្យាប្រៀបដូចជាការចម្អិនអាហារ។ សមីការគីមីប្រាប់អ្នកយ៉ាងច្បាស់ពីចំនួនគ្រឿងផ្សំនីមួយៗដែលអ្នកត្រូវការ។ ច្បាប់រក្សាម៉ាស់ មានន័យថា យើងមិនអាចបង្កើត ឬបំផ្លាញអាតូមបានទេ យើងគ្រាន់តែរៀបចំវាឡើងវិញប៉ុណ្ណោះ។"
            />
          </div>
        </div>
      </Section>

      {/* ── 3. Interactive Calculator ─────────────────────────── */}
      <MolecularWeightCalculator />

      {/* ── 4. Acids and Bases ────────────────────────────────── */}
      <Section titleEn="Acids and Bases" titleKh="អាស៊ីត និងបាស">
        <div className="flex items-start gap-3 not-prose mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <P
              en="Acids (Low pH) taste sour, like lemons. Bases (High pH) feel slippery, like soap."
              kh="អាស៊ីត (pH ទាប) មានរសជាតិជូរ ដូចជាក្រូចឆ្មារ។ បាស (pH ខ្ពស់) មានអារម្មណ៍រអិល ដូចជាសាប៊ូ។"
            />
          </div>
        </div>

        <PhScaleVisual />
      </Section>

      <NextModuleLink to="/chemistry/advanced" labelEn="Next: Advanced Concepts" labelKh="បន្ទាប់៖ គំនិតកម្រិតខ្ពស់" />
    </ModuleShell>
  );
}

// ── Interactive: Molecular Weight Calculator ──────────────────────────────
function MolecularWeightCalculator() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [protons, setProtons] = useState<string>("3");
  const [neutrons, setNeutrons] = useState<string>("4");

  const parsePos = (v: string): number | null => {
    if (v.trim() === "") return null;
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) return null;
    return Math.floor(n);
  };

  const p = parsePos(protons);
  const n = parsePos(neutrons);
  const valid = p !== null && n !== null;
  const mass = valid ? (p as number) + (n as number) : null;

  return (
    <section className="rounded-2xl bg-white border-2 border-emerald-300 shadow-sm p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Calculator className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={`text-xl sm:text-2xl font-bold text-emerald-900 leading-tight ${kh ? "font-khmer" : ""}`}>
            {t("Molecular Weight Calculator", "ម៉ាស៊ីនគណនាម៉ាសម៉ូលេគុល")}
          </h2>
          <p className={`text-sm text-foreground/70 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Enter the number of protons and neutrons to find the approximate atomic mass.",
              "បញ្ចូលចំនួនប្រូតុង និងណឺត្រុង ដើម្បីស្វែងរកម៉ាសអាតូមប្រហាក់ប្រហែល។",
            )}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <CalcInput
          id="mw-protons"
          labelEn="Number of Protons"
          labelKh="ចំនួនប្រូតុង"
          value={protons}
          onChange={setProtons}
          accent="text-red-700"
          symbol="p⁺"
          symbolBg="bg-red-100 text-red-700"
        />
        <CalcInput
          id="mw-neutrons"
          labelEn="Number of Neutrons"
          labelKh="ចំនួនណឺត្រុង"
          value={neutrons}
          onChange={setNeutrons}
          accent="text-slate-700"
          symbol="n⁰"
          symbolBg="bg-slate-100 text-slate-700"
        />
      </div>

      <div
        className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-4 sm:p-5 shadow-inner"
        aria-live="polite"
      >
        <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {t("Approximate Atomic Mass", "ម៉ាសអាតូមប្រហាក់ប្រហែល")}
        </div>
        {valid ? (
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-3xl sm:text-4xl font-bold">{mass}</span>
            <span className="text-sm sm:text-base opacity-90">u</span>
            <span className={`text-xs sm:text-sm opacity-80 ml-1 ${kh ? "font-khmer" : ""}`}>
              ({p} + {n})
            </span>
          </div>
        ) : (
          <div className={`text-sm sm:text-base opacity-90 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Enter valid whole numbers (0 or higher) above.",
              "សូមបញ្ចូលលេខគត់ត្រឹមត្រូវ (០ ឬច្រើនជាងនេះ) ខាងលើ។",
            )}
          </div>
        )}
      </div>

      <p className={`mt-3 text-xs sm:text-sm text-foreground/60 ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(
          "Tip: For Lithium (3 protons, 4 neutrons), the answer is 7 u.",
          "ចំណាំ៖ សម្រាប់លីច្ចូម (ប្រូតុង ៣ ណឺត្រុង ៤) ចម្លើយគឺ ៧ u។",
        )}
      </p>
    </section>
  );
}

function CalcInput({
  id,
  labelEn,
  labelKh,
  value,
  onChange,
  accent,
  symbol,
  symbolBg,
}: {
  id: string;
  labelEn: string;
  labelKh: string;
  value: string;
  onChange: (v: string) => void;
  accent: string;
  symbol: string;
  symbolBg: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <label htmlFor={id} className="block">
      <span className={`block text-sm font-semibold mb-1.5 ${accent} ${kh ? "font-khmer" : ""}`}>
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-1.5 font-mono text-xs ${symbolBg}`} aria-hidden="true">
          {symbol}
        </span>
        {kh ? labelKh : labelEn}
      </span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-base font-mono bg-white"
        placeholder="0"
      />
    </label>
  );
}

// ── pH Scale Visual ───────────────────────────────────────────────────────
function PhScaleVisual() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const examples: { ph: number; en: string; kh: string }[] = [
    { ph: 1,  en: "Stomach acid", kh: "អាស៊ីតក្រពះ" },
    { ph: 2,  en: "Lemon juice",  kh: "ទឹកក្រូចឆ្មារ" },
    { ph: 3,  en: "Vinegar",      kh: "ទឹកខ្មេះ" },
    { ph: 7,  en: "Pure water",   kh: "ទឹកសុទ្ធ" },
    { ph: 9,  en: "Baking soda",  kh: "សូដាដុតនំ" },
    { ph: 10, en: "Soap",         kh: "សាប៊ូ" },
    { ph: 12, en: "Bleach",       kh: "ប្លេច" },
  ];

  return (
    <div className="not-prose space-y-4">
      {/* Gradient bar with 0–14 markers */}
      <div className="rounded-xl bg-white border border-border shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold text-red-700 ${kh ? "font-khmer" : ""}`}>
            {t("Acidic", "អាស៊ីត")}
          </span>
          <span className={`text-sm font-bold text-foreground/70 ${kh ? "font-khmer" : ""}`}>
            {t("Neutral", "អព្យាក្រឹត")}
          </span>
          <span className={`text-sm font-bold text-blue-700 ${kh ? "font-khmer" : ""}`}>
            {t("Basic", "បាស")}
          </span>
        </div>

        {/* The pH bar */}
        <div
          className="relative h-10 sm:h-12 rounded-lg shadow-inner"
          style={{
            background:
              "linear-gradient(to right, #dc2626 0%, #ea580c 14%, #f59e0b 28%, #facc15 42%, #84cc16 50%, #22c55e 58%, #14b8a6 72%, #2563eb 86%, #1e3a8a 100%)",
          }}
          role="img"
          aria-label={
            kh
              ? "មាត្រដ្ឋាន pH ពីពណ៌ក្រហមសម្រាប់អាស៊ីត រហូតដល់ពណ៌ខៀវសម្រាប់បាស"
              : "pH scale gradient from red (acid) to blue (base)"
          }
        >
          {/* 0–14 tick marks */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 flex flex-col items-center"
              style={{ left: `${(i / 14) * 100}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-2 bg-white/70 mt-1" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Number row */}
        <div className="relative h-5 mt-1">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 text-[10px] sm:text-xs font-mono font-bold text-foreground/70"
              style={{ left: `${(i / 14) * 100}%`, transform: "translateX(-50%)" }}
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Example pills along the scale */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {examples.map((ex) => {
          const isAcid = ex.ph < 7;
          const isBase = ex.ph > 7;
          const palette = isAcid
            ? "bg-red-50 border-red-200 text-red-900"
            : isBase
              ? "bg-blue-50 border-blue-200 text-blue-900"
              : "bg-emerald-50 border-emerald-200 text-emerald-900";
          return (
            <div
              key={ex.ph}
              className={`rounded-lg border ${palette} px-2.5 py-1.5 text-center`}
            >
              <div className="font-mono text-xs font-bold opacity-70">pH {ex.ph}</div>
              <div className={`text-xs sm:text-sm font-semibold leading-tight ${kh ? "font-khmer" : ""}`}>
                {kh ? ex.kh : ex.en}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 3 — Advanced Concepts
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryAdvancedPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const branches: {
    titleEn: string;
    titleKh: string;
    descEn: string;
    descKh: string;
    exampleEn: string;
    exampleKh: string;
  }[] = [
    {
      titleEn: "Quantum Mechanics",
      titleKh: "មេកានិចកង់ទិច",
      descEn:
        "At very small scales, electrons don't follow planet-like orbits. They exist as fuzzy 'probability clouds' (orbitals) and can only have certain discrete energies — like notes on a piano, not a slide whistle.",
      descKh:
        "នៅកម្រិតតូចបំផុត អេឡិចត្រុងមិនធ្វើដំណើរតាមគន្លងដូចភពទេ។ ពួកវាមាននៅជាពពកប្រូបាប៊ីលីតេ (អូប៊ីតាល់) ហើយអាចមានតែថាមពលដាច់ពីគ្នាជាក់លាក់ — ដូចជាសំឡេងពីយ៉ាណូ មិនមែនជាស្ល័រ។",
      exampleEn: "Why your TV remote works — photons emitted at exact wavelengths.",
      exampleKh: "ហេតុអ្វីបញ្ជាពីចម្ងាយទូរទស្សន៍ដំណើរការ — ហ្វូតុងលែងលែកនៅរលកប្រវែងជាក់លាក់។",
    },
    {
      titleEn: "Organic Chemistry",
      titleKh: "គីមីវិទ្យាសរីរាង្គ",
      descEn:
        "The chemistry of carbon compounds. Carbon's ability to form long chains and rings is what makes life — and plastics, fuels, and medicines — possible.",
      descKh:
        "គីមីវិទ្យានៃសមាសធាតុកាបូន។ សមត្ថភាពរបស់កាបូនក្នុងការបង្កើតខ្សែវែង និងរង្វង់ គឺជាអ្វីដែលធ្វើឱ្យជីវិត — ព្រមទាំងផ្លាស្ទិច ឥន្ធនៈ និងឱសថ — អាចកើតឡើងបាន។",
      exampleEn: "Sugar (C₆H₁₂O₆), petrol, paracetamol, and DNA are all organic molecules.",
      exampleKh: "ស្ករ (C₆H₁₂O₆) សាំង ប៉ារ៉ាសេតាម៉ុល និង DNA សុទ្ធតែជាម៉ូលេគុលសរីរាង្គ។",
    },
    {
      titleEn: "Biochemistry",
      titleKh: "ជីវគីមីវិទ្យា",
      descEn:
        "Chemistry happening inside living things. Studies how proteins fold, how enzymes catalyse reactions, and how DNA stores information.",
      descKh:
        "គីមីវិទ្យាដែលកើតឡើងនៅខាងក្នុងសត្វមានជីវិត។ សិក្សាពីរបៀបប្រូតេអ៊ីនបត់ របៀបអង់ស៊ីមជំរុញប្រតិកម្ម និងរបៀប DNA រក្សាទុកព័ត៌មាន។",
      exampleEn: "Why bread rises (yeast eats sugar → CO₂ + ethanol).",
      exampleKh: "ហេតុអ្វីនំបុ័ងពោង (មេនំស៊ីស្ករ → CO₂ + អេតាណុល)។",
    },
    {
      titleEn: "Physical Chemistry",
      titleKh: "គីមីវិទ្យារូប",
      descEn:
        "The 'why' behind reactions. Uses physics and maths to study energy, speed (kinetics), and equilibrium of chemical systems.",
      descKh:
        "'ហេតុអ្វី' នៅពីក្រោយប្រតិកម្ម។ ប្រើរូបវិទ្យា និងគណិតវិទ្យាដើម្បីសិក្សាពីថាមពល ល្បឿន (កីណេទិច) និងតុល្យភាពនៃប្រព័ន្ធគីមី។",
      exampleEn: "Why cold reactions are slow; why a fire is exothermic.",
      exampleKh: "ហេតុអ្វីប្រតិកម្មត្រជាក់ដំណើរការយឺត; ហេតុអ្វីភ្លើងជាប្រតិកម្មលែងលែកកម្តៅ។",
    },
    {
      titleEn: "Inorganic Chemistry",
      titleKh: "គីមីវិទ្យាអសរីរាង្គ",
      descEn:
        "Everything that isn't organic — metals, minerals, salts, ceramics, and most catalysts. Foundational for materials science and electronics.",
      descKh:
        "អ្វីៗគ្រប់យ៉ាងដែលមិនមែនជាសរីរាង្គ — លោហៈ សារធាតុរ៉ែ អំបិល សេរ៉ាមិច និងកាតាលីករភាគច្រើន។ មូលដ្ឋានសម្រាប់វិទ្យាសាស្ត្ររូបធាតុ និងអេឡិចត្រូនិច។",
      exampleEn: "The lithium in your phone battery; the silicon in computer chips.",
      exampleKh: "លីចូមនៅក្នុងថ្មទូរសព្ទរបស់អ្នក; ស៊ីលីកុននៅក្នុងបន្ទះកុំព្យូទ័រ។",
    },
  ];

  return (
    <ModuleShell
      number="03"
      titleEn="Advanced Concepts"
      titleKh="គំនិតកម្រិតខ្ពស់"
      introEn="Chemistry has many specialised branches. Here's a one-paragraph tour of each — enough to know what they're about and which one might fit your future studies."
      introKh="គីមីវិទ្យាមានផ្នែកឯកទេសច្រើន។ នេះគឺជាការទស្សនាមួយកថាខណ្ឌនៃផ្នែកនីមួយៗ — គ្រប់គ្រាន់ដើម្បីដឹងថាពួកវានិយាយអំពីអ្វី និងផ្នែកមួយណាដែលអាចសមនឹងការសិក្សានាពេលអនាគតរបស់អ្នក។"
      icon={Microscope}
      accent={{
        iconBg: "bg-violet-600",
        title: "text-violet-900",
        chip: "bg-violet-100 text-violet-800",
        bgFrom: "from-violet-50/40",
        bgTo: "to-background",
      }}
    >
      <div className="space-y-4">
        {branches.map((b, i) => (
          <article
            key={i}
            className="rounded-2xl bg-white border border-border shadow-sm p-5 sm:p-6"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-bold tracking-widest text-violet-700 opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className={`text-lg sm:text-xl font-bold text-violet-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {kh ? b.titleKh : b.titleEn}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base text-foreground/85 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {kh ? b.descKh : b.descEn}
            </p>
            <div className="rounded-lg bg-violet-50 border-l-4 border-violet-400 px-3 py-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider text-violet-700 mr-1.5 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                {kh ? "ឧទាហរណ៍៖" : "Example:"}
              </span>
              <span
                className={`text-sm text-foreground/80 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? b.exampleKh : b.exampleEn}
              </span>
            </div>
          </article>
        ))}
      </div>

      <NextModuleLink to="/chemistry/real-world" labelEn="Next: Chemistry in the Real World" labelKh="បន្ទាប់៖ គីមីវិទ្យាក្នុងពិភពពិត" />
    </ModuleShell>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 4 — Chemistry in the Real World
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryRealWorldPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <ModuleShell
      number="04"
      titleEn="Chemistry in the Real World"
      titleKh="គីមីវិទ្យាក្នុងពិភពពិត"
      introEn="You don't need a lab coat to see chemistry — it's already in your kitchen, your body, and your village. Let's spot it, then try a safe experiment together."
      introKh="អ្នកមិនត្រូវការអាវប្រឡោះដើម្បីឃើញគីមីវិទ្យាទេ — វានៅក្នុងផ្ទះបាយ ក្នុងរាងកាយ និងក្នុងភូមិរបស់អ្នករួចហើយ។ តោះស្វែងរកវា ហើយសាកល្បងការពិសោធន៍សុវត្ថិភាពជាមួយគ្នា។"
      icon={Sparkles}
      accent={{
        iconBg: "bg-amber-600",
        title: "text-amber-900",
        chip: "bg-amber-100 text-amber-800",
        bgFrom: "from-amber-50/40",
        bgTo: "to-background",
      }}
    >
      <Section titleEn="Chemistry in your daily life" titleKh="គីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ">
        <BList
          itemsEn={[
            <span><strong>Cooking rice</strong> — heat breaks starch chains so your body can digest them. The same chemistry happens in bread, noodles, and porridge.</span>,
            <span><strong>Soap & water</strong> — soap molecules grab oil on one end and water on the other, lifting dirt off your skin.</span>,
            <span><strong>Breathing</strong> — your cells burn glucose with oxygen to release energy: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energy.</span>,
            <span><strong>Rust</strong> — iron + oxygen + water slowly produces iron oxide. That's why metal roofs and tools need paint.</span>,
            <span><strong>Fertiliser</strong> — nitrogen, phosphorus, and potassium feed crops. Cambodia's rice yields depend on getting the ratio right.</span>,
            <span><strong>Medicines</strong> — paracetamol blocks pain signals in your brain by interfering with specific enzymes.</span>,
            <span><strong>Dynamite</strong> — invented by Alfred Nobel, it is a masterclass in chemical control. Raw nitroglycerin is a highly unstable liquid that explodes easily. Nobel discovered that if you absorb this liquid into a special type of chalky dirt (diatomaceous earth), it becomes completely stable and safe to transport. We use this controlled chemical reaction to safely blast through mountains to build roads and train tracks!</span>,
          ]}
          itemsKh={[
            <span><strong>ការចម្អិនបាយ</strong> — កម្តៅបំបែកខ្សែស្តាច ដើម្បីឱ្យរាងកាយរបស់អ្នកអាចរំលាយបាន។ គីមីវិទ្យាដូចគ្នានេះកើតឡើងនៅក្នុងនំបុ័ង មី និងបបរ។</span>,
            <span><strong>សាប៊ូ និងទឹក</strong> — ម៉ូលេគុលសាប៊ូចាប់ប្រេងនៅចុងមួយ និងទឹកនៅចុងមួយទៀត លុបស្នាមកខ្វក់ចេញពីស្បែករបស់អ្នក។</span>,
            <span><strong>ការដកដង្ហើម</strong> — កោសិការបស់អ្នកដុតគ្លុយកូស ជាមួយអុកស៊ីសែន ដើម្បីបញ្ចេញថាមពល៖ C₆H₁₂O₆ + ៦ O₂ → ៦ CO₂ + ៦ H₂O + ថាមពល។</span>,
            <span><strong>ច្រេះ</strong> — ដែក + អុកស៊ីសែន + ទឹក បង្កើតបានជាដែកអុកស៊ីតយឺតៗ។ នោះជាហេតុអ្វីដំបូលលោហៈ និងឧបករណ៍ត្រូវការថ្នាំលាប។</span>,
            <span><strong>ជី</strong> — អាសូត ផូស្វ័រ និងប៉ូតាស្យូម ផ្តល់អាហារដល់ដំណាំ។ ផលិតភាពស្រូវរបស់កម្ពុជាពឹងផ្អែកលើការកំណត់សមាមាត្រត្រឹមត្រូវ។</span>,
            <span><strong>ឱសថ</strong> — ប៉ារ៉ាសេតាម៉ុល រាំងសញ្ញាការឈឺនៅក្នុងខួរក្បាលរបស់អ្នក ដោយរំខានដល់អង់ស៊ីមជាក់លាក់។</span>,
            <span><strong>ឌីណាមីត</strong> — បង្កើតឡើងដោយ អាល់ហ្វ្រេត ណូបែល វាគឺជាគំរូដ៏អស្ចារ្យនៃការគ្រប់គ្រងសារធាតុគីមី។ នីត្រូគ្លីសេរីនឆៅគឺជាវត្ថុរាវដែលមិនមានស្ថិរភាព និងងាយផ្ទុះបំផុត។ ណូបែលបានរកឃើញថា ប្រសិនបើអ្នកស្រូបយកវត្ថុរាវនេះទៅក្នុងដីឥដ្ឋម្យ៉ាង (diatomaceous earth) វានឹងមានស្ថិរភាពទាំងស្រុង ហើយមានសុវត្ថិភាពក្នុងការដឹកជញ្ជូន។ យើងប្រើប្រាស់ប្រតិកម្មគីមីដែលបានគ្រប់គ្រងនេះ ដើម្បីបំផ្ទុះភ្នំដោយសុវត្ថិភាព សម្រាប់សាងសង់ផ្លូវថ្នល់ និងផ្លូវដែក!</span>,
          ]}
        />
      </Section>

      <Section titleEn="Try this at home — safe experiments" titleKh="សាកល្បងនៅផ្ទះ — ការពិសោធន៍សុវត្ថិភាព">
        {/* Safety note */}
        <div className="rounded-xl bg-red-50 border-l-4 border-red-500 px-4 py-3 not-prose flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          <P
            en="Always do experiments with an adult. Never taste anything. Wear glasses or sunglasses to protect your eyes."
            kh="តែងតែធ្វើការពិសោធន៍ជាមួយមនុស្សពេញវ័យ។ កុំភ្លក់អ្វីទាំងអស់។ ពាក់វ៉ែនតា ឬវ៉ែនតាអាទិត្យ ដើម្បីការពារភ្នែករបស់អ្នក។"
          />
        </div>

        <ExperimentCard
          number="01"
          titleEn="The Volcano (vinegar + baking soda)"
          titleKh="ភ្នំភ្លើង (ទឹកខ្មេះ + សូដាដុតនំ)"
          needEn={["1 small empty bottle", "2 tablespoons baking soda", "½ cup vinegar", "A few drops of dish soap (optional)", "Red food colouring (optional)"]}
          needKh={["ដបទទេតូច ១", "សូដាដុតនំ ២ ស្លាបព្រា", "ទឹកខ្មេះ ½ កែវ", "សាប៊ូលាងចាន ពីរបី ដំណក់ (ស្រេចចិត្ត)", "ពណ៌ចំណីអាហារក្រហម (ស្រេចចិត្ត)"]}
          stepsEn={[
            "Put the bottle on a tray (it will overflow!).",
            "Add the baking soda. Add a few drops of soap and food colour.",
            "Pour in the vinegar quickly and step back.",
            "Watch the foam erupt like lava.",
          ]}
          stepsKh={[
            "ដាក់ដបនៅលើថាស (វានឹងហូរលើស!)។",
            "ដាក់សូដាដុតនំ។ បន្ថែមសាប៊ូពីរបីដំណក់ និងពណ៌ចំណីអាហារ។",
            "ចាក់ទឹកខ្មេះចូលយ៉ាងលឿន ហើយដកថយ។",
            "មើលពពុះផ្ទុះដូចឡាវ៉ា។",
          ]}
          whyEn="Vinegar (acid) + baking soda (base) → carbon dioxide gas + water + sodium acetate. The CO₂ bubbles up through the soap and creates foam — a classic acid–base reaction."
          whyKh="ទឹកខ្មេះ (អាស៊ីត) + សូដាដុតនំ (បាស) → ឧស្ម័នកាបូនឌីអុកស៊ីត + ទឹក + សូដ្យូមអាសេតាត។ CO₂ ផុសឡើងតាមរយៈសាប៊ូ និងបង្កើតពពុះ — ប្រតិកម្មអាស៊ីត–បាសបុរាណ។"
        />

        <ExperimentCard
          number="02"
          titleEn="Invisible ink (lemon juice)"
          titleKh="ទឹកថ្នាំមើលមិនឃើញ (ទឹកក្រូចឆ្មារ)"
          needEn={["½ lemon", "Cotton bud or paintbrush", "Plain white paper", "A lamp or sunlight"]}
          needKh={["ក្រូចឆ្មារ ½", "សូឡាកប្រាក់ ឬច្រាសគូរ", "ក្រដាសសសុទ្ធ", "ភ្លើង ឬពន្លឺថ្ងៃ"]}
          stepsEn={[
            "Squeeze the lemon into a small cup.",
            "Dip the cotton bud and write a secret message on the paper.",
            "Let it dry completely (looks blank).",
            "Hold the paper near a warm lamp — the writing turns brown!",
          ]}
          stepsKh={[
            "សង្កត់ក្រូចឆ្មារចូលក្នុងពែងតូច។",
            "ត្រាំសូឡាកប្រាក់ ហើយសរសេរសារសម្ងាត់នៅលើក្រដាស។",
            "ទុកឱ្យស្ងួតទាំងស្រុង (មើលទៅទទេ)។",
            "សង្កត់ក្រដាសនៅជិតភ្លើងក្តៅ — អក្សរប្រែទៅជាពណ៌ត្នោត!",
          ]}
          whyEn="Lemon juice contains carbon-rich compounds that are colourless when wet but oxidise (turn brown) faster than the paper when heated."
          whyKh="ទឹកក្រូចឆ្មារមានសមាសធាតុសម្បូរកាបូន ដែលគ្មានពណ៌ពេលសើម តែអុកស៊ីដ (ប្រែទៅជាពណ៌ត្នោត) លឿនជាងក្រដាស នៅពេលកម្តៅ។"
        />

        <ExperimentCard
          number="03"
          titleEn="Rainbow milk"
          titleKh="ទឹកដោះគោឥន្ទធនូ"
          needEn={["Plate of fresh whole milk", "Drops of food colouring (red, blue, yellow, green)", "Cotton bud", "1 drop of dish soap"]}
          needKh={["ចានទឹកដោះគោស្រស់", "ដំណក់ពណ៌ចំណីអាហារ (ក្រហម ខៀវ លឿង បៃតង)", "សូឡាកប្រាក់", "សាប៊ូលាងចាន ១ ដំណក់"]}
          stepsEn={[
            "Pour milk to cover the bottom of the plate.",
            "Drop different colours in the centre — don't stir.",
            "Dip the cotton bud in dish soap, then touch the centre.",
            "Watch the colours explode outward!",
          ]}
          stepsKh={[
            "ចាក់ទឹកដោះគោឱ្យគ្របបាតចាន។",
            "ដាក់ពណ៌ផ្សេងៗនៅកណ្តាល — កុំកូរ។",
            "ត្រាំសូឡាកប្រាក់ក្នុងសាប៊ូលាងចាន រួចប៉ះកណ្តាល។",
            "មើលពណ៌ផ្ទុះចេញ!",
          ]}
          whyEn="Milk contains fat. Soap molecules race to grab the fat, dragging the colours along with them — you're watching surface tension break."
          whyKh="ទឹកដោះគោមានខ្លាញ់។ ម៉ូលេគុលសាប៊ូប្រណាំងគ្នាដើម្បីចាប់ខ្លាញ់ ហើយអូសពណ៌ទៅជាមួយ — អ្នកកំពុងមើលការបំបែកតង់ស្យុងផ្ទៃ។"
        />
      </Section>

      <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-5 sm:p-6 flex items-start gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className={`text-base sm:text-lg font-bold text-emerald-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? "អ្នកបានបញ្ចប់ Chemistry Hub!" : "You've finished the Chemistry Hub!"}
          </h3>
          <p className={`text-sm text-foreground/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ឥឡូវនេះអ្នកមានគ្រឹះរឹងមាំ — ពីអាតូម ដល់ប្រតិកម្ម ដល់គីមីវិទ្យាក្នុងពិភពពិត។ បន្តរុករកនៅក្នុងផ្ទះបាយ និងសាលារបស់អ្នក។"
              : "You now have a strong foundation — from atoms, to reactions, to chemistry in the real world. Keep exploring in your kitchen and your school."}
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow transition-colors ${
            kh ? "font-khmer" : ""
          }`}
        >
          <Beaker className="w-4 h-4" />
          {kh ? "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា" : "Back to Chemistry Hub"}
        </Link>
      </div>
    </ModuleShell>
  );
}

function ExperimentCard({
  number,
  titleEn,
  titleKh,
  needEn,
  needKh,
  stepsEn,
  stepsKh,
  whyEn,
  whyKh,
}: {
  number: string;
  titleEn: string;
  titleKh: string;
  needEn: string[];
  needKh: string[];
  stepsEn: string[];
  stepsKh: string[];
  whyEn: string;
  whyKh: string;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-2xl bg-amber-50/40 border border-amber-200 p-4 sm:p-5 not-prose">
      <div className="flex items-baseline gap-2.5 mb-3">
        <span className="text-xs font-bold tracking-widest text-amber-700 opacity-70">{number}</span>
        <h3 className={`text-base sm:text-lg font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
            {t("You'll need", "របស់ដែលត្រូវការ")}
          </div>
          <ul className={`list-disc pl-5 text-sm text-foreground/85 space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {(kh ? needKh : needEn).map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
            {t("Steps", "ជំហាន")}
          </div>
          <ol className={`list-decimal pl-5 text-sm text-foreground/85 space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {(kh ? stepsKh : stepsEn).map((it, i) => <li key={i}>{it}</li>)}
          </ol>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-white border-l-4 border-amber-500 px-3 py-2">
        <span className={`text-xs font-bold uppercase tracking-wider text-amber-800 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {t("Why it works:", "ហេតុអ្វីវាដំណើរការ៖")}
        </span>
        <span className={`text-sm text-foreground/85 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? whyKh : whyEn}
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared "next module" link
// ──────────────────────────────────────────────────────────────────────────────

function NextModuleLink({ to, labelEn, labelKh }: { to: string; labelEn: string; labelKh: string }) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className="text-center pt-2">
      <Link
        href={to}
        className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold shadow hover:bg-foreground/90 transition-colors ${
          kh ? "font-khmer" : ""
        }`}
      >
        {kh ? labelKh : labelEn}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
