import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Flag,
  Search,
  Globe2,
  AlertTriangle,
  Sparkles,
  X,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-VEX-01 · Vexillology: The Language of Flags
//                វ៉ិចស៊ីឡូឡូជី៖ ភាសានៃទង់ជាតិ
//
//  Bilingual gallery-style module:
//   • Hero + bilingual definition
//   • 5 Basic Rules of Good Flag Design (with Cambodia rule-breaker callout)
//   • Live fetch from REST Countries API (no hard-coded country list)
//   • Search bar + Region filter
//   • Responsive flag-card grid w/ drop-shadowed images
//
//  Aesthetic: gallery whites & cool greys, with the country flags themselves
//  providing the colour. Charcoal accent ribbon for the hero.
// ════════════════════════════════════════════════════════════════════════════

interface RestCountry {
  name: { common: string; official?: string };
  flags: { png?: string; svg?: string; alt?: string };
  region?: string;
  capital?: string[];
}

interface Country {
  id: string;        // unique key (common name)
  name: string;
  flagSrc: string;   // best-resolution image url
  flagAlt: string;
  region: string;
  capital: string;
}

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,capital";

// Region → bilingual label
const REGION_KH: Record<string, string> = {
  Africa: "អាហ្វ្រិក",
  Americas: "អាមេរិក",
  Antarctic: "អង់តាក់ទិក",
  Asia: "អាស៊ី",
  Europe: "អឺរ៉ុប",
  Oceania: "អូសេអានី",
};

export function VexillologyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  // ─── Data fetch (native fetch + useEffect, per spec) ────────────────────
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<RestCountry[]>;
      })
      .then((data) => {
        const cleaned: Country[] = data
          .map((c) => ({
            id: c.name?.common ?? "unknown",
            name: c.name?.common ?? "—",
            flagSrc: c.flags?.svg ?? c.flags?.png ?? "",
            flagAlt: c.flags?.alt || `${c.name?.common ?? "country"} flag`,
            region: c.region ?? "—",
            capital:
              Array.isArray(c.capital) && c.capital.length > 0
                ? c.capital[0]
                : "—",
          }))
          .filter((c) => c.flagSrc) // skip entries with no flag
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(cleaned);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Network error");
      });

    return () => controller.abort();
  }, []);

  // ─── Search + region filter ─────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("All");

  const regions = useMemo(() => {
    if (!countries) return [];
    const set = new Set<string>();
    for (const c of countries) if (c.region && c.region !== "—") set.add(c.region);
    return Array.from(set).sort();
  }, [countries]);

  const filtered = useMemo(() => {
    if (!countries) return [];
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q);
      const matchR = region === "All" || c.region === region;
      return matchQ && matchR;
    });
  }, [countries, query, region]);

  return (
    <div className="min-h-screen relative bg-slate-50 text-slate-900">
      {/* Back link */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>

      {/* Hero */}
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm flex-wrap">
          <Flag className="w-3.5 h-3.5" />
          <span>Study Center · Vexillology</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">
            មជ្ឈមណ្ឌលសិក្សា · វ៉ិចស៊ីឡូឡូជី
          </span>
          <span className="font-mono opacity-60">· STC-VEX-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight"
        >
          Vexillology:{" "}
          <span className="text-rose-600">The Language of Flags</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-slate-800">
          វ៉ិចស៊ីឡូឡូជី៖{" "}
          <span className="text-rose-600">ភាសានៃទង់ជាតិ</span>
        </h2>

        <div className="space-y-2 max-w-3xl text-slate-700">
          <p className="text-base leading-relaxed">
            <strong>Vexillology</strong> is the{" "}
            <strong>scientific study</strong> of flags — their{" "}
            <strong>history</strong>, their <strong>symbolism</strong>, and how
            they are <strong>used</strong>. Every line, every colour, every
            shape on a flag is a sentence in a silent language spoken by an
            entire nation.
          </p>
          <p className="text-base font-khmer leading-loose">
            <strong>វ៉ិចស៊ីឡូឡូជី</strong> គឺជា <strong>ការសិក្សាបែបវិទ្យាសាស្ត្រ</strong> អំពីទង់ជាតិ — <strong>ប្រវត្តិ</strong> <strong>និមិត្តរូប</strong> និងរបៀប <strong>ប្រើប្រាស់</strong> របស់វា។ រាល់​បន្ទាត់ រាល់​ពណ៌ រាល់​រូបរាង​នៅ​លើ​ទង់​ជាតិ​គឺ​ជា​ឃ្លា​មួយ​នៅ​ក្នុង​ភាសា​ស្ងាត់​ដែល​និយាយ​ដោយ​ប្រជាជាតិ​ទាំងមូល។
          </p>
        </div>
      </header>

      {/* The 5 Rules card */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <FiveRulesPanel />
      </section>

      {/* Controls */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div
          className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col gap-3 md:flex-row md:items-end md:gap-4"
          data-testid="vex-controls"
        >
          {/* Search */}
          <div className="flex-1 min-w-0">
            <label
              htmlFor="vex-search"
              className="block text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1"
            >
              <span>Search by country</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] ml-2">
                ស្វែងរកតាមប្រទេស
              </span>
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="vex-search"
                data-testid="vex-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Cambodia, Japan… · ឧ. កម្ពុជា, ជប៉ុន…"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-9 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search · សម្អាត"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  data-testid="vex-search-clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Region filter */}
          <div className="md:w-64">
            <label
              htmlFor="vex-region"
              className="block text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1"
            >
              <span>Filter by continent</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] ml-2">
                ច្រោះតាមទ្វីប
              </span>
            </label>
            <select
              id="vex-region"
              data-testid="vex-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
            >
              <option value="All">
                {isKh ? "តំបន់ទាំងអស់ · All regions" : "All regions · តំបន់ទាំងអស់"}
              </option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                  {REGION_KH[r] ? ` · ${REGION_KH[r]}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Result count — bilingual */}
          <div className="md:w-44 text-xs text-slate-600 md:text-right">
            <div data-testid="vex-count">
              <strong className="text-slate-900 text-base">
                {countries ? filtered.length : "…"}
              </strong>
              {countries ? ` / ${countries.length}` : ""} countries
            </div>
            <div className="font-khmer text-[11px] leading-loose">
              {countries
                ? `បង្ហាញ ${filtered.length} ក្នុងចំណោម ${countries.length} ប្រទេស`
                : "កំពុងផ្ទុក…"}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <main
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        data-testid="vex-gallery"
      >
        {error && <ErrorPanel message={error} />}
        {!error && !countries && <SkeletonGrid />}
        {!error && countries && filtered.length === 0 && (
          <EmptyResults onClear={() => { setQuery(""); setRegion("All"); }} />
        )}
        {!error && countries && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {filtered.map((c) => (
              <FlagCard key={c.id} country={c} />
            ))}
          </div>
        )}
      </main>

      {/* Closing — bilingual */}
      <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-4 text-slate-800 shadow-sm">
          <p className="font-serif italic">
            “A nation’s flag is its shortest poem — a single image that an
            entire people will live and die for.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-700 mt-1">
            «ទង់ជាតិរបស់ប្រជាជាតិមួយ​គឺ​ជា​កំណាព្យ​ខ្លី​បំផុត​របស់​វា — រូបភាព​តែ​មួយ​ដែល​ប្រជាជន​ទាំង​មូល​នឹង​រស់ និង​ស្លាប់​ដើម្បី​វា។»
          </p>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">
          Live data: <a href="https://restcountries.com" target="_blank" rel="noreferrer" className="underline hover:text-slate-800">restcountries.com</a>
          <span className="mx-2 opacity-50">·</span>
          <span className="font-khmer">ទិន្នន័យផ្ទាល់៖ restcountries.com</span>
        </p>
      </footer>
    </div>
  );
}

export default VexillologyPage;

// ════════════════════════════════════════════════════════════════════════════
//  5 Basic Rules panel — strictly bilingual
// ════════════════════════════════════════════════════════════════════════════

const RULES: Array<{
  n: number;
  en: string;
  kh: string;
  detailEn: string;
  detailKh: string;
}> = [
  {
    n: 1,
    en: "Keep it simple",
    kh: "សាមញ្ញ",
    detailEn: "A child should be able to draw it from memory.",
    detailKh: "ក្មេង​គួរ​តែ​អាច​គូរ​វា​ពី​ការ​ចងចាំ​បាន។",
  },
  {
    n: 2,
    en: "Use meaningful symbolism",
    kh: "អត្ថន័យជ្រាលជ្រៅ",
    detailEn: "Every shape and colour should mean something.",
    detailKh: "រាល់​រូបរាង និង​ពណ៌​គួរ​តែ​មាន​អត្ថន័យ​អ្វី​មួយ។",
  },
  {
    n: 3,
    en: "Use 2–3 basic colours",
    kh: "ពណ៌មូលដ្ឋាន",
    detailEn: "Pick from the standard set so they contrast clearly.",
    detailKh: "ជ្រើសរើស​ពី​សំណុំ​ស្តង់ដារ ដើម្បី​ឱ្យ​មាន​ភាព​ផ្ទុយ​ច្បាស់​លាស់។",
  },
  {
    n: 4,
    en: "No lettering or seals",
    kh: "គ្មានអក្សរ ឬត្រា",
    detailEn: "If you need words, the design has already failed.",
    detailKh: "បើ​អ្នក​ត្រូវ​ការ​ពាក្យ ការ​រចនា​បាន​បរាជ័យ​រួច​ហើយ។",
  },
  {
    n: 5,
    en: "Be distinctive",
    kh: "មានលក្ខណៈប្លែកពីគេ",
    detailEn: "Or: be intentionally similar to show kinship.",
    detailKh: "ឬ​មាន​ភាព​ស្រដៀង​ដោយ​ចេតនា​ដើម្បី​បង្ហាញ​ភាព​ជា​សាច់​ញាតិ។",
  },
];

function FiveRulesPanel() {
  return (
    <article
      data-testid="card-five-rules"
      className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-5 pb-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 flex flex-wrap gap-x-2">
          <span>The Foundation</span>
          <span className="opacity-50">/</span>
          <span className="font-khmer normal-case tracking-normal text-[0.7rem]">
            មូលដ្ឋានគ្រឹះ
          </span>
        </div>
        <h3 className="font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
          The 5 Basic Rules of Good Flag Design
        </h3>
        <h4 className="font-khmer text-base sm:text-lg leading-loose text-slate-700 mt-0.5">
          ច្បាប់​មូលដ្ឋាន​ទាំង ៥ នៃ​ការ​រចនា​ទង់​ជាតិ​ល្អ
        </h4>
      </header>
      <div className="px-5 sm:px-7 py-5">
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {RULES.map((r) => (
            <li
              key={r.n}
              data-testid={`rule-${r.n}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-rose-600 text-white font-bold text-sm shadow-sm">
                  {r.n}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900 leading-tight">
                    {r.en}
                  </div>
                  <div className="font-khmer text-[13px] leading-loose text-slate-700">
                    {r.kh}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {r.detailEn}
              </p>
              <p className="text-xs font-khmer leading-loose text-slate-600">
                {r.detailKh}
              </p>
            </li>
          ))}
        </ol>

        {/* Cambodia rule-breaker callout */}
        <div
          className="mt-5 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 flex items-start gap-3"
          data-testid="cambodia-callout"
        >
          <Sparkles
            className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-700"
            aria-hidden="true"
          />
          <div className="text-sm text-amber-950 leading-relaxed space-y-1.5 min-w-0">
            <p>
              <strong>🇰🇭 Cambodia proudly breaks Rule #4!</strong> The flag
              of <strong>Cambodia</strong> features a highly detailed building —{" "}
              <strong>Angkor Wat</strong> — which makes it{" "}
              <strong>uniquely recognizable</strong> in the entire world. There
              is no other flag like it.
            </p>
            <p className="font-khmer leading-loose">
              <strong>🇰🇭 កម្ពុជា​បាន​បំបែក​ច្បាប់​ទី ៤ ដោយ​មោទនភាព !</strong> ទង់​ជាតិ​នៃ​ <strong>ប្រទេស​កម្ពុជា</strong> មាន​រូប​អគារ​លម្អិត​មួយ — <strong>ប្រាសាទ​អង្គរវត្ត</strong> — ដែល​ធ្វើ​ឱ្យ​វា <strong>មាន​លក្ខណៈ​ប្លែក​មិន​អាច​យល់​ច្រឡំ​បាន</strong> នៅ​ក្នុង​ពិភព​លោក​ទាំង​មូល។ គ្មាន​ទង់​ផ្សេង​ទៀត​ដូច​វា​ទេ។
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Flag card
// ════════════════════════════════════════════════════════════════════════════

function FlagCard({ country }: { country: Country }) {
  return (
    <article
      data-testid={`flag-card-${country.id.toLowerCase().replace(/\s+/g, "-")}`}
      className="rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      {/* Flag image — drop-shadow ensures white flags don't disappear */}
      <div className="aspect-[3/2] bg-slate-100 flex items-center justify-center p-3">
        <img
          src={country.flagSrc}
          alt={country.flagAlt}
          loading="lazy"
          className="max-w-full max-h-full object-contain"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(15, 23, 42, 0.18))",
          }}
        />
      </div>
      <div className="px-3 py-2.5 border-t border-slate-100 flex flex-col gap-0.5">
        <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">
          {country.name}
        </h4>
        <div className="text-[11px] text-slate-600 leading-tight truncate">
          <span className="font-mono uppercase tracking-wider opacity-70">
            Capital
          </span>
          <span className="font-khmer normal-case tracking-normal opacity-70 ml-1">
            · រាជធានី
          </span>{" "}
          · {country.capital}
        </div>
        <div className="text-[11px] text-slate-500 leading-tight truncate">
          <Globe2 className="inline w-3 h-3 mb-0.5" aria-hidden="true" />{" "}
          {country.region}
          {REGION_KH[country.region] ? (
            <span className="font-khmer text-[10px] ml-1 opacity-80">
              · {REGION_KH[country.region]}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Loading skeleton — matches the gallery grid
// ════════════════════════════════════════════════════════════════════════════

function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
      data-testid="vex-skeleton"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="aspect-[3/2] bg-slate-200 animate-pulse" />
          <div className="px-3 py-2.5 space-y-1.5 border-t border-slate-100">
            <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-2.5 w-1/2 bg-slate-100 rounded animate-pulse" />
            <div className="h-2.5 w-2/3 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Empty state (filters returned no countries)
// ════════════════════════════════════════════════════════════════════════════

function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div
      className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
      data-testid="vex-empty"
    >
      <p className="text-slate-700 font-semibold">
        No countries match your search.
      </p>
      <p className="font-khmer text-slate-700 leading-loose">
        គ្មាន​ប្រទេស​ណា​ត្រូវ​នឹង​ការ​ស្វែងរក​របស់​អ្នក​ទេ។
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 shadow-sm"
        data-testid="vex-clear-filters"
      >
        <X className="w-4 h-4" />
        <span>Clear filters</span>
        <span className="font-khmer text-[12px]">· សម្អាត</span>
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Error state
// ════════════════════════════════════════════════════════════════════════════

function ErrorPanel({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-6 flex items-start gap-3"
      data-testid="vex-error"
    >
      <AlertTriangle
        className="w-6 h-6 text-rose-700 flex-shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div className="text-sm text-rose-950 space-y-1.5 min-w-0">
        <p>
          <strong>Could not load flags.</strong> Check your internet connection
          and try refreshing the page.
        </p>
        <p className="font-khmer leading-loose">
          <strong>មិន​អាច​ផ្ទុក​ទង់​ជាតិ​បាន​ទេ។</strong> សូម​ពិនិត្យ​ការ​ភ្ជាប់​អ៊ីនធឺណិត​របស់​អ្នក រួច​ព្យាយាម​ផ្ទុក​ទំព័រ​ឡើង​វិញ។
        </p>
        <p className="font-mono text-[11px] opacity-70 break-all">{message}</p>
      </div>
    </div>
  );
}
