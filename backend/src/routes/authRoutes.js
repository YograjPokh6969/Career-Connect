const express = require("express");

const {
  registerStudent,
  registerCompany,
  login,
} = require("../controllers/authController");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.post("/register/student", asyncHandler(registerStudent));
router.post("/register/company", asyncHandler(registerCompany));
router.post("/login", asyncHandler(login));

module.exports = router;
