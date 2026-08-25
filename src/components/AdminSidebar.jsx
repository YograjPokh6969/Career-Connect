import React from 'react'
import { Link } from 'react-router-dom'

function Item({ to, children }) {
  return (
    <Link to={to} className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700">{children}</Link>
  )
}

export default function AdminSidebar() {
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="font-semibold mb-3 text-gray-800">Admin</div>
      <nav className="space-y-1">
        <Item to="/admin/dashboard">Dashboard</Item>
        <Item to="/admin/students">Students</Item>
        <Item to="/admin/companies">Companies</Item>
        <Item to="/admin/jobs">Jobs</Item>
        <Item to="/admin/reports">Reports</Item>
        <Item to="/">Logout</Item>
      </nav>
    </div>
  )
}
