import { Router } from "express";
import createLog from "../controllers/logger";

const router = Router();

router.post("/log", createLog);

export default router;
