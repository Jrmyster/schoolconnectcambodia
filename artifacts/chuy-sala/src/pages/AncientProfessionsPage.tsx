import { Link } from "wouter";
import {
  ArrowLeft,
  Hammer,
  Anvil,
  Shield,
  Scissors,
  Pickaxe,
  Landmark,
  Compass,
  Stars,
  Wind,
  Scroll,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-ANCIENT · Ancient Professions & Lost Arts
//                វិជ្ជាជីវៈបុរាណ និង សិល្បៈដែលបាត់បង់
//
//  1. The Masters of Material   — blacksmith, leatherworker, tailor/weaver
//  2. The Builders of Empires   — stone carving, ancient engineering (Angkor)
//  3. Lost Wisdom               — celestial navigation, natural architecture
//
//  Aesthetic: ancient · rustic — parchment body, deep bronze accents,
//             stone-gray supports. A workshop lit by oil lamps.
// ════════════════════════════════════════════════════════════════════════════

const PARCHMENT = "#f5e9c8";
const PARCHMENT_DEEP = "#e8d6a3";
const BRONZE = "#7c4a1d";
const BRONZE_DEEP = "#5a3411";
const BRONZE_GLOW = "#a86b32";
const STONE = "#57534e";
const STONE_DEEP = "#1c1917";
const INK = "#1a1208";

const FRAME_BG: React.CSSProperties = {
  backgroundColor: PARCHMENT,
  backgroundImage:
    "radial-gradient(circle at 12% 18%, rgba(124, 74, 29, 0.12), transparent 45%)," +
    "radial-gradient(circle at 88% 82%, rgba(87, 83, 78, 0.10), transparent 50%)," +
    "linear-gradient(180deg, #f7ecca 0%, #f0dfa6 100%)",
};

export default function AncientProfessionsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen text-stone-900"
      style={FRAME_BG}
      data-testid="ancient-professions-page"
    >
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden border-b-2"
        style={{
          borderColor: `${BRONZE}55`,
          backgroundImage: `
            radial-gradient(circle at 18% 28%, ${BRONZE_GLOW}55, transparent 55%),
            radial-gradient(circle at 82% 70%, ${STONE}33, transparent 55%),
            linear-gradient(135deg, ${PARCHMENT_DEEP} 0%, ${PARCHMENT} 50%, #ddc99a 100%)
          `,
        }}
      >
        <ParchmentGrain />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm mb-5 hover:underline ${isKh ? "font-khmer" : ""}`}
            style={{ color: BRONZE_DEEP }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest shadow-sm border"
            style={{
              backgroundColor: "#fffbe9",
              borderColor: `${BRONZE}55`,
              color: BRONZE_DEEP,
            }}
          >
            <Anvil className="w-3.5 h-3.5" aria-hidden="true" />
            STC-ANCIENT · ANCIENT PROFESSIONS &amp; LOST ARTS
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
            data-testid="page-title"
          >
            {isKh ? (
              <>
                វិជ្ជាជីវៈបុរាណ —{" "}
                <span style={{ color: BRONZE_DEEP }}>និង សិល្បៈដែលបាត់បង់</span>
              </>
            ) : (
              <>
                Ancient Professions —{" "}
                <span style={{ color: BRONZE_DEEP }}>and Lost Arts</span>
              </>
            )}
          </h1>
          {/* Always-paired bilingual subtitle */}
          <div
            className="mt-2 text-base sm:text-lg font-semibold font-khmer leading-snug"
            style={{ color: STONE }}
          >
            {isKh
              ? "Ancient Professions and Lost Arts"
              : "វិជ្ជាជីវៈបុរាណ និង សិល្បៈដែលបាត់បង់"}
          </div>

          <p
            className={`mt-4 max-w-2xl text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: "#3f2d1a" }}
          >
            {isKh
              ? "មុនពេលរោងចក្រ មុនពេលអគ្គិសនី មុនពេលគ្រឿងម៉ាស៊ីន មនុស្សដឹងពីរបៀបបង្កើតស្ទើរតែគ្រប់យ៉ាងពីរបស់របរនៅជុំវិញពួកគេ — ស្បែក ដែក ថ្ម កប្បាស និងសូម្បីតែផ្កាយ។ ទំព័រនេះគឺជាដំណើរទស្សនកិច្ចទៅកាន់រោងជាង រោងប្រក់ស្លឹក និងសិក្ខាសាលាបុរាណ ដែលដៃរបស់មនុស្សម្នាក់អាចសាងសង់ ឬផ្គត់ផ្គង់គ្រួសារទាំងមូលបាន។"
              : "Before factories, before electricity, before any kind of motor, people knew how to make almost everything in their world from the raw stuff around them — animal hides, iron, stone, plant fibre, and even the stars overhead. This page is a guided tour through the workshops, smithies and ateliers of the ancient world, where one pair of hands could feed and shelter an entire family."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <StatChip
              valueEn="3,000+"
              labelEn="Years of blacksmithing"
              labelKh="ឆ្នាំនៃការវាយដែក"
            />
            <StatChip
              valueEn="~1,200"
              labelEn="Years old · Angkor Wat"
              labelKh="ឆ្នាំនៃប្រាសាទអង្គរវត្ត"
            />
            <StatChip
              valueEn="0"
              labelEn="Cranes used to build it"
              labelKh="គ្រែនដែលបានប្រើ"
            />
          </div>
        </div>
      </header>

      {/* ── Section 1: Masters of Material ────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Hands that shaped the world"
        eyebrowKh="ដៃដែលបង្កើតពិភពលោក"
        titleEn="The Masters of Material"
        titleKh="ម្ចាស់នៃវត្ថុធាតុដើម"
        descEn="An ancient village had no shops. If you needed a knife, an arrow, a coat or a pair of boots, somebody in your community had to make it — by hand, from raw natural material, using nothing but skill, tools, fire and patience."
        descKh="ភូមិបុរាណមិនមានហាងលក់ទេ។ ប្រសិនបើអ្នកត្រូវការកាំបិត ព្រួញ អាវ ឬស្បែកជើង មនុស្សណាម្នាក់នៅក្នុងសហគមន៍របស់អ្នកត្រូវធ្វើវា — ដោយដៃ ពីវត្ថុធាតុដើមធម្មជាតិ ដោយប្រើតែជំនាញ ឧបករណ៍ ភ្លើង និងការអត់ធ្មត់។"
        isKh={isKh}
        testId="ancient-section-materials"
      >
        <div className="grid md:grid-cols-3 gap-5">
          <ArtisanCard
            isKh={isKh}
            Icon={Hammer}
            enName="The Blacksmith"
            khName="ជាងដែក"
            enTag="iron · fire · hammer"
            khTag="ដែក · ភ្លើង · ញញួរ"
            enBody="A blacksmith heats raw iron in a charcoal forge until it glows orange — somewhere between 800 °C and 1,200 °C. At that temperature the metal becomes soft enough to bend, but is still solid. The blacksmith places it on a heavy iron block called an anvil (ទីវាយដែក) and shapes it with a hammer (ញញួរ), blow by blow, until the cooling iron locks into the new form. From this single craft come almost every metal tool of village life: ploughs that open the soil for crops, axes that fell trees for houses, knives, scissors, horseshoes, sickles, and weapons."
            khBody="ជាងដែកដុតដែកឆៅនៅក្នុងឡាធ្យូងរហូតដល់វាបញ្ចេញពន្លឺពណ៌ទឹកក្រូច — នៅចន្លោះ ៨០០ អង្សាសេ និង ១,២០០ អង្សាសេ។ នៅសីតុណ្ហភាពនោះ លោហៈក្លាយជាទន់គ្រប់គ្រាន់ដើម្បីបត់ ប៉ុន្តែនៅរឹង។ ជាងដែកដាក់វានៅលើដុំដែកធ្ងន់មួយដែលហៅថា ទីវាយដែក (Anvil) ហើយបង្កើតរូបរាងវាដោយញញួរ ម្តងហើយម្តងទៀត រហូតដល់ដែកដែលត្រជាក់ ចាក់សោក្នុងរូបរាងថ្មី។ ពីសិល្បៈតែមួយនេះ ចេញមកស្ទើរតែគ្រប់ឧបករណ៍លោហៈនៅក្នុងជីវិតភូមិ៖ នង្គ័លដែលបើកដី ពូថៅដែលកាប់ដើមឈើសម្រាប់ផ្ទះ កាំបិត កន្ត្រៃ ស្បែកជើងសេះ កណ្តៀវ និងគ្រឿងសព្វាវុធ។"
            accent={BRONZE}
            secondary={
              <ToolList
                isKh={isKh}
                items={[
                  { en: "Plough · ploughshare", kh: "នង្គ័ល" },
                  { en: "Axe & sickle",         kh: "ពូថៅ និង កណ្តៀវ" },
                  { en: "Knives · weapons",     kh: "កាំបិត · គ្រឿងសព្វាវុធ" },
                  { en: "Horseshoes",           kh: "ស្បែកជើងសេះ" },
                ]}
                accent={BRONZE}
              />
            }
          />

          <ArtisanCard
            isKh={isKh}
            Icon={Shield}
            enName="The Leatherworker"
            khName="ជាងស្បែក"
            enTag="hide · tannin · time"
            khTag="ស្បែក · ផ្ទាំងស្បែក · ពេលវេលា"
            enBody="When a hunter or a herder brought home an animal, almost nothing was wasted. The leatherworker took the raw hide, scraped it clean of fat and hair, then soaked it for weeks in vats of natural chemicals — most often tannin (សារធាតុធម្មជាតិពីសំបកឈើ) drawn from the bark of oak, mangrove or other trees. This long bath of tanning (ការសម្រួលស្បែក) chemically locked the proteins of the skin so it would no longer rot, and turned a soft fragile thing into tough, flexible leather: armour for soldiers, water skins for travellers, harnesses for horses, sandals, belts and warm winter clothing."
            khBody="នៅពេលអ្នកប្រមាញ់ ឬអ្នកចិញ្ចឹមសត្វនាំសត្វមួយមកផ្ទះ ស្ទើរតែគ្មានអ្វីខាតបង់។ ជាងស្បែកយកស្បែកឆៅ កោសវាឲ្យស្អាតពីខ្លាញ់និងរោម បន្ទាប់មកត្រាំវាប៉ុន្មានសប្តាហ៍ក្នុងចានសារធាតុគីមីធម្មជាតិ — ភាគច្រើនបំផុតគឺ ផ្ទាំងស្បែក (Tannin · សារធាតុធម្មជាតិពីសំបកឈើ) ដែលដកចេញពីសំបកឈើដើមអុក ដើមកោងកាង ឬដើមឈើដទៃទៀត។ ការងូតទឹកវែងនេះនៃ ការសម្រួលស្បែក (Tanning) ចាក់សោប្រូតេអ៊ីននៃស្បែកដោយវិធីគីមី ដូច្នេះវាលែងរលួយ ហើយបានប្រែវត្ថុទន់ខ្សោយមួយ ឲ្យក្លាយជាស្បែករឹងមាំ និងបត់បែនបាន៖ អាវខ្សែដែកសម្រាប់ទាហាន ស្បែកដាក់ទឹកសម្រាប់អ្នកធ្វើដំណើរ ខ្សែរុំសេះ ស្បែកជើង ខ្សែក្រវាត់ និងសម្លៀកបំពាក់រដូវរងារ។"
            accent={BRONZE_GLOW}
            secondary={
              <ToolList
                isKh={isKh}
                items={[
                  { en: "Armour · helmets",  kh: "អាវខ្សែដែក · មួក" },
                  { en: "Water skins",       kh: "ស្បែកដាក់ទឹក" },
                  { en: "Sandals · boots",   kh: "ស្បែកជើង · ស្បែកជើងវែង" },
                  { en: "Saddles & belts",   kh: "កែបសេះ និង ខ្សែក្រវាត់" },
                ]}
                accent={BRONZE_GLOW}
              />
            }
          />

          <ArtisanCard
            isKh={isKh}
            Icon={Scissors}
            enName="The Tailor & Weaver"
            khName="ជាងកាត់ដេរ និង អ្នកត្បាញ"
            enTag="fibre · spindle · loom"
            khTag="សរសៃ · ស្វាយ · កី"
            enBody="Cloth was the slowest, hardest craft of the ancient world. The weaver started with a fluffy pile of plant fibre — cotton, flax, hemp — or sheep's wool, and twisted it strand by strand on a hand spindle (ស្វាយ) into one long thread. Hundreds of metres of thread were then strung onto a wooden loom (កី) and crossed at right angles, one weft thread at a time, by hand, often for many days, to produce a single piece of cloth. Only after that did the tailor cut and sew the cloth into a tunic, a sarong, or a coat. A single shirt could represent more than a week's work — which is why every garment was repaired, patched, and handed down for generations."
            khBody="សំពត់គឺជាសិល្បៈដែលយឺត និងពិបាកបំផុតនៃពិភពលោកបុរាណ។ អ្នកត្បាញចាប់ផ្តើមដោយដុំសរសៃរុក្ខជាតិដ៏ស្រទន់មួយ — កប្បាស ហ្វ្លាក់ស ហ៊ឹប — ឬរោមចៀម ហើយវេវាសរសៃនីមួយៗនៅលើស្វាយដៃ (Spindle · ស្វាយ) ឲ្យក្លាយជាសរសៃដ៏វែងមួយ។ បន្ទាប់មក សរសៃរាប់រយម៉ែត្រត្រូវបានដាក់នៅលើកីឈើ (Loom · កី) ហើយឆ្លងគ្នាជាមុំបញ្ឈរ មួយសរសៃក្បាលនៃផ្នែកទទឹងម្តង ដោយដៃ ច្រើនថ្ងៃ ដើម្បីផលិតបានសំពត់តែមួយផ្ទាំង។ ក្រោយពីនោះបានជាជាងកាត់ដេរកាត់ និងដេរសំពត់នោះឲ្យក្លាយជាអាវ ស្បៃ ឬអាវធំ។ អាវមួយ អាចតំណាងឲ្យការងារច្រើនជាងមួយសប្តាហ៍ — ដែលជាហេតុដែលរាល់សម្លៀកបំពាក់ត្រូវបានជួសជុល បំណះ និងបន្តពីមួយតំណរទៅមួយតំណរ។"
            accent={STONE}
            secondary={
              <ToolList
                isKh={isKh}
                items={[
                  { en: "Spindle · ស្វាយ",  kh: "ស្វាយ — វេសរសៃ" },
                  { en: "Loom · កី",          kh: "កី — ត្បាញសំពត់" },
                  { en: "Tunics · sarongs",   kh: "អាវ · ស្បៃ" },
                  { en: "Winter coats",       kh: "អាវរដូវរងារ" },
                ]}
                accent={STONE}
              />
            }
          />
        </div>
      </Section>

      {/* ── Section 2: The Builders of Empires ─────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Stone, geometry, and patience"
        eyebrowKh="ថ្ម ធរណីមាត្រ និង ការអត់ធ្មត់"
        titleEn="The Builders of Empires"
        titleKh="អ្នកកសាងចក្រភព"
        descEn="The greatest monuments of the ancient world were not raised by machines. They were raised by tens of thousands of human beings, working together for decades, with hand tools, levers, ropes, water, and an extraordinarily precise understanding of geometry and the natural world."
        descKh="វិមានធំបំផុតនៃពិភពលោកបុរាណ មិនត្រូវបានសាងសង់ដោយម៉ាស៊ីនទេ។ ពួកវាត្រូវបានកសាងដោយមនុស្សរាប់ម៉ឺននាក់ ធ្វើការជាមួយគ្នាអស់ច្រើនទសវត្សរ៍ ដោយប្រើឧបករណ៍ដៃ ដងថ្លឹង ខ្សែ ទឹក និងការយល់ដឹងយ៉ាងជាក់លាក់អស្ចារ្យពីធរណីមាត្រ និងពិភពធម្មជាតិ។"
        isKh={isKh}
        testId="ancient-section-builders"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <BuilderCard
            isKh={isKh}
            Icon={Pickaxe}
            enName="Stone Carving"
            khName="ចម្លាក់ថ្ម"
            enTag="chisel + mallet + lifetime"
            khTag="ដែកគាស់ + ញញួរ + មួយជីវិត"
            enBody="A stone carver works with the simplest tools imaginable: a hammer, a hardened iron chisel (ដែកគាស់) and a measuring string. They tap the chisel against solid sandstone or granite millimetre by millimetre, hour after hour, day after day, lifting flakes of stone the size of a coin until a god, a king, an apsara dancer or an entire battle scene rises out of the wall. The bas-reliefs that wrap the long galleries of Angkor Wat were carved this way, by hand, into the standing stone of the temple itself. A single panel could occupy a master carver and his apprentices for several years."
            khBody="ជាងឆ្លាក់ថ្មធ្វើការដោយឧបករណ៍សាមញ្ញបំផុតដែលអាចស្រមៃបាន៖ ញញួរមួយ ដែកគាស់រឹង (Chisel · ដែកគាស់) និងខ្សែវាស់មួយ។ ពួកគេគោះដែកគាស់ទៅនឹងថ្មភក់ ឬថ្មក្រានីតរឹង មីលីម៉ែត្រម្តង ម៉ោងម្តង ថ្ងៃម្តង លើកសំបកថ្មទំហំកាក់ រហូតដល់ព្រះ ស្តេច ទេពអប្សរ ឬឈុតសមរភូមិទាំងមូល លេចចេញពីជញ្ជាំង។ ឆ្លាក់ផ្ទាំងថ្មដែលរុំជុំវិញវិចិត្រសាលវែងៗនៃប្រាសាទអង្គរវត្ត ត្រូវបានឆ្លាក់តាមរបៀបនេះ ដោយដៃ ចូលទៅក្នុងថ្មឈរនៃប្រាសាទផ្ទាល់។ ផ្ទាំងតែមួយ អាចប្រើពេលជាងឆ្នាំសម្រាប់មេជាងម្នាក់ និងសិស្សរបស់គាត់។"
            accent={STONE}
          />

          <BuilderCard
            isKh={isKh}
            Icon={Landmark}
            enName="Ancient Engineering"
            khName="វិស្វកម្មបុរាណ"
            enTag="Angkor Wat · no cranes · no mortar"
            khTag="អង្គរវត្ត · គ្មានគ្រែន · គ្មានសុីម៉ងត៍"
            enBody="The temple of Angkor Wat is built from over five million tonnes of sandstone, every block of which was floated down rivers from quarries 50 km away — almost a thousand years before any modern crane existed. The Khmer engineers who designed it relied on three quiet superpowers: exact geometry (perfect symmetry across the entire 1.6 km perimeter), water management (vast moats and reservoirs that doubled as foundation support), and a very clever stone-stacking trick called the corbel arch (ខ្ទមកោប — Corbel Arch), where each row of stones is laid slightly closer to the centre than the row below, until the two sides finally meet at the top — no central keystone, no mortar between blocks, no metal pins, only gravity and geometry holding the entire roof together."
            khBody="ប្រាសាទអង្គរវត្តត្រូវបានសាងសង់ពីថ្មភក់ជាងប្រាំលានតោន ដែលគ្រប់ដុំសុទ្ធតែត្រូវបានបណ្តែតតាមទន្លេពីរោងថ្មចម្ងាយ ៥០ គីឡូម៉ែត្រ — ស្ទើរតែមួយពាន់ឆ្នាំ មុនពេលគ្រែនទំនើបណាមួយមាន។ វិស្វករខ្មែរដែលរចនាវា ពឹងផ្អែកលើអំណាចស្ងាត់បីយ៉ាង៖ ធរណីមាត្រដ៏ជាក់លាក់ (ភាពស៊ីមេទ្រីដ៏ល្អឥតខ្ចោះឆ្លងកាត់បរិមាត្រ ១,៦ គីឡូម៉ែត្រទាំងមូល) ការគ្រប់គ្រងទឹក (គូទឹក និងអាងទឹកធំៗ ដែលក៏ជាជំនួយនៃគ្រឹះផងដែរ) និងល្បិចសង់ថ្មដ៏ឆ្លាតមួយហៅថា ខ្ទមកោប (Corbel Arch · ខ្ទមកោប) ដែលជួរថ្មនីមួយៗត្រូវបានដាក់ឲ្យកាន់តែជិតចំកណ្តាលជាងជួរខាងក្រោម រហូតដល់ផ្នែកទាំងពីរជួបគ្នានៅខាងលើ — គ្មានដុំថ្មកណ្តាល គ្មានសុីម៉ងត៍រវាងដុំថ្ម គ្មានគ្រាប់លោហៈ មានតែទំនាញ និងធរណីមាត្រ ដែលកាន់ដំបូលទាំងមូលនៅជាមួយគ្នា។"
            accent={BRONZE_DEEP}
          >
            <CorbelArchSVG isKh={isKh} />
          </BuilderCard>
        </div>
      </Section>

      {/* ── Section 3: Lost Wisdom ─────────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="Quiet skills the modern world forgot"
        eyebrowKh="ជំនាញស្ងាត់ដែលពិភពលោកទំនើបបានភ្លេច"
        titleEn="Lost Wisdom"
        titleKh="ប្រាជ្ញាដែលបាត់បង់"
        descEn="Some ancient knowledge was so good at solving its problem that we replaced it — with GPS, with air conditioning, with electric pumps — and within two or three generations the original skill was gone from living memory. These are practices our grandparents' grandparents took for granted, and that almost no living person can do today."
        descKh="ចំណេះដឹងបុរាណខ្លះល្អណាស់ក្នុងការដោះស្រាយបញ្ហារបស់វា ដូច្នេះយើងបានជំនួសវា — ដោយ GPS ដោយម៉ាស៊ីនត្រជាក់ ដោយម៉ាស៊ីនបូមអគ្គិសនី — ហើយក្នុងរយៈពេលពីរ ឬបីជំនាន់ ជំនាញដើមបានបាត់ចេញពីការចងចាំរស់នៅ។ ទាំងនេះគឺជាការអនុវត្តដែលជីដូនជីតាជីតួររបស់យើងចាត់ទុកជាធម្មតា ហើយដែលស្ទើរតែគ្មានមនុស្សរស់ណាម្នាក់អាចធ្វើបានសព្វថ្ងៃនេះ។"
        isKh={isKh}
        testId="ancient-section-lost-wisdom"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <LostWisdomCard
            isKh={isKh}
            Icon={Stars}
            SecondaryIcon={Compass}
            enName="Celestial Navigation"
            khName="ការធ្វើនាវាចរណ៍តាមផ្កាយ"
            enTag="cross an ocean using only the sky"
            khTag="ឆ្លងសមុទ្រដោយប្រើតែមេឃ"
            enBody="Long before satellites or GPS, Polynesian sailors crossed thousands of kilometres of open Pacific in wooden canoes — and arrived. They navigated by reading the angle of the Pole Star (ផ្កាយប៉ូល · Polaris) above the horizon to know how far north they had drifted, by following the rising and setting points of certain known stars to hold a heading at night, and by reading swell patterns, cloud colour, and migrating bird flight paths to detect islands still over the horizon. A trained navigator carried in his memory a star compass (កំព័ស្ស-ផ្កាយ) of more than 200 fixed celestial cues, with no instrument more complicated than his own outstretched hand."
            khBody="មុនពេលផ្កាយរណប ឬ GPS អ្នកដឹកនាំនាវាប៉ូលីនេស៊ីបានឆ្លងកាត់សមុទ្រប៉ាស៊ីហ្វិកបើកចំហរាប់ពាន់គីឡូម៉ែត្រនៅក្នុងទូកឈើ — ហើយបានទៅដល់។ ពួកគេធ្វើនាវាចរណ៍ដោយអានមុំនៃផ្កាយប៉ូល (Pole Star · Polaris) លើផ្ទៃមេឃ ដើម្បីដឹងថាពួកគេបានរសាត់ទៅខាងជើងប៉ុនណា ដោយដើរតាមចំណុចរះ និងលិចនៃផ្កាយដែលគេស្គាល់មួយចំនួន ដើម្បីរក្សាទិសនៅពេលយប់ និងដោយអានលំនាំរលក ពណ៌ពពក និងផ្លូវហើរនៃសត្វស្លាបធ្វើដំណើរ ដើម្បីរកឃើញកោះដែលនៅឆ្ងាយពីផ្ទៃមេឃ។ អ្នកដឹកនាំនាវាដែលបានបណ្ដុះបណ្ដាល ផ្ទុកកំព័ស្ស-ផ្កាយ (Star Compass) ច្រើនជាង ២០០ ចំណុចថេរ នៅក្នុងការចងចាំរបស់គាត់ ដោយឧបករណ៍មិនស្មុគស្មាញជាងដៃរបស់គាត់ផ្ទាល់ដែលលាតសន្ធឹង។"
            accent={BRONZE_DEEP}
          />

          <LostWisdomCard
            isKh={isKh}
            Icon={Wind}
            SecondaryIcon={Landmark}
            enName="Natural Architecture"
            khName="ស្ថាបត្យកម្មធម្មជាតិ"
            enTag="wind catchers · cool rooms without electricity"
            khTag="អ្នកចាប់ខ្យល់ · បន្ទប់ត្រជាក់ដោយគ្មានអគ្គិសនី"
            enBody="In the deserts of Persia, Egypt and the Arab world, ancient architects designed houses that stayed cool inside even when the outside temperature climbed past 45 °C — without a single fan or air conditioner. Their secret was the wind catcher (បារ្គីរ — Bâdgir), a tall chimney-like tower rising above the roof. Wind blowing across its high openings was funnelled down into the house, often passing first over a small underground pool of water, which evaporatively chilled the air. Hot stale air inside the house simultaneously rose up through a second shaft and escaped, creating a constant gentle breeze through every room. It is, in effect, an air conditioner with no moving parts and no electricity, powered entirely by the wind, the sun, and the geometry of the building itself — and many wind catchers built 500 years ago are still working today."
            khBody="នៅវាលខ្សាច់ពែស៊ី អេស៊ីប និងពិភពអារ៉ាប់ ស្ថាបនិកបុរាណបានរចនាផ្ទះដែលនៅត្រជាក់ខាងក្នុង សូម្បីពេលសីតុណ្ហភាពខាងក្រៅឡើងលើស ៤៥ អង្សាសេ — ដោយគ្មានកង្ហារ ឬម៉ាស៊ីនត្រជាក់សូម្បីតែមួយ។ អាថ៌កំបាំងរបស់ពួកគេគឺ អ្នកចាប់ខ្យល់ (បារ្គីរ — Wind Catcher / Bâdgir) ដែលជាប៉មខ្ពស់ដូចបំពង់ផ្សែង លេចឡើងលើដំបូល។ ខ្យល់ដែលបក់ឆ្លងកាត់រន្ធខ្ពស់របស់វា ត្រូវបានបញ្ជូនចុះទៅក្នុងផ្ទះ ច្រើនតែឆ្លងកាត់ជាមុនលើអាងទឹកតូចមួយនៅក្រោមដី ដែលធ្វើឲ្យខ្យល់ត្រជាក់តាមរយៈការហួត។ នៅពេលតែមួយ ខ្យល់ក្តៅចាស់ខាងក្នុងផ្ទះឡើងតាមផ្នូររនុកទីពីរ ហើយចេញ បង្កើតខ្យល់រលឹមថ្នមៗឆ្លងកាត់រាល់បន្ទប់។ វាគឺ ជាការពិត ម៉ាស៊ីនត្រជាក់មួយ ដែលគ្មានផ្នែកផ្លាស់ទី និងគ្មានអគ្គិសនី បានដំណើរការទាំងស្រុងដោយខ្យល់ ព្រះអាទិត្យ និងធរណីមាត្រនៃអាគារផ្ទាល់ — ហើយអ្នកចាប់ខ្យល់ជាច្រើនដែលបានសាងសង់កាលពី ៥០០ ឆ្នាំមុន នៅតែដំណើរការមកដល់សព្វថ្ងៃ។"
            accent={STONE_DEEP}
          />
        </div>

        {/* Closing reflection */}
        <div
          className="relative mt-8 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3 shadow"
          style={{
            borderColor: `${BRONZE}55`,
            backgroundImage: `linear-gradient(135deg, #fffbe9 0%, ${PARCHMENT_DEEP}88 100%)`,
          }}
          data-testid="closing-note"
        >
          <Sparkles
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            style={{ color: BRONZE_DEEP }}
            aria-hidden="true"
          />
          <p
            className={`text-sm sm:text-[15px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK }}
          >
            <strong className={isKh ? "" : "font-bold"}>
              {isKh ? "គំនិតធំ ៖ " : "The big idea: "}
            </strong>
            {isKh
              ? "មនុស្សបុរាណមិនមានបច្ចេកវិទ្យាតិចជាងយើងទេ — ពួកគេមានបច្ចេកវិទ្យាខុសគ្នា។ ចំណេះដឹងរបស់ពួកគេបានរស់នៅក្នុងដៃ ភ្នែក និងការចងចាំរបស់ពួកគេ បន្តពីមួយជំនាន់ទៅមួយជំនាន់ជានាន់។ រៀនពីរបៀបដែលពួកគេធ្វើសិល្បៈរបស់ពួកគេ មិនត្រឹមតែជាការគោរពអតីតកាលប៉ុណ្ណោះទេ វាជាការមើលឃើញភ័ស្តុតាងថា ដៃរបស់មនុស្សតែម្នាក់ ភ្ជាប់ជាមួយការអត់ធ្មត់ និងការអវត្តមាននៃការប្រញាប់ អាចសាងសង់អស្ចារ្យបាន។"
              : "Ancient people did not have less technology than us — they had different technology. Their knowledge lived in their hands, their eyes, and their memory, passed from generation to generation by example. Learning how they made their crafts is not just respect for the past, it is proof that one pair of human hands, joined to patience and the absence of hurry, can build the extraordinary."}
          </p>
        </div>
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm hover:underline ${isKh ? "font-khmer" : ""}`}
          style={{ color: BRONZE_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec,
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  descEn,
  descKh,
  isKh,
  children,
  testId,
}: {
  spec: string;
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  isKh: boolean;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      data-testid={testId}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-sm px-2.5 py-0.5 border"
          style={{
            backgroundColor: "#fffbe9",
            color: BRONZE_DEEP,
            borderColor: `${BRONZE}55`,
          }}
        >
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ color: BRONZE_DEEP }}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}
        style={{ color: INK }}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <div
        className="text-base sm:text-lg font-semibold font-khmer leading-snug mb-3"
        style={{ color: STONE }}
      >
        {isKh ? titleEn : titleKh}
      </div>
      <p
        className={`text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: "#3f2d1a" }}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function StatChip({
  valueEn,
  labelEn,
  labelKh,
}: {
  valueEn: string;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div
      className="rounded-xl border px-3 py-2 flex flex-col"
      style={{
        backgroundColor: "rgba(255, 251, 233, 0.8)",
        backdropFilter: "blur(4px)",
        borderColor: `${BRONZE}55`,
      }}
    >
      <div
        className="font-display font-bold text-2xl leading-none"
        style={{ color: BRONZE_DEEP }}
      >
        {valueEn}
      </div>
      <div className="text-[11px] mt-1 leading-tight" style={{ color: "#3f2d1a" }}>
        {labelEn}
      </div>
      <div className="text-[11px] font-khmer leading-snug" style={{ color: STONE }}>
        {labelKh}
      </div>
    </div>
  );
}

function ParchmentGrain() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(124, 74, 29, 0.18) 1px, transparent 1.4px)",
        backgroundSize: "22px 22px",
      }}
    />
  );
}

// ── Artisan profile card (Section 1) ─────────────────────────────────────
function ArtisanCard({
  isKh,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  secondary,
}: {
  isKh: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  secondary?: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#fffbe9",
        borderColor: `${accent}55`,
        boxShadow: `0 0 0 1px ${accent}22 inset, 0 12px 30px -16px ${accent}66`,
      }}
      data-testid={`artisan-card-${enName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}18`,
            border: `1px solid ${accent}55`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} aria-hidden={true} />
        </div>
        <div className="flex-1 min-w-0">
          {/* Always-paired bilingual title */}
          <h3
            className={`font-display font-bold text-lg sm:text-xl leading-tight ${isKh ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {isKh ? khName : enName}
          </h3>
          <div
            className="font-khmer text-xs sm:text-sm font-semibold leading-tight"
            style={{ color: STONE }}
          >
            {isKh ? enName : khName}
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {isKh ? khTag : enTag}
          </div>
        </div>
      </div>
      <p
        className={`text-sm sm:text-[15px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: "#3f2d1a" }}
      >
        {isKh ? khBody : enBody}
      </p>
      {secondary ? <div className="mt-4">{secondary}</div> : null}
    </div>
  );
}

function ToolList({
  isKh,
  items,
  accent,
}: {
  isKh: boolean;
  items: { en: string; kh: string }[];
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        backgroundColor: `${accent}0d`,
        borderColor: `${accent}33`,
      }}
    >
      <div
        className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
        style={{ color: accent }}
      >
        {isKh ? "ផលិតផល" : "What they made"}
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className={`text-xs sm:text-sm flex items-start gap-1.5 ${isKh ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
          >
            <span
              className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span>{isKh ? item.kh : item.en}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Builder card (Section 2) ────────────────────────────────────────────
function BuilderCard({
  isKh,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  children,
}: {
  isKh: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#fffbe9",
        borderColor: `${accent}66`,
        boxShadow: `0 0 0 1px ${accent}22 inset, 0 14px 32px -16px ${accent}66`,
        backgroundImage: `linear-gradient(135deg, #fffbe9 0%, ${accent}0d 100%)`,
      }}
      data-testid={`builder-card-${enName.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}18`,
            border: `1px solid ${accent}55`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} aria-hidden={true} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-display font-bold text-lg sm:text-xl leading-tight ${isKh ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {isKh ? khName : enName}
          </h3>
          <div
            className="font-khmer text-xs sm:text-sm font-semibold leading-tight"
            style={{ color: STONE }}
          >
            {isKh ? enName : khName}
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {isKh ? khTag : enTag}
          </div>
        </div>
      </div>
      <p
        className={`text-sm sm:text-[15px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: "#3f2d1a" }}
      >
        {isKh ? khBody : enBody}
      </p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

// ── Lost wisdom card (Section 3) ────────────────────────────────────────
function LostWisdomCard({
  isKh,
  Icon,
  SecondaryIcon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
}: {
  isKh: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  SecondaryIcon: React.ComponentType<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#fffbe9",
        borderColor: `${accent}66`,
        boxShadow: `0 0 0 1px ${accent}22 inset, 0 14px 32px -16px ${accent}66`,
        backgroundImage: `linear-gradient(135deg, ${PARCHMENT} 0%, #fffbe9 60%, ${accent}11 100%)`,
      }}
      data-testid={`lost-wisdom-card-${enName.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: `${accent}18`,
              border: `1px solid ${accent}66`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: accent }} aria-hidden={true} />
          </div>
          <div
            className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg flex items-center justify-center border bg-white"
            style={{ borderColor: `${accent}66` }}
          >
            <SecondaryIcon
              className="w-3.5 h-3.5"
              style={{ color: accent }}
              aria-hidden={true}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-display font-bold text-lg sm:text-xl leading-tight ${isKh ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {isKh ? khName : enName}
          </h3>
          <div
            className="font-khmer text-xs sm:text-sm font-semibold leading-tight"
            style={{ color: STONE }}
          >
            {isKh ? enName : khName}
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {isKh ? khTag : enTag}
          </div>
        </div>
      </div>
      <p
        className={`text-sm sm:text-[15px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: "#3f2d1a" }}
      >
        {isKh ? khBody : enBody}
      </p>
    </div>
  );
}

// ── Inline SVG illustrating the corbel arch (no central keystone) ──────
function CorbelArchSVG({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        backgroundColor: `${STONE}10`,
        borderColor: `${STONE}33`,
      }}
      role="img"
      aria-label={
        isKh
          ? "ដ្យាក្រាមនៃខ្ទមកោប — ជួរថ្មនីមួយៗកាន់តែចូលជិតចំកណ្តាល រហូតដល់ផ្នែកទាំងពីរជួបគ្នា"
          : "Diagram of a corbel arch — each row of stones steps closer to the centre until the two sides meet"
      }
    >
      <svg viewBox="0 0 220 110" className="w-full h-32" aria-hidden="true">
        {/* Ground */}
        <line x1="6" y1="100" x2="214" y2="100" stroke={STONE} strokeWidth="1.2" />
        {/* Left wall — stepped corbel */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 90 - i * 12;
          const w = 56 - i * 7;
          return (
            <rect
              key={`l-${i}`}
              x={20}
              y={y}
              width={w}
              height={11}
              rx={1.5}
              fill={i % 2 === 0 ? "#a98859" : "#8d7148"}
              stroke={BRONZE_DEEP}
              strokeWidth="0.6"
            />
          );
        })}
        {/* Right wall — stepped corbel */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 90 - i * 12;
          const w = 56 - i * 7;
          return (
            <rect
              key={`r-${i}`}
              x={200 - w}
              y={y}
              width={w}
              height={11}
              rx={1.5}
              fill={i % 2 === 0 ? "#a98859" : "#8d7148"}
              stroke={BRONZE_DEEP}
              strokeWidth="0.6"
            />
          );
        })}
        {/* Capstone meeting at top (no true keystone) */}
        <rect
          x={90}
          y={18}
          width={40}
          height={11}
          rx={1.5}
          fill="#74583a"
          stroke={BRONZE_DEEP}
          strokeWidth="0.6"
        />
        {/* Caption arrow */}
        <line
          x1="110"
          y1="36"
          x2="110"
          y2="60"
          stroke={BRONZE_DEEP}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <text
          x="110"
          y="74"
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="monospace"
          fill={BRONZE_DEEP}
        >
          {isKh ? "ខ្ទមកោប" : "Corbel Arch"}
        </text>
      </svg>
      <p
        className={`mt-2 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: STONE_DEEP }}
      >
        {isKh
          ? "ជួរនីមួយៗដាក់ចូលក្នុងបន្តិចពីខាងក្រោម។ មិនមានដុំកណ្តាល មិនមានសុីម៉ងត៍ — ទំនាញទាញរាល់ដុំចូលក្នុងជញ្ជាំងផ្ទាល់របស់វា។"
          : "Each row steps inward from the row below. There is no central keystone, no mortar — gravity locks every block into its own wall."}
      </p>
    </div>
  );
}
