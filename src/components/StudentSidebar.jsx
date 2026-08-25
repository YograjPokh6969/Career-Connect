import React from 'react'
import { Link } from 'react-router-dom'

function Item({ to, children }) {
  return (
    <Link to={to} className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700">{children}</Link>
  )
}

export default function StudentSidebar() {
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="font-semibold mb-3 text-gray-800">Dashboard</div>
      <nav className="space-y-1">
        <Item to="/student/dashboard">Dashboard</Item>
        <Item to="/student/applications">My Applications</Item>
        <Item to="/student/profile">Profile</Item>
        <Item to="/student/notifications">Notifications</Item>
        <Item to="/">Logout</Item>
      </nav>
    </div>
  )
}
