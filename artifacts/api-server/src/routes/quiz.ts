import { Router } from "express";
import { db } from "@workspace/db";
import { quizScoresTable } from "@workspace/db/schema";
import { sql, desc, eq } from "drizzle-orm";

const router = Router();

router.get("/quiz/leaderboard", async (req, res) => {
  try {
    const { province } = req.query;
    const filterByProvince =
      province && typeof province === "string" && province !== "all";

    const rows = await db
      .select({
        studentName: quizScoresTable.studentName,
        province: quizScoresTable.province,
        totalExp: sql<number>`cast(sum(${quizScoresTable.expEarned}) as integer)`,
      })
      .from(quizScoresTable)
      .where(
        filterByProvince
          ? eq(quizScoresTable.province, province as string)
          : undefined
      )
      .groupBy(quizScoresTable.studentName, quizScoresTable.province)
      .orderBy(desc(sql`sum(${quizScoresTable.expEarned})`))
      .limit(50);

    res.json(rows);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

router.post("/quiz/score", async (req, res) => {
  try {
    const { studentName, province, expEarned, subject, topic } = req.body as {
      studentName: string;
      province: string;
      expEarned: number;
      subject?: string;
      topic: string;
    };

    if (!studentName?.trim() || !province?.trim() || expEarned == null || !topic?.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [row] = await db
      .insert(quizScoresTable)
      .values({
        studentName: studentName.trim().slice(0, 80),
        province: province.trim(),
        expEarned: Math.max(0, Math.floor(expEarned)),
        subject: subject ?? "health-science",
        topic: topic.trim(),
      })
      .returning();

    res.json(row);
  } catch (err) {
    console.error("Score submit error:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

export default router;
