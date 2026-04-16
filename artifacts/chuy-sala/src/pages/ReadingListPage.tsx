import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  BookOpen, Heart, Plus, X, Loader2, User, Send,
  Trash2, BookMarked, ChevronLeft,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

type BookEntry = {
  id: number;
  title: string;
  author: string;
  recommendedBy: string;
  review: string;
  userId: number;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const PALETTE = [
  "from-[#1A6EA8] to-[#0a4a7a]",
  "from-[#7c3aed] to-[#4c1d95]",
  "from-[#059669] to-[#064e3b]",
  "from-[#dc2626] to-[#7f1d1d]",
  "from-[#d97706] to-[#78350f]",
  "from-[#0891b2] to-[#164e63]",
];

function avatarColor(id: number) {
  return PALETTE[id % PALETTE.length];
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReadingListPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { user } = useAuth();
  const kh = language === "kh";

  const [books, setBooks] = useState<BookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");
  const [review, setReview] = useState("");

  const fetchBooks = useCallback(async () => {
    try {
      setError("");
      const res = await fetch(`${BASE}/api/books`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      setBooks(await res.json());
    } catch {
      setError(t("Failed to load books. Please try again.", "មិនអាចទាញយកសៀវភៅបានទេ។ សូមព្យាយាមម្ដងទៀត។"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  function resetForm() {
    setTitle("");
    setAuthor("");
    setRecommendedBy("");
    setReview("");
    setFormError("");
    setFormSuccess(false);
  }

  function openForm() {
    resetForm();
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE}/api/books`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, recommendedBy, review }),
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
    setBooks((b) =>
      b.map((book) =>
        book.id === bookId
          ? {
              ...book,
              likedByMe: !book.likedByMe,
              likeCount: book.likedByMe ? book.likeCount - 1 : book.likeCount + 1,
            }
          : book
      )
    );
    try {
      const res = await fetch(`${BASE}/api/books/${bookId}/like`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
    } catch {
      setBooks(prev);
    }
  }

  async function handleDelete(bookId: number) {
    if (!user) return;
    if (!confirm(t("Delete this recommendation?", "លុបការណែនាំនេះ?"))) return;
    const prev = [...books];
    setBooks((b) => b.filter((book) => book.id !== bookId));
    try {
      const res = await fetch(`${BASE}/api/books/${bookId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
    } catch {
      setBooks(prev);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0a2240] to-[#1A6EA8] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("Back to Home", "귀ត្រឡប់ទំព័រដើម")}
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
            {user ? (
              <button
                onClick={openForm}
                className={`inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-xl shadow-lg hover:bg-white/90 active:scale-95 transition-all ${kh ? "font-khmer" : ""}`}
              >
                <Plus className="w-4 h-4" />
                {t("Recommend a Book", "ណែនាំសៀវភៅ")}
              </button>
            ) : (
              <Link
                href="/login"
                className={`inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all ${kh ? "font-khmer text-sm" : ""}`}
              >
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

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
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
                  <input
                    className={inputClass}
                    placeholder={t("e.g. The Alchemist", "ឧ. ជ័យជំនះ")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Author *", "អ្នកនិពន្ធ *")}
                  </label>
                  <input
                    className={inputClass}
                    placeholder={t("e.g. Paulo Coelho", "ឧ. Paulo Coelho")}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-muted-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Your Name *", "ឈ្មោះរបស់អ្នក *")}
                  </label>
                  <input
                    className={inputClass}
                    placeholder={t("e.g. Sophal Rath", "ឧ. សុផល រ៉ាត")}
                    value={recommendedBy}
                    onChange={(e) => setRecommendedBy(e.target.value)}
                    required
                    maxLength={200}
                  />
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
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{review.length}/1000</p>
                </div>

                {formError && (
                  <p className={`text-sm text-destructive ${kh ? "font-khmer" : ""}`}>{formError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className={`flex-1 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors ${kh ? "font-khmer" : ""}`}
                  >
                    {t("Cancel", "បោះបង់")}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 ${kh ? "font-khmer" : ""}`}
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {t("Submit", "ដាក់ស្នើ")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Book feed */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className={`text-center py-16 text-muted-foreground ${kh ? "font-khmer" : ""}`}>{error}</div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className={`font-semibold text-lg ${kh ? "font-khmer" : ""}`}>
              {t("No books yet. Be the first to recommend one!", "មិនទាន់មានសៀវភៅទេ។ ត្រូវជាអ្នកដំបូងណែនាំ!")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-r ${avatarColor(book.id)} p-5`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{initials(book.recommendedBy)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-white/80 text-xs mt-0.5">by {book.author}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className={`text-sm text-muted-foreground leading-relaxed flex-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                    "{book.review}"
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span className={kh ? "font-khmer" : ""}>{book.recommendedBy}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {user && book.userId === user.id && (
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title={t("Delete", "លុប")}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleLike(book.id)}
                        disabled={!user}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          book.likedByMe
                            ? "bg-rose-100 text-rose-600"
                            : "bg-secondary text-muted-foreground hover:bg-rose-50 hover:text-rose-500"
                        } disabled:cursor-default`}
                        title={!user ? t("Log in to like", "ចូលដើម្បីចុច") : undefined}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all ${book.likedByMe ? "fill-rose-500 text-rose-500 scale-110" : ""}`}
                        />
                        <span>{book.likeCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
