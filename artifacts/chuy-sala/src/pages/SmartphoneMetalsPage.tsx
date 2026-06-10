import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Smartphone, Layers, MonitorPlay, Mic, Cpu, BatteryCharging, BoxSelect } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Element Data Dictionary ──────────────────────────────────────────────────
type ElementCategory = "Alkali Metal" | "Alkaline Earth" | "Transition Metal" | "Basic Metal" | "Lanthanoid";

interface ElementData {
  num: number;
  symbol: string;
  nameEn: string;
  nameKh: string;
  category: ElementCategory;
}

const ELEMENTS: Record<string, ElementData> = {
  Li: { num: 3, symbol: "Li", nameEn: "Lithium", nameKh: "លីចូម", category: "Alkali Metal" },
  Mg: { num: 12, symbol: "Mg", nameEn: "Magnesium", nameKh: "ម៉ាញេស្យូម", category: "Alkaline Earth" },
  Co: { num: 27, symbol: "Co", nameEn: "Cobalt", nameKh: "កូបាល់", category: "Transition Metal" },
  Ni: { num: 28, symbol: "Ni", nameEn: "Nickel", nameKh: "នីកែល", category: "Transition Metal" },
  Ga: { num: 31, symbol: "Ga", nameEn: "Gallium", nameKh: "កាល្យូម", category: "Basic Metal" },
  In: { num: 49, symbol: "In", nameEn: "Indium", nameKh: "ឥណ្ឌូម", category: "Basic Metal" },
  La: { num: 57, symbol: "La", nameEn: "Lanthanum", nameKh: "ឡង់តាន", category: "Lanthanoid" },
  Pr: { num: 59, symbol: "Pr", nameEn: "Praseodymium", nameKh: "ប្រាសេអូឌីម", category: "Lanthanoid" },
  Nd: { num: 60, symbol: "Nd", nameEn: "Neodymium", nameKh: "នេអូឌីម", category: "Lanthanoid" },
  Eu: { num: 63, symbol: "Eu", nameEn: "Europium", nameKh: "អឺរ៉ូប៉្យូម", category: "Lanthanoid" },
  Gd: { num: 64, symbol: "Gd", nameEn: "Gadolinium", nameKh: "កាដូលីនីញ៉ូម", category: "Lanthanoid" },
  Tb: { num: 65, symbol: "Tb", nameEn: "Terbium", nameKh: "ទែប៊ីញ៉ូម", category: "Lanthanoid" },
  Dy: { num: 66, symbol: "Dy", nameEn: "Dysprosium", nameKh: "ឌីសប្រូស្យូម", category: "Lanthanoid" },
  Ta: { num: 73, symbol: "Ta", nameEn: "Tantalum", nameKh: "តង់តាល់", category: "Transition Metal" },
};

const CATEGORY_COLORS: Record<ElementCategory, string> = {
  "Alkali Metal": "bg-rose-500/20 border-rose-500 text-rose-300",
  "Alkaline Earth": "bg-orange-500/20 border-orange-500 text-orange-300",
  "Transition Metal": "bg-amber-500/20 border-amber-500 text-amber-300",
  "Basic Metal": "bg-blue-500/20 border-blue-500 text-blue-300",
  "Lanthanoid": "bg-purple-500/20 border-purple-500 text-purple-300",
};

// ── Components Data ──────────────────────────────────────────────────────────
type ComponentId = "touch" | "display" | "mic" | "electronics" | "battery" | "casing";

interface PhoneComponent {
  id: ComponentId;
  labelEn: string;
  labelKh: string;
  icon: any;
  descEn: string;
  descKh: string;
  elements: string[];
}

const PHONE_COMPONENTS: PhoneComponent[] = [
  {
    id: "touch",
    labelEn: "Touch Screen",
    labelKh: "អេក្រង់ប៉ះ",
    icon: Layers,
    descEn: "A transparent, conductive layer of Indium Tin Oxide (ITO) allows the screen to register your fingertips without blocking the light beneath it.",
    descKh: "ស្រទាប់ថ្លានិងចម្លងអគ្គិសនីនៃ Indium Tin Oxide (ITO) អនុញ្ញាតឱ្យអេក្រង់កត់ត្រាចុងម្រាមដៃរបស់អ្នកដោយមិនបិទបាំងពន្លឺពីខាងក្រោម។",
    elements: ["In"],
  },
  {
    id: "display",
    labelEn: "Display Colors",
    labelKh: "ពណ៌អេក្រង់",
    icon: MonitorPlay,
    descEn: "Rare earth elements are used to produce the vibrant red, green, and blue phosphors that create the vivid images on your screen.",
    descKh: "ធាតុRare Earthត្រូវបានប្រើដើម្បីបង្កើតសារធាតុផូស្វ័រពណ៌ក្រហម បៃតង និងខៀវយ៉ាងរស់រវើក ដែលបង្កើតរូបភាពច្បាស់នៅលើអេក្រង់របស់អ្នក។",
    elements: ["La", "Pr", "Eu", "Gd", "Tb", "Dy"],
  },
  {
    id: "mic",
    labelEn: "Mic, Speakers & Vibration",
    labelKh: "មីក្រូហ្វូន ឧបករណ៍បំពងសំឡេង និងរំញ័រ",
    icon: Mic,
    descEn: "Powerful miniature magnets made from Neodymium and other rare earths allow your phone to vibrate and produce loud, clear audio from tiny speakers.",
    descKh: "មេដែកតូចៗដ៏មានឥទ្ធិពលធ្វើពី Neodymium និងRare Earthផ្សេងទៀត អនុញ្ញាតឱ្យទូរសព្ទរបស់អ្នកញ័រ និងបង្កើតសំឡេងខ្លាំងច្បាស់ពីឧបករណ៍បំពងសំឡេងតូចៗ។",
    elements: ["Ni", "Pr", "Nd", "Gd", "Tb", "Dy"],
  },
  {
    id: "electronics",
    labelEn: "Electronics & Brain",
    labelKh: "អេឡិចត្រូនិច និងខួរក្បាល",
    icon: Cpu,
    descEn: "Tantalum capacitors store energy, while Gallium is used in the radio-frequency amplifiers that connect your phone to 5G cell towers.",
    descKh: "កុងដង់ Tantalum ផ្ទុកថាមពល ខណៈដែល Gallium ត្រូវបានប្រើនៅក្នុងឧបករណ៍ពង្រីកប្រេកង់វិទ្យុដែលភ្ជាប់ទូរសព្ទរបស់អ្នកទៅអង់តែន 5G។",
    elements: ["Ni", "Ga", "Ta"],
  },
  {
    id: "battery",
    labelEn: "Battery",
    labelKh: "ថ្ម",
    icon: BatteryCharging,
    descEn: "Lithium-ion batteries rely on Lithium to move charge, while Cobalt and Nickel are used in the cathodes to pack maximum energy into a tiny, safe space.",
    descKh: "ថ្ម Lithium-ion ពឹងផ្អែកលើ Lithium ដើម្បីផ្លាស់ទីបន្ទុកអគ្គិសនី ខណៈពេលដែល Cobalt និង Nickel ត្រូវបានប្រើនៅក្នុងកាតូតដើម្បីផ្ទុកថាមពលអតិបរមាទៅក្នុងចន្លោះតូចនិងមានសុវត្ថិភាព។",
    elements: ["Li", "Co", "Ni"],
  },
  {
    id: "casing",
    labelEn: "Casing",
    labelKh: "សំបក",
    icon: BoxSelect,
    descEn: "Lightweight, durable metal alloys like Magnesium and Nickel are often used to protect the fragile internal components from drops and bends.",
    descKh: "លោហៈធាតុទម្ងន់ស្រាលនិងប្រើប្រាស់បានយូរដូចជា Magnesium និង Nickel ជារឿយៗត្រូវបានប្រើដើម្បីការពារសមាសធាតុខាងក្នុងដែលងាយផុយស្រួយពីការធ្លាក់ និងការពត់។",
    elements: ["Mg", "Ni"],
  },
];

export default function SmartphoneMetalsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [activeTab, setActiveTab] = useState<ComponentId>("touch");
  const activeComponent = PHONE_COMPONENTS.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/science/materials"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Materials Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រសម្ភារៈ")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border-2 border-indigo-400/60 text-indigo-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Anatomy of a Smartphone", "កាយវិភាគវិទ្យានៃស្មាតហ្វូន")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Explore the critical metals and rare earth elements that power modern life.", "ស្វែងយល់ពីលោហៈសំខាន់ៗ និងធាតុRare Earthដែលផ្តល់ថាមពលដល់ជីវិតសម័យទំនើប។")}
              </p>
            </div>
          </div>
        </div>

        {/* Concept Explanation */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold text-indigo-400 ${kh ? "font-khmer" : ""}`}>
              {t("Earth in Your Pocket", "ផែនដីនៅក្នុងហោប៉ៅរបស់អ្នក")}
            </h2>
            <p className={`text-slate-300 text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A smartphone is a marvel of modern chemistry. It contains over 60 different elements from the periodic table. Many of these are 'Critical Metals' or 'Rare Earth Elements' — highly specialized materials that are difficult to mine, geometrically scarce, or concentrated in only a few countries.",
                "ស្មាតហ្វូនគឺជាអព្ភូតហេតុនៃគីមីវិទ្យាសម័យទំនើប។ វាមានផ្ទុកធាតុជាង ៦០ ផ្សេងៗគ្នាពីតារាងខួប។ ជាច្រើននៃធាតុទាំងនេះគឺជា 'លោហៈសំខាន់ៗ' ឬ 'ធាតុRare Earth' — សម្ភារៈជំនាញខ្ពស់ដែលពិបាកក្នុងការជីកយករ៉ែ កម្រនៅក្នុងភូមិសាស្ត្រ ឬប្រមូលផ្តុំនៅក្នុងប្រទេសមួយចំនួនប៉ុណ្ណោះ។"
              )}
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 ${kh ? "font-khmer tracking-normal" : ""}`}>
              {t("Element Categories Legend", "និមិត្តសញ្ញាប្រភេទទិដ្ឋភាពទូទៅ")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(CATEGORY_COLORS).map(([cat, colorClass]) => (
                <div key={cat} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 ${colorClass}`} />
                  <span className={`text-sm text-slate-300 ${kh ? "font-khmer" : ""}`}>
                    {t(
                      cat, 
                      cat === "Alkali Metal" ? "លោហៈអាល់កាឡាំង" : 
                      cat === "Alkaline Earth" ? "លោហៈអាល់កាឡាំងផែនដី" :
                      cat === "Transition Metal" ? "លោហៈអន្តរកាល" :
                      cat === "Basic Metal" ? "លោហៈមូលដ្ឋាន" :
                      "ឡង់តាណូអ៊ីត (Rare Earth)"
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive 'Smartphone Teardown' Visualizer */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="w-6 h-6 text-indigo-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("Smartphone Teardown", "ការដោះកាយវិភាគស្មាតហ្វូន")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Component Menu */}
            <div className="lg:col-span-5 space-y-3">
              {PHONE_COMPONENTS.map((comp) => {
                const Icon = comp.icon;
                const isActive = activeTab === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveTab(comp.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 sm:py-[1.5vw] lg:py-4 rounded-2xl transition-all duration-300 border-2 text-left ${
                      isActive 
                        ? "bg-indigo-500/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                    <span className={`text-lg sm:text-[2vw] lg:text-lg font-bold ${kh ? "font-khmer" : ""}`}>
                      {kh ? comp.labelKh : comp.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Visualizer Output */}
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 flex flex-col min-h-[400px]">
              
              <div className="mb-8">
                <h3 className={`text-2xl sm:text-[2.5vw] lg:text-3xl font-black text-indigo-400 mb-4 ${kh ? "font-khmer" : ""}`}>
                  {kh ? activeComponent.labelKh : activeComponent.labelEn}
                </h3>
                <p className={`text-slate-300 text-lg sm:text-[1.8vw] lg:text-xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? activeComponent.descKh : activeComponent.descEn}
                </p>
              </div>

              <div className="mt-auto">
                <h4 className={`text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 ${kh ? "font-khmer tracking-normal" : ""}`}>
                  {t("Critical Elements Inside", "ធាតុសំខាន់ៗនៅខាងក្នុង")}
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {activeComponent.elements.map(sym => {
                    const el = ELEMENTS[sym];
                    const colorClass = CATEGORY_COLORS[el.category];
                    
                    return (
                      <div 
                        key={sym} 
                        className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all duration-500 animate-in fade-in zoom-in ${colorClass}`}
                      >
                        <div className="absolute top-2 left-2 text-xs sm:text-[1vw] lg:text-xs font-mono font-bold opacity-70">
                          {el.num}
                        </div>
                        <div className="text-3xl sm:text-[3vw] lg:text-4xl font-black font-display tracking-tight my-1">
                          {el.symbol}
                        </div>
                        <div className={`text-xs sm:text-[1.1vw] lg:text-sm font-bold opacity-90 ${kh ? "font-khmer" : ""}`}>
                          {kh ? el.nameKh : el.nameEn}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
