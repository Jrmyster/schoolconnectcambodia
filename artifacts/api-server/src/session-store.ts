import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "@workspace/db";
const PgStore = connectPgSimple(session);
export const createSessionStore = () => new PgStore({
  pool,
  tableName: "map_sessions",
  createTableIfMissing: false, // Apply the reviewed migration before starting the server.
  pruneSessionInterval: process.env.NODE_ENV === "test" ? false : 900,
});
export const sessionStore = createSessionStore();
