import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/store/use-language";
import { GLOBAL_NGOS, NgoCategory, GlobalNgo } from "@/data/global-ngos";
import { ChevronLeft, Filter, Search, Globe, HeartPulse, Scale, HeartHandshake } from "lucide-react";
import { Link } from "wouter";

const CATEGORY_COLORS: Record<NgoCategory | "All", string> = {
  "All": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Medical & Health": "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Technical & Rights": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Broad Humanitarian": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const CATEGORY_ICONS: Record<NgoCategory | "All", any> = {
  "All": Search,
  "Medical & Health": HeartPulse,
  "Technical & Rights": Scale,
  "Broad Humanitarian": Globe,
};

function NgoCard({ ngo, kh }: { ngo: GlobalNgo; kh: boolean }) {
  const Icon = ngo.icon;
  const CategoryIcon = CATEGORY_ICONS[ngo.category];

  const name = kh ? ngo.nameKh : ngo.nameEn;
  const description = kh ? ngo.descriptionKh : ngo.descriptionEn;
  const categoryLabel = kh 
    ? (ngo.category === "Medical & Health" ? "សុខភាព និងវេជ្ជសាស្ត្រ" : 
       ngo.category === "Technical & Rights" ? "បច្ចេកទេស និងសិទ្ធិ" : "មនុស្សធម៌ទូទៅ")
    : ngo.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800/80 border border-emerald-500/20 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-emerald-500/50 hover:bg-slate-800 transition-all shadow-xl"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        <Icon className="w-40 h-40 text-emerald-500" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${CATEGORY_COLORS[ngo.category]}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span className={kh ? "font-suwannaphum" : ""}>{categoryLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900/50 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className={`text-xl font-bold text-white ${kh ? "font-suwannaphum leading-tight" : ""}`}>
            {name}
          </h3>
        </div>

        <p className={`text-slate-300 flex-grow mt-2 ${kh ? "font-suwannaphum leading-relaxed" : "leading-relaxed"}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function GlobalNgosPage() {
  const language = useLanguageStore((state) => state.language);
  const kh = language === "kh";
  const [filter, setFilter] = useState<NgoCategory | "All">("All");

  const filteredNgos = GLOBAL_NGOS.filter(
    ngo => filter === "All" || ngo.category === filter
  );

  const categories: (NgoCategory | "All")[] = ["All", "Medical & Health", "Technical & Rights", "Broad Humanitarian"];

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 selection:bg-emerald-500/30 font-sans pb-24">
      {/* Navbar Background Space */}
      <div className="h-20" />

      {/* Header Section */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-[#0B1120] z-0" />
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium mb-8 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              {kh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
            </a>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <HeartHandshake className="w-7 h-7 text-white" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold text-white tracking-tight ${kh ? "font-suwannaphum" : ""}`}>
              {kh ? "សប្បុរសធម៌សកល និងអង្គការក្រៅរដ្ឋាភិបាល" : "Global Philanthropies & NGOs"}
            </h1>
          </div>

          <p className={`text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed ${kh ? "font-suwannaphum" : ""}`}>
            {kh 
              ? "ស្វែងយល់ពីបណ្តាញអង្គការអន្តរជាតិ ដែលធ្វើការយ៉ាងសកម្មដើម្បីកែលម្អសុខភាព ការពារសិទ្ធិមនុស្ស និងផ្តល់ជំនួយមនុស្សធម៌នៅជុំវិញពិភពលោក។"
              : "Explore the network of international organizations working tirelessly to improve health, defend human rights, and provide humanitarian aid around the world."}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 shrink-0">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className={`text-sm font-medium text-slate-300 uppercase tracking-wider ${kh ? "font-suwannaphum" : ""}`}>
              {kh ? "ច្រោះតាមប្រភេទ៖" : "Filter by Category:"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              const label = kh 
                ? (cat === "All" ? "ទាំងអស់" : cat === "Medical & Health" ? "សុខភាព និងវេជ្ជសាស្ត្រ" : cat === "Technical & Rights" ? "បច្ចេកទេស និងសិទ្ធិ" : "មនុស្សធម៌ទូទៅ")
                : cat;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border
                    ${filter === cat 
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20" 
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"
                    } ${kh ? "font-suwannaphum" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredNgos.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} kh={kh} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNgos.length === 0 && (
          <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-800 border-dashed">
            <Globe className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl text-slate-400 font-medium">No organizations found for this filter.</h3>
          </div>
        )}
      </main>

    </div>
  );
}
