import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const authorOfMonthTable = pgTable("author_of_month", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  lifespan: text("lifespan").notNull(),
  bioEn: text("bio_en").notNull(),
  bioKh: text("bio_kh").notNull(),
  works: jsonb("works").notNull().$type<{ title: string; year: string }[]>().default([]),
  challengeTitleEn: text("challenge_title_en"),
  challengeTitleKh: text("challenge_title_kh"),
  challengeBodyEn: text("challenge_body_en"),
  challengeBodyKh: text("challenge_body_kh"),
  challengeId: text("challenge_id"),
  challengeBadge: text("challenge_badge"),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  isCurrent: boolean("is_current").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AuthorOfMonth = typeof authorOfMonthTable.$inferSelect;
