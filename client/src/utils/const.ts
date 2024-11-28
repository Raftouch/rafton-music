type Environment = "development" | "production" | "staging" | "test";

const nodeEnv: Environment = process.env.NODE_ENV as Environment;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (nodeEnv === "production"
    ? "https://portainer-cda3b.dev-formation.com:5000"
    : nodeEnv === "staging"
    ? "http://portainer-cda3b.dev-formation.com:5000"
    : "http://localhost:5000");

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
