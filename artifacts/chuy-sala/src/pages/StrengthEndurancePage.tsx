import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Activity,
  Wrench,
  TrendingUp,
  Wind,
  Droplets,
  Flame,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Repeat,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import type React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  WB-FITNESS-01 · The Human Engine: Strength and Endurance
//                  ម៉ាស៊ីនមនុស្ស ៖ កម្លាំង និងភាពធន់
//
//  Athletic / biomechanical aesthetic — energetic orange, sweat-cool blue,
//  carbon-graphite background. Custom anatomical SVGs (muscle-fibre repair,
//  bench press + pull-up, heart pump, hinge joint with synovial fluid).
// ════════════════════════════════════════════════════════════════════════════

// ─── Athletic palette ───────────────────────────────────────────────────
const BG       = "#0b0f17";
const PANEL    = "#121826";
const PANEL_2  = "#161e2e";
const RULE     = "#1f2a3d";
const INK      = "#f8fafc";
const INK_SOFT = "#94a3b8";
const ORANGE   = "#f97316";   // power / muscle
const AMBER    = "#fbbf24";   // adaptation / warning
const SKY      = "#38bdf8";   // sweat / oxygen / cardio
const CYAN     = "#22d3ee";   // synovial fluid
const ROSE     = "#fb7185";   // muscle fibre / heart
const LIME     = "#a3e635";   // dynamic / go
const VIOLET   = "#a78bfa";   // joint / tendon
const RED      = "#ef4444";   // do-not warning

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// ─── Layout primitives ──────────────────────────────────────────────────

function P({ k, en, kh, className }: { k: boolean; en: string; kh: string; className?: string }) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function H2({
  k,
  en,
  kh,
  Icon,
  accent,
}: {
  k: boolean;
  en: string;
  kh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-lg sm:text-xl font-bold tracking-wide ${k ? "font-khmer" : "uppercase"}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: `${accent}55` }} />
    </div>
  );
}

function Panel({
  children,
  accent,
  className,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className ?? ""}`}
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}55`,
        boxShadow: `inset 0 0 0 1px ${accent}11, 0 0 28px -16px ${accent}66`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function Tag({
  k,
  en,
  kh,
  accent,
}: {
  k: boolean;
  en: string;
  kh: string;
  accent: string;
}) {
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-1 rounded-md tracking-widest ${k ? "font-khmer" : "uppercase font-mono"}`}
      style={{ backgroundColor: accent, color: BG }}
    >
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function StrengthEndurancePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 16% 14%, ${ORANGE}24, transparent 50%),` +
      `radial-gradient(circle at 86% 84%, ${SKY}1f, transparent 55%),` +
      `linear-gradient(${RULE} 1px, transparent 1px),` +
      `linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, 36px 36px, 36px 36px",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80 ${k ? "font-khmer" : ""}`}
            style={{ color: ORANGE }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* HERO */}
        <header
          className="relative rounded-[2rem] overflow-hidden border p-6 sm:p-9 mb-8"
          style={{
            backgroundColor: PANEL,
            borderColor: `${ORANGE}55`,
            boxShadow: `inset 0 0 0 1px ${ORANGE}22, 0 0 50px -20px ${ORANGE}aa`,
          }}
        >
          <AthleticBackdrop />
          <div className="relative">
            <div
              className={`flex items-center gap-2 text-[11px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: ORANGE }}
            >
              <span>{t("Well-being · Fitness", "សុខុមាលភាព · សម្បទា")}</span>
              <span>·</span>
              <span>WB-FITNESS-01</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK, textShadow: `0 0 18px ${ORANGE}88, 0 0 38px ${SKY}55` }}
              data-testid="page-title"
            >
              {t(
                "The Human Engine: Strength and Endurance",
                "ម៉ាស៊ីនមនុស្ស ៖ កម្លាំង និងភាពធន់"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Your body is the most adaptable machine ever built. Pick up something heavy and the muscle quietly tears at the microscopic level — then over the next two days it rebuilds itself thicker, like a wall after an earthquake. Run for thirty minutes and the heart enlarges its chambers, the lungs grow new capillaries, and the blood thickens with oxygen carriers. This module unpacks how strength is actually built (hypertrophy and progressive overload), why a few big compound lifts beat dozens of small isolation exercises, what cardiovascular exercise really upgrades (it is not your biceps), and the single biggest pre-workout mistake that modern sports science has overturned — the long-held static stretch.",
                "រាងកាយរបស់អ្នកជាម៉ាស៊ីនអាចសម្រួលបំផុតដែលធ្លាប់សាងសង់។ លើករបស់ធ្ងន់ ហើយសាច់ដុំរហែកដោយស្ងាត់នៅកម្រិតមីក្រូ — បន្ទាប់មកក្នុងរយៈពេលពីរថ្ងៃខាងមុខ វាសាងឡើងវិញឲ្យក្រាស់ជាងមុន ដូចជញ្ជាំងបន្ទាប់ពីរញ្ជួយដី។ រត់សាមសិបនាទី បេះដូងពង្រីកបន្ទប់របស់វា សួតដុះសរសៃឈាមតូចថ្មី និងឈាមក្រាស់ឡើងដោយអ្នកដឹកអុកស៊ីសែន។ មុខវិជ្ជានេះបង្ហាញពីរបៀបដែលកម្លាំងត្រូវបានសាងសង់ពិតប្រាកដ (ហ៊ីប៉ឺត្រូហ្វី និងការដាក់បន្ទុកជាបណ្ដើរៗ) ហេតុអ្វីការលើកទម្ងន់រួមធំៗមួយចំនួនឈ្នះការហាត់ដាច់ដោយឡែករាប់សិប អ្វីដែលលំហាត់បេះដូងពិតជាធ្វើឲ្យប្រសើរ (មិនមែនជាប៊ីសេបរបស់អ្នកទេ) និងកំហុសមុនការហាត់ប្រាណធំបំផុតមួយ ដែលវិទ្យាសាស្ត្រកីឡាសម័យថ្មីបានលុបចោល — ការទាញសាច់ដុំស្ងៀមដែលធ្លាប់ប្រកាន់យ៉ាងយូរ។"
              )}
            </p>

            {/* Quick stats strip */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { en: "muscle fibres in biceps", kh: "សរសៃសាច់ដុំក្នុងប៊ីសេប",     val: "~250,000", valKh: "~២៥០,០០០", accent: ORANGE },
                { en: "heart beats per day",     kh: "បេះដូងដើរក្នុងមួយថ្ងៃ",      val: "~100,000", valKh: "~១០០,០០០", accent: ROSE },
                { en: "joints in human body",    kh: "សន្លាក់ក្នុងរាងកាយមនុស្ស",    val: "~360",     valKh: "~៣៦០",     accent: VIOLET },
                { en: "litres of O₂ per workout", kh: "លីត្រ O₂ ក្នុងការហាត់",     val: "~80 L",    valKh: "~៨០ L",    accent: SKY },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border"
                  style={{ backgroundColor: PANEL_2, borderColor: `${s.accent}66` }}
                >
                  <div className={`text-[10px] mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: s.accent }}>
                    {k ? s.kh : s.en}
                  </div>
                  <div className="text-base font-extrabold font-mono" style={{ color: INK }}>
                    {k ? s.valKh : s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* CHAPTER 1 — Hypertrophy & Progressive Overload */}
        <section className="mb-12">
          <H2 k={k} en="The science of muscle growth" kh="វិទ្យាសាស្ត្រនៃការលូតលាស់សាច់ដុំ" Icon={Dumbbell} accent={ORANGE} />
          <P
            k={k}
            en="A muscle is not really one solid lump — it is a tightly bundled rope of thousands of long, thin fibres. Each fibre is built to slide and contract, but it is also surprisingly fragile. When you lift something significantly heavier than your body is used to, hundreds of these fibres tear in tiny, microscopic places. That damage is the signal. Over the next 24–72 hours, while you sleep and rest, the body floods the area with repair cells, splices the fibres back together — and adds extra protein on top, just in case the same load arrives tomorrow. The fibre comes back thicker than before. That is hypertrophy."
            kh="សាច់ដុំមិនមែនជាដុំរឹងតែមួយទេ — វាជាខ្សែក្រាសដែលរុំយ៉ាងតឹងពីសរសៃវែងស្តើងរាប់ពាន់។ សរសៃនីមួយៗត្រូវបានសាងសង់ដើម្បីស្ទុះ និងកន្ត្រាក់ ប៉ុន្តែវាក៏ខ្សោយគួរឲ្យភ្ញាក់ផ្អើលផងដែរ។ នៅពេលអ្នកលើករបស់ដែលធ្ងន់ជាងអ្វីដែលរាងកាយរបស់អ្នកធ្លាប់នឹង សរសៃរាប់រយរហែកនៅកន្លែងតូចមីក្រូ។ ការខូចនោះជាសញ្ញា។ ក្នុងរយៈពេល ២៤–៧២ ម៉ោងបន្ទាប់ ខណៈអ្នកដេក និងសម្រាក រាងកាយជន់កោសិកាជួសជុលចូលក្នុងតំបន់ ដេរសរសៃត្រឡប់ចូលគ្នាវិញ — និងបន្ថែមប្រូតេអ៊ីនលើស ក្នុងករណីបន្ទុកដូចគ្នាមកដល់ថ្ងៃស្អែក។ សរសៃត្រឡប់មកវិញក្រាស់ជាងមុន។ នោះជាហ៊ីប៉ឺត្រូហ្វី។"
            className="mb-5 -mt-2"
          />

          <div className="grid lg:grid-cols-2 gap-5">
            <Panel accent={ORANGE} testId="hypertrophy-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Tag k={k} en="Mechanism" kh="យន្តការ" accent={ORANGE} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "ហ៊ីប៉ឺត្រូហ្វី (ការក្រាស់សាច់ដុំ)" : "Hypertrophy"}
                </h3>
              </div>
              <HypertrophyDiagram k={k} />
              <div className="mt-4 grid sm:grid-cols-3 gap-2">
                {[
                  { num: 1, en: "Tear",    kh: "រហែក",       caption: { en: "heavy load → microscopic tears", kh: "បន្ទុកធ្ងន់ → ការរហែកមីក្រូ" }, accent: RED },
                  { num: 2, en: "Repair",  kh: "ជួសជុល",     caption: { en: "rest 24–72 h, protein in",       kh: "សម្រាក ២៤–៧២ ម៉ោង បន្ថែមប្រូតេអ៊ីន" }, accent: AMBER },
                  { num: 3, en: "Stronger", kh: "រឹងមាំជាងមុន", caption: { en: "fibre returns thicker",         kh: "សរសៃត្រឡប់មកក្រាស់ជាងមុន" }, accent: LIME },
                ].map((s) => (
                  <div key={s.num} className="rounded-lg p-3 border" style={{ backgroundColor: PANEL, borderColor: `${s.accent}66` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-extrabold text-sm" style={{ color: s.accent }}>{k ? toKhNum(s.num) : s.num}.</span>
                      <span className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                        {k ? s.kh : s.en}
                      </span>
                    </div>
                    <div className={`text-[10px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                      {k ? s.caption.kh : s.caption.en}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel accent={AMBER} testId="overload-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Tag k={k} en="Adaptation" kh="ការសម្របខ្លួន" accent={AMBER} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "ការដាក់បន្ទុកជាបណ្ដើរៗ" : "Progressive Overload"}
                </h3>
              </div>
              <P
                k={k}
                en="Here is the catch: the body is brilliant at adapting and then refusing to keep adapting. Lift the same 20 kg bar three times a week for a month and the muscle thickens just enough to handle 20 kg comfortably — and then stops. To keep growing, the challenge itself has to keep growing. Add a kilogram. Squeeze out one extra repetition. Slow the descent down by a second. The signal must always be a little bigger than yesterday. This is progressive overload — the single most important rule in every strength programme ever written."
                kh="នេះជាអាថ៌កំបាំង ៖ រាងកាយឆ្លាតវៃក្នុងការសម្របខ្លួន និងបន្ទាប់មកបដិសេធបន្តសម្រួលខ្លួន។ លើកដែក ២០ គ.ក. ដូចគ្នា ៣ ដងក្នុងសប្ដាហ៍មួយខែ ហើយសាច់ដុំក្រាស់គ្រប់គ្រាន់ដើម្បីដោះស្រាយ ២០ គ.ក. ដោយស្រួល — បន្ទាប់មកឈប់។ ដើម្បីបន្តលូតលាស់ បញ្ហាប្រឈមដោយខ្លួនវាត្រូវតែបន្តកើនឡើង។ បន្ថែម ១ គីឡូ។ ច្របាច់ចេញការលើកបន្ថែម ១ ដង។ បន្ថយល្បឿនចុះ ១ វិនាទី។ សញ្ញាត្រូវតែធំជាងថ្ងៃម្សិលបន្តិច។ នេះជាការដាក់បន្ទុកជាបណ្ដើរៗ — ច្បាប់សំខាន់បំផុតមួយក្នុងគ្រោងការណ៍កម្លាំងគ្រប់ប្រភេទ។"
                className="text-sm mb-4"
              />
              <ProgressiveOverloadChart k={k} />
            </Panel>
          </div>
        </section>

        {/* CHAPTER 2 — Compound vs Cardio */}
        <section className="mb-12">
          <H2 k={k} en="The big movers vs. the engine" kh="ការលើកទម្ងន់ធំៗ និងម៉ាស៊ីនបេះដូង" Icon={Activity} accent={SKY} />
          <P
            k={k}
            en="Most beginners waste hours doing tiny exercises that move only one joint at a time — bicep curls, tricep kickbacks, calf raises. Those have their place, but they are the seasoning. The main course is the compound lift: a single movement that demands four, five, six muscle groups fire together in perfect coordination, like an orchestra hitting one chord. Bench press. Pull-up. Squat. Deadlift. One rep of these does more for whole-body strength than ten reps of any isolation exercise. Cardio is a completely different machine: it does not build big muscles at all — it tunes the heart and lungs."
            kh="អ្នកចាប់ផ្ដើមភាគច្រើនខ្ជះខ្ជាយម៉ោងធ្វើលំហាត់តូចៗដែលចលនាសន្លាក់តែមួយក្នុងពេលតែមួយ — ការវេះប៊ីសេប ការទាត់ត្រាយសេប ការលើកកំភួនជើង។ ទាំងនោះមានកន្លែងរបស់វា ប៉ុន្តែជាគ្រឿងផ្សំ។ អាហារសំខាន់គឺការលើកទម្ងន់រួម ៖ ចលនាមួយដែលទាមទារក្រុមសាច់ដុំ បួន ប្រាំ ឬប្រាំមួយ បាញ់ជាមួយគ្នាក្នុងការសម្របសម្រួលលឥតខ្ចោះ ដូចវង់ភ្លេងអូកេស្ត្រាប៉ះ ផ្លុំអាគ័រតែមួយ។ ការសង្កត់លើកដេក (Bench Press)។ ការលើកខ្លួនឡើង (Pull-up)។ ការអង្គុយបង្គន់ (Squat)។ ការលើករបស់ធ្ងន់ (Deadlift)។ ការលើក ១ ដងនៃលំហាត់ទាំងនេះធ្វើច្រើនសម្រាប់កម្លាំងពេញរាងកាយ ជាងការលើក ១០ ដងនៃលំហាត់ដាច់ដោយឡែកណាមួយ។ លំហាត់បេះដូងជាម៉ាស៊ីនខុសគ្នាទាំងស្រុង ៖ វាមិនសាងសាច់ដុំធំទេ — វាលៃបេះដូង និងសួត។"
            className="-mt-2 mb-5"
          />

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Bench Press */}
            <Panel accent={ORANGE} testId="bench-press-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Tag k={k} en="Compound Push" kh="ការរុញរួម" accent={ORANGE} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "Bench Press · ការសង្កត់លើកដេក" : "The Bench Press"}
                </h3>
              </div>
              <BenchPressDiagram k={k} />
              <P
                k={k}
                en="Lying on a bench, you push a loaded bar away from your chest. It looks like one movement, but four different muscle groups have to fire in perfect time. Push with the chest too early and the elbows flare. Forget the shoulders and the bar tips sideways. Forget the triceps and you cannot lock the elbow. The bench press is one giant chord played on four strings."
                kh="ដេកលើកៅអី អ្នករុញដែកដាក់ទម្ងន់ចេញពីទ្រូង។ វាមើលទៅដូចជាចលនាមួយ ប៉ុន្តែក្រុមសាច់ដុំខុសគ្នា ៤ ត្រូវបាញ់ក្នុងពេលត្រឹមត្រូវ។ រុញដោយទ្រូងលឿនពេក កែងដៃរលាតផុស។ ភ្លេចស្មា ដែករលាយចំហៀង។ ភ្លេចត្រាយសេប អ្នកមិនអាចចាក់សោកែងដៃ។ Bench Press ជាអាគ័រមួយធំ ដែលលេងលើខ្សែ ៤។"
                className="text-sm mt-4"
              />
            </Panel>

            {/* Pull-up */}
            <Panel accent={ORANGE} testId="pullup-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Tag k={k} en="Compound Pull" kh="ការទាញរួម" accent={ORANGE} />
                <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? "Pull-up · ការលើកខ្លួនឡើង" : "The Pull-up"}
                </h3>
              </div>
              <PullupDiagram k={k} />
              <P
                k={k}
                en="Hang from a bar and pull your whole body up using only your arms and back. The bench press's mirror twin: the wide-back muscles (lats), the upper back, the biceps and the rear shoulders all have to pull together. If even one of them is lazy, the chin never reaches the bar. The pull-up is the gold standard test of upper-body strength — most adults cannot do a single one without training, and that is humbling."
                kh="ព្យួរពីដែក និងទាញរាងកាយទាំងមូលឡើងដោយប្រើតែដៃ និងខ្នង។ ភ្លោះកញ្ចក់របស់ Bench Press ៖ សាច់ដុំខ្នងធំ (lats) ខ្នងខាងលើ ប៊ីសេប និងស្មាខាងក្រោយត្រូវទាញជាមួយគ្នា។ បើសាច់ដុំណាមួយខ្ជិល ចង្ការមិនដែលឈានដល់ដែក។ Pull-up ជាការសាកស្តង់ដារមាសនៃកម្លាំងផ្នែកខាងលើនៃរាងកាយ — មនុស្សពេញវ័យភាគច្រើនមិនអាចធ្វើ ១ ដងបានដោយគ្មានការហ្វឹកហាត់ ហើយនេះធ្វើឲ្យបន្ទាបខ្លួន។"
                className="text-sm mt-4"
              />
            </Panel>
          </div>

          {/* Compound vs Isolation orchestra strip */}
          <Panel accent={LIME} className="mt-5" testId="orchestra-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Sparkles className="w-5 h-5" style={{ color: LIME }} />
              <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ហេតុអ្វីរួមឈ្នះដាច់ដោយឡែក" : "Why compound beats isolation"}
              </h3>
            </div>
            <CompoundVsIsolationBar k={k} />
          </Panel>

          {/* Cardio */}
          <Panel accent={SKY} className="mt-5" testId="cardio-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <HeartPulse className="w-5 h-5" style={{ color: ROSE }} />
              <Tag k={k} en="Different machine" kh="ម៉ាស៊ីនខុសគ្នា" accent={SKY} />
              <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "លំហាត់ប្រាណបេះដូង (Cardio)" : "Cardio: cardiovascular exercise"}
              </h3>
            </div>
            <P
              k={k}
              en="Running, cycling, swimming and brisk walking do almost nothing to make biceps bigger — and that is fine, because they were never supposed to. Cardio upgrades a completely different system: the fuel pump (your heart) and the oxygen-delivery network (lungs, blood, capillaries). After a few months of regular running, the heart's main pumping chamber actually grows larger and stronger, your resting heartbeat drops by 10–20 beats per minute (because each beat now moves more blood), and the small blood vessels inside your muscles multiply so oxygen reaches every fibre faster. You do not become a bodybuilder; you become a vehicle that can drive much further on the same tank of fuel."
              kh="ការរត់ ការជិះកង់ ការហែលទឹក និងការដើរលឿន ស្ទើរតែមិនធ្វើឲ្យប៊ីសេបធំទេ — ហើយវាមិនអីទេ ព្រោះវាមិនដែលត្រូវធ្វើដូច្នេះ។ Cardio ធ្វើឲ្យប្រព័ន្ធខុសគ្នាទាំងស្រុងប្រសើរ ៖ ស្នប់ឥន្ធនៈ (បេះដូងរបស់អ្នក) និងបណ្ដាញដឹកជញ្ជូនអុកស៊ីសែន (សួត ឈាម សរសៃឈាមតូច)។ បន្ទាប់ពីពីរបីខែនៃការរត់ទៀងទាត់ បន្ទប់ស្នប់សំខាន់របស់បេះដូងពិតជាធំ និងរឹងមាំជាងមុន ការដើរបេះដូងពេលសម្រាកធ្លាក់ ១០–២០ ដងក្នុងមួយនាទី (ព្រោះការដើរនីមួយៗឥឡូវផ្លាស់ទីឈាមច្រើនជាងមុន) និងសរសៃឈាមតូចក្នុងសាច់ដុំរបស់អ្នកគុណច្រើន ដូច្នេះអុកស៊ីសែនទៅដល់រាល់សរសៃលឿនជាងមុន។ អ្នកមិនក្លាយជាអ្នកសាងសាច់ដុំទេ ; អ្នកក្លាយជាយានដែលអាចបើកបរវែងជាងមុនច្រើន លើធុងឥន្ធនៈដូចគ្នា។"
              className="text-sm mb-4"
            />
            <CardioDiagram k={k} />
          </Panel>
        </section>

        {/* CHAPTER 3 — Preparation: dynamic vs static */}
        <section className="mb-12">
          <H2 k={k} en="The preparation phase" kh="ការរៀបចំមុនពេលហាត់ប្រាណ" Icon={Wrench} accent={CYAN} />
          <P
            k={k}
            en="For decades, every gym class began the same way: stand still, fold over, hold your toes for thirty seconds, count to ten, repeat with the other leg. Modern sports science has politely demolished this. Holding a stretch on a cold muscle for any longer than 15–20 seconds quietly weakens it for the next hour or so — exactly the wrong moment to be weak. What you actually want is to wake the joints up, pump warm fluid into them, and rehearse the movements you are about to do, in motion. That is dynamic stretching."
            kh="អស់រយៈពេលជាច្រើនទសវត្សរ៍ រាល់ថ្នាក់កីឡាចាប់ផ្ដើមដូចគ្នា ៖ ឈរស្ងៀម បត់ខ្លួន កាន់ម្រាមជើងសាមសិបវិនាទី រាប់ដល់ដប់ ធ្វើម្ដងទៀតជាមួយជើងមួយទៀត។ វិទ្យាសាស្ត្រកីឡាសម័យថ្មីបានបំផ្លាញដោយគួរសមនូវការនេះ។ ការកាន់ការទាញលើសាច់ដុំត្រជាក់លើសពី ១៥–២០ វិនាទី ធ្វើឲ្យវាខ្សោយយ៉ាងស្ងាត់សម្រាប់មួយម៉ោងបន្ទាប់ — ពិតជាពេលខុសក្នុងការខ្សោយ។ អ្វីដែលអ្នកត្រូវការពិតប្រាកដ គឺដាស់សន្លាក់ បូមទឹកក្ដៅចូលក្នុងវា និងអនុវត្តចលនាដែលអ្នករៀបនឹងធ្វើ ក្នុងស្ថានភាពមានចលនា។ នោះជាការទាញសាច់ដុំប្រភេទថាមវន្ត។"
            className="-mt-2 mb-5"
          />

          <div className="grid lg:grid-cols-2 gap-5">
            <Panel accent={RED} testId="static-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <XCircle className="w-5 h-5" style={{ color: RED }} />
                <Tag k={k} en="Don't · pre-workout" kh="កុំធ្វើ · មុនហាត់" accent={RED} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ការទាញសាច់ដុំស្ងៀម (Static)" : "Static stretching"}
              </h3>
              <StaticStretchDiagram k={k} />
              <P
                k={k}
                en="Hold the stretched position for 20–60 seconds. The muscle slowly elongates and the nerve signals telling it to stay 'springy' get dampened. Great for cooling down at the end of a workout, terrible just before lifting heavy: in scientific trials, athletes who static-stretched lost 5–10 % of their peak power for up to an hour afterwards."
                kh="កាន់មុខតំណែងទាញរយៈពេល ២០–៦០ វិនាទី។ សាច់ដុំពន្លាយាយឺតៗ និងសញ្ញាសរសៃប្រសាទដែលប្រាប់វាឲ្យនៅ «ខ្សែ» ត្រូវបានបន្ថយ។ ល្អសម្រាប់បន្ថយក្ដៅនៅចុងបញ្ចប់នៃការហាត់ ប៉ុន្តែអាក្រក់ភ្លាមៗមុនលើករបស់ធ្ងន់ ៖ ក្នុងការសាកល្បងវិទ្យាសាស្ត្រ កីឡាករដែលធ្វើការទាញសាច់ដុំស្ងៀមបាត់បង់ ៥–១០ % នៃកម្លាំងកំពូលរបស់ពួកគេ រហូតដល់មួយម៉ោងបន្ទាប់ពីនោះ។"
                className="text-sm mt-3"
              />
              <div className="mt-4 rounded-lg p-3 border" style={{ backgroundColor: PANEL, borderColor: `${LIME}55` }}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: LIME }} />
                  <div>
                    <div className={`text-[11px] font-bold mb-1 ${k ? "font-khmer" : "uppercase font-mono"}`} style={{ color: LIME }}>
                      {k ? "ប្រើនៅពេលណា ?" : "When to use it"}
                    </div>
                    <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                      {k
                        ? "បន្ទាប់ពីហាត់ ដើម្បីសម្រាក និងជួយរំងាប់ការឈឺ ; មុនដេក ដើម្បីបន្ថយភាពតានតឹងនៃថ្ងៃ។"
                        : "After a workout to cool down and reduce next-day soreness; before bed to release the day's tension."}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel accent={LIME} testId="dynamic-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <CheckCircle2 className="w-5 h-5" style={{ color: LIME }} />
                <Tag k={k} en="Do · pre-workout" kh="ធ្វើ · មុនហាត់" accent={LIME} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ការទាញសាច់ដុំថាមវន្ត (Dynamic)" : "Dynamic stretching"}
              </h3>
              <DynamicStretchDiagram k={k} />
              <P
                k={k}
                en="Move through a controlled range of motion — arm circles, leg swings, body-weight squats, walking lunges. Five to ten minutes pumps warm synovial fluid into every joint (the body's own grease), raises the muscle temperature by 1–2 °C, and rehearses the movement patterns the workout is about to demand. Power output goes up, not down."
                kh="ផ្លាស់ទីតាមកម្រិតចលនាដែលគ្រប់គ្រង — ការបង្វិលដៃ ការបង្វិលជើង ការអង្គុយបង្គន់ដោយទម្ងន់ខ្លួន ការដើរបោះជើង។ ប្រាំទៅដប់នាទីបូមទឹកសន្លាក់ក្ដៅចូលរាល់សន្លាក់ (ខ្លាញ់ផ្ទាល់របស់រាងកាយ) បង្កើនសីតុណ្ហភាពសាច់ដុំ ១–២ °C និងអនុវត្តលំនាំចលនាដែលការហាត់នឹងទាមទារ។ ផលិតភាពកម្លាំងកើនឡើង មិនមែនធ្លាក់ចុះ។"
                className="text-sm mt-3"
              />
              <div className="mt-4 rounded-lg p-3 border" style={{ backgroundColor: PANEL, borderColor: `${LIME}55` }}>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: LIME }} />
                  <div>
                    <div className={`text-[11px] font-bold mb-1 ${k ? "font-khmer" : "uppercase font-mono"}`} style={{ color: LIME }}>
                      {k ? "ឧទាហរណ៍ ៥ នាទី" : "5-minute example"}
                    </div>
                    <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                      {k
                        ? "ការបង្វិលដៃ ៣០ វិនាទី → ការបង្វិលជើង ៣០ វិនាទី → ការអង្គុយបង្គន់ដោយទម្ងន់ខ្លួន ១០ ដង → ការដើរបោះជើង ១០ ដង → ការ jumping jacks ៣០ វិនាទី។"
                        : "30 s arm circles → 30 s leg swings → 10 bodyweight squats → 10 walking lunges → 30 s jumping jacks."}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* Synovial joint diagram */}
          <Panel accent={CYAN} className="mt-5" testId="synovial-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Droplets className="w-5 h-5" style={{ color: CYAN }} />
              <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ខាងក្នុងសន្លាក់ ៖ ហេតុអ្វីការរំកិលៗរំអុលល្អ" : "Inside a joint: why moving warms it up"}
              </h3>
            </div>
            <SynovialJointDiagram k={k} />
          </Panel>
        </section>

        {/* Closing reflection */}
        <Panel accent={ORANGE} testId="closing-panel">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
            <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
              {k
                ? "សាច់ដុំនៅខាងក្នុងរាងកាយរបស់អ្នកបន្តរស់នៅទាំងគ្រាដែលអ្នកមិនធ្វើអ្វីសោះ — រហែកឡើងវិញ ជួសជុលឡើងវិញ ហើយរួម។ វាកំពុងបានបង្ហាត់ដោយរាល់សកម្មភាពរបស់អ្នក រួមទាំងភាពអត់ធ្មត់ផងដែរ។ លើករបស់ធ្ងន់ប្រាំ ៦ ដងក្នុងសប្ដាហ៍ ហើយពីរឆ្នាំពីពេលនេះ អ្នកនឹងជាមនុស្សផ្សេង។ រត់ ៣០ នាទីបីដងក្នុងសប្ដាហ៍ ហើយបេះដូងរបស់អ្នកនឹងលេងបទចម្រៀងដែលខ្លាំងជាងមុន។ ការសម្របខ្លួនពិតប្រាកដ — សន្សំពីមួយសប្ដាហ៍ទៅមួយសប្ដាហ៍ — ជាអ្វីដែលធ្វើឲ្យរាងកាយមនុស្សស្រស់ស្អាត។"
                : "The muscle inside your body is alive even at the moments when you do nothing — re-tearing, re-repairing, re-bundling. It is being trained by every action you take, including patience. Lift heavy six times in a week, and two years from now you will be a different person. Run thirty minutes three times a week, and your heart will play a louder song. The real adaptation — saved up week by week — is the thing that makes the human body beautiful."}
            </p>
          </div>
        </Panel>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: ORANGE, color: BG, boxShadow: `0 0 28px -10px ${ORANGE}` }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Hero backdrop — speed lines + topographic curves
// ════════════════════════════════════════════════════════════════════════════
function AthleticBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      viewBox="0 0 460 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ahGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.55" />
          <stop offset="60%" stopColor={SKY} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="380" cy="60" r="90" fill="url(#ahGlow)">
        <animate attributeName="r" values="80;110;80" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="200" r="70" fill="url(#ahGlow)">
        <animate attributeName="r" values="60;90;60" dur="6s" repeatCount="indefinite" />
      </circle>
      {/* speed/contour lines */}
      {[40, 80, 120, 160, 200].map((y, i) => (
        <path
          key={i}
          d={`M 0 ${y} Q 230 ${y - 18}, 460 ${y + 6}`}
          fill="none"
          stroke={`${ORANGE}33`}
          strokeWidth="0.7"
          strokeDasharray="3 6"
        />
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Hypertrophy diagram — fibre tear → repair → thicker
// ════════════════════════════════════════════════════════════════════════════
function HypertrophyDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${ORANGE}55` }}>
      <svg viewBox="0 0 460 195" className="w-full h-auto" role="img" aria-label={k ? "ដ្យាក្រាមហ៊ីប៉ឺត្រូហ្វី ៖ សរសៃសាច់ដុំធម្មតា ការរហែកមីក្រូ និងការក្រាស់ឡើងវិញ" : "Hypertrophy: a normal fibre, a microscopic tear, and the rebuilt thicker fibre"}>
        {/* Stage 1: normal fibre */}
        <g transform="translate(20,40)">
          <rect x="0" y="0" width="100" height="22" rx="11" fill={`${ROSE}33`} stroke={ROSE} strokeWidth="1.4" />
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={i} x1={10 + i*10} y1="3" x2={10 + i*10} y2="19" stroke={ROSE} strokeWidth="0.6" opacity="0.7" />
          ))}
          <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "១. សរសៃធម្មតា" : "1. normal fibre"}
          </text>
          <text x="50" y="95" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "មុនការហាត់" : "before workout"}
          </text>
        </g>

        {/* Heavy weight icon above stage 2 */}
        <g transform="translate(170,15)">
          <rect x="-4" y="0" width="48" height="6" fill={INK_SOFT} />
          <rect x="-12" y="-6" width="10" height="18" fill={INK_SOFT} />
          <rect x="42" y="-6" width="10" height="18" fill={INK_SOFT} />
        </g>

        {/* Stage 2: torn fibre */}
        <g transform="translate(170,40)">
          <rect x="0" y="0" width="100" height="22" rx="11" fill={`${RED}33`} stroke={RED} strokeWidth="1.4" />
          {/* tear marks */}
          <path d="M 30 4 L 28 18" stroke={RED} strokeWidth="1.6" />
          <path d="M 55 4 L 58 18" stroke={RED} strokeWidth="1.6" />
          <path d="M 75 4 L 73 18" stroke={RED} strokeWidth="1.6" />
          <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "២. រហែកមីក្រូ" : "2. micro-tears"}
          </text>
          <text x="50" y="95" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ភ្លាមៗបន្ទាប់ការហាត់" : "right after lifting"}
          </text>
        </g>

        {/* Sleep / repair icon */}
        <g transform="translate(290,28)">
          <text x="0" y="0" fontSize="14" fill={AMBER}>💤</text>
          <text x="0" y="14" fontSize="8" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ដេក" : "rest"}
          </text>
        </g>

        {/* Stage 3: thicker fibre */}
        <g transform="translate(330,33)">
          <rect x="0" y="0" width="110" height="34" rx="17" fill={`${LIME}33`} stroke={LIME} strokeWidth="1.6" />
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <line key={i} x1={10 + i*10} y1="4" x2={10 + i*10} y2="30" stroke={LIME} strokeWidth="0.8" opacity="0.8" />
          ))}
          <text x="55" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "៣. សរសៃក្រាស់ឡើង" : "3. thicker fibre"}
          </text>
          <text x="55" y="95" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "បន្ទាប់ ២៤–៧២ ម៉ោង" : "after 24–72 hours"}
          </text>
        </g>

        {/* Arrows */}
        <line x1="125" y1="51" x2="165" y2="51" stroke={INK_SOFT} strokeWidth="1" />
        <polygon points="165,51 156,46 156,56" fill={INK_SOFT} />
        <line x1="275" y1="51" x2="325" y2="51" stroke={INK_SOFT} strokeWidth="1" />
        <polygon points="325,51 316,46 316,56" fill={INK_SOFT} />

        {/* Legend bar bottom */}
        <text x="230" y="180" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ការហាត់ → ការខូច → ការជួសជុលលើស → ការក្រាស់ឡើង" : "Workout → damage → over-repair → growth"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Progressive Overload chart — staircase of weights
// ════════════════════════════════════════════════════════════════════════════
function ProgressiveOverloadChart({ k }: { k: boolean }) {
  const weeks = [20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5];
  const max = 40;
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${AMBER}55` }}>
      <svg viewBox="0 0 380 180" className="w-full h-auto" role="img" aria-label={k ? "តារាងការដាក់បន្ទុកជាបណ្ដើរៗ ៖ ទម្ងន់កើនឡើងបន្តិចម្ដងៗរាល់សប្ដាហ៍" : "Progressive overload chart: weight rises slightly each week"}>
        {/* Y-axis */}
        <line x1="40" y1="20" x2="40" y2="140" stroke={INK_SOFT} strokeWidth="0.8" />
        {/* X-axis */}
        <line x1="40" y1="140" x2="360" y2="140" stroke={INK_SOFT} strokeWidth="0.8" />
        <text x="20" y="25" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>kg</text>
        <text x="200" y="170" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សប្ដាហ៍" : "WEEK"}
        </text>

        {/* Bars */}
        {weeks.map((w, i) => {
          const x = 50 + i * 38;
          const h = (w / max) * 110;
          const y = 140 - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width="28" height={h} rx="3" fill={`${AMBER}88`} stroke={AMBER} strokeWidth="1" />
              <text x={x + 14} y={y - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill={AMBER} fontFamily="monospace">
                {k ? toKhNum(w) : w}
              </text>
              <text x={x + 14} y={152} textAnchor="middle" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? toKhNum(i + 1) : i + 1}
              </text>
            </g>
          );
        })}

        {/* Trend arrow */}
        <line x1="60" y1="85" x2="350" y2="20" stroke={ORANGE} strokeWidth="1.4" strokeDasharray="3 3" />
        <polygon points="350,20 340,22 344,30" fill={ORANGE} />
        <text x="320" y="40" textAnchor="end" fontSize="9" fontWeight="bold" fill={ORANGE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "+ ១ គ.ក. / សប្ដាហ៍" : "+ 1 kg / week"}
        </text>
      </svg>
      <div className={`text-[10px] mt-2 italic text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k ? "ការកើនឡើងទៀងទាត់តូចៗបន្តរក្សារាងកាយ «សួរសំណួរ»" : "Small steady increments keep the body 'asking the question'"}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bench Press anatomy
// ════════════════════════════════════════════════════════════════════════════
function BenchPressDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${ORANGE}55` }}>
      <svg viewBox="0 0 380 200" className="w-full h-auto" role="img" aria-label={k ? "កាយវិភាគ Bench Press ៖ ទ្រូង ស្មាមុខ និងត្រាយសេបបាញ់ជាមួយគ្នា" : "Bench press anatomy: chest, front shoulders, and triceps fire together"}>
        {/* Bench */}
        <rect x="80" y="130" width="220" height="14" rx="3" fill={INK_SOFT} opacity="0.4" />
        <rect x="90" y="144" width="6" height="40" fill={INK_SOFT} opacity="0.3" />
        <rect x="284" y="144" width="6" height="40" fill={INK_SOFT} opacity="0.3" />

        {/* Body silhouette */}
        <ellipse cx="100" cy="120" rx="22" ry="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1" />
        <rect x="120" y="106" width="120" height="28" rx="6" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1" />
        <rect x="240" y="110" width="60" height="20" rx="6" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1" />

        {/* Arms — bent up holding the bar */}
        <line x1="180" y1="115" x2="180" y2="60" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
        <line x1="220" y1="115" x2="220" y2="60" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />

        {/* Bar */}
        <rect x="120" y="50" width="180" height="6" rx="2" fill={INK} />
        <circle cx="118" cy="53" r="14" fill={ROSE} stroke={INK} strokeWidth="1.4" />
        <circle cx="302" cy="53" r="14" fill={ROSE} stroke={INK} strokeWidth="1.4" />
        <text x="118" y="56" textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">
          {k ? toKhNum(20) : 20}
        </text>
        <text x="302" y="56" textAnchor="middle" fontSize="9" fontWeight="bold" fill={BG} fontFamily="monospace">
          {k ? toKhNum(20) : 20}
        </text>

        {/* Muscle highlights with leader lines */}
        {[
          { x: 175, y: 120, lx: 50, ly: 165, en: "chest (pec)", kh: "ទ្រូង (pec)", color: ORANGE },
          { x: 200, y: 78,  lx: 200, ly: 30,  en: "front shoulder",   kh: "ស្មាមុខ",      color: AMBER },
          { x: 200, y: 95,  lx: 340, ly: 175, en: "triceps",          kh: "ត្រាយសេប",     color: VIOLET },
        ].map((lb, i) => (
          <g key={i}>
            <circle cx={lb.x} cy={lb.y} r="5" fill={lb.color} />
            <line x1={lb.x} y1={lb.y} x2={lb.lx} y2={lb.ly} stroke={lb.color} strokeWidth="0.8" strokeDasharray="2 2" />
            <text x={lb.lx} y={lb.ly + 10} textAnchor={lb.lx < 100 ? "start" : lb.lx > 300 ? "end" : "middle"} fontSize="9" fontWeight="bold" fill={lb.color} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? lb.kh : lb.en}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Pull-up anatomy
// ════════════════════════════════════════════════════════════════════════════
function PullupDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${ORANGE}55` }}>
      <svg viewBox="0 0 380 220" className="w-full h-auto" role="img" aria-label={k ? "កាយវិភាគ Pull-up ៖ ខ្នង ប៊ីសេប និងស្មាខាងក្រោយទាញរួមគ្នា" : "Pull-up anatomy: lats, biceps, and rear shoulders pull together"}>
        {/* Bar overhead */}
        <rect x="60" y="20" width="260" height="6" rx="2" fill={INK} />
        <rect x="58" y="0" width="6" height="22" fill={INK_SOFT} opacity="0.4" />
        <rect x="316" y="0" width="6" height="22" fill={INK_SOFT} opacity="0.4" />

        {/* Arms gripping the bar */}
        <line x1="160" y1="26" x2="155" y2="80" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
        <line x1="220" y1="26" x2="225" y2="80" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />

        {/* Head */}
        <ellipse cx="190" cy="70" rx="18" ry="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1" />

        {/* Torso (rear view-ish) */}
        <path
          d="M 150 84 L 230 84 L 245 170 L 135 170 Z"
          fill={`${INK_SOFT}33`}
          stroke={INK_SOFT}
          strokeWidth="1"
        />

        {/* Lat highlights — V-shape */}
        <path d="M 150 90 L 165 160" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
        <path d="M 230 90 L 215 160" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />

        {/* Legs */}
        <line x1="170" y1="170" x2="165" y2="210" stroke={INK_SOFT} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <line x1="210" y1="170" x2="215" y2="210" stroke={INK_SOFT} strokeWidth="4" strokeLinecap="round" opacity="0.5" />

        {/* Labels with leader lines */}
        {[
          { x: 158, y: 130, lx: 30,  ly: 145, en: "lats (back V)",     kh: "ខ្នង V (lats)",   color: ORANGE },
          { x: 165, y: 50,  lx: 50,  ly: 60,  en: "rear shoulders",    kh: "ស្មាខាងក្រោយ",     color: AMBER },
          { x: 215, y: 50,  lx: 350, ly: 60,  en: "biceps",            kh: "ប៊ីសេប",          color: VIOLET },
          { x: 220, y: 130, lx: 360, ly: 145, en: "upper back",        kh: "ខ្នងខាងលើ",       color: ROSE },
        ].map((lb, i) => (
          <g key={i}>
            <circle cx={lb.x} cy={lb.y} r="5" fill={lb.color} />
            <line x1={lb.x} y1={lb.y} x2={lb.lx} y2={lb.ly} stroke={lb.color} strokeWidth="0.8" strokeDasharray="2 2" />
            <text x={lb.lx} y={lb.ly + 10} textAnchor={lb.lx < 100 ? "start" : "end"} fontSize="9" fontWeight="bold" fill={lb.color} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? lb.kh : lb.en}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Compound vs Isolation comparison bar
// ════════════════════════════════════════════════════════════════════════════
function CompoundVsIsolationBar({ k }: { k: boolean }) {
  const rows = [
    { en: "Pull-up",      kh: "Pull-up",                muscles: 6, kind: "compound" as const },
    { en: "Bench press",  kh: "Bench press",            muscles: 5, kind: "compound" as const },
    { en: "Squat",        kh: "ការអង្គុយបង្គន់ Squat",  muscles: 6, kind: "compound" as const },
    { en: "Bicep curl",   kh: "ការវេះប៊ីសេប",            muscles: 1, kind: "isolation" as const },
    { en: "Calf raise",   kh: "ការលើកកំភួនជើង",          muscles: 1, kind: "isolation" as const },
  ];
  const max = 6;
  return (
    <div className="space-y-2 mt-2" data-testid="compound-comparison">
      {rows.map((r, i) => {
        const isC = r.kind === "compound";
        const color = isC ? ORANGE : INK_SOFT;
        return (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
              <span className={`text-[12px] ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? r.kh : r.en}
                <span className={`ml-2 text-[10px] ${k ? "font-khmer" : "uppercase font-mono"}`} style={{ color }}>
                  {k ? (isC ? "(រួម)" : "(ដាច់ដោយឡែក)") : (isC ? "(compound)" : "(isolation)")}
                </span>
              </span>
              <span className="text-sm font-extrabold font-mono" style={{ color }}>
                {k ? toKhNum(r.muscles) : r.muscles} <span className="text-[10px]" style={{ color: INK_SOFT }}>{k ? "ក្រុមសាច់ដុំ" : "muscle groups"}</span>
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: BG }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(r.muscles / max) * 100}%`,
                  background: `linear-gradient(90deg, ${color}55, ${color})`,
                  boxShadow: `0 0 8px ${color}`,
                }}
                role="progressbar"
                aria-valuenow={r.muscles}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={k ? r.kh : r.en}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Cardio diagram — heart pumps + oxygen capillary network
// ════════════════════════════════════════════════════════════════════════════
function CardioDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${SKY}55` }}>
      <svg viewBox="0 0 460 220" className="w-full h-auto" role="img" aria-label={k ? "ការសម្របខ្លួនបេះដូង ៖ បន្ទប់បេះដូងកើនឡើង បេះដូងពេលសម្រាកមានចង្វាក់ទាបជាងមុន និងសរសៃឈាមតូចគុណច្រើន" : "Cardio adaptations: heart chamber enlarges, resting heart rate drops, capillaries multiply"}>
        {/* Beating heart */}
        <g transform="translate(80,90)">
          <path
            d="M 0 0 C -30 -30, -60 -10, 0 40 C 60 -10, 30 -30, 0 0 Z"
            fill={ROSE}
            stroke={ROSE}
            strokeWidth="1.4"
          >
            <animateTransform attributeName="transform" type="scale" values="1;1.12;1" dur="1.3s" repeatCount="indefinite" />
          </path>
          <text x="0" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "បេះដូង · ស្នប់" : "HEART · pump"}
          </text>
        </g>

        {/* Resting HR before/after */}
        <g transform="translate(180,40)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ចង្វាក់បេះដូងពេលសម្រាក" : "RESTING HEART RATE"}
          </text>
          <g transform="translate(0,12)">
            <text x="0" y="14" fontSize="10" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "មុន ៖" : "before:"}
            </text>
            <text x="60" y="14" fontSize="14" fontWeight="bold" fill={RED} fontFamily="monospace">
              {k ? toKhNum(75) : 75} bpm
            </text>
          </g>
          <g transform="translate(0,32)">
            <text x="0" y="14" fontSize="10" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ក្រោយ ៖" : "after:"}
            </text>
            <text x="60" y="14" fontSize="14" fontWeight="bold" fill={LIME} fontFamily="monospace">
              {k ? toKhNum(58) : 58} bpm
            </text>
          </g>
          {/* ECG line */}
          <polyline
            points="0,75 20,75 25,60 30,90 35,75 60,75 65,55 70,95 75,75 100,75 105,60 110,90 115,75 140,75"
            fill="none"
            stroke={ROSE}
            strokeWidth="1.4"
          />
        </g>

        {/* Capillary network growth */}
        <g transform="translate(330,40)">
          <text x="60" y="0" textAnchor="middle" fontSize="10" fontWeight="bold" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សរសៃឈាមតូច" : "CAPILLARIES"}
          </text>
          <text x="60" y="14" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "កើនច្រើនក្នុងសាច់ដុំ" : "multiply in muscle"}
          </text>
          {/* sparse on left, dense on right */}
          <g transform="translate(0,30)">
            <rect x="0" y="0" width="50" height="60" fill={`${SKY}11`} stroke={`${SKY}55`} strokeWidth="0.8" />
            {[
              [10, 10], [40, 25], [25, 50],
            ].map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2" fill={SKY} />
            ))}
            <text x="25" y="78" textAnchor="middle" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "មុន" : "before"}
            </text>
          </g>
          <g transform="translate(70,30)">
            <rect x="0" y="0" width="50" height="60" fill={`${SKY}22`} stroke={SKY} strokeWidth="1" />
            {[
              [8,8],[20,12],[35,8],[12,22],[28,28],[40,22],[8,38],[24,42],[38,38],[16,52],[32,52],[44,48],
            ].map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2" fill={SKY} />
            ))}
            <text x="25" y="78" textAnchor="middle" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ក្រោយ" : "after"}
            </text>
          </g>
        </g>

        {/* Bottom upgrades strip */}
        <g transform="translate(20,180)">
          {[
            { en: "↑ Heart chamber size",   kh: "↑ ទំហំបន្ទប់បេះដូង",      color: ROSE },
            { en: "↓ Resting HR (10–20 bpm)", kh: "↓ ចង្វាក់សម្រាក (១០–២០ bpm)",  color: LIME },
            { en: "↑ Lung capillaries",      kh: "↑ សរសៃឈាមតូចសួត",         color: SKY },
            { en: "↑ O₂ delivery efficiency", kh: "↑ ប្រសិទ្ធភាពដឹកអុកស៊ីសែន", color: AMBER },
          ].map((u, i) => (
            <g key={i} transform={`translate(${i * 110},0)`}>
              <rect x="0" y="0" width="105" height="22" rx="11" fill={`${u.color}22`} stroke={u.color} strokeWidth="1" />
              <text x="52" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={u.color} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? u.kh : u.en}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Static stretch — figure touching toes (cold)
// ════════════════════════════════════════════════════════════════════════════
function StaticStretchDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${RED}55` }}>
      <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label={k ? "ការទាញសាច់ដុំស្ងៀម ៖ ឈរស្ងៀម ពត់ខ្លួន ប៉ះម្រាមជើង រយៈពេលយូរ" : "Static stretching: standing still, folded over, touching toes for a long hold"}>
        {/* ground */}
        <line x1="40" y1="160" x2="280" y2="160" stroke={INK_SOFT} strokeWidth="1" />

        {/* Cold-blue figure folded */}
        <g stroke={SKY} strokeWidth="3" fill="none" strokeLinecap="round">
          {/* Hips */}
          <circle cx="160" cy="80" r="6" fill={SKY} />
          {/* Legs straight down */}
          <line x1="160" y1="86" x2="150" y2="158" />
          <line x1="160" y1="86" x2="170" y2="158" />
          {/* Torso bent forward */}
          <line x1="160" y1="80" x2="190" y2="125" />
          {/* Head down */}
          <circle cx="200" cy="135" r="10" fill={`${SKY}55`} />
          {/* Arms reaching to toes */}
          <line x1="190" y1="125" x2="170" y2="155" />
          <line x1="200" y1="130" x2="180" y2="158" />
        </g>

        {/* Snowflake / cold marker on muscle */}
        <g transform="translate(150,130)">
          <circle r="9" fill={`${SKY}33`} stroke={SKY} strokeWidth="1" />
          <text x="0" y="3" textAnchor="middle" fontSize="11">❄</text>
        </g>
        <text x="115" y="135" textAnchor="end" fontSize="9" fontWeight="bold" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សាច់ដុំត្រជាក់" : "cold muscle"}
        </text>

        {/* Hold timer */}
        <g transform="translate(255,30)">
          <circle r="22" fill={`${RED}22`} stroke={RED} strokeWidth="1.4" />
          <text x="0" y="-2" textAnchor="middle" fontSize="11" fontWeight="bold" fill={RED} fontFamily="monospace">
            {k ? toKhNum(30) : 30}
          </text>
          <text x="0" y="10" textAnchor="middle" fontSize="7" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "វិនាទី" : "sec"}
          </text>
        </g>

        {/* Big DO NOT marker */}
        <g transform="translate(40,30)">
          <circle r="22" fill={`${RED}22`} stroke={RED} strokeWidth="1.6" />
          <line x1="-13" y1="-13" x2="13" y2="13" stroke={RED} strokeWidth="3" strokeLinecap="round" />
          <line x1="13" y1="-13" x2="-13" y2="13" stroke={RED} strokeWidth="3" strokeLinecap="round" />
        </g>
        <text x="40" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "កុំ មុនហាត់" : "Not before lifting"}
        </text>

        {/* Power loss banner */}
        <g transform="translate(70,170)">
          <rect x="0" y="-10" width="180" height="14" rx="7" fill={`${RED}33`} stroke={RED} strokeWidth="1" />
          <text x="90" y="0" textAnchor="middle" fontSize="9" fontWeight="bold" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "កម្លាំងធ្លាក់ ៥–១០% រយៈពេល ១ ម៉ោង" : "−5 to −10 % power for ~1 hour"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Dynamic stretch — three motion-frame figures
// ════════════════════════════════════════════════════════════════════════════
function DynamicStretchDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${LIME}55` }}>
      <svg viewBox="0 0 380 180" className="w-full h-auto" role="img" aria-label={k ? "ការទាញសាច់ដុំថាមវន្ត ៖ ការបង្វិលដៃ ការបង្វិលជើង និងការអង្គុយបង្គន់ដោយទម្ងន់ខ្លួន" : "Dynamic stretching: arm circles, leg swings, and bodyweight squats"}>
        {/* ground */}
        <line x1="20" y1="160" x2="360" y2="160" stroke={INK_SOFT} strokeWidth="1" />

        {/* Frame 1 — arm circles */}
        <g stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round">
          <circle cx="60" cy="40" r="12" fill={`${LIME}55`} />
          <line x1="60" y1="52" x2="60" y2="120" />
          <line x1="60" y1="120" x2="48" y2="158" />
          <line x1="60" y1="120" x2="72" y2="158" />
          {/* Arm rotating */}
          <path d="M 60 70 A 22 22 0 1 1 60 69.9" stroke={LIME} strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <line x1="60" y1="70" x2="82" y2="80" />
        </g>
        <text x="60" y="178" textAnchor="middle" fontSize="9" fontWeight="bold" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ការបង្វិលដៃ" : "arm circles"}
        </text>

        {/* Frame 2 — leg swing */}
        <g stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round">
          <circle cx="180" cy="40" r="12" fill={`${LIME}55`} />
          <line x1="180" y1="52" x2="180" y2="120" />
          <line x1="180" y1="120" x2="170" y2="158" />
          {/* Swinging leg */}
          <line x1="180" y1="120" x2="220" y2="135" />
          {/* Motion trail */}
          <path d="M 180 130 Q 200 110, 220 135" stroke={LIME} strokeWidth="1" strokeDasharray="2 3" fill="none" opacity="0.6" />
          {/* Arms */}
          <line x1="180" y1="65" x2="160" y2="100" />
          <line x1="180" y1="65" x2="200" y2="100" />
        </g>
        <text x="180" y="178" textAnchor="middle" fontSize="9" fontWeight="bold" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ការបង្វិលជើង" : "leg swings"}
        </text>

        {/* Frame 3 — bodyweight squat */}
        <g stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round">
          <circle cx="320" cy="60" r="12" fill={`${LIME}55`} />
          <line x1="320" y1="72" x2="320" y2="115" />
          {/* Bent legs squatting */}
          <line x1="320" y1="115" x2="298" y2="135" />
          <line x1="298" y1="135" x2="304" y2="158" />
          <line x1="320" y1="115" x2="342" y2="135" />
          <line x1="342" y1="135" x2="336" y2="158" />
          {/* Arms forward */}
          <line x1="320" y1="85" x2="350" y2="95" />
          <line x1="320" y1="85" x2="290" y2="95" />
          {/* down/up motion arrows */}
          <line x1="362" y1="80" x2="362" y2="135" stroke={LIME} strokeWidth="1" strokeDasharray="2 2" />
          <polygon points="362,135 358,128 366,128" fill={LIME} />
          <polygon points="362,80 358,87 366,87" fill={LIME} />
        </g>
        <text x="320" y="178" textAnchor="middle" fontSize="9" fontWeight="bold" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ការអង្គុយបង្គន់" : "bodyweight squats"}
        </text>

        {/* Big DO marker */}
        <g transform="translate(360,28)">
          <circle r="18" fill={`${LIME}33`} stroke={LIME} strokeWidth="1.6" />
          <path d="M -8 0 L -2 7 L 9 -6" stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Heat-up gauge */}
        <g transform="translate(20,15)">
          <Flame_icon />
          <text x="20" y="6" fontSize="9" fontWeight="bold" fill={ORANGE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "+ ១–២ °C សាច់ដុំ" : "+ 1–2 °C muscle"}
          </text>
        </g>
      </svg>
    </div>
  );
}

function Flame_icon() {
  return (
    <g>
      <path d="M 0 8 C -6 4, -6 -4, 0 -8 C 4 -2, 8 -2, 4 4 C 2 0, 0 2, 0 8 Z" fill={ORANGE} />
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Synovial joint — simplified hinge with pumping fluid
// ════════════════════════════════════════════════════════════════════════════
function SynovialJointDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL, borderColor: `${CYAN}55` }}>
      <svg viewBox="0 0 460 220" className="w-full h-auto" role="img" aria-label={k ? "សន្លាក់ ៖ ឆ្អឹងពីរ ខ្ចីសន្លាក់ និងទឹកសន្លាក់ប្រឡាក់" : "Synovial joint: two bones, cartilage, and lubricating fluid"}>
        {/* Upper bone */}
        <g>
          <rect x="160" y="20" width="40" height="80" rx="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1.2" />
          <ellipse cx="180" cy="100" rx="36" ry="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1.2" />
          <text x="120" y="60" textAnchor="end" fontSize="10" fontWeight="bold" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឆ្អឹងខាងលើ" : "upper bone"}
          </text>
          <line x1="125" y1="58" x2="158" y2="58" stroke={INK_SOFT} strokeWidth="0.8" strokeDasharray="2 2" />
        </g>

        {/* Cartilage caps */}
        <ellipse cx="180" cy="106" rx="36" ry="6" fill={VIOLET} opacity="0.8" />
        <ellipse cx="180" cy="124" rx="36" ry="6" fill={VIOLET} opacity="0.8" />
        <text x="240" y="115" fontSize="10" fontWeight="bold" fill={VIOLET} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ខ្ចីសន្លាក់" : "cartilage"}
        </text>
        <line x1="218" y1="113" x2="237" y2="113" stroke={VIOLET} strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Joint capsule */}
        <ellipse cx="180" cy="115" rx="46" ry="20" fill="none" stroke={CYAN} strokeWidth="1.4" strokeDasharray="3 3" />

        {/* Synovial fluid droplets — animated */}
        {[
          { cx: 150, cy: 110 }, { cx: 165, cy: 120 }, { cx: 195, cy: 110 }, { cx: 210, cy: 118 }, { cx: 180, cy: 115 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="3" fill={CYAN} opacity="0.85">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="1.6s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="120" y="130" textAnchor="end" fontSize="10" fontWeight="bold" fill={CYAN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ទឹកសន្លាក់" : "synovial fluid"}
        </text>
        <line x1="125" y1="128" x2="155" y2="128" stroke={CYAN} strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Lower bone */}
        <g>
          <ellipse cx="180" cy="130" rx="36" ry="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1.2" />
          <rect x="160" y="130" width="40" height="80" rx="14" fill={`${INK_SOFT}33`} stroke={INK_SOFT} strokeWidth="1.2" />
          <text x="120" y="180" textAnchor="end" fontSize="10" fontWeight="bold" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឆ្អឹងខាងក្រោម" : "lower bone"}
          </text>
          <line x1="125" y1="178" x2="158" y2="178" stroke={INK_SOFT} strokeWidth="0.8" strokeDasharray="2 2" />
        </g>

        {/* Right side comparison: cold vs warm */}
        <g transform="translate(290,30)">
          <text x="60" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ត្រជាក់ → ក្ដៅ" : "COLD → WARM"}
          </text>

          <g transform="translate(0,18)">
            <rect x="0" y="0" width="50" height="60" rx="6" fill={`${SKY}11`} stroke={SKY} strokeWidth="1" />
            {[[15,15],[35,30],[20,45]].map((p,i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={SKY} opacity="0.6" />)}
            <text x="25" y="78" textAnchor="middle" fontSize="9" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ត្រជាក់" : "cold"}
            </text>
            <text x="25" y="92" textAnchor="middle" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ឌិសសន្លាក់ស្ងួត" : "stiff joint"}
            </text>
          </g>

          {/* arrow */}
          <line x1="55" y1="50" x2="65" y2="50" stroke={INK_SOFT} strokeWidth="1" />
          <polygon points="65,50 60,46 60,54" fill={INK_SOFT} />

          <g transform="translate(70,18)">
            <rect x="0" y="0" width="50" height="60" rx="6" fill={`${ORANGE}11`} stroke={ORANGE} strokeWidth="1" />
            {[[10,10],[25,18],[40,12],[15,28],[32,32],[42,40],[10,45],[28,48],[40,28]].map((p,i) =>
              <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={ORANGE} opacity="0.85" />
            )}
            <text x="25" y="78" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ក្ដៅ" : "warm"}
            </text>
            <text x="25" y="92" textAnchor="middle" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "សន្លាក់រលូន" : "smooth joint"}
            </text>
          </g>
        </g>

        {/* Bottom caption */}
        <text x="230" y="210" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k
            ? "ចលនាបូមទឹកសន្លាក់ ហើយធ្វើឲ្យឆ្លងផ្ទៃខ្ចីសន្លាក់ — ដូចជាការចាក់ប្រេងលើគ្រឿងម៉ាស៊ីន។"
            : "Movement pumps synovial fluid across the cartilage — like oiling a machine before running it."}
        </text>
      </svg>
    </div>
  );
}

// keep helper-icon imports referenced
const _iconKeep: React.ComponentType[] = [Wind, Zap, Repeat, AlertTriangle, TrendingUp];
void _iconKeep;
