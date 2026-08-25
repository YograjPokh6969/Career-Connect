const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const authMiddleware = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "JWT_SECRET is not configured" });
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId && !decoded.user_id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authentication token" });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: BigInt(decoded.userId || decoded.user_id) },
      select: {
        user_id: true,
        email: true,
        role: true,
        full_name: true,
        phone: true,
        is_active: true,
      },
    });
    if (!user || !user.is_active) {
      return res
        .status(401)
        .json({
          success: false,
          message: "User account is inactive or unavailable",
        });
    }
    req.user = { ...user, userId: user.user_id };
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "TypeError"
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    return next(error);
  }
};

module.exports = authMiddleware;
