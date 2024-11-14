import axios from "axios";
import { BASE_URL } from "../helpers";
import { User } from "models";

axios.defaults.withCredentials = true;

export class UserService {
  //admin only
  static async GetAllUsers() {
    const res = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
    });
    return res.data;
  }

  static async GetUserById(userId: number) {
    const res = await axios.get(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
    });
    return res.data;
  }

  static async UpdateUser(user: User, userId: number) {
    const res = await axios.put(
      `${BASE_URL}/api/users/${userId}`,
      JSON.stringify(user),
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
