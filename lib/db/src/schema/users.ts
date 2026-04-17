import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { schoolsTable } from "./schools";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  schoolId: integer("school_id").references(() => schoolsTable.id, { onDelete: "set null" }),
  role: text("role").notNull().default("student"),
  isAdmin: boolean("is_admin").notNull().default(false),
  expPoints: integer("exp_points").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
