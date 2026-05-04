import { Link } from "wouter";
import { ArrowLeft, Shield, Droplets, Filter } from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE LYMPHATIC SYSTEM & IMMUNITY
 *  Route: /science/lymphatic-system   Category: Science › Human Body
 *  Palette: deep teal-forest → aqua accent → pale mint
 * ══════════════════════════════════════════════════════════════════════════ */

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
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
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

/* ── SVG diagrams ──────────────────────────────────────────────────────── */

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
    <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto" role="img" aria-label="Lymph node — bean-shaped filter">
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

/* ════════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ══════════════════════════════════════════════════════════════════════════ */

export default function LymphaticSystemPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>

      {/* flowing-wave background */}
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

        {/* ── HERO ── */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${AQUA}`, color: AQUA }}>
            <Shield className="w-3.5 h-3.5" aria-hidden />
            {t("Human Body · Science", "រាងកាយ · វិទ្យាសាស្ត្រ")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: PALE }}>
            {t("The Lymphatic System & Immunity", "ប្រព័ន្ធទឹករងៃ និងភាពស៊ាំ")}
          </h1>
          <p className="font-khmer text-2xl sm:text-3xl mb-6" style={{ color: AQUA }}>
            ប្រព័ន្ធទឹករងៃ និងភាពស៊ាំ
          </p>
          <p className="text-base sm:text-lg max-w-3xl" style={{ color: TEXT }}>
            {t(
              "The body's silent drainage network and frontline defense against disease.",
              "បណ្តាញបង្ហូរជាតិទឹកស្ងាត់ស្ងៀម និងការការពារជួរមុខប្រឆាំងនឹងជំងឺ។"
            )}
          </p>
        </header>

        <div className="space-y-16">

          {/* ══ SECTION 1: CORE PURPOSE ══ */}
          <section aria-labelledby="core-purpose">
            <SectionTitle icon={Droplets} en="The Core Purpose" kh="គោលបំណងចម្បង" id="core-purpose" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <Card highlight>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full text-lg flex-shrink-0"
                    style={{ background: `${TEAL}22`, border: `1px solid ${TEAL}66` }}>💧</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Fluid Balance", "តុល្យភាពជាតិទឹក")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>តុល្យភាពជាតិទឹក</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Acts as the body's drainage system — collecting excess fluid (lymph) that leaks from blood vessels into tissues and returning it to the bloodstream so the body doesn't swell.",
                    "ដើរតួជាប្រព័ន្ធបង្ហូរទឹករបស់រាងកាយ — ប្រមូលទឹករស (lymph) ពីសរសៃឈាមត្រឡប់ចូលចរន្តឈាម ដើម្បីឱ្យរាងកាយមិនហើម។"
                  )}
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full text-lg flex-shrink-0"
                    style={{ background: `${GOLD}22`, border: `1px solid ${GOLD}55` }}>🍽️</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Fat Absorption", "ការស្រូបយកជាតិខ្លាញ់")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>ការស្រូបយកជាតិខ្លាញ់</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Specialised lymph vessels called lacteals line the small intestine and absorb dietary fats and fat-soluble vitamins (A, D, E, K) from digested food, then carry them into the bloodstream.",
                    "សរសៃ lymph ពិសេសហៅថា lacteals ស្ថិតនៅពោះវៀនតូច ស្រូបយកខ្លាញ់ and វីតាមីន A, D, E, K ពីអាហារ ហើយបញ្ជូនចូលចរន្តឈាម។"
                  )}
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-10 h-10 flex-shrink-0" style={{ color: AQUA }} aria-hidden />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: PALE }}>{t("Immune Defense", "ការការពារភាពស៊ាំ")}</h3>
                    <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>ការការពារភាពស៊ាំ</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: TEXT }}>
                  {t(
                    "Filters harmful bacteria, viruses, and cellular waste — acting as the body's security checkpoint. Lymph nodes are the inspection stations where immune cells detect and destroy threats.",
                    "ត្រង់ចេញបាក់តេរីគ្រោះថ្នាក់ មេរោគ និងកាកសំណល់ — ដើរតួជាចំណុចត្រួតពិនិត្យសុវត្ថិភាព។ Lymph node គឺជាស្ថានីយត្រួតពិនិត្យដែលកោសិការកប់ and បំផ្លាញការគំរាមកំហែង។"
                  )}
                </p>
              </Card>

            </div>
          </section>

          {/* ══ SECTION 2: THE DEFENDERS ══ */}
          <section aria-labelledby="the-defenders">
            <SectionTitle icon={Shield} en="The Defenders" kh="កោសិកាការពារតួសំខាន់ៗ" id="the-defenders" />
            <div className="grid sm:grid-cols-2 gap-5">

              {/* Lymphocytes */}
              <Card highlight>
                <div className="flex justify-center gap-8 mb-5">
                  {/* B-cell */}
                  <div className="text-center">
                    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto" role="img" aria-label="B-cell with Y-shaped antibodies">
                      <circle cx="40" cy="40" r="26" fill={PANEL_SOFT} stroke={PURPLE} strokeWidth="1.5" />
                      <circle cx="40" cy="40" r="12" fill={PURPLE} opacity="0.3" />
                      {[0,60,120,180,240,300].map((deg,i) => {
                        const rad = (deg * Math.PI) / 180;
                        const bx = 40 + 26 * Math.cos(rad), by = 40 + 26 * Math.sin(rad);
                        const mx = 40 + 20 * Math.cos(rad), my = 40 + 20 * Math.sin(rad);
                        const perp = rad + Math.PI / 2;
                        return (
                          <g key={i}>
                            <line x1={mx} y1={my} x2={bx} y2={by} stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" />
                            <line x1={bx} y1={by} x2={bx + 4 * Math.cos(perp - 0.4)} y2={by + 4 * Math.sin(perp - 0.4)} stroke={PURPLE} strokeWidth="1" strokeLinecap="round" />
                            <line x1={bx} y1={by} x2={bx + 4 * Math.cos(perp + 0.4)} y2={by + 4 * Math.sin(perp + 0.4)} stroke={PURPLE} strokeWidth="1" strokeLinecap="round" />
                          </g>
                        );
                      })}
                    </svg>
                    <p className="text-xs font-mono mt-1" style={{ color: PURPLE }}>B-Cell</p>
                  </div>
                  {/* T-cell */}
                  <div className="text-center">
                    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto" role="img" aria-label="T-cell cytotoxic killer">
                      <circle cx="40" cy="40" r="26" fill={PANEL_SOFT} stroke="#f97316" strokeWidth="1.5" />
                      <circle cx="40" cy="40" r="12" fill="#f97316" opacity="0.25" />
                      {[0,45,90,135,180,225,270,315].map((deg,i) => {
                        const rad = (deg * Math.PI) / 180;
                        return <circle key={i} cx={40 + 26 * Math.cos(rad)} cy={40 + 26 * Math.sin(rad)} r="3" fill="#f97316" opacity="0.8" />;
                      })}
                      <text x="40" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fed7aa" fontFamily="monospace">T</text>
                    </svg>
                    <p className="text-xs font-mono mt-1" style={{ color: "#f97316" }}>T-Cell</p>
                  </div>
                </div>

                <h3 className="font-bold text-xl mb-2" style={{ color: PALE }}>{t("Lymphocytes", "កោសិកាឡាំហ្វូស៊ីត")}</h3>
                <p className="font-khmer text-xs mb-3" style={{ color: TEXT_DIM }}>កោសិកាឡាំហ្វូស៊ីត — ទាហានជំនាញ</p>

                <div className="space-y-2">
                  <div className="rounded-xl p-3" style={{ background: `${PURPLE}15`, border: `1px solid ${PURPLE}33` }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: PURPLE }}>
                      {t("B-Cells — Antibody Factories", "B-Cell — រោងចក្រអង់ទីករ")}
                    </p>
                    <p className="text-sm" style={{ color: TEXT }}>
                      {t(
                        "When a B-cell encounters an invader it produces thousands of Y-shaped antibody molecules that lock onto that specific pathogen — marking it for destruction.",
                        "នៅពេល B-cell ជួបសត្រូវវាផលិតអង់ទីករ Y រាប់ពាន់ ដែលចាក់សោជាក់លាក់ទៅលើបង្ករោគ — សម្គាល់ពួកវាសម្រាប់បំផ្លាញ។"
                      )}
                    </p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "#f9731615", border: "1px solid #f9731633" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#f97316" }}>
                      {t("T-Cells — Direct Killers", "T-Cell — អ្នកសម្លាប់ផ្ទាល់")}
                    </p>
                    <p className="text-sm" style={{ color: TEXT }}>
                      {t(
                        "Cytotoxic T-cells hunt down and destroy the body's own cells that have been infected by a virus or turned cancerous — eliminating the threat from within.",
                        "T-cell cytotoxic ប្រដាល់ and បំផ្លាញកោសិការបស់រាងកាយដែលឆ្លងមេរោគ ឬក្លាយជាមហារីក — លុបបំបាត់ការគំរាមកំហែងពីខាងក្នុង។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Macrophages */}
              <Card>
                <div className="mb-3"><MacrophageSvg /></div>
                <h3 className="font-bold text-xl mb-2" style={{ color: PALE }}>{t("Macrophages", "ម៉ាក្រូហ្វាស")}</h3>
                <p className="font-khmer text-xs mb-3" style={{ color: TEXT_DIM }}>ម៉ាក្រូហ្វាស — "អ្នកញ៉ាំធំ"</p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  {t(
                    "The name means 'big eater' in Greek. Macrophages extend arm-like pseudopods to engulf and digest dead cells, bacteria, and cellular debris through phagocytosis.",
                    "ឈ្មោះន័យថា 'អ្នកញ៉ាំធំ' ជាភាសាក្រិក។ Macrophage លាតដៃ pseudopod ដើម្បីស្វាំង and រំលាយកោសិកា បាក់តេរី and សំណល់ តាមរយៈ phagocytosis។"
                  )}
                </p>
                <div className="rounded-xl p-3" style={{ background: `${TEAL}15`, border: `1px solid ${TEAL}33` }}>
                  <p className="text-sm" style={{ color: TEXT_DIM }}>
                    {t(
                      "After digesting a pathogen, macrophages display fragments of it on their surface — essentially showing a 'wanted poster' to T-cells and B-cells so they can mount a targeted response.",
                      "បន្ទាប់ពីរំលាយបង្ករោគ macrophage បង្ហាញបំណែករបស់វានៅលើផ្ទៃ — ដូចជាការបង្ហាញ 'រូបភាពដែលត្រូវការ' ទៅ T-cell and B-cell ។"
                    )}
                  </p>
                </div>
              </Card>

            </div>
          </section>

          {/* ══ SECTION 3: NODES & GEOGRAPHY ══ */}
          <section aria-labelledby="nodes-geography">
            <SectionTitle icon={Filter} en="The Nodes & Geography" kh="ទីតាំងកូនកណ្តុរ" id="nodes-geography" />

            {/* What is a lymph node */}
            <div className="mb-8">
              <Card>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <LymphNodeSvg />
                    <p className="text-center text-xs font-mono mt-2" style={{ color: AQUA }}>
                      {t("Lymph Node", "កូនកណ្តុរ Lymph")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: PALE }}>
                      {t("What is a Lymph Node?", "តើ Lymph Node គឺជាអ្វី?")}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: TEXT }}>
                      {t(
                        "Lymph nodes are small, bean-shaped filtering stations — typically 1–25 mm — positioned throughout the body. Lymph fluid flows in through multiple incoming vessels, gets inspected by immune cells inside, then exits through a single outgoing vessel at the hilum (the indent).",
                        "Lymph node គឺជាស្ថានីយត្រងតូចៗ រាងដូចសណ្តែក ទំហំ ១–២៥ ម.ម ដែលស្ថិតនៅទូទាំងរាងកាយ។ ទឹករស lymph ហូរចូលតាមសរសៃជាច្រើន ត្រូវបានត្រង and ពិនិត្យ ហើយចេញតាមសរសៃតែមួយ។"
                      )}
                    </p>
                    <p className="text-sm" style={{ color: TEXT_DIM }}>
                      {t(
                        "When you feel a swollen, tender lump in your neck during a sore throat, those are your lymph nodes working overtime — actively fighting the infection.",
                        "ពេលមានផ្តាសាយ ហើយអ្នករកឃើញ lumps ហើម នោះគឺ lymph node របស់អ្នកកំពុងប្រយុទ្ធប្រឆាំងនឹងការឆ្លង។"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Node locations */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                {
                  nameEn: "Cervical Nodes", nameKh: "កូនកណ្តុរនៅក",
                  emoji: "🦴",
                  noteEn: "Located in the neck. These filter lymph from the head and throat — which is why your neck feels swollen during a sore throat or cold.",
                  noteKh: "ស្ថិតនៅក។ ត្រង lymph ពីក្បាល and បំពង់ក — ហើយនោះហើយជាមូលហេតុដែលកហើមពេលឈឺបំពង់ក។",
                },
                {
                  nameEn: "Axillary Nodes", nameKh: "កូនកណ្តុរនៅក្លៀក",
                  emoji: "💪",
                  noteEn: "Located in the armpits. Drain lymph from the arms, chest wall, and breast tissue. Checked carefully during breast cancer screening.",
                  noteKh: "ស្ថិតនៅក្លៀក។ ត្រង lymph ពីដៃ ជញ្ជាំងទ្រូង និងជាលិការទ្រូង — ត្រូវបានពិនិត្យក្នុងការអង្កេតមហារីកទ្រូង។",
                },
                {
                  nameEn: "Inguinal Nodes", nameKh: "កូនកណ្តុរនៅក្រលៀន",
                  emoji: "🦵",
                  noteEn: "Located in the groin. Filter lymph from the legs and lower abdomen. Often swell when there is an infection in the foot or leg.",
                  noteKh: "ស្ថិតនៅក្រលៀន។ ត្រង lymph ពីជើង and ពោះទាប — ច្រើនហើមនៅពេលមានការឆ្លងនៅជើង ឬភ្លៅ។",
                },
              ].map(({ nameEn, nameKh, emoji, noteEn, noteKh }) => (
                <Card key={nameEn}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl" aria-hidden>{emoji}</span>
                    <div>
                      <h4 className="font-bold" style={{ color: PALE }}>{t(nameEn, nameKh)}</h4>
                      <p className="font-khmer text-xs" style={{ color: TEXT_DIM }}>{nameKh}</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: TEXT }}>{t(noteEn, noteKh)}</p>
                </Card>
              ))}
            </div>

            {/* Spleen */}
            <Card highlight>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <ShieldSvg />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: PALE }}>
                    {t("The Spleen — The Giant Blood Filter", "អ័ព្ទ — ម៉ាស៊ីនត្រងឈាមធំបំផុត")}
                  </h3>
                  <p className="font-khmer text-xs mb-3" style={{ color: TEXT_DIM }}>
                    អ័ព្ទ — សរីរាង្គ lymphatic ធំជាងគេ
                  </p>
                  <p className="text-sm mb-3" style={{ color: TEXT }}>
                    {t(
                      "The spleen is the largest lymphatic organ — about the size of a fist, located in the upper-left abdomen under the ribcage. Unlike lymph nodes which filter lymph fluid, the spleen filters blood directly.",
                      "អ័ព្ទគឺជាសរីរាង្គ lymphatic ធំបំផុត — ទំហំប្រហែលកណ្តាប់ដៃ ស្ថិតនៅពោះខាងលើ-ឆ្វេង ក្រោម​ braast of ribs ។ ខុសពី lymph node ដែលត្រង lymph fluid អ័ព្ទត្រងឈាមផ្ទាល់។"
                    )}
                  </p>
                  <p className="text-sm" style={{ color: TEXT_DIM }}>
                    {t(
                      "It destroys old and damaged red blood cells, stores a reserve of blood that can be released during heavy bleeding, and houses large numbers of lymphocytes and macrophages ready to fight infection.",
                      "វាបំផ្លាញកោសិកាឈាមក្រហមចាស់ and ខូច ផ្ទុកទុនបំរុងឈាម ហើយផ្ទុក lymphocyte and macrophage ជាច្រើន ត្រៀមប្រយុទ្ធ​ប្រឆាំង​ការ​ឆ្លង។"
                    )}
                  </p>
                </div>
              </div>
            </Card>

          </section>

        </div>

        {/* Footer breadcrumb */}
        <footer className="mt-16 pt-8 border-t text-xs font-mono" style={{ borderColor: `${TEAL}33`, color: TEXT_DIM }}>
          {t("Science · Human Body · Lymphatic System", "វិទ្យាសាស្ត្រ · រាងកាយ · ប្រព័ន្ធទឹករងៃ")}
        </footer>

      </div>
    </div>
  );
}
