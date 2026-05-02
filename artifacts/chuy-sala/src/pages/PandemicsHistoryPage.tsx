import { Link } from "wouter";
import {
  ArrowLeft,
  Biohazard,
  Bug,
  Skull,
  Microscope,
  Pill,
  Syringe,
  ScrollText,
  ShieldCheck,
  Activity,
  HeartPulse,
  Globe,
  AlertTriangle,
  Quote,
  CheckCircle2,
  Award,
  Wind,
  Droplet,
  FlaskConical,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  MED-PAN-01 · Pandemics & Triumphs: The History of Disease
//                ជំងឺរាតត្បាត និងជ័យជម្នះ៖ ប្រវត្តិសាស្ត្រនៃជំងឺ
//
//  1. The Ancient Plagues          · Biblical, Black Death, Leprosy
//  2. The Viral Invaders           · Yellow Fever, Influenza, Polio
//  3. The Ultimate Victory         · Smallpox eradication
//
//  Aesthetic: medical-history — sterile clinical whites, biohazard caution
//             yellows, parchment historical accents, WHO medical blue, and
//             a "victory" emerald for the smallpox triumph.
// ════════════════════════════════════════════════════════════════════════════

const PAPER       = "#ffffff";   // sterile clinical white
const BONE        = "#f8fafc";   // off-white panel
const PARCH       = "#fbf3df";   // ancient parchment
const PARCH_DEEP  = "#f1e6c3";
const INK         = "#0f172a";
const INK_SOFT    = "#475569";
const RULE        = "#e2e8f0";
const RULE_PARCH  = "#d6c89a";

const BIO         = "#d97706";   // biohazard amber (warning)
const BIO_SOFT    = "#fef3c7";
const BIO_DEEP    = "#92400e";

const CRIMSON     = "#b91c1c";   // medical scarlet (blood / disease)
const CRIMSON_SOFT = "#fee2e2";
const CRIMSON_DEEP = "#7f1d1d";

const WHO_BLUE    = "#0369a1";   // WHO / medical blue
const WHO_BLUE_SOFT = "#e0f2fe";

const VICTORY     = "#059669";   // eradication / cure green
const VICTORY_SOFT = "#d1fae5";
const VICTORY_DEEP = "#064e3b";

const STONE       = "#475569";

const FRAME: React.CSSProperties = {
  backgroundColor: PAPER,
  backgroundImage:
    `radial-gradient(circle at 8% 0%, ${BIO}10, transparent 45%),` +
    `radial-gradient(circle at 100% 100%, ${WHO_BLUE}08, transparent 50%)`,
};

type T = (en: string, kh: string) => string;
type IconCmp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// ─── Section header ────────────────────────────────────────────────────────

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
  Icon: IconCmp;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
        style={{ backgroundColor: accent }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t border-dashed"
        style={{ borderColor: RULE }}
      />
    </div>
  );
}

// ─── Disease Profile Card (used in all three sections) ────────────────────

type DiseaseFact = {
  labelEn: string;
  labelKh: string;
  Icon: IconCmp;
  valueEn: string;
  valueKh: string;
};

function DiseaseProfileCard({
  k,
  testId,
  era,
  eraEn,
  eraKh,
  Icon,
  enName,
  khName,
  enSubtitle,
  khSubtitle,
  enBody,
  khBody,
  facts,
  cureEn,
  cureKh,
  cureLabelEn,
  cureLabelKh,
  CureIcon,
  variant,
}: {
  k: boolean;
  testId: string;
  era: string;
  eraEn: string;
  eraKh: string;
  Icon: IconCmp;
  enName: string;
  khName: string;
  enSubtitle: string;
  khSubtitle: string;
  enBody: string;
  khBody: string;
  facts: DiseaseFact[];
  cureEn: string;
  cureKh: string;
  cureLabelEn: string;
  cureLabelKh: string;
  CureIcon: IconCmp;
  variant: "ancient" | "viral";
}) {
  // Two distinct visual treatments — parchment (ancient) vs sterile white card
  // with a biohazard caution stripe (viral).
  const isAncient = variant === "ancient";
  const accent     = isAncient ? CRIMSON : BIO;
  const accentSoft = isAncient ? CRIMSON_SOFT : BIO_SOFT;
  const accentDeep = isAncient ? CRIMSON_DEEP : BIO_DEEP;
  const cardBg     = isAncient ? PARCH : PAPER;
  const eraBadgeBg = isAncient ? `${CRIMSON_DEEP}` : `${BIO_DEEP}`;

  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl border-2 overflow-hidden flex flex-col h-full shadow-md"
      style={{
        backgroundColor: cardBg,
        borderColor: `${accent}66`,
        boxShadow: `0 1px 0 ${accent}11, 0 16px 32px -22px ${accent}55`,
      }}
    >
      {/* Caution stripe header — biohazard yellow & black for viral, sepia for ancient */}
      <div
        className="relative h-3 w-full"
        style={{
          background: isAncient
            ? `repeating-linear-gradient(45deg, ${PARCH_DEEP} 0 12px, ${RULE_PARCH} 12px 24px)`
            : `repeating-linear-gradient(45deg, ${BIO} 0 14px, #1c1917 14px 28px)`,
        }}
        aria-hidden="true"
      />

      <div className="px-5 pt-5 pb-5 flex flex-col gap-4 flex-1 relative">
        {/* Faint clinical grid for sterile feel */}
        {!isAncient && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                `linear-gradient(${RULE} 1px, transparent 1px),` +
                `linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              maskImage: "linear-gradient(180deg, transparent, white 40%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, white 40%, transparent 95%)",
            }}
          />
        )}

        <div className="relative flex items-start gap-3">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner"
            style={{
              backgroundColor: `${accent}1a`,
              border: `2px solid ${accent}66`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span
                className="font-mono text-[9px] tracking-widest uppercase rounded px-1.5 py-0.5 text-white"
                style={{ backgroundColor: eraBadgeBg }}
              >
                {era}
              </span>
              <span
                className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                style={{ color: STONE }}
              >
                {k ? eraKh : eraEn}
              </span>
            </div>
            <h3
              className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
              style={{ color: INK }}
            >
              {k ? khName : enName}
            </h3>
            <div
              className={`text-[12px] mt-0.5 ${k ? "font-khmer leading-loose" : "italic"}`}
              style={{ color: accent }}
            >
              {k ? khSubtitle : enSubtitle}
            </div>
          </div>
        </div>

        <p
          className={`relative text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {k ? khBody : enBody}
        </p>

        {/* Facts strip (symptoms / spread / etc.) */}
        <div className="relative flex flex-col gap-2">
          {facts.map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-2.5 flex items-start gap-2.5"
              style={{
                backgroundColor: isAncient ? "#ffffffaa" : BONE,
                border: `1px solid ${RULE}`,
              }}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: accentSoft, border: `1px solid ${accent}55` }}
              >
                <f.Icon className="w-3.5 h-3.5" style={{ color: accentDeep }} />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
                  style={{ color: accentDeep }}
                >
                  {k ? f.labelKh : f.labelEn}
                </div>
                <div
                  className={`text-[12px] sm:text-[13px] ${k ? "font-khmer leading-loose" : "leading-snug"}`}
                  style={{ color: INK }}
                >
                  {k ? f.valueKh : f.valueEn}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern cure / control band — emerald, signals hope */}
        <div
          className="relative rounded-xl p-3 flex items-start gap-2.5 mt-auto"
          style={{
            backgroundColor: VICTORY_SOFT,
            border: `1.5px solid ${VICTORY}`,
          }}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#ffffff", border: `1px solid ${VICTORY}88` }}
          >
            <CureIcon className="w-4 h-4" style={{ color: VICTORY_DEEP }} />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
              style={{ color: VICTORY_DEEP }}
            >
              {k ? cureLabelKh : cureLabelEn}
            </div>
            <div
              className={`text-[13px] ${k ? "font-khmer leading-loose" : "leading-snug"}`}
              style={{ color: INK }}
            >
              {k ? cureKh : cureEn}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function PandemicsHistoryPage() {
  const language = useLanguageStore((s) => s.language);
  const k = language === "kh";
  const T: T = (en, kh) => (k ? kh : en);

  return (
    <div className="min-h-screen pt-8 sm:pt-12 pb-20 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm mb-6 hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: WHO_BLUE }}
          data-testid="pandemics-back-link"
        >
          <ArrowLeft className="w-4 h-4" />
          {T("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="mb-10 relative">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
              style={{ backgroundColor: BIO_DEEP }}
            >
              MED-PAN-01
            </span>
            <span
              className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: STONE }}
            >
              {T("Study Center · Medical History", "មជ្ឈមណ្ឌលសិក្សា · ប្រវត្តិវេជ្ជសាស្ត្រ")}
            </span>
            <Biohazard className="w-4 h-4" style={{ color: BIO }} aria-hidden="true" />
          </div>
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
            data-testid="pandemics-title"
          >
            {T("Pandemics & Triumphs", "ជំងឺរាតត្បាត និងជ័យជម្នះ")}
          </h1>
          <h2
            className={`text-xl sm:text-2xl font-semibold mb-4 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: WHO_BLUE }}
          >
            {T("The History of Disease", "ប្រវត្តិសាស្ត្រនៃជំងឺ")}
          </h2>
          <p
            className={`text-base sm:text-lg max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "For most of human history, an invisible enemy — bacteria, viruses, and parasites — killed more people than every war combined. This is the story of how we identified those enemies, fought them, and in one extraordinary case, completely destroyed one forever.",
              "ភាគច្រើននៃប្រវត្តិសាស្ត្រមនុស្ស សត្រូវដែលមើលមិនឃើញ — បាក់តេរី វីរុស និងប៉ារ៉ាស៊ីត — បានសម្លាប់មនុស្សច្រើនជាងសង្គ្រាមទាំងអស់រួមគ្នា។ នេះជារឿងរ៉ាវអំពីរបៀបដែលយើងបានកំណត់សត្រូវទាំងនោះ បានប្រយុទ្ធជាមួយពួកវា ហើយក្នុងករណីពិសេសមួយ បានបំផ្លាញវាមួយជារៀងរហូត។",
            )}
          </p>

          {/* Hero stat strip */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
            <HeroStat
              k={k}
              accent={CRIMSON}
              valueEn="~50M"
              valueKh="~៥០ លាន"
              labelEn="Black Death deaths in Europe"
              labelKh="ស្លាប់​ដោយ​ជំងឺ​ប៉េស្ត​នៅ​អឺរ៉ុប"
            />
            <HeroStat
              k={k}
              accent={BIO}
              valueEn="50M"
              valueKh="៥០ លាន"
              labelEn="1918 flu deaths"
              labelKh="ស្លាប់​ដោយ​ផ្ដាសាយ ១៩១៨"
            />
            <HeroStat
              k={k}
              accent={VICTORY}
              valueEn="1 only"
              valueKh="តែ ១"
              labelEn="Disease eradicated forever"
              labelKh="ជំងឺ​ដែល​លុប​បំបាត់​ជា​រៀង​រហូត"
            />
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 · THE ANCIENT PLAGUES
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="ancient-plagues"
          data-testid="section-ancient-plagues"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="01"
            en="The Ancient Plagues"
            kh="ជំងឺរាតត្បាតសម័យបុរាណ"
            k={k}
            Icon={ScrollText}
            accent={CRIMSON_DEEP}
          />

          <div
            className="rounded-3xl p-5 sm:p-6 border-2 mb-5"
            style={{
              backgroundColor: PARCH,
              borderColor: `${RULE_PARCH}`,
              boxShadow: `0 12px 30px -22px ${CRIMSON_DEEP}55`,
            }}
          >
            <p
              className={`text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              <span className="font-bold" style={{ color: CRIMSON_DEEP }}>
                {T(
                  "Long before microscopes, sick people simply died — and nobody knew why.",
                  "មុនពេលមានមីក្រូទស្សន៍យូរណាស់ មនុស្សឈឺគ្រាន់តែស្លាប់ — ហើយគ្មាននរណាម្នាក់ដឹងហេតុអ្វី។",
                )}
              </span>{" "}
              {T(
                "The earliest written records of disease describe what we now recognise as outbreaks of plague, leprosy, and ecological disasters that ruined the food supply. Whole cities lived in fear of the next wave.",
                "កំណត់ត្រាដំបូងបំផុតស្ដីពីជំងឺ ពណ៌នាអំពីអ្វីដែលឥឡូវនេះយើងស្គាល់ថាជា ការផ្ទុះឡើងនៃជំងឺប៉េស្ត ជំងឺឃ្លង់ និងគ្រោះមហន្តរាយធម្មជាតិដែលបំផ្លាញស្បៀងអាហារ។ ទីក្រុងទាំងមូលបានរស់នៅក្នុងការភ័យខ្លាចពីរលករឹក​បន្ទាប់។",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Biblical Plagues */}
            <DiseaseProfileCard
              k={k}
              testId="disease-biblical-plagues"
              variant="ancient"
              era="ANCIENT"
              eraEn="≈ 1300 BCE record"
              eraKh="កំណត់ត្រា ≈ ១៣០០ មុន គ.ស."
              Icon={Droplet}
              enName="The Biblical Plagues"
              khName="ជំងឺរាតត្បាតក្នុងព្រះគម្ពីរ"
              enSubtitle="Some of the earliest recorded mass disasters"
              khSubtitle="គ្រោះមហន្តរាយដ៏ដំបូងបំផុតដែលត្រូវបានកត់ត្រា"
              enBody="The famous 'Ten Plagues' of the Book of Exodus — water turning the colour of blood, swarms of frogs and locusts, livestock dying — read like an early eyewitness account of mass disease and ecological collapse. Modern historians and scientists believe several of them describe real, repeated dangers in the ancient world: water contaminated by red algae, locust swarms destroying every crop, and respiratory and cattle diseases sweeping through farming villages."
              khBody="«ជំងឺរាតត្បាតទាំង ១០» ដ៏ល្បីល្បាញនៃគម្ពីរ Exodus — ទឹកប្រែជាពណ៌ឈាម កណ្ដៀរនិងកណ្ដូបយាងជារាប់លាន សត្វពាហនៈស្លាប់ — អានដូចជាសេចក្ដីសរសេររបស់សាក្សីភ្នែកដំបូងបង្អស់អំពីជំងឺមហាជន និងការដួលរលំនៃបរិស្ថាន។ អ្នកប្រវត្តិវិទូ និងវិទ្យាសាស្ត្រសម័យទំនើបជឿថា ភាគច្រើននៃទាំងនោះ ពណ៌នាពីគ្រោះថ្នាក់ពិតប្រាកដនៅពិភពលោកបុរាណ ៖ ទឹកដែលត្រូវបំពុលដោយសារ៉ាយក្រហម កណ្ដូបរាប់ពាន់លានបំផ្លាញដំណាំ និងជំងឺផ្លូវដង្ហើម និងសត្វគោក្របីដែលរីករាលក្នុងភូមិកសិកម្ម។"
              facts={[
                {
                  labelEn: "Likely cause",
                  labelKh: "មូលហេតុដែលអាចមាន",
                  Icon: Droplet,
                  valueEn: "Water contamination, locust swarms, livestock disease.",
                  valueKh: "ការបំពុលទឹក កណ្ដូបយាង ជំងឺសត្វពាហនៈ។",
                },
                {
                  labelEn: "Why it matters",
                  labelKh: "ហេតុអ្វីសំខាន់",
                  Icon: ScrollText,
                  valueEn: "Earliest written record of mass illness and ecological collapse.",
                  valueKh: "កំណត់ត្រាដំបូងបំផុតនៃជំងឺមហាជន និងការដួលរលំបរិស្ថាន។",
                },
              ]}
              cureEn="Modern sanitation, clean water, and crop monitoring stop these patterns long before they reach 'plague' scale."
              cureKh="អនាម័យទំនើប ទឹកស្អាត និងការតាមដានដំណាំ ឈប់លំនាំទាំងនេះមុនពេលដែលវាឈានដល់កម្រិត «ជំងឺរាតត្បាត»។"
              cureLabelEn="Today"
              cureLabelKh="សព្វថ្ងៃនេះ"
              CureIcon={ShieldCheck}
            />

            {/* Black Death */}
            <DiseaseProfileCard
              k={k}
              testId="disease-black-death"
              variant="ancient"
              era="MEDIEVAL"
              eraEn="1346 – 1353 CE"
              eraKh="ឆ្នាំ ១៣៤៦ – ១៣៥៣ គ.ស."
              Icon={Skull}
              enName="The Black Death · ជំងឺប៉េស្ត"
              khName="ជំងឺប៉េស្ត · The Black Death"
              enSubtitle="The bacteria carried by fleas on rats"
              khSubtitle="បាក់តេរីដែលដឹកដោយចៃនៅលើកណ្ដុរ"
              enBody="The Black Death tore through Europe, North Africa, and Asia in the 1300s, killing tens of millions in just a few years — by some estimates, one-third of all the people in Europe. The cause was Yersinia pestis, a bacterium that lived inside fleas, which lived on rats, which lived in every grain store and every ship. People had no idea about germs, so they blamed bad air, foreigners, or angry gods. Without that knowledge, every quarantine they tried was incomplete."
              khBody="ជំងឺប៉េស្តបានរីករាលដាលទូទាំងអឺរ៉ុប អាហ្វ្រិកខាងជើង និងអាស៊ី នៅសតវត្សរ៍ទី ១៤ បានសម្លាប់មនុស្សរាប់សិបលាននាក់ ក្នុងរយៈពេលត្រឹមតែប៉ុន្មានឆ្នាំ — យោងតាមការប៉ាន់ស្មានខ្លះ មួយភាគបីនៃប្រជាជនអឺរ៉ុបទាំងអស់។ មូលហេតុគឺ Yersinia pestis ជាបាក់តេរីដែលរស់នៅក្នុងចៃ ដែលរស់នៅលើកណ្ដុរ ដែលរស់នៅគ្រប់ឃ្លាំងស្រូវ និងនាវាគ្រប់ៗ។ មនុស្សពេលនោះមិនដឹងអំពីមេរោគទេ ដូច្នេះពួកគេបន្ទោសលើខ្យល់អាក្រក់ បរទេស ឬព្រះដែលខឹង។ ដោយគ្មានចំណេះដឹងនោះ រាល់ការដាក់ចត្តាឡីស័កដែលពួកគេសាក គឺមិនពេញលេញ។"
              facts={[
                {
                  labelEn: "Cause",
                  labelKh: "មូលហេតុ",
                  Icon: Bug,
                  valueEn: "Bacterium spread by fleas on black rats.",
                  valueKh: "បាក់តេរីផ្សព្វផ្សាយដោយចៃនៅលើកណ្ដុរខ្មៅ។",
                },
                {
                  labelEn: "Symptoms",
                  labelKh: "រោគសញ្ញា",
                  Icon: Skull,
                  valueEn: "Buboes (swollen lymph nodes), high fever, blackening skin.",
                  valueKh: "ដុំបូប៉ូ (កូនកណ្ដុរហើម) គ្រុនក្ដៅខ្លាំង ស្បែកប្រែជាខ្មៅ។",
                },
                {
                  labelEn: "Death toll",
                  labelKh: "ចំនួនអ្នកស្លាប់",
                  Icon: HeartPulse,
                  valueEn: "Tens of millions in 7 years (~⅓ of Europe).",
                  valueKh: "រាប់សិបលាននាក់ក្នុង ៧ ឆ្នាំ (~⅓ នៃអឺរ៉ុប)។",
                },
              ]}
              cureEn="Sanitation to control rats + simple, cheap antibiotics — a full plague case is curable today if treated early."
              cureKh="អនាម័យដើម្បីគ្រប់គ្រងកណ្ដុរ + ថ្នាំអង់ទីប៊ីយ៉ូទិចសាមញ្ញ ថោក — ករណីប៉េស្តពេញលេញគឺអាចព្យាបាលបាននៅសព្វថ្ងៃនេះ ប្រសិនបើព្យាបាលឱ្យបានឆាប់។"
              cureLabelEn="Modern Cure"
              cureLabelKh="ការព្យាបាលសម័យទំនើប"
              CureIcon={Pill}
            />

            {/* Leprosy */}
            <DiseaseProfileCard
              k={k}
              testId="disease-leprosy"
              variant="ancient"
              era="ANCIENT"
              eraEn="Records since ≈ 600 BCE"
              eraKh="កំណត់ត្រា ≈ ៦០០ មុន គ.ស."
              Icon={Bug}
              enName="Leprosy · ជំងឺឃ្លង់"
              khName="ជំងឺឃ្លង់ · Leprosy"
              enSubtitle="An ancient bacterial infection of skin and nerves"
              khSubtitle="ការឆ្លងមេរោគបាក់តេរីបុរាណនៃស្បែក និងសរសៃប្រសាទ"
              enBody="Leprosy (Hansen's disease) is caused by a slow-growing bacterium that attacks the skin and the nerves. Because patients lost feeling in their hands and feet, they hurt themselves without knowing — leading to the disfigurement that terrified ancient societies. From India to Europe to the Pacific, sick people were forced into isolated 'leper colonies' for life. The fear was so strong that the word 'leper' became an insult. Today we know it spreads slowly and is hard to catch — most people are naturally immune."
              khBody="ជំងឺឃ្លង់ (Hansen's disease) បណ្ដាលមកពីបាក់តេរីដែលលូតលាស់យឺត ដែលវាយប្រហារស្បែក និងសរសៃប្រសាទ។ ដោយសារអ្នកជំងឺបាត់បង់អារម្មណ៍នៅដៃ និងជើង ពួកគេធ្វើបាបខ្លួនឯងដោយមិនដឹងខ្លួន — នាំឱ្យមានរូបរាងខូចទ្រង់ទ្រាយដែលធ្វើឱ្យសង្គមបុរាណភ័យខ្លាច។ ពីឥណ្ឌា ដល់អឺរ៉ុប ដល់ប៉ាស៊ីហ្វិក អ្នកជំងឺត្រូវបានបង្ខំចូលទៅក្នុង «ភូមិអ្នកឃ្លង់» ឯកោអស់មួយជីវិត។ ការភ័យខ្លាចខ្លាំងណាស់ ដែលពាក្យ «អ្នកឃ្លង់» ក្លាយជាពាក្យជេរ។ សព្វថ្ងៃនេះយើងដឹងថា វារាលដាលយឺត និងចាប់បានពិបាក — មនុស្សភាគច្រើនមានភាពស៊ាំធម្មជាតិ។"
              facts={[
                {
                  labelEn: "Cause",
                  labelKh: "មូលហេតុ",
                  Icon: Bug,
                  valueEn: "Mycobacterium leprae — a slow bacterium.",
                  valueKh: "Mycobacterium leprae — បាក់តេរីយឺត។",
                },
                {
                  labelEn: "Symptoms",
                  labelKh: "រោគសញ្ញា",
                  Icon: Activity,
                  valueEn: "Severe nerve damage, skin sores, loss of sensation.",
                  valueKh: "ការខូចសរសៃប្រសាទធ្ងន់ធ្ងរ ដំបៅស្បែក បាត់អារម្មណ៍។",
                },
                {
                  labelEn: "Historical response",
                  labelKh: "ប្រតិកម្មប្រវត្តិសាស្ត្រ",
                  Icon: AlertTriangle,
                  valueEn: "Lifetime isolation in leper colonies.",
                  valueKh: "ការដាក់ឯកោពេញមួយជីវិតក្នុងភូមិអ្នកឃ្លង់។",
                },
              ]}
              cureEn="Entirely curable today with a 6–12 month combination of antibiotics (Multi-Drug Therapy), provided free worldwide by the WHO."
              cureKh="អាចព្យាបាលបានពេញលេញសព្វថ្ងៃនេះ ដោយការផ្សំថ្នាំអង់ទីប៊ីយ៉ូទិច ៦–១២ ខែ (ការព្យាបាលផ្សំថ្នាំ MDT) ដែលផ្ដល់ដោយឥតគិតថ្លៃទូទាំងពិភពលោកដោយ WHO។"
              cureLabelEn="Modern Cure"
              cureLabelKh="ការព្យាបាលសម័យទំនើប"
              CureIcon={Pill}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 · THE VIRAL INVADERS
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="viral-invaders"
          data-testid="section-viral-invaders"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="02"
            en="The Viral Invaders"
            kh="ភ្នាក់ងារចម្លងវីរុស"
            k={k}
            Icon={Biohazard}
            accent={BIO}
          />

          <div
            className="rounded-3xl p-5 sm:p-6 border-2 mb-5 relative overflow-hidden"
            style={{
              backgroundColor: PAPER,
              borderColor: `${BIO}55`,
              boxShadow: `0 12px 30px -22px ${BIO}55`,
            }}
          >
            {/* corner caution stripe */}
            <div
              className="absolute -top-1 -right-1 w-32 h-8 origin-top-right rotate-45 translate-x-12 translate-y-2"
              aria-hidden="true"
              style={{
                background: `repeating-linear-gradient(45deg, ${BIO} 0 12px, #1c1917 12px 24px)`,
              }}
            />
            <div className="flex items-start gap-3">
              <Biohazard className="flex-shrink-0 w-7 h-7 mt-0.5" style={{ color: BIO_DEEP }} />
              <p
                className={`text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: INK }}
              >
                <span className="font-bold" style={{ color: BIO_DEEP }}>
                  {T(
                    "Bacteria are big enough to be killed by antibiotics. Viruses are not.",
                    "បាក់តេរីមានទំហំធំល្មមឱ្យសម្លាប់បានដោយថ្នាំអង់ទីប៊ីយ៉ូទិច។ ប៉ុន្តែវីរុសមិនធំទេ។",
                  )}
                </span>{" "}
                {T(
                  "A virus is a tiny strip of genetic code that hijacks our own cells. Antibiotics do nothing to them. The only real defense humanity has against most viral pandemics is the vaccine — teaching the body to recognise the enemy before it ever shows up.",
                  "វីរុសគឺជាបន្ទះលេខកូដហ្សែនតូចមួយ ដែលឆក់យកកោសិការបស់យើងផ្ទាល់។ ថ្នាំអង់ទីប៊ីយ៉ូទិចមិនមានឥទ្ធិពលអ្វីលើពួកវាទេ។ ការការពារពិតប្រាកដតែមួយគត់ដែលមនុស្សជាតិមានប្រឆាំងនឹងជំងឺរាតត្បាតវីរុសភាគច្រើន គឺ វ៉ាក់សាំង — បង្រៀនរាងកាយឱ្យស្គាល់សត្រូវមុនពេលវាបង្ហាញខ្លួន។",
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Yellow Fever */}
            <DiseaseProfileCard
              k={k}
              testId="disease-yellow-fever"
              variant="viral"
              era="VIRAL"
              eraEn="Tropics · 1600s – today"
              eraKh="តំបន់ត្រូពិក · ១៦០០ – សព្វថ្ងៃ"
              Icon={Bug}
              enName="Yellow Fever · ជំងឺគ្រុនលឿង"
              khName="ជំងឺគ្រុនលឿង · Yellow Fever"
              enSubtitle="Spread by mosquitoes in tropical regions"
              khSubtitle="ផ្សព្វផ្សាយដោយមូសនៅតំបន់ត្រូពិក"
              enBody="Yellow Fever is a virus carried by mosquitoes (the Aedes aegypti — the same species that spreads dengue) in tropical Africa and South America. After a few days of fever, the most severe cases turn the skin and the eyes yellow because the liver is failing. The earliest French attempt to build the Panama Canal in the 1880s collapsed largely because tens of thousands of workers died from yellow fever and malaria — until scientists in 1900 finally proved that mosquitoes were the carriers."
              khBody="ជំងឺគ្រុនលឿងគឺជាវីរុសដែលដឹកនាំដោយមូស (Aedes aegypti — ជាប្រភេទដូចគ្នាដែលចម្លងជំងឺគ្រុនឈាម) នៅតំបន់ត្រូពិកអាហ្វ្រិក និងអាមេរិកខាងត្បូង។ ក្រោយគ្រុនក្ដៅប៉ុន្មានថ្ងៃ ករណីធ្ងន់ធ្ងរបំផុត ធ្វើឱ្យស្បែក និងភ្នែកប្រែជាពណ៌លឿង ដោយសារថ្លើមបរាជ័យ។ ការប៉ុនប៉ងដំបូងបង្អស់របស់បារាំងដើម្បីសាងសង់ប្រឡាយ Panama នៅទសវត្សរ៍ឆ្នាំ ១៨៨០ បានដួលរលំភាគច្រើនដោយសារកម្មកររាប់ម៉ឺននាក់បានស្លាប់ដោយសារជំងឺគ្រុនលឿង និងជំងឺគ្រុនចាញ់ — រហូតដល់អ្នកវិទ្យាសាស្ត្រនៅឆ្នាំ ១៩០០ ទើបបង្ហាញឲ្យឃើញថា មូសគឺជាអ្នកដឹកជញ្ជូន។"
              facts={[
                {
                  labelEn: "Spread by",
                  labelKh: "ផ្សព្វផ្សាយដោយ",
                  Icon: Bug,
                  valueEn: "Mosquitoes (Aedes aegypti) in tropical climates.",
                  valueKh: "មូស (Aedes aegypti) នៅអាកាសធាតុត្រូពិក។",
                },
                {
                  labelEn: "Symptoms",
                  labelKh: "រោគសញ្ញា",
                  Icon: Activity,
                  valueEn: "High fever, jaundice (yellow skin & eyes), organ failure.",
                  valueKh: "គ្រុនក្ដៅខ្លាំង ស្បែក និងភ្នែកលឿង (ជូឌីស) ការបរាជ័យសរីរាង្គ។",
                },
                {
                  labelEn: "Type",
                  labelKh: "ប្រភេទ",
                  Icon: Microscope,
                  valueEn: "RNA flavivirus — same family as dengue and Zika.",
                  valueKh: "វីរុស RNA flavivirus — គ្រួសារដូចគ្នានឹងជំងឺគ្រុនឈាម និង Zika។",
                },
              ]}
              cureEn="Mosquito control (sanitation, drain standing water) + a single highly effective vaccine that lasts a lifetime."
              cureKh="ការគ្រប់គ្រងមូស (អនាម័យ បង្ហូរទឹកនឹង) + វ៉ាក់សាំងមួយដូសដ៏មានប្រសិទ្ធភាពខ្ពស់ ដែលមានរយៈពេលពេញមួយជីវិត។"
              cureLabelEn="Control"
              cureLabelKh="ការគ្រប់គ្រង"
              CureIcon={Syringe}
            />

            {/* Influenza */}
            <DiseaseProfileCard
              k={k}
              testId="disease-influenza"
              variant="viral"
              era="VIRAL"
              eraEn="1918 pandemic · ongoing"
              eraKh="ជំងឺរាតត្បាត ១៩១៨ · បន្ត"
              Icon={Wind}
              enName="Influenza · ជំងឺផ្ដាសាយ"
              khName="ជំងឺផ្ដាសាយ · Influenza"
              enSubtitle="One of the fastest-mutating respiratory viruses"
              khSubtitle="វីរុសផ្លូវដង្ហើមមួយក្នុងចំណោមវីរុសដែលផ្លាស់ប្ដូរលឿនបំផុត"
              enBody="The 1918 'Spanish Flu' pandemic killed about 50 million people worldwide in just two years — more than the entirety of World War I. Influenza spreads through the air on coughs and sneezes, and the virus changes its outer shape every single year. That is why your immunity from one season often does not protect you the next: the virus has already become a slightly different enemy."
              khBody="ជំងឺរាតត្បាត 'ផ្ដាសាយអេស្ប៉ាញ' ឆ្នាំ ១៩១៨ បានសម្លាប់មនុស្សប្រហែល ៥០ លាននាក់ទូទាំងពិភពលោក ក្នុងរយៈពេលត្រឹមតែ ២ ឆ្នាំ — ច្រើនជាងសង្គ្រាមលោកលើកទី ១ ទាំងមូល។ ជំងឺផ្ដាសាយរីករាលដាលតាមអាកាស តាមការក្អក និងកណ្ដាស់ ហើយវីរុសផ្លាស់ប្ដូររូបរាងខាងក្រៅរបស់វារៀងរាល់ឆ្នាំ។ នោះហើយជាមូលហេតុដែលភាពស៊ាំរបស់អ្នកពីរដូវមួយជារឿយៗមិនការពារអ្នកក្នុងរដូវបន្ទាប់ ៖ វីរុសបានក្លាយជាសត្រូវខុសគ្នាបន្តិចហើយ។"
              facts={[
                {
                  labelEn: "Spread by",
                  labelKh: "ផ្សព្វផ្សាយដោយ",
                  Icon: Wind,
                  valueEn: "Airborne droplets — coughs and sneezes.",
                  valueKh: "តំណក់ទឹកក្នុងខ្យល់ — ការក្អក និងកណ្ដាស់។",
                },
                {
                  labelEn: "Symptoms",
                  labelKh: "រោគសញ្ញា",
                  Icon: Activity,
                  valueEn: "High fever, body aches, severe cough, respiratory failure.",
                  valueKh: "គ្រុនក្ដៅខ្លាំង ឈឺខ្លួន ក្អកធ្ងន់ធ្ងរ ការបរាជ័យផ្លូវដង្ហើម។",
                },
                {
                  labelEn: "Worst pandemic",
                  labelKh: "ជំងឺរាតត្បាតអាក្រក់បំផុត",
                  Icon: Skull,
                  valueEn: "1918 'Spanish Flu': ~50 million deaths in 2 years.",
                  valueKh: "'ផ្ដាសាយអេស្ប៉ាញ' ១៩១៨ ៖ ~៥០ លាននាក់ស្លាប់ក្នុង ២ ឆ្នាំ។",
                },
              ]}
              cureEn="Annual updated vaccines that match the year's predicted mutating strains, plus antiviral drugs for severe cases."
              cureKh="វ៉ាក់សាំងធ្វើបច្ចុប្បន្នភាពប្រចាំឆ្នាំ ដែលផ្គូផ្គងនឹងវ៉ារ្យង់ដែលព្យាករណ៍ប្រចាំឆ្នាំ បូកនឹងថ្នាំប្រឆាំងវីរុសសម្រាប់ករណីធ្ងន់ធ្ងរ។"
              cureLabelEn="Control"
              cureLabelKh="ការគ្រប់គ្រង"
              CureIcon={Syringe}
            />

            {/* Polio */}
            <DiseaseProfileCard
              k={k}
              testId="disease-polio"
              variant="viral"
              era="VIRAL"
              eraEn="Peak: 1940s – 1950s"
              eraKh="កំពូលៈ ១៩៤០ – ១៩៥០"
              Icon={Activity}
              enName="Polio · ជំងឺស្វិតដៃជើង"
              khName="ជំងឺស្វិតដៃជើង · Polio"
              enSubtitle="A virus that attacks the nervous system"
              khSubtitle="វីរុសដែលវាយប្រហារប្រព័ន្ធសរសៃប្រសាទ"
              enBody="Polio is a virus that mostly attacks young children. It enters through the mouth (usually from contaminated water) and in the worst cases destroys the nerve cells that move the legs, leaving children with permanent paralysis. In the 1950s, parents in many countries lived in fear of summer pool seasons. After the Salk and Sabin vaccines arrived in the late 1950s, a massive global vaccination campaign almost completely eradicated the virus — only a few isolated cases remain in two countries today."
              khBody="ជំងឺស្វិតដៃជើងគឺជាវីរុសដែលភាគច្រើនវាយប្រហារកុមារតូច។ វាចូលតាមមាត់ (ជាធម្មតាពីទឹកដែលត្រូវបំពុល) ហើយក្នុងករណីធ្ងន់ធ្ងរបំផុត វាបំផ្លាញកោសិកាសរសៃប្រសាទដែលធ្វើឱ្យជើងផ្លាស់ទី ទុកកុមារដោយការខ្វិនពេញមួយជីវិត។ នៅទសវត្សរ៍ឆ្នាំ ១៩៥០ មាតាបិតានៅប្រទេសជាច្រើនបានរស់នៅក្នុងការភ័យខ្លាចនៃរដូវហែលទឹករដូវក្ដៅ។ បន្ទាប់ពីវ៉ាក់សាំង Salk និង Sabin បានមកដល់នៅចុងទសវត្សរ៍ឆ្នាំ ១៩៥០ យុទ្ធនាការវ៉ាក់សាំងសកលដ៏ធំសម្បើមបានស្ទើរតែលុបបំបាត់វីរុសទាំងស្រុង — មានតែករណីដាច់ដោយឡែកមួយចំនួនប៉ុណ្ណោះដែលនៅសល់ក្នុងប្រទេសពីរសព្វថ្ងៃនេះ។"
              facts={[
                {
                  labelEn: "Attacks",
                  labelKh: "វាយប្រហារ",
                  Icon: Microscope,
                  valueEn: "Nerve cells of the spine — usually in children under 5.",
                  valueKh: "កោសិកាសរសៃប្រសាទនៃឆ្អឹងខ្នង — ជាធម្មតាក្នុងកុមារអាយុក្រោម ៥ ឆ្នាំ។",
                },
                {
                  labelEn: "Symptoms",
                  labelKh: "រោគសញ្ញា",
                  Icon: Activity,
                  valueEn: "Permanent paralysis, mainly in children.",
                  valueKh: "ការខ្វិនពេញមួយជីវិត ភាគច្រើនក្នុងកុមារ។",
                },
                {
                  labelEn: "Spread by",
                  labelKh: "ផ្សព្វផ្សាយដោយ",
                  Icon: Droplet,
                  valueEn: "Contaminated water and food (fecal–oral route).",
                  valueKh: "ទឹក និងអាហារដែលត្រូវបំពុល (ផ្លូវកាក់សំណល់–មាត់)។",
                },
              ]}
              cureEn="Massive global vaccination campaigns (Salk & Sabin) have reduced cases by more than 99.9 % — eradication is within sight."
              cureKh="យុទ្ធនាការវ៉ាក់សាំងសកលដ៏ធំសម្បើម (Salk & Sabin) បានកាត់បន្ថយករណីលើសពី ៩៩,៩% — ការលុបបំបាត់ស្ថិតក្នុងចំងាយមើលឃើញ។"
              cureLabelEn="Control"
              cureLabelKh="ការគ្រប់គ្រង"
              CureIcon={Syringe}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 · THE ULTIMATE VICTORY — SMALLPOX
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="smallpox-victory"
          data-testid="section-smallpox-victory"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="03"
            en="The Ultimate Victory — Smallpox"
            kh="ជ័យជម្នះចុងក្រោយ — ជំងឺអុតធំ"
            k={k}
            Icon={Award}
            accent={VICTORY_DEEP}
          />

          {/* Hero victory banner */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 mb-5 overflow-hidden text-white"
            style={{
              background: `linear-gradient(135deg, ${VICTORY_DEEP} 0%, ${VICTORY} 55%, ${WHO_BLUE} 100%)`,
              boxShadow: `0 20px 50px -28px ${VICTORY_DEEP}cc`,
            }}
            data-testid="smallpox-banner"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              aria-hidden="true"
              style={{
                backgroundImage:
                  `radial-gradient(circle at 12% 12%, #ffffff44, transparent 35%),` +
                  `radial-gradient(circle at 88% 88%, #ffffff22, transparent 40%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Quote className="w-5 h-5 text-emerald-100" />
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : "font-mono"}`}
                  style={{ color: "#ecfccb" }}
                >
                  {T(
                    "WHO official declaration · 8 May 1980",
                    "សេចក្ដីប្រកាសផ្លូវការ WHO · ៨ ឧសភា ១៩៨០",
                  )}
                </span>
              </div>
              <p
                className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3 ${k ? "font-khmer leading-snug" : ""}`}
              >
                {T(
                  "Smallpox is the only human disease ever 100 % eradicated from the face of the Earth.",
                  "ជំងឺអុតធំ គឺជាជំងឺមនុស្សតែមួយគត់ដែលត្រូវបានលុបបំបាត់ ១០០% ពីផ្ទៃផែនដី។",
                )}
              </p>
              <p
                className={`text-sm sm:text-base text-white/85 ${!k ? "font-khmer leading-snug" : "italic"}`}
              >
                {!k
                  ? "ជំងឺអុតធំ គឺជាជំងឺមនុស្សតែមួយគត់ដែលត្រូវបានលុបបំបាត់ ១០០% ពីផ្ទៃផែនដី។"
                  : "Smallpox is the only human disease ever 100 % eradicated from the face of the Earth."}
              </p>

              {/* Big stats grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <BigStat valueEn="300M+" valueKh="៣០០ លាន+" labelEn="Killed in the 20th century alone" labelKh="ស្លាប់ក្នុងសតវត្សរ៍ទី ២០ តែម្នាក់ឯង" />
                <BigStat valueEn="0" valueKh="០"           labelEn="Cases since 1977"            labelKh="ករណីចាប់ពីឆ្នាំ ១៩៧៧" />
                <BigStat valueEn="≈ 13 yrs" valueKh="≈ ១៣ ឆ្នាំ" labelEn="Length of WHO eradication campaign" labelKh="រយៈពេលនៃយុទ្ធនាការ WHO" />
              </div>
            </div>
          </div>

          {/* Two-column explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symptoms card */}
            <div
              className="rounded-3xl p-5 sm:p-6 border-2 flex flex-col gap-3"
              style={{
                backgroundColor: PAPER,
                borderColor: `${CRIMSON}55`,
              }}
              data-testid="smallpox-symptoms"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${CRIMSON}1f`,
                    border: `1px solid ${CRIMSON}55`,
                  }}
                >
                  <Skull className="w-5 h-5" style={{ color: CRIMSON }} />
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
                    style={{ color: INK }}
                  >
                    {T("The Disease", "ជំងឺ")}
                  </h3>
                  <div
                    className={`text-[12px] mt-0.5 ${k ? "font-khmer leading-loose" : "italic"}`}
                    style={{ color: CRIMSON_DEEP }}
                  >
                    {T("Variola virus · ≈ 30 % fatality rate", "វីរុស Variola · អត្រាស្លាប់ ≈ ៣០%")}
                  </div>
                </div>
              </div>
              <p
                className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: INK_SOFT }}
              >
                {T(
                  "Smallpox arrived with high fever and exhaustion, then covered the body in painful pustules — small blisters filled with virus. The pustules left deep, lifelong scars on every survivor. About 1 in 3 people who caught it died, and many of those who lived were left blind. For 3,000 years it shaped human history: it killed pharaohs, emperors, and entire indigenous nations.",
                  "ជំងឺអុតធំចាប់ផ្ដើមមកជាមួយគ្រុនក្ដៅខ្លាំង និងភាពអស់កម្លាំង បន្ទាប់មកគ្របរាងកាយដោយដុំពកដែលឈឺ — ដុំសារធាតុរាវតូចៗ ដែលពេញដោយវីរុស។ ដុំពកទុកស្នាមជ្រៅស្ថិតស្ថេរពេញមួយជីវិតលើអ្នករួចជីវិតគ្រប់គ្នា។ ប្រហែល ១ ក្នុង ៣ នៃអ្នកដែលឆ្លងជំងឺបានស្លាប់ ហើយអ្នករស់រានជាច្រើនបានក្លាយជាមនុស្សពិការភ្នែក។ អស់រយៈពេល ៣,០០០ ឆ្នាំ វាបានកំណត់ប្រវត្តិសាស្ត្រមនុស្ស ៖ វាបានសម្លាប់ផារ៉ោន អធិរាជ និងប្រជាជនជនជាតិដើមទាំងប្រទេស។",
                )}
              </p>
              <ul className="flex flex-col gap-2 mt-1">
                <SymptomLine k={k} en="High fever and severe exhaustion" kh="គ្រុនក្ដៅខ្លាំង និងភាពអស់កម្លាំងធ្ងន់ធ្ងរ" />
                <SymptomLine k={k} en="Painful, scarring skin pustules covering the whole body" kh="ដុំពកស្បែកដែលឈឺ និងបន្សល់ស្នាម គ្របរាងកាយទាំងមូល" />
                <SymptomLine k={k} en="Lifelong disfiguring scars on every survivor" kh="ស្នាមផ្លាស់ប្ដូររូបរាងពេញមួយជីវិតលើអ្នករួចជីវិតគ្រប់គ្នា" />
                <SymptomLine k={k} en="Roughly 30 % of cases were fatal" kh="ប្រហែល ៣០% នៃករណីបាននាំទៅរកការស្លាប់" />
              </ul>
            </div>

            {/* The eradication card */}
            <div
              className="rounded-3xl p-5 sm:p-6 border-2 flex flex-col gap-3"
              style={{
                backgroundColor: PAPER,
                borderColor: `${VICTORY}55`,
              }}
              data-testid="smallpox-eradication"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${VICTORY}1f`,
                    border: `1px solid ${VICTORY}55`,
                  }}
                >
                  <Award className="w-5 h-5" style={{ color: VICTORY_DEEP }} />
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
                    style={{ color: INK }}
                  >
                    {T("How We Erased It", "របៀបដែលយើងបានលុបបំបាត់វា")}
                  </h3>
                  <div
                    className={`text-[12px] mt-0.5 ${k ? "font-khmer leading-loose" : "italic"}`}
                    style={{ color: VICTORY_DEEP }}
                  >
                    {T("WHO global vaccination · 1967 – 1980", "ការចាក់វ៉ាក់សាំងសកល WHO · ១៩៦៧ – ១៩៨០")}
                  </div>
                </div>
              </div>
              <p
                className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: INK_SOFT }}
              >
                {T(
                  "Smallpox had two unique weaknesses: it lived only in humans (no animals), and one shot of the vaccine gave lifetime immunity. Starting in 1967, the World Health Organization launched a brilliant global campaign called 'ring vaccination' — every time a single new case was found, doctors raced to vaccinate every single person around the patient, then every person around them. Slowly, the virus had nowhere left to spread. The very last natural case on Earth was a Somali cook named Ali Maow Maalin, on 26 October 1977.",
                  "ជំងឺអុតធំមានចំណុចខ្សោយតែមួយ ៖ វារស់នៅតែក្នុងមនុស្សប៉ុណ្ណោះ (មិនមែនសត្វទេ) ហើយវ៉ាក់សាំងតែមួយដូសផ្ដល់ភាពស៊ាំពេញមួយជីវិត។ ចាប់ផ្ដើមឆ្នាំ ១៩៦៧ អង្គការសុខភាពពិភពលោក (WHO) បានបើកយុទ្ធនាការសកលដ៏ល្អឥតខ្ចោះមួយដែលហៅថា 'ការចាក់វ៉ាក់សាំងជារង្វង់' — រាល់ពេលដែលករណីថ្មីមួយត្រូវបានរកឃើញ វេជ្ជបណ្ឌិតប្រញាប់ចាក់វ៉ាក់សាំងដល់មនុស្សគ្រប់គ្នាជុំវិញអ្នកជំងឺ បន្ទាប់មកមនុស្សគ្រប់គ្នាជុំវិញពួកគេ។ បន្តិចម្ដងៗ វីរុសគ្មានកន្លែងរីករាលដាល។ ករណីធម្មជាតិចុងក្រោយបង្អស់នៅផែនដី គឺចុងភៅសូម៉ាលីម្នាក់ឈ្មោះ Ali Maow Maalin នៅថ្ងៃទី ២៦ តុលា ១៩៧៧។",
                )}
              </p>
              <div
                className="rounded-xl p-3 mt-1 flex items-start gap-3"
                style={{
                  backgroundColor: VICTORY_SOFT,
                  border: `1.5px solid ${VICTORY}`,
                }}
              >
                <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5" style={{ color: VICTORY_DEEP }} />
                <div>
                  <div
                    className={`font-bold text-sm ${k ? "font-khmer" : ""}`}
                    style={{ color: VICTORY_DEEP }}
                  >
                    {T(
                      "Today, nobody catches smallpox anymore.",
                      "សព្វថ្ងៃនេះ គ្មាននរណាម្នាក់ឆ្លងជំងឺអុតធំទៀតទេ។",
                    )}
                  </div>
                  <div
                    className={`text-[13px] mt-0.5 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
                    style={{ color: INK_SOFT }}
                  >
                    {T(
                      "The virus exists only in two high-security freezers (in the USA and Russia), and even routine vaccination has been stopped — proof of total victory.",
                      "វីរុសនៅរស់តែក្នុងម៉ាស៊ីនកកសុវត្ថិភាពខ្ពស់ ២ ប៉ុណ្ណោះ (នៅសហរដ្ឋអាមេរិក និងរុស្ស៊ី) ហើយសូម្បីតែការចាក់វ៉ាក់សាំងធម្មតាក៏ត្រូវបានបញ្ឈប់ដែរ — ភស្តុតាងនៃជ័យជម្នះពេញលេញ។",
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing reflection */}
          <div
            className="mt-5 rounded-2xl p-4 sm:p-5 border flex items-start gap-3"
            style={{ backgroundColor: WHO_BLUE_SOFT, borderColor: `${WHO_BLUE}55` }}
          >
            <Globe className="flex-shrink-0 w-6 h-6" style={{ color: WHO_BLUE }} />
            <p
              className={`text-sm sm:text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              <span className="font-bold" style={{ color: WHO_BLUE }}>
                {T("The lesson:", "មេរៀន ៖")}{" "}
              </span>
              {T(
                "Three thousand years of suffering ended in just thirteen years of organised, global cooperation — driven by science, vaccines, and the simple belief that every village on Earth is worth protecting.",
                "ការឈឺចាប់រយៈពេល ៣ ពាន់ឆ្នាំ បានបញ្ចប់ក្នុងរយៈពេលត្រឹមតែ ១៣ ឆ្នាំ នៃកិច្ចសហប្រតិបត្តិការសកលមានរៀបចំ — បើកបរដោយវិទ្យាសាស្ត្រ វ៉ាក់សាំង និងជំនឿសាមញ្ញដែលថា ភូមិគ្រប់ៗនៅលើផែនដី សមនឹងទទួលការការពារ។",
              )}
            </p>
          </div>
        </section>

        {/* ── Cross-links footer ───────────────────────────────────── */}
        <div
          className="rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          style={{
            backgroundColor: BIO_SOFT,
            borderColor: `${BIO}55`,
          }}
        >
          <FlaskConical className="w-6 h-6 flex-shrink-0" style={{ color: BIO_DEEP }} />
          <p
            className={`text-xs sm:text-sm flex-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "Keep learning: see the public-health side of clean water in",
              "បន្តរៀន ៖ មើលផ្នែកសុខភាពសាធារណៈនៃទឹកស្អាតក្នុង",
            )}{" "}
            <Link
              href="/technology/plumbing#evolution-of-sanitation"
              className="font-bold underline"
              style={{ color: BIO_DEEP }}
            >
              {T("The Evolution of Sanitation", "ការវិវត្តនៃអនាម័យ")}
            </Link>
            {", "}{T("the science of medicine in", "វិទ្យាសាស្ត្រវេជ្ជសាស្ត្រក្នុង")}{" "}
            <Link
              href="/pathway-to-medicine"
              className="font-bold underline"
              style={{ color: BIO_DEEP }}
            >
              {T("Pathway to Medicine", "ផ្លូវទៅរកវេជ្ជសាស្ត្រ")}
            </Link>
            {", "}{T("and", "និង")}{" "}
            <Link
              href="/well-being/public-health"
              className="font-bold underline"
              style={{ color: BIO_DEEP }}
            >
              {T("Public Health", "សុខភាពសាធារណៈ")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tiny helpers ──────────────────────────────────────────────────────────

function HeroStat({
  k,
  accent,
  valueEn,
  valueKh,
  labelEn,
  labelKh,
}: {
  k: boolean;
  accent: string;
  valueEn: string;
  valueKh: string;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div
      className="rounded-xl border-2 px-3 py-2 text-center bg-white"
      style={{ borderColor: `${accent}88` }}
    >
      <div
        className={`font-extrabold text-base sm:text-xl leading-none ${k ? "font-khmer" : ""}`}
        style={{ color: accent }}
      >
        {k ? valueKh : valueEn}
      </div>
      <div
        className={`text-[10px] sm:text-[11px] mt-1 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? labelKh : labelEn}
      </div>
    </div>
  );
}

function BigStat({
  valueEn,
  valueKh,
  labelEn,
  labelKh,
}: {
  valueEn: string;
  valueKh: string;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm px-4 py-3 text-center">
      <div className="font-extrabold text-2xl sm:text-3xl text-white leading-none">
        {valueEn}
      </div>
      <div className="font-khmer text-base sm:text-lg text-emerald-50 leading-loose mt-0.5">
        {valueKh}
      </div>
      <div className="text-[11px] uppercase tracking-widest text-emerald-50/90 mt-1.5 font-mono">
        {labelEn}
      </div>
      <div className="font-khmer text-[11px] text-emerald-50/90 leading-loose mt-0.5">
        {labelKh}
      </div>
    </div>
  );
}

function SymptomLine({ k, en, kh }: { k: boolean; en: string; kh: string }) {
  return (
    <li className="flex items-start gap-2">
      <span
        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
        style={{ backgroundColor: CRIMSON }}
        aria-hidden="true"
      />
      <span
        className={`text-[13px] sm:text-sm ${k ? "font-khmer leading-loose" : "leading-snug"}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </span>
    </li>
  );
}

export default PandemicsHistoryPage;
