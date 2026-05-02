import { Link } from "wouter";
import {
  ArrowLeft,
  Stethoscope,
  Syringe,
  HeartPulse,
  GraduationCap,
  School,
  ScrollText,
  AlertTriangle,
  ShieldAlert,
  Microscope,
  TreePine,
  CheckCircle2,
  FlaskConical,
  Calculator,
  Languages,
  Leaf,
  Bird,
  Dog,
  Cat,
  Beef,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-VET · Veterinary Medicine: Healing the Animal Kingdom
//             ពេទ្យសត្វ៖ ការព្យាបាលសត្វ
//
//  1. What is a Veterinarian?       (intro + zoonotic callout + rural hero)
//  2. The Path to Practice          (visual stepping-stone timeline)
//  3. The Patients & Common Cases   (grid of animal cards w/ zoonotic flags)
//
//  Aesthetic: Clinical — soft white, hygienic sky-blue, mint emerald.
//             Zoonotic warnings use rose / red accents.
// ════════════════════════════════════════════════════════════════════════════

export default function VeterinaryMedicinePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" data-testid="vet-page">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-emerald-50 border-b-2 border-sky-200">
        <ClinicalGridBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-700 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white border border-sky-300 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-sky-700 shadow-sm">
            <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
            SCI-VET · VETERINARY MEDICINE
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl text-slate-900 ${isKh ? "font-khmer leading-snug" : ""}`}
          >
            {isKh ? (
              <>
                ពេទ្យសត្វ —{" "}
                <span className="text-sky-700">ការព្យាបាលសត្វ</span>
              </>
            ) : (
              <>
                Veterinary Medicine —{" "}
                <span className="text-sky-700">Healing the Animal Kingdom</span>
              </>
            )}
          </h1>
          {/* Bilingual subtitle (always paired) */}
          <div
            className={`mt-2 text-base sm:text-lg font-semibold text-emerald-700 font-khmer leading-snug`}
          >
            {isKh
              ? "Veterinary Medicine — Healing the Animal Kingdom"
              : "ពេទ្យសត្វ — ការព្យាបាលសត្វ"}
          </div>

          <p
            className={`mt-4 max-w-2xl text-slate-600 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh
              ? "ពេទ្យសត្វមិនមែនត្រឹមតែ​អង្អែលសត្វទេ — ពួកគាត់​ធ្វើ​វះកាត់ ចេញវេជ្ជបញ្ជា ជួយ​សម្រាល​កូន ហើយ​ឈប់​ការ​រាល​ដាល​នៃ​ជំងឺ​ដែល​អាច​ឆ្លង​ពី​សត្វ​ទៅ​មនុស្ស។ នៅ​ជនបទ ពួកគាត់​ការពារ​ប្រកប​របរ​របស់​ភូមិ​ទាំងមូល។"
              : "Veterinarians do far more than pet animals — they perform surgery, prescribe medicine, deliver newborns, and stop diseases that can jump from animals to humans. In rural villages, they protect the livelihood of entire farming communities."}
          </p>

          {/* Quick stat strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <StatChip
              valueEn="60%+"
              labelEn="Human diseases that came from animals"
              labelKh="ជំងឺមនុស្សដែលមានប្រភពពីសត្វ"
              isKh={isKh}
            />
            <StatChip
              valueEn="6–7"
              labelEn="Years of study"
              labelKh="ឆ្នាំសិក្សា"
              isKh={isKh}
            />
            <StatChip
              valueEn="100%"
              labelEn="Rabies fatality without vaccine"
              labelKh="ការស្លាប់​ដោយ​ឆ្កែឆ្កួត​បើ​គ្មាន​វ៉ាក់សាំង"
              isKh={isKh}
            />
          </div>
        </div>
      </header>

      {/* ── Section 1: What is a Veterinarian? ────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="The animal doctor"
        eyebrowKh="គ្រូពេទ្យសត្វ"
        titleEn="What is a Veterinarian?"
        titleKh="តើពេទ្យសត្វជាអ្វី?"
        descEn="A veterinarian is a fully trained doctor — but their patients have four legs, feathers, hooves, or fins. They diagnose illness, perform surgery, prescribe medicine, and stand on the front line against diseases that can spill over from animals into people."
        descKh="ពេទ្យសត្វ​គឺ​ជា​គ្រូពេទ្យ​មាន​បំណិន​ពេញលេញ — ប៉ុន្តែ​អ្នកជំងឺ​របស់​គាត់​មាន​ជើង​បួន ស្លាប ក្រចក​ឬ​ព្រុយ។ ពួកគាត់​វិនិច្ឆ័យ​ជំងឺ ធ្វើ​វះកាត់ ចេញ​វេជ្ជបញ្ជា ហើយ​ឈរ​នៅ​ជួរ​មុខ​ប្រឆាំង​នឹង​ជំងឺ​ដែល​អាច​លាត​សន្ធឹង​ពី​សត្វ​មក​មនុស្ស។"
        isKh={isKh}
        testId="vet-section-what-is"
      >
        <DutiesGrid isKh={isKh} />
        <ZoonoticCallout isKh={isKh} />
        <RuralHeroCallout isKh={isKh} />
      </Section>

      {/* ── Section 2: The Path to Practice ───────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The educational journey"
        eyebrowKh="ដំណើរសិក្សា"
        titleEn="The Path to Practice"
        titleKh="ផ្លូវឆ្ពោះទៅកាន់ការសិក្សា"
        descEn="From a Grade-12 classroom to a clinic of your own, this is the typical road a Cambodian student walks to become a veterinarian. Programs vary by university and country, but they are all built on the same four pillars: biology, chemistry, math, and the English needed to read every modern medical textbook."
        descKh="ពី​ថ្នាក់​ទី​១២ ដល់​គ្លីនិក​ផ្ទាល់​ខ្លួន នេះ​គឺ​ជា​ផ្លូវ​ធម្មតា​ដែល​សិស្ស​កម្ពុជា​ដើរ ដើម្បី​ក្លាយ​ជា​ពេទ្យសត្វ។ កម្មវិធី​ខុស​គ្នា​តាម​សាកលវិទ្យាល័យ និង​ប្រទេស ប៉ុន្តែ​ទាំង​អស់​ត្រូវ​បាន​សង់​លើ​សសរ​ស្តម្ភ​ដូច​គ្នា​ទាំង​បួន៖ ជីវវិទ្យា គីមីវិទ្យា គណិតវិទ្យា និង​ភាសា​អង់គ្លេស​ដែល​ត្រូវ​ការ​ដើម្បី​អាន​សៀវភៅ​វេជ្ជសាស្ត្រ​ទំនើប។"
        isKh={isKh}
        testId="vet-section-path"
      >
        <PathTimeline isKh={isKh} />
      </Section>

      {/* ── Section 3: The Patients & Common Conditions ───────────────── */}
      <Section
        spec="03"
        eyebrowEn="Common cases by species"
        eyebrowKh="ករណីទូទៅតាមប្រភេទសត្វ"
        titleEn="The Patients & Common Conditions"
        titleKh="អ្នកជំងឺ និងស្ថានភាពទូទៅ"
        descEn="A village vet may treat a buffalo before lunch and a kitten before dinner. Each species brings its own catalogue of dangerous illnesses — and a few of them can jump straight to humans. Look for the red Zoonotic tag."
        descKh="ពេទ្យសត្វ​ភូមិ​មួយ​អាច​ព្យាបាល​ក្របី​នៅ​ពេល​ព្រឹក ហើយ​ព្យាបាល​កូន​ឆ្មា​នៅ​ពេល​ល្ងាច។ ប្រភេទ​សត្វ​នីមួយៗ​មាន​បញ្ជី​ជំងឺ​គ្រោះថ្នាក់​ផ្ទាល់ខ្លួន — ហើយ​ខ្លះ​អាច​លោត​ផ្ទាល់​មក​មនុស្ស។ សូម​មើល​ស្លាក​ពណ៌​ក្រហម Zoonotic។"
        isKh={isKh}
        testId="vet-section-patients"
      >
        <PatientGrid isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-700 text-sm ${isKh ? "font-khmer" : ""}`}
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
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-sky-100 text-sky-700 rounded-sm px-2.5 py-0.5 border border-sky-200">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-sky-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      {/* Always-bilingual paired heading: shows BOTH EN and KH */}
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <div className="text-base sm:text-lg font-semibold text-emerald-700 font-khmer leading-snug mb-3">
        {isKh ? titleEn : titleKh}
      </div>
      <p
        className={`text-slate-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
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
  isKh,
}: {
  valueEn: string;
  labelEn: string;
  labelKh: string;
  isKh: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/80 backdrop-blur border border-sky-200 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-sky-700 leading-none">
        {valueEn}
      </div>
      <div
        className={`text-[11px] text-slate-600 mt-1 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}
      >
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

function ClinicalGridBg() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.55] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · What veterinarians do (3 cards) + zoonotic + rural callouts
// ════════════════════════════════════════════════════════════════════════════

function DutiesGrid({ isKh }: { isKh: boolean }) {
  const items: {
    Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    titleEn: string;
    titleKh: string;
    bodyEn: string;
    bodyKh: string;
  }[] = [
    {
      Icon: Syringe,
      titleEn: "Surgery & medicine",
      titleKh: "វះកាត់ និងវេជ្ជបញ្ជា",
      bodyEn:
        "From spaying a kitten to repairing a buffalo's broken leg, vets perform surgery and prescribe the same classes of antibiotics, painkillers, and anaesthesia used in human hospitals.",
      bodyKh:
        "ចាប់​ពី​ការ​វះកាត់​ស្ករ​កូន​ឆ្មា ដល់​ការ​ជួសជុល​ជើង​បាក់​របស់​ក្របី ពេទ្យសត្វ​ធ្វើ​វះកាត់ ហើយ​ចេញ​ថ្នាំ​អង់ទីប៊ីយ៉ូទិក ថ្នាំ​បំបាត់​ឈឺ និង​ថ្នាំ​សន្លប់ ដូច​គ្នា​នឹង​មន្ទីរពេទ្យ​មនុស្ស​ដែរ។",
    },
    {
      Icon: HeartPulse,
      titleEn: "Birth & newborn care",
      titleKh: "ការសម្រាល និងថែទាំកូនសត្វ",
      bodyEn:
        "When a sow gets stuck giving birth at midnight, the vet drives out to the farm. Saving a single litter of piglets can mean a whole month of family income.",
      bodyKh:
        "នៅ​ពេល​មេ​ជ្រូក​មាន​បញ្ហា​សម្រាល​នៅ​អាធ្រាត្រ ពេទ្យសត្វ​បើក​ឡាន​ទៅ​ដល់​កសិដ្ឋាន។ ការ​ជួយ​សង្គ្រោះ​សត្វ​ជ្រូក​មួយ​កូន អាច​ស្មើ​នឹង​ប្រាក់​ចំណូល​មួយ​ខែ​នៃ​គ្រួសារ​មួយ។",
    },
    {
      Icon: ShieldAlert,
      titleEn: "Stop disease outbreaks",
      titleKh: "បញ្ឈប់ការផ្ទុះជំងឺ",
      bodyEn:
        "Vets quarantine sick animals, run lab tests, and vaccinate whole herds before an outbreak can spread to the next village — or jump to humans.",
      bodyKh:
        "ពេទ្យសត្វ​ដាក់​សត្វ​ឈឺ​នៅ​ដាច់​ដោយ​ឡែក ធ្វើ​តេស្ត​មន្ទីរពិសោធន៍ ហើយ​ចាក់​វ៉ាក់សាំង​ឱ្យ​ហ្វូង​សត្វ​ទាំង​មូល មុន​ពេល​ការ​រាល​ដាល​ឈាន​ទៅ​ភូមិ​បន្ទាប់ — ឬ​លោត​ចូល​មនុស្ស។",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(({ Icon, titleEn, titleKh, bodyEn, bodyKh }, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-sky-200 p-5 shadow-sm flex flex-col"
        >
          <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3">
            <Icon className="w-5 h-5" aria-hidden={true} />
          </div>
          <h3
            className={`font-display font-bold text-base text-slate-900 mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}
          >
            {isKh ? titleKh : titleEn}
          </h3>
          <p
            className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh ? bodyKh : bodyEn}
          </p>
        </div>
      ))}
    </div>
  );
}

function ZoonoticCallout({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-rose-50 border-l-4 border-rose-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white font-mono text-[10px] tracking-widest uppercase rounded-sm px-2 py-0.5">
              ZOONOTIC
            </span>
            <span
              className={`font-display font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "ជំងឺ​ដែល​ឆ្លង​ពី​សត្វ​ទៅ​មនុស្ស" : "Diseases that jump from animals to people"}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            A <strong className="text-rose-700">zoonotic disease</strong> is one
            that can pass from an animal to a human — like{" "}
            <strong>Rabies</strong> from a dog bite or <strong>Bird Flu</strong>{" "}
            from a sick chicken. Stopping outbreaks at the animal level is the
            cheapest way to protect a whole community.
          </p>
          <p className="text-sm text-slate-700 mt-1.5 font-khmer leading-loose">
            <strong className="text-rose-700">ជំងឺ​ហ្សូណូទិក</strong>{" "}
            (Zoonotic) គឺ​ជា​ជំងឺ​ដែល​អាច​ឆ្លង​ពី​សត្វ​ទៅ​មនុស្ស — ដូច​ជា{" "}
            <strong>ឆ្កែឆ្កួត</strong> ពី​ការ​ខាំ​របស់​ឆ្កែ ឬ{" "}
            <strong>ផ្តាសាយ​បក្សី</strong> ពី​មាន់​ឈឺ។
            ការ​ឈប់​ការ​រាល​ដាល​នៅ​កម្រិត​សត្វ​គឺ​ជា​មធ្យោបាយ​ថោក​បំផុត​ដើម្បី​ការពារ​សហគមន៍​ទាំង​មូល។
          </p>
        </div>
      </div>
    </div>
  );
}

function RuralHeroCallout({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <TreePine
          className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <div
            className={`font-display font-bold text-slate-900 mb-1 ${isKh ? "font-khmer" : ""}`}
          >
            {isKh ? "វីរបុរសនៃភូមិ" : "The hero of the village"}
          </div>
          <p
            className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            In a Cambodian village, a single buffalo can plough a hectare of
            rice or pull a cart of harvest to market. When that buffalo gets
            sick, an entire family's income is at risk. The vet who saves it
            does not just save an animal — they protect the livelihood of
            everyone who depends on it.
          </p>
          <p className="text-sm text-slate-700 mt-1.5 font-khmer leading-loose">
            នៅ​ភូមិ​មួយ​នៅ​កម្ពុជា ក្របី​មួយ​ក្បាល​អាច​ភ្ជួរ​ស្រែ​មួយ​ហិកតា ឬ​ទាញ​រទេះ​ស្រូវ​ទៅ​ផ្សារ។
            ពេល​ក្របី​នោះ​ឈឺ ប្រាក់​ចំណូល​គ្រួសារ​ទាំង​មូល​ស្ថិត​ក្នុង​គ្រោះថ្នាក់។
            ពេទ្យសត្វ​ដែល​ជួយ​សង្គ្រោះ​វា​មិន​មែន​គ្រាន់​តែ​ជួយ​សង្គ្រោះ​សត្វ​មួយ​ទេ
            — ពួកគាត់​ការពារ​ប្រកប​របរ​របស់​អ្នក​ទាំង​អស់​ដែល​ពឹងផ្អែក​លើ​វា។
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Path to Practice — vertical stepping-stone timeline
// ════════════════════════════════════════════════════════════════════════════

function PathTimeline({ isKh }: { isKh: boolean }) {
  return (
    <ol className="relative border-l-2 border-sky-200 ml-3 sm:ml-4 space-y-7">
      {/* Step 1 — High School */}
      <TimelineStep
        index={1}
        Icon={School}
        labelEn="STAGE 01 · HIGH SCHOOL"
        labelKh="ដំណាក់​កាល ០១ · វិទ្យាល័យ"
        titleEn="Build the foundation in Grade 10–12"
        titleKh="សង់​មូលដ្ឋាន​នៅ​ថ្នាក់​ទី ១០–១២"
        bodyEn="Vet school is competitive — your high-school grades matter. Lean hard into the four subjects below. They are not optional; they are the language of every page in a veterinary textbook."
        bodyKh="ការ​ចូល​សិក្សា​ពេទ្យសត្វ​មាន​ការ​ប្រកួត​ប្រជែង​ខ្ពស់ — ពិន្ទុ​វិទ្យាល័យ​របស់​អ្នក​សំខាន់​ខ្លាំង​ណាស់។ ផ្តោត​លើ​មុខ​វិជ្ជា​ទាំង​បួន​ខាង​ក្រោម។ ពួក​វា​មិន​មែន​ជា​ជម្រើស​ទេ — ពួក​វា​ជា​ភាសា​នៃ​ទំព័រ​ទាំង​អស់​ក្នុង​សៀវភៅ​ពេទ្យសត្វ។"
        isKh={isKh}
      >
        <div className="grid grid-cols-2 gap-2 mt-3">
          <SubjectChip
            Icon={Leaf}
            tone="emerald"
            nameEn="Biology"
            nameKh="ជីវវិទ្យា"
            whyEn="To understand living systems"
            whyKh="ដើម្បី​យល់​ពី​ប្រព័ន្ធ​មាន​ជីវិត"
            isKh={isKh}
          />
          <SubjectChip
            Icon={FlaskConical}
            tone="sky"
            nameEn="Chemistry"
            nameKh="គីមីវិទ្យា"
            whyEn="To understand medicine"
            whyKh="ដើម្បី​យល់​ពី​ឱសថ"
            isKh={isKh}
          />
          <SubjectChip
            Icon={Calculator}
            tone="violet"
            nameEn="Mathematics"
            nameKh="គណិតវិទ្យា"
            whyEn="To calculate proper dosages"
            whyKh="ដើម្បី​គណនា​កម្រិត​ថ្នាំ​ត្រឹម​ត្រូវ"
            isKh={isKh}
          />
          <SubjectChip
            Icon={Languages}
            tone="amber"
            nameEn="English"
            nameKh="ភាសាអង់គ្លេស"
            whyEn="To read modern medical textbooks"
            whyKh="ដើម្បី​អាន​សៀវភៅ​វេជ្ជសាស្ត្រ​ទំនើប"
            isKh={isKh}
          />
        </div>
      </TimelineStep>

      {/* Step 2 — Bachelor's Degree */}
      <TimelineStep
        index={2}
        Icon={GraduationCap}
        labelEn="STAGE 02 · UNIVERSITY"
        labelKh="ដំណាក់​កាល ០២ · សាកលវិទ្យាល័យ"
        titleEn="Earn a Bachelor's Degree (~ 4 years)"
        titleKh="ទទួល​បាន​សញ្ញាបត្រ​បរិញ្ញាបត្រ (~ ៤ ឆ្នាំ)"
        bodyEn="Most students start with a Bachelor's in Animal Science or Biology. You will dissect, run experiments, study microbiology, and meet your first real animal patients during clinical rotations on the campus farm."
        bodyKh="សិស្ស​ភាគ​ច្រើន​ចាប់​ផ្តើម​ដោយ​បរិញ្ញាបត្រ​វិទ្យាសាស្ត្រ​សត្វ ឬ​ជីវវិទ្យា។ អ្នក​នឹង​វះកាត់ ធ្វើ​ការ​ពិសោធន៍ សិក្សា​មីក្រូជីវវិទ្យា ហើយ​ជួប​អ្នក​ជំងឺ​សត្វ​ពិត​ប្រាកដ​ដំបូង​ក្នុង​ការ​អនុវត្ត​គ្លីនិក​នៅ​លើ​កសិដ្ឋាន​សាលា។"
        isKh={isKh}
      >
        <div className="mt-3 flex items-center gap-2 text-xs text-sky-700 bg-sky-50 rounded-lg border border-sky-200 px-3 py-2">
          <Microscope className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className={isKh ? "font-khmer leading-snug" : ""}>
            {isKh
              ? "មុខវិជ្ជាសំខាន់៖ កាយវិភាគ​សត្វ មីក្រូជីវវិទ្យា អាហារូបត្ថម្ភ ហ្សែនវិទ្យា ហើយ​ការ​ចិញ្ចឹម​សត្វ។"
              : "Core subjects: animal anatomy, microbiology, nutrition, genetics, and animal husbandry."}
          </span>
        </div>
      </TimelineStep>

      {/* Step 3 — Specialized Vet Med Degree */}
      <TimelineStep
        index={3}
        Icon={ScrollText}
        labelEn="STAGE 03 · SPECIALIZATION"
        labelKh="ដំណាក់​កាល ០៣ · ឯកទេស"
        titleEn="Doctor of Veterinary Medicine (~ 2–3 more years)"
        titleKh="សញ្ញាបត្រ​ឯកទេស​ពេទ្យសត្វ (~ ២–៣ ឆ្នាំ​បន្ថែម)"
        bodyEn="After your Bachelor's, you enter a specialized veterinary medicine program: surgery, pharmacology, infectious-disease control, large-animal practice, and supervised hospital rotations. At the end, you earn the right to write 'DVM' or 'Dr.' in front of your name and to legally treat animals."
        bodyKh="បន្ទាប់​ពី​បរិញ្ញាបត្រ អ្នក​ចូល​កម្មវិធី​ពេទ្យសត្វ​ឯកទេស៖ វះកាត់ ឱសថ​សាស្ត្រ ការ​គ្រប់គ្រង​ជំងឺ​ឆ្លង ការ​អនុវត្ត​លើ​សត្វ​ធំ និង​ការ​អនុវត្ត​មន្ទីរពេទ្យ​ក្រោម​ការ​ត្រួត​ពិនិត្យ។ នៅ​ចុង​បញ្ចប់ អ្នក​ទទួល​បាន​សិទ្ធិ​ដាក់​ពាក្យ 'DVM' ឬ 'Dr.' នៅ​មុខ​ឈ្មោះ​អ្នក ហើយ​ព្យាបាល​សត្វ​ស្រប​ច្បាប់។"
        isKh={isKh}
      >
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 px-3 py-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className={isKh ? "font-khmer leading-snug" : ""}>
            {isKh
              ? "លទ្ធផល៖ អ្នក​អាច​បើក​គ្លីនិក​សត្វ​ផ្ទាល់ខ្លួន ឬ​ធ្វើ​ការ​ឱ្យ​ក្រសួង​កសិកម្ម។"
              : "Outcome: you can open your own animal clinic or work for the Ministry of Agriculture."}
          </span>
        </div>
      </TimelineStep>
    </ol>
  );
}

function TimelineStep({
  index,
  Icon,
  labelEn,
  labelKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  isKh,
  children,
}: {
  index: number;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  labelEn: string;
  labelKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  isKh: boolean;
  children?: React.ReactNode;
}) {
  return (
    <li className="ml-6 sm:ml-8 relative">
      <span
        className="absolute -left-[2.05rem] sm:-left-[2.55rem] top-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-sky-300 text-sky-700 flex items-center justify-center shadow-sm"
        aria-hidden="true"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="rounded-2xl bg-white border border-sky-200 shadow-sm p-5">
        <div
          className={`font-mono text-[10px] tracking-widest uppercase text-sky-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
        >
          {isKh ? labelKh : labelEn}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-bold text-2xl text-sky-700 leading-none">
            {String(index).padStart(2, "0")}
          </span>
          <h3
            className={`font-display font-bold text-base sm:text-lg text-slate-900 leading-snug ${isKh ? "font-khmer" : ""}`}
          >
            {isKh ? titleKh : titleEn}
          </h3>
        </div>
        <p
          className={`mt-2 text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {isKh ? bodyKh : bodyEn}
        </p>
        {children}
      </div>
    </li>
  );
}

function SubjectChip({
  Icon,
  tone,
  nameEn,
  nameKh,
  whyEn,
  whyKh,
  isKh,
}: {
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  tone: "emerald" | "sky" | "violet" | "amber";
  nameEn: string;
  nameKh: string;
  whyEn: string;
  whyKh: string;
  isKh: boolean;
}) {
  const palette = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-700", title: "text-emerald-800" },
    sky: { bg: "bg-sky-50", border: "border-sky-200", icon: "text-sky-700", title: "text-sky-800" },
    violet: { bg: "bg-violet-50", border: "border-violet-200", icon: "text-violet-700", title: "text-violet-800" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-700", title: "text-amber-800" },
  }[tone];
  return (
    <div
      className={`rounded-xl ${palette.bg} border ${palette.border} p-3 flex items-start gap-2.5`}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${palette.icon}`} aria-hidden={true} />
      <div className="min-w-0">
        <div
          className={`font-bold text-sm ${palette.title} ${isKh ? "font-khmer" : ""}`}
        >
          {isKh ? nameKh : nameEn}
        </div>
        <div
          className={`text-[11px] text-slate-600 ${isKh ? "font-khmer leading-snug" : "leading-tight"} mt-0.5`}
        >
          {isKh ? whyKh : whyEn}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Patient cards grid (Cattle, Pigs, Poultry, Dogs/Cats)
// ════════════════════════════════════════════════════════════════════════════

type Disease = {
  nameEn: string;
  nameKh: string;
  bodyEn: string;
  bodyKh: string;
  zoonotic?: boolean;
};

function PatientGrid({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PatientCard
        testId="vet-patient-cattle"
        Icon={Beef}
        emoji="🐃"
        labelEn="CATTLE & WATER BUFFALO"
        labelKh="គោ និង ក្របី"
        roleEn="Workhorses of the rice fields"
        roleKh="សត្វ​ធ្វើការ​នៃ​វាល​ស្រែ"
        accent="emerald"
        diseases={[
          {
            nameEn: "Foot-and-Mouth Disease",
            nameKh: "ជំងឺអុតក្តាម",
            bodyEn:
              "A highly contagious virus causing painful blisters on the mouth and hooves. Animals stop eating and walking, and the disease can wipe out a whole herd.",
            bodyKh:
              "មេរោគ​ឆ្លង​លឿន​ខ្លាំង​មួយ​ដែល​បង្ក​ឱ្យ​មាន​ដំបៅ​ឈឺ​នៅ​មាត់ និង​ក្រចក។ សត្វ​ឈប់​ស៊ី​និង​ដើរ ហើយ​ជំងឺ​នេះ​អាច​សម្លាប់​ហ្វូង​ទាំង​មូល។",
          },
          {
            nameEn: "Bloat",
            nameKh: "ហើម​ពោះ",
            bodyEn:
              "A deadly buildup of gas in the stomach, often from eating wet grass. Without quick treatment, the pressure crushes the lungs.",
            bodyKh:
              "ការ​កក​ឧស្ម័ន​ដ៏​គ្រោះថ្នាក់​នៅ​ក្នុង​ក្រពះ ជាញឹក​ញាប់​ដោយ​សារ​ការ​ស៊ី​ស្មៅ​សើម។ បើ​គ្មាន​ការ​ព្យាបាល​លឿន សម្ពាធ​នឹង​សង្កត់​សួត។",
          },
        ]}
        isKh={isKh}
      />

      <PatientCard
        testId="vet-patient-pigs"
        Icon={Beef /* lucide has no Pig icon; emoji is the visual */}
        emoji="🐖"
        labelEn="PIGS"
        labelKh="ជ្រូក"
        roleEn="A backyard pig pays the school fees"
        roleKh="ជ្រូក​មួយ​ក្បាល​ក្នុង​ផ្ទះ​សង​ថ្លៃ​សិក្សា"
        accent="rose"
        diseases={[
          {
            nameEn: "African Swine Fever",
            nameKh: "ជំងឺប៉េស្តជ្រូកអាហ្វ្រិក",
            bodyEn:
              "A severe, often-fatal viral disease causing high fever and internal bleeding. Vaccines are still very limited and not widely available, so the everyday defense is strict farm hygiene and quick quarantine of any sick animal.",
            bodyKh:
              "ជំងឺ​មេរោគ​ធ្ងន់ធ្ងរ​មួយ​ដែល​ច្រើន​តែ​សម្លាប់​សត្វ បង្ក​ឱ្យ​មាន​គ្រុន​ខ្លាំង និង​ការ​ហូរ​ឈាម​ខាង​ក្នុង។ វ៉ាក់សាំង​នៅ​មាន​កម្រិត​ខ្លាំង ហើយ​មិន​ទាន់​ប្រើ​ទូលំទូលាយ​នៅ​ឡើយ ដូច្នេះ​ការ​ការពារ​ប្រចាំ​ថ្ងៃ​គឺ​អនាម័យ​កសិដ្ឋាន​តឹង​រឹង និង​ការ​ដាក់​សត្វ​ឈឺ​នៅ​ដាច់​ដោយ​ឡែក​ភ្លាមៗ។",
          },
        ]}
        isKh={isKh}
      />

      <PatientCard
        testId="vet-patient-poultry"
        Icon={Bird}
        emoji="🐓"
        labelEn="POULTRY · CHICKENS"
        labelKh="មាន់"
        roleEn="The everyday source of protein"
        roleKh="ប្រភព​ប្រូតេអ៊ីន​ប្រចាំ​ថ្ងៃ"
        accent="amber"
        diseases={[
          {
            nameEn: "Avian Influenza · Bird Flu",
            nameKh: "ជំងឺផ្តាសាយបក្សី",
            bodyEn:
              "A deadly respiratory virus that can occasionally jump to humans handling sick birds. Quick reporting saves lives — both bird and human.",
            bodyKh:
              "មេរោគ​ផ្លូវ​ដង្ហើម​ដ៏​មាន​គ្រោះថ្នាក់​មួយ​ដែល​ពេល​ខ្លះ​អាច​លោត​ទៅ​មនុស្ស​ដែល​ប៉ះពាល់​បក្សី​ឈឺ។ ការ​រាយ​ការណ៍​លឿន​ជួយ​សង្គ្រោះ​ជីវិត — ទាំង​បក្សី និង​មនុស្ស។",
            zoonotic: true,
          },
          {
            nameEn: "Newcastle Disease",
            nameKh: "ជំងឺ Newcastle",
            bodyEn:
              "A contagious viral infection causing breathing trouble and twisted necks. Vaccinating the flock is cheap and stops the disease before it starts.",
            bodyKh:
              "ការ​ឆ្លង​មេរោគ​ឆ្លង​មួយ​ដែល​បង្ក​ឱ្យ​មាន​បញ្ហា​ដង្ហើម និង​ការ​បត់​ក។ ការ​ចាក់​វ៉ាក់សាំង​ឱ្យ​ហ្វូង​មាន​ថ្លៃ​ថោក ហើយ​ឈប់​ជំងឺ​មុន​នឹង​ចាប់​ផ្តើម។",
          },
        ]}
        isKh={isKh}
      />

      <PatientCard
        testId="vet-patient-dogs-cats"
        Icon={Dog}
        emoji="🐕🐈"
        labelEn="DOGS & CATS"
        labelKh="ឆ្កែ និង ឆ្មា"
        roleEn="The family's companion animals"
        roleKh="សត្វ​មិត្ត​ភក្តិ​នៃ​គ្រួសារ"
        accent="sky"
        secondaryIcon={Cat}
        diseases={[
          {
            nameEn: "Rabies",
            nameKh: "ជំងឺឆ្កែឆ្កួត",
            bodyEn:
              "A 100%-fatal virus that attacks the brain. Once symptoms appear, there is no cure — for animals or humans. Vaccination is the only prevention, and it is cheap.",
            bodyKh:
              "មេរោគ​សម្លាប់​១០០% ដែល​វាយ​ប្រហារ​ខួរ​ក្បាល។ នៅ​ពេល​រោគ​សញ្ញា​លេច​ឡើង គ្មាន​ការ​ព្យាបាល​ទេ — ទាំង​សត្វ និង​មនុស្ស។ ការ​ចាក់​វ៉ាក់សាំង​គឺ​ជា​ការ​ការពារ​តែ​មួយ ហើយ​មាន​តម្លៃ​ថោក។",
            zoonotic: true,
          },
          {
            nameEn: "Parasites · ticks, fleas, heartworms",
            nameKh: "ប៉ារ៉ាស៊ីត — ធៀន ចៃ និង​ដង្កូវ​បេះដូង",
            bodyEn:
              "Tiny invaders that drain a pet's energy, spread other diseases, and in the case of heartworms can be fatal. Monthly preventive medicine stops them all.",
            bodyKh:
              "សត្វ​ល្អិត​តូចៗ​ដែល​ស្រូប​ថាមពល​សត្វ ឆ្លង​ជំងឺ​ផ្សេង​ទៀត ហើយ​ក្នុង​ករណី​ដង្កូវ​បេះដូង​អាច​សម្លាប់​បាន។ ឱសថ​ការពារ​ប្រចាំ​ខែ​បញ្ឈប់​ពួក​វា​ទាំង​អស់។",
          },
        ]}
        isKh={isKh}
      />
    </div>
  );
}

function PatientCard({
  testId,
  Icon,
  secondaryIcon: SecondaryIcon,
  emoji,
  labelEn,
  labelKh,
  roleEn,
  roleKh,
  diseases,
  accent,
  isKh,
}: {
  testId: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  secondaryIcon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  emoji: string;
  labelEn: string;
  labelKh: string;
  roleEn: string;
  roleKh: string;
  diseases: Disease[];
  accent: "emerald" | "sky" | "rose" | "amber";
  isKh: boolean;
}) {
  const palette = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: "bg-emerald-600",
      label: "text-emerald-700",
      hero: "bg-gradient-to-br from-emerald-100 to-white",
    },
    sky: {
      bg: "bg-sky-50",
      border: "border-sky-200",
      icon: "bg-sky-600",
      label: "text-sky-700",
      hero: "bg-gradient-to-br from-sky-100 to-white",
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      icon: "bg-rose-600",
      label: "text-rose-700",
      hero: "bg-gradient-to-br from-rose-100 to-white",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "bg-amber-600",
      label: "text-amber-700",
      hero: "bg-gradient-to-br from-amber-100 to-white",
    },
  }[accent];

  return (
    <div
      data-testid={testId}
      className={`rounded-2xl ${palette.bg} border ${palette.border} overflow-hidden flex flex-col shadow-sm`}
    >
      {/* Hero strip with emoji */}
      <div
        className={`${palette.hero} px-5 py-4 flex items-center gap-4 border-b ${palette.border}`}
      >
        <div
          className="text-4xl sm:text-5xl select-none leading-none"
          aria-hidden="true"
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg ${palette.icon} text-white flex items-center justify-center flex-shrink-0`}
            >
              <Icon className="w-4 h-4" aria-hidden={true} />
            </div>
            {SecondaryIcon ? (
              <div
                className={`w-8 h-8 rounded-lg ${palette.icon} text-white flex items-center justify-center flex-shrink-0`}
              >
                <SecondaryIcon className="w-4 h-4" aria-hidden={true} />
              </div>
            ) : null}
            <div
              className={`font-mono text-[10px] tracking-widest ${palette.label} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
            >
              {isKh ? labelKh : labelEn}
            </div>
          </div>
          <h3
            className={`font-display font-bold text-base sm:text-lg text-slate-900 leading-snug mt-1 ${isKh ? "font-khmer" : ""}`}
          >
            {isKh ? roleKh : roleEn}
          </h3>
        </div>
      </div>

      {/* Disease list */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-3">
        {diseases.map((d, i) => (
          <DiseaseRow key={i} disease={d} isKh={isKh} />
        ))}
      </div>
    </div>
  );
}

function DiseaseRow({ disease, isKh }: { disease: Disease; isKh: boolean }) {
  const z = !!disease.zoonotic;
  return (
    <div
      className={`rounded-lg p-3 border ${z ? "bg-white border-rose-300" : "bg-white border-slate-200"}`}
    >
      <div className="flex items-start gap-2 flex-wrap">
        <Stethoscope
          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${z ? "text-rose-600" : "text-slate-500"}`}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-bold text-sm ${z ? "text-rose-700" : "text-slate-900"} ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? disease.nameKh : disease.nameEn}
            </h4>
            {z ? (
              <span
                data-testid="vet-zoonotic-badge"
                className="inline-flex items-center gap-1 bg-rose-600 text-white font-mono text-[9px] tracking-widest uppercase rounded-sm px-1.5 py-0.5"
              >
                <AlertTriangle className="w-2.5 h-2.5" aria-hidden="true" />
                ZOONOTIC
              </span>
            ) : null}
          </div>
          <p
            className={`text-xs sm:text-[13px] text-slate-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh ? disease.bodyKh : disease.bodyEn}
          </p>
        </div>
      </div>
    </div>
  );
}

