const express = require("express");
const prisma = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();
const startOfToday = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

router.get("/jobs", asyncHandler(async (req, res) => {
  const jobs = await prisma.job_postings.findMany({
    where: { status: "open", application_deadline: { gte: startOfToday() } },
    include: { company_profiles: { select: { legal_name: true } } },
    orderBy: { application_deadline: "asc" },
  });
  res.json({ success: true, data: jobs });
}));

router.get("/companies", asyncHandler(async (req, res) => {
  const companies = await prisma.company_profiles.findMany({
    include: { users_company_profiles_company_idTousers: { select: { email: true } } },
    orderBy: { legal_name: "asc" },
  });
  res.json({ success: true, data: companies });
}));

module.exports = router;