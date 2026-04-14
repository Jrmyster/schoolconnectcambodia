import { Router, type IRouter } from "express";
import healthRouter from "./health";
import schoolsRouter from "./schools";
import needsRouter from "./needs";
import completedProjectsRouter from "./completedProjects";
import uploadRouter from "./upload";
import authRouter from "./auth";
import storiesRouter from "./stories";
import openaiRouter from "./openai";
import interviewRouter from "./interview";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(schoolsRouter);
router.use(needsRouter);
router.use(completedProjectsRouter);
router.use(uploadRouter);
router.use(storiesRouter);
router.use(openaiRouter);
router.use(interviewRouter);

export default router;
