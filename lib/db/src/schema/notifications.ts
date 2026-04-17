import { pgTable, serial, integer, text, timestamp, boolean, pgEnum, index } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const notificationTypeEnum = pgEnum("notification_type", [
  "new_message",
  "surplus_alert",
]);

export const notificationsTable = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    recipientId: integer("recipient_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: notificationTypeEnum("type").notNull(),
    titleEn: text("title_en").notNull(),
    titleKh: text("title_kh").notNull(),
    bodyEn: text("body_en").notNull(),
    bodyKh: text("body_kh").notNull(),
    link: text("link"),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    recipientIdx: index("notifications_recipient_idx").on(table.recipientId, table.isRead),
  }),
);

export type Notification = typeof notificationsTable.$inferSelect;
