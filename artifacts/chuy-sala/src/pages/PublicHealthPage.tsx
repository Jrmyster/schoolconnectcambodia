import { Link } from "wouter";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Baby,
  Brain,
  Cigarette,
  CloudRain,
  Dna,
  Eye,
  Flame,
  FlaskConical,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  Quote,
  Repeat,
  Ribbon,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Sunrise,
  Syringe,
  Droplet,
  Hand,
  Microscope,
  Skull,
  ShieldOff,
  Umbrella,
  Users,
  Wallet,
  Wind as WindIcon,
  FishSymbol,
  Recycle,
  Trash2,
  Ban,
  Waves,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { ObstetricFistula } from "@/pages/sections/ObstetricFistula";
import { DiabetesParadox } from "@/pages/sections/DiabetesParadox";
import { EmergencyFirstAid } from "@/pages/sections/EmergencyFirstAid";

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
                <HeroChip color="#b45309"      k={k} en="Alcohol"         kh="គ្រឿងស្រវឹង" />
                <HeroChip color={SUNRISE}      k={k} en="Stress"          kh="តានតឹង" />
                <HeroChip color={SAGE}         k={k} en="Relationships"   kh="ទំនាក់ទំនង" />
                <HeroChip color="#0f766e"      k={k} en="Diabetes"        kh="ទឹកនោមផ្អែម" />
              </div>
            </div>
          </div>
        </header>

        <SectionInvisibleMath  k={k} t={t} />
        <ObstetricFistula      k={k} t={t} />
        <DiabetesParadox       k={k} t={t} />
        <SectionSoap           k={k} t={t} />
        <SectionChemicalTrap   k={k} t={t} />
        <SectionAlcoholChemistry k={k} t={t} />
        <SectionStress         k={k} t={t} />
        <SectionHappiness      k={k} t={t} />
        <SectionDermatology    k={k} t={t} />
        <SectionPlasticEpidemic k={k} t={t} />
        <EmergencyFirstAid     k={k} t={t} />

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

        {/* Featured Deep-Dive: The Science of Addiction */}
        <div className="mt-10">
          <Link
            href="/well-being/addiction-science"
            data-testid="link-addiction-science-module"
            className="group block relative overflow-hidden rounded-3xl bg-white border shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: `${MED_BLUE}33` }}
          >
            <div
              className="absolute -top-16 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: `${MED_BLUE}22` }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: `${ROSE}1a` }}
              aria-hidden="true"
            />
            <div className="relative p-6 sm:p-8 grid sm:grid-cols-[auto,1fr,auto] items-center gap-5">
              <div
                className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{
                  backgroundColor: `${MED_BLUE}1a`,
                  border: `1px solid ${MED_BLUE}55`,
                  color: MED_BLUE_DEEP,
                }}
              >
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-2 ${k ? "font-khmer tracking-normal normal-case" : ""}`}
                  style={{ color: MED_BLUE_DEEP }}
                >
                  <Sparkles className="w-3 h-3" />
                  {t("Featured Deep-Dive · Neuroscience", "សិក្សាស៊ីជម្រៅ · ប្រសាទវិទ្យា")}
                </div>
                <h3
                  className={`font-display font-bold text-xl sm:text-2xl mb-1.5 ${k ? "font-khmer leading-loose" : ""}`}
                  style={{ color: SLATE }}
                >
                  {t(
                    "The Science of Addiction: Hijacking the Brain",
                    "វិទ្យាសាស្ត្រនៃការញៀន៖ ការលួចបញ្ជាខួរក្បាល",
                  )}
                </h3>
                <p className={`text-sm text-slate-700 max-w-2xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "Dopamine, tolerance, cortisol — why addiction is a measurable change inside the brain, not a moral failing.",
                    "ដូប៉ាមីន ភាពស៊ាំ កូទីសុល — ហេតុអ្វីការញៀនជាការផ្លាស់ប្ដូរអាចវាស់បាននៅក្នុងខួរក្បាល មិនមែនជាការខុសផ្នែកសីលធម៌ទេ។",
                  )}
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 group-hover:translate-x-1 transition-transform text-sm font-semibold ${k ? "font-khmer" : ""}`}
                style={{ color: MED_BLUE_DEEP }}
              >
                <span>{t("Open module", "បើកម៉ូឌុល")}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
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

      {/* ─── Sub-section: The Instruction Manual — mRNA Vaccines ─── */}
      <SubSectionHeader
        k={k}
        Icon={Dna}
        spec="01a"
        en="The Instruction Manual: mRNA Vaccines"
        kh="សៀវភៅណែនាំ៖ វ៉ាក់សាំង mRNA"
        enLead="If a traditional vaccine is a wanted poster, an mRNA vaccine is the recipe to draw the poster — a fragile, self-destructing message your own cells read once, and then forget."
        khLead="ប្រសិនបើវ៉ាក់សាំងបុរាណគឺជាប័ណ្ណប្រកាសឲ្យចាប់ នោះវ៉ាក់សាំង mRNA គឺជារូបមន្តដើម្បីគូរប័ណ្ណប្រកាសនោះ — សារមិនមាំ ដែលបំផ្លាញខ្លួនឯង ដែលកោសិការាងកាយរបស់អ្នកអានវាតែម្តង រួចភ្លេច។"
        accent={MED_BLUE}
      />

      <div className="grid md:grid-cols-2 gap-5" data-testid="mrna-grid">
        {/* Card 1 — The Blueprint, Not the Virus */}
        <ConceptCard
          k={k}
          Icon={Dna}
          enName="The Blueprint, Not the Virus"
          khName="ប្លង់មេ មិនមែនវីរុសទេ"
          enTag="instructions, not the criminal itself"
          khTag="ការណែនាំ មិនមែនឧក្រិដ្ឋជនផ្ទាល់"
          enBody="A traditional vaccine injects a physical 'wanted poster' — a dead or weakened virus your immune system can study. An mRNA vaccine is different: it injects the instructions on how to draw the poster. Your own cells become the artist."
          khBody="វ៉ាក់សាំងបុរាណចាក់ប័ណ្ណប្រកាសឲ្យចាប់ផ្ទាល់ — វីរុសស្លាប់ ឬចុះខ្សោយ ដែលប្រព័ន្ធការពារ​អាចសិក្សា។ វ៉ាក់សាំង mRNA ខុសគ្នា៖ វាចាក់នូវ ការណែនាំ អំពីរបៀបគូរប័ណ្ណប្រកាសនោះ។ កោសិការបស់អ្នកផ្ទាល់ក្លាយជាវិចិត្រករ។"
          accent={MED_BLUE}
          glow
          badge={{ en: "How it works", kh: "របៀបដំណើរការ" }}
        >
          <p
            className={`text-sm sm:text-[15px] text-slate-700 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {k
              ? "mRNA តំណាងឲ្យ messenger RNA — RNA ផ្ញើរសារ។ វាចូលក្នុងសាច់ដុំដៃ ហើយផ្តល់ឲ្យកោសិការបស់រាងកាយនូវរូបមន្តបណ្តោះអាសន្នដើម្បីបង្កើតតែ បន្លា (Spike) នៃវីរុស — ដែលគ្មានគ្រោះថ្នាក់ដោយឯកឯង។ កោសិកាឈាមសរសៃពណ៌សរៀនស្គាល់បន្លា ដូច្នេះបើវីរុសពិតបង្ហាញខ្លួន ប្រព័ន្ធការពារបានរួចរាល់ជាស្រេច។"
              : "mRNA stands for messenger RNA. It enters the arm muscle and gives the body's cells a temporary recipe to build just the Spike of the virus — harmless on its own. White blood cells learn to recognise the spike, so if the real virus ever shows up, the immune system is already prepared."}
          </p>

          <RNAStrandSVG k={k} />

          <Callout
            k={k}
            Icon={ShieldCheck}
            labelEn="The safety mechanism"
            labelKh="យន្តការសុវត្ថិភាព"
            enTitle="A self-destructing message that never touches your DNA."
            khTitle="សារបំផ្លាញខ្លួនឯង ដែលមិនប៉ះពាល់ DNA របស់អ្នកឡើយ។"
            enBody="mRNA is fragile by design. Like a message that erases itself, the mRNA dissolves completely within a few days after the instructions are read. It never enters the cell nucleus, and it cannot change your DNA — biologically impossible. Once the recipe has been used, it is simply gone."
            khBody="mRNA គឺមិនមាំដោយចេតនាក្នុងការរចនា។ ដូចជាសារដែលលុបខ្លួនឯង mRNA រលាយទាំងស្រុងក្នុងរយៈពេលប៉ុន្មានថ្ងៃ បន្ទាប់ពីការណែនាំត្រូវបានអាន។ វាមិនដែលចូលក្នុងស្នូលកោសិកា ហើយវាមិនអាចផ្លាស់ប្តូរ DNA របស់អ្នកបាន — មិនអាចទៅរួចតាមជីវសាស្ត្រ។ បន្ទាប់ពីប្រើរូបមន្តរួច វាលែងមាន។"
            accent={MED_BLUE}
          />
        </ConceptCard>

        {/* Card 2 — The 2023 Nobel Prize */}
        <ConceptCard
          k={k}
          Icon={Sparkles}
          enName="The 2023 Nobel Prize"
          khName="ពានរង្វាន់ណូបែលឆ្នាំ ២០២៣"
          enTag="the discovery that saved millions of lives"
          khTag="ការរកឃើញដែលបានសង្គ្រោះជីវិតរាប់លាន"
          enBody="In 2023, the Nobel Prize in Physiology or Medicine was awarded to Dr. Katalin Karikó and Dr. Drew Weissman for the discovery that made every mRNA vaccine possible — the foundation of the COVID-19 vaccines that, by the WHO's count, prevented millions of deaths worldwide in the first two years alone."
          khBody="ក្នុងឆ្នាំ ២០២៣ ពានរង្វាន់ណូបែលផ្នែកសរីរវិទ្យា ឬវេជ្ជសាស្ត្រ ត្រូវបានប្រគល់ឲ្យលោកវេជ្ជបណ្ឌិត Katalin Karikó និងលោកវេជ្ជបណ្ឌិត Drew Weissman សម្រាប់ការរកឃើញដែលធ្វើឲ្យវ៉ាក់សាំង mRNA ទាំងអស់អាចកើតមាន — មូលដ្ឋាននៃវ៉ាក់សាំង COVID-19 ដែល តាមការរាប់របស់ WHO បានទប់ស្កាត់ការស្លាប់រាប់លាននាក់នៅទូទាំងពិភពលោក ត្រឹមតែពីរឆ្នាំដំបូង។"
          accent={MED_BLUE}
          glow
          badge={{ en: "Nobel · 2023", kh: "ណូបែល · ២០២៣" }}
        >
          <Callout
            k={k}
            Icon={Users}
            labelEn="The heroes"
            labelKh="វីរបុរស"
            enTitle="Dr. Katalin Karikó & Dr. Drew Weissman"
            khTitle="វេ. បណ្ឌិត Katalin Karikó និងវេ. បណ្ឌិត Drew Weissman"
            enBody="Karikó, a Hungarian-born biochemist, spent decades being denied grants and demoted at her university because the field thought mRNA was a dead end. She refused to give up. Weissman, an American immunologist, became her partner in 1997. They worked side by side for years before the breakthrough came."
            khBody="Karikó គឺជាអ្នកជីវគីមីកំណើតហុងគ្រី ដែលបានចំណាយពេលរាប់ទសវត្សត្រូវបានបដិសេធជំនួយ និងបានបន្ទាបតំណែងនៅសាកលវិទ្យាល័យរបស់នាង ដោយសារវិស័យនេះគិតថា mRNA គឺជាផ្លូវឌុង។ នាងបដិសេធមិនបោះបង់។ Weissman គឺជាអ្នកប្រព័ន្ធការពាររាងកាយជនជាតិអាមេរិក ដែលបានក្លាយជាដៃគូរបស់នាងក្នុងឆ្នាំ ១៩៩៧។ ពួកគេបានធ្វើការជាមួយគ្នារាប់ឆ្នាំមុនពេលការបំបែកធ្លាយមកដល់។"
            accent={MED_BLUE}
          />
          <div className="mt-3">
            <Callout
              k={k}
              Icon={Sparkles}
              labelEn="The breakthrough"
              labelKh="ការបំបែកធ្លាយ"
              enTitle="They taught the message how to whisper."
              khTitle="ពួកគេបានបង្រៀនសារនោះឲ្យចេះខ្សឹប។"
              enBody="For decades, injecting synthetic mRNA caused massive, deadly inflammation — the immune system attacked the message before it could be read. Karikó and Weissman discovered that swapping one of the chemical 'letters' of the mRNA (uridine for pseudouridine) let the message slip past the immune system's alarms quietly enough to deliver its instructions. That single edit unlocked an entire generation of vaccines and is now being adapted to fight cancer, HIV, and rare genetic diseases."
              khBody="អស់រយៈពេលរាប់ទសវត្ស ការចាក់ mRNA សំយោគបណ្តាលឲ្យកើតការរលាកធំ ហើយដែលបណ្តាលឲ្យស្លាប់ — ប្រព័ន្ធការពារបានវាយប្រហារសារនោះ មុនពេលវាអាចត្រូវបានអាន។ Karikó និង Weissman បានរកឃើញថា ការប្តូរ 'អក្សរ' គីមីមួយនៃ mRNA (uridine ទៅជា pseudouridine) អនុញ្ញាតឲ្យសារនោះឆ្លងកាត់ការប្រកាសអាសន្នរបស់ប្រព័ន្ធការពារដោយស្ងាត់ៗ គ្រប់គ្រាន់ដើម្បីផ្តល់ការណែនាំរបស់វា។ ការកែប្រែតែមួយនោះបានបើកសោជំនាន់វ៉ាក់សាំងទាំងមូល ហើយឥឡូវកំពុងត្រូវបានកែសម្រួលដើម្បីប្រយុទ្ធជាមួយជំងឺមហារីក HIV និងជំងឺតំណពូជដ៏កម្រ។"
              accent={MED_BLUE}
            />
          </div>
        </ConceptCard>
      </div>
    </section>
  );
}

// ─── Sub-section header (smaller, in-section divider) ─────────────────────
function SubSectionHeader({
  k,
  Icon,
  spec,
  en,
  kh,
  enLead,
  khLead,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  spec: string;
  en: string;
  kh: string;
  enLead: string;
  khLead: string;
  accent: string;
}) {
  return (
    <div className="mt-10 mb-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.25em] ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: accent }}
          >
            {k ? `ផ្នែករង · ${spec}` : `Sub-section · ${spec}`}
          </div>
          <h3
            className={`font-bold text-lg sm:text-xl text-slate-900 leading-tight ${k ? "font-khmer" : ""}`}
          >
            {k ? kh : en}
          </h3>
        </div>
      </div>
      <div
        className="rounded-r-md border-l-4 pl-3 py-1"
        style={{ borderColor: accent }}
      >
        <p
          className={`text-sm text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {k ? khLead : enLead}
        </p>
      </div>
    </div>
  );
}

// ─── Tiny RNA-strand SVG decoration (clinical biotech blue) ─────────────────
function RNAStrandSVG({ k }: { k: boolean }) {
  return (
    <div
      className="my-3 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-3"
      role="img"
      aria-label={
        k
          ? "តួរលេខបង្ហាញខ្សែ RNA តែមួយ — នុយក្លេអូទីត ៤៖ A, U, G, C ភ្ជាប់គ្នាដោយឆ្អឹងខ្នង"
          : "Diagram of a single mRNA strand — four nucleotide letters A, U, G, C linked along a sugar–phosphate backbone"
      }
    >
      <svg viewBox="0 0 320 56" className="w-full h-12" aria-hidden="true">
        <defs>
          <linearGradient id="mrnaBackbone" x1="0" x2="1">
            <stop offset="0" stopColor="#0284c7" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {/* Backbone */}
        <path
          d="M 5 28 Q 40 8 80 28 T 160 28 T 240 28 T 315 28"
          stroke="url(#mrnaBackbone)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Nucleotide letters */}
        {[
          { x: 30, l: "A", c: "#0284c7" },
          { x: 70, l: "U", c: "#0ea5e9" },
          { x: 110, l: "G", c: "#0284c7" },
          { x: 150, l: "C", c: "#0ea5e9" },
          { x: 190, l: "A", c: "#0284c7" },
          { x: 230, l: "U", c: "#0ea5e9" },
          { x: 270, l: "G", c: "#0284c7" },
          { x: 305, l: "…", c: "#94a3b8" },
        ].map((n) => (
          <g key={n.x}>
            <circle cx={n.x} cy="28" r="9" fill="white" stroke={n.c} strokeWidth="1.5" />
            <text
              x={n.x}
              y="32"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              fill={n.c}
            >
              {n.l}
            </text>
          </g>
        ))}
        {/* Backbone label */}
        <text x="160" y="52" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#0c4a6e">
          {k ? "ខ្សែ mRNA — ការណែនាំសម្រាប់សាងបន្លាមួយ" : "mRNA strand — instructions for one Spike protein"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01b — The Science of Soap: Microscopic Crowbars
//                វិទ្យាសាស្ត្រនៃសាប៊ូ៖ ដងគាស់មីក្រូទស្សន៍
// ════════════════════════════════════════════════════════════════════════════

const AQUA = "#0ea5e9";       // soft aquatic blue
const AQUA_DEEP = "#0c4a6e";  // deep ocean
const AQUA_FOAM = "#e0f7fa";  // foam white
const GREASE = "#fbbf24";     // grease / lipid yellow
const GREASE_DEEP = "#b45309";

// Tiny pin-shaped soap molecule SVG used everywhere in this section.
function SoapMoleculePin({
  size = 60,
  showLabels = false,
  k = false,
}: { size?: number; showLabels?: boolean; k?: boolean }) {
  const w = showLabels ? size * 3.2 : size * 2.6;
  const h = size;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible">
      {/* Hydrophilic head (loves water) */}
      <circle cx={size / 2} cy={h / 2} r={size / 2.2} fill={AQUA} stroke={AQUA_DEEP} strokeWidth="1.5" />
      <circle cx={size / 2 - 4} cy={h / 2 - 4} r={size / 8} fill="#bae6fd" opacity="0.9" />
      {/* Lipophilic tail (loves fat) — zig-zag */}
      <polyline
        points={[
          [size, h / 2],
          [size + 14, h / 2 - 8],
          [size + 28, h / 2 + 8],
          [size + 42, h / 2 - 8],
          [size + 56, h / 2 + 8],
          [size + 70, h / 2 - 8],
          [size + 84, h / 2 + 8],
        ]
          .map((p) => p.join(","))
          .join(" ")}
        fill="none"
        stroke={GREASE_DEEP}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showLabels && (
        <>
          <text x={size / 2} y={h - 4} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={AQUA_DEEP}>
            {k ? "ក្បាល" : "HEAD"}
          </text>
          <text x={size + 50} y={h - 4} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={GREASE_DEEP}>
            {k ? "កន្ទុយ" : "TAIL"}
          </text>
        </>
      )}
    </svg>
  );
}

// Step 1 visual — a virus / "grease ball" with a fatty envelope, water beading off
function GreaseBallSVG({ k }: { k: boolean }) {
  return (
    <svg viewBox="0 0 240 200" className="w-full h-auto max-w-[260px]" aria-hidden>
      {/* Water droplet beading off (oil & water don't mix) */}
      <g>
        <ellipse cx="40" cy="50" rx="14" ry="18" fill={AQUA} opacity="0.85" />
        <ellipse cx="36" cy="44" rx="4" ry="6" fill="#e0f2fe" opacity="0.8" />
        <text x="40" y="86" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={AQUA_DEEP}>
          {k ? "ទឹក" : "H₂O"}
        </text>
        <path d="M 50 60 Q 80 70 100 90" stroke={AQUA} strokeWidth="2" fill="none" strokeDasharray="3 3" />
        <text x="78" y="68" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={AQUA_DEEP}>
          {k ? "រំអិល" : "slips"}
        </text>
      </g>

      {/* Virus with lipid envelope */}
      <g transform="translate(160 110)">
        {/* fatty envelope (yellow ring) */}
        <circle cx="0" cy="0" r="55" fill={GREASE} opacity="0.35" stroke={GREASE_DEEP} strokeWidth="2" strokeDasharray="4 3" />
        {/* spike proteins */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = Math.cos(a) * 52, y1 = Math.sin(a) * 52;
          const x2 = Math.cos(a) * 64, y2 = Math.sin(a) * 64;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={GREASE_DEEP} strokeWidth="2" />
              <circle cx={x2} cy={y2} r="3.5" fill={GREASE_DEEP} />
            </g>
          );
        })}
        {/* RNA core */}
        <circle cx="0" cy="0" r="22" fill="#7f1d1d" />
        <path d="M -14 0 Q -7 -10 0 0 T 14 0" stroke="#fde68a" strokeWidth="2" fill="none" />
        <text x="0" y="3" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fde68a">RNA</text>
      </g>

      {/* Label */}
      <text x="160" y="195" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GREASE_DEEP}>
        {k ? "មេរោគ + ស្រោមខ្លាញ់" : "virus + lipid envelope"}
      </text>
    </svg>
  );
}

// Step 3 visual — soap molecules drilling into the lipid envelope, tearing it open
function DestructionSVG({ k }: { k: boolean }) {
  // 6 soap pins arranged around a broken envelope, tails stabbing inward
  const pins = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { angle: (a * 180) / Math.PI, x: 130 + Math.cos(a) * 90, y: 110 + Math.sin(a) * 90 };
  });
  return (
    <svg viewBox="0 0 260 220" className="w-full h-auto max-w-[280px]" aria-hidden>
      {/* Broken / fragmented envelope */}
      <g transform="translate(130 110)">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <path
            key={i}
            d="M -30 0 A 30 30 0 0 1 -10 -28 L -8 -22 A 24 24 0 0 0 -24 0 Z"
            fill={GREASE}
            opacity="0.55"
            stroke={GREASE_DEEP}
            strokeWidth="1.5"
            transform={`rotate(${deg + i * 8}) translate(${4 + i} ${i * 2})`}
          />
        ))}
        {/* Spilled RNA fragments */}
        {[
          [-6, -12], [10, -2], [-2, 14], [-18, 4], [16, 12],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#7f1d1d" />
        ))}
      </g>

      {/* Soap molecules drilling in */}
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.angle + 180})`}>
          {/* head */}
          <circle cx="0" cy="0" r="9" fill={AQUA} stroke={AQUA_DEEP} strokeWidth="1.2" />
          {/* tail pointing inward */}
          <polyline
            points="9,0 16,-4 22,4 28,-4 34,4 40,-4 46,4"
            fill="none"
            stroke={GREASE_DEEP}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Label */}
      <text x="130" y="210" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={AQUA_DEEP}>
        {k ? "កន្ទុយចាក់ → ស្រោមបែក" : "tails stab → envelope shatters"}
      </text>
    </svg>
  );
}

function SectionSoap({ k, t }: { k: boolean; t: T }) {
  return (
    <section
      id="soap"
      className="rounded-3xl p-6 sm:p-8 mb-10 border-2 shadow-sm relative overflow-hidden"
      style={{
        borderColor: `${AQUA}55`,
        backgroundImage: `
          radial-gradient(circle at 12% 10%, ${AQUA}22, transparent 55%),
          radial-gradient(circle at 88% 90%, ${AQUA_FOAM}, transparent 60%),
          linear-gradient(180deg, #f0f9ff 0%, #ffffff 60%, ${AQUA_FOAM} 100%)
        `,
      }}
      data-testid="section-soap"
    >
      {/* Bubble decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {[
          { l: "82%", t: "12%", s: 28 },
          { l: "8%", t: "78%", s: 20 },
          { l: "92%", t: "60%", s: 14 },
          { l: "18%", t: "42%", s: 10 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.l, top: b.t, width: b.s, height: b.s,
              background: `radial-gradient(circle at 30% 30%, #ffffff, ${AQUA_FOAM})`,
              border: `1px solid ${AQUA}33`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        <SectionHeader
          spec="01b"
          en="The Science of Soap: Microscopic Crowbars"
          kh="វិទ្យាសាស្ត្រនៃសាប៊ូ៖ ដងគាស់មីក្រូទស្សន៍"
          k={k}
          Icon={Hand}
          accent={AQUA}
        />

        <p className={`text-sm text-slate-700 mb-6 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Of all the public-health tools ever invented, the cheapest and most powerful is a 100-riel bar of soap. To understand why, we have to zoom in on the virus itself, and discover that soap doesn't 'wash' it away — it physically tears it apart.",
            "ក្នុងចំណោមឧបករណ៍សុខភាពសាធារណៈទាំងអស់ដែលធ្លាប់បានបង្កើតមក របស់ដែលថោកបំផុត និងមានឥទ្ធិពលបំផុត គឺសាប៊ូដុំ ១០០ រៀល។ ដើម្បីយល់ពីហេតុផល យើងត្រូវពង្រីកមើលមេរោគដោយខ្លួនឯង ហើយរកឃើញថា សាប៊ូមិនមែនត្រឹមតែ «លាងជម្រះ» វាចោលនោះទេ — តាមពិតវាហែកវាដាច់ដោយរូបវន្ត។"
          )}
        </p>

        {/* ── Step 1: The Grease Ball ─────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest rounded-full px-2.5 py-0.5 text-white" style={{ backgroundColor: GREASE_DEEP }}>
              STEP 01
            </span>
            <h3 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("The Grease Ball", "ដុំខ្លាញ់")}
            </h3>
          </div>

          <div
            className="rounded-2xl bg-white border-2 p-5 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-5 items-center"
            style={{ borderColor: `${GREASE_DEEP}33` }}
          >
            <div className="flex justify-center">
              <GreaseBallSVG k={k} />
            </div>
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: GREASE_DEEP }}>
                {t("The hidden chemistry", "គីមីវិទ្យាដែលលាក់")}
              </div>
              <h4 className={`font-bold text-base sm:text-lg mb-2 ${k ? "font-khmer leading-snug" : "leading-tight"}`} style={{ color: SLATE }}>
                {t(
                  "Many viruses (flu, COVID-19) and bacteria are wrapped in fat.",
                  "មេរោគជាច្រើន (ផ្តាសាយ COVID-19) និងបាក់តេរីត្រូវបានរុំដោយខ្លាញ់។"
                )}
              </h4>
              <p className={`text-sm text-slate-700 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "On the outside of every flu and coronavirus particle there is a thin shell of fat called a lipid envelope. It carries the spike proteins the virus uses to attack your cells. Without that fatty shell, the virus is helpless.",
                  "នៅលើផ្ទៃខាងក្រៅនៃរាល់ភាគល្អិតផ្តាសាយ និងកូរ៉ូណាវីរុស មានសំបកស្តើងនៃខ្លាញ់ហៅថា ស្រោមលីពីត។ វាផ្ទុកប្រូតេអ៊ីនរាងបន្លាដែលមេរោគប្រើដើម្បីវាយប្រហារកោសិការបស់អ្នក។ បើគ្មានសំបកខ្លាញ់នោះទេ មេរោគគ្មានកម្លាំងឡើយ។"
                )}
              </p>
              <div
                className="rounded-xl p-3 border-l-4 flex items-start gap-2"
                style={{ borderLeftColor: AQUA, backgroundColor: `${AQUA}10` }}
              >
                <Droplet className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: AQUA_DEEP }} />
                <p className={`text-xs sm:text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  <strong className={k ? "" : "font-bold"}>
                    {t("Rule of chemistry: ", "ច្បាប់គីមីវិទ្យា ៖ ")}
                  </strong>
                  {t(
                    "oil and water do not mix. Plain water just slides right over the viral fat without damaging it — that is why rinsing with water alone is not enough.",
                    "ប្រេង និងទឹក មិនលាយចូលគ្នាទេ។ ទឹកសុទ្ធគ្រាន់តែរំអិលលើខ្លាញ់របស់មេរោគដោយមិនធ្វើឱ្យខូចវា — នេះហើយជាហេតុដែលការលាងដោយទឹកតែឯងគឺមិនគ្រប់គ្រាន់ទេ។"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Step 2: What is a Surfactant? ──────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest rounded-full px-2.5 py-0.5 text-white" style={{ backgroundColor: AQUA }}>
              STEP 02
            </span>
            <h3 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("What is a Surfactant?", "តើអ្វីទៅជាសារធាតុសាប៊ូ?")}
            </h3>
          </div>

          <div
            className="rounded-2xl bg-white border-2 p-5"
            style={{ borderColor: `${AQUA}55` }}
          >
            <p className={`text-sm text-slate-700 mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A soap molecule is a 'surfactant' — a tiny pin-shaped object with two completely opposite ends. That double personality is the entire secret.",
                "ម៉ូលេគុលសាប៊ូ គឺជា «សារធាតុសាប៊ូ» — វត្ថុតូចមួយរាងម្ជុលដែលមានចុងពីរផ្ទុយគ្នាទាំងស្រុង។ បុគ្គលិកលក្ខណៈពីរនោះ គឺជាអាថ៌កំបាំងទាំងមូល។"
              )}
            </p>

            {/* Big labelled pin */}
            <div
              className="rounded-2xl p-4 mb-4 flex items-center justify-center"
              style={{ backgroundColor: AQUA_FOAM, border: `1px dashed ${AQUA}55` }}
            >
              <SoapMoleculePin size={70} showLabels k={k} />
            </div>

            {/* Two-end legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: AQUA, backgroundColor: `${AQUA}10` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: AQUA }} />
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: AQUA_DEEP }}>
                    {t("Hydrophilic head", "ក្បាលចូលចិត្តទឹក")}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "This round end loves water. It bonds to H₂O molecules instantly — that is the end you can rinse away under the tap.",
                    "ចុងមូលនេះចូលចិត្តទឹក។ វាភ្ជាប់ទៅនឹងម៉ូលេគុល H₂O ភ្លាមៗ — នេះគឺជាចុងដែលអ្នកអាចលាងជម្រះចេញនៅក្រោមមាត់ទឹក។"
                  )}
                </p>
              </div>
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: GREASE_DEEP, backgroundColor: `${GREASE}20` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <svg width="22" height="10" className="flex-shrink-0">
                    <polyline points="0,5 5,1 10,9 15,1 20,9" fill="none" stroke={GREASE_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: GREASE_DEEP }}>
                    {t("Lipophilic tail", "កន្ទុយចូលចិត្តខ្លាញ់")}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "This zig-zag end hates water but loves fat and oil. It will burrow into any greasy surface it can find — including the lipid envelope of a virus.",
                    "ចុងហ្ស៊ីកហ្ស៊ែកនេះស្អប់ទឹក ប៉ុន្តែចូលចិត្តខ្លាញ់ និងប្រេង។ វានឹងជីកចូលក្នុងផ្ទៃខ្លាញ់ណាមួយដែលវារកឃើញ — រួមទាំងស្រោមលីពីតរបស់មេរោគផងដែរ។"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Step 3: The Destruction ────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest rounded-full px-2.5 py-0.5 text-white" style={{ backgroundColor: AQUA_DEEP }}>
              STEP 03
            </span>
            <h3 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("The Destruction", "ការបំផ្លាញ")}
            </h3>
          </div>

          <div
            className="rounded-2xl bg-white border-2 p-5 grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-5 items-center"
            style={{ borderColor: `${AQUA_DEEP}55` }}
          >
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: AQUA_DEEP }}>
                {t("The mechanical attack", "ការវាយប្រហារតាមរូបវន្ត")}
              </div>
              <h4 className={`font-bold text-base sm:text-lg mb-2 ${k ? "font-khmer leading-snug" : "leading-tight"}`} style={{ color: SLATE }}>
                {t(
                  "Soap molecules act like microscopic crowbars.",
                  "ម៉ូលេគុលសាប៊ូដើរតួដូចជាដងគាស់មីក្រូទស្សន៍។"
                )}
              </h4>
              <p className={`text-sm text-slate-700 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "When you rub your hands with soap, billions of those zig-zag tails stab into the fatty shell of every virus on your skin. They wedge themselves between the fat molecules and pry the envelope apart, like a crowbar opening a sealed crate. The virus is no longer 'sick' — it is structurally destroyed.",
                  "នៅពេលអ្នកដុសដៃជាមួយសាប៊ូ កន្ទុយហ្ស៊ីកហ្ស៊ែករាប់ពាន់លានទាំងនោះចាក់ចូលក្នុងសំបកខ្លាញ់នៃរាល់មេរោគនៅលើស្បែករបស់អ្នក។ ពួកវាជ្រែករវាងម៉ូលេគុលខ្លាញ់ ហើយគាស់ស្រោមនោះឱ្យបែក ដូចជាដងគាស់បើកប្រអប់ដែលបិទជិត។ មេរោគមិនមែន «ឈឺ» ទៀតឡើយ — វាត្រូវបានបំផ្លាញតាមរចនាសម្ព័ន្ធ។"
                )}
              </p>
              <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "Then the hydrophilic heads grab onto the running water, and the dead viral fragments — wrapped up in soap — wash straight down the drain. Twenty seconds of scrubbing is enough.",
                  "បន្ទាប់មក ក្បាលចូលចិត្តទឹកចាប់ផ្ទាល់នឹងទឹកដែលហូរ ហើយបំណែកមេរោគដែលបានស្លាប់ — រុំក្នុងសាប៊ូ — ត្រូវបានលាងជម្រះចូលក្នុងបំពង់លូ។ ការដុសរយៈពេល ២០ វិនាទីគឺគ្រប់គ្រាន់ហើយ។"
                )}
              </p>
            </div>
            <div className="flex justify-center">
              <DestructionSVG k={k} />
            </div>
          </div>
        </div>

        {/* ── Bilingual closing quote ────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 border-l-4 shadow-sm"
          style={{
            borderLeftColor: AQUA_DEEP,
            backgroundImage: `linear-gradient(135deg, ${AQUA_FOAM} 0%, #ffffff 100%)`,
            border: `2px solid ${AQUA}33`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: AQUA_DEEP, color: "#fff" }}
            >
              <ShieldOff className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: AQUA_DEEP }}>
                {t("The big idea", "គំនិតធំ")}
              </div>
              <p className={`text-base sm:text-lg font-bold mb-1 ${k ? "font-khmer leading-snug" : "leading-snug"}`} style={{ color: SLATE }}>
                {t(
                  "Soap doesn't just wash the virus away; it literally tears the virus apart.",
                  "សាប៊ូមិនត្រឹមតែលាងជម្រះមេរោគប៉ុណ្ណោះទេ តាមពិតវាហែកមេរោគឱ្យបែកខ្ទេចតែម្តង។"
                )}
              </p>
              <p className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "That is why a 100-riel bar of soap and twenty seconds of scrubbing is one of the most powerful pieces of medicine ever invented — for the cost of nothing, in any village, anywhere on Earth.",
                  "នេះហើយជាមូលហេតុដែលសាប៊ូដុំ ១០០ រៀល និងការដុស ២០ វិនាទីគឺជាឱសថដ៏មានឥទ្ធិពលបំផុតមួយដែលធ្លាប់បានបង្កើតមក — ដោយចំណាយតែតិចតួច នៅក្នុងភូមិណាមួយ និងគ្រប់ទីកន្លែងលើផែនដី។"
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

// ════════════════════════════════════════════════════════════════════════════
//  Section 02b — The Chemistry of Alcohol
//                គីមីសាស្ត្រនៃគ្រឿងស្រវឹង
//
//  Aesthetic: amber (whiskey/spirits) for the section frame, with rose for
//             the carcinogen/withdrawal warnings and sage for healing/support.
// ════════════════════════════════════════════════════════════════════════════

const ALCOHOL_AMBER = "#b45309";

function NeuroPill({
  k,
  letter,
  enName,
  khName,
  enRole,
  khRole,
  color,
}: {
  k: boolean;
  letter: string;
  enName: string;
  khName: string;
  enRole: string;
  khRole: string;
  color: string;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-3 border"
      style={{ borderColor: `${color}33`, backgroundColor: `${color}0d` }}
      data-testid={`neuro-pill-${letter.toLowerCase()}`}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
        style={{
          backgroundColor: `${color}1f`,
          color,
          border: `1px solid ${color}55`,
        }}
        aria-hidden="true"
      >
        {letter}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`font-bold text-sm leading-tight ${k ? "font-khmer" : ""}`}
          style={{ color: SLATE }}
        >
          {k ? khName : enName}
        </div>
        <div
          className={`text-xs text-slate-700 mt-1 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
        >
          {k ? khRole : enRole}
        </div>
      </div>
    </div>
  );
}

function RiskChip({
  k,
  Icon,
  en,
  kh,
  color,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  color: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-white ${k ? "font-khmer" : ""}`}
      style={{ color, borderColor: `${color}66` }}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {k ? kh : en}
    </span>
  );
}

function SectionAlcoholChemistry({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-alcohol-chemistry">
      <SectionHeader
        spec="02b"
        en="The Chemistry of Alcohol"
        kh="គីមីសាស្ត្រនៃគ្រឿងស្រវឹង"
        k={k}
        Icon={FlaskConical}
        accent={ALCOHOL_AMBER}
      />

      <p
        className={`text-sm text-slate-700 mb-6 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "Alcohol is not simply a drink — it is a tiny, fat-soluble molecule called ethanol that slips straight past the brain's defences and rewires its chemistry. Understanding that chemistry explains both why alcohol feels good in the moment, and why it is now officially classified as a cancer-causing substance in the same category as tobacco.",
          "គ្រឿងស្រវឹងមិនមែនគ្រាន់តែជាភេសជ្ជៈធម្មតាទេ — វាជាម៉ូលេគុលតូចមួយ រលាយក្នុងខ្លាញ់ ហៅថា អេតាណុល (Ethanol) ដែលរអិលកាត់ការការពាររបស់ខួរក្បាលដោយផ្ទាល់ ហើយផ្លាស់ប្ដូរគីមីសាស្ត្ររបស់ខួរ។ ការយល់ដឹងពីគីមីនេះ ពន្យល់ទាំងហេតុដែលគ្រឿងស្រវឹងធ្វើឲ្យសប្បាយក្នុងពេលនោះ និងហេតុដែលឥឡូវនេះវាត្រូវបានចាត់ចូលជាសារធាតុបង្កមហារីក ក្នុងថ្នាក់ដូចគ្នានឹងថ្នាំជក់។"
        )}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {/* ── Card 1 · Hijacking the Brain ─────────────────────────────── */}
        <ConceptCard
          k={k}
          Icon={Brain}
          enName="Hijacking the Brain"
          khName="ការប្លន់យកខួរក្បាល"
          enTag="ethanol crosses the blood-brain barrier"
          khTag="អេតាណុលឆ្លងរបាំងឈាម–ខួរក្បាល"
          enBody="Ethanol is small enough and fatty enough to slip straight through the blood-brain barrier — the wall of cells that normally keeps poisons out of the brain. Once inside, it does not target one neuron at a time. Instead, it tilts the entire balance of two master signalling chemicals that govern thought and movement, while tricking a third into firing a false reward."
          khBody="អេតាណុលតូចគ្រប់គ្រាន់ និងមានជាតិខ្លាញ់គ្រប់គ្រាន់ ដើម្បីរអិលកាត់ត្រង់របាំងឈាម–ខួរក្បាល — ជញ្ជាំងកោសិកាដែលជាធម្មតារក្សាទុកសារធាតុពុលឲ្យនៅក្រៅខួរក្បាល។ ពេលចូលដល់ខាងក្នុងហើយ វាមិនវាយលើកោសិកាប្រសាទម្ដងតែមួយៗទេ។ វាបង្ខិតតុល្យភាពទាំងមូលនៃសារធាតុមេពីរ ដែលគ្រប់គ្រងគំនិត និងចលនា ហើយបោកបញ្ឆោតសារធាតុទីបី ឲ្យបាញ់សញ្ញារង្វាន់មិនពិត។"
          accent={ALCOHOL_AMBER}
          glow
          badge={{ en: "Section 1", kh: "ផ្នែកទី ១" }}
        >
          <div className="grid gap-2.5">
            <NeuroPill
              k={k}
              letter="GABA"
              enName="GABA — The Brakes"
              khName="GABA — សន្ទះហ្វ្រាំង"
              enRole="Alcohol artificially boosts GABA, the brain's main 'slow-down' signal. The result: slurred speech, poor balance, slowed reaction, and lowered inhibitions."
              khRole="គ្រឿងស្រវឹងបង្កើនកម្រិត GABA ដោយសិប្បនិម្មិត ដែលជាសញ្ញា 'បន្ថយល្បឿន' ចម្បងរបស់ខួរក្បាល។ លទ្ធផល៖ និយាយរអាក់រអួល តុល្យភាពអន់ ប្រតិកម្មយឺត និងការទប់ខ្លួនថយចុះ។"
              color={MED_BLUE}
            />
            <NeuroPill
              k={k}
              letter="GLU"
              enName="Glutamate — The Gas Pedal"
              khName="គ្លុយតាម៉ាត — ពេទាល់ម៉ាស៊ីន"
              enRole="At the same time, alcohol suppresses Glutamate, the main 'speed-up' signal. Reaction times slow even further, and the brain stops writing down memories — the famous blackout."
              khRole="ក្នុងពេលដំណាលគ្នានោះ គ្រឿងស្រវឹងទប់ស្កាត់ គ្លុយតាម៉ាត (Glutamate) ដែលជាសញ្ញា 'បង្កើនល្បឿន' ចម្បង។ ប្រតិកម្មកាន់តែយឺតថែមទៀត ហើយខួរក្បាលឈប់សរសេរការចងចាំ — គឺការបាត់ស្មារតីដ៏ល្បី (blackout)។"
              color={MED_BLUE_DEEP}
            />
            <NeuroPill
              k={k}
              letter="DA"
              enName="Dopamine — The False Reward"
              khName="ដូប៉ាមីន — រង្វាន់មិនពិត"
              enRole="Alcohol also triggers a spike of Dopamine, hitting the brain's reward centre. The brain is tricked into thinking that something wonderful just happened — and it remembers, and asks for more."
              khRole="គ្រឿងស្រវឹងក៏បង្ករឲ្យដូប៉ាមីនកើនឡើងផុសផុលដែរ វាយទៅលើមជ្ឈមណ្ឌលរង្វាន់របស់ខួរក្បាល។ ខួរក្បាលត្រូវបានបោកបញ្ឆោតឲ្យគិតថា មានរឿងអស្ចារ្យកើតឡើង — ហើយវាចងចាំ និងសុំបន្ថែម។"
              color={ROSE}
            />
          </div>
        </ConceptCard>

        {/* ── Card 2 · Mechanics of Addiction ──────────────────────────── */}
        <ConceptCard
          k={k}
          Icon={Repeat}
          enName="The Mechanics of Addiction"
          khName="យន្តការនៃការញៀន"
          enTag="neuroadaptation: the brain fights back"
          khTag="នឺរ៉ូអាដាប់តាស្យុង៖ ខួរក្បាលតបវិញ"
          enBody="The brain hates being out of balance — biologists call this homeostasis. If a person drinks heavily and often, the brain quietly rewires itself to push back: it stops producing as much of its own GABA and pumps out extra Glutamate, just to cancel out the alcohol and keep daily life feeling normal."
          khBody="ខួរក្បាលស្អប់ការខ្វះតុល្យភាព — អ្នកជីវវិទ្យាហៅនេះថា ហូមេអូស្តាស៊ីស (homeostasis)។ បើមនុស្សម្នាក់ផឹកច្រើន និងញឹកញាប់ ខួរក្បាលរៀបចំខ្លួនឯងឡើងវិញដោយស្ងប់ស្ងាត់ ដើម្បីប្រឆាំងតប៖ វាឈប់បង្កើត GABA របស់ខ្លួនច្រើនដូចមុន ហើយបូមបន្ថែមគ្លុយតាម៉ាតចេញមក គ្រាន់តែដើម្បីលុបបំបាត់ឥទ្ធិពលគ្រឿងស្រវឹង និងធ្វើឲ្យជីវភាពប្រចាំថ្ងៃហាក់ដូចជាធម្មតាវិញ។"
          accent={ALCOHOL_AMBER}
          badge={{ en: "Section 2", kh: "ផ្នែកទី ២" }}
        >
          <Callout
            k={k}
            Icon={AlertTriangle}
            labelEn="The trap"
            labelKh="អន្ទាក់"
            enTitle="When the alcohol leaves, the imbalance stays."
            khTitle="ពេលគ្រឿងស្រវឹងចេញពីខ្លួន ភាពមិនស្មើនៅសល់។"
            enBody="When the alcohol wears off, the brain is suddenly left with too little GABA and too much Glutamate. The result is severe anxiety, shaking, sweating, racing heart, and physical withdrawal. The person is no longer drinking to feel good — they are drinking just to feel normal again. That is the moment a habit has crossed the line into an addiction."
            khBody="ពេលគ្រឿងស្រវឹងចេញពីខ្លួនអស់ ខួរក្បាលនៅសល់ភ្លាមៗដោយ GABA តិចពេក និងគ្លុយតាម៉ាតច្រើនពេក។ លទ្ធផលគឺការថប់បារម្ភធ្ងន់ធ្ងរ ញ័រ បែកញើស បេះដូងលោតលឿន និងការលាឈប់ផ្នែករាងកាយ។ មនុស្សនោះ មិនបានផឹកដើម្បីអារម្មណ៍ស្រួលទៀតទេ — គេផឹកគ្រាន់តែដើម្បីត្រឡប់ទៅអារម្មណ៍ធម្មតាវិញ។ នោះហើយជាពេលដែលទម្លាប់មួយ បានកាត់ឆ្លងបន្ទាត់ទៅជាការញៀន។"
            accent={ROSE}
          />
        </ConceptCard>

        {/* ── Card 3 · Carcinogen Connection ───────────────────────────── */}
        <ConceptCard
          k={k}
          Icon={Dna}
          enName="The Carcinogen Connection"
          khName="ទំនាក់ទំនងនៃសារជាតិបង្កមហារីក"
          enTag="alcohol is a Group 1 carcinogen"
          khTag="គ្រឿងស្រវឹង ជាសារធាតុបង្កមហារីកថ្នាក់ទី ១"
          enBody="The IARC — the World Health Organization's cancer agency — classifies alcoholic beverages as a Group 1 carcinogen, the highest category of certainty, the same category as tobacco smoke and asbestos. The damage is not done by the ethanol itself, but by what the liver turns it into."
          khBody="IARC — ទីភ្នាក់ងារស្រាវជ្រាវមហារីករបស់អង្គការសុខភាពពិភពលោក (WHO) — ចាត់ភេសជ្ជៈដែលមានគ្រឿងស្រវឹងជាសារធាតុបង្កមហារីកថ្នាក់ទី ១ ដែលជាថ្នាក់ខ្ពស់បំផុតនៃភាពច្បាស់ ក្នុងថ្នាក់ដូចគ្នានឹងផ្សែងថ្នាំជក់ និងអាមីយ៉ង់ (asbestos)។ ការខូចខាតមិនមែនបណ្តាលមកពីអេតាណុលដោយខ្លួនវាទេ ប៉ុន្តែបណ្តាលមកពីអ្វីដែលថ្លើមបំប្លែងវាទៅជា។"
          accent={ROSE}
          glow
          badge={{ en: "Section 3", kh: "ផ្នែកទី ៣" }}
        >
          <Callout
            k={k}
            Icon={Skull}
            labelEn="The biology"
            labelKh="ជីវវិទ្យា"
            enTitle="Acetaldehyde damages DNA — and DNA repair is where cancer begins."
            khTitle="អាសេតាល់ដេអ៊ីត (Acetaldehyde) បំផ្លាញ DNA — ហើយការជួសជុល DNA គឺជាកន្លែងមហារីកចាប់ផ្តើម។"
            enBody="When the liver breaks ethanol down, the first product is Acetaldehyde — a highly toxic chemical that physically damages the strands of DNA inside cells. To survive that damage, cells have to divide more often to replace what was lost. Every cell division is a fresh chance for a copying mistake — a mutation. Stack up enough mutations in the wrong place, and a healthy cell can become a cancer cell. This is why alcohol is linked to cancers of the mouth, throat, oesophagus, liver, breast, and colon."
            khBody="ពេលថ្លើមបំបែកអេតាណុល ផលិតផលដំបូងគឺ អាសេតាល់ដេអ៊ីត (Acetaldehyde) — សារធាតុពុលខ្លាំង ដែលបំផ្លាញខ្សែ DNA នៅក្នុងកោសិកាដោយផ្ទាល់។ ដើម្បីរស់ពីការខូចនោះ កោសិកាត្រូវបែងចែកញឹកញាប់ជាងមុន ដើម្បីជំនួសអ្វីដែលបានបាត់បង់។ រាល់ការបែងចែកកោសិកា គឺជាឱកាសថ្មីសម្រាប់កំហុសក្នុងការចម្លង — គឺការផ្លាស់ប្ដូរហ្សែន (mutation)។ បើការផ្លាស់ប្ដូរនោះកើនឡើងច្រើនគ្រប់គ្រាន់នៅកន្លែងខុស កោសិកាល្អអាចក្លាយជាកោសិកាមហារីក។ នេះហើយជាមូលហេតុ ដែលគ្រឿងស្រវឹងភ្ជាប់នឹងមហារីកនៃមាត់ បំពង់ក បំពង់អាហារ ថ្លើម សុដន់ និងពោះវៀនធំ។"
            accent={ROSE}
          />
        </ConceptCard>

        {/* ── Card 4 · Risk Factors & Support ──────────────────────────── */}
        <ConceptCard
          k={k}
          Icon={Ribbon}
          enName="Risk Factors & Support"
          khName="កត្តាហានិភ័យ និងការគាំទ្រ"
          enTag="addiction is a chronic medical condition, not a moral failure"
          khTag="ការញៀនជាជំងឺរ៉ាំរ៉ៃ មិនមែនជាការខុសសីលធម៌ទេ"
          enBody="Nobody chooses to become addicted. Some people are far more vulnerable than others — and one of the largest risk factors of all is starting to drink young, before the brain has finished developing in the mid-twenties."
          khBody="គ្មាននរណាម្នាក់ជ្រើសរើសក្លាយជាអ្នកញៀនទេ។ មនុស្សខ្លះងាយរងគ្រោះជាងអ្នកដទៃច្រើន — ហើយកត្តាហានិភ័យធំបំផុតមួយ គឺការចាប់ផ្តើមផឹកតាំងពីក្មេង មុនពេលខួរក្បាលអភិវឌ្ឍន៍រួចរាល់ ដែលទើបបញ្ចប់នៅពាក់កណ្តាលអាយុ ២០។"
          accent={SAGE}
          badge={{ en: "Section 4", kh: "ផ្នែកទី ៤" }}
        >
          <div className="mb-3">
            <div
              className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: SAGE }}
            >
              {t("Main risk factors", "កត្តាហានិភ័យចម្បង")}
            </div>
            <div className="flex flex-wrap gap-2">
              <RiskChip k={k} Icon={Dna}            en="Genetics"              kh="ហ្សែន"                       color={SAGE} />
              <RiskChip k={k} Icon={AlertTriangle} en="Chronic stress"         kh="ការតានតឹងរ៉ាំរ៉ៃ"             color={SAGE} />
              <RiskChip k={k} Icon={Home}          en="Environment"            kh="បរិយាកាសជុំវិញ"                color={SAGE} />
              <RiskChip k={k} Icon={Baby}          en="Drinking before adulthood" kh="ការផឹកតាំងពីមុនពេញវ័យ"   color={SAGE} />
            </div>
          </div>
          <Callout
            k={k}
            Icon={HeartHandshake}
            labelEn="Community support"
            labelKh="ការគាំទ្រសហគមន៍"
            enTitle="Alcoholics Anonymous (AA) · អង្គការអ្នកញៀនស្រាអនាមិក"
            khTitle="អង្គការអ្នកញៀនស្រាអនាមិក · Alcoholics Anonymous (AA)"
            enBody="AA is a worldwide community of people who help one another stay sober through total abstinence and shared honesty. It treats addiction the way medicine itself now treats it — as a chronic medical condition that the brain can slowly heal from when its chemicals are given the time and stillness to rebalance, supported by people who have walked the same path."
            khBody="AA គឺជាសហគមន៍ពិភពលោកនៃមនុស្ស ដែលជួយគ្នាទៅវិញទៅមកឲ្យនៅឆ្ងាយពីគ្រឿងស្រវឹង តាមរយៈការបោះបង់ទាំងស្រុង និងភាពស្មោះត្រង់រួមគ្នា។ វាចាត់ទុកការញៀន តាមរបៀបដូចគ្នានឹងវេជ្ជសាស្ត្រសព្វថ្ងៃនេះ — ជាជំងឺរ៉ាំរ៉ៃមួយ ដែលខួរក្បាលអាចជាសះស្បើយបន្តិចម្តងៗ នៅពេលសារធាតុគីមីរបស់វា ត្រូវបានផ្ដល់ពេលវេលា និងភាពស្ងប់ស្ងាត់ ដើម្បីតុល្យភាពឡើងវិញ ដោយមានការគាំទ្រពីមនុស្សដែលធ្លាប់ដើរលើផ្លូវដូចគ្នា។"
            accent={SAGE}
          />
        </ConceptCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SEC-05 · Dermatology: Protecting Our Largest Organ
//          រោគសើស្បែក៖ ការការពារសរីរាង្គដ៏ធំបំផុតរបស់យើង
//
//  1. The Invisible Fire — UVA / UVB / Melanin / Sunburn
//  2. The Daily Shield   — SPF / sunscreen even on cloudy days
//  3. Warning Signs      — Skin cancer (Melanoma) + ABCDE guide
//
//  Aesthetic: clinical · medical blue + warm skin tone + bright sun yellow.
// ════════════════════════════════════════════════════════════════════════════

const DERM_SUN = "#f59e0b";        // bright sun yellow / amber
const DERM_SUN_DEEP = "#b45309";   // burnt amber for headings
const DERM_SUN_SOFT = "#fef3c7";   // pale honey backdrop
const DERM_SKIN = "#f5d0a9";       // warm skin tone
const DERM_SKIN_DEEP = "#9a5b2e";  // deeper skin tone for outlines

function SectionDermatology({ k, t }: { k: boolean; t: T }) {
  return (
    <section id="dermatology" className="mb-12 scroll-mt-20" data-testid="section-dermatology">
      <SectionHeader
        spec="05"
        en="Dermatology: Protecting Our Largest Organ"
        kh="រោគសើស្បែក៖ ការការពារសរីរាង្គដ៏ធំបំផុតរបស់យើង"
        k={k}
        Icon={Sun}
        accent={MED_BLUE}
      />

      <p
        className={`text-sm text-slate-700 mb-6 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "Your skin is the largest organ of your body — about 2 square metres of living tissue that breathes, senses, and shields every cell beneath it. Most days you do not even think about it. But every time you step outside, an invisible fire is falling on it, and the choices you make in the next few minutes decide whether your skin will quietly heal — or quietly accumulate damage that may surface decades later as cancer.",
          "ស្បែករបស់អ្នក គឺជាសរីរាង្គដ៏ធំបំផុតនៅក្នុងរាងកាយរបស់អ្នក — ប្រហែល ២ ម៉ែត្រការ៉េនៃជាលិការស់ ដែលដកដង្ហើម អារម្មណ៍ និងការពារគ្រប់កោសិកានៅក្រោមវា។ ភាគច្រើននៃថ្ងៃ អ្នកមិនបានគិតពីវាសោះ។ ប៉ុន្តែរាល់ពេលដែលអ្នកដើរចេញទៅខាងក្រៅ ភ្លើងមួយដែលមើលមិនឃើញកំពុងធ្លាក់មកលើវា ហើយជម្រើសដែលអ្នកធ្វើនៅប៉ុន្មាននាទីខាងមុខនេះ កំណត់ថាតើស្បែករបស់អ្នកនឹងជាសះស្បើយដោយស្ងៀមស្ងាត់ — ឬប្រមូលផ្តុំការខូចខាតដោយស្ងៀមស្ងាត់ ដែលអាចលេចចេញជាច្រើនទសវត្សក្រោយ ជាជំងឺមហារីក។"
        )}
      </p>

      {/* ─── Sub-section 1 · The Invisible Fire — UV Rays ─────────────────── */}
      <SubSectionHeader
        k={k}
        Icon={Sun}
        spec="05a"
        en="The Invisible Fire — UV Rays"
        kh="ភ្លើងដែលមើលមិនឃើញ — កាំរស្មី UV"
        enLead="The sun feels warm and gentle on your face, but inside that warmth is a kind of light your eyes cannot see and your skin cannot feel — until the damage is already done."
        khLead="ពន្លឺថ្ងៃហាក់ដូចជាកក់ក្តៅ និងស្រាលនៅលើមុខរបស់អ្នក ប៉ុន្តែនៅក្នុងភាពកក់ក្តៅនោះ មានពន្លឺមួយប្រភេទ ដែលភ្នែករបស់អ្នកមើលមិនឃើញ ហើយស្បែករបស់អ្នកមិនអាចមានអារម្មណ៍ — រហូតដល់ការខូចខាតបានកើតឡើងរួចហើយ។"
        accent={DERM_SUN}
      />

      <div className="grid md:grid-cols-2 gap-5" data-testid="uv-grid">
        <ConceptCard
          k={k}
          Icon={Sun}
          enName="UVA — the silent ager"
          khName="UVA — អ្នកធ្វើឲ្យស្បែកចាស់ស្ងាត់ៗ"
          enTag="long wavelength · ages the skin"
          khTag="រលកវែង · ធ្វើឲ្យស្បែកចាស់"
          enBody="UVA rays have the longest wavelength of the dangerous ultraviolet light. They slip deep into the second layer of your skin (the dermis), break down the collagen and elastin that keep skin firm, and slowly print wrinkles and dark spots that you only notice years later. UVA passes straight through window glass and through clouds, which is why it is constantly working on you — even on a cloudy day, even inside a car."
          khBody="កាំរស្មី UVA មានរលកវែងជាងគេបំផុតនៃពន្លឺអ៊ុលត្រាវីយូឡេដែលបង្កគ្រោះថ្នាក់។ ពួកវាជ្រាបចូលយ៉ាងជ្រៅទៅក្នុងស្រទាប់ទីពីរនៃស្បែករបស់អ្នក (Dermis) បំបែកកូឡាហ្សែន និងអេឡាស្ទិន ដែលរក្សាស្បែកឲ្យរឹងមាំ ហើយបោះពុម្ពយឺតៗនូវស្នាមជ្រួញ និងចំណុចខ្មៅ ដែលអ្នកនឹងសង្កេតឃើញតែប៉ុន្មានឆ្នាំក្រោយប៉ុណ្ណោះ។ UVA ឆ្លងកាត់កញ្ចក់បង្អួច និងពពកដោយផ្ទាល់ ដែលជាហេតុដែលធ្វើឲ្យវាធ្វើការលើអ្នកជានិច្ច — សូម្បីតែថ្ងៃមានពពក សូម្បីតែនៅខាងក្នុងឡាន។"
          accent={DERM_SUN}
          glow
          badge={{ en: "Aging", kh: "ការចាស់" }}
        />

        <ConceptCard
          k={k}
          Icon={Flame}
          enName="UVB — the burner"
          khName="UVB — អ្នកដុតស្បែក"
          enTag="short wavelength · burns the skin"
          khTag="រលកខ្លី · ដុតស្បែក"
          enBody="UVB rays carry more energy per ray and are the main cause of sunburn. They strike the top layer of your skin (the epidermis) hard enough to scramble the DNA inside individual skin cells. UVB is strongest between 10am and 4pm, and is the type of UV that most directly causes the mutations that lead to skin cancer."
          khBody="កាំរស្មី UVB មានថាមពលច្រើនជាងក្នុងមួយរលក ហើយជាមូលហេតុចម្បងនៃការរលាកស្បែកដោយសារកម្តៅថ្ងៃ។ ពួកវាបុកស្រទាប់ខាងលើនៃស្បែករបស់អ្នក (Epidermis) ខ្លាំងគ្រប់គ្រាន់ ដើម្បីធ្វើឲ្យ DNA នៅក្នុងកោសិកាស្បែកនីមួយៗច្រឡំ។ UVB ខ្លាំងបំផុតរវាងម៉ោង ១០ ព្រឹក និង ៤ ល្ងាច ហើយជាប្រភេទ UV ដែលបង្ករផ្ទាល់នូវការផ្លាស់ប្តូរហ្សែន ដែលនាំទៅរកជំងឺមហារីកស្បែក។"
          accent="#dc2626"
          glow
          badge={{ en: "Burning", kh: "ការដុត" }}
        />
      </div>

      {/* Tan myth + Sunburn explainer side-by-side */}
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div
          className="rounded-3xl p-5 sm:p-6 border-2 bg-white"
          style={{
            borderColor: `${DERM_SKIN_DEEP}55`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${DERM_SKIN}33 100%)`,
          }}
          data-testid="tan-myth"
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldOff className="w-5 h-5" style={{ color: DERM_SKIN_DEEP }} />
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: DERM_SKIN_DEEP }}
            >
              {t("Myth-buster", "បំបាក់ការយល់ច្រឡំ")}
            </span>
          </div>
          <h4
            className={`font-bold text-base sm:text-lg mb-2 ${k ? "font-khmer" : ""}`}
            style={{ color: SLATE }}
          >
            {t(
              "A “tan” is not a sign of health.",
              "“ការប្រែពណ៌សម្បុរស្បែក” មិនមែនជាសញ្ញានៃសុខភាពល្អទេ។"
            )}
          </h4>
          <p
            className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "A tan (ការប្រែពណ៌សម្បុរស្បែក) is your skin’s emergency defence response. When UV starts hitting your DNA, special cells called melanocytes (មេឡាណូស៊ីត) flood the area with extra dark pigment — Melanin (មេឡានីន) — to try to absorb the radiation before it shreds the genetic code inside your cells. So a tan literally means: “my skin has just been damaged enough that it had to call for backup.” The darker you turn, the more DNA injuries already happened.",
              "ការប្រែពណ៌សម្បុរស្បែក (Tan) គឺជាប្រតិកម្មការពារបន្ទាន់របស់ស្បែករបស់អ្នក។ នៅពេល UV ចាប់ផ្តើមបុក DNA របស់អ្នក កោសិកាពិសេសហៅថា មេឡាណូស៊ីត (Melanocytes) បង្ហូរទឹកថ្នាំខ្មៅបន្ថែម — មេឡានីន (Melanin) — ទៅលើតំបន់នោះ ដើម្បីព្យាយាមស្រូបយកវិទ្យុសកម្ម មុនពេលវាកាត់ផ្តាច់កូដហ្សែននៅក្នុងកោសិការបស់អ្នក។ ដូច្នេះការប្រែពណ៌ស្បែក មានន័យត្រង់ៗថា៖ «ស្បែករបស់ខ្ញុំទើបនឹងត្រូវខូចខាតគ្រប់គ្រាន់ ដែលត្រូវហៅកម្លាំងជំនួយ»។ កាន់តែខ្មៅ ការខូចខាត DNA កាន់តែច្រើនបានកើតឡើងរួចហើយ។"
            )}
          </p>
        </div>

        <div
          className="rounded-3xl p-5 sm:p-6 border-2 bg-white"
          style={{
            borderColor: "#dc262655",
            backgroundImage: "linear-gradient(135deg, #ffffff 0%, #fee2e266 100%)",
          }}
          data-testid="sunburn-explainer"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" style={{ color: "#dc2626" }} />
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: "#dc2626" }}
            >
              {t("Cell-level injury", "ការរបួសកម្រិតកោសិកា")}
            </span>
          </div>
          <h4
            className={`font-bold text-base sm:text-lg mb-2 ${k ? "font-khmer" : ""}`}
            style={{ color: SLATE }}
          >
            {t(
              "Sunburn — when skin cells actually die.",
              "ការរលាកស្បែកដោយសារកម្តៅថ្ងៃ — ពេលកោសិកាស្បែកស្លាប់ពិតៗ។"
            )}
          </h4>
          <p
            className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "A sunburn (ការរលាកស្បែកដោយសារកម្តៅថ្ងៃ) is not just “colour change.” It happens when UV radiation is so intense that the DNA damage is beyond repair, and the skin cells choose to die rather than risk turning cancerous. Your body then rushes blood to the area to clear the dead cells and start healing — that is the redness, the heat, the pain, and the peeling a few days later. Every serious childhood sunburn measurably raises your lifetime risk of skin cancer.",
              "ការរលាកស្បែកដោយសារកម្តៅថ្ងៃ មិនមែនគ្រាន់តែជា «ការប្តូរពណ៌» នោះទេ។ វាកើតឡើងនៅពេលដែលវិទ្យុសកម្ម UV ខ្លាំងពេក ការខូចខាត DNA លើសពីការជួសជុលបាន ហើយកោសិកាស្បែកជ្រើសរើសស្លាប់ ជាជាងប្រថុយក្លាយជាមហារីក។ បន្ទាប់មក រាងកាយរបស់អ្នកប្រញាប់បញ្ជូនឈាមទៅតំបន់នោះ ដើម្បីសម្អាតកោសិកាស្លាប់ និងចាប់ផ្តើមជាសះស្បើយ — នោះគឺជាក្រហម កម្តៅ ការឈឺ និងការលាស់ស្បែកប៉ុន្មានថ្ងៃក្រោយ។ រាល់ការរលាកស្បែកធ្ងន់ធ្ងរនៅវ័យកុមារ បង្កើនហានិភ័យពេញមួយជីវិតរបស់អ្នកចំពោះជំងឺមហារីកស្បែក។"
            )}
          </p>
        </div>
      </div>

      {/* ─── Sub-section 2 · The Daily Shield — Sunscreen ─────────────────── */}
      <SubSectionHeader
        k={k}
        Icon={Umbrella}
        spec="05b"
        en="The Daily Shield — Sunscreen"
        kh="ខែលការពារប្រចាំថ្ងៃ — ឡេការពារកម្តៅថ្ងៃ"
        enLead="Sunscreen is not a beach product. It is a daily piece of medical equipment as basic as soap or a toothbrush — a thin coat of cream that bounces the invisible fire off your skin before it can reach your DNA."
        khLead="ឡេការពារកម្តៅថ្ងៃ មិនមែនជាផលិតផលឆ្នេរសមុទ្រទេ។ វាគឺជាឧបករណ៍វេជ្ជសាស្ត្រប្រចាំថ្ងៃ ដ៏សាមញ្ញដូចជាសាប៊ូ ឬច្រាសដុសធ្មេញ — ស្រទាប់ឡេស្តើមួយដែលច្រានវាយភ្លើងមើលមិនឃើញចេញពីស្បែករបស់អ្នក មុនពេលវាអាចទៅដល់ DNA របស់អ្នក។"
        accent={MED_BLUE}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <ConceptCard
          k={k}
          Icon={ShieldCheck}
          enName="What SPF actually means"
          khName="អត្ថន័យពិតរបស់ SPF"
          enTag="Sun Protection Factor · កត្តាការពារកម្តៅថ្ងៃ"
          khTag="Sun Protection Factor · កត្តាការពារកម្តៅថ្ងៃ"
          enBody="SPF (Sun Protection Factor / កត្តាការពារកម្តៅថ្ងៃ) is a measure of how much longer your skin can stay in the sun before it starts to burn, compared to wearing nothing. SPF 30 lets through about 1/30 of the burning UVB — roughly 97% blocked. SPF 50 blocks about 98%. There is no such thing as a sunscreen that blocks 100%, so reapply every two hours, and after sweating or swimming."
          khBody="SPF (Sun Protection Factor / កត្តាការពារកម្តៅថ្ងៃ) គឺជាការវាស់វែងថា ស្បែករបស់អ្នកអាចនៅក្រោមកម្តៅថ្ងៃបានយូរប៉ុណ្ណា មុនពេលចាប់ផ្តើមដុត ធៀបនឹងការមិនលាបអ្វីសោះ។ SPF ៣០ អនុញ្ញាតឲ្យឆ្លងកាត់ប្រហែល ១/៣០ នៃ UVB ដែលដុត — ប្រហែល ៩៧% ត្រូវបានរារាំង។ SPF ៥០ រារាំងបានប្រហែល ៩៨%។ មិនមានឡេការពារកម្តៅថ្ងៃណាមួយរារាំងបាន ១០០% ទេ ដូច្នេះត្រូវលាបឡើងវិញរៀងរាល់ ២ ម៉ោង និងបន្ទាប់ពីបែកញើស ឬហែលទឹក។"
          accent={MED_BLUE}
          glow
        >
          {/* Visual: SPF protection bars */}
          <div
            className="rounded-2xl border p-3 bg-white"
            style={{ borderColor: `${MED_BLUE}33` }}
            role="img"
            aria-label={
              k
                ? "ក្រាហ្វិកបង្ហាញ SPF ១៥ ៣០ និង ៥០ រារាំង UVB"
                : "Bar graphic comparing UVB blocked by SPF 15, SPF 30 and SPF 50"
            }
            data-testid="spf-bars"
          >
            {[
              { label: "SPF 15", pct: 93 },
              { label: "SPF 30", pct: 97 },
              { label: "SPF 50", pct: 98 },
            ].map((row) => (
              <div key={row.label} className="mb-2 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-[11px] font-mono font-semibold"
                    style={{ color: MED_BLUE_DEEP }}
                  >
                    {row.label}
                  </span>
                  <span className="text-[11px] font-mono text-slate-700">
                    {row.pct}% {t("UVB blocked", "UVB ត្រូវបានរារាំង")}
                  </span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${row.pct}%`,
                      backgroundImage: `linear-gradient(90deg, ${MED_BLUE_LIGHT}, ${MED_BLUE})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ConceptCard>

        <ConceptCard
          k={k}
          Icon={CloudRain}
          enName="Cloudy days are not safe days"
          khName="ថ្ងៃមានពពក មិនមែនជាថ្ងៃសុវត្ថិភាពទេ"
          enTag="UV passes through clouds"
          khTag="UV ឆ្លងកាត់ពពក"
          enBody="On a fully overcast day, up to 80% of the UV still reaches the ground — you just cannot feel the warmth, so you do not realise you are being burned. Sunscreen should be worn every single day you are outside for any length of time, even when it is grey, even in the rainy season, even on the way to school. The damage is cumulative: a tiny bit every day for ten years adds up to far more than a single beach holiday."
          khBody="នៅថ្ងៃដែលពពកស្តុកស្តម្ភទាំងស្រុង រហូតដល់ ៨០% នៃ UV នៅតែទៅដល់ដី — អ្នកគ្រាន់តែមិនមានអារម្មណ៍កក់ក្តៅប៉ុណ្ណោះ ដូច្នេះអ្នកមិនដឹងថាអ្នកកំពុងត្រូវដុត។ ឡេការពារកម្តៅថ្ងៃ គួរត្រូវបានលាបរាល់ថ្ងៃ ដែលអ្នកនៅខាងក្រៅរយៈពេលណាមួយ សូម្បីពេលមេឃងងឹត សូម្បីតែរដូវវស្សា សូម្បីតែតាមផ្លូវទៅសាលា។ ការខូចខាតគឺប្រមូលផ្តុំ៖ បន្តិចបន្តួចជារៀងរាល់ថ្ងៃអស់រយៈពេល ១០ ឆ្នាំ ប្រមូលផ្តុំច្រើនជាងវិស្សមកាលឆ្នេរសមុទ្រតែមួយលើក។"
          accent={MED_BLUE}
        >
          <Callout
            k={k}
            Icon={Sun}
            labelEn="Daily habit"
            labelKh="ទម្លាប់ប្រចាំថ្ងៃ"
            enTitle="A teaspoon for the face, a shot-glass for the body."
            khTitle="មួយស្លាបព្រាកាហ្វេសម្រាប់មុខ មួយកែវតូចសម្រាប់រាងកាយ។"
            enBody="Most people use far too little sunscreen — about a quarter of what is needed — which means an SPF 30 in real life only protects like an SPF 7 or 8. Aim for about a teaspoon (5 ml) for your face, ears and neck, and roughly a shot-glass (30 ml) to cover the rest of your body. Apply 15 minutes before going out, and again every two hours."
            khBody="មនុស្សភាគច្រើនប្រើឡេការពារកម្តៅថ្ងៃតិចពេក — ប្រហែលមួយភាគបួននៃអ្វីដែលត្រូវការ — ដែលមានន័យថា SPF ៣០ ក្នុងជីវិតពិត ការពារបានត្រឹមតែដូច SPF ៧ ឬ ៨។ គោលដៅប្រហែលមួយស្លាបព្រាកាហ្វេ (៥ មីលីលីត្រ) សម្រាប់មុខ ត្រចៀក និងករ ហើយប្រហែលមួយកែវតូច (៣០ មីលីលីត្រ) គ្របដណ្តប់ផ្នែកដែលនៅសល់នៃរាងកាយ។ លាបមុនចេញខាងក្រៅ ១៥ នាទី ហើយលាបឡើងវិញរៀងរាល់ ២ ម៉ោង។"
            accent={MED_BLUE}
          />
        </ConceptCard>
      </div>

      {/* ─── Sub-section 3 · Warning Signs — Skin Cancer ──────────────────── */}
      <SubSectionHeader
        k={k}
        Icon={Microscope}
        spec="05c"
        en="The Warning Signs — Skin Cancer"
        kh="សញ្ញាព្រមាន — ជំងឺមហារីកស្បែក"
        enLead="Repeated UV damage to skin DNA can cause cells to multiply out of control. The most dangerous form is Melanoma — but caught early, it is one of the most curable cancers. The trick is knowing what to look for, and looking once a month."
        khLead="ការខូចខាត DNA ស្បែកដោយ UV ម្តងហើយម្តងទៀត អាចបណ្តាលឲ្យកោសិកាបង្កើតផលដោយឥតគ្រប់គ្រង។ ទម្រង់គ្រោះថ្នាក់បំផុតគឺ មេឡាណូម៉ា (Melanoma) — ប៉ុន្តែបើរកឃើញដំបូង វាជាជំងឺមហារីកមួយដែលអាចព្យាបាលបានច្រើនជាងគេ។ ល្បិចគឺត្រូវដឹងថាមើលរកអ្វី ហើយមើលម្តងក្នុងមួយខែ។"
        accent={ROSE}
      />

      <ConceptCard
        k={k}
        Icon={Microscope}
        enName="Melanoma — when pigment cells turn cancerous"
        khName="មេឡាណូម៉ា — ពេលកោសិកាមេឡានីនក្លាយជាមហារីក"
        enTag="serious · highly curable when caught early"
        khTag="ធ្ងន់ធ្ងរ · ព្យាបាលបានល្អ ពេលរកឃើញដំបូង"
        enBody="When the same melanocytes (មេឡាណូស៊ីត) that protect you with melanin are themselves damaged again and again by UV, their own DNA can mutate. They can lose the brakes that tell them when to stop dividing — and a small dark spot becomes a tumour that can spread to the rest of the body. Once a month, in good light, look at every mole on your skin (back, scalp, soles of feet, between toes — everywhere) and ask the ABCDE questions below. If a mole answers “yes” to any of them, see a doctor."
        khBody="នៅពេលកោសិកាមេឡាណូស៊ីត (Melanocytes) ដូចគ្នា ដែលការពារអ្នកដោយមេឡានីន ត្រូវខូចខាតដោយ UV ម្តងហើយម្តងទៀត DNA របស់ពួកវាខ្លួនឯងអាចផ្លាស់ប្តូរ។ ពួកវាអាចបាត់បង់ឆ្នុកដែលប្រាប់ពួកវាថា ពេលណាត្រូវបញ្ឈប់ការបែងចែកកោសិកា — ហើយចំណុចខ្មៅតូចមួយ ក្លាយជាដុំសាច់ដែលអាចរាលដាលទៅផ្នែកដទៃនៃរាងកាយ។ ម្តងក្នុងមួយខែ ក្រោមពន្លឺល្អ មើលរាល់ប្រជ្រុយនៅលើស្បែករបស់អ្នក (ខ្នង ស្បែកក្បាល បាតជើង ចន្លោះម្រាមជើង — គ្រប់ទីកន្លែង) ហើយសួរសំណួរ ABCDE ខាងក្រោម។ បើប្រជ្រុយណាមួយឆ្លើយ «បាទ/ចាស» ចំពោះសំណួរណាមួយ សូមទៅជួបពេទ្យ។"
        accent={ROSE}
        glow
        badge={{ en: "Self-check monthly", kh: "ពិនិត្យខ្លួនឯងប្រចាំខែ" }}
      >
        {/* ABCDE guide — five colour-coded letter cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-2"
          data-testid="abcde-grid"
        >
          {[
            {
              letter: "A",
              accent: "#0284c7",
              en: "Asymmetry",
              kh: "ភាពមិនស៊ីមេទ្រី",
              enBody: "One half of the mole does not match the other half. A normal mole is roughly symmetric — fold it in half mentally and the two sides should look the same.",
              khBody: "ពាក់កណ្តាលមួយនៃប្រជ្រុយ មិនដូចពាក់កណ្តាលម្ខាងទេ។ ប្រជ្រុយធម្មតាមានភាពស៊ីមេទ្រី — ប្រសិនបើបត់វាជាពីរក្នុងគំនិត ផ្នែកទាំងពីរគួរតែមើលទៅដូចគ្នា។",
              svg: (
                <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
                  <path d="M 30 8 Q 12 18 14 36 Q 22 56 36 50 Q 54 42 50 26 Q 46 14 30 8 Z" fill="#1e293b" />
                  <line x1="30" y1="4" x2="30" y2="56" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              ),
            },
            {
              letter: "B",
              accent: "#15803d",
              en: "Border",
              kh: "គែម",
              enBody: "The edges are irregular, ragged, notched, or blurred — not a clean smooth circle. Healthy moles have a clear, even border.",
              khBody: "គែមមានភាពមិនទៀងទាត់ រឆេតរឆូត ចូលក្នុង ឬព្រិលៗ — មិនមែនជារង្វង់រលោងស្អាតទេ។ ប្រជ្រុយដែលមានសុខភាពល្អ មានគែមច្បាស់ និងស្មើ។",
              svg: (
                <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
                  <path d="M 30 10 Q 14 12 12 26 Q 6 36 18 44 Q 24 56 36 52 Q 52 50 50 36 Q 56 24 44 18 Q 40 8 30 10 Z" fill="#1e293b" />
                </svg>
              ),
            },
            {
              letter: "C",
              accent: "#b45309",
              en: "Color",
              kh: "ពណ៌",
              enBody: "The colour is not the same all over — different shades of brown, black, sometimes patches of red, white, or blue. A safe mole is one even colour.",
              khBody: "ពណ៌មិនដូចគ្នាទាំងអស់ទេ — មានស្រមោលត្នោត ខ្មៅខុសៗគ្នា ពេលខ្លះមានចំណុចក្រហម ស ឬខៀវ។ ប្រជ្រុយសុវត្ថិភាព មានពណ៌ស្មើតែមួយ។",
              svg: (
                <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
                  <defs>
                    <radialGradient id="abcdeC" cx="40%" cy="35%">
                      <stop offset="0" stopColor="#b45309" />
                      <stop offset="0.55" stopColor="#1e293b" />
                      <stop offset="1" stopColor="#7f1d1d" />
                    </radialGradient>
                  </defs>
                  <circle cx="30" cy="30" r="20" fill="url(#abcdeC)" />
                </svg>
              ),
            },
            {
              letter: "D",
              accent: "#9333ea",
              en: "Diameter",
              kh: "អង្កត់ផ្ចិត",
              enBody: "Larger than 6 millimetres — about the width of a pencil eraser. Most melanomas are bigger than this when found, but smaller spots can also be cancerous, so use this as a guide, not a hard rule.",
              khBody: "ធំជាង ៦ មីលីម៉ែត្រ — ប្រហែលទទឹងនៃជ័រលុប។ មេឡាណូម៉ាភាគច្រើនធំជាងនេះពេលរកឃើញ ប៉ុន្តែចំណុចតូចជាងក៏អាចជាមហារីកដែរ ដូច្នេះប្រើនេះជាការណែនាំ មិនមែនជាច្បាប់ដាច់ខាតទេ។",
              svg: (
                <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
                  <circle cx="30" cy="30" r="18" fill="#1e293b" />
                  <line x1="6" y1="50" x2="54" y2="50" stroke="#9333ea" strokeWidth="1.5" />
                  <line x1="6" y1="46" x2="6" y2="54" stroke="#9333ea" strokeWidth="1.5" />
                  <line x1="54" y1="46" x2="54" y2="54" stroke="#9333ea" strokeWidth="1.5" />
                  <text x="30" y="58" textAnchor="middle" fontSize="7" fill="#9333ea" fontFamily="monospace">6mm</text>
                </svg>
              ),
            },
            {
              letter: "E",
              accent: "#be123c",
              en: "Evolving",
              kh: "ការវិវឌ្ឍ",
              enBody: "The mole is changing — in size, shape, colour, or feel — over weeks or months. Any spot that itches, bleeds, or scabs over and will not heal is also evolving. Change is the single biggest warning sign.",
              khBody: "ប្រជ្រុយកំពុងផ្លាស់ប្តូរ — ទំហំ រូបរាង ពណ៌ ឬអារម្មណ៍ — ក្នុងរយៈពេលប៉ុន្មានសប្តាហ៍ ឬប៉ុន្មានខែ។ ចំណុចណាមួយដែលរមាស់ ហូរឈាម ឬបង្កើតអាប់ដែលមិនជាសះស្បើយ ក៏កំពុងវិវឌ្ឍដែរ។ ការផ្លាស់ប្តូរ គឺជាសញ្ញាព្រមានធំបំផុតតែមួយ។",
              svg: (
                <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden="true">
                  <circle cx="18" cy="30" r="6" fill="#1e293b" opacity="0.6" />
                  <circle cx="32" cy="30" r="9" fill="#1e293b" opacity="0.8" />
                  <path d="M 50 22 Q 56 30 50 38 Q 42 42 40 30 Q 42 18 50 22 Z" fill="#1e293b" />
                  <path d="M 4 50 L 56 50" stroke="#be123c" strokeWidth="1.2" markerEnd="url(#arrEvol)" />
                  <defs>
                    <marker id="arrEvol" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 z" fill="#be123c" />
                    </marker>
                  </defs>
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="rounded-2xl border-2 bg-white overflow-hidden flex flex-col"
              style={{
                borderColor: `${item.accent}55`,
                boxShadow: `0 6px 18px -12px ${item.accent}88`,
              }}
              data-testid={`abcde-${item.letter.toLowerCase()}`}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 border-b"
                style={{
                  backgroundColor: `${item.accent}10`,
                  borderColor: `${item.accent}33`,
                }}
              >
                <span
                  className="font-mono font-extrabold text-base w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                >
                  {item.letter}
                </span>
                <span
                  className={`font-bold text-sm ${k ? "font-khmer" : ""}`}
                  style={{ color: SLATE }}
                >
                  {k ? item.kh : item.en}
                </span>
              </div>
              <div
                className="px-3 pt-3 pb-2 flex items-center justify-center"
                style={{ backgroundColor: `${DERM_SKIN}22` }}
              >
                <div className="w-16 h-16">{item.svg}</div>
              </div>
              <p
                className={`px-3 py-3 text-xs text-slate-700 flex-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {k ? item.khBody : item.enBody}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-4 rounded-2xl p-3 sm:p-4 border-l-4 flex items-start gap-2.5"
          style={{
            borderLeftColor: ROSE,
            backgroundColor: `${ROSE}0d`,
            borderColor: `${ROSE}33`,
          }}
          data-testid="see-doctor-note"
        >
          <Stethoscope className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ROSE }} />
          <p
            className={`text-xs sm:text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            <strong className={k ? "" : "font-bold"}>
              {t("If in doubt, get it checked: ", "បើសង្ស័យ សូមឲ្យពេទ្យពិនិត្យ៖ ")}
            </strong>
            {t(
              "A two-minute visit to a doctor or dermatologist is enough to look at a suspicious spot. Caught at this stage, melanoma is over 95% curable. Caught after it has spread, survival drops sharply. The only mistake is waiting.",
              "ការជួបពេទ្យ ឬគ្រូពេទ្យជំនាញរោគសើស្បែករយៈពេល ២ នាទី គ្រប់គ្រាន់ដើម្បីមើលចំណុចគួរឲ្យសង្ស័យមួយ។ បើរកឃើញនៅដំណាក់កាលនេះ មេឡាណូម៉ាអាចព្យាបាលបានលើស ៩៥%។ បើរកឃើញបន្ទាប់ពីវារាលដាល អត្រារស់រានមានជីវិតធ្លាក់ចុះយ៉ាងខ្លាំង។ កំហុសតែមួយគត់គឺការរង់ចាំ។"
            )}
          </p>
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  PHL-XX · The Plastic Epidemic & Microplastics
//          វិបត្តិប្លាស្ទិក និង មីក្រូប្លាស្ទិក
//
//  Aesthetic: ocean blues + warning oranges + sterile whites
//  1. The Forever Material            — photo- vs bio-degrade
//  2. The Invisible Threat            — microplastics + bioaccumulation cycle
//  3. Human Biology & Prevention      — health risks + single-use plastics
// ════════════════════════════════════════════════════════════════════════════

const OCEAN = "#0369a1";
const OCEAN_DEEP = "#0c4a6e";
const OCEAN_LIGHT = "#e0f2fe";
const ALERT = "#ea580c";
const ALERT_DEEP = "#9a3412";

function PlasticBottleSlashed({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="26" y="6" width="12" height="6" rx="1" fill="currentColor" opacity="0.85" />
      <path
        d="M22 16 q0 -4 4 -4 h12 q4 0 4 4 v4 q4 4 4 12 v22 q0 4 -4 4 h-20 q-4 0 -4 -4 v-22 q0 -8 4 -12 z"
        fill="currentColor"
        opacity="0.55"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="22" y1="32" x2="42" y2="32" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="42" x2="42" y2="42" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="6" x2="58" y2="58" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
      <line x1="6" y1="6" x2="58" y2="58" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FoodChainStep({
  k,
  step,
  fishSize,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
  colorClass,
  Icon,
}: {
  k: boolean;
  step: number;
  fishSize: "xs" | "sm" | "md" | "lg";
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
  colorClass: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const fishW = { xs: "w-6 h-6", sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" }[fishSize];
  return (
    <div
      className="relative flex flex-col items-center gap-2 flex-1 min-w-[120px]"
      data-testid={`food-chain-step-${step}`}
    >
      <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-white border-2 border-orange-500 text-orange-700 text-xs font-mono font-bold flex items-center justify-center z-10">
        {step}
      </span>
      <div className={`w-20 h-20 rounded-2xl ${colorClass} flex items-center justify-center text-white shadow-md`}>
        <Icon className={fishW} />
      </div>
      <div className="text-center">
        <div className="font-bold text-sm text-slate-900 leading-tight">{labelEn}</div>
        <div className="font-khmer text-xs text-slate-700 leading-snug">{labelKh}</div>
      </div>
      <p className={`text-[11px] text-slate-700 text-center leading-snug ${k ? "font-khmer leading-loose" : ""}`}>
        {k ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function FoodChainArrow() {
  return (
    <div className="hidden md:flex items-center justify-center text-orange-500 self-start mt-8">
      <ArrowRight className="w-6 h-6" />
    </div>
  );
}

function SectionPlasticEpidemic({ k, t }: { k: boolean; t: T }) {
  return (
    <section
      id="plastic-epidemic"
      className="mb-12 scroll-mt-24"
      data-testid="section-plastic-epidemic"
    >
      <SectionHeader
        spec="PLA"
        en="The Plastic Epidemic & Microplastics"
        kh="វិបត្តិប្លាស្ទិក និង មីក្រូប្លាស្ទិក"
        k={k}
        Icon={Recycle}
        accent={OCEAN}
      />

      {/* Intro / hook */}
      <div
        className="relative overflow-hidden rounded-3xl border-2 p-5 sm:p-6 mb-6 flex items-start gap-4 shadow-sm"
        style={{
          borderColor: `${OCEAN}40`,
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${OCEAN_LIGHT} 100%)`,
        }}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow"
          style={{ backgroundColor: ALERT }}
        >
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.25em] mb-1 ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: ALERT_DEEP }}
          >
            {t("Ecological Alert", "ការព្រមានអំពីបរិស្ថាន")}
          </div>
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Every year, the Mekong alone carries an estimated 40,000 tons of plastic into the South China Sea. The pieces never disappear — they just shrink, climb up the food chain, and end up inside us.",
              "ជារៀងរាល់ឆ្នាំ ទន្លេមេគង្គតែឯងបានបញ្ជូនប្លាស្ទិកប្រមាណ ៤០.០០០ តោន ចូលទៅសមុទ្រចិនខាងត្បូង។ បំណែកទាំងនោះមិនបាត់ទៅទេ — ពួកវាគ្រាន់តែតូចទៅៗ ឡើងតាមខ្សែសង្វាក់ចំណី ហើយចុងក្រោយចូលក្នុងខ្លួនយើង។"
            )}
          </p>
        </div>
      </div>

      {/* ── Sub 1 — The Forever Material ──────────────────────────────── */}
      <div className="mb-6">
        <h3 className={`flex items-center gap-2 text-lg font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: OCEAN_DEEP }}>
          <PlasticBottleSlashed className="w-6 h-6" />
          <span>{t("1. The Forever Material", "១. វត្ថុធាតុដែលមិនងាយរលាយ")}</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Paradox card */}
          <div
            className="rounded-2xl border-2 p-5 bg-white shadow-sm"
            style={{ borderColor: `${OCEAN}40` }}
            data-testid="plastic-paradox"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: OCEAN }}
              >
                {t("The Paradox", "ភាពផ្ទុយគ្នា")}
              </span>
            </div>
            <p className={`text-sm text-slate-800 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("Plastic is incredibly useful because it is cheap and lasts forever.", "ប្លាស្ទិកមានប្រយោជន៍ខ្លាំង ព្រោះវាថោក និងស្ថិតស្ថេរអស់កល្បជានិច្ច។")}</strong>{" "}
              {t(
                "But because it lasts forever, every piece of plastic ever made still exists somewhere on Earth today — in a landfill, in the ocean, or as dust in the air.",
                "ប៉ុន្តែដោយសារវាស្ថិតស្ថេរអស់កល្បជានិច្ច រាល់បំណែកប្លាស្ទិកដែលធ្លាប់ផលិតមក នៅតែមានកន្លែងណាមួយលើផែនដីសព្វថ្ងៃនេះ — នៅកន្លែងចាក់សំរាម នៅក្នុងសមុទ្រ ឬជាធូលីក្នុងខ្យល់។"
              )}
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { en: "1907", kh: "ឆ្នាំ ១៩០៧", subEn: "First plastic", subKh: "ប្លាស្ទិកដំបូង" },
                { en: "8.3B", kh: "៨,៣ ប៊ីលាន", subEn: "Tons made", subKh: "តោនផលិត" },
                { en: "9%", kh: "៩%", subEn: "Recycled", subKh: "កែច្នៃឡើងវិញ" },
              ].map((s, i) => (
                <div key={i} className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-2">
                  <div className="font-mono font-bold text-base" style={{ color: OCEAN_DEEP }}>{s.en}</div>
                  <div className="font-khmer text-[10px] text-slate-700">{s.kh}</div>
                  <div className="text-[10px] text-slate-600 leading-tight mt-0.5">{s.subEn}</div>
                  <div className="font-khmer text-[10px] text-slate-600 leading-tight">{s.subKh}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio vs Photo card */}
          <div
            className="rounded-2xl border-2 p-5 shadow-sm"
            style={{
              borderColor: `${ALERT}40`,
              backgroundImage: `linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)`,
            }}
            data-testid="degrade-comparison"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: ALERT }}
              >
                {t("Two Kinds of Decay", "ការរលាយពីរប្រភេទ")}
              </span>
            </div>

            {/* Biodegrade row */}
            <div className="flex items-start gap-3 mb-3 rounded-lg border border-emerald-300 bg-emerald-50/60 p-2.5">
              <Leaf className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-emerald-900">
                  Biodegrade <span className="font-khmer text-emerald-800">· រលាយតាមធម្មជាតិ</span>
                </div>
                <p className={`text-xs text-slate-700 leading-snug ${k ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Banana peels, wood, and bones. Microbes eat them and they return to soil within weeks or years.",
                    "សម្បកចេក ឈើ និងឆ្អឹង។ មីក្រូសរីរាង្គលេបពួកវា ហើយវាត្រឡប់ទៅជាដី ក្នុងរយៈពេលប៉ុន្មានសប្ដាហ៍ ឬឆ្នាំ។"
                  )}
                </p>
              </div>
            </div>

            {/* Photodegrade row */}
            <div
              className="flex items-start gap-3 rounded-lg p-2.5 border-2"
              style={{ borderColor: `${ALERT}80`, backgroundColor: "#fff7ed" }}
            >
              <Sun className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ALERT_DEEP }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold" style={{ color: ALERT_DEEP }}>
                  Photodegrade <span className="font-khmer text-orange-800">· បំបែកដោយពន្លឺថ្ងៃ</span>
                </div>
                <p className={`text-xs text-slate-800 leading-snug ${k ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Plastic does NOT biodegrade. Sunlight only breaks it into smaller and smaller pieces over hundreds of years — the pieces are still plastic.",
                    "ប្លាស្ទិក មិន រលាយតាមធម្មជាតិទេ។ ពន្លឺថ្ងៃគ្រាន់តែបំបែកវាជាបំណែកតូចៗ អស់រយៈពេលរាប់រយឆ្នាំ — បំណែកនោះនៅតែជាប្លាស្ទិក។"
                  )}
                </p>
              </div>
            </div>

            {/* Visual: bottle → pieces */}
            <div className="mt-3 flex items-center justify-around">
              <PlasticBottleSlashed className="w-8 h-8 text-sky-700" />
              <ArrowRight className="w-4 h-4 text-orange-500" />
              <div className="flex gap-0.5 items-center">
                {[5, 4, 3, 2, 1.2].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-sm bg-sky-700/80"
                    style={{ width: `${s * 2}px`, height: `${s * 2}px` }}
                  />
                ))}
              </div>
              <ArrowRight className="w-4 h-4 text-orange-500" />
              <div className="text-[10px] font-mono text-orange-800">100s yrs</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub 2 — The Invisible Threat ──────────────────────────────── */}
      <div className="mb-6">
        <h3 className={`flex items-center gap-2 text-lg font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: OCEAN_DEEP }}>
          <Microscope className="w-6 h-6" />
          <span>
            {t("2. The Invisible Threat — Microplastics", "២. ការគំរាមកំហែងដែលមើលមិនឃើញ — មីក្រូប្លាស្ទិក")}
          </span>
        </h3>

        {/* Definition card */}
        <div
          className="rounded-2xl border-2 p-5 mb-4 shadow-sm flex items-start gap-4"
          style={{
            borderColor: `${OCEAN}40`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${OCEAN_LIGHT} 100%)`,
          }}
          data-testid="microplastic-definition"
        >
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border-2 flex items-center justify-center"
            style={{ borderColor: `${OCEAN}55`, color: OCEAN_DEEP }}
          >
            <Microscope className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-tight" style={{ color: OCEAN_DEEP }}>
              Microplastics <span className="font-khmer">· មីក្រូប្លាស្ទិក</span>
            </div>
            <p className={`text-sm text-slate-800 mt-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("Plastic pieces smaller than 5 millimeters", "បំណែកប្លាស្ទិកតូចជាង ៥ មិល្លីម៉ែត្រ")}</strong>
              {" — "}
              {t(
                "often invisible to the naked eye. Smaller than a grain of rice, sometimes smaller than a single human cell.",
                "ច្រើនតែមើលមិនឃើញដោយភ្នែកទទេ។ តូចជាងគ្រាប់អង្ករ ហើយពេលខ្លះតូចជាងកោសិកាមនុស្សតែមួយ។"
              )}
            </p>
          </div>
        </div>

        {/* Bioaccumulation cycle */}
        <div
          className="relative rounded-2xl border-2 p-5 sm:p-6 shadow-sm overflow-hidden"
          style={{
            borderColor: `${OCEAN}40`,
            backgroundImage: `linear-gradient(180deg, #ffffff 0%, ${OCEAN_LIGHT} 100%)`,
          }}
          data-testid="bioaccumulation-cycle"
        >
          {/* wave decoration */}
          <Waves className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" style={{ color: OCEAN }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: ALERT }}
              >
                {t("Bioaccumulation Cycle", "វដ្តនៃការប្រមូលផ្តុំជីវសាស្ត្រ")}
              </span>
            </div>
            <p className={`text-xs text-slate-700 mb-5 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "How a plastic bag from your school lunch ends up on your dinner plate.",
                "របៀបដែលថង់ប្លាស្ទិកពីអាហារថ្ងៃត្រង់នៅសាលា អាចចប់នៅលើចានបាយល្ងាចរបស់អ្នក។"
              )}
            </p>

            <div className="flex flex-wrap md:flex-nowrap items-stretch justify-between gap-3">
              <FoodChainStep
                k={k}
                step={1}
                fishSize="md"
                labelEn="Trash → River"
                labelKh="សំរាម → ទន្លេ"
                bodyEn="Bags, bottles and straws wash from streets into the Mekong and Tonle Sap."
                bodyKh="ថង់ ដប និងបំពង់បឺត ហូរពីផ្លូវចូលទៅទន្លេមេគង្គ និងបឹងទន្លេសាប។"
                colorClass="bg-orange-600"
                Icon={Trash2}
              />
              <FoodChainArrow />
              <FoodChainStep
                k={k}
                step={2}
                fishSize="xs"
                labelEn="Sun shrinks them"
                labelKh="ថ្ងៃធ្វើឱ្យតូច"
                bodyEn="Sunlight breaks them into invisible microplastics that float in the water."
                bodyKh="ពន្លឺថ្ងៃបំបែកពួកវាជាមីក្រូប្លាស្ទិកមើលមិនឃើញ ដែលអណ្ដែតក្នុងទឹក។"
                colorClass="bg-sky-500"
                Icon={Sparkles}
              />
              <FoodChainArrow />
              <FoodChainStep
                k={k}
                step={3}
                fishSize="sm"
                labelEn="Small fish eat"
                labelKh="ត្រីតូចលេប"
                bodyEn="Small fish mistake the particles for plankton and swallow them."
                bodyKh="ត្រីតូចច្រឡំបំណែកនោះជាប្លុងតុង ហើយលេបវាចូល។"
                colorClass="bg-sky-700"
                Icon={FishSymbol}
              />
              <FoodChainArrow />
              <FoodChainStep
                k={k}
                step={4}
                fishSize="lg"
                labelEn="Big fish eat small fish"
                labelKh="ត្រីធំស៊ីត្រីតូច"
                bodyEn="Each big fish carries the plastic of every small fish it ever ate."
                bodyKh="ត្រីធំនីមួយៗកាន់ប្លាស្ទិករបស់ត្រីតូចទាំងអស់ ដែលវាធ្លាប់លេប។"
                colorClass="bg-sky-900"
                Icon={FishSymbol}
              />
              <FoodChainArrow />
              <FoodChainStep
                k={k}
                step={5}
                fishSize="md"
                labelEn="We eat the big fish"
                labelKh="យើងបរិភោគត្រីធំ"
                bodyEn="The plastic is now inside us. This concentration step is called bioaccumulation."
                bodyKh="ឥឡូវប្លាស្ទិកនៅក្នុងខ្លួនយើង។ ដំណាក់កាលប្រមូលផ្តុំនេះ ហៅថា ការប្រមូលផ្តុំជីវសាស្ត្រ។"
                colorClass="bg-orange-700"
                Icon={Users}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub 3 — Human Biology & Prevention ────────────────────────── */}
      <div className="mb-4">
        <h3 className={`flex items-center gap-2 text-lg font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: OCEAN_DEEP }}>
          <HeartPulse className="w-6 h-6 text-rose-600" />
          <span>{t("3. Human Biology & Prevention", "៣. ជីវវិទ្យាមនុស្ស និង ការការពារ")}</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Health risk panel */}
          <div
            className="relative rounded-2xl border-4 border-rose-700 bg-rose-950 text-white p-5 shadow-xl overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(250, 204, 21, 0.07) 0 12px, transparent 12px 24px)",
            }}
            data-testid="health-risk"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-rose-600 border-2 border-yellow-300 flex items-center justify-center">
                <Microscope className="w-7 h-7 text-yellow-200" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-300 text-rose-950 text-[10px] font-mono uppercase tracking-widest font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t("Health Warning", "ការព្រមានសុខភាព")}
                </span>
                <h4 className="font-display text-lg font-bold mt-1 leading-tight">
                  {t("Inside our bodies", "នៅក្នុងខ្លួនយើង")}
                  <span className="font-khmer text-sm text-yellow-100/90 ml-2">នៅក្នុងខ្លួនយើង</span>
                </h4>
              </div>
            </div>
            <p className={`text-sm text-rose-50 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Scientists are now finding microplastics in human blood, lungs, and even the placentas of unborn babies.",
                "អ្នកវិទ្យាសាស្ត្ររកឃើញមីក្រូប្លាស្ទិកនៅក្នុងឈាមមនុស្ស សួត និងសូម្បីតែសុក (placenta) របស់ទារកដែលមិនទាន់កើត។"
              )}
            </p>
            <ul className="space-y-2">
              {[
                {
                  en: "They carry toxic chemicals (BPA, phthalates) that disrupt hormones.",
                  kh: "ពួកវាផ្ទុកសារធាតុគីមីពុល (BPA, ផាតាឡាត) ដែលបង្អាក់អ័រម៉ូន។",
                },
                {
                  en: "Inflammation and cellular damage have been measured in animal studies.",
                  kh: "ការរលាក និងការខូចខាតកោសិកា ត្រូវបានវាស់នៅក្នុងការសិក្សាសត្វ។",
                },
                {
                  en: "Long-term effects on humans are still being studied — but the particles do NOT leave the body easily.",
                  kh: "ផលប៉ះពាល់រយៈពេលវែងលើមនុស្ស នៅតែកំពុងស្រាវជ្រាវ — ប៉ុន្តែបំណែកនោះ មិនងាយចេញពីខ្លួនទេ។",
                },
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-yellow-50">
                  <Skull className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className={k ? "font-khmer leading-loose" : "leading-snug"}>
                    {k ? m.kh : m.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution panel */}
          <div
            className="relative rounded-2xl border-2 p-5 shadow-sm"
            style={{
              borderColor: "#15803d",
              backgroundImage: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
            }}
            data-testid="prevention"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                  <Recycle className="w-3.5 h-3.5" />
                  {t("The Solution", "ដំណោះស្រាយ")}
                </span>
                <h4 className="font-display text-lg font-bold mt-1 leading-tight text-emerald-900">
                  {t("Refuse single-use plastic", "បដិសេធប្លាស្ទិកប្រើតែម្ដង")}
                  <span className="font-khmer text-sm text-emerald-700 ml-2">បដិសេធប្លាស្ទិកប្រើតែម្ដង</span>
                </h4>
              </div>
            </div>
            <p className={`text-sm text-emerald-950 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "The single best way to protect public health is to keep new plastic out of the water in the first place.",
                "មធ្យោបាយតែមួយដ៏ល្អបំផុតដើម្បីការពារសុខភាពសាធារណៈ គឺការទប់ស្កាត់ប្លាស្ទិកថ្មី មិនឲ្យចូលក្នុងទឹកតាំងពីដំបូង។"
              )}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { en: "Plastic straws", kh: "បំពង់បឺតប្លាស្ទិក" },
                { en: "Plastic bags", kh: "ថង់ប្លាស្ទិក" },
                { en: "Disposable cups", kh: "កែវប្រើចោល" },
                { en: "Plastic cutlery", kh: "ចង្កឹះ-ស្លាបព្រាប្លាស្ទិក" },
              ].map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-lg border border-rose-300 bg-rose-50 px-2 py-1.5"
                >
                  <Ban className="w-3.5 h-3.5 text-rose-700 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-rose-900 leading-tight">{it.en}</div>
                    <div className="font-khmer text-[10px] text-rose-800 leading-tight">{it.kh}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-emerald-300 bg-white p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("And dispose of trash properly", "ហើយបោះសំរាមឱ្យបានត្រឹមត្រូវ")}
              </div>
              <p className={`text-xs text-emerald-950 leading-snug ${k ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Never throw plastic in rivers, canals, or on the street — every piece you stop is one less particle in someone's blood.",
                  "កុំបោះប្លាស្ទិកក្នុងទន្លេ ប្រឡាយ ឬនៅលើផ្លូវ — រាល់បំណែកដែលអ្នករារាំងបាន ​គឺបំណែកមួយតិចជាងនៅក្នុងឈាមអ្នកណាម្នាក់។"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Closing line */}
      <div
        className="relative rounded-2xl border-2 p-4 flex items-start gap-3 shadow-sm"
        style={{
          borderColor: `${OCEAN}40`,
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${OCEAN_LIGHT} 100%)`,
        }}
      >
        <Waves className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: OCEAN_DEEP }} />
        <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong>{t("Bottom line: ", "សេចក្តីសន្និដ្ឋាន ៖ ")}</strong>
          {t(
            "Plastic is a public-health issue, not just a beach issue. The water you drink, the fish you eat, and the air you breathe are all connected — and the cleanest fix is the plastic that is never made.",
            "ប្លាស្ទិកគឺជាបញ្ហាសុខភាពសាធារណៈ មិនមែនត្រឹមជាបញ្ហាឆ្នេរសមុទ្រនោះទេ។ ទឹកដែលអ្នកផឹក ត្រីដែលអ្នកបរិភោគ និងខ្យល់ដែលអ្នកដកដង្ហើម សុទ្ធតែជាប់ទាក់ទងគ្នា — ហើយដំណោះស្រាយដ៏ស្អាតបំផុត គឺប្លាស្ទិកដែលមិនត្រូវបានផលិតឡើយ។"
          )}
        </p>
      </div>
    </section>
  );
}
