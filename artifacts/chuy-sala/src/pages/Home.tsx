import { DengueHealthNotice } from "@/components/DengueHealthNotice";
import { Link } from "wouter";
import { MapPin, GraduationCap, Heart, CheckCircle2, Languages, Wrench, ExternalLink, PersonStanding } from "lucide-react";
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
            {t("Explore, learn and build with", "ស្វែងយល់ និងសិក្សាជាមួយ")}<br />
            <span className="text-accent underline decoration-4 underline-offset-8">
              {t("School Connect STEM", "មជ្ឈមណ្ឌល STEM កម្ពុជា")}
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md ${language === 'kh' ? 'font-khmer' : ''}`}>
            {t(
              "Discover bilingual lessons, interactive science and mathematics, and practical skills for your future.",
              "ស្វែងយល់មេរៀនពីរភាសា វិទ្យាសាស្ត្រ គណិតវិទ្យា និងជំនាញសម្រាប់អនាគតរបស់អ្នក។"
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
            <Link href="/science" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-primary text-white shadow-xl shadow-primary/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
              <MapPin className="w-5 h-5" />
              <span className={language === 'kh' ? 'font-khmer' : ''}>{t("Explore Science", "ស្វែងយល់វិទ្យាសាស្ត្រ")}</span>
            </Link>
            <Link href="/mathematics" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-white text-foreground shadow-xl shadow-black/10 hover:-translate-y-1 hover:bg-gray-50 transition-all duration-300">
              <Heart className="w-5 h-5 text-destructive" />
              <span className={language === 'kh' ? 'font-khmer' : ''}>{t("Explore Mathematics", "ស្វែងយល់គណិតវិទ្យា")}</span>
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

      {/* Learning Path Discovery Quiz — onboarding for new visitors */}
      <LearningPathQuiz />
      <DengueHealthNotice locale={language === "kh" ? "km" : "en"} />
      <section className="max-w-6xl mx-auto p-6 my-8 rounded-2xl bg-sky-50 border border-sky-200">
        <h2 className="text-2xl font-bold">{t("Capability Simulators", "ឧបករណ៍សាកល្បងសមត្ថភាព")}</h2>
        <p className="my-3">{t("Explore how technology changes what people can do.", "ស្វែងយល់ពីរបៀបដែលបច្ចេកវិទ្យាផ្លាស់ប្តូរសមត្ថភាពមនុស្ស។")}</p>
        <a className="inline-block rounded-xl bg-sky-800 text-white px-5 py-3" href="https://fastandfaster.netlify.app/" target="_blank" rel="noopener noreferrer">{t("Open Capability Simulator ↗", "បើកឧបករណ៍សាកល្បងសមត្ថភាព ↗")}</a>
      </section>

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
