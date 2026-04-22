import { useEffect, useMemo, useState } from "react";
import {
  Volume2, Trees, Sparkles, Search, RotateCcw, X,
  ChevronDown, ChevronUp, BookOpen,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import {
  speakText,
  loadVoicesAsync,
  type SpeakLang,
} from "@/lib/speech";

type Tint = { bg: string; border: string; accent: string };

type Phylum = "Vertebrate" | "Invertebrate";
type AnimalClass =
  | "Mammal" | "Bird" | "Fish" | "Reptile" | "Amphibian"
  | "Insect" | "Arachnid" | "Crustacean" | "Mollusk" | "Annelid" | "Cnidarian";

type Animal = {
  key: string;
  nameEn: string;
  nameKh: string;
  emoji: string;
  factEn: string;
  factKh: string;
  imageUrl?: string;
  cardTint: Tint;
  phylum: Phylum;
  class: AnimalClass;
};

// Bilingual labels for each biological class — used by both the Learn panel
// and the filter pills so they stay perfectly in sync.
const CLASS_LABELS: Record<AnimalClass, { en: string; kh: string }> = {
  Mammal:     { en: "Mammals",     kh: "ថនិកសត្វ" },
  Bird:       { en: "Birds",       kh: "សត្វស្លាប" },
  Fish:       { en: "Fish",        kh: "សត្វត្រី" },
  Reptile:    { en: "Reptiles",    kh: "សត្វលូន" },
  Amphibian:  { en: "Amphibians",  kh: "សត្វក្រឡើត" },
  Insect:     { en: "Insects",     kh: "សត្វល្អិត" },
  Arachnid:   { en: "Arachnids",   kh: "សត្វពីងពាង" },
  Crustacean: { en: "Crustaceans", kh: "សត្វពួកបង្កង" },
  Mollusk:    { en: "Mollusks",    kh: "សត្វពួកខ្យង" },
  Annelid:    { en: "Annelids",    kh: "ដង្កូវ" },
  Cnidarian:  { en: "Cnidarians",  kh: "សត្វពួកមេអំបៅសមុទ្រ" },
};

const PHYLUM_OF: Record<AnimalClass, Phylum> = {
  Mammal: "Vertebrate", Bird: "Vertebrate", Fish: "Vertebrate",
  Reptile: "Vertebrate", Amphibian: "Vertebrate",
  Insect: "Invertebrate", Arachnid: "Invertebrate", Crustacean: "Invertebrate",
  Mollusk: "Invertebrate", Annelid: "Invertebrate", Cnidarian: "Invertebrate",
};

type FilterKey = "all" | "phylum:Vertebrate" | "phylum:Invertebrate" | `class:${AnimalClass}`;

// Pills shown below the search — order matches the Learn panel's branches.
const FILTER_PILLS: Array<{ key: FilterKey; en: string; kh: string }> = [
  { key: "all",                  en: "All",          kh: "ទាំងអស់" },
  { key: "phylum:Vertebrate",    en: "Vertebrates",  kh: "សត្វមានឆ្អឹងកង" },
  { key: "phylum:Invertebrate",  en: "Invertebrates", kh: "សត្វឥតឆ្អឹងកង" },
  { key: "class:Mammal",         en: CLASS_LABELS.Mammal.en,     kh: CLASS_LABELS.Mammal.kh },
  { key: "class:Bird",           en: CLASS_LABELS.Bird.en,       kh: CLASS_LABELS.Bird.kh },
  { key: "class:Fish",           en: CLASS_LABELS.Fish.en,       kh: CLASS_LABELS.Fish.kh },
  { key: "class:Reptile",        en: CLASS_LABELS.Reptile.en,    kh: CLASS_LABELS.Reptile.kh },
  { key: "class:Amphibian",      en: CLASS_LABELS.Amphibian.en,  kh: CLASS_LABELS.Amphibian.kh },
  { key: "class:Insect",         en: CLASS_LABELS.Insect.en,     kh: CLASS_LABELS.Insect.kh },
  { key: "class:Arachnid",       en: CLASS_LABELS.Arachnid.en,   kh: CLASS_LABELS.Arachnid.kh },
  { key: "class:Crustacean",     en: CLASS_LABELS.Crustacean.en, kh: CLASS_LABELS.Crustacean.kh },
  { key: "class:Mollusk",        en: CLASS_LABELS.Mollusk.en,    kh: CLASS_LABELS.Mollusk.kh },
];

// ─────────────────────────────────────────────────────────────────────────────
// Safari palette — cycled across cards for friendly visual variety.
// All tints are soft, low-saturation, earthy or leafy.
// ─────────────────────────────────────────────────────────────────────────────
const TINTS: Tint[] = [
  { bg: "bg-emerald-50", border: "border-emerald-300", accent: "bg-emerald-100" },
  { bg: "bg-amber-50",   border: "border-amber-300",   accent: "bg-amber-100"   },
  { bg: "bg-lime-50",    border: "border-lime-300",    accent: "bg-lime-100"    },
  { bg: "bg-stone-50",   border: "border-stone-300",   accent: "bg-stone-100"   },
  { bg: "bg-yellow-50",  border: "border-yellow-300",  accent: "bg-yellow-100"  },
  { bg: "bg-orange-50",  border: "border-orange-300",  accent: "bg-orange-100"  },
  { bg: "bg-teal-50",    border: "border-teal-300",    accent: "bg-teal-100"    },
  { bg: "bg-green-50",   border: "border-green-300",   accent: "bg-green-100"   },
];

// Raw entries — `phylum` and `class` may be omitted, in which case they
// default to Vertebrate/Mammal. This lets future entries override per-row
// without editing every existing animal.
type AnimalSeed = Omit<Animal, "phylum" | "class"> &
  Partial<Pick<Animal, "phylum" | "class">>;

const ANIMALS_RAW: AnimalSeed[] = [
  { key: "donkey",   nameEn: "Donkey",   nameKh: "សត្វលា",      emoji: "🫏",
    factEn: "The donkey is a strong farm animal that loves to carry heavy loads.",
    factKh: "សត្វលា ជាសត្វចិញ្ចឹមដ៏រឹងមាំ ដែលចូលចិត្តដឹកអីវ៉ាន់ធ្ងន់។", cardTint: TINTS[0] },
  { key: "lion",     nameEn: "Lion",     nameKh: "សត្វតោ",      emoji: "🦁",
    factEn: "The lion is a big cat and is called the king of the jungle.",
    factKh: "សត្វតោ ជាសត្វឆ្មាធំ ហើយត្រូវបានហៅថា ស្តេចព្រៃ។", cardTint: TINTS[4] },
  { key: "fox",      nameEn: "Fox",      nameKh: "កញ្ជ្រោង",    emoji: "🦊",
    factEn: "The fox is a clever animal with a long bushy tail.",
    factKh: "កញ្ជ្រោង ជាសត្វវៃឆ្លាត ដែលមានកន្ទុយវែង និងរោម។", cardTint: TINTS[5] },
  { key: "monkey",   nameEn: "Monkey",   nameKh: "សត្វស្វា",    emoji: "🐒",
    factEn: "The monkey loves to swing from tree to tree and eat bananas.",
    factKh: "សត្វស្វា ចូលចិត្តលោតពីដើមឈើមួយ ទៅដើមឈើមួយ ហើយស៊ីចេក។", cardTint: TINTS[2] },

  { key: "pig",      nameEn: "Pig",      nameKh: "សត្វជ្រូក",   emoji: "🐖",
    factEn: "The pig is very smart and lives on farms around the world.",
    factKh: "សត្វជ្រូក ឆ្លាតខ្លាំង ហើយរស់នៅក្នុងកសិដ្ឋាន ជុំវិញពិភពលោក។", cardTint: TINTS[5] },
  { key: "bear",     nameEn: "Bear",     nameKh: "សត្វខ្លាឃ្មុំ", emoji: "🐻",
    factEn: "The bear is large and strong and loves to eat honey and fish.",
    factKh: "សត្វខ្លាឃ្មុំ ធំ និងរឹងមាំ ហើយចូលចិត្តស៊ីទឹកឃ្មុំ និងត្រី។", cardTint: TINTS[3] },
  { key: "raccoon",  nameEn: "Raccoon",  nameKh: "រ៉ាគូន",       emoji: "🦝",
    factEn: "The raccoon has a black mask on its face and very clever paws.",
    factKh: "រ៉ាគូន មានស្នាមពណ៌ខ្មៅនៅលើមុខ ហើយជើងវាឆ្លាតខ្លាំង។", cardTint: TINTS[3] },
  { key: "elephant", nameEn: "Elephant", nameKh: "សត្វដំរី",     emoji: "🐘",
    factEn: "The elephant is the largest land animal and uses its trunk to drink water.",
    factKh: "សត្វដំរី ជាសត្វលើដីធំជាងគេ ហើយប្រើប្រមោយរបស់វា ដើម្បីផឹកទឹក។", cardTint: TINTS[0] },

  { key: "cat",      nameEn: "Cat",      nameKh: "សត្វឆ្មា",    emoji: "🐈",
    factEn: "The cat is a soft pet that loves to sleep and chase little toys.",
    factKh: "សត្វឆ្មា ជាសត្វចិញ្ចឹមទន់ភ្លន់ ចូលចិត្តគេង និងដេញលេងប្រដាប់ក្មេងតូចៗ។", cardTint: TINTS[1] },
  { key: "dog",      nameEn: "Dog",      nameKh: "សត្វឆ្កែ",    emoji: "🐕",
    factEn: "The dog is a loyal friend that loves to run and play with people.",
    factKh: "សត្វឆ្កែ ជាមិត្តស្មោះត្រង់ ដែលចូលចិត្តរត់ និងលេងជាមួយមនុស្ស។", cardTint: TINTS[3] },
  { key: "yak",      nameEn: "Yak",      nameKh: "គោព្រៃ យ៉ាក់", emoji: "🐃",
    factEn: "The yak has long shaggy hair to stay warm high up in the mountains.",
    factKh: "យ៉ាក់ មានរោមវែង ដើម្បីរក្សាកំដៅ នៅលើភ្នំខ្ពស់។", cardTint: TINTS[3] },
  { key: "rabbit",   nameEn: "Rabbit",   nameKh: "សត្វទន្សាយ",  emoji: "🐇",
    factEn: "The rabbit hops with strong back legs and loves to eat carrots.",
    factKh: "សត្វទន្សាយ លោតដោយប្រើជើងក្រោយដ៏រឹងមាំ ហើយចូលចិត្តស៊ីការ៉ុត។", cardTint: TINTS[2] },

  { key: "tiger",    nameEn: "Tiger",    nameKh: "សត្វខ្លា",    emoji: "🐅",
    factEn: "The tiger has orange fur with black stripes and is a powerful hunter.",
    factKh: "សត្វខ្លា មានរោមពណ៌ទឹកក្រូច និងឆ្នូតពណ៌ខ្មៅ ហើយជាអ្នកប្រមាញ់ដ៏ខ្លាំង។", cardTint: TINTS[1] },
  { key: "sheep",    nameEn: "Sheep",    nameKh: "សត្វចៀម",     emoji: "🐑",
    factEn: "The sheep has soft warm wool that we use to make clothes.",
    factKh: "សត្វចៀម មានរោមទន់និងកំដៅ ដែលយើងប្រើធ្វើសម្លៀកបំពាក់។", cardTint: TINTS[3] },
  { key: "llama",    nameEn: "Llama",    nameKh: "ឡាម៉ា",        emoji: "🦙",
    factEn: "The llama lives high in the mountains of South America.",
    factKh: "ឡាម៉ា រស់នៅលើភ្នំខ្ពស់ ក្នុងតំបន់អាមេរិកខាងត្បូង។", cardTint: TINTS[5] },
  { key: "sloth",    nameEn: "Sloth",    nameKh: "សត្វស្លុត",   emoji: "🦥",
    factEn: "The sloth is the slowest animal and sleeps most of the day in trees.",
    factKh: "សត្វស្លុត ជាសត្វយឺតបំផុត ហើយដេកភាគច្រើននៃថ្ងៃ នៅលើដើមឈើ។", cardTint: TINTS[2] },

  { key: "koala",    nameEn: "Koala",    nameKh: "កូឡា",         emoji: "🐨",
    factEn: "The koala lives in Australia and loves to eat eucalyptus leaves.",
    factKh: "កូឡា រស់នៅប្រទេសអូស្ត្រាលី ហើយចូលចិត្តស៊ីស្លឹកអ៊ុយកាលីប។", cardTint: TINTS[6] },
  { key: "deer",     nameEn: "Deer",     nameKh: "សត្វក្តាន់",  emoji: "🦌",
    factEn: "The deer has long thin legs and runs very fast through the forest.",
    factKh: "សត្វក្តាន់ មានជើងវែងស្តើង ហើយរត់លឿនណាស់ ឆ្លងកាត់ព្រៃ។", cardTint: TINTS[5] },
  { key: "wolf",     nameEn: "Wolf",     nameKh: "ឆ្កែចចក",     emoji: "🐺",
    factEn: "The wolf lives with its family in a group called a pack.",
    factKh: "ឆ្កែចចក រស់នៅជាមួយគ្រួសាររបស់វា ក្នុងក្រុមហៅថា ហ្វូង។", cardTint: TINTS[3] },
  { key: "jaguar",   nameEn: "Jaguar",   nameKh: "ខ្លារខិន",    emoji: "🐆",
    factEn: "The jaguar has spotted fur and is a strong swimmer that lives in the rainforest.",
    factKh: "ខ្លារខិន មានរោមមានចំណុចៗ និងជាអ្នកហែលទឹកដ៏ខ្លាំង ដែលរស់នៅក្នុងព្រៃភ្លៀង។", cardTint: TINTS[1] },

  { key: "hippo",    nameEn: "Hippo",    nameKh: "ដំរីទឹក",      emoji: "🦛",
    factEn: "The hippo is huge and spends most of the day in rivers to stay cool.",
    factKh: "ដំរីទឹក មានរូបធំ ហើយចំណាយពេលភាគច្រើន នៃថ្ងៃ ក្នុងទន្លេ ដើម្បីត្រជាក់ខ្លួន។", cardTint: TINTS[6] },
  { key: "zebra",    nameEn: "Zebra",    nameKh: "សេះបង្កង់",   emoji: "🦓",
    factEn: "The zebra looks like a horse with black and white stripes all over its body.",
    factKh: "សេះបង្កង់ មើលទៅដូចសេះ ដែលមានឆ្នូតខ្មៅ និងសពេញខ្លួន។", cardTint: TINTS[3] },
  { key: "giraffe",  nameEn: "Giraffe",  nameKh: "សត្វកវែង",    emoji: "🦒",
    factEn: "The giraffe has the longest neck of any animal so it can eat tall tree leaves.",
    factKh: "សត្វកវែង មានកវែងជាងគេ ដូច្នេះវាអាចស៊ីស្លឹកឈើខ្ពស់ៗ បាន។", cardTint: TINTS[5] },
  { key: "xerus",    nameEn: "Ground Squirrel", nameKh: "កំប្រុកដី", emoji: "🐿️",
    factEn: "The ground squirrel digs tunnels under the dry ground to make its home.",
    factKh: "កំប្រុកដី ជីករូងក្រោមដីស្ងួត ដើម្បីធ្វើជាផ្ទះ។", cardTint: TINTS[1] },
];

// Apply the Vertebrate/Mammal default to every entry that doesn't override.
const ANIMALS: Animal[] = ANIMALS_RAW.map((a) => {
  const cls: AnimalClass = a.class ?? "Mammal";
  return { ...a, class: cls, phylum: a.phylum ?? PHYLUM_OF[cls] };
});

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG flags — emoji flags don't render on Windows or older Android.
// ─────────────────────────────────────────────────────────────────────────────

function FlagUS({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={`${className} rounded-sm overflow-hidden shadow-sm`} aria-hidden="true" role="img">
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.7"  width="24" height="1.2" fill="white" />
      <rect y="4.1"  width="24" height="1.2" fill="white" />
      <rect y="6.5"  width="24" height="1.2" fill="white" />
      <rect y="8.9"  width="24" height="1.2" fill="white" />
      <rect y="11.3" width="24" height="1.2" fill="white" />
      <rect y="13.7" width="24" height="1.2" fill="white" />
      <rect width="10" height="8.6" fill="#3C3B6E" />
    </svg>
  );
}

function FlagKH({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={`${className} rounded-sm overflow-hidden shadow-sm`} aria-hidden="true" role="img">
      <rect width="24" height="4"  fill="#032EA1" />
      <rect y="4"  width="24" height="8" fill="#E00025" />
      <rect y="12" width="24" height="4" fill="#032EA1" />
      <g fill="white">
        <rect x="9"    y="10.5" width="6"   height="0.7" />
        <rect x="11.6" y="6.3"  width="0.8" height="4.2" />
        <rect x="11.2" y="5.6"  width="1.6" height="0.7" />
        <rect x="9.2"  y="7.2"  width="0.7" height="3.3" />
        <rect x="14.1" y="7.2"  width="0.7" height="3.3" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Backbone iconography — small inline SVGs used in the Learn panel.
// SpineIcon: a vertical column of 5 vertebrae circles, suggesting a backbone.
// NoSpineIcon: same spine with a diagonal red strike-through.
// ─────────────────────────────────────────────────────────────────────────────
function SpineIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" role="img">
      <g fill="currentColor">
        <ellipse cx="12" cy="3.5"  rx="3.5" ry="2" />
        <ellipse cx="12" cy="8"    rx="3.5" ry="2" />
        <ellipse cx="12" cy="12.5" rx="3.5" ry="2" />
        <ellipse cx="12" cy="17"   rx="3.5" ry="2" />
        <ellipse cx="12" cy="21.5" rx="3.5" ry="2" />
      </g>
    </svg>
  );
}

function NoSpineIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" role="img">
      <g fill="currentColor" opacity="0.55">
        <ellipse cx="12" cy="3.5"  rx="3.5" ry="2" />
        <ellipse cx="12" cy="8"    rx="3.5" ry="2" />
        <ellipse cx="12" cy="12.5" rx="3.5" ry="2" />
        <ellipse cx="12" cy="17"   rx="3.5" ry="2" />
        <ellipse cx="12" cy="21.5" rx="3.5" ry="2" />
      </g>
      {/* Strike-through */}
      <line x1="3" y1="22" x2="21" y2="2" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bilingual chip used inside the Learn panel sub-groups (Mammals, Birds, …).
function ClassChip({
  cls, isKh, variant = "sky",
}: { cls: AnimalClass; isKh: boolean; variant?: "sky" | "mint" }) {
  const tone =
    variant === "mint"
      ? "bg-white border-emerald-300 text-emerald-900"
      : "bg-white border-sky-300 text-sky-900";
  return (
    <li className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] sm:text-xs font-bold ${tone}`}>
      <span className={isKh ? "font-khmer" : ""}>
        {isKh ? CLASS_LABELS[cls].kh : CLASS_LABELS[cls].en}
      </span>
      <span className={`opacity-60 ${!isKh ? "font-khmer" : ""}`}>
        · {!isKh ? CLASS_LABELS[cls].kh : CLASS_LABELS[cls].en}
      </span>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WildlifeExplorerPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [toast, setToast] = useState<string | null>(null);
  const [khmerVoiceReady, setKhmerVoiceReady] = useState<boolean>(true);
  const [flippedKey, setFlippedKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [learnOpen, setLearnOpen] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    loadVoicesAsync().then((voices) => {
      if (cancelled) return;
      const hasKhmer = voices.some((v) => /^km/i.test(v.lang));
      setKhmerVoiceReady(hasKhmer);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(id);
  }, [toast]);

  function handleSpeak(animal: Animal, lang: SpeakLang) {
    if (lang === "km-KH" && !khmerVoiceReady) {
      setToast(isKh ? "សំឡេងភាសាខ្មែរមិនទាន់មាននៅលើកម្មវិធីរុករកនេះទេ" : "Khmer audio not supported on this browser");
      return;
    }
    const text = lang === "en-US" ? animal.nameEn : animal.nameKh;
    const result = speakText(text, lang);
    if (!result.ok) {
      setToast(isKh ? "សំឡេងមិនអាចប្រើបានទេនៅលើកម្មវិធីរុករកនេះ" : "Audio not supported on this browser");
    }
  }

  // Apply the classification filter first (Vertebrates, Mammals, etc.).
  const filteredAnimals = useMemo(() => {
    if (activeFilter === "all") return ANIMALS;
    if (activeFilter.startsWith("phylum:")) {
      const ph = activeFilter.slice("phylum:".length) as Phylum;
      return ANIMALS.filter((a) => a.phylum === ph);
    }
    const cls = activeFilter.slice("class:".length) as AnimalClass;
    return ANIMALS.filter((a) => a.class === cls);
  }, [activeFilter]);

  // Then apply promote-to-top search within that filtered set.
  const orderedAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredAnimals;
    const matches: Animal[] = [];
    const rest: Animal[] = [];
    for (const a of filteredAnimals) {
      const haystack = `${a.nameEn} ${a.nameKh} ${a.key}`.toLowerCase();
      if (haystack.includes(q)) matches.push(a); else rest.push(a);
    }
    return [...matches, ...rest];
  }, [query, filteredAnimals]);

  const matchCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    return filteredAnimals.filter((a) =>
      `${a.nameEn} ${a.nameKh} ${a.key}`.toLowerCase().includes(q),
    ).length;
  }, [query, filteredAnimals]);

  // Counts shown on each filter pill — based on the full dataset, not the
  // current filter (so users always see how many animals each branch holds).
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ANIMALS.length };
    counts["phylum:Vertebrate"] = ANIMALS.filter((a) => a.phylum === "Vertebrate").length;
    counts["phylum:Invertebrate"] = ANIMALS.filter((a) => a.phylum === "Invertebrate").length;
    for (const cls of Object.keys(CLASS_LABELS) as AnimalClass[]) {
      counts[`class:${cls}`] = ANIMALS.filter((a) => a.class === cls).length;
    }
    return counts;
  }, []);

  const t = useMemo(() => ({
    eyebrowEn: "Study Center · Vocabulary",
    eyebrowKh: "មជ្ឈមណ្ឌលសិក្សា · វាក្យសព្ទ",
    titleEn: "Wildlife Explorer",
    titleKh: "អ្នករុករកសត្វព្រៃ",
    leadEn: "Tap the picture on any card to flip it and read a fun fact. Tap the flag buttons to hear each animal's name in English or Khmer.",
    leadKh: "ចុចលើរូបភាព នៃកាតណាមួយ ដើម្បីបង្វិលវា និងអានព័ត៌មានគួរឱ្យចាប់អារម្មណ៍។ ចុចលើប៊ូតុងទង់ជាតិ ដើម្បីស្ដាប់ឈ្មោះសត្វនីមួយៗ ជាភាសាអង់គ្លេស ឬខ្មែរ។",
    enLabel: "EN",
    khLabel: "ខ្មែរ",
    khUnsupportedTip: "Audio not supported",
    searchPlaceholderEn: "Search animals (try a letter like 'E')",
    searchPlaceholderKh: "ស្វែងរកសត្វ (សាកសរសេរអក្សរដូចជា « E »)",
    clearEn: "Clear",
    clearKh: "សម្អាត",
    resultsHintEn: (n: number) => `${n} match${n === 1 ? "" : "es"} promoted to the top`,
    resultsHintKh: (n: number) => `សត្វ ${n} ត្រូវលើកមកកំពូល`,
    flipHintEn: "Tap the picture to flip back",
    flipHintKh: "ចុចលើរូបភាព ដើម្បីបង្វិលត្រឡប់",
    // Learn panel
    learnTitleEn: "Learn: Animal Classes",
    learnTitleKh: "សិក្សា៖ ប្រភេទសត្វ",
    learnSubtitleEn: "Two big branches of the animal kingdom",
    learnSubtitleKh: "សាខាធំៗ ពីរនៃពពួកសត្វ",
    learnExpandEn: "Show",
    learnExpandKh: "បង្ហាញ",
    learnCollapseEn: "Hide",
    learnCollapseKh: "បិទ",
    vertebrateEn: "Vertebrates",
    vertebrateKh: "សត្វមានឆ្អឹងកង",
    vertebrateDescEn: "Animals with a backbone",
    vertebrateDescKh: "សត្វដែលមានឆ្អឹងកង",
    invertebrateEn: "Invertebrates",
    invertebrateKh: "សត្វឥតឆ្អឹងកង",
    invertebrateDescEn: "Animals without a backbone",
    invertebrateDescKh: "សត្វដែលគ្មានឆ្អឹងកង",
    warmBloodedEn: "Warm-blooded",
    warmBloodedKh: "មានឈាមក្តៅ",
    coldBloodedEn: "Cold-blooded",
    coldBloodedKh: "មានឈាមត្រជាក់",
    arthropodsEn: "Arthropods",
    arthropodsKh: "សត្វជើងភ្ជាប់",
    otherInvertEn: "Other",
    otherInvertKh: "ផ្សេងៗ",
    // Filter
    filterByEn: "Filter by classification",
    filterByKh: "ច្រោះតាមការចាត់ថ្នាក់",
    noMatchEn: "No animals in this group yet.",
    noMatchKh: "មិនទាន់មានសត្វ ក្នុងក្រុមនេះទេ។",
    clearFilterEn: "Show all animals",
    clearFilterKh: "បង្ហាញសត្វទាំងអស់",
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-lime-50 to-white">
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border-2 border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-sm"
            data-testid="wildlife-eyebrow"
          >
            <Trees className="w-3.5 h-3.5" />
            <span className={isKh ? "font-khmer" : ""}>{isKh ? t.eyebrowKh : t.eyebrowEn}</span>
          </div>

          <h1
            className={`mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-emerald-900 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}
            data-testid="wildlife-title"
          >
            {isKh ? t.titleKh : t.titleEn}{" "}
            <span aria-hidden="true" className="inline-block ml-1">🌿</span>
          </h1>

          <p className={`mt-3 max-w-2xl text-base sm:text-lg text-emerald-900/80 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? t.leadKh : t.leadEn}
          </p>
        </div>
      </section>

      {/* Learn: Animal Classes — collapsible educational header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4" aria-labelledby="learn-panel-title">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border-2 border-emerald-200 bg-white/85 shadow-sm overflow-hidden">
            {/* Header row — always visible, click anywhere to toggle */}
            <button
              type="button"
              onClick={() => setLearnOpen((o) => !o)}
              aria-expanded={learnOpen}
              aria-controls="learn-panel-body"
              className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left bg-gradient-to-r from-sky-50 via-white to-emerald-50 hover:from-sky-100 hover:to-emerald-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              data-testid="learn-panel-toggle"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="learn-panel-title"
                  className={`font-display font-extrabold text-base sm:text-lg text-emerald-900 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}
                >
                  {isKh ? t.learnTitleKh : t.learnTitleEn}
                </h2>
                <p className={`text-xs sm:text-sm text-emerald-800/75 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? t.learnSubtitleKh : t.learnSubtitleEn}
                </p>
              </div>
              <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                {learnOpen ? (isKh ? t.learnCollapseKh : t.learnCollapseEn) : (isKh ? t.learnExpandKh : t.learnExpandEn)}
              </span>
              {learnOpen
                ? <ChevronUp   className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                : <ChevronDown className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />}
            </button>

            {/* Body — Vertebrate vs Invertebrate, side-by-side on >=md, stacked on mobile */}
            {learnOpen && (
              <div id="learn-panel-body" className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4">
                {/* VERTEBRATES — cool blue */}
                <div
                  className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4"
                  data-testid="learn-vertebrate"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-sky-300 text-sky-700 shrink-0">
                      <SpineIcon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-display font-extrabold text-lg text-sky-900 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}>
                        {isKh ? t.vertebrateKh : t.vertebrateEn}
                      </h3>
                      <p className={`text-xs sm:text-sm text-sky-800/85 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
                        {isKh ? t.vertebrateDescKh : t.vertebrateDescEn}
                      </p>
                      <p className={`text-[11px] sm:text-xs text-sky-700/70 mt-0.5 ${!isKh ? "font-khmer" : ""}`}>
                        {!isKh ? t.vertebrateKh : t.vertebrateEn}
                      </p>
                    </div>
                  </div>

                  {/* Warm-blooded sub-group */}
                  <div className="rounded-xl bg-white/70 border border-sky-200 p-2.5 mb-2">
                    <div className={`text-[11px] font-bold uppercase tracking-wider text-sky-800/80 mb-1.5 flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      <span aria-hidden="true">🔥</span>
                      <span>{isKh ? t.warmBloodedKh : t.warmBloodedEn}</span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5 list-none p-0">
                      {(["Mammal", "Bird"] as AnimalClass[]).map((c) => (
                        <ClassChip key={c} cls={c} isKh={isKh} />
                      ))}
                    </ul>
                  </div>

                  {/* Cold-blooded sub-group */}
                  <div className="rounded-xl bg-white/70 border border-sky-200 p-2.5">
                    <div className={`text-[11px] font-bold uppercase tracking-wider text-sky-800/80 mb-1.5 flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      <span aria-hidden="true">❄️</span>
                      <span>{isKh ? t.coldBloodedKh : t.coldBloodedEn}</span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5 list-none p-0">
                      {(["Fish", "Reptile", "Amphibian"] as AnimalClass[]).map((c) => (
                        <ClassChip key={c} cls={c} isKh={isKh} />
                      ))}
                    </ul>
                  </div>
                </div>

                {/* INVERTEBRATES — soft mint */}
                <div
                  className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4"
                  data-testid="learn-invertebrate"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-emerald-300 text-emerald-700 shrink-0">
                      <NoSpineIcon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-display font-extrabold text-lg text-emerald-900 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}>
                        {isKh ? t.invertebrateKh : t.invertebrateEn}
                      </h3>
                      <p className={`text-xs sm:text-sm text-emerald-800/85 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
                        {isKh ? t.invertebrateDescKh : t.invertebrateDescEn}
                      </p>
                      <p className={`text-[11px] sm:text-xs text-emerald-700/70 mt-0.5 ${!isKh ? "font-khmer" : ""}`}>
                        {!isKh ? t.invertebrateKh : t.invertebrateEn}
                      </p>
                    </div>
                  </div>

                  {/* Arthropods sub-group */}
                  <div className="rounded-xl bg-white/70 border border-emerald-200 p-2.5 mb-2">
                    <div className={`text-[11px] font-bold uppercase tracking-wider text-emerald-800/80 mb-1.5 flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      <span aria-hidden="true">🦀</span>
                      <span>{isKh ? t.arthropodsKh : t.arthropodsEn}</span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5 list-none p-0">
                      {(["Insect", "Arachnid", "Crustacean"] as AnimalClass[]).map((c) => (
                        <ClassChip key={c} cls={c} isKh={isKh} variant="mint" />
                      ))}
                    </ul>
                  </div>

                  {/* Other invertebrates */}
                  <div className="rounded-xl bg-white/70 border border-emerald-200 p-2.5">
                    <div className={`text-[11px] font-bold uppercase tracking-wider text-emerald-800/80 mb-1.5 flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      <span aria-hidden="true">🐌</span>
                      <span>{isKh ? t.otherInvertKh : t.otherInvertEn}</span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5 list-none p-0">
                      {(["Mollusk", "Annelid", "Cnidarian"] as AnimalClass[]).map((c) => (
                        <ClassChip key={c} cls={c} isKh={isKh} variant="mint" />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <label className="sr-only" htmlFor="wildlife-search">
            {isKh ? t.searchPlaceholderKh : t.searchPlaceholderEn}
          </label>
          <div className="relative" data-testid="wildlife-search-wrap">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700/70 pointer-events-none" aria-hidden="true" />
            <input
              id="wildlife-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isKh ? t.searchPlaceholderKh : t.searchPlaceholderEn}
              className={`w-full pl-12 pr-12 py-3 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm text-emerald-900 placeholder:text-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition ${isKh ? "font-khmer" : ""}`}
              data-testid="wildlife-search-input"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-full text-emerald-700 hover:bg-emerald-100 active:scale-95 transition"
                aria-label={isKh ? t.clearKh : t.clearEn}
                data-testid="wildlife-search-clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {query.trim() && (
            <p
              className={`mt-2 text-xs text-emerald-800/75 text-center ${isKh ? "font-khmer" : ""}`}
              role="status"
              aria-live="polite"
              data-testid="wildlife-search-status"
            >
              {isKh ? t.resultsHintKh(matchCount) : t.resultsHintEn(matchCount)}
            </p>
          )}
        </div>
      </section>

      {/* Filter pills — biological classification */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4" aria-labelledby="filter-pills-label">
        <div className="max-w-5xl mx-auto">
          <div
            id="filter-pills-label"
            className={`text-[11px] font-bold uppercase tracking-wider text-emerald-800/70 mb-2 text-center ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            {isKh ? t.filterByKh : t.filterByEn}
          </div>
          <div
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
            role="group"
            aria-label={isKh ? t.filterByKh : t.filterByEn}
            data-testid="wildlife-filter-pills"
          >
            {FILTER_PILLS.map((pill) => {
              const count = filterCounts[pill.key] ?? 0;
              const active = activeFilter === pill.key;
              const empty = count === 0;
              const isPhylum = pill.key.startsWith("phylum:");
              const isVert = pill.key === "phylum:Vertebrate";
              const isInvert = pill.key === "phylum:Invertebrate";

              // Color-coded by branch — sky for vertebrates, mint for invertebrates,
              // amber for "All", neutral for class chips.
              const activeClass = isVert
                ? "bg-sky-600 text-white border-sky-700"
                : isInvert
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : pill.key === "all"
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-emerald-700 text-white border-emerald-800";

              const idleClass = empty
                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                : isVert
                  ? "bg-white text-sky-900 border-sky-300 hover:bg-sky-50 hover:border-sky-500"
                  : isInvert
                    ? "bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-500"
                    : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400";

              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => { if (!empty) setActiveFilter(pill.key); }}
                  disabled={empty && !active}
                  aria-pressed={active}
                  aria-label={`${isKh ? pill.kh : pill.en} (${count})`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs sm:text-sm font-bold transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${active ? activeClass : idleClass} ${isPhylum ? "ring-1 ring-inset" : ""}`}
                  data-testid={`filter-pill-${pill.key.replace(":", "-")}`}
                  data-active={active ? "true" : "false"}
                >
                  {isVert   && <SpineIcon className="w-3.5 h-3.5" />}
                  {isInvert && <NoSpineIcon className="w-3.5 h-3.5" />}
                  <span className={isKh ? "font-khmer" : ""}>{isKh ? pill.kh : pill.en}</span>
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold ${active ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-800"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flashcard grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {orderedAnimals.length === 0 ? (
            <div
              className="rounded-3xl border-2 border-dashed border-emerald-300 bg-white/70 p-8 text-center"
              data-testid="wildlife-empty-state"
            >
              <p className={`text-emerald-900 font-bold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? t.noMatchKh : t.noMatchEn}
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-bold shadow-sm hover:bg-emerald-700 active:scale-95 transition ${isKh ? "font-khmer" : ""}`}
                data-testid="wildlife-empty-clear"
              >
                {isKh ? t.clearFilterKh : t.clearFilterEn}
              </button>
            </div>
          ) : (
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 list-none p-0"
            aria-label={isKh ? "កាតវាក្យសព្ទសត្វព្រៃ" : "Wildlife vocabulary cards"}
            data-testid="wildlife-grid"
          >
            {orderedAnimals.map((animal) => {
              const isFlipped = flippedKey === animal.key;
              const q = query.trim().toLowerCase();
              const isMatch = q.length > 0 && `${animal.nameEn} ${animal.nameKh} ${animal.key}`.toLowerCase().includes(q);

              return (
                <li key={animal.key}>
                  <article
                    className={`group relative rounded-3xl border-2 ${animal.cardTint.border} ${animal.cardTint.bg} overflow-hidden shadow-sm hover:shadow-md transition-all ${isMatch ? "ring-2 ring-emerald-400 ring-offset-2" : ""}`}
                    data-testid={`animal-card-${animal.key}`}
                    data-flipped={isFlipped ? "true" : "false"}
                  >
                    {/* Picture / fact area — clicking it toggles the flip. */}
                    {!isFlipped ? (
                      <button
                        type="button"
                        onClick={() => setFlippedKey(animal.key)}
                        className={`block w-full h-36 sm:h-40 ${animal.cardTint.accent} flex items-center justify-center select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                        aria-label={isKh ? `បង្ហាញព័ត៌មានអំពី ${animal.nameKh}` : `Show fact about ${animal.nameEn}`}
                        data-testid={`animal-flip-${animal.key}`}
                      >
                        {animal.imageUrl ? (
                          <img src={animal.imageUrl} alt={animal.nameEn} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-7xl sm:text-8xl drop-shadow-sm transition-transform group-hover:scale-110" role="img" aria-label={animal.nameEn}>
                            {animal.emoji}
                          </span>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setFlippedKey(null)}
                        className={`block w-full h-36 sm:h-40 ${animal.cardTint.accent} px-3 py-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                        aria-label={isKh ? t.flipHintKh : t.flipHintEn}
                        data-testid={`animal-flip-back-${animal.key}`}
                      >
                        <div className="h-full w-full flex flex-col items-stretch justify-between">
                          <div className="space-y-1.5 overflow-y-auto">
                            <p
                              className="text-[12px] sm:text-[13px] leading-snug text-emerald-900 font-medium"
                              data-testid={`fact-en-${animal.key}`}
                            >
                              {animal.factEn}
                            </p>
                            <p
                              className="font-khmer text-[12px] sm:text-[13px] leading-relaxed text-emerald-800"
                              data-testid={`fact-kh-${animal.key}`}
                            >
                              {animal.factKh}
                            </p>
                          </div>
                          <div className={`mt-1 inline-flex items-center gap-1 self-end text-[10px] text-emerald-700/80 ${isKh ? "font-khmer" : ""}`}>
                            <RotateCcw className="w-3 h-3" aria-hidden="true" />
                            <span>{isKh ? t.flipHintKh : t.flipHintEn}</span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Words + audio buttons */}
                    <div className="p-3 sm:p-4 space-y-2 bg-white/60 backdrop-blur-[2px]">
                      <div className="text-center">
                        <h2
                          className="font-display font-extrabold text-xl sm:text-2xl text-emerald-900 tracking-tight"
                          data-testid={`animal-en-${animal.key}`}
                        >
                          {animal.nameEn}
                        </h2>
                        <p
                          className="font-khmer text-base sm:text-lg text-emerald-800 mt-0.5"
                          data-testid={`animal-kh-${animal.key}`}
                        >
                          {animal.nameKh}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleSpeak(animal, "en-US"); }}
                          title={isKh ? "ស្ដាប់ជាភាសាអង់គ្លេស" : "Listen in English"}
                          aria-label={`Play ${animal.nameEn} in English`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-emerald-300 text-emerald-900 text-xs font-bold shadow-sm hover:bg-emerald-50 hover:border-emerald-500 active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          data-testid={`play-en-${animal.key}`}
                        >
                          <FlagUS className="w-4 h-2.5" />
                          <Volume2 className="w-3 h-3" aria-hidden="true" />
                          <span>{t.enLabel}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleSpeak(animal, "km-KH"); }}
                          aria-disabled={!khmerVoiceReady}
                          title={khmerVoiceReady ? (isKh ? "ស្ដាប់ជាភាសាខ្មែរ" : "Listen in Khmer") : t.khUnsupportedTip}
                          aria-label={khmerVoiceReady ? `Play ${animal.nameEn} in Khmer` : `Khmer audio not supported on this browser for ${animal.nameEn}`}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 text-xs font-bold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            khmerVoiceReady
                              ? "border-emerald-300 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-500 active:scale-95"
                              : "border-slate-200 text-slate-400 hover:bg-slate-50 active:scale-95"
                          }`}
                          data-testid={`play-kh-${animal.key}`}
                        >
                          <FlagKH className="w-4 h-2.5" />
                          <Volume2 className="w-3 h-3" aria-hidden="true" />
                          <span className="font-khmer">{t.khLabel}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          )}

          <div className={`mt-8 max-w-2xl mx-auto text-center text-sm text-emerald-900/70 flex items-center justify-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>
              {isKh
                ? "ចុចលើរូបភាពនីមួយៗ ដើម្បីបង្ហាញព័ត៌មានគួរឱ្យចាប់អារម្មណ៍។"
                : "Tap any picture to reveal a fun fact about that animal."}
            </span>
          </div>
        </div>
      </section>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium shadow-lg max-w-[90vw] text-center"
          data-testid="audio-toast"
        >
          <span className={isKh ? "font-khmer" : ""}>{toast}</span>
        </div>
      )}
    </div>
  );
}
