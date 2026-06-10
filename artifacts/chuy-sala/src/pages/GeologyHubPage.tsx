import type { CSSProperties } from "react";
import { Mountain, Compass, Globe2 } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { PlateTectonicsMap } from "@/components/geology/PlateTectonicsMap";
import { CambodiaContextCard } from "@/components/geology/CambodiaContextCard";
import { RockCycleVisualizer } from "@/components/geology/RockCycleVisualizer";

const EARTH_BG: CSSProperties = {
  backgroundColor: "#f7f1e8",
  backgroundImage:
    "radial-gradient(rgba(120, 80, 50, 0.10) 1.4px, transparent 1.4px)",
  backgroundSize: "26px 26px",
};

export function GeologyHubPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={EARTH_BG}>
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* HERO — earth-tone gradient */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-800 via-amber-900 to-orange-800 text-white px-6 sm:px-10 py-10 sm:py-14 shadow-lg">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <Mountain className="absolute -right-6 -top-6 w-44 h-44 text-orange-200/15 rotate-6 pointer-events-none" strokeWidth={1.2} />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 border-2 border-orange-200/60 text-orange-100 flex items-center justify-center flex-shrink-0">
              <Globe2 className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-orange-200/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science Hub", "មជ្ឈមណ្ឌលវិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span>{t("Geology", "ភូគព្ភវិទ្យា")}</span>
              </div>
              <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Geology & Earth Science", "ភូគព្ភវិទ្យា និងវិទ្យាសាស្ត្រផែនដី")}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-orange-50/90 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "From the slow-motion crash of continents to the journey of a single rock through time — meet the living, moving Earth beneath your feet.",
                  "ចាប់ពីការទង្គិចគ្នាយ៉ាងយឺតៗនៃទ្វីប រហូតដល់ដំណើរនៃថ្មមួយដុំឆ្លងកាត់ពេលវេលា — ស្គាល់ផែនដីដែលរស់ ហើយផ្លាស់ទីក្រោមជើងរបស់អ្នក។",
                )}
              </p>
              <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-orange-100/70 ${kh ? "font-khmer text-xs" : ""}`}>
                <span>{t("INTERACTIVES: 03", "ឧបករណ៍អន្តរកម្ម៖ ០៣")}</span>
                <span className="opacity-40">|</span>
                <span>{t("EARTH TONES THEME", "ពណ៌ផែនដី")}</span>
                <span className="opacity-40">|</span>
                <span>{t("BILINGUAL", "ទ្វេភាសា")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Massive Link Card: Atmospheric Science ───────────── */}
        <Link
          href="/science/earth-science/atmosphere"
          data-testid="card-atmosphere"
          className="group block mb-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950/40 hover:border-cyan-400/60 transition-colors text-white shadow-xl overflow-hidden relative"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border-2 border-cyan-400/40 shadow-inner group-hover:scale-105 transition-transform">
              <Globe2 className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/80 mb-2 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                <span>{t("Interactive Visualizer", "ម៉ាស៊ីនក្លែងធ្វើអន្តរកម្ម")}</span>
              </div>
              <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Atmospheric Science", "វិទ្យាសាស្ត្របរិយាកាស")}
              </h2>
              <p
                className={`mt-2 text-base sm:text-lg text-cyan-100/70 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Explore the layers of the atmosphere and travel through time to see the ozone hole.",
                  "ស្វែងយល់ពីស្រទាប់បរិយាកាស និងធ្វើដំណើរតាមពេលវេលាដើម្បីមើលប្រហោងអូហ្សូន។"
                )}
              </p>
            </div>
          </div>
        </Link>

        {/* 1. Plate tectonics map */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ១" : "Lesson 1"}
            titleEn="Earth's Moving Plates"
            titleKh="ប្លាកផែនដីដែលកំពុងផ្លាស់ទី"
            kh={kh}
          />
          <PlateTectonicsMap />
        </section>

        {/* 2. Cambodia Context */}
        <section>
          <SectionHeading
            kicker={kh ? "បរិបទកម្ពុជា" : "Cambodia Spotlight"}
            titleEn="Where Do We Sit on This Map?"
            titleKh="តើយើងស្ថិតនៅឯណានៅលើផែនទីនេះ?"
            kh={kh}
          />
          <CambodiaContextCard />
        </section>

        {/* 3. Rock cycle */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ២" : "Lesson 2"}
            titleEn="The Rock Cycle"
            titleKh="វដ្ដថ្ម"
            kh={kh}
          />
          <RockCycleVisualizer />
        </section>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker, titleEn, titleKh, kh,
}: { kicker: string; titleEn: string; titleKh: string; kh: boolean }) {
  return (
    <div className="mb-4 sm:mb-5">
      <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-amber-800 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kicker}
      </div>
      <h2 className={`font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
        {kh ? titleKh : titleEn}
        {kh && <span className="ml-2 text-base text-stone-500 font-sans font-normal">({titleEn})</span>}
      </h2>
    </div>
  );
}
