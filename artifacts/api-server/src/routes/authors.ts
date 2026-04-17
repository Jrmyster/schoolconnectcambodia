import { Router } from "express";
import { db } from "@workspace/db";
import { authorOfMonthTable, challengeCompletionsTable, userBadgesTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { requireRole } from "../middleware/rbac";

const router = Router();

// GET /authors-of-month — public, returns all authors sorted by current first, then newest
router.get("/authors-of-month", async (_req, res) => {
  try {
    const authors = await db
      .select()
      .from(authorOfMonthTable)
      .orderBy(authorOfMonthTable.isCurrent, authorOfMonthTable.year, authorOfMonthTable.month);

    const sorted = [...authors].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    });

    res.json(sorted);
  } catch (err) {
    console.error("GET /authors-of-month error:", err);
    res.status(500).json({ error: "Failed to fetch authors" });
  }
});

// GET /challenges/:challengeId/completion — returns completion status for current user
router.get("/challenges/:challengeId/completion", async (req, res) => {
  const userId = req.session.userId ?? null;
  const { challengeId } = req.params;

  if (!userId) return res.json({ completed: false });

  try {
    const rows = await db
      .select()
      .from(challengeCompletionsTable)
      .where(
        and(
          eq(challengeCompletionsTable.userId, userId),
          eq(challengeCompletionsTable.challengeId, challengeId)
        )
      );
    res.json({ completed: rows.length > 0 });
  } catch (err) {
    console.error("GET /challenges/:id/completion error:", err);
    res.status(500).json({ error: "Failed to check completion" });
  }
});

// POST /challenges/:challengeId/complete — auth required, marks complete and awards badge
router.post("/challenges/:challengeId/complete", requireRole("student"), async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "You must be logged in to complete a challenge" });
  }
  const userId = req.session.userId;
  const { challengeId } = req.params;

  try {
    // Find the author with this challenge to get the badge type
    const [author] = await db
      .select({ challengeBadge: authorOfMonthTable.challengeBadge })
      .from(authorOfMonthTable)
      .where(eq(authorOfMonthTable.challengeId, challengeId));

    if (!author) return res.status(404).json({ error: "Challenge not found" });

    // Check if already completed
    const existing = await db
      .select()
      .from(challengeCompletionsTable)
      .where(
        and(
          eq(challengeCompletionsTable.userId, userId),
          eq(challengeCompletionsTable.challengeId, challengeId)
        )
      );

    if (existing.length > 0) {
      return res.json({ completed: true, badgeAwarded: false, alreadyDone: true });
    }

    // Mark complete
    await db.insert(challengeCompletionsTable).values({ userId, challengeId });

    // Award badge if defined (idempotent — ignore duplicate)
    let badgeAwarded = false;
    if (author.challengeBadge) {
      const existingBadge = await db
        .select()
        .from(userBadgesTable)
        .where(
          and(
            eq(userBadgesTable.userId, userId),
            eq(userBadgesTable.badgeType, author.challengeBadge)
          )
        );
      if (existingBadge.length === 0) {
        await db.insert(userBadgesTable).values({ userId, badgeType: author.challengeBadge });
        badgeAwarded = true;
      }
    }

    return res.json({ completed: true, badgeAwarded, badge: author.challengeBadge });
  } catch (err) {
    console.error("POST /challenges/:id/complete error:", err);
    res.status(500).json({ error: "Failed to mark challenge complete" });
  }
});

export default router;
