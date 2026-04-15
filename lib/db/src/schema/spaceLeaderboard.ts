import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const spaceLeaderboardTable = pgTable("space_leaderboard", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  score: integer("score").notNull().default(0),
  completionTimeMs: integer("completion_time_ms").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSpaceLeaderboardSchema = createInsertSchema(spaceLeaderboardTable).omit({
  id: true,
  createdAt: true,
});

export type InsertSpaceLeaderboard = z.infer<typeof insertSpaceLeaderboardSchema>;
export type SpaceLeaderboard = typeof spaceLeaderboardTable.$inferSelect;
