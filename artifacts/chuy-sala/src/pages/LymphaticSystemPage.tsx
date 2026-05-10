import { Link } from "wouter";
import { ArrowLeft, Shield, Droplets, Filter, Activity, AlertCircle } from "lucide-react";
import { useTranslation } from "@/store/use-language";

const BG         = "#021a14";
const PANEL      = "#062b1f";
const PANEL_SOFT = "#0a3d2c";
const TEAL       = "#0d9488";
const AQUA       = "#2dd4bf";
const GOLD       = "#f59e0b";
const PALE       = "#f0fdf4";
const TEXT       = "#ccfbf1";
const TEXT_DIM   = "#5eead4";
const PURPLE     = "#a78bfa";

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
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden style={{ color: AQUA } as React.CSSProperties} />
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: PALE }}>{en}</h2>
      </div>
      <p className="font-khmer text-base sm:text-lg" style={{ color: TEXT_DIM }}>{kh}</p>
    </header>
  );
}

function Card({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 border" style={{
      background: highlight ? PANEL_SOFT : PANEL,
      borderColor: `${TEAL}44`,
      boxShadow: highlight ? glow(TEAL, 6) : "none",
    }}>
      {children}
    </div>
  );
}

function MacrophageSvg() {
  return (
    <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto" role="img" aria-label="Macrophage engulfing a pathogen">
      <path d="M60 18 C80 10,102 22,108 42 C114 62,100 82,80 88 C60 94,36 86,22 68 C8 50,18 24,40 18 C48 15,55 20,60 18 Z"
        fill={PANEL_SOFT} stroke={TEAL} strokeWidth="1.5" />
      <path d="M108 42 C118 36,116 28,110 30" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 68 C10 74,8 66,14 62" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="55" cy="50" rx="18" ry="13" fill={TEAL} opacity="0.25" stroke={AQUA} strokeWidth="1" />
      <ellipse cx="55" cy="50" rx="9" ry="6" fill={TEAL} opacity="0.5" />
      <circle cx="90" cy="38" r="8" fill="#ef4444" opacity="0.7" stroke="#fca5a5" strokeWidth="1" />
      <line x1="87" y1="35" x2="84" y2="32" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
      <line x1="90" y1="30" x2="90" y2="27" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
      <line x1="93" y1="35" x2="96" y2="32" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
      <path d="M82 36 A14 14 0 0 1 100 40" fill="none" stroke={AQUA} strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}

function LymphNodeSvg() {
  return (
    <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto" role="img" aria-label="Lymph node cross-section">
      <path d="M30 50 C30 24,48 14,64 14 C82 14,92 26,92 44 C92 66,78 86,62 86 C44 86,30 72,30 50 Z"
        fill={PANEL_SOFT} stroke={AQUA} strokeWidth="1.5" />
      <path d="M30 50 C36 46,36 54,30 50" fill={PANEL} stroke={AQUA} strokeWidth="1" />
      <ellipse cx="62" cy="45" rx="18" ry="22" fill="none" stroke={TEAL} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <ellipse cx="62" cy="45" rx="8" ry="10" fill={TEAL} opacity="0.2" />
      <line x1="62" y1="14" x2="62" y2="2" stroke={AQUA} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="18" x2="42" y2="8" stroke={AQUA} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="86" x2="62" y2="98" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      {[{x:56,y:36},{x:66,y:40},{x:60,y:52},{x:70,y:55}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={AQUA} opacity="0.6" />
      ))}
    </svg>
  );
}

function ShieldSvg() {
  return (
    <svg viewBox="0 0 100 110" className="w-20 h-20 mx-auto" role="img" aria-label="Immunity shield">
      <path d="M50 6 L90 22 L90 54 C90 76,72 96,50 104 C28 96,10 76,10 54 L10 22 Z"
        fill={PANEL_SOFT} stroke={AQUA} strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 6px ${TEAL}88)` } as React.CSSProperties} />
      <path d="M50 18 L78 30 L78 54 C78 70,66 84,50 92 C34 84,22 70,22 54 L22 30 Z"
        fill="none" stroke={TEAL} strokeWidth="1" opacity="0.5" />
      <path d="M34 56 L45 68 L68 40" fill="none" stroke={AQUA} strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LymphaticSystemPage() {
  const t = useTranslation();

  const keyFacts = [
    {
      emoji: "🫀",
      titleEn: "No Active Pump",
      titleKh: "គ្មានចង្វាក់សង្ហត",
      bodyEn: "Unlike the blood circulatory system, the lymphatic system has no heart to pump it. It relies on muscle contractions, body movement, and deep breathing to keep lymph fluid circulating.",
      bodyKh: "ខុសពីប្រព័ន្ធឈាមរត់ ប្រព័ន្ធ lymphatic មិនមានបេះដូងជំរុញ។ វាពឹងលើការដំណើរការ筋肉 ចលនារាងកាយ និងការដកដង្ហើម ដើម្បីរក្សា lymph ។",
    },
    {
      emoji: "💧",
      titleEn: "Fluid Drainage & Volume",
      titleKh: "បង្ហូរ និងបរិមាណ",
      bodyEn: "It collects excess fluid (lymph) that leaks from blood vessels into tissues, returning it to the blood to prevent swelling. It manages nearly double the volume of fluid compared to blood circulation.",
      bodyKh: "ប្រមូលទឹក lymph ដែលហូរចូលជាលិការ ហើយបញ្ជូនឡើងវិញចូលឈាម ដើម្បីការពារការហើម។",
    },
    {
      emoji: "🔬",
      titleEn: "Filters Pathogens",
      titleKh: "ត្រងបង្ករោគ",
      bodyEn: "The body contains roughly 400–800 lymph nodes that filter lymph fluid, trapping bacteria, viruses, and abnormal cells — including cancer cells — before they can spread.",
      bodyKh: "រាងកាយមាន lymph node ប្រហែល ៤០០–៨០០ ត្រង lymph fluid ចាប់ចងបាក់តេរី មេរោគ និងកោសិកាភ្ញាក់ — រួមមានកោសិកាមហារីក ។",
    },
    {
      emoji: "🛡️",
      titleEn: "Immune Defense",
      titleKh: "ការការពារភាពស៊ាំ",
      bodyEn: "It produces and transports lymphocytes — T-cells and B-cells — to sites of infection. These white blood cells identify and destroy specific pathogens with remarkable precision.",
      bodyKh: "ផលិត and ដឹកជញ្ជូន lymphocyte — T-cell and B-cell — ទៅកន្លែងឆ្លង។ កោសិកាឈាមស ទាំងនោះកំណត់ and បំផ្លាញបង្ករោគ។",
    },
    {
      emoji: "🤒",
      titleEn: "Lymph Nodes Swell",
      titleKh: "Lymph Node ហើម",
      bodyEn: "When you have an infection, lymph nodes swell because they produce more white blood cells and accumulate pathogens. The swelling is a sign the immune system is actively fighting.",
      bodyKh: "ពេលឆ្លងជំងឺ lymph node ហើម ដោយសារផលិតកោសិកាឈាមស ច្រើន and ប្រមូលបង្ករោគ — ការហើមនោះបង្ហាញថាប្រព័ន្ធស៊ាំប្រយុទ្ធ។",
    },
    {
      emoji: "🍽️",
      titleEn: "Fat Absorption",
      titleKh: "ការស្រូបជាតិខ្លាញ់",
      bodyEn: "Specialised lymph vessels called lacteals line the small intestine and absorb dietary fats and fat-soluble vitamins (A, D, E, K), transporting them to the bloodstream.",
      bodyKh: "សរសៃ lymph ពិសេស lacteals ស្ថិតក្នុងពោះវៀនតូច ស្រូបខ្លាញ់ and វីតាមីន A, D, E, K ហើយបញ្ជូនចូលចរន្តឈាម។",
    },
    {
      emoji: "⚠️",
      titleEn: "Common Conditions",
      titleKh: "ជំងឺទូទៅ",
      bodyEn: "If the system fails to drain correctly, swelling called lymphedema develops — often in the arms or legs. Lymphoma is a cancer of the lymphatic system itself, affecting lymph nodes and lymphoid tissue.",
      bodyKh: "ប្រព័ន្ធបង្ហូរខូច នឹងបណ្តាលឱ្យ lymphedema — ជំងឺហើម ច្រើននៅដៃ ឬជើង។ Lymphoma គឺជាមហារីក lymphatic ។",
    },
  ];

  const keyComponents = [
    {
      emoji: "🟢",
      nameEn: "Lymph Nodes",
      nameKh: "Lymph Node (កូនកណ្តុរ)",
      descEn: "Small, bean-shaped glands scattered throughout the body that filter lymph fluid and trap harmful substances.",
      descKh: "ក្រចិលតូចៗ រាងដូចសណ្តែក ត្រង lymph fluid and ចាប់ចងសារធាតុបង្ករជំងឺ។",
    },
    {
      emoji: "🔵",
      nameEn: "Lymph Vessels",
      nameKh: "សរសៃ Lymph",
      descEn: "A network of thin tubes that carry lymph fluid from tissues back toward the heart, running alongside blood vessels throughout the body.",
      descKh: "បណ្ដាញសរសៃស្តើង ដឹក lymph ពីជាលិការ ត្រឡប់ទៅបេះដូង។",
    },
    {
      emoji: "🫁",
      nameEn: "Spleen",
      nameKh: "អ័ព្ទ",
      descEn: "Filters blood directly (not lymph), stores white blood cells and platelets, and destroys old or damaged red blood cells.",
      descKh: "ត្រងឈាមផ្ទាល់ ផ្ទុកកោសិកាឈាមស និងប្លេកឈាម ហើយបំផ្លាញកោសិកាឈាមក្រហមចាស់ and ខូច។",
    },
    {
      emoji: "🫀",
      nameEn: "Thymus",
      nameKh: "ក្រពេញ Thymus",
      descEn: "A gland behind the sternum where immature T-cells travel to mature and learn to distinguish the body's own cells from foreign invaders.",
      descKh: "ក្រពេញនៅខាងក្រោយឆ្អឹងទ្រូង ដែល T-cell មិនទាន់ពេញវ័យទៅតំណើរការ and រៀនសម្គាល់។",
    },
    {
      emoji: "🦴",
      nameEn: "Bone Marrow",
      nameKh: "ខ្ទម",
      descEn: "The soft tissue inside bones that produces all blood cells, including lymphocytes (B-cells and T-cells), the primary defenders of the immune system.",
      descKh: "ជាលិការទន់ក្នុងឆ្អឹងផលិតកោសិកាឈាមទាំងអស់ រួមមាន lymphocyte (B-cell and T-cell)។",
    },
    {
      emoji: "👄",
      nameEn: "Tonsils & Adenoids",
      nameKh: "ក្រពេញ Tonsil and Adenoid",
      descEn: "Clusters of lymphatic tissue at the back of the throat and nose that act as the first line of defence, trapping pathogens that enter through food and air.",
      descKh: "ក្រចកជាលិការ lymphatic នៅបំពង់ក and ច្រមុះ ចាប់ចងបង្ករោគពីអាហារ and អាកាស។",
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 100 + i * 140;
            return (
              <path key={i}
                d={`M -20 ${y} C 200 ${y - 40},400 ${y + 40},600 ${y} S 1000 ${y - 30},1220 ${y}`}
                fill="none" stroke={TEAL} strokeWidth="1.5" />
            );
          })}
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(2,26,20,0.93) 88%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <Link href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: AQUA }}
          data-testid="link-back-science">
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* HERO */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${AQUA}`, color: AQUA }}>
            <Shield className="w-3.5 h-3.5" aria-hidden />
            {t("Human Body · Science", "រាងកាយ · វិទ្យាសាស្ត្រ")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: PALE }}>
            {t("The Lymphatic System", "ប្រព័ន្ធទឹករងៃ")}
          </h1>
          <p className="font-khmer text-2xl sm:text-3xl mb-6" style={{ color: AQUA }}>
            ប្រព័ន្ធទឹករងៃ និងភាពស៊ាំ
          </p>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: TEXT }}>
            {t(
              "A vital, one-way network of vessels, nodes, and organs — like the spleen and thymus — that acts as the body's sewerage system and a key part of the immune system. It filters toxins, maintains fluid balance, and transports white blood cells (lymphocytes) to fight infection.",
              "ប្រព័ន្ធបណ្តាញនៃសរសៃ nodes និងសរីរាង្គ — ដូចជាអ័ព្ទ និង thymus — ដើរតួជាប្រព័ន្ធបង្ហូរ និងការការពារភាពស៊ាំ។ វាត្រងជាតិពុល រក្សាតុល្យភាព និងដឹក lymphocyte ដើម្បីប្រយុទ្ធជំងឺ។"
            )}
          </p>
        </header>

        {/* WHAT IS LYMPH CALLOUT */}
        <section className="mb-12 sm:mb-16" aria-labelledby="what-is-lymph">
          <div className="rounded-2xl p-6 sm:p-8 border-l-4" style={{ background: "#062b1f", borderColor: "#0d9488" }}>
            <h2 id="what-is-lymph" className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#2dd4bf" }}>
              {t("What is Lymph?", "Lymph គឺជាអ្វី?")}
            </h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "#ccfbf1" }}>
              {t(
                "Lymph is a clear, yellowish fluid that leaks out of blood capillaries into the spaces between cells (interstitial fluid). It is collected by lymph capillaries and moved through the lymphatic vessels back toward the bloodstream.",
                "Lymph ជាទឹករំអិលថ្លា មានពណ៌លឿងស្លេក ហូរចេញពីសរសៃឈាមតូច ចូលទៅចន្លោះកោសិកា។ វាត្រូវបានប្រមូលដោយសរសៃ lymph តូច ហើយដឹកតាមសរសៃ lymph ត្រឡប់ចូលចរន្តឈាម។"
              )}
            </p>
            <p className="text-sm" style={{ color: "#5eead4" }}>
              {t(
                "Lymph carries white blood cells, waste products, and fats absorbed from the digestive system — making it essential for immunity and fluid balance.",
                "Lymph ដឹកកោសិកាឈាមស កាកសំណល់ និងខ្លាញ់ពីប្រព័ន្ធរំលាយ — ធ្វើឱ្យវាសំខាន់ណាស់សម្រាប់ប្រព័ន្ធស៊ាំ និងតុល្យភាពទឹក។"
              )}
            </p>
          </div>
        </section>

        {/* KEY FACTS */}
        <section className="mb-12 sm:mb-16" aria-labelledby="key-facts">
          <SectionTitle icon={Activity} en="Key Facts" kh="ការពិតសំខាន់ៗ" id="key-facts" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {keyFacts.map((fact, i) => (
              <Card key={i} highlight={i === 0}>
                <div className="text-3xl mb-3" aria-hidden="true">{fact.emoji}</div>
                <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: "#2dd4bf" }}>
                  {t(fact.titleEn, fact.titleKh)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#ccfbf1" }}>
                  {t(fact.bodyEn, fact.bodyKh)}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* KEY COMPONENTS */}
        <section className="mb-12 sm:mb-16" aria-labelledby="key-components">
          <SectionTitle icon={Filter} en="Key Components" kh="សមាសធាតុសំខាន់ៗ" id="key-components" />
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#0d948844" }}>
            {keyComponents.map((comp, i) => (
              <div key={i} className="flex gap-4 p-5 sm:p-6 border-b last:border-b-0" style={{ background: i % 2 === 0 ? "#062b1f" : "#021a14", borderColor: "#0d948822" }}>
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{comp.emoji}</span>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#2dd4bf" }}>
                    {t(comp.nameEn, comp.nameKh)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#ccfbf1" }}>
                    {t(comp.descEn, comp.descKh)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEFENDERS */}
        <section className="mb-12 sm:mb-16" aria-labelledby="defenders">
          <SectionTitle icon={Shield} en="The Defenders — Lymphocytes" kh="អ្នករក្សាការពារ — Lymphocyte" id="defenders" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card highlight>
              <MacrophageSvg />
              <h3 className="font-bold text-center mt-4 mb-2" style={{ color: "#2dd4bf" }}>
                {t("Macrophages", "Macrophage")}
              </h3>
              <p className="text-sm text-center leading-relaxed" style={{ color: "#ccfbf1" }}>
                {t(
                  "Large white blood cells that engulf and digest pathogens, dead cells, and debris — acting as the immune system's clean-up crew.",
                  "កោសិកាឈាមសធំ ដែលលេប and រំលាយបង្ករោគ កោសិកាស្លាប់ and ឥតប្រយោជន៍ — ដើរតួជាអ្នកសំអាតប្រព័ន្ធស៊ាំ។"
                )}
              </p>
            </Card>
            <Card>
              <LymphNodeSvg />
              <h3 className="font-bold text-center mt-4 mb-2" style={{ color: "#2dd4bf" }}>
                {t("B-Cells", "B-Cell")}
              </h3>
              <p className="text-sm text-center leading-relaxed" style={{ color: "#ccfbf1" }}>
                {t(
                  "Produced in bone marrow, B-cells create antibodies — Y-shaped proteins that lock onto specific pathogens and mark them for destruction.",
                  "ផលិតនៅ bone marrow B-cell បង្កើត antibody — ប្រូតេអ៊ីនរូបY ចាប់ and សម្គាល់បង្ករោគ ដើម្បីបំផ្លាញ។"
                )}
              </p>
            </Card>
            <Card>
              <ShieldSvg />
              <h3 className="font-bold text-center mt-4 mb-2" style={{ color: "#2dd4bf" }}>
                {t("T-Cells", "T-Cell")}
              </h3>
              <p className="text-sm text-center leading-relaxed" style={{ color: "#ccfbf1" }}>
                {t(
                  "Mature in the thymus gland. Killer T-cells directly destroy infected cells; Helper T-cells coordinate the immune response.",
                  "ពេញវ័យនៅ thymus។ Killer T-cell បំផ្លាញកោសិកាឆ្លង ផ្ទាល់ Helper T-cell សម្របសម្រួលការឆ្លើយតបស៊ាំ។"
                )}
              </p>
            </Card>
          </div>
        </section>

        {/* NODES & GEOGRAPHY */}
        <section className="mb-12 sm:mb-16" aria-labelledby="nodes-geography">
          <SectionTitle icon={Droplets} en="Nodes & Geography" kh="Nodes និងទីតាំង" id="nodes-geography" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { region: t("Neck", "កញ្ចុក"), en: "Cervical nodes filter lymph from the head and neck. They swell noticeably during throat infections.", kh: "Cervical node ត្រង lymph ពីក្បាល and កញ្ចុក។ ហើមច្បាស់ពេលឆ្លងបំពង់ក។" },
              { region: t("Armpits", "ក្លៀក"), en: "Axillary nodes drain the arms, chest wall, and breasts. Enlarged axillary nodes may indicate breast cancer.", kh: "Axillary node បង្ហូរដៃ ទ្រូង and ដោះ។ ហើមអាចបង្ហាញជំងឺមហារីកដោះ។" },
              { region: t("Groin", "រន្ធគូ"), en: "Inguinal nodes filter lymph from the legs and genitals — often swollen during leg or pelvic infections.", kh: "Inguinal node ត្រង lymph ពីជើង and បំពង់ — ហើមច្រើនពេលឆ្លងជើង ឬ bone pelvis។" },
              { region: t("Abdomen", "ពោះ"), en: "Mesenteric nodes are located in the abdomen and filter lymph from the intestines, playing a key role in fat absorption.", kh: "Mesenteric node នៅក្នុងពោះ ត្រង lymph ពីពោះវៀន ដើរតួក្នុងការស្រូបខ្លាញ់ ។" },
            ].map((item, i) => (
              <Card key={i}>
                <h3 className="font-bold text-base mb-2" style={{ color: "#f59e0b" }}>{item.region}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#ccfbf1" }}>
                  {t(item.en, item.kh)}
                </p>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
