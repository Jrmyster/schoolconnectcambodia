import { index, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
// Infrastructure table; keep it in Drizzle so schema tooling never drops sessions.
export const sessionsTable = pgTable("stem_sessions", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
}, (table) => [index("stem_sessions_expire_idx").on(table.expire)]);
