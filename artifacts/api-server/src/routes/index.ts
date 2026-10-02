import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import openaiRouter from "./openai";
import interviewRouter from "./interview";
import adminMetricsRouter from "./adminMetrics";
import adminRouter from "./admin";
import savedCareersRouter from "./savedCareers";
import quizRouter from "./quiz";
import leaderboardRouter from "./leaderboard";
import skepticRouter from "./skeptic";
import booksRouter from "./books";
import authorsRouter from "./authors";
import achievementsRouter from "./achievements";
import impactRouter from "./impact";
import galacticGrammarRouter from "./galacticGrammar";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(openaiRouter);
router.use(interviewRouter);
router.use(adminMetricsRouter);
router.use(adminRouter);
router.use(savedCareersRouter);
router.use(quizRouter);
router.use(leaderboardRouter);
router.use(skepticRouter);
router.use(booksRouter);
router.use(authorsRouter);
router.use(achievementsRouter);
router.use(impactRouter);
router.use(galacticGrammarRouter);

export default router;
