import { Router } from "express";
import LoggerController from "../controllers/logger";
import { validateLog } from "../middlewares/validateLog";

const router = Router();

router.post("/logs", validateLog, LoggerController.createLog);
router.get("/logs", LoggerController.getAllLogs);
router.get("/logs/:id", LoggerController.getLog);
router.patch("/logs/:id", LoggerController.updateLog);
router.delete("/logs/:id", LoggerController.deleteLog);

export default router;
