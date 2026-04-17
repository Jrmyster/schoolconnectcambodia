import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { needsTable, schoolsTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import {
  ListNeedsQueryParams,
  CreateNeedBody,
  GetNeedParams,
  UpdateNeedFundingParams,
  UpdateNeedFundingBody,
} from "@workspace/api-zod";
import { requireRole } from "../middleware/rbac";
import { usersTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/needs", async (req, res) => {
  try {
    const query = ListNeedsQueryParams.parse(req.query);
    const conditions = [];
    if (query.category) conditions.push(eq(needsTable.category, query.category as any));
    if (query.schoolId) conditions.push(eq(needsTable.schoolId, query.schoolId));

    let needsQuery = db
      .select({
        id: needsTable.id,
        schoolId: needsTable.schoolId,
        titleEn: needsTable.titleEn,
        titleKh: needsTable.titleKh,
        descriptionEn: needsTable.descriptionEn,
        descriptionKh: needsTable.descriptionKh,
        category: needsTable.category,
        photoUrl: needsTable.photoUrl,
        goalAmount: needsTable.goalAmount,
        fundedAmount: needsTable.fundedAmount,
        status: needsTable.status,
        contactEmail: needsTable.contactEmail,
        createdAt: needsTable.createdAt,
        school: {
          id: schoolsTable.id,
          nameEn: schoolsTable.nameEn,
          nameKh: schoolsTable.nameKh,
          province: schoolsTable.province,
          district: schoolsTable.district,
          latitude: schoolsTable.latitude,
          longitude: schoolsTable.longitude,
          photoUrl: schoolsTable.photoUrl,
          contactEmail: schoolsTable.contactEmail,
          contactPhone: schoolsTable.contactPhone,
          description: schoolsTable.description,
          studentCount: schoolsTable.studentCount,
          createdAt: schoolsTable.createdAt,
        },
      })
      .from(needsTable)
      .leftJoin(schoolsTable, eq(needsTable.schoolId, schoolsTable.id));

    let needs;
    if (query.province) {
      const provinceCondition = eq(schoolsTable.province, query.province);
      needs = await (conditions.length > 0
        ? needsQuery.where(and(provinceCondition, ...conditions))
        : needsQuery.where(provinceCondition));
    } else {
      needs = await (conditions.length > 0
        ? needsQuery.where(and(...conditions))
        : needsQuery);
    }

    res.json(needs);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.post("/needs", requireRole("school"), async (req, res) => {
  try {
    const body = CreateNeedBody.parse(req.body);

    // Bind schoolId to the authenticated user's own school (prevent IDOR).
    // Admin accounts may create needs for any school via body.schoolId.
    const [me] = await db
      .select({ schoolId: usersTable.schoolId, isAdmin: usersTable.isAdmin })
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId!))
      .limit(1);

    if (!me) return res.status(401).json({ error: "Session expired." });

    let effectiveSchoolId = body.schoolId;
    if (!me.isAdmin) {
      if (!me.schoolId) {
        return res.status(403).json({
          error: "Your account is not linked to a school. Please link a school in your profile first.",
        });
      }
      effectiveSchoolId = me.schoolId;
    }

    const [need] = await db.insert(needsTable).values({
      ...body,
      schoolId: effectiveSchoolId,
      fundedAmount: 0,
      status: "active",
    }).returning();
    res.status(201).json(need);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.get("/needs/:id", async (req, res) => {
  try {
    const { id } = GetNeedParams.parse(req.params);
    const [need] = await db
      .select({
        id: needsTable.id,
        schoolId: needsTable.schoolId,
        titleEn: needsTable.titleEn,
        titleKh: needsTable.titleKh,
        descriptionEn: needsTable.descriptionEn,
        descriptionKh: needsTable.descriptionKh,
        category: needsTable.category,
        photoUrl: needsTable.photoUrl,
        goalAmount: needsTable.goalAmount,
        fundedAmount: needsTable.fundedAmount,
        status: needsTable.status,
        contactEmail: needsTable.contactEmail,
        createdAt: needsTable.createdAt,
        school: {
          id: schoolsTable.id,
          nameEn: schoolsTable.nameEn,
          nameKh: schoolsTable.nameKh,
          province: schoolsTable.province,
          district: schoolsTable.district,
          latitude: schoolsTable.latitude,
          longitude: schoolsTable.longitude,
          photoUrl: schoolsTable.photoUrl,
          contactEmail: schoolsTable.contactEmail,
          contactPhone: schoolsTable.contactPhone,
          description: schoolsTable.description,
          studentCount: schoolsTable.studentCount,
          createdAt: schoolsTable.createdAt,
        },
      })
      .from(needsTable)
      .leftJoin(schoolsTable, eq(needsTable.schoolId, schoolsTable.id))
      .where(eq(needsTable.id, id));
    if (!need) return res.status(404).json({ error: "Need not found" });
    res.json(need);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.put("/needs/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const allowed = [
      "titleEn","titleKh","descriptionEn","descriptionKh",
      "category","goalAmount","contactEmail","photoUrl",
    ];
    const update: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }
    if (Object.keys(update).length === 0) return res.status(400).json({ error: "No fields to update" });
    const [need] = await db.update(needsTable).set(update).where(eq(needsTable.id, id)).returning();
    if (!need) return res.status(404).json({ error: "Need not found" });
    res.json(need);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.patch("/needs/:id", async (req, res) => {
  try {
    const { id } = UpdateNeedFundingParams.parse(req.params);
    const body = UpdateNeedFundingBody.parse(req.body);

    const updateData: Record<string, any> = { fundedAmount: body.fundedAmount };
    if (body.status) updateData.status = body.status;

    const [need] = await db
      .update(needsTable)
      .set(updateData)
      .where(eq(needsTable.id, id))
      .returning();
    if (!need) return res.status(404).json({ error: "Need not found" });
    res.json(need);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

export default router;
