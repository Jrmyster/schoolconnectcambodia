import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const quizScoresTable = pgTable("quiz_scores", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  province: text("province").notNull(),
  expEarned: integer("exp_earned").notNull().default(0),
  subject: text("subject").notNull().default("health-science"),
  topic: text("topic").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizScoreSchema = createInsertSchema(quizScoresTable).omit({
  id: true,
  createdAt: true,
});
export type InsertQuizScore = z.infer<typeof insertQuizScoreSchema>;
export type QuizScore = typeof quizScoresTable.$inferSelect;
