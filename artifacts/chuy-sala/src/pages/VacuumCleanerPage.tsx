import { Link } from "wouter";
import {
  ArrowLeft,
  Fan,
  Filter,
  Wind,
  Zap,
  Gauge,
  ArrowRight,
  ArrowDown,
  Snowflake,
  Thermometer,
  AlertTriangle,
  Cog,
  Ruler,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * The Pressure Drop: How Vacuum Cleaners Work
 * ការធ្លាក់ចុះសម្ពាធ៖ របៀបដែលម៉ាស៊ីនបូមធូលីដំណើរការ
 * Module: Technology → HVAC & Mechanics
 * Aesthetic: blueprint — navy blues, grid lines, industrial mono.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function VacuumCleanerPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden text-slate-100 py-8 sm:py-10 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, #0a1226 0%, #0e1a36 50%, #0a1226 100%)",
      }}
      data-testid="vacuum-cleaner-page"
    >
      {/* Blueprint grid backdrop */}
      <BlueprintGrid />
      {/* Subtle airflow streamers */}
      <Streamers />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/hvac"
          data-testid="link-back-to-hvac"
          className={`inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-cyan-300 hover:text-cyan-100 transition-colors mb-6 ${
            kh ? "font-khmer font-normal" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to HVAC", "ត្រឡប់ទៅ HVAC")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-[0_0_24px_rgba(34,211,238,0.45)] flex items-center justify-center">
                <Fan className="w-8 h-8 sm:w-9 sm:h-9 text-white animate-[vacspin_4s_linear_infinite]" strokeWidth={2.25} />
              </div>
              <span aria-hidden className="absolute inset-0 rounded-2xl ring-2 ring-cyan-300/30" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-1.5">
                <Cog className="w-3 h-3" />
                <span>HVAC · Mechanics</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300">
                  HVAC · មេកានិច
                </span>
              </span>
              <h1
                id="vacuum-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                  The Pressure Drop:
                </span>{" "}
                <span className="text-white">How Vacuum Cleaners Work</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-200 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                  ការធ្លាក់ចុះសម្ពាធ៖
                </span>{" "}
                <span>របៀបដែលម៉ាស៊ីនបូមធូលីដំណើរការ</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "A vacuum cleaner doesn't 'suck' anything. It can't. The trick is far simpler — and far more elegant. A motor pushes air out, the air pressure inside drops, and the heavy atmosphere outside rushes in to fill the void, dragging dust along for the ride.",
              "ម៉ាស៊ីនបូមធូលីមិនបាន «បឺត» អ្វីទាំងអស់ទេ។ វាមិនអាចទេ។ ល្បិចគឺសាមញ្ញជាងនេះ — ហើយឆើតឆាយជាង។ ម៉ូទ័រច្រានខ្យល់ចេញ សម្ពាធខ្យល់ខាងក្នុងធ្លាក់ចុះ ហើយបរិយាកាសដ៏ធ្ងន់ខាងក្រៅប្រញាប់ចូលក្នុងដើម្បីបំពេញទីទេរ ដោយអូសធូលីជាមួយវា។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Illusion of Sucking ─────────────────── */}
        <Section
          number={1}
          icon={Wind}
          titleEn="The Illusion of 'Sucking'"
          titleKh="ការយល់ច្រឡំអំពី «ការបឺត»"
          subtitleEn="Nothing actually pulls — the air outside pushes"
          subtitleKh="គ្មានអ្វីពិតជាទាញនោះទេ — ខ្យល់ខាងក្រៅជាអ្នកច្រាន"
          dataTestid="section-illusion"
        >
          <BlueprintCard testid="illusion-explainer">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              <BL
                en="A vacuum cleaner does not reach out and grab dirt. It can't — air can't pull on anything. What actually happens is hidden inside the casing:"
                kh="ម៉ាស៊ីនបូមធូលីមិនបានលូកដៃចាប់ធូលីទេ។ វាមិនអាចទេ — ខ្យល់មិនអាចទាញអ្វីបានទេ។ អ្វីដែលកើតឡើងពិតៗគឺត្រូវបានលាក់នៅក្នុងប្រអប់៖"
              />
            </p>

            <ol className="mt-4 space-y-3">
              <Step
                n={1}
                icon={Zap}
                en={"An "}
                enBold="electric motor"
                enRest=" spins a fan."
                kh="«ម៉ូទ័រអគ្គិសនី» បង្វិលកង្ហារ។"
              />
              <Step
                n={2}
                icon={Fan}
                en={"The fan blades "}
                enBold="push air out"
                enRest=" of the back of the machine, through the exhaust."
                kh="ស្លាបកង្ហារ «ច្រានខ្យល់ចេញ» ពីខាងក្រោយម៉ាស៊ីន តាមរន្ធបញ្ចេញខ្យល់។"
              />
              <Step
                n={3}
                icon={Gauge}
                en={"This leaves behind a "}
                enBold="low-pressure zone"
                enRest=" — a partial vacuum — inside the machine."
                kh="នេះទុកឱ្យមាន «តំបន់សម្ពាធទាប» — សុញ្ញកាសផ្នែកមួយ — នៅខាងក្នុងម៉ាស៊ីន។"
              />
              <Step
                n={4}
                icon={Wind}
                en={"The atmosphere in your room is at much "}
                enBold="higher pressure"
                enRest=", so it aggressively pushes air (and any dirt in the way) into the inlet to fill the void."
                kh="បរិយាកាសក្នុងបន្ទប់របស់អ្នកមាន «សម្ពាធខ្ពស់ជាង» ដូច្នេះវាច្រានខ្យល់ (និងធូលីដែលនៅផ្លូវ) ចូលរន្ធទាញដើម្បីបំពេញទីទេរ។"
              />
            </ol>
          </BlueprintCard>

          {/* Pressure diagram */}
          <PressureDiagram />

          {/* Big highlight */}
          <div
            className="mt-5 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 p-5 sm:p-6 backdrop-blur-sm"
            data-testid="illusion-keypoint"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(34,211,238,0.5)]">
                <AlertTriangle className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-cyan-200 leading-tight">
                  You aren't pulling. The atmosphere is pushing.
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-cyan-100/90 leading-snug mt-1">
                  អ្នកមិនបានទាញទេ។ បរិយាកាសកំពុងច្រាន។
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  <BL
                    en="At sea level, every square centimetre of your room is being pressed by 1.03 kg of air. The vacuum just makes a small empty spot — and the sky leans in to fill it."
                    kh="នៅកម្រិតសមុទ្រ ម៉ែត្រការ៉េនីមួយៗនៃបន្ទប់របស់អ្នកត្រូវបានច្រានដោយខ្យល់ ១,០៣ គ.ក្រ។ ម៉ាស៊ីនបូមធូលីគ្រាន់តែបង្កើតចំណុចទទេតូចមួយ — ហើយមេឃទម្រេតចូលដើម្បីបំពេញវា។"
                  />
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Section 2: Core Components ──────────────────────────── */}
        <Section
          number={2}
          icon={Cog}
          titleEn="The Core Components"
          titleKh="សមាសធាតុស្នូល"
          subtitleEn="Three parts, one airflow"
          subtitleKh="បីផ្នែក ខ្យល់ហូរតែមួយ"
          dataTestid="section-components"
        >
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <ComponentCard
              icon={Zap}
              tagEn="Part 1 · The engine"
              tagKh="ផ្នែកទី ១ · ម៉ាស៊ីន"
              titleEn="The Electric Motor & Fan"
              titleKh="ម៉ូទ័រអគ្គិសនី និងកង្ហារ"
              bodyEn="A small but powerful electric motor — usually spinning between 10,000 and 30,000 revolutions per minute — is bolted directly to a fan. The fan's curved blades fling air out the back of the machine. The faster the motor spins, the more air is pushed out per second, and the deeper the partial vacuum it leaves behind."
              bodyKh="ម៉ូទ័រអគ្គិសនីតូចតែមានកម្លាំងខ្លាំង — ជាធម្មតាបង្វិលរវាង ១០,០០០ ទៅ ៣០,០០០ ជុំក្នុងមួយនាទី — ត្រូវបានបិទភ្ជាប់ដោយផ្ទាល់ទៅកង្ហារ។ ស្លាបកង់ពោងរបស់កង្ហារគ្រវែងខ្យល់ចេញពីខាងក្រោយម៉ាស៊ីន។ ម៉ូទ័របង្វិលលឿនជាង ខ្យល់ត្រូវច្រានចេញក្នុងមួយវិនាទីច្រើនជាង ហើយសុញ្ញកាសផ្នែកដែលវាទុកនៅក្រោយជ្រៅជាង។"
              testid="component-motor"
              accent="cyan"
            />
            <ComponentCard
              icon={Filter}
              tagEn="Part 2 · The lungs"
              tagKh="ផ្នែកទី ២ · សួត"
              titleEn="The Filter"
              titleKh="តម្រង"
              bodyEn="Crucial. The air being shoved into the machine is full of dust, fibres, hair, pollen, and microscopic mites. Without a filter, all of that would fly straight through the fan and out the exhaust — your vacuum would just blow the dust back into the room. Modern HEPA filters trap particles as small as 0.3 micrometres, letting clean air pass while heavy dirt is held in the bag or bin."
              bodyKh="សំខាន់ណាស់។ ខ្យល់ដែលត្រូវច្រានចូលក្នុងម៉ាស៊ីនពោរពេញដោយធូលី សរសៃ សក់ លំអងផ្កា និងសត្វល្អិតមីក្រូទស្សន៍។ បើគ្មានតម្រងទេ ទាំងអស់នោះនឹងហោះកាត់កង្ហារចេញតាមរន្ធបញ្ចេញខ្យល់ — ម៉ាស៊ីនបូមធូលីរបស់អ្នកគ្រាន់តែផ្លុំធូលីត្រឡប់ចូលបន្ទប់វិញ! តម្រង HEPA ទំនើបចាប់យកភាគល្អិតតូចត្រឹម ០,៣ មីក្រូម៉ែត្រ អនុញ្ញាតឱ្យខ្យល់ស្អាតឆ្លងកាត់ ខណៈធូលីធ្ងន់ត្រូវបានចាប់ទុកក្នុងថង់ ឬធុង។"
              testid="component-filter"
              accent="amber"
            />
          </div>

          {/* Airflow path diagram */}
          <AirflowPath />
        </Section>

        {/* ── Section 3: Connecting to HVAC ───────────────────────── */}
        <Section
          number={3}
          icon={Snowflake}
          titleEn="Connecting to HVAC"
          titleKh="ការភ្ជាប់ទៅនឹងប្រព័ន្ធ HVAC"
          subtitleEn="Same physics, bigger pipes"
          subtitleKh="រូបវិទ្យាដូចគ្នា ទុយោធំជាង"
          dataTestid="section-hvac"
        >
          <div
            className="relative rounded-3xl overflow-hidden border-2 border-cyan-400/50 bg-gradient-to-br from-blue-900/40 via-slate-900/60 to-blue-950/40 p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            data-testid="hvac-highlight"
          >
            {/* Faint engineering grid behind */}
            <div aria-hidden className="absolute inset-0 opacity-[0.08]">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="hvac-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#67e8f9" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hvac-grid)" />
              </svg>
            </div>

            <div className="relative">
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-cyan-500 text-blue-950 text-[10px] font-mono font-extrabold uppercase tracking-[0.25em] mb-4 shadow-[0_0_18px_rgba(34,211,238,0.6)]">
                <Snowflake className="w-3.5 h-3.5" />
                <span>The big idea</span>
                <span className="opacity-60" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal">គំនិតសំខាន់</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
                Your air conditioner is a giant vacuum cleaner.
              </h3>
              <h4 className="font-khmer text-base sm:text-lg text-cyan-100 leading-snug mb-4">
                ម៉ាស៊ីនត្រជាក់របស់អ្នកគឺជាម៉ាស៊ីនបូមធូលីយក្ស។
              </h4>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-5">
                <BL
                  en="The same pressure-drop physics that moves air through a vacuum cleaner's small hose moves air through a building's ventilation ducts. A blower fan inside the AC unit pushes cooled air out through one set of ducts, dropping the pressure on the return side. The higher-pressure atmosphere in every room then pushes warm, stale air back through the return vents to be cooled again — the rooms aren't being 'sucked', the outside air is doing the pushing, exactly like the dust at the nozzle of a vacuum."
                  kh="រូបវិទ្យានៃការធ្លាក់ចុះសម្ពាធដូចគ្នានឹងម៉ាស៊ីនបូមធូលីផ្លាស់ទីខ្យល់តាមទុយោតូចរបស់វា ក៏ផ្លាស់ទីខ្យល់តាមទុយោបញ្ចេញខ្យល់របស់អគារដែរ។ កង្ហារប៉ោងនៅខាងក្នុងម៉ាស៊ីនត្រជាក់ច្រានខ្យល់ត្រជាក់ចេញតាមទុយោមួយឈុត ធ្វើឱ្យសម្ពាធធ្លាក់ចុះនៅផ្នែកត្រឡប់។ បរិយាកាសសម្ពាធខ្ពស់ជាងនៅគ្រប់បន្ទប់ច្រានខ្យល់ក្ដៅៗ និងស្ថិតស្ងៀមត្រឡប់តាមរន្ធត្រឡប់ដើម្បីត្រជាក់ឡើងវិញ — បន្ទប់មិនត្រូវ «បឺត» ទេ ខ្យល់ខាងក្រៅជាអ្នកច្រាន ដូចគ្នានឹងធូលីនៅរន្ធម៉ាស៊ីនបូមធូលី។"
                />
              </p>

              {/* Comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <ScaleCard
                  icon={Fan}
                  scaleEn="Small scale"
                  scaleKh="មាត្រដ្ឋានតូច"
                  titleEn="Vacuum cleaner"
                  titleKh="ម៉ាស៊ីនបូមធូលី"
                  detailEn="One motor · one hose · one room"
                  detailKh="ម៉ូទ័រមួយ · ទុយោមួយ · បន្ទប់មួយ"
                />
                <ScaleCard
                  icon={Thermometer}
                  scaleEn="Big scale"
                  scaleKh="មាត្រដ្ឋានធំ"
                  titleEn="Air conditioner & ducts"
                  titleKh="ម៉ាស៊ីនត្រជាក់ និងទុយោ"
                  detailEn="One blower · whole-building ducts · every room"
                  detailKh="កង្ហារប៉ោងមួយ · ទុយោទូទាំងអគារ · គ្រប់បន្ទប់"
                />
              </div>

              <p className="text-xs sm:text-sm text-cyan-200/80 italic mt-5 leading-relaxed">
                <BL
                  en="Every ceiling vent in your school or office is a polite invitation for the high-pressure outside atmosphere to push fresh, cool air across your face — exactly like the dust racing into the nozzle of a vacuum cleaner."
                  kh="រន្ធពិដាននីមួយៗនៅសាលា ឬការិយាល័យរបស់អ្នកគឺជាសេចក្ដីអញ្ជើញសម្រាប់បរិយាកាសសម្ពាធខ្ពស់ខាងក្រៅឱ្យច្រានខ្យល់ស្រស់ ត្រជាក់ឆ្លងកាត់មុខអ្នក — ដូចគ្នាបេះបិទនឹងធូលីដែលប្រណាំងចូលក្នុងរន្ធម៉ាស៊ីនបូមធូលី។"
                />
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-cyan-300/70 italic font-mono ${
            kh ? "font-khmer not-italic font-normal leading-loose" : ""
          }`}
        >
          {t(
            "Atmospheric pressure: 101,325 Pa · 1.03 kg/cm² · 14.7 psi — the invisible weight that makes every breath, every breeze, and every vacuum cleaner possible.",
            "សម្ពាធបរិយាកាស៖ ១០១,៣២៥ Pa · ១,០៣ គ.ក្រ/សម² · ១៤,៧ psi — ទម្ងន់ដែលមើលមិនឃើញ ដែលធ្វើឱ្យរាល់ការដកដង្ហើម រាល់ខ្យល់រំភើយ និងរាល់ម៉ាស៊ីនបូមធូលីអាចកើតមាន។",
          )}
        </p>
      </div>

      <style>{`
        @keyframes vacspin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes vacflow {
          0%   { transform: translateX(-30px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[vacspin_4s_linear_infinite\\],
          .animate-\\[vacflow_3s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function BL({ en, kh }: { en: string; kh: string }) {
  return (
    <span>
      <span>{en}</span>{" "}
      <span className="font-khmer text-slate-400/90">({kh})</span>
    </span>
  );
}

function BlueprintGrid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bp-grid-fine" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#67e8f9" strokeWidth="0.4" />
        </pattern>
        <pattern id="bp-grid-coarse" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-grid-fine)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#22d3ee" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid-coarse)" />
    </svg>
  );
}

function Streamers() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.12]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M -5 18 Q 35 5 65 22 T 110 28" stroke="#67e8f9" fill="none" strokeWidth="0.35" />
        <path d="M -5 48 Q 40 32 70 52 T 110 58" stroke="#7dd3fc" fill="none" strokeWidth="0.35" />
        <path d="M -5 78 Q 30 62 60 80 T 110 84" stroke="#67e8f9" fill="none" strokeWidth="0.35" />
      </svg>
    </div>
  );
}

function Section({
  number,
  icon: Icon,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  children,
  dataTestid,
}: {
  number: number;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: ReactNode;
  dataTestid: string;
}) {
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(34,211,238,0.4)] ring-2 ring-cyan-300/30">
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-0.5">
              §{number} · ផ្នែកទី {number}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {titleEn}
            </h2>
            <p className="font-khmer text-base sm:text-lg text-cyan-100 leading-snug">
              {titleKh}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
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

function BlueprintCard({
  children,
  testid,
}: {
  children: ReactNode;
  testid?: string;
}) {
  return (
    <div
      className="relative rounded-2xl border-2 border-cyan-400/40 bg-blue-950/50 backdrop-blur-sm p-5 sm:p-6 shadow-[0_0_24px_rgba(8,47,73,0.6)]"
      data-testid={testid}
    >
      {/* Engineering corner crosshairs */}
      {([
        ["top-2 left-2", "border-l-2 border-t-2"],
        ["top-2 right-2", "border-r-2 border-t-2"],
        ["bottom-2 left-2", "border-l-2 border-b-2"],
        ["bottom-2 right-2", "border-r-2 border-b-2"],
      ] as const).map(([pos, sides], i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute ${pos} w-3 h-3 ${sides} border-cyan-300/70`}
        />
      ))}
      {children}
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  en,
  enBold,
  enRest,
  kh,
}: {
  n: number;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  en: string;
  enBold: string;
  enRest: string;
  kh: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/60 text-cyan-200 font-mono font-bold text-sm">
        {n}
      </span>
      <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-900/60 border border-cyan-400/30 text-cyan-300">
        <Icon className="w-4 h-4" strokeWidth={2.25} />
      </span>
      <div className="flex-1 min-w-0 text-sm sm:text-base">
        <p className="text-slate-200 leading-relaxed">
          {en}
          <strong className="text-cyan-300 font-bold">{enBold}</strong>
          {enRest}
        </p>
        <p className="font-khmer text-slate-300 leading-loose mt-1">{kh}</p>
      </div>
    </li>
  );
}

function PressureDiagram() {
  return (
    <div
      className="mt-5 rounded-2xl border-2 border-cyan-400/40 bg-blue-950/40 p-5 sm:p-6 backdrop-blur-sm relative overflow-hidden"
      data-testid="pressure-diagram"
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 flex flex-wrap gap-x-2 gap-y-0.5">
        <Ruler className="w-3 h-3" />
        <span>Pressure schematic</span>
        <span className="opacity-50" aria-hidden>·</span>
        <span className="font-khmer normal-case tracking-normal">គ្រោងសម្ពាធ</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* HIGH pressure outside */}
        <div className="rounded-xl border-2 border-amber-400/70 bg-amber-500/10 p-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-1">
            Outside · ខាងក្រៅ
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-200 leading-none">
            HIGH
          </div>
          <div className="font-khmer text-amber-200 text-sm mt-1">សម្ពាធខ្ពស់</div>
          <div className="text-[10px] font-mono text-amber-300/80 mt-2">≈ 101 kPa</div>
        </div>

        {/* Arrow flowing in */}
        <div className="flex flex-col items-center text-cyan-300">
          <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 animate-[vacflow_3s_linear_infinite]" strokeWidth={2.5} />
          <span className="text-[9px] font-mono uppercase tracking-widest mt-1">air rushes in</span>
          <span className="font-khmer text-[10px] text-cyan-200/80">ខ្យល់ចូល</span>
        </div>

        {/* LOW pressure inside */}
        <div className="rounded-xl border-2 border-cyan-400/70 bg-cyan-500/10 p-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1">
            Inside · ខាងក្នុង
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-200 leading-none">
            LOW
          </div>
          <div className="font-khmer text-cyan-200 text-sm mt-1">សម្ពាធទាប</div>
          <div className="text-[10px] font-mono text-cyan-300/80 mt-2">fan pushes air out</div>
          <div className="font-khmer text-[10px] text-cyan-300/80 leading-snug">កង្ហារច្រានខ្យល់ចេញ</div>
        </div>
      </div>
    </div>
  );
}

function ComponentCard({
  icon: Icon,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  testid,
  accent,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  testid: string;
  accent: "cyan" | "amber";
}) {
  const styles =
    accent === "cyan"
      ? {
          border: "border-cyan-400/60",
          icon: "from-cyan-500 to-blue-700",
          tag: "text-cyan-300",
          title: "text-cyan-100",
          glow: "shadow-[0_0_22px_rgba(34,211,238,0.3)]",
        }
      : {
          border: "border-amber-400/60",
          icon: "from-amber-500 to-orange-600",
          tag: "text-amber-300",
          title: "text-amber-100",
          glow: "shadow-[0_0_22px_rgba(251,191,36,0.25)]",
        };

  return (
    <article
      className={`relative rounded-2xl border-2 ${styles.border} bg-blue-950/50 backdrop-blur-sm p-5 sm:p-6 ${styles.glow}`}
      data-testid={testid}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${styles.icon} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-white/10`}>
          {accent === "cyan" ? (
            <Icon className="w-6 h-6 animate-[vacspin_4s_linear_infinite]" strokeWidth={2.25} />
          ) : (
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`block text-[10px] font-mono font-bold uppercase tracking-[0.25em] ${styles.tag} mb-0.5 inline-flex flex-wrap gap-x-2 gap-y-0.5`}>
            <span>{tagEn}</span>
            <span className="opacity-50" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">{tagKh}</span>
          </span>
          <h3 className={`text-base sm:text-lg font-extrabold ${styles.title} leading-tight`}>
            {titleEn}
          </h3>
          <h4 className="font-khmer text-sm sm:text-base text-slate-300 leading-snug mt-0.5">
            {titleKh}
          </h4>
        </div>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-sm text-slate-300 leading-loose mt-2">
        {bodyKh}
      </p>
    </article>
  );
}

function AirflowPath() {
  return (
    <div
      className="mt-5 rounded-2xl border-2 border-cyan-400/40 bg-blue-950/40 p-5 sm:p-6 backdrop-blur-sm"
      data-testid="airflow-path"
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 flex flex-wrap gap-x-2 gap-y-0.5">
        <Wind className="w-3 h-3" />
        <span>Airflow path</span>
        <span className="opacity-50" aria-hidden>·</span>
        <span className="font-khmer normal-case tracking-normal">ផ្លូវខ្យល់ហូរ</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 sm:gap-2">
        <FlowStep icon={Wind} labelEn="Dirty air" labelKh="ខ្យល់កខ្វក់" tone="amber" />
        <FlowSep />
        <FlowStep icon={Filter} labelEn="Filter" labelKh="តម្រង" tone="amber" />
        <FlowSep />
        <FlowStep icon={Fan} labelEn="Motor & fan" labelKh="ម៉ូទ័រ និងកង្ហារ" tone="cyan" spin />
        <FlowSep />
        <FlowStep icon={Wind} labelEn="Clean air out" labelKh="ខ្យល់ស្អាតចេញ" tone="cyan" />
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
        <BL
          en="Dirt enters → trapped at the filter → clean air continues through the fan → exits the exhaust. Without the filter at the front of the chain, dust would simply fly through."
          kh="ធូលីចូល → ត្រូវចាប់នៅតម្រង → ខ្យល់ស្អាតបន្តតាមកង្ហារ → ចេញតាមរន្ធបញ្ចេញខ្យល់។ បើគ្មានតម្រងនៅខាងមុខខ្សែសង្វាក់ ធូលីនឹងហោះកាត់ងាយៗ។"
        />
      </p>
    </div>
  );
}

function FlowStep({
  icon: Icon,
  labelEn,
  labelKh,
  tone,
  spin,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
  tone: "cyan" | "amber";
  spin?: boolean;
}) {
  const ringTone = tone === "cyan" ? "from-cyan-500 to-blue-700 shadow-[0_0_18px_rgba(34,211,238,0.4)]" : "from-amber-500 to-orange-600 shadow-[0_0_18px_rgba(251,191,36,0.35)]";
  const txt = tone === "cyan" ? "text-cyan-200" : "text-amber-200";
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${ringTone} text-white flex items-center justify-center ring-2 ring-white/10`}>
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${spin ? "animate-[vacspin_4s_linear_infinite]" : ""}`} strokeWidth={2.25} />
      </div>
      <div>
        <div className={`text-xs sm:text-sm font-extrabold ${txt} leading-tight`}>{labelEn}</div>
        <div className="font-khmer text-[11px] sm:text-xs text-slate-300 leading-snug">{labelKh}</div>
      </div>
    </div>
  );
}

function FlowSep() {
  return (
    <div className="flex sm:flex-col items-center justify-center text-cyan-300/80 py-1">
      <ArrowRight className="hidden sm:block w-5 h-5" strokeWidth={2.5} />
      <ArrowDown className="sm:hidden w-5 h-5" strokeWidth={2.5} />
    </div>
  );
}

function ScaleCard({
  icon: Icon,
  scaleEn,
  scaleKh,
  titleEn,
  titleKh,
  detailEn,
  detailKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  scaleEn: string;
  scaleKh: string;
  titleEn: string;
  titleKh: string;
  detailEn: string;
  detailKh: string;
}) {
  return (
    <div className="rounded-xl border-2 border-cyan-400/40 bg-blue-950/60 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 inline-flex flex-wrap gap-x-1.5 gap-y-0.5">
            <span>{scaleEn}</span>
            <span className="opacity-50" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">{scaleKh}</span>
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white leading-tight">{titleEn}</div>
          <div className="font-khmer text-xs sm:text-sm text-slate-300 leading-snug">{titleKh}</div>
        </div>
      </div>
      <p className="text-xs text-slate-300 font-mono">{detailEn}</p>
      <p className="font-khmer text-xs text-slate-400 leading-snug mt-0.5">{detailKh}</p>
    </div>
  );
}
