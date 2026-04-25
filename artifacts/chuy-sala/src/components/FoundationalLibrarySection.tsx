import { useMemo, useState, useEffect } from "react";
import {
  Library,
  Search,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { FOUNDATIONAL_BOOKS, type FoundationalBook } from "@/data/foundationalLibrary";

// ════════════════════════════════════════════════════════════════════════════
//  FoundationalLibrarySection
//
//  Curated starter library for students — 200+ books from 1872 to 2016.
//  Static data, client-side search/sort/pagination. Pagination is used over
//  virtualization because the per-page slice (24 items) is small and keeps
//  the DOM trivial on older Android devices.
// ════════════════════════════════════════════════════════════════════════════

type SortKey = "year-asc" | "year-desc" | "author-asc";
const PER_PAGE = 24;

type Props = {
  kh: boolean;
  t: (en: string, kh: string) => string;
};

export function FoundationalLibrarySection({ kh, t }: Props) {
  // Source list is canonical and pre-deduped at the data layer.
  const allBooks = FOUNDATIONAL_BOOKS;

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("year-asc");
  const [page, setPage] = useState(1);

  // Year-range stats for the header subtitle (derived once)
  const stats = useMemo(() => {
    const years = allBooks.map((b) => b.year).filter(Boolean);
    return {
      count: allBooks.length,
      minYear: years.length ? Math.min(...years) : 0,
      maxYear: years.length ? Math.max(...years) : 0,
    };
  }, [allBooks]);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? allBooks.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q),
        )
      : allBooks;

    const sorted = [...base];
    if (sortKey === "year-asc") sorted.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    else if (sortKey === "year-desc") sorted.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    else sorted.sort((a, b) => {
      const aa = a.author || "~"; // empty authors sort to the end
      const bb = b.author || "~";
      return aa.localeCompare(bb) || a.year - b.year;
    });
    return sorted;
  }, [allBooks, query, sortKey]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <section
      data-testid="foundational-library-section"
      className="rounded-3xl border border-[#1A6EA8]/15 bg-gradient-to-br from-white to-[#f0f7ff] shadow-sm overflow-hidden"
    >
      {/* ── Header ── */}
      <header className="px-5 sm:px-7 py-5 border-b border-[#1A6EA8]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1A6EA8] to-[#0a2240] text-white flex items-center justify-center shadow-md">
            <Library className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className={`font-bold text-lg sm:text-xl text-foreground leading-tight ${kh ? "font-khmer" : "font-display"}`}>
              {t("Foundational Library", "បណ្ណាល័យគ្រឹះ")}
            </h2>
            <p className={`text-xs text-muted-foreground mt-0.5 ${kh ? "font-khmer" : ""}`}>
              {t(
                `${stats.count} curated books · ${stats.minYear}–${stats.maxYear}`,
                `សៀវភៅជ្រើសរើស ${stats.count} ក្បាល · ${stats.minYear}–${stats.maxYear}`,
              )}
            </p>
          </div>
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
            placeholder={t("Search by title or author…", "ស្វែងរកតាមឈ្មោះ ឬអ្នកនិពន្ធ…")}
            data-testid="library-search-input"
            aria-label={t("Search the foundational library", "ស្វែងរកក្នុងបណ្ណាល័យគ្រឹះ")}
            className={`w-full rounded-xl border border-border bg-white pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6EA8]/40 transition ${kh ? "font-khmer" : ""}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label={t("Clear search", "សម្អាត")}
              data-testid="library-clear-search"
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
            data-testid="library-sort-select"
            aria-label={t("Sort the foundational library", "តម្រៀបបណ្ណាល័យគ្រឹះ")}
            className={`w-full appearance-none rounded-xl border border-border bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6EA8]/40 transition ${kh ? "font-khmer" : ""}`}
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
            ? t(`Showing all ${filtered.length} books`, `កំពុងបង្ហាញសៀវភៅទាំង ${filtered.length} ក្បាល`)
            : t(
                `Showing ${filtered.length} of ${allBooks.length} books`,
                `កំពុងបង្ហាញ ${filtered.length} ក្នុងចំណោម ${allBooks.length} ក្បាល`,
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
              {t("No books match your search.", "គ្មានសៀវភៅណាត្រូវនឹងការស្វែងរករបស់អ្នកទេ។")}
            </p>
          </div>
        ) : (
          <ul
            data-testid="library-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {visible.map((book, idx) => (
              <BookListItem key={`${book.year}-${book.author}-${book.title}-${idx}`} book={book} kh={kh} t={t} />
            ))}
          </ul>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <nav
          className="px-5 sm:px-7 pb-5 flex items-center justify-center gap-2"
          aria-label={t("Library pagination", "ការបែងចែកទំព័របណ្ណាល័យ")}
          data-testid="library-pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-[#1A6EA8] hover:text-[#1A6EA8] disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            aria-label={t("Previous page", "ទំព័រមុន")}
            data-testid="library-prev-page"
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
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-[#1A6EA8] hover:text-[#1A6EA8] disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
            aria-label={t("Next page", "ទំព័របន្ទាប់")}
            data-testid="library-next-page"
          >
            <span className={`hidden sm:inline ${kh ? "font-khmer" : ""}`}>{t("Next", "បន្ទាប់")}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </section>
  );
}

// ─── Single book card ───────────────────────────────────────────────────────

function BookListItem({
  book,
  kh,
  t,
}: {
  book: FoundationalBook;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const hasAuthor = book.author.length > 0;
  return (
    <li
      data-testid="library-book-card"
      className="group relative flex gap-3 rounded-xl border border-[#1A6EA8]/10 bg-white p-3 hover:border-[#1A6EA8]/40 hover:shadow-md transition-all"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] text-[#0a4a7a] flex items-center justify-center group-hover:from-[#1A6EA8] group-hover:to-[#0a2240] group-hover:text-white transition-colors">
        <BookOpen className="w-4 h-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-block text-[10px] font-bold tabular-nums tracking-wider rounded-md px-1.5 py-0.5 bg-[#1A6EA8]/10 text-[#0a4a7a]"
            aria-label={t(`Published ${book.yearLabel}`, `បោះពុម្ពឆ្នាំ ${book.yearLabel}`)}
          >
            {book.yearLabel}
          </span>
        </div>
        <p className={`text-sm font-semibold text-foreground leading-snug break-words ${kh ? "font-khmer" : ""}`}>
          {book.title}
        </p>
        <p
          className={`text-xs mt-0.5 break-words ${
            hasAuthor ? "text-muted-foreground" : "text-muted-foreground/60 italic"
          } ${kh ? "font-khmer not-italic" : ""}`}
        >
          {hasAuthor ? book.author : t("Unknown author", "មិនស្គាល់អ្នកនិពន្ធ")}
        </p>
      </div>
    </li>
  );
}
