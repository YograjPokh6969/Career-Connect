const express = require("express");
require("dotenv").config();
const prisma = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();
BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Career Connect API is running" });
});
app.get("/health", (req, res) =>
  res.json({ success: true, message: "Career Connect backend is running" }),
);

app.get("/db-test", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      take: 5,
      select: { user_id: true, email: true, role: true, full_name: true },
    });

    res.json({
      success: true,
      connected: true,
      data: users,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      connected: false,
      message: "Database connection failed",
    });
  }
});

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
