import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import router from "./routes";
import { sessionStore } from "./session-store";
import { deploymentGuard, publicOrigin } from "./middleware/deployment";
import { pool } from "@workspace/db";

const app: Express = express();

app.get("/healthz", (_req, res) => { res.json({ status: "ok" }); });
app.use("/api", deploymentGuard);
app.use(cors({ origin: process.env.NODE_ENV === "production" ? publicOrigin : true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust the platform's TLS-terminating proxy in production so that
// `req.secure === true` and the `Secure` session cookie is actually issued.
// Without this, enabling `cookie.secure` would silently drop session cookies.
if (process.env["NODE_ENV"] === "production") {
  app.set("trust proxy", 1);
}

// Session secret: must be set explicitly in production. In development we fall
// back to a dev-only value so local work isn't blocked, but never let that
// fallback ship to production where it would weaken every session cookie.
const SESSION_SECRET = process.env["SESSION_SECRET"];
if ((!SESSION_SECRET || SESSION_SECRET.length < 32) && process.env["NODE_ENV"] === "production") {
  throw new Error(
    "SESSION_SECRET environment variable is required in production. " +
    "Set a unique random value of at least 32 characters on the backend host.",
  );
}

app.use(session({
  store: sessionStore,
  name: "map.sid",
  secret: SESSION_SECRET ?? "chouy-sala-dev-only-secret-do-not-use-in-prod",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env["NODE_ENV"] === "production",
  },
}));


app.get("/api/readyz", async (_req, res) => {
  try {
    await pool.query('SELECT sid FROM "map_sessions" LIMIT 0');
    res.set("Cache-Control", "no-store").json({ status: "ok", database: "ok" });
  } catch {
    res.status(503).set("Cache-Control", "no-store").json({ status: "unavailable", database: "unavailable" });
  }
});
app.use("/api", router);

export default app;
