import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const quizCompletionsTable = pgTable("quiz_completions", {
  id: serial("id").primaryKey(),
  curiosity: text("curiosity").notNull(),
  level: text("level").notNull(),
  goal: text("goal").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type QuizCompletion = typeof quizCompletionsTable.$inferSelect;
