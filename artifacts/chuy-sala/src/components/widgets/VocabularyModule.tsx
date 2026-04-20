import { useState } from "react";
import {
  Volume2, BookOpen, Bed, ShowerHead, Sofa, Car, Boxes, Trees, Flower2,
  Trophy, GraduationCap, Stethoscope, Armchair, Utensils, Layers,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
 * Everyday Vocabulary — ESL learner module
 * Khmer translations are PLACEHOLDERS marked with KH_TODO so a translator
 * can locate every spot easily later.
 * ────────────────────────────────────────────────────────────────────── */

const KH_TODO = (placeholder: string) => placeholder;

type VocabItem = {
  en: string;
  /** Khmer translation placeholder — replace later. */
  kh: string;
  /** Visual representation: emoji works on every device with no asset cost. */
  emoji: string;
};

type Category = {
  id: string;
  en: string;
  kh: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Tailwind color name root used for chip + active state. */
  color:
    | "rose" | "amber" | "sky" | "emerald" | "violet" | "indigo"
    | "lime" | "teal" | "orange" | "blue" | "pink" | "fuchsia" | "cyan";
  items: VocabItem[];
};

/* ── Color palette map (kept literal so Tailwind JIT picks them up) ── */
const COLOR: Record<Category["color"], { card: string; iconBg: string; iconText: string; activeBg: string; activeBorder: string }> = {
  rose:    { card: "from-rose-50 to-rose-100 border-rose-200",       iconBg: "bg-rose-100",    iconText: "text-rose-700",    activeBg: "bg-rose-500",    activeBorder: "border-rose-700" },
  amber:   { card: "from-amber-50 to-amber-100 border-amber-200",    iconBg: "bg-amber-100",   iconText: "text-amber-700",   activeBg: "bg-amber-500",   activeBorder: "border-amber-700" },
  sky:     { card: "from-sky-50 to-sky-100 border-sky-200",          iconBg: "bg-sky-100",     iconText: "text-sky-700",     activeBg: "bg-sky-500",     activeBorder: "border-sky-700" },
  emerald: { card: "from-emerald-50 to-emerald-100 border-emerald-200", iconBg: "bg-emerald-100", iconText: "text-emerald-700", activeBg: "bg-emerald-500", activeBorder: "border-emerald-700" },
  violet:  { card: "from-violet-50 to-violet-100 border-violet-200", iconBg: "bg-violet-100",  iconText: "text-violet-700",  activeBg: "bg-violet-500",  activeBorder: "border-violet-700" },
  indigo:  { card: "from-indigo-50 to-indigo-100 border-indigo-200", iconBg: "bg-indigo-100",  iconText: "text-indigo-700",  activeBg: "bg-indigo-500",  activeBorder: "border-indigo-700" },
  lime:    { card: "from-lime-50 to-lime-100 border-lime-200",       iconBg: "bg-lime-100",    iconText: "text-lime-700",    activeBg: "bg-lime-500",    activeBorder: "border-lime-700" },
  teal:    { card: "from-teal-50 to-teal-100 border-teal-200",       iconBg: "bg-teal-100",    iconText: "text-teal-700",    activeBg: "bg-teal-500",    activeBorder: "border-teal-700" },
  orange:  { card: "from-orange-50 to-orange-100 border-orange-200", iconBg: "bg-orange-100",  iconText: "text-orange-700",  activeBg: "bg-orange-500",  activeBorder: "border-orange-700" },
  blue:    { card: "from-blue-50 to-blue-100 border-blue-200",       iconBg: "bg-blue-100",    iconText: "text-blue-700",    activeBg: "bg-blue-500",    activeBorder: "border-blue-700" },
  pink:    { card: "from-pink-50 to-pink-100 border-pink-200",       iconBg: "bg-pink-100",    iconText: "text-pink-700",    activeBg: "bg-pink-500",    activeBorder: "border-pink-700" },
  fuchsia: { card: "from-fuchsia-50 to-fuchsia-100 border-fuchsia-200", iconBg: "bg-fuchsia-100", iconText: "text-fuchsia-700", activeBg: "bg-fuchsia-500", activeBorder: "border-fuchsia-700" },
  cyan:    { card: "from-cyan-50 to-cyan-100 border-cyan-200",       iconBg: "bg-cyan-100",    iconText: "text-cyan-700",    activeBg: "bg-cyan-500",    activeBorder: "border-cyan-700" },
};

/* ── Category catalog ───────────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: "kitchen", en: "Kitchen", kh: KH_TODO("ផ្ទះបាយ"), icon: Utensils, color: "rose",
    items: [
      { en: "Spoon",  kh: KH_TODO("ស្លាបព្រា"), emoji: "🥄" },
      { en: "Plate",  kh: KH_TODO("ចាន"),       emoji: "🍽️" },
      { en: "Stove",  kh: KH_TODO("ឡដុត"),      emoji: "🔥" },
      { en: "Fridge", kh: KH_TODO("ទូរទឹកកក"),  emoji: "🧊" },
      { en: "Knife",  kh: KH_TODO("កាំបិត"),    emoji: "🔪" },
      { en: "Pot",    kh: KH_TODO("ឆ្នាំង"),    emoji: "🍲" },
    ],
  },
  {
    id: "bedroom", en: "Bedroom", kh: KH_TODO("បន្ទប់គេង"), icon: Bed, color: "violet",
    items: [
      { en: "Bed",      kh: KH_TODO("គ្រែ"),      emoji: "🛏️" },
      { en: "Pillow",   kh: KH_TODO("ខ្នើយ"),    emoji: "🛌" },
      { en: "Blanket",  kh: KH_TODO("ភួយ"),       emoji: "🧣" },
      { en: "Lamp",     kh: KH_TODO("ចង្កៀង"),   emoji: "💡" },
      { en: "Wardrobe", kh: KH_TODO("ទូដាក់សម្លៀកបំពាក់"), emoji: "🚪" },
      { en: "Mirror",   kh: KH_TODO("កញ្ចក់"),   emoji: "🪞" },
    ],
  },
  {
    id: "bathroom", en: "Bathroom", kh: KH_TODO("បន្ទប់ទឹក"), icon: ShowerHead, color: "cyan",
    items: [
      { en: "Toilet",     kh: KH_TODO("បង្គន់"),    emoji: "🚽" },
      { en: "Sink",       kh: KH_TODO("អាងបាយ"),    emoji: "🚰" },
      { en: "Towel",      kh: KH_TODO("កន្សែងជូត"), emoji: "🧻" },
      { en: "Soap",       kh: KH_TODO("សាប៊ូ"),     emoji: "🧼" },
      { en: "Shower",     kh: KH_TODO("ផ្កាឈូក"),  emoji: "🚿" },
      { en: "Toothbrush", kh: KH_TODO("ច្រាសដុសធ្មេញ"), emoji: "🪥" },
    ],
  },
  {
    id: "living-room", en: "Living Room", kh: KH_TODO("បន្ទប់ទទួលភ្ញៀវ"), icon: Sofa, color: "amber",
    items: [
      { en: "Sofa",      kh: KH_TODO("សាឡុង"),    emoji: "🛋️" },
      { en: "Television", kh: KH_TODO("ទូរទស្សន៍"), emoji: "📺" },
      { en: "Clock",     kh: KH_TODO("នាឡិកា"),  emoji: "🕐" },
      { en: "Window",    kh: KH_TODO("បង្អួច"),  emoji: "🪟" },
      { en: "Rug",       kh: KH_TODO("កម្រាល"),  emoji: "🧶" },
      { en: "Bookshelf", kh: KH_TODO("ទូសៀវភៅ"), emoji: "📚" },
    ],
  },
  {
    id: "garage", en: "Garage", kh: KH_TODO("រោងរថយន្ត"), icon: Car, color: "orange",
    items: [
      { en: "Car",      kh: KH_TODO("រថយន្ត"),  emoji: "🚗" },
      { en: "Toolbox",  kh: KH_TODO("ប្រអប់ឧបករណ៍"), emoji: "🧰" },
      { en: "Bicycle",  kh: KH_TODO("កង់"),     emoji: "🚲" },
      { en: "Tire",     kh: KH_TODO("កង់រថយន្ត"), emoji: "⚙️" },
      { en: "Hammer",   kh: KH_TODO("ញញួរ"),    emoji: "🔨" },
      { en: "Ladder",   kh: KH_TODO("ជណ្តើរ"),   emoji: "🪜" },
    ],
  },
  {
    id: "basement", en: "Basement", kh: KH_TODO("បន្ទប់ក្រោមដី"), icon: Boxes, color: "indigo",
    items: [
      { en: "Box",       kh: KH_TODO("ប្រអប់"),    emoji: "📦" },
      { en: "Washer",    kh: KH_TODO("ម៉ាស៊ីនបោកគក់"), emoji: "🧺" },
      { en: "Dryer",     kh: KH_TODO("ម៉ាស៊ីនសម្ងួត"), emoji: "🌀" },
      { en: "Spider",    kh: KH_TODO("ពីងពាង"),   emoji: "🕷️" },
      { en: "Flashlight", kh: KH_TODO("ភ្លើងពិល"), emoji: "🔦" },
      { en: "Old chair", kh: KH_TODO("កៅអីចាស់"), emoji: "🪑" },
    ],
  },
  {
    id: "front-yard", en: "Front Yard", kh: KH_TODO("ទីធ្លាខាងមុខ"), icon: Trees, color: "lime",
    items: [
      { en: "Mailbox", kh: KH_TODO("ប្រអប់សំបុត្រ"), emoji: "📫" },
      { en: "Tree",    kh: KH_TODO("ដើមឈើ"),    emoji: "🌳" },
      { en: "Path",    kh: KH_TODO("ផ្លូវលៃ"),  emoji: "🛤️" },
      { en: "Flowers", kh: KH_TODO("ផ្កា"),      emoji: "🌸" },
      { en: "Fence",   kh: KH_TODO("របង"),      emoji: "🚧" },
      { en: "Gate",    kh: KH_TODO("ច្រកចូល"),  emoji: "🚪" },
    ],
  },
  {
    id: "back-yard", en: "Back Yard", kh: KH_TODO("ទីធ្លាខាងក្រោយ"), icon: Flower2, color: "emerald",
    items: [
      { en: "Garden",   kh: KH_TODO("សួនច្បារ"), emoji: "🌷" },
      { en: "Hose",     kh: KH_TODO("បំពង់ទឹក"), emoji: "💦" },
      { en: "Grass",    kh: KH_TODO("ស្មៅ"),     emoji: "🌱" },
      { en: "Barbecue", kh: KH_TODO("ឆ្នាំងអាំង"), emoji: "🔥" },
      { en: "Swing",    kh: KH_TODO("ជន្ដ"),    emoji: "🪢" },
      { en: "Pool",     kh: KH_TODO("អាងហែលទឹក"), emoji: "🏊" },
    ],
  },
  {
    id: "sports", en: "Sports", kh: KH_TODO("កីឡា"), icon: Trophy, color: "fuchsia",
    items: [
      { en: "Ball",    kh: KH_TODO("បាល់"),      emoji: "⚽" },
      { en: "Net",     kh: KH_TODO("សំណាញ់"),   emoji: "🥅" },
      { en: "Bat",     kh: KH_TODO("ដំបង"),     emoji: "🏏" },
      { en: "Racket",  kh: KH_TODO("រ៉ាកែតវាយ"), emoji: "🎾" },
      { en: "Helmet",  kh: KH_TODO("មួកការពារ"), emoji: "⛑️" },
      { en: "Whistle", kh: KH_TODO("កញ្ចែ"),    emoji: "🎽" },
    ],
  },
  {
    id: "school", en: "School", kh: KH_TODO("សាលារៀន"), icon: GraduationCap, color: "blue",
    items: [
      { en: "Book",       kh: KH_TODO("សៀវភៅ"),  emoji: "📖" },
      { en: "Pen",        kh: KH_TODO("ប៊ិច"),    emoji: "🖊️" },
      { en: "Desk",       kh: KH_TODO("តុសិក្សា"), emoji: "🪑" },
      { en: "Chalkboard", kh: KH_TODO("ក្តារខៀន"), emoji: "🖼️" },
      { en: "Backpack",   kh: KH_TODO("កាបូប"),  emoji: "🎒" },
      { en: "Ruler",      kh: KH_TODO("បន្ទាត់"), emoji: "📏" },
    ],
  },
  {
    id: "hospital", en: "Hospital", kh: KH_TODO("មន្ទីរពេទ្យ"), icon: Stethoscope, color: "pink",
    items: [
      { en: "Doctor",       kh: KH_TODO("វេជ្ជបណ្ឌិត"), emoji: "👨‍⚕️" },
      { en: "Nurse",        kh: KH_TODO("គិលានុបដ្ឋាយិកា"), emoji: "👩‍⚕️" },
      { en: "Bandage",      kh: KH_TODO("បង់រុំរបួស"), emoji: "🩹" },
      { en: "Pill",         kh: KH_TODO("ថ្នាំ"),     emoji: "💊" },
      { en: "Stethoscope",  kh: KH_TODO("ឧបករណ៍ស្ដាប់បេះដូង"), emoji: "🩺" },
      { en: "Wheelchair",   kh: KH_TODO("កៅអីរុញ"),  emoji: "♿" },
    ],
  },
  {
    id: "car-inside", en: "Inside a Car", kh: KH_TODO("ខាងក្នុងរថយន្ត"), icon: Car, color: "teal",
    items: [
      { en: "Steering wheel", kh: KH_TODO("ចង្កូត"),  emoji: "🎡" },
      { en: "Seat",           kh: KH_TODO("កៅអីអង្គុយ"), emoji: "💺" },
      { en: "Mirror",         kh: KH_TODO("កញ្ចក់"),  emoji: "🪞" },
      { en: "Window",         kh: KH_TODO("បង្អួច"),  emoji: "🪟" },
      { en: "Pedal",          kh: KH_TODO("ជាន់"),    emoji: "👟" },
      { en: "Seatbelt",       kh: KH_TODO("ខ្សែក្រវាត់សុវត្ថិភាព"), emoji: "🪢" },
    ],
  },
  {
    id: "furniture", en: "Furniture", kh: KH_TODO("គ្រឿងសង្ហារឹម"), icon: Armchair, color: "sky",
    items: [
      { en: "Chair",  kh: KH_TODO("កៅអី"),    emoji: "🪑" },
      { en: "Table",  kh: KH_TODO("តុ"),      emoji: "🪜" },
      { en: "Sofa",   kh: KH_TODO("សាឡុង"), emoji: "🛋️" },
      { en: "Shelf",  kh: KH_TODO("ធ្នើ"),   emoji: "📚" },
      { en: "Drawer", kh: KH_TODO("ថត"),     emoji: "🗄️" },
      { en: "Stool",  kh: KH_TODO("កៅអីតូច"), emoji: "🪑" },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────── */

export function VocabularyModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);

  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const tone = COLOR[active.color];

  function playAudio(word: string) {
    alert((kh ? KH_TODO("អូឌីយ៉ូនឹងបន្ថែមនៅពេលក្រោយ — ") : "Audio coming soon — ") + word);
  }

  return (
    <section
      aria-labelledby="vocab-heading"
      className="rounded-3xl border-4 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-violet-50 shadow-md p-5 sm:p-7"
    >
      {/* Header */}
      <header className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span className={kh ? "font-khmer normal-case tracking-normal text-xs" : ""}>
            {kh ? KH_TODO("វាក្យសព្ទប្រចាំថ្ងៃ") : "Everyday Vocabulary"}
          </span>
        </div>
        <h2
          id="vocab-heading"
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold ${kh ? "font-khmer leading-snug" : ""}`}
        >
          <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">
            {kh
              ? KH_TODO("ពាក្យដែលអ្នកប្រើជារៀងរាល់ថ្ងៃ")
              : "Words you use every day"}
          </span>
        </h2>
        <p className={`mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
          {kh
            ? KH_TODO("ជ្រើសរើសបន្ទប់ ឬកន្លែង — បន្ទាប់មករៀនពាក្យដែលនៅទីនោះ!")
            : "Pick a room or place — then learn the words you'll find there!"}
        </p>
      </header>

      {/* ── Category navigation ──────────────────────────────── */}
      <SubsectionHeader
        kh={kh}
        en="1. Pick a Category"
        khText={KH_TODO("១. ជ្រើសរើសប្រភេទ")}
      />

      <div
        role="tablist"
        aria-label={kh ? "ប្រភេទវាក្យសព្ទ" : "Vocabulary categories"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 mb-6"
      >
        {CATEGORIES.map((c) => {
          const isActive = c.id === activeId;
          const t = COLOR[c.color];
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`vocab-panel-${c.id}`}
              id={`vocab-tab-${c.id}`}
              onClick={() => setActiveId(c.id)}
              className={`group flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 p-2 sm:p-3 text-center transition-all duration-150 active:scale-95 ${
                isActive
                  ? `${t.activeBg} ${t.activeBorder} text-white shadow-lg scale-[1.03]`
                  : `bg-white border-slate-200 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5`
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? "bg-white/20" : `${t.iconBg} ${t.iconText}`
                }`}
              >
                <c.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span
                className={`font-bold text-xs sm:text-sm leading-tight ${kh ? "font-khmer text-sm sm:text-base" : ""} ${
                  isActive ? "text-white" : "text-slate-800"
                }`}
              >
                {kh ? c.kh : c.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active flashcard panel ───────────────────────────── */}
      <SubsectionHeader
        kh={kh}
        en={`2. Words: ${active.en}`}
        khText={KH_TODO(`២. ពាក្យ៖ ${active.kh}`)}
      />

      <div
        role="tabpanel"
        id={`vocab-panel-${active.id}`}
        aria-labelledby={`vocab-tab-${active.id}`}
        key={active.id}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        {active.items.map((it) => (
          <article
            key={it.en}
            className={`group rounded-2xl border-4 bg-gradient-to-br ${tone.card} p-3 sm:p-4 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col`}
          >
            {/* Big illustrative emoji (placeholder for future custom images) */}
            <div
              className="w-full aspect-square rounded-xl bg-white/70 flex items-center justify-center text-5xl sm:text-6xl shadow-inner mb-2 select-none"
              aria-hidden
            >
              {it.emoji}
            </div>

            {/* English word — large, school-friendly */}
            <div className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
              {it.en}
            </div>

            {/* Khmer translation placeholder slot */}
            <div className="mt-1.5 rounded-md bg-white/80 border border-dashed border-slate-300 px-2 py-1">
              <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400">
                Khmer Translation Here
              </div>
              <div className={`font-khmer text-base text-slate-700 leading-snug ${kh ? "" : "italic opacity-80"}`}>
                {it.kh}
              </div>
            </div>

            {/* Audio placeholder button */}
            <button
              type="button"
              onClick={() => playAudio(it.en)}
              className={`mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 ${tone.activeBorder.replace("border-", "border-")} font-bold text-xs ${tone.iconText} hover:shadow active:scale-95 transition-all`}
              aria-label={`Play audio for ${it.en} (coming soon)`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {kh ? KH_TODO("ស្ដាប់") : "Play Audio"}
            </button>
          </article>
        ))}
      </div>

      {/* Helper hint */}
      <p
        className={`mt-5 text-center text-xs sm:text-sm text-slate-500 ${kh ? "font-khmer text-sm sm:text-base" : ""}`}
      >
        <BookOpen className="inline w-4 h-4 mr-1 -mt-0.5 text-slate-400" />
        {kh
          ? KH_TODO("ប្ដូររវាងប្រភេទដើម្បីមើលពាក្យផ្សេងៗ — មានតែប្រភេទមួយដែលបានបើក្នុងពេលតែមួយ។")
          : "Switch between categories above to see different words — only one is shown at a time."}
      </p>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function SubsectionHeader({
  kh, en, khText,
}: { kh: boolean; en: string; khText: string }) {
  return (
    <div className="mb-3 rounded-2xl border-2 bg-gradient-to-r from-sky-100 to-violet-100 border-sky-300 text-sky-800 px-4 py-2.5">
      <div className={`font-display font-extrabold text-base sm:text-lg leading-tight ${kh ? "font-khmer text-lg sm:text-xl leading-loose" : ""}`}>
        {kh ? khText : en}
      </div>
      {kh && <div className="text-[10px] italic opacity-70 mt-0.5">{en}</div>}
    </div>
  );
}
