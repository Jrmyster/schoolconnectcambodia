import { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Atom,
  FlaskConical,
  Telescope,
  Dna,
  Cpu,
  Sigma,
  Zap,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ────────────────────────────────────────────────────────────────────────
   Field metadata — colour + icon (matches Giants of Science palette).
   ──────────────────────────────────────────────────────────────────────── */

type Field = "physics" | "astronomy" | "chemistry" | "biology" | "computing" | "philosophy";

const FIELDS: Record<Field, { en: string; kh: string; icon: LucideIcon; from: string; to: string; dot: string; glow: string }> = {
  physics:    { en: "Physics",          kh: "រូបវិទ្យា",          icon: Atom,        from: "from-indigo-400",  to: "to-violet-600",  dot: "#a78bfa", glow: "rgba(167,139,250,0.55)" },
  astronomy:  { en: "Astronomy",        kh: "តារាសាស្ត្រ",        icon: Telescope,   from: "from-sky-400",     to: "to-blue-600",    dot: "#7dd3fc", glow: "rgba(125,211,252,0.55)" },
  chemistry:  { en: "Chemistry",        kh: "គីមីវិទ្យា",         icon: FlaskConical,from: "from-emerald-400", to: "to-teal-600",    dot: "#6ee7b7", glow: "rgba(110,231,183,0.55)" },
  biology:    { en: "Biology",          kh: "ជីវវិទ្យា",         icon: Dna,         from: "from-lime-400",    to: "to-green-600",   dot: "#bef264", glow: "rgba(190,242,100,0.55)" },
  computing:  { en: "Computing",        kh: "កុំព្យូទ័រ",        icon: Cpu,         from: "from-fuchsia-400", to: "to-purple-600",  dot: "#f0abfc", glow: "rgba(240,171,252,0.55)" },
  philosophy: { en: "Philosophy of Sci", kh: "ទស្សនវិជ្ជាវិទ្យាសាស្ត្រ", icon: Sigma, from: "from-amber-400",   to: "to-orange-600",  dot: "#fcd34d", glow: "rgba(252,211,77,0.55)" },
};

/* ────────────────────────────────────────────────────────────────────────
   Timeline events — 15 milestones, bilingual.
   `buildsOn` and `ledTo` reference event ids to draw the "Discovery
   Connection" web. Icon override allowed via `alt`.
   ──────────────────────────────────────────────────────────────────────── */

type EventDatum = {
  id: string;
  year: number;
  field: Field;
  alt?: LucideIcon;
  scientist: { en: string; kh: string };
  title:     { en: string; kh: string };
  summary:   { en: string; kh: string };  // shown in detail card
  buildsOn?: string[];   // ids
  ledTo?:    string[];   // ids
};

const EVENTS: EventDatum[] = [
  {
    id: "copernicus-1543", year: 1543, field: "astronomy",
    scientist: { en: "Copernicus", kh: "កូពែរនិច" },
    title:     { en: "Heliocentric model published", kh: "បោះពុម្ពគំរូព្រះអាទិត្យជាកណ្ដាល" },
    summary:   { en: "Copernicus argues that the Earth and other planets orbit the Sun — overturning two thousand years of belief that everything circles the Earth.",
                 kh: "កូពែរនិចអះអាងថាផែនដី និងភពផ្សេងទៀតធ្វើគន្លងជុំវិញព្រះអាទិត្យ — បំបាក់ជំនឿពេញពីរពាន់ឆ្នាំថាគ្រប់អ្វីៗធ្វើគន្លងជុំវិញផែនដី។" },
    ledTo: ["kepler-1609", "galileo-1610"],
  },
  {
    id: "kepler-1609", year: 1609, field: "astronomy",
    scientist: { en: "Kepler", kh: "ខេបឡឺ" },
    title:     { en: "Laws of planetary motion", kh: "ច្បាប់នៃចលនាភពព្រះ" },
    summary:   { en: "Kepler discovers that planets move in ellipses, not perfect circles, and sweep equal areas in equal times — turning Copernicus's idea into precise mathematics.",
                 kh: "ខេបឡឺរកឃើញថាភពធ្វើចលនាជាពងក្រពើ មិនមែនរង្វង់ឥតខ្ចោះទេ ហើយបោសផ្ទៃស្មើគ្នាក្នុងពេលស្មើគ្នា — បំប្លែងគំនិតរបស់កូពែរនិចទៅជាគណិតវិទ្យាច្បាស់លាស់។" },
    buildsOn: ["copernicus-1543"],
    ledTo:    ["newton-1687"],
  },
  {
    id: "galileo-1610", year: 1610, field: "astronomy", alt: Telescope,
    scientist: { en: "Galileo", kh: "ហ្គាលីលេអូ" },
    title:     { en: "Telescope reveals new worlds", kh: "កែវយឹតបង្ហាញពិភពថ្មី" },
    summary:   { en: "Pointing his improved telescope at the sky, Galileo finds Jupiter's four largest moons and the phases of Venus — direct evidence that not everything orbits the Earth.",
                 kh: "ដោយបង្វែរកែវយឹតដែលបានកែលម្អទៅមេឃ ហ្គាលីលេអូបានឃើញព្រះច័ន្ទធំបំផុត ៤ របស់ភពព្រហស្បតិ៍ និងដំណាក់កាលនៃភពសុក្រ — ភស្តុតាងផ្ទាល់ថាមិនមែនអ្វីៗគ្រប់ៗធ្វើគន្លងជុំវិញផែនដីទេ។" },
    buildsOn: ["copernicus-1543"],
    ledTo:    ["newton-1687"],
  },
  {
    id: "bacon-1620", year: 1620, field: "philosophy",
    scientist: { en: "Bacon", kh: "បេកុន" },
    title:     { en: "Novum Organum — the scientific method", kh: "Novum Organum — វិធីសាស្ត្រវិទ្យាសាស្ត្រ" },
    summary:   { en: "Bacon argues that real knowledge comes from careful observation and controlled experiments, not from authority. He sketches the method that scientists still use today.",
                 kh: "បេកុនអះអាងថាចំណេះដឹងពិតមកពីការសង្កេតយ៉ាងប្រុងប្រយ័ត្ន និងពិសោធន៍ដែលគ្រប់គ្រងបាន មិនមែនពីសិទ្ធអំណាច។ គាត់រៀបចំវិធីសាស្ត្រដែលអ្នកវិទ្យាសាស្ត្រនៅតែប្រើដល់សព្វថ្ងៃ។" },
    ledTo: ["newton-1687", "darwin-1859", "pasteur-1885"],
  },
  {
    id: "newton-1687", year: 1687, field: "physics",
    scientist: { en: "Newton", kh: "ញូតុន" },
    title:     { en: "Principia: laws of motion & gravity", kh: "Principia៖ ច្បាប់ចលនា និងទំនាញ" },
    summary:   { en: "Newton unifies the heavens and the Earth: the same gravity that pulls an apple to the ground keeps the Moon in orbit. His three laws explain Kepler's discoveries from a single principle.",
                 kh: "ញូតុនបានភ្ជាប់មេឃ និងផែនដី៖ ទំនាញដូចគ្នាដែលទាញផ្លែប៉ោមចុះមកដី គឺរក្សាព្រះច័ន្ទនៅក្នុងគន្លង។ ច្បាប់ទាំងបីរបស់គាត់ពន្យល់ការរកឃើញរបស់ខេបឡឺពីគោលការណ៍តែមួយ។" },
    buildsOn: ["kepler-1609", "galileo-1610", "bacon-1620"],
    ledTo:    ["einstein-1905", "einstein-1915"],
  },
  {
    id: "lovelace-1843", year: 1843, field: "computing",
    scientist: { en: "Lovelace", kh: "ឡាវឡេស" },
    title:     { en: "First computer algorithm", kh: "ក្បួនដោះស្រាយកុំព្យូទ័រដំបូង" },
    summary:   { en: "Working on Babbage's Analytical Engine, Ada Lovelace writes the first algorithm intended to be run by a machine — and predicts that computers will one day handle more than just numbers.",
                 kh: "ដោយធ្វើការលើ Analytical Engine របស់ Babbage អាដា ឡាវឡេសបានសរសេរក្បួនដោះស្រាយដំបូងសម្រាប់ឱ្យម៉ាស៊ីនដំណើរការ — ហើយបានព្យាករថាកុំព្យូទ័រនឹងគ្រប់គ្រងច្រើនជាងតែលេខប៉ុណ្ណោះ។" },
    ledTo: ["turing-1936"],
  },
  {
    id: "darwin-1859", year: 1859, field: "biology",
    scientist: { en: "Darwin", kh: "ដាវីន" },
    title:     { en: "On the Origin of Species", kh: "On the Origin of Species" },
    summary:   { en: "After decades of evidence-gathering, Darwin publishes his theory of evolution by natural selection — the unifying idea of modern biology.",
                 kh: "បន្ទាប់ពីការប្រមូលភស្តុតាងរាប់សិបឆ្នាំ ដាវីនបោះពុម្ពទ្រឹស្តីវិវត្តរបស់គាត់តាមរយៈការជ្រើសរើសដោយធម្មជាតិ — គំនិតរួមនៃជីវវិទ្យាទំនើប។" },
    buildsOn: ["bacon-1620"],
  },
  {
    id: "mendeleev-1869", year: 1869, field: "chemistry",
    scientist: { en: "Mendeleev", kh: "មិនដេឡេវ" },
    title:     { en: "The Periodic Table", kh: "តារាងខួបនៃធាតុ" },
    summary:   { en: "Mendeleev arranges the known elements by atomic weight and properties — and predicts elements not yet discovered, an extraordinary triumph for scientific theory.",
                 kh: "មិនដេឡេវរៀបចំធាតុដែលស្គាល់តាមទម្ងន់អាតូម និងលក្ខណៈ — ហើយព្យាករពីធាតុដែលមិនទាន់រកឃើញ ដែលជាជោគជ័យដ៏អស្ចារ្យសម្រាប់ទ្រឹស្តីវិទ្យាសាស្ត្រ។" },
    ledTo: ["bohr-1913"],
  },
  {
    id: "pasteur-1885", year: 1885, field: "biology",
    scientist: { en: "Pasteur", kh: "ប៉ាស្ទ័រ" },
    title:     { en: "Rabies vaccine & germ theory", kh: "វ៉ាក់សាំងជំងឺឆ្កែឆ្កួត និងទ្រឹស្តីមេរោគ" },
    summary:   { en: "Pasteur saves a young boy bitten by a rabid dog and proves that microbes cause disease — opening the door to modern vaccination and food safety (pasteurization).",
                 kh: "ប៉ាស្ទ័របានសង្គ្រោះក្មេងប្រុសម្នាក់ដែលឆ្កែឆ្កួតខាំ ហើយបានបញ្ជាក់ថាមីក្រូបបង្កជំងឺ — បើកទ្វារទៅរកការចាក់វ៉ាក់សាំងទំនើប និងសុវត្ថិភាពអាហារ។" },
    buildsOn: ["bacon-1620"],
  },
  {
    id: "tesla-1888", year: 1888, field: "physics", alt: Zap,
    scientist: { en: "Tesla", kh: "តេស្លា" },
    title:     { en: "AC induction motor", kh: "ម៉ូទ័រអាំងឌុកស្យុង AC" },
    summary:   { en: "Tesla patents the alternating-current induction motor and the polyphase AC system that today carries electricity to nearly every home and factory in the world.",
                 kh: "តេស្លាបានចុះប៉ាតង់ម៉ូទ័រអាំងឌុកស្យុងចរន្តឆ្លាស់ និងប្រព័ន្ធ AC ពហុដំណាក់កាល ដែលបច្ចុប្បន្នផ្ដល់អគ្គិសនីដល់ស្ទើរគ្រប់ផ្ទះ និងរោងចក្រក្នុងពិភពលោក។" },
  },
  {
    id: "planck-1900", year: 1900, field: "physics", alt: Sparkles,
    scientist: { en: "Planck", kh: "ប៉្លង់ក៍" },
    title:     { en: "Quantum hypothesis", kh: "សម្មតិកម្មក្វាន់ទុំ" },
    summary:   { en: "Planck proposes that energy comes in tiny discrete packets called 'quanta' — the radical first step into quantum physics.",
                 kh: "ប៉្លង់ក៍ស្នើថាថាមពលមកជាកញ្ចប់តូចៗហៅថា 'ក្វាន់ទុំ' — ជាជំហានដំបូងដ៏ខ្លាំងក្លាចូលទៅក្នុងរូបវិទ្យាក្វាន់ទុំ។" },
    ledTo: ["einstein-1905", "bohr-1913"],
  },
  {
    id: "einstein-1905", year: 1905, field: "physics",
    scientist: { en: "Einstein", kh: "អាញស្តាញ" },
    title:     { en: "Annus Mirabilis — Special Relativity & E=mc²", kh: "Annus Mirabilis — រ៉ឺឡាទីវីតេពិសេស និង E=mc²" },
    summary:   { en: "In a single year, Einstein publishes four world-changing papers: on the photoelectric effect, Brownian motion, special relativity, and mass-energy equivalence (E=mc²) — extending and revolutionising the physics of Newton and Maxwell.",
                 kh: "ក្នុងឆ្នាំតែមួយ អាញស្តាញបានបោះពុម្ពអត្ថបទ ៤ ដែលផ្លាស់ប្ដូរពិភពលោក៖ លើបាតុភូតផូតូអេឡិចត្រិច ចលនាប្រោន រ៉ឺឡាទីវីតេពិសេស និងការសមមូលម៉ាស់-ថាមពល (E=mc²) — ពង្រីក និងបដិវត្តន៍លើរូបវិទ្យារបស់ញូតុន។" },
    buildsOn: ["newton-1687", "planck-1900"],
    ledTo:    ["einstein-1915", "bohr-1913"],
  },
  {
    id: "bohr-1913", year: 1913, field: "physics",
    scientist: { en: "Bohr", kh: "បូរ" },
    title:     { en: "Quantum model of the atom", kh: "គំរូក្វាន់ទុំនៃអាតូម" },
    summary:   { en: "Bohr pictures the atom as a tiny solar system where electrons orbit the nucleus only at fixed energy levels — explaining the spectrum of hydrogen and bridging classical and quantum physics.",
                 kh: "បូរគូររូបអាតូមដូចជាប្រព័ន្ធព្រះអាទិត្យតូចមួយ ដែលអេឡិចត្រុងធ្វើគន្លងជុំវិញនុយក្លេអ៊ែរនៅកម្រិតថាមពលថេរ — ពន្យល់ស្ប៉ិចត្រានៃហ៊ីដ្រូសែន និងភ្ជាប់រូបវិទ្យាបុរាណ និងក្វាន់ទុំ។" },
    buildsOn: ["planck-1900", "einstein-1905", "mendeleev-1869"],
  },
  {
    id: "einstein-1915", year: 1915, field: "physics",
    scientist: { en: "Einstein", kh: "អាញស្តាញ" },
    title:     { en: "General Relativity", kh: "រ៉ឺឡាទីវីតេទូទៅ" },
    summary:   { en: "Einstein extends relativity to gravity itself: massive objects bend the very fabric of space and time. Newton's gravity is now seen as a special case of a deeper geometric reality.",
                 kh: "អាញស្តាញពង្រីករ៉ឺឡាទីវីតេទៅរកទំនាញខ្លួនវា៖ វត្ថុធំៗកោងលំហ និងពេលវេលា។ ទំនាញរបស់ញូតុនឥឡូវនេះត្រូវបានចាត់ទុកជាករណីពិសេសនៃភាពពិតធរណីមាត្រដែលជ្រៅជាង។" },
    buildsOn: ["newton-1687", "einstein-1905"],
  },
  {
    id: "turing-1936", year: 1936, field: "computing",
    scientist: { en: "Turing", kh: "ទូរីង" },
    title:     { en: "The universal computing machine", kh: "ម៉ាស៊ីនកុំព្យូទ័រសកល" },
    summary:   { en: "Turing imagines a single machine that can simulate any other machine — the theoretical blueprint for every computer ever built. He later proposes the famous Turing Test for machine intelligence.",
                 kh: "ទូរីងស្រមៃម៉ាស៊ីនតែមួយដែលអាចក្លែងធ្វើម៉ាស៊ីនផ្សេងទៀត — គំនូសព្រាងទ្រឹស្តីសម្រាប់រាល់កុំព្យូទ័រដែលធ្លាប់បានសាងសង់។ ក្រោយមកគាត់ស្នើ Turing Test ដ៏ល្បីសម្រាប់បញ្ញាម៉ាស៊ីន។" },
    buildsOn: ["lovelace-1843"],
  },
];

const EVENTS_BY_ID: Record<string, EventDatum> = Object.fromEntries(EVENTS.map((e) => [e.id, e]));

/* Span of years on the rail. */
const YEAR_MIN = 1500;
const YEAR_MAX = 1960;
const YEAR_RANGE = YEAR_MAX - YEAR_MIN;
/* Decade ticks shown on the axis (every 50 years). */
const TICK_YEARS: number[] = [];
for (let y = 1500; y <= 1950; y += 50) TICK_YEARS.push(y);

const TRACK_MIN_PX = 1600; // horizontal length on desktop
const TRACK_MIN_PX_MOBILE = 1100;

function pct(year: number) {
  return ((year - YEAR_MIN) / YEAR_RANGE) * 100;
}

/* ────────────────────────────────────────────────────────────────────────
   Single timeline marker.
   ──────────────────────────────────────────────────────────────────────── */

function Marker({
  e,
  active,
  onSelect,
  onHover,
  hovered,
  flipDown,
  index,
  total,
  kh,
}: {
  e: EventDatum;
  active: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  hovered: boolean;
  flipDown: boolean;
  index: number;
  total: number;
  kh: boolean;
}) {
  const f = FIELDS[e.field];
  const Icon = e.alt ?? f.icon;
  const left = `${pct(e.year)}%`;
  const labelClass = `absolute ${flipDown ? "top-[calc(50%+18px)]" : "bottom-[calc(50%+18px)]"} left-1/2 -translate-x-1/2`;
  const showLabel = active || hovered;

  return (
    <button
      type="button"
      onClick={() => onSelect(e.id)}
      onMouseEnter={() => onHover(e.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(e.id)}
      onBlur={() => onHover(null)}
      aria-label={`${e.year} — ${kh ? e.scientist.kh : e.scientist.en}: ${kh ? e.title.kh : e.title.en}`}
      aria-pressed={active}
      aria-current={active ? "true" : undefined}
      data-index={index}
      style={{ left }}
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full"
    >
      {/* Connector tick (vertical line from rail to dot — purely decorative since dot sits on the rail) */}
      <span className="sr-only">{`${index + 1} of ${total}`}</span>

      {/* Glow halo */}
      <span
        aria-hidden="true"
        className={`block absolute inset-0 rounded-full transition-all duration-300 ${active ? "scale-[2.4] opacity-90" : hovered ? "scale-[1.8] opacity-60" : "scale-100 opacity-0"}`}
        style={{ background: `radial-gradient(circle, ${f.glow} 0%, transparent 65%)` }}
      />
      {/* Dot */}
      <span
        aria-hidden="true"
        className={`relative block rounded-full ring-2 transition-all duration-200 ${active ? "w-5 h-5 ring-white" : "w-3.5 h-3.5 ring-white/30 group-hover:ring-white/60"}`}
        style={{
          background: `radial-gradient(circle at 30% 30%, white, ${f.dot} 70%)`,
          boxShadow: `0 0 ${active ? 16 : 8}px ${f.glow}`,
        }}
      >
        {active && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-2.5 h-2.5 text-slate-900" />
          </span>
        )}
      </span>

      {/* Label */}
      <span
        className={`${labelClass} pointer-events-none whitespace-nowrap text-center transition-opacity duration-200 ${showLabel ? "opacity-100" : "opacity-70"}`}
      >
        <span className="block text-[10px] font-mono font-bold text-white/80">{e.year}</span>
        <span
          className={`block text-[11px] font-semibold leading-tight ${showLabel ? "text-white" : "text-white/55"} ${kh ? "font-khmer" : ""}`}
          style={{ textShadow: showLabel ? `0 0 10px ${f.glow}` : undefined }}
        >
          {kh ? e.scientist.kh : e.scientist.en}
        </span>
      </span>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Connection chip — clickable link to a related event.
   ──────────────────────────────────────────────────────────────────────── */

function ConnectionChip({
  id,
  direction,
  onSelect,
  kh,
}: {
  id: string;
  direction: "back" | "forward";
  onSelect: (id: string) => void;
  kh: boolean;
}) {
  const e = EVENTS_BY_ID[id];
  if (!e) return null;
  const f = FIELDS[e.field];
  const Arrow = direction === "back" ? ArrowDownLeft : ArrowUpRight;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: f.dot, boxShadow: `0 0 6px ${f.glow}` }}
        aria-hidden="true"
      />
      <span className="font-mono text-[11px] text-white/60">{e.year}</span>
      <span className={`text-xs text-white/85 group-hover:text-white truncate max-w-[18ch] ${kh ? "font-khmer" : ""}`}>
        {kh ? e.scientist.kh : e.scientist.en}
      </span>
      <Arrow className="w-3 h-3 text-white/50 group-hover:text-white/80 flex-shrink-0" aria-hidden="true" />
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Detail card — "Discovery Connection".
   ──────────────────────────────────────────────────────────────────────── */

function DetailCard({
  e,
  onSelect,
  kh,
  t,
}: {
  e: EventDatum;
  onSelect: (id: string) => void;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const f = FIELDS[e.field];
  const Icon = e.alt ?? f.icon;
  return (
    <div
      role="region"
      aria-live="polite"
      aria-label={t("Discovery Connection", "ការតភ្ជាប់នៃការរកឃើញ")}
      className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* coloured header strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${f.from} ${f.to}`} aria-hidden="true" />

      <div className="p-5 sm:p-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gradient-to-br ${f.from} ${f.to} text-white shadow-sm ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            <Icon className="w-3 h-3" />
            {kh ? f.kh : f.en}
          </span>
          <span className="font-mono text-sm text-white/60">{e.year}</span>
          <span className="text-white/30">·</span>
          <span className={`text-sm text-white/85 ${kh ? "font-khmer" : ""}`}>
            {kh ? e.scientist.kh : e.scientist.en}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-lg sm:text-xl font-bold text-white leading-tight ${
            kh ? "font-khmer leading-relaxed" : "font-display"
          }`}
        >
          {kh ? e.title.kh : e.title.en}
        </h3>

        {/* Summary */}
        <p
          className={`text-sm sm:text-base text-white/80 leading-relaxed mt-2 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? e.summary.kh : e.summary.en}
        </p>

        {/* Connections */}
        {(e.buildsOn?.length || e.ledTo?.length) ? (
          <div className="mt-5 pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-4">
            {e.buildsOn?.length ? (
              <div>
                <div
                  className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-white/55 mb-2 flex items-center gap-1.5 ${
                    kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                  }`}
                >
                  <ArrowDownLeft className="w-3 h-3" aria-hidden="true" />
                  {t("Builds on", "ផ្អែកលើ")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {e.buildsOn.map((id) => (
                    <ConnectionChip key={id} id={id} direction="back" onSelect={onSelect} kh={kh} />
                  ))}
                </div>
              </div>
            ) : null}

            {e.ledTo?.length ? (
              <div>
                <div
                  className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-white/55 mb-2 flex items-center gap-1.5 ${
                    kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                  }`}
                >
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  {t("Led to", "នាំទៅ")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {e.ledTo.map((id) => (
                    <ConnectionChip key={id} id={id} direction="forward" onSelect={onSelect} kh={kh} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div
            className={`mt-5 pt-4 border-t border-white/10 text-xs text-white/45 italic ${
              kh ? "font-khmer not-italic" : ""
            }`}
          >
            {t(
              "A standalone breakthrough — opened entirely new fields of study.",
              "ការរកឃើញឯករាជ្យ — បើកវិស័យសិក្សាថ្មីទាំងស្រុង។",
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Main component.
   ──────────────────────────────────────────────────────────────────────── */

export function ScientificTimeline() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";
  const [activeId, setActiveId] = useState<string>(EVENTS[4]!.id); // default: Newton 1687
  const [hoverId, setHoverId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => [...EVENTS].sort((a, b) => a.year - b.year), []);
  const active = EVENTS_BY_ID[activeId]!;
  const activeIdx = sorted.findIndex((e) => e.id === activeId);

  /* Scroll active marker into view smoothly. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const node = rail.querySelector<HTMLElement>(`[data-index="${activeIdx}"]`);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    const offset = rect.left - railRect.left + rail.scrollLeft - rail.clientWidth / 2 + rect.width / 2;
    rail.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeIdx]);

  /* Keyboard navigation when focus is inside the timeline. */
  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = sorted[Math.min(sorted.length - 1, activeIdx + 1)]!;
      setActiveId(next.id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = sorted[Math.max(0, activeIdx - 1)]!;
      setActiveId(prev.id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveId(sorted[0]!.id);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveId(sorted[sorted.length - 1]!.id);
    }
  }

  return (
    <section
      aria-label={t("Scientific Timeline", "ខ្សែបន្ទាត់ពេលវេលានៃវិទ្យាសាស្ត្រ")}
      className="relative mb-12 -mx-4 px-4 sm:-mx-6 sm:px-6 py-8 sm:py-10 rounded-3xl bg-gradient-to-b from-[#06081a] via-[#0b0f2a] to-[#06081a] border border-slate-800 shadow-inner overflow-hidden"
    >
      {/* Starfield backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.5), transparent), radial-gradient(1.5px 1.5px at 60% 20%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.55), transparent), radial-gradient(1.5px 1.5px at 10% 65%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.5), transparent)",
          backgroundSize: "600px 400px",
          backgroundRepeat: "repeat",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #6d28d9, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-25 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)" }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-3 mb-5 sm:mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <Clock className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-300/80 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Space-Time Map", "ផែនទីលំហ-ពេលវេលា")}
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold text-white leading-tight ${
              kh ? "font-khmer leading-relaxed" : "font-display"
            }`}
          >
            {t("Scientific Timeline", "ខ្សែបន្ទាត់ពេលវេលានៃវិទ្យាសាស្ត្រ")}
          </h2>
          <p
            className={`text-xs sm:text-sm text-white/60 leading-snug mt-1 max-w-2xl ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            {t(
              "Drag the timeline or tap a year to see how each discovery built on the ones before it.",
              "អូសខ្សែបន្ទាត់ពេលវេលា ឬចុចលើឆ្នាំ ដើម្បីមើលថាការរកឃើញនីមួយៗបានផ្អែកលើអ្វីដែលមុនវាយ៉ាងណា។",
            )}
          </p>
        </div>

        {/* Prev / Next nav (desktop) */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveId(sorted[Math.max(0, activeIdx - 1)]!.id)}
            disabled={activeIdx === 0}
            aria-label={t("Previous event", "ព្រឹត្តិការណ៍មុន")}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveId(sorted[Math.min(sorted.length - 1, activeIdx + 1)]!.id)}
            disabled={activeIdx === sorted.length - 1}
            aria-label={t("Next event", "ព្រឹត្តិការណ៍បន្ទាប់")}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable rail */}
      <div
        ref={railRef}
        onKeyDown={handleKey}
        className="relative overflow-x-auto overflow-y-visible pb-2 [scrollbar-color:rgba(148,163,184,0.4)_transparent] [scrollbar-width:thin]"
        role="group"
        aria-label={t("Timeline events", "ព្រឹត្តិការណ៍ខ្សែបន្ទាត់ពេលវេលា")}
      >
        <div
          className="relative"
          style={{
            minWidth: typeof window !== "undefined" && window.innerWidth < 640 ? TRACK_MIN_PX_MOBILE : TRACK_MIN_PX,
            height: 180,
          }}
        >
          {/* Glowing rail line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(125,211,252,0) 0%, rgba(125,211,252,0.5) 8%, rgba(167,139,250,0.7) 50%, rgba(125,211,252,0.5) 92%, rgba(125,211,252,0) 100%)",
              boxShadow: "0 0 12px rgba(167,139,250,0.55), 0 0 24px rgba(125,211,252,0.35)",
            }}
          />
          {/* Tick marks (year axis) */}
          {TICK_YEARS.map((y) => (
            <div
              key={y}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${pct(y)}%` }}
              aria-hidden="true"
            >
              <div className="w-px h-3 bg-white/15 mx-auto" />
              <div className="text-[9px] font-mono text-white/35 mt-1 -translate-x-1/2 absolute left-0 whitespace-nowrap">
                {y}
              </div>
            </div>
          ))}

          {/* Markers — alternate above/below rail to avoid overlap */}
          {sorted.map((e, i) => (
            <Marker
              key={e.id}
              e={e}
              index={i}
              total={sorted.length}
              active={activeId === e.id}
              hovered={hoverId === e.id && activeId !== e.id}
              onSelect={setActiveId}
              onHover={setHoverId}
              flipDown={i % 2 === 1}
              kh={kh}
            />
          ))}
        </div>
      </div>

      {/* Mobile hint */}
      <p
        className={`sm:hidden text-[11px] text-white/40 text-center mt-1 ${kh ? "font-khmer" : ""}`}
      >
        {t("← swipe the timeline →", "← អូសខ្សែបន្ទាត់ពេលវេលា →")}
      </p>

      {/* Detail card */}
      <div className="relative mt-6 sm:mt-7">
        <DetailCard e={active} onSelect={setActiveId} kh={kh} t={t} />
      </div>

      {/* Footer counter */}
      <p
        className={`relative text-xs text-white/40 mt-4 text-center ${kh ? "font-khmer" : ""}`}
      >
        {t(
          `Event ${activeIdx + 1} of ${sorted.length} · ${YEAR_MIN}–${YEAR_MAX}`,
          `ព្រឹត្តិការណ៍ ${activeIdx + 1} ក្នុងចំនោម ${sorted.length} · ${YEAR_MIN}–${YEAR_MAX}`,
        )}
      </p>
    </section>
  );
}
