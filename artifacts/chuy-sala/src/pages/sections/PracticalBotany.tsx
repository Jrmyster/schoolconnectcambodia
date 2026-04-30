import {
  AlertTriangle,
  Axe,
  Bird,
  Bug,
  CloudRain,
  Droplets,
  Flame,
  Flower2,
  HandHeart,
  Layers,
  Leaf,
  Mountain,
  Recycle,
  Shovel,
  Sparkles,
  Sprout,
  Sun,
  TreeDeciduous,
  TreePine,
  Trees,
} from "lucide-react";

type T = (en: string, kh: string) => string;

const CANOPY      = "#15803d";
const CANOPY_DEEP = "#14532d";
const CANOPY_SOFT = "#dcfce7";
const MOSS        = "#65a30d";
const MOSS_SOFT   = "#ecfccb";
const SUN         = "#d97706";
const SUN_SOFT    = "#fef3c7";
const SOIL        = "#78350f";
const SOIL_SOFT   = "#fef3c7";
const BARK        = "#92400e";
const SKY         = "#0284c7";
const SKY_SOFT    = "#e0f2fe";
const ROSE        = "#be123c";
const ROSE_SOFT   = "#fee2e2";
const PLUM        = "#7e22ce";
const PLUM_SOFT   = "#f3e8ff";
const INK         = "#1f2937";
const INK_SOFT    = "#475569";

export function PracticalBotany({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mt-12 mb-4" data-testid="section-practical-botany">
      {/* Sub-heading bar */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
          style={{ backgroundColor: CANOPY_DEEP }}
        >
          BIO-02P
        </span>
        <HandHeart className="w-5 h-5" style={{ color: CANOPY_DEEP }} aria-hidden="true" />
        <h2
          className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: INK }}
          data-testid="practical-botany-subheading"
        >
          {t("Applied Botany", "រុក្ខសាស្ត្រអនុវត្ត")}
        </h2>
        <div
          className="flex-1 border-t-2 border-dotted"
          style={{ borderColor: `${CANOPY_DEEP}55` }}
        />
      </div>

      {/* Module title card */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-7 mb-6 relative overflow-hidden"
        style={{
          borderColor: `${CANOPY}55`,
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${MOSS_SOFT}, transparent 55%),
            radial-gradient(circle at 100% 100%, ${SOIL_SOFT}, transparent 55%),
            linear-gradient(180deg, #ffffff 0%, ${CANOPY_SOFT}66 100%)
          `,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl items-center justify-center bg-white border"
            style={{ borderColor: `${CANOPY}66` }}
          >
            <Sprout className="w-7 h-7" style={{ color: CANOPY_DEEP }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: CANOPY_DEEP }}
            >
              <span>{t("Featured Module", "ម៉ូឌុលពិសេស")}</span>
              <span>·</span>
              <span>BIO-02P</span>
            </div>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
              data-testid="practical-botany-title"
            >
              {t(
                "Practical Botany: Stewards of the Land",
                "រុក្ខសាស្ត្រអនុវត្ត៖ អ្នកថែរក្សាផែនដី",
              )}
            </h3>
            <p
              className={`mt-1 text-sm sm:text-base font-semibold ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CANOPY_DEEP }}
            >
              {t(
                "From understanding plants to caring for them — and the land they hold together.",
                "ពីការយល់ដឹងពីរុក្ខជាតិ ដល់ការថែរក្សាពួកវា — និងផែនដីដែលពួកវាកាន់ភ្ជាប់ជាមួយគ្នា។",
              )}
            </p>
            <p className={`mt-3 text-sm text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "All of the chemistry above only matters if it ends up in your hands. The next four sections turn the science of plants into something you can actually do — in your school yard, in your village, in your country. Gardening is applied chemistry. Planting a tree is applied biology. Protecting a forest is applied ethics.",
                "គីមីវិទ្យាទាំងអស់ខាងលើនេះមានសារៈសំខាន់ លុះត្រាតែវាបញ្ចប់នៅក្នុងដៃរបស់អ្នក។ ផ្នែកបួនបន្ទាប់នេះ ប្រែវិទ្យាសាស្ត្ររុក្ខជាតិទៅជាអ្វីមួយដែលអ្នកអាចធ្វើបានពិតប្រាកដ — នៅក្នុងទីធ្លាសាលា ក្នុងភូមិ ក្នុងប្រទេសរបស់អ្នក។ ការដាំដុះគឺជាគីមីវិទ្យាអនុវត្ត។ ការដាំដើមឈើគឺជាជីវវិទ្យាអនុវត្ត។ ការការពារព្រៃឈើគឺជាសីលធម៌អនុវត្ត។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── 1 · Basics of Gardening ───────────────────────────────────── */}
      <SubSectionHeader
        n="1"
        Icon={Shovel}
        en="The Basics of Gardening"
        kh="មូលដ្ឋានគ្រឹះនៃការដាំដុះ"
        accent={MOSS}
      />

      <p className={`text-sm sm:text-base text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "A garden is just a small science experiment. Every plant needs the same three things — and once you understand what each one does, you can grow almost anything.",
          "សួនច្បារគឺគ្រាន់តែជាការពិសោធវិទ្យាសាស្ត្រតូចមួយ។ រុក្ខជាតិទាំងអស់ត្រូវការរបស់បីដូចគ្នា — ហើយនៅពេលអ្នកយល់ពីអ្វីដែលនីមួយៗធ្វើ អ្នកអាចដាំដុះស្ទើរតែគ្រប់យ៉ាង។",
        )}
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        <Pillar
          k={k}
          number="01"
          Icon={Layers}
          accent={SOIL}
          enName="Soil"
          khName="ដី"
          enTag="a living ecosystem"
          khTag="ប្រព័ន្ធអេកូឡូស៊ីរស់"
          enBody="Healthy soil is not 'dirt.' It is alive. One handful contains millions of bacteria, fungi, and tiny insects, all working together to break dead leaves into the minerals a plant can drink. Feed the soil, and the soil feeds the plant."
          khBody={'ដីដែលមានសុខភាពល្អ មិនមែនជា «ដីសូត្រ» ទេ។ វាមានជីវិត។ ដីមួយក្តាប់ផ្ទុកនូវបាក់តេរី ផ្សិត និងសត្វល្អិតតូចៗរាប់លាន ដែលធ្វើការរួមគ្នាដើម្បីបំបែកស្លឹកស្លាប់ ទៅជារ៉ែដែលរុក្ខជាតិអាចស្រូបយកបាន។ ចិញ្ចឹមដី ហើយដីនឹងចិញ្ចឹមរុក្ខជាតិ។'}
          mini={[
            { Icon: Bug,    en: "microbes & fungi",    kh: "មីក្រូជីវ និងផ្សិត" },
            { Icon: Recycle, en: "leaves → nutrients",  kh: "ស្លឹក → សារធាតុចិញ្ចឹម" },
          ]}
        />
        <Pillar
          k={k}
          number="02"
          Icon={Sun}
          accent={SUN}
          enName="Sunlight"
          khName="ពន្លឺព្រះអាទិត្យ"
          enTag="the engine of photosynthesis"
          khTag="ម៉ាស៊ីននៃការសំយោគដោយពន្លឺ"
          enBody="Sunlight is the only energy source the plant has. Every leaf is a tiny solar panel that turns light + water + air into sugar. Most food crops need 6 hours of direct sun a day. Shade-loving plants like ginger and turmeric prefer dappled light under taller trees."
          khBody="ពន្លឺព្រះអាទិត្យគឺជាប្រភពថាមពលតែមួយគត់ដែលរុក្ខជាតិមាន។ ស្លឹកនីមួយៗជាបន្ទះថាមពលព្រះអាទិត្យតូចមួយ ដែលប្រែពន្លឺ + ទឹក + ខ្យល់ ទៅជាស្ករ។ ដំណាំអាហារភាគច្រើន ត្រូវការពន្លឺផ្ទាល់ ៦ ម៉ោងក្នុងមួយថ្ងៃ។ ដំណាំស្រឡាញ់ម្លប់ដូចជាខ្ញី និងរមៀត ចូលចិត្តពន្លឺរាងព្រំៗ ក្រោមដើមឈើខ្ពស់ៗ។"
          mini={[
            { Icon: Leaf,  en: "6 hours direct sun", kh: "ពន្លឺផ្ទាល់ ៦ ម៉ោង" },
            { Icon: Trees, en: "shade for ginger",   kh: "ម្លប់សម្រាប់ខ្ញី" },
          ]}
        />
        <Pillar
          k={k}
          number="03"
          Icon={Droplets}
          accent={SKY}
          enName="Water"
          khName="ទឹក"
          enTag="the transport system"
          khTag="ប្រព័ន្ធដឹកជញ្ជូន"
          enBody="Water is how a plant moves food. Roots pull water up through the trunk and out to every leaf, carrying dissolved minerals along the way. Too little water and the plant starves. Too much, and the roots drown and rot. Stick a finger 2 cm into the soil — if it is dry, water; if it is damp, wait."
          khBody="ទឹកគឺជារបៀបដែលរុក្ខជាតិដឹកអាហារ។ ឫសទាញទឹកឡើងតាមដើម ហើយចេញទៅគ្រប់ស្លឹក ដោយយករ៉ែដែលរលាយជាមួយ។ ទឹកតិចពេក រុក្ខជាតិឃ្លាន។ ទឹកច្រើនពេក ឫសលង់ និងរលួយ។ ដាក់ម្រាមដៃ ២ ស.ម ចូលក្នុងដី — បើស្ងួត ស្រោចទឹក; បើសើម រង់ចាំ។"
          mini={[
            { Icon: Sprout,    en: "2 cm finger test", kh: "តេស្តម្រាមដៃ ២ ស.ម" },
            { Icon: CloudRain, en: "early morning",    kh: "ពេលព្រឹកព្រលឹម" },
          ]}
        />
      </div>

      {/* ── 2 · Planting & Caring for Trees ───────────────────────────── */}
      <SubSectionHeader
        n="2"
        Icon={TreeDeciduous}
        en="Planting & Caring for Trees"
        kh="ការដាំ និងការថែរក្សាដើមឈើ"
        accent={CANOPY}
      />

      <p className={`text-sm sm:text-base text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "A tree planted well will outlive you. A tree planted poorly will die in its first dry season. Three small habits decide everything.",
          "ដើមឈើដែលដាំបានល្អ នឹងរស់នៅយូរជាងអ្នក។ ដើមឈើដែលដាំខុស នឹងស្លាប់នៅក្នុងរដូវប្រាំងដំបូងរបស់វា។ ទម្លាប់តូចៗបី កំណត់អ្វីៗទាំងអស់។",
        )}
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <Step
          k={k}
          accent={SOIL}
          number="1"
          Icon={Shovel}
          enTitle="Wide hole, not deep"
          khTitle="រណ្ដៅធំទូលាយ មិនមែនជ្រៅ"
          enBody="Dig a hole TWICE as wide as the root ball, but only as deep. Wide loose soil lets young roots stretch sideways and breathe. Deep soil compacts and suffocates them."
          khBody="ជីករណ្ដៅទទឹង ២ ដងធំជាងគុម្ពឫស ប៉ុន្តែជ្រៅប៉ុណ្ណឹង។ ដីទូលាយ និងរលុង អនុញ្ញាតឱ្យឫសវ័យក្មេងលាតសន្ធឹងទៅចំហៀង និងដកដង្ហើម។ ដីជ្រៅប្រមូលផ្តុំ ហើយធ្វើឱ្យពួកវាថប់ដង្ហើម។"
        />
        <Step
          k={k}
          accent={BARK}
          number="2"
          Icon={TreeDeciduous}
          enTitle="Don't bury the trunk"
          khTitle="កុំកប់ដើម"
          enBody="The point where the trunk widens into roots (the 'flare') must stay at ground level. Bury the trunk and the bark rots — your tree dies from the bottom up, slowly, over a year, with no obvious cause."
          khBody="ចំណុចដែលដើមរីកធំទៅជាឫស (ក្រឡុំឫស) ត្រូវនៅកម្រិតដី។ កប់ដើម ហើយសំបកនឹងរលួយ — ដើមឈើរបស់អ្នកនឹងស្លាប់ពីខាងក្រោមឡើងលើ យឺតៗ ក្នុងរយៈពេលមួយឆ្នាំ ដោយគ្មានហេតុផលច្បាស់លាស់។"
        />
        <Step
          k={k}
          accent={SKY}
          number="3"
          Icon={Droplets}
          enTitle="Water through the first dry season"
          khTitle="ស្រោចទឹកពេញរដូវប្រាំងដំបូង"
          enBody="A young tree has not yet grown the deep taproot that finds groundwater. For its first whole dry season, water it deeply once a week — a full bucket at the base — until those roots reach down to safety."
          khBody="ដើមឈើវ័យក្មេង មិនទាន់បានដុះឫសច្បាស់ជ្រៅៗ ដែលរកទឹកក្រោមដី។ សម្រាប់រដូវប្រាំងពេញលេញដំបូងរបស់វា ស្រោចទឹកវាជ្រៅម្តងក្នុងមួយសប្តាហ៍ — ធុងពេញមួយនៅគល់ — រហូតដល់ឫសទាំងនោះចុះទៅដល់សុវត្ថិភាព។"
        />
      </div>

      {/* Mulching callout */}
      <Callout
        k={k}
        Icon={Recycle}
        labelEn="Pro technique"
        labelKh="បច្ចេកទេសចំណេះ"
        enTitle="Mulching: a free coat for the soil"
        khTitle="ការគ្របដី៖ អាវរបស់ដីដោយឥតគិតថ្លៃ"
        enBody="Pile a 5 cm layer of dry leaves, rice straw, or bark around the base of the tree — but keep the mulch a hand's width away from the trunk. The mulch traps moisture so you water less, blocks the sun from baking the topsoil, smothers weeds, and slowly rots back into food for the tree. It is the single best habit any village gardener can have."
        khBody="គរស្លឹកស្ងួត ចំបើងស្រូវ ឬសំបកឈើ កម្រាស់ ៥ ស.ម នៅជុំវិញគល់ដើមឈើ — ប៉ុន្តែទុកការគ្របដីនោះឱ្យចម្ងាយប៉ុនបាតដៃពីដើម។ ការគ្របដីរក្សាសំណើម ដូច្នេះអ្នកស្រោចទឹកតិច រារាំងកំដៅព្រះអាទិត្យពីការដុតដីលើ បង្ក្រាបស្មៅ និងរលួយយឺតៗត្រឡប់ទៅជាអាហារសម្រាប់ដើមឈើវិញ។ វាគឺជាទម្លាប់តែមួយដ៏ល្អបំផុត ដែលអ្នកសួនច្បារភូមិណាម្នាក់អាចមាន។"
        accent={MOSS}
      />

      {/* ── 3 · Trees of Cambodia ─────────────────────────────────────── */}
      <SubSectionHeader
        n="3"
        Icon={TreePine}
        en="Trees of Cambodia"
        kh="ដើមឈើនៅកម្ពុជា"
        accent={CANOPY_DEEP}
      />

      <p className={`text-sm sm:text-base text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "These four trees show four different gifts a single species can give a country: beauty, food, wealth, and shade. Knowing them by name is the first step toward protecting them.",
          "ដើមឈើបួនទាំងនេះ បង្ហាញពីអំណោយខុសៗគ្នាបួនយ៉ាង ដែលប្រភេទតែមួយអាចផ្តល់ទៅឱ្យប្រទេសមួយ៖ សោភណភាព អាហារ ទ្រព្យសម្បត្តិ និងម្លប់។ ការស្គាល់ពួកវាតាមឈ្មោះ ជាជំហានដំបូងឆ្ពោះទៅរកការការពារពួកវា។",
        )}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <TreeCard
          k={k}
          accent={ROSE}
          accentSoft={ROSE_SOFT}
          Icon={Flower2}
          enName="Rumduol"
          khName="រំដួល"
          latin="Mitrella mesnyi"
          tagEn="National flower"
          tagKh="ផ្កាជាតិ"
          enBody="Cambodia's national flower. A small evergreen tree whose pale yellow blossoms open in the cool of the evening and release a sweet, far-travelling fragrance. Often planted at temples and around homes."
          khBody="ផ្កាជាតិរបស់កម្ពុជា។ ដើមឈើតូចមួយដែលបៃតងជានិច្ច ដែលផ្កាពណ៌លឿងស្លេករបស់វា ផ្កាក្នុងពេលត្រជាក់នៃពេលល្ងាច ហើយបញ្ចេញក្លិនផ្អែម ដែលផ្សាយចេញឆ្ងាយ។ ច្រើនត្រូវបានដាំនៅវត្តអារាម និងជុំវិញផ្ទះ។"
          chips={[
            { en: "fragrant",   kh: "ក្លិនឈ្ងុយ" },
            { en: "evergreen",  kh: "បៃតងជានិច្ច" },
          ]}
        />
        <TreeCard
          k={k}
          accent={MOSS}
          accentSoft={MOSS_SOFT}
          Icon={Leaf}
          enName="Moringa"
          khName="ម្រុំ"
          latin="Moringa oleifera"
          tagEn="The miracle tree"
          tagKh="ដើមអព្ភូតហេតុ"
          enBody="One of the fastest-growing trees in Cambodia and one of the most nutritious foods on Earth. The leaves are packed with vitamins A and C, calcium, iron, and complete protein. A few branches in the back yard can quietly feed a whole family."
          khBody="ដើមឈើដែលលូតលាស់លឿនបំផុតមួយនៅកម្ពុជា និងអាហារដ៏មានជីវជាតិបំផុតមួយនៅលើផែនដី។ ស្លឹកសម្បូរទៅដោយវីតាមីន A និង C ជាតិកាល់ស្យូម ជាតិដែក និងប្រូតេអ៊ីនពេញលេញ។ មែកមួយចំនួននៅខាងក្រោយផ្ទះ អាចចិញ្ចឹមគ្រួសារទាំងមូលដោយស្ងៀមៗ។"
          chips={[
            { en: "high protein", kh: "ប្រូតេអ៊ីនច្រើន" },
            { en: "fast-growing", kh: "លូតលាស់លឿន" },
          ]}
        />
        <TreeCard
          k={k}
          accent={BARK}
          accentSoft={SOIL_SOFT}
          Icon={TreePine}
          enName="Beng"
          khName="បេង"
          latin="Afzelia xylocarpa"
          tagEn="Vulnerable hardwood"
          tagKh="ឈើធ្ងន់ងាយរងគ្រោះ"
          enBody="A tall, magnificent hardwood prized across Southeast Asia for furniture and carving. Decades of illegal logging have made wild Beng vulnerable. Replanting Beng on degraded land is one of the most important reforestation jobs in Cambodia today."
          khBody="ឈើធ្ងន់ខ្ពស់ និងស្រស់ស្អាត ដែលត្រូវបានវាយតម្លៃនៅទូទាំងអាស៊ីអាគ្នេយ៍ សម្រាប់ផលិតគ្រឿងសង្ហារិម និងការឆ្លាក់។ ការកាប់បំផ្លាញខុសច្បាប់រាប់ទសវត្សរ៍ បានធ្វើឱ្យដើមបេងព្រៃធ្លាក់ក្នុងស្ថានភាពងាយរងគ្រោះ។ ការដាំដើមបេងឡើងវិញ នៅលើដីដែលខូចគុណភាព គឺជាការងារដាំព្រៃមួយដ៏សំខាន់បំផុត នៅកម្ពុជាសព្វថ្ងៃនេះ។"
          chips={[
            { en: "vulnerable", kh: "ងាយរងគ្រោះ" },
            { en: "hardwood",   kh: "ឈើធ្ងន់" },
          ]}
        />
        <TreeCard
          k={k}
          accent={SUN}
          accentSoft={SUN_SOFT}
          Icon={Trees}
          enName="Mango"
          khName="ស្វាយ"
          latin="Mangifera indica"
          tagEn="Shade & food"
          tagKh="ម្លប់ និងអាហារ"
          enBody="The friend of every Cambodian village. A single mature mango tree throws a wide cool shade where children play and elders rest, while quietly producing thousands of fruit a year. Easy to plant from a seed, slow to thank you, but generous for a lifetime."
          khBody="មិត្តរបស់ភូមិកម្ពុជាគ្រប់រូប។ ដើមស្វាយធំមួយ ផ្តល់ម្លប់ត្រជាក់ទូលាយ ដែលក្មេងៗលេង និងចាស់ៗសម្រាក ខណៈពេលដែលផលិតផ្លែរាប់ពាន់ជារៀងរាល់ឆ្នាំដោយស្ងៀមៗ។ ងាយដាំពីគ្រាប់ យឺតក្នុងការអរគុណ តែសប្បុរសសម្រាប់មួយជីវិត។"
          chips={[
            { en: "shade",      kh: "ម្លប់" },
            { en: "fruit yearly", kh: "ផ្លែរៀងរាល់ឆ្នាំ" },
          ]}
        />
      </div>

      {/* ── 4 · Deforestation Crisis ──────────────────────────────────── */}
      <SubSectionHeader
        n="4"
        Icon={Axe}
        en="The Deforestation Crisis"
        kh="វិបត្តិនៃការកាប់បំផ្លាញព្រៃឈើ"
        accent={ROSE}
      />

      <div
        className="rounded-3xl border-2 p-5 sm:p-6 mb-5"
        style={{
          borderColor: `${ROSE}33`,
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${ROSE_SOFT} 100%)`,
        }}
      >
        <p className={`text-sm sm:text-base text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Cambodia has lost more than a quarter of its forest cover in a single generation. When you cut down a tree, you do not just lose wood — you trigger a chain of three quiet disasters that can take a hundred years to undo.",
            "កម្ពុជាបានបាត់បង់ព្រៃឈើជាង មួយភាគបួន នៃផ្ទៃព្រៃឈើរបស់ខ្លួន ក្នុងជំនាន់តែមួយ។ នៅពេលអ្នកកាប់ដើមឈើមួយ អ្នកមិនត្រឹមតែបាត់បង់ឈើទេ — អ្នកបង្ករឱ្យមានជួរនៃគ្រោះមហន្តរាយស្ងៀមៗបី ដែលអាចចំណាយពេលមួយរយឆ្នាំដើម្បីសង្គ្រោះវិញ។",
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Crisis
          k={k}
          accent={SOIL}
          Icon={Mountain}
          enTitle="Erosion"
          khTitle="ការច្រាះច្រេះដី"
          enBody="Tree roots are the stitches that hold the soil onto the land. Take the trees away and the first hard rain washes the fertile topsoil straight down the hill into the rivers. What is left behind is hard, pale, and almost lifeless — and it can take a hundred years to rebuild."
          khBody="ឫសដើមឈើគឺជាខ្សែដេរ ដែលចងភ្ជាប់ដីទៅនឹងផែនដី។ យកដើមឈើចេញ ហើយភ្លៀងធ្ងន់ដំបូងនឹងបោកដីផ្ទៃមានជីជាតិចុះពីភ្នំទៅក្នុងទន្លេ។ អ្វីដែលនៅសល់គឺរឹង ស្លេក និងស្ទើរតែគ្មានជីវិត — ហើយអាចចំណាយពេលមួយរយឆ្នាំដើម្បីកសាងឡើងវិញ។"
          mini={[
            { Icon: CloudRain, en: "rain washes topsoil", kh: "ភ្លៀងបោកដីផ្ទៃ" },
            { Icon: Droplets,  en: "rivers turn brown",    kh: "ទន្លេក្លាយជាពណ៌ត្នោត" },
          ]}
        />
        <Crisis
          k={k}
          accent={ROSE}
          Icon={Flame}
          enTitle="Drought & Heat"
          khTitle="គ្រោះរាំងស្ងួត និងកំដៅ"
          enBody="A forest sweats. Each tree releases hundreds of litres of water vapour into the air every day, cooling the land and seeding the clouds that bring rain. Cut the forest, and the local sky stops raining. The land bakes harder, the dry season grows longer, and crops fail."
          khBody="ព្រៃឈើបែកញើស។ ដើមឈើនីមួយៗបញ្ចេញចំហាយទឹករាប់រយលីត្រទៅក្នុងខ្យល់រាល់ថ្ងៃ ដោយបន្សាបកំដៅដី និងបណ្តុះពពកដែលនាំមកនូវភ្លៀង។ កាប់ព្រៃឈើ ហើយមេឃក្នុងតំបន់ឈប់បង្អុរភ្លៀង។ ដីកាន់តែឆេះក្តៅ រដូវប្រាំងវែងជាងមុន ហើយដំណាំខូច។"
          mini={[
            { Icon: Sun, en: "land bakes",     kh: "ដីដុតនឹងកំដៅ" },
            { Icon: Leaf, en: "crops fail",     kh: "ដំណាំខូច" },
          ]}
        />
        <Crisis
          k={k}
          accent={PLUM}
          Icon={Bird}
          enTitle="Loss of Habitat"
          khTitle="ការបាត់បង់ជម្រក"
          enBody="A single hectare of Cambodian forest can shelter more than a thousand species — gibbons, hornbills, fishing cats, frogs, beetles, orchids. Cut the forest and you do not lose 'a tree' — you tear apart the entire web of life that took millions of years to weave."
          khBody="ព្រៃឈើកម្ពុជាមួយហិចតា អាចជាជម្រកសម្រាប់ប្រភេទសត្វជាង មួយពាន់ — ស្វាប្រេះ ឆ្មាស្ទូច កង្កែប សត្វកន្ទុំរុយ និងអក្ខិត។ កាប់ព្រៃឈើ ហើយអ្នកមិនត្រឹមតែបាត់ «ដើមឈើ» ប៉ុណ្ណោះទេ — អ្នករហែកបណ្តាញនៃជីវិតទាំងមូល ដែលត្រូវការពេលរាប់លានឆ្នាំដើម្បីត្បាញ។"
          mini={[
            { Icon: Bug,   en: "species vanish",  kh: "ប្រភេទសត្វបាត់" },
            { Icon: Bird,  en: "no nests left",   kh: "គ្មានសំបុករន្ធ" },
          ]}
        />
      </div>

      {/* Closing big-idea ribbon */}
      <div
        className="mt-8 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3"
        style={{
          borderColor: `${CANOPY}55`,
          backgroundImage: `linear-gradient(135deg, ${CANOPY_SOFT} 0%, ${SUN_SOFT} 100%)`,
        }}
        data-testid="practical-botany-closing"
      >
        <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: CANOPY_DEEP }} />
        <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong className={k ? "" : "font-bold"}>
            {t("The big idea: ", "គំនិតធំ ៖ ")}
          </strong>
          {t(
            "Every Cambodian student is already a botanist — you just have not been called one yet. Plant one moringa for your family, one mango for your village, and one beng for your country, and in twenty years you will have done more for this land than most laws ever could.",
            "សិស្សកម្ពុជាគ្រប់រូប ជារុក្ខវិទូរួចទៅហើយ — អ្នកគ្រាន់តែមិនទាន់ត្រូវបានហៅឈ្មោះ។ ដាំដើមម្រុំមួយសម្រាប់គ្រួសារ ដើមស្វាយមួយសម្រាប់ភូមិ និងដើមបេងមួយសម្រាប់ប្រទេស ហើយក្នុងរយៈពេលម្ភៃឆ្នាំ អ្នកនឹងបានធ្វើឱ្យផែនដីនេះច្រើនជាងច្បាប់ភាគច្រើនអាចធ្វើបាន។",
          )}
        </p>
      </div>
    </section>
  );
}

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
        P{n}
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

// ─── Pillar card (gardening basics) ───────────────────────────────────────
function Pillar({
  k,
  number,
  Icon,
  accent,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  mini,
}: {
  k: boolean;
  number: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  mini: { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; en: string; kh: string }[];
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 p-5 sm:p-6 flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 12px 30px -18px ${accent}55`,
      }}
      data-testid={`pillar-${enName.toLowerCase()}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: accent }}
          >
            #{number}
          </div>
          <h4 className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
            <span className="block">{enName}</span>
            <span className="block font-khmer text-base mt-0.5" style={{ color: accent }}>
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
      <p className={`text-sm text-slate-700 mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
      <ul className="mt-auto space-y-1.5">
        {mini.map(({ Icon: MIcon, en, kh }, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
            >
              <MIcon className="w-3 h-3" style={{ color: accent }} />
            </span>
            <span className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : ""}`}>
              {k ? kh : en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Step card (planting) ─────────────────────────────────────────────────
function Step({
  k,
  accent,
  number,
  Icon,
  enTitle,
  khTitle,
  enBody,
  khBody,
}: {
  k: boolean;
  accent: string;
  number: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 p-5 sm:p-6 relative overflow-hidden"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 8px 22px -16px ${accent}66`,
      }}
      data-testid={`plant-step-${number}`}
    >
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center font-display font-extrabold text-3xl select-none"
        style={{ backgroundColor: `${accent}10`, color: `${accent}55` }}
        aria-hidden="true"
      >
        {number}
      </div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
          >
            <Icon className="w-4 h-4" style={{ color: accent }} />
          </div>
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: accent }}
          >
            Step {number}
          </span>
        </div>
        <h4 className={`font-bold text-base sm:text-lg ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
          <span className="block">{enTitle}</span>
          <span className="block font-khmer text-sm mt-0.5" style={{ color: accent }}>
            {khTitle}
          </span>
        </h4>
        <p className={`mt-2 text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {k ? khBody : enBody}
        </p>
      </div>
    </div>
  );
}

// ─── Tree card (display card for Cambodian species) ──────────────────────
function TreeCard({
  k,
  accent,
  accentSoft,
  Icon,
  enName,
  khName,
  latin,
  tagEn,
  tagKh,
  enBody,
  khBody,
  chips,
}: {
  k: boolean;
  accent: string;
  accentSoft: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  latin: string;
  tagEn: string;
  tagKh: string;
  enBody: string;
  khBody: string;
  chips: { en: string; kh: string }[];
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 10px 28px -18px ${accent}66`,
      }}
      data-testid={`tree-card-${enName.toLowerCase()}`}
    >
      {/* Banner */}
      <div
        className="px-5 py-4 border-b flex items-center gap-3"
        style={{
          backgroundColor: accentSoft,
          borderColor: `${accent}33`,
        }}
      >
        <div
          className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center flex-shrink-0"
          style={{ border: `1.5px solid ${accent}66` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-bold text-base ${k ? "font-khmer text-lg" : ""}`} style={{ color: INK }}>
            <span>{enName}</span>
            <span className="font-khmer ml-2" style={{ color: accent }}>
              · {khName}
            </span>
          </div>
          <div className="text-[10px] font-mono italic" style={{ color: INK_SOFT }}>
            {latin}
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div
          className={`text-[11px] font-mono uppercase tracking-widest mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: accent }}
        >
          {k ? tagKh : tagEn}
        </div>
        <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {k ? khBody : enBody}
        </p>
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
          {chips.map((c, i) => (
            <span
              key={i}
              className={`text-[10px] font-bold px-2 py-1 rounded-full ${k ? "font-khmer" : ""}`}
              style={{
                backgroundColor: `${accent}14`,
                color: accent,
                border: `1px solid ${accent}33`,
              }}
            >
              {k ? c.kh : c.en}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Crisis card (deforestation consequence) ─────────────────────────────
function Crisis({
  k,
  accent,
  Icon,
  enTitle,
  khTitle,
  enBody,
  khBody,
  mini,
}: {
  k: boolean;
  accent: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  mini: { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; en: string; kh: string }[];
}) {
  return (
    <div
      className="rounded-3xl bg-white border-2 p-5 sm:p-6 flex flex-col"
      style={{
        borderColor: `${accent}66`,
        boxShadow: `0 10px 28px -18px ${accent}66`,
      }}
      data-testid={`crisis-${enTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
          <span className="block">{enTitle}</span>
          <span className="block font-khmer text-base mt-0.5" style={{ color: accent }}>
            {khTitle}
          </span>
        </h4>
        <AlertTriangle className="w-4 h-4 ml-auto" style={{ color: accent }} aria-hidden="true" />
      </div>
      <p className={`text-sm text-slate-700 mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
      <ul className="mt-auto space-y-1.5">
        {mini.map(({ Icon: MIcon, en, kh }, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
            >
              <MIcon className="w-3 h-3" style={{ color: accent }} />
            </span>
            <span className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : ""}`}>
              {k ? kh : en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Callout (matches BotanyPage style) ──────────────────────────────────
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
      className="rounded-2xl p-4 sm:p-5 border-l-4 border"
      style={{
        backgroundColor: `${accent}10`,
        borderLeftColor: accent,
        borderColor: `${accent}33`,
      }}
      data-testid="mulching-callout"
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
