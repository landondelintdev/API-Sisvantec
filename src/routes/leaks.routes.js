import { Router } from "express";
import { getAllReports } from "../controllers/leaks.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/leaks/reports/all", requireAuth, requireAdmin, getAllReports);

export default router;
