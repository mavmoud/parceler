import { Resend } from "resend";
import WelcomeEmail from "../emails/Welcome";
import Shipment from "../emails/Shipment";
import Update from "../emails/Update";

const resend = new Resend(process.env.RESEND_API_KEY);

export class ResendService {
  async sendWelcomeEmail(userEmail: string) {
    try {
      const data = await resend.emails.send({
        from: "Parceler <welcome@parceler.mahmoud.am>",
        to: userEmail,
        subject: "Welcome to Parceler!",
        react: WelcomeEmail(),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async sendShipmentEmail(
    userEmail: string,
    // trackingNumber: string,
    // estimatedDelivery: string,
  ) {
    try {
      const data = await resend.emails.send({
        from: "Parceler <ship@parceler.mahmoud.am>",
        to: userEmail,
        subject: "Your Shipment Has Been Created",
        react: Shipment(),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async sendUpdateEmail(
    userEmail: string,
    trackingNumber: string,
    status: string,
    location: string,
  ) {
    try {
      const data = await resend.emails.send({
        from: "Parceler <update@parceler.mahmoud.am>",
        to: userEmail,
        subject: "Shipment Status Update",
        react: Update({
          trackingNumber,
          status,
          location,
          userName: "",
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
}
