import { Link } from "wouter";
import {
  ArrowLeft,
  Globe2,
  Users,
  Mountain,
  TreePine,
  Ship,
  Pyramid,
  Droplets,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-LATAM-01 · Central & South America: The Connected Continents
//                ទ្វីបដែលតភ្ជាប់គ្នា៖ អាមេរិកកណ្តាល និងអាមេរិកខាងត្បូង
//
//  Three strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. The Scale and The People       — jungle-emerald + warm earth (history)
//   2. The Andes & The Amazon         — mountain-stone slate → forest green
//   3. The Panama Canal               — deep ocean blue (engineering marvel)
//
//  Aesthetic per request: jungle greens, mountain stone, deep ocean blues.
// ════════════════════════════════════════════════════════════════════════════

export function LatinAmericaPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden">
      <LatinAmericaBg />

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
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm flex-wrap">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Study Center · Geography</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">មជ្ឈមណ្ឌលសិក្សា · ភូមិសាស្ត្រ</span>
          <span className="font-mono opacity-60">· STC-LATAM-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight"
        >
          Central & South America:{" "}
          <span className="text-emerald-700">The Connected Continents</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-stone-800">
          អាមេរិកកណ្តាល និងអាមេរិកខាងត្បូង៖{" "}
          <span className="text-emerald-700">ទ្វីបដែលតភ្ជាប់គ្នា</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-stone-700 text-base leading-relaxed">
            One enormous land bridge from the deserts of Mexico down to the
            freezing edge of the Southern Ocean — home to ancient stone
            pyramids, the longest mountain range on Earth, the largest
            rainforest, and one of the greatest engineering marvels ever built.
          </p>
          <p className="text-stone-700 text-base font-khmer leading-loose">
            ស្ពានដីដ៏ធំសម្បើមមួយពីវាលខ្សាច់នៃប្រទេសមិកស៊ិក ចុះទៅគែមត្រជាក់នៃមហាសមុទ្រខាងត្បូង — ជាស្រុកកំណើតនៃពីរ៉ាមីតថ្មបុរាណ ជួរភ្នំវែងបំផុតលើផែនដី ព្រៃភ្លៀងធំបំផុត និងស្នាដៃវិស្វកម្មដ៏អស្ចារ្យបំផុតមួយដែលធ្លាប់ត្រូវបានសាងសង់។
          </p>
        </div>
      </header>

      {/* Three cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScaleAndPeopleCard />
          <AndesAndAmazonCard />
          <PanamaCanalCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-emerald-300 bg-emerald-50/80 px-6 py-4 text-stone-800">
          <p className="font-serif italic">
            “Two continents joined by a thread of land — and reshaped forever
            by a trench cut through it.”
          </p>
          <p className="font-khmer not-italic leading-loose text-stone-700 mt-1">
            «ទ្វីបពីរត្រូវបានភ្ជាប់ដោយខ្សែដីមួយ — ហើយត្រូវបានផ្លាស់ប្តូររូបរាងជារៀងរហូត ដោយព្រែកមួយដែលត្រូវបានជីកកាត់វា។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LatinAmericaPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — topographical gradient (sky → mountain stone → jungle → ocean)
// ════════════════════════════════════════════════════════════════════════════

function LatinAmericaBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ecfeff 0%, #e7f5ed 22%, #d8e8d4 48%, #cdd5c4 70%, #b8d3de 100%)",
        }}
      />
      {/* Decorative topographical contour lines (very faint) */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern
            id="latam-contours"
            x="0"
            y="0"
            width="240"
            height="180"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-20,90 Q60,30 140,90 T300,90"
              fill="none"
              stroke="#0f766e"
              strokeWidth="0.6"
              opacity="0.10"
            />
            <path
              d="M-20,130 Q60,80 140,130 T300,130"
              fill="none"
              stroke="#0f766e"
              strokeWidth="0.6"
              opacity="0.08"
            />
            <path
              d="M-20,50 Q60,5 140,50 T300,50"
              fill="none"
              stroke="#0f766e"
              strokeWidth="0.6"
              opacity="0.06"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#latam-contours)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared bilingual primitives (kept local to avoid component bloat elsewhere)
// ════════════════════════════════════════════════════════════════════════════

function BilingualBlock({
  en,
  kh,
  toneClass = "text-stone-900",
}: {
  en: React.ReactNode;
  kh: React.ReactNode;
  toneClass?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className={`text-sm leading-relaxed ${toneClass}`}>{en}</p>
      <p className={`text-sm font-khmer leading-loose ${toneClass}`}>{kh}</p>
    </div>
  );
}

function SubLabel({
  en,
  kh,
  toneClass = "text-stone-700",
}: {
  en: string;
  kh: string;
  toneClass?: string;
}) {
  return (
    <div
      className={`text-[10px] font-mono uppercase tracking-widest mb-1 flex flex-wrap gap-x-2 ${toneClass}`}
    >
      <span>{en}</span>
      <span className="opacity-50">/</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">
        {kh}
      </span>
    </div>
  );
}

function StatBlock({
  big,
  unitEn,
  unitKh,
  captionEn,
  captionKh,
  accent = "border-emerald-500",
  bigToneClass = "text-emerald-900",
  bgClass = "bg-white/80",
}: {
  big: string;
  unitEn: string;
  unitKh: string;
  captionEn: string;
  captionKh: string;
  accent?: string;
  bigToneClass?: string;
  bgClass?: string;
}) {
  return (
    <div className={`rounded-xl border-2 ${accent} ${bgClass} p-3`}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`text-3xl font-extrabold ${bigToneClass}`}>{big}</span>
        <span className="text-sm font-bold text-stone-700">{unitEn}</span>
        <span className="text-sm font-bold text-stone-700 font-khmer">
          {unitKh}
        </span>
      </div>
      <p className="text-xs text-stone-700 mt-1 leading-snug">{captionEn}</p>
      <p className="text-xs text-stone-700 font-khmer leading-loose">
        {captionKh}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Scale and The People (warm jungle earth tones)
// ════════════════════════════════════════════════════════════════════════════

function ScaleAndPeopleCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-emerald-700 shadow-lg overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #f0fdf4 0%, #d1fae5 50%, #a7f3d0 100%)",
      }}
      data-testid="card-scale-and-people"
    >
      <header className="px-5 pt-5 pb-3 border-b-2 border-emerald-300/70">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-200 border-2 border-emerald-600 text-emerald-800 flex items-center justify-center">
            <Users className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <SubLabel en="Card · 01 / Scale & People" kh="ទំហំ និងប្រជាជន" toneClass="text-emerald-800" />
            <h3 className="font-bold text-lg text-emerald-950 leading-tight">
              <span className="block">The Scale and The People</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-emerald-900">
                ទំហំ និងប្រជាជន
              </span>
            </h3>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <BilingualBlock
          en={
            <>
              This massive region acts as a{" "}
              <strong>land bridge</strong> connecting North America all the way
              down to the freezing <strong>Southern Ocean</strong> at the tip
              of Antarctica.
            </>
          }
          kh={
            <>
              តំបន់ដ៏ធំសម្បើមនេះដើរតួជា{" "}
              <strong>ស្ពានដី</strong> ដែលភ្ជាប់អាមេរិកខាងជើងចុះទៅដល់{" "}
              <strong>មហាសមុទ្រខាងត្បូង</strong> ដែលត្រជាក់​នៅ​ចុង​ទ្វីប​អង់តាក់ទិក។
            </>
          }
        />

        {/* Population & Countries stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <StatBlock
            big="650M+"
            unitEn="People"
            unitKh="នាក់"
            captionEn="Over 650 million people call this region home."
            captionKh="ប្រជាជនជាង ៦៥០ លាននាក់ហៅតំបន់នេះថាជាស្រុកកំណើត។"
            accent="border-emerald-600"
          />
          <StatBlock
            big="27"
            unitEn="Countries"
            unitKh="ប្រទេស"
            captionEn="From Mexico in the north to Argentina & Chile in the south."
            captionKh="ពីប្រទេសមិកស៊ិកនៅខាងជើង រហូតដល់អាហ្សង់ទីន និងឈីលីនៅខាងត្បូង។"
            accent="border-teal-600"
          />
        </div>

        {/* Region split — Central vs South */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-emerald-100 border border-emerald-500 p-2">
            <SubLabel en="Central America" kh="អាមេរិកកណ្តាល" toneClass="text-emerald-800" />
            <p className="text-sm font-bold text-emerald-950 leading-snug">
              Mexico → Panama
            </p>
            <p className="text-sm font-bold text-emerald-950 font-khmer leading-loose">
              មិកស៊ិក → ប៉ាណាម៉ា
            </p>
          </div>
          <div className="rounded-lg bg-teal-100 border border-teal-500 p-2">
            <SubLabel en="South America" kh="អាមេរិកខាងត្បូង" toneClass="text-teal-800" />
            <p className="text-sm font-bold text-teal-950 leading-snug">
              Colombia → Chile
            </p>
            <p className="text-sm font-bold text-teal-950 font-khmer leading-loose">
              កូឡុំប៊ី → ឈីលី
            </p>
          </div>
        </div>

        {/* Ancient civilizations callout */}
        <div className="rounded-xl bg-amber-50 border-2 border-amber-500 p-3 mt-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Pyramid className="w-5 h-5 text-amber-700" aria-hidden="true" />
            <SubLabel
              en="Ancient Civilizations"
              kh="អរិយធម៌បុរាណ"
              toneClass="text-amber-800"
            />
          </div>
          <BilingualBlock
            toneClass="text-amber-950"
            en={
              <>
                Long before Europeans arrived, this land was home to brilliant
                ancient civilizations — the{" "}
                <strong>Maya</strong>, the <strong>Aztecs</strong>, and the{" "}
                <strong>Incas</strong> — who built massive stone pyramids deep
                in the jungle, very similar to the Khmer Empire's{" "}
                <strong>Angkor Wat</strong>!
              </>
            }
            kh={
              <>
                យូរណាស់មុនពេលអ្នកអឺរ៉ុបមកដល់ ដីនេះធ្លាប់ជាស្រុកកំណើតនៃអរិយធម៌បុរាណដ៏ឆ្លាតវៃ — ពួក{" "}
                <strong>ម៉ាយ៉ា</strong> ពួក <strong>អាស្ទែក</strong> និងពួក{" "}
                <strong>អាំងកា</strong> — ដែលបានសាងសង់ពីរ៉ាមីតថ្មដ៏ធំសម្បើមនៅជ្រៅក្នុងព្រៃ ស្រដៀងគ្នាខ្លាំងណាស់នឹង{" "}
                <strong>អង្គរវត្ត</strong> នៃចក្រភពខ្មែរ!
              </>
            }
          />
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Andes & The Amazon (mountain stone → deep jungle green)
// ════════════════════════════════════════════════════════════════════════════

function AndesAndAmazonCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-emerald-800 shadow-lg overflow-hidden flex flex-col text-emerald-50"
      style={{
        background:
          "linear-gradient(160deg, #1e293b 0%, #334155 22%, #14532d 60%, #166534 100%)",
      }}
      data-testid="card-andes-amazon"
    >
      <header className="px-5 pt-5 pb-3 border-b-2 border-emerald-400/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800/70 border-2 border-emerald-300/60 text-emerald-200 flex items-center justify-center">
            <Mountain className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <SubLabel
              en="Card · 02 / Geography"
              kh="ភូមិសាស្ត្រ"
              toneClass="text-emerald-200/90"
            />
            <h3 className="font-bold text-lg leading-tight text-emerald-50">
              <span className="block">The Andes & The Amazon</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-emerald-100">
                ជួរភ្នំអង់ដេស និងព្រៃអាម៉ាហ្សូន
              </span>
            </h3>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <BilingualBlock
          toneClass="text-emerald-50"
          en={
            <>
              On this continent, the{" "}
              <strong>physical territory dictates the climate</strong>. The
              mountains decide where it rains, and where it does not.
            </>
          }
          kh={
            <>
              នៅលើទ្វីបនេះ <strong>ភូមិសាស្ត្ររូបវន្តកំណត់នូវអាកាសធាតុ</strong>។ ភ្នំសម្រេចថាកន្លែងណាមានភ្លៀងធ្លាក់ និងកន្លែងណាគ្មាន។
            </>
          }
        />

        {/* The Andes block */}
        <div className="rounded-xl bg-slate-900/60 border-2 border-slate-400/60 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Mountain className="w-5 h-5 text-slate-200" aria-hidden="true" />
            <SubLabel
              en="The Andes — A Wall of Stone"
              kh="ជួរភ្នំអង់ដេស — ជញ្ជាំងថ្ម"
              toneClass="text-slate-200"
            />
          </div>
          <p className="text-sm leading-relaxed text-emerald-50">
            The <strong>longest continuous mountain range on Earth</strong>{" "}
            runs down the entire western edge of South America. It acts like a
            massive physical wall — blocking weather as it tries to cross.
          </p>
          <p className="text-sm font-khmer leading-loose text-emerald-50 mt-1">
            <strong>ជួរភ្នំជាប់គ្នាវែងបំផុតលើផែនដី</strong> រត់ចុះតាមគែមខាងលិចទាំងមូលនៃអាមេរិកខាងត្បូង។ វាដើរតួជាជញ្ជាំងរូបវន្តដ៏ធំសម្បើម — ទប់ស្កាត់អាកាសធាតុនៅពេលដែលវាព្យាយាមឆ្លងកាត់។
          </p>
        </div>

        {/* Mini diagram: wet air rises, rains east of the mountains */}
        <RainShadowDiagram />

        {/* The Amazon block */}
        <div className="rounded-xl bg-emerald-900/60 border-2 border-emerald-300/60 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <TreePine
              className="w-5 h-5 text-emerald-200"
              aria-hidden="true"
            />
            <SubLabel
              en="The Amazon — Lungs of the Earth"
              kh="ព្រៃអាម៉ាហ្សូន — សួតនៃផែនដី"
              toneClass="text-emerald-200"
            />
          </div>
          <p className="text-sm leading-relaxed text-emerald-50">
            Because the mountains trap the wet air, it falls back as rain east
            of the Andes — feeding the <strong>Amazon basin</strong>, the{" "}
            <strong>largest rainforest on Earth</strong>. We call it{" "}
            <strong>“the Lungs of the Earth” (សួតនៃផែនដី)</strong> because its
            millions of trees produce roughly{" "}
            <strong>20% of the world's oxygen</strong> while trapping deadly
            carbon dioxide.
          </p>
          <p className="text-sm font-khmer leading-loose text-emerald-50 mt-1">
            ដោយសារតែភ្នំបានស្ទាក់ចាប់ខ្យល់សើម វាធ្លាក់មកវិញជាភ្លៀងនៅខាងកើតនៃជួរភ្នំអង់ដេស — ផ្តល់​ទឹក​ដល់​<strong>ឆ្នេរ​ទន្លេ​អាម៉ាហ្សូន</strong> ដែល​ជា<strong>ព្រៃភ្លៀងធំបំផុតលើផែនដី</strong>។ យើងហៅវាថា <strong>«សួតនៃផែនដី»</strong> ពីព្រោះដើមឈើរាប់លានដើមរបស់វាផលិត <strong>ប្រហែល ២០% នៃអុកស៊ីហ្សែននៃពិភពលោក</strong> ខណៈពេលដែលវាស្ទាក់ចាប់ឧស្ម័នកាបូនឌីអុកស៊ីតដ៏ឆ្លងជំងឺ។
          </p>
        </div>
      </div>
    </article>
  );
}

// Tiny SVG: wet air rises over mountains, rains on the eastern jungle side
function RainShadowDiagram() {
  return (
    <div
      className="rounded-xl bg-slate-950/40 border border-emerald-300/30 p-3"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 110" className="w-full h-24">
        {/* Pacific Ocean (left) */}
        <rect x="0" y="80" width="80" height="30" fill="#0e7490" />
        <text x="6" y="96" fontSize="9" fill="#cffafe" fontWeight="bold">
          Pacific
        </text>
        <text
          x="6"
          y="106"
          fontSize="7.5"
          fill="#cffafe"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ប៉ាស៊ីហ្វិក
        </text>
        {/* Andes triangle */}
        <polygon points="70,80 130,15 200,80" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
        <polygon points="120,30 130,15 145,40" fill="#e2e8f0" />
        {/* Amazon jungle (right) */}
        <rect x="200" y="80" width="120" height="30" fill="#166534" />
        <text x="240" y="96" fontSize="9" fill="#dcfce7" fontWeight="bold">
          Amazon
        </text>
        <text
          x="240"
          y="106"
          fontSize="7.5"
          fill="#dcfce7"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          អាម៉ាហ្សូន
        </text>
        {/* Wet air arrow rising up the western face */}
        <g stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M30 85 Q70 80 105 35" />
          {/* arrowhead at the tip */}
          <path d="M101 33 L107 36 L103 41" strokeLinejoin="round" />
        </g>
        <text x="14" y="74" fontSize="8" fill="#7dd3fc" fontWeight="bold">
          wet air
        </text>
        <text
          x="14"
          y="83"
          fontSize="7"
          fill="#7dd3fc"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ខ្យល់សើម
        </text>
        {/* Rain drops on eastern slope */}
        <g fill="#22d3ee">
          <ellipse cx="170" cy="55" rx="2" ry="3.5" />
          <ellipse cx="180" cy="62" rx="2" ry="3.5" />
          <ellipse cx="190" cy="50" rx="2" ry="3.5" />
          <ellipse cx="200" cy="60" rx="2" ry="3.5" />
          <ellipse cx="215" cy="55" rx="2" ry="3.5" />
          <ellipse cx="225" cy="65" rx="2" ry="3.5" />
        </g>
        <text x="225" y="36" fontSize="8" fill="#22d3ee" fontWeight="bold">
          rain
        </text>
        <text
          x="225"
          y="45"
          fontSize="7"
          fill="#22d3ee"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ភ្លៀង
        </text>
      </svg>
      <div className="flex items-center justify-between text-[11px] text-emerald-100/80 mt-1">
        <span>← Pacific moisture climbs the Andes…</span>
        <span>…and falls as rain on the Amazon →</span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-emerald-100/80 font-khmer leading-loose">
        <span>← សំណើមមហាសមុទ្រប៉ាស៊ីហ្វិកឡើងលើជួរភ្នំអង់ដេស</span>
        <span>ហើយធ្លាក់ជាភ្លៀងលើព្រៃអាម៉ាហ្សូន →</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — The Panama Canal (deep ocean blue · engineering marvel)
// ════════════════════════════════════════════════════════════════════════════

function PanamaCanalCard() {
  return (
    <article
      className="relative rounded-3xl border-2 border-sky-700 shadow-lg overflow-hidden flex flex-col text-sky-50"
      style={{
        background:
          "linear-gradient(160deg, #082f49 0%, #0c4a6e 50%, #0e7490 100%)",
      }}
      data-testid="card-panama-canal"
    >
      <header className="px-5 pt-5 pb-3 border-b-2 border-sky-400/40">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-900/60 border-2 border-sky-300/60 text-sky-200 flex items-center justify-center">
            <Ship className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <SubLabel
              en="Card · 03 / Engineering"
              kh="វិស្វកម្ម"
              toneClass="text-sky-200/90"
            />
            <h3 className="font-bold text-lg leading-tight text-sky-50">
              <span className="block">The Panama Canal</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-sky-100">
                ព្រែកជីកប៉ាណាម៉ា
              </span>
            </h3>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <div className="rounded-lg bg-sky-900/50 border border-sky-300/40 p-2.5">
          <SubLabel
            en="Connecting Lesson"
            kh="មេរៀនភ្ជាប់"
            toneClass="text-amber-200"
          />
          <p className="text-xs text-sky-50 leading-snug">
            Builds on our earlier lessons on{" "}
            <strong>Pumps & Water Mechanics</strong>.
          </p>
          <p className="text-xs text-sky-50 font-khmer leading-loose">
            បន្តពីមេរៀនមុនរបស់យើងស្តីពី <strong>ស្នប់ និងមេកានិចទឹក</strong>។
          </p>
        </div>

        <BilingualBlock
          toneClass="text-sky-50"
          en={
            <>
              Panama is a <strong>tiny strip of land</strong> that connects
              Central and South America — but it sits between two giant
              oceans. Without it, every cargo ship going from the Atlantic to
              the Pacific had to sail an extra <strong>13,000 kilometres</strong>{" "}
              around the dangerous bottom of South America.
            </>
          }
          kh={
            <>
              ប៉ាណាម៉ាគឺជា <strong>ខ្សែដីតូចមួយ</strong> ដែលភ្ជាប់អាមេរិកកណ្តាល និងអាមេរិកខាងត្បូង — ប៉ុន្តែ​វា​ស្ថិត​នៅ​ចន្លោះ​មហាសមុទ្រ​យក្ស​ពីរ។ បើគ្មានវាទេ កប៉ាល់ដឹកទំនិញគ្រប់​លំ​ពី​មហាសមុទ្រ​អាត្លង់ទិក​ទៅ​ប៉ាស៊ីហ្វិក​ត្រូវ​ធ្វើ​ដំណើរ​បន្ថែម <strong>១៣,០០០ គីឡូម៉ែត្រ</strong> ​ជុំវិញ​ចុង​អាមេរិក​ខាង​ត្បូង​ដ៏​គ្រោះថ្នាក់។
            </>
          }
        />

        {/* Lock-system diagram */}
        <WaterLockDiagram />

        <div className="rounded-xl bg-sky-900/50 border-2 border-sky-300/50 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Droplets className="w-5 h-5 text-sky-200" aria-hidden="true" />
            <SubLabel
              en="Water Locks — The Giant Elevators"
              kh="ព្រែករូប — ជណ្តើរយន្តដ៏ធំ"
              toneClass="text-sky-200"
            />
          </div>
          <p className="text-sm leading-relaxed text-sky-50">
            Because the mountains in the middle are <strong>higher than the
            ocean</strong>, engineers couldn't just dig a flat trench — the
            water would all run downhill. Instead, the canal uses a system of
            massive <strong>“water locks”</strong> — essentially{" "}
            <strong>giant water elevators</strong> — that lift{" "}
            <strong>50,000-ton cargo ships</strong> over the mountains using
            nothing but <strong>gravity and water pressure</strong>.
          </p>
          <p className="text-sm font-khmer leading-loose text-sky-50 mt-1">
            ដោយសារ​ភ្នំ​នៅ​កណ្តាល <strong>ខ្ពស់​ជាង​មហាសមុទ្រ</strong> វិស្វករ​មិន​អាច​ជីក​ត្រឹម​ខ្នង​ផ្ទាល់​បាន​ទេ — ទឹក​នឹង​ហូរ​ចុះ​ទាប។ ផ្ទុយ​ទៅ​វិញ ព្រែក​ជីក​នេះ​ប្រើ​ប្រព័ន្ធ​នៃ <strong>«ព្រែករូប»</strong> ​ដ៏​ធំ​សម្បើម — ដែល​ជា <strong>ជណ្តើរយន្ត​ទឹក​យក្ស</strong> — ដែល​លើក <strong>កប៉ាល់​ដឹក​ទំនិញ​ទម្ងន់ ៥០,០០០ តោន</strong> ​ឆ្លង​លើ​ភ្នំ​ដោយ​ប្រើ​​តែ <strong>ទំនាញ និង​សម្ពាធ​ទឹក</strong>។
          </p>
        </div>
      </div>
    </article>
  );
}

// 3-step lock diagram: ship enters at sea level → lock fills → ship lifted up
function WaterLockDiagram() {
  return (
    <div
      className="rounded-xl bg-sky-950/60 border border-sky-300/30 p-3"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 90" className="w-full h-20">
        {/* Three lock chambers stepping up like a staircase */}
        {/* Chamber 1 — sea level */}
        <rect x="10" y="55" width="90" height="25" fill="#0c4a6e" stroke="#bae6fd" strokeWidth="1" />
        <rect x="14" y="62" width="82" height="13" fill="#38bdf8" />
        {/* Chamber 2 — middle */}
        <rect x="115" y="40" width="90" height="40" fill="#0c4a6e" stroke="#bae6fd" strokeWidth="1" />
        <rect x="119" y="49" width="82" height="28" fill="#38bdf8" />
        {/* Chamber 3 — top (lake) */}
        <rect x="220" y="20" width="90" height="60" fill="#0c4a6e" stroke="#bae6fd" strokeWidth="1" />
        <rect x="224" y="32" width="82" height="46" fill="#38bdf8" />
        {/* Tiny ship in chamber 1 */}
        <rect x="40" y="56" width="22" height="6" rx="1" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
        <polygon points="40,56 35,62 40,62" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
        {/* Step labels — bilingual EN above, KH below */}
        <text x="40" y="44" fontSize="8" fill="#cffafe" fontWeight="bold">
          Sea level
        </text>
        <text
          x="40"
          y="53"
          fontSize="7"
          fill="#cffafe"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          កម្រិតទឹកសមុទ្រ
        </text>
        <text x="135" y="29" fontSize="8" fill="#cffafe" fontWeight="bold">
          Lock fills
        </text>
        <text
          x="135"
          y="38"
          fontSize="7"
          fill="#cffafe"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ព្រែករូបពេញ
        </text>
        <text x="240" y="9" fontSize="8" fill="#cffafe" fontWeight="bold">
          26 m above sea
        </text>
        <text
          x="240"
          y="17"
          fontSize="7"
          fill="#cffafe"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ២៦ម៉ែត្រលើទឹកសមុទ្រ
        </text>
        {/* Up arrows between chambers (native SVG so they actually render at x/y) */}
        <g stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M105 75 L105 50 M100 55 L105 50 L110 55" />
          <path d="M210 70 L210 35 M205 40 L210 35 L215 40" />
        </g>
      </svg>
      <div className="flex items-center justify-between text-[11px] text-sky-100/80 mt-1">
        <span className="flex items-center gap-1">
          <ArrowDown className="w-3 h-3" /> Atlantic side
        </span>
        <span className="flex items-center gap-1">
          Pacific side <ArrowUp className="w-3 h-3" />
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-sky-100/80 font-khmer leading-loose">
        <span>← ខាងអាត្លង់ទិក</span>
        <span>ខាងប៉ាស៊ីហ្វិក →</span>
      </div>
    </div>
  );
}
