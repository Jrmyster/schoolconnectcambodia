import { useEffect, useMemo, useState } from "react";
import {
  ScrollText,
  Search,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  KHMER_BOOKS,
  KHMER_GENRE_LABELS,
  type KhmerBook,
  type KhmerGenreTag,
} from "@/data/khmerLiterature";

// ════════════════════════════════════════════════════════════════════════════
//  KhmerLiteratureSection
//
//  Sister section to FoundationalLibrarySection / ImaginativeWorldsSection.
//  Same search / sort / pagination shell, but tuned for foundational Khmer
//  literature:
//    • bilingual title pair (English transliteration ↔ Khmer original)
//    • bilingual author pair
//    • per-genre color-coded badge (5 distinct palettes)
//    • cover-image slot with stylised glyph fallback
//    • search filters BOTH English and Khmer fields so students can search
//      with either keyboard layout
// ════════════════════════════════════════════════════════════════════════════

type SortKey = "year-asc" | "year-desc" | "author-asc";
const PER_PAGE = 24;

type Props = {
  kh: boolean;
  t: (en: string, kh: string) => string;
};

/**
 * Per-genre color palette. We deliberately give each Khmer literary genre its
 * own palette — these are foundational works and a single colour would erase
 * the distinction between e.g. epic poetry and modern novel.
 */
const GENRE_BADGE: Record<KhmerGenreTag, { bg: string; text: string; ring: string }> = {
  "first-modern-novel": { bg: "bg-amber-100",  text: "text-amber-900",  ring: "ring-amber-200" },
  "classic-romance":    { bg: "bg-rose-100",   text: "text-rose-900",   ring: "ring-rose-200" },
  "epic-poetry":        { bg: "bg-purple-100", text: "text-purple-900", ring: "ring-purple-200" },
  "historical-fiction": { bg: "bg-teal-100",   text: "text-teal-900",   ring: "ring-teal-200" },
  "traditional-poetry": { bg: "bg-orange-100", text: "text-orange-900", ring: "ring-orange-200" },
};

export function KhmerLiteratureSection({ kh, t }: Props) {
  const allBooks = KHMER_BOOKS;

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("year-asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = allBooks;
    if (q) {
      base = base.filter((b) => {
        const genre = KHMER_GENRE_LABELS[b.genreTag];
        return (
          b.titleEn.toLowerCase().includes(q) ||
          b.titleKh.includes(q) ||                // Khmer is case-insensitive by codepoint
          b.authorEn.toLowerCase().includes(q) ||
          b.authorKh.includes(q) ||
          genre.en.toLowerCase().includes(q) ||
          genre.kh.includes(q)
        );
      });
    }
    const sorted = [...base];
    if (sortKey === "year-asc") sorted.sort((a, b) => a.year - b.year || a.titleEn.localeCompare(b.titleEn));
    else if (sortKey === "year-desc") sorted.sort((a, b) => b.year - a.year || a.titleEn.localeCompare(b.titleEn));
    else sorted.sort((a, b) => a.authorEn.localeCompare(b.authorEn) || a.titleEn.localeCompare(b.titleEn));
    return sorted;
  }, [allBooks, query, sortKey]);

  useEffect(() => {
    setPage(1);
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <section
      data-testid="khmer-literature-section"
      className="rounded-3xl border border-amber-300/40 bg-gradient-to-br from-white to-amber-50 shadow-sm overflow-hidden"
    >
      {/* ── Header ── */}
      <header className="px-5 sm:px-7 py-5 border-b border-amber-200/50 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center shadow-md">
          <ScrollText className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className={`font-bold text-lg sm:text-xl text-foreground leading-tight ${kh ? "font-khmer" : "font-display"}`}>
            {t("Khmer Literature", "អក្សរសិល្ប៍ខ្មែរ")}
          </h2>
          <p className={`text-xs text-muted-foreground mt-0.5 ${kh ? "font-khmer" : ""}`}>
            {t(
              `${allBooks.length} foundational Cambodian works`,
              `ស្នាដៃខ្មែរគ្រឹះ ${allBooks.length} ច្បាប់`,
            )}
          </p>
        </div>
      </header>

      {/* ── Toolbar: search + sort ── */}
      <div className="px-5 sm:px-7 py-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "Search by title, author, or genre…",
              "ស្វែងរកតាមឈ្មោះ អ្នកនិពន្ធ ឬប្រភេទ…",
            )}
            data-testid="khmer-search-input"
            aria-label={t("Search Khmer literature", "ស្វែងរកអក្សរសិល្ប៍ខ្មែរ")}
            className={`w-full rounded-xl border border-border bg-white pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition ${kh ? "font-khmer" : ""}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label={t("Clear search", "សម្អាត")}
              data-testid="khmer-clear-search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative sm:w-64">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            data-testid="khmer-sort-select"
            aria-label={t("Sort Khmer literature", "តម្រៀបអក្សរសិល្ប៍ខ្មែរ")}
            className={`w-full appearance-none rounded-xl border border-border bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition ${kh ? "font-khmer" : ""}`}
          >
            <option value="year-asc">{t("Oldest → Newest", "ចាស់ → ថ្មី")}</option>
            <option value="year-desc">{t("Newest → Oldest", "ថ្មី → ចាស់")}</option>
            <option value="author-asc">{t("Author A → Z", "អ្នកនិពន្ធ A → Z")}</option>
          </select>
        </div>
      </div>

      {/* ── Result count ── */}
      <div className="px-5 sm:px-7 pb-2 flex items-center justify-between">
        <p className={`text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`} aria-live="polite">
          {filtered.length === allBooks.length
            ? t(`Showing all ${filtered.length} works`, `កំពុងបង្ហាញស្នាដៃទាំង ${filtered.length} ច្បាប់`)
            : t(
                `Showing ${filtered.length} of ${allBooks.length} works`,
                `កំពុងបង្ហាញ ${filtered.length} ក្នុងចំណោម ${allBooks.length} ច្បាប់`,
              )}
        </p>
        {totalPages > 1 && (
          <p className={`text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
            {t(`Page ${pageSafe} of ${totalPages}`, `ទំព័រ ${pageSafe} ក្នុងចំណោម ${totalPages}`)}
          </p>
        )}
      </div>

      {/* ── Grid of book cards ── */}
      <div className="px-5 sm:px-7 pb-5">
        {visible.length === 0 ? (
          <div className="py-14 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30 text-muted-foreground" aria-hidden="true" />
            <p className={`text-sm font-semibold text-muted-foreground ${kh ? "font-khmer" : ""}`}>
              {t("No works match your search.", "គ្មានស្នាដៃណាត្រូវនឹងការស្វែងរករបស់អ្នកទេ។")}
            </p>
          </div>
        ) : (
          <ul
            data-testid="khmer-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {visible.map((book) => (
              <KhmerCard key={`${book.titleEn}-${book.authorEn}`} book={book} kh={kh} t={t} />
            ))}
          </ul>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <nav
          className="px-5 sm:px-7 pb-5 flex items-center justify-center gap-2"
          aria-label={t("Library pagination", "ការបែងចែកទំព័របណ្ណាល័យ")}
          data-testid="khmer-pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-amber-600 hover:text-amber-700 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            aria-label={t("Previous page", "ទំព័រមុន")}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className={`hidden sm:inline ${kh ? "font-khmer" : ""}`}>{t("Prev", "មុន")}</span>
          </button>
          <span className={`text-sm font-semibold text-foreground tabular-nums px-2 ${kh ? "font-khmer" : ""}`}>
            {pageSafe} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe === totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-amber-600 hover:text-amber-700 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            aria-label={t("Next page", "ទំព័របន្ទាប់")}
          >
            <span className={`hidden sm:inline ${kh ? "font-khmer" : ""}`}>{t("Next", "បន្ទាប់")}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </section>
  );
}

// ─── Single Khmer-literature card ──────────────────────────────────────────

function KhmerCard({
  book,
  kh,
  t,
}: {
  book: KhmerBook;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const badge = GENRE_BADGE[book.genreTag];
  const label = KHMER_GENRE_LABELS[book.genreTag];

  return (
    <li
      data-testid="khmer-book-card"
      className="group relative flex gap-3 rounded-xl border border-amber-200/40 bg-white p-3 hover:border-amber-400/70 hover:shadow-md transition-all"
    >
      {/* Cover image — stylised glyph fallback when no URL */}
      {book.coverImageUrl ? (
        <img
          src={book.coverImageUrl}
          alt={t(`Cover of ${book.titleEn}`, `គម្របសៀវភៅ ${book.titleKh}`)}
          className="flex-shrink-0 w-12 h-16 rounded-lg object-cover bg-amber-100"
          loading="lazy"
        />
      ) : (
        <div
          className="flex-shrink-0 w-12 h-16 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 flex items-center justify-center group-hover:from-amber-600 group-hover:to-orange-700 group-hover:text-white transition-colors"
          aria-hidden="true"
          data-testid="khmer-cover-placeholder"
        >
          <ScrollText className="w-5 h-5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* ── Bilingual genre badge ── */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            data-testid={`khmer-genre-badge-${book.genreTag}`}
            className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 ring-1 ${badge.bg} ${badge.text} ${badge.ring}`}
            aria-label={t(`Genre: ${label.en}`, `ប្រភេទ៖ ${label.kh}`)}
          >
            <span>{label.en}</span>
            <span className="opacity-50">/</span>
            <span className="font-khmer">{label.kh}</span>
          </span>
        </div>

        {/* ── Bilingual title (always paired — these works are inseparable
             from their original Khmer titles, regardless of UI language) ── */}
        <p className="text-sm font-semibold text-foreground leading-snug break-words">
          {book.titleEn}
        </p>
        <p className="font-khmer text-sm font-semibold text-foreground/90 leading-snug break-words">
          {book.titleKh}
        </p>

        {/* ── Bilingual author ── */}
        <p className="text-xs mt-1 text-muted-foreground break-words">
          {book.authorEn}
          <span className="opacity-50 mx-1">·</span>
          <span className="font-khmer">{book.authorKh}</span>
          {book.year > 0 && (
            <>
              <span className="opacity-50 mx-1">·</span>
              <span className="tabular-nums">{book.year}</span>
            </>
          )}
        </p>

        {/* ── Blurb — follows the global language toggle for prose ── */}
        <p className={`text-[11px] mt-1 text-muted-foreground/90 leading-snug ${kh ? "font-khmer" : ""}`}>
          {kh ? book.blurbKh : book.blurbEn}
        </p>
      </div>
    </li>
  );
}
