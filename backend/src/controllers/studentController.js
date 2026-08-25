const prisma = require("../config/db");

const getProfile = async (req, res) => {
  const profile = await prisma.student_profiles.findUnique({
    where: { student_id: req.user.userId },
    include: {
      users: { select: { email: true, full_name: true, phone: true } },
    },
  });
  if (!profile)
    throw Object.assign(new Error("Student profile not found"), {
      status: 404,
    });
  res.json({ success: true, data: profile });
};

const updateProfile = async (req, res) => {
  const allowed = [
    "university_roll_no",
    "department",
    "degree",
    "graduation_year",
    "cgpa",
    "date_of_birth",
    "linkedin_url",
    "github_url",
    "address",
  ];
  const data = {};
  for (const field of allowed)
    if (req.body[field] !== undefined) data[field] = req.body[field];
  if (data.graduation_year) data.graduation_year = Number(data.graduation_year);
  if (data.cgpa) data.cgpa = Number(data.cgpa);
  const profile = await prisma.student_profiles.update({
    where: { student_id: req.user.userId },
    data,
  });
  res.json({ success: true, message: "Profile updated", data: profile });
};

const availableJobs = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.job_postings.findMany({
      where: { status: "open", application_deadline: { gt: new Date() } },
      include: {
        company_profiles: { select: { legal_name: true, industry: true } },
      },
      orderBy: { application_deadline: "asc" },
    }),
  });

const applyToJob = async (req, res) => {
  const jobId = BigInt(req.params.jobId);
  const job = await prisma.job_postings.findUnique({
    where: { job_id: jobId },
  });
  if (!job || job.status !== "open" || job.application_deadline <= new Date())
    throw Object.assign(new Error("This job is not available"), {
      status: 400,
    });
  const existing = await prisma.applications.findUnique({
    where: {
      job_id_student_id: { job_id: jobId, student_id: req.user.userId },
    },
  });
  if (existing)
    throw Object.assign(new Error("You already applied to this job"), {
      status: 409,
    });
  const application = await prisma.applications.create({
    data: {
      job_id: jobId,
      student_id: req.user.userId,
      cover_letter: req.body.cover_letter,
    },
  });
  res
    .status(201)
    .json({
      success: true,
      message: "Application submitted",
      data: application,
    });
};

const applications = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.applications.findMany({
      where: { student_id: req.user.userId },
      include: { job_postings: true },
      orderBy: { applied_at: "desc" },
    }),
  });

const dashboard = async (req, res) => {
  const [profile, applications, availableJobs] = await Promise.all([
    prisma.student_profiles.findUnique({
      where: { student_id: req.user.userId },
    }),
    prisma.applications.findMany({
      where: { student_id: req.user.userId },
      include: { job_postings: true },
    }),
    prisma.job_postings.findMany({
      where: { status: "open", application_deadline: { gt: new Date() } },
      include: { company_profiles: true },
    }),
  ]);
  res.json({ success: true, data: { profile, applications, availableJobs } });
};

module.exports = {
  getProfile,
  updateProfile,
  availableJobs,
  applyToJob,
  applications,
  dashboard,
};
