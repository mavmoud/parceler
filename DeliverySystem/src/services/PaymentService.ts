import axios from "axios";
import { BASE_URL } from "../helpers";

export interface OrderPayload {
  weight: number;
  recipientFirstName: string;
  recipientLastName: string;
  recipientAddress: string;
  senderAddress: string;
  sessionId: string;
}

export class PaymentService {
  static async CreateOrder(OrderPayload: OrderPayload) {
    const res = await axios.post(
      `${BASE_URL}/api/payment/complete`,
      OrderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
    return res.data;
  }
}
