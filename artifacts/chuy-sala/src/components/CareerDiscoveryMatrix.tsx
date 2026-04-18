import { useState } from "react";
import {
  Wrench, Calculator, HeartHandshake, Microscope, Palette,
  Briefcase, GraduationCap, TrendingUp, Sparkles, RotateCcw, ArrowRight, Compass,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type CategoryId = "build" | "numbers" | "helping" | "nature" | "art";
type Demand = "high" | "medium" | "low";

type Job = { en: string; kh: string };

type Category = {
  id: CategoryId;
  Icon: ComponentType<{ className?: string }>;
  label: { en: string; kh: string };
  tagline: { en: string; kh: string };
  blurb: { en: string; kh: string };
  vocational: Job[];
  university: Job[];
  demand: Demand;
  demandReason: { en: string; kh: string };
  accent: { ring: string; bg: string; chip: string; soft: string; text: string };
};

const CATEGORIES: Category[] = [
  {
    id: "build",
    Icon: Wrench,
    label:   { en: "Fixing & Building",  kh: "ការជួសជុល និងការសាងសង់" },
    tagline: { en: "For hands-on learners",
               kh: "សម្រាប់អ្នករៀនតាមរយៈការអនុវត្តដោយផ្ទាល់" },
    blurb:   { en: "You learn by doing — taking things apart, putting them back together, and fixing what's broken.",
               kh: "អ្នករៀនតាមរយៈការធ្វើ — បំបែករបស់ ផ្គុំវាមកវិញ និងជួសជុលអ្វីៗដែលខូច។" },
    vocational: [
      { en: "Solar Panel Technician",      kh: "ជាងតម្លើងផ្ទាំងថាមពលព្រះអាទិត្យ" },
      { en: "Air-Conditioning Mechanic",   kh: "ជាងជួសជុលម៉ាស៊ីនត្រជាក់" },
      { en: "Auto / Motorbike Mechanic",   kh: "ជាងជួសជុលរថយន្ត / ម៉ូតូ" },
      { en: "Construction Foreman",        kh: "ប្រធានក្រុមសំណង់" },
      { en: "Welder",                      kh: "ជាងផ្សារដែក" },
    ],
    university: [
      { en: "Mechanical Engineering",      kh: "វិស្វកម្មមេកានិច" },
      { en: "Electrical Engineering",      kh: "វិស្វកម្មអគ្គិសនី" },
      { en: "Civil Engineering",           kh: "វិស្វកម្មសំណង់ស៊ីវិល" },
      { en: "Architecture",                kh: "ស្ថាបត្យកម្ម" },
    ],
    demand: "high",
    demandReason: {
      en: "Cambodia is building roads, factories and solar farms faster than ever — skilled hands are in short supply.",
      kh: "កម្ពុជាកំពុងសាងសង់ផ្លូវ រោងចក្រ និងកសិដ្ឋានថាមពលព្រះអាទិត្យកាន់តែលឿនជាងពេលណាៗ — ជាងជំនាញនៅខ្វះខាត។",
    },
    accent: {
      ring: "border-orange-300", bg: "bg-orange-50", chip: "bg-orange-600",
      soft: "from-orange-50 to-amber-50", text: "text-orange-800",
    },
  },
  {
    id: "numbers",
    Icon: Calculator,
    label:   { en: "Numbers & Patterns", kh: "លេខ និងលំនាំ" },
    tagline: { en: "For logical thinkers",
               kh: "សម្រាប់អ្នកគិតបែបតក្កវិជ្ជា" },
    blurb:   { en: "You enjoy puzzles, spreadsheets, and finding the rule behind a sequence.",
               kh: "អ្នកចូលចិត្តប៉ុមប៉ាម តារាងគណនា និងការស្វែងរកច្បាប់នៅពីក្រោយលំនាំ។" },
    vocational: [
      { en: "Bookkeeper / Accounting Assistant", kh: "អ្នកកត់ត្រាគណនី / ជំនួយការគណនេយ្យ" },
      { en: "Bank Teller",                       kh: "បុគ្គលិកធនាគារ" },
      { en: "Logistics Coordinator",             kh: "អ្នកសម្របសម្រួលដឹកជញ្ជូន" },
      { en: "Junior Web Developer",              kh: "អ្នកអភិវឌ្ឍគេហទំព័រដំបូង" },
    ],
    university: [
      { en: "Computer Science / Software Engineering", kh: "វិទ្យាសាស្ត្រកុំព្យូទ័រ / វិស្វកម្មសូហ្វវែរ" },
      { en: "Finance & Banking",                kh: "ហិរញ្ញវត្ថុ និងធនាគារ" },
      { en: "Accounting",                       kh: "គណនេយ្យ" },
      { en: "Data Science / Statistics",        kh: "វិទ្យាសាស្ត្រទិន្នន័យ / ស្ថិតិ" },
      { en: "Actuarial Science",                kh: "វិទ្យាសាស្ត្រគណនាបុរេសន្និដ្ឋាន" },
    ],
    demand: "high",
    demandReason: {
      en: "Phnom Penh's banks, fintech startups and software companies hire constantly — and pay well.",
      kh: "ធនាគារ ក្រុមហ៊ុនបច្ចេកវិទ្យាហិរញ្ញវត្ថុ និងក្រុមហ៊ុនសូហ្វវែរនៅភ្នំពេញកំពុងជ្រើសរើសបុគ្គលិកជានិច្ច — ហើយផ្ដល់ប្រាក់ខែល្អ។",
    },
    accent: {
      ring: "border-blue-300", bg: "bg-blue-50", chip: "bg-blue-700",
      soft: "from-blue-50 to-sky-50", text: "text-blue-800",
    },
  },
  {
    id: "helping",
    Icon: HeartHandshake,
    label:   { en: "Helping & Teaching", kh: "ការជួយ និងការបង្រៀន" },
    tagline: { en: "For social, empathetic thinkers",
               kh: "សម្រាប់អ្នកគិតបែបសង្គម និងយល់ចិត្តគេ" },
    blurb:   { en: "You light up when you can explain something well or comfort a friend who's struggling.",
               kh: "អ្នកមានសុភមង្គល នៅពេលអ្នកអាចពន្យល់រឿងណាមួយបានច្បាស់ ឬកម្សាន្តចិត្តមិត្តភក្តិដែលកំពុងមានបញ្ហា។" },
    vocational: [
      { en: "Nursing Assistant",          kh: "ជំនួយការគិលានុបដ្ឋាក" },
      { en: "Childcare Worker",           kh: "បុគ្គលិកថែទាំកុមារ" },
      { en: "NGO Field Officer",          kh: "មន្ត្រីការងារនៅអង្គការមិនមែនរដ្ឋាភិបាល" },
      { en: "Community Health Worker",    kh: "បុគ្គលិកសុខាភិបាលសហគមន៍" },
    ],
    university: [
      { en: "Education / Teaching",       kh: "អប់រំ / ការបង្រៀន" },
      { en: "Nursing",                    kh: "គិលានុបដ្ឋាក" },
      { en: "Social Work",                kh: "ការងារសង្គម" },
      { en: "Public Health",              kh: "សុខភាពសាធារណៈ" },
      { en: "Psychology / Counselling",   kh: "ចិត្តវិទ្យា / ការប្រឹក្សា" },
    ],
    demand: "high",
    demandReason: {
      en: "Cambodia urgently needs more teachers, nurses and counsellors — especially in provinces outside Phnom Penh.",
      kh: "កម្ពុជាត្រូវការបន្ថែមនូវគ្រូបង្រៀន គិលានុបដ្ឋាក និងអ្នកប្រឹក្សាជាបន្ទាន់ — ជាពិសេសនៅខេត្តក្រៅភ្នំពេញ។",
    },
    accent: {
      ring: "border-rose-300", bg: "bg-rose-50", chip: "bg-rose-700",
      soft: "from-rose-50 to-pink-50", text: "text-rose-800",
    },
  },
  {
    id: "nature",
    Icon: Microscope,
    label:   { en: "Nature & Science", kh: "ធម្មជាតិ និងវិទ្យាសាស្ត្រ" },
    tagline: { en: "For curious, research-oriented minds",
               kh: "សម្រាប់អ្នកមានចិត្តចង់ដឹង និងស្រឡាញ់ការស្រាវជ្រាវ" },
    blurb:   { en: "You ask 'why?' a lot — about plants, animals, the body, the weather, the stars.",
               kh: "អ្នកចូលចិត្តសួរ 'ហេតុអ្វី?' — អំពីរុក្ខជាតិ សត្វ រាងកាយ អាកាសធាតុ និងផ្កាយ។" },
    vocational: [
      { en: "Agricultural Technician",   kh: "ជាងបច្ចេកទេសកសិកម្ម" },
      { en: "Laboratory Assistant",      kh: "ជំនួយការមន្ទីរពិសោធន៍" },
      { en: "Veterinary Assistant",      kh: "ជំនួយការពេទ្យសត្វ" },
      { en: "Eco-Tour Guide / Park Ranger", kh: "មគ្គុទ្ទេសក៍ទេសចរណ៍បរិស្ថាន / ឆ្មាំឧទ្យាន" },
    ],
    university: [
      { en: "Agronomy / Agricultural Science", kh: "កសិកម្មវិទ្យា" },
      { en: "Pharmacy",                  kh: "ឱសថការី" },
      { en: "Biology",                   kh: "ជីវវិទ្យា" },
      { en: "Environmental Science",     kh: "វិទ្យាសាស្ត្របរិស្ថាន" },
      { en: "Medicine",                  kh: "វេជ្ជសាស្ត្រ" },
    ],
    demand: "medium",
    demandReason: {
      en: "Climate change and food security are creating new science jobs — agronomy and environmental specialists are increasingly valued.",
      kh: "ការប្រែប្រួលអាកាសធាតុ និងសុវត្ថិភាពស្បៀងបង្កើតការងារវិទ្យាសាស្ត្រថ្មីៗ — អ្នកជំនាញកសិកម្ម និងបរិស្ថានកាន់តែមានតម្លៃខ្ពស់។",
    },
    accent: {
      ring: "border-emerald-300", bg: "bg-emerald-50", chip: "bg-emerald-700",
      soft: "from-emerald-50 to-lime-50", text: "text-emerald-800",
    },
  },
  {
    id: "art",
    Icon: Palette,
    label:   { en: "Art & Design", kh: "សិល្បៈ និងការរចនា" },
    tagline: { en: "For creative, visual thinkers",
               kh: "សម្រាប់អ្នកគិតបែបច្នៃប្រឌិត និងបែបរូបភាព" },
    blurb:   { en: "You see the world in colour, line and shape — drawing, decorating, dreaming up new things.",
               kh: "អ្នកមើលឃើញពិភពលោកជាពណ៌ ខ្សែ និងរូបរាង — គូរ តុបតែង និងគិតគូររឿងថ្មីៗ។" },
    vocational: [
      { en: "Graphic Designer",          kh: "អ្នករចនាក្រាហ្វិក" },
      { en: "Tailor / Fashion Maker",    kh: "ជាងកាត់ដេរ / អ្នកផលិតម៉ូដ" },
      { en: "Photographer / Videographer", kh: "ជាងថត / អ្នកថតវីដេអូ" },
      { en: "Furniture Maker",           kh: "ជាងផលិតគ្រឿងសង្ហារឹម" },
      { en: "Interior Decorator",        kh: "អ្នកតុបតែងផ្ទៃខាងក្នុង" },
    ],
    university: [
      { en: "Architecture",              kh: "ស្ថាបត្យកម្ម" },
      { en: "Graphic Design",            kh: "ការរចនាក្រាហ្វិក" },
      { en: "Fashion Design",            kh: "ការរចនាម៉ូដសម្លៀកបំពាក់" },
      { en: "Animation & Multimedia",    kh: "គំនូរជីវចល និងពហុមេឌា" },
      { en: "Film Production",           kh: "ផលិតកម្មភាពយន្ត" },
    ],
    demand: "medium",
    demandReason: {
      en: "Cambodia's creative economy is growing fast — startups, tourism brands and the film industry all need designers.",
      kh: "សេដ្ឋកិច្ចច្នៃប្រឌិតរបស់កម្ពុជាកំពុងរីកលូតលាស់យ៉ាងលឿន — ក្រុមហ៊ុនថ្មី ម៉ាកទេសចរណ៍ និងឧស្សាហកម្មភាពយន្ត ត្រូវការអ្នករចនា។",
    },
    accent: {
      ring: "border-fuchsia-300", bg: "bg-fuchsia-50", chip: "bg-fuchsia-700",
      soft: "from-fuchsia-50 to-purple-50", text: "text-fuchsia-800",
    },
  },
];

const DEMAND_META: Record<Demand, { en: string; kh: string; cls: string; barCount: number }> = {
  high:   { en: "High",   kh: "ខ្ពស់",      cls: "bg-emerald-100 text-emerald-800 border-emerald-300", barCount: 3 },
  medium: { en: "Medium", kh: "មធ្យម",     cls: "bg-amber-100 text-amber-800 border-amber-300",       barCount: 2 },
  low:    { en: "Low",    kh: "ទាប",       cls: "bg-stone-100 text-stone-700 border-stone-300",       barCount: 1 },
};

export function CareerDiscoveryMatrix() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [selectedId, setSelectedId] = useState<CategoryId | null>(null);
  const selected = CATEGORIES.find(c => c.id === selectedId) ?? null;

  return (
    <div className="rounded-3xl bg-white border-2 border-primary/20 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-primary/5 via-amber-50/40 to-white border-b border-border">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-primary/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Compass className="w-3.5 h-3.5" />
          <span>{kh ? "ម៉ាទ្រីសស្វែងរកអាជីព" : "Career Discovery Matrix"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "តើអ្នកសប្បាយចិត្តនឹងធ្វើអ្វី?" : "What do you enjoy?"}
        </h3>
        <p className={`mt-1 text-sm text-muted-foreground max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ជ្រើសរើសប្រភេទដែលទាក់ទាញចិត្តអ្នកបំផុត — ហើយមើលផ្លូវវិជ្ជាជីវៈ និងផ្លូវសាកលវិទ្យាល័យដែលត្រូវនឹងអ្នក រួមជាមួយតម្រូវការទីផ្សារនៅកម្ពុជា។"
            : "Pick the category that pulls at your heart the most — and see the vocational and university paths that fit you, plus how much demand they have in Cambodia today."}
        </p>
      </div>

      {/* Selection grid — large tappable cards */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {CATEGORIES.map(c => {
            const Icon = c.Icon;
            const isOn = selectedId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                aria-pressed={isOn}
                className={`group relative text-left rounded-2xl border-2 p-3 sm:p-4 min-h-[120px] sm:min-h-[140px] transition-all duration-200 active:scale-[0.97] ${
                  isOn
                    ? `${c.accent.ring} ${c.accent.bg} shadow-md scale-[1.02]`
                    : "border-border bg-white hover:border-stone-400 hover:shadow-sm"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-2 transition-colors ${
                  isOn ? c.accent.chip : "bg-stone-400 group-hover:bg-stone-500"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-sm font-bold leading-tight ${isOn ? c.accent.text : "text-foreground"} ${kh ? "font-khmer leading-snug" : ""}`}>
                  {kh ? c.label.kh : c.label.en}
                </div>
                <div className={`mt-1 text-[11px] text-muted-foreground leading-snug ${kh ? "font-khmer text-xs leading-loose" : ""}`}>
                  {kh ? c.tagline.kh : c.tagline.en}
                </div>
                {isOn && (
                  <span className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white border border-current text-current">
                    <Sparkles className={`w-3 h-3 ${c.accent.text}`} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Reset / hint row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs text-muted-foreground ${kh ? "font-khmer leading-loose" : ""}`}>
            {selected
              ? (kh ? "ចង់សាកល្បងខ្លួនអ្នកបែបផ្សេង? ចុច 'ចាប់ផ្តើមឡើងវិញ'។" : "Want to explore a different version of yourself? Hit 'Reset'.")
              : (kh ? "ចុចលើប័ណ្ណណាមួយ ដើម្បីមើលអាជីពដែលត្រូវនឹងអ្នក។" : "Tap any card to see the careers that match you.")}
          </p>
          {selected && (
            <button
              onClick={() => setSelectedId(null)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200 transition ${kh ? "font-khmer" : ""}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {kh ? "ចាប់ផ្តើមឡើងវិញ" : "Reset"}
            </button>
          )}
        </div>
      </div>

      {/* Result card */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          selected ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-live="polite"
      >
        {selected && <ResultCard category={selected} kh={kh} />}
      </div>
    </div>
  );
}

function ResultCard({ category: c, kh }: { category: Category; kh: boolean }) {
  const Icon = c.Icon;
  const dm = DEMAND_META[c.demand];
  return (
    <div className="border-t border-border p-5 sm:p-7">
      {/* Identity strip */}
      <div className={`flex items-center gap-3 sm:gap-4 mb-5 p-4 rounded-2xl bg-gradient-to-br ${c.accent.soft} border ${c.accent.ring}`}>
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 ${c.accent.chip}`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-mono uppercase tracking-widest ${c.accent.text} opacity-80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ប្រូហ្វាយរបស់អ្នក" : "Your profile"}
          </div>
          <div className={`font-bold text-base sm:text-lg ${c.accent.text} ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? c.label.kh : c.label.en}
          </div>
          <p className={`text-xs sm:text-sm text-stone-700 mt-0.5 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? c.blurb.kh : c.blurb.en}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Vocational column */}
        <PathColumn
          Icon={Briefcase}
          titleEn="Vocational Path"
          titleKh="ផ្លូវវិជ្ជាជីវៈ"
          subEn="Skill-based training, often 6 months to 2 years."
          subKh="ការបណ្តុះបណ្តាលជំនាញ ច្រើនតែ ៦ ខែ ដល់ ២ ឆ្នាំ។"
          color="bg-stone-700"
          jobs={c.vocational}
          kh={kh}
        />
        <PathColumn
          Icon={GraduationCap}
          titleEn="University Path"
          titleKh="ផ្លូវសាកលវិទ្យាល័យ"
          subEn="Bachelor's degree, usually 4 years."
          subKh="សញ្ញាបត្របរិញ្ញាបត្រ ច្រើនតែ ៤ ឆ្នាំ។"
          color="bg-primary"
          jobs={c.university}
          kh={kh}
        />
      </div>

      {/* Demand row */}
      <div className="mt-5 rounded-2xl border border-border bg-stone-50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-stone-700" />
            <span className={`font-bold text-sm text-foreground ${kh ? "font-khmer" : ""}`}>
              {kh ? "តម្រូវការទីផ្សារនៅកម្ពុជា" : "Cambodian Market Demand"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DemandBars count={dm.barCount} />
            <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${dm.cls} ${kh ? "font-khmer" : ""}`}>
              {kh ? dm.kh : dm.en}
            </span>
          </div>
        </div>
        <p className={`text-xs sm:text-sm text-stone-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? c.demandReason.kh : c.demandReason.en}
        </p>
      </div>

      <p className={`mt-4 text-[11px] text-stone-500 italic ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {kh
          ? "កំណត់សម្គាល់៖ ការវាយតម្លៃតម្រូវការទីផ្សារផ្អែកលើនិន្នាការសេដ្ឋកិច្ចកម្ពុជាបច្ចុប្បន្ន។ ការវិវឌ្ឍន៍ផ្ទាល់ខ្លួនរបស់អ្នកមកពីអ្វីដែលអ្នកស្រឡាញ់ — មិនមែនពីលេខទេ។"
          : "Note: market demand reflects current Cambodian economic trends. Your real growth comes from what you love — not from a number."}
      </p>
    </div>
  );
}

function PathColumn({
  Icon, titleEn, titleKh, subEn, subKh, color, jobs, kh,
}: {
  Icon: ComponentType<{ className?: string }>;
  titleEn: string; titleKh: string;
  subEn: string;   subKh: string;
  color: string;
  jobs: Job[];
  kh: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden">
      <div className={`${color} text-white px-4 py-3 flex items-center gap-2.5`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <div className="min-w-0">
          <div className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>{kh ? titleKh : titleEn}</div>
          <div className={`text-[11px] text-white/80 ${kh ? "font-khmer text-xs leading-loose" : ""}`}>
            {kh ? subKh : subEn}
          </div>
        </div>
      </div>
      <ul className="p-3 sm:p-4 space-y-2">
        {jobs.map((j, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
            <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-stone-400" />
            <span className="flex-1 leading-snug">
              <span className={kh ? "font-khmer leading-loose" : "font-medium"}>
                {kh ? j.kh : j.en}
              </span>
              {kh && (
                <span className="block text-[11px] text-stone-500 mt-0.5">{j.en}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemandBars({ count }: { count: number }) {
  return (
    <div className="flex items-end gap-0.5" aria-hidden="true">
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`w-1.5 rounded-sm transition-colors ${
            i <= count
              ? (count === 3 ? "bg-emerald-600" : count === 2 ? "bg-amber-500" : "bg-stone-400")
              : "bg-stone-200"
          }`}
          style={{ height: `${4 + i * 4}px` }}
        />
      ))}
    </div>
  );
}
