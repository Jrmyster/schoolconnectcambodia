import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { completedProjectsTable, schoolsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  ListCompletedProjectsQueryParams,
  CreateCompletedProjectBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/completed-projects", async (req, res) => {
  try {
    const query = ListCompletedProjectsQueryParams.parse(req.query);

    const baseQuery = db
      .select({
        id: completedProjectsTable.id,
        needId: completedProjectsTable.needId,
        schoolId: completedProjectsTable.schoolId,
        titleEn: completedProjectsTable.titleEn,
        titleKh: completedProjectsTable.titleKh,
        descriptionEn: completedProjectsTable.descriptionEn,
        descriptionKh: completedProjectsTable.descriptionKh,
        thankYouPhotoUrl: completedProjectsTable.thankYouPhotoUrl,
        category: completedProjectsTable.category,
        completedAt: completedProjectsTable.completedAt,
        createdAt: completedProjectsTable.createdAt,
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
      .from(completedProjectsTable)
      .leftJoin(schoolsTable, eq(completedProjectsTable.schoolId, schoolsTable.id));

    const projects = query.province
      ? await baseQuery.where(eq(schoolsTable.province, query.province))
      : await baseQuery;

    res.json(projects);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

router.post("/completed-projects", async (req, res) => {
  try {
    const body = CreateCompletedProjectBody.parse(req.body);
    const [project] = await db
      .insert(completedProjectsTable)
      .values({
        ...body,
        completedAt: new Date(body.completedAt),
      })
      .returning();
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

export default router;
