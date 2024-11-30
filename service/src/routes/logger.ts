import { Router } from "express";
import createLog from "../controllers/logger";

const router = Router();

router.post("/logs", createLog);

export default router;
