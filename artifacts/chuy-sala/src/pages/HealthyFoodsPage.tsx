import { Link } from "wouter";
import { ArrowLeft, Apple, Carrot, Wheat, Drumstick, Sparkles } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────
 * FUEL YOUR BODY · HEALTHY FOODS
 * ផ្តល់ថាមពលដល់រាងកាយ៖ អាហារសុខភាព
 *
 * Audience: Cambodian primary-school kids (ESL learners)
 * Aesthetic: playful & vibrant — bright fruit colours (mango yellow,
 *            apple red, leafy green, milk-blue), bubbly rounded cards,
 *            big friendly emojis, rainbow banner, simple encouraging copy.
 *
 * Four food groups, each colour-coded:
 *   1. Fruits          (red / pink / yellow)
 *   2. Vegetables      (green / leafy)
 *   3. Energy Foods    (orange / wheat / amber)
 *   4. Proteins & Dairy(blue / cool / cream)
 * ────────────────────────────────────────────────────────────────────────── */

type Food = {
  id: string;
  emoji: string;
  nameEn: string;
  nameKh: string;
  /** The "superpower" — short, simple, encouraging benefit. */
  powerEn: string;
  powerKh: string;
  /** Short tag (vitamin/mineral) shown as a colourful chip. */
  tagEn: string;
  tagKh: string;
};

type FoodGroup = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  /** Emoji used in the section header alongside the icon. */
  emoji: string;
  titleEn: string;
  titleKh: string;
  blurbEn: string;
  blurbKh: string;
  /** Tailwind colour family used to colour the whole group. */
  color: "red" | "green" | "amber" | "blue";
  items: Food[];
};

/* ── The food data ─────────────────────────────────────────────────────── */

const FOOD_GROUPS: FoodGroup[] = [
  {
    id: "fruits",
    Icon: Apple,
    emoji: "🍎",
    color: "red",
    titleEn: "Fruits",
    titleKh: "ផ្លែឈើ",
    blurbEn:
      "Sweet, juicy, and full of vitamins. Fruits are nature's candy — they help your body fight off colds and give you quick get-up-and-go energy.",
    blurbKh:
      "ផ្អែម ឆ្ងាញ់ ហើយពោរពេញដោយវីតាមីន។ ផ្លែឈើគឺជាស្ករគ្រាប់ពីធម្មជាតិ — វាជួយរាងកាយប្រយុទ្ធនឹងជំងឺផ្តាសាយ និងផ្តល់ថាមពលឲ្យអ្នកលេងរត់បានយ៉ាងរហ័ស។",
    items: [
      {
        id: "banana",
        emoji: "🍌",
        nameEn: "Banana",
        nameKh: "ចេក",
        tagEn: "Potassium",
        tagKh: "ប៉ូតាស្យូម",
        powerEn:
          "Gives you quick energy to run, jump, and play all afternoon — and helps your muscles stay strong.",
        powerKh:
          "ផ្តល់ឲ្យអ្នកនូវថាមពលរហ័ស ដើម្បីរត់ លោត និងលេងពេញរសៀល — ហើយជួយឲ្យសាច់ដុំរបស់អ្នករឹងមាំ។",
      },
      {
        id: "mango",
        emoji: "🥭",
        nameEn: "Mango",
        nameKh: "ស្វាយ",
        tagEn: "Vitamin C",
        tagKh: "វីតាមីន C",
        powerEn:
          "Packed with Vitamin C — your body's shield that helps stop you from getting sick.",
        powerKh:
          "ពោរពេញដោយវីតាមីន C — ខែលរបស់រាងកាយដែលជួយការពារអ្នកមិនឲ្យឈឺ។",
      },
      {
        id: "orange",
        emoji: "🍊",
        nameEn: "Orange",
        nameKh: "ក្រូច",
        tagEn: "Vitamin C",
        tagKh: "វីតាមីន C",
        powerEn:
          "More Vitamin C to keep colds and coughs away. Juicy, sour-sweet, and so refreshing.",
        powerKh:
          "មានវីតាមីន C ច្រើន ដើម្បីការពារពីផ្តាសាយ និងក្អក។ ឆ្ងាញ់ ជូរ-ផ្អែម ហើយបន្ស៊ីណាស់។",
      },
      {
        id: "apple",
        emoji: "🍎",
        nameEn: "Apple",
        nameKh: "ប៉ោម",
        tagEn: "Fiber",
        tagKh: "ជាតិសរសៃ",
        powerEn:
          "Fiber keeps your tummy happy and helps your body clean itself. One apple a day = strong teeth too!",
        powerKh:
          "ជាតិសរសៃធ្វើឲ្យក្រពះរបស់អ្នកសប្បាយ ហើយជួយរាងកាយសម្អាតខ្លួនឯង។ ប៉ោមមួយផ្លែក្នុងមួយថ្ងៃ = ធ្មេញរឹងមាំផងដែរ!",
      },
      {
        id: "watermelon",
        emoji: "🍉",
        nameEn: "Watermelon",
        nameKh: "ឪឡឹក",
        tagEn: "Water",
        tagKh: "ទឹក",
        powerEn:
          "Almost all water inside! It cools you down and keeps your body hydrated on hot Cambodian days.",
        powerKh:
          "នៅខាងក្នុងស្ទើរតែមានតែទឹកសុទ្ធ! វាធ្វើឲ្យអ្នកត្រជាក់ ហើយរក្សារាងកាយឲ្យមានជាតិទឹក នៅថ្ងៃក្តៅៗរបស់កម្ពុជា។",
      },
    ],
  },
  {
    id: "vegetables",
    Icon: Carrot,
    emoji: "🥬",
    color: "green",
    titleEn: "Vegetables",
    titleKh: "បន្លែ",
    blurbEn:
      "The leafy, crunchy, colourful heroes of your plate. Veggies are full of vitamins and minerals that help every part of your body — eyes, blood, skin, and bones.",
    blurbKh:
      "វីរបុរសស្លឹក គ្រោះៗ និងចម្រុះពណ៌នៃចានរបស់អ្នក។ បន្លែពោរពេញដោយវីតាមីន និងសារធាតុរ៉ែ ដែលជួយគ្រប់ផ្នែកនៃរាងកាយរបស់អ្នក — ភ្នែក ឈាម ស្បែក និងឆ្អឹង។",
    items: [
      {
        id: "morning-glory",
        emoji: "🥬",
        nameEn: "Morning Glory (Water Spinach)",
        nameKh: "ត្រកួន",
        tagEn: "Iron",
        tagKh: "ជាតិដែក",
        powerEn:
          "Full of Iron and vitamins that build strong, healthy blood — so you don't feel tired or dizzy.",
        powerKh:
          "ពោរពេញដោយជាតិដែក និងវីតាមីន ដែលកសាងឈាមឲ្យរឹងមាំ និងមានសុខភាពល្អ — ដើម្បីឲ្យអ្នកមិនអស់កម្លាំង ឬវិលមុខ។",
      },
      {
        id: "carrot",
        emoji: "🥕",
        nameEn: "Carrot",
        nameKh: "ការ៉ុត",
        tagEn: "Vitamin A",
        tagKh: "វីតាមីន A",
        powerEn:
          "Vitamin A gives you super-vision — sharp, healthy eyes that can see far and read clearly.",
        powerKh:
          "វីតាមីន A ផ្តល់ឲ្យអ្នកនូវភ្នែកដ៏អស្ចារ្យ — ភ្នែកមុតស្រួច មានសុខភាពល្អ ដែលអាចមើលឆ្ងាយ និងអានបានច្បាស់។",
      },
      {
        id: "pumpkin",
        emoji: "🎃",
        nameEn: "Pumpkin",
        nameKh: "ល្ពៅ",
        tagEn: "Vitamin A",
        tagKh: "វីតាមីន A",
        powerEn:
          "Bright orange means lots of Vitamin A inside — great for eyes, skin, and a strong immune system.",
        powerKh:
          "ពណ៌ទឹកក្រូចភ្លឺមានន័យថា មានវីតាមីន A ច្រើនខាងក្នុង — ល្អសម្រាប់ភ្នែក ស្បែក និងប្រព័ន្ធការពាររាងកាយរឹងមាំ។",
      },
      {
        id: "tomato",
        emoji: "🍅",
        nameEn: "Tomato",
        nameKh: "ប៉េងប៉ោះ",
        tagEn: "Antioxidants",
        tagKh: "សារធាតុប្រឆាំងអុកស៊ីតកម្ម",
        powerEn:
          "Tomatoes have a special red colour that helps protect your heart and your skin from the sun.",
        powerKh:
          "ប៉េងប៉ោះមានពណ៌ក្រហមពិសេស ដែលជួយការពារបេះដូង និងស្បែករបស់អ្នកពីពន្លឺថ្ងៃ។",
      },
      {
        id: "leafy-greens",
        emoji: "🥗",
        nameEn: "Leafy Greens",
        nameKh: "បន្លែស្លឹកបៃតង",
        tagEn: "Many vitamins",
        tagKh: "វីតាមីនច្រើនមុខ",
        powerEn:
          "Cabbage, lettuce, spinach — green leaves that grow your bones, skin, and brain. Eat a little with every meal!",
        powerKh:
          "ស្ពៃក្តោប សាឡាត់ ស្លឹកត្រកួន — ស្លឹកបៃតងដែលជួយដាំឆ្អឹង ស្បែក និងខួរក្បាលរបស់អ្នក។ សូមញ៉ាំបន្តិចជាមួយរាល់ពេលបាយ!",
      },
    ],
  },
  {
    id: "energy",
    Icon: Wheat,
    emoji: "🍚",
    color: "amber",
    titleEn: "Energy Foods",
    titleKh: "អាហារថាមពល",
    blurbEn:
      "These are the fuel your body burns for energy. Just like a tuk-tuk needs petrol, your brain and muscles need carbs to learn, focus, and play hard at school.",
    blurbKh:
      "ទាំងនេះគឺជាឥន្ធនៈដែលរាងកាយរបស់អ្នកដុតយកថាមពល។ ដូចជាទុកទុកត្រូវការសាំង ខួរក្បាល និងសាច់ដុំរបស់អ្នកត្រូវការកាបូអ៊ីដ្រាត ដើម្បីរៀន ផ្តោតអារម្មណ៍ និងលេងយ៉ាងសប្បាយនៅសាលា។",
    items: [
      {
        id: "rice",
        emoji: "🍚",
        nameEn: "Rice",
        nameKh: "បាយ",
        tagEn: "Carbohydrates",
        tagKh: "កាបូអ៊ីដ្រាត",
        powerEn:
          "The fuel of Cambodia! Rice gives your brain steady energy so you can pay attention and learn all day long.",
        powerKh:
          "ឥន្ធនៈរបស់កម្ពុជា! បាយផ្តល់ឲ្យខួរក្បាលរបស់អ្នកនូវថាមពលជាប់លាប់ ដើម្បីឲ្យអ្នកអាចផ្តោតអារម្មណ៍ និងរៀនបានពេញមួយថ្ងៃ។",
      },
      {
        id: "noodles",
        emoji: "🍜",
        nameEn: "Noodles",
        nameKh: "មី",
        tagEn: "Carbohydrates",
        tagKh: "កាបូអ៊ីដ្រាត",
        powerEn:
          "Like rice — long lasting energy for your body and brain. Yummy with vegetables and a little fish or chicken.",
        powerKh:
          "ដូចបាយដែរ — ថាមពលជាប់យូរសម្រាប់រាងកាយ និងខួរក្បាលរបស់អ្នក។ ឆ្ងាញ់ជាមួយបន្លែ និងត្រី ឬមាន់បន្តិច។",
      },
      {
        id: "bread",
        emoji: "🍞",
        nameEn: "Bread",
        nameKh: "នំបុ័ង",
        tagEn: "Carbohydrates",
        tagKh: "កាបូអ៊ីដ្រាត",
        powerEn:
          "A great quick breakfast. Bread starts your day with energy so you don't feel sleepy at school.",
        powerKh:
          "អាហារពេលព្រឹករហ័សដ៏ល្អ។ នំបុ័ងចាប់ផ្តើមថ្ងៃរបស់អ្នកជាមួយថាមពល ដើម្បីឲ្យអ្នកមិនមានអារម្មណ៍ងងុយដេកនៅសាលា។",
      },
      {
        id: "sweet-potato",
        emoji: "🍠",
        nameEn: "Sweet Potato",
        nameKh: "ដំឡូងជ្វា",
        tagEn: "Slow energy",
        tagKh: "ថាមពលយឺត",
        powerEn:
          "Naturally sweet and gives slow, steady energy — plus extra Vitamin A for healthy eyes.",
        powerKh:
          "ផ្អែមដោយធម្មជាតិ ហើយផ្តល់ថាមពលយឺត និងជាប់លាប់ — បូករួមនឹងវីតាមីន A បន្ថែម សម្រាប់ភ្នែកសុខភាពល្អ។",
      },
    ],
  },
  {
    id: "proteins",
    Icon: Drumstick,
    emoji: "🐟",
    color: "blue",
    titleEn: "Proteins & Dairy",
    titleKh: "សាច់ និងទឹកដោះគោ",
    blurbEn:
      "These foods are the builders. Every time you grow taller or your scratches heal, your body is using protein, calcium, and healthy fats from this group.",
    blurbKh:
      "អាហារទាំងនេះគឺជាអ្នកសាងសង់។ រាល់ពេលដែលអ្នកលូតលាស់ខ្ពស់ ឬស្នាមដែលក្រឡូតរបួសរបស់អ្នកជាសះស្បើយ រាងកាយរបស់អ្នកកំពុងប្រើប្រូតេអ៊ីន កាល់ស្យូម និងខ្លាញ់ល្អៗពីក្រុមនេះ។",
    items: [
      {
        id: "fish",
        emoji: "🐟",
        nameEn: "Fish",
        nameKh: "ត្រី",
        tagEn: "Brain food",
        tagKh: "អាហារខួរក្បាល",
        powerEn:
          "Fish has healthy fats called Omega-3 that make your brain smarter and help you remember what your teacher says.",
        powerKh:
          "ត្រីមានខ្លាញ់ល្អៗហៅថា អូមេហ្គា-៣ ដែលធ្វើឲ្យខួរក្បាលរបស់អ្នកឆ្លាតជាង ហើយជួយឲ្យអ្នកចងចាំនូវអ្វីដែលគ្រូបង្រៀន។",
      },
      {
        id: "milk",
        emoji: "🥛",
        nameEn: "Milk / Soy Milk",
        nameKh: "ទឹកដោះគោ / ទឹកដោះសណ្តែក",
        tagEn: "Calcium",
        tagKh: "កាល់ស្យូម",
        powerEn:
          "Calcium builds unbreakable bones and shiny strong teeth. Drink a glass to grow tall and strong!",
        powerKh:
          "កាល់ស្យូមកសាងឆ្អឹងដែលបំបាក់មិនបាន និងធ្មេញរឹងមាំភ្លឺថ្លា។ ផឹកមួយកែវដើម្បីលូតលាស់ខ្ពស់ និងរឹងមាំ!",
      },
      {
        id: "egg",
        emoji: "🥚",
        nameEn: "Egg",
        nameKh: "ពង",
        tagEn: "Protein",
        tagKh: "ប្រូតេអ៊ីន",
        powerEn:
          "An egg is a tiny perfect protein package — it grows your muscles, your hair, and your nails.",
        powerKh:
          "ពងគឺជាកញ្ចប់ប្រូតេអ៊ីនតូចដ៏ល្អឥតខ្ចោះ — វាដាំសាច់ដុំ សក់ និងក្រចករបស់អ្នក។",
      },
      {
        id: "chicken",
        emoji: "🍗",
        nameEn: "Chicken",
        nameKh: "សាច់មាន់",
        tagEn: "Protein",
        tagKh: "ប្រូតេអ៊ីន",
        powerEn:
          "Lean meat full of protein — the building blocks your body uses to grow taller and stronger every day.",
        powerKh:
          "សាច់សរ្ងាយដែលពោរពេញដោយប្រូតេអ៊ីន — គ្រឹះសាងសង់ដែលរាងកាយរបស់អ្នកប្រើដើម្បីលូតលាស់ខ្ពស់ និងរឹងមាំជាងមុនរាល់ថ្ងៃ។",
      },
      {
        id: "beans",
        emoji: "🫘",
        nameEn: "Beans",
        nameKh: "សណ្តែក",
        tagEn: "Plant protein",
        tagKh: "ប្រូតេអ៊ីនរុក្ខជាតិ",
        powerEn:
          "A protein superhero from a plant! Beans give you energy and help your body grow — even on days without meat.",
        powerKh:
          "វីរបុរសប្រូតេអ៊ីនពីរុក្ខជាតិ! សណ្តែកផ្តល់ឲ្យអ្នកនូវថាមពល និងជួយឲ្យរាងកាយលូតលាស់ — ទោះបីជាថ្ងៃណាដែលមិនមានសាច់ក៏ដោយ។",
      },
    ],
  },
];

/* ── Concrete Tailwind classes per colour family (JIT-safe) ────────────── */

type ColorPack = {
  bannerBg: string;        // group section background
  cardGradient: string;    // emoji-card pastel gradient
  cardBorder: string;      // card border colour
  iconBg: string;          // section header icon chip
  iconText: string;
  tagChip: string;         // vitamin/mineral chip
  divider: string;         // wavy divider colour
  blob: string;            // decorative background blob
};

const COLORS: Record<FoodGroup["color"], ColorPack> = {
  red: {
    bannerBg:     "from-rose-50 via-red-50 to-pink-50",
    cardGradient: "from-rose-100 via-red-50 to-pink-100",
    cardBorder:   "border-rose-300",
    iconBg:       "bg-rose-500",
    iconText:     "text-white",
    tagChip:      "bg-rose-200 text-rose-900 border-rose-300",
    divider:      "text-rose-300",
    blob:         "bg-rose-200/40",
  },
  green: {
    bannerBg:     "from-lime-50 via-green-50 to-emerald-50",
    cardGradient: "from-lime-100 via-green-50 to-emerald-100",
    cardBorder:   "border-emerald-300",
    iconBg:       "bg-emerald-500",
    iconText:     "text-white",
    tagChip:      "bg-emerald-200 text-emerald-900 border-emerald-300",
    divider:      "text-emerald-300",
    blob:         "bg-emerald-200/40",
  },
  amber: {
    bannerBg:     "from-yellow-50 via-amber-50 to-orange-50",
    cardGradient: "from-yellow-100 via-amber-50 to-orange-100",
    cardBorder:   "border-amber-300",
    iconBg:       "bg-amber-500",
    iconText:     "text-white",
    tagChip:      "bg-amber-200 text-amber-900 border-amber-300",
    divider:      "text-amber-300",
    blob:         "bg-amber-200/40",
  },
  blue: {
    bannerBg:     "from-sky-50 via-cyan-50 to-blue-50",
    cardGradient: "from-sky-100 via-cyan-50 to-blue-100",
    cardBorder:   "border-sky-300",
    iconBg:       "bg-sky-500",
    iconText:     "text-white",
    tagChip:      "bg-sky-200 text-sky-900 border-sky-300",
    divider:      "text-sky-300",
    blob:         "bg-sky-200/40",
  },
};

/* ────────────────────────────────────────────────────────────────────── */

export default function HealthyFoodsPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-emerald-50">
      {/* ── Hero / Rainbow Banner ───────────────────────────────────── */}
      <header
        className="relative overflow-hidden border-b-4 border-white"
        data-testid="healthy-foods-hero"
      >
        {/* The rainbow stripe — bold and joyful */}
        <div className="absolute inset-x-0 top-0 h-3 flex" aria-hidden>
          {["#ef4444", "#f97316", "#facc15", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7"].map((c) => (
            <span key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>

        {/* Floating fruit emojis as decoration */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <span className="absolute left-[6%] top-12 text-5xl opacity-30 rotate-[-12deg]">🍌</span>
          <span className="absolute right-[8%] top-16 text-6xl opacity-30 rotate-[14deg]">🥭</span>
          <span className="absolute left-[18%] bottom-6 text-4xl opacity-25 rotate-[8deg]">🥕</span>
          <span className="absolute right-[22%] bottom-10 text-5xl opacity-25 rotate-[-10deg]">🥦</span>
          <span className="absolute left-[44%] top-6 text-4xl opacity-25 rotate-[5deg]">🍎</span>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-stone-600 hover:text-rose-600 text-sm mb-5 ${
              kh ? "font-khmer" : ""
            }`}
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            {kh ? "ត្រឡប់​ទៅ​ទំព័រ​ដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border-2 border-rose-200 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-rose-700">
            <Apple className="w-3.5 h-3.5" />
            FOR KIDS · សម្រាប់​កុមារ
          </div>

          <h1
            className={`font-display font-extrabold text-3xl sm:text-5xl leading-tight max-w-3xl text-stone-900 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
            data-testid="healthy-foods-title"
          >
            {kh ? (
              <>
                ផ្តល់​ថាមពល​ដល់​រាងកាយ៖{" "}
                <span className="text-rose-500">អាហារ​សុខភាព</span>
                <span className="ml-2">🍎🥦🍚🐟</span>
              </>
            ) : (
              <>
                Fuel Your Body:{" "}
                <span className="text-rose-500">Healthy Foods</span>
                <span className="ml-2">🍎🥦🍚🐟</span>
              </>
            )}
          </h1>

          <p
            className={`mt-4 max-w-2xl text-stone-700 text-sm sm:text-base ${
              kh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {kh
              ? "មក​ស្គាល់​ឥន្ទធនូ​នៃ​អាហារ​ដែល​ផ្តល់​ឲ្យ​រាងកាយ​របស់​អ្នក​នូវ​អំណាច​ពិសេស — រាង​ខ្ពស់ ឆ្អឹង​រឹង ភ្នែក​ច្បាស់ ខួរ​ក្បាល​ឆ្លាត និង​ថាមពល​ច្រើន​ដើម្បី​លេង​ពេញ​មួយ​ថ្ងៃ។"
              : "Meet the rainbow of foods that give your body its superpowers — tall growth, strong bones, sharp eyes, a smart brain, and tons of energy to play all day long."}
          </p>

          {/* The encouraging slogan banner */}
          <div
            className="mt-7 rounded-3xl bg-white border-4 border-dashed border-amber-300 px-5 py-5 sm:px-7 sm:py-6 shadow-md flex items-start sm:items-center gap-4"
            data-testid="rainbow-banner"
          >
            <span className="text-4xl sm:text-5xl flex-shrink-0" aria-hidden>🌈</span>
            <div>
              <p
                className={`font-display font-extrabold text-lg sm:text-2xl text-stone-900 leading-tight ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {kh
                  ? "ញ៉ាំ​អាហារ​ចម្រុះ​ពណ៌​ជា​រៀង​រាល់​ថ្ងៃ ដើម្បី​លូតលាស់​រឹង​មាំ និង​ឆ្លាត​វៃ!"
                  : "Eat a rainbow every day to grow strong and smart!"}
              </p>
              <p
                className={`mt-1 text-sm text-stone-600 ${
                  !kh ? "font-khmer leading-loose" : "italic"
                }`}
              >
                {kh
                  ? "Eat a rainbow every day to grow strong and smart!"
                  : "ញ៉ាំ​អាហារ​ចម្រុះ​ពណ៌​ជា​រៀង​រាល់​ថ្ងៃ ដើម្បី​លូតលាស់​រឹង​មាំ និង​ឆ្លាត​វៃ!"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Food Group Sections ─────────────────────────────────────── */}
      {FOOD_GROUPS.map((group) => (
        <FoodGroupSection key={group.id} group={group} kh={kh} />
      ))}

      {/* ── Closing pep-talk ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="rounded-3xl bg-gradient-to-br from-amber-100 via-rose-100 to-emerald-100 border-4 border-white shadow-lg p-6 sm:p-8 text-center"
          data-testid="closing-banner"
        >
          <div className="text-5xl mb-3" aria-hidden>🌟</div>
          <h2
            className={`font-display font-extrabold text-xl sm:text-2xl text-stone-900 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
          >
            {kh
              ? "ចាន​ល្អ​បំផុត = ផ្លែឈើ​ខ្លះ + បន្លែ​ខ្លះ + បាយ​ខ្លះ + ត្រី ឬ ពង​ខ្លះ + ទឹក​ដោះ​មួយ​កែវ។"
              : "The best plate = a little fruit + a little veggie + some rice + a piece of fish or egg + a glass of milk."}
          </h2>
          <p
            className={`mt-2 text-stone-700 text-sm sm:text-base ${
              !kh ? "font-khmer leading-loose" : "italic"
            }`}
          >
            {kh
              ? "The best plate = a little fruit + a little veggie + some rice + a piece of fish or egg + a glass of milk."
              : "ចាន​ល្អ​បំផុត = ផ្លែឈើ​ខ្លះ + បន្លែ​ខ្លះ + បាយ​ខ្លះ + ត្រី ឬ ពង​ខ្លះ + ទឹក​ដោះ​មួយ​កែវ។"}
          </p>
        </div>

        <Link
          href="/"
          className={`mt-8 inline-flex items-center gap-1.5 text-stone-500 hover:text-rose-600 text-sm ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {kh ? "ត្រឡប់​ទៅ​ទំព័រ​ដើម" : "Back to Home"}
        </Link>
      </section>
    </div>
  );
}

/* ── Food group section ────────────────────────────────────────────────── */
function FoodGroupSection({ group, kh }: { group: FoodGroup; kh: boolean }) {
  const c = COLORS[group.color];
  const { Icon } = group;

  return (
    <section
      className={`relative overflow-hidden border-y-2 border-white bg-gradient-to-br ${c.bannerBg}`}
      data-testid={`group-${group.id}`}
      id={group.id}
    >
      {/* Decorative blobs */}
      <div className={`absolute -top-12 -left-10 w-48 h-48 rounded-full ${c.blob} blur-2xl`} aria-hidden />
      <div className={`absolute -bottom-16 -right-12 w-56 h-56 rounded-full ${c.blob} blur-2xl`} aria-hidden />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header row */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${c.iconBg} ${c.iconText} flex items-center justify-center shadow-md flex-shrink-0`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h2
              className={`font-display font-extrabold text-2xl sm:text-3xl text-stone-900 leading-tight ${
                kh ? "font-khmer leading-snug" : ""
              }`}
              data-testid={`group-title-${group.id}`}
            >
              <span aria-hidden className="mr-2">{group.emoji}</span>
              {kh ? group.titleKh : group.titleEn}
              <span className="ml-2 text-stone-500 text-base sm:text-xl font-normal">
                {kh ? `· ${group.titleEn}` : `· ${group.titleKh}`}
              </span>
            </h2>
          </div>
        </div>

        <p
          className={`text-stone-700 text-sm sm:text-base mb-7 max-w-3xl ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {kh ? group.blurbKh : group.blurbEn}
        </p>

        {/* The grid of food cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {group.items.map((food) => (
            <FoodCard key={food.id} food={food} pack={c} kh={kh} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── A single bubbly nutrition card ─────────────────────────────────── */
function FoodCard({
  food, pack, kh,
}: {
  food: Food;
  pack: ColorPack;
  kh: boolean;
}) {
  return (
    <article
      className={`group relative rounded-3xl border-2 ${pack.cardBorder} bg-gradient-to-br ${pack.cardGradient} shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
      data-testid={`food-card-${food.id}`}
    >
      {/* Big emoji panel */}
      <div className="flex items-center justify-center h-32 sm:h-36 bg-white/60 border-b-2 border-white/80">
        <span
          className="text-7xl sm:text-8xl drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
          aria-hidden
        >
          {food.emoji}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {/* Bilingual name — both languages always visible (kid pages convention) */}
        <h3 className="font-display font-extrabold text-xl text-stone-900 leading-tight">
          {kh ? food.nameKh : food.nameEn}
        </h3>
        <div
          className={`text-sm text-stone-600 mt-0.5 ${
            !kh ? "font-khmer leading-loose" : "italic"
          }`}
        >
          {kh ? food.nameEn : food.nameKh}
        </div>

        {/* Vitamin / mineral chip */}
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border ${pack.tagChip} px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
              kh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {kh ? food.tagKh : food.tagEn}
          </span>
        </div>

        {/* Superpower line */}
        <p
          className={`mt-3 text-sm text-stone-700 ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {kh ? food.powerKh : food.powerEn}
        </p>
      </div>
    </article>
  );
}
