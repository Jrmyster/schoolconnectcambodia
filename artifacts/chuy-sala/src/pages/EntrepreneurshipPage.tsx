import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Lightbulb,
  Target,
  Wrench,
  Coins,
  Users,
  HeartCrack,
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Sparkles,
  Sunrise,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
// (TrendingUp, Repeat removed — were unused.)

// ════════════════════════════════════════════════════════════════════════════
//  S-CTR-ENT · Entrepreneurship: Building the Future
//              សហគ្រិនភាព៖ ការកសាងអនាគត
//
//  Three cards:
//    1. The Problem Solver  — redefine the entrepreneur; money as byproduct
//    2. The Armor of Tenacity — entropy, perseverance, grit > talent
//    3. The Power of One   — a single individual can replace whole systems
//
//  Aesthetic: sunrise oranges · bright whites · deep architectural blues
// ════════════════════════════════════════════════════════════════════════════

const SUNRISE = "#f97316";       // orange-500
const SUNRISE_DEEP = "#c2410c";  // orange-700
const SUNRISE_LIGHT = "#fed7aa"; // orange-200
const SUNRISE_GLOW = "#fff7ed";  // orange-50
const ARCH_BLUE = "#1e40af";     // blue-800 — architectural deep
const ARCH_BLUE_DEEP = "#172554";// blue-950
const ARCH_BLUE_LIGHT = "#dbeafe"; // blue-100
const SLATE_DEEP = "#0f172a";    // slate-900

const PAGE_BG: React.CSSProperties = {
  // sunrise gradient washing into bright white
  background:
    "radial-gradient(1200px 600px at 80% -10%, rgba(249, 115, 22, 0.12), transparent 70%), " +
    "radial-gradient(1000px 500px at 0% 110%, rgba(30, 64, 175, 0.10), transparent 70%), " +
    "linear-gradient(180deg, #ffffff 0%, #fffaf3 60%, #ffffff 100%)",
};

export default function EntrepreneurshipPage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-800" style={PAGE_BG}>
      {/* ── Top: back link ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/exam-prep"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: ARCH_BLUE }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Study Center", "ត្រឡប់ទៅមជ្ឈមណ្ឌលសិក្សា")}
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: `linear-gradient(90deg, ${SUNRISE_GLOW}, #ffffff)`,
            border: `1px solid ${SUNRISE}55`,
            color: SUNRISE_DEEP,
          }}
        >
          <Sunrise className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Study Center · Module", "មជ្ឈមណ្ឌលសិក្សា · ម៉ូឌុល")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: SLATE_DEEP }}
        >
          {k ? (
            <>
              សហគ្រិនភាព៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${SUNRISE_DEEP}, ${SUNRISE}, ${ARCH_BLUE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ការកសាងអនាគត
              </span>
            </>
          ) : (
            <>
              Entrepreneurship:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${SUNRISE_DEEP}, ${SUNRISE}, ${ARCH_BLUE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Building the Future
              </span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-700 max-w-3xl text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "Every road, every classroom, every clean kitchen, every working hospital began as one person seeing something broken and refusing to leave it that way. This module is a short field guide to the mindset that quietly builds the future — for the friend who is wondering whether to try.",
            "រាល់ផ្លូវ រាល់ថ្នាក់រៀន រាល់ផ្ទះបាយស្អាត រាល់មន្ទីរពេទ្យដែលដំណើរការ បានចាប់ផ្តើមឡើងដោយមនុស្សតែម្នាក់ ដែលឃើញអ្វីមួយខូច និងបដិសេធមិនទុកវាដូចនោះ។ ម៉ូឌុលនេះគឺជាមគ្គុទ្ទេសក៍ខ្លីមួយ ស្តីពីផ្នត់គំនិតដែលកសាងអនាគតយ៉ាងស្ងាត់ៗ — សម្រាប់មិត្តភក្តិដែលកំពុងគិតថា តើគួរសាកល្បងឬអត់។",
          )}
        </p>

        {/* Three trait pillars */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TraitTile
            icon={Mountain}
            en="Grit"
            kh="ភាពតស៊ូរឹងមាំ"
            descEn="The refusal to quit"
            descKh="ការបដិសេធមិនបោះបង់"
            color={SUNRISE_DEEP}
            bg={SUNRISE_GLOW}
            k={k}
          />
          <TraitTile
            icon={Lightbulb}
            en="Vision"
            kh="ចក្ខុវិស័យ"
            descEn="Seeing what isn't there yet"
            descKh="ឃើញអ្វីដែលនៅមិនទាន់មាន"
            color={SUNRISE}
            bg={SUNRISE_GLOW}
            k={k}
          />
          <TraitTile
            icon={Shield}
            en="Resilience"
            kh="ភាពធន់"
            descEn="Standing up after each fall"
            descKh="ក្រោកឈរបន្ទាប់ពីដួលរាល់ជុំ"
            color={ARCH_BLUE}
            bg={ARCH_BLUE_LIGHT}
            k={k}
          />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · The Problem Solver
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-problem-solver"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 01 · The Mindset"
          tagKh="កាត ០១ · ផ្នត់គំនិត"
          icon={Wrench}
          accent="orange"
          titleEn="The Problem Solver"
          titleKh="អ្នកដោះស្រាយបញ្ហា"
          k={k}
        >
          <p className={`text-slate-700 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Most people grow up with a wrong picture of what an entrepreneur is. They imagine a salesman in a suit pushing a product nobody asked for. That picture is so common, and so wrong, that it stops thousands of capable young people from ever beginning. So let us replace it with something honest.",
              "មនុស្សភាគច្រើនធំធាត់ជាមួយរូបភាពខុសមួយអំពីអ្វីទៅជាសហគ្រិន។ ពួកគេស្រមៃឃើញអ្នកលក់ម្នាក់ស្លៀកសំលៀកបំពាក់ផ្លូវការ កំពុងរុញទំនិញដែលគ្មាននរណាម្នាក់សុំ។ រូបភាពនោះធម្មតាខ្លាំងណាស់ ហើយខុសខ្លាំងណាស់ រហូតដល់វាបានបញ្ឈប់យុវជនមានសមត្ថភាពរាប់ពាន់នាក់ពីការចាប់ផ្តើម។ ដូច្នេះចូរយើងជំនួសវាដោយអ្វីមួយស្មោះត្រង់។",
            )}
          </p>

          {/* Definition: NOT vs IS */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: ARCH_BLUE }}
          >
            {t("The honest definition", "និយមន័យដ៏ស្មោះត្រង់")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <DefinitionPanel
              tone="negative"
              labelEn="An entrepreneur is NOT…"
              labelKh="សហគ្រិនមិនមែនជា…"
              k={k}
              items={[
                { en: "A person who sells things to get rich.", kh: "មនុស្សដែលលក់របស់ដើម្បីឲ្យក្លាយជាអ្នកមាន។" },
                { en: "Someone with a magic 'business gene' you don't have.", kh: "អ្នកដែលមានកំណើតពិសេសសម្រាប់ធ្វើជំនួញ ដែលអ្នកគ្មាន។" },
                { en: "A loud talker, a good liar, or a born performer.", kh: "អ្នកនិយាយខ្លាំង អ្នកកុហកពូកែ ឬអ្នកបង្ហាញខ្លួនពីកំណើត។" },
              ]}
            />
            <DefinitionPanel
              tone="positive"
              labelEn="An entrepreneur IS…"
              labelKh="សហគ្រិនគឺជា…"
              k={k}
              items={[
                {
                  en: "A person who looks at human society, finds a point of friction or suffering…",
                  kh: "មនុស្សដែលមើលសង្គម ស្វែងរកចំណុចនៃភាពលំបាក ឬទុក្ខលំបាក…",
                },
                {
                  en: "…and builds a system to fix it.",
                  kh: "…ហើយកសាងប្រព័ន្ធមួយដើម្បីដោះស្រាយវា។",
                },
                {
                  en: "Sometimes that system is a product. Sometimes a service. Sometimes a non-profit. The form does not matter — the fixing matters.",
                  kh: "ពេលខ្លះប្រព័ន្ធនោះគឺជាផលិតផល។ ពេលខ្លះជាសេវាកម្ម។ ពេលខ្លះជាអង្គការមិនរកប្រាក់ចំណេញ។ ទម្រង់មិនសំខាន់ទេ — ការដោះស្រាយវាសំខាន់ជាង។",
                },
              ]}
            />
          </div>

          {/* Value Creation Loop */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: ARCH_BLUE }}
          >
            {t("Where the money actually comes from", "ប្រាក់មកពីណាពិតប្រាកដ")}
          </h3>

          <ValueLoop k={k} />

          <p className={`mt-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Read that loop in one sentence: ",
              "អានរង្វិលជុំនោះក្នុងប្រយោគមួយ ៖ ",
            )}
            <strong style={{ color: ARCH_BLUE_DEEP }}>
              {t(
                "money is simply a byproduct of creating value for other human beings.",
                "ប្រាក់គ្រាន់តែជាផលបន្ទាប់បន្សំនៃការបង្កើតតម្លៃសម្រាប់មនុស្សផ្សេងទៀត។",
              )}
            </strong>
            {t(
              " Stop chasing the money — chase the problem worth fixing. If you genuinely improve a corner of society, the economy will reward you. The opposite is also true: chase only the money, ignore the problem, and the economy quietly walks away.",
              " ឈប់រត់ដេញតាមលុយ — ដេញតាមបញ្ហាដែលសមនឹងដោះស្រាយ។ បើអ្នកធ្វើឱ្យមុំមួយនៃសង្គមប្រសើរឡើងពិតប្រាកដ សេដ្ឋកិច្ចនឹងផ្តល់រង្វាន់មកអ្នក។ ម្យ៉ាងវិញទៀតវាក៏ពិតដែរ ៖ បើអ្នករត់តាមតែលុយ មិនអើពើនឹងបញ្ហា សេដ្ឋកិច្ចនឹងដើរចាកចេញពីអ្នកដោយស្ងាត់ៗ។",
            )}
          </p>

          <Callout color={SUNRISE_DEEP} bg={SUNRISE_GLOW} icon={Sparkles}>
            <strong>{t("The big idea: ", "គំនិតធំ ៖ ")}</strong>
            {t(
              "your job is not to invent a clever way to take money from people. Your job is to find a way to genuinely help them, and accept the money as a thank-you note from society.",
              "តួនាទីរបស់អ្នកមិនមែនបង្កើតវិធីឆ្លាតវៃដើម្បីយកលុយពីមនុស្សទេ។ តួនាទីរបស់អ្នកគឺស្វែងរកវិធីដើម្បីជួយពួកគេពិតប្រាកដ ហើយទទួលយកលុយជាសំបុត្រអរគុណពីសង្គម។",
            )}
          </Callout>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · The Armor of Tenacity
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-tenacity"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 02 · The Inner Game"
          tagKh="កាត ០២ · ការប្រកួតផ្ទៃក្នុង"
          icon={Shield}
          accent="blue"
          titleEn="The Armor of Tenacity"
          titleKh="ខែលនៃភាពតស៊ូ"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Perseverance ", "ការតស៊ូ ")}</strong>
            {t("(", "(")}
            <span className={k ? "font-khmer" : ""}>{t("ការតស៊ូ", "ការតស៊ូ")}</span>
            {t(") is the second muscle. Here is the physics behind it: ", ") គឺជាសាច់ដុំទីពីរ។ នេះគឺជារូបវិទ្យាដែលនៅពីក្រោយវា ៖ ")}
            <strong style={{ color: ARCH_BLUE_DEEP }}>
              {t(
                "the default state of the universe is chaos.",
                "ស្ថានភាពលំនាំដើមនៃសកលលោកគឺវឹកវរ។",
              )}
            </strong>
            {t(
              " Physicists call this entropy. Buildings collapse. Iron rusts. Plans drift. Ideas get forgotten. When you try to build something new — a business, a charity, a school program — you are pushing against this whole flow. And the universe will push back.",
              " រូបវិទូហៅវាថា អង់ត្រូពី (entropy)។ អគារដួល។ ដែកច្រេះ។ គម្រោងរសាត់។ គំនិតត្រូវបានបំភ្លេច។ ពេលអ្នកព្យាយាមកសាងអ្វីថ្មី — អាជីវកម្ម អង្គការសប្បុរសធម៌ កម្មវិធីសាលា — អ្នកកំពុងរុញច្រាននឹងលំហូរទាំងអស់នេះ។ ហើយសកលលោកនឹងរុញត្រលប់មកវិញ។",
            )}
          </p>

          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: ARCH_BLUE }}
          >
            {t("What 'pushing back' looks like", "តើ «ការរុញត្រឡប់» មើលទៅដូចម្តេច")}
          </h3>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <PushbackTile
              icon={XCircle}
              en="Failed prototypes"
              kh="គំរូដំបូងបរាជ័យ"
              descEn="The first three versions don't work. Then the fourth doesn't either."
              descKh="កំណែបីដំបូងមិនដំណើរការ។ បន្ទាប់មកកំណែទីបួនក៏មិនដំណើរការដែរ។"
              k={k}
            />
            <PushbackTile
              icon={Coins}
              en="No funding"
              kh="គ្មានមូលធន"
              descEn="Banks say no. Investors say 'come back next year'. Friends are polite but cautious."
              descKh="ធនាគារនិយាយថាទេ។ វិនិយោគិននិយាយថា «មកវិញឆ្នាំក្រោយ»។ មិត្តភក្តិសុភាពតែប្រុងប្រយ័ត្ន។"
              k={k}
            />
            <PushbackTile
              icon={HeartCrack}
              en="People dismissing you"
              kh="មនុស្សមើលងាយអ្នក"
              descEn="Even people who love you may quietly tell you the idea is stupid."
              descKh="សូម្បីអ្នកដែលស្រឡាញ់អ្នក ក៏អាចនិយាយយ៉ាងស្ងាត់ៗថាគំនិតនោះល្ងង់។"
              k={k}
            />
          </div>

          <Callout color={ARCH_BLUE_DEEP} bg={ARCH_BLUE_LIGHT} icon={AlertTriangle}>
            {t(
              "None of these mean you are wrong. They mean entropy is doing what entropy always does. Your job is not to make the resistance disappear. Your job is to keep walking through it.",
              "គ្មានមួយណានៃរឿងទាំងនេះមានន័យថាអ្នកខុសទេ។ វាមានន័យថាអង់ត្រូពីកំពុងធ្វើអ្វីដែលអង់ត្រូពីតែងធ្វើ។ តួនាទីរបស់អ្នកមិនមែនធ្វើឱ្យការតស៊ូនោះបាត់ទេ។ តួនាទីរបស់អ្នកគឺបន្តដើរឆ្លងកាត់វា។",
            )}
          </Callout>

          {/* Tenacity vs Talent comparison */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: ARCH_BLUE }}
          >
            {t("Tenacity beats raw talent", "ភាពអត់ធ្មត់ឈ្នះទេពកោសល្យ")}
          </h3>

          <p className={`text-slate-700 mb-4 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Look around at the most successful builders in any field — Cambodia, the region, the world. They are almost never the brightest student in the classroom. Raw intelligence helps for a few months. After that, the universe stops caring how clever you are. It only asks one question: ",
              "សម្លឹងមើលជុំវិញនូវអ្នកកសាងជោគជ័យបំផុតក្នុងវិស័យណាក៏ដោយ — កម្ពុជា តំបន់នេះ ពិភពលោក។ ពួកគេស្ទើរតែមិនដែលជាសិស្សពូកែបំផុតក្នុងថ្នាក់រៀន។ ស្ទាបញ្ញាដើមជួយបានពីរបីខែ។ បន្ទាប់ពីនោះ សកលលោកឈប់ខ្វល់ពីភាពឆ្លាតវៃរបស់អ្នក។ វាសួរតែសំណួរមួយ ៖ ",
            )}
            <strong style={{ color: ARCH_BLUE_DEEP }}>
              {t(
                "did you stand up again?",
                "តើអ្នកបានក្រោកឈរម្តងទៀតឬទេ?",
              )}
            </strong>
          </p>

          <FailureLadder k={k} />

          <Callout color={SUNRISE_DEEP} bg={SUNRISE_GLOW} icon={Sparkles}>
            <strong>
              {t(
                "The most successful founders are simply the ones who refuse to quit after the 10th, 20th, or 100th failure. ",
                "សហគ្រិនជោគជ័យបំផុត គ្រាន់តែជាអ្នកដែលបដិសេធមិនបោះបង់ បន្ទាប់ពីបរាជ័យលើកទី ១០ ទី ២០ ឬទី ១០០។ ",
              )}
            </strong>
            {t(
              "That is the entire secret. Not genius. Not luck. Just the quiet decision, made over and over, to get up one more time than you fall.",
              "នោះគឺជាអាថ៌កំបាំងទាំងអស់។ មិនមែនជាប្រាជ្ញាទេ។ មិនមែនជាសំណាងទេ។ គ្រាន់តែជាការសម្រេចចិត្តស្ងាត់ៗ ធ្វើម្តងហើយម្តងទៀត ដើម្បីក្រោកឈរច្រើនជាងការដួលមួយដង។",
            )}
          </Callout>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · The Power of One
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-power-of-one"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <Card
          tagEn="Card 03 · The Permission Slip"
          tagKh="កាត ០៣ · លិខិតអនុញ្ញាត"
          icon={Rocket}
          accent="sunset"
          titleEn="The Power of One"
          titleKh="ថាមពលនៃបុគ្គលម្នាក់"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "There is a quiet myth, especially in younger countries, that real change requires a government, a billionaire, or a giant corporation. It does not. Some of the largest shifts in human history began as one person in a small room with a better idea. ",
              "មានទេវកថាស្ងាត់ៗមួយ ជាពិសេសនៅក្នុងប្រទេសវ័យក្មេង ដែលការផ្លាស់ប្តូរពិតប្រាកដ ត្រូវការរដ្ឋាភិបាល មហាសេដ្ឋី ឬសាជីវកម្មយក្ស។ វាមិនមែនទេ។ ការផ្លាស់ប្ដូរមួយចំនួនធំបំផុតក្នុងប្រវត្តិសាស្ត្រមនុស្សជាតិ បានចាប់ផ្ដើមជាមនុស្សតែម្នាក់នៅក្នុងបន្ទប់តូចមួយ ដែលមានគំនិតប្រសើរជាង។ ",
            )}
            <strong style={{ color: ARCH_BLUE_DEEP }}>
              {t(
                "You do not need permission to start.",
                "អ្នកមិនត្រូវការសុំសិទ្ធិដើម្បីចាប់ផ្ដើមទេ។",
              )}
            </strong>
          </p>

          {/* Old systems made obsolete */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: ARCH_BLUE }}
          >
            {t("Better idea wins. Old system fades.", "គំនិតប្រសើរឈ្នះ។ ប្រព័ន្ធចាស់រលាយ។")}
          </h3>

          <div className="space-y-3 mb-6">
            <ObsoleteRow
              k={k}
              oldEn="Horse-drawn carriages"
              oldKh="រទេះសេះ"
              newEn="Affordable automobiles"
              newKh="រថយន្តតម្លៃសមរម្យ"
              noteEn="One workshop in Detroit replaced an entire transportation system in 25 years."
              noteKh="សិក្ខាសាលាមួយនៅក្រុងឌីត្រ័រ ជំនួសប្រព័ន្ធដឹកជញ្ជូនទាំងមូលក្នុងរយៈពេល ២៥ ឆ្នាំ។"
            />
            <ObsoleteRow
              k={k}
              oldEn="Candle and oil lamps"
              oldKh="ទៀន និងចង្កៀងប្រេង"
              newEn="The electric light bulb"
              newKh="អំពូលអគ្គិសនី"
              noteEn="A single inventor's lab erased centuries of how every home was lit at night."
              noteKh="មន្ទីរពិសោធន៍របស់អ្នកប្រឌិតតែម្នាក់ លុបបំបាត់របៀបដែលផ្ទះគ្រប់ផ្ទះត្រូវបានបំភ្លឺនៅពេលយប់ ដែលមានរាប់សតវត្សរ៍។"
            />
            <ObsoleteRow
              k={k}
              oldEn="Letters and postal mail"
              oldKh="សំបុត្រ និងប្រៃសណីយ៍"
              newEn="Email and instant messaging"
              newKh="អ៊ីមែល និងសារភ្លាមៗ"
              noteEn="A protocol typed by a few engineers replaced the world's mail timing in one decade."
              noteKh="ពិធីសារដែលវាយដោយវិស្វករពីរបីនាក់ ជំនួសល្បឿនការផ្ញើសំបុត្ររបស់ពិភពលោកក្នុងរយៈពេលមួយទសវត្សរ៍។"
            />
            <ObsoleteRow
              k={k}
              oldEn="Cash-only markets"
              oldKh="ទីផ្សារសាច់ប្រាក់តែមួយមុខ"
              newEn="Mobile money & QR payments"
              newKh="ប្រាក់ទូរស័ព្ទដៃ និងការទូទាត់ QR"
              noteEn="In Cambodia, the Bakong and KHQR digital-payment ecosystem is quietly making the leather wallet less and less necessary for everyday purchases."
              noteKh="នៅកម្ពុជា ប្រព័ន្ធទូទាត់ឌីជីថលបាគង និង KHQR កំពុងធ្វើឱ្យកាបូបលុយក្លាយជារបស់ដែលត្រូវការតិចជាងមុន សម្រាប់ការទិញលក់ប្រចាំថ្ងៃយ៉ាងស្ងាត់ៗ។"
            />
          </div>

          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The pattern is the same every time: the old system was inefficient. Someone built a better one. They did not need to convince anyone, or fight a war, or ask the king. ",
              "លំនាំគឺដូចគ្នារាល់ដង ៖ ប្រព័ន្ធចាស់មិនមានប្រសិទ្ធភាព។ មានមនុស្សម្នាក់សាងសង់ប្រព័ន្ធល្អជាង។ ពួកគេមិនត្រូវការបញ្ចុះបញ្ចូលនរណាម្នាក់ មិនត្រូវការច្បាំងសង្គ្រាម ឬសុំស្ដេចទេ។ ",
            )}
            <strong style={{ color: ARCH_BLUE_DEEP }}>
              {t(
                "If you build a better system, the world will naturally transition to it.",
                "បើអ្នកសាងសង់ប្រព័ន្ធដ៏ប្រសើរជាងមួយ ពិភពលោកនឹងផ្លាស់ប្តូរទៅរកវាដោយធម្មជាតិ។",
              )}
            </strong>
            {t(
              " It does not transition because it is told to. It transitions because the new way solves a problem the old way couldn't.",
              " វាមិនផ្លាស់ប្តូរព្រោះត្រូវបានប្រាប់ឲ្យធ្វើទេ។ វាផ្លាស់ប្តូរព្រោះវិធីថ្មីដោះស្រាយបញ្ហាដែលវិធីចាស់ដោះស្រាយមិនបាន។",
            )}
          </p>

          <Callout color={SUNRISE_DEEP} bg={SUNRISE_GLOW} icon={Sunrise}>
            <strong>
              {t("So here is the permission slip you were waiting for: ", "ដូច្នេះនេះគឺជាសិទ្ធិអនុញ្ញាតដែលអ្នកកំពុងរង់ចាំ ៖ ")}
            </strong>
            {t(
              "you, alone, with no special background, no famous family, and no large bank account, are allowed to build a better system. The country needs you to. The world has always been changed by people exactly like you.",
              "អ្នកម្នាក់ឯង ដោយគ្មានប្រវត្តិពិសេស គ្មានគ្រួសារល្បីៗ និងគ្មានគណនីធនាគារធំ ត្រូវបានអនុញ្ញាតឱ្យសាងសង់ប្រព័ន្ធដ៏ប្រសើរជាងមួយ។ ប្រទេសត្រូវការអ្នកធ្វើ។ ពិភពលោកតែងតែត្រូវបានផ្លាស់ប្ដូរដោយមនុស្សដូចអ្នកផ្ទាល់។",
            )}
          </Callout>
        </Card>
      </section>

      {/* Closing — combined call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${ARCH_BLUE_DEEP} 0%, ${ARCH_BLUE} 60%, ${SUNRISE_DEEP} 100%)`,
            color: "#ffffff",
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(253, 186, 116, 0.4)" }}
            aria-hidden="true"
          />
          <Sunrise className="w-10 h-10 mx-auto mb-3" style={{ color: SUNRISE_LIGHT }} aria-hidden="true" />
          <h3
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${k ? "font-khmer leading-loose" : ""}`}
          >
            {t("Three muscles. One mindset. Begin small, begin now.", "សាច់ដុំបី។ ផ្នត់គំនិតតែមួយ។ ចាប់ផ្ដើមតូច ចាប់ផ្ដើមឥឡូវ។")}
          </h3>
          <p
            className={`text-sm sm:text-base text-white/90 max-w-2xl mx-auto ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Pick one small problem you saw this week. A pothole. A confusing form. A queue that wasted an hour of your aunt's morning. Sketch a system that would fix it. That sketch — not a million dollars, not a degree from abroad — is where every entrepreneur on Earth has started.",
              "ជ្រើសរើសបញ្ហាតូចមួយដែលអ្នកបានឃើញសប្តាហ៍នេះ។ រណ្ដៅផ្លូវ។ បែបបទច្រលំ។ ជួរដែលខ្ជះខ្ជាយម៉ោងពេលព្រឹករបស់មីងអ្នក។ គូរប្រព័ន្ធដែលនឹងដោះស្រាយវា។ គំនូរនោះ — មិនមែនលុយមួយលានដុល្លារ មិនមែនសញ្ញាបត្រពីបរទេសទេ — គឺជាកន្លែងដែលសហគ្រិនគ្រប់រូបនៅលើផែនដីបានចាប់ផ្តើម។",
            )}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 flex-wrap justify-center">
            <Pill icon={Mountain} en="Grit" kh="ឆន្ទៈ" k={k} />
            <Pill icon={Lightbulb} en="Vision" kh="ចក្ខុវិស័យ" k={k} />
            <Pill icon={Shield} en="Resilience" kh="ភាពធន់" k={k} />
          </div>
        </div>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/exam-prep"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-bold shadow hover:opacity-90 transition-opacity tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "uppercase"}`}
          style={{ backgroundColor: ARCH_BLUE_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Study Center", "ត្រឡប់ទៅមជ្ឈមណ្ឌលសិក្សា")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks
// ════════════════════════════════════════════════════════════════════════════

type Accent = "orange" | "blue" | "sunset";

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
  const accentColor =
    accent === "orange" ? SUNRISE_DEEP : accent === "blue" ? ARCH_BLUE : SUNRISE_DEEP;
  const accentBorder =
    accent === "orange" ? SUNRISE : accent === "blue" ? ARCH_BLUE : SUNRISE;
  const accentBg =
    accent === "orange" ? SUNRISE_GLOW : accent === "blue" ? ARCH_BLUE_LIGHT : SUNRISE_GLOW;
  const headerGradient =
    accent === "sunset"
      ? `linear-gradient(135deg, ${SUNRISE_GLOW}, ${ARCH_BLUE_LIGHT})`
      : accentBg;

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
          style={{ background: headerGradient, color: accentColor }}
        >
          <Icon className="w-5 h-5" />
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
        style={{ color: SLATE_DEEP }}
      >
        {k ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function TraitTile({
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
  color,
  bg,
  k,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
  color: string;
  bg: string;
  k: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}44` }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: bg, color }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <div className={`font-display font-bold text-lg leading-tight ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? kh : en}
        </div>
        <div className={`text-xs text-slate-600 mt-0.5 ${k ? "font-khmer" : ""}`}>
          {k ? descKh : descEn}
        </div>
      </div>
    </div>
  );
}

function DefinitionPanel({
  tone,
  labelEn,
  labelKh,
  items,
  k,
}: {
  tone: "negative" | "positive";
  labelEn: string;
  labelKh: string;
  items: { en: string; kh: string }[];
  k: boolean;
}) {
  const isPos = tone === "positive";
  const color = isPos ? ARCH_BLUE_DEEP : "#9a3412";
  const bg = isPos ? ARCH_BLUE_LIGHT : SUNRISE_GLOW;
  const Icon = isPos ? CheckCircle2 : XCircle;
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}33` }}
      data-testid={`definition-panel-${tone}`}
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

function ValueLoop({ k }: { k: boolean }) {
  const Step = ({
    n,
    icon: Icon,
    en,
    kh,
    color,
    bg,
  }: {
    n: string;
    icon: LucideIcon;
    en: string;
    kh: string;
    color: string;
    bg: string;
  }) => (
    <div
      className="relative rounded-xl p-3 flex items-center gap-3 min-w-0"
      style={{ backgroundColor: bg, border: `1px solid ${color}55` }}
    >
      <div
        className="absolute -top-2 -left-2 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      >
        {n}
      </div>
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0 ml-1"
        style={{ backgroundColor: "#ffffff", color }}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
      <span className={`text-xs sm:text-sm font-semibold ${k ? "font-khmer" : ""}`} style={{ color }}>
        {k ? kh : en}
      </span>
    </div>
  );

  const arrow = (
    <ArrowRight
      className="w-4 h-4 flex-shrink-0 mx-1 hidden sm:block"
      style={{ color: SUNRISE_DEEP }}
      aria-hidden="true"
    />
  );

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: `linear-gradient(135deg, ${SUNRISE_GLOW} 0%, #ffffff 60%, ${ARCH_BLUE_LIGHT} 100%)`,
        border: `1px dashed ${ARCH_BLUE}55`,
      }}
      data-testid="value-loop"
    >
      <div className="grid sm:flex sm:items-center gap-3 sm:gap-1">
        <Step n="1" icon={Target} en="See a real problem" kh="ឃើញបញ្ហាពិត" color={SUNRISE_DEEP} bg="#ffffff" />
        {arrow}
        <Step n="2" icon={Wrench} en="Build a system that fixes it" kh="សាងសង់ប្រព័ន្ធដោះស្រាយ" color={SUNRISE} bg="#ffffff" />
        {arrow}
        <Step n="3" icon={Users} en="People are genuinely helped" kh="មនុស្សត្រូវបានជួយពិតប្រាកដ" color={ARCH_BLUE} bg="#ffffff" />
        {arrow}
        <Step n="4" icon={Coins} en="Money flows back as thanks" kh="លុយហូរត្រលប់មកវិញជាការអរគុណ" color={ARCH_BLUE_DEEP} bg="#ffffff" />
      </div>
    </div>
  );
}

function PushbackTile({
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
  k,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
  k: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${ARCH_BLUE}33` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-8 h-8 rounded-md"
          style={{ backgroundColor: ARCH_BLUE_LIGHT, color: ARCH_BLUE_DEEP }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: ARCH_BLUE_DEEP }}>
          {k ? kh : en}
        </h4>
      </div>
      <p className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function FailureLadder({ k }: { k: boolean }) {
  const rungs: { n: number; widthPct: number; en: string; kh: string }[] = [
    { n: 1, widthPct: 20, en: "Most people quit here.", kh: "មនុស្សភាគច្រើនបោះបង់នៅទីនេះ។" },
    { n: 5, widthPct: 35, en: "A lot more quit here.", kh: "មានច្រើនទៀតបោះបង់នៅទីនេះ។" },
    { n: 20, widthPct: 60, en: "The crowd has thinned.", kh: "ហ្វូងមនុស្សស្រកចុះ។" },
    { n: 100, widthPct: 95, en: "Almost no one is left. The few who remain — those are the founders you read about.", kh: "ស្ទើរតែគ្មាននរណាសល់ទេ។ អ្នកដែលនៅសេសសល់ — ពួកគេគឺជាសហគ្រិនដែលអ្នកបានអាន។" },
  ];
  return (
    <div
      className="rounded-xl p-4 bg-white mb-5"
      style={{ border: `1px solid ${ARCH_BLUE}33` }}
      data-testid="failure-ladder"
    >
      <div className={`text-xs uppercase tracking-widest mb-3 font-mono ${k ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: ARCH_BLUE }}>
        {t_static(k, "Failures survived →", "បរាជ័យដែលឈ្នះ →")}
      </div>
      <div className="space-y-2.5">
        {rungs.map((r) => (
          <div key={r.n} className="grid grid-cols-[60px,1fr] items-center gap-3">
            <div
              className="font-display font-bold text-right text-lg"
              style={{ color: ARCH_BLUE_DEEP }}
            >
              {r.n}×
            </div>
            <div className="relative">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${r.widthPct}%`,
                  background: `linear-gradient(90deg, ${SUNRISE_LIGHT}, ${SUNRISE} 60%, ${SUNRISE_DEEP})`,
                }}
                aria-hidden="true"
              />
              <span
                className={`block text-xs text-slate-700 mt-1 ${k ? "font-khmer" : ""}`}
              >
                {k ? r.kh : r.en}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObsoleteRow({
  k,
  oldEn,
  oldKh,
  newEn,
  newKh,
  noteEn,
  noteKh,
}: {
  k: boolean;
  oldEn: string;
  oldKh: string;
  newEn: string;
  newKh: string;
  noteEn: string;
  noteKh: string;
}) {
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${ARCH_BLUE}33` }}
      data-testid="obsolete-row"
    >
      <div className="grid sm:grid-cols-[1fr,auto,1fr] items-center gap-3 mb-2">
        <div
          className="rounded-lg px-3 py-2 text-center"
          style={{
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            color: "#475569",
            textDecoration: "line-through",
            textDecorationColor: "#94a3b8",
          }}
        >
          <span className={`text-sm font-semibold ${k ? "font-khmer no-underline" : ""}`}>
            {k ? oldKh : oldEn}
          </span>
        </div>
        <ArrowRight
          className="w-5 h-5 mx-auto"
          style={{ color: SUNRISE_DEEP }}
          aria-hidden="true"
        />
        <div
          className="rounded-lg px-3 py-2 text-center"
          style={{
            background: `linear-gradient(135deg, ${SUNRISE_GLOW}, ${ARCH_BLUE_LIGHT})`,
            border: `1px solid ${ARCH_BLUE}55`,
            color: ARCH_BLUE_DEEP,
          }}
        >
          <span className={`text-sm font-bold ${k ? "font-khmer" : ""}`}>
            {k ? newKh : newEn}
          </span>
        </div>
      </div>
      <p className={`text-xs text-slate-600 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? noteKh : noteEn}
      </p>
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
      className="mt-5 rounded-xl p-4 flex items-start gap-3"
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
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3.5 py-1.5 text-sm font-semibold border border-white/30">
      <Icon className="w-4 h-4" aria-hidden="true" />
      <span className={k ? "font-khmer" : ""}>{k ? kh : en}</span>
    </span>
  );
}

function t_static(k: boolean, en: string, kh: string) {
  return k ? kh : en;
}

