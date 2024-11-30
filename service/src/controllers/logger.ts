import { Request, Response } from "express";
import Log from "../models/Log";

const createLog = async (req: Request, res: Response): Promise<void> => {
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
    console.error("Error saving log:", error);
    res.status(500).send("Error saving log");
  }
};

export default createLog;
