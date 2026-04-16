import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const challengeCompletionsTable = pgTable("challenge_completions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  challengeId: text("challenge_id").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type ChallengeCompletion = typeof challengeCompletionsTable.$inferSelect;
