import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret || (process.env.NODE_ENV === "production" && secret.includes("change-before-production"))) {
    throw new Error("JWT_SECRET must be configured with a production-safe value");
  }

  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      authVersion: user.authVersion ?? 1,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
};
