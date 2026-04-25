import {
  Baby,
  Heart,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Home,
  Wallet,
  Users,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  TrendingDown,
  HandHeart,
} from "lucide-react";

type T = (en: string, kh: string) => string;

const PINK         = "#be185d"; // rose-700 — maternal pink
const PINK_DEEP    = "#831843"; // rose-900 — text-on-pale
const BLUSH        = "#fce7f3"; // pink-100
const BLUSH_SOFT   = "#fdf2f8"; // pink-50
const CLINICAL     = "#ffffff";
const CLINICAL_INK = "#1f2937"; // slate-800
const CLINICAL_INK_SOFT = "#475569"; // slate-600
const SAGE         = "#15803d";
const NAVY         = "#0c4a6e"; // sky-900 — clinical depth

export function ObstetricFistula({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-obstetric-fistula">
      {/* Sub-heading bar */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
          style={{ backgroundColor: PINK }}
        >
          SEC-01M
        </span>
        <Baby className="w-5 h-5" style={{ color: PINK }} aria-hidden="true" />
        <h2
          className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: CLINICAL_INK }}
          data-testid="of-subheading"
        >
          {t("Maternal & Structural Health", "សុខភាពមាតា និងរចនាសម្ព័ន្ធ")}
        </h2>
        <div
          className="flex-1 border-t-2 border-dotted"
          style={{ borderColor: `${PINK}55` }}
        />
      </div>

      {/* Module title card */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-7 mb-6 relative overflow-hidden"
        style={{
          borderColor: `${PINK}44`,
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${BLUSH}, transparent 50%),
            linear-gradient(135deg, ${CLINICAL} 0%, ${BLUSH_SOFT} 100%)
          `,
        }}
        data-testid="of-title-block"
      >
        <div className="relative flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-white"
            style={{ border: `1px solid ${PINK}44` }}
            aria-hidden="true"
          >
            <HeartPulse className="w-6 h-6" style={{ color: PINK_DEEP }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-[11px] font-mono uppercase tracking-[0.25em] mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: PINK_DEEP }}
            >
              {t("A module for compassion and structural literacy", "មុខវិជ្ជាសម្រាប់ការអាណិតអាសូរ និងការយល់ដឹងពីរចនាសម្ព័ន្ធ")}
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CLINICAL_INK }}
            >
              {t(
                "The Disease of Poverty: Obstetric Fistula",
                "ជំងឺនៃភាពក្រីក្រ ៖ ប្រហោងផ្លូវសម្រាលកូន (Obstetric Fistula)"
              )}
            </h3>
            <p
              className={`mt-2 text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: CLINICAL_INK_SOFT }}
            >
              {t(
                "There is one childbirth injury that is 100% preventable, 100% curable, has been gone from rich countries for over a hundred years — and yet still ruins the lives of tens of thousands of mothers every year. It is not a mystery of biology. It is a measurement of poverty.",
                "មានរបួសពេលសម្រាលកូនមួយ ដែលអាចការពារបាន ១០០ ភាគរយ ព្យាបាលជា ១០០ ភាគរយ បាត់ពីប្រទេសមានធនធានជាងមួយរយឆ្នាំមកហើយ — តែនៅតែបំផ្លាញជីវិតម្ដាយរាប់ម៉ឺននាក់ជារៀងរាល់ឆ្នាំ។ វាមិនមែនជាបញ្ហាអាថ៌កំបាំងនៃជីវវិទ្យាទេ។ វាគឺជារង្វាស់នៃភាពក្រីក្រ។"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card1MechanicalInjury k={k} t={t} />
        <Card2AbsolutePoverty k={k} t={t} />
        <Card3MaternalMortality k={k} t={t} />
        <Card4SocialTollAndCure k={k} t={t} />
      </div>
    </section>
  );
}

// ── Card 1: The Mechanical Injury ──────────────────────────────────────────

function Card1MechanicalInjury({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      Icon={Stethoscope}
      accent={NAVY}
      chipEn="Card 01 · The Anatomy"
      chipKh="កាត ០១ · កាយវិភាគ"
      enTitle="The Mechanical Injury"
      khTitle="របួសផ្នែកមេកានិច"
      testId="of-card-mechanical"
    >
      <SubBlock
        k={k}
        labelEn="What it is"
        labelKh="តើវាជាអ្វី"
        accent={NAVY}
        en="An obstetric fistula is, very simply, a small hole that opens between the birth canal and either the bladder or the rectum after a childbirth that went badly wrong. Once that hole is there, the body cannot hold back urine — and sometimes stool — anymore. It leaks, constantly, with no warning."
        kh="ប្រហោងផ្លូវសម្រាលកូន (ហ្វីស្ទុលា) និយាយឲ្យសាមញ្ញ គឺជារន្ធតូចមួយដែលបើកនៅចន្លោះផ្លូវសម្រាលកូន និងប្លោកនោម ឬរន្ធគូថ បន្ទាប់ពីការសម្រាលកូនមានបញ្ហាធ្ងន់ធ្ងរ។ នៅពេលរន្ធនោះមាន រាងកាយលែងអាចទប់ទឹកនោម — ហើយពេលខ្លះលាមក — បានទៀតទេ។ វាហូរចេញឥតឈប់ឈរ ដោយគ្មានការព្រមាន។"
      />
      <SubBlock
        k={k}
        labelEn="The cause"
        labelKh="មូលហេតុ"
        accent={NAVY}
        en="It is caused by prolonged, obstructed labour — sometimes lasting two, three, even four days — without any medical help arriving in time. The baby's head presses against the mother's pelvis with so much force, for so long, that blood stops flowing to the soft tissue trapped between bone and skull. Without blood, that tissue dies and falls away, leaving the hole behind. The baby almost always dies. The mother survives, but with an injury she cannot hide."
        kh="វាបណ្ដាលមកពីការសម្រាលកូនយូរ និងជាប់គាំង — ពេលខ្លះអូសបន្លាយពីរ បី រឺបួនថ្ងៃ — ដោយគ្មានជំនួយវេជ្ជសាស្ត្រមកដល់ទាន់ពេល។ ក្បាលរបស់ទារក សង្កត់លើឆ្អឹងអាងត្រគាករបស់ម្ដាយដោយកម្លាំងខ្លាំង និងយូរពេក ដែលធ្វើឲ្យឈាមឈប់ហូរទៅជាលិកាទន់ដែលជាប់គាំងរវាងឆ្អឹង និងលលាដ៍។ ដោយគ្មានឈាម ជាលិកានោះស្លាប់ ហើយរបូត ទុកនូវរន្ធនៅពីក្រោយ។ ទារកស្ទើរតែតែងតែស្លាប់។ ម្ដាយនៅរស់ ប៉ុន្តែមានរបួសដែលនាងលាក់មិនបាន។"
      />
    </CardShell>
  );
}

// ── Card 2: A Measure of Absolute Poverty ──────────────────────────────────

function Card2AbsolutePoverty({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      Icon={Home}
      accent={PINK}
      chipEn="Card 02 · The Diagnosis is Poverty"
      chipKh="កាត ០២ · ការវិនិច្ឆ័យគឺភាពក្រីក្រ"
      enTitle="A Measure of Absolute Poverty"
      khTitle="រង្វាស់នៃភាពក្រីក្រតោកយ៉ាក"
      testId="of-card-poverty"
    >
      <div
        className="rounded-xl border-2 px-3 py-2 mb-3 flex items-center gap-2 flex-wrap"
        style={{ borderColor: `${SAGE}55`, backgroundColor: "#f0fdf4" }}
        data-testid="of-preventable-banner"
      >
        <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: SAGE }} aria-hidden="true" />
        <span
          className={`text-sm font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: "#14532d" }}
        >
          {t(
            "100% preventable · 100% curable",
            "ការពារបាន ១០០% · ព្យាបាលជា ១០០%"
          )}
        </span>
      </div>

      <SubBlock
        k={k}
        labelEn="The preventable tragedy"
        labelKh="សោកនាដកម្មដែលអាចការពារបាន"
        accent={PINK}
        en="Obstetric fistula is one of the few injuries in medicine that the world already knows perfectly well how to stop. Wealthy countries eradicated it more than a hundred years ago by making one tool widely available: the Cesarean section. The moment a labour stops moving forward, a surgeon opens the abdomen and lifts the baby out — and the long crushing pressure that creates the fistula simply never happens."
        kh="ប្រហោងផ្លូវសម្រាលកូននេះ គឺជារបួសមួយក្នុងចំណោមរបួសតិចតួចបំផុតក្នុងពេទ្យ ដែលពិភពលោកស្គាល់ច្បាស់ហើយពីរបៀបបញ្ឈប់វា។ ប្រទេសមានធនធាន បានលុបបំបាត់វាជាងមួយរយឆ្នាំមកហើយ ដោយធ្វើឲ្យឧបករណ៍មួយមានជាសាធារណៈ ៖ ការវះកាត់សម្រាលកូន (C-section)។ នៅពេលការសម្រាលកូនឈប់ផ្លាស់ទីទៅមុខ វេជ្ជបណ្ឌិតបើកពោះ ហើយយកទារកចេញ — ហើយការសង្កត់ដ៏យូរដែលបង្កើតប្រហោងនេះ ក៏មិនកើតឡើងសោះ។"
      />
      <SubBlock
        k={k}
        labelEn="Structural violence"
        labelKh="អំពើហិង្សារចនាសម្ព័ន្ធ"
        accent={PINK}
        en="So when a fistula does happen today, it is almost never a story about biology. It is a story about distance, money, and a missing road. It happens to women who live too far from a hospital, who have no money for transport, who arrived too late, or whose nearest health centre had no surgeon, no fuel, no electricity. The injury is the body's way of recording the failure of a system."
        kh="ដូច្នេះ នៅពេលប្រហោងផ្លូវសម្រាលកូននេះកើតឡើងសព្វថ្ងៃនេះ វាស្ទើរតែមិនមែនជារឿងនៃជីវវិទ្យាទេ។ វាគឺជារឿងនៃចម្ងាយ លុយ និងផ្លូវដែលគ្មាន។ វាកើតឡើងចំពោះស្ត្រីដែលរស់នៅឆ្ងាយពីមន្ទីរពេទ្យ ដែលគ្មានលុយសម្រាប់ការដឹកជញ្ជូន ដែលមកដល់យឺត ឬដែលមណ្ឌលសុខភាពក្បែរបំផុតគ្មានគ្រូពេទ្យវះកាត់ គ្មានឥន្ធនៈ គ្មានអគ្គិសនី។ របួសនេះ គឺជាវិធីដែលរាងកាយកត់ត្រាការបរាជ័យនៃប្រព័ន្ធមួយ។"
      />
      <div className="mt-3 grid grid-cols-3 gap-2" data-testid="of-poverty-icons">
        <PovertyIcon Icon={Wallet}  k={k} en="No transport" kh="គ្មានដឹកជញ្ជូន" accent={PINK} />
        <PovertyIcon Icon={Home}    k={k} en="Too far" kh="ឆ្ងាយពេក" accent={PINK} />
        <PovertyIcon Icon={ShieldCheck} k={k} en="No surgeon" kh="គ្មានគ្រូពេទ្យវះកាត់" accent={PINK} />
      </div>
    </CardShell>
  );
}

// ── Card 3: Maternal Mortality ──────────────────────────────────────────────

function Card3MaternalMortality({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      Icon={AlertTriangle}
      accent="#b45309" // amber-700
      chipEn="Card 03 · The Bigger Number"
      chipKh="កាត ០៣ · លេខធំជាង"
      enTitle="Maternal Mortality in Cambodia & The World"
      khTitle="អត្រាមរណៈមាតានៅកម្ពុជា និងពិភពលោក"
      testId="of-card-mortality"
    >
      <SubBlock
        k={k}
        labelEn="The 'near-miss'"
        labelKh="«ស្ទើរតែបាត់បង់ជីវិត»"
        accent="#b45309"
        en="Doctors call fistula a 'near-miss' for maternal mortality. The same long, obstructed labour that creates a fistula is the labour that, more often, simply kills the mother and the baby together. So for every woman walking around with this injury, there are many other women — her neighbours, her friends — who did not survive at all. A fistula is, in a sense, a survivor's wound."
        kh="វេជ្ជបណ្ឌិតហៅប្រហោងផ្លូវសម្រាលកូននេះថា «ការស្ទើរតែបាត់បង់ជីវិត» នៃមរណៈមាតា។ ការសម្រាលកូនយូរ និងជាប់គាំងតែមួយដែលបង្កើតប្រហោងនេះ គឺការសម្រាលដែល ច្រើនពេលជាង សម្លាប់ម្ដាយ និងទារកជាមួយគ្នា។ ដូច្នេះ សម្រាប់ស្ត្រីម្នាក់ដែលរស់នៅជាមួយរបួសនេះ មានស្ត្រីដទៃជាច្រើន — អ្នកជិតខាងរបស់នាង មិត្តភក្ដិរបស់នាង — ដែលមិនបានរស់ឡើយ។ ប្រហោងផ្លូវសម្រាលកូននេះ ក្នុងន័យមួយ គឺជារបួសរបស់អ្នកនៅរស់។"
      />

      <div
        className="my-4 rounded-2xl border-2 p-3"
        style={{ borderColor: `${SAGE}44`, backgroundColor: "#f0fdf4" }}
        data-testid="of-cambodia-progress"
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <TrendingDown className="w-4 h-4 flex-shrink-0" style={{ color: SAGE }} aria-hidden="true" />
          <div
            className={`text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: "#14532d" }}
          >
            {t("Progress · Cambodia", "វឌ្ឍនភាព · កម្ពុជា")}
          </div>
        </div>
        <p
          className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: "#14532d" }}
        >
          {t(
            "Cambodia has made some of the most striking progress on maternal mortality of any country in this century. Two decades of building rural health centres and training thousands of midwives have lowered the number of women dying in childbirth dramatically. But the success is not yet equally shared — for women in remote provinces and far villages, the same old danger is still there, just one obstructed labour away.",
            "កម្ពុជាបានធ្វើការវឌ្ឍនភាពគួរឲ្យកត់សម្គាល់បំផុតមួយ ស្ដីពីមរណៈមាតាក្នុងសតវត្សនេះ។ ពីរទសវត្សរ៍នៃការសាងសង់មណ្ឌលសុខភាពនៅជនបទ និងការបណ្ដុះបណ្ដាលឆ្មបរាប់ពាន់នាក់ បានកាត់បន្ថយចំនួនស្ត្រីដែលស្លាប់ពេលសម្រាលកូនយ៉ាងច្រើន។ ប៉ុន្តែ ភាពជោគជ័យនេះ មិនទាន់ត្រូវបានចែករំលែកស្មើគ្នាទេ — សម្រាប់ស្ត្រីនៅខេត្តដាច់ស្រយាល និងភូមិឆ្ងាយ គ្រោះថ្នាក់ចាស់ដដែលនៅតែមាន គ្រាន់តែការសម្រាលកូនជាប់គាំងមួយប៉ុណ្ណោះ។"
          )}
        </p>
      </div>
    </CardShell>
  );
}

// ── Card 4: The Social Toll & The Cure ──────────────────────────────────────

function Card4SocialTollAndCure({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      Icon={Heart}
      accent={PINK_DEEP}
      chipEn="Card 04 · The Toll & The Hope"
      chipKh="កាត ០៤ · ផលប៉ះពាល់ និងក្ដីសង្ឃឹម"
      enTitle="The Social Toll & The Cure"
      khTitle="ផលប៉ះពាល់សង្គម និងការព្យាបាល"
      testId="of-card-toll-cure"
    >
      <SubBlock
        k={k}
        labelEn="Isolation"
        labelKh="ការដាច់ឆ្ងាយ"
        accent={PINK_DEEP}
        en="The injury itself is only half the tragedy. Because of the constant, uncontrollable leaking — and the smell that comes with it — women with fistula are very often abandoned by their husbands, asked to leave their homes, and pushed out of their villages. They lose their work, their children, their place in their community. Many spend years living alone in a hut at the edge of a village, ashamed of a wound that was never their fault."
        kh="របួសខ្លួនឯងគ្រាន់តែជាពាក់កណ្ដាលនៃសោកនាដកម្មប៉ុណ្ណោះ។ ដោយសារការហូរចេញឥតឈប់ឈរ និងគ្មានការគ្រប់គ្រង — និងក្លិនដែលមកជាមួយវា — ស្ត្រីដែលមានប្រហោងផ្លូវសម្រាលកូននេះ ច្រើនតែត្រូវបានប្ដីបោះបង់ ត្រូវឲ្យចេញពីផ្ទះ និងត្រូវបានរុញចេញពីភូមិ។ ពួកនាងបាត់បង់ការងារ កូនៗ និងកន្លែងរបស់ខ្លួនក្នុងសហគមន៍។ ស្ត្រីជាច្រើនរស់នៅតែម្នាក់ឯងក្នុងខ្ទមមួយនៅជាយភូមិ ដោយខ្មាសអៀននឹងរបួសមួយដែលមិនមែនជាកំហុសរបស់ពួកនាងសោះឡើយ។"
      />

      <SubBlock
        k={k}
        labelEn="The cure"
        labelKh="ការព្យាបាល"
        accent={SAGE}
        en="And here is the part that almost feels unfair to know: a relatively simple surgery, lasting a few hours and costing roughly 400 to 600 US dollars, can completely close the hole. The leaking stops. The smell goes. Within weeks the woman is dry and healed, and a life that was taken away by one bad day in childbirth can be handed back to her in full."
        kh="ហើយនេះគឺជាផ្នែកដែលស្ទើរតែឲ្យអារម្មណ៍ថាមិនយុត្តិធម៌ដែលបានដឹង ៖ ការវះកាត់ងាយៗមួយ ដែលប្រើពេលប៉ុន្មានម៉ោង និងមានតម្លៃប្រហែល ៤០០ ទៅ ៦០០ ដុល្លារអាមេរិក អាចបិទរន្ធនោះទាំងស្រុង។ ការហូរឈប់។ ក្លិនបាត់។ ក្នុងរយៈពេលប៉ុន្មានសប្ដាហ៍ ស្ត្រីនោះស្ងួតស្អាត និងជាសះស្បើយ ហើយជីវិតដែលត្រូវយកចេញដោយថ្ងៃអាក្រក់មួយក្នុងការសម្រាលកូន អាចត្រូវបានប្រគល់ឲ្យនាងវិញពេញលេញ។"
      />

      {/* Cost chip */}
      <div className="my-4 flex items-center gap-2 flex-wrap" data-testid="of-cost-line">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border-2 ${k ? "font-khmer" : ""}`}
          style={{ color: SAGE, borderColor: `${SAGE}66`, backgroundColor: "#f0fdf4" }}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          {t("≈ $400–$600 USD per surgery", "≈ ៤០០ – ៦០០ ដុល្លារ ក្នុងការវះកាត់មួយ")}
        </span>
        <span
          className={`text-xs ${k ? "font-khmer" : ""}`}
          style={{ color: CLINICAL_INK_SOFT }}
        >
          {t("= one woman's whole life back", "= ជីវិតពេញលេញរបស់ស្ត្រីម្នាក់ត្រលប់មកវិញ")}
        </span>
      </div>

      {/* CTA */}
      <FistulaFoundationCTA k={k} t={t} />
    </CardShell>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function CardShell({
  k, Icon, accent, chipEn, chipKh, enTitle, khTitle, testId, children,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  chipEn: string; chipKh: string;
  enTitle: string; khTitle: string;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 6px 22px -14px ${accent}66`,
      }}
      data-testid={testId}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`inline-block text-[10px] font-mono uppercase tracking-[0.2em] rounded px-1.5 py-0.5 border mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent, borderColor: `${accent}55`, backgroundColor: "#ffffff" }}
          >
            {k ? chipKh : chipEn}
          </div>
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: CLINICAL_INK }}
          >
            {k ? khTitle : enTitle}
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function SubBlock({
  k, labelEn, labelKh, accent, en, kh,
}: {
  k: boolean;
  labelEn: string; labelKh: string;
  accent: string;
  en: string; kh: string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div
        className={`text-[11px] font-mono uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
        style={{ color: accent }}
      >
        {k ? labelKh : labelEn}
      </div>
      <p
        className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: CLINICAL_INK_SOFT }}
      >
        {k ? kh : en}
      </p>
    </div>
  );
}

function PovertyIcon({
  Icon, k, en, kh, accent,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  k: boolean; en: string; kh: string; accent: string;
}) {
  return (
    <div
      className="rounded-lg border p-2 text-center"
      style={{ borderColor: `${accent}33`, backgroundColor: BLUSH_SOFT }}
    >
      <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: accent }} aria-hidden="true" />
      <div className={`text-[10px] font-bold ${k ? "font-khmer" : ""}`} style={{ color: PINK_DEEP }}>
        {k ? kh : en}
      </div>
    </div>
  );
}

function FistulaFoundationCTA({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="mt-1 rounded-2xl border-2 p-4"
      style={{
        borderColor: `${PINK}44`,
        backgroundImage: `linear-gradient(135deg, ${BLUSH_SOFT} 0%, #ffffff 60%, #ecfdf5 100%)`,
      }}
      data-testid="of-cta-block"
    >
      <div className="flex items-start gap-2 mb-3">
        <HandHeart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: PINK_DEEP }} aria-hidden="true" />
        <p
          className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: CLINICAL_INK }}
        >
          {t(
            "You can directly fund one of these life-saving surgeries. The Fistula Foundation works with hospitals around the world — including in Cambodia — to repair fistulas for women who cannot pay.",
            "អ្នកអាចបរិច្ចាគផ្ទាល់សម្រាប់ការវះកាត់ជួយសង្គ្រោះជីវិតមួយ។ The Fistula Foundation ធ្វើការជាមួយមន្ទីរពេទ្យជុំវិញពិភពលោក — រួមទាំងនៅកម្ពុជា — ដើម្បីព្យាបាលប្រហោងផ្លូវសម្រាលកូននេះ ឲ្យស្ត្រីដែលគ្មានលទ្ធភាពចំណាយ។"
          )}
        </p>
      </div>
      <a
        href="https://fistulafoundation.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${k ? "font-khmer" : ""}`}
        style={{ backgroundColor: PINK_DEEP }}
        data-testid="of-cta-button"
      >
        <Users className="w-4 h-4" aria-hidden="true" />
        {t("Visit The Fistula Foundation", "ទស្សនា The Fistula Foundation")}
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
      <div
        className={`mt-2 text-[11px] font-mono ${k ? "font-khmer" : ""}`}
        style={{ color: CLINICAL_INK_SOFT }}
      >
        fistulafoundation.org
      </div>
    </div>
  );
}
