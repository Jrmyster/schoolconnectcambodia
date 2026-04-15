import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, schoolsTable, spaceLeaderboardTable } from "@workspace/db/schema";
import { eq, gt, desc, asc } from "drizzle-orm";

const router = Router();

// ── Provincial leaderboard (existing) ───────────────────────────────────────

router.get("/leaderboard/provincial", async (_req, res) => {
  const rows = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      expPoints: usersTable.expPoints,
      schoolId: usersTable.schoolId,
      province: schoolsTable.province,
    })
    .from(usersTable)
    .leftJoin(schoolsTable, eq(usersTable.schoolId, schoolsTable.id))
    .where(gt(usersTable.expPoints, 0))
    .orderBy(desc(usersTable.expPoints))
    .limit(100);

  const ranked = rows.map((row, idx) => ({
    rank: idx + 1,
    username: row.email.split("@")[0],
    expPoints: row.expPoints,
    province: row.province ?? null,
  }));

  return res.json(ranked);
});

// ── Space Quiz Leaderboard ───────────────────────────────────────────────────

router.post("/leaderboard/space", async (req, res) => {
  try {
    const { nickname, score, completionTimeMs } = req.body;
    if (
      typeof nickname !== "string" ||
      nickname.trim().length < 1 ||
      nickname.trim().length > 30 ||
      typeof score !== "number" ||
      score < 0 ||
      score > 1 ||
      typeof completionTimeMs !== "number" ||
      completionTimeMs < 0
    ) {
      return res.status(400).json({ error: "Invalid submission" });
    }
    const [entry] = await db
      .insert(spaceLeaderboardTable)
      .values({
        nickname: nickname.trim(),
        score: Math.round(score),
        completionTimeMs: Math.round(completionTimeMs),
      })
      .returning();
    return res.status(201).json(entry);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/leaderboard/space", async (_req, res) => {
  const rows = await db
    .select()
    .from(spaceLeaderboardTable)
    .orderBy(desc(spaceLeaderboardTable.score), asc(spaceLeaderboardTable.completionTimeMs))
    .limit(50);

  const ranked = rows.map((row, idx) => ({
    rank: idx + 1,
    nickname: row.nickname,
    score: row.score,
    completionTimeMs: row.completionTimeMs,
    createdAt: row.createdAt,
  }));

  return res.json(ranked);
});

export default router;
