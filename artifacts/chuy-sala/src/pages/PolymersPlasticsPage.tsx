import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Recycle, FlaskConical, Droplets, ShieldAlert, CheckCircle2, AlertTriangle, Hammer, Leaf } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Plastic Data Dictionary ──────────────────────────────────────────────────
type PlasticId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface PlasticData {
  id: PlasticId;
  abbr: string;
  fullNameEn: string;
  fullNameKh: string;
  akaEn: string;
  akaKh: string;
  usesEn: string;
  usesKh: string;
  propertiesEn: string;
  propertiesKh: string;
  recyclability: "HIGH" | "MEDIUM" | "LOW";
  biodegradable: "NO";
  upcycleNotesEn: string;
  upcycleNotesKh: string;
  safeToCut: boolean;
  safeToHeat: boolean; // meaning relatively safe for DIY forming, with ventilation
}

const PLASTICS: Record<PlasticId, PlasticData> = {
  1: {
    id: 1,
    abbr: "PETE / PET",
    fullNameEn: "Polyethylene Terephthalate",
    fullNameKh: "ប៉ូលីអេទីឡែន តេរ៉េភូតាឡាត",
    akaEn: "Polyester",
    akaKh: "ប៉ូលីអេសស្ទែរ",
    usesEn: "Water bottles, soda bottles, clothing fibers, food jars.",
    usesKh: "ដបទឹក ដបសូដា សរសៃសម្លៀកបំពាក់ កែវចំណីអាហារ។",
    propertiesEn: "Clear, tough, solvent resistant, sinks in water.",
    propertiesKh: "ថ្លា រឹងមាំ ធន់នឹងសារធាតុរំលាយ លិចក្នុងទឹក។",
    recyclability: "HIGH",
    biodegradable: "NO",
    upcycleNotesEn: "Highly structural. Excellent for cutting into strips to make strong ropes, or building greenhouses and DIY water filters.",
    upcycleNotesKh: "មានរចនាសម្ព័ន្ធរឹងមាំខ្លាំង។ ល្អបំផុតសម្រាប់ការកាត់ជាបន្ទះដើម្បីធ្វើខ្សែពួររឹងមាំ ឬសាងសង់ផ្ទះកញ្ចក់ និងតម្រងទឹកកែច្នៃ។",
    safeToCut: true,
    safeToHeat: true,
  },
  2: {
    id: 2,
    abbr: "HDPE",
    fullNameEn: "High-Density Polyethylene",
    fullNameKh: "ប៉ូលីអេទីឡែន ដង់ស៊ីតេខ្ពស់",
    akaEn: "Milk jugs, strong plastic",
    akaKh: "កានទឹកដោះគោ ប្លាស្ទិករឹង",
    usesEn: "Milk jugs, shampoo bottles, pipes, toys, plastic lumber.",
    usesKh: "កានទឹកដោះគោ ដបសាប៊ូ បំពង់ ក្មេងលេង ឈើប្លាស្ទិក។",
    propertiesEn: "Opaque, tough, weather resistant, floats in water.",
    propertiesKh: "ស្រអាប់ រឹងមាំ ធន់នឹងអាកាសធាតុ អណ្តែតក្នុងទឹក។",
    recyclability: "HIGH",
    biodegradable: "NO",
    upcycleNotesEn: "The ultimate DIY plastic. It melts safely at low temps (around 130°C) without toxic fumes, allowing you to mould it into bricks, beams, or custom tools.",
    upcycleNotesKh: "ប្លាស្ទិកកែច្នៃដ៏ល្អបំផុត។ វារលាយដោយសុវត្ថិភាពនៅសីតុណ្ហភាពទាប (ប្រហែល 130°C) ដោយគ្មានផ្សែងពុល ដែលអនុញ្ញាតឱ្យអ្នកចាក់វាជាឥដ្ឋ ធ្នឹម ឬឧបករណ៍ផ្សេងៗ។",
    safeToCut: true,
    safeToHeat: true,
  },
  3: {
    id: 3,
    abbr: "PVC",
    fullNameEn: "Polyvinyl Chloride",
    fullNameKh: "ប៉ូលីវីនីល ក្លរួ",
    akaEn: "Vinyl",
    akaKh: "វីនីល",
    usesEn: "Plumbing pipes, medical tubing, wire insulation, rain boots.",
    usesKh: "បំពង់ទឹក បំពង់ពេទ្យ អ៊ីសូឡង់ខ្សែភ្លើង ស្បែកជើងកវែង។",
    propertiesEn: "Rigid (or flexible with plasticizers), fire resistant, tough.",
    propertiesKh: "រឹង (ឬអាចបត់បែនបានជាមួយសារធាតុបន្ថែម) ធន់នឹងភ្លើង រឹងមាំ។",
    recyclability: "LOW",
    biodegradable: "NO",
    upcycleNotesEn: "DANGER! Never heat or burn PVC. It releases highly toxic Chlorine gas and Dioxins. Safe to use as rigid structural pipes if cut with a handsaw.",
    upcycleNotesKh: "គ្រោះថ្នាក់! កុំដុត ឬកម្តៅ PVC ឱ្យសោះ។ វាបញ្ចេញឧស្ម័នក្លរីន និងឌីអុកស៊ីនដែលពុលខ្លាំង។ មានសុវត្ថិភាពក្នុងការប្រើជាបំពង់រចនាសម្ព័ន្ធរឹង ប្រសិនបើកាត់ដោយរណារដៃ។",
    safeToCut: true,
    safeToHeat: false,
  },
  4: {
    id: 4,
    abbr: "LDPE",
    fullNameEn: "Low-Density Polyethylene",
    fullNameKh: "ប៉ូលីអេទីឡែន ដង់ស៊ីតេទាប",
    akaEn: "Soft plastics, films",
    akaKh: "ប្លាស្ទិកទន់ ថង់ប្លាស្ទិក",
    usesEn: "Grocery bags, squeeze bottles, shrink wrap, bubble wrap.",
    usesKh: "ថង់ផ្សារ ដបច្របាច់ ថង់រុំ ថង់ពពុះ។",
    propertiesEn: "Flexible, soft, waxy feel, floats in water.",
    propertiesKh: "បត់បែន ទន់ មានអារម្មណ៍ដូចក្រមួន អណ្តែតក្នុងទឹក។",
    recyclability: "MEDIUM",
    biodegradable: "NO",
    upcycleNotesEn: "Can be ironed together (with parchment paper) to create thick, waterproof tarps, bags, or rain ponchos.",
    upcycleNotesKh: "អាចប្រើអ៊ុតបញ្ចូលគ្នា (ជាមួយក្រដាសទ្រ) ដើម្បីបង្កើតជាផ្ទាំងក្រណាត់តង់ការពារទឹក ថង់ ឬអាវភ្លៀងក្រាស់ៗ។",
    safeToCut: true,
    safeToHeat: true,
  },
  5: {
    id: 5,
    abbr: "PP",
    fullNameEn: "Polypropylene",
    fullNameKh: "ប៉ូលីប្រូពីឡែន",
    akaEn: "Tupperware, tough plastic",
    akaKh: "ប្រអប់ជ័រ ប្លាស្ទិករឹង",
    usesEn: "Yogurt containers, bottle caps, straws, car bumpers, ropes.",
    usesKh: "កែវយ៉ាអួ គម្របដប ទុយោ កាងឡាន ខ្សែពួរ។",
    propertiesEn: "Tough, heat resistant, high melting point, floats.",
    propertiesKh: "រឹងមាំ ធន់នឹងកំដៅ ចំណុចរលាយខ្ពស់ អណ្តែត។",
    recyclability: "MEDIUM",
    biodegradable: "NO",
    upcycleNotesEn: "Great for 3D printer filament recycling or moulding, similar to HDPE but requires higher temperatures.",
    upcycleNotesKh: "ល្អសម្រាប់ការកែច្នៃធ្វើជាសរសៃម៉ាស៊ីនបោះពុម្ព 3D ឬការចាក់ពុម្ព ស្រដៀងនឹង HDPE ដែរ ប៉ុន្តែទាមទារសីតុណ្ហភាពខ្ពស់ជាង។",
    safeToCut: true,
    safeToHeat: true,
  },
  6: {
    id: 6,
    abbr: "PS",
    fullNameEn: "Polystyrene",
    fullNameKh: "ប៉ូលីស្ទីរ៉ែន",
    akaEn: "Styrofoam",
    akaKh: "ស្នោ",
    usesEn: "Takeaway food boxes, foam cups, packing peanuts, plastic cutlery.",
    usesKh: "ប្រអប់បាយ ស្នោកែវ ស្នោវេចខ្ចប់ ស្លាបព្រាប្លាស្ទិក។",
    propertiesEn: "Brittle, easily formed into foam, breaks easily, toxic when burned.",
    propertiesKh: "ផុយ ងាយបង្កើតជាស្នោ ងាយបាក់ មានជាតិពុលពេលដុត។",
    recyclability: "LOW",
    biodegradable: "NO",
    upcycleNotesEn: "Very difficult to recycle or upcycle. Avoid heating. Can be dissolved in acetone (nail polish remover) to make a waterproof glue, but must be done outdoors.",
    upcycleNotesKh: "ពិបាកខ្លាំងក្នុងការកែច្នៃ។ ជៀសវាងការកម្តៅ។ អាចរំលាយក្នុងអាសេតូន (ទឹកលុបថ្នាំក្រចក) ដើម្បីធ្វើកាវការពារទឹក ប៉ុន្តែត្រូវធ្វើនៅខាងក្រៅផ្ទះ។",
    safeToCut: true,
    safeToHeat: false,
  },
  7: {
    id: 7,
    abbr: "OTHER",
    fullNameEn: "Other Plastics (PC, PLA, Acrylic, etc.)",
    fullNameKh: "ប្លាស្ទិកផ្សេងៗ (PC, PLA, អាគ្រីលីក ល។)",
    akaEn: "Mixed plastics",
    akaKh: "ប្លាស្ទិកចម្រុះ",
    usesEn: "CDs, baby bottles, bulletproof glass, sunglasses, plant-based plastics.",
    usesKh: "ស៊ីឌី ដបទឹកដោះគោកូនក្មេង កញ្ចក់ការពារគ្រាប់កាំភ្លើង វ៉ែនតាការពារពន្លឺព្រះអាទិត្យ ប្លាស្ទិកធ្វើពីរុក្ខជាតិ។",
    propertiesEn: "Varies widely. PC is shatterproof, PLA is compostable.",
    propertiesKh: "ប្រែប្រួលយ៉ាងខ្លាំង។ PC មិនងាយបែក PLA អាចធ្វើជីកំប៉ុសបាន។",
    recyclability: "LOW",
    biodegradable: "NO", // Generally no, except specific PLA under industrial conditions
    upcycleNotesEn: "Unpredictable due to mixed materials. Do not melt unless you are certain it is PLA (corn plastic). Repurpose mechanically.",
    upcycleNotesKh: "មិនអាចប៉ាន់ស្មានបានដោយសារតែសម្ភារៈចម្រុះ។ កុំរំលាយលុះត្រាតែអ្នកប្រាកដថាវាជា PLA (ប្លាស្ទិកពោត)។ កែច្នៃដោយប្រើមេកានិចវិញ។",
    safeToCut: true,
    safeToHeat: false,
  },
};

export default function PolymersPlasticsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [activePlastic, setActivePlastic] = useState<PlasticId>(1);
  const data = PLASTICS[activePlastic];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/chemistry"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <FlaskConical className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Polymers & Plastics: The 7 Types", "ប៉ូលីមែរ និងប្លាស្ទិក៖ ប្រភេទទាំង ៧")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Explore the chemistry of everyday plastics and how to responsibly upcycle them.", "ស្វែងយល់ពីគីមីវិទ្យានៃប្លាស្ទិកប្រចាំថ្ងៃ និងរបៀបកែច្នៃពួកវាឡើងវិញដោយការទទួលខុសត្រូវ។")}
              </p>
            </div>
          </div>
        </div>

        {/* Concept Explanation */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold text-cyan-400 ${kh ? "font-khmer" : ""}`}>
              {t("What is a Polymer?", "តើប៉ូលីមែរគឺជាអ្វី?")}
            </h2>
            <p className={`text-slate-300 text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A polymer is a massive molecule (macromolecule) formed by joining together thousands of small, repeating carbon-based units called 'monomers'. Think of it like a very long chain made of paperclips. This long-chain structure is what makes plastics incredibly strong, flexible, and durable.",
                "ប៉ូលីមែរគឺជាម៉ូលេគុលដ៏ធំមួយ (ម៉ាក្រូម៉ូលេគុល) ដែលបង្កើតឡើងដោយការភ្ជាប់គ្នានូវឯកតាមូលដ្ឋានកាបូនតូចៗរាប់ពាន់ដែលហៅថា 'ម៉ូណូមែរ'។ ស្រមៃថាវាដូចជាខ្សែច្រវ៉ាក់ដ៏វែងមួយដែលធ្វើពីក្លីបកៀបក្រដាស។ រចនាសម្ព័ន្ធខ្សែវែងនេះហើយដែលធ្វើឱ្យប្លាស្ទិកមានភាពរឹងមាំ បត់បែន និងធន់ខ្លាំង។"
              )}
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-rose-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-rose-400" />
              <h3 className={`font-bold text-rose-400 uppercase tracking-wider ${kh ? "font-khmer tracking-normal" : ""}`}>
                {t("The Environmental Impact", "ផលប៉ះពាល់បរិស្ថាន")}
              </h3>
            </div>
            <p className={`text-sm text-slate-300 leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Because synthetic polymers do not exist in nature, bacteria and fungi have not evolved the enzymes needed to digest them. They are NOT biodegradable. A single plastic bottle can persist for hundreds of years. Sorting them by their Resin Identification Code (1-7) is crucial for recycling and global waste management.",
                "ដោយសារប៉ូលីមែរសំយោគមិនមាននៅក្នុងធម្មជាតិ បាក់តេរីនិងផ្សិតមិនទាន់វិវត្តអង់ស៊ីមដែលត្រូវការដើម្បីរំលាយពួកវាទេ។ ពួកវាមិនងាយរលាយក្នុងបរិស្ថានទេ។ ដបប្លាស្ទិកតែមួយអាចស្ថិតស្ថេររាប់រយឆ្នាំ។ ការចាត់ថ្នាក់ពួកវាតាមលេខកូដ (1-7) គឺជារឿងសំខាន់បំផុតសម្រាប់ការកែច្នៃ និងការគ្រប់គ្រងកាកសំណល់សកល។"
              )}
            </p>
          </div>
        </section>

        {/* Interactive 'Polymer Sorting Station' */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Recycle className="w-6 h-6 text-emerald-400" />
              <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
                {t("Polymer Sorting Station", "ស្ថានីយ៍ចាត់ថ្នាក់ប៉ូលីមែរ")}
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* The 7 Buttons Grid */}
            <div className="w-full lg:w-1/3">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                {(Object.values(PLASTICS) as PlasticData[]).map((plastic) => {
                  const isActive = activePlastic === plastic.id;
                  return (
                    <button
                      key={plastic.id}
                      onClick={() => setActivePlastic(plastic.id)}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300 border-2 ${
                        isActive 
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                          : "bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      <div className="relative mb-2">
                        <Recycle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[4vw] lg:h-[4vw] opacity-80" strokeWidth={1} />
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl lg:text-[1.5vw] mt-0.5">
                          {plastic.id}
                        </span>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-widest">{plastic.abbr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visualizer Output ID Card */}
            <div className="w-full lg:w-2/3 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col min-h-[500px]">
              
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 border-b border-slate-800 pb-6">
                <div>
                  <div className={`text-cyan-400 font-mono text-sm sm:text-[1vw] mb-2 ${kh ? "font-khmer normal-case" : ""}`}>
                    {t("AKA: ", "ឈ្មោះផ្សេង៖ ")}
                    <span className="text-white">{kh ? data.akaKh : data.akaEn}</span>
                  </div>
                  <h3 className={`text-3xl sm:text-[2.5vw] font-black text-white leading-tight ${kh ? "font-khmer" : ""}`}>
                    {kh ? data.fullNameKh : data.fullNameEn}
                  </h3>
                </div>
                
                {/* Badges */}
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
                    <span className={`text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider ${kh ? "font-khmer tracking-normal" : ""}`}>
                      {t("Recyclability:", "ការកែច្នៃឡើងវិញ៖")}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      data.recyclability === "HIGH" ? "bg-emerald-500/20 text-emerald-400" :
                      data.recyclability === "MEDIUM" ? "bg-amber-500/20 text-amber-400" :
                      "bg-rose-500/20 text-rose-400"
                    }`}>
                      {t(data.recyclability, 
                         data.recyclability === "HIGH" ? "ខ្ពស់" : 
                         data.recyclability === "MEDIUM" ? "មធ្យម" : "ទាប")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
                    <span className={`text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider ${kh ? "font-khmer tracking-normal" : ""}`}>
                      {t("Biodegradable:", "អាចរលាយក្នុងដី៖")}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
                      {t("NO", "ទេ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className={`text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 ${kh ? "font-khmer tracking-normal" : ""}`}>
                    {t("Common Uses", "ការប្រើប្រាស់ទូទៅ")}
                  </h4>
                  <p className={`text-lg sm:text-[1.2vw] text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? data.usesKh : data.usesEn}
                  </p>
                </div>
                <div>
                  <h4 className={`text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 ${kh ? "font-khmer tracking-normal" : ""}`}>
                    {t("Physical Properties", "លក្ខណៈរូប")}
                  </h4>
                  <p className={`text-lg sm:text-[1.2vw] text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? data.propertiesKh : data.propertiesEn}
                  </p>
                </div>
              </div>

              {/* Upcycling & Frugal Engineering Box */}
              <div className={`mt-auto rounded-2xl p-6 border ${
                data.safeToHeat ? "bg-emerald-950/20 border-emerald-500/30" : "bg-rose-950/20 border-rose-500/30"
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Hammer className={`w-5 h-5 ${data.safeToHeat ? "text-emerald-400" : "text-amber-400"}`} />
                  <h4 className={`font-bold ${data.safeToHeat ? "text-emerald-400" : "text-amber-400"} ${kh ? "font-khmer" : ""}`}>
                    {t("Frugal Engineering & DIY Notes", "វិស្វកម្មសន្សំសំចៃ និងកំណត់ចំណាំ DIY")}
                  </h4>
                </div>
                
                <p className={`text-base sm:text-[1.1vw] leading-relaxed mb-4 ${
                  data.safeToHeat ? "text-emerald-100/80" : "text-rose-100/80"
                } ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? data.upcycleNotesKh : data.upcycleNotesEn}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    {data.safeToCut ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-rose-500" />}
                    <span className={`text-xs sm:text-[0.9vw] font-bold ${data.safeToCut ? "text-emerald-500" : "text-rose-500"} ${kh ? "font-khmer" : ""}`}>
                      {t("Safe to cut/drill mechanically", "មានសុវត្ថិភាពក្នុងការកាត់/ខួង")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {data.safeToHeat ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <ShieldAlert className="w-4 h-4 text-rose-500" />}
                    <span className={`text-xs sm:text-[0.9vw] font-bold ${data.safeToHeat ? "text-emerald-500" : "text-rose-500"} ${kh ? "font-khmer" : ""}`}>
                      {data.safeToHeat 
                        ? t("Safe to heat/melt (well-ventilated)", "មានសុវត្ថិភាពក្នុងការកម្តៅ/រំលាយ (មានខ្យល់ចេញចូលល្អ)")
                        : t("TOXIC DANGER: Do not heat or burn", "គ្រោះថ្នាក់ជាតិពុល៖ កុំកម្តៅ ឬដុត")
                      }
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
