import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";
import { db } from "@workspace/db";
import { usersTable, schoolsTable, passwordResetTokensTable } from "@workspace/db/schema";
import { eq, and, gt, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";

const router: IRouter = Router();

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

// Synthetic email suffix used by the student Username + PIN flow.
// Anything ending with this suffix is a "student-PIN" account, which
// uses a 4-digit PIN instead of a 6+ char password.
const STUDENT_EMAIL_SUFFIX = "@student.schoolconnect.local";
const STUDENT_USERNAME_REGEX = /^[a-z0-9_]{3,32}$/;
const STUDENT_PIN_REGEX = /^\d{4}$/;

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, schoolId, role } = req.body as { email?: string; password?: string; schoolId?: number; role?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const normalizedEmail = email.toLowerCase();
    const isStudentPin = normalizedEmail.endsWith(STUDENT_EMAIL_SUFFIX);

    if (isStudentPin) {
      const localPart = normalizedEmail.slice(0, -STUDENT_EMAIL_SUFFIX.length);
      if (!STUDENT_USERNAME_REGEX.test(localPart)) {
        return res.status(400).json({
          error: "Username must be 3–32 characters: letters, digits, or underscore (_).",
        });
      }
      if (!STUDENT_PIN_REGEX.test(password)) {
        return res.status(400).json({ error: "PIN must be exactly 4 digits (0–9)." });
      }
    } else {
      if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // A synthetic student-PIN email is reserved for the `student` role —
    // refuse direct API attempts to register a "school" account with a 4-digit PIN.
    const normalizedRole = isStudentPin
      ? "student"
      : role === "school"
        ? "school"
        : role === "student"
          ? "student"
          : null;
    if (!normalizedRole) return res.status(400).json({ error: "Please select an account type (Student or School Official)." });

    const existing = await db.select().from(usersTable).where(eq(usersTable.email, normalizedEmail)).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({
        error: isStudentPin
          ? "Username already taken — please choose another."
          : "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(usersTable).values({
      email: normalizedEmail,
      passwordHash,
      schoolId: normalizedRole === "school" ? (schoolId ?? null) : null,
      role: normalizedRole,
    }).returning();

    req.session.userId = user.id;
    await req.session.save();

    let school = null;
    if (user.schoolId) {
      const rows = await db.select().from(schoolsTable).where(eq(schoolsTable.id, user.schoolId)).limit(1);
      school = rows[0] ?? null;
    }

    res.status(201).json({ id: user.id, email: user.email, schoolId: user.schoolId, role: user.role, isAdmin: user.isAdmin, school });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const rows = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Invalid email or password." });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid email or password." });

    req.session.userId = user.id;
    await req.session.save();

    let school = null;
    if (user.schoolId) {
      const schoolRows = await db.select().from(schoolsTable).where(eq(schoolsTable.id, user.schoolId)).limit(1);
      school = schoolRows[0] ?? null;
    }

    res.json({ id: user.id, email: user.email, schoolId: user.schoolId, role: user.role, isAdmin: user.isAdmin, school });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("chsid");
    res.json({ ok: true });
  });
});

router.get("/auth/me", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated." });

    const rows = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    const user = rows[0];
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: "Session expired." });
    }

    let school = null;
    if (user.schoolId) {
      const schoolRows = await db.select().from(schoolsTable).where(eq(schoolsTable.id, user.schoolId)).limit(1);
      school = schoolRows[0] ?? null;
    }

    res.json({ id: user.id, email: user.email, schoolId: user.schoolId, role: user.role, isAdmin: user.isAdmin, school });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email) return res.status(400).json({ error: "Email is required." });

    const rows = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
    const user = rows[0];

    if (!user) {
      return res.json({ ok: true });
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await db.insert(passwordResetTokensTable).values({ token, userId: user.id, expiresAt });

    const baseUrl = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : "http://localhost";
    const devResetUrl = `${baseUrl}/reset-password?token=${token}`;

    res.json({ ok: true, devResetUrl });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body as { token?: string; password?: string };
    if (!token || !password) return res.status(400).json({ error: "Token and password are required." });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });

    const now = new Date();
    const rows = await db
      .select()
      .from(passwordResetTokensTable)
      .where(
        and(
          eq(passwordResetTokensTable.token, token),
          gt(passwordResetTokensTable.expiresAt, now),
          isNull(passwordResetTokensTable.usedAt)
        )
      )
      .limit(1);

    const resetToken = rows[0];
    if (!resetToken) {
      return res.status(400).json({ error: "This reset link is invalid or has expired. Please request a new one." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.update(usersTable)
      .set({ passwordHash })
      .where(eq(usersTable.id, resetToken.userId));

    await db.update(passwordResetTokensTable)
      .set({ usedAt: now })
      .where(eq(passwordResetTokensTable.id, resetToken.id));

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
