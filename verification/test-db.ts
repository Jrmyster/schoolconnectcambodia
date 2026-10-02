import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "../lib/db/node_modules/drizzle-orm/pglite/index.js";
import * as schema from "../lib/db/src/schema/index";
export const database = new PGlite();
export const db = drizzle(database, { schema });
