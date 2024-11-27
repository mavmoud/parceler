import { eventManager } from "./EventManager";
import { ResendService } from "../Services/ResendService";

const resendService = new ResendService();

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

eventManager.on("orderCreated", (trackingNumber) => {
  console.log(`Order created with tracking number: ${trackingNumber}`);
  //email notification later
});
