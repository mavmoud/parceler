import { eventManager } from "./EventManager";
import { ResendService } from "../Services/ResendService";

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
