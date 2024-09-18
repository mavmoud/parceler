import express from "express";
import { verifyToken } from "../middleware";

export const protectedRoute = express.Router();

//Protected route
protectedRoute.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});
