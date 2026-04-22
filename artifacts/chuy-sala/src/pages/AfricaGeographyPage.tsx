import { Link } from "wouter";
import {
  ArrowLeft,
  Globe2,
  Sun,
  Waves,
  Users,
  Building2,
  Flag,
  Handshake,
  Sparkles,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-AFR-01 · Africa & The AU: The Giant Continent
//             អាហ្វ្រិក និងសហភាពអាហ្វ្រិក៖ ទ្វីបដ៏ធំល្វឹងល្វើយ
//
//  1. The Geography of Extremes — Mediterranean Sea + Sahara Desert
//  2. Demographics & Megacities — 1.4B people, 54 countries, 3 megacities
//  3. The African Union — successor to OAU, mission, 55 member states
//
//  Aesthetic: warm terracotta + savanna gold + deep green (intentionally
//  distinct from the navy/gold of the Europe & EU page).
// ════════════════════════════════════════════════════════════════════════════

export function AfricaGeographyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden">
      <SavannahBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>

      {/* Hero */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Globe2 className="w-3.5 h-3.5" />
          {isKh ? "មជ្ឈមណ្ឌលសិក្សា · ភូមិសាស្ត្រ" : "Study Center · Geography"}
          <span className="font-mono opacity-60">· STC-AFR-01</span>
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}
          data-testid="page-title"
        >
          {isKh ? (
            <>អាហ្វ្រិក និងសហភាពអាហ្វ្រិក៖ <span className="text-orange-700">ទ្វីបដ៏ធំល្វឹងល្វើយ</span></>
          ) : (
            <>Africa & The AU: <span className="text-orange-700">The Giant Continent</span></>
          )}
        </h1>
        <p className={`text-stone-700 max-w-3xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ទ្វីបធំបំផុតទីពីរនៃពិភពលោក — ៥៤ ប្រជាជាតិ, ប្រជាពលរដ្ឋ ១,៤ ពាន់លាននាក់, និងគម្រោងប៉ុនប៉ងធំៗមួយដែលហៅថាសហភាពអាហ្វ្រិកដែលនាំទ្វីបនេះមករួមគ្នា។ នេះជាមេរៀនមួយលើខ្នាត ប្រវត្តិសាស្ត្រ និងអនាគត។"
            : "The world's second-largest continent — 54 nations, 1.4 billion people, and one bold experiment called the African Union that is trying to bind it all together. This is a lesson in scale, history, and the future."}
        </p>
      </header>

      {/* Section 01 — Geography */}
      <GeographySection isKh={isKh} />

      {/* Section 02 — Demographics + Megacities */}
      <DemographicsSection isKh={isKh} />

      {/* Section 03 — African Union */}
      <AfricanUnionSection isKh={isKh} />

      {/* Closing */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-amber-300 bg-amber-50/80 px-6 py-4 text-stone-800 italic">
          <span className={isKh ? "font-khmer not-italic leading-loose" : "font-serif"}>
            {isKh
              ? "« អាហ្វ្រិកមិនមែនជាប្រទេសមួយទេ — វាជាសាកលលោកមួយ។ »"
              : "“Africa is not a country — it is a universe.”"}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default AfricaGeographyPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — warm savanna gradient + faint dot pattern (no graph paper)
// ════════════════════════════════════════════════════════════════════════════

function SavannahBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fff7ed 0%, #fef3c7 35%, #fde68a 68%, #fcd9a5 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="afr-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill="#a16207" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#afr-dots)" />
      </svg>
      {/* Sun arc top-right */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-orange-300/40 blur-3xl" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable shells
// ════════════════════════════════════════════════════════════════════════════

function ClayCard({
  children, className = "", ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`bg-amber-50/90 backdrop-blur-sm rounded-2xl border-2 border-amber-200 shadow-[0_4px_28px_-12px_rgba(120,53,15,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionShell({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, khTerm, descEn, descKh, isKh, children,
}: {
  id: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  khTerm: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-800 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : (
          <>
            {titleEn}
            <span className="ml-2 font-khmer text-base font-normal text-stone-500">({khTerm})</span>
          </>
        )}
      </h2>
      <p className={`text-stone-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — Geography of Extremes
// ════════════════════════════════════════════════════════════════════════════

function GeographySection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      id="geography"
      eyebrowEn="01 · Geography"
      eyebrowKh="០១ · ភូមិសាស្ត្រ"
      titleEn="The Geography of Extremes"
      titleKh="ភូមិសាស្ត្រនៃភាពអស្ចារ្យ"
      khTerm="ភូមិសាស្ត្រនៃភាពអស្ចារ្យ"
      descEn={
        "Africa is a continent of superlatives — the longest river, the largest hot desert, and the world's most ancient civilizations all crowd onto a single landmass. Two features in particular shape its destiny: a sea on its northern edge, and a desert in its heart."
      }
      descKh="អាហ្វ្រិកគឺជាទ្វីបនៃការជ្រុលៗ — ទន្លេវែងបំផុត, វាលខ្សាច់ក្តៅធំបំផុត, និងអរិយធម៌បុរាណបំផុតនៃពិភពលោក សុទ្ធតែស្ថិតនៅលើដីតែមួយ។ ភូមិសាស្ត្រពីរយ៉ាងកំណត់ជោគវាសនារបស់វា ៖ សមុទ្រមួយនៅខាងជើង និងវាលខ្សាច់មួយនៅបេះដូង។"
      isKh={isKh}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mediterranean Sea */}
        <ClayCard className="p-5 sm:p-6" data-testid="med-card">
          <div className="flex items-start gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-sky-700 text-white flex-shrink-0">
              <Waves className="w-5 h-5" />
            </span>
            <div>
              <div className={`text-[11px] font-bold uppercase tracking-widest text-sky-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "ព្រំដែនខាងជើង" : "Northern Border"}
              </div>
              <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "សមុទ្រមេឌីទែរ៉ាណេ" : "The Mediterranean Sea"}
                {!isKh && <span className="ml-2 font-khmer text-sm font-normal text-stone-500">(សមុទ្រមេឌីទែរ៉ាណេ)</span>}
              </h3>
            </div>
          </div>

          {/* mini SVG: Africa coast top + Europe across the water */}
          <MediterraneanSVG />

          <p className={`text-sm text-stone-700 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "សមុទ្រមេឌីទែរ៉ាណេ កំណត់ព្រំដែនខាងជើងទាំងមូលនៃទ្វីបអាហ្វ្រិក — ពីម៉ារ៉ុក រហូតដល់អេហ្ស៊ីប។ អស់ ៣ ០០០ ឆ្នាំមកហើយ វាបានដើរតួនាទីជាទាំង ស្ពានភ្ជាប់ និង ឧបសគ្គរារាំង រវាងអាហ្វ្រិក និងអឺរ៉ុប — ពាណិជ្ជករឆ្លងកាត់វា ច្បាំងលើវា ហើយចែករំលែកអាហារ ភាសា និងជំនឿតាមរយៈវា។"
              : "The Mediterranean defines the entire northern edge of the continent — from Morocco to Egypt. For 3,000 years it has acted as both bridge and barrier between Africa and Europe — traders crossed it, armies fought across it, and food, language, and faith all flowed back and forth over its waves."}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <FactPill labelEn="Length" labelKh="ប្រវែង" value="~3,800 km" isKh={isKh} tone="sky" />
            <FactPill labelEn="Coast countries" labelKh="ប្រទេសឆ្នេរ" value="5 in Africa" valueKh="៥ នៅអាហ្វ្រិក" isKh={isKh} tone="sky" />
            <FactPill labelEn="Crossing" labelKh="ឆ្លងកាត់" value="14 km @ Gibraltar" valueKh="១៤ គម (Gibraltar)" isKh={isKh} tone="sky" />
          </div>
        </ClayCard>

        {/* Sahara Desert */}
        <ClayCard className="p-5 sm:p-6" data-testid="sahara-card">
          <div className="flex items-start gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-700 text-white flex-shrink-0">
              <Sun className="w-5 h-5" />
            </span>
            <div>
              <div className={`text-[11px] font-bold uppercase tracking-widest text-orange-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "បេះដូងនៃទ្វីប" : "The Heart of the Continent"}
              </div>
              <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "វាលខ្សាច់សាហារ៉ា" : "The Sahara Desert"}
                {!isKh && <span className="ml-2 font-khmer text-sm font-normal text-stone-500">(វាលខ្សាច់សាហារ៉ា)</span>}
              </h3>
            </div>
          </div>

          {/* SVG: dunes + sun */}
          <SaharaSVG />

          <p className={`text-sm text-stone-700 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "វាលខ្សាច់សាហារ៉ា គឺជា វាលខ្សាច់ក្តៅធំបំផុតក្នុងពិភពលោក។ វាគ្របដណ្តប់លើ ១១ ប្រទេស ហើយយឺតៗកំពុងលូតលាស់ទៅខាងត្បូងជារៀងរាល់ឆ្នាំ។ សីតុណ្ហភាពនៅពេលថ្ងៃអាចឡើងលើ ៥០°C ហើយធ្លាក់ដល់ចំណុចកក់នៅពេលយប់។"
              : "The Sahara is the largest hot desert on Earth. It stretches across 11 countries and is slowly creeping further south every year. Daytime temperatures cross 50 °C; at night they drop to freezing."}
          </p>

          {/* Scale Fact */}
          <div className="mt-4 rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-100 to-amber-100 p-4">
            <div className={`text-[11px] font-bold uppercase tracking-widest text-orange-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ការពិតពីខ្នាត" : "Mind-Blowing Scale Fact"}
            </div>
            <p className={`text-sm text-stone-900 font-semibold mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "វាលខ្សាច់សាហារ៉ា តែម្នាក់ឯង មានទំហំ ស្ទើរតែស្មើ នឹងសហរដ្ឋអាមេរិកទាំងមូល ឬចិនទាំងមូល!"
                : "The Sahara Desert alone is almost the exact same size as the entire United States — or the entire China!"}
            </p>
            {/* tiny scale comparison bar */}
            <ScaleComparison isKh={isKh} />
          </div>
        </ClayCard>
      </div>
    </SectionShell>
  );
}

// — Mediterranean Sea SVG: Europe coast on top, Africa coast on bottom
function MediterraneanSVG() {
  return (
    <svg viewBox="0 0 360 140" className="w-full h-auto rounded-lg border border-amber-200 bg-sky-100/70" aria-hidden>
      {/* Europe coast (top, green) */}
      <path d="M 0 35 Q 60 18, 130 28 T 260 22 T 360 30 L 360 0 L 0 0 Z" fill="#15803d" opacity="0.85" />
      <text x="180" y="20" textAnchor="middle" fontSize="11" fontFamily="serif" fill="#fff" fontWeight="bold">Europe</text>
      {/* Africa coast (bottom, terracotta) */}
      <path d="M 0 110 Q 80 95, 160 102 T 360 100 L 360 140 L 0 140 Z" fill="#b45309" opacity="0.9" />
      <text x="180" y="130" textAnchor="middle" fontSize="11" fontFamily="serif" fill="#fff" fontWeight="bold">Africa</text>
      {/* Sea waves */}
      <path d="M 10 60 q 10 -6 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#0369a1" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 10 75 q 10 -6 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#0369a1" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 10 90 q 10 -6 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#0369a1" strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* Strait of Gibraltar marker */}
      <line x1="35" y1="35" x2="35" y2="105" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
      <text x="42" y="72" fontSize="9" fontFamily="monospace" fill="#92400e" fontWeight="bold">Gibraltar</text>
    </svg>
  );
}

// — Sahara dunes SVG with sun
function SaharaSVG() {
  return (
    <svg viewBox="0 0 360 140" className="w-full h-auto rounded-lg border border-amber-200 bg-gradient-to-b from-orange-100 to-amber-200" aria-hidden>
      {/* Sun */}
      <circle cx="290" cy="48" r="22" fill="#f97316" opacity="0.9" />
      <circle cx="290" cy="48" r="32" fill="#fb923c" opacity="0.35" />
      {/* Heat shimmer rays */}
      {[-30, -15, 0, 15, 30].map((deg, i) => (
        <line
          key={i}
          x1="290"
          y1="48"
          x2={290 + 50 * Math.cos((deg * Math.PI) / 180)}
          y2={48 + 50 * Math.sin((deg * Math.PI) / 180)}
          stroke="#f97316"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {/* Distant dune */}
      <path d="M 0 105 Q 90 70, 200 95 T 360 80 L 360 140 L 0 140 Z" fill="#d97706" opacity="0.9" />
      {/* Mid dune */}
      <path d="M 0 120 Q 70 95, 180 115 T 360 110 L 360 140 L 0 140 Z" fill="#b45309" opacity="0.9" />
      {/* Front dune */}
      <path d="M 0 135 Q 60 118, 160 130 T 360 128 L 360 140 L 0 140 Z" fill="#92400e" />
      {/* Tiny camel silhouette */}
      <g transform="translate(60 118)" fill="#451a03">
        <ellipse cx="0" cy="0" rx="9" ry="3" />
        <circle cx="-2" cy="-3" r="2.2" />
        <circle cx="3" cy="-3" r="2.2" />
        <line x1="-7" y1="-1" x2="-7" y2="6" stroke="#451a03" strokeWidth="1.4" />
        <line x1="7" y1="-1" x2="7" y2="6" stroke="#451a03" strokeWidth="1.4" />
        <line x1="-3" y1="-1" x2="-3" y2="6" stroke="#451a03" strokeWidth="1.4" />
        <line x1="3" y1="-1" x2="3" y2="6" stroke="#451a03" strokeWidth="1.4" />
        <path d="M 8 -3 L 12 -7 L 13 -3 Z" />
      </g>
    </svg>
  );
}

// — Scale comparison bar: Sahara vs USA vs China
function ScaleComparison({ isKh }: { isKh: boolean }) {
  // approximate areas (millions km²): Sahara 9.2, USA 9.83, China 9.6
  const max = 9.83;
  const rows: Array<{ en: string; kh: string; area: number; color: string }> = [
    { en: "Sahara Desert", kh: "សាហារ៉ា", area: 9.2, color: "bg-orange-600" },
    { en: "USA", kh: "សហរដ្ឋអាមេរិក", area: 9.83, color: "bg-stone-700" },
    { en: "China", kh: "ចិន", area: 9.6, color: "bg-red-700" },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.en} className="flex items-center gap-2 text-[11px]">
          <div className={`w-24 text-right text-stone-800 font-semibold ${isKh ? "font-khmer" : ""}`}>
            {isKh ? r.kh : r.en}
          </div>
          <div className="flex-1 h-3 rounded-full bg-amber-200/70 overflow-hidden">
            <div className={`${r.color} h-full rounded-full`} style={{ width: `${(r.area / max) * 100}%` }} />
          </div>
          <div className="w-20 font-mono text-stone-700">{r.area.toFixed(1)} M km²</div>
        </div>
      ))}
    </div>
  );
}

function FactPill({
  labelEn, labelKh, value, valueKh, isKh, tone = "amber",
}: {
  labelEn: string; labelKh: string;
  value: string; valueKh?: string;
  isKh: boolean;
  tone?: "amber" | "sky" | "green";
}) {
  const map = {
    amber: "border-amber-300 bg-amber-100/80 text-amber-900",
    sky: "border-sky-300 bg-sky-100/80 text-sky-900",
    green: "border-emerald-300 bg-emerald-100/80 text-emerald-900",
  } as const;
  return (
    <div className={`rounded-lg border ${map[tone]} px-2 py-1.5`}>
      <div className={`text-[10px] uppercase tracking-wider font-semibold opacity-80 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
      <div className={`text-sm font-bold ${isKh && valueKh ? "font-khmer leading-loose" : "font-mono"}`}>
        {isKh && valueKh ? valueKh : value}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Demographics + Megacities
// ════════════════════════════════════════════════════════════════════════════

function DemographicsSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      id="demographics"
      eyebrowEn="02 · Demographics"
      eyebrowKh="០២ · ប្រជាសាស្ត្រ"
      titleEn="Demographics & Megacities"
      titleKh="ប្រជាសាស្ត្រ និងទីក្រុងធំៗ"
      khTerm="ប្រជាសាស្ត្រ និងទីក្រុងធំៗ"
      descEn={
        "Numbers tell only half the story — but they tell it loudly. Africa is the youngest, fastest-growing continent on Earth, and three of its cities have become the engine rooms of an entire region's economy."
      }
      descKh="តួលេខប្រាប់រឿងតែពាក់កណ្តាល — ប៉ុន្តែវាប្រាប់ដោយខ្លាំងៗ។ អាហ្វ្រិកគឺជាទ្វីបក្មេងបំផុត និងលូតលាស់លឿនបំផុតនៅលើផែនដី ហើយទីក្រុងរបស់វាបី បានក្លាយជាបន្ទប់ម៉ាស៊ីននៃសេដ្ឋកិច្ចតំបន់ទាំងមូល។"
      isKh={isKh}
    >
      {/* Fast Facts grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ClayCard className="p-5" data-testid="fact-population">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-700 text-white">
              <Users className="w-4 h-4" />
            </span>
            <div className={`text-[11px] font-bold uppercase tracking-widest text-emerald-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ប្រជាជន" : "Population"}
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-800">
            1.4B+
          </div>
          <p className={`text-sm text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ជាង ១,៤ ពាន់លាននាក់ — ប្រជាជនក្មេងបំផុតនិងលូតលាស់លឿនបំផុតនៅលើផែនដី។ ពាក់កណ្តាលមានអាយុក្រោម ២០ ឆ្នាំ។"
              : "Over 1.4 billion people — the youngest, fastest-growing population on Earth. Half of Africa is under 20 years old."}
          </p>
        </ClayCard>

        <ClayCard className="p-5" data-testid="fact-countries">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-700 text-white">
              <Flag className="w-4 h-4" />
            </span>
            <div className={`text-[11px] font-bold uppercase tracking-widest text-orange-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ប្រទេស" : "Countries"}
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-orange-800">
            54
          </div>
          <p className={`text-sm text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "៥៤ ប្រជាជាតិឯករាជ្យដែលត្រូវបានទទួលស្គាល់ពេញលក្ខណៈ — ច្រើនជាងទ្វីបណាមួយផ្សេងទៀត។ និយាយភាសាជាង ២ ០០០។"
              : "54 fully recognized independent nations — more than any other continent. Together they speak over 2,000 languages."}
          </p>
        </ClayCard>

        <ClayCard className="p-5" data-testid="fact-growth">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-amber-700 text-white">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div className={`text-[11px] font-bold uppercase tracking-widest text-amber-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ការព្យាករណ៍ ២០៥០" : "Projection 2050"}
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-amber-800">
            2.5B
          </div>
          <p className={`text-sm text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ឆ្នាំ ២០៥០ មនុស្ស ១ ក្នុងចំណោម ៤ នាក់នៅលើផែនដីនឹងជាជនអាហ្វ្រិក។ នេះគឺជាការផ្លាស់ប្តូរធំបំផុតនៃប្រជាសាស្ត្រនៅសតវត្សរ៍ទី ២១។"
              : "By 2050, one in every four people on Earth will be African. This is the largest demographic shift of the 21st century."}
          </p>
        </ClayCard>
      </div>

      {/* Megacities */}
      <ClayCard className="p-5 sm:p-6" data-testid="megacities">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-orange-800 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ទីក្រុងធំ ៣" : "Three Megacities"}
        </div>
        <h3 className={`font-display font-bold text-xl sm:text-2xl text-stone-900 mb-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? "ម៉ាស៊ីនសេដ្ឋកិច្ចនៃទ្វីប" : "The economic engine rooms of the continent"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CityCard
            isKh={isKh}
            tone="amber"
            cityEn="Cairo"
            cityKh="កៃរ៉ូ"
            countryEn="Egypt"
            countryKh="អេហ្ស៊ីប"
            tagEn="The ancient gateway on the Nile"
            tagKh="ច្រកចូលបុរាណលើទន្លេនីល"
            descEn="Founded over 1,000 years ago, Cairo is the largest city in the Arab world and Africa's historical capital — built where the Nile meets the desert."
            descKh="ត្រូវបានបង្កើតឡើងជាងមួយពាន់ឆ្នាំមកហើយ កៃរ៉ូគឺជាទីក្រុងធំបំផុតក្នុងពិភពអារ៉ាប់ និងជារដ្ឋធានីប្រវត្តិសាស្ត្ររបស់អាហ្វ្រិក — សាងសង់នៅកន្លែងដែលទន្លេនីលជួបវាលខ្សាច់។"
            popLabel="≈ 22 M"
          />
          <CityCard
            isKh={isKh}
            tone="orange"
            cityEn="Lagos"
            cityKh="ឡាកូស"
            countryEn="Nigeria"
            countryKh="នីហ្សេរីយ៉ា"
            tagEn="The booming tech & finance capital of West Africa"
            tagKh="រដ្ឋធានីបច្ចេកវិទ្យា និងហិរញ្ញវត្ថុដែលកំពុងរីកលូតលាស់នៃអាហ្វ្រិកខាងលិច"
            descEn="Africa's largest city by population — a coastal megacity bursting with start-ups, banks, and Nollywood, the world's second-largest film industry."
            descKh="ទីក្រុងធំបំផុតរបស់អាហ្វ្រិកតាមចំនួនប្រជាជន — ទីក្រុងធំៗឆ្នេរមួយដែលផ្ទុះឡើងដោយ start-up, ធនាគារ និង Nollywood ដែលជាឧស្សាហកម្មភាពយន្តធំទីពីរនៅលើពិភពលោក។"
            popLabel="≈ 17 M"
          />
          <CityCard
            isKh={isKh}
            tone="green"
            cityEn="Johannesburg"
            cityKh="ចូហានណេសបឺក"
            countryEn="South Africa"
            countryKh="អាហ្វ្រិកខាងត្បូង"
            tagEn="The economic engine of the south"
            tagKh="ម៉ាស៊ីនសេដ្ឋកិច្ចនៃតំបន់ខាងត្បូង"
            descEn="Built on top of the world's richest gold reef, 'Joburg' is the financial capital of southern Africa and the home of the continent's biggest stock exchange."
            descKh="សាងសង់នៅលើខ្ទង់មាសសម្បូរបំផុតនៃពិភពលោក « Joburg » គឺជារដ្ឋធានីហិរញ្ញវត្ថុនៃអាហ្វ្រិកខាងត្បូង និងជាទីផ្សារភាគហ៊ុនធំបំផុតរបស់ទ្វីប។"
            popLabel="≈ 6 M"
          />
        </div>
      </ClayCard>
    </SectionShell>
  );
}

function CityCard({
  isKh, tone, cityEn, cityKh, countryEn, countryKh, tagEn, tagKh, descEn, descKh, popLabel,
}: {
  isKh: boolean;
  tone: "amber" | "orange" | "green";
  cityEn: string; cityKh: string;
  countryEn: string; countryKh: string;
  tagEn: string; tagKh: string;
  descEn: string; descKh: string;
  popLabel: string;
}) {
  const map = {
    amber: { bd: "border-amber-300", bg: "bg-amber-100/70", chip: "bg-amber-700", txt: "text-amber-900" },
    orange: { bd: "border-orange-300", bg: "bg-orange-100/70", chip: "bg-orange-700", txt: "text-orange-900" },
    green: { bd: "border-emerald-300", bg: "bg-emerald-100/70", chip: "bg-emerald-700", txt: "text-emerald-900" },
  } as const;
  const t = map[tone];
  return (
    <div className={`rounded-xl border-2 ${t.bd} ${t.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md ${t.chip} text-white`}>
          <MapPin className="w-4 h-4" />
        </span>
        <div>
          <h4 className={`font-bold text-base text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? cityKh : cityEn}
            <span className="text-stone-500 font-normal">, {isKh ? countryKh : countryEn}</span>
          </h4>
        </div>
      </div>
      <div className={`text-[11px] font-bold ${t.txt} mb-2 ${isKh ? "font-khmer" : "italic"}`}>
        {isKh ? tagKh : tagEn}
      </div>
      <p className={`text-xs text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className={`inline-block rounded-md ${t.chip} text-white text-xs font-mono px-2 py-0.5`}>
        {popLabel}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The African Union
// ════════════════════════════════════════════════════════════════════════════

function AfricanUnionSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      id="african-union"
      eyebrowEn="03 · Politics"
      eyebrowKh="០៣ · នយោបាយ"
      titleEn="The African Union"
      titleKh="សហភាពអាហ្វ្រិក"
      khTerm="សហភាពអាហ្វ្រិក"
      descEn={
        "If the EU bound Europe together after two world wars, the African Union is doing the same for a continent shaped by colonialism and a thousand internal borders. It is young, ambitious, and one of the most important political experiments of our century."
      }
      descKh="ប្រសិនបើសហភាពអឺរ៉ុបបានចងភ្ជាប់អឺរ៉ុបបន្ទាប់ពីសង្គ្រាមលោកទាំងពីរ សហភាពអាហ្វ្រិកកំពុងធ្វើដូចគ្នាសម្រាប់ទ្វីបមួយដែលត្រូវបានកំណត់រូបរាងដោយលទ្ធិអាណានិគមនិយម និងព្រំដែនផ្ទៃក្នុងរាប់ពាន់។ វាក្មេង ប៉ុន្តែមានមហិច្ឆតាខ្ពស់ ហើយជាការពិសោធន៍នយោបាយដ៏សំខាន់បំផុតមួយនៃសតវត្សរ៍យើង។"
      isKh={isKh}
    >
      <ClayCard className="p-5 sm:p-6" data-testid="au-card">
        {/* Origin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="rounded-xl border border-amber-300 bg-amber-100/70 p-4">
            <div className={`text-[10px] font-bold uppercase tracking-widest text-amber-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "បង្កើតឡើង" : "Founded"}
            </div>
            <div className="font-display font-extrabold text-3xl text-amber-900">2002</div>
            <p className={`text-xs text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "ជំនួសអង្គការ OAU (បង្កើត ១៩៦៣) ដែលបានដឹកនាំការតស៊ូប្រឆាំងលទ្ធិអាណានិគម។"
                : "Replaced the OAU (founded 1963), which led the fight against colonial rule."}
            </p>
          </div>
          <div className="rounded-xl border border-orange-300 bg-orange-100/70 p-4">
            <div className={`text-[10px] font-bold uppercase tracking-widest text-orange-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "រដ្ឋសមាជិក" : "Member States"}
            </div>
            <div className="font-display font-extrabold text-3xl text-orange-900">55</div>
            <p className={`text-xs text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "រាល់ប្រទេសអាហ្វ្រិកទាំងអស់ — រួមទាំងសាហារ៉ាខាងលិចដែលត្រូវបានទាមទារ។"
                : "Every African nation — including the disputed Western Sahara."}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-100/70 p-4">
            <div className={`text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ទីស្នាក់ការ" : "Headquarters"}
            </div>
            <div className={`font-display font-extrabold text-2xl text-emerald-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "អាឌីសអាបេបា" : "Addis Ababa"}
            </div>
            <p className={`text-xs text-stone-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? "ប្រទេសអេត្យូពី" : "Ethiopia"}
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-amber-50 p-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-700 text-white flex-shrink-0">
              <Handshake className="w-5 h-5" />
            </span>
            <div>
              <h3 className={`font-display font-bold text-lg text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "បេសកកម្ម — ដូចជា ASEAN ឬ EU" : "The Mission — just like ASEAN or the EU"}
              </h3>
              <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ដូចគ្នានឹង ASEAN ឬ EU បេសកកម្មនៃសហភាពអាហ្វ្រិកគឺ ៖ ផ្សព្វផ្សាយសន្តិភាព, ចូលរួមសេដ្ឋកិច្ចនៃរដ្ឋសមាជិក ៥៥ របស់ខ្លួន, និង ពង្រីកសំឡេងនៃអាហ្វ្រិកនៅលើឆាកអន្តរជាតិ។ វាដំណើរការតំបន់ពាណិជ្ជកម្មសេរីដ៏ធំបំផុតនៅលើពិភពលោក (AfCFTA) ដែលបង្កើតឡើងក្នុងឆ្នាំ ២០២១។"
                  : "Just like ASEAN or the EU, the AU's three goals are: promote peace, integrate the economies of its 55 member states, and amplify the voice of Africa on the global stage. It runs the largest free-trade zone on Earth (AfCFTA), launched in 2021."}
              </p>
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <Pillar isKh={isKh} icon="☮" titleEn="Peace & Security" titleKh="សន្តិភាព និងសន្តិសុខ" descEn="Sends peacekeepers, mediates conflicts, suspends governments after coups." descKh="បញ្ជូនកងកម្លាំងការពារសន្តិភាព ដឹកនាំការសម្រុះសម្រួលជម្លោះ និងពយួរប្រព័ន្ធរដ្ឋាភិបាលក្រោយរដ្ឋប្រហារ។" />
          <Pillar isKh={isKh} icon="₵" titleEn="Economic Integration" titleKh="សមាហរណកម្មសេដ្ឋកិច្ច" descEn="One free-trade zone, shared infrastructure, plans for a single African currency." descKh="តំបន់ពាណិជ្ជកម្មសេរីមួយ ហេដ្ឋារចនាសម្ព័ន្ធរួម និងផែនការសម្រាប់រូបិយវត្ថុអាហ្វ្រិកតែមួយ។" />
          <Pillar isKh={isKh} icon="🌍" titleEn="One Voice on the World Stage" titleKh="សំឡេងមួយលើឆាកពិភពលោក" descEn="Speaks for 1.4 billion people at the UN, G20, climate talks, and trade summits." descKh="និយាយជំនួសប្រជាជន ១,៤ ពាន់លាននាក់នៅ UN, G20, កិច្ចចរចាអាកាសធាតុ និងកិច្ចប្រជុំពាណិជ្ជកម្ម។" />
        </div>

        {/* Bilingual closing note */}
        <div className="mt-6 rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-100 to-amber-100 p-5 text-center">
          <Building2 className="w-6 h-6 mx-auto mb-2 text-orange-700" />
          <p className="text-base font-display font-bold text-stone-900 italic">
            “A united continent is stronger than 54 divided nations.”
          </p>
          <p className="text-base font-khmer font-bold text-stone-900 leading-loose mt-2">
            « ទ្វីបដែលរួបរួមគ្នាគឺខ្លាំងជាងប្រជាជាតិចំនួន ៥៤ ដែលបែកបាក់គ្នា។ »
          </p>
        </div>
      </ClayCard>
    </SectionShell>
  );
}

function Pillar({
  isKh, icon, titleEn, titleKh, descEn, descKh,
}: { isKh: boolean; icon: string; titleEn: string; titleKh: string; descEn: string; descKh: string }) {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4">
      <div className="text-2xl mb-1" aria-hidden>{icon}</div>
      <div className={`font-bold text-sm text-stone-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </div>
      <p className={`text-xs text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}
