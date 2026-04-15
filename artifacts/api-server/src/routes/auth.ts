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

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, schoolId } = req.body as { email?: string; password?: string; schoolId?: number };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });

    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) return res.status(409).json({ error: "An account with this email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(usersTable).values({
      email: email.toLowerCase(),
      passwordHash,
      schoolId: schoolId ?? null,
    }).returning();

    req.session.userId = user.id;
    await req.session.save();

    let school = null;
    if (user.schoolId) {
      const rows = await db.select().from(schoolsTable).where(eq(schoolsTable.id, user.schoolId)).limit(1);
      school = rows[0] ?? null;
    }

    res.status(201).json({ id: user.id, email: user.email, schoolId: user.schoolId, isAdmin: user.isAdmin, school });
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

    res.json({ id: user.id, email: user.email, schoolId: user.schoolId, isAdmin: user.isAdmin, school });
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

    res.json({ id: user.id, email: user.email, schoolId: user.schoolId, isAdmin: user.isAdmin, school });
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
