import { pgTable, serial, integer, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const savedCareersTable = pgTable(
  "saved_careers",
  {
    id:        serial("id").primaryKey(),
    userId:    integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    majorKey:  text("major_key").notNull(),
    careerKey: text("career_key").notNull(),
    savedAt:   timestamp("saved_at").defaultNow().notNull(),
  },
  (t) => ({
    uniq: uniqueIndex("saved_careers_user_major_career_idx").on(t.userId, t.majorKey, t.careerKey),
  }),
);

export type SavedCareer = typeof savedCareersTable.$inferSelect;
