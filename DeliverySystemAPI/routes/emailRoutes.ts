import express from "express";
import { ResendService } from "../Services/ResendService";

export const emailRoutes = express.Router();
const emailService = new ResendService();

emailRoutes.post("/welcome", async (req, res) => {
  const { userEmail } = req.body;
  const result = await emailService.sendWelcomeEmail(userEmail);
  if (result.success) {
    res.json({ message: "Welcome email sent successfully" });
  } else {
    res.status(500).json({ error: "Failed to send welcome email" });
  }
});

emailRoutes.post("/shipment", async (req, res) => {
  const { email, trackingNumber, estimatedDelivery } = req.body;
  const result = await emailService.sendShipmentEmail(
    email,
    trackingNumber,
    estimatedDelivery,
  );
  if (result.success) {
    res.json({ message: "Shipment email sent successfully" });
  } else {
    res.status(500).json({ error: "Failed to send shipment email" });
  }
});

emailRoutes.post("/update", async (req, res) => {
  const { email, trackingNumber, status, location } = req.body;
  const result = await emailService.sendUpdateEmail(
    email,
    trackingNumber,
    status,
    location,
  );
  if (result.success) {
    res.json({ message: "Update email sent successfully" });
  } else {
    res.status(500).json({ error: "Failed to send update email" });
  }
});

export default emailRoutes;
