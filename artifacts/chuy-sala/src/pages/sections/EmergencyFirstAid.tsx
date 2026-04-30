import {
  Activity,
  AlertTriangle,
  Ban,
  CheckCircle2,
  Droplets,
  HeartPulse,
  Hourglass,
  Stethoscope,
  ThermometerSun,
  Wind,
} from "lucide-react";

type T = (en: string, kh: string) => string;

const ROSE       = "#be123c";
const ROSE_DEEP  = "#881337";
const SUNRISE    = "#ea580c";
const AMBER      = "#b45309";
const SAGE       = "#15803d";
const MED_BLUE   = "#0284c7";
const SLATE      = "#1e293b";

// ─── Tiny snake icon (lucide has no snake) ─────────────────────────────────
function SnakeIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Coiled snake body */}
      <path d="M5 18c0-2 2-3 4-3s4 1 4 3" />
      <path d="M5 18c0 1.5 1.2 2.5 3 2.5s3-1 3-2.5" />
      <path d="M13 15c0-2-2-3-2-5s2-3 4-3 4 1.5 4 3.5" />
      <path d="M19 10.5c0 1.2-1 2-2.2 2" />
      {/* Head + eye + tongue */}
      <circle cx="17" cy="6" r="1.6" fill="currentColor" />
      <path d="M18.4 5.4l1.6-1" />
      <path d="M18.4 6.6l1.6 1" />
    </svg>
  );
}

// ─── Sub-section header (local copy of the page-level pattern) ────────────
function SubHeader({
  k,
  spec,
  Icon,
  en,
  kh,
  enLead,
  khLead,
  accent,
}: {
  k: boolean;
  spec: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  enLead: string;
  khLead: string;
  accent: string;
}) {
  return (
    <div className="mt-10 mb-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.25em] ${
              k ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
            style={{ color: accent }}
          >
            {k ? `ផ្នែករង · ${spec}` : `Sub-section · ${spec}`}
          </div>
          <div className={`font-bold text-lg sm:text-xl text-slate-900 leading-tight ${k ? "font-khmer" : ""}`}>
            {k ? kh : en}
          </div>
          {/* Always show the other language under the heading for full bilingual coverage */}
          <div
            className={`text-[12px] sm:text-sm text-slate-500 leading-tight mt-0.5 ${
              k ? "" : "font-khmer"
            }`}
          >
            {k ? en : kh}
          </div>
        </div>
      </div>
      <div
        className="rounded-r-md border-l-4 pl-3 py-1"
        style={{ borderColor: accent }}
      >
        <p
          className={`text-sm text-slate-700 max-w-3xl ${
            k ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {k ? khLead : enLead}
        </p>
      </div>
    </div>
  );
}

// ─── Action list line item (used in DO / DO NOT cards and the Fix list) ──
function ActionLine({
  k,
  Icon,
  en,
  kh,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  accent: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: accent }}
        aria-hidden="true"
      />
      <span
        className={`text-sm text-slate-800 ${
          k ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {k ? kh : en}
      </span>
    </li>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────
export function EmergencyFirstAid({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-emergency-first-aid">
      {/* SECTION HEADER */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
          style={{ backgroundColor: ROSE }}
        >
          SEC-05
        </span>
        <HeartPulse className="w-5 h-5" style={{ color: ROSE }} aria-hidden="true" />
        <h2
          className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: SLATE }}
          data-testid="efa-heading"
        >
          {t(
            "The Golden Hour: Emergency First Aid",
            "ម៉ោងមាស៖ ជំនួយសង្គ្រោះបឋមបន្ទាន់",
          )}
        </h2>
        <div
          className="flex-1 border-t-2 border-dotted"
          style={{ borderColor: `${ROSE}55` }}
        />
      </div>

      {/* Always-bilingual subtitle (other language under the main heading) */}
      <p
        className={`mb-4 text-sm text-slate-500 ${k ? "" : "font-khmer"}`}
        aria-hidden={false}
      >
        {k
          ? "The Golden Hour: Emergency First Aid"
          : "ម៉ោងមាស៖ ជំនួយសង្គ្រោះបឋមបន្ទាន់"}
      </p>

      <p
        className={`text-sm text-slate-700 mb-2 max-w-3xl ${
          k ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {t(
          "When a serious emergency happens in a rural village, the doctor is far away and the ambulance is an hour or more behind. The very first people on the scene — usually neighbours, family, and bystanders — are the ones who actually decide whether the patient survives. The four scenes below cover the most common rural emergencies and the simple, evidence-based actions that save lives.",
          "នៅពេលដែលគ្រោះអាសន្នធ្ងន់ធ្ងរកើតឡើងនៅក្នុងភូមិជនបទ វេជ្ជបណ្ឌិតគឺនៅឆ្ងាយ ហើយរថយន្តសង្គ្រោះត្រូវការម៉ោងមួយ ឬច្រើនជាងនេះ។ មនុស្សដំបូងគេនៅទីកើតហេតុ — ភាគច្រើនជាអ្នកជិតខាង គ្រួសារ និងអ្នកបាននៅជិតនោះ — គឺជាមនុស្សដែលសម្រេចថា អ្នកជំងឺនឹងរស់ឬស្លាប់។ ឈុតទាំង ៤ ខាងក្រោម គ្របដណ្តប់លើគ្រោះអាសន្នជនបទដែលជួបញឹកញាប់បំផុត និងសកម្មភាពសាមញ្ញដែលផ្អែកលើភស្តុតាងវិទ្យាសាស្ត្រ ដែលជួយសង្គ្រោះជីវិត។",
        )}
      </p>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* SUB 5.1 — The Golden Hour                                      */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <SubHeader
        k={k}
        spec="5.1"
        Icon={Hourglass}
        en="The Golden Hour"
        kh="ម៉ោងមាស"
        enLead="The first 60 minutes after severe trauma decide everything that comes after."
        khLead="៦០ នាទីដំបូងក្រោយរបួសធ្ងន់ធ្ងរ សម្រេចគ្រប់យ៉ាងដែលមកក្រោយ។"
        accent={SUNRISE}
      />

      <div
        className="rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm"
        style={{ borderColor: `${SUNRISE}55` }}
        data-testid="efa-golden-hour-card"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${SUNRISE}14`, border: `1px solid ${SUNRISE}33` }}
          >
            <Hourglass className="w-5 h-5" style={{ color: SUNRISE }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("The first 60 minutes", "៦០ នាទីដំបូង")}
            </div>
            <div
              className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                k ? "font-khmer normal-case tracking-normal" : ""
              }`}
              style={{ color: SUNRISE }}
            >
              {t("trauma · the bystander window", "របួស · ពេលវេលារបស់អ្នកជិតខាង")}
            </div>
          </div>
        </div>

        <p
          className={`mt-4 text-sm sm:text-[15px] text-slate-700 ${
            k ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "Doctors call the first 60 minutes after a severe injury the “Golden Hour.” Inside that hour, the body is still fighting hard — the heart is still pumping, the brain is still receiving oxygen, and bleeding can usually still be controlled. After that hour, the body's systems start to fail one after another. In a city this might mean reaching the operating room. In a rural village, where the hospital can be far away, the meaning is sharper still: the actions taken by ordinary bystanders in the first 5 to 10 minutes — keeping the airway open, stopping the bleeding, calming the patient, immobilising broken limbs — are what decide whether the patient is still alive when help finally arrives.",
            "វេជ្ជបណ្ឌិតហៅ ៦០ នាទីដំបូងក្រោយរបួសធ្ងន់ធ្ងរ ថាជា «ម៉ោងមាស»។ ក្នុងម៉ោងនោះ រាងកាយនៅតែតស៊ូយ៉ាងខ្លាំង — បេះដូងនៅតែបូម ខួរក្បាលនៅតែទទួលអុកស៊ីហ្សែន ហើយការហូរឈាមជាធម្មតានៅអាចបញ្ឈប់បាន។ បន្ទាប់ពីម៉ោងនោះ ប្រព័ន្ធក្នុងរាងកាយចាប់ផ្តើមបរាជ័យជាបន្តបន្ទាប់។ នៅក្នុងទីក្រុង នេះអាចមានន័យថាទៅដល់បន្ទប់វះកាត់។ នៅក្នុងភូមិជនបទ ដែលមន្ទីរពេទ្យអាចនៅឆ្ងាយ អត្ថន័យកាន់តែច្បាស់ ៖ សកម្មភាពដែលធ្វើដោយអ្នកជិតខាងធម្មតានៅ ៥ ទៅ ១០ នាទីដំបូង — បើកផ្លូវដង្ហើមឲ្យស្រួល បញ្ឈប់ការហូរឈាម ធ្វើឲ្យអ្នកជំងឺស្ងប់ចិត្ត និងការពារអវយវៈដែលបាក់កុំឲ្យកម្រើក — គឺជាអ្វីដែលសម្រេចថាអ្នកជំងឺនៅរស់ ពេលជំនួយមកដល់ចុងក្រោយ ឬអត់។",
          )}
        </p>

        <div
          className="mt-4 rounded-2xl p-3 border-l-4 border"
          style={{
            backgroundColor: `${SUNRISE}10`,
            borderLeftColor: SUNRISE,
            borderColor: `${SUNRISE}33`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4" style={{ color: SUNRISE }} aria-hidden="true" />
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${
                k ? "font-khmer normal-case tracking-normal" : ""
              }`}
              style={{ color: SUNRISE }}
            >
              {t("Key idea", "គំនិតសំខាន់")}
            </span>
          </div>
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "You do not have to be a doctor to save a life. You only have to keep the patient alive long enough to reach one.",
              "អ្នកមិនចាំបាច់ជាវេជ្ជបណ្ឌិត ដើម្បីសង្គ្រោះជីវិតមួយ។ អ្នកគ្រាន់តែត្រូវរក្សាអ្នកជំងឺឲ្យនៅរស់ យូរល្មមដើម្បីជួបវេជ្ជបណ្ឌិតប៉ុណ្ណោះ។",
            )}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* SUB 5.2 — Snakebites: Myths & Reality                          */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <SubHeader
        k={k}
        spec="5.2"
        Icon={SnakeIcon}
        en="Snakebites — The Myths & The Reality"
        kh="ពស់ចឹក — រឿងជឿខុស និងការពិត"
        enLead="More limbs are lost to the village's bad first aid than to the snake itself."
        khLead="ដៃជើងបាត់បង់ច្រើនជាងដោយសារជំនួយដំបូងខុសរបស់ភូមិ ជាងដោយសារពស់ខ្លួនឯង។"
        accent={ROSE}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* DO NOT card */}
        <div
          className="rounded-3xl border-2 p-5 sm:p-6 bg-white shadow-sm flex flex-col"
          style={{
            borderColor: `${ROSE}55`,
            boxShadow: `0 0 0 1px ${ROSE}22 inset, 0 12px 30px -16px ${ROSE}66`,
          }}
          data-testid="efa-snakebite-donot"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${ROSE}14`, border: `1px solid ${ROSE}33` }}
            >
              <Ban className="w-5 h-5" style={{ color: ROSE }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: ROSE_DEEP }}>
                {t("DO NOT — Danger", "កុំធ្វើ — គ្រោះថ្នាក់")}
              </h4>
              <div
                className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                  k ? "font-khmer normal-case tracking-normal" : ""
                }`}
                style={{ color: ROSE }}
              >
                {t("village myths that kill limbs", "រឿងជឿខុសក្នុងភូមិដែលបំផ្លាញដៃជើង")}
              </div>
            </div>
          </div>

          <ul className="space-y-3">
            <ActionLine
              k={k}
              Icon={Ban}
              accent={ROSE}
              en="Never tie a tight rope or tourniquet above the bite. It does not stop the venom — it traps it in one place, kills the muscle and skin, and very often costs the patient the entire arm or leg through amputation later."
              kh="កុំចងខ្សែ ឬខ្សែរ៉ូបយ៉ាងណែនលើស្នាមចឹក។ វាមិនបញ្ឈប់ជាតិពិសទេ — វាចាប់ជាតិពិសនៅកន្លែងតែមួយ សម្លាប់សាច់ដុំ និងស្បែក ហើយជាញឹកញាប់ ធ្វើឲ្យអ្នកជំងឺត្រូវបាត់បង់ដៃ ឬជើងទាំងមូលដោយការកាត់ផ្តាច់នៅពេលក្រោយ។"
            />
            <ActionLine
              k={k}
              Icon={Ban}
              accent={ROSE}
              en="Never cut the wound open with a knife. The cut adds a second injury, lets germs in, and does not remove any meaningful amount of venom."
              kh="កុំកាត់ស្នាមរបួសដោយកាំបិត។ ការកាត់បន្ថែមរបួសទីពីរ បើកផ្លូវឲ្យមេរោគចូល ហើយមិនបញ្ចេញជាតិពិសក្នុងបរិមាណមានន័យឡើយ។"
            />
            <ActionLine
              k={k}
              Icon={Ban}
              accent={ROSE}
              en="Never try to suck the venom out by mouth. The venom enters the helper's blood through gum or tooth wounds, and almost none actually leaves the patient."
              kh="កុំព្យាយាមបឺតជាតិពិសចេញតាមមាត់។ ជាតិពិសចូលក្នុងឈាមរបស់អ្នកជួយតាមអញ្ចាញ ឬរបួសក្នុងធ្មេញ ហើយជាតិពិសស្ទើរតែមិនចេញពីអ្នកជំងឺឡើយ។"
            />
            <ActionLine
              k={k}
              Icon={Ban}
              accent={ROSE}
              en="Never give the patient alcohol or stimulants to “strengthen” them. They speed up the heart and pump the venom around the body faster."
              kh="កុំឲ្យអ្នកជំងឺផឹកស្រា ឬគ្រឿងជំរុញដទៃទៀត ដើម្បី «ឲ្យមានកម្លាំង»។ វាធ្វើឲ្យបេះដូងលោតលឿន ហើយបូមជាតិពិសទៅគ្រប់រាងកាយកាន់តែលឿន។"
            />
          </ul>
        </div>

        {/* DO card */}
        <div
          className="rounded-3xl border-2 p-5 sm:p-6 bg-white shadow-sm flex flex-col"
          style={{
            borderColor: `${SAGE}55`,
            boxShadow: `0 0 0 1px ${SAGE}22 inset, 0 12px 30px -16px ${SAGE}66`,
          }}
          data-testid="efa-snakebite-do"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${SAGE}14`, border: `1px solid ${SAGE}33` }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: SAGE }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SAGE }}>
                {t("DO — Safe", "ត្រូវធ្វើ — សុវត្ថិភាព")}
              </h4>
              <div
                className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                  k ? "font-khmer normal-case tracking-normal" : ""
                }`}
                style={{ color: SAGE }}
              >
                {t("what genuinely buys time", "អ្វីដែលពិតជាទិញពេលវេលា")}
              </div>
            </div>
          </div>

          <ul className="space-y-3">
            <ActionLine
              k={k}
              Icon={CheckCircle2}
              accent={SAGE}
              en="Keep the patient completely calm — sit them down, speak softly, do not let them run or panic. A slower heart rate is the single most powerful brake on how fast the venom spreads."
              kh="ធ្វើឲ្យអ្នកជំងឺស្ងប់ចិត្តទាំងស្រុង — ឲ្យគេអង្គុយ និយាយយ៉ាងស្រទន់ កុំឲ្យគេរត់ ឬភ័យ។ ការលោតបេះដូងយឺត គឺជាឧបករណ៍ទប់ដ៏ខ្លាំងបំផុតលើល្បឿនរីករាលនៃជាតិពិស។"
            />
            <ActionLine
              k={k}
              Icon={CheckCircle2}
              accent={SAGE}
              en="Immobilise the bitten limb with a splint — a stick, a piece of bamboo, a folded board — tied gently with cloth above and below the bite so the limb cannot bend. Hold it lower than the heart if possible."
              kh="ការពារអវយវៈដែលត្រូវចឹក ដោយឧបករណ៍ដាក់ឆ្អឹង (ស្ពឺ) — បន្ទះឈើ ឫស្សី ឬក្ដារបត់ — ចងយ៉ាងថ្នមៗដោយសំពត់នៅខាងលើ និងខាងក្រោមស្នាមចឹក ដើម្បីកុំឲ្យអវយវៈនោះកម្រើក។ បើអាច រក្សាវាទាបជាងបេះដូង។"
            />
            <ActionLine
              k={k}
              Icon={CheckCircle2}
              accent={SAGE}
              en="Remove rings, bracelets, and tight clothing from the bitten limb before it swells, so blood flow is not cut off later."
              kh="ដោះចិញ្ចៀន កងដៃ និងសម្លៀកបំពាក់តឹងពីអវយវៈដែលត្រូវចឹក មុនពេលវាហើម ដើម្បីកុំឲ្យចរន្តឈាមត្រូវបានកាត់ផ្តាច់នៅពេលក្រោយ។"
            />
            <ActionLine
              k={k}
              Icon={CheckCircle2}
              accent={SAGE}
              en="Transport to a hospital with anti-venom immediately — by motorbike, tuk-tuk, or car — without any further delay. If safe and possible, take a clear photo of the snake (do not chase or kill it) so doctors know which anti-venom to give."
              kh="ដឹកអ្នកជំងឺទៅមន្ទីរពេទ្យដែលមានថ្នាំប្រឆាំងជាតិពិសភ្លាមៗ — ដោយម៉ូតូ ទុកទុក ឬឡាន — ដោយមិនពន្យារពេលទៀតទេ។ បើមានសុវត្ថិភាព និងអាចធ្វើបាន ថតរូបពស់ឲ្យច្បាស់ (កុំដេញ ឬសម្លាប់វា) ដើម្បីឲ្យវេជ្ជបណ្ឌិតដឹងថា ត្រូវផ្តល់ថ្នាំប្រឆាំងជាតិពិសប្រភេទណា។"
            />
          </ul>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* SUB 5.3 — Heat Stroke vs Heat Exhaustion                       */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <SubHeader
        k={k}
        spec="5.3"
        Icon={ThermometerSun}
        en="Heat Stroke vs. Heat Exhaustion"
        kh="ជំងឺខ្យល់គរដោយកម្តៅ ធៀបនឹងអស់កម្លាំងដោយកម្តៅ"
        enLead="One is the body fighting the heat. The other is the body losing the fight — and that one kills."
        khLead="មួយគឺរាងកាយកំពុងតស៊ូនឹងកម្តៅ។ មួយទៀតគឺរាងកាយកំពុងចាញ់ — ហើយមួយនោះសម្លាប់។"
        accent={SUNRISE}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Heat Exhaustion */}
        <div
          className="rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm"
          style={{ borderColor: `${AMBER}55` }}
          data-testid="efa-heat-exhaustion"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${AMBER}14`, border: `1px solid ${AMBER}33` }}
            >
              <ThermometerSun className="w-5 h-5" style={{ color: AMBER }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
                {t("Heat Exhaustion", "អស់កម្លាំងដោយកម្តៅ")}
              </h4>
              <div
                className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                  k ? "font-khmer normal-case tracking-normal" : ""
                }`}
                style={{ color: AMBER }}
              >
                {t("the body is fighting", "រាងកាយកំពុងតស៊ូ")}
              </div>
            </div>
          </div>
          <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The skin is wet with heavy sweat. The patient feels weak, dizzy, nauseous, and has a headache. The pulse is fast but the body is still cooling itself down. This is a serious warning — but it is the body still doing its job.",
              "ស្បែកសើមដោយឈឹងច្រើន។ អ្នកជំងឺមានអារម្មណ៍អស់កម្លាំង វិលមុខ ចង់ក្អួត ហើយឈឺក្បាល។ ជីពចរលោតលឿន ប៉ុន្តែរាងកាយនៅតែបន្តបន្ថយកម្តៅខ្លួនឯង។ នេះជាការព្រមានធ្ងន់ធ្ងរ — ប៉ុន្តែវានៅជាសញ្ញាដែលរាងកាយនៅតែបំពេញមុខងាររបស់វា។",
            )}
          </p>
        </div>

        {/* Heat Stroke */}
        <div
          className="rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm"
          style={{
            borderColor: `${ROSE}55`,
            boxShadow: `0 0 0 1px ${ROSE}22 inset, 0 12px 30px -16px ${ROSE}66`,
          }}
          data-testid="efa-heat-stroke"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${ROSE}14`, border: `1px solid ${ROSE}33` }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: ROSE }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: ROSE_DEEP }}>
                {t("Heat Stroke — Deadly", "ជំងឺខ្យល់គរដោយកម្តៅ — សម្លាប់")}
              </h4>
              <div
                className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                  k ? "font-khmer normal-case tracking-normal" : ""
                }`}
                style={{ color: ROSE }}
              >
                {t("the engine has overheated", "ម៉ាស៊ីនបានគរហួសកម្តៅ")}
              </div>
            </div>
          </div>
          <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The patient becomes confused, slurs their words, faints, or has a seizure. Their skin is hot — it may be dry (the cooling has shut down completely) or, in heavy work or sport, still wet with sweat. The deciding sign is not the skin: it is the change in mental state combined with a very hot body. This means the body's cooling system is failing — like an engine that has overheated. Without rapid help, the brain and organs begin to die within minutes.",
              "អ្នកជំងឺច្រឡំ និយាយបបុល ដួលសន្លប់ ឬឈឺឆ្កួត។ ស្បែករបស់គាត់ក្តៅ — វាអាចស្ងួត (ប្រព័ន្ធធ្វើឲ្យត្រជាក់បានបិទទាំងស្រុង) ឬនៅក្នុងការងារធ្ងន់ ឬកីឡា វាអាចនៅសើមដោយឈឹង។ សញ្ញាសម្រេច មិនមែនជាស្បែកទេ ៖ វាគឺជាការផ្លាស់ប្តូរស្ថានភាពផ្លូវចិត្ត រួមផ្សំជាមួយរាងកាយក្តៅខ្លាំង។ នេះមានន័យថា ប្រព័ន្ធធ្វើឲ្យត្រជាក់របស់រាងកាយកំពុងបរាជ័យ — ដូចជាម៉ាស៊ីនដែលគរហួសកម្តៅ។ បើគ្មានជំនួយរហ័ស ខួរក្បាល និងសរីរាង្គចាប់ផ្តើមស្លាប់ក្នុងរយៈពេលប៉ុន្មាននាទី។",
            )}
          </p>
        </div>
      </div>

      {/* The Fix — Heat Stroke action list */}
      <div
        className="mt-5 rounded-3xl border-2 p-5 sm:p-6 bg-white shadow-sm"
        style={{ borderColor: `${MED_BLUE}55` }}
        data-testid="efa-heat-fix"
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${MED_BLUE}14`, border: `1px solid ${MED_BLUE}33` }}
          >
            <Droplets className="w-5 h-5" style={{ color: MED_BLUE }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("The Fix — Cool the body fast", "ការដោះស្រាយ — បន្ថយកម្តៅខ្លួនឲ្យលឿន")}
            </h4>
            <div
              className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                k ? "font-khmer normal-case tracking-normal" : ""
              }`}
              style={{ color: MED_BLUE }}
            >
              {t("force water on the skin to evaporate", "បង្ខំឲ្យទឹកលើស្បែកហួត")}
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          <ActionLine
            k={k}
            Icon={AlertTriangle}
            accent={ROSE}
            en="Send for help and arrange transport to a hospital immediately — heat stroke is a true medical emergency. Begin cooling at the same time, do not wait."
            kh="ហៅជំនួយ និងរៀបចំការដឹកជញ្ជូនទៅមន្ទីរពេទ្យភ្លាមៗ — ជំងឺខ្យល់គរដោយកម្តៅ គឺជាគ្រោះអាសន្នវេជ្ជសាស្ត្រពិតប្រាកដ។ ចាប់ផ្តើមធ្វើឲ្យត្រជាក់ក្នុងពេលតែមួយ កុំរង់ចាំ។"
          />
          <ActionLine
            k={k}
            Icon={Wind}
            accent={MED_BLUE}
            en="Move the patient out of the sun and into shade or the coolest indoor space available."
            kh="ផ្លាស់ទីអ្នកជំងឺចេញពីពន្លឺថ្ងៃ ទៅកន្លែងម្លប់ ឬកន្លែងក្នុងផ្ទះដែលត្រជាក់ជាងគេ។"
          />
          <ActionLine
            k={k}
            Icon={Wind}
            accent={MED_BLUE}
            en="Remove heavy or extra clothing so the skin can release heat."
            kh="ដោះសម្លៀកបំពាក់ធ្ងន់ ឬបន្ថែម ដើម្បីឲ្យស្បែកអាចបញ្ចេញកម្តៅ។"
          />
          <ActionLine
            k={k}
            Icon={Droplets}
            accent={MED_BLUE}
            en="Pour cool (not ice-cold) water over the entire body, especially the head, neck, armpits, and groin."
            kh="ស្រោចទឹកត្រជាក់ (មិនត្រជាក់ដូចទឹកកក) លើរាងកាយទាំងមូល ជាពិសេសក្បាល ក ក្លៀក និងផ្នែកខាងក្រោម។"
          />
          <ActionLine
            k={k}
            Icon={Wind}
            accent={MED_BLUE}
            en="Fan the patient aggressively. The combination of water on the skin and moving air forces fast evaporation, which pulls heat out of the body and brings the core temperature down."
            kh="ផ្លុំខ្យល់ឲ្យអ្នកជំងឺយ៉ាងខ្លាំង។ ការរួមផ្សំរវាងទឹកលើស្បែក និងខ្យល់ដែលផ្លាស់ទី បង្ខំឲ្យការហួតឧស្ម័នកើតឡើងលឿន ដែលទាញកម្តៅចេញពីរាងកាយ និងបន្ថយកម្តៅខាងក្នុងខ្លួន។"
          />
        </ul>
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* SUB 5.4 — Water Rescue & CPR Basics                            */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <SubHeader
        k={k}
        spec="5.4"
        Icon={HeartPulse}
        en="Water Rescue & CPR Basics"
        kh="ការសង្គ្រោះពីទឹក និងគោលការណ៍ CPR (ការសង្គ្រោះបេះដូង-សួត)"
        enLead="If the heart has stopped, your hands become the heart until help arrives."
        khLead="បើបេះដូងបានឈប់ ដៃរបស់អ្នកក្លាយជាបេះដូង រហូតដល់ជំនួយមកដល់។"
        accent={MED_BLUE}
      />

      <div
        className="rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm"
        style={{
          borderColor: `${MED_BLUE}55`,
          boxShadow: `0 0 0 1px ${MED_BLUE}22 inset, 0 12px 30px -16px ${MED_BLUE}66`,
        }}
        data-testid="efa-cpr-card"
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${MED_BLUE}14`, border: `1px solid ${MED_BLUE}33` }}
          >
            <HeartPulse className="w-5 h-5" style={{ color: MED_BLUE }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
              {t("Pulled from the water — and not breathing", "ទាញចេញពីទឹក — ហើយមិនដកដង្ហើម")}
            </div>
            <div
              className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${
                k ? "font-khmer normal-case tracking-normal" : ""
              }`}
              style={{ color: MED_BLUE }}
            >
              {t("airway · circulation · pump the heart for them", "ផ្លូវដង្ហើម · ចរន្តឈាម · បូមបេះដូងជំនួសគេ")}
            </div>
          </div>
        </div>

        <p
          className={`text-sm sm:text-[15px] text-slate-700 mb-4 ${
            k ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "Drowning is the most common rural emergency where ordinary bystanders save lives every year. If a person is pulled from a pond, river, or flooded rice paddy and is not breathing or moving, their heart has likely stopped — and because drowning starves the body of oxygen, every second without circulation costs brain cells. The very first action is always the same: shout for help and send someone to call for transport to a hospital, then immediately begin chest compressions. Your hands take over the job of the heart until the patient breathes on their own or trained help arrives.",
            "ការលង់ទឹក គឺជាគ្រោះអាសន្នជនបទដែលជួបញឹកញាប់បំផុត ដែលអ្នកជិតខាងធម្មតាសង្គ្រោះជីវិតបានរាល់ឆ្នាំ។ ប្រសិនបើមនុស្សម្នាក់ត្រូវបានទាញចេញពីត្រពាំង ទន្លេ ឬស្រែលិចទឹក ហើយមិនដកដង្ហើម ឬមិនកម្រើក បេះដូងរបស់គាត់ប្រហែលជាបានឈប់ — ហើយដោយសារការលង់ទឹកធ្វើឲ្យរាងកាយខ្វះអុកស៊ីហ្សែន រាល់វិនាទីដែលគ្មានចរន្តឈាម គឺបាត់បង់កោសិកាខួរក្បាល។ សកម្មភាពដំបូងបំផុត តែងតែដូចគ្នា ៖ ស្រែកហៅជំនួយ និងបញ្ជូននរណាម្នាក់ឲ្យទៅហៅរថយន្តដឹកទៅមន្ទីរពេទ្យ បន្ទាប់មកចាប់ផ្តើមច្របាច់ទ្រូងភ្លាមៗ។ ដៃរបស់អ្នកធ្វើជាបេះដូងជំនួសគេ រហូតដល់អ្នកជំងឺដកដង្ហើមដោយខ្លួនឯង ឬរហូតដល់ជំនួយដែលបានហ្វឹកហ្វឺនមកដល់។",
          )}
        </p>

        {/* Step layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              n: "1",
              icon: Wind,
              en: "Open the airway",
              kh: "បើកផ្លូវដង្ហើម",
              enBody:
                "Tilt the head gently back, lift the chin. Sweep any obvious water, mud, or debris from the mouth so air can pass.",
              khBody:
                "ផ្អៀងក្បាលថ្នមៗទៅខាងក្រោយ លើកចង្កា។ បោសទឹក ភក់ ឬកាកសំណល់ដែលច្បាស់ៗ ចេញពីមាត់ ដើម្បីឲ្យខ្យល់អាចចូលបាន។",
            },
            {
              n: "2",
              icon: HeartPulse,
              en: "Push hard, push fast",
              kh: "ច្របាច់ឲ្យខ្លាំង ច្របាច់ឲ្យលឿន",
              enBody:
                "Place both hands stacked in the center of the chest, between the nipples. Press straight down about 5 cm deep, around 100–120 times per minute — about the speed of a fast song.",
              khBody:
                "ដាក់ដៃទាំងពីរត្រួតគ្នានៅកណ្តាលទ្រូង រវាងក្បាលដោះ។ ច្របាច់ត្រង់ចុះក្រោមជម្រៅប្រហែល ៥ សង់ទីម៉ែត្រ ប្រហែល ១០០–១២០ ដងក្នុងមួយនាទី — ប្រហែលនឹងល្បឿននៃចម្រៀងលឿន។",
            },
            {
              n: "3",
              icon: Wind,
              en: "If trained: add rescue breaths",
              kh: "បើបានហ្វឹកហ្វឺន ៖ បន្ថែមដង្ហើមសង្គ្រោះ",
              enBody:
                "Drowning is mostly an oxygen problem, so breaths matter. If — and only if — you have been trained, alternate 30 chest compressions with 2 rescue breaths. If you have not been trained, do not stop compressions to attempt breaths; non-stop compressions alone still save lives.",
              khBody:
                "ការលង់ទឹក ភាគច្រើនជាបញ្ហាខ្វះអុកស៊ីហ្សែន ដូច្នេះដង្ហើមសំខាន់។ ប្រសិនបើ — ហើយតែប្រសិនបើ — អ្នកបានហ្វឹកហ្វឺន ផ្លាស់ប្តូររវាងការច្របាច់ទ្រូង ៣០ ដង និងដង្ហើមសង្គ្រោះ ២ ដង។ បើអ្នកមិនបានហ្វឹកហ្វឺន កុំឈប់ច្របាច់ដើម្បីព្យាយាមផ្តល់ដង្ហើម ៖ ការច្របាច់ទ្រូងមិនឈប់តែឯង នៅតែសង្គ្រោះជីវិតបាន។",
            },
            {
              n: "4",
              icon: Activity,
              en: "Do not stop",
              kh: "កុំឈប់",
              enBody:
                "Continue chest compressions without long breaks until the patient breathes on their own, until trained help (or an AED, if one is available) takes over, or until you are physically unable to continue. Every pause lets the brain begin to die.",
              khBody:
                "បន្តច្របាច់ទ្រូងដោយមិនមានការផ្អាកយូរ រហូតដល់អ្នកជំងឺដកដង្ហើមដោយខ្លួនឯង រហូតដល់អ្នកដែលបានហ្វឹកហ្វឺន (ឬម៉ាស៊ីន AED ប្រសិនបើមាន) ទទួលបន្ត ឬរហូតដល់អ្នកលែងអាចបន្តបាន។ រាល់ការផ្អាកមួយ ធ្វើឲ្យខួរក្បាលចាប់ផ្តើមស្លាប់។",
            },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="rounded-2xl p-4 border bg-white"
                style={{ borderColor: `${MED_BLUE}33` }}
                data-testid={`efa-cpr-step-${step.n}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono font-bold rounded-full px-2 py-0.5 text-white"
                    style={{ backgroundColor: MED_BLUE }}
                  >
                    {step.n}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: MED_BLUE }} aria-hidden="true" />
                </div>
                <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
                  {k ? step.kh : step.en}
                </div>
                <div
                  className={`text-xs text-slate-700 ${
                    k ? "font-khmer leading-loose" : "leading-relaxed"
                  }`}
                >
                  {k ? step.khBody : step.enBody}
                </div>
              </div>
            );
          })}
        </div>

        {/* Heartbeat-line decoration */}
        <div className="mt-5 rounded-xl bg-gradient-to-br from-sky-50 to-white border border-sky-200 px-3 py-2">
          <svg viewBox="0 0 320 36" className="w-full h-7" aria-hidden="true">
            <path
              d="M0 18 L60 18 L72 18 L80 8 L88 28 L96 4 L104 32 L112 18 L130 18 L142 18 L150 10 L158 26 L166 18 L320 18"
              fill="none"
              stroke={MED_BLUE}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className={`mt-1 text-[11px] text-center font-mono text-slate-500 ${
              k ? "font-khmer normal-case" : ""
            }`}
          >
            {t(
              "Your hands are the heartbeat until the heart restarts.",
              "ដៃរបស់អ្នកគឺជាចង្វាក់បេះដូង រហូតដល់បេះដូងចាប់ផ្តើមលោតវិញ។",
            )}
          </p>
        </div>

        {/* Important note callout */}
        <div
          className="mt-4 rounded-2xl p-3 border-l-4 border"
          style={{
            backgroundColor: `${ROSE}10`,
            borderLeftColor: ROSE,
            borderColor: `${ROSE}33`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Stethoscope className="w-4 h-4" style={{ color: ROSE }} aria-hidden="true" />
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${
                k ? "font-khmer normal-case tracking-normal" : ""
              }`}
              style={{ color: ROSE }}
            >
              {t("Important", "សំខាន់")}
            </span>
          </div>
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "These steps are a non-medical bystander overview to keep someone alive until trained help arrives. They do not replace a real CPR course, and reading them does not make a person a first responder. Whenever possible, every adult in the village should learn proper CPR — including rescue breaths and use of an AED if one is available — from a trained health worker.",
              "ជំហានទាំងនេះ គឺជាទិដ្ឋភាពទូទៅសម្រាប់អ្នកជិតខាងដែលមិនមែនជាវេជ្ជបណ្ឌិត ដើម្បីរក្សាមនុស្សម្នាក់ឲ្យនៅរស់ រហូតដល់ជំនួយដែលបានហ្វឹកហ្វឺនមកដល់។ វាមិនជំនួសវគ្គបណ្តុះបណ្តាល CPR ពិតប្រាកដឡើយ ហើយការអានវាមិនធ្វើឲ្យមនុស្សម្នាក់ក្លាយជាអ្នកសង្គ្រោះវិជ្ជាជីវៈឡើយ។ បើអាច មនុស្សពេញវ័យគ្រប់រូបក្នុងភូមិ គួរតែរៀន CPR ឲ្យបានត្រឹមត្រូវ — រួមទាំងដង្ហើមសង្គ្រោះ និងការប្រើម៉ាស៊ីន AED បើមាន — ពីបុគ្គលិកសុខាភិបាលដែលបានហ្វឹកហ្វឺន។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
