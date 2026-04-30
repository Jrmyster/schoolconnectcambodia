import { Leaf, Microscope, Sprout, Fish, Compass, Dna, BookOpen, Lightbulb } from "lucide-react";
import type { CSSProperties, ReactNode, ComponentType } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { CellExplorer } from "@/components/biology/CellExplorer";
import { PunnettSquare } from "@/components/biology/PunnettSquare";
import { FamilyTraitMapper } from "@/components/biology/FamilyTraitMapper";
import { NaturalSelectionSim } from "@/components/biology/NaturalSelectionSim";
import { HumanEvolutionTimeline } from "@/components/biology/HumanEvolutionTimeline";
import { MekongEcology } from "@/components/biology/MekongEcology";
import { TonleSapEcology } from "@/components/biology/TonleSapEcology";

const NATURE_BG: CSSProperties = {
  backgroundColor: "#f5f7f0",
  backgroundImage:
    "radial-gradient(rgba(34,197,94,0.10) 1.4px, transparent 1.4px)",
  backgroundSize: "26px 26px",
};

const KH_DIGITS = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"];
function khNum(s: string) {
  return s.split("").map(c => /\d/.test(c) ? KH_DIGITS[Number(c)] : c).join("");
}

export function BiologyHubPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={NATURE_BG}>
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-lime-700 text-white px-6 sm:px-10 py-10 sm:py-14 shadow-lg">
          <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <Leaf className="absolute -right-6 -top-6 w-44 h-44 text-lime-300/15 rotate-12 pointer-events-none" strokeWidth={1.2} />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 border-2 border-lime-200/60 text-lime-100 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-lime-200/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science Hub", "មជ្ឈមណ្ឌលវិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span>{t("Biology", "ជីវវិទ្យា")}</span>
              </div>
              <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Biology, Genetics & Evolution", "ជីវវិទ្យា ហ្សែន និងការវិវត្ត")}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-emerald-50/90 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "From the tiny machinery inside a single cell to the great river of life that flows through the Mekong — explore the science of living things.",
                  "ចាប់ពីម៉ាស៊ីនតូចៗនៅក្នុងកោសិកាមួយ ដល់ទន្លេមេគង្គដ៏អស្ចារ្យនៃជីវិត — ស្វែងយល់ពីវិទ្យាសាស្ត្រនៃសត្វមានជីវិត។",
                )}
              </p>
              <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-lime-100/70 ${kh ? "font-khmer text-xs" : ""}`}>
                <span>{t("MODULES: 03", "មុខវិជ្ជា៖ ០៣")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LANG: EN / ខ្មែរ", "ភាសា៖ EN / ខ្មែរ")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LEVEL: SECONDARY", "កម្រិត៖ មធ្យមសិក្សា")}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { Icon: Microscope, en: "Cells & Genetics", k: "កោសិកា និងហ្សែន" },
                  { Icon: Sprout,     en: "Evolution",         k: "ការវិវត្ត" },
                  { Icon: Fish,       en: "Mekong Ecology",    k: "បរិស្ថានវិទ្យាមេគង្គ" },
                ].map(({ Icon, en, k }) => (
                  <span key={en} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-lime-200/40 text-xs ${kh ? "font-khmer" : ""}`}>
                    <Icon className="w-3.5 h-3.5" /> {kh ? k : en}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <Section number="01" Icon={Microscope} en="The Cell & Genetics" kh="កោសិកា និងហ្សែន"
          subEn="The microscopic factories of life and the code that runs them."
          subKh="រោងចក្រមីក្រូទស្សន៍នៃជីវិត និងកូដដែលដំណើរការវា។">
          <CellExplorer />
          <Genetics101 kh={kh} />
          <PunnettSquare />
          <FamilyTraitMapper />
        </Section>

        <Section number="02" Icon={Sprout} en="The Theory of Evolution" kh="ទ្រឹស្តីនៃការវិវត្ត"
          subEn="Darwin's idea of life shaped by countless small changes over time."
          subKh="គំនិតរបស់ដាវីនពីជីវិតដែលត្រូវបានរូបរាងដោយការផ្លាស់ប្តូរតូចៗរាប់មិនអស់តាមពេលវេលា។">
          <NaturalSelectionSim />
          <HumanEvolutionTimeline />
        </Section>

        <Section number="03" Icon={Fish} en="Ecology & The Environment" kh="បរិស្ថានវិទ្យា"
          subEn="The web of life where Cambodia's rivers, fish and people meet."
          subKh="បណ្តាញនៃជីវិត ដែលទន្លេ ត្រី និងមនុស្សកម្ពុជាជួបគ្នា។">
          <MekongEcology />
          <TonleSapEcology />
        </Section>

        <p className={`text-center text-xs sm:text-sm text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Life on Earth shares one common origin. Caring for any creature — a fish in the Mekong, a tree in the forest, a friend at school — is caring for life itself.",
            "ជីវិតនៅលើផែនដីរួមគ្នានូវប្រភពតែមួយ។ ការថែទាំសត្វណាមួយ — ត្រីនៅទន្លេមេគង្គ ដើមឈើនៅព្រៃ មិត្តភក្តិនៅសាលា — គឺជាការថែទាំជីវិតផ្ទាល់។",
          )}
        </p>
      </div>
    </div>
  );
}

function Section({
  number, Icon, en, kh, subEn, subKh, children,
}: {
  number: string;
  Icon: ComponentType<{ className?: string }>;
  en: string; kh: string;
  subEn: string; subKh: string;
  children: ReactNode;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";
  return (
    <section className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow">
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700/80 ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t(`Module ${number}`, `មុខវិជ្ជា ${khNum(number)}`)}
          </div>
          <h2 className={`font-display text-2xl sm:text-3xl font-bold text-emerald-950 ${k ? "font-khmer leading-snug" : ""}`}>
            {t(en, kh)}
          </h2>
          <p className={`mt-1 text-sm text-stone-700 max-w-2xl ${k ? "font-khmer leading-loose" : ""}`}>
            {t(subEn, subKh)}
          </p>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Genetics101({ kh }: { kh: boolean }) {
  const cards = [
    {
      Icon: Dna,
      en: { title: "DNA — the recipe book",
            body: "DNA is a long molecule shaped like a twisted ladder (a 'double helix'). It stores the instructions for building and running every living thing — humans, mango trees, even bacteria." },
      kh: { title: "DNA — សៀវភៅរូបមន្ត",
            body: "DNA គឺជាម៉ូលេគុលវែងមួយដែលមានរូបរាងដូចជណ្ដើរបង្វិល ('បង្វិលទ្វេ')។ វាផ្ទុកការណែនាំសម្រាប់សាងសង់ និងដំណើរការសត្វមានជីវិតគ្រប់ប្រភេទ — មនុស្ស ដើមស្វាយ សូម្បីតែបាក់តេរី។" },
      color: "from-violet-500 to-purple-700",
    },
    {
      Icon: BookOpen,
      en: { title: "RNA — the messenger",
            body: "RNA is a single-strand cousin of DNA. It copies short sections of the recipe book and carries them out of the nucleus to the ribosomes, where proteins get built." },
      kh: { title: "RNA — អ្នកនាំសារ",
            body: "RNA គឺជាសាច់ញាតិតែមួយខ្សែរបស់ DNA។ វាចម្លងផ្នែកខ្លីៗនៃសៀវភៅរូបមន្ត ហើយយកវាចេញពីនុយក្លេអ៊ែទៅរីបូសូម ដែលប្រូតេអ៊ីនត្រូវបានបង្កើត។" },
      color: "from-sky-500 to-blue-700",
    },
    {
      Icon: Lightbulb,
      en: { title: "Genes & traits",
            body: "A gene is a short stretch of DNA that codes for one trait, like eye color or flower color. You inherit two copies of every gene — one from each parent. Some are dominant (always show), some are recessive (only show when both copies match)." },
      kh: { title: "ហ្សែន និងលក្ខណៈ",
            body: "ហ្សែនគឺជាផ្នែកខ្លីនៃ DNA ដែលកំណត់លក្ខណៈមួយ ដូចជាពណ៌ភ្នែក ឬពណ៌ផ្កា។ អ្នកទទួលហ្សែននីមួយៗជាគូ — មួយពីឪ និងមួយពីម្តាយ។ ខ្លះមានឥទ្ធិពលលើស (បង្ហាញរហូត) ខ្លះទន់ខ្សោយ (បង្ហាញតែពេលគូដូចគ្នា)។" },
      color: "from-emerald-500 to-green-700",
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 bg-gradient-to-br from-emerald-50 to-white border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Dna className="w-3.5 h-3.5" />
          <span>{kh ? "ហ្សែនវិទ្យា ១០១" : "Genetics 101"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-emerald-950 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "DNA, RNA និងរបៀបបញ្ជូនលក្ខណៈ" : "DNA, RNA & how traits are passed on"}
        </h3>
      </div>
      <div className="p-5 sm:p-7 grid sm:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const I = c.Icon;
          const data = kh ? c.kh : c.en;
          return (
            <div key={i} className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
              <div className={`bg-gradient-to-br ${c.color} text-white p-3 flex items-center gap-2`}>
                <I className="w-5 h-5" />
                <span className={`font-bold ${kh ? "font-khmer" : ""}`}>{data.title}</span>
              </div>
              <p className={`p-4 text-sm text-stone-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>{data.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
