import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { userBadgesTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { requireRole } from "../middleware/rbac";

const router: IRouter = Router();

// Badges that the client can self-trigger (interaction-based achievements).
// Conditions are encoded as boolean side-effects on the page itself
// (e.g. opening the SpacePage = "interacted with astronomy").
// Server-side counted badges (truth-seeker, knowledge-sharer) live in their
// respective routes and cannot be self-awarded here.
const SELF_AWARDABLE = new Set<string>([
  "galactic-explorer",
  "financial-wizard",
]);

router.get("/achievements", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
  const rows = await db
    .select()
    .from(userBadgesTable)
    .where(eq(userBadgesTable.userId, req.session.userId));
  return res.json(rows);
});

router.post("/achievements/award", requireRole("student"), async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated." });

    const badgeType = typeof req.body?.badgeType === "string" ? req.body.badgeType.trim() : "";
    if (!SELF_AWARDABLE.has(badgeType)) {
      return res.status(400).json({ error: "This badge cannot be self-awarded." });
    }

    // Atomic, idempotent insert. Relies on the unique index on
    // (user_id, badge_type) — concurrent requests cannot create duplicates.
    const inserted = await db
      .insert(userBadgesTable)
      .values({ userId, badgeType })
      .onConflictDoNothing({
        target: [userBadgesTable.userId, userBadgesTable.badgeType],
      })
      .returning();

    if (inserted.length > 0) {
      return res.status(201).json({ awarded: true, alreadyEarned: false, badge: inserted[0] });
    }
    const [existing] = await db
      .select()
      .from(userBadgesTable)
      .where(and(eq(userBadgesTable.userId, userId), eq(userBadgesTable.badgeType, badgeType)))
      .limit(1);
    return res.json({ awarded: false, alreadyEarned: true, badge: existing });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
});

export default router;
