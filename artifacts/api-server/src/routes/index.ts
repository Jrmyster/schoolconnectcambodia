import { Router, type IRouter } from "express";
import healthRouter from "./health";
import schoolsRouter from "./schools";
import needsRouter from "./needs";
import completedProjectsRouter from "./completedProjects";

const router: IRouter = Router();

router.use(healthRouter);
router.use(schoolsRouter);
router.use(needsRouter);
router.use(completedProjectsRouter);

export default router;
