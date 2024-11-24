import axios from "axios";
import { BASE_URL } from "../helpers";

export const EmailService = {
  sendWelcomeEmail: async (userEmail: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/welcome`, {
        userEmail,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to send welcome email");
    }
  },

  sendShipmentEmail: async (
    userEmail: string,
    trackingNumber: string,
    estimatedDelivery: string,
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/shipment`, {
        userEmail,
        trackingNumber,
        estimatedDelivery,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to send shipment email");
    }
  },

  sendUpdateEmail: async (
    userEmail: string,
    trackingNumber: string,
    status: string,
    location: string,
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/update`, {
        userEmail,
        trackingNumber,
        status,
        location,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to send update email");
    }
  },
};
