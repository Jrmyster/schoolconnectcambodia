import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  BookOpen, Heart, Plus, X, Loader2, User, Send,
  Trash2, BookMarked, ChevronLeft, Star, Award,
  FlaskConical, Lightbulb, Briefcase, Scroll, DollarSign,
  Library, CheckCircle2, Medal, Recycle,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

// ── Types ────────────────────────────────────────────────────────────────────

type BookEntry = {
  id: number;
  title: string;
  author: string;
  recommendedBy: string;
  review: string;
  userId: number;
  isFeatured: boolean;
  category: string | null;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
};

type AuthorEntry = {
  id: number;
  name: string;
  initials: string;
  lifespan: string;
  bioEn: string;
  bioKh: string;
  works: { title: string; year: string }[];
  challengeTitleEn: string | null;
  challengeTitleKh: string | null;
  challengeBodyEn: string | null;
  challengeBodyKh: string | null;
  challengeId: string | null;
  challengeBadge: string | null;
  month: number;
  year: number;
  isCurrent: boolean;
};

type CategoryKey = "all" | "science" | "philosophy" | "career" | "fiction" | "finance";

// ── Static data ───────────────────────────────────────────────────────────────

const CATEGORIES: { key: CategoryKey; en: string; kh: string; icon: React.ReactNode }[] = [
  { key: "all",        en: "All",        kh: "ទាំងអស់",        icon: <Library className="w-3.5 h-3.5" /> },
  { key: "science",    en: "Science",    kh: "វិទ្យាសាស្ត្រ",  icon: <FlaskConical className="w-3.5 h-3.5" /> },
  { key: "philosophy", en: "Philosophy", kh: "ទស្សនវិជ្ជា",    icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { key: "career",     en: "Career",     kh: "អាជីព",           icon: <Briefcase className="w-3.5 h-3.5" /> },
  { key: "fiction",    en: "Fiction",    kh: "ប្រឌិតកថា",      icon: <Scroll className="w-3.5 h-3.5" /> },
  { key: "finance",    en: "Finance",    kh: "ហិរញ្ញវត្ថុ",    icon: <DollarSign className="w-3.5 h-3.5" /> },
];

const CATEGORY_LABELS: Record<string, { en: string; kh: string }> = {
  science:    { en: "Science",    kh: "វិទ្យាសាស្ត្រ" },
  philosophy: { en: "Philosophy", kh: "ទស្សនវិជ្ជា" },
  career:     { en: "Career",     kh: "អាជីព" },
  fiction:    { en: "Fiction",    kh: "ប្រឌិតកថា" },
  finance:    { en: "Finance",    kh: "ហិរញ្ញវត្ថុ" },
};

const EN_MONTHS = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const KH_MONTHS = [
  "", "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
  "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ",
];

const PALETTE = [
  "from-[#1A6EA8] to-[#0a4a7a]",
  "from-[#7c3aed] to-[#4c1d95]",
  "from-[#059669] to-[#064e3b]",
  "from-[#dc2626] to-[#7f1d1d]",
  "from-[#d97706] to-[#78350f]",
  "from-[#0891b2] to-[#164e63]",
];
const PAST_PALETTE = [
  "from-[#1A6EA8] to-[#0a4a7a]",
  "from-[#7c3aed] to-[#4c1d95]",
  "from-[#059669] to-[#064e3b]",
  "from-[#d97706] to-[#78350f]",
  "from-[#0891b2] to-[#164e63]",
];

function avatarColor(id: number) { return PALETTE[id % PALETTE.length]; }
function pastColor(id: number)   { return PAST_PALETTE[id % PAST_PALETTE.length]; }

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// ── Page ─────────────────────────────────────────────────────────────────────

export function ReadingListPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { user } = useAuth();
  const kh = language === "kh";

  // Books
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [bookError, setBookError] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  // Authors
  const [authors, setAuthors] = useState<AuthorEntry[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");
  const [review, setReview] = useState("");
  const [category, setCategory] = useState<CategoryKey | "">("");

  const fetchBooks = useCallback(async () => {
    try {
      setBookError("");
      const res = await fetch(`${BASE}/api/books`, { credentials: "include" });
      if (!res.ok) throw new Error();
      setBooks(await res.json());
    } catch {
      setBookError(t("Failed to load books. Please try again.", "មិនអាចទាញយកសៀវភៅបានទេ។ សូមព្យាយាមម្ដងទៀត។"));
    } finally {
      setLoadingBooks(false);
    }
  }, [t]);

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/authors-of-month`);
      if (!res.ok) throw new Error();
      setAuthors(await res.json());
    } catch {
      // silent — author card is non-critical
    } finally {
      setLoadingAuthors(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);
  useEffect(() => { fetchAuthors(); }, [fetchAuthors]);

  function resetForm() {
    setTitle(""); setAuthor(""); setRecommendedBy(""); setReview(""); setCategory("");
    setFormError(""); setFormSuccess(false);
  }
  function openForm()  { resetForm(); setShowForm(true); }
  function closeForm() { setShowForm(false); resetForm(); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFormError(""); setSubmitting(true);
    try {
      const res = await fetch(`${BASE}/api/books`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, recommendedBy, review, category: category || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setBooks((prev) => [data, ...prev]);
      setFormSuccess(true);
      setTimeout(closeForm, 1500);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : t("Something went wrong.", "មានបញ្ហាកើតឡើង។"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLike(bookId: number) {
    if (!user) return;
    const prev = [...books];
    setBooks((b) => b.map((book) => book.id === bookId
      ? { ...book, likedByMe: !book.likedByMe, likeCount: book.likedByMe ? book.likeCount - 1 : book.likeCount + 1 }
      : book
    ));
    try {
      const res = await fetch(`${BASE}/api/books/${bookId}/like`, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error();
    } catch { setBooks(prev); }
  }

  async function handleDelete(bookId: number) {
    if (!user) return;
    if (!confirm(t("Delete this recommendation?", "លុបការណែនាំនេះ?"))) return;
    const prev = [...books];
    setBooks((b) => b.filter((book) => book.id !== bookId));
    try {
      const res = await fetch(`${BASE}/api/books/${bookId}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error();
    } catch { setBooks(prev); }
  }

  function matchesCategory(book: BookEntry) {
    return activeCategory === "all" || book.category === activeCategory;
  }

  const featuredBooks = books.filter((b) => b.isFeatured && matchesCategory(b));
  const studentBooks  = books.filter((b) => !b.isFeatured && matchesCategory(b));
  const currentAuthor = authors.find((a) => a.isCurrent) ?? null;
  const pastAuthors   = authors.filter((a) => !a.isCurrent);

  const inputClass =
    "w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition";

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-[#0a2240] to-[#1A6EA8] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                {t("Reading List", "បញ្ជីសៀវភៅអាន")}
              </h1>
              <p className={`text-white/70 text-sm mt-0.5 ${kh ? "font-khmer" : ""}`}>
                {t("Books recommended by Cambodian students", "សៀវភៅដែលណែនាំដោយសិស្សខ្មែរ")}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            {user && user.role === "student" ? (
              <button onClick={openForm}
                className={`inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-xl shadow-lg hover:bg-white/90 active:scale-95 transition-all ${kh ? "font-khmer" : ""}`}>
                <Plus className="w-4 h-4" />
                {t("Recommend a Book", "ណែនាំសៀវភៅ")}
              </button>
            ) : user && user.role === "school" ? (
              <span className={`inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white/90 font-medium px-5 py-2.5 rounded-xl text-sm ${kh ? "font-khmer" : ""}`}>
                {t("Reading List recommendations are for student accounts.", "ការណែនាំសៀវភៅសម្រាប់គណនីសិស្សតែប៉ុណ្ណោះ។")}
              </span>
            ) : (
              <Link href="/login"
                className={`inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all ${kh ? "font-khmer text-sm" : ""}`}>
                <User className="w-4 h-4" />
                {t("Log in to recommend a book", "ចូលដើម្បីណែនាំសៀវភៅ")}
              </Link>
            )}
            <span className={`text-white/60 text-sm ${kh ? "font-khmer" : ""}`}>
              {books.length} {t("recommendations", "ការណែនាំ")}
            </span>
          </div>
        </div>
      </section>

      {/* ── Modal form ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeForm} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`font-bold text-lg text-foreground ${kh ? "font-khmer" : "font-display"}`}>
                  {t("Recommend a Book", "ណែនាំសៀវភៅ")}
                </h2>
                <p className={`text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                  {t("Share a book that helped you", "ចែករំលែកសៀវភៅដែលជួយអ្នក")}
                </p>
              </div>
            </div>
            {formSuccess ? (
              <div className={`text-center py-8 text-green-600 font-semibold ${kh ? "font-khmer" : ""}`}>
                ✓ {t("Book recommended! Thank you.", "បានណែនាំសៀវភៅ! អរគុណ។")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Book Title *", "ឈ្មោះសៀវភៅ *")}
                  </label>
                  <input className={inputClass} placeholder={t("e.g. The Alchemist", "ឧ. ជ័យជំនះ")}
                    value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Author *", "អ្នកនិពន្ធ *")}
                  </label>
                  <input className={inputClass} placeholder={t("e.g. Paulo Coelho", "ឧ. Paulo Coelho")}
                    value={author} onChange={(e) => setAuthor(e.target.value)} required maxLength={200} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Your Name *", "ឈ្មោះរបស់អ្នក *")}
                  </label>
                  <input className={inputClass} placeholder={t("e.g. Sophal Rath", "ឧ. សុផល រ៉ាត")}
                    value={recommendedBy} onChange={(e) => setRecommendedBy(e.target.value)} required maxLength={200} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Category", "ប្រភេទ")}
                  </label>
                  <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as CategoryKey | "")}>
                    <option value="">{t("— Select a category (optional) —", "— ជ្រើសប្រភេទ (ជាជម្រើស) —")}</option>
                    {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
                      <option key={c.key} value={c.key}>{kh ? c.kh : c.en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Why do you recommend it? *", "ហេតុអ្វីអ្នកណែនាំ? *")}
                  </label>
                  <textarea
                    className={`${inputClass} min-h-[100px] resize-none`}
                    placeholder={t(
                      "Share what you loved about this book and why others should read it...",
                      "ចែករំលែកអ្វីដែលអ្នកចូលចិត្ត និងហេតុអ្វីអ្នកដទៃគួរអាន..."
                    )}
                    value={review} onChange={(e) => setReview(e.target.value)}
                    required minLength={10} maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{review.length}/1000</p>
                </div>
                {formError && <p className={`text-sm text-destructive ${kh ? "font-khmer" : ""}`}>{formError}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm}
                    className={`flex-1 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors ${kh ? "font-khmer" : ""}`}>
                    {t("Cancel", "បោះបង់")}
                  </button>
                  <button type="submit" disabled={submitting}
                    className={`flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 ${kh ? "font-khmer" : ""}`}>
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {t("Submit", "ដាក់ស្នើ")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Author of the Month */}
        {!loadingAuthors && currentAuthor && (
          <AuthorOfMonthCard author={currentAuthor} user={user} kh={kh} t={t} />
        )}

        {/* Category filter chips */}
        <div>
          <p className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 ${kh ? "font-khmer" : ""}`}>
            {t("Filter by category", "ត្រងតាមប្រភេទ")}
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    active
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                  } ${kh ? "font-khmer" : ""}`}>
                  {cat.icon}
                  {kh ? cat.kh : cat.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Book feed */}
        {loadingBooks ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bookError ? (
          <div className={`text-center py-16 text-muted-foreground ${kh ? "font-khmer" : ""}`}>{bookError}</div>
        ) : (
          <>
            {featuredBooks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h2 className={`font-bold text-foreground ${kh ? "font-khmer" : "font-display"}`}>
                    {t("Featured Recommendations", "ការណែនាំពិសេស")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featuredBooks.map((book) => (
                    <BookCard key={book.id} book={book} user={user} kh={kh} t={t} onLike={handleLike} onDelete={handleDelete} featured />
                  ))}
                </div>
              </div>
            )}

            <div>
              {studentBooks.length > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h2 className={`font-bold text-foreground ${kh ? "font-khmer" : "font-display"}`}>
                    {t("Student Recommendations", "ការណែនាំពីសិស្ស")}
                  </h2>
                </div>
              )}
              {studentBooks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className={`font-semibold text-lg ${kh ? "font-khmer" : ""}`}>
                    {activeCategory === "all"
                      ? t("No student recommendations yet. Be the first!", "មិនទាន់មានការណែនាំពីសិស្សទេ។ ចូររួមចំណែកដំបូង!")
                      : t("No books in this category yet.", "មិនទាន់មានសៀវភៅក្នុងប្រភេទនេះទេ។")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {studentBooks.map((book) => (
                    <BookCard key={book.id} book={book} user={user} kh={kh} t={t} onLike={handleLike} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Past Authors Archive */}
        {!loadingAuthors && pastAuthors.length > 0 && (
          <PastAuthorsGrid authors={pastAuthors} kh={kh} t={t} />
        )}

      </section>
    </div>
  );
}

// ── Author of the Month Card ──────────────────────────────────────────────────

function AuthorOfMonthCard({
  author, user, kh, t,
}: {
  author: AuthorEntry;
  user: { id: number } | null;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const monthLabel = kh
    ? `${KH_MONTHS[author.month]} ${author.year}`
    : `${EN_MONTHS[author.month]} ${author.year}`;

  return (
    <div className="rounded-3xl overflow-hidden border border-[#1A6EA8]/20 shadow-lg bg-white">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0a2240] via-[#1A6EA8] to-[#0891b2] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className={`text-white font-bold text-sm tracking-wide uppercase ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {t("Author of the Month", "អ្នកនិពន្ធប្រចាំខែ")}
          </span>
        </div>
        <span className={`text-white/60 text-xs ${kh ? "font-khmer" : ""}`}>{monthLabel}</span>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A6EA8] to-[#0a2240] flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-3xl tracking-tight">{author.initials}</span>
          </div>
          <span className="text-xs text-muted-foreground">{author.lifespan}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-black text-foreground leading-tight mb-1">{author.name}</h2>
          <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? author.bioKh : author.bioEn}
          </p>

          {/* Recommended works */}
          {author.works.length > 0 && (
            <div className="mb-5">
              <p className={`text-xs font-bold text-primary uppercase tracking-wide mb-2 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Recommended Works", "ស្នាដៃដែលណែនាំ")}
              </p>
              <ul className="space-y-1.5">
                {author.works.map((work) => (
                  <li key={work.title} className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground font-medium leading-snug">
                      {work.title}
                      <span className="text-muted-foreground font-normal ml-1.5">({work.year})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge box */}
          {author.challengeId && (
            <ChallengeBox
              challengeId={author.challengeId}
              titleEn={author.challengeTitleEn ?? ""}
              titleKh={author.challengeTitleKh ?? ""}
              bodyEn={author.challengeBodyEn ?? ""}
              bodyKh={author.challengeBodyKh ?? ""}
              badge={author.challengeBadge ?? ""}
              user={user}
              kh={kh}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Challenge Box ─────────────────────────────────────────────────────────────

function ChallengeBox({
  challengeId, titleEn, titleKh, bodyEn, bodyKh, badge, user, kh, t,
}: {
  challengeId: string;
  titleEn: string; titleKh: string;
  bodyEn: string;  bodyKh: string;
  badge: string;
  user: { id: number } | null;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const [completed, setCompleted] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) { setChecking(false); return; }
    fetch(`${BASE}/api/challenges/${challengeId}/completion`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.completed) setCompleted(true); })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [challengeId, user]);

  async function handleComplete() {
    if (!user || completing) return;
    setCompleting(true);
    try {
      const res = await fetch(`${BASE}/api/challenges/${challengeId}/complete`, {
        method: "POST", credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setCompleted(true);
        if (data.badgeAwarded) setBadgeAwarded(true);
      }
    } catch { /* silent */ }
    finally { setCompleting(false); }
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
      {/* Challenge banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-2.5 flex items-center gap-2">
        <Recycle className="w-4 h-4 text-white" />
        <span className={`text-white font-bold text-xs tracking-wide uppercase ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {t("Monthly Challenge", "ការប្រកួតប្រជែងប្រចាំខែ")}
        </span>
      </div>

      <div className="p-4">
        <h3 className={`font-black text-emerald-900 text-base leading-snug mb-2 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h3>
        <p className={`text-sm text-emerald-800/80 leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? bodyKh : bodyEn}
        </p>

        {/* Completion area */}
        {checking ? null : completed ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
              <span className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                {t("Challenge Complete!", "បានបញ្ចប់ការប្រកួតប្រជែង!")}
              </span>
            </div>
            {(badgeAwarded || completed) && badge && (
              <div className="flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-xl px-3 py-2">
                <Medal className="w-4 h-4 text-amber-600 fill-amber-400" />
                <span className={`text-xs font-bold text-amber-800 ${kh ? "font-khmer" : ""}`}>
                  {t(`Badge earned: ${badge.charAt(0).toUpperCase() + badge.slice(1)}`, `ទទួលបានរង្វាន់: ${badge}`)}
                </span>
              </div>
            )}
          </div>
        ) : user ? (
          <button
            onClick={handleComplete}
            disabled={completing}
            className={`inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all disabled:opacity-60 ${kh ? "font-khmer" : ""}`}
          >
            {completing
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <CheckCircle2 className="w-4 h-4" />}
            {t("Mark as Complete", "សម្គាល់ថាបានបញ្ចប់")}
          </button>
        ) : (
          <Link href="/login"
            className={`inline-flex items-center gap-2 text-emerald-700 border border-emerald-300 bg-white hover:bg-emerald-50 font-semibold text-sm px-4 py-2 rounded-xl transition-colors ${kh ? "font-khmer" : ""}`}>
            <User className="w-4 h-4" />
            {t("Log in to participate", "ចូលដើម្បីចូលរួម")}
          </Link>
        )}
      </div>
    </div>
  );
}

// ── Past Authors Grid ─────────────────────────────────────────────────────────

function PastAuthorsGrid({
  authors, kh, t,
}: {
  authors: AuthorEntry[];
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Library className="w-4 h-4 text-muted-foreground" />
        <h2 className={`font-bold text-foreground ${kh ? "font-khmer" : "font-display"}`}>
          {t("Past Authors", "អ្នកនិពន្ធពីមុន")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {authors.map((author) => (
          <PastAuthorCard key={author.id} author={author} kh={kh} t={t} />
        ))}
      </div>
    </div>
  );
}

function PastAuthorCard({
  author, kh, t,
}: {
  author: AuthorEntry;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const monthLabel = kh
    ? `${KH_MONTHS[author.month]} ${author.year}`
    : `${EN_MONTHS[author.month]} ${author.year}`;

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`bg-gradient-to-r ${pastColor(author.id)} p-4 flex items-center gap-3`}>
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">{author.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-snug">{author.name}</h3>
          <p className="text-white/70 text-xs">{author.lifespan}</p>
        </div>
        <span className="text-white/60 text-xs flex-shrink-0">{monthLabel}</span>
      </div>

      <div className="p-4">
        <p className={`text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? author.bioKh : author.bioEn}
        </p>
        {author.works.length > 0 && (
          <ul className="space-y-1">
            {author.works.slice(0, 2).map((work) => (
              <li key={work.title} className="flex items-start gap-1.5">
                <BookOpen className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-foreground font-medium leading-snug">
                  {work.title}
                  <span className="text-muted-foreground font-normal ml-1">({work.year})</span>
                </span>
              </li>
            ))}
            {author.works.length > 2 && (
              <li className="text-xs text-muted-foreground pl-4.5">
                +{author.works.length - 2} {t("more", "ទៀត")}
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── BookCard ──────────────────────────────────────────────────────────────────

function BookCard({
  book, user, kh, t, onLike, onDelete, featured = false,
}: {
  book: BookEntry;
  user: { id: number } | null;
  kh: boolean;
  t: (en: string, kh: string) => string;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  featured?: boolean;
}) {
  const catLabel = book.category ? CATEGORY_LABELS[book.category] : null;

  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-md ${
      featured ? "border-amber-200 bg-gradient-to-b from-amber-50 to-white shadow-sm" : "border-border bg-white shadow-sm"
    }`}>
      <div className={`bg-gradient-to-r ${avatarColor(book.id)} p-4 relative`}>
        {featured && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Star className="w-2.5 h-2.5 fill-white" />
            {t("Featured", "ពិសេស")}
          </div>
        )}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 pr-12">
            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">{book.title}</h3>
            <p className="text-white/80 text-xs mt-0.5">by {book.author}</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {catLabel && (
          <span className={`self-start mb-2 text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-primary/10 text-primary ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {kh ? catLabel.kh : catLabel.en}
          </span>
        )}
        <p className={`text-sm text-muted-foreground leading-relaxed flex-1 ${kh ? "font-khmer leading-loose" : ""}`}>
          "{book.review}"
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className={`flex items-center gap-1.5 text-xs ${featured ? "text-amber-700 font-semibold" : "text-muted-foreground"}`}>
            {featured ? <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> : <User className="w-3.5 h-3.5" />}
            <span className={kh ? "font-khmer" : ""}>{book.recommendedBy}</span>
          </div>
          <div className="flex items-center gap-2">
            {user && book.userId === user.id && (
              <button onClick={() => onDelete(book.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title={t("Delete", "លុប")}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={() => onLike(book.id)} disabled={!user}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                book.likedByMe ? "bg-rose-100 text-rose-600" : "bg-secondary text-muted-foreground hover:bg-rose-50 hover:text-rose-500"
              } disabled:cursor-default`}
              title={!user ? t("Log in to like", "ចូលដើម្បីចុច") : undefined}>
              <Heart className={`w-3.5 h-3.5 transition-all ${book.likedByMe ? "fill-rose-500 text-rose-500 scale-110" : ""}`} />
              <span>{book.likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
