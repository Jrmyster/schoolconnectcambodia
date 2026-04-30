import {
  Waves,
  ArrowLeftRight,
  ArrowRight,
  TreePine,
  Fish,
  Utensils,
  AlertTriangle,
  Construction,
  Axe,
  Maximize2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Bi = { en: string; kh: string };

const SECTION_1: { title: Bi; intro: Bi; dry: Bi; wet: Bi; expand: Bi } = {
  title: {
    en: "The Great Reversal",
    kh: "លំហូរត្រលប់ក្រោយ",
  },
  intro: {
    en: "For half the year, the Tonle Sap river flows out into the Mekong. But during the monsoon season (May to October), the Mekong River swells with so much water that it creates massive pressure, forcing the Tonle Sap river to change direction and flow backward into the lake.",
    kh: "ពាក់កណ្ដាលឆ្នាំ ទន្លេសាបហូរចេញទៅទន្លេមេគង្គ។ ប៉ុន្ដែក្នុងរដូវវស្សា (ឧសភា ដល់ តុលា) ទន្លេមេគង្គហើមឡើងដោយទឹកច្រើនបំផុត ដែលបង្កើតសម្ពាធដ៏ខ្លាំង បង្ខំឱ្យទន្លេសាបប្ដូរទិសដៅ ហើយហូរត្រលប់ក្រោយចូលទៅក្នុងបឹង។",
  },
  dry: {
    en: "Dry season — Tonle Sap → Mekong",
    kh: "រដូវប្រាំង — ទន្លេសាប → មេគង្គ",
  },
  wet: {
    en: "Monsoon — Mekong → Tonle Sap",
    kh: "រដូវវស្សា — មេគង្គ → ទន្លេសាប",
  },
  expand: {
    en: "The lake expands up to 5× its normal size.",
    kh: "បឹងពង្រីកធំជាងធម្មតាដល់ទៅ ៥ ដង។",
  },
};

const SECTION_2: { title: Bi; intro: Bi; nursery: Bi; protein: Bi } = {
  title: {
    en: "The Flooded Forest & The Web of Life",
    kh: "ព្រៃលិចទឹក និងបណ្តាញជីវិត",
  },
  intro: {
    en: "When the lake expands, it swallows the surrounding forests. These submerged trees become the ultimate safe haven and breeding ground for fish.",
    kh: "ពេលបឹងពង្រីក វាលិចព្រៃឈើដែលនៅជុំវិញ។ ដើមឈើដែលលិចទឹកទាំងនេះក្លាយជាជម្រកសុវត្ថិភាពបំផុត និងជាកន្លែងបង្កាត់ពូជសម្រាប់ត្រី។",
  },
  nursery: {
    en: "Submerged trees = safe nurseries where fish lay their eggs and young fry hide from predators.",
    kh: "ដើមឈើលិចទឹក = កន្លែងថែរក្សាសុវត្ថិភាព ដែលត្រីបង្កាត់ពូជ និងកូនត្រីលាក់ខ្លួនពីសត្វស៊ីសាច់។",
  },
  protein: {
    en: "This single biological event provides the vast majority of the animal protein for the entire country.",
    kh: "ព្រឹត្តិការណ៍ជីវសាស្ត្រតែមួយនេះ ផ្ដល់នូវប្រូតេអ៊ីនពីសត្វភាគច្រើនបំផុត សម្រាប់ប្រទេសទាំងមូល។",
  },
};

const SECTION_3: {
  title: Bi;
  intro: Bi;
  dams: { title: Bi; body: Bi };
  defo: { title: Bi; body: Bi };
} = {
  title: {
    en: "The System Under Threat",
    kh: "ប្រព័ន្ធរងការគំរាមកំហែង",
  },
  intro: {
    en: "Two human pressures can quietly break this delicate cycle.",
    kh: "សម្ពាធពីមនុស្សពីរប្រភេទ អាចបំផ្លាញវដ្ដដ៏ស្មុគ្រស្មាញនេះដោយស្ងាត់ៗ។",
  },
  dams: {
    title: { en: "Upstream Dams", kh: "ទំនប់ទឹកខាងលើ" },
    body: {
      en: "Dams built far away on the Mekong trap the water and the nutrient-rich mud. If the Mekong doesn't swell enough, the river doesn't reverse — and the lake starves.",
      kh: "ទំនប់ទឹកដែលសាងសង់នៅឆ្ងាយលើទន្លេមេគង្គ ស្ទះទឹក និងភក់ដែលសម្បូរសារធាតុចិញ្ចឹម។ បើទន្លេមេគង្គមិនហើមឱ្យបានគ្រប់គ្រាន់ ទេនោះ ទន្លេមិនត្រលប់ក្រោយឡើយ — ហើយបឹងនឹងអត់ឃ្លាន។",
    },
  },
  defo: {
    title: { en: "Deforestation", kh: "ការកាប់បំផ្លាញព្រៃឈើ" },
    body: {
      en: "Cutting down the flooded forests for agriculture destroys the physical 'nurseries' where the fish lay their eggs.",
      kh: "ការកាប់ឆ្ការព្រៃលិចទឹកសម្រាប់កសិកម្ម បំផ្លាញ 'កន្លែងថែរក្សា' ជាក់ស្ដែងដែលត្រីបង្កាត់ពូជ។",
    },
  },
};

export function TonleSapEcology() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const pick = (b: Bi) => (kh ? b.kh : b.en);

  return (
    <div
      className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden"
      data-testid="tonle-sap-ecology"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-sky-50 via-emerald-50 to-white border-b border-emerald-200/70">
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700/80 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          <Waves className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            {kh
              ? "មេរៀនបញ្ចប់ — អេកូឡូស៊ីទន្លេសាប"
              : "Capstone module — Tonle Sap Ecology"}
          </span>
        </div>
        <h3
          className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${
            kh ? "font-khmer leading-snug" : ""
          }`}
        >
          <span>The Heartbeat of the Lake: Tonle Sap Ecology</span>
          <span className="block text-base sm:text-lg font-semibold text-sky-800/80 mt-1 font-khmer">
            ចង្វាក់បេះដូងនៃបឹង៖ អេកូឡូស៊ីទន្លេសាប
          </span>
        </h3>
        <p
          className={`mt-2 text-sm text-stone-600 max-w-2xl ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh
            ? "ទន្លេសាបមិនមែនជាបឹងធម្មតានោះទេ — វាដកដង្ហើម។ វាពង្រីក និងចុះតូចតាមរដូវប្រចាំឆ្នាំ ហើយចង្វាក់បេះដូងនេះ ផ្ដល់ចំណីដល់ប្រទេសកម្ពុជាទាំងមូល។"
            : "The Tonle Sap is not an ordinary lake — it breathes. It swells and shrinks every year, and that single heartbeat feeds the whole country."}
        </p>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="p-5 sm:p-7 space-y-7">
        {/* SECTION 1 — The Great Reversal */}
        <section data-testid="ts-section-1">
          <SectionHeading
            number="01"
            Icon={ArrowLeftRight}
            tone="sky"
            en={SECTION_1.title.en}
            kh={SECTION_1.title.kh}
          />
          <p
            className={`mt-3 text-sm text-stone-700 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {pick(SECTION_1.intro)}
          </p>

          {/* Dry vs Wet flow direction visual */}
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <FlowCard
              tone="amber"
              from="Tonle Sap"
              to="Mekong"
              caption={pick(SECTION_1.dry)}
            />
            <FlowCard
              tone="sky"
              from="Mekong"
              to="Tonle Sap"
              caption={pick(SECTION_1.wet)}
              highlighted
            />
          </div>

          {/* "5× expansion" call-out */}
          <div
            className="mt-4 flex items-start gap-3 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4"
            data-testid="ts-expansion-callout"
          >
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sky-600 text-white flex-shrink-0"
              aria-hidden="true"
            >
              <Maximize2 className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div
                className={`text-[11px] font-mono uppercase tracking-widest text-sky-700/80 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {kh ? "ការពង្រីករបស់បឹង" : "Lake expansion"}
              </div>
              <p
                className={`mt-0.5 text-sm font-semibold text-stone-800 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {pick(SECTION_1.expand)}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Flooded Forest & Web of Life */}
        <section
          className="pt-6 border-t border-emerald-100"
          data-testid="ts-section-2"
        >
          <SectionHeading
            number="02"
            Icon={TreePine}
            tone="emerald"
            en={SECTION_2.title.en}
            kh={SECTION_2.title.kh}
          />
          <p
            className={`mt-3 text-sm text-stone-700 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {pick(SECTION_2.intro)}
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <FactCard
              Icon={Fish}
              tone="emerald"
              titleEn="Safe nurseries"
              titleKh="កន្លែងថែរក្សាសុវត្ថិភាព"
              body={pick(SECTION_2.nursery)}
              kh={kh}
            />
            <FactCard
              Icon={Utensils}
              tone="amber"
              titleEn="Protein for the nation"
              titleKh="ប្រូតេអ៊ីនសម្រាប់ប្រជាជាតិ"
              body={pick(SECTION_2.protein)}
              kh={kh}
            />
          </div>
        </section>

        {/* SECTION 3 — System Under Threat */}
        <section
          className="pt-6 border-t border-emerald-100"
          data-testid="ts-section-3"
        >
          <SectionHeading
            number="03"
            Icon={AlertTriangle}
            tone="rose"
            en={SECTION_3.title.en}
            kh={SECTION_3.title.kh}
          />
          <p
            className={`mt-3 text-sm text-stone-700 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {pick(SECTION_3.intro)}
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <ThreatCard
              Icon={Construction}
              titleEn={SECTION_3.dams.title.en}
              titleKh={SECTION_3.dams.title.kh}
              body={pick(SECTION_3.dams.body)}
              kh={kh}
              testid="ts-threat-dams"
            />
            <ThreatCard
              Icon={Axe}
              titleEn={SECTION_3.defo.title.en}
              titleKh={SECTION_3.defo.title.kh}
              body={pick(SECTION_3.defo.body)}
              kh={kh}
              testid="ts-threat-deforestation"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

const TONES = {
  sky: {
    bubble: "bg-sky-100 text-sky-700",
    badge: "bg-sky-600 text-white",
  },
  emerald: {
    bubble: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-600 text-white",
  },
  rose: {
    bubble: "bg-rose-100 text-rose-700",
    badge: "bg-rose-600 text-white",
  },
  amber: {
    bubble: "bg-amber-100 text-amber-700",
    badge: "bg-amber-600 text-white",
  },
} as const;

type Tone = keyof typeof TONES;

function SectionHeading({
  number,
  Icon,
  tone,
  en,
  kh,
}: {
  number: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone: Tone;
  en: string;
  kh: string;
}) {
  const t = TONES[tone];
  return (
    <div className="flex items-start gap-3">
      <span
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${t.badge} flex-shrink-0`}
        aria-hidden="true"
      >
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400">
          {number}
        </span>
        <h4 className="font-display text-lg sm:text-xl font-bold text-stone-900 leading-tight">
          <span>{en}</span>
          <span className="block text-sm sm:text-base font-semibold text-stone-600 font-khmer mt-0.5">
            {kh}
          </span>
        </h4>
      </div>
    </div>
  );
}

function FlowCard({
  tone,
  from,
  to,
  caption,
  highlighted = false,
}: {
  tone: "amber" | "sky";
  from: string;
  to: string;
  caption: string;
  highlighted?: boolean;
}) {
  const isWet = tone === "sky";
  const ring = highlighted
    ? "ring-2 ring-sky-400/60"
    : "ring-1 ring-stone-200";
  const bg = isWet
    ? "bg-gradient-to-br from-sky-50 to-blue-50"
    : "bg-gradient-to-br from-amber-50 to-orange-50";
  const arrowColor = isWet ? "text-sky-600" : "text-amber-600";
  const labelColor = isWet ? "text-sky-800" : "text-amber-800";

  return (
    <div className={`rounded-xl ${bg} ${ring} p-3`}>
      <div
        className={`flex items-center justify-center gap-2 font-bold ${labelColor}`}
      >
        <span className="text-sm">{from}</span>
        <ArrowRight className={`w-4 h-4 ${arrowColor}`} aria-hidden="true" />
        <span className="text-sm">{to}</span>
      </div>
      <p className="mt-1.5 text-[11px] text-center font-mono text-stone-500 font-khmer normal-case">
        {caption}
      </p>
    </div>
  );
}

function FactCard({
  Icon,
  tone,
  titleEn,
  titleKh,
  body,
  kh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  body: string;
  kh: boolean;
}) {
  const t = TONES[tone];
  return (
    <div className="rounded-xl bg-white border border-stone-200 p-4">
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${t.bubble} flex-shrink-0`}
          aria-hidden="true"
        >
          <Icon className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-bold text-stone-900 leading-tight">
            <span>{titleEn}</span>
            <span className="block font-khmer text-xs font-semibold text-stone-600 mt-0.5">
              {titleKh}
            </span>
          </div>
        </div>
      </div>
      <p
        className={`mt-2.5 text-sm text-stone-700 leading-relaxed ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function ThreatCard({
  Icon,
  titleEn,
  titleKh,
  body,
  kh,
  testid,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleKh: string;
  body: string;
  kh: boolean;
  testid: string;
}) {
  return (
    <div
      className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-4 shadow-sm"
      data-testid={testid}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-rose-600 text-white flex-shrink-0"
          aria-hidden="true"
        >
          <Icon className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-rose-700/80">
            <AlertTriangle className="w-3 h-3" aria-hidden="true" />
            <span>{kh ? "ការគំរាមកំហែង" : "Threat"}</span>
          </div>
          <div className="text-sm font-bold text-stone-900 leading-tight mt-0.5">
            <span>{titleEn}</span>
            <span className="block font-khmer text-xs font-semibold text-stone-700 mt-0.5">
              {titleKh}
            </span>
          </div>
        </div>
      </div>
      <p
        className={`mt-2.5 text-sm text-stone-700 leading-relaxed ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
}
