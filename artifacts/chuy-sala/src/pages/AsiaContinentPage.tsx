import { Link } from "wouter";
import {
  ArrowLeft,
  Globe2,
  Users,
  Building2,
  Sparkles,
  Mountain,
  Waves,
  Wheat,
  ScrollText,
  MapPin,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-ASIA-01 · Asia: The Giant Continent
//                អាស៊ី៖ ទ្វីបដ៏ធំ
//
//  Three strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. The Scale of Humanity        — terracotta / clay-orange theme
//   2. The Cradle of Civilization   — deep jungle green theme
//   3. The Extremes of the Earth    — ocean blue theme (Everest ↔ Dead Sea)
//
//  Aesthetic: rich earthy palette — terracotta, deep greens, ocean blues —
//  consistent with the platform's geography modules.
// ════════════════════════════════════════════════════════════════════════════

export function AsiaContinentPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden">
      <AsiaBg />

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

      {/* Hero — strictly bilingual */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-300 text-orange-900 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm flex-wrap">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Study Center · Geography</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">មជ្ឈមណ្ឌលសិក្សា · ភូមិសាស្ត្រ</span>
          <span className="font-mono opacity-60">· STC-ASIA-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight"
        >
          Asia: <span className="text-orange-700">The Giant Continent</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-stone-800">
          អាស៊ី៖ <span className="text-orange-700">ទ្វីបដ៏ធំ</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-stone-700 text-base leading-relaxed">
            One continent — half the planet's people, the birthplace of cities and writing, the highest mountain on Earth, and the lowest dry land below sea level. This is your home continent.
          </p>
          <p className="text-stone-700 text-base font-khmer leading-loose">
            ទ្វីបមួយ — ពាក់កណ្តាលនៃប្រជាជននៅលើផែនដី ជាកន្លែងកំណើតនៃទីក្រុង និងការសរសេរ ភ្នំខ្ពស់បំផុតលើផែនដី និងដីស្ងួតទាបបំផុតក្រោមកម្រិតទឹកសមុទ្រ។ នេះគឺជាទ្វីបជាស្រុកកំណើតរបស់អ្នក។
          </p>
        </div>
      </header>

      {/* Three cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScaleOfHumanityCard />
          <CradleOfCivilizationCard />
          <ExtremesOfEarthCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-orange-300 bg-orange-50/80 px-6 py-4 text-stone-800">
          <p className="font-serif italic">
            “Asia is not a continent. It is the original story of humanity.”
          </p>
          <p className="font-khmer not-italic leading-loose text-stone-700 mt-1">
            «អាស៊ីមិនមែនជាទ្វីបទេ។ វាគឺជាសាច់រឿងដើមនៃមនុស្សជាតិ។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AsiaContinentPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — earthy gradient (terracotta → savanna → forest → ocean hint)
// ════════════════════════════════════════════════════════════════════════════

function AsiaBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fff7ed 0%, #fde6c8 28%, #f3e9c6 55%, #e0e8d8 78%, #cfe1e8 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="asia-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill="#9a3412" opacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#asia-dots)" />
      </svg>
      {/* Subtle continent-shape suggestion in the corner */}
      <svg
        className="absolute -top-10 right-0 w-[28rem] opacity-[0.06]"
        viewBox="0 0 200 160"
      >
        <path
          d="M30 50 Q60 20 100 30 Q150 35 175 70 Q170 110 130 125 Q90 140 60 120 Q30 100 30 50 Z"
          fill="#9a3412"
        />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bilingual helpers — always render BOTH languages
// ════════════════════════════════════════════════════════════════════════════

function BilingualBlock({ en, kh }: { en: React.ReactNode; kh: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm leading-relaxed">{en}</p>
      <p className="text-sm font-khmer leading-loose opacity-95">{kh}</p>
    </div>
  );
}

function StatBlock({
  big,
  unitEn,
  unitKh,
  captionEn,
  captionKh,
  accent,
}: {
  big: string;
  unitEn: string;
  unitKh: string;
  captionEn: string;
  captionKh: string;
  accent: string;
}) {
  return (
    <div className={`rounded-xl border-2 ${accent} bg-white/70 p-3`}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="font-display font-extrabold text-3xl sm:text-4xl leading-none tracking-tight">
          {big}
        </span>
        <span className="text-xs font-mono uppercase tracking-widest opacity-70">
          {unitEn}
        </span>
        <span className="text-xs font-khmer opacity-70">{unitKh}</span>
      </div>
      <p className="mt-1 text-[12px] leading-snug text-stone-700">{captionEn}</p>
      <p className="text-[12px] leading-loose text-stone-700 font-khmer">{captionKh}</p>
    </div>
  );
}

function SubLabel({ en, kh }: { en: string; kh: string }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-widest mb-1 flex flex-wrap gap-x-2 opacity-80">
      <span>{en}</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">{kh}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Scale of Humanity (terracotta)
// ════════════════════════════════════════════════════════════════════════════

function ScaleOfHumanityCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-orange-600 shadow-lg overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #fff7ed 0%, #fed7aa 60%, #fdba74 100%)",
      }}
      data-testid="card-humanity"
    >
      {/* Header strip */}
      <header className="px-5 pt-5 pb-3 border-b-2 border-orange-300/70">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-200 border-2 border-orange-500 text-orange-800 flex items-center justify-center">
            <Users className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-orange-800 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · 01</span>
              <span className="opacity-50">/</span>
              <span>Demography</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ប្រជាសាស្ត្រ</span>
            </div>
            <h3 className="font-bold text-lg text-orange-950 leading-tight">
              <span className="block">The Scale of Humanity</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-orange-900">
                ទំហំនៃមនុស្សជាតិ
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-4 text-stone-900 flex-1">
        <BilingualBlock
          en={
            <>
              Asia is the <strong>largest continent on Earth</strong>, both in land size and in human life. No other continent comes close.
            </>
          }
          kh={
            <>
              អាស៊ីគឺជា <strong>ទ្វីបធំបំផុតលើផែនដី</strong> ទាំងផ្ទៃដី និងជីវិតមនុស្ស។ គ្មានទ្វីបណាមួយផ្សេងទៀតខិតជិតវាបានឡើយ។
            </>
          }
        />

        {/* Population stat */}
        <div>
          <SubLabel en="The Population" kh="ប្រជាជន" />
          <StatBlock
            big="4.7B"
            unitEn="People"
            unitKh="នាក់"
            captionEn="Roughly 4.7 billion people live in Asia."
            captionKh="ប្រហែល ៤,៧ ពាន់លាននាក់ រស់នៅក្នុងអាស៊ី។"
            accent="border-orange-500"
          />
          {/* 60% pie visual */}
          <PopulationPieDiagram />
          <div className="mt-2 rounded-lg bg-orange-100 border-2 border-orange-500 p-2.5">
            <p className="text-sm font-bold text-orange-950 leading-snug">
              That is <strong>60% of the entire human race</strong> — more people live <em>inside</em> Asia than in the rest of the world combined.
            </p>
            <p className="text-sm font-bold text-orange-950 font-khmer leading-loose mt-1">
              នោះគឺជា <strong>៦០% នៃមនុស្សជាតិទាំងមូល</strong> — មនុស្សកាន់តែច្រើនរស់នៅ <em>ខាងក្នុង</em> អាស៊ី ជាងផ្នែកដែលនៅសល់នៃពិភពលោករួមបញ្ចូលគ្នា។
            </p>
          </div>
        </div>

        {/* Countries stat */}
        <div>
          <SubLabel en="The Countries" kh="ប្រទេស" />
          <StatBlock
            big="48"
            unitEn="Countries"
            unitKh="ប្រទេស"
            captionEn="There are 48 internationally recognised countries in Asia."
            captionKh="មាន ៤៨ ប្រទេសដែលត្រូវបានទទួលស្គាល់ជាអន្តរជាតិនៅក្នុងអាស៊ី។"
            accent="border-amber-500"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-amber-100 border border-amber-400 p-2">
              <SubLabel en="The Massive" kh="ដ៏មហិមា" />
              <p className="text-sm font-bold text-amber-950 leading-snug">
                <strong>China</strong> · <strong>India</strong>
              </p>
              <p className="text-sm font-bold text-amber-950 font-khmer leading-loose">
                <strong>ចិន</strong> · <strong>ឥណ្ឌា</strong>
              </p>
              <p className="text-[11px] text-stone-700 mt-0.5">~1.4B people each</p>
              <p className="text-[11px] text-stone-700 font-khmer leading-loose">~១,៤ ពាន់លាននាក់ ម្នាក់ៗ</p>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-300 p-2">
              <SubLabel en="The Tiny" kh="ដ៏តូច" />
              <p className="text-sm font-bold text-amber-950 leading-snug">
                <strong>Maldives</strong>
              </p>
              <p className="text-sm font-bold text-amber-950 font-khmer leading-loose">
                <strong>ម៉ាល់ឌីវ</strong>
              </p>
              <p className="text-[11px] text-stone-700 mt-0.5">~520,000 people</p>
              <p className="text-[11px] text-stone-700 font-khmer leading-loose">~៥២០,០០០ នាក់</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// 60% pie / dot diagram
function PopulationPieDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border-2 border-orange-400 bg-white/80 flex items-center justify-center gap-3 px-3"
      aria-hidden="true"
    >
      {/* Pie */}
      <svg viewBox="0 0 100 100" className="w-24 h-24 flex-shrink-0">
        <circle cx="50" cy="50" r="46" fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
        {/* 60% slice = 216° starting from top */}
        <path
          d="M 50 50 L 50 4 A 46 46 0 1 1 5.6 61.5 Z"
          fill="#ea580c"
          stroke="#7c2d12"
          strokeWidth="2"
        />
        <text
          x="42"
          y="42"
          fontSize="14"
          fontWeight="bold"
          fill="#fff7ed"
          fontFamily="ui-sans-serif, system-ui"
        >
          60%
        </text>
      </svg>
      <div className="text-[12px] leading-tight">
        <div className="font-bold text-orange-900">Asia</div>
        <div className="font-khmer text-orange-900">អាស៊ី</div>
        <div className="text-stone-700 mt-1">vs. rest of world (40%)</div>
        <div className="text-stone-700 font-khmer leading-loose">ធៀបនឹងពិភពលោកនៅសល់ (៤០%)</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Cradle of Civilization (deep jungle green)
// ════════════════════════════════════════════════════════════════════════════

function CradleOfCivilizationCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-emerald-700 shadow-lg overflow-hidden flex flex-col text-emerald-50"
      style={{
        background:
          "linear-gradient(160deg, #064e3b 0%, #065f46 55%, #0f766e 100%)",
      }}
      data-testid="card-civilization"
    >
      <header className="px-5 pt-5 pb-3 border-b-2 border-emerald-400/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-900/60 border-2 border-amber-300/60 text-amber-200 flex items-center justify-center">
            <ScrollText className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · 02</span>
              <span className="opacity-50">/</span>
              <span>History</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ប្រវត្តិសាស្ត្រ</span>
            </div>
            <h3 className="font-bold text-lg text-amber-50 leading-tight">
              <span className="block">The Cradle of Civilization</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-amber-100/95">
                ប្រភពដើមនៃអរិយធម៌
              </span>
            </h3>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <BilingualBlock
          en={
            <>
              Asia carries enormous historical weight: it is the place <strong>where human civilization began</strong>.
            </>
          }
          kh={
            <>
              អាស៊ីមានទម្ងន់ប្រវត្តិសាស្ត្រដ៏ធំធេង ៖ វាគឺជាកន្លែងដែល <strong>អរិយធម៌មនុស្សបានចាប់ផ្ដើម</strong>។
            </>
          }
        />

        {/* Three "firsts" — bilingual rows with icons */}
        <div className="rounded-xl border-2 border-amber-300/40 bg-emerald-950/40 p-3">
          <SubLabel en="Three World Firsts" kh="បីយ៉ាងដំបូងបង្អស់របស់ពិភពលោក" />
          <ul className="space-y-2.5 mt-1">
            <FirstRow
              icon={Wheat}
              en={<><strong>The first farming</strong> — taming wheat, rice and barley.</>}
              kh={<><strong>កសិកម្មលើកដំបូង</strong> — ការ​ដាំ​ស្រូវ ស្រូវ​សាលី និង​ស្រូវ​បាល៉េ។</>}
            />
            <FirstRow
              icon={Building2}
              en={<><strong>The first cities</strong> — walled towns with markets and laws.</>}
              kh={<><strong>ទីក្រុងលើកដំបូង</strong> — ក្រុងមានកំពែង មានផ្សារ និងមានច្បាប់។</>}
            />
            <FirstRow
              icon={ScrollText}
              en={<><strong>The first written languages</strong> — clay-tablet writing.</>}
              kh={<><strong>ភាសាសរសេរលើកដំបូង</strong> — អក្សរ​នៅ​លើ​ផ្ទាំង​ដី​ឥដ្ឋ។</>}
            />
          </ul>
        </div>

        {/* Where: Mesopotamia + Indus Valley — stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <PlaceTag
            en="Mesopotamia"
            kh="មេសូប៉ូតាមៀ"
            descEn="(modern Iraq) — between the Tigris and Euphrates rivers"
            descKh="(អ៊ីរ៉ាក់​បច្ចុប្បន្ន) — ចន្លោះ​ទន្លេ Tigris និង Euphrates"
          />
          <PlaceTag
            en="Indus Valley"
            kh="ជ្រលងឥណ្ឌូ"
            descEn="(modern Pakistan / NW India) — along the Indus river"
            descKh="(ប៉ាគីស្ថាន​បច្ចុប្បន្ន / ឥណ្ឌា​ភាគ​ពាយព្យ) — តាម​បណ្ដោយ​ទន្លេ Indus"
          />
        </div>

        {/* Timeline visual */}
        <CivilizationTimeline />

        <div className="rounded-lg border-2 border-amber-300/60 bg-amber-300/10 p-2.5">
          <p className="text-sm font-bold text-amber-100 leading-snug">
            All of this happened <strong>thousands of years</strong> before the Roman Empire even existed.
          </p>
          <p className="text-sm font-bold text-amber-100 font-khmer leading-loose mt-1">
            ទាំងអស់នេះបានកើតឡើង <strong>រាប់ពាន់ឆ្នាំ</strong> មុនពេលដែលចក្រភពរ៉ូមាំងទោះជាមាន។
          </p>
        </div>
      </div>
    </article>
  );
}

function FirstRow({
  icon: Icon,
  en,
  kh,
}: {
  icon: typeof Wheat;
  en: React.ReactNode;
  kh: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 mt-1 flex-shrink-0 text-amber-200" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-relaxed">{en}</p>
        <p className="text-sm font-khmer leading-loose mt-0.5">{kh}</p>
      </div>
    </li>
  );
}

function PlaceTag({
  en,
  kh,
  descEn,
  descKh,
}: {
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
}) {
  return (
    <div className="rounded-lg bg-emerald-900/50 border border-amber-300/40 p-2.5">
      <div className="flex items-center gap-1.5 mb-0.5">
        <MapPin className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />
        <div className="font-bold text-amber-100 text-sm leading-tight">{en}</div>
      </div>
      <div className="font-khmer text-amber-100 text-sm leading-loose">{kh}</div>
      <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">{descEn}</p>
      <p className="text-[11px] text-emerald-100/80 font-khmer leading-loose">{descKh}</p>
    </div>
  );
}

// Horizontal timeline: Mesopotamia/Indus → Egypt/China → Rome
function CivilizationTimeline() {
  return (
    <div
      className="relative w-full h-28 rounded-lg overflow-hidden border-2 border-amber-300/40 bg-emerald-950/60 px-3 py-2"
      aria-hidden="true"
    >
      {/* Timeline base */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 112" preserveAspectRatio="none">
        <line x1="20" y1="68" x2="300" y2="68" stroke="#fcd34d" strokeWidth="1.2" />
        {/* Tick marks */}
        {[40, 110, 180, 250].map((x) => (
          <line key={x} x1={x} y1="62" x2={x} y2="74" stroke="#fcd34d" strokeWidth="1" />
        ))}
        {/* Era dots */}
        <circle cx="40" cy="68" r="6" fill="#fbbf24" />
        <circle cx="110" cy="68" r="5" fill="#a3e635" />
        <circle cx="250" cy="68" r="4" fill="#94a3b8" />
      </svg>

      <div className="absolute top-2 left-3 text-[10px] font-mono uppercase tracking-widest text-amber-200/80 flex flex-wrap gap-x-2">
        <span>Timeline</span>
        <span className="font-khmer normal-case tracking-normal text-[0.7rem]">ពេលវេលា</span>
      </div>

      {/* Labels above ticks */}
      <div className="absolute" style={{ left: "8%", top: "28%" }}>
        <div className="text-[10px] font-bold text-amber-100 leading-tight">
          ~3500 BCE
        </div>
        <div className="text-[10px] font-bold text-amber-100 font-khmer leading-tight">
          ~៣៥០០ មុន គ.ស.
        </div>
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-1 left-2 text-[10px] leading-tight">
        <div className="font-bold text-amber-100">Mesopotamia · Indus</div>
        <div className="font-khmer text-amber-100 leading-loose">មេសូប៉ូតាមៀ · ឥណ្ឌូ</div>
      </div>
      <div className="absolute bottom-1 left-1/3 text-[10px] leading-tight">
        <div className="font-bold text-lime-200">Egypt · China</div>
        <div className="font-khmer text-lime-200 leading-loose">អេហ្ស៊ីប · ចិន</div>
      </div>
      <div className="absolute bottom-1 right-2 text-[10px] leading-tight text-right">
        <div className="font-bold text-slate-200">~509 BCE Rome</div>
        <div className="font-khmer text-slate-200 leading-loose">~៥០៩ មុន គ.ស. រ៉ូម</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — The Extremes of the Earth (ocean blue)
// ════════════════════════════════════════════════════════════════════════════

function ExtremesOfEarthCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-sky-700 shadow-lg overflow-hidden flex flex-col text-sky-50"
      style={{
        background:
          "linear-gradient(160deg, #0c4a6e 0%, #075985 55%, #0369a1 100%)",
      }}
      data-testid="card-extremes"
    >
      <header className="px-5 pt-5 pb-3 border-b-2 border-sky-300/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-900/60 border-2 border-cyan-300/60 text-cyan-100 flex items-center justify-center">
            <Sparkles className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · 03</span>
              <span className="opacity-50">/</span>
              <span>Geography</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ភូមិសាស្ត្រ</span>
            </div>
            <h3 className="font-bold text-lg text-cyan-50 leading-tight">
              <span className="block">The Extremes of the Earth</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-cyan-100/95">
                ចំណុចកំពូលនៃផែនដី
              </span>
            </h3>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <BilingualBlock
          en={
            <>
              Asia holds the <strong>physical extremes</strong> of the planet's territory — the highest dry land above sea level, and the lowest dry land below it.
            </>
          }
          kh={
            <>
              អាស៊ីកាន់ <strong>ចំណុចកំពូលរូបវន្ត</strong> នៃដីលើផែនដី — ដីស្ងួតខ្ពស់បំផុតលើកម្រិតទឹកសមុទ្រ និងដីស្ងួតទាបបំផុតក្រោមកម្រិតនោះ។
            </>
          }
        />

        {/* Vertical elevation diagram */}
        <ElevationDiagram />

        {/* Highest */}
        <div className="rounded-xl border-2 border-cyan-300/60 bg-sky-950/50 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Mountain className="w-4 h-4 text-cyan-200" aria-hidden="true" />
            <SubLabel en="Highest Point" kh="ចំណុចខ្ពស់បំផុត" />
          </div>
          <p className="font-bold text-cyan-50 text-base leading-tight">
            Mount Everest
          </p>
          <p className="font-bold text-cyan-50 text-base font-khmer leading-loose">
            ភ្នំអេវឺរ៉េស
          </p>
          <p className="text-sm text-cyan-100/95 mt-1 leading-relaxed">
            On the border of <strong>Nepal</strong> and <strong>China</strong>, reaching <strong>8,848 meters</strong> into the sky.
          </p>
          <p className="text-sm text-cyan-100/95 font-khmer leading-loose">
            នៅព្រំដែន <strong>នេប៉ាល់</strong> និង <strong>ចិន</strong> ឡើងខ្ពស់ <strong>៨,៨៤៨ ម៉ែត្រ</strong> ឡើងលើមេឃ។
          </p>
          <div className="mt-2 inline-flex items-baseline gap-1.5 rounded-md bg-cyan-300/15 border border-cyan-300/50 px-2 py-1">
            <span className="font-display font-extrabold text-2xl text-cyan-100 leading-none">+8,848</span>
            <span className="text-[11px] font-mono text-cyan-200">m</span>
            <span className="text-[11px] font-khmer text-cyan-200">ម៉ែត្រ</span>
          </div>
        </div>

        {/* Lowest */}
        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-950/50 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-4 h-4 text-blue-200" aria-hidden="true" />
            <SubLabel en="Lowest Point" kh="ចំណុចទាបបំផុត" />
          </div>
          <p className="font-bold text-blue-50 text-base leading-tight">
            The Dead Sea
          </p>
          <p className="font-bold text-blue-50 text-base font-khmer leading-loose">
            សមុទ្រមរណៈ
          </p>
          <p className="text-sm text-blue-100/95 mt-1 leading-relaxed">
            In the <strong>Middle East</strong> (Jordan / Israel border), sitting <strong>430 meters below sea level</strong>.
          </p>
          <p className="text-sm text-blue-100/95 font-khmer leading-loose">
            នៅ <strong>មជ្ឈិមបូព៌ា</strong> (ព្រំដែន​ហ្ស៊កដានី / អ៊ីស្រាអែល) ស្ថិតនៅ <strong>៤៣០ ម៉ែត្រក្រោមកម្រិតទឹកសមុទ្រ</strong>។
          </p>
          <div className="mt-2 inline-flex items-baseline gap-1.5 rounded-md bg-blue-300/15 border border-blue-300/50 px-2 py-1">
            <span className="font-display font-extrabold text-2xl text-blue-100 leading-none">−430</span>
            <span className="text-[11px] font-mono text-blue-200">m</span>
            <span className="text-[11px] font-khmer text-blue-200">ម៉ែត្រ</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Vertical elevation diagram: Everest peak vs sea level vs Dead Sea
function ElevationDiagram() {
  return (
    <div
      className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-cyan-300/40"
      style={{
        background:
          "linear-gradient(180deg, #0c4a6e 0%, #38bdf8 60%, #0e7490 60.5%, #1e3a8a 100%)",
      }}
      aria-hidden="true"
    >
      {/* Sky/water boundary = sea level (60%) */}
      <div className="absolute left-0 right-0" style={{ top: "60%" }}>
        <div className="h-px bg-cyan-100/80" />
        <div className="absolute -top-3 left-2 text-[10px] font-mono font-bold text-cyan-50 bg-sky-900/70 px-1.5 py-0.5 rounded">
          SEA LEVEL · 0 m
        </div>
        <div className="absolute -top-3 right-2 text-[10px] font-khmer font-bold text-cyan-50 bg-sky-900/70 px-1.5 py-0.5 rounded leading-loose">
          កម្រិតទឹកសមុទ្រ · ០ ម៉ែត្រ
        </div>
      </div>

      {/* Everest peak — left side, towering up */}
      <svg
        className="absolute left-2 bottom-[40%] w-28 h-32"
        viewBox="0 0 80 100"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Snowy peak */}
        <polygon points="40,4 78,96 2,96" fill="#e0f2fe" stroke="#475569" strokeWidth="1.5" />
        <polygon points="40,4 28,42 52,42" fill="#ffffff" />
        {/* Rock layer */}
        <polygon points="2,96 78,96 70,80 56,75 44,82 30,76 14,82" fill="#475569" opacity="0.4" />
      </svg>
      <div className="absolute left-3 top-2 text-[10px] leading-tight">
        <div className="font-bold text-cyan-50 bg-sky-950/70 px-1.5 py-0.5 rounded inline-block">
          Everest +8,848 m
        </div>
        <div className="font-bold text-cyan-50 font-khmer bg-sky-950/70 px-1.5 py-0.5 rounded inline-block mt-1 leading-loose">
          អេវឺរ៉េស +៨,៨៤៨ ម៉ែត្រ
        </div>
      </div>

      {/* Dead Sea — right side, below sea level */}
      <svg
        className="absolute right-2 top-[60%] w-28 h-16"
        viewBox="0 0 80 50"
        preserveAspectRatio="xMaxYMin meet"
      >
        {/* Depression with water inside */}
        <path d="M0,0 L18,28 L62,28 L80,0 L80,50 L0,50 Z" fill="#1e3a8a" />
        <ellipse cx="40" cy="32" rx="22" ry="5" fill="#0891b2" opacity="0.85" />
      </svg>
      <div className="absolute right-3 bottom-2 text-[10px] leading-tight text-right">
        <div className="font-bold text-blue-50 bg-blue-950/80 px-1.5 py-0.5 rounded inline-block">
          Dead Sea −430 m
        </div>
        <div className="font-bold text-blue-50 font-khmer bg-blue-950/80 px-1.5 py-0.5 rounded inline-block mt-1 leading-loose">
          សមុទ្រមរណៈ −៤៣០ ម៉ែត្រ
        </div>
      </div>
    </div>
  );
}
