import express from "express";
import { authRoutes } from "./authRoute";
import { protectedRoute } from "./protectedRoute";

const router = express.Router();

// Register all your routes here
router.use("/auth", authRoutes);
router.use("/protected", protectedRoute);

export default router;
