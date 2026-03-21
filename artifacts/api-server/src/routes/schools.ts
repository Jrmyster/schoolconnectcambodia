import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { schoolsTable, insertSchoolSchema } from "@workspace/db/schema";
import { ilike, eq, or } from "drizzle-orm";
import {
  ListSchoolsQueryParams,
  CreateSchoolBody,
  GetSchoolParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/schools", async (req, res) => {
  try {
    const query = ListSchoolsQueryParams.parse(req.query);
    const conditions = [];
    if (query.province) {
      conditions.push(eq(schoolsTable.province, query.province));
    }
    if (query.search) {
      conditions.push(
        or(
          ilike(schoolsTable.nameEn, `%${query.search}%`),
          ilike(schoolsTable.nameKh, `%${query.search}%`),
          ilike(schoolsTable.district, `%${query.search}%`)
        )
      );
    }
    const schools =
      conditions.length > 0
        ? await db.select().from(schoolsTable).where(conditions.length === 1 ? conditions[0] : conditions.reduce((a, b) => or(a, b) as any))
        : await db.select().from(schoolsTable);
    res.json(schools);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.post("/schools", async (req, res) => {
  try {
    const body = CreateSchoolBody.parse(req.body);
    const [school] = await db.insert(schoolsTable).values(body).returning();
    res.status(201).json(school);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.get("/schools/:id", async (req, res) => {
  try {
    const { id } = GetSchoolParams.parse(req.params);
    const [school] = await db.select().from(schoolsTable).where(eq(schoolsTable.id, id));
    if (!school) return res.status(404).json({ error: "School not found" });
    res.json(school);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.put("/schools/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const allowed = [
      "nameEn","nameKh","province","district","description",
      "contactEmail","contactPhone","studentCount","photoUrl","latitude","longitude",
    ];
    const update: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }
    if (Object.keys(update).length === 0) return res.status(400).json({ error: "No fields to update" });
    const [school] = await db.update(schoolsTable).set(update).where(eq(schoolsTable.id, id)).returning();
    if (!school) return res.status(404).json({ error: "School not found" });
    res.json(school);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.get("/provinces", async (_req, res) => {
  try {
    const result = await db
      .selectDistinct({ province: schoolsTable.province })
      .from(schoolsTable)
      .orderBy(schoolsTable.province);
    res.json(result.map((r) => r.province));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
