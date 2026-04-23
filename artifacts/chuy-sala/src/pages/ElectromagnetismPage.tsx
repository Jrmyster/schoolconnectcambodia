import { Link } from "wouter";
import {
  ArrowLeft,
  Zap,
  Magnet,
  BookOpen,
  Lightbulb,
  Quote,
  Cog,
  Plug,
  HeartPulse,
  Sparkles,
  Info,
  CircleDot,
  Sigma,
  Atom,
  Compass,
  Waves,
  Radio,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-XX · Electromagnetism: The Power of Fields
//           អគ្គិសនីម៉ាញ៉េទិច៖ ថាមពលនៃដែន
//
//  1. Michael Faraday — The Father of Induction
//  2. James Clerk Maxwell — The Mathematical Map (4 equations)
//  3. Transformers — Taming the Power (with KaTeX V_p/V_s = N_p/N_s)
//  4. Gauss's Law — The Invisible Net (with KaTeX)
//  5. Applications: Motors, Transformers, MRI
//
//  Aesthetic: Scientific Lab — clean off-white, slate text,
//  indigo+amber accents, blueprint grid, vector field diagrams.
// ════════════════════════════════════════════════════════════════════════════

export default function ElectromagnetismPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-b-4 border-amber-500/60">
        <LabGrid />
        {/* Faint field-line glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(ellipse 60% 80% at 20% 50%, rgba(245,158,11,0.25), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-amber-400/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Zap className="w-3.5 h-3.5" />
            SCIENCE · Electromagnetism
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh
              ? "អគ្គិសនីម៉ាញ៉េទិច៖ ថាមពលនៃដែន"
              : <>Electromagnetism — <span className="text-amber-400">The Power of Fields</span></>}
          </h1>
          <p className={`mt-4 max-w-2xl text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "សញ្ញាមេដែក និងសញ្ញាអគ្គិសនី គឺមិនមែនជាពីររឿងផ្សេងគ្នាទេ — ពួកវាគឺជាមុខពីរនៃកម្លាំងតែមួយ។ ដែនអរូបិយនេះ បំភ្លឺផ្ទះរបស់អ្នក បង្វិលឡានរបស់អ្នក ហើយលាតដូចគេមើលឃើញខាងក្នុងខ្លួនមនុស្ស។"
              : "Magnets and electricity are not two different things — they are two faces of one force. The invisible field they share lights your home, spins your car, and lets us peek inside the human body."}
          </p>
        </div>
      </header>

      {/* ── Section 1: Faraday ────────────────────────────────────────── */}
      <Section
        spec="01"
        Icon={BookOpen}
        eyebrowEn="Michael Faraday — The Father of Induction"
        eyebrowKh="ម៉ៃឃើល ហ្វារ៉ាដេយ — បិតានៃការបណ្ដាល"
        titleEn="A bookbinder's apprentice who turned motion into light"
        titleKh="សិស្សហ្វឹកហាត់រៀបសៀវភៅ ដែលប្ដូរចលនាឱ្យទៅជាពន្លឺ"
        descEn="Faraday left school at 13 and learned physics by reading every book that crossed his bookbinding bench. With almost no math, he ran the experiment that powers our entire civilization."
        descKh="ហ្វារ៉ាដេយចេញពីសាលានៅអាយុ ១៣ ឆ្នាំ ហើយរៀនរូបវិទ្យាដោយអានរាល់សៀវភៅដែលឆ្លងកាត់តុរៀបសៀវភៅរបស់គាត់។ ស្ទើរតែគ្មានគណិតវិទ្យាសោះ គាត់បានធ្វើពិសោធន៍ដែលផ្តល់ថាមពលដល់អរិយធម៌ទាំងមូលរបស់យើង។"
        isKh={isKh}
      >
        <FaradayProfile isKh={isKh} />
        <InductionDiagram isKh={isKh} />
        <BilingualQuote isKh={isKh} />
      </Section>

      {/* ── Section 2: Maxwell's Equations ─────────────────────────────── */}
      <Section
        spec="02"
        Icon={Sigma}
        eyebrowEn="James Clerk Maxwell — The Mathematical Map"
        eyebrowKh="ជេមស៍ ក្លឺក ម៉ាក់ស្វែល — ផែនទីគណិតវិទ្យា"
        titleEn="Four equations that translated Faraday's experiments into pure mathematics"
        titleKh="សមីការទាំងបួន ដែលប្តូរពិសោធន៍របស់ហ្វារ៉ាដេយឱ្យទៅជាគណិតវិទ្យាសុទ្ធ"
        descEn="Faraday discovered how magnets and electricity interact in the real world, but he didn't know the math. Maxwell translated Faraday's physical experiments into four elegant mathematical equations. These four rules govern everything from the lightbulb in your house to the Wi-Fi on your phone."
        descKh="ហ្វារ៉ាដេយរកឃើញពីរបៀបដែលមេដែក និងអគ្គិសនី ប្រាស្រ័យទាក់ទងគ្នាក្នុងពិភពពិត ប៉ុន្តែគាត់មិនស្គាល់គណិតវិទ្យានៃវាទេ។ ម៉ាក់ស្វែលបានបកប្រែពិសោធន៍រូបវន្តរបស់ហ្វារ៉ាដេយ ឱ្យទៅជាសមីការគណិតវិទ្យាដ៏ស្រស់ស្អាតចំនួនបួន។ ច្បាប់ទាំងបួននេះ គ្រប់គ្រងគ្រប់យ៉ាង ពីអំពូលភ្លើងនៅក្នុងផ្ទះរបស់អ្នក ដល់ Wi-Fi លើទូរស័ព្ទរបស់អ្នក។"
        isKh={isKh}
      >
        <MaxwellEquationsGrid isKh={isKh} />
      </Section>

      {/* ── Section 3: Transformers ───────────────────────────────────── */}
      <Section
        spec="03"
        Icon={Plug}
        eyebrowEn="Transformers — Taming the Power"
        eyebrowKh="ត្រង់ស្វ័រមឺរ — ការគ្រប់គ្រងថាមពល"
        titleEn="How the humming gray box on a power pole keeps your electronics alive"
        titleKh="តើប្រអប់ប្រផេះរោទ៍លើបង្គោលភ្លើង រក្សាជីវិតឧបករណ៍អេឡិចត្រូនិករបស់អ្នកយ៉ាងម៉េច"
        descEn="Power plants push electricity at incredibly high pressures (voltage) so it can travel across the country without losing energy. But if that raw power hit your house, it would melt your electronics. We use Faraday's Law to safely 'step down' that pressure before it enters your home."
        descKh="រោងចក្រផលិតថាមពលរុញអគ្គិសនីក្រោមសម្ពាធ (តង់ស្យុង) ខ្ពស់មិនគួរឱ្យជឿ ដើម្បីឱ្យវាអាចធ្វើដំណើរឆ្លងកាត់ប្រទេសដោយមិនបាត់បង់ថាមពល។ ប៉ុន្តែប្រសិនបើថាមពលឆៅនោះវាយចូលផ្ទះរបស់អ្នកដោយផ្ទាល់ វានឹងធ្វើឱ្យឧបករណ៍អេឡិចត្រូនិករបស់អ្នករលាយ។ យើងប្រើច្បាប់របស់ហ្វារ៉ាដេយ ដើម្បី 'បន្ថយ' សម្ពាធនោះដោយសុវត្ថិភាព មុនពេលវាចូលក្នុងផ្ទះរបស់អ្នក។"
        isKh={isKh}
      >
        <TransformersSection isKh={isKh} />
      </Section>

      {/* ── Section 4: Gauss's Law ────────────────────────────────────── */}
      <Section
        spec="04"
        Icon={CircleDot}
        eyebrowEn="Gauss's Law — The Invisible Net"
        eyebrowKh="ច្បាប់ហ្គោស — សំណាញ់អរូបិយ"
        titleEn="Counting the field lines that flow out of a charge"
        titleKh="ការរាប់ខ្សែដែនដែលហូរចេញពីបន្ទុក"
        descEn="If you could throw a fishing net around an electric charge and count the invisible 'water' flowing out through the mesh, you would know exactly how strong the charge is. That is Gauss's Law in one sentence."
        descKh="ប្រសិនបើអ្នកអាចបោះសំណាញ់ត្រីពទ្ធជុំវិញបន្ទុកអគ្គិសនីមួយ ហើយរាប់ 'ទឹក' អរូបិយដែលហូរចេញតាមភ្នែកសំណាញ់ អ្នកនឹងដឹងច្បាស់ថាបន្ទុកនោះខ្លាំងប៉ុនណា។ នេះហើយគឺច្បាប់ហ្គោសក្នុងប្រយោគមួយ។"
        isKh={isKh}
      >
        <GaussNet isKh={isKh} />
        <GaussFormula isKh={isKh} />
      </Section>

      {/* ── Section 5: Applications ───────────────────────────────────── */}
      <Section
        spec="05"
        Icon={Cog}
        eyebrowEn="Applications"
        eyebrowKh="ការអនុវត្តជាក់ស្តែង"
        titleEn="From a coil of wire to your daily life"
        titleKh="ពីរង្វិលខ្សែភ្លើង ទៅជីវភាពប្រចាំថ្ងៃ"
        descEn="Once we understood that electricity and magnetism could swap into each other, we started building machines that exploit the trade in every direction."
        descKh="នៅពេលយើងយល់ថាអគ្គិសនី និងម៉ាញ៉េទិច អាចបំលែងគ្នាទៅវិញទៅមកបាន យើងចាប់ផ្ដើមសាងសង់ម៉ាស៊ីនដែលប្រើប្រាស់ការផ្លាស់ប្តូរនោះគ្រប់ទិសដៅ។"
        isKh={isKh}
      >
        <ApplicationsGrid isKh={isKh} />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, Icon, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  Icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-indigo-950 text-amber-300 rounded-sm px-2.5 py-0.5 border border-amber-500/40">
          SEC-{spec}
        </span>
        <Icon className="w-5 h-5 text-indigo-700" />
        <span className={`text-xs font-bold uppercase tracking-widest text-indigo-900 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
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

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Maxwell's Four Equations (2x2 grid of equation cards)
// ════════════════════════════════════════════════════════════════════════════

type MaxwellCard = {
  num: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: "amber" | "indigo" | "emerald" | "rose";
  nameEn: string;
  nameKh: string;
  math: string;
  conceptEn: string;
  conceptKh: string;
  plainEn: string;
  plainKh: string;
};

const MAXWELL_EQUATIONS: MaxwellCard[] = [
  {
    num: "I",
    Icon: Atom,
    accent: "amber",
    nameEn: "Gauss's Law for Electricity",
    nameKh: "ច្បាប់ហ្គោសសម្រាប់អគ្គិសនី",
    math: String.raw`\nabla \cdot \mathbf{E} = \dfrac{\rho}{\varepsilon_0}`,
    conceptEn:
      "Charges create electric fields. A single electron sits like a spider in a web, pushing or pulling every other charge around it.",
    conceptKh:
      "បន្ទុកបង្កើតដែនអគ្គិសនី។ អេឡិចត្រុងតែមួយ អង្គុយដូចពីងពាងនៅក្នុងសំណាញ់ ដោយរុញ ឬទាញរាល់បន្ទុកដទៃនៅជុំវិញ។",
    plainEn: "Charges → electric fields",
    plainKh: "បន្ទុក → ដែនអគ្គិសនី",
  },
  {
    num: "II",
    Icon: Magnet,
    accent: "indigo",
    nameEn: "Gauss's Law for Magnetism",
    nameKh: "ច្បាប់ហ្គោសសម្រាប់ម៉ាញេទិច",
    math: String.raw`\nabla \cdot \mathbf{B} = 0`,
    conceptEn:
      "You cannot isolate a magnetic pole. Snap a magnet in half and you do not get a lonely North and a lonely South — you get two smaller magnets, each with its own North and South.",
    conceptKh:
      "អ្នកមិនអាចបំបែកប៉ូលម៉ាញេទិចតែមួយដាច់ដោយឡែកបានទេ។ ប្រសិនបើអ្នកកាត់មេដែកជាពីរ អ្នកនឹងមិនទទួលបានប៉ូលខាងជើង និងប៉ូលខាងត្បូងដាច់ៗគ្នាទេ — អ្នកនឹងទទួលបានមេដែកតូចពីរ ដែលនីមួយៗមានប៉ូលខាងជើង និងប៉ូលខាងត្បូងផ្ទាល់ខ្លួន។",
    plainEn: "No isolated magnetic pole exists",
    plainKh: "គ្មានប៉ូលម៉ាញេទិចឯកោឡើយ",
  },
  {
    num: "III",
    Icon: Waves,
    accent: "emerald",
    nameEn: "Faraday's Law of Induction",
    nameKh: "ច្បាប់ហ្វារ៉ាដេយនៃអាំងឌុចស្យុង",
    math: String.raw`\nabla \times \mathbf{E} = -\dfrac{\partial \mathbf{B}}{\partial t}`,
    conceptEn:
      "A changing magnetic field creates an electric field. This is the math that proves spinning a magnet inside a coil of wire creates electricity — the rule behind every power plant on Earth.",
    conceptKh:
      "ដែនម៉ាញេទិចដែលផ្លាស់ប្តូរ បង្កើតដែនអគ្គិសនី។ នេះគឺគណិតវិទ្យាដែលបញ្ជាក់ថា ការបង្វិលមេដែកនៅខាងក្នុងកង់ខ្សែភ្លើង បង្កើតអគ្គិសនី — ជាច្បាប់នៅពីក្រោយរោងចក្រផលិតថាមពលគ្រប់ទីកន្លែងលើផែនដី។",
    plainEn: "Changing magnetic field → electric field",
    plainKh: "ដែនម៉ាញេទិចផ្លាស់ប្តូរ → ដែនអគ្គិសនី",
  },
  {
    num: "IV",
    Icon: Radio,
    accent: "rose",
    nameEn: "Ampère–Maxwell Law",
    nameKh: "ច្បាប់អំពែរ-ម៉ាក់ស្វែល",
    math: String.raw`\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0\,\dfrac{\partial \mathbf{E}}{\partial t}`,
    conceptEn:
      "A flowing electric current — OR a changing electric field — creates a magnetic field. This is exactly how electromagnets work, and the second half of the equation is what gave us radio waves, light, and Wi-Fi.",
    conceptKh:
      "ចរន្តអគ្គិសនីដែលហូរ — ឬដែនអគ្គិសនីដែលផ្លាស់ប្តូរ — បង្កើតដែនម៉ាញេទិច។ នេះគឺពិតជាវិធីដែលអេឡិចត្រូម៉ាញេទិចដំណើរការ ហើយផ្នែកទីពីរនៃសមីការ គឺជាអ្វីដែលផ្តល់ឱ្យយើងនូវរលកវិទ្យុ ពន្លឺ និង Wi-Fi។",
    plainEn: "Current OR changing E → magnetic field",
    plainKh: "ចរន្ត ឬ E ផ្លាស់ប្តូរ → ដែនម៉ាញេទិច",
  },
];

const MAXWELL_TONES: Record<
  MaxwellCard["accent"],
  { ring: string; text: string; chip: string; glow: string; numBg: string }
> = {
  amber: {
    ring: "ring-amber-400/30",
    text: "text-amber-300",
    chip: "bg-amber-500/15 text-amber-200 border-amber-400/40",
    glow: "shadow-[0_0_40px_rgba(245,158,11,0.10)]",
    numBg: "bg-amber-500/20 text-amber-200 ring-amber-400/40",
  },
  indigo: {
    ring: "ring-indigo-400/30",
    text: "text-indigo-300",
    chip: "bg-indigo-500/15 text-indigo-200 border-indigo-400/40",
    glow: "shadow-[0_0_40px_rgba(99,102,241,0.12)]",
    numBg: "bg-indigo-500/20 text-indigo-200 ring-indigo-400/40",
  },
  emerald: {
    ring: "ring-emerald-400/30",
    text: "text-emerald-300",
    chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.10)]",
    numBg: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/40",
  },
  rose: {
    ring: "ring-rose-400/30",
    text: "text-rose-300",
    chip: "bg-rose-500/15 text-rose-200 border-rose-400/40",
    glow: "shadow-[0_0_40px_rgba(244,63,94,0.10)]",
    numBg: "bg-rose-500/20 text-rose-200 ring-rose-400/40",
  },
};

function MaxwellEquationsGrid({ isKh }: { isKh: boolean }) {
  return (
    <div>
      {/* Maxwell portrait card */}
      <div className="rounded-2xl border-2 border-indigo-400/40 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 mb-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 90% 50%, rgba(245,158,11,0.18), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/20 ring-1 ring-amber-400/50 flex items-center justify-center">
            <Compass className="w-6 h-6 text-amber-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 mb-1 ${
                isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {isKh ? "ស្កុតឡែន · ១៨៦៥" : "Scotland · 1865"}
            </div>
            <h3
              className={`font-display font-bold text-lg sm:text-xl text-white mb-1 ${
                isKh ? "font-khmer leading-snug" : ""
              }`}
            >
              {isKh ? "ជេមស៍ ក្លឺក ម៉ាក់ស្វែល" : "James Clerk Maxwell"}
            </h3>
            <p
              className={`text-sm text-slate-300 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ហ្វារ៉ាដេយ ផ្តល់ការសង្កេត។ ម៉ាក់ស្វែល ផ្តល់សមីការ។ បួនបន្ទាត់ខាងក្រោម ពន្យល់ពីការងាររបស់រាល់ឧបករណ៍អគ្គិសនី និងសញ្ញាគ្មានខ្សែមួយ ដែលអ្នកប៉ះពាល់នៅថ្ងៃនេះ។"
                : "Faraday gave us the experiments. Maxwell gave us the equations. The four lines below explain every electrical device and every wireless signal you will touch today."}
            </p>
          </div>
        </div>
      </div>

      {/* 2x2 grid of equation cards */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {MAXWELL_EQUATIONS.map((eq) => (
          <MaxwellCardView key={eq.num} eq={eq} isKh={isKh} />
        ))}
      </div>

      {/* Synthesis footer */}
      <div className="mt-5 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <p
            className={`text-sm sm:text-base text-slate-200 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                ផ្គុំទាំងបួនរួមគ្នា ហើយអ្នកនឹងទទួលបាន{" "}
                <span className="text-amber-300 font-semibold">
                  រលកអេឡិចត្រូម៉ាញេទិច
                </span>{" "}
                — ដែនអគ្គិសនី និងម៉ាញេទិច ដែលបង្កើតគ្នាទៅវិញទៅមកអស់កល្បជានិច្ច ហោះកាត់លំហដោយល្បឿន{" "}
                <InlineMath math="c" /> ។ នោះគឺពន្លឺ វិទ្យុ មីក្រូវ៉េវ និង Wi-Fi ទាំងអស់។
              </>
            ) : (
              <>
                Combine all four and you discover{" "}
                <span className="text-amber-300 font-semibold">
                  electromagnetic waves
                </span>{" "}
                — electric and magnetic fields creating each other forever, flying
                through space at the speed{" "}
                <InlineMath math="c" />. That is light, radio, microwaves, and
                every Wi-Fi signal in the world.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function MaxwellCardView({ eq, isKh }: { eq: MaxwellCard; isKh: boolean }) {
  const T = MAXWELL_TONES[eq.accent];
  const { Icon } = eq;
  return (
    <article
      className={`relative rounded-2xl border-2 border-slate-700/70 ring-1 ${T.ring} bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-5 ${T.glow} flex flex-col`}
    >
      {/* Header row: Roman numeral + icon + name */}
      <header className="flex items-start gap-3 mb-3">
        <span
          className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg font-mono font-bold text-base ring-1 ${T.numBg}`}
          aria-hidden
        >
          {eq.num}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Icon className={`w-4 h-4 ${T.text}`} />
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.2em] ${T.text} ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {isKh ? "សមីការ" : "Equation"} {eq.num}
            </span>
          </div>
          <h4
            className={`font-display font-bold text-white text-base sm:text-lg leading-snug ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh ? eq.nameKh : eq.nameEn}
          </h4>
        </div>
      </header>

      {/* The equation — centered, prominent, dark-card friendly */}
      <div
        className="rounded-xl bg-slate-950/80 border border-slate-700/60 ring-1 ring-white/5 px-4 py-5 my-2 text-white text-center text-lg sm:text-xl overflow-x-auto"
        aria-label={`${eq.nameEn} equation`}
      >
        <BlockMath math={eq.math} />
      </div>

      {/* Plain-language summary chip */}
      <div className={`mt-2 inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono border ${T.chip}`}>
        <span className={isKh ? "font-khmer" : ""}>{isKh ? eq.plainKh : eq.plainEn}</span>
      </div>

      {/* Concept */}
      <p
        className={`mt-3 text-sm text-slate-200 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? eq.conceptKh : eq.conceptEn}
      </p>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Transformers — The Magic of the Gap + Step-Down Math
// ════════════════════════════════════════════════════════════════════════════

function TransformersSection({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
      {/* ── Card 1: The Magic of the Gap ──────────────────────────── */}
      <article className="rounded-2xl border-2 border-slate-700/70 ring-1 ring-amber-400/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 shadow-[0_0_40px_rgba(245,158,11,0.10)] flex flex-col">
        <header className="flex items-start gap-3 mb-3">
          <span
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg font-mono font-bold text-base ring-1 bg-amber-500/20 text-amber-200 ring-amber-400/40"
            aria-hidden
          >
            1
          </span>
          <div className="flex-1 min-w-0">
            <div
              className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 mb-0.5 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              <Magnet className="w-3.5 h-3.5" />
              {isKh ? "មន្តអាគមនៃគម្លាត" : "The Magic of the Gap"}
            </div>
            <h3
              className={`font-display font-bold text-white text-base sm:text-lg leading-snug ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh
                ? "ខ្សែភ្លើងពីរ ដែលមិនប៉ះគ្នាសោះ"
                : "Two wires that never touch each other"}
            </h3>
          </div>
        </header>

        <p
          className={`text-sm text-slate-200 mb-4 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "នៅខាងក្នុងប្រអប់រោទ៍លើបង្គោលភ្លើង មានរបុំខ្សែភ្លើងដាច់ពីគ្នាពីរ រុំជុំវិញចិញ្ចៀនដែក។ មួយយកថាមពលចូល មួយទៀតបញ្ចេញថាមពលចេញទៅផ្ទះរបស់អ្នក។"
            : "Inside the humming boxes on power poles, there are two separate coils of wire wrapped around the same iron ring. One coil takes power in; the other sends power out toward your house."}
        </p>

        {/* Mini transformer diagram (SVG) */}
        <div className="rounded-xl bg-slate-950/80 border border-slate-700/60 ring-1 ring-white/5 p-4 mb-4 not-prose">
          <svg
            viewBox="0 0 360 160"
            className="w-full h-auto"
            role="img"
            aria-label={
              isKh
                ? "ដ្យាក្រាមត្រង់ស្វ័រមឺរ៖ របុំបឋម ខ្នូរដែក និងរបុំទុតិយ"
                : "Transformer diagram: primary coil, iron core, and secondary coil"
            }
          >
            {/* Iron core (gray rectangle frame) */}
            <rect
              x="120" y="30" width="120" height="100"
              fill="none" stroke="#94a3b8" strokeWidth="6" rx="4"
            />
            <text
              x="180" y="80" textAnchor="middle"
              fontFamily={isKh ? "sans-serif" : "monospace"} fontSize={isKh ? 10 : 9}
              fill="#94a3b8" letterSpacing={isKh ? 0 : 2}
            >
              {isKh ? "ខ្នូរដែក" : "IRON CORE"}
            </text>

            {/* Primary coil (left, amber) — 5 loops */}
            {[40, 60, 80, 100, 120].map((x, i) => (
              <ellipse
                key={`p-${i}`}
                cx={x} cy="80" rx="14" ry="40"
                fill="none" stroke="#f59e0b" strokeWidth="2.5"
              />
            ))}
            {/* Secondary coil (right, indigo) — 3 loops (fewer = step down) */}
            {[240, 270, 300].map((x, i) => (
              <ellipse
                key={`s-${i}`}
                cx={x} cy="80" rx="14" ry="40"
                fill="none" stroke="#a5b4fc" strokeWidth="2.5"
              />
            ))}

            {/* Labels */}
            <text x="80" y="20" textAnchor="middle" fontFamily={isKh ? "sans-serif" : "monospace"} fontSize="10" fill="#fbbf24">
              {isKh ? "បឋម (Vp)" : "PRIMARY (Vp)"}
            </text>
            <text x="80" y="150" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#fcd34d">
              {isKh ? "តង់ស្យុងខ្ពស់ចូល" : "high voltage in"}
            </text>
            <text x="270" y="20" textAnchor="middle" fontFamily={isKh ? "sans-serif" : "monospace"} fontSize="10" fill="#a5b4fc">
              {isKh ? "ទុតិយ (Vs)" : "SECONDARY (Vs)"}
            </text>
            <text x="270" y="150" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#c7d2fe">
              {isKh ? "តង់ស្យុងទាបចេញ" : "low voltage out"}
            </text>

            {/* Magnetic field arrow through core */}
            <line
              x1="140" y1="80" x2="220" y2="80"
              stroke="#f1f5f9" strokeWidth="1.5"
              strokeDasharray="4 4" markerEnd="url(#arr)"
            />
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f1f5f9" />
              </marker>
            </defs>
            <text x="180" y="72" textAnchor="middle" fontFamily={isKh ? "sans-serif" : "monospace"} fontSize="9" fill="#f1f5f9">
              {isKh ? "ដែន B" : "B-field"}
            </text>
          </svg>
        </div>

        <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 mt-auto">
          <div
            className={`flex items-start gap-2 text-sm text-amber-100 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p>
              <span className="font-bold text-amber-200">
                {isKh ? "ចំណុចសំខាន់៖ " : "Crucial point: "}
              </span>
              {isKh
                ? "ខ្សែទាំងពីរ មិនដែលប៉ះគ្នាឡើយ។ ខ្សែទីមួយ (បឋម) បង្កើតដែនម៉ាញេទិចប្រែប្រួលក្នុងដែក។ ខ្សែទីពីរ (ទុតិយ) 'អារម្មណ៍' ដែនម៉ាញេទិចនោះ ហើយប្រែវាឡើងវិញទៅជាអគ្គិសនី — ច្បាប់របស់ហ្វារ៉ាដេយដោយផ្ទាល់!"
                : "The two wires never touch. The first wire (Primary) creates a fluctuating magnetic field in the iron. The second wire (Secondary) 'feels' that magnetic field and turns it back into electricity — Faraday's Law in action!"}
            </p>
          </div>
        </div>
      </article>

      {/* ── Card 2: The Math of Coils ─────────────────────────────── */}
      <article className="rounded-2xl border-2 border-slate-700/70 ring-1 ring-indigo-400/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 shadow-[0_0_40px_rgba(99,102,241,0.12)] flex flex-col">
        <header className="flex items-start gap-3 mb-3">
          <span
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg font-mono font-bold text-base ring-1 bg-indigo-500/20 text-indigo-200 ring-indigo-400/40"
            aria-hidden
          >
            2
          </span>
          <div className="flex-1 min-w-0">
            <div
              className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300 mb-0.5 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              <Sigma className="w-3.5 h-3.5" />
              {isKh ? "គណិតវិទ្យានៃរបុំខ្សែភ្លើង" : "The Math of Coils"}
            </div>
            <h3
              className={`font-display font-bold text-white text-base sm:text-lg leading-snug ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {isKh ? "ការ 'បន្ថយ' តង់ស្យុង" : "The 'step-down' ratio"}
            </h3>
          </div>
        </header>

        <p
          className={`text-sm text-slate-200 mb-4 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "តង់ស្យុងធ្លាក់ចុះ ឬឡើង អាស្រ័យលើចំនួនដងដែលខ្សែភ្លើងត្រូវបានរុំជុំវិញខ្នូរដែក។ ប្រសិនបើរបុំទីពីរ (ទុតិយ) មានចំនួនរបុំតិចជាងទីមួយ (បឋម) — តង់ស្យុងធ្លាក់ចុះ!"
            : "The voltage drops (or rises) based on the number of times the wire is wrapped around the iron core. If the second coil (Secondary) has fewer wraps than the first (Primary) — the voltage drops!"}
        </p>

        {/* The Transformer Equation — center stage */}
        <div
          className="rounded-xl bg-slate-950/80 border border-slate-700/60 ring-1 ring-indigo-400/20 px-4 py-5 my-1 text-white text-center text-lg sm:text-2xl overflow-x-auto"
          aria-label="Transformer equation"
        >
          <BlockMath math={String.raw`\dfrac{V_p}{V_s} \;=\; \dfrac{N_p}{N_s}`} />
        </div>

        {/* Symbol legend */}
        <ul
          className={`mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300 ${
            isKh ? "font-khmer text-[13px] leading-loose" : ""
          }`}
        >
          <li className="flex items-baseline gap-2">
            <span className="text-indigo-300"><InlineMath math="V_p" /></span>
            <span>{isKh ? "តង់ស្យុងបឋម (ចូល)" : "Primary voltage (in)"}</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-indigo-300"><InlineMath math="V_s" /></span>
            <span>{isKh ? "តង់ស្យុងទុតិយ (ចេញ)" : "Secondary voltage (out)"}</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-indigo-300"><InlineMath math="N_p" /></span>
            <span>{isKh ? "ចំនួនរបុំខ្សែបឋម" : "Number of primary coils"}</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-indigo-300"><InlineMath math="N_s" /></span>
            <span>{isKh ? "ចំនួនរបុំខ្សែទុតិយ" : "Number of secondary coils"}</span>
          </li>
        </ul>

        {/* Worked example chip */}
        <div className="mt-4 rounded-lg border border-indigo-400/40 bg-indigo-500/10 p-3 mt-auto">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300 mb-1 ${
              isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
            }`}
          >
            {isKh ? "ឧទាហរណ៍" : "Worked example"}
          </div>
          <p
            className={`text-sm text-indigo-100 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                ខ្សែខ្ពស់តង់ស្យុងនាំ <span className="font-mono">22 000 V</span> ចូលប្រអប់ដែលមានរបុំ{" "}
                <InlineMath math="N_p = 100" /> រួម។ ប្រសិនបើ <InlineMath math="N_s = 1" />, ផ្ទះរបស់អ្នកនឹងទទួល
                <span className="font-mono"> 220 V</span> — សុវត្ថិភាពសម្រាប់ដោតភ្លើង។
              </>
            ) : (
              <>
                A high-tension line carries{" "}
                <span className="font-mono">22,000&nbsp;V</span> into a box with{" "}
                <InlineMath math="N_p = 100" /> primary loops. With{" "}
                <InlineMath math="N_s = 1" /> secondary loop, your house receives{" "}
                <span className="font-mono">220&nbsp;V</span> — safe enough to plug into a lamp.
              </>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Faraday Profile + Induction Diagram + Quote
// ════════════════════════════════════════════════════════════════════════════

function FaradayProfile({ isKh }: { isKh: boolean }) {
  const facts = [
    {
      labelEn: "Born", labelKh: "ឆ្នាំកំណើត",
      valueEn: "1791, London", valueKh: "១៧៩១ ទីក្រុងឡុងដ៍",
    },
    {
      labelEn: "School", labelKh: "ការសិក្សា",
      valueEn: "Self-taught from age 13", valueKh: "រៀនដោយខ្លួនឯងពីអាយុ ១៣",
    },
    {
      labelEn: "Big idea", labelKh: "គំនិតធំ",
      valueEn: "Electromagnetic Induction (1831)",
      valueKh: "ការបណ្ដាលអគ្គិសនីម៉ាញ៉េទិច (១៨៣១)",
    },
    {
      labelEn: "Math used", labelKh: "គណិតវិទ្យាប្រើ",
      valueEn: "Almost none — pure intuition",
      valueKh: "ស្ទើរតែគ្មាន — វិចារណញ្ញាណសុទ្ធ",
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Portrait card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-amber-400/15 border-2 border-amber-400/60 flex items-center justify-center mb-3">
            <span className="font-display font-extrabold text-amber-300 text-3xl tracking-tight">MF</span>
          </div>
          <h3 className={`font-display font-bold text-xl ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ៃឃើល ហ្វារ៉ាដេយ" : "Michael Faraday"}
          </h3>
          <div className={`text-xs text-slate-300 mt-1 ${isKh ? "font-sans" : "font-khmer"}`}>
            {isKh ? "Michael Faraday" : "ម៉ៃឃើល ហ្វារ៉ាដេយ"}
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300 mt-3">
            1791 — 1867
          </div>
          <div className={`mt-4 text-[11px] px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ស្វ័យអប់រំ" : "Self-taught"}
          </div>
        </div>

        {/* Body */}
        <div className="md:col-span-2 p-6">
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ហ្វារ៉ាដេយបានលុបចោលរវាងពិភពមេដែក និងពិភពអគ្គិសនី។ មុនគាត់ វិទ្យាសាស្ត្រមើលឃើញវាជាពីររឿងផ្សេងគ្នា — បន្ទាប់ពីគាត់ យើងដឹងថាវាគ្រាន់តែជាមុខពីរនៃកម្លាំងតែមួយ។ ការរកឃើញរបស់គាត់ ក្នុងឆ្នាំ ១៨៣១ ហៅថា ការបណ្ដាលអគ្គិសនីម៉ាញ៉េទិច (Electromagnetic Induction)។"
              : "Faraday erased the wall between the world of magnets and the world of electricity. Before him, science treated them as two unrelated things — after him, we knew they were just two faces of one force. His 1831 discovery is called Electromagnetic Induction."}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {facts.map((f) => (
              <div key={f.labelEn} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                <dt className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? f.labelKh : f.labelEn}
                </dt>
                <dd className={`text-slate-800 font-semibold mt-0.5 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? f.valueKh : f.valueEn}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function InductionDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex items-start gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`font-display font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ការពិសោធន៍ដ៏សាមញ្ញដែលបានផ្លាស់ប្តូរពិភពលោក" : "The simple experiment that changed the world"}
          </div>
          <div className={`text-xs text-slate-500 ${isKh ? "font-sans" : "font-khmer"}`}>
            {isKh ? "The simple experiment that changed the world" : "ការពិសោធន៍ដ៏សាមញ្ញដែលបានផ្លាស់ប្តូរពិភពលោក"}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-950 p-4 sm:p-6">
        <svg viewBox="0 0 600 240" className="w-full h-auto" aria-hidden>
          <defs>
            <linearGradient id="magGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#dc2626" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <marker id="arrEM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Coil — drawn as overlapping ellipses to look like a solenoid */}
          <g transform="translate(360,120)">
            {[-60, -40, -20, 0, 20, 40, 60].map((x) => (
              <ellipse key={x} cx={x} cy="0" rx="14" ry="44" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            ))}
            {/* Wire to bulb */}
            <path d="M 70 -30 L 130 -30 L 130 -70" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 70 30 L 100 30 L 100 -70" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            {/* Bulb */}
            <circle cx="115" cy="-80" r="14" fill="#fde68a" stroke="#f59e0b" strokeWidth="2">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1="105" y1="-80" x2="125" y2="-80" stroke="#b45309" strokeWidth="1.5" />
            {/* Bulb glow */}
            <circle cx="115" cy="-80" r="22" fill="#fde68a" opacity="0.25">
              <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Magnet (sliding into coil) */}
          <g>
            <rect x="120" y="100" width="120" height="40" rx="3" fill="url(#magGrad)" stroke="#0f172a" strokeWidth="1.5" />
            <text x="145" y="125" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#fff" fontWeight="700">N</text>
            <text x="215" y="125" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#fff" fontWeight="700">S</text>
            {/* Motion arrow */}
            <path d="M 250 120 L 320 120" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrEM)">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
            </path>
            <text x="285" y="105" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24" fontWeight="700">MOTION</text>
          </g>

          {/* Field lines from magnet */}
          {[80, 100, 140, 160].map((y) => (
            <path
              key={y}
              d={`M 240 ${y} Q 300 ${y - 30} 360 ${y - 10}`}
              stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3"
            />
          ))}

          {/* Labels */}
          <text x="180" y="180" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#94a3b8">MAGNET</text>
          <text x="430" y="180" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#94a3b8">COIL OF WIRE</text>
          <text x="475" y="40" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24">⚡ INDUCED CURRENT</text>
        </svg>
      </div>

      <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {[
          { en: "Move a magnet through a coil of wire.", kh: "ផ្លាស់ទីមេដែកឆ្លងកាត់រង្វិលខ្សែភ្លើង។" },
          { en: "The changing magnetic field pushes electrons in the wire.", kh: "ដែនមេដែកដែលផ្លាស់ប្តូរ រុញអេឡិចត្រុងក្នុងខ្សែភ្លើង។" },
          { en: "Electricity flows. The bulb lights up — from motion alone.", kh: "អគ្គិសនីហូរ។ អំពូលភ្លឺ — តែពីចលនាប៉ុណ្ណោះ។" },
        ].map((step, i) => (
          <li key={i} className="rounded-lg bg-indigo-50 border border-indigo-200 p-3">
            <div className="font-mono text-[10px] text-indigo-700 mb-1">STEP {i + 1}</div>
            <div className={`text-slate-700 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? step.kh : step.en}
            </div>
          </li>
        ))}
      </ol>

      <div className={`mt-4 text-xs text-slate-600 flex items-start gap-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          {isKh
            ? "ស្ទើរតែគ្រប់រោងចក្រអគ្គិសនីនៅលើពិភពលោកសព្វថ្ងៃ — រោងចក្រធ្យូងថ្ម ហ្គាស ខ្យល់ ទឹក និងនុយក្លេអ៊ែរ — ប្រើ​គ្រាន់តែជារឿងតែមួយ៖ បង្វិលមេដែកធំៗឆ្លងកាត់រង្វិលភ្លើងធំៗ។ ហ្វារ៉ាដេយចាប់ផ្ដើមវាទាំងអស់។"
            : "Almost every power plant in the world today — coal, gas, wind, hydro, nuclear — does just one thing: spin huge magnets through huge coils of wire. Faraday started it all."}
        </p>
      </div>
    </div>
  );
}

function BilingualQuote({ isKh: _isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border-l-4 border-amber-500 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Quote className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="font-display font-bold text-lg sm:text-xl text-amber-900 leading-snug italic">
            "Faraday's discovery turned motion into light."
          </p>
          <p className="font-khmer text-base sm:text-lg text-amber-900 leading-loose">
            «ការរកឃើញរបស់ហ្វារ៉ាដេយ បានផ្លាស់ប្តូរចលនាឱ្យទៅជាពន្លឺ។»
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 4 · Gauss's Law — Net diagram + Formula
// ════════════════════════════════════════════════════════════════════════════

function GaussNet({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Diagram */}
        <div className="rounded-xl bg-slate-950 p-4">
          <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden>
            <defs>
              <radialGradient id="chargeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#fde68a" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
              </radialGradient>
              <marker id="arrG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
            </defs>

            {/* The "fishing net" — Gaussian sphere */}
            <circle cx="180" cy="160" r="120" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
            {/* Mesh */}
            {[0, 30, 60, 90, 120, 150].map((a) => {
              const rad = (a * Math.PI) / 180;
              const x1 = 180 + 120 * Math.cos(rad);
              const y1 = 160 + 120 * Math.sin(rad);
              const x2 = 180 - 120 * Math.cos(rad);
              const y2 = 160 - 120 * Math.sin(rad);
              return <line key={`m1-${a}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0e7490" strokeWidth="0.5" opacity="0.7" />;
            })}
            {[40, 70, 100, 130].map((r) => (
              <ellipse key={r} cx="180" cy="160" rx="120" ry={r} fill="none" stroke="#0e7490" strokeWidth="0.5" opacity="0.5" />
            ))}

            {/* Glow */}
            <circle cx="180" cy="160" r="60" fill="url(#chargeGlow)" />
            {/* Central charge */}
            <circle cx="180" cy="160" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <text x="180" y="165" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="700" fill="#7c2d12">+Q</text>

            {/* Field lines (E) radiating outward through the net */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              const x1 = 180 + 18 * Math.cos(a);
              const y1 = 160 + 18 * Math.sin(a);
              const x2 = 180 + 145 * Math.cos(a);
              const y2 = 160 + 145 * Math.sin(a);
              return (
                <line
                  key={`e-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fbbf24" strokeWidth="1.5"
                  markerEnd="url(#arrG)"
                  opacity="0.85"
                />
              );
            })}

            {/* Labels */}
            <text x="180" y="20" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#22d3ee">GAUSSIAN SURFACE (THE NET)</text>
            <text x="180" y="305" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24">⚡ ELECTRIC FIELD LINES (THE FLUX)</text>
          </svg>
        </div>

        {/* Analogy text */}
        <div className="space-y-4">
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ការប្រៀបធៀប" : "The analogy"}
            </div>
            <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សំណាញ់ត្រី និងទឹកអរូបិយ" : "A fishing net and invisible water"}
            </h3>
          </div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ស្រមៃថាបន្ទុកអគ្គិសនី ហូរ 'ទឹកអរូបិយ' (ដែនអគ្គិសនី) ចេញគ្រប់ទិសដៅ។ ឥឡូវនេះ បោះសំណាញ់ត្រី (ឈ្មោះវិទ្យាសាស្ត្រ៖ ផ្ទៃហ្គោស) ពទ្ធជុំវិញបន្ទុកនោះ។"
              : "Imagine an electric charge pours 'invisible water' (the electric field) outward in every direction. Now throw a fishing net (its scientific name: a Gaussian surface) all the way around the charge."}
          </p>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "បរិមាណ 'ទឹក' សរុបដែលហូរចេញតាមសំណាញ់ មានឈ្មោះវិទ្យាសាស្ត្រថា 'ភ្លុចអគ្គិសនី' (electric flux)។ ហ្គោសបានបង្ហាញថា វាគ្រាន់តែស្មើនឹងបន្ទុកដែលនៅក្នុងសំណាញ់ ចែកនឹងថេរធម្មជាតិមួយ។ មិនច្រើនមិនតិចជាងនេះទេ។"
              : "The total amount of 'water' flowing out through the net is called the electric flux. Gauss showed it is exactly equal to the charge inside the net divided by one constant of nature. Not a drop more, not a drop less."}
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-cyan-700">NET</div>
              <div className={`text-cyan-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ផ្ទៃហ្គោស" : "Surface"}
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-amber-700">WATER</div>
              <div className={`text-amber-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ភ្លុច E·dA" : "Flux E·dA"}
              </div>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-rose-700">SOURCE</div>
              <div className={`text-rose-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "បន្ទុក Q" : "Charge Q"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GaussFormula({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-950 text-white border-2 border-amber-500/40 p-5 sm:p-7 overflow-hidden relative">
      <LabGrid muted />

      <div className="relative">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ច្បាប់ហ្គោស សម្រាប់អគ្គិសនី" : "Gauss's Law for Electricity"}
        </div>
        <h3 className={`font-display font-bold text-xl mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "សមីការក្នុងភាសាគណិតវិទ្យា" : "The equation in mathematical language"}
        </h3>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 sm:p-6 my-3 overflow-x-auto">
          <div className="text-white text-2xl sm:text-3xl text-center">
            <BlockMath math={String.raw`\oint \mathbf{E} \cdot d\mathbf{A} \;=\; \dfrac{Q_{\mathrm{enc}}}{\varepsilon_0}`} />
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-5">
          <SymRow
            sym={String.raw`\oint \mathbf{E} \cdot d\mathbf{A}`}
            en="Total electric flux through the closed surface — every field line poking through the net, summed."
            kh="ភ្លុចអគ្គិសនីសរុបឆ្លងផ្ទៃបិទ — រាល់ខ្សែដែនដែលឆ្លងសំណាញ់ បូករួមបញ្ចូលគ្នា។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`Q_{\mathrm{enc}}`}
            en="The total charge enclosed inside the surface."
            kh="បន្ទុកសរុបដែលនៅក្នុងផ្ទៃ។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`\varepsilon_0`}
            en="Permittivity of free space — a constant of nature, ≈ 8.854 × 10⁻¹² F/m."
            kh="ភេមីតិវីតេនៃលំហទទេ — ថេរធម្មជាតិ ≈ ៨.៨៥៤ × ១០⁻¹² F/m។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`\mathbf{E}`}
            en="The electric field on the surface — the answer we usually want."
            kh="ដែនអគ្គិសនីលើផ្ទៃ — ចម្លើយដែលយើងចង់បានជាធម្មតា។"
            isKh={isKh}
          />
        </dl>

        <div className={`mt-5 rounded-xl bg-amber-500/10 border border-amber-500/40 p-4 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <span className="font-display font-bold text-amber-300">
            {isKh ? "ចំណុចសំខាន់៖ " : "The punch line: "}
          </span>
          <span className="text-slate-200">
            {isKh
              ? "ប្រសិនបើអ្នកស្គាល់បន្ទុក "
              : "If you know the charge "}
          </span>
          <span className="inline-block align-middle"><InlineMath math="Q" /></span>
          <span className="text-slate-200">
            {isKh
              ? " នៅក្នុងសំណាញ់ អ្នកអាចគណនាដែនអគ្គិសនី "
              : " inside the net, you can perfectly calculate the electric field "}
          </span>
          <span className="inline-block align-middle"><InlineMath math="\mathbf{E}" /></span>
          <span className="text-slate-200">
            {isKh
              ? " លើផ្ទៃនៃសំណាញ់នោះបានយ៉ាងពិតប្រាកដ។"
              : " on the surface of the net."}
          </span>
        </div>
      </div>
    </div>
  );
}

function SymRow({ sym, en, kh, isKh }: { sym: string; en: string; kh: string; isKh: boolean }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3 flex items-start gap-3">
      <div className="flex-shrink-0 min-w-[60px] text-amber-300 text-lg">
        <InlineMath math={sym} />
      </div>
      <dd className={`text-slate-300 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? kh : en}
      </dd>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 5 · Applications
// ════════════════════════════════════════════════════════════════════════════

type App = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  nameEn: string;
  nameKh: string;
  taglineEn: string;
  taglineKh: string;
  bodyEn: string;
  bodyKh: string;
  exampleEn: string;
  exampleKh: string;
  tone: { from: string; to: string; chip: string; ring: string };
};

const APPS: App[] = [
  {
    id: "motors",
    Icon: Cog,
    nameEn: "Electric Motors",
    nameKh: "ម៉ូទ័រអគ្គិសនី",
    taglineEn: "Turning electricity back into motion.",
    taglineKh: "ប្រែប្រួលអគ្គិសនីត្រលប់ទៅជាចលនា។",
    bodyEn: "Faraday's experiment in reverse: push electricity through a coil placed inside a magnetic field, and the coil spins. Every fan, every electric scooter in Phnom Penh, every washing machine drum is one of these.",
    bodyKh: "ការពិសោធន៍របស់ហ្វារ៉ាដេយដាក់ច្រាស៖ រុញអគ្គិសនីឆ្លងរង្វិលដែលដាក់ក្នុងដែនមេដែក នោះរង្វិលនឹងវិល។ កង្ហារនីមួយៗ ម៉ូតូអគ្គិសនីនៅភ្នំពេញ ផតបោកគក់ — សុទ្ធតែជានេះ។",
    exampleEn: "Tuk-tuk, EV, blender, drone propeller.",
    exampleKh: "តុក-តុក រថយន្តអគ្គិសនី ម៉ាស៊ីនកិន ឧបករណ៍ហោះ។",
    tone: { from: "from-indigo-600", to: "to-indigo-700", chip: "text-indigo-700", ring: "ring-indigo-200" },
  },
  {
    id: "transformers",
    Icon: Plug,
    nameEn: "Transformers",
    nameKh: "បំលែងតង់ស្យុង",
    taglineEn: "Changing the 'pressure' of electricity to travel across the country.",
    taglineKh: "ប្តូរ 'សម្ពាធ' អគ្គិសនីដើម្បីធ្វើដំណើរទូទាំងប្រទេស។",
    bodyEn: "Two coils of wire share one magnetic field. Spin lots of turns on one side and few on the other, and you can step voltage up to 500,000 V to travel hundreds of kilometres on a thin wire — then step it back down to 220 V at your house.",
    bodyKh: "រង្វិលខ្សែភ្លើងពីរ ចែករំលែកដែនមេដែកតែមួយ។ ដាក់រង្វិលច្រើននៅខាងមួយ និងតិចនៅខាងមួយ អ្នកអាចបង្កើនតង់ស្យុងដល់ ៥០០.០០០ V ដើម្បីធ្វើដំណើររាប់រយគីឡូម៉ែត្រលើខ្សែស្តើង — រួចបន្ថយវិញមកត្រឹម ២២០ V នៅផ្ទះអ្នក។",
    exampleEn: "Power lines, phone chargers, doorbells.",
    exampleKh: "ខ្សែបណ្ដាញអគ្គិសនី ឧបករណ៍សាកថ្ម កណ្ដឹងទ្វារ។",
    tone: { from: "from-amber-600", to: "to-amber-700", chip: "text-amber-700", ring: "ring-amber-200" },
  },
  {
    id: "mri",
    Icon: HeartPulse,
    nameEn: "MRI Machines",
    nameKh: "ម៉ាស៊ីន MRI",
    taglineEn: "Using magnetic fields to see inside the human body.",
    taglineKh: "ប្រើដែនមេដែកដើម្បីមើលខាងក្នុងរូបកាយមនុស្ស។",
    bodyEn: "An MRI surrounds you with a magnetic field 60,000× stronger than Earth's. The hydrogen atoms in your body line up like tiny compass needles — then a radio pulse knocks them sideways, and the way they snap back paints a picture of every soft tissue, with no X-rays at all.",
    bodyKh: "MRI ពទ្ធជុំវិញអ្នកដោយដែនមេដែកខ្លាំងជាងផែនដី ៦០.០០០ ដង។ អាតូមអ៊ីដ្រូសែនក្នុងរូបកាយរបស់អ្នក តម្រឹមដូចម្ជុលត្រីវិស័យតូចៗ — បន្ទាប់មកជីពចរវិទ្យុ វាយវាទៅចំហៀង ហើយវិធីដែលវាខ្ទាស់ត្រលប់មកវិញ គូររូបភាពនៃជាលិកាទន់ ដោយគ្មានកាំរស្មីអ៊ិច។",
    exampleEn: "Brain scans, joint injuries, tumour detection.",
    exampleKh: "ស្កេនខួរក្បាល របួសសន្លាក់ ការរកឃើញដុំសាច់។",
    tone: { from: "from-rose-600", to: "to-rose-700", chip: "text-rose-700", ring: "ring-rose-200" },
  },
];

function ApplicationsGrid({ isKh }: { isKh: boolean }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {APPS.map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden ring-1 ${a.tone.ring}`}
            data-testid={`app-${a.id}`}
          >
            <div className={`bg-gradient-to-br ${a.tone.from} ${a.tone.to} text-white p-4 flex items-center gap-3`}>
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <a.Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`font-display font-bold text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? a.nameKh : a.nameEn}
                </div>
                <div className={`text-[11px] opacity-90 ${isKh ? "font-sans" : "font-khmer"}`}>
                  {isKh ? a.nameEn : a.nameKh}
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className={`text-sm font-semibold text-slate-900 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                {isKh ? a.taglineKh : a.taglineEn}
              </div>
              <p className={`text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? a.bodyKh : a.bodyEn}
              </p>
              <div className={`text-[11px] font-mono pt-3 border-t border-dashed border-slate-200 ${a.tone.chip} ${isKh ? "font-khmer" : ""}`}>
                ▸ {isKh ? a.exampleKh : a.exampleEn}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing thought */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-amber-50 border border-slate-200 p-5 sm:p-6 mt-2">
        <div className="flex items-start gap-3 max-w-3xl">
          <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <span className="font-display font-bold text-slate-900">
              {isKh ? "ដែនមួយ ប្រើបានច្រើនរបៀប។ " : "One field, many uses. "}
            </span>
            {isKh
              ? "មេដែករបស់ម៉ាស៊ីនបោកគក់ មេដែករបស់ម៉ាស៊ីន MRI និងមេដែករបស់រោងចក្រអគ្គិសនី — ទាំងអស់គឺជាគំនិតតែមួយរបស់ហ្វារ៉ាដេយ និងហ្គោស ដែលត្រូវបានពង្រីកទៅខ្នាតផ្សេងៗគ្នា។"
              : "The magnet in a washing machine, the magnet in an MRI scanner, and the magnet in a power plant are all the same idea from Faraday and Gauss — just scaled to different sizes."}
          </p>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative lab-grid (used in hero + formula card)
// ════════════════════════════════════════════════════════════════════════════

function LabGrid({ muted = false }: { muted?: boolean }) {
  const stroke = muted ? "#fbbf24" : "#cbd5e1";
  const strokeAlt = muted ? "#22d3ee" : "#a5b4fc";
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${muted ? "opacity-[0.06]" : "opacity-[0.18]"}`}
      aria-hidden
    >
      <defs>
        <pattern id="lab-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={stroke} strokeWidth="0.5" />
        </pattern>
        <pattern id="lab-grid-major" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke={strokeAlt} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lab-grid)" />
      <rect width="100%" height="100%" fill="url(#lab-grid-major)" />
    </svg>
  );
}

// Silence "unused" warnings for icons reserved for future expansion
void Magnet;
