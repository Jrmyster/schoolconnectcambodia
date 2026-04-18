import { useMemo, useState } from "react";
import {
  Beaker,
  FlaskConical,
  Atom,
  Wind,
  Droplet,
  Info,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type T = (en: string, kh: string) => string;

/* ── Shared formatting ────────────────────────────────────────────── */
const AVOGADRO = 6.022e23;

function formatValue(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-3) {
    const [mantissa, exp] = n.toExponential(4).split("e");
    const m = parseFloat(mantissa).toString();
    return `${m}e${parseInt(exp, 10)}`;
  }
  const s = n.toPrecision(8);
  return parseFloat(s).toString();
}

/* ── Generic unit definitions for linear converters ───────────────── */
type UnitDef = {
  key: string;
  symbol: string;
  nameEn: string;
  nameKh: string;
  /** Multiplier this unit → category base unit. */
  toBase: number;
  /** Optional bilingual hover hint */
  hintEn?: string;
  hintKh?: string;
};

type Category = {
  key: "moles" | "volume" | "molarity" | "pressure";
  labelEn: string;
  labelKh: string;
  icon: React.ComponentType<{ className?: string }>;
};

const CATEGORIES: Category[] = [
  { key: "moles",    labelEn: "Moles",    labelKh: "ម៉ូល",        icon: Atom },
  { key: "volume",   labelEn: "Volume",   labelKh: "មាឌ",         icon: Beaker },
  { key: "molarity", labelEn: "Molarity", labelKh: "ម៉ូឡារីតេ",   icon: Droplet },
  { key: "pressure", labelEn: "Pressure", labelKh: "សម្ពាធ",      icon: Wind },
];

const MOLE_UNITS: UnitDef[] = [
  {
    key: "mol",
    symbol: "mol",
    nameEn: "Moles",
    nameKh: "ម៉ូល",
    toBase: 1,
    hintEn: "A mole is a chemist's way to count atoms by weighing them — one mole always contains Avogadro's number of particles.",
    hintKh: "ម៉ូល គឺជាវិធីរបស់គីមីវិទូក្នុងការរាប់អាតូមដោយការថ្លឹង — ម៉ូលមួយតែងតែមានចំនួនអាវ៉ូហ្គាដ្រូនៃភាគល្អិត។",
  },
  {
    key: "particles",
    symbol: "N",
    nameEn: "Number of Particles",
    nameKh: "ចំនួនភាគល្អិត",
    toBase: 1 / AVOGADRO,
    hintEn: "Atoms, ions, or molecules — counted individually. 1 mol = 6.022 × 10²³ particles.",
    hintKh: "អាតូម អ៊ីយ៉ុង ឬម៉ូលេគុល — រាប់ម្នាក់ៗ។ 1 ម៉ូល = 6.022 × 10²³ ភាគល្អិត។",
  },
];

const VOLUME_UNITS: UnitDef[] = [
  { key: "L",   symbol: "L",   nameEn: "Liter",            nameKh: "លីត្រ",                   toBase: 1 },
  { key: "mL",  symbol: "mL",  nameEn: "Milliliter",       nameKh: "មិល្លីលីត្រ",            toBase: 0.001 },
  { key: "cm3", symbol: "cm³", nameEn: "Cubic Centimeter", nameKh: "សង់ទីម៉ែត្រគូប",         toBase: 0.001 },
];

const PRESSURE_UNITS: UnitDef[] = [
  { key: "atm",  symbol: "atm",  nameEn: "Atmosphere", nameKh: "បរិយាកាស",                toBase: 101325 },
  { key: "Pa",   symbol: "Pa",   nameEn: "Pascal",     nameKh: "ប៉ាស្កាល់",                toBase: 1 },
  { key: "mmHg", symbol: "mmHg", nameEn: "Torr/mmHg",  nameKh: "តូរ / មិល្លីម៉ែត្រប៉ាដ", toBase: 101325 / 760 },
];

/* ── A reusable linear converter (for Moles, Volume, Pressure) ────── */
function LinearConverter({
  t,
  kh,
  units,
  defaultKey,
  defaultRaw,
  accent,
  noteEn,
  noteKh,
}: {
  t: T;
  kh: boolean;
  units: UnitDef[];
  defaultKey: string;
  defaultRaw: string;
  accent: { chip: string; ring: string; text: string };
  noteEn?: string;
  noteKh?: string;
}) {
  const [src, setSrc] = useState<{ unitKey: string; raw: string }>({
    unitKey: defaultKey,
    raw: defaultRaw,
  });

  const srcUnit = units.find((u) => u.key === src.unitKey) ?? units[0];

  const baseValue = useMemo(() => {
    const n = parseFloat(src.raw);
    if (!isFinite(n) || isNaN(n)) return null;
    return n * srcUnit.toBase;
  }, [src.raw, srcUnit.toBase]);

  const handleChange = (unitKey: string, raw: string) => {
    setSrc({ unitKey, raw });
  };

  return (
    <div className="space-y-3">
      {units.map((u) => {
        const isSource = u.key === src.unitKey;
        const display = isSource
          ? src.raw
          : baseValue === null
          ? ""
          : formatValue(baseValue / u.toBase);

        return (
          <label
            key={u.key}
            htmlFor={`chem-${u.key}`}
            className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-2xl border-2 px-3 sm:px-4 py-3 transition-all cursor-text ${
              isSource
                ? `${accent.chip} ring-2 ${accent.ring} shadow-sm`
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2 sm:w-48 sm:flex-shrink-0">
              <span
                className={`inline-flex items-center justify-center min-w-[3rem] h-9 px-2 rounded-lg bg-white border-2 border-slate-300 text-slate-900 font-mono font-bold text-sm shadow-sm`}
              >
                {u.symbol}
              </span>
              <div className="min-w-0">
                <div
                  className={`text-sm font-semibold leading-tight ${
                    isSource ? "" : "text-slate-800"
                  } ${kh ? "font-khmer" : ""} ${
                    u.hintEn ? "underline decoration-dotted decoration-slate-400 underline-offset-4" : ""
                  }`}
                  title={
                    u.hintEn
                      ? kh && u.hintKh
                        ? `${u.hintKh}\n\n— ${u.hintEn}`
                        : `${u.hintEn}\n\n— ${u.hintKh ?? ""}`
                      : undefined
                  }
                >
                  {t(u.nameEn, u.nameKh)}
                </div>
                <div
                  className={`text-[10px] uppercase tracking-wider opacity-70 ${
                    kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                  }`}
                >
                  {kh ? u.nameEn : u.nameKh}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <input
                id={`chem-${u.key}`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={display}
                onChange={(e) => handleChange(u.key, e.target.value)}
                onFocus={(e) => {
                  if (!isSource) handleChange(u.key, display);
                  e.currentTarget.select();
                }}
                placeholder="0"
                aria-label={t(`Value in ${u.nameEn}`, `តម្លៃជា${u.nameKh}`)}
                className={`w-full bg-white rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 text-right font-mono text-base sm:text-lg font-semibold text-slate-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-1 ${
                  isSource
                    ? `border-current ${accent.text}`
                    : "border-slate-200 focus:border-slate-400"
                }`}
              />
            </div>
          </label>
        );
      })}

      {baseValue === null && src.raw.trim() !== "" && (
        <p className={`text-xs text-rose-600 ${kh ? "font-khmer leading-relaxed" : ""}`}>
          {t("Please enter a valid number.", "សូមបញ្ចូលលេខត្រឹមត្រូវ។")}
        </p>
      )}

      {noteEn && (
        <div className="mt-2 flex items-start gap-2 rounded-2xl border border-teal-200 bg-teal-50/70 px-3 py-2.5">
          <Info className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className={`text-[11px] sm:text-xs text-teal-900 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
            {t(noteEn, noteKh ?? noteEn)}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Molarity Calculator ──────────────────────────────────────────── */
function MolarityCalculator({ t, kh }: { t: T; kh: boolean }) {
  const [moles, setMoles] = useState("0.5");
  const [liters, setLiters] = useState("1");

  const result = useMemo<number | null>(() => {
    const m = parseFloat(moles);
    const l = parseFloat(liters);
    if (!isFinite(m) || !isFinite(l) || isNaN(m) || isNaN(l)) return null;
    if (l === 0) return null;
    return m / l;
  }, [moles, liters]);

  const isInvalid =
    (parseFloat(liters) === 0 && liters.trim() !== "") ||
    (result === null && (moles.trim() !== "" || liters.trim() !== ""));

  return (
    <div className="space-y-3">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="rounded-2xl border-2 border-teal-300 bg-teal-50/60 px-3 sm:px-4 py-3 ring-2 ring-teal-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center min-w-[3rem] h-9 px-2 rounded-lg bg-white border-2 border-slate-300 text-slate-900 font-mono font-bold text-sm shadow-sm">
              n
            </span>
            <div className="min-w-0">
              <div className={`text-sm font-semibold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("Moles of Solute", "ម៉ូលនៃសារធាតុរលាយ")}
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider opacity-70 ${
                  kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                }`}
              >
                {kh ? "Moles of Solute" : "ម៉ូលនៃសារធាតុរលាយ"} (mol)
              </div>
            </div>
          </div>
          <input
            type="text"
            inputMode="decimal"
            value={moles}
            onChange={(e) => setMoles(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            placeholder="0"
            aria-label={t("Moles of solute (mol)", "ម៉ូលនៃសារធាតុរលាយ (mol)")}
            className="w-full bg-white rounded-xl border-2 border-teal-400 px-3 py-2.5 text-right font-mono text-base sm:text-lg font-semibold text-teal-700 outline-none focus:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-1"
          />
        </label>

        <label className="rounded-2xl border-2 border-sky-300 bg-sky-50/60 px-3 sm:px-4 py-3 ring-2 ring-sky-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center min-w-[3rem] h-9 px-2 rounded-lg bg-white border-2 border-slate-300 text-slate-900 font-mono font-bold text-sm shadow-sm">
              V
            </span>
            <div className="min-w-0">
              <div className={`text-sm font-semibold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("Volume of Solution", "មាឌនៃសូលុយស្យុង")}
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider opacity-70 ${
                  kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                }`}
              >
                {kh ? "Volume of Solution" : "មាឌនៃសូលុយស្យុង"} (L)
              </div>
            </div>
          </div>
          <input
            type="text"
            inputMode="decimal"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            placeholder="0"
            aria-label={t("Volume of solution (liters)", "មាឌនៃសូលុយស្យុង (លីត្រ)")}
            className="w-full bg-white rounded-xl border-2 border-sky-400 px-3 py-2.5 text-right font-mono text-base sm:text-lg font-semibold text-sky-700 outline-none focus:border-sky-600 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1"
          />
        </label>
      </div>

      {/* Equation */}
      <div
        className="rounded-2xl border-2 border-slate-300 bg-slate-50 px-4 py-4 text-center"
        aria-live="polite"
      >
        <div
          className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-600 mb-1 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {t("Molarity (M)", "ម៉ូឡារីតេ (M)")}
        </div>
        <div
          className={`font-mono text-2xl sm:text-3xl font-bold leading-none ${
            isInvalid ? "text-rose-500" : "text-slate-900"
          }`}
        >
          {parseFloat(liters) === 0 && liters.trim() !== ""
            ? t("Cannot divide by 0", "មិនអាចចែកនឹង 0")
            : result === null
            ? "—"
            : `${formatValue(result)} mol/L`}
        </div>
        <div className={`text-[10px] sm:text-xs text-slate-500 mt-2 ${kh ? "font-khmer leading-relaxed" : ""}`}>
          {t("M = moles ÷ liters", "M = ម៉ូល ÷ លីត្រ")}
        </div>
      </div>

      {/* Concept tooltip note */}
      <div className="flex items-start gap-2 rounded-2xl border border-teal-200 bg-teal-50/70 px-3 py-2.5">
        <Info className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className={`text-[11px] sm:text-xs text-teal-900 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
          <span
            className="font-semibold underline decoration-dotted decoration-teal-500 underline-offset-4 cursor-help"
            title={
              kh
                ? "ម៉ូឡារីតេ — កំហាប់នៃសូលុយស្យុង វាស់ជាម៉ូលនៃសារធាតុរលាយក្នុងមួយលីត្រនៃសូលុយស្យុង (mol/L ឬ M)។\n\n— Molarity: the concentration of a solution, measured in moles of solute per liter of solution (mol/L or M)."
                : "Molarity — the concentration of a solution, measured in moles of solute per liter of solution (mol/L or M).\n\n— ម៉ូឡារីតេ៖ កំហាប់នៃសូលុយស្យុង វាស់ជាម៉ូលនៃសារធាតុរលាយក្នុងមួយលីត្រនៃសូលុយស្យុង (mol/L ឬ M)។"
            }
          >
            {t("Molarity", "ម៉ូឡារីតេ")}
          </span>{" "}
          ({kh ? "Molarity" : "ម៉ូឡារីតេ"}):{" "}
          {t(
            "the concentration of a solution measured in moles per liter (mol/L). A 1 M sugar solution contains 1 mole of sugar in every liter of water.",
            "កំហាប់នៃសូលុយស្យុងវាស់ជាម៉ូលក្នុងមួយលីត្រ (mol/L)។ សូលុយស្យុងស្ករ 1 M មានស្ករ 1 ម៉ូលក្នុងទឹកមួយលីត្រ។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Main converter ────────────────────────────────────────────────── */
export function ChemistryUnitConverter() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";
  const [activeKey, setActiveKey] = useState<Category["key"]>("moles");

  const tealAccent = {
    chip: "bg-teal-100 text-teal-900 border-teal-300",
    ring: "ring-teal-400",
    text: "text-teal-700",
  };
  const skyAccent = {
    chip: "bg-sky-100 text-sky-900 border-sky-300",
    ring: "ring-sky-400",
    text: "text-sky-700",
  };
  const emeraldAccent = {
    chip: "bg-emerald-100 text-emerald-900 border-emerald-300",
    ring: "ring-emerald-400",
    text: "text-emerald-700",
  };

  return (
    <section
      aria-label={t("Chemistry Unit Converter", "ឧបករណ៍បំប្លែងឯកតាគីមី")}
      className="rounded-3xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header — clean lab equipment aesthetic */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b-2 border-slate-200 bg-gradient-to-br from-white via-teal-50/40 to-sky-50/40 relative">
        {/* subtle grid lines for "lab notebook" feel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-teal-700 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Chemistry Toolkit", "ឧបករណ៍គីមីវិទ្យា")}
            </div>
            <h2
              className={`text-base sm:text-lg font-bold text-slate-900 leading-tight ${
                kh ? "font-khmer leading-relaxed" : "font-display"
              }`}
            >
              {t("Chemistry Unit Converter", "ឧបករណ៍បំប្លែងឯកតាគីមី")}
            </h2>
            <p
              className={`text-xs sm:text-sm text-slate-600 leading-snug mt-0.5 ${
                kh ? "font-khmer leading-relaxed" : ""
              }`}
            >
              {t(
                "Moles, volume, molarity & gas pressure — hover dotted terms for help.",
                "ម៉ូល មាឌ ម៉ូឡារីតេ និងសម្ពាធឧស្ម័ន — ផ្លាស់ទីលើពាក្យដែលគូសចំណុចសម្រាប់ជំនួយ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={t("Conversion category", "ប្រភេទនៃការបំប្លែង")}
        className="flex gap-1 sm:gap-2 px-3 sm:px-5 pt-3 sm:pt-4 border-b border-slate-200 bg-slate-50/60 overflow-x-auto"
      >
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const isActive = c.key === activeKey;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(c.key)}
              className={`flex-shrink-0 sm:flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-gradient-to-br from-teal-600 to-sky-600 text-white border-transparent shadow-sm"
                  : "bg-white/60 text-slate-700 border-transparent hover:bg-white"
              } ${kh ? "font-khmer" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{t(c.labelEn, c.labelKh)}</span>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        {activeKey === "moles" && (
          <LinearConverter
            t={t}
            kh={kh}
            units={MOLE_UNITS}
            defaultKey="mol"
            defaultRaw="1"
            accent={emeraldAccent}
            noteEn="Moles help us count atoms by weighing them! 1 mole of any substance always contains 6.022 × 10²³ particles — that's Avogadro's Number."
            noteKh="ម៉ូលជួយយើងរាប់អាតូមដោយការថ្លឹង! ម៉ូល 1 នៃសារធាតុណាមួយតែងតែមាន 6.022 × 10²³ ភាគល្អិត — នោះគឺជាចំនួនអាវ៉ូហ្គាដ្រូ។"
          />
        )}
        {activeKey === "volume" && (
          <LinearConverter
            t={t}
            kh={kh}
            units={VOLUME_UNITS}
            defaultKey="L"
            defaultRaw="1"
            accent={skyAccent}
            noteEn="Tip: 1 mL = 1 cm³ exactly — they measure the same volume."
            noteKh="គន្លឹះ៖ 1 mL = 1 cm³ បែបពិតប្រាកដ — វាវាស់មាឌដូចគ្នា។"
          />
        )}
        {activeKey === "molarity" && <MolarityCalculator t={t} kh={kh} />}
        {activeKey === "pressure" && (
          <LinearConverter
            t={t}
            kh={kh}
            units={PRESSURE_UNITS}
            defaultKey="atm"
            defaultRaw="1"
            accent={tealAccent}
            noteEn="Standard atmosphere: 1 atm = 101,325 Pa = 760 mmHg. This is roughly the air pressure at sea level."
            noteKh="បរិយាកាសស្តង់ដារ៖ 1 atm = 101,325 Pa = 760 mmHg។ នេះប្រហែលជាសម្ពាធខ្យល់នៅកម្រិតទឹកសមុទ្រ។"
          />
        )}
      </div>
    </section>
  );
}
