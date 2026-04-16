import { Router } from "express";
import { db } from "@workspace/db";
import { booksTable, bookLikesTable } from "@workspace/db/schema";
import { eq, and, sql } from "drizzle-orm";

const router = Router();

// GET /books — public, returns all books with like counts + caller's like status
router.get("/books", async (req, res) => {
  try {
    const userId = req.session.userId ?? null;

    const books = await db
      .select({
        id: booksTable.id,
        title: booksTable.title,
        author: booksTable.author,
        recommendedBy: booksTable.recommendedBy,
        review: booksTable.review,
        userId: booksTable.userId,
        isFeatured: booksTable.isFeatured,
        createdAt: booksTable.createdAt,
        likeCount: sql<number>`cast(count(${bookLikesTable.id}) as int)`,
      })
      .from(booksTable)
      .leftJoin(bookLikesTable, eq(bookLikesTable.bookId, booksTable.id))
      .groupBy(booksTable.id)
      .orderBy(sql`is_featured DESC, ${booksTable.createdAt} DESC`);

    if (!userId) {
      return res.json(books.map((b) => ({ ...b, likedByMe: false })));
    }

    const myLikes = await db
      .select({ bookId: bookLikesTable.bookId })
      .from(bookLikesTable)
      .where(eq(bookLikesTable.userId, userId));

    const likedSet = new Set(myLikes.map((l) => l.bookId));

    return res.json(
      books.map((b) => ({ ...b, likedByMe: likedSet.has(b.id) }))
    );
  } catch (err) {
    console.error("GET /books error:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// POST /books — auth required
router.post("/books", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "You must be logged in to recommend a book" });
  }
  const userId = req.session.userId;
  const { title, author, recommendedBy, review } = req.body ?? {};

  if (typeof title !== "string" || !title.trim())
    return res.status(400).json({ error: "title is required" });
  if (title.trim().length > 200)
    return res.status(400).json({ error: "title must be 200 characters or fewer" });

  if (typeof author !== "string" || !author.trim())
    return res.status(400).json({ error: "author is required" });
  if (author.trim().length > 200)
    return res.status(400).json({ error: "author must be 200 characters or fewer" });

  if (typeof recommendedBy !== "string" || !recommendedBy.trim())
    return res.status(400).json({ error: "recommendedBy is required" });
  if (recommendedBy.trim().length > 200)
    return res.status(400).json({ error: "recommendedBy must be 200 characters or fewer" });

  if (typeof review !== "string" || review.trim().length < 10)
    return res.status(400).json({ error: "review must be at least 10 characters" });
  if (review.trim().length > 1000)
    return res.status(400).json({ error: "review must be 1000 characters or fewer" });

  try {
    const [inserted] = await db
      .insert(booksTable)
      .values({
        title: title.trim(),
        author: author.trim(),
        recommendedBy: recommendedBy.trim(),
        review: review.trim(),
        userId,
      })
      .returning();
    return res.status(201).json({ ...inserted, likeCount: 0, likedByMe: false });
  } catch (err) {
    console.error("POST /books error:", err);
    res.status(500).json({ error: "Failed to save book recommendation" });
  }
});

// POST /books/:id/like — auth required, toggles like
router.post("/books/:id/like", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "You must be logged in to like a book" });
  }
  const userId = req.session.userId;
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book id" });

  try {
    const existing = await db
      .select()
      .from(bookLikesTable)
      .where(and(eq(bookLikesTable.bookId, bookId), eq(bookLikesTable.userId, userId)));

    if (existing.length > 0) {
      await db
        .delete(bookLikesTable)
        .where(and(eq(bookLikesTable.bookId, bookId), eq(bookLikesTable.userId, userId)));
      return res.json({ liked: false });
    } else {
      await db.insert(bookLikesTable).values({ bookId, userId });
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error("POST /books/:id/like error:", err);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

// DELETE /books/:id — auth required, own books only
router.delete("/books/:id", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
  const userId = req.session.userId;
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book id" });

  try {
    const [book] = await db.select().from(booksTable).where(eq(booksTable.id, bookId));
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.userId !== userId) return res.status(403).json({ error: "Not your recommendation" });

    await db.delete(bookLikesTable).where(eq(bookLikesTable.bookId, bookId));
    await db.delete(booksTable).where(eq(booksTable.id, bookId));
    return res.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /books/:id error:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;
