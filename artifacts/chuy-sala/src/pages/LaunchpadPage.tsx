import { useState } from "react";
import { ExternalLink, Building2, Globe, ChevronDown, ChevronUp, Star, BookOpen } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type ScholarshipCard = {
  name: string;
  nameKh: string;
  country: string;
  countryKh: string;
  descEn: string;
  descKh: string;
  url: string;
  accent: string;
  flag: string;
};

const SCHOLARSHIPS: ScholarshipCard[] = [
  {
    name: "Australia Awards Cambodia",
    nameKh: "អាហារូបករណ៍អូស្ត្រាលី",
    country: "Australia",
    countryKh: "អូស្ត្រាលី",
    descEn: "Fully-funded scholarships for Cambodian students to undertake postgraduate study in Australia, developing skills that contribute to Cambodia's development.",
    descKh: "អាហារូបករណ៍ពេញលេញសម្រាប់និស្សិតខ្មែរ ដើម្បីបន្តការសិក្សាក្រោយបរិញ្ញាបត្រនៅប្រទេសអូស្ត្រាលី ដោយអភិវឌ្ឍជំនាញដែលរួមចំណែកដល់ការអភិវឌ្ឍន៍ប្រទេសជាតិ។",
    url: "https://australiaawardscambodia.org/",
    accent: "from-[#00843D] to-[#FFCD00]",
    flag: "🇦🇺",
  },
  {
    name: "Chevening Scholarship",
    nameKh: "អាហារូបករណ៍ Chevening",
    country: "United Kingdom",
    countryKh: "ចក្រភពអង់គ្លេស",
    descEn: "The UK Government's global scholarship programme, funded by the Foreign, Commonwealth & Development Office — for outstanding emerging leaders worldwide.",
    descKh: "កម្មវិធីអាហារូបករណ៍សកលរបស់រដ្ឋាភិបាលចក្រភពអង់គ្លេស ដែលផ្តល់មូលនិធិដោយក្រសួងការបរទេស — សម្រាប់អ្នកដឹកនាំឆ្នើមមុខរបស់ពិភពលោក។",
    url: "https://www.chevening.org/scholarship/cambodia/",
    accent: "from-[#012169] to-[#C8102E]",
    flag: "🇬🇧",
  },
  {
    name: "Fulbright Program",
    nameKh: "កម្មវិធី Fulbright",
    country: "United States",
    countryKh: "សហរដ្ឋអាមេរិក",
    descEn: "The U.S. government's flagship international educational exchange program, offering Cambodian students and professionals opportunities to study in the United States.",
    descKh: "កម្មវិធីផ្លាស់ប្ដូរអប់រំអន្តរជាតិឈានមុខគេរបស់រដ្ឋាភិបាលអាមេរិក ផ្ដល់ឱ្យនិស្សិត និងអ្នកជំនាញខ្មែរ ឱកាសសិក្សានៅអាមេរិក។",
    url: "https://kh.usembassy.gov/education-culture/fulbright-program/",
    accent: "from-[#002868] to-[#BF0A30]",
    flag: "🇺🇸",
  },
];

export function LaunchpadPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-[#032EA1] text-white overflow-hidden">
        {/* Cambodian flag colour bar */}
        <div className="flex h-2">
          <div className="flex-1 bg-[#032EA1]" />
          <div className="flex-1 bg-[#E00025]" />
          <div className="flex-1 bg-[#032EA1]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-semibold backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
            {t("University & Scholarship Launchpad", "ឱកាសការអប់រំ និងអាហារូបករណ៍")}
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Your Evolutionary Leap:",
              "ជំហានឆ្ពោះទៅមុខរបស់អ្នក៖"
            )}
            <br />
            <span className="text-amber-300">
              {t("Discover Higher Education", "ស្វែងយល់ពីការអប់រំកម្រិតឧត្តមសិក្សា")}
            </span>
          </h1>
          <p className={`text-white/75 max-w-2xl mx-auto mt-2 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Official resources, international scholarships, and guidance to help Cambodian students access world-class higher education.",
              "ធនធានផ្លូវការ អាហារូបករណ៍អន្តរជាតិ និងការណែនាំ ដើម្បីជួយនិស្សិតខ្មែរ ទទួលបានការអប់រំឧត្តមសិក្សាកម្រិតពិភពលោក។"
            )}
          </p>
        </div>

        {/* Decorative wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── MoEYS Official Resource ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className={`font-display font-bold text-foreground text-xl ${kh ? "font-khmer" : ""}`}>
              {t("Official Government Resource", "ធនធានផ្លូវការរបស់រដ្ឋាភិបាល")}
            </h2>
          </div>

          <div className="relative bg-gradient-to-r from-primary/5 via-sky-50/40 to-primary/5 border-2 border-primary/30 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start md:items-center overflow-hidden">
            {/* Accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-sky-400 rounded-l-3xl" />

            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg ml-2">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                  {t("Official", "ផ្លូវការ")}
                </span>
              </div>
              <h3 className={`font-display font-bold text-foreground text-xl mb-1 ${kh ? "font-khmer text-lg" : ""}`}>
                {t("Ministry of Education, Youth & Sport (MoEYS)", "ក្រសួងអប់រំ យុវជន និងកីឡា (ក.អ.យ.ក)")}
              </h3>
              <p className={`text-muted-foreground text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "The official source for national exam results, university entrance announcements, scholarship listings, and education policy in Cambodia.",
                  "ប្រភពផ្លូវការសម្រាប់លទ្ធផលប្រឡង ការប្រកាសចូលសាកលវិទ្យាល័យ បញ្ជីអាហារូបករណ៍ និងគោលនយោបាយអប់រំនៅប្រទេសកម្ពុជា។"
                )}
              </p>
            </div>

            <a
              href="https://www.moeys.gov.kh/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
            >
              {t("Visit MoEYS", "ចូលគេហទំព័រ")}
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </section>

        {/* ── Global Scholarships Grid ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className={`font-display font-bold text-foreground text-xl ${kh ? "font-khmer" : ""}`}>
              {t("International Scholarships", "អាហារូបករណ៍អន្តរជាតិ")}
            </h2>
          </div>
          <p className={`text-muted-foreground text-sm mb-8 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Fully-funded programmes open to Cambodian applicants. Click any card to explore eligibility and deadlines.",
              "កម្មវិធីផ្ដល់ប្រាក់ឧបត្ថម្ភពេញលេញ សម្រាប់ការដាក់ពាក្យសុំរបស់ប្រជាជនខ្មែរ។ ចុចលើប័ណ្ណណាមួយ ដើម្បីស្វែងរកលក្ខខណ្ឌ និងកាលបរិច្ឆេទកំណត់។"
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHOLARSHIPS.map((s) => (
              <div
                key={s.name}
                className="group flex flex-col bg-card rounded-2xl border border-border shadow-sm
                  hover:shadow-[0_0_28px_rgba(251,191,36,0.35)] hover:border-amber-300
                  hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${s.accent}`} />

                <div className="flex flex-col flex-1 p-6 gap-4">
                  {/* Flag + country pill */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={s.country}>{s.flag}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                      {kh ? s.countryKh : s.country}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className={`font-bold text-foreground leading-tight ${kh ? "font-khmer text-base" : "font-display text-lg"}`}>
                    {kh ? s.nameKh : s.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-muted-foreground flex-1 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : "text-sm"}`}>
                    {kh ? s.descKh : s.descEn}
                  </p>

                  {/* Gold CTA button */}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl
                      bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold
                      hover:from-amber-500 hover:to-amber-600 hover:shadow-md active:scale-95 transition-all
                      ${kh ? "font-khmer text-base" : "text-sm"}`}
                  >
                    {t("Apply / Learn More", "ដាក់ពាក្យ / ស្វែងយល់បន្ថែម")}
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Application Guide Accordion ── */}
        <section>
          <button
            onClick={() => setAccordionOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl
              bg-gradient-to-r from-primary/8 to-amber-50/60
              border-2 ${accordionOpen ? "border-primary/40" : "border-border"}
              text-left font-bold text-foreground hover:border-primary/30 hover:shadow-sm
              transition-all duration-200 group`}
            aria-expanded={accordionOpen}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className={kh ? "font-khmer text-base leading-relaxed" : "font-display text-base"}>
                {t(
                  "How to Write a University Application Letter",
                  "របៀបសរសេរលិខិតស្នើសុំចូលរៀនសាកលវិទ្យាល័យ"
                )}
              </span>
            </div>
            {accordionOpen
              ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
            }
          </button>

          {accordionOpen && (
            <div className="mt-2 px-6 py-8 rounded-2xl border border-border bg-card text-muted-foreground text-sm">
              {/* Content will be added later */}
              <p className={`italic text-muted-foreground/60 text-center py-4 ${kh ? "font-khmer" : ""}`}>
                {t(
                  "Detailed guidance coming soon. Check back for step-by-step instructions.",
                  "ការណែនាំលម្អិតនឹងមកដល់ឆាប់ៗ។ សូមពិនិត្យមើលមកវិញ ដើម្បីទទួលបានការណែនាំជាជំហានៗ។"
                )}
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
