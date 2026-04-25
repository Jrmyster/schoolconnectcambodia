import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Lightbulb,
  Flame,
  Wheat,
  Disc3,
  ScrollText,
  FileText,
  Type,
  Bomb,
  Compass,
  Printer,
  Phone,
  Radio,
  Tv,
  Zap,
  Car,
  Plane,
  Syringe,
  Scissors,
  Cpu,
  Globe,
  Mountain,
  Filter,
  X,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-TECH-INVENTIONS · The Builders of Reality:
//                       Most Important Inventions in History
//                       អ្នកកសាងភាពពិត៖ ការច្នៃប្រឌិតដ៏សំខាន់បំផុតក្នុងប្រវត្តិសាស្ត្រ
//
//  Sub-module under /technology.
//
//  Five categories, 18 inventions total, sortable by category filter.
//  Aesthetic: Historical Archive — bronze accents, parchment whites,
//  deep architectural blues. Calm, scholarly, museum-grade.
// ════════════════════════════════════════════════════════════════════════════

const BRONZE = "#a16207";          // yellow-700
const BRONZE_BRIGHT = "#ca8a04";   // yellow-600
const BRONZE_GLOW = "#eab308";     // yellow-500
const BRONZE_DEEP = "#713f12";     // yellow-900
const BRONZE_PALE = "#fef3c7";     // amber-100

const PARCHMENT = "#fdf8eb";
const PARCHMENT_WARM = "#f7efd6";
const PARCHMENT_DEEP = "#ede0b8";

const INK_NAVY = "#0f1d3a";
const INK_BLUE = "#1e3a5f";
const INK_SOFT = "#334155";

const PAGE_BG: React.CSSProperties = {
  background:
    `radial-gradient(700px 400px at 95% -10%, rgba(202, 138, 4, 0.18), transparent 70%), ` +
    `radial-gradient(900px 500px at -10% 110%, rgba(30, 58, 95, 0.18), transparent 70%), ` +
    `linear-gradient(180deg, ${PARCHMENT} 0%, ${PARCHMENT_WARM} 50%, ${PARCHMENT} 100%)`,
};

// Subtle parchment "fibres" via a faint dotted texture
const PARCHMENT_TEXTURE: React.CSSProperties = {
  backgroundColor: PARCHMENT,
  backgroundImage:
    `radial-gradient(rgba(180, 83, 9, 0.06) 1px, transparent 1px), ` +
    `radial-gradient(rgba(30, 58, 95, 0.05) 1px, transparent 1px)`,
  backgroundSize: "22px 22px, 36px 36px",
  backgroundPosition: "0 0, 11px 11px",
};

// ── Data ────────────────────────────────────────────────────────────────────

type CategoryId = 1 | 2 | 3 | 4 | 5;

type Category = {
  id: CategoryId;
  shortEn: string;
  shortKh: string;
  longEn: string;
  longKh: string;
  icon: LucideIcon;
};

const CATEGORIES: Category[] = [
  {
    id: 1,
    shortEn: "Foundations of Civilization",
    shortKh: "មូលដ្ឋានគ្រឹះនៃអរិយធម៌",
    longEn: "The Foundations of Civilization",
    longKh: "មូលដ្ឋានគ្រឹះនៃអរិយធម៌",
    icon: Mountain,
  },
  {
    id: 2,
    shortEn: "China's Four Great Inventions",
    shortKh: "ការច្នៃប្រឌិតអស្ចារ្យទាំងបួនរបស់ចិន",
    longEn: "The Four Great Inventions of China",
    longKh: "ការច្នៃប្រឌិតដ៏អស្ចារ្យទាំងបួនរបស់ចិន",
    icon: Compass,
  },
  {
    id: 3,
    shortEn: "Information & Communication",
    shortKh: "ព័ត៌មាន និងទំនាក់ទំនង",
    longEn: "Information and Communication",
    longKh: "ព័ត៌មាន និងទំនាក់ទំនង",
    icon: Radio,
  },
  {
    id: 4,
    shortEn: "Energy & Transportation",
    shortKh: "ថាមពល និងការដឹកជញ្ជូន",
    longEn: "Energy and Transportation",
    longKh: "ថាមពល និងការដឹកជញ្ជូន",
    icon: Zap,
  },
  {
    id: 5,
    shortEn: "Modern Science & Industry",
    shortKh: "វិទ្យាសាស្ត្រ និងឧស្សាហកម្មទំនើប",
    longEn: "Modern Science & Industry",
    longKh: "វិទ្យាសាស្ត្រ និងឧស្សាហកម្មទំនើប",
    icon: Cpu,
  },
];

type Invention = {
  id: string;
  category: CategoryId;
  nameEn: string;
  nameKh: string;
  dateEn: string;
  dateKh: string;
  impactEn: string;
  impactKh: string;
  icon: LucideIcon;
};

const INVENTIONS: Invention[] = [
  // ── Category 1 · Foundations of Civilization ──
  {
    id: "fire",
    category: 1,
    nameEn: "Fire Control",
    nameKh: "ការគ្រប់គ្រងភ្លើង",
    dateEn: "≈ 1,000,000 BC",
    dateKh: "≈ ១,០០០,០០០ មុន គ.ស.",
    impactEn:
      "The first technology — and the one that made every other technology possible. Tamed fire let early humans cook food (extracting far more energy from each meal), survive cold nights, scare off predators, and eventually heat ore until it ran like water. Without fire there is no metal, no glass, no ceramics, no steam engine.",
    impactKh:
      "បច្ចេកវិទ្យាដំបូងបង្អស់ — និងជាបច្ចេកវិទ្យាដែលធ្វើឱ្យបច្ចេកវិទ្យាផ្សេងទៀតទាំងអស់អាចកើតមាន។ ភ្លើងដែលបានគ្រប់គ្រងបាន អនុញ្ញាតឱ្យមនុស្សដើមដំបូងចម្អិនអាហារ (ទាញយកថាមពលច្រើនជាងពីអាហារនីមួយៗ) រស់រានពីយប់ត្រជាក់ បង្ហើយសត្វព្រៃ និងចុងក្រោយកម្ដៅរ៉ែឱ្យហូរដូចទឹក។ បើគ្មានភ្លើងទេ គ្មានលោហៈ គ្មានកញ្ចក់ គ្មានសេរ៉ាមិច គ្មានម៉ាស៊ីនចំហាយឡើយ។",
    icon: Flame,
  },
  {
    id: "agriculture",
    category: 1,
    nameEn: "Agriculture",
    nameKh: "កសិកម្ម",
    dateEn: "≈ 10,000 BC",
    dateKh: "≈ ១០,០០០ មុន គ.ស.",
    impactEn:
      "When humans figured out that seeds could be planted on purpose, the entire species stopped wandering. Permanent settlements became possible, food surpluses fed people who didn't have to hunt — priests, scribes, builders, soldiers. Civilization itself is downstream of a few wild grasses being domesticated into wheat and rice.",
    impactKh:
      "នៅពេលដែលមនុស្សបានរកឃើញថា គ្រាប់ពូជអាចត្រូវបានដាំដោយចេតនា ប្រភេទសត្វទាំងមូលឈប់ដើរវង្វេង។ ការតាំងលំនៅអចិន្ត្រៃយ៍បានក្លាយជាអាចទៅរួច អាហារលើសផ្ដល់អាហារដល់មនុស្សដែលមិនចាំបាច់បរបាញ់ — បូជាចារ្យ ស្មៀន អ្នកសាងសង់ ទាហាន។ អរិយធម៌ខ្លួនវាមានប្រភពពីការដាំផ្សំស្មៅព្រៃមួយចំនួនឱ្យក្លាយជាស្រូវសាលី និងស្រូវ។",
    icon: Wheat,
  },
  {
    id: "wheel",
    category: 1,
    nameEn: "The Wheel",
    nameKh: "កង់",
    dateEn: "c. 3500 BC",
    dateKh: "ប្រ. ៣៥០០ មុន គ.ស.",
    impactEn:
      "First used by Mesopotamian potters to spin clay, then turned on its side to roll a load. Suddenly a single ox could move what ten people could not. Every cart, every chariot, every clock gear, every turbine, every car descends from this single circle.",
    impactKh:
      "ដំបូងបានប្រើដោយអ្នកធ្វើផើងមេសូប៉ូតាមៀ ដើម្បីបង្វិលដីឥដ្ឋ បន្ទាប់មកបានបង្វិលទៅចំហៀង ដើម្បីរមៀលបន្ទុក។ ភ្លាមៗមួយ គោឈ្មោលអាចផ្លាស់ទីនូវអ្វីដែលមនុស្សដប់នាក់មិនអាច។ រទេះនីមួយៗ រទេះសេះនីមួយៗ ស្ពឺនាឡិកា ទួប៊ីន រថយន្តនីមួយៗ ចុះមកពីរង្វង់តែមួយនេះ។",
    icon: Disc3,
  },
  {
    id: "writing",
    category: 1,
    nameEn: "Written Language",
    nameKh: "អក្សរសិល្ប៍",
    dateEn: "c. 2900 BC",
    dateKh: "ប្រ. ២៩០០ មុន គ.ស.",
    impactEn:
      "For the first time, knowledge could survive its inventor. A farmer's irrigation calendar, a doctor's recipes, a king's laws — all could now travel across centuries without a single human voice repeating them. Every book, every contract, every line of code is a child of cuneiform pressed into wet clay.",
    impactKh:
      "ជាលើកដំបូង ចំណេះដឹងអាចរស់រានពីអ្នកច្នៃប្រឌិតរបស់វា។ ប្រតិទិនធារាសាស្ត្ររបស់កសិករ រូបមន្តរបស់វេជ្ជបណ្ឌិត ច្បាប់របស់ស្ដេច — ទាំងអស់នេះឥឡូវនេះអាចធ្វើដំណើរឆ្លងកាត់សតវត្សដោយគ្មានសំឡេងមនុស្សតែមួយធ្វើការនិយាយឡើងវិញ។ សៀវភៅនីមួយៗ កិច្ចសន្យានីមួយៗ បន្ទាត់កូដនីមួយៗ គឺជាកូននៃអក្សរ Cuneiform ដែលចុចលើដីឥដ្ឋស្ងួត។",
    icon: ScrollText,
  },

  // ── Category 2 · The Four Great Inventions of China ──
  {
    id: "papermaking",
    category: 2,
    nameEn: "Papermaking",
    nameKh: "ការផលិតក្រដាស",
    dateEn: "c. 105 AD",
    dateKh: "ប្រ. ១០៥ គ.ស.",
    impactEn:
      "Cai Lun, a Han-dynasty official, mashed mulberry bark, hemp, and old fishing nets into a slurry, screened it flat, and let it dry. Suddenly information had a cheap, lightweight body. Knowledge stopped being a thing that only kings could afford to copy.",
    impactKh:
      "Cai Lun មន្ត្រីរាជវង្ស Han បានកិនសំបកដើមមនាង សរសៃកញ្ឆា និងសំណាញ់នេសាទចាស់ ឱ្យក្លាយជាល្បាយរាវ ច្រោះវាឱ្យសំប៉ែត និងទុកឱ្យស្ងួត។ ភ្លាមៗមួយ ព័ត៌មានមានរូបកាយដ៏ថោក និងស្រាល។ ចំណេះដឹងលែងជារបស់ដែលមានតែស្ដេចទេ ដែលអាចមានលទ្ធភាពចម្លងបាន។",
    icon: FileText,
  },
  {
    id: "movable-type",
    category: 2,
    nameEn: "Printing (Movable Type)",
    nameKh: "ការបោះពុម្ព (តួអក្សរផ្លាស់ទីបាន)",
    dateEn: "c. 1040 AD",
    dateKh: "ប្រ. ១០៤០ គ.ស.",
    impactEn:
      "Bi Sheng of Song-dynasty China carved each character onto a small ceramic block. The blocks could be arranged into a page, inked, pressed, and then re-arranged for the next page. Books that had taken months to copy by hand could now be reproduced in a day. Texts went from rare to many.",
    impactKh:
      "Bi Sheng នៃរាជវង្ស Song របស់ចិន បានឆ្លាក់តួអក្សរនីមួយៗលើដុំសេរ៉ាមិចតូចមួយ។ ដុំទាំងនេះអាចត្រូវរៀបជាទំព័រ លាបទឹកខ្មៅ ចុច ហើយបន្ទាប់មករៀបឡើងវិញសម្រាប់ទំព័របន្ទាប់។ សៀវភៅដែលត្រូវការច្រើនខែដើម្បីចម្លងដោយដៃ ឥឡូវនេះអាចត្រូវផលិតឡើងវិញក្នុងមួយថ្ងៃ។ អត្ថបទបានប្រែពីកម្រ ទៅជាច្រើន។",
    icon: Type,
  },
  {
    id: "gunpowder",
    category: 2,
    nameEn: "Gunpowder",
    nameKh: "ដីកាំភ្លើង",
    dateEn: "c. 9th century",
    dateKh: "ប្រ. សតវត្សទី ៩",
    impactEn:
      "Discovered by Tang-dynasty alchemists searching for an elixir of immortality — a mixture of saltpetre, sulphur, and charcoal. It permanently rewrote the engineering of warfare (cannons, firearms) and built the modern world's tunnels, mines, and quarries.",
    impactKh:
      "បានរកឃើញដោយអ្នកល្បែងគីមីនៃរាជវង្ស Tang ដែលកំពុងស្វែងរកអំបិលអមតៈ — ល្បាយនៃសារធាតុអំបិលផែនដី ស្ពាន់ធ័រ និងធ្យូង។ វាបានសរសេរឡើងវិញជាអចិន្ត្រៃយ៍នូវវិស្វកម្មនៃសង្គ្រាម (កាំភ្លើងធំ កាំភ្លើង) និងបានសាងសង់រូងក្រោមដី រ៉ែ និងអន្លង់នៃពិភពលោកទំនើប។",
    icon: Bomb,
  },
  {
    id: "compass",
    category: 2,
    nameEn: "The Compass",
    nameKh: "ត្រីវិស័យ",
    dateEn: "c. 206 BC",
    dateKh: "ប្រ. ២០៦ មុន គ.ស.",
    impactEn:
      "A sliver of magnetised iron, free to swing, points to a magnetic pole that no one can see. With it, a sailor can hold a course across an open ocean for weeks without a single landmark. Global trade, the Age of Exploration, and the connecting of the continents are all built on top of this one trembling needle.",
    impactKh:
      "បំណែកដែកដែលជាប់មេដែក ដែលអាចបង្វិលដោយសេរី ចង្អុលទៅប៉ូលមេដែកដែលគ្មាននរណាអាចមើលឃើញ។ ជាមួយវា អ្នកនេសាទអាចរក្សាទិសដៅឆ្លងកាត់មហាសមុទ្របើកចំហរយៈពេលច្រើនសប្ដាហ៍ ដោយគ្មានសញ្ញាសម្គាល់តែមួយ។ ពាណិជ្ជកម្មសកល យុគនៃការរុករក និងការតភ្ជាប់ទ្វីបទាំងអស់ ត្រូវបានសាងសង់នៅលើម្ជុលញ័រនេះតែមួយ។",
    icon: Compass,
  },

  // ── Category 3 · Information & Communication ──
  {
    id: "press",
    category: 3,
    nameEn: "The Printing Press",
    nameKh: "ម៉ាស៊ីនបោះពុម្ព",
    dateEn: "1440s",
    dateKh: "ឆ្នាំ ១៤៤០",
    impactEn:
      "Johannes Gutenberg combined a wine-press, oil-based ink, and a metal alphabet into a single machine that could push a perfect page in seconds. Within fifty years, more books had been printed in Europe than had been hand-copied in the previous thousand. The Reformation, the scientific revolution, and the modern public mind all begin here.",
    impactKh:
      "Johannes Gutenberg បានបន្សំម៉ាស៊ីនច្របាច់ស្រា ទឹកខ្មៅប្រេង និងអក្សរលោហៈ ទៅជាម៉ាស៊ីនតែមួយ ដែលអាចបោះពុម្ពទំព័រដ៏ល្អឥតខ្ចោះក្នុងរយៈពេលប៉ុន្មានវិនាទី។ ក្នុងរយៈពេលហាសិបឆ្នាំ សៀវភៅច្រើនត្រូវបានបោះពុម្ពនៅអឺរ៉ុបជាងសៀវភៅដែលបានចម្លងដោយដៃក្នុងរយៈពេលមួយពាន់ឆ្នាំមុន។ ការកែទម្រង់សាសនា បដិវត្តន៍វិទ្យាសាស្ត្រ និងគំនិតសាធារណៈទំនើប ទាំងអស់ចាប់ផ្ដើមនៅទីនេះ។",
    icon: Printer,
  },
  {
    id: "telephone",
    category: 3,
    nameEn: "The Telephone",
    nameKh: "ទូរស័ព្ទ",
    dateEn: "1876",
    dateKh: "ឆ្នាំ ១៨៧៦",
    impactEn:
      "Alexander Graham Bell turned a sound wave into an electrical wave, sent it down a copper wire, and turned it back into a sound at the other end. For the first time in human history, two people could speak in real time across hundreds of miles. Distance, the oldest enemy of conversation, was defeated.",
    impactKh:
      "Alexander Graham Bell បានប្រែរលកសំឡេងទៅជារលកអគ្គិសនី បញ្ជូនវាតាមខ្សែទង់ដែង និងប្រែវាត្រឡប់ជាសំឡេងវិញនៅចុងម្ខាងទៀត។ ជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រមនុស្សជាតិ មនុស្សពីរនាក់អាចនិយាយក្នុងពេលវេលាជាក់ស្ដែងឆ្លងកាត់ចម្ងាយរាប់រយម៉ាយល៍។ ចម្ងាយ — ខ្មាំងសត្រូវចាស់បំផុតនៃការសន្ទនា — ត្រូវបានវាយឆ្លង។",
    icon: Phone,
  },
  {
    id: "radio",
    category: 3,
    nameEn: "Radio & Television",
    nameKh: "វិទ្យុ និងទូរទស្សន៍",
    dateEn: "1895 / 1927",
    dateKh: "១៨៩៥ / ១៩២៧",
    impactEn:
      "Marconi proved that information could fly through empty air without any wire. A single broadcast tower could now reach a million ears at the same instant — and a few decades later, a million eyes. Mass communication created shared news, shared music, shared culture, and shared elections on a scale never before possible.",
    impactKh:
      "Marconi បានបង្ហាញថា ព័ត៌មានអាចហោះតាមខ្យល់ទទេដោយគ្មានខ្សែ។ ប៉មផ្សាយតែមួយ ឥឡូវនេះអាចទៅដល់ត្រចៀកមួយលាននៅពេលដូចគ្នា — ហើយប៉ុន្មានទសវត្សក្រោយមក ភ្នែកមួយលាន។ ទំនាក់ទំនងជាមហាជនបានបង្កើតព័ត៌មានចែករំលែក តន្ត្រីចែករំលែក វប្បធម៌ចែករំលែក និងការបោះឆ្នោតចែករំលែក នៅលើទំហំដែលមិនធ្លាប់មានពីមុនមក។",
    icon: Tv,
  },

  // ── Category 4 · Energy & Transportation ──
  {
    id: "electricity",
    category: 4,
    nameEn: "Electricity",
    nameKh: "អគ្គិសនី",
    dateEn: "Late 19th century",
    dateKh: "ចុងសតវត្សទី ១៩",
    impactEn:
      "Faraday discovered the link between magnetism and electric current; Edison and Tesla turned that link into city-sized power grids. With one switch, the night was conquered, factories ran 24 hours, and any future invention could simply plug into the wall. Electricity is the silent utility under everything modern.",
    impactKh:
      "Faraday បានរកឃើញការភ្ជាប់រវាងមេដែក និងចរន្តអគ្គិសនី; Edison និង Tesla បានប្រែការភ្ជាប់នោះទៅជាបណ្ដាញថាមពលធំទំហំទីក្រុង។ ជាមួយកុងតាក់តែមួយ យប់ត្រូវបានវាយឆ្លង រោងចក្ររត់ ២៤ ម៉ោង ហើយការច្នៃប្រឌិតនាពេលអនាគតគ្រាន់តែដោតចូលជញ្ជាំង។ អគ្គិសនីគឺជាប្រការសេវាស្ងាត់ស្ងៀមនៅខាងក្រោមអ្វីៗគ្រប់យ៉ាងទំនើប។",
    icon: Zap,
  },
  {
    id: "automobile",
    category: 4,
    nameEn: "The Automobile",
    nameKh: "រថយន្ត",
    dateEn: "1885",
    dateKh: "ឆ្នាំ ១៨៨៥",
    impactEn:
      "Karl Benz bolted a small petrol engine to a three-wheeled carriage. Within a generation, every city in the world was being torn down and rebuilt around the car — wider streets, traffic lights, suburbs, garages, and the petrol station. Personal mobility became a baseline expectation of modern life.",
    impactKh:
      "Karl Benz បានភ្ជាប់ម៉ាស៊ីនសាំងតូចមួយទៅរទេះបីកង់។ ក្នុងរយៈពេលមួយជំនាន់ ទីក្រុងគ្រប់ទីកន្លែងនៅលើពិភពលោកត្រូវបានរុះរើ និងសាងសង់ឡើងវិញជុំវិញរថយន្ត — ផ្លូវធំទូលាយ ភ្លើងសញ្ញា ជាយក្រុង រោងរថយន្ត និងស្ថានីយសាំង។ ការធ្វើដំណើរផ្ទាល់ខ្លួនបានក្លាយជាការរំពឹងទុកជាមូលដ្ឋាននៃជីវិតទំនើប។",
    icon: Car,
  },
  {
    id: "airplane",
    category: 4,
    nameEn: "The Airplane",
    nameKh: "យន្តហោះ",
    dateEn: "1903",
    dateKh: "ឆ្នាំ ១៩០៣",
    impactEn:
      "The Wright brothers proved that a heavier-than-air machine, with the right wing curve and a small engine, could lift, sustain, and steer flight. The planet shrank from months to hours. Today every continent is one day's travel from every other.",
    impactKh:
      "បងប្អូន Wright បានបង្ហាញថា ម៉ាស៊ីនធ្ងន់ជាងខ្យល់ ដែលមានកោងស្លាបត្រឹមត្រូវ និងម៉ាស៊ីនតូចមួយ អាចលើកឡើង រក្សា និងបញ្ជាការហោះហើរ។ ភពផែនដីបានតូចចុះពីច្រើនខែទៅជាច្រើនម៉ោង។ សព្វថ្ងៃនេះ ទ្វីបនីមួយៗគឺនៅឆ្ងាយតែមួយថ្ងៃនៃការធ្វើដំណើរពីទ្វីបនីមួយៗផ្សេងទៀត។",
    icon: Plane,
  },

  // ── Category 5 · Modern Science & Industry ──
  {
    id: "vaccines",
    category: 5,
    nameEn: "Vaccines & Antibiotics",
    nameKh: "វ៉ាក់សាំង និងថ្នាំអង់ទីប៊ីយ៉ូទិច",
    dateEn: "1796 / 1928",
    dateKh: "១៧៩៦ / ១៩២៨",
    impactEn:
      "Edward Jenner's vaccine taught the immune system to fight smallpox before it ever arrived; Alexander Fleming's penicillin killed bacteria that had killed humans for ten thousand years. Together they roughly doubled the human lifespan. Most people reading this would not be alive without them.",
    impactKh:
      "វ៉ាក់សាំងរបស់ Edward Jenner បានបង្រៀនប្រព័ន្ធការពាររាងកាយឱ្យប្រយុទ្ធជាមួយជំងឺអុតស្វាយ មុនពេលវាមកដល់; ប៉េនីស៊ីលីនរបស់ Alexander Fleming បានសម្លាប់បាក់តេរីដែលបានសម្លាប់មនុស្សអស់រយៈពេលមួយម៉ឺនឆ្នាំ។ រួមគ្នា ពួកវាបានបង្កើនអាយុជីវិតមនុស្សប្រហែលទ្វេដង។ មនុស្សភាគច្រើនដែលកំពុងអានរឿងនេះ នឹងមិនរស់នៅទេបើគ្មានវា។",
    icon: Syringe,
  },
  {
    id: "sewing",
    category: 5,
    nameEn: "The Sewing Machine",
    nameKh: "ម៉ាស៊ីនដេរ",
    dateEn: "1846",
    dateKh: "ឆ្នាំ ១៨៤៦",
    impactEn:
      "Elias Howe's lock-stitch machine sewed in seconds what a tailor sewed in hours. It was the spark of the textile industrial revolution and freed millions of women from a lifetime of hand-stitching, allowing them — for the first time — to enter wider work and education.",
    impactKh:
      "ម៉ាស៊ីនដេរប្រភេទ Lock-stitch របស់ Elias Howe បានដេរក្នុងរយៈពេលប៉ុន្មានវិនាទីនូវអ្វីដែលជាងកាត់ដេរទាំងមូលដេរក្នុងរយៈពេលច្រើនម៉ោង។ វាជាផ្កាភ្លើងនៃបដិវត្តន៍ឧស្សាហកម្មវាយនភណ្ឌ និងបានដោះលែងស្ត្រីរាប់លាននាក់ពីជីវិតពេញមួយជីវិតនៃការដេរដោយដៃ អនុញ្ញាតឱ្យពួកគេ — ជាលើកដំបូង — ចូលទៅក្នុងការងារ និងការសិក្សាដ៏ទូលំទូលាយ។",
    icon: Scissors,
  },
  {
    id: "transistor",
    category: 5,
    nameEn: "The Transistor",
    nameKh: "ត្រង់ស៊ីស្ទ័រ",
    dateEn: "1947",
    dateKh: "ឆ្នាំ ១៩៤៧",
    impactEn:
      "At Bell Labs, Bardeen, Brattain, and Shockley built a tiny silicon switch that could amplify or block an electric current. Today's smartphone holds about ten billion of them — each smaller than a virus. Every computer, every phone, every satellite, every car's brain is a city of transistors.",
    impactKh:
      "នៅ Bell Labs លោក Bardeen, Brattain និង Shockley បានបង្កើតកុងតាក់ស៊ីលីកុនតូចមួយ ដែលអាចពង្រីក ឬបិទចរន្តអគ្គិសនី។ ស្មាតហ្វូននាពេលបច្ចុប្បន្នកាន់ប្រហែលដប់ពាន់លានរបស់វា — នីមួយៗតូចជាងវីរុស។ កុំព្យូទ័រនីមួយៗ ទូរស័ព្ទនីមួយៗ ផ្កាយរណបនីមួយៗ ខួរក្បាលរថយន្តនីមួយៗ គឺជាទីក្រុងនៃត្រង់ស៊ីស្ទ័រ។",
    icon: Cpu,
  },
  {
    id: "internet",
    category: 5,
    nameEn: "The Internet",
    nameKh: "អ៊ីនធឺណែត",
    dateEn: "1969 / 1990s",
    dateKh: "១៩៦៩ / ១៩៩០",
    impactEn:
      "What started as a U.S. military experiment to keep computers talking after a nuclear attack became, in three decades, the global nervous system of the human race. Almost every fact ever written down is now one query away from anyone with a connection. This page reaches you because of it.",
    impactKh:
      "អ្វីដែលបានចាប់ផ្ដើមជាការពិសោធន៍យោធារបស់សហរដ្ឋអាមេរិច ដើម្បីរក្សាកុំព្យូទ័រឱ្យនិយាយបន្តបន្ទាប់ពីការវាយប្រហារនុយក្លេអ៊ែរ បានក្លាយជាប្រព័ន្ធសរសៃប្រសាទសកលនៃមនុស្សជាតិ ក្នុងរយៈពេលបីទសវត្ស។ ស្ទើរតែគ្រប់ការពិតដែលធ្លាប់បានសរសេរ ឥឡូវនេះស្ថិតនៅឆ្ងាយតែមួយការសួរពីនរណាម្នាក់ដែលមានការតភ្ជាប់។ ទំព័រនេះមកដល់អ្នកដោយសារតែវា។",
    icon: Globe,
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function GreatInventionsPage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  // Filter state — null means "All"
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const filtered = useMemo(
    () => (activeCategory === null ? INVENTIONS : INVENTIONS.filter((i) => i.category === activeCategory)),
    [activeCategory],
  );

  // Group by category for display
  const grouped = useMemo(() => {
    const map = new Map<CategoryId, Invention[]>();
    for (const inv of filtered) {
      const arr = map.get(inv.category) ?? [];
      arr.push(inv);
      map.set(inv.category, arr);
    }
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen text-slate-900" style={PAGE_BG}>
      {/* ── Top: back link ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: BRONZE_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </div>

      {/* ── Hero ── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: "rgba(202, 138, 4, 0.15)",
            border: `1px solid ${BRONZE}55`,
            color: BRONZE_DEEP,
          }}
        >
          <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Technology · The Great Inventions", "បច្ចេកវិទ្យា · ការច្នៃប្រឌិតដ៏អស្ចារ្យ")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK_NAVY }}
        >
          {k ? (
            <>
              អ្នកកសាងភាពពិត៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRONZE_BRIGHT}, ${BRONZE_DEEP}, ${BRONZE_BRIGHT})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ការច្នៃប្រឌិតដ៏សំខាន់បំផុតក្នុងប្រវត្តិសាស្ត្រ
              </span>
            </>
          ) : (
            <>
              The Builders of Reality:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRONZE_BRIGHT}, ${BRONZE_DEEP}, ${BRONZE_BRIGHT})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Most Important Inventions in History
              </span>
            </>
          )}
        </h1>

        <p
          className={`max-w-3xl text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {t(
            "Every house you sleep in, every meal you cook, every sentence you read, every voice you hear across an ocean — all of it traces back to a small number of inventions. Eighteen of them, grouped into five families. Filter by category to study one branch at a time, or browse them all and watch the chain of ideas walk from a chipped flint to the screen you are reading right now.",
            "ផ្ទះនីមួយៗដែលអ្នកគេង អាហារនីមួយៗដែលអ្នកចម្អិន ប្រយោគនីមួយៗដែលអ្នកអាន សំឡេងនីមួយៗដែលអ្នកលឺឆ្លងកាត់មហាសមុទ្រ — ទាំងអស់នេះតាមមកពីការច្នៃប្រឌិតមួយចំនួនតូច។ ដប់ប្រាំបីនៃវា រៀបជាគ្រួសារប្រាំ។ ច្រោះតាមប្រភេទ ដើម្បីសិក្សាមែកធាងម្ដងមួយ ឬរុករកពួកវាទាំងអស់ និងមើលច្រវាក់នៃគំនិតដើរពីដុំថ្មចំទៅអេក្រង់ដែលអ្នកកំពុងអានឥឡូវនេះ។",
          )}
        </p>

        {/* Quick stats */}
        <div className="mt-7 grid grid-cols-3 sm:max-w-md gap-3">
          <StatTile valueEn="18" valueKh="១៨" descEn="Inventions" descKh="ការច្នៃប្រឌិត" />
          <StatTile valueEn="5" valueKh="៥" descEn="Categories" descKh="ប្រភេទ" />
          <StatTile valueEn="12,000+" valueKh="១២,០០០+" descEn="Years covered" descKh="ឆ្នាំគ្របដណ្ដប់" />
        </div>
      </header>

      {/* ── Category filter ── */}
      <section
        id="filter"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sticky top-16 z-20"
        aria-label={t("Category filter", "តម្រងតាមប្រភេទ")}
      >
        <div
          className="rounded-xl p-3 sm:p-4"
          style={{
            background: "rgba(253, 248, 235, 0.92)",
            border: `1px solid ${BRONZE}55`,
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px -12px rgba(15, 29, 58, 0.15)",
          }}
          data-testid="category-filter"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4" style={{ color: BRONZE_DEEP }} aria-hidden="true" />
            <span
              className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer tracking-normal normal-case" : ""}`}
              style={{ color: BRONZE_DEEP }}
            >
              {t("Filter by category", "ច្រោះតាមប្រភេទ")}
            </span>
            {activeCategory !== null && (
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`ml-auto inline-flex items-center gap-1 text-xs font-semibold hover:underline ${k ? "font-khmer" : ""}`}
                style={{ color: BRONZE_DEEP }}
                data-testid="filter-clear"
              >
                <X className="w-3 h-3" aria-hidden="true" />
                {t("Clear", "សម្អាត")}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
              en="All"
              kh="ទាំងអស់"
              count={INVENTIONS.length}
              k={k}
              testId="filter-all"
            />
            {CATEGORIES.map((cat) => {
              const count = INVENTIONS.filter((i) => i.category === cat.id).length;
              return (
                <FilterButton
                  key={cat.id}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  en={cat.shortEn}
                  kh={cat.shortKh}
                  count={count}
                  k={k}
                  icon={cat.icon}
                  testId={`filter-cat-${cat.id}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Inventions ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" data-testid="inventions-list">
        {CATEGORIES.map((cat) => {
          const items = grouped.get(cat.id);
          if (!items || items.length === 0) return null;
          return (
            <section
              key={cat.id}
              id={`category-${cat.id}`}
              className="mb-10 scroll-mt-32"
              data-testid={`category-section-${cat.id}`}
            >
              <CategoryHeader category={cat} k={k} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {items.map((inv) => (
                  <InventionCard key={inv.id} inv={inv} k={k} />
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: PARCHMENT_DEEP, color: INK_SOFT }}
          >
            {t("No inventions match this filter.", "គ្មានការច្នៃប្រឌិតត្រូវនឹងតម្រងនេះទេ។")}
          </div>
        )}
      </main>

      {/* ── Closing CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${INK_NAVY} 0%, ${INK_BLUE} 60%, ${BRONZE_DEEP} 160%)`,
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(202, 138, 4, 0.45)" }}
            aria-hidden="true"
          />
          <Lightbulb className="w-10 h-10 mx-auto mb-3" style={{ color: BRONZE_GLOW }} aria-hidden="true" />
          <h3
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 text-white ${k ? "font-khmer leading-loose" : ""}`}
          >
            {t(
              "Every modern miracle stands on someone else's idea.",
              "អព្ភូតហេតុទំនើបនីមួយៗឈរលើគំនិតរបស់នរណាម្នាក់ផ្សេងទៀត។",
            )}
          </h3>
          <p
            className={`text-sm sm:text-base text-slate-200 max-w-2xl mx-auto ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "The next great invention will probably also start as something small — a thought, a sketch, a question — in the mind of a student who refused to think the world was already finished.",
              "ការច្នៃប្រឌិតដ៏អស្ចារ្យបន្ទាប់ប្រហែលជានឹងចាប់ផ្ដើមជារបស់តូចមួយ — គំនិត ការគូរ សំណួរ — នៅក្នុងគំនិតរបស់សិស្សម្នាក់ ដែលបដិសេធនឹងគិតថាពិភពលោកត្រូវបានបញ្ចប់រួចហើយ។",
            )}
          </p>
        </div>
      </section>

      {/* Footer back link */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-bold shadow hover:opacity-90 transition-opacity tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "uppercase"}`}
          style={{ backgroundColor: BRONZE_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Building blocks
// ════════════════════════════════════════════════════════════════════════════

function FilterButton({
  active,
  onClick,
  en,
  kh,
  count,
  k,
  icon: Icon,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  en: string;
  kh: string;
  count: number;
  k: boolean;
  icon?: LucideIcon;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      data-active={active}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${k ? "font-khmer" : ""}`}
      style={
        active
          ? {
              background: BRONZE_DEEP,
              color: PARCHMENT,
              border: `1px solid ${BRONZE_DEEP}`,
              boxShadow: `0 1px 0 ${BRONZE_BRIGHT}55`,
            }
          : {
              background: PARCHMENT,
              color: INK_NAVY,
              border: `1px solid ${BRONZE}55`,
            }
      }
    >
      {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{k ? kh : en}</span>
      <span
        className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full px-1.5 text-[10px] font-mono font-bold"
        style={
          active
            ? { background: BRONZE_BRIGHT, color: INK_NAVY }
            : { background: PARCHMENT_DEEP, color: BRONZE_DEEP }
        }
      >
        {count}
      </span>
    </button>
  );
}

function CategoryHeader({ category, k }: { category: Category; k: boolean }) {
  const Icon = category.icon;
  return (
    <div
      className="rounded-lg px-4 py-3 flex items-center gap-3"
      style={{
        background: `linear-gradient(90deg, ${INK_NAVY} 0%, ${INK_BLUE} 100%)`,
        borderLeft: `4px solid ${BRONZE_BRIGHT}`,
      }}
    >
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0"
        style={{ background: "rgba(202, 138, 4, 0.18)", color: BRONZE_GLOW, border: `1px solid ${BRONZE}88` }}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div
          className={`text-[10px] font-bold tracking-widest uppercase ${k ? "font-khmer tracking-normal normal-case" : ""}`}
          style={{ color: BRONZE_GLOW }}
        >
          {k
            ? `ប្រភេទ ${katNumKh(category.id)}`
            : `Category ${category.id}`}
        </div>
        <h2 className={`text-base sm:text-lg font-bold text-white ${k ? "font-khmer" : ""}`}>
          {k ? category.longKh : category.longEn}
        </h2>
      </div>
    </div>
  );
}

function katNumKh(n: number) {
  const map = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return String(n)
    .split("")
    .map((c) => map[+c])
    .join("");
}

function InventionCard({ inv, k }: { inv: Invention; k: boolean }) {
  const Icon = inv.icon;
  return (
    <article
      className="group relative rounded-xl p-5 flex flex-col h-full transition-shadow hover:shadow-lg"
      style={{
        ...PARCHMENT_TEXTURE,
        border: `1px solid ${BRONZE}55`,
        boxShadow: `inset 0 1px 0 ${PARCHMENT}, 0 2px 8px -4px rgba(15, 29, 58, 0.18)`,
      }}
      data-testid={`invention-${inv.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-md flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${BRONZE_BRIGHT} 0%, ${BRONZE_DEEP} 100%)`,
            color: PARCHMENT,
            border: `1px solid ${BRONZE_DEEP}`,
            boxShadow: `inset 0 1px 0 ${BRONZE_GLOW}66`,
          }}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-bold leading-tight ${k ? "font-khmer" : ""}`} style={{ color: INK_NAVY }}>
            {k ? inv.nameKh : inv.nameEn}
          </h3>
          <div
            className={`text-[11px] font-mono font-bold mt-1 tracking-wide ${k ? "font-khmer tracking-normal" : ""}`}
            style={{ color: BRONZE_DEEP }}
          >
            {k ? inv.dateKh : inv.dateEn}
          </div>
        </div>
      </div>
      <p
        className={`text-sm flex-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? inv.impactKh : inv.impactEn}
      </p>
    </article>
  );
}

function StatTile({
  valueEn,
  valueKh,
  descEn,
  descKh,
}: {
  valueEn: string;
  valueKh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const k = language === "kh";
  return (
    <div
      className="rounded-xl p-3 text-center"
      style={{
        background: "rgba(253, 248, 235, 0.85)",
        border: `1px solid ${BRONZE}55`,
      }}
    >
      <div
        className={`font-display font-bold text-2xl leading-tight ${k ? "font-khmer" : ""}`}
        style={{ color: BRONZE_DEEP }}
      >
        {k ? valueKh : valueEn}
      </div>
      <div
        className={`text-[11px] mt-0.5 ${k ? "font-khmer" : ""}`}
        style={{ color: INK_SOFT }}
      >
        {k ? descKh : descEn}
      </div>
    </div>
  );
}
