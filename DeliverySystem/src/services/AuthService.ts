import axios from "axios";
import { BASE_URL } from "../helpers";
import { User } from "models";

axios.defaults.withCredentials = true;

export class AuthService {
  static async Register(user: User) {
    const res = await axios.post(`${BASE_URL}/api/auth/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }

  static async Login(user: User) {
    const res = await axios.post(
      `${BASE_URL}/api/auth/login`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }

  static async Logout(accesToken: string) {
    const res = await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accesToken,
        },
      }
    );
    return res;
  }
}
