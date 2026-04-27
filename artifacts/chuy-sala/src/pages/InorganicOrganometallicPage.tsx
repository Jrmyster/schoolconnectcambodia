import { Link } from "wouter";
import {
  ArrowLeft,
  Dna,
  Link2,
  HeartPulse,
  Leaf,
  Zap,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 06
 * Organometallic and Bioinorganic Chemistry
 *   — គីមីសរីរាង្គលោហៈ និងជីវអសរីរាង្គ
 * Soft red / coral accents to match the curriculum-hub card.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicOrganometallicPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/70 to-background py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/science/chemistry/inorganic"
          data-testid="link-back-to-inorganic"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t(
            "Back to Inorganic Chemistry 101",
            "ត្រឡប់ទៅគីមីវិទ្យាអសរីរាង្គ ១០១",
          )}
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-rose-200">
              <Dna className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-rose-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(
                  "Module 06 · Inorganic Chemistry",
                  "មុខវិជ្ជា ០៦ · គីមីវិទ្យាអសរីរាង្គ",
                )}
              </span>
              <h1
                id="organometallic-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-rose-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Organometallic and Bioinorganic Chemistry",
                  "គីមីសរីរាង្គលោហៈ និងជីវអសរីរាង្គ",
                )}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Inside every breath you take, every leaf on every rice plant, and every bottle of medicine you ever swallow, a tiny metal atom is doing the heavy lifting. This is the chemistry of metals teamed up with organic molecules — both inside living things and inside factories.",
              "នៅក្នុងការដកដង្ហើមនីមួយៗរបស់អ្នក ស្លឹកនីមួយៗនៃដើមស្រូវ និងដបឱសថនីមួយៗដែលអ្នកធ្លាប់លេប អាតូមលោហៈតូចមួយកំពុងធ្វើការងារធ្ងន់។ នេះគឺគីមីវិទ្យានៃលោហៈដែលរួមដៃជាមួយម៉ូលេគុលសរីរាង្គ — ទាំងនៅខាងក្នុងរបស់មានជីវិត និងនៅក្នុងរោងចក្រ។",
            )}
          </p>
        </header>

        {/* ── The Bridge Between Worlds · intro card ─────────────── */}
        <section
          data-testid="section-bridge"
          aria-labelledby="bridge-title"
          className="mb-8 rounded-2xl border-2 border-rose-200 bg-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow ring-2 ring-rose-200"
              aria-hidden="true"
            >
              <Link2 className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <h2
                id="bridge-title"
                className={`text-lg sm:text-xl font-bold leading-tight text-rose-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "The Bridge Between Worlds",
                  "ស្ពានរវាងពិភពទាំងពីរ",
                )}
              </h2>
              <p
                className={`text-xs font-semibold text-rose-700/80 mt-0.5 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "Where organic life meets the periodic table",
                  "កន្លែងដែលជីវិតសរីរាង្គជួបនឹងតារាងធាតុ",
                )}
              </p>
            </div>
          </div>

          {/* Two-worlds visual: organic (leaf) ↔ bridge ↔ inorganic (gear) */}
          <div
            aria-hidden="true"
            className="mb-4 rounded-lg border border-rose-200 bg-gradient-to-r from-emerald-50 via-rose-50 to-slate-50 p-4 flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto"
          >
            {/* Organic side */}
            <div className="flex flex-col items-center gap-1 min-w-fit">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow ring-2 ring-white text-xl">
                🌿
              </span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase text-emerald-700 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                {t("Organic", "សរីរាង្គ")}
              </span>
              <span className="text-[9px] text-emerald-800/70 font-mono">
                C · H · O · N
              </span>
            </div>

            {/* Bridge */}
            <div className="flex-1 flex flex-col items-center gap-1 min-w-[80px] max-w-[140px]">
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-400 via-rose-400 to-slate-400 shadow-inner" />
              <span
                className={`text-[9px] font-bold uppercase tracking-widest text-rose-700 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                {t("Bridge", "ស្ពាន")}
              </span>
              <span className="text-rose-700 text-base font-bold leading-none">
                ⇄
              </span>
            </div>

            {/* Inorganic side */}
            <div className="flex flex-col items-center gap-1 min-w-fit">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-zinc-600 text-white shadow ring-2 ring-white text-xl">
                ⚙️
              </span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase text-slate-700 ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                {t("Inorganic", "អសរីរាង្គ")}
              </span>
              <span className="text-[9px] text-slate-800/70 font-mono">
                Fe · Mg · Pt · Cu
              </span>
            </div>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "For more than a hundred years, scientists thought the world of carbon-based life and the world of metals and rocks were completely separate. Bioinorganic chemistry showed they were wrong — life is actually a single machine in which organic molecules and metal atoms work together. Take the iron out of your blood and you suffocate. Take the magnesium out of a leaf and the tree starves. Organometallic chemistry is what happens when humans copy nature's tricks and use the same metal-plus-carbon partnership inside factories.",
              "អស់រយៈពេលជាងមួយរយឆ្នាំ អ្នកវិទ្យាសាស្ត្របានគិតថាពិភពនៃជីវិតផ្អែកលើកាបូន និងពិភពនៃលោហៈ និងថ្មគឺផ្ដាច់ចេញពីគ្នាទាំងស្រុង។ គីមីវិទ្យាជីវអសរីរាង្គបានបង្ហាញថាពួកគេខុស — ជីវិតពិតជាម៉ាស៊ីនតែមួយដែលម៉ូលេគុលសរីរាង្គ និងអាតូមលោហៈធ្វើការរួមគ្នា។ ដកដែកចេញពីឈាមអ្នក នោះអ្នកនឹងថប់ដង្ហើម។ ដកម៉ាញ៉េស្យូមចេញពីស្លឹក នោះដើមឈើនឹងស្រេកឃ្លាន។ គីមីសរីរាង្គលោហៈគឺជាអ្វីដែលកើតឡើងនៅពេលមនុស្សចម្លងល្បិចរបស់ធម្មជាតិ ហើយប្រើភាពជាដៃគូលោហៈ-កាបូនដូចគ្នានៅក្នុងរោងចក្រ។",
            )}
          </p>
        </section>

        {/* ── Three concept cards · CSS Grid · soft rose/coral ──── */}
        <h2
          className={`text-base sm:text-lg font-bold text-rose-900 mb-3 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t(
            "Three machines that prove the bridge is real",
            "ម៉ាស៊ីនបីដែលបញ្ជាក់ថាស្ពាននេះពិតជាមាន",
          )}
        </h2>

        {/* Sub-heading: "Biological Engines" — covers cards 1 & 2 */}
        <p
          className={`text-xs font-bold tracking-widest uppercase text-rose-700 opacity-80 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal text-sm font-semibold" : ""
          }`}
        >
          {t("Biological Engines", "ម៉ាស៊ីនជីវសាស្ត្រ")}
        </p>

        <div
          role="list"
          aria-label="Organometallic and bioinorganic concepts · គំនិតស្តីពីគីមីសរីរាង្គលោហៈ និងជីវអសរីរាង្គ"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · Hemoglobin (Fe) ──────────────────────── */}
          <article
            role="listitem"
            data-testid="card-hemoglobin"
            className="rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow ring-2 ring-rose-200"
                aria-hidden="true"
              >
                <HeartPulse className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-rose-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Hemoglobin", "ហេម៉ូក្លូប៊ីន")}
                </h3>
                <p
                  className={`text-xs font-semibold text-rose-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Iron (Fe) carries oxygen in your blood",
                    "ដែក (Fe) ដឹកអុកស៊ីហ្សែនក្នុងឈាម",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: red blood cell with central Fe + O₂ orbiters */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-rose-100 to-red-100 border border-rose-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-20 h-12">
                {/* protein cradle */}
                <span className="absolute inset-y-1 left-2 right-2 rounded-full bg-rose-300/60 ring-1 ring-rose-400/50" />
                {/* Fe center */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-rose-600 to-red-700 shadow-md ring-2 ring-white text-[8px] font-bold text-white flex items-center justify-center">
                  Fe
                </span>
                {/* O2 molecules */}
                <span className="absolute top-1 left-1 text-[8px] font-bold text-sky-600">
                  O₂
                </span>
                <span className="absolute top-1 right-1 text-[8px] font-bold text-sky-600">
                  O₂
                </span>
                <span className="absolute bottom-1 left-1 text-[8px] font-bold text-sky-600">
                  O₂
                </span>
                <span className="absolute bottom-1 right-1 text-[8px] font-bold text-sky-600">
                  O₂
                </span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Hemoglobin is the protein that gives your blood its red color. At the very center of every hemoglobin molecule sits a single atom of iron (Fe). When you breathe in, that iron atom grabs an oxygen molecule out of your lungs, your heart pumps it through your arteries, and the iron drops it off exactly where your muscles need it. Without that one metal atom, your whole body would suffocate in seconds.",
                "ហេម៉ូក្លូប៊ីនគឺជាប្រូតេអ៊ីនដែលផ្តល់ពណ៌ក្រហមដល់ឈាមរបស់អ្នក។ នៅចំកណ្តាលនៃម៉ូលេគុលហេម៉ូក្លូប៊ីននីមួយៗ មានអាតូមដែក (Fe) តែមួយ។ ពេលអ្នកដកដង្ហើមចូល អាតូមដែកនោះចាប់ម៉ូលេគុលអុកស៊ីហ្សែនពីសួត បេះដូងរបស់អ្នកបូមវាតាមសរសៃឈាម ហើយដែកដាក់វាចុះទៅកន្លែងដែលសាច់ដុំរបស់អ្នកត្រូវការ។ បើគ្មានអាតូមលោហៈនោះទេ រាងកាយទាំងមូលរបស់អ្នកនឹងថប់ដង្ហើមក្នុងរយៈពេលវិនាទី។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-rose-800 bg-white/60 border border-rose-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("In the body:", "ក្នុងរាងកាយ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Each red blood cell carries about 270 million hemoglobins — and ~1 billion iron atoms.",
                  "កោសិកាឈាមក្រហមនីមួយៗមានហេម៉ូក្លូប៊ីនប្រហែល ២៧០ លាន — និងអាតូមដែកប្រហែល ១ ប៊ីលាន។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · Chlorophyll (Mg) ─────────────────────── */}
          <article
            role="listitem"
            data-testid="card-chlorophyll"
            className="rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow ring-2 ring-emerald-200"
                aria-hidden="true"
              >
                <Leaf className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-rose-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Chlorophyll", "ក្លរូហ្វីល")}
                </h3>
                <p
                  className={`text-xs font-semibold text-rose-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Magnesium (Mg) catches sunlight in plants",
                    "ម៉ាញ៉េស្យូម (Mg) ចាប់ពន្លឺថ្ងៃក្នុងរុក្ខជាតិ",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: green leaf with central Mg + sunrays */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200/70 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-20 h-12">
                {/* leaf-shaped cradle */}
                <span className="absolute inset-y-1 left-2 right-2 rounded-[40%] bg-emerald-400/60 ring-1 ring-emerald-500/50" />
                {/* Mg center */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-green-700 shadow-md ring-2 ring-white text-[8px] font-bold text-white flex items-center justify-center">
                  Mg
                </span>
                {/* sun rays */}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-yellow-500 text-[12px] leading-none">
                  ☀
                </span>
                <span className="absolute top-1 -left-1 text-yellow-500 text-[10px] leading-none">
                  ✦
                </span>
                <span className="absolute top-1 -right-1 text-yellow-500 text-[10px] leading-none">
                  ✦
                </span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Every green leaf you see — on every rice plant, every mango tree, every blade of grass — gets its color from chlorophyll. And at the center of every chlorophyll molecule sits a single atom of magnesium (Mg). That magnesium atom is what catches a particle of sunlight and starts the reaction that turns water and air into sugar. Almost every calorie of food on Earth begins with one tiny magnesium atom doing this job.",
                "ស្លឹកបៃតងនីមួយៗដែលអ្នកឃើញ — នៅលើដើមស្រូវនីមួយៗ ដើមស្វាយនីមួយៗ ស្មៅនីមួយៗ — ទទួលបានពណ៌របស់វាពីក្លរូហ្វីល។ ហើយនៅចំកណ្តាលនៃម៉ូលេគុលក្លរូហ្វីលនីមួយៗ មានអាតូមម៉ាញ៉េស្យូម (Mg) តែមួយ។ អាតូមម៉ាញ៉េស្យូមនោះគឺជាអ្វីដែលចាប់ភាគល្អិតពន្លឺថ្ងៃ ហើយចាប់ផ្តើមប្រតិកម្មដែលប្រែទឹក និងខ្យល់ឱ្យទៅជាស្ករ។ ស្ទើរតែគ្រប់កាឡូរីនៃអាហារនៅលើផែនដី ចាប់ផ្តើមជាមួយអាតូមម៉ាញ៉េស្យូមតូចមួយធ្វើការងារនេះ។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-rose-800 bg-white/60 border border-rose-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("On the farm:", "នៅក្នុងស្រែចម្ការ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Yellow leaves on rice often mean a magnesium shortage — the plant cannot finish making chlorophyll.",
                  "ស្លឹកស្រូវលឿងជាញឹកញាប់មានន័យថាខ្វះម៉ាញ៉េស្យូម — ដើមស្រូវមិនអាចបង្កើតក្លរូហ្វីលបានពេញលេញ។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · Catalysts ────────────────────────────── */}
          <article
            role="listitem"
            data-testid="card-catalysts"
            className="rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow ring-2 ring-orange-200"
                aria-hidden="true"
              >
                <Zap className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-rose-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Catalysts", "កាតាលីករ")}
                </h3>
                <p
                  className={`text-xs font-semibold text-rose-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Industrial shortcut · never used up",
                    "ផ្លូវកាត់ឧស្សាហកម្ម · គ្មានការប្រើអស់",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: A + B → C with a "CAT" speed badge on the arrow */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 border border-rose-200 flex items-center justify-center overflow-hidden gap-1.5"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 shadow ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                A
              </span>
              <span className="text-rose-700 font-bold text-base">+</span>
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                B
              </span>
              <div className="relative flex flex-col items-center mx-0.5">
                <span className="text-rose-700 font-bold text-base leading-none">→</span>
                <span className="text-[7px] font-bold text-orange-700 -mt-0.5 tracking-widest">
                  CAT
                </span>
              </div>
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                C
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "A catalyst is a chemical shortcut. It makes a reaction happen much faster — sometimes a million times faster — but at the end of the reaction the catalyst itself is unchanged and ready to do the same job again. Organometallic catalysts (a metal teamed up with a carbon-based partner) are the workhorses of modern industry: they make the plastic in water bottles, the polyester in your clothes, the active ingredient in many medicines, and the cleaner exhaust coming out of every car's catalytic converter.",
                "កាតាលីករគឺជាផ្លូវកាត់គីមី។ វាធ្វើឱ្យប្រតិកម្មកើតឡើងលឿនជាងមុនច្រើន — ពេលខ្លះលឿនជាងមុនមួយលានដង — ប៉ុន្តែនៅចុងបញ្ចប់នៃប្រតិកម្ម កាតាលីករផ្ទាល់នៅដដែល និងរួចរាល់ដើម្បីធ្វើការងារដដែលម្តងទៀត។ កាតាលីករសរីរាង្គលោហៈ (លោហៈរួមដៃជាមួយដៃគូផ្អែកលើកាបូន) គឺជាអ្នកធ្វើការសំខាន់នៃឧស្សាហកម្មទំនើប៖ ពួកវាបង្កើតប្លាស្ទិកក្នុងដបទឹក ប៉ូលីយ៉េស្ទ័រក្នុងសម្លៀកបំពាក់ សមាសធាតុសកម្មក្នុងឱសថជាច្រើន និងផ្សែងស្អាតចេញពីកាតាលីទិកខនវឺទ័ររបស់ឡានគ្រប់គ្រឿង។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-rose-800 bg-white/60 border border-rose-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("In factories:", "ក្នុងរោងចក្រ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Pt, Pd, Rh, Ni — small amounts of metal turn out tons of plastic and medicine.",
                  "Pt, Pd, Rh, Ni — បរិមាណលោហៈតិចតួចបង្កើតប្លាស្ទិក និងឱសថរាប់តោន។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Putting it together strip ──────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-rose-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-rose-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Why it matters in real life",
              "ហេតុអ្វីវាសំខាន់ក្នុងជីវិតពិត",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Iron in your blood, magnesium in a leaf, platinum in a chemical factory — they all do the same trick. A single metal atom sits at the heart of an organic molecule and quietly does the chemistry that no atom by itself could ever do. Every breath you take and almost every medicine, plastic, and meal you encounter exists because somewhere a metal and a carbon-based molecule decided to work as a team.",
              "ដែកក្នុងឈាមអ្នក ម៉ាញ៉េស្យូមក្នុងស្លឹក ផ្លាទីនក្នុងរោងចក្រគីមី — ពួកវាទាំងអស់ធ្វើល្បិចដូចគ្នា។ អាតូមលោហៈតែមួយអង្គុយនៅបេះដូងនៃម៉ូលេគុលសរីរាង្គ ហើយធ្វើគីមីយ៉ាងស្ងៀមស្ងាត់ដែលគ្មានអាតូមណាមួយឯងអាចធ្វើបាន។ ការដកដង្ហើមនីមួយៗរបស់អ្នក និងស្ទើរតែគ្រប់ឱសថ ប្លាស្ទិក និងអាហារដែលអ្នកជួប មានវត្តមានព្រោះកន្លែងណាមួយលោហៈ និងម៉ូលេគុលផ្អែកលើកាបូនបានសម្រេចចិត្តធ្វើការជាក្រុម។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
