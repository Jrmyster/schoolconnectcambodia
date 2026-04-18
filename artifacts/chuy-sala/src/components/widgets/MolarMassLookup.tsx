import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Atom } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ── Element groups & periodic-table color palette ───────────────── */
type Group =
  | "nonmetal"
  | "halogen"
  | "noble"
  | "alkali"
  | "alkaline"
  | "metalloid"
  | "post"
  | "transition";

const GROUP_META: Record<
  Group,
  { labelEn: string; labelKh: string; chip: string; tile: string; ring: string }
> = {
  nonmetal: {
    labelEn: "Nonmetal",
    labelKh: "មិនមែនលោហៈ",
    chip: "bg-emerald-100 text-emerald-900 border-emerald-300",
    tile: "from-emerald-50 to-emerald-100 border-emerald-300 text-emerald-900",
    ring: "ring-emerald-400",
  },
  halogen: {
    labelEn: "Halogen",
    labelKh: "ហាឡូហ្សែន",
    chip: "bg-yellow-100 text-yellow-900 border-yellow-300",
    tile: "from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-900",
    ring: "ring-yellow-400",
  },
  noble: {
    labelEn: "Noble Gas",
    labelKh: "ឧស្ម័នអសកម្ម",
    chip: "bg-violet-100 text-violet-900 border-violet-300",
    tile: "from-violet-50 to-violet-100 border-violet-300 text-violet-900",
    ring: "ring-violet-400",
  },
  alkali: {
    labelEn: "Alkali Metal",
    labelKh: "លោហៈអាល់កាលីន",
    chip: "bg-rose-100 text-rose-900 border-rose-300",
    tile: "from-rose-50 to-rose-100 border-rose-300 text-rose-900",
    ring: "ring-rose-400",
  },
  alkaline: {
    labelEn: "Alkaline Earth",
    labelKh: "លោហៈអាល់កាឡាំងផែនដី",
    chip: "bg-orange-100 text-orange-900 border-orange-300",
    tile: "from-orange-50 to-orange-100 border-orange-300 text-orange-900",
    ring: "ring-orange-400",
  },
  metalloid: {
    labelEn: "Metalloid",
    labelKh: "ឧប-លោហៈ",
    chip: "bg-teal-100 text-teal-900 border-teal-300",
    tile: "from-teal-50 to-teal-100 border-teal-300 text-teal-900",
    ring: "ring-teal-400",
  },
  post: {
    labelEn: "Post-transition Metal",
    labelKh: "លោហៈក្រោយអន្តរាគមន៍",
    chip: "bg-slate-200 text-slate-900 border-slate-300",
    tile: "from-slate-50 to-slate-200 border-slate-300 text-slate-900",
    ring: "ring-slate-400",
  },
  transition: {
    labelEn: "Transition Metal",
    labelKh: "លោហៈអន្តរាគមន៍",
    chip: "bg-amber-100 text-amber-900 border-amber-300",
    tile: "from-amber-50 to-amber-100 border-amber-300 text-amber-900",
    ring: "ring-amber-400",
  },
};

/* ── Element data — top 20 high-school chemistry elements ────────── */
type Element = {
  z: number;
  symbol: string;
  nameEn: string;
  nameKh: string;
  mass: number;
  group: Group;
  useEn: string;
  useKh: string;
};

const ELEMENTS: Element[] = [
  { z: 1,  symbol: "H",  nameEn: "Hydrogen",  nameKh: "អ៊ីដ្រូសែន",       mass: 1.008,   group: "nonmetal",   useEn: "Lightest element; combines with oxygen to form water.",         useKh: "ធាតុស្រាលជាងគេ; ផ្សំជាមួយអុកស៊ីសែនបង្កើតជាទឹក។" },
  { z: 2,  symbol: "He", nameEn: "Helium",    nameKh: "អេលីយ៉ូម",         mass: 4.0026,  group: "noble",      useEn: "Fills floating balloons because it is lighter than air.",       useKh: "បំពេញបាឡុងអណ្តែតព្រោះស្រាលជាងខ្យល់។" },
  { z: 3,  symbol: "Li", nameEn: "Lithium",   nameKh: "លីចូម",             mass: 6.94,    group: "alkali",     useEn: "Used in rechargeable batteries for phones and laptops.",        useKh: "ប្រើនៅក្នុងថ្មសាកសម្រាប់ទូរស័ព្ទ និងកុំព្យូទ័រយួរដៃ។" },
  { z: 6,  symbol: "C",  nameEn: "Carbon",    nameKh: "កាបូន",             mass: 12.011,  group: "nonmetal",   useEn: "Found in all living things — the backbone of organic chemistry.", useKh: "មាននៅក្នុងសារពាង្គកាយមានជីវិតទាំងអស់ — ឆ្អឹងខ្នងនៃគីមីសរីរាង្គ។" },
  { z: 7,  symbol: "N",  nameEn: "Nitrogen",  nameKh: "អាសូត",             mass: 14.007,  group: "nonmetal",   useEn: "Makes up 78% of the air we breathe.",                            useKh: "មាន 78% នៃខ្យល់ដែលយើងដកដង្ហើម។" },
  { z: 8,  symbol: "O",  nameEn: "Oxygen",    nameKh: "អុកស៊ីសែន",         mass: 15.999,  group: "nonmetal",   useEn: "Essential for breathing and burning fuel.",                       useKh: "ចាំបាច់សម្រាប់ដកដង្ហើម និងការដុតឥន្ធនៈ។" },
  { z: 9,  symbol: "F",  nameEn: "Fluorine",  nameKh: "ហ្វ្លុយអូរ",        mass: 18.998,  group: "halogen",    useEn: "Added to toothpaste and water to strengthen teeth.",              useKh: "បន្ថែមទៅក្នុងថ្នាំដុសធ្មេញ និងទឹកដើម្បីពង្រឹងធ្មេញ។" },
  { z: 10, symbol: "Ne", nameEn: "Neon",      nameKh: "ណេអុង",             mass: 20.180,  group: "noble",      useEn: "Glows bright orange-red in advertising signs.",                   useKh: "ភ្លឺពណ៌ទឹកក្រូចក្រហមនៅក្នុងផ្លាកសញ្ញាផ្សាយពាណិជ្ជកម្ម។" },
  { z: 11, symbol: "Na", nameEn: "Sodium",    nameKh: "សូដ្យូម",           mass: 22.990,  group: "alkali",     useEn: "Combines with chlorine to make table salt (NaCl).",               useKh: "ផ្សំជាមួយក្លរបង្កើតជាអំបិលបាយ (NaCl)។" },
  { z: 12, symbol: "Mg", nameEn: "Magnesium", nameKh: "ម៉ាញ៉េស្យូម",       mass: 24.305,  group: "alkaline",   useEn: "Found in green plants — the center of chlorophyll.",              useKh: "មាននៅក្នុងរុក្ខជាតិបៃតង — ស្នូលនៃក្លរ៉ូហ្វីល។" },
  { z: 13, symbol: "Al", nameEn: "Aluminium", nameKh: "អាលុយមីញ៉ូម",       mass: 26.982,  group: "post",       useEn: "Used for drink cans, foil, and lightweight aircraft parts.",      useKh: "ប្រើសម្រាប់កំប៉ុងភេសជ្ជៈ បន្ទះស្តើង និងគ្រឿងយន្តហោះស្រាល។" },
  { z: 14, symbol: "Si", nameEn: "Silicon",   nameKh: "ស៊ីលីស្យូម",        mass: 28.085,  group: "metalloid",  useEn: "The heart of every computer chip and solar panel.",               useKh: "បេះដូងនៃបន្ទះកុំព្យូទ័រ និងបន្ទះថាមពលព្រះអាទិត្យ។" },
  { z: 15, symbol: "P",  nameEn: "Phosphorus", nameKh: "ផូស្វ័រ",           mass: 30.974,  group: "nonmetal",   useEn: "Essential for DNA and bones; used in fertilizer.",                useKh: "ចាំបាច់សម្រាប់ DNA និងឆ្អឹង; ប្រើក្នុងជី។" },
  { z: 16, symbol: "S",  nameEn: "Sulfur",    nameKh: "ស្ពាន់ធ័រ",          mass: 32.06,   group: "nonmetal",   useEn: "Yellow solid; used to make rubber and matches.",                  useKh: "សារធាតុរឹងពណ៌លឿង; ប្រើផលិតកៅស៊ូ និងឈើគូស។" },
  { z: 17, symbol: "Cl", nameEn: "Chlorine",  nameKh: "ក្លរ",                mass: 35.45,   group: "halogen",    useEn: "Disinfects swimming pools and drinking water.",                    useKh: "សម្លាប់មេរោគនៅក្នុងអាងហែលទឹក និងទឹកផឹក។" },
  { z: 18, symbol: "Ar", nameEn: "Argon",     nameKh: "អាហ្គង",             mass: 39.948,  group: "noble",      useEn: "Fills light bulbs to stop the filament from burning.",            useKh: "បំពេញអំពូលភ្លើងដើម្បីរារាំងខ្សែភ្លើងពីការឆេះ។" },
  { z: 19, symbol: "K",  nameEn: "Potassium", nameKh: "ប៉ូតាស្យូម",         mass: 39.098,  group: "alkali",     useEn: "Vital nutrient for muscles and bananas are rich in it.",          useKh: "សារធាតុចិញ្ចឹមសំខាន់សម្រាប់សាច់ដុំ; ចេកមានជាតិនេះច្រើន។" },
  { z: 20, symbol: "Ca", nameEn: "Calcium",   nameKh: "កាល់ស្យូម",          mass: 40.078,  group: "alkaline",   useEn: "Builds strong bones, teeth, and seashells.",                       useKh: "កសាងឆ្អឹងរឹងមាំ ធ្មេញ និងសំបកសមុទ្រ។" },
  { z: 26, symbol: "Fe", nameEn: "Iron",      nameKh: "ដែក",                 mass: 55.845,  group: "transition", useEn: "Carries oxygen in our blood; the main metal in steel.",            useKh: "ដឹកនាំអុកស៊ីសែននៅក្នុងឈាម; លោហៈសំខាន់នៅក្នុងដែកថែប។" },
  { z: 29, symbol: "Cu", nameEn: "Copper",    nameKh: "ស្ពាន់",              mass: 63.546,  group: "transition", useEn: "Excellent conductor — used in electrical wires and water pipes.", useKh: "ចម្លងអគ្គិសនីល្អបំផុត — ប្រើនៅក្នុងខ្សែភ្លើង និងបំពង់ទឹក។" },
];

/* ── Helpers ──────────────────────────────────────────────────────── */
function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function matchScore(el: Element, q: string): number {
  if (!q) return 0;
  const sym = el.symbol.toLowerCase();
  const en = el.nameEn.toLowerCase();
  const kh = el.nameKh; // Khmer normalization is identity
  // Exact symbol match wins.
  if (sym === q) return 100;
  if (sym.startsWith(q)) return 90;
  if (en === q) return 80;
  if (en.startsWith(q)) return 70;
  if (en.includes(q)) return 50;
  if (kh === q) return 75;
  if (kh.startsWith(q)) return 65;
  if (kh.includes(q)) return 45;
  return 0;
}

/* ── Component ────────────────────────────────────────────────────── */
export function MolarMassLookup() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Element>(
    ELEMENTS.find((e) => e.symbol === "C") ?? ELEMENTS[0],
  );
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = normalize(query);
    if (!q) return [] as Element[];
    return ELEMENTS.map((e) => ({ e, s: matchScore(e, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.e.z - b.e.z)
      .slice(0, 8)
      .map((x) => x.e);
  }, [query]);

  // Close dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Reset highlight when matches change.
  useEffect(() => {
    setHighlight(0);
  }, [matches.length]);

  const choose = (el: Element) => {
    setSelected(el);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) {
      if (e.key === "Escape") {
        setQuery("");
        setOpen(false);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = matches[highlight] ?? matches[0];
      if (pick) choose(pick);
    } else if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
  };

  const meta = GROUP_META[selected.group];

  return (
    <section
      aria-label={t("Molar Mass Lookup", "ការស្វែងរកម៉ាស់ម៉ូល")}
      className="rounded-3xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b-2 border-slate-200 bg-gradient-to-br from-white via-sky-50/40 to-violet-50/40 relative">
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
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Atom className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-700 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Periodic Table Tool", "ឧបករណ៍តារាងកាលប្បវត្តិ")}
            </div>
            <h2
              className={`text-base sm:text-lg font-bold text-slate-900 leading-tight ${
                kh ? "font-khmer leading-relaxed" : "font-display"
              }`}
            >
              {t("Molar Mass Lookup", "ការស្វែងរកម៉ាស់ម៉ូល")}
            </h2>
            <p
              className={`text-xs sm:text-sm text-slate-600 leading-snug mt-0.5 ${
                kh ? "font-khmer leading-relaxed" : ""
              }`}
            >
              {t(
                "Search by name or symbol — e.g. \"Oxygen\", \"O\", or \"អុកស៊ីសែន\".",
                "ស្វែងរកតាមឈ្មោះ ឬនិមិត្តសញ្ញា — ឧ. \"Oxygen\", \"O\", ឬ \"អុកស៊ីសែន\"។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div ref={wrapperRef} className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => query && setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t("Type element name or symbol…", "វាយឈ្មោះ ឬនិមិត្តសញ្ញាធាតុ…")}
            aria-label={t("Search elements", "ស្វែងរកធាតុ")}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open && query.length > 0}
            aria-controls="molarmass-results"
            aria-activedescendant={
              open && matches.length > 0 ? `molarmass-opt-${matches[highlight]?.symbol ?? ""}` : undefined
            }
            className={`w-full bg-white rounded-xl border-2 border-slate-300 pl-9 pr-9 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none transition-colors focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 ${
              kh ? "font-khmer" : ""
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
                inputRef.current?.focus();
              }}
              aria-label={t("Clear search", "សម្អាតការស្វែងរក")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Dropdown */}
          {open && matches.length > 0 && (
            <ul
              id="molarmass-results"
              role="listbox"
              className="absolute z-20 left-0 right-0 mt-1.5 max-h-72 overflow-auto rounded-xl border-2 border-slate-200 bg-white shadow-lg"
            >
              {matches.map((el, i) => {
                const m = GROUP_META[el.group];
                const isHi = i === highlight;
                return (
                  <li
                    key={el.symbol}
                    id={`molarmass-opt-${el.symbol}`}
                    role="option"
                    aria-selected={isHi}
                    onMouseDown={(e) => {
                      // Use mousedown so blur doesn't fire first.
                      e.preventDefault();
                      choose(el);
                    }}
                    onMouseEnter={() => setHighlight(i)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-slate-100 last:border-b-0 ${
                      isHi ? "bg-sky-50" : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {/* Mini periodic-table tile */}
                    <div
                      className={`w-12 h-12 rounded-lg border-2 bg-gradient-to-br ${m.tile} flex flex-col items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      <div className="text-[8px] leading-none opacity-70">{el.z}</div>
                      <div className="text-base font-bold leading-none mt-0.5">{el.symbol}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-semibold text-slate-900 truncate ${kh ? "font-khmer" : ""}`}>
                        {kh ? el.nameKh : el.nameEn}
                      </div>
                      <div className={`text-[11px] text-slate-500 truncate ${kh ? "font-khmer" : ""}`}>
                        {kh ? el.nameEn : el.nameKh} · {el.mass} g/mol
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.chip} ${
                        kh ? "font-khmer" : ""
                      }`}
                    >
                      {kh ? m.labelKh : m.labelEn}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {open && query && matches.length === 0 && (
            <div
              id="molarmass-results"
              role="listbox"
              aria-label={t("Search results", "លទ្ធផលស្វែងរក")}
              className="absolute z-20 left-0 right-0 mt-1.5 rounded-xl border-2 border-slate-200 bg-white shadow-lg p-4 text-center"
            >
              <p className={`text-sm text-slate-600 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  `No elements found for "${query}".`,
                  `រកមិនឃើញធាតុសម្រាប់ "${query}"។`,
                )}
              </p>
              <p className={`text-[11px] text-slate-400 mt-1 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                {t("Try H, C, O, Fe, Cu…", "សាកល្បង H, C, O, Fe, Cu…")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selected element display card */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1">
        <article
          aria-live="polite"
          className={`rounded-2xl border-2 bg-gradient-to-br ${meta.tile} ring-1 ${meta.ring} ring-opacity-50 shadow-sm overflow-hidden`}
        >
          {/* Top: large periodic-table tile */}
          <div className="p-4 sm:p-5 flex items-stretch gap-4">
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 border-current/30 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
              <div className="text-[10px] font-bold opacity-70 self-end pr-2">{selected.z}</div>
              <div className="text-4xl sm:text-5xl font-black leading-none -mt-1">
                {selected.symbol}
              </div>
              <div className="text-[10px] sm:text-xs font-mono opacity-80 mt-1">
                {selected.mass}
              </div>
            </div>

            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <div
                className={`text-[10px] font-bold tracking-widest uppercase opacity-70 mb-0.5 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(`Element ${selected.z}`, `ធាតុទី ${selected.z}`)}
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold leading-tight ${
                  kh ? "font-khmer leading-snug" : "font-display"
                }`}
              >
                {kh ? selected.nameKh : selected.nameEn}
              </h3>
              <div className={`text-xs sm:text-sm opacity-80 mt-0.5 ${kh ? "font-khmer" : ""}`}>
                {kh ? selected.nameEn : selected.nameKh}
              </div>
              <span
                className={`mt-2 inline-flex self-start text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${meta.chip} ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {kh ? meta.labelKh : meta.labelEn}
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-current/20 border-t border-current/20">
            <div className="bg-white/70 p-3 sm:p-4 backdrop-blur-sm">
              <div
                className={`text-[10px] font-bold tracking-widest uppercase text-slate-600 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Atomic Number", "លេខអាតូម")}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {selected.z}
              </div>
              <div className={`text-[10px] text-slate-500 mt-0.5 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                {t("Number of protons", "ចំនួនប្រូតុង")}
              </div>
            </div>
            <div className="bg-white/70 p-3 sm:p-4 backdrop-blur-sm">
              <div
                className={`text-[10px] font-bold tracking-widest uppercase text-slate-600 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Molar Mass", "ម៉ាស់ម៉ូល")}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {selected.mass}{" "}
                <span className="text-xs sm:text-sm font-semibold text-slate-500">g/mol</span>
              </div>
              <div className={`text-[10px] text-slate-500 mt-0.5 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                {t("grams per mole", "ក្រាមក្នុងមួយម៉ូល")}
              </div>
            </div>
          </div>

          {/* Common use */}
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 border-t border-current/20">
            <div
              className={`text-[10px] font-bold tracking-widest uppercase text-slate-600 mb-1 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Common Use", "ការប្រើប្រាស់ទូទៅ")}
            </div>
            <p className={`text-sm text-slate-800 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? selected.useKh : selected.useEn}
            </p>
            <p className={`text-[11px] text-slate-500 mt-1.5 ${kh ? "font-khmer leading-relaxed" : ""}`}>
              {kh ? selected.useEn : selected.useKh}
            </p>
          </div>
        </article>

        {/* Quick chips */}
        <div className="mt-3">
          <div
            className={`text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1.5 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Quick pick", "ជ្រើសរើសរហ័ស")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ELEMENTS.map((el) => {
              const m = GROUP_META[el.group];
              const isActive = el.symbol === selected.symbol;
              return (
                <button
                  key={el.symbol}
                  type="button"
                  onClick={() => choose(el)}
                  title={`${el.nameEn} — ${el.nameKh} (${el.mass} g/mol)`}
                  aria-label={t(
                    `${el.nameEn} (${el.symbol}), ${el.mass} grams per mole`,
                    `${el.nameKh} (${el.symbol}), ${el.mass} ក្រាមក្នុងមួយម៉ូល`,
                  )}
                  className={`min-w-[2.5rem] h-9 px-1.5 rounded-md border-2 bg-gradient-to-br ${m.tile} font-mono text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 ${
                    isActive ? "ring-2 ring-offset-1 " + m.ring : ""
                  }`}
                >
                  {el.symbol}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(Object.keys(GROUP_META) as Group[]).map((g) => {
            const m = GROUP_META[g];
            return (
              <span
                key={g}
                className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border ${m.chip} ${
                  kh ? "font-khmer" : ""
                }`}
              >
                <span className={`w-2 h-2 rounded-sm bg-gradient-to-br ${m.tile} border border-current/30`} />
                {kh ? m.labelKh : m.labelEn}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
