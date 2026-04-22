import { Link } from "wouter";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  Zap,
  Battery,
  Flame,
  Droplets,
  Wheat,
  Brain,
  RotateCw,
  Sparkles,
  Layers,
  Scissors,
  Combine,
  Cog,
  Wind,
  HeartPulse,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import type React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-BIOCHEM-02 · Biochemistry: The Cellular Power Plant
//                   ជីវគីមីវិទ្យា ៖ រោងចក្រថាមពលកោសិកា
//
//  Industrial / power-plant aesthetic — deep mitochondrial teal, copper
//  proton pipes, amber electron arcs, magenta ATP molecules. Self-contained
//  custom SVG diagrams: glycolysis split, mitochondrion cross-section, Krebs
//  minecart cycle, electron-transport chain with spinning ATP synthase turbine.
// ════════════════════════════════════════════════════════════════════════════

// ─── Power-plant palette ────────────────────────────────────────────────
const BG       = "#04141a";
const PANEL    = "#072028";
const PANEL_2  = "#0a2c36";
const RULE     = "#103943";
const INK      = "#e6fffb";
const INK_SOFT = "#86b6b3";
const TEAL     = "#10b981";   // mitochondrial green
const COPPER   = "#ea580c";   // proton H⁺
const AMBER    = "#fbbf24";   // electron e⁻
const MAGENTA  = "#ec4899";   // ATP
const SKY      = "#38bdf8";   // O₂ / water
const LIME     = "#84cc16";   // glucose / sugar
const ROSE     = "#fb7185";   // pyruvate

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// ─── Layout primitives ──────────────────────────────────────────────────

function P({ k, en, kh, className }: { k: boolean; en: string; kh: string; className?: string }) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function H2({
  k,
  en,
  kh,
  Icon,
  accent,
}: {
  k: boolean;
  en: string;
  kh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-lg sm:text-xl font-bold tracking-wide ${k ? "font-khmer" : "uppercase"}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: `${accent}55` }} />
    </div>
  );
}

function Panel({
  children,
  accent,
  className,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className ?? ""}`}
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}55`,
        boxShadow: `inset 0 0 0 1px ${accent}11, 0 0 28px -16px ${accent}66`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function StageBadge({ k, en, kh, accent }: { k: boolean; en: string; kh: string; accent: string }) {
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-1 rounded-md tracking-widest ${k ? "font-khmer" : "uppercase font-mono"}`}
      style={{ backgroundColor: accent, color: BG }}
    >
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function CellularPowerPlantPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 18% 14%, ${TEAL}22, transparent 50%),` +
      `radial-gradient(circle at 84% 86%, ${COPPER}1a, transparent 55%),` +
      `linear-gradient(${RULE} 1px, transparent 1px),` +
      `linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, 36px 36px, 36px 36px",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80 ${k ? "font-khmer" : ""}`}
            style={{ color: TEAL }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* HERO */}
        <header
          className="relative rounded-[2rem] overflow-hidden border p-6 sm:p-9 mb-8"
          style={{
            backgroundColor: PANEL,
            borderColor: `${TEAL}55`,
            boxShadow: `inset 0 0 0 1px ${TEAL}22, 0 0 50px -20px ${TEAL}aa`,
          }}
        >
          <PowerPlantBackdrop />
          <div className="relative">
            <div
              className={`flex items-center gap-2 text-[11px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: TEAL }}
            >
              <span>{t("Science · Biochemistry", "វិទ្យាសាស្ត្រ · ជីវគីមីវិទ្យា")}</span>
              <span>·</span>
              <span>SCI-BIOCHEM-02</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK, textShadow: `0 0 18px ${TEAL}88, 0 0 38px ${COPPER}55` }}
              data-testid="page-title"
            >
              {t(
                "Biochemistry: The Cellular Power Plant",
                "ជីវគីមីវិទ្យា ៖ រោងចក្រថាមពលកោសិកា"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Right now, inside every one of the thirty trillion cells in your body, microscopic factories are quietly disassembling the rice you ate this morning, stripping electrons off it, and using those electrons to spin the world's smallest turbines. The energy they capture is poured into one tiny chemical battery called ATP — and your every thought, every heartbeat, every blink runs on it. This module follows a single grain of glucose from your bloodstream into the heart of the cell's power plant, watches it get smashed open in the cytoplasm, marched around a circular track inside the mitochondrion, and finally see its electrons fall down a chain of pumps that build the pressure needed to spin the turbines. Same atoms a plant once captured from sunlight; same equation, run in reverse.",
                "ឥឡូវនេះ នៅខាងក្នុងកោសិកាសាមសិបពាន់ពាន់លានរបស់អ្នកនីមួយៗ រោងចក្រមីក្រូកំពុងរុះរើស្ងាត់ៗនូវអង្ករដែលអ្នកញ៉ាំពេលព្រឹក ដកអេឡិចត្រុងចេញពីវា និងប្រើអេឡិចត្រុងទាំងនោះដើម្បីបង្វិលទួរប៊ីនតូចបំផុតនៅលើពិភពលោក។ ថាមពលដែលពួកវាចាប់យក ត្រូវបានចាក់ចូលទៅក្នុងអាគុយគីមីតូចមួយឈ្មោះ ATP — ហើយរាល់គំនិត រាល់ការដើរបេះដូង រាល់ការព្រិចភ្នែករបស់អ្នក ដំណើរការលើវា។ មុខវិជ្ជានេះតាមដានគ្រាប់គ្លុយកូសតែមួយ ពីឈាមរបស់អ្នកចូលក្នុងបេះដូងនៃរោងចក្រថាមពលរបស់កោសិកា មើលវាត្រូវបាក់នៅក្នុងស៊ីតូប្លាស្ម ដើររង្វង់ខាងក្នុងមីតូកុងឌ្រី និងចុងក្រោយឃើញអេឡិចត្រុងរបស់វាធ្លាក់ចុះតាមខ្សែសង្វាក់ស្នប់ ដែលបង្កើតសម្ពាធដែលត្រូវការដើម្បីបង្វិលទួរប៊ីន។ អាតូមដូចគ្នាដែលរុក្ខជាតិធ្លាប់ចាប់យកពីពន្លឺព្រះអាទិត្យ ; សមីការដូចគ្នា ដំណើរការបញ្ច្រាស។"
              )}
            </p>
          </div>
        </header>

        {/* CHAPTER 1 — Cellular Respiration overview */}
        <section className="mb-12">
          <H2 k={k} en="The master equation" kh="សមីការមេ" Icon={Flame} accent={TEAL} />
          <P
            k={k}
            en="Cellular respiration is the long, careful process of turning food into a kind of energy the cell can actually spend. The summary equation is simple enough to fit on one line — but everything interesting in biology happens between its left and right side."
            kh="ការដកដង្ហើមកោសិកា ជាដំណើរការវែង និងប្រុងប្រយ័ត្ននៃការប្រែម្ហូបទៅជាប្រភេទថាមពលដែលកោសិកាអាចចំណាយបាន។ សមីការសង្ខេបសាមញ្ញគ្រប់គ្រាន់ដើម្បីដាក់នៅលើបន្ទាត់តែមួយ — ប៉ុន្តែអ្វីដែលគួរឲ្យចាប់អារម្មណ៍ទាំងអស់ក្នុងជីវវិទ្យា កើតឡើងនៅចន្លោះខាងឆ្វេង និងខាងស្ដាំរបស់វា។"
            className="mb-5 -mt-2"
          />

          <Panel accent={TEAL} testId="master-equation">
            <div
              className="rounded-xl p-4 sm:p-5 text-center"
              style={{ backgroundColor: BG, border: `1px solid ${TEAL}33` }}
            >
              <div style={{ color: INK, fontSize: "1.15rem" }}>
                <BlockMath math={"C_{6}H_{12}O_{6} \\;+\\; 6\\,O_{2} \\;\\longrightarrow\\; 6\\,CO_{2} \\;+\\; 6\\,H_{2}O \\;+\\; \\text{ATP}"} />
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-4 text-left">
                <FormulaChip k={k} symbol="C₆H₁₂O₆" enLabel="glucose · the fuel" khLabel="គ្លុយកូស · ឥន្ធនៈ" Icon={Wheat} accent={LIME} />
                <FormulaChip k={k} symbol="O₂" enLabel="oxygen · the burner" khLabel="អុកស៊ីសែន · ឧបករណ៍ដុត" Icon={Wind} accent={SKY} />
                <FormulaChip k={k} symbol="ATP" enLabel="energy · the cash" khLabel="ថាមពល · សាច់ប្រាក់" Icon={Battery} accent={MAGENTA} />
              </div>
            </div>

            {/* Reverse-of-photosynthesis callout */}
            <div
              className="mt-5 rounded-xl p-4 border"
              style={{
                backgroundColor: PANEL,
                borderColor: `${LIME}66`,
              }}
              data-testid="reverse-callout"
            >
              <div className={`text-[11px] mb-2 font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: LIME }}>
                {k ? "សេចក្ដីសង្កេត ៖ បញ្ច្រាសនៃរស្មីសំយោគ" : "Notice · the exact reverse of photosynthesis"}
              </div>
              <div className="grid sm:grid-cols-2 gap-3 items-center">
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: BG, border: `1px solid ${LIME}33` }}
                >
                  <div className={`text-[10px] mb-1 ${k ? "font-khmer" : "font-mono uppercase"}`} style={{ color: LIME }}>
                    {k ? "រស្មីសំយោគ (ស្លឹក)" : "PHOTOSYNTHESIS (LEAF)"}
                  </div>
                  <div style={{ color: INK }}>
                    <InlineMath math={"6\\,CO_{2} + 6\\,H_{2}O + \\text{light} \\to C_{6}H_{12}O_{6} + 6\\,O_{2}"} />
                  </div>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: BG, border: `1px solid ${TEAL}55` }}
                >
                  <div className={`text-[10px] mb-1 ${k ? "font-khmer" : "font-mono uppercase"}`} style={{ color: TEAL }}>
                    {k ? "ការដកដង្ហើម (កោសិកា)" : "RESPIRATION (CELL)"}
                  </div>
                  <div style={{ color: INK }}>
                    <InlineMath math={"C_{6}H_{12}O_{6} + 6\\,O_{2} \\to 6\\,CO_{2} + 6\\,H_{2}O + \\text{ATP}"} />
                  </div>
                </div>
              </div>
              <P
                k={k}
                en="Plants build the sugar from sunlight, water and carbon dioxide. Animals — and that is us — pry the same sugar back apart, exhale the carbon dioxide, sweat the water, and pocket the energy. The two equations together are the great loop that keeps the biosphere alive."
                kh="រុក្ខជាតិសាងស្ករពីពន្លឺព្រះអាទិត្យ ទឹក និងកាបូនឌីអុកស៊ីត។ សត្វ — និងនេះគឺយើង — ហែកស្ករដូចគ្នានោះបែកវិញ ដកដង្ហើមចេញកាបូនឌីអុកស៊ីត ញើសទឹក និងដាក់ថាមពលចូលហោប៉ៅ។ សមីការទាំងពីររួមគ្នាជាខ្សែបង្វិលធំដែលរក្សាជីវមណ្ឌលឲ្យរស់។"
                className="text-xs mt-3"
              />
            </div>

            {/* The 4 stages */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { en: "01 · Glycolysis", kh: "០១ · គ្លីកូលីស",   loc: { en: "cytoplasm",   kh: "ស៊ីតូប្លាស្ម" },         atp: "+2",  accent: LIME },
                { en: "02 · Krebs cycle", kh: "០២ · វដ្តក្រែប",   loc: { en: "matrix",      kh: "ម៉ាទ្រីស" },             atp: "+2",  accent: ROSE },
                { en: "03 · ETC",        kh: "០៣ · ETC",         loc: { en: "inner membrane", kh: "ភ្នាសខាងក្នុង" },     atp: "—",   accent: AMBER },
                { en: "04 · ATP synthase", kh: "០៤ · ទួរប៊ីន ATP synthase", loc: { en: "the turbine", kh: "ទួរប៊ីន" },              atp: "+30", accent: MAGENTA },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border"
                  style={{
                    backgroundColor: PANEL,
                    borderColor: `${s.accent}55`,
                  }}
                >
                  <div className={`text-[11px] font-bold ${k ? "font-khmer" : "font-mono"}`} style={{ color: s.accent }}>
                    {k ? toKhNum(s.kh) : s.en}
                  </div>
                  <div className={`text-[10px] mt-1 ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
                    {k ? s.loc.kh : s.loc.en}
                  </div>
                  <div className="text-sm font-extrabold mt-2 font-mono" style={{ color: INK }}>
                    {k ? toKhNum(s.atp) : s.atp} <span className="font-mono text-[10px]" style={{ color: INK_SOFT }}>ATP</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        {/* CHAPTER 2 — Cytoplasm */}
        <section className="mb-12">
          <H2 k={k} en="The cytoplasm: breaking & re-making sugar" kh="ស៊ីតូប្លាស្ម ៖ ការបំបែក និងបង្កើតស្ករឡើងវិញ" Icon={Scissors} accent={LIME} />

          <P
            k={k}
            en="Long before any glucose ever reaches the mitochondria, the cell does some quick preparation in the cytoplasm — the watery jelly that fills every cell. Two opposite processes live here: one that smashes glucose apart for fast energy, and one that builds it back when food runs out."
            kh="មុនពេលគ្លុយកូសណាមួយទៅដល់មីតូកុងឌ្រី កោសិកាធ្វើការរៀបចំរហ័សនៅក្នុងស៊ីតូប្លាស្ម — ខ្ទះទឹកដែលបំពេញកោសិកានីមួយៗ។ ដំណើរការផ្ទុយគ្នាពីរ រស់នៅទីនេះ ៖ មួយបំបែកគ្លុយកូសសម្រាប់ថាមពលរហ័ស និងមួយទៀតសាងវាឡើងវិញពេលអស់ម្ហូប។"
            className="-mt-2 mb-5"
          />

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Glycolysis */}
            <Panel accent={LIME} testId="glycolysis-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <StageBadge k={k} en="The Prep Room" kh="បន្ទប់ត្រៀម" accent={LIME} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "គ្លីកូលីស" : "Glycolysis"}
                </h3>
              </div>
              <P
                k={k}
                en="A 6-carbon glucose molecule arrives. The cell snaps it cleanly in half, leaving two 3-carbon fragments called pyruvate. The whole job takes a fraction of a second and happens entirely outside the mitochondria — but it only releases a small amount of energy (about 2 ATP per glucose). Glycolysis is fast and ancient: every living thing on Earth, from bacteria to blue whales, does it the same way."
                kh="ម៉ូលេគុលគ្លុយកូសមានកាបូន ៦ មកដល់។ កោសិកាបាក់វាជាពីរស្មើគ្នា ទុកបំណែកកាបូន ៣ ពីរ ហៅថាពីរុយវ៉ាត់។ ការងារទាំងមូលប្រើតែប៉ុន្មានភាគនៃវិនាទី និងកើតឡើងទាំងស្រុងនៅខាងក្រៅមីតូកុងឌ្រី — ប៉ុន្តែវាបញ្ចេញតែថាមពលបន្តិចបន្តួច (ប្រហែល ២ ATP ក្នុងគ្លុយកូសមួយ)។ គ្លីកូលីសលឿន និងចាស់ ៖ រាល់សត្វមានជីវិតនៅលើផែនដី តាំងពីបាក់តេរីដល់ត្រីបាឡែនពណ៌ខៀវ ធ្វើវាដូចគ្នា។"
                className="text-sm mb-4"
              />
              <GlycolysisDiagram k={k} />
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                <Stat k={k} enLabel="speed"     khLabel="ល្បឿន"    value={k ? "< ១ វិនាទី" : "< 1 sec"} accent={LIME} />
                <Stat k={k} enLabel="ATP yield" khLabel="ផល ATP"   value={k ? "+ ២" : "+ 2"} accent={MAGENTA} />
                <Stat k={k} enLabel="O₂ needed" khLabel="O₂ ត្រូវការ" value={k ? "ទេ" : "no"} accent={SKY} />
              </div>
            </Panel>

            {/* Gluconeogenesis */}
            <Panel accent={SKY} testId="gluconeogenesis-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <StageBadge k={k} en="Emergency Backup" kh="ប្រព័ន្ធបម្រុងសង្គ្រោះ" accent={SKY} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "ការបង្កើតគ្លុយកូសថ្មី" : "Gluconeogenesis"}
                </h3>
              </div>
              <P
                k={k}
                en="When you go many hours without eating — fasting, a long sleep, a missed meal — your blood sugar starts to drop. The brain panics first because it can only burn glucose. So the liver runs glycolysis backwards: it stitches the small leftover pieces (lactate, certain amino acids, glycerol from fat) back together into brand-new glucose molecules and pumps them into the bloodstream. It is a slow, expensive process — but it is the reason you do not faint between dinner and breakfast."
                kh="នៅពេលអ្នកមិនបរិភោគរយៈពេលច្រើនម៉ោង — ការតមអាហារ ការដេកវែង មុខម្ហូបដែលខកខាន — ស្ករក្នុងឈាមរបស់អ្នកចាប់ផ្ដើមធ្លាក់។ ខួរក្បាលភ័យដំបូង ព្រោះវាអាចដុតបានតែគ្លុយកូស។ ដូច្នេះថ្លើមដំណើរការគ្លីកូលីសបញ្ច្រាស ៖ វាដេរបំណែកតូចសល់ (ឡាក់តាត់ អាស៊ីតអាមីណូជាក់លាក់ ក្លីសេរ៉ុលពីខ្លាញ់) ឲ្យក្លាយជាម៉ូលេគុលគ្លុយកូសថ្មី និងបូមពួកវាចូលទៅក្នុងឈាម។ វាជាដំណើរការយឺត និងថ្លៃ — ប៉ុន្តែវាជាមូលហេតុដែលអ្នកមិនសន្លប់នៅចន្លោះអាហារពេលល្ងាច និងពេលព្រឹក។"
                className="text-sm mb-4"
              />
              <GluconeogenesisDiagram k={k} />
              <div className={`mt-3 text-[11px] flex items-start gap-2 ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                <Brain className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: SKY }} />
                <span>
                  {k
                    ? "ការពិតគួរឲ្យចាប់អារម្មណ៍ ៖ ខួរក្បាលរបស់មនុស្សពេញវ័យ ទាមទារគ្លុយកូសប្រហែល ១២០ ក្រាមក្នុងមួយថ្ងៃ — ប្រហែល ៦០ ភាគរយនៃការប្រើគ្លុយកូសសរុបរបស់រាងកាយខណៈដេក។"
                    : "Fun fact: an adult brain demands about 120 grams of glucose per day — roughly 60 % of the body's total glucose use during sleep."}
                </span>
              </div>
            </Panel>
          </div>
        </section>

        {/* CHAPTER 3 — Inside the mitochondria */}
        <section className="mb-12">
          <H2 k={k} en="Inside the mitochondria" kh="ខាងក្នុងមីតូកុងឌ្រី" Icon={Factory} accent={ROSE} />
          <P
            k={k}
            en="The two pyruvates leave the cytoplasm and slip through the double wall of the mitochondrion — the cell's actual power plant. Each mitochondrion has an outer membrane (the building's outside wall) and a heavily-folded inner membrane (the boiler-room machinery), with a narrow gap between them. That gap is the secret to the whole operation: it is the room where pressure will be built."
            kh="ពីរុយវ៉ាត់ទាំងពីរ ចាកចេញពីស៊ីតូប្លាស្ម និងជ្រាបឆ្លងជញ្ជាំងទ្វេនៃមីតូកុងឌ្រី — រោងចក្រថាមពលពិតប្រាកដរបស់កោសិកា។ មីតូកុងឌ្រីនីមួយៗមានភ្នាសខាងក្រៅ (ជញ្ជាំងខាងក្រៅអគារ) និងភ្នាសខាងក្នុងបត់យ៉ាងច្រើន (ម៉ាស៊ីនបន្ទប់ឆ្នាំង) ដែលមានគម្លាតតូចនៅចន្លោះវា។ គម្លាតនោះជាអាថ៌កំបាំងនៃប្រតិបត្តិការទាំងមូល ៖ វាជាបន្ទប់ដែលសម្ពាធនឹងត្រូវសាង។"
            className="-mt-2 mb-5"
          />

          <div className="grid lg:grid-cols-5 gap-5">
            {/* Mitochondria diagram — bigger */}
            <div className="lg:col-span-3">
              <Panel accent={ROSE} testId="mitochondria-diagram">
                <div className={`text-xs mb-2 font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: ROSE }}>
                  {k ? "កាត់ឆ្លងមីតូកុងឌ្រី (ផ្នែកខ្វែង)" : "MITOCHONDRION · CROSS-SECTION"}
                </div>
                <MitochondriaDiagram k={k} />
                <div className={`text-[11px] mt-3 italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
                  {k
                    ? "ភ្នាសខាងក្នុងបត់ច្រើន (cristae) ដើម្បីបង្កើនផ្ទៃប្រតិកម្ម — កោសិកាសាច់ដុំបេះដូងអាចមានក្រិសតាជាង ១០,០០០ ក្នុងមីតូកុងឌ្រីនីមួយៗ។"
                    : "The inner membrane folds extensively (cristae) to maximise reaction surface — heart-muscle cells can pack over 10,000 cristae into a single mitochondrion."}
                </div>
              </Panel>
            </div>

            {/* Krebs cycle minecart explainer */}
            <div className="lg:col-span-2">
              <Panel accent={ROSE} testId="krebs-panel">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <StageBadge k={k} en="Misconception alert" kh="ការយល់ខុសទូទៅ" accent={ROSE} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "វដ្តក្រែប (Krebs / Citric Acid Cycle)" : "The Krebs / Citric Acid Cycle"}
                </h3>
                <P
                  k={k}
                  en="The Krebs cycle does NOT make much energy directly. That is the most common mistake students make. Instead, its real job is to act like a coal-loading station: it takes the broken sugar pieces, snaps high-energy electrons off them, and loads those electrons into special carrier molecules called NADH and FADH₂ — like loading coal into minecarts. Those minecarts then trundle off to the real power station next door."
                  kh="វដ្តក្រែបមិនបង្កើតថាមពលច្រើនដោយផ្ទាល់ទេ។ នោះជាកំហុសទូទៅបំផុតដែលសិស្សធ្វើ។ ផ្ទុយទៅវិញ ការងារពិតរបស់វាគឺដូចជាស្ថានីយដាក់ធ្យូងថ្ម ៖ វាយកបំណែកស្ករដែលបាក់ ដកអេឡិចត្រុងថាមពលខ្ពស់ចេញពីពួកវា និងផ្ទុកអេឡិចត្រុងទាំងនោះទៅក្នុងម៉ូលេគុលដឹកជញ្ជូនពិសេសហៅថា NADH និង FADH₂ — ដូចជាការផ្ទុកធ្យូងចូលទៅក្នុងរទេះធ្យូង។ បន្ទាប់មក រទេះធ្យូងទាំងនោះធ្វើដំណើរទៅរោងចក្រថាមពលពិតប្រាកដនៅជិត។"
                  className="text-sm mb-4"
                />
                <KrebsMinecartDiagram k={k} />
              </Panel>
            </div>
          </div>
        </section>

        {/* CHAPTER 4 — ETC + ATP synthase */}
        <section className="mb-12">
          <H2 k={k} en="The electron transport chain & the spinning turbine" kh="ខ្សែសង្វាក់ដឹកជញ្ជូនអេឡិចត្រុង និងទួរប៊ីនបង្វិល" Icon={Zap} accent={AMBER} />
          <P
            k={k}
            en="This is the main engine of the entire cell — the place where ~30 of every glucose's 34 ATP get made. The minecarts (NADH and FADH₂) arrive at the inner membrane and dump their high-energy electrons into a chain of four giant protein complexes. As the electrons hop down the chain (always falling to a lower energy state, the way water falls through a series of waterwheels), the energy released at each drop is used to physically pump protons (H⁺) from the matrix into the intermembrane space. Pressure builds. And builds. And builds — until protons are crowded against the wall like steam in a kettle."
            kh="នេះជាម៉ាស៊ីនមេនៃកោសិកាទាំងមូល — កន្លែងដែល ~៣០ ក្នុង ៣៤ ATP រាល់គ្លុយកូសត្រូវបានបង្កើត។ រទេះធ្យូង (NADH និង FADH₂) មកដល់ភ្នាសខាងក្នុង និងចាក់អេឡិចត្រុងថាមពលខ្ពស់របស់ពួកវាចូលទៅក្នុងខ្សែសង្វាក់នៃកំប្លិចប្រូតេអ៊ីនយក្សបួន។ នៅពេលអេឡិចត្រុងលោតចុះតាមខ្សែសង្វាក់ (តែងតែធ្លាក់ទៅសភាពថាមពលទាប ដូចទឹកធ្លាក់ឆ្លងកាត់កង់ទឹកជាបន្តបន្ទាប់) ថាមពលដែលបញ្ចេញនៅរាល់ការធ្លាក់ ត្រូវបានប្រើដើម្បីបូមប្រូតុង (H⁺) រូបវន្ដ ពីម៉ាទ្រីសចូលទៅក្នុងចន្លោះភ្នាស។ សម្ពាធកើនឡើង។ ហើយកើនឡើង។ ហើយកើនឡើង — រហូតប្រូតុងត្រូវបានច្រាសប្រើនឹងជញ្ជាំង ដូចចំហាយនៅក្នុងឆ្នាំង។"
            className="-mt-2 mb-5"
          />

          <Panel accent={AMBER} testId="etc-diagram">
            <ETCDiagram k={k} />
          </Panel>

          <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <Panel accent={MAGENTA} testId="atpsynthase-panel">
              <div className="flex items-center gap-2 mb-3">
                <RotateCw className="w-5 h-5" style={{ color: MAGENTA }} />
                <h3 className={`text-lg font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "ATP Synthase ៖ ទួរប៊ីនរស់" : "ATP Synthase: a living turbine"}
                </h3>
              </div>
              <P
                k={k}
                en="The pressure in the intermembrane space has only one way out: a beautiful, microscopic protein machine called ATP synthase, planted right through the inner wall like a turbine in a dam. As protons rush back through it down the pressure gradient, they physically spin a rotor — researchers have actually filmed it turning at over 100 revolutions per second. Each full turn squeezes three molecules of ADP and three phosphates together, producing three molecules of ATP. The smallest motor that has ever been built, by anyone, was built by life billions of years ago, and one is whirring inside every cell of you right now."
                kh="សម្ពាធនៅក្នុងចន្លោះភ្នាស មានផ្លូវចេញតែមួយ ៖ ម៉ាស៊ីនប្រូតេអ៊ីនមីក្រូដ៏ស្រស់ស្អាតឈ្មោះ ATP synthase បានដាំដោយផ្ទាល់ឆ្លងកាត់ជញ្ជាំងខាងក្នុង ដូចទួរប៊ីននៅក្នុងទំនប់។ នៅពេលប្រូតុងចូលមកវិញតាមរយៈវា ធ្លាក់ចុះតាមទឹកតម្រេច ពួកវាបង្វិលរ៉ូទ័ររូបវន្ដ — អ្នកស្រាវជ្រាវបានថតវាបង្វិលលើស ១០០ ជុំក្នុងមួយវិនាទី។ រាល់ការបង្វិលពេញ ច្របាច់ ៣ ម៉ូលេគុល ADP និង ៣ ផូស្វាតរួមគ្នា ផលិត ATP ៣ ម៉ូលេគុល។ ម៉ូទ័រតូចបំផុតដែលធ្លាប់ត្រូវបានសាង ដោយនរណាម្នាក់ ត្រូវបានសាងដោយជីវិតពីពាន់លានឆ្នាំមុន ហើយមួយកំពុងបង្វិលនៅក្នុងកោសិកានីមួយៗរបស់អ្នកឥឡូវនេះ។"
                className="text-sm mb-4"
              />
              <ATPSynthaseDiagram k={k} />
            </Panel>

            <Panel accent={MAGENTA} testId="energy-tally">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-5 h-5" style={{ color: MAGENTA }} />
                <h3 className={`text-lg font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "ការគណនាថាមពលចុងក្រោយ" : "The final energy tally"}
                </h3>
              </div>
              <EnergyTally k={k} />
              <P
                k={k}
                en="From a single grain of glucose, the cell extracts about 34 ATP — roughly seventeen times what glycolysis alone could squeeze out. That gigantic multiplication is the entire reason your body bothers to maintain mitochondria, breathe oxygen, and keep your heart beating. Without the spinning turbine, a human being could not power even one heartbeat for one minute."
                kh="ពីគ្រាប់គ្លុយកូសតែមួយ កោសិកាដកបាន ATP ប្រហែល ៣៤ — ប្រហែលដប់ប្រាំពីរដងនៃអ្វីដែលគ្លីកូលីសតែមួយអាចច្របាច់ចេញ។ ការគុណយ៉ាងធំនោះ ជាមូលហេតុទាំងមូលដែលរាងកាយរបស់អ្នកព្យាយាមរក្សាមីតូកុងឌ្រី ដកដង្ហើមអុកស៊ីសែន និងរក្សាបេះដូងរបស់អ្នកឲ្យដើរ។ បើគ្មានទួរប៊ីនបង្វិល មនុស្សម្នាក់មិនអាចផ្ដល់ថាមពលដល់សូម្បីបេះដូងមួយដងក្នុងមួយនាទីទេ។"
                className="text-xs mt-3"
              />
            </Panel>
          </div>
        </section>

        {/* Closing reflection */}
        <Panel accent={TEAL} testId="closing-panel">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
            <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
              {k
                ? "មនុស្សពេញវ័យធម្មតាប្រើ ATP ប្រហែលទម្ងន់ខ្លួនពេញ ៥០ គីឡូក្រាមក្នុងមួយថ្ងៃ — ប៉ុន្តែនៅពេលណាមួយ រាងកាយផ្ទុកត្រឹមតែ ៥០ ក្រាមនៃវាប៉ុណ្ណោះ។ ដែលមានន័យថា អាគុយតូចនីមួយៗត្រូវបានបោះចោល បំបែក និងសាងសង់ឡើងវិញរាប់ពាន់ដងក្នុងមួយថ្ងៃ។ បន្ទាប់ពេលដែលអ្នកបរិភោគបាយ ខាំនីមួយៗ កំពុងផ្ដល់អាហារដល់ទួរប៊ីនរាប់ពាន់លានដែលបង្វិលដោយស្ងាត់នៅក្នុងអ្នក។"
                : "An average adult uses roughly their own body weight — about 50 kg — of ATP per day, but at any moment the body holds only ~50 grams of it. Which means each tiny battery is thrown away, broken down and rebuilt thousands of times per day. The next time you eat a bowl of rice, every chew is feeding the billions of turbines spinning quietly inside you."}
            </p>
          </div>
        </Panel>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: TEAL, color: BG, boxShadow: `0 0 28px -10px ${TEAL}` }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Hero backdrop — slow factory steam plumes + circuit grid
// ════════════════════════════════════════════════════════════════════════════
function PowerPlantBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      viewBox="0 0 460 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ppGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.5" />
          <stop offset="60%" stopColor={COPPER} stopOpacity="0.18" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Background blobs */}
      <circle cx="380" cy="60" r="90" fill="url(#ppGlow)">
        <animate attributeName="r" values="80;110;80" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="200" r="70" fill="url(#ppGlow)">
        <animate attributeName="r" values="60;90;60" dur="7s" repeatCount="indefinite" />
      </circle>
      {/* Pipework lines */}
      {[40, 90, 140, 190].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="460" y2={y + 5} stroke={`${TEAL}33`} strokeWidth="0.5" strokeDasharray="2 6" />
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Glycolysis: 6-carbon glucose → 2× 3-carbon pyruvate
// ════════════════════════════════════════════════════════════════════════════
function GlycolysisDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${LIME}55` }}>
      <svg viewBox="0 0 420 150" className="w-full h-auto" role="img" aria-label={k ? "ដ្យាក្រាមគ្លីកូលីស ៖ គ្លុយកូស ៦-កាបូន បំបែកជាពីរុយវ៉ាត់ ៣-កាបូន ពីរ" : "Glycolysis: 6-carbon glucose splits into two 3-carbon pyruvates"}>
        {/* Glucose hexagon */}
        <g transform="translate(20,40)">
          <polygon points="35,0 70,17 70,53 35,70 0,53 0,17" fill={`${LIME}33`} stroke={LIME} strokeWidth="1.4" />
          {[1,2,3,4,5,6].map(i => {
            const ang = (Math.PI/3)*(i-1) - Math.PI/2;
            const x = 35 + 22*Math.cos(ang);
            const y = 35 + 22*Math.sin(ang);
            return <circle key={i} cx={x} cy={y} r="4" fill={LIME} />;
          })}
          <text x="35" y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace">C₆</text>
          <text x="35" y="92" textAnchor="middle" fontSize="10" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "គ្លុយកូស" : "glucose"}
          </text>
        </g>

        {/* Scissors / arrow */}
        <g transform="translate(110,55)">
          <line x1="0" y1="20" x2="80" y2="20" stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 3" />
          <text x="40" y="14" textAnchor="middle" fontSize="9" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "បំបែក" : "snap"}
          </text>
          <text x="40" y="35" textAnchor="middle" fontSize="9" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "+ ២ ATP" : "+ 2 ATP"}
          </text>
          <polygon points="80,20 70,15 70,25" fill={AMBER} />
        </g>

        {/* Two pyruvates */}
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(220,${15 + i * 70})`}>
            <rect x="0" y="0" width="60" height="40" rx="8" fill={`${ROSE}33`} stroke={ROSE} strokeWidth="1.4" />
            {[0,1,2].map(j => <circle key={j} cx={12 + j*18} cy="20" r="4" fill={ROSE} />)}
            <text x="30" y="24" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace">C₃</text>
            <text x="30" y="55" textAnchor="middle" fontSize="9" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ពីរុយវ៉ាត់" : "pyruvate"}
            </text>
          </g>
        ))}

        {/* Down arrow to mitochondria */}
        <g transform="translate(310,55)">
          <line x1="0" y1="20" x2="80" y2="20" stroke={ROSE} strokeWidth="1.2" markerEnd="" />
          <polygon points="80,20 70,15 70,25" fill={ROSE} />
          <text x="40" y="14" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ទៅមីតូកុងឌ្រី" : "to mitochondria"}
          </text>
        </g>
        <g transform="translate(395,45)">
          <Activity_Icon />
        </g>
      </svg>
    </div>
  );
}

function Activity_Icon() {
  return (
    <g>
      <rect x="-10" y="0" width="20" height="30" rx="3" fill={`${ROSE}33`} stroke={ROSE} strokeWidth="1" />
      <text x="0" y="20" textAnchor="middle" fontSize="10" fill={ROSE}>M</text>
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Gluconeogenesis: small pieces → glucose (reverse arrow), liver → brain
// ════════════════════════════════════════════════════════════════════════════
function GluconeogenesisDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${SKY}55` }}>
      <svg viewBox="0 0 420 150" className="w-full h-auto" role="img" aria-label={k ? "ការបង្កើតគ្លុយកូសថ្មី ៖ បំណែកតូច ត្រូវបានដេរឡើងវិញជាគ្លុយកូស នៅក្នុងថ្លើម ផ្ញើទៅខួរក្បាល" : "Gluconeogenesis: small pieces stitched back into glucose in the liver, sent to the brain"}>
        {/* Small fragments */}
        <g transform="translate(10,30)">
          {["lactate", "amino", "glycerol"].map((label, i) => (
            <g key={label} transform={`translate(0,${i * 30})`}>
              <rect x="0" y="0" width="55" height="22" rx="6" fill={`${SKY}22`} stroke={SKY} strokeWidth="1" />
              <text x="27.5" y="14" textAnchor="middle" fontSize="9" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? ["ឡាក់តាត់", "អាមីណូ", "ក្លីសេរ៉ុល"][i] : label}
              </text>
            </g>
          ))}
        </g>

        {/* Liver factory */}
        <g transform="translate(120,40)">
          <rect x="0" y="0" width="100" height="70" rx="8" fill={PANEL_2} stroke={SKY} strokeWidth="1.4" />
          <text x="50" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ថ្លើម" : "LIVER"}
          </text>
          <text x="50" y="42" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ដេរឡើងវិញ" : "stitches"}
          </text>
          <text x="50" y="56" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ទៅគ្លុយកូស" : "into glucose"}
          </text>
          {/* Reverse arrow icon */}
          <g transform="translate(80,5)">
            <circle cx="0" cy="0" r="8" fill={SKY} />
            <text x="0" y="3" textAnchor="middle" fontSize="11" fill={BG} fontFamily="monospace">↺</text>
          </g>
        </g>

        {/* Arrow to glucose */}
        <line x1="65" y1="50" x2="120" y2="60" stroke={SKY} strokeWidth="1.3" />
        <line x1="65" y1="80" x2="120" y2="80" stroke={SKY} strokeWidth="1.3" />
        <line x1="65" y1="110" x2="120" y2="100" stroke={SKY} strokeWidth="1.3" />

        {/* New glucose */}
        <g transform="translate(245,40)">
          <polygon points="35,0 70,17 70,53 35,70 0,53 0,17" fill={`${LIME}33`} stroke={LIME} strokeWidth="1.4" />
          <text x="35" y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace">C₆</text>
          <text x="35" y="92" textAnchor="middle" fontSize="9" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "គ្លុយកូសថ្មី" : "new glucose"}
          </text>
        </g>

        {/* Arrow to brain */}
        <line x1="320" y1="75" x2="370" y2="75" stroke={LIME} strokeWidth="1.4" markerEnd="" />
        <polygon points="370,75 360,70 360,80" fill={LIME} />

        {/* Brain target */}
        <g transform="translate(370,55)">
          <circle cx="20" cy="20" r="20" fill={`${SKY}22`} stroke={SKY} strokeWidth="1.4" />
          <text x="20" y="24" textAnchor="middle" fontSize="14">🧠</text>
          <text x="20" y="55" textAnchor="middle" fontSize="9" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ខួរក្បាល" : "brain"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Mitochondrion cross-section
// ════════════════════════════════════════════════════════════════════════════
function MitochondriaDiagram({ k }: { k: boolean }) {
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" role="img" aria-label={k ? "ដ្យាក្រាមមីតូកុងឌ្រី ៖ ភ្នាសខាងក្រៅ ភ្នាសខាងក្នុងបត់ (cristae) ចន្លោះភ្នាស និងម៉ាទ្រីស" : "Mitochondrion: outer membrane, folded inner membrane (cristae), intermembrane space, and matrix"}>
      <defs>
        <radialGradient id="matrixFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${ROSE}33`} />
          <stop offset="100%" stopColor={`${ROSE}11`} />
        </radialGradient>
      </defs>

      {/* Outer membrane (smooth ellipse) */}
      <ellipse cx="240" cy="140" rx="200" ry="100" fill={PANEL} stroke={TEAL} strokeWidth="2.4" />

      {/* Intermembrane space band */}
      <ellipse cx="240" cy="140" rx="190" ry="92" fill="none" stroke={`${COPPER}88`} strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Inner membrane with cristae folds */}
      <path
        d="M 60 140
           Q 80 70, 110 140
           Q 140 210, 170 140
           Q 200 70, 230 140
           Q 260 210, 290 140
           Q 320 70, 350 140
           Q 380 210, 410 140"
        fill="none"
        stroke={ROSE}
        strokeWidth="2"
      />
      {/* Inner area filled */}
      <ellipse cx="240" cy="140" rx="180" ry="80" fill="url(#matrixFill)" stroke="none" />

      {/* H+ protons in intermembrane space */}
      {[
        { x: 90, y: 95 }, { x: 130, y: 80 }, { x: 175, y: 75 }, { x: 220, y: 72 },
        { x: 265, y: 75 }, { x: 310, y: 80 }, { x: 355, y: 88 }, { x: 390, y: 100 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill={COPPER} />
          <text x={p.x} y={p.y + 2} textAnchor="middle" fontSize="6" fill={BG} fontFamily="monospace" fontWeight="bold">+</text>
        </g>
      ))}

      {/* ETC complexes I, II, III, IV embedded in inner membrane */}
      {[
        { x: 100, y: 130, label: "I"   },
        { x: 180, y: 130, label: "II"  },
        { x: 260, y: 130, label: "III" },
        { x: 340, y: 130, label: "IV"  },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x - 14} y={c.y - 10} width="28" height="22" rx="4" fill={AMBER} stroke={ROSE} strokeWidth="1" />
          <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">{c.label}</text>
        </g>
      ))}

      {/* ATP synthase turbine */}
      <g transform="translate(400,120)">
        <rect x="-10" y="0" width="20" height="22" rx="3" fill={MAGENTA} />
        <circle cx="0" cy="32" r="14" fill={`${MAGENTA}77`} stroke={MAGENTA} strokeWidth="1.4">
          <animateTransform attributeName="transform" type="rotate" from="0 0 32" to="360 0 32" dur="3s" repeatCount="indefinite" />
        </circle>
        <line x1="-12" y1="32" x2="12" y2="32" stroke={MAGENTA} strokeWidth="1.4">
          <animateTransform attributeName="transform" type="rotate" from="0 0 32" to="360 0 32" dur="3s" repeatCount="indefinite" />
        </line>
        <text x="0" y="60" textAnchor="middle" fontSize="9" fill={MAGENTA} fontFamily="monospace">ATP</text>
      </g>

      {/* Labels with leader lines */}
      {[
        { x: 240, y: 30,  en: "outer membrane",     kh: "ភ្នាសខាងក្រៅ",        color: TEAL,    lx: 240, ly: 40,  tx: 240, ty: 25 },
        { x: 240, y: 50,  en: "intermembrane space (proton store)", kh: "ចន្លោះភ្នាស (ឃ្លាំងប្រូតុង)", color: COPPER, lx: 60, ly: 100,  tx: 80, ty: 60 },
        { x: 240, y: 175, en: "inner membrane (cristae)", kh: "ភ្នាសខាងក្នុង (cristae)", color: ROSE,   lx: 240, ly: 175, tx: 240, ty: 200 },
        { x: 240, y: 240, en: "matrix · Krebs cycle here", kh: "ម៉ាទ្រីស · វដ្តក្រែបនៅទីនេះ", color: ROSE,   lx: 240, ly: 220, tx: 240, ty: 250 },
      ].map((lb, i) => (
        <g key={i}>
          <text x={lb.tx} y={lb.ty} textAnchor="middle" fontSize="10" fontWeight="bold" fill={lb.color} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? lb.kh : lb.en}
          </text>
        </g>
      ))}

      {/* Legend bottom */}
      <g transform="translate(20,260)">
        <circle cx="6" cy="0" r="5" fill={COPPER} />
        <text x="6" y="2" textAnchor="middle" fontSize="6" fill={BG} fontWeight="bold">+</text>
        <text x="18" y="3" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>{k ? "ប្រូតុង H⁺" : "proton H⁺"}</text>

        <rect x="105" y="-6" width="14" height="12" rx="2" fill={AMBER} />
        <text x="124" y="3" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>{k ? "កំប្លិច ETC I-IV" : "ETC complex I–IV"}</text>

        <circle cx="240" cy="0" r="5" fill={MAGENTA} />
        <text x="252" y="3" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>{k ? "ទួរប៊ីន ATP synthase" : "ATP synthase"}</text>
      </g>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Krebs cycle as a circular minecart loop
// ════════════════════════════════════════════════════════════════════════════
function KrebsMinecartDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${ROSE}55` }}>
      <svg viewBox="0 0 280 220" className="w-full h-auto" role="img" aria-label={k ? "វដ្តក្រែប ៖ រង្វង់ដែលផ្ទុកអេឡិចត្រុងចូល NADH និង FADH₂" : "Krebs cycle: a loop loading electrons into NADH and FADH₂ minecarts"}>
        {/* Track circle */}
        <circle cx="140" cy="110" r="70" fill="none" stroke={ROSE} strokeWidth="2" strokeDasharray="4 4" />
        {/* Center label */}
        <text x="140" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "វដ្តក្រែប" : "KREBS"}
        </text>
        <text x="140" y="120" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "៨ ជំហាន" : "8 steps"}
        </text>

        {/* Pyruvate enters at top */}
        <g transform="translate(120,15)">
          <rect x="0" y="0" width="40" height="20" rx="6" fill={`${ROSE}33`} stroke={ROSE} strokeWidth="1" />
          <text x="20" y="13" textAnchor="middle" fontSize="9" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ពីរុយវ៉ាត់" : "pyruvate"}
          </text>
        </g>
        <line x1="140" y1="35" x2="140" y2="42" stroke={ROSE} strokeWidth="1.5" />

        {/* Eight stop markers */}
        {[0,1,2,3,4,5,6,7].map(i => {
          const a = (Math.PI*2/8)*i - Math.PI/2;
          const x = 140 + 70*Math.cos(a);
          const y = 110 + 70*Math.sin(a);
          return <circle key={i} cx={x} cy={y} r="3" fill={ROSE} />;
        })}

        {/* CO2 escape arrows (×2) */}
        {[40, 240].map((deg, i) => {
          const a = deg * Math.PI/180;
          const x = 140 + 70*Math.cos(a);
          const y = 110 + 70*Math.sin(a);
          const x2 = 140 + 95*Math.cos(a);
          const y2 = 110 + 95*Math.sin(a);
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x2} y2={y2} stroke={SKY} strokeWidth="1" />
              <text x={x2 + (x2 > 140 ? 6 : -6)} y={y2 + 4} textAnchor={x2 > 140 ? "start" : "end"} fontSize="9" fill={SKY} fontFamily="monospace">CO₂↑</text>
            </g>
          );
        })}

        {/* Minecarts NADH/FADH2 leaving */}
        <g transform="translate(220,180)">
          <rect x="-20" y="-10" width="40" height="20" rx="3" fill={`${AMBER}33`} stroke={AMBER} strokeWidth="1.4" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill={AMBER} fontFamily="monospace">NADH</text>
          <circle cx="-12" cy="14" r="3" fill={AMBER} />
          <circle cx="12" cy="14" r="3" fill={AMBER} />
        </g>
        <g transform="translate(60,180)">
          <rect x="-20" y="-10" width="40" height="20" rx="3" fill={`${AMBER}33`} stroke={AMBER} strokeWidth="1.4" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill={AMBER} fontFamily="monospace">FADH₂</text>
          <circle cx="-12" cy="14" r="3" fill={AMBER} />
          <circle cx="12" cy="14" r="3" fill={AMBER} />
        </g>

        {/* Arrows from cycle to minecarts */}
        <line x1="180" y1="160" x2="210" y2="172" stroke={AMBER} strokeWidth="1.4" />
        <line x1="100" y1="160" x2="70"  y2="172" stroke={AMBER} strokeWidth="1.4" />

        {/* Footer */}
        <text x="140" y="210" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ដឹកជញ្ជូនអេឡិចត្រុងទៅភ្នាសខាងក្នុង" : "carrying electrons to the inner membrane"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Electron Transport Chain — long horizontal complex with descending arrow
// ════════════════════════════════════════════════════════════════════════════
function ETCDiagram({ k }: { k: boolean }) {
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto" role="img" aria-label={k ? "ខ្សែសង្វាក់ដឹកជញ្ជូនអេឡិចត្រុង ៖ កំប្លិច ៤ បូមប្រូតុងពីម៉ាទ្រីសទៅចន្លោះភ្នាស និងបង្វិលទួរប៊ីន ATP synthase" : "Electron transport chain: four complexes pump protons from matrix into intermembrane space, spinning the ATP synthase turbine"}>
      <defs>
        <linearGradient id="etcEnergy" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.95" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Intermembrane space label */}
      <rect x="40" y="20" width="640" height="56" fill={`${COPPER}11`} stroke={`${COPPER}55`} strokeWidth="1" strokeDasharray="3 3" />
      <text x="60" y="50" fontSize="11" fontWeight="bold" fill={COPPER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
        {k ? "ចន្លោះភ្នាស (សម្ពាធខ្ពស់)" : "INTERMEMBRANE SPACE (high pressure)"}
      </text>
      {[120, 180, 240, 300, 360, 420, 480, 540, 600].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={62} r="5" fill={COPPER} />
          <text x={x} y={64} textAnchor="middle" fontSize="6" fontWeight="bold" fill={BG} fontFamily="monospace">+</text>
        </g>
      ))}

      {/* Inner membrane band */}
      <rect x="40" y="76" width="640" height="80" fill={`${ROSE}11`} stroke={ROSE} strokeWidth="1.4" />

      {/* Complexes I, II, III, IV */}
      {[
        { x: 120, label: "I",   en: "Complex I",   kh: "កំប្លិច I"   },
        { x: 240, label: "II",  en: "Complex II",  kh: "កំប្លិច II"  },
        { x: 360, label: "III", en: "Complex III", kh: "កំប្លិច III" },
        { x: 480, label: "IV",  en: "Complex IV",  kh: "កំប្លិច IV"  },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x - 28} y={86} width="56" height="60" rx="4" fill={AMBER} stroke={ROSE} strokeWidth="1.2" />
          <text x={c.x} y={114} textAnchor="middle" fontSize="13" fontWeight="bold" fill={BG} fontFamily="monospace">{c.label}</text>
          <text x={c.x} y={170} textAnchor="middle" fontSize="9" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? c.kh : c.en}
          </text>
          {/* H+ pump arrow up */}
          {c.label !== "II" && (
            <g>
              <line x1={c.x} y1={84} x2={c.x} y2={66} stroke={COPPER} strokeWidth="2" />
              <polygon points={`${c.x},58 ${c.x - 5},68 ${c.x + 5},68`} fill={COPPER} />
            </g>
          )}
        </g>
      ))}

      {/* ATP synthase */}
      <g transform="translate(600,86)">
        <rect x="-22" y="0" width="44" height="60" rx="4" fill={MAGENTA} />
        <text x="0" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">ATP</text>
        <text x="0" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">synthase</text>
        {/* Spinning rotor */}
        <g transform="translate(0,55)">
          <circle r="14" fill={`${MAGENTA}66`} stroke={MAGENTA} strokeWidth="1.4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <line x1="-12" y1="0" x2="12" y2="0" stroke={MAGENTA} strokeWidth="1.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="-12" x2="0" y2="12" stroke={MAGENTA} strokeWidth="1.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite" />
          </line>
        </g>
        <text x="0" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill={MAGENTA} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ទួរប៊ីន" : "TURBINE"}
        </text>
        {/* H+ flowing back DOWN through the turbine */}
        <g>
          <line x1="0" y1="55" x2="0" y2="80" stroke={COPPER} strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="0,82 -5,72 5,72" fill={COPPER} />
        </g>
      </g>

      {/* Matrix label */}
      <rect x="40" y="156" width="640" height="60" fill={`${ROSE}06`} stroke={`${ROSE}44`} strokeWidth="1" strokeDasharray="3 3" />
      <text x="60" y="200" fontSize="11" fontWeight="bold" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
        {k ? "ម៉ាទ្រីស (សម្ពាធទាប)" : "MATRIX (low pressure)"}
      </text>

      {/* Electron path arrow over the chain */}
      <path d="M 110 96 Q 240 78, 360 96 T 540 96" fill="none" stroke="url(#etcEnergy)" strokeWidth="2.4" strokeDasharray="4 3" />
      <text x="350" y="86" textAnchor="middle" fontSize="9" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
        {k ? "អេឡិចត្រុងធ្លាក់" : "electrons fall"}
      </text>

      {/* O2 + 4H+ + 4e- → 2H2O (at complex IV) */}
      <g transform="translate(480,205)">
        <rect x="-50" y="-14" width="100" height="28" rx="6" fill={PANEL} stroke={SKY} strokeWidth="1.2" />
        <text x="0" y="3" textAnchor="middle" fontSize="9" fill={SKY} fontFamily="monospace">O₂ + 4H⁺ + 4e⁻</text>
        <text x="0" y="13" textAnchor="middle" fontSize="9" fill={SKY} fontFamily="monospace">→ 2 H₂O</text>
      </g>
      <line x1="480" y1="156" x2="480" y2="190" stroke={SKY} strokeWidth="1" strokeDasharray="2 2" />

      {/* ATP output */}
      <g transform="translate(600,228)">
        <rect x="-32" y="-14" width="64" height="28" rx="14" fill={MAGENTA} />
        <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill={BG} fontFamily="monospace">+ ATP</text>
      </g>

      {/* Title strip */}
      <text x="40" y="270" fontSize="10" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
        {k
          ? "កំប្លិច I → III → IV បូមប្រូតុងឡើងលើ ; ប្រូតុងធ្លាក់ត្រឡប់តាម ATP synthase ហើយបង្វិលវា។"
          : "Complexes I, III, IV pump protons up; protons fall back through ATP synthase and spin it."}
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ATP synthase close-up
// ════════════════════════════════════════════════════════════════════════════
function ATPSynthaseDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${MAGENTA}55` }}>
      <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label={k ? "ATP synthase ៖ ប្រូតុងធ្លាក់តាមរ៉ូទ័រ និងបង្វិលវា ផលិត ATP" : "ATP synthase: protons fall through the rotor, spinning it to make ATP"}>
        {/* Membrane band */}
        <rect x="20" y="80" width="280" height="40" fill={`${ROSE}22`} stroke={ROSE} strokeWidth="1" />

        {/* Top — intermembrane (high H+) */}
        <text x="30" y="50" fontSize="10" fontWeight="bold" fill={COPPER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សម្ពាធខ្ពស់" : "HIGH PRESSURE"}
        </text>
        {[60, 100, 200, 240].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={60} r="5" fill={COPPER} />
            <text x={x} y={62} textAnchor="middle" fontSize="6" fontWeight="bold" fill={BG} fontFamily="monospace">+</text>
          </g>
        ))}

        {/* F₀ rotor — embedded in inner membrane */}
        <g transform="translate(160,100)">
          <circle r="20" fill={`${MAGENTA}33`} stroke={MAGENTA} strokeWidth="1.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
          </circle>
          <line x1="-20" y1="0" x2="20" y2="0" stroke={MAGENTA} strokeWidth="1.4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="-20" x2="0" y2="20" stroke={MAGENTA} strokeWidth="1.4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
          </line>
        </g>
        <text x="206" y="103" fontSize="9" fill={MAGENTA} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "រ៉ូទ័រ F₀ (ក្នុងភ្នាស)" : "F₀ rotor (in membrane)"}
        </text>

        {/* Central stalk — connecting F0 in membrane DOWN to F1 head in matrix */}
        <rect x="156" y="120" width="8" height="30" fill={MAGENTA} />

        {/* F₁ head — hangs DOWN into matrix (low pressure side, where ATP is made) */}
        <ellipse cx="160" cy="160" rx="44" ry="16" fill={`${MAGENTA}55`} stroke={MAGENTA} strokeWidth="1.4" />
        <text x="160" y="164" textAnchor="middle" fontSize="10" fontWeight="bold" fill={MAGENTA} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ក្បាល F₁ (ក្នុងម៉ាទ្រីស)" : "F₁ head (in matrix)"}
        </text>

        {/* H+ flowing DOWN through the F0 rotor (intermembrane → matrix) */}
        <g>
          <line x1="148" y1="62" x2="148" y2="96" stroke={COPPER} strokeWidth="1.6" strokeDasharray="3 3" />
          <polygon points="148,96 143,86 153,86" fill={COPPER} />
          <line x1="172" y1="62" x2="172" y2="96" stroke={COPPER} strokeWidth="1.6" strokeDasharray="3 3" />
          <polygon points="172,96 167,86 177,86" fill={COPPER} />
          {/* H+ continues down through stalk into matrix */}
          <line x1="148" y1="106" x2="148" y2="138" stroke={COPPER} strokeWidth="1.4" strokeDasharray="2 2" opacity="0.6" />
          <line x1="172" y1="106" x2="172" y2="138" stroke={COPPER} strokeWidth="1.4" strokeDasharray="2 2" opacity="0.6" />
        </g>

        {/* Bottom — matrix (low pressure) */}
        <text x="30" y="195" fontSize="10" fontWeight="bold" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ម៉ាទ្រីស · សម្ពាធទាប · ផលិត ATP" : "MATRIX · LOW PRESSURE · ATP made"}
        </text>

        {/* ADP + P → ATP, both produced in/below the F1 head */}
        <g transform="translate(70,190)">
          <rect x="-30" y="-10" width="60" height="20" rx="10" fill={`${MAGENTA}22`} stroke={MAGENTA} strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fill={MAGENTA} fontFamily="monospace">ADP + P</text>
        </g>
        <line x1="100" y1="190" x2="135" y2="178" stroke={MAGENTA} strokeWidth="1.2" />
        <polygon points="135,178 125,178 130,184" fill={MAGENTA} />

        <line x1="190" y1="173" x2="225" y2="190" stroke={MAGENTA} strokeWidth="1.2" />
        <polygon points="225,190 215,190 220,184" fill={MAGENTA} />
        <g transform="translate(255,190)">
          <circle r="14" fill={MAGENTA} />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">ATP</text>
        </g>

        {/* Spin label — to the side of the rotor, no longer overlapping */}
        <text x="86" y="103" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "~ ១០០ ជុំ/វិនាទី" : "~100 rev/sec"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Final energy tally bar
// ════════════════════════════════════════════════════════════════════════════
function EnergyTally({ k }: { k: boolean }) {
  const rows = [
    { en: "Glycolysis (cytoplasm)",       kh: "គ្លីកូលីស (ស៊ីតូប្លាស្ម)",       atp: 2,  accent: LIME },
    { en: "Krebs cycle (matrix)",         kh: "វដ្តក្រែប (ម៉ាទ្រីស)",            atp: 2,  accent: ROSE },
    { en: "Electron transport + ATP synthase", kh: "ខ្សែសង្វាក់អេឡិចត្រុង + ទួរប៊ីន ATP synthase",         atp: 30, accent: MAGENTA },
  ];
  const total = rows.reduce((a, r) => a + r.atp, 0);
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i}>
          <div className="flex justify-between items-baseline mb-1">
            <span className={`text-[12px] ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
              {k ? r.kh : r.en}
            </span>
            <span className="text-sm font-extrabold font-mono" style={{ color: r.accent }}>
              {k ? toKhNum(r.atp) : r.atp} <span className="text-[10px]" style={{ color: INK_SOFT }}>ATP</span>
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: BG }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(r.atp / total) * 100}%`,
                background: `linear-gradient(90deg, ${r.accent}55, ${r.accent})`,
                boxShadow: `0 0 8px ${r.accent}`,
              }}
              role="progressbar"
              aria-valuenow={r.atp}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={k ? r.kh : r.en}
            />
          </div>
        </div>
      ))}
      <div className="mt-3 flex justify-between items-baseline pt-2 border-t" style={{ borderColor: RULE }}>
        <span className={`text-[13px] font-bold ${k ? "font-khmer" : "font-mono uppercase"}`} style={{ color: INK }}>
          {k ? "សរុបក្នុងគ្លុយកូស ១" : "TOTAL per glucose"}
        </span>
        <span className="text-2xl font-extrabold font-mono" style={{ color: MAGENTA, textShadow: `0 0 14px ${MAGENTA}99` }}>
          ≈ {k ? toKhNum(total) : total} ATP
        </span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════════════════════
function FormulaChip({
  k,
  symbol,
  enLabel,
  khLabel,
  Icon,
  accent,
}: {
  k: boolean;
  symbol: string;
  enLabel: string;
  khLabel: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div
      className="rounded-lg p-3 flex items-center gap-3 border"
      style={{ backgroundColor: PANEL_2, borderColor: `${accent}66` }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: accent }} />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-bold" style={{ color: accent }}>{symbol}</div>
        <div className={`text-[11px] truncate ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
          {k ? khLabel : enLabel}
        </div>
      </div>
    </div>
  );
}

function Stat({
  k,
  enLabel,
  khLabel,
  value,
  accent,
}: {
  k: boolean;
  enLabel: string;
  khLabel: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-md border p-2 text-center" style={{ backgroundColor: PANEL, borderColor: `${accent}55` }}>
      <div className={`text-[9px] mb-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: accent }}>
        {k ? khLabel : enLabel}
      </div>
      <div className={`text-sm font-bold ${k ? "font-khmer" : "font-mono"}`} style={{ color: INK }}>
        {value}
      </div>
    </div>
  );
}

// keep helper-icon imports referenced (some chapters share these icons)
const _iconKeep: React.ComponentType[] = [Combine, Cog, Droplets, HeartPulse, Layers];
void _iconKeep;
