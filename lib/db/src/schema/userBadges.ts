import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const userBadgesTable = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  badgeType: text("badge_type").notNull(),
  awardedAt: timestamp("awarded_at").defaultNow().notNull(),
});

export type UserBadge = typeof userBadgesTable.$inferSelect;
