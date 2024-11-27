import express from "express";
import { authRoutes } from "./authRoute";
import { protectedRoute } from "./protectedRoute";
import { userRoutes } from "./userRoute";
import { orderRoutes } from "./orderRoute";
import { paymentRoutes } from "./paymentRoutes";
import { emailRoutes } from "./emailRoutes";

const router = express.Router();

// Register all your routes here
router.use("/auth", authRoutes);
router.use("/protected", protectedRoute);
router.use("/", userRoutes);
router.use("/orders", orderRoutes);
router.use("/payment", paymentRoutes);
router.use("/email", emailRoutes);

export default router;
