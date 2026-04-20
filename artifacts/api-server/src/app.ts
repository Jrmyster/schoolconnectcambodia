import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import router from "./routes";
import { uploadsDir } from "./routes/upload";

const app: Express = express();

app.use(cors({ origin: true, credentials: true }));
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
if (!SESSION_SECRET && process.env["NODE_ENV"] === "production") {
  throw new Error(
    "SESSION_SECRET environment variable is required in production. " +
    "Set it via Replit Secrets before deploying.",
  );
}

app.use(session({
  name: "chsid",
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

// Serve uploaded photos as static files
app.use("/api/uploads", express.static(uploadsDir));

app.use("/api", router);

export default app;
