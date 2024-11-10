import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { accessTokenSecret } from "../config";
import { ACCESS_TOKEN_EXPIRATION_TIME } from "../constants";

// Generate Access Token (Short-lived)
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, userTypeId: user.userTypeId },
    accessTokenSecret,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME / 1000, //15 min
    }
  );
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
