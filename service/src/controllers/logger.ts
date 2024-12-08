import { Request, Response } from "express";
import Log from "../models/Log";

export default class LoggerController {
  public static async createLog(req: Request, res: Response): Promise<void> {
    const { eventType, message } = req.body;

    try {
      const log = new Log({
        eventType,
        message,
      });
      await log.save();
      res
        .status(201)
        .json({ message: "Log created successfully", logId: log.id });
    } catch (error) {
      console.error("Error creating log:", error);
      res.status(500).json({
        message: "An error occurred while creating the log.",
      });
    }
  }

  public static async getAllLogs(req: Request, res: Response): Promise<void> {
    // const limit = parseInt(req.query.limit as string) || 10; // Default limit: 10
    // const page = parseInt(req.query.page as string) || 1; // Default page: 1

    // try {
    //   const logs = await Log.find()
    //     .skip((page - 1) * limit)
    //     .limit(limit);
    //   const total = await Log.countDocuments();

    //   res.status(200).json({
    //     data: logs,
    //     meta: {
    //       total,
    //       page,
    //       pages: Math.ceil(total / limit),
    //     },
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     message: "Error getting all logs",
    //   });
    // }

    try {
      const logs = await Log.find();
      res
        .status(200)
        .json({ message: "Logs retrieved successfully", data: logs });
    } catch (error) {
      console.error("Error retrieving logs:", error);
      res.status(500).json({
        message: "An error occurred while retrieving logs.",
      });
    }
  }

  public static async getLog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const log = await Log.findById(id);

      if (!log) {
        res.status(404).json({ message: "Log not found" });
        return;
      }
      res.status(200).json({ message: "Log retrieved successfully", log });
    } catch (error) {
      console.error("Error retrieving log:", error);
      res.status(500).json({
        message: "An error occurred while retrieving the log.",
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
        res.status(404).json({ message: "Log not found" });
        return;
      }

      res.status(200).json({ message: "Log updated successfully", log });
    } catch (error) {
      console.error("Error updating log:", error);
      res.status(500).json({
        message: "An error occurred while updating the log.",
      });
    }
  }

  public static async deleteLog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const log = await Log.findByIdAndDelete(id);

      if (!log) {
        res.status(404).json({ message: "Log not found" });
        return;
      }
      res.status(200).json({ message: "Log deleted successfully", log });
    } catch (error) {
      console.error("Error deleting log:", error);
      res.status(500).json({
        message: "An error occurred while deleteing the log.",
      });
    }
  }
}
