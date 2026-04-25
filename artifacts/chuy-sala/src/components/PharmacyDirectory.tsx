import { useMemo, useState } from "react";
import { Search, Globe, MapPin, GraduationCap, Award, ExternalLink, Building2 } from "lucide-react";
import {
  CAMBODIA_SCHOOLS,
  GLOBAL_SCHOOLS,
  type PharmacySchool,
} from "@/data/pharmacySchoolsData";

// ════════════════════════════════════════════════════════════════════════════
//  PharmacyDirectory — §3 of the Pharmacology page
//  ផ្លូវឆ្ពោះទៅមុខ៖ សាលាឱសថសាស្ត្រ
//
//  A tabbed, searchable directory of pharmacy schools.
//    Tab 1: Study in Cambodia (4 schools, default)
//    Tab 2: Global Top 30 (curated)
//
//  Bilingual EN/KH throughout. The colour palette matches the parent
//  PharmacologyPage (medical sky blues + sterile emerald greens on a
//  near-white clinical background).
// ════════════════════════════════════════════════════════════════════════════

const MED_BLUE_DARK = "#0c4a6e";
const MED_BLUE = "#0284c7";
const MED_BLUE_LIGHT = "#e0f2fe";
const STERILE_GREEN_DARK = "#047857";
const STERILE_GREEN = "#10b981";
const STERILE_GREEN_LIGHT = "#d1fae5";

type TabKey = "Cambodia" | "Global";

export default function PharmacyDirectory() {
  const [tab, setTab] = useState<TabKey>("Cambodia");
  const [query, setQuery] = useState("");

  const sourceList = tab === "Cambodia" ? CAMBODIA_SCHOOLS : GLOBAL_SCHOOLS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sourceList;
    return sourceList.filter((s) => {
      const haystack = [
        s.nameEn,
        s.nameKh,
        s.shortEn ?? "",
        s.locationEn,
        s.locationKh,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [sourceList, query]);

  return (
    <section
      className="mb-10"
      aria-labelledby="sec-pharmacy-directory"
      data-testid="pharmacy-directory"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap
          className="w-5 h-5"
          style={{ color: STERILE_GREEN_DARK }}
          aria-hidden
        />
        <h2
          id="sec-pharmacy-directory"
          className="font-display text-xl sm:text-2xl font-bold text-emerald-950"
          data-testid="pharmacy-directory-title"
        >
          §3 · The Pathway: Pharmacy Schools
        </h2>
      </div>
      <p className="font-khmer text-base text-emerald-900/85 leading-loose mb-5">
        §៣ · ផ្លូវឆ្ពោះទៅមុខ៖ សាលាឱសថសាស្ត្រ
      </p>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-2">
        Whether you study at home or apply abroad, the pharmacy classroom is
        your first laboratory. Below are four respected programmes inside
        Cambodia, and a curated global Top 30 informed by the QS Pharmacy &
        Pharmacology rankings — searchable and chosen with realistic ASEAN
        access in mind. A few entries (Harvard, Oxford, Cambridge, Johns
        Hopkins) are giants of pharmacology research more than of bachelor
        pharmacy degrees; their drug-discovery science still shapes the
        whole field.
      </p>
      <p className="font-khmer text-sm sm:text-base text-emerald-900/85 leading-loose mb-5">
        ទោះបីជាអ្នកសិក្សានៅក្នុងស្រុក ឬដាក់ពាក្យទៅបរទេស ថ្នាក់រៀនឱសថសាស្ត្រ
        គឺជាមន្ទីរពិសោធន៍ដំបូងរបស់អ្នក។ ខាងក្រោមនេះគឺជាកម្មវិធីដែលគួរឱ្យគោរពចំនួនបួននៅក្នុងប្រទេសកម្ពុជា
        និងបញ្ជីសកលកំពូលទាំង ៣០ ដែលបានយកគំរូតាមចំណាត់ថ្នាក់ឱសថ និងឱសថសាស្ត្រ QS — អាចស្វែងរក
        និងបានជ្រើសរើសដោយគិតពីលទ្ធភាពចូលរៀនសមហេតុផលនៅក្នុងតំបន់អាស៊ាន។ អង្គការមួយចំនួន
        (ហាវ៉ាដ អុកហ្វត ខេមប្រ៊ីដ ចនហបឃិនស៍) ខ្លាំងផ្នែកស្រាវជ្រាវឱសថសាស្ត្រច្រើនជាងការផ្ដល់សញ្ញាបត្របរិញ្ញាបត្រឱសថ ប៉ុន្តែវិទ្យាសាស្ត្ររកឃើញថ្នាំរបស់ពួកគេនៅតែរៀបចំទិសដៅទាំងមូលនៃវិស័យនេះ។
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          aria-hidden
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search universities (name or country) · ស្វែងរកសាកលវិទ្យាល័យ"
          aria-label="Search pharmacy universities"
          data-testid="pharmacy-directory-search"
          className="w-full rounded-xl border-2 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2"
          style={{
            borderColor: MED_BLUE_LIGHT,
            // @ts-expect-error css var
            "--tw-ring-color": MED_BLUE,
          }}
        />
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Pharmacy schools directory tabs"
        className="grid grid-cols-2 gap-2 mb-5 p-1 rounded-xl"
        style={{ backgroundColor: MED_BLUE_LIGHT }}
      >
        <TabButton
          active={tab === "Cambodia"}
          onClick={() => setTab("Cambodia")}
          labelEn="Study in Cambodia"
          labelKh="សិក្សានៅកម្ពុជា"
          count={CAMBODIA_SCHOOLS.length}
          testId="pharmacy-directory-tab-cambodia"
        />
        <TabButton
          active={tab === "Global"}
          onClick={() => setTab("Global")}
          labelEn="Global Top 30"
          labelKh="កំពូលទាំង ៣០ លើពិភពលោក"
          count={GLOBAL_SCHOOLS.length}
          testId="pharmacy-directory-tab-global"
        />
      </div>

      {/* Result count */}
      <div
        className="flex items-center justify-between text-xs text-slate-500 mb-3"
        data-testid="pharmacy-directory-count"
      >
        <span>
          {filtered.length} of {sourceList.length}{" "}
          {tab === "Cambodia" ? "Cambodian" : "global"} schools
        </span>
        <span className="font-khmer">
          {filtered.length} ក្នុងចំណោម {sourceList.length}{" "}
          {tab === "Cambodia" ? "សាលាក្នុងស្រុក" : "សាលាសកល"}
        </span>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl border-2 border-dashed p-8 text-center text-slate-500"
          style={{ borderColor: MED_BLUE_LIGHT }}
          data-testid="pharmacy-directory-empty"
        >
          <p className="text-sm">
            No schools match "<span className="font-semibold">{query}</span>".
          </p>
          <p className="font-khmer text-sm leading-loose mt-1">
            មិនមានសាលាណាដែលត្រូវនឹង «{query}» ទេ។
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Tab button ─────────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  labelEn,
  labelKh,
  count,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  labelEn: string;
  labelKh: string;
  count: number;
  testId: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      data-testid={testId}
      className="rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors text-left sm:text-center"
      style={{
        backgroundColor: active ? "white" : "transparent",
        color: active ? MED_BLUE_DARK : "#475569",
        boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined,
      }}
    >
      <div className="flex items-center justify-between sm:justify-center gap-2">
        <span>{labelEn}</span>
        <span
          className="inline-flex items-center justify-center min-w-5 h-5 rounded-full text-[10px] font-bold px-1.5"
          style={{
            backgroundColor: active ? MED_BLUE : "#cbd5e1",
            color: "white",
          }}
        >
          {count}
        </span>
      </div>
      <div className="font-khmer text-xs mt-0.5 leading-loose opacity-90">
        {labelKh}
      </div>
    </button>
  );
}

// ── School card ────────────────────────────────────────────────────────────

function SchoolCard({ school }: { school: PharmacySchool }) {
  const isCambodia = school.type === "Cambodia";
  const accent = isCambodia ? STERILE_GREEN_DARK : MED_BLUE_DARK;
  const accentSoft = isCambodia ? STERILE_GREEN_LIGHT : MED_BLUE_LIGHT;

  return (
    <article
      className="rounded-xl border-2 bg-white p-4 flex flex-col h-full"
      style={{ borderColor: accentSoft }}
      data-testid={`pharmacy-school-card-${school.id}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-2 mb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: accentSoft, color: accent }}
        >
          {isCambodia ? (
            <CambodiaFlagIcon className="w-5 h-5" aria-hidden />
          ) : (
            <Globe className="w-5 h-5" aria-hidden />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-base leading-tight"
            style={{ color: accent }}
          >
            {school.nameEn}
            {school.shortEn && school.shortEn !== school.nameEn && (
              <span className="text-xs font-normal text-slate-500 ml-1.5">
                ({school.shortEn})
              </span>
            )}
          </h3>
          <p className="font-khmer text-sm leading-loose text-emerald-950 mt-0.5">
            {school.nameKh}
          </p>
        </div>
        {school.rank && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold flex-shrink-0"
            style={{ backgroundColor: accent, color: "white" }}
            title={`Global Top 30 · Rank #${school.rank}`}
          >
            <Award className="w-3 h-3" aria-hidden />
            #{school.rank}
          </span>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2 flex-wrap">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
        <span>{school.locationEn}</span>
        <span className="text-slate-300">·</span>
        <span className="font-khmer leading-loose">{school.locationKh}</span>
      </div>

      {/* Blurb */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
        {school.blurbEn}
      </p>
      <p className="font-khmer text-xs sm:text-sm text-emerald-900/85 leading-loose mb-3 flex-1">
        {school.blurbKh}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ backgroundColor: accentSoft, color: accent }}
        >
          <Building2 className="w-3 h-3" aria-hidden />
          {isCambodia ? "Cambodia · កម្ពុជា" : "Global · សកល"}
        </span>
        {school.website && (
          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline"
            style={{ color: accent }}
            aria-label={`Visit ${school.nameEn} website`}
          >
            <span>Visit</span>
            <span className="font-khmer leading-loose">· ចូលមើល</span>
            <ExternalLink className="w-3 h-3" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

// ── Tiny inline Cambodia flag (3 horizontal stripes: blue / red / blue) ─────

function CambodiaFlagIcon({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 16" className={className} {...rest}>
      <rect x="0" y="0" width="24" height="4" fill="#032ea1" />
      <rect x="0" y="4" width="24" height="8" fill="#e00025" />
      <rect x="0" y="12" width="24" height="4" fill="#032ea1" />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="15"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
