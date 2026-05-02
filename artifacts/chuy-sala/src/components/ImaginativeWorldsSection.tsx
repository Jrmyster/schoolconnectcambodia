import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  Rocket,
  Wand2,
  Users,
} from "lucide-react";
import {
  IMAGINATIVE_BOOKS,
  GENRE_LABELS,
  type ImaginativeBook,
  type GenreTag,
} from "@/data/imaginativeWorlds";

// ════════════════════════════════════════════════════════════════════════════
//  ImaginativeWorldsSection
//
//  Sister section to FoundationalLibrarySection — same search/sort/pagination
//  shell, but tuned for modern fiction:
//    • genre badges (Sci-Fi / Fantasy / Teen) instead of a year pill
//    • cover-image slot (with a styled glyph fallback when no URL is set)
//    • genre filter chips
// ════════════════════════════════════════════════════════════════════════════

type SortKey = "title-asc" | "title-desc" | "author-asc";
type GenreFilter = "all" | GenreTag;
const PER_PAGE = 24;

type Props = {
  kh: boolean;
  t: (en: string, kh: string) => string;
};

const GENRE_BADGE: Record<GenreTag, { bg: string; text: string; ring: string; icon: React.ReactNode }> = {
  scifi:   { bg: "bg-sky-100",     text: "text-sky-800",     ring: "ring-sky-200",     icon: <Rocket className="w-3 h-3" /> },
  fantasy: { bg: "bg-violet-100",  text: "text-violet-800",  ring: "ring-violet-200",  icon: <Wand2  className="w-3 h-3" /> },
  teen:    { bg: "bg-emerald-100", text: "text-emerald-800", ring: "ring-emerald-200", icon: <Users  className="w-3 h-3" /> },
};

export function ImaginativeWorldsSection({ kh, t }: Props) {
  const allBooks = IMAGINATIVE_BOOKS;

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("title-asc");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = allBooks;
    if (genreFilter !== "all") {
      base = base.filter((b) => b.genreTag === genreFilter);
    }
    if (q) {
      base = base.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          GENRE_LABELS[b.genreTag].en.toLowerCase().includes(q),
      );
    }
    const sorted = [...base];
    if (sortKey === "title-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortKey === "title-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
    else sorted.sort((a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title));
    return sorted;
  }, [allBooks, query, sortKey, genreFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, sortKey, genreFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <section
      data-testid="imaginative-worlds-section"
      className="rounded-3xl border border-violet-300/30 bg-gradient-to-br from-white to-violet-50 shadow-sm overflow-hidden"
    >
      {/* ── Header ── */}
      <header className="px-5 sm:px-7 py-5 border-b border-violet-200/40 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className={`font-bold text-lg sm:text-xl text-foreground leading-tight ${kh ? "font-khmer" : "font-display"}`}>
            {t("Imaginative Worlds & Teen Fiction", "ពិភពរវើរវាយ និង ប្រលោមលោកយុវវ័យ")}
          </h2>
          <p className={`text-xs text-muted-foreground mt-0.5 ${kh ? "font-khmer" : ""}`}>
            {t(
              `${allBooks.length} curated modern fiction series & novels`,
              `ប្រលោមលោកជ្រើសរើស ${allBooks.length} ក្បាល`,
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
            placeholder={t("Search by title or author…", "ស្វែងរកតាមឈ្មោះ ឬអ្នកនិពន្ធ…")}
            data-testid="imaginative-search-input"
            aria-label={t("Search modern fiction", "ស្វែងរកប្រលោមលោកសម័យថ្មី")}
            className={`w-full rounded-xl border border-border bg-white pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition ${kh ? "font-khmer" : ""}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label={t("Clear search", "សម្អាត")}
              data-testid="imaginative-clear-search"
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
            data-testid="imaginative-sort-select"
            aria-label={t("Sort modern fiction", "តម្រៀបប្រលោមលោក")}
            className={`w-full appearance-none rounded-xl border border-border bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition ${kh ? "font-khmer" : ""}`}
          >
            <option value="title-asc">{t("Title A → Z", "ចំណងជើង A → Z")}</option>
            <option value="title-desc">{t("Title Z → A", "ចំណងជើង Z → A")}</option>
            <option value="author-asc">{t("Author A → Z", "អ្នកនិពន្ធ A → Z")}</option>
          </select>
        </div>
      </div>

      {/* ── Genre filter chips ── */}
      <div className="px-5 sm:px-7 pb-3 flex flex-wrap gap-2" data-testid="imaginative-genre-filters">
        {(["all", "scifi", "fantasy", "teen"] as const).map((g) => {
          const active = genreFilter === g;
          const label =
            g === "all"
              ? { en: "All", kh: "ទាំងអស់" }
              : { en: GENRE_LABELS[g].en, kh: GENRE_LABELS[g].kh };
          return (
            <button
              key={g}
              type="button"
              onClick={() => setGenreFilter(g)}
              data-testid={`imaginative-filter-${g}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                active
                  ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                  : "bg-white text-muted-foreground border-border hover:border-violet-400 hover:text-violet-700"
              } ${kh ? "font-khmer" : ""}`}
            >
              {g !== "all" && GENRE_BADGE[g].icon}
              <span>{label.en}</span>
              <span className="opacity-50">/</span>
              <span className="font-khmer">{label.kh}</span>
            </button>
          );
        })}
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
            data-testid="imaginative-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {visible.map((book) => (
              <FictionCard key={`${book.title}-${book.author}`} book={book} kh={kh} t={t} />
            ))}
          </ul>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <nav
          className="px-5 sm:px-7 pb-5 flex items-center justify-center gap-2"
          aria-label={t("Library pagination", "ការបែងចែកទំព័របណ្ណាល័យ")}
          data-testid="imaginative-pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-violet-500 hover:text-violet-700 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
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
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground hover:border-violet-500 hover:text-violet-700 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground transition-colors"
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

// ─── Single fiction card ────────────────────────────────────────────────────

function FictionCard({
  book,
  kh,
  t,
}: {
  book: ImaginativeBook;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const badge = GENRE_BADGE[book.genreTag];
  const label = GENRE_LABELS[book.genreTag];
  return (
    <li
      data-testid="imaginative-book-card"
      className="group relative flex gap-3 rounded-xl border border-violet-200/40 bg-white p-3 hover:border-violet-400/60 hover:shadow-md transition-all"
    >
      {/* Cover image — falls back to a stylised glyph card when no URL */}
      {book.coverImageUrl ? (
        <img
          src={book.coverImageUrl}
          alt={t(`Cover of ${book.title}`, `គម្របសៀវភៅ ${book.title}`)}
          className="flex-shrink-0 w-12 h-16 rounded-lg object-cover bg-violet-100"
          loading="lazy"
        />
      ) : (
        <div
          className="flex-shrink-0 w-12 h-16 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 flex items-center justify-center group-hover:from-violet-600 group-hover:to-indigo-700 group-hover:text-white transition-colors"
          aria-hidden="true"
          data-testid="imaginative-cover-placeholder"
        >
          <BookOpen className="w-5 h-5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* ── Bilingual genre badge (replaces the year pill from the foundational library) ── */}
        <div className="flex items-center gap-2 mb-1">
          <span
            data-testid={`genre-badge-${book.genreTag}`}
            className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 ring-1 ${badge.bg} ${badge.text} ${badge.ring}`}
            aria-label={t(`Genre: ${label.en}`, `ប្រភេទ៖ ${label.kh}`)}
          >
            {badge.icon}
            <span>{label.short}</span>
            <span className="opacity-50">/</span>
            <span className="font-khmer">{label.kh}</span>
          </span>
        </div>

        <p className={`text-sm font-semibold text-foreground leading-snug break-words ${kh ? "font-khmer" : ""}`}>
          {book.title}
        </p>
        <p className={`text-xs mt-0.5 text-muted-foreground break-words ${kh ? "font-khmer" : ""}`}>
          {book.author}
        </p>
        <p className={`text-[11px] mt-1 text-muted-foreground/90 leading-snug ${kh ? "font-khmer" : ""}`}>
          {kh ? book.blurbKh : book.blurbEn}
        </p>
      </div>
    </li>
  );
}
