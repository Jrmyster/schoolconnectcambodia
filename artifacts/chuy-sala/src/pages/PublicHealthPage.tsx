import { Link } from "wouter";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Baby,
  Brain,
  Cigarette,
  Dna,
  Eye,
  Flame,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sunrise,
  Syringe,
  Users,
  Wallet,
  Wind as WindIcon,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  PHL-01 · Public Health: The Web of Well-Being
//           សុខភាពសាធារណៈ៖ បណ្តាញនៃសុខុមាលភាព
//
//  1. The Invisible Math       · epidemiology + vaccines / herd immunity
//  2. The Chemical Trap        · cigarettes → DNA mutation, lung visualisation
//  3. The Physical Cost of Stress · cortisol + wealth inequality
//  4. The Foundation of Happiness · Harvard Study of Adult Development
//
//  Aesthetic: Community — sunrise oranges (warmth, social ties)
//             + medical blues (calm, healing) + soft rounded UI.
// ════════════════════════════════════════════════════════════════════════════

const SUNRISE = "#ea580c";       // sunrise orange
const SUNRISE_LIGHT = "#fed7aa"; // pale peach
const SUNRISE_DEEP = "#9a3412";  // burnt umber
const MED_BLUE = "#0284c7";      // medical / clinical blue
const MED_BLUE_LIGHT = "#bae6fd";
const MED_BLUE_DEEP = "#075985";
const SAGE = "#15803d";          // healthy green for community/healing
const ROSE = "#be123c";          // serious / warning rose for cancer
const SLATE = "#1e293b";         // grounded ink

const FRAME: React.CSSProperties = {
  backgroundColor: "#fff7ed",
  backgroundImage:
    "radial-gradient(circle at 12% 18%, rgba(234, 88, 12, 0.08), transparent 45%)," +
    "radial-gradient(circle at 88% 82%, rgba(2, 132, 199, 0.07), transparent 50%)," +
    "radial-gradient(circle at 50% 50%, rgba(255, 247, 237, 1), rgba(254, 243, 226, 1))",
};

type T = (en: string, kh: string) => string;

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
        style={{ backgroundColor: accent }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: SLATE }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t-2 border-dotted"
        style={{ borderColor: `${accent}55` }}
      />
    </div>
  );
}

// ─── Reusable concept card ──────────────────────────────────────────────────

type ConceptCardProps = {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  glow?: boolean;
  badge?: { en: string; kh: string };
  children?: React.ReactNode;
};

function ConceptCard({
  k,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  glow = false,
  badge,
  children,
}: ConceptCardProps) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}22 inset, 0 12px 30px -16px ${accent}66`
          : "0 6px 18px -12px rgba(15, 23, 42, 0.18)",
      }}
      data-testid={`concept-card-${enName.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}14`,
            border: `1px solid ${accent}33`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: SLATE }}
          >
            {k ? khName : enName}
          </h3>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
        {badge ? (
          <span
            className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full text-white ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ backgroundColor: accent }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      <p
        className={`text-sm sm:text-[15px] text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {k ? khBody : enBody}
      </p>

      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

// ─── Pull-out callout ──────────────────────────────────────────────────────

function Callout({
  k,
  Icon,
  labelEn,
  labelKh,
  enTitle,
  khTitle,
  enBody,
  khBody,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  labelEn: string;
  labelKh: string;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 border-l-4 border"
      style={{
        backgroundColor: `${accent}10`,
        borderLeftColor: accent,
        borderColor: `${accent}33`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: accent }}
        >
          {k ? labelKh : labelEn}
        </span>
      </div>
      <h4 className={`font-bold text-sm sm:text-base mb-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
        {k ? khTitle : enTitle}
      </h4>
      <p className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════

export function PublicHealthPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${k ? "font-khmer" : ""}`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden shadow-xl border"
          style={{
            borderColor: `${SUNRISE}55`,
            backgroundImage: `
              radial-gradient(circle at 18% 28%, ${SUNRISE}cc, transparent 55%),
              radial-gradient(circle at 82% 70%, ${MED_BLUE}cc, transparent 55%),
              linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #e0f2fe 100%)
            `,
          }}
        >
          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border bg-white/85 backdrop-blur-sm"
              style={{ borderColor: `${SUNRISE}55` }}
            >
              <HeartHandshake className="w-8 h-8" style={{ color: SUNRISE_DEEP }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                style={{ color: SUNRISE_DEEP }}
              >
                <span>{t("Well-being", "សុខុមាលភាព")}</span>
                <span>·</span>
                <span>PHL-01</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                style={{ color: SLATE }}
                data-testid="page-title"
              >
                {t(
                  "Public Health: The Web of Well-Being",
                  "សុខភាពសាធារណៈ៖ បណ្តាញនៃសុខុមាលភាព"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "Personal health is never just personal. The people around you, the air you share, the chemicals in your environment, the level of stress in your community, and the strength of your friendships are all woven together into one giant web — and that web is what really decides how long, and how well, you live.",
                  "សុខភាពផ្ទាល់ខ្លួន មិនដែលជាបញ្ហាផ្ទាល់ខ្លួនតែម្នាក់ឯងទេ។ មនុស្សជុំវិញអ្នក ខ្យល់ដែលអ្នកដកដង្ហើមរួម សារធាតុគីមីក្នុងបរិយាកាសរបស់អ្នក កម្រិតតានតឹងក្នុងសហគមន៍របស់អ្នក និងភាពរឹងមាំនៃមិត្តភាពរបស់អ្នក សុទ្ធតែត្បាញចូលគ្នាទៅជាបណ្តាញដ៏ធំមួយ — ហើយបណ្តាញនោះ ទើបជាអ្វីដែលកំណត់ពិតប្រាកដ ថាតើអ្នករស់នៅបានយូរប៉ុនណា និងល្អប៉ុនណា។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={MED_BLUE}     k={k} en="Epidemiology"    kh="រោគរាតត្បាត" />
                <HeroChip color={ROSE}         k={k} en="Cancer & Toxins" kh="មហារីក និងពុល" />
                <HeroChip color={SUNRISE}      k={k} en="Stress"          kh="តានតឹង" />
                <HeroChip color={SAGE}         k={k} en="Relationships"   kh="ទំនាក់ទំនង" />
              </div>
            </div>
          </div>
        </header>

        <SectionInvisibleMath  k={k} t={t} />
        <SectionChemicalTrap   k={k} t={t} />
        <SectionStress         k={k} t={t} />
        <SectionHappiness      k={k} t={t} />

        {/* Closing */}
        <div
          className="relative mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3 shadow"
          style={{
            borderColor: `${SUNRISE}55`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${SUNRISE_LIGHT}55 100%)`,
          }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: SUNRISE_DEEP }} />
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "Public health is what happens when individual choices, scientific knowledge, and a community's care for one another all meet. Wash your hands, get the vaccine, refuse the cigarette, lower someone's stress, call your grandmother — every one of those small acts is a thread in a web that is keeping a whole village alive.",
              "សុខភាពសាធារណៈ គឺជាអ្វីដែលកើតឡើង នៅពេលដែលជម្រើសផ្ទាល់ខ្លួន ចំណេះដឹងវិទ្យាសាស្ត្រ និងការយកចិត្តទុកដាក់របស់សហគមន៍ មកជួបជុំគ្នា។ លាងដៃ ទទួលវ៉ាក់សាំង បដិសេធបារី បន្ថយភាពតានតឹងឲ្យនរណាម្នាក់ ទូរស័ព្ទទៅជីដូនរបស់អ្នក — រាល់ទង្វើតូចៗទាំងនោះ គឺជាខ្សែសរសៃនៅក្នុងបណ្តាញមួយ ដែលកំពុងរក្សាអាយុជីវិតភូមិទាំងមូល។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: SUNRISE }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroChip({
  color,
  k,
  en,
  kh,
}: {
  color: string;
  k: boolean;
  en: string;
  kh: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-white/80 backdrop-blur-sm ${k ? "font-khmer" : ""}`}
      style={{ color, borderColor: `${color}88` }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Invisible Math
// ════════════════════════════════════════════════════════════════════════════

function SectionInvisibleMath({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-invisible-math">
      <SectionHeader
        spec="01"
        en="The Invisible Math"
        kh="រោគរាតត្បាត និងវ៉ាក់សាំង"
        k={k}
        Icon={Search}
        accent={MED_BLUE}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Most diseases do not move at random. They move along invisible mathematical paths — handshake to handshake, breath to breath, village to village. Public health is the work of seeing those paths and breaking them.",
          "ជំងឺភាគច្រើនមិនរីករាលដាលដោយចៃដន្យទេ។ ពួកវាផ្លាស់ទីតាមផ្លូវគណិតវិទ្យាដែលមើលមិនឃើញ — ចាប់ដៃទៅចាប់ដៃ ដង្ហើមទៅដង្ហើម ភូមិទៅភូមិ។ សុខភាពសាធារណៈ គឺជាការងារនៃការមើលឃើញផ្លូវទាំងនោះ និងការកាត់ផ្តាច់វា។"
        )}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <ConceptCard
          k={k}
          Icon={Stethoscope}
          enName="Epidemiology"
          khName="រោគរាតត្បាត"
          enTag="the science of disease detectives"
          khTag="វិទ្យាសាស្ត្រនៃអ្នកស៊ើបអង្កេតជំងឺ"
          enBody="An epidemiologist works exactly like a detective at a crime scene — except the crime is an outbreak. They map who got sick first, where they had been, who they spoke to, what they ate, what they touched. From that map, they reconstruct how the illness is travelling through the population, and they look for the one weak link in the chain that, if broken, will stop everything."
          khBody="អ្នករោគរាតត្បាត ធ្វើការដូចជាអ្នកស៊ើបអង្កេតនៅទីកើតហេតុបទឧក្រិដ្ឋ — លើកលែងតែបទឧក្រិដ្ឋនោះ គឺជាការផ្ទុះជំងឺ។ ពួកគេគូសផែនទីថានរណាឈឺមុនគេ ពួកគេបានទៅទីណា និយាយជាមួយនរណា ញ៉ាំអ្វី ប៉ះពាល់អ្វី។ ពីផែនទីនោះ ពួកគេកសាងឡើងវិញ ថាតើជំងឺនេះកំពុងផ្លាស់ទីតាមរយៈប្រជាជនយ៉ាងដូចម្តេច ហើយពួកគេស្វែងរកចំណុចខ្សោយតែមួយនៅក្នុងខ្សែសង្វាក់ ដែលបើបានកាត់ផ្តាច់ នឹងបញ្ឈប់អ្វីៗទាំងអស់។"
          accent={MED_BLUE}
          glow
        >
          <Callout
            k={k}
            Icon={Eye}
            labelEn="The classic case"
            labelKh="ករណីបុរាណ"
            enTitle="Dr. John Snow and the broken pump (London, 1854)"
            khTitle="វេជ្ជបណ្ឌិត ចន ស្នូ និងបូមទឹកដែលបានកាត់ផ្តាច់ (ឡុងដ៍ ឆ្នាំ ១៨៥៤)"
            enBody="When cholera was killing Londoners, Dr. Snow drew a map of every death and noticed they all clustered around one water pump on Broad Street. He had the handle removed from that pump — and the outbreak stopped. That single map is the moment epidemiology was born."
            khBody="នៅពេលដែលជំងឺអាសន្នរោគ កំពុងសម្លាប់ប្រជាជនឡុងដ៍ វេជ្ជបណ្ឌិត ស្នូ បានគូសផែនទីនៃរាល់ការស្លាប់ ហើយបានកត់សម្គាល់ឃើញថា ពួកវាប្រមូលផ្តុំជុំវិញបូមទឹកមួយនៅផ្លូវប្រូឌ។ គាត់បានឲ្យដក ដៃបូមនោះចេញ — ហើយការផ្ទុះជំងឺបានឈប់។ ផែនទីតែមួយនោះ គឺជាពេលវេលាដែលរោគរាតត្បាតបានកើតមក។"
            accent={MED_BLUE}
          />
        </ConceptCard>

        <ConceptCard
          k={k}
          Icon={Syringe}
          enName="Vaccines & Herd Immunity"
          khName="វ៉ាក់សាំង និងភាពស៊ាំសហគមន៍"
          enTag="a wanted poster for your immune system"
          khTag="ប័ណ្ណប្រកាសឲ្យចាប់សម្រាប់ប្រព័ន្ធការពាររបស់អ្នក"
          enBody="A vaccine is essentially a wanted poster. It hands your immune system a harmless picture of the criminal — the spike of a virus, the shell of a bacterium — so that white blood cells can study its face in calm conditions. Then, if the real criminal ever shows up in your body, the immune system already recognises it on sight and destroys it before it can hurt you."
          khBody="វ៉ាក់សាំង សំខាន់គឺជាប័ណ្ណប្រកាសឲ្យចាប់។ វាប្រគល់ឲ្យប្រព័ន្ធការពាររបស់អ្នកនូវរូបភាពមិនបង្កគ្រោះថ្នាក់របស់ឧក្រិដ្ឋជន — បន្លានៃវីរុស សំបកនៃបាក់តេរី — ដើម្បីឲ្យកោសិកាឈាមសរសៃពណ៌សអាចសិក្សាមុខវាក្នុងលក្ខខណ្ឌស្ងប់ស្ងាត់។ បន្ទាប់មក ប្រសិនបើឧក្រិដ្ឋជនពិតបានបង្ហាញខ្លួននៅក្នុងរាងកាយរបស់អ្នកមួយថ្ងៃណានោះ ប្រព័ន្ធការពារបានស្គាល់វាភ្លាមៗ ហើយបំផ្លាញវាមុនពេលវាអាចធ្វើបាបអ្នក។"
          accent={MED_BLUE}
          badge={{ en: "Critical idea", kh: "គំនិតសំខាន់" }}
        >
          <Callout
            k={k}
            Icon={Users}
            labelEn="Herd immunity"
            labelKh="ភាពស៊ាំសហគមន៍"
            enTitle="Vaccination protects the people who cannot get vaccinated."
            khTitle="ការចាក់វ៉ាក់សាំង ការពារមនុស្សដែលមិនអាចចាក់វ៉ាក់សាំងបាន។"
            enBody="Newborn babies, the elderly, people on cancer treatment, and people with weak immune systems often cannot be vaccinated themselves. When enough of the people around them are immune, the virus runs into a wall — every infected person is surrounded by people who simply do not catch it. The disease hits a dead end and dies out before it can reach the most vulnerable. Getting vaccinated is, in this sense, an act of community defence as much as personal defence."
            khBody="ទារកទើបនឹងកើត មនុស្សចាស់ មនុស្សដែលកំពុងព្យាបាលមហារីក និងមនុស្សដែលមានប្រព័ន្ធការពារខ្សោយ ច្រើនតែមិនអាចចាក់វ៉ាក់សាំងដោយខ្លួនឯងបានទេ។ នៅពេលដែលមនុស្សភាគច្រើនជុំវិញពួកគេមានភាពស៊ាំ វីរុសបុកជញ្ជាំង — រាល់មនុស្សដែលឆ្លងនោះ មានមនុស្សជុំវិញដែលគ្រាន់តែមិនឆ្លងទេ។ ជំងឺចូលផ្លូវកំបុតចង្អៀត ហើយរលត់ មុនពេលវាអាចទៅដល់អ្នកដែលងាយរងគ្រោះបំផុត។ ការចាក់វ៉ាក់សាំងតាមរយៈបែបនេះ គឺជាទង្វើនៃការការពារសហគមន៍ ដូចជាការការពារផ្ទាល់ខ្លួនដែរ។"
            accent={MED_BLUE}
          />
        </ConceptCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Chemical Trap
// ════════════════════════════════════════════════════════════════════════════

// Stylised lung visualisation (pure SVG — works on any device, no images)
function LungComparison({ k }: { k: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-3">
      {/* Healthy lung */}
      <div
        className="rounded-2xl border-2 p-3 bg-white"
        style={{ borderColor: `${SAGE}55` }}
        data-testid="lung-healthy"
      >
        <svg viewBox="0 0 200 180" className="w-full h-auto">
          <defs>
            <radialGradient id="healthyGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#f87171" />
            </radialGradient>
          </defs>
          {/* trachea */}
          <rect x="92" y="10" width="16" height="40" rx="4" fill="#cbd5e1" />
          {/* bronchi */}
          <path d="M100 50 Q70 60 55 90" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M100 50 Q130 60 145 90" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* left lobe */}
          <path
            d="M55 90 Q25 105 30 145 Q40 175 75 165 Q90 155 85 120 Q80 95 55 90 Z"
            fill="url(#healthyGrad)"
            stroke={SAGE}
            strokeWidth="2"
          />
          {/* right lobe */}
          <path
            d="M145 90 Q175 105 170 145 Q160 175 125 165 Q110 155 115 120 Q120 95 145 90 Z"
            fill="url(#healthyGrad)"
            stroke={SAGE}
            strokeWidth="2"
          />
          {/* clean alveoli dots */}
          {[
            [55, 130], [70, 145], [60, 115], [45, 145],
            [145, 130], [130, 145], [140, 115], [155, 145],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#fecaca" stroke={SAGE} strokeWidth="1" />
          ))}
        </svg>
        <div className="text-center mt-1">
          <div className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: SAGE }}>
            {k ? "សួតមានសុខភាពល្អ" : "Healthy lung"}
          </div>
          <div className={`text-xs text-slate-700 mt-0.5 ${k ? "font-khmer" : ""}`}>
            {k ? "ផ្លូវខ្យល់ធំទូលាយ · អាល់វេអូលថ្លា · ខ្យល់ហូរសេរី" : "Wide airways · clear alveoli · free airflow"}
          </div>
        </div>
      </div>

      {/* Damaged / asthmatic lung */}
      <div
        className="rounded-2xl border-2 p-3 bg-white"
        style={{ borderColor: `${ROSE}55` }}
        data-testid="lung-damaged"
      >
        <svg viewBox="0 0 200 180" className="w-full h-auto">
          <defs>
            <radialGradient id="sickGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          <rect x="92" y="10" width="16" height="40" rx="4" fill="#94a3b8" />
          {/* constricted bronchi (thinner) */}
          <path d="M100 50 Q70 60 55 90" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M100 50 Q130 60 145 90" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path
            d="M55 90 Q25 105 30 145 Q40 175 75 165 Q90 155 85 120 Q80 95 55 90 Z"
            fill="url(#sickGrad)"
            stroke={ROSE}
            strokeWidth="2"
          />
          <path
            d="M145 90 Q175 105 170 145 Q160 175 125 165 Q110 155 115 120 Q120 95 145 90 Z"
            fill="url(#sickGrad)"
            stroke={ROSE}
            strokeWidth="2"
          />
          {/* tar specks + inflamed alveoli */}
          {[
            [55, 130], [70, 145], [60, 115], [45, 145], [50, 160],
            [145, 130], [130, 145], [140, 115], [155, 145], [150, 160],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#1e293b" stroke={ROSE} strokeWidth="1" />
          ))}
          {/* extra tar smudges */}
          {[
            [70, 120], [40, 130], [165, 130], [120, 130], [135, 160],
          ].map(([cx, cy], i) => (
            <circle key={`s-${i}`} cx={cx} cy={cy} r="2" fill="#0f172a" />
          ))}
        </svg>
        <div className="text-center mt-1">
          <div className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: ROSE }}>
            {k ? "សួតរងគ្រោះ / ហឺត" : "Damaged / asthmatic lung"}
          </div>
          <div className={`text-xs text-slate-700 mt-0.5 ${k ? "font-khmer" : ""}`}>
            {k ? "ផ្លូវខ្យល់ចង្អៀត · ស្នាមកាត្រ · ការរលាក" : "Narrowed airways · tar deposits · inflammation"}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionChemicalTrap({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-chemical-trap">
      <SectionHeader
        spec="02"
        en="The Chemical Trap"
        kh="បារី និងមហារីក"
        k={k}
        Icon={Cigarette}
        accent={ROSE}
      />

      <ConceptCard
        k={k}
        Icon={Cigarette}
        enName="Cigarettes & Cancer"
        khName="បារី និងមហារីក"
        enTag="how smoke physically rewrites your DNA"
        khTag="របៀបដែលផ្សែងសរសេរ DNA របស់អ្នកឡើងវិញដោយរូបវិទ្យា"
        enBody={"Cigarettes are not simply \u201Cunhealthy\u201D \u2014 they are a precision attack on the human body. Every puff carries more than seventy known carcinogens, packed into a sticky brown residue called tar. That tar coats the inside of the lungs and slowly soaks into individual cells, where its molecules slip inside the cell nucleus and physically break the strands of DNA \u2014 the instruction manual that tells each cell what to do. Most damaged cells just die. But occasionally, a cell is broken in exactly the wrong place, and the instruction \u201Cstop dividing\u201D is erased. That single cell now multiplies, again and again, with no off-switch. That is what cancer is: a normal cell whose user-manual was edited by smoke."}
        khBody="បារី មិនគ្រាន់តែជា «មិនល្អដល់សុខភាព» ទេ — ពួកវាគឺជាការវាយប្រហារដោយភាពច្បាស់លាស់ទៅលើរាងកាយមនុស្ស។ ការស្រូបម្តងៗ នាំជាមួយនូវសារធាតុបង្កមហារីកដែលគេស្គាល់ច្រើនជាង ៧០ ប្រភេទ ដែលបានវេចខ្ចប់ក្នុងសំណល់ពណ៌ត្នោតស្អិតមួយហៅថា កាត្រ។ កាត្រនោះស្រោបផ្ទៃខាងក្នុងសួត និងជ្រាបយឺតៗចូលក្នុងកោសិកានីមួយៗ ដែលម៉ូលេគុលរបស់វារអិលចូលក្នុងស្នូលកោសិកា ហើយកាត់ផ្តាច់សរសៃ DNA ដោយរូបវិទ្យា — សៀវភៅណែនាំដែលប្រាប់កោសិកានីមួយៗថាត្រូវធ្វើអ្វី។ កោសិកាដែលរងគ្រោះភាគច្រើនគ្រាន់តែស្លាប់។ ប៉ុន្តែម្តងម្កាល កោសិកាមួយត្រូវបានកាត់នៅចំណុចខុសច្បាស់លាស់ ហើយការណែនាំ «ឈប់បែងចែក» ត្រូវបានលុបចោល។ កោសិកាតែមួយនោះ ឥឡូវនេះមានចំនួនកើនឡើងម្តងហើយម្តងទៀត ដោយគ្មានកុងតាក់បិទទេ។ នោះគឺជាអ្វីដែលមហារីក ៖ កោសិកាធម្មតាមួយដែលសៀវភៅណែនាំរបស់វា ត្រូវបានកែសម្រួលដោយផ្សែង។"
        accent={ROSE}
        glow
        badge={{ en: "70+ carcinogens", kh: "៧០+ បង្កមហារីក" }}
      >
        <div className="space-y-3">
          {/* Mini-step diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {[
              { i: Cigarette, en: "Smoke + tar enter the lung", kh: "ផ្សែង + កាត្រចូលសួត" },
              { i: WindIcon,  en: "Tar coats airways and alveoli", kh: "កាត្រស្រោបផ្លូវខ្យល់" },
              { i: Dna,       en: "Carcinogens break the DNA inside cells", kh: "សារធាតុបង្កមហារីកកាត់ DNA" },
              { i: AlertTriangle, en: "Damaged cells multiply uncontrollably", kh: "កោសិការងគ្រោះកើនឡើងគ្មានដែនកំណត់" },
            ].map((step, idx) => {
              const Icon = step.i;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-3 border bg-white flex items-start gap-2"
                  style={{ borderColor: `${ROSE}33` }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white"
                    style={{ backgroundColor: ROSE }}
                  >
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <Icon className="w-4 h-4 mb-1" style={{ color: ROSE }} />
                    <div className={`text-xs leading-snug ${k ? "font-khmer leading-loose" : ""}`} style={{ color: SLATE }}>
                      {k ? step.kh : step.en}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <LungComparison k={k} />

          <Callout
            k={k}
            Icon={Sparkles}
            labelEn="Good news"
            labelKh="ដំណឹងល្អ"
            enTitle="The lung is one of the most forgiving organs in the body."
            khTitle="សួត គឺជាសរីរាង្គមួយក្នុងចំណោមសរីរាង្គដែលអភ័យទោសជាងគេក្នុងរាងកាយ។"
            enBody="If a smoker quits, lung function begins to recover within hours, blood pressure drops within days, and after about ten smoke-free years the risk of dying from lung cancer falls by roughly half. The body wants to repair itself — but it can only do so when the chemical trap is shut."
            khBody="ប្រសិនបើអ្នកជក់បារីឈប់ មុខងារសួតចាប់ផ្តើមងើបឡើងវិញក្នុងរយៈពេលប៉ុន្មានម៉ោង សម្ពាធឈាមធ្លាក់ចុះក្នុងរយៈពេលប៉ុន្មានថ្ងៃ ហើយបន្ទាប់ពីប្រហែល ១០ ឆ្នាំគ្មានផ្សែង ហានិភ័យនៃការស្លាប់ដោយសារមហារីកសួតថយចុះប្រហែលពាក់កណ្តាល។ រាងកាយចង់ជួសជុលខ្លួនឯង — ប៉ុន្តែវាអាចធ្វើបានតែនៅពេលដែលអន្ទាក់គីមីត្រូវបានបិទ។"
            accent={SAGE}
          />
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Physical Cost of Stress
// ════════════════════════════════════════════════════════════════════════════

function SectionStress({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-stress">
      <SectionHeader
        spec="03"
        en="The Physical Cost of Stress"
        kh="ឥទ្ធិពលនៃភាពតានតឹង និងវិសមភាព"
        k={k}
        Icon={Activity}
        accent={SUNRISE}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Stress is not just a feeling in the head. It is a chemical event in the bloodstream — and when it never stops, that chemistry begins eating the body alive.",
          "ភាពតានតឹង មិនមែនគ្រាន់តែជាអារម្មណ៍ក្នុងក្បាលទេ។ វាគឺជាព្រឹត្តិការណ៍គីមីក្នុងចរន្តឈាម — ហើយនៅពេលដែលវាមិនឈប់ គីមីនោះចាប់ផ្តើមហូបរាងកាយរស់ៗ។"
        )}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <ConceptCard
          k={k}
          Icon={Brain}
          enName="Cortisol: The Survival Hormone"
          khName="កតទីហ្សុល៖ អរម៉ូននៃការរស់រាន"
          enTag="short bursts save lives · constant doses kill them"
          khTag="ខ្លីៗរក្សាជីវិត · ជានិច្ចបំផ្លាញវា"
          enBody="When the brain perceives a threat — a snake on the path, a charging dog, an angry teacher — it floods the bloodstream with a hormone called cortisol. Cortisol jolts the heart faster, narrows the blood vessels, sharpens the eyes, dumps sugar into the muscles, and tells the digestive and immune systems to stop wasting energy. In a five-minute emergency, this is a miracle: it is exactly what keeps you alive long enough to escape. The problem is that the modern world rarely turns the alarm off. School fees, an unsafe home, a debt that cannot be paid, a sick parent — these soak the body in cortisol day after day, year after year. Long-term cortisol erodes the heart, weakens the immune system, and shortens life. The same chemical that saves you from a tiger will, given enough years, kill you slowly."
          khBody="នៅពេលដែលខួរក្បាលយល់ឃើញគ្រោះថ្នាក់ — ពស់នៅលើផ្លូវ ឆ្កែវាយតោង គ្រូខឹង — វាបញ្ចេញអរម៉ូនមួយដែលហៅថា កតទីហ្សុល ចូលក្នុងចរន្តឈាម។ កតទីហ្សុលធ្វើឲ្យបេះដូងលោតលឿន ចង្អៀតសរសៃឈាម ធ្វើឲ្យភ្នែកមុតស្រួច បញ្ចេញស្ករចូលសាច់ដុំ ហើយប្រាប់ប្រព័ន្ធរំលាយអាហារ និងប្រព័ន្ធការពារឲ្យឈប់ចំណាយថាមពលឥតប្រយោជន៍។ ក្នុងគ្រាអាសន្នប្រាំនាទី នេះគឺជាអព្ភូតហេតុ ៖ វាគឺជាអ្វីដែលរក្សាអ្នកឲ្យរស់នៅយូរគ្រប់គ្រាន់ដើម្បីរត់គេច។ បញ្ហាគឺថា ពិភពលោកសម័យទំនើបកម្រនឹងបិទសម្លេងរោទ៍។ ថ្លៃសិក្សា ផ្ទះមិនមានសុវត្ថិភាព បំណុលដែលមិនអាចសងបាន ឪពុកម្តាយឈឺ — ទាំងនេះត្រាំរាងកាយក្នុងកតទីហ្សុល ថ្ងៃហើយថ្ងៃទៀត ឆ្នាំហើយឆ្នាំទៀត។ កតទីហ្សុលរយៈពេលវែងបំផ្លាញបេះដូង ធ្វើឲ្យប្រព័ន្ធការពារខ្សោយ និងបន្ថយអាយុជីវិត។ គីមីតែមួយដែលជួយសង្គ្រោះអ្នកពីខ្លា នឹងសម្លាប់អ្នកយឺតៗ ប្រសិនបើផ្តល់ឲ្យវានូវឆ្នាំគ្រប់គ្រាន់។"
          accent={SUNRISE}
          glow
        />

        <ConceptCard
          k={k}
          Icon={Wallet}
          enName="Wealth Inequality as a Disease"
          khName="វិសមភាពទ្រព្យសម្បត្តិ ជាជំងឺ"
          enTag="poverty is a permanent stress signal"
          khTag="ភាពក្រីក្រ គឺជាសញ្ញាតានតឹងជាអចិន្ត្រៃយ៍"
          enBody="Public-health researchers have shown, again and again, that poverty is not only a lack of money — it is a permanent biological signal of danger. A person who never knows whether the rent will be paid or whether dinner will appear lives with a quietly elevated cortisol level for decades. Even more striking: in places where the gap between rich and poor is very large, even people who are doing fine financially end up with worse heart disease, worse mental health, and shorter lives than people in more equal societies. The damage is not done by poverty alone, but by inequality itself — by the stress of constantly comparing, of watching others have what you cannot, of not knowing whether the system is on your side. Severe wealth inequality is, very literally, a public-health hazard."
          khBody="អ្នកស្រាវជ្រាវសុខភាពសាធារណៈបានបង្ហាញម្តងហើយម្តងទៀតថា ភាពក្រីក្រមិនមែនគ្រាន់តែជាការខ្វះប្រាក់ទេ — វាគឺជាសញ្ញាជីវសាស្ត្រអចិន្ត្រៃយ៍នៃគ្រោះថ្នាក់។ មនុស្សម្នាក់ដែលមិនដែលដឹងថា ថ្លៃជួលផ្ទះនឹងត្រូវបានបង់ ឬថាអាហារពេលល្ងាចនឹងមាន រស់នៅជាមួយកម្រិតកតទីហ្សុលខ្ពស់ស្ងៀមៗអស់រយៈពេលជាច្រើនទសវត្សរ៍។ គួរឲ្យកត់សម្គាល់ជាងនេះទៀត ៖ នៅកន្លែងដែលគម្លាតរវាងអ្នកមាន និងអ្នកក្រ មានកម្រិតធំ សូម្បីតែមនុស្សដែលមានជីវភាពហិរញ្ញវត្ថុល្អ ក៏បញ្ចប់ដោយជំងឺបេះដូងធ្ងន់ធ្ងរជាង សុខភាពផ្លូវចិត្តអាក្រក់ជាង និងអាយុជីវិតខ្លីជាងមនុស្សនៅក្នុងសង្គមដែលមានសមភាពច្រើនជាងនេះ។ ការខូចខាតមិនបានបង្កឡើងដោយភាពក្រីក្រតែឯងទេ ប៉ុន្តែដោយវិសមភាពខ្លួនឯង — ដោយភាពតានតឹងនៃការប្រៀបធៀបជានិច្ច ការសម្លឹងមើលអ្នកដទៃមាននូវអ្វីដែលអ្នកមិនមាន ការមិនដឹងថាប្រព័ន្ធនេះនៅជាមួយអ្នកឬទេ។ វិសមភាពទ្រព្យសម្បត្តិធ្ងន់ធ្ងរ គឺជាគ្រោះថ្នាក់សុខភាពសាធារណៈ ពិតប្រាកដ។"
          accent={SUNRISE}
          badge={{ en: "Society = biology", kh: "សង្គម = ជីវវិទ្យា" }}
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — The Foundation of Happiness
// ════════════════════════════════════════════════════════════════════════════

function SectionHappiness({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-happiness">
      <SectionHeader
        spec="04"
        en="The Foundation of Happiness"
        kh="ទំនាក់ទំនង និងគ្រួសារ"
        k={k}
        Icon={HeartHandshake}
        accent={SAGE}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "If everything in this module sounds heavy, this last section is the answer. The most powerful medicine ever measured by science is not a pill, a vaccine, or a diet. It is each other.",
          "ប្រសិនបើអ្វីៗគ្រប់យ៉ាងនៅក្នុងមុខវិជ្ជានេះ ស្តាប់ទៅធ្ងន់ ចំណែកចុងក្រោយនេះគឺជាចម្លើយ។ ឱសថដ៏មានឥទ្ធិពលបំផុតដែលវិទ្យាសាស្ត្របានវាស់វែង មិនមែនជាថ្នាំ មិនមែនជាវ៉ាក់សាំង និងមិនមែនជារបបអាហារទេ។ វាគឺជាមនុស្សគ្នាឯង។"
        )}
      </p>

      <ConceptCard
        k={k}
        Icon={Sunrise}
        enName="The Harvard Study of Adult Development"
        khName="ការសិក្សាហាវ៉ាដស្តីពីការអភិវឌ្ឍមនុស្សពេញវ័យ"
        enTag="85+ years · the longest study of happiness ever run"
        khTag="៨៥+ ឆ្នាំ · ការសិក្សាសុភមង្គលដែលរត់យូរជាងគេបំផុត"
        enBody="In 1938, researchers at Harvard University began following the lives of more than 700 men — some Boston-born teenagers from poor neighbourhoods, some Harvard students from wealthy families. They tracked their jobs, their marriages, their incomes, their illnesses, their children, and their grandchildren for the next 85 years and counting. The data shows something the researchers themselves did not expect: wealth, fame, and a lucky genetic inheritance do not predict who lives a long, healthy, satisfied life. The single strongest predictor — across rich and poor, across every era — is the quality of the person's close relationships. Warm friendships, a steady marriage, family ties that are honest enough to call when you are in trouble: these protect the body more reliably than any physical health habit ever measured."
        khBody="នៅឆ្នាំ ១៩៣៨ អ្នកស្រាវជ្រាវនៅសាកលវិទ្យាល័យហាវ៉ាដ បានចាប់ផ្តើមតាមដានជីវិតរបស់បុរសច្រើនជាង ៧០០ នាក់ — មួយចំនួនជាក្មេងជំទង់កើតនៅបូស្តុនពីសង្កាត់ក្រីក្រ មួយចំនួនជាសិស្សហាវ៉ាដពីគ្រួសារមានទ្រព្យ។ ពួកគេបានតាមដានការងារ ការរៀបការ ប្រាក់ចំណូល ជំងឺ កូន និងចៅរបស់ពួកគេ អស់រយៈពេល ៨៥ ឆ្នាំខាងមុខ និងបន្តកំពុងតែតាមដាន។ ទិន្នន័យបង្ហាញនូវអ្វីដែលអ្នកស្រាវជ្រាវខ្លួនឯងមិនបានរំពឹងទុក ៖ ទ្រព្យសម្បត្តិ ភាពល្បីល្បាញ និងមរតកហ្សែនល្អ មិនព្យាករថានរណាម្នាក់នឹងរស់នៅជីវិតវែង សុខភាពល្អ និងពេញចិត្តនោះទេ។ អ្នកព្យាករដ៏ខ្លាំងបំផុតតែមួយ — ឆ្លងកាត់អ្នកមាន និងអ្នកក្រ ឆ្លងកាត់គ្រប់សម័យកាល — គឺគុណភាពនៃទំនាក់ទំនងជិតស្និទ្ធរបស់មនុស្សនោះ។ មិត្តភាពកក់ក្តៅ ការរៀបការដ៏រឹងមាំ ចំណងគ្រួសារដែលស្មោះត្រង់គ្រប់គ្រាន់ ដើម្បីហៅពេលអ្នកមានបញ្ហា ៖ ទាំងនេះការពាររាងកាយបានទុកចិត្តជាងទម្លាប់សុខភាពរូបវន្តណាមួយដែលធ្លាប់វាស់វែង។"
        accent={SAGE}
        glow
        badge={{ en: "Strongest predictor", kh: "អ្នកព្យាករខ្លាំងជាងគេ" }}
      >
        {/* Three findings, each as a soft tile */}
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          {[
            {
              icon: HeartPulse,
              en: "Lower cortisol",
              kh: "កតទីហ្សុលទាប",
              enBody: "Spending time with people we trust measurably lowers stress hormones and slows the heart.",
              khBody: "ការចំណាយពេលវេលាជាមួយមនុស្សដែលយើងជឿទុកចិត្ត ធ្វើឲ្យអរម៉ូនតានតឹងថយចុះច្បាស់លាស់ និងធ្វើឲ្យបេះដូងលោតយឺត។",
            },
            {
              icon: ShieldCheck,
              en: "Stronger immune system",
              kh: "ប្រព័ន្ធការពាររឹងមាំជាង",
              enBody: "Lonely people catch colds and flus more often than well-connected people of the same age.",
              khBody: "មនុស្សឯកោឆ្លងផ្តាសាយ និងគ្រុនផ្តាសាយញឹកញាប់ជាងមនុស្សដែលមានទំនាក់ទំនងល្អនៃវ័យដូចគ្នា។",
            },
            {
              icon: Home,
              en: "A longer life",
              kh: "អាយុជីវិតវែងជាង",
              enBody: "Across the Harvard data, the people most satisfied with their relationships at age 50 were the healthiest at age 80.",
              khBody: "ឆ្លងកាត់ទិន្នន័យហាវ៉ាដ មនុស្សដែលពេញចិត្តបំផុតចំពោះទំនាក់ទំនងរបស់ពួកគេនៅអាយុ ៥០ ឆ្នាំ គឺជាមនុស្សដែលមានសុខភាពល្អបំផុតនៅអាយុ ៨០ ឆ្នាំ។",
            },
          ].map((tile, i) => {
            const Icon = tile.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-4 border bg-white"
                style={{ borderColor: `${SAGE}33` }}
                data-testid={`harvard-finding-${i}`}
              >
                <Icon className="w-5 h-5 mb-2" style={{ color: SAGE }} />
                <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
                  {k ? tile.kh : tile.en}
                </div>
                <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {k ? tile.khBody : tile.enBody}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pull quote from study director */}
        <blockquote
          className={`relative mt-5 pl-5 border-l-4 italic text-slate-700 ${k ? "font-khmer not-italic leading-loose" : "leading-relaxed"}`}
          style={{ borderColor: SAGE }}
        >
          <Quote className="absolute -left-3 -top-1 w-4 h-4" style={{ color: SAGE }} aria-hidden="true" />
          <span className="text-base">
            {t(
              "\u201CGood relationships keep us happier and healthier. Period.\u201D",
              "«ទំនាក់ទំនងល្អ រក្សាយើងឲ្យសប្បាយ និងសុខភាពល្អជាង។ ប៉ុណ្ណេះ។»"
            )}
          </span>
          <span className={`block mt-1 text-xs not-italic text-slate-500 ${k ? "font-khmer" : ""}`}>
            — {t("Dr. Robert Waldinger, current director of the Harvard Study", "វេជ្ជបណ្ឌិត រ៉ូបឺត វ៉ាល់ឌិងហ្គឺ ប្រធានបច្ចុប្បន្ននៃការសិក្សាហាវ៉ាដ")}
          </span>
        </blockquote>
      </ConceptCard>
    </section>
  );
}
