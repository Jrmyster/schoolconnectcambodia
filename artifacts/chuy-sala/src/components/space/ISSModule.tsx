import {
  Wrench, Globe2, FlaskConical, Sunrise, Moon as MoonIcon,
  Users, Rocket, DollarSign, CalendarDays, Gauge, Bed,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

function PanelHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-slate-300/15 border border-slate-300/40 flex items-center justify-center text-slate-100">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/75 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ── Reusable ISS SVG (fully assembled) ───────────────────────────────────

function ISSDiagram({ lang, idPrefix }: { lang: Lang; idPrefix: string }) {
  const isKh = lang === "kh";

  // 4 pairs of solar wings, large central truss, pressurized modules
  const wingsX = [-180, -110, 110, 180];

  return (
    <svg
      viewBox="-260 -120 520 240"
      className="w-full h-auto"
      aria-label={isKh ? "ស្ថានីយអវកាសអន្តរជាតិ ដែលប្រកបស្ទើរ ដោយផ្ទាំងពន្លឺព្រះអាទិត្យ និងម៉ូឌុលលំនៅ" : "Fully assembled International Space Station with solar arrays and pressurised modules"}
    >
      <defs>
        {/* Solar panel gradient */}
        <linearGradient id={`${idPrefix}-solar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0c1d4a" />
        </linearGradient>
        {/* Truss metallic gradient */}
        <linearGradient id={`${idPrefix}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        {/* Module body gradient */}
        <linearGradient id={`${idPrefix}-mod`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        {/* Earth glow under */}
        <radialGradient id={`${idPrefix}-earthglow`} cx="0.5" cy="1" r="0.6">
          <stop offset="0%"  stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Earth glow */}
      <rect x="-260" y="80" width="520" height="40" fill={`url(#${idPrefix}-earthglow)`} />

      {/* Main truss (long horizontal beam) */}
      <rect x="-220" y="-4" width="440" height="8" fill={`url(#${idPrefix}-metal)`} stroke="#1e293b" strokeWidth="0.5" />
      {/* Truss diagonal cross-bracing */}
      <g stroke="#475569" strokeWidth="0.5" opacity="0.7">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = -220 + i * 20;
          return <line key={i} x1={x} y1="-4" x2={x + 10} y2="4" />;
        })}
      </g>

      {/* Solar arrays — 4 pairs, each with 2 wings (top + bottom) */}
      {wingsX.map((x, i) => (
        <g key={i}>
          {/* connecting boom */}
          <line x1={x} y1="-4" x2={x} y2="-22" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={x} y1="4"  x2={x} y2="22"  stroke="#94a3b8" strokeWidth="1.5" />
          {/* top wing */}
          <rect x={x - 50} y="-58" width="100" height="36" fill={`url(#${idPrefix}-solar)`} stroke="#1e293b" strokeWidth="0.5" />
          {/* cell grid */}
          {Array.from({ length: 9 }).map((_, c) => (
            <line key={c} x1={x - 50 + c * 12.5} y1="-58" x2={x - 50 + c * 12.5} y2="-22" stroke="#0c1d4a" strokeWidth="0.4" opacity="0.6" />
          ))}
          {Array.from({ length: 3 }).map((_, r) => (
            <line key={r} x1={x - 50} y1={-58 + (r + 1) * 9} x2={x + 50} y2={-58 + (r + 1) * 9} stroke="#0c1d4a" strokeWidth="0.4" opacity="0.6" />
          ))}
          {/* bottom wing */}
          <rect x={x - 50} y="22" width="100" height="36" fill={`url(#${idPrefix}-solar)`} stroke="#1e293b" strokeWidth="0.5" />
          {Array.from({ length: 9 }).map((_, c) => (
            <line key={c} x1={x - 50 + c * 12.5} y1="22" x2={x - 50 + c * 12.5} y2="58" stroke="#0c1d4a" strokeWidth="0.4" opacity="0.6" />
          ))}
          {Array.from({ length: 3 }).map((_, r) => (
            <line key={r} x1={x - 50} y1={22 + (r + 1) * 9} x2={x + 50} y2={22 + (r + 1) * 9} stroke="#0c1d4a" strokeWidth="0.4" opacity="0.6" />
          ))}
        </g>
      ))}

      {/* Central pressurized modules — cluster around center */}
      <g>
        {/* Main longitudinal module */}
        <rect x="-55" y="-14" width="110" height="28" rx="6" fill={`url(#${idPrefix}-mod)`} stroke="#334155" strokeWidth="0.6" />
        {/* End caps */}
        <ellipse cx="-55" cy="0" rx="4" ry="14" fill="#94a3b8" />
        <ellipse cx="55"  cy="0" rx="4" ry="14" fill="#94a3b8" />
        {/* Side module (perpendicular) */}
        <rect x="-12" y="-40" width="24" height="32" rx="4" fill={`url(#${idPrefix}-mod)`} stroke="#334155" strokeWidth="0.6" />
        <rect x="-12" y="8"   width="24" height="32" rx="4" fill={`url(#${idPrefix}-mod)`} stroke="#334155" strokeWidth="0.6" />
        {/* Small portholes */}
        <circle cx="-30" cy="0" r="2" fill="#0ea5e9" stroke="#1e293b" strokeWidth="0.4" />
        <circle cx="-15" cy="0" r="2" fill="#0ea5e9" stroke="#1e293b" strokeWidth="0.4" />
        <circle cx="0"   cy="0" r="2" fill="#0ea5e9" stroke="#1e293b" strokeWidth="0.4" />
        <circle cx="15"  cy="0" r="2" fill="#0ea5e9" stroke="#1e293b" strokeWidth="0.4" />
        <circle cx="30"  cy="0" r="2" fill="#0ea5e9" stroke="#1e293b" strokeWidth="0.4" />
        {/* Small radiator panels */}
        <rect x="60"  y="-8" width="22" height="6"  fill="#e2e8f0" stroke="#475569" strokeWidth="0.4" />
        <rect x="60"  y="2"  width="22" height="6"  fill="#e2e8f0" stroke="#475569" strokeWidth="0.4" />
        <rect x="-82" y="-8" width="22" height="6"  fill="#e2e8f0" stroke="#475569" strokeWidth="0.4" />
        <rect x="-82" y="2"  width="22" height="6"  fill="#e2e8f0" stroke="#475569" strokeWidth="0.4" />
        {/* Cupola dome (Earth-viewing window) */}
        <circle cx="0" cy="42" r="6" fill="#0ea5e9" stroke="#cbd5e1" strokeWidth="1" />
      </g>

      {/* Stars in background */}
      {[[-240,-100],[-180,-90],[-130,-105],[-50,-100],[60,-90],[150,-105],[220,-95],[-220,100],[-100,110],[80,105],[200,100],[240,-50]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.5" />
      ))}
    </svg>
  );
}

// ── 1. Pinnacle of Engineering ────────────────────────────────────────────

function EngineeringPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const stats = [
    { Icon: CalendarDays, en: "Construction began", kh: "ការសាងសង់ ចាប់ផ្តើម", val: isKh ? "១៩៩៨" : "1998" },
    { Icon: Wrench,       en: "Years to assemble in orbit", kh: "ឆ្នាំ ប្រកបក្នុងគន្លង", val: isKh ? "១០+" : "10+" },
    { Icon: DollarSign,   en: "Total cost (USD)", kh: "ថ្លៃដើមសរុប (ដុល្លារ)", val: isKh ? "១៥០+ ប៊ីលាន" : "$150B+" },
    { Icon: Rocket,       en: "Major launches required", kh: "ការបាញ់បង្ហោះធំៗ ត្រូវការ", val: isKh ? "៤០+" : "40+" },
  ];

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#020617] via-[#0b1a3a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Wrench className="w-4 h-4" />}
        en="The Pinnacle of Human Engineering"
        kh="កំពូលនៃវិស្វកម្មមនុស្ស"
        lang={lang}
        descEn="The International Space Station (ISS) is the largest, most complex, and most expensive single object humans have ever built — costing well over $150 billion. Construction began in 1998, but it could not be built on Earth. It was simply too big. Instead, it was launched into orbit piece by piece, on more than 40 separate rockets, over more than 10 years. Astronauts and robotic arms snapped each module together while the station was already moving at 28,000 km/h, 400 km above the planet. Today it is the size of a football field, with pressurised rooms big enough to walk through — a city in the sky, hand-built in space."
        descKh="ស្ថានីយអវកាសអន្តរជាតិ (ISS) ជាវត្ថុដែលធំជាងគេ ស្មុគស្មាញជាងគេ និងថ្លៃជាងគេ ដែលមនុស្សជាតិ ធ្លាប់សាងសង់ — តម្លៃលើសពី ១៥០ ប៊ីលានដុល្លារ។ ការសាងសង់ ចាប់ផ្តើម ក្នុងឆ្នាំ ១៩៩៨ ប៉ុន្តែ វាមិនអាចត្រូវបានសាងសង់នៅលើផែនដីទេ។ វាធំពេក។ ផ្ទុយទៅវិញ វាត្រូវបានបាញ់បង្ហោះទៅគន្លង មួយបំណែកម្តងៗ លើរ៉ុកកែតផ្សេងៗគ្នាជាង ៤០ គ្រឿង ក្នុងរយៈពេលជាង ១០ ឆ្នាំ។ អវកាសយានិក និងដៃមនុស្សយន្ត បានប្រកបម៉ូឌុលនីមួយៗ ខណៈដែលស្ថានីយ កំពុងធ្វើដំណើរ ដោយល្បឿន ២៨,០០០ គម/ម៉ោង រួចហើយ នៅលើផែនដី ៤០០ គម។ សព្វថ្ងៃ វាមានទំហំស្មើនឹងទីលានបាល់ទាត់ ជាមួយបន្ទប់សម្ពាធ ធំល្មមដើរបាន — ជាទីក្រុងមួយ លើមេឃ ដែលធ្វើដោយដៃ នៅក្នុងអវកាស។"
      />

      {/* ISS diagram */}
      <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5 mb-4" data-testid="iss-diagram">
        <h4 className={`text-sm font-bold text-slate-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ISS — ប្រកបពេញលេញ ក្នុងគន្លង" : "The ISS — fully assembled in orbit"}
        </h4>
        <ISSDiagram lang={lang} idPrefix="diag" />
        <div className="grid grid-cols-3 gap-3 mt-3 text-[10px]">
          <div className="text-center">
            <div className="w-3 h-3 mx-auto rounded bg-blue-700 mb-1" />
            <span className={`text-slate-300 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ផ្ទាំងពន្លឺព្រះអាទិត្យ" : "Solar arrays"}</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 mx-auto rounded bg-slate-300 mb-1" />
            <span className={`text-slate-300 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ផ្នែកដែកកណ្តាល" : "Central truss"}</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 mx-auto rounded bg-slate-100 border border-slate-400 mb-1" />
            <span className={`text-slate-300 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ម៉ូឌុលលំនៅសម្ពាធ" : "Pressurised modules"}</span>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="iss-stats">
        {stats.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div key={i} className="rounded-xl border border-slate-300/25 bg-black/40 p-3 text-center">
              <Icon className="w-5 h-5 mx-auto text-sky-300 mb-1" />
              <div className={`text-base font-bold text-white font-mono ${isKh ? "font-khmer" : ""}`}>{s.val}</div>
              <div className={`text-[10px] text-slate-300 mt-1 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}>
                {isKh ? s.kh : s.en}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 2. Symbol of Global Unity ─────────────────────────────────────────────

function UnityPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const partners = [
    { en: "USA",    kh: "សហរដ្ឋអាមេរិក", flag: "🇺🇸" },
    { en: "Russia", kh: "រុស្ស៊ី",        flag: "🇷🇺" },
    { en: "Japan",  kh: "ជប៉ុន",          flag: "🇯🇵" },
    { en: "Canada", kh: "កាណាដា",         flag: "🇨🇦" },
    { en: "ESA (Europe — 11 nations)", kh: "ESA (អឺរ៉ុប — ១១ ប្រទេស)", flag: "🇪🇺" },
  ];

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#020617] via-[#0b1a3a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Globe2 className="w-4 h-4" />}
        en="A Symbol of Global Unity"
        kh="និមិត្តសញ្ញានៃសាមគ្គីភាពពិភពលោក"
        lang={lang}
        descEn="The ISS is a joint project between 15 nations, led by 5 space agencies — NASA (USA), Roscosmos (Russia), JAXA (Japan), CSA (Canada), and ESA (Europe). It carries a powerful message: even when nations have political conflicts on Earth, their scientists, engineers, and astronauts work side-by-side, peacefully, in space — for the advancement of all humanity. It is the most successful international peacetime collaboration in modern history."
        descKh="ស្ថានីយ ISS ជាគម្រោងរួម រវាង ១៥ ប្រទេស ដឹកនាំដោយ ៥ ទីភ្នាក់ងារអវកាស — NASA (សហរដ្ឋអាមេរិក) Roscosmos (រុស្ស៊ី) JAXA (ជប៉ុន) CSA (កាណាដា) និង ESA (អឺរ៉ុប)។ វាបញ្ជូនសារដ៏មានឥទ្ធិពល៖ សូម្បីតែ ពេលប្រទេសនានា មានជម្លោះនយោបាយ នៅលើផែនដី អ្នកវិទ្យាសាស្ត្រ វិស្វករ និងអវកាសយានិករបស់ពួកគេ ក៏នៅធ្វើការ ចំហៀងគ្នា ដោយសន្តិភាព នៅក្នុងអវកាស — ដើម្បីការរីកចម្រើន របស់មនុស្សជាតិទាំងមូល។ វាជាកិច្ចសហប្រតិបត្តិការ អន្តរជាតិពេលសន្តិភាព ដែលជោគជ័យបំផុត ក្នុងប្រវត្តិសាស្ត្រសម័យទំនើប។"
      />

      <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="iss-partners">
        <h4 className={`text-sm font-bold text-slate-100 mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ដៃគូ — ៥ ទីភ្នាក់ងារ ១៥ ប្រទេស" : "Partners — 5 agencies, 15 nations"}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {partners.map((p, i) => (
            <div key={i} className="rounded-xl border border-slate-300/20 bg-slate-900/50 p-3 flex flex-col items-center text-center">
              <div className="text-2xl mb-1" aria-hidden>{p.flag}</div>
              <div className={`text-xs font-semibold text-white ${isKh ? "font-khmer leading-snug" : ""}`}>
                {isKh ? p.kh : p.en}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-md bg-sky-500/10 border border-sky-300/20 p-3">
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-sky-300 mt-0.5 flex-shrink-0" />
            <p className={`text-xs text-sky-100/85 leading-relaxed italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh
                ? "« នៅខាងលើមេឃ យើងគ្មានព្រំដែនទេ — យើងមានតែផែនដី តែមួយ មើលឃើញពីបង្អួចតែមួយ »"
                : "“Above the sky there are no borders — only one Earth, seen through one window.”"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Microgravity Laboratory ────────────────────────────────────────────

function MicrogravityPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const experiments = [
    {
      Icon: FlaskConical,
      en: "Perfect protein crystals",
      kh: "គ្រីស្តាល់ប្រូតេអ៊ីន ល្អឥតខ្ចោះ",
      bodyEn: "Without gravity to distort them, protein crystals grow into perfect shapes — helping scientists design new medicines for cancer, diabetes, and rare diseases.",
      bodyKh: "ដោយគ្មានកម្លាំងទំនាញ ធ្វើឱ្យពួកវាបង្ខូចទ្រង់ទ្រាយ គ្រីស្តាល់ប្រូតេអ៊ីន លូតលាស់ ជាទម្រង់ល្អឥតខ្ចោះ — ជួយអ្នកវិទ្យាសាស្ត្រ ឱ្យរចនាថ្នាំថ្មីៗ សម្រាប់ជំងឺមហារីក ទឹកនោមផ្អែម និងជំងឺកម្រនានា។",
    },
    {
      Icon: Users,
      en: "How muscles weaken",
      kh: "របៀបដែលសាច់ដុំចុះខ្សោយ",
      bodyEn: "When astronauts float, their muscles and bones lose strength fast — sometimes 1% per month. Studying this in space teaches doctors how to treat the same problems in elderly patients on Earth.",
      bodyKh: "នៅពេលអវកាសយានិកអណ្តែត សាច់ដុំ និងឆ្អឹងរបស់ពួកគេ បាត់បង់កម្លាំងយ៉ាងលឿន — ខ្លះ ១% ក្នុងមួយខែ។ ការសិក្សារឿងនេះ នៅក្នុងអវកាស បង្រៀនវេជ្ជបណ្ឌិត អំពីរបៀបព្យាបាល បញ្ហាដូចគ្នា ចំពោះអ្នកជំងឺវ័យចាស់ នៅលើផែនដី។",
    },
    {
      Icon: Rocket,
      en: "Life support of the future",
      kh: "ប្រព័ន្ធទ្រទ្រង់ជីវិត នៃអនាគត",
      bodyEn: "The ISS recycles 98% of its water — sweat, breath, and even urine become drinking water again. Lessons here will keep future astronauts alive on the long journey to Mars.",
      bodyKh: "ស្ថានីយ ISS កែច្នៃទឹកឡើងវិញបាន ៩៨% — ញើស ខ្យល់ដង្ហើម និងសូម្បីតែទឹកនោម ក្លាយជាទឹកផឹកវិញ។ មេរៀននៅទីនេះ នឹងថែរក្សាជីវិត អវកាសយានិកនាពេលអនាគត លើដំណើរវែងឆ្ងាយ ទៅភពអង្គារ។",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#020617] via-[#0b1a3a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<FlaskConical className="w-4 h-4" />}
        en="The Microgravity Laboratory"
        kh="មន្ទីរពិសោធន៍គ្មានកម្លាំងទំនាញ"
        lang={lang}
        descEn="The whole point of the ISS is science. In orbit, everything floats — the station is in continuous free-fall around the Earth. This near-weightlessness, called microgravity, lets scientists do experiments that would be impossible on the ground. More than 3,000 experiments have been run on board, in fields from medicine and biology to materials science and farming."
        descKh="ហេតុផលសំខាន់នៃស្ថានីយ ISS គឺវិទ្យាសាស្ត្រ។ នៅក្នុងគន្លង គ្រប់របស់សុទ្ធតែអណ្តែត — ស្ថានីយ កំពុងធ្លាក់ដោយសេរី ជុំវិញផែនដី គ្មានឈប់។ ភាពស្ទើរគ្មានទម្ងន់នេះ ហៅថា មីក្រូកម្លាំងទំនាញ ឱ្យអ្នកវិទ្យាសាស្ត្រ ធ្វើការពិសោធន៍ ដែលមិនអាចធ្វើបាន នៅលើដី។ ការពិសោធន៍ច្រើនជាង ៣,០០០ បានធ្វើនៅក្នុងស្ថានីយ ក្នុងវិស័យ ចាប់ពីវេជ្ជសាស្ត្រ និងជីវវិទ្យា ដល់វិទ្យាសាស្ត្រសម្ភារៈ និងកសិកម្ម។"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="microgravity-experiments">
        {experiments.map((e, i) => {
          const Icon = e.Icon;
          return (
            <div key={i} className="rounded-2xl border border-slate-300/25 bg-black/40 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-sky-400/15 border border-sky-300/30 flex items-center justify-center text-sky-200 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-bold text-slate-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? e.kh : e.en}
                </h4>
              </div>
              <p className={`text-xs text-white/75 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? e.bodyKh : e.bodyEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4. Life at 28,000 km/h ────────────────────────────────────────────────

function LifePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#020617] via-[#0b1a3a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Gauge className="w-4 h-4" />}
        en="Life at 28,000 km/h"
        kh="ជីវិតក្នុងល្បឿន ២៨,០០០ គីឡូម៉ែត្រក្នុងមួយម៉ោង"
        lang={lang}
        descEn="The ISS races around the Earth at 28,000 km/h — fast enough to fly from Phnom Penh to Paris in about 22 minutes. It completes one full orbit every 90 minutes. Up there, day and night come and go all the time, gravity has no grip, and everything you don't tie down floats away."
        descKh="ស្ថានីយ ISS ហោះជុំវិញផែនដី ដោយល្បឿន ២៨,០០០ គម/ម៉ោង — លឿនល្មម ដើម្បីហោះពីភ្នំពេញ ទៅប៉ារីស ត្រឹមតែ ២២ នាទី។ វាបញ្ចប់គន្លងមួយជុំ រាល់ ៩០ នាទី។ នៅទីនោះ ថ្ងៃ និងយប់ មកនិងទៅរហូត កម្លាំងទំនាញគ្មានប្រសិទ្ធភាព ហើយអ្វីដែលអ្នកមិនចង វានឹងអណ្តែតបាត់។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 16 sunrises */}
        <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="sunrises-fact">
          <h4 className={`text-sm font-bold text-yellow-100 mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <Sunrise className="w-4 h-4 text-yellow-300" />
            {isKh ? "១៦ ព្រះអាទិត្យរះ ក្នុងមួយថ្ងៃ" : "16 sunrises every day"}
          </h4>

          <svg viewBox="0 0 320 140" className="w-full h-auto mb-3" aria-label={isKh ? "ស្ថានីយ ISS ធ្វើគន្លងជុំវិញផែនដី រាល់ ៩០ នាទី" : "ISS orbits Earth every 90 minutes"}>
            <defs>
              <radialGradient id="sr-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>
            <circle cx="160" cy="70" r="45" fill="url(#sr-earth)" />
            {/* Orbit ellipse */}
            <ellipse cx="160" cy="70" rx="120" ry="55" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
            {/* ISS dots around orbit */}
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const x = 160 + 120 * Math.cos(a);
              const y = 70  + 55  * Math.sin(a);
              return <circle key={i} cx={x} cy={y} r="2.5" fill="#cbd5e1" />;
            })}
            {/* Highlighted ISS */}
            <g transform="translate(280 70)">
              <rect x="-6" y="-1.5" width="12" height="3" fill="#cbd5e1" />
              <rect x="-9" y="-3"   width="3"  height="6" fill="#3b82f6" />
              <rect x="6"  y="-3"   width="3"  height="6" fill="#3b82f6" />
            </g>
            <text x="160" y="135" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "១ ជុំ = ៩០ នាទី" : "1 orbit = 90 min"}</tspan>
            </text>
          </svg>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-md bg-yellow-500/10 border border-yellow-300/25 p-2">
              <div className="text-2xl">🌅</div>
              <div className={`font-bold text-yellow-200 font-mono ${isKh ? "font-khmer" : ""}`}>{isKh ? "១៦ × ព្រះអាទិត្យរះ" : "16 × sunrise"}</div>
            </div>
            <div className="rounded-md bg-indigo-500/10 border border-indigo-300/25 p-2">
              <div className="text-2xl">🌇</div>
              <div className={`font-bold text-indigo-200 font-mono ${isKh ? "font-khmer" : ""}`}>{isKh ? "១៦ × ព្រះអាទិត្យលិច" : "16 × sunset"}</div>
            </div>
          </div>
          <p className={`mt-3 text-[11px] text-white/70 leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
            {isKh
              ? "ក្នុងរយៈពេល ២៤ ម៉ោង ផែនដី ដើរកាត់បង្អួចរបស់អ្នក ១៦ ដង"
              : "In 24 hours, the Earth rolls past your window 16 times."}
          </p>
        </div>

        {/* Sleeping bag fact */}
        <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="sleeping-fact">
          <h4 className={`text-sm font-bold text-cyan-100 mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <Bed className="w-4 h-4 text-cyan-300" />
            {isKh ? "ដេកដោយចងខ្លួន ទៅនឹងជញ្ជាំង" : "Sleeping strapped to the wall"}
          </h4>

          <svg viewBox="0 0 320 160" className="w-full h-auto mb-3" aria-label={isKh ? "អវកាសយានិក ដេកក្នុងបន្ទប់ ដោយចងខ្លួនទៅនឹងជញ្ជាំង" : "Astronaut sleeping in a bag tethered to the cabin wall"}>
            {/* Cabin frame */}
            <rect x="40" y="20" width="240" height="120" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <rect x="50" y="30" width="220" height="100" rx="6" fill="#0f172a" />

            {/* Wall on the left with straps */}
            <line x1="60" y1="50" x2="60" y2="120" stroke="#94a3b8" strokeWidth="1" />
            <rect x="58" y="60" width="4" height="2" fill="#cbd5e1" />
            <rect x="58" y="100" width="4" height="2" fill="#cbd5e1" />

            {/* Sleeping bag */}
            <g transform="translate(80 70)">
              {/* bag */}
              <rect x="0" y="0" width="120" height="36" rx="14" fill="#22d3ee" stroke="#0e7490" strokeWidth="1" />
              {/* zipper line */}
              <line x1="20" y1="18" x2="115" y2="18" stroke="#0e7490" strokeWidth="0.6" strokeDasharray="2 2" />
              {/* astronaut head poking out */}
              <circle cx="-5" cy="18" r="11" fill="#fde68a" stroke="#a16207" strokeWidth="0.8" />
              {/* eyes */}
              <line x1="-9" y1="17" x2="-7" y2="17" stroke="#1f2937" strokeWidth="1" strokeLinecap="round" />
              <line x1="-3" y1="17" x2="-1" y2="17" stroke="#1f2937" strokeWidth="1" strokeLinecap="round" />
              {/* tether straps to wall */}
              <line x1="0"   y1="6"  x2="-20" y2="-10" stroke="#cbd5e1" strokeWidth="1.2" />
              <line x1="0"   y1="30" x2="-20" y2="46"  stroke="#cbd5e1" strokeWidth="1.2" />
              <text x="60" y="55" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontStyle="italic">Z z z</text>
            </g>

            {/* Floating items */}
            <text x="240" y="50" fontSize="14">🪥</text>
            <text x="260" y="80" fontSize="14">📒</text>
            <text x="245" y="110" fontSize="14">🥄</text>
          </svg>

          <p className={`text-xs text-white/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "នៅក្នុងស្ថានីយ ISS អ្វីៗដែលមិនចង វានឹងអណ្តែតបាត់ — សូម្បីតែអវកាសយានិក! ពេលត្រូវដេក ពួកគេចូលទៅក្នុងថង់ដេក ហើយចងថង់នោះ ទៅនឹងជញ្ជាំងបន្ទប់ ដើម្បីកុំឱ្យអណ្តែតរសាត់ ពេញមួយយប់។"
              : "On the ISS, anything you don't tie down floats away — even astronauts! At bedtime they climb into a sleeping bag and strap the bag to the cabin wall, so they don't drift through the station all night."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main wrapper ──────────────────────────────────────────────────────────

export function ISSModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="iss-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-slate-300/15 border border-slate-300/30 flex items-center justify-center text-slate-100">
            <Rocket className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-slate-100 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("The ISS: Our Floating Laboratory", "ស្ថានីយអវកាសអន្តរជាតិ៖ មន្ទីរពិសោធន៍អណ្តែតទឹករបស់យើង")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-300/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-slate-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(148,163,184,0.15) 0%,rgba(30,58,138,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(148,163,184,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-slate-700/40 blur-3xl pointer-events-none" />
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-40">
            {Array.from({ length: 60 }).map((_, i) => {
              const x = (i * 53) % 400;
              const y = (i * 31) % 200;
              const r = (i % 3) * 0.4 + 0.4;
              return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + (i % 5) * 0.1} />;
            })}
          </svg>
        </div>

        <div className="relative">
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
            style={{
              background: "linear-gradient(90deg,#e2e8f0 0%,#3b82f6 55%,#cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(148,163,184,0.3)",
            }}
          >
            {t("A City in the Sky", "ទីក្រុងមួយ លើមេឃ")}
          </h2>
          <p className={`text-white/85 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "A football-field-sized laboratory orbiting 400 km above us at 28,000 km/h, snapped together piece by piece by 15 nations working in peace — the most expensive single object ever built, and a daily reminder that humanity can do extraordinary things together.",
              "មន្ទីរពិសោធន៍ ធំស្មើទីលានបាល់ទាត់ ធ្វើគន្លងពីលើយើង ៤០០ គម ដោយល្បឿន ២៨,០០០ គម/ម៉ោង ប្រកបបំណែកម្តងៗ ដោយ ១៥ ប្រទេស សហការដោយសន្តិភាព — ជាវត្ថុថ្លៃជាងគេ ដែលមនុស្ស ធ្លាប់សាងសង់ ហើយជាការរំលឹក ប្រចាំថ្ងៃ ថាមនុស្សជាតិ អាចធ្វើការអស្ចារ្យ ជាមួយគ្នាបាន។",
            )}
          </p>
        </div>
      </div>

      <div className="mb-6"><EngineeringPanel lang={lang} /></div>
      <div className="mb-6"><UnityPanel lang={lang} /></div>
      <div className="mb-6"><MicrogravityPanel lang={lang} /></div>
      <LifePanel lang={lang} />

      <p className={`mt-5 text-center text-slate-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "A city in the sky, built by 15 nations, racing past your window 16 times a day — proof that humanity can build wonders when we work together.",
          "ទីក្រុងមួយ លើមេឃ ដែលកសាងដោយ ១៥ ប្រទេស ហោះកាត់បង្អួចអ្នក ១៦ ដង ក្នុងមួយថ្ងៃ — ជាភស្តុតាង ថាមនុស្សជាតិ អាចកសាងអព្ភូតហេតុ នៅពេលយើងធ្វើការ ជាមួយគ្នា។",
        )}
      </p>

      {/* keep MoonIcon import alive (defensive — used selectively) */}
      <span className="hidden">{(() => { void MoonIcon; return null; })()}</span>
    </section>
  );
}
