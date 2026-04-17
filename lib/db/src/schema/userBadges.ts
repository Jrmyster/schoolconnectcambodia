import { pgTable, serial, integer, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const userBadgesTable = pgTable(
  "user_badges",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    badgeType: text("badge_type").notNull(),
    awardedAt: timestamp("awarded_at").defaultNow().notNull(),
  },
  (table) => ({
    // Each user can only earn a given badge once. Combined with
    // onConflictDoNothing() at the call sites, this makes badge awards
    // atomic and idempotent under concurrent requests.
    userBadgeUniq: uniqueIndex("user_badges_user_id_badge_type_uniq").on(table.userId, table.badgeType),
  }),
);

export type UserBadge = typeof userBadgesTable.$inferSelect;
