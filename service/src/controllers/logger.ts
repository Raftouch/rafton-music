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

  public static async getLog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const log = await Log.findById(id);

      if (!log) {
        res.status(400).send("Log not found");
        return;
      }
      res.status(200).json(log);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.stack : "Error retrieving log",
      });
    }
  }

  public static async updateLog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { eventType, message } = req.body;

    try {
      const log = await Log.findByIdAndUpdate(
        id,
        { eventType, message },
        { new: true }
      );

      if (!log) {
        res.status(404).send("Log not found");
        return;
      }

      res.status(200).json(log);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.stack : "Error updating log",
      });
    }
  }

  public static async deleteLog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const log = await Log.findByIdAndDelete(id);

      if (!log) {
        res.status(404).send("Log not found");
        return;
      }
      res.status(200).send("Log deleted");
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.stack : "Error deleting log",
      });
    }
  }
}
