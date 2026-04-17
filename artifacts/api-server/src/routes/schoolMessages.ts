import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  schoolMessagesTable,
  notificationsTable,
  schoolsTable,
  usersTable,
} from "@workspace/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";
import { requireRole } from "../middleware/rbac";

const router: IRouter = Router();

// POST /api/school-messages — one school sends a message to another.
// Creates the message + a "new_message" notification for every user
// affiliated with the recipient school.
router.post("/school-messages", requireRole("school"), async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated." });

  const toSchoolId = Number(req.body?.toSchoolId);
  const subject = typeof req.body?.subject === "string" ? req.body.subject.trim() : "";
  const body = typeof req.body?.body === "string" ? req.body.body.trim() : "";
  // Sender can flag the message category. Falls back to "general" for backward compat.
  const allowedCategories = ["emergency", "surplus", "training", "general"] as const;
  type AllowedCategory = (typeof allowedCategories)[number];
  const rawCategory = typeof req.body?.category === "string" ? req.body.category : "general";
  const category: AllowedCategory = (allowedCategories as readonly string[]).includes(rawCategory)
    ? (rawCategory as AllowedCategory)
    : "general";

  if (!Number.isFinite(toSchoolId)) return res.status(400).json({ error: "toSchoolId is required." });
  if (subject.length < 2 || subject.length > 200) return res.status(400).json({ error: "subject must be 2–200 characters." });
  if (body.length < 5 || body.length > 4000) return res.status(400).json({ error: "body must be 5–4000 characters." });

  const [me] = await db
    .select({ schoolId: usersTable.schoolId })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!me?.schoolId) {
    return res.status(403).json({ error: "Your account must be linked to a school to send messages." });
  }
  if (me.schoolId === toSchoolId) {
    return res.status(400).json({ error: "You cannot send a message to your own school." });
  }

  const [recipient] = await db
    .select({ id: schoolsTable.id, nameEn: schoolsTable.nameEn, nameKh: schoolsTable.nameKh })
    .from(schoolsTable)
    .where(eq(schoolsTable.id, toSchoolId))
    .limit(1);

  if (!recipient) return res.status(404).json({ error: "Recipient school not found." });

  const [sender] = await db
    .select({ nameEn: schoolsTable.nameEn, nameKh: schoolsTable.nameKh })
    .from(schoolsTable)
    .where(eq(schoolsTable.id, me.schoolId))
    .limit(1);

  // Atomically insert the message + fan-out notifications so we never end up
  // with a delivered message and missing alerts (or vice-versa).
  const message = await db.transaction(async (tx) => {
    const [m] = await tx
      .insert(schoolMessagesTable)
      .values({
        fromSchoolId: me.schoolId!,
        toSchoolId,
        senderUserId: userId,
        subject,
        body,
      })
      .returning();

    const recipientUsers = await tx
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.schoolId, toSchoolId));

    if (recipientUsers.length > 0) {
      await tx.insert(notificationsTable).values(
        recipientUsers.map((u) => ({
          recipientId: u.id,
          type: "new_message" as const,
          category,
          titleEn: `New message from ${sender?.nameEn ?? "another school"}`,
          titleKh: `សារថ្មីពី ${sender?.nameKh ?? "សាលាដទៃ"}`,
          bodyEn: subject,
          bodyKh: subject,
          link: "/school-inbox",
        })),
      );
    }

    return m;
  });

  return res.status(201).json(message);
});

// GET /api/school-messages — messages received by the caller's school.
router.get("/school-messages", requireRole("school"), async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated." });

  const [me] = await db
    .select({ schoolId: usersTable.schoolId })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!me?.schoolId) return res.json([]);

  const rows = await db
    .select({
      id: schoolMessagesTable.id,
      fromSchoolId: schoolMessagesTable.fromSchoolId,
      toSchoolId: schoolMessagesTable.toSchoolId,
      subject: schoolMessagesTable.subject,
      body: schoolMessagesTable.body,
      isRead: schoolMessagesTable.isRead,
      createdAt: schoolMessagesTable.createdAt,
      fromSchoolNameEn: schoolsTable.nameEn,
      fromSchoolNameKh: schoolsTable.nameKh,
    })
    .from(schoolMessagesTable)
    .leftJoin(schoolsTable, eq(schoolsTable.id, schoolMessagesTable.fromSchoolId))
    .where(eq(schoolMessagesTable.toSchoolId, me.schoolId))
    .orderBy(desc(schoolMessagesTable.createdAt))
    .limit(50);

  return res.json(rows);
});

// POST /api/school-messages/:id/read — mark inbox item as read.
router.post("/school-messages/:id/read", requireRole("school"), async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated." });
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id." });

  const [me] = await db
    .select({ schoolId: usersTable.schoolId })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!me?.schoolId) return res.status(403).json({ error: "Forbidden." });

  const [row] = await db
    .update(schoolMessagesTable)
    .set({ isRead: true })
    .where(and(eq(schoolMessagesTable.id, id), eq(schoolMessagesTable.toSchoolId, me.schoolId)))
    .returning();

  if (!row) return res.status(404).json({ error: "Not found." });
  // Silence the unused-import warning on `ne` in some configurations.
  void ne;
  return res.json(row);
});

export default router;
