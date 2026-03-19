import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const schoolsTable = pgTable("schools", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameKh: text("name_kh").notNull(),
  province: text("province").notNull(),
  district: text("district").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  photoUrl: text("photo_url"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  description: text("description"),
  studentCount: integer("student_count"),
  pin: text("pin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSchoolSchema = createInsertSchema(schoolsTable).omit({ id: true, createdAt: true });
export type InsertSchool = z.infer<typeof insertSchoolSchema>;
export type School = typeof schoolsTable.$inferSelect;
