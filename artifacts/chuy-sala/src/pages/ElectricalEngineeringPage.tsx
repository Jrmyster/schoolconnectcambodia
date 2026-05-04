import { Link } from "wouter";
import {
  ArrowLeft,
  Zap,
  Cpu,
  Activity,
  Layers,
  Sigma,
  Lightbulb,
  Battery,
  Radio,
  CircuitBoard,
  Gauge,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  ELECTRICAL ENGINEERING REFERENCE
 *  ឯកសារយោងវិស្វកម្មអគ្គិសនី
 *
 *  Aesthetic: PCB cheat-sheet — deep board green, copper traces, gold pads,
 *  white silk-screen labels. Bilingual EN/KH throughout. No images: every
 *  diagram is hand-rolled SVG, every datasheet is a semantic <table>.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Palette ────────────────────────────────────────────────────────────────
const BG          = "#0a1f14"; // dark PCB green
const PANEL       = "#0f2a1c"; // soldermask
const PANEL_SOFT  = "#143a27";
const TRACE       = "#b8730a"; // copper trace
const PAD         = "#fbbf24"; // gold pad
const SILK        = "#f0fdf4"; // silk-screen white
const LIME        = "#84cc16"; // signal green
const TEXT        = "#dcfce7";
const TEXT_DIM    = "#86efac";
const TEXT_MUTED  = "#4ade80";
const RED         = "#ef4444";
const BLUE        = "#3b82f6";

// Resistor colour-band swatches (with a readable text colour)
const BAND_COLORS: Record<
  string,
  { bg: string; text: string; en: string; kh: string }
> = {
  black:  { bg: "#000000", text: "#ffffff", en: "Black",  kh: "ខ្មៅ" },
  brown:  { bg: "#7c2d12", text: "#ffffff", en: "Brown",  kh: "ត្នោត" },
  red:    { bg: "#dc2626", text: "#ffffff", en: "Red",    kh: "ក្រហម" },
  orange: { bg: "#ea580c", text: "#ffffff", en: "Orange", kh: "ទឹកក្រូច" },
  yellow: { bg: "#facc15", text: "#000000", en: "Yellow", kh: "លឿង" },
  green:  { bg: "#16a34a", text: "#ffffff", en: "Green",  kh: "បៃតង" },
  blue:   { bg: "#2563eb", text: "#ffffff", en: "Blue",   kh: "ខៀវ" },
  violet: { bg: "#7c3aed", text: "#ffffff", en: "Violet", kh: "ស្វាយ" },
  grey:   { bg: "#6b7280", text: "#ffffff", en: "Grey",   kh: "ប្រផេះ" },
  white:  { bg: "#ffffff", text: "#000000", en: "White",  kh: "ស" },
  gold:   { bg: "#d4a72c", text: "#000000", en: "Gold",   kh: "មាស" },
  silver: { bg: "#9ca3af", text: "#000000", en: "Silver", kh: "ប្រាក់" },
};

/* ── Tiny shared sub-components ──────────────────────────────────────────── */

function SectionHeader({
  num,
  icon: Icon,
  titleEn,
  titleKh,
}: {
  num: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean | "true" | "false" }>;
  titleEn: string;
  titleKh: string;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-md font-mono text-sm font-bold"
          style={{ background: TRACE, color: SILK }}
          aria-hidden="true"
        >
          {num}
        </span>
        <Icon className="w-5 h-5" style={{ color: PAD }} aria-hidden="true" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: SILK }}>
          {titleEn}
        </h2>
      </div>
      <p className="font-khmer text-base sm:text-lg" style={{ color: TEXT_DIM }}>
        {titleKh}
      </p>
    </header>
  );
}

function Eq({ children }: { children: React.ReactNode }) {
  // Equation rendering — serif italic for variables, mono fallback for safety.
  return (
    <span
      className="font-serif italic"
      style={{ color: PAD, letterSpacing: "0.02em" }}
    >
      {children}
    </span>
  );
}

function Frac({
  top,
  bot,
}: {
  top: React.ReactNode;
  bot: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex flex-col items-center align-middle font-serif italic mx-1"
      style={{ color: PAD, lineHeight: 1 }}
    >
      <span className="text-[0.95em] px-1.5 pb-0.5">{top}</span>
      <span
        className="text-[0.95em] px-1.5 pt-0.5"
        style={{ borderTop: `1px solid ${PAD}` }}
      >
        {bot}
      </span>
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border ${className}`}
      style={{
        background: PANEL,
        borderColor: `${TRACE}55`,
        boxShadow: `0 0 0 1px ${TRACE}22 inset`,
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
      className="text-left font-mono text-xs uppercase tracking-wider px-3 py-2"
      style={{
        color: PAD,
        background: PANEL_SOFT,
        borderBottom: `1px solid ${TRACE}77`,
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  mono = false,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <td
      className={`px-3 py-2 ${mono ? "font-mono" : ""}`}
      style={{ color: TEXT, borderBottom: `1px solid ${TRACE}22` }}
    >
      {children}
    </td>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ══════════════════════════════════════════════════════════════════════════ */

export default function ElectricalEngineeringPage() {
  const t = useTranslation();

  // ── METRIC PREFIXES ────────────────────────────────────────────────────
  const PREFIXES: Array<{ name: string; abbr: string; value: string }> = [
    { name: "Tera",  abbr: "T",  value: "10¹²" },
    { name: "Giga",  abbr: "G",  value: "10⁹"  },
    { name: "Mega",  abbr: "M",  value: "10⁶"  },
    { name: "Kilo",  abbr: "k",  value: "10³"  },
    { name: "Hecto", abbr: "h",  value: "10²"  },
    { name: "Deca",  abbr: "da", value: "10¹"  },
    { name: "—",     abbr: "—",  value: "10⁰"  },
    { name: "Deci",  abbr: "d",  value: "10⁻¹" },
    { name: "Centi", abbr: "c",  value: "10⁻²" },
    { name: "Milli", abbr: "m",  value: "10⁻³" },
    { name: "Micro", abbr: "µ",  value: "10⁻⁶" },
    { name: "Nano",  abbr: "n",  value: "10⁻⁹" },
    { name: "Pico",  abbr: "p",  value: "10⁻¹²" },
  ];

  // ── ELECTRICAL UNITS ───────────────────────────────────────────────────
  const UNITS: Array<{ qty: string; abbr: string }> = [
    { qty: "Voltage / តង់ស្យុង",            abbr: "V — volt" },
    { qty: "Current / ចរន្ត",                 abbr: "I — ampere (A)" },
    { qty: "Resistance / រេស៊ីស្តង់",            abbr: "R — ohm (Ω)" },
    { qty: "Power / ថាមពល",                  abbr: "P — watt (W)" },
    { qty: "Energy / សកម្មភាព",               abbr: "E — joule (J)" },
    { qty: "Charge / បន្ទុក",                  abbr: "Q — coulomb (C)" },
    { qty: "Capacitance / កាប៉ាស៊ីតង់",         abbr: "C — farad (F)" },
    { qty: "Inductance / អាំងឌុចតង់",          abbr: "L — henry (H)" },
    { qty: "Frequency / ប្រេកង់",              abbr: "f — hertz (Hz)" },
    { qty: "Impedance / អាំពេដង់",             abbr: "Z — ohm (Ω)" },
    { qty: "Conductance / ដំណើរការ",            abbr: "G — siemens (S)" },
    { qty: "Magnetic flux / លំហូរម៉ាញេទិច",      abbr: "Φ — weber (Wb)" },
  ];

  // ── CAPACITANCE CONVERSION ─────────────────────────────────────────────
  const CAP_CONV: Array<{ uF: string; nF: string; pF: string }> = [
    { uF: "1 µF",      nF: "1,000 nF",     pF: "1,000,000 pF" },
    { uF: "0.1 µF",    nF: "100 nF",       pF: "100,000 pF" },
    { uF: "0.01 µF",   nF: "10 nF",        pF: "10,000 pF" },
    { uF: "0.001 µF",  nF: "1 nF",         pF: "1,000 pF" },
    { uF: "0.0001 µF", nF: "0.1 nF",       pF: "100 pF" },
  ];

  // ── CAPACITOR TOLERANCE CODES ──────────────────────────────────────────
  const CAP_TOL: Array<{ code: string; tol: string }> = [
    { code: "B", tol: "± 0.1 pF" },
    { code: "C", tol: "± 0.25 pF" },
    { code: "D", tol: "± 0.5 pF" },
    { code: "F", tol: "± 1 %" },
    { code: "G", tol: "± 2 %" },
    { code: "J", tol: "± 5 %" },
    { code: "K", tol: "± 10 %" },
    { code: "M", tol: "± 20 %" },
    { code: "Z", tol: "+ 80 % / − 20 %" },
  ];

  // ── LED FORWARD VOLTAGE ────────────────────────────────────────────────
  const LEDS: Array<{ color: string; wave: string; vf: string }> = [
    { color: "Infrared / អ៊ីនហ្វ្រារ៉េដ", wave: "≥ 760 nm",  vf: "1.2 V – 1.6 V" },
    { color: "Red / ក្រហម",                wave: "610 – 760", vf: "1.6 V – 2.0 V" },
    { color: "Orange / ទឹកក្រូច",          wave: "590 – 610", vf: "2.0 V – 2.1 V" },
    { color: "Yellow / លឿង",                wave: "570 – 590", vf: "2.1 V – 2.2 V" },
    { color: "Green / បៃតង",                wave: "500 – 570", vf: "2.0 V – 3.5 V" },
    { color: "Blue / ខៀវ",                  wave: "450 – 500", vf: "2.5 V – 3.7 V" },
    { color: "Violet / ស្វាយ",              wave: "400 – 450", vf: "2.8 V – 4.0 V" },
    { color: "Ultraviolet / អ៊ុលត្រាវីយូឡេ", wave: "≤ 400",    vf: "3.1 V – 4.4 V" },
    { color: "White / ស",                    wave: "broad",     vf: "3.0 V – 3.6 V" },
  ];

  // ── RESISTOR COLOR CODE TABLE ──────────────────────────────────────────
  const RES_BANDS: Array<{
    color: string;
    b1: string;
    b2: string;
    b3: string;
    mult: string;
    tol: string;
  }> = [
    { color: "black",  b1: "—", b2: "0", b3: "0", mult: "× 1",            tol: "—" },
    { color: "brown",  b1: "1", b2: "1", b3: "1", mult: "× 10",           tol: "± 1 %" },
    { color: "red",    b1: "2", b2: "2", b3: "2", mult: "× 100",          tol: "± 2 %" },
    { color: "orange", b1: "3", b2: "3", b3: "3", mult: "× 1 k",          tol: "—" },
    { color: "yellow", b1: "4", b2: "4", b3: "4", mult: "× 10 k",         tol: "—" },
    { color: "green",  b1: "5", b2: "5", b3: "5", mult: "× 100 k",        tol: "± 0.5 %" },
    { color: "blue",   b1: "6", b2: "6", b3: "6", mult: "× 1 M",          tol: "± 0.25 %" },
    { color: "violet", b1: "7", b2: "7", b3: "7", mult: "× 10 M",         tol: "± 0.1 %" },
    { color: "grey",   b1: "8", b2: "8", b3: "8", mult: "—",              tol: "± 0.05 %" },
    { color: "white",  b1: "9", b2: "9", b3: "9", mult: "—",              tol: "—" },
    { color: "gold",   b1: "—", b2: "—", b3: "—", mult: "× 0.1",          tol: "± 5 %" },
    { color: "silver", b1: "—", b2: "—", b3: "—", mult: "× 0.01",         tol: "± 10 %" },
  ];

  // ── AWG WIRE GAUGE ─────────────────────────────────────────────────────
  const AWG: Array<{
    awg: string;
    dia: string;
    area: string;
    res: string;
    amps: string;
  }> = [
    { awg: "0000 (4/0)", dia: "11.68", area: "107.2",   res: "0.16",  amps: "302" },
    { awg: "000 (3/0)",  dia: "10.40", area: "85.0",    res: "0.20",  amps: "239" },
    { awg: "00 (2/0)",   dia: "9.27",  area: "67.4",    res: "0.26",  amps: "190" },
    { awg: "0 (1/0)",    dia: "8.25",  area: "53.5",    res: "0.32",  amps: "150" },
    { awg: "2",          dia: "6.54",  area: "33.6",    res: "0.51",  amps: "94" },
    { awg: "4",          dia: "5.19",  area: "21.2",    res: "0.81",  amps: "60" },
    { awg: "6",          dia: "4.11",  area: "13.3",    res: "1.30",  amps: "37" },
    { awg: "8",          dia: "3.26",  area: "8.37",    res: "2.06",  amps: "24" },
    { awg: "10",         dia: "2.59",  area: "5.26",    res: "3.28",  amps: "15" },
    { awg: "12",         dia: "2.05",  area: "3.31",    res: "5.21",  amps: "9.3" },
    { awg: "14",         dia: "1.63",  area: "2.08",    res: "8.28",  amps: "5.9" },
    { awg: "16",         dia: "1.29",  area: "1.31",    res: "13.2",  amps: "3.7" },
    { awg: "18",         dia: "1.02",  area: "0.823",   res: "20.9",  amps: "2.3" },
    { awg: "20",         dia: "0.812", area: "0.518",   res: "33.3",  amps: "1.5" },
    { awg: "22",         dia: "0.644", area: "0.326",   res: "53.0",  amps: "0.92" },
    { awg: "24",         dia: "0.511", area: "0.205",   res: "84.2",  amps: "0.58" },
    { awg: "26",         dia: "0.405", area: "0.129",   res: "133.9", amps: "0.37" },
    { awg: "28",         dia: "0.321", area: "0.0810",  res: "212.9", amps: "0.23" },
    { awg: "30",         dia: "0.255", area: "0.0509",  res: "338.6", amps: "0.14" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>
      {/* ── PCB trace background ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 30 + i * 65;
            return (
              <g key={i}>
                <path
                  d={`M -20 ${y} L 250 ${y} L 280 ${y + 30} L 600 ${y + 30} L 630 ${y} L 1220 ${y}`}
                  fill="none"
                  stroke={TRACE}
                  strokeWidth="1.2"
                />
                <circle cx={250} cy={y} r={4} fill={PAD} />
                <circle cx={630} cy={y} r={4} fill={PAD} />
              </g>
            );
          })}
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(10,31,20,0.92) 90%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: PAD }}
          data-testid="link-back-science"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header className="mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{ border: `1px solid ${PAD}`, color: PAD }}
          >
            <CircuitBoard className="w-3.5 h-3.5" aria-hidden="true" />
            {t("Cheat Sheet", "សន្លឹកជំនួយ")}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{ color: SILK }}
          >
            {t("Electrical Engineering Reference", "Electrical Engineering Reference")}
          </h1>
          <p
            className="font-khmer text-2xl sm:text-3xl mb-6"
            style={{ color: PAD }}
          >
            ឯកសារយោងវិស្វកម្មអគ្គិសនី
          </p>
          <p className="text-base sm:text-lg max-w-3xl" style={{ color: TEXT }}>
            {t(
              "A single-page cheat-sheet for circuit-builders, students, and tinkerers — every formula, code chart, and pinout you reach for at the bench, rebuilt as accessible tables and SVG diagrams (no images).",
              "សន្លឹកជំនួយមួយទំព័រសម្រាប់អ្នកសាងសង់សៀគ្វី សិស្ស និងអ្នកចូលចិត្តពិសោធន៍ — រូបមន្ត តារាងកូដ និងផែនទីម្ជុលគ្រប់យ៉ាងដែលអ្នកត្រូវការ បានកសាងឡើងវិញជាតារាង និងគំនូសបំពេញច្បាស់លាស់។"
            )}
          </p>
        </header>

        <div className="space-y-12 sm:space-y-16">
          {/* ════════════════ 1. METRIC PREFIXES ════════════════ */}
          <section aria-labelledby="metric-prefixes">
            <SectionHeader
              num="01"
              icon={Sigma}
              titleEn="Metric Prefixes"
              titleKh="បុព្វបទម៉ែត្រ"
            />
            <Card>
              <div className="overflow-x-auto">
                <table
                  id="metric-prefixes"
                  className="w-full text-sm border-collapse"
                >
                  <thead>
                    <tr>
                      <Th>{t("Prefix", "បុព្វបទ")}</Th>
                      <Th>{t("Abbrev.", "អក្សរកាត់")}</Th>
                      <Th>{t("Value", "តម្លៃ")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREFIXES.map((p) => (
                      <tr key={p.value}>
                        <Td>{p.name}</Td>
                        <Td mono>{p.abbr}</Td>
                        <Td mono>{p.value}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* ════════════════ 2. OHM'S LAW ════════════════ */}
          <section aria-labelledby="ohms-law">
            <SectionHeader
              num="02"
              icon={Zap}
              titleEn="Ohm's Law"
              titleKh="ច្បាប់អូម"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold mb-4" style={{ color: SILK }}>
                  {t("Equations", "សមីការ")}
                </h3>
                <ul className="space-y-3 text-base">
                  <li>
                    <Eq>V</Eq> = <Eq>I</Eq> · <Eq>R</Eq>
                    <span className="ml-3 text-xs" style={{ color: TEXT_MUTED }}>
                      {t("voltage", "តង់ស្យុង")}
                    </span>
                  </li>
                  <li>
                    <Eq>I</Eq> = <Frac top="V" bot="R" />
                    <span className="ml-3 text-xs" style={{ color: TEXT_MUTED }}>
                      {t("current", "ចរន្ត")}
                    </span>
                  </li>
                  <li>
                    <Eq>R</Eq> = <Frac top="V" bot="I" />
                    <span className="ml-3 text-xs" style={{ color: TEXT_MUTED }}>
                      {t("resistance", "រេស៊ីស្តង់")}
                    </span>
                  </li>
                  <li>
                    <Eq>P</Eq> = <Eq>V</Eq> · <Eq>I</Eq>
                    <span className="ml-3 text-xs" style={{ color: TEXT_MUTED }}>
                      {t("power", "ថាមពល")}
                    </span>
                  </li>
                  <li>
                    <Eq>P</Eq> = <Eq>I</Eq>² · <Eq>R</Eq>
                  </li>
                  <li>
                    <Eq>P</Eq> = <Frac top={<>V²</>} bot="R" />
                  </li>
                </ul>
              </Card>

              {/* Equation Wheel — color-coded SVG */}
              <Card>
                <h3 className="text-lg font-bold mb-4" style={{ color: SILK }}>
                  {t("Equation Wheel", "កង់សមីការ")}
                </h3>
                <p className="text-xs mb-4" style={{ color: TEXT_DIM }}>
                  {t(
                    "Pick the quantity you want in the centre; the matching outer slice gives you three ways to compute it.",
                    "ជ្រើសបរិមាណដែលអ្នកចង់បាននៅកណ្តាល ផ្នែកខាងក្រៅផ្តល់នូវវិធី ៣ យ៉ាងដើម្បីគណនា។"
                  )}
                </p>
                <svg
                  viewBox="0 0 320 320"
                  className="w-full h-auto"
                  role="img"
                  aria-label={t(
                    "Ohm's law colour-coded equation wheel showing four sectors V, I, R, P",
                    "កង់សមីការច្បាប់អូមមាន ៤ ផ្នែកពណ៌៖ V, I, R, P"
                  )}
                >
                  {/* Outer ring slices */}
                  {[
                    { c: "#dc2626", label: "V", from: -45, to: 45 },
                    { c: "#16a34a", label: "I", from: 45,  to: 135 },
                    { c: "#2563eb", label: "R", from: 135, to: 225 },
                    { c: "#facc15", label: "P", from: 225, to: 315 },
                  ].map((s) => {
                    const cx = 160, cy = 160, rO = 145, rI = 80;
                    const a1 = (s.from * Math.PI) / 180;
                    const a2 = (s.to   * Math.PI) / 180;
                    const x1 = cx + rO * Math.cos(a1);
                    const y1 = cy + rO * Math.sin(a1);
                    const x2 = cx + rO * Math.cos(a2);
                    const y2 = cy + rO * Math.sin(a2);
                    const x3 = cx + rI * Math.cos(a2);
                    const y3 = cy + rI * Math.sin(a2);
                    const x4 = cx + rI * Math.cos(a1);
                    const y4 = cy + rI * Math.sin(a1);
                    const lx = cx + ((rI + rO) / 2) * Math.cos((a1 + a2) / 2);
                    const ly = cy + ((rI + rO) / 2) * Math.sin((a1 + a2) / 2);
                    return (
                      <g key={s.label}>
                        <path
                          d={`M ${x1} ${y1} A ${rO} ${rO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 0 0 ${x4} ${y4} Z`}
                          fill={s.c}
                          opacity="0.85"
                        />
                        <text
                          x={lx}
                          y={ly}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="32"
                          fontWeight="700"
                          fill={SILK}
                          fontFamily="serif"
                          fontStyle="italic"
                        >
                          {s.label}
                        </text>
                      </g>
                    );
                  })}
                  {/* Inner formula hub */}
                  <circle cx="160" cy="160" r="76" fill={PANEL_SOFT} stroke={PAD} strokeWidth="2" />
                  <text x="160" y="148" textAnchor="middle" fontSize="14" fill={PAD} fontFamily="monospace">
                    V = I·R
                  </text>
                  <text x="160" y="168" textAnchor="middle" fontSize="14" fill={PAD} fontFamily="monospace">
                    P = V·I
                  </text>
                  <text x="160" y="188" textAnchor="middle" fontSize="14" fill={PAD} fontFamily="monospace">
                    R = V/I
                  </text>
                </svg>
                <p className="mt-3 text-xs text-center" style={{ color: TEXT_MUTED }}>
                  <span style={{ color: "#dc2626" }}>V</span> · {" "}
                  <span style={{ color: "#16a34a" }}>I</span> · {" "}
                  <span style={{ color: "#2563eb" }}>R</span> · {" "}
                  <span style={{ color: "#facc15" }}>P</span>
                </p>
              </Card>
            </div>
          </section>

          {/* ════════════════ 3. CAPACITOR CODING ════════════════ */}
          <section aria-labelledby="cap-coding">
            <SectionHeader
              num="03"
              icon={Battery}
              titleEn="Capacitor Coding"
              titleKh="កូដប្រមាណភាព"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold mb-2" style={{ color: SILK }}>
                  {t("Ceramic Disc", "សេរ៉ាមិច")}
                </h3>
                <p className="text-sm mb-4" style={{ color: TEXT_DIM }}>
                  {t(
                    "Small, non-polarised. The 3-digit code reads like resistor SMD: first two digits are the value in pF, the third is the multiplier (number of zeros). E.g. 104 = 10 × 10⁴ pF = 100 nF = 0.1 µF. A trailing letter is the tolerance code.",
                    "តូច មិនមានបូក/ដក។ កូដ ៣ ខ្ទង់៖ លេខពីរដំបូងជាតម្លៃជា pF លេខទីបីជាចំនួនលេខសូន្យតម្រូវឱ្យបន្ថែម។ ឧ. 104 = 10 × 10⁴ pF = 100 nF = 0.1 µF។ អក្សរនៅខាងក្រោយជាកូដភាពលំអៀង។"
                  )}
                </p>
                <h3 className="text-lg font-bold mb-2" style={{ color: SILK }}>
                  {t("Electrolytic", "អេឡិចត្រូលីត")}
                </h3>
                <p className="text-sm" style={{ color: TEXT_DIM }}>
                  {t(
                    "Larger, polarised — the long lead is + and the side stripe marks the − terminal. Capacitance is printed directly (e.g. 100 µF) along with a maximum operating voltage rating (e.g. 25 V).",
                    "ធំជាង មានបូក/ដក — ខ្សែវែងជា + ហើយខ្សែដែលមានឆ្នូតនៅខាងគឺ −។ កាប៉ាស៊ីតង់បានបោះពុម្ពផ្ទាល់ (ឧ. 100 µF) រួមនឹងតង់ស្យុងអតិបរមា (ឧ. 25 V)។"
                  )}
                </p>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("Capacitance Conversion", "តារាងបំប្លែងកាប៉ាស៊ីតង់")}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <Th>µF</Th>
                        <Th>nF</Th>
                        <Th>pF</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAP_CONV.map((r) => (
                        <tr key={r.uF}>
                          <Td mono>{r.uF}</Td>
                          <Td mono>{r.nF}</Td>
                          <Td mono>{r.pF}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("Maximum Operating Voltage", "តង់ស្យុងប្រើប្រាស់អតិបរមា")}
                </h3>
                <p className="text-sm mb-3" style={{ color: TEXT_DIM }}>
                  {t(
                    "Never exceed the cap's voltage rating — apply only ~70 % of it for long-term reliability. Common ratings:",
                    "កុំឱ្យហួសតង់ស្យុងដែលបានកំណត់ — ប្រើតែប្រហែល ៧០% សម្រាប់ភាពយឺនយូរ។ តម្លៃធម្មតា៖"
                  )}
                </p>
                <p className="font-mono text-sm" style={{ color: PAD }}>
                  6.3 V · 10 V · 16 V · 25 V · 35 V · 50 V · 63 V · 100 V · 250 V · 400 V · 450 V
                </p>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("Tolerance Codes", "កូដភាពលំអៀង")}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <Th>{t("Code", "កូដ")}</Th>
                        <Th>{t("Tolerance", "ភាពលំអៀង")}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAP_TOL.map((r) => (
                        <tr key={r.code}>
                          <Td mono>{r.code}</Td>
                          <Td mono>{r.tol}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>

          {/* ════════════════ 4. DIODES & TRANSISTORS ════════════════ */}
          <section aria-labelledby="semis">
            <SectionHeader
              num="04"
              icon={Activity}
              titleEn="Diodes & Transistors"
              titleKh="ឌីយ៉ូត និងត្រង់ស៊ីស្ទ័រ"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {/* Diode */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("Diode", "ឌីយ៉ូត")}
                </h3>
                <svg viewBox="0 0 200 100" className="w-full h-auto" role="img" aria-label="Diode pinout: anode left, cathode right (band side)">
                  <line x1="10" y1="50" x2="70" y2="50" stroke={SILK} strokeWidth="3" />
                  <polygon points="70,30 70,70 110,50" fill={SILK} />
                  <line x1="110" y1="30" x2="110" y2="70" stroke={LIME} strokeWidth="4" />
                  <line x1="110" y1="50" x2="190" y2="50" stroke={SILK} strokeWidth="3" />
                  <text x="10"  y="85" fontSize="13" fill={PAD} fontFamily="monospace">A (Anode +)</text>
                  <text x="135" y="85" fontSize="13" fill={PAD} fontFamily="monospace">K (Cathode −)</text>
                </svg>
                <p className="mt-2 text-xs" style={{ color: TEXT_DIM }}>
                  {t("Band on the body marks the cathode.", "ឆ្នូតនៅលើតួ បង្ហាញពី Cathode។")}
                </p>
              </Card>

              {/* BJT */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("BJT (NPN / PNP)", "ត្រង់ស៊ីស្ទ័រ BJT")}
                </h3>
                <svg viewBox="0 0 200 130" className="w-full h-auto" role="img" aria-label="BJT pinout — base in middle, collector top, emitter bottom (NPN arrow points out)">
                  {/* Base in */}
                  <line x1="10"  y1="65" x2="70" y2="65" stroke={SILK} strokeWidth="2.5" />
                  <line x1="70"  y1="35" x2="70" y2="95" stroke={SILK} strokeWidth="4" />
                  {/* Collector up */}
                  <line x1="70"  y1="40" x2="130" y2="15" stroke={SILK} strokeWidth="2.5" />
                  <line x1="130" y1="15" x2="180" y2="15" stroke={SILK} strokeWidth="2.5" />
                  {/* Emitter down (NPN arrow out) */}
                  <line x1="70"  y1="90" x2="130" y2="115" stroke={SILK} strokeWidth="2.5" />
                  <polygon points="118,107 130,115 124,102" fill={LIME} />
                  <line x1="130" y1="115" x2="180" y2="115" stroke={SILK} strokeWidth="2.5" />
                  <text x="180" y="20"  fontSize="12" fill={PAD} fontFamily="monospace" textAnchor="end">C — Collector</text>
                  <text x="10"  y="60"  fontSize="12" fill={PAD} fontFamily="monospace">B — Base</text>
                  <text x="180" y="125" fontSize="12" fill={PAD} fontFamily="monospace" textAnchor="end">E — Emitter</text>
                </svg>
                <p className="mt-2 text-xs" style={{ color: TEXT_DIM }}>
                  {t(
                    "NPN: arrow points outward at the emitter. PNP: arrow points inward — current and bias are reversed.",
                    "NPN៖ ព្រួញនៅ Emitter ចុចចេញក្រៅ។ PNP៖ ព្រួញចុចចូល — ចរន្ត និង bias បញ្ច្រាស់។"
                  )}
                </p>
              </Card>

              {/* MOSFET */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("MOSFET", "MOSFET")}
                </h3>
                <svg viewBox="0 0 200 130" className="w-full h-auto" role="img" aria-label="MOSFET pinout — gate on left, drain top, source bottom">
                  {/* Gate */}
                  <line x1="10" y1="65" x2="60" y2="65" stroke={SILK} strokeWidth="2.5" />
                  <line x1="60" y1="35" x2="60" y2="95" stroke={SILK} strokeWidth="2.5" />
                  {/* Channel (3 segments) */}
                  <line x1="70" y1="35" x2="70" y2="55" stroke={SILK} strokeWidth="3" />
                  <line x1="70" y1="60" x2="70" y2="70" stroke={SILK} strokeWidth="3" />
                  <line x1="70" y1="75" x2="70" y2="95" stroke={SILK} strokeWidth="3" />
                  {/* Drain top */}
                  <line x1="70"  y1="40" x2="130" y2="15" stroke={SILK} strokeWidth="2.5" />
                  <line x1="130" y1="15" x2="180" y2="15" stroke={SILK} strokeWidth="2.5" />
                  {/* Source bottom */}
                  <line x1="70"  y1="90" x2="130" y2="115" stroke={SILK} strokeWidth="2.5" />
                  <polygon points="118,107 130,115 124,102" fill={LIME} />
                  <line x1="130" y1="115" x2="180" y2="115" stroke={SILK} strokeWidth="2.5" />
                  <text x="180" y="20"  fontSize="12" fill={PAD} fontFamily="monospace" textAnchor="end">D — Drain</text>
                  <text x="10"  y="60"  fontSize="12" fill={PAD} fontFamily="monospace">G — Gate</text>
                  <text x="180" y="125" fontSize="12" fill={PAD} fontFamily="monospace" textAnchor="end">S — Source</text>
                </svg>
                <p className="mt-2 text-xs" style={{ color: TEXT_DIM }}>
                  {t(
                    "Gate is voltage-driven (insulated). Drain–Source channel turns ON when V_GS exceeds threshold.",
                    "Gate ដំណើរការដោយតង់ស្យុង (មាន insulator)។ ឆានែល Drain–Source បើកនៅពេល V_GS លើសកម្រិត។"
                  )}
                </p>
              </Card>
            </div>
          </section>

          {/* ════════════════ 5. ELECTRICAL UNITS ════════════════ */}
          <section aria-labelledby="units">
            <SectionHeader
              num="05"
              icon={Gauge}
              titleEn="Electrical Units"
              titleKh="ឯកតាអគ្គិសនី"
            />
            <Card>
              <div className="overflow-x-auto">
                <table id="units" className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <Th>{t("Quantity", "បរិមាណ")}</Th>
                      <Th>{t("Symbol — Unit", "និមិត្តសញ្ញា — ឯកតា")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {UNITS.map((u) => (
                      <tr key={u.qty}>
                        <Td>{u.qty}</Td>
                        <Td mono>{u.abbr}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* ════════════════ 6. LEDs ════════════════ */}
          <section aria-labelledby="leds">
            <SectionHeader
              num="06"
              icon={Lightbulb}
              titleEn="Light-Emitting Diode (LED)"
              titleKh="ឌីយ៉ូតចេញពន្លឺ (LED)"
            />
            <Card>
              <div className="overflow-x-auto">
                <table id="leds" className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <Th>{t("Color", "ពណ៌")}</Th>
                      <Th>{t("Wavelength", "រលកវែង (nm)")}</Th>
                      <Th>{t("Forward Voltage Vf", "តង់ស្យុងពីមុខ Vf")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEDS.map((l) => (
                      <tr key={l.color}>
                        <Td>{l.color}</Td>
                        <Td mono>{l.wave}</Td>
                        <Td mono>{l.vf}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs" style={{ color: TEXT_DIM }}>
                {t(
                  "Always size a current-limiting resistor: R = (Vsource − Vf) / I_LED.  E.g. for a red LED on 5 V at 20 mA: R = (5 − 2) / 0.020 = 150 Ω.",
                  "តែងតែគណនារេស៊ីស្តង់កំណត់ចរន្ត៖ R = (Vsource − Vf) / I_LED។  ឧ. LED ក្រហមនៅ 5 V និង 20 mA៖ R = (5 − 2) / 0.020 = 150 Ω។"
                )}
              </p>
            </Card>
          </section>

          {/* ════════════════ 7. IC & REGULATORS ════════════════ */}
          <section aria-labelledby="ics">
            <SectionHeader
              num="07"
              icon={Cpu}
              titleEn="ICs & Regulators"
              titleKh="IC និងតួសម្រួលតង់ស្យុង"
            />
            <div className="grid md:grid-cols-2 gap-6">
              {/* LM78XX */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  LM78XX — {t("Linear Regulator (TO-220)", "តួសម្រួលតង់ស្យុង TO-220")}
                </h3>
                <svg viewBox="0 0 240 120" className="w-full h-auto" role="img" aria-label="LM78XX TO-220 pinout: 1 input, 2 ground, 3 output">
                  <rect x="40" y="20" width="160" height="60" rx="6" fill={PANEL_SOFT} stroke={PAD} strokeWidth="1.5" />
                  <text x="120" y="55" textAnchor="middle" fontSize="14" fill={SILK} fontFamily="monospace">LM 78XX</text>
                  {[
                    { x: 70,  pin: "1", lab: "IN  (Vin)" },
                    { x: 120, pin: "2", lab: "GND" },
                    { x: 170, pin: "3", lab: "OUT (Vout)" },
                  ].map((p) => (
                    <g key={p.pin}>
                      <line x1={p.x} y1="80" x2={p.x} y2="105" stroke={SILK} strokeWidth="2.5" />
                      <text x={p.x} y="118" textAnchor="middle" fontSize="11" fill={PAD} fontFamily="monospace">{p.pin}</text>
                      <text x={p.x} y="14"  textAnchor="middle" fontSize="10" fill={TEXT_DIM} fontFamily="monospace">{p.lab}</text>
                    </g>
                  ))}
                </svg>
                <p className="mt-2 text-xs" style={{ color: TEXT_DIM }}>
                  7805 → +5 V · 7809 → +9 V · 7812 → +12 V · 7815 → +15 V
                </p>
              </Card>

              {/* 555 IC */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  NE555 — {t("Timer IC (8-Pin DIP)", "IC ម៉ោង 8-Pin DIP")}
                </h3>
                <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="NE555 8-pin DIP pinout">
                  <rect x="80" y="20" width="100" height="160" rx="4" fill={PANEL_SOFT} stroke={PAD} strokeWidth="1.5" />
                  <circle cx="95" cy="35" r="3" fill={PAD} />
                  <text x="130" y="105" textAnchor="middle" fontSize="14" fill={SILK} fontFamily="monospace">555</text>
                  {[
                    { side: "L", pin: 1, lab: "GND" },
                    { side: "L", pin: 2, lab: "TRIG" },
                    { side: "L", pin: 3, lab: "OUT" },
                    { side: "L", pin: 4, lab: "RESET" },
                    { side: "R", pin: 8, lab: "Vcc" },
                    { side: "R", pin: 7, lab: "DISCH" },
                    { side: "R", pin: 6, lab: "THRESH" },
                    { side: "R", pin: 5, lab: "CTRL" },
                  ].map((p, i) => {
                    const idx = i % 4;
                    const y = 50 + idx * 35;
                    const xLine = p.side === "L" ? 50 : 210;
                    const xLab  = p.side === "L" ? 5  : 215;
                    const anchor = p.side === "L" ? "start" : "start";
                    return (
                      <g key={p.pin}>
                        <line
                          x1={p.side === "L" ? 80 : 180}
                          y1={y}
                          x2={xLine}
                          y2={y}
                          stroke={SILK}
                          strokeWidth="2"
                        />
                        <text x={xLab} y={y + 4} fontSize="11" fill={PAD} fontFamily="monospace" textAnchor={anchor}>
                          {p.pin}. {p.lab}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className="mt-2 text-xs" style={{ color: TEXT_DIM }}>
                  {t(
                    "Pin 1 marked by the dot/notch. The classic timer for monostable, astable, and bistable circuits.",
                    "ម្ជុលទី ១ មានចំណុច/ស្នាមដាច់។ IC ម៉ោងបុរាណសម្រាប់សៀគ្វី monostable, astable និង bistable។"
                  )}
                </p>
              </Card>
            </div>
          </section>

          {/* ════════════════ 8. RESISTOR COLOR CODE ════════════════ */}
          <section aria-labelledby="resistor">
            <SectionHeader
              num="08"
              icon={Activity}
              titleEn="Resistor Color Coding"
              titleKh="កូដពណ៌រេស៊ីស្តង់"
            />
            <Card>
              <div className="overflow-x-auto mb-6">
                <table
                  id="resistor"
                  className="w-full text-sm border-collapse"
                >
                  <thead>
                    <tr>
                      <Th>{t("Color", "ពណ៌")}</Th>
                      <Th>{t("1st Band", "បន្ទាត់ ១")}</Th>
                      <Th>{t("2nd Band", "បន្ទាត់ ២")}</Th>
                      <Th>{t("3rd Band", "បន្ទាត់ ៣")}</Th>
                      <Th>{t("Multiplier", "មេគុណ")}</Th>
                      <Th>{t("Tolerance", "ភាពលំអៀង")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {RES_BANDS.map((b) => {
                      const swatch = BAND_COLORS[b.color];
                      return (
                        <tr key={b.color}>
                          <Td>
                            <span
                              className="inline-block w-4 h-4 align-middle mr-2 rounded-sm"
                              style={{
                                background: swatch.bg,
                                border: `1px solid ${TRACE}55`,
                              }}
                              aria-hidden="true"
                            />
                            <span>
                              {swatch.en} / <span className="font-khmer">{swatch.kh}</span>
                            </span>
                          </Td>
                          <Td mono>{b.b1}</Td>
                          <Td mono>{b.b2}</Td>
                          <Td mono>{b.b3}</Td>
                          <Td mono>{b.mult}</Td>
                          <Td mono>{b.tol}</Td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                {t("Sample Calculations", "ឧទាហរណ៍គណនា")}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: TEXT }}>
                <li>
                  <strong style={{ color: PAD }}>Brown · Black · Red · Gold</strong> →{" "}
                  <span className="font-mono">1 0 × 100 = 1 000 Ω = 1 kΩ ± 5 %</span>
                </li>
                <li>
                  <strong style={{ color: PAD }}>Yellow · Violet · Orange · Gold</strong> →{" "}
                  <span className="font-mono">4 7 × 1 000 = 47 000 Ω = 47 kΩ ± 5 %</span>
                </li>
                <li>
                  <strong style={{ color: PAD }}>Red · Red · Brown · Gold</strong> →{" "}
                  <span className="font-mono">2 2 × 10 = 220 Ω ± 5 %</span>
                </li>
                <li>
                  <strong style={{ color: PAD }}>Blue · Grey · Black · Gold</strong> →{" "}
                  <span className="font-mono">6 8 × 1 = 68 Ω ± 5 %</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* ════════════════ 9. OP-AMPS ════════════════ */}
          <section aria-labelledby="opamp">
            <SectionHeader
              num="09"
              icon={Sigma}
              titleEn="Op-Amps"
              titleKh="អុប-អំ"
            />
            <div className="grid md:grid-cols-2 gap-6">
              {/* 741 */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  741 — {t("Single Op-Amp (8-Pin DIP)", "អុប-អំទោល 8-Pin DIP")}
                </h3>
                <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="741 single op-amp 8-pin DIP pinout">
                  <rect x="80" y="20" width="100" height="160" rx="4" fill={PANEL_SOFT} stroke={PAD} strokeWidth="1.5" />
                  <circle cx="95" cy="35" r="3" fill={PAD} />
                  <text x="130" y="105" textAnchor="middle" fontSize="14" fill={SILK} fontFamily="monospace">741</text>
                  {[
                    { side: "L", pin: 1, lab: "Offset N1" },
                    { side: "L", pin: 2, lab: "IN −" },
                    { side: "L", pin: 3, lab: "IN +" },
                    { side: "L", pin: 4, lab: "V−" },
                    { side: "R", pin: 8, lab: "NC" },
                    { side: "R", pin: 7, lab: "V+" },
                    { side: "R", pin: 6, lab: "OUT" },
                    { side: "R", pin: 5, lab: "Offset N2" },
                  ].map((p, i) => {
                    const idx = i % 4;
                    const y = 50 + idx * 35;
                    return (
                      <g key={p.pin}>
                        <line
                          x1={p.side === "L" ? 80 : 180}
                          y1={y}
                          x2={p.side === "L" ? 50 : 210}
                          y2={y}
                          stroke={SILK}
                          strokeWidth="2"
                        />
                        <text
                          x={p.side === "L" ? 5 : 215}
                          y={y + 4}
                          fontSize="11"
                          fill={PAD}
                          fontFamily="monospace"
                        >
                          {p.pin}. {p.lab}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </Card>

              {/* LM358 */}
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  LM358 — {t("Dual Op-Amp (8-Pin DIP)", "អុប-អំគូ 8-Pin DIP")}
                </h3>
                <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="LM358 dual op-amp 8-pin DIP pinout">
                  <rect x="80" y="20" width="100" height="160" rx="4" fill={PANEL_SOFT} stroke={PAD} strokeWidth="1.5" />
                  <circle cx="95" cy="35" r="3" fill={PAD} />
                  <text x="130" y="105" textAnchor="middle" fontSize="14" fill={SILK} fontFamily="monospace">LM 358</text>
                  {[
                    { side: "L", pin: 1, lab: "OUT  A" },
                    { side: "L", pin: 2, lab: "IN A −" },
                    { side: "L", pin: 3, lab: "IN A +" },
                    { side: "L", pin: 4, lab: "GND" },
                    { side: "R", pin: 8, lab: "Vcc" },
                    { side: "R", pin: 7, lab: "OUT  B" },
                    { side: "R", pin: 6, lab: "IN B −" },
                    { side: "R", pin: 5, lab: "IN B +" },
                  ].map((p, i) => {
                    const idx = i % 4;
                    const y = 50 + idx * 35;
                    return (
                      <g key={p.pin}>
                        <line
                          x1={p.side === "L" ? 80 : 180}
                          y1={y}
                          x2={p.side === "L" ? 50 : 210}
                          y2={y}
                          stroke={SILK}
                          strokeWidth="2"
                        />
                        <text
                          x={p.side === "L" ? 5 : 215}
                          y={y + 4}
                          fontSize="11"
                          fill={PAD}
                          fontFamily="monospace"
                        >
                          {p.pin}. {p.lab}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </Card>
            </div>
          </section>

          {/* ════════════════ 10. SMD CODES ════════════════ */}
          <section aria-labelledby="smd">
            <SectionHeader
              num="10"
              icon={Layers}
              titleEn="Surface-Mount Devices (SMD)"
              titleKh="ឧបករណ៍ភ្ជាប់លើផ្ទៃ (SMD)"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("3-Digit Code", "កូដ ៣ ខ្ទង់")}
                </h3>
                <p className="text-sm mb-3" style={{ color: TEXT_DIM }}>
                  {t(
                    "First two digits = significant figures, third digit = number of trailing zeros (× 10ⁿ).",
                    "លេខពីរដំបូង = តួសំខាន់ លេខទីបី = ចំនួនលេខសូន្យបន្ថែម (× 10ⁿ)។"
                  )}
                </p>
                <ul className="space-y-1 text-sm font-mono" style={{ color: PAD }}>
                  <li>473  →  47 × 10³  =  47 000 Ω  =  47 kΩ</li>
                  <li>104  →  10 × 10⁴  =  100 000 Ω  =  100 kΩ</li>
                  <li>220  →  22 × 10⁰  =  22 Ω</li>
                  <li>1R0  →  1.0 Ω  ("R" replaces decimal &lt; 10 Ω)</li>
                </ul>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                  {t("4-Digit Code (precision)", "កូដ ៤ ខ្ទង់ (មានភាពច្បាស់)")}
                </h3>
                <p className="text-sm mb-3" style={{ color: TEXT_DIM }}>
                  {t(
                    "First three digits = significant figures, fourth digit = multiplier exponent.",
                    "លេខបីដំបូង = តួសំខាន់ លេខទីបួន = មេគុណ។"
                  )}
                </p>
                <ul className="space-y-1 text-sm font-mono" style={{ color: PAD }}>
                  <li>4702  →  470 × 10²  =  47 000 Ω  =  47 kΩ</li>
                  <li>1003  →  100 × 10³  =  100 000 Ω  =  100 kΩ</li>
                  <li>2200  →  220 × 10⁰  =  220 Ω</li>
                  <li>0R47  →  0.47 Ω</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* ════════════════ 11. BREADBOARD & WIRE GAUGE ════════════════ */}
          <section aria-labelledby="bb">
            <SectionHeader
              num="11"
              icon={Radio}
              titleEn="Breadboard & Wire Gauge"
              titleKh="Breadboard និង AWG"
            />

            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                {t("Breadboard Anatomy", "រូបរាង Breadboard")}
              </h3>
              <p className="text-sm mb-4" style={{ color: TEXT_DIM }}>
                {t(
                  "A solderless prototyping board with two regions: power rails along the long edges (the red + and blue − stripes — every hole on a stripe is internally connected) and tie-points in the middle (each row of 5 holes is connected, but the gap in the centre splits the row in two so DIP ICs can straddle it).",
                  "ក្តារសម្រាប់ដាក់សៀគ្វីដោយមិនបាច់ផ្សារ មានពីរផ្នែក៖ សរសៃថាមពល (Power Rails) នៅគែម (ឆ្នូត + ក្រហម និង − ខៀវ — រន្ធគ្រប់រន្ធក្នុងឆ្នូតភ្ជាប់គ្នា) និងចំណុចចង (Tie-Points) នៅកណ្តាល (ជួរមួយៗ ៥ រន្ធភ្ជាប់គ្នា ប៉ុន្តែគម្លាតកណ្តាលបំបែកជួរ ដើម្បីឲ្យ DIP IC ដាក់ឆ្លងបាន)។"
                )}
              </p>
              {/* Mini SVG of breadboard layout */}
              <svg viewBox="0 0 600 180" className="w-full h-auto" role="img" aria-label="Breadboard layout: top + bottom power rails (red plus, blue minus) and central tie-point grid split by a centre channel">
                <rect x="0" y="0" width="600" height="180" rx="6" fill={PANEL_SOFT} stroke={PAD} strokeWidth="1" />
                {/* Top + rail */}
                <line x1="20" y1="20" x2="580" y2="20" stroke={RED} strokeWidth="2" />
                {/* Top - rail */}
                <line x1="20" y1="35" x2="580" y2="35" stroke={BLUE} strokeWidth="2" />
                {/* Bottom + rail */}
                <line x1="20" y1="160" x2="580" y2="160" stroke={RED} strokeWidth="2" />
                {/* Bottom - rail */}
                <line x1="20" y1="145" x2="580" y2="145" stroke={BLUE} strokeWidth="2" />
                {/* Tie point grid */}
                {Array.from({ length: 30 }).map((_, c) =>
                  Array.from({ length: 10 }).map((__, r) => (
                    <circle
                      key={`${c}-${r}`}
                      cx={25 + c * 19}
                      cy={50 + r * 8 + (r >= 5 ? 12 : 0)}
                      r={1.5}
                      fill={SILK}
                      opacity="0.7"
                    />
                  ))
                )}
                {/* Centre channel */}
                <rect x="20" y="86" width="560" height="4" fill={BG} />
                <text x="10" y="24" fontSize="10" fill={RED}  fontFamily="monospace">+</text>
                <text x="10" y="39" fontSize="10" fill={BLUE} fontFamily="monospace">−</text>
              </svg>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-3" style={{ color: SILK }}>
                {t("AWG Wire Gauge Table", "តារាង AWG ខ្សែ")}
              </h3>
              <div className="overflow-x-auto">
                <table id="bb" className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <Th>AWG</Th>
                      <Th>{t("Diameter (mm)", "អង្កត់ផ្ចិត (មម)")}</Th>
                      <Th>{t("Area (mm²)", "ផ្ទៃ (មម²)")}</Th>
                      <Th>{t("Resistance (Ω/km)", "រេស៊ីស្តង់ (Ω/គម)")}</Th>
                      <Th>{t("Current (A)", "ចរន្ត (A)")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {AWG.map((w) => (
                      <tr key={w.awg}>
                        <Td mono>{w.awg}</Td>
                        <Td mono>{w.dia}</Td>
                        <Td mono>{w.area}</Td>
                        <Td mono>{w.res}</Td>
                        <Td mono>{w.amps}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs" style={{ color: TEXT_DIM }}>
                {t(
                  "Lower AWG number = thicker wire = more current capacity. Current ratings here are for chassis wiring (free air); enclosed bundles must be derated.",
                  "លេខ AWG តូច = ខ្សែក្រាស់ = ផ្ទុកចរន្តបានច្រើន។ តម្លៃនេះគឺសម្រាប់ខ្សែបើកចំហ ខ្សែដែលរុំជាបាច់ត្រូវបន្ថយ។"
                )}
              </p>
            </Card>
          </section>

          {/* ════════════════ 12. CORE CONCEPTS GLOSSARY ════════════════ */}
          <section aria-labelledby="glossary" className="mt-16">
            <SectionHeader
              num="12"
              icon={BookOpen}
              titleEn="Core Concepts Glossary"
              titleKh="សទ្ទានុក្រមគោលគំនិតសំខាន់ៗ"
            />
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Resistivity */}
              <Card>
                <h3 className="text-xl font-bold mb-1" style={{ color: SILK }}>
                  Resistivity (<Eq>ρ</Eq>)
                </h3>
                <p className="font-khmer text-sm mb-3" style={{ color: TEXT_DIM }}>
                  រេស៊ីស្ទីវីតេ
                </p>
                <p className="text-sm mb-2" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Simple:", "សាមញ្ញ៖")}</strong>{" "}
                  {t(
                    "How strongly a specific material opposes the flow of electricity. Rubber has high resistivity; copper has low resistivity.",
                    "រឹងម៉ាំប៉ុណ្ណាដែលសម្ភារៈជាក់លាក់រារាំងលំហូរអគ្គិសនី។ កៅស៊ូមានរេស៊ីស្ទីវីតេខ្ពស់ ទង់ដែងមានទាប។"
                  )}
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Technical:", "បច្ចេកទេស៖")}</strong>{" "}
                  {t(
                    "A fundamental material property that quantifies how strongly a given material resists or conducts electric current.",
                    "លក្ខណៈសម្ភារៈមូលដ្ឋានដែលវាស់កម្រិតរារាំង ឬចម្លងចរន្តអគ្គិសនី។"
                  )}
                </p>
                <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                  <Eq>R</Eq> = <Eq>ρ</Eq> · <Frac top="L" bot="A" />
                </div>
              </Card>

              {/* Impedance */}
              <Card>
                <h3 className="text-xl font-bold mb-1" style={{ color: SILK }}>
                  Impedance (<Eq>Z</Eq>)
                </h3>
                <p className="font-khmer text-sm mb-3" style={{ color: TEXT_DIM }}>
                  អាំពេដង់
                </p>
                <p className="text-sm mb-2" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Simple:", "សាមញ្ញ៖")}</strong>{" "}
                  {t(
                    "The total 'pushback' a circuit gives to alternating current (AC), combining regular resistance with the effects of magnetic and electric fields.",
                    "ការ 'ច្រានត្រឡប់' សរុបដែលសៀគ្វីផ្តល់ឱ្យចរន្តឆ្លាស់ (AC) — បូករួមរេស៊ីស្តង់ធម្មតា និងឥទ្ធិពលនៃវាលអគ្គិសនី និងម៉ាញេទិច។"
                  )}
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Technical:", "បច្ចេកទេស៖")}</strong>{" "}
                  {t(
                    "The complex ratio of voltage to current in an AC circuit. It extends the concept of resistance to AC circuits, possessing both magnitude and phase.",
                    "សមាមាត្រកំផ្លិចនៃតង់ស្យុងទៅចរន្តក្នុងសៀគ្វី AC។ វាពង្រីកគំនិតរេស៊ីស្តង់ទៅសៀគ្វី AC ដោយមានទំហំ និងហ្វាស។"
                  )}
                </p>
                <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                  <Eq>Z</Eq> = <Eq>R</Eq> + <Eq>jX</Eq>
                </div>
              </Card>

              {/* Capacitance */}
              <Card>
                <h3 className="text-xl font-bold mb-1" style={{ color: SILK }}>
                  Capacitance (<Eq>C</Eq>)
                </h3>
                <p className="font-khmer text-sm mb-3" style={{ color: TEXT_DIM }}>
                  កាប៉ាស៊ីតង់
                </p>
                <p className="text-sm mb-2" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Simple:", "សាមញ្ញ៖")}</strong>{" "}
                  {t(
                    "A system's ability to store an electrical charge — like how a tank stores water.",
                    "សមត្ថភាពរបស់ប្រព័ន្ធក្នុងការផ្ទុកបន្ទុកអគ្គិសនី — ដូចជាធុងផ្ទុកទឹក។"
                  )}
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Technical:", "បច្ចេកទេស៖")}</strong>{" "}
                  {t(
                    "The ratio of the change in electric charge in a system to the corresponding change in its electric potential (voltage).",
                    "សមាមាត្ររវាងការផ្លាស់ប្តូរបន្ទុកអគ្គិសនី និងការផ្លាស់ប្តូរសក្តានុពលអគ្គិសនី (តង់ស្យុង)។"
                  )}
                </p>
                <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                  <Eq>C</Eq> = <Frac top="Q" bot="V" />
                </div>
              </Card>

              {/* Capacitor */}
              <Card>
                <h3 className="text-xl font-bold mb-1" style={{ color: SILK }}>
                  Capacitor
                </h3>
                <p className="font-khmer text-sm mb-3" style={{ color: TEXT_DIM }}>
                  កុងដង់ស្យាទ័រ
                </p>
                <p className="text-sm mb-2" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Simple:", "សាមញ្ញ៖")}</strong>{" "}
                  {t(
                    "A physical component that acts like a temporary battery — quickly storing and releasing electrical energy.",
                    "ឧបករណ៍ដែលដើរតួដូចថ្មបណ្ដោះអាសន្ន — ផ្ទុក និងបញ្ចេញថាមពលអគ្គិសនីបានយ៉ាងលឿន។"
                  )}
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Technical:", "បច្ចេកទេស៖")}</strong>{" "}
                  {t(
                    "A passive two-terminal electronic component that stores potential energy in an electric field.",
                    "ឧបករណ៍អេឡិចត្រូនិកដាច់ខាតមាន ២ ខ្សែ ផ្ទុកថាមពលសក្តានុពលក្នុងវាលអគ្គិសនី។"
                  )}
                </p>
                <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                  <Eq>E</Eq> = <Frac top="1" bot="2" /> <Eq>C</Eq> · <Eq>V</Eq>²
                  <span className="ml-3 text-xs font-sans not-italic" style={{ color: TEXT_MUTED }}>
                    {t("(energy stored)", "(ថាមពលផ្ទុក)")}
                  </span>
                </div>
              </Card>

              {/* Inductor */}
              <Card className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-1" style={{ color: SILK }}>
                  Inductor & Inductance (<Eq>L</Eq>)
                </h3>
                <p className="font-khmer text-sm mb-3" style={{ color: TEXT_DIM }}>
                  អាំងឌុចទ័រ និងអាំងឌុចតង់
                </p>
                <p className="text-sm mb-2" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Simple:", "សាមញ្ញ៖")}</strong>{" "}
                  {t(
                    "A coil of wire that stores energy in a magnetic field when electricity flows through it. Acts like a shock-absorber, fighting any sudden change in the flow of electricity.",
                    "ខ្សែដែលរុំជាស្ប៊ីរ៉ាល់ ផ្ទុកថាមពលក្នុងវាលម៉ាញេទិចនៅពេលអគ្គិសនីហូរកាត់។ ដើរតួដូចឧបករណ៍ស្រូបការប៉ះទង្គិច រារាំងការផ្លាស់ប្តូរចរន្តភ្លាមៗ។"
                  )}
                </p>
                <p className="text-sm mb-3" style={{ color: TEXT }}>
                  <strong style={{ color: PAD }}>{t("Technical:", "បច្ចេកទេស៖")}</strong>{" "}
                  {t(
                    "A passive two-terminal electrical component that stores energy in a magnetic field. Inductance is the tendency of an electrical conductor to oppose a change in the electric current flowing through it.",
                    "ឧបករណ៍អគ្គិសនីដាច់ខាតមាន ២ ខ្សែ ផ្ទុកថាមពលក្នុងវាលម៉ាញេទិច។ អាំងឌុចតង់ជានិន្នាការរបស់ឧបករណ៍ដឹកជញ្ជូនអគ្គិសនី ដើម្បីប្រឆាំងនឹងការផ្លាស់ប្តូរចរន្ត។"
                  )}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                    <Eq>V</Eq> = <Eq>L</Eq> · <Frac top="di" bot="dt" />
                    <div className="text-xs font-sans not-italic mt-1" style={{ color: TEXT_MUTED }}>
                      {t("induced voltage", "តង់ស្យុងបណ្តាល")}
                    </div>
                  </div>
                  <div className="text-lg p-3 rounded-md" style={{ background: PANEL_SOFT }}>
                    <Eq>E</Eq> = <Frac top="1" bot="2" /> <Eq>L</Eq> · <Eq>I</Eq>²
                    <div className="text-xs font-sans not-italic mt-1" style={{ color: TEXT_MUTED }}>
                      {t("energy stored", "ថាមពលផ្ទុក")}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ── Footer ──────────────────────────────────────────── */}
          <footer className="mt-16 pt-8 border-t text-center" style={{ borderColor: `${TRACE}55` }}>
            <p className="text-sm" style={{ color: TEXT_MUTED }}>
              {t(
                "Build, measure, fail safely, learn.",
                "សាងសង់ វាស់ បរាជ័យដោយសុវត្ថិភាព និងរៀន។"
              )}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
