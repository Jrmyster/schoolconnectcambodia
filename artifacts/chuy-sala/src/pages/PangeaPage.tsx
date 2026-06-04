import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Globe, Info } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const landmasses = [
  {
    id: "south-america",
    labelEn: "South America",
    labelKh: "អាមេរិកខាងត្បូង",
    pangeaLocEn: "Joined closely with Africa",
    pangeaLocKh: "តភ្ជាប់យ៉ាងជិតស្និទ្ធជាមួយអាហ្រ្វិក",
    fossilEn: "Mesosaurus fossils found on both continents.",
    fossilKh: "ហ្វូស៊ីលដាយណូស័រ Mesosaurus ត្រូវបានរកឃើញនៅលើទ្វីបទាំងពីរ។",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-400",
  },
  {
    id: "africa",
    labelEn: "Africa",
    labelKh: "អាហ្រ្វិក",
    pangeaLocEn: "Center of Pangea",
    pangeaLocKh: "ចំណុចកណ្តាលនៃមហាទ្វីបប៉ាងសេ",
    fossilEn: "Cynognathus and Mesosaurus fossils link it to South America and Antarctica.",
    fossilKh: "ហ្វូស៊ីល Cynognathus និង Mesosaurus តភ្ជាប់វាទៅអាមេរិកខាងត្បូង និងអង់តាក់ទិក។",
    color: "bg-amber-600",
    hoverColor: "hover:bg-amber-500",
  },
  {
    id: "north-america",
    labelEn: "North America",
    labelKh: "អាមេរិកខាងជើង",
    pangeaLocEn: "Part of the northern landmass, Laurasia.",
    pangeaLocKh: "ផ្នែកនៃផ្ទៃដីភាគខាងជើង ឡូរ៉ាស៊ី។",
    fossilEn: "Appalachian Mountains match ranges in Scotland and Scandinavia.",
    fossilKh: "ជួរភ្នំ Appalachian ស្រដៀងនឹងជួរភ្នំនៅស្កុតឡែន និងស្កង់ឌីណាវី។",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-400",
  },
  {
    id: "eurasia",
    labelEn: "Eurasia",
    labelKh: "អឺរ៉ាស៊ី",
    pangeaLocEn: "Formed the bulk of Laurasia with North America.",
    pangeaLocKh: "បង្កើតបានភាគច្រើននៃឡូរ៉ាស៊ីជាមួយអាមេរិកខាងជើង។",
    fossilEn: "Fossilized tropical plants found in modern cold regions.",
    fossilKh: "រុក្ខជាតិតំបន់ត្រូពិកដែលក្លាយជាហ្វូស៊ីល ត្រូវបានរកឃើញនៅតំបន់ត្រជាក់សព្វថ្ងៃ។",
    color: "bg-emerald-600",
    hoverColor: "hover:bg-emerald-500",
  },
  {
    id: "india",
    labelEn: "India",
    labelKh: "ឥណ្ឌា",
    pangeaLocEn: "Attached to Madagascar and Antarctica in Gondwana.",
    pangeaLocKh: "ជាប់នឹងម៉ាដាហ្គាស្ការ និងអង់តាក់ទិកក្នុងហ្គុនដាវ៉ាណា។",
    fossilEn: "Lystrosaurus fossils connect India, Africa, and Antarctica.",
    fossilKh: "ហ្វូស៊ីល Lystrosaurus តភ្ជាប់ឥណ្ឌា អាហ្វ្រិក និងអង់តាក់ទិក។",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-400",
  },
  {
    id: "antarctica",
    labelEn: "Antarctica",
    labelKh: "អង់តាក់ទិក",
    pangeaLocEn: "Not covered in ice, but lush and central to southern Gondwana.",
    pangeaLocKh: "មិនគ្របដណ្តប់ដោយទឹកកកទេ តែសំបូររុក្ខជាតិ និងនៅកណ្តាលហ្គុនដាវ៉ាណាខាងត្បូង។",
    fossilEn: "Glossopteris plant fossils prove it once had a warm climate.",
    fossilKh: "ហ្វូស៊ីលរុក្ខជាតិ Glossopteris បញ្ជាក់ថាវាធ្លាប់មានអាកាសធាតុក្តៅ។",
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-400",
  },
  {
    id: "australia",
    labelEn: "Australia",
    labelKh: "អូស្ត្រាលី",
    pangeaLocEn: "Joined to Antarctica in the far southeast of Pangea.",
    pangeaLocKh: "ជាប់នឹងអង់តាក់ទិកនៅភាគអាគ្នេយ៍ឆ្ងាយនៃប៉ាងសេ។",
    fossilEn: "Marsupial evolution diverted after it broke away.",
    fossilKh: "ការវិវត្តសត្វថនិកសត្វមានថង់បានបំបែកចេញបន្ទាប់ពីវាផ្តាច់ចេញ។",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-400",
  },
];

const timelineEvents = [
  { time: 335, en: "Supercontinent Pangea forms", kh: "មហាទ្វីបប៉ាងសេកើតឡើង" },
  { time: 200, en: "Triassic Breakup begins", kh: "ការបំបែកទ្វីបក្នុងសម័យ Triassic ចាប់ផ្តើម" },
  { time: 135, en: "Cretaceous Period - Oceans form", kh: "សម័យ Cretaceous - មហាសមុទ្រកើតឡើង" },
  { time: 65, en: "Extinction of Dinosaurs", kh: "ការផុតពូជនៃដាយណូស័រ" },
  { time: 0, en: "Present Day Continents", kh: "ទ្វីបនាពេលបច្ចុប្បន្ន" },
];

export default function PangeaPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const [timeAge, setTimeAge] = useState<number>(335);
  const [selectedLandmass, setSelectedLandmass] = useState<typeof landmasses[0] | null>(null);

  const currentEvent = [...timelineEvents].reverse().find((e) => timeAge <= e.time) || timelineEvents[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/science">
              <a className="p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-full transition-colors">
                <ArrowLeft className="w-8 h-8 text-slate-300" />
              </a>
            </Link>
            <div className="flex items-center gap-3">
              <Globe className="w-10 h-10 text-emerald-400" />
              <h1 className="text-4xl md:text-[3vw] font-bold tracking-tight text-white drop-shadow-md">
                {isKh ? "ប៉ាងសេ និងការរសាត់ទ្វីប" : "Pangea & Continental Drift"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-10 relative z-10 flex flex-col gap-12">
        
        {/* Intro & Definitions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-6 text-emerald-300">
              {isKh ? "ទ្រឹស្ដីរសាត់ទ្វីប" : "The Theory of Continental Drift"}
            </h2>
            <p className="text-xl md:text-[1.5vw] leading-relaxed text-slate-300 mb-6">
              {isKh 
                ? "នៅឆ្នាំ ១៩១២ លោក អាល់ហ្វ្រេត វ៉េកនឺរ (Alfred Wegener) បានស្នើថាទ្វីបទាំងអស់របស់ផែនដីធ្លាប់បានតភ្ជាប់គ្នាជាមហាទ្វីបតែមួយដែលហៅថា ប៉ាងសេ (Pangea) មុនពេលបំបែកនិងរសាត់ចេញពីគ្នាបន្តិចម្តងៗ។" 
                : "In 1912, Alfred Wegener proposed that Earth's continents were once joined in a single supercontinent called Pangea, before slowly drifting apart."}
            </p>
            <p className="text-xl md:text-[1.5vw] leading-relaxed text-slate-300">
              {isKh
                ? "បន្ទះផែនដី (Tectonic Plates) ដែលអណ្តែតលើម៉ាកម៉ាក្តៅ គឺជាម៉ាស៊ីនជំរុញចលនានេះ។ ចលនានេះចំណាយពេលរាប់លានឆ្នាំ!។"
                : "Tectonic plates floating on hot magma are the engine driving this movement. This process takes millions of years!"}
            </p>
          </div>

          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-6 text-emerald-300">
              {isKh ? "ពាក្យគន្លឹះ (Key Terms)" : "Key Terms"}
            </h2>
            <ul className="space-y-6">
              <li className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">Supercontinent (មហាទ្វីប)</span>
                <span className="text-xl md:text-[1.2vw] text-slate-300">
                  {isKh ? "ទ្វីបដ៏ធំមួយដែលកើតឡើងពីការរួមបញ្ចូលទ្វីបជាច្រើន។" : "A massive landmass containing most or all of Earth's continents."}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">Laurasia & Gondwana (ឡូរ៉ាស៊ី និង ហ្គុនដាវ៉ាណា)</span>
                <span className="text-xl md:text-[1.2vw] text-slate-300">
                  {isKh ? "បំណែកធំៗពីរដែលកើតឡើងក្រោយការបំបែកប៉ាងសេ។" : "The two massive chunks that formed after Pangea broke in half."}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">Tectonic Plates (បន្ទះផែនដី / ផ្លាកតិចតូនិក)</span>
                <span className="text-xl md:text-[1.2vw] text-slate-300">
                  {isKh ? "ផ្ទាំងសំបកផែនដីដ៏ធំដែលផ្លាស់ទីយឺតៗ។" : "Massive slabs of solid rock that make up Earth's outer shell."}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Visualizer Interactive Component */}
        <section className="bg-slate-900/60 p-10 rounded-[3rem] border border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-col gap-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-[3vw] font-bold text-white mb-4">
              {isKh ? "ល្បែងផ្គុំទ្វីប (Continental Puzzle)" : "Continental Puzzle"}
            </h2>
            <p className="text-2xl text-slate-400">
              {isKh ? "ជ្រើសរើសទ្វីបមួយដើម្បីមើលពីភស្តុតាងដែលបញ្ជាក់ថាវាធ្លាប់នៅទីណា។" : "Select a landmass to see evidence of where it used to be."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {landmasses.map((landmass) => (
              <button
                key={landmass.id}
                onClick={() => setSelectedLandmass(landmass)}
                className={`p-6 md:p-[2vw] rounded-3xl text-2xl md:text-[1.8vw] font-bold transition-all duration-300 shadow-lg ${
                  selectedLandmass?.id === landmass.id
                    ? `${landmass.color} text-white scale-105 ring-4 ring-white`
                    : `bg-slate-800 text-slate-300 hover:text-white ${landmass.hoverColor} hover:scale-105`
                }`}
              >
                {isKh ? landmass.labelKh : landmass.labelEn}
              </button>
            ))}
          </div>

          {selectedLandmass && (
            <div className="mt-8 p-8 md:p-[3vw] bg-slate-800/80 rounded-3xl border-2 border-emerald-500/50 shadow-inner flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4">
                <Info className="w-12 h-12 text-emerald-400" />
                <h3 className="text-3xl md:text-[2.5vw] font-bold text-white">
                  {isKh ? selectedLandmass.labelKh : selectedLandmass.labelEn}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl md:text-[1.5vw] font-semibold text-emerald-300 mb-2">
                    {isKh ? "ទីតាំងក្នុងប៉ាងសេ" : "Location in Pangea"}
                  </h4>
                  <p className="text-2xl md:text-[1.8vw] text-slate-200 leading-relaxed">
                    {isKh ? selectedLandmass.pangeaLocKh : selectedLandmass.pangeaLocEn}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl md:text-[1.5vw] font-semibold text-emerald-300 mb-2">
                    {isKh ? "ភស្តុតាងហ្វូស៊ីល" : "Fossil Evidence"}
                  </h4>
                  <p className="text-2xl md:text-[1.8vw] text-slate-200 leading-relaxed">
                    {isKh ? selectedLandmass.fossilKh : selectedLandmass.fossilEn}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Slider */}
          <div className="mt-12 p-8 md:p-[2vw] bg-black/40 rounded-3xl border border-slate-700 flex flex-col gap-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl md:text-[2vw] font-bold text-emerald-400">
                {isKh ? "ពេលវេលា (លានឆ្នាំមុន)" : "Time (Millions of Years Ago)"}
              </h3>
              <span className="text-3xl md:text-[2.5vw] font-mono font-bold text-white bg-slate-800 px-6 py-2 rounded-xl">
                {timeAge} {isKh ? "លានឆ្នាំមុន" : "MYA"}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="335"
              step="1"
              value={timeAge}
              onChange={(e) => setTimeAge(Number(e.target.value))}
              className="w-full h-6 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
              style={{ direction: "rtl" }} // 335 on left, 0 on right
            />
            
            <div className="text-center p-6 bg-slate-800/60 rounded-2xl border border-slate-700/50">
              <p className="text-3xl md:text-[2.5vw] font-bold text-emerald-300">
                {isKh ? currentEvent.kh : currentEvent.en}
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
