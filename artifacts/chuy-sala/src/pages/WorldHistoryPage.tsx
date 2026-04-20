import { useEffect, useMemo, useRef, useState, useCallback, ComponentType, lazy, Suspense } from "react";
import { Link } from "wouter";

// Heavy: contains three.js + R3F. Code-split it so it only loads when this page does.
const HistoryGlobe = lazy(() => import("@/components/world-history/HistoryGlobe"));
import {
  ArrowLeft,
  Compass,
  Clock,
  X,
  ChevronRight,
  Wheat,
  Landmark,
  Cog,
  Cpu,
  Rocket,
  Hammer,
  ScrollText,
  Crown,
  Train,
  Globe,
  Smartphone,
  BrainCircuit,
  Telescope,
  Leaf,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * Content model
 * ────────────────────────────────────────────────────────────────────────────── */

type Bilingual = { en: string; kh: string };

interface Artifact {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: Bilingual;
  shortTag: Bilingual;
  body: Bilingual;
  whyItMattered: Bilingual;
}

interface Era {
  id: string;
  index: number;
  /** ARIA-friendly id for the section element */
  sectionId: string;
  /** Time Machine label, shown in the side jump menu */
  jumpLabel: Bilingual;
  dateLabel: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  theme: Bilingual;
  description: Bilingual;
  icon: ComponentType<{ className?: string }>;
  /** Tailwind gradient classes for the sticky backdrop */
  gradientClass: string;
  /** Accent color for badges, rings, buttons */
  accent: {
    badgeBg: string;
    badgeText: string;
    cardRing: string;
    nodeBg: string;
    nodeHoverBg: string;
    nodeText: string;
  };
  artifacts: Artifact[];
}

const ERAS: Era[] = [
  {
    id: "neolithic",
    index: 0,
    sectionId: "era-neolithic",
    jumpLabel: { en: "10,000 BCE", kh: "១០,០០០ មុន គ.ស." },
    dateLabel: { en: "~10,000 BCE", kh: "ប្រហែល ១០,០០០ មុន គ.ស." },
    title: {
      en: "The Neolithic Revolution",
      kh: "បដិវត្តន៍កសិកម្ម",
    },
    subtitle: { en: "From Nomads to Farmers", kh: "ពីអ្នករេរ៉ូនទៅជាកសិករ" },
    theme: { en: "Earth & Grain", kh: "ដី និងគ្រាប់ធញ្ញជាតិ" },
    description: {
      en: "For most of our history, humans wandered in small bands hunting animals and gathering wild plants. Around twelve thousand years ago, in fertile valleys from the Mekong to the Tigris, people began planting seeds on purpose. Settling down to grow rice, wheat, and barley meant food could be stored — and storing food meant villages, then towns, then the very first cities. Pottery, written records, and organized religion were all born from a single idea: we can stay in one place.",
      kh: "ភាគច្រើននៃប្រវត្តិសាស្ត្ររបស់យើង មនុស្សបានរស់នៅជាក្រុមតូចៗ ដោយប្រមាញ់សត្វ និងប្រមូលរុក្ខជាតិព្រៃ។ ប្រហែល ១២,០០០ ឆ្នាំមុន នៅតំបន់ដីមានជីជាតិពីទន្លេមេគង្គដល់ទន្លេទីហ្គ្រីស មនុស្សបានចាប់ផ្តើមដាំពូជដោយចេតនា។ ការតាំងលំនៅដើម្បីដាំស្រូវ ស្រូវសាលី និងបាឡែ មានន័យថា ម្ហូបអាចត្រូវបានរក្សាទុក — ហើយការរក្សាទុកម្ហូបនាំឲ្យមានភូមិ បន្ទាប់មកក្រុង រួចជាទីបំផុតគឺទីក្រុងដំបូងបង្អស់។ ផើងដី កំណត់ត្រាសរសេរ និងសាសនារៀបចំ កើតចេញពីគំនិតតែមួយ៖ យើងអាចស្នាក់នៅកន្លែងតែមួយបាន។",
    },
    icon: Wheat,
    gradientClass:
      "bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50",
    accent: {
      badgeBg: "bg-amber-200/80",
      badgeText: "text-amber-900",
      cardRing: "ring-amber-300/60",
      nodeBg: "bg-amber-50 hover:bg-amber-100 border-amber-300",
      nodeHoverBg: "hover:bg-amber-100",
      nodeText: "text-amber-900",
    },
    artifacts: [
      {
        id: "stone-sickle",
        icon: Hammer,
        title: { en: "The Stone Sickle", kh: "កណ្ដៀវថ្ម" },
        shortTag: { en: "Tool of the harvest", kh: "ឧបករណ៍ច្រូតកាត់" },
        body: {
          en: "A curved wooden handle with sharp flint blades pressed into it. The sickle let one farmer cut down in an hour what used to take a whole family a day to gather by hand.",
          kh: "ដងឈើកោងដែលមានផ្លែថ្មភ្លុកស្រួចបញ្ចូល។ កណ្ដៀវនេះអនុញ្ញាតឲ្យកសិករម្នាក់ច្រូតបានក្នុងមួយម៉ោងនូវចំនួនដែលគ្រួសារទាំងមូលធ្លាប់ប្រមូលដោយដៃក្នុងមួយថ្ងៃ។",
        },
        whyItMattered: {
          en: "When one person can feed many, the rest are free to become potters, builders, priests, and inventors. Specialization — and civilization itself — begins here.",
          kh: "ពេលដែលមនុស្សម្នាក់អាចចិញ្ចឹមមនុស្សជាច្រើន អ្នកដទៃទៀតមានសេរីភាពក្លាយជាជាងផើង ជាងសំណង់ បព្ជិត និងអ្នកបង្កើតថ្មី។ ការឯកទេស — និងអរិយធម៌ខ្លួនវា — ចាប់ផ្តើមនៅទីនេះ។",
        },
      },
      {
        id: "first-pottery",
        icon: ScrollText,
        title: { en: "The First Pots", kh: "ផើងដីដំបូង" },
        shortTag: { en: "Storage = surplus", kh: "ការស្តុកទុក = ភាពលើស" },
        body: {
          en: "Clay shaped by hand, hardened in fire, and used to store rice, water, and seeds away from rats and rain. Pottery turned a good harvest into a year of security.",
          kh: "ដីឥដ្ឋដែលបង្កើតដោយដៃ រឹងដោយភ្លើង ហើយប្រើដើម្បីរក្សាទុកស្រូវ ទឹក និងគ្រាប់ពូជឲ្យឆ្ងាយពីកណ្តុរ និងភ្លៀង។ ផើងដីបានប្រែដំណាំល្អមួយរដូវឲ្យជាសុវត្ថិភាពមួយឆ្នាំ។",
        },
        whyItMattered: {
          en: "Surplus food is power. It funds armies, supports artists, and lets a village survive a bad season. Pottery is quietly the foundation of every empire that came later.",
          kh: "អាហារលើសគឺជាអំណាច។ វាផ្តល់មូលនិធិដល់កងទ័ព ផ្គត់ផ្គង់សិល្បករ និងអនុញ្ញាតឲ្យភូមិមួយរស់រានពីរដូវកាលអាក្រក់។ ផើងដីគឺជាមូលដ្ឋានគ្រឹះស្ងាត់ៗនៃគ្រប់អាណាចក្រដែលកើតក្រោយមក។",
        },
      },
    ],
  },
  {
    id: "khmer-empires",
    index: 1,
    sectionId: "era-khmer-empires",
    jumpLabel: { en: "800–1400 CE", kh: "៨០០–១៤០០ គ.ស." },
    dateLabel: { en: "800 CE — 1400 CE", kh: "៨០០ — ១៤០០ គ.ស." },
    title: { en: "Ancient Empires & The Khmer Empire", kh: "អាណាចក្របុរាណ និងអាណាចក្រខ្មែរ" },
    subtitle: { en: "Cambodia at the Center of the World", kh: "កម្ពុជានៅចំកណ្តាលពិភពលោក" },
    theme: { en: "Stone, Sandstone & Sovereigns", kh: "ថ្ម ថ្មភក់ និងស្តេច" },
    description: {
      en: "While the Roman Empire crumbled and the Tang Dynasty traded along the Silk Road, a new superpower was rising in Southeast Asia. The Khmer Empire, ruled from Angkor, controlled an area larger than modern France. Its kings commanded a quarter-million workers to carve Angkor Wat from sandstone — the largest religious monument on Earth, a feat unmatched in Europe at that time. Cambodia was not a quiet corner of the world. It was a global capital of art, engineering, and faith.",
      kh: "នៅពេលដែលអាណាចក្ររ៉ូម៉ាំងបានដួលរលំ និងរាជវង្សតាងបានធ្វើពាណិជ្ជកម្មតាមផ្លូវសូត្រ មហាអំណាចថ្មីមួយកំពុងលូតលាស់នៅអាស៊ីអាគ្នេយ៍។ អាណាចក្រខ្មែរដែលគ្រប់គ្រងពីអង្គរ បានគ្រប់គ្រងលើទឹកដីធំជាងប្រទេសបារាំងបច្ចុប្បន្ន។ ស្តេចរបស់ខ្លួនបានបញ្ជាកម្មករពីរសែនកន្លះនាក់ឲ្យឆ្លាក់ប្រាសាទអង្គរវត្តពីថ្មភក់ — ជាវិមានសាសនាដ៏ធំបំផុតលើផែនដី ដែលជាស្នាដៃមិនមានគូប្រកួតនៅអឺរ៉ុបនាសម័យនោះ។ កម្ពុជាមិនមែនជាមុំស្ងាត់នៃពិភពលោកទេ។ វាគឺជារាជធានីសកលនៃសិល្បៈ វិស្វកម្ម និងជំនឿ។",
    },
    icon: Crown,
    gradientClass:
      "bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-100",
    accent: {
      badgeBg: "bg-amber-300/80",
      badgeText: "text-stone-900",
      cardRing: "ring-amber-400/60",
      nodeBg: "bg-yellow-50 hover:bg-yellow-100 border-amber-400",
      nodeHoverBg: "hover:bg-yellow-100",
      nodeText: "text-stone-900",
    },
    artifacts: [
      {
        id: "angkor-wat",
        icon: Landmark,
        title: { en: "Angkor Wat", kh: "ប្រាសាទអង្គរវត្ត" },
        shortTag: { en: "Architecture as faith", kh: "ស្ថាបត្យកម្មជាជំនឿ" },
        body: {
          en: "Built in the 12th century by King Suryavarman II, Angkor Wat is more than a temple. Its five towers represent Mount Meru — the home of the gods — and its galleries hold over 12,000 sq. meters of carved bas-reliefs telling stories from the Reamker. It is widely recognized as one of the largest religious monuments in the world.",
          kh: "សាងសង់នៅសតវត្សទី ១២ ដោយព្រះបាទសូរ្យវរ្ម័នទី ២ ប្រាសាទអង្គរវត្តគឺជាងប្រាសាទមួយ។ ប្រាសាទប្រាំរបស់វាតំណាងភ្នំព្រះសុមេរុ — លំនៅឋានរបស់ទេវតា — ហើយវិចារនបង្ហាញចម្លាក់ផ្ទាំងថ្មជាង ១២,០០០ ម៉ែត្រការ៉េ និយាយរឿងពីរាមកេរ្តិ៍។ វាត្រូវបានទទួលស្គាល់យ៉ាងទូលំទូលាយថាជា វិមានសាសនាដ៏ធំបំផុតមួយនៅលើពិភពលោក។",
        },
        whyItMattered: {
          en: "Angkor Wat shows that a Southeast Asian civilization could match the great works being built anywhere in the medieval world. It is Cambodia's gift to world heritage and still the heart of the national flag today.",
          kh: "ប្រាសាទអង្គរវត្តបង្ហាញថា អរិយធម៌អាស៊ីអាគ្នេយ៍មួយអាចស្មើនឹងស្នាដៃដ៏អស្ចារ្យទាំងឡាយដែលកំពុងសាងសង់នៅគ្រប់ទីកន្លែងក្នុងសម័យកណ្តាល។ វាគឺជាអំណោយរបស់កម្ពុជាដល់បេតិកភណ្ឌពិភពលោក ហើយនៅតែជាបេះដូងនៃទង់ជាតិនាបច្ចុប្បន្ននេះ។",
        },
      },
      {
        id: "baray-hydraulics",
        icon: Compass,
        title: { en: "The Great Baray", kh: "បារាយណ៍ដ៏ធំ" },
        shortTag: { en: "Water as power", kh: "ទឹកជាអំណាច" },
        body: {
          en: "Two enormous reservoirs (the West Baray is 8 km long) and hundreds of canals let Angkor harvest rice multiple times a year. Researchers estimate it was among the largest cities of the pre-industrial world, with population estimates ranging up to roughly 700,000–900,000 — far larger than most European capitals of the same era.",
          kh: "បារាយណ៍ដ៏ធំពីរ (បារាយណ៍ខាងលិចមានប្រវែង ៨ គីឡូម៉ែត្រ) និងប្រឡាយរាប់រយ បានអនុញ្ញាតឲ្យអង្គរប្រមូលផលស្រូវបានច្រើនដងក្នុងមួយឆ្នាំ។ អ្នកស្រាវជ្រាវប៉ាន់ស្មានថា វាស្ថិតក្នុងចំណោមទីក្រុងធំបំផុតក្នុងពិភពលោកមុនយុគឧស្សាហកម្ម ដោយការប៉ាន់ស្មានចំនួនប្រជាជនរហូតដល់ប្រហែល ៧០០,០០០–៩០០,០០០ នាក់ — ច្រើនជាងរាជធានីអឺរ៉ុបភាគច្រើនក្នុងសម័យកាលដូចគ្នា។",
        },
        whyItMattered: {
          en: "Engineering, not just art, made Angkor a superpower. Its water system was a thousand years ahead of its time and is studied by modern climate scientists today.",
          kh: "វិស្វកម្ម មិនមែនត្រឹមតែសិល្បៈទេ ដែលបានធ្វើឲ្យអង្គរក្លាយជាមហាអំណាច។ ប្រព័ន្ធទឹករបស់វា មាននៅមុខសម័យកាលរបស់ខ្លួនមួយពាន់ឆ្នាំ ហើយត្រូវបានសិក្សាដោយអ្នកវិទ្យាសាស្ត្រអាកាសធាតុសម័យទំនើបនាបច្ចុប្បន្ននេះ។",
        },
      },
      {
        id: "silk-road",
        icon: Globe,
        title: { en: "The Silk Road", kh: "ផ្លូវសូត្រ" },
        shortTag: { en: "The world connects", kh: "ពិភពលោកភ្ជាប់គ្នា" },
        body: {
          en: "A 6,400 km network of trade routes linking China to Rome through India, Persia, and Central Asia. Silk traveled west, gold travelled east, and along with goods came religions (Buddhism, Islam), inventions (paper, gunpowder), and ideas.",
          kh: "បណ្តាញផ្លូវពាណិជ្ជកម្មប្រវែង ៦,៤០០ គីឡូម៉ែត្រ ភ្ជាប់ប្រទេសចិនទៅរ៉ូម តាមរយៈឥណ្ឌា ពែរ្ស និងអាស៊ីកណ្តាល។ សូត្រធ្វើដំណើរទៅខាងលិច មាសធ្វើដំណើរទៅខាងកើត ហើយជាមួយនឹងទំនិញនោះ មានសាសនា (ព្រះពុទ្ធសាសនា អ៊ីស្លាម) ការច្នៃប្រឌិត (ក្រដាស ដីផ្ទុះ) និងគំនិតផ្សេងៗ។",
        },
        whyItMattered: {
          en: "The Silk Road taught humanity that distant peoples could trade ideas, not just goods. Globalization is not new — it is more than two thousand years old.",
          kh: "ផ្លូវសូត្របានបង្រៀនមនុស្សជាតិថា ប្រជាជនឆ្ងាយៗអាចជួញដូរគំនិត មិនមែនតែទំនិញទេ។ សកលភាវូបនីយកម្មមិនមែនថ្មីទេ — វាមានអាយុជាងពីរពាន់ឆ្នាំ។",
        },
      },
    ],
  },
  {
    id: "industrial",
    index: 2,
    sectionId: "era-industrial",
    jumpLabel: { en: "1700s–1900s", kh: "សតវត្សទី ១៨–១៩" },
    dateLabel: { en: "1700s — 1900s", kh: "សតវត្សទី ១៨ — ទី ១៩" },
    title: { en: "The Industrial Revolution", kh: "បដិវត្តន៍ឧស្សាហកម្ម" },
    subtitle: { en: "The Age of the Machine", kh: "យុគសម័យម៉ាស៊ីន" },
    theme: { en: "Steam, Coal & Iron", kh: "ចំហាយ ធ្យូងថ្ម និងដែក" },
    description: {
      en: "For ten thousand years, work was done by human muscle, animal muscle, wind, or falling water. Then, in the cotton mills of Britain, a machine that could run on burning coal — the steam engine — replaced all of it. Suddenly factories could produce a thousand shirts in the time a tailor sewed one. Steam locomotives crossed continents in days, not months. Steel made bridges and skyscrapers possible. The cost? Cities choked with smoke, child labor, and the first warning signs of climate change.",
      kh: "អស់រយៈពេលមួយម៉ឺនឆ្នាំ កិច្ចការត្រូវបានធ្វើដោយកម្លាំងសាច់ដុំមនុស្ស សាច់ដុំសត្វ ខ្យល់ ឬទឹកធ្លាក់។ បន្ទាប់មកនៅរោងកាត់សំពត់របស់ចក្រភពអង់គ្លេស ម៉ាស៊ីនមួយដែលអាចដំណើរការដោយដុតធ្យូងថ្ម — ម៉ាស៊ីនចំហាយទឹក — បានជំនួសវាទាំងអស់។ រោងចក្រអាចផលិតអាវមួយពាន់ក្នុងពេលដែលជាងកាត់ដេរបានមួយ។ រថភ្លើងចំហាយឆ្លងកាត់ទ្វីបក្នុងរយៈពេលប៉ុន្មានថ្ងៃ មិនមែនប៉ុន្មានខែ។ ដែកថែបបានធ្វើឲ្យស្ពាន និងអគារខ្ពស់ៗ អាចសាងសង់បាន។ តម្លៃនោះ? ទីក្រុងពោរពេញដោយផ្សែង ការងារកុមារ និងសញ្ញាព្រមានដំបូងនៃការប្រែប្រួលអាកាសធាតុ។",
    },
    icon: Cog,
    gradientClass:
      "bg-gradient-to-br from-slate-300 via-zinc-300 to-stone-400",
    accent: {
      badgeBg: "bg-slate-700/90",
      badgeText: "text-amber-100",
      cardRing: "ring-zinc-500/60",
      nodeBg: "bg-zinc-50 hover:bg-zinc-100 border-zinc-400",
      nodeHoverBg: "hover:bg-zinc-100",
      nodeText: "text-slate-900",
    },
    artifacts: [
      {
        id: "steam-engine",
        icon: Cog,
        title: { en: "The Steam Engine", kh: "ម៉ាស៊ីនចំហាយ" },
        shortTag: { en: "Power on demand", kh: "ថាមពលតាមតម្រូវការ" },
        body: {
          en: "James Watt's improved steam engine (1769) burned coal to boil water; the expanding steam pushed pistons that turned wheels. For the first time, useful energy could be created anywhere — not just where wind blew or rivers fell.",
          kh: "ម៉ាស៊ីនចំហាយកែលម្អរបស់ James Watt (១៧៦៩) ដុតធ្យូងថ្មដើម្បីដាំទឹក ចំហាយដែលពង្រីកបានរុញ piston ដែលបង្វិលកង់។ ជាលើកដំបូង ថាមពលដែលមានប្រយោជន៍អាចបង្កើតបានគ្រប់ទីកន្លែង — មិនមែនតែកន្លែងដែលខ្យល់បក់ ឬទន្លេធ្លាក់ទេ។",
        },
        whyItMattered: {
          en: "Detaching power from geography rewrote the world map. Inland cities boomed, factories scaled, and one nation's GDP could double in a generation. It is also the moment our atmosphere began to change.",
          kh: "ការបំបែកថាមពលចេញពីភូមិសាស្ត្រ បានសរសេរផែនទីពិភពលោកឡើងវិញ។ ទីក្រុងផ្នែកក្នុងបានរីកចម្រើន រោងចក្របានពង្រីក ហើយ GDP របស់ប្រទេសមួយអាចកើនទ្វេក្នុងមួយជំនាន់។ វាក៏ជាពេលដែលបរិយាកាសរបស់យើងចាប់ផ្តើមផ្លាស់ប្តូរផងដែរ។",
        },
      },
      {
        id: "locomotive",
        icon: Train,
        title: { en: "The Locomotive", kh: "ក្បាលរថភ្លើង" },
        shortTag: { en: "Distance dies", kh: "ចម្ងាយរលត់" },
        body: {
          en: "By 1850, steel rails carried iron locomotives at 80 km/h — faster than any horse. A trip from London to Edinburgh dropped from two weeks to ten hours.",
          kh: "ឆ្នាំ ១៨៥០ ផ្លូវដែកដឹកក្បាលរថភ្លើងដែលលឿន ៨០ គីឡូម៉ែត្រ/ម៉ោង — លឿនជាងសេះណាមួយ។ ដំណើរពីឡុងដ៍ទៅអេឌីនបឺត ធ្លាក់ចុះពីពីរសប្តាហ៍មកត្រឹមដប់ម៉ោង។",
        },
        whyItMattered: {
          en: "When people, mail, and goods move ten times faster, time itself feels different. Standardized clocks, national newspapers, and modern markets all date from the railway age.",
          kh: "ពេលដែលមនុស្ស សំបុត្រ និងទំនិញធ្វើដំណើរលឿនជាងមុនដប់ដង ពេលវេលាខ្លួនវាមានអារម្មណ៍ខុសគ្នា។ នាឡិកាស្តង់ដារ កាសែតជាតិ និងទីផ្សារទំនើបទាំងអស់ មានដើមកំណើតពីយុគសម័យផ្លូវដែក។",
        },
      },
    ],
  },
  {
    id: "information-age",
    index: 3,
    sectionId: "era-information-age",
    jumpLabel: { en: "1950–2026", kh: "១៩៥០–២០២៦" },
    dateLabel: { en: "1950 — 2026", kh: "១៩៥០ — ២០២៦" },
    title: { en: "The Information Age", kh: "យុគសម័យព័ត៌មានវិទ្យា" },
    subtitle: { en: "The Connected World", kh: "ពិភពលោកដែលភ្ជាប់" },
    theme: { en: "Silicon, Light & Signal", kh: "ស៊ីលីកុន ពន្លឺ និងសញ្ញា" },
    description: {
      en: "In 1950 a single computer filled a room and could only do arithmetic. By 2026 a phone in your pocket holds more computing power than NASA used to land humans on the Moon. The internet wove every continent together; smartphones placed knowledge, banking, learning, and friendship within reach of a teenager in Stung Treng. In one human lifetime, our species jumped from paper letters to instant video calls — the fastest cultural transformation in history.",
      kh: "នៅឆ្នាំ ១៩៥០ កុំព្យូទ័រមួយយកបន្ទប់ទាំងមូល ហើយធ្វើបានតែគណិតវិទ្យាសាមញ្ញប៉ុណ្ណោះ។ ដល់ឆ្នាំ ២០២៦ ទូរស័ព្ទមួយនៅក្នុងហោប៉ៅរបស់អ្នក មានថាមពលគណនាច្រើនជាងអ្វីដែល NASA បានប្រើដើម្បីយកមនុស្សចុះចតលើព្រះច័ន្ទ។ អ៊ីនធឺណិតបានត្បាញទ្វីបនីមួយៗរួមគ្នា ទូរស័ព្ទស្មាតហ្វូនបានដាក់ចំណេះដឹង ធនាគារ ការសិក្សា និងមិត្តភាព ឲ្យក្នុងដៃក្មេងជំទង់ម្នាក់នៅស្ទឹងត្រែង។ ក្នុងអាយុជីវិតមនុស្សតែមួយ មនុស្សជាតិបានលោតពីសំបុត្រក្រដាសទៅការជជែកវីដេអូភ្លាមៗ — ការបំប្លែងវប្បធម៌ដ៏លឿនបំផុតក្នុងប្រវត្តិសាស្ត្រ។",
    },
    icon: Cpu,
    gradientClass:
      "bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-200",
    accent: {
      badgeBg: "bg-indigo-600",
      badgeText: "text-white",
      cardRing: "ring-indigo-400/60",
      nodeBg: "bg-white hover:bg-indigo-50 border-indigo-300",
      nodeHoverBg: "hover:bg-indigo-50",
      nodeText: "text-indigo-900",
    },
    artifacts: [
      {
        id: "microchip",
        icon: Cpu,
        title: { en: "The Microchip", kh: "ឈីបតូច" },
        shortTag: { en: "Brains in sand", kh: "ខួរក្បាលនៅក្នុងខ្សាច់" },
        body: {
          en: "A fingernail-sized piece of silicon etched with billions of microscopic switches. Each switch flips on or off in less than a nanosecond. Stack enough together and you have a phone, a satellite, or a self-driving car.",
          kh: "បំណែកស៊ីលីកុនទំហំក្រចកដៃ ឆ្លាក់ដោយកុងតាក់មីក្រូទស្សន៍រាប់ពាន់លាន។ កុងតាក់នីមួយៗបើក ឬបិទ ក្នុងពេលតិចជាងនាណូវិនាទីមួយ។ ដាក់ច្រើនរួមគ្នាគ្រប់គ្រាន់ អ្នកនឹងមានទូរស័ព្ទ ផ្កាយរណប ឬឡានបើកដោយខ្លួនឯង។",
        },
        whyItMattered: {
          en: "Computing power doubled roughly every two years for fifty years. That single trend rebuilt every industry on Earth — from medicine to music to map-making — and made the modern world possible.",
          kh: "ថាមពលគណនាបានកើនទ្វេប្រហែលរៀងរាល់ពីរឆ្នាំម្តងអស់រយៈពេលហាសិបឆ្នាំ។ និន្នាការតែមួយនោះបានកសាងគ្រប់ឧស្សាហកម្មនៅលើផែនដីឡើងវិញ — ពីវេជ្ជសាស្ត្រ ដល់តន្ត្រី ដល់ការបង្កើតផែនទី — ហើយធ្វើឲ្យពិភពលោកសម័យទំនើបអាចទៅរួច។",
        },
      },
      {
        id: "internet",
        icon: Globe,
        title: { en: "The Internet", kh: "អ៊ីនធឺណិត" },
        shortTag: { en: "A library for everyone", kh: "បណ្ណាល័យសម្រាប់គ្រប់គ្នា" },
        body: {
          en: "A web of underground and undersea cables links nearly every computer on Earth. A student in Battambang and a professor in Boston can read the same article in the same second.",
          kh: "បណ្តាញខ្សែក្រោមដី និងក្រោមសមុទ្រ ភ្ជាប់កុំព្យូទ័រស្ទើរតែគ្រប់គ្រឿងនៅលើផែនដី។ និស្សិតម្នាក់នៅបាត់ដំបង និងសាស្ត្រាចារ្យម្នាក់នៅបូស្តុន អាចអានអត្ថបទតែមួយ ក្នុងវិនាទីតែមួយ។",
        },
        whyItMattered: {
          en: "Before the internet, knowledge was rationed by who could afford a library or a university. Now any curious student with a phone can learn calculus, anatomy, or how to build a website.",
          kh: "មុនអ៊ីនធឺណិត ចំណេះដឹងត្រូវបានកំណត់ដោយអ្នកដែលអាចមានបណ្ណាល័យ ឬសាកលវិទ្យាល័យ។ ឥឡូវនេះ និស្សិតដែលចង់ដឹងណាមួយដែលមានទូរស័ព្ទ អាចរៀនគណនាវិទ្យា កាយវិភាគវិទ្យា ឬរបៀបបង្កើតគេហទំព័រ។",
        },
      },
      {
        id: "smartphone",
        icon: Smartphone,
        title: { en: "The Smartphone", kh: "ទូរស័ព្ទស្មាតហ្វូន" },
        shortTag: { en: "The pocket supercomputer", kh: "កុំព្យូទ័រធំក្នុងហោប៉ៅ" },
        body: {
          en: "Camera, map, library, bank, classroom, radio, and telephone — all in a glass slab small enough to carry. The first iPhone arrived in 2007. By 2026, more than five billion humans own one.",
          kh: "កាមេរ៉ា ផែនទី បណ្ណាល័យ ធនាគារ ថ្នាក់រៀន វិទ្យុ និងទូរស័ព្ទ — ទាំងអស់នៅក្នុងបន្ទះកញ្ចក់តូចមួយដែលអាចយកជាប់ខ្លួនបាន។ iPhone ដំបូងបានមកដល់ឆ្នាំ ២០០៧។ ដល់ឆ្នាំ ២០២៦ មនុស្សជាងប្រាំពាន់លាននាក់មាន ១ គ្រឿង។",
        },
        whyItMattered: {
          en: "Smartphones have spread further and faster than almost any technology in history — reaching corners of the world that still lack reliable electricity, banks, or libraries. Used wisely, the device in your pocket can be one of the most powerful equalizers of opportunity ever invented.",
          kh: "ទូរស័ព្ទស្មាតហ្វូនបានរីករាលដាលឆ្ងាយ និងលឿនជាងបច្ចេកវិទ្យាស្ទើរតែទាំងអស់ក្នុងប្រវត្តិសាស្ត្រ — ទៅដល់ជ្រុងនានានៃពិភពលោកដែលនៅតែខ្វះអគ្គិសនី ធនាគារ ឬបណ្ណាល័យដែលអាចទុកចិត្តបាន។ ប្រើដោយប្រាជ្ញា ឧបករណ៍នៅក្នុងហោប៉ៅរបស់អ្នកអាចជាឧបករណ៍ស្មើគ្នានៃឱកាសដ៏មានឥទ្ធិពលបំផុតធ្លាប់បង្កើតបាន។",
        },
      },
    ],
  },
  {
    id: "horizon",
    index: 4,
    sectionId: "era-horizon",
    jumpLabel: { en: "2026–2100", kh: "២០២៦–២១០០" },
    dateLabel: { en: "2026 — 2100", kh: "២០២៦ — ២១០០" },
    title: { en: "The Horizon", kh: "ផ្ទៃមេឃខាងមុខ" },
    subtitle: { en: "The Speculative Future", kh: "អនាគតគិតគូ" },
    theme: { en: "Light, Mind & Climate", kh: "ពន្លឺ បញ្ញា និងអាកាសធាតុ" },
    description: {
      en: "Look forward seventy-five years. Artificial intelligences may write our laws and diagnose our diseases. Reusable rockets may carry families to a city on Mars. Genetic medicine could erase inherited illnesses. But our greatest test is not technology — it is wisdom. Can we build machines smarter than ourselves and still keep them humane? Can we keep our oceans alive while a warming climate reshapes coastlines? The next chapter has no script. You will write it.",
      kh: "សូមមើលទៅមុខ ៧៥ ឆ្នាំ។ បញ្ញាសិប្បនិម្មិតអាចសរសេរច្បាប់របស់យើង និងធ្វើរោគវិនិច្ឆ័យជំងឺរបស់យើង។ រ៉ុក្កែតប្រើឡើងវិញអាចដឹកគ្រួសារទៅទីក្រុងមួយនៅភពអង្គារ។ វេជ្ជសាស្ត្រហ្សែនអាចលុបបំបាត់ជំងឺហ្សែនបាន។ ប៉ុន្តែការសាកល្បងដ៏អស្ចារ្យរបស់យើងមិនមែនជាបច្ចេកវិទ្យាទេ — វាគឺជាប្រាជ្ញា។ តើយើងអាចសាងសង់ម៉ាស៊ីនឆ្លាតជាងខ្លួនយើង ហើយនៅតែរក្សាវាឲ្យមានមនុស្សធម៌បានទេ? តើយើងអាចរក្សាសមុទ្ររបស់យើងឲ្យមានជីវិត ខណៈពេលដែលអាកាសធាតុក្តៅបានបង្កើតឆ្នេរសមុទ្រឡើងវិញបានទេ? ជំពូកបន្ទាប់គ្មានស្គ្រីបទេ។ អ្នកនឹងសរសេរវា។",
    },
    icon: Rocket,
    gradientClass:
      "bg-gradient-to-br from-violet-200 via-fuchsia-200 to-cyan-200",
    accent: {
      badgeBg: "bg-fuchsia-600",
      badgeText: "text-white",
      cardRing: "ring-fuchsia-400/60",
      nodeBg: "bg-white hover:bg-fuchsia-50 border-fuchsia-300",
      nodeHoverBg: "hover:bg-fuchsia-50",
      nodeText: "text-fuchsia-900",
    },
    artifacts: [
      {
        id: "ai",
        icon: BrainCircuit,
        title: { en: "Artificial General Intelligence", kh: "បញ្ញាសិប្បនិម្មិតទូទៅ" },
        shortTag: { en: "Minds we built", kh: "បញ្ញាដែលយើងបានបង្កើត" },
        body: {
          en: "Today's AI can already write essays, code software, and pass medical exams. Within decades, it may surpass human reasoning across nearly every field — designing new medicines, materials, and ideas no person could have invented alone.",
          kh: "បញ្ញាសិប្បនិម្មិតសព្វថ្ងៃនេះ បានសរសេរអត្ថបទ កូដកម្មវិធី និងប្រលងវេជ្ជសាស្ត្ររួចហើយ។ ក្នុងរយៈពេលប៉ុន្មានទសវត្សរ៍ វាអាចលើសហេតុផលរបស់មនុស្សស្ទើរតែគ្រប់វិស័យ — រចនាថ្នាំ សម្ភារៈ និងគំនិតថ្មីៗដែលមនុស្សតែម្នាក់ឯងមិនអាចបង្កើតបាន។",
        },
        whyItMattered: {
          en: "Power without wisdom is dangerous. The most important question of your generation is not 'what can AI do?' — it is 'what should we let it do, and how do we keep it serving everyone fairly?'",
          kh: "អំណាចគ្មានប្រាជ្ញាគឺគ្រោះថ្នាក់។ សំណួរសំខាន់បំផុតនៃជំនាន់របស់អ្នកមិនមែនថា 'AI អាចធ្វើអ្វីបាន?' — វាគឺ 'យើងគួរអនុញ្ញាតឲ្យវាធ្វើអ្វី ហើយតើយើងធ្វើយ៉ាងណាដើម្បីឲ្យវាបម្រើគ្រប់គ្នាដោយយុត្តិធម៌?'",
        },
      },
      {
        id: "mars",
        icon: Telescope,
        title: { en: "Interplanetary Travel", kh: "ដំណើរចន្លោះភព" },
        shortTag: { en: "A second home", kh: "ផ្ទះទីពីរ" },
        body: {
          en: "Reusable rockets have already cut the cost of reaching orbit by ten times. By the 2050s, the first permanent research station on Mars may be inhabited — humans will become a multi-planet species for the first time.",
          kh: "រ៉ុក្កែតប្រើឡើងវិញបានកាត់បន្ថយតម្លៃនៃការទៅដល់គន្លងផែនដីដប់ដងហើយ។ ដល់ទសវត្សរ៍ ២០៥០ ស្ថានីយ៍ស្រាវជ្រាវអចិន្ត្រៃយ៍ដំបូងនៅភពអង្គារ អាចមានមនុស្សរស់នៅ — មនុស្សនឹងក្លាយជាសត្វប្រភេទមួយដែលរស់នៅភពច្រើន ជាលើកដំបូង។",
        },
        whyItMattered: {
          en: "Becoming a multi-planet species protects humanity from any single planetary disaster. It also forces us to learn — finally — how to live in perfect balance with a closed ecosystem.",
          kh: "ការក្លាយជាសត្វប្រភេទរស់នៅភពច្រើន ការពារមនុស្សជាតិពីគ្រោះមហន្តរាយផែនដីណាមួយ។ វាក៏បង្ខំឲ្យយើងរៀន — ទីបំផុត — របៀបរស់នៅក្នុងតុល្យភាពល្អឥតខ្ចោះជាមួយប្រព័ន្ធអេកូសុីសប្តេមបិទ។",
        },
      },
      {
        id: "climate",
        icon: Leaf,
        title: { en: "Climate Survival", kh: "ការរស់រាននៃអាកាសធាតុ" },
        shortTag: { en: "The defining test", kh: "ការសាកល្បងសម្រេច" },
        body: {
          en: "Coral reefs, monsoon rains, the Mekong's flow — every system that supports Cambodia depends on a stable climate. Our generation must invent solar grids, regenerate forests, and build coastal defenses before warming locks in.",
          kh: "ផ្កាថ្មពាន ភ្លៀងមួសម៉ុង លំហូរទន្លេមេគង្គ — គ្រប់ប្រព័ន្ធដែលគាំទ្រកម្ពុជា អាស្រ័យលើអាកាសធាតុមានស្ថិរភាព។ ជំនាន់របស់យើងត្រូវបង្កើតបណ្តាញថាមពលព្រះអាទិត្យ បង្កើតព្រៃឡើងវិញ និងសាងសង់ការការពារឆ្នេរសមុទ្រ មុនពេលការក្តៅចាក់សោ។",
        },
        whyItMattered: {
          en: "Every previous era expanded human power. This one must expand human wisdom. The future of every other technology depends on whether we keep the planet livable.",
          kh: "យុគសម័យមុនៗនីមួយៗ បានពង្រីកអំណាចមនុស្ស។ យុគនេះត្រូវពង្រីកប្រាជ្ញាមនុស្ស។ អនាគតនៃបច្ចេកវិទ្យាដទៃទៀតនីមួយៗ អាស្រ័យលើថា តើយើងរក្សាភពផែនដីឲ្យអាចរស់នៅបានឬទេ។",
        },
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────────── */

export default function WorldHistoryPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [openArtifact, setOpenArtifact] = useState<{ era: Era; artifact: Artifact } | null>(null);
  const [jumpOpen, setJumpOpen] = useState(false);

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  // IntersectionObserver tracks the era currently filling the viewport
  // so we can swap the sticky background gradient. This keeps scroll smooth
  // — no scroll-event listeners, just one observer.
  useEffect(() => {
    const elements = sectionRefs.current.filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Use the entry with the largest intersection ratio as "active".
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.eraIndex ?? 0);
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        // Trigger when the era's middle band is in view.
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = useCallback(
    (eraIndex: number) => {
      const target = sectionRefs.current[eraIndex];
      if (!target) return;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      setJumpOpen(false);
    },
    [reduceMotion],
  );

  const activeEra = ERAS[activeIndex] ?? ERAS[0];

  // Memoize gradient class list so React doesn't re-render every layer when
  // unrelated state (e.g. modal open) changes.
  const gradientLayers = useMemo(
    () =>
      ERAS.map((era) => ({
        index: era.index,
        className: era.gradientClass,
      })),
    [],
  );

  return (
    <div className="relative min-h-screen">
      {/* Sticky gradient backdrop — one layer per era cross-fades via opacity. */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
      >
        {gradientLayers.map((layer) => (
          <div
            key={layer.index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${layer.className}`}
            style={{ opacity: layer.index === activeIndex ? 1 : 0 }}
          />
        ))}
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors ${kh ? "font-khmer" : ""}`}
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/70 px-3 py-1 text-xs font-bold text-slate-700">
          <Compass className="w-3.5 h-3.5" />
          {t("Interactive Timeline", "បន្ទាត់ពេលវេលាអន្តរកម្ម")}
        </div>

        <h1
          className={`mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}
          data-testid="text-page-title"
        >
          {t("World History: The Human Journey", "ប្រវត្តិសាស្ត្រពិភពលោក៖ ដំណើររបស់មនុស្សជាតិ")}
        </h1>
        <p className={`mt-3 text-base sm:text-lg text-slate-700 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Twelve thousand years of human invention, in five chapters. Scroll through the eras — and tap any artifact to learn how a single idea changed everything.",
            "មួយម៉ឺនពីរពាន់ឆ្នាំនៃការច្នៃប្រឌិតរបស់មនុស្ស ក្នុងជំពូកប្រាំ។ រមូរតាមរយៈយុគសម័យ — ហើយចុចលើវត្ថុបុរាណណាមួយ ដើម្បីរៀនពីរបៀបដែលគំនិតតែមួយបានផ្លាស់ប្តូរអ្វីៗទាំងអស់។"
          )}
        </p>
      </header>

      {/* ── Time Machine — desktop side rail ────────────────────────── */}
      <nav
        aria-label={t("Time Machine — jump to era", "ម៉ាស៊ីនពេលវេលា — លោតទៅយុគសម័យ")}
        className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 z-30 flex-col gap-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/70 shadow-xl p-3"
      >
        <div className={`px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1 ${kh ? "font-khmer" : ""}`}>
          <Clock className="w-3 h-3" />
          {t("Time Machine", "ម៉ាស៊ីនពេលវេលា")}
        </div>
        {ERAS.map((era) => {
          const Icon = era.icon;
          const isActive = era.index === activeIndex;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => jumpTo(era.index)}
              data-testid={`jump-${era.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className={`text-xs font-bold ${kh ? "font-khmer" : ""}`}>
                  {kh ? era.jumpLabel.kh : era.jumpLabel.en}
                </span>
                <span className={`text-[10px] opacity-80 truncate max-w-[12ch] ${kh ? "font-khmer" : ""}`}>
                  {kh ? era.title.kh : era.title.en}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* ── Time Machine — mobile floating button + sheet ───────────── */}
      <button
        type="button"
        onClick={() => setJumpOpen((o) => !o)}
        aria-expanded={jumpOpen}
        aria-controls="time-machine-mobile"
        className="lg:hidden fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-3 shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
        data-testid="button-time-machine"
      >
        {jumpOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span className={`text-sm font-bold ${kh ? "font-khmer" : ""}`}>
          {t("Time Machine", "ម៉ាស៊ីនពេលវេលា")}
        </span>
      </button>
      <MobileJumpSheet
        open={jumpOpen}
        onClose={() => setJumpOpen(false)}
        activeIndex={activeIndex}
        onJump={jumpTo}
        kh={kh}
      />

      {/* ── Interactive 3D History Globe ───────────────────────────── */}
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            <div className="rounded-3xl bg-white/85 backdrop-blur-sm border border-white/80 shadow-xl ring-1 ring-black/5 h-[500px] grid place-items-center text-slate-600 text-sm">
              {t("Loading interactive globe…", "កំពុងផ្ទុកផែនដីអន្តរកម្ម…")}
            </div>
          </div>
        }
      >
        <HistoryGlobe />
      </Suspense>

      {/* ── Eras ───────────────────────────────────────────────────── */}
      <main className="relative z-10">
        {ERAS.map((era) => (
          <EraSection
            key={era.id}
            era={era}
            kh={kh}
            sectionRef={(el) => (sectionRefs.current[era.index] = el)}
            onOpenArtifact={(artifact) => setOpenArtifact({ era, artifact })}
            reduceMotion={!!reduceMotion}
          />
        ))}

        {/* Closing card */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-white/70 shadow-lg p-8 sm:p-12">
            <h2 className={`text-3xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}>
              {t("And then — you.", "ហើយបន្ទាប់មក — អ្នក។")}
            </h2>
            <p className={`mt-3 text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Every era was shaped by ordinary people who learned, invented, and dared. The next chapter of human history begins with the choices your generation makes. Make them well.",
                "យុគសម័យនីមួយៗត្រូវបានបង្កើតឡើងដោយមនុស្សធម្មតាដែលបានរៀន ច្នៃប្រឌិត និងហ៊ាន។ ជំពូកបន្ទាប់នៃប្រវត្តិសាស្ត្រមនុស្សជាតិ ចាប់ផ្តើមដោយការសម្រេចចិត្តដែលជំនាន់របស់អ្នកធ្វើ។ សូមធ្វើវាឲ្យបានល្អ។"
              )}
            </p>
          </div>
        </section>
      </main>

      {/* ── Artifact modal ──────────────────────────────────────────── */}
      <ArtifactModal
        open={!!openArtifact}
        onClose={() => setOpenArtifact(null)}
        item={openArtifact}
        kh={kh}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Era section
 * ────────────────────────────────────────────────────────────────────────────── */

function EraSection({
  era,
  kh,
  sectionRef,
  onOpenArtifact,
  reduceMotion,
}: {
  era: Era;
  kh: boolean;
  sectionRef: (el: HTMLElement | null) => void;
  onOpenArtifact: (artifact: Artifact) => void;
  reduceMotion: boolean;
}) {
  const Icon = era.icon;
  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      data-era-index={era.index}
      id={era.sectionId}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24"
      aria-labelledby={`${era.sectionId}-title`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl bg-white/85 backdrop-blur-sm border border-white/80 shadow-xl ring-1 ring-black/5 p-6 sm:p-10"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${era.accent.badgeBg} ${era.accent.badgeText} px-3 py-1 text-xs font-bold uppercase tracking-wide ${kh ? "font-khmer" : ""}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t2(kh, `Era ${era.index + 1}`, `យុគសម័យទី ${era.index + 1}`)}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs font-bold ${kh ? "font-khmer" : ""}`}>
            <Clock className="w-3 h-3" />
            {kh ? era.dateLabel.kh : era.dateLabel.en}
          </span>
          <span className={`inline-flex items-center rounded-full bg-white/60 border border-slate-300 text-slate-700 px-3 py-1 text-xs font-semibold ${kh ? "font-khmer" : ""}`}>
            {kh ? era.theme.kh : era.theme.en}
          </span>
        </div>

        <h2
          id={`${era.sectionId}-title`}
          className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}
        >
          {kh ? era.title.kh : era.title.en}
        </h2>
        <p className={`mt-1 text-base sm:text-lg font-semibold text-slate-700 ${kh ? "font-khmer" : ""}`}>
          {kh ? era.subtitle.kh : era.subtitle.en}
        </p>
        <p className={`mt-4 text-slate-700 text-base sm:text-lg leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? era.description.kh : era.description.en}
        </p>

        {/* Artifact zoom nodes */}
        <div className="mt-8">
          <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ${kh ? "font-khmer" : ""}`}>
            {t2(kh, "Tap an artifact to learn more", "ចុចលើវត្ថុបុរាណដើម្បីរៀនបន្ថែម")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {era.artifacts.map((artifact) => {
              const AIcon = artifact.icon;
              return (
                <motion.button
                  key={artifact.id}
                  type="button"
                  onClick={() => onOpenArtifact(artifact)}
                  data-testid={`artifact-${artifact.id}`}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-start gap-3 p-4 rounded-2xl border-2 ${era.accent.nodeBg} text-left transition-colors shadow-sm hover:shadow-md`}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200 grid place-items-center shadow-sm">
                    <AIcon className={`w-5 h-5 ${era.accent.nodeText}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                      {kh ? artifact.title.kh : artifact.title.en}
                    </div>
                    <div className={`text-xs text-slate-600 mt-0.5 ${kh ? "font-khmer" : ""}`}>
                      {kh ? artifact.shortTag.kh : artifact.shortTag.en}
                    </div>
                  </div>
                  <ChevronRight className="ml-auto w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Mobile Time Machine sheet — accessible (Escape, click-outside, focus trap-lite)
 * ────────────────────────────────────────────────────────────────────────────── */

function MobileJumpSheet({
  open,
  onClose,
  activeIndex,
  onJump,
  kh,
}: {
  open: boolean;
  onClose: () => void;
  activeIndex: number;
  onJump: (index: number) => void;
  kh: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Escape closes the sheet; click outside the panel also closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      // Don't close when interacting with the toggle button itself.
      const toggle = document.querySelector('[data-testid="button-time-machine"]');
      if (toggle && toggle.contains(target)) return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    // Move focus to the first jump button so keyboard users land somewhere useful.
    const first = containerRef.current?.querySelector<HTMLButtonElement>("button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      id="time-machine-mobile"
      role="dialog"
      aria-modal="false"
      aria-label={t2(kh, "Time Machine — jump to era", "ម៉ាស៊ីនពេលវេលា — លោតទៅយុគសម័យ")}
      className="lg:hidden fixed bottom-20 right-5 z-30 w-64 max-h-[60vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-2"
    >
      {ERAS.map((era) => {
        const Icon = era.icon;
        const isActive = era.index === activeIndex;
        return (
          <button
            key={era.id}
            type="button"
            onClick={() => onJump(era.index)}
            data-testid={`jump-mobile-${era.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
              isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <div className="flex flex-col leading-tight min-w-0">
              <span className={`text-xs font-bold ${kh ? "font-khmer" : ""}`}>
                {kh ? era.jumpLabel.kh : era.jumpLabel.en}
              </span>
              <span className={`text-[11px] opacity-80 truncate ${kh ? "font-khmer" : ""}`}>
                {kh ? era.title.kh : era.title.en}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
          </button>
        );
      })}
    </div>
  );
}

/* Tiny inline translator — the regular hook can't be called from non-component contexts. */
function t2(kh: boolean, en: string, khText: string) {
  return kh ? khText : en;
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Artifact modal
 * ────────────────────────────────────────────────────────────────────────────── */

function ArtifactModal({
  open,
  onClose,
  item,
  kh,
}: {
  open: boolean;
  onClose: () => void;
  item: { era: Era; artifact: Artifact } | null;
  kh: boolean;
}) {
  const t = useTranslation();
  const reduceMotion = useReducedMotion();
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && item && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                data-testid="artifact-modal"
                className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none"
              >
                <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl pointer-events-auto">
                  <div className={`flex items-center justify-between gap-3 px-5 py-3 ${item.era.accent.badgeBg}`}>
                    <Dialog.Title asChild>
                      <h3 className={`text-base font-bold ${item.era.accent.badgeText} ${kh ? "font-khmer" : ""}`}>
                        {kh ? item.era.title.kh : item.era.title.en}
                      </h3>
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={t("Close", "បិទ")}
                        data-testid="button-close-modal"
                        className={`p-1.5 rounded-md ${item.era.accent.badgeText} hover:bg-black/10 transition-colors`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 grid place-items-center">
                        <item.artifact.icon className="w-7 h-7 text-slate-800" />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${kh ? "font-khmer" : ""}`}>
                          {kh ? item.artifact.shortTag.kh : item.artifact.shortTag.en}
                        </div>
                        <h4 className={`text-2xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? item.artifact.title.kh : item.artifact.title.en}
                        </h4>
                      </div>
                    </div>

                    <Dialog.Description asChild>
                      <p className={`mt-4 text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                        {kh ? item.artifact.body.kh : item.artifact.body.en}
                      </p>
                    </Dialog.Description>

                    <div className={`mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4`}>
                      <div className={`text-[11px] font-bold uppercase tracking-wider text-amber-800 ${kh ? "font-khmer" : ""}`}>
                        {t("Why it changed everything", "ហេតុអ្វីបានជាវាផ្លាស់ប្តូរអ្វីៗទាំងអស់")}
                      </div>
                      <p className={`mt-1.5 text-sm text-amber-950 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                        {kh ? item.artifact.whyItMattered.kh : item.artifact.whyItMattered.en}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-bold transition-colors ${kh ? "font-khmer" : ""}`}
                        >
                          {t("Got it", "យល់ហើយ")}
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
