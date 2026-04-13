import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { storiesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const CURRENT_YEAR = new Date().getFullYear();

function validateStoryBody(body: unknown): { error: string } | {
  fullName: string;
  graduationYear: number;
  profession: string;
  story: string;
  photoUrl?: string;
} {
  if (!body || typeof body !== "object") return { error: "Request body must be a JSON object" };
  const b = body as Record<string, unknown>;

  if (typeof b.fullName !== "string" || !b.fullName.trim())
    return { error: "fullName is required and must be a non-empty string" };
  if (b.fullName.trim().length > 200)
    return { error: "fullName must be 200 characters or fewer" };

  const graduationYear = Number(b.graduationYear);
  if (!Number.isInteger(graduationYear) || graduationYear < 1990 || graduationYear > CURRENT_YEAR)
    return { error: `graduationYear must be an integer between 1990 and ${CURRENT_YEAR}` };

  if (typeof b.profession !== "string" || !b.profession.trim())
    return { error: "profession is required and must be a non-empty string" };
  if (b.profession.trim().length > 300)
    return { error: "profession must be 300 characters or fewer" };

  if (typeof b.story !== "string" || b.story.trim().length < 10)
    return { error: "story must be at least 10 characters" };
  if (b.story.trim().length > 5000)
    return { error: "story must be 5000 characters or fewer" };

  const photoUrl = typeof b.photoUrl === "string" && b.photoUrl.trim() ? b.photoUrl.trim() : undefined;

  return {
    fullName: b.fullName.trim(),
    graduationYear,
    profession: b.profession.trim(),
    story: b.story.trim(),
    ...(photoUrl ? { photoUrl } : {}),
  };
}

router.get("/stories", async (req, res) => {
  try {
    const status = (req.query.status as string) || "approved";
    const allowed = ["pending", "approved", "rejected"] as const;
    if (!allowed.includes(status as (typeof allowed)[number])) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const rows = await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.status, status as (typeof allowed)[number]))
      .orderBy(storiesTable.createdAt);
    res.json(rows);
  } catch (err) {
    console.error("GET /stories error:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

router.post("/stories", async (req, res) => {
  try {
    const validated = validateStoryBody(req.body);
    if ("error" in validated) {
      return res.status(400).json({ error: validated.error });
    }
    const { fullName, graduationYear, profession, story, photoUrl } = validated;
    const [inserted] = await db
      .insert(storiesTable)
      .values({
        fullName,
        graduationYear,
        profession,
        story,
        photoUrl: photoUrl ?? null,
        status: "pending",
      })
      .returning();
    res.status(201).json(inserted);
  } catch (err) {
    console.error("POST /stories error:", err);
    res.status(500).json({ error: "Failed to save story" });
  }
});

export default router;
