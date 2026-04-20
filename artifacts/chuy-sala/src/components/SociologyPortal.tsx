import { useState } from "react";
import { Users, ScrollText, Layers, Building2, Stethoscope, Eye, EyeOff, Sparkles } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

interface Concept {
  key: string;
  Icon: typeof Users;
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  accent: string; // tailwind background classes for the icon tile
}

const CONCEPTS: Concept[] = [
  {
    key: "norms",
    Icon: ScrollText,
    nameEn: "Social Norms",
    nameKh: "បទដ្ឋានសង្គម",
    descEn: "The unwritten rules of how we are supposed to act.",
    descKh: "ច្បាប់ដែលមិនបានសរសេរអំពីរបៀបដែលយើងគួរប្រព្រឹត្ត។",
    accent: "from-amber-300 to-orange-500 text-orange-900",
  },
  {
    key: "class",
    Icon: Layers,
    nameEn: "Social Class",
    nameKh: "វណ្ណៈសង្គម",
    descEn: "How wealth and power divide groups in society.",
    descKh: "របៀបដែលទ្រព្យសម្បត្តិ និងអំណាចបែងចែកក្រុមនានាក្នុងសង្គម។",
    accent: "from-rose-300 to-red-500 text-red-50",
  },
  {
    key: "institutions",
    Icon: Building2,
    nameEn: "Institutions",
    nameKh: "ស្ថាប័ន",
    descEn: "Large systems like education and government that organize society.",
    descKh: "ប្រព័ន្ធធំៗដូចជាការអប់រំ និងរដ្ឋាភិបាល ដែលរៀបចំសង្គម។",
    accent: "from-sky-300 to-indigo-600 text-indigo-50",
  },
];

interface VeblenItem {
  key: string;
  emoji: string;
  nameEn: string;
  nameKh: string;
  utilityEn: string;
  utilityKh: string;
  statusEn: string;
  statusKh: string;
}

const VEBLEN_ITEMS: VeblenItem[] = [
  {
    key: "moto",
    emoji: "🛵",
    nameEn: "Basic motorcycle",
    nameKh: "ម៉ូតូធម្មតា",
    utilityEn: "Transports you to school, the market, or work — getting from A to B.",
    utilityKh: "ដឹកអ្នកទៅសាលា ផ្សារ ឬកន្លែងធ្វើការ — ពី A ទៅ B។",
    statusEn:
      "A bigger, branded motorcycle (like a Harley) is bought to signal that the owner can afford far more than basic transport.",
    statusKh:
      "ម៉ូតូធំៗមានម៉ាក (ដូចជា Harley) ត្រូវបានទិញ ដើម្បីបង្ហាញថាម្ចាស់មានប្រាក់ច្រើនជាងការដឹកជញ្ជូនធម្មតា។",
  },
  {
    key: "phone",
    emoji: "📱",
    nameEn: "Luxury smartphone",
    nameKh: "ស្មាតហ្វូនថ្លៃៗ",
    utilityEn: "Lets you call your family, send messages, take photos, and use the internet.",
    utilityKh: "ឱ្យអ្នកហៅគ្រួសារ ផ្ញើសារ ថតរូប និងប្រើអ៊ីនធឺណិត។",
    statusEn:
      "A $1,500 phone does the same calls as a $200 phone — but holding it tells everyone around you that you have money to spend on the newest brand.",
    statusKh:
      "ទូរស័ព្ទតម្លៃ $1,500 ហៅទូរស័ព្ទដូចគ្នានឹងទូរស័ព្ទ $200 ប៉ុន្តែការកាន់វាប្រាប់អ្នកនៅជុំវិញថា អ្នកមានប្រាក់ទិញម៉ាកថ្មីបំផុត។",
  },
  {
    key: "coffee",
    emoji: "☕",
    nameEn: "Branded coffee cup",
    nameKh: "ពែងកាហ្វេមានម៉ាក",
    utilityEn: "Holds hot coffee that wakes you up and warms your hands.",
    utilityKh: "ដាក់កាហ្វេក្តៅដែលដាស់អ្នក និងកម្តៅដៃរបស់អ្នក។",
    statusEn:
      "Walking around with a famous-brand cup says, 'I can spend $5 on a drink', even though local coffee tastes just as good for a fraction of the price.",
    statusKh:
      "ការដើរជាមួយពែងម៉ាកល្បីៗ និយាយថា «ខ្ញុំអាចចំណាយ $5 លើភេសជ្ជៈ» ទោះបីកាហ្វេក្នុងស្រុកឆ្ងាញ់ដូចគ្នា ក្នុងតម្លៃតិចជាងច្រើនក៏ដោយ។",
  },
];

export function SociologyPortal() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [statusMode, setStatusMode] = useState(false);

  return (
    <section
      aria-labelledby="sociology-portal-title"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <style>{`
        @keyframes soc-lens-flip {
          0%   { opacity: 0; transform: translateY(8px) scale(0.98); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0)   scale(1);    filter: blur(0); }
        }
        .soc-lens-in { animation: soc-lens-flip 0.45s cubic-bezier(.2,.9,.3,1.05) both; }

        @keyframes soc-card-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .soc-card-up { animation: soc-card-up 0.45s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .soc-lens-in, .soc-card-up { animation: none !important; }
        }
      `}</style>

      <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 border border-orange-200 p-6 sm:p-10 shadow-[0_20px_60px_-20px_rgba(120,53,15,0.25)]">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-200/70 text-orange-900 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Users className="w-3.5 h-3.5" />
            {t("Study Center", "មជ្ឈមណ្ឌលសិក្សា")}
          </div>
          <h2
            id="sociology-portal-title"
            className={`mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 ${kh ? "font-khmer leading-snug" : "font-display"}`}
          >
            {kh ? "សង្គមវិទ្យា" : "Sociology"}
            {!kh && <span className="block text-base sm:text-lg font-medium text-orange-700 mt-2 tracking-wide">The Science of Society</span>}
            {kh && <span className="block text-sm font-sans font-normal text-orange-700 mt-2">(Sociology: The Science of Society)</span>}
          </h2>
        </header>

        {/* PART 1 — What is sociology? */}
        <article className="soc-card-up mb-10 rounded-2xl bg-white border-l-[6px] border-orange-500 p-5 sm:p-7 shadow-md">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-2xl shadow-md">
              👥
            </div>
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}>
                {t("What is Sociology?", "តើអ្វីទៅជាសង្គមវិទ្យា?")}
              </h3>
              <p className={`mt-2 text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Sociology is the study of how human groups behave. It looks at the invisible structures that shape our lives: family, school, religion, and the economy.",
                  "សង្គមវិទ្យាគឺជាការសិក្សាអំពីរបៀបដែលក្រុមមនុស្សមានឥរិយាបថ។ វាមើលទៅលើរចនាសម្ព័ន្ធដែលមើលមិនឃើញ ដែលបង្កើតជីវិតរបស់យើង៖ គ្រួសារ សាលា សាសនា និងសេដ្ឋកិច្ច។"
                )}
              </p>
            </div>
          </div>
        </article>

        {/* PART 2 — 3 core concepts */}
        <div className="mb-12">
          <h3 className={`text-lg sm:text-xl font-bold text-slate-900 mb-4 ${kh ? "font-khmer" : ""}`}>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              {t("What Students Should Know", "គោលគំនិតសំខាន់ៗ")}
            </span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {CONCEPTS.map((c, i) => (
              <div
                key={c.key}
                className="soc-card-up rounded-2xl bg-white border border-orange-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.accent} flex items-center justify-center shadow-md mb-3`}>
                  <c.Icon className="w-6 h-6" strokeWidth={2.4} />
                </div>
                <h4 className={`text-base sm:text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
                  {kh ? c.nameKh : c.nameEn}
                </h4>
                <p className={`mt-0.5 text-xs ${kh ? "text-slate-500" : "font-khmer text-slate-500"}`}>
                  {kh ? c.nameEn : c.nameKh}
                </p>
                <p className={`mt-2 text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? c.descKh : c.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3 — Veblen Spotlight */}
        <article className="mb-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-amber-50 border-2 border-amber-400/40 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative spotlight glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

          <header className="relative flex items-start gap-4 mb-5">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 border-2 border-amber-200/50 flex items-center justify-center text-3xl shadow-lg">
              🎩
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-300/80">
                {t("Sociologist Spotlight", "ការផ្តោតលើអ្នកសង្គមវិទ្យា")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-amber-100">
                Thorstein Veblen
              </h3>
              <p className={`text-sm text-amber-200/80 mt-1 ${kh ? "font-khmer" : "italic"}`}>
                {t("Conspicuous Consumption", "ការប្រើប្រាស់បង្ហាញឈ្មោះ")}
              </p>
            </div>
          </header>

          <p className={`relative text-amber-50/85 leading-relaxed mb-6 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Veblen argued that wealthy people don't just buy things to use them — they buy them to be seen owning them. Toggle the lens below to switch between an item's everyday use and the hidden social signal it sends.",
              "Veblen បានអះអាងថាមនុស្សមានទ្រព្យមិនមែនទិញរបស់គ្រាន់តែប្រើប៉ុណ្ណោះទេ — ពួកគេទិញវាដើម្បីឲ្យគេឃើញថាខ្លួនជាម្ចាស់។ បិទបើកកែវយឹតខាងក្រោម ដើម្បីប្តូររវាងការប្រើប្រាស់ប្រចាំថ្ងៃ និងសញ្ញាសង្គមដែលលាក់នៅពីក្រោយ។"
            )}
          </p>

          {/* Lens toggle */}
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 mb-6 bg-slate-800/60 border border-amber-300/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-amber-200">
              {statusMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              <span className={`font-bold ${kh ? "font-khmer" : ""}`}>
                {t("Veblen Lens", "កែវយឹត Veblen")}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <span
                className={`text-xs sm:text-sm font-semibold transition-colors ${
                  statusMode ? "text-amber-100/40" : "text-amber-200"
                } ${kh ? "font-khmer" : ""}`}
              >
                {t("Off · Utility", "បិទ · ការប្រើប្រាស់")}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={statusMode}
                aria-label={t("Toggle Veblen lens between utility and status symbol", "បិទបើកកែវយឹត Veblen រវាងការប្រើប្រាស់ និងសញ្ញាសម្គាល់សង្គម")}
                onClick={() => setStatusMode((s) => !s)}
                className={`relative w-16 h-9 rounded-full border-2 transition-colors duration-300 ${
                  statusMode
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-300"
                    : "bg-slate-700 border-slate-500"
                }`}
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center text-xs ${
                    statusMode ? "left-[calc(100%-1.75rem)]" : "left-1"
                  }`}
                >
                  {statusMode ? "💎" : "🔧"}
                </span>
              </button>
              <span
                className={`text-xs sm:text-sm font-semibold transition-colors ${
                  statusMode ? "text-amber-200" : "text-amber-100/40"
                } ${kh ? "font-khmer" : ""}`}
              >
                {t("On · Status Symbol", "បើក · សញ្ញាសម្គាល់ឋានៈ")}
              </span>
            </div>
          </div>

          {/* Three items */}
          <div className="relative grid sm:grid-cols-3 gap-4">
            {VEBLEN_ITEMS.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl bg-slate-800/70 border border-amber-300/20 p-4 backdrop-blur-sm"
              >
                <div className="text-6xl text-center mb-2 drop-shadow-lg">{item.emoji}</div>
                <h4 className={`text-center text-base font-bold text-amber-100 ${kh ? "font-khmer" : ""}`}>
                  {kh ? item.nameKh : item.nameEn}
                </h4>
                <p className={`text-center text-[11px] mt-0.5 ${kh ? "text-amber-200/40" : "font-khmer text-amber-200/45"}`}>
                  {kh ? item.nameEn : item.nameKh}
                </p>
                <div
                  key={`${item.key}-${statusMode ? "status" : "utility"}`}
                  className={`soc-lens-in mt-3 rounded-xl p-3 border-l-4 ${
                    statusMode
                      ? "bg-amber-400/15 border-amber-400 text-amber-100"
                      : "bg-sky-400/10 border-sky-400 text-sky-100"
                  }`}
                >
                  <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${
                    statusMode ? "text-amber-300" : "text-sky-300"
                  } ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {statusMode
                      ? t("Status Signal", "សញ្ញាសង្គម")
                      : t("Everyday Utility", "ការប្រើប្រាស់ប្រចាំថ្ងៃ")}
                  </div>
                  <p className={`text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {statusMode
                      ? (kh ? item.statusKh : item.statusEn)
                      : (kh ? item.utilityKh : item.utilityEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* PART 4 — What is sociology used for? */}
        <article className="soc-card-up rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-amber-50 p-6 sm:p-8 shadow-xl border border-indigo-700">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold ${kh ? "font-khmer" : "font-display"}`}>
                {t("What is Sociology Used For?", "ការអនុវត្តជាក់ស្តែង")}
              </h3>
              <p className={`mt-2 text-amber-100/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Sociologists act as doctors for society. They use data to solve real-world problems like poverty, urban traffic, and educational inequality. If you want to improve Cambodia, you must first understand how its society is structured.",
                  "អ្នកសង្គមវិទ្យាដើរតួជាគ្រូពេទ្យសម្រាប់សង្គម។ ពួកគេប្រើទិន្នន័យដើម្បីដោះស្រាយបញ្ហាជាក់ស្តែងដូចជាភាពក្រីក្រ ការកកស្ទះចរាចរក្នុងទីក្រុង និងវិសមភាពអប់រំ។ បើអ្នកចង់កែលម្អកម្ពុជា អ្នកត្រូវយល់ជាមុនអំពីរបៀបដែលសង្គមរបស់វាត្រូវបានរៀបចំ។"
                )}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
