import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const skepticCompletionsTable = pgTable("skeptic_completions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  challengeId: text("challenge_id").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type SkepticCompletion = typeof skepticCompletionsTable.$inferSelect;
