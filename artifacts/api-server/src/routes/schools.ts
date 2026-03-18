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
