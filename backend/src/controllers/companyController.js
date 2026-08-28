const prisma = require("../config/db");

const getProfile = async (req, res) => {
  const profile = await prisma.company_profiles.findUnique({
    where: { company_id: req.user.userId },
    include: {
      users_company_profiles_company_idTousers: {
        select: { email: true, full_name: true, phone: true },
      },
    },
  });
  if (!profile)
    throw Object.assign(new Error("Company profile not found"), {
      status: 404,
    });
  res.json({ success: true, data: profile });
};
const updateProfile = async (req, res) => {
  const fields = [
    "legal_name",
    "website",
    "industry",
    "description",
    "office_address",
  ];
  const data = {};
  for (const field of fields)
    if (req.body[field] !== undefined) data[field] = req.body[field];
  const profile = await prisma.$transaction(async (tx) => {
    const profile = await tx.company_profiles.update({
      where: { company_id: req.user.userId },
      data,
    });
    if (req.body.full_name !== undefined || req.body.phone !== undefined)
      await tx.users.update({
        where: { user_id: req.user.userId },
        data: {
          ...(req.body.full_name !== undefined ? { full_name: req.body.full_name } : {}),
          ...(req.body.phone !== undefined ? { phone: req.body.phone } : {}),
        },
      });
    await tx.notifications.create({
      data: {
        user_id: req.user.userId,
        notification_type: "system",
        title: "Profile updated",
        message: "Your company profile was updated successfully.",
      },
    });
    return profile;
  });
  res.json({
    success: true,
    message: "Company profile updated",
    data: profile,
  });
};
const jobs = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.job_postings.findMany({
      where: { company_id: req.user.userId },
      orderBy: { created_at: "desc" },
    }),
  });
const createJob = async (req, res) => {
  const {
    title,
    description,
    application_deadline,
    job_type,
    location,
    salary_min,
    salary_max,
    openings,
    min_cgpa,
    eligible_department,
    eligible_degree,
    graduation_year_from,
    graduation_year_to,
    status,
  } = req.body;
  if (!title || !description || !application_deadline)
    throw Object.assign(
      new Error("title, description and application_deadline are required"),
      { status: 400 },
    );
  const deadline = new Date(application_deadline);
  if (Number.isNaN(deadline.getTime()))
    throw Object.assign(new Error("application_deadline must be a valid date"), { status: 400 });
  const decimalFields = { salary_min, salary_max, min_cgpa };
  for (const [field, value] of Object.entries(decimalFields))
    if (value !== undefined && value !== "" && !Number.isFinite(Number(value)))
      throw Object.assign(new Error(`${field} must be a valid number`), { status: 400 });
  if (min_cgpa !== undefined && min_cgpa !== "" && (Number(min_cgpa) < 0 || Number(min_cgpa) > 9.99))
    throw Object.assign(new Error("min_cgpa must be between 0 and 9.99"), { status: 400 });
  const job = await prisma.job_postings.create({
    data: {
      title,
      description,
      application_deadline: deadline,
      company_id: req.user.userId,
      job_type,
      location,
      salary_min: salary_min === undefined || salary_min === "" ? undefined : Number(salary_min),
      salary_max: salary_max === undefined || salary_max === "" ? undefined : Number(salary_max),
      openings: openings ? Number(openings) : undefined,
      min_cgpa: min_cgpa === undefined || min_cgpa === "" ? undefined : Number(min_cgpa),
      eligible_department,
      eligible_degree,
      graduation_year_from,
      graduation_year_to,
      status: status === "open" ? "open" : "draft",
      posted_at: status === "open" ? new Date() : undefined,
    },
  });
  res.status(201).json({ success: true, message: "Job created", data: job });
};
const updateJob = async (req, res) => {
  const jobId = BigInt(req.params.jobId);
  const owned = await prisma.job_postings.findFirst({
    where: { job_id: jobId, company_id: req.user.userId },
  });
  if (!owned) throw Object.assign(new Error("Job not found"), { status: 404 });
  const allowed = [
    "title",
    "description",
    "job_type",
    "location",
    "salary_min",
    "salary_max",
    "openings",
    "min_cgpa",
    "eligible_department",
    "eligible_degree",
    "graduation_year_from",
    "graduation_year_to",
    "application_deadline",
    "status",
  ];
  const data = {};
  for (const field of allowed)
    if (req.body[field] !== undefined) data[field] = req.body[field];
  if (data.application_deadline)
    data.application_deadline = new Date(data.application_deadline);
  const job = await prisma.job_postings.update({
    where: { job_id: jobId },
    data,
  });
  res.json({ success: true, message: "Job updated", data: job });
};
const deleteJob = async (req, res) => {
  const jobId = BigInt(req.params.jobId);
  const owned = await prisma.job_postings.findFirst({
    where: { job_id: jobId, company_id: req.user.userId },
  });
  if (!owned) throw Object.assign(new Error("Job not found"), { status: 404 });
  await prisma.job_postings.update({
    where: { job_id: jobId },
    data: { status: "closed" },
  });
  res.json({ success: true, message: "Job removed" });
};
const applicants = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.applications.findMany({
      where: {
        job_id: BigInt(req.params.jobId),
        job_postings: { company_id: req.user.userId },
      },
      include: {
        student_profiles: {
          include: {
            users: { select: { email: true, full_name: true, phone: true } },
          },
        },
        job_postings: true,
      },
    }),
  });
const updateApplicationStatus = async (req, res) => {
  const applicationId = BigInt(req.params.applicationId);
  const allowed = [
    "applied",
    "under_review",
    "shortlisted",
    "rejected",
    "selected",
  ];
  if (!allowed.includes(req.body.status))
    throw Object.assign(new Error("Invalid application status"), {
      status: 400,
    });
  const application = await prisma.applications.findFirst({
    where: {
      application_id: applicationId,
      job_postings: { company_id: req.user.userId },
    },
  });
  if (!application)
    throw Object.assign(new Error("Application not found"), { status: 404 });
  const updated = await prisma.applications.update({
    where: { application_id: applicationId },
    data: {
      status: req.body.status,
      review_notes: req.body.review_notes,
      reviewed_by: req.user.userId,
      status_changed_at: new Date(),
    },
  });
  res.json({
    success: true,
    message: "Application status updated",
    data: updated,
  });
};
const dashboard = async (req, res) => {
  const [profile, jobs, applicants] = await Promise.all([
    prisma.company_profiles.findUnique({
      where: { company_id: req.user.userId },
    }),
    prisma.job_postings.findMany({ where: { company_id: req.user.userId } }),
    prisma.applications.findMany({
      where: { job_postings: { company_id: req.user.userId } },
      include: {
        student_profiles: {
          include: { users: { select: { full_name: true, email: true } } },
        },
        job_postings: true,
      },
    }),
  ]);
  res.json({ success: true, data: { profile, jobs, applicants } });
};

module.exports = {
  getProfile,
  updateProfile,
  jobs,
  createJob,
  updateJob,
  deleteJob,
  applicants,
  updateApplicationStatus,
  dashboard,
};
