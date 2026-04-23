import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Bone, Skull, Mountain, Flame, CloudFog, Soup, Bird, Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ─────────────────────────────────────────────────────────────────────
 * Dinosaurs & The Great Extinction · ឌីណូស័រ និងការផុតពូជដ៏ធំ
 * Bilingual EN/Khmer educational module for Chouy Sala Study Center.
 * ───────────────────────────────────────────────────────────────────── */

type Dino = {
  key: string;
  nameEn: string;
  nameKh: string;
  emoji: string;
  roleEn: string;
  roleKh: string;
  factEn: string;
  factKh: string;
  statsEn: { label: string; value: string }[];
  statsKh: { label: string; value: string }[];
  accent: string; // tailwind border/glow color
};

const DINOSAURS: Dino[] = [
  {
    key: "trex",
    nameEn: "Tyrannosaurus Rex",
    nameKh: "ទីរ៉ាណូសូរ៉ិច",
    emoji: "🦖",
    roleEn: "The Apex Predator",
    roleKh: "សត្វរំពាកំពូល",
    factEn: "Lived at the very end of the dinosaur age. Its bite force was so strong it could crush solid bone.",
    factKh: "រស់នៅគ្រាចុងបញ្ចប់នៃយុគឌីណូស័រ។ កម្លាំងខាំរបស់វាខ្លាំងខ្លាំងណាស់ ដែលអាចកិនកំទេចឆ្អឹងរឹង។",
    statsEn: [
      { label: "Length",  value: "12 m (40 ft)" },
      { label: "Weight",  value: "8,000 kg" },
      { label: "Lived",   value: "68–66 million years ago" },
      { label: "Diet",    value: "Carnivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "១២ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៨,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៦៨–៦៦ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីសាច់" },
    ],
    accent: "border-amber-400/50 hover:shadow-amber-500/30",
  },
  {
    key: "triceratops",
    nameEn: "Triceratops",
    nameKh: "ទ្រីសេរ៉ាតូប",
    emoji: "🦕",
    roleEn: "The Armored Herbivore",
    roleKh: "សត្វស៊ីរុក្ខជាតិពាក់ក្រោះ",
    factEn: "It had a massive solid bone frill to protect its neck from predators like the T-Rex.",
    factKh: "វាមានស្នាមប៉ោងធ្វើពីឆ្អឹងរឹងធំសម្បើមដើម្បីការពារកយរបស់វាពីសត្វរំពាដូចជា ទីរ៉ាណូសូរ៉ិច។",
    statsEn: [
      { label: "Length",  value: "9 m (30 ft)" },
      { label: "Weight",  value: "12,000 kg" },
      { label: "Lived",   value: "68–66 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "៩ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "១២,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៦៨–៦៦ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-emerald-400/50 hover:shadow-emerald-500/30",
  },
  {
    key: "stegosaurus",
    nameEn: "Stegosaurus",
    nameKh: "ស្ទេហ្គោសូរ",
    emoji: "🦴",
    roleEn: "The Spiked Tank",
    roleKh: "រថក្រោះមានបន្លា",
    factEn: "Its brain was only the size of a dog's, but it swung a heavy, spiked tail for defense.",
    factKh: "ខួរក្បាលរបស់វាមានទំហំប៉ុនខួរឆ្កែប៉ុណ្ណោះ ប៉ុន្តែវាវ៉ៃកន្ទុយមានបន្លាដ៏ធ្ងន់សម្រាប់ការពារខ្លួន។",
    statsEn: [
      { label: "Length",  value: "9 m (30 ft)" },
      { label: "Weight",  value: "5,000 kg" },
      { label: "Lived",   value: "155–150 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "៩ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៥,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១៥៥–១៥០ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-sky-400/50 hover:shadow-sky-500/30",
  },
  {
    key: "spinosaurus",
    nameEn: "Spinosaurus",
    nameKh: "ស្ពីណូសូរ",
    emoji: "🐊",
    roleEn: "The River Giant",
    roleKh: "យក្សនៃទន្លេ",
    factEn: "Larger than a T-Rex and adapted for swimming and hunting massive fish in deep rivers.",
    factKh: "ធំជាង ទីរ៉ាណូសូរ៉ិច ហើយត្រូវបានសម្របសម្រួលសម្រាប់ហែលទឹក និងបរបាញ់ត្រីយក្សនៅក្នុងទន្លេជ្រៅៗ។",
    statsEn: [
      { label: "Length",  value: "15 m (50 ft)" },
      { label: "Weight",  value: "9,000 kg" },
      { label: "Lived",   value: "112–93 million years ago" },
      { label: "Diet",    value: "Piscivore (fish-eater)" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "១៥ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៩,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១១២–៩៣ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីត្រី" },
    ],
    accent: "border-cyan-400/50 hover:shadow-cyan-500/30",
  },
  {
    key: "brachiosaurus",
    nameEn: "Brachiosaurus",
    nameKh: "ប្រាគីអូសូរ៉ិច",
    emoji: "🦒",
    roleEn: "The Long-Necked Titan",
    roleKh: "យក្សកវែង",
    factEn: "One of the tallest animals to ever walk the Earth. It used its massive neck to eat leaves from the tops of trees, much like a modern giraffe.",
    factKh: "សត្វដ៏ខ្ពស់បំផុតមួយដែលធ្លាប់ដើរលើផែនដី។ វាប្រើកដ៏ធំរបស់វាដើម្បីស៊ីស្លឹកឈើពីលើកំពូលដើមឈើ ដូចសត្វកវែងសម័យទំនើបដែរ។",
    statsEn: [
      { label: "Length",  value: "22 m (72 ft)" },
      { label: "Weight",  value: "40,000 kg" },
      { label: "Lived",   value: "154–153 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "២២ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៤០,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១៥៤–១៥៣ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-lime-400/50 hover:shadow-lime-500/30",
  },
  {
    key: "velociraptor",
    nameEn: "Velociraptor",
    nameKh: "វេល៉ូស៊ីរ៉ាបទ័រ",
    emoji: "🪶",
    roleEn: "The Feathered Hunter",
    roleKh: "អ្នកប្រមាញ់ពាក់រោម",
    factEn: "Much smaller than movies show — about the size of a large turkey. It was fully covered in feathers and hunted in packs using a large, curved toe claw.",
    factKh: "មានទំហំតូចជាងអ្វីដែលភាពយន្តបង្ហាញ ពោលគឺប្រហែលទំហំមាន់តួគីធំមួយ។ វាមានរោមពេញខ្លួន ហើយបរបាញ់ជាហ្វូងដោយប្រើក្រចកជើងធំកោង។",
    statsEn: [
      { label: "Length",  value: "2 m (6.5 ft)" },
      { label: "Weight",  value: "15 kg" },
      { label: "Lived",   value: "75–71 million years ago" },
      { label: "Diet",    value: "Carnivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "២ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "១៥ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៧៥–៧១ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីសាច់" },
    ],
    accent: "border-rose-400/50 hover:shadow-rose-500/30",
  },
  {
    key: "ankylosaurus",
    nameEn: "Ankylosaurus",
    nameKh: "អង់គីឡូសូរ៉ិច",
    emoji: "🛡️",
    roleEn: "The Living Fortress",
    roleKh: "បន្ទាយរស់",
    factEn: "Covered in thick, bony armor plates from its head to its tail. It defended itself by swinging a massive bone club at the end of its tail.",
    factKh: "គ្របដណ្តប់ដោយបន្ទះពាសដែកឆ្អឹងក្រាស់ពីក្បាលដល់កន្ទុយ។ វាការពារខ្លួនដោយគ្រវីដុំឆ្អឹងដ៏ធំនៅចុងកន្ទុយរបស់វា។",
    statsEn: [
      { label: "Length",  value: "8 m (26 ft)" },
      { label: "Weight",  value: "8,000 kg" },
      { label: "Lived",   value: "68–66 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "៨ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៨,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៦៨–៦៦ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-stone-400/50 hover:shadow-stone-500/30",
  },
  {
    key: "parasaurolophus",
    nameEn: "Parasaurolophus",
    nameKh: "ប៉ារ៉ាសូរ៉ូឡូហ្វឺស",
    emoji: "🎺",
    roleEn: "The Crested Singer",
    roleKh: "អ្នកច្រៀងមានស្លាបក្បាល",
    factEn: "Famous for the long, hollow bony crest on its head. Scientists believe it used this crest like a trumpet to make loud, echoing sounds to communicate.",
    factKh: "ល្បីល្បាញដោយសារឆ្អឹងក្បាលវែងប្រហោង។ អ្នកវិទ្យាសាស្ត្រជឿថា វាប្រើប្រាស់វាដូចជាត្រែ ដើម្បីបង្កើតសំឡេងបន្លឺឡើងសម្រាប់ទំនាក់ទំនង។",
    statsEn: [
      { label: "Length",  value: "10 m (33 ft)" },
      { label: "Weight",  value: "2,500 kg" },
      { label: "Lived",   value: "76–73 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "១០ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "២,៥០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៧៦–៧៣ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-violet-400/50 hover:shadow-violet-500/30",
  },
  {
    key: "archaeopteryx",
    nameEn: "Archaeopteryx",
    nameKh: "អាគីអុបទើរីក",
    emoji: "🪽",
    roleEn: "The First Bird",
    roleKh: "បក្សីដំបូងគេ",
    factEn: "The crucial 'missing link' between dinosaurs and modern birds. It had sharp teeth and a long bony tail like a dinosaur, but fully developed flight feathers.",
    factKh: "ចំណុចភ្ជាប់ដ៏សំខាន់រវាងឌីណូស័រ និងសត្វបក្សីសម័យទំនើប។ វាមានធ្មេញមុតស្រួច និងកន្ទុយឆ្អឹងវែងដូចឌីណូស័រ ប៉ុន្តែមានរោមហោះហើរយ៉ាងពេញលេញ។",
    statsEn: [
      { label: "Length",  value: "0.5 m (1.6 ft)" },
      { label: "Weight",  value: "1 kg" },
      { label: "Lived",   value: "150 million years ago" },
      { label: "Diet",    value: "Carnivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "០.៥ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "១ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១៥០ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីសាច់" },
    ],
    accent: "border-yellow-400/50 hover:shadow-yellow-500/30",
  },
  {
    key: "allosaurus",
    nameEn: "Allosaurus",
    nameKh: "អាឡូសូរ៉ិច",
    emoji: "🦁",
    roleEn: "The Jurassic Lion",
    roleKh: "តោសម័យយូរ៉ាស៊ីក",
    factEn: "The top predator of the Jurassic period, living millions of years before the T-Rex. It hunted massive plant-eaters by using its jaw like a hatchet.",
    factKh: "អ្នកប្រមាញ់កំពូលនៃសម័យយូរ៉ាស៊ីក ដែលរស់នៅរាប់លានឆ្នាំមុន ទីរ៉ាណូសូរ៉ិច។ វាបរបាញ់សត្វស៊ីរុក្ខជាតិដ៏ធំ ដោយប្រើថ្គាមរបស់វាដូចជាពូថៅ។",
    statsEn: [
      { label: "Length",  value: "9 m (30 ft)" },
      { label: "Weight",  value: "2,000 kg" },
      { label: "Lived",   value: "155–145 million years ago" },
      { label: "Diet",    value: "Carnivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "៩ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "២,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១៥៥–១៤៥ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីសាច់" },
    ],
    accent: "border-orange-400/50 hover:shadow-orange-500/30",
  },
  {
    key: "pachycephalosaurus",
    nameEn: "Pachycephalosaurus",
    nameKh: "ប៉ាគីសេហ្វាឡូសូរ៉ិច",
    emoji: "🪨",
    roleEn: "The Bone-Headed Brawler",
    roleKh: "អ្នកប្រយុទ្ធក្បាលឆ្អឹង",
    factEn: "Known for having a skull that was up to 10 inches thick. They likely used their reinforced heads to ram into each other during fights for dominance.",
    factKh: "ល្បីដោយលលាដ៍ក្បាលមានកម្រាស់រហូតដល់ ១០ អ៊ីញ។ ពួកវាទំនងជាប្រើក្បាលដ៏រឹងមាំរបស់ពួកវាដើម្បីបុកគ្នាអំឡុងពេលប្រយុទ្ធសម្រាប់ឋានៈដឹកនាំ។",
    statsEn: [
      { label: "Length",  value: "4.5 m (15 ft)" },
      { label: "Weight",  value: "450 kg" },
      { label: "Lived",   value: "70–66 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "៤.៥ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "៤៥០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "៧០–៦៦ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-fuchsia-400/50 hover:shadow-fuchsia-500/30",
  },
  {
    key: "diplodocus",
    nameEn: "Diplodocus",
    nameKh: "ឌីប្លូដូកឹស",
    emoji: "🐉",
    roleEn: "The Whip-Tailed Giant",
    roleKh: "យក្សកន្ទុយរំពាត់",
    factEn: "One of the longest animals ever discovered. Its tail was so long and thin that it could crack it like a whip to scare away predators, breaking the sound barrier.",
    factKh: "សត្វដ៏វែងបំផុតមួយដែលធ្លាប់រកឃើញ។ កន្ទុយរបស់វាវែង និងស្តើង ដែលវាអាចវាយដូចរំពាត់ដើម្បីបណ្តេញសត្រូវ ដោយបំបែករបាំងសំឡេង។",
    statsEn: [
      { label: "Length",  value: "27 m (89 ft)" },
      { label: "Weight",  value: "15,000 kg" },
      { label: "Lived",   value: "154–152 million years ago" },
      { label: "Diet",    value: "Herbivore" },
    ],
    statsKh: [
      { label: "ប្រវែង",   value: "២៧ ម៉ែត្រ" },
      { label: "ទម្ងន់",   value: "១៥,០០០ គីឡូក្រាម" },
      { label: "រស់នៅ",    value: "១៥៤–១៥២ លានឆ្នាំមុន" },
      { label: "ចំណី",     value: "សត្វស៊ីរុក្ខជាតិ" },
    ],
    accent: "border-teal-400/50 hover:shadow-teal-500/30",
  },
];

type TimelineStep = {
  key: string;
  Icon: typeof Mountain;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  glow: string;
};

const TIMELINE: TimelineStep[] = [
  {
    key: "impact",
    Icon: Mountain,
    titleEn: "The Impact",
    titleKh: "ការបុកទង្គិច",
    bodyEn: "An asteroid the size of a mountain (10 km wide) slams into the ocean near modern-day Mexico at 70,000 km/h.",
    bodyKh: "អាចម៍ផ្កាយដែលមានទំហំប៉ុនភ្នំ (ទទឹង ១០ គីឡូម៉ែត្រ) បុកទង្គិចមហាសមុទ្រនៅជិតប្រទេសម៉ិកស៊ិកសព្វថ្ងៃ ក្នុងល្បឿន ៧០,០០០ គីឡូម៉ែត្រ/ម៉ោង។",
    glow: "from-orange-500/40 to-rose-600/30",
  },
  {
    key: "firestorm",
    Icon: Flame,
    titleEn: "The Firestorm",
    titleKh: "ព្យុះភ្លើង",
    bodyEn: "The impact throws billions of tons of super-heated rock into space. As it rains back down, the friction sets the sky on fire, burning forests worldwide.",
    bodyKh: "ការបុកទង្គិចបាញ់ថ្មក្តៅខ្លាំងរាប់ពាន់លានតោនទៅក្នុងលំហ។ ពេលវាធ្លាក់ចុះមកវិញ កកិតធ្វើឱ្យមេឃឆេះ និងដុតព្រៃឈើពាសពេញពិភពលោក។",
    glow: "from-amber-500/40 to-orange-700/30",
  },
  {
    key: "ash",
    Icon: CloudFog,
    titleEn: "The Ash Cloud",
    titleKh: "ពពកផេះ",
    bodyEn: "The explosion blasts so much dust into the atmosphere that it completely blocks out the sun for years.",
    bodyKh: "ការផ្ទុះបាញ់ធូលីច្រើនណាស់ទៅក្នុងបរិយាកាស ដែលបាំងពន្លឺព្រះអាទិត្យទាំងស្រុងអស់រយៈពេលជាច្រើនឆ្នាំ។",
    glow: "from-slate-500/40 to-zinc-700/30",
  },
  {
    key: "starvation",
    Icon: Soup,
    titleEn: "The Starvation",
    titleKh: "ការអត់ឃ្លាន",
    bodyEn: "Without sunlight, the plants die. Without plants, the plant-eating dinosaurs die. Without the plant-eaters, the meat-eating dinosaurs starve to death.",
    bodyKh: "បើគ្មានពន្លឺព្រះអាទិត្យ រុក្ខជាតិក៏ស្លាប់។ បើគ្មានរុក្ខជាតិ ឌីណូស័រស៊ីស្មៅក៏ស្លាប់។ បើគ្មានសត្វស៊ីស្មៅ ឌីណូស័រស៊ីសាច់ក៏ស្លាប់ដោយការអត់ឃ្លាន។",
    glow: "from-stone-500/40 to-amber-900/30",
  },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function DinosaurExtinctionPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (k: string) => setFlipped((f) => ({ ...f, [k]: !f[k] }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-stone-950 text-stone-100">
      {/* Decorative bone watermark */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px),radial-gradient(circle_at_70%_60%,white_1px,transparent_1px)] [background-size:40px_40px,55px_55px]" />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <header className="relative px-4 sm:px-6 pt-6 pb-12 sm:pt-10 sm:pb-20 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-300 transition mb-6 text-sm"
          data-testid="link-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home"}</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Skull className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          <Bone className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-50 leading-tight"
          data-testid="heading-page-title"
        >
          Dinosaurs & The Great Extinction
        </h1>
        <h2 className="font-khmer text-2xl sm:text-3xl md:text-4xl font-bold text-amber-200/95 mt-3 leading-snug">
          ឌីណូស័រ និងការផុតពូជដ៏ធំ
        </h2>

        <p className="mt-6 max-w-3xl text-stone-300 text-base sm:text-lg leading-relaxed">
          For 165 million years, dinosaurs ruled the Earth — bigger, fiercer, and more diverse
          than anything alive today. Then, in a single afternoon, almost all of them were gone.
        </p>
        <p className="font-khmer mt-3 max-w-3xl text-stone-300/90 text-base sm:text-lg leading-relaxed">
          អស់រយៈពេល ១៦៥ លានឆ្នាំ ឌីណូស័របានគ្រប់គ្រងផែនដី — ធំជាង កាចជាង និងចម្រុះជាងសត្វណាដែលរស់នៅសព្វថ្ងៃ។
          បន្ទាប់មកនៅរសៀលតែមួយ ស្ទើរតែទាំងអស់បានរលត់ខ្លួន។
        </p>
      </header>

      {/* ── Section 1 · Fossil Gallery ─────────────────────────────── */}
      <section
        className="relative px-4 sm:px-6 pb-16 max-w-6xl mx-auto"
        data-testid="section-fossil-gallery"
      >
        <SectionHeading
          en="The Interactive Fossil Gallery"
          kh="វិចិត្រសាលហ្វូស៊ីលអន្តរកម្ម"
          subEn="Tap a card to flip the fossil and meet the living dinosaur."
          subKh="ចុចលើកាតដើម្បីត្រឡប់ហ្វូស៊ីល និងជួបឌីណូស័ររស់។"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {DINOSAURS.map((d) => {
            const isFlipped = !!flipped[d.key];
            return (
              <button
                key={d.key}
                onClick={() => toggle(d.key)}
                className={`group relative h-80 [perspective:1000px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl text-left`}
                data-testid={`card-fossil-${d.key}`}
                data-flipped={isFlipped ? "true" : "false"}
                aria-pressed={isFlipped}
              >
                <div
                  className={`absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front · Fossil */}
                  <div
                    className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-gradient-to-br from-stone-800 to-slate-900 border-2 ${d.accent} shadow-lg shadow-black/40 group-hover:shadow-xl transition-shadow p-5 flex flex-col`}
                  >
                    <div className="flex items-center justify-between">
                      <Bone className="w-5 h-5 text-stone-400" />
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                        {isKh ? "ហ្វូស៊ីល" : "Fossil"}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-7xl opacity-90 group-hover:scale-110 transition-transform">
                      🦴
                    </div>
                    <div className="text-center">
                      <div className="text-stone-100 font-bold text-lg leading-tight">
                        {d.nameEn}
                      </div>
                      <div className="font-khmer text-amber-200/90 text-base mt-1">
                        {d.nameKh}
                      </div>
                      <div className="mt-3 text-[11px] text-stone-400 uppercase tracking-wider">
                        {isKh ? "ចុចដើម្បីបង្ហាញ" : "Tap to reveal"}
                      </div>
                    </div>
                  </div>

                  {/* Back · Living dinosaur */}
                  <div
                    className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-slate-800 to-stone-900 border-2 ${d.accent} shadow-lg shadow-black/40 p-5 flex flex-col overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{d.emoji}</span>
                      <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                        {isKh ? "ឌីណូស័រ" : "Dino"}
                      </span>
                    </div>
                    <div>
                      <div className="text-stone-50 font-bold text-base leading-tight">
                        {d.nameEn}
                      </div>
                      <div className="font-khmer text-amber-200/90 text-sm">
                        {d.nameKh}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-stone-400">
                        {isKh ? d.roleKh : d.roleEn}
                      </div>
                    </div>
                    <p className={`mt-2 text-xs text-stone-300 leading-relaxed ${isKh ? "font-khmer" : ""}`}>
                      {isKh ? d.factKh : d.factEn}
                    </p>
                    <ul className="mt-auto pt-2 border-t border-stone-700/60 space-y-0.5 text-[11px]">
                      {(isKh ? d.statsKh : d.statsEn).map((s) => (
                        <li key={s.label} className="flex justify-between gap-2">
                          <span className={`text-stone-400 ${isKh ? "font-khmer" : ""}`}>{s.label}</span>
                          <span className={`text-stone-100 font-semibold text-right ${isKh ? "font-khmer" : ""}`}>{s.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Section 2 · Asteroid Timeline ──────────────────────────── */}
      <section
        className="relative px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-b from-stone-950 via-orange-950/30 to-stone-950 border-y border-amber-900/40"
        data-testid="section-asteroid-timeline"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            en="66 Million Years Ago — The Asteroid Impact"
            kh="៦៦ លានឆ្នាំមុន - ការបុកទង្គិចនៃអាចម៍ផ្កាយ"
            subEn="The Chicxulub Extinction Event — minute by minute."
            subKh="ព្រឹត្តិការណ៍ផុតពូជឈីកស៊ូឡុប — នាទីមួយម្ដងៗ។"
            tone="ember"
          />

          <ol className="relative mt-12 ml-3 sm:ml-6 border-l-2 border-amber-700/60">
            {TIMELINE.map((t, i) => {
              const Icon = t.Icon;
              return (
                <li
                  key={t.key}
                  className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
                  data-testid={`timeline-step-${t.key}`}
                >
                  {/* Node */}
                  <div className="absolute -left-[1.05rem] sm:-left-[1.4rem] top-0">
                    <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${t.glow} ring-2 ring-amber-500/60 shadow-lg shadow-orange-900/50 flex items-center justify-center`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
                      <span className="absolute inset-0 rounded-full animate-ping bg-amber-500/20" />
                    </div>
                  </div>

                  <div className={`rounded-2xl bg-stone-900/70 backdrop-blur border border-amber-800/40 p-5 sm:p-6 shadow-lg shadow-black/30 hover:border-amber-500/60 transition-colors`}>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
                        {isKh ? `ជំហានទី ${["១","២","៣","៤"][i]}` : `Step ${i + 1}`}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-stone-50 mt-2 leading-tight">
                      {t.titleEn}
                    </h3>
                    <h4 className="font-khmer text-xl sm:text-2xl text-amber-200/95 mt-1">
                      {t.titleKh}
                    </h4>
                    <p className="mt-4 text-stone-300 leading-relaxed">
                      {t.bodyEn}
                    </p>
                    <p className="font-khmer mt-2 text-stone-300/90 leading-relaxed">
                      {t.bodyKh}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Section 3 · The Survivors ──────────────────────────────── */}
      <section
        className="relative px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto"
        data-testid="section-survivors"
      >
        <SectionHeading
          en="The Survivors"
          kh="អ្នករស់រានមានជីវិត"
          subEn="Not every dinosaur died that day."
          subKh="មិនមែនឌីណូស័រគ្រប់រូបបានស្លាប់នៅថ្ងៃនោះទេ។"
        />

        <div className="mt-10 grid md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900/30 to-slate-900 rounded-3xl p-8 border border-emerald-700/40">
            <Bird className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-300" strokeWidth={1.5} />
            <Sparkles className="w-5 h-5 text-amber-300 mt-2" />
          </div>

          <div className="md:col-span-3 space-y-5 text-stone-200 leading-relaxed">
            <p>
              Small, feathered, bird-like dinosaurs survived the cold and starvation because
              they needed less food. Hidden in burrows and tree hollows, they ate seeds, insects,
              and dead matter while the giants died around them.
            </p>
            <p className="font-khmer text-stone-200/90">
              ឌីណូស័រតូចៗ មានរោម និងស្រដៀងសត្វស្លាប បានរស់រានពីភាពត្រជាក់ និងការអត់ឃ្លាន ព្រោះពួកវាត្រូវការអាហារតិច។
              លាក់ខ្លួននៅក្នុងរូងក្រោមដី និងប្រហោងដើមឈើ ពួកវាស៊ីគ្រាប់ពូជ សត្វល្អិត និងវត្ថុស្លាប់ ខណៈពេលដែលឌីណូស័រយក្សកំពុងស្លាប់នៅជុំវិញ។
            </p>

            <blockquote className="relative mt-6 rounded-2xl border-l-4 border-amber-400 bg-stone-900/60 p-6 shadow-inner">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-400/20 ring-2 ring-amber-400/60 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-lg sm:text-xl text-stone-50 font-semibold italic leading-snug">
                "The dinosaurs didn't completely disappear; they evolved into the birds we see today."
              </p>
              <p className="font-khmer mt-3 text-base sm:text-lg text-amber-200/95 leading-snug">
                «ឌីណូស័រមិនបានបាត់ស្រមោលទាំងស្រុងនោះទេ ពួកវាបានវិវត្តទៅជាសត្វបក្សីដែលយើងឃើញសព្វថ្ងៃ។»
              </p>
            </blockquote>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/study-center/wildlife-explorer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-lg shadow-amber-500/30"
            data-testid="link-wildlife-explorer"
          >
            <Bird className="w-4 h-4" />
            <span>{isKh ? "រុករកសត្វបក្សីសព្វថ្ងៃនៅ Wildlife Explorer" : "Meet today's birds in Wildlife Explorer"}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function SectionHeading({
  en, kh, subEn, subKh, tone = "default",
}: { en: string; kh: string; subEn?: string; subKh?: string; tone?: "default" | "ember" }) {
  const accent = tone === "ember" ? "text-orange-300" : "text-amber-200";
  return (
    <div>
      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold ${accent}`}>
        <span className="w-8 h-px bg-current" />
        <span>{tone === "ember" ? "Extinction Event" : "Module"}</span>
      </div>
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-stone-50 leading-tight">
        {en}
      </h2>
      <h3 className={`font-khmer mt-2 text-2xl sm:text-3xl font-bold ${accent} leading-snug`}>
        {kh}
      </h3>
      {(subEn || subKh) && (
        <div className="mt-4 space-y-1 max-w-2xl">
          {subEn && <p className="text-stone-400">{subEn}</p>}
          {subKh && <p className="font-khmer text-stone-400/90">{subKh}</p>}
        </div>
      )}
    </div>
  );
}
