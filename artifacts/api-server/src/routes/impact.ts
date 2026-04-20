import { Router } from "express";
import { db } from "@workspace/db";
import {
  quizCompletionsTable,
  needsTable,
  completedProjectsTable,
  schoolsTable,
} from "@workspace/db/schema";
import { eq, count, desc, sql } from "drizzle-orm";

const router = Router();

const VALID_CURIOSITY = new Set(["nature", "tech", "society", "communication"]);
const VALID_LEVEL = new Set(["beginner", "advanced"]);
const VALID_GOAL = new Set(["community", "exams", "career"]);

// Simple in-memory rate limiter for the anonymous quiz-completions endpoint.
// Prevents spamming to inflate "Students Guided" stats.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 5;
const rateBuckets = new Map<string, number[]>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const arr = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX_PER_WINDOW) {
    rateBuckets.set(ip, arr);
    return false;
  }
  arr.push(now);
  rateBuckets.set(ip, arr);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (rateBuckets.size > 5000) {
    for (const [key, value] of rateBuckets) {
      const fresh = value.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) rateBuckets.delete(key);
      else rateBuckets.set(key, fresh);
    }
  }
  return true;
}

router.post("/quiz-completions", async (req, res) => {
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  if (!checkRate(ip)) {
    return res.status(429).json({ error: "Too many quiz completions. Please slow down." });
  }

  const { curiosity, level, goal } = (req.body ?? {}) as {
    curiosity?: string;
    level?: string;
    goal?: string;
  };

  if (
    typeof curiosity !== "string" ||
    typeof level !== "string" ||
    typeof goal !== "string" ||
    !VALID_CURIOSITY.has(curiosity) ||
    !VALID_LEVEL.has(level) ||
    !VALID_GOAL.has(goal)
  ) {
    return res.status(400).json({ error: "Invalid quiz completion payload" });
  }

  const [row] = await db
    .insert(quizCompletionsTable)
    .values({ curiosity, level, goal })
    .returning({ id: quizCompletionsTable.id });

  return res.status(201).json({ id: row.id });
});

router.get("/impact-stats", async (_req, res) => {
  // 1) Vital signs counters
  const [{ studentsGuided }] = await db
    .select({ studentsGuided: count() })
    .from(quizCompletionsTable);

  const [{ activeNeeds }] = await db
    .select({ activeNeeds: count() })
    .from(needsTable)
    .where(eq(needsTable.status, "active"));

  const [{ projectsCompleted }] = await db
    .select({ projectsCompleted: count() })
    .from(completedProjectsTable);

  // 2) Learning trends — group quiz curiosity choices into 4 buckets
  const grouped = await db
    .select({
      curiosity: quizCompletionsTable.curiosity,
      total: count(),
    })
    .from(quizCompletionsTable)
    .groupBy(quizCompletionsTable.curiosity);

  const bucketMap: Record<string, number> = {
    technology: 0,
    science: 0,
    english: 0,
    "philosophy/sociology": 0,
  };
  for (const row of grouped) {
    if (row.curiosity === "tech") bucketMap.technology += Number(row.total);
    else if (row.curiosity === "nature") bucketMap.science += Number(row.total);
    else if (row.curiosity === "communication") bucketMap.english += Number(row.total);
    else if (row.curiosity === "society") bucketMap["philosophy/sociology"] += Number(row.total);
  }

  const learningTrends = [
    { key: "technology", labelEn: "Technology", labelKh: "បច្ចេកវិទ្យា", count: bucketMap.technology },
    { key: "science", labelEn: "Science", labelKh: "វិទ្យាសាស្ត្រ", count: bucketMap.science },
    { key: "english", labelEn: "English", labelKh: "អង់គ្លេស", count: bucketMap.english },
    {
      key: "philosophy-sociology",
      labelEn: "Philosophy/Sociology",
      labelKh: "ទស្សនវិជ្ជា/សង្គមវិទ្យា",
      count: bucketMap["philosophy/sociology"],
    },
  ];

  // 3) Live impact feed — recent successes blended from completed projects + recent quiz milestones
  const recentProjects = await db
    .select({
      id: completedProjectsTable.id,
      titleEn: completedProjectsTable.titleEn,
      titleKh: completedProjectsTable.titleKh,
      schoolName: schoolsTable.nameEn,
      schoolNameKh: schoolsTable.nameKh,
      completedAt: completedProjectsTable.completedAt,
    })
    .from(completedProjectsTable)
    .leftJoin(schoolsTable, eq(completedProjectsTable.schoolId, schoolsTable.id))
    .orderBy(desc(completedProjectsTable.completedAt))
    .limit(8);

  // Bundle quiz completions by day for the last 14 days
  const dailyQuizzes = await db
    .select({
      day: sql<string>`DATE(${quizCompletionsTable.completedAt})`.as("day"),
      total: count(),
    })
    .from(quizCompletionsTable)
    .groupBy(sql`DATE(${quizCompletionsTable.completedAt})`)
    .orderBy(desc(sql`DATE(${quizCompletionsTable.completedAt})`))
    .limit(7);

  const feed: Array<{
    id: string;
    type: "project" | "quiz";
    timestamp: string;
    en: string;
    kh: string;
  }> = [];

  for (const p of recentProjects) {
    feed.push({
      id: `project-${p.id}`,
      type: "project",
      timestamp: p.completedAt.toISOString(),
      en: `${p.schoolName ?? "A school"} successfully received: ${p.titleEn}.`,
      kh: `${p.schoolNameKh ?? "សាលាមួយ"} បានទទួលដោយជោគជ័យ៖ ${p.titleKh}។`,
    });
  }
  for (const d of dailyQuizzes) {
    if (Number(d.total) <= 0) continue;
    feed.push({
      id: `quiz-${d.day}`,
      type: "quiz",
      timestamp: new Date(`${d.day}T12:00:00Z`).toISOString(),
      en: `${d.total} student${Number(d.total) === 1 ? "" : "s"} completed the Learning Path Discovery Quiz.`,
      kh: `សិស្ស ${d.total} នាក់ បានបញ្ចប់កម្រងសំណួរស្វែងរកផ្លូវសិក្សា។`,
    });
  }

  feed.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return res.json({
    vitalSigns: {
      studentsGuided: Number(studentsGuided),
      activeNeeds: Number(activeNeeds),
      projectsCompleted: Number(projectsCompleted),
    },
    learningTrends,
    feed: feed.slice(0, 14),
    generatedAt: new Date().toISOString(),
  });
});

export default router;
