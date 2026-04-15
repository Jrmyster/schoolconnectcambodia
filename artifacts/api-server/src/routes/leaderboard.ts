import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { schoolsTable } from "@workspace/db/schema";
import { eq, gt, desc } from "drizzle-orm";

const router = Router();

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

export default router;
