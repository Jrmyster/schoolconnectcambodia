import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Search,
  X as XIcon,
  Globe,
  Building2,
  Users,
  Languages,
  Landmark,
  DollarSign,
  GraduationCap,
  Sparkles,
  PawPrint,
  MapPin,
  BookOpen,
  Compass,
  ScrollText,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import countriesRaw from "@/data/countriesData.json";

/* ──────────────────────────────────────────────────────────────────────
 * THE GLOBAL ATLAS — World Directory
 * សៀវភៅផែនទីពិភពលោក — បញ្ជីប្រទេស
 *
 * Offline-first geographic reference. Reads from a local JSON file
 * (`src/data/countriesData.json`) — no external API. Architecture is
 * designed so additional countries can be pasted into the JSON later
 * without any code change.
 *
 * Aesthetic: prestigious atlas — deep globe blues, crisp white data
 * cards on a topographic-line backdrop, geographic icons.
 * ────────────────────────────────────────────────────────────────────── */

type Continent = "asia" | "europe" | "africa" | "americas" | "oceania";

type Bilingual = { en: string; kh: string };
type LocalizedString = { en: string; kh?: string };

type Country = {
  id: string;
  flag: string;
  continent: Continent;
  name: Bilingual;
  capital: Bilingual;
  population: number;
  spokenLanguages: string[];
  government: Bilingual;
  gdp: string;
  literacyRate: number;
  mainReligion: Bilingual;
  commonWildlife: LocalizedString[];
  famousLandmarks: LocalizedString[];
  funFact: Bilingual;
};

const COUNTRIES: Country[] = countriesRaw as Country[];

const CONTINENTS: {
  id: Continent | "all";
  en: string;
  kh: string;
  emoji: string;
}[] = [
  { id: "all",      en: "All",      kh: "ទាំងអស់",   emoji: "🌐" },
  { id: "asia",     en: "Asia",     kh: "អាស៊ី",     emoji: "🐯" },
  { id: "europe",   en: "Europe",   kh: "អឺរ៉ុប",    emoji: "🏰" },
  { id: "africa",   en: "Africa",   kh: "អាហ្វ្រិក", emoji: "🦒" },
  { id: "americas", en: "Americas", kh: "អាមេរិក",  emoji: "🗽" },
  { id: "oceania",  en: "Oceania",  kh: "អូសេអានី",  emoji: "🏝️" },
];

/* ── Number formatter ────────────────────────────────────────────────── */
function formatPopulation(n: number, kh: boolean): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)} ${kh ? "ពាន់លាន" : "B"}`;
  if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)} ${kh ? "លាន" : "M"}`;
  if (n >= 1_000)         return `${(n / 1_000).toFixed(0)} ${kh ? "ពាន់" : "K"}`;
  return n.toLocaleString();
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Page                                                                  */
/* ────────────────────────────────────────────────────────────────────── */

export default function GlobalAtlas() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState<Continent | "all">("all");
  const [openCountry, setOpenCountry] = useState<Country | null>(null);

  // Counts per continent (memoized).
  const continentCounts = useMemo(() => {
    const m: Record<string, number> = { all: COUNTRIES.length };
    for (const c of COUNTRIES) m[c.continent] = (m[c.continent] ?? 0) + 1;
    return m;
  }, []);

  // Filtered list (memoized).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      if (continent !== "all" && c.continent !== continent) return false;
      if (!q) return true;
      return (
        c.name.en.toLowerCase().includes(q) ||
        c.name.kh.toLowerCase().includes(q) ||
        c.capital.en.toLowerCase().includes(q) ||
        c.capital.kh.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.name.en.localeCompare(b.name.en));
  }, [query, continent]);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-[#06182f] to-slate-950 text-slate-100">
      {/* Topographic line backdrop */}
      <TopoBackdrop />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* ── Back link ─────────────────────────────────────────────── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200/80 hover:text-cyan-100 transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "ត្រឡប់ទំព័រដើម" : "Back to Home"}</span>
          <span className={`text-cyan-200/40 ${kh ? "" : "font-khmer"}`}>
            · {kh ? "Back to Home" : "ត្រឡប់ទំព័រដើម"}
          </span>
        </Link>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <header className="mt-6 sm:mt-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-4 py-1.5 text-xs sm:text-sm font-bold text-cyan-200 backdrop-blur">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>STUDY CENTER · GLOBAL ATLAS</span>
            <span className="font-khmer text-cyan-200/80">· មជ្ឈមណ្ឌលសិក្សា · សៀវភៅផែនទីពិភពលោក</span>
          </div>

          <h1
            className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
            data-testid="page-title"
          >
            <span className="block">
              The Global{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                Atlas
              </span>
              : World Directory
            </span>
            <span className="block font-khmer text-2xl sm:text-3xl md:text-4xl text-cyan-100/85 mt-2 leading-snug">
              សៀវភៅផែនទីពិភពលោក៖ បញ្ជីប្រទេស
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-300">
            {kh
              ? "ប្រទេសពិភពលោកក្នុងសៀវភៅសិក្សាអូហ្វឡាញតែមួយ — ស្វែងរកតាមឈ្មោះ ឬច្រោះតាមទ្វីប រួចចុចលើកាតប្រទេសណាមួយដើម្បីមើលទង់ជាតិ ប្រជាជន រាជធានី ភាសា សាសនា សត្វព្រៃ ស្ថាបត្យកម្ម និងការពិតកម្សាន្ត។"
              : "Every country of the world in one offline study book — search by name or filter by continent, then tap any card to see its flag, population, capital, languages, religion, wildlife, landmarks, and a fun fact."}
          </p>
          <p className={`mt-2 max-w-3xl text-sm text-slate-500 ${kh ? "" : "font-khmer leading-loose"}`}>
            {kh
              ? "Every country of the world in one offline study book."
              : "ប្រទេសពិភពលោកក្នុងសៀវភៅសិក្សាអូហ្វឡាញតែមួយ។"}
          </p>

          {/* View Timeline CTA */}
          <Link
            href="/study-center/world-timeline"
            data-testid="link-world-timeline"
            className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-900 px-5 py-3 font-bold shadow-lg hover:shadow-xl ring-1 ring-amber-300/50 hover:scale-[1.02] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
            aria-label="View Timeline · មើលតារាងពេលវេលា"
          >
            <ScrollText className="w-5 h-5" aria-hidden="true" />
            <span className="text-base sm:text-lg">View Timeline</span>
            <span className="text-amber-900/60">·</span>
            <span className="font-khmer text-base sm:text-lg">មើលតារាងពេលវេលា</span>
            <span aria-hidden="true" className="ml-1">→</span>
          </Link>
          <p className="mt-2 text-xs text-slate-400">
            12,000 years of world history · ១២.០០០ ឆ្នាំនៃប្រវត្តិសាស្ត្រពិភពលោក
          </p>
        </header>

        {/* ── Search bar ───────────────────────────────────────────── */}
        <div className="mt-8 relative max-w-2xl">
          <label htmlFor="atlas-search" className="sr-only">
            Search for a country · ស្វែងរកប្រទេស
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="atlas-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                kh
                  ? "ស្វែងរកប្រទេស... · Search for a country..."
                  : "Search for a country... · ស្វែងរកប្រទេស..."
              }
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-900/70 backdrop-blur border-2 border-cyan-400/30 text-slate-100 placeholder:text-slate-500 text-base sm:text-lg shadow-lg focus:outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20 transition-all"
              data-testid="search-input"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search · សម្អាតការស្វែងរក"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                data-testid="btn-clear-search"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Continent chips ──────────────────────────────────────── */}
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by continent · ច្រោះតាមទ្វីប"
        >
          {CONTINENTS.map((c) => {
            const isActive = continent === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setContinent(c.id)}
                aria-pressed={isActive}
                data-testid={`chip-${c.id}`}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/30 ${
                  isActive
                    ? "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-900/60 border-slate-700 text-slate-200 hover:border-cyan-400/60 hover:text-cyan-100"
                }`}
              >
                <span aria-hidden="true">{c.emoji}</span>
                <span>{c.en}</span>
                <span className={`text-[11px] opacity-80 ${kh ? "" : "font-khmer"}`}>
                  · {c.kh}
                </span>
                <span
                  className={`ml-1 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-white/25 text-white" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {continentCounts[c.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results count ────────────────────────────────────────── */}
        <div className="mt-6 text-sm text-slate-400" data-testid="results-count">
          {kh ? (
            <>
              <span className="font-bold text-cyan-200">{filtered.length}</span>{" "}
              ប្រទេស ត្រូវបានរកឃើញ ·{" "}
              <span className="font-khmer">{filtered.length} countries found</span>
            </>
          ) : (
            <>
              <span className="font-bold text-cyan-200">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "country" : "countries"} found ·{" "}
              <span className="font-khmer">
                {filtered.length} ប្រទេស ត្រូវបានរកឃើញ
              </span>
            </>
          )}
        </div>

        {/* ── Grid of cards ────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div
            className="mt-8 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-10 text-center"
            data-testid="empty-state"
          >
            <Globe className="w-12 h-12 mx-auto text-slate-600 mb-3" aria-hidden="true" />
            <p className="font-bold text-slate-200">
              {kh ? "មិនមានប្រទេសត្រូវនឹងការស្វែងរករបស់អ្នកទេ" : "No countries match your search"}
            </p>
            <p className={`mt-1 text-sm text-slate-400 ${kh ? "" : "font-khmer"}`}>
              {kh ? "No countries match your search" : "មិនមានប្រទេសត្រូវនឹងការស្វែងរករបស់អ្នកទេ"}
            </p>
          </div>
        ) : (
          <div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-testid="country-grid"
          >
            {filtered.map((c) => (
              <CountryCard
                key={c.id}
                country={c}
                kh={kh}
                onOpen={() => setOpenCountry(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ────────────────────────────────────────────────── */}
      {openCountry && (
        <CountryModal
          country={openCountry}
          kh={kh}
          onClose={() => setOpenCountry(null)}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Topographic backdrop                                                  */
/* ────────────────────────────────────────────────────────────────────── */

function TopoBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="topo-pattern"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            {/* Concentric topographic-style ovals */}
            <ellipse cx="110" cy="110" rx="100" ry="62" fill="none" stroke="#67e8f9" strokeWidth="0.6" />
            <ellipse cx="110" cy="110" rx="80"  ry="50" fill="none" stroke="#67e8f9" strokeWidth="0.6" />
            <ellipse cx="110" cy="110" rx="60"  ry="38" fill="none" stroke="#67e8f9" strokeWidth="0.6" />
            <ellipse cx="110" cy="110" rx="40"  ry="26" fill="none" stroke="#67e8f9" strokeWidth="0.6" />
            <ellipse cx="110" cy="110" rx="22"  ry="14" fill="none" stroke="#67e8f9" strokeWidth="0.6" />
            <ellipse cx="110" cy="110" rx="8"   ry="5"  fill="none" stroke="#67e8f9" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Country card (collapsed view)                                         */
/* ────────────────────────────────────────────────────────────────────── */

function CountryCard({
  country,
  kh,
  onOpen,
}: {
  country: Country;
  kh: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid={`card-${country.id}`}
      className="group text-left bg-white text-slate-900 rounded-2xl border border-slate-200 hover:border-cyan-400 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/50"
      aria-label={`${country.name.en} · ${country.name.kh}. Open detailed view · បើកព័ត៌មានលម្អិត`}
    >
      <div className="p-5">
        {/* Flag + name */}
        <div className="flex items-start gap-3">
          <div
            className="text-5xl leading-none drop-shadow-sm select-none"
            aria-hidden="true"
          >
            {country.flag}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-black text-lg leading-tight truncate">
              {country.name.en}
            </h3>
            <p className="font-khmer text-sm text-slate-600 leading-tight truncate">
              {country.name.kh}
            </p>
          </div>
        </div>

        {/* Capital + Population */}
        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 mt-0.5 text-cyan-600 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {kh ? "រាជធានី · Capital" : "Capital · រាជធានី"}
              </dt>
              <dd className="font-semibold text-slate-800 truncate">
                {country.capital.en}
                <span className="font-khmer text-slate-500 ml-1.5 text-xs">
                  · {country.capital.kh}
                </span>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 mt-0.5 text-cyan-600 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {kh ? "ប្រជាជន · Population" : "Population · ប្រជាជន"}
              </dt>
              <dd className="font-mono font-bold text-slate-800">
                {formatPopulation(country.population, kh)}
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="px-5 py-2.5 bg-gradient-to-r from-cyan-50 to-sky-50 border-t border-slate-100 text-xs font-bold text-cyan-700 group-hover:from-cyan-100 group-hover:to-sky-100 transition-colors flex items-center justify-between gap-2">
        <span>Tap to see full profile →</span>
        <span className="font-khmer text-cyan-600/80">ចុចមើលព័ត៌មានលម្អិត</span>
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Country modal (expanded view)                                         */
/* ────────────────────────────────────────────────────────────────────── */

function CountryModal({
  country,
  kh,
  onClose,
}: {
  country: Country;
  kh: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open + handle Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-modal-title country-modal-title-kh"
      data-testid="country-modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        data-testid="modal-backdrop"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-screen sm:max-h-[90vh] overflow-y-auto bg-white text-slate-900 sm:rounded-3xl shadow-2xl border border-cyan-400/40 sm:my-8 mx-0 sm:mx-4">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-cyan-700 via-sky-700 to-blue-800 text-white px-5 sm:px-7 py-4 flex items-center gap-4">
          <div
            className="text-5xl leading-none drop-shadow select-none"
            aria-hidden="true"
          >
            {country.flag}
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="country-modal-title"
              className="font-display font-black text-xl sm:text-2xl leading-tight"
              data-testid="modal-title"
            >
              {country.name.en}
            </h2>
            <p
              id="country-modal-title-kh"
              className="font-khmer text-sm sm:text-base text-cyan-100 leading-tight"
            >
              {country.name.kh}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close · បិទ"
            data-testid="btn-modal-close"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            <XIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 py-6 space-y-5">
          {/* Quick stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FactRow
              icon={Building2}
              labelEn="Capital"
              labelKh="រាជធានី"
              accent="cyan"
            >
              <span className="font-semibold">{country.capital.en}</span>
              <span className="font-khmer text-slate-500 ml-1.5 text-sm">
                · {country.capital.kh}
              </span>
            </FactRow>
            <FactRow
              icon={Users}
              labelEn="Population"
              labelKh="ប្រជាជន"
              accent="sky"
            >
              <span className="font-mono font-bold">
                {formatPopulation(country.population, kh)}
              </span>
              <span className="text-xs text-slate-500 ml-2">
                ({country.population.toLocaleString()})
              </span>
            </FactRow>
            <FactRow
              icon={Landmark}
              labelEn="Government"
              labelKh="របបគ្រប់គ្រង"
              accent="blue"
            >
              <span>{country.government.en}</span>
              <span className="font-khmer block text-sm text-slate-500 mt-0.5">
                {country.government.kh}
              </span>
            </FactRow>
            <FactRow
              icon={DollarSign}
              labelEn="GDP (Nominal)"
              labelKh="ផលិតផលក្នុងស្រុក"
              accent="emerald"
            >
              <span className="font-mono font-bold">{country.gdp}</span>
            </FactRow>
            <FactRow
              icon={GraduationCap}
              labelEn="Literacy Rate"
              labelKh="អត្រាអក្ខរកម្ម"
              accent="violet"
            >
              <span className="font-mono font-bold">{country.literacyRate}%</span>
              <LiteracyBar pct={country.literacyRate} />
            </FactRow>
            <FactRow
              icon={Languages}
              labelEn="Languages"
              labelKh="ភាសា"
              accent="amber"
            >
              <span>{country.spokenLanguages.join(", ")}</span>
            </FactRow>
          </div>

          {/* Religion (full row) */}
          <FactRow
            icon={BookOpen}
            labelEn="Main Religion"
            labelKh="សាសនាសំខាន់"
            accent="rose"
            full
          >
            <span>{country.mainReligion.en}</span>
            <span className="font-khmer block text-sm text-slate-500 mt-0.5">
              {country.mainReligion.kh}
            </span>
          </FactRow>

          {/* Wildlife */}
          <SectionBlock
            icon={PawPrint}
            labelEn="Common Wildlife"
            labelKh="សត្វព្រៃទូទៅ"
            emoji="🐅"
            accent="lime"
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {country.commonWildlife.map((w, i) => (
                <span
                  key={i}
                  className="inline-flex flex-col items-start px-3 py-1.5 rounded-xl bg-lime-50 border border-lime-200 text-sm"
                >
                  <span className="font-semibold text-lime-900">{w.en}</span>
                  {w.kh && (
                    <span className="font-khmer text-xs text-lime-700">{w.kh}</span>
                  )}
                </span>
              ))}
            </div>
          </SectionBlock>

          {/* Famous Landmarks */}
          <SectionBlock
            icon={MapPin}
            labelEn="Famous Landmarks"
            labelKh="ស្ថាបត្យកម្មល្បី"
            emoji="🏛️"
            accent="orange"
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {country.famousLandmarks.map((l, i) => (
                <span
                  key={i}
                  className="inline-flex flex-col items-start px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-sm"
                >
                  <span className="font-semibold text-orange-900">{l.en}</span>
                  {l.kh && (
                    <span className="font-khmer text-xs text-orange-700">{l.kh}</span>
                  )}
                </span>
              ))}
            </div>
          </SectionBlock>

          {/* Fun Fact */}
          <div className="rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-sky-50 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{kh ? "ការពិតកម្សាន្ត · Fun Fact" : "Fun Fact · ការពិតកម្សាន្ត"}</span>
            </div>
            <p className="mt-2 text-slate-800 leading-relaxed">
              {country.funFact.en}
            </p>
            <p className="mt-2 font-khmer text-slate-700 text-sm leading-loose">
              {country.funFact.kh}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Modal sub-components ────────────────────────────────────────────── */

const ACCENTS: Record<
  string,
  { iconBg: string; iconText: string; border: string }
> = {
  cyan:    { iconBg: "bg-cyan-100",    iconText: "text-cyan-700",    border: "border-cyan-200"    },
  sky:     { iconBg: "bg-sky-100",     iconText: "text-sky-700",     border: "border-sky-200"     },
  blue:    { iconBg: "bg-blue-100",    iconText: "text-blue-700",    border: "border-blue-200"    },
  emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-700", border: "border-emerald-200" },
  violet:  { iconBg: "bg-violet-100",  iconText: "text-violet-700",  border: "border-violet-200"  },
  amber:   { iconBg: "bg-amber-100",   iconText: "text-amber-700",   border: "border-amber-200"   },
  rose:    { iconBg: "bg-rose-100",    iconText: "text-rose-700",    border: "border-rose-200"    },
  lime:    { iconBg: "bg-lime-100",    iconText: "text-lime-700",    border: "border-lime-200"    },
  orange:  { iconBg: "bg-orange-100",  iconText: "text-orange-700",  border: "border-orange-200"  },
};

function FactRow({
  icon: Icon,
  labelEn,
  labelKh,
  accent,
  children,
  full = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  accent: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  const a = ACCENTS[accent] ?? ACCENTS.cyan;
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border ${a.border} bg-white p-3 ${full ? "sm:col-span-2" : ""}`}
    >
      <div className={`shrink-0 w-9 h-9 rounded-lg ${a.iconBg} ${a.iconText} flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {labelEn} <span className="font-khmer normal-case tracking-normal text-slate-400">· {labelKh}</span>
        </div>
        <div className="mt-0.5 text-slate-800 break-words">{children}</div>
      </div>
    </div>
  );
}

function SectionBlock({
  icon: Icon,
  labelEn,
  labelKh,
  emoji,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  emoji: string;
  accent: string;
  children: React.ReactNode;
}) {
  const a = ACCENTS[accent] ?? ACCENTS.cyan;
  return (
    <div className={`rounded-2xl border ${a.border} bg-white p-4`}>
      <div className="flex items-center gap-2">
        <div className={`shrink-0 w-9 h-9 rounded-lg ${a.iconBg} ${a.iconText} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-display font-bold text-slate-900 flex items-center gap-2">
            <span aria-hidden="true">{emoji}</span>
            <span>{labelEn}</span>
          </div>
          <div className="font-khmer text-xs text-slate-500">{labelKh}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function LiteracyBar({ pct }: { pct: number }) {
  const safe = Math.max(0, Math.min(100, pct));
  return (
    <div
      className="mt-1.5 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-violet-400 to-violet-600"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}
