import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Recycle,
  Zap,
  Truck,
  Package,
  Wrench,
  Sparkles,
  Factory,
  Users,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Boxes,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-SCI-MAT-02 · Recycling: The Energy Economics of Trash
//                ការកែច្នៃឡើងវិញ៖ សេដ្ឋកិច្ចថាមពលនៃសំរាម
//
//  A rugged, industrial deep-dive within Materials Science.
//
//  Cards:
//    1. The Energy Cheat Code — Aluminum 95%, Steel 60-70%, Glass 30%, Plastic 80%
//    2. The Edjai Ecosystem  — Cambodia's informal waste-picker network
//    3. Starting a Recycling Business — 3-step entrepreneurial pathway
//
//  Aesthetic: metallic silvers · glass blues · eco-greens · blueprint grid
// ════════════════════════════════════════════════════════════════════════════

const STEEL = "#475569";          // metallic silver / industrial steel
const STEEL_LIGHT = "#cbd5e1";
const STEEL_DEEP = "#1e293b";
const GLASS_BLUE = "#0284c7";     // glass / clean process blue
const GLASS_BLUE_LIGHT = "#bae6fd";
const GLASS_BLUE_DEEP = "#075985";
const ECO_GREEN = "#15803d";      // recycling / eco green
const ECO_GREEN_LIGHT = "#bbf7d0";
const ECO_GREEN_DEEP = "#14532d";
const COPPER = "#b45309";         // accent for warnings / heat / energy

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f1f5f9",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

export default function RecyclingSciencePage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-800" style={PAGE_BG}>
      {/* ── Top: back link ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/science/materials"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: GLASS_BLUE_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Materials Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រសម្ភារៈ")}
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase font-mono"
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${STEEL}55`,
            color: STEEL_DEEP,
          }}
        >
          <Recycle className="w-3.5 h-3.5" style={{ color: ECO_GREEN_DEEP }} />
          {t("Materials Science · Module 02", "វិទ្យាសាស្ត្រសម្ភារៈ · ម៉ូឌុល ០២")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: STEEL_DEEP }}
        >
          {k ? (
            <>
              ការកែច្នៃឡើងវិញ៖{" "}
              <span style={{ color: ECO_GREEN_DEEP }}>សេដ្ឋកិច្ចថាមពលនៃសំរាម</span>
            </>
          ) : (
            <>
              Recycling:{" "}
              <span style={{ color: ECO_GREEN_DEEP }}>The Energy Economics of Trash</span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-700 max-w-3xl text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "A used aluminum can is not garbage. It is a small ingot of pure metal — already smelted, already refined — sitting in your hand. The whole logic of recycling is that the hardest, hottest, most expensive part of making a material has already been done. Throwing it away means doing all that work over again.",
            "កំប៉ុងអាលុយមីញ៉ូមដែលប្រើហើយ មិនមែនជាសំរាមទេ។ វាគឺជាដុំដែកសុទ្ធតូចមួយ — រលាយរួចហើយ ចម្រាញ់រួចហើយ — នៅក្នុងដៃរបស់អ្នក។ តក្កវិជ្ជានៃការកែច្នៃឡើងវិញគឺថា ផ្នែកដ៏លំបាក ដ៏ក្ដៅ និងចំណាយខ្លាំងបំផុតនៃការបង្កើតសម្ភារៈនោះ បានធ្វើរួចហើយ។ ការបោះវាចោល មានន័យថាធ្វើការទាំងអស់នោះម្ដងទៀត។",
          )}
        </p>

        {/* Headline stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          <StatTile big="95%" labelEn="energy saved · aluminum" labelKh="ថាមពលសន្សំ · អាលុយមីញ៉ូម" color={ECO_GREEN_DEEP} k={k} />
          <StatTile big="60-70%" labelEn="energy saved · steel" labelKh="ថាមពលសន្សំ · ដែកថែប" color={STEEL_DEEP} k={k} />
          <StatTile big="30%" labelEn="energy saved · glass" labelKh="ថាមពលសន្សំ · កញ្ចក់" color={GLASS_BLUE_DEEP} k={k} />
          <StatTile big="80%" labelEn="energy saved · plastic" labelKh="ថាមពលសន្សំ · ប្លាស្ទិក" color={COPPER} k={k} />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · The Energy Cheat Code
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-energy-cheat-code"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <BlueprintCard
          tagEn="Card 01 · Thermodynamics"
          tagKh="កាត ០១ · ទែម៉ូឌីណាមិច"
          icon={Zap}
          accent="green"
          titleEn="The Energy Cheat Code"
          titleKh="រូបមន្តសន្សំថាមពល"
          k={k}
        >
          <p className={`mb-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Extracting raw metals from rocks — what we call mining and smelting — requires melting stones at massive temperatures, sometimes above 1,500°C. The furnaces burn coal, gas, or huge amounts of electricity. Recycling skips the entire mining and smelting phase. You start with material that is already pure. All you have to do is melt it gently and pour it into a new shape.",
              "ការទាញយកដែកដើមពីថ្ម — អ្វីដែលយើងហៅថា ការជីករ៉ែ និងការរលាយ — តម្រូវឲ្យរលាយថ្មនៅសីតុណ្ហភាពខ្ពស់មហិមា ជួនកាលលើស ១,៥០០°C។ ឡធ្វើដំណើរដោយដុតធ្យូងថ្ម ឧស្ម័ន ឬអគ្គិសនីច្រើនមហិមា។ ការកែច្នៃឡើងវិញ រំលងដំណាក់កាលជីករ៉ែ និងរលាយទាំងស្រុង។ អ្នកចាប់ផ្ដើមជាមួយសម្ភារៈដែលសុទ្ធរួចហើយ។ អ្វីដែលអ្នកត្រូវធ្វើគឺ រលាយវាដោយថ្នមៗ ហើយចាក់ចូលរូបរាងថ្មី។",
            )}
          </p>

          <h3 className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: STEEL_DEEP }}>
            {t("Energy savings by material", "ការសន្សំថាមពលតាមសម្ភារៈ")}
          </h3>

          <div className="space-y-3">
            <MaterialRow
              k={k}
              icon={<AluminumGlyph />}
              nameEn="Aluminum"
              nameKh="អាលុយមីញ៉ូម"
              pct={95}
              color={ECO_GREEN_DEEP}
              tagEn="infinitely recyclable"
              tagKh="កែច្នៃបានគ្មានដែនកំណត់"
              bodyEn="Recycling one aluminum can saves 95% of the energy needed to make a new one from bauxite ore. Aluminum can be melted and reformed forever without losing quality — the can in your hand today might have been a part of an airplane or a window frame fifty years ago."
              bodyKh="ការកែច្នៃកំប៉ុងអាលុយមីញ៉ូមមួយ សន្សំ ៩៥% នៃថាមពលដែលត្រូវការ ដើម្បីបង្កើតថ្មីពីរ៉ែបុកស៊ីត។ អាលុយមីញ៉ូមអាចរលាយ ហើយធ្វើជាទម្រង់ថ្មីបានជារៀងរហូត ដោយមិនបាត់បង់គុណភាព — កំប៉ុងនៅក្នុងដៃអ្នកថ្ងៃនេះ ប្រហែលជាធ្លាប់ជាផ្នែកនៃយន្តហោះ ឬស៊ុមបង្អួចកាលពី ៥០ ឆ្នាំមុន។"
            />
            <MaterialRow
              k={k}
              icon={<SteelGlyph />}
              nameEn="Steel & Iron"
              nameKh="ដែក និងដែកថែប"
              pct={65}
              color={STEEL_DEEP}
              tagEn="60–70% energy saved"
              tagKh="សន្សំថាមពល ៦០–៧០%"
              bodyEn="Recycling steel saves roughly 60% to 70% of the energy. Steel is the most-recycled material on Earth by weight. A recycled car frame can be melted and rolled into the steel rebar holding up a new school building — every modern Cambodian construction site is partly built from yesterday's vehicles."
              bodyKh="ការកែច្នៃដែកថែប សន្សំប្រហែល ៦០% ទៅ ៧០% នៃថាមពល។ ដែកថែប គឺជាសម្ភារៈដែលកែច្នៃច្រើនបំផុតនៅលើផែនដី តាមទម្ងន់។ ស៊ុមរថយន្តកែច្នៃ អាចត្រូវរលាយ ហើយរំកិលជាដែកដែលទប់ទល់សាលារៀនថ្មី — ការដ្ឋានសំណង់សម័យទំនើបនៅកម្ពុជា មួយផ្នែកត្រូវបានសាងសង់ពីយានយន្តកាលពីម្សិលមិញ។"
            />
            <MaterialRow
              k={k}
              icon={<GlassGlyph />}
              nameEn="Glass"
              nameKh="កញ្ចក់"
              pct={30}
              color={GLASS_BLUE_DEEP}
              tagEn="never loses quality"
              tagKh="មិនបាត់បង់គុណភាព"
              bodyEn="Glass saves about 30% of energy when recycled. The number is smaller because melting sand into glass is not as energy-hungry as smelting metal — but, like metal, glass never loses its quality. A glass bottle can be melted and reformed forever."
              bodyKh="កញ្ចក់សន្សំថាមពលប្រហែល ៣០% នៅពេលកែច្នៃ។ លេខនេះតូចជាង ព្រោះការរលាយខ្សាច់ឲ្យក្លាយជាកញ្ចក់ មិនត្រូវការថាមពលច្រើនដូចការរលាយដែកទេ — ប៉ុន្តែដូចជាដែក កញ្ចក់មិនបាត់បង់គុណភាពរបស់វាឡើយ។ ដបកញ្ចក់មួយ អាចរលាយ ហើយបង្កើតឡើងវិញបានជារៀងរហូត។"
            />
            <MaterialRow
              k={k}
              icon={<PlasticGlyph />}
              nameEn="Plastic"
              nameKh="ប្លាស្ទិក"
              pct={80}
              color={COPPER}
              tagEn="downcycles each pass"
              tagKh="ធ្លាក់ចុះគុណភាពរាល់ជុំ"
              bodyEn="Plastic is the hardest. Every time it is melted, the long molecule chains shorten and weaken — this is called downcycling. A clear PET water bottle becomes carpet fibre, then becomes plastic lumber, then becomes nothing useful. The savings figure is up to ~80% — the real number swings widely depending on the polymer (PET, HDPE, PP, etc.), how clean the input is, and how the plant runs — but recycling plastic always beats pumping new petroleum from the ground and refining it from scratch."
              bodyKh="ប្លាស្ទិក គឺពិបាកបំផុត។ រាល់ពេលដែលវារលាយ ខ្សែសង្វាក់ម៉ូលេគុលវែងៗកាន់តែខ្លី ហើយខ្សោយ — នេះត្រូវបានហៅថា ការធ្លាក់ចុះគុណភាព (downcycling)។ ដបទឹកប្លាស្ទិក PET ច្បាស់ ក្លាយជាសរសៃកម្រាល បន្ទាប់មកក្លាយជាឈើប្លាស្ទិក បន្ទាប់មកទៀតក្លាយជាគ្មានអ្វីប្រើប្រាស់បាន។ លេខសន្សំគឺរហូតដល់ប្រហែល ៨០% — លេខពិតប្រែប្រួលច្រើន អាស្រ័យលើប្រភេទប៉ូលីម័រ (PET, HDPE, PP ។ល។) ភាពស្អាតនៃធាតុចូល និងការដំណើរការរបស់រោងចក្រ — ប៉ុន្តែការកែច្នៃប្លាស្ទិក តែងតែជាងការបូមប្រេងថ្មីពីដី និងចម្រាញ់វាពីដំបូង។"
            />
          </div>

          <div
            className="mt-5 rounded-xl p-4 flex items-start gap-3"
            style={{ backgroundColor: ECO_GREEN_LIGHT + "55", border: `1px solid ${ECO_GREEN}55` }}
          >
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ECO_GREEN_DEEP }} aria-hidden="true" />
            <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("The big idea: ", "គំនិតធំ ៖ ")}</strong>
              {t(
                "every percentage point of saved energy is a percentage point of coal not burned, of forest not cleared for a mine, and of cooler air for the next generation.",
                "រាល់ភាគរយនៃថាមពលដែលសន្សំ គឺជាភាគរយនៃធ្យូងថ្មដែលមិនបានដុត ព្រៃឈើដែលមិនបានកាប់សម្រាប់រ៉ែ និងខ្យល់ត្រជាក់ជាងមុនសម្រាប់មនុស្សជំនាន់ក្រោយ។",
              )}
            </p>
          </div>
        </BlueprintCard>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · The Edjai Ecosystem
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-edjai-ecosystem"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <BlueprintCard
          tagEn="Card 02 · Cambodia in Practice"
          tagKh="កាត ០២ · កម្ពុជាក្នុងការអនុវត្ត"
          icon={Users}
          accent="blue"
          titleEn="The Edjai Ecosystem"
          titleKh="ប្រព័ន្ធអេកូឡូស៊ីអេតចាយ"
          k={k}
        >
          <p className={`mb-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Walk through any Cambodian city at dawn and you will see them: men and women pushing carts, sorting through garbage with practised hands, weighing aluminum cans and PET bottles on small spring scales. They are called ",
              "ដើរកាត់ទីក្រុងណាមួយរបស់កម្ពុជានៅពេលថ្ងៃរះ អ្នកនឹងឃើញពួកគេ ៖ បុរសនិងស្ត្រី រុញរទេះ តម្រៀបសំរាមដោយដៃស្ទាត់ ថ្លឹងកំប៉ុងអាលុយមីញ៉ូម និងដបប្លាស្ទិក PET លើជញ្ជីងតូច។ ពួកគេត្រូវបានហៅថា ",
            )}
            <strong style={{ color: GLASS_BLUE_DEEP }}>{t("Edjai", "អេតចាយ")}</strong>
            {t(
              " — informal waste pickers. They are not just collecting garbage. They are the frontline environmental engineers of the country.",
              " — អ្នករើសសំរាមមិនផ្លូវការ។ ពួកគេមិនមែនគ្រាន់តែប្រមូលសំរាមទេ។ ពួកគេគឺជាវិស្វករបរិស្ថានជួរមុខរបស់ប្រទេស។",
            )}
          </p>

          {/* The chain */}
          <h3 className={`text-sm font-bold mb-3 mt-2 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: STEEL_DEEP }}>
            {t("How the chain moves", "របៀបដែលខ្សែសង្វាក់ផ្លាស់ទី")}
          </h3>
          <ChainFlow k={k} />

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <FactBox
              icon={Wallet}
              accent="blue"
              titleEn="What it pays"
              titleKh="តើវាទទួលបានប៉ុន្មាន"
              k={k}
            >
              {t(
                "An Edjai worker earns by weight. Indicative buy-prices in Cambodia hover around $0.40–$0.80 per kilogram of clean aluminum, roughly $0.10 per kilogram of mixed PET, and only a few cents per kilogram of mixed scrap iron — but rates shift with the global commodity market and vary by city, depot, and date. A long day's work, 20 to 40 kg of mixed material, can mean a few dollars in income.",
                "កម្មករអេតចាយរកប្រាក់តាមទម្ងន់។ តម្លៃទិញជាឆ្នូតៗនៅកម្ពុជាមានប្រហែល ០.៤០–០.៨០ ដុល្លារ ក្នុង ១ គីឡូក្រាមនៃអាលុយមីញ៉ូមស្អាត ប្រហែល ០.១០ ដុល្លារ ក្នុង ១ គីឡូក្រាមនៃ PET លាយ និងគ្រាន់តែពីរបីសេន ក្នុង ១ គីឡូក្រាមនៃដែកលាយ — ប៉ុន្តែតម្លៃផ្លាស់ប្ដូរតាមទីផ្សារទំនិញពិភពលោក និងប្រែប្រួលតាមទីក្រុង ឃ្លាំង និងថ្ងៃ។ ការងារមួយថ្ងៃវែង ២០ ទៅ ៤០ គីឡូក្រាមនៃសម្ភារៈលាយ អាចមានន័យថាប្រាក់ចំណូលពីរបីដុល្លារ។",
              )}
            </FactBox>
            <FactBox
              icon={Globe}
              accent="green"
              titleEn="Where it goes"
              titleKh="តើទៅណា"
              k={k}
            >
              {t(
                "From the local depot the material is consolidated, baled, and most of it is exported as raw scrap to Vietnam, Thailand, or further afield, where giant electric-arc furnaces and recycling plants do the high-energy melting work that Cambodia does not yet have at scale.",
                "ពីឃ្លាំងមូលដ្ឋាន សម្ភារៈនេះត្រូវប្រមូលផ្ដុំ បង្ហាប់ជាដុំ ហើយភាគច្រើនត្រូវនាំចេញជាដែកអេតចាយដើម ទៅវៀតណាម ថៃ ឬឆ្ងាយជាងនេះ ដែលឡអេឡិចត្រិកដ៏ធំ និងរោងចក្រកែច្នៃ ធ្វើការងាររលាយដ៏ត្រូវការថាមពលខ្ពស់ ដែលកម្ពុជាមិនទាន់មានជាខ្នាតធំនៅឡើយ។",
              )}
            </FactBox>
          </div>

          <div
            className="mt-5 rounded-xl p-4 flex items-start gap-3"
            style={{ backgroundColor: GLASS_BLUE_LIGHT + "55", border: `1px solid ${GLASS_BLUE}55` }}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GLASS_BLUE_DEEP }} aria-hidden="true" />
            <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("Recognise the work: ", "ទទួលស្គាល់ការងារ ៖ ")}</strong>
              {t(
                "without the Edjai network, almost every aluminum can in Cambodia would end up burned or buried. The whole national recycling rate rests on their hands.",
                "បើគ្មានបណ្ដាញអេតចាយ កំប៉ុងអាលុយមីញ៉ូមស្ទើរតែទាំងអស់នៅកម្ពុជា នឹងបញ្ចប់ដោយការដុត ឬកប់។ អត្រាកែច្នៃជាតិទាំងមូល ពឹងផ្អែកលើដៃរបស់ពួកគេ។",
              )}
            </p>
          </div>
        </BlueprintCard>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · Starting a Recycling Business
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-business-pathway"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <BlueprintCard
          tagEn="Card 03 · Entrepreneurial Pathway"
          tagKh="កាត ០៣ · មាគ៌ាសហគ្រិន"
          icon={Factory}
          accent="green"
          titleEn="Starting a Recycling Business in Cambodia"
          titleKh="ការចាប់ផ្តើមអាជីវកម្មកែច្នៃនៅកម្ពុជា"
          k={k}
        >
          <p className={`mb-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "If you are finishing 12th grade and looking for a serious business path that helps your country at the same time, recycling is one of the cleanest entries into industry that exists. The barrier is not technology — the technology is hundreds of years old. The barrier is logistics, sorting discipline, and patience. Here is the shape of it.",
              "ប្រសិនបើអ្នកកំពុងបញ្ចប់ថ្នាក់ទី ១២ ហើយកំពុងស្វែងរកមាគ៌ាអាជីវកម្មដ៏ធ្ងន់ធ្ងរ ដែលជួយប្រទេសរបស់អ្នកក្នុងពេលតែមួយ ការកែច្នៃគឺជាការចូលដ៏ស្អាតបំផុតមួយទៅក្នុងឧស្សាហកម្មដែលមាន។ ឧបសគ្គមិនមែនជាបច្ចេកវិទ្យាទេ — បច្ចេកវិទ្យានោះមានអាយុរាប់រយឆ្នាំហើយ។ ឧបសគ្គគឺ ភស្តុភារ វិន័យក្នុងការតម្រៀប និងការអត់ធ្មត់។ នេះគឺជារូបរាងរបស់វា។",
            )}
          </p>

          <BusinessStep
            n="01"
            icon={Truck}
            color={GLASS_BLUE_DEEP}
            bg={GLASS_BLUE_LIGHT}
            titleEn="Collection Logistics"
            titleKh="ភស្តុភារនៃការប្រមូល"
            k={k}
            bodyEn="You need a network of collection points — collection carts, partnerships with restaurants and apartment buildings, agreements with Edjai workers — funnelling material into one central warehouse. The single biggest cost is not the truck. It is the floor space. Plan for at least 200 m² of dry, secure storage from day one."
            bodyKh="អ្នកត្រូវការបណ្ដាញនៃចំណុចប្រមូល — រទេះប្រមូល ភាពជាដៃគូជាមួយភោជនីយដ្ឋាន និងអគារផ្ទះល្វែង កិច្ចព្រមព្រៀងជាមួយកម្មករអេតចាយ — បន្តចូលសម្ភារៈទៅឃ្លាំងកណ្ដាលមួយ។ ការចំណាយធំបំផុតគ្មានមួយ មិនមែនជាឡានទេ។ វាគឺជាផ្ទៃដី។ គ្រោងទុកសម្រាប់យ៉ាងតិច ២០០ ម៉ែត្រការ៉េនៃកន្លែងផ្ទុកស្ងួត និងសុវត្ថិភាព ចាប់ពីថ្ងៃទីមួយ។"
            checklistEn={["Collection carts or small truck", "Central warehouse (200 m² +)", "Edjai partnerships & buy prices", "Weighing scales (50 kg + 5 kg)"]}
            checklistKh={["រទេះប្រមូល ឬឡានតូច", "ឃ្លាំងកណ្ដាល (២០០ ម២ +)", "ភាពជាដៃគូ & តម្លៃទិញពីអេតចាយ", "ជញ្ជីង (៥០ គក + ៥ គក)"]}
          />

          <BusinessStep
            n="02"
            icon={Wrench}
            color={ECO_GREEN_DEEP}
            bg={ECO_GREEN_LIGHT}
            titleEn="Sorting & Cleaning — the Value Add"
            titleKh="ការតម្រៀប & ការសម្អាត — តម្លៃបន្ថែម"
            k={k}
            bodyEn="Mixed plastic is worthless. Sorted, washed, and shredded Type-1 PET plastic is a global commodity worth real money on international markets. The business makes money by doing the hard, unglamorous work of organising chaos: separating PET from HDPE from PVC, cutting the labels off, washing the contamination, and shredding into clean flake. This is where the margin lives."
            bodyKh="ប្លាស្ទិកលាយ គ្មានតម្លៃ។ ប្លាស្ទិក PET ប្រភេទ ១ ដែលតម្រៀប លាង និងកិន គឺជាទំនិញសកលដែលមានតម្លៃប្រាក់ពិតៗនៅលើទីផ្សារអន្តរជាតិ។ អាជីវកម្មរកប្រាក់ដោយធ្វើការងារដ៏លំបាក និងគ្មានកិត្តិយស នៃការរៀបចំភាពរញ៉េរញ៉ៃ ៖ បែងចែក PET ពី HDPE ពី PVC កាត់ស្លាកចេញ លាងការបំពុល និងកិនជាបន្ទះស្អាត។ នេះគឺជាកន្លែងដែលប្រាក់ចំណេញរស់នៅ។"
            checklistEn={["Sorting tables & gloves", "Washing tank with screen", "Plastic shredder (3-7 kW)", "Bins labelled by resin code 1–7"]}
            checklistKh={["តុតម្រៀប & ស្រោមដៃ", "ធុងលាងមានបន្ទះច្រោះ", "ម៉ាស៊ីនកិនប្លាស្ទិក (៣-៧ kW)", "ធុងដាក់ស្លាកតាមលេខរ៉េស៊ីន ១–៧"]}
          />

          <BusinessStep
            n="03"
            icon={Package}
            color={STEEL_DEEP}
            bg={STEEL_LIGHT}
            titleEn="Baling & Shipping"
            titleKh="ការបង្ហាប់ជាដុំ & ការដឹកជញ្ជូន"
            k={k}
            bodyEn="A hydraulic press crushes the sorted material into dense rectangular cubes called bales. A bale of clean PET weighs roughly 200–400 kg and stacks neatly into shipping containers. From here, you sell — to a domestic plastics manufacturer making new bottles or pellets, or to an export buyer in Vietnam or Thailand. The bale price moves with the global oil price; cleaner sorting always pays more."
            bodyKh="ម៉ាស៊ីនបង្ហាប់អ៊ីដ្រូលិក បង្ហាប់សម្ភារៈដែលតម្រៀបរួច ឲ្យក្លាយជាគូបបួនជ្រុងក្រាស់ដែលហៅថា ដុំបាល។ ដុំ PET ស្អាតមួយ ទម្ងន់ប្រហែល ២០០–៤០០ គីឡូក្រាម និងជង់បានយ៉ាងស្អាតចូលក្នុងកុងតឺន័រដឹកជញ្ជូន។ ពីទីនេះ អ្នកលក់ — ទៅរោងចក្រប្លាស្ទិកក្នុងស្រុកដែលបង្កើតដបថ្មី ឬគ្រាប់ ឬទៅអ្នកទិញនាំចេញនៅវៀតណាម ឬថៃ។ តម្លៃដុំបាលផ្លាស់ប្ដូរតាមតម្លៃប្រេងពិភពលោក; ការតម្រៀបស្អាតជាង តែងតែទទួលបានតម្លៃខ្ពស់ជាង។"
            checklistEn={["Hydraulic baling press (10–30 ton)", "Forklift or pallet jack", "Buyer contracts (domestic + export)", "Container loading dock"]}
            checklistKh={["ម៉ាស៊ីនបង្ហាប់អ៊ីដ្រូលិក (១០–៣០ តោន)", "រ៉ឺម៉ក ឬជើងទម្រដឹក", "កិច្ចសន្យាអ្នកទិញ (ក្នុងស្រុក + នាំចេញ)", "កន្លែងផ្ទុកកុងតឺន័រ"]}
          />

          {/* Risks / honesty */}
          <div
            className="mt-6 rounded-2xl p-5 flex items-start gap-3"
            style={{ backgroundColor: "#fff7ed", border: `1px solid ${COPPER}55` }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COPPER }} aria-hidden="true" />
            <div>
              <h4 className={`text-sm font-bold mb-2 ${k ? "font-khmer" : ""}`} style={{ color: COPPER }}>
                {t("Honest risks", "ហានិភ័យត្រង់ៗ")}
              </h4>
              <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {t(
                  "Bale prices swing with global oil markets — when oil is cheap, virgin plastic is cheap, and recycled plastic earns less. Cash flow is tight in the first year. You are also competing with informal exporters who pay no tax. The businesses that survive are the ones that build trust with end-buyers, keep their sorting strict, and treat their workers fairly enough that they keep coming back.",
                  "តម្លៃដុំបាលប្រែប្រួលតាមទីផ្សារប្រេងពិភពលោក — នៅពេលប្រេងថោក ប្លាស្ទិកដើមថោក ហើយប្លាស្ទិកកែច្នៃរកបានតិចជាង។ លំហូរសាច់ប្រាក់តឹងតែងក្នុងឆ្នាំទីមួយ។ អ្នកក៏ប្រកួតប្រជែងនឹងអ្នកនាំចេញមិនផ្លូវការដែលមិនបង់ពន្ធ។ អាជីវកម្មដែលរស់រាន គឺអ្នកដែលកសាងទំនុកចិត្តជាមួយអ្នកទិញចុងក្រោយ រក្សាការតម្រៀបយ៉ាងតឹងរ៉ឹង និងប្រព្រឹត្តទៅលើកម្មកររបស់ពួកគេឲ្យបានយុត្តិធម៌ ដើម្បីឲ្យពួកគេបន្តមកធ្វើការ។",
                )}
              </p>
            </div>
          </div>
        </BlueprintCard>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/science/materials"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-sm font-bold shadow hover:opacity-90 transition-opacity font-mono uppercase tracking-wider ${k ? "font-khmer normal-case tracking-normal" : ""}`}
          style={{ backgroundColor: STEEL_DEEP }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Materials Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រសម្ភារៈ")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks
// ════════════════════════════════════════════════════════════════════════════

type Accent = "green" | "blue" | "steel";

function BlueprintCard({
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
    accent === "blue" ? GLASS_BLUE_DEEP : accent === "green" ? ECO_GREEN_DEEP : STEEL_DEEP;
  const accentBg =
    accent === "blue" ? GLASS_BLUE_LIGHT : accent === "green" ? ECO_GREEN_LIGHT : STEEL_LIGHT;
  const accentBorder = accent === "blue" ? GLASS_BLUE : accent === "green" ? ECO_GREEN : STEEL;

  return (
    <article
      className="relative rounded-2xl p-6 sm:p-8"
      style={{
        ...CARD_BG,
        border: `1px solid ${accentBorder}55`,
        boxShadow: `0 1px 0 ${accentBorder}11, 0 22px 50px -25px ${accentBorder}44`,
      }}
    >
      {/* corner marks */}
      <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: accentBorder }} />
      <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: accentBorder }} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: accentBorder }} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: accentBorder }} />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-md"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-[11px] font-bold tracking-widest uppercase font-mono ${k ? "font-khmer tracking-normal normal-case" : ""}`}
          style={{ color: accentColor }}
        >
          {k ? tagKh : tagEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl mb-5 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: STEEL_DEEP }}
      >
        {k ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function StatTile({
  big,
  labelEn,
  labelKh,
  color,
  k,
}: {
  big: string;
  labelEn: string;
  labelKh: string;
  color: string;
  k: boolean;
}) {
  return (
    <div
      className="rounded-xl p-3 text-center"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}33` }}
    >
      <div className="font-display font-bold text-2xl sm:text-3xl" style={{ color }}>
        {big}
      </div>
      <div className={`text-[11px] mt-1 text-slate-600 ${k ? "font-khmer" : ""}`}>
        {k ? labelKh : labelEn}
      </div>
    </div>
  );
}

function MaterialRow({
  k,
  icon,
  nameEn,
  nameKh,
  pct,
  color,
  tagEn,
  tagKh,
  bodyEn,
  bodyKh,
}: {
  k: boolean;
  icon: React.ReactNode;
  nameEn: string;
  nameKh: string;
  pct: number;
  color: string;
  tagEn: string;
  tagKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}33` }}
      data-testid={`material-row-${nameEn.toLowerCase().split(" ")[0]}`}
    >
      <div className="grid sm:grid-cols-[150px,1fr,80px] items-center gap-3 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="inline-flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0"
            style={{ backgroundColor: color + "1a", color }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <div className={`font-bold text-sm ${k ? "font-khmer" : ""}`} style={{ color }}>
              {k ? nameKh : nameEn}
            </div>
            <div className={`text-[11px] text-slate-500 ${k ? "font-khmer" : ""}`}>
              {k ? tagKh : tagEn}
            </div>
          </div>
        </div>

        <div className="relative h-5 rounded-full overflow-hidden" style={{ backgroundColor: "#f1f5f9" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${color}aa 0%, ${color} 100%)`,
            }}
            aria-hidden="true"
          />
          <span
            className="absolute inset-y-0 right-2 flex items-center text-[10px] font-mono font-bold text-white drop-shadow"
            aria-hidden="true"
          >
            {pct}%
          </span>
        </div>

        <div
          className="hidden sm:block text-right text-2xl font-display font-bold"
          style={{ color }}
        >
          {pct}%
        </div>
      </div>
      <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function FactBox({
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  k,
  children,
}: {
  icon: LucideIcon;
  accent: Accent;
  titleEn: string;
  titleKh: string;
  k: boolean;
  children: React.ReactNode;
}) {
  const color = accent === "blue" ? GLASS_BLUE_DEEP : accent === "green" ? ECO_GREEN_DEEP : STEEL_DEEP;
  const bg = accent === "blue" ? GLASS_BLUE_LIGHT : accent === "green" ? ECO_GREEN_LIGHT : STEEL_LIGHT;
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}33` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-7 h-7 rounded-md"
          style={{ backgroundColor: bg, color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? titleKh : titleEn}
        </h4>
      </div>
      <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {children}
      </p>
    </div>
  );
}

function ChainFlow({ k }: { k: boolean }) {
  const Step = ({
    icon: Icon,
    en,
    kh,
    color,
    bg,
  }: {
    icon: LucideIcon;
    en: string;
    kh: string;
    color: string;
    bg: string;
  }) => (
    <div
      className="rounded-xl px-3 py-3 flex items-center gap-2 min-w-0"
      style={{ backgroundColor: bg, border: `1px solid ${color}55` }}
    >
      <div
        className="inline-flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0"
        style={{ backgroundColor: "#ffffff", color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-xs sm:text-sm font-semibold ${k ? "font-khmer" : ""}`} style={{ color }}>
        {k ? kh : en}
      </span>
    </div>
  );
  const arrow = (
    <ArrowRight
      className="w-4 h-4 flex-shrink-0 mx-1 hidden sm:block"
      style={{ color: STEEL }}
      aria-hidden="true"
    />
  );
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${STEEL}33` }}
      data-testid="chain-flow"
    >
      <div className="grid sm:flex sm:items-stretch gap-2 sm:gap-1">
        <Step icon={Users} en="Edjai pickers" kh="អ្នករើសអេតចាយ" color={GLASS_BLUE_DEEP} bg={GLASS_BLUE_LIGHT + "55"} />
        {arrow}
        <Step icon={Wallet} en="Local depot" kh="ឃ្លាំងមូលដ្ឋាន" color={ECO_GREEN_DEEP} bg={ECO_GREEN_LIGHT + "55"} />
        {arrow}
        <Step icon={Boxes} en="Sort & bale" kh="តម្រៀប & បង្ហាប់ជាដុំ" color={STEEL_DEEP} bg={STEEL_LIGHT + "66"} />
        {arrow}
        <Step icon={Globe} en="Export to smelter" kh="នាំចេញទៅឡរលាយ" color={COPPER} bg="#fff7ed" />
      </div>
    </div>
  );
}

function BusinessStep({
  n,
  icon: Icon,
  color,
  bg,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  checklistEn,
  checklistKh,
  k,
}: {
  n: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  checklistEn: string[];
  checklistKh: string[];
  k: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 mb-4"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}44` }}
      data-testid={`business-step-${n}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-display font-bold text-lg"
          style={{ backgroundColor: bg + "55", color }}
        >
          {n}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} aria-hidden="true" />
          <h3 className={`font-bold text-base sm:text-lg ${k ? "font-khmer" : ""}`} style={{ color }}>
            {k ? titleKh : titleEn}
          </h3>
        </div>
      </div>

      <p className={`mb-4 text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? bodyKh : bodyEn}
      </p>

      <div className="grid sm:grid-cols-2 gap-2">
        {(k ? checklistKh : checklistEn).map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-lg px-3 py-2"
            style={{ backgroundColor: bg + "44", border: `1px solid ${color}22` }}
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
            <span className={`text-xs ${k ? "font-khmer" : ""}`} style={{ color: STEEL_DEEP }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tiny material glyphs (industrial line icons) ──────────────────────────

function AluminumGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      {/* can */}
      <rect x="6" y="4" width="12" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SteelGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      {/* I-beam */}
      <rect x="4" y="4" width="16" height="3" fill="currentColor" />
      <rect x="4" y="17" width="16" height="3" fill="currentColor" />
      <rect x="10" y="7" width="4" height="10" fill="currentColor" />
    </svg>
  );
}

function GlassGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      {/* bottle */}
      <path
        d="M10 3 h4 v4 c2 1 2 4 2 5 v9 a1 1 0 0 1 -1 1 h-6 a1 1 0 0 1 -1 -1 v-9 c0 -1 0 -4 2 -5 z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PlasticGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      {/* PET bottle silhouette + recycle triangle */}
      <path
        d="M11 3 h2 v3 l1 1 v3 c1 0.5 1 2 1 3 v8 a1 1 0 0 1 -1 1 h-4 a1 1 0 0 1 -1 -1 v-8 c0 -1 0 -2.5 1 -3 v-3 l1 -1 z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="12" y="18" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        1
      </text>
    </svg>
  );
}
