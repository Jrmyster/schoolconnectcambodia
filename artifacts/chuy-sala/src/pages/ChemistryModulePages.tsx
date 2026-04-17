import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  FlaskConical,
  Microscope,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Beaker,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Shared layout helpers ──────────────────────────────────────────────────────

function ModuleShell({
  number,
  titleEn,
  titleKh,
  introEn,
  introKh,
  icon: Icon,
  accent,
  children,
}: {
  number: string;
  titleEn: string;
  titleKh: string;
  introEn: string;
  introKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: { iconBg: string; title: string; chip: string; bgFrom: string; bgTo: string };
  children: React.ReactNode;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className={`min-h-screen bg-gradient-to-b ${accent.bgFrom} ${accent.bgTo} py-8 sm:py-10 px-4 sm:px-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl ${accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow`}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase ${accent.title} opacity-70 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(`Module ${number}`, `មុខវិជ្ជា ${number}`)}
              </span>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold ${accent.title} ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {kh ? titleKh : titleEn}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {kh ? introKh : introEn}
          </p>
        </header>

        {/* Body */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}

function Section({
  titleEn,
  titleKh,
  children,
}: {
  titleEn: string;
  titleKh: string;
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <section className="rounded-2xl bg-white border border-border shadow-sm p-5 sm:p-6">
      <h2
        className={`text-xl sm:text-2xl font-bold text-foreground mb-3 ${
          kh ? "font-khmer leading-snug" : ""
        }`}
      >
        {kh ? titleKh : titleEn}
      </h2>
      <div
        className={`text-sm sm:text-base text-foreground/85 leading-relaxed space-y-3 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function Term({
  en,
  kh,
}: {
  en: string;
  kh: string;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return isKh ? (
    <span className="font-khmer font-semibold">
      {kh}{" "}
      <span className="text-muted-foreground font-normal text-[0.85em]">({en})</span>
    </span>
  ) : (
    <span className="font-semibold">
      {en}{" "}
      <span className="text-muted-foreground font-normal font-khmer text-[0.85em]">({kh})</span>
    </span>
  );
}

// Bilingual paragraph helper
function P({ en, kh }: { en: string; kh: string }) {
  const { language } = useLanguageStore();
  return <p>{language === "kh" ? kh : en}</p>;
}

// Bilingual list helper (rendered as bullet list)
function BList({
  itemsEn,
  itemsKh,
}: {
  itemsEn: React.ReactNode[];
  itemsKh: React.ReactNode[];
}) {
  const { language } = useLanguageStore();
  const items = language === "kh" ? itemsKh : itemsEn;
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 1 — Building Blocks
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryBuildingBlocksPage() {
  return (
    <ModuleShell
      number="01"
      titleEn="The Building Blocks"
      titleKh="មូលដ្ឋានគ្រឹះ"
      introEn="Everything around you — your body, the air, your phone, the stars — is built from the same tiny LEGO bricks called atoms. Let's open one up."
      introKh="អ្វីៗគ្រប់យ៉ាងជុំវិញខ្លួនអ្នក — រាងកាយរបស់អ្នក ខ្យល់ ទូរសព្ទ ផ្កាយ — សុទ្ធតែសាងសង់ឡើងពីដុំឌុបតូចៗដូចគ្នាដែលហៅថាអាតូម។ តោះបើកវាមើល។"
      icon={Atom}
      accent={{
        iconBg: "bg-sky-600",
        title: "text-sky-900",
        chip: "bg-sky-100 text-sky-800",
        bgFrom: "from-sky-50/40",
        bgTo: "to-background",
      }}
    >
      <Section titleEn="What is an atom?" titleKh="តើអាតូមជាអ្វី?">
        <P
          en="An atom is the smallest unit of an element that still behaves like that element. A single drop of water contains roughly 1.67 sextillion (1.67 × 10²¹) water molecules — and each one is built from 3 atoms."
          kh="អាតូមគឺជាឯកតាតូចបំផុតនៃធាតុមួយ ដែលនៅតែមានលក្ខណៈដូចធាតុនោះ។ ទឹកមួយដំណក់មានម៉ូលេគុលទឹកប្រហែល ១,៦៧ × ១០²¹ — ហើយម៉ូលេគុលនីមួយៗត្រូវបានបង្កើតពីអាតូម ៣។"
        />
        <P
          en="Every atom has two parts: a tiny dense centre called the nucleus, and a cloud of even tinier particles whirling around it."
          kh="អាតូមនីមួយៗមានពីរផ្នែក៖ ចំណុចកណ្តាលតូចក្រាស់មួយហៅថា នុយក្លេអ៊ុស និងពពកនៃភាគល្អិតតូចជាងនេះទៀតដែលរុំព័ទ្ធវា។"
        />
      </Section>

      <Section titleEn="The three particles" titleKh="ភាគល្អិតទាំងបី">
        <div className="grid sm:grid-cols-3 gap-4 not-prose">
          <ParticleCard
            symbol="p⁺"
            color="text-red-700 bg-red-50 border-red-200"
            nameEn="Proton"
            nameKh="ប្រូតុង"
            chargeEn="Charge: +1"
            chargeKh="បន្ទុក៖ +១"
            descEn="Lives in the nucleus. The number of protons defines what element you have."
            descKh="នៅក្នុងនុយក្លេអ៊ុស។ ចំនួនប្រូតុងកំណត់ថាអ្នកមានធាតុអ្វី។"
          />
          <ParticleCard
            symbol="n⁰"
            color="text-slate-700 bg-slate-50 border-slate-200"
            nameEn="Neutron"
            nameKh="ណឺត្រុង"
            chargeEn="Charge: 0"
            chargeKh="បន្ទុក៖ ០"
            descEn="Also in the nucleus. Adds mass and helps hold the nucleus together."
            descKh="ក៏នៅក្នុងនុយក្លេអ៊ុស។ បន្ថែមម៉ាស និងជួយរក្សានុយក្លេអ៊ុសឱ្យជាប់គ្នា។"
          />
          <ParticleCard
            symbol="e⁻"
            color="text-blue-700 bg-blue-50 border-blue-200"
            nameEn="Electron"
            nameKh="អេឡិចត្រុង"
            chargeEn="Charge: −1"
            chargeKh="បន្ទុក៖ −១"
            descEn="Tiny, fast, and orbits the nucleus. Decides how atoms bond and react."
            descKh="តូច លឿន ហើយវិលជុំវិញនុយក្លេអ៊ុស។ កំណត់របៀបអាតូមភ្ជាប់គ្នា និងធ្វើប្រតិកម្ម។"
          />
        </div>
      </Section>

      <Section titleEn="Charges, balance, and ions" titleKh="បន្ទុក តុល្យភាព និងអ៊ីយ៉ុង">
        <P
          en="Opposite charges attract; same charges repel. A neutral atom has the same number of protons (+) and electrons (−), so the charges cancel out."
          kh="បន្ទុកផ្ទុយគ្នាទាក់ទាញគ្នា; បន្ទុកដូចគ្នាច្រានគ្នា។ អាតូមអព្យាក្រឹតមានចំនួនប្រូតុង (+) និងអេឡិចត្រុង (−) ស្មើគ្នា ដូច្នេះបន្ទុកលុបបំបាត់គ្នា។"
        />
        <P
          en="When an atom gains or loses electrons, it becomes an ion — a charged atom. Sodium (Na) loses 1 electron to become Na⁺. Chlorine (Cl) gains 1 to become Cl⁻. Together they form table salt (NaCl)."
          kh="នៅពេលអាតូមមួយទទួលបាន ឬបាត់បង់អេឡិចត្រុង វាក្លាយជាអ៊ីយ៉ុង — អាតូមដែលមានបន្ទុក។ សូដ្យូម (Na) បាត់បង់អេឡិចត្រុង ១ ដើម្បីក្លាយជា Na⁺។ ក្លរ (Cl) ទទួលបាន ១ ដើម្បីក្លាយជា Cl⁻។ ផ្សំគ្នាបង្កើតបានជាអំបិលបាយ (NaCl)។"
        />
      </Section>

      <Section titleEn="Quick check" titleKh="ការត្រួតពិនិត្យរហ័ស">
        <BList
          itemsEn={[
            <span><Term en="Element" kh="ធាតុ" /> = how many <Term en="protons" kh="ប្រូតុង" /> are in the nucleus.</span>,
            <span><Term en="Isotope" kh="អ៊ីសូតូប" /> = same protons, different number of <Term en="neutrons" kh="ណឺត្រុង" />.</span>,
            <span><Term en="Ion" kh="អ៊ីយ៉ុង" /> = an atom with extra or missing <Term en="electrons" kh="អេឡិចត្រុង" />.</span>,
          ]}
          itemsKh={[
            <span><Term en="Element" kh="ធាតុ" /> = ចំនួន <Term en="protons" kh="ប្រូតុង" /> ក្នុងនុយក្លេអ៊ុស។</span>,
            <span><Term en="Isotope" kh="អ៊ីសូតូប" /> = ប្រូតុងដូចគ្នា ប៉ុន្តែ <Term en="neutrons" kh="ណឺត្រុង" /> ខុសគ្នា។</span>,
            <span><Term en="Ion" kh="អ៊ីយ៉ុង" /> = អាតូមដែលមាន <Term en="electrons" kh="អេឡិចត្រុង" /> លើស ឬខ្វះ។</span>,
          ]}
        />
      </Section>

      <NextModuleLink to="/chemistry/reactions-math" labelEn="Next: Reactions & Math" labelKh="បន្ទាប់៖ ប្រតិកម្ម និងគណិតវិទ្យា" />
    </ModuleShell>
  );
}

function ParticleCard({
  symbol,
  color,
  nameEn,
  nameKh,
  chargeEn,
  chargeKh,
  descEn,
  descKh,
}: {
  symbol: string;
  color: string;
  nameEn: string;
  nameKh: string;
  chargeEn: string;
  chargeKh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className={`rounded-2xl border-2 ${color} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-base font-bold ${kh ? "font-khmer" : ""}`}>{kh ? nameKh : nameEn}</span>
        <span className="font-mono text-lg font-bold" aria-hidden="true">{symbol}</span>
      </div>
      <div className={`text-xs font-semibold mb-2 opacity-80 ${kh ? "font-khmer" : ""}`}>
        {kh ? chargeKh : chargeEn}
      </div>
      <p className={`text-sm text-foreground/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? descKh : descEn}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 2 — Reactions & Math
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryReactionsPage() {
  return (
    <ModuleShell
      number="02"
      titleEn="Reactions & Math"
      titleKh="ប្រតិកម្ម និងគណិតវិទ្យា"
      introEn="Chemistry is more than memorising names — it's an accounting system for atoms. Whatever goes in must come out."
      introKh="គីមីវិទ្យាមិនមែនគ្រាន់តែជាការទន្ទេញឈ្មោះទេ — វាគឺជាប្រព័ន្ធគណនេយ្យសម្រាប់អាតូម។ អ្វីដែលចូល ត្រូវតែចេញដែរ។"
      icon={FlaskConical}
      accent={{
        iconBg: "bg-emerald-600",
        title: "text-emerald-900",
        chip: "bg-emerald-100 text-emerald-800",
        bgFrom: "from-emerald-50/40",
        bgTo: "to-background",
      }}
    >
      <Section titleEn="Chemical reactions" titleKh="ប្រតិកម្មគីមី">
        <P
          en="In a chemical reaction, the starting substances (reactants) rearrange their atoms to form new substances (products). Atoms are never created or destroyed — only rearranged. This is the Law of Conservation of Mass."
          kh="ក្នុងប្រតិកម្មគីមី សារធាតុដើម (សារធាតុប្រតិកម្ម) រៀបចំអាតូមរបស់ខ្លួនឡើងវិញ ដើម្បីបង្កើតសារធាតុថ្មី (ផលិតផល)។ អាតូមមិនត្រូវបានបង្កើតឬបំផ្លាញឡើយ — គ្រាន់តែរៀបចំឡើងវិញប៉ុណ្ណោះ។ នេះគឺជាច្បាប់នៃការអភិរក្សម៉ាស។"
        />
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 not-prose">
          <div className="font-mono text-base sm:text-lg text-emerald-900 break-words">
            2 H₂ + O₂ → 2 H₂O
          </div>
          <P
            en="Two hydrogen molecules + one oxygen molecule → two water molecules. Count the atoms on each side: 4 H and 2 O. Balanced!"
            kh="ម៉ូលេគុលអ៊ីដ្រូសែនពីរ + ម៉ូលេគុលអុកស៊ីសែនមួយ → ម៉ូលេគុលទឹកពីរ។ រាប់អាតូមនៅសងខាង៖ H ៤ និង O ២។ មានតុល្យភាព!"
          />
        </div>
      </Section>

      <Section titleEn="Molecular weight" titleKh="ម៉ាសម៉ូលេគុល">
        <P
          en="The molecular weight of a substance is the sum of the atomic weights of its atoms, measured in 'atomic mass units' (u) or grams per mole (g/mol)."
          kh="ម៉ាសម៉ូលេគុលនៃសារធាតុមួយ គឺជាផលបូកនៃម៉ាសអាតូមនៃអាតូមរបស់វា វាស់ជា 'ឯកតាម៉ាសអាតូម' (u) ឬក្រាមក្នុងមួយម៉ូល (g/mol)។"
        />
        <BList
          itemsEn={[
            <span>Hydrogen (H) ≈ 1 g/mol · Oxygen (O) ≈ 16 g/mol</span>,
            <span>Water (H₂O) = 1 + 1 + 16 = <strong>18 g/mol</strong></span>,
            <span>Carbon dioxide (CO₂) = 12 + 16 + 16 = <strong>44 g/mol</strong></span>,
          ]}
          itemsKh={[
            <span>អ៊ីដ្រូសែន (H) ≈ ១ g/mol · អុកស៊ីសែន (O) ≈ ១៦ g/mol</span>,
            <span>ទឹក (H₂O) = ១ + ១ + ១៦ = <strong>១៨ g/mol</strong></span>,
            <span>កាបូនឌីអុកស៊ីត (CO₂) = ១២ + ១៦ + ១៦ = <strong>៤៤ g/mol</strong></span>,
          ]}
        />
      </Section>

      <Section titleEn="Stoichiometry — the recipe ratios" titleKh="ស្តូគីអូមេទ្រី — សមាមាត្ររូបមន្ត">
        <P
          en="Stoichiometry is the maths of chemistry: it uses balanced equations to predict how much product you'll get from a given amount of reactant. Like a cooking recipe — 'use 2 cups of flour for every 1 egg' — but for atoms."
          kh="ស្តូគីអូមេទ្រី គឺជាគណិតវិទ្យានៃគីមីវិទ្យា៖ វាប្រើសមីការមានតុល្យភាព ដើម្បីព្យាករណ៍ផលិតផលដែលអ្នកនឹងទទួលបានពីបរិមាណសារធាតុប្រតិកម្ម។ ដូចជារូបមន្តចម្អិន — 'ប្រើម្សៅ ២ កែវ ចំពោះស៊ុត ១' — តែសម្រាប់អាតូម។"
        />
      </Section>

      <Section titleEn="Units of measurement" titleKh="ឯកតារង្វាស់">
        <BList
          itemsEn={[
            <span><Term en="Mole (mol)" kh="ម៉ូល" /> — 6.022 × 10²³ particles. The chemist's 'dozen'.</span>,
            <span><Term en="Mass" kh="ម៉ាស" /> — measured in grams (g) or kilograms (kg).</span>,
            <span><Term en="Volume" kh="មាឌ" /> — measured in litres (L) or millilitres (mL).</span>,
            <span><Term en="Concentration" kh="ការប្រមូលផ្តុំ" /> — moles per litre (mol/L), also called molarity (M).</span>,
            <span><Term en="Temperature" kh="សីតុណ្ហភាព" /> — Celsius (°C) for everyday, Kelvin (K) in equations.</span>,
          ]}
          itemsKh={[
            <span><Term en="Mole (mol)" kh="ម៉ូល" /> — ៦,០២២ × ១០²³ ភាគល្អិត។ 'ឌូហ្សិន' របស់អ្នកគីមីវិទ្យា។</span>,
            <span><Term en="Mass" kh="ម៉ាស" /> — វាស់ជាក្រាម (g) ឬគីឡូក្រាម (kg)។</span>,
            <span><Term en="Volume" kh="មាឌ" /> — វាស់ជាលីត្រ (L) ឬមីលីលីត្រ (mL)។</span>,
            <span><Term en="Concentration" kh="ការប្រមូលផ្តុំ" /> — ម៉ូលក្នុងមួយលីត្រ (mol/L) ហៅផងដែរថា ម៉ូលារ៉ាលីតេ (M)។</span>,
            <span><Term en="Temperature" kh="សីតុណ្ហភាព" /> — សែលស្យូស (°C) ប្រចាំថ្ងៃ និងកេលវិន (K) ក្នុងសមីការ។</span>,
          ]}
        />
      </Section>

      <Section titleEn="Acids vs. Bases" titleKh="អាស៊ីត និងបាស">
        <P
          en="Acids release hydrogen ions (H⁺) in water. Bases release hydroxide ions (OH⁻). The pH scale runs from 0 (very acidic) to 14 (very basic), with 7 being neutral."
          kh="អាស៊ីតលែងលែកអ៊ីយ៉ុងអ៊ីដ្រូសែន (H⁺) នៅក្នុងទឹក។ បាសលែងលែកអ៊ីយ៉ុងអ៊ីដ្រូកស៊ីត (OH⁻)។ មាត្រដ្ឋាន pH ដំណើរការពី ០ (អាស៊ីតខ្លាំង) ដល់ ១៤ (បាសខ្លាំង) ដោយ ៧ ជាអព្យាក្រឹត។"
        />
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
            <div className="font-bold text-orange-900 mb-1.5"><Term en="Acids (low pH)" kh="អាស៊ីត (pH ទាប)" /></div>
            <BList
              itemsEn={[
                <span>Lemon juice (~pH 2)</span>,
                <span>Vinegar (~pH 3)</span>,
                <span>Stomach acid (~pH 1.5)</span>,
                <span>Taste sour, can corrode metal</span>,
              ]}
              itemsKh={[
                <span>ទឹកក្រូចឆ្មារ (~pH ២)</span>,
                <span>ទឹកខ្មេះ (~pH ៣)</span>,
                <span>អាស៊ីតក្រពះ (~pH ១,៥)</span>,
                <span>មានរសជាតិជូរ អាចច្រេះលោហៈ</span>,
              ]}
            />
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
            <div className="font-bold text-blue-900 mb-1.5"><Term en="Bases (high pH)" kh="បាស (pH ខ្ពស់)" /></div>
            <BList
              itemsEn={[
                <span>Baking soda (~pH 9)</span>,
                <span>Soap (~pH 10)</span>,
                <span>Bleach (~pH 12)</span>,
                <span>Feel slippery, neutralise acids</span>,
              ]}
              itemsKh={[
                <span>សូដាដុតនំ (~pH ៩)</span>,
                <span>សាប៊ូ (~pH ១០)</span>,
                <span>ប្លេច (~pH ១២)</span>,
                <span>មានអារម្មណ៍រអិល បន្សាបអាស៊ីត</span>,
              ]}
            />
          </div>
        </div>
        <div className="rounded-xl bg-amber-50 border-l-4 border-amber-500 px-4 py-3 not-prose flex items-start gap-2.5">
          <Lightbulb className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <P
            en="Acid + Base → Salt + Water. Mixing vinegar with baking soda is a classic neutralisation reaction (and it fizzes — that's CO₂ gas!)."
            kh="អាស៊ីត + បាស → អំបិល + ទឹក។ ការលាយទឹកខ្មេះជាមួយសូដាដុតនំ គឺជាប្រតិកម្មបន្សាបបុរាណ (ហើយវាហ៊ឺ — នោះគឺឧស្ម័ន CO₂!)។"
          />
        </div>
      </Section>

      <NextModuleLink to="/chemistry/advanced" labelEn="Next: Advanced Concepts" labelKh="បន្ទាប់៖ គំនិតកម្រិតខ្ពស់" />
    </ModuleShell>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 3 — Advanced Concepts
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryAdvancedPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const branches: {
    titleEn: string;
    titleKh: string;
    descEn: string;
    descKh: string;
    exampleEn: string;
    exampleKh: string;
  }[] = [
    {
      titleEn: "Quantum Mechanics",
      titleKh: "មេកានិចកង់ទិច",
      descEn:
        "At very small scales, electrons don't follow planet-like orbits. They exist as fuzzy 'probability clouds' (orbitals) and can only have certain discrete energies — like notes on a piano, not a slide whistle.",
      descKh:
        "នៅកម្រិតតូចបំផុត អេឡិចត្រុងមិនធ្វើដំណើរតាមគន្លងដូចភពទេ។ ពួកវាមាននៅជាពពកប្រូបាប៊ីលីតេ (អូប៊ីតាល់) ហើយអាចមានតែថាមពលដាច់ពីគ្នាជាក់លាក់ — ដូចជាសំឡេងពីយ៉ាណូ មិនមែនជាស្ល័រ។",
      exampleEn: "Why your TV remote works — photons emitted at exact wavelengths.",
      exampleKh: "ហេតុអ្វីបញ្ជាពីចម្ងាយទូរទស្សន៍ដំណើរការ — ហ្វូតុងលែងលែកនៅរលកប្រវែងជាក់លាក់។",
    },
    {
      titleEn: "Organic Chemistry",
      titleKh: "គីមីវិទ្យាសរីរាង្គ",
      descEn:
        "The chemistry of carbon compounds. Carbon's ability to form long chains and rings is what makes life — and plastics, fuels, and medicines — possible.",
      descKh:
        "គីមីវិទ្យានៃសមាសធាតុកាបូន។ សមត្ថភាពរបស់កាបូនក្នុងការបង្កើតខ្សែវែង និងរង្វង់ គឺជាអ្វីដែលធ្វើឱ្យជីវិត — ព្រមទាំងផ្លាស្ទិច ឥន្ធនៈ និងឱសថ — អាចកើតឡើងបាន។",
      exampleEn: "Sugar (C₆H₁₂O₆), petrol, paracetamol, and DNA are all organic molecules.",
      exampleKh: "ស្ករ (C₆H₁₂O₆) សាំង ប៉ារ៉ាសេតាម៉ុល និង DNA សុទ្ធតែជាម៉ូលេគុលសរីរាង្គ។",
    },
    {
      titleEn: "Biochemistry",
      titleKh: "ជីវគីមីវិទ្យា",
      descEn:
        "Chemistry happening inside living things. Studies how proteins fold, how enzymes catalyse reactions, and how DNA stores information.",
      descKh:
        "គីមីវិទ្យាដែលកើតឡើងនៅខាងក្នុងសត្វមានជីវិត។ សិក្សាពីរបៀបប្រូតេអ៊ីនបត់ របៀបអង់ស៊ីមជំរុញប្រតិកម្ម និងរបៀប DNA រក្សាទុកព័ត៌មាន។",
      exampleEn: "Why bread rises (yeast eats sugar → CO₂ + ethanol).",
      exampleKh: "ហេតុអ្វីនំបុ័ងពោង (មេនំស៊ីស្ករ → CO₂ + អេតាណុល)។",
    },
    {
      titleEn: "Physical Chemistry",
      titleKh: "គីមីវិទ្យារូប",
      descEn:
        "The 'why' behind reactions. Uses physics and maths to study energy, speed (kinetics), and equilibrium of chemical systems.",
      descKh:
        "'ហេតុអ្វី' នៅពីក្រោយប្រតិកម្ម។ ប្រើរូបវិទ្យា និងគណិតវិទ្យាដើម្បីសិក្សាពីថាមពល ល្បឿន (កីណេទិច) និងតុល្យភាពនៃប្រព័ន្ធគីមី។",
      exampleEn: "Why cold reactions are slow; why a fire is exothermic.",
      exampleKh: "ហេតុអ្វីប្រតិកម្មត្រជាក់ដំណើរការយឺត; ហេតុអ្វីភ្លើងជាប្រតិកម្មលែងលែកកម្តៅ។",
    },
    {
      titleEn: "Inorganic Chemistry",
      titleKh: "គីមីវិទ្យាអសរីរាង្គ",
      descEn:
        "Everything that isn't organic — metals, minerals, salts, ceramics, and most catalysts. Foundational for materials science and electronics.",
      descKh:
        "អ្វីៗគ្រប់យ៉ាងដែលមិនមែនជាសរីរាង្គ — លោហៈ សារធាតុរ៉ែ អំបិល សេរ៉ាមិច និងកាតាលីករភាគច្រើន។ មូលដ្ឋានសម្រាប់វិទ្យាសាស្ត្ររូបធាតុ និងអេឡិចត្រូនិច។",
      exampleEn: "The lithium in your phone battery; the silicon in computer chips.",
      exampleKh: "លីចូមនៅក្នុងថ្មទូរសព្ទរបស់អ្នក; ស៊ីលីកុននៅក្នុងបន្ទះកុំព្យូទ័រ។",
    },
  ];

  return (
    <ModuleShell
      number="03"
      titleEn="Advanced Concepts"
      titleKh="គំនិតកម្រិតខ្ពស់"
      introEn="Chemistry has many specialised branches. Here's a one-paragraph tour of each — enough to know what they're about and which one might fit your future studies."
      introKh="គីមីវិទ្យាមានផ្នែកឯកទេសច្រើន។ នេះគឺជាការទស្សនាមួយកថាខណ្ឌនៃផ្នែកនីមួយៗ — គ្រប់គ្រាន់ដើម្បីដឹងថាពួកវានិយាយអំពីអ្វី និងផ្នែកមួយណាដែលអាចសមនឹងការសិក្សានាពេលអនាគតរបស់អ្នក។"
      icon={Microscope}
      accent={{
        iconBg: "bg-violet-600",
        title: "text-violet-900",
        chip: "bg-violet-100 text-violet-800",
        bgFrom: "from-violet-50/40",
        bgTo: "to-background",
      }}
    >
      <div className="space-y-4">
        {branches.map((b, i) => (
          <article
            key={i}
            className="rounded-2xl bg-white border border-border shadow-sm p-5 sm:p-6"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-bold tracking-widest text-violet-700 opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className={`text-lg sm:text-xl font-bold text-violet-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {kh ? b.titleKh : b.titleEn}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base text-foreground/85 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {kh ? b.descKh : b.descEn}
            </p>
            <div className="rounded-lg bg-violet-50 border-l-4 border-violet-400 px-3 py-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider text-violet-700 mr-1.5 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                {kh ? "ឧទាហរណ៍៖" : "Example:"}
              </span>
              <span
                className={`text-sm text-foreground/80 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? b.exampleKh : b.exampleEn}
              </span>
            </div>
          </article>
        ))}
      </div>

      <NextModuleLink to="/chemistry/real-world" labelEn="Next: Chemistry in the Real World" labelKh="បន្ទាប់៖ គីមីវិទ្យាក្នុងពិភពពិត" />
    </ModuleShell>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Module 4 — Chemistry in the Real World
// ──────────────────────────────────────────────────────────────────────────────

export function ChemistryRealWorldPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <ModuleShell
      number="04"
      titleEn="Chemistry in the Real World"
      titleKh="គីមីវិទ្យាក្នុងពិភពពិត"
      introEn="You don't need a lab coat to see chemistry — it's already in your kitchen, your body, and your village. Let's spot it, then try a safe experiment together."
      introKh="អ្នកមិនត្រូវការអាវប្រឡោះដើម្បីឃើញគីមីវិទ្យាទេ — វានៅក្នុងផ្ទះបាយ ក្នុងរាងកាយ និងក្នុងភូមិរបស់អ្នករួចហើយ។ តោះស្វែងរកវា ហើយសាកល្បងការពិសោធន៍សុវត្ថិភាពជាមួយគ្នា។"
      icon={Sparkles}
      accent={{
        iconBg: "bg-amber-600",
        title: "text-amber-900",
        chip: "bg-amber-100 text-amber-800",
        bgFrom: "from-amber-50/40",
        bgTo: "to-background",
      }}
    >
      <Section titleEn="Chemistry in your daily life" titleKh="គីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ">
        <BList
          itemsEn={[
            <span><strong>Cooking rice</strong> — heat breaks starch chains so your body can digest them. The same chemistry happens in bread, noodles, and porridge.</span>,
            <span><strong>Soap & water</strong> — soap molecules grab oil on one end and water on the other, lifting dirt off your skin.</span>,
            <span><strong>Breathing</strong> — your cells burn glucose with oxygen to release energy: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energy.</span>,
            <span><strong>Rust</strong> — iron + oxygen + water slowly produces iron oxide. That's why metal roofs and tools need paint.</span>,
            <span><strong>Fertiliser</strong> — nitrogen, phosphorus, and potassium feed crops. Cambodia's rice yields depend on getting the ratio right.</span>,
            <span><strong>Medicines</strong> — paracetamol blocks pain signals in your brain by interfering with specific enzymes.</span>,
          ]}
          itemsKh={[
            <span><strong>ការចម្អិនបាយ</strong> — កម្តៅបំបែកខ្សែស្តាច ដើម្បីឱ្យរាងកាយរបស់អ្នកអាចរំលាយបាន។ គីមីវិទ្យាដូចគ្នានេះកើតឡើងនៅក្នុងនំបុ័ង មី និងបបរ។</span>,
            <span><strong>សាប៊ូ និងទឹក</strong> — ម៉ូលេគុលសាប៊ូចាប់ប្រេងនៅចុងមួយ និងទឹកនៅចុងមួយទៀត លុបស្នាមកខ្វក់ចេញពីស្បែករបស់អ្នក។</span>,
            <span><strong>ការដកដង្ហើម</strong> — កោសិការបស់អ្នកដុតគ្លុយកូស ជាមួយអុកស៊ីសែន ដើម្បីបញ្ចេញថាមពល៖ C₆H₁₂O₆ + ៦ O₂ → ៦ CO₂ + ៦ H₂O + ថាមពល។</span>,
            <span><strong>ច្រេះ</strong> — ដែក + អុកស៊ីសែន + ទឹក បង្កើតបានជាដែកអុកស៊ីតយឺតៗ។ នោះជាហេតុអ្វីដំបូលលោហៈ និងឧបករណ៍ត្រូវការថ្នាំលាប។</span>,
            <span><strong>ជី</strong> — អាសូត ផូស្វ័រ និងប៉ូតាស្យូម ផ្តល់អាហារដល់ដំណាំ។ ផលិតភាពស្រូវរបស់កម្ពុជាពឹងផ្អែកលើការកំណត់សមាមាត្រត្រឹមត្រូវ។</span>,
            <span><strong>ឱសថ</strong> — ប៉ារ៉ាសេតាម៉ុល រាំងសញ្ញាការឈឺនៅក្នុងខួរក្បាលរបស់អ្នក ដោយរំខានដល់អង់ស៊ីមជាក់លាក់។</span>,
          ]}
        />
      </Section>

      <Section titleEn="Try this at home — safe experiments" titleKh="សាកល្បងនៅផ្ទះ — ការពិសោធន៍សុវត្ថិភាព">
        {/* Safety note */}
        <div className="rounded-xl bg-red-50 border-l-4 border-red-500 px-4 py-3 not-prose flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          <P
            en="Always do experiments with an adult. Never taste anything. Wear glasses or sunglasses to protect your eyes."
            kh="តែងតែធ្វើការពិសោធន៍ជាមួយមនុស្សពេញវ័យ។ កុំភ្លក់អ្វីទាំងអស់។ ពាក់វ៉ែនតា ឬវ៉ែនតាអាទិត្យ ដើម្បីការពារភ្នែករបស់អ្នក។"
          />
        </div>

        <ExperimentCard
          number="01"
          titleEn="The Volcano (vinegar + baking soda)"
          titleKh="ភ្នំភ្លើង (ទឹកខ្មេះ + សូដាដុតនំ)"
          needEn={["1 small empty bottle", "2 tablespoons baking soda", "½ cup vinegar", "A few drops of dish soap (optional)", "Red food colouring (optional)"]}
          needKh={["ដបទទេតូច ១", "សូដាដុតនំ ២ ស្លាបព្រា", "ទឹកខ្មេះ ½ កែវ", "សាប៊ូលាងចាន ពីរបី ដំណក់ (ស្រេចចិត្ត)", "ពណ៌ចំណីអាហារក្រហម (ស្រេចចិត្ត)"]}
          stepsEn={[
            "Put the bottle on a tray (it will overflow!).",
            "Add the baking soda. Add a few drops of soap and food colour.",
            "Pour in the vinegar quickly and step back.",
            "Watch the foam erupt like lava.",
          ]}
          stepsKh={[
            "ដាក់ដបនៅលើថាស (វានឹងហូរលើស!)។",
            "ដាក់សូដាដុតនំ។ បន្ថែមសាប៊ូពីរបីដំណក់ និងពណ៌ចំណីអាហារ។",
            "ចាក់ទឹកខ្មេះចូលយ៉ាងលឿន ហើយដកថយ។",
            "មើលពពុះផ្ទុះដូចឡាវ៉ា។",
          ]}
          whyEn="Vinegar (acid) + baking soda (base) → carbon dioxide gas + water + sodium acetate. The CO₂ bubbles up through the soap and creates foam — a classic acid–base reaction."
          whyKh="ទឹកខ្មេះ (អាស៊ីត) + សូដាដុតនំ (បាស) → ឧស្ម័នកាបូនឌីអុកស៊ីត + ទឹក + សូដ្យូមអាសេតាត។ CO₂ ផុសឡើងតាមរយៈសាប៊ូ និងបង្កើតពពុះ — ប្រតិកម្មអាស៊ីត–បាសបុរាណ។"
        />

        <ExperimentCard
          number="02"
          titleEn="Invisible ink (lemon juice)"
          titleKh="ទឹកថ្នាំមើលមិនឃើញ (ទឹកក្រូចឆ្មារ)"
          needEn={["½ lemon", "Cotton bud or paintbrush", "Plain white paper", "A lamp or sunlight"]}
          needKh={["ក្រូចឆ្មារ ½", "សូឡាកប្រាក់ ឬច្រាសគូរ", "ក្រដាសសសុទ្ធ", "ភ្លើង ឬពន្លឺថ្ងៃ"]}
          stepsEn={[
            "Squeeze the lemon into a small cup.",
            "Dip the cotton bud and write a secret message on the paper.",
            "Let it dry completely (looks blank).",
            "Hold the paper near a warm lamp — the writing turns brown!",
          ]}
          stepsKh={[
            "សង្កត់ក្រូចឆ្មារចូលក្នុងពែងតូច។",
            "ត្រាំសូឡាកប្រាក់ ហើយសរសេរសារសម្ងាត់នៅលើក្រដាស។",
            "ទុកឱ្យស្ងួតទាំងស្រុង (មើលទៅទទេ)។",
            "សង្កត់ក្រដាសនៅជិតភ្លើងក្តៅ — អក្សរប្រែទៅជាពណ៌ត្នោត!",
          ]}
          whyEn="Lemon juice contains carbon-rich compounds that are colourless when wet but oxidise (turn brown) faster than the paper when heated."
          whyKh="ទឹកក្រូចឆ្មារមានសមាសធាតុសម្បូរកាបូន ដែលគ្មានពណ៌ពេលសើម តែអុកស៊ីដ (ប្រែទៅជាពណ៌ត្នោត) លឿនជាងក្រដាស នៅពេលកម្តៅ។"
        />

        <ExperimentCard
          number="03"
          titleEn="Rainbow milk"
          titleKh="ទឹកដោះគោឥន្ទធនូ"
          needEn={["Plate of fresh whole milk", "Drops of food colouring (red, blue, yellow, green)", "Cotton bud", "1 drop of dish soap"]}
          needKh={["ចានទឹកដោះគោស្រស់", "ដំណក់ពណ៌ចំណីអាហារ (ក្រហម ខៀវ លឿង បៃតង)", "សូឡាកប្រាក់", "សាប៊ូលាងចាន ១ ដំណក់"]}
          stepsEn={[
            "Pour milk to cover the bottom of the plate.",
            "Drop different colours in the centre — don't stir.",
            "Dip the cotton bud in dish soap, then touch the centre.",
            "Watch the colours explode outward!",
          ]}
          stepsKh={[
            "ចាក់ទឹកដោះគោឱ្យគ្របបាតចាន។",
            "ដាក់ពណ៌ផ្សេងៗនៅកណ្តាល — កុំកូរ។",
            "ត្រាំសូឡាកប្រាក់ក្នុងសាប៊ូលាងចាន រួចប៉ះកណ្តាល។",
            "មើលពណ៌ផ្ទុះចេញ!",
          ]}
          whyEn="Milk contains fat. Soap molecules race to grab the fat, dragging the colours along with them — you're watching surface tension break."
          whyKh="ទឹកដោះគោមានខ្លាញ់។ ម៉ូលេគុលសាប៊ូប្រណាំងគ្នាដើម្បីចាប់ខ្លាញ់ ហើយអូសពណ៌ទៅជាមួយ — អ្នកកំពុងមើលការបំបែកតង់ស្យុងផ្ទៃ។"
        />
      </Section>

      <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-5 sm:p-6 flex items-start gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className={`text-base sm:text-lg font-bold text-emerald-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? "អ្នកបានបញ្ចប់ Chemistry Hub!" : "You've finished the Chemistry Hub!"}
          </h3>
          <p className={`text-sm text-foreground/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ឥឡូវនេះអ្នកមានគ្រឹះរឹងមាំ — ពីអាតូម ដល់ប្រតិកម្ម ដល់គីមីវិទ្យាក្នុងពិភពពិត។ បន្តរុករកនៅក្នុងផ្ទះបាយ និងសាលារបស់អ្នក។"
              : "You now have a strong foundation — from atoms, to reactions, to chemistry in the real world. Keep exploring in your kitchen and your school."}
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow transition-colors ${
            kh ? "font-khmer" : ""
          }`}
        >
          <Beaker className="w-4 h-4" />
          {kh ? "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា" : "Back to Chemistry Hub"}
        </Link>
      </div>
    </ModuleShell>
  );
}

function ExperimentCard({
  number,
  titleEn,
  titleKh,
  needEn,
  needKh,
  stepsEn,
  stepsKh,
  whyEn,
  whyKh,
}: {
  number: string;
  titleEn: string;
  titleKh: string;
  needEn: string[];
  needKh: string[];
  stepsEn: string[];
  stepsKh: string[];
  whyEn: string;
  whyKh: string;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-2xl bg-amber-50/40 border border-amber-200 p-4 sm:p-5 not-prose">
      <div className="flex items-baseline gap-2.5 mb-3">
        <span className="text-xs font-bold tracking-widest text-amber-700 opacity-70">{number}</span>
        <h3 className={`text-base sm:text-lg font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
            {t("You'll need", "របស់ដែលត្រូវការ")}
          </div>
          <ul className={`list-disc pl-5 text-sm text-foreground/85 space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {(kh ? needKh : needEn).map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
            {t("Steps", "ជំហាន")}
          </div>
          <ol className={`list-decimal pl-5 text-sm text-foreground/85 space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {(kh ? stepsKh : stepsEn).map((it, i) => <li key={i}>{it}</li>)}
          </ol>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-white border-l-4 border-amber-500 px-3 py-2">
        <span className={`text-xs font-bold uppercase tracking-wider text-amber-800 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {t("Why it works:", "ហេតុអ្វីវាដំណើរការ៖")}
        </span>
        <span className={`text-sm text-foreground/85 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? whyKh : whyEn}
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared "next module" link
// ──────────────────────────────────────────────────────────────────────────────

function NextModuleLink({ to, labelEn, labelKh }: { to: string; labelEn: string; labelKh: string }) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className="text-center pt-2">
      <Link
        href={to}
        className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold shadow hover:bg-foreground/90 transition-colors ${
          kh ? "font-khmer" : ""
        }`}
      >
        {kh ? labelKh : labelEn}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
