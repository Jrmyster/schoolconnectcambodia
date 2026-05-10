import { Link } from "wouter";
import { ArrowLeft, Satellite, AlertTriangle, Globe, Radio, Radar } from "lucide-react";
import { useTranslation } from "@/store/use-language";

const BG        = "#03080f";
const PANEL     = "#060e1c";
const PANEL_MID = "#0a1628";
const BLUE      = "#3b82f6";
const CYAN      = "#06b6d4";
const PALE      = "#f0f9ff";
const TEXT      = "#bfdbfe";
const TEXT_DIM  = "#60a5fa";
const AMBER     = "#f59e0b";
const AMBER_DIM = "#78350f";
const RED       = "#ef4444";
const GOLD      = "#fbbf24";

function glow(c: string, r = 8) {
  return `0 0 ${r}px ${c}55, 0 0 ${r * 2}px ${c}22`;
}

function SectionTitle({ icon: Icon, en, kh, id, warn = false }: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; style?: React.CSSProperties }>;
  en: string; kh: string; id?: string; warn?: boolean;
}) {
  const col = warn ? AMBER : CYAN;
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden style={{ color: col } as React.CSSProperties} />
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: PALE }}>{en}</h2>
      </div>
      <p className="font-khmer text-base sm:text-lg" style={{ color: warn ? GOLD : TEXT_DIM }}>{kh}</p>
    </header>
  );
}

function Card({ children, highlight = false, warn = false }: {
  children: React.ReactNode; highlight?: boolean; warn?: boolean;
}) {
  const border = warn ? `${AMBER}55` : `${BLUE}44`;
  const bg = warn ? AMBER_DIM : (highlight ? PANEL_MID : PANEL);
  return (
    <div className="rounded-2xl p-5 sm:p-6 border" style={{
      background: bg,
      borderColor: border,
      boxShadow: highlight || warn ? glow(warn ? AMBER : BLUE, 6) : "none",
    }}>
      {children}
    </div>
  );
}

/* ── SVG Illustrations ── */

function SatelliteSvg() {
  return (
    <svg viewBox="0 0 140 100" className="w-32 h-24 mx-auto" role="img" aria-label="Satellite with solar panels">
      {/* Body */}
      <rect x="55" y="38" width="30" height="24" rx="4" fill={PANEL_MID} stroke={CYAN} strokeWidth="1.5" />
      {/* Left solar panel */}
      <rect x="18" y="40" width="32" height="20" rx="2" fill={BLUE} opacity="0.7" stroke={CYAN} strokeWidth="1" />
      <line x1="26" y1="40" x2="26" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      <line x1="34" y1="40" x2="34" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      <line x1="42" y1="40" x2="42" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      {/* Strut left */}
      <line x1="50" y1="50" x2="55" y2="50" stroke={CYAN} strokeWidth="1.5" />
      {/* Right solar panel */}
      <rect x="90" y="40" width="32" height="20" rx="2" fill={BLUE} opacity="0.7" stroke={CYAN} strokeWidth="1" />
      <line x1="98" y1="40" x2="98" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      <line x1="106" y1="40" x2="106" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      <line x1="114" y1="40" x2="114" y2="60" stroke={CYAN} strokeWidth="0.5" opacity="0.5" />
      {/* Strut right */}
      <line x1="85" y1="50" x2="90" y2="50" stroke={CYAN} strokeWidth="1.5" />
      {/* Dish */}
      <ellipse cx="70" cy="34" rx="8" ry="4" fill="none" stroke={CYAN} strokeWidth="1.5" />
      <line x1="70" y1="34" x2="70" y2="38" stroke={CYAN} strokeWidth="1.5" />
      {/* Signal waves */}
      <path d="M78 28 Q82 24,78 20" fill="none" stroke={CYAN} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <path d="M82 30 Q88 24,82 18" fill="none" stroke={CYAN} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function GlobeOrbitSvg() {
  return (
    <svg viewBox="0 0 140 120" className="w-32 h-28 mx-auto" role="img" aria-label="Earth with orbital rings">
      {/* Earth */}
      <circle cx="70" cy="60" r="30" fill="#1e3a5f" stroke={BLUE} strokeWidth="1.5" />
      <ellipse cx="70" cy="60" rx="30" ry="10" fill="none" stroke={BLUE} strokeWidth="0.8" opacity="0.5" />
      <path d="M55 45 Q60 50,55 55 Q60 60,65 55 Q70 50,75 55 Q80 60,75 65 Q70 70,65 65" fill="none" stroke={CYAN} strokeWidth="1" opacity="0.6" />
      {/* Orbit ring 1 (LEO) */}
      <ellipse cx="70" cy="60" rx="48" ry="18" fill="none" stroke={CYAN} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      {/* Satellite on LEO */}
      <circle cx="118" cy="60" r="3" fill={CYAN} />
      <line x1="114" y1="60" x2="116" y2="58" stroke={CYAN} strokeWidth="1.5" />
      <line x1="114" y1="60" x2="116" y2="62" stroke={CYAN} strokeWidth="1.5" />
      {/* Orbit ring 2 (GEO) */}
      <ellipse cx="70" cy="60" rx="65" ry="26" fill="none" stroke={BLUE} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
      <circle cx="5" cy="60" r="2.5" fill={BLUE} opacity="0.7" />
    </svg>
  );
}

function DebrisFieldSvg() {
  const pieces = [
    {x:30,y:25,r:3}, {x:55,y:15,r:2}, {x:80,y:30,r:4}, {x:105,y:20,r:2.5},
    {x:20,y:55,r:2}, {x:45,y:70,r:3.5}, {x:70,y:60,r:2}, {x:95,y:75,r:3},
    {x:115,y:50,r:2}, {x:38,y:85,r:3}, {x:65,y:90,r:2.5}, {x:90,y:85,r:2},
  ];
  return (
    <svg viewBox="0 0 140 110" className="w-32 h-28 mx-auto" role="img" aria-label="Space debris field">
      {/* Earth faint */}
      <circle cx="70" cy="55" r="22" fill="#1e1a0a" stroke={AMBER} strokeWidth="1" opacity="0.6" />
      {/* Debris */}
      {pieces.map((p, i) => (
        <g key={i}>
          <polygon
            points={`${p.x},${p.y - p.r} ${p.x + p.r * 0.8},${p.y + p.r * 0.6} ${p.x - p.r * 0.8},${p.y + p.r * 0.6}`}
            fill={RED} opacity={0.5 + (i % 4) * 0.12}
          />
        </g>
      ))}
      {/* Warning glow ring */}
      <circle cx="70" cy="55" r="40" fill="none" stroke={AMBER} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
    </svg>
  );
}

export default function KesslerSyndromePage() {
  const t = useTranslation();

  const pioneers = [
    {
      emoji: "🛰️",
      nameEn: "Sputnik 1 (1957)",
      nameKh: "Sputnik 1 (1957)",
      descEn: "The first artificial satellite, launched by the Soviet Union. A simple metal sphere 58 cm wide, it beeped a radio signal that the entire world could hear — and changed history forever.",
      descKh: "ផ្កាយរណបសិប្បនិម្មិតដំបូងបង្អស់ បាញ់ដោយសហភាពសូវៀត — ផ្លាស់ប្តូរប្រវត្តិសាស្ត្រ។",
    },
    {
      emoji: "🚀",
      nameEn: "ISS — The Space Station",
      nameKh: "ISS — មន្ទីរពិសោធន៍អវកាស",
      descEn: "The International Space Station is the largest human-made object in space, orbiting at 400 km altitude. It has been continuously inhabited since 2000 and serves as humanity's outpost in orbit.",
      descKh: "វត្ថុមនុស្សសាងសង់ធំបំផុតក្នុងអវកាស ថ្មមនុស្សរស់នៅបន្ត ចាប់ពីឆ្នាំ 2000។",
    },
    {
      emoji: "🔭",
      nameEn: "Hubble Space Telescope",
      nameKh: "កែវយឹតអវកាស Hubble",
      descEn: "Launched in 1990, Hubble orbits 547 km above Earth and has captured images of galaxies billions of light-years away — giving humanity its deepest view of the cosmos.",
      descKh: "បានបាញ់ឆ្នាំ 1990 Hubble ចាប់យករូបភាពហ្គាឡាក់ស៊ីឆ្ងាយជាងមួយពាន់លានឆ្នាំពន្លឺ។",
    },
    {
      emoji: "📡",
      nameEn: "GPS Network",
      nameKh: "បណ្តាញ GPS",
      descEn: "A constellation of 31 active satellites operated by the US military. Every time you navigate with your phone, signals from at least four of these satellites calculate your position to within a few metres.",
      descKh: "ផ្កាយរណប 31 របស់កងទัพអាមេរិក ប្រើក្នុងការកំណត់ទីតាំងទូរស័ព្ទ GPS។",
    },
  ];

  const orbitStats = [
    {
      label: t("Active Satellites", "ផ្កាយរណបដំណើរការ"),
      value: "~9,000–10,000",
      note: t("Currently in Earth orbit", "នៅក្នុងគន្លងផែនដី"),
      color: CYAN,
    },
    {
      label: t("Trackable Debris Objects", "វត្ថុសំរាមអាចតាមដាន"),
      value: "~27,000+",
      note: t("Dead satellites, rocket stages, shrapnel", "ផ្កាយរណបស្លាប់ ថ្នាក់រ៉ូកែត"),
      color: AMBER,
    },
    {
      label: t("Estimated Small Fragments", "វត្ថុតូចៗប្រហែល"),
      value: "~1 Million+",
      note: t("Objects too small to track but deadly", "តូចពេកដើម្បីតាមដាន ប៉ុន្តែគ្រោះថ្នាក់"),
      color: RED,
    },
    {
      label: t("Collision Speed", "ល្បឿននៃការប៉ះទង្គិច"),
      value: "~27,000 km/h",
      note: t("A paint fleck at this speed punches through steel", "ទឹមមួយភ្នែកអាចចូលរន្ធដែក"),
      color: GOLD,
    },
  ];

  const solutions = [
    {
      emoji: "📡",
      titleEn: "Radar Tracking",
      titleKh: "ការតាមដានដោយ Radar",
      descEn: "Space agencies and militaries operate radar networks that continuously track objects as small as 10 cm in orbit, publishing public catalogues so satellite operators can plan avoidance manoeuvres days in advance.",
      descKh: "ស្ថានីយ radar តាមដានវត្ថុតូចជាង 10 cm ក្នុងគន្លង ដើម្បីជួយ operator គ្រប់គ្រងការជៀស។",
    },
    {
      emoji: "🤖",
      titleEn: "Autonomous Collision Avoidance",
      titleKh: "ការជៀសវាងដោយស្វ័យប្រវត្តិ",
      descEn: "Modern satellites like SpaceX Starlink use AI-driven algorithms to automatically fire thrusters and dodge incoming debris, performing thousands of avoidance manoeuvres every year without human input.",
      descKh: "ផ្កាយរណប Starlink ប្រើ AI ជំរុញ thruster ដោយស្វ័យប្រវត្តិ ជួសជៀសវត្ថុគ្រោះថ្នាក់។",
    },
    {
      emoji: "🛸",
      titleEn: "Debris Removal Satellites",
      titleKh: "ផ្កាយរណបដក់យករំអិល",
      descEn: "Experimental 'tow-truck' satellites — like ESA's ClearSpace-1 — are designed to use robotic arms or nets to capture dead satellites and drag them into a lower orbit where they burn up harmlessly in the atmosphere.",
      descKh: "ផ្កាយរណប ClearSpace-1 របស់ ESA ប្រើដៃ robot ចាប់ ហើយទាញផ្កាយរណបស្លាប់ចូលបរិយាកាស។",
    },
    {
      emoji: "📜",
      titleEn: "International Space Law",
      titleKh: "ច្បាប់អន្តរជាតិអវកាស",
      descEn: "The UN's Space Debris Mitigation Guidelines recommend that satellites de-orbit within 25 years of mission end. New proposals push for mandatory active debris removal and a 'polluter pays' framework for space operators.",
      descKh: "UN ណែនាំប្រទេសទាំងអស់ ទាញផ្កាយរណបចំណាស់ចេញក្នុង 25 ឆ្នាំ ក្រោយបញ្ចប់បេសកកម្ម។",
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>

      {/* Background starfield */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 137.5) % 1200;
            const y = (i * 93.7) % 800;
            const r = 0.5 + (i % 3) * 0.5;
            return <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.3 + (i % 5) * 0.14} />;
          })}
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(3,8,15,0.92) 85%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Back link */}
        <Link href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: CYAN }}>
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* HERO */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${CYAN}`, color: CYAN }}>
            <Satellite className="w-3.5 h-3.5" aria-hidden />
            {t("Astronomy · Space", "តារាសាស្ត្រ · អវកាស")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: PALE }}>
            {t("Satellites & Kessler Syndrome", "ផ្កាយរណប និងរោគសញ្ញា Kessler")}
          </h1>
          <p className="font-khmer text-2xl sm:text-3xl mb-6" style={{ color: CYAN }}>
            ផ្កាយរណប និងរោគសញ្ញា Kessler
          </p>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: TEXT }}>
            {t(
              "An exploration of humanity's mechanical constellation — the history of orbital flight, how we filled the sky with thousands of satellites, and the ticking clock of space debris that could one day trap us on Earth forever.",
              "ការស្វែងយល់ពីប្រវត្តិផ្កាយរណប និងគ្រោះថ្នាក់នៃសំរាមអវកាស ដែលអាចរារាំងយើងពីការចុះឡើងអវកាស។"
            )}
          </p>
        </header>

        {/* SECTION 1: Pioneers */}
        <section className="mb-12 sm:mb-16" aria-labelledby="pioneers">
          <SectionTitle icon={Satellite} en="The Pioneers of Orbit" kh="អ្នកត្រួសត្រាយផ្លូវក្នុងគន្លងអវកាស" id="pioneers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {pioneers.map((p, i) => (
              <Card key={i} highlight={i === 0}>
                <div className="flex gap-4">
                  <span className="text-3xl flex-shrink-0" aria-hidden="true">{p.emoji}</span>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: CYAN }}>{t(p.nameEn, p.nameKh)}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT }}>{t(p.descEn, p.descKh)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <GlobeOrbitSvg />
          </div>
        </section>

        {/* SECTION 2: A Crowded Sky */}
        <section className="mb-12 sm:mb-16" aria-labelledby="crowded-sky">
          <SectionTitle icon={Globe} en="A Crowded Sky" kh="មេឃដែលពោរពេញដោយផ្កាយរណប" id="crowded-sky" />

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {orbitStats.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 border text-center" style={{
                background: PANEL_MID, borderColor: `${s.color}55`,
                boxShadow: glow(s.color, 4),
              }}>
                <p className="text-3xl sm:text-4xl font-bold font-mono mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-sm font-semibold mb-1" style={{ color: PALE }}>{s.label}</p>
                <p className="text-xs" style={{ color: TEXT_DIM }}>{s.note}</p>
              </div>
            ))}
          </div>

          {/* Orbit zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card highlight>
              <h3 className="font-bold text-base mb-2" style={{ color: CYAN }}>
                {t("Low Earth Orbit (LEO)", "គន្លងផែនដីកម្រិតទាប (LEO)")}
              </h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: TEXT }}>
                {t(
                  "160 – 2,000 km above Earth. The most congested zone in space — home to the ISS, weather satellites, spy satellites, and massive new internet constellations like SpaceX Starlink (4,000+ satellites) and Amazon Kuiper.",
                  "160–2,000 km លើផែនដី ក្រចក LEO ជាតំបន់ច្រើនផ្កាយរណបបំផុត — ISS Starlink Amazon Kuiper។"
                )}
              </p>
              <div className="text-xs font-mono px-3 py-1 rounded-full inline-block" style={{ background: `${BLUE}33`, color: CYAN }}>
                ~160 – 2,000 km
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-base mb-2" style={{ color: BLUE }}>
                {t("Geosynchronous Orbit (GEO)", "គន្លង Geosynchronous (GEO)")}
              </h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: TEXT }}>
                {t(
                  "35,786 km above the equator. At this altitude a satellite takes exactly 24 hours to orbit — meaning it appears fixed over one spot on Earth. Critical for TV broadcasting, weather forecasting, and long-range communications.",
                  "35,786 km លើខ្សែអេក្វាទ័រ ផ្កាយរណប GEO ចំណាយ 24 ម៉ោងក្នុងមួយជុំ — ហាក់ដូចជានៅទីតាំងថេរ។"
                )}
              </p>
              <div className="text-xs font-mono px-3 py-1 rounded-full inline-block" style={{ background: `${BLUE}22`, color: BLUE }}>
                ~35,786 km
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 3: Kessler Syndrome — WARNING THEME */}
        <section className="mb-12 sm:mb-16" aria-labelledby="kessler">
          <SectionTitle icon={AlertTriangle} en="The Danger of Kessler Syndrome" kh="គ្រោះថ្នាក់នៃរោគសញ្ញា Kessler" id="kessler" warn />

          {/* Callout box */}
          <div className="rounded-2xl p-6 sm:p-8 border-l-4 mb-8" style={{ background: "#1a0e00", borderColor: AMBER }}>
            <p className="text-sm font-mono uppercase tracking-widest mb-2" style={{ color: AMBER }}>
              {t("Theory proposed by NASA scientist Donald Kessler, 1978", "ទ្រឹស្តីស្នើឡើងដោយ Donald Kessler ឆ្នាំ 1978")}
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: PALE }}>
              {t(
                "If the density of objects in Low Earth Orbit becomes too high, a single collision could trigger a chain reaction — one crash creates a cloud of debris that strikes more satellites, creating even more debris, in an unstoppable cascade that fills the orbital shell with lethal shrapnel.",
                "ប្រសិនបើវត្ថុក្នុង LEO ច្រើនពេក ការប៉ះទង្គិចតែមួយ អាចបង្កជាប្រតិកម្មខ្សែសង្វាក់ — សំរាមមួយបំផ្លាញអ្នកផ្សេង ហើយបង្កើតសំរាមបន្ថែម គ្មានទំហំឈប់។"
              )}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <DebrisFieldSvg />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card warn>
              <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{ color: GOLD }}>
                <span aria-hidden="true">⚠️</span>
                {t("The Chain Reaction", "ប្រតិកម្មខ្សែសង្វាក់")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#fef3c7" }}>
                {t(
                  "Step 1: Two objects collide at 27,000 km/h. Step 2: The collision generates thousands of fragments. Step 3: Fragments strike other satellites. Step 4: More collisions, more debris. The cascade becomes self-sustaining — no human action can stop it once it begins.",
                  "ជំហាន 1: ប៉ះទង្គិចល្បឿន 27,000 km/h ។ ជំហាន 2: បង្កើតកំណាត់ ។ ជំហាន 3: កំណាត់ប៉ះផ្កាយរណបផ្សេង ។ ជំហាន 4: ខ្សែសង្វាក់ *មិនអាចបញ្ឈប់*។"
                )}
              </p>
            </Card>
            <Card warn>
              <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{ color: GOLD }}>
                <span aria-hidden="true">🔴</span>
                {t("The Consequence", "ផលវិបាក")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#fef3c7" }}>
                {t(
                  "A full Kessler Syndrome event would create a permanent debris belt around Earth — making it too dangerous to launch new rockets through. This would destroy GPS, internet satellites, weather forecasting, and scientific observation from space — effectively trapping humanity on Earth.",
                  "Kessler Syndrome ពេញលេញ នឹងបង្កើតក្រចកសំរាមអចិន្ត្រៃ ប្លង់ GPS អ៊ីនធឺណិត ការព្យាករអាកាសធាតុ — ហើយជាប់ជាប់ *ទប់មនុស្សនៅផែនដី*។"
                )}
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 4: Space Traffic Management */}
        <section className="mb-12 sm:mb-16" aria-labelledby="traffic">
          <SectionTitle icon={Radar} en="Space Traffic Management" kh="ការគ្រប់គ្រងចរាចរណ៍អវកាស" id="traffic" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {solutions.map((s, i) => (
              <Card key={i} highlight={i === 0}>
                <div className="text-3xl mb-3" aria-hidden="true">{s.emoji}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: CYAN }}>
                  {t(s.titleEn, s.titleKh)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  {t(s.descEn, s.descKh)}
                </p>
              </Card>
            ))}
          </div>

          {/* Closing note */}
          <div className="mt-8 rounded-2xl p-6 border" style={{ background: PANEL_MID, borderColor: `${CYAN}33` }}>
            <div className="flex gap-3">
              <Radio className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden style={{ color: CYAN } as React.CSSProperties} />
              <div>
                <p className="font-bold mb-1" style={{ color: PALE }}>
                  {t("The Bottom Line", "សេចក្តីសន្និដ្ឋាន")}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  {t(
                    "Space is not infinite. The thin shell of Low Earth Orbit that makes modern civilisation possible — GPS, weather forecasting, internet, navigation — is a shared resource. How we manage it over the next 50 years will determine whether future generations can look up and still reach the stars.",
                    "អវកាសមិនគ្មានដែនកំណត់ទេ។ គន្លង LEO ដែលផ្តល់ GPS អ៊ីនធឺណិត ការព្យាករអាកាស — ជាធនធានរួម ដែលយើងត្រូវវប្បធម៌ដើម្បីជំនាន់ក្រោយ។"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
