import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield, Activity, Info, Beaker, PlayCircle, ShieldAlert, HeartPulse } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Data: Anatomy of HIV ───────────────────────────────────────────────────
const HIV_COMPONENTS = [
  {
    id: "envelope",
    nameEn: "Viral Envelope & Glycoproteins",
    nameKh: "ស្រោមវីរុស និងគ្លីកូប្រូតេអ៊ីន",
    descEn: "The outer coat made of lipids. The glycoproteins (spikes) act like keys to unlock and attach to human CD4 cells.",
    descKh: "អាវធំខាងក្រៅធ្វើពីខ្លាញ់។ គ្លីកូប្រូតេអ៊ីន (បន្លា) ដើរតួដូចជាកូនសោដើម្បីចាក់សោរ និងភ្ជាប់ទៅនឹងកោសិកា CD4 របស់មនុស្ស។"
  },
  {
    id: "capsid",
    nameEn: "Capsid",
    nameKh: "កាបស៊ីត",
    descEn: "The bullet-shaped protein shell that protects the viral genetic material inside.",
    descKh: "សំបកប្រូតេអ៊ីនរាងដូចគ្រាប់កាំភ្លើង ដែលការពារសម្ភារៈហ្សែនវីរុសនៅខាងក្នុង។"
  },
  {
    id: "rna",
    nameEn: "RNA (Genetic Material)",
    nameKh: "អង់ហ្ស៊ីម RNA (សម្ភារៈហ្សែន)",
    descEn: "The genetic blueprint of the virus, carrying the instructions to make thousands of new viruses.",
    descKh: "ប្លង់គោលហ្សែនរបស់វីរុស ដែលផ្ទុកការណែនាំដើម្បីបង្កើតវីរុសថ្មីរាប់ពាន់។"
  },
  {
    id: "enzymes",
    nameEn: "Enzymes (RT, Integrase, Protease)",
    nameKh: "អង់ស៊ីម (RT, អាំងតេក្រាស, ប្រូតេអាស)",
    descEn: "Chemical workers. Reverse Transcriptase turns RNA into DNA. Integrase inserts it into the human DNA. Protease cuts new proteins to assemble new viruses.",
    descKh: "កម្មករគីមី។ Reverse Transcriptase បំប្លែង RNA ទៅជា DNA។ អាំងតេក្រាស បញ្ចូលវាទៅក្នុង DNA មនុស្ស។ ប្រូតេអាស កាត់ប្រូតេអ៊ីនថ្មីដើម្បីផ្គុំវីរុសថ្មី។"
  }
];

// ── Data: Life Cycle ───────────────────────────────────────────────────────
const LIFE_CYCLE_STEPS = [
  {
    id: 1,
    nameEn: "1. Attachment",
    nameKh: "១. ការភ្ជាប់",
    descEn: "The virus locks onto the CD4 receptor of the white blood cell.",
    descKh: "វីរុសចាក់សោរលើអ្នកទទួល CD4 នៃគ្រាប់ឈាមស។"
  },
  {
    id: 2,
    nameEn: "2. Invasion & Transcription",
    nameKh: "២. ការលុកលុយ និងការចម្លង",
    descEn: "The Capsid releases RNA, and enzymes convert it into viral DNA.",
    descKh: "កាបស៊ីតបញ្ចេញ RNA ហើយអង់ស៊ីមបំប្លែងវាទៅជា DNA វីរុស។"
  },
  {
    id: 3,
    nameEn: "3. Integration",
    nameKh: "៣. ការបញ្ចូលគ្នា",
    descEn: "The viral DNA slips into the cell's nucleus and hides in human DNA.",
    descKh: "DNA វីរុសជ្រៀតចូលទៅក្នុងស្នូលកោសិកា ហើយលាក់ខ្លួននៅក្នុង DNA មនុស្ស។"
  },
  {
    id: 4,
    nameEn: "4. Synthesis",
    nameKh: "៤. ការសំយោគ",
    descEn: "The hijacked cell is tricked into building new viral proteins.",
    descKh: "កោសិកាដែលត្រូវគេចាប់ជំរិត ត្រូវបោកបញ្ឆោតឲ្យបង្កើតប្រូតេអ៊ីនវីរុសថ្មី។"
  },
  {
    id: 5,
    nameEn: "5. Maturation & Migration",
    nameKh: "៥. ការពេញវ័យ និងការធ្វើចំណាកស្រុក",
    descEn: "New viruses assemble, push out of the cell, and mature to infect others.",
    descKh: "វីរុសថ្មីប្រមូលផ្តុំ រុញចេញពីកោសិកា ហើយក្លាយជាពេញវ័យដើម្បីចម្លងអ្នកដទៃ។"
  }
];

export default function HivAidsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/well-being/communicable-diseases"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Well-being", "ត្រឡប់ទៅផ្នែកសុខុមាលភាព")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border-2 border-rose-400/60 text-rose-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Understanding HIV & AIDS", "ការយល់ដឹងអំពីមេរោគអេដស៍ និងជំងឺអេដស៍")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Exploring the anatomy, life cycle, and modern treatments.", "ស្វែងយល់ពីរចនាសម្ព័ន្ធ វដ្តជីវិត និងការព្យាបាលបែបទំនើប។")}
              </p>
            </div>
          </div>

          <div className={`bg-rose-950/20 border border-rose-500/20 rounded-3xl p-6 sm:p-8 text-lg sm:text-[1.5vw] text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <p className="mb-4">
              <strong className="text-white">{t("HIV (Human Immunodeficiency Virus)", "មេរោគអេដស៍ (HIV)")}</strong> {t("is a virus that attacks the body's immune system, specifically the ", "គឺជាវីរុសដែលវាយប្រហារប្រព័ន្ធភាពស៊ាំរបស់រាងកាយ ជាពិសេស")} <strong className="text-rose-400">{t("CD4-positive T Lymphocytes", "កោសិកាឈាមស CD4-positive T Lymphocytes")}</strong> {t(" (the white blood cells that defend against infections).", " (កោសិកាឈាមសដែលការពារប្រឆាំងនឹងការឆ្លងមេរោគ)។")}
            </p>
            <p>
              <strong className="text-white">{t("AIDS (Acquired Immunodeficiency Syndrome)", "ជំងឺអេដស៍ (AIDS)")}</strong> {t("is the final stage of the disease, where the immune system is severely damaged. With modern medicine (ARVs), a person with HIV can live a long, healthy life and never develop AIDS.", "គឺជាដំណាក់កាលចុងក្រោយនៃជំងឺ ដែលប្រព័ន្ធភាពស៊ាំត្រូវបានខូចខាតយ៉ាងធ្ងន់ធ្ងរ។ ជាមួយនឹងថ្នាំទំនើប (ARV) អ្នកដែលមានមេរោគអេដស៍អាចរស់នៅបានយូរ មានសុខភាពល្អ និងមិនដែលវិវត្តទៅជាជំងឺអេដស៍ឡើយ។")}
            </p>
          </div>
        </div>

        {/* Interactive 'Anatomy of HIV' Explorer */}
        <AnatomyExplorer t={t} kh={kh} />

        {/* The 'Viral Life Cycle' Animator */}
        <LifeCycleAnimator t={t} kh={kh} />

      </div>
    </div>
  );
}

// ── Components ─────────────────────────────────────────────────────────────

function AnatomyExplorer({ t, kh }: { t: any, kh: boolean }) {
  const [activeId, setActiveId] = useState(HIV_COMPONENTS[0].id);
  const activeData = HIV_COMPONENTS.find(c => c.id === activeId) || HIV_COMPONENTS[0];

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-6 h-6 text-rose-400" />
        <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
          {t("Anatomy of HIV Explorer", "ឧបករណ៍រុករករចនាសម្ព័ន្ធមេរោគអេដស៍")}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIV_COMPONENTS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex flex-col justify-center min-h-[120px] ${
                activeId === c.id
                  ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <h3 className={`font-black text-xl sm:text-[1.8vw] leading-tight ${kh ? "font-khmer" : ""}`}>
                {kh ? c.nameKh : c.nameEn}
              </h3>
            </button>
          ))}
        </div>

        {/* Dynamic Output */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center min-h-[300px]">
          <div className="flex items-center justify-center w-24 h-24 sm:w-[10vw] sm:h-[10vw] rounded-full bg-slate-900 border-4 border-rose-500/30 mb-6 shadow-inner mx-auto relative overflow-hidden">
            {/* Simple abstract HIV cross-section visuals */}
            <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
               <div className={`w-16 h-16 rounded-full border-4 border-dashed ${activeId === 'envelope' ? 'border-rose-400 bg-rose-500/20' : 'border-slate-700'}`} />
            </div>
            {activeId === 'capsid' && (
               <div className="absolute w-8 h-12 bg-amber-500/80 rounded-t-full rounded-b-xl" />
            )}
            {activeId === 'rna' && (
               <div className="absolute text-cyan-400 font-bold text-2xl animate-pulse">~~</div>
            )}
            {activeId === 'enzymes' && (
               <div className="absolute flex gap-1">
                 <div className="w-2 h-2 bg-green-400 rounded-full" />
                 <div className="w-2 h-2 bg-blue-400 rounded-full" />
                 <div className="w-2 h-2 bg-purple-400 rounded-full" />
               </div>
            )}
          </div>
          
          <h3 className={`text-2xl sm:text-[2vw] font-black text-white text-center mb-4 ${kh ? "font-khmer" : ""}`}>
            {kh ? activeData.nameKh : activeData.nameEn}
          </h3>
          <p className={`text-lg sm:text-[1.3vw] text-slate-300 leading-relaxed text-center ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? activeData.descKh : activeData.descEn}
          </p>
        </div>

      </div>
    </section>
  );
}

function LifeCycleAnimator({ t, kh }: { t: any, kh: boolean }) {
  const [step, setStep] = useState(1);
  const [arvActive, setArvActive] = useState(false);

  const steps = LIFE_CYCLE_STEPS;
  const activeStep = steps[step - 1];

  // If ARV is active and we try to go to step 5, it gets blocked visually.
  const isBlocked = arvActive && step === 5;

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <PlayCircle className="w-6 h-6 text-rose-400" />
          <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
            {t("Viral Life Cycle & ARV Shield", "វដ្តជីវិតមេរោគ និងខែលការពារ ARV")}
          </h2>
        </div>
        
        {/* ARV Shield Toggle */}
        <button
          onClick={() => setArvActive(!arvActive)}
          className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-3 border-2 ${
            arvActive 
              ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
              : "bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600"
          } ${kh ? "font-khmer" : ""}`}
        >
          <Shield className={`w-5 h-5 ${arvActive ? "text-cyan-400" : ""}`} />
          {t("Activate ARV Treatment", "ដំណើរការព្យាបាល ARV")}
          <span className="text-xs uppercase tracking-widest opacity-70 ml-2">({t("Protease Inhibitor", "Protease Inhibitor")})</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Sequence Buttons */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {steps.map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                step === s.id
                  ? (isBlocked ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]")
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              } ${kh ? "font-khmer" : ""}`}
            >
              {kh ? s.nameKh : s.nameEn}
            </button>
          ))}
        </div>

        {/* Visualizer output */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          
          <div className="h-48 w-full flex items-center justify-center relative mb-8">
            
            {/* The CD4 Cell Context */}
            <div className="w-48 h-48 sm:w-[20vw] sm:h-[20vw] rounded-full border-4 border-slate-700 bg-slate-900 absolute flex items-center justify-center overflow-hidden opacity-50">
              <div className="w-24 h-24 rounded-full border border-slate-800 bg-slate-950 relative">
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 font-bold text-xs uppercase tracking-widest">Nucleus</span>
              </div>
            </div>

            {/* Animations based on Step */}
            {step === 1 && (
              <div className="animate-in fade-in zoom-in duration-500 flex items-center gap-2 z-10 translate-x-16">
                <div className="w-12 h-12 rounded-full bg-rose-500 border-4 border-rose-700" />
                <div className="text-slate-500 font-black text-xl">&lt;</div>
              </div>
            )}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-8 duration-500 z-10">
                <div className="w-10 h-16 bg-amber-500 rounded-t-full rounded-b-xl border-2 border-amber-600 flex items-center justify-center">
                  <span className="text-amber-900 font-bold text-xs">RNA</span>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 duration-500 z-10 flex items-center justify-center w-full h-full">
                <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-purple-500/50 bg-purple-500/20 pulse">
                  <span className="text-purple-300 font-bold text-xs bg-slate-950 px-2 rounded-full">Viral DNA inserted</span>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="animate-in zoom-in duration-500 z-10 grid grid-cols-3 gap-2">
                 <div className="w-6 h-6 bg-rose-500 rounded-sm" />
                 <div className="w-6 h-6 bg-amber-500 rounded-sm" />
                 <div className="w-6 h-6 bg-rose-500 rounded-sm" />
                 <div className="w-6 h-6 bg-amber-500 rounded-sm" />
              </div>
            )}
            {step === 5 && !isBlocked && (
              <div className="animate-in slide-in-from-left-8 duration-500 z-10 -translate-x-16 flex items-center gap-4">
                <div className="text-slate-500 font-black text-xl">&lt;</div>
                <div className="w-12 h-12 rounded-full bg-rose-500 border-4 border-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
                <div className="w-12 h-12 rounded-full bg-rose-500 border-4 border-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.5)] absolute -top-8 -left-4" />
              </div>
            )}
            {step === 5 && isBlocked && (
              <div className="animate-in zoom-in duration-500 z-10 flex items-center justify-center w-full h-full">
                <div className="absolute inset-0 bg-cyan-900/30 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-cyan-500">
                  <ShieldAlert className="w-16 h-16 text-cyan-400" />
                </div>
              </div>
            )}
            
          </div>

          <div className="text-center z-10 relative">
            <h3 className={`text-2xl sm:text-[2vw] font-black ${isBlocked ? 'text-cyan-400' : 'text-white'} mb-4 ${kh ? "font-khmer" : ""}`}>
              {isBlocked ? t("ARV Treatment Active!", "ការព្យាបាល ARV សកម្ម!") : (kh ? activeStep.nameKh : activeStep.nameEn)}
            </h3>
            <p className={`text-lg sm:text-[1.5vw] ${isBlocked ? 'text-cyan-100' : 'text-slate-300'} max-w-xl mx-auto leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {isBlocked 
                ? t("The Protease Inhibitor medicine cuts off the viral assembly line. The new virus cannot be built or infect other cells.", "ថ្នាំ Protease Inhibitor កាត់ផ្តាច់ខ្សែសង្វាក់ផ្គុំវីរុស។ វីរុសថ្មីមិនអាចត្រូវកសាង ឬចម្លងកោសិកាផ្សេងទៀតបានទេ។") 
                : (kh ? activeStep.descKh : activeStep.descEn)}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
