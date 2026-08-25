# Career Connect Backend

Simple REST API for student and company job recruitment workflows.

## Stack

Node.js, Express, PostgreSQL, Prisma 7.9.1, JWT, and bcryptjs.

## Requirements

- Node.js 18+
- PostgreSQL with the existing `career_connect` database
- npm

## Setup

```powershell
npm install
npx prisma generate
```

Create `.env` in the project root. Do not commit it:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/career_connect?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
```

The existing Prisma schema is the database source of truth. This project does not run migrations, `db push`, or reset commands.

## Run

```powershell
npm start
npm run dev
```

The API listens on `http://localhost:5000` by default. Use `GET /health` for an application health check and `GET /db-test` for a database connectivity check.

## Authentication

Register with `POST /api/auth/register/student` or `POST /api/auth/register/company`, then use `POST /api/auth/login`. Send the returned JWT on protected routes:

```http
Authorization: Bearer <token>
```

Roles used by this backend are `student` and `company`. The login response contains the account role and the frontend uses it to open the correct dashboard.

## Endpoint overview

- Auth: `POST /api/auth/register/student`, `POST /api/auth/register/company`, `POST /api/auth/login`
- Students: profile, available jobs, applications, and dashboard under `/api/students`
- Companies: profile, jobs, applicants, application status, and dashboard under `/api/company`

All successful responses use `{ "success": true, "message": "...", "data": ... }`. IDs are serialized as strings because PostgreSQL `BIGINT` values cannot be represented safely as JavaScript numbers.

## Example requests

```json
POST /api/auth/register/student
{
  "email": "student@example.com",
  "password": "password123",
  "full_name": "A Student",
  "university_roll_no": "CC001",
  "department": "Computer Science",
  "degree": "B.Tech",
  "graduation_year": 2027
}
```

```json
POST /api/company/jobs
{
  "title": "Backend Developer",
  "description": "Build and maintain API services.",
  "application_deadline": "2026-12-31T23:59:59Z",
  "openings": 2,
  "required_skill_ids": ["1", "2"]
}
```

Never send or expect `password_hash`; it is never returned by the API.