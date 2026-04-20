import { useEffect, useRef, useState } from "react";
import {
  History, ChevronLeft, ChevronRight, X, ArrowLeftRight, Sparkles, TrendingUp,
  Calculator, Cog, Zap, Cpu, Monitor, BrainCircuit, Hand, Lightbulb,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Era = {
  id: string;
  year: string;          // display year, e.g. "~3000 BC", "1837", "Today"
  yearNumeric: number;   // for the chart (negative for BC)
  icon: ComponentType<{ className?: string }>;
  nameEn: string;
  nameKh: string;
  taglineEn: string;
  taglineKh: string;
  shortEn: string;
  shortKh: string;
  longEn: string;
  longKh: string;
  /** Retro→Futuristic palette */
  bg: string;            // tailwind bg classes for card body
  border: string;        // tailwind border color
  text: string;          // tailwind text on header
  accent: string;        // hex for chips & glow
  /** "Then vs Now" comparison rows */
  thenLabelEn: string; thenLabelKh: string;
  nowLabelEn: string;   nowLabelKh: string;
  rows: { en: string; kh: string; then: string; now: string }[];
  punchEn: string; punchKh: string;
};

const ERAS: Era[] = [
  {
    id: "abacus",
    year: "~3000 BC", yearNumeric: -3000,
    icon: Calculator,
    nameEn: "The Abacus",
    nameKh: "ដែកគណនា (បុរាណ)",
    taglineEn: "The first 'manual computer.'",
    taglineKh: "«កុំព្យូទ័រដោយដៃ» ដំបូងបង្អស់របស់ពិភពលោក។",
    shortEn: "Wooden beads on rods — used by traders for thousands of years.",
    shortKh: "គ្រាប់ឈើលើដំបង — ប្រើដោយឈ្មួញរាប់ពាន់ឆ្នាំ។",
    longEn: "Long before electricity, merchants in Mesopotamia, China, and Cambodia used bead-frames called abacuses to add, subtract, multiply, and trade. A trained user could calculate as fast as some modern calculators — using only fingers and beads.",
    longKh: "មុនពេលមានអគ្គិសនី ឈ្មួញនៅមេសូប៉ូតាមី ចិន និងកម្ពុជា ប្រើស៊ុមគ្រាប់ដែលហៅថាដែកគណនា ដើម្បីបូក ដក គុណ និងធ្វើពាណិជ្ជកម្ម។ អ្នកប្រើដែលហ្វឹកហាត់ល្អ អាចគណនាបានលឿនដូចម៉ាស៊ីនគិតលេខទំនើបខ្លះ — ដោយប្រើតែម្រាមដៃ និងគ្រាប់។",
    bg: "from-amber-50 via-amber-100 to-yellow-50",
    border: "border-amber-700/60",
    text: "text-amber-900",
    accent: "#92400e",
    thenLabelEn: "Then — Abacus", thenLabelKh: "ពេលនោះ — ដែកគណនា",
    nowLabelEn: "Now — Smartphone", nowLabelKh: "ឥឡូវ — ស្មាតហ្វូន",
    rows: [
      { en: "Speed",   kh: "ល្បឿន",    then: "~1 calc/sec",        now: "5,000,000,000 / sec" },
      { en: "Power",   kh: "ថាមពល",    then: "Human fingers only",  now: "5 watts" },
      { en: "Memory",  kh: "អង្គចងចាំ", then: "~10 numbers",         now: "8 GB (8 billion bytes)" },
      { en: "Cost",    kh: "តម្លៃ",     then: "A few coins",         now: "$200–$1,000" },
    ],
    punchEn: "Your phone does in 1 second what an abacus user would need 158 years to do.",
    punchKh: "ស្មាតហ្វូនរបស់អ្នក ធ្វើបានក្នុង ១ វិនាទី នូវអ្វីដែលអ្នកប្រើដែកគណនាត្រូវការ ១៥៨ ឆ្នាំដើម្បីធ្វើ។",
  },
  {
    id: "babbage",
    year: "1837", yearNumeric: 1837,
    icon: Cog,
    nameEn: "The Analytical Engine",
    nameKh: "ម៉ាស៊ីនវិភាគ",
    taglineEn: "Babbage & Lovelace — a programmable dream.",
    taglineKh: "Babbage និង Lovelace — សុបិនកម្មវិធី។",
    shortEn: "A mechanical computer made of brass gears — designed but never finished.",
    shortKh: "កុំព្យូទ័រមេកានិកធ្វើពីប្រដាប់ស្ពាន់ — រចនា ប៉ុន្តែមិនបានបញ្ចប់។",
    longEn: "British inventor Charles Babbage designed a giant brass calculating machine driven by a steam engine. His friend Ada Lovelace wrote the world's first computer program for it — over 100 years before the first electric computer. The machine was so advanced it was never finished in their lifetimes.",
    longKh: "អ្នកបង្កើតជនជាតិអង់គ្លេស Charles Babbage បានរចនាម៉ាស៊ីនគណនាស្ពាន់ដ៏ធំ ដែលដំណើរការដោយម៉ាស៊ីនចំហាយ។ មិត្តភក្តិរបស់គាត់ Ada Lovelace បានសរសេរកម្មវិធីកុំព្យូទ័រដំបូងបង្អស់របស់ពិភពលោកសម្រាប់វា — ជាង ១០០ ឆ្នាំ មុនកុំព្យូទ័រអគ្គិសនីដំបូង។ ម៉ាស៊ីនទំនើបពេកដល់ម្ល៉េះ វាមិនត្រូវបានបញ្ចប់ក្នុងជីវិតរបស់ពួកគេ។",
    bg: "from-yellow-50 via-orange-50 to-amber-50",
    border: "border-orange-800/60",
    text: "text-orange-900",
    accent: "#9a3412",
    thenLabelEn: "Then — Analytical Engine", thenLabelKh: "ពេលនោះ — ម៉ាស៊ីនវិភាគ",
    nowLabelEn: "Now — Laptop", nowLabelKh: "ឥឡូវ — កុំព្យូទ័រយួរដៃ",
    rows: [
      { en: "Material", kh: "សម្ភារ",   then: "Brass gears + steam", now: "Silicon transistors" },
      { en: "Size",     kh: "ទំហំ",     then: "Size of a small house", now: "Fits in a backpack" },
      { en: "Programs", kh: "កម្មវិធី", then: "1 (never run)",        now: "Millions of apps" },
      { en: "Built?",   kh: "សាងសង់?",  then: "No — too complex",     now: "Yes — billions made" },
    ],
    punchEn: "Ada Lovelace wrote the first program for a machine that didn't exist yet.",
    punchKh: "Ada Lovelace សរសេរកម្មវិធីដំបូងបង្អស់សម្រាប់ម៉ាស៊ីនមួយ ដែលនៅមិនទាន់មានទេ។",
  },
  {
    id: "eniac",
    year: "1946", yearNumeric: 1946,
    icon: Zap,
    nameEn: "Vacuum Tubes — ENIAC",
    nameKh: "បំពង់ហ្វាមូឡា — ENIAC",
    taglineEn: "The room-sized computer.",
    taglineKh: "កុំព្យូទ័រធំស្មើបន្ទប់!",
    shortEn: "ENIAC weighed 30 tons and used 17,468 glowing glass tubes.",
    shortKh: "ENIAC ធ្ងន់ ៣០ តោន ហើយប្រើបំពង់កែវភ្លឺ ១៧,៤៦៨ ដើម។",
    longEn: "ENIAC, built at the end of World War II, was the first general-purpose ELECTRIC computer. It filled an entire room, used as much power as a small village, and a vacuum tube would burn out roughly every 2 days — engineers walked the room with replacements. Yet it could calculate 1,000 times faster than the best mechanical machines of its time.",
    longKh: "ENIAC ដែលត្រូវបានសាងសង់នៅចុងសង្គ្រាមលោកលើកទី២ ជាកុំព្យូទ័រអគ្គិសនីប្រើប្រាស់ទូទៅដំបូងបង្អស់។ វាបានបំពេញបន្ទប់មួយ ប្រើថាមពលដូចភូមិតូចមួយ ហើយបំពង់ហ្វាមូឡារលត់ប្រហែលរៀងរាល់ ២ ថ្ងៃម្ដង — វិស្វករដើរក្នុងបន្ទប់ដោយយកដាក់ជំនួស។ ប៉ុន្តែវាអាចគណនាបានលឿនជាងម៉ាស៊ីនមេកានិកល្អបំផុតនាសម័យនោះ ១,០០០ ដង។",
    bg: "from-orange-50 via-red-50 to-amber-50",
    border: "border-red-800/60",
    text: "text-red-900",
    accent: "#b91c1c",
    thenLabelEn: "Then — ENIAC (1946)", thenLabelKh: "ពេលនោះ — ENIAC (១៩៤៦)",
    nowLabelEn: "Now — Smartphone", nowLabelKh: "ឥឡូវ — ស្មាតហ្វូន",
    rows: [
      { en: "Weight", kh: "ទម្ងន់",      then: "30,000 kg (30 tons)",  now: "0.15 kg (150 g)" },
      { en: "Size",   kh: "ទំហំ",        then: "167 m² (whole room)",  now: "Fits in your hand" },
      { en: "Power",  kh: "ថាមពល",       then: "150,000 watts",        now: "5 watts" },
      { en: "Speed",  kh: "ល្បឿន",       then: "5,000 calc/sec",        now: "5,000,000,000 / sec" },
      { en: "Cost",   kh: "តម្លៃ",       then: "$6 million (1946)",     now: "$200–$1,000" },
    ],
    punchEn: "Your phone is 1 million times faster than ENIAC and weighs 200,000× less.",
    punchKh: "ស្មាតហ្វូនរបស់អ្នក លឿនជាង ENIAC ១ លានដង និងស្រាលជាង ២០០,០០០ ដង។",
  },
  {
    id: "transistor",
    year: "1947", yearNumeric: 1947,
    icon: Cpu,
    nameEn: "The Transistor",
    nameKh: "ត្រង់ស៊ីស្ទ័រ",
    taglineEn: "Small. Cool. Fast.",
    taglineKh: "តូច។ ត្រជាក់។ លឿន។",
    shortEn: "A tiny switch — millions can fit on a fingernail.",
    shortKh: "កុងតាក់តូចមួយ — រាប់លានអាចសមលើក្រចកដៃ។",
    longEn: "At Bell Labs in 1947, three scientists invented the transistor — a tiny electric switch with no glass, no moving parts, and almost no heat. It replaced the giant vacuum tube. Engineers could pack thousands, then millions, then BILLIONS of them onto a single silicon chip — the secret behind every modern computer, phone, and game console.",
    longKh: "នៅ Bell Labs ក្នុងឆ្នាំ ១៩៤៧ វិទ្យាសាស្ត្រវិទូបី រូបបានបង្កើតត្រង់ស៊ីស្ទ័រ — កុងតាក់អគ្គិសនីតូច គ្មានកែវ គ្មានផ្នែកផ្លាស់ទី និងស្ទើរតែគ្មានកំដៅ។ វាបានជំនួសបំពង់ហ្វាមូឡាដ៏ធំ។ វិស្វករអាចដាក់រាប់ពាន់ បន្ទាប់មករាប់លាន បន្ទាប់មក រាប់ពាន់លាន លើបន្ទះស៊ីលីកុនតែមួយ — អាថ៌កំបាំងពីក្រោយកុំព្យូទ័រ ទូរស័ព្ទ និងហ្គេមកុងសូលទំនើបនីមួយៗ។",
    bg: "from-emerald-50 via-teal-50 to-cyan-50",
    border: "border-teal-700/60",
    text: "text-teal-900",
    accent: "#0f766e",
    thenLabelEn: "Then — 1 vacuum tube", thenLabelKh: "ពេលនោះ — បំពង់ ១",
    nowLabelEn: "Now — 1 modern chip", nowLabelKh: "ឥឡូវ — បន្ទះមួយ",
    rows: [
      { en: "Size of one switch", kh: "ទំហំកុងតាក់មួយ", then: "5 cm of glass tube", now: "5 nanometers (1/10,000 of a hair)" },
      { en: "Switches per chip",  kh: "កុងតាក់ក្នុងបន្ទះ", then: "1",                   now: "15,000,000,000+" },
      { en: "Heat",              kh: "កំដៅ",          then: "Burns hot",            now: "Cool to the touch" },
      { en: "Lifetime",          kh: "ជីវិត",          then: "Burns out in days",    now: "20+ years" },
    ],
    punchEn: "If transistors hadn't shrunk, today's smartphone CPU would be the size of a city.",
    punchKh: "បើត្រង់ស៊ីស្ទ័រមិនបានកាន់តែតូច CPU នៃស្មាតហ្វូនសព្វថ្ងៃនឹងធំស្មើទីក្រុងមួយ។",
  },
  {
    id: "pc",
    year: "1977", yearNumeric: 1977,
    icon: Monitor,
    nameEn: "The Personal Computer",
    nameKh: "កុំព្យូទ័រផ្ទាល់ខ្លួន",
    taglineEn: "From labs into homes.",
    taglineKh: "ពីមន្ទីរពិសោធន៍មកក្នុងផ្ទះ។",
    shortEn: "Apple II, Commodore 64, IBM PC — computers everyone could own.",
    shortKh: "Apple II, Commodore 64, IBM PC — កុំព្យូទ័រដែលគ្រប់គ្នាអាចមាន។",
    longEn: "For the first time, a computer was small enough and cheap enough to sit on a desk in someone's home — not just a university or factory. Kids could write code, play games, and create art. This sparked the software revolution: word processors, spreadsheets, video games, and eventually the internet itself.",
    longKh: "ជាលើកដំបូង កុំព្យូទ័រមានទំហំតូច និងថ្លៃល្មម អាចដាក់លើតុនៅផ្ទះណាម្នាក់ — មិនមែនត្រឹមតែសាកលវិទ្យាល័យ ឬរោងចក្រឡើយ។ កុមារអាចសរសេរកូដ លេងហ្គេម និងបង្កើតសិល្បៈ។ រឿងនេះបានបង្កើតបដិវត្តន៍កម្មវិធី៖ កម្មវិធីវាយអក្សរ តារាងបញ្ជី ហ្គេមវីដេអូ ហើយចុងបំផុតគឺអ៊ីនធឺណិតផ្ទាល់។",
    bg: "from-sky-50 via-indigo-50 to-blue-50",
    border: "border-blue-700/60",
    text: "text-blue-900",
    accent: "#1d4ed8",
    thenLabelEn: "Then — Apple II (1977)", thenLabelKh: "ពេលនោះ — Apple II (១៩៧៧)",
    nowLabelEn: "Now — Modern Laptop", nowLabelKh: "ឥឡូវ — កុំព្យូទ័រយួរដៃទំនើប",
    rows: [
      { en: "RAM",     kh: "RAM",      then: "4 KB",            now: "8,000,000 KB (8 GB)" },
      { en: "Storage", kh: "អង្គផ្ទុក", then: "0.14 MB cassette", now: "500,000 MB (500 GB)" },
      { en: "Screen",  kh: "អេក្រង់",   then: "40 × 24 letters",  now: "1920 × 1080 pixels" },
      { en: "Price",   kh: "តម្លៃ",     then: "$1,298 (~$6,500 today)", now: "$400–$1,500" },
    ],
    punchEn: "A modern laptop has 2 million times more memory than the Apple II.",
    punchKh: "កុំព្យូទ័រយួរដៃទំនើបមួយ មានអង្គចងចាំច្រើនជាង Apple II ២ លានដង។",
  },
  {
    id: "ai",
    year: "Today", yearNumeric: 2024,
    icon: BrainCircuit,
    nameEn: "AI & The Singularity",
    nameKh: "បញ្ញាសិប្បនិម្មិត និងការរួមបញ្ចូល",
    taglineEn: "Computers that 'think' and create.",
    taglineKh: "កុំព្យូទ័រដែល «គិត» និងបង្កើត។",
    shortEn: "Machines that learn languages, draw pictures, and answer questions.",
    shortKh: "ម៉ាស៊ីនដែលរៀនភាសា គូររូប និងឆ្លើយសំណួរ។",
    longEn: "Modern AI systems can write essays, translate Khmer to 100 other languages, paint pictures, and discover medicines. They don't think like humans — they recognize patterns from billions of examples. Some scientists believe we're approaching the 'Singularity' — a moment when machines become smarter than humans. The future is being written right now, and YOU get to help write it.",
    longKh: "ប្រព័ន្ធ AI ទំនើប អាចសរសេរអត្ថបទ បកប្រែខ្មែរទៅ ១០០ ភាសាផ្សេង គូររូប និងរកថ្នាំ។ ពួកវាមិនគិតដូចមនុស្សទេ — ពួកវាស្គាល់លំនាំពីឧទាហរណ៍រាប់ពាន់លាន។ វិទ្យាសាស្ត្រវិទូខ្លះជឿថា យើងកំពុងខិតទៅជិត «ការរួមបញ្ចូល» — ពេលដែលម៉ាស៊ីនកាន់តែឆ្លាតជាងមនុស្ស។ អនាគតកំពុងសរសេរនៅឥឡូវនេះ ហើយ អ្នក អាចជួយសរសេរវា។",
    bg: "from-violet-950 via-blue-950 to-fuchsia-950",
    border: "border-fuchsia-400/70",
    text: "text-fuchsia-200",
    accent: "#d946ef",
    thenLabelEn: "Then — A trained human", thenLabelKh: "ពេលនោះ — មនុស្សដែលបានហ្វឹកហាត់",
    nowLabelEn: "Now — Modern AI", nowLabelKh: "ឥឡូវ — AI ទំនើប",
    rows: [
      { en: "Words read",       kh: "ពាក្យបានអាន",     then: "~1 billion (full lifetime)", now: "13,000,000,000,000 (13 trillion)" },
      { en: "Languages spoken", kh: "ភាសាដែលនិយាយ",   then: "1–5 fluently",               now: "100+ at once" },
      { en: "Time to write 1 essay", kh: "ពេលសរសេរអត្ថបទ ១", then: "30–60 minutes",              now: "2 seconds" },
      { en: "Energy used",      kh: "ថាមពលប្រើ",       then: "~100 watts (your brain)",     now: "Megawatts (huge data centers)" },
    ],
    punchEn: "AI is powerful, but YOU still decide what's true, kind, and useful.",
    punchKh: "AI មានឥទ្ធិពល ប៉ុន្តែ អ្នក នៅតែសម្រេចថាអ្វីពិត ល្អ និងមានប្រយោជន៍។",
  },
];

/* ──────────────────────────────────────────────────────────────────── */

export function HistoryOfComputingTimeline() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? ERAS.find((e) => e.id === openId) ?? null : null;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ active: boolean; startX: number; startScroll: number; moved: boolean }>({
    active: false, startX: 0, startScroll: 0, moved: false,
  });

  function arrow(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-era-card]");
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  // Mouse drag-to-scroll
  function onMouseDown(e: React.MouseEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { active: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false };
    el.classList.add("cursor-grabbing");
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragState.current.active || !scrollerRef.current) return;
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    scrollerRef.current.scrollLeft = dragState.current.startScroll - dx;
  }
  function endDrag() {
    if (scrollerRef.current) scrollerRef.current.classList.remove("cursor-grabbing");
    setTimeout(() => { dragState.current.active = false; }, 0);
  }
  function tryOpen(id: string) {
    if (dragState.current.moved) { dragState.current.moved = false; return; }
    setOpenId(id);
  }

  // ESC closes modal
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-white to-fuchsia-950 border-4 border-amber-700 shadow-2xl overflow-hidden"
         style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fff 35%, #1e1b4b 80%, #2e1065 100%)" }}>
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 border-b-2 border-amber-700/40 bg-gradient-to-r from-amber-100/90 via-white/80 to-indigo-950/40 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-amber-700 flex items-center justify-center flex-shrink-0 shadow-md">
            <History className="w-7 h-7 sm:w-8 sm:h-8 text-amber-800" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-900 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{kh ? "ប្រវត្តិ" : "History"}</span>
              <span className="opacity-50">/</span>
              <span>{kh ? "៣០០០ មុន គ.ស. → ឥឡូវ" : "3000 BC → Today"}</span>
            </div>
            <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? "ប្រវត្តិរូបវិទ្យាកុំព្យូទ័រ" : "The History of Computing"}
              {kh && <span className="ml-2 text-sm text-stone-500 font-sans font-normal">(History of Computing)</span>}
            </h3>
            <p className={`mt-1 text-sm text-stone-700 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh
                ? "អូសតាមពេលវេលា — ពីដែកគណនាបុរាណ ដល់ AI ទំនើប។ ចុចលើសម័យកាលណាមួយ ដើម្បីមើលការប្រៀបធៀប «ពេលនោះ ប្រឆាំង​នឹង​ឥឡូវ»។"
                : "Drag along the timeline — from the ancient abacus to modern AI. Tap any era for a 'Then vs. Now' comparison."}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline + arrows */}
      <div className="relative bg-stone-50/60">
        {/* Era count + drag hint */}
        <div className={`flex items-center justify-between px-5 py-2 text-[11px] font-mono text-stone-600 ${kh ? "font-khmer text-xs" : ""}`}>
          <span className="inline-flex items-center gap-1.5">
            <Hand className="w-3 h-3" />
            {kh ? "អូសផ្ដេក →" : "Drag horizontally →"}
          </span>
          <span>{ERAS.length} {kh ? "សម័យ" : "eras"}</span>
        </div>

        {/* Arrow buttons */}
        <button onClick={() => arrow(-1)}
          aria-label={kh ? "មុន" : "Previous"}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-2 border-stone-300 shadow-md items-center justify-center text-stone-700 hover:bg-amber-50 hover:border-amber-500 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => arrow(1)}
          aria-label={kh ? "បន្ទាប់" : "Next"}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-2 border-stone-300 shadow-md items-center justify-center text-stone-700 hover:bg-fuchsia-50 hover:border-fuchsia-500 transition">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className="overflow-x-auto cursor-grab select-none px-5 pb-6 pt-3"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Era cards row */}
          <div className="relative flex items-stretch gap-6 min-w-max">
            {/* Connecting line behind cards */}
            <div className="absolute left-4 right-4 top-[112px] h-1 rounded-full pointer-events-none"
                 style={{ background: "linear-gradient(90deg, #92400e 0%, #c2410c 25%, #0f766e 50%, #1d4ed8 75%, #d946ef 100%)" }} />
            {ERAS.map((era, i) => (
              <EraCard key={era.id} era={era} kh={kh} index={i} onClick={() => tryOpen(era.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Law of Accelerating Returns chart */}
      <div className="p-5 sm:p-6 bg-slate-950 border-t-4 border-fuchsia-500/60 text-fuchsia-100">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-fuchsia-500/15 border-2 border-fuchsia-400/60 flex items-center justify-center flex-shrink-0 text-fuchsia-300">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-fuchsia-300/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ច្បាប់" : "The Law"}
            </div>
            <h4 className={`font-display text-lg sm:text-xl font-bold text-white leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? "ច្បាប់នៃការត្រឡប់មកវិញដែលលឿនជាងមុន" : "The Law of Accelerating Returns"}
              {kh && <span className="ml-2 text-sm text-fuchsia-300/70 font-sans font-normal">(Accelerating Returns)</span>}
            </h4>
            <p className={`mt-1 text-xs sm:text-sm text-fuchsia-100/80 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
              {kh
                ? "កាន់តែយូរ ការផ្លាស់ប្ដូរបន្ទាប់កាន់តែឆាប់មកដល់។"
                : "The longer technology has been around, the SHORTER the gap between major leaps."}
            </p>
          </div>
        </div>
        <AccelerationChart kh={kh} />
        <div className="mt-3 grid sm:grid-cols-3 gap-2 text-xs">
          <Stat color="#fbbf24" labelEn="Abacus → Babbage" labelKh="ដែកគណនា → Babbage" valueEn="≈ 4,837 years" valueKh="≈ ៤,៨៣៧ ឆ្នាំ" kh={kh} />
          <Stat color="#22c55e" labelEn="Tubes → Transistor" labelKh="បំពង់ → ត្រង់ស៊ីស្ទ័រ" valueEn="≈ 5 years"     valueKh="≈ ៥ ឆ្នាំ"     kh={kh} />
          <Stat color="#d946ef" labelEn="PC → AI explosion"  labelKh="PC → ការផ្ទុះ AI"   valueEn="≈ 47 years"    valueKh="≈ ៤៧ ឆ្នាំ"    kh={kh} />
        </div>
      </div>

      {/* Modal */}
      {open && <ThenVsNowModal era={open} kh={kh} onClose={() => setOpenId(null)} />}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function EraCard({ era, kh, index, onClick }: { era: Era; kh: boolean; index: number; onClick: () => void }) {
  const Icon = era.icon;
  const isAi = era.id === "ai";
  return (
    <div data-era-card className="flex flex-col items-center" style={{ width: "260px" }}>
      {/* Year badge */}
      <div className={`mb-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold border-2 shadow-sm whitespace-nowrap ${
        isAi ? "bg-slate-900 text-fuchsia-200 border-fuchsia-400" : "bg-white text-stone-800 border-stone-400"
      }`}>
        {era.year}
      </div>
      {/* Marker dot */}
      <div className="w-5 h-5 rounded-full border-4 border-white shadow-md mb-3" style={{ backgroundColor: era.accent, boxShadow: isAi ? `0 0 12px ${era.accent}` : undefined }} />

      {/* Card */}
      <button
        onClick={onClick}
        className={`group relative w-full text-left rounded-2xl border-2 ${era.border} bg-gradient-to-br ${era.bg} p-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] ${
          isAi ? "text-fuchsia-100" : "text-stone-900"
        }`}
        style={isAi ? { boxShadow: `0 0 24px ${era.accent}33`, background: "linear-gradient(135deg, #1e1b4b, #2e1065 60%, #4a044e)" } : undefined}
      >
        {/* Index badge top-right */}
        <span className={`absolute top-2 right-2 w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
          isAi ? "bg-fuchsia-500 text-white" : "bg-white text-stone-700 border border-stone-300"
        }`}>{index + 1}</span>

        <div className="flex items-center gap-2 mb-2">
          <div className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center ${
            isAi ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200" : "bg-white border-stone-300"
          }`} style={!isAi ? { color: era.accent } : undefined}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <h5 className={`font-display font-bold text-base leading-tight ${era.text} ${kh ? "font-khmer leading-snug text-lg" : ""}`}>
          {kh ? era.nameKh : era.nameEn}
        </h5>
        {kh && (
          <div className={`text-[11px] italic mt-0.5 leading-tight ${isAi ? "text-fuchsia-200/70" : "text-stone-500"}`}>{era.nameEn}</div>
        )}
        <p className={`mt-1 text-xs font-bold ${isAi ? "text-fuchsia-300" : ""} ${kh ? "font-khmer text-sm" : ""}`}
           style={!isAi ? { color: era.accent } : undefined}>
          {kh ? era.taglineKh : era.taglineEn}
        </p>
        <p className={`mt-1.5 text-xs leading-relaxed ${isAi ? "text-fuchsia-100/80" : "text-stone-700"} ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
          {kh ? era.shortKh : era.shortEn}
        </p>

        {/* CTA */}
        <div className={`mt-3 pt-2 border-t inline-flex items-center gap-1 text-[11px] font-bold ${
          isAi ? "border-fuchsia-400/40 text-fuchsia-300" : "border-stone-300/70"
        } ${kh ? "font-khmer text-xs" : ""}`}
             style={!isAi ? { color: era.accent } : undefined}>
          <ArrowLeftRight className="w-3 h-3" />
          {kh ? "មើល «ពេលនោះ ប្រឆាំងនឹង​ឥឡូវ»" : "Then vs. Now"}
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
        </div>
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function Stat({ color, labelEn, labelKh, valueEn, valueKh, kh }: { color: string; labelEn: string; labelKh: string; valueEn: string; valueKh: string; kh: boolean }) {
  return (
    <div className="rounded-lg bg-slate-900 border border-slate-700 p-2.5">
      <div className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`} style={{ color }}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`text-sm font-extrabold text-white ${kh ? "font-khmer text-base" : "font-mono"}`}>
        {kh ? valueKh : valueEn}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function AccelerationChart({ kh }: { kh: boolean }) {
  // Six milestones: years (using 1 BC = 0 for log convenience, replace with offset)
  // We display as bars of GAP from previous milestone, on a log scale.
  const MS = [
    { id: "abacus",     label: { en: "Abacus",       kh: "ដែកគណនា" }, year: -3000 },
    { id: "babbage",    label: { en: "Babbage",      kh: "Babbage" },   year: 1837 },
    { id: "eniac",      label: { en: "ENIAC",        kh: "ENIAC" },     year: 1946 },
    { id: "transistor", label: { en: "Transistor",   kh: "ត្រង់ស៊ីស្ទ័រ" }, year: 1947 },
    { id: "pc",         label: { en: "Personal PC",  kh: "PC" },         year: 1977 },
    { id: "ai",         label: { en: "AI explosion", kh: "AI" },         year: 2024 },
  ];
  const gaps: { from: string; to: string; gap: number; color: string }[] = [];
  const palette = ["#fbbf24", "#fb923c", "#22c55e", "#0ea5e9", "#a855f7", "#d946ef"];
  for (let i = 1; i < MS.length; i++) {
    const g = MS[i].year - MS[i - 1].year;
    gaps.push({ from: MS[i - 1].label[kh ? "kh" : "en"], to: MS[i].label[kh ? "kh" : "en"], gap: g, color: palette[i - 1] });
  }
  const maxGap = Math.max(...gaps.map((g) => g.gap));
  const logMax = Math.log10(maxGap);

  // SVG dimensions
  const W = 640, H = 180, padL = 40, padR = 20, padT = 12, padB = 50;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const barW = innerW / gaps.length - 8;

  return (
    <div className="rounded-xl bg-slate-900 border border-fuchsia-500/30 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="Gap between major computing inventions, log scale">
        {/* Y-axis grid */}
        {[1, 10, 100, 1000].map((tick) => {
          const y = padT + innerH - (Math.log10(tick) / logMax) * innerH;
          return (
            <g key={tick}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#334155" strokeDasharray="3 4" strokeWidth="0.6" />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#64748b" fontFamily="ui-monospace">{tick}</text>
            </g>
          );
        })}
        <text x="6" y={padT + 8} fontSize="9" fill="#a78bfa" fontFamily="ui-monospace"
              style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
          {kh ? "ឆ្នាំ" : "YEARS"}
        </text>

        {/* Bars */}
        {gaps.map((g, i) => {
          const h = (Math.log10(g.gap) / logMax) * innerH;
          const x = padL + i * (innerW / gaps.length) + 4;
          const y = padT + innerH - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h} rx="2" fill={g.color} opacity="0.9"
                    style={{ filter: `drop-shadow(0 0 4px ${g.color}88)` }} />
              {/* Value on top of bar */}
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={g.color} fontFamily="ui-monospace">
                {g.gap.toLocaleString()}
              </text>
              {/* X-axis arrow label: from → to */}
              <text x={x + barW / 2} y={padT + innerH + 14} textAnchor="middle" fontSize="9" fill="#cbd5e1" fontFamily="ui-monospace"
                    style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
                {g.from}
              </text>
              <text x={x + barW / 2} y={padT + innerH + 25} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="ui-monospace"
                    style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
                ↓
              </text>
              <text x={x + barW / 2} y={padT + innerH + 36} textAnchor="middle" fontSize="9" fontWeight="700" fill="#e2e8f0" fontFamily="ui-monospace"
                    style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
                {g.to}
              </text>
            </g>
          );
        })}

        {/* Trend arrow */}
        <g>
          <line x1={padL + 10} y1={padT + 18} x2={W - padR - 20} y2={padT + innerH - 12}
                stroke="#d946ef" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.85" />
          <polygon points={`${W - padR - 26},${padT + innerH - 18} ${W - padR - 14},${padT + innerH - 8} ${W - padR - 26},${padT + innerH - 4}`}
                   fill="#d946ef" opacity="0.85" />
          <text x={W - padR - 60} y={padT + 26} fontSize="9" fontWeight="700" fill="#f0abfc" fontFamily="ui-monospace"
                style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
            {kh ? "កាន់តែលឿន!" : "FASTER!"}
          </text>
        </g>
      </svg>
      <div className={`mt-2 flex items-center gap-1.5 text-[11px] text-fuchsia-200/80 ${kh ? "font-khmer text-xs" : ""}`}>
        <Lightbulb className="w-3 h-3" />
        {kh
          ? "កំណត់ចំណាំ៖ កម្រិតបញ្ឈរប្រើ log scale ដូច្នេះរបារនីមួយៗតំណាងឱ្យខ្ទង់ ១០ ដង។"
          : "Note: vertical axis is a log scale, so each bar level = 10× larger."}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function ThenVsNowModal({ era, kh, onClose }: { era: Era; kh: boolean; onClose: () => void }) {
  const Icon = era.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
         onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div role="dialog" aria-modal="true" aria-label={`${era.nameEn} — Then vs. Now`}
           onClick={(e) => e.stopPropagation()}
           className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border-4 animate-in zoom-in-95 duration-200"
           style={{ borderColor: era.accent }}>
        {/* Header */}
        <div className={`p-5 sm:p-6 bg-gradient-to-br ${era.bg} border-b-2 relative`} style={{ borderColor: `${era.accent}50` }}>
          <button onClick={onClose}
                  aria-label={kh ? "បិទ" : "Close"}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white border-2 flex items-center justify-center text-stone-700 shadow"
                  style={{ borderColor: era.accent }}>
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border-2 flex items-center justify-center flex-shrink-0 shadow"
                 style={{ borderColor: era.accent, color: era.accent }}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${era.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {era.year}
              </div>
              <h4 className={`font-display text-xl sm:text-2xl font-bold ${era.text} ${kh ? "font-khmer leading-snug" : ""}`}>
                {kh ? era.nameKh : era.nameEn}
              </h4>
              {kh && <div className="text-xs italic text-stone-500 mt-0.5">{era.nameEn}</div>}
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="p-5 sm:p-6 border-b-2 border-stone-100">
          <p className={`text-sm sm:text-base text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
            {kh ? era.longKh : era.longEn}
          </p>
          {kh && <p className="mt-2 text-xs italic text-stone-500 leading-relaxed">{era.longEn}</p>}
        </div>

        {/* Then vs Now */}
        <div className="p-5 sm:p-6">
          <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {kh ? "ពេលនោះ ប្រឆាំងនឹង ឥឡូវ" : "Then vs. Now"}
          </div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className={kh ? "font-khmer" : ""}>
                  <th className={`text-left px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-stone-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    {kh ? "តួរ" : "Metric"}
                  </th>
                  <th className="text-left px-3 py-2 rounded-tl-lg text-white" style={{ backgroundColor: era.accent }}>
                    {kh ? era.thenLabelKh : era.thenLabelEn}
                  </th>
                  <th className="text-left px-3 py-2 rounded-tr-lg bg-slate-900 text-fuchsia-200">
                    {kh ? era.nowLabelKh : era.nowLabelEn}
                  </th>
                </tr>
              </thead>
              <tbody>
                {era.rows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-stone-50/60" : "bg-white"}>
                    <td className={`px-3 py-2 font-bold text-stone-800 ${kh ? "font-khmer text-base" : ""}`}>
                      {kh ? r.kh : r.en}
                    </td>
                    <td className="px-3 py-2 font-mono text-stone-700">{r.then}</td>
                    <td className="px-3 py-2 font-mono font-bold" style={{ color: era.accent }}>{r.now}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Punchline */}
          <div className="mt-4 rounded-xl bg-slate-950 border-2 p-4 text-fuchsia-100 flex items-start gap-2"
               style={{ borderColor: era.accent }}>
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: era.accent }} />
            <div>
              <div className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                   style={{ color: era.accent }}>
                {kh ? "សញ្ញាគន្លឹះ" : "Mind-blowing fact"}
              </div>
              <p className={`text-sm font-bold leading-relaxed text-white ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh ? era.punchKh : era.punchEn}
              </p>
              {kh && <p className="mt-1 text-[11px] italic text-fuchsia-200/70">{era.punchEn}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
