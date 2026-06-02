import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Flame,
  Hammer,
  Sparkles,
  Info,
  Wrench,
  Activity,
  Layers,
  RotateCcw,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

// Types
interface GlossaryTerm {
  termEn: string;
  termKh: string;
  descEn: string;
  descKh: string;
}

interface AlloyResult {
  nameEn: string;
  nameKh: string;
  isSuccess: boolean;
  propertiesEn: string[];
  propertiesKh: string[];
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    termEn: "Ore",
    termKh: "រ៉ែ (Ore)",
    descEn: "Natural rock or sediment that contains valuable minerals, typically metals, that can be mined and treated.",
    descKh: "ថ្ម ឬល្បាប់ធម្មជាតិដែលមានផ្ទុកជាតិរ៉ែមានតម្លៃ ជាពិសេសគឺលោហៈធាតុ ដែលអាចជីកកកាយយកមកចម្រាញ់បាន។",
  },
  {
    termEn: "Smelting",
    termKh: "ការសិត/រំលាយរ៉ែ (Smelting)",
    descEn: "The process of applying heat and chemical reducing agents to an ore to extract a pure base metal.",
    descKh: "ដំណើរការបញ្ចេញកម្តៅខ្លាំង និងភ្នាក់ងារគីមីទៅលើរ៉ែ ដើម្បីទាញយកលោហៈមូលដ្ឋានសុទ្ធចេញមកក្រៅ។",
  },
  {
    termEn: "Alloy",
    termKh: "លោហៈធាតុផ្សំ (Alloy)",
    descEn: "A mixture of chemical elements where the primary component is a metal, designed to enhance strength or resistance.",
    descKh: "ល្បាយនៃលោហៈមូលដ្ឋានជាមួយលោហៈ ឬអលោហៈផ្សេងទៀត ដើម្បីបង្កើនភាពរឹងមាំ ឬភាពធន់ទ្រាំ។",
  },
  {
    termEn: "Ferrous",
    termKh: "លោហៈមានជាតិដែក (Ferrous)",
    descEn: "Metals that consist primarily of Iron (Fe) and are typically magnetic, such as steel.",
    descKh: "លោហៈទាំងឡាយណាដែលផ្សំឡើងជាចម្បងពីជាតិដែក (Fe) និងមានលក្ខណៈឆក់ទាញដោយមេដែក ដូចជាដែកថែប។",
  },
  {
    termEn: "Non-Ferrous",
    termKh: "លោហៈគ្មានជាតិដែក (Non-Ferrous)",
    descEn: "Metals that do not contain iron, are non-magnetic, and typically resist rust, like copper or aluminum.",
    descKh: "លោហៈដែលគ្មានផ្ទុកជាតិដែក គ្មានកម្លាំងឆក់ទាញ និងមានសមត្ថភាពការពារច្រែះបានល្អ ដូចជាទង់ដែង ឬអាលុយមីញ៉ូម។",
  },
];

const BASE_METALS = [
  { id: "Iron", nameEn: "Iron (Fe)", nameKh: "ដែក (Fe)", color: "#4b5563" },
  { id: "Copper", nameEn: "Copper (Cu)", nameKh: "ទង់ដែង (Cu)", color: "#ea580c" },
  { id: "Gold", nameEn: "Gold (Au)", nameKh: "មាស (Au)", color: "#eab308" },
  { id: "Aluminum", nameEn: "Aluminum (Al)", nameKh: "អាលុយមីញ៉ូម (Al)", color: "#94a3b8" },
];

const ADDITIVES = [
  { id: "Carbon", nameEn: "Carbon (C)", nameKh: "កាបូន (C)", color: "#111827" },
  { id: "Tin", nameEn: "Tin (Sn)", nameKh: "សំណប៉ាហាំង (Sn)", color: "#cbd5e1" },
  { id: "Zinc", nameEn: "Zinc (Zn)", nameKh: "ស័ង្កសី (Zn)", color: "#a1a1aa" },
  { id: "Nickel", nameEn: "Nickel (Ni)", nameKh: "នីកែល (Ni)", color: "#d1d5db" },
  { id: "Silver", nameEn: "Silver (Ag)", nameKh: "ប្រាក់ (Ag)", color: "#f3f4f6" },
  { id: "Chromium", nameEn: "Chromium (Cr)", nameKh: "ក្រូម (Cr)", color: "#e2e8f0" },
  { id: "Copper", nameEn: "Copper (Cu)", nameKh: "ទង់ដែង (Cu)", color: "#ea580c" },
];

const forgeAlloy = (base: string, additive: string): AlloyResult => {
  const combination = `${base}+${additive}`;
  switch (combination) {
    case "Iron+Carbon":
      return {
        nameEn: "Carbon Steel",
        nameKh: "ដែកថែបកាបូន",
        isSuccess: true,
        propertiesEn: [
          "Significantly higher tensile strength and hardness than pure iron.",
          "Slightly more brittle but offers critical structural integrity.",
          "Widely used for building structures, automotive frames, and railways."
        ],
        propertiesKh: [
          "បង្កើនកម្លាំងទាញ និងភាពរឹងមាំខ្លាំងជាងដែកសុទ្ធ។",
          "ផុយជាងដែកបន្តិច ប៉ុន្តែផ្តល់នូវស្ថិរភាពគ្រោងដ៏សំខាន់។",
          "ប្រើប្រាស់យ៉ាងទូលំទូលាយសម្រាប់ស៊ុមអគារ គ្រោង موទ័រ និងផ្លូវដែក។"
        ]
      };
    case "Iron+Chromium":
      return {
        nameEn: "Stainless Steel",
        nameKh: "ដែកអ៊ីណុក (Stainless Steel)",
        isSuccess: true,
        propertiesEn: [
          "Highly resistant to corrosion, chemical attacks, and rust.",
          "Maintains high durability and strength at extreme temperatures.",
          "Used for kitchen cutlery, medical surgical implants, and structural facades."
        ],
        propertiesKh: [
          "ធន់ទ្រាំខ្លាំងនឹងការច្រែះ ការច្រេះគីមី និងការច្រែះទឹក។",
          "រក្សាបាននូវភាពធន់ និងកម្លាំងខ្លាំងនៅសីតុណ្ហភាពខ្ពស់បំផុត។",
          "ប្រើសម្រាប់សម្ភារៈផ្ទះបាយ ឧបករណ៍វះកាត់ និងការតុបតែងខាងក្រៅអគារ។"
        ]
      };
    case "Copper+Tin":
      return {
        nameEn: "Bronze",
        nameKh: "សំរឹទ្ធ (Bronze)",
        isSuccess: true,
        propertiesEn: [
          "Much harder and less malleable than pure copper.",
          "Provides exceptionally low metal-on-metal friction.",
          "Historically sparked the Bronze Age for tools and weapons; now used for bearings and guitar strings."
        ],
        propertiesKh: [
          "រឹងជាង និងមិនសូវពត់បានងាយដូចទង់ដែងសុទ្ធឡើយ។",
          "ផ្ដល់កម្រិតកកិតទាបបំផុតរវាងលោហៈនិងលោហៈ។",
          "ក្នុងប្រវត្តិសាស្ត្របានបង្កើតយុគសំរឹទ្ធសម្រាប់ធ្វើឧបករណ៍ និងអាវុធ; បច្ចុប្បន្នប្រើសម្រាប់បាដាង និងខ្សែហ្គីតា។"
        ]
      };
    case "Copper+Zinc":
      return {
        nameEn: "Brass",
        nameKh: "លង្ហិន (Brass)",
        isSuccess: true,
        propertiesEn: [
          "Highly workable and malleable with brilliant acoustic resonance.",
          "Beautiful golden-yellow finish and low friction coefficient.",
          "Used for brass instruments (horns, saxophones), pipe fittings, and cartridge casings."
        ],
        propertiesKh: [
          "ងាយកែច្នៃ និងពត់ពន្លាត ព្រមទាំងមានសំឡេងបន្លឺពីរោះរណ្តំ។",
          "មានរូបរាងពណ៌លឿងភ្លឺដូចមាស និងមេគុណកកិតទាប។",
          "ប្រើសម្រាប់ឧបករណ៍តន្ត្រីផ្លុំ (ត្រែ ត្រុំប៉ែត) គ្រឿងទុយោ និងសំបកគ្រាប់កាំភ្លើង។"
        ]
      };
    case "Gold+Silver":
      return {
        nameEn: "Electrum",
        nameKh: "មាសអេឡិចត្រូម (Electrum)",
        isSuccess: true,
        propertiesEn: [
          "A naturally occurring alloy of gold and silver with small trace metals.",
          "Noble pale-yellow luster and outstanding electrical conductivity.",
          "Used historically for Lydia's first coins and plating pyramid capstones (pyramidions)."
        ],
        propertiesKh: [
          "ជាលោហៈធាតុផ្សំធម្មជាតិនៃមាស និងប្រាក់ ជាមួយលោហៈដានបន្តិចបន្តួច។",
          "មានពណ៌លឿងស្រាលប្រណីត និងសមត្ថភាពចម្លងអគ្គិសនីដ៏ល្អបំផុត។",
          "ប្រវត្តិសាស្ត្រប្រើសម្រាប់សិតកាក់ដំបូងបំផុតនៅលីឌា និងស្រោបកំពូលពីរ៉ាមីត។"
        ]
      };
    case "Gold+Copper":
      return {
        nameEn: "Rose Gold",
        nameKh: "មាសផ្កាឈូក (Rose Gold)",
        isSuccess: true,
        propertiesEn: [
          "Striking reddish-pink tint derived from its copper content.",
          "Dramatically harder and more scratch-resistant than pure 24K gold.",
          "Extremely popular in high-end jewelry, luxury watches, and wedding bands."
        ],
        propertiesKh: [
          "មានពណ៌ផ្កាឈូកក្រហមស្រាលប្រណីតបានមកពីការលាយទង់ដែង។",
          "រឹងមាំ និងធន់នឹងការឆ្កូតខ្លាំងជាងមាសសុទ្ធ ២៤ការ៉ាត។",
          "ពេញនិយមខ្លាំងក្នុងគ្រឿងអលង្ការលំដាប់ខ្ពស់ នាឡិកាដៃប្រណីត និងចិញ្ចៀនអាពាហ៍ពិពាហ៍។"
        ]
      };
    case "Aluminum+Copper":
      return {
        nameEn: "Duralumin",
        nameKh: "ឌុយរ៉ាលុយមីន (Duralumin)",
        isSuccess: true,
        propertiesEn: [
          "Combines the low density of aluminum with the mechanical strength of steel.",
          "Hardens naturally over time through copper precipitation.",
          "Critically used in early zeppelins, aerospace structures, and speedboat frames."
        ],
        propertiesKh: [
          "រួមបញ្ចូលដង់ស៊ីតេទាបរបស់អាលុយមីញ៉ូម ជាមួយកម្លាំងមេកានិចរបស់ដែកថែប។",
          "រឹងមាំឡើងដោយស្វ័យប្រវត្តិតាមពេលវេលាតាមរយៈការបំបែកធាតុទង់ដែង។",
          "ប្រើប្រាស់យ៉ាងសំខាន់ក្នុងគ្រោងយន្តហោះដំបូងៗ រចនាសម្ព័ន្ធអវកាស និងទូកល្បឿនលឿន។"
        ]
      };
    case "Aluminum+Zinc":
      return {
        nameEn: "Al-Zn Aerospace Alloy",
        nameKh: "អាលុយមីញ៉ូម-ស័ង្កសី (Aerospace Alloy)",
        isSuccess: true,
        propertiesEn: [
          "Incredible strength-to-weight ratio, matching steel at a third of the weight.",
          "Excellent fatigue resistance under high cyclical loads.",
          "Used in aerospace rockets, high-stress fighter jet components, and rock climbing gear."
        ],
        propertiesKh: [
          "សមាមាត្រកម្លាំងធៀបនឹងទម្ងន់ដ៏អស្ចារ្យ ស្មើនឹងដែកប៉ុន្តែមានទម្ងន់ត្រឹម ១/៣ នៃដែក។",
          "ធន់ទ្រាំល្អឥតខ្ចោះទៅនឹងសម្ពាធមេកានិចខ្លាំង និងការចុះខ្សោយលោហៈ។",
          "ប្រើប្រាស់ក្នុងរ៉ុក្កែតអវកាស គ្រឿងបង្គុំយន្តហោះចម្បាំង និងឧបករណ៍ឡើងភ្នំ។"
        ]
      };
    case "Copper+Nickel":
      return {
        nameEn: "Cupronickel",
        nameKh: "ទង់ដែង-នីកែល (Cupronickel)",
        isSuccess: true,
        propertiesEn: [
          "Superb resistance to corrosion from salt water and marine environments.",
          "Distinct silver color despite being comprised mostly of copper.",
          "Used for desalination piping, marine hardware, and modern silver coins."
        ],
        propertiesKh: [
          "ធន់ទ្រាំដ៏អស្ចារ្យនឹងការច្រេះដោយទឹកប្រៃ និងមជ្ឈដ្ឋានក្នុងសមុទ្រ។",
          "មានពណ៌ប្រាក់ភ្លឺច្បាស់ ទោះបីជាមានជាតិទង់ដែងភាគច្រើនក៏ដោយ។",
          "ប្រើសម្រាប់ទុយោចម្រោះទឹកប្រៃ គ្រឿងបន្លាស់នាវា និងកាក់ប្រាក់សម័យទំនើប។"
        ]
      };
    default:
      return {
        nameEn: "Impure Mixture / Slag",
        nameKh: "កាកសំណល់ / ដែកមិនបរិសុទ្ធ (Slag)",
        isSuccess: false,
        propertiesEn: [
          "These components do not bond at the atomic level in standard solid solutions.",
          "Creates chemical segregation, micro-voids, and severe structural weaknesses.",
          "Results in useless, brittle slag or separate metallic layers."
        ],
        propertiesKh: [
          "ធាតុផ្សំទាំងនេះមិនចងសម្ព័ន្ធគ្នានៅកម្រិតអាតូមក្នុងទម្រង់រឹងមាំឡើយ។",
          "បង្កើតឱ្យមានការបែកចែកសារធាតុគីមី ប្រហោងតូចៗ និងភាពខ្សោយគ្រោងមេកានិច។",
          "ជាលទ្ធផលបានត្រឹមកាកសំណល់មិនបានការ ឬស្រទាប់លោហៈផុយស្រួយដាច់ដោយឡែកពីគ្នា។"
        ]
      };
  }
};

export default function MetallurgyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Selected state inputs
  const [baseMetal, setBaseMetal] = useState<string>("Iron");
  const [additive, setAdditive] = useState<string>("Carbon");

  // Visual Forging States
  const [isForging, setIsForging] = useState<boolean>(false);
  const [forgedResult, setForgedResult] = useState<AlloyResult | null>(null);

  const activeBase = BASE_METALS.find((b) => b.id === baseMetal) ?? BASE_METALS[0];
  const activeAdditive = ADDITIVES.find((a) => a.id === additive) ?? ADDITIVES[0];

  const handleForge = () => {
    setIsForging(true);
    setForgedResult(null);

    // Simulate Forging Process (Crucible Heat Animation)
    setTimeout(() => {
      setIsForging(false);
      const result = forgeAlloy(baseMetal, additive);
      setForgedResult(result);

      if (result.isSuccess) {
        // Trigger particle success confetti!
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#f97316", "#ef4444", "#eab308"],
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative text-slate-100 bg-[#040208] overflow-x-hidden font-sans">
      <ScopedStyles />
      <ForgeBg />

      {/* ── Header Back Navigation ── */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/physics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold text-sm"}>
              {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
            <span
              className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Metallurgy & The Alloy Forge", "លោហៈសាស្ត្រ និងការសិតលោហៈធាតុផ្សំ")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>MATERIALS-SCIENCE-MODULE</span>
          </div>
        </div>
      </header>

      {/* ── Main Layout Content ── */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col gap-8">
        
        {/* 1. Hero Title & Introduction */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 text-orange-400 rounded-full px-4 py-1 text-xs font-mono uppercase w-fit">
              <Hammer className="w-3.5 h-3.5" />
              {t("Materials & Engineering", "វិទ្យាសាស្ត្រសម្ភារៈ និងវិស្វកម្ម")}
            </div>

            <h1
              className={`font-black text-white leading-tight ${
                isKh ? "font-khmer leading-relaxed" : ""
              }`}
              style={{ fontSize: "max(2.2rem, 4.5vw)" }}
            >
              {isKh ? (
                <>
                  លោហៈសាស្ត្រ៖ <span className="text-orange-400 text-glow-orange">ចង្រ្កានសិតលោហៈធាតុផ្សំ</span>
                </>
              ) : (
                <>
                  Metallurgy: <span className="text-orange-400 text-glow-orange">The Alloy Forge</span>
                </>
              )}
            </h1>

            <p
              className={`text-slate-300 text-base sm:text-lg ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "Metallurgy is the scientific study of metals and their chemical properties. It covers the extraction of pure metal elements from raw earth ores, refining them, and fusing different metals together to create alloys. Fusing base metals with additives creates alloys with drastically enhanced material traits—such as higher mechanical strength, extreme rust resistance, or superior conductivity.",
                "លោហៈសាស្ត្រ គឺជាការសិក្សាបែបវិទ្យាសាស្ត្រអំពីលោហៈធាតុ និងលក្ខណៈគីមីរបស់វា។ វាគ្របដណ្តប់លើការទាញយកលោហៈធាតុសុទ្ធពីរ៉ែធម្មជាតិ ការចម្រាញ់ឲ្យបរិសុទ្ធ និងការផ្សំលោហៈផ្សេងៗចូលគ្នាដើម្បីបង្កើតជាលោហៈធាតុផ្សំ (alloys)។ ការផ្សំលោហៈមូលដ្ឋានជាមួយសារធាតុបន្ថែម បង្កើតបានជាលោហៈធាតុផ្សំដែលមានលក្ខណៈសម្បត្តិលេចធ្លោជាងមុន—ដូចជាកម្លាំងគ្រោងមេកានិចខ្លាំងជាង ការពារច្រែះបានល្អ ឬចម្លងអគ្គិសនីបានប្រសើរជាងមុន។"
              )}
            </p>
          </div>
        </section>

        {/* 2. Key Terms Glossary Cards */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-400" />
            <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
              {t("Key Metallurgical Terms", "ពាក្យគន្លឹះក្នុងលោហៈសាស្ត្រ")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {GLOSSARY_TERMS.map((term, index) => (
              <div
                key={index}
                className="bg-slate-950/50 border border-slate-900 rounded-2xl p-5 hover:border-orange-500/20 transition-all duration-300 flex flex-col gap-2 shadow-lg"
              >
                <span className="text-xs font-mono uppercase text-orange-400 font-bold block">
                  {isKh ? term.termKh : term.termEn}
                </span>
                <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                  {isKh ? term.descKh : term.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Interactive 'Alloy Forge' Visualizer */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-orange-400 font-mono tracking-widest uppercase block mb-1">
              {t("INTERACTIVE HEATING SIMULATOR", "ឧបករណ៍ពិសោធន៍កម្តៅសិតលោហៈ")}
            </span>
            <h2 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.8rem, 3.2vw)" }}>
              {t("The Alloy Forge Visualizer", "ឧបករណ៍សិតលោហៈធាតុផ្សំ")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Control Panel (Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-slate-900/30 border border-slate-900 rounded-2xl p-5 justify-between">
              
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <h4 className={`text-slate-300 font-bold text-sm uppercase tracking-wider ${isKh ? "font-khmer tracking-normal" : ""}`}>
                    {t("Select Elements", "ជ្រើសរើសសារធាតុ")}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    {t("Crucible Mix", "ល្បាយក្នុងឆ្នាំងសិត")}
                  </span>
                </div>

                {/* Base Metal Dropdown (Massive & Viewport-relative for projection) */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="base-metal-select" className={`text-xs font-bold uppercase text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("1. Base Metal (Metal Matrix)", "១. លោហៈមូលដ្ឋាន (លោហៈធំ)")}
                  </label>
                  <select
                    id="base-metal-select"
                    value={baseMetal}
                    onChange={(e) => {
                      setBaseMetal(e.target.value);
                      setForgedResult(null);
                    }}
                    disabled={isForging}
                    className="chunky-dropdown w-full border-2 border-slate-800 bg-slate-950 text-slate-100 rounded-xl transition-all focus:outline-none focus:border-orange-500 font-bold"
                  >
                    {BASE_METALS.map((metal) => (
                      <option key={metal.id} value={metal.id}>
                        {isKh ? metal.nameKh : metal.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additive Element Dropdown (Massive & Viewport-relative for projection) */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="additive-select" className={`text-xs font-bold uppercase text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("2. Additive Element (Solute)", "២. សារធាតុបន្ថែម (ធាតុផ្សំ)")}
                  </label>
                  <select
                    id="additive-select"
                    value={additive}
                    onChange={(e) => {
                      setAdditive(e.target.value);
                      setForgedResult(null);
                    }}
                    disabled={isForging}
                    className="chunky-dropdown w-full border-2 border-slate-800 bg-slate-950 text-slate-100 rounded-xl transition-all focus:outline-none focus:border-orange-500 font-bold"
                  >
                    {ADDITIVES.map((el) => (
                      <option key={el.id} value={el.id}>
                        {isKh ? el.nameKh : el.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleForge}
                disabled={isForging}
                className="chunky-forge-btn w-full inline-flex items-center justify-center gap-2 rounded-xl text-white font-extrabold uppercase transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Flame className="w-5 h-5 animate-pulse" />
                <span>{isForging ? t("Smelting...", "កំពុងសិត/រំលាយ...") : t("Forge Alloy", "សិតលោហៈធាតុផ្សំ")}</span>
              </button>

            </div>

            {/* Animation & Output Visualizer (Col Span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-6 bg-slate-900/30 border border-slate-900 rounded-2xl p-5 relative overflow-hidden min-h-[380px] justify-center items-center">
              
              {/* Forging Crucible Animation Screen */}
              {(!forgedResult && !isForging) && (
                <div className="flex flex-col items-center gap-4 text-center p-6">
                  <Flame className="w-12 h-12 text-slate-700" />
                  <p className={`text-slate-400 text-sm max-w-sm ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                    {t(
                      "Select a Base Metal and an Additive Element, then hit the Forge button to melt and fuse them in the crucible.",
                      "ជ្រើសរើសលោហៈមូលដ្ឋាន និងសារធាតុបន្ថែម រួចចុចប៊ូតុងសិតលោហៈ ដើម្បីរំលាយ និងចងសម្ព័ន្ធលោហៈទាំងពីរនៅក្នុងឆ្នាំងសិត។"
                    )}
                  </p>
                </div>
              )}

              {isForging && (
                <div className="flex flex-col items-center gap-6 py-10 relative">
                  {/* Glowing Crucible Heating Animation */}
                  <div className="relative w-32 h-32 flex items-center justify-center animate-forge-shake">
                    {/* Fire effects */}
                    <div className="absolute bottom-0 w-24 h-24 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full filter blur-xl opacity-80 animate-fire-pulse" />
                    
                    {/* Sparks */}
                    <div className="absolute -top-6 w-1 h-1 bg-yellow-400 rounded-full animate-spark-1" />
                    <div className="absolute -top-4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-spark-2" />
                    <div className="absolute -top-8 w-1 h-1 bg-red-400 rounded-full animate-spark-3" />
                    
                    {/* Crucible SVG */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                      <path
                        d="M 20,20 L 80,20 L 70,80 C 68,90 32,90 30,80 Z"
                        fill="#1f2937"
                        stroke="#f97316"
                        strokeWidth="3.5"
                      />
                      {/* Molten liquid glow inside */}
                      <ellipse cx="50" cy="24" rx="24" ry="8" fill="#facc15" />
                    </svg>
                  </div>

                  <span className={`text-orange-400 font-mono text-sm uppercase tracking-widest font-bold animate-pulse ${isKh ? "font-khmer" : ""}`}>
                    {t("Smelting in Progress... Heating Crucible", "កំពុងរំលាយសារធាតុ... កម្តៅកើនឡើងខ្លាំង")}
                  </span>
                </div>
              )}

              {/* Forged Results Screen */}
              {forgedResult && (
                <div className="w-full flex flex-col gap-5 p-4 rounded-xl relative z-10 animate-fade-in-scale">
                  
                  {/* Result Header Badge */}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 bg-slate-950 border border-slate-900 rounded px-2.5 py-0.5 font-bold">
                      {t("FORGE RESULT", "លទ្ធផលនៃការសិត")}
                    </span>
                    <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                      forgedResult.isSuccess
                        ? "bg-green-950/40 text-green-400 border border-green-500/20"
                        : "bg-red-950/40 text-red-400 border border-red-500/20"
                    }`}>
                      {forgedResult.isSuccess ? t("ALLOY FORGED!", "សិតបានសម្រេច!") : t("FORGING FAILED", "បរាជ័យ!")}
                    </span>
                  </div>

                  {/* Massive Typography Output (Highly readable from back of class) */}
                  <div className="text-center py-4 border-y border-slate-900">
                    <h3
                      className={`font-black tracking-tight leading-none ${
                        forgedResult.isSuccess ? "text-orange-400 text-glow-orange" : "text-slate-500 text-glow-slag"
                      }`}
                      style={{ fontSize: "max(2.2rem, 5.2vw)" }}
                    >
                      {isKh ? forgedResult.nameKh : forgedResult.nameEn}
                    </h3>
                  </div>

                  {/* Properties list */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 flex flex-col gap-3">
                    <span className="text-[10px] text-orange-300 font-mono block uppercase tracking-wider">
                      {forgedResult.isSuccess ? t("ALLOY PROPERTIES", "លក្ខណៈសម្បត្តិលោហៈធាតុផ្សំ") : t("FAILURE REASON", "មូលហេតុនៃការបរាជ័យ")}
                    </span>

                    <ul className={`flex flex-col gap-2 text-xs sm:text-sm text-slate-300 ${isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}`}>
                      {(isKh ? forgedResult.propertiesKh : forgedResult.propertiesEn).map((prop, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${forgedResult.isSuccess ? "bg-orange-400" : "bg-red-400"}`} />
                          <p>{prop}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reset trigger helper */}
                  <button
                    onClick={() => setForgedResult(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 justify-center transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t("Reset visualizer", "សម្អាតឆ្នាំងសិត")}</span>
                  </button>

                </div>
              )}

            </div>

          </div>
        </section>

        {/* 4. Classroom Activity Context */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-400" />
            <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
              {t("Why do we Forge Alloys?", "ហេតុអ្វីបានជាយើងសិតលោហៈធាតុផ្សំ?")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Factor 1: Strength */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">{t("1. Enhance Mechanical Strength", "១. បង្កើនកម្លាំងគ្រោងមេកានិច")}</span>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "Pure base metals are soft because their atom layers slide past each other easily. Adding different-sized atoms of an additive disrupts this regular lattice grid, locking the layers in place and dramatically increasing hardness.",
                  "លោហៈសុទ្ធធម្មតាមានសភាពទន់ ព្រោះស្រទាប់អាតូមរបស់វាអាចរំកិលកាត់គ្នាបានយ៉ាងងាយ។ ការបន្ថែមអាតូមដែលមានទំហំខុសគ្នា មកបង្អាក់ក្រឡាចត្រង្គអាតូមនេះ ធ្វើឱ្យចលនារំកិលត្រូវគាំងជាប់ និងបង្កើនភាពរឹងមាំខ្លាំង។"
                )}
              </p>
            </div>

            {/* Factor 2: Corrosion */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">{t("2. Prevent Corrosion & Rust", "២. ការពារការច្រែះ និងច្រេះគីមី")}</span>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "Pure iron rusts rapidly in water and air. Fusing it with chromium creates stainless steel. The chromium reacts with oxygen to form an invisible, self-healing protective oxide surface film that shields iron from corroding.",
                  "ដែកសុទ្ធនឹងច្រែះយ៉ាងលឿននៅក្នុងទឹក និងខ្យល់។ ការរំលាយវាជាមួយក្រូម បង្កើតបានជាដែកអ៊ីណុក។ ក្រូមនឹងមានប្រតិកម្មជាមួយអុកស៊ីសែន បង្កើតជាស្រទាប់ការពារអុកស៊ីតស្តើងដែលមើលមិនឃើញ ការពារជាតិដែកខាងក្នុងពីការច្រែះ។"
                )}
              </p>
            </div>

            {/* Factor 3: Conductivity */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">{t("3. Modify Conductivity & Melting Points", "៣. កែប្រែចំណុចរលាយ និងចម្លងអគ្គិសនី")}</span>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "Alloying can lower melting points. For example, mixing tin and lead produces solder, which melts at low heat to connect electric circuits. Alloys can also modify electrical resistance to create heating components.",
                  "ការផ្សំលោហៈអាចបញ្ចុះចំណុចរលាយរបស់វា។ ឧទាហរណ៍ ការផ្សំសំណប៉ាហាំង និងសំណ បង្កើតបានជាសំណភូគ ដែលរលាយក្នុងកម្ដៅទាបដើម្បីភ្ជាប់សៀគ្វីអគ្គិសនី។ លោហៈធាតុផ្សំក៏អាចកែប្រែភាពធន់អគ្គិសនីសម្រាប់ធ្វើខ្សែអាំងឌុចស្យុងកម្តៅ។"
                )}
              </p>
            </div>

          </div>

          <div className="bg-orange-950/20 border border-orange-800/20 rounded-2xl p-5 flex items-start gap-3 mt-2">
            <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className={`text-xs text-orange-300 font-bold block mb-1 ${isKh ? "font-khmer" : ""}`}>
                {t("Historical Classroom Note", "កំណត់ត្រាប្រវត្តិសាស្ត្រក្នុងថ្នាក់")}
              </span>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "The discovery of alloys changed human civilization. The Bronze Age (begun ~3300 BCE in the Near East and later in Southeast Asia) allowed humans to craft tough tools and weapons out of copper and tin instead of soft stone or pure copper. This was followed by the Iron Age, where smelting ovens achieved the higher temperatures needed to extract iron and forge carbon steels.",
                  "ការរកឃើញលោហៈធាតុផ្សំបានផ្លាស់ប្ដូរអរិយធម៌មនុស្សជាតិ។ យុគសំរឹទ្ធ (ចាប់ផ្តើមប្រហែល ~៣៣០០ មុនគ.ស) បានអនុញ្ញាតឱ្យមនុស្សធ្វើឧបករណ៍ និងអាវុធរឹងមាំពីទង់ដែង និងសំណប៉ាហាំង ជំនួសឱ្យថ្ម ឬទង់ដែងសុទ្ធ។ បន្ទាប់មកគឺយុគដែក ដែលចង្រ្កានរំលាយលោហៈសម្រេចបានសីតុណ្ហភាពខ្ពស់ជាងមុន ដើម្បីទាញយកដែក និងសិតដែកថែប។"
                )}
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Navigation */}
      <footer className="max-w-[1600px] mx-auto px-6 py-12 text-center border-t border-slate-900 bg-slate-950/20 mt-12 z-10 relative">
        <Link
          href="/physics"
          className="inline-flex items-center gap-1.5 text-orange-400/80 hover:text-orange-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className={isKh ? "font-khmer text-xs" : "text-xs font-semibold"}>
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </span>
        </Link>
      </footer>
    </div>
  );
}

// ── Scoped Styling Component ──
function ScopedStyles() {
  return (
    <style>{`
      .text-glow-orange {
        color: #f97316;
        text-shadow: 0 0 20px rgba(249, 115, 22, 0.65), 0 0 40px rgba(249, 115, 22, 0.25);
      }
      .text-glow-slag {
        color: #64748b;
        text-shadow: 0 0 10px rgba(100, 116, 139, 0.3);
      }
      .chunky-dropdown {
        font-size: max(1.1rem, 2.1vw);
        padding: max(0.6rem, 1vw) max(0.9rem, 1.5vw);
      }
      .chunky-forge-btn {
        font-size: max(1rem, 1.8vw);
        padding: max(0.8rem, 1.2vw) max(1rem, 1.5vw);
        background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
        border: 2px solid #fdba74;
      }
      .chunky-forge-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
        box-shadow: 0 0 25px rgba(249, 115, 22, 0.45);
      }
      @keyframes forgeShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-2px, -1px) rotate(-1deg); }
        20% { transform: translate(-1px, 2px) rotate(1deg); }
        30% { transform: translate(2px, -1px) rotate(0deg); }
        40% { transform: translate(1px, -2px) rotate(1deg); }
        50% { transform: translate(-2px, 1px) rotate(-1deg); }
        60% { transform: translate(-1px, -1px) rotate(0deg); }
        70% { transform: translate(2px, 2px) rotate(1deg); }
        80% { transform: translate(-2px, -2px) rotate(-1deg); }
        90% { transform: translate(1px, 1px) rotate(0deg); }
      }
      @keyframes firePulse {
        0%, 100% { transform: scale(1) translateY(0); opacity: 0.8; }
        50% { transform: scale(1.15) translateY(-8px); opacity: 0.95; }
      }
      @keyframes sparkFly1 {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(-30px, -70px) scale(0.2); opacity: 0; }
      }
      @keyframes sparkFly2 {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(25px, -85px) scale(0.2); opacity: 0; }
      }
      @keyframes sparkFly3 {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(-5px, -95px) scale(0.2); opacity: 0; }
      }
      .animate-forge-shake {
        animation: forgeShake 0.15s linear infinite;
      }
      .animate-fire-pulse {
        animation: firePulse 0.4s ease-in-out infinite;
      }
      .animate-spark-1 {
        animation: sparkFly1 0.7s cubic-bezier(.22,.95,.4,1) infinite;
      }
      .animate-spark-2 {
        animation: sparkFly2 0.9s cubic-bezier(.22,.95,.4,1) infinite;
        animation-delay: 0.2s;
      }
      .animate-spark-3 {
        animation: sparkFly3 0.8s cubic-bezier(.22,.95,.4,1) infinite;
        animation-delay: 0.45s;
      }
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fade-in-scale {
        animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-forge-shake, .animate-fire-pulse, .animate-spark-1, .animate-spark-2, .animate-spark-3, .animate-fade-in-scale {
          animation: none !important;
        }
      }
    `}</style>
  );
}

// ── Background Gradients & Heat Glow ──
function ForgeBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #0f0714 0%, #030206 60%, #000000 100%)",
        }}
      />
      <div className="absolute top-24 -left-20 w-96 h-96 rounded-full bg-orange-600/5 blur-[120px]" />
      <div className="absolute top-[40%] -right-20 w-[450px] h-[450px] rounded-full bg-red-600/5 blur-[140px]" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-yellow-500/5 blur-[100px]" />
      
      {/* Molten grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(249, 115, 22, 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
