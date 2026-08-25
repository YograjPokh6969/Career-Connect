import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import StudentLayout from './layouts/StudentLayout'
import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentApplications from './pages/student/Applications'
import StudentNotifications from './pages/student/Notifications'
import CompanyLayout from './layouts/CompanyLayout'
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'
import CompanyPostJob from './pages/company/PostJob'
import CompanyJobs from './pages/company/Jobs'
import CompanyApplicants from './pages/company/Applicants'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminStudents from './pages/admin/Students'
import AdminCompanies from './pages/admin/Companies'
import AdminJobs from './pages/admin/Jobs'
import AdminReports from './pages/admin/Reports'
import RequireAuth from './components/RequireAuth'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Jobs from './pages/public/Jobs'
import JobDetails from './pages/public/JobDetails'
import Companies from './pages/public/Companies'
import About from './pages/public/About'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="companies" element={<Companies />} />
        <Route path="about" element={<About />} />
        <Route path="jobs/:id" element={<JobDetails />} />
      </Route>

      <Route element={<RequireAuth role="student" />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="notifications" element={<StudentNotifications />} />
        </Route>
      </Route>

      <Route element={<RequireAuth role="company" />}>
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="post-job" element={<CompanyPostJob />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="applicants" element={<CompanyApplicants />} />
        </Route>
      </Route>

      <Route element={<RequireAuth role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Route>
    </Routes>
  )
}
