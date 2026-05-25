import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, FlaskRound, HelpCircle, Activity, ChevronRight, ChevronLeft, RotateCcw, BookOpen, User, Sparkles } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

type ElectrophileType = "formaldehyde" | "aldehyde" | "ketone" | "co2" | "epoxide" | "ester";

interface ElectrophileData {
  id: ElectrophileType;
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  step1DescEn: string;
  step1DescKh: string;
  step2DescEn: string;
  step2DescKh: string;
  productEn: string;
  productKh: string;
  equationEn: string;
  equationKh: string;
}

const ELECTROPHILES: ElectrophileData[] = [
  {
    id: "formaldehyde",
    nameEn: "Formaldehyde (HCHO)",
    nameKh: "ហ្វរម៉ាល់ដេអ៊ីត (HCHO)",
    descEn: "Reaction with formaldehyde yields a Primary Alcohol. The Grignard reagent adds to the single carbon of formaldehyde, extending the carbon chain by 1 carbon.",
    descKh: "ប្រតិកម្មជាមួយហ្វរម៉ាល់ដេអ៊ីតផ្តល់ជា អាល់កុលលំដាប់ទី១។ រេអាស៊ីត Grignard បូកចូលកាបូនតែមួយរបស់ហ្វរម៉ាល់ដេអ៊ីត ដោយពន្យារខ្សែស្រឡាយកាបូនចំនួន ១។",
    step1DescEn: "Step 1: Nucleophilic addition of the Grignard R group (carbanion) to formaldehyde's carbonyl carbon. This pushes the C=O double bond electrons onto oxygen, creating a magnesium alkoxide intermediate: R-CH₂-O-MgBr.",
    step1DescKh: "ជំហានទី ១៖ ការបូកញុយក្លេអូភីលនៃក្រុម R (កាបាស្យុង) ទៅលើកាបូនការបូនីលនៃហ្វរម៉ាល់ដេអ៊ីត។ វារុញអេឡិចត្រុងសម្ព័ន្ធទ្វេ C=O ទៅលើអាតូមអុកស៊ីសែន បង្កើតបានជាល្បាយកណ្តាល ម៉ាញេស្យូមអាល់កុកស៊ីត៖ R-CH₂-O-MgBr។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺). Acid protonates the oxygen anion, cleaving the O-MgBr bond to yield a Primary Alcohol (R-CH₂-OH) and the inorganic byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺)។ អាស៊ីតផ្តល់ប្រូតុងដល់អុកស៊ីសែនអាញ៉ុង ដោយផ្តាច់សម្ព័ន្ធ O-MgBr ដើម្បីផ្តល់ជាអាល់កុលលំដាប់ទី១ (R-CH₂-OH) និងផលិផលបន្ទាប់បន្សំអសរីរាង្គ Mg(OH)Br។",
    productEn: "Primary Alcohol (R-CH₂-OH)",
    productKh: "អាល់កុលលំដាប់ទី១ (R-CH₂-OH)",
    equationEn: "R-MgBr + HCHO → [R-CH₂-O-MgBr] ⎯(H₃O⁺)→ R-CH₂-OH + Mg(OH)Br",
    equationKh: "R-MgBr + HCHO → [R-CH₂-O-MgBr] ⎯(H₃O⁺)→ R-CH₂-OH + Mg(OH)Br",
  },
  {
    id: "aldehyde",
    nameEn: "Aldehyde (R'-CHO)",
    nameKh: "អាល់ដេអ៊ីត (R'-CHO)",
    descEn: "Reaction with other aldehydes (e.g., acetaldehyde) yields a Secondary Alcohol. The Grignard reagent adds to the carbonyl carbon, creating a branched carbon frame.",
    descKh: "ប្រតិកម្មជាមួយអាល់ដេអ៊ីតផ្សេងទៀត (ឧ. អាសេតាល់ដេអ៊ីត) ផ្តល់ជា អាល់កុលលំដាប់ទី២។ រេអាស៊ីត Grignard បូកចូលកាបូនការបូនីល បង្កើតបានជាទម្រង់កាបូនបែកខ្នែង។",
    step1DescEn: "Step 1: Nucleophilic addition of the Grignard R group to the carbonyl carbon of the aldehyde (R'-CHO). This breaks the C=O double bond, yielding a branched magnesium alkoxide intermediate: R'-CH(R)-O-MgBr.",
    step1DescKh: "ជំហានទី ១៖ ការបូកញុយក្លេអូភីលនៃក្រុម R Grignard ទៅលើកាបូនការបូនីលនៃអាល់ដេអ៊ីត (R'-CHO)។ វាកាត់ផ្តាច់សម្ព័ន្ធទ្វេ C=O ផ្តល់ជាល្បាយកណ្តាលម៉ាញេស្យូមអាល់កុកស៊ីតបែកខ្នែង៖ R'-CH(R)-O-MgBr។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺) protonates the oxygen anion, yielding a Secondary Alcohol (R'-CH(OH)-R) and the byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺) ផ្តល់ប្រូតុងដល់អុកស៊ីសែនអាញ៉ុង ដោយបង្កើតបានជាអាល់កុលលំដាប់ទី២ (R'-CH(OH)-R) និងផលិតផលបន្ទាប់បន្សំ Mg(OH)Br។",
    productEn: "Secondary Alcohol (R'-CH(OH)-R)",
    productKh: "អាល់កុលលំដាប់ទី២ (R'-CH(OH)-R)",
    equationEn: "R-MgBr + R'-CHO → [R'-CH(O-MgBr)-R] ⎯(H₃O⁺)→ R'-CH(OH)-R + Mg(OH)Br",
    equationKh: "R-MgBr + R'-CHO → [R'-CH(O-MgBr)-R] ⎯(H₃O⁺)→ R'-CH(OH)-R + Mg(OH)Br",
  },
  {
    id: "ketone",
    nameEn: "Ketone (R'₂CO)",
    nameKh: "សេតូន (R'₂CO)",
    descEn: "Reaction with ketones (e.g., acetone) yields a Tertiary Alcohol. The electrophilic carbon is bonded to three carbon groups after the addition step.",
    descKh: "ប្រតិកម្មជាមួយសេតូន (ឧ. អាសេតូន) ផ្តល់ជា អាល់កុលលំដាប់ទី៣។ កាបូនអេឡិចត្រូភីលភ្ជាប់ទៅនឹងក្រុមសម្ព័ន្ធកាបូនចំនួន ៣ បន្ទាប់ពីជំហានបូកបញ្ចូល។",
    step1DescEn: "Step 1: The Grignard R group attacks the sterically hindered carbonyl carbon of the ketone (R'₂CO), forming a highly branched tertiary magnesium alkoxide intermediate: R'₂C(R)-O-MgBr.",
    step1DescKh: "ជំហានទី ១៖ ក្រុម R Grignard វាយប្រហារលើកាបូនការបូនីលនៃសេតូន (R'₂CO) ដោយបង្កើតបានជាល្បាយកណ្តាលម៉ាញេស្យូមអាល់កុកស៊ីតលំដាប់ទី៣ បែកខ្នែងខ្លាំង៖ R'₂C(R)-O-MgBr។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺) protonates the bulky alkoxide, giving a Tertiary Alcohol (R'₂C(OH)-R) and the byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺) ផ្តល់ប្រូតុងដល់អាល់កុកស៊ីតលំដាប់ទី៣ ដោយបង្កើតបានជាអាល់កុលលំដាប់ទី៣ (R'₂C(OH)-R) និងផលិតផលបន្ទាប់បន្សំ Mg(OH)Br។",
    productEn: "Tertiary Alcohol (R'₂C(OH)-R)",
    productKh: "អាល់កុលលំដាប់ទី៣ (R'₂C(OH)-R)",
    equationEn: "R-MgBr + R'₂CO → [R'₂C(O-MgBr)-R] ⎯(H₃O⁺)→ R'₂C(OH)-R + Mg(OH)Br",
    equationKh: "R-MgBr + R'₂CO → [R'₂C(O-MgBr)-R] ⎯(H₃O⁺)→ R'₂C(OH)-R + Mg(OH)Br",
  },
  {
    id: "co2",
    nameEn: "Carbon Dioxide (CO₂)",
    nameKh: "កាបូនឌីអុកស៊ីត (CO₂)",
    descEn: "Reaction with Carbon Dioxide (dry ice) yields a Carboxylic Acid. This is a crucial method to add a carboxyl group (-COOH) to a carbon chain.",
    descKh: "ប្រតិកម្មជាមួយកាបូនឌីអុកស៊ីត (ទឹកកកស្ងួត) ផ្តល់ជា អាស៊ីតការបុកស៊ីលីច។ នេះជាវិធីសាស្ត្រដ៏សំខាន់ដើម្បីបន្ថែមក្រុមការបុកស៊ីល (-COOH) ទៅលើខ្សែស្រឡាយកាបូន។",
    step1DescEn: "Step 1: The nucleophilic Grignard reagent attacks the central carbon of CO₂. One of the double bonds opens, yielding a magnesium carboxylate salt intermediate: R-COO-MgBr.",
    step1DescKh: "ជំហានទី ១៖ រេអាស៊ីត Grignard ញុយក្លេអូភីល វាយប្រហារលើកាបូនកណ្តាលនៃ CO₂។ សម្ព័ន្ធទ្វេមួយបើកចេញ ផ្តល់ជាល្បាយកណ្តាលអំបិលម៉ាញេស្យូមការបុកស៊ីឡាត៖ R-COO-MgBr។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺) protonates the carboxylate oxygen, producing a Carboxylic Acid (R-COOH) and the inorganic salt byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺) ផ្តល់ប្រូតុងដល់អុកស៊ីសែនការបុកស៊ីឡាត ដោយបង្កើតបានជាអាស៊ីតការបុកស៊ីលីច (R-COOH) និងអំបិលបន្ទាប់បន្សំ Mg(OH)Br។",
    productEn: "Carboxylic Acid (R-COOH)",
    productKh: "អាស៊ីតការបុកស៊ីលីច (R-COOH)",
    equationEn: "R-MgBr + CO₂ → [R-COO-MgBr] ⎯(H₃O⁺)→ R-COOH + Mg(OH)Br",
    equationKh: "R-MgBr + CO₂ → [R-COO-MgBr] ⎯(H₃O⁺)→ R-COOH + Mg(OH)Br",
  },
  {
    id: "epoxide",
    nameEn: "Epoxide (Ethylene Oxide)",
    nameKh: "អេភុកស៊ីត (Ethylene Oxide)",
    descEn: "Reaction with epoxide (ethylene oxide) yields a Primary Alcohol. The ring strain of the three-membered ring makes it susceptible to nucleophilic attack, extending the carbon chain by 2 carbons.",
    descKh: "ប្រតិកម្មជាមួយអេភុកស៊ីតផ្តល់ជា អាល់កុលលំដាប់ទី១។ ភាពតានតឹងនៃរង្វង់ ៣ ជ្រុង ធ្វើឲ្យវាងាយនឹងរងការវាយប្រហារពីញុយក្លេអូភីល ដោយពន្យារខ្សែស្រឡាយកាបូនបាន ២ កាបូនបន្ថែម។",
    step1DescEn: "Step 1: The nucleophilic Grignard R group attacks a carbon of ethylene oxide, opening the strained 3-membered ether ring. This ring-opening process forms an extended magnesium alkoxide intermediate: R-CH₂-CH₂-O-MgBr.",
    step1DescKh: "ជំហានទី ១៖ ក្រុម R Grignard ញុយក្លេអូភីល វាយប្រហារលើកាបូនរបស់អេទីឡែនអុកស៊ីត ដោយបើករង្វង់អេធែរ ៣ ជ្រុងដែលមានភាពតានតឹងខ្លាំង។ ការបើករង្វង់នេះបង្កើតបានជាម៉ាញេស្យូមអាល់កុកស៊ីតពង្រីកខ្សែ៖ R-CH₂-CH₂-O-MgBr។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺) protonates the oxygen, yielding a chain-extended Primary Alcohol (R-CH₂-CH₂-OH) and the byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺) ផ្តល់ប្រូតុងដល់អុកស៊ីសែន ដោយបង្កើតបានជាអាល់កុលលំដាប់ទី១ ពន្យារខ្សែ (R-CH₂-CH₂-OH) និងផលិផលបន្ទាប់បន្សំ Mg(OH)Br។",
    productEn: "Primary Alcohol (R-CH₂-CH₂-OH)",
    productKh: "អាល់កុលលំដាប់ទី១ (R-CH₂-CH₂-OH)",
    equationEn: "R-MgBr + C₂H₄O → [R-CH₂-CH₂-O-MgBr] ⎯(H₃O⁺)→ R-CH₂-CH₂-OH + Mg(OH)Br",
    equationKh: "R-MgBr + C₂H₄O → [R-CH₂-CH₂-O-MgBr] ⎯(H₃O⁺)→ R-CH₂-CH₂-OH + Mg(OH)Br",
  },
  {
    id: "ester",
    nameEn: "Ester (Methyl Acetate)",
    nameKh: "អេស្ទែ (Methyl Acetate)",
    descEn: "Reaction with esters yields a Tertiary Alcohol containing two equivalents of the Grignard R group. The ester alkoxy group acts as a leaving group during the reaction cascade.",
    descKh: "ប្រតិកម្មជាមួយអេស្ទែផ្តល់ជា អាល់កុលលំដាប់ទី៣ ដែលមានក្រុម R Grignard ចំនួនពីរ។ ក្រុមអាល់កុកស៊ីនៃអេស្ទែដើរតួជាក្រុមចាកចេញ អំឡុងពេលប្រតិកម្មតគ្នា។",
    step1DescEn: "Step 1: The Grignard reagent attacks the ester carbonyl carbon. The alkoxy group (-OCH₃) is kicked off as a leaving group, forming a ketone. A second equivalent of Grignard reagent immediately attacks this ketone to form the tertiary alkoxide intermediate.",
    step1DescKh: "ជំហានទី ១៖ រេអាស៊ីត Grignard វាយប្រហារកាបូនការបូនីលរបស់អេស្ទែ។ ក្រុមអាល់កុកស៊ី (-OCH₃) ត្រូវបានច្រានចេញជាក្រុមចាកចេញ បង្កើតបានជាសេតូន។ បន្ទាប់មករេអាស៊ីត Grignard ម៉ូលេគុលទី២ វាយប្រហារភ្លាមៗលើសេតូននេះ បង្កើតបានជាល្បាយកណ្តាលអាល់កុកស៊ីតលំដាប់ទី៣។",
    step2DescEn: "Step 2: Acidic hydrolysis (H₃O⁺) protonates the alkoxide intermediate, producing a Tertiary Alcohol (R'-C(OH)R₂) and the byproduct Mg(OH)Br.",
    step2DescKh: "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត (H₃O⁺) ផ្តល់ប្រូតុងដល់ល្បាយកណ្តាលអាល់កុកស៊ីត ដោយបង្កើតបានជាអាល់កុលលំដាប់ទី៣ (R'-C(OH)R₂) និងផលិផលបន្ទាប់បន្សំ Mg(OH)Br។",
    productEn: "Tertiary Alcohol (R'-C(OH)R₂)",
    productKh: "អាល់កុលលំដាប់ទី៣ (R'-C(OH)R₂)",
    equationEn: "R'-COOCH₃ + 2 R-MgBr → [R'-C(O-MgBr)R₂] ⎯(H₃O⁺)→ R'-C(OH)R₂ + Mg(OH)Br + CH₃OH",
    equationKh: "R'-COOCH₃ + 2 R-MgBr → [R'-C(O-MgBr)R₂] ⎯(H₃O⁺)→ R'-C(OH)R₂ + Mg(OH)Br + CH₃OH",
  }
];

export default function GrignardReactionPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [activeTarget, setActiveTarget] = useState<ElectrophileType>("formaldehyde");
  const [step, setStep] = useState<number>(1);

  const translate = (en: string, kh: string) => (isKh ? kh : en);

  const selectedData = ELECTROPHILES.find((e) => e.id === activeTarget) || ELECTROPHILES[0];

  const handleNext = () => {
    if (step < 2) setStep(2);
  };

  const handlePrev = () => {
    if (step > 1) setStep(1);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background space elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/science" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Science Hub", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <FlaskRound className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Grignard Reaction Explorer", "ប្រតិកម្ម Grignard")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>NOBEL-CHEM-1912</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Stepper Visualizer (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6">
            
            {/* Visualizer Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                  {t("INTERACTIVE REACTION VISUALIZER", "ការបង្ហាញចលនាប្រតិកម្មអន្តរកម្ម")}
                </span>
                <h2 className={`text-lg sm:text-xl font-black text-white ${isKh ? "font-khmer" : ""}`}>
                  {step === 1 
                    ? t("Step 1: Nucleophilic Addition to Electrophile", "ជំហានទី ១៖ ការបូកញុយក្លេអូភីលទៅលើអេឡិចត្រូភីល")
                    : t("Step 2: Acidic Hydrolysis (H₃O⁺ Protonation)", "ជំហានទី ២៖ អ៊ីដ្រូលីសក្នុងមជ្ឈដ្ឋានអាស៊ីត")}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
                <span className="font-mono text-cyan-400 text-xs font-bold bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                  {t("Step", "ជំហាន")} {step} / 2
                </span>
              </div>
            </div>

            {/* Target Select Buttons Selector */}
            <div className="flex flex-col gap-2">
              <span className={`text-[10px] text-slate-400 font-bold uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                {t("1. Select Electrophile Target", "១. ជ្រើសរើសប្រភេទអេឡិចត្រូភីលគោលដៅ")}
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-900">
                {(["formaldehyde", "aldehyde", "ketone", "co2", "epoxide", "ester"] as ElectrophileType[]).map((id) => {
                  const item = ELECTROPHILES.find((e) => e.id === id)!;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveTarget(id);
                        setStep(1);
                      }}
                      className={`py-2 px-1 rounded-xl font-bold text-[10px] sm:text-xs text-center flex flex-col items-center justify-center gap-1 transition-all ${
                        activeTarget === id
                          ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                          : "bg-transparent border border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${activeTarget === id ? "text-cyan-400" : "text-slate-700"}`} />
                      <span className="truncate max-w-full">{isKh ? item.nameKh.split(" ")[0] : item.nameEn.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Summary Short Quote */}
            <p className={`text-slate-400 italic border-l-4 border-cyan-500 pl-4 py-1 leading-relaxed ${isKh ? "font-khmer text-xs leading-loose" : "text-xs"}`}>
              {isKh ? selectedData.descKh : selectedData.descEn}
            </p>

            {/* SVG Molecular Stepper Canvas */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[360px] sm:min-h-[400px] relative overflow-hidden">
              
              <svg viewBox="0 0 680 360" className="w-full h-auto select-none">
                {/* Arrowhead definition for electron pushing arrows */}
                <defs>
                  <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                  </marker>
                </defs>

                {/* Grignard Reagent Reactant: R-MgBr (Always present in Step 1) */}
                {step === 1 && (
                  <g className="transition-all duration-500">
                    <text x="80" y="186" fill="#f59e0b" fontSize="22" fontWeight="bold" fontFamily="sans-serif">R</text>
                    
                    {/* Polar covalent bond vector */}
                    <line x1="102" y1="180" x2="148" y2="180" stroke="#cbd5e1" strokeWidth="2.5" />
                    
                    {/* MgBr */}
                    <text x="155" y="186" fill="#f97316" fontSize="18" fontWeight="bold" fontFamily="sans-serif">Mg</text>
                    <line x1="182" y1="180" x2="208" y2="180" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="215" y="186" fill="#ef4444" fontSize="18" fontWeight="bold" fontFamily="sans-serif">Br</text>

                    <text x="140" y="225" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Grignard Reagent</text>
                    
                    {/* Dipole delta signs */}
                    <text x="80" y="155" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">δ⁻</text>
                    <text x="155" y="155" fill="#f97316" fontSize="10" fontWeight="bold" fontFamily="monospace">δ⁺</text>

                    {/* electron pushing arrow from R-Mg bond to electrophilic carbon */}
                    <path d="M 125,175 C 180,130 260,110 325,155" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                  </g>
                )}

                {/* ── SELECTIVE TARGET STRUCTURES ── */}

                {/* 1. Formaldehyde Target HCHO */}
                {activeTarget === "formaldehyde" && step === 1 && (
                  <g>
                    {/* Carbonyl center */}
                    <text x="340" y="186" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                    <line x1="335" y1="168" x2="310" y2="140" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="295" y="138" fill="#cbd5e1" fontSize="16" fontWeight="bold">H</text>
                    
                    <line x1="355" y1="192" x2="380" y2="220" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="382" y="234" fill="#cbd5e1" fontSize="16" fontWeight="bold">H</text>

                    {/* Double bonded carbonyl oxygen */}
                    <line x1="345" y1="168" x2="345" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <line x1="352" y1="168" x2="352" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <text x="342" y="120" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Arrow opening C=O double bond */}
                    <path d="M 353,150 C 365,145 365,135 358,128" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Formaldehyde</text>
                  </g>
                )}

                {/* 2. Aldehyde Target R'-CHO */}
                {activeTarget === "aldehyde" && step === 1 && (
                  <g>
                    <text x="340" y="186" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                    {/* Alkyl group R' */}
                    <line x1="335" y1="168" x2="310" y2="140" stroke="#f59e0b" strokeWidth="2.2" />
                    <text x="292" y="138" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>
                    
                    <line x1="355" y1="192" x2="380" y2="220" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="382" y="234" fill="#cbd5e1" fontSize="16" fontWeight="bold">H</text>

                    <line x1="345" y1="168" x2="345" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <line x1="352" y1="168" x2="352" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <text x="342" y="120" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    <path d="M 353,150 C 365,145 365,135 358,128" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Aldehyde</text>
                  </g>
                )}

                {/* 3. Ketone Target R'2CO */}
                {activeTarget === "ketone" && step === 1 && (
                  <g>
                    <text x="340" y="186" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                    <line x1="335" y1="168" x2="310" y2="140" stroke="#f59e0b" strokeWidth="2.2" />
                    <text x="292" y="138" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>
                    
                    <line x1="355" y1="192" x2="380" y2="220" stroke="#f59e0b" strokeWidth="2.2" />
                    <text x="382" y="234" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>

                    <line x1="345" y1="168" x2="345" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <line x1="352" y1="168" x2="352" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <text x="342" y="120" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    <path d="M 353,150 C 365,145 365,135 358,128" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Ketone</text>
                  </g>
                )}

                {/* 4. Carbon Dioxide Target CO2 */}
                {activeTarget === "co2" && step === 1 && (
                  <g>
                    <text x="340" y="186" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                    
                    {/* Left carbonyl */}
                    <line x1="332" y1="172" x2="292" y2="172" stroke="#ef4444" strokeWidth="2" />
                    <line x1="332" y1="179" x2="292" y2="179" stroke="#ef4444" strokeWidth="2" />
                    <text x="270" y="186" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Right carbonyl */}
                    <line x1="358" y1="172" x2="398" y2="172" stroke="#ef4444" strokeWidth="2" />
                    <line x1="358" y1="179" x2="398" y2="179" stroke="#ef4444" strokeWidth="2" />
                    <text x="405" y="186" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Open one double bond arrow */}
                    <path d="M 358,168 C 370,158 390,158 398,168" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Carbon Dioxide (CO₂)</text>
                  </g>
                )}

                {/* 5. Epoxide Target */}
                {activeTarget === "epoxide" && step === 1 && (
                  <g>
                    {/* 3-membered ring */}
                    <text x="310" y="186" fill="#cbd5e1" fontSize="16" fontWeight="bold">CH₂</text>
                    <text x="370" y="186" fill="#cbd5e1" fontSize="16" fontWeight="bold">CH₂</text>
                    <text x="342" y="140" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* bonds */}
                    <line x1="326" y1="176" x2="368" y2="176" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="318" y1="168" x2="338" y2="142" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="382" y1="168" x2="358" y2="142" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Attack breaks ring C-O bond */}
                    <path d="M 334,152 C 322,158 322,170 324,174" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Epoxide (Ethylene Oxide)</text>
                  </g>
                )}

                {/* 6. Ester Target */}
                {activeTarget === "ester" && step === 1 && (
                  <g>
                    {/* Ester Carbonyl */}
                    <text x="340" y="186" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                    <line x1="335" y1="168" x2="310" y2="140" stroke="#f59e0b" strokeWidth="2.2" />
                    <text x="292" y="138" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>
                    
                    {/* Alkoxy group leaving group */}
                    <line x1="358" y1="180" x2="388" y2="180" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="395" y="186" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                    <line x1="412" y1="180" x2="438" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x="442" y="186" fill="#cbd5e1" fontSize="14" fontWeight="bold">CH₃</text>

                    <line x1="345" y1="168" x2="345" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <line x1="352" y1="168" x2="352" y2="128" stroke="#ef4444" strokeWidth="2" />
                    <text x="342" y="120" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* electron pushing arrow */}
                    <path d="M 353,150 C 365,145 365,135 358,128" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    
                    <text x="345" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">Ester (Methyl Acetate)</text>
                  </g>
                )}


                {/* ── STEP 2: Intermediate & Hydrolysis Products ────────────── */}
                {step === 2 && (
                  <g className="transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
                    
                    {/* Left: Magnesium Alkoxide Intermediate */}
                    <g>
                      <rect x="30" y="60" width="280" height="200" rx="15" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="170" y="85" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">ALKOXIDE INTERMEDIATE</text>

                      {/* Intermediate structures based on active Target */}
                      {activeTarget === "formaldehyde" && (
                        <g>
                          <text x="110" y="166" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="128" y1="160" x2="152" y2="160" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="160" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          
                          <line x1="195" y1="160" x2="218" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="225" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          {/* MgBr ion pair */}
                          <text x="245" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="236" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="232" y1="152" x2="240" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeTarget === "aldehyde" && (
                        <g>
                          <text x="80" y="166" fill="#f59e0b" fontSize="20" fontWeight="bold">R'</text>
                          <line x1="100" y1="160" x2="128" y2="160" stroke="#cbd5e1" strokeWidth="2.5" />
                          
                          <text x="135" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH</text>
                          <line x1="145" y1="172" x2="145" y2="200" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="140" y="218" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>

                          <line x1="162" y1="160" x2="188" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="195" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          <text x="215" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="206" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="202" y1="152" x2="210" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeTarget === "ketone" && (
                        <g>
                          <text x="135" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          <line x1="130" y1="150" x2="110" y2="125" stroke="#f59e0b" strokeWidth="2.2" />
                          <text x="92" y="122" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>

                          <line x1="152" y1="150" x2="172" y2="125" stroke="#f59e0b" strokeWidth="2.2" />
                          <text x="175" y="122" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>

                          <line x1="145" y1="172" x2="145" y2="200" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="140" y="218" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>

                          <line x1="155" y1="160" x2="188" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="195" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          <text x="215" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="206" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="202" y1="152" x2="210" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeTarget === "co2" && (
                        <g>
                          <text x="100" y="166" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="118" y1="160" x2="142" y2="160" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="150" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          
                          {/* double bonded O */}
                          <line x1="152" y1="150" x2="152" y2="120" stroke="#ef4444" strokeWidth="2" />
                          <line x1="159" y1="150" x2="159" y2="120" stroke="#ef4444" strokeWidth="2" />
                          <text x="149" y="112" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                          {/* O-MgBr */}
                          <line x1="166" y1="160" x2="192" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="198" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          <text x="218" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="209" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="205" y1="152" x2="213" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeTarget === "epoxide" && (
                        <g>
                          <text x="80" y="166" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="98" y1="160" x2="118" y2="160" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="125" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          <line x1="160" y1="160" x2="182" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="190" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          
                          <line x1="225" y1="160" x2="246" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="252" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          <text x="272" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="263" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="259" y1="152" x2="267" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeTarget === "ester" && (
                        <g>
                          <text x="135" y="166" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          <line x1="130" y1="150" x2="110" y2="125" stroke="#f59e0b" strokeWidth="2.2" />
                          <text x="92" y="122" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>

                          <line x1="145" y1="172" x2="120" y2="198" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="105" y="214" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>

                          <line x1="152" y1="172" x2="172" y2="198" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="175" y="214" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>

                          <line x1="155" y1="160" x2="188" y2="160" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="195" y="166" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                          
                          <text x="215" y="146" fill="#f97316" fontSize="13" fontWeight="bold">MgBr⁺</text>
                          <circle cx="206" cy="152" r="6" fill="none" stroke="#ef4444" strokeWidth="1" />
                          <line x1="202" y1="152" x2="210" y2="152" stroke="#ef4444" strokeWidth="1.5" />
                        </g>
                      )}

                    </g>

                    {/* Acidic Hydrolysis Catalyst H3O+ Entering */}
                    <g>
                      <text x="350" y="120" fill="#3b82f6" fontSize="28" fontWeight="bold">+</text>
                      
                      <text x="400" y="115" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                      <line x1="412" y1="102" x2="425" y2="92" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="428" y="92" fill="#cbd5e1" fontSize="13" fontWeight="bold">H</text>

                      <line x1="412" y1="122" x2="425" y2="132" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="428" y="136" fill="#cbd5e1" fontSize="13" fontWeight="bold">H</text>

                      <line x1="395" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="366" y="114" fill="#cbd5e1" fontSize="13" fontWeight="bold">H</text>

                      {/* Positive charge on Hydronium */}
                      <text x="408" y="90" fill="#3b82f6" fontSize="11" fontWeight="bold">⁺</text>

                      <text x="405" y="152" fill="#3b82f6" fontSize="10" fontFamily="sans-serif">Hydronium (H₃O⁺)</text>

                      {/* arrow pushing arrow from Alkoxide oxygen to H3O+ proton */}
                      <path d="M 235,160 C 275,170 340,150 365,122" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead-green)" />
                    </g>

                    {/* Right: Hydrolysis final products */}
                    <g className="animate-[bounce_3s_infinite]">
                      
                      {/* Decorative product highlight frame */}
                      <rect x="470" y="160" width="190" height="135" rx="15" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="565" y="180" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">FINAL ORGANIC PRODUCT</text>

                      {/* Final alcohol molecules */}
                      {activeTarget === "formaldehyde" && (
                        <g>
                          <text x="495" y="236" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="512" y1="230" x2="538" y2="230" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="546" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          <line x1="581" y1="230" x2="602" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="608" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      {activeTarget === "aldehyde" && (
                        <g>
                          <text x="480" y="236" fill="#f59e0b" fontSize="18" fontWeight="bold">R'</text>
                          <line x1="496" y1="230" x2="518" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="525" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH</text>
                          <line x1="535" y1="242" x2="535" y2="265" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="530" y="280" fill="#f59e0b" fontSize="18" fontWeight="bold">R</text>
                          <line x1="550" y1="230" x2="572" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="578" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      {activeTarget === "ketone" && (
                        <g>
                          <text x="525" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          <line x1="520" y1="220" x2="505" y2="200" stroke="#f59e0b" strokeWidth="2" />
                          <text x="490" y="196" fill="#f59e0b" fontSize="16" fontWeight="bold">R'</text>
                          <line x1="535" y1="220" x2="550" y2="200" stroke="#f59e0b" strokeWidth="2" />
                          <text x="555" y="196" fill="#f59e0b" fontSize="16" fontWeight="bold">R'</text>
                          <line x1="530" y1="242" x2="530" y2="265" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="525" y="280" fill="#f59e0b" fontSize="18" fontWeight="bold">R</text>
                          <line x1="545" y1="230" x2="570" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="576" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      {activeTarget === "co2" && (
                        <g>
                          <text x="490" y="236" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="508" y1="230" x2="532" y2="230" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="540" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          
                          {/* carbonyl O */}
                          <line x1="542" y1="220" x2="542" y2="195" stroke="#ef4444" strokeWidth="2" />
                          <line x1="549" y1="220" x2="549" y2="195" stroke="#ef4444" strokeWidth="2" />
                          <text x="540" y="190" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                          {/* OH */}
                          <line x1="556" y1="230" x2="582" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="588" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      {activeTarget === "epoxide" && (
                        <g>
                          <text x="480" y="236" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                          <line x1="498" y1="230" x2="518" y2="230" stroke="#cbd5e1" strokeWidth="2.5" />
                          <text x="525" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          <line x1="560" y1="230" x2="582" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="590" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">CH₂</text>
                          <line x1="626" y1="230" x2="646" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="652" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      {activeTarget === "ester" && (
                        <g>
                          <text x="525" y="236" fill="#cbd5e1" fontSize="18" fontWeight="bold">C</text>
                          <line x1="520" y1="220" x2="505" y2="200" stroke="#f59e0b" strokeWidth="2" />
                          <text x="490" y="196" fill="#f59e0b" fontSize="16" fontWeight="bold">R'</text>
                          <line x1="520" y1="242" x2="500" y2="265" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="485" y="280" fill="#f59e0b" fontSize="18" fontWeight="bold">R</text>
                          <line x1="538" y1="242" x2="558" y2="265" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="560" y="280" fill="#f59e0b" fontSize="18" fontWeight="bold">R</text>
                          <line x1="545" y1="230" x2="570" y2="230" stroke="#cbd5e1" strokeWidth="2" />
                          <text x="576" y="236" fill="#ef4444" fontSize="18" fontWeight="bold">OH</text>
                        </g>
                      )}

                      <text x="565" y="310" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">{isKh ? selectedData.productKh : selectedData.productEn}</text>
                    </g>

                    {/* Byproduct Magnesium Hydroxybromide: Mg(OH)Br */}
                    <g opacity="0.4">
                      <text x="350" y="240" fill="#f97316" fontSize="15" fontWeight="bold">Mg</text>
                      <line x1="372" y1="234" x2="388" y2="234" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="393" y="240" fill="#ef4444" fontSize="15" fontWeight="bold">OH</text>
                      <line x1="360" y1="246" x2="360" y2="262" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="353" y="275" fill="#ef4444" fontSize="15" fontWeight="bold">Br</text>
                      <text x="330" y="295" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Mg(OH)Br</text>
                    </g>

                  </g>
                )}

              </svg>

              {/* State Indicator */}
              <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className={`text-[10px] font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                  {step === 1 && t("NUCLEOPHILIC ADDITION STEP ACTIVE", "យន្តការបូកញុយក្លេអូភីល")}
                  {step === 2 && t("ACIDIC WORK-UP SUCCESS: PRODUCT ISOLATED", "អ៊ីដ្រូលីសអាស៊ីតជោគជ័យ៖ ទទួលបានអាល់កុល")}
                </span>
              </div>

            </div>

            {/* Stepper text explanation box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase">
                {t("CHEMISTRY EQUATION & DESCRIPTION", "សមីការគីមី និងការពណ៌នា")}
              </span>
              <div className="font-mono text-xs text-white bg-slate-900/85 px-3 py-2 rounded-xl border border-slate-800 text-center overflow-x-auto">
                {isKh ? selectedData.equationKh : selectedData.equationEn}
              </div>
              <p className={`text-slate-300 leading-relaxed mt-1 ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}>
                {step === 1 ? (isKh ? selectedData.step1DescKh : selectedData.step1DescEn) : (isKh ? selectedData.step2DescKh : selectedData.step2DescEn)}
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 text-slate-300 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t("Previous", "ត្រឡប់ក្រោយ")}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 hover:text-white text-slate-400 transition-all"
                title={t("Reset", "កំណត់ឡើងវិញ")}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={step === 2}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:text-cyan-300 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t("Hydrolysis (Step 2)", "អ៊ីដ្រូលីស (ជំហានទី២)")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Educational Reference Cards & Biography (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Reagent Formation */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("Reagent Formation", "ការបង្កើតរេអាស៊ីត")}
              </h3>
            </div>
            
            {/* Reactivity order highlight */}
            <div className="bg-gradient-to-r from-cyan-950/40 to-slate-950/50 border-l-4 border-cyan-500 p-4 rounded-r-2xl">
              <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                {t("HALIDE REACTIVITY ORDER", "លំដាប់ភាពសកម្មនៃអាឡូសែន")}
              </span>
              <span className="font-sans font-bold text-white text-sm block">
                {t("Iodide (I) > Bromide (Br) > Chloride (Cl)", "អាយូឌីត (I) > ប្រូមីត (Br) > ក្លរីត (Cl)")}
              </span>
            </div>

            <p
              className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "Grignard reagents are prepared by reacting an alkyl or aryl halide (R-X) with metallic magnesium (Mg) in an anhydrous ether solvent (like diethyl ether or THF). The anhydrous environment is absolutely critical because Grignard reagents are highly reactive bases that instantly decompose in the presence of water.",
                "រេអាស៊ីត Grignard ត្រូវបានរៀបចំឡើងដោយធ្វើប្រតិកម្មរវាងអាល់គីល ឬអារីលអាឡូសែន (R-X) ជាមួយម៉ាញេស្យូមលោហៈ (Mg) នៅក្នុងសារធាតុរំលាយអេធែរគ្មានទឹក (ដូចជាឌីអេទីលអេធែរ ឬ THF)។ មជ្ឈដ្ឋានគ្មានទឹកគឺពិតជាមានសារៈសំខាន់ខ្លាំងណាស់ ព្រោះរេអាស៊ីត Grignard គឺជាបាសដែលមានប្រតិកម្មខ្លាំងបំផុត ដែលវានឹងរលាយភ្លាមៗនៅពេលមានវត្តមានទឹក។"
              )}
            </p>
          </div>

          {/* Card 2: The Superpower */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("The Carbon-Carbon Superpower", "អានុភាពនៃការបង្កើតសម្ព័ន្ធ C-C")}
              </h3>
            </div>

            <p
              className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "The carbon atom bonded to magnesium acts as a strong nucleophile and a powerful base (carbanion). It targets electrophilic carbonyl carbon atoms to form new Carbon-Carbon (C-C) bonds. This carbon-chain-building superpower makes Grignard reactions one of the most versatile and important methods in synthetic organic chemistry.",
                "អាតូមកាបូនដែលភ្ជាប់ទៅនឹងម៉ាញេស្យូមដើរតួជាញុយក្លេអូភីល និងជាបាសដ៏ខ្លាំងក្លា (កាបាស្យុង)។ វាវាយប្រហារលើអាតូមកាបូនការបូនីលដែលមានអេឡិចត្រូភីល ដើម្បីបង្កើតបានជាសម្ព័ន្ធកាបូន-កាបូន (C-C) ថ្មី។ អានុភាពនៃការបង្កើតខ្សែស្រឡាយកាបូននេះ ធ្វើឲ្យប្រតិកម្ម Grignard ក្លាយជាវិធីសាស្ត្រដ៏សំខាន់ និងមានអត្ថប្រយោជន៍បំផុតនៅក្នុងគីមីវិទ្យាសំយោគសរីរាង្គ។"
              )}
            </p>
          </div>

          {/* Card 3: Scientist Spotlight */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <User className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("Scientist Spotlight", "ប្រវត្តិអ្នកវិទ្យាសាស្ត្រ")}
              </h3>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-serif text-lg font-bold shrink-0 shadow-inner">
                VG
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-base">Victor Grignard</span>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">1871 – 1935 | NOBEL LAUREATE</span>
              </div>
            </div>

            <p
              className={`text-slate-400 leading-relaxed border-t border-slate-800/85 pt-3 ${
                isKh ? "font-khmer leading-loose text-sm" : "text-sm"
              }`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "François Auguste Victor Grignard was a French chemist who discovered the organomagnesium halide reagents. He was awarded the Nobel Prize in Chemistry in 1912 for his discovery, which completely revolutionized carbon chain building and organic chemical synthesis.",
                "François Auguste Victor Grignard គឺជាអ្នកគីមីវិទ្យាជនជាតិបារាំង ដែលបានរកឃើញរេអាស៊ីតម៉ាញេស្យូមអាឡូសែន។ លោកទទួលបានពានរង្វាន់ណូបែលគីមីវិទ្យាក្នុងឆ្នាំ ១៩១២ សម្រាប់ការរកឃើញនេះ ដែលវាបានធ្វើបដិវត្តន៍ទាំងស្រុងលើការបង្កើតខ្សែស្រឡាយកាបូន និងការសំយោគគីមីសរីរាង្គ។"
              )}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
