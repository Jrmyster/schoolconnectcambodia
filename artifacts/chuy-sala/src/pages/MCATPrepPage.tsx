import { Link } from "wouter";
import {
  ArrowLeft,
  Brain,
  Stethoscope,
  Timer,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Layers,
  Atom,
  FlaskConical,
  HeartPulse,
  Users,
  BookOpen,
  Repeat,
  Dumbbell,
  CalendarDays,
  Target,
  AlertTriangle,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-MED-MCAT · The MCAT: The Medical Marathon
//                ការប្រឡង MCAT៖ ម៉ារ៉ាតុងវេជ្ជសាស្ត្រ
//
//  Sub-module under /pathway-to-medicine.
//
//  Three cards:
//    1. The Anatomy of the Test  — what it is and the 6 sections
//    2. How to Study             — passive vs active recall + marathon training
//    3. The Timeline             — when to take it + 300–500 prep hours
//
//  Aesthetic: clinical whites · study-focused blues (sky/indigo) ·
//             focus-driven greens (emerald). Crisp, authoritative.
// ════════════════════════════════════════════════════════════════════════════

const STUDY_BLUE = "#075985";          // sky-800
const STUDY_BLUE_MID = "#0284c7";      // sky-600
const STUDY_BLUE_LIGHT = "#e0f2fe";    // sky-100
const STUDY_BLUE_GLOW = "#f0f9ff";     // sky-50
const FOCUS_GREEN = "#15803d";         // green-700
const FOCUS_GREEN_MID = "#16a34a";     // green-600
const FOCUS_GREEN_LIGHT = "#dcfce7";   // green-100
const FOCUS_GREEN_GLOW = "#f0fdf4";    // green-50
const SLATE_INK = "#0f172a";           // slate-900
const ALERT_AMBER = "#b45309";         // amber-700
const ALERT_AMBER_GLOW = "#fffbeb";    // amber-50

const PAGE_BG: React.CSSProperties = {
  background:
    "radial-gradient(900px 500px at 90% -10%, rgba(2, 132, 199, 0.10), transparent 70%), " +
    "radial-gradient(800px 500px at 0% 110%, rgba(22, 163, 74, 0.08), transparent 70%), " +
    "linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%)",
};

export default function MCATPrepPage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-800" style={PAGE_BG}>
      {/* ── Top: back link ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/pathway-to-medicine"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: STUDY_BLUE }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Pathway to Medicine", "ត្រឡប់ទៅផ្លូវវេជ្ជសាស្ត្រ")}
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: STUDY_BLUE_GLOW,
            border: `1px solid ${STUDY_BLUE_MID}55`,
            color: STUDY_BLUE,
          }}
        >
          <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Medicine · MCAT Preparation", "វេជ្ជសាស្ត្រ · ការត្រៀម MCAT")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: SLATE_INK }}
        >
          {k ? (
            <>
              ការប្រឡង MCAT៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${STUDY_BLUE}, ${STUDY_BLUE_MID}, ${FOCUS_GREEN})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ម៉ារ៉ាតុងវេជ្ជសាស្ត្រ
              </span>
            </>
          ) : (
            <>
              The MCAT:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${STUDY_BLUE}, ${STUDY_BLUE_MID}, ${FOCUS_GREEN})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The Medical Marathon
              </span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-700 max-w-3xl text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "If medical school is the destination, the MCAT is the gate. It is not a normal exam. It is a 7.5-hour test of stamina, scientific reasoning, and how well your brain can think under pressure. This guide breaks down what the test actually is, how serious students prepare for it, and when to walk into the testing center.",
            "បើសាកលវិទ្យាល័យពេទ្យជាគោលដៅ ការប្រឡង MCAT គឺជាច្រកទ្វារ។ វាមិនមែនជាការប្រឡងធម្មតាទេ។ វាជាការសាកល្បងរយៈពេល ៧.៥ ម៉ោង នៃកម្លាំងស៊ូទ្រាំ ការវែកញែកវិទ្យាសាស្ត្រ និងសមត្ថភាពគិតរបស់ខួរក្បាលអ្នកក្រោមសម្ពាធ។ មគ្គុទ្ទេសក៍នេះពន្យល់អំពីការប្រឡងពិតប្រាកដ របៀបដែលនិស្សិតធ្ងន់ធ្ងរត្រៀមខ្លួន និងពេលណាគួរដើរចូលមជ្ឈមណ្ឌលប្រឡង។",
          )}
        </p>

        {/* Three quick stat tiles */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatTile
            icon={Timer}
            valueEn="7.5 hours"
            valueKh="៧.៥ ម៉ោង"
            descEn="Total exam length"
            descKh="រយៈពេលប្រឡងសរុប"
            color={STUDY_BLUE}
            bg={STUDY_BLUE_GLOW}
            k={k}
          />
          <StatTile
            icon={Layers}
            valueEn="6 subjects"
            valueKh="៦ មុខវិជ្ជា"
            descEn="Bio · Chem · Phys · Psych · Soc · CARS"
            descKh="ជីវវិទ្យា · គីមី · រូបវិទ្យា · ចិត្តវិទ្យា · សង្គមវិទ្យា · CARS"
            color={STUDY_BLUE_MID}
            bg={STUDY_BLUE_GLOW}
            k={k}
          />
          <StatTile
            icon={Dumbbell}
            valueEn="300–500 hrs"
            valueKh="៣០០–៥០០ ម៉ោង"
            descEn="Recommended prep time"
            descKh="ពេលវេលាត្រៀមដែលណែនាំ"
            color={FOCUS_GREEN}
            bg={FOCUS_GREEN_GLOW}
            k={k}
          />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · The Anatomy of the Test
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-anatomy"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 01 · What you are walking into"
          tagKh="កាត ០១ · អ្វីដែលអ្នកនឹងជួប"
          icon={ClipboardList}
          accent="blue"
          titleEn="The Anatomy of the Test"
          titleKh="រចនាសម្ព័ន្ធនៃការប្រឡង"
          k={k}
        >
          <p className={`text-slate-700 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t("The ", "ការប្រឡង ")}
            <strong>{t("MCAT ", "MCAT ")}</strong>
            {t(
              "(Medical College Admission Test) is the standardised exam required to enter most medical schools in the United States, Canada, and the Caribbean, with a smaller number of programs accepting it elsewhere (Australia largely uses a different exam called the GAMSAT, for example). Even outside those countries the MCAT is recognised globally as ",
              "(Medical College Admission Test) គឺជាការប្រឡងស្តង់ដារដែលត្រូវការដើម្បីចូលរៀននៅសាកលវិទ្យាល័យពេទ្យភាគច្រើនក្នុងសហរដ្ឋអាមេរិក កាណាដា និងការ៉ាប៊ីន ជាមួយនឹងកម្មវិធីមួយចំនួនតូចនៅប្រទេសផ្សេងទៀតដែលទទួលយកវា (ឧទាហរណ៍ អូស្ត្រាលីភាគច្រើនប្រើការប្រឡងផ្សេងឈ្មោះថា GAMSAT)។ សូម្បីនៅក្រៅប្រទេសទាំងនោះ ការប្រឡង MCAT ក៏ត្រូវបានទទួលស្គាល់ជាសកលថាជា ",
            )}
            <strong style={{ color: STUDY_BLUE }}>
              {t(
                "the gold standard of medical reasoning.",
                "ស្តង់ដារមាសនៃការវែកញែកផ្នែកវេជ្ជសាស្ត្រ។",
              )}
            </strong>
          </p>

          <Callout color={ALERT_AMBER} bg={ALERT_AMBER_GLOW} icon={AlertTriangle}>
            <strong>{t("Important: ", "សំខាន់ ៖ ")}</strong>
            {t(
              "the MCAT is NOT a memorisation test. It will not ask you to list the bones of the hand or recite the citric acid cycle. It hands you a complex scientific passage you have never seen before — usually about a study or experiment — and asks you to think critically about it on the spot.",
              "ការប្រឡង MCAT មិនមែនជាការសាកល្បងលើការទន្ទេញចាំទេ។ វាមិនសួរអ្នកឱ្យរាប់ឆ្អឹងនៅដៃ ឬសូត្ររង្វិលជុំ Krebs ឡើយ។ វាប្រគល់ឱ្យអ្នកនូវអត្ថបទវិទ្យាសាស្ត្រស្មុគ្រស្មាញមួយដែលអ្នកមិនធ្លាប់បានឃើញ — ជាធម្មតាអំពីការសិក្សាស្រាវជ្រាវ ឬការពិសោធន៍ — ហើយសុំឱ្យអ្នកគិតវែកញែកអំពីវាភ្លាមៗ។",
            )}
          </Callout>

          {/* Six sections breakdown */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STUDY_BLUE }}
          >
            {t("The six tested subjects", "មុខវិជ្ជាប្រឡងទាំង ៦")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-3" data-testid="mcat-sections-grid">
            <SubjectTile
              icon={Atom}
              en="Biology & Biochemistry"
              kh="ជីវវិទ្យា និងជីវគីមី"
              descEn="Cells, genetics, metabolism, and the molecular machinery of life."
              descKh="កោសិកា ហ្សែន មេតាបូលីស និងម៉ាស៊ីនម៉ូលេគុលនៃជីវិត។"
              k={k}
            />
            <SubjectTile
              icon={FlaskConical}
              en="General & Organic Chemistry"
              kh="គីមីទូទៅ និងសរីរាង្គ"
              descEn="Reactions, bonding, acids and bases, and how molecules behave."
              descKh="ប្រតិកម្ម ចំណង អាស៊ីត និងបាស និងរបៀបដែលម៉ូលេគុលប្រព្រឹត្ត។"
              k={k}
            />
            <SubjectTile
              icon={Sparkles}
              en="Physics"
              kh="រូបវិទ្យា"
              descEn="Forces, fluids, optics and electricity — applied to the human body."
              descKh="កម្លាំង វត្ថុរាវ ទស្សនវិទ្យា និងអគ្គិសនី — អនុវត្តលើរូបកាយមនុស្ស។"
              k={k}
            />
            <SubjectTile
              icon={Brain}
              en="Psychology"
              kh="ចិត្តវិទ្យា"
              descEn="How the mind perceives, learns, remembers and reacts to stress."
              descKh="របៀបដែលគំនិតយល់ឃើញ រៀន ចងចាំ និងឆ្លើយតបនឹងភាពតានតឹង។"
              k={k}
            />
            <SubjectTile
              icon={Users}
              en="Sociology"
              kh="សង្គមវិទ្យា"
              descEn="How families, cultures and communities shape patient health."
              descKh="របៀបដែលគ្រួសារ វប្បធម៌ និងសហគមន៍ កំណត់សុខភាពអ្នកជំងឺ។"
              k={k}
            />
            <SubjectTile
              icon={BookOpen}
              en="CARS — Critical Reading"
              kh="CARS — ការអានវិភាគ"
              descEn="Read a passage on philosophy, ethics or art and answer reasoning questions. Pure thinking — no science needed."
              descKh="អានអត្ថបទអំពីទស្សនវិជ្ជា សីលធម៌ ឬសិល្បៈ ហើយឆ្លើយសំណួរវែកញែក។ ការគិតសុទ្ធសាធ — មិនត្រូវការវិទ្យាសាស្ត្រទេ។"
              k={k}
              highlight
            />
          </div>

          <p className={`mt-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Read the bottom-right tile carefully. ",
              "សូមអានកាតខាងស្តាំក្រោមដោយយកចិត្តទុកដាក់។ ",
            )}
            <strong style={{ color: FOCUS_GREEN }}>
              {t(
                "CARS is the section that surprises every student.",
                "CARS គឺជាផ្នែកដែលធ្វើឱ្យនិស្សិតគ្រប់រូបភ្ញាក់ផ្អើល។",
              )}
            </strong>
            {t(
              " It has nothing to do with medicine. It tests whether you can read a difficult, unfamiliar passage and reason about it carefully — exactly the skill a doctor uses every day reading patient histories, research papers and conflicting symptoms.",
              " វាគ្មានទាក់ទងនឹងវេជ្ជសាស្ត្រទេ។ វាសាកល្បងថាតើអ្នកអាចអានអត្ថបទពិបាក និងមិនធ្លាប់ឃើញ ហើយវែកញែកអំពីវាដោយប្រុងប្រយ័ត្នឬទេ — វាជាជំនាញដែលវេជ្ជបណ្ឌិតប្រើប្រាស់ជារៀងរាល់ថ្ងៃ ពេលអានប្រវត្តិអ្នកជំងឺ ឯកសារស្រាវជ្រាវ និងរោគសញ្ញាដែលផ្ទុយគ្នា។",
            )}
          </p>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · How to Study
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-study"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 02 · The right method"
          tagKh="កាត ០២ · វិធីសាស្ត្រត្រឹមត្រូវ"
          icon={Brain}
          accent="green"
          titleEn="How to Study"
          titleKh="វិធីសាស្ត្រសិក្សាដ៏ត្រឹមត្រូវ"
          k={k}
        >
          <p className={`text-slate-700 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Most students start studying for the MCAT the same way they studied for high school: open the textbook, read every page, highlight the important parts. Six months later, they sit the exam, and ",
              "និស្សិតភាគច្រើនចាប់ផ្តើមរៀន MCAT តាមរបៀបដូចគ្នានឹងពេលរៀនវិទ្យាល័យ ៖ បើកសៀវភៅ អានរាល់ទំព័រ គូសបន្ទាត់លើផ្នែកសំខាន់។ ប្រាំមួយខែក្រោយ ពួកគេអង្គុយប្រឡង ហើយ ",
            )}
            <strong style={{ color: ALERT_AMBER }}>
              {t(
                "they fail.",
                "ពួកគេធ្លាក់។",
              )}
            </strong>
            {t(
              " The reason is simple: the human brain forgets passive reading almost immediately. To survive the MCAT, you must study the way the brain actually learns.",
              " មូលហេតុគឺសាមញ្ញ ៖ ខួរក្បាលមនុស្សភ្លេចការអានបែបអសកម្មស្ទើរតែភ្លាមៗ។ ដើម្បីឆ្លងផុត MCAT អ្នកត្រូវរៀនតាមរបៀបដែលខួរក្បាលរៀនពិតប្រាកដ។",
            )}
          </p>

          {/* Passive vs Active comparison */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STUDY_BLUE }}
          >
            {t("Passive vs. Active", "អសកម្ម ទល់នឹង សកម្ម")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <MethodPanel
              tone="bad"
              labelEn="Passive Reading (the trap)"
              labelKh="ការអានបែបអសកម្ម (អន្ទាក់)"
              k={k}
              items={[
                { en: "Re-reading textbook chapters.", kh: "អានសៀវភៅសិក្សាម្តងហើយម្តងទៀត។" },
                { en: "Highlighting in 4 different colours.", kh: "គូសបន្ទាត់ដោយប្រើពណ៌ ៤ ផ្សេងៗគ្នា។" },
                { en: "Watching YouTube lectures back-to-back.", kh: "មើលវីដេអូបង្រៀននៅ YouTube តៗគ្នា។" },
                { en: "Feels productive. Brain forgets within 24 hours.", kh: "មានអារម្មណ៍ថាមានផលិតភាព។ ខួរក្បាលភ្លេចក្នុង ២៤ ម៉ោង។" },
              ]}
            />
            <MethodPanel
              tone="good"
              labelEn="Active Recall (the only way)"
              labelKh="ការរំលឹកសកម្ម (មានតែវិធីនេះប៉ុណ្ណោះ)"
              k={k}
              items={[
                { en: "Spaced-repetition flashcards (Anki).", kh: "កាតរំលឹកដោយចន្លោះពេល (ដូច Anki)។" },
                { en: "Closing the book and writing what you remember.", kh: "បិទសៀវភៅ ហើយសរសេរអ្វីដែលអ្នកចាំ។" },
                { en: "Solving thousands of practice questions.", kh: "ដោះស្រាយសំណួរហ្វឹកហាត់រាប់ពាន់។" },
                { en: "Forces the brain to retrieve. That's what builds memory.", kh: "បង្ខំខួរក្បាលឱ្យទាញព័ត៌មានចេញវិញ។ នោះជាអ្វីដែលកសាងការចងចាំ។" },
              ]}
            />
          </div>

          {/* Active recall loop */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: FOCUS_GREEN }}
          >
            {t("The Active Recall loop", "រង្វិលជុំការរំលឹកសកម្ម")}
          </h3>

          <ActiveRecallLoop k={k} />

          {/* Marathon training */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STUDY_BLUE }}
          >
            {t("Train the marathon, not the sprint", "ហ្វឹកម៉ារ៉ាតុង មិនមែនការរត់លឿន")}
          </h3>

          <div
            className="rounded-xl p-5 mb-2"
            style={{
              background: `linear-gradient(135deg, ${STUDY_BLUE_GLOW}, #ffffff 60%, ${FOCUS_GREEN_GLOW})`,
              border: `1px dashed ${STUDY_BLUE_MID}66`,
            }}
            data-testid="marathon-block"
          >
            <div className="flex items-start gap-3">
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-md flex-shrink-0"
                style={{ backgroundColor: "#ffffff", color: STUDY_BLUE }}
              >
                <Dumbbell className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className={`text-slate-800 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "The MCAT is 7.5 hours. Most adult brains have never had to focus that long on anything. So in the final 2 months of preparation, you must take ",
                    "ការប្រឡង MCAT មានរយៈពេល ៧.៥ ម៉ោង។ ខួរក្បាលមនុស្សពេញវ័យភាគច្រើនមិនដែលត្រូវផ្តោតយូរបែបនេះលើអ្វីមួយឡើយ។ ដូច្នេះក្នុងរយៈពេល ២ ខែចុងក្រោយនៃការត្រៀម អ្នកត្រូវធ្វើ ",
                  )}
                  <strong style={{ color: STUDY_BLUE }}>
                    {t(
                      "full-length, 7-hour practice tests under real conditions.",
                      "ការប្រឡងសាកល្បងពេញលេញរយៈពេល ៧ ម៉ោង តាមលក្ខខណ្ឌពិត។",
                    )}
                  </strong>
                  {t(
                    " No phone. No friends. No long lunch. Sit at the same desk and grind through the entire exam, just like marathon runners run the full 42 km before race day. This is how you build the mental endurance to not lose focus at hour 5 of the real exam.",
                    " គ្មានទូរស័ព្ទ។ គ្មានមិត្តភក្តិ។ គ្មានការសម្រាកអាហារយូរ។ អង្គុយលើតុដដែល ហើយធ្វើការប្រឡងពេញ ដូចជាអ្នករត់ម៉ារ៉ាតុងរត់ ៤២ គ.ម. ពេញ មុនថ្ងៃប្រណាំងពិត។ នេះគឺជារបៀបដែលអ្នកកសាងភាពអត់ធ្មត់នៃការផ្តោតអារម្មណ៍ ដើម្បីកុំឱ្យបាត់បង់ការផ្តោតនៅម៉ោងទី ៥ នៃការប្រឡងពិត។",
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · The Timeline
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-timeline"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <Card
          tagEn="Card 03 · The right time"
          tagKh="កាត ០៣ · ពេលវេលាត្រឹមត្រូវ"
          icon={CalendarDays}
          accent="blue"
          titleEn="The Timeline"
          titleKh="ពេលវេលាប្រឡង"
          k={k}
        >
          <p className={`text-slate-700 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "There is a right moment to take the MCAT — not too early (you have not finished the science yet) and not too late (you've forgotten the science you did finish). Most successful applicants follow this rhythm:",
              "មានពេលវេលាត្រឹមត្រូវសម្រាប់ប្រឡង MCAT — មិនលឿនពេក (អ្នកមិនទាន់បញ្ចប់វិទ្យាសាស្ត្រ) និងមិនយឺតពេក (អ្នកបានភ្លេចវិទ្យាសាស្ត្រដែលបានរៀន)។ បេក្ខជនជោគជ័យភាគច្រើនធ្វើតាមចង្វាក់នេះ ៖",
            )}
          </p>

          {/* Year-by-year university timeline */}
          <YearTimeline k={k} />

          {/* Prerequisites */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: STUDY_BLUE }}
          >
            {t("Prerequisites you must finish first", "មុខវិជ្ជាបឋមដែលត្រូវបញ្ចប់មុន")}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <PrereqTile icon={Atom} en="Biology I & II" kh="ជីវវិទ្យា I និង II" k={k} />
            <PrereqTile icon={FlaskConical} en="General Chemistry I & II" kh="គីមីទូទៅ I និង II" k={k} />
            <PrereqTile icon={FlaskConical} en="Organic Chemistry I & II" kh="គីមីសរីរាង្គ I និង II" k={k} />
            <PrereqTile icon={Sparkles} en="Physics I & II" kh="រូបវិទ្យា I និង II" k={k} />
          </div>

          {/* Hour budget */}
          <h3
            className={`text-sm font-bold mt-2 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: FOCUS_GREEN }}
          >
            {t("How many hours? Do the math.", "តើប៉ុន្មានម៉ោង? គណនាមើល។")}
          </h3>

          <HourBudget k={k} />

          <Callout color={FOCUS_GREEN} bg={FOCUS_GREEN_GLOW} icon={Target}>
            <strong>
              {t(
                "Treat MCAT prep like a part-time job. ",
                "ចាត់ទុកការត្រៀម MCAT ដូចជាការងារក្រៅម៉ោង។ ",
              )}
            </strong>
            {t(
              "20 to 25 focused hours per week, for 3 to 6 months, with weekly full-length practice exams in the final stretch. The students who clear the MCAT on the first try are not the smartest — they are the ones who took preparation as seriously as a job they could not afford to lose.",
              "២០ ទៅ ២៥ ម៉ោងផ្តោត ក្នុងមួយសប្តាហ៍ រយៈពេល ៣ ទៅ ៦ ខែ ជាមួយការប្រឡងសាកល្បងពេញលេញប្រចាំសប្តាហ៍ក្នុងដំណាក់កាលចុងក្រោយ។ និស្សិតដែលឆ្លងផុត MCAT លើកដំបូង មិនមែនជាអ្នកឆ្លាតបំផុតទេ — ពួកគេគឺជាអ្នកដែលចាត់ទុកការត្រៀមធ្ងន់ធ្ងរ ដូចជាការងារដែលពួកគេមិនអាចបាត់បង់បាន។",
            )}
          </Callout>
        </Card>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, #0c4a6e 0%, ${STUDY_BLUE} 55%, ${FOCUS_GREEN} 100%)`,
            color: "#ffffff",
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(134, 239, 172, 0.4)" }}
            aria-hidden="true"
          />
          <HeartPulse className="w-10 h-10 mx-auto mb-3" style={{ color: "#bbf7d0" }} aria-hidden="true" />
          <h3 className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${k ? "font-khmer leading-loose" : ""}`}>
            {t(
              "One test. One marathon. One profession.",
              "ការប្រឡងមួយ។ ម៉ារ៉ាតុងមួយ។ វិជ្ជាជីវៈមួយ។",
            )}
          </h3>
          <p className={`text-sm sm:text-base text-white max-w-2xl mx-auto ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The MCAT is not the end of the road — it is one gate on a 10-to-15-year journey. But it is a gate that respects only one thing: the student who shows up early, prepares deeply, and trains the brain like a marathon athlete trains the legs.",
              "ការប្រឡង MCAT មិនមែនជាទីបញ្ចប់នៃផ្លូវទេ — វាជាច្រកទ្វារមួយលើដំណើរ ១០ ទៅ ១៥ ឆ្នាំ។ ប៉ុន្តែវាជាច្រកទ្វារដែលគោរពតែរបស់មួយប៉ុណ្ណោះ ៖ និស្សិតដែលមកដល់មុន ត្រៀមខ្លួនយ៉ាងជ្រៅ និងហ្វឹកខួរក្បាលដូចអ្នកកីឡាម៉ារ៉ាតុងហ្វឹកជើង។",
            )}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 flex-wrap justify-center">
            <Pill icon={Repeat} en="Active Recall" kh="ការរំលឹកសកម្ម" k={k} />
            <Pill icon={Dumbbell} en="Marathon Training" kh="ការហ្វឹកម៉ារ៉ាតុង" k={k} />
            <Pill icon={GraduationCap} en="Junior Year" kh="ឆ្នាំទី ៣" k={k} />
          </div>
        </div>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/pathway-to-medicine"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-bold shadow hover:opacity-90 transition-opacity tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "uppercase"}`}
          style={{ backgroundColor: STUDY_BLUE }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Pathway to Medicine", "ត្រឡប់ទៅផ្លូវវេជ្ជសាស្ត្រ")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks
// ════════════════════════════════════════════════════════════════════════════

type Accent = "blue" | "green";

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
  const accentColor = accent === "blue" ? STUDY_BLUE : FOCUS_GREEN;
  const accentBorder = accent === "blue" ? STUDY_BLUE_MID : FOCUS_GREEN_MID;
  const accentBg = accent === "blue" ? STUDY_BLUE_LIGHT : FOCUS_GREEN_LIGHT;

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
        style={{ color: SLATE_INK }}
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
  color,
  bg,
  k,
}: {
  icon: LucideIcon;
  valueEn: string;
  valueKh: string;
  descEn: string;
  descKh: string;
  color: string;
  bg: string;
  k: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3 bg-white"
      style={{ border: `1px solid ${color}44` }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: bg, color }}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className={`font-display font-bold text-lg leading-tight ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? valueKh : valueEn}
        </div>
        <div className={`text-xs text-slate-600 mt-0.5 ${k ? "font-khmer" : ""}`}>
          {k ? descKh : descEn}
        </div>
      </div>
    </div>
  );
}

function SubjectTile({
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
  k,
  highlight,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
  k: boolean;
  highlight?: boolean;
}) {
  const color = highlight ? FOCUS_GREEN : STUDY_BLUE;
  const bg = highlight ? FOCUS_GREEN_GLOW : STUDY_BLUE_GLOW;
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${color}44` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-9 h-9 rounded-md"
          style={{ backgroundColor: bg, color }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? kh : en}
        </h4>
      </div>
      <p className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function MethodPanel({
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
  const color = isGood ? FOCUS_GREEN : ALERT_AMBER;
  const bg = isGood ? FOCUS_GREEN_GLOW : ALERT_AMBER_GLOW;
  const Icon = isGood ? CheckCircle2 : XCircle;
  return (
    <div
      className="rounded-xl p-4 bg-white"
      style={{ border: `1px solid ${color}55` }}
      data-testid={`method-panel-${tone}`}
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

function ActiveRecallLoop({ k }: { k: boolean }) {
  const steps: { n: string; icon: LucideIcon; en: string; kh: string }[] = [
    { n: "1", icon: BookOpen, en: "Read once", kh: "អានម្តង" },
    { n: "2", icon: XCircle, en: "Close the book", kh: "បិទសៀវភៅ" },
    { n: "3", icon: Brain, en: "Recall from memory", kh: "រំលឹកពីការចងចាំ" },
    { n: "4", icon: CheckCircle2, en: "Check & repeat tomorrow", kh: "ពិនិត្យ ហើយធ្វើឡើងវិញនៅថ្ងៃស្អែក" },
  ];
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: `linear-gradient(135deg, ${FOCUS_GREEN_GLOW} 0%, #ffffff 60%, ${STUDY_BLUE_GLOW} 100%)`,
        border: `1px dashed ${FOCUS_GREEN_MID}66`,
      }}
      data-testid="active-recall-loop"
    >
      <div className="grid sm:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="relative rounded-xl p-3 flex items-center gap-2 bg-white"
            style={{ border: `1px solid ${FOCUS_GREEN_MID}55` }}
          >
            <div
              className="absolute -top-2 -left-2 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow"
              style={{ backgroundColor: FOCUS_GREEN }}
              aria-hidden="true"
            >
              {s.n}
            </div>
            <div
              className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0 ml-1"
              style={{ backgroundColor: FOCUS_GREEN_LIGHT, color: FOCUS_GREEN }}
            >
              <s.icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${k ? "font-khmer" : ""}`} style={{ color: FOCUS_GREEN }}>
              {k ? s.kh : s.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YearTimeline({ k }: { k: boolean }) {
  const rows: {
    yearEn: string;
    yearKh: string;
    titleEn: string;
    titleKh: string;
    descEn: string;
    descKh: string;
    accent: "blue" | "green";
  }[] = [
    {
      yearEn: "Year 1",
      yearKh: "ឆ្នាំទី ១",
      titleEn: "Build the foundation",
      titleKh: "កសាងគ្រឹះ",
      descEn: "Take Biology I & II and General Chemistry I & II. Focus on truly understanding — not just passing.",
      descKh: "រៀន ជីវវិទ្យា I & II និង គីមីទូទៅ I & II។ ផ្តោតលើការយល់ដឹងពិតប្រាកដ — មិនមែនគ្រាន់តែប្រឡងជាប់។",
      accent: "blue",
    },
    {
      yearEn: "Year 2",
      yearKh: "ឆ្នាំទី ២",
      titleEn: "Add the harder sciences",
      titleKh: "បន្ថែមវិទ្យាសាស្ត្រពិបាកជាង",
      descEn: "Organic Chemistry I & II and Physics I & II. By the end of this year you have all the prerequisites.",
      descKh: "គីមីសរីរាង្គ I & II និង រូបវិទ្យា I & II។ នៅចុងឆ្នាំនេះ អ្នកមានមុខវិជ្ជាបឋមទាំងអស់។",
      accent: "blue",
    },
    {
      yearEn: "Year 3 (Junior)",
      yearKh: "ឆ្នាំទី ៣ (Junior)",
      titleEn: "Take the MCAT",
      titleKh: "ប្រឡង MCAT",
      descEn: "The standard year. You begin 3–6 months of dedicated MCAT prep, then sit the exam in spring or summer — in time to apply to medical school the same year.",
      descKh: "ឆ្នាំស្តង់ដារ។ អ្នកចាប់ផ្តើមការត្រៀម MCAT យ៉ាងប្តេជ្ញារយៈពេល ៣–៦ ខែ បន្ទាប់មកប្រឡងនៅរដូវផ្ការីក ឬរដូវក្តៅ — ទាន់ពេលដាក់ពាក្យចូលរៀននៅឆ្នាំដដែល។",
      accent: "green",
    },
    {
      yearEn: "Year 4",
      yearKh: "ឆ្នាំទី ៤",
      titleEn: "Apply to medical school",
      titleKh: "ដាក់ពាក្យចូលរៀនពេទ្យ",
      descEn: "MCAT score in hand, you submit applications, attend interviews, and finish your bachelor's degree.",
      descKh: "ជាមួយពិន្ទុ MCAT នៅក្នុងដៃ អ្នកដាក់ពាក្យសុំ ចូលសម្ភាសន៍ និងបញ្ចប់សញ្ញាបត្របរិញ្ញាបត្រ។",
      accent: "blue",
    },
  ];
  return (
    <div className="relative" data-testid="year-timeline">
      {/* vertical rail */}
      <div
        className="absolute top-2 bottom-2 left-[14px] sm:left-[18px] w-0.5"
        style={{
          background: `linear-gradient(180deg, ${STUDY_BLUE_MID}, ${FOCUS_GREEN_MID})`,
        }}
        aria-hidden="true"
      />
      <ol className="space-y-4">
        {rows.map((r, i) => {
          const dotColor = r.accent === "green" ? FOCUS_GREEN : STUDY_BLUE;
          const dotBg = r.accent === "green" ? FOCUS_GREEN_LIGHT : STUDY_BLUE_LIGHT;
          return (
            <li key={i} className="relative pl-10 sm:pl-12">
              <span
                className="absolute left-0 top-1.5 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: dotBg,
                  color: dotColor,
                  border: `2px solid ${dotColor}`,
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div
                className="rounded-xl p-4 bg-white"
                style={{ border: `1px solid ${dotColor}33` }}
              >
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${k ? "font-khmer tracking-normal normal-case" : ""}`}
                    style={{ backgroundColor: dotBg, color: dotColor }}
                  >
                    {k ? r.yearKh : r.yearEn}
                  </span>
                  <h4 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: SLATE_INK }}>
                    {k ? r.titleKh : r.titleEn}
                  </h4>
                </div>
                <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {k ? r.descKh : r.descEn}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PrereqTile({
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
    <div
      className="rounded-xl p-3 flex items-center gap-2 bg-white"
      style={{ border: `1px solid ${STUDY_BLUE_MID}44` }}
    >
      <div
        className="inline-flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0"
        style={{ backgroundColor: STUDY_BLUE_GLOW, color: STUDY_BLUE }}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
      <span className={`text-sm font-semibold ${k ? "font-khmer" : ""}`} style={{ color: STUDY_BLUE }}>
        {k ? kh : en}
      </span>
    </div>
  );
}

function HourBudget({ k }: { k: boolean }) {
  const rows: {
    monthsEn: string;
    monthsKh: string;
    weeksEn: string;
    weeksKh: string;
    hoursEn: string;
    hoursKh: string;
    note?: { en: string; kh: string };
    widthPct: number;
  }[] = [
    {
      monthsEn: "3 months",
      monthsKh: "៣ ខែ",
      weeksEn: "13 weeks",
      weeksKh: "១៣ សប្តាហ៍",
      hoursEn: "≈ 25 hrs / week → ≈ 325 hrs",
      hoursKh: "≈ ២៥ ម៉ោង / សប្តាហ៍ → ≈ ៣២៥ ម៉ោង",
      widthPct: 60,
    },
    {
      monthsEn: "6 months",
      monthsKh: "៦ ខែ",
      weeksEn: "26 weeks",
      weeksKh: "២៦ សប្តាហ៍",
      hoursEn: "≈ 20 hrs / week → ≈ 520 hrs",
      hoursKh: "≈ ២០ ម៉ោង / សប្តាហ៍ → ≈ ៥២០ ម៉ោង",
      note: {
        en: "Recommended for most students.",
        kh: "ណែនាំសម្រាប់និស្សិតភាគច្រើន។",
      },
      widthPct: 100,
    },
  ];
  return (
    <div
      className="rounded-xl p-4 bg-white mb-2"
      style={{ border: `1px solid ${FOCUS_GREEN_MID}44` }}
      data-testid="hour-budget"
    >
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[100px,1fr] items-center gap-3">
            <div
              className={`font-display font-bold text-right text-sm ${k ? "font-khmer" : ""}`}
              style={{ color: FOCUS_GREEN }}
            >
              {k ? r.monthsKh : r.monthsEn}
            </div>
            <div>
              <div
                className="h-3 rounded-full mb-1.5"
                style={{
                  width: `${r.widthPct}%`,
                  background: `linear-gradient(90deg, ${STUDY_BLUE_MID}, ${FOCUS_GREEN_MID})`,
                }}
                aria-hidden="true"
              />
              <div className={`text-xs text-slate-700 ${k ? "font-khmer" : ""}`}>
                <strong style={{ color: STUDY_BLUE }}>{k ? r.weeksKh : r.weeksEn}</strong>
                {" · "}
                {k ? r.hoursKh : r.hoursEn}
                {r.note && (
                  <span className={`ml-1 italic ${k ? "font-khmer not-italic" : ""}`} style={{ color: FOCUS_GREEN }}>
                    — {k ? r.note.kh : r.note.en}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
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
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/40 backdrop-blur px-3.5 py-1.5 text-sm font-semibold text-white border border-white/60">
      <Icon className="w-4 h-4" aria-hidden="true" />
      <span className={k ? "font-khmer" : ""}>{k ? kh : en}</span>
    </span>
  );
}
