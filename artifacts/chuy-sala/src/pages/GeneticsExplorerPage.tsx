import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Dna, ZoomIn, Info, CheckCircle2, AlertOctagon, Split, Leaf, TestTube, Target, PlayCircle, Fingerprint } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Zoom Level Data ──────────────────────────────────────────────────────────
interface ZoomLevel {
  id: number;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  visualIcon: string;
}

const ZOOM_LEVELS: ZoomLevel[] = [
  {
    id: 1,
    titleEn: "Level 1: The Cell",
    titleKh: "កម្រិត ១៖ កោសិកា",
    descEn: "The basic structural unit of life. Almost every cell in your body contains your complete genetic code.",
    descKh: "ឯកតារចនាសម្ព័ន្ធមូលដ្ឋាននៃជីវិត។ ស្ទើរតែគ្រប់កោសិកានៅក្នុងរាងកាយរបស់អ្នកមានផ្ទុកកូដហ្សែនពេញលេញរបស់អ្នក។",
    visualIcon: "🦠",
  },
  {
    id: 2,
    titleEn: "Level 2: The Nucleus",
    titleKh: "កម្រិត ២៖ ស្នូលកោសិកា",
    descEn: "The control center. It acts like a vault, safely storing all 46 of your chromosomes.",
    descKh: "មជ្ឈមណ្ឌលត្រួតពិនិត្យ។ វាមានតួនាទីដូចជាទូដែក ដែលរក្សាទុកក្រូម៉ូសូមទាំង ៤៦ របស់អ្នកយ៉ាងមានសុវត្ថិភាព។",
    visualIcon: "🟣",
  },
  {
    id: 3,
    titleEn: "Level 3: Chromosome Anatomy",
    titleKh: "កម្រិត ៣៖ កាយវិភាគវិទ្យាក្រូម៉ូសូម",
    descEn: "Tightly packed DNA. It features a P arm (short), a Q arm (long), a constricted Centromere, and Sister Chromatids.",
    descKh: "ឌីអិនអេដែលខ្ចប់យ៉ាងណែន។ វាមានដៃ P (ខ្លី) ដៃ Q (វែង) សង់ត្រូមែរដែលរួមតូច និងក្រូម៉ាទីតបងប្អូន។",
    visualIcon: "🧬",
  },
  {
    id: 4,
    titleEn: "Level 4: DNA Double Helix",
    titleKh: "កម្រិត ៤៖ ខ្សែរមួលឌីអិនអេ",
    descEn: "The famous twisted ladder. The sides are a Sugar-Phosphate backbone, and the rungs are the nitrogenous bases.",
    descKh: "ជណ្ដើររមួលដ៏ល្បីល្បាញ។ គែមសងខាងគឺជាឆ្អឹងខ្នងស្ករ-ផូស្វាត ហើយកាំជណ្ដើរគឺជាបាសអាសូត។",
    visualIcon: "🪜",
  },
  {
    id: 5,
    titleEn: "Level 5: The Gene",
    titleKh: "កម្រិត ៥៖ ហ្សែន",
    descEn: "A specific segment of the DNA ladder that codes for a specific protein or trait (like your eye color).",
    descKh: "ផ្នែកជាក់លាក់មួយនៃជណ្ដើរឌីអិនអេដែលកំណត់ប្រូតេអ៊ីន ឬលក្ខណៈជាក់លាក់ណាមួយ (ដូចជាពណ៌ភ្នែករបស់អ្នក)។",
    visualIcon: "🧩",
  },
];

// ── Base Pairing Data ──────────────────────────────────────────────────────────
type Base = "A" | "T" | "C" | "G" | null;

interface BaseDef {
  id: "A" | "T" | "C" | "G";
  nameEn: string;
  nameKh: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

const BASES: Record<string, BaseDef> = {
  A: { id: "A", nameEn: "Adenine", nameKh: "អាដេនីន", color: "#3b82f6", bgClass: "bg-blue-500/20", borderClass: "border-blue-500", textClass: "text-blue-400" },
  T: { id: "T", nameEn: "Thymine", nameKh: "ធីមីន", color: "#eab308", bgClass: "bg-yellow-500/20", borderClass: "border-yellow-500", textClass: "text-yellow-400" },
  C: { id: "C", nameEn: "Cytosine", nameKh: "ស៊ីតូស៊ីន", color: "#10b981", bgClass: "bg-emerald-500/20", borderClass: "border-emerald-500", textClass: "text-emerald-400" },
  G: { id: "G", nameEn: "Guanine", nameKh: "ក្វានីន", color: "#ef4444", bgClass: "bg-red-500/20", borderClass: "border-red-500", textClass: "text-red-400" },
};

export default function GeneticsExplorerPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const activeZoom = ZOOM_LEVELS[zoomLevel - 1];

  // Base Pairing State
  const [selectedBase1, setSelectedBase1] = useState<Base>(null);
  const [selectedBase2, setSelectedBase2] = useState<Base>(null);
  const [pairingStatus, setPairingStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  // Handle Base Selection
  const handleBaseClick = (baseId: Base) => {
    if (pairingStatus !== "IDLE") return; // Prevent clicks during animation

    if (!selectedBase1) {
      setSelectedBase1(baseId);
    } else if (!selectedBase2) {
      setSelectedBase2(baseId);
    }
  };

  // Evaluate Pairing
  useEffect(() => {
    if (selectedBase1 && selectedBase2) {
      const isValid = 
        (selectedBase1 === "A" && selectedBase2 === "T") ||
        (selectedBase1 === "T" && selectedBase2 === "A") ||
        (selectedBase1 === "C" && selectedBase2 === "G") ||
        (selectedBase1 === "G" && selectedBase2 === "C");

      if (isValid) {
        setPairingStatus("SUCCESS");
      } else {
        setPairingStatus("ERROR");
      }

      // Reset after 2 seconds
      const timer = setTimeout(() => {
        setSelectedBase1(null);
        setSelectedBase2(null);
        setPairingStatus("IDLE");
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [selectedBase1, selectedBase2]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/biology"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Biology Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលជីវវិទ្យា")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 border-2 border-fuchsia-400/60 text-fuchsia-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              <Dna className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Genetics Explorer", "អ្នករុករកហ្សែន")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Journey from the cell to the DNA base pairs.", "ការធ្វើដំណើរពីកោសិកាទៅកាន់គូនៃបាសឌីអិនអេ។")}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive 'Macro-to-Micro Zoom' Visualizer */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ZoomIn className="w-6 h-6 text-fuchsia-400" />
              <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
                {t("Macro-to-Micro Zoom", "ការពិនិត្យពីធំទៅតូច")}
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Slider Controls */}
            <div className="space-y-8">
              <div>
                <label htmlFor="zoom-slider" className={`block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ${kh ? "font-khmer tracking-normal text-base" : ""}`}>
                  {t("Zoom Level", "កម្រិតពង្រីក")}: {zoomLevel}
                </label>
                <input
                  id="zoom-slider"
                  type="range"
                  min="1"
                  max="5"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  aria-label={t("Adjust zoom level", "កែតម្រូវកម្រិតពង្រីក")}
                />
                <div className="flex justify-between mt-3 px-1">
                  <span className={`text-xs text-slate-500 font-bold ${kh ? "font-khmer" : ""}`}>{t("Macro", "ធំ")}</span>
                  <span className={`text-xs text-slate-500 font-bold ${kh ? "font-khmer" : ""}`}>{t("Micro", "តូច")}</span>
                </div>
              </div>

              {/* Stepped Buttons Alternative */}
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setZoomLevel(lvl)}
                    className={`flex-1 py-3 px-2 rounded-xl font-bold text-sm sm:text-base transition-colors ${
                      zoomLevel === lvl 
                        ? "bg-fuchsia-500 text-white shadow-lg" 
                        : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizer Output */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px] text-center relative overflow-hidden">
              <div 
                key={zoomLevel} 
                className="animate-in slide-in-from-right-4 fade-in duration-500 flex flex-col items-center"
              >
                <div className="text-[10vw] sm:text-[8vw] lg:text-[6vw] leading-none mb-6 filter drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                  {activeZoom.visualIcon}
                </div>
                <h3 className={`text-3xl sm:text-[3vw] lg:text-4xl font-black text-fuchsia-400 mb-4 ${kh ? "font-khmer" : ""}`}>
                  {kh ? activeZoom.titleKh : activeZoom.titleEn}
                </h3>
                <p className={`text-lg sm:text-[1.5vw] lg:text-xl text-slate-300 leading-relaxed max-w-lg ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? activeZoom.descKh : activeZoom.descEn}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* The 'Nitrogenous Base Pairing' Simulator */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Dna className="w-6 h-6 text-fuchsia-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("Nitrogenous Base Pairing", "ការចាប់គូបាសអាសូត")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Base Buttons */}
            <div>
              <p className={`text-slate-400 mb-6 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "Select a base to place it in the pairing zone, then select its complementary partner. Remember the DNA alphabet rules!",
                  "ជ្រើសរើសបាសមួយដើម្បីដាក់វានៅក្នុងតំបន់ចាប់គូ បន្ទាប់មកជ្រើសរើសគូរបស់វា។ ចងចាំច្បាប់អក្ខរក្រមឌីអិនអេ!"
                )}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {(Object.values(BASES) as BaseDef[]).map((base) => (
                  <button
                    key={base.id}
                    onClick={() => handleBaseClick(base.id)}
                    disabled={pairingStatus !== "IDLE" || Boolean(selectedBase1 && selectedBase2)}
                    className={`relative p-6 rounded-2xl border-2 border-b-4 flex flex-col items-center justify-center transition-transform active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed
                      ${base.bgClass} ${base.borderClass} ${base.textClass}
                    `}
                  >
                    <span className="text-5xl sm:text-[5vw] lg:text-6xl font-black font-display">{base.id}</span>
                    <span className={`text-sm sm:text-[1.2vw] lg:text-base font-bold mt-2 ${kh ? "font-khmer" : ""}`}>
                      {kh ? base.nameKh : base.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pairing Zone */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[300px]">
              
              <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 w-full">
                
                {/* Slot 1 */}
                <div className={`w-24 h-24 sm:w-[8vw] sm:h-[8vw] lg:w-32 lg:h-32 rounded-2xl border-4 flex items-center justify-center bg-slate-900 shadow-inner transition-all duration-300
                  ${selectedBase1 ? BASES[selectedBase1].borderClass : "border-slate-800 border-dashed"}
                  ${pairingStatus === "SUCCESS" ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : ""}
                  ${pairingStatus === "ERROR" ? "border-rose-500 animate-pulse" : ""}
                `}>
                  {selectedBase1 && (
                    <span className={`text-6xl sm:text-[6vw] lg:text-7xl font-black ${BASES[selectedBase1].textClass}`}>
                      {selectedBase1}
                    </span>
                  )}
                </div>

                {/* Separator / Status Icon */}
                <div className="flex flex-col items-center justify-center w-12 h-12">
                  {pairingStatus === "SUCCESS" && (
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-in zoom-in" />
                  )}
                  {pairingStatus === "ERROR" && (
                    <AlertOctagon className="w-12 h-12 text-rose-500 animate-in zoom-in" />
                  )}
                  {pairingStatus === "IDLE" && (
                    <span className="text-3xl text-slate-700 font-bold">-</span>
                  )}
                </div>

                {/* Slot 2 */}
                <div className={`w-24 h-24 sm:w-[8vw] sm:h-[8vw] lg:w-32 lg:h-32 rounded-2xl border-4 flex items-center justify-center bg-slate-900 shadow-inner transition-all duration-300
                  ${selectedBase2 ? BASES[selectedBase2].borderClass : "border-slate-800 border-dashed"}
                  ${pairingStatus === "SUCCESS" ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : ""}
                  ${pairingStatus === "ERROR" ? "border-rose-500 animate-pulse" : ""}
                `}>
                  {selectedBase2 && (
                    <span className={`text-6xl sm:text-[6vw] lg:text-7xl font-black ${BASES[selectedBase2].textClass}`}>
                      {selectedBase2}
                    </span>
                  )}
                </div>

              </div>

              {/* Status Message */}
              <div className="h-16 flex items-center justify-center text-center">
                {pairingStatus === "SUCCESS" && (
                  <div className={`text-emerald-400 font-bold text-lg sm:text-[1.5vw] lg:text-xl animate-in slide-in-from-bottom-2 fade-in ${kh ? "font-khmer" : ""}`}>
                    {t("Perfect Match! A pairs with T, and C pairs with G.", "ការចាប់គូដ៏ល្អឥតខ្ចោះ! A ចាប់គូជាមួយ T ហើយ C ចាប់គូជាមួយ G។")}
                  </div>
                )}
                {pairingStatus === "ERROR" && (
                  <div className={`text-rose-400 font-bold text-lg sm:text-[1.5vw] lg:text-xl animate-in slide-in-from-bottom-2 fade-in flex items-center gap-2 ${kh ? "font-khmer" : ""}`}>
                    <Info className="w-6 h-6 shrink-0" />
                    <span>
                      {t("Invalid Pair! Molecular structures must fit perfectly. Try again.", "គូមិនត្រឹមត្រូវ! រចនាសម្ព័ន្ធម៉ូលេគុលត្រូវតែស៊ីគ្នាឥតខ្ចោះ។ សាកល្បងម្ដងទៀត។")}
                    </span>
                  </div>
                )}
                {pairingStatus === "IDLE" && !selectedBase1 && (
                  <div className={`text-slate-500 text-sm sm:text-base ${kh ? "font-khmer" : ""}`}>
                    {t("Waiting for selection...", "កំពុងរង់ចាំការជ្រើសរើស...")}
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* The 'Plant vs. Animal Cell' Inspector */}
        <CellInspector t={t} kh={kh} />

        {/* The 'Mitosis Animator' */}
        <MitosisAnimator t={t} kh={kh} />

        {/* Interactive 'Punnett Square' Predictor */}
        <PunnettSquarePredictor t={t} kh={kh} />

      </div>
    </div>
  );
}

// ── Components ─────────────────────────────────────────────────────────────

function CellInspector({ t, kh }: { t: any, kh: boolean }) {
  const [isPlant, setIsPlant] = useState(false);
  const [activeOrganelle, setActiveOrganelle] = useState<string | null>(null);

  const organelles = [
    { id: "nucleus", nameEn: "Nucleus", nameKh: "ស្នូលកោសិកា", descEn: "The control center storing DNA.", descKh: "មជ្ឈមណ្ឌលត្រួតពិនិត្យដែលផ្ទុក DNA។", plantOnly: false },
    { id: "mitochondrion", nameEn: "Mitochondrion", nameKh: "មីតូកុងឌ្រី", descEn: "The powerhouse, generating energy (ATP).", descKh: "រោងចក្រថាមពល បង្កើតថាមពល (ATP)។", plantOnly: false },
    { id: "ribosomes", nameEn: "Ribosomes", nameKh: "រីបូសូម", descEn: "The protein factories of the cell.", descKh: "រោងចក្រផលិតប្រូតេអ៊ីននៃកោសិកា។", plantOnly: false },
    { id: "membrane", nameEn: "Cell Membrane", nameKh: "ភ្នាសកោសិកា", descEn: "The flexible gatekeeper that controls what enters and exits.", descKh: "អ្នកយាមទ្វារដែលអាចបត់បែនបាន ដែលគ្រប់គ្រងអ្វីដែលចូលនិងចេញ។", plantOnly: false },
    { id: "chloroplast", nameEn: "Chloroplasts", nameKh: "ក្លរ៉ូប្លាស", descEn: "Solar panels that convert sunlight into food via photosynthesis.", descKh: "បន្ទះស្រូបពន្លឺព្រះអាទិត្យដែលបំប្លែងពន្លឺព្រះអាទិត្យទៅជាអាហារតាមរយៈរស្មីសំយោគ។", plantOnly: true },
    { id: "wall", nameEn: "Rigid Cell Wall", nameKh: "ជញ្ជាំងកោសិការឹង", descEn: "Provides structural support and protection to the plant.", descKh: "ផ្តល់ការគាំទ្ររចនាសម្ព័ន្ធ និងការការពារដល់រុក្ខជាតិ។", plantOnly: true },
    { id: "vacuole", nameEn: "Large Vacuole", nameKh: "វ៉ាគ្យូអូលធំ", descEn: "A large storage sac for water and nutrients, helping the plant stay upright.", descKh: "ថង់ផ្ទុកទឹកនិងសារធាតុចិញ្ចឹមដ៏ធំ ដែលជួយឱ្យរុក្ខជាតិឈរត្រង់បាន។", plantOnly: true },
  ];

  const visibleOrganelles = organelles.filter(o => !o.plantOnly || isPlant);
  const activeData = organelles.find(o => o.id === activeOrganelle) || visibleOrganelles[0];

  useEffect(() => {
    if (!isPlant && activeData.plantOnly) {
      setActiveOrganelle(null);
    }
  }, [isPlant, activeData]);

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <TestTube className="w-6 h-6 text-fuchsia-400" />
          <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
            {t("Plant vs. Animal Cell Inspector", "អ្នកពិនិត្យកោសិការុក្ខជាតិ និងសត្វ")}
          </h2>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
          <button 
            onClick={() => setIsPlant(false)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${!isPlant ? "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 shadow-sm" : "text-slate-500 hover:text-slate-300"} ${kh ? "font-khmer" : ""}`}
          >
            {t("Animal Cell", "កោសិហាសត្វ")}
          </button>
          <button 
            onClick={() => setIsPlant(true)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${isPlant ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-sm" : "text-slate-500 hover:text-slate-300"} ${kh ? "font-khmer" : ""}`}
          >
            <Leaf className="w-4 h-4" />
            {t("Plant Cell", "កោសិការុក្ខជាតិ")}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleOrganelles.map(o => (
            <button
              key={o.id}
              onClick={() => setActiveOrganelle(o.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                (activeOrganelle === o.id || (!activeOrganelle && visibleOrganelles[0].id === o.id))
                  ? (o.plantOnly ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-300")
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <h3 className={`font-bold ${kh ? "font-khmer" : ""}`}>{kh ? o.nameKh : o.nameEn}</h3>
            </button>
          ))}
        </div>
        
        <div className={`bg-slate-950 rounded-3xl border-2 p-8 flex flex-col justify-center min-h-[250px] ${activeData.plantOnly ? "border-emerald-500/30" : "border-slate-800"}`}>
          <div className={`text-sm uppercase tracking-widest font-bold mb-3 ${activeData.plantOnly ? "text-emerald-500" : "text-fuchsia-500"} ${kh ? "font-khmer tracking-normal" : ""}`}>
            {activeData.plantOnly ? t("Plant Exclusive", "មានតែក្នុងរុក្ខជាតិ") : t("Organelle", "សរីរាង្គកោសិកា")}
          </div>
          <h3 className={`text-3xl sm:text-[2.5vw] font-black text-white mb-4 ${kh ? "font-khmer" : ""}`}>
            {kh ? activeData.nameKh : activeData.nameEn}
          </h3>
          <p className={`text-lg sm:text-[1.2vw] text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? activeData.descKh : activeData.descEn}
          </p>
        </div>
      </div>
    </section>
  );
}

function MitosisAnimator({ t, kh }: { t: any, kh: boolean }) {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, nameEn: "1. Rest / Copy", nameKh: "១. សម្រាក / ចម្លង", descEn: "The cell rests and duplicates its DNA.", descKh: "កោសិកាសម្រាក និងចម្លងឌីអិនអេរបស់វា។" },
    { id: 2, nameEn: "2. Align", nameKh: "២. តម្រៀប", descEn: "Chromosomes line up in the middle.", descKh: "ក្រូម៉ូសូមតម្រៀបគ្នានៅកណ្តាល។" },
    { id: 3, nameEn: "3. Separate", nameKh: "៣. បំបែក", descEn: "Sister chromatids are pulled apart.", descKh: "ក្រូម៉ាទីតបងប្អូនត្រូវបានទាញបំបែកចេញពីគ្នា។" },
    { id: 4, nameEn: "4. Divide", nameKh: "៤. ចែករំលែក", descEn: "The cell pinches into two identical daughter cells. This replaces cells over an organism's lifetime.", descKh: "កោសិកាត្រូវបំបែកជាកោសិកាកូនពីរដែលដូចគ្នាបេះបិទ។ វាជំនួសកោសិកាក្នុងមួយជីវិតរបស់សត្វមានជីវិត។" }
  ];

  const activeStep = steps[step - 1];

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <Split className="w-6 h-6 text-fuchsia-400" />
        <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
          {t("Mitosis Animator (Cell Division)", "គំនូរជីវចលមីតូស (ការបំបែកកោសិកា)")}
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-3">
          {steps.map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                step === s.id
                  ? "bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              } ${kh ? "font-khmer" : ""}`}
            >
              {kh ? s.nameKh : s.nameEn}
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
          
          {/* Visualizer Animation Box */}
          <div className="h-48 w-full flex items-center justify-center relative mb-6">
            
            {step === 1 && (
              <div className="animate-in zoom-in duration-500 flex items-center justify-center w-32 h-32 rounded-full border-4 border-slate-700 bg-slate-900">
                <div className="w-16 h-16 rounded-full border-2 border-fuchsia-500 border-dashed flex items-center justify-center relative animate-pulse">
                   <div className="absolute text-fuchsia-400 font-bold text-xl rotate-45">XX</div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-8 duration-500 flex items-center justify-center w-32 h-32 rounded-full border-4 border-slate-700 bg-slate-900 relative">
                <div className="absolute flex flex-col gap-1 items-center justify-center">
                  <div className="text-fuchsia-400 font-bold text-lg leading-none">X</div>
                  <div className="text-fuchsia-400 font-bold text-lg leading-none">X</div>
                  <div className="text-fuchsia-400 font-bold text-lg leading-none">X</div>
                </div>
                <div className="absolute inset-x-0 h-0.5 bg-slate-700/50 w-full" />
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in duration-500 flex items-center justify-center w-40 h-32 rounded-[40px] border-4 border-slate-700 bg-slate-900 relative">
                <div className="absolute left-6 flex flex-col gap-1 text-fuchsia-400 font-bold leading-none animate-in slide-in-from-right-4">&lt; &lt; &lt;</div>
                <div className="absolute right-6 flex flex-col gap-1 text-fuchsia-400 font-bold leading-none animate-in slide-in-from-left-4">&gt; &gt; &gt;</div>
                <div className="absolute w-0.5 h-full bg-slate-800/50 border-dashed" />
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in duration-500 flex items-center justify-center gap-8">
                <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                  <div className="w-12 h-12 rounded-full border-2 border-fuchsia-500 border-dashed flex flex-col items-center justify-center text-fuchsia-400 font-bold text-xs leading-none">
                     <div>| |</div>
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                  <div className="w-12 h-12 rounded-full border-2 border-fuchsia-500 border-dashed flex flex-col items-center justify-center text-fuchsia-400 font-bold text-xs leading-none">
                     <div>| |</div>
                  </div>
                </div>
              </div>
            )}
            
          </div>

          <p className={`text-center text-lg sm:text-[1.5vw] text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? activeStep.descKh : activeStep.descEn}
          </p>

        </div>
      </div>
    </section>
  );
}

function PunnettSquarePredictor({ t, kh }: { t: any, kh: boolean }) {
  const [father, setFather] = useState("Bb");
  const [mother, setMother] = useState("Bb");

  // Calculate combinations
  const combos = [
    father[0] + mother[0],
    father[0] + mother[1],
    father[1] + mother[0],
    father[1] + mother[1],
  ].map(c => {
    // Standardize to put capital first (e.g. 'bB' -> 'Bb')
    if (c === "bB") return "Bb";
    return c;
  });

  const brownEyesCount = combos.filter(c => c.includes("B")).length;
  const brownPercent = Math.round((brownEyesCount / 4) * 100);
  const bluePercent = 100 - brownPercent;

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-fuchsia-400" />
          <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
            {t("Punnett Square Predictor", "ឧបករណ៍ទាយការ៉េ Punnett")}
          </h2>
        </div>
        <div className={`text-sm font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 ${kh ? "font-khmer normal-case" : ""}`}>
          B = {t("Brown (Dominant)", "ពណ៌ត្នោត (គ្របដណ្តប់)")} | b = {t("Blue (Recessive)", "ពណ៌ខៀវ (រង)")}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Controls & Math */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-bold text-slate-400 uppercase tracking-widest ${kh ? "font-khmer tracking-normal text-base" : ""}`}>
                {t("Father's Genes", "ហ្សែនរបស់ឪពុក")}
              </label>
              <select 
                value={father}
                onChange={(e) => setFather(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold text-xl focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              >
                <option value="BB">BB (Brown)</option>
                <option value="Bb">Bb (Brown)</option>
                <option value="bb">bb (Blue)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`block text-sm font-bold text-slate-400 uppercase tracking-widest ${kh ? "font-khmer tracking-normal text-base" : ""}`}>
                {t("Mother's Genes", "ហ្សែនរបស់ម្តាយ")}
              </label>
              <select 
                value={mother}
                onChange={(e) => setMother(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-bold text-xl focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              >
                <option value="BB">BB (Brown)</option>
                <option value="Bb">Bb (Brown)</option>
                <option value="bb">bb (Blue)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
            <h3 className={`text-sm text-slate-500 font-bold uppercase tracking-widest mb-4 ${kh ? "font-khmer tracking-normal text-base" : ""}`}>
              {t("Probability Results", "លទ្ធផលប្រូបាប៊ីលីតេ")}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className={`text-white font-bold ${kh ? "font-khmer" : ""}`}>{t("Brown Eyes (B_)", "ភ្នែកពណ៌ត្នោត (B_)")}</span>
                  <span className="text-amber-500 font-black">{brownPercent}%</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${brownPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className={`text-white font-bold ${kh ? "font-khmer" : ""}`}>{t("Blue Eyes (bb)", "ភ្នែកពណ៌ខៀវ (bb)")}</span>
                  <span className="text-sky-500 font-black">{bluePercent}%</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${bluePercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer Grid */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            {/* Labels */}
            <div className="absolute -top-10 left-0 right-0 flex justify-center gap-16 text-fuchsia-400 font-black text-2xl">
              <span>{mother[0]}</span>
              <span>{mother[1]}</span>
            </div>
            <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-center gap-16 text-fuchsia-400 font-black text-2xl">
              <span>{father[0]}</span>
              <span>{father[1]}</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 bg-slate-700 border-4 border-slate-700 rounded-2xl overflow-hidden p-1 shadow-[0_0_30px_rgba(217,70,239,0.15)] w-[60vw] max-w-[300px] h-[60vw] max-h-[300px]">
              {combos.map((c, i) => {
                const isBrown = c.includes("B");
                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-center rounded-xl font-black text-[10vw] sm:text-6xl transition-colors duration-500 ${
                      isBrown ? "bg-amber-900/40 text-amber-500" : "bg-sky-900/40 text-sky-500"
                    }`}
                  >
                    {c}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
