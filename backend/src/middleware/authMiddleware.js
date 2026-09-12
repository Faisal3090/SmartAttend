import jwt from "jsonwebtoken";
import { db } from "../prisma/db.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const users = await db.orm.public.User.where({ id: Number(decoded.id) }).all();
    const user = users[0];
    if (!user || !user.isActive || Number(decoded.authVersion ?? 1) !== Number(user.authVersion ?? 1)) {
      return res.status(401).json({
        success: false,
        message: "Authentication session is no longer valid",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};
