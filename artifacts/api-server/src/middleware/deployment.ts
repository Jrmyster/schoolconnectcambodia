import { timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
const production = process.env.NODE_ENV === "production";
const expected = process.env.BACKEND_PROXY_SECRET;
export const publicOrigin = new URL(process.env.PUBLIC_SITE_URL || "https://khmerone.jaredrobertw.workers.dev").origin;
if (production && (!expected || expected.length < 32)) {
  throw new Error("BACKEND_PROXY_SECRET must contain at least 32 random characters in production.");
}
export const deploymentGuard: RequestHandler = (req, res, next) => {
  if (production) {
    const provided = Buffer.from(req.get("X-Backend-Proxy-Secret") || "");
    const secret = Buffer.from(expected!);
    if (provided.length !== secret.length || !timingSafeEqual(provided, secret)) {
      res.status(403).json({ error: "Use the public application URL." }); return;
    }
  }
  if (production && req.get("Origin") && req.get("Origin") !== publicOrigin) {
    res.status(403).json({ error: "Origin is not allowed." }); return;
  }
  next();
};
