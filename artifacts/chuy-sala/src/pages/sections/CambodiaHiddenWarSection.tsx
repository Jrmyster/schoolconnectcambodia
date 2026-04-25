import {
  AlertTriangle,
  Cog,
  HardHat,
  HeartHandshake,
  Map as MapIcon,
  Rat,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type T = (en: string, kh: string) => string;

const EARTH_DEEP = "#3f1d10";        // burnt soil — heading text
const EARTH = "#7c2d12";             // warm earth
const SAFETY_GREEN = "#15803d";      // safe land / clearers
const SAFETY_GREEN_DEEP = "#14532d";
const ALERT_ORANGE = "#c2410c";      // mine-warning orange
const ALERT_ORANGE_BRIGHT = "#ea580c";
const BONE = "#fbf6ec";

const SECTION_BG: React.CSSProperties = {
  backgroundColor: BONE,
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgba(124, 45, 18, 0.07), transparent 45%)," +
    "radial-gradient(circle at 90% 100%, rgba(21, 128, 61, 0.06), transparent 45%)," +
    "linear-gradient(rgba(124, 45, 18, 0.035) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(124, 45, 18, 0.035) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 40px 40px, 40px 40px",
};

const CARD_PARCHMENT: React.CSSProperties = {
  backgroundColor: "#fffbf2",
  backgroundImage:
    "radial-gradient(circle at 100% 0%, rgba(124, 45, 18, 0.06), transparent 35%)",
};

function HiddenWarCorner({ color }: { color: string }) {
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
          className={`pointer-events-none absolute ${pos} w-3.5 h-3.5 ${b}`}
          style={{ borderColor: color, opacity: 0.5 }}
        />
      ))}
    </div>
  );
}

function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-1.5 w-full"
      style={{
        backgroundImage:
          `repeating-linear-gradient(135deg, ${ALERT_ORANGE_BRIGHT} 0 14px, ${EARTH_DEEP} 14px 28px)`,
      }}
    />
  );
}

function CardShell({
  testId,
  accent,
  Icon,
  enTag,
  khTag,
  enTitle,
  khTitle,
  k,
  children,
}: {
  testId: string;
  accent: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enTag: string;
  khTag: string;
  enTitle: string;
  khTitle: string;
  k: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className="relative rounded-2xl border-2 shadow-md overflow-hidden"
      style={{ borderColor: `${accent}99`, ...CARD_PARCHMENT }}
      data-testid={testId}
    >
      <HazardStripe />
      <HiddenWarCorner color={accent} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <Icon className="w-6 h-6 text-amber-50" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] font-mono tracking-[0.2em] uppercase ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: accent }}
            >
              {k ? khTag : enTag}
            </div>
            <h3
              className={`text-lg sm:text-xl font-bold leading-tight ${k ? "font-khmer" : "font-serif"}`}
              style={{ color: EARTH_DEEP }}
            >
              {k ? khTitle : enTitle}
            </h3>
          </div>
        </div>
        <div
          className={`text-sm space-y-3 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}
          style={{ color: "#3d2317" }}
        >
          {children}
        </div>
      </div>
    </article>
  );
}

function StatChip({
  k,
  enLabel,
  khLabel,
  value,
  color,
}: {
  k: boolean;
  enLabel: string;
  khLabel: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-lg border-2 px-3 py-2 flex items-baseline gap-2 bg-white/70"
      style={{ borderColor: `${color}66` }}
    >
      <span className="font-mono text-base font-bold" style={{ color }}>
        {value}
      </span>
      <span
        className={`text-[11px] uppercase tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "font-serif"}`}
        style={{ color: EARTH_DEEP }}
      >
        {k ? khLabel : enLabel}
      </span>
    </div>
  );
}

function OrgRow({
  k,
  abbr,
  enName,
  khName,
  enRole,
  khRole,
  testId,
}: {
  k: boolean;
  abbr: string;
  enName: string;
  khName: string;
  enRole: string;
  khRole: string;
  testId: string;
}) {
  return (
    <div
      className="rounded-lg border-2 p-3 flex items-start gap-3 bg-white/60"
      style={{ borderColor: `${SAFETY_GREEN}55` }}
      data-testid={testId}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-amber-50 shadow"
        style={{ backgroundColor: SAFETY_GREEN_DEEP }}
      >
        {abbr}
      </div>
      <div>
        <div
          className={`text-sm font-bold ${k ? "font-khmer" : "font-serif"}`}
          style={{ color: EARTH_DEEP }}
        >
          {k ? khName : enName}
        </div>
        <div
          className={`text-xs mt-0.5 ${k ? "font-khmer leading-loose" : "font-serif leading-snug"}`}
          style={{ color: "#3d2317" }}
        >
          {k ? khRole : enRole}
        </div>
      </div>
    </div>
  );
}

export default function CambodiaHiddenWarSection({ k, t }: { k: boolean; t: T }) {
  return (
    <section
      id="hidden-war"
      className="mt-10 mb-2 scroll-mt-24"
      data-testid="section-hidden-war"
    >
      {/* Section header — distinct treatment to mark this as a new themed area */}
      <div
        className="relative rounded-2xl border-2 overflow-hidden mb-5 shadow"
        style={{ borderColor: EARTH_DEEP, ...SECTION_BG }}
      >
        <HazardStripe />
        <div className="p-5 sm:p-6 flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow"
            style={{ backgroundColor: EARTH_DEEP }}
          >
            <AlertTriangle className="w-7 h-7" style={{ color: "#fde68a" }} />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`text-[10px] font-mono tracking-[0.3em] uppercase mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: ALERT_ORANGE }}
            >
              SEC-06 · {t("Sensitive Topic", "ប្រធានបទរសើប")}
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : "font-serif"}`}
              style={{ color: EARTH_DEEP }}
              data-testid="hidden-war-title"
            >
              {t(
                "The Hidden War: Landmines & Demining",
                "សង្គ្រាមដែលលាក់កំបាំង៖ គ្រាប់មីន និងការបោសសម្អាត"
              )}
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base max-w-2xl ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed italic"}`}
              style={{ color: "#3d2317" }}
            >
              {t(
                "A respectful look at one of the longest-running humanitarian challenges in modern Cambodian history — and at the engineers, deminers, and even animals working to give the land back to the people.",
                "ការមើលដោយការគោរពមួយលើបញ្ហាមនុស្សធម៌ដ៏យូរលង់បំផុតមួយក្នុងប្រវត្តិសាស្ត្រកម្ពុជាសម័យទំនើប — និងវិស្វករ អ្នកបោសសម្អាត និងសូម្បីតែសត្វ ដែលកំពុងធ្វើការដើម្បីប្រគល់ដីត្រឡប់ទៅឲ្យប្រជាជនវិញ។"
              )}
            </p>
          </div>
        </div>
        <HazardStripe />
      </div>

      {/* The four cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Card 1: K5 Belt & Scale */}
        <CardShell
          testId="hw-card-k5"
          accent={ALERT_ORANGE}
          Icon={MapIcon}
          enTag="Card 01 · The Scale"
          khTag="កាត ០១ · ទំហំនៃបញ្ហា"
          enTitle="The K5 Belt & The Scale of the Problem"
          khTitle="ខ្សែក្រវាត់ K5 និងទំហំនៃបញ្ហា"
          k={k}
        >
          <p>
            {t(
              "During the decades of conflict in the 1970s and 1980s, an estimated 4 to 6 million landmines and millions more pieces of unexploded ordnance were planted across Cambodian soil. They were laid by many different armies — and almost no one kept maps.",
              "ក្នុងរយៈពេលប៉ុន្មានទសវត្សរ៍នៃជម្លោះក្នុងទសវត្សរ៍ ១៩៧០ និង ១៩៨០ បានគេប៉ាន់ស្មានថា គ្រាប់មីនចំនួន ៤ ទៅ ៦ លាន និងគ្រាប់ផ្ទុះមិនរលាយរាប់លានបន្ថែមទៀត ត្រូវបានដាក់នៅទូទាំងផែនដីកម្ពុជា។ ពួកវាត្រូវបានដាក់ដោយកងទ័ពផ្សេងៗគ្នាជាច្រើន — ហើយស្ទើរតែគ្មាននរណាម្នាក់រក្សាផែនទីទេ។"
            )}
          </p>

          <div className="grid grid-cols-2 gap-2 my-3">
            <StatChip
              k={k}
              value="4–6M"
              enLabel="mines laid"
              khLabel="មីនត្រូវបានដាក់"
              color={ALERT_ORANGE}
            />
            <StatChip
              k={k}
              value="~750 km"
              enLabel="K5 belt length"
              khLabel="ប្រវែងខ្សែក្រវាត់ K5"
              color={ALERT_ORANGE}
            />
          </div>

          <p>
            <strong className={k ? "" : "font-bold"} style={{ color: EARTH_DEEP }}>
              {t("The K5 Belt. ", "ខ្សែក្រវាត់ K5។ ")}
            </strong>
            {t(
              "The single most heavily mined zone is the so-called \u201CK5 Belt\u201D — a massive defensive line of mines and barriers running for hundreds of kilometres along the entire Cambodian–Thai border. Even today, it remains one of the most densely mined strips of land on Earth.",
              "តំបន់តែមួយដែលមានគ្រាប់មីនច្រើនបំផុត គឺហៅថា «ខ្សែក្រវាត់ K5» — ខ្សែការពារដ៏ធំដែលតម្រៀបពីគ្រាប់មីន និងរបាំង ដែលលាតសន្ធឹងរាប់រយគីឡូម៉ែត្រ តាមបណ្ដោយព្រំដែនកម្ពុជា–ថៃទាំងមូល។ សូម្បីសព្វថ្ងៃ វានៅតែជាខ្សែដីមួយដែលមានគ្រាប់មីនច្រើនបំផុតនៅលើពិភពលោក។"
            )}
          </p>
          <p>
            <strong className={k ? "" : "font-bold"} style={{ color: EARTH_DEEP }}>
              {t("The tragedy of time. ", "សោកនាដកម្មនៃពេលវេលា។ ")}
            </strong>
            {t(
              "Landmines do not know when a war ends. Because most modern mines use plastic casings instead of metal, they do not rust or rot. They can wait quietly in the dirt for fifty years — until a farmer ploughs a new field, or a child runs into the long grass.",
              "គ្រាប់មីនមិនដឹងពេលដែលសង្គ្រាមបញ្ចប់ទេ។ ដោយសារតែគ្រាប់មីនសម័យទំនើបភាគច្រើនប្រើស្រោមប្លាស្ទិកជំនួសឲ្យលោហៈ ពួកវាមិនច្រេះ ឬពុកផុយឡើយ។ ពួកវាអាចរង់ចាំស្ងៀមនៅក្នុងដី រហូតដល់ហាសិបឆ្នាំ — រហូតដល់កសិករភ្ជួរវាលថ្មី ឬកុមារម្នាក់រត់ចូលស្មៅវែង។"
            )}
          </p>
        </CardShell>

        {/* Card 2: Anatomy of a Mine */}
        <CardShell
          testId="hw-card-anatomy"
          accent={EARTH}
          Icon={Cog}
          enTag="Card 02 · The Engineering"
          khTag="កាត ០២ · វិស្វកម្ម"
          enTitle="The Anatomy of a Mine"
          khTitle="កាយវិភាគវិទ្យានៃគ្រាប់មីន"
          k={k}
        >
          <p>
            {t(
              "An anti-personnel landmine is, mechanically, a very simple machine. Here is the whole device in five parts:",
              "គ្រាប់មីនប្រឆាំងបុគ្គល គឺជាម៉ាស៊ីនដ៏សាមញ្ញមួយ ពីផ្នែកមេកានិច។ ខាងក្រោមនេះជាឧបករណ៍ទាំងមូលក្នុងប្រាំផ្នែក ៖"
            )}
          </p>

          <ol
            className={`pl-5 list-decimal space-y-1.5 marker:font-bold ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: "#3d2317" }}
          >
            <li>
              <strong className={k ? "" : "font-semibold"}>
                {t("Pressure plate. ", "បន្ទះសម្ពាធ។ ")}
              </strong>
              {t(
                "A small disc on top, designed with a specific weight threshold — usually 5 to 10 kilograms.",
                "ថាសតូចមួយនៅខាងលើ ដែលត្រូវបានបង្កើតឡើងដោយមានកម្រិតទម្ងន់ជាក់លាក់ — ជាធម្មតាពី ៥ ទៅ ១០ គីឡូក្រាម។"
              )}
            </li>
            <li>
              <strong className={k ? "" : "font-semibold"}>{t("Spring. ", "ស្ព្រីង។ ")}</strong>
              {t(
                "When that weight presses down, a spring is compressed.",
                "ពេលដែលទម្ងន់នោះចុចចុះ ស្ព្រីងមួយត្រូវបានបង្ហាប់។"
              )}
            </li>
            <li>
              <strong className={k ? "" : "font-semibold"}>
                {t("Firing pin. ", "ខ្ទាស់បាញ់។ ")}
              </strong>
              {t(
                "The compressed spring releases a metal firing pin.",
                "ស្ព្រីងដែលត្រូវបានបង្ហាប់ បញ្ចេញខ្ទាស់បាញ់ដែលធ្វើពីលោហៈ។"
              )}
            </li>
            <li>
              <strong className={k ? "" : "font-semibold"}>
                {t("Detonator. ", "កន្ទុយផ្ទុះ។ ")}
              </strong>
              {t(
                "The pin strikes a small, sensitive detonator cap.",
                "ខ្ទាស់ប៉ះលើក្បាលផ្ទុះតូចមួយដែលងាយរំញោច។"
              )}
            </li>
            <li>
              <strong className={k ? "" : "font-semibold"}>
                {t("Main charge (TNT). ", "សារធាតុផ្ទុះមេ (TNT)។ ")}
              </strong>
              {t(
                "The detonator ignites the main explosive charge — usually TNT — and the mine fires.",
                "កន្ទុយផ្ទុះបង្កើតភ្លើងទៅសារធាតុផ្ទុះមេ — ជាធម្មតាគឺ TNT — ហើយគ្រាប់មីនផ្ទុះ។"
              )}
            </li>
          </ol>

          <p
            className="mt-2 rounded-md border-l-4 pl-3 py-1.5"
            style={{ borderColor: ALERT_ORANGE, backgroundColor: "#fff7ed" }}
          >
            {t(
              "That is the entire device. There is no electronics, no battery — nothing to fail. That is exactly what makes them so cruel: they keep working, perfectly, for decades after the people who made them are gone.",
              "នេះគឺជាឧបករណ៍ទាំងមូល។ គ្មានឌីជីថល គ្មានថ្ម — គ្មានអ្វីដែលត្រូវខូចទេ។ នេះជាអ្វីដែលធ្វើឲ្យពួកវាឃោរឃៅយ៉ាងខ្លាំង ៖ ពួកវានៅតែដំណើរការ យ៉ាងល្អឥតខ្ចោះ អស់ជាច្រើនទសវត្សរ៍ បន្ទាប់ពីមនុស្សដែលបានបង្កើតពួកវាបានទៅហើយ។"
            )}
          </p>
        </CardShell>

        {/* Card 3: The Clearers */}
        <CardShell
          testId="hw-card-clearers"
          accent={SAFETY_GREEN}
          Icon={HardHat}
          enTag="Card 03 · National Heroes"
          khTag="កាត ០៣ · វីរបុរសជាតិ"
          enTitle="The Clearers"
          khTitle="អ្នកបោសសម្អាត"
          k={k}
        >
          <p>
            {t(
              "Three organisations form the core of Cambodia's daily demining work. Their staff put on body armour and a visor at sunrise and walk slowly, on their knees, into ground that other people are afraid to cross.",
              "អង្គការបីបង្កើតបានជាស្នូលនៃការបោសសម្អាតគ្រាប់មីនប្រចាំថ្ងៃនៅកម្ពុជា។ បុគ្គលិករបស់ពួកគេពាក់អាវការពារ និងរបាំងមុខពីព្រឹកព្រលឹម និងដើរយឺតៗ ដោយលុតជង្គង់ ចូលទៅលើដីដែលអ្នកដទៃខ្លាចឆ្លងកាត់។"
            )}
          </p>

          <div className="space-y-2">
            <OrgRow
              k={k}
              abbr="CMAC"
              enName="Cambodian Mine Action Centre"
              khName="មជ្ឈមណ្ឌលសកម្មភាពកម្ចាត់មីនកម្ពុជា"
              enRole="The largest national operator, founded in 1992. Trains Cambodian deminers and clears land back into farms and schools."
              khRole="ប្រតិបត្តិករជាតិធំជាងគេ បង្កើតឡើងក្នុងឆ្នាំ ១៩៩២។ បណ្ដុះបណ្ដាលអ្នកបោសសម្អាតជនជាតិកម្ពុជា និងបោសសម្អាតដី បំលែងវាត្រឡប់ទៅជាចម្ការ និងសាលារៀន។"
              testId="hw-org-cmac"
            />
            <OrgRow
              k={k}
              abbr="HALO"
              enName="The HALO Trust"
              khName="អង្គការ HALO Trust"
              enRole="A British humanitarian charity that has worked in Cambodia since 1991, with thousands of locally hired deminers."
              khRole="អង្គការមនុស្សធម៌អង់គ្លេស ដែលបានធ្វើការនៅកម្ពុជាតាំងពីឆ្នាំ ១៩៩១ ដោយមានអ្នកបោសសម្អាតក្នុងស្រុករាប់ពាន់នាក់។"
              testId="hw-org-halo"
            />
            <OrgRow
              k={k}
              abbr="MAG"
              enName="Mines Advisory Group"
              khName="ក្រុមប្រឹក្សាគ្រាប់មីន (MAG)"
              enRole="Specialises in clearing villages and giving safety education to children who live near suspected minefields."
              khRole="ឯកទេសក្នុងការបោសសម្អាតភូមិ និងផ្ដល់ការអប់រំសុវត្ថិភាពដល់កុមារ ដែលរស់នៅជិតតំបន់សង្ស័យថាមានគ្រាប់មីន។"
              testId="hw-org-mag"
            />
          </div>

          <p
            className="mt-2 rounded-md border-l-4 pl-3 py-1.5 italic"
            style={{ borderColor: SAFETY_GREEN, backgroundColor: "#f0fdf4" }}
          >
            {t(
              "These deminers are national heroes. They walk into danger every single day so that, one square metre at a time, other people can walk safely.",
              "អ្នកបោសសម្អាតទាំងនេះ គឺជាវីរបុរសជាតិ។ ពួកគេដើរចូលទៅក្នុងគ្រោះថ្នាក់រាល់ថ្ងៃ ដើម្បីឲ្យអ្នកដទៃ — មួយម៉ែត្រការ៉េម្ដងៗ — អាចដើរបានដោយសុវត្ថិភាព។"
            )}
          </p>
        </CardShell>

        {/* Card 4: The Hero Rats */}
        <CardShell
          testId="hw-card-rats"
          accent={SAFETY_GREEN_DEEP}
          Icon={Rat}
          enTag="Card 04 · Frugal Engineering"
          khTag="កាត ០៤ · វិស្វកម្មសន្សំសំចៃ"
          enTitle="The Hero Rats of APOPO"
          khTitle="កណ្ដុរវីរបុរសនៃអង្គការ APOPO"
          k={k}
        >
          <p>
            <strong className={k ? "" : "font-bold"} style={{ color: EARTH_DEEP }}>
              {t("The problem with metal detectors. ", "បញ្ហាជាមួយឧបករណ៍រកលោហៈ។ ")}
            </strong>
            {t(
              "A metal detector finds metal — not explosives. In Cambodia's old battlefields the soil is full of metal scrap: nails, tin cans, shell fragments, bullet casings. A deminer can spend hours carefully digging up an old tin can.",
              "ឧបករណ៍រកលោហៈរកលោហៈ — មិនមែនជាសារធាតុផ្ទុះទេ។ នៅសមរភូមិចាស់ៗរបស់កម្ពុជា ដីពោរពេញដោយសំណង់លោហៈ ៖ ដែកគោល កំប៉ុងសំណប៉ាហាំង បំណែកគ្រាប់ផ្ទុះ និងស្រោមគ្រាប់កាំភ្លើង។ អ្នកបោសសម្អាតម្នាក់ អាចចំណាយម៉ោងយ៉ាងប្រុងប្រយ័ត្ន ដើម្បីជីករកកំប៉ុងចាស់មួយ។"
            )}
          </p>

          <p>
            <strong className={k ? "" : "font-bold"} style={{ color: EARTH_DEEP }}>
              {t("The APOPO solution. ", "ដំណោះស្រាយរបស់ APOPO។ ")}
            </strong>
            {t(
              "APOPO, a Belgian non-profit, trains African giant pouched rats — sometimes called HeroRATs — to do the job of the detector instead. The rats are taught from a few weeks old to recognise one specific scent: the chemical compound of TNT.",
              "អង្គការ APOPO ដែលជាអង្គការមិនរកប្រាក់ចំណេញនៃប្រទេសប៊ែលហ្ស៊ិក បណ្ដុះបណ្ដាលកណ្ដុរយក្សអាហ្វ្រិកមានហោប៉ៅ — ពេលខ្លះហៅថា HeroRATs — ដើម្បីធ្វើការងារនេះជំនួសឧបករណ៍រកលោហៈ។ កណ្ដុរទាំងនេះត្រូវបានបង្រៀនតាំងពីអាយុប៉ុន្មានសប្ដាហ៍ ឲ្យស្គាល់ក្លិនជាក់លាក់មួយ ៖ សមាសធាតុគីមីនៃ TNT។"
            )}
          </p>

          <div className="grid grid-cols-2 gap-2 my-1">
            <StatChip
              k={k}
              value="~1.2 kg"
              enLabel="rat weight"
              khLabel="ទម្ងន់កណ្ដុរ"
              color={SAFETY_GREEN}
            />
            <StatChip
              k={k}
              value="5 kg"
              enLabel="trigger threshold"
              khLabel="កម្រិតកេះ"
              color={SAFETY_GREEN}
            />
          </div>

          <p>
            <strong className={k ? "" : "font-bold"} style={{ color: EARTH_DEEP }}>
              {t("The science. ", "វិទ្យាសាស្ត្រ។ ")}
            </strong>
            {t(
              "Two facts make this work. First, rats have an extraordinary sense of smell — they can ignore the scrap metal completely and follow the TNT scent directly to the buried mine. Second, an adult HeroRAT only weighs about 1.2 kilograms — far below the 5 kilogram pressure threshold needed to trigger an anti-personnel mine. They can walk safely across a minefield, find the exact spot of buried TNT, and scratch the dirt to alert their human handler. A single rat can clear a tennis-court-sized patch in about thirty minutes — work that might take a person with a metal detector several days.",
              "ការពិតពីរធ្វើឲ្យវិធីនេះដំណើរការ។ ទីមួយ កណ្ដុរមានវិញ្ញាណធំធាត់ខាងក្លិន — ពួកវាអាចមិនអើពើនឹងសំណង់លោហៈទាំងស្រុង ហើយដើរតាមក្លិន TNT ត្រង់ទៅគ្រាប់មីនដែលកប់នៅក្រោមដី។ ទីពីរ HeroRAT ពេញវ័យមានទម្ងន់ប្រហែល ១,២ គីឡូក្រាមប៉ុណ្ណោះ — ទាបជាងកម្រិតសម្ពាធ ៥ គីឡូក្រាមដែលត្រូវការដើម្បីកេះគ្រាប់មីនប្រឆាំងបុគ្គល។ ពួកវាអាចដើរដោយសុវត្ថិភាពកាត់ទីលានគ្រាប់មីន រកកន្លែងជាក់លាក់នៃ TNT ដែលកប់ ហើយកោរដីដើម្បីប្រាប់ដៃគូមនុស្សរបស់ពួកវា។ កណ្ដុរតែមួយ អាចបោសសម្អាតផ្ទៃប៉ុនទីលានវាយតិននីសក្នុងរយៈពេលប្រហែលសាមសិបនាទី — ការងារដែលអាចត្រូវការមនុស្សម្នាក់ប្រើឧបករណ៍រកលោហៈអស់ច្រើនថ្ងៃ។"
            )}
          </p>
        </CardShell>
      </div>

      {/* Closing — the safe land */}
      <div
        className="relative mt-6 rounded-2xl border-2 p-5 flex items-start gap-3 overflow-hidden shadow"
        style={{ borderColor: SAFETY_GREEN_DEEP, backgroundColor: "#f0fdf4" }}
        data-testid="hw-closing"
      >
        <HiddenWarCorner color={SAFETY_GREEN_DEEP} />
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow"
          style={{ backgroundColor: SAFETY_GREEN_DEEP }}
        >
          <ShieldCheck className="w-5 h-5 text-amber-50" />
        </div>
        <div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.2em] mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: SAFETY_GREEN_DEEP }}
          >
            <Sparkles className="inline w-3 h-3 mr-1" aria-hidden="true" />
            {t("The point of the work", "គោលបំណងនៃការងារ")}
          </div>
          <p
            className={`text-sm ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}
            style={{ color: "#14532d" }}
          >
            <HeartHandshake
              className="inline w-4 h-4 mr-1 align-text-bottom"
              aria-hidden="true"
            />
            {t(
              "Every square metre cleared is a rice paddy that can be planted again, a footpath a child can take to school, a piece of forest a family can walk through without fear. Cambodia has already cleared millions of mines — and with the work of CMAC, HALO, MAG, and the HeroRATs, the country is on track to declare itself mine-free in the coming years.",
              "ផ្ទៃដីរាល់ម៉ែត្រការ៉េដែលត្រូវបានបោសសម្អាត គឺជាស្រែដែលអាចដាំដុះម្ដងទៀតបាន ជាផ្លូវដើរដែលកុមារអាចទៅសាលា ជាបំណែកព្រៃដែលគ្រួសារអាចដើរកាត់បានដោយគ្មានការភ័យខ្លាច។ កម្ពុជាបានបោសសម្អាតគ្រាប់មីនរាប់លានរួចមកហើយ — ហើយជាមួយការងាររបស់ CMAC, HALO, MAG និង HeroRATs ប្រទេសនេះស្ថិតនៅលើផ្លូវប្រកាសខ្លួនថាគ្មានគ្រាប់មីននៅឆ្នាំខាងមុខនេះ។"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
