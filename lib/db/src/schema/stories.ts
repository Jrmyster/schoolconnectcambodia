import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const storyStatusEnum = pgEnum("story_status", [
  "pending",
  "approved",
  "rejected",
]);

export const storiesTable = pgTable("stories", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  graduationYear: integer("graduation_year").notNull(),
  profession: text("profession").notNull(),
  story: text("story").notNull(),
  photoUrl: text("photo_url"),
  status: storyStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStorySchema = createInsertSchema(storiesTable).omit({
  id: true,
  status: true,
  createdAt: true,
});
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof storiesTable.$inferSelect;
