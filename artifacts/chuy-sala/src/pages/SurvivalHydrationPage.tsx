import type { ComponentType, ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Droplet,
  Droplets,
  AlertTriangle,
  Sun,
  Compass,
  Brain,
  HeartPulse,
  Thermometer,
  Wind,
  Trees,
  Skull,
  Moon,
  Sunrise,
  Sunset,
  CheckCircle2,
  XCircle,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Survival Hydration: The Rationing Myth
 * ការរក្សាជាតិទឹកដើម្បីរស់រានមានជីវិត៖ ការយល់ច្រឡំអំពីការត្បិតត្បៀតទឹក
 * Module: Well-Being → Survival Skills
 * Aesthetic: rugged jungle greens + warning oranges, field-manual typography.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function SurvivalHydrationPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0d1a10] via-[#102818] to-[#0a1410] text-amber-50 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="survival-hydration-page"
    >
      <JungleCanopy />
      <FieldGrid />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/well-being/survival-skills"
          data-testid="link-back-to-survival"
          className={`inline-flex items-center gap-1.5 text-sm font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Survival Skills", "ត្រឡប់ទៅជំនាញរស់រានមានជីវិត")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 shadow-lg ring-2 ring-emerald-400/40 flex items-center justify-center">
                <Droplet className="w-8 h-8 sm:w-9 sm:h-9 text-emerald-100" strokeWidth={2.25} fill="currentColor" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500 border-2 border-[#0d1a10] flex items-center justify-center shadow">
                <AlertTriangle className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-emerald-300 mb-1.5">
                <Compass className="w-3 h-3" />
                <span>Survival · Field Manual</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs">
                  រស់រានមានជីវិត · សៀវភៅណែនាំ
                </span>
              </span>
              <h1
                id="hydration-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
                  Survival Hydration:
                </span>{" "}
                <span className="text-amber-50">The Rationing Myth</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-amber-100 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
                  ការរក្សាជាតិទឹកដើម្បីរស់រានមានជីវិត៖
                </span>{" "}
                <span>ការយល់ច្រឡំអំពីការត្បិតត្បៀតទឹក</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Lost in the forest with one bottle of water? The instinct that tells you to take tiny sips is the same instinct that gets people killed. Here is what the wilderness actually requires of you.",
              "វង្វេងផ្លូវនៅក្នុងព្រៃជាមួយដបទឹកមួយ? សភាវគតិដែលប្រាប់អ្នកឱ្យបឺតតិចៗ គឺជាសភាវគតិដូចគ្នាដែលនាំឱ្យមនុស្សស្លាប់។ នេះគឺជាអ្វីដែលព្រៃវាល្យតម្រូវពីអ្នកពិតប្រាកដ។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Golden Rule ─────────────────────────── */}
        <Section
          number={1}
          icon={Droplets}
          tone="emerald"
          titleEn="The Golden Rule"
          titleKh="វិធានមាស"
          subtitleEn="One sentence that has saved more lives than any compass"
          subtitleKh="ឃ្លាមួយដែលបានជួយសង្គ្រោះជីវិតច្រើនជាងត្រីវិស័យណាមួយ"
          dataTestid="section-golden-rule"
        >
          {/* Massive warning block */}
          <div
            className="relative rounded-3xl overflow-hidden border-4 border-orange-500 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-10 shadow-[0_0_48px_rgba(249,115,22,0.35)] text-center"
            data-testid="golden-rule-banner"
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-2.5"
              style={{
                background: "repeating-linear-gradient(45deg, #1a0a00 0 14px, #fde047 14px 28px)",
              }}
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-2.5"
              style={{
                background: "repeating-linear-gradient(45deg, #1a0a00 0 14px, #fde047 14px 28px)",
              }}
            />

            <div className="flex items-center justify-center gap-3 mb-3 mt-2">
              <AlertTriangle className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-200 drop-shadow" strokeWidth={2.5} />
              <span className="font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.4em] text-yellow-100">
                Rule 01 · វិធានទី ០១
              </span>
              <AlertTriangle className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-200 drop-shadow" strokeWidth={2.5} />
            </div>

            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tight uppercase drop-shadow-lg">
              Ration Sweat,
              <br />
              <span className="text-yellow-200">Not Water!</span>
            </h3>
            <h4 className="font-khmer text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug mt-4 drop-shadow">
              ត្បិតត្បៀតញើស <span className="text-yellow-200">មិនមែនទឹកទេ!</span>
            </h4>

            <div className="mt-6 pt-5 border-t-2 border-dashed border-yellow-200/60 max-w-2xl mx-auto text-left sm:text-center">
              <p className="text-sm sm:text-base text-amber-50 leading-relaxed">
                <BL
                  en="If you are stranded in the forest with clean water and you feel thirsty — drink it. The water is completely useless to you sitting inside the bottle. It must be inside your body to keep your organs running and your brain sharp."
                  kh="បើអ្នកជាប់គាំងនៅក្នុងព្រៃជាមួយទឹកស្អាត ហើយអ្នកមានអារម្មណ៍ស្រេកទឹក — សូមផឹកវា។ ទឹកគ្មានប្រយោជន៍ទាល់តែសោះពេលនៅក្នុងដប។ វាត្រូវតែស្ថិតនៅក្នុងរាងកាយរបស់អ្នកដើម្បីរក្សាសរីរាង្គឱ្យដំណើរការ និងខួរក្បាលឱ្យច្បាស់។"
                />
              </p>
            </div>
          </div>

          {/* Bottle vs body diagram */}
          <BottleVsBody />
        </Section>

        {/* ── Section 2: Danger of 'Saving' Water ────────────────── */}
        <Section
          number={2}
          icon={Skull}
          tone="rose"
          titleEn="The Danger of 'Saving' Water"
          titleKh="គ្រោះថ្នាក់នៃការ 'សន្សំ' ទឹក"
          subtitleEn="What happens inside your body when you sip too little"
          subtitleKh="អ្វីដែលកើតឡើងក្នុងរាងកាយរបស់អ្នក ពេលអ្នកផឹកតិចពេក"
          dataTestid="section-danger"
        >
          <div className="rounded-2xl border border-emerald-700/60 bg-[#0c1f15]/80 backdrop-blur-sm p-5 sm:p-6 mb-5">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed">
              <BL
                en="When you take tiny sips to 'make it last,' your body slips into dehydration anyway. The losses pile up silently, and a chain reaction begins:"
                kh="ពេលអ្នកបឺតតិចៗដើម្បី «ឱ្យវានៅបានយូរ» រាងកាយរបស់អ្នកនៅតែធ្លាក់ចូលក្នុងស្ថានភាពខ្វះទឹកដដែល។ ការបាត់បង់កកកុញដោយស្ងាត់ៗ ហើយប្រតិកម្មលំដាប់ចាប់ផ្ដើម៖"
              />
            </p>
          </div>

          {/* Cascade of failures */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <CascadeStep
              n={1}
              icon={Droplet}
              labelEn="Blood thickens"
              labelKh="ឈាមកាន់តែខាប់"
              bodyEn="With less water in the plasma, blood becomes sticky and harder for the heart to pump."
              bodyKh="ដោយមានទឹកតិចជាងនៅក្នុងប្លាស្មា ឈាមកាន់តែស្អិត ហើយបេះដូងពិបាកបូមជាង។"
            />
            <CascadeStep
              n={2}
              icon={Thermometer}
              labelEn="Core temp spikes"
              labelKh="សីតុណ្ហភាពកម្ដៅឡើងលឿន"
              bodyEn="Without enough sweat to evaporate, body temperature climbs — heatstroke is now minutes away."
              bodyKh="បើគ្មានញើសគ្រប់គ្រាន់ហួត សីតុណ្ហភាពរាងកាយឡើង — ការក្ដៅខ្លួនធ្ងន់ធ្ងរនៅប៉ុន្មាននាទីទៀត។"
            />
            <CascadeStep
              n={3}
              icon={Brain}
              labelEn="Mind clouds"
              labelKh="ខួរក្បាលស្រអាប់"
              bodyEn="Cognition crashes. Judgment, memory, and basic problem-solving start to fail you."
              bodyKh="ការគិតធ្លាក់ចុះ។ ការវិនិច្ឆ័យ ការចងចាំ និងការដោះស្រាយបញ្ហាមូលដ្ឋានចាប់ផ្ដើមបរាជ័យ។"
            />
            <CascadeStep
              n={4}
              icon={Skull}
              labelEn="Fatal mistake"
              labelKh="កំហុសធ្ងន់ធ្ងរ"
              bodyEn="A confused brain in the jungle wanders the wrong way, eats the wrong plant, climbs the wrong slope."
              bodyKh="ខួរក្បាលច្រឡំនៅក្នុងព្រៃ ដើរខុសផ្លូវ ស៊ីរុក្ខជាតិខុស ឡើងជម្រាលខុស។"
            />
          </div>

          {/* Grim reality block */}
          <aside
            className="mt-6 rounded-2xl border-2 border-rose-600 bg-gradient-to-br from-rose-950/80 to-rose-900/60 p-5 sm:p-6 backdrop-blur-sm"
            data-testid="grim-reality"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-rose-300/40">
                <ShieldAlert className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-mono font-extrabold uppercase tracking-[0.25em] mb-2 shadow">
                  <span>Grim Reality</span>
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">ការពិតដ៏អាក្រក់</span>
                </span>
                <p className="text-sm sm:text-base text-rose-50 leading-relaxed font-semibold">
                  <BL
                    en="Search-and-rescue teams around the world frequently find victims who died of dehydration — while still carrying water in their canteens."
                    kh="ក្រុមស្វែងរក និងសង្គ្រោះនៅជុំវិញពិភពលោក ច្រើនតែឃើញជនរងគ្រោះដែលស្លាប់ដោយសារខ្វះទឹក — ខណៈពេលដែលនៅតែមានទឹកក្នុងដបរបស់ពួកគេ។"
                  />
                </p>
                <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed mt-3 italic">
                  <BL
                    en="They saved the water. The water did not save them."
                    kh="ពួកគេបានសន្សំទឹក។ ទឹកមិនបានសង្គ្រោះពួកគេទេ។"
                  />
                </p>
              </div>
            </div>
          </aside>
        </Section>

        {/* ── Section 3: How to Actually Conserve Water ──────────── */}
        <Section
          number={3}
          icon={Trees}
          tone="emerald"
          titleEn="How to Actually Conserve Water"
          titleKh="របៀបសន្សំសំចៃទឹកពិតប្រាកដ"
          subtitleEn="The right way to make a bottle last is to stop losing water in the first place"
          subtitleKh="មធ្យោបាយត្រឹមត្រូវដើម្បីឱ្យដបនៅបានយូរ គឺឈប់បាត់បង់ទឹកជាដំបូង"
          dataTestid="section-conservation"
        >
          <div className="rounded-2xl border border-emerald-600/60 bg-emerald-950/50 backdrop-blur-sm p-5 sm:p-6 mb-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-sm sm:text-base text-emerald-50 leading-relaxed">
                <BL
                  en="You cannot stop drinking water — but you can slow the rate at which you lose it. Every drop of sweat is water leaving your body. Stop the sweat, and one bottle stretches into a survival reserve."
                  kh="អ្នកមិនអាចឈប់ផឹកទឹកបានទេ — ប៉ុន្តែអ្នកអាចបន្ថយល្បឿននៃការបាត់បង់វា។ ដំណក់ញើសនីមួយៗគឺជាទឹកដែលចេញពីរាងកាយរបស់អ្នក។ ឈប់ញើស ហើយដបមួយនឹងលាតសន្ធឹងទៅជាទុនបម្រុងរស់រានមានជីវិត។"
                />
              </p>
            </div>
          </div>

          {/* Tactics */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <TacticCard
              icon={Trees}
              labelEn="Stay in deep shade"
              labelKh="ស្នាក់នៅក្នុងម្លប់ជ្រៅ"
              bodyEn="During the heat of the day, do nothing. The forest canopy can be 10°C cooler than open ground — find it and stay there."
              bodyKh="នៅពេលក្ដៅបំផុតនៃថ្ងៃ កុំធ្វើអ្វីសោះ។ ពាក់កណ្ដាលឈើព្រៃអាចត្រជាក់ជាងដីឡានបើកចំហ ១០°C — ស្វែងរកវា ហើយស្នាក់នៅទីនោះ។"
            />
            <TacticCard
              icon={Sun}
              labelEn="Never travel at noon"
              labelKh="កុំធ្វើដំណើរនៅពេលថ្ងៃត្រង់"
              bodyEn="Do not hike, build, or chop wood when the sun is highest. Every minute under direct noon sun costs you precious water."
              bodyKh="កុំដើរ កសាង ឬកាប់ឈើពេលព្រះអាទិត្យខ្ពស់បំផុត។ រាល់នាទីក្រោមពន្លឺថ្ងៃត្រង់ផ្ទាល់ ធ្វើឱ្យអ្នកបាត់បង់ទឹកដ៏មានតម្លៃ។"
            />
            <TacticCard
              icon={Sunrise}
              labelEn="Work at dawn & dusk"
              labelKh="ធ្វើការនៅពេលព្រឹកព្រលឹម និងល្ងាច"
              bodyEn="Build shelter, gather firewood, set traps, and move only in the cool hours. The jungle gives you two short windows — use them."
              bodyKh="សង់ជម្រក ប្រមូលអុស ដាក់អន្ទាក់ និងផ្លាស់ទីតែនៅម៉ោងត្រជាក់ប៉ុណ្ណោះ។ ព្រៃផ្ដល់អ្នកនូវបង្អួចខ្លីពីរ — សូមប្រើវា។"
              icon2={Sunset}
            />
            <TacticCard
              icon={Wind}
              labelEn="Breathe through your nose"
              labelKh="ដកដង្ហើមតាមច្រមុះ"
              bodyEn="Mouth-breathing dries out your throat and lungs, exhaling moisture you can't afford to lose. Keep your mouth shut and breathe slowly through your nose."
              bodyKh="ការដកដង្ហើមតាមមាត់ធ្វើឱ្យបំពង់ក និងសួតស្ងួត បញ្ចេញសំណើមដែលអ្នកមិនអាចបាត់បង់បាន។ បិទមាត់ ហើយដកដង្ហើមយឺតៗតាមច្រមុះ។"
            />
          </div>

          {/* Closing summary */}
          <div className="mt-6 rounded-2xl border-2 border-emerald-500/60 bg-emerald-900/40 p-5 sm:p-6 text-center">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-emerald-300 mb-2 inline-flex flex-wrap justify-center gap-x-2">
              <span>Field Manual Summary</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer normal-case tracking-normal">សង្ខេបសៀវភៅណែនាំ</span>
            </div>
            <p className="text-base sm:text-lg font-extrabold text-amber-100 leading-relaxed">
              <BL
                en="Drink when thirsty. Move when cool. Breathe through your nose. Wait for rescue in the shade."
                kh="ផឹកនៅពេលស្រេក។ ផ្លាស់ទីនៅពេលត្រជាក់។ ដកដង្ហើមតាមច្រមុះ។ រង់ចាំការសង្គ្រោះក្នុងម្លប់។"
              />
            </p>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-emerald-300/70 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Survival education only. If you become lost in the Cambodian forest, conserve energy, signal rescuers, and follow the S.T.O.P. method — Stop, Think, Observe, Plan.",
            "ការអប់រំរស់រានមានជីវិតប៉ុណ្ណោះ។ បើអ្នកវង្វេងផ្លូវនៅក្នុងព្រៃកម្ពុជា សូមសន្សំថាមពល បញ្ជូនសញ្ញាដល់អ្នកសង្គ្រោះ និងធ្វើតាមវិធីសាស្ត្រ S.T.O.P. — ឈប់ គិត សង្កេត រៀបផែនការ។",
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
      <span className="font-khmer text-emerald-200/80">({kh})</span>
    </span>
  );
}

function JungleCanopy() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="leaves" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M60 20 Q80 50 60 90 Q40 50 60 20 Z" fill="#86efac" />
          <circle cx="20" cy="60" r="2" fill="#facc15" />
          <circle cx="100" cy="80" r="1.5" fill="#facc15" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaves)" />
    </svg>
  );
}

function FieldGrid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="field-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0 L0 0 0 48" fill="none" stroke="#86efac" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#field-grid)" />
    </svg>
  );
}

type Tone = "emerald" | "orange" | "rose" | "amber";

const TONE: Record<
  Tone,
  { bg: string; text: string; border: string; ring: string }
> = {
  emerald: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    text: "text-emerald-300",
    border: "border-emerald-600/60",
    ring: "ring-emerald-400/40",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-500 to-orange-700",
    text: "text-orange-300",
    border: "border-orange-600/60",
    ring: "ring-orange-400/40",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-500 to-rose-700",
    text: "text-rose-300",
    border: "border-rose-600/60",
    ring: "ring-rose-400/40",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-400 to-amber-600",
    text: "text-amber-300",
    border: "border-amber-500/60",
    ring: "ring-amber-300/40",
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
          <div className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ${T.ring}`}>
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`font-mono inline-block text-[10px] font-bold tracking-[0.25em] uppercase ${T.text} mb-0.5`}>
              §{number} · ផ្នែកទី {number}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-50 leading-tight">
              {titleEn}
            </h2>
            <p className="font-khmer text-base sm:text-lg text-emerald-100 leading-snug">
              {titleKh}
            </p>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
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

function BottleVsBody() {
  return (
    <div className="mt-5 grid sm:grid-cols-3 items-stretch gap-3 sm:gap-4" data-testid="bottle-vs-body">
      {/* Bottle (useless) */}
      <div className="rounded-2xl border-2 border-rose-600/70 bg-rose-950/40 p-4 sm:p-5 text-center backdrop-blur-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-600/20 ring-2 ring-rose-500/50 mx-auto flex items-center justify-center mb-2 relative">
          <Droplet className="w-7 h-7 text-rose-300" strokeWidth={2.25} fill="currentColor" />
          <XCircle className="absolute -bottom-2 -right-2 w-6 h-6 text-rose-400 bg-[#0d1a10] rounded-full" strokeWidth={2.5} />
        </div>
        <div className="text-sm sm:text-base font-extrabold text-rose-100">
          Water in the bottle
        </div>
        <div className="font-khmer text-xs sm:text-sm text-rose-200 leading-snug">
          ទឹកក្នុងដប
        </div>
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-rose-300 mt-2">
          Useless · គ្មានប្រយោជន៍
        </div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center justify-center text-emerald-300 py-2">
        <Activity className="w-8 h-8 mb-1" strokeWidth={2.25} />
        <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-center text-emerald-200">
          Drink it
        </div>
        <div className="font-khmer text-xs text-emerald-200">ផឹកវា</div>
      </div>

      {/* Body (functional) */}
      <div className="rounded-2xl border-2 border-emerald-500/70 bg-emerald-950/50 p-4 sm:p-5 text-center backdrop-blur-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 ring-2 ring-emerald-400/50 mx-auto flex items-center justify-center mb-2 relative">
          <HeartPulse className="w-7 h-7 text-emerald-200" strokeWidth={2.25} />
          <CheckCircle2 className="absolute -bottom-2 -right-2 w-6 h-6 text-emerald-300 bg-[#0d1a10] rounded-full" strokeWidth={2.5} />
        </div>
        <div className="text-sm sm:text-base font-extrabold text-emerald-100">
          Water in your body
        </div>
        <div className="font-khmer text-xs sm:text-sm text-emerald-200 leading-snug">
          ទឹកក្នុងរាងកាយ
        </div>
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-300 mt-2">
          Keeping you alive · ការពារជីវិត
        </div>
      </div>
    </div>
  );
}

function CascadeStep({
  n,
  icon: Icon,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
}: {
  n: number;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const isFinal = n === 4;
  return (
    <div
      className={`relative rounded-2xl border-2 ${
        isFinal ? "border-rose-500/80 bg-rose-950/50" : "border-emerald-600/50 bg-[#0c1f15]/80"
      } p-4 sm:p-5 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
            isFinal ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          STEP {n}
        </span>
        <Icon
          className={`w-5 h-5 ${isFinal ? "text-rose-300" : "text-emerald-300"}`}
          strokeWidth={2.25}
        />
      </div>
      <div
        className={`text-sm sm:text-base font-extrabold ${
          isFinal ? "text-rose-100" : "text-emerald-50"
        } leading-tight`}
      >
        {labelEn}
      </div>
      <div
        className={`font-khmer text-xs sm:text-sm ${
          isFinal ? "text-rose-200" : "text-emerald-200"
        } leading-snug mb-2`}
      >
        {labelKh}
      </div>
      <p className="text-xs sm:text-sm text-emerald-50/85 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-xs sm:text-sm text-emerald-100/85 leading-loose mt-1">
        {bodyKh}
      </p>
    </div>
  );
}

function TacticCard({
  icon: Icon,
  icon2: Icon2,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  icon2?: ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-emerald-600/60 bg-[#0c1f15]/80 backdrop-blur-sm p-4 sm:p-5 hover:border-emerald-400 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow ring-2 ring-emerald-400/40">
            <Icon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          {Icon2 && (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 text-white flex items-center justify-center shadow ring-2 ring-orange-400/40">
              <Icon2 className="w-4 h-4" strokeWidth={2.25} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-extrabold text-amber-50 leading-tight">
            {labelEn}
          </div>
          <div className="font-khmer text-xs sm:text-sm text-emerald-200 leading-snug">
            {labelKh}
          </div>
          <p className="text-xs sm:text-sm text-emerald-50/85 leading-relaxed mt-2">
            {bodyEn}
          </p>
          <p className="font-khmer text-xs sm:text-sm text-emerald-100/85 leading-loose mt-1">
            {bodyKh}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Suppress unused-import warnings for icons retained for semantic clarity */
void Moon;
