import { useEffect, useMemo, useState } from "react";
import { Volume2, Trees, Sparkles, Search, RotateCcw, X } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import {
  speakText,
  loadVoicesAsync,
  type SpeakLang,
} from "@/lib/speech";

type Tint = { bg: string; border: string; accent: string };

type Animal = {
  key: string;
  nameEn: string;
  nameKh: string;
  emoji: string;
  factEn: string;
  factKh: string;
  imageUrl?: string;
  cardTint: Tint;
};

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

const ANIMALS: Animal[] = [
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
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WildlifeExplorerPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [toast, setToast] = useState<string | null>(null);
  const [khmerVoiceReady, setKhmerVoiceReady] = useState<boolean>(true);
  const [flippedKey, setFlippedKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");

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

  // Promote-to-top search: matching cards rise to the top, the rest stay in
  // their original order below. Empty query → original order.
  const orderedAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ANIMALS;
    const matches: Animal[] = [];
    const rest: Animal[] = [];
    for (const a of ANIMALS) {
      const haystack = `${a.nameEn} ${a.nameKh} ${a.key}`.toLowerCase();
      if (haystack.includes(q)) matches.push(a); else rest.push(a);
    }
    return [...matches, ...rest];
  }, [query]);

  const matchCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    return ANIMALS.filter((a) =>
      `${a.nameEn} ${a.nameKh} ${a.key}`.toLowerCase().includes(q),
    ).length;
  }, [query]);

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

      {/* Flashcard grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
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
