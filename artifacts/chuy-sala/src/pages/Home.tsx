import { Link } from "wouter";
import { MapPin, GraduationCap, Heart, CheckCircle2, Languages, Wrench, ExternalLink, PersonStanding } from "lucide-react";
import { useListSchools, useListNeeds, useListCompletedProjects } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { WeatherWidget } from "@/components/WeatherWidget";
import { GlobalSearch } from "@/components/GlobalSearch";
import { TopicOfTheDay } from "@/components/TopicOfTheDay";
import { CountUp } from "@/components/CountUp";
import { LearningPathQuiz } from "@/components/LearningPathQuiz";
import { FeedbackSection } from "@/components/FeedbackSection";
import { RainySeasonAlert } from "@/components/RainySeasonAlert";

export function Home() {
  const t = useTranslation();
  const { language, toggleLanguage } = useLanguageStore();
  
  const { data: schools } = useListSchools();
  const { data: needs } = useListNeeds();
  const { data: completed } = useListCompletedProjects();

  const activeNeeds = needs?.filter(n => n.status === 'active') || [];
  
  return (
    <div className="w-full min-h-screen">
      {/* Rainy-season safety banner — sits between the global Navbar and the
          Hero. Self-gates to May–October and remembers in-session dismissal. */}
      <RainySeasonAlert />

      {/* Hero Section */}
      {/* NOTE: overflow is intentionally NOT hidden here so the GlobalSearch
          dropdown can extend below the hero. The bg image is absolutely
          positioned to inset-0 of the section, so it stays bounded anyway. */}
      <section className="relative w-full min-h-[700px] h-[92vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-foreground/40 z-10" /> {/* Dark overlay for readability */}

        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`}
          alt="Cambodian countryside school"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* z-40 lifts hero content (and the GlobalSearch dropdown inside it)
            above the stats card below (which sits at z-30). */}
        <div className="relative z-40 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 flex flex-col items-center justify-center">
          {/* Language toggle — desktop only. On mobile this is redundant with
              the toggle inside the hamburger menu and was overlapping the
              alert banner, so it's hidden below the md breakpoint. */}
          <div className="hidden md:flex justify-center mb-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 text-white font-bold text-sm hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <Languages className="w-4 h-4" />
              <span className={language === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
              <span className="opacity-40">|</span>
              <span className={`font-khmer ${language === 'kh' ? 'opacity-100' : 'opacity-50'}`}>ខ្មែរ</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span className={language === 'kh' ? 'font-khmer text-sm' : 'text-sm'}>
              {t("Empowering the next generation", "ផ្តល់អំណាចដល់ជំនាន់ក្រោយ")}
            </span>
          </div>
          
          <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg ${language === 'kh' ? 'font-khmer leading-relaxed sm:leading-snug' : 'font-display tracking-tight leading-tight'}`}>
            {t("Bridge the gap for", "តភ្ជាប់គម្លាតសម្រាប់")}<br />
            <span className="text-accent underline decoration-4 underline-offset-8">
              {t("rural Cambodian schools", "សាលារៀននៅជនបទកម្ពុជា")}
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md ${language === 'kh' ? 'font-khmer' : ''}`}>
            {t(
              "Directly connect with schools in need. Browse requests for books, infrastructure, and technology, and see exactly where your donation goes.",
              "ភ្ជាប់ទំនាក់ទំនងផ្ទាល់ជាមួយសាលារៀនដែលកំពុងខ្វះខាត។ ស្វែងរកតម្រូវការសៀវភៅ ហេដ្ឋារចនាសម្ព័ន្ធ និងបច្ចេកវិទ្យា ហើយមើលឱ្យច្បាស់ពីទីកន្លែងដែលអំណោយរបស់អ្នកទៅដល់។"
            )}
          </p>
          
          {/* Topic of the Day — daily-rotating discovery pill (deterministic,
              picked by day-of-year against the global search index, no backend).
              The primary GlobalSearch now lives at the very top of this hero
              block (above the language toggle), so the duplicate that used to
              sit here has been removed. */}
          <div className="mb-8">
            <TopicOfTheDay />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/map" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-primary text-white shadow-xl shadow-primary/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
              <MapPin className="w-5 h-5" />
              <span className={language === 'kh' ? 'font-khmer' : ''}>{t("Explore Map", "រុករកផែនទី")}</span>
            </Link>
            <Link href="/needs" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-white text-foreground shadow-xl shadow-black/10 hover:-translate-y-1 hover:bg-gray-50 transition-all duration-300">
              <Heart className="w-5 h-5 text-destructive" />
              <span className={language === 'kh' ? 'font-khmer' : ''}>{t("View All Needs", "មើលតម្រូវការទាំងអស់")}</span>
            </Link>
          </div>

          {/* Global Search — relocated from the top of the hero. Sits
              directly underneath the action buttons with mt-8 breathing
              room. Width is centered & constrained to max-w-2xl. */}
          <div className="relative z-10 mt-8 w-full mx-auto max-w-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlobalSearch variant="hero" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex flex-col items-center text-center pt-4 md:pt-0">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-black text-foreground font-display mb-2 tabular-nums">
              <CountUp value={schools?.length ?? 0} />
            </h3>
            <p className={`text-muted-foreground font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Registered Schools", "សាលារៀនដែលបានចុះឈ្មោះ")}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <div className="w-16 h-16 bg-orange-50 text-accent rounded-2xl flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-black text-foreground font-display mb-2 tabular-nums">
              <CountUp value={activeNeeds.length} />
            </h3>
            <p className={`text-muted-foreground font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Active Needs", "តម្រូវការសកម្ម")}
            </p>
          </div>

          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-black text-foreground font-display mb-2 tabular-nums">
              <CountUp value={completed?.length ?? 0} />
            </h3>
            <p className={`text-muted-foreground font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Completed Projects", "គម្រោងបានបញ្ចប់")}
            </p>
          </div>
        </div>
      </section>

      {/* How it works — placed directly under the stats bar so visitors learn
          the donation flow before scrolling into deeper content. The stats
          card sits with mb-16 above this band, and the section's own py-20
          gives generous breathing room so the two never visually collide. */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
              {t("How it works", "តើវាដំណើរការយ៉ាងដូចម្តេច?")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("We believe in total transparency. See exactly what schools need and contact them directly.", "យើងជឿជាក់លើតម្លាភាពទាំងស្រុង។ សូមមើលយ៉ាងច្បាស់នូវអ្វីដែលសាលារៀនត្រូវការ ហើយទាក់ទងពួកគេដោយផ្ទាល់។")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: t("Find a School", "ស្វែងរកសាលារៀន"),
                desc: t("Browse the interactive map to find rural schools and see their specific needs.", "រុករកផែនទីអន្តរកម្មដើម្បីស្វែងរកសាលារៀននៅជនបទ និងមើលតម្រូវការជាក់លាក់របស់ពួកគេ។")
              },
              {
                step: "02",
                title: t("Contact Directly", "ទាក់ទងដោយផ្ទាល់"),
                desc: t("Click 'Donate' to email the school administration directly. No middlemen.", "ចុច 'បរិច្ចាគ' ដើម្បីផ្ញើអ៊ីមែលទៅរដ្ឋបាលសាលាដោយផ្ទាល់។ គ្មានអ្នកកណ្តាលទេ។")
              },
              {
                step: "03",
                title: t("See the Impact", "មើលពីផលប៉ះពាល់"),
                desc: t("Schools post 'Thank You' photos on the transparency log once items are received.", "សាលារៀនបង្ហោះរូបភាព 'អរគុណ' នៅលើកំណត់ហេតុតម្លាភាពនៅពេលទទួលបានសម្ភារៈ។")
              }
            ].map((item) => (
              <div key={item.step} className="relative bg-white p-8 rounded-3xl shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all">
                <span aria-hidden="true" className="absolute -top-6 -left-6 text-7xl font-black text-primary/10 font-display select-none">
                  {item.step}
                </span>
                <h3 className={`text-xl font-bold text-foreground mb-4 mt-4 relative z-10 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
                  {item.title}
                </h3>
                <p className={`text-muted-foreground relative z-10 ${language === 'kh' ? 'font-khmer leading-loose text-sm' : ''}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Discovery Quiz — onboarding for new visitors */}
      <LearningPathQuiz />

      {/* Weather Widget */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: intro copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200">
              🌤️ {t("Local Weather", "ការព្យាករណ៍អាកាសធាតុតាមតំបន់")}
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'kh' ? 'font-khmer leading-loose' : 'font-display'}`}>
              {t("Cambodia's weather, live", "អាកាសធាតុកម្ពុជា ផ្ទាល់")}
            </h2>
            <p className={`text-muted-foreground leading-relaxed ${language === 'kh' ? 'font-khmer leading-loose text-sm' : ''}`}>
              {t(
                "Whether you're a teacher planning an outdoor class or a donor traveling to a school, check real-time weather for any province in Cambodia.",
                "មិនថាអ្នកជាគ្រូដែលរៀបចំថ្នាក់រៀននៅខាងក្រៅ ឬជាអ្នកផ្ដល់ប្រាក់ចំណូលដែលធ្វើដំណើរទៅសាលា ពិនិត្យអាកាសធាតុក្នុងពេលវេលាជាក់ស្ដែង សម្រាប់ខេត្តណាមួយក្នុងកម្ពុជា។"
              )}
            </p>
          </div>
          {/* Right: widget */}
          <div>
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* Study Center */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            📚 {t("Study Center", "មជ្ឈមណ្ឌលសិក្សា")}
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-3 ${language === 'kh' ? 'font-khmer leading-loose' : 'font-display'}`}>
            {t("Learning Pathways", "គន្លងសិក្សា")}
          </h2>
          <p className={`text-muted-foreground max-w-xl mx-auto ${language === 'kh' ? 'font-khmer leading-loose text-sm' : ''}`}>
            {t(
              "Academic and vocational resources to help every Cambodian student find their best path forward.",
              "ធនធានសិក្សា និងវិជ្ជាជីវៈ ដើម្បីជួយសិស្សខ្មែរគ្រប់រូប ស្វែងរកផ្លូវវឌ្ឍនៈរបស់ពួកគេ។"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exam Prep card */}
          <Link
            href="/exam-prep"
            className="group relative flex flex-col bg-white border border-border rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-5">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className={`text-xl font-bold text-foreground mb-2 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
              {t("Exam Prep", "ត្រៀមប្រឡង")}
            </h3>
            <p className={`text-muted-foreground text-sm leading-relaxed flex-1 ${language === 'kh' ? 'font-khmer leading-loose' : ''}`}>
              {t(
                "Practice with Grade 12 national exam questions, timed quizzes, and subject-by-subject study guides.",
                "អនុវត្តជាមួយសំណួរប្រឡងថ្នាក់ជាតិថ្នាក់ទី ១២ កម្រងសំណួរប្រកបដោយពេលវេលា និងមគ្គុទ្ទេសក៍សិក្សាតាមមុខវិជ្ជា។"
              )}
            </p>
            <div className={`mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Start studying", "ចាប់ផ្ដើមរៀន")} →
            </div>
          </Link>

          {/* Vocational Guide card */}
          <a
            href="https://khmervoc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col bg-white border border-border rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5">
              <Wrench className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-xl font-bold text-foreground ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
                {t("Vocational Guide", "មគ្គុទ្ទេសក៍វិជ្ជាជីវៈ")}
              </h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>
            <p className={`text-muted-foreground text-sm leading-relaxed flex-1 ${language === 'kh' ? 'font-khmer leading-loose' : ''}`}>
              {t(
                "Explore technical and vocational training opportunities across Cambodia.",
                "ស្វែងយល់ពីឱកាសបណ្តុះបណ្តាលបច្ចេកទេស និងវិជ្ជាជីវៈនៅទូទាំងប្រទេសកម្ពុជា។"
              )}
            </p>
            <div className={`mt-5 inline-flex items-center gap-1.5 text-amber-600 text-sm font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Explore programmes", "ស្វែងរកកម្មវិធី")} →
            </div>
          </a>

          {/* Human Anatomy card (Featured Resource — sister site) */}
          <a
            href="https://anatomykh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col bg-white border border-border rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border border-rose-200">
              <span>{t("Featured", "ពិសេស")}</span>
            </div>
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-5">
              <PersonStanding className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-xl font-bold text-foreground ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
                {t("Human Anatomy", "រូបកាយវិភាគវិទ្យា")}
              </h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>
            <p className={`text-muted-foreground text-sm leading-relaxed flex-1 ${language === 'kh' ? 'font-khmer leading-loose' : ''}`}>
              {t(
                "Explore the systems of the human body in detail on our sister site, AnatomyKH.",
                "រុករកប្រព័ន្ធនៃរាងកាយមនុស្សឱ្យបានលម្អិតនៅលើគេហទំព័រ AnatomyKH របស់យើង។"
              )}
            </p>
            <div className={`mt-5 inline-flex items-center gap-1.5 text-rose-600 text-sm font-semibold ${language === 'kh' ? 'font-khmer' : ''}`}>
              {t("Visit AnatomyKH", "ចូលទស្សនា AnatomyKH")} →
            </div>
          </a>
        </div>
      </section>

      {/* Suggestions & Feedback — last section before the global footer.
          Offline-first: posts to Formspree when online, otherwise queues
          to localStorage and auto-flushes on the window 'online' event. */}
      <FeedbackSection />

    </div>
  );
}
