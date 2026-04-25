import { Link } from "wouter";
import {
  ScanLine,
  Search,
  Bone,
  AudioWaveform,
  Brain,
  GraduationCap,
  Sparkles,
  Stethoscope,
  ArrowLeft,
  Eye,
  Radiation,
  Cpu,
  Activity,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Radiology: Seeing the Invisible
//  វិទ្យុសកម្មសាស្ត្រ៖ ការមើលឃើញអ្វីដែលមើលមិនឃើញ
//
//  A deep-dive module within the Pathway to Medicine pillar.
//  Aesthetic: deep blacks + clinical whites + glowing X-ray cyan/blue —
//  evoking a darkened reading room with backlit lightboxes.
//
//  Cards:
//    1. The Medical Detective — what a radiologist actually does
//    2. The Three Eyes of Medicine — X-Ray / Ultrasound / MRI & CT
//    3. The Pathway & The Future — training + AI in radiology
// ════════════════════════════════════════════════════════════════════════════

export default function RadiologyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-100 bg-slate-950 overflow-hidden">
      <ScopedStyles />
      <XRayBg />

      {/* ── Back link ───────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/pathway-to-medicine"
          className={`inline-flex items-center gap-1.5 text-cyan-300/80 hover:text-cyan-200 text-sm font-medium ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅផ្លូវវិជ្ជាជីវៈពេទ្យ" : "Back to Pathway to Medicine"}
        </Link>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-sm">
          <Stethoscope className="w-3.5 h-3.5" />
          {isKh ? "មគ្គុទ្ទេសក៍វិជ្ជាជីវៈ · វេជ្ជសាស្ត្រ" : "Career Guide · Medicine"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>
              វិទ្យុសកម្មសាស្ត្រ៖{" "}
              <span className="rad-text-glow">ការមើលឃើញអ្វីដែលមើលមិនឃើញ</span>
            </>
          ) : (
            <>
              Radiology: <span className="rad-text-glow">Seeing the Invisible</span>
            </>
          )}
        </h1>
        <p
          className={`text-slate-300 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ស្រមៃថាអ្នកអាចមើលពេញដៃរបស់នរណាម្នាក់ដោយមិនកាត់ស្បែករបស់គាត់ចេញទេ — អាចមើលបេះដូងរបស់ទារកដែលកំពុងលោតក្នុងផ្ទៃ ឬមើលឃើញដុំសាច់តូចមួយដែលលាក់នៅជ្រៅក្នុងខួរក្បាល។ នេះគឺជាមុខងាររបស់វេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រ — ភ្នែកដែលមើលឃើញរូបភាពរបស់រាងកាយមនុស្សពីខាងក្នុង។"
            : "Imagine being able to look right through someone's hand without making a single cut — to watch a baby's heart beating inside the womb, or to spot a tumour the size of a grain of rice hidden deep inside the brain. That is the everyday work of a radiologist: a doctor whose eyes can see images of the human body from the inside out."}
        </p>

        <div className="hidden sm:flex absolute top-4 right-8 items-center gap-3 text-cyan-300/70 select-none">
          <ScanLine className="w-7 h-7 rad-pulse" style={{ animationDelay: "0s" }} />
          <Brain className="w-7 h-7 rad-pulse" style={{ animationDelay: "0.6s" }} />
          <Radiation className="w-7 h-7 rad-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── Card 1: The Medical Detective ───────────────────────────── */}
      <section
        id="card-detective"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <RadCard
          eyebrowEn="Card 01 · The Role"
          eyebrowKh="កាត ០១ · តួនាទី"
          icon={Search}
          titleEn="The Medical Detective"
          titleKh="អ្នកស៊ើបអង្កេតវេជ្ជសាស្ត្រ"
          isKh={isKh}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3
                className={`text-cyan-300 font-bold text-sm uppercase tracking-widest mb-2 ${
                  isKh ? "font-khmer tracking-normal normal-case" : ""
                }`}
              >
                {isKh ? "“វេជ្ជបណ្ឌិតរបស់វេជ្ជបណ្ឌិត”" : "“The Doctor's Doctor”"}
              </h3>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {isKh
                  ? "នៅពេលដែលអ្នកជំងឺមិនស្រួលខ្លួន ហើយវេជ្ជបណ្ឌិតផ្សេងទៀតមិនអាចរកមូលហេតុបានទេ — ពួកគេបញ្ជូនអ្នកជំងឺនោះទៅរកវេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រ។ វាជាមូលហេតុដែលគេហៅពួកគាត់ថា “វេជ្ជបណ្ឌិតរបស់វេជ្ជបណ្ឌិត” — អ្នកដែលឯកទេសផ្សេងទៀតផ្ញើបញ្ហាដែលលាក់ទៅឲ្យដោះស្រាយ។"
                  : "When a patient feels sick but no one can pinpoint why, other doctors send them to the radiologist. That is exactly why radiologists are called the “Doctor's Doctor” — every other specialty in the hospital relies on them to confirm what the eye and the stethoscope cannot."}
              </p>
            </div>
            <div className="rad-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-cyan-300" />
                <h4
                  className={`text-cyan-200 font-bold text-xs uppercase tracking-widest ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {isKh ? "មិនត្រឹមតែចុចប៊ូតុងទេ" : "Not Just Pressing the Button"}
                </h4>
              </div>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {isKh
                  ? "វេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រមិនត្រឹមតែចុចប៊ូតុងម៉ាស៊ីនថតរូបភាពទេ។ ពួកគាត់ជាអ្នកស៊ើបអង្កេតវេជ្ជសាស្ត្រដែលបានបណ្ដុះបណ្ដាលយ៉ាងស៊ីជម្រៅ ដើម្បីវិភាគរូបភាពស្មុគស្មាញ — ស្វែងរកដុំសាច់ដែលលាក់នៅជ្រៅ ឈាមហូរក្នុងពោះ ឬស្នាមបាក់ឆ្អឹងតូចៗដែលមើលឃើញពិបាក។"
                  : "Radiologists do not simply press the button on the camera. They are highly trained medical detectives who analyse complex images to uncover hidden tumours, internal bleeding, and microscopic bone fractures that would be invisible to anyone else."}
              </p>
            </div>
          </div>
        </RadCard>
      </section>

      {/* ── Card 2: The Three Eyes of Medicine ──────────────────────── */}
      <section
        id="card-three-eyes"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <RadCard
          eyebrowEn="Card 02 · The Tools"
          eyebrowKh="កាត ០២ · ឧបករណ៍"
          icon={ScanLine}
          titleEn="The Three Eyes of Medicine"
          titleKh="ភ្នែកទាំងបីនៃវេជ្ជសាស្ត្រ"
          isKh={isKh}
        >
          <p
            className={`text-slate-300 text-sm mb-5 max-w-3xl ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "វេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រប្រើបច្ចេកវិទ្យាសំខាន់បីយ៉ាងដើម្បីថត និងគូរផែនទីរាងកាយមនុស្ស — នីមួយៗមានភាពខ្លាំង និងការប្រើប្រាស់ផ្ទាល់ខ្លួន។"
              : "Radiologists use three main technologies to look inside the body and map it out — each with its own strengths and its own perfect job."}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {/* X-Rays */}
            <ToolTile
              icon={Bone}
              colorClass="from-cyan-500/20 to-cyan-700/10 border-cyan-400/30"
              accentClass="text-cyan-300"
              tagEn="X-Rays"
              tagKh="កាំរស្មីអ៊ិច"
              titleEn="High-energy light, blocked by bone"
              titleKh="ពន្លឺថាមពលខ្ពស់ ដែលឆ្អឹងបិទ"
              bodyEn="X-rays use high-energy light that passes straight through soft skin but gets blocked by dense things like bone. That contrast is what makes them perfect for finding broken bones."
              bodyKh="កាំរស្មីអ៊ិចប្រើពន្លឺថាមពលខ្ពស់ដែលឆ្លងកាត់ស្បែកទន់ៗបាន ប៉ុន្តែត្រូវឆ្អឹងរឹងបិទយក។ ភាពផ្ទុយគ្នានេះធ្វើឲ្យវាល្អបំផុតសម្រាប់រកស្នាមឆ្អឹងបាក់។"
              isKh={isKh}
            />

            {/* Ultrasound */}
            <ToolTile
              icon={AudioWaveform}
              colorClass="from-sky-500/20 to-sky-700/10 border-sky-400/30"
              accentClass="text-sky-300"
              tagEn="Ultrasound"
              tagKh="អេកូសាស្ត្រ"
              titleEn="Sound waves that echo, like a bat"
              titleKh="រលកសំឡេងដែលឆ្លុះត្រឡប់ ដូចប្រចៀវ"
              bodyEn="Ultrasound sends high-frequency sound waves into the body and listens for the echoes that bounce back — the same trick a bat uses. It is safe enough for unborn babies and perfect for moving things, like a beating heart."
              bodyKh="អេកូសាស្ត្របញ្ជូនរលកសំឡេងប្រេកង់ខ្ពស់ចូលក្នុងរាងកាយ ហើយស្ដាប់ប្រតិសំឡេងដែលឆ្លុះត្រឡប់មកវិញ — ដូចគន្លឹះដែលប្រចៀវប្រើ។ វាសុវត្ថិភាពគ្រប់គ្រាន់សម្រាប់ទារកក្នុងផ្ទៃ និងល្អបំផុតសម្រាប់មើលអ្វីដែលផ្លាស់ទី ដូចជាបេះដូងដែលកំពុងលោត។"
              isKh={isKh}
            />

            {/* MRI / CT */}
            <ToolTile
              icon={Brain}
              colorClass="from-indigo-500/20 to-indigo-700/10 border-indigo-400/30"
              accentClass="text-indigo-300"
              tagEn="MRI & CT Scans"
              tagKh="ម៉ាស៊ីន MRI និង CT"
              titleEn="3D slice-by-slice models"
              titleKh="គំរូ ៣D មួយជាន់មួយជាន់"
              bodyEn="MRI uses powerful magnets and CT uses a spinning ring of X-rays — both take thousands of images and stitch them into a 3D, slice-by-slice model of an organ or the brain."
              bodyKh="ម៉ាស៊ីន MRI ប្រើមេដែកដ៏ខ្លាំង ហើយ CT ប្រើកង់កាំរស្មីអ៊ិចដែលវិល — ទាំងពីរថតរូបរាប់ពាន់សន្លឹក រួចភ្ជាប់ពួកវាបង្កើតជាគំរូបីវិមាត្រ មួយជាន់មួយជាន់ នៃសរីរាង្គ ឬខួរក្បាល។"
              isKh={isKh}
            />
          </div>
        </RadCard>
      </section>

      {/* ── Card 3: The Pathway & The Future ────────────────────────── */}
      <section
        id="card-pathway-future"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <RadCard
          eyebrowEn="Card 03 · The Path"
          eyebrowKh="កាត ០៣ · ផ្លូវ"
          icon={GraduationCap}
          titleEn="The Pathway & The Future"
          titleKh="ផ្លូវឆ្ពោះទៅមុខ និងអនាគត"
          isKh={isKh}
        >
          <div className="grid md:grid-cols-2 gap-5">
            {/* Training */}
            <div className="rad-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-cyan-300" />
                <h4
                  className={`text-cyan-200 font-bold text-sm uppercase tracking-widest ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {isKh ? "ការបណ្ដុះបណ្ដាល" : "The Training"}
                </h4>
              </div>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {isKh
                  ? "ដើម្បីក្លាយជាវេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រ — អ្នកត្រូវបញ្ចប់សាលាវេជ្ជសាស្ត្រជាមុនសិន រួចបន្ទាប់មកត្រូវបន្តកម្មសិក្សាឯកទេសជាច្រើនឆ្នាំទៀត គ្រាន់តែដើម្បីរៀន “អាន” រូបភាព។ វាជាការសិក្សាមួយជីវិត — ដោយសារតែបច្ចេកវិទ្យាមិនឈប់វិវឌ្ឍទេ។"
                  : "Becoming a radiologist requires medical school followed by several years of specialised residency just to learn how to “read” the images. It is a lifelong study — because the technology never stops evolving."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge color="cyan" labelEn="Med school" labelKh="សាលាវេជ្ជ" isKh={isKh} />
                <Badge color="sky" labelEn="Residency" labelKh="កម្មសិក្សា" isKh={isKh} />
                <Badge color="indigo" labelEn="Fellowships" labelKh="ឯកទេសរង" isKh={isKh} />
              </div>
            </div>

            {/* AI in Radiology */}
            <div className="rad-panel rad-panel-glow rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-cyan-300" />
                <h4
                  className={`text-cyan-200 font-bold text-sm uppercase tracking-widest ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {isKh ? "បញ្ញាសិប្បនិម្មិតក្នុងវិទ្យុសាស្ត្រ" : "AI in Radiology"}
                </h4>
                <Sparkles
                  className="w-3.5 h-3.5 text-cyan-300/70 ml-auto"
                  aria-hidden="true"
                />
              </div>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {isKh
                  ? "នេះគឺជាវិស័យដែលមានបច្ចេកវិទ្យាខ្ពស់បំផុតក្នុងវេជ្ជសាស្ត្រ។ សព្វថ្ងៃនេះ វេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រកំពុងប្រើប្រាស់បញ្ញាសិប្បនិម្មិត (AI) ដើម្បីជួយរកជំងឺមហារីកតូចៗ — តាំងពីដំបូងនៃការវិវឌ្ឍ — ដែលភ្នែកមនុស្សពុំអាចមើលឃើញទាន់។"
                  : "This is the most technologically advanced field in medicine. Today's radiologists are actively using Artificial Intelligence to help spot tiny cancers earlier than the human eye ever could — turning hours of careful study into seconds of safety net."}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-cyan-300/80">
                <Activity className="w-3.5 h-3.5" />
                <span className={isKh ? "font-khmer" : ""}>
                  {isKh
                    ? "មនុស្ស + ម៉ាស៊ីន — ល្អជាងមួយនៅឯកោ"
                    : "Human + Machine — better than either alone"}
                </span>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <p
            className={`mt-6 text-cyan-200/80 text-sm italic max-w-3xl ${
              isKh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {isKh
              ? "“រូបភាពនិមួយៗ និយាយប្រាប់រឿងមួយ — ការងាររបស់វេជ្ជបណ្ឌិតវិទ្យុសាស្ត្រគឺ ស្ដាប់ឲ្យឮ។”"
              : "“Every image tells a story — the radiologist's job is to listen.”"}
          </p>
        </RadCard>
      </section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center text-slate-500 text-xs">
        <Link
          href="/pathway-to-medicine"
          className={`inline-flex items-center gap-1.5 text-cyan-400/70 hover:text-cyan-300 ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isKh ? "ត្រឡប់ទៅផ្លូវវិជ្ជាជីវៈពេទ្យ" : "Back to Pathway to Medicine"}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks (scoped to this page)
// ════════════════════════════════════════════════════════════════════════════

function RadCard({
  eyebrowEn,
  eyebrowKh,
  icon: Icon,
  titleEn,
  titleKh,
  isKh,
  children,
}: {
  eyebrowEn: string;
  eyebrowKh: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="rad-card relative rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="rad-icon-chip">
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-xs font-bold tracking-widest uppercase text-cyan-300/80 ${
            isKh ? "font-khmer tracking-normal normal-case" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-white mb-5 ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function ToolTile({
  icon: Icon,
  colorClass,
  accentClass,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  isKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  accentClass: string;
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  isKh: boolean;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br ${colorClass} border rounded-xl p-5 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-6 h-6 ${accentClass}`} />
        <span
          className={`font-bold text-sm ${accentClass} ${isKh ? "font-khmer" : ""}`}
        >
          {isKh ? tagKh : tagEn}
        </span>
      </div>
      <h4
        className={`text-white font-semibold text-sm mb-2 ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h4>
      <p
        className={`text-slate-300 text-xs ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function Badge({
  color,
  labelEn,
  labelKh,
  isKh,
}: {
  color: "cyan" | "sky" | "indigo";
  labelEn: string;
  labelKh: string;
  isKh: boolean;
}) {
  const styles = {
    cyan: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30",
    sky: "bg-sky-500/15 text-sky-200 border-sky-400/30",
    indigo: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
  }[color];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${styles} ${
        isKh ? "font-khmer" : ""
      }`}
    >
      {isKh ? labelKh : labelEn}
    </span>
  );
}

function XRayBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #0b1424 0%, #050811 50%, #02040a 100%)",
        }}
      />
      {/* X-ray glow blooms */}
      <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="absolute top-[35%] -right-16 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-indigo-500/10 blur-[100px]" />
      {/* Faint scan-line grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(125,211,252,0.6) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .rad-text-glow {
        color: #67e8f9;
        text-shadow: 0 0 24px rgba(34, 211, 238, 0.45), 0 0 60px rgba(34, 211, 238, 0.18);
      }
      .rad-card {
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(2, 6, 23, 0.78) 100%);
        border: 1px solid rgba(34, 211, 238, 0.18);
        box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(2,6,23,0.5), 0 30px 60px -30px rgba(34, 211, 238, 0.18);
        backdrop-filter: blur(8px);
      }
      .rad-panel {
        background: rgba(2, 6, 23, 0.55);
        border: 1px solid rgba(125, 211, 252, 0.18);
      }
      .rad-panel-glow {
        box-shadow: 0 0 40px -10px rgba(34, 211, 238, 0.35), 0 0 0 1px rgba(34, 211, 238, 0.18) inset;
      }
      .rad-icon-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px; height: 36px;
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.18), rgba(99, 102, 241, 0.12));
        border: 1px solid rgba(34, 211, 238, 0.35);
        color: #a5f3fc;
        box-shadow: 0 0 16px rgba(34, 211, 238, 0.25);
      }
      @keyframes radPulse {
        0%, 100% { opacity: 0.55; transform: translateY(0); }
        50%      { opacity: 1;    transform: translateY(-3px); }
      }
      .rad-pulse {
        animation: radPulse 3.4s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .rad-pulse { animation: none; }
      }
    `}</style>
  );
}
