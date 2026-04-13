import { useState } from "react";
import { Star, ExternalLink, X, Send, UserCircle2, Briefcase, Quote } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Alumnus = {
  id: number;
  nameEn: string;
  nameKh: string;
  classYear: number;
  roleEn: string;
  roleKh: string;
  provinceEn: string;
  provinceKh: string;
  journeyEn: string;
  journeyKh: string;
  initials: string;
  avatarBg: string;
};

const ALUMNI: Alumnus[] = [
  {
    id: 1,
    nameEn: "Sophal Rath",
    nameKh: "សុផល រ៉ាត",
    classYear: 2018,
    roleEn: "Mechanical Engineer — Don Bosco Technical School",
    roleKh: "វិស្វករយន្តកល — សាលាបច្ចេកទេស Don Bosco",
    provinceEn: "Phnom Penh",
    provinceKh: "ភ្នំពេញ",
    journeyEn:
      "Growing up in a rural village, I never imagined becoming an engineer. A donated set of science textbooks changed everything — they sparked a curiosity that pushed me through provincial exams and into vocational training. Today I help maintain machinery that supports hundreds of livelihoods.",
    journeyKh:
      "ធំដឹងក្ដីក្នុងភូមិជនបទ ខ្ញុំមិនដែលស្រមៃថានឹងក្លាយជាវិស្វករ។ សៀវភៅវិទ្យាសាស្ត្រដែលបានទទួលជាអំណោយ បានផ្លាស់ប្ដូររឿងទាំងអស់ — វាបំផុសការចង់ដឹងដែលជំរុញខ្ញុំក្នុងការប្រឡង និងចូលរៀនបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ។ សព្វថ្ងៃខ្ញុំជួយថែទាំម៉ាស៊ីនដែលគ្រប់ជំនួយការរស់នៅរបស់មនុស្សជាច្រើន។",
    initials: "SR",
    avatarBg: "from-[#0a2240] to-[#1e3a5f]",
  },
  {
    id: 2,
    nameEn: "Sreynit Chan",
    nameKh: "ស្រីនិត ចាន់",
    classYear: 2019,
    roleEn: "Primary School Teacher — Kampot Province",
    roleKh: "គ្រូបង្រៀនបឋមសិក្សា — ខេត្តកំពត",
    provinceEn: "Kampot",
    provinceKh: "កំពត",
    journeyEn:
      "I was the first girl in my family to complete high school. Our school received new whiteboards and stationery when I was in Grade 11, and that small change made our classroom feel real and professional. I returned home to teach, because I want every child in my village to feel what I felt in that upgraded classroom.",
    journeyKh:
      "ខ្ញុំជាក្មេងស្រីដំបូងគេក្នុងគ្រួសារដែលបញ្ចប់វិទ្យាល័យ។ សាលារបស់យើងបានទទួលក្ដារខៀននិងសម្ភារៈសិក្សានៅថ្នាក់ ១១ ហើយការផ្លាស់ប្ដូរតូចនោះធ្វើឱ្យថ្នាក់រៀនរបស់យើងមានអារម្មណ៍ជាក់ស្ដែង និងប្រកបដោយវិជ្ជាជីវៈ។ ខ្ញុំត្រឡប់មកផ្ទះបង្រៀន ព្រោះខ្ញុំចង់ឱ្យកូនៗគ្រប់រូបក្នុងភូមិរបស់ខ្ញុំ មានអារម្មណ៍ដូចដែលខ្ញុំបានមានក្នុងថ្នាក់រៀនដែលត្រូវបានធ្វើឱ្យប្រសើរ។",
    initials: "SC",
    avatarBg: "from-[#7c1a1a] to-[#b91c1c]",
  },
  {
    id: 3,
    nameEn: "Dara Keo",
    nameKh: "ដារ៉ា កែវ",
    classYear: 2017,
    roleEn: "Junior Software Developer — Phnom Penh Tech Startup",
    roleKh: "អ្នកអភិវឌ្ឍន៍កម្មវិធី — ក្រុមហ៊ុន Tech Startup ភ្នំពេញ",
    provinceEn: "Siem Reap",
    provinceKh: "សៀមរាប",
    journeyEn:
      "Our school received a laptop donation in my final year. I typed my first line of code on that machine. Within a year of graduating I had taught myself enough to land an internship, and now I build mobile apps that rural students like my younger self can use for free.",
    journeyKh:
      "សាលារបស់យើងបានទទួលការបរិច្ចាគកុំព្យូទ័រយួរដៃក្នុងឆ្នាំចុងក្រោយរបស់ខ្ញុំ។ ខ្ញុំបានវាយកូដបន្ទាត់ដំបូងរបស់ខ្ញុំនៅលើម៉ាស៊ីននោះ។ ក្នុងរយៈពេលមួយឆ្នាំបន្ទាប់ពីបញ្ចប់ការសិក្សា ខ្ញុំបានបង្រៀនខ្លួនឯងដើម្បីទទួលបានការហ្វឹកហ្វឺន ហើយឥឡូវខ្ញុំបង្កើតកម្មវិធីទូរស័ព្ទដែលសិស្សជនបទដូចដែលខ្ញុំធ្លាប់ជាអ្នកស្ម័គ្រ អាចប្រើប្រាស់ដោយឥតគិតថ្លៃ។",
    initials: "DK",
    avatarBg: "from-[#064e3b] to-[#065f46]",
  },
  {
    id: 4,
    nameEn: "Pisey Lim",
    nameKh: "ពិសី លីម",
    classYear: 2020,
    roleEn: "Registered Nurse — Battambang Provincial Hospital",
    roleKh: "គិលានុបដ្ឋាយិការចុះឈ្មោះ — មន្ទីរពេទ្យខេត្តបាត់ដំបង",
    provinceEn: "Battambang",
    provinceKh: "បាត់ដំបង",
    journeyEn:
      "Access to running water and clean sanitation at my high school gave me my first lesson in public health — I realised how much these basics matter. I studied nursing at a provincial college and now care for patients who travel hours to reach our hospital. Every day reinforces why infrastructure matters.",
    journeyKh:
      "ការទទួលបានទឹកស្អាតនិងអនាម័យនៅវិទ្យាល័យរបស់ខ្ញុំ ផ្ដល់ជូនខ្ញុំនូវមេរៀនដំបូងអំពីសុខភាពសាធារណៈ — ខ្ញុំដឹងថាកត្តាមូលដ្ឋានទាំងនេះមានសារៈសំខាន់ប៉ុណ្ណា។ ខ្ញុំបានសិក្សាគិលានុបដ្ឋាននៅមហាវិទ្យាល័យខេត្ត ហើយឥឡូវថែទាំអ្នកជំងឺដែលធ្វើដំណើរពីច្រើនម៉ោងដើម្បីមកដល់មន្ទីរពេទ្យរបស់យើង។",
    initials: "PL",
    avatarBg: "from-[#1e3a8a] to-[#1d4ed8]",
  },
  {
    id: 5,
    nameEn: "Sokha Meas",
    nameKh: "សុខា មាស",
    classYear: 2016,
    roleEn: "Agricultural Extension Officer — Ratanakiri Province",
    roleKh: "មន្ត្រីផ្នែកកសិកម្ម — ខេត្តរតនគីរី",
    provinceEn: "Ratanakiri",
    provinceKh: "រតនគីរី",
    journeyEn:
      "I grew up farming with my parents. When our school got science lab equipment, I started experimenting with soil samples during lunch breaks. That habit turned into a scholarship to study agronomy. Now I train farmers in my home province on modern, sustainable techniques that triple their yields.",
    journeyKh:
      "ខ្ញុំធំដឹងក្ដីដោយធ្វើកសិកម្មជាមួយឪពុកម្ដាយ។ ពេលដែលសាលារបស់យើងទទួលបានឧបករណ៍មន្ទីរពិសោធន៍វិទ្យាសាស្ត្រ ខ្ញុំចាប់ផ្ដើមពិសោធន៍លើគំរូដី។ ទម្លាប់នោះបានក្លាយជាអាហារូបករណ៍ដើម្បីសិក្សាកសិរូបវិទ្យា ហើយឥឡូវខ្ញុំបង្ហាត់បង្រៀនកសិករក្នុងខេត្តស្រុកកំណើតរបស់ខ្ញុំ អំពីបច្ចេកទេសទំនើបនិងប្រកបដោយចីរភាព ដែលបង្កើនផលិតផលបីដង។",
    initials: "SM",
    avatarBg: "from-[#14532d] to-[#15803d]",
  },
  {
    id: 6,
    nameEn: "Malis Sok",
    nameKh: "មាលី សុខ",
    classYear: 2015,
    roleEn: "University Lecturer — Royal University of Phnom Penh",
    roleKh: "សាស្ត្រាចារ្យ — សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
    provinceEn: "Kampong Cham",
    provinceKh: "កំពង់ចាម",
    journeyEn:
      "A teacher training workshop held at my rural high school introduced me to critical thinking. It was the first time anyone had told me my opinion mattered in the classroom. I went on to earn a master's degree abroad and returned to build the kind of educational environment that transformed my own life.",
    journeyKh:
      "សិក្ខាសាលាបណ្ដុះបណ្ដាលគ្រូដែលប្រព្រឹត្តនៅវិទ្យាល័យជនបទរបស់ខ្ញុំ បានណែនាំខ្ញុំអំពីការគិតពិចារណា។ ជាលើកដំបូងគេដែលនរណាម្នាក់ប្រាប់ខ្ញុំថា មតិយោបល់របស់ខ្ញុំមានសារៈសំខាន់ក្នុងថ្នាក់រៀន។ ខ្ញុំបន្ត ទទួលបានសញ្ញាបត្រអនុបណ្ឌិតនៅបរទេស ហើយត្រឡប់មកបង្កើតបរិយាកាសសិក្សាប្រភេទដូចដែលបានផ្លាស់ប្ដូរជីវិតរបស់ខ្ញុំ។",
    initials: "MS",
    avatarBg: "from-[#4c1d95] to-[#6d28d9]",
  },
];

const GOOGLE_FORM_URL = "https://forms.google.com";

export function AlumniPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2e4a] to-[#0f2040] text-white overflow-hidden">
        {/* Gold top stripe */}
        <div className="flex h-2">
          <div className="flex-1 bg-[#c9a227]" />
          <div className="flex-1 bg-[#e8c547]" />
          <div className="flex-1 bg-[#c9a227]" />
        </div>

        {/* Subtle star decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          {["top-8 left-12 text-5xl", "top-16 right-20 text-3xl", "bottom-16 left-1/4 text-4xl", "bottom-8 right-1/3 text-2xl"].map((cls, i) => (
            <Star key={i} className={`absolute ${cls} opacity-10 text-[#c9a227]`} fill="currentColor" />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-[#c9a227]/50 bg-[#c9a227]/10 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-[#e8c547] backdrop-blur-sm">
            <Star className="w-4 h-4" fill="currentColor" />
            {t("Hall of Fame", "វិហារកិត្យានុភាព")}
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t("Alumni Success Stories", "រឿងរ៉ាវជោគជ័យរបស់អ្នកជំនាន់មុន")}
          </h1>
          <p className={`text-white/70 max-w-2xl mx-auto leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Every school need fulfilled is a story waiting to be written. Meet the graduates whose lives were shaped by resources, teachers, and the communities that believed in them.",
              "រាល់តម្រូវការសាលាដែលបានបំពេញ គឺជារឿងរ៉ាវដែលរង់ចាំត្រូវបានសរសេរ។ ស្វែងយល់ពីអ្នកបញ្ចប់ការសិក្សាដែលជីវិតត្រូវបានកែប្រែដោយធនធាន គ្រូ និងសហគមន៍ដែលជឿជាក់លើពួកគេ។"
            )}
          </p>
        </div>

        {/* Gold wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {/* ── Alumni Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ALUMNI.map((a) => {
            const isExpanded = expandedId === a.id;
            return (
              <div
                key={a.id}
                className="group flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Gold top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#c9a227] via-[#e8c547] to-[#c9a227]" />

                <div className="flex flex-col flex-1 p-6 gap-4">

                  {/* Avatar + identity */}
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${a.avatarBg} flex items-center justify-center shadow-md`}>
                      <span className="text-white font-bold text-lg tracking-tight">{a.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-bold text-foreground leading-tight truncate ${kh ? "font-khmer text-base" : "font-display text-lg"}`}>
                        {kh ? a.nameKh : a.nameEn}
                      </h3>
                      <p className={`text-xs text-[#c9a227] font-semibold mt-0.5 ${kh ? "font-khmer" : ""}`}>
                        {t("Class of", "ថ្នាក់ឆ្នាំ")} {a.classYear} · {kh ? a.provinceKh : a.provinceEn}
                      </p>
                    </div>
                  </div>

                  {/* Current role */}
                  <div className="flex items-start gap-2.5 bg-[#0a1628]/5 border border-[#c9a227]/20 rounded-xl px-4 py-3">
                    <Briefcase className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                    <p className={`text-sm text-foreground font-semibold leading-snug ${kh ? "font-khmer" : ""}`}>
                      {kh ? a.roleKh : a.roleEn}
                    </p>
                  </div>

                  {/* Journey quote — truncated / expanded */}
                  <div className="relative">
                    <Quote className="w-5 h-5 text-[#c9a227]/40 mb-1 flex-shrink-0" fill="currentColor" />
                    <p className={`text-muted-foreground text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}
                      ${!isExpanded ? "line-clamp-3" : ""}`}>
                      {kh ? a.journeyKh : a.journeyEn}
                    </p>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : a.id)}
                      className={`mt-1.5 text-xs font-semibold text-[#c9a227] hover:text-[#e8c547] transition-colors ${kh ? "font-khmer" : ""}`}
                    >
                      {isExpanded ? t("Show less ▲", "បង្ហាញតិច ▲") : t("Read more ▼", "អានបន្ថែម ▼")}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Share Your Story CTA ── */}
        <div className="mt-16 relative bg-gradient-to-br from-[#0a1628] to-[#1a2e4a] rounded-3xl overflow-hidden">
          {/* Gold border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-[#c9a227]/40 pointer-events-none" />
          {/* Gold accent bar at top */}
          <div className="h-1 bg-gradient-to-r from-[#c9a227] via-[#e8c547] to-[#c9a227]" />

          <div className="px-8 py-12 text-center relative z-10">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a227]/20 border border-[#c9a227]/30 flex items-center justify-center">
                <Send className="w-6 h-6 text-[#e8c547]" />
              </div>
            </div>

            <h2 className={`font-display font-bold text-white text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t("Are you a graduate with a story to tell?", "តើអ្នកជាអ្នកបញ្ចប់ការសិក្សាដែលមានរឿងរ៉ាវដើម្បីចែករំលែកទេ?")}
            </h2>
            <p className={`text-white/65 max-w-xl mx-auto mb-8 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
              {t(
                "Your journey can inspire the next generation of rural Cambodian students. Share your story and become part of our Hall of Fame.",
                "ដំណើររបស់អ្នកអាចបំផុសសិស្សជំនាន់ក្រោយ នៃជនបទកម្ពុជា។ ចែករំលែករឿងរ៉ាវរបស់អ្នក ហើយក្លាយជាផ្នែកមួយនៃវិហារកិត្យានុភាពរបស់យើង។"
              )}
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold shadow-lg
                bg-gradient-to-r from-[#c9a227] to-[#e8c547] text-[#0a1628]
                hover:from-[#e8c547] hover:to-[#c9a227] hover:-translate-y-0.5 hover:shadow-xl
                active:scale-95 transition-all
                ${kh ? "font-khmer text-base" : "text-sm"}`}
            >
              <UserCircle2 className="w-5 h-5 flex-shrink-0" />
              {t("Share Your Story", "ចែករំលែករឿងរបស់អ្នក")}
              <ExternalLink className="w-4 h-4 opacity-70 flex-shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
