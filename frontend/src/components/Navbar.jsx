import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/auth'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const user = getUser()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">Career Connect</Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/jobs">Jobs</NavItem>
          <NavItem to="/companies">Companies</NavItem>
          <NavItem to="/about">About</NavItem>
          {!user && (
            <>
              <NavLink to="/login" className="text-gray-600 hover:text-blue-600">Login</NavLink>
              <NavLink to="/register" className="text-white bg-blue-600 px-4 py-2 rounded-md">Register</NavLink>
            </>
          )}
          {user && (
            <>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700">{user.full_name || user.name}</div>
                <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{user.role}</div>
                <NavLink to={user.role === 'student' ? '/student/dashboard' : user.role === 'company' ? '/company/dashboard' : '/admin/dashboard'} className="text-gray-600 hover:text-blue-600">Dashboard</NavLink>
                <button onClick={handleLogout} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded">Logout</button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
