import { eventManager } from "./EventManager";
import { ResendService } from "../Services/ResendService";
import { TrackingStatus } from "../models";

const resendService = new ResendService();

let userEmail: string;

eventManager.on("userLoggedIn", (data) => {
  console.log(`User signed in: ${JSON.stringify(data)}`);
  console.log(`User email: ${data.email}`);
  userEmail = data.email; // Save the signed-in user's email
});

eventManager.on("userCreated", async (user) => {
  console.log(`User created: ${user.email}`);
  try {
    // Send a welcome email
    await resendService.sendWelcomeEmail(user.email);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
});

eventManager.on("orderCreated", async (trackingNumber) => {
  console.log(`Order created with tracking number: ${trackingNumber}`);
  try {
    await resendService.sendShipmentEmail(userEmail, trackingNumber);
    console.log("Shipment email sent successfully");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
});

eventManager.on(
  "orderUpdated",
  async ({ trackingNumber, newStatusId, userEmail, userName }) => {
    try {
      if (!userEmail) {
        console.error("User email is missing.");
        return;
      }

      const status = await TrackingStatus.findOne({
        where: { id: newStatusId },
      });

      const statusName = status?.statusName || "Unknown";

      try {
        await resendService.sendUpdateEmail(
          userEmail,
          trackingNumber,
          statusName,
          userName,
        );
        console.log("Update email sent successfully");
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }

      console.log(
        `Email sent to ${userEmail} for tracking number ${trackingNumber}.`,
      );
    } catch (error) {
      console.error("Failed to handle orderUpdated event:", error);
    }
  },
);
