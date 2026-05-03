import type { ComponentType, ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Leaf,
  Sprout,
  Zap,
  Factory,
  CloudRain,
  Wind,
  Bug,
  Atom,
  RotateCw,
  ArrowRight,
  Sun,
  Trees,
  Droplet,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * The Nitrogen Cycle: Nature's Fertilizer Factory
 * វដ្តអាសូត៖ រោងចក្រជីធម្មជាតិ
 * Module: Science → Chemistry (after Haber-Bosch)
 * Aesthetic: lush greens, soil browns, clear sky blues — earthy & natural.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function NitrogenCyclePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 text-slate-900 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="nitrogen-cycle-page"
    >
      {/* Sky-to-soil gradient ambience */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-200/60 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-amber-900/15 to-transparent pointer-events-none"
      />
      <LeafPattern />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/science/chemistry/haber-bosch"
          data-testid="link-back-to-haber-bosch"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Haber-Bosch", "ត្រឡប់ទៅ Haber-Bosch")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 shadow-lg ring-2 ring-emerald-300/60 flex items-center justify-center">
                <Leaf className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={2.25} fill="currentColor" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-700 border-2 border-amber-50 flex items-center justify-center shadow">
                <Sprout className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-800 mb-1.5">
                <Atom className="w-3 h-3" />
                <span>Chemistry · Biogeochemistry</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-emerald-800">
                  គីមីវិទ្យា · ជីវ-ភូមិ-គីមី
                </span>
              </span>
              <h1
                id="nitrogen-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                  The Nitrogen Cycle:
                </span>{" "}
                <span className="text-slate-900">Nature's Fertilizer Factory</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-800 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                  វដ្តអាសូត៖
                </span>{" "}
                <span>រោងចក្រជីធម្មជាតិ</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "The air above a Cambodian rice paddy is mostly nitrogen — yet the rice plants below cannot touch it. Follow nitrogen on its loop from the sky, through bacteria, into roots, and back into the air again.",
              "ខ្យល់ពីលើស្រែកម្ពុជាភាគច្រើនជាអាសូត — ប៉ុន្តែដំណាំស្រូវខាងក្រោមមិនអាចប៉ះវាបានទេ។ តាមដានអាសូតលើដំណើររង្វិលរបស់វាពីលើមេឃ ឆ្លងកាត់បាក់តេរី ចូលក្នុងឫស និងត្រឡប់ចូលក្នុងខ្យល់វិញ។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Problem with Air ─────────────────────── */}
        <Section
          number={1}
          icon={Wind}
          tone="sky"
          titleEn="The Problem with Air"
          titleKh="បញ្ហាជាមួយខ្យល់"
          subtitleEn="The atmosphere is full of food no plant can eat"
          subtitleKh="បរិយាកាសពេញដោយអាហារដែលគ្មានរុក្ខជាតិអាចបរិភោគបាន"
          dataTestid="section-problem"
        >
          {/* Atmosphere composition card */}
          <div className="rounded-2xl border-2 border-sky-200 bg-white/85 backdrop-blur-sm p-5 sm:p-6 shadow-sm mb-5">
            <div className="grid sm:grid-cols-2 gap-5 items-center">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-sky-700 mb-1 inline-flex flex-wrap gap-x-2">
                  <span>Earth's Atmosphere</span>
                  <span className="opacity-50" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">បរិយាកាសផែនដី</span>
                </div>
                <div className="text-5xl sm:text-6xl font-black text-emerald-700 leading-none">
                  78%
                </div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                  Nitrogen Gas (<Chem>N<sub>2</sub></Chem>)
                </div>
                <div className="font-khmer text-sm sm:text-base text-slate-700 leading-snug">
                  ឧស្ម័នអាសូត (<Chem>N<sub>2</sub></Chem>)
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  <BL
                    en="Nitrogen is the single most abundant element in the air you are breathing right now."
                    kh="អាសូតគឺជាធាតុដែលមានច្រើនជាងគេក្នុងខ្យល់ដែលអ្នកកំពុងដកដង្ហើមឥឡូវនេះ។"
                  />
                </p>
              </div>

              {/* Atmosphere donut */}
              <AtmosphereDonut />
            </div>
          </div>

          {/* The paradox */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-amber-200">
                <Sparkles className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-amber-900 leading-tight">
                  The Paradox
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-amber-900 leading-snug">
                  ភាពផ្ទុយគ្នា
                </h4>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              <BL
                en="Plants need nitrogen to build proteins and DNA, but they cannot touch the nitrogen all around them. The two atoms in N₂ are locked together by a triple chemical bond — one of the strongest bonds in all of chemistry. Pulling them apart costs an enormous amount of energy."
                kh="រុក្ខជាតិត្រូវការអាសូតដើម្បីបង្កើតប្រូតេអ៊ីន និង DNA ប៉ុន្តែពួកវាមិនអាចប៉ះអាសូតដែលនៅជុំវិញពួកវាបានទេ។ អាតូមទាំងពីរនៅក្នុង N₂ ត្រូវបានផ្សាភ្ជាប់ដោយចំណងគីមីបី — ជាចំណងខ្លាំងបំផុតមួយក្នុងវិស័យគីមីទាំងអស់។ ការបំបែកពួកវាត្រូវការថាមពលដ៏ច្រើន។"
              />
            </p>

            {/* Triple bond visual */}
            <TripleBondViz />

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mt-4">
              <BL
                en="To become useful, nitrogen must first be 'fixed' — converted into a softer molecule that roots can actually drink up."
                kh="ដើម្បីឱ្យមានប្រយោជន៍ អាសូតត្រូវ «កែច្នៃ» ជាមុនសិន — បំប្លែងទៅជាម៉ូលេគុលទន់ជាង ដែលឫសអាចស្រូបយកពិតប្រាកដ។"
              />
            </p>
          </div>
        </Section>

        {/* ── Section 2: The Three Steps of the Cycle ─────────────── */}
        <Section
          number={2}
          icon={RotateCw}
          tone="emerald"
          titleEn="The Three Steps of the Cycle"
          titleKh="ជំហានទាំងបីនៃវដ្ត"
          subtitleEn="Sky to soil to root to sky — a loop powered by lightning and bacteria"
          subtitleKh="ពីមេឃទៅដី ទៅឫស ទៅមេឃ — រង្វិលដែលដំណើរការដោយផ្គររន្ទះ និងបាក់តេរី"
          dataTestid="section-three-steps"
        >
          <div className="space-y-4 sm:space-y-5">
            <CycleStep
              n={1}
              tone="sky"
              icon={Zap}
              titleEn="Nitrogen Fixation"
              titleKh="ការកែច្នៃអាសូត"
              formulaFrom={<><Chem>N<sub>2</sub></Chem></>}
              formulaTo={<><Chem>NH<sub>3</sub></Chem></>}
              fromLabelEn="Nitrogen gas"
              fromLabelKh="ឧស្ម័នអាសូត"
              toLabelEn="Ammonia"
              toLabelKh="អាម៉ូញាក់"
              bodyEn="Two natural forces have the brute strength to break the triple bond: lightning bolts (millions of volts ripping the sky apart) and special bacteria living in the root nodules of legumes like beans and peanuts. Both forge ammonia (NH₃) out of N₂ + hydrogen."
              bodyKh="មានកម្លាំងធម្មជាតិពីរប៉ុណ្ណោះមានកម្លាំងរឹងមាំគ្រប់គ្រាន់ដើម្បីបំបែកចំណងបី៖ ផ្គររន្ទះ (រាប់លានវ៉ុលដែលហែកមេឃ) និងបាក់តេរីពិសេសដែលរស់នៅក្នុងពកឫសរបស់គ្រាប់រុក្ខជាតិដូចជាសណ្ដែក និងសណ្ដែកដី។ ទាំងពីរបង្កើតអាម៉ូញាក់ (NH₃) ពី N₂ + អ៊ីដ្រូសែន។"
              calloutIcon={Factory}
              calloutEn="The Haber-Bosch process is just the human-engineered version of this — humanity learned to do what lightning and bacteria do, but inside a steel factory at 200 atm and 450 °C."
              calloutKh="ដំណើរការ Haber-Bosch គឺគ្រាន់តែជាកំណែដែលមនុស្សបានបង្កើតនៃរឿងនេះ — មនុស្សបានរៀនធ្វើអ្វីដែលផ្គររន្ទះ និងបាក់តេរីធ្វើ ប៉ុន្តែនៅក្នុងរោងចក្រដែកនៅសម្ពាធ ២០០ atm និង ៤៥០ °C។"
            />

            <CycleStep
              n={2}
              tone="amber"
              icon={Bug}
              titleEn="Nitrification"
              titleKh="នីទ្រីកម្ម"
              formulaFrom={<><Chem>NH<sub>3</sub></Chem></>}
              formulaMiddle={<><Chem>NO<sub>2</sub><sup>−</sup></Chem></>}
              formulaTo={<><Chem>NO<sub>3</sub><sup>−</sup></Chem></>}
              fromLabelEn="Ammonia"
              fromLabelKh="អាម៉ូញាក់"
              middleLabelEn="Nitrites"
              middleLabelKh="នីទ្រីត"
              toLabelEn="Nitrates"
              toLabelKh="នីត្រាត"
              bodyEn="Different soil bacteria now go to work in two stages. The first kind (Nitrosomonas) bites ammonia and turns it into nitrites (NO₂⁻). The second kind (Nitrobacter) takes those nitrites and converts them into nitrates (NO₃⁻) — the form roots actually want."
              bodyKh="បាក់តេរីដីផ្សេងៗឥឡូវចាប់ផ្ដើមធ្វើការក្នុងពីរដំណាក់កាល។ ប្រភេទទីមួយ (Nitrosomonas) ខាំអាម៉ូញាក់ ហើយបំប្លែងវាទៅជានីទ្រីត (NO₂⁻)។ ប្រភេទទីពីរ (Nitrobacter) យកនីទ្រីតទាំងនោះ ហើយបំប្លែងពួកវាទៅជានីត្រាត (NO₃⁻) — ជាទម្រង់ដែលឫសចង់បានពិតប្រាកដ។"
              calloutIcon={Sprout}
              calloutEn="Nitrate (NO₃⁻) is the 'plant food' your roots absorb. Inside the plant, it becomes the building blocks of every protein, every enzyme, every strand of DNA in every leaf and grain of rice."
              calloutKh="នីត្រាត (NO₃⁻) គឺជា «អាហាររុក្ខជាតិ» ដែលឫសរបស់អ្នកស្រូបយក។ នៅខាងក្នុងរុក្ខជាតិ វាក្លាយទៅជាសមាសធាតុនៃប្រូតេអ៊ីនគ្រប់ យ៉ាង អង់ហ្ស៊ីមគ្រប់យ៉ាង និងចំណងនៃ DNA គ្រប់យ៉ាងនៅក្នុងស្លឹក និងគ្រាប់ស្រូវនីមួយៗ។"
            />

            <CycleStep
              n={3}
              tone="violet"
              icon={CloudRain}
              titleEn="Denitrification"
              titleKh="ឌីនីទ្រីកម្ម"
              formulaFrom={<><Chem>NO<sub>3</sub><sup>−</sup></Chem></>}
              formulaTo={<><Chem>N<sub>2</sub></Chem></>}
              fromLabelEn="Nitrates in soil"
              fromLabelKh="នីត្រាតក្នុងដី"
              toLabelEn="Nitrogen gas"
              toLabelKh="ឧស្ម័នអាសូត"
              bodyEn="Finally, a third type of bacteria — the denitrifiers — work in oxygen-poor places like waterlogged paddy mud. They break down leftover nitrates and release nitrogen gas (N₂) back up into the atmosphere, completing the loop. Tomorrow's lightning will fix it again."
              bodyKh="ជាចុងក្រោយ បាក់តេរីប្រភេទទីបី — ឌីនីទ្រីហ្វែ (denitrifiers) — ធ្វើការនៅកន្លែងដែលមានអុកស៊ីសែនតិច ដូចជាភក់ស្រែដែលជន់ទឹក។ ពួកវាបំបែកនីត្រាតដែលនៅសេសសល់ ហើយបញ្ចេញឧស្ម័នអាសូត (N₂) ត្រឡប់ឡើងវិញចូលក្នុងបរិយាកាស ដែលបញ្ចប់រង្វិល។ ផ្គររន្ទះថ្ងៃស្អែកនឹងកែច្នៃវាម្ដងទៀត។"
            />
          </div>

          {/* Loop visual */}
          <CycleLoop />
        </Section>

        {/* ── Section 3: Agricultural Impact ──────────────────────── */}
        <Section
          number={3}
          icon={Sprout}
          tone="amber"
          titleEn="The Agricultural Impact"
          titleKh="ផលប៉ះពាល់លើវិស័យកសិកម្ម"
          subtitleEn="Why your rice paddy needs help from a bag"
          subtitleKh="ហេតុអ្វីស្រែរបស់អ្នកត្រូវការជំនួយពីបាវ"
          dataTestid="section-agriculture"
        >
          <div
            className="relative rounded-3xl overflow-hidden border-4 border-emerald-500 bg-gradient-to-br from-emerald-50 via-amber-50 to-sky-50 p-5 sm:p-7 shadow-[0_0_36px_rgba(16,185,129,0.18)]"
            data-testid="agriculture-highlight"
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{
                background: "repeating-linear-gradient(90deg, #15803d 0 16px, #fbbf24 16px 32px, #0ea5e9 32px 48px)",
              }}
            />

            <div className="flex items-start gap-4 mb-5 mt-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-emerald-300">
                <Trees className="w-7 h-7" strokeWidth={2.25} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2 shadow">
                  <span>Local Connection</span>
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">ការតភ្ជាប់មូលដ្ឋាន</span>
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-900 leading-tight">
                  The Cambodian Rice Paddy
                </h3>
                <h4 className="font-khmer text-base sm:text-lg md:text-xl text-emerald-900 leading-snug mt-1">
                  ស្រែស្រូវកម្ពុជា
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-5">
              <BL
                en="Nature's nitrogen cycle is slow and steady — perfect for a forest. But a rice paddy that must feed a family is asking the soil to do far more nitrogen work than the natural cycle alone can keep up with. The harvest pulls more nitrogen out of the field every season than lightning and root bacteria can put back in."
                kh="វដ្តអាសូតរបស់ធម្មជាតិគឺយឺត និងស្ថិតស្ថេរ — ល្អឥតខ្ចោះសម្រាប់ព្រៃ។ ប៉ុន្តែស្រែស្រូវដែលត្រូវចិញ្ចឹមគ្រួសារ កំពុងស្នើដីឱ្យធ្វើការអាសូតច្រើនជាងវដ្តធម្មជាតិតែឯងអាចតាមទាន់។ ការប្រមូលផល ទាញអាសូតចេញពីស្រែគ្រប់រដូវច្រើនជាងផ្គររន្ទះ និងបាក់តេរីឫសអាចដាក់ចូលវិញ។"
              />
            </p>

            {/* Two methods of adding nitrates */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
              <FertilizerMethod
                icon={Leaf}
                tone="emerald"
                labelEn="Natural compost"
                labelKh="ជីកំប៉ុស្តធម្មជាតិ"
                bodyEn="Animal manure, decomposed plants, and rice straw release ammonia and nitrates as they break down. Slower, gentler, and free."
                bodyKh="ជីសត្វ រុក្ខជាតិដែលរលួយ និងចំបើងស្រូវ បញ្ចេញអាម៉ូញាក់ និងនីត្រាត ពេលពួកវារលួយ។ យឺតជាង ស្រាលជាង និងឥតគិតថ្លៃ។"
              />
              <FertilizerMethod
                icon={Factory}
                tone="amber"
                labelEn="Synthetic fertilizer"
                labelKh="ជីគីមីសំយោគ"
                bodyEn="Bags of urea or ammonium nitrate, made by the Haber-Bosch process. Fast, concentrated, and predictable — but bought, not grown."
                bodyKh="បាវអ៊ុយរ៉េ ឬអាម៉ូញ៉ូមនីត្រាត ដែលផលិតដោយដំណើរការ Haber-Bosch។ លឿន ប្រមូលផ្ដុំ និងព្យាករបាន — ប៉ុន្តែទិញ មិនមែនដាំទេ។"
              />
            </div>

            {/* The big idea */}
            <div className="rounded-2xl bg-white/90 border-2 border-emerald-300 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                  <BL
                    en="Whether you spread compost from a buffalo or a bag of urea from the market, you are doing the same thing — manually adding nitrates (NO₃⁻) to the soil because the natural cycle isn't moving fast enough to support a massive crop yield."
                    kh="មិនថាអ្នកព្រួសជីកំប៉ុស្តពីក្របី ឬបាវអ៊ុយរ៉េពីផ្សារ អ្នកកំពុងធ្វើរឿងតែមួយ — ដាក់នីត្រាត (NO₃⁻) ដោយដៃទៅក្នុងដី ដោយសារវដ្តធម្មជាតិមិនផ្លាស់ទីលឿនល្មមទ្រទ្រង់ផលដំណាំដ៏ច្រើនបានទេ។"
                  />
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-emerald-800/70 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "From the lightning above to the bacteria below — every grain of rice carries atoms that have travelled this loop a thousand times.",
            "ពីផ្គររន្ទះខាងលើ ដល់បាក់តេរីខាងក្រោម — គ្រាប់ស្រូវនីមួយៗយកនូវអាតូមដែលបានធ្វើដំណើរក្នុងរង្វិលនេះមួយពាន់ដង។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function BL({ en, kh }: { en: string; kh: string }) {
  return (
    <span>
      <span>{en}</span>{" "}
      <span className="font-khmer text-slate-600/90">({kh})</span>
    </span>
  );
}

function Chem({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono font-bold text-emerald-800 whitespace-nowrap">
      {children}
    </span>
  );
}

function LeafPattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="leaf-pat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 12 Q56 36 40 68 Q24 36 40 12 Z" fill="#16a34a" />
          <path d="M40 12 L40 68" stroke="#15803d" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-pat)" />
    </svg>
  );
}

function AtmosphereDonut() {
  const cx = 90, cy = 90, r = 60;
  const C = 2 * Math.PI * r;
  // 78% N2, 21% O2, 1% other
  const seg = (frac: number) => frac * C;
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 180 180" className="w-44 h-44 sm:w-52 sm:h-52">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={22} />
        {/* O2 segment (21%) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#0ea5e9"
          strokeWidth={22}
          strokeDasharray={`${seg(0.21)} ${C}`}
          strokeDashoffset={-seg(0.78)}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* N2 segment (78%) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#16a34a"
          strokeWidth={22}
          strokeDasharray={`${seg(0.78)} ${C}`}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-emerald-700 font-bold" style={{ fontSize: 22 }}>
          N₂
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 11 }}>
          78%
        </text>
        <text x={cx + 56} y={cy - 26} textAnchor="middle" className="fill-sky-600 font-semibold" style={{ fontSize: 11 }}>
          O₂
        </text>
        <text x={cx + 56} y={cy - 14} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 9 }}>
          21%
        </text>
      </svg>
    </div>
  );
}

function TripleBondViz() {
  return (
    <div className="mt-4 flex items-center justify-center" data-testid="triple-bond">
      <div className="inline-flex items-center gap-3 sm:gap-4 px-5 py-3 rounded-2xl bg-white/90 border-2 border-emerald-300 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-mono font-extrabold shadow ring-2 ring-emerald-200">
          N
        </div>
        <div className="flex flex-col gap-1.5" aria-label="triple bond">
          <span className="block w-8 sm:w-12 h-1 rounded bg-emerald-700" />
          <span className="block w-8 sm:w-12 h-1 rounded bg-emerald-700" />
          <span className="block w-8 sm:w-12 h-1 rounded bg-emerald-700" />
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-mono font-extrabold shadow ring-2 ring-emerald-200">
          N
        </div>
        <div className="ml-2 text-left">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700">
            Triple bond
          </div>
          <div className="font-khmer text-xs text-emerald-700">ចំណងបី</div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">~945 kJ/mol</div>
        </div>
      </div>
    </div>
  );
}

function CycleLoop() {
  return (
    <div
      className="mt-6 rounded-2xl border-2 border-emerald-300 bg-white/85 backdrop-blur-sm p-4 sm:p-6 shadow-sm"
      data-testid="cycle-loop"
    >
      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-emerald-700 mb-3 text-center inline-flex flex-wrap justify-center gap-x-2 w-full">
        <span>The Loop · រង្វិល</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
        <LoopNode label="N₂" subEn="atmosphere" subKh="បរិយាកាស" tone="sky" />
        <LoopArrow labelEn="fixation" labelKh="កែច្នៃ" />
        <LoopNode label="NH₃" subEn="ammonia" subKh="អាម៉ូញាក់" tone="emerald" />
        <LoopArrow labelEn="nitrification" labelKh="នីទ្រីកម្ម" />
        <LoopNode label="NO₃⁻" subEn="nitrates" subKh="នីត្រាត" tone="amber" />
        <LoopArrow labelEn="absorbed by roots" labelKh="ស្រូបដោយឫស" />
        <LoopNode label="🌾" subEn="plants" subKh="រុក្ខជាតិ" tone="emerald" emoji />
        <LoopArrow labelEn="denitrification" labelKh="ឌីនីទ្រីកម្ម" wrap />
        <LoopNode label="N₂" subEn="back to sky" subKh="ត្រឡប់ទៅមេឃ" tone="sky" />
      </div>
    </div>
  );
}

function LoopNode({
  label,
  subEn,
  subKh,
  tone,
  emoji,
}: {
  label: string;
  subEn: string;
  subKh: string;
  tone: "sky" | "emerald" | "amber";
  emoji?: boolean;
}) {
  const cls =
    tone === "sky"
      ? "from-sky-400 to-sky-600 ring-sky-200"
      : tone === "amber"
      ? "from-amber-400 to-amber-600 ring-amber-200"
      : "from-emerald-500 to-emerald-700 ring-emerald-200";
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${cls} text-white flex items-center justify-center shadow-md ring-2 ${
          emoji ? "text-2xl" : "font-mono font-extrabold text-base sm:text-lg"
        }`}
      >
        {label}
      </div>
      <div className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1.5 leading-none">
        {subEn}
      </div>
      <div className="font-khmer text-[10px] sm:text-xs text-slate-600 leading-snug">
        {subKh}
      </div>
    </div>
  );
}

function LoopArrow({
  labelEn,
  labelKh,
  wrap,
}: {
  labelEn: string;
  labelKh: string;
  wrap?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-emerald-700 ${wrap ? "w-full sm:w-auto" : ""}`}>
      <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 ${wrap ? "rotate-90 sm:rotate-0" : ""}`} strokeWidth={2.5} />
      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-700 leading-none mt-0.5 max-w-[80px] text-center">
        {labelEn}
      </div>
      <div className="font-khmer text-[10px] text-emerald-700 leading-snug max-w-[80px] text-center">
        {labelKh}
      </div>
    </div>
  );
}

type Tone = "sky" | "emerald" | "amber" | "violet";

const TONE: Record<
  Tone,
  { bg: string; text: string; border: string; ring: string; soft: string }
> = {
  sky: {
    bg: "bg-gradient-to-br from-sky-400 to-sky-600",
    text: "text-sky-700",
    border: "border-sky-300",
    ring: "ring-sky-200",
    soft: "bg-sky-50",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    text: "text-emerald-700",
    border: "border-emerald-300",
    ring: "ring-emerald-200",
    soft: "bg-emerald-50",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-400 to-amber-600",
    text: "text-amber-700",
    border: "border-amber-300",
    ring: "ring-amber-200",
    soft: "bg-amber-50",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-400 to-violet-600",
    text: "text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-200",
    soft: "bg-violet-50",
  },
};

function Section({
  number,
  icon: Icon,
  tone,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  children,
  dataTestid,
}: {
  number: number;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: ReactNode;
  dataTestid: string;
}) {
  const T = TONE[tone];
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}>
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[10px] font-bold tracking-[0.25em] uppercase ${T.text} mb-0.5`}>
              Section {number} · ផ្នែកទី {number}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {titleEn}
            </h2>
            <p className="font-khmer text-base sm:text-lg text-slate-700 leading-snug">
              {titleKh}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
              <span className="italic">{subtitleEn}</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer">{subtitleKh}</span>
            </p>
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}

function CycleStep({
  n,
  tone,
  icon: Icon,
  titleEn,
  titleKh,
  formulaFrom,
  formulaMiddle,
  formulaTo,
  fromLabelEn,
  fromLabelKh,
  middleLabelEn,
  middleLabelKh,
  toLabelEn,
  toLabelKh,
  bodyEn,
  bodyKh,
  calloutIcon: CalloutIcon,
  calloutEn,
  calloutKh,
}: {
  n: number;
  tone: Tone;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  titleEn: string;
  titleKh: string;
  formulaFrom: ReactNode;
  formulaMiddle?: ReactNode;
  formulaTo: ReactNode;
  fromLabelEn: string;
  fromLabelKh: string;
  middleLabelEn?: string;
  middleLabelKh?: string;
  toLabelEn: string;
  toLabelKh: string;
  bodyEn: string;
  bodyKh: string;
  calloutIcon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  calloutEn?: string;
  calloutKh?: string;
}) {
  const T = TONE[tone];
  return (
    <article
      className={`rounded-2xl border-2 ${T.border} ${T.soft} backdrop-blur-sm p-5 sm:p-6 shadow-sm`}
      data-testid={`cycle-step-${n}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`relative w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}>
          <Icon className="w-6 h-6" strokeWidth={2.25} />
          <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white ${T.text} text-xs font-extrabold flex items-center justify-center shadow ring-2 ${T.ring}`}>
            {n}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            {titleEn}
          </h3>
          <h4 className="font-khmer text-base sm:text-lg text-slate-700 leading-snug">
            {titleKh}
          </h4>
        </div>
      </div>

      {/* Formula chain */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4 px-2 py-3 rounded-xl bg-white/80 border border-slate-200">
        <FormulaPill formula={formulaFrom} labelEn={fromLabelEn} labelKh={fromLabelKh} />
        <ArrowRight className={`w-5 h-5 ${T.text}`} strokeWidth={2.5} />
        {formulaMiddle && middleLabelEn && middleLabelKh && (
          <>
            <FormulaPill formula={formulaMiddle} labelEn={middleLabelEn} labelKh={middleLabelKh} />
            <ArrowRight className={`w-5 h-5 ${T.text}`} strokeWidth={2.5} />
          </>
        )}
        <FormulaPill formula={formulaTo} labelEn={toLabelEn} labelKh={toLabelKh} />
      </div>

      <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-sm sm:text-base text-slate-800 leading-loose mt-2">
        {bodyKh}
      </p>

      {CalloutIcon && calloutEn && calloutKh && (
        <aside className={`mt-4 rounded-xl border-2 ${T.border} bg-white/80 p-3 sm:p-4 flex items-start gap-3`}>
          <div className={`w-10 h-10 rounded-xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow`}>
            <CalloutIcon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-sm text-slate-800 leading-relaxed font-semibold">
              {calloutEn}
            </p>
            <p className="font-khmer text-sm text-slate-800 leading-loose mt-1">
              {calloutKh}
            </p>
          </div>
        </aside>
      )}
    </article>
  );
}

function FormulaPill({
  formula,
  labelEn,
  labelKh,
}: {
  formula: ReactNode;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="text-center">
      <div className="px-3 py-2 rounded-lg bg-emerald-100 border-2 border-emerald-300 text-base sm:text-lg">
        {formula}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">
        {labelEn}
      </div>
      <div className="font-khmer text-[10px] text-slate-600 leading-snug">
        {labelKh}
      </div>
    </div>
  );
}

function FertilizerMethod({
  icon: Icon,
  tone,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const T = TONE[tone];
  return (
    <div className={`rounded-2xl border-2 ${T.border} bg-white/90 p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}>
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
            {labelEn}
          </div>
          <div className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug">
            {labelKh}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">{bodyEn}</p>
          <p className="font-khmer text-xs sm:text-sm text-slate-700 leading-loose mt-1">
            {bodyKh}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Suppress unused-import warnings for icons retained for semantic clarity */
void Sun;
void Droplet;
