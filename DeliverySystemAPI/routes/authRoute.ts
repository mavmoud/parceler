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
import {
  getUserByEmail,
  getUserByRefreshToken,
  insertNewUser,
  updateUser,
} from "../dataUtil";
import { REFRESH_TOKEN_EXPIRATION_TIME } from "../constants";

export const authRoutes = express.Router();

// User registration
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userTypeId,
      address,
      phoneNumber,
    } = req.body;

    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ error: "Email parameter is required and must be a string" });
    }

    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    if (!firstName || !lastName || !userTypeId || !address || !phoneNumber) {
      return res.status(400).json({ error: "Required fields" });
    }

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
      userTypeId,
      address,
      phoneNumber,
    });

    await insertNewUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ error: "Email parameter is required and must be a string" });
    }

    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    const user = await getUserByEmail(email);

    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const issuedAt = new Date();
    const refreshTokenExpiry = new Date(
      issuedAt.getTime() + REFRESH_TOKEN_EXPIRATION_TIME
    );

    // Store refresh
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshTokenExpiry;
    user.issuedAt = issuedAt;

    //update user

    await updateUser(user);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

authRoutes.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
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
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout Route (Invalidate Refresh Token)
authRoutes.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const user = await getUserByRefreshToken(refreshToken);

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }
  user.refreshToken = null;
  user.refreshTokenExpiry = null;
  user.issuedAt = null;
  user.revokedAt = new Date();

  await updateUser(user);

  res.status(200).json({ message: "Logged out successfully" });
});

authRoutes.post("/validate-token", verifyToken, async (req, res) => {
  res.status(200).json({ message: "Valid token" });
});
