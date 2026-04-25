import { Link } from "wouter";
import {
  ArrowLeft,
  Flame,
  Zap,
  Droplet,
  Wrench,
  Cog,
  Sparkles,
  Atom,
  Layers,
  Ruler,
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Hammer,
  Sparkle,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-TECH-WELDING · Welding: The Science of Fusion
//                    ការផ្សារដែក៖ វិទ្យាសាស្ត្រនៃការរំលាយបញ្ចូលគ្នា
//
//  Sub-module under /technology.
//
//  Four cards:
//    1. How Welding Works — fusion vs gluing; atomic interlock on cooling
//    2. The Welding Torch & Gases — oxy-acetylene + arc + shielding gases
//    3. The Metals — steel, aluminum, stainless steel
//    4. How to Weld — preparation, the puddle, the filler rod
//
//  Aesthetic: dark steel backgrounds, glowing amber accents, blueprint grids.
//  High-contrast, industrial.
// ════════════════════════════════════════════════════════════════════════════

const AMBER = "#f59e0b";          // amber-500
const AMBER_BRIGHT = "#fbbf24";   // amber-400
const AMBER_HOT = "#fb923c";      // orange-400 (hotter end of the spark)
const AMBER_GLOW = "#fde68a";     // amber-200
const AMBER_PALE = "#fffbeb";     // amber-50

const STEEL_DARK = "#0f172a";     // slate-900
const STEEL_DEEP = "#0b1220";
const STEEL = "#334155";          // slate-700
const STEEL_MID = "#64748b";      // slate-500
const STEEL_LIGHT = "#cbd5e1";    // slate-300
const STEEL_PALE = "#e2e8f0";     // slate-200

const BLUEPRINT_LINE = "rgba(245, 158, 11, 0.16)";

const PAGE_BG: React.CSSProperties = {
  background:
    `radial-gradient(900px 500px at 90% -10%, rgba(245, 158, 11, 0.18), transparent 70%), ` +
    `radial-gradient(800px 500px at 0% 110%, rgba(15, 23, 42, 0.55), transparent 70%), ` +
    `linear-gradient(180deg, ${STEEL_DARK} 0%, #111c2e 60%, ${STEEL_DARK} 100%)`,
};

const BLUEPRINT_PANEL: React.CSSProperties = {
  backgroundColor: STEEL_DEEP,
  backgroundImage:
    `linear-gradient(${BLUEPRINT_LINE} 1px, transparent 1px), ` +
    `linear-gradient(90deg, ${BLUEPRINT_LINE} 1px, transparent 1px)`,
  backgroundSize: "28px 28px, 28px 28px",
};

export default function WeldingSciencePage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-100" style={PAGE_BG}>
      {/* ── Top: back link ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: AMBER_BRIGHT }}
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
            background: "rgba(245, 158, 11, 0.12)",
            border: `1px solid ${AMBER}55`,
            color: AMBER_BRIGHT,
          }}
        >
          <Flame className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Technology · Welding & Metallurgy", "បច្ចេកវិទ្យា · ការផ្សារដែក និងលោហធាតុ")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight text-white ${k ? "font-khmer leading-loose" : ""}`}
        >
          {k ? (
            <>
              ការផ្សារដែក៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${AMBER_BRIGHT}, ${AMBER_HOT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                វិទ្យាសាស្ត្រនៃការរំលាយបញ្ចូលគ្នា
              </span>
            </>
          ) : (
            <>
              Welding:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${AMBER_BRIGHT}, ${AMBER_HOT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The Science of Fusion
              </span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-300 max-w-3xl text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "Welding is not glue. It is controlled fire — temperatures hotter than a volcano — used to melt two pieces of metal until their atoms forget where one ends and the other begins. Crack open the torch, learn why a single bubble of oxygen can ruin a joint, and walk through the four stages of every clean weld.",
            "ការផ្សារមិនមែនជាការបិទកាវទេ។ វាជាភ្លើងដែលគ្រប់គ្រងបាន — សីតុណ្ហភាពក្ដៅជាងភ្នំភ្លើង — ប្រើដើម្បីរំលាយលោហៈពីរបំណែកឱ្យអាតូមរបស់វាភ្លេចថាមួយណាបញ្ចប់ និងមួយណាចាប់ផ្ដើម។ បើកមើលក្បាលផ្សារ រៀនមូលហេតុដែលពពុះអុកស៊ីហ្សែនតែមួយអាចបំផ្លាញការតភ្ជាប់បាន និងដើរតាមដំណាក់កាលទាំងបួននៃការផ្សារស្អាតៗនីមួយៗ។",
          )}
        </p>

        {/* Three quick stat tiles */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatTile
            icon={Flame}
            valueEn=">3,000 °C"
            valueKh=">៣,០០០ °C"
            descEn="Oxy-acetylene flame temperature"
            descKh="សីតុណ្ហភាពអណ្ដាតភ្លើងអុកស៊ី-អាសេទីឡែន"
          />
          <StatTile
            icon={Zap}
            valueEn="≈10,000 °C"
            valueKh="≈១០,០០០ °C"
            descEn="Inside an electric welding arc"
            descKh="នៅខាងក្នុងធ្នូផ្សារអគ្គិសនី"
          />
          <StatTile
            icon={Atom}
            valueEn="1 piece"
            valueKh="១ បំណែក"
            descEn="Two metals → atomic fusion → one"
            descKh="លោហៈពីរ → ការរំលាយអាតូម → តែមួយ"
          />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · How Welding Works
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-fusion"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 01 · The concept"
          tagKh="កាត ០១ · គំនិត"
          icon={Atom}
          titleEn="How Welding Works"
          titleKh="របៀបដែលការផ្សារដំណើរការ"
          k={k}
        >
          <p className={`text-slate-200 mb-5 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Most beginners think welding is a kind of metal glue — that the welder squirts something between two pieces and they stick. ",
              "អ្នកចាប់ផ្ដើមភាគច្រើនគិតថាការផ្សារគឺជាប្រភេទកាវលោហៈ — ថាអ្នកផ្សារបាញ់អ្វីមួយរវាងលោហៈពីរបំណែក ហើយវាជាប់គ្នា។ ",
            )}
            <strong style={{ color: AMBER_BRIGHT }}>
              {t("That is not what is happening. ", "នោះមិនមែនជាអ្វីដែលកំពុងកើតឡើងទេ។ ")}
            </strong>
            {t(
              "Welding is the use of extreme heat to melt the two base metals themselves until they flow into each other and become a single, continuous piece.",
              "ការផ្សារគឺជាការប្រើកម្ដៅខ្លាំងដើម្បីរំលាយលោហៈគោលទាំងពីរ ឱ្យហូរចូលគ្នា និងក្លាយជាបំណែកតែមួយដ៏បន្ត។",
            )}
          </p>

          {/* ── Atomic-fusion diagram ── */}
          <h3
            className={`text-sm font-bold mt-5 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: AMBER_BRIGHT }}
          >
            {t("The Science: Atomic Interlock", "វិទ្យាសាស្ត្រ៖ ការភ្ជាប់អាតូម")}
          </h3>

          <div
            className="rounded-2xl p-5 sm:p-6 mb-5 overflow-hidden"
            style={BLUEPRINT_PANEL}
            data-testid="fusion-diagram"
          >
            <FusionDiagram k={k} />
            <p
              className={`text-slate-300 text-xs mt-4 max-w-2xl mx-auto text-center ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Two separate metal pieces (left & right) are heated until they melt at the joint. As the molten pool cools, atoms from both sides migrate across the boundary and lock into a shared crystal structure. The original line between them disappears.",
                "លោហៈពីរបំណែកដាច់ដោយឡែក (ឆ្វេង និងស្ដាំ) ត្រូវកម្ដៅរហូតដល់រលាយនៅចំណុចតភ្ជាប់។ នៅពេលក្លាសរលាយត្រជាក់ អាតូមពីភាគីទាំងពីរផ្លាស់ទីឆ្លងព្រំដែន និងភ្ជាប់ចូលគ្នាក្នុងរចនាសម្ព័ន្ធគ្រីស្តាល់រួម។ បន្ទាត់ដើមរវាងវាបាត់ទៅ។",
              )}
            </p>
          </div>

          <Callout color={AMBER} bg="rgba(245, 158, 11, 0.12)" border={`${AMBER}55`} icon={Sparkles} dark>
            <strong>
              {t(
                "A good weld is often stronger than the parent metal. ",
                "ការផ្សារល្អជារឿយៗមាំជាងលោហៈដើម។ ",
              )}
            </strong>
            {t(
              "When a steel beam fails under load, it almost never breaks at the weld — it breaks beside it. The slow cooling that follows fusion forces the atoms to settle into a denser, more uniform crystal lattice than the rolled steel that came from the factory.",
              "នៅពេលធ្នឹមដែករបូតក្រោមបន្ទុក វាស្ទើរតែមិនដែលបាក់នៅចំណុចផ្សារ — វាបាក់នៅជាប់នឹងវា។ ការត្រជាក់យឺតបន្ទាប់ពីការរំលាយ បង្ខំឱ្យអាតូមតាំងទីក្នុងបណ្ដាញគ្រីស្តាល់ដែលក្រាស់ និងស្មើជាងដែករបារដែលបានមកពីរោងចក្រ។",
            )}
          </Callout>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · The Welding Torch & Gases
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-torch-gases"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 02 · The heat source"
          tagKh="កាត ០២ · ប្រភពកម្ដៅ"
          icon={Flame}
          titleEn="The Welding Torch & Gases"
          titleKh="ក្បាលផ្សារ និងឧស្ម័ន"
          k={k}
        >
          <p className={`text-slate-200 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "There are two great families of welding heat: a ",
              "មានគ្រួសារកម្ដៅផ្សារពីរធំ ៖ ",
            )}
            <strong style={{ color: AMBER_BRIGHT }}>{t("chemical flame", "អណ្ដាតភ្លើងគីមី")}</strong>
            {t(" from burning gases, and an ", " ពីការដុតឧស្ម័ន និង ")}
            <strong style={{ color: AMBER_BRIGHT }}>{t("electric arc", "ធ្នូអគ្គិសនី")}</strong>
            {t(
              " from a controlled lightning bolt. Both melt steel — but they get there in completely different ways.",
              " ពីរន្ទះអគ្គិសនីដែលគ្រប់គ្រងបាន។ ទាំងពីរនេះរំលាយដែក — ប៉ុន្តែវាទៅដល់ទីនោះតាមរបៀបខុសគ្នាទាំងស្រុង។",
            )}
          </p>

          {/* ── Oxy-Acetylene ── */}
          <SubCard
            icon={Flame}
            titleEn="Oxy-Acetylene"
            titleKh="អុកស៊ី-អាសេទីឡែន"
            tone="amber"
            k={k}
          >
            <p className={`text-slate-200 text-sm mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A gas torch mixes two gases stored in separate steel cylinders: ",
                "ក្បាលផ្សារឧស្ម័នលាយឧស្ម័នពីរ ដែលរក្សាទុកក្នុងធុងដែកដាច់ដោយឡែក ៖ ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("oxygen ", "អុកស៊ីហ្សែន ")}</strong>
              {t("and ", "និង ")}
              <strong style={{ color: AMBER_BRIGHT }}>{t("acetylene", "អាសេទីឡែន")}</strong>
              {t(
                ". When mixed and lit at the tip, they burn so violently that the inner flame cone reaches over ",
                "។ នៅពេលលាយ និងបញ្ឆេះនៅចុង ពួកវាឆេះយ៉ាងខ្លាំងរហូតដល់សាជីភ្លើងខាងក្នុងមានសីតុណ្ហភាពលើស ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("3,000 °C", "៣,០០០ អង្សាសេ")}</strong>
              {t(
                " — hotter than a volcano, hot enough to melt almost any metal humans can refine.",
                " — ក្ដៅជាងភ្នំភ្លើង ក្ដៅគ្រប់គ្រាន់ដើម្បីរំលាយលោហៈស្ទើរតែទាំងអស់ដែលមនុស្សអាចចម្រាញ់បាន។",
              )}
            </p>
            <div className="rounded-xl p-4 sm:p-5 overflow-hidden" style={BLUEPRINT_PANEL} data-testid="oxy-flame-diagram">
              <OxyAcetyleneDiagram k={k} />
            </div>
          </SubCard>

          <div className="h-4" aria-hidden="true" />

          {/* ── Arc + Shielding gas ── */}
          <SubCard
            icon={Zap}
            titleEn="Arc Welding & Shielding Gas"
            titleKh="ការផ្សារធ្នូ និងឧស្ម័នការពារ"
            tone="amber"
            k={k}
          >
            <p className={`text-slate-200 text-sm mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Electric welding skips the flame entirely. A power supply pushes a strong current — typically 50 to 300 amps at low voltage — through an electrode held a couple of millimetres from the metal, and the air between them ionises into a screaming blue-white ",
                "ការផ្សារអគ្គិសនីរំលងអណ្ដាតភ្លើងទាំងស្រុង។ ប្រភពថាមពលរុញចរន្តខ្លាំង — ជាធម្មតា ៥០ ទៅ ៣០០ អំពែនៅវ៉ុលទាប — ឆ្លងកាត់អេឡិចត្រូដដែលកាន់ចម្ងាយប៉ុន្មានមីលីម៉ែត្រពីលោហៈ ហើយខ្យល់រវាងវាប្រែទៅជាអ៊ីយ៉ុងទៅជា ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("arc", "ធ្នូ")}</strong>
              {t(
                " hotter than the surface of the Sun. That arc instantly melts the steel beneath it.",
                " ពណ៌ខៀវ-ស ដែលក្ដៅជាងផ្ទៃព្រះអាទិត្យ។ ធ្នូនោះរំលាយដែកនៅខាងក្រោមភ្លាមៗ។",
              )}
            </p>
            <div className="rounded-xl p-4 sm:p-5 overflow-hidden" style={BLUEPRINT_PANEL} data-testid="arc-diagram">
              <ArcWeldDiagram k={k} />
            </div>

            <h4
              className={`text-xs font-bold mt-5 mb-2 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
              style={{ color: AMBER_BRIGHT }}
            >
              {t("Why we need shielding gas", "ហេតុអ្វីយើងត្រូវការឧស្ម័នការពារ")}
            </h4>
            <p className={`text-slate-200 text-sm mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Air is mostly nitrogen and oxygen. The moment hot liquid steel meets oxygen, the oxygen rips electrons off the iron atoms and forms iron oxide — rust — right inside the joint. Bubbles of gas form in the cooling pool, leaving behind ",
                "ខ្យល់ភាគច្រើនជាអាសូត និងអុកស៊ីហ្សែន។ នៅពេលដែកស៊ីដ៏ក្ដៅជួបអុកស៊ីហ្សែន អុកស៊ីហ្សែននឹងដកអេឡិចត្រុងពីអាតូមដែក និងបង្កើតជាដែកអុកស៊ីដ — ច្រេះ — ត្រង់ខាងក្នុងចំណុចតភ្ជាប់។ ពពុះឧស្ម័នបង្កើតក្នុងក្លាសត្រជាក់ បន្សល់ទុក ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>
                {t("brittle, weak, swiss-cheese metal.", "លោហៈផុយ ខ្សោយ ដូចឈីស។")}
              </strong>
              {t(" This destructive process is called ", " ដំណើរការបំផ្លិចបំផ្លាញនេះត្រូវបានគេហៅថា ")}
              <strong style={{ color: AMBER_BRIGHT }}>{t("oxidation.", "អុកស៊ីដឡាស្យុង។")}</strong>
            </p>

            <p className={`text-slate-200 text-sm mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "The fix is simple and elegant: a separate cylinder of ",
                "ដំណោះស្រាយគឺសាមញ្ញ និងគួរឱ្យកោតសរសើរ ៖ ធុងដាច់ដោយឡែកនៃ ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("shielding gas", "ឧស្ម័នការពារ")}</strong>
              {t(
                " flows out of the welding nozzle right next to the arc and blankets the molten pool, physically pushing the air away long enough for the metal to solidify clean. ",
                " ហូរចេញពីឆ្នូតក្បាលផ្សារត្រង់ជាប់នឹងធ្នូ និងគ្របលើក្លាសរលាយ ច្រានខ្យល់ចេញដោយរូបវិទ្យារយៈពេលគ្រប់គ្រាន់ ដើម្បីឱ្យលោហៈរឹងស្អាត។ ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("Argon", "Argon")}</strong>
              {t(
                " is a true noble gas — it does not react with the steel at all. ",
                " គឺជាឧស្ម័ននិចលពិតប្រាកដ — វាមិនប្រតិកម្មនឹងដែកទាល់តែសោះ។ ",
              )}
              <strong style={{ color: AMBER_BRIGHT }}>{t("CO₂", "CO₂")}</strong>
              {t(
                " is cheaper but slightly reactive: it does interact with the molten pool, but it still keeps oxygen out and gives a deep, strong weld. Many shops use a mix of the two.",
                " ថោកជាង ប៉ុន្តែមានប្រតិកម្មបន្តិច ៖ វាប្រាស្រ័យជាមួយក្លាសរលាយមែន ប៉ុន្តែវានៅតែការពារអុកស៊ីហ្សែនមិនឱ្យចូល និងផ្ដល់នូវការផ្សារជ្រៅ និងមាំ។ ហាងជាច្រើនប្រើល្បាយនៃទាំងពីរ។",
              )}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-5" data-testid="shielding-comparison">
              <ShieldingPanel
                tone="bad"
                titleEn="Without shielding gas"
                titleKh="គ្មានឧស្ម័នការពារ"
                k={k}
                items={[
                  { en: "Air rushes into the molten puddle", kh: "ខ្យល់ហូរចូលក្លាសរលាយ" },
                  { en: "Oxygen reacts with hot iron → iron oxide", kh: "អុកស៊ីហ្សែនប្រតិកម្មនឹងដែកក្ដៅ → ដែកអុកស៊ីដ" },
                  { en: "Gas bubbles trapped → porous, weak weld", kh: "ពពុះឧស្ម័នជាប់ → ការផ្សារប្រហោង និងខ្សោយ" },
                  { en: "Joint can crack under load", kh: "ចំណុចតភ្ជាប់អាចបាក់ក្រោមបន្ទុក" },
                ]}
              />
              <ShieldingPanel
                tone="good"
                titleEn="With Argon / CO₂ shield"
                titleKh="មាន Argon / CO₂ ការពារ"
                k={k}
                items={[
                  { en: "Shielding gas blankets the puddle", kh: "ឧស្ម័នការពារគ្របលើក្លាស" },
                  { en: "Air is physically pushed away", kh: "ខ្យល់ត្រូវច្រានចេញដោយរូបវិទ្យា" },
                  { en: "No oxidation → solid, dense weld", kh: "គ្មានអុកស៊ីដឡាស្យុង → ការផ្សាររឹង និងក្រាស់" },
                  { en: "Stronger than the parent metal", kh: "មាំជាងលោហៈដើម" },
                ]}
              />
            </div>
          </SubCard>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · The Metals
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-metals"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <Card
          tagEn="Card 03 · The materials"
          tagKh="កាត ០៣ · សម្ភារៈ"
          icon={Layers}
          titleEn="The Metals"
          titleKh="ប្រភេទលោហៈ"
          k={k}
        >
          <p className={`text-slate-200 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Not all metals weld the same way. Each material has its own melting point, its own way of moving heat, and its own surface chemistry. A welder must read the metal first.",
              "លោហៈមិនមែនទាំងអស់ផ្សារដូចគ្នាទេ។ សម្ភារៈនីមួយៗមានចំណុចរលាយផ្ទាល់ខ្លួន មានរបៀបផ្ទាល់ខ្លួនក្នុងការផ្លាស់កម្ដៅ និងមានគីមីផ្ទៃផ្ទាល់ខ្លួន។ អ្នកផ្សារត្រូវអានលោហៈមុនគេ។",
            )}
          </p>

          <div className="grid sm:grid-cols-3 gap-4" data-testid="metals-grid">
            <MetalCard
              icon={Hammer}
              tone="amber"
              titleEn="Steel"
              titleKh="ដែក"
              meltEn="≈ 1,500 °C"
              meltKh="≈ ១,៥០០ °C"
              difficultyEn="Beginner-friendly"
              difficultyKh="ងាយសម្រាប់អ្នកចាប់ផ្ដើម"
              descEn="The most common metal welded in the world. Strong, abundant, cheap, and forgiving — it stays hot long enough for a beginner to build a clean puddle. The backbone of bridges, cars, ships and skyscrapers."
              descKh="លោហៈដែលផ្សារច្រើនបំផុតនៅលើពិភពលោក។ មាំ មានច្រើន ថោក និងអត់ឱន — វានៅក្ដៅយូរគ្រប់គ្រាន់សម្រាប់អ្នកចាប់ផ្ដើមបង្កើតក្លាសស្អាត។ ឆ្អឹងខ្នងរបស់ស្ពាន រថយន្ត នាវា និងអាគារខ្ពស់ៗ។"
              k={k}
            />
            <MetalCard
              icon={Wind}
              tone="steel"
              titleEn="Aluminum"
              titleKh="អាលុយមីញ៉ូម"
              meltEn="≈ 660 °C"
              meltKh="≈ ៦៦០ °C"
              difficultyEn="Difficult"
              difficultyKh="ពិបាក"
              descEn="Much harder to weld than steel. Aluminum conducts heat away from the joint about 4× faster than steel — so the puddle escapes you. It also melts at a lower temperature, giving you almost no warning before a hole burns straight through."
              descKh="ផ្សារពិបាកជាងដែកច្រើន។ អាលុយមីញ៉ូមផ្ទេរកម្ដៅចេញពីចំណុចតភ្ជាប់លឿនជាងដែកប្រហែល ៤ ដង — ដូច្នេះក្លាសរត់គេចពីអ្នក។ វាក៏រលាយនៅសីតុណ្ហភាពទាបជាង ផ្ដល់ឱ្យអ្នកស្ទើរគ្មានការព្រមានមុនពេលរន្ធឆេះកាត់ឡើយ។"
              k={k}
            />
            <MetalCard
              icon={ShieldAlert}
              tone="amber"
              titleEn="Stainless Steel"
              titleKh="ដែកអ៊ីណុក"
              meltEn="≈ 1,400 °C"
              meltKh="≈ ១,៤០០ °C"
              difficultyEn="Specialised"
              difficultyKh="ឯកទេស"
              descEn="What makes it stainless is a thin invisible layer of chromium oxide that regrows whenever the surface is scratched. Welding burns that layer off and changes the metal's structure nearby, so it can rust where it once couldn't. Specialised gas mixes (often pure Argon) and slow cooling are required to keep the rust-resistance intact."
              descKh="អ្វីដែលធ្វើឱ្យវាមិនច្រេះ គឺស្រទាប់ស្ដើងមើលមិនឃើញនៃក្រូមអុកស៊ីដ ដែលដុះឡើងវិញរាល់ពេលផ្ទៃត្រូវកោស។ ការផ្សារដុតស្រទាប់នោះចេញ និងផ្លាស់ប្ដូររចនាសម្ព័ន្ធលោហៈនៅជិត ដូច្នេះវាអាចច្រេះនៅកន្លែងដែលធ្លាប់មិនអាច។ ល្បាយឧស្ម័នឯកទេស (ជារឿយៗគឺ Argon សុទ្ធ) និងការត្រជាក់យឺតៗ ត្រូវបានទាមទារ ដើម្បីរក្សាគុណភាពធន់នឹងការច្រេះ។"
              k={k}
            />
          </div>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 4 · How to Weld
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-how-to-weld"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <Card
          tagEn="Card 04 · The technique"
          tagKh="កាត ០៤ · បច្ចេកទេស"
          icon={Wrench}
          titleEn="How to Weld"
          titleKh="របៀបផ្សារ"
          k={k}
        >
          <p className={`text-slate-200 mb-6 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Every clean weld is built in two acts: the part you do before the torch is lit, and the part you do once the metal turns liquid. Old welders say the first act is the harder one.",
              "ការផ្សារស្អាតៗនីមួយៗត្រូវបានសាងសង់ក្នុងសកម្មភាពពីរ ៖ ផ្នែកដែលអ្នកធ្វើមុនពេលក្បាលផ្សារត្រូវបាញ់ភ្លើង និងផ្នែកដែលអ្នកធ្វើនៅពេលលោហៈប្រែជារាវ។ អ្នកផ្សារចាស់ៗនិយាយថា សកម្មភាពទីមួយគឺពិបាកជាង។",
            )}
          </p>

          {/* ── Preparation ── */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: AMBER_BRIGHT }}
          >
            {t("Step 1 · Preparation", "ជំហាន ១ · ការរៀបចំ")}
          </h3>

          <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(245, 158, 11, 0.08)", border: `1px dashed ${AMBER}55` }}>
            <p className={`text-slate-200 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong style={{ color: AMBER_BRIGHT }}>
                {t("Cleaning the metal is 90% of the work. ", "ការសម្អាតលោហៈគឺ ៩០% នៃការងារ។ ")}
              </strong>
              {t(
                "Rust, paint, oil, water, even fingerprints — every contaminant becomes gas the moment the arc strikes, and every gas bubble becomes a weak spot. The welder grinds, brushes, and degreases until raw, bright steel is exposed.",
                "ច្រេះ ថ្នាំ ប្រេង ទឹក សូម្បីតែស្នាមម្រាមដៃ — សារធាតុបំពុលនីមួយៗប្រែទៅជាឧស្ម័ននៅពេលធ្នូបាញ់ ហើយពពុះឧស្ម័ននីមួយៗប្រែទៅជាចំណុចខ្សោយ។ អ្នកផ្សារកិន ដុស និងសម្អាតប្រេងរហូតដល់ដែករឹងស្អាត ភ្លឺ ត្រូវបានបង្ហាញ។",
              )}
            </p>
            <div className="mt-4 rounded-md px-4 py-3 text-slate-300" style={{ background: "rgba(15, 23, 42, 0.6)", border: `1px solid ${STEEL_MID}` }}>
              <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <span className="font-bold" style={{ color: AMBER_BRIGHT }}>
                  {t("The map is not the territory. ", "ផែនទីមិនមែនជាដី។ ")}
                </span>
                {t(
                  "What you see on the surface — the orange of rust, the colour of paint, the grease — is only a picture sitting on top of the real metal. You cannot fuse two pictures together. You must scrape away the map until the territory itself is exposed.",
                  "អ្វីដែលអ្នកឃើញនៅផ្ទៃ — ពណ៌ទឹកក្រូចនៃច្រេះ ពណ៌នៃថ្នាំ ប្រេង — គ្រាន់តែជារូបភាពអង្គុយលើលោហៈពិតប៉ុណ្ណោះ។ អ្នកមិនអាចរំលាយរូបភាពពីរបញ្ចូលគ្នាបានទេ។ អ្នកត្រូវកោសផែនទីចេញ រហូតដល់ដីខ្លួនវាត្រូវបានបង្ហាញ។",
                )}
              </p>
            </div>
          </div>

          {/* ── The Pool ── */}
          <h3
            className={`text-sm font-bold mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: AMBER_BRIGHT }}
          >
            {t("Step 2 · The Puddle", "ជំហាន ២ · ក្លាស")}
          </h3>

          <p className={`text-slate-200 mb-4 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Once the heat is on, the welder watches a tiny silver pond appear at the joint. This is the ",
              "នៅពេលដែលកម្ដៅបើក អ្នកផ្សារមើលអាងតូចពណ៌ប្រាក់មួយលេចចេញនៅចំណុចតភ្ជាប់។ នេះគឺជា ",
            )}
            <strong style={{ color: AMBER_BRIGHT }}>
              {t("weld puddle", "ក្លាសផ្សារ")}
            </strong>
            {t(
              " — a few drops of liquid steel from both base pieces, mixing together. The torch is moved slowly along the seam, the puddle traveling with it, leaving solid metal in its wake. A separate ",
              " — ដំណក់ដែករាវពីរីបីពីលោហៈគោលទាំងពីរ លាយចូលគ្នា។ ក្បាលផ្សារត្រូវបានផ្លាស់ទីយឺតៗតាមបន្ទាត់តភ្ជាប់ ក្លាសធ្វើដំណើរជាមួយវា បន្សល់ទុកលោហៈរឹងនៅពីក្រោយ។ ",
            )}
            <strong style={{ color: AMBER_BRIGHT }}>{t("filler rod", "ដំបងបំពេញ")}</strong>
            {t(
              " — a thin wire of metal compatible with the base — is dipped into the puddle to add material, like adding water to a small pond so it overflows the gap and joins both banks.",
              " ដែលជាខ្សែស្ដើងនៃលោហៈឆបនឹងគោល — ត្រូវបានជ្រលក់ចូលក្លាសដើម្បីបន្ថែមសម្ភារៈ ដូចជាការបន្ថែមទឹកដាក់អាងតូច ដើម្បីឱ្យវាហូរហៀរលើគម្លាត និងភ្ជាប់ច្រាំងទាំងពីរ។",
            )}
          </p>

          <div
            className="rounded-2xl p-5 sm:p-6 overflow-hidden"
            style={BLUEPRINT_PANEL}
            data-testid="puddle-diagram"
          >
            <PuddleDiagram k={k} />
          </div>

          {/* ── Process steps ── */}
          <h3
            className={`text-sm font-bold mt-7 mb-3 uppercase tracking-widest ${k ? "font-khmer tracking-normal normal-case" : ""}`}
            style={{ color: AMBER_BRIGHT }}
          >
            {t("The four-stage cycle", "វដ្តដំណាក់កាលទាំងបួន")}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="weld-steps-grid">
            <StepTile
              n="1"
              icon={Sparkle}
              en="Clean"
              kh="សម្អាត"
              descEn="Grind, brush, degrease until raw bright metal is exposed."
              descKh="កិន ដុស សម្អាតប្រេង រហូតដល់លោហៈរឹងភ្លឺត្រូវបានបង្ហាញ។"
            />
            <StepTile
              n="2"
              icon={Eye}
              en="Set up"
              kh="រៀបចំ"
              descEn="Clamp the joint, set gas flow & current, pull on shield + gloves."
              descKh="ចាប់ភ្ជាប់ចំណុចតភ្ជាប់ កំណត់លំហូរឧស្ម័ន និងចរន្ត ស្លៀកមួក និងស្រោមដៃ។"
            />
            <StepTile
              n="3"
              icon={Droplet}
              en="Run the puddle"
              kh="រត់ក្លាស"
              descEn="Strike the arc, build a stable puddle, glide it along the seam."
              descKh="បាញ់ធ្នូ សាងសង់ក្លាសស្ថិតស្ថេរ រអិលវាតាមបន្ទាត់តភ្ជាប់។"
            />
            <StepTile
              n="4"
              icon={CheckCircle2}
              en="Cool & inspect"
              kh="ត្រជាក់ និងពិនិត្យ"
              descEn="Let the joint cool slowly, then chip slag, brush, and visually inspect for cracks or pores."
              descKh="ទុកឱ្យចំណុចតភ្ជាប់ត្រជាក់យឺតៗ បន្ទាប់មកកោសសំណល់ ដុស និងពិនិត្យដោយភ្នែករកស្នាមប្រេះ ឬប្រហោង។"
            />
          </div>
        </Card>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${STEEL_DEEP} 0%, #1f2937 50%, ${AMBER} 160%)`,
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(245, 158, 11, 0.45)" }}
            aria-hidden="true"
          />
          <Flame className="w-10 h-10 mx-auto mb-3" style={{ color: AMBER_BRIGHT }} aria-hidden="true" />
          <h3 className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${k ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Two metals enter. One metal leaves.",
              "លោហៈពីរចូល។ លោហៈតែមួយចេញ។",
            )}
          </h3>
          <p className={`text-sm sm:text-base text-slate-200 max-w-2xl mx-auto ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Welding is one of the oldest and most decisive technologies in human history. Without it there would be no ships, no oil pipelines, no skyscrapers, no railways. Whoever can weld can build — and whoever can build can shape the world.",
              "ការផ្សារគឺជាបច្ចេកវិទ្យាចាស់បំផុត និងសំខាន់បំផុតមួយក្នុងប្រវត្តិសាស្ត្រមនុស្សជាតិ។ បើគ្មានវាទេ នឹងគ្មាននាវា គ្មានបំពង់ប្រេង គ្មានអាគារខ្ពស់ៗ គ្មានផ្លូវដែក។ អ្នកណាដែលអាចផ្សារបានអាចសាងសង់ — ហើយអ្នកណាដែលអាចសាងសង់បានអាចបង្កើតរូបរាងពិភពលោក។",
            )}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 flex-wrap justify-center">
            <Pill icon={Flame} en="Fusion" kh="ការរំលាយ" k={k} />
            <Pill icon={Shield} en="Shielded" kh="ការការពារ" k={k} />
            <Pill icon={Wrench} en="Built by hand" kh="សាងសង់ដោយដៃ" k={k} />
          </div>
        </div>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-slate-900 text-sm font-bold shadow hover:opacity-90 transition-opacity tracking-wider ${k ? "font-khmer normal-case tracking-normal" : "uppercase"}`}
          style={{ backgroundColor: AMBER_BRIGHT }}
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

function Card({
  tagEn,
  tagKh,
  icon: Icon,
  titleEn,
  titleKh,
  k,
  children,
}: {
  tagEn: string;
  tagKh: string;
  icon: LucideIcon;
  titleEn: string;
  titleKh: string;
  k: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className="relative rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        border: `1px solid ${AMBER}33`,
        boxShadow: `0 1px 0 ${AMBER}22, 0 24px 60px -28px ${AMBER}33`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-md"
          style={{ background: "rgba(245, 158, 11, 0.16)", color: AMBER_BRIGHT, border: `1px solid ${AMBER}55` }}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <span
          className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer tracking-normal normal-case" : ""}`}
          style={{ color: AMBER_BRIGHT }}
        >
          {k ? tagKh : tagEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl mb-5 text-white ${k ? "font-khmer leading-loose" : ""}`}
      >
        {k ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function SubCard({
  icon: Icon,
  titleEn,
  titleKh,
  tone,
  k,
  children,
}: {
  icon: LucideIcon;
  titleEn: string;
  titleKh: string;
  tone: "amber" | "steel";
  k: boolean;
  children: React.ReactNode;
}) {
  const accent = tone === "amber" ? AMBER_BRIGHT : STEEL_LIGHT;
  const border = tone === "amber" ? `${AMBER}66` : `${STEEL_MID}aa`;
  return (
    <div
      className="rounded-xl p-4 sm:p-5"
      style={{ background: "rgba(15, 23, 42, 0.5)", border: `1px solid ${border}` }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="inline-flex items-center justify-center w-9 h-9 rounded-md"
          style={{ background: tone === "amber" ? "rgba(245, 158, 11, 0.18)" : "rgba(100, 116, 139, 0.25)", color: accent }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: accent }}>
          {k ? titleKh : titleEn}
        </h3>
      </div>
      {children}
    </div>
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
      className="rounded-xl p-4 flex items-center gap-3"
      style={{ background: "rgba(15, 23, 42, 0.6)", border: `1px solid ${AMBER}44` }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0"
        style={{ backgroundColor: "rgba(245, 158, 11, 0.18)", color: AMBER_BRIGHT, border: `1px solid ${AMBER}55` }}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className={`font-display font-bold text-lg leading-tight ${k ? "font-khmer" : ""}`} style={{ color: AMBER_BRIGHT }}>
          {k ? valueKh : valueEn}
        </div>
        <div className={`text-xs text-slate-300 mt-0.5 ${k ? "font-khmer" : ""}`}>
          {k ? descKh : descEn}
        </div>
      </div>
    </div>
  );
}

function MetalCard({
  icon: Icon,
  tone,
  titleEn,
  titleKh,
  meltEn,
  meltKh,
  difficultyEn,
  difficultyKh,
  descEn,
  descKh,
  k,
}: {
  icon: LucideIcon;
  tone: "amber" | "steel";
  titleEn: string;
  titleKh: string;
  meltEn: string;
  meltKh: string;
  difficultyEn: string;
  difficultyKh: string;
  descEn: string;
  descKh: string;
  k: boolean;
}) {
  const accent = tone === "amber" ? AMBER_BRIGHT : STEEL_LIGHT;
  const border = tone === "amber" ? `${AMBER}55` : `${STEEL_MID}99`;
  return (
    <div
      className="rounded-xl p-5 flex flex-col"
      style={{ background: "rgba(15, 23, 42, 0.55)", border: `1px solid ${border}` }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-md"
          style={{
            background: tone === "amber" ? "rgba(245, 158, 11, 0.16)" : "rgba(100, 116, 139, 0.22)",
            color: accent,
            border: `1px solid ${border}`,
          }}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <h3 className={`text-lg font-bold ${k ? "font-khmer" : ""}`} style={{ color: accent }}>
          {k ? titleKh : titleEn}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold ${k ? "font-khmer" : ""}`}
          style={{ background: "rgba(15, 23, 42, 0.6)", color: AMBER_BRIGHT, border: `1px solid ${AMBER}55` }}
        >
          <Flame className="w-3 h-3" aria-hidden="true" />
          {k ? meltKh : meltEn}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${k ? "font-khmer" : ""}`}
          style={{ background: "rgba(15, 23, 42, 0.6)", color: STEEL_LIGHT, border: `1px solid ${STEEL_MID}99` }}
        >
          {k ? difficultyKh : difficultyEn}
        </span>
      </div>
      <p className={`text-sm text-slate-300 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function ShieldingPanel({
  tone,
  titleEn,
  titleKh,
  items,
  k,
}: {
  tone: "good" | "bad";
  titleEn: string;
  titleKh: string;
  items: { en: string; kh: string }[];
  k: boolean;
}) {
  const isGood = tone === "good";
  const color = isGood ? AMBER_BRIGHT : "#fca5a5";
  const bg = isGood ? "rgba(245, 158, 11, 0.10)" : "rgba(239, 68, 68, 0.10)";
  const Icon = isGood ? CheckCircle2 : AlertTriangle;
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: bg, border: `1px solid ${color}55` }}
      data-testid={`shielding-${tone}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="inline-flex items-center justify-center w-8 h-8 rounded-md"
          style={{ background: "rgba(15, 23, 42, 0.6)", color }}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color }}>
          {k ? titleKh : titleEn}
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
            <span className={`text-sm text-slate-200 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {k ? it.kh : it.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepTile({
  n,
  icon: Icon,
  en,
  kh,
  descEn,
  descKh,
}: {
  n: string;
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
      className="rounded-xl p-4"
      style={{ background: "rgba(15, 23, 42, 0.55)", border: `1px solid ${AMBER}33` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-md font-mono font-bold text-sm"
          style={{ background: "rgba(245, 158, 11, 0.18)", color: AMBER_BRIGHT, border: `1px solid ${AMBER}55` }}
        >
          {n}
        </span>
        <Icon className="w-4 h-4" style={{ color: AMBER_BRIGHT }} aria-hidden="true" />
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: AMBER_BRIGHT }}>
          {k ? kh : en}
        </h4>
      </div>
      <p className={`text-xs text-slate-300 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? descKh : descEn}
      </p>
    </div>
  );
}

function Callout({
  color,
  bg,
  border,
  icon: Icon,
  dark,
  children,
}: {
  color: string;
  bg: string;
  border: string;
  icon: LucideIcon;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
      <p className={`text-sm leading-relaxed ${dark ? "text-slate-200" : "text-slate-800"}`}>{children}</p>
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
//  SVG diagrams
// ════════════════════════════════════════════════════════════════════════════

function FusionDiagram({ k }: { k: boolean }) {
  // Three rows of atoms across two metal pieces, fusing in the middle.
  const ROWS = [40, 64, 88];
  const LEFT_COLS = [40, 64, 88, 112];
  const RIGHT_COLS = [208, 232, 256, 280];
  const MID_COLS = [136, 160, 184];
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 320 130"
        className="w-full h-auto max-w-2xl mx-auto block"
        role="img"
        aria-label={k ? "ដ្យាក្រាមការរំលាយអាតូម — លោហៈពីរក្លាយជាតែមួយ" : "Atomic-fusion diagram — two metals becoming one"}
      >
        {/* Metal block backgrounds */}
        <rect x="20" y="22" width="108" height="84" rx="4" fill="#1e293b" stroke={STEEL_MID} strokeWidth="1" />
        <rect x="192" y="22" width="108" height="84" rx="4" fill="#1e293b" stroke={STEEL_MID} strokeWidth="1" />

        {/* Molten weld zone (gradient) */}
        <defs>
          <radialGradient id="weldHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={AMBER_BRIGHT} stopOpacity="0.85" />
            <stop offset="55%" stopColor={AMBER_HOT} stopOpacity="0.55" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <rect x="128" y="22" width="64" height="84" rx="4" fill="url(#weldHeat)" />

        {/* Left atoms (steel-coloured) */}
        {ROWS.map((y) =>
          LEFT_COLS.map((x, i) => (
            <circle key={`L${y}-${i}`} cx={x} cy={y} r="5" fill={STEEL_LIGHT} stroke={STEEL_MID} strokeWidth="0.6" />
          )),
        )}
        {/* Right atoms */}
        {ROWS.map((y) =>
          RIGHT_COLS.map((x, i) => (
            <circle key={`R${y}-${i}`} cx={x} cy={y} r="5" fill={STEEL_LIGHT} stroke={STEEL_MID} strokeWidth="0.6" />
          )),
        )}
        {/* Middle (fused) atoms — alternating colour to suggest interlock */}
        {ROWS.map((y, ri) =>
          MID_COLS.map((x, i) => (
            <circle
              key={`M${y}-${i}`}
              cx={x}
              cy={y}
              r="5"
              fill={(ri + i) % 2 === 0 ? AMBER_BRIGHT : STEEL_PALE}
              stroke={AMBER}
              strokeWidth="0.8"
            />
          )),
        )}

        {/* Labels */}
        <text x="74" y="118" fill={STEEL_LIGHT} fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "ដែក A" : "Metal A"}
        </text>
        <text x="246" y="118" fill={STEEL_LIGHT} fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "ដែក B" : "Metal B"}
        </text>
        <text x="160" y="16" fill={AMBER_BRIGHT} fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">
          {k ? "តំបន់រំលាយ" : "FUSION ZONE"}
        </text>

        {/* Heat arrows */}
        <path d="M 160 -2 L 156 6 L 164 6 Z" fill={AMBER_HOT} />
      </svg>
    </figure>
  );
}

function OxyAcetyleneDiagram({ k }: { k: boolean }) {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 360 130"
        className="w-full h-auto max-w-2xl mx-auto block"
        role="img"
        aria-label={k ? "ដ្យាក្រាមក្បាលផ្សារអុកស៊ី-អាសេទីឡែន" : "Oxy-acetylene torch diagram"}
      >
        {/* O2 cylinder */}
        <rect x="20" y="20" width="36" height="80" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
        <rect x="28" y="14" width="20" height="10" rx="2" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
        <text x="38" y="64" fill="#93c5fd" fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">O₂</text>

        {/* Acetylene cylinder */}
        <rect x="60" y="20" width="36" height="80" rx="4" fill="#5b1818" stroke="#dc2626" strokeWidth="1" />
        <rect x="68" y="14" width="20" height="10" rx="2" fill="#5b1818" stroke="#dc2626" strokeWidth="1" />
        <text x="78" y="64" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">C₂H₂</text>

        {/* Hoses */}
        <path d="M 38 100 Q 38 110, 90 110 Q 140 110, 165 86" stroke="#3b82f6" strokeWidth="2" fill="none" />
        <path d="M 78 100 Q 78 112, 120 112 Q 150 112, 168 90" stroke="#dc2626" strokeWidth="2" fill="none" />

        {/* Torch body */}
        <rect x="158" y="78" width="60" height="14" rx="3" fill={STEEL} stroke={STEEL_LIGHT} strokeWidth="1" />
        <circle cx="170" cy="85" r="3" fill={AMBER_BRIGHT} />
        {/* Tip */}
        <polygon points="218,78 240,84 218,92" fill={STEEL_LIGHT} />

        {/* Flame layers (outer → inner cone) */}
        <ellipse cx="280" cy="85" rx="48" ry="14" fill={AMBER_HOT} opacity="0.55" />
        <ellipse cx="276" cy="85" rx="36" ry="10" fill={AMBER_BRIGHT} opacity="0.85" />
        <ellipse cx="266" cy="85" rx="20" ry="6" fill="#fff7e0" opacity="0.95" />
        {/* Inner cone (the hottest part) */}
        <ellipse cx="252" cy="85" rx="8" ry="3" fill="#dbeafe" />

        {/* Temperature label */}
        <text x="292" y="60" fill={AMBER_BRIGHT} fontSize="11" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">
          {k ? ">៣,០០០ °C" : ">3,000 °C"}
        </text>
        <line x1="262" y1="63" x2="262" y2="76" stroke={AMBER_BRIGHT} strokeWidth="1" />

        {/* Cylinder labels */}
        <text x="38" y="118" fill="#93c5fd" fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "អុកស៊ីហ្សែន" : "Oxygen"}
        </text>
        <text x="78" y="118" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "អាសេទីឡែន" : "Acetylene"}
        </text>
      </svg>
    </figure>
  );
}

function ArcWeldDiagram({ k }: { k: boolean }) {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 320 140"
        className="w-full h-auto max-w-2xl mx-auto block"
        role="img"
        aria-label={k ? "ដ្យាក្រាមការផ្សារធ្នូជាមួយឧស្ម័នការពារ" : "Arc welding with shielding gas diagram"}
      >
        {/* Power supply */}
        <rect x="14" y="50" width="60" height="46" rx="3" fill={STEEL_DEEP} stroke={AMBER} strokeWidth="1" />
        <text x="44" y="68" fill={AMBER_BRIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">PSU</text>
        <text x="44" y="82" fill={STEEL_LIGHT} fontSize="8" textAnchor="middle" fontFamily="ui-monospace, monospace">+ −</text>

        {/* Cables to torch and to ground clamp */}
        <path d="M 74 60 Q 130 28, 168 36" stroke={AMBER_BRIGHT} strokeWidth="2" fill="none" />
        <path d="M 74 86 Q 150 130, 250 122" stroke={STEEL_LIGHT} strokeWidth="2" fill="none" />

        {/* Torch (gun) */}
        <rect x="160" y="30" width="50" height="14" rx="3" fill={STEEL} stroke={STEEL_LIGHT} strokeWidth="1" transform="rotate(20 185 37)" />
        {/* Nozzle */}
        <polygon points="200,46 232,76 196,72" fill={STEEL_LIGHT} stroke={STEEL_MID} strokeWidth="1" />

        {/* Shielding gas cone (translucent) */}
        <polygon points="200,72 240,72 220,108" fill={AMBER} opacity="0.18" />
        <polygon points="206,72 234,72 220,100" fill={AMBER} opacity="0.10" />

        {/* Electrode */}
        <line x1="220" y1="76" x2="220" y2="100" stroke={STEEL_PALE} strokeWidth="2" />

        {/* Arc (jagged) */}
        <path d="M 220 100 L 218 104 L 222 106 L 217 110 L 222 114" stroke={AMBER_BRIGHT} strokeWidth="2" fill="none" />
        <circle cx="220" cy="115" r="5" fill={AMBER_BRIGHT} opacity="0.7" />
        <circle cx="220" cy="115" r="9" fill={AMBER_HOT} opacity="0.35" />

        {/* Workpiece (base metal) */}
        <rect x="120" y="118" width="180" height="14" rx="2" fill="#1e293b" stroke={STEEL_MID} strokeWidth="1" />
        {/* Molten pool on workpiece */}
        <ellipse cx="220" cy="120" rx="14" ry="3.5" fill={AMBER_BRIGHT} opacity="0.85" />

        {/* Ground clamp */}
        <rect x="260" y="116" width="20" height="10" fill={STEEL_LIGHT} stroke={STEEL_MID} strokeWidth="1" />

        {/* Labels */}
        <text x="266" y="48" fill={AMBER_BRIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "ឧស្ម័នការពារ" : "Shielding gas"}
        </text>
        <text x="266" y="60" fill={AMBER_GLOW} fontSize="8" textAnchor="middle" fontFamily="ui-monospace, monospace">
          Argon / CO₂
        </text>
        <text x="220" y="138" fill={STEEL_LIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "លោហៈគោល" : "base metal"}
        </text>
      </svg>
    </figure>
  );
}

function PuddleDiagram({ k }: { k: boolean }) {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 320 140"
        className="w-full h-auto max-w-2xl mx-auto block"
        role="img"
        aria-label={k ? "ដ្យាក្រាមក្លាសផ្សារ និងដំបងបំពេញ" : "Weld puddle and filler rod diagram"}
      >
        {/* Two base plates */}
        <rect x="20" y="80" width="130" height="22" rx="2" fill="#1e293b" stroke={STEEL_MID} strokeWidth="1" />
        <rect x="170" y="80" width="130" height="22" rx="2" fill="#1e293b" stroke={STEEL_MID} strokeWidth="1" />

        {/* Already-cooled bead behind the puddle */}
        {[...Array(6)].map((_, i) => (
          <ellipse
            key={i}
            cx={50 + i * 16}
            cy={80}
            rx="9"
            ry="3.5"
            fill={STEEL_PALE}
            stroke={STEEL_MID}
            strokeWidth="0.6"
          />
        ))}

        {/* Active molten puddle (glowing) */}
        <ellipse cx="160" cy="80" rx="16" ry="5" fill={AMBER_HOT} opacity="0.85" />
        <ellipse cx="160" cy="80" rx="9" ry="3" fill={AMBER_GLOW} />

        {/* Heat glow */}
        <circle cx="160" cy="80" r="22" fill={AMBER_BRIGHT} opacity="0.18" />

        {/* Torch (above and slightly behind) */}
        <rect x="135" y="22" width="50" height="14" rx="3" fill={STEEL} stroke={STEEL_LIGHT} strokeWidth="1" transform="rotate(15 160 29)" />
        <polygon points="172,38 192,60 158,60" fill={STEEL_LIGHT} stroke={STEEL_MID} strokeWidth="1" />
        <line x1="175" y1="60" x2="160" y2="78" stroke={AMBER_BRIGHT} strokeWidth="2" />

        {/* Filler rod (coming from the right at an angle) */}
        <line x1="240" y1="20" x2="170" y2="78" stroke={STEEL_PALE} strokeWidth="3" strokeLinecap="round" />
        {/* A drop falling from filler tip */}
        <circle cx="166" cy="76" r="2.5" fill={AMBER_GLOW} />

        {/* Direction arrow */}
        <line x1="80" y1="120" x2="170" y2="120" stroke={AMBER_BRIGHT} strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points="170,120 162,116 162,124" fill={AMBER_BRIGHT} />
        <text x="125" y="134" fill={AMBER_BRIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "ទិសផ្លាស់ទី" : "travel direction"}
        </text>

        {/* Labels */}
        <text x="100" y="74" fill={STEEL_LIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "បន្ទាត់ត្រជាក់" : "cooled bead"}
        </text>
        <text x="160" y="60" fill={AMBER_BRIGHT} fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="bold">
          {k ? "ក្លាស" : "PUDDLE"}
        </text>
        <text x="246" y="16" fill={STEEL_LIGHT} fontSize="9" textAnchor="middle" fontFamily="ui-monospace, monospace">
          {k ? "ដំបងបំពេញ" : "filler rod"}
        </text>
      </svg>
    </figure>
  );
}
