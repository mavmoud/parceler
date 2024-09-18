import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { accessTokenSecret, refreshTokenSecret } from "../config";

// Generate Access Token (Short-lived)
export const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.email }, accessTokenSecret, {
    expiresIn: "15m", //15 min
  });
};

// Generate Refresh Token (Long-lived)
export const generateRefreshToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.email }, refreshTokenSecret, {
    expiresIn: "7d", // 7 days
  });
};

// Hash Password
export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

// Compare Password
export const comparePassword = (
  rawPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(rawPassword, hashedPassword);
};
