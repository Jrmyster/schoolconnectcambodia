import { Link } from "wouter";
import {
  ArrowLeft,
  HeartPulse,
  Droplets,
  Activity,
  FlaskConical,
  Shield,
  Syringe,
  GitMerge,
  Network,
} from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE CIRCULATORY SYSTEM & BLOOD
 *  ប្រព័ន្ធឈាមរត់ និងឈាម
 *
 *  Route:     /science/circulatory-system
 *  Category:  Science › Human Body
 *
 *  Aesthetic: deep arterial crimson → rose → pale cream. No external images.
 * ══════════════════════════════════════════════════════════════════════════ */

const BG         = "#1a0308";
const PANEL      = "#280a10";
const PANEL_SOFT = "#3a0f18";
const CRIMSON    = "#dc2626";
const ROSE       = "#fb7185";
const GOLD       = "#f59e0b";
const PALE       = "#fff1f2";
const TEXT       = "#ffe4e6";
const TEXT_DIM   = "#fda4af";
const TEXT_MUTED = "#fb7185";
const VEIN_BLUE  = "#3b82f6";

function glow(c: string, r = 8) {
  return `0 0 ${r}px ${c}55, 0 0 ${r * 2}px ${c}22`;
}

/* ── Shared sub-components ──────────────────────────────────────────────── */

function SectionTitle({
  icon: Icon,
  en,
  kh,
  id,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  id?: string;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden style={{ color: ROSE }} />
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: PALE }}>
          {en}
        </h2>
      </div>
      <p className="font-khmer text-base sm:text-lg" style={{ color: TEXT_DIM }}>{kh}</p>
    </header>
  );
}

function Card({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 border"
      style={{
        background: highlight ? PANEL_SOFT : PANEL,
        borderColor: `${CRIMSON}44`,
        boxShadow: highlight ? glow(CRIMSON, 6) : "none",
      }}
    >
      {children}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="text-left text-xs font-mono uppercase tracking-wider px-3 py-2"
      style={{ color: GOLD, background: PANEL_SOFT, borderBottom: `1px solid ${CRIMSON}66` }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 py-2 text-sm" style={{ color: TEXT, borderBottom: `1px solid ${CRIMSON}22` }}>
      {children}
    </td>
  );
}

/* ── SVG Diagrams ──────────────────────────────────────────────────────── */

function RBCSvg() {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16 mx-auto"
      role="img" aria-label="Red blood cell — biconcave disc cross-section">
      <ellipse cx="60" cy="40" rx="54" ry="32" fill={CRIMSON} opacity="0.9" />
      <ellipse cx="60" cy="30" rx="28" ry="10" fill={PANEL_SOFT} opacity="0.7" />
      <ellipse cx="60" cy="50" rx="28" ry="10" fill={PANEL_SOFT} opacity="0.7" />
      <ellipse cx="44" cy="28" rx="10" ry="5" fill={ROSE} opacity="0.35" />
    </svg>
  );
}

function HeartSvg() {
  return (
    <svg viewBox="0 0 120 110" className="w-24 h-24 mx-auto"
      role="img" aria-label="Anatomical heart — four chambers">
      <path
        d="M60 98 C20 72, 4 50, 4 32 A26 26 0 0 1 56 22 Q60 18 60 22 Q60 18 64 22 A26 26 0 0 1 116 32 C116 50 100 72 60 98 Z"
        fill={CRIMSON} opacity="0.9"
      />
      <path
        d="M60 92 C38 72, 28 55, 28 40 A16 16 0 0 1 56 30 Q58 28 60 30 L60 92 Z"
        fill={ROSE} opacity="0.5"
      />
      <ellipse cx="46" cy="38" rx="8" ry="5" fill={PALE} opacity="0.2" />
      <rect x="54" y="6" width="12" height="20" rx="6" fill={CRIMSON} opacity="0.8" />
      <rect x="36" y="10" width="10" height="16" rx="5" fill={VEIN_BLUE} opacity="0.8" />
    </svg>
  );
}

function BPSvg() {
  const cx = 90, cy = 90, r = 72;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const sx = cx + r * Math.cos(toRad(135));
  const sy = cy + r * Math.sin(toRad(135));
  const ex = cx + r * Math.cos(toRad(405));
  const ey = cy + r * Math.sin(toRad(405));
  const nx = cx + (r - 12) * Math.cos(toRad(240));
  const ny = cy + (r - 12) * Math.sin(toRad(240));
  return (
    <svg viewBox="0 0 180 150" className="w-40 h-32 mx-auto"
      role="img" aria-label="Sphygmomanometer showing 120/80 mmHg — healthy blood pressure">
      <circle cx={cx} cy={cy} r={r + 6} fill={PANEL_SOFT} stroke={CRIMSON} strokeWidth="1.5" opacity="0.9" />
      <path
        d={`M ${cx + r * Math.cos(toRad(200))} ${cy + r * Math.sin(toRad(200))} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(toRad(255))} ${cy + r * Math.sin(toRad(255))}`}
        fill="none" stroke="#22c55e" strokeWidth="8" opacity="0.5"
      />
      <path d={`M ${sx} ${sy} A ${r} ${r} 0 1 1 ${ex} ${ey}`}
        fill="none" stroke={TEXT_DIM} strokeWidth="2" opacity="0.4" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270].map((o) => {
        const deg = 135 + o;
        const ix = cx + (r - 10) * Math.cos(toRad(deg));
        const iy = cy + (r - 10) * Math.sin(toRad(deg));
        const ox = cx + r * Math.cos(toRad(deg));
        const oy = cy + r * Math.sin(toRad(deg));
        return <line key={deg} x1={ix} y1={iy} x2={ox} y2={oy} stroke={TEXT_DIM} strokeWidth="1.5" opacity="0.5" />;
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={CRIMSON} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill={CRIMSON} />
      <text x={cx} y={cy + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={PALE} fontFamily="monospace">120/80</text>
      <text x={cx} y={cy + 36} textAnchor="middle" fontSize="8" fill={TEXT_DIM} fontFamily="monospace">mmHg</text>
    </svg>
  );
}

/* ── Blood type data ────────────────────────────────────────────────────── */

const BLOOD_TYPES = [
  { type: "A",  antigens: "A",       antibodies: "Anti-B",         canDonateTo: "A, AB",         canReceiveFrom: "A, O"        },
  { type: "B",  antigens: "B",       antibodies: "Anti-A",         canDonateTo: "B, AB",         canReceiveFrom: "B, O"        },
  { type: "AB", antigens: "A and B", antibodies: "None",           canDonateTo: "AB",            canReceiveFrom: "A, B, AB, O" },
  { type: "O",  antigens: "None",    antibodies: "Anti-A, Anti-B", canDonateTo: "A, B, AB, O",   canReceiveFrom: "O"           },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  PAGE COMPONENT
 * ══════════════════════════════════════════════════════════════════════════ */

export default function CirculatorySystemPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>
      {/* pulse-line background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {Array.from({ length: 6 }).map((_, i) => {
            const y = 80 + i * 120;
            return (
              <path key={i}
                d={`M -20 ${y} L 200 ${y} L 230 ${y - 30} L 260 ${y + 40} L 290 ${y - 50} L 320 ${y + 30} L 350 ${y} L 1220 ${y}`}
                fill="none" stroke={CRIMSON} strokeWidth="1.5" />
            );
          })}
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(26,3,8,0.93) 88%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: ROSE }}
          data-testid="link-back-science">
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* ── HERO ── */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${ROSE}`, color: ROSE }}>
            <HeartPulse className="w-3.5 h-3.5" aria-hidden />
            {t("Human Body · Science", "រាងកាយ · វិទ្យាសាស្ត្រ")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: PALE }}>
            {t("The Circulatory System & Blood", "ប្រព័ន្ធឈាមរត់ និងឈាម")}
          </h1>
          <p className="font-khmer text-2xl sm:text-3xl mb-6" style={{ color: ROSE }}>
            ប្រព័ន្ធឈាមរត់ និងឈាម
          </p>
          <p className="text-base sm:text-lg max-w-3xl" style={{ color: TEXT }}>
            {t(
              "A complete guide to the heart, blood vessels, and the cells that keep us alive.",
              "មគ្គុទ្ទេសក៍ស្តីពីបេះដូង សរសៃឈាម និងកោសិកាដែលរក្សាជីវិតយើង។"
            )}
          </p>
        </header>

        <div className="space-y-16">

          {/* ══ SECTION 1: COMPONENTS OF BLOOD ══ */}
          <section aria-labelledby="blood-components">
            <SectionTitle icon={Droplets} en="The Components of Blood" kh="សមាសធាតុនៃឈាម" id="blood-components" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Plasma */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold flex-shrink-0"
                    style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}55` }}
                    aria-hidden="true">55%</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Plasma", "ប្លាស្មា")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>ផ្នែករាវ</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "The straw-yellow liquid base of blood — about 92% water. It carries nutrients, hormones, proteins, and waste products throughout the body.",
                    "មូលដ្ឋានរាវពណ៌លឿងរបស់ឈាម ប្រហែល ៩២% ទឹក — ដឹកជញ្ជូនសារជាតិ អ័រម៉ូន និងកាកសំណល់ទូទាំងរាងកាយ។"
                  )}
                </p>
              </Card>

              {/* Red Blood Cells */}
              <Card highlight>
                <div className="mb-3"><RBCSvg /></div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold flex-shrink-0"
                    style={{ background: `${CRIMSON}33`, color: ROSE, border: `1px solid ${CRIMSON}55` }}
                    aria-hidden="true">RBC</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Red Blood Cells", "កោសិកាឈាមក្រហម")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>Erythrocytes</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Biconcave discs that maximise surface area for carrying oxygen. They make up ~45% of blood volume, with about 5 million per drop.",
                    "ថាស biconcave ដឹកអុកស៊ីសែន — ប្រហែល ៤៥% នៃបរិមាតឈាម។"
                  )}
                </p>
              </Card>

              {/* Hemoglobin */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold flex-shrink-0"
                    style={{ background: `${CRIMSON}22`, color: ROSE, border: `1px solid ${CRIMSON}44` }}
                    aria-hidden="true">Hb</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Hemoglobin", "អេម៉ូក្លូប៊ីន")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>ប្រូតេអ៊ីនដែក</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "The iron-rich protein inside red blood cells that grips oxygen molecules. Each hemoglobin carries up to 4 oxygen atoms — and the iron gives blood its red colour.",
                    "ប្រូតេអ៊ីនសំបូរដែកដឹកអ៊ុកស៊ីសែន ៤ អាតូម — ដែករបស់វាផ្តល់ពណ៌ក្រហម។"
                  )}
                </p>
              </Card>

              {/* White Blood Cells */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 flex-shrink-0" style={{ color: "#a3e635" }} aria-hidden />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("White Blood Cells", "កោសិកាឈាមស")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>Leukocytes</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "The immune system's soldiers — they identify and destroy bacteria, viruses, and abnormal cells. Less than 1% of blood volume, but critical for survival.",
                    "ទាហានប្រព័ន្ធភាពស្ស័យ — ស្វែងរក និងបំផ្លាញបាក់តេរី មេរោគ។"
                  )}
                </p>
              </Card>

              {/* Platelets */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <FlaskConical className="w-8 h-8 flex-shrink-0" style={{ color: "#c084fc" }} aria-hidden />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Platelets", "ប្លាកែត")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>Thrombocytes</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Tiny cell fragments that rush to any wound and clump together to form a clot, plugging the leak and preventing blood loss.",
                    "កំណាត់កោសិកាតូចដែលប្រញាប់ទៅរបួស ហើយជាប់ជាមួយគ្នាដើម្បីបញ្ឈប់ការហូរឈាម។"
                  )}
                </p>
              </Card>

              {/* Fun fact */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-8 h-8 flex-shrink-0" style={{ color: ROSE }} aria-hidden />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("By the Numbers", "ចំនួនគួរឱ្យចាប់អារម្មណ៍")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>ស្ថិតិសំខាន់</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1.5" style={{ color: TEXT }}>
                  <li>≈ <strong style={{ color: ROSE }}>5 litres</strong> {t("of blood in an adult", "ឈាមក្នុងមនុស្សពេញវ័យ")}</li>
                  <li>≈ <strong style={{ color: ROSE }}>25 trillion</strong> {t("red blood cells", "កោសិកាឈាមក្រហម")}</li>
                  <li><strong style={{ color: ROSE }}>120 days</strong> {t("lifespan of one RBC", "អាយុកោសិកាឈាម")}</li>
                  <li>≈ <strong style={{ color: ROSE }}>2 million</strong> {t("new RBCs made per second", "RBC ថ្មីក្នុងមួយវិនាទី")}</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* ══ SECTION 2: THE CIRCULATORY HIGHWAY ══ */}
          <section aria-labelledby="circ-highway">
            <SectionTitle icon={HeartPulse} en="The Circulatory Highway" kh="ផ្លូវឈាមរត់" id="circ-highway" />
            <div className="grid sm:grid-cols-2 gap-5 mb-6">

              <Card highlight>
                <div className="mb-4"><HeartSvg /></div>
                <h3 className="font-bold text-xl mb-2" style={{ color: PALE }}>{t("The Heart", "បេះដូង")}</h3>
                <p className="font-khmer text-xs mb-3" style={{ color: TEXT_DIM }}>ម៉ាស៊ីនបូមឈាម</p>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "A fist-sized muscle that beats about 100,000 times per day, pumping blood through two loops: the pulmonary loop (to the lungs for oxygen) and the systemic loop (to the rest of the body).",
                    "សាច់ដុំទំហំកណ្ដាប់ដៃ វាយប្រហែល ១០០,០០០ ដង/ថ្ងៃ — បូមឈាមតាម ២ ផ្លូវវង់ (សួត + រាងកាយ)។"
                  )}
                </p>
              </Card>

              <div className="space-y-4">
                {/* Arteries */}
                <Card>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: CRIMSON }} aria-hidden />
                    <h3 className="font-bold" style={{ color: PALE }}>{t("Arteries", "សរសៃឈាមក្រហម")}</h3>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>
                    {t(
                      "Thick-walled vessels that carry oxygen-rich blood away from the heart under high pressure. The aorta is the largest — nearly 3 cm wide.",
                      "សរសៃឈាមជញ្ជាំងក្រាស់ ដឹកឈាមសំបូរអ៊ុកស៊ីសែន ចេញពីបេះដូង។"
                    )}
                  </p>
                </Card>

                {/* Veins */}
                <Card>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: VEIN_BLUE }} aria-hidden />
                    <h3 className="font-bold" style={{ color: PALE }}>{t("Veins", "សរសៃឈាមខៀវ")}</h3>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>
                    {t(
                      "Thinner-walled vessels that return deoxygenated blood back to the heart. They have one-way valves to prevent backflow.",
                      "សរសៃឈាមសង្គ្រោះឈាមអស់អ៊ុកស៊ីសែនត្រឡប់ទៅបេះដូង — មានវ៉ាល់ការពារ។"
                    )}
                  </p>
                </Card>

                {/* Capillaries */}
                <Card>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: ROSE }} aria-hidden />
                    <h3 className="font-bold" style={{ color: PALE }}>{t("Capillaries", "សរសៃឈាមតូច")}</h3>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>
                    {t(
                      "The microscopic exchange network — just one cell thick. Oxygen, nutrients and waste pass through their walls directly into surrounding tissues.",
                      "ក្រចាយតូច ១ កោសិកា — អ្វីៗឆ្លងកាត់ជញ្ជាំងទៅជាលិការ។"
                    )}
                  </p>
                </Card>
              </div>
            </div>

            {/* Dual-loop explainer */}
            <Card>
              <h3 className="font-bold text-lg mb-4" style={{ color: PALE }}>
                {t("The Two Loops", "វង់ឈាមទាំងពីរ")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: CRIMSON }}>
                    {t("Pulmonary Circulation", "ការឈាមរត់ទៅសួត")}
                  </p>
                  <p className="text-sm" style={{ color: TEXT }}>
                    {t(
                      "Heart → Lungs → Heart. Deoxygenated blood is pumped to the lungs, picks up oxygen, releases CO₂, and returns rich with oxygen.",
                      "បេះដូង → សួត → បេះដូង — ឈាមទទួលអ៊ុកស៊ីសែន លះបង់ CO₂។"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: VEIN_BLUE }}>
                    {t("Systemic Circulation", "ការឈាមរត់ទូទាំងរាងកាយ")}
                  </p>
                  <p className="text-sm" style={{ color: TEXT }}>
                    {t(
                      "Heart → Body → Heart. Oxygen-rich blood travels to every organ and tissue, delivering fuel and collecting waste, before returning to the heart.",
                      "បេះដូង → រាងកាយ → បេះដូង — ដឹកអ៊ុកស៊ីសែន សារជាតិ ទៅគ្រប់ជាលិការ។"
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* ══ SECTION 2.5: CLINICAL ANATOMY ══ */}
          <section aria-labelledby="cardio-anatomy">
            <SectionTitle icon={HeartPulse} en="The Cardiovascular System: The Heart & Vessels" kh="ប្រព័ន្ធសរសៃឈាមបេះដូង៖ បេះដូង និងសរសៃឈាម" id="cardio-anatomy" />
            
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-6 h-6 flex-shrink-0" style={{ color: ROSE }} aria-hidden />
                  <h3 className="font-bold text-lg" style={{ color: PALE }}>
                    {t("Primary Function", "មុខងារចម្បង")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  {t(
                    "Beyond delivering oxygen, blood transports carbon dioxide, metabolic waste (to the liver and kidneys), electrolytes, hormones (like insulin and cortisol), and immune cells (white blood cells and antibodies) around the body.",
                    "ក្រៅពីការបញ្ជូនអុកស៊ីសែន ឈាមដឹកជញ្ជូនកាបូនឌីអុកស៊ីត កាកសំណល់មេតាប៉ូលីស (ទៅថ្លើម និងតម្រងនោម) អេឡិចត្រូលីត អរម៉ូន (ដូចជាអាំងស៊ុយលីន និងករទីសូល) និងកោសិកាប្រព័ន្ធភាពស៊ាំ (កោសិកាឈាមស និងអង្គបដិបក្ខ) ទូទាំងរាងកាយ។"
                  )}
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <Network className="w-6 h-6 flex-shrink-0" style={{ color: ROSE }} aria-hidden />
                  <h3 className="font-bold text-lg" style={{ color: PALE }}>
                    {t("The Conduction System (Pacemaker)", "ប្រព័ន្ធចម្លងចរន្តអគ្គិសនីបេះដូង")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  {t(
                    "The heart beats via electrical signals. The signal starts at the SA Node (the pacemaker), travels to the AV Node (the gatekeeper, which pauses the signal slightly to let the ventricles fill), and then travels through the Purkinje fibers to trigger the muscular contraction.",
                    "បេះដូងលោតតាមរយៈសញ្ញាអគ្គិសនី។ សញ្ញាចាប់ផ្តើមនៅ SA Node (អ្នកបង្កើតចង្វាក់) ធ្វើដំណើរទៅ AV Node (អ្នកយាមទ្វារ ដែលផ្អាកសញ្ញាបន្តិចដើម្បីអោយថតក្រោមបំពេញ) ហើយបន្ទាប់មកឆ្លងកាត់ Purkinje fibers ដើម្បីកេះអោយសាច់ដុំកន្ត្រាក់។"
                  )}
                </p>
              </Card>
            </div>

            <div className="space-y-5">
              <Card highlight>
                <div className="flex items-center gap-3 mb-4">
                  <GitMerge className="w-6 h-6 flex-shrink-0" style={{ color: PALE }} aria-hidden />
                  <h3 className="font-bold text-lg" style={{ color: PALE }}>
                    {t("The Path of Blood", "ផ្លូវនៃឈាម")}
                  </h3>
                </div>
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                  <div className="p-4 rounded-xl" style={{ background: `${VEIN_BLUE}15`, border: `1px solid ${VEIN_BLUE}33` }}>
                    <h4 className="font-bold text-sm mb-2 uppercase tracking-wider" style={{ color: VEIN_BLUE }}>{t("Deoxygenated", "គ្មានអុកស៊ីសែន")}</h4>
                    <p className="text-sm font-medium" style={{ color: TEXT }}>
                      {t("Right Atrium → Right Ventricle → Lungs", "ថតលើស្តាំ → ថតក្រោមស្តាំ → សួត")}
                    </p>
                  </div>
                  <div className="hidden md:block text-2xl" style={{ color: TEXT_DIM }}>→</div>
                  <div className="p-4 rounded-xl" style={{ background: `${CRIMSON}15`, border: `1px solid ${CRIMSON}33` }}>
                    <h4 className="font-bold text-sm mb-2 uppercase tracking-wider" style={{ color: CRIMSON }}>{t("Oxygenated", "សំបូរអុកស៊ីសែន")}</h4>
                    <p className="text-sm font-medium" style={{ color: TEXT }}>
                      {t("Left Atrium → Left Ventricle → Aorta", "ថតលើឆ្វេង → ថតក្រោមឆ្វេង → Aorta")}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: TEXT }}>
                  {t(
                    "The left ventricle is the thickest chamber because it must pump against high pressure to reach the entire body.",
                    "ថតក្រោមខាងឆ្វេងគឺជាថតក្រាស់ជាងគេ ព្រោះវាត្រូវបូមប្រឆាំងនឹងសម្ពាធខ្ពស់ដើម្បីទៅដល់រាងកាយទាំងមូល។"
                  )}
                </p>
              </Card>

              <div className="grid sm:grid-cols-2 gap-5">
                <Card>
                  <h3 className="font-bold text-lg mb-4" style={{ color: PALE }}>
                    {t("Systole vs. Diastole", "ស៊ីស្តូល និង ឌីយ៉ាស្តូល")}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg" style={{ background: `${PANEL_SOFT}` }}>
                      <span className="font-mono text-xs tracking-wider" style={{ color: CRIMSON }}>SYSTOLE</span>
                      <p className="text-sm mt-1" style={{ color: TEXT }}>
                        {t("Ventricles contract and eject blood (the 'lub' sound).", "ថតក្រោមកន្ត្រាក់ និងបាញ់ឈាមចេញ (សំឡេង 'lub')។")}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: `${PANEL_SOFT}` }}>
                      <span className="font-mono text-xs tracking-wider" style={{ color: VEIN_BLUE }}>DIASTOLE</span>
                      <p className="text-sm mt-1" style={{ color: TEXT }}>
                        {t("Ventricles relax and fill with blood (the 'dub' sound).", "ថតក្រោមសម្រាក និងបំពេញដោយឈាម (សំឡេង 'dub')។")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-bold text-lg mb-4" style={{ color: PALE }}>
                    {t("The Five Blood Vessels", "សរសៃឈាមទាំងប្រាំ")}
                  </h3>
                  <ul className="text-sm space-y-3" style={{ color: TEXT }}>
                    <li className="flex gap-2">
                      <strong style={{ color: CRIMSON, width: '100px', flexShrink: 0 }}>{t("Arteries", "អារទែ")}</strong>
                      <span>{t("thick-walled, high pressure", "ជញ្ជាំងក្រាស់ សម្ពាធខ្ពស់")}</span>
                    </li>
                    <li className="flex gap-2">
                      <strong style={{ color: ROSE, width: '100px', flexShrink: 0 }}>{t("Arterioles", "អារទែរ្យូល")}</strong>
                      <span>{t("smaller branching arteries", "អារទែបែកខ្នែងតូចៗ")}</span>
                    </li>
                    <li className="flex gap-2">
                      <strong style={{ color: PALE, width: '100px', flexShrink: 0 }}>{t("Capillaries", "សរសៃឈាមតូចៗ")}</strong>
                      <span>{t("gas/nutrient exchange", "កន្លែងប្តូរឧស្ម័ន និងសារធាតុចិញ្ចឹម")}</span>
                    </li>
                    <li className="flex gap-2">
                      <strong style={{ color: "#818cf8", width: '100px', flexShrink: 0 }}>{t("Venules", "វ៉េនន្យូល")}</strong>
                      <span>{t("small veins collecting blood", "សរសៃវ៉ែនតូចៗប្រមូលឈាម")}</span>
                    </li>
                    <li className="flex gap-2">
                      <strong style={{ color: VEIN_BLUE, width: '100px', flexShrink: 0 }}>{t("Veins", "វ៉ែន")}</strong>
                      <span>{t("thin-walled, return blood to heart", "ជញ្ជាំងស្តើង ដឹកឈាមទៅបេះដូង")}</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* ══ SECTION 3: BLOOD TYPES ══ */}
          <section aria-labelledby="blood-types">
            <SectionTitle icon={Syringe} en="The ABO Blood Group System" kh="ក្រុមឈាម ABO" id="blood-types" />
            <Card>
              <p className="text-sm mb-5" style={{ color: TEXT }}>
                {t(
                  "Your blood type is determined by antigens (protein markers) on the surface of your red blood cells and antibodies in your plasma. Getting the wrong blood type in a transfusion can be fatal.",
                  "ប្រភេទឈាមកំណត់ដោយ antigens លើកោសិកា RBC និង antibodies ក្នុងប្លាស្មា — ការបញ្ចូលឈាមខុសប្រភេទអាចស្លាប់។"
                )}
              </p>
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full text-sm border-collapse" style={{ background: PANEL }}>
                  <thead>
                    <tr>
                      <Th>{t("Type", "ប្រភេទ")}</Th>
                      <Th>{t("Antigens on RBC", "Antigens")}</Th>
                      <Th>{t("Antibodies in Plasma", "Antibodies")}</Th>
                      <Th>{t("Can Donate To", "ផ្តល់ឱ្យ")}</Th>
                      <Th>{t("Can Receive From", "ទទួលពី")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {BLOOD_TYPES.map((row) => (
                      <tr key={row.type}>
                        <Td>
                          <span className="font-bold text-base font-mono" style={{ color: ROSE }}>{row.type}</span>
                        </Td>
                        <Td>{row.antigens}</Td>
                        <Td>{row.antibodies}</Td>
                        <Td>{row.canDonateTo}</Td>
                        <Td>{row.canReceiveFrom}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-4 font-mono" style={{ color: TEXT_MUTED }}>
                {t(
                  "* The Rh factor (+/-) is a separate antigen system. O− is the universal donor; AB+ is the universal recipient.",
                  "* កត្តា Rh (+/−) ជាប្រព័ន្ធ antigen ផ្សេង។ O− ជាអ្នកផ្តល់ជាសកល AB+ ជាអ្នកទទួល។"
                )}
              </p>
            </Card>
          </section>

          {/* ══ SECTION 4: BLOOD PRESSURE ══ */}
          <section aria-labelledby="blood-pressure">
            <SectionTitle icon={Activity} en="Blood Pressure" kh="សម្ពាធឈាម" id="blood-pressure" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Card highlight>
                <div className="mb-4"><BPSvg /></div>
                <h3 className="font-bold text-lg mb-2" style={{ color: PALE }}>
                  {t("Reading the Numbers", "អានលទ្ធផល")}
                </h3>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Blood pressure is written as systolic / diastolic mmHg. Systolic is the pressure when the heart beats; diastolic is the pressure when the heart rests between beats.",
                    "សម្ពាធឈាម = systolic / diastolic mmHg — systolic ពេលបេះដូងវាយ diastolic ពេលសម្រាក។"
                  )}
                </p>
              </Card>

              <div className="space-y-4">
                {[
                  { label: t("Normal",          "ធម្មតា"),         range: "< 120 / 80",   color: "#22c55e" },
                  { label: t("Elevated",         "ខ្ពស់បន្តិច"),   range: "120–129 / < 80", color: GOLD },
                  { label: t("High Stage 1",     "ខ្ពស់ដំណាក់ ១"), range: "130–139 / 80–89", color: "#f97316" },
                  { label: t("High Stage 2",     "ខ្ពស់ដំណាក់ ២"), range: "≥ 140 / ≥ 90",  color: CRIMSON },
                  { label: t("Hypertensive Crisis", "វិបត្តិ"),   range: "> 180 / > 120",  color: "#dc2626" },
                ].map(({ label, range, color }) => (
                  <div key={range} className="flex items-center justify-between rounded-xl px-4 py-3 border"
                    style={{ background: PANEL, borderColor: `${color}44` }}>
                    <span className="text-sm font-medium" style={{ color: PALE }}>{label}</span>
                    <span className="text-sm font-mono" style={{ color }}>{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>{/* /space-y-16 */}

        {/* ── FOOTER ── */}
        <footer className="mt-16 pt-8 border-t text-center text-sm" style={{ borderColor: `${CRIMSON}33`, color: TEXT_MUTED }}>
          <p className="mb-1">{t("Chuy Sala — Help School", "ជួយសាលា — Help School")}</p>
          <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>
            {t("Science · Human Body · Circulatory System", "វិទ្យាសាស្ត្រ · រាងកាយ · ប្រព័ន្ធឈាមរត់")}
          </p>
        </footer>
      </div>
    </div>
  );
}
