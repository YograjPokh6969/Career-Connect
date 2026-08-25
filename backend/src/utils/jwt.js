const jwt = require("jsonwebtoken");

const createToken = (user) => {
  if (!process.env.JWT_SECRET)
    throw Object.assign(new Error("JWT_SECRET is not configured"), {
      status: 500,
    });
  return jwt.sign(
    { userId: user.user_id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = { createToken };
