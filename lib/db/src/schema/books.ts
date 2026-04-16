import { pgTable, serial, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  recommendedBy: text("recommended_by").notNull(),
  review: text("review").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookLikesTable = pgTable(
  "book_likes",
  {
    id: serial("id").primaryKey(),
    bookId: integer("book_id").notNull(),
    userId: integer("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("book_likes_unique").on(table.bookId, table.userId)]
);

export type Book = typeof booksTable.$inferSelect;
export type BookLike = typeof bookLikesTable.$inferSelect;
