import { Router } from "express";
import { db } from "@workspace/db";
import { skepticCompletionsTable, userBadgesTable } from "@workspace/db/schema";
import { eq, and, count } from "drizzle-orm";
import { requireRole } from "../middleware/rbac";

const router = Router();

const BADGE_TYPE = "truth-seeker";
const BADGE_THRESHOLD = 15;

router.get("/skeptic/status", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
  const userId = req.session.userId;

  const completions = await db
    .select({ challengeId: skepticCompletionsTable.challengeId })
    .from(skepticCompletionsTable)
    .where(eq(skepticCompletionsTable.userId, userId));

  const badges = await db
    .select()
    .from(userBadgesTable)
    .where(
      and(
        eq(userBadgesTable.userId, userId),
        eq(userBadgesTable.badgeType, BADGE_TYPE)
      )
    );

  return res.json({
    completedIds: completions.map((c) => c.challengeId),
    hasBadge: badges.length > 0,
    completionCount: completions.length,
  });
});

router.post("/skeptic/complete", requireRole("student"), async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
  const userId = req.session.userId;

  const { challengeId } = req.body;
  if (typeof challengeId !== "string" || challengeId.trim().length === 0) {
    return res.status(400).json({ error: "Invalid challengeId" });
  }

  const existing = await db
    .select()
    .from(skepticCompletionsTable)
    .where(
      and(
        eq(skepticCompletionsTable.userId, userId),
        eq(skepticCompletionsTable.challengeId, challengeId.trim())
      )
    );

  if (existing.length === 0) {
    await db.insert(skepticCompletionsTable).values({
      userId,
      challengeId: challengeId.trim(),
    });
  }

  const [{ total }] = await db
    .select({ total: count() })
    .from(skepticCompletionsTable)
    .where(eq(skepticCompletionsTable.userId, userId));

  let badgeJustAwarded = false;
  if (total >= BADGE_THRESHOLD) {
    const hasBadge = await db
      .select()
      .from(userBadgesTable)
      .where(
        and(
          eq(userBadgesTable.userId, userId),
          eq(userBadgesTable.badgeType, BADGE_TYPE)
        )
      );
    if (hasBadge.length === 0) {
      await db.insert(userBadgesTable).values({ userId, badgeType: BADGE_TYPE });
      badgeJustAwarded = true;
    }
  }

  return res.json({
    completionCount: total,
    badgeJustAwarded,
    hasBadge: total >= BADGE_THRESHOLD,
  });
});

router.get("/badges", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
  const badges = await db
    .select()
    .from(userBadgesTable)
    .where(eq(userBadgesTable.userId, req.session.userId));
  return res.json(badges);
});

export default router;
