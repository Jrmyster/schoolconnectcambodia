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

app.use(session({
  name: "chsid",
  secret: process.env["SESSION_SECRET"] ?? "chouy-sala-dev-secret-2024",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: false,
  },
}));

// Serve uploaded photos as static files
app.use("/api/uploads", express.static(uploadsDir));

app.use("/api", router);

export default app;
