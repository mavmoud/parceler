import express from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response } from "express";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils";
import { refreshTokenSecret } from "../config";
import { REFRESH_TOKEN_EXPIRATION_TIME } from "../constants";
import { User } from "../models";

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

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    User.create({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
      userTypeId,
      address,
      phoneNumber,
    });

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

    const user = await User.findOne({ where: { email } });

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

    await user.update({ refreshToken, refreshTokenExpiry, issuedAt });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //change to true if https
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      sameSite: "strict",
    });

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

authRoutes.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    const user = await User.findOne({ where: { refreshToken } });

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
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const user = await User.findOne({ where: { refreshToken } });

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }

  await user.update({
    refreshToken: null,
    refreshTokenExpiry: null,
    issuedAt: null,
    revokedAt: new Date(),
  });

  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
});
