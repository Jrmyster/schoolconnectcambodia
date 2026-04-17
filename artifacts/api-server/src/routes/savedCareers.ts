import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { savedCareersTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { requireRole } from "../middleware/rbac";

const router: IRouter = Router();

router.get("/saved-careers", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
  try {
    const rows = await db
      .select()
      .from(savedCareersTable)
      .where(eq(savedCareersTable.userId, req.session.userId));
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.post("/saved-careers", requireRole("student"), async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
  const { majorKey, careerKey } = req.body as { majorKey?: string; careerKey?: string };
  if (!majorKey || !careerKey) {
    return res.status(400).json({ error: "majorKey and careerKey are required." });
  }
  try {
    const [row] = await db
      .insert(savedCareersTable)
      .values({ userId: req.session.userId, majorKey, careerKey })
      .onConflictDoNothing()
      .returning();
    res.status(201).json(row ?? { userId: req.session.userId, majorKey, careerKey, savedAt: new Date() });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.delete("/saved-careers", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
  const { majorKey, careerKey } = req.body as { majorKey?: string; careerKey?: string };
  if (!majorKey || !careerKey) {
    return res.status(400).json({ error: "majorKey and careerKey are required." });
  }
  try {
    await db
      .delete(savedCareersTable)
      .where(
        and(
          eq(savedCareersTable.userId, req.session.userId),
          eq(savedCareersTable.majorKey, majorKey),
          eq(savedCareersTable.careerKey, careerKey),
        ),
      );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
