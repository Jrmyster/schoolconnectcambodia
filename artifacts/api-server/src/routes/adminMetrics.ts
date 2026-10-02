import { Router } from "express";
import { db } from "@workspace/db";
import { storiesTable, schoolMessagesTable } from "@workspace/db/schema";
import { count, gte, eq } from "drizzle-orm";
import { requireAdmin } from "../middleware/rbac";
const router = Router();
async function metrics() {
  const since = new Date(Date.now() - 7 * 86400000);
  const [[pending], [stories], [messages]] = await Promise.all([
    db
      .select({ c: count() })
      .from(storiesTable)
      .where(eq(storiesTable.status, "pending")),
    db
      .select({ c: count() })
      .from(storiesTable)
      .where(gte(storiesTable.createdAt, since)),
    db
      .select({ c: count() })
      .from(schoolMessagesTable)
      .where(gte(schoolMessagesTable.createdAt, since)),
  ]);
  return {
    pendingStories: pending.c,
    newStoriesThisWeek: stories.c,
    messagesThisWeek: messages.c,
    weekStart: since.toISOString(),
  };
}
router.get("/admin/weekly-metrics", requireAdmin, async (_req, res) => {
  try {
    res.json(await metrics());
  } catch {
    res.status(500).json({ error: "Failed to load network metrics" });
  }
});
router.post("/admin/weekly-summary", requireAdmin, async (_req, res) => {
  try {
    const m = await metrics();
    res.json({
      summary:
        "This week: " +
        m.newStoriesThisWeek +
        " new stories and " +
        m.messagesThisWeek +
        " school messages. Awaiting review: " +
        m.pendingStories +
        " alumni stories.",
    });
  } catch {
    res.status(500).json({ error: "Failed to prepare weekly summary" });
  }
});
export default router;
