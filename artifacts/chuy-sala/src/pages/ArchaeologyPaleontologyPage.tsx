import { Link } from "wouter";
import {
  ArrowLeft,
  Pickaxe,
  Bone,
  Landmark,
  Hourglass,
  Scroll,
  Layers,
  Sparkles,
  Compass,
  AlertCircle,
  Mountain,
  Plane,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-PAST · Archaeology & Paleontology: Unearthing the Past
//             បុរាណវិទ្យា និង ប៉ាលេអុងតូឡូស៊ី៖ ការជីកកកាយអតីតកាល
//
//  1. The Great Difference         (side-by-side: humans vs pre-humans)
//  2. Archaeology — The Story of Us (artifacts + Angkor + LIDAR highlight)
//  3. Paleontology — The Story of Earth (fossils + Deep Time scale)
//
//  Aesthetic: Earthy — warm sand body, terra-cotta + amber for archaeology,
//             cool slate + neutral for paleontology to visually separate them.
// ════════════════════════════════════════════════════════════════════════════

export default function ArchaeologyPaleontologyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      data-testid="past-page"
    >
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 border-b-2 border-amber-200">
        <EarthGridBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-800 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white border border-amber-300 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-800 shadow-sm">
            <Pickaxe className="w-3.5 h-3.5" aria-hidden="true" />
            SCI-PAST · ARCHAEOLOGY &amp; PALEONTOLOGY
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl text-stone-900 ${isKh ? "font-khmer leading-snug" : ""}`}
          >
            {isKh ? (
              <>
                ការជីកកកាយអតីតកាល —{" "}
                <span className="text-amber-800">
                  បុរាណវិទ្យា និង ប៉ាលេអុងតូឡូស៊ី
                </span>
              </>
            ) : (
              <>
                Unearthing the Past —{" "}
                <span className="text-amber-800">
                  Archaeology &amp; Paleontology
                </span>
              </>
            )}
          </h1>
          {/* Always-paired bilingual subtitle */}
          <div className="mt-2 text-base sm:text-lg font-semibold text-slate-700 font-khmer leading-snug">
            {isKh
              ? "Unearthing the Past — Archaeology & Paleontology"
              : "ការជីកកកាយអតីតកាល — បុរាណវិទ្យា និង ប៉ាលេអុងតូឡូស៊ី"}
          </div>

          <p
            className={`mt-4 max-w-2xl text-stone-700 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh
              ? "មាន​វិទ្យាសាស្ត្រ​ពីរ​ដែល​ជីក​ចូល​ទៅ​ក្នុង​អតីតកាល — តែ​មួយ​សិក្សា​ពី​មនុស្ស ហើយ​មួយ​ទៀត​សិក្សា​ពី​ផែនដី​ដែល​មាន​មុន​មនុស្ស​យូរ​ណាស់​មក​ហើយ។ ខាង​ក្រោម​នេះ​យើង​នឹង​ស្គាល់​ភាព​ខុស​គ្នា​រវាង​ពួក​វា ដើរ​ទស្សនា​អង្គរ​តាម​រយៈ LIDAR និង​ឈរ​នៅ​ចំពោះ​មុខ​នៃ​ពេលវេលា​ជ្រៅ។"
              : "Two sciences both dig into the past — but one studies people, and the other studies the Earth long before people existed. Below we meet the difference between them, fly over Angkor with LIDAR lasers, and stand at the edge of deep time."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <StatChip
              valueEn="4.5 B"
              labelEn="Years old · the Earth"
              labelKh="ឆ្នាំ​នៃ​ផែនដី"
              tone="slate"
            />
            <StatChip
              valueEn="~300 K"
              labelEn="Years of modern humans"
              labelKh="ឆ្នាំ​នៃ​មនុស្ស​ទំនើប"
              tone="amber"
            />
            <StatChip
              valueEn="~1,200"
              labelEn="Years old · Angkor"
              labelKh="ឆ្នាំ​នៃ​អង្គរ"
              tone="amber"
            />
          </div>
        </div>
      </header>

      {/* ── Section 1: The Great Difference ───────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Two sister sciences"
        eyebrowKh="វិទ្យាសាស្ត្រ​បងប្អូន​ពីរ"
        titleEn="The Great Difference"
        titleKh="ភាពខុសគ្នាដ៏ធំ"
        descEn="Both fields hold a trowel and dig in the dirt — but they are looking for completely different things. The line between them is drawn at one moment in history: the arrival of humans."
        descKh="វិស័យ​ទាំង​ពីរ​កាន់​ចបជីក​ហើយ​ជីក​ដី​ដូច​គ្នា — ប៉ុន្តែ​ពួក​គេ​កំពុង​ស្វែង​រក​អ្វី​ដែល​ខុស​គ្នា​ស្រឡះ។ បន្ទាត់​រវាង​ពួក​គេ​គូរ​នៅ​ពេល​មួយ​ក្នុង​ប្រវត្តិសាស្ត្រ៖ ការ​មក​ដល់​នៃ​មនុស្ស។"
        isKh={isKh}
        testId="past-section-difference"
      >
        <ComparePanel isKh={isKh} />
        <RuleOfThumb isKh={isKh} />
      </Section>

      {/* ── Section 2: Archaeology - The Story of Us ──────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The story of us"
        eyebrowKh="រឿងរ៉ាវរបស់យើង"
        titleEn="Archaeology"
        titleKh="បុរាណវិទ្យា"
        descEn="An archaeologist is a detective of human history. They look for ARTIFACTS — anything made by human hands — to piece together how people lived, traded, fought, prayed, and built civilizations long before any of it was written down."
        descKh="អ្នក​បុរាណវិទ្យា​គឺ​ជា​អ្នក​ស៊ើបអង្កេត​នៃ​ប្រវត្តិ​មនុស្ស។ ពួក​គាត់​ស្វែង​រក​បុរាណវត្ថុ — រាល់​អ្វី​ដែល​ធ្វើ​ដោយ​ដៃ​មនុស្ស — ដើម្បី​ផ្គុំ​ផ្សំ​ឡើង​វិញ​ថា​មនុស្ស​រស់នៅ ជួញដូរ ប្រយុទ្ធ បួងសួង និង​សាងសង់​អារ្យធម៌​ដោយ​របៀប​ណា មុន​នឹង​អ្វី​ទាំង​នេះ​ត្រូវ​បាន​សរសេរ​ចុះ។"
        isKh={isKh}
        testId="past-section-archaeology"
      >
        <ConceptTerm
          tone="amber"
          termEn="Artifacts"
          termKh="បុរាណវត្ថុ"
          definitionEn="Any physical object made, shaped, or used by humans — from a 5,000-year-old clay pot to a single carved stone bead."
          definitionKh="វត្ថុ​រាង​កាយ​ណា​មួយ​ដែល​មនុស្ស​បាន​ផលិត រាង ឬ​ប្រើ — ចាប់​ពី​ឆ្នាំង​ដី​ឥដ្ឋ​អាយុ ៥.០០០ ឆ្នាំ ដល់​ដុំ​ថ្ម​ឆ្លាក់​មួយ​ដុំ។"
          icon={Scroll}
        />
        <ArtifactGrid isKh={isKh} />
        <AngkorHighlight isKh={isKh} />
      </Section>

      {/* ── Section 3: Paleontology - The Story of Earth ──────────────── */}
      <Section
        spec="03"
        eyebrowEn="The story of Earth"
        eyebrowKh="រឿងរ៉ាវរបស់ផែនដី"
        titleEn="Paleontology"
        titleKh="ប៉ាលេអុងតូឡូស៊ី"
        descEn="A paleontologist studies life on Earth before humans existed at all. Their evidence is buried in stone — FOSSILS — the remains and impressions of plants and animals that lived millions or even billions of years ago."
        descKh="អ្នក​ប៉ាលេអុងតូឡូស៊ី​សិក្សា​ជីវិត​លើ​ផែនដី​មុន​នឹង​មនុស្ស​មាន​ឡើយ។ ភ័ស្តុតាង​របស់​ពួក​គាត់​ត្រូវ​បាន​កប់​ក្នុង​ថ្ម — ហ្វូស៊ីល — សំណល់ និង​ស្នាម​នៃ​រុក្ខជាតិ និង​សត្វ​ដែល​មាន​ជីវិត​ប៉ុន្មាន​លាន ឬ​សូម្បី​តែ​ប៉ុន្មាន​ពាន់​លាន​ឆ្នាំ​មុន។"
        isKh={isKh}
        testId="past-section-paleontology"
      >
        <ConceptTerm
          tone="slate"
          termEn="Fossils"
          termKh="ហ្វូស៊ីល"
          definitionEn="The remains or impressions of prehistoric plants or animals embedded in rock — bones, shells, leaf prints, even footprints turned to stone."
          definitionKh="សំណល់ ឬ​ស្នាម​នៃ​រុក្ខជាតិ ឬ​សត្វ​បុរាណ​ដែល​ត្រូវ​បាន​បង្កប់​ក្នុង​ថ្ម — ឆ្អឹង សំបក រូប​ស្លឹក សូម្បី​តែ​ស្នាម​ជើង​ដែល​ប្រែ​ទៅ​ជា​ថ្ម។"
          icon={Bone}
        />
        <FossilGrid isKh={isKh} />
        <DeepTimeHighlight isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-800 text-sm ${isKh ? "font-khmer" : ""}`}
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
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-amber-100 text-amber-800 rounded-sm px-2.5 py-0.5 border border-amber-200">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-amber-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      {/* Always-bilingual paired heading: BOTH EN and KH visible at once */}
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <div className="text-base sm:text-lg font-semibold text-slate-700 font-khmer leading-snug mb-3">
        {isKh ? titleEn : titleKh}
      </div>
      <p
        className={`text-stone-700 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
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
  tone,
}: {
  valueEn: string;
  labelEn: string;
  labelKh: string;
  tone: "amber" | "slate";
}) {
  const palette =
    tone === "amber"
      ? { border: "border-amber-200", value: "text-amber-800" }
      : { border: "border-slate-300", value: "text-slate-700" };
  return (
    <div
      className={`rounded-xl bg-white/80 backdrop-blur border ${palette.border} px-3 py-2 flex flex-col`}
    >
      <div
        className={`font-display font-bold text-2xl ${palette.value} leading-none`}
      >
        {valueEn}
      </div>
      {/* Always-paired bilingual label */}
      <div className="text-[11px] text-stone-700 mt-1 leading-tight">
        {labelEn}
      </div>
      <div className="text-[11px] text-stone-500 font-khmer leading-snug">
        {labelKh}
      </div>
    </div>
  );
}

function EarthGridBg() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.6] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(180, 83, 9, 0.10) 1.4px, transparent 1.4px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}

// ── Bilingual concept-term card (paired EN+KH for "core concepts") ───────
function ConceptTerm({
  tone,
  termEn,
  termKh,
  definitionEn,
  definitionKh,
  icon: Icon,
}: {
  tone: "amber" | "slate";
  termEn: string;
  termKh: string;
  definitionEn: string;
  definitionKh: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  const palette =
    tone === "amber"
      ? {
          bg: "bg-amber-50",
          border: "border-amber-300",
          iconBg: "bg-amber-700",
          term: "text-amber-900",
          accent: "border-amber-500",
        }
      : {
          bg: "bg-slate-100",
          border: "border-slate-300",
          iconBg: "bg-slate-700",
          term: "text-slate-900",
          accent: "border-slate-500",
        };
  return (
    <div
      className={`rounded-2xl ${palette.bg} border-l-4 ${palette.accent} border-y border-r ${palette.border} p-5 shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl ${palette.iconBg} text-white flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5" aria-hidden={true} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Paired bilingual term: EN big, KH right below */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3
              className={`font-display font-bold text-xl ${palette.term} leading-tight`}
            >
              {termEn}
            </h3>
            <span className="text-stone-400">/</span>
            <span
              className={`font-display font-bold text-xl font-khmer ${palette.term} leading-snug`}
            >
              {termKh}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-stone-700 leading-relaxed">
            {definitionEn}
          </p>
          <p className="mt-1 text-sm text-stone-700 font-khmer leading-loose">
            {definitionKh}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · The Great Difference — side-by-side comparison panel
// ════════════════════════════════════════════════════════════════════════════

function ComparePanel({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldCard
        side="archaeology"
        Icon={Landmark}
        emoji="🏛️"
        nameEn="Archaeology"
        nameKh="បុរាណវិទ្យា"
        studiesEn="Studies HUMANS"
        studiesKh="សិក្សា​ពី​មនុស្ស"
        bodyEn="If it involves people, buildings, tools, or pottery — it is archaeology. The story begins roughly 300,000 years ago when modern humans appeared, and runs all the way up to last week."
        bodyKh="ប្រសិន​បើ​វា​ពាក់ព័ន្ធ​នឹង​មនុស្ស អគារ ឧបករណ៍ ឬ​ឆ្នាំង​ដី​ឥដ្ឋ — វា​គឺ​ជា​បុរាណវិទ្យា។ រឿង​នេះ​ចាប់​ផ្តើម​ប្រមាណ ៣០០.០០០ ឆ្នាំ​មុន ពេល​មនុស្ស​ទំនើប​លេច​ឡើង ហើយ​រត់​មក​ដល់​សប្ដាហ៍​មុន។"
        examples={[
          { en: "People", kh: "មនុស្ស" },
          { en: "Buildings", kh: "អគារ" },
          { en: "Tools", kh: "ឧបករណ៍" },
          { en: "Pottery", kh: "ឆ្នាំង" },
        ]}
        isKh={isKh}
      />
      <FieldCard
        side="paleontology"
        Icon={Bone}
        emoji="🦖"
        nameEn="Paleontology"
        nameKh="ប៉ាលេអុងតូឡូស៊ី"
        studiesEn="Studies LIFE BEFORE HUMANS"
        studiesKh="សិក្សា​ជីវិត​មុន​មនុស្ស"
        bodyEn="If it involves dinosaurs, ancient plants, or fossils embedded in rock — it is paleontology. The story stretches all the way back to the very first single-celled life, more than 3.5 billion years ago."
        bodyKh="ប្រសិន​បើ​វា​ពាក់ព័ន្ធ​នឹង​ឌីណូស័រ រុក្ខជាតិ​បុរាណ ឬ​ហ្វូស៊ីល​ដែល​បង្កប់​ក្នុង​ថ្ម — វា​គឺ​ជា​ប៉ាលេអុងតូឡូស៊ី។ រឿង​នេះ​លាត​សន្ធឹង​រហូត​ដល់​ជីវិត​កោសិកា​តែ​មួយ​ដំបូង​បំផុត ជាង ៣,៥ ពាន់​លាន​ឆ្នាំ​មុន។"
        examples={[
          { en: "Dinosaurs", kh: "ឌីណូស័រ" },
          { en: "Ancient plants", kh: "រុក្ខជាតិបុរាណ" },
          { en: "Fossils", kh: "ហ្វូស៊ីល" },
          { en: "Trilobites", kh: "ត្រីឡូប៊ីត" },
        ]}
        isKh={isKh}
      />
    </div>
  );
}

function FieldCard({
  side,
  Icon,
  emoji,
  nameEn,
  nameKh,
  studiesEn,
  studiesKh,
  bodyEn,
  bodyKh,
  examples,
  isKh,
}: {
  side: "archaeology" | "paleontology";
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  emoji: string;
  nameEn: string;
  nameKh: string;
  studiesEn: string;
  studiesKh: string;
  bodyEn: string;
  bodyKh: string;
  examples: { en: string; kh: string }[];
  isKh: boolean;
}) {
  const palette =
    side === "archaeology"
      ? {
          bg: "bg-amber-50",
          border: "border-amber-300",
          iconBg: "bg-amber-700",
          accent: "text-amber-900",
          chipBg: "bg-white",
          chipBorder: "border-amber-300",
          chipText: "text-amber-900",
          hero: "bg-gradient-to-br from-amber-100 to-orange-50",
        }
      : {
          bg: "bg-slate-100",
          border: "border-slate-300",
          iconBg: "bg-slate-700",
          accent: "text-slate-900",
          chipBg: "bg-white",
          chipBorder: "border-slate-300",
          chipText: "text-slate-800",
          hero: "bg-gradient-to-br from-slate-200 to-slate-50",
        };
  return (
    <div
      data-testid={`past-field-${side}`}
      className={`rounded-2xl ${palette.bg} border ${palette.border} overflow-hidden shadow-sm flex flex-col`}
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
          <div
            className={`w-9 h-9 rounded-lg ${palette.iconBg} text-white inline-flex items-center justify-center mb-1`}
          >
            <Icon className="w-4 h-4" aria-hidden={true} />
          </div>
          {/* Always-paired bilingual field name */}
          <h3
            className={`font-display font-bold text-xl ${palette.accent} leading-tight`}
          >
            {nameEn}
          </h3>
          <div
            className={`font-display font-bold text-base font-khmer ${palette.accent} leading-snug`}
          >
            {nameKh}
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Studies-what summary, paired bilingual */}
        <div
          className={`inline-flex items-center gap-2 self-start rounded-md ${palette.chipBg} border ${palette.chipBorder} px-2.5 py-1`}
        >
          <Compass
            className={`w-3.5 h-3.5 ${side === "archaeology" ? "text-amber-700" : "text-slate-700"}`}
            aria-hidden="true"
          />
          <span className={`text-[11px] font-mono uppercase tracking-widest ${palette.chipText}`}>
            {studiesEn}
          </span>
          <span className="text-stone-400">/</span>
          <span className={`text-[11px] font-khmer ${palette.chipText}`}>
            {studiesKh}
          </span>
        </div>

        <p
          className={`text-sm text-stone-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {isKh ? bodyKh : bodyEn}
        </p>

        <div>
          <div
            className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${side === "archaeology" ? "text-amber-700" : "text-slate-700"}`}
          >
            EXAMPLES · ឧទាហរណ៍
          </div>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full ${palette.chipBg} border ${palette.chipBorder} px-2.5 py-1 text-xs ${palette.chipText}`}
              >
                <span>{ex.en}</span>
                <span className="text-stone-400">/</span>
                <span className="font-khmer">{ex.kh}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleOfThumb({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border-l-4 border-amber-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Sparkles
          className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <div
            className={`font-display font-bold text-stone-900 mb-1 ${isKh ? "font-khmer" : ""}`}
          >
            {isKh ? "ច្បាប់ងាយចាំ" : "Rule of thumb"}
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            If a discovery involves{" "}
            <strong className="text-amber-800">people</strong>, it belongs to{" "}
            <strong className="text-amber-800">archaeology</strong>. If it
            predates humans entirely — like a{" "}
            <strong className="text-slate-700">dinosaur</strong> or a fern
            turned to stone — it belongs to{" "}
            <strong className="text-slate-700">paleontology</strong>.
          </p>
          <p className="mt-1.5 text-sm text-stone-700 font-khmer leading-loose">
            ប្រសិន​បើ​ការ​រក​ឃើញ​ពាក់ព័ន្ធ​នឹង{" "}
            <strong className="text-amber-800">មនុស្ស</strong> វា​ជា​របស់{" "}
            <strong className="text-amber-800">បុរាណវិទ្យា</strong>។
            ប្រសិន​បើ​វា​មាន​មុន​មនុស្ស​ទាំង​ស្រុង — ដូច​ជា{" "}
            <strong className="text-slate-700">ឌីណូស័រ</strong>{" "}
            ឬ​ស្លឹក​ឈើ​ដែល​ប្រែ​ទៅ​ជា​ថ្ម — វា​ជា​របស់{" "}
            <strong className="text-slate-700">ប៉ាលេអុងតូឡូស៊ី</strong>។
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Archaeology — Artifact examples + Angkor highlight box
// ════════════════════════════════════════════════════════════════════════════

function ArtifactGrid({ isKh: _isKh }: { isKh: boolean }) {
  const items: { emoji: string; nameEn: string; nameKh: string }[] = [
    { emoji: "🏺", nameEn: "Pottery", nameKh: "ឆ្នាំងដី" },
    { emoji: "🪓", nameEn: "Stone tools", nameKh: "ឧបករណ៍ថ្ម" },
    { emoji: "🪙", nameEn: "Coins", nameKh: "កាក់" },
    { emoji: "💍", nameEn: "Jewelry", nameKh: "គ្រឿងអលង្ការ" },
    { emoji: "📜", nameEn: "Inscriptions", nameKh: "សិលាចារឹក" },
    { emoji: "🗿", nameEn: "Statues", nameKh: "រូបសំណាក" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-amber-200 px-3 py-3 flex items-center gap-3 shadow-sm"
        >
          <span className="text-2xl select-none leading-none" aria-hidden="true">
            {it.emoji}
          </span>
          <div className="min-w-0">
            <div className="font-bold text-sm text-amber-900 leading-tight">
              {it.nameEn}
            </div>
            <div className="text-xs text-stone-600 font-khmer leading-snug">
              {it.nameKh}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AngkorHighlight({ isKh }: { isKh: boolean }) {
  return (
    <div
      data-testid="past-angkor-box"
      className="rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 border-2 border-amber-400 overflow-hidden shadow-md"
    >
      <div className="px-5 sm:px-6 py-4 bg-amber-600 text-white flex items-center gap-3">
        <Landmark className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-mono text-[10px] tracking-widest uppercase text-amber-100">
            LOCAL HIGHLIGHT
          </span>
          <span className="text-amber-200">/</span>
          <span className="font-mono text-[10px] tracking-widest text-amber-100 font-khmer normal-case">
            ការ​រំលេច​មូលដ្ឋាន
          </span>
        </div>
      </div>
      <div className="px-5 sm:px-6 py-5">
        {/* Paired bilingual title */}
        <div className="flex items-baseline gap-2 flex-wrap mb-2">
          <h3 className="font-display font-bold text-2xl text-amber-900 leading-tight">
            The Angkor Empire
          </h3>
          <span className="text-amber-400">/</span>
          <h3 className="font-display font-bold text-2xl text-amber-900 font-khmer leading-snug">
            អាណាចក្រអង្គរ
          </h3>
        </div>
        <p
          className={`text-sm sm:text-base text-stone-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {isKh
            ? "នៅ​សតវត្សរ៍​ទី​៩ ដល់​ទី​១៥ អង្គរ​ជា​ទីក្រុង​ធំ​បំផុត​មួយ​ក្នុង​ពិភពលោក។ ប៉ុន្តែ​ផ្នែក​ភាគ​ច្រើន​នៃ​វា​ត្រូវ​បាន​ព្រៃ​លាប​បាំង​ជា​សតវត្សរ៍​ច្រើន។ អ្នក​បុរាណវិទ្យា​ទំនើប​មិន​ជីក​ដោយ​ចបជីក​ឡើយ — ពួកគាត់​ហោះ​លើ​ព្រៃ​ដោយ LIDAR។"
            : "From the 9th to the 15th century, Angkor was one of the largest cities on Earth. But for centuries, much of it disappeared under jungle canopy. Modern archaeologists do not start with shovels — they fly over the forest with LIDAR."}
        </p>

        {/* LIDAR concept callout — paired bilingual term */}
        <div className="mt-4 rounded-xl bg-white border border-amber-300 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center flex-shrink-0">
              <Plane className="w-5 h-5" aria-hidden={true} />
            </div>
            <div className="min-w-0 flex-1">
              {/* Paired bilingual term */}
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-display font-bold text-lg text-amber-900 leading-tight">
                  LIDAR
                </h4>
                <span className="text-amber-400">/</span>
                <h4 className="font-display font-bold text-lg text-amber-900 font-khmer leading-snug">
                  ឡៃដា
                </h4>
                <span className="text-[11px] text-stone-500 italic">
                  Light Detection And Ranging
                </span>
              </div>
              <p className="mt-1.5 text-sm text-stone-700 leading-relaxed">
                A helicopter sweeps lasers across the jungle. The leaves
                scatter most of the light, but a few pulses slip through and
                bounce off the actual ground. A computer subtracts the trees
                and reveals roads, canals, and entire lost neighborhoods of
                Angkor — without anyone touching a shovel.
              </p>
              <p className="mt-1.5 text-sm text-stone-700 font-khmer leading-loose">
                ហេលីកុបទ័រ​មួយ​បាញ់​ឡាស៊ែរ​ឆ្លង​លើ​ព្រៃ។ ស្លឹកឈើ​ប៉ះពាល់​ភាគ​ច្រើន​នៃ​ពន្លឺ ប៉ុន្តែ​ប៉ុន្មាន​ពន្លឺ​អាច​ឆ្លង​ចូល​ដី​ដើម។ កុំព្យូទ័រ​ដក​ដើមឈើ​ចេញ ហើយ​បង្ហាញ​ផ្លូវ ប្រឡាយ និង​សង្កាត់​បាត់​បង់​ទាំង​មូល​នៃ​អង្គរ — ដោយ​មិន​បាច់​ប្រើ​ចបជីក​ឡើយ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Paleontology — Fossil examples + Deep Time visualization
// ════════════════════════════════════════════════════════════════════════════

function FossilGrid({ isKh: _isKh }: { isKh: boolean }) {
  const items: { emoji: string; nameEn: string; nameKh: string }[] = [
    { emoji: "🦴", nameEn: "Dinosaur bones", nameKh: "ឆ្អឹងឌីណូស័រ" },
    { emoji: "🐚", nameEn: "Ammonite shells", nameKh: "សំបកអាំម៉ូនីត" },
    { emoji: "🌿", nameEn: "Leaf prints", nameKh: "ស្នាមស្លឹក" },
    { emoji: "🦣", nameEn: "Mammoth teeth", nameKh: "ធ្មេញម៉ាម៉ូត" },
    { emoji: "👣", nameEn: "Footprints in stone", nameKh: "ស្នាមជើងក្នុងថ្ម" },
    { emoji: "🪨", nameEn: "Trilobites", nameKh: "ត្រីឡូប៊ីត" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-slate-300 px-3 py-3 flex items-center gap-3 shadow-sm"
        >
          <span className="text-2xl select-none leading-none" aria-hidden="true">
            {it.emoji}
          </span>
          <div className="min-w-0">
            <div className="font-bold text-sm text-slate-900 leading-tight">
              {it.nameEn}
            </div>
            <div className="text-xs text-stone-600 font-khmer leading-snug">
              {it.nameKh}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeepTimeHighlight({ isKh }: { isKh: boolean }) {
  // Cosmic-calendar-style timeline rows: scaled positions on a 24-hour day
  const rows: {
    timeEn: string;
    eventEn: string;
    eventKh: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    leftPct: number;
  }[] = [
    {
      timeEn: "00:00",
      eventEn: "Earth forms (4.5 billion years ago)",
      eventKh: "ផែនដីបង្កើតឡើង (៤,៥ ពាន់លានឆ្នាំមុន)",
      icon: Mountain,
      leftPct: 0,
    },
    {
      timeEn: "04:00",
      eventEn: "First single-celled life",
      eventKh: "ជីវិតកោសិកាតែមួយដំបូង",
      icon: Layers,
      leftPct: 16,
    },
    {
      timeEn: "22:54",
      eventEn: "Dinosaurs appear",
      eventKh: "ឌីណូស័រលេចឡើង",
      icon: Bone,
      leftPct: 95,
    },
    {
      timeEn: "23:39",
      eventEn: "Dinosaurs go extinct",
      eventKh: "ឌីណូស័រផុតពូជ",
      icon: AlertCircle,
      leftPct: 98.4,
    },
    {
      timeEn: "23:58:43",
      eventEn: "Modern humans appear (last 77 seconds)",
      eventKh: "មនុស្សទំនើបលេចឡើង (៧៧ វិនាទីចុងក្រោយ)",
      icon: Landmark,
      leftPct: 99.93,
    },
  ];

  return (
    <div
      data-testid="past-deep-time-box"
      className="rounded-2xl bg-gradient-to-br from-slate-100 via-stone-100 to-slate-50 border-2 border-slate-400 overflow-hidden shadow-md"
    >
      <div className="px-5 sm:px-6 py-4 bg-slate-700 text-white flex items-center gap-3">
        <Hourglass className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-200">
            CORE CONCEPT
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-mono text-[10px] tracking-widest text-slate-200 font-khmer normal-case">
            គំនិត​ស្នូល
          </span>
        </div>
      </div>
      <div className="px-5 sm:px-6 py-5">
        {/* Paired bilingual title */}
        <div className="flex items-baseline gap-2 flex-wrap mb-2">
          <h3 className="font-display font-bold text-2xl text-slate-900 leading-tight">
            Deep Time
          </h3>
          <span className="text-slate-400">/</span>
          <h3 className="font-display font-bold text-2xl text-slate-900 font-khmer leading-snug">
            ពេលវេលាជ្រៅ
          </h3>
        </div>
        <p
          className={`text-sm sm:text-base text-stone-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {isKh
            ? "ផែនដី​មាន​អាយុ ៤,៥ ពាន់​លាន​ឆ្នាំ — ចំនួន​ដ៏​ធំ​ដែល​ខួរ​ក្បាល​មនុស្ស​មិន​អាច​ស្រាយ​ឱ្យ​ឃើញ​ច្បាស់​ទេ។ ដើម្បី​យល់ ចូរ​ច្របាច់​ប្រវត្តិ​ផែនដី​ទាំង​មូល​ឱ្យ​ត្រូវ​នឹង​នាឡិកា ២៤ ម៉ោង។ មនុស្ស​ទំនើប​លេច​ឡើង​នៅ​ត្រឹម ៧៧ វិនាទី​ចុង​ក្រោយ​ប៉ុណ្ណោះ។"
            : "The Earth is roughly 4.5 billion years old — a number so large the human brain can't really feel it. To understand, squeeze the entire history of the planet onto a single 24-hour clock. Modern humans show up only in the last 77 seconds before midnight."}
        </p>

        {/* Cosmic-calendar style timeline */}
        <div className="mt-5">
          <div
            className="relative h-3 rounded-full bg-gradient-to-r from-stone-300 via-slate-300 to-amber-200 mb-2 overflow-visible"
            aria-hidden="true"
          >
            {rows.map((r, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700 ring-2 ring-white shadow"
                style={{ left: `${r.leftPct}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-600 mb-3">
            <span>00:00 · 4.5 B yrs ago</span>
            <span>24:00 · today</span>
          </div>

          <ol className="space-y-2.5">
            {rows.map((r, i) => {
              const Icon = r.icon;
              const isHuman = i === rows.length - 1;
              return (
                <li
                  key={i}
                  className={`flex items-start gap-3 rounded-lg border ${isHuman ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"} px-3 py-2`}
                >
                  <div
                    className={`w-7 h-7 rounded-md ${isHuman ? "bg-amber-700" : "bg-slate-700"} text-white flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden={true} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`font-mono text-[11px] font-bold ${isHuman ? "text-amber-800" : "text-slate-700"}`}
                      >
                        {r.timeEn}
                      </span>
                      <span
                        className={`text-sm font-bold ${isHuman ? "text-amber-900" : "text-slate-900"} leading-tight`}
                      >
                        {r.eventEn}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-khmer leading-snug ${isHuman ? "text-amber-800" : "text-stone-600"}`}
                    >
                      {r.eventKh}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Key takeaway */}
          <div className="mt-4 rounded-lg bg-slate-700 text-white px-4 py-3">
            <p className="text-sm font-semibold leading-snug">
              We have been here for the very last sliver of the day.
            </p>
            <p className="text-xs text-slate-200 mt-1 font-khmer leading-snug">
              យើង​នៅ​ទីនេះ​តែ​ចម្រៀក​ចុង​ក្រោយ​បំផុត​នៃ​ថ្ងៃ​ប៉ុណ្ណោះ។
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
