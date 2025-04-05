import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  repositoryId: string;
  userId: string;
}

export function verifyServiceToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("verifyServiceToken called");
  const authHeader = req.headers.authorization;
  console.log("authHeader is ", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET;

  if (!SERVICE_JWT_SECRET) {
    throw new Error("ENV SERVICE_JWT_SECRET is required.");
  }

  try {
    const decoded = jwt.verify(token, SERVICE_JWT_SECRET) as AuthPayload;
    req.body.auth = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
