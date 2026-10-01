const prisma = require("../config/db");
const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const resumeDirectory = path.join(__dirname, "../../uploads/resumes");
const startOfToday = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};
const deadlineHasPassed = (deadline) =>
  new Date(deadline).getTime() + 24 * 60 * 60 * 1000 <= Date.now();

const getProfile = async (req, res) => {
  const profile = await prisma.student_profiles.findUnique({
    where: { student_id: req.user.userId },
    include: {
      users: { select: { email: true, full_name: true, phone: true } },
      resumes: {
        select: {
          resume_id: true,
          file_name: true,
          mime_type: true,
          file_size_bytes: true,
          uploaded_at: true,
          is_primary: true,
        },
      },
    },
  });
  if (!profile)
    throw Object.assign(new Error("Student profile not found"), {
      status: 404,
    });
  res.json({ success: true, data: profile });
};

const uploadResume = async (req, res) => {
  if (!req.file)
    throw Object.assign(new Error("Resume file is required"), { status: 400 });
  const extension = path.extname(req.file.originalname).toLowerCase();
  const storageKey = `${randomUUID()}${extension}`;
  await fs.mkdir(resumeDirectory, { recursive: true });
  const filePath = path.join(resumeDirectory, storageKey);
  await fs.writeFile(filePath, req.file.buffer, { flag: "wx" });
  try {
    const resume = await prisma.$transaction(async (tx) => {
      await tx.resumes.updateMany({
        where: { student_id: req.user.userId, is_primary: true },
        data: { is_primary: false },
      });
      return tx.resumes.create({
        data: {
          student_id: req.user.userId,
          file_name: path.basename(req.file.originalname),
          storage_key: storageKey,
          mime_type: req.file.mimetype,
          file_size_bytes: req.file.size,
          is_primary: true,
        },
        select: {
          resume_id: true,
          file_name: true,
          mime_type: true,
          file_size_bytes: true,
          uploaded_at: true,
        },
      });
    });
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    await fs.unlink(filePath).catch(() => {});
    throw error;
  }
};

const removeResume = async (req, res) => {
  await prisma.resumes.updateMany({
    where: { student_id: req.user.userId, is_primary: true },
    data: { is_primary: false },
  });
  res.json({ success: true, message: "Resume removed from profile" });
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
  const profile = await prisma.$transaction(async (tx) => {
    const profile = await tx.student_profiles.update({
      where: { student_id: req.user.userId },
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
        message: "Your student profile was updated successfully.",
      },
    });
    return profile;
  });
  res.json({ success: true, message: "Profile updated", data: profile });
};

const availableJobs = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.job_postings.findMany({
      where: { status: "open", application_deadline: { gte: startOfToday() } },
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
  if (!job || job.status !== "open" || deadlineHasPassed(job.application_deadline))
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
  const resume = await prisma.resumes.findFirst({
    where: { student_id: req.user.userId, is_primary: true },
    select: { resume_id: true },
  });
  const application = await prisma.applications.create({
    data: {
      job_id: jobId,
      student_id: req.user.userId,
      resume_id: resume?.resume_id,
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

const notifications = async (req, res) =>
  res.json({
    success: true,
    data: await prisma.notifications.findMany({
      where: { user_id: req.user.userId },
      orderBy: { created_at: "desc" },
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
      where: { status: "open", application_deadline: { gte: startOfToday() } },
      include: { company_profiles: true },
    }),
  ]);
  res.json({ success: true, data: { profile, applications, availableJobs } });
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  removeResume,
  availableJobs,
  applyToJob,
  applications,
  notifications,
  dashboard,
};
