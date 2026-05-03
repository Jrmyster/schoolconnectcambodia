import { Link } from "wouter";
import {
  ArrowLeft,
  Factory,
  Wheat,
  Gauge,
  FlaskConical,
  Thermometer,
  Wind,
  Sparkles,
  Globe2,
  Scale,
  AlertTriangle,
  CircleDot,
} from "lucide-react";
import { BlockMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * The Haber-Bosch Process · ដំណើរការ Haber-Bosch
 * Module: Chemistry → Equilibrium & Kinetics (Physical Chemistry)
 * Aesthetic: clean whites + steel grays + glowing gas blues & greens.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function HaberBoschProcessPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="haber-bosch-page"
    >
      {/* Subtle blueprint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient gas glow */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full bg-sky-300/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full bg-emerald-300/20 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/science/chemistry/physical"
          data-testid="link-back-to-physical"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t(
            "Back to Physical Chemistry",
            "ត្រឡប់ទៅគីមីរូបវិទ្យា",
          )}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-sky-200/60 relative">
              <Factory className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.25} />
              <span
                aria-hidden
                className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/40 animate-pulse"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-sky-700 mb-1.5`}
              >
                <FlaskConical className="w-3 h-3" />
                <span>Module 07 · Equilibrium &amp; Kinetics</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs">
                  មុខវិជ្ជា ០៧ · សមតុល្យ និង​គីនេទិក
                </span>
              </span>
              <h1
                id="haber-bosch-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight"
                data-testid="page-title"
              >
                The Haber-Bosch Process:{" "}
                <span className="text-emerald-700">The Reaction That Feeds the World</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-700 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                ដំណើរការ Haber-Bosch៖{" "}
                <span className="text-emerald-700">ប្រតិកម្មដែលចិញ្ចឹមពិភពលោក</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "How chemists learned to grab nitrogen out of thin air, force it to bond with hydrogen, and turn the result into the synthetic fertilizer that grows nearly half of the world's food.",
              "របៀបដែលគីមីវិទូរៀនចាប់យកអាសូតចេញពីខ្យល់ស្ដើង បង្ខំវាឱ្យភ្ជាប់ចំណងជាមួយអ៊ីដ្រូសែន ហើយបំប្លែងជាជីសំយោគដែលដាំស្ទើរតែពាក់កណ្ដាលនៃអាហារពិភពលោក។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Equation ─────────────────────────────── */}
        <Section
          number={1}
          icon={FlaskConical}
          tone="sky"
          titleEn="The Equation"
          titleKh="សមីការគីមី"
          subtitleEn="Air + Energy → Food"
          subtitleKh="ខ្យល់ + ថាមពល → អាហារ"
          dataTestid="section-equation"
        >
          {/* Equation showcase */}
          <div
            className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/60 to-white p-6 sm:p-8 shadow-sm relative overflow-hidden mb-5"
            data-testid="equation-card"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-300/30 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-300/30 blur-2xl"
            />
            <div className="relative">
              <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-slate-500 mb-3 text-center inline-flex w-full justify-center flex-wrap gap-x-2 gap-y-0.5">
                <span>The Reversible Reaction</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs">
                  ប្រតិកម្ម​ដែល​ត្រឡប់​បាន
                </span>
              </div>
              <div
                className="text-center text-2xl sm:text-3xl md:text-4xl"
                data-testid="reaction-equation"
              >
                <BlockMath math={"N_{2}\\;(g)\\; + \\;3\\,H_{2}\\;(g)\\; \\rightleftharpoons \\;2\\,NH_{3}\\;(g)\\; + \\;\\text{Heat}"} />
              </div>
              {/* Gas chips */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <GasChip
                  symbol="N₂"
                  nameEn="Nitrogen"
                  nameKh="អាសូត"
                  color="sky"
                />
                <span className="text-slate-400 font-bold" aria-hidden>+</span>
                <GasChip
                  symbol="3H₂"
                  nameEn="Hydrogen"
                  nameKh="អ៊ីដ្រូសែន"
                  color="emerald"
                />
                <span className="text-slate-400 font-bold" aria-hidden>⇌</span>
                <GasChip
                  symbol="2NH₃"
                  nameEn="Ammonia · អាម៉ូញាក់"
                  nameKh="អាម៉ូញាក់"
                  color="violet"
                  hideKhSubtitle
                />
                <span className="text-slate-400 font-bold" aria-hidden>+</span>
                <GasChip
                  symbol="🔥"
                  nameEn="Heat"
                  nameKh="កម្ដៅ"
                  color="amber"
                />
              </div>
            </div>
          </div>

          {/* Ingredient explanation */}
          <div className="grid md:grid-cols-3 gap-4">
            <IngredientCard
              icon={Wind}
              tone="sky"
              titleEn="Step 1 · Pull Nitrogen from Thin Air"
              titleKh="ជំហានទី១ · ទាញ​អាសូត​ចេញ​ពី​ខ្យល់​ស្ដើង"
              bodyEn="The air around you is already 78% nitrogen (N₂) — but two nitrogen atoms are bonded together so tightly that plants and animals cannot use it directly."
              bodyKh="ខ្យល់​ជុំវិញ​អ្នក​មាន​អាសូត (N₂) រួច​ជា​ស្រេច​ ៧៨% — ប៉ុន្តែ​អាតូម​អាសូត​ពីរ​ភ្ជាប់​គ្នា​យ៉ាង​តឹង​ ដូច្នេះ​រុក្ខជាតិ​ និង​សត្វ​មិន​អាច​ប្រើ​វា​ផ្ទាល់​បាន​ទេ។"
              testid="ingredient-nitrogen"
            />
            <IngredientCard
              icon={Sparkles}
              tone="emerald"
              titleEn="Step 2 · Add Hydrogen"
              titleKh="ជំហានទី២ · បន្ថែម​អ៊ីដ្រូសែន"
              bodyEn="Mix the nitrogen with hydrogen gas (H₂), usually pulled from natural gas (methane) or — increasingly — from water using clean electricity."
              bodyKh="លាយ​អាសូត​ជាមួយ​ហ្គាស​អ៊ីដ្រូសែន (H₂) ដែល​ភាគ​ច្រើន​យក​ចេញ​ពី​ហ្គាស​ធម្មជាតិ (មេតាន) — ឬ​កាន់​តែ​ច្រើន​ឡើង​ពី​ទឹក​ដោយ​ប្រើ​អគ្គិសនី​ស្អាត។"
              testid="ingredient-hydrogen"
            />
            <IngredientCard
              icon={Wheat}
              tone="amber"
              titleEn="Step 3 · Make Ammonia (NH₃)"
              titleKh="ជំហានទី៣ · បង្កើត​អាម៉ូញាក់ (NH₃)"
              bodyEn="The product, ammonia (អាម៉ូញាក់), is the base ingredient for every synthetic fertilizer that grows the world's food — wheat, rice, corn, vegetables."
              bodyKh="ផលិតផល​គឺ​អាម៉ូញាក់ (NH₃) — សារធាតុ​មូលដ្ឋាន​សម្រាប់​ជី​សំយោគ​ទាំងអស់​ដែល​ដាំ​អាហារ​ពិភពលោក — ស្រូវ​សាលី អង្ករ ពោត បន្លែ។"
              testid="ingredient-ammonia"
            />
          </div>
        </Section>

        {/* ── Section 2: Le Chatelier's Principle ──────────────────── */}
        <Section
          number={2}
          icon={Scale}
          tone="emerald"
          titleEn="Le Chatelier's Principle"
          titleKh="គោលការណ៍​របស់ Le Chatelier"
          subtitleEn="The Great Chemical Compromise"
          subtitleKh="ការ​សម្រុះ​សម្រួល​គីមី​ដ៏​ធំ"
          dataTestid="section-le-chatelier"
        >
          {/* Reversibility callout */}
          <div
            className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/70 p-4 sm:p-5 mb-5 flex items-start gap-3"
            data-testid="reversibility-note"
          >
            <CircleDot className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-900 text-sm sm:text-base inline-flex flex-wrap gap-x-2 gap-y-0.5">
                <span>The reaction goes both ways</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer">ប្រតិកម្ម​ដំណើរការ​ទាំង​ពីរ​ផ្លូវ</span>
              </h3>
              <p className="text-sm text-emerald-900/85 leading-relaxed mt-1">
                <BL
                  en="Look at that double arrow ⇌ in the equation. The reaction is reversible — the ammonia we just made will happily break right back apart into nitrogen and hydrogen gas. To get any useful amount, we have to outsmart the equilibrium."
                  kh="សម្លឹង​មើល​ព្រួញ​ទ្វេ ⇌ ក្នុង​សមីការ។ ប្រតិកម្ម​ត្រឡប់​បាន — អាម៉ូញាក់​ដែល​ទើប​បង្កើត​នឹង​បំបែក​ត្រឡប់​ទៅ​ជា​ហ្គាស​អាសូត និង​អ៊ីដ្រូសែន​វិញ។ ដើម្បី​បាន​បរិមាណ​មាន​ប្រយោជន៍ យើង​ត្រូវ​ឆ្លាត​ជាង​សមតុល្យ។"
                />
              </p>
            </div>
          </div>

          {/* The 3 levers */}
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <LeverCard
              icon={Gauge}
              tone="sky"
              labelEn="Pressure"
              labelKh="សម្ពាធ"
              valueEn="200 atm"
              valueKh="២០០ បរិយាកាស"
              bodyEn="Squeezing the gases together at extreme pressure forces 4 molecules of gas (N₂ + 3H₂) to collapse into just 2 molecules (2NH₃). Equilibrium shifts toward fewer molecules — toward ammonia."
              bodyKh="ការ​ច្របាច់​ហ្គាស​នៅ​សម្ពាធ​ខ្លាំង​បង្ខំ​ម៉ូលេគុល ៤ (N₂ + 3H₂) ឱ្យ​ប្រែ​ជា​ម៉ូលេគុល​តែ ២ (2NH₃)។ សមតុល្យ​ផ្លាស់​ទៅ​ខាង​ម៉ូលេគុល​តិច​ជាង — គឺ​ទៅ​ខាង​អាម៉ូញាក់។"
              testid="lever-pressure"
            />
            <LeverCard
              icon={Thermometer}
              tone="amber"
              labelEn="Temperature"
              labelKh="សីតុណ្ហភាព"
              valueEn="~ 450 °C"
              valueKh="~ ៤៥០ °C"
              bodyEn="Tricky: the reaction releases heat, so cooling pushes the equilibrium toward ammonia — but cold makes it crawl. Too hot and the ammonia breaks apart. Scientists settle on a medium temperature: fast enough to be profitable, cool enough to keep the product."
              bodyKh="ស្មុគ្រស្មាញ៖ ប្រតិកម្ម​បញ្ចេញ​កម្ដៅ ដូច្នេះ​ការ​ត្រជាក់​រុញ​សមតុល្យ​ទៅ​ខាង​អាម៉ូញាក់ — ប៉ុន្តែ​ត្រជាក់​ពេក​ធ្វើ​ឱ្យ​វា​យឺត​ខ្លាំង។ ក្ដៅ​ពេក អាម៉ូញាក់​បំបែក។ អ្នក​វិទ្យាសាស្ត្រ​ជ្រើសរើស​សីតុណ្ហភាព​មធ្យម៖ លឿន​គ្រប់គ្រាន់​ដើម្បី​ចំណេញ ហើយ​ត្រជាក់​គ្រប់គ្រាន់​ដើម្បី​រក្សា​ផលិតផល។"
              testid="lever-temperature"
            />
            <LeverCard
              icon={Sparkles}
              tone="violet"
              labelEn="Iron Catalyst"
              labelKh="កាតាលីករ​ដែក"
              valueEn="Fe + promoters"
              valueKh="Fe + សារធាតុ​ជំរុញ"
              bodyEn="A pellet of iron (with traces of K₂O and Al₂O₃) speeds the reaction up by a factor of millions without being used up. The catalyst doesn't change where equilibrium sits — it just lets us reach it in seconds instead of years."
              bodyKh="គ្រាប់​ដែក (ដែល​មាន​សម្រ​នៃ K₂O និង Al₂O₃) ពន្លឿន​ប្រតិកម្ម​រាប់​លាន​ដង​ ដោយ​មិន​ត្រូវ​ចំណាយ​ខ្លួន​ចេញ។ កាតាលីករ​មិន​ផ្លាស់​ទីតាំង​សមតុល្យ​ទេ — វា​គ្រាន់តែ​អនុញ្ញាត​ឱ្យ​យើង​ឈាន​ដល់​វា​ក្នុង​វិនាទី​ជំនួស​ឱ្យ​ឆ្នាំ។"
              testid="lever-catalyst"
            />
          </div>

          {/* The compromise summary */}
          <div
            className="rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
            data-testid="compromise-summary"
          >
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>The Solution: Three Levers, One Compromise</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer">ដំណោះស្រាយ៖ លី​វៀ​បី ការ​សម្រុះ​សម្រួល​មួយ</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <BL
                en="Crank the pressure up to 200 atmospheres (200× normal air pressure), settle on a medium 450 °C, and pour the gas mixture across an iron catalyst — and only then does the reaction become fast enough, and produce enough ammonia, to feed a planet."
                kh="បង្កើន​សម្ពាធ​ដល់ ២០០ បរិយាកាស (២០០ ដង​នៃ​សម្ពាធ​ខ្យល់​ធម្មតា) ជ្រើស​សីតុណ្ហភាព​មធ្យម ៤៥០ °C ហើយ​ចាក់​ល្បាយ​ហ្គាស​ឆ្លងកាត់​កាតាលីករ​ដែក — ទើប​ប្រតិកម្ម​លឿន​គ្រប់គ្រាន់ និង​ផលិត​អាម៉ូញាក់​គ្រប់គ្រាន់​ដើម្បី​ចិញ្ចឹម​ភពមួយ។"
              />
            </p>
          </div>
        </Section>

        {/* ── Section 3: Escaping Scarcity ──────────────────────────── */}
        <Section
          number={3}
          icon={Globe2}
          tone="violet"
          titleEn="Escaping Scarcity"
          titleKh="ការ​ជម្នះ​ភាពខ្វះខាត"
          subtitleEn="Why 8 billion people are alive today"
          subtitleKh="ហេតុ​អ្វី​មនុស្ស​ ៨ ពាន់​លាន​នាក់​នៅ​រស់​សព្វថ្ងៃ"
          dataTestid="section-scarcity"
        >
          <div
            className="relative rounded-3xl overflow-hidden border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 sm:p-8 shadow-lg"
            data-testid="scarcity-highlight-box"
          >
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-300/40 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-sky-300/40 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                <Wheat className="w-3.5 h-3.5" />
                <span>Science meets History</span>
                <span className="opacity-70" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal">វិទ្យាសាស្ត្រ​ជួប​ប្រវត្តិសាស្ត្រ</span>
              </div>

              {/* Big stat row */}
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 items-end">
                <BigStat
                  number="4 B"
                  labelEn="Without Haber-Bosch"
                  labelKh="ដោយ​គ្មាន Haber-Bosch"
                  helpEn="The maximum population Earth's natural nitrogen cycle can feed."
                  helpKh="ចំនួន​ប្រជាជន​អតិបរមា​ដែល​វដ្ត​អាសូត​ធម្មជាតិ​នៃ​ផែនដី​អាច​ចិញ្ចឹម។"
                  tone="slate"
                  testid="stat-without"
                />
                <div className="hidden sm:flex items-center justify-center text-3xl text-slate-400 font-bold pb-6">
                  →
                </div>
                <BigStat
                  number="8 B"
                  labelEn="With Haber-Bosch"
                  labelKh="ជាមួយ Haber-Bosch"
                  helpEn="Today's actual population — roughly half of us depend on synthetic ammonia for our food."
                  helpKh="ចំនួន​ប្រជាជន​សព្វថ្ងៃ​ពិត — ប្រហែល​ពាក់​កណ្ដាល​នៃ​យើង​ពឹង​ផ្អែក​លើ​អាម៉ូញាក់​សំយោគ​សម្រាប់​អាហារ។"
                  tone="emerald"
                  testid="stat-with"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                <BL
                  en="Without this single inorganic reaction, the Earth could only grow enough food for about 4 billion people. This chemical engineering breakthrough — squeezing nitrogen out of the air on an industrial scale — is the reason 8 billion people are alive today. Almost half of the protein in your body once passed through a Haber-Bosch reactor."
                  kh="ដោយ​គ្មាន​ប្រតិកម្ម​អសរីរាង្គ​តែ​មួយ​នេះ ផែនដី​អាច​ដាំ​បាន​អាហារ​គ្រប់គ្រាន់​សម្រាប់​មនុស្ស​ត្រឹម ៤ ពាន់​លាន​នាក់។ ការ​ច្នៃ​ប្រឌិត​វិស្វកម្ម​គីមី​នេះ — ការ​ច្របាច់​អាសូត​ចេញ​ពី​ខ្យល់​នៅ​កម្រិត​ឧស្សាហកម្ម — គឺ​ជា​មូលហេតុ​ដែល​មនុស្ស ៨ ពាន់​លាន​នាក់​នៅ​រស់​សព្វថ្ងៃ។ ស្ទើរតែ​ពាក់​កណ្ដាល​នៃ​ប្រូតេអ៊ីន​ក្នុង​រាងកាយ​អ្នក​ធ្លាប់​ឆ្លងកាត់​ឧបករណ៍ប្រតិកម្ម Haber-Bosch។"
                />
              </p>

              {/* Honest footnote */}
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 p-3 sm:p-4 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <BL
                    en="The same reaction also consumes about 1–2% of the world's energy and is one of the largest single sources of industrial CO₂. Decarbonising ammonia (using green hydrogen instead of fossil methane) is one of the great chemistry challenges of this century."
                    kh="ប្រតិកម្ម​ដដែល​ប្រើ​ប្រហែល ១–២% នៃ​ថាមពល​ពិភពលោក និង​ជា​ប្រភព​មួយ​ក្នុង​ចំណោម​ប្រភព​ធំ​បំផុត​នៃ CO₂ ឧស្សាហកម្ម។ ការ​បន្ថយ​កាបូន​នៅ​ក្នុង​អាម៉ូញាក់ (ប្រើ​អ៊ីដ្រូសែន​បៃតង​ជំនួស​មេតាន​ហ្វូស៊ីល) គឺ​ជា​បញ្ហា​គីមី​ដ៏​ធំ​មួយ​នៃ​សតវត្ស​នេះ។"
                  />
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-slate-500 italic ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Fritz Haber discovered the lab reaction in 1909. Carl Bosch scaled it to industry by 1913. Both were awarded the Nobel Prize.",
            "Fritz Haber រកឃើញ​ប្រតិកម្ម​មន្ទីរពិសោធន៍​ក្នុង​ឆ្នាំ ១៩០៩។ Carl Bosch ពង្រីក​វា​ទៅ​កម្រិត​ឧស្សាហកម្ម​ត្រឹម​ឆ្នាំ ១៩១៣។ ទាំង​ពីរ​នាក់​បាន​ទទួល​រង្វាន់​ណូបែល។",
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

type Tone = "sky" | "emerald" | "amber" | "violet" | "slate";

const TONE_HEADING: Record<Tone, { ring: string; bg: string; text: string; chip: string }> = {
  sky: {
    ring: "ring-sky-200",
    bg: "bg-gradient-to-br from-sky-500 to-blue-600",
    text: "text-sky-700",
    chip: "bg-sky-100 text-sky-800 border-sky-200",
  },
  emerald: {
    ring: "ring-emerald-200",
    bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    text: "text-emerald-700",
    chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  amber: {
    ring: "ring-amber-200",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
    text: "text-amber-700",
    chip: "bg-amber-100 text-amber-800 border-amber-200",
  },
  violet: {
    ring: "ring-violet-200",
    bg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    text: "text-violet-700",
    chip: "bg-violet-100 text-violet-800 border-violet-200",
  },
  slate: {
    ring: "ring-slate-200",
    bg: "bg-gradient-to-br from-slate-500 to-slate-700",
    text: "text-slate-700",
    chip: "bg-slate-100 text-slate-800 border-slate-200",
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
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: React.ReactNode;
  dataTestid: string;
}) {
  const T = TONE_HEADING[tone];
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}
          >
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-[10px] font-bold tracking-[0.25em] uppercase ${T.text} mb-0.5`}
            >
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

function GasChip({
  symbol,
  nameEn,
  nameKh,
  color,
  hideKhSubtitle,
}: {
  symbol: string;
  nameEn: string;
  nameKh: string;
  color: "sky" | "emerald" | "violet" | "amber";
  hideKhSubtitle?: boolean;
}) {
  const map = {
    sky: "bg-sky-50 border-sky-300 text-sky-900 shadow-[0_0_18px_rgba(56,189,248,0.35)]",
    emerald:
      "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-[0_0_18px_rgba(52,211,153,0.35)]",
    violet:
      "bg-violet-50 border-violet-300 text-violet-900 shadow-[0_0_18px_rgba(167,139,250,0.35)]",
    amber:
      "bg-amber-50 border-amber-300 text-amber-900 shadow-[0_0_18px_rgba(251,191,36,0.35)]",
  } as const;
  return (
    <span
      className={`inline-flex flex-col items-center px-3 py-2 rounded-xl border-2 ${map[color]} min-w-[88px]`}
    >
      <span className="text-base sm:text-lg font-extrabold leading-tight">{symbol}</span>
      <span className="text-[10px] font-bold mt-0.5 leading-tight text-center">{nameEn}</span>
      {!hideKhSubtitle && (
        <span className="text-[10px] font-bold font-khmer leading-tight text-center opacity-85">
          {nameKh}
        </span>
      )}
    </span>
  );
}

function IngredientCard({
  icon: Icon,
  tone,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  testid,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  testid: string;
}) {
  const T = TONE_HEADING[tone];
  return (
    <article
      className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
      data-testid={testid}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${T.bg} text-white shadow ring-2 ${T.ring}`}
          aria-hidden
        >
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {titleEn}
          </h3>
          <h4 className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug mt-0.5">
            {titleKh}
          </h4>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-sm text-slate-700 leading-loose mt-2">{bodyKh}</p>
    </article>
  );
}

function LeverCard({
  icon: Icon,
  tone,
  labelEn,
  labelKh,
  valueEn,
  valueKh,
  bodyEn,
  bodyKh,
  testid,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  labelEn: string;
  labelKh: string;
  valueEn: string;
  valueKh: string;
  bodyEn: string;
  bodyKh: string;
  testid: string;
}) {
  const T = TONE_HEADING[tone];
  return (
    <article
      className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm relative overflow-hidden"
      data-testid={testid}
    >
      <div
        aria-hidden
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${T.bg} opacity-15 blur-2xl`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${T.bg} text-white shadow ring-2 ${T.ring}`}
            aria-hidden
          >
            <Icon className="w-5 h-5" strokeWidth={2.25} />
          </span>
          <div className="text-right">
            <div className={`text-base sm:text-lg font-extrabold ${T.text} leading-tight`}>
              {valueEn}
            </div>
            <div className="font-khmer text-[11px] text-slate-500 leading-tight mt-0.5">
              {valueKh}
            </div>
          </div>
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-tight">{labelEn}</h3>
        <h4 className="font-khmer text-sm text-slate-700 leading-snug mt-0.5 mb-3">
          {labelKh}
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">{bodyEn}</p>
        <p className="font-khmer text-sm text-slate-700 leading-loose mt-2">{bodyKh}</p>
      </div>
    </article>
  );
}

function BigStat({
  number,
  labelEn,
  labelKh,
  helpEn,
  helpKh,
  tone,
  testid,
}: {
  number: string;
  labelEn: string;
  labelKh: string;
  helpEn: string;
  helpKh: string;
  tone: "slate" | "emerald";
  testid: string;
}) {
  const T = TONE_HEADING[tone];
  const borderClass =
    tone === "emerald" ? "border-emerald-300" : "border-slate-300";
  return (
    <div
      className={`rounded-2xl border-2 ${borderClass} bg-white/80 backdrop-blur p-4 sm:p-5 shadow text-center`}
      data-testid={testid}
    >
      <div
        className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${T.text} leading-none mb-1`}
      >
        {number}
      </div>
      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{labelEn}</div>
      <div className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug mt-0.5">
        {labelKh}
      </div>
      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-2">{helpEn}</p>
      <p className="font-khmer text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1.5">
        {helpKh}
      </p>
    </div>
  );
}
