import { pgTable, serial, text, real, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { schoolsTable } from "./schools";

export const needCategoryEnum = pgEnum("need_category", [
  "Stationery",
  "Electronics",
  "Infrastructure",
  "Books",
  "Sports",
  "Other",
  "Furniture",
  "WASH",
  "Teacher Training",
]);

export const needStatusEnum = pgEnum("need_status", [
  "active",
  "funded",
  "completed",
]);

export const needsTable = pgTable("needs", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schoolsTable.id).notNull(),
  titleEn: text("title_en").notNull(),
  titleKh: text("title_kh").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionKh: text("description_kh").notNull(),
  category: needCategoryEnum("category").notNull(),
  photoUrl: text("photo_url"),
  goalAmount: real("goal_amount").notNull(),
  fundedAmount: real("funded_amount").notNull().default(0),
  status: needStatusEnum("status").notNull().default("active"),
  contactEmail: text("contact_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNeedSchema = createInsertSchema(needsTable).omit({ id: true, createdAt: true, fundedAmount: true, status: true });
export type InsertNeed = z.infer<typeof insertNeedSchema>;
export type Need = typeof needsTable.$inferSelect;
