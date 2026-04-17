import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { schoolsTable, insertSchoolSchema } from "@workspace/db/schema";
import { ilike, eq, or, and } from "drizzle-orm";
import {
  ListSchoolsQueryParams,
  CreateSchoolBody,
  GetSchoolParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/schools", async (req, res) => {
  try {
    const query = ListSchoolsQueryParams.parse(req.query);
    const conditions: any[] = [];
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
    // Filter out schools that have hidden themselves from the public map,
    // unless the caller is an admin OR the owner of that school.
    const includeHidden = req.query.includeHidden === "true";
    if (!includeHidden) {
      conditions.push(eq(schoolsTable.hideFromMap, false));
    }
    const where =
      conditions.length === 0
        ? undefined
        : conditions.length === 1
        ? conditions[0]
        : and(...conditions);
    const schools = where
      ? await db.select().from(schoolsTable).where(where)
      : await db.select().from(schoolsTable);
    res.json(schools);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.post("/schools", async (req, res) => {
  try {
    // Authorization: only admins may create new school records.
    const { db: dbInstance } = await import("@workspace/db");
    const { usersTable } = await import("@workspace/db/schema");
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated." });
    const [me] = await dbInstance.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (!me) return res.status(401).json({ error: "Session expired." });
    if (!me.isAdmin) {
      return res.status(403).json({ error: "Only administrators may create schools." });
    }

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

    // Authorization: only the school's own user, or an admin, may edit.
    const { db: dbInstance } = await import("@workspace/db");
    const { usersTable } = await import("@workspace/db/schema");
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated." });
    const [me] = await dbInstance.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (!me) return res.status(401).json({ error: "Session expired." });
    const isOwner = me.schoolId === id && me.role === "school";
    if (!me.isAdmin && !isOwner) {
      return res.status(403).json({ error: "You can only modify your own school." });
    }

    const allowed = [
      "nameEn","nameKh","province","district","description",
      "contactEmail","contactPhone","studentCount","photoUrl","latitude","longitude",
      "hideFromMap",
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

// PATCH /schools/:id — partial update (used by school dashboard for the
// "show/hide on public map" toggle). Only the school's own users (or admins)
// may modify their record.
router.patch("/schools/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const { db: dbInstance } = await import("@workspace/db");
    const { usersTable } = await import("@workspace/db/schema");
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated." });
    const [me] = await dbInstance.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (!me) return res.status(401).json({ error: "Session expired." });
    const isOwner = me.schoolId === id && me.role === "school";
    if (!me.isAdmin && !isOwner) {
      return res.status(403).json({ error: "You can only modify your own school." });
    }

    const allowed = ["hideFromMap"];
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
