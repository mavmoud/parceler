import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./config/.env" });

export const port = process.env.PORT || "3000";
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "123456789";
