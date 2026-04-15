import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.post("/quiz/complete", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  const { score, total } = req.body as { score: number; total: number };

  if (typeof score !== "number" || typeof total !== "number" || total <= 0) {
    return res.status(400).json({ error: "Invalid score/total" });
  }

  const expEarned = score * 10 + (score === total ? 5 : 0);

  const result = await db
    .update(usersTable)
    .set({ expPoints: sql`exp_points + ${expEarned}` })
    .where(eq(usersTable.id, req.session.userId))
    .returning({ expPoints: usersTable.expPoints });

  return res.json({ expEarned, totalExp: result[0]?.expPoints ?? 0 });
});

export default router;
