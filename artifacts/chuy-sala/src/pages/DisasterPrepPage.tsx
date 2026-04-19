import type { CSSProperties } from "react";
import { LifeBuoy, Compass, AlertTriangle, ExternalLink, Activity, Waves, ShieldCheck } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { DisasterSignalGuide } from "@/components/disaster/DisasterSignalGuide";
import { EmergencyBagGame } from "@/components/disaster/EmergencyBagGame";

const HAZARD_BG: CSSProperties = {
  backgroundColor: "#fffbeb",
  backgroundImage:
    "radial-gradient(rgba(234, 88, 12, 0.10) 1.4px, transparent 1.4px)",
  backgroundSize: "26px 26px",
};

type TrackerLink = {
  href: string;
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  badgeEn: string;
  badgeKh: string;
};

const TRACKERS: TrackerLink[] = [
  {
    href: "http://ffw.mrcmekong.org/",
    nameEn: "Mekong River Commission — Flood Forecasting",
    nameKh: "គណៈកម្មការទន្លេមេគង្គ — ការព្យាករណ៍ទឹកជំនន់",
    descEn: "Real-time water levels at Stung Treng, Kratie, Kompong Cham, Phnom Penh, and more.",
    descKh: "កម្រិតទឹកពេលបច្ចុប្បន្ននៅស្ទឹងត្រែង ក្រចេះ កំពង់ចាម ភ្នំពេញ និងកន្លែងជាច្រើនទៀត។",
    badgeEn: "Live Data", badgeKh: "ទិន្នន័យបន្តផ្ទាល់",
  },
  {
    href: "https://portal.mrcmekong.org/",
    nameEn: "MRC Data Portal",
    nameKh: "ច្រកទិន្នន័យ MRC",
    descEn: "Hydrological & meteorological data for the entire Lower Mekong basin.",
    descKh: "ទិន្នន័យអ៊ីដ្រូឡូស៊ី និងឧតុនិយមសម្រាប់អាងទន្លេមេគង្គទាំងមូល។",
    badgeEn: "Regional", badgeKh: "តំបន់",
  },
  {
    href: "https://ncdm.gov.kh/",
    nameEn: "National Committee for Disaster Management (NCDM)",
    nameKh: "គណៈកម្មាធិការជាតិគ្រប់គ្រងគ្រោះមហន្តរាយ (NCDM)",
    descEn: "Cambodia's official disaster authority — alerts, news, and provincial warnings.",
    descKh: "អាជ្ញាធរផ្លូវការនៃកម្ពុជាសម្រាប់គ្រោះមហន្តរាយ — ការព្រមាន ព័ត៌មាន និងការជូនដំណឹងតាមខេត្ត។",
    badgeEn: "Official", badgeKh: "ផ្លូវការ",
  },
];

export function DisasterPrepPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={HAZARD_BG}>
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-3xl text-stone-900 shadow-lg border-4 border-stone-900"
                style={{
                  backgroundColor: "#facc15",
                  backgroundImage: "repeating-linear-gradient(45deg, transparent 0 60px, rgba(0,0,0,0.04) 60px 62px)",
                }}>
          {/* Hazard-tape strip on top edge */}
          <div className="h-3" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #1c1917 0 12px, #facc15 12px 24px)",
          }} />
          <div className="px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 text-yellow-300 flex items-center justify-center flex-shrink-0 shadow-md">
              <LifeBuoy className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-stone-800 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Geology", "ភូគព្ភវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span>{t("Disaster Preparedness", "ការត្រៀមលក្ខណៈ")}</span>
              </div>
              <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Natural Disaster Preparedness", "ការត្រៀមលក្ខណៈសម្រាប់គ្រោះមហន្តរាយធម្មជាតិ")}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-stone-800 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "The Earth gives us warnings. Learn how to read the signs of floods, earthquakes, and tsunamis — and pack a Go-Bag that can save your life.",
                  "ផែនដីផ្ដល់ឱ្យយើងនូវការព្រមាន។ រៀនអានសញ្ញានៃទឹកជំនន់ ការរញ្ជួយដី និងស៊ូណាមិ — ហើយខ្ចប់កាបូបបន្ទាន់ដែលអាចសង្គ្រោះជីវិតរបស់អ្នក។",
                )}
              </p>
              <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-stone-700 ${kh ? "font-khmer text-xs" : ""}`}>
                <span>{t("INTERACTIVES: 03", "ឧបករណ៍អន្តរកម្ម៖ ០៣")}</span>
                <span className="opacity-40">|</span>
                <span>{t("HIGH-VISIBILITY THEME", "ប្រធានបទមើលឃើញច្បាស់")}</span>
                <span className="opacity-40">|</span>
                <span>{t("BILINGUAL", "ទ្វេភាសា")}</span>
              </div>
            </div>
            <AlertTriangle className="hidden sm:block w-24 h-24 text-stone-900/15 flex-shrink-0" strokeWidth={1.6} />
          </div>
          {/* Hazard-tape strip on bottom edge */}
          <div className="h-3" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #1c1917 0 12px, #facc15 12px 24px)",
          }} />
        </header>

        {/* 1. Signal guide */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ១" : "Lesson 1"}
            titleEn="The Science of the Signal"
            titleKh="វិទ្យាសាស្ត្រនៃសញ្ញា"
            kh={kh}
          />
          <DisasterSignalGuide />
        </section>

        {/* 2. Emergency Bag game */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ២" : "Lesson 2"}
            titleEn="Build Your Go-Bag"
            titleKh="សាងសង់កាបូបបន្ទាន់របស់អ្នក"
            kh={kh}
          />
          <EmergencyBagGame />
        </section>

        {/* 3. Local flood tracker links */}
        <section>
          <SectionHeading
            kicker={kh ? "ទិន្នន័យក្នុងតំបន់" : "Local Data"}
            titleEn="Real-time Flood & Disaster Trackers"
            titleKh="ឧបករណ៍តាមដានទឹកជំនន់ និងគ្រោះមហន្តរាយពេលបច្ចុប្បន្ន"
            kh={kh}
          />

          <div className="rounded-3xl bg-white border-4 border-yellow-400 shadow-lg overflow-hidden">
            <div className="px-5 sm:px-7 py-4 sm:py-5" style={{
              backgroundImage: "repeating-linear-gradient(45deg, #facc15 0 14px, #1c1917 14px 18px)",
            }}>
              <div className="bg-yellow-300 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-stone-900 shadow-sm">
                <Activity className="w-5 h-5 text-stone-900" />
                <span className={`text-sm font-extrabold uppercase tracking-wider text-stone-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {kh ? "ទិន្នន័យពេលបច្ចុប្បន្ន" : "Live Data"}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7 bg-gradient-to-br from-yellow-50 to-orange-50">
              <p className={`text-sm text-stone-800 mb-4 leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh
                  ? "ភ្ជាប់ដោយផ្ទាល់ទៅទិន្នន័យពេលបច្ចុប្បន្នពីច្រាំងទន្លេមេគង្គ និងគណៈកម្មាធិការជាតិគ្រប់គ្រងគ្រោះមហន្តរាយ។ ពិនិត្យតំបន់របស់អ្នក មុនពេលរដូវវស្សាមកដល់!"
                  : "Direct links to real-time data from the Mekong River and Cambodia's National Committee for Disaster Management. Check your area before the rainy season arrives!"}
              </p>

              <div className="grid md:grid-cols-3 gap-3">
                {TRACKERS.map((t) => (
                  <a
                    key={t.href}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border-2 border-stone-300 bg-white p-4 hover:border-orange-500 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-yellow-200 text-stone-900 border border-stone-900 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                        {kh ? t.badgeKh : t.badgeEn}
                      </span>
                      <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition" />
                    </div>
                    <h4 className={`font-bold text-sm text-stone-900 leading-snug ${kh ? "font-khmer" : ""}`}>
                      {kh ? t.nameKh : t.nameEn}
                    </h4>
                    <p className={`mt-1.5 text-xs text-stone-600 leading-relaxed flex-1 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                      {kh ? t.descKh : t.descEn}
                    </p>
                    <div className={`mt-2 inline-flex items-center gap-1 text-xs font-bold text-orange-700 group-hover:text-orange-900 ${kh ? "font-khmer" : ""}`}>
                      {kh ? "បើកវេបសាយ" : "Open website"}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                ))}
              </div>

              <div className={`mt-5 rounded-lg bg-stone-900 text-yellow-300 p-3 flex items-start gap-2 text-xs ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="font-extrabold">{kh ? "សម្គាល់៖ " : "Note: "}</span>
                  {kh
                    ? "ក្នុងករណីបន្ទាន់ កម្ពុជាមានលេខបន្ទាន់ដ៏ល្បី ១១៩ (ការពារស៊ីវិល) និង ១១៨ (ភ្នាក់ងារពន្លត់អគ្គីភ័យ)។"
                    : "In a real emergency, Cambodia's hotlines are 119 (Civil Protection) and 118 (Fire & Rescue)."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick legend at bottom */}
        <section className="grid sm:grid-cols-3 gap-3">
          <DisasterChip Icon={Waves} colorBg="bg-sky-100" colorText="text-sky-900" colorBorder="border-sky-300"
                        en="Floods" kh="ទឹកជំនន់" />
          <DisasterChip Icon={Activity} colorBg="bg-orange-100" colorText="text-orange-900" colorBorder="border-orange-300"
                        en="Earthquakes" kh="ការរញ្ជួយដី" />
          <DisasterChip Icon={Waves} colorBg="bg-cyan-100" colorText="text-cyan-900" colorBorder="border-cyan-300"
                        en="Tsunamis" kh="រលកយក្សស៊ូណាមិ" />
        </section>
      </div>
    </div>
  );
}

function SectionHeading({ kicker, titleEn, titleKh, kh }: { kicker: string; titleEn: string; titleKh: string; kh: boolean }) {
  return (
    <div className="mb-4 sm:mb-5">
      <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-orange-800 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kicker}
      </div>
      <h2 className={`font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
        {kh ? titleKh : titleEn}
        {kh && <span className="ml-2 text-base text-stone-500 font-sans font-normal">({titleEn})</span>}
      </h2>
    </div>
  );
}

function DisasterChip({
  Icon, colorBg, colorText, colorBorder, en, kh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  colorBg: string; colorText: string; colorBorder: string;
  en: string; kh: string;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <div className={`rounded-2xl border-2 p-3 flex items-center gap-3 ${colorBg} ${colorText} ${colorBorder}`}>
      <Icon className="w-6 h-6 flex-shrink-0" />
      <div className={`font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
        {isKh ? kh : en}
        {isKh && <span className="ml-1.5 text-[11px] font-normal opacity-70 font-sans">({en})</span>}
      </div>
    </div>
  );
}
