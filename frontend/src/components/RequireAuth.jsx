import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from '../utils/auth'

export default function RequireAuth({ role }) {
  const user = getUser()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/login" replace />
  return <Outlet />
}
