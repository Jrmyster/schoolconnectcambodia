import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/use-language";
import { COMMUNICABLE_DISEASES, PathogenType, DiseaseProfile } from "@/data/communicable-diseases";
import { ChevronLeft, Filter, ShieldAlert, HeartPulse, Activity, Search, Shield, Wind, Bug, Droplets } from "lucide-react";
import { Link } from "wouter";

const PATHOGEN_COLORS: Record<PathogenType, string> = {
  Virus: "text-red-400 bg-red-400/10 border-red-400/20",
  Bacteria: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Parasite: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

const PATHOGEN_ICONS: Record<PathogenType, any> = {
  Virus: Activity,
  Bacteria: Droplets,
  Parasite: Bug,
};

function DiseaseCard({ disease, kh }: { disease: DiseaseProfile; kh: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = disease.icon;
  const PathogenIcon = PATHOGEN_ICONS[disease.pathogenEn] || ShieldAlert;

  const name = kh ? disease.nameKh : disease.nameEn;
  const pathogen = kh ? disease.pathogenKh : disease.pathogenEn;
  const transmission = kh ? disease.transmissionKh : disease.transmissionEn;
  const symptoms = kh ? disease.symptomsKh : disease.symptomsEn;
  const prevention = kh ? disease.preventionKh : disease.preventionEn;

  return (
    <div 
      className="relative w-full h-[450px] cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full rounded-2xl shadow-xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-800/80 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Icon className="w-32 h-32 text-emerald-500" />
          </div>

          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4 ${PATHOGEN_COLORS[disease.pathogenEn]}`}>
              <PathogenIcon className="w-4 h-4" />
              {pathogen}
            </div>
            
            <h3 className={`text-2xl font-bold text-white mb-2 ${kh ? "font-suwannaphum" : ""}`}>
              {name}
            </h3>
            
            <div className="flex items-start gap-3 text-slate-300 mt-6 bg-slate-900/50 p-4 rounded-xl">
              <Wind className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  {kh ? "ការចម្លង" : "Transmission"}
                </span>
                <span className={`font-medium text-emerald-100 ${kh ? "font-suwannaphum text-sm" : ""}`}>
                  {transmission}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-emerald-400 mt-4 border-t border-emerald-500/20 pt-4">
            <span className="text-sm font-medium">
              {kh ? "ចុចដើម្បីមើលរោគសញ្ញា និងការការពារ" : "Click to view symptoms & prevention"}
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-emerald-900/90 border border-emerald-500/40 rounded-2xl p-6 flex flex-col overflow-y-auto custom-scrollbar"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className={`text-xl font-bold text-white mb-6 flex items-center gap-2 ${kh ? "font-suwannaphum" : ""}`}>
            <Icon className="w-6 h-6 text-emerald-400" />
            {name}
          </h3>

          <div className="space-y-6 flex-grow">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-wider mb-3">
                <Activity className="w-4 h-4" />
                {kh ? "រោគសញ្ញា" : "Symptoms"}
              </h4>
              <ul className="space-y-2">
                {symptoms.map((symptom, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-slate-200 ${kh ? "font-suwannaphum text-sm" : ""}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-wider mb-3">
                <Shield className="w-4 h-4" />
                {kh ? "ការការពារ" : "Prevention"}
              </h4>
              <ul className="space-y-2">
                {prevention.map((prev, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-emerald-100 bg-emerald-800/30 p-2 rounded-lg border border-emerald-700/50 ${kh ? "font-suwannaphum text-sm" : ""}`}>
                    <HeartPulse className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{prev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-emerald-700/50 text-center">
            <span className="text-xs text-emerald-400 font-medium">
              {kh ? "ចុចដើម្បីត្រឡប់វិញ" : "Click to flip back"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CommunicableDiseasesPage() {
  const language = useLanguageStore((state) => state.language);
  const kh = language === "kh";
  const [filter, setFilter] = useState<PathogenType | "All">("All");

  const filteredDiseases = COMMUNICABLE_DISEASES.filter(
    d => filter === "All" || d.pathogenEn === filter
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 selection:bg-emerald-500/30 font-sans pb-24">
      {/* Navbar Background Space */}
      <div className="h-20" />

      {/* Header Section */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-[#0B1120] z-0" />
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium mb-8 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              {kh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
            </a>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold text-white tracking-tight ${kh ? "font-suwannaphum" : ""}`}>
              {kh ? "ជំងឺឆ្លង" : "Communicable Diseases"}
            </h1>
          </div>

          <p className={`text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed ${kh ? "font-suwannaphum" : ""}`}>
            {kh 
              ? "រុករកទម្រង់ជំងឺឆ្លងសំខាន់ៗដែលប៉ះពាល់ដល់សុខភាពសកល និងក្នុងស្រុក។ ស្វែងយល់ពីរបៀបដែលភ្នាក់ងារបង្កជំងឺរាលដាល រោគសញ្ញារបស់វា និងវិធីសាស្ត្រការពារដ៏មានប្រសិទ្ធភាពបំផុត។"
              : "Explore the profiles of major communicable diseases impacting global and local health. Understand how these pathogens spread, their symptoms, and the most effective prevention tactics."}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className={`text-sm font-medium text-slate-300 uppercase tracking-wider ${kh ? "font-suwannaphum" : ""}`}>
              {kh ? "ច្រោះតាមភ្នាក់ងារបង្កជំងឺ៖" : "Filter by Pathogen:"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Virus", "Bacteria", "Parasite"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${filter === type 
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                  } ${kh ? "font-suwannaphum" : ""}`}
              >
                {type === "All" && <Search className="w-4 h-4" />}
                {type === "Virus" && <Activity className="w-4 h-4" />}
                {type === "Bacteria" && <Droplets className="w-4 h-4" />}
                {type === "Parasite" && <Bug className="w-4 h-4" />}
                {kh 
                  ? type === "All" ? "ទាំងអស់" : type === "Virus" ? "វីរុស" : type === "Bacteria" ? "បាក់តេរី" : "ប៉ារ៉ាស៊ីត"
                  : type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDiseases.map((disease) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={disease.id}
            >
              <DiseaseCard disease={disease} kh={kh} />
            </motion.div>
          ))}
        </motion.div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-800 border-dashed">
            <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl text-slate-400 font-medium">No diseases found for this filter.</h3>
          </div>
        )}
      </main>

    </div>
  );
}
