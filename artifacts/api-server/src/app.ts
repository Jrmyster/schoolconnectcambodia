import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes";
import { uploadsDir } from "./routes/upload";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded photos as static files
app.use("/api/uploads", express.static(uploadsDir));

app.use("/api", router);

export default app;
