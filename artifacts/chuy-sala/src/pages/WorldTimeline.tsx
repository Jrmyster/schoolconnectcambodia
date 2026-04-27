import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ScrollText,
  Filter as FilterIcon,
  Link2,
  ChevronUp,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import timelineRaw from "@/data/timelineData.json";

/* ──────────────────────────────────────────────────────────────────────
 * THE WORLD TIMELINE — History & Progress
 * តារាងពេលវេលាពិភពលោក — ប្រវត្តិសាស្ត្រ និងវឌ្ឍនភាព
 *
 * Offline-first historical reference. Reads from a local JSON file
 * (`src/data/timelineData.json`). Architecture: data-driven so new
 * milestones can be added by editing JSON only, no code changes.
 *
 * Aesthetic: parchment/sepia background, navy and deep gold accents,
 * a vertical scrolling thread with cards alternating left/right.
 * Cards fade in on scroll. "Connected To" buttons jump between
 * cause-and-effect events with a brief highlight pulse.
 * ────────────────────────────────────────────────────────────────────── */

type Region = "global" | "asia" | "europe" | "africa" | "americas" | "oceania";
type Era =
  | "ancient"
  | "classical"
  | "medieval"
  | "early-modern"
  | "industrial"
  | "modern"
  | "contemporary";

type Bilingual = { en: string; kh: string };

type Event = {
  id: string;
  year: number;
  yearLabel: Bilingual;
  era: Era;
  region: Region;
  icon: string;
  headline: Bilingual;
  description: Bilingual;
  connectedTo?: string[];
};

const EVENTS: Event[] = (timelineRaw as Event[])
  .slice()
  .sort((a, b) => a.year - b.year);

const REGIONS: { id: Region | "all"; en: string; kh: string; emoji: string }[] = [
  { id: "all",      en: "All",      kh: "ទាំងអស់",   emoji: "🌐" },
  { id: "global",   en: "Global",   kh: "សាកល",     emoji: "🌍" },
  { id: "asia",     en: "Asia",     kh: "អាស៊ី",     emoji: "🐯" },
  { id: "europe",   en: "Europe",   kh: "អឺរ៉ុប",    emoji: "🏰" },
  { id: "africa",   en: "Africa",   kh: "អាហ្វ្រិក", emoji: "🦒" },
  { id: "americas", en: "Americas", kh: "អាមេរិក",  emoji: "🗽" },
  { id: "oceania",  en: "Oceania",  kh: "អូសេអានី",  emoji: "🏝️" },
];

const ERAS: { id: Era | "all"; en: string; kh: string }[] = [
  { id: "all",          en: "All Eras",     kh: "សម័យទាំងអស់" },
  { id: "ancient",      en: "Ancient",      kh: "បុរាណ" },
  { id: "classical",    en: "Classical",    kh: "បុរាណបុរាណ" },
  { id: "medieval",     en: "Medieval",     kh: "មជ្ឈិមសម័យ" },
  { id: "early-modern", en: "Early Modern", kh: "ទំនើបដំបូង" },
  { id: "industrial",   en: "Industrial",   kh: "ឧស្សាហកម្ម" },
  { id: "modern",       en: "Modern",       kh: "ទំនើប" },
  { id: "contemporary", en: "Contemporary", kh: "សម័យបច្ចុប្បន្ន" },
];

/* ── Page component ──────────────────────────────────────────────── */
export default function WorldTimeline() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [region, setRegion] = useState<Region | "all">("all");
  const [era, setEra] = useState<Era | "all">("all");

  const filtered = useMemo(() => {
    return EVENTS.filter(
      (ev) =>
        (region === "all" || ev.region === region) &&
        (era === "all" || ev.era === era),
    );
  }, [region, era]);

  /* Scroll-into-view + transient highlight for "Connected To" jumps */
  const [pulseId, setPulseId] = useState<string | null>(null);
  const jumpTo = (id: string) => {
    const el = document.getElementById(`event-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setPulseId(id);
    window.setTimeout(() => setPulseId((p) => (p === id ? null : p)), 1800);
  };

  /* "Back to top" button visibility */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#f5ecd7] text-stone-900 relative overflow-hidden"
      data-testid="page-world-timeline"
    >
      {/* Parchment paper backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(180,140,80,0.12) 0%, transparent 55%)," +
            "radial-gradient(circle at 80% 75%, rgba(120,90,40,0.10) 0%, transparent 60%)," +
            "repeating-linear-gradient(0deg, rgba(120,90,40,0.04) 0 1px, transparent 1px 6px)",
        }}
      />
      {/* Subtle inner vignette */}
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(60,40,15,0.18)]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Back link */}
        <Link
          href="/study-center/global-atlas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:text-amber-700 transition-colors group"
          data-testid="link-back-atlas"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Global Atlas</span>
          <span className="text-amber-900/40">·</span>
          <span className="font-khmer">ត្រឡប់ទៅសៀវភៅផែនទីពិភពលោក</span>
        </Link>

        {/* Hero */}
        <header className="mt-6 sm:mt-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/10 border border-amber-900/30 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-900 backdrop-blur">
            <ScrollText className="w-4 h-4" aria-hidden="true" />
            <span>STUDY CENTER · WORLD TIMELINE</span>
            <span className="font-khmer text-amber-900/80">· មជ្ឈមណ្ឌលសិក្សា · តារាងពេលវេលាពិភពលោក</span>
          </div>

          <h1
            className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-stone-900"
            data-testid="page-title"
          >
            <span className="block">
              The World{" "}
              <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700 bg-clip-text text-transparent">
                Timeline
              </span>
              : History &amp; Progress
            </span>
            <span className="block font-khmer text-2xl sm:text-3xl md:text-4xl text-amber-900/85 mt-2 leading-snug">
              តារាងពេលវេលាពិភពលោក៖ ប្រវត្តិសាស្ត្រ និងវឌ្ឍនភាព
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base sm:text-lg text-stone-700">
            From the first farms to the smartphone era — twelve thousand years
            of human progress on a single scrolling thread. Filter by region or
            era, and follow the cause-and-effect lines that link one revolution
            to the next.
          </p>
          <p className="mt-2 max-w-3xl font-khmer text-base sm:text-lg text-stone-700/85 leading-loose">
            ពីកសិដ្ឋានដំបូងរហូតដល់សម័យស្មាតហ្វូន — ដប់ពីរពាន់ឆ្នាំនៃវឌ្ឍនភាពមនុស្សជាតិលើខ្សែស្រឡាយរំកិលតែមួយ។ ច្រោះតាមតំបន់ ឬសម័យកាល រួចតាមដានខ្សែបណ្តាល-លទ្ធផលដែលភ្ជាប់បដិវត្តន៍មួយទៅមួយ។
          </p>
        </header>

        {/* Sticky filter bar */}
        <div
          className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mt-8 px-4 sm:px-6 lg:px-8 py-3 bg-[#f5ecd7]/95 backdrop-blur-md border-y border-amber-900/15 shadow-sm"
          data-testid="filter-bar"
        >
          <div className="flex items-start gap-3 mb-2">
            <FilterIcon className="w-4 h-4 text-amber-900 mt-0.5 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Filter · ច្រោះ
            </span>
          </div>

          {/* Region chips */}
          <div
            className="flex flex-wrap gap-2 mb-2"
            role="group"
            aria-label="Filter by region · ច្រោះតាមតំបន់"
          >
            {REGIONS.map((r) => {
              const active = region === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegion(r.id)}
                  data-testid={`chip-region-${r.id}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    active
                      ? "bg-amber-800 text-amber-50 border-amber-800 shadow"
                      : "bg-white/60 text-stone-800 border-amber-900/25 hover:bg-amber-100/80"
                  }`}
                  aria-pressed={active}
                >
                  <span aria-hidden="true">{r.emoji}</span>
                  <span>{r.en}</span>
                  <span className={`font-khmer ${active ? "text-amber-100/85" : "text-stone-600/80"}`}>
                    · {r.kh}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Era chips */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by era · ច្រោះតាមសម័យ"
          >
            {ERAS.map((e) => {
              const active = era === e.id;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEra(e.id)}
                  data-testid={`chip-era-${e.id}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    active
                      ? "bg-stone-900 text-amber-50 border-stone-900 shadow"
                      : "bg-white/60 text-stone-700 border-stone-700/25 hover:bg-stone-200/80"
                  }`}
                  aria-pressed={active}
                >
                  <span>{e.en}</span>
                  <span className={`font-khmer ${active ? "text-amber-100/80" : "text-stone-600/80"}`}>
                    · {e.kh}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <p
          className="mt-6 text-sm text-stone-700"
          data-testid="results-count"
          aria-live="polite"
        >
          <span className="font-bold text-amber-900">{filtered.length}</span>{" "}
          milestones · <span className="font-khmer">{filtered.length} ព្រឹត្តិការណ៍សំខាន់</span>
        </p>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div
            className="mt-10 rounded-2xl border-2 border-dashed border-amber-900/25 bg-white/60 p-10 text-center"
            data-testid="empty-state"
          >
            <p className="text-lg font-semibold text-stone-800">
              No events match these filters.
            </p>
            <p className="mt-1 font-khmer text-stone-700">
              គ្មានព្រឹត្តិការណ៍ត្រូវនឹងតម្រងទាំងនេះទេ។
            </p>
          </div>
        ) : (
          <div
            className="relative mt-10 pb-20"
            data-testid="timeline-thread"
          >
            {/* Center line (gold/navy gradient) */}
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-700 via-amber-600 to-stone-800 shadow-[0_0_8px_rgba(180,120,40,0.35)]"
            />

            <ol className="relative space-y-10 sm:space-y-14">
              {filtered.map((ev, i) => (
                <TimelineItem
                  key={ev.id}
                  event={ev}
                  side={i % 2 === 0 ? "left" : "right"}
                  kh={kh}
                  pulse={pulseId === ev.id}
                  onJump={jumpTo}
                  allEvents={EVENTS}
                />
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top · ត្រឡប់ទៅខាងលើ"
          data-testid="btn-back-to-top"
          className="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-amber-50 shadow-lg hover:bg-amber-900 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
        >
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </main>
  );
}

/* ── Single timeline event card ──────────────────────────────────── */
function TimelineItem({
  event,
  side,
  kh,
  pulse,
  onJump,
  allEvents,
}: {
  event: Event;
  side: "left" | "right";
  kh: boolean;
  pulse: boolean;
  onJump: (id: string) => void;
  allEvents: Event[];
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  /* Default to visible so the page renders even if JavaScript fails to
     load (no-JS / SSR safety). Once mounted on a JS-capable client, we
     immediately hide via useLayoutEffect (before paint, so no flash) and
     then let IntersectionObserver fade each card in on scroll. */
  const [animEnabled, setAnimEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    setAnimEnabled(true);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!animEnabled) return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [animEnabled]);

  const connections = (event.connectedTo ?? [])
    .map((id) => allEvents.find((e) => e.id === id))
    .filter((e): e is Event => Boolean(e));

  return (
    <li
      ref={ref}
      id={`event-${event.id}`}
      data-testid={`event-${event.id}`}
      className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
        side === "right" ? "sm:flex-row-reverse" : ""
      }`}
    >
      {/* Dot on the line */}
      <span
        aria-hidden="true"
        className={`absolute left-6 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#f5ecd7] bg-gradient-to-br from-amber-600 to-amber-800 text-xl shadow-md ${
          pulse ? "animate-ping-slow" : ""
        }`}
      >
        {event.icon}
      </span>

      {/* Spacer for the half opposite the card on desktop */}
      <div className="hidden sm:block sm:w-1/2" aria-hidden="true" />

      {/* Card */}
      <article
        className={`mt-4 sm:mt-0 ml-16 sm:ml-0 sm:w-1/2 ${
          side === "left" ? "sm:pr-12" : "sm:pl-12"
        }`}
      >
        <div
          className={`relative bg-gradient-to-br from-[#fdf6e3] to-[#f1e3c0] border border-amber-900/25 rounded-xl shadow-md p-5 sm:p-6 transition-all duration-700 ease-out ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          } ${pulse ? "ring-4 ring-amber-500/60 shadow-2xl" : ""}`}
        >
          {/* Year banner */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-amber-100 px-3 py-1 text-xs font-black tracking-wider uppercase shadow">
              <span>{event.yearLabel.en}</span>
              <span className="text-amber-300/70">·</span>
              <span className="font-khmer">{event.yearLabel.kh}</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/70 flex items-center gap-1.5 flex-wrap">
              <span>{eraLabelEn(event.era)}</span>
              <span className="text-amber-900/40">·</span>
              <span className="font-khmer normal-case tracking-normal">{eraLabelKh(event.era)}</span>
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl leading-tight text-stone-900">
            {event.headline.en}
          </h2>
          <p className="font-khmer text-base sm:text-lg leading-snug text-amber-900/90 mt-1">
            {event.headline.kh}
          </p>

          <div className="mt-3 space-y-2">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {event.description.en}
            </p>
            <p className="font-khmer text-sm sm:text-base text-stone-700/90 leading-loose">
              {event.description.kh}
            </p>
          </div>

          {/* Region tag */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/10 border border-amber-900/20 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              {regionLabelEn(event.region)}
              <span className="text-amber-900/50">·</span>
              <span className="font-khmer">{regionLabelKh(event.region)}</span>
            </span>
          </div>

          {/* Connected To */}
          {connections.length > 0 && (
            <div
              className="mt-4 pt-4 border-t border-amber-900/20"
              data-testid={`connected-${event.id}`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Connected To</span>
                <span className="font-khmer text-amber-900/80">· ភ្ជាប់ទៅ</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {connections.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onJump(c.id)}
                    data-testid={`btn-connected-${event.id}-${c.id}`}
                    aria-label={`Jump to ${c.headline.en} · លោតទៅ ${c.headline.kh}`}
                    className="group inline-flex items-center gap-1.5 rounded-lg bg-stone-900 hover:bg-amber-900 text-amber-50 px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <span aria-hidden="true">{c.icon}</span>
                    <span>{c.headline.en}</span>
                    <span className="text-amber-200/70">·</span>
                    <span className="font-khmer">{c.headline.kh}</span>
                    <span aria-hidden="true" className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

/* ── Region label helpers ────────────────────────────────────────── */
function regionLabelEn(r: Region): string {
  switch (r) {
    case "global":   return "Global";
    case "asia":     return "Asia";
    case "europe":   return "Europe";
    case "africa":   return "Africa";
    case "americas": return "Americas";
    case "oceania":  return "Oceania";
  }
}
function regionLabelKh(r: Region): string {
  switch (r) {
    case "global":   return "សាកល";
    case "asia":     return "អាស៊ី";
    case "europe":   return "អឺរ៉ុប";
    case "africa":   return "អាហ្វ្រិក";
    case "americas": return "អាមេរិក";
    case "oceania":  return "អូសេអានី";
  }
}

function eraLabelEn(e: Era): string {
  switch (e) {
    case "ancient":      return "Ancient";
    case "classical":    return "Classical";
    case "medieval":     return "Medieval";
    case "early-modern": return "Early Modern";
    case "industrial":   return "Industrial";
    case "modern":       return "Modern";
    case "contemporary": return "Contemporary";
  }
}
function eraLabelKh(e: Era): string {
  switch (e) {
    case "ancient":      return "បុរាណ";
    case "classical":    return "បុរាណបុរាណ";
    case "medieval":     return "មជ្ឈិមសម័យ";
    case "early-modern": return "ទំនើបដំបូង";
    case "industrial":   return "ឧស្សាហកម្ម";
    case "modern":       return "ទំនើប";
    case "contemporary": return "សម័យបច្ចុប្បន្ន";
  }
}
