import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { notificationsTable } from "@workspace/db/schema";
import { eq, and, desc, count } from "drizzle-orm";

const router: IRouter = Router();

// GET /api/notifications — recent notifications + unread count for the caller.
router.get("/notifications", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
  const userId = req.session.userId;

  const items = await db
    .select()
    .from(notificationsTable)
    .where(eq(notificationsTable.recipientId, userId))
    .orderBy(desc(notificationsTable.createdAt))
    .limit(20);

  const [{ unread }] = await db
    .select({ unread: count() })
    .from(notificationsTable)
    .where(and(eq(notificationsTable.recipientId, userId), eq(notificationsTable.isRead, false)));

  return res.json({ items, unread });
});

// POST /api/notifications/:id/read — mark a single notification as read.
router.post("/notifications/:id/read", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id." });

  const [row] = await db
    .update(notificationsTable)
    .set({ isRead: true })
    .where(
      and(
        eq(notificationsTable.id, id),
        eq(notificationsTable.recipientId, req.session.userId),
      ),
    )
    .returning();

  if (!row) return res.status(404).json({ error: "Not found." });
  return res.json(row);
});

// POST /api/notifications/read-all — mark every notification as read.
router.post("/notifications/read-all", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
  await db
    .update(notificationsTable)
    .set({ isRead: true })
    .where(eq(notificationsTable.recipientId, req.session.userId));
  return res.json({ ok: true });
});

export default router;
