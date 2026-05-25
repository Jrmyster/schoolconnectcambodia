import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Compass, Calendar, MapPin, User, Info, HelpCircle } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import elementData from "@/data/element-timeline.json";

interface ElementRecord {
  symbol: string;
  elementNameEn: string;
  elementNameKh: string;
  dateEn: string;
  dateKh: string;
  locationEn: string;
  locationKh: string;
  discovererEn: string;
  discovererKh: string;
  categoryEn: string;
  categoryKh: string;
  descEn: string;
  descKh: string;
}

const CATEGORY_STYLES: Record<
  string,
  { border: string; bg: string; text: string; glow: string; badge: string }
> = {
  "Transition metal": {
    border: "border-rose-500/40",
    bg: "bg-rose-950/15 hover:bg-rose-950/25",
    text: "text-rose-400",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.15)]",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  },
  "Post-transition metal": {
    border: "border-blue-500/40",
    bg: "bg-blue-950/15 hover:bg-blue-950/25",
    text: "text-blue-400",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.15)]",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  "Reactive nonmetal": {
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/15 hover:bg-emerald-950/25",
    text: "text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  "Metalloid": {
    border: "border-amber-500/40",
    bg: "bg-amber-950/15 hover:bg-amber-950/25",
    text: "text-amber-400",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.15)]",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  }
};

export default function TimelineElementsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const elements = elementData as ElementRecord[];

  const cardVariants = {
    hidden: (isLeft: boolean) => ({
      opacity: 0,
      x: isLeft ? -80 : 80,
      y: 30
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        duration: 0.7
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/chemistry" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Chemistry", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមី")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Elemental Timeline", "កាលប្បវត្តិនៃការរកឃើញធាតុគីមី")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>CHEM-HIST-101</span>
          </div>
        </div>
      </header>

      {/* Pinned/Sticky Legend Component */}
      <div className="sticky top-[69px] z-20 backdrop-blur-md bg-slate-950/85 border-b border-slate-900/80 py-4 shadow-xl">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className={`text-xs font-bold uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
              {t("Element Class Legend", "សន្ទស្សន៍ប្រភេទធាតុគីមី")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Transition Metals */}
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              <span className={`text-xs font-semibold text-rose-300 ${isKh ? "font-khmer" : ""}`}>
                {t("Transition Metal", "លោហៈឆ្លងផ្លាស់")}
              </span>
            </div>
            {/* Post-transition Metals */}
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className={`text-xs font-semibold text-blue-300 ${isKh ? "font-khmer" : ""}`}>
                {t("Post-transition Metal", "លោហៈក្រោយឆ្លងផ្លាស់")}
              </span>
            </div>
            {/* Reactive Nonmetals */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className={`text-xs font-semibold text-emerald-300 ${isKh ? "font-khmer" : ""}`}>
                {t("Reactive Nonmetal", "អលោហៈសកម្ម")}
              </span>
            </div>
            {/* Metalloids */}
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className={`text-xs font-semibold text-amber-300 ${isKh ? "font-khmer" : ""}`}>
                {t("Metalloid", "ម៉េតាឡូអ៊ីត")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timeline Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 relative z-10">
        
        {/* Projector-friendly Classroom Introduction Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 mt-4">
          <h1
            className={`font-black text-white leading-tight ${isKh ? "font-khmer mb-3" : "tracking-tight mb-2"}`}
            style={{ fontSize: "max(1.8rem, 3.5vw)" }}
          >
            {t("Timeline of Elemental Discoveries", "កាលប្បវត្តិនៃការរកឃើញធាតុគីមី")}
          </h1>
          <p
            className={`text-slate-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ fontSize: "max(1rem, 1.8vw)" }}
          >
            {t(
              "Explore the history of the ten foundational elements discovered by ancient civilizations from 9000 B.C.E. to 1 C.E. before modern chemistry was born.",
              "ស្វែងយល់ពីប្រវត្តិនៃធាតុគីមីគ្រឹះទាំង ១០ ដែលត្រូវបានរកឃើញ និងប្រើប្រាស់ដោយអរិយធម៌បុរាណ ចន្លោះពីឆ្នាំ ៩០០០ មុនគ.ស. ដល់ឆ្នាំ ១ នៃគ.ស. មុនពេលគីមីវិទ្យាទំនើបត្រូវបានបង្កើតឡើង។"
            )}
          </p>
        </div>

        {/* Centralized Timeline Canvas */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Vertical Timeline spine */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-rose-500 transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.3)] pointer-events-none rounded-full" />

          {/* Cards Loop */}
          <div className="flex flex-col gap-12 relative">
            {elements.map((element, index) => {
              const isLeft = index % 2 === 0;
              const styleTheme = CATEGORY_STYLES[element.categoryEn] || CATEGORY_STYLES["Transition metal"];

              return (
                <div
                  key={element.symbol}
                  className={`flex flex-col md:flex-row items-stretch w-full ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Spacer / Card Column */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end px-2 md:px-8">
                    {/* Only show cards on alternating sides on desktop, on mobile they align on the right of the line */}
                    {isLeft ? (
                      <motion.div
                        custom={true} // isLeft = true
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={cardVariants}
                        className={`w-full max-w-lg rounded-3xl border-2 p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300 ${styleTheme.border} ${styleTheme.bg} ${styleTheme.glow}`}
                      >
                        {/* Card Anatomy */}
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border mb-3 ${styleTheme.badge} uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                              {isKh ? element.categoryKh : element.categoryEn}
                            </span>
                            <h3
                              className={`font-black text-white ${isKh ? "font-khmer leading-normal" : ""}`}
                              style={{ fontSize: "max(1.3rem, 2.4vw)" }}
                            >
                              {isKh ? element.elementNameKh : element.elementNameEn}
                            </h3>
                          </div>
                          {/* Giant Symbol */}
                          <span
                            className={`font-black tracking-tighter ${styleTheme.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                            style={{ fontSize: "max(2.8rem, 5vw)" }}
                          >
                            {element.symbol}
                          </span>
                        </div>

                        {/* Metadata Rows */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 mb-4 text-slate-300">
                          <div className="flex items-center gap-2.5">
                            <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Date discovered", "កាលបរិច្ឆេទ")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.dateKh : element.dateEn}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Location", "ទីកន្លែង")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.locationKh : element.locationEn}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 sm:col-span-2">
                            <User className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Discoverer / Documentarian", "អ្នករកឃើញ / កត់ត្រា")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.discovererKh : element.discovererEn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Historical description text */}
                        <p
                          className={`text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 ${isKh ? "font-khmer leading-loose" : "text-sm"}`}
                          style={{ fontSize: "max(0.95rem, 1.6vw)" }}
                        >
                          {isKh ? element.descKh : element.descEn}
                        </p>
                      </motion.div>
                    ) : (
                      // Desktop Right side spacer placeholder
                      <div className="hidden md:block w-full max-w-lg" />
                    )}
                  </div>

                  {/* Central Timeline Point Node */}
                  <div className="relative flex justify-center items-center select-none pointer-events-none">
                    <div className="absolute w-8 h-8 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center -translate-x-1/2 md:translate-x-0 ml-1.5 md:ml-0 z-10 shadow-[0_0_10px_black]">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                    </div>
                  </div>

                  {/* Right Spacer / Card Column */}
                  <div className="w-full md:w-1/2 flex justify-start px-8 md:px-8 pl-14 md:pl-8">
                    {!isLeft ? (
                      <motion.div
                        custom={false} // isLeft = false
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={cardVariants}
                        className={`w-full max-w-lg rounded-3xl border-2 p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300 ${styleTheme.border} ${styleTheme.bg} ${styleTheme.glow}`}
                      >
                        {/* Card Anatomy */}
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border mb-3 ${styleTheme.badge} uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                              {isKh ? element.categoryKh : element.categoryEn}
                            </span>
                            <h3
                              className={`font-black text-white ${isKh ? "font-khmer leading-normal" : ""}`}
                              style={{ fontSize: "max(1.3rem, 2.4vw)" }}
                            >
                              {isKh ? element.elementNameKh : element.elementNameEn}
                            </h3>
                          </div>
                          {/* Giant Symbol */}
                          <span
                            className={`font-black tracking-tighter ${styleTheme.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                            style={{ fontSize: "max(2.8rem, 5vw)" }}
                          >
                            {element.symbol}
                          </span>
                        </div>

                        {/* Metadata Rows */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 mb-4 text-slate-300">
                          <div className="flex items-center gap-2.5">
                            <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Date discovered", "កាលបរិច្ឆេទ")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.dateKh : element.dateEn}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Location", "ទីកន្លែង")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.locationKh : element.locationEn}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 sm:col-span-2">
                            <User className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Discoverer / Documentarian", "អ្នករកឃើញ / កត់ត្រា")}</span>
                              <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.discovererKh : element.discovererEn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Historical description text */}
                        <p
                          className={`text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 ${isKh ? "font-khmer leading-loose" : "text-sm"}`}
                          style={{ fontSize: "max(0.95rem, 1.6vw)" }}
                        >
                          {isKh ? element.descKh : element.descEn}
                        </p>
                      </motion.div>
                    ) : (
                      /* Mobile duplication support: render left card on the right column on mobile screen, but hide on desktop */
                      <div className="md:hidden w-full">
                        <motion.div
                          custom={false} // behave as right card (slide in from right)
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-80px" }}
                          variants={cardVariants}
                          className={`w-full max-w-lg rounded-3xl border-2 p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300 ${styleTheme.border} ${styleTheme.bg} ${styleTheme.glow}`}
                        >
                          {/* Card Anatomy */}
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border mb-3 ${styleTheme.badge} uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                                {isKh ? element.categoryKh : element.categoryEn}
                              </span>
                              <h3
                                className={`font-black text-white ${isKh ? "font-khmer leading-normal" : ""}`}
                                style={{ fontSize: "max(1.3rem, 2.4vw)" }}
                              >
                                {isKh ? element.elementNameKh : element.elementNameEn}
                              </h3>
                            </div>
                            {/* Giant Symbol */}
                            <span
                              className={`font-black tracking-tighter ${styleTheme.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                              style={{ fontSize: "max(2.8rem, 5vw)" }}
                            >
                              {element.symbol}
                            </span>
                          </div>

                          {/* Metadata Rows */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 mb-4 text-slate-300">
                            <div className="flex items-center gap-2.5">
                              <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                              <div>
                                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Date discovered", "កាលបរិច្ឆេទ")}</span>
                                <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.dateKh : element.dateEn}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                              <div>
                                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Location", "ទីកន្លែង")}</span>
                                <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.locationKh : element.locationEn}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:col-span-2">
                              <User className="w-4 h-4 text-amber-400 shrink-0" />
                              <div>
                                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">{t("Discoverer / Documentarian", "អ្នករកឃើញ / កត់ត្រា")}</span>
                                <span className={`font-semibold text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{isKh ? element.discovererKh : element.discovererEn}</span>
                              </div>
                            </div>
                          </div>

                          {/* Historical description text */}
                          <p
                            className={`text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 ${isKh ? "font-khmer leading-loose" : "text-sm"}`}
                            style={{ fontSize: "max(0.95rem, 1.6vw)" }}
                          >
                            {isKh ? element.descKh : element.descEn}
                          </p>
                        </motion.div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
