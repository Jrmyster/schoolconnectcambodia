import {
  Activity,
  AlertTriangle,
  Apple,
  Bike,
  CheckCircle2,
  Clock,
  Dna,
  Droplet,
  ExternalLink,
  Eye,
  FlaskConical,
  HeartPulse,
  Key,
  Lock,
  MapPin,
  Scale,
  ShieldOff,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

type T = (en: string, kh: string) => string;

const TEAL       = "#0f766e";
const TEAL_DEEP  = "#134e4a";
const TEAL_SOFT  = "#ccfbf1";
const AMBER      = "#d97706";
const AMBER_DEEP = "#92400e";
const AMBER_SOFT = "#fef3c7";
const BLOOD      = "#b91c1c";
const BLOOD_SOFT = "#fee2e2";
const SAGE       = "#15803d";
const SAGE_SOFT  = "#dcfce7";
const PLUM       = "#7e22ce";
const PLUM_SOFT  = "#f3e8ff";
const INK        = "#1f2937";
const INK_SOFT   = "#475569";

export function DiabetesParadox({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-diabetes-paradox">
      {/* Sub-heading bar */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
          style={{ backgroundColor: TEAL }}
        >
          SEC-02M
        </span>
        <Droplet className="w-5 h-5" style={{ color: TEAL }} aria-hidden="true" />
        <h2
          className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: INK }}
          data-testid="diabetes-subheading"
        >
          {t("Metabolic Health", "សុខភាពមេតាបូលីច")}
        </h2>
        <div
          className="flex-1 border-t-2 border-dotted"
          style={{ borderColor: `${TEAL}55` }}
        />
      </div>

      {/* Module title card */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-7 mb-6 relative overflow-hidden"
        style={{
          borderColor: `${TEAL}44`,
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${TEAL_SOFT}, transparent 50%),
            radial-gradient(circle at 100% 100%, ${AMBER_SOFT}, transparent 55%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
          `,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl items-center justify-center bg-white border"
            style={{ borderColor: `${TEAL}55` }}
          >
            <Droplet className="w-7 h-7" style={{ color: BLOOD }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: TEAL_DEEP }}
            >
              <span>{t("Featured Module", "ម៉ូឌុលពិសេស")}</span>
              <span>·</span>
              <span>PHL-D1</span>
            </div>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
              data-testid="diabetes-title"
            >
              {t(
                "The Sugar Paradox: Understanding Diabetes",
                "ភាពផ្ទុយស្តីពីស្ករ៖ ការយល់ដឹងពីជំងឺទឹកនោមផ្អែម",
              )}
            </h3>
            <p
              className={`mt-1 text-sm sm:text-base font-semibold ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: TEAL_DEEP }}
            >
              {t(
                "How a sweet molecule turned into a global health crisis.",
                "របៀបដែលម៉ូលេគុលផ្អែម​មួយបានក្លាយជាវិបត្តិសុខភាពពិភពលោក។",
              )}
            </p>
            <p
              className={`mt-3 text-sm text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Sugar is the body's main fuel. But when the body loses the ability to control how much of it is in the blood, that same fuel becomes a slow-acting poison. Diabetes is one of the fastest-growing illnesses in Cambodia and around the world — yet most of the science behind it can be explained with one image: a lock and a key.",
                "ស្ករគឺជាប្រភពប្រេងឥន្ធនៈចម្បងរបស់រាងកាយ។ ប៉ុន្តែនៅពេលដែលរាងកាយបាត់បង់សមត្ថភាពគ្រប់គ្រងបរិមាណរបស់វានៅក្នុងឈាម ប្រេងនោះក្លាយជាជាតិពុលដែលប៉ះពាល់យ៉ាងយឺតៗ។ ជំងឺទឹកនោមផ្អែមគឺជាជំងឺមួយដែលកើនឡើងលឿនបំផុតនៅកម្ពុជា និងពាសពេញពិភពលោក — ប៉ុន្តែវិទ្យាសាស្ត្រភាគច្រើនដែលនៅពីក្រោយវា អាចពន្យល់បានដោយរូបភាពមួយ៖ សោ និងកូនសោ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── 1 · Microscopic Territory ─────────────────────────────────── */}
      <SubSectionHeader
        n="1"
        Icon={Activity}
        en="The Microscopic Territory"
        kh="ដែនមីក្រូទស្សន៍"
        accent={TEAL}
      />

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <Card
          k={k}
          Icon={Droplet}
          enName="What Is Diabetes?"
          khName="តើជំងឺទឹកនោមផ្អែមជាអ្វី?"
          enTag="too much sugar in the blood"
          khTag="ស្ករច្រើនពេកនៅក្នុងឈាម"
          enBody="Diabetes is a long-term condition in which the body cannot properly regulate the amount of glucose (sugar) in the blood. Healthy blood keeps sugar inside a narrow safe band; in diabetes, the level rises again and again, slowly damaging blood vessels, nerves, eyes, kidneys, and the heart."
          khBody="ជំងឺទឹកនោមផ្អែមគឺជាជំងឺរ៉ាំរ៉ៃ ដែលរាងកាយមិនអាចគ្រប់គ្រងបរិមាណគ្លុយកូស (ស្ករ) នៅក្នុងឈាមឱ្យបានត្រឹមត្រូវ។ ឈាមមានសុខភាពល្អ រក្សាស្ករនៅក្នុងកម្រិតសុវត្ថិភាពតូចចង្អៀត។ នៅក្នុងជំងឺទឹកនោមផ្អែម កម្រិតនេះកើនឡើងម្តងហើយម្តងទៀត ដោយធ្វើឱ្យខូចសរសៃឈាម សរសៃប្រសាទ ភ្នែក តម្រងនោម និងបេះដូងបន្តិចម្តងៗ។"
          accent={BLOOD}
          glow
        />
        <Card
          k={k}
          Icon={Key}
          enName="The Lock & Key (Insulin)"
          khName="សោ និងកូនសោ (អាំងស៊ុយលីន)"
          enTag="how sugar enters a cell"
          khTag="របៀបដែលស្ករចូលទៅក្នុងកោសិកា"
          enBody="Every cell in your body needs sugar for energy — but the cell doors are locked. The pancreas, an organ behind your stomach, makes a hormone called INSULIN. Insulin is the physical key that fits the lock on every cell door. When insulin clicks in, the door opens, sugar walks in, and the cell can finally make energy. No insulin = no key = sugar piles up outside, locked out."
          khBody="គ្រប់កោសិកានៅក្នុងរាងកាយរបស់អ្នក ត្រូវការស្ករសម្រាប់ថាមពល — ប៉ុន្តែទ្វារកោសិកាត្រូវបានចាក់សោ។ លំពែង (សរីរាង្គនៅពីក្រោយក្រពះ) ផលិតអរម៉ូនឈ្មោះ អាំងស៊ុយលីន។ អាំងស៊ុយលីនគឺជាកូនសោដែលត្រូវនឹងសោនៅលើទ្វារកោសិកានីមួយៗ។ នៅពេលអាំងស៊ុយលីនចូលទៅក្នុងសោ ទ្វារបើក ស្ករដើរចូល ហើយកោសិកាអាចបង្កើតថាមពលបាន។ គ្មានអាំងស៊ុយលីន = គ្មានកូនសោ = ស្ករកកកុញនៅខាងក្រៅ ត្រូវបានបិទចេញ។"
          accent={AMBER}
          glow
        >
          <LockKeyDiagram k={k} t={t} />
        </Card>
      </div>

      <Card
        k={k}
        Icon={AlertTriangle}
        enName="The Malfunction"
        khName="ការបាត់បង់មុខងារ"
        enTag="two ways the system can break"
        khTag="ផ្លូវពីរដែលប្រព័ន្ធនេះអាចខូច"
        enBody="There are exactly two ways this lock-and-key system can break. EITHER the pancreas stops making the keys — there is no insulin at all, and no door can open. OR the pancreas still makes keys, but the locks themselves get jammed and stop responding to the key — the door simply ignores the insulin. Both versions end the same way: sugar trapped in the bloodstream, hungry cells starving inside."
        khBody="មានវិធីពីរយ៉ាងច្បាស់លាស់ ដែលប្រព័ន្ធសោនិងកូនសោនេះអាចខូច។ ទីមួយ លំពែងឈប់ផលិតកូនសោ — គ្មានអាំងស៊ុយលីនទាល់តែសោះ ហើយគ្មានទ្វារណាមួយអាចបើកបានទេ។ ឬទីពីរ លំពែងនៅតែផលិតកូនសោ ប៉ុន្តែសោផ្ទាល់ត្រូវបានជាប់ ហើយឈប់ឆ្លើយតបទៅនឹងកូនសោ — ទ្វារនោះមិនរវល់នឹងអាំងស៊ុយលីន។ កំណែទាំងពីរបញ្ចប់ដូចគ្នា៖ ស្ករជាប់នៅក្នុងសរសៃឈាម កោសិកាដែលឃ្លានស្តីនៅខាងក្នុង។"
        accent={PLUM}
      />

      {/* Type 1 vs Type 2 — side-by-side */}
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <TypeCard
          k={k}
          tag={t("Type 1", "ប្រភេទទី ១")}
          tagSubEn="autoimmune"
          tagSubKh="ស្វ័យប្រតិកម្ម"
          Icon={ShieldOff}
          accent={BLOOD}
          enTitle="The body attacks its own pancreas"
          khTitle="រាងកាយវាយលុកលំពែងរបស់ខ្លួនឯង"
          enBody="In Type 1 diabetes, the immune system — the body's own defence army — gets confused and destroys the cells in the pancreas that make insulin. The pancreas can no longer make any keys at all. It often appears in childhood or young adulthood, and people with Type 1 must inject insulin every day for life."
          khBody="នៅក្នុងជំងឺទឹកនោមផ្អែមប្រភេទទី ១ ប្រព័ន្ធការពាររាងកាយ (កងទ័ពការពារផ្ទាល់ខ្លួន) មានការច្រឡំ និងបំផ្លាញកោសិកានៅក្នុងលំពែងដែលផលិតអាំងស៊ុយលីន។ លំពែងលែងអាចផលិតកូនសោបានទៀតទេ។ ជារឿយៗវាបង្ហាញខ្លួននៅពេលកុមារភាព ឬវ័យជំទង់ ហើយអ្នកដែលមានប្រភេទទី ១ ត្រូវចាក់ថ្នាំអាំងស៊ុយលីនរៀងរាល់ថ្ងៃពេញមួយជីវិត។"
          bullets={[
            { en: "No insulin produced at all", kh: "គ្មានអាំងស៊ុយលីនត្រូវបានផលិតទាល់តែសោះ" },
            { en: "Usually starts young", kh: "ជាធម្មតាចាប់ផ្តើមនៅវ័យក្មេង" },
            { en: "Cannot be prevented by diet", kh: "មិនអាចបង្ការដោយរបបអាហារទេ" },
            { en: "Treated with insulin injections", kh: "ព្យាបាលដោយការចាក់អាំងស៊ុយលីន" },
          ]}
        />
        <TypeCard
          k={k}
          tag={t("Type 2", "ប្រភេទទី ២")}
          tagSubEn="metabolic"
          tagSubKh="មេតាបូលីច"
          Icon={Scale}
          accent={AMBER}
          enTitle="The locks stop responding"
          khTitle="សោឈប់ឆ្លើយតប"
          enBody="In Type 2 diabetes, the pancreas still makes insulin keys — but after years of very high sugar load, the locks on the cells become resistant. They simply do not respond. This usually develops slowly over many years and is closely tied to diet, family history, weight, and physical activity. It is now the most common type in adults across Cambodia."
          khBody="នៅក្នុងជំងឺទឹកនោមផ្អែមប្រភេទទី ២ លំពែងនៅតែផលិតកូនសោអាំងស៊ុយលីន — ប៉ុន្តែបន្ទាប់ពីរយៈពេលជាច្រើនឆ្នាំនៃការទទួលស្ករយ៉ាងច្រើន សោនៅលើកោសិកាក្លាយជាមានភាពធន់។ ពួកវាមិនឆ្លើយតបទេ។ វាជាធម្មតាវិវឌ្ឍបន្តិចម្តងៗរយៈពេលជាច្រើនឆ្នាំ ហើយត្រូវបានភ្ជាប់យ៉ាងជិតស្និទ្ធនឹងរបបអាហារ ប្រវត្តិគ្រួសារ ទម្ងន់ និងសកម្មភាពរាងកាយ។ វាឥឡូវជាប្រភេទសាមញ្ញបំផុតចំពោះមនុស្សពេញវ័យនៅទូទាំងប្រទេសកម្ពុជា។"
          bullets={[
            { en: "Insulin made, but ignored (resistance)", kh: "អាំងស៊ុយលីនត្រូវបានផលិត ប៉ុន្តែមិនឆ្លើយតប (ភាពធន់)" },
            { en: "Develops slowly in adults", kh: "វិវឌ្ឍយឺតៗចំពោះមនុស្សពេញវ័យ" },
            { en: "Strongly linked to diet & lifestyle", kh: "ភ្ជាប់យ៉ាងខ្លាំងនឹងរបបអាហារ និងរបៀបរស់នៅ" },
            { en: "Often preventable & manageable", kh: "ច្រើនអាចបង្ការ និងគ្រប់គ្រងបាន" },
          ]}
        />
      </div>

      {/* ── 2 · History & Manufacturing ──────────────────────────────── */}
      <SubSectionHeader
        n="2"
        Icon={Clock}
        en="History & Manufacturing"
        kh="ប្រវត្តិ និងការផលិត"
        accent={PLUM}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Card
          k={k}
          Icon={Clock}
          enName="A 3,000-Year-Old Mystery"
          khName="អាថ៌កំបាំងមួយដែលមានអាយុ ៣.០០០ ឆ្នាំ"
          enTag="from sweet urine to saved lives"
          khTag="ពីទឹកនោមផ្អែម ដល់ជីវិតដែលត្រូវបានសង្គ្រោះ"
          enBody="Ancient doctors in India and Egypt diagnosed diabetes in a startling way: they noticed that ants and flies were attracted to the urine of certain sick people. The urine was sweet — that was the first clue that sugar was leaking out of the body. For thousands of years there was no cure, and a Type 1 diagnosis was a death sentence. Then in 1921, two Canadian scientists, Banting and Best, extracted insulin from the pancreases of dogs and cows and injected it into a dying boy. He lived. It is one of the most dramatic rescues in medical history."
          khBody="វេជ្ជបណ្ឌិតបុរាណនៅឥណ្ឌា និងអេហ្ស៊ីបបានធ្វើការវិនិច្ឆ័យជំងឺទឹកនោមផ្អែម ដោយវិធីគួរឱ្យភ្ញាក់ផ្អើល៖ ពួកគេបានកត់សម្គាល់ឃើញថា ស្រមោច និងរុយត្រូវបានទាក់ទាញដោយទឹកនោមរបស់អ្នកជំងឺមួយចំនួន។ ទឹកនោមមានរសជាតិផ្អែម — នោះជាសញ្ញាដំបូងថាស្ករកំពុងលេចចេញពីរាងកាយ។ អស់រយៈពេលរាប់ពាន់ឆ្នាំមកហើយ គ្មានការព្យាបាល ហើយការវិនិច្ឆ័យប្រភេទទី ១ គឺជាការផ្តន្ទាទោសប្រហារជីវិត។ បន្ទាប់មកនៅឆ្នាំ ១៩២១ អ្នកវិទ្យាសាស្ត្រកាណាដាពីរនាក់ឈ្មោះ បេនធីង និង ប៊ែសត៍ បានដកស្រង់អាំងស៊ុយលីនពីលំពែងរបស់ឆ្កែ និងគោ ហើយចាក់ទៅក្នុងក្មេងប្រុសម្នាក់ដែលជិតស្លាប់។ គាត់បានរស់។ វាជាការសង្គ្រោះដ៏អស្ចារ្យបំផុតមួយក្នុងប្រវត្តិសាស្ត្រវេជ្ជសាស្ត្រ។"
          accent={PLUM}
        >
          <Callout
            k={k}
            Icon={Sparkles}
            labelEn="The first clue"
            labelKh="សញ្ញាដំបូង"
            enTitle="Ants showed humans what microscopes could not"
            khTitle="ស្រមោចបង្ហាញមនុស្សនូវអ្វីដែលមីក្រូទស្សន៍មិនអាចបង្ហាញ"
            enBody="Long before chemistry existed, simple observation of nature gave doctors the right diagnosis. Science begins with paying attention."
            khBody="មុនពេលមានគីមីវិទ្យាយូរយារណាស់ ការសង្កេតធម្មជាតិដ៏សាមញ្ញបានផ្តល់ឱ្យវេជ្ជបណ្ឌិតនូវការវិនិច្ឆ័យត្រឹមត្រូវ។ វិទ្យាសាស្ត្រចាប់ផ្តើមដោយការយកចិត្តទុកដាក់។"
            accent={PLUM}
          />
        </Card>

        <Card
          k={k}
          Icon={FlaskConical}
          enName="Modern Manufacturing"
          khName="ការផលិតសម័យទំនើប"
          enTag="bacteria as tiny insulin factories"
          khTag="បាក់តេរីជារោងចក្រអាំងស៊ុយលីនតូចៗ"
          enBody="Today we no longer need cows or dogs. Scientists use a futuristic technique called RECOMBINANT DNA. They take the human gene that codes for insulin and insert it into harmless bacteria or yeast cells. Those microscopic organisms then grow in giant tanks and pump out pure human insulin — exactly the same molecule your own pancreas would make. This is one of the great gifts of biotechnology to public health: a life-saving medicine, made by reprogrammed living cells."
          khBody="សព្វថ្ងៃនេះ យើងលែងត្រូវការគោ ឬឆ្កែទៀតទេ។ អ្នកវិទ្យាសាស្ត្រប្រើបច្ចេកទេសសម័យអនាគតមួយឈ្មោះ ឌី.អិន.អេ ផ្សំឡើងវិញ (Recombinant DNA)។ ពួកគេយកហ្សែនមនុស្សដែលកំណត់រូបមន្តអាំងស៊ុយលីន ហើយដាក់បញ្ចូលទៅក្នុងបាក់តេរី ឬកោសិកាខ្មាដែលគ្មានគ្រោះថ្នាក់។ ភាវៈមីក្រូទស្សន៍ទាំងនោះ បន្ទាប់មកលូតលាស់នៅក្នុងធុងធំៗ ហើយបូមចេញនូវអាំងស៊ុយលីនមនុស្សសុទ្ធ — ដូចជាម៉ូលេគុលដែលលំពែងផ្ទាល់ខ្លួនរបស់អ្នកនឹងផលិតបាន។ នេះគឺជាអំណោយដ៏ធំមួយរបស់បច្ចេកវិទ្យាជីវសាស្ត្រដល់សុខភាពសាធារណៈ៖ ឱសថដែលជួយសង្គ្រោះជីវិត ដែលផលិតដោយកោសិការស់ដែលត្រូវបានកម្មវិធីឡើងវិញ។"
          accent={TEAL}
          glow
        >
          <RecombinantStrip k={k} t={t} />
        </Card>
      </div>

      {/* ── 3 · Warning Signs & Prevention ───────────────────────────── */}
      <SubSectionHeader
        n="3"
        Icon={AlertTriangle}
        en="Warning Signs & Prevention"
        kh="រោគសញ្ញា និងការការពារ"
        accent={SAGE}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Panel
          k={k}
          Icon={AlertTriangle}
          accent={BLOOD}
          enTitle="Early Warning Signs"
          khTitle="រោគសញ្ញាដំបូង"
          enBody="If a friend or family member shows several of these signs at once, encourage them to visit a clinic. Diabetes does not announce itself loudly — it whispers, for years."
          khBody="ប្រសិនបើមិត្តភក្តិ ឬសមាជិកគ្រួសារបង្ហាញសញ្ញាទាំងនេះច្រើនក្នុងពេលតែមួយ លើកទឹកចិត្តពួកគេឱ្យទៅពិនិត្យនៅគ្លីនិក។ ជំងឺទឹកនោមផ្អែមមិនប្រកាសខ្លួនវាខ្លាំងៗទេ — វាខ្សឹប អស់រយៈពេលជាច្រើនឆ្នាំ។"
          items={[
            { Icon: Droplet,     en: "Extreme thirst that never goes away",       kh: "ស្រេកទឹកខ្លាំងដែលមិនរសាយបាត់" },
            { Icon: Activity,    en: "Frequent urination, especially at night",    kh: "នោមញឹក ជាពិសេសនៅពេលយប់" },
            { Icon: Scale,       en: "Unexplained weight loss",                    kh: "ស្រកទម្ងន់ដោយគ្មានហេតុផល" },
            { Icon: Eye,         en: "Blurry, hazy vision",                        kh: "ភ្នែកព្រិល មិនច្បាស់" },
            { Icon: HeartPulse,  en: "Chronic tiredness, even after rest",         kh: "នឿយហត់រ៉ាំរ៉ៃ សូម្បីបន្ទាប់ពីសម្រាក" },
          ]}
        />

        <Panel
          k={k}
          Icon={CheckCircle2}
          accent={SAGE}
          enTitle="Lowering the Risk (Type 2)"
          khTitle="ការបន្ថយហានិភ័យ (ប្រភេទទី ២)"
          enBody="Type 2 diabetes is one of the most preventable serious illnesses on earth. Three habits — eating, moving, resting — protect the lock-and-key system inside every cell."
          khBody="ជំងឺទឹកនោមផ្អែមប្រភេទទី ២ គឺជាជំងឺធ្ងន់ធ្ងរមួយដែលអាចបង្ការបានច្រើនបំផុតនៅលើផែនដី។ ទម្លាប់បីយ៉ាង — ការញ៉ាំ ការផ្លាស់ទី និងការសម្រាក — ការពារប្រព័ន្ធសោនិងកូនសោនៅក្នុងគ្រប់កោសិកា។"
          items={[
            { Icon: Apple,      en: "Less white rice & refined sugar — more vegetables, fish, and beans", kh: "បាយសច្រើនពេក និងស្ករសម្រួច បន្តិច — បន្លែ ត្រី និងសណ្តែក ច្រើន" },
            { Icon: Bike,       en: "Move every day — walk, cycle, dance, work in the field",            kh: "ផ្លាស់ទីរាល់ថ្ងៃ — ដើរ ជិះកង់ រាំ ធ្វើស្រែ" },
            { Icon: HeartPulse, en: "Sleep 7–8 hours and protect yourself from chronic stress",          kh: "គេងពី ៧–៨ ម៉ោង និងការពារខ្លួនពីភាពតានតឹងរ៉ាំរ៉ៃ" },
            { Icon: Stethoscope,en: "If diabetes runs in your family, get a fasting blood test yearly",   kh: "បើជំងឺនេះមាននៅក្នុងគ្រួសារ ត្រូវធ្វើតេស្តឈាមតមជារៀងរាល់ឆ្នាំ" },
          ]}
        />
      </div>

      {/* ── 4 · Local Action Plan — Cambodia ─────────────────────────── */}
      <SubSectionHeader
        n="4"
        Icon={MapPin}
        en="Local Action Plan — Finding Help in Cambodia"
        kh="ផែនការសកម្មភាពមូលដ្ឋាន — ការស្វែងរកជំនួយនៅកម្ពុជា"
        accent={SUNRISE_HEX}
      />

      <div
        className="rounded-3xl border-2 p-5 sm:p-6 mb-5"
        style={{
          borderColor: `${SUNRISE_HEX}33`,
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${SUNRISE_SOFT} 100%)`,
        }}
      >
        <p className={`text-sm sm:text-base text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "If someone in your village is showing the warning signs above, do not wait. A simple finger-prick blood test, often free or low-cost, can save them from blindness, kidney failure, and amputation later in life. Here is where to go.",
            "ប្រសិនបើនរណាម្នាក់នៅក្នុងភូមិរបស់អ្នកកំពុងបង្ហាញរោគសញ្ញាដែលបានរៀបរាប់ខាងលើ កុំរង់ចាំ។ ការធ្វើតេស្តឈាមដោយចាក់ម្រាមដៃដ៏សាមញ្ញ ដែលជារឿយៗឥតគិតថ្លៃ ឬមានតម្លៃទាប អាចជួយសង្គ្រោះពួកគេពីភ្នែកខ្វាក់ ការខ្សោយតម្រងនោម និងការកាត់អវយវៈនៅពេលក្រោយ។ នេះជាកន្លែងដែលត្រូវទៅ។",
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Resource
          k={k}
          Icon={HeartPulse}
          accent={SUNRISE_HEX}
          enTitle="Provincial Referral Hospitals"
          khTitle="មន្ទីរពេទ្យបង្អែកខេត្ត"
          enTag="first stop for diagnosis & insulin"
          khTag="ចំណតដំបូងសម្រាប់ការវិនិច្ឆ័យ និងអាំងស៊ុយលីន"
          enBody="Every province in Cambodia has at least one Referral Hospital. These hospitals can perform blood-sugar tests, confirm a diagnosis, prescribe insulin or oral medication, and follow up over time. Bring an ID card and any previous medical records. For Type 1 diabetes, insulin is essential and life-saving — never stop taking it without a doctor's guidance."
          khBody="គ្រប់ខេត្តនៅកម្ពុជា មានយ៉ាងហោចណាស់មន្ទីរពេទ្យបង្អែកមួយ។ មន្ទីរពេទ្យទាំងនេះអាចធ្វើការតេស្តស្ករឈាម បញ្ជាក់ការវិនិច្ឆ័យ ផ្តល់អាំងស៊ុយលីន ឬឱសថផ្ទាល់មាត់ និងតាមដានរយៈពេលយូរ។ យកប័ណ្ណសម្គាល់ខ្លួន និងកំណត់ត្រាវេជ្ជសាស្ត្រពីមុនមកជាមួយ។ សម្រាប់ជំងឺទឹកនោមផ្អែមប្រភេទទី ១ អាំងស៊ុយលីនមានសារៈសំខាន់ណាស់ ហើយជួយសង្គ្រោះជីវិត — កុំឈប់ប្រើវាដោយគ្មានការណែនាំពីវេជ្ជបណ្ឌិត។"
          bullets={[
            { en: "Blood-sugar testing on the spot", kh: "ការតេស្តស្ករឈាមនៅនឹងកន្លែង" },
            { en: "Insulin & metformin available",   kh: "មានអាំងស៊ុយលីន និងម៉េតហ្វមីន" },
            { en: "Free or subsidised for the poor", kh: "ឥតគិតថ្លៃ ឬឧបត្ថម្ភធនសម្រាប់អ្នកក្រ" },
          ]}
        />

        <Resource
          k={k}
          Icon={Users}
          accent={TEAL}
          enTitle="MoPoTsyo Patient Information Centre"
          khTitle="មជ្ឈមណ្ឌលព័ត៌មានអ្នកជំងឺ MoPoTsyo"
          enTag="a Cambodian NGO supporting patients"
          khTag="អង្គការក្រៅរដ្ឋាភិបាលកម្ពុជាដែលគាំទ្រអ្នកជំងឺ"
          enBody="MoPoTsyo is a well-known Cambodian non-profit that has built a country-wide network of trained 'peer educators' — people who themselves live with diabetes and now help others in their village. They organise affordable blood-sugar testing, group medication purchases, and education sessions in communes far from the city. For rural patients, this is often the most accessible long-term support."
          khBody={'MoPoTsyo គឺជាអង្គការមិនរកប្រាក់ចំណេញកម្ពុជាដ៏ល្បីល្បាញមួយ ដែលបានបង្កើតបណ្តាញទូទាំងប្រទេសនៃ «អ្នកអប់រំមិត្តភក្តិ» ដែលបានបណ្តុះបណ្តាល — មនុស្សដែលរស់នៅជាមួយជំងឺទឹកនោមផ្អែមដោយខ្លួនឯង ហើយឥឡូវនេះជួយអ្នកដទៃនៅក្នុងភូមិរបស់ពួកគេ។ ពួកគេរៀបចំការតេស្តស្ករឈាមតម្លៃសមរម្យ ការទិញឱសថជាក្រុម និងវគ្គបណ្ដុះបណ្ដាលនៅក្នុងឃុំឆ្ងាយពីទីក្រុង។ សម្រាប់អ្នកជំងឺជនបទ នេះជារឿយៗគឺជាការគាំទ្ររយៈពេលវែងដែលអាចទទួលបានបំផុត។'}
          bullets={[
            { en: "Trained peer educators in each commune", kh: "អ្នកអប់រំមិត្តភក្តិបណ្តុះបណ្តាលនៅក្នុងឃុំនីមួយៗ" },
            { en: "Affordable medication & test strips",     kh: "ឱសថ និងបន្ទះតេស្តតម្លៃសមរម្យ" },
            { en: "Group education sessions in Khmer",       kh: "វគ្គអប់រំជាក្រុមជាភាសាខ្មែរ" },
          ]}
          link={{
            href: "https://www.mopotsyo.org",
            en: "Visit MoPoTsyo",
            kh: "ចូលទៅកាន់ MoPoTsyo",
          }}
        />
      </div>

      {/* Closing big-idea ribbon */}
      <div
        className="mt-8 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3"
        style={{
          borderColor: `${TEAL}55`,
          backgroundImage: `linear-gradient(135deg, ${TEAL_SOFT} 0%, ${AMBER_SOFT} 100%)`,
        }}
        data-testid="diabetes-closing"
      >
        <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: TEAL_DEEP }} />
        <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong className={k ? "" : "font-bold"}>
            {t("The big idea: ", "គំនិតធំ ៖ ")}
          </strong>
          {t(
            "Diabetes is the body forgetting how to use its own fuel. Knowing the lock-and-key story turns a frightening disease into something a 14-year-old can explain to their grandmother — and once a village can explain it, a village can prevent it.",
            "ជំងឺទឹកនោមផ្អែម គឺជារាងកាយដែលភ្លេចរបៀបប្រើប្រេងឥន្ធនៈរបស់ខ្លួនឯង។ ការដឹងពីរឿងសោនិងកូនសោ ប្រែជំងឺគួរឱ្យខ្លាចមួយទៅជាអ្វីដែលក្មេងអាយុ ១៤ ឆ្នាំអាចពន្យល់ជូនជីដូនរបស់ពួកគេបាន — ហើយនៅពេលដែលភូមិមួយអាចពន្យល់វាបាន ភូមិនោះអាចបង្ការវាបាន។",
          )}
        </p>
      </div>
    </section>
  );
}

// ─── Local helper: SUNRISE colors (matched to the page's hero palette) ─────
const SUNRISE_HEX  = "#ea580c";
const SUNRISE_SOFT = "#fed7aa";

// ─── Sub-section header ───────────────────────────────────────────────────
function SubSectionHeader({
  n,
  Icon,
  en,
  kh,
  accent,
}: {
  n: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  accent: string;
}) {
  return (
    <div className="mt-8 mb-4 flex items-center gap-3">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-md px-2 py-1"
        style={{ backgroundColor: accent }}
      >
        D{n}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden="true" />
      <h3 className="text-lg sm:text-xl font-bold" style={{ color: INK }}>
        <span>{en}</span>
        <span className="font-khmer font-bold ml-2 text-base sm:text-lg" style={{ color: accent }}>
          · {kh}
        </span>
      </h3>
      <div className="flex-1 border-t border-dotted" style={{ borderColor: `${accent}44` }} />
    </div>
  );
}

// ─── Reusable concept card ───────────────────────────────────────────────
function Card({
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
  children,
}: {
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
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}22 inset, 0 12px 30px -16px ${accent}66`
          : "0 6px 18px -12px rgba(15, 23, 42, 0.18)",
      }}
      data-testid={`d-card-${enName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
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
          <h4
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            <span className="block">{enName}</span>
            <span className="block font-khmer text-base sm:text-lg mt-0.5" style={{ color: accent }}>
              {khName}
            </span>
          </h4>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
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

// ─── Type 1 / Type 2 comparison card ──────────────────────────────────────
function TypeCard({
  k,
  tag,
  tagSubEn,
  tagSubKh,
  Icon,
  accent,
  enTitle,
  khTitle,
  enBody,
  khBody,
  bullets,
}: {
  k: boolean;
  tag: string;
  tagSubEn: string;
  tagSubKh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  bullets: { en: string; kh: string }[];
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 border-2 bg-white flex flex-col"
      style={{
        borderColor: `${accent}66`,
        boxShadow: `0 12px 30px -18px ${accent}55`,
      }}
      data-testid={`type-card-${tagSubEn}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-white font-bold text-sm px-3 py-1 rounded-full"
          style={{ backgroundColor: accent }}
        >
          {tag}
        </span>
        <span
          className={`text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: accent }}
        >
          {k ? tagSubKh : tagSubEn}
        </span>
        <Icon className="w-5 h-5 ml-auto" style={{ color: accent }} aria-hidden="true" />
      </div>
      <h4
        className={`text-base sm:text-lg font-bold mb-2 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: INK }}
      >
        {k ? khTitle : enTitle}
      </h4>
      <p className={`text-sm text-slate-700 mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
      <ul className="space-y-2 mt-auto">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}66` }}
            >
              <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            </span>
            <span className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : ""}`}>
              {k ? b.kh : b.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Symptom / prevention list panel ──────────────────────────────────────
function Panel({
  k,
  Icon,
  accent,
  enTitle,
  khTitle,
  enBody,
  khBody,
  items,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  items: { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; en: string; kh: string }[];
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 p-5 sm:p-6"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 8px 24px -16px ${accent}55`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <h4
          className={`text-base sm:text-lg font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: INK }}
        >
          <span className="block">{enTitle}</span>
          <span className="block font-khmer text-sm sm:text-base mt-0.5" style={{ color: accent }}>
            {khTitle}
          </span>
        </h4>
      </div>
      <p className={`text-sm text-slate-700 mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
      <ul className="space-y-2.5">
        {items.map(({ Icon: ItemIcon, en, kh }, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
            >
              <ItemIcon className="w-3.5 h-3.5" style={{ color: accent }} />
            </span>
            <div className="text-sm text-slate-700 leading-relaxed">
              <span className="block">{en}</span>
              <span className="block font-khmer text-xs leading-loose" style={{ color: INK_SOFT }}>
                {kh}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Resource card (Cambodia local action) ────────────────────────────────
function Resource({
  k,
  Icon,
  accent,
  enTitle,
  khTitle,
  enTag,
  khTag,
  enBody,
  khBody,
  bullets,
  link,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  enTitle: string;
  khTitle: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  bullets: { en: string; kh: string }[];
  link?: { href: string; en: string; kh: string };
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 p-5 sm:p-6 flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 10px 28px -18px ${accent}66`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
            <span className="block">{enTitle}</span>
            <span className="block font-khmer text-base mt-0.5" style={{ color: accent }}>
              {khTitle}
            </span>
          </h4>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
      </div>
      <p className={`text-sm text-slate-700 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
      <ul className="space-y-1.5 mb-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accent }} />
            <span className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : ""}`}>
              {k ? b.kh : b.en}
            </span>
          </li>
        ))}
      </ul>
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex items-center gap-1.5 self-start text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full text-white hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
          style={{ backgroundColor: accent }}
          data-testid={`resource-link-${link.href.replace(/[^a-z0-9]+/gi, "-")}`}
        >
          {k ? link.kh : link.en}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      ) : null}
    </div>
  );
}

// ─── Inline Callout (matches PublicHealthPage style) ──────────────────────
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
      <h5 className={`font-bold text-sm sm:text-base mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
        {k ? khTitle : enTitle}
      </h5>
      <p className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ─── Tiny inline lock-and-key visual ──────────────────────────────────────
function LockKeyDiagram({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center justify-around gap-2 sm:gap-4"
      style={{ backgroundColor: AMBER_SOFT, border: `1px solid ${AMBER}44` }}
      aria-label={t("Sugar + insulin key opens the cell door", "ស្ករ + កូនសោអាំងស៊ុយលីន បើកទ្វារកោសិកា")}
    >
      <Token Icon={Droplet} label={t("Sugar", "ស្ករ")} color={BLOOD} k={k} />
      <span className="text-amber-700 text-xl font-bold" aria-hidden="true">+</span>
      <Token Icon={Key} label={t("Insulin", "អាំងស៊ុយលីន")} color={AMBER_DEEP} k={k} />
      <span className="text-amber-700 text-xl font-bold" aria-hidden="true">→</span>
      <Token Icon={Lock} label={t("Open cell", "បើកកោសិកា")} color={SAGE} k={k} />
    </div>
  );
}

function Token({
  Icon,
  label,
  color,
  k,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  color: string;
  k: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-0">
      <div
        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center"
        style={{ border: `1.5px solid ${color}66` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <span
        className={`text-[10px] font-bold text-center ${k ? "font-khmer text-[11px]" : ""}`}
        style={{ color: INK_SOFT }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Tiny inline recombinant-DNA strip ────────────────────────────────────
function RecombinantStrip({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center justify-around gap-2 sm:gap-3"
      style={{ backgroundColor: TEAL_SOFT, border: `1px solid ${TEAL}44` }}
      aria-label={t(
        "Human gene is inserted into bacteria, which then produce pure insulin",
        "ហ្សែនមនុស្សត្រូវបានដាក់បញ្ចូលទៅក្នុងបាក់តេរី ដែលផលិតអាំងស៊ុយលីនសុទ្ធ",
      )}
    >
      <Token Icon={Dna} label={t("Human gene", "ហ្សែនមនុស្ស")} color={PLUM} k={k} />
      <span className="text-teal-700 text-xl font-bold" aria-hidden="true">→</span>
      <Token Icon={FlaskConical} label={t("Bacteria", "បាក់តេរី")} color={TEAL_DEEP} k={k} />
      <span className="text-teal-700 text-xl font-bold" aria-hidden="true">→</span>
      <Token Icon={Droplet} label={t("Insulin", "អាំងស៊ុយលីន")} color={AMBER_DEEP} k={k} />
    </div>
  );
}
