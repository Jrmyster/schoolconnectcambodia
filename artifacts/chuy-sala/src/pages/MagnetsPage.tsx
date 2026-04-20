import { useState, useMemo } from "react";
import {
  Magnet,
  Atom,
  Sparkles,
  Power,
  RotateCcw,
  Wind,
  Info,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Science of Magnets — វិទ្យាសាស្ត្រនៃមេដែក
//
//  Three modules:
//    1. Three Types of Magnetism — Ferro / Para / Diamagnetism cards
//    2. Atomic Spin Simulator — toggle alignment of atomic spin arrows
//    3. Magnetic Field Visualizer — bar magnet + field lines + iron filings
//
//  Aesthetic: high-contrast metallic — silver/steel gradients, red North pole,
//  blue South pole, snappy spring-like CSS transitions.
// ════════════════════════════════════════════════════════════════════════════

export default function MagnetsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen text-slate-100 relative"
      style={{
        background:
          "radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)",
      }}
    >
      <ScopedStyles />

      {/* Faint magnetic field background */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[...Array(8)].map((_, i) => {
          const r = 150 + i * 60;
          return (
            <ellipse
              key={i}
              cx="600"
              cy="400"
              rx={r}
              ry={r * 0.55}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold text-cyan-300">
          <Magnet className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនគីមីវិទ្យា" : "Chemistry Lesson"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>វិទ្យាសាស្ត្រនៃ <span className="text-magnet-silver">មេដែក</span></>
          ) : (
            <>The Science of <span className="text-magnet-silver">Magnets</span></>
          )}
        </h1>
        <p
          className={`text-slate-300 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "មេដែកមិនមែនជាវេទមន្តទេ — វាកើតចេញពីការផ្គូផ្គងអាតូមតូចៗ រាប់លានលាន។ ចូលមើលរបៀបដែលលោហៈធម្មតាក្លាយជាមេដែកដ៏ខ្លាំងបាន។"
            : "Magnets are not magic — they come from the alignment of trillions of tiny atoms. Discover how an ordinary metal can become a powerful magnet."}
        </p>
      </header>

      {/* ── Tool 1: Three Types of Magnetism ─────────────────────────── */}
      <Section
        eyebrowEn="Three Types of Magnetism"
        eyebrowKh="ប្រភេទមេដែកទាំងបី"
        titleEn="Not all materials respond to magnets the same way"
        titleKh="សម្ភារៈមិនទាំងអស់ឆ្លើយតបនឹងមេដែកដូចគ្នាទេ"
        descEn="Hover or tap any card to see how its atoms behave. The difference between a fridge magnet, an aluminium can, and a glass of water is invisible — but it's all in how the electrons line up."
        descKh="ហួតឬចុចលើកាតណាមួយ ដើម្បីមើលរបៀបដែលអាតូមរបស់វាប្រព្រឹត្ត។ ភាពខុសគ្នារវាងមេដែកលើទូទឹកកក កំប៉ុងអាលុយមីញ៉ូម និងកែវទឹក គឺមើលមិនឃើញ — ប៉ុន្តែវាស្ថិតនៅក្នុងរបៀបរៀបខ្ពស់នៃអេឡិចត្រុង។"
        isKh={isKh}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MAGNETISM_TYPES.map((t) => (
            <MagnetismCard key={t.id} t={t} isKh={isKh} />
          ))}
        </div>
      </Section>

      {/* ── Tool 2: Atomic Spin Simulator ────────────────────────────── */}
      <Section
        eyebrowEn="Atomic Spin Simulator"
        eyebrowKh="ការក្លែងសាកល្បងរង្វិលអាតូម"
        titleEn="Inside a magnet: the dance of the spins"
        titleKh="ខាងក្នុងមេដែក៖ របាំនៃរង្វិលអេឡិចត្រុង"
        descEn="Every electron acts like a tiny spinning bar magnet. When all those spins line up the same way, the whole material becomes a magnet. Toggle the switch to see it happen."
        descKh="អេឡិចត្រុងនីមួយៗដើរតួនាទីដូចមេដែកដែលរង្វិលតូច។ នៅពេលរង្វិលទាំងអស់នោះតម្រៀបដូចគ្នា សម្ភារៈទាំងមូលក្លាយជាមេដែក។ ចុចកុងតាក់ដើម្បីមើលវាកើតឡើង។"
        isKh={isKh}
      >
        <SpinSimulator isKh={isKh} />
      </Section>

      {/* ── Tool 3: Magnetic Field Visualizer ────────────────────────── */}
      <Section
        eyebrowEn="Magnetic Field Visualizer"
        eyebrowKh="ការបង្ហាញដែនមេដែក"
        titleEn="The invisible force, made visible"
        titleKh="កម្លាំងដែលមើលមិនឃើញ បានធ្វើឲ្យឃើញ"
        descEn="A magnet's force does not stop at its surface — it reaches out into the space around it as a magnetic field, flowing from the North pole around to the South pole. Sprinkle iron filings to reveal the field lines."
        descKh="កម្លាំងរបស់មេដែកមិនឈប់នៅផ្ទៃរបស់វាទេ — វាបាញ់ចេញទៅក្នុងលំហជុំវិញជាដែនមេដែក ហូរពីប៉ូលខាងជើងជុំវិញទៅប៉ូលខាងត្បូង។ ប្រោះកំទេចដែកដើម្បីបង្ហាញខ្សែដែន។"
        isKh={isKh}
      >
        <FieldVisualizer isKh={isKh} />
      </Section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-400 text-sm">
        <span className={isKh ? "font-khmer" : ""}>
          {isKh
            ? "ពីសញ្ញាប្រាក់នៅលើទូទឹកកក ដល់ឧបករណ៍ស្កេន MRI នៅមន្ទីរពេទ្យ — អ្វីៗគឺជារឿងតែមួយ៖ អេឡិចត្រុងតម្រៀបជាជួរ។"
            : "From the magnet on a fridge to the MRI scanner at a hospital — it is all the same story: electrons lining up."}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div
        className={`text-xs font-bold tracking-widest uppercase text-cyan-400 mb-2 ${
          isKh ? "font-khmer tracking-normal normal-case" : ""
        }`}
      >
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-white mb-2 ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <p
        className={`text-slate-300 text-sm max-w-3xl mb-6 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>
      {children}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Magnetism types
// ════════════════════════════════════════════════════════════════════════════

type MagnetismKind = "ferro" | "para" | "dia";

type MagType = {
  id: MagnetismKind;
  nameEn: string; nameKh: string;
  exampleEn: string; exampleKh: string;
  shortEn: string; shortKh: string;
  longEn: string; longKh: string;
  accent: "red" | "amber" | "blue";
};

const MAGNETISM_TYPES: MagType[] = [
  {
    id: "ferro",
    nameEn: "Ferromagnetism",
    nameKh: "ហ្វេរ៉ូម៉ាញ៉េទីស (Ferromagnetism)",
    exampleEn: "Iron, Nickel, Cobalt",
    exampleKh: "ដែក, នីកែល, កូបាល់",
    shortEn: "Strong attraction — can become a lasting magnet",
    shortKh: "ការទាក់ទាញខ្លាំង — អាចក្លាយជាមេដែករយៈពេលយូរ",
    longEn: "In materials like iron, the atoms naturally cluster into tiny groups called 'domains' where all the electron spins point the same way. Once you align the domains using a strong magnet, they tend to STAY aligned — the iron becomes a magnet of its own that can last for years. (Strong heat or a sharp blow can scramble the domains again and demagnetise it.)",
    longKh: "នៅក្នុងសម្ភារៈដូចជាដែក អាតូមរួមគ្នាដោយធម្មជាតិជាក្រុមតូចៗហៅថា 'ដូម៉ែន' ដែលរង្វិលអេឡិចត្រុងទាំងអស់ចង្អុលដូចគ្នា។ នៅពេលអ្នកតម្រៀបដូម៉ែនដោយប្រើមេដែកខ្លាំង វានៅតែស្ថិតនៅតម្រៀប — ដែកក្លាយជាមេដែករបស់ខ្លួនឯងដែលអាចគង់វង្សជាច្រើនឆ្នាំ។ (កំដៅខ្លាំង ឬការវាយប៉ះខ្លាំង អាចធ្វើឲ្យដូម៉ែនរញ៉េរញ៉ៃវិញ និងបាត់បង់មេដែក។)",
    accent: "red",
  },
  {
    id: "para",
    nameEn: "Paramagnetism",
    nameKh: "ប៉ារ៉ាម៉ាញ៉េទីស (Paramagnetism)",
    exampleEn: "Aluminium, Oxygen, Platinum",
    exampleKh: "អាលុយមីញ៉ូម, អុកស៊ីសែន, ប្លាទីន",
    shortEn: "Weak attraction — only when a magnet is near",
    shortKh: "ការទាក់ទាញខ្សោយ — តែពេលមេដែកនៅក្បែរ",
    longEn: "These materials have unpaired electrons that CAN line up with a magnetic field, but only weakly and only while the field is present. Bring a magnet close to an aluminium can and there is a tiny pull; take the magnet away and the alignment vanishes immediately. No memory, no permanent magnet.",
    longKh: "សម្ភារៈទាំងនេះមានអេឡិចត្រុងគ្មានគូ ដែលអាចតម្រៀបជាមួយដែនមេដែក ប៉ុន្តែខ្សោយ និងតែពេលដែនមាន។ យកមេដែកមកជិតកំប៉ុងអាលុយមីញ៉ូម នោះមានការទាញតិចតួច; យកមេដែកចេញ ការតម្រៀបនោះបាត់ភ្លាមៗ។ គ្មានការចងចាំ គ្មានមេដែកអចិន្ត្រៃយ៍។",
    accent: "amber",
  },
  {
    id: "dia",
    nameEn: "Diamagnetism",
    nameKh: "ឌីយ៉ាម៉ាញ៉េទីស (Diamagnetism)",
    exampleEn: "Water, Copper, Wood, even living frogs!",
    exampleKh: "ទឹក, ស្ពាន់, ឈើ, សូម្បីតែកង្កែបរស់!",
    shortEn: "Pushes magnets AWAY (very weakly)",
    shortKh: "រុញច្រានមេដែកចេញ (ខ្សោយណាស់)",
    longEn: "Surprise! Some materials actually push magnets away. When a strong magnet comes near, the electrons in water or copper temporarily shift to create a tiny opposing field — a weak repulsion that exists ONLY while the magnet is nearby. Take the magnet away and the effect vanishes. It's so weak you normally can't feel it, but with a powerful enough magnet you can make a frog float in mid-air.",
    longKh: "ភ្ញាក់ផ្អើល! សម្ភារៈខ្លះពិតជារុញច្រានមេដែកចេញ។ នៅពេលមេដែកខ្លាំងមកជិត អេឡិចត្រុងនៅក្នុងទឹក ឬស្ពាន់ផ្លាស់ប្ដូរបណ្ដោះអាសន្ន ដើម្បីបង្កើតដែនប្រឆាំងតូចមួយ — ការរុញច្រានខ្សោយដែលមាន តែពេលមេដែកនៅក្បែរ។ យកមេដែកចេញ ឥទ្ធិពលនេះបាត់ទៅ។ វាខ្សោយណាស់ ដែលធម្មតាអ្នកមិនអាចមានអារម្មណ៍ទេ ប៉ុន្តែជាមួយមេដែកខ្លាំងគ្រប់គ្រាន់ អ្នកអាចធ្វើឲ្យកង្កែបអណ្តែតក្នុងខ្យល់បាន។",
    accent: "blue",
  },
];

const ACCENT_MAP = {
  red:   { ring: "ring-red-400/40",   border: "border-red-500/40",   text: "text-red-300",   chip: "bg-red-950/60 border-red-700",   bar: "from-red-500 to-red-700",   icon: "text-red-400" },
  amber: { ring: "ring-amber-400/40", border: "border-amber-500/40", text: "text-amber-300", chip: "bg-amber-950/60 border-amber-700", bar: "from-amber-500 to-amber-600", icon: "text-amber-400" },
  blue:  { ring: "ring-sky-400/40",   border: "border-sky-500/40",   text: "text-sky-300",   chip: "bg-sky-950/60 border-sky-700",   bar: "from-sky-500 to-sky-700",   icon: "text-sky-400" },
} as const;

function MagnetismCard({ t, isKh }: { t: MagType; isKh: boolean }) {
  const a = ACCENT_MAP[t.accent];
  return (
    <article
      className={`group relative rounded-2xl p-5 border bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${a.border}`}
      data-testid={`magnetism-card-${t.id}`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.bar} rounded-t-2xl`} />

      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900/80 border ${a.border}`}
        >
          <Atom className={`w-5 h-5 ${a.icon}`} />
        </div>
        <div>
          <h3 className={`font-display font-bold text-lg text-white ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? t.nameKh : t.nameEn}
          </h3>
          <div className={`text-[10px] uppercase tracking-wider font-bold ${a.text} ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? t.shortKh : t.shortEn}
          </div>
        </div>
      </div>

      {/* Mini spin visual per type */}
      <div className="my-4 flex justify-center bg-black/30 rounded-lg p-3 border border-white/5">
        <MiniSpinGrid kind={t.id} accent={t.accent} />
      </div>

      {/* Examples chip */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold mb-3 ${a.chip} ${a.text} ${isKh ? "font-khmer" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? t.exampleKh : t.exampleEn}
      </div>

      <p className={`text-[13px] text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? t.longKh : t.longEn}
      </p>
    </article>
  );
}

// Tiny per-card preview: ferro = all aligned up, para = mostly random with subtle align,
// dia = aligned but with opposing arrow above each (showing repulsion).
function MiniSpinGrid({ kind, accent }: { kind: MagnetismKind; accent: "red" | "amber" | "blue" }) {
  const a = ACCENT_MAP[accent];
  const cells = [...Array(9)];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cells.map((_, i) => {
        // ferro: all aligned. para: random (no field). dia: random + faint
        // (induced response is weak and only present when an external field
        // is nearby — there is no permanent counter-aligned domain pattern)
        let rot = 0;
        let opacity = 1;
        let size = 14;
        if (kind === "ferro") rot = 0;
        else if (kind === "para") rot = (i * 37) % 360;
        else {
          rot = (i * 113) % 360;
          opacity = 0.55;
          size = 12;
        }
        return (
          <div
            key={i}
            className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center"
          >
            <span style={{ opacity }}>
              <SpinArrow rotation={rot} colorClass={a.icon} size={size} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Spin Simulator
// ════════════════════════════════════════════════════════════════════════════

const RANDOM_ROTATIONS = [
  // Pre-computed pseudo-random rotations (deterministic, no hydration mismatch)
  17, 234, 88, 312, 145, 56, 201, 290, 33,
  178, 95, 261, 12, 348, 123, 207, 74, 295,
  41, 169, 256, 103, 332, 27, 218, 64, 287,
  159, 9, 240, 87, 318, 50, 192, 273, 114,
  226, 38, 301, 130, 67, 255, 19, 182, 343,
  106, 264, 79, 211, 32, 297, 144, 58, 230,
  91, 173, 320, 24, 268, 138, 49, 213, 175,
];

function SpinSimulator({ isKh }: { isKh: boolean }) {
  const [on, setOn] = useState(false);
  const COLS = 9;
  const ROWS = 7;
  const cells = useMemo(() => {
    const out = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        out.push({
          key: `${r}-${c}`,
          delay: ((c + r) * 30) % 600, // staggered snap delay
          baseRandom: RANDOM_ROTATIONS[i % RANDOM_ROTATIONS.length],
        });
      }
    }
    return out;
  }, []);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-slate-700 overflow-hidden shadow-2xl">
      {/* Top: simulator surface */}
      <div className="relative p-6 bg-[radial-gradient(ellipse_at_center,#1e293b,transparent_70%)]">
        {/* Field indicator (only when on) */}
        {on && (
          <div className="absolute inset-x-0 top-2 flex items-center justify-center pointer-events-none">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-700/60 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isKh ? "ដែនមេដែកសកម្ម" : "Magnetic field active"}
            </div>
          </div>
        )}

        <div
          className="grid gap-3 mx-auto justify-center mt-6"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            maxWidth: `${COLS * 56}px`,
          }}
        >
          {cells.map((cell) => {
            const rot = on ? 0 : cell.baseRandom;
            return (
              <div
                key={cell.key}
                className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-inner relative"
              >
                {/* tiny atom nucleus */}
                <span className="absolute w-2 h-2 rounded-full bg-slate-500/40" />
                <SpinArrow
                  rotation={rot}
                  colorClass={on ? "text-cyan-300" : "text-slate-300"}
                  size={26}
                  snapDelayMs={on ? cell.delay : 0}
                />
              </div>
            );
          })}
        </div>

        {/* Pole indicators when on */}
        {on && (
          <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto magnet-snap-in">
            <div className="bg-gradient-to-r from-red-700 to-red-500 rounded-lg p-3 text-center font-display font-bold border border-red-300/30 shadow-lg shadow-red-900/40">
              <div className="text-[10px] uppercase tracking-widest text-red-100/80">
                {isKh ? "ប៉ូលខាងជើង" : "North Pole"}
              </div>
              <div className="text-xl text-white">N</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-3 text-center font-display font-bold border border-blue-300/30 shadow-lg shadow-blue-900/40">
              <div className="text-[10px] uppercase tracking-widest text-blue-100/80">
                {isKh ? "ប៉ូលខាងត្បូង" : "South Pole"}
              </div>
              <div className="text-xl text-white">S</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: control bar */}
      <div className="border-t border-slate-700 bg-slate-950/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className={`flex items-start gap-2 text-xs text-slate-400 max-w-md ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500" />
          <span>
            {on
              ? isKh
                ? "ដែនមេដែកសកម្ម — រង្វិលអាតូមទាំងអស់ខាងលើតម្រៀបក្នុងទិសដៅតែមួយ បង្កើតប៉ូលខាងជើង និងខាងត្បូង។"
                : "Field active — every atomic spin above lines up in the same direction, creating a North and a South pole."
              : isKh
                ? "ដែនមេដែកបិទ — រង្វិលនីមួយៗចង្អុលដោយចៃដន្យ ហើយលុបចោលគ្នាទៅវិញទៅមក។ មិនមានប៉ូលទេ មិនមានមេដែកទេ។"
                : "Field off — each spin points randomly and they cancel each other out. No poles, no magnet."}
          </span>
        </div>
        <button
          onClick={() => setOn((o) => !o)}
          aria-pressed={on}
          data-testid="spin-toggle"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            on
              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-cyan-900/50 hover:from-cyan-400 hover:to-cyan-500"
              : "bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700"
          }`}
        >
          <Power className="w-4 h-4" />
          <span className={isKh ? "font-khmer" : ""}>
            {on
              ? isKh ? "មេដែកបើក" : "Magnetism: ON"
              : isKh ? "មេដែកបិទ" : "Magnetism: OFF"}
          </span>
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Spin arrow — small SVG arrow that rotates with snappy spring
// ════════════════════════════════════════════════════════════════════════════

function SpinArrow({
  rotation,
  colorClass,
  size = 22,
  snapDelayMs = 0,
}: {
  rotation: number;
  colorClass: string;
  size?: number;
  snapDelayMs?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`spin-arrow ${colorClass}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transitionDelay: `${snapDelayMs}ms`,
      }}
      aria-hidden="true"
    >
      {/* shaft */}
      <line x1="12" y1="20" x2="12" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* head */}
      <polygon points="12,2 7.5,8 16.5,8" fill="currentColor" />
      {/* tail */}
      <circle cx="12" cy="20.5" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Magnetic Field Visualizer
// ════════════════════════════════════════════════════════════════════════════

function FieldVisualizer({ isKh }: { isKh: boolean }) {
  const [filings, setFilings] = useState(false);

  // Field-line ellipses around the bar magnet (centred at 400,200 in viewBox 800x400)
  // Bar magnet sits horizontally from x=290 to x=510, y=190..210.
  // We draw 6 elliptical loops of growing radius.
  const lines = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      rx: 130 + i * 45,
      ry: 70 + i * 30,
      delay: i * 0.25,
    })),
    []
  );

  // Iron filing positions (deterministic pseudo-random along/around field lines)
  const filingsList = useMemo(() => {
    const list: { x: number; y: number; rot: number; len: number }[] = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (const line of lines) {
      const count = 36;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 + rand() * 0.05;
        const x = 400 + Math.cos(t) * line.rx + (rand() - 0.5) * 6;
        const y = 200 + Math.sin(t) * line.ry + (rand() - 0.5) * 6;
        // Tangent rotation along the ellipse (degrees)
        const tx = -line.rx * Math.sin(t);
        const ty =  line.ry * Math.cos(t);
        const rot = (Math.atan2(ty, tx) * 180) / Math.PI;
        list.push({ x, y, rot, len: 5 + rand() * 4 });
      }
    }
    return list;
  }, [lines]);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-slate-700 overflow-hidden shadow-2xl">
      <div className="relative">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto block"
          aria-label={isKh ? "ដែនមេដែកនៃមេដែកដំបង" : "Magnetic field of a bar magnet"}
        >
          <defs>
            <linearGradient id="mag-bar-red" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="mag-bar-blue" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="mag-bar-shine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
            {/* Arrowhead for animated dot direction */}
            <marker
              id="mag-line-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Field-line ellipses */}
          <g className="field-lines">
            {lines.map((l, i) => (
              <ellipse
                key={i}
                cx="400"
                cy="200"
                rx={l.rx}
                ry={l.ry}
                fill="none"
                stroke="#64748b"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                style={{
                  animation: `mag-dash 2.5s linear infinite`,
                  animationDelay: `-${l.delay}s`,
                }}
              />
            ))}
          </g>

          {/* Travelling dots along each line (direction: N → around → S).
              We set cx/cy to the start position on each ellipse so that even
              if motion-path is unsupported the dots show as static field
              markers instead of collapsing to (0,0). The motion-path animation
              is gated by an @supports rule in ScopedStyles. */}
          <g className="field-dots">
            {lines.map((l, i) => (
              <circle
                key={i}
                cx={400 + l.rx}
                cy={200}
                r="4"
                fill="#67e8f9"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(103,232,249,0.9))",
                  // CSS variables consumed by the @supports rule
                  ["--mag-path" as string]: `path('M ${400 + l.rx} 200 a ${l.rx} ${l.ry} 0 1 1 -${l.rx * 2} 0 a ${l.rx} ${l.ry} 0 1 1 ${l.rx * 2} 0')`,
                  ["--mag-dur" as string]: `${4 + i * 0.4}s`,
                  ["--mag-delay" as string]: `-${l.delay * 1.6}s`,
                } as React.CSSProperties}
              />
            ))}
          </g>

          {/* Iron filings (only when sprinkled) */}
          {filings && (
            <g className="iron-filings">
              {filingsList.map((f, i) => (
                <line
                  key={i}
                  x1={f.x - f.len / 2}
                  y1={f.y}
                  x2={f.x + f.len / 2}
                  y2={f.y}
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  transform={`rotate(${f.rot} ${f.x} ${f.y})`}
                  style={{
                    opacity: 0,
                    animation: `mag-filing-in 0.5s ease-out forwards`,
                    animationDelay: `${(i % 50) * 8}ms`,
                  }}
                />
              ))}
            </g>
          )}

          {/* Bar magnet — N (red, left) and S (blue, right) */}
          <g>
            {/* shadow */}
            <ellipse cx="400" cy="248" rx="120" ry="6" fill="#000" opacity="0.5" />

            {/* north half */}
            <rect x="290" y="170" width="110" height="60" rx="4" fill="url(#mag-bar-red)" stroke="#450a0a" strokeWidth="1.5" />
            {/* south half */}
            <rect x="400" y="170" width="110" height="60" rx="4" fill="url(#mag-bar-blue)" stroke="#172554" strokeWidth="1.5" />
            {/* metallic shine */}
            <rect x="290" y="170" width="220" height="60" rx="4" fill="url(#mag-bar-shine)" pointerEvents="none" />

            {/* Pole letters */}
            <text x="345" y="208" fontFamily="ui-sans-serif, system-ui" fontSize="32" fontWeight="900" fill="#fff" textAnchor="middle" style={{ letterSpacing: "1px" }}>N</text>
            <text x="455" y="208" fontFamily="ui-sans-serif, system-ui" fontSize="32" fontWeight="900" fill="#fff" textAnchor="middle" style={{ letterSpacing: "1px" }}>S</text>
          </g>

          {/* Pole labels */}
          <text x="345" y="160" fontFamily="ui-sans-serif, system-ui" fontSize="11" fontWeight="700" fill="#fca5a5" textAnchor="middle" style={{ letterSpacing: "1.5px" }}>NORTH</text>
          <text x="455" y="160" fontFamily="ui-sans-serif, system-ui" fontSize="11" fontWeight="700" fill="#93c5fd" textAnchor="middle" style={{ letterSpacing: "1.5px" }}>SOUTH</text>
        </svg>
      </div>

      {/* Controls */}
      <div className="border-t border-slate-700 bg-slate-950/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className={`flex items-start gap-2 text-xs text-slate-400 max-w-md ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500" />
          <span>
            {filings
              ? isKh
                ? "កំទេចដែកតម្រៀបតាមដែនមេដែក — បង្ហាញរូបរាងពិតរបស់ខ្សែដែនជុំវិញមេដែក។"
                : "Iron filings line up along the magnetic field — revealing the true shape of the field lines around the magnet."
              : isKh
                ? "ចំណុចហូរពីប៉ូល N ចេញ ជុំវិញ ហើយត្រឡប់ទៅប៉ូល S — នេះជាដែនមេដែក។"
                : "Dots flow out from the N pole, around, and back into the S pole — this is the magnetic field."}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilings((f) => !f)}
            aria-pressed={filings}
            data-testid="filings-toggle"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
              filings
                ? "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 hover:from-slate-200 hover:to-slate-300"
                : "bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700"
            }`}
          >
            <Wind className="w-4 h-4" />
            <span className={isKh ? "font-khmer" : ""}>
              {filings
                ? isKh ? "បោសសម្អាត" : "Sweep filings"
                : isKh ? "ប្រោះកំទេចដែក" : "Sprinkle iron filings"}
            </span>
          </button>
          {filings && (
            <button
              onClick={() => {
                // re-trigger the entrance animation by toggling
                setFilings(false);
                setTimeout(() => setFilings(true), 30);
              }}
              aria-label={isKh ? "ប្រោះម្ដងទៀត" : "Sprinkle again"}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              data-testid="filings-redo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .text-magnet-silver {
        background: linear-gradient(180deg, #f8fafc 0%, #cbd5e1 45%, #94a3b8 55%, #f1f5f9 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 1px 0 rgba(255,255,255,0.05);
      }

      /* Snappy spring-like transition for spin arrows */
      .spin-arrow {
        transition: transform 380ms cubic-bezier(.18,.89,.32,1.28);
      }

      /* Field-line dash animation — gives the lines a "flowing" look */
      @keyframes mag-dash {
        from { stroke-dashoffset: 0; }
        to   { stroke-dashoffset: -24; }
      }
      @keyframes mag-flow {
        from { offset-distance: 0%; }
        to   { offset-distance: 100%; }
      }
      /* Only animate dots along the motion path when the browser actually
         supports it. Without this guard, browsers that ignore offset-path
         would leave the dots glowing on each ellipse as static markers,
         which is still a meaningful visualization of the field. */
      @supports (offset-path: path('M 0 0 L 1 1')) {
        .field-dots circle {
          offset-path: var(--mag-path);
          offset-rotate: auto;
          animation: mag-flow var(--mag-dur, 4s) linear infinite;
          animation-delay: var(--mag-delay, 0s);
        }
      }
      @keyframes mag-filing-in {
        from { opacity: 0; transform-origin: center; }
        to   { opacity: 1; }
      }

      /* Snap-in transition for the N/S pole panels in the spin sim */
      @keyframes magnet-snap-in {
        0%   { opacity: 0; transform: translateY(8px) scale(0.96); }
        70%  { opacity: 1; transform: translateY(-2px) scale(1.02); }
        100% { transform: translateY(0) scale(1); }
      }
      .magnet-snap-in {
        animation: magnet-snap-in 380ms cubic-bezier(.18,.89,.32,1.28);
      }

      @media (prefers-reduced-motion: reduce) {
        .spin-arrow,
        .magnet-snap-in,
        .field-lines ellipse,
        .field-dots circle,
        .iron-filings line {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}

