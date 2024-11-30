import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
const port: string | number = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB");

    app.listen(port, (): void =>
      console.log(`Event logger service running on port ${port}`)
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

start();
