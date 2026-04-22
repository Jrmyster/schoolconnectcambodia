import { Link } from "wouter";
import {
  ArrowLeft,
  Stethoscope,
  Wrench,
  GraduationCap,
  Award,
  Sparkles,
  Info,
  HeartPulse,
  CheckCircle2,
  School,
  ScrollText,
  Briefcase,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-DENT · Dentistry & Orthodontics: Engineers of the Smile
//             ទន្តសាស្ត្រ និងទន្តពេទ្យកែចង្កូម៖ វិស្វករនៃស្នាមញញឹម
//
//  1. The Generalist vs The Engineer  (side-by-side)
//  2. Anatomy of a Tooth              (SVG cross-section)
//  3. The Career Pathway in Cambodia  (vertical timeline)
//
//  Aesthetic: Clinical — clean whites, hygienic soft blue, mint green.
// ════════════════════════════════════════════════════════════════════════════

export default function DentistryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-emerald-50 border-b-2 border-sky-200">
        <ClinicalGridBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-700 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white border border-sky-300 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-sky-700 shadow-sm">
            <ToothIcon className="w-3.5 h-3.5" />
            SCI-DENT · DENTAL SCIENCE
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl text-slate-900 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? (
              <>
                ទន្តសាស្ត្រ និងទន្តពេទ្យកែចង្កូម —{" "}
                <span className="text-sky-700">វិស្វករនៃស្នាមញញឹម</span>
              </>
            ) : (
              <>
                Dentistry &amp; Orthodontics —{" "}
                <span className="text-sky-700">Engineers of the Smile</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-slate-600 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ស្នាមញញឹមរបស់អ្នកគឺជាគ្រឿងម៉ាស៊ីនដ៏ស្មុគស្មាញនៃឆ្អឹង សរសៃប្រសាទ និងសម្ភារៈដ៏រឹង។ យើងនឹងស្គាល់មនុស្សដែលថែទាំវា ស្ថាបត្យកម្មនៃធ្មេញមួយ និងផ្លូវឆ្ពោះទៅកាន់អាជីពនេះនៅកម្ពុជា។"
              : "Your smile is a complex machine of bone, nerves, and superhard materials. We'll meet the people who maintain it, the architecture of a single tooth, and the road to this profession in Cambodia."}
          </p>

          {/* Quick stat strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <StatChip valueEn="32" labelEn="Adult teeth" labelKh="ធ្មេញពេញវ័យ" isKh={isKh} />
            <StatChip valueEn="#1" labelEn="Hardest in body" labelKh="រឹងបំផុតក្នុងរូបកាយ" isKh={isKh} />
            <StatChip valueEn="7+3" labelEn="Years to specialize" labelKh="ឆ្នាំសម្រាប់ឯកទេស" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: Generalist vs Engineer ─────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Two professions, one mouth"
        eyebrowKh="វិជ្ជាជីវៈពីរ មាត់មួយ"
        titleEn="The Generalist vs. the Engineer"
        titleKh="អ្នកឯកទេសទូទៅ និងវិស្វករ"
        descEn="Both wear the same white coat. Both know your teeth inside and out. But one keeps your mouth healthy, while the other re-engineers its geometry. Here is how they split the work."
        descKh="ពួកគាត់ទាំងពីរស្លៀកអាវវែងស៊ុតពណ៌សដូចគ្នា។ ពួកគាត់ទាំងពីរស្គាល់ធ្មេញរបស់អ្នកយ៉ាងច្បាស់។ ប៉ុន្តែម្នាក់ថែទាំសុខភាពមាត់របស់អ្នក ខណៈដែលម្នាក់ទៀតធ្វើវិស្វកម្មថ្មីលើធរណីមាត្ររបស់វា។ នេះជារបៀបដែលពួកគាត់ចែករំលែកការងារ។"
        isKh={isKh}
      >
        <ProfessionsCompare isKh={isKh} />
        <RuleOfThumb isKh={isKh} />
      </Section>

      {/* ── Section 2: Anatomy of a Tooth ─────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Inside a single tooth"
        eyebrowKh="នៅខាងក្នុងធ្មេញតែមួយ"
        titleEn="The Anatomy of a Tooth"
        titleKh="កាយវិភាគសាស្ត្រនៃធ្មេញ"
        descEn="A tooth is a three-layer fortress. The outside is the hardest material your body ever makes. The middle layer carries cold and sweet signals. And at the very heart lives the nerve that screams when something goes wrong."
        descKh="ធ្មេញគឺជាបន្ទាយមានបីស្រទាប់។ ខាងក្រៅគឺជាសម្ភារៈដ៏រឹងបំផុតដែលរូបកាយរបស់អ្នកអាចបង្កើតបាន។ ស្រទាប់កណ្តាលបញ្ជូនសញ្ញាត្រជាក់ និងផ្អែម។ ហើយនៅជម្រៅបេះដូងគឺជាសរសៃប្រសាទដែលស្រែកនៅពេលមានអ្វីខុស។"
        isKh={isKh}
      >
        <ToothAnatomy isKh={isKh} />
      </Section>

      {/* ── Section 3: Career Pathway ─────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="The road in Cambodia"
        eyebrowKh="ផ្លូវនៅកម្ពុជា"
        titleEn="The Career Pathway"
        titleKh="ផ្លូវឆ្ពោះទៅកាន់អាជីពជាទន្តពេទ្យ"
        descEn="From a Grade-12 classroom to a specialist clinic, this is the path a Cambodian student walks to become a dentist — and three more years if they want to engineer smiles."
        descKh="ពីថ្នាក់ទី១២ ដល់គ្លីនិកឯកទេស នេះគឺជាផ្លូវដែលសិស្សកម្ពុជាដើរ ដើម្បីក្លាយជាទន្តពេទ្យ — ហើយបី​ឆ្នាំ​បន្ថែម​ទៀត ប្រសិន​បើ​ពួកគេ​ចង់​ធ្វើ​វិស្វកម្ម​ស្នាមញញឹម។"
        isKh={isKh}
      >
        <CareerTimeline isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-700 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-sky-100 text-sky-700 rounded-sm px-2.5 py-0.5 border border-sky-200">
          SEC-{spec}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-sky-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function StatChip({ valueEn, labelEn, labelKh, isKh }: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/80 backdrop-blur border border-sky-200 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-sky-700 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-slate-600 mt-1 ${isKh ? "font-khmer" : ""}`}>{isKh ? labelKh : labelEn}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Generalist vs Engineer cards
// ════════════════════════════════════════════════════════════════════════════

function ProfessionsCompare({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProfessionCard
        Icon={Stethoscope}
        labelEn="THE DENTIST"
        labelKh="ទន្តពេទ្យ"
        roleEn="The family doctor for your mouth"
        roleKh="គ្រូពេទ្យគ្រួសារសម្រាប់មាត់អ្នក"
        bodyEn="A dentist looks after your overall oral health. They are the first person you meet in the clinic, and they handle nine out of every ten things that can go wrong inside your mouth."
        bodyKh="ទន្តពេទ្យមើលថែទាំសុខភាពមាត់ទូទៅរបស់អ្នក។ ពួកគាត់គឺជាមនុស្សដំបូងដែលអ្នកជួបនៅគ្លីនិក ហើយពួកគាត់គ្រប់គ្រងរឿង ៩ ក្នុងចំណោម ១០ ដែលអាចកើតឡើងនៅក្នុងមាត់របស់អ្នក។"
        duties={[
          { en: "Filling cavities", kh: "បំពេញរន្ធធ្មេញ" },
          { en: "Cleaning teeth & polishing", kh: "សម្អាត និងខាត់ធ្មេញ" },
          { en: "Treating gum disease", kh: "ព្យាបាលជំងឺអញ្ចាញធ្មេញ" },
          { en: "Extracting wisdom teeth", kh: "ដកធ្មេញចង្កូម" },
        ]}
        accent="sky"
        isKh={isKh}
      />
      <ProfessionCard
        Icon={Wrench}
        labelEn="THE ORTHODONTIST"
        labelKh="ទន្តពេទ្យកែចង្កូម"
        roleEn="The biomechanical engineer of the jaw"
        roleKh="វិស្វករជីវ-មេកានិកនៃថ្គាម"
        bodyEn="An orthodontist is a dentist who went back to school for extra years to specialize strictly in alignment — the exact angle of every tooth and the geometry of the entire jaw."
        bodyKh="ទន្តពេទ្យកែចង្កូមគឺជាទន្តពេទ្យដែលបានវិលត្រឡប់ទៅសាលារៀនបន្ថែមជាច្រើនឆ្នាំ ដើម្បីឯកទេសយ៉ាងតឹងរ៉ឹងលើការតម្រឹម — មុំពិតប្រាកដនៃធ្មេញនីមួយៗ និងធរណីមាត្រនៃថ្គាមទាំងមូល។"
        duties={[
          { en: "Designing braces", kh: "រចនាខ្សែក្រុងធ្មេញ" },
          { en: "Fitting clear aligners", kh: "តម្លើងស្រោមតម្រឹមធ្មេញថ្លា" },
          { en: "Calibrating elastic forces", kh: "កែតម្រូវកម្លាំងជ័រ" },
          { en: "Re-shaping the bite", kh: "កែតម្រូវការខាំ" },
        ]}
        accent="emerald"
        isKh={isKh}
      />
    </div>
  );
}

function ProfessionCard({
  Icon, labelEn, labelKh, roleEn, roleKh, bodyEn, bodyKh, duties, accent, isKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  roleEn: string; roleKh: string;
  bodyEn: string; bodyKh: string;
  duties: { en: string; kh: string }[];
  accent: "sky" | "emerald";
  isKh: boolean;
}) {
  const a = accent === "sky"
    ? { bg: "bg-sky-50", border: "border-sky-200", chip: "bg-sky-100 text-sky-800", icon: "bg-sky-600", dot: "bg-sky-500", text: "text-sky-700" }
    : { bg: "bg-emerald-50", border: "border-emerald-200", chip: "bg-emerald-100 text-emerald-800", icon: "bg-emerald-600", dot: "bg-emerald-500", text: "text-emerald-700" };
  return (
    <div className={`rounded-2xl ${a.bg} border ${a.border} overflow-hidden flex flex-col shadow-sm`}>
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl ${a.icon} text-white flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <div className={`font-mono text-[10px] tracking-widest ${a.text} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? labelKh : labelEn}
          </div>
          <h3 className={`font-display font-bold text-lg text-slate-900 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? roleKh : roleEn}
          </h3>
        </div>
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col gap-3">
        <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? bodyKh : bodyEn}
        </p>
        <div className={`mt-1 rounded-lg bg-white/70 border ${a.border} p-3`}>
          <div className={`font-mono text-[10px] uppercase tracking-widest mb-1.5 ${a.text} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការងារធម្មតា" : "Typical duties"}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
            {duties.map((d, i) => (
              <li key={i} className={`text-xs text-slate-700 flex items-start gap-1.5 ${isKh ? "font-khmer leading-loose" : ""}`}>
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                <span>{isKh ? d.kh : d.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RuleOfThumb({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border-l-4 border-sky-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`font-display font-bold text-slate-900 mb-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ច្បាប់ងាយចាំ" : "Rule of thumb"}
          </div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? (
              <>
                <span className="text-sky-700 font-semibold">ទន្តពេទ្យកែចង្កូមទាំងអស់សុទ្ធតែជាទន្តពេទ្យ</span> — ប៉ុន្តែ <span className="text-emerald-700 font-semibold">ទន្តពេទ្យមិនមែនទាំងអស់សុទ្ធតែជាទន្តពេទ្យកែចង្កូមទេ</span>។ វាដូចគ្នានឹងគ្រូពេទ្យបេះដូងគឺជាគ្រូពេទ្យ ប៉ុន្តែគ្រូពេទ្យមិនមែនទាំងអស់សុទ្ធតែជាអ្នកឯកទេសបេះដូងនោះទេ។
              </>
            ) : (
              <>
                <span className="text-sky-700 font-semibold">All orthodontists are dentists</span> — but <span className="text-emerald-700 font-semibold">not all dentists are orthodontists</span>. The same way every cardiologist is a doctor, but not every doctor is a heart specialist.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Tooth anatomy SVG + 3 layer cards
// ════════════════════════════════════════════════════════════════════════════

function ToothAnatomy({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-0">
        {/* SVG cross-section */}
        <div className="bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
          <ToothCrossSectionSVG />
        </div>
        {/* Layer cards */}
        <div className="p-5 sm:p-6 space-y-3">
          <LayerRow
            n={1}
            colorDot="bg-white border-2 border-slate-300"
            labelEn="ENAMEL"
            labelKh="កាចាធ្មេញ"
            titleEn="The hard, white outer shield"
            titleKh="ខែលខាងក្រៅរឹងពណ៌ស"
            bodyEn="The hardest substance in the entire human body — even harder than bone. It has no living cells, so once it is chipped or eaten by acid, it can never grow back."
            bodyKh="សារធាតុរឹងបំផុតក្នុងរូបកាយមនុស្ស — រឹងជាងឆ្អឹងថែមទៀត។ វាគ្មានកោសិកាមានជីវិតទេ ដូច្នេះនៅពេលដែលវាបាក់ ឬត្រូវអាស៊ីតស៊ី វាមិនអាចដុះមកវិញបាននោះទេ។"
            isKh={isKh}
          />
          <LayerRow
            n={2}
            colorDot="bg-yellow-200 border-2 border-yellow-400"
            labelEn="DENTIN"
            labelKh="ភ្លុកធ្មេញ"
            titleEn="The softer, yellow middle layer"
            titleKh="ស្រទាប់កណ្តាលទន់ ពណ៌លឿង"
            bodyEn="Underneath the enamel sits a softer yellow layer, woven through with thousands of microscopic tubes that carry signals to the nerve. When decay reaches here, your tooth becomes sensitive to cold drinks and sweet food."
            bodyKh="នៅខាងក្រោមកាចាធ្មេញ មានស្រទាប់ពណ៌លឿងទន់មួយ ដែលត្បាញដោយបំពង់មីក្រូទស្សន៍រាប់ពាន់ដែលនាំសញ្ញាទៅសរសៃប្រសាទ។ នៅពេលដែលរន្ធធ្មេញឈានដល់ទីនេះ ធ្មេញរបស់អ្នកក្លាយជារសើបនឹងភេសជ្ជៈត្រជាក់ និងម្ហូបផ្អែម។"
            isKh={isKh}
          />
          <LayerRow
            n={3}
            colorDot="bg-rose-400 border-2 border-rose-600"
            labelEn="PULP"
            labelKh="បណ្តូលធ្មេញ"
            titleEn="The living heart — nerves and blood"
            titleKh="បេះដូងមានជីវិត — សរសៃប្រសាទ និងឈាម"
            bodyEn="At the very centre lives the pulp — a soft chamber full of nerves and tiny blood vessels. If a cavity reaches this far, it causes the kind of toothache that wakes you up at night."
            bodyKh="នៅចំកណ្តាលគឺជាបណ្តូលធ្មេញ — បន្ទប់ទន់មួយដែលពោរពេញដោយសរសៃប្រសាទ និងសរសៃឈាមតូចៗ។ ប្រសិនបើរន្ធធ្មេញឈានដល់ទីនេះ វានឹងបណ្តាលឱ្យឈឺធ្មេញដែលធ្វើឱ្យអ្នកភ្ញាក់ពីការគេងពេលយប់។"
            isKh={isKh}
          />

          <div className={`mt-2 flex items-start gap-2 text-xs text-slate-500 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <p>
              {isKh
                ? "បន្ថែមលើសេនះ ឫសធ្មេញដាក់ជ្រៅទៅក្នុងថ្គាម ហើយត្រូវបានគ្រប់ដណ្តប់ដោយ ស៊ីម៉ង់ត៍ធ្មេញ (cementum) ដែលភ្ជាប់ធ្មេញទៅនឹងឆ្អឹងតាមរយៈចំណងមួយដ៏រឹង។"
                : "Below all of this, the root sinks into the jaw and is wrapped in cementum — a special layer that anchors the tooth to the bone with a strong ligament."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayerRow({
  n, colorDot, labelEn, labelKh, titleEn, titleKh, bodyEn, bodyKh, isKh,
}: {
  n: number; colorDot: string;
  labelEn: string; labelKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  isKh: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 flex items-start gap-3">
      <div className="flex flex-col items-center gap-1">
        <div className={`w-6 h-6 rounded-full ${colorDot}`} />
        <div className="font-mono text-[10px] text-slate-400">L{n}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className={`font-mono text-[10px] uppercase tracking-widest text-slate-500 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? labelKh : labelEn}
          </span>
        </div>
        <div className={`font-display font-bold text-slate-900 text-sm mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}>
          {isKh ? titleKh : titleEn}
        </div>
        <p className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? bodyKh : bodyEn}
        </p>
      </div>
    </div>
  );
}

function ToothCrossSectionSVG() {
  return (
    <svg viewBox="0 0 260 360" className="w-full max-w-[240px] h-auto" aria-hidden>
      <defs>
        <linearGradient id="enamelGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="dentinGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="1" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="pulpGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fda4af" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="boneGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fce7f3" />
          <stop offset="1" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>

      {/* Gum line */}
      <rect x="0" y="220" width="260" height="140" fill="url(#boneGrad)" opacity="0.6" />
      <line x1="0" y1="220" x2="260" y2="220" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 4" />
      <text x="6" y="216" fontSize="9" fontFamily="monospace" fill="#9d174d" opacity="0.7">GUM LINE</text>

      {/* Tooth outer shape (enamel) */}
      <path
        d="M 70 30 Q 90 10 130 12 Q 170 10 190 30 Q 210 80 200 150 Q 195 200 180 230 Q 170 280 155 320 Q 145 345 130 345 Q 115 345 105 320 Q 90 280 80 230 Q 65 200 60 150 Q 50 80 70 30 Z"
        fill="url(#enamelGrad)"
        stroke="#0ea5e9"
        strokeWidth="1.5"
      />

      {/* Dentin layer */}
      <path
        d="M 88 50 Q 100 32 130 32 Q 160 32 172 50 Q 188 90 180 150 Q 175 195 165 225 Q 158 270 148 308 Q 142 326 130 326 Q 118 326 112 308 Q 102 270 95 225 Q 85 195 80 150 Q 72 90 88 50 Z"
        fill="url(#dentinGrad)"
        stroke="#d97706"
        strokeWidth="1"
      />

      {/* Pulp chamber (root canal) */}
      <path
        d="M 116 70 Q 120 65 130 65 Q 140 65 144 70 L 144 130 Q 142 200 138 270 Q 135 305 130 305 Q 125 305 122 270 Q 118 200 116 130 Z"
        fill="url(#pulpGrad)"
        stroke="#9f1239"
        strokeWidth="1"
      />

      {/* Labels with leader lines */}
      {/* Enamel */}
      <line x1="220" y1="80" x2="195" y2="100" stroke="#0ea5e9" strokeWidth="1" />
      <circle cx="195" cy="100" r="2.5" fill="#0ea5e9" />
      <text x="222" y="83" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#075985">ENAMEL</text>

      {/* Dentin */}
      <line x1="222" y1="150" x2="180" y2="160" stroke="#d97706" strokeWidth="1" />
      <circle cx="180" cy="160" r="2.5" fill="#d97706" />
      <text x="225" y="153" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#92400e">DENTIN</text>

      {/* Pulp */}
      <line x1="220" y1="220" x2="138" y2="200" stroke="#be123c" strokeWidth="1" />
      <circle cx="138" cy="200" r="2.5" fill="#be123c" />
      <text x="225" y="223" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#9f1239">PULP</text>

      {/* Root */}
      <text x="6" y="340" fontSize="9" fontFamily="monospace" fill="#9d174d" opacity="0.7">ROOT IN JAW</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Career Timeline
// ════════════════════════════════════════════════════════════════════════════

type Step = {
  Icon: React.ComponentType<{ className?: string }>;
  durationEn: string; durationKh: string;
  titleEn: string; titleKh: string;
  labelEn: string; labelKh: string;
  bodyEn: string; bodyKh: string;
  bullets: { en: string; kh: string }[];
  highlight?: boolean;
};

const STEPS: Step[] = [
  {
    Icon: School,
    durationEn: "Grades 10–12",
    durationKh: "ថ្នាក់ទី១០–១២",
    labelEn: "STEP 1 · HIGH SCHOOL",
    labelKh: "ជំហានទី ១ · វិទ្យាល័យ",
    titleEn: "Build the science foundation",
    titleKh: "សាងសង់មូលដ្ឋានវិទ្យាសាស្ត្រ",
    bodyEn: "Excel in Biology, Chemistry, and Physics. Pass the Bac II exam with strong science scores. Start volunteering or visiting a dental clinic if you can.",
    bodyKh: "ឆ្នើមក្នុងជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យា។ ប្រឡងជាប់សញ្ញាបត្រ Bac II ជាមួយនឹងពិន្ទុវិទ្យាសាស្ត្រខ្ពស់។ ចាប់ផ្តើមធ្វើស្ម័គ្រចិត្ត ឬទៅទស្សនាគ្លីនិកទន្តពេទ្យប្រសិនបើអ្នកអាច។",
    bullets: [
      { en: "Biology · Chemistry · Physics", kh: "ជីវវិទ្យា · គីមី · រូបវិទ្យា" },
      { en: "Strong Bac II results", kh: "លទ្ធផល Bac II ខ្ពស់" },
    ],
  },
  {
    Icon: GraduationCap,
    durationEn: "7 years (intensive)",
    durationKh: "៧ ឆ្នាំ (ខ្លាំង)",
    labelEn: "STEP 2 · UNIVERSITY",
    labelKh: "ជំហានទី ២ · សាកលវិទ្យាល័យ",
    titleEn: "Doctor of Dental Surgery (DDS)",
    titleKh: "សាស្ត្រាចារ្យឆ្នោតវះកាត់ធ្មេញ (DDS)",
    bodyEn: "In Cambodia, the DDS programme runs for an intensive 7 years — usually at the University of Health Sciences in Phnom Penh. Years 1–3 are textbooks: anatomy, biochemistry, microbiology. Years 4–7 are hands-on clinics: real patients under supervision.",
    bodyKh: "នៅកម្ពុជា កម្មវិធី DDS ដំណើរការរយៈពេល ៧ ឆ្នាំដ៏ខ្លាំងក្លា — ជាធម្មតានៅសាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាលនៅភ្នំពេញ។ ឆ្នាំទី ១–៣ គឺសៀវភៅ៖ កាយវិភាគសាស្ត្រ ជីវគីមី មីក្រូជីវវិទ្យា។ ឆ្នាំទី ៤–៧ គឺជាគ្លីនិកជាក់ស្តែង៖ អ្នកជំងឺពិតប្រាកដក្រោមការត្រួតពិនិត្យ។",
    bullets: [
      { en: "Years 1–3: Pre-clinical sciences", kh: "ឆ្នាំ ១–៣៖ វិទ្យាសាស្ត្រមុនគ្លីនិក" },
      { en: "Years 4–7: Patient clinics", kh: "ឆ្នាំ ៤–៧៖ គ្លីនិកអ្នកជំងឺ" },
    ],
  },
  {
    Icon: ScrollText,
    durationEn: "After graduation",
    durationKh: "បន្ទាប់ពីបញ្ចប់ការសិក្សា",
    labelEn: "STEP 3 · LICENSING",
    labelKh: "ជំហានទី ៣ · អាជ្ញាប័ណ្ណ",
    titleEn: "Pass the national exam",
    titleKh: "ប្រឡងជាប់ការប្រឡងថ្នាក់ជាតិ",
    bodyEn: "Sit and pass the national licensing exam administered by the Cambodian Dental Council. Once you pass, you may legally practise as a general dentist anywhere in the country.",
    bodyKh: "អង្គុយប្រឡង និងប្រឡងជាប់ការប្រឡងអាជ្ញាប័ណ្ណថ្នាក់ជាតិ ដែលគ្រប់គ្រងដោយក្រុមប្រឹក្សាទន្តពេទ្យកម្ពុជា។ នៅពេលដែលអ្នកប្រឡងជាប់ អ្នកអាចអនុវត្តជាទន្តពេទ្យទូទៅយ៉ាងស្របច្បាប់នៅគ្រប់ទីកន្លែងក្នុងប្រទេស។",
    bullets: [
      { en: "Cambodian Dental Council", kh: "ក្រុមប្រឹក្សាទន្តពេទ្យកម្ពុជា" },
      { en: "License to practise", kh: "អាជ្ញាប័ណ្ណអនុវត្តន៍" },
    ],
  },
  {
    Icon: Briefcase,
    durationEn: "+3 years residency",
    durationKh: "+ ៣ ឆ្នាំនៃការសិក្សា",
    labelEn: "STEP 4 · ORTHODONTIC SPECIALIZATION",
    labelKh: "ជំហានទី ៤ · ការសិក្សាឯកទេសកែចង្កូម",
    titleEn: "Become an Orthodontist",
    titleKh: "ក្លាយជាទន្តពេទ្យកែចង្កូម",
    bodyEn: "To engineer smiles, you must complete an additional 3 years of rigorous residency training focused purely on facial bone mechanics — biomechanics of teeth, growth of the jaw, and the design of fixed and removable appliances.",
    bodyKh: "ដើម្បីធ្វើវិស្វកម្មស្នាមញញឹម អ្នកត្រូវបញ្ចប់ការសិក្សាជំនាញរយៈពេល ៣ ឆ្នាំបន្ថែមដែលផ្តោតលើមេកានិករបស់ឆ្អឹងមុខ — ជីវមេកានិករបស់ធ្មេញ ការលូតលាស់ថ្គាម និងការរចនាឧបករណ៍ថេរ និងផ្តាច់បាន។",
    bullets: [
      { en: "3 years residency", kh: "សិក្សា ៣ ឆ្នាំ" },
      { en: "Facial bone biomechanics", kh: "ជីវមេកានិកឆ្អឹងមុខ" },
    ],
    highlight: true,
  },
];

function CareerTimeline({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-7">
      <div className="relative">
        {/* Vertical rail */}
        <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-500" />
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <li key={i} className="relative pl-14 sm:pl-16">
              {/* Marker */}
              <div className={`absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-4 ring-white flex items-center justify-center text-white shadow ${s.highlight ? "bg-emerald-600" : "bg-sky-600"}`}>
                <s.Icon className="w-5 h-5" />
              </div>

              <div className={`rounded-xl border ${s.highlight ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"} p-4`}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${s.highlight ? "text-emerald-700" : "text-sky-700"} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {isKh ? s.labelKh : s.labelEn}
                  </span>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className={`text-[11px] font-mono text-slate-500 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? s.durationKh : s.durationEn}
                  </span>
                </div>
                <h3 className={`font-display font-bold text-slate-900 text-base sm:text-lg mb-1.5 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
                  {isKh ? s.titleKh : s.titleEn}
                </h3>
                <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? s.bodyKh : s.bodyEn}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.bullets.map((b, j) => (
                    <span
                      key={j}
                      className={`inline-flex items-center gap-1 rounded-full bg-white border ${s.highlight ? "border-emerald-300 text-emerald-800" : "border-sky-300 text-sky-800"} px-2.5 py-0.5 text-[11px] ${isKh ? "font-khmer" : "font-mono"}`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {isKh ? b.kh : b.en}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}

          {/* Final destination chip */}
          <li className="relative pl-14 sm:pl-16">
            <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-4 ring-white bg-gradient-to-br from-sky-600 to-emerald-600 text-white flex items-center justify-center shadow">
              <Award className="w-5 h-5" />
            </div>
            <div className="rounded-xl bg-gradient-to-br from-sky-600 to-emerald-700 text-white p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <HeartPulse className="w-5 h-5 text-sky-100 mt-0.5 flex-shrink-0" />
                <div>
                  <div className={`font-display font-bold text-lg ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? "ឆ្នាំសរុប៖ ៧ + ៣ = ១០ ឆ្នាំ" : "Total: 7 + 3 = 10 years"}
                  </div>
                  <p className={`text-sm text-sky-50/90 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                    {isKh
                      ? "ផ្លូវវែងដ៏សំខាន់មួយ — ប៉ុន្តែចុងបញ្ចប់ អ្នកនឹងផ្លាស់ប្តូរទាំងសុខភាព និងទំនុកចិត្តរបស់មនុស្សរាប់ពាន់នាក់ ស្នាមញញឹមម្តងមួយៗ។"
                      : "A long, demanding road — but at the end you change both the health and the confidence of thousands of people, one smile at a time."}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative + custom Tooth icon (lucide has no Tooth)
// ════════════════════════════════════════════════════════════════════════════

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2c3 0 6 2 6 5 0 3-1 5-1 8s-1 7-3 7-1-4-2-4-0 4-2 4-3-4-3-7-1-5-1-8c0-3 3-5 6-5z" />
    </svg>
  );
}

function ClinicalGridBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4]" aria-hidden>
      <defs>
        <pattern id="cliniGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#bae6fd" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cliniGrid)" />
    </svg>
  );
}
