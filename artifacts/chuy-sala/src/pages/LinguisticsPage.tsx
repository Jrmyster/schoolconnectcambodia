import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  Brain,
  Compass,
  Languages,
  MessageSquareQuote,
  Newspaper,
  ScrollText,
  Map as MapIcon,
  Sprout,
  Sparkles,
  Quote,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  LING-01 · Linguistics: The Architecture of Thought
//            ភាសាវិទ្យា៖ ស្ថាបត្យកម្មនៃការគិត
//
//  1. The Three Pillars of Word Science
//       Linguistics · Semantics (Map vs. Territory) · Etymology
//  2. The Pioneers of the Linguistic Map
//       Sir William Jones (1786 — Indo-European)
//       James Burnett, Lord Monboddo (pre-Darwin language evolution)
//
//  Aesthetic: classic library — parchment, deep mahogany red, serif type.
// ════════════════════════════════════════════════════════════════════════════

const PARCHMENT: React.CSSProperties = {
  backgroundColor: "#f4ead5",
  backgroundImage:
    "radial-gradient(circle at 25% 30%, rgba(120, 53, 15, 0.06), transparent 35%)," +
    "radial-gradient(circle at 75% 70%, rgba(120, 53, 15, 0.05), transparent 40%)," +
    "linear-gradient(rgba(120, 53, 15, 0.035) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(120, 53, 15, 0.035) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 48px 48px, 48px 48px",
};

const PAPER: React.CSSProperties = {
  backgroundColor: "#fbf3df",
  backgroundImage:
    "radial-gradient(circle at 100% 0%, rgba(120, 53, 15, 0.06), transparent 35%)," +
    "radial-gradient(circle at 0% 100%, rgba(120, 53, 15, 0.06), transparent 40%)",
};

const MAHOGANY = "#7c2d12";

function CornerFlourish() {
  return (
    <div className="contents">
      {[
        ["top-2 left-2", "border-t-2 border-l-2"],
        ["top-2 right-2", "border-t-2 border-r-2"],
        ["bottom-2 left-2", "border-b-2 border-l-2"],
        ["bottom-2 right-2", "border-b-2 border-r-2"],
      ].map(([pos, b]) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} w-4 h-4 ${b} border-amber-800/50`}
        />
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function LinguisticsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PARCHMENT}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:text-amber-950 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl text-amber-50 px-6 sm:px-10 py-9 sm:py-11 mb-10 shadow-xl border-2 border-amber-900/60"
          style={{
            backgroundColor: MAHOGANY,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(254, 215, 170, 0.18), transparent 55%)," +
              "linear-gradient(rgba(254,215,170,0.05) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(254,215,170,0.05) 1px, transparent 1px)",
            backgroundSize: "auto, 32px 32px, 32px 32px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-1.5 bg-amber-300/70"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-1.5 bg-amber-300/70"
          />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-200/15 border-2 border-amber-200/50 text-amber-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/85 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <ScrollText className="w-3.5 h-3.5" />
                <span>{t("Study Center", "មជ្ឈមណ្ឌលសិក្សា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-100">LING-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Linguistics: The Architecture of Thought",
                  "ភាសាវិទ្យា៖ ស្ថាបត្យកម្មនៃការគិត"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-amber-100/85 max-w-2xl leading-relaxed font-serif italic ${kh ? "font-khmer not-italic leading-loose" : ""}`}>
                {t(
                  "Every sentence you have ever spoken is a small miracle — a vibration in the air that builds an idea inside another person's head. The science of how that miracle works is older, stranger, and more political than most people realise.",
                  "រាល់ប្រយោគដែលអ្នកធ្លាប់និយាយ គឺជាអព្ភូតហេតុតូចមួយ — ការរំញ័រនៅក្នុងខ្យល់ ដែលសាងសង់គំនិតមួយនៅក្នុងក្បាលអ្នកដទៃ។ វិទ្យាសាស្ត្រនៃរបៀបដែលអព្ភូតហេតុនោះដំណើរការ គឺចាស់ជាង ចម្លែកជាង និងមានន័យសង្គមច្រើនជាងអ្វីដែលមនុស្សភាគច្រើនយល់ដឹង។"
                )}
              </p>
            </div>
          </div>
        </header>

        <SectionPillars  kh={kh} t={t} />
        <SectionPioneers kh={kh} t={t} />
        <SectionSyntax   kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-amber-800 p-5 flex items-start gap-3 overflow-hidden shadow"
          style={PAPER}
          data-testid="closing-note"
        >
          <CornerFlourish />
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: MAHOGANY }} />
          <p className={`text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            <strong className={kh ? "" : "font-bold"}>{t("Why it matters: ", "ហេតុអ្វីសំខាន់ ៖ ")}</strong>
            {t(
              "Khmer, Sanskrit, Pali and the Romance languages are not isolated islands — they are leaves on a vast and tangled family tree, partly mapped by linguists and still being discovered. Studying linguistics is studying the operating system of human civilisation itself.",
              "ភាសាខ្មែរ សំស្ក្រឹត បាលី និងភាសារ៉ូម៉ង់ មិនមែនជាកោះដាច់ឆ្ងាយទេ — វាជាស្លឹកនៅលើដើមឈើគ្រួសារដ៏ធំ និងស្មុគស្មាញ ដែលត្រូវបានគូសផែនទីដោយផ្នែកដោយអ្នកភាសាវិទ្យា ហើយនៅតែកំពុងត្រូវបានរកឃើញ។ ការសិក្សាភាសាវិទ្យា គឺការសិក្សាប្រព័ន្ធដំណើរការនៃអារ្យធម៌មនុស្សដោយខ្លួនវា។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-amber-50 text-sm font-bold shadow hover:opacity-90 transition-opacity ${kh ? "font-khmer" : "font-serif"}`}
            style={{ backgroundColor: MAHOGANY }}
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
//  Section 01 — The Three Pillars
// ════════════════════════════════════════════════════════════════════════════

function SectionPillars({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-pillars">
      <SectionHeader
        spec="01"
        en="The Three Pillars of Word Science"
        kh="សសរស្តម្ភទាំងបីនៃវិទ្យាសាស្ត្រពាក្យ"
        kh_={kh}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <PillarCard
          k={kh}
          icon={Brain}
          enName="Linguistics"
          khName="ភាសាវិទ្យា"
          enBody="Linguistics is not the same as 'learning a language.' It is the scientific study of how the human brain builds and understands every language: the rules of grammar, the shape of sounds, the way meaning is packed into sentences, and how children acquire all of this without being formally taught."
          khBody="ភាសាវិទ្យាមិនដូចគ្នានឹង «ការរៀនភាសា» ទេ។ វាគឺជាការសិក្សាបែបវិទ្យាសាស្ត្រអំពីរបៀបដែលខួរក្បាលមនុស្សស្ថាបនា និងយល់ភាសាគ្រប់ប្រភេទ ៖ ច្បាប់នៃវេយ្យាករណ៍ រូបរាងនៃសំឡេង របៀបដែលអត្ថន័យត្រូវបានដាក់បញ្ចូលក្នុងប្រយោគ និងរបៀបដែលកុមារទទួលយកអ្វីទាំងអស់នេះ ដោយមិនបានរៀនជាផ្លូវការ។"
        />
        <PillarCard
          k={kh}
          icon={MessageSquareQuote}
          enName="Semantics"
          khName="អត្ថន័យវិទ្យា"
          enBody="Semantics is the study of meaning itself. It asks the deepest question in the field: how does a vibration of air leaving my mouth assemble a picture inside your brain? How do you and I, sitting in different bodies, agree what the word 'mango' refers to?"
          khBody="អត្ថន័យវិទ្យា គឺការសិក្សាអំពីអត្ថន័យដោយខ្លួនវា។ វាសួរសំណួរជ្រៅជ្រះបំផុតក្នុងវិស័យនេះ ៖ តើការរំញ័រខ្យល់ដែលចេញពីមាត់ខ្ញុំ ប្រមូលរូបភាពមួយនៅក្នុងខួរក្បាលអ្នកយ៉ាងដូចម្ដេច? តើខ្ញុំ និងអ្នក ដែលអង្គុយក្នុងរូបកាយខុសគ្នា យល់ស្របគ្នាថាពាក្យ «ស្វាយ» សំដៅទៅលើអ្វី?"
        />
        <PillarCard
          k={kh}
          icon={ScrollText}
          enName="Etymology"
          khName="និរុត្តិវិទ្យា"
          enBody="Etymology is the history and evolution of words. It traces how a single word was born in one language, travelled across continents on the backs of merchants and monks, was bent by other tongues that borrowed it, and finally arrived — often disguised in new spelling — in the dictionary you read today."
          khBody="និរុត្តិវិទ្យា គឺជាប្រវត្តិសាស្ត្រ និងការវិវត្តន៍នៃពាក្យ។ វាតាមដានរបៀបដែលពាក្យតែមួយកើតមកក្នុងភាសាមួយ ធ្វើដំណើរឆ្លងទ្វីបនៅលើខ្នងពាណិជ្ជករ និងព្រះសង្ឃ ត្រូវបានពត់ដោយភាសាដទៃដែលខ្ចីវា ហើយចុងក្រោយមកដល់ — ច្រើនតែក្លែងរូបក្នុងការប្រកបថ្មី — នៅក្នុងវចនានុក្រមដែលអ្នកអានសព្វថ្ងៃនេះ។"
        />
      </div>

      {/* Map vs Territory callout */}
      <div
        className="relative mt-6 rounded-2xl border-2 border-amber-800/70 p-5 sm:p-7 shadow-md overflow-hidden"
        style={PAPER}
        data-testid="map-vs-territory"
      >
        <CornerFlourish />
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapIcon className="w-5 h-5" style={{ color: MAHOGANY }} />
              <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
                {t("The Map vs. The Territory", "ផែនទី ធៀប នឹងទឹកដី")}
              </h3>
            </div>
            <p className={`text-sm text-amber-950 mb-3 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
              {t(
                "The Polish-American thinker Alfred Korzybski summed up the central puzzle of semantics in one sentence: ",
                "អ្នកគិតប៉ូឡូញ-អាមេរិកាំង Alfred Korzybski បានសង្ខេបបញ្ហាគន្លឹះនៃអត្ថន័យវិទ្យាក្នុងប្រយោគតែមួយ ៖ "
              )}
            </p>
            <blockquote
              className={`relative pl-5 border-l-4 italic text-amber-950 mb-3 ${kh ? "font-khmer not-italic leading-loose" : "font-serif"}`}
              style={{ borderColor: MAHOGANY }}
            >
              <Quote className="absolute -left-3 -top-1 w-4 h-4 bg-[#fbf3df]" style={{ color: MAHOGANY }} aria-hidden="true" />
              <span className="text-base">
                {t(
                  "\u201CThe map is not the territory.\u201D",
                  "«ផែនទីមិនមែនជាទឹកដីទេ។»"
                )}
              </span>
            </blockquote>
            <p className={`text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
              {t(
                "The word ", "ពាក្យ "
              )}
              <strong>{t("\u201CDog\u201D", "«ឆ្កែ»")}</strong>
              {t(
                " cannot bite you. The word ",
                " មិនអាចខាំអ្នកបានទេ។ ពាក្យ "
              )}
              <strong>{t("\u201CFire\u201D", "«ភ្លើង»")}</strong>
              {t(
                " cannot burn you. A word is just a small label our culture has agreed to draw on a much bigger and stranger reality. Mistaking the label for the thing itself — confusing the menu for the meal — is the most common mistake humans make in arguments, in politics, and in religion.",
                " មិនអាចដុតអ្នកបានទេ។ ពាក្យគឺជាស្លាកតូចមួយដែលវប្បធម៌របស់យើងបានឯកភាពគូរលើអាការៈពិតធំជាង និងចម្លែកជាង។ ការច្រឡំស្លាកជាមួយវត្ថុដោយខ្លួនវា — ច្រឡំម៉ឺនុយជាមួយម្ហូប — គឺជាកំហុសសាមញ្ញបំផុតដែលមនុស្សធ្វើក្នុងការជជែក ក្នុងនយោបាយ និងក្នុងសាសនា។"
              )}
            </p>
          </div>

          <MapTerritoryDiagram kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  k,
  icon: Icon,
  enName,
  khName,
  enBody,
  khBody,
}: {
  k: boolean;
  icon: React.ComponentType<{ className?: string }>;
  enName: string;
  khName: string;
  enBody: string;
  khBody: string;
}) {
  return (
    <article
      className="relative rounded-2xl border-2 border-amber-800/60 p-5 shadow-md overflow-hidden"
      style={PAPER}
    >
      <CornerFlourish />
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-amber-50 border-2 border-amber-900/40 shadow-sm"
          style={{ backgroundColor: MAHOGANY }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="leading-tight">
          <div className={`text-lg font-bold text-amber-950 ${k ? "font-khmer" : "font-serif"}`}>
            {k ? khName : enName}
          </div>
          {!k && (
            <div className="text-[11px] uppercase tracking-widest text-amber-800/80 font-serif italic">
              {khName}
            </div>
          )}
        </div>
      </div>
      <p className={`text-sm text-amber-950 ${k ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
        {k ? khBody : enBody}
      </p>
    </article>
  );
}

function MapTerritoryDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto rounded-xl border-2 border-amber-900/50"
      style={{ backgroundColor: "#fdf6e3" }}
      role="img"
      aria-label={t(
        "An illustration of the map-versus-territory idea: on the left a paper map shows the printed word Dog with a small drawing of a dog; on the right a real dog stands on grass, with an arrow showing the printed word can never bite while the real animal can.",
        "រូបភាពនៃគំនិតផែនទីធៀបនឹងទឹកដី ៖ ខាងឆ្វេងជាក្រដាសផែនទីបង្ហាញពាក្យ «ឆ្កែ» ដែលបានបោះពុម្ព ជាមួយរូបឆ្កែតូចមួយ ខាងស្ដាំជាឆ្កែពិតឈរលើស្មៅ ព្រួញបង្ហាញថាពាក្យបោះពុម្ពមិនអាចខាំទេ តែសត្វពិតអាចខាំបាន។"
      )}
      data-testid="map-territory-diagram"
    >
      <title>{t("Map vs. Territory illustration", "ការប្រៀបធៀបផែនទី និងទឹកដី")}</title>

      {/* LEFT — paper map */}
      <text x="80" y="22" fontSize="11" fill={MAHOGANY} fontFamily="serif" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ផែនទី (ពាក្យ)" : "THE MAP (the word)"}
      </text>
      {/* paper */}
      <g transform="rotate(-3 80 110)">
        <rect x="20" y="40" width="120" height="140" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
        <line x1="30" y1="60"  x2="130" y2="60"  stroke="#d6d3d1" strokeWidth="0.6" />
        <line x1="30" y1="120" x2="130" y2="120" stroke="#d6d3d1" strokeWidth="0.6" />
        <line x1="30" y1="155" x2="130" y2="155" stroke="#d6d3d1" strokeWidth="0.6" />
        <text x="80" y="100" fontSize="22" fill={MAHOGANY} fontFamily="serif" fontWeight="bold" textAnchor="middle" className={kh ? "font-khmer" : ""}>
          {kh ? "«ឆ្កែ»" : "\u201CDog\u201D"}
        </text>
        {/* tiny dog sketch */}
        <g transform="translate(60 130)" stroke="#7c2d12" strokeWidth="1" fill="none">
          <ellipse cx="20" cy="10" rx="14" ry="6" />
          <circle cx="34" cy="6" r="4" />
          <line x1="10" y1="14" x2="10" y2="22" />
          <line x1="28" y1="14" x2="28" y2="22" />
          <line x1="6"  y1="10" x2="2"  y2="6" />
        </g>
      </g>

      {/* divider */}
      <line x1="160" y1="20" x2="160" y2="200" stroke="#92400e" strokeWidth="1" strokeDasharray="3 4" />

      {/* RIGHT — real territory */}
      <text x="240" y="22" fontSize="11" fill={MAHOGANY} fontFamily="serif" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ទឹកដី (សត្វពិត)" : "THE TERRITORY (the real)"}
      </text>
      {/* sky */}
      <rect x="180" y="40" width="130" height="100" fill="#e0f2fe" />
      {/* sun */}
      <circle cx="290" cy="60" r="8" fill="#fbbf24" />
      {/* grass */}
      <rect x="180" y="140" width="130" height="40" fill="#86efac" />
      {/* a more solid dog silhouette */}
      <g transform="translate(210 100)">
        <ellipse cx="40" cy="34" rx="28" ry="14" fill="#78350f" />
        <circle cx="68" cy="26" r="11" fill="#78350f" />
        <polygon points="60,16 68,12 66,22" fill="#78350f" />
        <rect x="20" y="46" width="6" height="14" fill="#78350f" />
        <rect x="32" y="46" width="6" height="14" fill="#78350f" />
        <rect x="50" y="46" width="6" height="14" fill="#78350f" />
        <rect x="60" y="46" width="6" height="14" fill="#78350f" />
        <line x1="14" y1="32" x2="6" y2="28" stroke="#78350f" strokeWidth="3" />
        <circle cx="72" cy="24" r="1.4" fill="#fef3c7" />
      </g>
      {/* bite arrow */}
      <text x="240" y="200" fontSize="9" fill={MAHOGANY} fontFamily="serif" fontStyle="italic" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "អាចខាំ ✓" : "can bite ✓"}
      </text>

      {/* Bridge text */}
      <text x="80" y="200" fontSize="9" fill={MAHOGANY} fontFamily="serif" fontStyle="italic" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "មិនអាចខាំ ✗" : "cannot bite ✗"}
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Pioneers
// ════════════════════════════════════════════════════════════════════════════

function SectionPioneers({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-4" data-testid="section-pioneers">
      <SectionHeader
        spec="02"
        en="The Pioneers of the Linguistic Map"
        kh="អ្នកត្រួសត្រាយផ្លូវនៃផែនទីភាសា"
        kh_={kh}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Sir William Jones */}
        <article
          className="relative rounded-2xl border-2 border-amber-800/70 p-5 sm:p-6 shadow-md overflow-hidden"
          style={PAPER}
          data-testid="pioneer-jones"
        >
          <CornerFlourish />
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
              {t("Sir William Jones", "លោក Sir William Jones")}
            </h3>
            <span className={`text-[11px] uppercase tracking-widest font-mono text-amber-800 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("1746 – 1794 · Calcutta", "1746 – 1794 · កាល់កាតា")}
            </span>
          </div>
          <p className={`text-sm text-amber-950 mb-3 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Working as a British judge in India, Jones learned Sanskrit so he could read the country's ancient law books. While studying it he noticed something extraordinary: many of its grammatical roots were nearly identical to those of Latin and Ancient Greek — far too close to be a coincidence.",
              "ពេលធ្វើជាចៅក្រមអង់គ្លេសនៅក្នុងប្រទេសឥណ្ឌា លោក Jones បានរៀនភាសាសំស្ក្រឹត ដើម្បីអាចអានសៀវភៅច្បាប់បុរាណរបស់ប្រទេសនេះ។ ពេលសិក្សាវា គាត់បានកត់សម្គាល់រឿងអស្ចារ្យមួយ ៖ ឫសវេយ្យាករណ៍ជាច្រើនរបស់វាស្ទើរតែដូចគ្នានឹងភាសាឡាតាំង និងភាសាក្រិកបុរាណ — ជិតស្និទ្ធពេក ដែលមិនអាចជាការចៃដន្យបានទេ។"
            )}
          </p>
          <div className="rounded-lg border-l-4 p-3 mb-3" style={{ borderColor: MAHOGANY, backgroundColor: "#fdf6e3" }}>
            <div className={`text-[11px] font-mono uppercase tracking-widest text-amber-800 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("THE 1786 DISCOVERY · CALCUTTA", "ការរកឃើញឆ្នាំ 1786 · កាល់កាតា")}
            </div>
            <p className={`text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
              {t(
                "In a famous 1786 lecture to the Asiatic Society, he argued that Sanskrit, Latin, and Greek were so similar that they must all have ",
                "ក្នុងបាឋកថាដ៏ល្បីឆ្នាំ 1786 ទៅកាន់សមាគមអាស៊ី គាត់បានអះអាងថា សំស្ក្រឹត ឡាតាំង និងក្រិក ស្រដៀងគ្នាខ្លាំងពេក ដែលពួកវាទាំងអស់ត្រូវតែ "
              )}
              <em className={kh ? "" : "font-serif"}>{t("\u201Csprung from some common source.\u201D", "«ដុះចេញពីប្រភពរួមមួយ»។")}</em>
              {t(
                " That common source — never written down, spoken thousands of years ago — is what scholars now call ",
                " ប្រភពរួមនោះ — ដែលមិនដែលត្រូវបានសរសេរ ហើយត្រូវបាននិយាយកាលពីរាប់ពាន់ឆ្នាំមុន — គឺជាអ្វីដែលអ្នកប្រាជ្ញឥឡូវនេះហៅថា "
              )}
              <strong>{t("Proto-Indo-European", "ភាសាឥណ្ឌូ-អឺរ៉ុបបុរាណ")}</strong>
              {t(
                ". His insight launched the modern field of comparative linguistics.",
                "។ ការយល់ឃើញរបស់គាត់បានដាក់ចេញវិស័យសម័យទំនើបនៃភាសាវិទ្យាប្រៀបធៀប។"
              )}
            </p>
          </div>

          <FamilyTreeDiagram kh={kh} t={t} />
        </article>

        {/* Lord Monboddo */}
        <article
          className="relative rounded-2xl border-2 border-amber-800/70 p-5 sm:p-6 shadow-md overflow-hidden"
          style={PAPER}
          data-testid="pioneer-monboddo"
        >
          <CornerFlourish />
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
              {t("James Burnett, Lord Monboddo", "លោក James Burnett, Lord Monboddo")}
            </h3>
            <span className={`text-[11px] uppercase tracking-widest font-mono text-amber-800 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("1714 – 1799 · Scotland", "1714 – 1799 · ស្កុតឡែន")}
            </span>
          </div>
          <p className={`text-sm text-amber-950 mb-3 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Monboddo was a brilliant Scottish judge and philosopher who wrote a six-volume work called ",
              "លោក Monboddo ជាចៅក្រម និងទស្សនវិទូដ៏ឈ្លាសវៃជនជាតិស្កុត ដែលបានសរសេរស្នាដៃប្រាំមួយវ៉ុលដែលមានចំណងជើងថា "
            )}
            <em className={kh ? "" : "font-serif"}>{t("Of the Origin and Progress of Language", "«អំពីប្រភព និងការវិវត្តន៍នៃភាសា»")}</em>
            {t(
              " (1773–1792). In it he proposed two ideas that, in the eighteenth century, sounded almost like science fiction.",
              " (1773–1792)។ នៅក្នុងវា គាត់បានស្នើគំនិតពីរ ដែលនៅសតវត្សទីដប់ប្រាំបី ស្ដាប់ទៅស្ទើរតែដូចរឿងវិទ្យាសាស្ត្រប្រឌិត។"
            )}
          </p>

          <ul className="space-y-3 text-sm text-amber-950">
            <li className="flex items-start gap-3">
              <Sprout className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: MAHOGANY }} />
              <div className={kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}>
                <strong>{t("Humans evolved from earlier primates. ", "មនុស្សវិវត្តពីសត្វប្រៃមាតមុនៗ ។ ")}</strong>
                {t(
                  "Roughly eighty years before Charles Darwin, Monboddo argued that human beings shared a common ancestry with apes — a claim that scandalised polite society at the time.",
                  "ប្រហែលប៉ែតសិបឆ្នាំមុនលោក Charles Darwin លោក Monboddo បានអះអាងថា មនុស្សមានដូនតារួមជាមួយសត្វស្វា — ការអះអាងដែលបានធ្វើឱ្យសង្គមអភិជននាពេលនោះភ្ញាក់ផ្អើល។"
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: MAHOGANY }} />
              <div className={kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}>
                <strong>{t("Language is a tool we invented, not a gift. ", "ភាសាគឺជាឧបករណ៍ដែលយើងបានបង្កើត មិនមែនជាអំណោយទេ ។ ")}</strong>
                {t(
                  "He argued that language was not magically given to humans by the gods, but slowly invented and refined as our ancestors learned to hunt, farm and live together — a social technology built up across many generations.",
                  "គាត់បានអះអាងថា ភាសាមិនមែនត្រូវបានប្រទានឱ្យមនុស្សដោយអាថ៌កំបាំងពីព្រះទេ ប៉ុន្តែត្រូវបានបង្កើត និងកែលម្អបន្តិចម្ដងៗ ខណៈដូនតារបស់យើងបានរៀនបរបាញ់ ដាំដុះ និងរស់នៅជាមួយគ្នា — ជាបច្ចេកវិទ្យាសង្គមដែលត្រូវបានសាងសង់ឆ្លងកាត់ជំនាន់ជាច្រើន។"
                )}
              </div>
            </li>
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            <VocabChip en="Pre-Darwinian"      kh="មុនសម័យ Darwin"     k={kh} />
            <VocabChip en="Origin of language" kh="ប្រភពនៃភាសា"         k={kh} />
            <VocabChip en="Social tool"        kh="ឧបករណ៍សង្គម"         k={kh} />
          </div>
        </article>
      </div>
    </section>
  );
}

function FamilyTreeDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto rounded-xl border-2 border-amber-900/50 mt-1"
      style={{ backgroundColor: "#fdf6e3" }}
      role="img"
      aria-label={t(
        "An Indo-European family tree: a single root labelled Proto-Indo-European branches upward into three labelled lines — Sanskrit on the left going to modern languages of South Asia, Latin in the middle going to French Spanish Italian, and Ancient Greek on the right going to modern Greek.",
        "ដើមឈើគ្រួសារឥណ្ឌូ-អឺរ៉ុប ៖ ឫសតែមួយដែលដាក់ឈ្មោះថាភាសាឥណ្ឌូ-អឺរ៉ុបបុរាណ ពុះឡើងជាបីខ្សែដែលដាក់ឈ្មោះ — សំស្ក្រឹតនៅខាងឆ្វេងទៅកាន់ភាសាសម័យទំនើបនៃអាស៊ីខាងត្បូង ឡាតាំងនៅកណ្ដាលទៅកាន់បារាំង អេស្បាញ និងអ៊ីតាលី និងក្រិកបុរាណនៅខាងស្ដាំទៅកាន់ភាសាក្រិកសម័យទំនើប។"
      )}
      data-testid="family-tree-diagram"
    >
      <title>{t("Indo-European family tree", "ដើមឈើគ្រួសារភាសាឥណ្ឌូ-អឺរ៉ុប")}</title>

      {/* root */}
      <rect x="120" y="160" width="120" height="28" rx="4" fill={MAHOGANY} />
      <text x="180" y="178" fontSize="11" fill="#fef3c7" fontFamily="serif" fontWeight="bold" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ភាសាឥណ្ឌូ-អឺរ៉ុបបុរាណ" : "Proto-Indo-European"}
      </text>

      {/* trunk lines */}
      <line x1="180" y1="160" x2="60"  y2="100" stroke="#7c2d12" strokeWidth="1.6" />
      <line x1="180" y1="160" x2="180" y2="100" stroke="#7c2d12" strokeWidth="1.6" />
      <line x1="180" y1="160" x2="300" y2="100" stroke="#7c2d12" strokeWidth="1.6" />

      {/* branch 1 — Sanskrit */}
      <rect x="10" y="78" width="100" height="22" rx="3" fill="#fef3c7" stroke="#7c2d12" strokeWidth="1.2" />
      <text x="60" y="93" fontSize="10" fill={MAHOGANY} fontFamily="serif" fontWeight="bold" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "សំស្ក្រឹត" : "Sanskrit"}
      </text>
      <line x1="60" y1="78" x2="60" y2="50" stroke="#7c2d12" strokeWidth="1" strokeDasharray="2 2" />
      <text x="60" y="42" fontSize="9" fill={MAHOGANY} fontFamily="serif" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ហិណ្ឌី · បង់ឡា · សិង្ហល" : "Hindi · Bangla · Sinhala"}
      </text>

      {/* branch 2 — Latin */}
      <rect x="130" y="78" width="100" height="22" rx="3" fill="#fef3c7" stroke="#7c2d12" strokeWidth="1.2" />
      <text x="180" y="93" fontSize="10" fill={MAHOGANY} fontFamily="serif" fontWeight="bold" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឡាតាំង" : "Latin"}
      </text>
      <line x1="180" y1="78" x2="180" y2="50" stroke="#7c2d12" strokeWidth="1" strokeDasharray="2 2" />
      <text x="180" y="42" fontSize="9" fill={MAHOGANY} fontFamily="serif" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "បារាំង · អេស្បាញ · អ៊ីតាលី" : "French · Spanish · Italian"}
      </text>

      {/* branch 3 — Greek */}
      <rect x="250" y="78" width="100" height="22" rx="3" fill="#fef3c7" stroke="#7c2d12" strokeWidth="1.2" />
      <text x="300" y="93" fontSize="10" fill={MAHOGANY} fontFamily="serif" fontWeight="bold" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ក្រិកបុរាណ" : "Ancient Greek"}
      </text>
      <line x1="300" y1="78" x2="300" y2="50" stroke="#7c2d12" strokeWidth="1" strokeDasharray="2 2" />
      <text x="300" y="42" fontSize="9" fill={MAHOGANY} fontFamily="serif" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ក្រិកសម័យទំនើប" : "Modern Greek"}
      </text>

      {/* note: Khmer not on this tree */}
      <text x="10" y="195" fontSize="8" fill="#92400e" fontFamily="serif" fontStyle="italic" className={kh ? "font-khmer" : ""}>
        {kh ? "កំណត់ ៖ ភាសាខ្មែរស្ថិតក្នុងគ្រួសារខ្មែរ-ម៉ុនដាច់ដោយឡែក" : "Note: Khmer belongs to the separate Austroasiatic family"}
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Syntax: The Blueprint of Thought
//                វាក្យសម្ព័ន្ធ៖ ប្លង់នៃការគិត
// ════════════════════════════════════════════════════════════════════════════

function SectionSyntax({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mt-10 mb-10" data-testid="section-syntax">
      <SectionHeader
        spec="03"
        en="Syntax: The Blueprint of Thought"
        kh="វាក្យសម្ព័ន្ធ៖ ប្លង់នៃការគិត"
        kh_={kh}
      />

      {/* ── 3.1 The Invisible Rules ───────────────────────────────────── */}
      <div
        className="relative rounded-2xl border-2 border-amber-800/70 p-5 sm:p-7 shadow-md overflow-hidden mb-5"
        style={PAPER}
        data-testid="syntax-invisible-rules"
      >
        <CornerFlourish />
        <div className="flex items-center gap-2 mb-3">
          <ScrollText className="w-5 h-5" style={{ color: MAHOGANY }} />
          <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
            {t("The Invisible Rules", "ច្បាប់ដែលមើលមិនឃើញ")}
          </h3>
          <VocabChip
            en="Syntax"
            kh="វាក្យសម្ព័ន្ធ"
            k={kh}
          />
        </div>

        <p className={`text-sm text-amber-950 mb-3 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "Syntax is the set of invisible rules that governs the order of words in a sentence. Without it, language is just a pile of random words — a heap of bricks that has never become a house.",
            "វាក្យសម្ព័ន្ធ គឺជាសំណុំច្បាប់ដែលមើលមិនឃើញ ដែលគ្រប់គ្រងលំដាប់នៃពាក្យក្នុងប្រយោគ។ បើគ្មានវាទេ ភាសាគ្រាន់តែជាគំនរពាក្យចៃដន្យ — ជាគំនរឥដ្ឋដែលមិនដែលក្លាយជាផ្ទះ។"
          )}
        </p>

        <p className={`text-sm text-amber-950 mb-4 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "The classic example: the exact same five words can describe two completely different realities, just by changing their order.",
            "ឧទាហរណ៍បុរាណ៖ ពាក្យដូចគ្នាបេះបិទនេះអាចពណ៌នានូវការពិតពីរផ្សេងគ្នាស្រឡះ ដោយគ្រាន់តែផ្លាស់ប្ដូរលំដាប់របស់វា។"
          )}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Sentence A */}
          <div
            className="relative rounded-xl border-2 border-emerald-800/40 p-4 overflow-hidden bg-amber-50/60"
            data-testid="syntax-sentence-a"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-emerald-800" />
              <span className={`text-[10px] font-mono tracking-widest uppercase text-emerald-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Everyday event", "ព្រឹត្តិការណ៍ប្រចាំថ្ងៃ")}
              </span>
            </div>
            <p className={`text-base sm:text-lg text-amber-950 italic ${kh ? "font-khmer not-italic leading-loose" : "font-serif"}`}>
              {t("\u201CThe dog bit the man.\u201D", "«ឆ្កែ ខាំ បុរស។»")}
            </p>
            <p className={`mt-2 text-xs text-amber-900/80 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
              {t(
                "Boring. It happens every day, somewhere in the world.",
                "ធម្មតា។ វាកើតឡើងជារៀងរាល់ថ្ងៃ កន្លែងណាមួយក្នុងពិភពលោក។"
              )}
            </p>
          </div>

          {/* Sentence B */}
          <div
            className="relative rounded-xl border-2 border-rose-800/40 p-4 overflow-hidden bg-amber-50/60"
            data-testid="syntax-sentence-b"
          >
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4 text-rose-900" />
              <span className={`text-[10px] font-mono tracking-widest uppercase text-rose-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Breaking news", "ព័ត៌មានពិសេស")}
              </span>
            </div>
            <p className={`text-base sm:text-lg text-amber-950 italic ${kh ? "font-khmer not-italic leading-loose" : "font-serif"}`}>
              {t("\u201CThe man bit the dog.\u201D", "«បុរស ខាំ ឆ្កែ។»")}
            </p>
            <p className={`mt-2 text-xs text-amber-900/80 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
              {t(
                "Astonishing. The same five words — but a completely new reality, all because of word order.",
                "គួរឲ្យភ្ញាក់ផ្អើល។ ពាក្យដូចគ្នា — ប៉ុន្តែការពិតថ្មីទាំងស្រុង គ្រាន់តែដោយសារលំដាប់នៃពាក្យ។"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── 3.2 English vs. Khmer ─────────────────────────────────────── */}
      <div
        className="relative rounded-2xl border-2 border-amber-800/70 p-5 sm:p-7 shadow-md overflow-hidden mb-5"
        style={PAPER}
        data-testid="syntax-en-vs-kh"
      >
        <CornerFlourish />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Languages className="w-5 h-5" style={{ color: MAHOGANY }} />
          <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
            {t("English vs. Khmer", "អង់គ្លេស និងខ្មែរ")}
          </h3>
          <VocabChip en="SVO" kh="ប្រធាន-កិរិយា-កម្ម" k={kh} />
        </div>

        <p className={`text-sm text-amber-950 mb-4 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "Both English and Khmer generally follow Subject–Verb–Object (SVO) order at the sentence level — but the moment you zoom in on a noun phrase, the internal rule flips. The two languages are mirror images of each other.",
            "ទាំងភាសាអង់គ្លេស និងខ្មែរ ជាទូទៅប្រើលំដាប់ ប្រធាន–កិរិយាស័ព្ទ–កម្ម (SVO) នៅកម្រិតប្រយោគ — ប៉ុន្តែពេលអ្នកពិនិត្យឲ្យកាន់តែជិតលើឃ្លានាម ច្បាប់ខាងក្នុងបែរផ្ទុយ។ ភាសាទាំងពីរ ជារូបឆ្លុះរបស់គ្នាទៅវិញទៅមក។"
          )}
        </p>

        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          {/* English noun phrase */}
          <div
            className="relative rounded-xl border-2 border-amber-700/50 p-4 bg-amber-50/60 text-center"
            data-testid="syntax-noun-en"
          >
            <div className={`text-[10px] font-mono tracking-widest uppercase text-amber-900 mb-2 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {t("English · Adjective first", "អង់គ្លេស · គុណនាមមុន")}
            </div>
            <p className={`text-base sm:text-lg text-amber-950 italic mb-3 ${kh ? "font-khmer not-italic" : "font-serif"}`}>
              {t("\u201CThe red apple\u201D", "«The red apple»")}
            </p>
            <div className="inline-flex items-center gap-1 flex-wrap justify-center">
              <span className="px-2 py-1 rounded border border-rose-700/50 bg-rose-100/70 text-rose-900 text-[11px] font-bold tracking-wide">
                {kh ? "គុណនាម · red" : "ADJECTIVE · red"}
              </span>
              <ArrowRight className="w-3 h-3 text-amber-800" />
              <span className="px-2 py-1 rounded border border-amber-700/50 bg-amber-100/70 text-amber-900 text-[11px] font-bold tracking-wide">
                {kh ? "នាម · apple" : "NOUN · apple"}
              </span>
            </div>
          </div>

          {/* Mirror divider */}
          <div className="hidden sm:flex flex-col items-center justify-center text-amber-800">
            <ArrowRightLeft className="w-6 h-6" />
            <span className={`mt-1 text-[10px] font-mono uppercase tracking-widest ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {t("mirror", "ឆ្លុះ")}
            </span>
          </div>

          {/* Khmer noun phrase */}
          <div
            className="relative rounded-xl border-2 border-amber-700/50 p-4 bg-amber-50/60 text-center"
            data-testid="syntax-noun-kh"
          >
            <div className={`text-[10px] font-mono tracking-widest uppercase text-amber-900 mb-2 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {t("Khmer · Noun first", "ខ្មែរ · នាមមុន")}
            </div>
            <p className="text-base sm:text-lg text-amber-950 mb-1 font-khmer leading-loose">
              «ផ្លែប៉ោម ក្រហម»
            </p>
            <p className={`text-[11px] text-amber-900/80 mb-3 ${kh ? "font-khmer" : "font-serif italic"}`}>
              {t("(literally: \u201CApple red\u201D)", "(តាមព្យញ្ជនៈ៖ «Apple red»)")}
            </p>
            <div className="inline-flex items-center gap-1 flex-wrap justify-center">
              <span className="px-2 py-1 rounded border border-amber-700/50 bg-amber-100/70 text-amber-900 text-[11px] font-bold tracking-wide font-khmer">
                នាម · ផ្លែប៉ោម
              </span>
              <ArrowRight className="w-3 h-3 text-amber-800" />
              <span className="px-2 py-1 rounded border border-rose-700/50 bg-rose-100/70 text-rose-900 text-[11px] font-bold tracking-wide font-khmer">
                គុណនាម · ក្រហម
              </span>
            </div>
          </div>
        </div>

        <p className={`mt-4 text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          <strong className={kh ? "" : "font-bold"}>
            {t("The takeaway: ", "សាររួម៖ ")}
          </strong>
          {t(
            "When you translate between English and Khmer, the sentence-level structure usually lines up — but inside every noun phrase, you have to flip the order. Forgetting this is the single most common syntax mistake students make.",
            "ពេលអ្នកបកប្រែរវាងភាសាអង់គ្លេស និងខ្មែរ រចនាសម្ព័ន្ធកម្រិតប្រយោគជាធម្មតាស៊ីសង្វាក់គ្នា — ប៉ុន្តែខាងក្នុងឃ្លានាមនីមួយៗ អ្នកត្រូវផ្លាស់លំដាប់។ ការភ្លេចចំណុចនេះ គឺជាកំហុសវាក្យសម្ព័ន្ធដែលសិស្សធ្វើច្រើនបំផុត។"
          )}
        </p>
      </div>

      {/* ── 3.3 Sapir–Whorf · Does Language Shape Thought? ────────────── */}
      <div
        className="relative rounded-2xl border-2 border-amber-800/70 p-5 sm:p-7 shadow-md overflow-hidden"
        style={PAPER}
        data-testid="syntax-sapir-whorf"
      >
        <CornerFlourish />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Brain className="w-5 h-5" style={{ color: MAHOGANY }} />
          <h3 className={`text-lg sm:text-xl font-bold text-amber-950 ${kh ? "font-khmer" : "font-serif"}`}>
            {t("Does Language Shape Thought?", "តើភាសាបង្កើតការគិតមែនទេ?")}
          </h3>
          <VocabChip en="Sapir–Whorf Hypothesis" kh="សម្មតិកម្ម Sapir–Whorf" k={kh} />
        </div>

        <p className={`text-sm text-amber-950 mb-3 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
          {t(
            "In the early 20th century, the American linguists Edward Sapir and his student Benjamin Lee Whorf proposed an unsettling idea now known as ",
            "នៅដើមសតវត្សទី ២០ អ្នកភាសាវិទ្យាអាមេរិកាំង Edward Sapir និងសិស្សរបស់គាត់ Benjamin Lee Whorf បានស្នើគំនិតមួយដ៏គួរឲ្យភ្ញាក់ផ្អើល ដែលឥឡូវនេះត្រូវបានគេស្គាល់ថា "
          )}
          <strong>{t("Linguistic Relativity", "ទ្រឹស្ដីភាពទាក់ទងភាសា")}</strong>
          {t(
            ": the structure of the language you speak may quietly shape — perhaps even limit — the way you perceive the world.",
            "៖ រចនាសម្ព័ន្ធនៃភាសាដែលអ្នកនិយាយ អាចបង្កើតរូបរាង — ហើយប្រហែលជាកម្រិត — របៀបដែលអ្នកយល់ឃើញពិភពលោក។"
          )}
        </p>

        <blockquote
          className={`relative pl-5 border-l-4 italic text-amber-950 mb-4 ${kh ? "font-khmer not-italic leading-loose" : "font-serif"}`}
          style={{ borderColor: MAHOGANY }}
        >
          <Quote className="absolute -left-3 -top-1 w-4 h-4 bg-[#fbf3df]" style={{ color: MAHOGANY }} aria-hidden="true" />
          <span className="text-base">
            {t(
              "\u201CThe limits of my language mean the limits of my world.\u201D",
              "«ដែនកំណត់នៃភាសារបស់ខ្ញុំ មានន័យថាដែនកំណត់នៃពិភពលោករបស់ខ្ញុំ។»"
            )}
          </span>
          <span className={`block mt-1 text-xs not-italic text-amber-900/80 ${kh ? "font-khmer" : "font-serif"}`}>
            — Ludwig Wittgenstein
          </span>
        </blockquote>

        {/* Thought experiment */}
        <div
          className="rounded-xl border-2 border-amber-800/40 bg-amber-50/60 p-4 sm:p-5"
          data-testid="syntax-thought-experiment"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Sparkles className="w-4 h-4" style={{ color: MAHOGANY }} />
            <span className={`text-[10px] font-mono tracking-widest uppercase text-amber-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {t("Thought experiment", "ការពិសោធន៍គំនិត")}
            </span>
            <span className={`text-[11px] text-amber-900/70 ${kh ? "font-khmer" : "font-serif italic"}`}>
              {t("Guugu Yimithirr · north-east Australia", "Guugu Yimithirr · ភាគឦសានអូស្ត្រាលី")}
            </span>
          </div>

          <p className={`text-sm text-amber-950 mb-4 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "Imagine a language with no words for ",
              "ស្រមៃថាមានភាសាមួយដែលគ្មានពាក្យសម្រាប់ "
            )}
            <strong>{t("\u201Cleft\u201D", "«ឆ្វេង»")}</strong>
            {t(" or ", " ឬ ")}
            <strong>{t("\u201Cright.\u201D", "«ស្ដាំ»")}</strong>
            {t(
              " To say where anything is, speakers must use the absolute compass directions: ",
              " ដើម្បីប្រាប់ថារបស់អ្វីនៅទីណា អ្នកនិយាយត្រូវតែប្រើទិសត្រីវិស័យដាច់ខាត៖ "
            )}
            <strong>{t("North, South, East, West", "ខាងជើង ខាងត្បូង ខាងកើត ខាងលិច")}</strong>
            {t(
              ". \u201CYour cup is on the north side of the table.\u201D \u201CCould you move a little to the east?\u201D",
              "។ «ពែងរបស់អ្នកនៅផ្នែកខាងជើងនៃតុ។» «តើអ្នកអាចផ្លាស់បន្តិចទៅខាងកើតបានទេ?»"
            )}
          </p>

          {/* Side-by-side compass comparison */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg border border-amber-700/40 bg-amber-100/40 p-3 text-center">
              <div className={`text-[10px] font-mono tracking-widest uppercase text-amber-900 mb-2 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Most languages · relative", "ភាសាភាគច្រើន · ប្រៀបធៀប")}
              </div>
              <div className="flex items-center justify-center gap-2 text-amber-900 font-serif italic text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>{t("left", "ឆ្វេង")}</span>
                <span className="opacity-40">·</span>
                <span>{t("right", "ស្ដាំ")}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <p className={`mt-2 text-[11px] text-amber-900/80 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
                {t(
                  "Depends on which way you are facing.",
                  "អាស្រ័យលើទិសដៅដែលអ្នកកំពុងបែរមុខ។"
                )}
              </p>
            </div>

            <div className="rounded-lg border border-amber-700/40 bg-amber-100/40 p-3 text-center">
              <div className={`text-[10px] font-mono tracking-widest uppercase text-amber-900 mb-2 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Guugu Yimithirr · absolute", "Guugu Yimithirr · ដាច់ខាត")}
              </div>
              <div className="flex items-center justify-center gap-2 text-amber-900 font-serif italic text-sm">
                <Compass className="w-5 h-5" style={{ color: MAHOGANY }} />
                <span className="font-bold not-italic font-mono tracking-wider text-amber-950">N · S · E · W</span>
              </div>
              <p className={`mt-2 text-[11px] text-amber-900/80 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
                {t(
                  "Always anchored to the sun and the land.",
                  "បង្គាប់ជានិច្ចទៅព្រះអាទិត្យ និងផែនដី។"
                )}
              </p>
            </div>
          </div>

          <p className={`text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "font-serif leading-relaxed"}`}>
            {t(
              "The astonishing result: Guugu Yimithirr speakers grow up with what feels like an absolute, near-perfect sense of direction. Their syntax forces their brain to constantly track the sun, the wind, and the land — just to speak a normal sentence. The language doesn't only describe their world; it appears to help build the mental map they walk around with.",
              "លទ្ធផលគួរឲ្យភ្ញាក់ផ្អើល៖ អ្នកនិយាយ Guugu Yimithirr ធំដឹងក្ដីមកជាមួយនូវអ្វីដែលហាក់ដូចជាការយល់ឃើញទិសដៅដាច់ខាត និងស្ទើរតែឥតខ្ចោះ។ វាក្យសម្ព័ន្ធរបស់ពួកគេ បង្ខំខួរក្បាលឲ្យតាមដានព្រះអាទិត្យ ខ្យល់ និងផែនដីរហូត — គ្រាន់តែដើម្បីនិយាយប្រយោគធម្មតាមួយ។ ភាសាមិនត្រឹមតែពណ៌នាពិភពលោករបស់ពួកគេទេ — វាហាក់ដូចជាជួយសាងសង់ផែនទីផ្លូវចិត្តដែលពួកគេយកទៅតាមខ្លួន។"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════════════════════

function VocabChip({
  en,
  kh,
  k,
}: {
  en: string;
  kh: string;
  k: boolean;
}) {
  return (
    <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border border-amber-700/50 text-amber-900 bg-amber-100/70 ${k ? "font-khmer" : "font-serif"}`}>
      {k ? kh : en}
    </span>
  );
}

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-50 rounded px-2 py-0.5 shadow-sm" style={{ backgroundColor: MAHOGANY }}>
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-amber-950 ${kh_ ? "font-khmer" : "font-serif"}`}>
        {kh_ ? kh : en}
      </h2>
      <ScrollText className="w-4 h-4 ml-1" style={{ color: MAHOGANY }} aria-hidden="true" />
      <div className="flex-1 border-t-2 border-dotted border-amber-800/50" />
    </div>
  );
}
