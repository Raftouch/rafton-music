import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateLog: RequestHandler[] = [
  body("eventType").notEmpty().withMessage("Event type is required"),
  body("message").notEmpty().withMessage("Message is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
