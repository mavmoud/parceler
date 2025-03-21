import axios from "axios";
import { BASE_URL } from "../helpers";

axios.defaults.withCredentials = true;

export class OrderService {
  static async GetOrderByTrackingNumber(trackingNumber: string) {
    const res = await axios.get(
      `${BASE_URL}/api/orders/trackingNumber/${trackingNumber}`
    );
    return res.data;
  }

  static async GetOrderById(orderId: number) {
    const res = await axios.get(`${BASE_URL}/api/orders/id/${orderId}`);
    return res.data;
  }

  static async GetOrdersBySenderId(senderId: number) {
    const res = await axios.get(`${BASE_URL}/api/orders/sender/${senderId}`);
    return res.data;
  }

  static async GetOrdersByDriverId(driverId: number) {
    const res = await axios.get(`${BASE_URL}/api/orders/driver/${driverId}`);
    return res.data;
  }

  //admin only
  static async GetAllOrders() {
    const res = await axios.get(`${BASE_URL}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
    });
    return res.data;
  }

  static async UpdateStatus(orderId: number, statusId: number) {
    const res = await axios.put(
      `${BASE_URL}/api/orders/status`,
      { orderId, statusId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
    return res;
  }
}
