import { Link } from "wouter";
import {
  ArrowLeft,
  Lock,
  Key,
  KeyRound,
  Cog,
  Wrench,
  Cpu,
  Hammer,
  Ruler,
  Shield,
  Sparkles,
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-TECH-LOCKS · Locks & Keys: Mechanical Passwords
//                  សោរ និងកូនសោរ៖ ពាក្យសម្ងាត់មេកានិច
//
//  Sub-module under /technology.
//
//  Three cards:
//    1. The Pin Tumbler — anatomy + the shear line
//    2. The Key as a Password — the cuts that align the pins
//    3. The Career of a Locksmith — physical security engineer skills
//
//  Aesthetic: brass gold + polished steel grey on a dark blueprint
//  background. Precise, technical, mechanical.
// ════════════════════════════════════════════════════════════════════════════

const BRASS = "#b45309";          // amber-700
const BRASS_BRIGHT = "#d97706";   // amber-600
const BRASS_LIGHT = "#fde68a";    // amber-200
const BRASS_GLOW = "#fffbeb";     // amber-50

const STEEL = "#475569";          // slate-600
const STEEL_LIGHT = "#cbd5e1";    // slate-300
const STEEL_PALE = "#e2e8f0";     // slate-200

const BLUEPRINT_DEEP = "#0b1220";
const BLUEPRINT = "#111c2e";
const BLUEPRINT_LINE = "rgba(148, 163, 184, 0.18)";

const INK = "#0f172a";

const PAGE_BG: React.CSSProperties = {
  background:
    `radial-gradient(900px 500px at 90% -10%, rgba(217, 119, 6, 0.12), transparent 70%), ` +
    `radial-gradient(800px 500px at 0% 110%, rgba(71, 85, 105, 0.10), transparent 70%), ` +
    `linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%)`,
};

const BLUEPRINT_BG: React.CSSProperties = {
  background: `linear-gradient(180deg, ${BLUEPRINT_DEEP}, ${BLUEPRINT})`,
  backgroundImage:
    `linear-gradient(180deg, ${BLUEPRINT_DEEP}, ${BLUEPRINT}), ` +
    `linear-gradient(${BLUEPRINT_LINE} 1px, transparent 1px), ` +
    `linear-gradient(90deg, ${BLUEPRINT_LINE} 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 28px 28px, 28px 28px",
};

export default function LockMechanicsPage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-800" style={PAGE_BG}>
      {/* ── Top: back link ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: BRASS }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: BRASS_GLOW,
            border: `1px solid ${BRASS_BRIGHT}55`,
            color: BRASS,
          }}
        >
          <Cog className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Technology · Locks & Keys", "បច្ចេកវិទ្យា · សោរ និងកូនសោរ")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {k ? (
            <>
              សោរ និងកូនសោរ៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRASS}, ${BRASS_BRIGHT}, ${STEEL})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ពាក្យសម្ងាត់មេកានិច
              </span>
            </>
          ) : (
            <>
              Locks & Keys:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRASS}, ${BRASS_BRIGHT}, ${STEEL})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mechanical Passwords
              </span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-700 max-w-3xl text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "A lock is a tiny machine that asks a question — and a key is the only answer it will accept. Crack open the most common lock in the world, see how a pattern of metal teeth becomes a physical password, and meet the engineers who design and defeat these silent guardians.",
            "សោរគឺជាម៉ាស៊ីនតូចមួយដែលសួរសំណួរ — ហើយកូនសោរគឺជាចម្លើយតែមួយគត់ដែលវានឹងទទួលយក។ បើកមើលសោរដែលប្រើច្រើនបំផុតនៅលើពិភពលោក មើលរបៀបដែលគំរូនៃធ្មេញដែកក្លាយជាពាក្យសម្ងាត់រូបវន្ត និងស្គាល់វិស្វករដែលរចនា និងវាយឆ្លងពួកវា។",
          )}
        </p>

        {/* Three quick stat tiles */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatTile
            icon={Layers}
            valueEn="5–6 pins"
            valueKh="ម្ជុល ៥–៦"
            descEn="Inside a typical house lock"
            descKh="នៅក្នុងសោរផ្ទះធម្មតា"
          />
          <StatTile
            icon={Ruler}
            valueEn="≈ 0.05 mm"
            valueKh="≈ ០.០៥ មម"
            descEn="Tolerance per pin cut"
            descKh="ភាពច្បាស់លាស់ក្នុងការកាត់ម្ជុល"
          />
          <StatTile
            icon={KeyRound}
            valueEn="1 unique key"
            valueKh="កូនសោរ ១ ប្លែក"
            descEn="Out of millions of possibilities"
            descKh="ក្នុងចំណោមលទ្ធភាពរាប់លាន"
          />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · The Pin Tumbler
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-pin-tumbler"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 01 · The mechanism"
          tagKh="កាត ០១ · យន្តការ"
          icon={Lock}
          accent="brass"
          titleEn="The Pin Tumbler"
          titleKh="សោរម្ជុលកន្លាស់"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t("The ", "")}
            <strong>{t("pin tumbler lock ", "សោរម្ជុលកន្លាស់ ")}</strong>
            {t(
              "is the most common lock in the world. The one on your front door, your school gate, your filing cabinet — almost certainly a pin tumbler. The Egyptians invented an early version of it more than ",
              "គឺជាសោរដែលប្រើច្រើនបំផុតនៅលើពិភពលោក។ សោរនៅទ្វារផ្ទះអ្នក នៅទ្វារសាលា នៅទូឯកសារ — ស្ទើរតែប្រាកដជាសោរម្ជុលកន្លាស់។ ជនជាតិអេហ្ស៊ីបបានបង្កើតកំណែដំបូងរបស់វាជាង ",
            )}
            <strong style={{ color: BRASS }}>
              {t("4,000 years ago.", "៤,០០០ ឆ្នាំមុន។")}
            </strong>
            {t(
              " The American locksmith Linus Yale Jr. perfected the modern version in 1861, and the basic design has barely changed since.",
              " ជាងសោរអាមេរិកាំងឈ្មោះ Linus Yale Jr. បានធ្វើឱ្យកំណែទំនើបនេះមានភាពល្អឥតខ្ចោះក្នុងឆ្នាំ ១៨៦១ ហើយការរចនាមូលដ្ឋាននេះស្ទើរតែមិនបានផ្លាស់ប្តូរទាល់តែសោះ។",
            )}
          </p>

          {/* ── Anatomy diagram ── */}
          <h3
            className={`text-sm font-bold mt-5 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: BRASS }}
          >
            {t("The Anatomy", "កាយវិភាគសាស្ត្រ")}
          </h3>

          <div
            className="rounded-2xl p-5 sm:p-6 text-slate-100 mb-5"
            style={BLUEPRINT_BG}
            data-testid="pin-tumbler-diagram"
          >
            <PinTumblerDiagram k={k} state="locked" />
            <p
              className={`text-slate-300 text-xs mt-4 max-w-2xl mx-auto text-center ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Inside the cylinder, a row of small metal pins is pushed downward by tiny springs. Each pin is cut into two pieces — a top half and a bottom half — at a different height than the next.",
                "នៅខាងក្នុងស៊ីឡាំង ជួរម្ជុលដែកតូចៗត្រូវបានរុញចុះក្រោមដោយរ៉ឺស័រតូចៗ។ ម្ជុលនីមួយៗត្រូវបានកាត់ជាពីរបំណែក — ផ្នែកខាងលើ និងផ្នែកខាងក្រោម — នៅកម្ពស់ខុសៗគ្នាពីមួយទៅមួយ។",
              )}
            </p>
          </div>

          {/* ── Component breakdown ── */}
          <div className="grid sm:grid-cols-2 gap-3" data-testid="pin-tumbler-parts">
            <PartTile
              icon={Layers}
              en="Outer Housing"
              kh="ស្រោមខាងក្រៅ"
              descEn="The fixed steel shell that holds everything in place. It does not move."
              descKh="ស្រោមដែករឹងដែលកាន់គ្រប់ផ្នែកនៅនឹងកន្លែង។ វាមិនផ្លាស់ទីទេ។"
            />
            <PartTile
              icon={Cog}
              en="Cylinder (Plug)"
              kh="ស៊ីឡាំង (កូនសោរ)"
              descEn="The rotating core that the key slides into. When it turns, the bolt opens."
              descKh="ស្នូលដែលវិល ដែលកូនសោរស៊កចូល។ ពេលវាវិល ស្ពាន់សោរបើក។"
            />
            <PartTile
              icon={Sparkles}
              en="Driver Pins (top)"
              kh="ម្ជុលរុញ (ខាងលើ)"
              descEn="Pushed down by springs. Their job is to block the cylinder."
              descKh="ត្រូវរុញចុះក្រោមដោយរ៉ឺស័រ។ ការងាររបស់វាគឺបិទស៊ីឡាំង។"
            />
            <PartTile
              icon={KeyRound}
              en="Key Pins (bottom)"
              kh="ម្ជុលកូនសោរ (ខាងក្រោម)"
              descEn="Sit on top of the key. Their lengths vary so only the right key lifts them correctly."
              descKh="អង្គុយលើកូនសោរ។ ប្រវែងរបស់វាខុសៗគ្នា ដូច្នេះមានតែកូនសោរត្រឹមត្រូវប៉ុណ្ណោះដែលលើកវាបានត្រឹមត្រូវ។"
            />
          </div>

          {/* ── The Shear Line ── */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STEEL }}
          >
            {t("The Shear Line", "ខ្សែបន្ទាត់កាត់")}
          </h3>

          <Callout color={STEEL} bg="#f1f5f9" icon={ShieldCheck}>
            <strong>
              {t(
                "The shear line is the gap between the rotating cylinder and the fixed outer housing. ",
                "ខ្សែបន្ទាត់កាត់គឺជាចន្លោះរវាងស៊ីឡាំងដែលវិល និងស្រោមខាងក្រៅដែលនៅនឹង។ ",
              )}
            </strong>
            {t(
              "When no key is inserted, the springs push every driver pin down so it sits across this gap — half in the cylinder, half in the housing. As long as a single pin crosses the line, the cylinder is physically locked. The pins act like a row of bolts welding the rotating part to the fixed part.",
              "នៅពេលគ្មានកូនសោរស៊ក រ៉ឺស័រនឹងរុញម្ជុលរុញនីមួយៗចុះក្រោម ដូច្នេះវាអង្គុយឆ្លងកាត់ចន្លោះនេះ — ពាក់កណ្ដាលនៅក្នុងស៊ីឡាំង ពាក់កណ្ដាលនៅក្នុងស្រោម។ ដរាបណាមានម្ជុលតែមួយឆ្លងកាត់ខ្សែបន្ទាត់ ស៊ីឡាំងត្រូវបានចាក់សោរដោយរូបវិទ្យា។ ម្ជុលនេះដើរតួដូចស្ពានដែលផ្សាភ្ជាប់ផ្នែកដែលវិលទៅនឹងផ្នែកដែលនៅនឹង។",
            )}
          </Callout>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · The Key as a Password
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-key-password"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 02 · The solution"
          tagKh="កាត ០២ · ដំណោះស្រាយ"
          icon={Key}
          accent="brass"
          titleEn="The Key as a Password"
          titleKh="កូនសោរជាពាក្យសម្ងាត់"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Look at any house key. The jagged teeth along the top edge are not random decorations — they are ",
              "មើលកូនសោរផ្ទះណាមួយ។ ធ្មេញខ្ទាស់នៅគែមខាងលើមិនមែនជាការតុបតែងចៃដន្យទេ — វាជា ",
            )}
            <strong style={{ color: BRASS }}>
              {t("precise measurements,", "រង្វាស់ជាក់លាក់")}
            </strong>
            {t(
              " typically cut to one of about ten possible heights at five or six positions. Each cut corresponds to one pin inside the lock.",
              " ជាធម្មតាកាត់ទៅកម្ពស់មួយក្នុងចំណោមកម្ពស់ប្រហែល ១០ ដែលអាចមានបាន នៅទីតាំង ៥ ឬ ៦។ ការកាត់នីមួយៗត្រូវនឹងម្ជុលមួយនៅខាងក្នុងសោរ។",
            )}
          </p>

          {/* ── Unlocked diagram ── */}
          <div
            className="rounded-2xl p-5 sm:p-6 text-slate-100 mb-5"
            style={BLUEPRINT_BG}
            data-testid="pin-tumbler-unlocked-diagram"
          >
            <PinTumblerDiagram k={k} state="unlocked" />
            <p
              className={`text-slate-300 text-xs mt-4 max-w-2xl mx-auto text-center ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "When the correct key slides in, each tooth lifts its matching pin to a different height. The cuts between the top and bottom halves of every pin line up exactly at the shear line — the wall vanishes, and the cylinder is free to turn.",
                "នៅពេលកូនសោរត្រឹមត្រូវស៊កចូល ធ្មេញនីមួយៗលើកម្ជុលដែលផ្គូផ្គងទៅកម្ពស់ខុសៗគ្នា។ ការកាត់រវាងផ្នែកខាងលើ និងផ្នែកខាងក្រោមនៃម្ជុលនីមួយៗតម្រឹមឱ្យត្រឹមត្រូវនៅខ្សែបន្ទាត់កាត់ — ជញ្ជាំងបាត់ ហើយស៊ីឡាំងអាចវិលបាន។",
              )}
            </p>
          </div>

          {/* ── Right vs wrong key ── */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: BRASS }}
          >
            {t("Right key vs. wrong key", "កូនសោរត្រឹមត្រូវ ទល់នឹងកូនសោរខុស")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <KeyComparePanel
              tone="bad"
              labelEn="Wrong key"
              labelKh="កូនសោរខុស"
              k={k}
              items={[
                {
                  en: "Some pins are pushed too high — the cut sits inside the housing.",
                  kh: "ម្ជុលខ្លះត្រូវបានរុញខ្ពស់ពេក — ការកាត់នៅខាងក្នុងស្រោម។",
                },
                {
                  en: "Other pins are not pushed enough — the cut sits inside the cylinder.",
                  kh: "ម្ជុលផ្សេងទៀតមិនត្រូវបានរុញគ្រប់គ្រាន់ទេ — ការកាត់នៅខាងក្នុងស៊ីឡាំង។",
                },
                {
                  en: "Even one misaligned pin is enough to keep the wall in place.",
                  kh: "សូម្បីម្ជុលមួយដែលមិនតម្រឹម ក៏គ្រប់គ្រាន់ដើម្បីរក្សាជញ្ជាំងនៅនឹងកន្លែង។",
                },
              ]}
            />
            <KeyComparePanel
              tone="good"
              labelEn="Right key"
              labelKh="កូនសោរត្រឹមត្រូវ"
              k={k}
              items={[
                {
                  en: "Every cut on the key matches the length of one pin.",
                  kh: "ការកាត់នីមួយៗលើកូនសោរត្រូវនឹងប្រវែងម្ជុលមួយ។",
                },
                {
                  en: "All five or six pin gaps line up exactly at the shear line.",
                  kh: "គម្លាតម្ជុលទាំង ៥ ឬ ៦ តម្រឹមឱ្យត្រឹមត្រូវនៅខ្សែបន្ទាត់កាត់។",
                },
                {
                  en: "The wall disappears for a fraction of a second — the cylinder turns and the bolt slides open.",
                  kh: "ជញ្ជាំងបាត់ក្នុងរយៈពេលប៉ុន្មានភាគរយវិនាទី — ស៊ីឡាំងវិល ហើយស្ពាន់សោរស្រូបបើក។",
                },
              ]}
            />
          </div>

          <Callout color={BRASS} bg={BRASS_GLOW} icon={Sparkles}>
            <strong>
              {t(
                "A key is a physical password. ",
                "កូនសោរគឺជាពាក្យសម្ងាត់រូបវន្ត។ ",
              )}
            </strong>
            {t(
              "Each cut is one digit. A 6-pin lock with 10 possible depths gives 10⁶ — one million — possible keys. The teeth are not 'random shapes' — they are a number written in metal that the lock checks instantly.",
              "ការកាត់នីមួយៗជាលេខមួយ។ សោរ ៦ ម្ជុលដែលមានជម្រៅ ១០ ផ្តល់នូវ ១០⁶ — មួយលាន — នៃកូនសោរដែលអាចមាន។ ធ្មេញមិនមែនជា «រូបរាងចៃដន្យ» ទេ — វាជាលេខដែលសរសេរក្នុងលោហៈ ដែលសោរត្រួតពិនិត្យភ្លាមៗ។",
            )}
          </Callout>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · The Career of a Locksmith
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-career"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <Card
          tagEn="Card 03 · The career"
          tagKh="កាត ០៣ · អាជីព"
          icon={Wrench}
          accent="steel"
          titleEn="The Career of a Locksmith"
          titleKh="អាជីពជាជាងសោរ"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Most people picture a locksmith as someone who makes a copy of a key at the corner shop. That is a small part of the job. A real locksmith is a ",
              "មនុស្សភាគច្រើនស្រមៃថាជាងសោរគឺជាមនុស្សដែលថតចម្លងកូនសោរនៅហាងជ្រុងផ្លូវ។ នោះគ្រាន់តែជាផ្នែកតូចមួយនៃការងារប៉ុណ្ណោះ។ ជាងសោរពិតប្រាកដគឺជា ",
            )}
            <strong style={{ color: STEEL }}>
              {t("physical security engineer.", "វិស្វករសុវត្ថិភាពរូបវន្ត។")}
            </strong>
            {t(
              " They install master-key systems for entire hospitals, design vault doors for banks, recover keys lost inside cars, open safes after the owner forgets the combination, and install electronic access systems for office buildings. They are called when ordinary systems break — which means they must understand more than the people who installed them.",
              " ពួកគេដំឡើងប្រព័ន្ធកូនសោរមេសម្រាប់មន្ទីរពេទ្យទាំងមូល រចនាទ្វារទូដាក់ប្រាក់សម្រាប់ធនាគារ យកកូនសោរដែលបាត់នៅខាងក្នុងរថយន្ត បើកទូដាក់ប្រាក់បន្ទាប់ពីម្ចាស់ភ្លេចលេខកូដ និងដំឡើងប្រព័ន្ធចូលអេឡិចត្រូនិកសម្រាប់អគារការិយាល័យ។ ពួកគេត្រូវបានហៅនៅពេលប្រព័ន្ធធម្មតាបាក់ស្រុត — ដែលមានន័យថា ពួកគេត្រូវយល់ច្រើនជាងមនុស្សដែលបានដំឡើងពួកវា។",
            )}
          </p>

          {/* ── The four core skills ── */}
          <h3
            className={`text-sm font-bold mt-5 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STEEL }}
          >
            {t("The four core skills", "ជំនាញស្នូលទាំងបួន")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 mb-6" data-testid="locksmith-skills-grid">
            <SkillTile
              icon={Ruler}
              en="Micro-mechanics"
              kh="មីក្រូ-មេកានិច"
              descEn="Working with parts measured in fractions of a millimetre. A 0.05 mm error and the lock either jams shut or refuses to lock at all."
              descKh="ធ្វើការជាមួយផ្នែកដែលវាស់ជាប្រភាគនៃមីលីម៉ែត្រ។ កំហុសត្រឹម ០.០៥ មម ហើយសោរនឹងជាប់ ឬមិនចាក់ទាល់តែសោះ។"
            />
            <SkillTile
              icon={Layers}
              en="Spatial reasoning"
              kh="ការវែកញែកអំពីលំហ"
              descEn="Picturing in your head the inside of a mechanism you cannot see, predicting how a pin will move when a tool touches it from a sideways angle."
              descKh="ស្រមៃក្នុងក្បាលអ្នកអំពីផ្នែកខាងក្នុងនៃយន្តការដែលអ្នកមើលមិនឃើញ ទាយរបៀបដែលម្ជុលនឹងផ្លាស់ទីនៅពេលឧបករណ៍ប៉ះវាពីមុំចំហៀង។"
            />
            <SkillTile
              icon={Hammer}
              en="Metalworking"
              kh="ជំនាញលោហៈ"
              descEn="Filing key blanks by hand, grinding new pins to length, drilling out broken cylinders. Hands that know steel by sound and feel."
              descKh="សន្ទូចគែមកូនសោរទទេដោយដៃ កិនម្ជុលថ្មីឱ្យបានប្រវែង ចោះស៊ីឡាំងដែលខូច។ ដៃដែលស្គាល់ដែកដោយសំឡេង និងអារម្មណ៍។"
            />
            <SkillTile
              icon={Cpu}
              en="Electronics"
              kh="អេឡិចត្រូនិក"
              descEn="Modern smart locks use motors, fingerprint sensors, Bluetooth and Wi-Fi. A locksmith today must read circuit diagrams, swap controller boards, and reprogram chips."
              descKh="សោរឆ្លាតវ័យទំនើបប្រើម៉ូទ័រ ឧបករណ៍អានស្នាមម្រាមដៃ ប្ល៊ូធូស និង Wi-Fi។ ជាងសោរសព្វថ្ងៃត្រូវអានគំនូសសៀគ្វី ប្តូរបន្ទះបញ្ជា និងសរសេរកម្មវិធីឱ្យបន្ទះឈីបឡើងវិញ។"
            />
          </div>

          {/* ── The mindset ── */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: BRASS }}
          >
            {t("Why this is a problem-solver's job", "ហេតុអ្វីនេះជាការងាររបស់អ្នកដោះស្រាយបញ្ហា")}
          </h3>

          <div
            className="rounded-xl p-5"
            style={{
              background: `linear-gradient(135deg, ${BRASS_GLOW}, #ffffff 60%, #f1f5f9)`,
              border: `1px dashed ${BRASS_BRIGHT}66`,
            }}
            data-testid="locksmith-mindset"
          >
            <div className="flex items-start gap-3">
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-md flex-shrink-0"
                style={{ backgroundColor: "#ffffff", color: BRASS }}
              >
                <Zap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className={`text-slate-800 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "A locksmith is called when ",
                    "ជាងសោរត្រូវបានហៅនៅពេល ",
                  )}
                  <strong style={{ color: BRASS }}>
                    {t(
                      "the normal solution has already failed.",
                      "ដំណោះស្រាយធម្មតាបានបរាជ័យហើយ។",
                    )}
                  </strong>
                  {t(
                    " The key is lost. The lock is jammed. The safe combination is forgotten. The smart lock has stopped responding. There is no manual to follow — there is only a problem and a person who refuses to give up. Every job is a small puzzle that no two people would solve the same way. That is why locksmithing remains one of the most respected technical trades in the world: it cannot be automated, it cannot be rushed, and it cannot be faked.",
                    " កូនសោរបាត់។ សោរជាប់។ លេខកូដទូដាក់ប្រាក់ភ្លេច។ សោរឆ្លាតវ័យឈប់ឆ្លើយតប។ គ្មានសៀវភៅណែនាំសម្រាប់អនុវត្តតាមទេ — មានតែបញ្ហា និងមនុស្សដែលមិនព្រមបោះបង់។ រាល់ការងារគឺជាល្បែងផ្គុំរូបតូចមួយ ដែលគ្មានមនុស្សពីរនាក់នឹងដោះស្រាយដូចគ្នាទេ។ នេះហើយជាមូលហេតុដែលជំនាញសោរនៅតែជាវិជ្ជាជីវៈបច្ចេកទេសដែលត្រូវបានគេគោរពបំផុតមួយនៅលើពិភពលោក ៖ វាមិនអាចស្វ័យប្រវត្តិកម្មបានទេ មិនអាចប្រញាប់បានទេ និងមិនអាចក្លែងបន្លំបានទេ។",
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${BLUEPRINT_DEEP} 0%, #1e293b 55%, ${BRASS} 130%)`,
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(217, 119, 6, 0.35)" }}
            aria-hidden="true"
          />
          <Shield className="w-10 h-10 mx-auto mb-3" style={{ color: BRASS_LIGHT }} aria-hidden="true" />
          <h3 className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${k ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Every lock is a question. Every key is an answer.",
              "សោរនីមួយៗគឺជាសំណួរ។ កូនសោរនីមួយៗគឺជាចម្លើយ។",
            )}
          </h3>
          <p className={`text-sm sm:text-base text-slate-200 max-w-2xl mx-auto ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Behind every door, gate and safe is a tiny mechanical conversation that has been refined for four thousand years. The locksmiths who understand it are quiet engineers — half craftsman, half problem-solver — and the world will always need them.",
              "នៅពីក្រោយទ្វារនីមួយៗ ខ្លោងទ្វារ និងទូដាក់ប្រាក់ មានការសន្ទនាមេកានិចតូចមួយដែលត្រូវបានកែសម្រួលអស់រយៈពេលបួនពាន់ឆ្នាំ។ ជាងសោរដែលយល់វាគឺជាវិស្វករស្ងាត់ៗ — ពាក់កណ្ដាលជាសិប្បករ ពាក់កណ្ដាលជាអ្នកដោះស្រាយបញ្ហា — ហើយពិភពលោកនឹងតែងតែត្រូវការពួកគេ។",
            )}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 flex-wrap justify-center">
            <Pill icon={Lock} en="Pin Tumbler" kh="សោរម្ជុលកន្លាស់" k={k} />
            <Pill icon={Key} en="Mechanical Password" kh="ពាក្យសម្ងាត់មេកានិច" k={k} />
            <Pill icon={Wrench} en="Security Engineer" kh="វិស្វករសុវត្ថិភាព" k={k} />
          </div>
        </div>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-bold shadow hover:opacity-90 transition-opacity tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "uppercase"}`}
          style={{ backgroundColor: BRASS }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks
// ════════════════════════════════════════════════════════════════════════════

type Accent = "brass" | "steel";

function Card({
  tagEn,
  tagKh,
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  k,
  children,
}: {
  tagEn: string;
  tagKh: string;
  icon: LucideIcon;
  accent: Accent;
  titleEn: string;
  titleKh: string;
  k: boolean;
  children: React.ReactNode;
}) {
  const accentColor = accent === "brass" ? BRASS : STEEL;
  const accentBorder = accent === "brass" ? BRASS_BRIGHT : STEEL_LIGHT;
  const accentBg = accent === "brass" ? BRASS_GLOW : STEEL_PALE;

  return (
    <article
      className="relative rounded-2xl bg-white p-6 sm:p-8 shadow-sm"
      style={{
        border: `1px solid ${accentBorder}55`,
        boxShadow: `0 1px 0 ${accentBorder}11, 0 24px 50px -28px ${accentBorder}55`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-md"
          style={{ background: accentBg, color: accentColor }}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <span
          className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer tracking-normal normal-case" : ""}`}
          style={{ color: accentColor }}
        >
          {k ? tagKh : tagEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl mb-5 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: INK }}
      >
        {k ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function StatTile({
  icon: Icon,
  valueEn,
  valueKh,
  descEn,
  descKh,
}: {
  icon: LucideIcon;
  valueEn: string;
  valueKh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const k = language === "kh";
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3 bg-white"
      style={{ border: `1px solid ${BRASS_BRIGHT}33` }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: BRASS_GLOW, color: BRASS }}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className={`font-display font-bold text-lg leading-tight ${k ? "font-khmer" : ""}`} style={{ color: BRASS }}>
          {k ? valueKh : valueEn}
        </div>
        <div className={`text-xs text-slate-600 mt-0.5 ${k ? "font-khmer" : ""}`}>
          {k ? descKh : descEn}
        </div>
      </div>
    </div>
  );
}

function PartTile({
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const k = language === "kh";
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${BRASS_BRIGHT}33` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-9 h-9 rounded-md"
          style={{ backgroundColor: BRASS_GLOW, color: BRASS }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: BRASS }}>
          {k ? kh : en}
        </h4>
      </div>
      <p className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function SkillTile({
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
}) {
  const { language } = useLanguageStore();
  const k = language === "kh";
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${STEEL_LIGHT}99` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-9 h-9 rounded-md"
          style={{ backgroundColor: STEEL_PALE, color: STEEL }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: STEEL }}>
          {k ? kh : en}
        </h4>
      </div>
      <p className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function KeyComparePanel({
  tone,
  labelEn,
  labelKh,
  items,
  k,
}: {
  tone: "good" | "bad";
  labelEn: string;
  labelKh: string;
  items: { en: string; kh: string }[];
  k: boolean;
}) {
  const isGood = tone === "good";
  const color = isGood ? BRASS : STEEL;
  const bg = isGood ? BRASS_GLOW : "#f1f5f9";
  const Icon = isGood ? CheckCircle2 : XCircle;
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${color}55` }}
      data-testid={`key-compare-${tone}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="inline-flex items-center justify-center w-8 h-8 rounded-md"
          style={{ backgroundColor: bg, color }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? labelKh : labelEn}
        </h4>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {k ? it.kh : it.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Callout({
  color,
  bg,
  icon: Icon,
  children,
}: {
  color: string;
  bg: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{ backgroundColor: bg, border: `1px solid ${color}55` }}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
      <p className="text-sm text-slate-800 leading-relaxed">{children}</p>
    </div>
  );
}

function Pill({
  icon: Icon,
  en,
  kh,
  k,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  k: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/40 backdrop-blur px-3.5 py-1.5 text-sm font-semibold text-white border border-white/60">
      <Icon className="w-4 h-4" aria-hidden="true" />
      <span className={k ? "font-khmer" : ""}>{k ? kh : en}</span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Pin Tumbler Diagram (SVG) — locked vs unlocked states
// ════════════════════════════════════════════════════════════════════════════

function PinTumblerDiagram({ k, state }: { k: boolean; state: "locked" | "unlocked" }) {
  // Five pins. Each entry: [keyPinHeight, driverPinHeight] in SVG units.
  // In LOCKED state every pin sits across the shear line at y=70.
  // In UNLOCKED state every cut between key+driver lands exactly at y=70.
  const PINS_LOCKED = [
    { keyH: 30, driverH: 30 },
    { keyH: 30, driverH: 30 },
    { keyH: 30, driverH: 30 },
    { keyH: 30, driverH: 30 },
    { keyH: 30, driverH: 30 },
  ];
  const PINS_UNLOCKED = [
    { keyH: 22, driverH: 38 },
    { keyH: 36, driverH: 24 },
    { keyH: 18, driverH: 42 },
    { keyH: 30, driverH: 30 },
    { keyH: 26, driverH: 34 },
  ];
  const pins = state === "unlocked" ? PINS_UNLOCKED : PINS_LOCKED;
  const SHEAR = 70;
  const PIN_W = 16;
  const PIN_X = [60, 110, 160, 210, 260];

  // Key path follows the bottoms of the key pins when unlocked
  const keyTeethY = (keyH: number) => SHEAR + keyH; // bottom of key pin
  const keyPath = state === "unlocked"
    ? `M 30 ${keyTeethY(pins[0].keyH) + 6} ` +
      pins.map((p, i) => `L ${PIN_X[i] - PIN_W / 2 - 2} ${keyTeethY(p.keyH) + 6} L ${PIN_X[i]} ${keyTeethY(p.keyH) + 14} L ${PIN_X[i] + PIN_W / 2 + 2} ${keyTeethY(p.keyH) + 6}`).join(" ") +
      ` L 290 ${keyTeethY(pins[4].keyH) + 6} L 310 ${keyTeethY(pins[4].keyH) + 6} L 310 ${keyTeethY(pins[4].keyH) + 22} L 30 ${keyTeethY(pins[4].keyH) + 22} Z`
    : "";

  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full h-auto max-w-2xl mx-auto block"
        role="img"
        aria-label={
          state === "unlocked"
            ? k ? "សោរពេលបើកដោយកូនសោរត្រឹមត្រូវ" : "Pin tumbler in the unlocked state with the correct key inserted"
            : k ? "សោរពេលគ្មានកូនសោរ — ម្ជុលបិទខ្សែបន្ទាត់កាត់" : "Pin tumbler with no key — driver pins block the shear line"
        }
      >
        {/* Outer housing */}
        <rect x="20" y="10" width="280" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <rect x="20" y="70" width="280" height="60" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

        {/* Cylinder (plug) — the rotating core, sits below the shear line */}
        <rect x="22" y="72" width="276" height="56" rx="4" fill="#312e81" opacity="0.35" />

        {/* Shear line */}
        <line x1="20" y1="70" x2="300" y2="70" stroke={BRASS_BRIGHT} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="306" y="73" fill={BRASS_LIGHT} fontSize="9" fontFamily="ui-monospace, monospace">SL</text>

        {/* Pin chambers */}
        {PIN_X.map((x, i) => {
          const p = pins[i];
          const driverTop = SHEAR - p.driverH; // y of top of driver pin
          const keyBottom = SHEAR + p.keyH; // y of bottom of key pin
          return (
            <g key={i}>
              {/* Spring (zigzag line) above driver pin */}
              <path
                d={`M ${x} 14 L ${x - 3} 18 L ${x + 3} 22 L ${x - 3} 26 L ${x + 3} 30 L ${x} 34`}
                stroke="#94a3b8"
                strokeWidth="1.3"
                fill="none"
              />
              {/* Driver pin (top half) */}
              <rect
                x={x - PIN_W / 2}
                y={driverTop}
                width={PIN_W}
                height={p.driverH}
                rx="2"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="1"
              />
              {/* Key pin (bottom half) */}
              <rect
                x={x - PIN_W / 2}
                y={SHEAR}
                width={PIN_W}
                height={p.keyH}
                rx="2"
                fill={BRASS_BRIGHT}
                stroke={BRASS}
                strokeWidth="1"
              />
              {/* Cut line between halves — highlight when at the shear line */}
              <line
                x1={x - PIN_W / 2 - 1}
                y1={SHEAR}
                x2={x + PIN_W / 2 + 1}
                y2={SHEAR}
                stroke={state === "unlocked" ? "#22c55e" : "#ef4444"}
                strokeWidth="1.5"
              />
              {/* When locked, show pins crossing the shear line by drawing the
                  driver pin extending below it */}
              {state === "locked" && (
                <rect
                  x={x - PIN_W / 2}
                  y={SHEAR}
                  width={PIN_W}
                  height="14"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1"
                  opacity="0.95"
                />
              )}
              {/* Pin number label */}
              <text x={x} y={150} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
                P{i + 1}
              </text>
            </g>
          );
        })}

        {/* Key (only when unlocked) */}
        {state === "unlocked" && (
          <path d={keyPath} fill={BRASS_BRIGHT} stroke={BRASS} strokeWidth="1.2" />
        )}
        {state === "unlocked" && (
          <>
            <circle cx="20" cy={keyTeethY(pins[0].keyH) + 14} r="10" fill={BRASS_BRIGHT} stroke={BRASS} strokeWidth="1.2" />
            <circle cx="20" cy={keyTeethY(pins[0].keyH) + 14} r="3" fill={BLUEPRINT_DEEP} />
          </>
        )}

        {/* Status label */}
        <text x="160" y="185" fill={state === "unlocked" ? "#86efac" : "#fca5a5"} fontSize="11" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">
          {state === "unlocked"
            ? (k ? "បើក · ម្ជុលតម្រឹមនៅខ្សែបន្ទាត់កាត់" : "UNLOCKED · pins aligned at shear line")
            : (k ? "បិទ · ម្ជុលឆ្លងកាត់ខ្សែបន្ទាត់កាត់" : "LOCKED · pins cross the shear line")}
        </text>
      </svg>
    </figure>
  );
}
