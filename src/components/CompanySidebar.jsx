import React from 'react'
import { Link } from 'react-router-dom'

function Item({ to, children }) {
  return (
    <Link to={to} className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700">{children}</Link>
  )
}

export default function CompanySidebar() {
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="font-semibold mb-3 text-gray-800">Company</div>
      <nav className="space-y-1">
        <Item to="/company/dashboard">Dashboard</Item>
        <Item to="/company/post-job">Post Job</Item>
        <Item to="/company/jobs">Manage Jobs</Item>
        <Item to="/company/applicants">Applicants</Item>
        <Item to="/company/profile">Profile</Item>
        <Item to="/">Logout</Item>
      </nav>
    </div>
  )
}
