import { pgTable, serial, integer, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { schoolsTable } from "./schools";
import { usersTable } from "./users";

export const schoolMessagesTable = pgTable(
  "school_messages",
  {
    id: serial("id").primaryKey(),
    fromSchoolId: integer("from_school_id")
      .notNull()
      .references(() => schoolsTable.id, { onDelete: "cascade" }),
    toSchoolId: integer("to_school_id")
      .notNull()
      .references(() => schoolsTable.id, { onDelete: "cascade" }),
    senderUserId: integer("sender_user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    inboxIdx: index("school_messages_to_idx").on(table.toSchoolId, table.createdAt),
  }),
);

export type SchoolMessage = typeof schoolMessagesTable.$inferSelect;
