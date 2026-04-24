import { useEffect, useMemo, useState } from "react";
import {
  Volume2, Trees, Sparkles, Search, RotateCcw, X,
  ChevronDown, ChevronUp, BookOpen, Bug, MapPin,
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
  | "Insect" | "Arachnid" | "Crustacean" | "Mollusk" | "Annelid" | "Cnidarian"
  | "Chilopoda" | "Echinoderm";

type Region = "Australia";

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
  region?: Region;
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
  Cnidarian:  { en: "Cnidarians",  kh: "សត្វពួកខ្ទាម" },
  Chilopoda:  { en: "Centipedes",  kh: "សត្វក្អែប" },
  Echinoderm: { en: "Echinoderms", kh: "សត្វសមុទ្របន្លា" },
};

const PHYLUM_OF: Record<AnimalClass, Phylum> = {
  Mammal: "Vertebrate", Bird: "Vertebrate", Fish: "Vertebrate",
  Reptile: "Vertebrate", Amphibian: "Vertebrate",
  Insect: "Invertebrate", Arachnid: "Invertebrate", Crustacean: "Invertebrate",
  Mollusk: "Invertebrate", Annelid: "Invertebrate", Cnidarian: "Invertebrate",
  Chilopoda: "Invertebrate", Echinoderm: "Invertebrate",
};

type FilterKey =
  | "all"
  | "phylum:Vertebrate"
  | "phylum:Invertebrate"
  | "region:Australia"
  | `class:${AnimalClass}`;

// Pills shown below the search — order matches the Learn panel's branches.
const FILTER_PILLS: Array<{ key: FilterKey; en: string; kh: string }> = [
  { key: "all",                  en: "All",          kh: "ទាំងអស់" },
  { key: "phylum:Vertebrate",    en: "Vertebrates",  kh: "សត្វមានឆ្អឹងកង" },
  { key: "region:Australia",     en: "Region: Australia", kh: "តំបន់៖ អូស្ត្រាលី" },
  { key: "phylum:Invertebrate",  en: "Invertebrates", kh: "សត្វគ្មានឆ្អឹងកង" },
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
    factEn: "The largest land animal on Earth.",
    factKh: "សត្វលើគោកធំជាងគេបំផុតនៅលើផែនដី។", cardTint: TINTS[0], class: "Mammal" },

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
    factEn: "No two tigers have the same stripes; they are unique like fingerprints.",
    factKh: "គ្មានខ្លាពីរដែលមានឆ្នូតដូចគ្នាទេ ពួកវាមានលក្ខណៈពិសេសដូចស្នាមម្រាមដៃ។", cardTint: TINTS[1], class: "Mammal" },
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
    factEn: "Koalas sleep up to 22 hours a day because their diet of eucalyptus leaves is toxic and takes a lot of energy to digest!",
    factKh: "កូឡាគេងរហូតដល់ ២២ ម៉ោងក្នុងមួយថ្ងៃ ព្រោះអាហាររបស់ពួកវា ដែលជាស្លឹកអឺកាលីបទុស មានជាតិពុល និងត្រូវការថាមពលច្រើនដើម្បីរំលាយ!",
    cardTint: TINTS[6], class: "Mammal", region: "Australia" },
  { key: "deer",     nameEn: "Deer",     nameKh: "សត្វក្តាន់",  emoji: "🦌",
    factEn: "The deer has long thin legs and runs very fast through the forest.",
    factKh: "សត្វក្តាន់ មានជើងវែងស្តើង ហើយរត់លឿនណាស់ ឆ្លងកាត់ព្រៃ។", cardTint: TINTS[5] },
  { key: "wolf",     nameEn: "Wolf",     nameKh: "ឆ្កែចចក",     emoji: "🐺",
    factEn: "The wolf lives with its family in a group called a pack.",
    factKh: "ឆ្កែចចក រស់នៅជាមួយគ្រួសាររបស់វា ក្នុងក្រុមហៅថា ហ្វូង។", cardTint: TINTS[3] },
  { key: "jaguar",   nameEn: "Jaguar",   nameKh: "ខ្លារខិន",    emoji: "🐆",
    factEn: "The apex predator of the Amazon rainforest.",
    factKh: "សត្វរំពាដ៏ធំបំផុតនៃព្រៃអាម៉ាហ្សូន។", cardTint: TINTS[1], class: "Mammal" },

  { key: "hippo",    nameEn: "Hippo",    nameKh: "ដំរីទឹក",      emoji: "🦛",
    factEn: "The hippo is huge and spends most of the day in rivers to stay cool.",
    factKh: "ដំរីទឹក មានរូបធំ ហើយចំណាយពេលភាគច្រើន នៃថ្ងៃ ក្នុងទន្លេ ដើម្បីត្រជាក់ខ្លួន។", cardTint: TINTS[6] },
  { key: "zebra",    nameEn: "Zebra",    nameKh: "សេះបង្កង់",   emoji: "🦓",
    factEn: "The zebra looks like a horse with black and white stripes all over its body.",
    factKh: "សេះបង្កង់ មើលទៅដូចសេះ ដែលមានឆ្នូតខ្មៅ និងសពេញខ្លួន។", cardTint: TINTS[3] },
  { key: "giraffe",  nameEn: "Giraffe",  nameKh: "សត្វកវែង",    emoji: "🦒",
    factEn: "Its long neck has the exact same number of bones as a human neck — seven!",
    factKh: "កដ៏វែងរបស់វាមានចំនួនឆ្អឹងស្មើគ្នានឹងកមនុស្សដែរ គឺប្រាំពីរ!", cardTint: TINTS[5], class: "Mammal" },
  { key: "xerus",    nameEn: "Ground Squirrel", nameKh: "កំប្រុកដី", emoji: "🐿️",
    factEn: "The ground squirrel digs tunnels under the dry ground to make its home.",
    factKh: "កំប្រុកដី ជីករូងក្រោមដីស្ងួត ដើម្បីធ្វើជាផ្ទះ។", cardTint: TINTS[1] },

  /* ── Expansion pack: 7 new animals (5 others updated above with new facts) ── */
  // Birds
  { key: "penguin",     nameEn: "Penguin",     nameKh: "ភេនឃ្វីន",       emoji: "🐧",
    factEn: "A bird that cannot fly, but swims like a fish!",
    factKh: "សត្វស្លាបដែលមិនអាចហោះហើរ ប៉ុន្តែហែលទឹកដូចត្រី!",
    cardTint: TINTS[6], class: "Bird" },

  // Reptiles
  { key: "crocodile",   nameEn: "Crocodile",   nameKh: "សត្វក្រពើ",       emoji: "🐊",
    factEn: "A cold-blooded predator that has survived since the time of the dinosaurs.",
    factKh: "សត្វស៊ីសាច់ឈាមត្រជាក់ដែលរស់រានមានជីវិតតាំងពីសម័យដាយណូស័រ។",
    cardTint: TINTS[7], class: "Reptile" },
  { key: "turtle",      nameEn: "Turtle",      nameKh: "សត្វអណ្តើក",      emoji: "🐢",
    factEn: "Its shell is actually part of its skeleton, grown out from its ribs.",
    factKh: "ស្នូករបស់វាគឺជាផ្នែកនៃគ្រោងឆ្អឹង ដែលដុះចេញពីឆ្អឹងជំនីររបស់វា។",
    cardTint: TINTS[6], class: "Reptile" },

  // Mammals
  { key: "polar_bear",  nameEn: "Polar Bear",  nameKh: "សត្វខ្លាឃ្មុំទឹកកក", emoji: "🐻‍❄️",
    factEn: "Underneath their white fur, their skin is actually black to absorb heat.",
    factKh: "នៅក្រោមរោមពណ៌សរបស់ពួកវា ស្បែកពិតជាមានពណ៌ខ្មៅដើម្បីស្រូបកំដៅ។",
    cardTint: TINTS[3], class: "Mammal" },
  { key: "orangutan",   nameEn: "Orangutan",   nameKh: "សត្វអូរ៉ង់អ៊ូតង់",  emoji: "🦧",
    factEn: "Their name translates to 'Person of the Forest' in Malay.",
    factKh: "ឈ្មោះរបស់ពួកវាប្រែថា 'មនុស្សព្រៃ' ជាភាសាម៉ាឡេ។",
    cardTint: TINTS[5], class: "Mammal" },
  { key: "gorilla",     nameEn: "Gorilla",     nameKh: "សត្វហ្គោរីឡា",    emoji: "🦍",
    factEn: "Highly intelligent apes that share 98% of their DNA with humans.",
    factKh: "សត្វស្វាដ៏ឆ្លាតវៃដែលមាន DNA ៩៨% ដូចមនុស្ស។",
    cardTint: TINTS[3], class: "Mammal" },
  { key: "rhinoceros",  nameEn: "Rhinoceros",  nameKh: "សត្វរមាស",        emoji: "🦏",
    factEn: "Their horn is made of keratin — the exact same material as your fingernails!",
    factKh: "ស្នែងរបស់វាធ្វើពីកេរ៉ាទីន ដែលជាសារធាតុដូចគ្នានឹងក្រចកដៃរបស់អ្នក!",
    cardTint: TINTS[3], class: "Mammal" },

  /* ─── ADDITIONAL VERTEBRATES · Fish · Amphibian · Reptile · Bird · 24 species ─── */

  // Fish · ត្រី
  { key: "great_white_shark", nameEn: "Great White Shark", nameKh: "ត្រីឆ្លាមសយក្ស", emoji: "🦈",
    factEn: "Sharks do not have a single bone in their bodies. Their entire skeleton is made of cartilage, the same flexible material as human ears!",
    factKh: "សត្វឆ្លាមគ្មានឆ្អឹងតែមួយសោះនៅក្នុងខ្លួនរបស់ពួកវា។ គ្រោងឆ្អឹងទាំងមូលរបស់ពួកវាត្រូវបានបង្កើតឡើងពីឆ្អឹងខ្ចី ដែលជាសារធាតុទន់ដូចគ្នាទៅនឹងត្រចៀករបស់មនុស្ស!",
    cardTint: TINTS[6], class: "Fish" },
  { key: "clownfish",      nameEn: "Clownfish",       nameKh: "ត្រីកំប្លែង (នេម៉ូ)",  emoji: "🐠",
    factEn: "Clownfish live safely inside the stinging tentacles of sea anemones — a special slime on their skin protects them from the sting.",
    factKh: "ត្រីកំប្លែងរស់នៅប្រកបដោយសុវត្ថិភាពក្នុងចំណោមពន្លាក់របស់ផ្កាសមុទ្រដែលមានជាតិពុល — ជាតិរអិលពិសេសនៅលើស្បែករបស់វាការពារវាពីពិសនោះ។",
    cardTint: TINTS[5], class: "Fish" },
  { key: "seahorse",       nameEn: "Seahorse",        nameKh: "ត្រីសេះសមុទ្រ",      emoji: "🐡",
    factEn: "Seahorses are the only animals on Earth where the father — not the mother — becomes pregnant and gives birth to the babies.",
    factKh: "ត្រីសេះសមុទ្រគឺជាសត្វតែមួយគត់នៅលើផែនដី ដែលឪពុក មិនមែនម្ដាយទេ ដែលពពោះ និងសម្រាលកូន។",
    cardTint: TINTS[4], class: "Fish" },
  { key: "giant_mekong_catfish", nameEn: "Giant Mekong Catfish", nameKh: "ត្រីរាជ", emoji: "🐟",
    factEn: "Found only in the Mekong River near Cambodia, this giant can grow longer than a person and is one of the largest freshwater fish on Earth.",
    factKh: "រកឃើញតែនៅក្នុងទន្លេមេគង្គជិតប្រទេសកម្ពុជា ត្រីយក្សនេះអាចលូតលាស់វែងជាងមនុស្ស ហើយជាត្រីទឹកសាបធំជាងគេមួយនៅលើផែនដី។",
    cardTint: TINTS[2], class: "Fish" },
  { key: "electric_eel",   nameEn: "Electric Eel",    nameKh: "អន្ទង់អគ្គិសនី",     emoji: "🪱",
    factEn: "An electric eel can produce a 600-volt shock — five times stronger than a household wall socket — to stun its prey.",
    factKh: "អន្ទង់អគ្គិសនីអាចបញ្ចេញចរន្តអគ្គិសនី ៦០០ វ៉ុល ដែលខ្លាំងជាងព្រីសជញ្ជាំងផ្ទះដល់ ៥ ដង ដើម្បីធ្វើឱ្យចំណីរបស់វាដួល។",
    cardTint: TINTS[7], class: "Fish" },
  { key: "manta_ray",      nameEn: "Manta Ray",       nameKh: "ត្រីម៉ានតា",            emoji: "🐟",
    factEn: "Manta rays have the largest brain of any fish and can recognize themselves in a mirror — a sign of high intelligence.",
    factKh: "ត្រីម៉ានតាមានខួរក្បាលធំជាងគេក្នុងចំណោមត្រីទាំងអស់ ហើយអាចស្គាល់ខ្លួនឯងនៅក្នុងកញ្ចក់ — ជាសញ្ញានៃភាពឆ្លាតវៃខ្ពស់។",
    cardTint: TINTS[6], class: "Fish" },
  { key: "siamese_fighting_fish", nameEn: "Siamese Fighting Fish", nameKh: "ត្រីក្រឹម", emoji: "🐟",
    factEn: "Native to Southeast Asia, this fish can breathe air directly from the surface using a special organ, so it survives in low-oxygen water.",
    factKh: "មានដើមកំណើតនៅអាស៊ីអាគ្នេយ៍ ត្រីនេះអាចដកដង្ហើមខ្យល់ផ្ទាល់ពីលើផ្ទៃទឹកដោយប្រើសរីរាង្គពិសេស ដូច្នេះវារស់នៅបានក្នុងទឹកដែលមានអុកស៊ីសែនតិច។",
    cardTint: TINTS[1], class: "Fish" },

  // Amphibians · សត្វថលជលិក
  { key: "poison_dart_frog", nameEn: "Poison Dart Frog", nameKh: "កង្កែបពុល", emoji: "🐸",
    factEn: "They don't drink water through their mouths; they absorb it entirely through their skin. Because their skin is so porous, they are highly sensitive to pollution.",
    factKh: "ពួកវាមិនផឹកទឹកតាមមាត់ទេ ពួកវាស្រូបយកទឹកទាំងស្រុងតាមរយៈស្បែក។ ដោយសារស្បែករបស់ពួកវាមានរន្ធតូចៗច្រើន ពួកវាងាយរងគ្រោះខ្លាំងដោយសារការបំពុល។",
    cardTint: TINTS[2], class: "Amphibian" },
  { key: "axolotl",        nameEn: "Axolotl",         nameKh: "សត្វអាក់សូឡូទល",    emoji: "🦎",
    factEn: "The axolotl can regrow lost legs, parts of its heart, and even pieces of its brain — scientists study it to learn how to heal humans.",
    factKh: "សត្វអាក់សូឡូទលអាចដុះជើងដែលបាត់ ផ្នែកនៃបេះដូង និងសូម្បីតែផ្នែកនៃខួរក្បាលរបស់វាមកវិញ — អ្នកវិទ្យាសាស្ត្រសិក្សាវាដើម្បីរៀនពីរបៀបព្យាបាលមនុស្ស។",
    cardTint: TINTS[5], class: "Amphibian" },
  { key: "goliath_frog",   nameEn: "Goliath Frog",    nameKh: "កង្កែបយក្ស",          emoji: "🐸",
    factEn: "The world's largest frog can grow as big as a house cat and weigh over 3 kilograms. It builds little ponds out of stones for its eggs.",
    factKh: "កង្កែបធំជាងគេបំផុតនៅលើពិភពលោកអាចលូតលាស់ធំស្មើនឹងឆ្មាក្នុងផ្ទះ និងមានទម្ងន់ជាង ៣ គីឡូក្រាម។ វាសាងសង់ស្រះតូចៗធ្វើពីដុំថ្មសម្រាប់ដាក់ពងរបស់វា។",
    cardTint: TINTS[3], class: "Amphibian" },
  { key: "salamander",     nameEn: "Fire Salamander", nameKh: "សាឡាម៉ង់ឌ្រាភ្លើង",  emoji: "🦎",
    factEn: "Its bright yellow-and-black skin is a warning: it secretes a poison strong enough to harm any predator that tries to bite it.",
    factKh: "ស្បែកពណ៌លឿង និងខ្មៅភ្លឺរបស់វាជាការព្រមាន៖ វាបញ្ចេញជាតិពុលខ្លាំងគ្រប់គ្រាន់ដើម្បីបង្កគ្រោះថ្នាក់ដល់សត្វរំពាដែលព្យាយាមខាំវា។",
    cardTint: TINTS[4], class: "Amphibian" },
  { key: "asian_toad",     nameEn: "Asian Common Toad", nameKh: "គីង្គក់", emoji: "🐸",
    factEn: "Common across Cambodia, this toad eats huge numbers of mosquitoes and crop pests every night, helping farmers protect their rice.",
    factKh: "ឃើញជាទូទៅនៅទូទាំងប្រទេសកម្ពុជា គីង្គក់នេះស៊ីមូស និងសត្វល្អិតបំផ្លាញដំណាំចំនួនច្រើនរាល់យប់ ជួយកសិករការពារស្រូវរបស់ពួកគាត់។",
    cardTint: TINTS[3], class: "Amphibian" },
  { key: "caecilian",      nameEn: "Caecilian",       nameKh: "ដង្កូវកង្កែប",        emoji: "🪱",
    factEn: "Caecilians look like worms but are actually amphibians without legs. Their babies eat their mother's skin, which regrows in just a few days.",
    factKh: "ដង្កូវកង្កែបមើលទៅដូចជាដង្កូវ ប៉ុន្តែតាមពិតជាសត្វថលជលិកគ្មានជើង។ កូនរបស់វាស៊ីស្បែកម្ដាយរបស់ពួកវា ដែលដុះមកវិញក្នុងរយៈពេលត្រឹមតែប៉ុន្មានថ្ងៃប៉ុណ្ណោះ។",
    cardTint: TINTS[7], class: "Amphibian" },

  // Reptiles · សត្វល្មូន
  { key: "king_cobra",     nameEn: "King Cobra",      nameKh: "ពស់វែករនាម",          emoji: "🐍",
    factEn: "It is the longest venomous snake in the world, capable of 'standing up' and looking a full-grown human directly in the eye.",
    factKh: "វាគឺជាពស់មានពិសវែងជាងគេបំផុតនៅលើពិភពលោក ដែលអាច 'បញ្ឈរខ្លួន' និងសម្លឹងមើលចំភ្នែកមនុស្សពេញវ័យបាន។",
    cardTint: TINTS[2], class: "Reptile" },
  { key: "komodo_dragon",  nameEn: "Komodo Dragon",   nameKh: "នាគកូម៉ូដូ",           emoji: "🦎",
    factEn: "The world's largest lizard has a deadly bite filled with venom and bacteria — even huge buffalo can't survive a single bite.",
    factKh: "ខ្ទុយធំជាងគេបំផុតនៅលើពិភពលោកមានការខាំដ៏សាហាវដែលពោរពេញដោយជាតិពិស និងបាក់តេរី — សូម្បីតែក្របីធំក៏មិនអាចរស់រានពីការខាំមួយដងបានដែរ។",
    cardTint: TINTS[3], class: "Reptile" },
  { key: "chameleon",      nameEn: "Chameleon",       nameKh: "ខ្ទុយបន្លែង",          emoji: "🦎",
    factEn: "Chameleons change color to show their mood — not to hide. Each of their eyes can also look in a different direction at the same time!",
    factKh: "ខ្ទុយបន្លែងផ្លាស់ប្ដូរពណ៌ដើម្បីបង្ហាញអារម្មណ៍របស់វា មិនមែនដើម្បីលាក់ខ្លួនទេ។ ភ្នែកនីមួយៗរបស់វាអាចមើលទៅទិសខុសៗគ្នាក្នុងពេលតែមួយ!",
    cardTint: TINTS[5], class: "Reptile" },
  { key: "leatherback_turtle", nameEn: "Leatherback Sea Turtle", nameKh: "អណ្ដើកសមុទ្រស្បែក", emoji: "🐢",
    factEn: "The largest sea turtle can dive over 1,000 meters deep — deeper than most submarines — and travels across entire oceans to lay its eggs.",
    factKh: "អណ្ដើកសមុទ្រធំជាងគេបំផុតអាចមុជដល់ជម្រៅជាង ១០០០ ម៉ែត្រ — ជ្រៅជាងនាវាមុជទឹកភាគច្រើន — ហើយធ្វើដំណើរឆ្លងកាត់មហាសមុទ្រទាំងមូលដើម្បីដាក់ពង។",
    cardTint: TINTS[6], class: "Reptile" },
  { key: "tokay_gecko",    nameEn: "Tokay Gecko",     nameKh: "តុកកែ",                emoji: "🦎",
    factEn: "Famous in Cambodia for its loud 'tokay-tokay' call at night, this gecko has tiny hairs on its toes that let it walk upside down on ceilings.",
    factKh: "ល្បីនៅប្រទេសកម្ពុជាដោយសារសំឡេងស្រែក 'តុកកែ-តុកកែ' ខ្លាំងៗនៅពេលយប់ តុកកែនេះមានរោមតូចៗនៅលើម្រាមជើង ដែលអនុញ្ញាតឱ្យវាដើរបញ្ច្រាសនៅលើពិដាន។",
    cardTint: TINTS[1], class: "Reptile" },
  { key: "galapagos_tortoise", nameEn: "Galápagos Tortoise", nameKh: "អណ្ដើកបកគាឡាប៉ាហ្គោស", emoji: "🐢",
    factEn: "These giant tortoises can live more than 150 years — the longest-living vertebrate on land — and can survive a whole year without food or water.",
    factKh: "អណ្ដើកយក្សទាំងនេះអាចរស់នៅជាង ១៥០ ឆ្នាំ — សត្វមានឆ្អឹងកងរស់នៅយូរជាងគេនៅលើគោក — និងអាចរស់រានបានពេញមួយឆ្នាំដោយគ្មានអាហារ ឬទឹក។",
    cardTint: TINTS[3], class: "Reptile" },

  // Birds · សត្វបក្សី
  { key: "peregrine_falcon", nameEn: "Peregrine Falcon", nameKh: "សត្វស្ទាំង", emoji: "🦅",
    factEn: "It is the fastest animal on the planet. When it dives to catch prey, it can reach speeds of over 380 kilometers per hour!",
    factKh: "វាគឺជាសត្វដែលលឿនបំផុតនៅលើភពផែនដី។ នៅពេលដែលវាហោះចុះមកឆក់យកចំណី វាអាចឈានដល់ល្បឿនជាង ៣៨០ គីឡូម៉ែត្រក្នុងមួយម៉ោង!",
    cardTint: TINTS[4], class: "Bird" },
  { key: "bald_eagle",     nameEn: "Bald Eagle",      nameKh: "ឥន្ទ្រីក្បាលសរ",      emoji: "🦅",
    factEn: "A bald eagle's eyesight is four times sharper than a human's — it can spot a fish in the water from 3 kilometers away.",
    factKh: "គំហើញរបស់ឥន្ទ្រីក្បាលសរច្បាស់ជាងមនុស្សដល់បួនដង — វាអាចសម្គាល់ឃើញត្រីក្នុងទឹកពីចម្ងាយ ៣ គីឡូម៉ែត្រ។",
    cardTint: TINTS[3], class: "Bird" },
  { key: "hummingbird",    nameEn: "Hummingbird",     nameKh: "សត្វសុំបុក",            emoji: "🐦",
    factEn: "It is the only bird that can fly backwards and hover in place. Its tiny heart beats over 1,200 times per minute!",
    factKh: "វាគឺជាសត្វស្លាបតែមួយគត់ដែលអាចហោះថយក្រោយ និងឈរនឹងនៅលើអាកាស។ បេះដូងតូចរបស់វាលោតលើសពី ១២០០ ដងក្នុងមួយនាទី!",
    cardTint: TINTS[5], class: "Bird" },
  { key: "ostrich",        nameEn: "Ostrich",         nameKh: "សត្វអូទ្រុស",          emoji: "🦤",
    factEn: "The world's largest bird cannot fly, but it can run at 70 km/h and its egg is the biggest single cell on Earth.",
    factKh: "សត្វស្លាបធំជាងគេបំផុតនៅលើពិភពលោកមិនអាចហោះបានទេ ប៉ុន្តែវាអាចរត់ក្នុងល្បឿន ៧០ គីឡូម៉ែត្រ/ម៉ោង ហើយពងរបស់វាគឺជាកោសិកាតែមួយធំជាងគេបំផុតនៅលើផែនដី។",
    cardTint: TINTS[1], class: "Bird" },
  { key: "owl",            nameEn: "Snowy Owl",       nameKh: "មៀមទឹកកក",             emoji: "🦉",
    factEn: "Owls cannot move their eyes, so instead they can turn their heads almost all the way around — about 270 degrees — to look behind them.",
    factKh: "មៀមមិនអាចចលនាភ្នែកបានទេ ដូច្នេះជំនួសវិញ ពួកវាអាចបង្វិលក្បាលជិតពេញមួយរង្វង់ — ប្រហែល ២៧០ ដឺក្រេ — ដើម្បីមើលទៅខាងក្រោយ។",
    cardTint: TINTS[6], class: "Bird" },
  { key: "hornbill",       nameEn: "Great Hornbill",  nameKh: "សត្វកុក",              emoji: "🦜",
    factEn: "Found in Cambodian forests, the hornbill seals its mate inside a tree hollow with mud, leaving only a tiny slit to feed her while she raises chicks.",
    factKh: "រកឃើញនៅក្នុងព្រៃកម្ពុជា សត្វកុកបិទដៃគូញីរបស់វានៅក្នុងប្រហោងដើមឈើដោយដី ដោយបន្សល់ទុកតែប្រហោងតូចមួយដើម្បីផ្ដល់ចំណីដល់នាង ខណៈនាងកំពុងចិញ្ចឹមកូន។",
    cardTint: TINTS[2], class: "Bird" },
  { key: "flamingo",       nameEn: "Flamingo",        nameKh: "សត្វផ្លាមីងហ្គោ",     emoji: "🦩",
    factEn: "Flamingos are not born pink — they turn pink from eating tiny shrimp and algae. They often stand on one leg to save body heat.",
    factKh: "សត្វផ្លាមីងហ្គោមិនកើតមកមានពណ៌ផ្កាឈូកទេ — ពួកវាប្រែទៅជាពណ៌ផ្កាឈូកដោយសារស៊ីបង្កងតូចៗ និងសារាយ។ ពួកវាជាញឹកញាប់ឈរលើជើងតែមួយដើម្បីសន្សំកំដៅខ្លួន។",
    cardTint: TINTS[5], class: "Bird" },

  /* ─── INVERTEBRATES · សត្វគ្មានឆ្អឹងកង · 30 species ─────────────── */

  // Insects · សត្វល្អិត
  { key: "honey_bee",       nameEn: "Honey Bee",        nameKh: "សត្វឃ្មុំ",            emoji: "🐝",
    factEn: "Bees are the world's most important pollinators. One out of every three bites of food we eat depends on them!",
    factKh: "សត្វឃ្មុំគឺជាអ្នកនាំលំអងដ៏សំខាន់បំផុតនៅលើពិភពលោក។ អាហារមួយម៉ាត់ក្នុងចំណោមអាហារបីម៉ាត់ដែលយើងញ៉ាំគឺអាស្រ័យលើពួកវា!",
    cardTint: TINTS[1], class: "Insect" },
  { key: "monarch_butterfly", nameEn: "Monarch Butterfly", nameKh: "មេអំបៅម៉ូណាក", emoji: "🦋",
    factEn: "Each year monarchs migrate up to 4,000 km — farther than any other insect on Earth.",
    factKh: "ជារៀងរាល់ឆ្នាំ មេអំបៅម៉ូណាកធ្វើដំណើរផ្លាស់លំនៅរហូតដល់ ៤០០០ គីឡូម៉ែត្រ — ឆ្ងាយជាងសត្វល្អិតផ្សេងទៀតលើផែនដី។",
    cardTint: TINTS[5], class: "Insect" },
  { key: "stag_beetle",     nameEn: "Stag Beetle",      nameKh: "កន្ទួងស្នែង",         emoji: "🪲",
    factEn: "Beetles are the largest group of animals on Earth — about one in every four animal species is a beetle.",
    factKh: "កន្ទួងគឺជាក្រុមសត្វធំជាងគេនៅលើផែនដី — សត្វប្រហែលមួយប្រភេទក្នុងចំណោមបួន គឺជាកន្ទួង។",
    cardTint: TINTS[3], class: "Insect" },
  { key: "leafcutter_ant",  nameEn: "Leaf-cutter Ant",  nameKh: "ស្រមោចកាត់ស្លឹក",     emoji: "🐜",
    factEn: "They don't eat the leaves — they grow underground gardens of fungus on them, and eat the fungus.",
    factKh: "ពួកវាមិនស៊ីស្លឹកឈើទេ — ពួកវាដាំសួនផ្សិតនៅក្រោមដីលើស្លឹកឈើ ហើយស៊ីផ្សិតវិញ។",
    cardTint: TINTS[2], class: "Insect" },
  { key: "dragonfly",       nameEn: "Dragonfly",        nameKh: "កន្ទុយតោ",            emoji: "🪰",
    factEn: "Dragonflies catch their prey in the air with a 95% success rate — better than any other hunter on the planet.",
    factKh: "កន្ទុយតោចាប់ចំណីរបស់វានៅក្នុងអាកាសដោយជោគជ័យ ៩៥% — ល្អជាងអ្នកប្រមាញ់ដទៃទៀតនៅលើភពផែនដី។",
    cardTint: TINTS[6], class: "Insect" },
  { key: "praying_mantis",  nameEn: "Praying Mantis",   nameKh: "ប៉ូមព្រះ",              emoji: "🦗",
    factEn: "The praying mantis is the only insect that can turn its head 180° to look behind itself.",
    factKh: "ប៉ូមព្រះ គឺជាសត្វល្អិតតែមួយគត់ដែលអាចបង្វិលក្បាលបាន ១៨០° ដើម្បីក្រឡេកមើលក្រោយខ្លួន។",
    cardTint: TINTS[2], class: "Insect" },
  { key: "firefly",         nameEn: "Firefly",          nameKh: "សត្វអំពិលអំពែក",      emoji: "✨",
    factEn: "Fireflies make cold light in their bellies — 100% of the energy becomes light, with no heat wasted.",
    factKh: "សត្វអំពិលអំពែកបង្កើតពន្លឺត្រជាក់នៅក្នុងពោះរបស់ពួកវា — ថាមពល ១០០% ប្រែទៅជាពន្លឺ ដោយគ្មានកំដៅខ្ជះខ្ជាយ។",
    cardTint: TINTS[4], class: "Insect" },
  { key: "ladybug",         nameEn: "Ladybug",          nameKh: "កន្ទួងពណ៌ក្រហម",      emoji: "🐞",
    factEn: "A single ladybug can eat more than 5,000 plant-eating aphids in its lifetime, protecting farmers' crops.",
    factKh: "កន្ទួងពណ៌ក្រហមមួយក្បាលអាចស៊ីសត្វល្អិតបំផ្លាញដំណាំជាង ៥០០០ ក្នុងអាយុជីវិតរបស់វា ការពារដំណាំរបស់កសិករ។",
    cardTint: TINTS[5], class: "Insect" },
  { key: "cicada",          nameEn: "Cicada",           nameKh: "ទំពាស់",               emoji: "🦟",
    factEn: "Some cicadas live underground for 17 years before climbing up to sing for just a few weeks.",
    factKh: "ទំពាស់ខ្លះរស់នៅក្រោមដីដល់ ១៧ ឆ្នាំ មុនពេលឡើងលើដើម្បីស្រែកច្រៀងតែប៉ុន្មានសប្ដាហ៍។",
    cardTint: TINTS[7], class: "Insect" },
  { key: "termite",         nameEn: "Termite",          nameKh: "កណ្ដៀរ",               emoji: "🐛",
    factEn: "Termites build mounds with natural air-conditioning — engineers in Africa have copied the design for buildings.",
    factKh: "កណ្ដៀរសាងសង់សំបុករបស់វាជាមួយម៉ាស៊ីនត្រជាក់ធម្មជាតិ — វិស្វករនៅអាហ្វ្រិកបានចម្លងប្លង់នេះសម្រាប់សាងសង់អគារ។",
    cardTint: TINTS[3], class: "Insect" },

  // Mollusks · សត្វពួកខ្យង
  { key: "octopus",         nameEn: "Octopus",          nameKh: "មឹកយក្ស",              emoji: "🐙",
    factEn: "An octopus has three hearts, blue blood, and a brain that is distributed throughout its eight arms.",
    factKh: "មឹកយក្សមានបេះដូងបី ឈាមពណ៌ខៀវ និងខួរក្បាលដែលចែកចាយពាសពេញដៃទាំងប្រាំបីរបស់វា។",
    cardTint: TINTS[6], class: "Mollusk" },
  { key: "giant_squid",     nameEn: "Giant Squid",      nameKh: "មឹកព្រលឹង",            emoji: "🦑",
    factEn: "Giant squid have the largest eyes in the animal kingdom — the size of a soccer ball — to spot predators in the dark deep sea.",
    factKh: "មឹកព្រលឹងមានភ្នែកធំជាងគេក្នុងពិភពសត្វ — ធំស្មើនឹងបាល់ទាត់ — ដើម្បីសម្គាល់ឃើញសត្វរំពានៅសមុទ្រជ្រៅងងឹត។",
    cardTint: TINTS[6], class: "Mollusk" },
  { key: "garden_snail",    nameEn: "Garden Snail",     nameKh: "ខ្យងសួន",              emoji: "🐌",
    factEn: "A snail's shell grows with it for life. If the shell breaks, the snail can slowly repair it on its own.",
    factKh: "សំបករបស់ខ្យងលូតលាស់ជាមួយវាពេញមួយជីវិត។ បើសំបកបាក់ ខ្យងអាចជួសជុលវាយ៉ាងយឺតៗដោយខ្លួនឯង។",
    cardTint: TINTS[2], class: "Mollusk" },
  { key: "nautilus",        nameEn: "Nautilus",         nameKh: "ខ្យងណូទីលូស",          emoji: "🐚",
    factEn: "Nautiluses are 'living fossils' — their spiral shell design has barely changed in 500 million years.",
    factKh: "ខ្យងណូទីលូសគឺជា 'បាតុភូតរស់' — រូបរាងសំបកវង់របស់វាស្ទើរតែមិនមានការផ្លាស់ប្ដូរអស់រយៈពេល ៥០០ លានឆ្នាំ។",
    cardTint: TINTS[6], class: "Mollusk" },
  { key: "nudibranch",      nameEn: "Sea Slug (Nudibranch)", nameKh: "ខ្យងសមុទ្រឥតស្នូក", emoji: "🪸",
    factEn: "Sea slugs are the rainbow of the ocean — they steal toxins from their food to make themselves poisonous to predators.",
    factKh: "ខ្យងសមុទ្រគឺជាឥន្ទធនូនៃមហាសមុទ្រ — ពួកវាលួចជាតិពុលពីចំណីរបស់វាដើម្បីធ្វើខ្លួនមានជាតិពុលប្រឆាំងសត្វរំពា។",
    cardTint: TINTS[5], class: "Mollusk" },

  // Crustaceans · សត្វពួកបង្កង
  { key: "mantis_shrimp",   nameEn: "Mantis Shrimp",    nameKh: "បង្កៀបសេះ",            emoji: "🦐",
    factEn: "They can punch with the speed of a bullet, creating a shockwave underwater that boils the water around their strike.",
    factKh: "ពួកវាអាចដាល់ក្នុងល្បឿនស្មើនឹងគ្រាប់កាំភ្លើង ដែលបង្កើតជារលកសង្កត់នៅក្រោមទឹកដែលធ្វើឱ្យទឹកនៅជុំវិញកន្លែងដែលពួកវាវាយនោះពុះ។",
    cardTint: TINTS[4], class: "Crustacean" },
  { key: "coconut_crab",    nameEn: "Coconut Crab",     nameKh: "ក្ដាមដូង",              emoji: "🦀",
    factEn: "The coconut crab is the world's largest land arthropod and is strong enough to crack open a coconut with its claws.",
    factKh: "ក្ដាមដូងគឺជាសត្វមានសន្ធាក់រស់នៅលើគោកធំជាងគេបំផុតក្នុងពិភពលោក ហើយរឹងមាំគ្រប់គ្រាន់ដើម្បីបំបែកដូងដោយប្រើដង្កៀបរបស់វា។",
    cardTint: TINTS[5], class: "Crustacean" },
  { key: "lobster",         nameEn: "Lobster",          nameKh: "បង្កងសមុទ្រ",          emoji: "🦞",
    factEn: "Lobsters never really stop growing and can live for over 100 years if they avoid predators and traps.",
    factKh: "បង្កងសមុទ្រមិនដែលឈប់លូតលាស់ទេ ហើយអាចរស់នៅជាង ១០០ ឆ្នាំ បើពួកវាគេចផុតពីសត្វរំពា និងអន្ទាក់។",
    cardTint: TINTS[5], class: "Crustacean" },
  { key: "hermit_crab",     nameEn: "Hermit Crab",      nameKh: "ក្ដាមសំបក",            emoji: "🦀",
    factEn: "Hermit crabs borrow empty shells from snails for protection. When they grow too big, they line up by size and trade shells.",
    factKh: "ក្ដាមសំបកខ្ចីសំបកទំនេររបស់ខ្យងសម្រាប់ការពារខ្លួន។ ពេលពួកវាធំពេក ពួកវាតម្រៀបជួរតាមទំហំ ហើយផ្លាស់ប្ដូរសំបកគ្នា។",
    cardTint: TINTS[1], class: "Crustacean" },
  { key: "krill",           nameEn: "Krill",            nameKh: "បង្កងតូចគ្រឹល",       emoji: "🦐",
    factEn: "Krill are tiny, but together they form the largest animal mass on Earth and feed the giant blue whales of the ocean.",
    factKh: "បង្កងតូចគ្រឹលមានរូបតូច ប៉ុន្តែរួមគ្នាពួកវាបង្កើតជាម៉ាស្សសត្វធំជាងគេនៅលើផែនដី ហើយជាចំណីរបស់ត្រីបាឡែនខៀវយក្សក្នុងមហាសមុទ្រ។",
    cardTint: TINTS[6], class: "Crustacean" },

  // Arachnids · សត្វពីងពាង
  { key: "jumping_spider",  nameEn: "Jumping Spider",   nameKh: "ពីងពាងលោត",           emoji: "🕷️",
    factEn: "They have excellent vision with four pairs of eyes and can jump up to 50 times their own body length to catch prey.",
    factKh: "ពួកវាមានគំហើញច្បាស់ល្អជាមួយនឹងភ្នែកបួនគូ ហើយអាចលោតបានចម្ងាយឆ្ងាយជាងប្រវែងដងខ្លួនរបស់ពួកវាដល់ទៅ ៥០ ដងដើម្បីចាប់ចំណី។",
    cardTint: TINTS[3], class: "Arachnid" },
  { key: "tarantula",       nameEn: "Tarantula",        nameKh: "ពីងពាងតារ៉ានទូឡា",   emoji: "🕸️",
    factEn: "Tarantulas can live more than 25 years, and instead of biting they often flick tiny itchy hairs at attackers.",
    factKh: "ពីងពាងតារ៉ានទូឡាអាចរស់ជាង ២៥ ឆ្នាំ ហើយជំនួសឱ្យការខាំ ពួកវាជាញឹកញាប់បាញ់រោមតូចៗដែលរមាស់ទៅលើអ្នកវាយប្រហារ។",
    cardTint: TINTS[3], class: "Arachnid" },
  { key: "emperor_scorpion", nameEn: "Emperor Scorpion", nameKh: "ខ្ទួយអធិរាជ",         emoji: "🦂",
    factEn: "All scorpions glow bright blue-green under ultraviolet light — even fossils 300 million years old still shine.",
    factKh: "ខ្ទួយទាំងអស់ភ្លឺពណ៌ខៀវ-បៃតងភ្លឺក្រោមពន្លឺអ៊ុលត្រាវីយូឡេ — សូម្បីតែបាតុភូតរស់អាយុ ៣០០ លានឆ្នាំក៏នៅតែភ្លឺដែរ។",
    cardTint: TINTS[7], class: "Arachnid" },
  { key: "black_widow",     nameEn: "Black Widow Spider", nameKh: "ពីងពាងមេម៉ាយខ្មៅ", emoji: "🕷️",
    factEn: "Drop for drop, black widow venom is 15 times stronger than a rattlesnake's, but the spider injects only a tiny amount.",
    factKh: "តំណក់ត្រូវនឹងតំណក់ ពិសរបស់ពីងពាងមេម៉ាយខ្មៅខ្លាំងជាងពិសពស់វែកដល់ទៅ ១៥ ដង ប៉ុន្តែពីងពាងបាញ់ចូលតែបរិមាណតិចប៉ុណ្ណោះ។",
    cardTint: TINTS[3], class: "Arachnid" },

  // Cnidarians · សត្វខ្ទាម
  { key: "box_jellyfish",   nameEn: "Box Jellyfish",    nameKh: "សត្វខ្ទាមប្រអប់",      emoji: "🪼",
    factEn: "The box jellyfish has 24 eyes and is one of the most venomous animals on Earth — yet it has no brain at all.",
    factKh: "សត្វខ្ទាមប្រអប់មានភ្នែក ២៤ ហើយជាសត្វមានជាតិពុលខ្លាំងបំផុតមួយនៅលើផែនដី — តែវាមិនមានខួរក្បាលសោះ។",
    cardTint: TINTS[6], class: "Cnidarian" },
  { key: "moon_jellyfish",  nameEn: "Moon Jellyfish",   nameKh: "សត្វខ្ទាមព្រះច័ន្ទ",  emoji: "🌙",
    factEn: "Moon jellyfish are 95% water and have no heart, no bones, and no brain — just a simple nerve net.",
    factKh: "សត្វខ្ទាមព្រះច័ន្ទផ្សំឡើងពីទឹក ៩៥% ហើយគ្មានបេះដូង គ្មានឆ្អឹង និងគ្មានខួរក្បាល — មានតែបណ្ដាញសរសៃប្រសាទសាមញ្ញ។",
    cardTint: TINTS[6], class: "Cnidarian" },
  { key: "sea_anemone",     nameEn: "Sea Anemone",      nameKh: "ផ្កាសមុទ្រ",            emoji: "🌸",
    factEn: "Sea anemones look like flowers but are actually hungry animals — clownfish hide inside their stinging tentacles for safety.",
    factKh: "ផ្កាសមុទ្រមើលទៅដូចផ្កា ប៉ុន្តែពិតជាសត្វស្រេកឃ្លាន — ត្រីកំប្លែង (ត្រីនេម៉ូ) លាក់ខ្លួននៅខាងក្នុងក្រលៀនជាតិចាក់របស់ពួកវាដើម្បីសុវត្ថិភាព។",
    cardTint: TINTS[5], class: "Cnidarian" },

  // Annelids · ដង្កូវ
  { key: "earthworm",       nameEn: "Earthworm",        nameKh: "ដង្កូវដី",             emoji: "🪱",
    factEn: "Earthworms are silent farmers — they swallow soil, digest it, and leave behind richer earth that helps plants grow.",
    factKh: "ដង្កូវដីគឺជាកសិករស្ងាត់ៗ — ពួកវាលេបដី រំលាយវា ហើយទុកដីដែលមានជីជាតិច្រើនជាងមុនដែលជួយឱ្យរុក្ខជាតិលូតលាស់។",
    cardTint: TINTS[3], class: "Annelid" },

  // Chilopoda · សត្វក្អែប
  { key: "giant_centipede", nameEn: "Giant Centipede",  nameKh: "ក្អែប",                emoji: "🐛",
    factEn: "Despite the name 'centipede' meaning 100 legs, they always have an odd number of leg pairs, so they never have exactly 100 legs.",
    factKh: "ទោះបីជាឈ្មោះ 'ក្អែប' (centipede) មានន័យថាជើង ១០០ ក៏ដោយ ក៏ពួកវាតែងតែមានចំនួនគូជើងសេស ដូច្នេះពួកវាមិនដែលមានជើង ១០០ គត់នោះទេ។",
    cardTint: TINTS[7], class: "Chilopoda" },

  // Echinoderms · សត្វសមុទ្របន្លា
  { key: "starfish",        nameEn: "Starfish",         nameKh: "ផ្កាយសមុទ្រ",          emoji: "⭐",
    factEn: "If a starfish loses an arm, it can grow it back — and from a single arm a brand-new starfish can sometimes regrow.",
    factKh: "បើផ្កាយសមុទ្របាត់ដៃមួយ វាអាចដុះវាមកវិញ — ហើយពីដៃតែមួយ ពេលខ្លះផ្កាយសមុទ្រថ្មីទាំងស្រុងអាចលូតលាស់ឡើងវិញបាន។",
    cardTint: TINTS[4], class: "Echinoderm" },

  /* ─── REGION: AUSTRALIA · តំបន់៖ អូស្ត្រាលី ─── */
  /* Marsupials and unique animals from the Land Down Under. */

  // Mammals · ថនិកសត្វ  (Koala already included above with region tag.)
  { key: "kangaroo",        nameEn: "Kangaroo",         nameKh: "កង់ហ្គូរូ",            emoji: "🦘",
    factEn: "A kangaroo cannot walk backwards, and they use their heavy tail as a fifth leg for balance.",
    factKh: "កង់ហ្គូរូមិនអាចដើរថយក្រោយបានទេ ហើយពួកវាប្រើកន្ទុយធ្ងន់របស់វាជាជើងទីប្រាំសម្រាប់ការទ្រនាប់។",
    cardTint: TINTS[5], class: "Mammal", region: "Australia" },
  { key: "wombat",          nameEn: "Wombat",           nameKh: "វ៉ុមបាត",              emoji: "🐻",
    factEn: "Wombats produce cube-shaped poop to stop it from rolling away off rocks, so they can use it to mark their territory.",
    factKh: "សត្វវ៉ុមបាតបញ្ចេញលាមកមានរូបរាងជាគូប ដើម្បីការពារកុំឱ្យវារំកិលធ្លាក់ពីលើថ្ម ដូច្នេះពួកវាអាចប្រើវាសម្រាប់សម្គាល់ដែនកំណើតរបស់ខ្លួន។",
    cardTint: TINTS[3], class: "Mammal", region: "Australia" },
  { key: "tasmanian_devil", nameEn: "Tasmanian Devil",  nameKh: "បិសាចតាសម៉ានី",        emoji: "😈",
    factEn: "They have one of the strongest bites per body mass of any land predator on Earth.",
    factKh: "ពួកវាមានកម្លាំងខាំខ្លាំងបំផុតមួយធៀបនឹងទម្ងន់រាងកាយ ក្នុងចំណោមសត្វរំពាលើគោកទាំងអស់នៅលើផែនដី។",
    cardTint: TINTS[7], class: "Mammal", region: "Australia" },
  { key: "quokka",          nameEn: "Quokka",           nameKh: "ក្វូកា",               emoji: "🐹",
    factEn: "Known as the 'happiest animal in the world' because their face looks like it is permanently smiling.",
    factKh: "ត្រូវបានគេស្គាល់ថាជា 'សត្វរីករាយបំផុតនៅលើពិភពលោក' ព្រោះមុខរបស់វាមើលទៅដូចជាញញឹមជានិច្ច។",
    cardTint: TINTS[4], class: "Mammal", region: "Australia" },
  { key: "wallaby",         nameEn: "Wallaby",          nameKh: "វ៉ាឡាប៊ី",             emoji: "🦘",
    factEn: "Wallabies are essentially miniature kangaroos, adapted to live in more rugged, rocky terrain.",
    factKh: "សត្វវ៉ាឡាប៊ីសំខាន់ៗគឺជាកង់ហ្គូរូខ្នាតតូច ដែលបានសម្របខ្លួនរស់នៅក្នុងតំបន់ដ៏រដិបរដុបនិងមានថ្មច្រើន។",
    cardTint: TINTS[5], class: "Mammal", region: "Australia" },
  { key: "bilby",           nameEn: "Bilby",            nameKh: "ប៊ីលប៊ី",              emoji: "🐰",
    factEn: "They are desert-dwelling marsupials with rabbit-like ears that help release body heat to keep them cool.",
    factKh: "ពួកវាជាសត្វបំបៅកូនដោយដាក់ក្នុងថង់ ដែលរស់នៅវាលខ្សាច់ ហើយមានត្រចៀកដូចទន្សាយ ដែលជួយបញ្ចេញកំដៅរាងកាយ ដើម្បីរក្សាខ្លួនឱ្យត្រជាក់។",
    cardTint: TINTS[1], class: "Mammal", region: "Australia" },

  // Birds · សត្វស្លាប
  { key: "emu",             nameEn: "Emu",              nameKh: "សត្វអេមូ",             emoji: "🦃",
    factEn: "Emus are the second-tallest birds on Earth — they cannot fly, but they can sprint at 50 km/h!",
    factKh: "សត្វអេមូជាបក្សីខ្ពស់ជាងគេទីពីរនៅលើផែនដី — ពួកវាមិនអាចហោះបានទេ ប៉ុន្តែពួកវាអាចរត់លឿនរហូតដល់ ៥០ គីឡូម៉ែត្រក្នុងមួយម៉ោង!",
    cardTint: TINTS[3], class: "Bird", region: "Australia" },
  { key: "cassowary",       nameEn: "Cassowary",        nameKh: "សត្វកាសូវារី",          emoji: "🦤",
    factEn: "Often called the world's most dangerous bird, they have a dinosaur-like helmet on their head and dagger-like claws.",
    factKh: "ច្រើនតែត្រូវបានគេហៅថាជាបក្សីដ៏គ្រោះថ្នាក់បំផុតនៅលើពិភពលោក ពួកវាមានមួកកំបោរលើក្បាលដូចដាយណូស័រ និងក្រចកដូចកាំបិត។",
    cardTint: TINTS[0], class: "Bird", region: "Australia" },
  { key: "kookaburra",      nameEn: "Kookaburra",       nameKh: "គូកាប៊ូរ៉ា",            emoji: "🦜",
    factEn: "Their call sounds exactly like loud, echoing human laughter.",
    factKh: "សំឡេងហៅរបស់ពួកវាស្តាប់ទៅដូចសំណើចមនុស្សដែលលឺខ្លាំងនិងបន្លឺឡើងវិញយ៉ាងពិតប្រាកដ។",
    cardTint: TINTS[2], class: "Bird", region: "Australia" },

  // Reptiles · សត្វលូន
  { key: "frilled_neck_lizard", nameEn: "Frilled-neck Lizard", nameKh: "បង្គួយកពន្លា",   emoji: "🦎",
    factEn: "When threatened, it opens its mouth wide and flares out a massive umbrella of skin around its neck to look terrifying!",
    factKh: "ពេលត្រូវបានគំរាមកំហែង វាបើកមាត់ធំៗ ហើយផ្ទុះស្បែកដ៏ធំសម្បើមដូចឆ័ត្រនៅជុំវិញកររបស់វា ដើម្បីមើលទៅគួរឱ្យខ្លាច!",
    cardTint: TINTS[7], class: "Reptile", region: "Australia" },
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
    if (activeFilter.startsWith("region:")) {
      const region = activeFilter.slice("region:".length) as Region;
      return ANIMALS.filter((a) => a.region === region);
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
    counts["region:Australia"] = ANIMALS.filter((a) => a.region === "Australia").length;
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
    invertebrateKh: "សត្វគ្មានឆ្អឹងកង",
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
              const isRegion = pill.key.startsWith("region:");

              // Color-coded by branch — sky for vertebrates, mint for invertebrates,
              // amber for "All", rose for region pills, neutral for class chips.
              const activeClass = isVert
                ? "bg-sky-600 text-white border-sky-700"
                : isInvert
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : isRegion
                    ? "bg-rose-600 text-white border-rose-700"
                    : pill.key === "all"
                      ? "bg-amber-500 text-white border-amber-600"
                      : "bg-emerald-700 text-white border-emerald-800";

              const idleClass = empty
                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                : isVert
                  ? "bg-white text-sky-900 border-sky-300 hover:bg-sky-50 hover:border-sky-500"
                  : isInvert
                    ? "bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-500"
                    : isRegion
                      ? "bg-white text-rose-900 border-rose-300 hover:bg-rose-50 hover:border-rose-500"
                      : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400";

              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => { if (!empty) setActiveFilter(pill.key); }}
                  disabled={empty && !active}
                  aria-pressed={active}
                  aria-label={`${isKh ? pill.kh : pill.en} (${count})`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs sm:text-sm font-bold transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${active ? activeClass : idleClass} ${isPhylum || isRegion ? "ring-1 ring-inset" : ""}`}
                  data-testid={`filter-pill-${pill.key.replace(":", "-")}`}
                  data-active={active ? "true" : "false"}
                >
                  {isVert   && <SpineIcon className="w-3.5 h-3.5" />}
                  {isInvert && <Bug className="w-3.5 h-3.5" />}
                  {isRegion && <MapPin className="w-3.5 h-3.5" />}
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
