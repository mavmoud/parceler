import { Resend } from "resend";
import QRCode from "qrcode";
import Welcome from "../emails/Welcome";
import Shipment from "../emails/Shipment";
import Update from "../emails/Update";

const resend = new Resend(process.env.RESEND_API_KEY);

export class ResendService {
  async sendWelcomeEmail(userEmail: string) {
    try {
      const data = await resend.emails.send({
        from: "Parceler <welcome@parceler.mahmmk.com>",
        to: userEmail,
        subject: "Welcome to Parceler!",
        react: Welcome(),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async sendShipmentEmail(userEmail: string, trackingNumber: string) {
    try {
      // Generate the QR code
      const qrCodeUrl = await QRCode.toDataURL(trackingNumber);

      const data = await resend.emails.send({
        from: "Parceler <ship@parceler.mahmmk.com>",
        to: userEmail,
        subject: "Your Shipment Has Been Created",
        react: Shipment({ trackingNumber, qrCodeUrl }),
      });
      return { success: true, data };
    } catch (error) {
      console.error("Error in sendShipmentEmail:", error); // Log error details
      return { success: false, error };
    }
  }

  async sendUpdateEmail(
    userEmail: string,
    trackingNumber: string,
    statusName: string,
    userName: string,
  ) {
    try {
      const data = await resend.emails.send({
        from: "Parceler <update@parceler.mahmmk.com>",
        to: userEmail,
        subject: "Shipment Status Update",
        react: Update({
          trackingNumber,
          statusName,
          userName,
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
}
