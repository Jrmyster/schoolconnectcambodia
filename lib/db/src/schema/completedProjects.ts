import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { schoolsTable } from "./schools";
import { needsTable } from "./needs";
import { needCategoryEnum } from "./needs";

export const completedProjectsTable = pgTable("completed_projects", {
  id: serial("id").primaryKey(),
  needId: integer("need_id").references(() => needsTable.id),
  schoolId: integer("school_id").references(() => schoolsTable.id).notNull(),
  titleEn: text("title_en").notNull(),
  titleKh: text("title_kh").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionKh: text("description_kh").notNull(),
  thankYouPhotoUrl: text("thank_you_photo_url"),
  category: needCategoryEnum("category").notNull(),
  completedAt: timestamp("completed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCompletedProjectSchema = createInsertSchema(completedProjectsTable).omit({ id: true, createdAt: true });
export type InsertCompletedProject = z.infer<typeof insertCompletedProjectSchema>;
export type CompletedProject = typeof completedProjectsTable.$inferSelect;
