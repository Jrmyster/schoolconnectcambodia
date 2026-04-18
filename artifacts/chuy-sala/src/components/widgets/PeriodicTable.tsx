import { useEffect, useMemo, useState } from "react";
import { Search, X, Filter, Grid3x3, List, Atom, Hash, Weight, Layers, Sparkles, RotateCcw } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { ELEMENTS, CATEGORY_META, type Element, type ElementCategory } from "./periodic-data";
import { BohrModel } from "./BohrModel";

type FamilyFilter = "all" | "metal" | "metalloid" | "nonmetal";
type ViewMode = "grid" | "list";

const LANTH_LABEL_CELL = { row: 6, col: 3 };
const ACTIN_LABEL_CELL = { row: 7, col: 3 };

export function PeriodicTable() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyFilter>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [selected, setSelected] = useState<Element | null>(null);

  // Match by symbol (case-insensitive exact OR prefix), atomic number, or name (en/kh substring)
  const q = query.trim().toLowerCase();
  const matchesQuery = (e: Element): boolean => {
    if (!q) return false;
    if (e.symbol.toLowerCase() === q) return true;
    if (e.symbol.toLowerCase().startsWith(q)) return true;
    if (String(e.z) === q) return true;
    if (e.nameEn.toLowerCase().includes(q)) return true;
    if (e.nameKh.includes(query.trim())) return true;
    return false;
  };
  const matchesFamily = (e: Element): boolean => {
    if (family === "all") return true;
    return CATEGORY_META[e.category].family === family;
  };

  const filteredCount = useMemo(
    () => ELEMENTS.filter((e) => matchesFamily(e) && (q ? matchesQuery(e) : true)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, family],
  );

  function reset() {
    setQuery("");
    setFamily("all");
  }

  // Lock body scroll when modal open
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [selected]);

  // ESC closes modal
  useEffect(() => {
    if (!selected) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setSelected(null); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="rounded-3xl bg-white border-2 border-primary/20 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-sky-50 via-white to-violet-50 border-b border-border">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-primary/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Atom className="w-3.5 h-3.5" />
          <span>{kh ? "តារាងខួប" : "Periodic Table"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "តារាងខួបនៃធាតុគីមី" : "Interactive Periodic Table"}
          {kh && <span className="ml-2 text-sm text-muted-foreground font-sans font-normal">(Periodic Table)</span>}
        </h3>
        <p className={`mt-1 text-sm text-muted-foreground max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ចុចលើធាតុណាមួយ ដើម្បីមើលឈ្មោះខ្មែរ-អង់គ្លេស ម៉ាស់អាតូម ការរៀបចំអេឡិចត្រុង និងការប្រើប្រាស់របស់វា។"
            : "Tap any element to see its Khmer & English name, atomic mass, electron configuration, and a real-world use."}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-stone-50/60">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={kh ? "ស្វែងរក៖ Au, មាស, 79…" : "Search: Au, Gold, 79…"}
              className={`w-full pl-9 pr-9 py-2 text-sm rounded-lg border-2 border-stone-200 bg-white focus:border-primary focus:outline-none transition ${kh ? "font-khmer" : ""}`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                aria-label={kh ? "សម្អាត" : "Clear"}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Family filter */}
          <div className="flex items-center gap-1 bg-white rounded-lg border-2 border-stone-200 p-0.5">
            <Filter className="w-3.5 h-3.5 text-stone-400 ml-2" />
            {(["all", "metal", "metalloid", "nonmetal"] as FamilyFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFamily(f)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  family === f
                    ? "bg-primary text-white"
                    : "text-stone-600 hover:bg-stone-100"
                } ${kh ? "font-khmer" : ""}`}
              >
                {f === "all"      && (kh ? "ទាំងអស់"   : "All")}
                {f === "metal"    && (kh ? "លោហៈ"     : "Metals")}
                {f === "metalloid"&& (kh ? "ពាក់កណ្តាល" : "Metalloids")}
                {f === "nonmetal" && (kh ? "មិនមែនលោហៈ" : "Non-metals")}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-white rounded-lg border-2 border-stone-200 p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition ${
                view === "grid" ? "bg-primary text-white" : "text-stone-600 hover:bg-stone-100"
              } ${kh ? "font-khmer" : ""}`}
              title={kh ? "ទិដ្ឋភាពតារាង" : "Grid view"}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{kh ? "តារាង" : "Grid"}</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition ${
                view === "list" ? "bg-primary text-white" : "text-stone-600 hover:bg-stone-100"
              } ${kh ? "font-khmer" : ""}`}
              title={kh ? "ទិដ្ឋភាពបញ្ជី" : "List view"}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{kh ? "បញ្ជី" : "List"}</span>
            </button>
          </div>
        </div>

        {/* Counts + reset */}
        {(query || family !== "all") && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className={`text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? `ផ្គូផ្គង ${filteredCount} ធាតុ ក្នុងចំណោម ${ELEMENTS.length}` : `Matching ${filteredCount} of ${ELEMENTS.length} elements`}
            </span>
            <button
              onClick={reset}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 ${kh ? "font-khmer" : ""}`}
            >
              <RotateCcw className="w-3 h-3" />
              {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 sm:p-5">
        {view === "grid" ? (
          <GridView
            kh={kh}
            query={q}
            family={family}
            matchesQuery={matchesQuery}
            matchesFamily={matchesFamily}
            onPick={setSelected}
          />
        ) : (
          <ListView
            kh={kh}
            query={q}
            family={family}
            matchesQuery={matchesQuery}
            matchesFamily={matchesFamily}
            onPick={setSelected}
          />
        )}

        {/* Legend */}
        <div className="mt-5 pt-4 border-t border-border">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ការលាក់ពណ៌តាមប្រភេទ" : "Color Key — Categories"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(CATEGORY_META) as ElementCategory[]).map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded border ${meta.chip} ${kh ? "font-khmer" : ""}`}
                >
                  <span className={`w-2 h-2 rounded-sm ${meta.cell.split(" ")[0]}`} />
                  {kh ? meta.kh : meta.en}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <ElementModal element={selected} kh={kh} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function GridView({
  kh, query, family, matchesQuery, matchesFamily, onPick,
}: {
  kh: boolean;
  query: string;
  family: FamilyFilter;
  matchesQuery: (e: Element) => boolean;
  matchesFamily: (e: Element) => boolean;
  onPick: (e: Element) => void;
}) {
  const hasQuery = !!query;

  return (
    <>
      {/* Mobile hint */}
      <div className={`sm:hidden mb-2 text-[11px] text-stone-500 italic flex items-center gap-1 ${kh ? "font-khmer not-italic" : ""}`}>
        <span>↔</span>
        <span>{kh ? "អូសផ្ដេក ដើម្បីមើលតារាងពេញ" : "Swipe sideways to see the full table"}</span>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0 pb-2">
        <div
          className="grid gap-[3px] mx-auto"
          style={{
            gridTemplateColumns: "repeat(18, minmax(44px, 1fr))",
            gridTemplateRows: "repeat(10, minmax(50px, auto))",
            minWidth: 18 * 44 + 17 * 3,
          }}
          role="grid"
          aria-label={kh ? "តារាងខួបនៃធាតុ" : "Periodic table of elements"}
        >
          {ELEMENTS.map((el) => {
            const dim = (hasQuery && !matchesQuery(el)) || !matchesFamily(el);
            const highlight = hasQuery && matchesQuery(el) && matchesFamily(el);
            return (
              <ElementCell
                key={el.z}
                el={el}
                kh={kh}
                dim={dim}
                highlight={highlight}
                onPick={onPick}
              />
            );
          })}

          {/* Lanthanide / Actinide row labels in the main table */}
          <div
            className="flex items-center justify-center text-[10px] sm:text-xs font-bold text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-200 rounded-md"
            style={{ gridRow: LANTH_LABEL_CELL.row, gridColumn: LANTH_LABEL_CELL.col }}
            aria-hidden
          >
            57–71
          </div>
          <div
            className="flex items-center justify-center text-[10px] sm:text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-md"
            style={{ gridRow: ACTIN_LABEL_CELL.row, gridColumn: ACTIN_LABEL_CELL.col }}
            aria-hidden
          >
            89–103
          </div>

          {/* Tiny gap row label between main table and f-block */}
          <div
            className={`text-[10px] text-stone-400 italic flex items-center justify-end pr-1 ${kh ? "font-khmer not-italic" : ""}`}
            style={{ gridRow: 9, gridColumn: "1 / span 2" }}
            aria-hidden
          >
            {kh ? "ឡង់តាណូអ៊ីត" : "Lanthanides"}
          </div>
          <div
            className={`text-[10px] text-stone-400 italic flex items-center justify-end pr-1 ${kh ? "font-khmer not-italic" : ""}`}
            style={{ gridRow: 10, gridColumn: "1 / span 2" }}
            aria-hidden
          >
            {kh ? "អាក់ទីណូអ៊ីត" : "Actinides"}
          </div>
        </div>
      </div>

      {family !== "all" && !query && (
        <p className={`mt-2 text-xs text-stone-500 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? "ធាតុដែលមិនត្រូវនឹងតម្រងត្រូវបានបន្ថយពន្លឺ។" : "Elements outside the filter are dimmed."}
        </p>
      )}
    </>
  );
}

function ElementCell({
  el, kh, dim, highlight, onPick,
}: { el: Element; kh: boolean; dim: boolean; highlight: boolean; onPick: (e: Element) => void }) {
  const meta = CATEGORY_META[el.category];
  const base = "relative flex flex-col items-center justify-center rounded-md border text-center transition-all duration-200 focus:outline-none";
  const state = dim
    ? "opacity-25 grayscale"
    : highlight
      ? `${meta.cell} ring-2 ${meta.ring} ring-offset-1 z-10 scale-105 shadow-md`
      : `${meta.cell} hover:-translate-y-0.5 hover:shadow`;
  return (
    <button
      type="button"
      onClick={() => !dim && onPick(el)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !dim) {
          e.preventDefault();
          onPick(el);
        }
      }}
      disabled={dim}
      className={`${base} ${state}`}
      style={{ gridRow: el.period, gridColumn: el.group, minHeight: 50 }}
      aria-label={`${el.symbol} ${el.nameEn}, atomic number ${el.z}`}
    >
      <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono opacity-70 leading-none">{el.z}</span>
      <span className="font-bold text-sm sm:text-base leading-none mt-1">{el.symbol}</span>
      <span className="text-[8px] sm:text-[9px] leading-tight mt-0.5 px-0.5 truncate w-full opacity-80">
        {el.nameEn}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function ListView({
  kh, query, family, matchesQuery, matchesFamily, onPick,
}: {
  kh: boolean;
  query: string;
  family: FamilyFilter;
  matchesQuery: (e: Element) => boolean;
  matchesFamily: (e: Element) => boolean;
  onPick: (e: Element) => void;
}) {
  const list = ELEMENTS.filter((e) => matchesFamily(e) && (query ? matchesQuery(e) : true));
  if (list.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className={`text-sm text-stone-500 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? "រកមិនឃើញធាតុណាមួយ។ សូមសាកល្បងពាក្យស្វែងរកផ្សេង។" : "No elements match. Try a different search term."}
        </p>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {list.map((el) => {
        const meta = CATEGORY_META[el.category];
        return (
          <li key={el.z}>
            <button
              type="button"
              onClick={() => onPick(el)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition hover:shadow-md hover:-translate-y-0.5 ${meta.cell}`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-md bg-white/60 border border-current/10 flex flex-col items-center justify-center">
                <span className="text-[9px] font-mono opacity-70 leading-none">{el.z}</span>
                <span className="font-bold text-base leading-tight mt-0.5">{el.symbol}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className={`font-bold text-sm truncate ${kh ? "font-khmer" : ""}`}>
                  {kh ? el.nameKh : el.nameEn}
                </div>
                <div className={`text-[11px] opacity-80 truncate ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? `${el.nameEn} · ${meta.kh}` : `${meta.en} · ${el.mass}`}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function ElementModal({ element: el, kh, onClose }: { element: Element; kh: boolean; onClose: () => void }) {
  const meta = CATEGORY_META[el.category];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="element-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto"
      >
        {/* Hero / cover */}
        <div className={`relative bg-gradient-to-br ${meta.soft} px-6 pt-6 pb-5 border-b border-border`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-stone-700"
            aria-label={kh ? "បិទ" : "Close"}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center ${meta.cell}`}>
              <span className="text-[11px] font-mono opacity-70 leading-none">{el.z}</span>
              <span className="font-display font-bold text-4xl leading-tight mt-1">{el.symbol}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[10px] font-mono uppercase tracking-widest ${meta.text} opacity-80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? meta.kh : meta.en}
              </div>
              <h2 id="element-modal-title" className={`font-display font-bold text-2xl text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
                {kh ? el.nameKh : el.nameEn}
              </h2>
              <p className={`text-sm text-stone-700 mt-0.5 ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? (
                  <>
                    <span className="font-medium">{el.nameEn}</span>
                    <span className="mx-1.5 text-stone-400">/</span>
                    <span>{el.nameKh}</span>
                  </>
                ) : (
                  <>
                    <span>{el.nameEn}</span>
                    <span className="mx-1.5 text-stone-400">/</span>
                    <span className="font-khmer">{el.nameKh}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Bohr model visualizer */}
        <div className="px-5 pt-5">
          <BohrModel element={el} kh={kh} />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 p-5">
          <StatCard
            Icon={Hash}
            label={kh ? "លេខអាតូម" : "Atomic Number"}
            value={String(el.z)}
            kh={kh}
          />
          <StatCard
            Icon={Weight}
            label={kh ? "ម៉ាស់អាតូម" : "Atomic Mass"}
            value={el.mass}
            unit={kh ? "u (ឯកតាម៉ាស់អាតូម)" : "u"}
            kh={kh}
          />
          <StatCard
            Icon={Layers}
            label={kh ? "ការរៀបចំអេឡិចត្រុង" : "Electron Configuration"}
            value={el.config}
            kh={kh}
            mono
            wide
          />
        </div>

        {/* Use / description */}
        <div className="px-5 pb-5">
          <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={`w-4 h-4 ${meta.text}`} />
              <h4 className={`text-xs font-mono uppercase tracking-widest text-stone-600 ${kh ? "font-khmer normal-case tracking-normal text-sm font-bold" : ""}`}>
                {kh ? "ការប្រើប្រាស់ក្នុងជីវិតពិត" : "Real-World Use"}
              </h4>
            </div>
            <p className={`text-base text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? el.useKh : el.useEn}
            </p>
            {kh && (
              <p className="mt-2 text-xs text-stone-500 italic">
                {el.useEn}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center justify-between gap-2">
          <p className={`text-xs text-stone-500 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? `ខួប ${el.period} · ក្រុម ${el.group}` : `Period ${el.period} · Group ${el.group}`}
          </p>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:opacity-90 transition ${kh ? "font-khmer" : ""}`}
          >
            {kh ? "បិទ" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  Icon, label, value, unit, kh, mono, wide,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit?: string;
  kh: boolean;
  mono?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-stone-200 bg-white p-3 ${wide ? "col-span-2" : ""}`}>
      <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className={`text-foreground font-bold text-base ${mono ? "font-mono" : ""} break-words`}>
        {value}
        {unit && <span className="ml-1.5 text-xs font-normal text-stone-500">{unit}</span>}
      </div>
    </div>
  );
}
