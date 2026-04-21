import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bird,
  Building2,
  Coins,
  Compass,
  Crown,
  Droplets,
  Factory,
  Fish,
  Flame,
  Globe2,
  Hammer,
  Keyboard,
  Landmark,
  Languages,
  Leaf,
  Lightbulb,
  MapPin,
  Mountain,
  PenTool,
  Quote,
  Sparkles,
  Sprout,
  Star,
  Waves,
  Wheat,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  CAM-01 · Cambodia: The Heart of Southeast Asia
//           កម្ពុជា៖ បេះដូងនៃអាស៊ីអាគ្នេយ៍
//
//  1. Fast Facts & Geography     · Tonle Sap reverses twice a year
//  2. Nature & Wildlife          · Kouprey, Giant Ibis, Irrawaddy dolphins
//  3. The Empire of Stone        · Angkor Wat, Barays from space
//  4. Language, Religion, Economy· 74-letter alphabet, Theravada, textiles
//  5. Famous Intellectual Thinkers·Chuon Nath, Keng Vansak typewriter
//
//  Aesthetic: Heritage — warm golds, temple-stone grays, forest greens.
// ════════════════════════════════════════════════════════════════════════════

const GOLD = "#b45309";        // burnt heritage gold
const GOLD_DEEP = "#78350f";   // deep gold for headings
const STONE = "#57534e";       // temple stone
const FOREST = "#166534";      // jungle / rice-paddy green

const SAND: React.CSSProperties = {
  backgroundColor: "#faf5e8",
  backgroundImage:
    "radial-gradient(circle at 20% 25%, rgba(180, 83, 9, 0.06), transparent 40%)," +
    "radial-gradient(circle at 80% 75%, rgba(22, 101, 52, 0.05), transparent 45%)," +
    "linear-gradient(rgba(180, 83, 9, 0.03) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(180, 83, 9, 0.03) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 56px 56px, 56px 56px",
};

const PARCHMENT: React.CSSProperties = {
  backgroundColor: "#fffaec",
  backgroundImage:
    "radial-gradient(circle at 100% 0%, rgba(180, 83, 9, 0.07), transparent 35%)," +
    "radial-gradient(circle at 0% 100%, rgba(87, 83, 78, 0.06), transparent 40%)",
};

function CornerFlourish({ color = GOLD }: { color?: string }) {
  return (
    <div className="contents">
      {[
        ["top-2 left-2", "border-t-2 border-l-2"],
        ["top-2 right-2", "border-t-2 border-r-2"],
        ["bottom-2 left-2", "border-b-2 border-l-2"],
        ["bottom-2 right-2", "border-b-2 border-r-2"],
      ].map(([pos, b]) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} w-4 h-4 ${b}`}
          style={{ borderColor: color, opacity: 0.45 }}
        />
      ))}
    </div>
  );
}

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div className="mb-4 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-50 rounded px-2 py-0.5 shadow-sm"
        style={{ backgroundColor: GOLD_DEEP }}
      >
        SEC-{spec}
      </span>
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : "font-serif"}`}
        style={{ color: GOLD_DEEP }}
      >
        {k ? kh : en}
      </h2>
      <Icon className="w-4 h-4 ml-1" style={{ color: GOLD }} />
      <div className="flex-1 border-t-2 border-dotted" style={{ borderColor: `${GOLD}66` }} />
    </div>
  );
}

function UncommonFactCallout({
  k,
  enTitle,
  khTitle,
  enBody,
  khBody,
}: {
  k: boolean;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
}) {
  return (
    <div
      className="relative mt-3 rounded-xl border-2 p-4 overflow-hidden flex items-start gap-3"
      style={{ borderColor: GOLD, backgroundColor: "#fff7d6" }}
      data-testid="uncommon-fact"
    >
      <CornerFlourish color={GOLD} />
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow"
        style={{ backgroundColor: GOLD_DEEP }}
      >
        <Sparkles className="w-4 h-4 text-amber-50" />
      </div>
      <div>
        <div
          className={`text-[10px] font-mono tracking-[0.2em] uppercase mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: GOLD_DEEP }}
        >
          {k ? "ការពិតមិនសូវមាននរណាដឹង" : "Uncommon Fact"}
        </div>
        <div className={`font-bold text-amber-950 mb-1 ${k ? "font-khmer" : "font-serif"}`}>
          {k ? khTitle : enTitle}
        </div>
        <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {k ? khBody : enBody}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════

export function CambodiaPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={SAND}>
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity ${k ? "font-khmer" : "font-serif"}`}
            style={{ color: GOLD_DEEP }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-2xl border-2 p-6 sm:p-8 mb-8 overflow-hidden shadow-lg"
          style={{
            borderColor: GOLD_DEEP,
            backgroundImage: `linear-gradient(135deg, ${GOLD_DEEP} 0%, ${GOLD} 55%, ${FOREST} 100%)`,
          }}
        >
          <CornerFlourish color="#fde68a" />
          <div className="flex items-start gap-4 relative">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-amber-50/15 backdrop-blur flex items-center justify-center border border-amber-100/40">
              <Landmark className="w-8 h-8 text-amber-50" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-amber-100/90 mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}>
                <span>{t("Explore", "រុករក")}</span>
                <span>·</span>
                <span>CAM-01</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold text-amber-50 leading-tight ${k ? "font-khmer leading-loose" : "font-serif"}`}
                data-testid="page-title"
              >
                {t(
                  "Cambodia: The Heart of Southeast Asia",
                  "កម្ពុជា៖ បេះដូងនៃអាស៊ីអាគ្នេយ៍"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-amber-100/90 max-w-2xl leading-relaxed ${k ? "font-khmer not-italic leading-loose" : "font-serif italic"}`}>
                {t(
                  "An ancient kingdom of stone temples, river dolphins, and one of the longest alphabets in the world — a country whose past, language, and land are tightly woven together.",
                  "ព្រះរាជាណាចក្របុរាណមួយដែលមានប្រាសាទថ្ម ផ្សោតទន្លេ និងអក្សរវែងបំផុតមួយក្នុងពិភពលោក — ប្រទេសដែលអតីតកាល ភាសា និងផែនដីត្រូវបានត្បាញចូលគ្នាយ៉ាងជិតស្និទ្ធ។"
                )}
              </p>
            </div>
          </div>
        </header>

        <SectionGeography  k={k} t={t} />
        <SectionWildlife   k={k} t={t} />
        <SectionEmpire     k={k} t={t} />
        <SectionLangRelEcon k={k} t={t} />
        <SectionThinkers   k={k} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 p-5 flex items-start gap-3 overflow-hidden shadow"
          style={{ borderColor: GOLD_DEEP, ...PARCHMENT }}
          data-testid="closing-note"
        >
          <CornerFlourish />
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
          <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("Why it matters: ", "ហេតុអ្វីសំខាន់ ៖ ")}
            </strong>
            {t(
              "Cambodia is not only a country to visit on a map — it is a living archive of engineering, language, and faith. To know it is to see how rivers can flow backwards, how empires can be carved from sandstone, and how a single typewriter key can carry a whole script into the modern age.",
              "កម្ពុជាមិនត្រឹមតែជាប្រទេសមួយដើម្បីទស្សនានៅលើផែនទីទេ — វាជាបណ្ណសារដ៏រស់រវើកនៃវិស្វកម្ម ភាសា និងជំនឿ។ ការស្គាល់វា គឺការមើលឃើញរបៀបដែលទន្លេអាចហូរត្រឡប់ ​របៀបដែលអាណាចក្រអាចត្រូវបានឆ្លាក់ពីថ្មខ្សាច់ និងរបៀបដែលគ្រាប់ពុម្ពអក្សរតែមួយ អាចនាំអក្សរមួយទាំងមូលចូលក្នុងសម័យទំនើប។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-amber-50 text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : "font-serif"}`}
            style={{ backgroundColor: GOLD_DEEP }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// helpers
// ────────────────────────────────────────────────────────────────────────────

type T = (en: string, kh: string) => string;

function FactCard({
  Icon,
  enLabel,
  khLabel,
  enValue,
  khValue,
  k,
  accent = GOLD,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enLabel: string;
  khLabel: string;
  enValue: string;
  khValue: string;
  k: boolean;
  accent?: string;
}) {
  return (
    <div
      className="relative rounded-xl border-2 p-4 bg-amber-50/70 overflow-hidden"
      style={{ borderColor: `${accent}66` }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className={`text-[10px] font-mono tracking-[0.2em] uppercase ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: accent }}
        >
          {k ? khLabel : enLabel}
        </span>
      </div>
      <div className={`text-base sm:text-lg font-bold text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif"}`}>
        {k ? khValue : enValue}
      </div>
    </div>
  );
}

function CityCard({
  k,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  Icon,
}: {
  k: boolean;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div
      className="relative rounded-xl border-2 p-4 overflow-hidden shadow-sm"
      style={{ borderColor: `${STONE}80`, ...PARCHMENT }}
    >
      <CornerFlourish color={STONE} />
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" style={{ color: STONE }} />
        <h4 className={`font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
          {k ? khName : enName}
        </h4>
      </div>
      <div
        className={`text-[11px] font-mono uppercase tracking-widest mb-2 italic ${k ? "font-khmer not-italic normal-case tracking-normal" : ""}`}
        style={{ color: GOLD }}
      >
        {k ? khTag : enTag}
      </div>
      <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — Fast Facts & Geography
// ════════════════════════════════════════════════════════════════════════════

function SectionGeography({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-10" data-testid="section-geography">
      <SectionHeader
        spec="01"
        en="Fast Facts & Geography"
        kh="ទិន្នន័យរហ័ស និងភូមិសាស្ត្រ"
        k={k}
        Icon={Compass}
      />

      {/* Fast facts grid */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <FactCard
          k={k}
          Icon={MapPin}
          enLabel="Area"
          khLabel="ផ្ទៃដី"
          enValue="181,035 km²"
          khValue="១៨១,០៣៥ គីឡូម៉ែត្រការ៉េ"
          accent={FOREST}
        />
        <FactCard
          k={k}
          Icon={Globe2}
          enLabel="Region"
          khLabel="តំបន់"
          enValue="Southeast Asia"
          khValue="អាស៊ីអាគ្នេយ៍"
          accent={GOLD}
        />
        <FactCard
          k={k}
          Icon={Waves}
          enLabel="Lifeline"
          khLabel="សរសៃឈាម"
          enValue="Mekong + Tonle Sap"
          khValue="មេគង្គ + ទន្លេសាប"
          accent={STONE}
        />
      </div>

      {/* The Great Lake */}
      <div
        className="relative rounded-2xl border-2 p-5 sm:p-7 shadow-md overflow-hidden mb-5"
        style={{ borderColor: `${GOLD_DEEP}99`, ...PARCHMENT }}
        data-testid="tonle-sap-card"
      >
        <CornerFlourish />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Droplets className="w-5 h-5" style={{ color: FOREST }} />
          <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
            {t("The Great Lake — Tonle Sap", "បឹងធំ — ទន្លេសាប")}
          </h3>
        </div>
        <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "The Tonle Sap is the largest freshwater lake in Southeast Asia. Its floodplain feeds millions of people, supplies most of Cambodia's protein through fishing, and gives life to the rice paddies that surround it. Floating villages, stilt houses, and fish traps are part of an entire civilisation built on top of, and inside, this single lake.",
            "ទន្លេសាប គឺជាបឹងទឹកសាបធំជាងគេក្នុងតំបន់អាស៊ីអាគ្នេយ៍។ តំបន់ទឹកជំនន់របស់វាចិញ្ចឹមមនុស្សរាប់លាន ផ្គត់ផ្គង់ប្រូតេអ៊ីនភាគច្រើនរបស់កម្ពុជាតាមរយៈនេសាទ និងផ្ដល់ជីវិតដល់វាលស្រែដែលនៅជុំវិញ។ ភូមិបណ្ដែតទឹក ផ្ទះលើស្នូក និងលបនេសាទ ជាផ្នែកនៃអរិយធម៌មួយដែលសាងសង់នៅលើ និងនៅខាងក្នុងបឹងតែមួយនេះ។"
          )}
        </p>

        <UncommonFactCallout
          k={k}
          enTitle="The river that flows two ways."
          khTitle="ទន្លេដែលហូរពីរទិស។"
          enBody="The Tonle Sap is the only river system in the world that reverses its flow twice a year. From June to October the monsoon rains push so much water down the Mekong that the connecting river is forced backwards into the lake — making it swell to nearly five times its dry-season size. When the rains stop, the river flips and flows out again. An entire ecosystem and culture run on this back-and-forth heartbeat."
          khBody="ទន្លេសាប គឺជាប្រព័ន្ធទន្លេតែមួយគត់ក្នុងពិភពលោក ដែលបង្វិលលំហូររបស់វាពីរដងក្នុងមួយឆ្នាំ។ ចាប់ពីខែមិថុនាដល់តុលា ភ្លៀងមូសុងបញ្ចូលទឹកច្រើនយ៉ាងខ្លាំងតាមមេគង្គ ដែលបង្ខំទន្លេតភ្ជាប់ ឲ្យហូរត្រឡប់ចូលក្នុងបឹង — ធ្វើឲ្យបឹងពោងនាសឡើងស្ទើរតែ ៥ ដងនៃទំហំរដូវប្រាំង។ ពេលភ្លៀងឈប់ ទន្លេបង្វិលហើយហូរចេញម្ដងទៀត។ ប្រព័ន្ធអេកូឡូស៊ី និងវប្បធម៌ទាំងមូល ដំណើរការទៅតាមចង្វាក់បេះដូងហូរទៅហូរមកនេះ។"
        />
      </div>

      {/* The Cities */}
      <h3 className={`text-base sm:text-lg font-bold mb-3 ${k ? "font-khmer" : "font-serif"}`} style={{ color: GOLD_DEEP }}>
        {t("The Cities", "ទីក្រុង")}
      </h3>
      <div className="grid md:grid-cols-3 gap-3">
        <CityCard
          k={k}
          Icon={Building2}
          enName="Phnom Penh"
          khName="ភ្នំពេញ"
          enTag="The Pearl of Asia"
          khTag="គុជនៃអាស៊ី"
          enBody="The capital, where the Mekong, Tonle Sap, and Bassac rivers meet. A French-colonial promenade, the Royal Palace, and a fast-rising skyline of glass and steel."
          khBody="រាជធានី ដែលជាកន្លែងជួបប្រជុំនៃទន្លេមេគង្គ ទន្លេសាប និងទន្លេបាសាក់។ មានផ្លូវដើរលេងសម័យអាណានិគមបារាំង ព្រះបរមរាជវាំង និងអគារខ្ពស់ៗកញ្ចក់ដែករហ័សចំនួន។"
        />
        <CityCard
          k={k}
          Icon={Landmark}
          enName="Siem Reap"
          khName="សៀមរាប"
          enTag="Gateway to Angkor"
          khTag="ច្រកចូលអង្គរ"
          enBody="The base camp for visiting Angkor Wat and the hundreds of stone temples scattered across the surrounding jungle. Famous for night markets, hot-air balloons, and golden sunrises over the temple silhouettes."
          khBody="មូលដ្ឋានសម្រាប់ទស្សនាប្រាសាទអង្គរវត្ត និងប្រាសាទថ្មរាប់រយដែលនៅខ្ចាត់ខ្ចាយក្នុងព្រៃជុំវិញ។ ល្បីដោយសារផ្សារយប់ កូនបាល់ខ្យល់ក្ដៅ និងព្រះអាទិត្យរះមាស ៗ លើស្រមោលប្រាសាទ។"
        />
        <CityCard
          k={k}
          Icon={Wheat}
          enName="Battambang"
          khName="បាត់ដំបង"
          enTag="The Rice Bowl"
          khTag="ឆ្នាំងបាយ"
          enBody="Cambodia's farming capital — endless paddies, fruit orchards, and the famous bamboo train. The country eats because Battambang plants."
          khBody="រាជធានីកសិកម្មរបស់កម្ពុជា — វាលស្រែគ្មានទីបញ្ចប់ ចម្ការផ្លែឈើ និងរថភ្លើងឫស្សីដ៏ល្បី។ ប្រទេសញ៉ាំ ព្រោះបាត់ដំបងដាំ។"
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Nature & Wildlife
// ════════════════════════════════════════════════════════════════════════════

function SectionWildlife({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-10" data-testid="section-wildlife">
      <SectionHeader
        spec="02"
        en="Nature & Wildlife"
        kh="ធម្មជាតិ និងសត្វព្រៃ"
        k={k}
        Icon={Leaf}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {/* National symbols */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${FOREST}80`, ...PARCHMENT }}
          data-testid="national-symbols"
        >
          <CornerFlourish color={FOREST} />
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5" style={{ color: FOREST }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("National Symbols", "និមិត្តសញ្ញាជាតិ")}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-amber-700/40 bg-amber-50/70 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Mountain className="w-4 h-4" style={{ color: STONE }} />
                <h4 className={`font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                  {t("Kouprey · Forest Ox", "គោព្រៃ")}
                </h4>
              </div>
              <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
                {t(
                  "A massive wild ox once roaming the forests of northern Cambodia. Declared the country's national mammal — a symbol of strength and the deep, unmapped wilderness that still survives in the highlands.",
                  "គោព្រៃធំៗដែលធ្លាប់ដើរលេងក្នុងព្រៃភាគខាងជើងនៃកម្ពុជា។ ត្រូវបានប្រកាសជាសត្វថនិកសត្វជាតិរបស់ប្រទេស — និមិត្តសញ្ញានៃកម្លាំង និងព្រៃជ្រៅមិនទាន់គូសផែនទីដែលនៅរស់នៅតំបន់ខ្ពង់រាប។"
                )}
              </p>
            </div>

            <div className="rounded-lg border border-amber-700/40 bg-amber-50/70 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Bird className="w-4 h-4" style={{ color: GOLD }} />
                <h4 className={`font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                  {t("Giant Ibis", "ត្រយ៉ងយក្ស")}
                </h4>
              </div>
              <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
                {t(
                  "Cambodia's national bird — a tall, ancient-looking wading bird now critically endangered. Most of the world's surviving Giant Ibis live in the seasonally-flooded grasslands of the country's north.",
                  "បក្សីជាតិរបស់កម្ពុជា — សត្វស្លាបខ្ពស់ៗមើលទៅបុរាណ ដែលឥឡូវនេះស្ថិតក្នុងគ្រោះថ្នាក់ផុតពូជ។ ត្រយ៉ងយក្សដែលនៅរស់ភាគច្រើនលើពិភពលោក រស់នៅក្នុងវាលស្មៅទឹកជំនន់រដូវវស្សានៅភាគខាងជើងនៃប្រទេស។"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Mekong wonders */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${FOREST}80`, ...PARCHMENT }}
          data-testid="mekong-wonders"
        >
          <CornerFlourish color={FOREST} />
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-5 h-5" style={{ color: FOREST }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("The Mekong Wonders", "អច្ឆរិយៈនៃមេគង្គ")}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-amber-700/40 bg-amber-50/70 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Fish className="w-4 h-4" style={{ color: STONE }} />
                <h4 className={`font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                  {t("Irrawaddy Dolphins · Kratie", "ផ្សោតទន្លេ · ក្រចេះ")}
                </h4>
              </div>
              <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
                {t(
                  "Round-headed, smiling river dolphins still survive in deep pools of the Mekong near Kratie. Fewer than a hundred remain — protected by communities who have lived alongside them for generations.",
                  "ផ្សោតទន្លេក្បាលមូល និងញញឹមនៅតែរស់ក្នុងស្រះជ្រៅៗនៃទន្លេមេគង្គ ក្បែរក្រចេះ។ នៅសល់តិចជាង ១០០ ក្បាល — ការពារដោយសហគមន៍ដែលបានរស់នៅជាមួយវាជាច្រើនជំនាន់។"
                )}
              </p>
            </div>

            <div className="rounded-lg border border-amber-700/40 bg-amber-50/70 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Sprout className="w-4 h-4" style={{ color: FOREST }} />
                <h4 className={`font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                  {t("Lifeblood of Agriculture", "សរសៃឈាមនៃកសិកម្ម")}
                </h4>
              </div>
              <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
                {t(
                  "The Mekong is more than a river — it is the artery that makes Cambodian farming possible. Its annual floods deposit fresh silt across the rice plains, and its waters fill canals that have irrigated villages since the time of Angkor.",
                  "មេគង្គមិនមែនគ្រាន់តែជាទន្លេទេ — វាជាសរសៃឈាមដែលធ្វើឲ្យកសិកម្មកម្ពុជាអាចទៅរួច។ ទឹកជំនន់ប្រចាំឆ្នាំបំបែកល្បាប់ស្រស់ៗលើវាលស្រែ និងទឹករបស់វាបំពេញប្រឡាយដែលបានបង្ហូរទៅភូមិតាំងពីសម័យអង្គរ។"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Empire of Stone
// ════════════════════════════════════════════════════════════════════════════

function SectionEmpire({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-10" data-testid="section-empire">
      <SectionHeader
        spec="03"
        en="The Empire of Stone"
        kh="អាណាចក្រថ្ម"
        k={k}
        Icon={Landmark}
      />

      <div
        className="relative rounded-2xl border-2 p-5 sm:p-7 shadow-md overflow-hidden mb-5"
        style={{ borderColor: `${GOLD_DEEP}99`, ...PARCHMENT }}
        data-testid="angkor-card"
      >
        <CornerFlourish />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Landmark className="w-5 h-5" style={{ color: GOLD_DEEP }} />
          <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
            {t("Angkor Wat", "អង្គរវត្ត")}
          </h3>
          <span
            className={`text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : "italic"}`}
            style={{ color: GOLD }}
          >
            {t("12th century · sandstone", "សតវត្សទី១២ · ថ្មខ្សាច់")}
          </span>
        </div>
        <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "Angkor Wat is the largest religious monument in the world by area. Originally built in the early 1100s by King Suryavarman II as a temple to the god Vishnu, it was later converted into a Buddhist site. Its central towers are designed to represent Mount Meru — the sacred mountain at the centre of the universe in Hindu and Buddhist cosmology.",
            "ប្រាសាទអង្គរវត្ត គឺជាស្ថាបនិមិត្តសាសនាធំបំផុតក្នុងពិភពលោកតាមផ្ទៃដី។ ដំបូងសាងសង់នៅដើមឆ្នាំ ១១០០ ដោយព្រះបាទសូរ្យវរ្ម័នទី ២ ជាប្រាសាទសម្រាប់ព្រះវិស្ណុ ក្រោយមកត្រូវបានបំប្លែងជាស្ថាបនិមិត្តពុទ្ធសាសនា។ ប៉មកណ្ដាលរបស់វាត្រូវបានរចនាដើម្បីតំណាងភ្នំព្រះសុមេរុ — ភ្នំពិសិដ្ឋនៅចំកណ្ដាលនៃចក្រវាឡក្នុងវិទ្យាសាស្ត្រចក្រវាឡហិណ្ឌូ និងពុទ្ធសាសនា។"
          )}
        </p>

        <UncommonFactCallout
          k={k}
          enTitle="An engineering empire visible from space."
          khTitle="អាណាចក្រវិស្វកម្មអាចមើលឃើញពីលំហ។"
          enBody="The ancient Khmer engineers managed the colossal monsoon water of the region using a vast system of barays — rectangular reservoirs and a network of canals. The largest, the West Baray, is roughly 8 km long and 2 km wide. From orbiting satellites today, the perfectly straight outlines of these reservoirs and canals are still clearly visible — a thousand-year-old hydraulic civilisation, still readable from space."
          khBody="វិស្វករខ្មែរបុរាណបានគ្រប់គ្រងទឹកមូសុងដ៏ច្រើនលើសលប់នៃតំបន់នេះ ដោយប្រើប្រព័ន្ធបារាយណ៍ដ៏ធំ — អាងស្តុកទឹកបួនជ្រុង និងបណ្ដាញប្រឡាយ។ បារាយណ៍ធំជាងគេ គឺបារាយណ៍ខាងលិច មានប្រវែងប្រហែល ៨ គីឡូម៉ែត្រ និងទទឹង ២ គីឡូម៉ែត្រ។ ពីផ្កាយរណបដែលកំពុងគោចរសព្វថ្ងៃនេះ ខ្សែបន្ទាត់ត្រង់ឥតខ្ចោះនៃអាង និងប្រឡាយទាំងនេះ នៅតែមើលឃើញច្បាស់ — អរិយធម៌ហ៊ីដ្រូលិកអាយុមួយពាន់ឆ្នាំ ដែលនៅតែអានបានពីលំហ។"
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — Language, Religion & Economy
// ════════════════════════════════════════════════════════════════════════════

function SectionLangRelEcon({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-10" data-testid="section-lang-rel-econ">
      <SectionHeader
        spec="04"
        en="Language, Religion & Economy"
        kh="ភាសា សាសនា និងសេដ្ឋកិច្ច"
        k={k}
        Icon={Languages}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {/* Language */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${GOLD}80`, ...PARCHMENT }}
          data-testid="khmer-language-card"
        >
          <CornerFlourish color={GOLD} />
          <div className="flex items-center gap-2 mb-2">
            <Languages className="w-5 h-5" style={{ color: GOLD_DEEP }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("Khmer Language", "ភាសាខ្មែរ")}
            </h3>
          </div>
          <div
            className="rounded-lg p-3 text-center mb-3 border"
            style={{ borderColor: `${GOLD}66`, backgroundColor: "#fff7d6" }}
          >
            <div className="text-3xl sm:text-4xl font-extrabold font-serif" style={{ color: GOLD_DEEP }}>
              74
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: STONE }}>
              {t("characters", "តួអក្សរ")}
            </div>
          </div>
          <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Khmer has one of the largest alphabets in the world — 33 consonants, 23 dependent vowels, and additional independent vowels. Its script is descended from ancient South Indian Brahmi and has evolved continuously for more than 1,400 years.",
              "ភាសាខ្មែរ មានអក្សរវែងបំផុតមួយក្នុងពិភពលោក — ព្យញ្ជនៈ ៣៣ តួ ស្រៈអាស្រ័យ ២៣ តួ និងស្រៈនិស្ស័យបន្ថែមទៀត។ អក្សររបស់វាមានដើមកំណើតពីអក្សរព្រាហ្មីឥណ្ឌាខាងត្បូងបុរាណ ហើយបានវិវត្តន៍ជាបន្តបន្ទាប់អស់រយៈពេលជាង ១,៤០០ ឆ្នាំ។"
            )}
          </p>
        </div>

        {/* Religion */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${GOLD}80`, ...PARCHMENT }}
          data-testid="religion-card"
        >
          <CornerFlourish color={GOLD} />
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5" style={{ color: GOLD_DEEP }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("Theravada Buddhism", "ពុទ្ធសាសនាថេរវាទ")}
            </h3>
          </div>
          <div
            className="rounded-lg p-3 text-center mb-3 border"
            style={{ borderColor: `${GOLD}66`, backgroundColor: "#fff7d6" }}
          >
            <div className="text-3xl sm:text-4xl font-extrabold font-serif" style={{ color: GOLD_DEEP }}>
              97%
            </div>
            <div className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: STONE }}>
              {t("of the population", "នៃប្រជាជន")}
            </div>
          </div>
          <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Theravada Buddhism — the oldest surviving school of Buddhism — shapes the daily rhythm of Cambodian life: morning alms for monks, blessings before journeys, the Pchum Ben festival to honour ancestors, and the values of generosity, mindfulness, and respect taught from childhood.",
              "ពុទ្ធសាសនាថេរវាទ — និកាយពុទ្ធសាសនាចាស់ជាងគេបំផុតដែលនៅរស់ — បង្កើតរូបរាងចង្វាក់ប្រចាំថ្ងៃនៃជីវិតកម្ពុជា ៖ ការដាក់បាត្រព្រះសង្ឃពេលព្រឹក ការជូនពរមុនធ្វើដំណើរ បុណ្យភ្ជុំបិណ្ឌដើម្បីឧទ្ទិសដល់បុព្វបុរស និងគុណធម៌នៃការផ្ដល់ ការយកចិត្តទុកដាក់ និងការគោរព ដែលបង្រៀនតាំងពីកុមារភាព។"
            )}
          </p>
        </div>

        {/* Economy */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${GOLD}80`, ...PARCHMENT }}
          data-testid="economy-card"
        >
          <CornerFlourish color={GOLD} />
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5" style={{ color: GOLD_DEEP }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("The Modern Economy", "សេដ្ឋកិច្ចសម័យទំនើប")}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded-lg border p-2 text-center" style={{ borderColor: `${FOREST}66`, backgroundColor: "#ecfdf5" }}>
              <Wheat className="w-4 h-4 mx-auto mb-0.5" style={{ color: FOREST }} />
              <div className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: FOREST }}>
                {t("then", "មុន")}
              </div>
              <div className={`text-xs font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                {t("Rice · Rubber", "ស្រូវ · កៅស៊ូ")}
              </div>
            </div>
            <div className="rounded-lg border p-2 text-center" style={{ borderColor: `${GOLD}66`, backgroundColor: "#fff7d6" }}>
              <Factory className="w-4 h-4 mx-auto mb-0.5" style={{ color: GOLD_DEEP }} />
              <div className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: GOLD_DEEP }}>
                {t("now", "ឥឡូវ")}
              </div>
              <div className={`text-xs font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
                {t("Textiles · Tourism · Tech", "តម្បាញ · ទេសចរណ៍ · បច្ចេកវិទ្យា")}
              </div>
            </div>
          </div>

          <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Cambodia is steadily transitioning from a purely agricultural economy to a growing hub for garment exports, tourism, and an emerging technology and start-up scene — without abandoning the rice fields and rubber plantations that still feed millions.",
              "កម្ពុជាកំពុងផ្លាស់ប្ដូរជាបណ្ដើរៗពីសេដ្ឋកិច្ចកសិកម្មសុទ្ធ ទៅជាមជ្ឈមណ្ឌលដែលកំពុងរីកចម្រើនសម្រាប់នាំចេញសម្លៀកបំពាក់ ទេសចរណ៍ និងវិស័យបច្ចេកវិទ្យា និង Start-up ដែលកំពុងនឹងផុសឡើង — ដោយមិនបោះបង់វាលស្រែ និងចម្ការកៅស៊ូដែលនៅតែចិញ្ចឹមមនុស្សរាប់លាននោះទេ។"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 05 — Famous Intellectual Thinkers
// ════════════════════════════════════════════════════════════════════════════

function SectionThinkers({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-thinkers">
      <SectionHeader
        spec="05"
        en="Famous Intellectual Thinkers"
        kh="អ្នកប្រាជ្ញល្បីៗ"
        k={k}
        Icon={Lightbulb}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {/* Chuon Nath */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${GOLD_DEEP}80`, ...PARCHMENT }}
          data-testid="thinker-chuon-nath"
        >
          <CornerFlourish />
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <PenTool className="w-5 h-5" style={{ color: GOLD_DEEP }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("Samdech Chuon Nath", "សម្ដេចជួន ណាត")}
            </h3>
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mb-3 italic ${k ? "font-khmer not-italic normal-case tracking-normal" : ""}`}
            style={{ color: GOLD }}
          >
            1883 — 1969 · {t("monk · scholar · linguist", "ព្រះសង្ឃ · បណ្ឌិត · ភាសាវិទូ")}
          </div>

          <p className={`text-sm text-amber-950 mb-3 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Samdech Chuon Nath was the Buddhist Patriarch and the towering intellectual who built the modern Khmer dictionary — a monumental project that standardised the written language and protected it from being absorbed into French or Sanskrit. He also wrote the lyrics to the national anthem, ",
              "សម្ដេចព្រះសង្ឃរាជ ជួន ណាត គឺជាព្រះសង្ឃរាជ និងជាអ្នកប្រាជ្ញដ៏ខ្ពង់ខ្ពស់ ដែលបានសាងវចនានុក្រមខ្មែរសម័យទំនើប — គម្រោងដ៏ធំសម្បើមដែលបានធ្វើស្តង់ដាភាសាសរសេរ និងការពារវាពីការទទួលបានឥទ្ធិពលជាតិបារាំង ឬសំស្ក្រឹត។ ព្រះអង្គក៏បានតែងបទចម្រៀងភ្លេងជាតិ "
            )}
            <strong className="font-bold">{t("\u201CNokoreach\u201D", "«នគររាជ»")}</strong>
            {t(
              ". Without his life's work, the Khmer language as it is read and printed today would not exist in its current form.",
              " ផងដែរ។ បើគ្មានស្នាដៃជីវិតរបស់ព្រះអង្គទេ ភាសាខ្មែរដូចដែលត្រូវបានអាន និងបោះពុម្ពសព្វថ្ងៃនេះ នឹងមិនមានក្នុងទម្រង់បច្ចុប្បន្ននោះទេ។"
            )}
          </p>

          <blockquote
            className={`relative pl-4 border-l-4 italic text-amber-950 ${k ? "font-khmer not-italic leading-loose" : "font-serif"}`}
            style={{ borderColor: GOLD_DEEP }}
          >
            <Quote className="absolute -left-3 -top-1 w-4 h-4 bg-[#fffaec]" style={{ color: GOLD_DEEP }} aria-hidden="true" />
            <span className="text-sm">
              {t(
                "\u201CA nation that loses its language loses its soul.\u201D",
                "«ជាតិដែលបាត់បង់ភាសារបស់ខ្លួន គឺបាត់បង់ព្រលឹង។»"
              )}
            </span>
          </blockquote>
        </div>

        {/* Keng Vansak */}
        <div
          className="relative rounded-2xl border-2 p-5 shadow-md overflow-hidden"
          style={{ borderColor: `${GOLD_DEEP}80`, ...PARCHMENT }}
          data-testid="thinker-keng-vansak"
        >
          <CornerFlourish />
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Hammer className="w-5 h-5" style={{ color: GOLD_DEEP }} />
            <h3 className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
              {t("Keng Vansak", "កេង វ៉ាន់សាក់")}
            </h3>
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mb-3 italic ${k ? "font-khmer not-italic normal-case tracking-normal" : ""}`}
            style={{ color: GOLD }}
          >
            1925 — 2008 · {t("linguist · inventor · professor", "ភាសាវិទូ · អ្នកបង្កើត · សាស្ត្រាចារ្យ")}
          </div>

          <p className={`text-sm text-amber-950 mb-3 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Keng Vansak was a brilliant Cambodian linguist, philosopher, and Sorbonne-trained scholar who spent his life modernising and defending the Khmer language. He wrote and lectured widely on Khmer literature and identity — but his most extraordinary contribution was a piece of engineering, not just an idea.",
              "កេង វ៉ាន់សាក់ គឺជាភាសាវិទូ ទស្សនវិទូ និងបណ្ឌិតបណ្ដុះបណ្ដាលពី Sorbonne ដ៏ឆ្លាតវៃរបស់កម្ពុជា ដែលបានចំណាយជីវិតដើម្បីធ្វើឲ្យទាន់សម័យ និងការពារភាសាខ្មែរ។ លោកបានសរសេរ និងបង្រៀនយ៉ាងទូលំទូលាយអំពីអក្សរសិល្ប៍ និងអត្តសញ្ញាណខ្មែរ — ប៉ុន្តែការរួមចំណែកគួរឲ្យកត់សម្គាល់បំផុតរបស់លោក គឺជាបំណែកវិស្វកម្ម មិនមែនគ្រាន់តែជាគំនិតទេ។"
            )}
          </p>

          <UncommonFactCallout
            k={k}
            enTitle="The first Khmer typewriter keyboard."
            khTitle="ក្ដារចុចម៉ាស៊ីនវាយអក្សរខ្មែរដំបូងគេ។"
            enBody="In the 1950s, Keng Vansak invented the first practical Khmer typewriter keyboard — a problem that had defeated linguists and engineers for decades because of the script's complex stacked consonants and dependent vowels. His layout finally allowed the Khmer alphabet to enter the modern age of printing, journalism, and — eventually — the digital keyboards used on every Cambodian phone today."
            khBody="នៅទសវត្សរ៍ ១៩៥០ លោកកេង វ៉ាន់សាក់ បានបង្កើតក្ដារចុចម៉ាស៊ីនវាយអក្សរខ្មែរ ដែលប្រើបានដំបូងគេ — បញ្ហាដែលបានឈ្នះលើភាសាវិទូ និងវិស្វករអស់ជាច្រើនទសវត្សរ៍ ដោយសារព្យញ្ជនៈជើង និងស្រៈអាស្រ័យដ៏ស្មុគស្មាញនៃអក្សរ។ ប្លង់របស់លោកទីបំផុតបានអនុញ្ញាតឲ្យអក្សរខ្មែរ ចូលក្នុងសម័យទំនើបនៃការបោះពុម្ព សារព័ត៌មាន និង — ទីបំផុត — ក្ដារចុចឌីជីថលដែលប្រើនៅលើទូរសព្ទកម្ពុជាគ្រប់រូបសព្វថ្ងៃនេះ។"
          />
        </div>
      </div>
    </section>
  );
}
