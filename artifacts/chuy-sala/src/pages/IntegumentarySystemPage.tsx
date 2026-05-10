import { Link } from "wouter";
import { ArrowLeft, Shield, Sun, Thermometer, Layers, Fingerprint, Zap, Palette } from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ═══════════════════════════════════════════════════════════════════════════
 *  Integumentary System Page
 *  ប្រព័ន្ធស្បែក
 *
 *  Palette: deep warm brown / amber / terracotta — organic, skin-toned.
 * ══════════════════════════════════════════════════════════════════════════ */

const BG         = "#100804";
const PANEL      = "#1d1008";
const PANEL_SOFT = "#2c1a0c";
const AMBER      = "#d97706";
const GOLD       = "#f59e0b";
const ROSE       = "#e55d3b";
const HYPO       = "#a78bfa";
const PALE       = "#fff8f0";
const TEXT       = "#fde8d0";
const TEXT_DIM   = "#f6a860";
const TEXT_MUTED = "#c2884e";

const EPI_COL    = "#e55d3b";   // epidermis — rose/terracotta
const DER_COL    = "#d97706";   // dermis — amber
const HYP_COL    = "#a78bfa";   // hypodermis — lavender

function glow(c: string, r = 8) {
  return `0 0 ${r}px ${c}55, 0 0 ${r * 2}px ${c}22`;
}

function SectionTitle({ icon: Icon, en, kh, id }: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; style?: React.CSSProperties }>;
  en: string; kh: string; id?: string;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden style={{ color: GOLD } as React.CSSProperties} />
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: PALE }}>{en}</h2>
      </div>
      <p className="font-khmer text-base sm:text-lg" style={{ color: TEXT_DIM }}>{kh}</p>
    </header>
  );
}

function Card({ children, highlight = false, accent, className = "" }: {
  children: React.ReactNode; highlight?: boolean; accent?: string; className?: string;
}) {
  const col = accent ?? AMBER;
  return (
    <div className={`rounded-2xl p-5 sm:p-6 border ${className}`} style={{
      background: highlight ? PANEL_SOFT : PANEL,
      borderColor: `${col}44`,
      boxShadow: highlight ? glow(col, 6) : "none",
    }}>
      {children}
    </div>
  );
}

/* ── SVG Illustrations ── */

function SkinCrossSectionSvg() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="Cross-section of the three skin layers">
      {/* Background */}
      <rect x="0" y="0" width="200" height="160" rx="12" fill={PANEL_SOFT} />

      {/* Epidermis band */}
      <rect x="10" y="12" width="180" height="34" rx="6" fill={EPI_COL} opacity="0.85" />
      <text x="100" y="24" textAnchor="middle" fill={PALE} fontSize="9" fontWeight="bold">Epidermis</text>
      <text x="100" y="37" textAnchor="middle" fill={PALE} fontSize="7.5" fontFamily="serif">អេពីឌែម</text>

      {/* Dermis band */}
      <rect x="10" y="50" width="180" height="48" rx="4" fill={DER_COL} opacity="0.75" />
      <text x="100" y="66" textAnchor="middle" fill={PALE} fontSize="9" fontWeight="bold">Dermis</text>
      <text x="100" y="78" textAnchor="middle" fill={PALE} fontSize="7.5" fontFamily="serif">ឌែម</text>
      {/* Hair follicle */}
      <path d="M 60 50 Q 65 80, 60 100" fill="none" stroke={PALE} strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="60" cy="48" rx="3" ry="2" fill={PALE} opacity="0.6" />
      {/* Sweat gland coil */}
      <path d="M 130 52 Q 140 65, 130 75 Q 120 85, 130 90" fill="none" stroke={PALE} strokeWidth="1.2" opacity="0.5" strokeDasharray="2 2" />
      {/* Blood vessel */}
      <path d="M 20 72 Q 60 65, 100 72 Q 140 79, 180 72" fill="none" stroke="#f87171" strokeWidth="2" opacity="0.6" />

      {/* Hypodermis band */}
      <rect x="10" y="102" width="180" height="46" rx="4" fill={HYP_COL} opacity="0.55" />
      <text x="100" y="120" textAnchor="middle" fill={PALE} fontSize="9" fontWeight="bold">Hypodermis</text>
      <text x="100" y="133" textAnchor="middle" fill={PALE} fontSize="7.5" fontFamily="serif">ស្រទាប់ខ្លាញ់</text>
      {/* Fat cells */}
      {[30,60,90,120,150].map((x, i) => (
        <ellipse key={i} cx={x} cy={128} rx="10" ry="8" fill={HYP_COL} opacity="0.4" stroke={PALE} strokeWidth="0.5" />
      ))}

      {/* Depth arrows */}
      <line x1="195" y1="12" x2="195" y2="148" stroke={TEXT_MUTED} strokeWidth="1" strokeDasharray="2 2" />
      <text x="197" y="155" fill={TEXT_MUTED} fontSize="7">↓ depth</text>
    </svg>
  );
}

function ShieldSvg() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" role="img" aria-label="Shield — protection">
      <path d="M32 6 L52 14 L52 32 Q52 48 32 58 Q12 48 12 32 L12 14 Z"
        fill={PANEL_SOFT} stroke={AMBER} strokeWidth="2" />
      <path d="M32 14 L44 20 L44 32 Q44 42 32 50 Q20 42 20 32 L20 20 Z"
        fill={AMBER} opacity="0.25" />
      <path d="M26 32 L30 36 L38 27" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunSvg() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" role="img" aria-label="Sun — Vitamin D synthesis">
      <circle cx="32" cy="32" r="12" fill={GOLD} opacity="0.9" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 32 + 16 * Math.cos(rad);
        const y1 = 32 + 16 * Math.sin(rad);
        const x2 = 32 + 24 * Math.cos(rad);
        const y2 = 32 + 24 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function ThermometerSvg() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" role="img" aria-label="Thermometer — temperature regulation">
      <rect x="28" y="10" width="8" height="32" rx="4" fill={PANEL_SOFT} stroke={ROSE} strokeWidth="1.5" />
      <rect x="30" y="20" width="4" height="22" rx="2" fill={ROSE} opacity="0.8" />
      <circle cx="32" cy="48" r="7" fill={ROSE} opacity="0.9" />
      <circle cx="32" cy="48" r="4" fill={PALE} opacity="0.3" />
    </svg>
  );
}

function NerveSvg() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" role="img" aria-label="Nerve ending — sensation">
      <path d="M12 32 Q20 22, 28 32 Q36 42, 44 32 Q50 24, 52 28" fill="none" stroke={HYPO} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="32" r="4" fill={HYPO} opacity="0.7" />
      <circle cx="52" cy="28" r="5" fill={HYPO} opacity="0.8" />
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={52} y1={28} x2={52 + 7 * Math.cos(rad)} y2={28 + 7 * Math.sin(rad)} stroke={HYPO} strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ══════════════════════════════════════════════════════════════════════════ */

export default function IntegumentarySystemPage() {
  const t = useTranslation();

  const layers = [
    {
      nameEn: "Epidermis",
      nameKh: "អេពីឌែម — ស្រទាប់ក្រៅ",
      badge: t("Outermost layer", "ស្រទាប់ខាងក្រៅ"),
      color: EPI_COL,
      emoji: "🛡️",
      bodyEn: "The waterproof outer barrier — constantly sheds dead cells (we shed 30,000–40,000 every hour), creates our skin tone using a pigment called melanin, and acts as the first line of defence against bacteria, viruses, and UV radiation.",
      bodyKh: "ស្រទាប់ការពារខាងក្រៅ — បន្តបញ្ចេញកោសិកាស្លាប់ (30,000–40,000 ក្នុងមួយម៉ោង) ផ្លាស់ប្ដូរពណ៌ស្បែកតាម melanin ហើយការពារបាក់តេរី វីរស និងកំណែ UV។",
      factEn: "The epidermis contains no blood vessels — it gets nutrients entirely by diffusion from the dermis below.",
      factKh: "អេពីឌែមមិនមានសរសៃឈាម — វាទទួលសារជាតិចិញ្ចឹមតែពីការរាលដាលពី dermis ខាងក្រោម។",
    },
    {
      nameEn: "Dermis",
      nameKh: "ឌែម — ស្រទាប់កណ្តាល",
      badge: t("Middle engine room", "ស្រទាប់ម៉ាស៊ីន"),
      color: DER_COL,
      emoji: "⚙️",
      bodyEn: "The thick middle layer and the true engine room of the skin. Contains sweat glands, hair follicles, nerve endings, and blood vessels. Relies on two key proteins — collagen (for strength) and elastin (for flexibility) — to keep skin firm and elastic.",
      bodyKh: "ស្រទាប់កណ្តាលក្រាស ពោរពេញដោយក្រពេញ​ញើស follicle​សក់ ចុងប្រសាទ និងសរសៃឈាម។ ពឹងផ្អែកលើ collagen (ភាពរឹងមាំ) និង elastin (ភាពបត់បែន)។",
      factEn: "Dermis is 15–40× thicker than the epidermis and makes up around 90% of the skin's total thickness.",
      factKh: "ស្រទាប់ dermis ក្រាស 15–40 ដងជាង epidermis ហើយស្មើ 90% នៃសរុបស្រទាប់ស្បែក។",
    },
    {
      nameEn: "Hypodermis",
      nameKh: "ស្រទាប់ខ្លាញ់ — ខាងក្រោម",
      badge: t("Deepest base layer", "ស្រទាប់ជ្រៅបំផុត"),
      color: HYP_COL,
      emoji: "🧬",
      bodyEn: "The deepest base layer made of fat cells (adipocytes) and connective tissue. It anchors the skin to the underlying muscles and bones, insulates the body against cold, absorbs physical shock, and stores energy reserves.",
      bodyKh: "ស្រទាប់ខ្លាញ់ (adipocytes) និងជាលិការ connective នៅជ្រៅបំផុត។ ភ្ជាប់ស្បែកទៅសាច់ ការពារក្តៅ ស្រូបទឹក ហើយស្ដុកថាមពល។",
      factEn: "The hypodermis varies enormously by body region — it is just a few millimetres on the eyelids but up to 3 cm thick on the abdomen.",
      factKh: "ក្រាសខុសគ្នា — ពីរ mm នៅការ​ ​ 3 cm នៅពោះ។",
    },
  ];

  const functions = [
    {
      icon: ShieldSvg,
      titleEn: "Protection",
      titleKh: "ការការពារ",
      color: AMBER,
      descEn: "Blocks harmful bacteria, viruses, fungi, and UV radiation from reaching internal organs. The slightly acidic surface (pH 4.5–5.5) — known as the acid mantle — creates a hostile environment for most pathogens.",
      descKh: "ទប់ស្កាត់បាក់តេរី វីរស ផ្សិត និង UV ។ pH ស្បែក (4.5–5.5) បង្កើត acid mantle ចាប់បង្ក pathogen ។",
    },
    {
      icon: ThermometerSvg,
      titleEn: "Temperature Regulation",
      titleKh: "ការគ្រប់គ្រងសីតុណ្ហភាព",
      color: ROSE,
      descEn: "When hot: sweat glands release sweat which evaporates and cools the body. When cold: blood vessels in the dermis constrict to conserve heat and tiny muscles around hair follicles contract — causing goosebumps.",
      descKh: "ត្រជាក់: ក្រពេញញើសស្រូប ញើស ដើម្បីត្រជាក់ ។ ត្រជាក់: សរសៃឈាម收缩 ដើម្បីរក្សាកំដៅ ស្ករចង្វាស ។",
    },
    {
      icon: NerveSvg,
      titleEn: "Sensation",
      titleKh: "អារម្មណ៍",
      color: HYPO,
      descEn: "Packed with millions of specialised nerve endings that detect touch, pressure, vibration, pain, itch, and temperature changes. Different types of receptor (Meissner's, Pacinian, Merkel's) each respond to a different kind of stimulus.",
      descKh: "ពោរពេញដោយ receptor ប្រសាទ ច្រើនប្រភេទ (Meissner Pacinian Merkel) — ប្រតិកម្មចំពោះ ការប៉ះ សម្ពាធ ការឈឺ សីតុណ្ហភាព។",
    },
    {
      icon: SunSvg,
      titleEn: "Vitamin D Synthesis",
      titleKh: "ការបង្កើតវីតាមីន D",
      color: GOLD,
      descEn: "When UV-B rays from sunlight hit the skin, a cholesterol compound in the epidermis is converted into previtamin D₃, which the body then activates in the liver and kidneys. Vitamin D is essential for calcium absorption and bone health.",
      descKh: "UV-B ពី ព្រះ​អាទិត្យ បំលែង cholesterol ក្នុង epidermis ទៅជា previtamin D₃ — ដែល ថ្លើម និង តម្រងនោម បំលែងបន្ត ។ វីតាមីន D ចាំបាច់សម្រាប់ឆ្អឹង ។",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>

      {/* Warm background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 20% 0%, ${AMBER}10, transparent 50%),
                       radial-gradient(ellipse at 80% 100%, ${ROSE}08, transparent 50%)`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Back link */}
        <Link href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: GOLD }}>
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* ── HERO ── */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${AMBER}`, color: AMBER }}>
            <Fingerprint className="w-3.5 h-3.5" aria-hidden />
            {t("Biology · Human Body", "ជីវវិទ្យា · រាងកាយ")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: PALE }}>
            {t("The Integumentary System", "ប្រព័ន្ធស្បែក")}
          </h1>
          <p className="font-khmer text-2xl sm:text-3xl mb-6" style={{ color: GOLD }}>
            ប្រព័ន្ធស្បែក
          </p>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: TEXT }}>
            {t(
              "The body's largest organ system — a waterproof protective shield, a dynamic temperature regulator, and a complex sensory network that covers every square centimetre of your body.",
              "ប្រព័ន្ធសរីរាង្គធំបំផុតរបស់រាងកាយ — ជាស្រទាប់ការពារ បញ្ចៀសសីតុណ្ហភាព ហើយជាបណ្ដាញ​ប្រសាទ​ស្មុគ​ស្មាញ ។"
            )}
          </p>
        </header>

        <div className="space-y-14 sm:space-y-20">

          {/* ═══ SECTION 1: THREE LAYERS ═══ */}
          <section aria-labelledby="layers-heading">
            <SectionTitle icon={Layers} en="The Three Layers" kh="ស្រទាប់ទាំងបីនៃស្បែក" id="layers-heading" />

            {/* Cross-section illustration */}
            <div className="mb-8 max-w-xs mx-auto">
              <SkinCrossSectionSvg />
            </div>

            {/* Layer cards — vertically stacked with increasing visual depth */}
            <div className="space-y-4">
              {layers.map((layer, i) => (
                <div key={i} className="rounded-2xl border overflow-hidden" style={{
                  background: PANEL,
                  borderColor: `${layer.color}55`,
                  marginLeft: `${i * 0}px`,
                  boxShadow: `0 0 12px ${layer.color}22`,
                }}>
                  {/* Layer header band */}
                  <div className="px-5 py-3 flex items-center gap-3" style={{
                    background: `${layer.color}22`,
                    borderBottom: `1px solid ${layer.color}44`,
                  }}>
                    <span className="text-xl" aria-hidden="true">{layer.emoji}</span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg" style={{ color: layer.color }}>
                        {layer.nameEn}
                      </h3>
                      <p className="font-khmer text-sm" style={{ color: TEXT_DIM }}>{layer.nameKh}</p>
                    </div>
                    <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full" style={{
                      background: `${layer.color}33`, color: layer.color,
                    }}>
                      {layer.badge}
                    </span>
                  </div>
                  {/* Layer content */}
                  <div className="px-5 py-4 grid sm:grid-cols-2 gap-4">
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(layer.bodyEn, layer.bodyKh)}
                    </p>
                    <div className="rounded-xl px-4 py-3 border-l-2" style={{
                      background: PANEL_SOFT, borderColor: layer.color,
                    }}>
                      <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: layer.color }}>
                        {t("Key fact", "ចំណុចសំខាន់")}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
                        {t(layer.factEn, layer.factKh)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ NEW SECTION: SKIN COLOR ═══ */}
          <section aria-labelledby="skin-color-heading">
            <SectionTitle icon={Palette} en="The Science of Skin Color" kh="វិទ្យាសាស្ត្រនៃពណ៌ស្បែក" id="skin-color-heading" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card accent={EPI_COL}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border shrink-0" style={{ background: PANEL_SOFT, borderColor: `${EPI_COL}44` }}>
                    <Fingerprint className="w-6 h-6" style={{ color: EPI_COL }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-2" style={{ color: EPI_COL }}>
                      {t("Melanocytes & Melanin", "មេឡាណូស៊ីត និង មេឡានីន")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(
                        "Specialized cells in the epidermis called melanocytes produce a pigment called melanin. Everyone has roughly the same number of these cells; the difference in skin color comes from how much and what type of melanin they produce.",
                        "កោសិកាពិសេសនៅក្នុងអេពីឌែម (មេឡាណូស៊ីត) ផលិតជាតិពណ៌ហៅថាមេឡានីន។ មនុស្សគ្រប់រូបមានចំនួនកោសិកាទាំងនេះប្រហែលគ្នា ការខុសប្លែកគ្នានៃពណ៌ស្បែកគឺមកពីចំនួន និងប្រភេទមេឡានីនដែលពួកវាផលិត។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              <Card accent={GOLD}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border shrink-0" style={{ background: PANEL_SOFT, borderColor: `${GOLD}44` }}>
                    <Palette className="w-6 h-6" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-2" style={{ color: GOLD }}>
                      {t("Types of Pigment", "ប្រភេទជាតិពណ៌")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(
                        "There are two primary types of melanin: Eumelanin produces rich brown and black tones, while Pheomelanin produces lighter red and yellow tones.",
                        "Eumelanin បង្កើតពណ៌ត្នោតនិងខ្មៅដ៏ស្រស់ស្អាត ចំណែកឯ Pheomelanin បង្កើតពណ៌ក្រហមនិងលឿងស្រាលជាង។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="md:col-span-2">
                <Card highlight accent={AMBER}>
                  <div className="flex items-start gap-5">
                    <div className="hidden sm:flex flex-col gap-2 shrink-0 items-center justify-center mt-1">
                      <Sun className="w-6 h-6" style={{ color: GOLD }} />
                      <div className="w-0.5 h-6 opacity-40" style={{ background: AMBER }}></div>
                      <Shield className="w-6 h-6" style={{ color: HYPO }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-2" style={{ color: PALE }}>
                        {t("The Evolutionary Balance", "តុល្យភាពវិវត្តន៍")}
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: TEXT }}>
                        {t(
                          "High melanin concentrations act as a natural sunscreen, protecting DNA and vital nutrients (like folate) from intense UV radiation near the equator.",
                          "កំហាប់មេឡានីនខ្ពស់ដើរតួជាឡេការពារកម្តៅថ្ងៃធម្មជាតិ ដែលការពារ DNA និងសារធាតុចិញ្ចឹមសំខាន់ៗពីកាំរស្មី UV ខ្លាំងនៅជិតអេក្វាទ័រ។"
                        )}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
                        {t(
                          "Conversely, lower melanin concentrations in northern latitudes allow enough sunlight to penetrate the skin to synthesize Vitamin D, which is crucial for bone health.",
                          "ផ្ទុយទៅវិញ កំហាប់មេឡានីនទាបនៅរយៈទទឹងភាគខាងជើង អនុញ្ញាតឱ្យពន្លឺព្រះអាទិត្យជ្រាបចូលស្បែកគ្រប់គ្រាន់ដើម្បីបង្កើតវីតាមីន D ដែលមានសារៈសំខាន់សម្រាប់សុខភាពឆ្អឹង។"
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* ═══ SECTION 2: CORE FUNCTIONS ═══ */}
          <section aria-labelledby="functions-heading">
            <SectionTitle icon={Shield} en="Core Functions" kh="មុខងារចម្បង" id="functions-heading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {functions.map((fn, i) => {
                const IconSvg = fn.icon;
                return (
                  <Card key={i} highlight={i === 0} accent={fn.color}>
                    <div className="mb-3">
                      <IconSvg />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1" style={{ color: fn.color }}>
                      {t(fn.titleEn, fn.titleKh)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(fn.descEn, fn.descKh)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ═══ SECTION 3: HAIR & NAILS ═══ */}
          <section aria-labelledby="hair-nails-heading">
            <SectionTitle icon={Zap} en="Hair & Nails" kh="សក់ និងក្រចក" id="hair-nails-heading" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card highlight accent={AMBER}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0" aria-hidden="true">💈</span>
                  <div>
                    <h3 className="font-bold text-base mb-2" style={{ color: GOLD }}>
                      {t("Hair — Keratin Filaments", "សក់ — ខ្សែ Keratin")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(
                        "Hair grows from follicles rooted in the dermis. It is made almost entirely of a tough protein called keratin — the same protein that makes up nails and the outer layer of skin. Body hair protects the scalp from UV radiation, the eyes from dust and sweat, and helps regulate temperature.",
                        "សក់លូតចេញពី follicle ក្នុង dermis ។ ផ្សំដោយ keratin ដូចគ្នាទៅនឹងក្រចក ។ ការពារ UV ហើយជួយ​គ្រប់គ្រង​សីតុណ្ហភាព ។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              <Card accent={ROSE}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0" aria-hidden="true">💅</span>
                  <div>
                    <h3 className="font-bold text-base mb-2" style={{ color: ROSE }}>
                      {t("Nails — Hard Keratin Plates", "ក្រចក — ក្ដារ Keratin រឹង")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                      {t(
                        "Nails are specialised plates of hardened keratin produced by cells at the nail matrix (the base under the skin). They protect the sensitive nerve-rich fingertips and toe-tips from physical damage, and enhance our ability to pick up small objects and scratch.",
                        "ក្រចក​ជាក្ដារ keratin រឹង ផ្លិតពីកោសិកា nail matrix ។ ការពារ​ចុង​ម្រាម​ដៃ ដែល​ពោរពេញ​ចុង​ប្រសាទ ហើយ​ជួយ​ចាប់​វត្ថុ​តូច ។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="md:col-span-2" accent={HYPO}>
                <div className="flex gap-3">
                  <Fingerprint className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: HYPO } as React.CSSProperties} aria-hidden />
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: PALE }}>
                      {t("Why keratin?", "ហេតុអ្វីជ្រើស Keratin?")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
                      {t(
                        "Keratin is one of the toughest biological materials on Earth. Its tightly coiled protein chains can absorb impact without shattering, resist water penetration, and withstand the friction of daily life — yet grow continuously to replace any damage.",
                        "Keratin ជា​ជីវ​សម្ភារ​រឹង​ ស្រូប​ការ​ប៉ះ​ទង្គិច ទប់​ទឹក ហើយ​លូត​ជំនួស​ ​បន្តិច​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ═══ CLOSING CALLOUT ═══ */}
          <div className="rounded-2xl p-6 sm:p-8 border" style={{
            background: PANEL_SOFT,
            borderColor: `${AMBER}44`,
            boxShadow: glow(AMBER, 4),
          }}>
            <p className="font-bold text-base mb-2" style={{ color: PALE }}>
              {t("The Bottom Line", "សេចក្ដីសន្និដ្ឋាន")}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
              {t(
                "Your skin is not just a passive wrapper — it is a living, breathing, self-repairing organ that you replace almost entirely every 2–3 weeks. At any given moment it is waging a microscopic war against pathogens, fine-tuning your body temperature, gathering sensory data, and manufacturing a vitamin your bones cannot live without.",
                "ស្បែករបស់អ្នក មិនមែនគ្រាន់តែជាស្រទាប់ ប៉ុស្ដើម ។ វាជាសរីរាង្គ ដែលជួស​ជុល​ខ្លួន​ ដោយ​ស្វ័យ​ប្រវត្តិ​ ក្នុងរយៈ 2–3 សប្ដាហ៍ ។"
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
