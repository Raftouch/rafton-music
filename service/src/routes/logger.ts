import { Router } from "express";
import LoggerController from "../controllers/logger";

const router = Router();

router.post("/logs", LoggerController.createLog);
router.get("/logs", LoggerController.getAllLogs);

export default router;
