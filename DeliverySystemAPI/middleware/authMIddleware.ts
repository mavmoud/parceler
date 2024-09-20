import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { accessTokenSecret } from "../config";
import { Roles } from "../constants";

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

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, token" });

  try {
    const decoded = jwt.verify(token, accessTokenSecret) as JwtPayload;

    console.log(Roles.Admin);

    if (decoded.userTypeId !== Roles.Admin) {
      return res.status(401).json({ error: "Access denied, not an admin" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

//soon
// export const isUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied, token missing" });

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, accessTokenSecret) as JwtPayload;

//     // Extract the userId from the request (assumed to be in req.params)
//     const { id } = req.params;

//     // Allow access if the user is an admin or accessing their own data
//     if (payload.isAdmin || payload.id === id) {
//       return next();
//     }

//     return res.status(403).json({ error: "Access denied, not an admin or the owner" });
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };
