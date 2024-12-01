import { Request, Response } from "express";
import Log from "../models/Log";

export default class LoggerController {
  public static async createLog(req: Request, res: Response): Promise<void> {
    const { eventType, message } = req.body;

    if (!eventType || !message) {
      res.status(400).send("Event type and message are required");
      return;
    }

    try {
      const log = new Log({
        eventType,
        message,
      });
      await log.save();
      res.status(200).send("Log saved");
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.stack : "Error creating log",
      });
    }
  }

  public static async getAllLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await Log.find();
      res.status(200).json({ data: logs });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.stack : "Error getting all logs",
      });
    }
  }
}
