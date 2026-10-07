import { Router, type IRouter } from "express";
import multer from "multer";
import { requireRole } from "../middleware/rbac";
import { savePhoto, readPhoto, photoMime } from "../storage/photos";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1 } });
const router: IRouter = Router();
router.post("/upload", requireRole("school"), (req, res) => {
  upload.single("photo")(req, res, async (error) => {
    if (error) { res.status(error.code === "LIMIT_FILE_SIZE" ? 413 : 400).json({ error: "Upload one photo up to 10 MB." }); return; }
    if (!req.file) { res.status(400).json({ error: "No file uploaded" }); return; }
    if (!photoMime(req.file.buffer)) { res.status(415).json({ error: "Upload a JPEG, PNG, GIF or WebP image." }); return; }
    try { res.json({ url: await savePhoto(req.file.buffer) }); }
    catch { res.status(503).json({ error: "Photo storage is temporarily unavailable." }); }
  });
});
router.get("/uploads/:filename", async (req, res) => {
  try {
    const bytes = await readPhoto(String(req.params.filename));
    const mime = bytes && photoMime(bytes);
    if (!bytes || !mime) { res.status(404).json({ error: "Photo not found." }); return; }
    res.set({ "Content-Type": mime, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store" }).send(bytes);
  } catch { res.status(503).json({ error: "Photo storage is temporarily unavailable." }); }
});
export default router;
