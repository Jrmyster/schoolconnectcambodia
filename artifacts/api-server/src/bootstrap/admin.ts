import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Idempotently provisions / updates the master administrator account from
 * environment variables. Runs once on every server boot.
 *
 * Required env vars (both must be set, or the bootstrap is skipped):
 *   ADMIN_EMAIL    — the email address that identifies the admin account.
 *   ADMIN_PASSWORD — the plaintext password to set. It is bcrypt-hashed
 *                    before being written to the database; the plaintext is
 *                    never persisted or logged.
 *
 * Behaviour:
 *   • If a user with ADMIN_EMAIL exists, this resets their passwordHash to
 *     the bcrypt hash of ADMIN_PASSWORD and ensures `is_admin = true`.
 *   • If no such user exists, a new row is created with that email,
 *     `is_admin = true`, and `role = "student"` (the existing default;
 *     `is_admin` is the privilege flag, not the `role` text field).
 *   • In production, the absence of either env var is logged loudly so
 *     operators notice — but the server still starts so the rest of the
 *     site remains available.
 */
export async function bootstrapMasterAdmin(): Promise<void> {
  const email = process.env["ADMIN_EMAIL"]?.trim().toLowerCase();
  const password = process.env["ADMIN_PASSWORD"];

  if (!email || !password) {
    if (process.env["NODE_ENV"] === "production") {
      console.warn(
        "[admin-bootstrap] ADMIN_EMAIL and/or ADMIN_PASSWORD are not set. " +
        "Skipping master admin provisioning.",
      );
    }
    return;
  }

  if (password.length < 10) {
    console.error(
      "[admin-bootstrap] ADMIN_PASSWORD must be at least 10 characters. " +
      "Refusing to provision a weak admin password.",
    );
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const existing = await db
      .select({ id: usersTable.id, isAdmin: usersTable.isAdmin })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing[0]) {
      await db
        .update(usersTable)
        .set({ passwordHash, isAdmin: true })
        .where(eq(usersTable.id, existing[0].id));
      console.log(
        `[admin-bootstrap] Updated existing user <${email}> ` +
        `(id=${existing[0].id}) — password reset, is_admin=true.`,
      );
    } else {
      const [created] = await db
        .insert(usersTable)
        .values({
          email,
          passwordHash,
          isAdmin: true,
          schoolId: null,
          role: sql`DEFAULT`,
        })
        .returning({ id: usersTable.id });
      console.log(
        `[admin-bootstrap] Created master admin <${email}> ` +
        `(id=${created?.id}).`,
      );
    }
  } catch (err) {
    console.error("[admin-bootstrap] Failed to provision master admin:", err);
  }
}
