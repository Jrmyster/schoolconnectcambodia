import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq, like, asc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../middleware/rbac";

const router: IRouter = Router();

/* ══════════════════════════════════════════════════════════════════════════
 * Admin endpoints for the Teacher dashboard.
 *
 * All routes are gated by `requireAdmin` (i.e. `users.is_admin = true`).
 *
 * Student-PIN accounts are detected by the synthetic email suffix the
 * frontend appends: `<username>@student.schoolconnect.local`.
 * ══════════════════════════════════════════════════════════════════════════ */

const STUDENT_DOMAIN = "student.schoolconnect.local";
const STUDENT_EMAIL_SUFFIX = `@${STUDENT_DOMAIN}`;
const PIN_REGEX = /^\d{4}$/;

/** GET /admin/students — list every student-PIN account. */
router.get("/admin/students", requireAdmin, async (_req, res) => {
  try {
    const rows = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        schoolId: usersTable.schoolId,
        expPoints: usersTable.expPoints,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(like(usersTable.email, `%${STUDENT_EMAIL_SUFFIX}`))
      .orderBy(asc(usersTable.email));

    const students = rows.map((r) => ({
      id: r.id,
      username: r.email.slice(0, -STUDENT_EMAIL_SUFFIX.length),
      schoolId: r.schoolId,
      expPoints: r.expPoints,
      createdAt: r.createdAt,
    }));

    res.json(students);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

/** POST /admin/students/:id/reset-pin — assign a brand-new 4-digit PIN. */
router.post("/admin/students/:id/reset-pin", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid student id." });
    }

    const { pin } = req.body as { pin?: string };
    if (typeof pin !== "string" || !PIN_REGEX.test(pin)) {
      return res
        .status(400)
        .json({ error: "PIN must be exactly 4 digits (0–9)." });
    }

    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "Student not found." });

    // Safety: an admin should never accidentally turn an email-account
    // password into a 4-digit PIN.
    if (!user.email.toLowerCase().endsWith(STUDENT_EMAIL_SUFFIX)) {
      return res.status(400).json({
        error:
          "This account uses an email and password — use the regular reset flow instead.",
      });
    }

    const passwordHash = await bcrypt.hash(pin, 12);
    await db
      .update(usersTable)
      .set({ passwordHash })
      .where(eq(usersTable.id, id));

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
