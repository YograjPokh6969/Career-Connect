const prisma = require("../config/db");
const { hashPassword, verifyPassword } = require("../utils/password");
const { createToken } = require("../utils/jwt");

function publicUser(user) {
  return {
    user_id: user.user_id.toString(),
    email: user.email,
    role: user.role,
    full_name: user.full_name,
    phone: user.phone,
  };
}
function required(body, fields) {
  for (const field of fields)
    if (!body[field])
      throw Object.assign(new Error(`${field} is required`), { status: 400 });
}

const registerStudent = async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone,
    university_roll_no,
    department,
    degree,
    graduation_year,
    cgpa,
  } = req.body;
  required(req.body, [
    "email",
    "password",
    "full_name",
    "university_roll_no",
    "department",
    "degree",
    "graduation_year",
  ]);
  const cgpaValue =
    cgpa === undefined || cgpa === "" ? undefined : Number(cgpa);
  if (
    cgpaValue !== undefined &&
    (!Number.isFinite(cgpaValue) || cgpaValue < 0 || cgpaValue > 9.99)
  )
    throw Object.assign(new Error("CGPA must be between 0 and 9.99"), {
      status: 400,
    });
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.users.create({
      data: {
        email: email.toLowerCase(),
        password_hash: await hashPassword(password),
        role: "student",
        full_name,
        phone,
      },
    });
    await tx.student_profiles.create({
      data: {
        student_id: created.user_id,
        university_roll_no,
        department,
        degree,
        graduation_year: Number(graduation_year),
        cgpa: cgpaValue,
      },
    });
    return created;
  });
  res
    .status(201)
    .json({
      success: true,
      message: "Student registered successfully",
      data: publicUser(user),
    });
};

const registerCompany = async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone,
    legal_name,
    website,
    industry,
    description,
    office_address,
  } = req.body;
  required(req.body, ["email", "password", "full_name", "legal_name"]);
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.users.create({
      data: {
        email: email.toLowerCase(),
        password_hash: await hashPassword(password),
        role: "company",
        full_name,
        phone,
      },
    });
    await tx.company_profiles.create({
      data: {
        company_id: created.user_id,
        legal_name,
        website,
        industry,
        description,
        office_address,
      },
    });
    return created;
  });
  res
    .status(201)
    .json({
      success: true,
      message: "Company registered successfully",
      data: publicUser(user),
    });
};

const login = async (req, res) => {
  required(req.body, ["email", "password"]);
  const user = await prisma.users.findUnique({
    where: { email: req.body.email.toLowerCase() },
  });
  if (
    !user ||
    !user.is_active ||
    !(await verifyPassword(req.body.password, user.password_hash))
  )
    throw Object.assign(new Error("Invalid email or password"), {
      status: 401,
    });
  await prisma.users.update({
    where: { user_id: user.user_id },
    data: { last_login_at: new Date() },
  });
  res.json({
    success: true,
    message: "Login successful",
    data: { token: createToken(user), user: publicUser(user) },
  });
};

module.exports = { registerStudent, registerCompany, login };
