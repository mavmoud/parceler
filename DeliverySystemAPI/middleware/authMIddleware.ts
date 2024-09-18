import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { accessTokenSecret } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, token" });

  try {
    const decoded = jwt.verify(token, accessTokenSecret);

    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
