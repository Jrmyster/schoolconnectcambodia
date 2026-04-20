import type { Request, Response, NextFunction } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export type UserRole = "student" | "school";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated." });
  }
  next();
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated." });
  }
  try {
    const rows = await db
      .select({ isAdmin: usersTable.isAdmin })
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId))
      .limit(1);
    const u = rows[0];
    if (!u) return res.status(401).json({ error: "Session expired." });
    if (!u.isAdmin) {
      return res.status(403).json({ error: "Admin access required." });
    }
    next();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

export function requireRole(role: UserRole) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated." });
    }
    try {
      const rows = await db
        .select({ role: usersTable.role, isAdmin: usersTable.isAdmin })
        .from(usersTable)
        .where(eq(usersTable.id, req.session.userId))
        .limit(1);
      const u = rows[0];
      if (!u) return res.status(401).json({ error: "Session expired." });
      if (u.isAdmin) return next();
      if (u.role !== role) {
        return res.status(403).json({
          error: `This action is restricted to ${role} accounts.`,
        });
      }
      next();
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  };
}
