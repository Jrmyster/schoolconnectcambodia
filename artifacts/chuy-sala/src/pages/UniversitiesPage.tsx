import { Link } from "wouter";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Cpu,
  Leaf,
  Landmark,
  Banknote,
  Library,
  ExternalLink,
  Globe,
  Facebook,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  CFH-UNI-01 · Universities in Cambodia: Where to Apply
//                សាកលវិទ្យាល័យនៅកម្ពុជា៖ កន្លែងដែលត្រូវដាក់ពាក្យ
//
//  A new directory under the Career & Future Hub → Scholarships section.
//  A responsive grid of cards for the top 5 national public universities.
//
//  Aesthetic: "Aspirational" — crisp whites + gold accents + deep academic
//  blues, evoking a university brochure or scholarship guidebook.
// ════════════════════════════════════════════════════════════════════════════

type University = {
  id: string;
  acronym: string;
  nameEn: string;
  nameKh: string;
  focusEn: string;
  focusKh: string;
  detailEn: React.ReactNode;
  detailKh: React.ReactNode;
  Icon: typeof Library;
  accent: {
    badge: string; // bg/text classes for focus pill
    chip: string;  // bg/text for icon chip
    bar: string;   // gold side-bar
  };
  website: string;
  facebook?: string;
};

const UNIVERSITIES: University[] = [
  {
    id: "rupp",
    acronym: "RUPP",
    nameEn: "Royal University of Phnom Penh",
    nameKh: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
    focusEn: "Science · Humanities · IT · Foreign Languages (IFL)",
    focusKh: "វិទ្យាសាស្ត្រ · មនុស្សសាស្ត្រ · បច្ចេកវិទ្យាព័ត៌មាន · ភាសាបរទេស (IFL)",
    detailEn: (
      <>
        The <strong>oldest</strong> and <strong>largest</strong> public university in Cambodia. The best choice for students wanting to study <strong>languages</strong>, <strong>STEM</strong>, or <strong>social sciences</strong>.
      </>
    ),
    detailKh: (
      <>
        សាកលវិទ្យាល័យសាធារណៈ <strong>ចាស់ជាងគេ</strong> និង <strong>ធំជាងគេ</strong> នៅកម្ពុជា។ ជម្រើសល្អបំផុតសម្រាប់សិស្សដែលចង់សិក្សា <strong>ភាសា</strong> <strong>STEM</strong> ឬ <strong>វិទ្យាសាស្ត្រសង្គម</strong>។
      </>
    ),
    Icon: Library,
    accent: {
      badge: "bg-blue-100 text-blue-900 border-blue-300",
      chip: "bg-amber-300 text-blue-950 border-amber-200",
      bar: "from-amber-300 to-amber-500",
    },
    website: "https://www.rupp.edu.kh",
    facebook: "https://www.facebook.com/RUPPCambodia",
  },
  {
    id: "itc",
    acronym: "ITC",
    nameEn: "Institute of Technology of Cambodia",
    nameKh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    focusEn: "Engineering · Architecture · Computer Science",
    focusKh: "វិស្វកម្ម · ស្ថាបត្យកម្ម · វិទ្យាសាស្ត្រកុំព្យូទ័រ",
    detailEn: (
      <>
        Also known as <strong>“Sala Techno”</strong>. The <strong>premier destination</strong> for students who want to <strong>build the future</strong>, offering rigorous math and engineering programs.
      </>
    ),
    detailKh: (
      <>
        ត្រូវបានគេស្គាល់ផងដែរថា <strong>«សាលាតិចណូ»</strong>។ <strong>គោលដៅឈានមុខ</strong> សម្រាប់សិស្សដែលចង់ <strong>បង្កើតអនាគត</strong> ដោយផ្ដល់នូវកម្មវិធីគណិតវិទ្យា និងវិស្វកម្មដ៏តឹងរ៉ឹង។
      </>
    ),
    Icon: Cpu,
    accent: {
      badge: "bg-slate-100 text-slate-900 border-slate-300",
      chip: "bg-amber-300 text-blue-950 border-amber-200",
      bar: "from-amber-300 to-amber-500",
    },
    website: "https://itc.edu.kh",
    facebook: "https://www.facebook.com/itc.edu.kh",
  },
  {
    id: "rua",
    acronym: "RUA",
    nameEn: "Royal University of Agriculture",
    nameKh: "សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម",
    focusEn: "Agronomy · Veterinary Medicine · Food Science",
    focusKh: "កសិកម្ម · វេជ្ជសាស្ត្រសត្វ · វិទ្យាសាស្ត្រអាហារ",
    detailEn: (
      <>
        Perfect for students who want to <strong>modernize farming</strong>, improve <strong>crop yields</strong>, or work with <strong>animals</strong> to elevate Cambodia's agricultural economy.
      </>
    ),
    detailKh: (
      <>
        ល្អឥតខ្ចោះសម្រាប់សិស្សដែលចង់ <strong>ធ្វើទំនើបកម្មកសិកម្ម</strong> បង្កើន <strong>ផលដំណាំ</strong> ឬធ្វើការជាមួយ <strong>សត្វ</strong> ដើម្បីលើកកម្ពស់សេដ្ឋកិច្ចកសិកម្មកម្ពុជា។
      </>
    ),
    Icon: Leaf,
    accent: {
      badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
      chip: "bg-amber-300 text-blue-950 border-amber-200",
      bar: "from-amber-300 to-amber-500",
    },
    website: "https://www.rua.edu.kh",
    facebook: "https://www.facebook.com/RUAOfficialPage",
  },
  {
    id: "rule",
    acronym: "RULE",
    nameEn: "Royal University of Law and Economics",
    nameKh: "សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្ត្រ និងវិទ្យាសាស្ត្រសេដ្ឋកិច្ច",
    focusEn: "Law · Public Administration · Finance",
    focusKh: "នីតិសាស្ត្រ · រដ្ឋបាលសាធារណៈ · ហិរញ្ញវត្ថុ",
    detailEn: (
      <>
        The <strong>top destination</strong> for future <strong>lawyers</strong>, <strong>judges</strong>, and <strong>government administrators</strong>.
      </>
    ),
    detailKh: (
      <>
        <strong>គោលដៅកំពូល</strong> សម្រាប់ <strong>មេធាវី</strong> <strong>ចៅក្រម</strong> និង <strong>អ្នករដ្ឋបាលរដ្ឋាភិបាល</strong> នៃថ្ងៃអនាគត។
      </>
    ),
    Icon: Landmark,
    accent: {
      badge: "bg-indigo-100 text-indigo-900 border-indigo-300",
      chip: "bg-amber-300 text-blue-950 border-amber-200",
      bar: "from-amber-300 to-amber-500",
    },
    website: "https://rule.edu.kh",
    facebook: "https://www.facebook.com/rule.edu.kh",
  },
  {
    id: "num",
    acronym: "NUM",
    nameEn: "National University of Management",
    nameKh: "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង",
    focusEn: "Business · Accounting · Entrepreneurship",
    focusKh: "ពាណិជ្ជកម្ម · គណនេយ្យ · សហគ្រិនភាព",
    detailEn: (
      <>
        Focused on the <strong>modern economy</strong>. Perfect for students who want to <strong>start their own businesses</strong> or work in <strong>international finance</strong>.
      </>
    ),
    detailKh: (
      <>
        ផ្ដោតលើ <strong>សេដ្ឋកិច្ចទំនើប</strong>។ ល្អឥតខ្ចោះសម្រាប់សិស្សដែលចង់ <strong>បើកអាជីវកម្មផ្ទាល់ខ្លួន</strong> ឬធ្វើការក្នុង <strong>ហិរញ្ញវត្ថុអន្តរជាតិ</strong>។
      </>
    ),
    Icon: Banknote,
    accent: {
      badge: "bg-amber-100 text-amber-900 border-amber-300",
      chip: "bg-amber-300 text-blue-950 border-amber-200",
      bar: "from-amber-300 to-amber-500",
    },
    website: "http://www.num.edu.kh",
    facebook: "https://www.facebook.com/num.edu.kh.official",
  },
];

export function UniversitiesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AspirationalBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/launchpad"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-launchpad"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅអាហារូបករណ៍" : "Back to Scholarships"}
        </Link>
      </div>

      {/* Hero — strictly bilingual */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="inline-flex items-center gap-2 bg-white/90 border border-amber-400 text-blue-900 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Career & Future Hub · Scholarships</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">មជ្ឈមណ្ឌលអាជីព និងអនាគត · អាហារូបករណ៍</span>
          <span className="font-mono opacity-60">· CFH-UNI-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-blue-950"
        >
          Universities in Cambodia:{" "}
          <span className="text-amber-600">Where to Apply</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-blue-900">
          សាកលវិទ្យាល័យនៅកម្ពុជា៖{" "}
          <span className="text-amber-600">កន្លែងដែលត្រូវដាក់ពាក្យ</span>
        </h2>

        {/* Section intro — bilingual */}
        <div className="space-y-2 max-w-3xl rounded-xl border-l-4 border-l-amber-500 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <p className="text-slate-800 text-base leading-relaxed">
            Finding the right scholarship starts with choosing the right university. Here are the top national institutions in Cambodia and what they are famous for teaching.
          </p>
          <p className="text-slate-800 text-base font-khmer leading-loose">
            ការស្វែងរកអាហារូបករណ៍ត្រឹមត្រូវចាប់ផ្ដើមដោយការជ្រើសរើសសាកលវិទ្យាល័យត្រឹមត្រូវ។ នេះគឺជាស្ថាប័នជាតិកំពូលនៅកម្ពុជា និងអ្វីដែលពួកគេល្បីល្បាញក្នុងការបង្រៀន។
          </p>
        </div>
      </header>

      {/* The University Grid */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SubHeading
          en="The University Grid"
          kh="ក្រឡាចត្រង្គសាកលវិទ្យាល័យ"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {UNIVERSITIES.map((u, idx) => (
            <UniversityCard key={u.id} u={u} cardNo={String(idx + 1).padStart(2, "0")} />
          ))}
        </div>
      </section>

      {/* Footer note — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-flex flex-col gap-1 rounded-2xl border border-amber-400/60 bg-white/85 backdrop-blur-sm px-6 py-4 text-blue-950 shadow-lg max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              <strong>Tip:</strong> Click the buttons on each card to visit the university's official website or Facebook page.
            </span>
          </p>
          <p className="flex items-center justify-center gap-2 text-sm font-khmer leading-loose">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              <strong>គន្លឹះ ៖</strong> ចុចលើប៊ូតុងនៅលើកាតនីមួយៗដើម្បីចូលមើលគេហទំព័រផ្លូវការ ឬទំព័រ Facebook របស់សាកលវិទ្យាល័យ។
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default UniversitiesPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — aspirational: pale sky → academic blue with subtle dot grid
// ════════════════════════════════════════════════════════════════════════════

function AspirationalBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eff6ff 35%, #dbeafe 70%, #eff6ff 100%)",
        }}
      />
      {/* Faint dot grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="uni-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.7" fill="#1e3a8a" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#uni-dots)" />
      </svg>
      {/* Soft gold sunburst top-right */}
      <div
        className="absolute -top-20 -right-20 w-[36rem] h-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(252, 211, 77, 0.18) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════════════════════

function SubHeading({ en, kh }: { en: string; kh: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 flex-wrap">
      <h2 className="font-display font-bold text-xl sm:text-2xl text-blue-950 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-amber-600" aria-hidden="true" />
        {en}
      </h2>
      <h3 className="font-khmer font-bold text-lg sm:text-xl text-blue-900 leading-loose">
        {kh}
      </h3>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  University Card
// ════════════════════════════════════════════════════════════════════════════

function UniversityCard({ u, cardNo }: { u: University; cardNo: string }) {
  const Icon = u.Icon;
  return (
    <article
      id={`uni-${u.id}`}
      data-testid={`uni-card-${u.id}`}
      className="relative rounded-2xl bg-white border border-blue-200 shadow-lg overflow-hidden flex flex-col hover-elevate transition-shadow scroll-mt-24"
    >
      {/* Gold side bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${u.accent.bar}`} />

      {/* Deep academic blue header */}
      <header
        className="px-5 pt-5 pb-3 pl-6 border-b border-amber-300/70"
        style={{
          background:
            "linear-gradient(135deg, #0c1e3a 0%, #1e3a8a 100%)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl ${u.accent.chip} border-2 flex items-center justify-center shadow-md`}
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · {cardNo}</span>
              <span className="opacity-50">/</span>
              <span>Public University</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-90">សាកលវិទ្យាល័យសាធារណៈ</span>
            </div>
            <div className="font-display font-extrabold text-2xl text-amber-300 leading-none">
              {u.acronym}
            </div>
            <h3 className="mt-1 font-bold text-base text-white leading-snug">
              {u.nameEn}
            </h3>
            <h4 className="font-khmer text-sm text-amber-100 leading-loose">
              {u.nameKh}
            </h4>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-5 py-4 pl-6 flex flex-col gap-3 flex-1">
        {/* Focus pill */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 flex flex-wrap gap-x-2">
            <span>Focus</span>
            <span className="font-khmer normal-case tracking-normal text-[0.7rem]">ការផ្ដោត</span>
          </div>
          <div className={`inline-block rounded-md border px-2.5 py-1 text-xs font-bold ${u.accent.badge}`}>
            {u.focusEn}
          </div>
          <div className={`mt-1.5 inline-block rounded-md border px-2.5 py-1 text-xs font-khmer leading-loose ${u.accent.badge}`}>
            {u.focusKh}
          </div>
        </div>

        {/* Detail — strictly bilingual */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1 flex flex-wrap gap-x-2">
            <span>Why study here?</span>
            <span className="font-khmer normal-case tracking-normal text-[0.7rem]">ហេតុអ្វីសិក្សានៅទីនេះ?</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-800">{u.detailEn}</p>
          <p className="text-sm font-khmer leading-loose text-slate-800 mt-1">{u.detailKh}</p>
        </div>

        {/* External link buttons */}
        <div className="mt-auto pt-2 border-t border-slate-100">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 flex flex-wrap gap-x-2">
            <span>Visit</span>
            <span className="font-khmer normal-case tracking-normal text-[0.7rem]">ចូលមើល</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={u.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 transition-colors shadow-sm"
              data-testid={`uni-${u.id}-website`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Official Website</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
            {u.facebook && (
              <a
                href={u.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-white border border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1.5 transition-colors shadow-sm"
                data-testid={`uni-${u.id}-facebook`}
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
