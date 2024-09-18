import express from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response } from "express";
import { verifyToken } from "../middleware";
import { User } from "../models";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils";
import { refreshTokenSecret } from "../config";

export const authRoutes = express.Router();

const user: User = {
  id: 1,
  email: "test@test.com",
  password: "$2a$10$B8GQ33PNoJy/rI3rR19twORY6xmhtxSECFAhlwCMklbkEPVWIoIai",
  firstName: "test",
  lastName: "test",
};

// User registration
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // need to check if user already exists in db (later)

    const user: User = {
      id: 2,
      email,
      password: hashPassword(password),
      firstName,
      lastName,
    };

    console.log(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    //fetch user from db using username or something unique

    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in memory (or database)
    user.refreshToken = refreshToken;

    res.status(200).json({
      accessToken,
      refreshToken,
    });

    console.log(user);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

authRoutes.post("/refresh-token", (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    //find user
    //for now I will check if the refresh TOken in not null
    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      refreshTokenSecret,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: newAccessToken });
      }
    );

    console.log(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout Route (Invalidate Refresh Token)
authRoutes.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (user.refreshToken !== refreshToken) {
    console.log("do not match token");
  }
  //find user by refrensh token

  if (user) {
    // Remove the refresh token from the user
    user.refreshToken = undefined;
  }

  console.log(user);

  res.status(200).json({ message: "Logged out successfully" });
});

authRoutes.post("/validate-token", verifyToken, async (req, res) => {
  res.status(200).json({ message: "Valid token" });
});
