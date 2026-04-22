import { Link } from "wouter";
import {
  ArrowLeft,
  Columns3,
  Crown,
  Castle,
  Factory,
  Handshake,
  Users,
  Coins,
  Flag,
  Sparkles,
  MapPin,
  Plane,
  Info,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STUDY-EU · Europe & The EU: 3000 Years of History
//             អឺរ៉ុប និងសហភាពអឺរ៉ុប៖ ប្រវត្តិសាស្ត្រ ៣០០០ ឆ្នាំ
//
//  1. Quick history of Europe — vertical timeline (4 eras)
//  2. The European Union — origin + Fast Facts grid
//  3. The Schengen Area — open-borders callout
//
//  Aesthetic: Museum — deep navy (EU flag) + warm gold accents.
// ════════════════════════════════════════════════════════════════════════════

export default function EuropeHistoryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-[#f7f4ec] text-slate-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0a1f5b] via-[#102b76] to-[#0a1f5b] text-white border-b-4 border-amber-400">
        <EuStarsBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-amber-200 hover:text-amber-100 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-amber-400/15 backdrop-blur border border-amber-300/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-200">
            <Columns3 className="w-3.5 h-3.5" />
            STUDY-EU · HISTORY · CIVICS
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl drop-shadow ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? (
              <>
                អឺរ៉ុប និងសហភាពអឺរ៉ុប —{" "}
                <span className="text-amber-300">ប្រវត្តិសាស្ត្រ ៣០០០ ឆ្នាំ</span>
              </>
            ) : (
              <>
                Europe &amp; The EU —{" "}
                <span className="text-amber-300">3000 Years of History</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-blue-100 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ពីផ្លូវរបស់រ៉ូម តាមរយៈប្រាសាទមជ្ឈិមសម័យ និងភាពភ័យខ្លាចនៃសង្គ្រាមលោក រហូតដល់ការពិសោធន៍សន្តិភាពដ៏ក្លាហាន — សហភាពអឺរ៉ុប — ដែលផ្លាស់ប្តូរសត្រូវឱ្យក្លាយជាដៃគូ។"
              : "From the roads of Rome, through medieval castles and the horror of two World Wars, to a bold peace experiment — the European Union — that turned enemies into partners."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat valueEn="3000+" labelEn="Years of history" labelKh="ឆ្នាំនៃប្រវត្តិសាស្ត្រ" isKh={isKh} />
            <Stat valueEn="27" labelEn="EU member states" labelKh="រដ្ឋសមាជិកសហភាពអឺរ៉ុប" isKh={isKh} />
            <Stat valueEn="448 M" labelEn="People in the union" labelKh="ប្រជាជននៅក្នុងសហភាព" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: Quick History Timeline ─────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Three thousand years in four chapters"
        eyebrowKh="បីពាន់ឆ្នាំក្នុងជំពូកបួន"
        titleEn="A Quick History of Europe"
        titleKh="ប្រវត្តិសាស្ត្រសង្ខេបនៃទ្វីបអឺរ៉ុប"
        descEn="Europe's story is layered like an old painting — every century leaves a mark on the next. Here are the four eras you absolutely need to know in order to understand the continent and its modern union."
        descKh="រឿងរ៉ាវរបស់អឺរ៉ុបមានស្រទាប់ដូចជាគំនូរចាស់មួយ — រាល់សតវត្សរ៍ទុកស្នាមនៅលើសតវត្សរ៍បន្ទាប់។ នេះគឺជាយុគទាំងបួន ដែលអ្នកត្រូវដឹងដាច់ខាត ដើម្បីយល់ពីទ្វីប និងសហភាពទំនើបរបស់វា។"
        isKh={isKh}
      >
        <HistoryTimeline isKh={isKh} />
      </Section>

      {/* ── Section 2: The European Union ─────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The peace experiment"
        eyebrowKh="ការពិសោធន៍សន្តិភាព"
        titleEn="The European Union"
        titleKh="សហភាពអឺរ៉ុប"
        descEn="After the Second World War flattened cities from London to Berlin, a small group of European leaders tried something radical: instead of preparing for the next war, they tied their economies so tightly together that war would simply become impossible."
        descKh="បន្ទាប់ពីសង្គ្រាមលោកលើកទីពីរបានបំផ្លាញទីក្រុងនានាពីទីក្រុងឡុងដ៏ដល់ប៊ែកឡាំង មេដឹកនាំអឺរ៉ុបមួយក្រុមតូចបានសាកល្បងអ្វីដ៏រ៉ាឌីកាល់៖ ជំនួសឱ្យការត្រៀមខ្លួនសម្រាប់សង្គ្រាមបន្ទាប់ ពួកគេបានចងសេដ្ឋកិច្ចរបស់ពួកគេយ៉ាងតឹងម៉ឺងជាមួយគ្នា ដូច្នេះសង្គ្រាមនឹងក្លាយជាមិនអាចទៅរួច។"
        isKh={isKh}
      >
        <EuStory isKh={isKh} />
        <FastFactsGrid isKh={isKh} />
      </Section>

      {/* ── Section 3: Schengen Area ──────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="Borders that vanished"
        eyebrowKh="ព្រំដែនដែលបាត់"
        titleEn="The Schengen Area"
        titleKh="តំបន់សិនជេន (តំបន់គ្មានព្រំដែន)"
        descEn="Of all the EU's experiments, the most quietly amazing one is this: 29 European countries simply agreed to take down their internal border checkpoints. The result feels like magic to anyone used to passport queues."
        descKh="ក្នុងចំណោមការពិសោធន៍ទាំងអស់របស់សហភាពអឺរ៉ុប អ្វីដ៏អស្ចារ្យបំផុតដោយស្ងៀមស្ងាត់គឺ៖ ប្រទេស ២៩ ក្នុងទ្វីបអឺរ៉ុបបានឯកភាពគ្នាដកព្រំដែនខាងក្នុងចេញ។ លទ្ធផលមានអារម្មណ៍ដូចជាមន្តអាគម សម្រាប់អ្នកដែលធ្លាប់ឈរជួររង់ចាំលិខិតឆ្លងដែន។"
        isKh={isKh}
      >
        <SchengenJourney isKh={isKh} />
        <AseanNote isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-[#0a1f5b] text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-[#0a1f5b] text-amber-300 rounded-sm px-2.5 py-0.5">
          SEC-{spec}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-amber-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-[#0a1f5b] mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-700 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Stat({ valueEn, labelEn, labelKh, isKh }: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur border border-amber-300/30 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-amber-300 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-blue-100 mt-1 ${isKh ? "font-khmer" : ""}`}>{isKh ? labelKh : labelEn}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Vertical timeline (4 eras)
// ════════════════════════════════════════════════════════════════════════════

type Era = {
  Icon: React.ComponentType<{ className?: string }>;
  yearsEn: string; yearsKh: string;
  labelEn: string; labelKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  legacy: { en: string; kh: string }[];
  swatch: string; // tailwind bg
};

const ERAS: Era[] = [
  {
    Icon: Columns3,
    yearsEn: "27 BC – 476 AD",
    yearsKh: "២៧ មុន គ.ស. – ៤៧៦ គ.ស.",
    labelEn: "ERA 01 · ROMAN EMPIRE",
    labelKh: "យុគទី ១ · ចក្រភពរ៉ូម",
    titleEn: "Roads, laws, and stone",
    titleKh: "ផ្លូវ ច្បាប់ និងថ្ម",
    bodyEn: "From a single city in Italy, the Romans built an empire that wrapped around the Mediterranean Sea. They poured 80,000 km of paved roads across Europe, wrote the legal codes that still shape Western law, and left aqueducts, bridges, and amphitheatres standing 2000 years later.",
    bodyKh: "ពីទីក្រុងតែមួយនៅអ៊ីតាលី ជនជាតិរ៉ូមបានសាងសង់ចក្រភពមួយដែលពទ្ធជុំវិញសមុទ្រមេឌីទែរ៉ាណេ។ ពួកគេបានលាបផ្លូវ ៨០,០០០ គីឡូម៉ែត្រ ឆ្លងកាត់ទ្វីបអឺរ៉ុប សរសេរក្រមច្បាប់ដែលនៅតែបង្កើតច្បាប់លោកខាងលិច និងបន្សល់ទុកនូវបំពង់ទឹក ស្ពាន និងអំហ្វីទាត្រ ដែលនៅតែឈរ ២០០០ ឆ្នាំក្រោយ។",
    legacy: [
      { en: "Latin → French, Italian, Spanish", kh: "ឡាតាំង → បារាំង អ៊ីតាលី អេស្ប៉ាញ" },
      { en: "Roman law", kh: "ច្បាប់រ៉ូម" },
      { en: "Concrete & arches", kh: "បេតុង និងធ្នឹមកោង" },
    ],
    swatch: "bg-rose-700",
  },
  {
    Icon: Castle,
    yearsEn: "500s – 1600s",
    yearsKh: "ស. ៥០០ – ស. ១៦០០",
    labelEn: "ERA 02 · MIDDLE AGES & RENAISSANCE",
    labelKh: "យុគទី ២ · មជ្ឈិមសម័យ និងយុគនៃការរស់ឡើងវិញ",
    titleEn: "Castles, kings, and a creative explosion",
    titleKh: "ប្រាសាទ ស្តេច និងការផ្ទុះច្នៃប្រឌិត",
    bodyEn: "After Rome fell, Europe broke into hundreds of kingdoms ruled from stone castles. The Christian Church became the glue that held the continent together. Then, beginning in 1400s Italy, the Renaissance ('rebirth') rediscovered ancient knowledge and exploded into Leonardo da Vinci, Michelangelo, the printing press, and the great voyages of exploration.",
    bodyKh: "បន្ទាប់ពីរ៉ូមដួលរលំ អឺរ៉ុបបានបែកជារាប់រយនគរ ដែលគ្រប់គ្រងពីប្រាសាទថ្ម។ សាសនាគ្រឹស្តក្លាយជាកាវដែលរៀបចំទ្វីបឱ្យនៅជាមួយគ្នា។ បន្ទាប់មក ចាប់ផ្តើមពីអ៊ីតាលីសតវត្សទី ១៥ យុគនៃការរស់ឡើងវិញ («ការកើតឡើងវិញ») បានរកឃើញចំណេះដឹងបុរាណវិញ ហើយផ្ទុះជាលេអូណាដូ ដាវ៉ាំងស៊ី មីខែលអាង់ហ្គេឡូ ម៉ាស៊ីនបោះពុម្ព និងការរុករកដ៏អស្ចារ្យ។",
    legacy: [
      { en: "Cathedrals & castles", kh: "វិហារ និងប្រាសាទ" },
      { en: "Printing press (1440)", kh: "ម៉ាស៊ីនបោះពុម្ព (១៤៤០)" },
      { en: "Leonardo · Michelangelo", kh: "លេអូណាដូ · មីខែលអាង់ហ្គេឡូ" },
    ],
    swatch: "bg-amber-700",
  },
  {
    Icon: Factory,
    yearsEn: "1700s – 1945",
    yearsKh: "ស. ១៧០០ – ១៩៤៥",
    labelEn: "ERA 03 · INDUSTRIAL REVOLUTION & WORLD WARS",
    labelKh: "យុគទី ៣ · បដិវត្តន៍ឧស្សាហកម្ម និងសង្គ្រាមលោក",
    titleEn: "Machines that built — and broke — the world",
    titleKh: "ម៉ាស៊ីនដែលបាន​សាង​សង់ — និងបំផ្លាញ — ពិភពលោក",
    bodyEn: "Beginning in Britain around 1760, the steam engine and the factory transformed Europe from a continent of farms into the workshop of the world. Railways crossed mountains, ships crossed oceans, and European empires reached every corner of the globe. But that same industrial power produced the trenches of World War I (1914-18) and the bombers of World War II (1939-45) — together killing tens of millions of Europeans.",
    bodyKh: "ចាប់ផ្តើមនៅប្រទេសអង់គ្លេសប្រហែលឆ្នាំ ១៧៦០ ម៉ាស៊ីនចំហាយ និងរោងចក្របានផ្លាស់ប្តូរអឺរ៉ុបពីទ្វីបនៃកសិដ្ឋាន ទៅជាសិក្ខាសាលានៃពិភពលោក។ ផ្លូវដែកឆ្លងកាត់ភ្នំ កប៉ាល់ឆ្លងកាត់មហាសមុទ្រ ហើយចក្រភពអឺរ៉ុបបានទៅដល់គ្រប់ជ្រុងនៃផែនដី។ ប៉ុន្តែអំណាចឧស្សាហកម្មដូចគ្នានោះបានផលិតចង្អូររបស់សង្គ្រាមលោកលើកទី១ (១៩១៤–១៨) និងយន្តហោះទម្លាក់គ្រាប់បែករបស់សង្គ្រាមលោកលើកទី២ (១៩៣៩–៤៥) — រួមគ្នាសម្លាប់ជនជាតិអឺរ៉ុបរាប់សិបលាននាក់។",
    legacy: [
      { en: "Steam engines & factories", kh: "ម៉ាស៊ីនចំហាយ និងរោងចក្រ" },
      { en: "Two World Wars", kh: "សង្គ្រាមលោកពីរ" },
      { en: "Tens of millions dead", kh: "រាប់សិបលាននាក់ស្លាប់" },
    ],
    swatch: "bg-slate-700",
  },
  {
    Icon: Handshake,
    yearsEn: "1950 – today",
    yearsKh: "១៩៥០ – សព្វថ្ងៃ",
    labelEn: "ERA 04 · THE PEACE EXPERIMENT",
    labelKh: "យុគទី ៤ · ការពិសោធន៍សន្តិភាព",
    titleEn: "From rubble to a single market",
    titleKh: "ពីសំណល់ឥដ្ឋទៅទីផ្សារតែមួយ",
    bodyEn: "Out of the rubble of 1945, French and German leaders made a daring bet: pool the coal and steel that powered war machines, and war between them becomes physically impossible. That tiny 1951 club of six countries grew into today's European Union of 27 — the longest stretch of peace among major European powers in 2000 years.",
    bodyKh: "ពីសំណល់ឥដ្ឋឆ្នាំ ១៩៤៥ មេដឹកនាំបារាំង និងអាល្លឺម៉ង់បានធ្វើការភ្នាល់ដ៏ក្លាហានមួយ៖ ដាក់ធ្យូងថ្ម និងដែកដែលផ្ដល់ថាមពលដល់ម៉ាស៊ីនសង្គ្រាមរួមគ្នា ហើយសង្គ្រាមរវាងពួកគេក្លាយជាមិនអាចទៅរួចតាមរូបវន្ត។ ក្លឹបតូចរបស់ប្រទេសប្រាំមួយឆ្នាំ ១៩៥១ បានរីកលូតលាស់ទៅជាសហភាពអឺរ៉ុបនាពេលបច្ចុប្បន្នដែលមានសមាជិក ២៧ — រយៈពេលដ៏វែងបំផុតនៃសន្តិភាពក្នុងចំណោមអំណាចអឺរ៉ុបធំៗក្នុងរយៈពេល ២០០០ ឆ្នាំ។",
    legacy: [
      { en: "European Union (1993)", kh: "សហភាពអឺរ៉ុប (១៩៩៣)" },
      { en: "The Euro (€)", kh: "រូបិយប័ណ្ណអឺរ៉ូ (€)" },
      { en: "Open borders", kh: "ព្រំដែនបើកចំហ" },
    ],
    swatch: "bg-[#0a1f5b]",
  },
];

function HistoryTimeline({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-amber-200 shadow-sm p-5 sm:p-7">
      <div className="relative">
        {/* gold rail */}
        <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-rose-700 via-amber-700 via-slate-700 to-[#0a1f5b]" />
        <ol className="space-y-6">
          {ERAS.map((e, i) => (
            <li key={i} className="relative pl-14 sm:pl-16">
              <div className={`absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-4 ring-amber-100 flex items-center justify-center text-white shadow ${e.swatch}`}>
                <e.Icon className="w-5 h-5" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#fdfaf2] p-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Crown className="w-3 h-3 text-amber-600" />
                  <span className={`font-mono text-[10px] uppercase tracking-widest text-[#0a1f5b] ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {isKh ? e.labelKh : e.labelEn}
                  </span>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className={`text-[11px] font-mono text-amber-800 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? e.yearsKh : e.yearsEn}
                  </span>
                </div>
                <h3 className={`font-display font-bold text-[#0a1f5b] text-base sm:text-lg mb-1.5 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
                  {isKh ? e.titleKh : e.titleEn}
                </h3>
                <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? e.bodyKh : e.bodyEn}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {e.legacy.map((b, j) => (
                    <span
                      key={j}
                      className={`inline-flex items-center gap-1 rounded-full bg-white border border-amber-300 text-amber-900 px-2.5 py-0.5 text-[11px] ${isKh ? "font-khmer" : "font-mono"}`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {isKh ? b.kh : b.en}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · EU origin paragraph + Fast Facts grid
// ════════════════════════════════════════════════════════════════════════════

function EuStory({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-sm grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="bg-[#0a1f5b] text-white p-6 flex items-center justify-center relative overflow-hidden">
        <EuFlagSVG />
      </div>
      <div className="bg-white p-5 sm:p-6">
        <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ច្បាប់សាមញ្ញ" : "The simple rule"}
        </div>
        <h3 className={`font-display font-bold text-lg text-[#0a1f5b] mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
          {isKh ? "«ប្រសិនបើយើងជួញដូររួមគ្នា យើងនឹងមិនច្បាំងគ្នាទេ»" : "\"If we trade together, we won't fight each other.\""}
        </h3>
        <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "នៅឆ្នាំ ១៩៥០ រដ្ឋមន្ត្រីបារាំង Robert Schuman បានស្នើឱ្យបារាំង និងអាល្លឺម៉ង់រួមធ្យូងថ្ម និងដែករបស់ពួកគេនៅក្រោមអាជ្ញាធរតែមួយ។ វាស្តាប់ទៅធម្មតា — ប៉ុន្តែវាបានបង្កើតកម្មវិធីសាកល្បងសេដ្ឋកិច្ចរួមមួយ ដែលរីកលូតលាស់បន្តិចម្តងៗ៖ ៦ ប្រទេស នៅឆ្នាំ ១៩៥១ → ១២ នៅទសវត្សរ៍ ៨០ → ២៧ នៅពេលនេះ។ ឥឡូវនេះ យើងហៅវាថា សហភាពអឺរ៉ុប។"
            : "In 1950, French minister Robert Schuman proposed that France and Germany pool their coal and steel under a single authority. It sounded modest — but it created a shared economic experiment that grew step by step: 6 countries in 1951 → 12 in the 1980s → 27 today. We now call it the European Union."}
        </p>
      </div>
    </div>
  );
}

function FastFactsGrid({ isKh }: { isKh: boolean }) {
  return (
    <div>
      <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ការពិតរហ័ស" : "Fast facts"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <FactCard
          Icon={Flag}
          labelEn="CREATED"
          labelKh="បង្កើតឡើង"
          valueEn="1993"
          valueKh="១៩៩៣"
          subEn="Maastricht Treaty (economic roots: 1950s)"
          subKh="សន្ធិសញ្ញាម៉ាស្ទ្រិច (ឫសសេដ្ឋកិច្ច៖ ទសវត្សរ៍ ៥០)"
          isKh={isKh}
        />
        <FactCard
          Icon={Users}
          labelEn="POPULATION"
          labelKh="ប្រជាជន"
          valueEn="≈448 M"
          valueKh="≈៤៤៨ លាននាក់"
          subEn="≈30× the population of Cambodia"
          subKh="ប្រហែល ៣០ ដងនៃប្រជាជនកម្ពុជា"
          isKh={isKh}
        />
        <FactCard
          Icon={MapPin}
          labelEn="MEMBER STATES"
          labelKh="រដ្ឋសមាជិក"
          valueEn="27"
          valueKh="២៧"
          subEn="Independent countries acting as a team"
          subKh="ប្រទេសឯករាជ្យដែលធ្វើការជាក្រុម"
          isKh={isKh}
        />
        <FactCard
          Icon={Coins}
          labelEn="THE CURRENCY"
          labelKh="រូបិយប័ណ្ណ"
          valueEn="€ Euro"
          valueKh="€ អឺរ៉ូ"
          subEn="Used by 20 of the 27 members"
          subKh="ប្រើប្រាស់ដោយ ២០ ក្នុងចំណោម ២៧ សមាជិក"
          isKh={isKh}
        />
      </div>
    </div>
  );
}

function FactCard({
  Icon, labelEn, labelKh, valueEn, valueKh, subEn, subKh, isKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  valueEn: string; valueKh: string;
  subEn: string; subKh: string;
  isKh: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white border-2 border-[#0a1f5b]/15 hover:border-amber-400 transition-colors p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#0a1f5b] text-amber-300 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? labelKh : labelEn}
        </div>
      </div>
      <div className={`font-display font-bold text-2xl text-[#0a1f5b] leading-none ${isKh ? "font-khmer" : ""}`}>
        {isKh ? valueKh : valueEn}
      </div>
      <div className={`text-xs text-slate-600 mt-auto ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? subKh : subEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Schengen journey + ASEAN comparison
// ════════════════════════════════════════════════════════════════════════════

const JOURNEY = [
  { en: "Portugal", kh: "ព័រទុយហ្គាល់", flag: "🇵🇹" },
  { en: "Spain",    kh: "អេស្ប៉ាញ",     flag: "🇪🇸" },
  { en: "France",   kh: "បារាំង",       flag: "🇫🇷" },
  { en: "Germany",  kh: "អាល្លឺម៉ង់",    flag: "🇩🇪" },
  { en: "Poland",   kh: "ប៉ូឡូញ",        flag: "🇵🇱" },
];

function SchengenJourney({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0a1f5b] to-[#1e3a8a] text-white p-5 sm:p-6 shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-400 text-[#0a1f5b] flex items-center justify-center flex-shrink-0">
          <Plane className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-300 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការពិតគួរឱ្យចាប់អារម្មណ៍" : "Interesting fact"}
          </div>
          <h3 className={`font-display font-bold text-lg sm:text-xl mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh
              ? "ពីព័រទុយហ្គាល់ ដល់ប៉ូឡូញ — គ្មានព្រំដែនទេ"
              : "From Portugal to Poland — without a single border check"}
          </h3>
          <p className={`text-sm text-blue-100 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "មនុស្សម្នាក់អាចបើកឡានពីក្រុង Lisbon ឆ្លងកាត់ប្រទេសច្រើន រហូតដល់ក្រុង Warsaw ដែលជាចម្ងាយជាង ៣,០០០ គីឡូម៉ែត្រ ដោយមិនចាំបាច់ឈប់នៅស្ថានីយ៍ត្រួតពិនិត្យព្រំដែន ឬបង្ហាញលិខិតឆ្លងដែនណាមួយ​ទេ។"
              : "A person can drive from Lisbon to Warsaw — over 3,000 km across multiple countries — without ever stopping at a border checkpoint or showing a passport."}
          </p>

          {/* Mini journey visual */}
          <div className="rounded-xl bg-white/10 backdrop-blur border border-amber-300/30 p-3 sm:p-4 mb-4">
            <div className="flex items-center justify-between gap-1 sm:gap-2 flex-wrap">
              {JOURNEY.map((c, i) => (
                <div key={c.en} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-2xl sm:text-3xl leading-none">{c.flag}</div>
                    <div className={`text-[10px] sm:text-xs text-blue-100 mt-1 ${isKh ? "font-khmer" : "font-mono"}`}>
                      {isKh ? c.kh : c.en}
                    </div>
                  </div>
                  {i < JOURNEY.length - 1 && (
                    <div className="flex flex-col items-center mx-0.5 sm:mx-1">
                      <div className="text-amber-300 text-xs leading-none">━━</div>
                      <div className={`text-[8px] sm:text-[9px] text-amber-200 mt-0.5 ${isKh ? "font-khmer" : "font-mono"}`}>
                        {isKh ? "គ្មាន" : "no stop"}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-blue-100/90">
            <Info className="w-3.5 h-3.5 text-amber-300 mt-0.5 flex-shrink-0" />
            <p className={`${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "តំបន់សិនជេនបច្ចុប្បន្នរួមមាន ២៩ ប្រទេស (២៥ ក្នុងសហភាពអឺរ៉ុប + អ៊ីសឡង់ ន័រវេស ស្វីស និងលីចតិនស្ទែន)។ វាគឺជាតំបន់ធ្វើដំណើរសេរីដ៏ធំបំផុតក្នុងប្រវត្តិសាស្ត្រ។"
                : "Today's Schengen Area covers 29 countries (25 EU members + Iceland, Norway, Switzerland, and Liechtenstein). It is the largest free-travel zone in human history."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AseanNote({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
          <Handshake className="w-5 h-5" />
        </div>
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការប្រៀបធៀបសម្រាប់កម្ពុជា" : "A comparison for Cambodia"}
          </div>
          <p className={`text-sm text-amber-950 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? <><span className="font-semibold">សហភាពអឺរ៉ុប ប្រៀបដូចជាទម្រង់ដ៏ជឿនលឿននៃអាស៊ាន</span> ដែលបណ្តាប្រទេសនានាចែករំលែកច្បាប់ រូបិយប័ណ្ណ និងបើកចំហព្រំដែន។ អាស៊ាន (រួមទាំងកម្ពុជា) ចែករំលែកព័ត៌មាន និងពាណិជ្ជកម្មរួចហើយ — ប៉ុន្តែយើងនៅតែរក្សាប្រាក់រៀលរបស់យើង និងត្រួតពិនិត្យលិខិតឆ្លងដែនរបស់យើង។</>
              : <><span className="font-semibold">The EU is like a highly advanced version of ASEAN</span>, where countries share laws, money, and open borders. ASEAN (including Cambodia) already shares information and trade — but we still keep our own riel and stamp our own passports.</>}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative
// ════════════════════════════════════════════════════════════════════════════

function EuStarsBg() {
  // 12 gold stars in a ring (the EU flag)
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 22, y: 50 + Math.sin(a) * 22 };
  });
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {stars.map((s, i) => (
        <Star5 key={i} cx={s.x} cy={s.y} r={1.6} fill="#fbbf24" />
      ))}
    </svg>
  );
}

function Star5({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  // 5-point star path
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r / 2.4;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
}

function EuFlagSVG() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 110 + Math.cos(a) * 60, y: 80 + Math.sin(a) * 60 };
  });
  return (
    <svg viewBox="0 0 220 160" className="w-full h-auto max-w-[220px]" aria-hidden>
      <rect x="2" y="2" width="216" height="156" rx="6" fill="#0a1f5b" stroke="#fbbf24" strokeWidth="2" />
      {stars.map((s, i) => (
        <Star5 key={i} cx={s.x} cy={s.y} r={9} fill="#fbbf24" />
      ))}
    </svg>
  );
}
